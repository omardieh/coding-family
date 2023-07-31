const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.model");

const loginRouter = express.Router();

loginRouter.post("/", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json("Provide email and password.");
    return;
  }
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json("Wrong Email or Password");
        return;
      }
      foundUser.comparePassword(password).then((passwordCorrect) => {
        if (!passwordCorrect) {
          res.status(401).json("Wrong Email or Password");
          return;
        }
        const { _id, email, username } = foundUser;
        const payload = { _id, email, username };
        const authToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });
        res.status(200).json({ authToken: authToken });
      });
    })
    .catch((err) => {
      res.status(500).json("Internal Server Error");
      next(err);
    });
});

module.exports = { loginRouter };
