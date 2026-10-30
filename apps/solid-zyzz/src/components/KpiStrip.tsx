import { CATEGORIES, type IssueTrackerStore } from "utils";
import { pill, priorityDot } from "../styles";
import { style, vars } from "../zyzz.config";

const statsGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
  backgroundColor: vars.color.surface,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.border,
  borderRadius: vars.radius.md,
  "@media (max-width: 900px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  "@media (max-width: 540px)": {
    gridTemplateColumns: "minmax(0, 1fr)",
  },
});

const statCard = style({
  paddingBlock: "18px",
  paddingInline: "22px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  borderLeftWidth: "1px",
  borderLeftStyle: "solid",
  borderLeftColor: vars.color.border,
  ":first-child": {
    borderLeftWidth: "0px",
  },
  "@media (max-width: 900px)": {
    ":nth-child(2n + 1)": {
      borderLeftWidth: "0px",
    },
    ":nth-child(n + 3)": {
      borderTopWidth: "1px",
      borderTopStyle: "solid",
      borderTopColor: vars.color.border,
    },
  },
  "@media (max-width: 540px)": {
    paddingBlock: "16px",
    paddingInline: "18px",
    borderLeftWidth: "0px",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: vars.color.border,
    ":first-child": {
      borderTopWidth: "0px",
    },
  },
});

const statLabel = style({
  fontSize: "13px",
  fontWeight: 500,
  color: vars.color.textMuted,
});

const statValueRow = style({
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "8px",
});

const statValue = style({
  fontSize: "26px",
  fontWeight: 600,
  lineHeight: 1.15,
  letterSpacing: "-0.02em",
  fontVariantNumeric: "tabular-nums",
});

const appSubtitle = style({
  margin: 0,
  fontSize: "13px",
  color: vars.color.textMuted,
});

const progressTrack = style({
  width: "100%",
  height: "6px",
  backgroundColor: vars.color.surfaceElevated,
  borderRadius: vars.radius.full,
  overflow: "hidden",
});

const progressFill = style({
  height: "100%",
  backgroundColor: vars.color.brand,
  borderRadius: vars.radius.full,
  transitionProperty: "width",
  transitionDuration: "220ms",
  transitionTimingFunction: "ease",
});

interface KpiStripProps {
  tracker: IssueTrackerStore;
}

export function KpiStrip(props: KpiStripProps) {
  return (
    <section class={statsGrid().class}>
      <article class={statCard().class}>
        <span class={statLabel().class}>Sprint progress</span>
        <div class={statValueRow().class}>
          <span class={statValue().class}>{props.tracker.completionRate()}%</span>
          <span class={pill({ tone: "low" }).class}>
            {props.tracker.completedCount()}/{props.tracker.tasks().length} Done
          </span>
        </div>
        <div class={progressTrack().class}>
          <div
            class={progressFill().class}
            style={{ width: `${props.tracker.completionRate()}%` }}
          />
        </div>
      </article>

      <article class={statCard().class}>
        <span class={statLabel().class}>Open issues</span>
        <div class={statValueRow().class}>
          <span class={statValue().class}>{props.tracker.activeCount()}</span>
          <span class={pill({ tone: "brand" }).class}>In Queue</span>
        </div>
        <span class={appSubtitle().class}>Active engineering tasks</span>
      </article>

      <article class={statCard().class}>
        <span class={statLabel().class}>High priority</span>
        <div class={statValueRow().class}>
          <span class={statValue().class}>{props.tracker.highPriorityActiveCount()}</span>
          <span class={pill({ tone: "high" }).class}>
            <span class={priorityDot().class} />
            Urgent
          </span>
        </div>
        <span class={appSubtitle().class}>Requires immediate review</span>
      </article>

      <article class={statCard().class}>
        <span class={statLabel().class}>Categories</span>
        <div class={statValueRow().class}>
          <span class={statValue().class}>{CATEGORIES.length}</span>
          <span class={pill({ tone: "neutral" }).class}>Scoped</span>
        </div>
        <span class={appSubtitle().class}>Tokens, SSR, A11y &amp; Compiler</span>
      </article>
    </section>
  );
}
