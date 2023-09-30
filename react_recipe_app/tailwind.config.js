/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        ghostWhite: "#f8f8ff",
        yellow100:"#fef9c3"
      }
    },
  },
  plugins: [],
}

