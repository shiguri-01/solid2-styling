import { Title } from "@solidjs/meta";
import { createMemo, createSignal, For } from "solid-js";
import Counter from "../components/Counter";
import {
  actionButton,
  appSubtitle,
  appTitle,
  brandGroup,
  container,
  controlGroup,
  filterGroup,
  filterTab,
  formRow,
  headerActions,
  headerBar,
  liveDot,
  mainGrid,
  pageShell,
  panel,
  panelHeader,
  panelTitle,
  pill,
  previewStage,
  progressFill,
  progressTrack,
  selectInput,
  statCard,
  statLabel,
  statsGrid,
  statValue,
  statValueRow,
  taskLabelGroup,
  taskList,
  taskRow,
  taskTitle,
  textInput,
  titleBlock,
} from "../styles";
import { vars } from "../zyzz.config";

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
  {
    id: 1,
    title: "Configure light/dark token pairs in zyzz.config.ts",
    priority: "high",
    done: true,
  },
  {
    id: 2,
    title: "Author multi-axis recipes with variants({ selection: 'class' })",
    priority: "medium",
    done: true,
  },
  {
    id: 3,
    title: "Set output: 'html' for native Solid class={...} bindings",
    priority: "high",
    done: false,
  },
  {
    id: 4,
    title: "Validate strict compile-time token domain checks",
    priority: "low",
    done: false,
  },
];

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
    <div class={`${vars({ colorScheme: isDark() ? "dark" : "light" }).class} ${pageShell().class}`}>
      <Title>Solid 2.0 + Zyzz Design System Showcase</Title>
      <div class={container().class}>
        {/* Header Bar */}
        <header class={headerBar().class}>
          <div class={brandGroup().class}>
            <span class={liveDot().class} />
            <div class={titleBlock().class}>
              <h1 class={appTitle().class}>Solid 2.0 × Zyzz</h1>
              <p class={appSubtitle().class}>
                Strict Token Contracts, Multi-Axis Recipes, and Built-In Light/Dark Pairs
              </p>
            </div>
          </div>
          <div class={headerActions().class}>
            <span class={pill({ tone: "brand" }).class}>output: &quot;html&quot;</span>
            <button
              type="button"
              class={actionButton({ tone: "neutral", size: "sm" }).class}
              onClick={() => setIsDark((d) => !d)}
            >
              {isDark() ? "☀ Light Theme" : "☾ Dark Theme"}
            </button>
          </div>
        </header>

        {/* KPI Metric Cards */}
        <section class={statsGrid().class}>
          <article class={statCard().class}>
            <span class={statLabel().class}>Completion Rate</span>
            <div class={statValueRow().class}>
              <span class={statValue().class}>{completionRate()}%</span>
              <span class={pill({ tone: "low" }).class}>
                {completedCount()}/{tasks().length} Done
              </span>
            </div>
            <div class={progressTrack().class}>
              <div class={progressFill().class} style={{ width: `${completionRate()}%` }} />
            </div>
          </article>

          <article class={statCard().class}>
            <span class={statLabel().class}>Active Color Scheme</span>
            <div class={statValueRow().class}>
              <span class={statValue().class}>{isDark() ? "Dark" : "Light"}</span>
              <span class={pill({ tone: "brand" }).class}>vars({"{ colorScheme }"})</span>
            </div>
            <span class={appSubtitle().class}>
              Native {"{ light, dark }"} token pairs in zyzz.config.ts
            </span>
          </article>

          <article class={statCard().class}>
            <span class={statLabel().class}>Reactivity Granularity</span>
            <div class={statValueRow().class}>
              <span class={statValue().class}>O(1)</span>
              <span class={pill({ tone: "medium" }).class}>selection: &quot;class&quot;</span>
            </div>
            <span class={appSubtitle().class}>
              Direct .class bindings with zero runtime style calculation
            </span>
          </article>
        </section>

        {/* Main Interactive Grid */}
        <div class={mainGrid().class}>
          {/* Left Column: Task Manager */}
          <section class={panel().class}>
            <div class={panelHeader().class}>
              <h2 class={panelTitle().class}>Interactive Task Board</h2>
              <div class={filterGroup().class}>
                <For each={["all", "active", "done"] as const}>
                  {(f) => (
                    <button
                      type="button"
                      class={filterTab({ active: filter() === f }).class}
                      onClick={() => setFilter(f)}
                    >
                      {f.toUpperCase()}
                    </button>
                  )}
                </For>
              </div>
            </div>

            <form class={formRow().class} onSubmit={addTask}>
              <input
                class={textInput().class}
                placeholder="Add a styling task..."
                value={draftTitle()}
                onInput={(e) => setDraftTitle(e.currentTarget.value)}
              />
              <select
                class={selectInput().class}
                value={draftPriority()}
                onChange={(e) => setDraftPriority(e.currentTarget.value as Priority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button type="submit" class={actionButton({ tone: "primary", size: "md" }).class}>
                Add
              </button>
            </form>

            <ul class={taskList().class}>
              <For each={filteredTasks()}>
                {(item) => (
                  <li class={taskRow({ done: item.done }).class}>
                    <label class={taskLabelGroup().class}>
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => toggleTask(item.id)}
                      />
                      <span class={taskTitle({ done: item.done }).class}>{item.title}</span>
                    </label>
                    <span class={pill({ tone: item.priority }).class}>{item.priority}</span>
                    <button
                      type="button"
                      class={actionButton({ tone: "danger", size: "sm" }).class}
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
          <section class={panel().class}>
            <div class={panelHeader().class}>
              <h2 class={panelTitle().class}>Zyzz Variants & Diagnostics</h2>
              <span class={pill({ tone: "brand" }).class}>variants()</span>
            </div>

            <div class={controlGroup().class}>
              <span class={statLabel().class}>Tone Axis</span>
              <div class={formRow().class}>
                <For each={["primary", "neutral", "success", "danger"] as const}>
                  {(tone) => (
                    <button
                      type="button"
                      class={filterTab({ active: selectedTone() === tone }).class}
                      onClick={() => setSelectedTone(tone)}
                    >
                      {tone}
                    </button>
                  )}
                </For>
              </div>

              <span class={statLabel().class}>Size Axis</span>
              <div class={formRow().class}>
                <For each={["sm", "md", "lg"] as const}>
                  {(sz) => (
                    <button
                      type="button"
                      class={filterTab({ active: selectedSize() === sz }).class}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz.toUpperCase()}
                    </button>
                  )}
                </For>
              </div>
            </div>

            <div class={previewStage().class}>
              <button
                type="button"
                class={actionButton({ tone: selectedTone(), size: selectedSize() }).class}
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
