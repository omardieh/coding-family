import { UserModel } from '@/models';
import { BaseRouter } from '@/routes';
import { NextFunction, Request, Response } from 'express';
import { RequestWithPayload } from '@/types';

class VerifyRoute extends BaseRouter {
  constructor() {
    super();
    this.router.get('/auth/token/verify', this.JWTService.isAuthenticated, this.verifyLoggedIn);
    this.router.post('/auth/email/verify', this.verifyUserEmail);
  }

  async verifyLoggedIn(req: RequestWithPayload, res: Response, next: NextFunction): Promise<void> {
    try {
      res.status(200).json(req.payload);
    } catch (error) {
      next(error);
    }
  }
  async verifyUserEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
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
  }
}

export const { router: verifyRoute } = new VerifyRoute();
