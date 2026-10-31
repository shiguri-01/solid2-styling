import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "../theme.css";
import { rowSpace } from "../workspace.css";

export const classes = {
  scope: style({ display: "grid", fontSize: "12px", gap: "6px" }),
  metrics: style({
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    margin: "0 0 24px",
    padding: "20px 0",
    borderBlock: `1px solid ${vars.color.border}`,
  }),
  columns: style({
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "24px",
    marginBottom: "24px",
  }),
  panel: style({}),
  barRow: style({ marginTop: "22px" }),
  priority: style({
    display: "flex",
    justifyContent: "space-between",
    paddingBlock: `${rowSpace}`,
    borderBottom: `1px solid ${vars.color.border}`,
  }),
  note: style({ marginTop: "24px" }),
  tableScroll: style({ overflowX: "auto" }),
  table: style({ borderCollapse: "collapse", width: "100%", whiteSpace: "nowrap" }),
};
globalStyle(`${classes["metrics"]} > div`, {
  paddingInline: "20px",
  borderRight: `1px solid ${vars.color.border}`,
});
globalStyle(`${classes["metrics"]} > div:last-child`, { border: "0" });
globalStyle(`${classes["metrics"]} dt`, { color: vars.color.textMuted, fontSize: "12px" });
globalStyle(`${classes["metrics"]} dd`, {
  margin: "6px 0 0",
  fontSize: "28px",
  fontVariantNumeric: "tabular-nums",
});
globalStyle(`${classes["metrics"]} small`, { fontSize: "14px", color: vars.color.textMuted });
globalStyle(`${classes["panel"]} h2`, { fontSize: "16px", margin: "0 0 8px", fontWeight: "600" });
globalStyle(`${classes["panel"]} p`, { color: vars.color.textMuted, fontSize: "13px" });
globalStyle(`${classes["barRow"]} > div:first-child`, {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "8px",
  fontSize: "13px",
  fontVariantNumeric: "tabular-nums",
});
globalStyle(`${classes["table"]} :where(th, td)`, {
  padding: `${rowSpace} 12px`,
  borderBottom: `1px solid ${vars.color.border}`,
  textAlign: "right",
  fontVariantNumeric: "tabular-nums",
});
globalStyle(`${classes["table"]} th:first-child`, { textAlign: "left" });
globalStyle(`${classes["table"]} thead th`, {
  color: vars.color.textMuted,
  fontWeight: "400",
  fontSize: "12px",
});
globalStyle(`${classes["table"]} tbody th`, { fontWeight: "500" });
globalStyle(`${classes["table"]} tbody tr:hover`, { background: vars.color.surfaceHover });
globalStyle(`${classes["columns"]}`, {
  "@media": { "(max-width: 1000px)": { gridTemplateColumns: "1fr" } },
});
globalStyle(`${classes["metrics"]}`, {
  "@media": { "(max-width: 560px)": { gridTemplateColumns: "repeat(2, 1fr)", gap: "20px 0" } },
});
globalStyle(`${classes["metrics"]} > div:nth-child(2)`, {
  "@media": { "(max-width: 560px)": { border: "0" } },
});
