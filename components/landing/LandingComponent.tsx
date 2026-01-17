"use client";

import ButtonTextTypeA from "components/UI/buttons/ButtonTextTypeA";
import LogoVerticalFull from "components/UI/identity/LogoVerticalFull";
import React, { useEffect, useState } from "react";
import SliderText from "./SliderText";
import { useParams } from "next/navigation";
import { en, persian } from "utils/translations";

const LandingComponent = () => {
  const params = useParams();
  const locale = (params?.locale as string) || "en-US";

  const text = locale !== "persian" ? en : persian;
  const [slides, setSlides] = useState<string[]>(text.home.soundbites);

  useEffect(() => {
    let isMounted = true;

    setSlides(text.home.soundbites);

    const fetchSlides = async () => {
      try {
        const response = await fetch("/api/hero-slides");
        if (!response.ok) return;
        const data = await response.json();
        if (!Array.isArray(data)) return;

        const ordered = data
          .filter((item) => item?.isActive !== false)
          .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));

        const localized = ordered
          .map((item) => (locale === "persian" ? item?.text?.fa : item?.text?.en))
          .filter((value) => typeof value === "string" && value.trim().length > 0);

        if (localized.length > 0 && isMounted) {
          setSlides(localized);
        }
      } catch (error) {
        // Keep default slides on error
      }
    };

    fetchSlides();
    return () => {
      isMounted = false;
    };
  }, [locale, text.home.soundbites]);

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
          <SliderText locale={locale} slides={slides} />
          <h2
            className={`text-3xl md:text-4xl text-secondary-500 mt-12 md:mt-24 ${
              locale === "persian" ? "text-farsi" : "font-header"
            }`}
          >
            {text.home.slogan.title}
          </h2>
          <p
            className={`md:ml-32 text-lg text-project-gray-200 mt-5 ${
              locale === "persian" ? "text-farsi" : "font-body"
            }`}
            dir={locale !== "persian" ? "ltr" : "rtl"}
          >
            {text.home.slogan.p1}
          </p>

          <ButtonTextTypeA
            wrapperClassName="text-center md:text-end mt-8 md:mt-5"
            className="text-xs !text-project-gray-300"
            href={`/${locale}/about`}
            text={text.general.read_more}
            hasIcon
          />
        </div>
      </section>
    </div>
  );
};

export default LandingComponent;
