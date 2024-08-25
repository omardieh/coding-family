import { UserModel } from '@/models';
import { BaseRouter } from '@/routes';
import { NextFunction, Request, Response } from 'express';

class LoginRoute extends BaseRouter {
  constructor() {
    super();
    this.router.post('/auth/login', this.logUserIn);
  }

  logUserIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json('Provide Email and Password');
      return;
    }
    try {
      const foundUser = await UserModel.findOne({ email });
      if (!foundUser) {
        res.status(401).json('Wrong Email or Password');
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
        res.status(401).json('Wrong Email or Password');
        return;
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
}

export const { router: loginRoute } = new LoginRoute();
