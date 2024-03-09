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
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      
      'tablet': '810px',
      // => @media (min-width: 640px) { ... }

      'desktop': '1200px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
