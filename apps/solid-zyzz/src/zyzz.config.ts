import { defineConfig } from "zyzz";

export const { style, variants, vars } = defineConfig({
  output: "html",
  vars: {
    color: {
      bg: { light: "#fff7ed", dark: "#140c06" },
      surface: { light: "#ffffff", dark: "#1f1209" },
      surfaceElevated: { light: "#ffedd5", dark: "#2b190d" },
      surfaceHover: { light: "#fed7aa", dark: "#3b2313" },
      border: { light: "#fed7aa", dark: "#432818" },
      text: { light: "#431407", dark: "#fff7ed" },
      textMuted: { light: "#9a3412", dark: "#fdba74" },
      brand: { light: "#ea580c", dark: "#f97316" },
      brandHover: { light: "#c2410c", dark: "#fb923c" },
      brandSoft: { light: "#ffedd5", dark: "rgb(249 115 22 / 0.2)" },
      subtle: { light: "#78350f", dark: "#9a3412" },
      success: { light: "#059669", dark: "#10b981" },
      successSoft: { light: "#d1fae5", dark: "rgb(16 185 129 / 0.2)" },
      warning: { light: "#d97706", dark: "#f59e0b" },
      warningSoft: { light: "#fef3c7", dark: "rgb(245 158 11 / 0.2)" },
      danger: { light: "#dc2626", dark: "#ef4444" },
      dangerSoft: { light: "#fee2e2", dark: "rgb(239 68 68 / 0.2)" },
      white: "#ffffff",
      transparent: "transparent",
    },
    radius: {
      sm: "0.375rem",
      md: "0.75rem",
      lg: "1rem",
      full: "9999px",
    },
  },
});
