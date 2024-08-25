"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRoute = void 0;
const models_1 = require("@/models");
const routes_1 = require("@/routes");
class VerifyRoute extends routes_1.BaseRouter {
    constructor() {
        super();
        this.verifyLoggedIn = async (req, res, next) => {
            try {
                res.status(200).json(req.payload);
            }
            catch (error) {
                next(error);
            }
        };
        this.verifyUserEmail = async (req, res, next) => {
            const { userID, code } = req.body;
            try {
                const foundUser = await models_1.UserModel.findById(userID);
                if (!foundUser) {
                    res.status(400).json('verification code is not valid');
                    return;
                }
                if (foundUser.emailVerifyCodeExpiresAt.getTime() <= Date.now()) {
                    res.status(400).json('verification code has expired');
                    return;
                }
                if (foundUser.emailVerifyCode === 'verified') {
                    res.status(200).json('email has been already verified');
                    return;
                }
                const codeCorrect = await foundUser.compareEmail(code);
                if (!codeCorrect) {
                    res.status(400).json('verification code is not valid');
                    return;
                }
                const updatedUser = await models_1.UserModel.findByIdAndUpdate(foundUser._id, { isEmailVerified: true, emailVerifyCode: 'verified' }, { new: true });
                if (updatedUser && !updatedUser.isEmailVerified) {
                    res.status(400).json('error while verifying email');
                    return;
                }
                res.status(201).json('email verification was successful');
            }
            catch (err) {
                next(err);
            }
        };
        this.router.get('/auth/token/verify', this.JWTService.isAuthenticated, this.verifyLoggedIn);
        this.router.post('/auth/email/verify', this.verifyUserEmail);
    }
}
exports.verifyRoute = new VerifyRoute().router;
