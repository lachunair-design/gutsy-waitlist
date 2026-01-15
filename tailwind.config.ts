import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Gutsy Brand Colors
        gutsy: {
          cream: "#F3EEE4",
          red: "#F20028",
          yellow: "#FFB300",
          black: "#000000",
        },
        background: "#F3EEE4",
        foreground: "#000000",
        primary: {
          DEFAULT: "#F20028",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#FFB300",
          foreground: "#000000",
        },
      },
      fontFamily: {
        sans: ["Uto", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brutalist: "4px 4px 0px 0px rgba(0,0,0,1)",
        "brutalist-sm": "2px 2px 0px 0px rgba(0,0,0,1)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
