import cors from 'cors';
import { Application } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

export class SecurityConfig {
  constructor(private app: Application) {
    this.app = app;
    this.configureHelmet();
    this.configureCors();
    this.configureRateLimiter();
  }
  private configureHelmet(): void {
    // TODO : configure Helmet
    // Using Helmet in Node.js to secure your application :
    // https://blog.logrocket.com/using-helmet-node-js-secure-application/
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            fontSrc: ["'self'"],
          },
        },
        dnsPrefetchControl: false,
        frameguard: { action: 'sameorigin' },
        hsts: { maxAge: 31536000, includeSubDomains: true },
        ieNoOpen: true,
        noSniff: true,
        referrerPolicy: { policy: 'no-referrer' },
        xssFilter: true,
      }),
    );
  }

  private configureCors(): void {
    // TODO : configure Cors
    // Configuring CORS in Node.js with Express :
    // https://dev.to/speaklouder/how-to-configure-cors-in-nodejs-with-express-11h
    // https://www.linkedin.com/pulse/configure-cors-node-js-express-naum-asafov-qs6ce
    this.app.use(
      cors({
        origin: [process.env.CLIENT_URL || ''],
      }),
    );
  }

  private configureRateLimiter(): void {
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    });
  }
}
