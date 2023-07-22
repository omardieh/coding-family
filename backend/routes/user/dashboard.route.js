const dashboardRouter = require("express").Router();
const { mongoError } = require("../../helpers/mongoError.helper");
const User = require("../../models/User.model");

dashboardRouter.get("/", (req, res) => {
  const { userID } = req.body;
  Project.findById(userID)
    .then((foundUser) => {
      if (!foundUser) {
        res.status(404).json("User not found");
      }
      res.send(foundUser);
    })
    .catch((err) => res.json(err));
});

module.exports = projectRouter;
