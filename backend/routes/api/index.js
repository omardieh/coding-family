const projectRouter = require("./project.route");
const taskRouter = require("./task.route");
const { isAuthenticated } = require("../../middleware/jwt.middleware");

module.exports = (app) => {
  app.use("/api/projects", isAuthenticated, projectRouter);
  app.use("/api/tasks", isAuthenticated, taskRouter);
};
