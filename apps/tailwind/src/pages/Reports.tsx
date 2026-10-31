import { Card } from "../components/Card";
import { Select } from "../components/Select";
import { createMemo, createSignal, For } from "solid-js";
import { CATEGORIES, TEAM_MEMBERS, type IssueTrackerStore } from "utils";
import { Badge } from "../components/Badge";
import { PageHeading } from "../components/PageHeading";
import { Progress } from "../components/Progress";
export default function Reports(props: { tracker: IssueTrackerStore }) {
  const [scope, setScope] = createSignal("all");
  const tasks = createMemo(() =>
    props.tracker.tasks().filter((t) => scope() === "all" || t.category === scope()),
  );
  const completed = createMemo(() => tasks().filter((t) => t.done).length);
  const points = createMemo(() => tasks().reduce((n, t) => n + parseInt(t.estimate), 0));
  const categories = createMemo(() =>
    CATEGORIES.map((name) => ({
      name,
      total: tasks().filter((t) => t.category === name).length,
      done: tasks().filter((t) => t.category === name && t.done).length,
    })),
  );
  return (
    <>
      <PageHeading
        title="Delivery report"
        description="Current issue snapshot · all figures are derived from the workspace."
      >
        <label class="grid gap-1.5 text-xs">
          Workstream
          <Select value={scope()} onChange={(e) => setScope(e.currentTarget.value)}>
            <option value="all">All workstreams</option>
            <For each={CATEGORIES}>{(c) => <option>{c}</option>}</For>
          </Select>
        </label>
      </PageHeading>
      <dl class="mb-6 grid grid-cols-2 gap-y-5 border-y border-line py-5 min-[561px]:grid-cols-4 [&>div]:border-r [&>div]:border-line [&>div:last-child]:border-0 max-[560px]:[&>div:nth-child(2)]:border-0">
        <div class="px-5">
          <dt class="text-xs text-muted">Total issues</dt>
          <dd class="mt-1.5 text-[28px] tabular-nums">{tasks().length}</dd>
        </div>
        <div class="px-5">
          <dt class="text-xs text-muted">Completed</dt>
          <dd class="mt-1.5 text-[28px] tabular-nums">{completed()}</dd>
        </div>
        <div class="px-5">
          <dt class="text-xs text-muted">Open</dt>
          <dd class="mt-1.5 text-[28px] tabular-nums">{tasks().length - completed()}</dd>
        </div>
        <div class="px-5">
          <dt class="text-xs text-muted">Estimated effort</dt>
          <dd class="mt-1.5 text-[28px] tabular-nums">
            {points()} <small class="text-[13px] text-muted">pts</small>
          </dd>
        </div>
      </dl>
      <div class="mb-6 grid gap-6 xl:grid-cols-[2fr_1fr]">
        <Card as="section" spacing="roomy">
          <h2 class="mb-2 text-base font-semibold">Completion by workstream</h2>
          <p class="text-[13px] text-muted">Completed issues as a share of each workstream.</p>
          <For each={categories()}>
            {(c) => (
              <div class="mt-[22px]">
                <div class="mb-2 flex justify-between text-[13px] tabular-nums">
                  <span>{c.name}</span>
                  <span>
                    {c.done} / {c.total}
                  </span>
                </div>
                <Progress
                  label={`${c.name} complete`}
                  value={c.total ? Math.round((c.done / c.total) * 100) : 0}
                />
              </div>
            )}
          </For>
        </Card>
        <Card as="section" spacing="roomy">
          <h2 class="mb-2 text-base font-semibold">Priority distribution</h2>
          <p class="text-[13px] text-muted">Open issues requiring attention.</p>
          <For each={["high", "medium", "low"]}>
            {(priority) => (
              <div class="flex justify-between border-b border-line py-(--row-space)">
                <Badge tone={priority === "high" ? "warning" : "neutral"}>{priority}</Badge>
                <strong>{tasks().filter((t) => !t.done && t.priority === priority).length}</strong>
              </div>
            )}
          </For>
          <p class="mt-6 text-[13px] text-muted">
            Completing an issue on the board or project checklist updates this report.
          </p>
        </Card>
      </div>
      <Card as="section" spacing="roomy">
        <h2 class="mb-2 text-base font-semibold">Team workload</h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse whitespace-nowrap">
            <thead>
              <tr>
                <th
                  class="border-b border-line px-3 py-(--row-space) text-left text-xs font-normal text-muted"
                  scope="col"
                >
                  Member
                </th>
                <th
                  class="border-b border-line px-3 py-(--row-space) text-right text-xs font-normal text-muted"
                  scope="col"
                >
                  Assigned
                </th>
                <th
                  class="border-b border-line px-3 py-(--row-space) text-right text-xs font-normal text-muted"
                  scope="col"
                >
                  Open
                </th>
                <th
                  class="border-b border-line px-3 py-(--row-space) text-right text-xs font-normal text-muted"
                  scope="col"
                >
                  Completed
                </th>
                <th
                  class="border-b border-line px-3 py-(--row-space) text-right text-xs font-normal text-muted"
                  scope="col"
                >
                  Completion
                </th>
              </tr>
            </thead>
            <tbody>
              <For each={TEAM_MEMBERS}>
                {(m) => {
                  const assigned = createMemo(() =>
                    tasks().filter((t) => t.assignee === m.initials),
                  );
                  const done = createMemo(() => assigned().filter((t) => t.done).length);
                  return (
                    <tr class="hover:bg-row-hover">
                      <th
                        class="border-b border-line px-3 py-(--row-space) text-left font-medium"
                        scope="row"
                      >
                        {m.name}
                      </th>
                      <td class="border-b border-line px-3 py-(--row-space) text-right tabular-nums">
                        {assigned().length}
                      </td>
                      <td class="border-b border-line px-3 py-(--row-space) text-right tabular-nums">
                        {assigned().length - done()}
                      </td>
                      <td class="border-b border-line px-3 py-(--row-space) text-right tabular-nums">
                        {done()}
                      </td>
                      <td class="border-b border-line px-3 py-(--row-space) text-right tabular-nums">
                        {assigned().length ? Math.round((done() / assigned().length) * 100) : 0}%
                      </td>
                    </tr>
                  );
                }}
              </For>
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
