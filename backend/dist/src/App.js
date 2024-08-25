"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@/config");
const routes_1 = require("@/routes");
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.initializeConfigs = () => {
            new config_1.EnvironmentConfig(this.app);
            new config_1.SecurityConfig(this.app);
            new config_1.LoggingConfig(this.app);
        };
        this.setRoutes = () => {
            new routes_1.InitiateUserRoutes(this.app);
            new routes_1.InitiateTutorialsRoutes(this.app);
            new routes_1.InitiateAuthRoutes(this.app);
        };
        this.handleErrors = () => {
            new config_1.ErrorsConfig(this.app);
        };
        this.app = (0, express_1.default)();
        this.initializeConfigs();
        this.setRoutes();
        this.handleErrors();
    }
}
const { app } = new App();
exports.default = app;
