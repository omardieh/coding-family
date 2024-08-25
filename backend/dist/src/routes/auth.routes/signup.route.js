"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRoute = void 0;
const models_1 = require("@/models");
const routes_1 = require("@/routes");
const services_1 = require("@/services");
class SignupRoute extends routes_1.BaseRouter {
    constructor() {
        super();
        this.signUserUp = async (req, res, next) => {
            const { email, password, username } = req.body;
            if (!email || !password || !username) {
                res.status(400).json('Provide Username, Email and Password');
                return;
            }
            try {
                const foundUser = await models_1.UserModel.findOne({ email });
                if (foundUser) {
                    res.status(400).json('User already exists.');
                    return;
                }
                const emailVerifyCode = this.emailService.getRandomString();
                const emailVerifyCodeExpiresAt = this.emailService.getExpirationDate(15);
                const createdUser = await models_1.UserModel.create({
                    email,
                    password,
                    username,
                    emailVerifyCode,
                    emailVerifyCodeExpiresAt,
                });
                const { _id, email: createdEmail, username: createdUsername } = createdUser;
                const payload = { _id, createdEmail, createdUsername };
                const emailVerifyToken = this.JWTService.generateJWT(payload);
                await this.emailService.sendEmailVerify(createdUser, emailVerifyCode, emailVerifyToken);
                res.status(200).send('Verification Email was sent Successfully');
            }
            catch (error) {
                this.db.logMongoError(error, req, res, next);
            }
        };
        this.emailService = new services_1.EmailService();
        this.router.post('/auth/signup', this.signUserUp);
    }
}
exports.signupRoute = new SignupRoute().router;
