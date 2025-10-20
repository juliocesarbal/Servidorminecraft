import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        minecraft: {
          grass: "#7CBD56",
          dirt: "#8B6F47",
          stone: "#808080",
          bedrock: "#555555",
        },
      },
    },
  },
  plugins: [],
};
export default config;
