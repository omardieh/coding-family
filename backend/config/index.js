const express = require("express"),
  logger = require("morgan"),
  cors = require("cors"),
  cookies = require("cookie-parser");

module.exports = (app) => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookies());
  app.use(
    cors({
      origin: [process.env.CLIENT_URL],
      credentials: true,
      exposedHeaders: ["Authorization"],
    })
  );
};
