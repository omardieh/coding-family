import { InitiateRoutes } from '@/routes';
import { googleRoute } from './google.route';
import { githubRoute } from './github.route';
import { captchaRoute } from './captcha.route';
import { loginRoute } from './login.route';
import { logoutRoute } from './logout.route';
import { signupRoute } from './signup.route';

export class InitiateAuthRoutes extends InitiateRoutes {
  constructor() {
    super();
    this.app.use('/', googleRoute);
    this.app.use('/', githubRoute);
    this.app.use('/', captchaRoute);
    this.app.use('/', loginRoute);
    this.app.use('/', logoutRoute);
    this.app.use('/', signupRoute);
    this.app.use('/auth/verify', verifyRouter);
    this.app.use('/auth/token', tokenRouter);
  }
}
