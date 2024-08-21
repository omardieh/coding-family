import { Application } from 'express';
import { profileRoutes } from './profile.route';
import { uploadRoutes } from './upload.route';
import { userRoutes } from './user.routes';

export class InitiateUserRoutes {
  constructor(public app: Application) {
    this.app = app;
    this.app.use('/', userRoutes);
    this.app.use('/', uploadRoutes);
    this.app.use('/', profileRoutes);
  }
}
