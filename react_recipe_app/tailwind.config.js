/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        ghostWhite: "#f8f8ff",
        yellow100:"#fef9c3",
        amber300:"#fcd34d",
        flamePea:"#de5842",
        dandelion:"#fcd059",
        desertStorm:"#ededea",
        pixieGreen:"#bfe1bf",
        pixieGreen_h:"#9DB99D"
      }
    },
  },
  plugins: [],
}

