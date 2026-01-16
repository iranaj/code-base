import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Roboto, Playfair_Display, Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playFairDisplay = Playfair_Display({
  weight: ["500", "400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playFairDisplay",
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

export const metadata: Metadata = {
  title: "Iranian Jurists",
  description: "Promoting justice and legal excellence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${roboto.variable} ${inter.variable} ${vazirmatn.variable} ${playFairDisplay.variable} font-sans antialiased`}
          suppressHydrationWarning
        >
          {children}
          <Analytics />
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              duration: 5000,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
