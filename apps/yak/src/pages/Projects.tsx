import { Card } from "../components/Card";
import { ProjectCard } from "./components/ProjectCard";
import { TextInput } from "../components/TextInput";
import { createMemo, createSignal, For, Show } from "solid-js";
import { CATEGORIES, type IssueTrackerStore } from "utils";
import { Empty } from "../components/Empty";
import { PageHeading } from "../components/PageHeading";
import { css } from "@yak/solid";
import { Heading, Description } from "../components/ui";
export default function Projects(props: { tracker: IssueTrackerStore }) {
  const [query, setQuery] = createSignal("");
  const [onlyOpen, setOnlyOpen] = createSignal(false);
  const [selected, setSelected] = createSignal("Design System");
  const projects = createMemo(() =>
    CATEGORIES.map((category, i) => {
      const issues = props.tracker.tasks().filter((t) => t.category === category);
      const done = issues.filter((t) => t.done).length;
      return {
        category,
        issues,
        done,
        percent: issues.length ? Math.round((done / issues.length) * 100) : 0,
        owner: ["A. Kurosawa", "M. Sato", "K. Tanaka", "Y. Mori"][i % 4],
      };
    }),
  );
  const visible = createMemo(() =>
    projects().filter(
      (p) =>
        p.category.toLowerCase().includes(query().toLowerCase()) &&
        (!onlyOpen() || p.done < p.issues.length),
    ),
  );
  const current = createMemo(() => projects().find((p) => p.category === selected()));
  return (
    <>
      <PageHeading title="Projects" description="Five workstreams. One shared delivery queue." />
      <div
        css={css`
          display: flex;
          align-items: end;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        `}
      >
        <label
          css={css`
            display: grid;
            gap: 0.4rem;
            font-size: 0.75rem;
          `}
        >
          Find a project
          <TextInput
            type="search"
            value={query()}
            onInput={(e) => setQuery(e.currentTarget.value)}
          />
        </label>
        <label
          css={css`
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding-bottom: 0.5rem;
          `}
        >
          <input
            type="checkbox"
            checked={onlyOpen()}
            onChange={(e) => setOnlyOpen(e.currentTarget.checked)}
          />{" "}
          Incomplete projects only
        </label>
        <span
          css={css`
            margin-left: auto;
            color: var(--muted);
            @media (max-width: 560px) {
              margin-left: 0;
            }
          `}
        >
          {visible().length} projects
        </span>
      </div>
      <div
        css={css`
          display: grid;
          grid-template-columns: minmax(0, 1fr) 300px;
          gap: 1.5rem;
          align-items: start;
          @media (max-width: 1200px) {
            grid-template-columns: minmax(0, 1fr);
          }
        `}
      >
        <section
          css={css`
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
            @media (max-width: 560px) {
              grid-template-columns: minmax(0, 1fr);
            }
          `}
          aria-label="Projects"
        >
          <For each={visible()}>
            {(p) => (
              <ProjectCard
                project={p}
                selected={selected() === p.category}
                onSelect={() => {
                  setSelected(p.category);
                }}
              />
            )}
          </For>
          <Show when={!visible().length}>
            <Empty>No projects match your filters.</Empty>
          </Show>
        </section>
        <Card
          as="aside"
          css={css`
            display: grid;
            gap: 0.75rem;
          `}
          aria-label="Project detail"
        >
          <Heading
            css={css`
              font-size: 18px;
            `}
          >
            {current()?.category}
          </Heading>
          <Description>Delivery checklist</Description>
          <For each={current()?.issues ?? []}>
            {(t) => (
              <label
                css={css`
                  display: flex;
                  align-items: start;
                  gap: 0.75rem;
                  padding-block: var(--row-space);
                  border-bottom: 1px solid var(--line);
                `}
              >
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => props.tracker.toggleTask(t.id)}
                />
                <span>
                  <small
                    css={css`
                      color: var(--muted);
                    `}
                  >
                    {t.key}
                  </small>
                  <span
                    css={css`
                      display: block;
                      &[data-done="true"] {
                        text-decoration: line-through;
                        color: var(--muted);
                      }
                    `}
                    data-done={t.done}
                  >
                    {t.title}
                  </span>
                </span>
              </label>
            )}
          </For>
          <Show when={!current()?.issues.length}>
            <Empty>No issues assigned.</Empty>
          </Show>
          <a href="#issues">Open issue board →</a>
        </Card>
      </div>
    </>
  );
}
