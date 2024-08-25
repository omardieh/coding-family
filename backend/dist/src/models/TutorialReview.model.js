"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialReviewModel = void 0;
const mongoose_1 = require("mongoose");
const tutorialReviewSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: true,
        maxlength: 500,
    },
    rate: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        set: (value) => Math.round(value), // Ensures rate is rounded to nearest integer
    },
    pendingApproval: {
        type: Boolean,
        default: true,
    },
    isDraft: {
        type: Boolean,
        default: true,
    },
    tutorial: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Tutorial',
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reviewReplies: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'ReviewReply',
        },
    ],
}, {
    timestamps: true,
});
exports.TutorialReviewModel = (0, mongoose_1.model)('TutorialReview', tutorialReviewSchema);
