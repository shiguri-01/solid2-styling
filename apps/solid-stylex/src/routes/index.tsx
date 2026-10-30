import { Title } from "@solidjs/meta";
import * as stylex from "@stylexjs/stylex";
import { createMemo, createSignal, For } from "solid-js";
import Counter from "../components/Counter";
import { appStyles, darkTheme } from "../styles";

type Priority = "low" | "medium" | "high";
type Filter = "all" | "active" | "done";
type Tone = "primary" | "neutral" | "success" | "danger";
type Size = "sm" | "md" | "lg";

interface TaskItem {
  id: number;
  title: string;
  priority: Priority;
  done: boolean;
}

const INITIAL_TASKS: TaskItem[] = [
  { id: 1, title: "Define design tokens with stylex.defineVars()", priority: "high", done: true },
  {
    id: 2,
    title: "Create dark theme override via stylex.createTheme()",
    priority: "medium",
    done: true,
  },
  {
    id: 3,
    title: "Bind atomic classes via stylex.attrs().class in Solid 2.0",
    priority: "high",
    done: false,
  },
  { id: 4, title: "Verify deterministic last-style-wins merging", priority: "low", done: false },
];

const priorityStyleMap = {
  low: appStyles.pillLow,
  medium: appStyles.pillMedium,
  high: appStyles.pillHigh,
} as const;

const toneStyleMap = {
  primary: appStyles.tonePrimary,
  neutral: appStyles.toneNeutral,
  success: appStyles.toneSuccess,
  danger: appStyles.toneDanger,
} as const;

const sizeStyleMap = {
  sm: appStyles.sizeSm,
  md: appStyles.sizeMd,
  lg: appStyles.sizeLg,
} as const;

