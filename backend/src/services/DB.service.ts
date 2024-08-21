import { IDBService } from '@/types';
import colors from 'colors';
import { Request, Response } from 'express';
import mongoose, { Error } from 'mongoose';

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
  public logMongooseError(error: Error.ValidationError, req: Request, res: Response) {
    if (error.name === 'ValidationError') {
      let key: string | undefined;
      Object.keys(req.body).forEach((field) => {
        if (error.errors[field]) {
          key = field;
        }
      });
      const errorMessage = key ? error.errors[key].message : 'Unknown error';
      res.status(400).json({ error: errorMessage });
    }
  }
}
