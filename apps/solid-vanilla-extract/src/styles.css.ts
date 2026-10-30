import {
  createTheme,
  createThemeContract,
  globalStyle,
  keyframes,
  style,
  styleVariants,
} from "@vanilla-extract/css";

export const vars = createThemeContract({
  color: {
    bg: null,
    surface: null,
    surfaceElevated: null,
    surfaceHover: null,
    border: null,
    text: null,
    textMuted: null,
    brand: null,
    brandHover: null,
    brandSoft: null,
    success: null,
    successSoft: null,
    warning: null,
    warningSoft: null,
    danger: null,
    dangerSoft: null,
  },
  shadow: {
    card: null,
  },
  radius: {
    sm: null,
    md: null,
    lg: null,
    full: null,
  },
});

export const lightTheme = createTheme(vars, {
  color: {
    bg: "#f1f5f9",
    surface: "#ffffff",
    surfaceElevated: "#f8fafc",
    surfaceHover: "#f1f5f9",
    border: "#e2e8f0",
    text: "#0f172a",
    textMuted: "#64748b",
    brand: "#2563eb",
    brandHover: "#1d4ed8",
    brandSoft: "#dbeafe",
    success: "#059669",
    successSoft: "#d1fae5",
    warning: "#d97706",
    warningSoft: "#fef3c7",
    danger: "#dc2626",
    dangerSoft: "#fee2e2",
  },
  shadow: {
    card: "0 4px 12px -2px rgb(15 23 42 / 0.06)",
  },
  radius: {
    sm: "0.375rem",
    md: "0.75rem",
    lg: "1rem",
    full: "9999px",
  },
});

export const darkTheme = createTheme(vars, {
  color: {
    bg: "#090d16",
    surface: "#111827",
    surfaceElevated: "#1e293b",
    surfaceHover: "#334155",
    border: "#1f2937",
    text: "#f8fafc",
    textMuted: "#94a3b8",
    brand: "#3b82f6",
    brandHover: "#60a5fa",
    brandSoft: "rgb(59 130 246 / 0.18)",
    success: "#10b981",
    successSoft: "rgb(16 185 129 / 0.18)",
    warning: "#f59e0b",
    warningSoft: "rgb(245 158 11 / 0.18)",
    danger: "#ef4444",
    dangerSoft: "rgb(239 68 68 / 0.18)",
  },
  shadow: {
    card: "0 8px 20px -4px rgb(0 0 0 / 0.45)",
  },
  radius: {
    sm: "0.375rem",
    md: "0.75rem",
    lg: "1rem",
    full: "9999px",
  },
});

globalStyle("*, *::before, *::after", {
  boxSizing: "border-box",
});

globalStyle("body", {
  margin: 0,
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
});

const pulse = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.45 },
});

export const pageShell = style({
  minHeight: "100vh",
  backgroundColor: vars.color.bg,
  color: vars.color.text,
  transition: "background-color 200ms ease, color 200ms ease",
  padding: "2rem 1.5rem 4rem",
});

export const container = style({
  maxWidth: "1080px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "1.75rem",
});

export const headerBar = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",
  padding: "1.25rem 1.5rem",
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.card,
});

export const brandGroup = style({
  display: "flex",
  alignItems: "center",
  gap: "0.875rem",
});

export const liveDot = style({
  width: "0.625rem",
  height: "0.625rem",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.brand,
  animation: `${pulse} 2s infinite ease-in-out`,
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.2rem",
});

export const appTitle = style({
  margin: 0,
  fontSize: "1.25rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
});

export const appSubtitle = style({
  margin: 0,
  fontSize: "0.85rem",
  color: vars.color.textMuted,
});

export const headerActions = style({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
});

export const statsGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "1rem",
});

export const statCard = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: "1.25rem",
  boxShadow: vars.shadow.card,
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

export const statLabel = style({
  fontSize: "0.8rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: vars.color.textMuted,
});

export const statValueRow = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "0.5rem",
});

export const statValue = style({
  fontSize: "1.85rem",
  fontWeight: 800,
  letterSpacing: "-0.03em",
});

export const progressTrack = style({
  width: "100%",
  height: "0.5rem",
  backgroundColor: vars.color.surfaceElevated,
  borderRadius: vars.radius.full,
  overflow: "hidden",
});

export const progressFill = style({
  height: "100%",
  backgroundColor: vars.color.brand,
  borderRadius: vars.radius.full,
  transition: "width 250ms ease",
});

export const mainGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "1.5rem",
  alignItems: "start",
});

export const panel = style({
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  padding: "1.5rem",
  boxShadow: vars.shadow.card,
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
});

export const panelHeader = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem",
});

export const panelTitle = style({
  margin: 0,
  fontSize: "1.05rem",
  fontWeight: 700,
});

