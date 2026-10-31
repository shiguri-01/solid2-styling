import {
  createContainer,
  createTheme,
  createThemeContract,
  globalStyle,
} from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    bg: null,
    surface: null,
    surfaceElevated: null,
    surfaceHover: null,
    surfaceSelected: null,
    border: null,
    rule: null,
    control: null,
    controlSurface: null,
    text: null,
    textMuted: null,
    textSubtle: null,
    brand: null,
    brandHover: null,
    brandSoft: null,
    brandInk: null,
    primary: null,
    primaryInk: null,
    success: null,
    successSoft: null,
    successInk: null,
    warning: null,
    warningSoft: null,
    warningInk: null,
    danger: null,
    dangerSoft: null,
    dangerInk: null,
  },
  space: {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
  },
  font: {
    sans: null,
  },
  radius: {
    sm: null,
    md: null,
    full: null,
  },
  chevron: null,
});

export const lightTheme = createTheme(vars, {
  color: {
    bg: "#f4f6f3",
    surface: "#ffffff",
    surfaceElevated: "#eaf0eb",
    surfaceHover: "#eaf0eb",
    surfaceSelected: "#e0eee7",
    border: "#dbe1dc",
    rule: "#dbe1dc",
    control: "#dbe1dc",
    controlSurface: "#ffffff",
    text: "#202521",
    textMuted: "#59645d",
    textSubtle: "#59645d",
    brand: "#147d68",
    brandHover: "#116451",
    brandSoft: "#e0eee7",
    brandInk: "#147d68",
    primary: "#202521",
    primaryInk: "#ffffff",
    success: "#376d3b",
    successSoft: "#e0f1df",
    successInk: "#376d3b",
    warning: "#80591c",
    warningSoft: "#f6eddc",
    warningInk: "#80591c",
    danger: "#a73c35",
    dangerSoft: "#f8e7e5",
    dangerInk: "#a73c35",
  },
  space: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
  font: {
    sans: "system-ui, sans-serif",
  },
  radius: {
    sm: "4px",
    md: "6px",
    full: "9999px",
  },
  chevron: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%23585c60' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
});

export const darkTheme = createTheme(vars, {
  color: {
    bg: "#171b19",
    surface: "#202623",
    surfaceElevated: "#303a33",
    surfaceHover: "#303a33",
    surfaceSelected: "#293f35",
    border: "#404b43",
    rule: "#404b43",
    control: "#404b43",
    controlSurface: "#1b211e",
    text: "#eff3f0",
    textMuted: "#b4beb7",
    textSubtle: "#b4beb7",
    brand: "#76d8bb",
    brandHover: "#8ce4c9",
    brandSoft: "#293f35",
    brandInk: "#76d8bb",
    primary: "#eff3f0",
    primaryInk: "#202623",
    success: "#a4d3a7",
    successSoft: "#293c2c",
    successInk: "#a4d3a7",
    warning: "#efc67a",
    warningSoft: "#423721",
    warningInk: "#efc67a",
    danger: "#f2a49d",
    dangerSoft: "#482b29",
    dangerInk: "#f2a49d",
  },
  space: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
  font: {
    sans: "system-ui, sans-serif",
  },
  radius: {
    sm: "4px",
    md: "6px",
    full: "9999px",
  },
  chevron: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%23a8aeb5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
});

export const boardContainer = createContainer();

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("html, body", {
  margin: 0,
  padding: 0,
  WebkitTextSizeAdjust: "100%",
  WebkitFontSmoothing: "antialiased",
});

globalStyle("body", {
  fontFamily: "system-ui, sans-serif",
  fontSize: "14px",
  lineHeight: "21px",
});

globalStyle("h1, h2, h3, h4, p, ul, ol, dl, dt, dd", {
  margin: 0,
});

globalStyle("button, input, select, textarea", {
  font: "inherit",
  color: "inherit",
});
