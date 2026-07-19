/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F8F3EA",
        sand: "#E9DCC7",
        terracotta: "#A0522D",
        saffron: "#D97A2B",
        gold: "#C8A951",
        olive: "#6D8B74",
        charcoal: "#2F2A26",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body: ["'Work Sans'", "sans-serif"],
        script: ["'Caveat'", "cursive"],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(47, 42, 38, 0.08)",
        card: "0 4px 16px rgba(160, 82, 45, 0.12)",
      },
      borderRadius: {
        clay: "1.25rem",
      },
      backgroundImage: {
        "paper-texture":
          "radial-gradient(circle at 20% 20%, rgba(200,169,81,0.06) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(160,82,45,0.05) 0%, transparent 45%)",
      },
    },
  },
  plugins: [],
};
