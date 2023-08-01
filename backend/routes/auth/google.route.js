const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { AuthorizationCode } = require("simple-oauth2");
const User = require("../../models/User.model");

const googleRouter = express.Router();

const oauth2Client = new AuthorizationCode({
  client: {
    id: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_CLIENT_SECRET,
  },
  auth: {
    authorizeHost: "https://accounts.google.com",
    tokenHost: "https://www.googleapis.com",
    authorizePath: "/o/oauth2/auth",
    tokenPath: "/o/oauth2/token",
  },
});

const googleAuthURL = oauth2Client.authorizeURL({
  redirect_uri: process.env.GOOGLE_REDIRECT_URI,
  scope: "profile email",
});

googleRouter.get("/", (req, res) => {
  res.redirect(googleAuthURL);
});

googleRouter.post("/", async (req, res) => {
  const { code } = req.body;
  if (!code) {
    res.status(404).json("code not found");
  }
  try {
    const tokenConfig = {
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    };
    const accessToken = await oauth2Client.getToken(tokenConfig);
    console.log(accessToken);
    // const user = await oauth2Client.getTokenInfo(accessToken);
    // if (!user) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }
    // const payload = { id, email };
    // const authToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
    //   algorithm: "HS256",
    //   expiresIn: "6h",
    // });
    // res.status(200).json({ authToken: authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = { googleRouter };
