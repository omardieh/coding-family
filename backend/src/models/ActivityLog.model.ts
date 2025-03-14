import { IActivityLogModel } from '@/types';
import { Schema, model } from 'mongoose';

const activityLogSchema = new Schema<IActivityLogModel>(
  {
    clientIP: {
      type: String,
    },
    reqMethod: {
      type: String,
    },
    reqPath: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export const ActivityLogModel = model<IActivityLogModel>('ActivityLog', activityLogSchema);
