"use client";

import { UserButton } from "@clerk/nextjs";
import {
	AdjustmentsHorizontalIcon,
	Bars3Icon,
	CalendarDateRangeIcon,
	DocumentTextIcon,
	MegaphoneIcon,
	PhoneIcon,
	RectangleStackIcon,
	Squares2X2Icon,
	UserGroupIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import LogoHorizontalFull from "components/UI/identity/LogoHorizontalFull";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState } from "react";

export default function AdminSidebarLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	// Extract locale from pathname for links
	const locale = pathname?.split("/")[1] || "en-US";

	const navigation = [
		{ name: "Dashboard", href: `/${locale}/admin`, icon: Squares2X2Icon },
		{
			name: "Advocacy",
			href: `/${locale}/admin/advocacy`,
			icon: MegaphoneIcon,
		},
		{
			name: "Events",
			href: `/${locale}/admin/events`,
			icon: CalendarDateRangeIcon,
		},
		{
			name: "Hero Slides",
			href: `/${locale}/admin/hero-slides`,
			icon: RectangleStackIcon,
		},
		{
			name: "Contact Details",
			href: `/${locale}/admin/contact-details`,
			icon: PhoneIcon,
		},
		{
			name: "Navigation",
			href: `/${locale}/admin/navigation`,
			icon: AdjustmentsHorizontalIcon,
		},
		{ name: "About", href: `/${locale}/admin/about`, icon: DocumentTextIcon },
		{ name: "Users", href: `/${locale}/admin/users`, icon: UserGroupIcon },
	];

	return (
		<div className="min-h-screen bg-project-gray-100 flex font-body text-project-gray-500">
			{/* Mobile Sidebar Overlay */}
			{sidebarOpen && (
				<button
					type="button"
					aria-label="Close sidebar"
					className="fixed inset-0 bg-primary-900/50 z-40 lg:hidden backdrop-blur-sm"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			{/* Sidebar Navigation */}
			<aside
				className={`
        fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-project-gray-200 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
			>
				<div className="flex items-center justify-between h-20 px-6 border-b border-project-gray-200">
					<Link href={`/${locale}/admin`}>
						<LogoHorizontalFull className="w-32 fill-primary-900" />
					</Link>
					<button
						type="button"
						className="lg:hidden text-project-gray-400 hover:text-primary-900"
						onClick={() => setSidebarOpen(false)}
					>
						<XMarkIcon className="w-6 h-6" />
					</button>
				</div>

				<nav className="p-4 space-y-1">
					{navigation.map((item) => {
						const isActive =
							pathname === item.href ||
							(item.href !== `/${locale}/admin` &&
								pathname?.startsWith(item.href));
						return (
							<Link
								key={item.name}
								href={item.href}
								className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${
										isActive
											? "bg-primary-50 text-primary-900"
											: "text-project-gray-500 hover:bg-project-gray-50 hover:text-primary-900"
									}
                `}
							>
								<item.icon
									className={`w-6 h-6 ${isActive ? "text-primary-900" : "text-project-gray-400"}`}
								/>
								{item.name}
							</Link>
						);
					})}
				</nav>
			</aside>

			{/* Main Content Area */}
			<div className="flex-1 flex flex-col min-w-0 overflow-hidden">
				{/* Top Header */}
				<header className="h-20 bg-white border-b border-project-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
					<button
						type="button"
						className="lg:hidden p-2 -ml-2 text-project-gray-400 hover:text-primary-900"
						onClick={() => setSidebarOpen(true)}
					>
						<Bars3Icon className="w-6 h-6" />
					</button>

					<div className="flex items-center gap-4 ml-auto">
						<span className="text-sm font-medium text-project-gray-500">
							Admin Portal
						</span>
						<UserButton
							appearance={{
								elements: {
									userButtonAvatarBox:
										"w-10 h-10 border border-project-gray-200",
								},
							}}
						/>
					</div>
				</header>

				{/* Page Content */}
				<main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
					{children}
				</main>
			</div>
		</div>
	);
}
