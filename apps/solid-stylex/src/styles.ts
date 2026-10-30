import * as stylex from "@stylexjs/stylex";
import { tokens } from "./tokens.stylex";

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

export const primitives = stylex.create({
  body: {
    margin: 0,
    padding: 0,
    fontFamily: tokens.fontSans,
    fontSize: "14px",
    lineHeight: "20px",
    WebkitFontSmoothing: "antialiased",
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

  breadcrumbRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: tokens.textMuted,
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

  emptyState: {
    margin: 0,
    paddingBlock: "28px",
    textAlign: "center",
    fontSize: "13px",
    color: tokens.textMuted,
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
});

export const priorityPillMap = {
  low: primitives.pillLow,
  medium: primitives.pillMedium,
  high: primitives.pillHigh,
} as const;

export const avatarColorMap = {
  teal: primitives.avatarTeal,
  emerald: primitives.avatarEmerald,
  amber: primitives.avatarAmber,
  rose: primitives.avatarRose,
} as const;
