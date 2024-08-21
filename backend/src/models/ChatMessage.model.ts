import { IChatMessage } from '@/types';
import { Schema, model } from 'mongoose';

const chatMessageSchema = new Schema<IChatMessage>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

export const ChatMessage = model<IChatMessage>('ChatMessage', chatMessageSchema);
