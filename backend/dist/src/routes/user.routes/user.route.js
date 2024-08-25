"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const routes_1 = require("@/routes");
class UserRoutes extends routes_1.BaseRouter {
    constructor() {
        super();
        this.getUser = async (_, res, next) => {
            try {
                res.json({ message: 'Hello User' });
            }
            catch (error) {
                next(error);
                res.status(500).send('Internal Server Error');
            }
        };
        this.router.get('/user', this.getUser);
    }
}
exports.userRoutes = new UserRoutes().router;
