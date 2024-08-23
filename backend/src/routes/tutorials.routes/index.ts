import { Application } from 'express';
import { tutorialTagRoutes } from './tutorial-tag.routes';
import { tutorialRoutes } from './tutorial.routes';

export class InitiateTutorialsRoutes {
  constructor(public app: Application) {
    this.app = app;
    this.app.use('/', tutorialRoutes);
    this.app.use('/', tutorialTagRoutes);
  }
}
