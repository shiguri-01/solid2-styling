import { useWorkspace } from "../layouts/workspace-context";
import { Card } from "../components/Card";
import { Select } from "../components/Select";
import { createMemo, createSignal, For } from "solid-js";
import { CATEGORIES, TEAM_MEMBERS } from "utils";
import { Badge } from "../components/Badge";
import { PageHeading } from "../components/PageHeading";
import { Progress } from "../components/Progress";
import { css } from "@yak/solid";
import { Heading, Description } from "../components/ui";
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
        <label
          css={css`
            display: grid;
            gap: 0.4rem;
            font-size: 0.75rem;
          `}
        >
          Workstream
          <Select value={scope()} onChange={(e) => setScope(e.currentTarget.value)}>
            <option value="all">All workstreams</option>
            <For each={CATEGORIES}>{(c) => <option>{c}</option>}</For>
          </Select>
        </label>
      </PageHeading>
      <dl
        css={css`
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0;
          & > div {
            padding-inline: 20px;
            border-right: 1px solid var(--line);
          }
          & > div:last-child {
            border: 0;
          }
          & small {
            font-size: 14px;
            color: var(--muted);
          }
          margin: 0 0 1.5rem;
          padding: 1.25rem 0;
          border-block: 1px solid var(--line);
          @media (max-width: 560px) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 20px 0;
            & > div:nth-child(2) {
              border: 0;
            }
          }
        `}
      >
        <div>
          <dt
            css={css`
              color: var(--muted);
              font-size: 0.75rem;
            `}
          >
            Total issues
          </dt>
          <dd
            css={css`
              margin: 0.4rem 0 0;
              font-size: 1.75rem;
              font-variant-numeric: tabular-nums;
            `}
          >
            {tasks().length}
          </dd>
        </div>
        <div>
          <dt
            css={css`
              color: var(--muted);
              font-size: 0.75rem;
            `}
          >
            Completed
          </dt>
          <dd
            css={css`
              margin: 0.4rem 0 0;
              font-size: 1.75rem;
              font-variant-numeric: tabular-nums;
            `}
          >
            {completed()}
          </dd>
        </div>
        <div>
          <dt
            css={css`
              color: var(--muted);
              font-size: 0.75rem;
            `}
          >
            Open
          </dt>
          <dd
            css={css`
              margin: 0.4rem 0 0;
              font-size: 1.75rem;
              font-variant-numeric: tabular-nums;
            `}
          >
            {tasks().length - completed()}
          </dd>
        </div>
        <div>
          <dt
            css={css`
              color: var(--muted);
              font-size: 0.75rem;
            `}
          >
            Estimated effort
          </dt>
          <dd
            css={css`
              margin: 0.4rem 0 0;
              font-size: 1.75rem;
              font-variant-numeric: tabular-nums;
            `}
          >
            {points()} <small>pts</small>
          </dd>
        </div>
      </dl>
      <div
        css={css`
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          @media (max-width: 1000px) {
            grid-template-columns: minmax(0, 1fr);
          }
        `}
      >
        <Card
          as="section"
          css={css`
            display: grid;
            gap: 0.5rem;
          `}
          spacing="roomy"
        >
          <Heading>Completion by workstream</Heading>
          <Description
            css={css`
              font-size: 13px;
            `}
          >
            Completed issues as a share of each workstream.
          </Description>
          <For each={categories()}>
            {(c) => (
              <div
                css={css`
                  margin-top: 1rem;
                  display: grid;
                  gap: 0.5rem;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                    gap: 0.5rem;
                    font-variant-numeric: tabular-nums;
                  `}
                >
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
          css={css`
            display: grid;
            gap: 0.5rem;
          `}
          spacing="roomy"
        >
          <Heading>Priority distribution</Heading>
          <Description
            css={css`
              font-size: 13px;
            `}
          >
            Open issues requiring attention.
          </Description>
          <For each={["high", "medium", "low"]}>
            {(priority) => (
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  padding-block: var(--row-space);
                  border-bottom: 1px solid var(--line);
                `}
              >
                <Badge tone={priority === "high" ? "warning" : "neutral"}>{priority}</Badge>
                <strong>{tasks().filter((t) => !t.done && t.priority === priority).length}</strong>
              </div>
            )}
          </For>
          <p
            css={css`
              margin-top: 1rem;
              color: var(--muted);
            `}
          >
            Completing an issue on the board or project checklist updates this report.
          </p>
        </Card>
      </div>
      <Card
        as="section"
        css={css`
          display: grid;
          gap: 0.5rem;
        `}
        spacing="roomy"
      >
        <Heading>Team workload</Heading>
        <div
          css={css`
            overflow-x: auto;
          `}
        >
          <table
            css={css`
              border-collapse: collapse;
              width: 100%;
              white-space: nowrap;
              & th:first-child {
                text-align: left;
              }
            `}
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  css={css`
                    padding: var(--row-space) 0.75rem;
                    border-bottom: 1px solid var(--line);
                    font-variant-numeric: tabular-nums;
                    text-align: right;
                    color: var(--muted);
                    font-weight: 400;
                    font-size: 0.75rem;
                  `}
                >
                  Member
                </th>
                <th
                  scope="col"
                  css={css`
                    padding: var(--row-space) 0.75rem;
                    border-bottom: 1px solid var(--line);
                    font-variant-numeric: tabular-nums;
                    text-align: right;
                    color: var(--muted);
                    font-weight: 400;
                    font-size: 0.75rem;
                  `}
                >
                  Assigned
                </th>
                <th
                  scope="col"
                  css={css`
                    padding: var(--row-space) 0.75rem;
                    border-bottom: 1px solid var(--line);
                    font-variant-numeric: tabular-nums;
                    text-align: right;
                    color: var(--muted);
                    font-weight: 400;
                    font-size: 0.75rem;
                  `}
                >
                  Open
                </th>
                <th
                  scope="col"
                  css={css`
                    padding: var(--row-space) 0.75rem;
                    border-bottom: 1px solid var(--line);
                    font-variant-numeric: tabular-nums;
                    text-align: right;
                    color: var(--muted);
                    font-weight: 400;
                    font-size: 0.75rem;
                  `}
                >
                  Completed
                </th>
                <th
                  scope="col"
                  css={css`
                    padding: var(--row-space) 0.75rem;
                    border-bottom: 1px solid var(--line);
                    font-variant-numeric: tabular-nums;
                    text-align: right;
                    color: var(--muted);
                    font-weight: 400;
                    font-size: 0.75rem;
                  `}
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
                      <th
                        scope="row"
                        css={css`
                          padding: var(--row-space) 0.75rem;
                          border-bottom: 1px solid var(--line);
                          font-variant-numeric: tabular-nums;
                          text-align: left;
                          font-weight: 500;
                        `}
                      >
                        {m.name}
                      </th>
                      <td
                        css={css`
                          padding: var(--row-space) 0.75rem;
                          border-bottom: 1px solid var(--line);
                          font-variant-numeric: tabular-nums;
                          text-align: right;
                        `}
                      >
                        {assigned().length}
                      </td>
                      <td
                        css={css`
                          padding: var(--row-space) 0.75rem;
                          border-bottom: 1px solid var(--line);
                          font-variant-numeric: tabular-nums;
                          text-align: right;
                        `}
                      >
                        {assigned().length - done()}
                      </td>
                      <td
                        css={css`
                          padding: var(--row-space) 0.75rem;
                          border-bottom: 1px solid var(--line);
                          font-variant-numeric: tabular-nums;
                          text-align: right;
                        `}
                      >
                        {done()}
                      </td>
                      <td
                        css={css`
                          padding: var(--row-space) 0.75rem;
                          border-bottom: 1px solid var(--line);
                          font-variant-numeric: tabular-nums;
                          text-align: right;
                        `}
                      >
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
