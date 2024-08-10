import { commonThemeSettings } from "./theme-common";

export const darkTheme = {
  primary: {
    main: "#90caf9",
    light: "#e3f2fd",
    dark: "#42a5f5",
    contrastText: "#000000",
  },
  secondary: {
    main: "#ce93d8",
    light: "#f3e5f5",
    dark: "#ab47bc",
    contrastText: "#000000",
  },
  error: {
    main: "#ef5350",
    light: "#ef9a9a",
    dark: "#d32f2f",
    contrastText: "#000000",
  },
  warning: {
    main: "#ffa726",
    light: "#ffcc80",
    dark: "#fb8c00",
    contrastText: "#000000",
  },
  info: {
    main: "#29b6f6",
    light: "#81d4fa",
    dark: "#0288d1",
    contrastText: "#000000",
  },
  success: {
    main: "#66bb6a",
    light: "#a5d6a7",
    dark: "#388e3c",
    contrastText: "#000000",
  },
  background: {
    default: "#121212",
    paper: "#1e1e1e",
  },
  text: {
    primary: "#ffffff",
    secondary: "#bbbbbb",
    disabled: "rgba(255, 255, 255, 0.5)",
    hint: "rgba(255, 255, 255, 0.5)",
  },
  divider: "rgba(255, 255, 255, 0.12)",
  ...commonThemeSettings,
};
