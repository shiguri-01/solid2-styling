import { Title } from "@solidjs/meta";
import { createIssueTracker } from "utils";
import { cx } from "zyzz";
import { HeaderBar } from "../components/HeaderBar";
import { IssueInspector } from "../components/IssueInspector";
import { IssueTable } from "../components/IssueTable";
import { KpiStrip } from "../components/KpiStrip";
import { style, vars } from "../zyzz.config";

const fontSans = '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const pageShell = style({
  minHeight: "100svh",
  backgroundColor: vars.color.bg,
  color: vars.color.text,
  fontFamily: fontSans,
  transitionProperty: "background-color, color",
  transitionDuration: "180ms",
  transitionTimingFunction: "ease",
  paddingTop: vars.space.xl,
  paddingInline: vars.space.xl,
  paddingBottom: "56px",
  "@media (max-width: 640px)": {
    paddingTop: vars.space.lg,
    paddingInline: vars.space.lg,
    paddingBottom: "40px",
  },
});

const container = style({
  maxWidth: "1200px",
  marginBlock: 0,
  marginInline: "auto",
  display: "flex",
  flexDirection: "column",
  gap: vars.space.xl,
});

const workspaceGrid = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 7fr) minmax(320px, 5fr)",
  gap: "24px",
  alignItems: "stretch",
  "@media (max-width: 960px)": {
    gridTemplateColumns: "minmax(0, 1fr)",
  },
});

export default function Home() {
  const tracker = createIssueTracker();

  return (
    <div class={cx(vars({ colorScheme: tracker.isDark() ? "dark" : "light" }), pageShell()).class}>
      <Title>Solid 2.0 × Zyzz — Issue Tracker</Title>
      <div class={container().class}>
        <HeaderBar tracker={tracker} />
        <KpiStrip tracker={tracker} />

        <div class={workspaceGrid().class}>
          <IssueTable tracker={tracker} />
          <IssueInspector tracker={tracker} />
        </div>
      </div>
    </div>
  );
}
