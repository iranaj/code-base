import Layout from "components/templates/Layout";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";
import GeneralHead from "components/heads/GeneralHead";

type Props = {};

export default function SuccessPage({}: Props) {
  const router: NextRouter = useRouter();
  const { locale } = router;
  const text = locale !== "persian" ? en : persian;
  return (
    <>
      <GeneralHead
        title={text.about.title}
        content={text.general.headers.content}
        description={text.general.headers.description}
      />
      <Layout>
        <section className="relative w-full h-96 max-w-6xl xxl:max-w-7xl mx-auto grid grid-cols-10 gap-y-3 pb-32 text-gray-600">
          <h1 className="col-span-10 mt-4 indent-3 md:indent-5 text-2xl">
            {text.membership.success.title}
          </h1>
          <p className="col-span-10 mt-4 indent-3 md:indent-5 ">
            {text.membership.success.p1}
          </p>
        </section>
      </Layout>
    </>
  );
}
