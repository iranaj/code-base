import React from "react";
import Footer from "./Footer";
import TopNavbar from "./TopNavbar";

interface LayoutProps {
  children: React.ReactNode;
}

import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="w-full h-full relative flex-col bg-projectGray-100 pt-44 md:pt-32">
      <TopNavbar />
      <motion.main
        key={router.pathname}
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
