import { heroui } from "@heroui/react"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/.pnpm/@heroui+theme@*/node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      darkMode: 'class',
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
        kalam: ["Kalam", "cursive"],
        allura: ["Allura", "cursive"],
        lato: ['Lato', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
        lobster: ['Lobster', 'cursive'],
        kaushan: ['"Kaushan Script"', 'cursive'],
      },

      screens: {
        xs: "350px",
      },
      height: {
        96: "40rem",
        "3/4": "60%",
        alto: "48rem",
      },
      maxHeight: {
        medio: "26rem",
        alto: "37rem",
      },
      fontSize: {
        mini: "12px",
        lg: "15px",
      },
      width: {
        ancho: "80rem",
        md: "50rem",
        px: "48px",
      },
      inset: {
        "menos-1": "-1rem",
      },
      colors: {
        primero: "#F09441",
        segundo: "#4E1333",
        tercero: "#FAD6C6",
        cuarto: "#9F4F42",
        customOrange1: 'rgba(240,148,65,1)',
        customOrange2: 'rgba(245,184,138,1)',
        customOrange3: 'rgba(250,214,198,1)',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
