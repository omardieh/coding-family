import { ITutorialReviewModel } from '@/types';
import { Schema, model } from 'mongoose';

const tutorialReviewSchema = new Schema<ITutorialReviewModel>(
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

export const TutorialReviewModel = model<ITutorialReviewModel>('TutorialReview', tutorialReviewSchema);
