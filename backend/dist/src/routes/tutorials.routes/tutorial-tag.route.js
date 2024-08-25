"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorialTagRoutes = void 0;
const models_1 = require("@/models");
const routes_1 = require("@/routes");
class TutorialTagRoutes extends routes_1.BaseRouter {
    constructor() {
        super();
        this.getAllTutorialsTags = async (_, res, next) => {
            try {
                const allTags = await models_1.TutorialTagModel.find();
                res.json(allTags);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        };
        this.getTutorialTagBySlug = async (req, res, next) => {
            const { slug } = req.params;
            try {
                const foundTag = await models_1.TutorialTagModel.findOne({ slug }).populate('tutorials');
                if (!foundTag) {
                    res.json('error finding tag');
                    return;
                }
                res.json(foundTag);
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        };
        this.router.get('/tutorials/tags', this.getAllTutorialsTags);
        this.router.get('/tutorials/tags/:slug', this.getTutorialTagBySlug);
    }
}
exports.tutorialTagRoutes = new TutorialTagRoutes().router;
