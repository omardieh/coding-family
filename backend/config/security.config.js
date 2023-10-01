const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const ActivityLog = require("../models/ActivityLog.model");

module.exports = (app) => {
  app.use((req, res, next) => {
    ActivityLog.create({
      clientIP: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      reqMethod: req.method,
      reqPath: `${req.protocol}://${req.hostname}${req.originalUrl}`,
      user: req.payload ? req.payload._id : null,
    }).then((createdLog) => {
      console.info("LOG: ", createdLog);
      next();
    });
  });

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });

  app.use(limiter);
  app.use(
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
      frameguard: { action: "sameorigin" },
      hsts: { maxAge: 31536000, includeSubDomains: true },
      ieNoOpen: true,
      noSniff: true,
      referrerPolicy: { policy: "no-referrer" },
      xssFilter: true,
    })
  );
};
