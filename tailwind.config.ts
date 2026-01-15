import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Gutsy Brand Palette
        gutsyCream: "#f3eee4",
        gutsyBlack: "#000000",
        gutsyRed: "#f20028",
        gutsyYellow: "#ffb300",
        
        // Semantic Aliases for high-conversion UI
        background: "#f3eee4",
        foreground: "#000000",
        primary: {
          DEFAULT: "#f20028",
          foreground: "#f3eee4",
        },
        accent: {
          DEFAULT: "#ffb300",
          foreground: "#000000",
        },
      },
      fontFamily: {
        // Registering Uto as the primary brand font
        gutsy: ["Uto", "sans-serif"],
        sans: ["Uto", "system-ui", "sans-serif"],
      },
      borderRadius: {
        // Adding fluid, rounded corners to match the Unwell/SPYLT vibe
        "4xl": "2rem",
        "5xl": "3.5rem",
      },
      boxShadow: {
        // Refined soft shadows for premium depth
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
        'pill': '0 10px 30px -5px rgba(242, 0, 40, 0.15)',
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
        // Bouncy animation for CTA buttons
        bounceLittle: {
          "0%, 100%": { transform: "translateY(-2%)" },
          "50%": { transform: "translateY(0)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 25s linear infinite",
        "bounce-slow": "bounceLittle 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
