import { For, Show } from "solid-js";
import "lism-css/full.css";
import "./style.css";
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
const toneClasses: Record<string, string> = {
  teal: "-c:blue -bgc",
  emerald: "-c:green -bgc",
  amber: "-c:orange -bgc",
  rose: "-c:pink -bgc",
};
const priorityClasses: Record<Priority, string> = {
  high: "-c:red -bgc",
  medium: "-c:orange -bgc",
  low: "-c:green -bgc",
};

export function Board(props: { library: string; tracker: IssueTrackerStore }) {
  return (
    <main
      class={`is--container c--page -bgc:base-2 -c:text ${props.tracker.isDark() ? "is--dark" : ""}`}
    >
      <div class="l--stack -max-sz:l -m:auto -g:25">
        <header class="l--cluster -jc:between -ai:center c--header -g:20">
          <div class="l--flex -ai:center c--brand -g:15">
            <span class="l--grid -fw:700 c--mark -bdrs:30 -bgc:brand -c:white">S</span>
            <div>
              <p class="c--eyebrow -m:0 -c:text-2 -fz:xs">
                DESIGN ENGINEERING / Q4 STYLING MIGRATION
              </p>
              <h1>Solid 2.0 × {props.library}</h1>
            </div>
          </div>
          <div class="l--flex -ai:center c--headerActions">
            <div class="l--flex -ai:center c--avatars -g:0" aria-label="Active team members">
              <For each={TEAM_MEMBERS}>
                {(m) => (
                  <span
                    class={`l--grid c--avatar -bdrs:99 -fz:2xs ${toneClasses[m.tone]}`}
                    title={m.name}
                  >
                    {m.initials}
                  </span>
                )}
              </For>
            </div>
            <span class="c--sprint -c:text-2 -fz:xs">Sprint 14</span>
            <button
              class="c--button -bdrs:20 -bgc:base -c:text"
              onClick={() => props.tracker.toggleTheme()}
            >
              {props.tracker.isDark() ? "Light theme" : "Dark theme"}
            </button>
          </div>
        </header>
        <section
          class="l--grid c--metrics -gtc -gtc_md -bdrs:30 -bgc:base"
          style={{ "--gtc": "repeat(2, minmax(0, 1fr))", "--gtc_md": "repeat(4, minmax(0, 1fr))" }}
        >
          <div class="l--stack -g:5 -p:20 -c:text-2">
            <span>Sprint progress</span>
            <strong class="-c:text -fz:2xl">{props.tracker.completionRate()}%</strong>
            <div class="c--progress -ov:hidden -bdrs:10 -bgc:divider">
              <i
                class="-d:block -bsz -sz -bgc:brand"
                style={{ "--bsz": "100%", "--sz": `${props.tracker.completionRate()}%` }}
              />
            </div>
          </div>
          <div class="l--stack -g:5 -p:20 -c:text-2">
            <span>Open issues</span>
            <strong class="-c:text -fz:2xl">{props.tracker.activeCount()}</strong>
            <small>Active engineering tasks</small>
          </div>
          <div class="l--stack -g:5 -p:20 -c:text-2">
            <span>High priority</span>
            <strong class="-c:text -fz:2xl">{props.tracker.highPriorityActiveCount()}</strong>
            <small>Requires immediate review</small>
          </div>
          <div class="l--stack -g:5 -p:20 -c:text-2">
            <span>Categories</span>
            <strong class="-c:text -fz:2xl">{CATEGORIES.length}</strong>
            <small>Tokens, SSR, A11y &amp; Compiler</small>
          </div>
        </section>
        <div class="l--withSide -ai:start c--workspace" style={{ "--sideW": "22rem" }}>
          <section class="c--panel -p:25 -bdrs:30 -bgc:base">
            <div class="l--flex -ai:center -jc:between c--panelHeading">
              <div>
                <h2>Sprint issues</h2>
                <p>Compare how each library styles this interface</p>
              </div>
              <span class="c--count -c:text-2 -fz:xs">
                {props.tracker.filteredTasks().length} issues
              </span>
            </div>
            <div class="l--flex c--toolbar -g:10">
              <input
                class="c--input -bdrs:20 -bgc:base -c:text"
                type="search"
                placeholder="Search key, title, or category…"
                value={props.tracker.searchQuery()}
                onInput={(e) => props.tracker.setSearchQuery(e.currentTarget.value)}
              />
              <select
                class="c--select -bdrs:20 -c:text"
                value={props.tracker.categoryFilter()}
                onChange={(e) => props.tracker.setCategoryFilter(e.currentTarget.value)}
              >
                <option value="all">All categories</option>
                <For each={CATEGORIES}>{(cat) => <option>{cat}</option>}</For>
              </select>
            </div>
            <nav class="l--flex c--filters -g:5" aria-label="Issue status">
              <For each={FILTER_OPTIONS}>
                {(filter) => (
                  <button
                    class={`c--filter -bgc:transparent -fz:s ${props.tracker.filter() === filter ? "is--active -c:brand" : "-c:text-2"}`}
                    onClick={() => props.tracker.setFilter(filter)}
                  >
                    {FILTER_LABELS[filter]} <span>{props.tracker.countForFilter(filter)}</span>
                  </button>
                )}
              </For>
            </nav>
            <form class="l--cluster c--createForm -g:10" onSubmit={(e) => props.tracker.addTask(e)}>
              <input
                class="c--input -bdrs:20 -bgc:base -c:text"
                aria-label="New issue title"
                placeholder="Add an issue to the sprint…"
                value={props.tracker.draftTitle()}
                onInput={(e) => props.tracker.setDraftTitle(e.currentTarget.value)}
              />
              <select
                class="c--select -bdrs:20 -c:text"
                aria-label="New issue category"
                value={props.tracker.draftCategory()}
                onChange={(e) => props.tracker.setDraftCategory(e.currentTarget.value as Category)}
              >
                <For each={CATEGORIES}>{(cat) => <option>{cat}</option>}</For>
              </select>
              <select
                class="c--select -bdrs:20 -c:text"
                aria-label="New issue priority"
                value={props.tracker.draftPriority()}
                onChange={(e) => props.tracker.setDraftPriority(e.currentTarget.value as Priority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button class="c--primary -bdrs:20 -bgc:brand -c:white -fw:600" type="submit">
                Create issue
              </button>
            </form>
            <div class="l--grid -ai:center c--tableHead -g:10 -c:text-2 -fz:xs">
              <span>Issue</span>
              <span>Category</span>
              <span>Priority</span>
              <span>Due</span>
              <span />
            </div>
            <ul class="c--rows -m:0 -p:0">
              <For each={props.tracker.filteredTasks()}>
                {(item) => (
                  <li
                    class={`l--grid -ai:center c--row -g:10 -fz:xs ${props.tracker.selectedTask()?.id === item.id ? "is--selected" : ""}`}
                    onClick={() => props.tracker.setSelectedId(item.id)}
                  >
                    <label class="l--flex -ai:center c--issue">
                      <input
                        type="checkbox"
                        checked={item.done}
                        aria-label={`Mark ${item.key} done`}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => props.tracker.toggleTask(item.id)}
                      />
                      <code>{item.key}</code>
                      <span class={item.done ? "is--done" : ""}>{item.title}</span>
                    </label>
                    <span class="c--category -ov:hidden -c:text-2 -whs:nowrap">
                      {item.category}
                    </span>
                    <span
                      class={`c--badge -whs:nowrap -fxsh:0 -bdrs:99 -fz:2xs ${priorityClasses[item.priority]}`}
                    >
                      {PRIORITY_LABELS[item.priority]}
                    </span>
                    <span>{item.due}</span>
                    <button
                      class="c--delete -bgc:transparent -c:text-2 -fz:2xs"
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
              <p class="-ta:center c--empty -p:30 -c:text-2">No issues match these filters.</p>
            </Show>
            <footer class="c--footer -c:text-2 -fz:xs">
              Showing {props.tracker.filteredTasks().length} of {props.tracker.tasks().length}{" "}
              sprint issues
            </footer>
          </section>
          <aside class="is--side c--panel -p:25 -bdrs:30 -bgc:base">
            <Show when={props.tracker.selectedTask()}>
              {(task) => (
                <>
                  <div class="l--flex -ai:flex-start -jc:between c--detailTop">
                    <div>
                      <p class="c--eyebrow -m:0 -c:text-2 -fz:xs">
                        {task().key} · {task().category}
                      </p>
                      <h2>{task().title}</h2>
                    </div>
                    <span
                      class={`c--badge -whs:nowrap -fxsh:0 -bdrs:99 -fz:2xs ${priorityClasses[task().priority]}`}
                    >
                      {PRIORITY_LABELS[task().priority]}
                    </span>
                  </div>
                  <dl class="l--grid c--meta -m:0">
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
                  <section class="c--detailSection">
                    <h3>Specification</h3>
                    <p>{task().summary}</p>
                  </section>
                  <section class="c--detailSection">
                    <h3>Acceptance criteria</h3>
                    <ul class="c--criteria -m:0 -p:0">
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
                  <section class="c--detailSection">
                    <h3>Recent activity</h3>
                    <ul class="c--activity -m:0 -p:0">
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
                  <div class="l--flex c--detailActions -g:10">
                    <button
                      class="c--button -bdrs:20 -bgc:base -c:text"
                      onClick={() => props.tracker.cyclePriority(task().id)}
                    >
                      Cycle priority
                    </button>
                    <button
                      class="c--button -bdrs:20 -bgc:base -c:text"
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
        <p class="-ta:center c--compareNote -m:0 -c:text-2 -fz:xs">
          Same Solid 2.0 issue board and interactions in each app · styling: {props.library}
        </p>
      </div>
    </main>
  );
}
