type Colors = { [key: string]: Colors | string } | string;

declare module "appconfig" {
  const colors = {
    transparent: "transparent",
    current: "currentColor",
    black: "#000",
    white: "#fff",
    primary: Colors,
    secondary: Colors,
    success: Colors,
    danger: Colors,
    warning: Colors,
    info: Colors,
    gray: Colors,
  };

  const borderRadius: {
    none: string;
    sm: string;
    DEFAULT: string;
    md: string;
    lg: string;
    full: string;
  };

  const breakPoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
  };

  export { borderRadius, breakPoints, colors };
}
