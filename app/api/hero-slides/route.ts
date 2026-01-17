import { auth } from "@clerk/nextjs/server";
import connectDB from "lib/db";
import HeroSlide from "models/HeroSlide";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await connectDB();
		const items = await HeroSlide.find({}).sort({ order: 1, createdAt: 1 });
		return NextResponse.json(items);
	} catch (error) {
		console.error("Error fetching hero slides:", error);
		return NextResponse.json(
			{ error: "Failed to fetch hero slides" },
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

		const newItem = await HeroSlide.create(body);
		return NextResponse.json(newItem, { status: 201 });
	} catch (error) {
		console.error("Error creating hero slide:", error);
		return NextResponse.json(
			{ error: "Failed to create hero slide" },
			{ status: 500 },
		);
	}
}
