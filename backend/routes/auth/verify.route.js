const express = require("express");
const User = require("../../models/User.model");
const { isAuthenticated } = require("../../middleware/jwt.middleware");
const validateUserToken = require("../../middleware/validateUserToken.middleware");
const verifyRouter = express.Router();

verifyRouter.get("/token", validateUserToken, (req, res) => {
  res.status(200).json(req.payload);
});

verifyRouter.post("/email", async (req, res, next) => {
  const { userID, code } = req.body;
  try {
    const foundUser = await User.findById(userID);
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
    const codeCorrect = await foundUser.compareEmail(code);
    if (!codeCorrect) {
      res.status(400).json("verification code is not valid");
      return;
    }
    const updatedUser = await User.findByIdAndUpdate(
      foundUser._id,
      { isEmailVerified: true, emailVerifyCode: "verified" },
      { new: true }
    );
    if (!updatedUser.isEmailVerified) {
      res.status(400).json("error while verifying email");
      return;
    }
    res.status(201).json("email verification was successful");
  } catch (err) {
    next(err);
  }
});

module.exports = { verifyRouter };
