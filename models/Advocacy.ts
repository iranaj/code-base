import { model, models, Schema } from "mongoose";

const AdvocacySchema = new Schema(
	{
		title: {
			en: { type: String, required: true },
			fa: { type: String, required: true },
		},
		content: {
			en: { type: String, required: true },
			fa: { type: String, required: true },
		},
		imageUrl: { type: String },
		slug: { type: String, required: true, unique: true },
		author: { type: String },
		publishedAt: { type: Date, default: Date.now },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	},
);

const Advocacy = models.Advocacy || model("Advocacy", AdvocacySchema);

export default Advocacy;
