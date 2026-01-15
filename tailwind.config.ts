import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary Gutsy Provisions Palette
        gutsyCream: "#f3eee4",
        gutsyBlack: "#000000",
        gutsyRed: "#f20028",
        gutsyYellow: "#ffb300",
        
        // Secondary "Flavor" Palette (From Brand Assets)
        gutsyPlum: "#560033",
        gutsyOrange: "#ff5200",
        gutsyPurple: "#890eff",
        gutsyPink: "#ff7cff",
        gutsyGreen: "#00b453",
        gutsyBlue: "#004eff",

        // Graza-style Semantic Mapping
        background: "#f3eee4",
        foreground: "#000000",
        primary: {
          DEFAULT: "#000000", // Graza uses Black as the primary anchor
          foreground: "#f3eee4",
        },
        accent: {
          DEFAULT: "#f20028", // Red used for specific "pop" moments
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        // Pair Uto with a classic Serif for the editorial Graza vibe
        gutsy: ["Uto", "sans-serif"],
        sans: ["Uto", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"], 
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3.5rem",
        // Softened corners for a more "organic packaging" feel
        "provision": "1.25rem",
      },
      boxShadow: {
        // Swapping heavy shadows for crisp "Graza" style borders in UI
        'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
        'pill': '0 10px 20px -5px rgba(0, 0, 0, 0.1)',
      },
      letterSpacing: {
        // Required for those tight, high-end headings
        'tightest': '-0.06em',
        'widest-provisions': '0.3em',
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
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 40s linear infinite", // Slower, more "luxurious" speed
        "float-slow": "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;
