import Head from "next/head";
import MetaLinks from "./MetaLinks";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";

// create an interface for the props
interface Props {
  title: string;
  content: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

// create a functional component
const GeneralHead: React.FC<Props> = ({
  title,
  content,
  description,
  image,
  url = `https://iranaj.org/`,
}) => {
  const router: NextRouter = useRouter();
  const { locale } = router;

  const text = locale !== "persian" ? en : persian;
  return (
    <Head>
      <meta
        name="apple-itunes-app"
        // content={`app-id=${process.env.APP_STORE_ID}`}
      />
      {/* facebook meta */}
      <meta property="og:locale" content="en_us" />
      <meta property="og:type" content="summary" />
      <meta property="og:site_name" content={text.general.name} />
      <meta property="og:title" content={`${text.general.name} home`} />
      <meta property="og:description" content={description} />
      <meta name="twitter:image" content={`${url}/logo_horizontal.svg`} />
      <meta property="og:url" content={url} />
      {/* additional facebook */}
      <meta property="og:image:alt" content={content} />

      {/* twitter meta */}
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:site"
        content={text.general.social_media_usernames.twitter}
      />
      <meta name="twitter:title" content={`${text.general.name} home`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}/logo_horizontal.svg`} />
      <meta name="twitter:image:alt" content={`${text.general.name} home`} />

      {/* html */}
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <title>{title}</title>
      <MetaLinks />
    </Head>
  );
};

export default GeneralHead;
