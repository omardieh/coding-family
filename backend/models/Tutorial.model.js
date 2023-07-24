const { Schema, model } = require("mongoose");

const tutorialSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required."],
    },
    tags: {
      type: [String],
      required: [true, "At least one tag is required."],
    },
    date: {
      type: Date,
      required: [true, "Date is required."],
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: [true, "Comment user is required."],
        },
        content: {
          type: String,
          required: [true, "Comment content is required."],
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Tutorial = model("Tutorial", tutorialSchema);
module.exports = Tutorial;
