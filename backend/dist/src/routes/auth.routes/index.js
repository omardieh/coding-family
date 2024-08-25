"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitiateAuthRoutes = void 0;
const google_route_1 = require("./google.route");
const github_route_1 = require("./github.route");
const captcha_route_1 = require("./captcha.route");
const login_route_1 = require("./login.route");
const logout_route_1 = require("./logout.route");
const signup_route_1 = require("./signup.route");
const verify_route_1 = require("./verify.route");
class InitiateAuthRoutes {
    constructor(app) {
        this.app = app;
        this.app.use('/', google_route_1.googleRoute);
        this.app.use('/', github_route_1.githubRoute);
        this.app.use('/', captcha_route_1.captchaRoute);
        this.app.use('/', login_route_1.loginRoute);
        this.app.use('/', logout_route_1.logoutRoute);
        this.app.use('/', signup_route_1.signupRoute);
        this.app.use('/', verify_route_1.verifyRoute);
    }
}
exports.InitiateAuthRoutes = InitiateAuthRoutes;
