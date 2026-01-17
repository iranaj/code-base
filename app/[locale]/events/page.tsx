import EventsContent from "components/templates/EventsContent";
import Layout from "components/templates/Layout";
import connectDB from "lib/db";
import { getNavigationSettings } from "lib/navigationSettings.server";
import Event from "models/Event";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EventsPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const navigation = await getNavigationSettings();
	const isEnabled = navigation.items.find(
		(item) => item.key === "events",
	)?.enabled;
	if (isEnabled === false) {
		notFound();
	}

	// 1. Connect to DB
	await connectDB();

	// 2. Fetch all events, sorted by date desc
	const items = await Event.find({}).sort({ date: -1 }).lean();

	// 3. Serialize
	const serializedItems = JSON.parse(JSON.stringify(items));

	return (
		<Layout>
			<EventsContent locale={locale} items={serializedItems} />
		</Layout>
	);
}
