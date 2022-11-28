import ButtonTextTypeA from "components/UI/buttons/ButtonTextTypeA";
import LogoVerticalFull from "components/UI/identity/LogoVerticalFull";
import React from "react";
import SliderText from "./SliderText";

const LandingComponent = () => {
  return (
    <main
      className="bg-primary-500 w-full h-screen bg-center bg-no-repeat bg-cover "
      style={{
        backgroundImage: `url(/background-mono.png)`,
      }}
    >
      <section className="max-w-7xl mx-auto flex justify-between items-center h-full">
        <LogoVerticalFull className="w-60 fill-secondary-500" />
        <div className="max-w-3xl">
          <SliderText />
          <h2 className="text-5xl text-secondary-500 font-header mt-24">
            We envision an Iran
          </h2>
          <p className="ml-32 font-body text-base text-gray-200 mt-5">
            democratic and secular, within which the Rule of Law and separation
            of powers guarantees the fundamental rights of its people.
          </p>

          <ButtonTextTypeA
            wrapperClassName="text-end"
            className="text-xs font-body text-gray-300"
            href="/about"
            text="read more"
            hasIcon
          />
        </div>
      </section>
    </main>
  );
};

export default LandingComponent;
