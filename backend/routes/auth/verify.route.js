const express = require("express");
const User = require("../../models/User.model");
const { isAuthenticated } = require("../../middleware/jwt.middleware");

const verifyRouter = express.Router();

verifyRouter.get("/token", isAuthenticated, (req, res) => {
  res.status(200).json(req.payload);
});

verifyRouter.post("/email", (req, res) => {
  const { userID, code } = req.body;
  User.findById(userID).then((foundUser) => {
    if (!foundUser) {
      res.status(400).json("verification code is not valid");
      return;
    }
    if (foundUser.emailVerifyCodeExpiresAt < Date.now()) {
      res.status(400).json("verification code has expired");
      return;
    }
    if (foundUser.emailVerifyCode === "verified") {
      res.status(200).json("email has been already verified");
      return;
    }
    foundUser.compareEmail(code).then((codeCorrect) => {
      if (!codeCorrect) {
        res.status(400).json("verification code is not valid");
        return;
      }
      User.findByIdAndUpdate(
        foundUser._id,
        { isEmailVerified: true, emailVerifyCode: "verified" },
        { new: true }
      ).then((updatedUser) => {
        if (!updatedUser.isEmailVerified) {
          res.status(400).json("error while verifying email");
          return;
        }
        res.status(201).json("email verification was successful");
      });
    });
  });
});

// verifyRouter.post("/email", isAuthenticated, (req, res) => {
//   const { userID } = req.body;
//   User.findById(userID).then((foundUser) => {
//     if (!foundUser) {
//       res.status(400).json("verification code is not valid");
//       return;
//     }
//     res.status(200).json("email verification was successful");
//   });
// });

module.exports = { verifyRouter };
