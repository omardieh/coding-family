"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: true,
        trim: true,
        match: [/^[a-zA-Z0-9_.]{6,}$/, 'Usernames can only use letters, numbers, underscores, and periods.'],
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.'],
    },
    password: {
        type: String,
        match: [
            /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
            'Password must have at least 6 characters and contain at least one number, one lowercase, and one uppercase letter.',
        ],
    },
    avatar: {
        type: String,
        default: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    },
    githubID: String,
    googleID: String,
    fullName: String,
    role: {
        select: false,
        type: String,
        enum: ['member', 'editor', 'admin'],
        default: 'member',
    },
    emailVerifyCode: {
        type: String,
        required: [true, 'Email Verify code is missing.'],
        default: '',
    },
    emailVerifyCodeExpiresAt: {
        type: Date,
        required: [true, 'Email Verify code exp date is missing.'],
        default: Date.now(),
        select: false,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    createdTutorials: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Tutorial',
        },
    ],
    favoriteTutorials: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Tutorial',
        },
    ],
    bio: String,
    socialMedia: {
        facebook: String,
        twitter: String,
        linkedin: String,
    },
    skills: [String],
    country: String,
    website: String,
    followers: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    following: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    notificationPreferences: {
        email: {
            type: Boolean,
            default: true,
        },
    },
    accountStatus: {
        type: String,
        enum: ['active', 'suspended'],
        default: 'active',
    },
}, {
    timestamps: true,
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.isModified('emailVerifyCode')) {
        return next();
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
    this.emailVerifyCode = await bcryptjs_1.default.hash(this.emailVerifyCode, salt);
    next();
});
userSchema.methods.comparePassword = function (password) {
    return bcryptjs_1.default.compare(password, this.password);
};
userSchema.methods.compareEmail = function (verificationCode) {
    return bcryptjs_1.default.compare(verificationCode, this.emailVerifyCode);
};
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
