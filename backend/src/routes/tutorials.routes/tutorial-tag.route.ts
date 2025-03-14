import { TutorialTagModel } from '@/models';
import { BaseRouter } from '@/routes';
import { NextFunction, Request, Response } from 'express';

class TutorialTagRoutes extends BaseRouter {
  constructor() {
    super();
    this.router.get('/tutorials/tags', this.getAllTutorialsTags);
    this.router.get('/tutorials/tags/:slug', this.getTutorialTagBySlug);
  }

  getAllTutorialsTags = async (_: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allTags = await TutorialTagModel.find();
      res.json(allTags);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getTutorialTagBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { slug } = req.params;
    try {
      const foundTag = await TutorialTagModel.findOne({ slug }).populate('tutorials');
      if (!foundTag) {
        res.json('error finding tag');
        return;
      }
      res.json(foundTag);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}

export const { router: tutorialTagRoutes } = new TutorialTagRoutes();
