"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubRoute = void 0;
const models_1 = require("@/models");
const routes_1 = require("@/routes");
const axios_1 = __importDefault(require("axios"));
class GithubRoute extends routes_1.BaseRouter {
    constructor() {
        super();
        this.getGithubAuthRedirectURL = async (_, res, next) => {
            try {
                const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=read:user`;
                res.redirect(githubAuthURL);
            }
            catch (error) {
                next(error);
                res.status(500).send('Internal Server Error');
            }
        };
        this.retrieveGithubAuthToken = async (req, res, next) => {
            const { code } = req.body;
            if (!code) {
                res.status(404).json('code not found');
            }
            try {
                const getGithubAccessToken = await axios_1.default.post('https://github.com/login/oauth/access_token', {
                    code: code,
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    redirect_uri: process.env.GITHUB_REDIRECT_URI,
                }, {
                    headers: {
                        Accept: 'application/json',
                    },
                });
                const githubAccessToken = getGithubAccessToken.data.access_token;
                if (!githubAccessToken)
                    return;
                const getUserInfo = await axios_1.default.get('https://api.github.com/user', {
                    headers: {
                        Authorization: `Bearer ${githubAccessToken}`,
                    },
                });
                const { login, id, avatar_url, name } = getUserInfo.data;
                const foundUser = await models_1.UserModel.findOne({ githubID: id });
                if (foundUser) {
                    const { _id, fullName, avatar, username } = foundUser;
                    const payload = { _id, username, fullName, avatar };
                    const refreshToken = this.JWTService.generateJWT(payload, true);
                    const accessToken = this.JWTService.generateJWT(payload);
                    res
                        .cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        sameSite: 'strict',
                    })
                        .set('Access-Control-Expose-Headers', 'Authorization')
                        .header('Authorization', `Bearer ${accessToken}`)
                        .json(payload);
                    return;
                }
                const createdUser = await models_1.UserModel.create({
                    username: `${login}_${id}`,
                    githubID: id,
                    fullName: name,
                    avatar: avatar_url,
                    isEmailVerified: true,
                    emailVerifyCode: 'verified',
                });
                const { _id, username, fullName, avatar } = createdUser;
                const payload = { _id, username, fullName, avatar };
                const refreshToken = this.JWTService.generateJWT(payload, true);
                const accessToken = this.JWTService.generateJWT(payload);
                res
                    .cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'strict',
                })
                    .set('Access-Control-Expose-Headers', 'Authorization')
                    .header('Authorization', `Bearer ${accessToken}`)
                    .json(payload);
            }
            catch (error) {
                console.error('google auth error: ', error);
                next(error);
            }
        };
        this.router.get('/auth/github', this.getGithubAuthRedirectURL);
        this.router.post('/auth/github', this.retrieveGithubAuthToken);
    }
}
exports.githubRoute = new GithubRoute().router;
