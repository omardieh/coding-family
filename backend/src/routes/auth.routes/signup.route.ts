import { UserModel } from '@/models';
import { BaseRouter } from '@/routes';
import { EmailService } from '@/services';
import { NextFunction, Request, Response } from 'express';

class SignupRoute extends BaseRouter {
  private emailService;
  constructor() {
    super();
    this.emailService = new EmailService();
    this.router.post('/auth/signup', this.signUserUp);
  }

  signUserUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      res.status(400).json('Provide Username, Email and Password');
      return;
    }
    try {
      const foundUser = await UserModel.findOne({ email });
      if (foundUser) {
        res.status(400).json('User already exists.');
        return;
      }
      const emailVerifyCode = this.emailService.getRandomString();
      const emailVerifyCodeExpiresAt = this.emailService.getExpirationDate(15);
      const createdUser = await UserModel.create({
        email,
        password,
        username,
        emailVerifyCode,
        emailVerifyCodeExpiresAt,
      });
      const { _id, email: createdEmail, username: createdUsername } = createdUser;
      const payload = { _id, createdEmail, createdUsername };
      const emailVerifyToken = this.JWTService.generateJWT(payload);
      await this.emailService.sendEmailVerify(createdUser, emailVerifyCode, emailVerifyToken);
      res.status(200).send('Verification Email was sent Successfully');
    } catch (error) {
      this.db.logMongoError(error, req, res, next);
    }
  };
}

export const { router: signupRoute } = new SignupRoute();
