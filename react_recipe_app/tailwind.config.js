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
        flamePea_h:"#A24030",
        dandelion:"#fcd059",
        desertStorm:"#ededea",
        pixieGreen:"#bfe1bf",
        pixieGreen_h:"#9DB99D",
        sushi:"#7ca92d",
        sushi_h:"#648824"
      }
    },
  },
  plugins: [],
}

