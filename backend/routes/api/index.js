const apiRouter = require("express").Router();
const projectRouter = require("./project.routes");
const taskRouter = require("./task.routes");
const { isAuthenticated } = require("../../middleware/jwt.middleware");

apiRouter.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = (app) => {
  app.use("/api", apiRouter);
  app.use("/api/projects", isAuthenticated, projectRouter);
  app.use("/api/tasks", isAuthenticated, taskRouter);
};
