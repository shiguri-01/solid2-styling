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
import {
  buttonSize,
  buttonTone,
  emptyState,
  issueKey,
  panel,
  panelTitle,
  priorityBadge,
  priorityDot,
  taskTitle,
} from "../styles.css";
import {
  alignEnd,
  checkboxInput,
  dueCell,
  filterControls,
  filterGroup,
  filterTab,
  formRow,
  hideOnCompact,
  panelHeader,
  panelTitleGroup,
  rowActionBtn,
  searchField,
  searchIcon,
  searchInput,
  selectInput,
  tabCount,
  tableFooter,
  tableHeader,
  taskList,
  taskPrimaryCell,
  taskRow,
  textInput,
  toolbarRow,
} from "./IssueTable.css";

interface IssueTableProps {
  tracker: IssueTrackerStore;
}

export function IssueTable(props: IssueTableProps) {
  return (
    <section class={panel}>
      <div class={panelHeader}>
        <div class={panelTitleGroup}>
          <h2 class={panelTitle}>Sprint Backlog</h2>
          <span class={priorityBadge.neutral}>{props.tracker.filteredTasks().length} issues</span>
        </div>

        <div class={filterGroup}>
          <For each={FILTER_OPTIONS}>
            {(f) => (
              <button
                type="button"
                class={filterTab[props.tracker.filter() === f ? "active" : "inactive"]}
                onClick={() => props.tracker.setFilter(f)}
              >
                <span>{FILTER_LABELS[f]}</span>
                <span class={tabCount}>{props.tracker.countForFilter(f)}</span>
              </button>
            )}
          </For>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div class={toolbarRow}>
        <label class={searchField}>
          <svg class={searchIcon} viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="4.75" stroke="currentColor" stroke-width="1.5" />
            <path
              d="M10.5 10.5L14 14"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <input
            class={searchInput}
            type="search"
            placeholder="Search key, title, or tag..."
            value={props.tracker.searchQuery()}
            onInput={(e) => props.tracker.setSearchQuery(e.currentTarget.value)}
          />
        </label>

        <div class={filterControls}>
          <select
            class={selectInput}
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
      <form class={formRow} onSubmit={(e) => props.tracker.addTask(e)}>
        <input
          class={textInput}
          aria-label="New issue title"
          placeholder="Add an issue to the sprint..."
          value={props.tracker.draftTitle()}
          onInput={(e) => props.tracker.setDraftTitle(e.currentTarget.value)}
        />
        <select
          class={selectInput}
          aria-label="New issue category"
          value={props.tracker.draftCategory()}
          onChange={(e) => props.tracker.setDraftCategory(e.currentTarget.value as Category)}
        >
          <For each={CATEGORIES}>{(cat) => <option value={cat}>{cat}</option>}</For>
        </select>
        <select
          class={selectInput}
          aria-label="New issue priority"
          value={props.tracker.draftPriority()}
          onChange={(e) => props.tracker.setDraftPriority(e.currentTarget.value as Priority)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" class={`${buttonTone.primary} ${buttonSize.md}`}>
          Create
        </button>
      </form>

      {/* Table Column Headers */}
      <div class={tableHeader}>
        <span>Issue</span>
        <span class={hideOnCompact}>Category</span>
        <span>Priority</span>
        <span class={hideOnCompact}>Due</span>
        <span class={alignEnd}>Action</span>
      </div>

      {/* Issue Rows */}
      <Show
        when={props.tracker.filteredTasks().length > 0}
        fallback={<p class={emptyState}>No issues match the current filter criteria.</p>}
      >
        <ul class={taskList}>
          <For each={props.tracker.filteredTasks()}>
            {(item) => (
              <li
                class={taskRow[item.done ? "done" : "todo"]}
                data-selected={props.tracker.selectedTask()?.id === item.id ? "true" : "false"}
                onClick={() => props.tracker.setSelectedId(item.id)}
              >
                <div class={taskPrimaryCell}>
                  <input
                    type="checkbox"
                    class={checkboxInput}
                    checked={item.done}
                    aria-label={`Mark ${item.key} as done`}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => props.tracker.toggleTask(item.id)}
                  />
                  <span class={issueKey}>{item.key}</span>
                  <span class={taskTitle[item.done ? "done" : "todo"]}>{item.title}</span>
                </div>

                <span class={`${priorityBadge.neutral} ${hideOnCompact}`}>{item.category}</span>

                <span class={priorityBadge[item.priority]}>
                  <span class={priorityDot} />
                  {PRIORITY_LABELS[item.priority]}
                </span>

                <span class={`${dueCell} ${hideOnCompact}`}>{item.due}</span>

                <button
                  type="button"
                  class={rowActionBtn}
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

      <div class={tableFooter}>
        <span>
          Showing {props.tracker.filteredTasks().length} of {props.tracker.tasks().length} sprint
          issues
        </span>
        <span>Click any row to inspect specification</span>
      </div>
    </section>
  );
}
