"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsConfig = void 0;
class ErrorsConfig {
    constructor(app) {
        this.app = app;
        this.configureNotFoundErrors = (_, res) => {
            res.status(404).json({ message: 'This route does not exist' });
        };
        this.configureGlobalErrors = (err, req, res, next) => {
            console.error('ERROR', req.method, req.path, err.message);
            if (!res.headersSent) {
                res.status(500).json({
                    error: {
                        message: 'An unexpected error occurred',
                        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
                    },
                });
            }
            else {
                next(err);
            }
        };
        this.app.use(this.configureNotFoundErrors);
        this.app.use(this.configureGlobalErrors);
    }
}
exports.ErrorsConfig = ErrorsConfig;
