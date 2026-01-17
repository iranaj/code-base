"use client";

import { useNavigationSettings } from "components/hooks/useNavigationSettings";
import Layout from "components/templates/Layout";
import { isNavItemEnabled } from "lib/navigationConfig";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import { en, persian } from "utils/translations";

export default function ProgramsPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = use(params);
	const text = locale !== "persian" ? en : persian;
	const router = useRouter();
	const { settings, loading: navLoading } = useNavigationSettings();
	const isEnabled = isNavItemEnabled(settings.items, "programs");

	useEffect(() => {
		if (!navLoading && !isEnabled) {
			router.replace(`/${locale}`);
		}
	}, [isEnabled, locale, navLoading, router]);

	if (navLoading) {
		return (
			<Layout>
				<div className="text-project-gray-400 px-6">Loading...</div>
			</Layout>
		);
	}

	if (!isEnabled) {
		return null;
	}

	return (
		<Layout>
			<section className="relative w-full max-w-6xl xxl:max-w-7xl mx-auto grid grid-cols-10 gap-y-3 pb-32 pt-10 px-5 md:px-0">
				<section
					dir={`${locale !== "persian" ? "ltr" : "rtl"}`}
					className={`col-start-1 md:col-start-3 col-span-10 md:col-span-6 text-center h-[50vh] flex flex-col justify-center items-center ${
						locale === "persian" ? "font-bodyFa" : "font-body"
					}`}
				>
					<h1
						className={`text-4xl mb-4 text-secondary-500 ${
							locale === "persian" ? "font-bodyFa font-bold" : "font-header"
						}`}
					>
						{text.programs.title}
					</h1>
					<p className="text-xl text-project-gray-300">
						{text.programs.content}
					</p>
				</section>
			</section>
		</Layout>
	);
}
