import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        youtube: "#ff0033",
        ytblue: "#2f80ed",
        ink: "#0f0f0f"
      },
      boxShadow: {
        youtube: "0 12px 32px rgba(15, 15, 15, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
