import { useWorkspace } from "../layouts/workspace-context";
import { Card } from "../components/Card";
import { ProjectCard } from "../features/projects/ProjectCard";
import { TextInput } from "../components/TextInput";
import { createMemo, createSignal, For, Show } from "solid-js";
import { CATEGORIES } from "utils";
import { Empty } from "../components/Empty";
import { PageHeading } from "../components/PageHeading";
export default function Projects() {
  const workspace = useWorkspace();
  const [query, setQuery] = createSignal("");
  const [onlyOpen, setOnlyOpen] = createSignal(false);
  const [selected, setSelected] = createSignal("Design System");
  const projects = createMemo(() =>
    CATEGORIES.map((category, i) => {
      const issues = workspace.tracker.tasks().filter((t) => t.category === category);
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
      <div class="l--cluster -g:20 -mb:30">
        <label class="l--stack -g:5 -fz:s">
          Find a project
          <TextInput
            type="search"
            value={query()}
            onInput={(e) => setQuery(e.currentTarget.value)}
          />
        </label>
        <label class="l--cluster -g:10">
          <input
            type="checkbox"
            checked={onlyOpen()}
            onChange={(e) => setOnlyOpen(e.currentTarget.checked)}
          />{" "}
          Incomplete projects only
        </label>
        <span class="-ms" style={{ "--ms": "auto" }}>
          {visible().length} projects
        </span>
      </div>
      <div
        class="l--grid -gtc -gtc_lg -g:30 -ai:start"
        style={{ "--gtc": "minmax(0, 1fr)", "--gtc_lg": "minmax(0, 1fr) 300px" }}
      >
        <section
          class="l--columns -cols_sm -g:20"
          style={{ "--cols": 1, "--cols_sm": 2 }}
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
        <Card as="aside" class="l--stack -g:15" aria-label="Project detail">
          <h2 class="-fz:l">{current()?.category}</h2>
          <p class="-c:text-2">Delivery checklist</p>
          <For each={current()?.issues ?? []}>
            {(t) => (
              <label class="l--flex -g:10 -bd-be -py" style={{ "--py": "var(--rowSpace)" }}>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => workspace.tracker.toggleTask(t.id)}
                />
                <span>
                  <small>{t.key}</small>
                  <span class="c--issueTitle -d:block" data-done={t.done}>
                    {t.title}
                  </span>
                </span>
              </label>
            )}
          </For>
          <Show when={!current()?.issues.length}>
            <Empty>No issues assigned.</Empty>
          </Show>
          <a href="/issues">Open issue board →</a>
        </Card>
      </div>
    </>
  );
}
