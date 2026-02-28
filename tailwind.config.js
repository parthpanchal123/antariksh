/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A14", // Deep Void
        primary: "#F0EFF4", // Ghost
        accent: "#7B61FF", // Plasma
        dark: "#18181B", // Graphite
      },
      fontFamily: {
        sans: ["Sora", "sans-serif"],
        drama: ["Instrument Serif", "serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
