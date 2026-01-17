"use client";

import Layout from "components/templates/Layout";
import { use } from "react";
import { en, persian } from "utils/translations";

export default function SuccessPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = use(params);
	const text = locale !== "persian" ? en : persian;
	return (
		<Layout>
			<section className="relative w-full h-96 max-w-6xl xxl:max-w-7xl mx-auto grid grid-cols-10 gap-y-3 pb-32 text-gray-600">
				<h1 className="col-span-10 mt-4 indent-3 md:indent-5 text-2xl">
					{text.membership.success.title}
				</h1>
				<p className="col-span-10 mt-4 indent-3 md:indent-5 ">
					{text.membership.success.p1}
				</p>
			</section>
		</Layout>
	);
}
