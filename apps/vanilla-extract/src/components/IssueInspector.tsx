import { For, Show } from "solid-js";
import { type IssueTrackerStore, PRIORITY_LABELS } from "utils";
import {
  avatarTone,
  breadcrumbRow,
  buttonSize,
  buttonTone,
  emptyState,
  issueKey,
  panel,
  priorityBadge,
  priorityDot,
  taskTitle,
} from "../styles.css";
import {
  activityAuthor,
  activityItem,
  activityList,
  assigneeCell,
  checklistGroup,
  checklistItem,
  descriptionText,
  inspectorFooter,
  inspectorHeader,
  inspectorTitle,
  inspectorTitleBlock,
  metaGrid,
  metaItem,
  metaLabel,
  metaValue,
  sectionBlock,
  sectionTitle,
} from "./IssueInspector.css";

interface IssueInspectorProps {
  tracker: IssueTrackerStore;
}

export function IssueInspector(props: IssueInspectorProps) {
  return (
    <aside class={panel}>
      <Show
        when={props.tracker.selectedTask()}
        fallback={<p class={emptyState}>Select an issue to inspect its details.</p>}
      >
        {(current) => (
          <>
            <div class={inspectorHeader}>
              <div class={inspectorTitleBlock}>
                <div class={breadcrumbRow}>
                  <span class={issueKey}>{current().key}</span>
                  <span>·</span>
                  <span>{current().category}</span>
                </div>
                <h2 class={inspectorTitle}>{current().title}</h2>
              </div>
              <span class={priorityBadge[current().priority]}>
                <span class={priorityDot} />
                {PRIORITY_LABELS[current().priority]}
              </span>
            </div>

            {/* Metadata Grid */}
            <dl class={metaGrid}>
              <div class={metaItem}>
                <dt class={metaLabel}>Status</dt>
                <dd class={metaValue}>
                  <span class={priorityBadge[current().done ? "low" : "brand"]}>
                    {current().done ? "Completed" : "In Progress"}
                  </span>
                </dd>
              </div>

              <div class={metaItem}>
                <dt class={metaLabel}>Assignee</dt>
                <dd class={metaValue}>
                  <span class={assigneeCell}>
                    <span class={avatarTone[current().avatar]}>{current().assignee}</span>
                    <span>{current().assignee}</span>
                  </span>
                </dd>
              </div>

              <div class={metaItem}>
                <dt class={metaLabel}>Target date</dt>
                <dd class={metaValue}>{current().due}</dd>
              </div>

              <div class={metaItem}>
                <dt class={metaLabel}>Estimate</dt>
                <dd class={metaValue}>{current().estimate}</dd>
              </div>
            </dl>

            {/* Specification Summary */}
            <div class={sectionBlock}>
              <h3 class={sectionTitle}>Specification</h3>
              <p class={descriptionText}>{current().summary}</p>
            </div>

            {/* Subtask Checklist */}
            <div class={sectionBlock}>
              <h3 class={sectionTitle}>Acceptance Criteria</h3>
              <ul class={checklistGroup}>
                <For each={current().subtasks}>
                  {(sub) => (
                    <li class={checklistItem}>
                      <span class={taskTitle[sub.done ? "done" : "todo"]}>{sub.label}</span>
                      <span class={priorityBadge[sub.done ? "low" : "neutral"]}>
                        {sub.done ? "Done" : "Pending"}
                      </span>
                    </li>
                  )}
                </For>
              </ul>
            </div>

            {/* Activity Log */}
            <div class={sectionBlock}>
              <h3 class={sectionTitle}>Recent Activity</h3>
              <ul class={activityList}>
                <For each={current().activity}>
                  {(entry) => (
                    <li class={activityItem}>
                      <span>
                        <span class={activityAuthor}>{entry.author}</span> {entry.action}
                      </span>
                      <span>{entry.time}</span>
                    </li>
                  )}
                </For>
              </ul>
            </div>

            {/* Inspector Footer Actions */}
            <div class={inspectorFooter}>
              <button
                type="button"
                class={`${buttonTone.neutral} ${buttonSize.sm}`}
                onClick={() => props.tracker.cyclePriority(current().id)}
              >
                Cycle Priority
              </button>
              <button
                type="button"
                class={`${buttonTone[current().done ? "neutral" : "success"]} ${buttonSize.sm}`}
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
