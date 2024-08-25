"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorialRoutes = void 0;
const models_1 = require("@/models");
const routes_1 = require("@/routes");
class TutorialRoutes extends routes_1.BaseRouter {
    constructor() {
        super();
        this.getAllTutorials = async (req, res, next) => {
            const page = parseInt(req.query.page) || 1;
            const per_page = parseInt(req.query.per_page) || 12;
            const sort = req.query.sort || 'asc';
            const field = req.query.field || 'title';
            const skip = (page - 1) * per_page;
            try {
                const totalTutorialsCount = await models_1.TutorialModel.countDocuments();
                const foundTutorials = await models_1.TutorialModel.find()
                    .sort({
                    [field]: field === 'views' ? (sort === 'asc' ? -1 : 1) : sort === 'asc' ? 1 : -1,
                })
                    .skip(skip)
                    .limit(per_page)
                    .collation({ locale: 'en' })
                    .populate('tags author', 'avatar username label tutorials slug');
                res.json({
                    tutorials: foundTutorials,
                    current_page: +page,
                    per_page: +per_page,
                    total_pages: Math.ceil(totalTutorialsCount / per_page),
                    total_tutorials: totalTutorialsCount,
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.addNewTutorial = async (req, res, next) => {
            const { authorID, title, description, tags, content, isPublic } = req.body;
            try {
                const createdTutorial = await models_1.TutorialModel.create({
                    author: authorID,
                    isPublic,
                    title,
                    description,
                    tags: [],
                    content,
                });
                await models_1.UserModel.findByIdAndUpdate(authorID, {
                    $push: { tutorials: createdTutorial._id },
                });
                if (!tags.length) {
                    return;
                }
                for (const tag of tags) {
                    const foundTag = await models_1.TutorialTagModel.findOne({ label: tag });
                    if (foundTag) {
                        foundTag.tutorials.push(createdTutorial._id);
                        createdTutorial.tags.push(foundTag._id);
                        await foundTag.save();
                        continue;
                    }
                    const createdTag = await models_1.TutorialTagModel.create({
                        label: tag,
                        tutorials: [createdTutorial._id],
                    });
                    createdTutorial.tags.push(createdTag._id);
                }
                await createdTutorial.save();
                res.status(201).json({ tutorial: createdTutorial, created: true });
            }
            catch (error) {
                this.db.logMongoError(error, req, res, next);
            }
        };
        this.getTutorialBySlug = async (req, res, next) => {
            const { slug } = req.params;
            try {
                const foundTutorial = await models_1.TutorialModel.findOne({ slug }).populate('tags author');
                if (!foundTutorial) {
                    res.json('error finding tutorial');
                    return;
                }
                foundTutorial.views += 1;
                await foundTutorial.save();
                res.json(foundTutorial);
            }
            catch (error) {
                next(error);
            }
        };
        this.updateTutorialBySlug = async (req, res, next) => {
            const { slug } = req.params;
            const { tags: newTags, ...reqBody } = req.body;
            try {
                const updatedTutorial = await models_1.TutorialModel.findOneAndUpdate({ slug }, reqBody, {
                    new: true,
                    runValidators: true,
                    upsert: true,
                }).populate('tags');
                if (!updatedTutorial) {
                    throw new Error('Tutorial not found');
                }
                const tutorialTags = updatedTutorial.tags;
                const clearRemovedTags = [];
                const tagsToRemove = [];
                const createTags = [];
                for (const tag of tutorialTags) {
                    if (tag && !newTags.includes(tag.label)) {
                        tagsToRemove.push(tag._id);
                        clearRemovedTags.push(models_1.TutorialTagModel.findOneAndUpdate({ _id: tag._id }, { $pull: { tutorials: updatedTutorial._id } }, { new: true }));
                    }
                }
                await Promise.all(clearRemovedTags);
                updatedTutorial.tags = tutorialTags.filter((tag) => !tagsToRemove.includes(tag._id));
                for (const tag of newTags) {
                    if (!tutorialTags.find((t) => t.label === tag)) {
                        const foundTag = await models_1.TutorialTagModel.findOne({ label: tag });
                        if (foundTag) {
                            if (!foundTag.tutorials.includes(updatedTutorial._id)) {
                                foundTag.tutorials.push(updatedTutorial._id);
                                createTags.push(foundTag.save());
                            }
                            updatedTutorial.tags.push(foundTag);
                            continue;
                        }
                        const createdTag = await models_1.TutorialTagModel.create({
                            label: tag,
                            tutorials: [updatedTutorial._id],
                        });
                        updatedTutorial.tags.push(createdTag);
                        createTags.push(createdTag.save());
                    }
                }
                await Promise.all(createTags);
                await updatedTutorial.save();
                res.status(200).json({ updated: true });
            }
            catch (error) {
                this.db.logMongoError(error, req, res, next);
            }
        };
        this.router.get('/tutorials', this.getAllTutorials);
        this.router.post('/tutorials', this.JWTService.isAuthenticated, this.addNewTutorial);
        this.router.get('/tutorials/:slug', this.getTutorialBySlug);
        this.router.patch('/tutorials/:slug', this.JWTService.isAuthenticated, this.updateTutorialBySlug);
    }
}
exports.tutorialRoutes = new TutorialRoutes().router;
