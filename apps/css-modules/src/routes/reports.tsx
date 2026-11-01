import { useWorkspace } from "../layouts/workspace-context";
import { Card } from "../components/Card";
import { Select } from "../components/Select";
import { createMemo, createSignal, For } from "solid-js";
import { CATEGORIES, TEAM_MEMBERS } from "utils";
import { Badge } from "../components/Badge";
import { PageHeading } from "../components/PageHeading";
import { Progress } from "../components/Progress";
import s from "./reports.module.css";
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
        <label class={s.scope}>
          Workstream
          <Select value={scope()} onChange={(e) => setScope(e.currentTarget.value)}>
            <option value="all">All workstreams</option>
            <For each={CATEGORIES}>{(c) => <option>{c}</option>}</For>
          </Select>
        </label>
      </PageHeading>
      <dl class={s.metrics}>
        <div>
          <dt>Total issues</dt>
          <dd>{tasks().length}</dd>
        </div>
        <div>
          <dt>Completed</dt>
          <dd>{completed()}</dd>
        </div>
        <div>
          <dt>Open</dt>
          <dd>{tasks().length - completed()}</dd>
        </div>
        <div>
          <dt>Estimated effort</dt>
          <dd>
            {points()} <small>pts</small>
          </dd>
        </div>
      </dl>
      <div class={s.columns}>
        <Card as="section" class={s.panel} spacing="roomy">
          <h2>Completion by workstream</h2>
          <p>Completed issues as a share of each workstream.</p>
          <For each={categories()}>
            {(c) => (
              <div class={s.barRow}>
                <div>
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
        <Card as="section" class={s.panel} spacing="roomy">
          <h2>Priority distribution</h2>
          <p>Open issues requiring attention.</p>
          <For each={["high", "medium", "low"]}>
            {(priority) => (
              <div class={s.priority}>
                <Badge tone={priority === "high" ? "warning" : "neutral"}>{priority}</Badge>
                <strong>{tasks().filter((t) => !t.done && t.priority === priority).length}</strong>
              </div>
            )}
          </For>
          <p class={s.note}>
            Completing an issue on the board or project checklist updates this report.
          </p>
        </Card>
      </div>
      <Card as="section" class={s.panel} spacing="roomy">
        <h2>Team workload</h2>
        <div class={s.tableScroll}>
          <table class={s.table}>
            <thead>
              <tr>
                <th scope="col">Member</th>
                <th scope="col">Assigned</th>
                <th scope="col">Open</th>
                <th scope="col">Completed</th>
                <th scope="col">Completion</th>
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
                      <th scope="row">{m.name}</th>
                      <td>{assigned().length}</td>
                      <td>{assigned().length - done()}</td>
                      <td>{done()}</td>
                      <td>
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
