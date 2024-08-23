import { DBService, JWTService } from '@/services';
import { Router } from 'express';

export class BaseRouter {
  public router: Router;
  public db;
  public JWTService;
  constructor() {
    this.router = Router();
    this.db = new DBService();
    this.JWTService = new JWTService();
  }
}
