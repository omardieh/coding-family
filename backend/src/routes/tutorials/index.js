const tutorialsRouter = require("express").Router();
const { isAuthenticated } = require("../../middleware/jwt.middleware");
const Tutorial = require("../../models/Tutorial.model");
const TutorialTag = require("../../models/TutorialTag.model");
const User = require("../../models/User.model");
const mongoInputError = require("../../middleware/mongoInputsError.middleware");

tutorialsRouter.get("/", async (req, res, next) => {
  const { page = 1, per_page = 12, sort = "asc", field = "title" } = req.query;
  const skip = (page - 1) * per_page;
  try {
    const totalTutorialsCount = await Tutorial.countDocuments();
    const foundTutorials = await Tutorial.find()
      .sort({
        [field]:
          field === "views"
            ? sort === "asc"
              ? -1
              : 1
            : sort === "asc"
            ? 1
            : -1,
      })
      .skip(skip)
      .limit(per_page)
      .collation({ locale: "en" })
      .populate("tags author", "avatar username label tutorials slug");
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
});

tutorialsRouter.post("/", isAuthenticated, async (req, res, next) => {
  const { authorID, title, description, tags, content, isPublic } = req.body;
  try {
    const createdTutorial = await Tutorial.create({
      author: authorID,
      isPublic,
      title,
      description,
      tags: [],
      content,
    });
    await User.findByIdAndUpdate(authorID, {
      $push: { tutorials: createdTutorial._id },
    });
    if (!tags.length) {
      return;
    }
    for (const tag of tags) {
      const foundTag = await TutorialTag.findOne({ label: tag });
      if (foundTag) {
        foundTag.tutorials.push(createdTutorial._id);
        createdTutorial.tags.push(foundTag._id);
        await foundTag.save();
        continue;
      }
      const createdTag = await TutorialTag.create({
        label: tag,
        tutorials: [createdTutorial._id],
      });
      createdTutorial.tags.push(createdTag._id);
    }
    await createdTutorial.save();
    res.status(201).json({ tutorial: createdTutorial, created: true });
  } catch (error) {
    mongoInputError(error, req, res);
  }
});

tutorialsRouter.get("/:slug", async (req, res, next) => {
  const { slug } = req.params;
  try {
    const foundTutorial = await Tutorial.findOne({ slug })
      .populate("tags author")
      .exec();
    if (!foundTutorial) {
      res.json("error finding tutorial");
      return;
    }
    foundTutorial.views += 1;
    await foundTutorial.save();
    res.json(foundTutorial);
  } catch (error) {
    res.json(error.message);
  }
});

tutorialsRouter.put("/:slug", async (req, res, next) => {
  const { slug } = req.params;
  const { tags: newTags, ...reqBody } = req.body;
  try {
    const updatedTutorial = await Tutorial.findOneAndUpdate({ slug }, reqBody, {
      new: true,
      runValidators: true,
      upsert: true,
    }).populate("tags");
    // return;
    const [tagsToRemove, clearRemovedTags, createTags] = [[], [], []];
    for (const tag of updatedTutorial.tags) {
      if (tag && !newTags.includes(tag.label)) {
        tagsToRemove.push(tag._id);
        clearRemovedTags.push(
          TutorialTag.findOneAndUpdate(
            { _id: tag._id },
            { $pull: { tutorials: updatedTutorial._id } },
            { new: true }
          )
        );
      }
    }
    await Promise.all(clearRemovedTags);
    updatedTutorial.tags = updatedTutorial.tags.filter(
      (t) => !tagsToRemove.includes(t._id)
    );

    for (const tag of newTags) {
      if (!updatedTutorial.tags.find((t) => t.label === tag)) {
        const foundTag = await TutorialTag.findOne({ label: tag });
        if (foundTag) {
          if (!foundTag.tutorials.includes(updatedTutorial._id)) {
            foundTag.tutorials.push(updatedTutorial._id);
            createTags.push(foundTag.save());
          }
          updatedTutorial.tags.push(foundTag._id);
          continue;
        }
        const createdTag = await TutorialTag.create({
          label: tag,
          tutorials: [updatedTutorial._id],
        });
        updatedTutorial.tags.push(createdTag._id);
      }
    }
    await Promise.all(createTags);
    await updatedTutorial.save();
    res.status(200).json({ updated: true });
  } catch (error) {
    console.log("incoming req", error);
    mongoInputError(error, req, res);
  }
});

const tagsRouter = require("./tags.route");

module.exports = (app) => {
  app.use("/tutorials/tags", tagsRouter);
  app.use("/tutorials", tutorialsRouter);
};
