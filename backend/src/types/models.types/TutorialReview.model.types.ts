import { Document, Types } from 'mongoose';

interface IReviewReply extends Document {
  message: string;
  user: Types.ObjectId;
  createdAt: Date;
}
export interface ITutorialReviewModel extends Document {
  message: string;
  rate: number;
  pendingApproval: boolean;
  isDraft: boolean;
  tutorial: Types.ObjectId;
  user: Types.ObjectId;
  reviewReplies: Types.DocumentArray<IReviewReply>;
  createdAt: Date;
  updatedAt: Date;
}
