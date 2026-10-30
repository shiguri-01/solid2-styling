import * as stylex from "@stylexjs/stylex";
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
import { primitives, priorityPillMap } from "../styles";
import { rowMarker, tokens } from "../tokens.stylex";

const fadeSlideIn = stylex.keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(2px)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)",
  },
});

const styles = stylex.create({
  panelHeader: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
  },
  panelTitleGroup: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  panelTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: 1.3,
  },
  toolbarRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    paddingBottom: "14px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.rule,
  },
  searchField: {
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    height: "34px",
    paddingInline: "10px",
    borderRadius: tokens.radiusSm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: tokens.control,
      ":focus-within": tokens.brand,
    },
    backgroundColor: tokens.surface,
    flex: "1 1 200px",
    maxWidth: {
      default: "280px",
      "@media (max-width: 640px)": "100%",
    },
    transitionProperty: "border-color",
    transitionDuration: "140ms",
    transitionTimingFunction: "ease",
  },
  searchIcon: {
    width: "14px",
    height: "14px",
    color: tokens.textMuted,
    flexShrink: 0,
  },
  searchInput: {
    borderStyle: "none",
    backgroundColor: "transparent",
    color: tokens.text,
    fontFamily: "inherit",
    fontSize: "13px",
    width: "100%",
    outlineStyle: "none",
    "::placeholder": {
      color: tokens.textMuted,
    },
  },
  filterControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  filterGroup: {
    boxSizing: "border-box",
    display: "inline-flex",
    width: "max-content",
    maxWidth: "100%",
    padding: "3px",
    backgroundColor: tokens.surfaceElevated,
    borderRadius: tokens.radiusSm,
    gap: "2px",
  },
  filterTab: {
    boxSizing: "border-box",
    borderStyle: "none",
    borderRadius: "4px",
    height: "28px",
    paddingInline: "10px",
    fontFamily: "inherit",
    fontSize: "12px",
    fontWeight: 400,
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer",
    backgroundColor: "transparent",
    color: {
      default: tokens.textMuted,
      ":hover": tokens.text,
    },
    transitionProperty: "background-color, color",
    transitionDuration: "140ms",
    transitionTimingFunction: "ease",
  },
  filterTabActive: {
    backgroundColor: tokens.surface,
    color: {
      default: tokens.text,
      ":hover": tokens.text,
    },
    fontWeight: 500,
  },
  tabCount: {
    fontSize: "11px",
    color: tokens.textMuted,
    fontVariantNumeric: "tabular-nums",
  },
  formRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  textInput: {
    boxSizing: "border-box",
    flex: "1 1 200px",
    minWidth: "160px",
    height: "34px",
    paddingInline: "12px",
    borderRadius: tokens.radiusSm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: tokens.control,
      ":focus": tokens.brand,
    },
    backgroundColor: tokens.surface,
    color: tokens.text,
    fontFamily: "inherit",
    fontSize: "13px",
    outlineStyle: "none",
    transitionProperty: "border-color",
    transitionDuration: "140ms",
    transitionTimingFunction: "ease",
    "::placeholder": {
      color: tokens.textMuted,
    },
  },
  selectInput: {
    boxSizing: "border-box",
    appearance: "none",
    WebkitAppearance: "none",
    height: "34px",
    paddingLeft: "10px",
    paddingRight: "30px",
    borderRadius: tokens.radiusSm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: tokens.control,
      ":focus": tokens.brand,
    },
    backgroundColor: {
      default: tokens.surface,
      ":hover": tokens.surfaceElevated,
    },
    backgroundImage: tokens.chevron,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 9px center",
    backgroundSize: "12px 12px",
    color: tokens.text,
    fontFamily: "inherit",
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
    outlineStyle: "none",
    transitionProperty: "border-color, background-color",
    transitionDuration: "140ms",
    transitionTimingFunction: "ease",
  },
  tableHeader: {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr) 92px 84px 72px 64px",
      "@container (max-width: 560px)": "minmax(0, 1fr) 80px 64px",
    },
    alignItems: "center",
    gap: "10px",
    paddingTop: 0,
    paddingInline: "8px",
    paddingBottom: "8px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.border,
    fontSize: "12px",
    fontWeight: 500,
    color: tokens.textMuted,
  },
  hideOnCompact: {
    display: {
      default: null,
      "@container (max-width: 560px)": "none",
    },
  },
  alignEnd: {
    textAlign: "right",
  },
  taskList: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },
  tableFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    paddingTop: "12px",
    fontSize: "12px",
    color: tokens.textMuted,
    fontVariantNumeric: "tabular-nums",
  },
  taskRow: {
    boxSizing: "border-box",
    display: "grid",
    gridTemplateColumns: {
      default: "minmax(0, 1fr) 92px 84px 72px 64px",
      "@container (max-width: 560px)": "minmax(0, 1fr) 80px 64px",
    },
    alignItems: "center",
    gap: "10px",
    paddingBlock: "13px",
    paddingInline: "8px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: tokens.rule,
    borderLeftWidth: "2px",
    borderLeftStyle: "solid",
    borderLeftColor: "transparent",
    backgroundColor: {
      default: "transparent",
      ":hover": tokens.surfaceHover,
    },
    cursor: "pointer",
    animationName: fadeSlideIn,
    animationDuration: "140ms",
    animationTimingFunction: "ease-out",
    transitionProperty: "background-color, border-color, opacity",
    transitionDuration: "120ms",
    transitionTimingFunction: "ease",
  },
  taskRowSelected: {
    backgroundColor: {
      default: tokens.surfaceSelected,
      ":hover": tokens.surfaceSelected,
    },
    borderLeftColor: tokens.brand,
  },
  taskRowDone: {
    opacity: 0.72,
  },
  taskPrimaryCell: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    minWidth: 0,
  },
  checkboxInput: {
    width: "15px",
    height: "15px",
    margin: 0,
    accentColor: tokens.brand,
    cursor: "pointer",
    flexShrink: 0,
  },
  dueCell: {
    fontSize: "12px",
    color: tokens.textMuted,
    fontVariantNumeric: "tabular-nums",
    whiteSpace: "nowrap",
  },
  rowActionBtn: {
    boxSizing: "border-box",
    height: "26px",
    paddingInline: "8px",
    fontFamily: "inherit",
    fontSize: "12px",
    fontWeight: 500,
    borderRadius: tokens.radiusSm,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      default: "transparent",
      ":focus-visible": tokens.danger,
    },
    backgroundColor: {
      default: "transparent",
      [stylex.when.ancestor(":hover", rowMarker)]: tokens.dangerSoft,
      ":focus-visible": tokens.dangerSoft,
    },
    color: {
      default: tokens.textMuted,
      [stylex.when.ancestor(":hover", rowMarker)]: tokens.dangerInk,
      ":focus-visible": tokens.dangerInk,
    },
    cursor: "pointer",
    justifySelf: "end",
    transitionProperty: "background-color, color, border-color",
    transitionDuration: "120ms",
    transitionTimingFunction: "ease",
  },
});

