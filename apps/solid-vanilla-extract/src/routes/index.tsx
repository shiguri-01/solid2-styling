import { Title } from "@solidjs/meta";
import { createIssueTracker } from "utils";
import { HeaderBar } from "../components/HeaderBar";
import { IssueInspector } from "../components/IssueInspector";
import { IssueTable } from "../components/IssueTable";
import { KpiStrip } from "../components/KpiStrip";
import { container, pageShell, workspaceGrid } from "../styles.css";
import { darkTheme, lightTheme } from "../theme.css";

export default function Home() {
  const tracker = createIssueTracker();

  return (
    <div class={`${tracker.isDark() ? darkTheme : lightTheme} ${pageShell}`}>
      <Title>Solid 2.0 × vanilla-extract — Issue Tracker</Title>
      <div class={container}>
        <HeaderBar tracker={tracker} />
        <KpiStrip tracker={tracker} />

        <div class={workspaceGrid}>
          <IssueTable tracker={tracker} />
          <IssueInspector tracker={tracker} />
        </div>
      </div>
    </div>
  );
}
