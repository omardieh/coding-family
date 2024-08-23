import { googleRoute } from './google.route';
import { githubRoute } from './github.route';
import { captchaRoute } from './captcha.route';
import { loginRoute } from './login.route';
import { logoutRoute } from './logout.route';
import { signupRoute } from './signup.route';
import { verifyRoute } from './verify.route';
import { Application } from 'express';

export class InitiateAuthRoutes {
  public app: Application;
  constructor(app: Application) {
    this.app = app;
    this.app.use('/', googleRoute);
    this.app.use('/', githubRoute);
    this.app.use('/', captchaRoute);
    this.app.use('/', loginRoute);
    this.app.use('/', logoutRoute);
    this.app.use('/', signupRoute);
    this.app.use('/', verifyRoute);
  }
}
