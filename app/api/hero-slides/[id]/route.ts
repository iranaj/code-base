import { auth } from "@clerk/nextjs/server";
import connectDB from "lib/db";
import HeroSlide from "models/HeroSlide";
import { NextResponse } from "next/server";

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		await connectDB();
		const item = await HeroSlide.findById(id);

		if (!item) {
			return NextResponse.json({ error: "Item not found" }, { status: 404 });
		}

		return NextResponse.json(item);
	} catch (_error) {
		return NextResponse.json(
			{ error: "Failed to fetch item" },
			{ status: 500 },
		);
	}
}

export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = await params;
		const body = await req.json();
		await connectDB();

		const updatedItem = await HeroSlide.findByIdAndUpdate(id, body, {
			new: true,
			runValidators: true,
		});

		if (!updatedItem) {
			return NextResponse.json({ error: "Item not found" }, { status: 404 });
		}

		return NextResponse.json(updatedItem);
	} catch (_error) {
		return NextResponse.json(
			{ error: "Failed to update item" },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = await params;
		await connectDB();

		const deletedItem = await HeroSlide.findByIdAndDelete(id);

		if (!deletedItem) {
			return NextResponse.json({ error: "Item not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Item deleted successfully" });
	} catch (_error) {
		return NextResponse.json(
			{ error: "Failed to delete item" },
			{ status: 500 },
		);
	}
}
