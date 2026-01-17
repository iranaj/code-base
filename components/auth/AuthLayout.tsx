"use client";

import LogoHorizontalFull from "components/UI/identity/LogoHorizontalFull";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

interface AuthLayoutProps {
	children: React.ReactNode;
	title: string;
	subtitle: string;
}

export default function AuthLayout({
	children,
	title,
	subtitle,
}: AuthLayoutProps) {
	const pathname = usePathname();
	// Simple check to see if we are on localized path to redirect logo to correct home
	const locale = pathname?.split("/")[1] || "en-US";

	return (
		<div className="min-h-screen w-full flex flex-col md:flex-row bg-primary-900 relative">
			{/* Unified Background Layer (Eliminates seams) */}
			<div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-black z-0" />

			{/* Left Side - Branding */}
			<div className="relative w-full md:w-1/2 lg:w-5/12 flex flex-col justify-between p-12 lg:p-16 text-white min-h-[300px] md:min-h-screen overflow-hidden z-10">
				{/* Left Side Specific Texture (Subtle) */}
				<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 z-0" />

				{/* Decorative Circle (Glassmorphism effect) */}
				<div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl z-0 pointer-events-none" />
				<div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-3xl z-0 pointer-events-none" />

				{/* Logo */}
				<div className="relative z-10 mb-8 md:mb-0">
					<Link href={`/${locale}`} className="inline-block">
						<LogoHorizontalFull className="w-48 lg:w-56 fill-white drop-shadow-md" />
					</Link>
				</div>

				{/* Hero Text */}
				<div className="relative z-10 flex flex-col gap-6 hidden md:flex justify-center flex-grow">
					<div>
						<h1 className="font-header text-4xl lg:text-5xl font-bold leading-tight text-white mb-4 drop-shadow-sm">
							{title}
						</h1>
						<p className="font-body text-project-gray-300 text-lg lg:text-xl font-light leading-relaxed max-w-md">
							{subtitle}
						</p>
						<div className="w-16 h-1 bg-secondary-500 mt-8 rounded-full" />
					</div>
				</div>

				{/* Footer/Copyright */}
				<div className="relative z-10 text-xs text-project-gray-400 hidden md:block font-body tracking-wider opacity-60">
					&copy; {new Date().getFullYear()} Iranian Jurists. All rights
					reserved.
				</div>
			</div>

			{/* Right Side - Form */}
			<div className="w-full md:w-1/2 lg:w-7/12 flex flex-col items-center justify-center p-6 sm:p-12 relative z-10">
				{/* Pattern restricted to the area behind the frame as requested */}
				<div className="absolute inset-0 bg-[url('/auth-pattern.png')] bg-repeat opacity-10 mix-blend-overlay z-0" />

				{/* Mobile Header (Visible only on mobile) */}
				<div className="relative z-10 md:hidden text-center mb-10 mt-8">
					<h1 className="font-header text-3xl font-bold text-white mb-2">
						{title}
					</h1>
					<p className="font-body text-project-gray-300 px-4">{subtitle}</p>
				</div>

				<div className="relative z-10 w-full max-w-md">{children}</div>
			</div>
		</div>
	);
}
