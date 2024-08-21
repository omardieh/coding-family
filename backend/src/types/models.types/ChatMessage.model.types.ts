import { Document, Types } from 'mongoose';

export interface IChatMessage extends Document {
  user: Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
