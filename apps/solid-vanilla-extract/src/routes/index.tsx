import { Title } from "@solidjs/meta";
import { createMemo, createSignal, For } from "solid-js";
import Counter from "../components/Counter";
import {
  appSubtitle,
  appTitle,
  brandGroup,
  buttonSize,
  buttonTone,
  container,
  controlGroup,
  darkTheme,
  filterGroup,
  filterTab,
  formRow,
  headerActions,
  headerBar,
  lightTheme,
  liveDot,
  mainGrid,
  pageShell,
  panel,
  panelHeader,
  panelTitle,
  previewStage,
  priorityBadge,
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
} from "../styles.css";

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
    title: "Define theme contract with createThemeContract()",
    priority: "high",
    done: true,
  },
  {
    id: 2,
    title: "Compose multi-axis styleVariants for buttons & pills",
    priority: "medium",
    done: true,
  },
  {
    id: 3,
    title: "Verify fine-grained DOM updates with @solidjs/diagnostics",
    priority: "high",
    done: false,
  },
  { id: 4, title: "Compare zero-runtime CSS output bundle size", priority: "low", done: false },
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
    <div class={`${isDark() ? darkTheme : lightTheme} ${pageShell}`}>
      <Title>Solid 2.0 + vanilla-extract Design System Showcase</Title>
      <div class={container}>
        {/* Header Bar */}
        <header class={headerBar}>
          <div class={brandGroup}>
            <span class={liveDot} />
            <div class={titleBlock}>
              <h1 class={appTitle}>Solid 2.0 × vanilla-extract</h1>
              <p class={appSubtitle}>
                Type-safe Theme Contracts, styleVariants, and Static CSS Extraction
              </p>
            </div>
          </div>
          <div class={headerActions}>
            <span class={priorityBadge.brand}>Zero Runtime</span>
            <button
              type="button"
              class={`${buttonTone.neutral} ${buttonSize.sm}`}
              onClick={() => setIsDark((d) => !d)}
            >
              {isDark() ? "☀ Light Theme" : "☾ Dark Theme"}
            </button>
          </div>
        </header>

        {/* KPI Metric Cards */}
        <section class={statsGrid}>
          <article class={statCard}>
            <span class={statLabel}>Completion Rate</span>
            <div class={statValueRow}>
              <span class={statValue}>{completionRate()}%</span>
              <span class={priorityBadge.low}>
                {completedCount()}/{tasks().length} Done
              </span>
            </div>
            <div class={progressTrack}>
              <div class={progressFill} style={{ width: `${completionRate()}%` }} />
            </div>
          </article>

          <article class={statCard}>
            <span class={statLabel}>Active Theme Scope</span>
            <div class={statValueRow}>
              <span class={statValue}>{isDark() ? "Dark" : "Light"}</span>
              <span class={priorityBadge.brand}>createTheme()</span>
            </div>
            <span class={appSubtitle}>Scoped CSS variables switched on root container</span>
          </article>

          <article class={statCard}>
            <span class={statLabel}>Reactivity Granularity</span>
            <div class={statValueRow}>
              <span class={statValue}>O(1)</span>
              <span class={priorityBadge.medium}>Fine-Grained</span>
            </div>
            <span class={appSubtitle}>Direct class={"{...}"} bindings without object spreads</span>
          </article>
        </section>

        {/* Main Interactive Grid */}
        <div class={mainGrid}>
          {/* Left Column: Task Manager */}
          <section class={panel}>
            <div class={panelHeader}>
              <h2 class={panelTitle}>Interactive Task Board</h2>
              <div class={filterGroup}>
                <For each={["all", "active", "done"] as const}>
                  {(f) => (
                    <button
                      type="button"
                      class={filterTab[filter() === f ? "active" : "inactive"]}
                      onClick={() => setFilter(f)}
                    >
                      {f.toUpperCase()}
                    </button>
                  )}
                </For>
              </div>
            </div>

            <form class={formRow} onSubmit={addTask}>
              <input
                class={textInput}
                placeholder="Add a styling task..."
                value={draftTitle()}
                onInput={(e) => setDraftTitle(e.currentTarget.value)}
              />
              <select
                class={selectInput}
                value={draftPriority()}
                onChange={(e) => setDraftPriority(e.currentTarget.value as Priority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button type="submit" class={`${buttonTone.primary} ${buttonSize.md}`}>
                Add
              </button>
            </form>

            <ul class={taskList}>
              <For each={filteredTasks()}>
                {(item) => (
                  <li class={taskRow[item.done ? "done" : "todo"]}>
                    <label class={taskLabelGroup}>
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => toggleTask(item.id)}
                      />
                      <span class={taskTitle[item.done ? "done" : "todo"]}>{item.title}</span>
                    </label>
                    <span class={priorityBadge[item.priority]}>{item.priority}</span>
                    <button
                      type="button"
                      class={`${buttonTone.danger} ${buttonSize.sm}`}
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
          <section class={panel}>
            <div class={panelHeader}>
              <h2 class={panelTitle}>Variant & Diagnostics Playground</h2>
              <span class={priorityBadge.brand}>styleVariants</span>
            </div>

            <div class={controlGroup}>
              <span class={statLabel}>Tone Variant</span>
              <div class={formRow}>
                <For each={["primary", "neutral", "success", "danger"] as const}>
                  {(tone) => (
                    <button
                      type="button"
                      class={filterTab[selectedTone() === tone ? "active" : "inactive"]}
                      onClick={() => setSelectedTone(tone)}
                    >
                      {tone}
                    </button>
                  )}
                </For>
              </div>

              <span class={statLabel}>Size Variant</span>
              <div class={formRow}>
                <For each={["sm", "md", "lg"] as const}>
                  {(sz) => (
                    <button
                      type="button"
                      class={filterTab[selectedSize() === sz ? "active" : "inactive"]}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz.toUpperCase()}
                    </button>
                  )}
                </For>
              </div>
            </div>

            <div class={previewStage}>
              <button
                type="button"
                class={`${buttonTone[selectedTone()]} ${buttonSize[selectedSize()]}`}
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
