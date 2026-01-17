"use client";

import Layout from "components/templates/Layout";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { en, persian } from "utils/translations";

interface LocalizedString {
	en: string;
	fa: string;
}

interface BulletItem {
	en: string;
	fa: string;
}

interface AboutContent {
	title: LocalizedString;
	p1: LocalizedString;
	p2: LocalizedString;
	mission: {
		title: LocalizedString;
		p1: LocalizedString;
		p2: LocalizedString;
		bullets: BulletItem[];
	};
	vision: {
		title: LocalizedString;
		p1: LocalizedString;
	};
}

const buildDefaultContent = (): AboutContent => {
	const enBullets = [
		en.about.mission_statement.bullet1,
		en.about.mission_statement.bullet2,
		en.about.mission_statement.bullet3,
		en.about.mission_statement.bullet4,
		en.about.mission_statement.bullet5,
		en.about.mission_statement.bullet6,
		en.about.mission_statement.bullet7,
	].filter(Boolean);

	const faBullets = [
		persian.about.mission_statement.bullet1,
		persian.about.mission_statement.bullet2,
		persian.about.mission_statement.bullet3,
		persian.about.mission_statement.bullet4,
		persian.about.mission_statement.bullet5,
		persian.about.mission_statement.bullet6,
		persian.about.mission_statement.bullet7,
	].filter(Boolean);

	const max = Math.max(enBullets.length, faBullets.length, 1);
	const bullets = Array.from({ length: max }).map((_, index) => ({
		en: enBullets[index] || "",
		fa: faBullets[index] || "",
	}));

	return {
		title: { en: en.about.title, fa: persian.about.title },
		p1: { en: en.about.p1, fa: persian.about.p1 },
		p2: { en: en.about.p2, fa: persian.about.p2 },
		mission: {
			title: {
				en: en.about.mission_statement.title,
				fa: persian.about.mission_statement.title,
			},
			p1: {
				en: en.about.mission_statement.p1,
				fa: persian.about.mission_statement.p1,
			},
			p2: {
				en: en.about.mission_statement.p2,
				fa: persian.about.mission_statement.p2,
			},
			bullets,
		},
		vision: {
			title: {
				en: en.about.vision_statement.title,
				fa: persian.about.vision_statement.title,
			},
			p1: {
				en: en.about.vision_statement.p1,
				fa: persian.about.vision_statement.p1,
			},
		},
	};
};

const defaultContent = buildDefaultContent();

const mergeContent = (
	base: AboutContent,
	incoming: AboutContent,
): AboutContent => {
	const bullets = Array.isArray(incoming?.mission?.bullets)
		? incoming.mission.bullets
		: base.mission.bullets;

	return {
		title: { ...base.title, ...incoming?.title },
		p1: { ...base.p1, ...incoming?.p1 },
		p2: { ...base.p2, ...incoming?.p2 },
		mission: {
			title: { ...base.mission.title, ...incoming?.mission?.title },
			p1: { ...base.mission.p1, ...incoming?.mission?.p1 },
			p2: { ...base.mission.p2, ...incoming?.mission?.p2 },
			bullets: bullets.length > 0 ? bullets : base.mission.bullets,
		},
		vision: {
			title: { ...base.vision.title, ...incoming?.vision?.title },
			p1: { ...base.vision.p1, ...incoming?.vision?.p1 },
		},
	};
};

