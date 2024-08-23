import { Application } from 'express';
import { profileRoutes } from './profile.route';
import { uploadRoutes } from './upload.route';
import { userRoutes } from './user.route';

export class InitiateUserRoutes {
  public app: Application;
  constructor(app: Application) {
    this.app = app;
    this.app.use('/', userRoutes);
    this.app.use('/', uploadRoutes);
    this.app.use('/', profileRoutes);
  }
}
