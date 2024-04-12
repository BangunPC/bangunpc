/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      boxShadow: {
        bm: '0 4px 4px 0 rgb(0 0 0 / 0.14)',
        br: '3.48px 4.65px 4.65px 0 rgb(0 0 0 / 0.15)',
      },
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        'button-hover': 'rgb(var(--color-button-hover) / <alpha-value>)',
        button: 'rgb(var(--color-button) / <alpha-value>)',
      },
      screens: {
        tablet: '810px',
        // => @media (min-width: 640px) { ... }

        desktop: '1200px',
        // => @media (min-width: 1280px) { ... }
      },
      spacing: {
        'navbar-min-h': '64px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
