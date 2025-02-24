import { EnvironmentConfig, ErrorsConfig, LoggingConfig, SecurityConfig } from '@/config';
import { InitiateAuthRoutes, InitiateClientBuildRoutes, InitiateTutorialsRoutes, InitiateUserRoutes } from '@/routes';
import express from 'express';
import { InitiateIndexRoutes } from './routes/index.routes';

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
    new InitiateIndexRoutes(this.app);
    new InitiateUserRoutes(this.app);
    new InitiateTutorialsRoutes(this.app);
    new InitiateAuthRoutes(this.app);
    if (process.env.NODE_ENV === 'production') {
      new InitiateClientBuildRoutes(this.app);
    }
  };

  private handleErrors = (): void => {
    new ErrorsConfig(this.app);
  };
}

const { app } = new App();
export default app;
