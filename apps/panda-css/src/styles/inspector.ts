import { css } from "../../styled-system/css";

export const inspectorStyles = {
  detailTop: css({
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "10px",
    pb: "14px",
    borderBottom: "1px solid token(colors.line)",
    "& h2": { m: "5px 0 0", fontSize: "16px", lineHeight: 1.4 },
  }),
  meta: css({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
    py: "16px",
    m: 0,
    borderBottom: "1px solid token(colors.line)",
    "& div": { display: "grid", gap: "4px" },
    "& dt": { color: "muted", fontSize: "11px" },
    "& dd": { m: 0, fontSize: "12px", fontWeight: 500 },
  }),
  detailSection: css({
    mt: "16px",
    "& h3": { m: "0 0 8px", color: "muted", fontSize: "12px", fontWeight: 600 },
    "& p": { m: 0, color: "body-muted", fontSize: "12px", lineHeight: 1.6 },
  }),
  criteria: css({
    listStyle: "none",
    p: 0,
    m: 0,
    "& li": {
      display: "flex",
      justifyContent: "space-between",
      gap: "10px",
      py: "8px",
      borderBottom: "1px solid token(colors.line)",
      fontSize: "11px",
    },
    "& small": { color: "muted", whiteSpace: "nowrap" },
  }),
  activity: css({
    listStyle: "none",
    p: 0,
    m: 0,
    "& li": {
      display: "flex",
      justifyContent: "space-between",
      gap: "10px",
      py: "7px",
      fontSize: "11px",
    },
    "& small": { color: "muted", whiteSpace: "nowrap" },
  }),
  detailActions: css({
    display: "flex",
    gap: "8px",
    mt: "18px",
    pt: "14px",
    borderTop: "1px solid token(colors.line)",
  }),
  compareNote: css({ m: 0, color: "muted", fontSize: "11px", textAlign: "center" }),
};
