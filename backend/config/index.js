const express = require("express");
const logger = require("morgan");
const cors = require("cors");

module.exports = (app) => {
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: [process.env.CLIENT_URL],
    })
  );
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};
