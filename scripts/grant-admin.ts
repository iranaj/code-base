import path from "node:path";
import { createClerkClient } from "@clerk/backend";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const secretKey = process.env.CLERK_SECRET_KEY;

if (!secretKey) {
	console.error("Error: CLERK_SECRET_KEY not found in .env");
	process.exit(1);
}

const clerkClient = createClerkClient({ secretKey });

const userId = process.argv[2];

if (!userId) {
	console.log("\nUsage: bun run scripts/grant-admin.ts <user_id>\n");
	console.log(
		"You can find your User ID in the Clerk Dashboard or by checking your profile.",
	);
	process.exit(1);
}

async function run() {
	try {
		console.log(`Updating metadata for user: ${userId}...`);
		await clerkClient.users.updateUserMetadata(userId, {
			publicMetadata: {
				role: "admin",
			},
		});
		console.log(`✅ Success! User ${userId} is now an Admin.`);
		console.log(
			"You may need to sign out and sign back in for changes to propagate to client sessions.",
		);
	} catch (err) {
		console.error("❌ Error updating user:", err);
	}
}

run();
