const { isAuthenticated } = require("../middleware/jwt.middleware");

module.exports = (app) => {
  app.use("/", isAuthenticated, () => {});
};
