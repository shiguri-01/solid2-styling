import { useWorkspace } from "../layouts/workspace-context";
import { Card } from "../components/Card";
import { Select } from "../components/Select";
import { createMemo, createSignal, For } from "solid-js";
import { CATEGORIES, TEAM_MEMBERS } from "utils";
import { Badge } from "../components/Badge";
import { PageHeading } from "../components/PageHeading";
import { Progress } from "../components/Progress";
export default function Reports() {
  const workspace = useWorkspace();
  const [scope, setScope] = createSignal("all");
  const tasks = createMemo(() =>
    workspace.tracker.tasks().filter((t) => scope() === "all" || t.category === scope()),
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
      <dl class="grid grid-cols-2 m-0 mb-6 gap-y-5 border-y border-line py-5 sm:grid-cols-4">
        <div class="border-r border-line px-5">
          <dt class="text-xs text-muted">Total issues</dt>
          <dd class="m-0 mt-1.5 text-28px tabular-nums">{tasks().length}</dd>
        </div>
        <div class="px-5 sm:border-r sm:border-line">
          <dt class="text-xs text-muted">Completed</dt>
          <dd class="m-0 mt-1.5 text-28px tabular-nums">{completed()}</dd>
        </div>
        <div class="border-r border-line px-5">
          <dt class="text-xs text-muted">Open</dt>
          <dd class="m-0 mt-1.5 text-28px tabular-nums">{tasks().length - completed()}</dd>
        </div>
        <div class="px-5">
          <dt class="text-xs text-muted">Estimated effort</dt>
          <dd class="m-0 mt-1.5 text-28px tabular-nums">
            {points()} <small class="mt-6 text-13px text-muted">pts</small>
          </dd>
        </div>
      </dl>
      <div class="grid mb-6 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card
          as="section"
          class="[&_p]:my-1em [&_h2]:mb-2 [&_h2]:text-base [&_p]:text-13px [&_p]:text-muted [&_h2]:font-semibold"
          spacing="roomy"
        >
          <h2>Completion by workstream</h2>
          <p>Completed issues as a share of each workstream.</p>
          <For each={categories()}>
            {(c) => (
              <div class="grid mt-22px gap-2">
                <div class="flex justify-between text-13px tabular-nums">
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
        <Card
          as="section"
          class="[&_p]:my-1em [&_h2]:mb-2 [&_h2]:text-base [&_p]:text-13px [&_p]:text-muted [&_h2]:font-semibold"
          spacing="roomy"
        >
          <h2>Priority distribution</h2>
          <p>Open issues requiring attention.</p>
          <For each={["high", "medium", "low"]}>
            {(priority) => (
              <div class="flex justify-between border-b border-line density-row">
                <Badge tone={priority === "high" ? "warning" : "neutral"}>{priority}</Badge>
                <strong>{tasks().filter((t) => !t.done && t.priority === priority).length}</strong>
              </div>
            )}
          </For>
          <p class="text-sm text-muted">
            Completing an issue on the board or project checklist updates this report.
          </p>
        </Card>
      </div>
      <Card as="section" class="[&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-semibold" spacing="roomy">
        <h2>Team workload</h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse whitespace-nowrap text-right text-sm [&_tbody_tr:hover]:bg-hover [&_th:first-child]:text-left">
            <thead>
              <tr>
                <th
                  class="border-b border-line density-row px-3 text-xs text-muted font-normal"
                  scope="col"
                >
                  Member
                </th>
                <th
                  class="border-b border-line density-row px-3 text-xs text-muted font-normal"
                  scope="col"
                >
                  Assigned
                </th>
                <th
                  class="border-b border-line density-row px-3 text-xs text-muted font-normal"
                  scope="col"
                >
                  Open
                </th>
                <th
                  class="border-b border-line density-row px-3 text-xs text-muted font-normal"
                  scope="col"
                >
                  Completed
                </th>
                <th
                  class="border-b border-line density-row px-3 text-xs text-muted font-normal"
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
                    <tr>
                      <th class="border-b border-line density-row px-3 font-medium" scope="row">
                        {m.name}
                      </th>
                      <td class="border-b border-line density-row px-3">{assigned().length}</td>
                      <td class="border-b border-line density-row px-3">
                        {assigned().length - done()}
                      </td>
                      <td class="border-b border-line density-row px-3">{done()}</td>
                      <td class="border-b border-line density-row px-3">
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
