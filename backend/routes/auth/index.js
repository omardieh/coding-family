const { signupRouter } = require("./signup.route");
const { loginRouter } = require("./login.route");
const { verifyRouter } = require("./verify.route");

module.exports = (app) => {
  app.use("/auth/signup", signupRouter);
  app.use("/auth/login", loginRouter);
  app.use("/auth/verify", verifyRouter);
};
