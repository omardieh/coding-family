const tagsRouter = require("express").Router();
const Tutorial = require("../../models/Tutorial.model");
const mongoInputError = require("../../middleware/mongoInputsError.middleware");

tagsRouter.get("/", async (req, res, next) => {
  try {
    const foundTags = await Tutorial.find();
    res.json(foundTags);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = tagsRouter;
