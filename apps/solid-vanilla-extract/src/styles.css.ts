import { style, styleVariants } from "@vanilla-extract/css";
import { boardContainer, vars } from "./theme.css";

// ---------------------------------------------------------------------------
// App Shell & Layout Containers
// ---------------------------------------------------------------------------

export const pageShell = style({
  minHeight: "100svh",
  backgroundColor: vars.color.bg,
  color: vars.color.text,
  fontFamily: vars.font.sans,
  transition: "background-color 180ms ease, color 180ms ease",
  padding: `${vars.space.xl} ${vars.space.xl} 56px`,
  "@media": {
    "(max-width: 640px)": {
      padding: `${vars.space.lg} ${vars.space.lg} 40px`,
    },
  },
});

export const container = style({
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xl,
});

export const workspaceGrid = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 7fr) minmax(320px, 5fr)",
  gap: "24px",
  alignItems: "stretch",
  "@media": {
    "(max-width: 960px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
});

export const panel = style({
  containerName: boardContainer,
  containerType: "inline-size",
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: "22px 24px",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  "@media": {
    "(max-width: 600px)": {
      padding: "16px",
      gap: "14px",
    },
  },
});

export const panelTitle = style({
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: 1.3,
});

// ---------------------------------------------------------------------------
// Shared Typography & Primitives (Avatars, Pills, Buttons, Task Title)
// ---------------------------------------------------------------------------

export const breadcrumbRow = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "12px",
  color: vars.color.textMuted,
});

export const issueKey = style({
  fontSize: "12px",
  fontWeight: 500,
  color: vars.color.textMuted,
  fontVariantNumeric: "tabular-nums",
  flexShrink: 0,
});

export const emptyState = style({
  padding: "28px 0",
  textAlign: "center",
  fontSize: "13px",
  color: vars.color.textMuted,
});

const taskTitleBase = style({
  fontSize: "13px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const taskTitle = styleVariants({
  todo: [
    taskTitleBase,
    {
      fontWeight: 500,
      color: vars.color.text,
    },
  ],
  done: [
    taskTitleBase,
    {
      fontWeight: 400,
      textDecoration: "line-through",
      color: vars.color.textMuted,
    },
  ],
});

const avatarBase = style({
  width: "26px",
  height: "26px",
  borderRadius: vars.radius.full,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "11px",
  fontWeight: 600,
  border: `2px solid ${vars.color.bg}`,
  marginLeft: "-6px",
  flexShrink: 0,
  userSelect: "none",
  fontVariantNumeric: "tabular-nums",
});

export const avatarTone = styleVariants({
  teal: [
    avatarBase,
    {
      backgroundColor: vars.color.brandSoft,
      color: vars.color.brandInk,
    },
  ],
  emerald: [
    avatarBase,
    {
      backgroundColor: vars.color.successSoft,
      color: vars.color.successInk,
    },
  ],
  amber: [
    avatarBase,
    {
      backgroundColor: vars.color.warningSoft,
      color: vars.color.warningInk,
    },
  ],
  rose: [
    avatarBase,
    {
      backgroundColor: vars.color.dangerSoft,
      color: vars.color.dangerInk,
    },
  ],
});

const pillBase = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  height: "22px",
  padding: "0 8px",
  borderRadius: vars.radius.full,
  fontSize: "12px",
  fontWeight: 500,
  whiteSpace: "nowrap",
  width: "max-content",
  flexShrink: 0,
  fontVariantNumeric: "tabular-nums",
});

export const priorityDot = style({
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
  backgroundColor: "currentColor",
});

export const priorityBadge = styleVariants({
  low: [
    pillBase,
    {
      backgroundColor: vars.color.successSoft,
      color: vars.color.successInk,
    },
  ],
  medium: [
    pillBase,
    {
      backgroundColor: vars.color.warningSoft,
      color: vars.color.warningInk,
    },
  ],
  high: [
    pillBase,
    {
      backgroundColor: vars.color.dangerSoft,
      color: vars.color.dangerInk,
    },
  ],
  brand: [
    pillBase,
    {
      backgroundColor: vars.color.brandSoft,
      color: vars.color.brandInk,
    },
  ],
  neutral: [
    pillBase,
    {
      backgroundColor: vars.color.surfaceElevated,
      color: vars.color.textMuted,
    },
  ],
});

const buttonBase = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  fontWeight: 500,
  borderRadius: vars.radius.sm,
  border: "1px solid transparent",
  cursor: "pointer",
  whiteSpace: "nowrap",
  flexShrink: 0,
  transition: "background-color 140ms ease, transform 100ms ease, border-color 140ms ease",
  selectors: {
    "&:active": {
      transform: "translateY(1px)",
    },
  },
});

export const buttonTone = styleVariants({
  primary: [
    buttonBase,
    {
      backgroundColor: vars.color.primary,
      color: vars.color.primaryInk,
    },
  ],
  neutral: [
    buttonBase,
    {
      backgroundColor: vars.color.surface,
      color: vars.color.text,
      borderColor: vars.color.control,
      ":hover": {
        backgroundColor: vars.color.surfaceElevated,
      },
    },
  ],
  brand: [
    buttonBase,
    {
      backgroundColor: vars.color.brand,
      color: "#ffffff",
      ":hover": {
        backgroundColor: vars.color.brandHover,
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
      color: vars.color.dangerInk,
    },
  ],
});

export const buttonSize = styleVariants({
  sm: {
    height: "28px",
    fontSize: "12px",
    padding: "0 10px",
  },
  md: {
    height: "34px",
    fontSize: "13px",
    padding: "0 14px",
  },
  lg: {
    height: "40px",
    fontSize: "14px",
    padding: "0 18px",
  },
});
