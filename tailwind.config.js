/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fdfaf4",
          100: "#faf4e6",
          200: "#f5e8cc",
          300: "#edd9aa",
          400: "#e2c47e",
          500: "#d4a853",
        },
        terra: {
          50: "#fdf4f0",
          100: "#fae4d8",
          200: "#f4c4a8",
          300: "#eb9d74",
          400: "#df7545",
          500: "#c85e2e",
          600: "#a84a22",
          700: "#8a3a1a",
          800: "#6e2d14",
          900: "#4a1e0d",
        },
        olive: {
          50: "#f4f6f0",
          100: "#e4eadb",
          200: "#c8d4b6",
          300: "#a5b889",
          400: "#829961",
          500: "#637a45",
          600: "#4d5f35",
          700: "#3a4828",
          800: "#28331c",
          900: "#1a2212",
        },
        warm: {
          50: "#fdf8f3",
          100: "#f9ede0",
          200: "#f2d9bc",
          300: "#e8be8e",
          400: "#d99d5e",
          500: "#c8803a",
          600: "#a8642c",
          700: "#854d21",
          800: "#623917",
          900: "#42250e",
        },
        charcoal: "#2c2416",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Nunito", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "fade-up-d1": "fadeUp 0.6s 0.1s ease forwards both",
        "fade-up-d2": "fadeUp 0.6s 0.2s ease forwards both",
        "fade-up-d3": "fadeUp 0.6s 0.3s ease forwards both",
        "fade-up-d4": "fadeUp 0.6s 0.4s ease forwards both",
        shimmer: "shimmer 1.8s infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      boxShadow: {
        "warm-sm": "0 2px 8px rgba(44, 36, 22, 0.08)",
        "warm-md": "0 4px 16px rgba(44, 36, 22, 0.12)",
        "warm-lg": "0 8px 32px rgba(44, 36, 22, 0.16)",
        "warm-xl": "0 16px 48px rgba(44, 36, 22, 0.20)",
        terra: "0 4px 16px rgba(200, 94, 46, 0.30)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