export default function AboutPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = use(params);
	const router = useRouter();
	const isPersian = locale === "persian";
	const [content, setContent] = useState<AboutContent>(defaultContent);

	const [onMission, setOnMission] = useState(true);

	useEffect(() => {
		let isMounted = true;
		setContent(defaultContent);

		const fetchContent = async () => {
			try {
				const response = await fetch("/api/about-content");
				if (!response.ok) return;
				const data = await response.json();
				if (data && Object.keys(data).length > 0 && isMounted) {
					setContent(mergeContent(defaultContent, data));
				}
			} catch (_error) {
				// Keep defaults on error
			}
		};

		fetchContent();
		return () => {
			isMounted = false;
		};
	}, []);

	const pick = (field?: LocalizedString) => {
		if (!field) return "";
		return (isPersian ? field.fa : field.en) || "";
	};

	const missionBullets = (content.mission?.bullets || [])
		.map((bullet) => pick(bullet))
		.filter(Boolean);

	const handleClick = (section?: string) => {
		if (section === "mission") {
			setOnMission(true);
			router.push(`/${locale}/about#mission-statement`);
		} else {
			setOnMission(false);
			router.push(`/${locale}/about#vision-statement`);
		}
	};

	return (
		<Layout>
			<section className="relative w-full max-w-7xl mx-auto grid grid-cols-12 gap-8 pb-32 px-4 md:px-0">
				{/* Decorative Background Elements */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
					<div className="absolute top-20 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
					<div className="absolute bottom-40 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
				</div>

				{/* Sidebar */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="hidden lg:block col-span-3 relative"
				>
					<div className="sticky top-40 w-full pr-8">
						<h3
							className={`text-primary-500 text-3xl font-bold mb-8 pl-6 border-l-4 border-secondary-500 ${
								locale === "persian" ? "font-bodyFa" : "font-header"
							}`}
						>
							{pick(content.title)}
						</h3>

						<div
							className={`relative border-l-2 border-project-gray-200 ml-6 space-y-0 ${
								locale === "persian" ? "border-l-0 border-r-2 mr-6 ml-0" : ""
							}`}
						>
							{/* Mission Link */}
							<button
								type="button"
								className="relative group w-full bg-transparent border-0 p-0 text-left cursor-pointer"
								onClick={() => handleClick("mission")}
							>
								<div
									className={`absolute top-2 -left-[9px] w-4 h-4 rounded-full border-2 border-white transition-all duration-300 z-10 ${
										onMission
											? "bg-secondary-500 scale-125"
											: "bg-project-gray-300 group-hover:bg-secondary-500"
									} ${locale === "persian" ? "-right-[9px] left-auto" : ""}`}
								/>
								<span
									className={`block py-2 pl-8 pr-4 text-sm font-semibold transition-colors duration-300 ${
										onMission
											? "!text-primary-500 font-bold"
											: "!text-project-gray-500 group-hover:!text-primary-500"
									} ${locale === "persian" ? "font-bodyFa text-right pr-8 pl-4" : "text-left"}`}
								>
									{pick(content.mission?.title)}
								</span>
							</button>

							{/* Vision Link */}
							<button
								type="button"
								className="relative group w-full bg-transparent border-0 p-0 text-left cursor-pointer"
								onClick={() => handleClick("vision")}
							>
								<div
									className={`absolute top-2 -left-[9px] w-4 h-4 rounded-full border-2 border-white transition-all duration-300 z-10 ${
										!onMission
											? "bg-secondary-500 scale-125"
											: "bg-project-gray-300 group-hover:bg-secondary-500"
									} ${locale === "persian" ? "-right-[9px] left-auto" : ""}`}
								/>
								<span
									className={`block py-2 pl-8 pr-4 text-sm font-semibold transition-colors duration-300 ${
										!onMission
											? "!text-primary-500 font-bold"
											: "!text-project-gray-500 group-hover:!text-primary-500"
									} ${locale === "persian" ? "font-bodyFa text-right pr-8 pl-4" : "text-left"}`}
								>
									{pick(content.vision?.title)}
								</span>
							</button>
						</div>
					</div>
				</motion.div>

				{/* Main Content */}
				<section
					dir={`${locale !== "persian" ? "ltr" : "rtl"}`}
					className="col-span-12 lg:col-span-8 lg:col-start-4 flex flex-col gap-12"
				>
					{/* Main Title & Intro */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<h1
							className={`text-6xl md:text-7xl text-primary-500 mb-8 relative inline-block ${
								locale === "persian"
									? "font-bodyFa font-black"
									: "font-header font-bold tracking-tight"
							}`}
						>
							{pick(content.title)}
							<motion.span
								initial={{ width: 0 }}
								animate={{ width: "60%" }}
								transition={{ delay: 0.5, duration: 0.8 }}
								className={`absolute -bottom-4 h-2 bg-secondary-500 ${locale === "persian" ? "right-0" : "left-0"}`}
							/>
						</h1>

						<div
							className={`mt-12 space-y-6 text-lg md:text-xl leading-8 text-project-gray-500 text-justify font-light ${
								locale === "persian" ? "font-bodyFa" : "font-body antialiased"
							}`}
						>
							<p>{pick(content.p1)}</p>
							<p>{pick(content.p2)}</p>
						</div>
					</motion.div>

					{/* Mission Section (Dark Card) */}
					<motion.div
						id="mission-statement"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.6 }}
						className="relative mt-8 scroll-mt-32"
					>
						<div className="relative overflow-hidden rounded-3xl bg-primary-500 shadow-xl p-8 md:p-12">
							{/* Texture */}
							<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />

							<div className="relative z-10">
								<h2
									className={`text-4xl md:text-5xl mb-8 text-white ${
										locale === "persian"
											? "font-bodyFa font-black"
											: "font-header font-bold tracking-tight"
									}`}
								>
									{pick(content.mission?.title)}
								</h2>

								<div
									className={`space-y-6 text-lg leading-8 text-white/90 text-justify font-light opacity-95 ${locale === "persian" ? "font-bodyFa" : "font-body antialiased"}`}
								>
									<p>{pick(content.mission?.p1)}</p>
									<p>{pick(content.mission?.p2)}</p>

									<ul className="grid gap-4 mt-8">
										{missionBullets.map((bullet) => (
											<li
												key={bullet}
												className={`flex items-start gap-4 ${locale === "persian" ? "font-bodyFa" : ""}`}
											>
												<span className="mt-2 w-2 h-2 rounded-full bg-secondary-500 flex-shrink-0" />
												<span>{bullet}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Vision Section (Clean Block) */}
					<motion.div
						id="vision-statement"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-100px" }}
						transition={{ duration: 0.6 }}
						className="relative scroll-mt-32"
					>
						<div
							className={`relative p-8 md:p-12 border-l-4 border-secondary-500 bg-white shadow-sm rounded-r-3xl ${
								locale === "persian"
									? "border-l-0 border-r-4 rounded-r-none rounded-l-3xl"
									: ""
							}`}
						>
							<h2
								className={`text-4xl md:text-5xl mb-8 text-primary-500 ${
									locale === "persian"
										? "font-bodyFa font-black"
										: "font-header font-bold tracking-tight"
								}`}
							>
								{pick(content.vision?.title)}
							</h2>

							<p
								className={`text-lg md:text-xl leading-8 text-project-gray-500 text-justify font-light ${
									locale === "persian" ? "font-bodyFa" : "font-body antialiased"
								}`}
							>
								{pick(content.vision?.p1)}
							</p>
						</div>
					</motion.div>
				</section>
			</section>
		</Layout>
	);
}
