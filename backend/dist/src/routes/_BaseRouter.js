"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouter = void 0;
const services_1 = require("@/services");
const express_1 = require("express");
class BaseRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.db = new services_1.DBService();
        this.JWTService = new services_1.JWTService();
    }
}
exports.BaseRouter = BaseRouter;
