const bcrypt = require("bcryptjs");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required."],
      unique: [true, "username is already taken."],
      trim: true,
      match: [
        /^[A-Za-z][A-Za-z0-9_]{5,21}$/,
        "Your username should be at least 6 characters long, start with a letter, and can include letters, numbers, or underscores.",
      ],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address.",
      ],
    },
    password: {
      type: String,
      match: [
        /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      ],
    },
    avatar: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
    },
    githubID: {
      type: String,
    },
    fullName: {
      type: String,
    },
    role: {
      type: String,
      enum: ["member", "editor", "admin"],
      default: "member",
    },
    emailVerifyCode: {
      type: String,
      required: [true, "Email Verify code is missing."],
    },
    emailVerifyCodeExpiresAt: {
      type: Date,
      required: [true, "Email Verify code exp date is missing."],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    tutorials: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tutorial",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.emailVerifyCode = await bcrypt.hash(this.emailVerifyCode, salt);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.compareEmail = async function (verificationCode) {
  return bcrypt.compare(verificationCode, this.emailVerifyCode);
};

const User = model("User", userSchema);

module.exports = User;
