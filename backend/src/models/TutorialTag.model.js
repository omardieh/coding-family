const { Schema, model } = require("mongoose");

const tutorialTagSchema = new Schema(
  {
    label: { type: String, unique: true },
    slug: {
      type: String,
      unique: true,
    },
    tutorials: [{ type: Schema.Types.ObjectId, ref: "Tutorial" }],
  },
  {
    timestamps: true,
  }
);

tutorialTagSchema.pre("save", async function (next) {
  if (!this.isModified("label")) {
    return next();
  }
  this.slug = slugify(this.label);
  const existingTag = await this.constructor.findOne({ slug: this.slug });
  if (existingTag) {
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

const TutorialTag = model("TutorialTag", tutorialTagSchema);
module.exports = TutorialTag;
