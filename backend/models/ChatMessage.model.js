const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const chatMessageSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    message: String,
  },
  { timestamps: true }
);

module.exports = model("ChatMessage", chatMessageSchema);
