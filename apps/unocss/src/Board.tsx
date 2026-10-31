import { For, Show } from "solid-js";
import { Button } from "./components/Button";
import { Select } from "./components/Select";
import { TextInput } from "./components/TextInput";
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
    <section class="min-w-0">
      <div class="flex flex-col gap-5">
        <header class="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-18px">
          <div class="flex items-center gap-3 [&_h1]:m-0 [&_h1]:text-22px [&_h1]:font-semibold">
            <span class="grid h-34px w-34px place-items-center rounded-10px bg-brand text-brand-contrast font-bold">
              S
            </span>
            <div>
              <p class="m-0 text-11px text-muted tracking-[.08em]">
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
                    class={`grid h-27px w-27px place-items-center border-2 border-ground rounded-full text-10px -ml-5px ${toneClasses[m.tone]}`}
                    title={m.name}
                  >
                    {m.initials}
                  </span>
                )}
              </For>
            </div>
            <span class="text-11px text-muted">Sprint 14</span>
            <Button onClick={() => props.tracker.toggleTheme()}>
              {props.tracker.isDark() ? "Light theme" : "Dark theme"}
            </Button>
          </div>
        </header>
        <section class="grid grid-cols-2 border border-line rounded-9px bg-paper md:grid-cols-4 [&>div]:flex [&>div]:flex-col [&>div]:gap-1.5 [&>div:last-child]:border-0 [&>div]:border-r [&>div]:border-line [&>div]:p-[18px_20px] [&_small]:text-11px [&_span]:text-xs [&_strong]:text-2xl [&_small]:text-muted [&_span]:text-muted [&_strong]:font-semibold [&_strong]:leading-[1.2]">
          <div>
            <span>Sprint progress</span>
            <strong>{props.tracker.completionRate()}%</strong>
            <div class="h-4px overflow-hidden rounded-4px bg-line [&_i]:block [&_i]:h-full [&_i]:bg-brand-solid">
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
        <div class="grid items-start gap-18px lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,.9fr)]">
          <section class="min-w-0 border border-line rounded-6px bg-paper p-5 @container max-[700px]:p-4">
            <div class="flex items-center justify-between gap-2.5 [&_h2]:m-0 [&_p]:mb-0 [&_p]:mt-1 [&_h2]:text-base [&_p]:text-xs [&_p]:text-muted [&_h2]:font-semibold">
              <div>
                <h2>Sprint issues</h2>
                <p>Compare how each library styles this interface</p>
              </div>
              <span class="text-11px text-muted">
                {props.tracker.filteredTasks().length} issues
              </span>
            </div>
            <div class="grid mt-18px gap-2 @[380px]:grid-cols-[minmax(0,1fr)_minmax(140px,180px)]">
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
            <nav class="mt-3 flex gap-1 border-b border-line" aria-label="Issue status">
              <For each={FILTER_OPTIONS}>
                {(filter) => (
                  <button
                    class={`cursor-pointer border-0 border-b-2 border-solid bg-transparent px-2.5 py-9px text-xs [&_span]:ml-1 [&_span]:text-10px ${props.tracker.filter() === filter ? "border-brand text-brand" : "border-transparent text-muted"}`}
                    onClick={() => props.tracker.setFilter(filter)}
                  >
                    {FILTER_LABELS[filter]} <span>{props.tracker.countForFilter(filter)}</span>
                  </button>
                )}
              </For>
            </nav>
            <form
              class="grid grid-cols-2 mt-14px items-center gap-2 @[380px]:grid-cols-[minmax(0,1fr)_minmax(100px,140px)_auto] @[640px]:grid-cols-[minmax(180px,1fr)_minmax(140px,160px)_minmax(100px,120px)_auto]"
              onSubmit={(e) => props.tracker.addTask(e)}
            >
              <TextInput
                class="col-span-full @[640px]:col-span-1"
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
              <button
                class="col-span-full min-h-40px cursor-pointer whitespace-nowrap border border-ink rounded-4px bg-ink px-3 py-9px text-paper leading-20px @[380px]:col-span-1"
                type="submit"
              >
                Create issue
              </button>
            </form>
            <div class="grid grid-cols-[minmax(0,1fr)_70px_42px] mt-5 gap-2 border-b border-line px-5px pb-2 text-11px text-muted @[560px]:grid-cols-[minmax(0,1fr)_100px_78px_55px_45px]">
              <span>Issue</span>
              <span class="hidden @[560px]:block">Category</span>
              <span>Priority</span>
              <span class="hidden @[560px]:block">Due</span>
              <span />
            </div>
            <ul class="m-0 list-none p-0">
              <For each={props.tracker.filteredTasks()}>
                {(item) => (
                  <li
                    class={`grid grid-cols-[minmax(0,1fr)_70px_42px] min-h-49px cursor-pointer items-center gap-2 border-b border-line px-5px text-11px @[560px]:grid-cols-[minmax(0,1fr)_100px_78px_55px_45px] hover:bg-row-hover ${props.tracker.selectedTask()?.id === item.id ? "bg-selected shadow-[inset_2px_0_var(--brand)]" : ""}`}
                    onClick={() => props.tracker.setSelectedId(item.id)}
                  >
                    <div class="min-w-0 flex items-center gap-7px [&_code]:shrink-0 [&_span]:overflow-hidden [&_span]:text-ellipsis [&_code]:whitespace-nowrap [&_span]:whitespace-nowrap [&_code]:text-10px [&_code]:text-muted">
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
                        class={[
                          "min-w-0 cursor-pointer truncate bg-transparent p-0 text-left",
                          item.done && "text-muted line-through",
                        ]}
                        aria-pressed={
                          props.tracker.selectedTask()?.id === item.id ? "true" : "false"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          props.tracker.setSelectedId(item.id);
                        }}
                      >
                        {item.title}
                      </button>
                    </div>
                    <span class="hidden overflow-hidden text-ellipsis whitespace-nowrap text-muted @[560px]:block">
                      {item.category}
                    </span>
                    <span
                      class={`w-max rounded-20px px-7px py-3px text-10px ${priorityClasses[item.priority]}`}
                    >
                      {PRIORITY_LABELS[item.priority]}
                    </span>
                    <span class="hidden @[560px]:block">{item.due}</span>
                    <button
                      class="cursor-pointer border-0 bg-transparent text-10px text-muted"
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
            <footer class="pt-3 text-11px text-muted">
              Showing {props.tracker.filteredTasks().length} of {props.tracker.tasks().length}{" "}
              sprint issues
            </footer>
          </section>
          <aside class="min-w-0 border border-line rounded-6px bg-paper p-5 max-[700px]:p-4">
            <Show when={props.tracker.selectedTask()}>
              {(task) => (
                <>
                  <div class="flex items-start justify-between gap-2.5 border-b border-line pb-14px [&_h2]:mb-0 [&_h2]:mt-5px [&_h2]:text-base [&_h2]:leading-[1.4]">
                    <div>
                      <p class="m-0 text-11px text-muted tracking-[.08em]">
                        {task().key} · {task().category}
                      </p>
                      <h2>{task().title}</h2>
                    </div>
                    <span
                      class={`w-max rounded-20px px-7px py-3px text-10px ${priorityClasses[task().priority]}`}
                    >
                      {PRIORITY_LABELS[task().priority]}
                    </span>
                  </div>
                  <dl class="grid grid-cols-2 my-0 gap-14px border-b border-line py-4 [&_div]:grid [&_dd]:m-0 [&_div]:gap-1 [&_dd]:text-xs [&_dt]:text-11px [&_dt]:text-muted [&_dd]:font-medium">
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
                  <section class="mt-4 [&_p]:m-0 [&_h3]:mb-2 [&_h3]:mt-0 [&_h3]:text-xs [&_p]:text-xs [&_h3]:text-muted [&_p]:text-body-muted [&_h3]:font-semibold [&_p]:leading-relaxed">
                    <h3>Specification</h3>
                    <p>{task().summary}</p>
                  </section>
                  <section class="mt-4 [&_p]:m-0 [&_h3]:mb-2 [&_h3]:mt-0 [&_h3]:text-xs [&_p]:text-xs [&_h3]:text-muted [&_p]:text-body-muted [&_h3]:font-semibold [&_p]:leading-relaxed">
                    <h3>Acceptance criteria</h3>
                    <ul class="m-0 list-none p-0 [&_li]:flex [&_li]:justify-between [&_li]:gap-2.5 [&_small]:whitespace-nowrap [&_li]:border-b [&_li]:border-line [&_li]:py-2 [&_li]:text-11px [&_small]:text-muted">
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
                  <section class="mt-4 [&_p]:m-0 [&_h3]:mb-2 [&_h3]:mt-0 [&_h3]:text-xs [&_p]:text-xs [&_h3]:text-muted [&_p]:text-body-muted [&_h3]:font-semibold [&_p]:leading-relaxed">
                    <h3>Recent activity</h3>
                    <ul class="m-0 list-none p-0 [&_li]:flex [&_li]:justify-between [&_li]:gap-2.5 [&_small]:whitespace-nowrap [&_li]:py-7px [&_li]:text-11px [&_small]:text-muted">
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
                  <div class="mt-18px flex gap-2 border-t border-line pt-14px">
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
        <p class="m-0 text-center text-11px text-muted">
          Same Solid 2.0 issue board and interactions in each app · styling: {props.library}
        </p>
      </div>
    </section>
  );
}
