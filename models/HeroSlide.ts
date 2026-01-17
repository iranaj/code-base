import mongoose, { Schema, model, models } from 'mongoose';

const HeroSlideSchema = new Schema(
  {
    text: {
      en: { type: String, required: true },
      fa: { type: String, required: true },
    },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const HeroSlide = models.HeroSlide || model('HeroSlide', HeroSlideSchema);

export default HeroSlide;
