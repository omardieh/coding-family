const express = require("express");
const logger = require("morgan");
const cors = require("cors");

module.exports = (app) => {
  app.use(cors());
  app.use(
    cors({
      origin: [process.env.CLIENT_URL],
      credentials: true,
    })
  );
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};
