import { createThemeContract, createTheme, style, styleVariants } from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    brand: null,
    brandHover: null,
    surface: null,
    text: null,
    muted: null,
  },
  radius: {
    md: null,
    full: null,
  },
});

export const defaultTheme = createTheme(vars, {
  color: {
    brand: "#2563eb",
    brandHover: "#1d4ed8",
    surface: "#f8fafc",
    text: "#0f172a",
    muted: "#64748b",
  },
  radius: {
    md: "0.75rem",
    full: "9999px",
  },
});

export const card = style({
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.75rem",
  padding: "1.5rem 2rem",
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  borderRadius: vars.radius.md,
  border: "1px solid #e2e8f0",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.07)",
});

export const baseButton = style({
  fontSize: "1rem",
  fontWeight: 600,
  padding: "0.6rem 1.5rem",
  borderRadius: vars.radius.full,
  border: "none",
  cursor: "pointer",
  transition: "background-color 150ms ease, transform 100ms ease",
  selectors: {
    "&:active": {
      transform: "scale(0.97)",
    },
  },
});

export const buttonVariants = styleVariants({
  idle: [
    baseButton,
    {
      backgroundColor: vars.color.brand,
      color: "#ffffff",
      ":hover": {
        backgroundColor: vars.color.brandHover,
      },
    },
  ],
  active: [
    baseButton,
    {
      backgroundColor: "#059669",
      color: "#ffffff",
      ":hover": {
        backgroundColor: "#047857",
      },
    },
  ],
});

export const badge = style({
  fontSize: "0.75rem",
  fontWeight: 600,
  color: vars.color.muted,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});
