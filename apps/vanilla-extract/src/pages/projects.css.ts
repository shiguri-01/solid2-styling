import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../theme.css";
import { rowSpace } from "../workspace.css";

export const classes = {
  toolbar: style({
    display: "flex",
    alignItems: "end",
    gap: "24px",
    flexWrap: "wrap",
    marginBottom: "24px",
  }),
  check: style({}),
  layout: style({
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 300px",
    gap: "24px",
    alignItems: "start",
  }),
  grid: style({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "16px",
    containerType: "inline-size",
  }),
  detail: style({}),
  issue: style({
    display: "flex",
    alignItems: "start",
    gap: "10px",
    paddingBlock: `${rowSpace}`,
    borderBottom: `1px solid ${vars.color.border}`,
  }),
  issueTitle: style({ display: "block" }),
};
globalStyle(`${classes["toolbar"]} label`, { display: "grid", gap: "6px", fontSize: "12px" });
globalStyle(`${classes["toolbar"]} ${classes["check"]}`, {
  display: "flex",
  alignItems: "center",
  paddingBottom: "8px",
});
globalStyle(`${classes["toolbar"]} > span`, {
  marginLeft: "auto",
  color: vars.color.textMuted,
});
globalStyle(`${classes["detail"]} h2`, { fontSize: "18px", margin: "0" });
globalStyle(`${classes["detail"]} p`, { color: vars.color.textMuted });
globalStyle(`${classes["issue"]} small`, { color: vars.color.textMuted });
globalStyle(`${classes["issueTitle"]}[data-done="true"]`, {
  textDecoration: "line-through",
  color: vars.color.textMuted,
});
globalStyle(`${classes["detail"]} > a`, { display: "inline-block", marginTop: "20px" });
globalStyle(`${classes["layout"]}`, {
  "@media": { "(max-width: 1200px)": { gridTemplateColumns: "1fr" } },
});
globalStyle(`${classes["grid"]}`, {
  "@media": { "(max-width: 560px)": { gridTemplateColumns: "1fr" } },
});
globalStyle(`${classes["toolbar"]} > span`, {
  "@media": { "(max-width: 560px)": { marginLeft: "0" } },
});
