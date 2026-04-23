import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Color Palette ──────────────────────────────────────────
      colors: {
        brand: {
          50:  "#f0f4ff",
          100: "#e0eaff",
          200: "#c7d7fe",
          300: "#a5b8fc",
          400: "#818cf8",
          500: "#6366f1",   // Primary
          600: "#4f46e5",   // Primary Dark
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        accent: {
          50:  "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",   // Accent
          600: "#ea580c",   // Accent Dark
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        neutral: {
          50:  "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        success: { DEFAULT: "#22c55e", light: "#bbf7d0", dark: "#15803d" },
        warning: { DEFAULT: "#f59e0b", light: "#fef3c7", dark: "#b45309" },
        error:   { DEFAULT: "#ef4444", light: "#fee2e2", dark: "#b91c1c" },
      },

      // ─── Typography Scales ───────────────────────────────────────
      fontSize: {
        "2xs": ["0.625rem",  { lineHeight: "1rem"  }],
        xs:    ["0.75rem",   { lineHeight: "1.125rem" }],
        sm:    ["0.875rem",  { lineHeight: "1.375rem" }],
        base:  ["1rem",      { lineHeight: "1.625rem" }],
        lg:    ["1.125rem",  { lineHeight: "1.75rem" }],
        xl:    ["1.25rem",   { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem",    { lineHeight: "2rem"   }],
        "3xl": ["1.875rem",  { lineHeight: "2.375rem" }],
        "4xl": ["2.25rem",   { lineHeight: "2.75rem" }],
        "5xl": ["3rem",      { lineHeight: "3.5rem" }],
        "6xl": ["3.75rem",   { lineHeight: "4.25rem" }],
        "7xl": ["4.5rem",    { lineHeight: "5rem"   }],
        "8xl": ["6rem",      { lineHeight: "6.5rem" }],
        "9xl": ["8rem",      { lineHeight: "8.5rem" }],
      },

      // ─── Spacing System ──────────────────────────────────────────
      spacing: {
        "4.5":  "1.125rem",
        "13":   "3.25rem",
        "15":   "3.75rem",
        "17":   "4.25rem",
        "18":   "4.5rem",
        "22":   "5.5rem",
        "26":   "6.5rem",
        "30":   "7.5rem",
        "112":  "28rem",
        "120":  "30rem",
        "128":  "32rem",
        "144":  "36rem",
      },

      // ─── Custom Shadows ──────────────────────────────────────────
      boxShadow: {
        "card-sm": "0 1px 3px 0 rgba(0,0,0,.07), 0 1px 2px -1px rgba(0,0,0,.07)",
        "card":    "0 4px 6px -1px rgba(0,0,0,.08), 0 2px 4px -2px rgba(0,0,0,.08)",
        "card-lg": "0 10px 15px -3px rgba(0,0,0,.08), 0 4px 6px -4px rgba(0,0,0,.08)",
        "brand":   "0 4px 14px 0 rgba(99,102,241,.4)",
        "brand-lg":"0 8px 24px 0 rgba(99,102,241,.35)",
        "glow":    "0 0 20px rgba(99,102,241,.3)",
      },

      // ─── Border Radius ───────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // ─── Transitions ─────────────────────────────────────────────
      transitionTimingFunction: {
        "bounce-in":  "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "smooth-out": "cubic-bezier(0.23, 1, 0.32, 1)",
      },

      // ─── Animation ───────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
      },
      animation: {
        "fade-up":    "fade-up 0.5s ease-out both",
        "fade-in":    "fade-in 0.4s ease-out both",
        "shimmer":    "shimmer 2s infinite linear",
      },

      // ─── Container ───────────────────────────────────────────────
      maxWidth: {
        "8xl":  "88rem",
        "9xl":  "96rem",
        "prose-lg": "72ch",
      },
    },
  },
  plugins: [],
};

export default config;
