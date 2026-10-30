import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

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

export const appTitle = style({
  fontSize: "22px",
  fontWeight: 600,
  lineHeight: 1.2,
  letterSpacing: "-0.01em",
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
