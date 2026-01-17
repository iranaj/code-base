import clientPromise from "lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const data = await request.json();
		const body = {
			...data,
			createdAt: new Date(),
		};

		const client = await clientPromise;
		const db = client.db("members");

		const result = await db.collection(`${body.membership}s`).insertOne(body);

		console.log("result", result);

		return NextResponse.json({ message: "Success!", ok: true });
	} catch (error: any) {
		console.log("error", error);
		return NextResponse.json(
			{ message: error.message, ok: false },
			{ status: 400 },
		);
	}
}