interface IssueTableProps {
  tracker: IssueTrackerStore;
}

export function IssueTable(props: IssueTableProps) {
  return (
    <section class={stylex.attrs(primitives.panel).class}>
      <div class={stylex.attrs(styles.panelHeader).class}>
        <div class={stylex.attrs(styles.panelTitleGroup).class}>
          <h2 class={stylex.attrs(styles.panelTitle).class}>Sprint Backlog</h2>
          <span class={stylex.attrs(primitives.pillBase, primitives.pillNeutral).class}>
            {props.tracker.filteredTasks().length} issues
          </span>
        </div>

        <div class={stylex.attrs(styles.filterGroup).class}>
          <For each={FILTER_OPTIONS}>
            {(f) => (
              <button
                type="button"
                class={
                  stylex.attrs(
                    styles.filterTab,
                    props.tracker.filter() === f && styles.filterTabActive,
                  ).class
                }
                onClick={() => props.tracker.setFilter(f)}
              >
                <span>{FILTER_LABELS[f]}</span>
                <span class={stylex.attrs(styles.tabCount).class}>
                  {props.tracker.countForFilter(f)}
                </span>
              </button>
            )}
          </For>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div class={stylex.attrs(styles.toolbarRow).class}>
        <label class={stylex.attrs(styles.searchField).class}>
          <svg
            class={stylex.attrs(styles.searchIcon).class}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="4.75" stroke="currentColor" stroke-width="1.5" />
            <path
              d="M10.5 10.5L14 14"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <input
            class={stylex.attrs(styles.searchInput).class}
            type="search"
            placeholder="Search key, title, or tag..."
            value={props.tracker.searchQuery()}
            onInput={(e) => props.tracker.setSearchQuery(e.currentTarget.value)}
          />
        </label>

        <div class={stylex.attrs(styles.filterControls).class}>
          <select
            class={stylex.attrs(styles.selectInput).class}
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
      <form class={stylex.attrs(styles.formRow).class} onSubmit={(e) => props.tracker.addTask(e)}>
        <input
          class={stylex.attrs(styles.textInput).class}
          aria-label="New issue title"
          placeholder="Add an issue to the sprint..."
          value={props.tracker.draftTitle()}
          onInput={(e) => props.tracker.setDraftTitle(e.currentTarget.value)}
        />
        <select
          class={stylex.attrs(styles.selectInput).class}
          aria-label="New issue category"
          value={props.tracker.draftCategory()}
          onChange={(e) => props.tracker.setDraftCategory(e.currentTarget.value as Category)}
        >
          <For each={CATEGORIES}>{(cat) => <option value={cat}>{cat}</option>}</For>
        </select>
        <select
          class={stylex.attrs(styles.selectInput).class}
          aria-label="New issue priority"
          value={props.tracker.draftPriority()}
          onChange={(e) => props.tracker.setDraftPriority(e.currentTarget.value as Priority)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          class={
            stylex.attrs(primitives.buttonBase, primitives.tonePrimary, primitives.sizeMd).class
          }
        >
          Create
        </button>
      </form>

      {/* Table Column Headers */}
      <div class={stylex.attrs(styles.tableHeader).class}>
        <span>Issue</span>
        <span class={stylex.attrs(styles.hideOnCompact).class}>Category</span>
        <span>Priority</span>
        <span class={stylex.attrs(styles.hideOnCompact).class}>Due</span>
        <span class={stylex.attrs(styles.alignEnd).class}>Action</span>
      </div>

      {/* Issue Rows */}
      <Show
        when={props.tracker.filteredTasks().length > 0}
        fallback={
          <p class={stylex.attrs(primitives.emptyState).class}>
            No issues match the current filter criteria.
          </p>
        }
      >
        <ul class={stylex.attrs(styles.taskList).class}>
          <For each={props.tracker.filteredTasks()}>
            {(item) => (
              <li
                class={
                  stylex.attrs(
                    rowMarker,
                    styles.taskRow,
                    props.tracker.selectedTask()?.id === item.id && styles.taskRowSelected,
                    item.done && styles.taskRowDone,
                  ).class
                }
                data-selected={props.tracker.selectedTask()?.id === item.id ? "true" : "false"}
                onClick={() => props.tracker.setSelectedId(item.id)}
              >
                <div class={stylex.attrs(styles.taskPrimaryCell).class}>
                  <input
                    type="checkbox"
                    class={stylex.attrs(styles.checkboxInput).class}
                    checked={item.done}
                    aria-label={`Mark ${item.key} as done`}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => props.tracker.toggleTask(item.id)}
                  />
                  <span class={stylex.attrs(primitives.issueKey).class}>{item.key}</span>
                  <span
                    class={
                      stylex.attrs(primitives.taskTitle, item.done && primitives.taskTitleDone)
                        .class
                    }
                  >
                    {item.title}
                  </span>
                </div>

                <span
                  class={
                    stylex.attrs(primitives.pillBase, primitives.pillNeutral, styles.hideOnCompact)
                      .class
                  }
                >
                  {item.category}
                </span>

                <span
                  class={stylex.attrs(primitives.pillBase, priorityPillMap[item.priority]).class}
                >
                  <span class={stylex.attrs(primitives.priorityDot).class} />
                  {PRIORITY_LABELS[item.priority]}
                </span>

                <span class={stylex.attrs(styles.dueCell, styles.hideOnCompact).class}>
                  {item.due}
                </span>

                <button
                  type="button"
                  class={stylex.attrs(styles.rowActionBtn).class}
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

      <div class={stylex.attrs(styles.tableFooter).class}>
        <span>
          Showing {props.tracker.filteredTasks().length} of {props.tracker.tasks().length} sprint
          issues
        </span>
        <span>Click any row to inspect specification</span>
      </div>
    </section>
  );
}
