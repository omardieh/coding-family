import { Document, Types } from 'mongoose';

export interface ITutorialTag extends Document {
  label: string;
  slug: string;
  tutorials: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
