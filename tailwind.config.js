/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1A9E3F',
          dark: '#16803A',
        },
        accent: {
          DEFAULT: '#22C55E',
        },
        sidebar: '#0F1923',
        'sidebar-border': '#1E2D3D',
      },
    },
  },
  plugins: [],
}
