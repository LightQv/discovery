/** @type {import('tailwindcss').Config} */
const scrollbar = require("tailwind-scrollbar-hide");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [scrollbar],
};
