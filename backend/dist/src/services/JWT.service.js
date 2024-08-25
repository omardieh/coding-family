"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTService {
    constructor() {
        this.generateJWT = (payload, isRefresh = false) => {
            const expiresIn = isRefresh ? this.refreshTokenExpiresIn : this.accessTokenExpiresIn;
            const secret = this.secret;
            if (!secret) {
                throw new Error('JWT secret is not defined.');
            }
            const options = {
                algorithm: 'HS256',
                ...(!payload.exp && { expiresIn }),
            };
            return jsonwebtoken_1.default.sign(payload, secret, options);
        };
        this.verifyJWT = (token) => {
            try {
                return jsonwebtoken_1.default.verify(token, this.secret);
            }
            catch (error) {
                console.error(error);
                throw new Error('Invalid Token.');
            }
        };
        this.handleRefreshToken = (_, res, next, refreshToken) => {
            try {
                const payload = this.verifyJWT(refreshToken);
                const newAccessToken = this.generateJWT(payload);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: true,
                });
                res.header('Authorization', newAccessToken);
                return payload;
            }
            catch (error) {
                console.error('Refresh Token verification failed:', error);
                res.status(400).send('Invalid Token.');
                next(error);
                return null;
            }
        };
        this.isAuthenticated = (req, res, next) => {
            const accessToken = req.headers['authorization'];
            const refreshToken = req.cookies['refreshToken'];
            let payload = null;
            if (!accessToken && !refreshToken) {
                return next(new Error('Access Denied. No token provided.'));
            }
            try {
                if (accessToken) {
                    const decoded = jsonwebtoken_1.default.decode(accessToken);
                    const currentTime = Math.floor(Date.now() / 1000);
                    if (decoded.exp && decoded.exp < currentTime) {
                        payload = this.handleRefreshToken(req, res, next, refreshToken);
                        if (!payload) {
                            next(new Error('Failed to refresh access token.'));
                            return;
                        }
                        req.payload = payload;
                        next();
                        return;
                    }
                    payload = this.verifyJWT(accessToken);
                    if (!payload) {
                        next(new Error('Failed to refresh access token.'));
                        return;
                    }
                    req.payload = payload;
                    next();
                    return;
                }
                payload = this.handleRefreshToken(req, res, next, refreshToken);
                if (!payload) {
                    return next(new Error('Failed to refresh access token.'));
                }
                req.payload = payload;
                next();
            }
            catch (error) {
                next(error);
            }
        };
        this.secret = process.env.JWT_TOKEN_SECRET || '';
        this.accessTokenExpiresIn = '5m';
        this.refreshTokenExpiresIn = '1d';
    }
}
exports.JWTService = JWTService;
