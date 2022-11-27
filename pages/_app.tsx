import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import localFont from "@next/font/local";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const vazirmatn = localFont({
  variable: "--font-vazirmatn",
  src: [
    {
      path: "../fonts/Vazirmatn-RD-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/Vazirmatn-RD-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Vazirmatn-RD-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${roboto.variable} ${vazirmatn.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
