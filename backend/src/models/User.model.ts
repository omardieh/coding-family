import { IUser } from '@/types';
import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';

// Define the schema
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true,
      trim: true,
      match: [/^[a-zA-Z0-9_.]{6,}$/, 'Usernames can only use letters, numbers, underscores, and periods.'],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.'],
    },
    password: {
      type: String,
      match: [
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
        'Password must have at least 6 characters and contain at least one number, one lowercase, and one uppercase letter.',
      ],
    },
    avatar: {
      type: String,
      default: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    },
    githubID: String,
    googleID: String,
    fullName: String,
    role: {
      select: false,
      type: String,
      enum: ['member', 'editor', 'admin'],
      default: 'member',
    },
    emailVerifyCode: {
      type: String,
      required: [true, 'Email Verify code is missing.'],
      default: '',
    },
    emailVerifyCodeExpiresAt: {
      type: Date,
      required: [true, 'Email Verify code exp date is missing.'],
      default: Date.now(),
      select: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    createdTutorials: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tutorial',
      },
    ],
    favoriteTutorials: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tutorial',
      },
    ],
    bio: String,
    socialMedia: {
      facebook: String,
      twitter: String,
      linkedin: String,
    },
    skills: [String],
    country: String,
    website: String,
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    notificationPreferences: {
      email: {
        type: Boolean,
        default: true,
      },
    },
    accountStatus: {
      type: String,
      enum: ['active', 'suspended'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password') || !this.isModified('emailVerifyCode')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.emailVerifyCode = await bcrypt.hash(this.emailVerifyCode, salt);
  next();
});

userSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.compareEmail = function (verificationCode: string): Promise<boolean> {
  return bcrypt.compare(verificationCode, this.emailVerifyCode);
};

export const UserModel = model<IUser>('User', userSchema);