export const filterGroup = style({
  display: "inline-flex",
  padding: "0.25rem",
  backgroundColor: vars.color.surfaceElevated,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  gap: "0.25rem",
});

const filterTabBase = style({
  border: "none",
  borderRadius: vars.radius.sm,
  padding: "0.35rem 0.75rem",
  fontSize: "0.8rem",
  fontWeight: 600,
  cursor: "pointer",
  transition: "background-color 150ms ease, color 150ms ease",
});

export const filterTab = styleVariants({
  inactive: [
    filterTabBase,
    {
      backgroundColor: "transparent",
      color: vars.color.textMuted,
      ":hover": {
        color: vars.color.text,
      },
    },
  ],
  active: [
    filterTabBase,
    {
      backgroundColor: vars.color.brand,
      color: "#ffffff",
    },
  ],
});

export const formRow = style({
  display: "flex",
  gap: "0.5rem",
  flexWrap: "wrap",
});

export const textInput = style({
  flex: 1,
  minWidth: "160px",
  padding: "0.55rem 0.85rem",
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surfaceElevated,
  color: vars.color.text,
  fontSize: "0.9rem",
  outline: "none",
  selectors: {
    "&:focus": {
      borderColor: vars.color.brand,
    },
  },
});

export const selectInput = style({
  padding: "0.55rem 0.75rem",
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surfaceElevated,
  color: vars.color.text,
  fontSize: "0.85rem",
  fontWeight: 600,
});

export const taskList = style({
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.625rem",
});

const taskRowBase = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem",
  padding: "0.75rem 1rem",
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.surfaceElevated,
  transition: "background-color 150ms ease, opacity 150ms ease",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.surfaceHover,
    },
  },
});

export const taskRow = styleVariants({
  todo: [taskRowBase],
  done: [
    taskRowBase,
    {
      opacity: 0.65,
    },
  ],
});

export const taskLabelGroup = style({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  cursor: "pointer",
  flex: 1,
});

export const taskTitle = styleVariants({
  todo: {
    fontSize: "0.925rem",
    fontWeight: 500,
  },
  done: {
    fontSize: "0.925rem",
    fontWeight: 500,
    textDecoration: "line-through",
    color: vars.color.textMuted,
  },
});

const pillBase = style({
  display: "inline-flex",
  alignItems: "center",
  padding: "0.2rem 0.6rem",
  borderRadius: vars.radius.full,
  fontSize: "0.72rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
});

export const priorityBadge = styleVariants({
  low: [
    pillBase,
    {
      backgroundColor: vars.color.successSoft,
      color: vars.color.success,
    },
  ],
  medium: [
    pillBase,
    {
      backgroundColor: vars.color.warningSoft,
      color: vars.color.warning,
    },
  ],
  high: [
    pillBase,
    {
      backgroundColor: vars.color.dangerSoft,
      color: vars.color.danger,
    },
  ],
  brand: [
    pillBase,
    {
      backgroundColor: vars.color.brandSoft,
      color: vars.color.brand,
    },
  ],
});

const buttonBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.4rem",
  fontWeight: 600,
  borderRadius: vars.radius.sm,
  border: "1px solid transparent",
  cursor: "pointer",
  transition: "background-color 150ms ease, transform 100ms ease, border-color 150ms ease",
  selectors: {
    "&:active": {
      transform: "scale(0.97)",
    },
  },
});

export const buttonTone = styleVariants({
  primary: [
    buttonBase,
    {
      backgroundColor: vars.color.brand,
      color: "#ffffff",
      ":hover": {
        backgroundColor: vars.color.brandHover,
      },
    },
  ],
  neutral: [
    buttonBase,
    {
      backgroundColor: vars.color.surfaceElevated,
      color: vars.color.text,
      borderColor: vars.color.border,
      ":hover": {
        backgroundColor: vars.color.surfaceHover,
      },
    },
  ],
  success: [
    buttonBase,
    {
      backgroundColor: vars.color.success,
      color: "#ffffff",
    },
  ],
  danger: [
    buttonBase,
    {
      backgroundColor: vars.color.dangerSoft,
      color: vars.color.danger,
    },
  ],
});

export const buttonSize = styleVariants({
  sm: {
    fontSize: "0.8rem",
    padding: "0.4rem 0.75rem",
  },
  md: {
    fontSize: "0.9rem",
    padding: "0.55rem 1.1rem",
  },
  lg: {
    fontSize: "1rem",
    padding: "0.75rem 1.4rem",
  },
});

export const controlGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  padding: "1rem",
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.surfaceElevated,
  border: `1px solid ${vars.color.border}`,
});

export const previewStage = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  padding: "1.5rem",
  borderRadius: vars.radius.md,
  border: `1px dashed ${vars.color.border}`,
});
