const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const ActivityLog = require("../models/ActivityLog.model");

module.exports = (app) => {
  app.use((req, res, next) => {
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    });

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
    });

    ActivityLog.create({
      clientIP:
        req.headers["x-forwarded-for"]?.split(",").shift() ||
        req.socket?.remoteAddress,
      reqMethod: req.method,
      reqPath: `${req.protocol}://${req.hostname}${req.originalUrl}`,
      user: req.payload ? req.payload._id : null,
    }).then((createdLog) => {
      // console.info("LOG: ", createdLog);
      next();
    });
  });
};
