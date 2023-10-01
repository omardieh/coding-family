const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

module.exports = (app) => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
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
      dnsPrefetchControl: false, // Disable DNS prefetching
      frameguard: { action: "sameorigin" }, // Prevent Clickjacking
      hsts: { maxAge: 31536000, includeSubDomains: true }, // Enable HSTS
      ieNoOpen: true, // Block IE content rendering
      noSniff: true, // Prevent MIME type sniffing
      referrerPolicy: { policy: "no-referrer" }, // Control Referrer information
      xssFilter: true, // Enable XSS filter
    })
  );
};
