import { Application } from 'express';
import { profileRoutes } from './profile.route';
import { uploadRoutes } from './upload.route';
import { userRoutes } from './user.route';

export class InitiateUserRoutes {
  public app: Application;
  constructor(app: Application) {
    this.app = app;
    this.app.use('/api', userRoutes);
    this.app.use('/api', uploadRoutes);
    this.app.use('/api', profileRoutes);
  }
}
