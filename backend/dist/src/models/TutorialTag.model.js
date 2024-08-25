"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialTagModel = void 0;
const utils_1 = require("@/utils");
const mongoose_1 = require("mongoose");
const tutorialTagSchema = new mongoose_1.Schema({
    label: {
        type: String,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    tutorials: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Tutorial',
        },
    ],
}, {
    timestamps: true,
});
tutorialTagSchema.pre('save', async function (next) {
    if (!this.isModified('label')) {
        return next();
    }
    this.slug = (0, utils_1.slugify)(this.label);
    const TutorialTagModel = this.constructor;
    const existingTag = await TutorialTagModel.findOne({ slug: this.slug });
    if (existingTag) {
        let suffix = 1;
        while (await TutorialTagModel.findOne({ slug: `${this.slug}${suffix}` })) {
            suffix++;
        }
        this.slug = `${this.slug}${suffix}`;
    }
    next();
});
exports.TutorialTagModel = (0, mongoose_1.model)('TutorialTag', tutorialTagSchema);
