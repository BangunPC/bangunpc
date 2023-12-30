/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        'main-color': '#4c5986',
        'dark-color': '#3B4464'
      }
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
