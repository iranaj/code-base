import { useRouter } from "next/router";
import TopNavbar from "components/templates/TopNavbar";
import Footer from "components/templates/Footer";
import React from "react";
import ContactComponent from "components/contactUs/ContactComponent";
import LandingComponent from "components/landing/LandingComponent";

const Home: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  return (
    <div className="w-full relative flex-col">
      <TopNavbar />

      <LandingComponent />
      <ContactComponent />

      <Footer />
    </div>
  );
};
export default Home;
