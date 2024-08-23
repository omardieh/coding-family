import { Application } from 'express';

export class InitiateRoutes {
  public app: Application;
  constructor(app: Application) {
    this.app = app;
  }
}
