import { BaseRouter } from '@/routes';
import { NextFunction, Request, Response } from 'express';

class LogoutRoute extends BaseRouter {
  constructor() {
    super();
    this.router.get('/auth/logout', this.logUserOut);
  }

  async logUserOut(_: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.clearCookie('refreshToken');
      res.removeHeader('Authorization');
      res.status(200).send({ success: true });
    } catch (error) {
      next(error);
    }
  }
}

export const { router: logoutRoute } = new LogoutRoute();
