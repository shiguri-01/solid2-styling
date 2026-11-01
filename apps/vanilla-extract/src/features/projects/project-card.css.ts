import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../../theme.css";

export const classes = {
  project: style({ display: "grid", gap: "16px" }),
  meta: style({
    fontSize: "12px",
    color: vars.color.textMuted,
    display: "flex",
    justifyContent: "space-between",
    gap: "8px",
    flexWrap: "wrap",
  }),
  risk: style({
    fontSize: "12px",
    color: vars.color.textMuted,
    borderTop: `1px solid ${vars.color.border}`,
    paddingTop: "12px",
  }),
  name: style({
    border: "0",
    background: "none",
    color: vars.color.text,
    padding: "0",
    fontSize: "18px",
    fontWeight: "600",
    textAlign: "left",
  }),
};
globalStyle(`${classes["project"]} h2`, { margin: "0" });
globalStyle(`${classes["project"]} p`, { margin: "0" });
globalStyle(`${classes["project"]} p`, { fontSize: "12px", color: vars.color.textMuted });
globalStyle(`${classes["name"]}:hover`, { textDecoration: "underline" });
