/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: "#FFFFFF",
        signal: "#FFD60A",
        wash: "#FFF6CC",
        rule: "#D9D9D9",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        hard: "6px 6px 0 #000000",
        "hard-sm": "3px 3px 0 #000000",
      },
    },
  },
  plugins: [],
};
