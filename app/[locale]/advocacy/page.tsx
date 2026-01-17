import { use } from "react";
import Layout from "components/templates/Layout";
import AdvocacyContent from "components/templates/AdvocacyContent";
import connectDB from "lib/db";
import Advocacy from "models/Advocacy";

export const dynamic = 'force-dynamic'; // Ensure new data is fetched on request

export default async function AdvocacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // 1. Connect to DB
  await connectDB();

  // 2. Fetch all advocacy items, sorted by published date desc
  // .lean() is good for performance and returning plain objects
  const items = await Advocacy.find({}).sort({ publishedAt: -1 }).lean();

  // 3. Serialize items to pass to client component (handle ObjectId and Dates if needed, though Next.js SC -> CC usually handles simple JSON-serializables. Dates might need toString() or use JSON.parse(JSON.stringify()))
  const serializedItems = JSON.parse(JSON.stringify(items));

  return (
    <Layout>
      <AdvocacyContent locale={locale} items={serializedItems} />
    </Layout>
  );
}
