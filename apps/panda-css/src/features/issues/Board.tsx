import { For, Show } from "solid-js";
import { shellStyles } from "./styles/shell";
import { issueStyles } from "./styles/issues";
import { inspectorStyles } from "./styles/inspector";
import { filterTab, priorityBadge } from "./styles/recipes";
import {
  CATEGORIES,
  FILTER_LABELS,
  FILTER_OPTIONS,
  PRIORITY_LABELS,
  TEAM_MEMBERS,
  type Category,
  type IssueTrackerStore,
  type Priority,
} from "utils";

export function Board(props: { library: string; tracker: IssueTrackerStore }) {
  return (
    <section class={shellStyles.page}>
      <div class={shellStyles.shell}>
        <header class={shellStyles.header}>
          <div class={shellStyles.brand}>
            <span class={shellStyles.mark}>S</span>
            <div>
              <p class={shellStyles.eyebrow}>DESIGN ENGINEERING / Q4 STYLING MIGRATION</p>
              <h1>Solid 2.0 × {props.library}</h1>
            </div>
          </div>
          <div class={shellStyles.headerActions}>
            <div class={shellStyles.avatars} aria-label="Active team members">
              <For each={TEAM_MEMBERS}>
                {(m) => (
                  <span
                    class={`${shellStyles.avatar} ${shellStyles[`tone-${m.tone}`]}`}
                    title={m.name}
                  >
                    {m.initials}
                  </span>
                )}
              </For>
            </div>
            <span class={shellStyles.sprint}>Sprint 14</span>
            <button class={shellStyles.button} onClick={() => props.tracker.toggleTheme()}>
              {props.tracker.isDark() ? "Light theme" : "Dark theme"}
            </button>
          </div>
        </header>
        <section class={shellStyles.metrics}>
          <div>
            <span>Sprint progress</span>
            <strong>{props.tracker.completionRate()}%</strong>
            <div class={shellStyles.progress}>
              <i style={{ width: `${props.tracker.completionRate()}%` }} />
            </div>
          </div>
          <div>
            <span>Open issues</span>
            <strong>{props.tracker.activeCount()}</strong>
            <small>Active engineering tasks</small>
          </div>
          <div>
            <span>High priority</span>
            <strong>{props.tracker.highPriorityActiveCount()}</strong>
            <small>Requires immediate review</small>
          </div>
          <div>
            <span>Categories</span>
            <strong>{CATEGORIES.length}</strong>
            <small>Tokens, SSR, A11y &amp; Compiler</small>
          </div>
        </section>
        <div class={shellStyles.workspace}>
          <section class={issueStyles.panel}>
            <div class={issueStyles.panelHeading}>
              <div>
                <h2>Sprint issues</h2>
                <p>Compare how each library styles this interface</p>
              </div>
              <span class={issueStyles.count}>{props.tracker.filteredTasks().length} issues</span>
            </div>
            <div class={issueStyles.toolbar}>
              <input
                class={issueStyles.input}
                type="search"
                aria-label="Search issues"
                placeholder="Search key, title, or category…"
                value={props.tracker.searchQuery()}
                onInput={(e) => props.tracker.setSearchQuery(e.currentTarget.value)}
              />
              <select
                class={issueStyles.select}
                aria-label="Filter by category"
                value={props.tracker.categoryFilter()}
                onChange={(e) => props.tracker.setCategoryFilter(e.currentTarget.value)}
              >
                <option value="all">All categories</option>
                <For each={CATEGORIES}>{(cat) => <option>{cat}</option>}</For>
              </select>
            </div>
            <nav class={issueStyles.filters} aria-label="Issue status">
              <For each={FILTER_OPTIONS}>
                {(filter) => (
                  <button
                    class={filterTab({ active: props.tracker.filter() === filter })}
                    onClick={() => props.tracker.setFilter(filter)}
                  >
                    {FILTER_LABELS[filter]} <span>{props.tracker.countForFilter(filter)}</span>
                  </button>
                )}
              </For>
            </nav>
            <form class={issueStyles.createForm} onSubmit={(e) => props.tracker.addTask(e)}>
              <input
                class={issueStyles.input}
                aria-label="New issue title"
                placeholder="Add an issue to the sprint…"
                value={props.tracker.draftTitle()}
                onInput={(e) => props.tracker.setDraftTitle(e.currentTarget.value)}
              />
              <select
                class={issueStyles.select}
                aria-label="New issue category"
                value={props.tracker.draftCategory()}
                onChange={(e) => props.tracker.setDraftCategory(e.currentTarget.value as Category)}
              >
                <For each={CATEGORIES}>{(cat) => <option>{cat}</option>}</For>
              </select>
              <select
                class={issueStyles.select}
                aria-label="New issue priority"
                value={props.tracker.draftPriority()}
                onChange={(e) => props.tracker.setDraftPriority(e.currentTarget.value as Priority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button class={issueStyles.primary} type="submit">
                Create issue
              </button>
            </form>
            <div class={issueStyles.tableHead}>
              <span>Issue</span>
              <span>Category</span>
              <span>Priority</span>
              <span>Due</span>
              <span />
            </div>
            <ul class={issueStyles.rows}>
              <For each={props.tracker.filteredTasks()}>
                {(item) => (
                  <li
                    class={`${issueStyles.row} ${props.tracker.selectedTask()?.id === item.id ? issueStyles.selected : ""}`}
                    onClick={() => props.tracker.setSelectedId(item.id)}
                  >
                    <label class={issueStyles.issue}>
                      <input
                        type="checkbox"
                        checked={item.done}
                        aria-label={`Mark ${item.key} done`}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => props.tracker.toggleTask(item.id)}
                      />
                      <code>{item.key}</code>
                      <span class={item.done ? issueStyles.done : ""}>{item.title}</span>
                    </label>
                    <span class={issueStyles.category}>{item.category}</span>
                    <span class={priorityBadge({ priority: item.priority })}>
                      {PRIORITY_LABELS[item.priority]}
                    </span>
                    <span>{item.due}</span>
                    <button
                      class={issueStyles.delete}
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
            <Show when={!props.tracker.filteredTasks().length}>
              <p class={issueStyles.empty}>No issues match these filters.</p>
            </Show>
            <footer class={issueStyles.footer}>
              Showing {props.tracker.filteredTasks().length} of {props.tracker.tasks().length}{" "}
              sprint issues
            </footer>
          </section>
          <aside class={issueStyles.panel}>
            <Show when={props.tracker.selectedTask()}>
              {(task) => (
                <>
                  <div class={inspectorStyles.detailTop}>
                    <div>
                      <p class={shellStyles.eyebrow}>
                        {task().key} · {task().category}
                      </p>
                      <h2>{task().title}</h2>
                    </div>
                    <span class={priorityBadge({ priority: task().priority })}>
                      {PRIORITY_LABELS[task().priority]}
                    </span>
                  </div>
                  <dl class={inspectorStyles.meta}>
                    <div>
                      <dt>Status</dt>
                      <dd>{task().done ? "Completed" : "In progress"}</dd>
                    </div>
                    <div>
                      <dt>Assignee</dt>
                      <dd>{task().assignee}</dd>
                    </div>
                    <div>
                      <dt>Target date</dt>
                      <dd>{task().due}</dd>
                    </div>
                    <div>
                      <dt>Estimate</dt>
                      <dd>{task().estimate}</dd>
                    </div>
                  </dl>
                  <section class={inspectorStyles.detailSection}>
                    <h3>Specification</h3>
                    <p>{task().summary}</p>
                  </section>
                  <section class={inspectorStyles.detailSection}>
                    <h3>Acceptance criteria</h3>
                    <ul class={inspectorStyles.criteria}>
                      <For each={task().subtasks}>
                        {(sub) => (
                          <li>
                            <span>
                              {sub.done ? "✓" : "○"} {sub.label}
                            </span>
                            <small>{sub.done ? "Done" : "Pending"}</small>
                          </li>
                        )}
                      </For>
                    </ul>
                  </section>
                  <section class={inspectorStyles.detailSection}>
                    <h3>Recent activity</h3>
                    <ul class={inspectorStyles.activity}>
                      <For each={task().activity}>
                        {(a) => (
                          <li>
                            <span>
                              <b>{a.author}</b> {a.action}
                            </span>
                            <small>{a.time}</small>
                          </li>
                        )}
                      </For>
                    </ul>
                  </section>
                  <div class={inspectorStyles.detailActions}>
                    <button
                      class={shellStyles.button}
                      onClick={() => props.tracker.cyclePriority(task().id)}
                    >
                      Cycle priority
                    </button>
                    <button
                      class={shellStyles.button}
                      onClick={() => props.tracker.toggleTask(task().id)}
                    >
                      {task().done ? "Reopen issue" : "Mark complete"}
                    </button>
                  </div>
                </>
              )}
            </Show>
          </aside>
        </div>
        <p class={inspectorStyles.compareNote}>
          Same Solid 2.0 issue board and interactions in each app · styling: {props.library}
        </p>
      </div>
    </section>
  );
}
