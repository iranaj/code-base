
import { NextPage } from "next";
import Layout from "components/templates/Layout";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";
import GeneralHead from "components/heads/GeneralHead";

const PressPage: NextPage = () => {
  const router: NextRouter = useRouter();
  const { locale } = router;
  const text = locale !== "persian" ? en : persian;

  return (
    <>
      <GeneralHead
        title={text.press.title}
        content={text.general.headers.content}
        description={text.general.headers.description}
      />
      <Layout>
        <section className="relative w-full max-w-6xl xxl:max-w-7xl mx-auto grid grid-cols-10 gap-y-3 pb-32 pt-10 px-5 md:px-0">
          <section
            dir={`${locale !== "persian" ? "ltr" : "rtl"}`}
            className={`col-start-1 md:col-start-3 col-span-10 md:col-span-6 text-center h-[50vh] flex flex-col justify-center items-center ${
              locale === "persian" ? "font-bodyFa" : "font-body"
            }`}
          >
            <h1
              className={`text-4xl mb-4 text-secondary-500 ${
                locale === "persian" ? "font-bodyFa font-bold" : "font-header"
              }`}
            >
              {text.press.title}
            </h1>
            <p className="text-xl text-projectGray-300">
              {text.press.content}
            </p>
          </section>
        </section>
      </Layout>
    </>
  );
};

export default PressPage;
