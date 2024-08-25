"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentConfig = void 0;
const utils_1 = require("@/utils");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
class EnvironmentConfig {
    constructor(app) {
        this.app = app;
        this.configureEnvVars = () => {
            // dotenv.config({
            //   path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`),
            // });
            (0, utils_1.setEnv)();
        };
        this.configureExpress = () => {
            // TODO : configure Express
            // Express.js Security Best Practices :
            // https://github.com/goldbergyoni/nodebestpractices
            // https://dev.to/tristankalos/expressjs-security-best-practices-1ja0
            // https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example#login-endpoint-protection
            // https://expressjs.com/en/advanced/best-practice-security.html
            this.app.use(express_1.default.json());
            this.app.use(express_1.default.urlencoded({ extended: false }));
            this.app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
        };
        this.configureViews = () => {
            this.app.set('view engine', 'hbs');
            this.app.set('views', path_1.default.join(__dirname, '../../views'));
        };
        this.otherConfigs = () => {
            this.app.use((0, cookie_parser_1.default)());
        };
        this.configureEnvVars();
        this.configureExpress();
        this.configureViews();
        this.otherConfigs();
    }
}
exports.EnvironmentConfig = EnvironmentConfig;