export default function Home() {
  const [isDark, setIsDark] = createSignal(false);
  const [filter, setFilter] = createSignal<Filter>("all");
  const [tasks, setTasks] = createSignal<TaskItem[]>(INITIAL_TASKS);
  const [draftTitle, setDraftTitle] = createSignal("");
  const [draftPriority, setDraftPriority] = createSignal<Priority>("medium");

  const [selectedTone, setSelectedTone] = createSignal<Tone>("primary");
  const [selectedSize, setSelectedSize] = createSignal<Size>("md");

  const completedCount = createMemo(() => tasks().filter((t) => t.done).length);
  const completionRate = createMemo(() => {
    const total = tasks().length;
    return total === 0 ? 0 : Math.round((completedCount() / total) * 100);
  });

  const filteredTasks = createMemo(() => {
    const current = filter();
    return tasks().filter((t) => {
      if (current === "active") return !t.done;
      if (current === "done") return t.done;
      return true;
    });
  });

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const addTask = (e: SubmitEvent) => {
    e.preventDefault();
    const title = draftTitle().trim();
    if (!title) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title, priority: draftPriority(), done: false },
    ]);
    setDraftTitle("");
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div class={stylex.attrs(appStyles.pageShell, isDark() && darkTheme).class}>
      <Title>Solid 2.0 + StyleX Design System Showcase</Title>
      <div class={stylex.attrs(appStyles.container).class}>
        {/* Header Bar */}
        <header class={stylex.attrs(appStyles.headerBar).class}>
          <div class={stylex.attrs(appStyles.brandGroup).class}>
            <span class={stylex.attrs(appStyles.liveDot).class} />
            <div class={stylex.attrs(appStyles.titleBlock).class}>
              <h1 class={stylex.attrs(appStyles.appTitle).class}>Solid 2.0 × StyleX</h1>
              <p class={stylex.attrs(appStyles.appSubtitle).class}>
                Collision-Free Atomic CSS with @layer Priority & Deterministic Merging
              </p>
            </div>
          </div>
          <div class={stylex.attrs(appStyles.headerActions).class}>
            <span class={stylex.attrs(appStyles.pillBase, appStyles.pillBrand).class}>
              Atomic @layer
            </span>
            <button
              type="button"
              class={
                stylex.attrs(appStyles.buttonBase, appStyles.toneNeutral, appStyles.sizeSm).class
              }
              onClick={() => setIsDark((d) => !d)}
            >
              {isDark() ? "☀ Light Theme" : "☾ Dark Theme"}
            </button>
          </div>
        </header>

        {/* KPI Metric Cards */}
        <section class={stylex.attrs(appStyles.statsGrid).class}>
          <article class={stylex.attrs(appStyles.statCard).class}>
            <span class={stylex.attrs(appStyles.statLabel).class}>Completion Rate</span>
            <div class={stylex.attrs(appStyles.statValueRow).class}>
              <span class={stylex.attrs(appStyles.statValue).class}>{completionRate()}%</span>
              <span class={stylex.attrs(appStyles.pillBase, appStyles.pillLow).class}>
                {completedCount()}/{tasks().length} Done
              </span>
            </div>
            <div class={stylex.attrs(appStyles.progressTrack).class}>
              <div
                class={stylex.attrs(appStyles.progressFill).class}
                style={{ width: `${completionRate()}%` }}
              />
            </div>
          </article>

          <article class={stylex.attrs(appStyles.statCard).class}>
            <span class={stylex.attrs(appStyles.statLabel).class}>Active Theme Scope</span>
            <div class={stylex.attrs(appStyles.statValueRow).class}>
              <span class={stylex.attrs(appStyles.statValue).class}>
                {isDark() ? "Dark" : "Light"}
              </span>
              <span class={stylex.attrs(appStyles.pillBase, appStyles.pillBrand).class}>
                stylex.createTheme()
              </span>
            </div>
            <span class={stylex.attrs(appStyles.appSubtitle).class}>
              Variables defined in tokens.stylex.ts
            </span>
          </article>

          <article class={stylex.attrs(appStyles.statCard).class}>
            <span class={stylex.attrs(appStyles.statLabel).class}>Reactivity Granularity</span>
            <div class={stylex.attrs(appStyles.statValueRow).class}>
              <span class={stylex.attrs(appStyles.statValue).class}>O(1)</span>
              <span class={stylex.attrs(appStyles.pillBase, appStyles.pillMedium).class}>
                stylex.attrs().class
              </span>
            </div>
            <span class={stylex.attrs(appStyles.appSubtitle).class}>
              Direct class string binding without React className spread
            </span>
          </article>
        </section>

        {/* Main Interactive Grid */}
        <div class={stylex.attrs(appStyles.mainGrid).class}>
          {/* Left Column: Task Manager */}
          <section class={stylex.attrs(appStyles.panel).class}>
            <div class={stylex.attrs(appStyles.panelHeader).class}>
              <h2 class={stylex.attrs(appStyles.panelTitle).class}>Interactive Task Board</h2>
              <div class={stylex.attrs(appStyles.filterGroup).class}>
                <For each={["all", "active", "done"] as const}>
                  {(f) => (
                    <button
                      type="button"
                      class={
                        stylex.attrs(
                          appStyles.filterTab,
                          filter() === f && appStyles.filterTabActive,
                        ).class
                      }
                      onClick={() => setFilter(f)}
                    >
                      {f.toUpperCase()}
                    </button>
                  )}
                </For>
              </div>
            </div>

            <form class={stylex.attrs(appStyles.formRow).class} onSubmit={addTask}>
              <input
                class={stylex.attrs(appStyles.textInput).class}
                placeholder="Add a styling task..."
                value={draftTitle()}
                onInput={(e) => setDraftTitle(e.currentTarget.value)}
              />
              <select
                class={stylex.attrs(appStyles.selectInput).class}
                value={draftPriority()}
                onChange={(e) => setDraftPriority(e.currentTarget.value as Priority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button
                type="submit"
                class={
                  stylex.attrs(appStyles.buttonBase, appStyles.tonePrimary, appStyles.sizeMd).class
                }
              >
                Add
              </button>
            </form>

            <ul class={stylex.attrs(appStyles.taskList).class}>
              <For each={filteredTasks()}>
                {(item) => (
                  <li
                    class={
                      stylex.attrs(appStyles.taskRow, item.done && appStyles.taskRowDone).class
                    }
                  >
                    <label class={stylex.attrs(appStyles.taskLabelGroup).class}>
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => toggleTask(item.id)}
                      />
                      <span
                        class={
                          stylex.attrs(appStyles.taskTitle, item.done && appStyles.taskTitleDone)
                            .class
                        }
                      >
                        {item.title}
                      </span>
                    </label>
                    <span
                      class={
                        stylex.attrs(appStyles.pillBase, priorityStyleMap[item.priority]).class
                      }
                    >
                      {item.priority}
                    </span>
                    <button
                      type="button"
                      class={
                        stylex.attrs(appStyles.buttonBase, appStyles.toneDanger, appStyles.sizeSm)
                          .class
                      }
                      onClick={() => removeTask(item.id)}
                    >
                      Delete
                    </button>
                  </li>
                )}
              </For>
            </ul>
          </section>

          {/* Right Column: Variant Composer & Diagnostics Counter */}
          <section class={stylex.attrs(appStyles.panel).class}>
            <div class={stylex.attrs(appStyles.panelHeader).class}>
              <h2 class={stylex.attrs(appStyles.panelTitle).class}>
                StyleX Composition & Diagnostics
              </h2>
              <span class={stylex.attrs(appStyles.pillBase, appStyles.pillBrand).class}>
                Last-Style-Wins
              </span>
            </div>

            <div class={stylex.attrs(appStyles.controlGroup).class}>
              <span class={stylex.attrs(appStyles.statLabel).class}>Tone Style</span>
              <div class={stylex.attrs(appStyles.formRow).class}>
                <For each={["primary", "neutral", "success", "danger"] as const}>
                  {(tone) => (
                    <button
                      type="button"
                      class={
                        stylex.attrs(
                          appStyles.filterTab,
                          selectedTone() === tone && appStyles.filterTabActive,
                        ).class
                      }
                      onClick={() => setSelectedTone(tone)}
                    >
                      {tone}
                    </button>
                  )}
                </For>
              </div>

              <span class={stylex.attrs(appStyles.statLabel).class}>Size Style</span>
              <div class={stylex.attrs(appStyles.formRow).class}>
                <For each={["sm", "md", "lg"] as const}>
                  {(sz) => (
                    <button
                      type="button"
                      class={
                        stylex.attrs(
                          appStyles.filterTab,
                          selectedSize() === sz && appStyles.filterTabActive,
                        ).class
                      }
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz.toUpperCase()}
                    </button>
                  )}
                </For>
              </div>
            </div>

            <div class={stylex.attrs(appStyles.previewStage).class}>
              <button
                type="button"
                class={
                  stylex.attrs(
                    appStyles.buttonBase,
                    toneStyleMap[selectedTone()],
                    sizeStyleMap[selectedSize()],
                  ).class
                }
              >
                Composed Button ({selectedTone()} / {selectedSize()})
              </button>
              <Counter />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
