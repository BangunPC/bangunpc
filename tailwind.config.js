/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
    colors: {
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      'button-hover': 'rgb(var(--color-button-hover) / <alpha-value>)',
      button: 'rgb(var(--color-button) / <alpha-value>)',

      ...colors,
    },
    screens: {
      'tablet': '810px',
      // => @media (min-width: 640px) { ... }

      'desktop': '1200px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
