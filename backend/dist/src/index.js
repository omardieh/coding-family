"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("@/App"));
const constants_1 = require("@/constants");
const services_1 = require("@/services");
const http_1 = require("http");
class Server {
    constructor(port, host) {
        this.port = port;
        this.host = host;
        this.runServer = async () => {
            try {
                await this.db.connectDB();
                this.httpServer.listen(this.port, this.host, () => {
                    console.info(constants_1.SERVER_CONNECT_MESSAGES.server.success);
                });
            }
            catch (error) {
                let errorMessage = 'unknown error';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                console.error(errorMessage);
                process.exit(1);
            }
        };
        this.port = port;
        this.host = host;
        this.db = new services_1.DBService();
        this.httpServer = (0, http_1.createServer)(App_1.default);
        new services_1.SocketIOService(this.httpServer);
        this.runServer();
    }
}
if (!process.env.SERVER_PORT || !process.env.SERVER_HOST) {
    throw new Error('port must be a number, host must be a string');
}
new Server(Number(process.env.SERVER_PORT), process.env.SERVER_HOST);
