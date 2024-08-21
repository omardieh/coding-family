import { Document, Types } from 'mongoose';

export interface ITutorialReview extends Document {
  message: string;
  rate: number;
  pendingApproval: boolean;
  isDraft: boolean;
  tutorial: Types.ObjectId;
  user: Types.ObjectId;
  reviewReplies: Types.DocumentArray<any>;
  createdAt: Date;
  updatedAt: Date;
}
