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
    boxShadow: {
      'bm': '0 4px 4px 0 rgb(0 0 0 / 0.14)',
      'br': '3.48px 4.65px 4.65px 0 rgb(0 0 0 / 0.15)',

      'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      'none': '0 0 #0000',
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
