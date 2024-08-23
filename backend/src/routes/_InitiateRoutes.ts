import express, { Application } from 'express';

export class InitiateRoutes {
  public app: Application;
  constructor() {
    this.app = express();
  }
}
