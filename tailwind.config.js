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
        color1: "#7a314f",
        color2: "#b0c7d5",
        color3: "#395e77",
        color4: "#eae6dd",
        color5: "#3c2d37",
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
        "gradient-primary": "linear-gradient(0deg, #b0c7d5 0%, #395e77 100%)",
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
