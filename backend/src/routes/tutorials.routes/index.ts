import { Application } from 'express';
import { tutorialTagRoutes } from './tutorial-tag.route';
import { tutorialRoutes } from './tutorial.route';

export class InitiateTutorialsRoutes {
  public app: Application;
  constructor(app: Application) {
    this.app = app;
    this.app.use('/', tutorialTagRoutes);
    this.app.use('/', tutorialRoutes);
  }
}
