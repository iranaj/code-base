"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type React from "react";
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const pathname = usePathname();

	return (
		<div className="w-full h-full relative flex-col bg-project-gray-100 pt-44 md:pt-32">
			<TopNavbar />
			<motion.main
				key={pathname}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, ease: "easeOut" }}
			>
				{children}
			</motion.main>
			<Footer />
		</div>
	);
};

export default Layout;
