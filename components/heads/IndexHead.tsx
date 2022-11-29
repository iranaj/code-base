import React from "react";
import Head from "next/head";
import MetaLinks from "./MetaLinks";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";

const IndexHead: React.FC = () => {
  const url = `https://iranaj.org/`;

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
      <meta
        property="og:description"
        content={text.general.headers.description}
      />
      <meta property="og:image" content={`${url}/logo_horizontal.svg`} />
      <meta property="og:url" content={url} />
      {/* additional facebook */}
      <meta property="og:image:alt" content={text.general.headers.content} />

      {/* twitter meta */}
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:site"
        content={text.general.social_media_usernames.twitter}
      />
      <meta name="twitter:title" content={`${text.general.name} home`} />
      <meta
        name="twitter:description"
        content={text.general.headers.description}
      />
      <meta name="twitter:image" content={`${url}/logo_horizontal.svg`} />
      <meta name="twitter:image:alt" content={`${text.general.name} home`} />

      {/* html */}
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={text.general.headers.description} />
      <title>
        {text.home.title} - {text.general.name}
      </title>
      <MetaLinks />
    </Head>
  );
};

export default IndexHead;
