const express = require("express");
const axios = require("axios");

const captchaRouter = express.Router();

captchaRouter.post("/", async (req, res) => {
  const { token } = req.body;
  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.GOOGLE_CAPTCHA_SECRET,
          response: token,
        },
      }
    );
    const { success, score } = response.data;
    if (success && score >= 0.5) {
      res.json({ verified: true });
    } else {
      res.json({ verified: false });
    }
  } catch (error) {
    console.error("captchaError: ", error);
  }
});

module.exports = { captchaRouter };
