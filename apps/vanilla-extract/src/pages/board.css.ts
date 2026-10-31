import { style, globalStyle } from "@vanilla-extract/css";
import { boardContainer, vars } from "../theme.css";

export const classes = {
  page: style({
    minHeight: "0",
    boxSizing: "border-box",
    padding: "0",
    background: "transparent",
    color: vars.color.text,
    font: "14px/1.5 system-ui, sans-serif",
  }),
  shell: style({
    maxWidth: "none",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  }),
  header: style({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    paddingBottom: "18px",
    borderBottom: `1px solid ${vars.color.border}`,
  }),
  brand: style({ display: "flex", alignItems: "center", gap: "12px" }),
  mark: style({
    display: "grid",
    width: "34px",
    height: "34px",
    placeItems: "center",
    borderRadius: "10px",
    background: vars.color.brand,
    color: vars.color.primaryInk,
    fontWeight: "700",
  }),
  eyebrow: style({
    margin: "0",
    color: vars.color.textMuted,
    fontSize: "11px",
    letterSpacing: "0.08em",
  }),
  headerActions: style({ display: "flex", alignItems: "center", gap: "10px" }),
  avatars: style({ display: "flex", alignItems: "center", gap: "0" }),
  avatar: style({
    display: "grid",
    width: "27px",
    height: "27px",
    marginLeft: "-5px",
    placeItems: "center",
    border: `2px solid ${vars.color.bg}`,
    borderRadius: "50%",
    fontSize: "10px",
  }),
  "tone-teal": style({ background: vars.color.surfaceSelected, color: vars.color.brand }),
  "tone-emerald": style({
    background: vars.color.successSoft,
    color: vars.color.success,
  }),
  "tone-amber": style({ background: vars.color.warningSoft, color: vars.color.warning }),
  "tone-rose": style({ background: vars.color.dangerSoft, color: vars.color.danger }),
  sprint: style({ color: vars.color.textMuted, fontSize: "11px" }),
  count: style({ color: vars.color.textMuted, fontSize: "11px" }),
  metrics: style({
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    border: `1px solid ${vars.color.border}`,
    borderRadius: "9px",
    background: vars.color.surface,
  }),
  progress: style({
    height: "4px",
    overflow: "hidden",
    borderRadius: "4px",
    background: vars.color.border,
  }),
  workspace: style({
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.35fr) minmax(320px, 0.9fr)",
    gap: "18px",
    alignItems: "start",
  }),
  panel: style({ containerName: boardContainer, containerType: "inline-size" }),
  panelHeading: style({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  }),
  toolbar: style({
    display: "grid",
    gap: "8px",
    alignItems: "center",
    gridTemplateColumns: "minmax(0, 1fr) minmax(140px, 180px)",
    marginTop: "18px",
  }),
  createForm: style({
    display: "grid",
    gap: "8px",
    alignItems: "center",
    gridTemplateColumns: "minmax(180px, 1fr) minmax(140px, 160px) minmax(100px, 120px) auto",
    marginTop: "14px",
  }),
  createTitle: style({ minWidth: "0" }),
  createAction: style({ whiteSpace: "nowrap" }),
  filters: style({
    display: "flex",
    gap: "4px",
    marginTop: "12px",
    borderBottom: `1px solid ${vars.color.border}`,
  }),
  filter: style({
    padding: "9px 10px",
    border: "0",
    borderBottom: "2px solid transparent",
    background: "transparent",
    color: vars.color.textMuted,
    cursor: "pointer",
    fontSize: "12px",
  }),
  filterActive: style({ borderColor: vars.color.brand, color: vars.color.brand }),
  tableHead: style({
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 100px 78px 55px 45px",
    gap: "8px",
    alignItems: "center",
    marginTop: "20px",
    padding: "0 5px 8px",
    borderBottom: `1px solid ${vars.color.border}`,
    color: vars.color.textMuted,
    fontSize: "11px",
  }),
  row: style({
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 100px 78px 55px 45px",
    gap: "8px",
    alignItems: "center",
    minHeight: "49px",
    padding: "0 5px",
    borderBottom: `1px solid ${vars.color.border}`,
    fontSize: "11px",
    cursor: "pointer",
  }),
  rows: style({ margin: "0", padding: "0", listStyle: "none" }),
  selected: style({
    background: vars.color.surfaceSelected,
    boxShadow: `inset 2px 0 ${vars.color.brand}`,
  }),
  issue: style({ display: "flex", minWidth: "0", alignItems: "center", gap: "7px" }),
  issueTitle: style({
    minWidth: "0",
    border: "0",
    padding: "0",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    textAlign: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  done: style({ color: vars.color.textMuted, textDecoration: "line-through" }),
  category: style({
    overflow: "hidden",
    color: vars.color.textMuted,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  badge: style({
    width: "max-content",
    padding: "3px 7px",
    borderRadius: "20px",
    background: vars.color.surfaceHover,
    color: vars.color.textMuted,
    fontSize: "10px",
  }),
  "priority-high": style({ background: vars.color.dangerSoft, color: vars.color.danger }),
  "priority-medium": style({
    background: vars.color.warningSoft,
    color: vars.color.warning,
  }),
  "priority-low": style({
    background: vars.color.successSoft,
    color: vars.color.success,
  }),
  delete: style({
    border: "0",
    background: "transparent",
    color: vars.color.textMuted,
    fontSize: "10px",
    cursor: "pointer",
  }),
  empty: style({ padding: "24px", textAlign: "center", color: vars.color.textMuted }),
  footer: style({ paddingTop: "12px", color: vars.color.textMuted, fontSize: "11px" }),
  detailTop: style({
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "10px",
    paddingBottom: "14px",
    borderBottom: `1px solid ${vars.color.border}`,
  }),
  meta: style({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    margin: "0",
    padding: "16px 0",
    borderBottom: `1px solid ${vars.color.border}`,
  }),
  detailSection: style({ marginTop: "16px" }),
  criteria: style({ margin: "0", padding: "0", listStyle: "none" }),
  activity: style({ margin: "0", padding: "0", listStyle: "none" }),
  detailActions: style({
    display: "flex",
    gap: "8px",
    marginTop: "18px",
    paddingTop: "14px",
    borderTop: `1px solid ${vars.color.border}`,
  }),
  compareNote: style({
    margin: "0",
    textAlign: "center",
    color: vars.color.textMuted,
    fontSize: "11px",
  }),
};
globalStyle(`${classes["brand"]} h1`, { margin: "0", fontSize: "22px", fontWeight: "600" });
globalStyle(`${classes["metrics"]} > div`, {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  padding: "18px 20px",
  borderRight: `1px solid ${vars.color.border}`,
  color: vars.color.textMuted,
  fontSize: "12px",
});
globalStyle(`${classes["metrics"]} > div:last-child`, { border: "0" });
globalStyle(`${classes["metrics"]} strong`, {
  color: vars.color.text,
  fontSize: "24px",
  lineHeight: "1.2",
});
globalStyle(`${classes["metrics"]} small`, { fontSize: "11px" });
globalStyle(`${classes["progress"]} i`, {
  display: "block",
  height: "100%",
  background: vars.color.brand,
});
globalStyle(`${classes["panelHeading"]} h2`, { margin: "0", fontSize: "16px" });
globalStyle(`${classes["panelHeading"]} p`, {
  margin: "4px 0 0",
  color: vars.color.textMuted,
  fontSize: "12px",
});
globalStyle(`${classes["createForm"]}`, {
  "@container": {
    [`${boardContainer} (max-width: 640px)`]: {
      gridTemplateColumns: "minmax(0, 1fr) minmax(100px, 140px) auto",
    },
  },
});
globalStyle(`${classes["createTitle"]}`, {
  "@container": { [`${boardContainer} (max-width: 640px)`]: { gridColumn: "1 / -1" } },
});
globalStyle(`${classes["toolbar"]}`, {
  "@container": {
    [`${boardContainer} (max-width: 380px)`]: { gridTemplateColumns: "minmax(0, 1fr)" },
  },
});
globalStyle(`${classes["createForm"]}`, {
  "@container": {
    [`${boardContainer} (max-width: 380px)`]: { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" },
  },
});
globalStyle(`${classes["createAction"]}`, {
  "@container": { [`${boardContainer} (max-width: 380px)`]: { gridColumn: "1 / -1" } },
});
globalStyle(`${classes["filter"]} span`, { marginLeft: "4px", fontSize: "10px" });
globalStyle(`${classes["row"]}:hover`, { background: vars.color.surfaceHover });
globalStyle(`${classes["selected"]}:hover`, { background: vars.color.surfaceSelected });
globalStyle(`${classes["row"]}:focus-within`, {
  outline: `2px solid ${vars.color.brand}`,
  outlineOffset: "-2px",
});
globalStyle(`${classes["issue"]} code`, {
  color: vars.color.textMuted,
  fontSize: "10px",
  flexShrink: "0",
  whiteSpace: "nowrap",
});
globalStyle(`${classes["detailTop"]} h2`, {
  margin: "5px 0 0",
  fontSize: "16px",
  lineHeight: "1.4",
});
globalStyle(`${classes["meta"]} div`, { display: "grid", gap: "4px" });
globalStyle(`${classes["meta"]} dt`, { color: vars.color.textMuted, fontSize: "11px" });
globalStyle(`${classes["meta"]} dd`, { margin: "0", fontSize: "12px", fontWeight: "500" });
globalStyle(`${classes["detailSection"]} h3`, {
  margin: "0 0 8px",
  color: vars.color.textMuted,
  fontSize: "12px",
});
globalStyle(`${classes["detailSection"]} p`, {
  margin: "0",
  color: vars.color.text,
  fontSize: "12px",
  lineHeight: "1.6",
});
globalStyle(`${classes["criteria"]} li`, {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  padding: "8px 0",
  borderBottom: `1px solid ${vars.color.border}`,
  fontSize: "11px",
});
globalStyle(`${classes["activity"]} li`, {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
  padding: "8px 0",
  borderBottom: `1px solid ${vars.color.border}`,
  fontSize: "11px",
});
globalStyle(`${classes["activity"]} li`, { border: "0" });
globalStyle(`${classes["criteria"]} small`, {
  color: vars.color.textMuted,
  whiteSpace: "nowrap",
});
globalStyle(`${classes["activity"]} small`, {
  color: vars.color.textMuted,
  whiteSpace: "nowrap",
});
globalStyle(`${classes["workspace"]}`, {
  "@media": { "(max-width: 1000px)": { gridTemplateColumns: "1fr" } },
});
globalStyle(`${classes["metrics"]}`, {
  "@media": { "(max-width: 800px)": { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" } },
});
globalStyle(`${classes["tableHead"]}`, {
  "@container": {
    [`${boardContainer} (max-width: 560px)`]: { gridTemplateColumns: "minmax(0, 1fr) 70px 42px" },
  },
});
globalStyle(`${classes["row"]}`, {
  "@container": {
    [`${boardContainer} (max-width: 560px)`]: { gridTemplateColumns: "minmax(0, 1fr) 70px 42px" },
  },
});
globalStyle(`${classes["tableHead"]} > *:nth-child(2)`, {
  "@container": { [`${boardContainer} (max-width: 560px)`]: { display: "none" } },
});
globalStyle(`${classes["tableHead"]} > *:nth-child(4)`, {
  "@container": { [`${boardContainer} (max-width: 560px)`]: { display: "none" } },
});
globalStyle(`${classes["row"]} > *:nth-child(2)`, {
  "@container": { [`${boardContainer} (max-width: 560px)`]: { display: "none" } },
});
globalStyle(`${classes["row"]} > *:nth-child(4)`, {
  "@container": { [`${boardContainer} (max-width: 560px)`]: { display: "none" } },
});
