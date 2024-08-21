import express, { Router } from 'express';

export class BaseRouter {
  public router: Router;
  constructor() {
    this.router = express.Router();
  }
}
