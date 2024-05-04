const express = require("express");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../../middleware/jwt.middleware");

const tokenRouter = express.Router();

tokenRouter.get("/verify", isAuthenticated, (req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.status(200).json(req.payload);
});

tokenRouter.get("/refresh", isAuthenticated, (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    return res.status(401).send("Access Denied. No refresh token provided.");
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.CLIENT_URL);
    const accessToken = jwt.sign(decoded, process.env.CLIENT_URL, {
      expiresIn: "1h",
    });
    res.header("Authorization", accessToken).send(decoded);
  } catch (error) {
    return res.status(400).send("Invalid refresh token.");
  }
});

module.exports = { tokenRouter };
