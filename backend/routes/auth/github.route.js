const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../../models/User.model");

const githubRouter = express.Router();

githubRouter.post("/", async (req, res) => {
  const { code } = req.body;
  if (!code) {
    res.status(404).json("code not found");
  }
  try {
    const getAccessToken = await axios.post(
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
    const accessToken = getAccessToken.data.access_token;
    const getUserInfo = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { login, id, avatar_url, name } = getUserInfo.data;
    const foundUser = await User.findOne({ githubID: id });
    if (foundUser) {
      const { _id, fullName, avatar } = foundUser;
      const payload = { _id, fullName, avatar };
      const authToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "6h",
      });
      res.status(200).json({ authToken: authToken });
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

    const { _id, fullName, avatar } = createdUser;
    const payload = { _id, fullName, avatar };
    const authToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    res.status(200).json({ authToken: authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
  //
  //
  //   axios
  //     .post(
  //       "https://github.com/login/oauth/access_token",
  //       {
  //         client_id: process.env.GITHUB_CLIENT_ID,
  //         client_secret: process.env.GITHUB_CLIENT_SECRET,
  //         code: code,
  //         redirect_uri: process.env.GITHUB_REDIRECT_URI,
  //       },
  //       {
  //         headers: {
  //           Accept: "application/json",
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       const accessToken = response.data.access_token;
  //       axios
  //         .get("https://api.github.com/user", {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         })
  //         .then((githubResponse) => {
  //           if (githubResponse.status === 200) {
  //             const { login, id, avatar_url, name } = githubResponse.data;
  //             User.findOne({ githubID: id }).then((foundUser) => {
  //               if (foundUser) {
  //                 res.status(500).json("User already exist");
  //                 return;
  //               }
  //               User.create({
  //                 username: `${login}_${id}`,
  //                 githubID: id,
  //                 fullName: name,
  //                 avatar: avatar_url,
  //                 isEmailVerified: true,
  //                 emailVerifyCode: "verified",
  //               }).then((createdUser) => {
  //                 const { _id, fullName, avatar_url } = createdUser;
  //                 const payload = { _id, fullName, avatar_url };
  //                 const authToken = jwt.sign(
  //                   payload,
  //                   process.env.JWT_TOKEN_SECRET,
  //                   {
  //                     algorithm: "HS256",
  //                     expiresIn: "6h",
  //                   }
  //                 );
  //                 res.status(200).json({ authToken: authToken });
  //               });
  //             });
  //           }
  //         })
  //         .catch((err) => console.log("ERR2", err));
  //     })
  //     .catch((error) => {
  //       console.log("ERR1", error);
  //     });
});

module.exports = { githubRouter };
