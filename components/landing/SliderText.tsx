"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { en, persian } from "utils/translations";

const SLIDE_DURATION = 4; // seconds

interface SliderTextProps {
	locale: string;
	slides?: string[];
}

function SliderText({ locale, slides }: SliderTextProps) {
	const text = locale !== "persian" ? en : persian;
	const sliderText =
		Array.isArray(slides) && slides.length > 0 ? slides : text.home.soundbites;

	const [index, setIndex] = useState(0);

	useEffect(() => {
		void slides;
		setIndex(0);
	}, [slides]);

	const handleNext = () => {
		setIndex((prev) => (prev + 1) % sliderText.length);
	};

	if (!sliderText || sliderText.length === 0) {
		return null;
	}

	return (
		<div className="flex flex-col h-full min-h-[140px]">
			{/* Text Area */}
			<div className="relative h-32 md:h-40 overflow-hidden mb-4">
				<AnimatePresence mode="wait">
					<motion.h1
						key={index}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
						className={`text-xl md:text-4xl text-project-gray-200 font-medium absolute top-0 w-full leading-relaxed ${
							locale === "persian"
								? "font-bodyFa text-center md:text-right"
								: "font-header text-center md:text-right"
						} ${locale !== "persian" ? "ltr:text-center md:ltr:text-right" : ""}`}
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
				className="flex gap-x-4 mt-auto justify-center md:justify-end"
				dir={locale !== "persian" ? "ltr" : "rtl"}
			>
				{sliderText.map((slide, i) => (
					<div
						key={slide}
						className="relative w-24 h-1.5 rounded-full overflow-hidden bg-project-gray-200/20"
					>
						{/* Completed Bars */}
						{i < index && (
							<div className="absolute inset-0 bg-project-gray-200 opacity-60" />
						)}

						{/* Active Bar Animation */}
						{i === index && (
							<motion.div
								className="absolute inset-0 bg-project-gray-200"
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
