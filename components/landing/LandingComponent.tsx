import ButtonTextTypeA from "components/UI/buttons/ButtonTextTypeA";
import LogoVerticalFull from "components/UI/identity/LogoVerticalFull";
import React from "react";
import SliderText from "./SliderText";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";

const LandingComponent = () => {
  const router: NextRouter = useRouter();
  const { locale } = router;

  const text = locale !== "persian" ? en : persian;
  return (
    <div
      className="bg-primary-500 w-full h-screen bg-center bg-no-repeat bg-cover "
      style={{
        backgroundImage: `url(/background-mono.jpg)`,
      }}
      id="home"
    >
      <section className="max-w-6xl xxl:max-w-7xl mx-auto flex justify-between items-center h-full">
        <LogoVerticalFull className="w-60 fill-secondary-500" />
        <div className="max-w-3xl">
          <SliderText />
          <h2
            className={`text-5xl text-secondary-500  mt-24 ${
              locale === "persian" ? "text-farsi" : "font-header"
            }`}
          >
            {text.home.slogan.title}
          </h2>
          <p
            className={`ml-32  text-base text-gray-200 mt-5 ${
              locale === "persian" ? "text-farsi" : "font-body"
            }`}
          >
            {text.home.slogan.p1}
          </p>

          <ButtonTextTypeA
            wrapperClassName="text-end mt-5"
            className="text-xs !text-gray-300"
            href="/about"
            text={text.general.read_more}
            hasIcon
          />
        </div>
      </section>
    </div>
  );
};

export default LandingComponent;
