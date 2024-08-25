"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRoutes = void 0;
const models_1 = require("@/models");
const routes_1 = require("@/routes");
const services_1 = require("@/services");
class UploadRoutes extends routes_1.BaseRouter {
    constructor() {
        super();
        this.uploadUserAvatar = async (req, res, next) => {
            try {
                if (!req.file)
                    return;
                const updatedUser = await models_1.UserModel.findByIdAndUpdate(req.body.userID, { avatar: req.file.path }, { new: true });
                res.send(updatedUser);
            }
            catch (error) {
                next(error);
                res.status(500).send('Internal Server Error');
            }
        };
        this.cloudinary = new services_1.CloudinaryService();
        this.router.patch('/user/upload', this.cloudinary.getMulterInstance().single('user-avatar'), this.uploadUserAvatar);
    }
}
exports.uploadRoutes = new UploadRoutes().router;
