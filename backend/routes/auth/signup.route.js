const express = require("express");
const User = require("../../models/User.model");
const EmailService = require("../../services/email.service");
const signupRouter = express.Router();

signupRouter.post("/", (req, res, next) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json("Provide email, password, and username");
  }
  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        return res.status(400).json("User already exists.");
      }
      return User.create({ email, password, username })
        .then((createdUser) => {
          console.log("User created:", createdUser);
          EmailService.sendEmail(createdUser.email, "subject", "body");
          return res.status(201).json(createdUser);
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
