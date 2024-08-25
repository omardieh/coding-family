import { Document, Types } from 'mongoose';

export interface IChatMessageModel extends Document {
  user: Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
