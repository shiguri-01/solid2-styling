import { style, vars } from "../zyzz.config";

export const projectCount = style({
  marginLeft: "auto",
  color: vars.color.textMuted,
  "@media (max-width:560px)": { marginLeft: 0 },
});

export const heading = style({
  margin: 0,
  fontSize: "16px",
  fontWeight: 600,
});
export const description = style({
  color: vars.color.textMuted,
  fontSize: "13px",
  margin: 0,
});
export const toolbar = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "end",
  gap: vars.space.xl,
  marginBottom: vars.space.xl,
});
export const check = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  paddingBottom: vars.space.sm,
});
export const scope = style({
  display: "grid",
  gap: vars.space.sm,
  fontSize: "12px",
});
export const layout = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 300px",
  "@media (max-width: 1200px)": {
    gridTemplateColumns: "minmax(0, 1fr)",
  },
  gap: vars.space.xl,
  alignItems: "start",
});
export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2,minmax(0,1fr))",
  "@media (max-width: 560px)": {
    gridTemplateColumns: "minmax(0,1fr)",
  },
  gap: vars.space.lg,
});
export const issue = style({
  display: "flex",
  alignItems: "start",
  gap: vars.space.md,
  paddingBlock: "var(--workspace-row)",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.border,
});
export const issueTitle = style({
  display: "block",
});
export const done = style({
  textDecoration: "line-through",
  color: vars.color.textMuted,
});
export const metrics = style({
  display: "grid",
  gridTemplateColumns: "repeat(4,minmax(0,1fr))",
  "@media (max-width: 560px)": {
    gridTemplateColumns: "repeat(2,minmax(0,1fr))",
  },
  borderBlock: "1px solid",
  borderBlockColor: vars.color.border,
  "& > div": {
    paddingInline: "20px !custom",
    borderRight: "1px solid",
    borderRightColor: vars.color.border,
  },
  "& > div:last-child": { borderRight: 0 },
  margin: 0,
  marginBottom: vars.space.xl,
  paddingBlock: "20px !custom",
});
export const metricValue = style({
  margin: 0,
  fontSize: "28px",
  fontVariantNumeric: "tabular-nums",
});
export const columns = style({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  "@media (max-width: 1000px)": {
    gridTemplateColumns: "minmax(0,1fr)",
  },
  gap: vars.space.xl,
  marginBottom: vars.space.xl,
});
export const barRow = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.sm,
});
export const barLabel = style({
  display: "flex",
  justifyContent: "space-between",
  gap: vars.space.sm,
  fontVariantNumeric: "tabular-nums",
});
export const priority = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBlock: "var(--workspace-row)",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.border,
});
export const note = style({
  color: vars.color.textMuted,
  marginTop: vars.space.xl,
});
export const tableScroll = style({
  overflowX: "auto",
});
export const table = style({
  borderCollapse: "collapse",
  width: "100%",
  whiteSpace: "nowrap",
});
export const cell = style({
  paddingBlock: "var(--workspace-row)",
  paddingInline: vars.space.md,
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.border,
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
});
export const rowHeading = style({
  textAlign: "left",
  fontWeight: 500,
});
export const tableHeading = style({
  fontSize: "12px",
  fontWeight: 400,
  color: vars.color.textMuted,
});
export const tabs = style({
  display: "flex",
  gap: vars.space.lg,
  marginBottom: vars.space.xl,
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.border,
});
export const tab = style({
  borderRadius: "0 !custom",
  borderWidth: 0,
  borderBottomWidth: "2px",
  borderBottomStyle: "solid",
  borderBottomColor: "transparent",
  backgroundColor: "transparent",
  color: vars.color.textMuted,
  paddingBlock: vars.space.md,
  paddingInline: vars.space.xs,
  font: "inherit",
  cursor: "pointer",
  outlineColor: vars.color.brand,
  outlineOffset: "3px",
});
export const tabActive = style({
  borderBottomColor: vars.color.text,
  color: vars.color.text,
});
export const section = style({
  display: "grid",
  gridTemplateColumns: "minmax(0,1fr) minmax(0,1.5fr)",
  "@media (max-width: 800px)": {
    gridTemplateColumns: "minmax(0,1fr)",
  },
  gap: "40px !custom",
  paddingBlock: "28px !custom",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.border,
});
export const error = style({
  color: vars.color.danger,
  margin: 0,
  display: "block",
  ":empty": {
    display: "none",
  },
});
export const message = style({
  color: vars.color.success,
  margin: 0,
  display: "block",
  ":empty": {
    display: "none",
  },
});
export const actions = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.space.md,
});
export const preview = style({
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.border,
  borderRadius: vars.radius.sm,
  paddingInline: vars.space.md,
});
export const previewRow = style({
  display: "flex",
  justifyContent: "space-between",
  gap: vars.space.md,
  paddingBlock: "18px !custom",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.border,
  fontSize: "12px",
  ":last-child": { borderBottomWidth: 0 },
});
export const compactRow = style({
  paddingBlock: vars.space.sm,
});
export const members = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space.md,
});
export const member = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: vars.space.lg,
  paddingBlock: vars.space.lg,
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.border,
});
export const roleLabel = style({
  "& > select": { width: "auto" },
  display: "flex",
  alignItems: "center",
  gap: vars.space.md,
  marginLeft: "auto",
  fontSize: "12px",
});
export const avatar = style({
  display: "grid",
  placeItems: "center",
  width: "32px",
  height: "32px",
  borderRadius: vars.radius.full,
  backgroundColor: vars.color.surfaceHover,
  color: vars.color.text,
  fontSize: "11px",
});
export const meta = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.space.sm,
  fontSize: "12px",
  color: vars.color.textMuted,
});
export const name = style({
  font: "inherit",
  fontWeight: 600,
  fontSize: "18px",
  ":hover": { textDecoration: "underline" },
  color: vars.color.text,
  padding: 0,
  borderWidth: 0,
  backgroundColor: "transparent",
  cursor: "pointer",
  textAlign: "left",
  outlineColor: vars.color.brand,
  outlineOffset: "3px",
});
export const risk = style({
  borderTopWidth: "1px",
  borderTopStyle: "solid",
  borderTopColor: vars.color.border,
  paddingTop: vars.space.md,
  fontSize: "12px",
  color: vars.color.textMuted,
});
