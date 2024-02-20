const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../../models/User.model");
const qs = require("qs");

const googleRouter = express.Router();

googleRouter.get("/", (req, res) => {
  const googleAuthURL = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=profile%20email&access_type=offline`;
  res.redirect(googleAuthURL);
});

googleRouter.post("/", async (req, res) => {
  const { code } = req.body;
  if (!code) {
    res.status(404).json("code not found");
  }
  try {
    const getAccessToken = await axios.post(
      "https://www.googleapis.com/oauth2/v4/token",
      qs.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = getAccessToken.data;

    const getUserInfo = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const user = getUserInfo.data;
    if (!user) {
      return res.status(401).json("Unauthorized");
    }
    const { name, picture, email } = getUserInfo.data;
    const foundUsers = await User.find({
      $or: [{ googleID: email }, { email: email }],
    });
    if (foundUsers.length) {
      const [foundUser] = foundUsers;
      const { _id, fullName, avatar, username } = foundUser;
      const payload = { _id, username, fullName, avatar };
      const authToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });
      res.status(200).json({ authToken: authToken });
      return;
    }
    const createdUser = await User.create({
      username: email.replace(/[^a-zA-Z0-9]/g, "_"),
      googleID: email,
      email: email,
      fullName: name,
      avatar: picture,
      isEmailVerified: true,
      emailVerifyCode: "verified",
    });
    const { _id, username, fullName, avatar } = createdUser;
    const payload = { _id, username, fullName, avatar };
    const authToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    console.error("google auth error: ", error);
    res.status(500).json(error);
  }
});

module.exports = { googleRouter };
