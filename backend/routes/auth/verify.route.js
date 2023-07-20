const express = require("express");
const User = require("../../models/User.model");
const { isAuthenticated } = require("../../middleware/jwt.middleware");

const verifyRouter = express.Router();

verifyRouter.get("/token", isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload);
});

verifyRouter.get("/email", (req, res) => {
  const { userID, code } = req.query;
  User.findById(userID).then((foundUser) => {
    if (!foundUser) return;
    foundUser.compareEmail(code).then((isMatch) => {
      if (!isMatch) {
        res.status(400).json("verification code is not valid");
        return;
      }
      User.findByIdAndUpdate(
        foundUser._id,
        { isEmailVerified: true },
        { new: true }
      ).then((updatedUser) => {
        if (!updatedUser.isEmailVerified) {
          res.status(400).json("error while verifying email");
          return;
        }
        res.redirect(process.env.CLIENT_URL + "/login");
      });
    });
  });
});

module.exports = { verifyRouter };
