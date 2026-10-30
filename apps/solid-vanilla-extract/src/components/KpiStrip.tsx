import { CATEGORIES, type IssueTrackerStore } from "utils";
import { priorityBadge, priorityDot } from "../styles.css";
import {
  appSubtitle,
  progressFill,
  progressTrack,
  statCard,
  statLabel,
  statsGrid,
  statValue,
  statValueRow,
} from "./KpiStrip.css";

interface KpiStripProps {
  tracker: IssueTrackerStore;
}

export function KpiStrip(props: KpiStripProps) {
  return (
    <section class={statsGrid}>
      <article class={statCard}>
        <span class={statLabel}>Sprint progress</span>
        <div class={statValueRow}>
          <span class={statValue}>{props.tracker.completionRate()}%</span>
          <span class={priorityBadge.low}>
            {props.tracker.completedCount()}/{props.tracker.tasks().length} Done
          </span>
        </div>
        <div class={progressTrack}>
          <div class={progressFill} style={{ width: `${props.tracker.completionRate()}%` }} />
        </div>
      </article>

      <article class={statCard}>
        <span class={statLabel}>Open issues</span>
        <div class={statValueRow}>
          <span class={statValue}>{props.tracker.activeCount()}</span>
          <span class={priorityBadge.brand}>In Queue</span>
        </div>
        <span class={appSubtitle}>Active engineering tasks</span>
      </article>

      <article class={statCard}>
        <span class={statLabel}>High priority</span>
        <div class={statValueRow}>
          <span class={statValue}>{props.tracker.highPriorityActiveCount()}</span>
          <span class={priorityBadge.high}>
            <span class={priorityDot} />
            Urgent
          </span>
        </div>
        <span class={appSubtitle}>Requires immediate review</span>
      </article>

      <article class={statCard}>
        <span class={statLabel}>Categories</span>
        <div class={statValueRow}>
          <span class={statValue}>{CATEGORIES.length}</span>
          <span class={priorityBadge.neutral}>Scoped</span>
        </div>
        <span class={appSubtitle}>Tokens, SSR, A11y &amp; Compiler</span>
      </article>
    </section>
  );
}
