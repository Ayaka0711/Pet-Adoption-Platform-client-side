/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Design system for PromptHub — see design notes in README.
        paper: "#EEF1EC", // cool off-white background (not the generic warm-cream default)
        ink: {
          DEFAULT: "#443C68", // primary brand — deep muted violet
          light: "#6C5F9E",
          dark: "#2E2748",
        },
        charcoal: "#1B1D1B", // dark surfaces / primary text
        amber: "#E8A33D", // premium / highlight accent
        moss: "#4C7A5E", // success / copy-action accent
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        card: "6px",
      },
    },
  },
  plugins: [],
};
