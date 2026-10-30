import { keyframes, style, styleVariants } from "@vanilla-extract/css";
import { boardContainer, vars } from "../theme.css";

const fadeSlideIn = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(2px)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)",
  },
});

export const panelHeader = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
});

export const panelTitleGroup = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const toolbarRow = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  paddingBottom: "14px",
  borderBottom: `1px solid ${vars.color.rule}`,
});

export const searchField = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  height: "34px",
  padding: "0 10px",
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.control}`,
  backgroundColor: vars.color.surface,
  flex: "1 1 200px",
  maxWidth: "280px",
  transition: "border-color 140ms ease",
  selectors: {
    "&:focus-within": {
      borderColor: vars.color.brand,
    },
  },
  "@media": {
    "(max-width: 640px)": {
      maxWidth: "100%",
    },
  },
});

export const searchIcon = style({
  width: "14px",
  height: "14px",
  color: vars.color.textMuted,
  flexShrink: 0,
});

export const searchInput = style({
  border: "none",
  backgroundColor: "transparent",
  color: vars.color.text,
  fontSize: "13px",
  width: "100%",
  outline: "none",
  selectors: {
    "&::placeholder": {
      color: vars.color.textMuted,
    },
  },
});

export const filterControls = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
});

export const filterGroup = style({
  display: "inline-flex",
  width: "max-content",
  maxWidth: "100%",
  padding: "3px",
  backgroundColor: vars.color.surfaceElevated,
  borderRadius: vars.radius.sm,
  gap: "2px",
});

const filterTabBase = style({
  border: "none",
  borderRadius: "4px",
  height: "28px",
  padding: "0 10px",
  fontSize: "12px",
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
  transition: "background-color 140ms ease, color 140ms ease",
});

export const filterTab = styleVariants({
  inactive: [
    filterTabBase,
    {
      backgroundColor: "transparent",
      color: vars.color.textMuted,
      fontWeight: 400,
      ":hover": {
        color: vars.color.text,
      },
    },
  ],
  active: [
    filterTabBase,
    {
      backgroundColor: vars.color.surface,
      color: vars.color.text,
      fontWeight: 500,
    },
  ],
});

export const tabCount = style({
  fontSize: "11px",
  color: vars.color.textMuted,
  fontVariantNumeric: "tabular-nums",
});

export const formRow = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
});

export const textInput = style({
  flex: "1 1 200px",
  minWidth: "160px",
  height: "34px",
  padding: "0 12px",
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.control}`,
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  fontSize: "13px",
  outline: "none",
  transition: "border-color 140ms ease",
  selectors: {
    "&::placeholder": {
      color: vars.color.textMuted,
    },
    "&:focus": {
      borderColor: vars.color.brand,
    },
  },
});

export const selectInput = style({
  appearance: "none",
  WebkitAppearance: "none",
  height: "34px",
  padding: "0 30px 0 10px",
  borderRadius: vars.radius.sm,
  border: `1px solid ${vars.color.control}`,
  backgroundColor: vars.color.surface,
  backgroundImage: vars.chevron,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 9px center",
  backgroundSize: "12px 12px",
  color: vars.color.text,
  fontSize: "12px",
  fontWeight: 500,
  cursor: "pointer",
  outline: "none",
  transition: "border-color 140ms ease, background-color 140ms ease",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.surfaceElevated,
    },
    "&:focus": {
      borderColor: vars.color.brand,
    },
  },
});

export const tableHeader = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 92px 84px 72px 64px",
  alignItems: "center",
  gap: "10px",
  padding: "0 8px 8px",
  borderBottom: `1px solid ${vars.color.border}`,
  fontSize: "12px",
  fontWeight: 500,
  color: vars.color.textMuted,
  "@container": {
    [`${boardContainer} (max-width: 560px)`]: {
      gridTemplateColumns: "minmax(0, 1fr) 80px 64px",
    },
  },
});

export const hideOnCompact = style({
  "@container": {
    [`${boardContainer} (max-width: 560px)`]: {
      display: "none",
    },
  },
});

export const alignEnd = style({
  textAlign: "right",
});

export const taskList = style({
  listStyle: "none",
  padding: 0,
  display: "flex",
  flexDirection: "column",
});

export const tableFooter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  paddingTop: "12px",
  fontSize: "12px",
  color: vars.color.textMuted,
  fontVariantNumeric: "tabular-nums",
});

export const taskRowBase = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 92px 84px 72px 64px",
  alignItems: "center",
  gap: "10px",
  padding: "13px 8px",
  borderBottom: `1px solid ${vars.color.rule}`,
  borderLeft: "2px solid transparent",
  cursor: "pointer",
  animation: `${fadeSlideIn} 140ms ease-out`,
  transition: "background-color 120ms ease, border-color 120ms ease, opacity 140ms ease",
  selectors: {
    "&:hover": {
      backgroundColor: vars.color.surfaceHover,
    },
    '&[data-selected="true"]': {
      backgroundColor: vars.color.surfaceSelected,
      borderLeftColor: vars.color.brand,
    },
  },
  "@container": {
    [`${boardContainer} (max-width: 560px)`]: {
      gridTemplateColumns: "minmax(0, 1fr) 80px 64px",
    },
  },
});

export const taskRow = styleVariants({
  todo: [taskRowBase],
  done: [
    taskRowBase,
    {
      opacity: 0.72,
    },
  ],
});

export const taskPrimaryCell = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  minWidth: 0,
});

export const checkboxInput = style({
  width: "15px",
  height: "15px",
  margin: 0,
  accentColor: vars.color.brand,
  cursor: "pointer",
  flexShrink: 0,
});

export const dueCell = style({
  fontSize: "12px",
  color: vars.color.textMuted,
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
});

export const rowActionBtn = style({
  height: "26px",
  padding: "0 8px",
  fontSize: "12px",
  fontWeight: 500,
  borderRadius: vars.radius.sm,
  border: "1px solid transparent",
  backgroundColor: "transparent",
  color: vars.color.textMuted,
  cursor: "pointer",
  justifySelf: "end",
  transition: "background-color 120ms ease, color 120ms ease, border-color 120ms ease",
  selectors: {
    [`${taskRowBase}:hover &`]: {
      backgroundColor: vars.color.dangerSoft,
      color: vars.color.dangerInk,
    },
    "&:focus-visible": {
      backgroundColor: vars.color.dangerSoft,
      color: vars.color.dangerInk,
      borderColor: vars.color.danger,
    },
  },
});
