const userRouter = require("express").Router();
const dashboardRouter = require("./dashboard.route");
const { isAuthenticated } = require("../../middleware/jwt.middleware");

userRouter.get("/", (req, res, next) => {
  res.json("Main user Route");
});

module.exports = (app) => {
  app.use("/user", userRouter);
  app.use("/user/dashboard", isAuthenticated, dashboardRouter);
};
