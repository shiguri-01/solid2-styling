import { For, Show } from "solid-js";
import {
  CATEGORIES,
  type Category,
  FILTER_LABELS,
  FILTER_OPTIONS,
  type IssueTrackerStore,
  PRIORITY_LABELS,
  type Priority,
} from "utils";
import { cx } from "zyzz";
import { actionButton, emptyState, issueKey, panel, pill, priorityDot, taskTitle } from "../styles";
import { style, variants, vars } from "../zyzz.config";

const panelHeader = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
});

const panelTitleGroup = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

const panelTitle = style({
  margin: 0,
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: 1.3,
});

const toolbarRow = style({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  paddingBottom: "14px",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.rule,
});

const searchField = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  height: "34px",
  paddingInline: "10px",
  borderRadius: vars.radius.sm,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.control,
  backgroundColor: vars.color.surface,
  flex: "1 1 200px",
  maxWidth: "280px",
  transitionProperty: "border-color",
  transitionDuration: "140ms",
  transitionTimingFunction: "ease",
  ":focus-within": {
    borderColor: vars.color.brand,
  },
  "@media (max-width: 640px)": {
    maxWidth: "100%",
  },
});

const searchIcon = style({
  width: "14px",
  height: "14px",
  color: vars.color.textMuted,
  flexShrink: 0,
});

const searchInput = style({
  borderStyle: "none",
  backgroundColor: vars.color.transparent,
  color: vars.color.text,
  fontSize: "13px",
  width: "100%",
  outlineStyle: "none",
  "::placeholder": {
    color: vars.color.textMuted,
  },
});

const filterControls = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
});

const filterGroup = style({
  display: "inline-flex",
  width: "max-content",
  maxWidth: "100%",
  padding: "3px",
  backgroundColor: vars.color.surfaceElevated,
  borderRadius: vars.radius.sm,
  gap: "2px",
});

const filterTab = variants({
  selection: "class",
  base: {
    borderStyle: "none",
    borderRadius: vars.radius.xs,
    height: "28px",
    paddingInline: "10px",
    fontSize: "12px",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    transitionProperty: "background-color, color",
    transitionDuration: "140ms",
    transitionTimingFunction: "ease",
  },
  variants: {
    active: {
      true: {
        backgroundColor: vars.color.surface,
        color: vars.color.text,
        fontWeight: 500,
      },
      false: {
        backgroundColor: vars.color.transparent,
        color: vars.color.textMuted,
        fontWeight: 400,
        ":hover": {
          color: vars.color.text,
        },
      },
    },
  },
  defaultVariants: {
    active: false,
  },
});

const tabCount = style({
  fontSize: "11px",
  color: vars.color.textMuted,
  fontVariantNumeric: "tabular-nums",
});

const formRow = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
});

const textInput = style({
  flex: "1 1 200px",
  minWidth: "160px",
  height: "34px",
  paddingInline: "12px",
  borderRadius: vars.radius.sm,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.control,
  backgroundColor: vars.color.surface,
  color: vars.color.text,
  fontSize: "13px",
  outlineStyle: "none",
  transitionProperty: "border-color",
  transitionDuration: "140ms",
  transitionTimingFunction: "ease",
  "::placeholder": {
    color: vars.color.textMuted,
  },
  ":focus": {
    borderColor: vars.color.brand,
  },
});

const selectInput = style({
  appearance: "none",
  height: "34px",
  paddingLeft: "10px",
  paddingRight: "30px",
  borderRadius: vars.radius.sm,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.control,
  backgroundColor: vars.color.surface,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%236d7379' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") !custom`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 9px center !custom",
  backgroundSize: "12px 12px !custom",
  color: vars.color.text,
  fontSize: "12px",
  fontWeight: 500,
  cursor: "pointer",
  outlineStyle: "none",
  transitionProperty: "border-color, background-color",
  transitionDuration: "140ms",
  transitionTimingFunction: "ease",
  ":hover": {
    backgroundColor: vars.color.surfaceElevated,
  },
  ":focus": {
    borderColor: vars.color.brand,
  },
});

