import { UserModel } from '@/models';
import { BaseRouter } from '@/routes';
import { RequestWithPayload } from '@/types';
import { NextFunction, Request, Response } from 'express';

class VerifyRoute extends BaseRouter {
  constructor() {
    super();
    this.router.get('/auth/token/verify', this.JWTService.isAuthenticated, this.verifyLoggedIn);
    this.router.post('/auth/email/verify', this.verifyUserEmail);
    this.router.get('/auth/csrf/verify', this.verifyCsrfToken);
  }

  verifyLoggedIn = async (req: RequestWithPayload, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json(req.payload);
    } catch (error) {
      next(error);
    }
  };
  verifyUserEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userID, code } = req.body;
    try {
      const foundUser = await UserModel.findById(userID);
      if (!foundUser) {
        res.status(400).json('verification code is not valid');
        return;
      }
      if (foundUser.emailVerifyCodeExpiresAt.getTime() <= Date.now()) {
        res.status(400).json('verification code has expired');
        return;
      }
      if (foundUser.emailVerifyCode === 'verified') {
        res.status(200).json('email has been already verified');
        return;
      }
      const codeCorrect = await foundUser.compareEmail(code);
      if (!codeCorrect) {
        res.status(400).json('verification code is not valid');
        return;
      }
      const updatedUser = await UserModel.findByIdAndUpdate(
        foundUser._id,
        { isEmailVerified: true, emailVerifyCode: 'verified' },
        { new: true },
      );
      if (updatedUser && !updatedUser.isEmailVerified) {
        res.status(400).json('error while verifying email');
        return;
      }
      res.status(201).json('email verification was successful');
    } catch (err) {
      next(err);
    }
  };
  verifyCsrfToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });
    res.json({ csrfToken: true });
  };
}

export const { router: verifyRoute } = new VerifyRoute();
