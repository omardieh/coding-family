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
    this.app.use('/api', googleRoute);
    this.app.use('/api', githubRoute);
    this.app.use('/api', captchaRoute);
    this.app.use('/api', loginRoute);
    this.app.use('/api', logoutRoute);
    this.app.use('/api', signupRoute);
    this.app.use('/api', verifyRoute);
  }
}
