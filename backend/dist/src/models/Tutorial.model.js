"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialModel = void 0;
const utils_1 = require("@/utils");
const mongoose_1 = require("mongoose");
const tutorialSchema = new mongoose_1.Schema({
    isPublic: {
        type: Boolean,
        required: [true, 'Active state is required.'],
        default: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    title: {
        type: String,
        required: [true, 'Title is required.'],
        trim: true,
        maxlength: [100, 'Title must be at most 100 characters.'],
        minlength: [8, 'Title must be at least 8 characters.'],
        match: [
            /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/,
            'Tutorial title should contain only letters, numbers, with one space between words.',
        ],
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        maxlength: [500, 'Description must be at most 500 characters.'],
    },
    content: {
        type: String,
        required: [true, 'Content is required.'],
        maxlength: [50000, 'Content must be at most 50,000 characters.'],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Author is required.'],
    },
    tags: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'TutorialTag',
            required: [true, 'At least one tag is required.'],
            unique: true,
        },
    ],
    views: {
        type: Number,
        default: 0,
        min: [0, 'Views cannot be negative.'],
    },
    likes: {
        type: Number,
        default: 0,
        min: [0, 'Likes cannot be negative.'],
    },
    comments: [
        {
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'Comment user is required.'],
            },
            content: {
                type: String,
                required: [true, 'Comment content is required.'],
                maxlength: [1000, 'Comment must be at most 1000 characters.'],
            },
            date: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    estimatedReadingTime: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
tutorialSchema.pre('save', function (next) {
    this.estimatedReadingTime = Math.ceil(this.content.length / 5 / 200) || 1;
    next();
});
tutorialSchema.pre('save', async function (next) {
    if (!this.isModified('title')) {
        return next();
    }
    this.slug = (0, utils_1.slugify)(this.title);
    const existingTutorial = await this.constructor.findOne({ slug: this.slug });
    if (existingTutorial) {
        let suffix = 1;
        while (await this.constructor.findOne({ slug: `${this.slug}${suffix}` })) {
            suffix++;
        }
        this.slug = `${this.slug}${suffix}`;
    }
    next();
});
exports.TutorialModel = (0, mongoose_1.model)('Tutorial', tutorialSchema);
