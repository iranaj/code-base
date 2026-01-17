import connectDB from "lib/db";
import {
	buildDefaultNavigationSettings,
	mergeNavigationSettings,
} from "lib/navigationConfig";
import NavigationSettings from "models/NavigationSettings";

export const getNavigationSettings = async () => {
	await connectDB();
	const existing = await NavigationSettings.findOne({}).sort({ createdAt: -1 });

	if (!existing) {
		const created = await NavigationSettings.create(
			buildDefaultNavigationSettings(),
		);
		return mergeNavigationSettings(created.toObject());
	}

	return mergeNavigationSettings(
		existing.toObject ? existing.toObject() : existing,
	);
};
