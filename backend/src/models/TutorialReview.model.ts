import { Schema, model } from 'mongoose';
import { ITutorialReview } from '@/types';

const tutorialReviewSchema = new Schema<ITutorialReview>(
  {
    message: {
      type: String,
      required: true,
      maxlength: 500,
    },
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      set: (value: number) => Math.round(value), // Ensures rate is rounded to nearest integer
    },
    pendingApproval: {
      type: Boolean,
      default: true,
    },
    isDraft: {
      type: Boolean,
      default: true,
    },
    tutorial: {
      type: Schema.Types.ObjectId,
      ref: 'Tutorial',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewReplies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ReviewReply',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const TutorialReview = model<ITutorialReview>('TutorialReview', tutorialReviewSchema);
