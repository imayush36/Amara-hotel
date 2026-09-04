/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        amara: {
          bg: "#FAF8F5",
          surface: "#F4EFEA",
          card: "#FFFFFF",
          cardHover: "#FCFAF7",
          border: "#E5DDD0",
          borderDark: "#C5B8A5",
          gold: "#B88E4B",
          goldLight: "#D4AF72",
          goldDark: "#8C6527",
          espresso: "#1C1714",
          charcoal: "#2D2622",
          muted: "#7A6E65",
          cream: "#FAF6F0",
          terracotta: "#9E472A",
          forest: "#26402E"
        }
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Playfair Display", "Georgia", "serif"],
        display: ["var(--font-cinzel)", "Playfair Display", "serif"],
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      boxShadow: {
        luxury: "0 10px 40px -10px rgba(30, 25, 20, 0.07)",
        luxuryHover: "0 20px 50px -12px rgba(30, 25, 20, 0.12)",
        goldGlow: "0 8px 30px rgba(184, 142, 75, 0.2)",
      }
    },
  },
  plugins: [],
};
