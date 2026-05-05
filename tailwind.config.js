/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#19a051',
          dark: '#177e42',
        },
        accent: {
          DEFAULT: '#2dd673',
        },
        sidebar: '#062d18',
        'sidebar-border': '#0A3D21',
      },
    },
  },
  plugins: [],
}
