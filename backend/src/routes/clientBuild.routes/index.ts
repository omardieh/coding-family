import { Application, NextFunction, Request, Response } from 'express';
import path from 'path';

export class InitiateClientBuildRoutes {
  public app: Application;
  constructor(app: Application) {
    this.app = app;
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (/^(?!\/(api|auth)).*$/i.test(req.path)) {
        res.set({
          'Cache-Control': 'private, no-cache, no-store, must-revalidate',
          Expires: '-1',
          Pragma: 'no-cache',
        });
        res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
        return;
      }
      next();
    });
  }
}
