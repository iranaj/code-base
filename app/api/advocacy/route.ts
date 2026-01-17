import { auth } from "@clerk/nextjs/server";
import connectDB from "lib/db";
import Advocacy from "models/Advocacy";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await connectDB();
		const items = await Advocacy.find({}).sort({ createdAt: -1 });
		return NextResponse.json(items);
	} catch (error) {
		console.error("Error fetching advocacy items:", error);
		return NextResponse.json(
			{ error: "Failed to fetch advocacy items" },
			{ status: 500 },
		);
	}
}

export async function POST(req: Request) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		await connectDB();

		const newItem = await Advocacy.create(body);
		return NextResponse.json(newItem, { status: 201 });
	} catch (error) {
		console.error("Error creating advocacy item:", error);
		return NextResponse.json(
			{ error: "Failed to create item" },
			{ status: 500 },
		);
	}
}
