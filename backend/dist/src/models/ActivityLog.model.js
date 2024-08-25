"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityLogModel = void 0;
const mongoose_1 = require("mongoose");
const activityLogSchema = new mongoose_1.Schema({
    clientIP: {
        type: String,
    },
    reqMethod: {
        type: String,
    },
    reqPath: {
        type: String,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });
exports.ActivityLogModel = (0, mongoose_1.model)('ActivityLog', activityLogSchema);
