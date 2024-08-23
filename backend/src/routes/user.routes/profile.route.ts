import { UserModel } from '@/models';
import { BaseRouter } from '@/routes';
import { RequestWithPayload } from '@/types';
import { NextFunction, Response } from 'express';

class ProfileRoutes extends BaseRouter {
  constructor() {
    super();
    this.router.get('/user/profile', this.getUser);
    this.router.patch('/user/profile', this.updateUser);
  }

  async getUser(req: RequestWithPayload, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.payload?._id) return;
      const { _id } = req.payload;
      const foundUser = await UserModel.findById(_id);
      if (!foundUser) {
        res.status(404).json('User not found');
        return;
      }
      const { username, email, country, avatar, bio, website, socialMedia, following, followers } = foundUser;
      res.send({
        _id,
        username,
        email,
        country,
        avatar,
        bio,
        website,
        socialMedia,
        following,
        followers,
      });
    } catch (error) {
      next(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async updateUser(req: RequestWithPayload, res: Response, next: NextFunction): Promise<void> {
    if (!req.payload?._id) return;
    const { _id } = req.payload;
    try {
      const foundUser = await UserModel.findOne({
        username: req.body.username,
      });

      if (foundUser && JSON.stringify(foundUser._id) !== JSON.stringify(_id)) {
        res.status(409).json('Username already in use');
        return;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(_id, req.body, {
        new: true,
      });

      if (!updatedUser) {
        res.status(404).json('Fail to update user');
        return;
      }

      const { username, email, country, avatar, bio, website, socialMedia, following, followers } = updatedUser;
      res.json({
        username,
        email,
        country,
        avatar,
        bio,
        website,
        socialMedia,
        following,
        followers,
      });
    } catch (error) {
      next(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

export const { router: profileRoutes } = new ProfileRoutes();