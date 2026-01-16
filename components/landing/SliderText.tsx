import React, { useState } from "react";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";
import { motion, AnimatePresence } from "framer-motion";

const SLIDE_DURATION = 4; // seconds

function SliderText() {
  const router: NextRouter = useRouter();
  const { locale } = router;

  const text = locale !== "persian" ? en : persian;
  const sliderText = text.home.soundbites;

  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % sliderText.length);
  };

  return (
    <div className="flex flex-col h-full min-h-[140px]">
      {/* Text Area */}
      <div className="relative h-20 md:h-24 overflow-hidden mb-4">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`text-xl md:text-4xl text-projectGray-200 font-medium absolute top-0 w-full leading-relaxed ${
              locale === "persian" ? "font-bodyFa text-right" : "font-header text-left md:text-right"
            } ${locale !== "persian" ? "ltr:text-right" : ""}`} // Ensuring LTR english text aligns right to match bars if desired, or left. Original was text-center-ish? No, original had no alignment class, just inherited. Let's assume standard alignment.
          >
             {/* Note: Original code didn't force text alignment in the class, but container layout puts it on the right. 
              Let's respect locale: Farsi -> Right, English -> Left (or Right if matching layout).
              The container `LandingComponent` aligns this `SliderText` wrapper to the Right (it's in a flex row, max-w-3xl next to logo). 
              If the logo is on Left, this text is on Right. So standard text alignment might be Right for English too?
              Actually, the buttons below are `text-end`. So let's align text `text-end` (Right for LTR, Left for RTL? No, `text-end` is logical).
              Tailwind `text-end` (Post v3) or `text-right`.
              Let's align it nicely with the bars.
              */}
            {sliderText[index]}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Progress Bars */}
      <div
        className="flex gap-x-4 mt-auto justify-end"
        dir={locale !== "persian" ? "ltr" : "rtl"}
      >
        {sliderText.map((_, i) => (
          <div
            key={i}
            className="relative w-24 h-1.5 rounded-full overflow-hidden bg-projectGray-200/20"
          >
            {/* Completed Bars */}
            {i < index && (
              <div className="absolute inset-0 bg-projectGray-200 opacity-60" />
            )}

            {/* Active Bar Animation */}
            {i === index && (
              <motion.div
                className="absolute inset-0 bg-projectGray-200"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: SLIDE_DURATION, ease: "linear" }}
                onAnimationComplete={handleNext}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SliderText;
