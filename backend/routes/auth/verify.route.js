const express = require("express");
const User = require("../../models/User.model");

const verifyRouter = express.Router();

verifyRouter.get("/", (req, res, next) => {
  res.status(200).json(req.payload);
});

verifyRouter.get("/email", (req, res, next) => {
  const { userID, code } = req.query;
  User.findById(userID).then((foundUser) => {
    if (!foundUser) return;
    const codeCorrect = foundUser.compareEmail(code);
    console.log(codeCorrect);
  });
});

module.exports = { verifyRouter };
