import { UserModel } from '@/models';
import { BaseRouter } from '@/routes';
import { CloudinaryService } from '@/services';
import { NextFunction, Request, Response } from 'express';

class UploadRoutes extends BaseRouter {
  private cloudinary;
  constructor() {
    super();
    this.cloudinary = new CloudinaryService();
    this.router.patch('/user/upload', this.cloudinary.getMulterInstance().single('user-avatar'), this.uploadUserAvatar);
  }

  async uploadUserAvatar(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) return;
      const updatedUser = await UserModel.findByIdAndUpdate(req.body.userID, { avatar: req.file.path }, { new: true });
      res.send(updatedUser);
    } catch (error) {
      next(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

export const { router: uploadRoutes } = new UploadRoutes();
