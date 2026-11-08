/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        stone: {
          50: "#faf9f7",
          100: "#f5f3f0",
          200: "#e8e4df",
          300: "#d6d0c8",
          400: "#b8b0a4",
          500: "#9a9082",
          600: "#7d7368",
          700: "#5f574f",
          800: "#403a35",
          900: "#2a2622",
          950: "#1a1714",
        },
        sage: {
          50: "#f3f6f2",
          100: "#e3eae0",
          200: "#c7d5c1",
          300: "#a3bb9a",
          400: "#7d9a72",
          500: "#5e7d52",
          600: "#486340",
          700: "#3a5035",
          800: "#30402c",
          900: "#273524",
        },
        slate: {
          550: "#475569",
        },
      },
      fontFamily: {
        serif: ['"Source Serif 4"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      fontSize: {
        body: ["1rem", { lineHeight: "1.6" }],
        heading: ["1.875rem", { lineHeight: "1.2" }],
      },
      maxWidth: {
        prose: "68ch",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
      },
    },
  },
  plugins: [],
};
