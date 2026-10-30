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
    bg: "#f7f9fa",
    surface: "#ffffff",
    surfaceElevated: "#f1f4f6",
    surfaceHover: "#f4f7f9",
    surfaceSelected: "#edf6f8",
    border: "#e6e8eb",
    rule: "#eff1f3",
    control: "#cfd4d9",
    text: "#131416",
    textMuted: "#585c60",
    textSubtle: "#63686e",
    brand: "#1b6c80",
    brandHover: "#145363",
    brandSoft: "#e3f2f6",
    brandInk: "#0e4350",
    primary: "#131416",
    primaryInk: "#ffffff",
    success: "#1e7b4f",
    successSoft: "#dcfae5",
    successInk: "#04250e",
    warning: "#92400e",
    warningSoft: "#fffbeb",
    warningInk: "#92400e",
    danger: "#c4242a",
    dangerSoft: "#ffedea",
    dangerInk: "#831c1e",
  },
  space: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
  font: {
    sans: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  radius: {
    sm: "6px",
    md: "8px",
    full: "9999px",
  },
  chevron: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%23585c60' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
});

export const darkTheme = createTheme(vars, {
  color: {
    bg: "#0a0b0d",
    surface: "#121417",
    surfaceElevated: "#1a1d21",
    surfaceHover: "#171a1e",
    surfaceSelected: "#132227",
    border: "#26292e",
    rule: "#1c1f24",
    control: "#3e434a",
    text: "#f4f6f8",
    textMuted: "#a8aeb5",
    textSubtle: "#9097a0",
    brand: "#3ca1b8",
    brandHover: "#52b4ca",
    brandSoft: "#152b32",
    brandInk: "#7fd6ea",
    primary: "#f4f6f8",
    primaryInk: "#0a0b0d",
    success: "#3fc07a",
    successSoft: "#172a1d",
    successInk: "#3fc07a",
    warning: "#e5a93b",
    warningSoft: "#2b2414",
    warningInk: "#e5a93b",
    danger: "#e5566f",
    dangerSoft: "#2c1a20",
    dangerInk: "#e5566f",
  },
  space: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
  font: {
    sans: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  radius: {
    sm: "6px",
    md: "8px",
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
  fontFamily: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontSize: "14px",
  lineHeight: "20px",
});

globalStyle("h1, h2, h3, h4, p, ul, ol, dl, dt, dd", {
  margin: 0,
});

globalStyle("button, input, select, textarea", {
  font: "inherit",
  color: "inherit",
});
