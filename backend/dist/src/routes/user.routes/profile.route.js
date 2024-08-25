"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const models_1 = require("@/models");
const routes_1 = require("@/routes");
class ProfileRoutes extends routes_1.BaseRouter {
    constructor() {
        super();
        this.getUser = async (req, res, next) => {
            try {
                if (!req.payload?._id) {
                    throw new Error('Error finding payload, user might be not authenticated');
                }
                const { _id } = req.payload;
                const foundUser = await models_1.UserModel.findById(_id);
                if (!foundUser) {
                    res.status(404).json('User not found');
                    return;
                }
                const { username, email, country, avatar, bio, website, socialMedia, following, followers } = foundUser;
                res.send({
                    _id,
                    username,
                    email,
                    country,
                    avatar,
                    bio,
                    website,
                    socialMedia,
                    following,
                    followers,
                });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        };
        this.updateUser = async (req, res, next) => {
            if (!req.payload?._id)
                return;
            const { _id } = req.payload;
            try {
                const foundUser = await models_1.UserModel.findOne({
                    username: req.body.username,
                });
                if (foundUser && JSON.stringify(foundUser._id) !== JSON.stringify(_id)) {
                    res.status(409).json('Username already in use');
                    return;
                }
                const updatedUser = await models_1.UserModel.findByIdAndUpdate(_id, req.body, {
                    new: true,
                });
                if (!updatedUser) {
                    res.status(404).json('Fail to update user');
                    return;
                }
                const { username, email, country, avatar, bio, website, socialMedia, following, followers } = updatedUser;
                res.json({
                    username,
                    email,
                    country,
                    avatar,
                    bio,
                    website,
                    socialMedia,
                    following,
                    followers,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.router.get('/user/profile', this.JWTService.isAuthenticated, this.getUser);
        this.router.patch('/user/profile', this.JWTService.isAuthenticated, this.updateUser);
    }
}
exports.profileRoutes = new ProfileRoutes().router;
