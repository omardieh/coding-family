const { Schema, model } = require("mongoose");

const tutorialReviewSchema = new Schema(
  {
    message: { type: String, required: true, maxlength: 500 },
    rate: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      set: (value) => Math.round(value),
    },
    pendingApproval: {
      type: Boolean,
      default: true,
    },
    isDraft: {
      type: Boolean,
      default: true,
    },
    tutorial: { type: Schema.Types.ObjectId, ref: "Tutorial", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reviewReplies: [],
  },
  {
    timestamps: true,
  }
);

const TutorialReview = model("TutorialReview", tutorialReviewSchema);
module.exports = TutorialReview;
