import { Card } from "../components/Card";
import { ProjectCard } from "./components/ProjectCard";
import { TextInput } from "../components/TextInput";
import { createMemo, createSignal, For, Show } from "solid-js";
import { CATEGORIES, type IssueTrackerStore } from "utils";
import { Empty } from "../components/Empty";
import { PageHeading } from "../components/PageHeading";
import { projects as s } from "./page-styles";
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
      <div class={s.toolbar}>
        <label class={s.fieldLabel}>
          Find a project
          <TextInput
            type="search"
            value={query()}
            onInput={(e) => setQuery(e.currentTarget.value)}
          />
        </label>
        <label class={s.check}>
          <input
            type="checkbox"
            checked={onlyOpen()}
            onChange={(e) => setOnlyOpen(e.currentTarget.checked)}
          />{" "}
          Incomplete projects only
        </label>
        <span class={s.count}>{visible().length} projects</span>
      </div>
      <div class={s.layout}>
        <section class={s.grid} aria-label="Projects">
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
        <Card as="aside" class={s.detail} aria-label="Project detail">
          <h2 class={s.heading}>{current()?.category}</h2>
          <p class={s.description}>Delivery checklist</p>
          <For each={current()?.issues ?? []}>
            {(t) => (
              <label class={s.issue}>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => props.tracker.toggleTask(t.id)}
                />
                <span>
                  <small class={s.description}>{t.key}</small>
                  <span class={s.issueTitle} data-done={t.done}>
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
