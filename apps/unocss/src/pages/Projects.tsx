import { Card } from "../components/Card";
import { ProjectCard } from "./components/ProjectCard";
import { TextInput } from "../components/TextInput";
import { createMemo, createSignal, For, Show } from "solid-js";
import { CATEGORIES, type IssueTrackerStore } from "utils";
import { Empty } from "../components/Empty";
import { PageHeading } from "../components/PageHeading";
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
      <div class="mb-6 flex flex-wrap items-end gap-6">
        <label class="grid gap-1.5 text-xs">
          Find a project
          <TextInput
            type="search"
            value={query()}
            onInput={(e) => setQuery(e.currentTarget.value)}
          />
        </label>
        <label class="flex items-center gap-2 pb-2 text-xs">
          <input
            type="checkbox"
            checked={onlyOpen()}
            onChange={(e) => setOnlyOpen(e.currentTarget.checked)}
          />{" "}
          Incomplete projects only
        </label>
        <span class="text-muted sm:ml-auto">{visible().length} projects</span>
      </div>
      <div class="grid items-start gap-6 min-[1201px]:grid-cols-[minmax(0,1fr)_300px]">
        <section class="grid gap-4 sm:grid-cols-2" aria-label="Projects">
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
          class="[&_p]:my-1em [&_p]:text-muted [&_small]:text-muted"
          aria-label="Project detail"
        >
          <h2 class="m-0 text-lg font-bold">{current()?.category}</h2>
          <p>Delivery checklist</p>
          <For each={current()?.issues ?? []}>
            {(t) => (
              <label class="flex items-start gap-2.5 border-b border-line density-row">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => props.tracker.toggleTask(t.id)}
                />
                <span>
                  <small>{t.key}</small>
                  <span
                    class="block data-[done=true]:text-muted data-[done=true]:line-through"
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
          <a class="mt-5 inline-block" href="#issues">
            Open issue board →
          </a>
        </Card>
      </div>
    </>
  );
}
