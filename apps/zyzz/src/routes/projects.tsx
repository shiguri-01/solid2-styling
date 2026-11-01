import { useWorkspace } from "../layouts/workspace-context";
import { Card } from "../components/Card";
import { ProjectCard } from "../features/projects/ProjectCard";
import { TextInput } from "../components/TextInput";
import { createMemo, createSignal, For, Show } from "solid-js";
import { CATEGORIES } from "utils";
import { Empty } from "../components/Empty";
import { PageHeading } from "../components/PageHeading";
import { cx } from "zyzz";
import {
  projectCount as zProjectCount,
  toolbar as zToolbar,
  scope as zScope,
  check as zCheck,
  layout as zLayout,
  grid as zGrid,
  heading as zHeading,
  description as zDescription,
  issue as zIssue,
  issueTitle as zIssueTitle,
  done as zDone,
} from "../styles/page-styles";
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
      <div {...zToolbar()}>
        <label {...zScope()}>
          Find a project
          <TextInput
            type="search"
            value={query()}
            onInput={(e) => setQuery(e.currentTarget.value)}
          />
        </label>
        <label {...zCheck()}>
          <input
            type="checkbox"
            checked={onlyOpen()}
            onChange={(e) => setOnlyOpen(e.currentTarget.checked)}
          />{" "}
          Incomplete projects only
        </label>
        <span {...zProjectCount()}>{visible().length} projects</span>
      </div>
      <div {...zLayout()}>
        <section {...zGrid()} aria-label="Projects">
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
        <Card flow="tight" as="aside" aria-label="Project detail">
          <h2 {...zHeading()}>{current()?.category}</h2>
          <p {...zDescription()}>Delivery checklist</p>
          <For each={current()?.issues ?? []}>
            {(t) => (
              <label {...zIssue()}>
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => workspace.tracker.toggleTask(t.id)}
                />
                <span>
                  <small {...zDescription()}>{t.key}</small>
                  <span {...cx(zIssueTitle(), t.done && zDone())} data-done={t.done}>
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
