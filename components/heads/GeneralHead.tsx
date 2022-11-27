import Head from "next/head";
import MetaLinks from "./MetaLinks";

// create an interface for the props
interface Props {
  title: string;
  content: string;
  description: string;
  keywords: string;
  image: string;
  url: string;
}

// create a functional component
const GeneralHead: React.FC<Props> = ({
  title,
  content = "dio homepage. Here you will discover our latest news and updates.",
  description = "dio is a smart and secure pet business solution that offer edge technologies for any business who is seeking an ultimate solution. Our experience and expertise in the field of pet business will help you to achieve your goals and dreams. We will help you to find the right solution for your business. Join us and enjoy our competitive services.",
  image,
  url = `https://diosf.com/`,
}) => {
  return (
    <Head>
      <meta
        name="apple-itunes-app"
        // content={`app-id=${process.env.APP_STORE_ID}`}
      />
      {/* facebook meta */}
      <meta property="og:locale" content="en_us" />
      <meta property="og:type" content="summary" />
      <meta property="og:site_name" content="dio" />
      <meta property="og:title" content="dio home" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://diosf.com/dioLogo.svg" />
      <meta property="og:url" content={url} />
      {/* additional facebook */}
      <meta property="og:image:alt" content={content} />

      {/* twitter meta */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@diosoftware" />
      <meta name="twitter:title" content="dio home" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://diosf.com/dioLogo.svg" />
      <meta name="twitter:image:alt" content="dio on the App Store" />

      {/* html */}
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <title>{title}</title>
      <MetaLinks />
    </Head>
  );
};
