const express = require("express");
const User = require("../../models/User.model");
const EmailService = require("../../services/email.service");
const jwt = require("jsonwebtoken");

const signupRouter = express.Router();

signupRouter.post("/", async (req, res, next) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json("Provide Username, Email and Password");
  }
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.status(400).json("User already exists.");
      return;
    }
    const emailVerifyCode = EmailService.getRandomString();
    const emailVerifyCodeExpiresAt = EmailService.getExpirationDate(15);
    const createdUser = await User.create({
      email,
      password,
      username,
      emailVerifyCode,
      emailVerifyCodeExpiresAt,
    });
    const { _id, email: createdEmail, username: createdUsername } = createdUser;
    const payload = { _id, createdEmail, createdUsername };
    const emailVerifyToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "15m",
    });
    await EmailService.sendEmailVerify(
      createdUser,
      emailVerifyCode,
      emailVerifyToken
    );
    res.status(200).send("Verification Email was sent Successfully");
  } catch (error) {
    if (error.name === "ValidationError") {
      let key;
      Object.keys(req.body).forEach((element) => {
        if (error.errors[element]) {
          key = element;
        }
      });
      const errorMessage = error.errors[key].message;
      res.status(400).json(errorMessage);
      return;
    }
    res.status(500).json("Internal Server Error");
    next(error);
  }
});

module.exports = { signupRouter };
