const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.model");
const { generateJWT } = require("../../middleware/jwt.middleware");

const loginRouter = express.Router();

loginRouter.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json("Provide Email and Password");
    return;
  }
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(401).json("Wrong Email or Password");
      return;
    }
    if (!foundUser.isEmailVerified) {
      res.status(401).json("Please Verify Your Email to Login");
      return;
    }
    if (foundUser.googleID || foundUser.githubID) {
      res.status(401).json("Email is used by Google or GitHub account");
      return;
    }
    const passwordCorrect = await foundUser.comparePassword(password);
    if (!passwordCorrect) {
      res.status(401).json("Wrong Email or Password");
      return;
    }
    const { _id, email: foundEmail, username, avatar } = foundUser;
    const payload = { _id, email: foundEmail, username, avatar };
    const refreshToken = generateJWT(payload, { refresh: true });
    const accessToken = generateJWT(payload);
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .set("Access-Control-Expose-Headers", "Authorization")
      .header("Authorization", `Bearer ${accessToken}`)
      .json({ _id, email, username, avatar });
  } catch (error) {
    res.status(500).json({ "Internal Server Error": error });
    next(error);
  }
});

module.exports = { loginRouter };
