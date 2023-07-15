const { signupRouter } = require("./signup.routes");
const { loginRouter } = require("./login.routes");
const { verifyRouter } = require("./verify.routes");
const { isAuthenticated } = require("../../middleware/jwt.middleware");

module.exports = (app) => {
  app.use("/auth/signup", signupRouter);
  app.use("/auth/login", loginRouter);
  app.use("/auth/verify", isAuthenticated, verifyRouter);
};
