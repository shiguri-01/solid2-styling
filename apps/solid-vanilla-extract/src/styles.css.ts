import {
  createContainer,
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

const boardContainer = createContainer();

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

// ---------------------------------------------------------------------------
// App Shell & Top Navigation
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

export const headerBar = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.lg,
  paddingBottom: "20px",
  borderBottom: `1px solid ${vars.color.border}`,
});

export const brandGroup = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
});

export const liveDot = style({
  width: "10px",
  height: "10px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.brand,
  flexShrink: 0,
});

export const titleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "2px",
});

export const breadcrumbRow = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "12px",
  color: vars.color.textMuted,
});

export const appTitle = style({
  fontSize: "22px",
  fontWeight: 600,
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
});

export const appSubtitle = style({
  fontSize: "13px",
  color: vars.color.textMuted,
});

export const headerActions = style({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
});

export const avatarStack = style({
  display: "inline-flex",
  alignItems: "center",
  paddingLeft: "6px",
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

// ---------------------------------------------------------------------------
// KPI Metric Strip (4-cell divided strip)
// ---------------------------------------------------------------------------

export const statsGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  "@media": {
    "(max-width: 900px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    "(max-width: 540px)": {
      gridTemplateColumns: "minmax(0, 1fr)",
    },
  },
});

export const statCard = style({
  padding: "18px 22px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  selectors: {
    "& + &": {
      borderLeft: `1px solid ${vars.color.border}`,
    },
  },
  "@media": {
    "(max-width: 900px)": {
      selectors: {
        "&:nth-child(2n + 1)": {
          borderLeft: "none",
        },
        "&:nth-child(n + 3)": {
          borderTop: `1px solid ${vars.color.border}`,
        },
      },
    },
    "(max-width: 540px)": {
      padding: "16px 18px",
      selectors: {
        "& + &": {
          borderLeft: "none",
          borderTop: `1px solid ${vars.color.border}`,
        },
      },
    },
  },
});

export const statLabel = style({
  fontSize: "13px",
  fontWeight: 500,
  color: vars.color.textMuted,
});

export const statValueRow = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "8px",
});

export const statValue = style({
  fontSize: "26px",
  fontWeight: 600,
  lineHeight: 1.15,
  letterSpacing: "-0.02em",
  fontVariantNumeric: "tabular-nums",
});

export const progressTrack = style({
  width: "100%",
  height: "6px",
  backgroundColor: vars.color.surfaceElevated,
  borderRadius: vars.radius.full,
  overflow: "hidden",
});

export const progressFill = style({
  height: "100%",
  backgroundColor: vars.color.brand,
  borderRadius: vars.radius.full,
  transition: "width 220ms ease",
});

// ---------------------------------------------------------------------------
// Workspace Split Layout (Issue Table + Detail Inspector)
// ---------------------------------------------------------------------------

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

export const panelTitle = style({
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: 1.3,
});

// ---------------------------------------------------------------------------
// Filter Bar, Search Box, Segmented Control & Custom Select
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Issue Table / List Rows (Complex states, parent-hover selectors, container queries)
// ---------------------------------------------------------------------------

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

export const issueKey = style({
  fontSize: "12px",
  fontWeight: 500,
  color: vars.color.textMuted,
  fontVariantNumeric: "tabular-nums",
  flexShrink: 0,
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

export const dueCell = style({
  fontSize: "12px",
  color: vars.color.textMuted,
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
});

export const assigneeCell = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "12px",
  color: vars.color.textMuted,
});

// Parent row hover reveals muted action button
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

// ---------------------------------------------------------------------------
// Pills, Status Dots & Buttons
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Right Column: Selected Issue Inspector & Activity Timeline
// ---------------------------------------------------------------------------

export const inspectorHeader = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "12px",
  paddingBottom: "14px",
  borderBottom: `1px solid ${vars.color.rule}`,
});

export const inspectorTitleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const inspectorTitle = style({
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: 1.35,
});

export const metaGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: "12px 16px",
  paddingBottom: "16px",
  borderBottom: `1px solid ${vars.color.rule}`,
});

export const metaItem = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const metaLabel = style({
  fontSize: "12px",
  color: vars.color.textMuted,
});

export const metaValue = style({
  fontSize: "13px",
  fontWeight: 500,
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
});

export const sectionBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const sectionTitle = style({
  fontSize: "12px",
  fontWeight: 600,
  color: vars.color.textMuted,
});

export const descriptionText = style({
  fontSize: "13px",
  lineHeight: 1.55,
  color: vars.color.text,
});

export const checklistGroup = style({
  listStyle: "none",
  padding: 0,
  display: "flex",
  flexDirection: "column",
});

export const checklistItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  padding: "8px 0",
  borderBottom: `1px solid ${vars.color.rule}`,
  fontSize: "13px",
  selectors: {
    "&:first-child": {
      borderTop: `1px solid ${vars.color.rule}`,
    },
  },
});

export const activityList = style({
  listStyle: "none",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

export const activityItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
  fontSize: "12px",
  color: vars.color.textSubtle,
});

export const activityAuthor = style({
  fontWeight: 500,
  color: vars.color.text,
});

export const inspectorFooter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  paddingTop: "14px",
  borderTop: `1px solid ${vars.color.rule}`,
});

export const emptyState = style({
  padding: "28px 0",
  textAlign: "center",
  fontSize: "13px",
  color: vars.color.textMuted,
});
