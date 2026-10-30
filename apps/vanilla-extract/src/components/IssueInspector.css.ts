import { style } from "@vanilla-extract/css";
import { vars } from "../theme.css";

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

export const assigneeCell = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "12px",
  color: vars.color.textMuted,
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
