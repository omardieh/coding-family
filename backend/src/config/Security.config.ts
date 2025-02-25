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
    const { NODE_ENV, CLIENT_URL } = process.env;
    let clientURLs: string[] = [];
    if (NODE_ENV === 'production' && CLIENT_URL) {
      clientURLs = CLIENT_URL.split(',').map((url) => url.trim());
    }
    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin || clientURLs.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
        credentials: true,
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
