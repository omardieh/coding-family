"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutRoute = void 0;
const routes_1 = require("@/routes");
class LogoutRoute extends routes_1.BaseRouter {
    constructor() {
        super();
        this.logUserOut = async (_, res, next) => {
            try {
                res.clearCookie('refreshToken');
                res.removeHeader('Authorization');
                res.status(200).send({ success: true });
            }
            catch (error) {
                next(error);
            }
        };
        this.router.get('/auth/logout', this.logUserOut);
    }
}
exports.logoutRoute = new LogoutRoute().router;
