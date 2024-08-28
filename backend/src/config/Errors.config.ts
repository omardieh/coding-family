import { Application, NextFunction, Request, Response } from 'express';
import { IpDeniedError } from 'express-ipfilter';

export class ErrorsConfig {
  constructor(private app: Application) {
    this.app.use(this.configureNotFoundErrors);
    this.app.use(this.configureGlobalErrors);
  }

  private configureNotFoundErrors = (_: Request, res: Response): void => {
    res.status(404).json({ message: 'This route does not exist' });
  };

  private configureGlobalErrors = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error('ERROR', req.method, req.path, err.message);
    if (err instanceof IpDeniedError) {
      res.status(401).json({ error: { message: 'Access denied: Your IP is not allowed.' } });
    } else if (!res.headersSent) {
      res.status(500).json({
        error: {
          message: 'An unexpected error occurred',
          ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
        },
      });
    } else {
      next(err);
    }
  };
}
