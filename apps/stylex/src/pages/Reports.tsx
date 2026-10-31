import { Card } from "../components/Card";
import { Select } from "../components/Select";
import { createMemo, createSignal, For } from "solid-js";
import { CATEGORIES, TEAM_MEMBERS, type IssueTrackerStore } from "utils";
import { Badge } from "../components/Badge";
import { PageHeading } from "../components/PageHeading";
import { Progress } from "../components/Progress";
import * as stylex from "@stylexjs/stylex";
import { pageStyles as s } from "./page-styles";
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
        <label class={stylex.attrs(s.scope).class}>
          Workstream
          <Select value={scope()} onChange={(e) => setScope(e.currentTarget.value)}>
            <option value="all">All workstreams</option>
            <For each={CATEGORIES}>{(c) => <option>{c}</option>}</For>
          </Select>
        </label>
      </PageHeading>
      <dl class={stylex.attrs(s.metrics).class}>
        <div class={stylex.attrs(s.metric).class}>
          <dt class={stylex.attrs(s.metricLabel).class}>Total issues</dt>
          <dd class={stylex.attrs(s.metricValue).class}>{tasks().length}</dd>
        </div>
        <div class={stylex.attrs(s.metric).class}>
          <dt class={stylex.attrs(s.metricLabel).class}>Completed</dt>
          <dd class={stylex.attrs(s.metricValue).class}>{completed()}</dd>
        </div>
        <div class={stylex.attrs(s.metric).class}>
          <dt class={stylex.attrs(s.metricLabel).class}>Open</dt>
          <dd class={stylex.attrs(s.metricValue).class}>{tasks().length - completed()}</dd>
        </div>
        <div class={stylex.attrs(s.metric, s.metricLast).class}>
          <dt class={stylex.attrs(s.metricLabel).class}>Estimated effort</dt>
          <dd class={stylex.attrs(s.metricValue).class}>
            {points()} <small class={stylex.attrs(s.metricLabel).class}>pts</small>
          </dd>
        </div>
      </dl>
      <div class={stylex.attrs(s.columns).class}>
        <Card as="section" xstyle={s.panel} spacing="roomy">
          <h2 class={stylex.attrs(s.heading).class}>Completion by workstream</h2>
          <p class={stylex.attrs(s.description).class}>
            Completed issues as a share of each workstream.
          </p>
          <For each={categories()}>
            {(c) => (
              <div class={stylex.attrs(s.barRow).class}>
                <div class={stylex.attrs(s.barLabel).class}>
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
        <Card as="section" xstyle={s.panel} spacing="roomy">
          <h2 class={stylex.attrs(s.heading).class}>Priority distribution</h2>
          <p class={stylex.attrs(s.description).class}>Open issues requiring attention.</p>
          <For each={["high", "medium", "low"]}>
            {(priority) => (
              <div class={stylex.attrs(s.priority).class}>
                <Badge tone={priority === "high" ? "warning" : "neutral"}>{priority}</Badge>
                <strong>{tasks().filter((t) => !t.done && t.priority === priority).length}</strong>
              </div>
            )}
          </For>
          <p class={stylex.attrs(s.note).class}>
            Completing an issue on the board or project checklist updates this report.
          </p>
        </Card>
      </div>
      <Card as="section" xstyle={s.panel} spacing="roomy">
        <h2 class={stylex.attrs(s.heading).class}>Team workload</h2>
        <div class={stylex.attrs(s.tableScroll).class}>
          <table class={stylex.attrs(s.table).class}>
            <thead>
              <tr>
                <th class={stylex.attrs(s.cell, s.tableHeading, s.rowHeading).class} scope="col">
                  Member
                </th>
                <th class={stylex.attrs(s.cell, s.tableHeading).class} scope="col">
                  Assigned
                </th>
                <th class={stylex.attrs(s.cell, s.tableHeading).class} scope="col">
                  Open
                </th>
                <th class={stylex.attrs(s.cell, s.tableHeading).class} scope="col">
                  Completed
                </th>
                <th class={stylex.attrs(s.cell, s.tableHeading).class} scope="col">
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
                      <th class={stylex.attrs(s.cell, s.rowHeading).class} scope="row">
                        {m.name}
                      </th>
                      <td class={stylex.attrs(s.cell).class}>{assigned().length}</td>
                      <td class={stylex.attrs(s.cell).class}>{assigned().length - done()}</td>
                      <td class={stylex.attrs(s.cell).class}>{done()}</td>
                      <td class={stylex.attrs(s.cell).class}>
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
