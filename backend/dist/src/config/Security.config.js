"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityConfig = void 0;
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
class SecurityConfig {
    constructor(app) {
        this.app = app;
        this.configureHelmet = () => {
            // TODO : configure Helmet
            // Using Helmet in Node.js to secure your application :
            // https://blog.logrocket.com/using-helmet-node-js-secure-application/
            this.app.use((0, helmet_1.default)({
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
            }));
        };
        this.configureCors = () => {
            // TODO : configure Cors
            // Configuring CORS in Node.js with Express :
            // https://dev.to/speaklouder/how-to-configure-cors-in-nodejs-with-express-11h
            // https://www.linkedin.com/pulse/configure-cors-node-js-express-naum-asafov-qs6ce
            this.app.use((0, cors_1.default)({
                origin: [`${process.env.CLIENT_URL}`],
                credentials: true,
            }));
        };
        this.configureRateLimiter = () => {
            (0, express_rate_limit_1.default)({
                windowMs: 15 * 60 * 1000,
                max: 100,
            });
        };
        this.app = app;
        this.configureHelmet();
        this.configureCors();
        this.configureRateLimiter();
    }
}
exports.SecurityConfig = SecurityConfig;
