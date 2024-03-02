const tutorialsRouter = require("express").Router();
const { isAuthenticated } = require("../../middleware/jwt.middleware");
const Tutorial = require("../../models/Tutorial.model");
const mongoInputError = require("../../middleware/mongoInputsError.middleware");

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
    mongoInputError(error, req, res);
    // if (error.name === "ValidationError") {
    //   let key;
    //   Object.keys(req.body).forEach((element) => {
    //     if (error.errors[element]) {
    //       key = element;
    //     }
    //   });
    //   const errorMessage = error.errors[key].message;
    //   res.status(400).json(errorMessage);
    //   return;
    // }
  }
});

tutorialsRouter.get("/:slug", async (req, res, next) => {
  const { slug } = req.params;
  try {
    const foundTutorial = await Tutorial.findOne({ slug }).populate(
      "author",
      "username"
    );
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
      runValidators: true,
    });
    if (!foundTutorial) {
      res.json("error finding tutorial");
      return;
    }
    res.json(foundTutorial);
  } catch (error) {
    mongoInputError(error, req, res);
  }
});

const tagsRouter = require("./tags.route");

module.exports = (app) => {
  app.use("/tutorials/tags", tagsRouter);
  app.use("/tutorials", tutorialsRouter);
};
