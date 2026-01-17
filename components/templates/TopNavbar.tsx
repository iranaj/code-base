"use client";

import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
	useUser,
} from "@clerk/nextjs";
import { useNavigationSettings } from "components/hooks/useNavigationSettings";
import LogoHorizeotalFull from "components/UI/identity/LogoHorizontalFull";
import { motion } from "framer-motion";
import { buildNavLinks } from "lib/navigationConfig";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import TopNavbarMobile from "./TopNavbarMobile";

export default function TopNavbar() {
	const params = useParams();
	const locale = (params?.locale as string) || "en-US";
	const pathname = usePathname();
	const router = useRouter();
	const { user } = useUser();
	const [activeHash, setActiveHash] = useState("");
	const { settings } = useNavigationSettings();

	// Track hash changes
	useEffect(() => {
		// Initial hash
		setActiveHash(window.location.hash || "#home");

		const handleHashChange = () => {
			setActiveHash(window.location.hash || "#home");
		};

		window.addEventListener("hashchange", handleHashChange);
		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);

	const isHome = pathname === "/" || pathname === `/${locale}`;

	const [scrolled, setScrolled] = useState(false);

	const handleScroll = useCallback(() => {
		if (window.scrollY > 50) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	}, []);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	// Visual state logic
	const forceDark = !isHome || scrolled;
	const showLogoDesktop = !isHome || scrolled;

	const switchLanguage = (newLocale: string) => {
		// Basic locale switching logic: replace the first segment if it matches a locale
		const segments = pathname.split("/");
		if (segments[1] === locale) {
			segments[1] = newLocale;
		} else {
			segments.splice(1, 0, newLocale);
		}
		router.push(segments.join("/") || "/");
	};

	const navLinks = buildNavLinks(settings.items, locale);

	return (
		<motion.header
			className="fixed top-0 w-full z-50 transition-all duration-500 ease-in-out"
			initial={false}
			animate={{
				backgroundColor: forceDark
					? "rgba(255, 255, 255, 0.95)"
					: "rgba(255, 255, 255, 0)",
				backdropFilter: forceDark ? "blur(16px)" : "blur(0px)",
				boxShadow: forceDark ? "0 4px 30px rgba(0, 0, 0, 0.03)" : "none",
				borderBottom: forceDark
					? "1px solid rgba(0, 0, 0, 0.05)"
					: "1px solid transparent",
				height: forceDark ? "80px" : "100px",
			}}
			transition={{ duration: 0.4, ease: "easeInOut" }}
		>
			<nav className="flex justify-between items-center w-full h-full max-w-screen-2xl mx-auto px-6 sm:px-8 lg:px-12">
				{/* Logo Section */}
				<motion.div
					className={`${!showLogoDesktop && "md:invisible"} flex items-center`}
					animate={{ opacity: showLogoDesktop ? 1 : 0 }}
					transition={{ duration: 0.3 }}
				>
					<Link href={`/${locale}`}>
						<LogoHorizeotalFull
							className={`w-20 lg:w-24 transition-colors duration-300 ${
								forceDark
									? "fill-[#0B1D44]"
									: "fill-white md:fill-secondary-500"
							}`}
						/>
					</Link>
				</motion.div>

				{/* Desktop Navigation Links */}
				<div
					className={`hidden md:flex items-center gap-8 lg:gap-10 uppercase text-xs tracking-[0.6px] font-normal transition-colors duration-300 ${
						forceDark ? "" : "text-white/80"
					}`}
					dir={locale !== "persian" ? "ltr" : "rtl"}
				>
					{navLinks.map((link) => {
						const cleanHref = link.href
							.split("#")[0]
							.replace(/\/$/, "")
							.toLowerCase();
						const cleanPathname = pathname.replace(/\/$/, "").toLowerCase();

						// 3. Special handling for internal hash links on the home page
						const linkHash = link.href.split("#")[1]
							? `#${link.href.split("#")[1]}`
							: "";
						const isHashLink = link.isHash;

						let isActive = false;
						if (isHashLink && isHome) {
							isActive = activeHash === linkHash;
						} else {
							isActive =
								cleanPathname === cleanHref ||
								(cleanHref !== `/${locale}`.toLowerCase() &&
									cleanPathname.startsWith(`${cleanHref}/`));
						}

						// Dynamic color logic
						let textColorClass = "";
						if (forceDark) {
							// Dark text for white/scrolled background (User provided class)
							textColorClass = isActive
								? "text-secondary-500"
								: "text-project-gray-400 font-normal hover:text-secondary-500";
						} else {
							// Transparent Background (Top of Home)
							textColorClass = isActive
								? "text-secondary-500"
								: "text-white/80 hover:text-secondary-500";
						}

						return (
							<Link
								key={link.key}
								href={link.href}
								className={`relative py-2 transition-colors duration-300 ${textColorClass} ${locale === "persian" ? "font-bodyFa text-sm" : "font-body"}`}
							>
								{link.label}

								{isActive && (
									<motion.span
										layoutId="navbar-underline"
										className="absolute -bottom-1 left-0 w-full h-[3px] bg-secondary-500 rounded-full"
										transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
									/>
								)}
							</Link>
						);
					})}
				</div>

				{/* Language Switcher, Auth & Mobile Menu */}
				<div className="flex items-center gap-6 lg:gap-8">
					<div
						className={`hidden md:flex items-center text-xs tracking-widest transition-colors duration-300 ${forceDark ? "text-primary-500 font-normal" : "text-white/80 font-normal"}`}
					>
						<button
							type="button"
							className={`cursor-pointer transition-colors ${
								locale === "en-US"
									? "text-secondary-500 font-bold"
									: "hover:text-secondary-500"
							}`}
							onClick={() => switchLanguage("en-US")}
						>
							EN
						</button>
						<span className="mx-3 opacity-30">|</span>
						<button
							type="button"
							className={`cursor-pointer font-bodyFa transition-colors ${
								locale === "persian"
									? "text-secondary-500 font-bold"
									: "hover:text-secondary-500"
							}`}
							onClick={() => switchLanguage("persian")}
						>
							فا
						</button>
					</div>

					{/* Desktop Auth Section */}
					<div className="hidden md:flex items-center gap-5">
						<SignedIn>
							{/* Admin Link if role is admin */}
							{user?.publicMetadata?.role === "admin" && (
								<Link
									href={`/${locale}/admin`}
									className={`
                      px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border
                      ${
												forceDark
													? "border-primary-100 text-primary-600 hover:border-secondary-500 hover:text-secondary-600"
													: "border-white/20 text-white hover:bg-white/10 hover:border-white/40"
											}
                    `}
								>
									Admin
								</Link>
							)}
							<UserButton
								appearance={{
									elements: {
										userButtonAvatarBox:
											"w-10 h-10 ring-2 ring-offset-2 ring-secondary-500/50 hover:ring-secondary-500 transition-all duration-300",
									},
								}}
							/>
						</SignedIn>
						<SignedOut>
							<SignInButton mode="modal">
								<button
									type="button"
									className={`
                     relative group overflow-hidden px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg
                     ${
												forceDark
													? "bg-primary-900 text-white"
													: "bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20"
											}
                   `}
								>
									<span className="relative z-10 flex items-center gap-2">
										{locale === "persian" ? "ورود" : "Sign In"}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={2.5}
											stroke="currentColor"
											className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300"
										>
											<title>Arrow</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
											/>
										</svg>
									</span>
								</button>
							</SignInButton>
						</SignedOut>
					</div>

					<div className="md:hidden">
						<TopNavbarMobile scrolled={forceDark} />
					</div>
				</div>
			</nav>
		</motion.header>
	);
}
