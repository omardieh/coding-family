const express = require("express");
const User = require("../../models/User.model");

const signupRouter = express.Router();

signupRouter.post("/", (req, res, next) => {
  const { email, password, username } = req.body;
  if (email === "" || password === "" || username === "") {
    res.status(400).json({ message: "Provide email, password and username" });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }
      return User.create({ email, password, username });
    })
    .then((createdUser) => {
      console.log(createdUser);
      const { email, username, _id } = createdUser;
      const user = { email, username, _id };
      res.status(201).json({ user: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
});

module.exports = { signupRouter };
