"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const setEnv = () => dotenv_1.default.config({
    path: path_1.default.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`),
});
exports.setEnv = setEnv;
