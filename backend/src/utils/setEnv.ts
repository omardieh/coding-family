import dotenv from 'dotenv';
import path from 'path';

export const setEnv = () => {
  if (process.env.ENV_LOADED) return;
  const NODE_ENV = process.env.NODE_ENV || 'development';
  const rootDir = path.resolve(...[__dirname, '..', '..']);
  const envPath = path.join(rootDir, `.env.${NODE_ENV}`);
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    console.error('Error loading env file:', result.error);
    throw new Error(`Failed to load ${envPath}`);
  }

  process.env.ENV_LOADED = 'true';
};
