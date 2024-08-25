"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitiateUserRoutes = void 0;
const profile_route_1 = require("./profile.route");
const upload_route_1 = require("./upload.route");
const user_route_1 = require("./user.route");
class InitiateUserRoutes {
    constructor(app) {
        this.app = app;
        this.app.use('/', user_route_1.userRoutes);
        this.app.use('/', upload_route_1.uploadRoutes);
        this.app.use('/', profile_route_1.profileRoutes);
    }
}
exports.InitiateUserRoutes = InitiateUserRoutes;
