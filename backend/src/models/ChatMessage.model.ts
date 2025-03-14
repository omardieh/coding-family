import { IChatMessageModel } from '@/types';
import { Schema, model } from 'mongoose';

const chatMessageSchema = new Schema<IChatMessageModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

export const ChatMessageModel = model<IChatMessageModel>('ChatMessage', chatMessageSchema);
