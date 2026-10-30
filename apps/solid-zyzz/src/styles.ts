import { style, variants, vars } from "./zyzz.config";

const fontSans = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const body = style({
  margin: 0,
  padding: 0,
  fontFamily: fontSans,
  fontSize: "14px",
  lineHeight: "20px",
});

// ---------------------------------------------------------------------------
// App Shell & Top Navigation
// ---------------------------------------------------------------------------

export const pageShell = style({
  minHeight: "100svh",
  backgroundColor: vars.color.bg,
  color: vars.color.text,
  fontFamily: fontSans,
  transitionProperty: "background-color, color",
  transitionDuration: "180ms",
  transitionTimingFunction: "ease",
  paddingTop: vars.space.xl,
  paddingInline: vars.space.xl,
  paddingBottom: "56px",
  "@media (max-width: 640px)": {
    paddingTop: vars.space.lg,
    paddingInline: vars.space.lg,
    paddingBottom: "40px",
  },
});

export const container = style({
  maxWidth: "1200px",
  marginBlock: 0,
  marginInline: "auto",
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
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.border,
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
  margin: 0,
  fontSize: "22px",
  fontWeight: 600,
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
});

export const appSubtitle = style({
  margin: 0,
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

export const avatar = variants({
  selection: "class",
  base: {
    width: "26px",
    height: "26px",
    borderRadius: vars.radius.full,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: 600,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: vars.color.bg,
    marginLeft: "-6px",
    flexShrink: 0,
    userSelect: "none",
    fontVariantNumeric: "tabular-nums",
  },
  variants: {
    tone: {
      teal: {
        backgroundColor: vars.color.brandSoft,
        color: vars.color.brandInk,
      },
      emerald: {
        backgroundColor: vars.color.successSoft,
        color: vars.color.successInk,
      },
      amber: {
        backgroundColor: vars.color.warningSoft,
        color: vars.color.warningInk,
      },
      rose: {
        backgroundColor: vars.color.dangerSoft,
        color: vars.color.dangerInk,
      },
    },
  },
  defaultVariants: {
    tone: "teal",
  },
});

// ---------------------------------------------------------------------------
// KPI Metric Strip (4-cell divided strip)
// ---------------------------------------------------------------------------

export const statsGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  backgroundColor: vars.color.surface,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.border,
  borderRadius: vars.radius.md,
  "@media (max-width: 900px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  "@media (max-width: 540px)": {
    gridTemplateColumns: "minmax(0, 1fr)",
  },
});

export const statCard = style({
  paddingBlock: "18px",
  paddingInline: "22px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  borderLeftWidth: "1px",
  borderLeftStyle: "solid",
  borderLeftColor: vars.color.border,
  ":first-child": {
    borderLeftWidth: "0px",
  },
  "@media (max-width: 900px)": {
    ":nth-child(2n + 1)": {
      borderLeftWidth: "0px",
    },
    ":nth-child(n + 3)": {
      borderTopWidth: "1px",
      borderTopStyle: "solid",
      borderTopColor: vars.color.border,
    },
  },
  "@media (max-width: 540px)": {
    paddingBlock: "16px",
    paddingInline: "18px",
    borderLeftWidth: "0px",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: vars.color.border,
    ":first-child": {
      borderTopWidth: "0px",
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
  transitionProperty: "width",
  transitionDuration: "220ms",
  transitionTimingFunction: "ease",
});

// ---------------------------------------------------------------------------
// Workspace Split Layout (Issue Table + Detail Inspector)
// ---------------------------------------------------------------------------

export const workspaceGrid = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 7fr) minmax(320px, 5fr)",
  gap: "24px",
  alignItems: "stretch",
  "@media (max-width: 960px)": {
    gridTemplateColumns: "minmax(0, 1fr)",
  },
});

export const panel = style({
  containerType: "inline-size",
  backgroundColor: vars.color.surface,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.border,
  borderRadius: vars.radius.md,
  paddingBlock: "22px",
  paddingInline: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  "@media (max-width: 600px)": {
    paddingBlock: "16px",
    paddingInline: "16px",
    gap: "14px",
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
  margin: 0,
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
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.rule,
});

export const searchField = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  height: "34px",
  paddingInline: "10px",
  borderRadius: vars.radius.sm,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.control,
  backgroundColor: vars.color.surface,
  flex: "1 1 200px",
  maxWidth: "280px",
  transitionProperty: "border-color",
  transitionDuration: "140ms",
  transitionTimingFunction: "ease",
  ":focus-within": {
    borderColor: vars.color.brand,
  },
  "@media (max-width: 640px)": {
    maxWidth: "100%",
  },
});

