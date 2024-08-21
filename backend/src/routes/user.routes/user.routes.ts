import { BaseRouter } from '@/routes';
import { NextFunction, Request, Response } from 'express';

class UserRoutes extends BaseRouter {
  constructor() {
    super();
    this.router.get('/user', this.getUser);
  }

  async getUser(_: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json({ message: 'Hello User' });
    } catch (error) {
      next(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

export const { router } = new UserRoutes();
