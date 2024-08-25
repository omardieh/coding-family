import { ITutorialTagModel } from '@/types';
import { slugify } from '@/utils';
import { Model, Schema, model } from 'mongoose';

const tutorialTagSchema = new Schema<ITutorialTagModel>(
  {
    label: {
      type: String,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    tutorials: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tutorial',
      },
    ],
  },
  {
    timestamps: true,
  },
);

tutorialTagSchema.pre<ITutorialTagModel>('save', async function (next) {
  if (!this.isModified('label')) {
    return next();
  }
  this.slug = slugify(this.label);
  const TutorialTagModel = this.constructor as Model<ITutorialTagModel>;
  const existingTag = await TutorialTagModel.findOne({ slug: this.slug });
  if (existingTag) {
    let suffix = 1;
    while (await TutorialTagModel.findOne({ slug: `${this.slug}${suffix}` })) {
      suffix++;
    }
    this.slug = `${this.slug}${suffix}`;
  }
  next();
});

export const TutorialTagModel = model<ITutorialTagModel>('TutorialTag', tutorialTagSchema);
