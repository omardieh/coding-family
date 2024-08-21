import { Document, Types } from 'mongoose';

export interface ITutorial extends Document {
  isPublic: boolean;
  slug: string;
  title: string;
  description: string;
  content: string;
  author: Types.ObjectId;
  tags: Types.ObjectId[];
  views: number;
  likes: number;
  comments: {
    user: Types.ObjectId;
    content: string;
    date: Date;
  }[];
  estimatedReadingTime: number;
  createdAt: Date;
  updatedAt: Date;
}
