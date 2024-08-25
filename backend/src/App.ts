import { EnvironmentConfig, ErrorsConfig, LoggingConfig, SecurityConfig } from '@/config';
import { InitiateAuthRoutes, InitiateTutorialsRoutes, InitiateUserRoutes } from '@/routes';
import express from 'express';
class App {
  public app;
  constructor() {
    this.app = express();
    this.initializeConfigs();
    this.setRoutes();
    this.handleErrors();
  }

  private initializeConfigs = (): void => {
    new EnvironmentConfig(this.app);
    new SecurityConfig(this.app);
    new LoggingConfig(this.app);
  };

  private setRoutes = (): void => {
    new InitiateUserRoutes(this.app);
    new InitiateTutorialsRoutes(this.app);
    new InitiateAuthRoutes(this.app);
  };

  private handleErrors = (): void => {
    new ErrorsConfig(this.app);
  };
}

const { app } = new App();
export default app;
