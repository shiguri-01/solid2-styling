import { Card } from "../components/Card";
import { Select } from "../components/Select";
import { createMemo, createSignal, For } from "solid-js";
import { CATEGORIES, TEAM_MEMBERS, type IssueTrackerStore } from "utils";
import { Badge } from "../components/Badge";
import { PageHeading } from "../components/PageHeading";
import { Progress } from "../components/Progress";
import { cx } from "zyzz";
import {
  scope as zScope,
  metrics as zMetrics,
  description as zDescription,
  metricValue as zMetricValue,
  columns as zColumns,
  heading as zHeading,
  barRow as zBarRow,
  barLabel as zBarLabel,
  priority as zPriority,
  note as zNote,
  tableScroll as zTableScroll,
  table as zTable,
  cell as zCell,
  tableHeading as zTableHeading,
  rowHeading as zRowHeading,
} from "./page-styles";
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
        <label {...zScope()}>
          Workstream
          <Select value={scope()} onChange={(e) => setScope(e.currentTarget.value)}>
            <option value="all">All workstreams</option>
            <For each={CATEGORIES}>{(c) => <option>{c}</option>}</For>
          </Select>
        </label>
      </PageHeading>
      <dl {...zMetrics()}>
        <div>
          <dt {...zDescription()}>Total issues</dt>
          <dd {...zMetricValue()}>{tasks().length}</dd>
        </div>
        <div>
          <dt {...zDescription()}>Completed</dt>
          <dd {...zMetricValue()}>{completed()}</dd>
        </div>
        <div>
          <dt {...zDescription()}>Open</dt>
          <dd {...zMetricValue()}>{tasks().length - completed()}</dd>
        </div>
        <div>
          <dt {...zDescription()}>Estimated effort</dt>
          <dd {...zMetricValue()}>
            {points()} <small {...zDescription()}>pts</small>
          </dd>
        </div>
      </dl>
      <div {...zColumns()}>
        <Card flow="stack" as="section" spacing="roomy">
          <h2 {...zHeading()}>Completion by workstream</h2>
          <p {...zDescription()}>Completed issues as a share of each workstream.</p>
          <For each={categories()}>
            {(c) => (
              <div {...zBarRow()}>
                <div {...zBarLabel()}>
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
        <Card flow="stack" as="section" spacing="roomy">
          <h2 {...zHeading()}>Priority distribution</h2>
          <p {...zDescription()}>Open issues requiring attention.</p>
          <For each={["high", "medium", "low"]}>
            {(priority) => (
              <div {...zPriority()}>
                <Badge tone={priority === "high" ? "warning" : "neutral"}>{priority}</Badge>
                <strong>{tasks().filter((t) => !t.done && t.priority === priority).length}</strong>
              </div>
            )}
          </For>
          <p {...zNote()}>
            Completing an issue on the board or project checklist updates this report.
          </p>
        </Card>
      </div>
      <Card flow="stack" as="section" spacing="roomy">
        <h2 {...zHeading()}>Team workload</h2>
        <div {...zTableScroll()}>
          <table {...zTable()}>
            <thead>
              <tr>
                <th {...cx(zCell(), zTableHeading(), zRowHeading())} scope="col">
                  Member
                </th>
                <th {...cx(zCell(), zTableHeading())} scope="col">
                  Assigned
                </th>
                <th {...cx(zCell(), zTableHeading())} scope="col">
                  Open
                </th>
                <th {...cx(zCell(), zTableHeading())} scope="col">
                  Completed
                </th>
                <th {...cx(zCell(), zTableHeading())} scope="col">
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
                      <th {...cx(zCell(), zRowHeading())} scope="row">
                        {m.name}
                      </th>
                      <td {...zCell()}>{assigned().length}</td>
                      <td {...zCell()}>{assigned().length - done()}</td>
                      <td {...zCell()}>{done()}</td>
                      <td {...zCell()}>
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
