const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.model");
const { generateJWT } = require("../../middleware/jwt.middleware");

const githubRouter = express.Router();

githubRouter.get("/", (req, res) => {
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=read:user`;
  res.redirect(githubAuthURL);
});

githubRouter.post("/", async (req, res) => {
  const { code } = req.body;
  if (!code) {
    res.status(404).json("code not found");
    return;
  }
  try {
    const getGithubAccessToken = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        code: code,
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        redirect_uri: process.env.GITHUB_REDIRECT_URI,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const githubAccessToken = getGithubAccessToken.data.access_token;
    if (!githubAccessToken) return;
    const getUserInfo = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
      },
    });
    const { login, id, avatar_url, name } = getUserInfo.data;
    const foundUser = await User.findOne({ githubID: id });

    if (foundUser) {
      const { _id, fullName, avatar, username } = foundUser;
      const payload = { _id, username, fullName, avatar };
      const refreshToken = generateJWT(payload, { refresh: true });
      const accessToken = generateJWT(payload);
      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "strict",
        })
        .set("Access-Control-Expose-Headers", "Authorization")
        .header("Authorization", `Bearer ${accessToken}`)
        .json(payload);
      return;
    }
    const createdUser = await User.create({
      username: `${login}_${id}`,
      githubID: id,
      fullName: name,
      avatar: avatar_url,
      isEmailVerified: true,
      emailVerifyCode: "verified",
    });
    const { _id, username, fullName, avatar } = createdUser;
    const payload = { _id, username, fullName, avatar };
    const refreshToken = generateJWT(payload, { refresh: true });
    const accessToken = generateJWT(payload);
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .set("Access-Control-Expose-Headers", "Authorization")
      .header("Authorization", `Bearer ${accessToken}`)
      .json(payload);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = { githubRouter };
