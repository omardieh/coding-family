import dotenv from 'dotenv';
import path from 'path';

export const setEnv = () =>
  dotenv.config({
    path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`),
  });
