const { Schema, model } = require("mongoose");

const tutorialSchema = new Schema(
  {
    isPublic: {
      type: Boolean,
      required: [true, "Active state is required."],
      default: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
      maxlength: [100, "Title must be at most 100 characters."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      maxlength: [500, "Description must be at most 500 characters."],
    },
    content: {
      type: String,
      required: [true, "Content is required."],
      maxlength: [50000, "Content must be at most 50,000 characters."],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required."],
    },
    tags: {
      type: [String],
      required: [true, "At least one tag is required."],
      validate: {
        validator: function (tags) {
          return (
            Array.isArray(tags) &&
            tags.length > 0 &&
            new Set(tags).size === tags.length
          );
        },
        message: "Tags must be an array with at least one unique tag.",
      },
    },
    views: {
      type: Number,
      default: 0,
      min: [0, "Views cannot be negative."],
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, "Likes cannot be negative."],
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
          maxlength: [1000, "Comment must be at most 1000 characters."],
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
