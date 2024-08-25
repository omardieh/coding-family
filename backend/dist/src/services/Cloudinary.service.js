"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const utils_1 = require("@/utils");
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
(0, utils_1.setEnv)();
class CloudinaryService {
    constructor() {
        this.validateConfig = () => {
            const cloudinaryConfig = {
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            };
            if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
                throw new Error('Cloudinary configuration variables are missing.');
            }
            return cloudinaryConfig;
        };
        this.getMulterInstance = () => {
            const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
                cloudinary: cloudinary_1.v2,
                params: async (_, file) => ({
                    folder: 'coding-family/user',
                    format: file.mimetype.split('/')[1],
                    public_id: file.originalname.split('.')[0],
                }),
            });
            return (0, multer_1.default)({ storage });
        };
        this.cloudinaryConfig = this.validateConfig();
        cloudinary_1.v2.config(this.cloudinaryConfig);
    }
}
exports.CloudinaryService = CloudinaryService;
