import { For, Show } from "solid-js";
import { type IssueTrackerStore, PRIORITY_LABELS } from "utils";
import {
  actionButton,
  avatar,
  breadcrumbRow,
  emptyState,
  issueKey,
  panel,
  pill,
  priorityDot,
  taskTitle,
} from "../styles";
import { style, vars } from "../zyzz.config";

const inspectorHeader = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "12px",
  paddingBottom: "14px",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.rule,
});

const inspectorTitleBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

const inspectorTitle = style({
  margin: 0,
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: 1.35,
});

const metaGrid = style({
  margin: 0,
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  rowGap: "12px",
  columnGap: "16px",
  paddingBottom: "16px",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.rule,
});

const metaItem = style({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

const metaLabel = style({
  margin: 0,
  fontSize: "12px",
  color: vars.color.textMuted,
});

const metaValue = style({
  margin: 0,
  fontSize: "13px",
  fontWeight: 500,
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
});

const assigneeCell = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "12px",
  color: vars.color.textMuted,
});

const sectionBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const sectionTitle = style({
  margin: 0,
  fontSize: "12px",
  fontWeight: 600,
  color: vars.color.textMuted,
});

const descriptionText = style({
  margin: 0,
  fontSize: "13px",
  lineHeight: 1.55,
  color: vars.color.text,
});

const checklistGroup = style({
  listStyleType: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
});

const checklistItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "8px",
  paddingBlock: "8px",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.rule,
  fontSize: "13px",
  ":first-child": {
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: vars.color.rule,
  },
});

const activityList = style({
  listStyleType: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const activityItem = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: vars.space.sm,
  fontSize: "12px",
  color: vars.color.textSubtle,
});

const activityAuthor = style({
  fontWeight: 500,
  color: vars.color.text,
});

const inspectorFooter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  paddingTop: "14px",
  borderTopWidth: "1px",
  borderTopStyle: "solid",
  borderTopColor: vars.color.rule,
});

interface IssueInspectorProps {
  tracker: IssueTrackerStore;
}

export function IssueInspector(props: IssueInspectorProps) {
  return (
    <aside class={panel().class}>
      <Show
        when={props.tracker.selectedTask()}
        fallback={<p class={emptyState().class}>Select an issue to inspect its details.</p>}
      >
        {(current) => (
          <>
            <div class={inspectorHeader().class}>
              <div class={inspectorTitleBlock().class}>
                <div class={breadcrumbRow().class}>
                  <span class={issueKey().class}>{current().key}</span>
                  <span>·</span>
                  <span>{current().category}</span>
                </div>
                <h2 class={inspectorTitle().class}>{current().title}</h2>
              </div>
              <span class={pill({ tone: current().priority }).class}>
                <span class={priorityDot().class} />
                {PRIORITY_LABELS[current().priority]}
              </span>
            </div>

            {/* Metadata Grid */}
            <dl class={metaGrid().class}>
              <div class={metaItem().class}>
                <dt class={metaLabel().class}>Status</dt>
                <dd class={metaValue().class}>
                  <span class={pill({ tone: current().done ? "low" : "brand" }).class}>
                    {current().done ? "Completed" : "In Progress"}
                  </span>
                </dd>
              </div>

              <div class={metaItem().class}>
                <dt class={metaLabel().class}>Assignee</dt>
                <dd class={metaValue().class}>
                  <span class={assigneeCell().class}>
                    <span class={avatar({ tone: current().avatar }).class}>
                      {current().assignee}
                    </span>
                    <span>{current().assignee}</span>
                  </span>
                </dd>
              </div>

              <div class={metaItem().class}>
                <dt class={metaLabel().class}>Target date</dt>
                <dd class={metaValue().class}>{current().due}</dd>
              </div>

              <div class={metaItem().class}>
                <dt class={metaLabel().class}>Estimate</dt>
                <dd class={metaValue().class}>{current().estimate}</dd>
              </div>
            </dl>

            {/* Specification Summary */}
            <div class={sectionBlock().class}>
              <h3 class={sectionTitle().class}>Specification</h3>
              <p class={descriptionText().class}>{current().summary}</p>
            </div>

            {/* Subtask Checklist */}
            <div class={sectionBlock().class}>
              <h3 class={sectionTitle().class}>Acceptance Criteria</h3>
              <ul class={checklistGroup().class}>
                <For each={current().subtasks}>
                  {(sub) => (
                    <li class={checklistItem().class}>
                      <span class={taskTitle({ done: sub.done }).class}>{sub.label}</span>
                      <span class={pill({ tone: sub.done ? "low" : "neutral" }).class}>
                        {sub.done ? "Done" : "Pending"}
                      </span>
                    </li>
                  )}
                </For>
              </ul>
            </div>

            {/* Activity Log */}
            <div class={sectionBlock().class}>
              <h3 class={sectionTitle().class}>Recent Activity</h3>
              <ul class={activityList().class}>
                <For each={current().activity}>
                  {(entry) => (
                    <li class={activityItem().class}>
                      <span>
                        <span class={activityAuthor().class}>{entry.author}</span> {entry.action}
                      </span>
                      <span>{entry.time}</span>
                    </li>
                  )}
                </For>
              </ul>
            </div>

            {/* Inspector Footer Actions */}
            <div class={inspectorFooter().class}>
              <button
                type="button"
                class={actionButton({ tone: "neutral", size: "sm" }).class}
                onClick={() => props.tracker.cyclePriority(current().id)}
              >
                Cycle Priority
              </button>
              <button
                type="button"
                class={
                  actionButton({
                    tone: current().done ? "neutral" : "success",
                    size: "sm",
                  }).class
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
