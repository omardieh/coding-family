const { Schema, model } = require("mongoose");

const tutorialSchema = new Schema(
  {
    isPublic: {
      type: Boolean,
      required: [true, "Active state is required."],
      default: true,
    },
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
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

tutorialSchema.pre("save", async function (next) {
  if (!this.isModified("title")) {
    return next();
  }
  this.slug = slugify(this.title);
  const existingTutorial = await this.constructor.findOne({ slug: this.slug });
  if (existingTutorial) {
    let suffix = 1;
    while (await this.constructor.findOne({ slug: `${this.slug}${suffix}` })) {
      suffix++;
    }
    this.slug = `${this.slug}${suffix}`;
  }
  next();
});

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .trim();
}

const Tutorial = model("Tutorial", tutorialSchema);
module.exports = Tutorial;
