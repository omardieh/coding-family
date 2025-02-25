import cors from 'cors';
import csrf from 'csurf';
import { Application, NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

export class SecurityConfig {
  constructor(private app: Application) {
    this.app = app;
    this.configureCsrf();
    this.configureHelmet();
    this.configureCors();
    this.configureRateLimiter();
  }

  private configureCsrf = (): void => {
    this.app.use(csrf({ cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production' } }));
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const token = req.csrfToken();
      res.cookie('XSRF-TOKEN', token);
      next();
    });
  };

  private configureHelmet = (): void => {
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
  };

  private configureCors = (): void => {
    // TODO : configure Cors
    // Configuring CORS in Node.js with Express :
    // https://dev.to/speaklouder/how-to-configure-cors-in-nodejs-with-express-11h
    // https://www.linkedin.com/pulse/configure-cors-node-js-express-naum-asafov-qs6ce
    const clientURL = process.env.CLIENT_URL.split(', ');
    console.info('||cors|| clientURL:', clientURL);
    this.app.use(
      cors({
        origin: [...(clientURL || [])],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'X-XSRF-TOKEN'],
      }),
    );
  };

  private configureRateLimiter = (): void => {
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    });
  };
}
