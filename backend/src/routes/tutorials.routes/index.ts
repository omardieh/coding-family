import { Application } from 'express';
import { tutorialTagRoutes } from './tutorial-tag.route';
import { tutorialRoutes } from './tutorial.route';

export class InitiateTutorialsRoutes {
  public app: Application;
  constructor(app: Application) {
    this.app = app;
    this.app.use('/', tutorialRoutes);
    this.app.use('/', tutorialTagRoutes);
  }
}
