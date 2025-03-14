import { Types } from 'mongoose';

export interface IActivityLogModel extends Document {
  clientIP: string;
  reqMethod: string;
  reqPath: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
