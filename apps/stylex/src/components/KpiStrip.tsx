import * as stylex from "@stylexjs/stylex";
import { CATEGORIES, type IssueTrackerStore } from "utils";
import { primitives } from "../styles";
import { tokens } from "../tokens.stylex";

const styles = stylex.create({
  statsGrid: {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: {
      default: "repeat(4, minmax(0, 1fr))",
      "@media (max-width: 900px)": "repeat(2, minmax(0, 1fr))",
      "@media (max-width: 540px)": "minmax(0, 1fr)",
    },
    backgroundColor: tokens.surface,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: tokens.border,
    borderRadius: tokens.radiusMd,
  },
  statCard: {
    boxSizing: "border-box",
    paddingBlock: {
      default: "18px",
      "@media (max-width: 540px)": "16px",
    },
    paddingInline: {
      default: "22px",
      "@media (max-width: 540px)": "18px",
    },
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    borderLeftWidth: {
      default: "1px",
      ":first-child": 0,
      "@media (max-width: 900px)": {
        default: "1px",
        ":nth-child(2n + 1)": 0,
      },
      "@media (max-width: 540px)": 0,
    },
    borderLeftStyle: "solid",
    borderLeftColor: tokens.border,
    borderTopWidth: {
      default: 0,
      "@media (max-width: 900px)": {
        default: 0,
        ":nth-child(n + 3)": "1px",
      },
      "@media (max-width: 540px)": {
        default: "1px",
        ":first-child": 0,
      },
    },
    borderTopStyle: "solid",
    borderTopColor: tokens.border,
  },
  statLabel: {
    fontSize: "13px",
    fontWeight: 500,
    color: tokens.textMuted,
  },
  statValueRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: "8px",
  },
  statValue: {
    fontSize: "26px",
    fontWeight: 600,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    fontVariantNumeric: "tabular-nums",
  },
  appSubtitle: {
    margin: 0,
    fontSize: "13px",
    color: tokens.textMuted,
  },
  progressTrack: {
    width: "100%",
    height: "6px",
    backgroundColor: tokens.surfaceElevated,
    borderRadius: tokens.radiusFull,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: tokens.brand,
    borderRadius: tokens.radiusFull,
    transitionProperty: "width",
    transitionDuration: "220ms",
    transitionTimingFunction: "ease",
  },
});

interface KpiStripProps {
  tracker: IssueTrackerStore;
}

export function KpiStrip(props: KpiStripProps) {
  return (
    <section class={stylex.attrs(styles.statsGrid).class}>
      <article class={stylex.attrs(styles.statCard).class}>
        <span class={stylex.attrs(styles.statLabel).class}>Sprint progress</span>
        <div class={stylex.attrs(styles.statValueRow).class}>
          <span class={stylex.attrs(styles.statValue).class}>
            {props.tracker.completionRate()}%
          </span>
          <span class={stylex.attrs(primitives.pillBase, primitives.pillLow).class}>
            {props.tracker.completedCount()}/{props.tracker.tasks().length} Done
          </span>
        </div>
        <div class={stylex.attrs(styles.progressTrack).class}>
          <div
            class={stylex.attrs(styles.progressFill).class}
            style={{ width: `${props.tracker.completionRate()}%` }}
          />
        </div>
      </article>

      <article class={stylex.attrs(styles.statCard).class}>
        <span class={stylex.attrs(styles.statLabel).class}>Open issues</span>
        <div class={stylex.attrs(styles.statValueRow).class}>
          <span class={stylex.attrs(styles.statValue).class}>{props.tracker.activeCount()}</span>
          <span class={stylex.attrs(primitives.pillBase, primitives.pillBrand).class}>
            In Queue
          </span>
        </div>
        <span class={stylex.attrs(styles.appSubtitle).class}>Active engineering tasks</span>
      </article>

      <article class={stylex.attrs(styles.statCard).class}>
        <span class={stylex.attrs(styles.statLabel).class}>High priority</span>
        <div class={stylex.attrs(styles.statValueRow).class}>
          <span class={stylex.attrs(styles.statValue).class}>
            {props.tracker.highPriorityActiveCount()}
          </span>
          <span class={stylex.attrs(primitives.pillBase, primitives.pillHigh).class}>
            <span class={stylex.attrs(primitives.priorityDot).class} />
            Urgent
          </span>
        </div>
        <span class={stylex.attrs(styles.appSubtitle).class}>Requires immediate review</span>
      </article>

      <article class={stylex.attrs(styles.statCard).class}>
        <span class={stylex.attrs(styles.statLabel).class}>Categories</span>
        <div class={stylex.attrs(styles.statValueRow).class}>
          <span class={stylex.attrs(styles.statValue).class}>{CATEGORIES.length}</span>
          <span class={stylex.attrs(primitives.pillBase, primitives.pillNeutral).class}>
            Scoped
          </span>
        </div>
        <span class={stylex.attrs(styles.appSubtitle).class}>Tokens, SSR, A11y &amp; Compiler</span>
      </article>
    </section>
  );
}
