import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../theme.css";

export const classes = {
  tabs: style({
    display: "flex",
    gap: "20px",
    borderBottom: `1px solid ${vars.color.border}`,
    marginBottom: "28px",
  }),
  section: style({
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.5fr)",
    gap: "40px",
    paddingBlock: "28px",
    borderBottom: `1px solid ${vars.color.border}`,
  }),
  members: style({}),
  form: style({ display: "flex", flexDirection: "column", alignItems: "stretch", gap: "12px" }),
  error: style({}),
  message: style({}),
  actions: style({ display: "flex", flexWrap: "wrap", gap: "10px" }),
  preview: style({
    border: `1px solid ${vars.color.border}`,
    borderRadius: "4px",
    paddingInline: "12px",
  }),
  member: style({
    display: "flex",
    alignItems: "center",
    gap: "16px",
    paddingBlock: "16px",
    borderBottom: `1px solid ${vars.color.border}`,
    flexWrap: "wrap",
  }),
  avatar: style({
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: vars.color.surfaceHover,
    display: "grid",
    placeItems: "center",
    fontSize: "11px",
  }),
};
globalStyle(`${classes["tabs"]} button`, {
  border: "0",
  borderBottom: "2px solid transparent",
  background: "none",
  color: vars.color.textMuted,
  padding: "12px 4px",
});
globalStyle(`${classes["tabs"]} button[aria-pressed="true"]`, {
  borderColor: vars.color.text,
  color: vars.color.text,
});
globalStyle(`${classes["section"]} h2`, { fontSize: "16px", margin: "0 0 8px" });
globalStyle(`${classes["members"]} h2`, { fontSize: "16px", margin: "0 0 8px" });
globalStyle(`${classes["section"]} p`, { color: vars.color.textMuted, maxWidth: "45ch" });
globalStyle(`${classes["members"]} > p`, { color: vars.color.textMuted, maxWidth: "45ch" });
globalStyle(`${classes["form"]} small`, { color: vars.color.textMuted });
globalStyle(`${classes["form"]} ${classes["error"]}`, {
  color: vars.color.danger,
  margin: "0",
});
globalStyle(`${classes["form"]} ${classes["error"]}:empty`, { display: "none" });
globalStyle(`${classes["message"]}:empty`, { display: "none" });
globalStyle(`${classes["preview"]} > div`, {
  display: "flex",
  justifyContent: "space-between",
  gap: "12px",
  paddingBlock: "18px",
  borderBottom: `1px solid ${vars.color.border}`,
  fontSize: "12px",
});
globalStyle(`${classes["preview"]} > div:last-child`, { border: "0" });
globalStyle(`${classes["preview"]}[data-compact="true"] > div`, { paddingBlock: "8px" });
globalStyle(`${classes["preview"]} span`, { color: vars.color.textMuted });
globalStyle(`${classes["member"]} label`, {
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "12px",
});
globalStyle(`${classes["member"]} select`, { width: "auto" });
globalStyle(`${classes["section"]}`, {
  "@media": { "(max-width: 700px)": { gridTemplateColumns: "1fr", gap: "12px" } },
});
