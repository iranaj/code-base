import mongoose, { Schema, model, models } from 'mongoose';

const EventSchema = new Schema({
  title: {
    en: { type: String, required: true },
    fa: { type: String, required: true },
  },
  description: {
    en: { type: String, required: true },
    fa: { type: String, required: true },
  },
  location: { type: String },
  date: { type: Date, required: true },
  imageUrl: { type: String },
  registrationLink: { type: String },
  isVirtual: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Event = models.Event || model('Event', EventSchema);

export default Event;
