import React from "react";
import Footer from "./Footer";
import TopNavbarSinglePage from "./TopNavbarSinglePage";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full relative flex-col bg-gray-100 pt-44 md:pt-64">
      <TopNavbarSinglePage />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
