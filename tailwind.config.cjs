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
        800: "#211f2d",
        900: "#13111c",
      },
      gray: {
        100: "#878593",
      },
    },
    extend: {},
  },
  plugins: [],
};
