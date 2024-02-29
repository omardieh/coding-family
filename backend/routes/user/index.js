const userRouter = require("express").Router();
const profileRouter = require("./profile.route");
const uploadRouter = require("./upload.route");
const { isAuthenticated } = require("../../middleware/jwt.middleware");

userRouter.get("/", (req, res, next) => {
  res.json("Main user Route");
});
module.exports = (app) => {
  app.use("/user", userRouter);
  app.use("/user/profile", isAuthenticated, profileRouter);
  app.use("/user/upload", isAuthenticated, uploadRouter);
};
