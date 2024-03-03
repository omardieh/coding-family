const tagsRouter = require("express").Router();
const mongoInputError = require("../../middleware/mongoInputsError.middleware");
const Tutorial = require("../../models/Tutorial.model");
const TutorialTag = require("../../models/TutorialTag.model");

tagsRouter.get("/", async (req, res, next) => {
  try {
    const foundTags = await Tutorial.find();
    res.json(foundTags);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

tagsRouter.get("/:slug", async (req, res, next) => {
  const { slug } = req.params;
  try {
    const foundTag = await TutorialTag.findOne({ slug }).populate("tutorials");
    if (!foundTag) {
      res.json("error finding tag");
      return;
    }
    res.json(foundTag);
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = tagsRouter;
