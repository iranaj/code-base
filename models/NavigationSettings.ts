import { model, models, Schema } from "mongoose";

const LocalizedLabelSchema = new Schema(
	{
		en: { type: String, default: "" },
		fa: { type: String, default: "" },
	},
	{ _id: false },
);

const NavigationItemSchema = new Schema(
	{
		key: { type: String, required: true },
		enabled: { type: Boolean, default: true },
		label: { type: LocalizedLabelSchema, default: () => ({}) },
	},
	{ _id: false },
);

const NavigationSettingsSchema = new Schema(
	{
		items: { type: [NavigationItemSchema], default: [] },
	},
	{
		timestamps: true,
	},
);

const NavigationSettings =
	models.NavigationSettings ||
	model("NavigationSettings", NavigationSettingsSchema);

export default NavigationSettings;