const tableHeader = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) 92px 84px 72px 64px",
  alignItems: "center",
  gap: "10px",
  paddingTop: 0,
  paddingInline: "8px",
  paddingBottom: "8px",
  borderBottomWidth: "1px",
  borderBottomStyle: "solid",
  borderBottomColor: vars.color.border,
  fontSize: "12px",
  fontWeight: 500,
  color: vars.color.textMuted,
  "@container (max-width: 560px)": {
    gridTemplateColumns: "minmax(0, 1fr) 80px 64px",
  },
});

const hideOnCompact = style({
  "@container (max-width: 560px)": {
    display: "none",
  },
});

const alignEnd = style({
  textAlign: "right",
});

const taskList = style({
  listStyleType: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
});

const tableFooter = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  paddingTop: "12px",
  fontSize: "12px",
  color: vars.color.textMuted,
  fontVariantNumeric: "tabular-nums",
});

const taskRow = variants({
  selection: "class",
  base: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 92px 84px 72px 64px",
    alignItems: "center",
    gap: "10px",
    paddingBlock: "13px",
    paddingInline: "8px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: vars.color.rule,
    borderLeftWidth: "2px",
    borderLeftStyle: "solid",
    borderLeftColor: vars.color.transparent,
    cursor: "pointer",
    transitionProperty: "background-color, border-color, opacity",
    transitionDuration: "120ms",
    transitionTimingFunction: "ease",
    "@container (max-width: 560px)": {
      gridTemplateColumns: "minmax(0, 1fr) 80px 64px",
    },
  },
  variants: {
    done: {
      true: { opacity: 0.72 },
      false: { opacity: 1 },
    },
    selected: {
      true: {
        backgroundColor: vars.color.surfaceSelected,
        borderLeftColor: vars.color.brand,
      },
      false: {
        backgroundColor: vars.color.transparent,
        ":hover": {
          backgroundColor: vars.color.surfaceHover,
        },
      },
    },
  },
  defaultVariants: {
    done: false,
    selected: false,
  },
});

const taskPrimaryCell = style({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  minWidth: 0,
});

const checkboxInput = style({
  width: "15px",
  height: "15px",
  margin: 0,
  accentColor: vars.color.brand,
  cursor: "pointer",
  flexShrink: 0,
});

const dueCell = style({
  fontSize: "12px",
  color: vars.color.textMuted,
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
});

const rowActionBtn = style({
  height: "26px",
  paddingInline: "8px",
  fontSize: "12px",
  fontWeight: 500,
  borderRadius: vars.radius.sm,
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: vars.color.transparent,
  backgroundColor: vars.color.transparent,
  color: vars.color.textMuted,
  cursor: "pointer",
  justifySelf: "end",
  transitionProperty: "background-color, color, border-color",
  transitionDuration: "120ms",
  transitionTimingFunction: "ease",
  "li:hover &": {
    backgroundColor: vars.color.dangerSoft,
    color: vars.color.dangerInk,
  },
  ":hover": {
    backgroundColor: vars.color.dangerSoft,
    color: vars.color.dangerInk,
  },
  ":focus-visible": {
    backgroundColor: vars.color.dangerSoft,
    color: vars.color.dangerInk,
    borderColor: vars.color.danger,
  },
});

interface IssueTableProps {
  tracker: IssueTrackerStore;
}

