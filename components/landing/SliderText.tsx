import React from "react";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";

function SliderText() {
  const router: NextRouter = useRouter();
  const { locale } = router;

  const text = locale !== "persian" ? en : persian;

  // slider text
  const sliderText = text.home.soundbites;

  // slider text index
  const [sliderTextIndex, setSliderTextIndex] = React.useState(0);

  // slider text interval
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSliderTextIndex((prev) => {
        if (prev === sliderText.length - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1
        className={`text-4xl  text-gray-200 font-medium h-20 ${
          locale === "persian" ? "font-bodyFa text-right" : "font-header"
        }`}
      >
        <span className={`${sliderTextIndex !== 0 ? "hidden" : ""}`}>
          {sliderText[0]}
        </span>
        <span className={`${sliderTextIndex !== 1 ? "hidden" : ""}`}>
          {sliderText[1]}
        </span>
        <span className={`${sliderTextIndex !== 2 ? "hidden" : ""}`}>
          {sliderText[2]}
        </span>
      </h1>
      <div
        className="flex gap-x-4 justify-end mt-9"
        dir={locale !== "persian" ? "ltr" : "rtl"}
      >
        <span
          className={`w-20 h-1 bg-${
            sliderTextIndex === 0 ? "gray-200" : "primary-500"
          }`}
        />
        <span
          className={`w-20 h-1 bg-${
            sliderTextIndex === 1 ? "gray-200" : "primary-500"
          }`}
        />
        <span
          className={`w-20 h-1 bg-${
            sliderTextIndex === 2 ? "gray-200" : "primary-500"
          }`}
        />
      </div>
    </div>
  );
}

export default SliderText;
