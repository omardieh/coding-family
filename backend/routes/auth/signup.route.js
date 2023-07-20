const express = require("express");
const User = require("../../models/User.model");
const EmailService = require("../../services/email.service");
const signupRouter = express.Router();
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const verifyEmailTemplate = (customLink) => {
  const emailTemplate = fs.readFileSync(
    path.join(__dirname, "../../utils/emailTemplates/verify.html"),
    "utf-8"
  );
  const withLink = emailTemplate.replace("{{verificationLink}}", customLink);
  return withLink;
};

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
      const emailVerificationCode = crypto.randomBytes(64).toString("hex");

      return User.create({ email, password, username, emailVerificationCode })
        .then((createdUser) => {
          const linkToSend = `http://localhost:4000/auth/verify/email?userID=${createdUser._id}&code=${emailVerificationCode}`;
          EmailService.sendEmail(
            createdUser.email,
            "Verify Your Account",
            verifyEmailTemplate(linkToSend)
          );
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
