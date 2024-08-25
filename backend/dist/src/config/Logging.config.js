"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingConfig = void 0;
const colors_1 = __importDefault(require("colors"));
const morgan_1 = __importDefault(require("morgan"));
class LoggingConfig {
    constructor(app) {
        this.app = app;
        this.configureMorgan = () => {
            // TODO: configure Morgan for logging
            // Using Morgan for HTTP request logging in Node.js :
            // https://www.geeksforgeeks.org/what-is-morgan-in-node-js/
            this.app.use((0, morgan_1.default)((tokens, req, res) => [
                '🌍',
                colors_1.default.bgBlack.bold(` REQUEST `),
                tokens.method(req, res) || '',
                colors_1.default.green.bold(tokens.status(req, res) || ''),
                colors_1.default.bgGreen.bold(tokens.url(req, res) || ''),
                colors_1.default.green.bold((tokens['response-time'](req, res) || '') + ' ms'),
                colors_1.default.magenta.bold('@ ' + (tokens.date(req, res) || '')),
                // "\n",
                // colors.green("from " + tokens["remote-addr"](req, res) || ""),
                // colors.yellow.bold("from " + (tokens.referrer(req, res) || "")),
                // colors.blue(tokens["user-agent"](req, res) || ""),
            ].join(' ')));
        };
        this.app = app;
        this.configureMorgan();
    }
}
exports.LoggingConfig = LoggingConfig;
