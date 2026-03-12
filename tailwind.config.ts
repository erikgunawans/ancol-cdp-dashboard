import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy tokens (kept for backward compat)
        crimson: "#C41E3A",
        "interactive-blue": "#0076CC",
        // Ancol dark palette
        ancol: {
          deepest:  "#060D1A",
          surface:  "#0C1830",
          elevated: "#112040",
          border:   "#1E3A5F",
          blue:     "#0076CC",
          glow:     "#38B6FF",
          crimson:  "#C41E3A",
          teal:     "#14B8A6",
          gold:     "#F59E0B",
          "text-primary":   "#F0F6FF",
          "text-secondary": "#8BA3C1",
          "text-muted":     "#4D6B8A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      backdropBlur: {
        xl: "24px",
      },
      animation: {
        "fade-up":    "fadeUp 0.6s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "mesh-drift": "meshDrift 12s ease infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        meshDrift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px 0px rgba(0,118,204,0.4)" },
          "50%":      { boxShadow: "0 0 40px 4px rgba(56,182,255,0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
