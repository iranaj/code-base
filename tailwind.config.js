/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ["var(--font-playFairDisplay)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        bodyFa: ["var(--font-vazirmatn)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
        sans: "Lato,Arial,sans-serif",
        sub: "Inconsolata,monospace",
        subx: "Courier New,monospace",
      },
      fontSize: {
        xxs: ".625rem",
      },
      colors: {
        primary: {
          100: "#f4b7ce",
          200: "#ec87ad",
          300: "#e4578c",
          400: "#e13f7b",
          500: "#0B1D44",
          600: "#980b3f",
          700: "#6d082d",
          800: "#41051b",
          900: "#160209",
        },
        secondary: {
          100: "#a32e75",
          200: "#b85d94",
          300: "#cc8bb3",
          400: "#e0b9d1",
          500: "#D2AA6D",
          600: "#1f0514",
          700: "#3d0929",
          800: "#5c0e3d",
          900: "#7a1252",
        },
        projectGray: {
          100: "#FEFEFE",
          200: "#F2F2F2",
          300: "#C0C0C0",
          400: "#6B7280",
          500: "#374151",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require("@tailwindcss/forms")],
};
