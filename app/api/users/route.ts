import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Verify requesting user is admin
		const client = await clerkClient();
		const user = await client.users.getUser(userId);
		if (user.publicMetadata.role !== "admin") {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		// Fetch all users
		// Limit is 10 by default, increasing to 50 for now or handle pagination
		const users = await client.users.getUserList({ limit: 50 });

		return NextResponse.json(users.data);
	} catch (error) {
		console.error("Error fetching users:", error);
		return NextResponse.json(
			{ error: "Failed to fetch users" },
			{ status: 500 },
		);
	}
}
