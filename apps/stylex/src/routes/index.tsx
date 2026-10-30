import { Title } from "@solidjs/meta";
import * as stylex from "@stylexjs/stylex";
import { createIssueTracker } from "utils";
import { HeaderBar } from "../components/HeaderBar";
import { IssueInspector } from "../components/IssueInspector";
import { IssueTable } from "../components/IssueTable";
import { KpiStrip } from "../components/KpiStrip";
import { darkTheme } from "../styles";
import { tokens } from "../tokens.stylex";

const styles = stylex.create({
  pageShell: {
    boxSizing: "border-box",
    minHeight: "100svh",
    backgroundColor: tokens.bg,
    color: tokens.text,
    fontFamily: tokens.fontSans,
    transitionProperty: "background-color, color",
    transitionDuration: "180ms",
    transitionTimingFunction: "ease",
    paddingTop: {
      default: tokens.spaceXl,
      "@media (max-width: 640px)": tokens.spaceLg,
    },
    paddingInline: {
      default: tokens.spaceXl,
      "@media (max-width: 640px)": tokens.spaceLg,
    },
    paddingBottom: {
      default: "56px",
      "@media (max-width: 640px)": "40px",
    },
  },
  container: {
    boxSizing: "border-box",
    maxWidth: "1200px",
    marginBlock: 0,
    marginInline: "auto",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spaceXl,
  },
  workspaceGrid: {
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 7fr) minmax(320px, 5fr)",
      "@media (max-width: 960px)": "minmax(0, 1fr)",
    },
    gap: "24px",
    alignItems: "stretch",
  },
});

export default function Home() {
  const tracker = createIssueTracker();

  return (
    <div class={stylex.attrs(styles.pageShell, tracker.isDark() && darkTheme).class}>
      <Title>Solid 2.0 × StyleX — Issue Tracker</Title>
      <div class={stylex.attrs(styles.container).class}>
        <HeaderBar tracker={tracker} />
        <KpiStrip tracker={tracker} />

        <div class={stylex.attrs(styles.workspaceGrid).class}>
          <IssueTable tracker={tracker} />
          <IssueInspector tracker={tracker} />
        </div>
      </div>
    </div>
  );
}