export function IssueTable(props: IssueTableProps) {
  return (
    <section class={panel().class}>
      <div class={panelHeader().class}>
        <div class={panelTitleGroup().class}>
          <h2 class={panelTitle().class}>Sprint Backlog</h2>
          <span class={pill({ tone: "neutral" }).class}>
            {props.tracker.filteredTasks().length} issues
          </span>
        </div>

        <div class={filterGroup().class}>
          <For each={FILTER_OPTIONS}>
            {(f) => (
              <button
                type="button"
                class={filterTab({ active: props.tracker.filter() === f }).class}
                onClick={() => props.tracker.setFilter(f)}
              >
                <span>{FILTER_LABELS[f]}</span>
                <span class={tabCount().class}>{props.tracker.countForFilter(f)}</span>
              </button>
            )}
          </For>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div class={toolbarRow().class}>
        <label class={searchField().class}>
          <svg class={searchIcon().class} viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.75" stroke="currentColor" stroke-width="1.5" />
            <path
              d="M10.5 10.5L14 14"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <input
            class={searchInput().class}
            type="search"
            placeholder="Search key, title, or tag..."
            value={props.tracker.searchQuery()}
            onInput={(e) => props.tracker.setSearchQuery(e.currentTarget.value)}
          />
        </label>

        <div class={filterControls().class}>
          <select
            class={selectInput().class}
            aria-label="Filter by category"
            value={props.tracker.categoryFilter()}
            onChange={(e) => props.tracker.setCategoryFilter(e.currentTarget.value)}
          >
            <option value="all">All Categories</option>
            <For each={CATEGORIES}>{(cat) => <option value={cat}>{cat}</option>}</For>
          </select>
        </div>
      </div>

      {/* Quick Issue Creation Form */}
      <form class={formRow().class} onSubmit={(e) => props.tracker.addTask(e)}>
        <input
          class={textInput().class}
          aria-label="New issue title"
          placeholder="Add an issue to the sprint..."
          value={props.tracker.draftTitle()}
          onInput={(e) => props.tracker.setDraftTitle(e.currentTarget.value)}
        />
        <select
          class={selectInput().class}
          aria-label="New issue category"
          value={props.tracker.draftCategory()}
          onChange={(e) => props.tracker.setDraftCategory(e.currentTarget.value as Category)}
        >
          <For each={CATEGORIES}>{(cat) => <option value={cat}>{cat}</option>}</For>
        </select>
        <select
          class={selectInput().class}
          aria-label="New issue priority"
          value={props.tracker.draftPriority()}
          onChange={(e) => props.tracker.setDraftPriority(e.currentTarget.value as Priority)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" class={actionButton({ tone: "primary", size: "md" }).class}>
          Create
        </button>
      </form>

      {/* Table Column Headers */}
      <div class={tableHeader().class}>
        <span>Issue</span>
        <span class={hideOnCompact().class}>Category</span>
        <span>Priority</span>
        <span class={hideOnCompact().class}>Due</span>
        <span class={alignEnd().class}>Action</span>
      </div>

      {/* Issue Rows */}
      <Show
        when={props.tracker.filteredTasks().length > 0}
        fallback={<p class={emptyState().class}>No issues match the current filter criteria.</p>}
      >
        <ul class={taskList().class}>
          <For each={props.tracker.filteredTasks()}>
            {(item) => (
              <li
                class={
                  taskRow({
                    done: item.done,
                    selected: props.tracker.selectedTask()?.id === item.id,
                  }).class
                }
                data-selected={props.tracker.selectedTask()?.id === item.id ? "true" : "false"}
                onClick={() => props.tracker.setSelectedId(item.id)}
              >
                <div class={taskPrimaryCell().class}>
                  <input
                    type="checkbox"
                    class={checkboxInput().class}
                    checked={item.done}
                    aria-label={`Mark ${item.key} as done`}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => props.tracker.toggleTask(item.id)}
                  />
                  <span class={issueKey().class}>{item.key}</span>
                  <span class={taskTitle({ done: item.done }).class}>{item.title}</span>
                </div>

                <span class={cx(pill({ tone: "neutral" }), hideOnCompact()).class}>
                  {item.category}
                </span>

                <span class={pill({ tone: item.priority }).class}>
                  <span class={priorityDot().class} />
                  {PRIORITY_LABELS[item.priority]}
                </span>

                <span class={cx(dueCell(), hideOnCompact()).class}>{item.due}</span>

                <button
                  type="button"
                  class={rowActionBtn().class}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.tracker.removeTask(item.id);
                  }}
                >
                  Delete
                </button>
              </li>
            )}
          </For>
        </ul>
      </Show>

      <div class={tableFooter().class}>
        <span>
          Showing {props.tracker.filteredTasks().length} of {props.tracker.tasks().length} sprint
          issues
        </span>
        <span>Click any row to inspect specification</span>
      </div>
    </section>
  );
}
