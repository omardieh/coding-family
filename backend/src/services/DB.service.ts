import { IDBService } from '@/types';
import colors from 'colors';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

export class DBService implements IDBService {
  public async connectDB() {
    try {
      const response = await mongoose.connect(`${process.env.MONGODB_URL}`);
      console.info(
        [
          '🗃️ ',
          colors.bgBlack.bold(` DATABASE `),
          ` Atlas is connected, database name: `,
          colors.blue(`${response.connections[0].name}`),
        ].join(''),
      );
    } catch (error) {
      console.error('Failed to connect to MongoDB | error:', error);
      process.exit(1);
    }
  }
  public async closeDB() {
    try {
      await mongoose.disconnect();
      console.info('disconnected MongoDB');
    } catch (error) {
      console.error('Failed to close MongoDB connection', error);
      process.exit(1);
    }
  }
  public logMongoError(error: unknown, req: Request, res: Response, next: NextFunction) {
    if (error instanceof mongoose.Error.ValidationError) {
      let key: string | undefined;
      Object.keys(req.body).forEach((field) => {
        if (error.errors[field]) {
          key = field;
        }
      });
      const errorMessage = key ? error.errors[key].message : 'Unknown error';
      res.status(400).json({ error: errorMessage });
      return;
    }
    next(error);
  }
}
