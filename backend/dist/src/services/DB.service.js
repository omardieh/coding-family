"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBService = void 0;
const colors_1 = __importDefault(require("colors"));
const mongoose_1 = __importDefault(require("mongoose"));
class DBService {
    constructor() {
        this.connectDB = async () => {
            try {
                const response = await mongoose_1.default.connect(`${process.env.MONGODB_URL}`);
                console.info([
                    '🗃️ ',
                    colors_1.default.bgBlack.bold(` DATABASE `),
                    ` Atlas is connected, database name: `,
                    colors_1.default.blue(`${response.connections[0].name}`),
                ].join(''));
            }
            catch (error) {
                console.error('Failed to connect to MongoDB | error:', error);
                process.exit(1);
            }
        };
        this.closeDB = async () => {
            try {
                await mongoose_1.default.disconnect();
                console.info('disconnected MongoDB');
            }
            catch (error) {
                console.error('Failed to close MongoDB connection', error);
                process.exit(1);
            }
        };
        this.logMongoError = (error, req, res, next) => {
            if (error instanceof mongoose_1.default.Error.ValidationError) {
                let key;
                Object.keys(req.body).forEach((field) => {
                    if (error.errors[field]) {
                        key = field;
                    }
                });
                const errorMessage = key ? error.errors[key].message : 'Unknown error';
                res.status(400).json({ error: errorMessage });
                return;
            }
            next(error);
        };
    }
}
exports.DBService = DBService;
