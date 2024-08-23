import { Document, Types } from 'mongoose';

export interface ITutorialTagModel extends Document {
  label: string;
  slug: string;
  tutorials: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
