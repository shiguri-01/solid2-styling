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
        <label class="l--stack -g:5 -fz:s">
          Workstream
          <Select value={scope()} onChange={(e) => setScope(e.currentTarget.value)}>
            <option value="all">All workstreams</option>
            <For each={CATEGORIES}>{(c) => <option>{c}</option>}</For>
          </Select>
        </label>
      </PageHeading>
      <dl
        class="c--reportMetrics l--columns -cols_md -g:0 -py:25 -bd-y -mb:30"
        style={{ "--cols": 2, "--cols_md": 4 }}
      >
        <div>
          <dt class="-c:text-2 -fz:s">Total issues</dt>
          <dd class="-fz" style={{ "--fz": "var(--reportValueSize)" }}>
            {tasks().length}
          </dd>
        </div>
        <div>
          <dt class="-c:text-2 -fz:s">Completed</dt>
          <dd class="-fz" style={{ "--fz": "var(--reportValueSize)" }}>
            {completed()}
          </dd>
        </div>
        <div>
          <dt class="-c:text-2 -fz:s">Open</dt>
          <dd class="-fz" style={{ "--fz": "var(--reportValueSize)" }}>
            {tasks().length - completed()}
          </dd>
        </div>
        <div>
          <dt class="-c:text-2 -fz:s">Estimated effort</dt>
          <dd class="-fz" style={{ "--fz": "var(--reportValueSize)" }}>
            {points()} <small>pts</small>
          </dd>
        </div>
      </dl>
      <div
        class="l--grid -gtc -gtc_md -g:30 -mb:30"
        style={{ "--gtc": "minmax(0, 1fr)", "--gtc_md": "minmax(0, 2fr) minmax(0, 1fr)" }}
      >
        <Card as="section" class="l--stack -g:15" spacing="roomy">
          <h2 class="-fz:l">Completion by workstream</h2>
          <p>Completed issues as a share of each workstream.</p>
          <For each={categories()}>
            {(c) => (
              <div class="l--stack -g:10 -mt:15">
                <div class="l--flex -jc:between -g:10">
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
        <Card as="section" class="l--stack -g:15" spacing="roomy">
          <h2 class="-fz:l">Priority distribution</h2>
          <p>Open issues requiring attention.</p>
          <For each={["high", "medium", "low"]}>
            {(priority) => (
              <div class="l--flex -jc:between -bd-be -py" style={{ "--py": "var(--rowSpace)" }}>
                <Badge tone={priority === "high" ? "warning" : "neutral"}>{priority}</Badge>
                <strong>{tasks().filter((t) => !t.done && t.priority === priority).length}</strong>
              </div>
            )}
          </For>
          <p class="-mt:20 -c:text-2">
            Completing an issue on the board or project checklist updates this report.
          </p>
        </Card>
      </div>
      <Card as="section" class="l--stack -g:15" spacing="roomy">
        <h2 class="-fz:l">Team workload</h2>
        <div class="-ov-x:auto">
          <table class="c--reportTable -w:100% -whs:nowrap">
            <thead>
              <tr>
                <th class="-ta:left -fz:s -c:text-2" scope="col">
                  Member
                </th>
                <th class="-ta:right -fz:s -c:text-2" scope="col">
                  Assigned
                </th>
                <th class="-ta:right -fz:s -c:text-2" scope="col">
                  Open
                </th>
                <th class="-ta:right -fz:s -c:text-2" scope="col">
                  Completed
                </th>
                <th class="-ta:right -fz:s -c:text-2" scope="col">
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
                      <th class="-ta:left" scope="row">
                        {m.name}
                      </th>
                      <td class="-ta:right">{assigned().length}</td>
                      <td class="-ta:right">{assigned().length - done()}</td>
                      <td class="-ta:right">{done()}</td>
                      <td class="-ta:right">
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
