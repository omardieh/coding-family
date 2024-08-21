import { UserModel } from '@/models';
import { BaseRouter } from '@/routes';
import { NextFunction, Request, Response } from 'express';

class ProfileRoutes extends BaseRouter {
  constructor() {
    super();
    this.router.get('/user/profile', this.getUser);
    this.router.patch('/user/profile', this.updateUser);
  }

  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { _id } = req.payload;
      const foundUser = await User.findById(_id);
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

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { _id } = req.payload;
    try {
      const foundUser = await User.findOne({
        username: req.body.username,
      });

      if (foundUser && JSON.stringify(foundUser._id) !== JSON.stringify(_id)) {
        res.status(409).json('Username already in use');
        return;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(_id, req.body, {
        new: true,
      });
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
      console.log(error);
      res.json(error);
    }
  }
}

export const { router: profileRoutes } = new ProfileRoutes();
