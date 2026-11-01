import { Card } from "./components/Card";
import { Button } from "./components/Button";
import { TextInput } from "./components/TextInput";
import { Select } from "./components/Select";
import { For, Show } from "solid-js";
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
  teal: "-bgc -c:brand",
  emerald: "-bgc -c",
  amber: "-bgc -c:orange",
  rose: "-bgc -c:red",
};
const priorityClasses: Record<Priority, string> = {
  high: "b--priority--high",
  medium: "b--priority--medium",
  low: "b--priority--low",
};
export function Board(props: { library: string; tracker: IssueTrackerStore }) {
  return (
    <section class="l--stack -g:30">
      <div class="l--stack -g:30">
        <header class="l--cluster -jc:between -g:20 -bd-be -pbe:20">
          <div class="l--flex -ai:center -g:15">
            <span
              class="l--grid -pi:center -sz -h -fxsh:0 -bdrs -bgc:brand -c:white -fw:700"
              style={{
                "--sz": "var(--markSize)",
                "--h": "var(--markSize)",
                "--bdrs": "var(--markRadius)",
              }}
            >
              S
            </span>
            <div>
              <p class="-fz:xs -c:text-2 -lts:l">DESIGN ENGINEERING / Q4 STYLING MIGRATION</p>
              <h1 class="-fz -fw:600" style={{ "--fz": "var(--issueTitleSize)" }}>
                Solid 2.0 × {props.library}
              </h1>
            </div>
          </div>
          <div class="l--cluster -g:10">
            <div class="l--cluster -g:5" aria-label="Active team members">
              <For each={TEAM_MEMBERS}>
                {(m) => (
                  <span
                    class={`l--grid -pi:center -sz -h -fxsh:0 -bdrs:99 -fz:xs ${toneClasses[m.tone]}`}
                    style={{
                      "--sz": "var(--avatarSize)",
                      "--h": "var(--avatarSize)",
                      "--bgc": `var(--${m.tone === "teal" ? "selectedSurface" : m.tone === "emerald" ? "successSurface" : m.tone === "amber" ? "warningSurface" : "dangerSurface"})`,
                      "--c":
                        m.tone === "teal"
                          ? "var(--brand)"
                          : m.tone === "emerald"
                            ? "var(--successInk)"
                            : m.tone === "amber"
                              ? "var(--orange)"
                              : "var(--red)",
                    }}
                    title={m.name}
                  >
                    {m.initials}
                  </span>
                )}
              </For>
            </div>
            <span class="-c:text-2 -fz:s">Sprint 14</span>
            <Button onClick={() => props.tracker.toggleTheme()}>
              {props.tracker.isDark() ? "Light theme" : "Dark theme"}
            </Button>
          </div>
        </header>
        <section
          class="c--issueMetrics l--columns -cols_md -bd -bgc:base -g:0 -bdrs"
          style={{ "--cols": 2, "--cols_md": 4, "--bdrs": "var(--metricRadius)" }}
        >
          <div>
            <span>Sprint progress</span>
            <strong class="-d:block -fz:2xl">{props.tracker.completionRate()}%</strong>
            <div class="b--progress -ov:hidden -bgc:divider -bdrs:99">
              <i
                class="-d:block -h:100% -w -bgc:brand"
                style={{ "--w": `${props.tracker.completionRate()}%` }}
              />
            </div>
          </div>
          <div>
            <span>Open issues</span>
            <strong class="-d:block -fz:2xl">{props.tracker.activeCount()}</strong>
            <small class="-c:text-2 -fz:xs">Active engineering tasks</small>
          </div>
          <div>
            <span>High priority</span>
            <strong class="-d:block -fz:2xl">{props.tracker.highPriorityActiveCount()}</strong>
            <small class="-c:text-2 -fz:xs">Requires immediate review</small>
          </div>
          <div>
            <span>Categories</span>
            <strong class="-d:block -fz:2xl">{CATEGORIES.length}</strong>
            <small class="-c:text-2 -fz:xs">Tokens, SSR, A11y &amp; Compiler</small>
          </div>
        </section>
        <div
          class="l--grid -gtc -gtc_md -ai:start -g:30"
          style={{
            "--gtc": "minmax(0, 1fr)",
            "--gtc_md": "minmax(0, 1.35fr) minmax(320px, 0.9fr)",
          }}
        >
          <Card as="section" class="is--container l--stack -g:20">
            <div class="l--cluster -jc:between -g:15">
              <div>
                <h2 class="-fz:l">Sprint issues</h2>
                <p>Compare how each library styles this interface</p>
              </div>
              <span class="-c:text-2 -fz:s">{props.tracker.filteredTasks().length} issues</span>
            </div>
            <div
              class="l--grid -gtc -gtc_sm -g:10"
              style={{ "--gtc": "minmax(0,1fr)", "--gtc_sm": "minmax(0,1fr) minmax(140px,180px)" }}
            >
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
            <nav class="l--cluster -g:5 -bd-be" aria-label="Issue status">
              <For each={FILTER_OPTIONS}>
                {(filter) => (
                  <button
                    class="b--tab b--tab--issues set--plain"
                    aria-pressed={props.tracker.filter() === filter ? "true" : "false"}
                    onClick={() => props.tracker.setFilter(filter)}
                  >
                    {FILTER_LABELS[filter]} <span>{props.tracker.countForFilter(filter)}</span>
                  </button>
                )}
              </For>
            </nav>
            <form
              class="c--issueCreate l--grid -gtc -gtc_sm -g:10"
              style={{
                "--gtc": "repeat(2,minmax(0,1fr))",
                "--gtc_sm": "minmax(0,1fr) minmax(100px,140px) auto",
              }}
              onSubmit={(e) => props.tracker.addTask(e)}
            >
              <TextInput
                class="-gc"
                style={{ "--gc": "1 / -1" }}
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
              <Button class="-fz:s" variant="primary" type="submit">
                Create issue
              </Button>
            </form>
            <div
              class="l--grid -gtc -gtc_sm -g:10 -bd-be -pbe:10 -fz:xs -c:text-2"
              style={{
                "--gtc": "minmax(0, 1fr) 70px 42px",
                "--gtc_sm": "minmax(0, 1fr) 100px 78px 55px 45px",
              }}
            >
              <span>Issue</span>
              <span class="-d:none -d_sm" style={{ "--d_sm": "block" }}>
                Category
              </span>
              <span>Priority</span>
              <span class="-d:none -d_sm" style={{ "--d_sm": "block" }}>
                Due
              </span>
              <span />
            </div>
            <ul class="l--stack">
              <For each={props.tracker.filteredTasks()}>
                {(item) => (
                  <li
                    class="c--issueRow l--grid -gtc -gtc_sm -ai:center -g:10 -py:15 -bd-be -fz:s -hov:-bgc"
                    style={{
                      "--gtc": "minmax(0, 1fr) 70px 42px",
                      "--gtc_sm": "minmax(0, 1fr) 100px 78px 55px 45px",
                    }}
                    data-selected={props.tracker.selectedTask()?.id === item.id ? "true" : "false"}
                    onClick={() => props.tracker.setSelectedId(item.id)}
                  >
                    <div class="l--flex -ai:center -g:10 -min-w" style={{ "--min-w": "0" }}>
                      <input
                        type="checkbox"
                        checked={item.done}
                        aria-label={`Mark ${item.key} done`}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => props.tracker.toggleTask(item.id)}
                      />
                      <code class="-fxsh:0">{item.key}</code>
                      <button
                        type="button"
                        class="b--issueTitle c--issueTitle set--plain -ov:hidden -whs:nowrap -ta:left -c:text"
                        data-done={item.done ? "true" : "false"}
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
                    <span class="-d:none -d_sm -c:text-2 -fz:xs" style={{ "--d_sm": "block" }}>
                      {item.category}
                    </span>
                    <span class={`b--priority ${priorityClasses[item.priority]}`}>
                      {PRIORITY_LABELS[item.priority]}
                    </span>
                    <span class="-d:none -d_sm" style={{ "--d_sm": "block" }}>
                      {item.due}
                    </span>
                    <button
                      class="set--plain -fz:xs -c:text-2 -whs:nowrap -hov:-c"
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
              <p class="-p:30 -c:text-2 -ta:center">No issues match these filters.</p>
            </Show>
            <footer class="-fz:s -c:text-2">
              Showing {props.tracker.filteredTasks().length} of {props.tracker.tasks().length}{" "}
              sprint issues
            </footer>
          </Card>
          <Card as="aside" class="l--stack -g:20">
            <Show when={props.tracker.selectedTask()}>
              {(task) => (
                <>
                  <div class="l--flex -ai:start -jc:between -g:15 -bd-be -pbe:20">
                    <div>
                      <p class="-fz:xs -c:text-2 -lts:l">
                        {task().key} · {task().category}
                      </p>
                      <h2 class="-fz:l">{task().title}</h2>
                    </div>
                    <span class={`b--priority ${priorityClasses[task().priority]}`}>
                      {PRIORITY_LABELS[task().priority]}
                    </span>
                  </div>
                  <dl class="l--columns -g:20 -bd-be -pbe:20" style={{ "--cols": 2 }}>
                    <div>
                      <dt class="-c:text-2 -fz:s">Status</dt>
                      <dd>{task().done ? "Completed" : "In progress"}</dd>
                    </div>
                    <div>
                      <dt class="-c:text-2 -fz:s">Assignee</dt>
                      <dd>{task().assignee}</dd>
                    </div>
                    <div>
                      <dt class="-c:text-2 -fz:s">Target date</dt>
                      <dd>{task().due}</dd>
                    </div>
                    <div>
                      <dt class="-c:text-2 -fz:s">Estimate</dt>
                      <dd>{task().estimate}</dd>
                    </div>
                  </dl>
                  <section class="l--stack -g:10">
                    <h3 class="-fz:m">Specification</h3>
                    <p>{task().summary}</p>
                  </section>
                  <section class="l--stack -g:10">
                    <h3 class="-fz:m">Acceptance criteria</h3>
                    <ul class="l--stack">
                      <For each={task().subtasks}>
                        {(sub) => (
                          <li class="l--flex -jc:between -g:10 -py:10 -bd-be -fz:xs">
                            <span>
                              {sub.done ? "✓" : "○"} {sub.label}
                            </span>
                            <small class="-c:text-2 -fz:xs">{sub.done ? "Done" : "Pending"}</small>
                          </li>
                        )}
                      </For>
                    </ul>
                  </section>
                  <section class="c--activity l--stack -g:10">
                    <h3 class="-fz:m">Recent activity</h3>
                    <ul class="l--stack">
                      <For each={task().activity}>
                        {(a) => (
                          <li class="l--flex -jc:between -g:10 -py:10 -fz:xs">
                            <span>
                              <b>{a.author}</b> {a.action}
                            </span>
                            <small class="-c:text-2 -fz:xs">{a.time}</small>
                          </li>
                        )}
                      </For>
                    </ul>
                  </section>
                  <div class="l--cluster -g:10 -pt:20 -bd-bs">
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
        <p class="-ta:center -c:text-2 -fz:xs">
          Same Solid 2.0 issue board and interactions in each app · styling: {props.library}
        </p>
      </div>
    </section>
  );
}
