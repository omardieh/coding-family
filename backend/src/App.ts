// import { InitiateIndexRoutes, InitiateMapRoutes, InitiateUserRoutes } from '@/routes';
import express from 'express';
import { EnvironmentConfig, LoggingConfig, SecurityConfig } from '@/config';

class App {
  public app;
  constructor() {
    this.app = express();
    this.initializeConfigs();
    this.setRoutes();
  }

  private initializeConfigs(): void {
    new EnvironmentConfig(this.app);
    new SecurityConfig(this.app);
    new LoggingConfig(this.app);
  }

  private setRoutes(): void {
    // new InitiateIndexRoutes(this.app);
    // new InitiateUserRoutes(this.app);
    // new InitiateMapRoutes(this.app);
  }
}

const { app } = new App();
export default app;

// const express = require("express");
// const app = express();

// // config
// require("./config")(app);
// require("./config/security.config")(app);

// // routes :
// require("./routes/auth")(app);
// require("./routes/user")(app);
// require("./routes/tutorials")(app);
// // require("./routes")(app);

// // error middleware :
// require("./middleware/routesError.middleware")(app);

// module.exports = app;
