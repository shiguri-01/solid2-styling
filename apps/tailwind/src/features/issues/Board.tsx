import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { Select } from "../../components/Select";
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
  teal: "bg-teal-soft text-teal-ink",
  emerald: "bg-emerald-soft text-emerald-ink",
  amber: "bg-amber-soft text-amber-ink",
  rose: "bg-rose-soft text-rose-ink",
};

const priorityClasses: Record<Priority, string> = {
  high: "bg-red-soft text-red-ink",
  medium: "bg-priority-amber-soft text-priority-amber-ink",
  low: "bg-green-soft text-green-ink",
};

export function Board(props: { library: string; tracker: IssueTrackerStore }) {
  return (
    <section class="text-ink">
      <div class="flex flex-col gap-5">
        <header class="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-[18px]">
          <div class="flex items-center gap-3 [&_h1]:m-0 [&_h1]:text-[22px] [&_h1]:font-semibold">
            <span class="grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-brand font-bold text-white">
              S
            </span>
            <div>
              <p class="m-0 text-[11px] tracking-[.08em] text-muted">
                DESIGN ENGINEERING / Q4 STYLING MIGRATION
              </p>
              <h1>Solid 2.0 × {props.library}</h1>
            </div>
          </div>
          <div class="flex items-center gap-2.5">
            <div class="flex" aria-label="Active team members">
              <For each={TEAM_MEMBERS}>
                {(m) => (
                  <span
                    class={`-ml-[5px] grid h-[27px] w-[27px] place-items-center rounded-full border-2 border-ground text-[10px] ${toneClasses[m.tone]}`}
                    title={m.name}
                  >
                    {m.initials}
                  </span>
                )}
              </For>
            </div>
            <span class="text-[11px] text-muted">Sprint 14</span>
            <Button onClick={() => props.tracker.toggleTheme()}>
              {props.tracker.isDark() ? "Light theme" : "Dark theme"}
            </Button>
          </div>
        </header>
        <section class="grid grid-cols-2 rounded-[9px] border border-line bg-paper md:grid-cols-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-1.5 [&>div]:border-r [&>div]:border-line [&>div]:p-[18px_20px] [&>div:last-child]:border-0 [&_span]:text-xs [&_span]:text-muted [&_strong]:text-2xl [&_strong]:font-bold [&_small]:text-[11px] [&_small]:text-muted">
          <div>
            <span>Sprint progress</span>
            <strong>{props.tracker.completionRate()}%</strong>
            <div class="h-1 overflow-hidden rounded-full bg-line [&_i]:block [&_i]:h-full [&_i]:bg-brand">
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
        <div class="grid items-start gap-[18px] lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,.9fr)]">
          <section class="@container/issue-panel min-w-0 rounded-md border border-line bg-paper p-5 max-[700px]:p-4">
            <div class="flex items-center justify-between gap-2.5 [&_h2]:m-0 [&_h2]:text-base [&_h2]:font-semibold [&_p]:mt-1 [&_p]:mb-0 [&_p]:text-xs [&_p]:text-muted">
              <div>
                <h2>Sprint issues</h2>
                <p>Compare how each library styles this interface</p>
              </div>
              <span class="text-[11px] text-muted">
                {props.tracker.filteredTasks().length} issues
              </span>
            </div>
            <div class="mt-[18px] grid grid-cols-[minmax(0,1fr)_minmax(140px,180px)] items-center gap-2 @max-[380px]/issue-panel:grid-cols-1">
              <TextInput
                class="flex-1"
                aria-label="Search issues"
                type="search"
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
            <nav class="mt-3 flex gap-1 border-b border-line" aria-label="Issue status">
              <For each={FILTER_OPTIONS}>
                {(filter) => (
                  <button
                    class="cursor-pointer rounded-none border-x-0 border-t-0 border-b-2 border-transparent bg-transparent px-2.5 py-[9px] text-xs text-muted aria-pressed:border-brand aria-pressed:text-brand [&_span]:ml-1 [&_span]:text-[10px]"
                    aria-pressed={props.tracker.filter() === filter ? "true" : "false"}
                    onClick={() => props.tracker.setFilter(filter)}
                  >
                    {FILTER_LABELS[filter]} <span>{props.tracker.countForFilter(filter)}</span>
                  </button>
                )}
              </For>
            </nav>
            <form
              class="mt-[14px] grid grid-cols-[minmax(180px,1fr)_minmax(140px,160px)_minmax(100px,120px)_auto] items-center gap-2 @max-[640px]/issue-panel:grid-cols-[minmax(0,1fr)_minmax(100px,140px)_auto] @max-[380px]/issue-panel:grid-cols-2"
              onSubmit={(e) => props.tracker.addTask(e)}
            >
              <TextInput
                class="@max-[640px]/issue-panel:col-span-full"
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
              <Button
                class="whitespace-nowrap @max-[380px]/issue-panel:col-span-full"
                variant="primary"
                type="submit"
              >
                Create issue
              </Button>
            </form>
            <div class="mt-5 grid grid-cols-[minmax(0,1fr)_100px_78px_55px_45px] gap-2 border-b border-line px-[5px] pb-2 text-[11px] text-muted @max-[560px]/issue-panel:grid-cols-[minmax(0,1fr)_70px_42px] @max-[560px]/issue-panel:[&>span:nth-child(2)]:hidden @max-[560px]/issue-panel:[&>span:nth-child(4)]:hidden">
              <span>Issue</span>
              <span>Category</span>
              <span>Priority</span>
              <span>Due</span>
              <span />
            </div>
            <ul class="m-0 list-none p-0">
              <For each={props.tracker.filteredTasks()}>
                {(item) => (
                  <li
                    class={`grid min-h-[49px] cursor-pointer grid-cols-[minmax(0,1fr)_100px_78px_55px_45px] items-center gap-2 border-b border-line px-[5px] text-[11px] hover:bg-row-hover @max-[560px]/issue-panel:grid-cols-[minmax(0,1fr)_70px_42px] @max-[560px]/issue-panel:[&>span:nth-child(2)]:hidden @max-[560px]/issue-panel:[&>span:nth-child(4)]:hidden ${props.tracker.selectedTask()?.id === item.id ? "bg-selected shadow-[inset_2px_0_var(--color-brand)] hover:bg-selected-hover" : ""}`}
                    onClick={() => props.tracker.setSelectedId(item.id)}
                  >
                    <label class="flex min-w-0 items-center gap-[7px] [&_span]:overflow-hidden [&_span]:text-ellipsis [&_span]:whitespace-nowrap [&_code]:shrink-0 [&_code]:text-[10px] [&_code]:text-muted [&_code]:whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={item.done}
                        aria-label={`Mark ${item.key} done`}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => props.tracker.toggleTask(item.id)}
                      />
                      <code>{item.key}</code>
                      <span class={item.done ? "text-muted line-through" : ""}>{item.title}</span>
                    </label>
                    <span class="overflow-hidden text-ellipsis whitespace-nowrap text-muted">
                      {item.category}
                    </span>
                    <span
                      class={`w-max rounded-[20px] px-[7px] py-[3px] text-[10px] ${priorityClasses[item.priority]}`}
                    >
                      {PRIORITY_LABELS[item.priority]}
                    </span>
                    <span>{item.due}</span>
                    <button
                      class="cursor-pointer border-0 bg-transparent text-[10px] text-muted"
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
              <p class="p-6 text-center text-muted">No issues match these filters.</p>
            </Show>
            <footer class="pt-3 text-[11px] text-muted">
              Showing {props.tracker.filteredTasks().length} of {props.tracker.tasks().length}{" "}
              sprint issues
            </footer>
          </section>
          <aside class="min-w-0 rounded-md border border-line bg-paper p-5 max-[700px]:p-4">
            <Show when={props.tracker.selectedTask()}>
              {(task) => (
                <>
                  <div class="flex items-start justify-between gap-2.5 border-b border-line pb-[14px] [&_h2]:mt-[5px] [&_h2]:mb-0 [&_h2]:text-base [&_h2]:leading-[1.4] [&_h2]:font-bold">
                    <div>
                      <p class="m-0 text-[11px] tracking-[.08em] text-muted">
                        {task().key} · {task().category}
                      </p>
                      <h2>{task().title}</h2>
                    </div>
                    <span
                      class={`w-max rounded-[20px] px-[7px] py-[3px] text-[10px] ${priorityClasses[task().priority]}`}
                    >
                      {PRIORITY_LABELS[task().priority]}
                    </span>
                  </div>
                  <dl class="my-0 grid grid-cols-2 gap-[14px] border-b border-line py-4 [&_div]:grid [&_div]:gap-1 [&_dt]:text-[11px] [&_dt]:text-muted [&_dd]:m-0 [&_dd]:text-xs [&_dd]:font-medium">
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
                  <section class="mt-4 [&_h3]:mb-2 [&_h3]:mt-0 [&_h3]:text-xs [&_h3]:font-bold [&_h3]:text-muted [&_p]:m-0 [&_p]:text-xs [&_p]:leading-relaxed [&_p]:text-ink">
                    <h3>Specification</h3>
                    <p>{task().summary}</p>
                  </section>
                  <section class="mt-4 [&_h3]:mb-2 [&_h3]:mt-0 [&_h3]:text-xs [&_h3]:font-bold [&_h3]:text-muted [&_p]:m-0 [&_p]:text-xs [&_p]:leading-relaxed [&_p]:text-ink">
                    <h3>Acceptance criteria</h3>
                    <ul class="m-0 list-none p-0 [&_li]:flex [&_li]:justify-between [&_li]:gap-2.5 [&_li]:border-b [&_li]:border-line [&_li]:py-2 [&_li]:text-[11px] [&_small]:whitespace-nowrap [&_small]:text-muted">
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
                  <section class="mt-4 [&_h3]:mb-2 [&_h3]:mt-0 [&_h3]:text-xs [&_h3]:font-bold [&_h3]:text-muted [&_p]:m-0 [&_p]:text-xs [&_p]:leading-relaxed [&_p]:text-ink">
                    <h3>Recent activity</h3>
                    <ul class="m-0 list-none p-0 [&_li]:flex [&_li]:justify-between [&_li]:gap-2.5 [&_li]:py-[7px] [&_li]:text-[11px] [&_small]:whitespace-nowrap [&_small]:text-muted">
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
                  <div class="mt-[18px] flex gap-2 border-t border-line pt-[14px]">
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
          </aside>
        </div>
        <p class="m-0 text-center text-[11px] text-muted">
          Same Solid 2.0 issue board and interactions in each app · styling: {props.library}
        </p>
      </div>
    </section>
  );
}
