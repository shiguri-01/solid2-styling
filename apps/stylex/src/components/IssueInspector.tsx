import * as stylex from "@stylexjs/stylex";
import { For, Show } from "solid-js";
import { type IssueTrackerStore, PRIORITY_LABELS } from "utils";
import { avatarColorMap, primitives, priorityPillMap } from "../styles";
import { tokens } from "../tokens.stylex";

const styles = stylex.create({
  inspectorHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "12px",
    paddingBottom: "14px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.rule,
  },
  inspectorTitleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  inspectorTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: 1.35,
  },
  metaGrid: {
    margin: 0,
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    rowGap: "12px",
    columnGap: "16px",
    paddingBottom: "16px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.rule,
  },
  metaItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  metaLabel: {
    margin: 0,
    fontSize: "12px",
    color: tokens.textMuted,
  },
  metaValue: {
    margin: 0,
    fontSize: "13px",
    fontWeight: 500,
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  assigneeCell: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    color: tokens.textMuted,
  },
  sectionBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  sectionTitle: {
    margin: 0,
    fontSize: "12px",
    fontWeight: 600,
    color: tokens.textMuted,
  },
  descriptionText: {
    margin: 0,
    fontSize: "13px",
    lineHeight: 1.55,
    color: tokens.text,
  },
  checklistGroup: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },
  checklistItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    paddingBlock: "8px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.rule,
    borderTopWidth: {
      default: 0,
      ":first-child": "1px",
    },
    borderTopStyle: "solid",
    borderTopColor: tokens.rule,
    fontSize: "13px",
  },
  activityList: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  activityItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spaceSm,
    fontSize: "12px",
    color: tokens.textSubtle,
  },
  activityAuthor: {
    fontWeight: 500,
    color: tokens.text,
  },
  inspectorFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    paddingTop: "14px",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: tokens.rule,
  },
});

interface IssueInspectorProps {
  tracker: IssueTrackerStore;
}

export function IssueInspector(props: IssueInspectorProps) {
  return (
    <aside class={stylex.attrs(primitives.panel).class}>
      <Show
        when={props.tracker.selectedTask()}
        fallback={
          <p class={stylex.attrs(primitives.emptyState).class}>
            Select an issue to inspect its details.
          </p>
        }
      >
        {(current) => (
          <>
            <div class={stylex.attrs(styles.inspectorHeader).class}>
              <div class={stylex.attrs(styles.inspectorTitleBlock).class}>
                <div class={stylex.attrs(primitives.breadcrumbRow).class}>
                  <span class={stylex.attrs(primitives.issueKey).class}>{current().key}</span>
                  <span>·</span>
                  <span>{current().category}</span>
                </div>
                <h2 class={stylex.attrs(styles.inspectorTitle).class}>{current().title}</h2>
              </div>
              <span
                class={stylex.attrs(primitives.pillBase, priorityPillMap[current().priority]).class}
              >
                <span class={stylex.attrs(primitives.priorityDot).class} />
                {PRIORITY_LABELS[current().priority]}
              </span>
            </div>

            {/* Metadata Grid */}
            <dl class={stylex.attrs(styles.metaGrid).class}>
              <div class={stylex.attrs(styles.metaItem).class}>
                <dt class={stylex.attrs(styles.metaLabel).class}>Status</dt>
                <dd class={stylex.attrs(styles.metaValue).class}>
                  <span
                    class={
                      stylex.attrs(
                        primitives.pillBase,
                        current().done ? primitives.pillLow : primitives.pillBrand,
                      ).class
                    }
                  >
                    {current().done ? "Completed" : "In Progress"}
                  </span>
                </dd>
              </div>

              <div class={stylex.attrs(styles.metaItem).class}>
                <dt class={stylex.attrs(styles.metaLabel).class}>Assignee</dt>
                <dd class={stylex.attrs(styles.metaValue).class}>
                  <span class={stylex.attrs(styles.assigneeCell).class}>
                    <span
                      class={
                        stylex.attrs(primitives.avatarBase, avatarColorMap[current().avatar]).class
                      }
                    >
                      {current().assignee}
                    </span>
                    <span>{current().assignee}</span>
                  </span>
                </dd>
              </div>

              <div class={stylex.attrs(styles.metaItem).class}>
                <dt class={stylex.attrs(styles.metaLabel).class}>Target date</dt>
                <dd class={stylex.attrs(styles.metaValue).class}>{current().due}</dd>
              </div>

              <div class={stylex.attrs(styles.metaItem).class}>
                <dt class={stylex.attrs(styles.metaLabel).class}>Estimate</dt>
                <dd class={stylex.attrs(styles.metaValue).class}>{current().estimate}</dd>
              </div>
            </dl>

            {/* Specification Summary */}
            <div class={stylex.attrs(styles.sectionBlock).class}>
              <h3 class={stylex.attrs(styles.sectionTitle).class}>Specification</h3>
              <p class={stylex.attrs(styles.descriptionText).class}>{current().summary}</p>
            </div>

            {/* Subtask Checklist */}
            <div class={stylex.attrs(styles.sectionBlock).class}>
              <h3 class={stylex.attrs(styles.sectionTitle).class}>Acceptance Criteria</h3>
              <ul class={stylex.attrs(styles.checklistGroup).class}>
                <For each={current().subtasks}>
                  {(sub) => (
                    <li class={stylex.attrs(styles.checklistItem).class}>
                      <span
                        class={
                          stylex.attrs(primitives.taskTitle, sub.done && primitives.taskTitleDone)
                            .class
                        }
                      >
                        {sub.label}
                      </span>
                      <span
                        class={
                          stylex.attrs(
                            primitives.pillBase,
                            sub.done ? primitives.pillLow : primitives.pillNeutral,
                          ).class
                        }
                      >
                        {sub.done ? "Done" : "Pending"}
                      </span>
                    </li>
                  )}
                </For>
              </ul>
            </div>

            {/* Activity Log */}
            <div class={stylex.attrs(styles.sectionBlock).class}>
              <h3 class={stylex.attrs(styles.sectionTitle).class}>Recent Activity</h3>
              <ul class={stylex.attrs(styles.activityList).class}>
                <For each={current().activity}>
                  {(entry) => (
                    <li class={stylex.attrs(styles.activityItem).class}>
                      <span>
                        <span class={stylex.attrs(styles.activityAuthor).class}>
                          {entry.author}
                        </span>{" "}
                        {entry.action}
                      </span>
                      <span>{entry.time}</span>
                    </li>
                  )}
                </For>
              </ul>
            </div>

            {/* Inspector Footer Actions */}
            <div class={stylex.attrs(styles.inspectorFooter).class}>
              <button
                type="button"
                class={
                  stylex.attrs(primitives.buttonBase, primitives.toneNeutral, primitives.sizeSm)
                    .class
                }
                onClick={() => props.tracker.cyclePriority(current().id)}
              >
                Cycle Priority
              </button>
              <button
                type="button"
                class={
                  stylex.attrs(
                    primitives.buttonBase,
                    current().done ? primitives.toneNeutral : primitives.toneSuccess,
                    primitives.sizeSm,
                  ).class
                }
                onClick={() => props.tracker.toggleTask(current().id)}
              >
                {current().done ? "Reopen Issue" : "Mark Complete"}
              </button>
            </div>
          </>
        )}
      </Show>
    </aside>
  );
}
