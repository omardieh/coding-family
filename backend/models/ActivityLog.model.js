const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const activityLogSchema = new Schema(
  {
    clientIP: String,
    reqMethod: String,
    reqPath: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("ActivityLog", activityLogSchema);
