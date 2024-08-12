import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";


import { Application } from 'express';

export class CloudinaryConfig {
  constructor(private app: Application) {
    this.cloudinary = cloudinary;
    this.cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    this.storage = new CloudinaryStorage({
      cloudinary,
      params: {
        allowed_formats: ["jpg", "png"],
        folder: "coding-family/user",
      },
    });
    this.multer = multer({this.storage});
    this.configureCors();
  }
}
