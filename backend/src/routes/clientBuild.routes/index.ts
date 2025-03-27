import { Application, NextFunction, Request, Response } from 'express';
import path from 'path';

// backend/src/routes/clientBuild.routes/index.ts
export class InitiateClientBuildRoutes {
  public app: Application;
  constructor(app: Application) {
    this.app = app;
    this.app.use((_: Request, res: Response, next: NextFunction) => {
      res.set({
        'Content-Security-Policy': "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
        'X-Content-Type-Options': 'nosniff',
      });
      next();
    });
    this.app.get('*', (req: Request, res: Response, next: NextFunction) => {
      if (/^\/(?:api|auth)\/.*$/i.test(req.path)) return next();
      try {
        res.set({
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
          'Surrogate-Control': 'no-store',
        });

        res.sendFile(path.resolve(__dirname, '..', '..', '..', 'public', 'index.html'), {
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
          },
        });
      } catch (error) {
        console.error('Error serving index.html:', error);
        next(error);
      }
    });
  }
}
