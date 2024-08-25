"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.captchaRoute = void 0;
const routes_1 = require("@/routes");
const axios_1 = __importDefault(require("axios"));
class CaptchaRoute extends routes_1.BaseRouter {
    constructor() {
        super();
        this.retrieveCaptchaToken = async (req, res, next) => {
            const { token } = req.body;
            try {
                const response = await axios_1.default.post('https://www.google.com/recaptcha/api/siteverify', null, {
                    params: {
                        secret: process.env.GOOGLE_CAPTCHA_SECRET,
                        response: token,
                    },
                });
                const { success, score } = response.data;
                if (success && score >= 0.5) {
                    res.json({ verified: true });
                }
                else {
                    res.json({ verified: false });
                }
            }
            catch (error) {
                next(error);
            }
        };
        this.router.post('/auth/captcha', this.retrieveCaptchaToken);
    }
}
exports.captchaRoute = new CaptchaRoute().router;
