import { useRouter } from "next/router";
import TopNavbar from "components/templates/TopNavbar";
import Footer from "components/templates/Footer";
import React from "react";
import ContactComponent from "components/contactUs/ContactComponent";
import LandingComponent from "components/landing/LandingComponent";
import IndexHead from "components/heads/IndexHead";

const Home: React.FC = () => {
  return (
    <>
      <IndexHead />
      <div className="w-full relative flex-col">
        <TopNavbar />

        <LandingComponent />
        <ContactComponent />

        <Footer />
      </div>
    </>
  );
};
export default Home;