export const searchIcon = style({
  width: "14px",
  height: "14px",
  color: vars.color.textMuted,
  flexShrink: 0,
});

export const searchInput = style({
  borderStyle: "none",
  backgroundColor: vars.color.transparent,
  color: vars.color.text,
  fontSize: "13px",
  width: "100%",
  outlineStyle: "none",
  "::placeholder": {
    color: vars.color.textMuted,
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

export const filterTab = variants({
  selection: "class",
  base: {
    borderStyle: "none",
    borderRadius: vars.radius.xs,
    height: "28px",
    paddingInline: "10px",
    fontSize: "12px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: "140ms",
    transitionTimingFunction: "ease",
  },
  variants: {
    active: {
      true: {
        backgroundColor: vars.color.surface,
        color: vars.color.text,
        fontWeight: 500,
      },
      false: {
        backgroundColor: vars.color.transparent,
        color: vars.color.textMuted,
        fontWeight: 400,
        ":hover": {
          color: vars.color.text,
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
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
  paddingInline: "12px",
  borderRadius: vars.radius.sm,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.control,
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  fontSize: "13px",
  outlineStyle: "none",
  transitionProperty: "border-color",
  transitionDuration: "140ms",
  transitionTimingFunction: "ease",
  "::placeholder": {
    color: vars.color.textMuted,
  },
  ":focus": {
    borderColor: vars.color.brand,
  },
});

export const selectInput = style({
  appearance: "none",
  height: "34px",
  paddingLeft: "10px",
  paddingRight: "30px",
  borderRadius: vars.radius.sm,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.control,
  backgroundColor: vars.color.surface,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%236d7379' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !custom`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 9px center !custom",
  backgroundSize: "12px 12px !custom",
  color: vars.color.text,
  fontSize: "12px",
  fontWeight: 500,
  cursor: "pointer",
  outlineStyle: "none",
  transitionProperty: "border-color, background-color",
  transitionDuration: "140ms",
  transitionTimingFunction: "ease",
  ":hover": {
    backgroundColor: vars.color.surfaceElevated,
  },
  ":focus": {
    borderColor: vars.color.brand,
  },
});

// ---------------------------------------------------------------------------
// Issue Table / List Rows
// ---------------------------------------------------------------------------

export const tableHeader = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 92px 84px 72px 64px",
  alignItems: "center",
  gap: "10px",
  paddingTop: 0,
  paddingInline: "8px",
  paddingBottom: "8px",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.border,
  fontSize: "12px",
  fontWeight: 500,
  color: vars.color.textMuted,
  "@container (max-width: 560px)": {
    gridTemplateColumns: "minmax(0, 1fr) 80px 64px",
  },
});

export const hideOnCompact = style({
  "@container (max-width: 560px)": {
    display: "none",
  },
});

export const alignEnd = style({
  textAlign: "right",
});

export const taskList = style({
  listStyleType: "none",
  margin: 0,
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

export const taskRow = variants({
  selection: "class",
  base: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 92px 84px 72px 64px",
    alignItems: "center",
    gap: "10px",
    paddingBlock: "13px",
    paddingInline: "8px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: vars.color.rule,
    borderLeftWidth: "2px",
    borderLeftStyle: "solid",
    borderLeftColor: vars.color.transparent,
    cursor: "pointer",
    transitionProperty: "background-color, border-color, opacity",
    transitionDuration: "120ms",
    transitionTimingFunction: "ease",
    "@container (max-width: 560px)": {
      gridTemplateColumns: "minmax(0, 1fr) 80px 64px",
    },
  },
  variants: {
    done: {
      true: { opacity: 0.72 },
      false: { opacity: 1 },
    },
    selected: {
      true: {
        backgroundColor: vars.color.surfaceSelected,
        borderLeftColor: vars.color.brand,
      },
      false: {
        backgroundColor: vars.color.transparent,
        ":hover": {
          backgroundColor: vars.color.surfaceHover,
        },
      },
    },
  },
  defaultVariants: {
    done: false,
    selected: false,
  },
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

export const taskTitle = variants({
  selection: "class",
  base: {
    fontSize: "13px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  variants: {
    done: {
      true: {
        fontWeight: 400,
        textDecorationLine: "line-through",
        color: vars.color.textMuted,
      },
      false: {
        fontWeight: 500,
        textDecorationLine: "none",
        color: vars.color.text,
      },
    },
  },
  defaultVariants: {
    done: false,
  },
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

export const rowActionBtn = style({
  height: "26px",
  paddingInline: "8px",
  fontSize: "12px",
  fontWeight: 500,
  borderRadius: vars.radius.sm,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.transparent,
  backgroundColor: vars.color.transparent,
  color: vars.color.textMuted,
  cursor: "pointer",
  justifySelf: "end",
  transitionProperty: "background-color, color, border-color",
  transitionDuration: "120ms",
  transitionTimingFunction: "ease",
  "li:hover &": {
    backgroundColor: vars.color.dangerSoft,
    color: vars.color.dangerInk,
  },
  ":hover": {
    backgroundColor: vars.color.dangerSoft,
    color: vars.color.dangerInk,
  },
  ":focus-visible": {
    backgroundColor: vars.color.dangerSoft,
    color: vars.color.dangerInk,
    borderColor: vars.color.danger,
  },
});

// ---------------------------------------------------------------------------
// Pills, Status Dots & Buttons
// ---------------------------------------------------------------------------

export const priorityDot = style({
  width: "6px",
  height: "6px",
  borderRadius: vars.radius.full,
  backgroundColor: "currentColor !custom",
});

export const pill = variants({
  selection: "class",
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    height: "22px",
    paddingInline: "8px",
    borderRadius: vars.radius.full,
    fontSize: "12px",
    fontWeight: 500,
    whiteSpace: "nowrap",
    width: "max-content",
    flexShrink: 0,
    fontVariantNumeric: "tabular-nums",
  },
  variants: {
    tone: {
      low: {
        backgroundColor: vars.color.successSoft,
        color: vars.color.successInk,
      },
      medium: {
        backgroundColor: vars.color.warningSoft,
        color: vars.color.warningInk,
      },
      high: {
        backgroundColor: vars.color.dangerSoft,
        color: vars.color.dangerInk,
      },
      brand: {
        backgroundColor: vars.color.brandSoft,
        color: vars.color.brandInk,
      },
      neutral: {
        backgroundColor: vars.color.surfaceElevated,
        color: vars.color.textMuted,
      },
    },
  },
  defaultVariants: {
    tone: "brand",
  },
});

export const actionButton = variants({
  selection: "class",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontWeight: 500,
    borderRadius: vars.radius.sm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: vars.color.transparent,
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
    transitionProperty: "background-color, transform, border-color",
    transitionDuration: "140ms",
    transitionTimingFunction: "ease",
    ":active": {
      transform: "translateY(1px)",
    },
  },
  variants: {
    tone: {
      primary: {
        backgroundColor: vars.color.primary,
        color: vars.color.primaryInk,
      },
      neutral: {
        backgroundColor: vars.color.surface,
        color: vars.color.text,
        borderColor: vars.color.control,
        ":hover": {
          backgroundColor: vars.color.surfaceElevated,
        },
      },
      brand: {
        backgroundColor: vars.color.brand,
        color: vars.color.white,
        ":hover": {
          backgroundColor: vars.color.brandHover,
        },
      },
      success: {
        backgroundColor: vars.color.success,
        color: vars.color.white,
      },
      danger: {
        backgroundColor: vars.color.dangerSoft,
        color: vars.color.dangerInk,
      },
    },
    size: {
      sm: {
        height: "28px",
        fontSize: "12px",
        paddingInline: "10px",
      },
      md: {
        height: "34px",
        fontSize: "13px",
        paddingInline: "14px",
      },
      lg: {
        height: "40px",
        fontSize: "14px",
        paddingInline: "18px",
      },
    },
  },
  defaultVariants: {
    tone: "primary",
    size: "md",
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
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.rule,
});

export const inspectorTitleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const inspectorTitle = style({
  margin: 0,
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: 1.35,
});

export const metaGrid = style({
  margin: 0,
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  rowGap: "12px",
  columnGap: "16px",
  paddingBottom: "16px",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.rule,
});

export const metaItem = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const metaLabel = style({
  margin: 0,
  fontSize: "12px",
  color: vars.color.textMuted,
});

export const metaValue = style({
  margin: 0,
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
  margin: 0,
  fontSize: "12px",
  fontWeight: 600,
  color: vars.color.textMuted,
});

export const descriptionText = style({
  margin: 0,
  fontSize: "13px",
  lineHeight: 1.55,
  color: vars.color.text,
});

export const checklistGroup = style({
  listStyleType: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
});

export const checklistItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  paddingBlock: "8px",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.rule,
  fontSize: "13px",
  ":first-child": {
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: vars.color.rule,
  },
});

export const activityList = style({
  listStyleType: "none",
  margin: 0,
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
  borderTopWidth: "1px",
  borderTopStyle: "solid",
  borderTopColor: vars.color.rule,
});

export const emptyState = style({
  margin: 0,
  paddingBlock: "28px",
  textAlign: "center",
  fontSize: "13px",
  color: vars.color.textMuted,
});
