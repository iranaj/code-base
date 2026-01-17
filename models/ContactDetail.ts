import { model, models, Schema } from "mongoose";

const ContactDetailSchema = new Schema(
	{
		mediaEmail: { type: String, default: "" },
		generalEmail: { type: String, default: "" },
		generalPhone: { type: String, default: "" },
		addressLine1: { type: String, default: "" },
		addressLine2: { type: String, default: "" },
		city: { type: String, default: "" },
		state: { type: String, default: "" },
		postalCode: { type: String, default: "" },
		country: { type: String, default: "" },
		mapLink: { type: String, default: "" },
		mapLatitude: { type: Number, default: 0 },
		mapLongitude: { type: Number, default: 0 },
		mapZoom: { type: Number, default: 16 },
	},
	{
		timestamps: true,
	},
);

const ContactDetail =
	models.ContactDetail || model("ContactDetail", ContactDetailSchema);

export default ContactDetail;
