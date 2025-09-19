/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#386641",
        color2: "#A2AF9B",
        color3: "#EEEEEE",
        color4: "#FAF9EE",
        color5: "#DCCFC0",
        color6: "#D6E9D5",
        color7: "#FEFEFD",
        color8: "#111111",
        color9: "#F5F4EC",
        color11: "#E0E0E0",
        color22: "#45556C",
        color33: "#0F172B",
        color44: "#020618",
        color55: "#FDFDFD",
        color66: "#303030",
        color77: "#CCCCCC",
        color88: "#EEEEEE",
        color99: "#62748E",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(0deg, #FAF9EE 0%, #A2AF9B 100%)",
        "gradient-secondary": "linear-gradient(0deg, #c7cec3 0%, #A2AF9B 100%)",
        "gradient-dark": "linear-gradient(0deg, #45556C 0%, #0F172B 100%)",
      },
      keyframes: {
        "border-spin": {
          "100%": { transform: "rotate(360deg)" },
        },
        "rotate-border": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "spin-slow": "spin 6s linear infinite",
        "border-spin": "border-spin 4s linear infinite",
        "rotate-border": "rotate-border 4s linear infinite", // Yeni animasyon
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
    require("tailwindcss-animated"),
  ],
};
