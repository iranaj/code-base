import { auth } from "@clerk/nextjs/server";
import connectDB from "lib/db";
import ContactDetail from "models/ContactDetail";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await connectDB();
		const item = await ContactDetail.findOne({}).sort({ createdAt: -1 });
		return NextResponse.json(item || {});
	} catch (error) {
		console.error("Error fetching contact details:", error);
		return NextResponse.json(
			{ error: "Failed to fetch contact details" },
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
		await connectDB();

		const existing = await ContactDetail.findOne({}).sort({ createdAt: -1 });
		if (existing) {
			const updated = await ContactDetail.findByIdAndUpdate(
				existing._id,
				body,
				{
					new: true,
					runValidators: true,
				},
			);
			return NextResponse.json(updated);
		}

		const created = await ContactDetail.create(body);
		return NextResponse.json(created, { status: 201 });
	} catch (error) {
		console.error("Error updating contact details:", error);
		return NextResponse.json(
			{ error: "Failed to update contact details" },
			{ status: 500 },
		);
	}
}
