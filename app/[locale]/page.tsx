import ContactComponent from "components/contactUs/ContactComponent";
import LandingComponent from "components/landing/LandingComponent";
import Footer from "components/templates/Footer";
import TopNavbar from "components/templates/TopNavbar";
import type { Metadata } from "next";
import { en, persian } from "utils/translations";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const text = locale !== "persian" ? en : persian;
	const url = `https://iranaj.org/`;

	return {
		title: `${text.home.title} - ${text.general.name}`,
		description: text.general.headers.description,
		openGraph: {
			title: `${text.general.name} home`,
			description: text.general.headers.description,
			url: url,
			siteName: text.general.name,
			images: [
				{
					url: `${url}logo_horizontal.svg`,
					alt: text.general.headers.content,
				},
			],
			locale: "en_us",
			type: "website",
		},
		twitter: {
			card: "summary",
			site: text.general.social_media_usernames.twitter,
			title: `${text.general.name} home`,
			description: text.general.headers.description,
			images: [`${url}logo_horizontal.svg`],
		},
	};
}

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale: _locale } = await params;
	return (
		<div className="w-full relative flex-col">
			<TopNavbar />
			<LandingComponent />
			<ContactComponent />
			<Footer />
		</div>
	);
}
