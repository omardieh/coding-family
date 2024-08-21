import { Types } from 'mongoose';

export interface IActivityLog extends Document {
  clientIP: string;
  reqMethod: string;
  reqPath: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
