import { NextPage } from "next";
import React from "react";
import Layout from "components/templates/Layout";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";

const AboutPage: NextPage = () => {
  const router: NextRouter = useRouter();
  const { locale } = router;
  const text = locale === "en-US" ? en : persian;

  const [onMission, setOnMission] = React.useState(true);

  const handleClick = (section?: string) => {
    if (section === "mission") {
      setOnMission(true);
      router.push("/about#mission-statement");
    } else {
      setOnMission(false);
      router.push("/about#vision-statement");
    }
  };

  return (
    <Layout>
      <section className="relative w-full max-w-6xl xxl:max-w-7xl mx-auto grid grid-cols-10 gap-y-3 pb-32">
        <ul
          className={`fixed uppercase left-40 text-gray-300 ${
            locale === "persian" ? "font-bodyFa" : null
          }`}
        >
          <li
            className={`${
              onMission ? "text-secondary-500" : ""
            } hover:text-secondary-500 cursor-pointer`}
            onClick={() => handleClick("mission")}
          >
            {text.about.mission_statement.title}
          </li>
          <li
            className={`mt-5 ${
              !onMission ? "text-secondary-500" : ""
            } hover:text-secondary-500 cursor-pointer`}
            onClick={() => handleClick()}
          >
            {text.about.vision_statement.title}
          </li>
        </ul>
        <section
          dir={`${locale === "en-US" ? "ltr" : "rtl"}`}
          className={`col-start-4 col-span-6 text-primary-500 text-base ${
            locale === "persian" ? "font-bodyFa" : "font-body"
          }`}
        >
          <p className="leading-7">{text.about.p1}</p>
          <p className="mt-4">{text.about.p2}</p>
          <h1
            className={`text-4xl mt-9 mb-4 text-secondary-500 ${
              locale === "persian" ? "font-bodyFa font-bold" : "font-header"
            }`}
            id="mission-statement"
          >
            {text.about.mission_statement.title}
          </h1>
          <p>{text.about.mission_statement.p1}</p>
          <p className="mt-4">{text.about.mission_statement.p2}</p>
          <ul className="mt-4 ltr:pl-6 rtl:pr-6 list-disc">
            <li className="mb-2">{text.about.mission_statement.bullet1}</li>
            <li className="mb-2">{text.about.mission_statement.bullet2}</li>
            <li className="mb-2">{text.about.mission_statement.bullet3}</li>
            <li className="mb-2">{text.about.mission_statement.bullet4}</li>
            <li className="mb-2">{text.about.mission_statement.bullet5}</li>
            <li className="mb-2">{text.about.mission_statement.bullet6}</li>
            <li className="mb-2">{text.about.mission_statement.bullet7}</li>
          </ul>

          <h1
            className={`text-4xl mt-9 mb-4 text-secondary-500 ${
              locale === "persian" ? "font-bodyFa font-bold" : "font-header"
            }`}
            id="vision-statement"
          >
            {text.about.vision_statement.title}
          </h1>
          <p>{text.about.vision_statement.p1}</p>
        </section>
      </section>
    </Layout>
  );
};

export default AboutPage;
