import { model, models, Schema } from "mongoose";

const LocalizedStringSchema = new Schema(
	{
		en: { type: String, default: "" },
		fa: { type: String, default: "" },
	},
	{ _id: false },
);

const BulletSchema = new Schema(
	{
		en: { type: String, default: "" },
		fa: { type: String, default: "" },
	},
	{ _id: false },
);

const AboutContentSchema = new Schema(
	{
		title: { type: LocalizedStringSchema, default: () => ({}) },
		p1: { type: LocalizedStringSchema, default: () => ({}) },
		p2: { type: LocalizedStringSchema, default: () => ({}) },
		mission: {
			title: { type: LocalizedStringSchema, default: () => ({}) },
			p1: { type: LocalizedStringSchema, default: () => ({}) },
			p2: { type: LocalizedStringSchema, default: () => ({}) },
			bullets: { type: [BulletSchema], default: [] },
		},
		vision: {
			title: { type: LocalizedStringSchema, default: () => ({}) },
			p1: { type: LocalizedStringSchema, default: () => ({}) },
		},
	},
	{
		timestamps: true,
	},
);

const AboutContent =
	models.AboutContent || model("AboutContent", AboutContentSchema);

export default AboutContent;
