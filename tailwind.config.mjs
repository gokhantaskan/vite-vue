import plugin from "tailwindcss/plugin";

import { borderRadius, breakPoints as screens, colors } from "./appconfig.mjs";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  darkMode: "class",
  theme: {
    colors,
    borderRadius,
    screens,
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("light", `.light &`);
    }),
  ],
};
