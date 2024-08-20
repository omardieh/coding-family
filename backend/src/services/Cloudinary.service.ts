import { v2 as cloudinary, ConfigOptions } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer, { Multer } from 'multer';

export class CloudinaryService {
  private cloudinaryConfig: ConfigOptions;

  constructor() {
    this.cloudinaryConfig = this.validateConfig();
    cloudinary.config(this.cloudinaryConfig);
  }

  private validateConfig(): ConfigOptions {
    const cloudinaryConfig: ConfigOptions = {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
      api_key: process.env.CLOUDINARY_API_KEY as string,
      api_secret: process.env.CLOUDINARY_API_SECRET as string,
    };

    if (!cloudinaryConfig.cloud_name || !cloudinaryConfig.api_key || !cloudinaryConfig.api_secret) {
      throw new Error('Cloudinary configuration variables are missing.');
    }

    return cloudinaryConfig;
  }

  public getMulterInstance(): Multer {
    const storage = new CloudinaryStorage({
      cloudinary,
      params: async (_, file) => ({
        folder: 'coding-family/user',
        format: file.mimetype.split('/')[1],
        public_id: file.originalname.split('.')[0],
      }),
    });

    return multer({ storage });
  }
}
