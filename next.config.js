/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en-US", "persian"],
    defaultLocale: "en-US",
    domains: [
      {
        domain: "en.localhost:3000",
        defaultLocale: "en",
      },
      {
        domain: "persian.localhost:3000",
        defaultLocale: "persian",
        http: true,
      },
    ],
  },
  env: {
    MAPBOX_TOKEN:
      "pk.eyJ1IjoiZm5lbCIsImEiOiJjazdzMHI4bTMwMnNvM2VwOHA2dDRyamsxIn0.nhgvCZm2cCUqJNzqLyRHzA",
  },
};

module.exports = nextConfig;
