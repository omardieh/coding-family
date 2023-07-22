const express = require("express");
const User = require("../../models/User.model");
const EmailService = require("../../services/email.service");
const jwt = require("jsonwebtoken");

const signupRouter = express.Router();

signupRouter.post("/", (req, res, next) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json("Provide email, password, and username");
  }
  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json("User already exists.");
        return;
      }
      const emailVerifyCode = EmailService.getRandomString();
      const emailVerifyCodeExpiresAt = EmailService.getExpirationDate(15);
      return User.create({
        email,
        password,
        username,
        emailVerifyCode,
        emailVerifyCodeExpiresAt,
      })
        .then((createdUser) => {
          const { _id, email, username } = createdUser;
          const payload = { _id, email, username };
          const emailVerifyToken = jwt.sign(
            payload,
            process.env.JWT_TOKEN_SECRET,
            {
              algorithm: "HS256",
              expiresIn: "15m",
            }
          );
          EmailService.sendEmailVerify(
            createdUser,
            emailVerifyCode,
            emailVerifyToken
          );
          return res.status(201).json({ emailVerifyToken });
        })
        .catch((error) => {
          console.error("User creation error:", error);
          return res.status(500).json("Internal Server Error");
        });
    })
    .catch((error) => {
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
    });
});

module.exports = { signupRouter };
