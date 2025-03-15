import { UserModel } from '@/models';
import { BlockedIPModel } from '@/models';
import { BaseRouter } from '@/routes';
import { NextFunction, Request, Response } from 'express';

class LoginRoute extends BaseRouter {
  constructor() {
    super();
    this.router.post('/auth/login', this.logUserIn);
  }

  logUserIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    const ip = `${req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress}`;

    if (!email || !password) {
      res.status(400).json('Provide Email and Password');
      return;
    }

    try {
      const foundUser = await UserModel.findOne({ email });

      if (!foundUser) {
        await this.trackFailedAttempt(ip);
        res.status(401).json('Wrong Email or Password');
        return;
      }

      if (foundUser.lockoutUntil && foundUser.lockoutUntil > new Date()) {
        const timeLeft = Math.ceil((foundUser.lockoutUntil.getTime() - new Date().getTime()) / 1000 / 60);
        res.status(429).json(`Too many failed login attempts. Please try again in ${timeLeft} minutes.`);
        return;
      }

      if (!foundUser.isEmailVerified) {
        res.status(401).json('Please Verify Your Email to Login');
        return;
      }

      if (foundUser.googleID || foundUser.githubID) {
        res.status(401).json('Email is used by Google or GitHub account');
        return;
      }

      const passwordCorrect = await foundUser.comparePassword(password);
      if (!passwordCorrect) {
        foundUser.failedLoginAttempts += 1;
        await this.trackFailedAttempt(ip);

        if (foundUser.failedLoginAttempts >= 5) {
          const lockoutUntil = new Date();
          lockoutUntil.setMinutes(lockoutUntil.getMinutes() + 5);
          foundUser.lockoutUntil = lockoutUntil;
          await foundUser.save();
          res.status(429).json('Maximum login attempts exceeded. Account locked for 5 minutes.');
          return;
        }

        await foundUser.save();
        const attemptsLeft = 5 - foundUser.failedLoginAttempts;
        res
          .status(401)
          .json(`Wrong Email or Password. ${attemptsLeft} ${attemptsLeft === 1 ? 'attempt' : 'attempts'} remaining.`);
        return;
      }

      await this.resetIPAttempts(ip);

      if (foundUser.failedLoginAttempts > 0 || foundUser.lockoutUntil) {
        foundUser.failedLoginAttempts = 0;
        foundUser.lockoutUntil = null;
        await foundUser.save();
      }

      const { _id, email: foundEmail, username, avatar } = foundUser;
      const payload = { _id, email: foundEmail, username, avatar };
      const refreshToken = this.JWTService.generateJWT(payload, true);
      const accessToken = this.JWTService.generateJWT(payload);
      res
        .cookie('refreshToken', refreshToken, {
          httpOnly: true,
          sameSite: 'strict',
        })
        .set('Access-Control-Expose-Headers', 'Authorization')
        .header('Authorization', `Bearer ${accessToken}`)
        .json({ _id, email, username, avatar });
    } catch (error) {
      res.status(500).json({ 'Internal Server Error': error });
      next(error);
    }
  };

  private async trackFailedAttempt(ip: string): Promise<void> {
    try {
      const ipRecord = await BlockedIPModel.findOne({ ipAddress: ip });

      if (ipRecord) {
        ipRecord.failedAttempts += 1;
        ipRecord.lastAttempt = new Date();

        if (ipRecord.failedAttempts >= 10) {
          const blockUntil = new Date();
          blockUntil.setMinutes(blockUntil.getMinutes() + 15);
          ipRecord.blockedUntil = blockUntil;
        }

        await ipRecord.save();
      } else {
        await BlockedIPModel.create({
          ipAddress: ip,
          failedAttempts: 1,
          lastAttempt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error tracking IP attempt:', error);
    }
  }

  private async resetIPAttempts(ip: string): Promise<void> {
    try {
      await BlockedIPModel.findOneAndUpdate({ ipAddress: ip }, { failedAttempts: 0, blockedUntil: null });
    } catch (error) {
      console.error('Error resetting IP attempts:', error);
    }
  }
}

export const { router: loginRoute } = new LoginRoute();
