import * as stylex from "@stylexjs/stylex";
import { rowMarker, tokens } from "./tokens.stylex";

export { rowMarker };

export const darkTheme = stylex.createTheme(tokens, {
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
  spaceXs: "4px",
  spaceSm: "8px",
  spaceMd: "12px",
  spaceLg: "16px",
  spaceXl: "24px",
  fontSans: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  radiusSm: "6px",
  radiusMd: "8px",
  radiusFull: "9999px",
  chevron: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%23a8aeb5' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
});

const fadeSlideIn = stylex.keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(2px)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)",
  },
});

export const appStyles = stylex.create({
  body: {
    margin: 0,
    padding: 0,
    fontFamily: tokens.fontSans,
    fontSize: "14px",
    lineHeight: "20px",
    WebkitFontSmoothing: "antialiased",
  },

  // ---------------------------------------------------------------------------
  // App Shell & Top Navigation
  // ---------------------------------------------------------------------------
  pageShell: {
    boxSizing: "border-box",
    minHeight: "100svh",
    backgroundColor: tokens.bg,
    color: tokens.text,
    fontFamily: tokens.fontSans,
    transitionProperty: "background-color, color",
    transitionDuration: "180ms",
    transitionTimingFunction: "ease",
    paddingTop: {
      default: tokens.spaceXl,
      "@media (max-width: 640px)": tokens.spaceLg,
    },
    paddingInline: {
      default: tokens.spaceXl,
      "@media (max-width: 640px)": tokens.spaceLg,
    },
    paddingBottom: {
      default: "56px",
      "@media (max-width: 640px)": "40px",
    },
  },

  container: {
    boxSizing: "border-box",
    maxWidth: "1200px",
    marginBlock: 0,
    marginInline: "auto",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spaceXl,
  },

  headerBar: {
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spaceLg,
    paddingBottom: "20px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.border,
  },

  brandGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spaceMd,
  },

  liveDot: {
    width: "10px",
    height: "10px",
    borderRadius: tokens.radiusFull,
    backgroundColor: tokens.brand,
    flexShrink: 0,
  },

  titleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  breadcrumbRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: tokens.textMuted,
  },

  appTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  },

  appSubtitle: {
    margin: 0,
    fontSize: "13px",
    color: tokens.textMuted,
  },

  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  avatarStack: {
    display: "inline-flex",
    alignItems: "center",
    paddingLeft: "6px",
  },

  avatarBase: {
    boxSizing: "border-box",
    width: "26px",
    height: "26px",
    borderRadius: tokens.radiusFull,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: 600,
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: tokens.bg,
    marginLeft: "-6px",
    flexShrink: 0,
    userSelect: "none",
    fontVariantNumeric: "tabular-nums",
  },

  avatarTeal: {
    backgroundColor: tokens.brandSoft,
    color: tokens.brandInk,
  },

  avatarEmerald: {
    backgroundColor: tokens.successSoft,
    color: tokens.successInk,
  },

  avatarAmber: {
    backgroundColor: tokens.warningSoft,
    color: tokens.warningInk,
  },

  avatarRose: {
    backgroundColor: tokens.dangerSoft,
    color: tokens.dangerInk,
  },

  // ---------------------------------------------------------------------------
  // KPI Metric Strip (4-cell divided strip)
  // ---------------------------------------------------------------------------
  statsGrid: {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(4, minmax(0, 1fr))",
      "@media (max-width: 900px)": "repeat(2, minmax(0, 1fr))",
      "@media (max-width: 540px)": "minmax(0, 1fr)",
    },
    backgroundColor: tokens.surface,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: tokens.border,
    borderRadius: tokens.radiusMd,
  },

  statCard: {
    boxSizing: "border-box",
    paddingBlock: {
      default: "18px",
      "@media (max-width: 540px)": "16px",
    },
    paddingInline: {
      default: "22px",
      "@media (max-width: 540px)": "18px",
    },
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    borderLeftWidth: {
      default: "1px",
      ":first-child": 0,
      "@media (max-width: 900px)": {
        default: "1px",
        ":nth-child(2n + 1)": 0,
      },
      "@media (max-width: 540px)": 0,
    },
    borderLeftStyle: "solid",
    borderLeftColor: tokens.border,
    borderTopWidth: {
      default: 0,
      "@media (max-width: 900px)": {
        default: 0,
        ":nth-child(n + 3)": "1px",
      },
      "@media (max-width: 540px)": {
        default: "1px",
        ":first-child": 0,
      },
    },
    borderTopStyle: "solid",
    borderTopColor: tokens.border,
  },

  statLabel: {
    fontSize: "13px",
    fontWeight: 500,
    color: tokens.textMuted,
  },

  statValueRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "8px",
  },

  statValue: {
    fontSize: "26px",
    fontWeight: 600,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    fontVariantNumeric: "tabular-nums",
  },

  progressTrack: {
    width: "100%",
    height: "6px",
    backgroundColor: tokens.surfaceElevated,
    borderRadius: tokens.radiusFull,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: tokens.brand,
    borderRadius: tokens.radiusFull,
    transitionProperty: "width",
    transitionDuration: "220ms",
    transitionTimingFunction: "ease",
  },

  // ---------------------------------------------------------------------------
  // Workspace Split Layout (Issue Table + Detail Inspector)
  // ---------------------------------------------------------------------------
  workspaceGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 7fr) minmax(320px, 5fr)",
      "@media (max-width: 960px)": "minmax(0, 1fr)",
    },
    gap: "24px",
    alignItems: "stretch",
  },

  panel: {
    boxSizing: "border-box",
    containerType: "inline-size",
    backgroundColor: tokens.surface,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: tokens.border,
    borderRadius: tokens.radiusMd,
    paddingBlock: {
      default: "22px",
      "@media (max-width: 600px)": "16px",
    },
    paddingInline: {
      default: "24px",
      "@media (max-width: 600px)": "16px",
    },
    display: "flex",
    flexDirection: "column",
    gap: {
      default: "18px",
      "@media (max-width: 600px)": "14px",
    },
  },

  panelHeader: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
  },

  panelTitleGroup: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  panelTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: 1.3,
  },

  // ---------------------------------------------------------------------------
  // Filter Bar, Search Box, Segmented Control & Custom Select
  // ---------------------------------------------------------------------------
  toolbarRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    paddingBottom: "14px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.rule,
  },

  searchField: {
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    height: "34px",
    paddingInline: "10px",
    borderRadius: tokens.radiusSm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: tokens.control,
      ":focus-within": tokens.brand,
    },
    backgroundColor: tokens.surface,
    flex: "1 1 200px",
    maxWidth: {
      default: "280px",
      "@media (max-width: 640px)": "100%",
    },
    transitionProperty: "border-color",
    transitionDuration: "140ms",
    transitionTimingFunction: "ease",
  },

  searchIcon: {
    width: "14px",
    height: "14px",
    color: tokens.textMuted,
    flexShrink: 0,
  },

  searchInput: {
    borderStyle: "none",
    backgroundColor: "transparent",
    color: tokens.text,
    fontFamily: "inherit",
    fontSize: "13px",
    width: "100%",
    outlineStyle: "none",
    "::placeholder": {
      color: tokens.textMuted,
    },
  },

  filterControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },

  filterGroup: {
    boxSizing: "border-box",
    display: "inline-flex",
    width: "max-content",
    maxWidth: "100%",
    padding: "3px",
    backgroundColor: tokens.surfaceElevated,
    borderRadius: tokens.radiusSm,
    gap: "2px",
  },

  filterTab: {
    boxSizing: "border-box",
    borderStyle: "none",
    borderRadius: "4px",
    height: "28px",
    paddingInline: "10px",
    fontFamily: "inherit",
    fontSize: "12px",
    fontWeight: 400,
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    backgroundColor: "transparent",
    color: {
      default: tokens.textMuted,
      ":hover": tokens.text,
    },
    transitionProperty: "background-color, color",
    transitionDuration: "140ms",
    transitionTimingFunction: "ease",
  },

  filterTabActive: {
    backgroundColor: tokens.surface,
    color: {
      default: tokens.text,
      ":hover": tokens.text,
    },
    fontWeight: 500,
  },

  tabCount: {
    fontSize: "11px",
    color: tokens.textMuted,
    fontVariantNumeric: "tabular-nums",
  },

  formRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },

  textInput: {
    boxSizing: "border-box",
    flex: "1 1 200px",
    minWidth: "160px",
    height: "34px",
    paddingInline: "12px",
    borderRadius: tokens.radiusSm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: tokens.control,
      ":focus": tokens.brand,
    },
    backgroundColor: tokens.surface,
    color: tokens.text,
    fontFamily: "inherit",
    fontSize: "13px",
    outlineStyle: "none",
    transitionProperty: "border-color",
    transitionDuration: "140ms",
    transitionTimingFunction: "ease",
    "::placeholder": {
      color: tokens.textMuted,
    },
  },

  selectInput: {
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
    height: "34px",
    paddingLeft: "10px",
    paddingRight: "30px",
    borderRadius: tokens.radiusSm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: tokens.control,
      ":focus": tokens.brand,
    },
    backgroundColor: {
      default: tokens.surface,
      ":hover": tokens.surfaceElevated,
    },
    backgroundImage: tokens.chevron,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 9px center",
    backgroundSize: "12px 12px",
    color: tokens.text,
    fontFamily: "inherit",
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
    outlineStyle: "none",
    transitionProperty: "border-color, background-color",
    transitionDuration: "140ms",
    transitionTimingFunction: "ease",
  },

  // ---------------------------------------------------------------------------
  // Issue Table / List Rows
  // ---------------------------------------------------------------------------
  tableHeader: {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr) 92px 84px 72px 64px",
      "@container (max-width: 560px)": "minmax(0, 1fr) 80px 64px",
    },
    alignItems: "center",
    gap: "10px",
    paddingTop: 0,
    paddingInline: "8px",
    paddingBottom: "8px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.border,
    fontSize: "12px",
    fontWeight: 500,
    color: tokens.textMuted,
  },

  hideOnCompact: {
    display: {
      default: null,
      "@container (max-width: 560px)": "none",
    },
  },

  alignEnd: {
    textAlign: "right",
  },

  taskList: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },

  tableFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    paddingTop: "12px",
    fontSize: "12px",
    color: tokens.textMuted,
    fontVariantNumeric: "tabular-nums",
  },

  taskRow: {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr) 92px 84px 72px 64px",
      "@container (max-width: 560px)": "minmax(0, 1fr) 80px 64px",
    },
    alignItems: "center",
    gap: "10px",
    paddingBlock: "13px",
    paddingInline: "8px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.rule,
    borderLeftWidth: "2px",
    borderLeftStyle: "solid",
    borderLeftColor: "transparent",
    backgroundColor: {
      default: "transparent",
      ":hover": tokens.surfaceHover,
    },
    cursor: "pointer",
    animationName: fadeSlideIn,
    animationDuration: "140ms",
    animationTimingFunction: "ease-out",
    transitionProperty: "background-color, border-color, opacity",
    transitionDuration: "120ms",
    transitionTimingFunction: "ease",
  },

  taskRowSelected: {
    backgroundColor: {
      default: tokens.surfaceSelected,
      ":hover": tokens.surfaceSelected,
    },
    borderLeftColor: tokens.brand,
  },

  taskRowDone: {
    opacity: 0.72,
  },

  taskPrimaryCell: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: 0,
  },

  checkboxInput: {
    width: "15px",
    height: "15px",
    margin: 0,
    accentColor: tokens.brand,
    cursor: "pointer",
    flexShrink: 0,
  },

  issueKey: {
    fontSize: "12px",
    fontWeight: 500,
    color: tokens.textMuted,
    fontVariantNumeric: "tabular-nums",
    flexShrink: 0,
  },

  taskTitle: {
    fontSize: "13px",
    fontWeight: 500,
    color: tokens.text,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  taskTitleDone: {
    fontWeight: 400,
    textDecorationLine: "line-through",
    color: tokens.textMuted,
  },

  dueCell: {
    fontSize: "12px",
    color: tokens.textMuted,
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
  },

  assigneeCell: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: tokens.textMuted,
  },

  rowActionBtn: {
    boxSizing: "border-box",
    height: "26px",
    paddingInline: "8px",
    fontFamily: "inherit",
    fontSize: "12px",
    fontWeight: 500,
    borderRadius: tokens.radiusSm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: "transparent",
      ":focus-visible": tokens.danger,
    },
    backgroundColor: {
      default: "transparent",
      [stylex.when.ancestor(":hover", rowMarker)]: tokens.dangerSoft,
      ":focus-visible": tokens.dangerSoft,
    },
    color: {
      default: tokens.textMuted,
      [stylex.when.ancestor(":hover", rowMarker)]: tokens.dangerInk,
      ":focus-visible": tokens.dangerInk,
    },
    cursor: "pointer",
    justifySelf: "end",
    transitionProperty: "background-color, color, border-color",
    transitionDuration: "120ms",
    transitionTimingFunction: "ease",
  },

  // ---------------------------------------------------------------------------
  // Pills, Status Dots & Buttons
  // ---------------------------------------------------------------------------
  pillBase: {
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    height: "22px",
    paddingInline: "8px",
    borderRadius: tokens.radiusFull,
    fontSize: "12px",
    fontWeight: 500,
    whiteSpace: "nowrap",
    width: "max-content",
    flexShrink: 0,
    fontVariantNumeric: "tabular-nums",
  },

  priorityDot: {
    width: "6px",
    height: "6px",
    borderRadius: tokens.radiusFull,
    backgroundColor: "currentColor",
  },

  pillLow: {
    backgroundColor: tokens.successSoft,
    color: tokens.successInk,
  },

  pillMedium: {
    backgroundColor: tokens.warningSoft,
    color: tokens.warningInk,
  },

  pillHigh: {
    backgroundColor: tokens.dangerSoft,
    color: tokens.dangerInk,
  },

  pillBrand: {
    backgroundColor: tokens.brandSoft,
    color: tokens.brandInk,
  },

  pillNeutral: {
    backgroundColor: tokens.surfaceElevated,
    color: tokens.textMuted,
  },

  buttonBase: {
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontFamily: "inherit",
    fontWeight: 500,
    borderRadius: tokens.radiusSm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "transparent",
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
    transform: {
      default: null,
      ":active": "translateY(1px)",
    },
    transitionProperty: "background-color, transform, border-color",
    transitionDuration: "140ms",
    transitionTimingFunction: "ease",
  },

  tonePrimary: {
    backgroundColor: tokens.primary,
    color: tokens.primaryInk,
  },

  toneNeutral: {
    backgroundColor: {
      default: tokens.surface,
      ":hover": tokens.surfaceElevated,
    },
    color: tokens.text,
    borderColor: tokens.control,
  },

  toneBrand: {
    backgroundColor: {
      default: tokens.brand,
      ":hover": tokens.brandHover,
    },
    color: "#ffffff",
  },

  toneSuccess: {
    backgroundColor: tokens.success,
    color: "#ffffff",
  },

  toneDanger: {
    backgroundColor: tokens.dangerSoft,
    color: tokens.dangerInk,
  },

  sizeSm: {
    height: "28px",
    fontSize: "12px",
    paddingInline: "10px",
  },

  sizeMd: {
    height: "34px",
    fontSize: "13px",
    paddingInline: "14px",
  },

  sizeLg: {
    height: "40px",
    fontSize: "14px",
    paddingInline: "18px",
  },

  // ---------------------------------------------------------------------------
  // Right Column: Selected Issue Inspector & Activity Timeline
  // ---------------------------------------------------------------------------
  inspectorHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "12px",
    paddingBottom: "14px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.rule,
  },

  inspectorTitleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  inspectorTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: 1.35,
  },

  metaGrid: {
    margin: 0,
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    rowGap: "12px",
    columnGap: "16px",
    paddingBottom: "16px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.rule,
  },

  metaItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  metaLabel: {
    margin: 0,
    fontSize: "12px",
    color: tokens.textMuted,
  },

  metaValue: {
    margin: 0,
    fontSize: "13px",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },

  sectionBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "12px",
    fontWeight: 600,
    color: tokens.textMuted,
  },

  descriptionText: {
    margin: 0,
    fontSize: "13px",
    lineHeight: 1.55,
    color: tokens.text,
  },

  checklistGroup: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },

  checklistItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    paddingBlock: "8px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.rule,
    borderTopWidth: {
      default: 0,
      ":first-child": "1px",
    },
    borderTopStyle: "solid",
    borderTopColor: tokens.rule,
    fontSize: "13px",
  },

  activityList: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  activityItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spaceSm,
    fontSize: "12px",
    color: tokens.textSubtle,
  },

  activityAuthor: {
    fontWeight: 500,
    color: tokens.text,
  },

  inspectorFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    paddingTop: "14px",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: tokens.rule,
  },

  emptyState: {
    margin: 0,
    paddingBlock: "28px",
    textAlign: "center",
    fontSize: "13px",
    color: tokens.textMuted,
  },
});
