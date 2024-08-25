import { TutorialModel, TutorialTagModel, UserModel } from '@/models';
import { BaseRouter } from '@/routes';
import { ITutorialTagModel } from '@/types';
import { NextFunction, Request, Response } from 'express';
import { Document, Types } from 'mongoose';

class TutorialRoutes extends BaseRouter {
  constructor() {
    super();
    this.router.get('/tutorials', this.getAllTutorials);
    this.router.post('/tutorials', this.JWTService.isAuthenticated, this.addNewTutorial);
    this.router.get('/tutorials/:slug', this.getTutorialBySlug);
    this.router.patch('/tutorials/:slug', this.JWTService.isAuthenticated, this.updateTutorialBySlug);
  }

  getAllTutorials = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const per_page = parseInt(req.query.per_page as string) || 12;
    const sort = (req.query.sort as string) || 'asc';
    const field = (req.query.field as string) || 'title';
    const skip = (page - 1) * per_page;
    try {
      const totalTutorialsCount = await TutorialModel.countDocuments();
      const foundTutorials = await TutorialModel.find()
        .sort({
          [field]: field === 'views' ? (sort === 'asc' ? -1 : 1) : sort === 'asc' ? 1 : -1,
        })
        .skip(skip)
        .limit(per_page)
        .collation({ locale: 'en' })
        .populate('tags author', 'avatar username label tutorials slug');
      res.json({
        tutorials: foundTutorials,
        current_page: +page,
        per_page: +per_page,
        total_pages: Math.ceil(totalTutorialsCount / per_page),
        total_tutorials: totalTutorialsCount,
      });
    } catch (error) {
      next(error);
    }
  };

  addNewTutorial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { authorID, title, description, tags, content, isPublic } = req.body;
    try {
      const createdTutorial = await TutorialModel.create({
        author: authorID,
        isPublic,
        title,
        description,
        tags: [],
        content,
      });
      await UserModel.findByIdAndUpdate(authorID, {
        $push: { tutorials: createdTutorial._id },
      });
      if (!tags.length) {
        return;
      }
      for (const tag of tags) {
        const foundTag = await TutorialTagModel.findOne({ label: tag });
        if (foundTag) {
          foundTag.tutorials.push(createdTutorial._id as Types.ObjectId);
          createdTutorial.tags.push(foundTag._id as Types.ObjectId & ITutorialTagModel);
          await foundTag.save();
          continue;
        }
        const createdTag = await TutorialTagModel.create({
          label: tag,
          tutorials: [createdTutorial._id],
        });
        createdTutorial.tags.push(createdTag._id as Types.ObjectId & ITutorialTagModel);
      }
      await createdTutorial.save();
      res.status(201).json({ tutorial: createdTutorial, created: true });
    } catch (error) {
      this.db.logMongoError(error, req, res, next);
    }
  };

  getTutorialBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { slug } = req.params;
    try {
      const foundTutorial = await TutorialModel.findOne({ slug }).populate('tags author');
      if (!foundTutorial) {
        res.json('error finding tutorial');
        return;
      }
      foundTutorial.views += 1;
      await foundTutorial.save();
      res.json(foundTutorial);
    } catch (error) {
      next(error);
    }
  };

  updateTutorialBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { slug } = req.params;
    const { tags: newTags, ...reqBody } = req.body;
    try {
      const updatedTutorial = await TutorialModel.findOneAndUpdate({ slug }, reqBody, {
        new: true,
        runValidators: true,
        upsert: true,
      }).populate('tags');
      if (!updatedTutorial) {
        throw new Error('Tutorial not found');
      }
      const tutorialTags = updatedTutorial.tags as ITutorialTagModel[];
      const clearRemovedTags: Promise<Document<unknown, object, ITutorialTagModel> | null>[] = [];
      const tagsToRemove: Types.ObjectId[] = [];
      const createTags: Promise<ITutorialTagModel>[] = [];
      for (const tag of tutorialTags) {
        if (tag && !newTags.includes(tag.label)) {
          tagsToRemove.push(tag._id as Types.ObjectId);
          clearRemovedTags.push(
            TutorialTagModel.findOneAndUpdate(
              { _id: tag._id },
              { $pull: { tutorials: updatedTutorial._id } },
              { new: true },
            ),
          );
        }
      }
      await Promise.all(clearRemovedTags);
      updatedTutorial.tags = tutorialTags.filter((tag) => !tagsToRemove.includes(tag._id as Types.ObjectId));
      for (const tag of newTags) {
        if (!tutorialTags.find((t) => t.label === tag)) {
          const foundTag = await TutorialTagModel.findOne({ label: tag });
          if (foundTag) {
            if (!foundTag.tutorials.includes(updatedTutorial._id as Types.ObjectId)) {
              foundTag.tutorials.push(updatedTutorial._id as Types.ObjectId);
              createTags.push(foundTag.save());
            }
            updatedTutorial.tags.push(foundTag);
            continue;
          }
          const createdTag = await TutorialTagModel.create({
            label: tag,
            tutorials: [updatedTutorial._id],
          });
          updatedTutorial.tags.push(createdTag);
          createTags.push(createdTag.save());
        }
      }
      await Promise.all(createTags);
      await updatedTutorial.save();
      res.status(200).json({ updated: true });
    } catch (error) {
      this.db.logMongoError(error, req, res, next);
    }
  };
}

export const { router: tutorialRoutes } = new TutorialRoutes();
