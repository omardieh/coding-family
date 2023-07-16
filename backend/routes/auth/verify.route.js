const express = require("express");

const verifyRouter = express.Router();

verifyRouter.get("/", (req, res, next) => {
  res.status(200).json(req.payload);
});

module.exports = { verifyRouter };
