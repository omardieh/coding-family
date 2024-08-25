import { Document, Types } from 'mongoose';

export interface IUserModel extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  githubID?: string;
  googleID?: string;
  fullName?: string;
  role: 'member' | 'editor' | 'admin';
  emailVerifyCode: string;
  emailVerifyCodeExpiresAt: Date;
  isEmailVerified: boolean;
  createdTutorials: Types.ObjectId[];
  favoriteTutorials: Types.ObjectId[];
  bio?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  skills?: string[];
  country?: string;
  website?: string;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  notificationPreferences: {
    email: boolean;
  };
  accountStatus: 'active' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
  compareEmail(verificationCode: string): Promise<boolean>;
}
