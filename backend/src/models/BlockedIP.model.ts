import { IBlockedIP } from '@/types';
import { model, Schema } from 'mongoose';

const BlockedIPSchema = new Schema<IBlockedIP>(
  {
    ipAddress: { type: String, required: true, unique: true },
    failedAttempts: { type: Number, default: 0 },
    blockedUntil: { type: Date, default: null },
    lastAttempt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

BlockedIPSchema.index({ lastAttempt: 1 }, { expireAfterSeconds: 86400 });

export const BlockedIPModel = model<IBlockedIP>('BlockedIP', BlockedIPSchema);
