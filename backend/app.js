const express = require("express");
const app = express();

// config
require("./config")(app);
require("./config/security.config")(app);

// routes :
require("./routes/auth")(app);
require("./routes/user")(app);
require("./routes/api")(app);
require("./routes")(app);

// error middleware :
require("./middleware/routesError.middleware")(app);

module.exports = app;
