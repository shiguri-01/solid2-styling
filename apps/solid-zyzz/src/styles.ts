import { style, variants, vars } from "./zyzz.config";

export const body = style({
  margin: 0,
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
});

export const pageShell = style({
  minHeight: "100vh",
  backgroundColor: vars.color.bg,
  color: vars.color.text,
  transitionProperty: "background-color, color",
  transitionDuration: "200ms",
  transitionTimingFunction: "ease",
  paddingTop: "2rem",
  paddingInline: "1.5rem",
  paddingBottom: "4rem",
});

export const container = style({
  maxWidth: "1080px",
  marginBlock: 0,
  marginInline: "auto",
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
  paddingBlock: "1.25rem",
  paddingInline: "1.5rem",
  backgroundColor: vars.color.surface,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.border,
  borderRadius: vars.radius.lg,
  boxShadow: "0 4px 12px -2px rgb(15 23 42 / 0.08)",
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
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.border,
  borderRadius: vars.radius.md,
  padding: "1.25rem",
  boxShadow: "0 4px 12px -2px rgb(15 23 42 / 0.08)",
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
  transitionProperty: "width",
  transitionDuration: "250ms",
  transitionTimingFunction: "ease",
});

export const mainGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "1.5rem",
  alignItems: "start",
});

export const panel = style({
  backgroundColor: vars.color.surface,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.border,
  borderRadius: vars.radius.lg,
  padding: "1.5rem",
  boxShadow: "0 4px 12px -2px rgb(15 23 42 / 0.08)",
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
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.border,
  gap: "0.25rem",
});

export const filterTab = variants({
  selection: "class",
  base: {
    borderStyle: "none",
    borderRadius: vars.radius.sm,
    paddingBlock: "0.35rem",
    paddingInline: "0.75rem",
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  },
  variants: {
    active: {
      true: {
        backgroundColor: vars.color.brand,
        color: vars.color.white,
      },
      false: {
        backgroundColor: vars.color.transparent,
        color: vars.color.textMuted,
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

export const formRow = style({
  display: "flex",
  gap: "0.5rem",
  flexWrap: "wrap",
});

export const textInput = style({
  flex: 1,
  minWidth: "160px",
  paddingBlock: "0.55rem",
  paddingInline: "0.85rem",
  borderRadius: vars.radius.sm,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.border,
  backgroundColor: vars.color.surfaceElevated,
  color: vars.color.text,
  fontSize: "0.9rem",
  outlineStyle: "none",
  ":focus": {
    borderColor: vars.color.brand,
  },
});

export const selectInput = style({
  paddingBlock: "0.55rem",
  paddingInline: "0.75rem",
  borderRadius: vars.radius.sm,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.border,
  backgroundColor: vars.color.surfaceElevated,
  color: vars.color.text,
  fontSize: "0.85rem",
  fontWeight: 600,
});

export const taskList = style({
  listStyleType: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "0.625rem",
});

export const taskRow = variants({
  selection: "class",
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.75rem",
    paddingBlock: "0.75rem",
    paddingInline: "1rem",
    borderRadius: vars.radius.md,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: vars.color.border,
    backgroundColor: vars.color.surfaceElevated,
    transitionProperty: "background-color, opacity",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ":hover": {
      backgroundColor: vars.color.surfaceHover,
    },
  },
  variants: {
    done: {
      true: { opacity: 0.65 },
      false: { opacity: 1 },
    },
  },
  defaultVariants: {
    done: false,
  },
});

export const taskLabelGroup = style({
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
  cursor: "pointer",
  flex: 1,
});

export const taskTitle = variants({
  selection: "class",
  base: {
    fontSize: "0.925rem",
    fontWeight: 500,
  },
  variants: {
    done: {
      true: {
        textDecorationLine: "line-through",
        color: vars.color.textMuted,
      },
      false: {
        textDecorationLine: "none",
      },
    },
  },
  defaultVariants: {
    done: false,
  },
});

export const pill = variants({
  selection: "class",
  base: {
    display: "inline-flex",
    alignItems: "center",
    paddingBlock: "0.2rem",
    paddingInline: "0.6rem",
    borderRadius: vars.radius.full,
    fontSize: "0.72rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  },
  variants: {
    tone: {
      low: {
        backgroundColor: vars.color.successSoft,
        color: vars.color.success,
      },
      medium: {
        backgroundColor: vars.color.warningSoft,
        color: vars.color.warning,
      },
      high: {
        backgroundColor: vars.color.dangerSoft,
        color: vars.color.danger,
      },
      brand: {
        backgroundColor: vars.color.brandSoft,
        color: vars.color.brand,
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
    gap: "0.4rem",
    fontWeight: 600,
    borderRadius: vars.radius.sm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: vars.color.transparent,
    cursor: "pointer",
    transitionProperty: "background-color, transform, border-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    ":active": {
      transform: "scale(0.97)",
    },
  },
  variants: {
    tone: {
      primary: {
        backgroundColor: vars.color.brand,
        color: vars.color.white,
        ":hover": {
          backgroundColor: vars.color.brandHover,
        },
      },
      neutral: {
        backgroundColor: vars.color.surfaceElevated,
        color: vars.color.text,
        borderColor: vars.color.border,
        ":hover": {
          backgroundColor: vars.color.surfaceHover,
        },
      },
      success: {
        backgroundColor: vars.color.success,
        color: vars.color.white,
      },
      danger: {
        backgroundColor: vars.color.dangerSoft,
        color: vars.color.danger,
      },
    },
    size: {
      sm: {
        fontSize: "0.8rem",
        paddingBlock: "0.4rem",
        paddingInline: "0.75rem",
      },
      md: {
        fontSize: "0.9rem",
        paddingBlock: "0.55rem",
        paddingInline: "1.1rem",
      },
      lg: {
        fontSize: "1rem",
        paddingBlock: "0.75rem",
        paddingInline: "1.4rem",
      },
    },
  },
  defaultVariants: {
    tone: "primary",
    size: "md",
  },
});

export const controlGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  padding: "1rem",
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.surfaceElevated,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.border,
});

export const previewStage = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  padding: "1.5rem",
  borderRadius: vars.radius.md,
  borderWidth: "1px",
  borderStyle: "dashed",
  borderColor: vars.color.border,
});
