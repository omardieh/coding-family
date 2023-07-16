const apiRouter = require("express").Router();
const projectRouter = require("./project.route");
const taskRouter = require("./task.route");
const { isAuthenticated } = require("../../middleware/jwt.middleware");

apiRouter.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = (app) => {
  app.use("/api", apiRouter);
  app.use("/api/projects", isAuthenticated, projectRouter);
  app.use("/api/tasks", isAuthenticated, taskRouter);
};
