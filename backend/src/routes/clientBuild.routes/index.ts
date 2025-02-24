import { Application, NextFunction, Request, Response } from 'express';
import path from 'path';

export class InitiateClientBuildRoutes {
  public app: Application;
  constructor(app: Application) {
    this.app = app;
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (/(.ico|.js|.css|.jpg|.png|.map)$/i.test(req.path)) {
        next();
      } else {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
        res.sendFile(path.join(__dirname, '..', '..', '..', 'public', 'index.html'));
      }
    });
  }
}
