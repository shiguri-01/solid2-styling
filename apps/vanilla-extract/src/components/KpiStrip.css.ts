import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

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

export const appSubtitle = style({
  fontSize: "13px",
  color: vars.color.textMuted,
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
