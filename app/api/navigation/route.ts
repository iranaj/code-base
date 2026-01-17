import { auth } from "@clerk/nextjs/server";
import connectDB from "lib/db";
import {
	buildDefaultNavigationSettings,
	mergeNavigationSettings,
} from "lib/navigationConfig";
import NavigationSettings from "models/NavigationSettings";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await connectDB();
		let item = await NavigationSettings.findOne({}).sort({ createdAt: -1 });

		if (!item) {
			const payload = buildDefaultNavigationSettings();
			item = await NavigationSettings.create(payload);
		}

		const normalized = mergeNavigationSettings(
			item.toObject ? item.toObject() : item,
		);
		return NextResponse.json(normalized);
	} catch (error) {
		console.error("Error fetching navigation settings:", error);
		return NextResponse.json(
			{ error: "Failed to fetch navigation settings" },
			{ status: 500 },
		);
	}
}

export async function PUT(req: Request) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		const normalized = mergeNavigationSettings(body);

		await connectDB();
		const existing = await NavigationSettings.findOne({}).sort({
			createdAt: -1,
		});
		if (existing) {
			const updated = await NavigationSettings.findByIdAndUpdate(
				existing._id,
				normalized,
				{
					new: true,
					runValidators: true,
				},
			);
			return NextResponse.json(updated);
		}

		const created = await NavigationSettings.create(normalized);
		return NextResponse.json(created, { status: 201 });
	} catch (error) {
		console.error("Error updating navigation settings:", error);
		return NextResponse.json(
			{ error: "Failed to update navigation settings" },
			{ status: 500 },
		);
	}
}
