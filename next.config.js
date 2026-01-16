/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en-US", "persian"],
    defaultLocale: "en-US",
    // domains: [
    //   {
    //     domain: "en.localhost",
    //     defaultLocale: "en-US",
    //   },
    //   {
    //     domain: "persian.localhost",
    //     defaultLocale: "persian",
    //     http: true,
    //   },
    // ],
  },
  
};

module.exports = nextConfig;
