const tutorialsRouter = require("express").Router();
const { isAuthenticated } = require("../../middleware/jwt.middleware");
const Tutorial = require("../../models/Tutorial.model");

tutorialsRouter.get("/", async (req, res, next) => {
  try {
    const foundTutorials = await Tutorial.find();
    res.json(foundTutorials);
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
      tags,
      content,
    });
    res.json(createdTutorial);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});

tutorialsRouter.get("/:slug", async (req, res, next) => {
  const { slug } = req.params;
  try {
    const foundTutorial = await Tutorial.findOne({ slug });
    if (!foundTutorial) {
      res.json("error finding tutorial");
      return;
    }
    res.json(foundTutorial);
  } catch (error) {
    res.json(error.message);
  }
});

tutorialsRouter.put("/:slug", async (req, res, next) => {
  const { slug } = req.params;
  try {
    const foundTutorial = await Tutorial.findOneAndUpdate({ slug }, req.body, {
      new: true,
    });
    if (!foundTutorial) {
      res.json("error finding tutorial");
      return;
    }
    res.json(foundTutorial);
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = (app) => {
  app.use("/tutorials", tutorialsRouter);
};
