import twColors from "tailwindcss/colors";

const colors = {
  inherit: "inherit",
  current: "currentColor",
  transparent: "transparent",
  black: "#000",
  white: "#fff",
  primary: twColors.blue,
  secondary: twColors.emerald,
  success: twColors.green,
  danger: twColors.red,
  warning: twColors.orange,
  info: twColors.purple,
  gray: twColors.gray,
};

const borderRadius = {
  none: "0",
  sm: "0.125rem",
  DEFAULT: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  full: "9999px",
};

// https://vuetifyjs.com/en/styles/display/
const breakPoints = {
  sm: "600px",
  md: "960px",
  lg: "1280px",
  xl: "1920px",
  "2xl": "2560px",
};

/** @type {import('appconfig').AppConfig} */
export { borderRadius, breakPoints, colors };
