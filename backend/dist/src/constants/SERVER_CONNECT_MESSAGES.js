"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_CONNECT_MESSAGES = void 0;
const colors_1 = __importDefault(require("colors"));
const port = Number(process.env.SERVER_PORT);
exports.SERVER_CONNECT_MESSAGES = {
    server: {
        success: [
            '🖥️ ',
            colors_1.default.bgBlack.bold(` SERVER `),
            ` App is running, visit: `,
            colors_1.default.blue(`http://localhost:${port}`),
        ].join(''),
    },
    error: {
        portInUse: [
            '❌ ',
            colors_1.default.bgBlack.bold(` ERROR `),
            ` Port ${port} is already in use. Please choose another port.`,
        ].join(''),
        serverFailure: (error) => ['❌ ', colors_1.default.bgRed.bold(` ERROR `), ` Failed to start the server: `, colors_1.default.red(error.message)].join(''),
        unexpected: (error) => ['❌ ', colors_1.default.bgRed.bold(` ERROR `), ` An unexpected error occurred: `, colors_1.default.red(error.message)].join(''),
        unknown: ['❌ ', colors_1.default.bgRed.bold(` ERROR `), ` An unknown error occurred.`].join(''),
    },
};
