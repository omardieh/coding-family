import { Application } from 'express';
import { router as uploadsRoutes } from './uploads.route';
import { router as userRoutes } from './user.routes';

export class InitiateUserRoutes {
  constructor(public app: Application) {
    this.app = app;
    this.app.use('/', userRoutes);
    this.app.use('/', uploadsRoutes);
  }
}
