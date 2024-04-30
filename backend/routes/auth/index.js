const { signupRouter } = require("./signup.route");
const { loginRouter } = require("./login.route");
const { verifyRouter } = require("./verify.route");
const { githubRouter } = require("./github.route");
const { googleRouter } = require("./google.route");
const { captchaRouter } = require("./captcha.route");
const { tokenRouter } = require("./token.route");

module.exports = (app) => {
  app.use("/auth/signup", signupRouter);
  app.use("/auth/login", loginRouter);
  app.use("/auth/verify", verifyRouter);
  app.use("/auth/github", githubRouter);
  app.use("/auth/google", googleRouter);
  app.use("/auth/captcha", captchaRouter);
  app.use("/auth/token", tokenRouter);
};
