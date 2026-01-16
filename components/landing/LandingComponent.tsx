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
      className="bg-primary-500 w-full min-h-screen bg-center bg-no-repeat bg-cover px-5 md:px-0 flex flex-col justify-center"
      style={{
        backgroundImage: `url(/background-mono.jpg)`,
      }}
      id="home"
    >
      <section className="w-full max-w-6xl xxl:max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center h-full pt-20 md:pt-16 pb-10 md:pb-0">
        <LogoVerticalFull className="hidden md:block w-32 md:w-40 lg:w-60 fill-secondary-500" />
        <div className="w-full max-w-3xl flex flex-col items-center md:items-end text-center md:text-right">
          <SliderText />
          <h2
            className={`text-3xl md:text-4xl text-secondary-500 mt-12 md:mt-24 ${
              locale === "persian" ? "text-farsi" : "font-header"
            }`}
          >
            {text.home.slogan.title}
          </h2>
          <p
            className={`md:ml-32 text-lg text-projectGray-200 mt-5 ${
              locale === "persian" ? "text-farsi" : "font-body"
            }`}
            dir={locale !== "persian" ? "ltr" : "rtl"}
          >
            {text.home.slogan.p1}
          </p>

          <ButtonTextTypeA
            wrapperClassName="text-center md:text-end mt-8 md:mt-5"
            className="text-xs !text-projectGray-300"
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
