import React from "react";

function SliderText() {
  // slider text
  const sliderText = [
    "A National Assembly of Legal Experts.",
    "Working to Provide for a Lasting Transition.",
    "Dedicated to a Free, Democratic, and Secular Iran.",
  ];

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
      <h1 className="text-4xl font-header text-gray-200 font-medium h-20 ">
        {sliderText[sliderTextIndex]}
      </h1>
      <div className="flex gap-x-4 justify-end mt-9">
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
