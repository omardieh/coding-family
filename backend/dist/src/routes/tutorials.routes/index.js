"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitiateTutorialsRoutes = void 0;
const tutorial_tag_route_1 = require("./tutorial-tag.route");
const tutorial_route_1 = require("./tutorial.route");
class InitiateTutorialsRoutes {
    constructor(app) {
        this.app = app;
        this.app.use('/', tutorial_route_1.tutorialRoutes);
        this.app.use('/', tutorial_tag_route_1.tutorialTagRoutes);
    }
}
exports.InitiateTutorialsRoutes = InitiateTutorialsRoutes;
