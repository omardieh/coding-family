import { commonThemeSettings } from "./theme-common";

export const lightTheme = {
  primary: {
    main: "#1976d2",
    light: "#63a4ff",
    dark: "#004ba0",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#9c27b0",
    light: "#d05ce3",
    dark: "#6a0080",
    contrastText: "#ffffff",
  },
  error: {
    main: "#d32f2f",
    light: "#ff6659",
    dark: "#9a0007",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#ffa000",
    light: "#ffc046",
    dark: "#c67100",
    contrastText: "#000000",
  },
  info: {
    main: "#0288d1",
    light: "#5eb8ff",
    dark: "#005b9f",
    contrastText: "#ffffff",
  },
  success: {
    main: "#388e3c",
    light: "#66bb6a",
    dark: "#00600f",
    contrastText: "#ffffff",
  },
  background: {
    default: "#f5f5f5",
    paper: "#ffffff",
  },
  text: {
    primary: "#000000",
    secondary: "#666666",
    disabled: "rgba(0, 0, 0, 0.38)",
    hint: "rgba(0, 0, 0, 0.38)",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  ...commonThemeSettings,
};
