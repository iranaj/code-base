import { useRouter } from "next/router";
import TopNavbar from "components/templates/TopNavbar";
import Footer from "components/templates/Footer";
import React from "react";
import ContactComponent from "components/contactUs/ContactComponent";

const Home: React.FC = () => {
  const router = useRouter();
  const { locale } = router;

  return (
    <div className="w-full relative flex-col">
      <TopNavbar />

      <main
        className="bg-primary-500 w-full h-screen bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(/background-mono.png)`,
        }}
      ></main>
      <ContactComponent />

      <div className="w-full h-96 bg-primary-500"></div>

      {/* <Footer /> */}
    </div>
  );
};
export default Home;
