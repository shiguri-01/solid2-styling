import { style, variants, vars } from "./zyzz.config";

const fontSans = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export const body = style({
  margin: 0,
  padding: 0,
  fontFamily: fontSans,
  fontSize: "14px",
  lineHeight: "20px",
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
  margin: 0,
  paddingBlock: "28px",
  textAlign: "center",
  fontSize: "13px",
  color: vars.color.textMuted,
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
