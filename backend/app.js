const express = require("express");
const app = express();
require("./config")(app);

// routes :
require("./routes/auth")(app);
require("./routes/api")(app);

// error middleware :
require("./middleware/routesError.middleware")(app);

module.exports = app;
