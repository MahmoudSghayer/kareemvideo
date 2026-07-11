import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./providers/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#08090C",
        panel: "#0A0B0F",
        card: "#0B0D11",
        input: "#0E1015",
        "input-hover": "#0F1218",
        ink: "#F2EFE8",
        body: "#B6BAC2",
        muted: "#9AA0AA",
        mono: "#8A8F98",
        faint: "#6B7079",
        orange: "#FF6A2C",
        "orange-light": "#FFB07A",
        teal: "#33CFD6",
        "teal-light": "#8FE8EC",
        success: "#4ADE80",
        paper: "#EFEAE0",
      },
      fontFamily: {
        anton: ["var(--font-anton)", "sans-serif"],
        archivo: ["var(--font-archivo)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      transitionTimingFunction: {
        cine: "cubic-bezier(.16,1,.3,1)",
      },
      borderRadius: {
        pill: "100px",
      },
    },
  },
  plugins: [],
};

export default config;
