import { Application, Response } from 'express';
import { BaseRouter } from '@/routes';

class IndexRoutes extends BaseRouter {
  constructor() {
    super();
    this.router.get('/', (_, res: Response) =>
      res.render('index', {
        siteTitle: 'API Documentation - Coding Family',
        siteHeading: 'Coding Family API Documentation',
      }),
    );
  }
}

const { router: indexRoutes } = new IndexRoutes();

export class InitiateIndexRoutes {
  public app: Application;
  constructor(app: Application) {
    this.app = app;
    this.app.use('/api', indexRoutes);
  }
}
