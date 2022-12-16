/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      purple: {
        100: "#a667e4",
        200: "#853bce",
      },
      slate: {
        100: "#878593",
        200: "#33323E",
        300: "#211F2D",
        400: "#13111C",
      },
      red: {
        100: "#d85c5a",
        200: "#b62d2b",
      },
    },
    extend: {},
  },
  plugins: [],
};
