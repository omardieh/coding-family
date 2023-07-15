require("dotenv").config();
require("./db");

const express = require("express");
const app = express();
require("./config")(app);

// routes :
require("./routes/auth")(app);
require("./routes/api")(app);

// error middleware :
require("./error-handling")(app);

module.exports = app;
