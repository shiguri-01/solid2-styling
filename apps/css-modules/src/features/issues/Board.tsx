import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { Select } from "../../components/Select";
import { For, Show } from "solid-js";
import styles from "./board.module.css";
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
    <section class={styles.page}>
      <div class={styles.shell}>
        <header class={styles.header}>
          <div class={styles.brand}>
            <span class={styles.mark}>S</span>
            <div>
              <p class={styles.eyebrow}>DESIGN ENGINEERING / Q4 STYLING MIGRATION</p>
              <h1>Solid 2.0 × {props.library}</h1>
            </div>
          </div>
          <div class={styles.headerActions}>
            <div class={styles.avatars} aria-label="Active team members">
              <For each={TEAM_MEMBERS}>
                {(m) => (
                  <span class={`${styles.avatar} ${styles[`tone-${m.tone}`]}`} title={m.name}>
                    {m.initials}
                  </span>
                )}
              </For>
            </div>
            <span class={styles.sprint}>Sprint 14</span>
            <Button onClick={() => props.tracker.toggleTheme()}>
              {props.tracker.isDark() ? "Light theme" : "Dark theme"}
            </Button>
          </div>
        </header>
        <section class={styles.metrics}>
          <div>
            <span>Sprint progress</span>
            <strong>{props.tracker.completionRate()}%</strong>
            <div class={styles.progress}>
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
        <div class={styles.workspace}>
          <Card as="section" class={styles.panel}>
            <div class={styles.panelHeading}>
              <div>
                <h2>Sprint issues</h2>
                <p>Compare how each library styles this interface</p>
              </div>
              <span class={styles.count}>{props.tracker.filteredTasks().length} issues</span>
            </div>
            <div class={styles.toolbar}>
              <TextInput
                type="search"
                aria-label="Search issues"
                placeholder="Search key, title, or category…"
                value={props.tracker.searchQuery()}
                onInput={(e) => props.tracker.setSearchQuery(e.currentTarget.value)}
              />
              <Select
                aria-label="Filter by category"
                value={props.tracker.categoryFilter()}
                onChange={(e) => props.tracker.setCategoryFilter(e.currentTarget.value)}
              >
                <option value="all">All categories</option>
                <For each={CATEGORIES}>{(cat) => <option>{cat}</option>}</For>
              </Select>
            </div>
            <nav class={styles.filters} aria-label="Issue status">
              <For each={FILTER_OPTIONS}>
                {(filter) => (
                  <button
                    class={`${styles.filter} ${props.tracker.filter() === filter ? styles.filterActive : ""}`}
                    onClick={() => props.tracker.setFilter(filter)}
                  >
                    {FILTER_LABELS[filter]} <span>{props.tracker.countForFilter(filter)}</span>
                  </button>
                )}
              </For>
            </nav>
            <form class={styles.createForm} onSubmit={(e) => props.tracker.addTask(e)}>
              <TextInput
                class={styles.createTitle}
                aria-label="New issue title"
                placeholder="Add an issue to the sprint…"
                value={props.tracker.draftTitle()}
                onInput={(e) => props.tracker.setDraftTitle(e.currentTarget.value)}
              />
              <Select
                aria-label="New issue category"
                value={props.tracker.draftCategory()}
                onChange={(e) => props.tracker.setDraftCategory(e.currentTarget.value as Category)}
              >
                <For each={CATEGORIES}>{(cat) => <option>{cat}</option>}</For>
              </Select>
              <Select
                aria-label="New issue priority"
                value={props.tracker.draftPriority()}
                onChange={(e) => props.tracker.setDraftPriority(e.currentTarget.value as Priority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
              <Button class={styles.createAction} variant="primary" type="submit">
                Create issue
              </Button>
            </form>
            <div class={styles.tableHead}>
              <span>Issue</span>
              <span>Category</span>
              <span>Priority</span>
              <span>Due</span>
              <span />
            </div>
            <ul class={styles.rows}>
              <For each={props.tracker.filteredTasks()}>
                {(item) => (
                  <li
                    class={`${styles.row} ${props.tracker.selectedTask()?.id === item.id ? styles.selected : ""}`}
                    onClick={() => props.tracker.setSelectedId(item.id)}
                  >
                    <div class={styles.issue}>
                      <input
                        type="checkbox"
                        checked={item.done}
                        aria-label={`Mark ${item.key} done`}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => props.tracker.toggleTask(item.id)}
                      />
                      <code>{item.key}</code>
                      <button
                        type="button"
                        class={[styles.issueTitle, item.done && styles.done]}
                        aria-pressed={
                          props.tracker.selectedTask()?.id === item.id ? "true" : "false"
                        }
                        onClick={(event) => {
                          event.stopPropagation();
                          props.tracker.setSelectedId(item.id);
                        }}
                      >
                        {item.title}
                      </button>
                    </div>
                    <span class={styles.category}>{item.category}</span>
                    <span class={`${styles.badge} ${styles[`priority-${item.priority}`]}`}>
                      {PRIORITY_LABELS[item.priority]}
                    </span>
                    <span>{item.due}</span>
                    <button
                      class={styles.delete}
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
              <p class={styles.empty}>No issues match these filters.</p>
            </Show>
            <footer class={styles.footer}>
              Showing {props.tracker.filteredTasks().length} of {props.tracker.tasks().length}{" "}
              sprint issues
            </footer>
          </Card>
          <Card as="aside" class={styles.panel}>
            <Show when={props.tracker.selectedTask()}>
              {(task) => (
                <>
                  <div class={styles.detailTop}>
                    <div>
                      <p class={styles.eyebrow}>
                        {task().key} · {task().category}
                      </p>
                      <h2>{task().title}</h2>
                    </div>
                    <span class={`${styles.badge} ${styles[`priority-${task().priority}`]}`}>
                      {PRIORITY_LABELS[task().priority]}
                    </span>
                  </div>
                  <dl class={styles.meta}>
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
                  <section class={styles.detailSection}>
                    <h3>Specification</h3>
                    <p>{task().summary}</p>
                  </section>
                  <section class={styles.detailSection}>
                    <h3>Acceptance criteria</h3>
                    <ul class={styles.criteria}>
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
                  <section class={styles.detailSection}>
                    <h3>Recent activity</h3>
                    <ul class={styles.activity}>
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
                  <div class={styles.detailActions}>
                    <Button onClick={() => props.tracker.cyclePriority(task().id)}>
                      Cycle priority
                    </Button>
                    <Button onClick={() => props.tracker.toggleTask(task().id)}>
                      {task().done ? "Reopen issue" : "Mark complete"}
                    </Button>
                  </div>
                </>
              )}
            </Show>
          </Card>
        </div>
        <p class={styles.compareNote}>
          Same Solid 2.0 issue board and interactions in each app · styling: {props.library}
        </p>
      </div>
    </section>
  );
}
