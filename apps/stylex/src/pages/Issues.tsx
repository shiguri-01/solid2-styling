import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { Select } from "../components/Select";
import { For, Show } from "solid-js";
import * as stylex from "@stylexjs/stylex";
import { boardStyles as s, priorities, avatarTones } from "./board-styles";
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

export default function Issues(props: { tracker: IssueTrackerStore }) {
  return (
    <section class={stylex.attrs(s.page).class}>
      <div class={stylex.attrs(s.shell).class}>
        <header class={stylex.attrs(s.header).class}>
          <div class={stylex.attrs(s.brand).class}>
            <span class={stylex.attrs(s.mark).class}>S</span>
            <div>
              <p class={stylex.attrs(s.eyebrow).class}>DESIGN ENGINEERING / Q4 STYLING MIGRATION</p>
              <h1 class={stylex.attrs(s.title).class}>Solid 2.0 × StyleX</h1>
            </div>
          </div>
          <div class={stylex.attrs(s.headerActions).class}>
            <div class={stylex.attrs(s.avatars).class} aria-label="Active team members">
              <For each={TEAM_MEMBERS}>
                {(m) => (
                  <span class={stylex.attrs(s.avatar, avatarTones[m.tone]).class} title={m.name}>
                    {m.initials}
                  </span>
                )}
              </For>
            </div>
            <span class={stylex.attrs(s.sprint).class}>Sprint 14</span>
            <Button onClick={() => props.tracker.toggleTheme()}>
              {props.tracker.isDark() ? "Light theme" : "Dark theme"}
            </Button>
          </div>
        </header>
        <section class={stylex.attrs(s.metrics).class}>
          <div class={stylex.attrs(s.metric).class}>
            <span>Sprint progress</span>
            <strong class={stylex.attrs(s.metricValue).class}>
              {props.tracker.completionRate()}%
            </strong>
            <div class={stylex.attrs(s.progress).class}>
              <i {...stylex.attrs(s.progressFill(props.tracker.completionRate()))} />
            </div>
          </div>
          <div class={stylex.attrs(s.metric).class}>
            <span>Open issues</span>
            <strong class={stylex.attrs(s.metricValue).class}>{props.tracker.activeCount()}</strong>
            <small class={stylex.attrs(s.metricNote).class}>Active engineering tasks</small>
          </div>
          <div class={stylex.attrs(s.metric).class}>
            <span>High priority</span>
            <strong class={stylex.attrs(s.metricValue).class}>
              {props.tracker.highPriorityActiveCount()}
            </strong>
            <small class={stylex.attrs(s.metricNote).class}>Requires immediate review</small>
          </div>
          <div class={stylex.attrs(s.metric, s.lastMetric).class}>
            <span>Categories</span>
            <strong class={stylex.attrs(s.metricValue).class}>{CATEGORIES.length}</strong>
            <small class={stylex.attrs(s.metricNote).class}>Tokens, SSR, A11y &amp; Compiler</small>
          </div>
        </section>
        <div class={stylex.attrs(s.workspace).class}>
          <Card as="section" xstyle={s.panel}>
            <div class={stylex.attrs(s.panelHeading).class}>
              <div>
                <h2 class={stylex.attrs(s.panelTitle).class}>Sprint issues</h2>
                <p class={stylex.attrs(s.panelDescription).class}>
                  Compare how each library styles this interface
                </p>
              </div>
              <span class={stylex.attrs(s.count).class}>
                {props.tracker.filteredTasks().length} issues
              </span>
            </div>
            <div class={stylex.attrs(s.toolbar).class}>
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
            <nav class={stylex.attrs(s.filters).class} aria-label="Issue status">
              <For each={FILTER_OPTIONS}>
                {(filter) => (
                  <button
                    class={
                      stylex.attrs(s.filter, props.tracker.filter() === filter && s.filterActive)
                        .class
                    }
                    aria-pressed={props.tracker.filter() === filter ? "true" : "false"}
                    onClick={() => props.tracker.setFilter(filter)}
                  >
                    {FILTER_LABELS[filter]}{" "}
                    <span class={stylex.attrs(s.filterCount).class}>
                      {props.tracker.countForFilter(filter)}
                    </span>
                  </button>
                )}
              </For>
            </nav>
            <form
              class={stylex.attrs(s.createForm).class}
              onSubmit={(e) => props.tracker.addTask(e)}
            >
              <TextInput
                xstyle={s.createTitle}
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
              <Button xstyle={s.createAction} variant="primary" type="submit">
                Create issue
              </Button>
            </form>
            <div class={stylex.attrs(s.tableHead).class}>
              <span>Issue</span>
              <span class={stylex.attrs(s.secondary).class}>Category</span>
              <span>Priority</span>
              <span class={stylex.attrs(s.secondary).class}>Due</span>
              <span />
            </div>
            <ul class={stylex.attrs(s.rows).class}>
              <For each={props.tracker.filteredTasks()}>
                {(item) => (
                  <li
                    class={
                      stylex.attrs(
                        s.row,
                        props.tracker.selectedTask()?.id === item.id && s.selected,
                      ).class
                    }
                    onClick={() => props.tracker.setSelectedId(item.id)}
                  >
                    <div class={stylex.attrs(s.issue).class}>
                      <input
                        type="checkbox"
                        checked={item.done}
                        aria-label={`Mark ${item.key} done`}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => props.tracker.toggleTask(item.id)}
                      />
                      <code class={stylex.attrs(s.issueKey).class}>{item.key}</code>
                      <button
                        type="button"
                        class={stylex.attrs(s.issueTitle, item.done && s.done).class}
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
                    <span class={stylex.attrs(s.category, s.secondary).class}>{item.category}</span>
                    <span class={stylex.attrs(s.badge, priorities[item.priority]).class}>
                      {PRIORITY_LABELS[item.priority]}
                    </span>
                    <span class={stylex.attrs(s.secondary).class}>{item.due}</span>
                    <button
                      class={stylex.attrs(s.delete).class}
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
              <p class={stylex.attrs(s.empty).class}>No issues match these filters.</p>
            </Show>
            <footer class={stylex.attrs(s.footer).class}>
              Showing {props.tracker.filteredTasks().length} of {props.tracker.tasks().length}{" "}
              sprint issues
            </footer>
          </Card>
          <Card as="aside">
            <Show when={props.tracker.selectedTask()}>
              {(task) => (
                <>
                  <div class={stylex.attrs(s.detailTop).class}>
                    <div>
                      <p class={stylex.attrs(s.eyebrow).class}>
                        {task().key} · {task().category}
                      </p>
                      <h2 class={stylex.attrs(s.detailTitle).class}>{task().title}</h2>
                    </div>
                    <span class={stylex.attrs(s.badge, priorities[task().priority]).class}>
                      {PRIORITY_LABELS[task().priority]}
                    </span>
                  </div>
                  <dl class={stylex.attrs(s.meta).class}>
                    <div class={stylex.attrs(s.metaItem).class}>
                      <dt class={stylex.attrs(s.metaLabel).class}>Status</dt>
                      <dd class={stylex.attrs(s.metaValue).class}>
                        {task().done ? "Completed" : "In progress"}
                      </dd>
                    </div>
                    <div class={stylex.attrs(s.metaItem).class}>
                      <dt class={stylex.attrs(s.metaLabel).class}>Assignee</dt>
                      <dd class={stylex.attrs(s.metaValue).class}>{task().assignee}</dd>
                    </div>
                    <div class={stylex.attrs(s.metaItem).class}>
                      <dt class={stylex.attrs(s.metaLabel).class}>Target date</dt>
                      <dd class={stylex.attrs(s.metaValue).class}>{task().due}</dd>
                    </div>
                    <div class={stylex.attrs(s.metaItem).class}>
                      <dt class={stylex.attrs(s.metaLabel).class}>Estimate</dt>
                      <dd class={stylex.attrs(s.metaValue).class}>{task().estimate}</dd>
                    </div>
                  </dl>
                  <section class={stylex.attrs(s.detailSection).class}>
                    <h3 class={stylex.attrs(s.sectionTitle).class}>Specification</h3>
                    <p class={stylex.attrs(s.sectionDescription).class}>{task().summary}</p>
                  </section>
                  <section class={stylex.attrs(s.detailSection).class}>
                    <h3 class={stylex.attrs(s.sectionTitle).class}>Acceptance criteria</h3>
                    <ul class={stylex.attrs(s.criteria).class}>
                      <For each={task().subtasks}>
                        {(sub) => (
                          <li class={stylex.attrs(s.criteriaItem).class}>
                            <span>
                              {sub.done ? "✓" : "○"} {sub.label}
                            </span>
                            <small class={stylex.attrs(s.itemNote).class}>
                              {sub.done ? "Done" : "Pending"}
                            </small>
                          </li>
                        )}
                      </For>
                    </ul>
                  </section>
                  <section class={stylex.attrs(s.detailSection).class}>
                    <h3 class={stylex.attrs(s.sectionTitle).class}>Recent activity</h3>
                    <ul class={stylex.attrs(s.activity).class}>
                      <For each={task().activity}>
                        {(a) => (
                          <li class={stylex.attrs(s.activityItem).class}>
                            <span>
                              <b>{a.author}</b> {a.action}
                            </span>
                            <small class={stylex.attrs(s.itemNote).class}>{a.time}</small>
                          </li>
                        )}
                      </For>
                    </ul>
                  </section>
                  <div class={stylex.attrs(s.detailActions).class}>
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
        <p class={stylex.attrs(s.compareNote).class}>
          Same Solid 2.0 issue board and interactions in each app · styling: StyleX
        </p>
      </div>
    </section>
  );
}
