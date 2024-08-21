import { Schema, model } from 'mongoose';
import { IActivityLog } from '@/types';

const activityLogSchema = new Schema<IActivityLog>(
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

export const ActivityLog = model<IActivityLog>('ActivityLog', activityLogSchema);
