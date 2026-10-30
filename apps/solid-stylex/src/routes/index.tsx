import { Title } from "@solidjs/meta";
import * as stylex from "@stylexjs/stylex";
import { createMemo, createSignal, For, Show } from "solid-js";
import { appStyles, darkTheme, rowMarker } from "../styles";

type Priority = "low" | "medium" | "high";
type Filter = "all" | "active" | "done";
type Category = "Design System" | "Compiler" | "Tokens" | "Accessibility" | "SSR";
type AvatarColor = "teal" | "emerald" | "amber" | "rose";

interface SubtaskItem {
  label: string;
  done: boolean;
}

interface ActivityEntry {
  author: string;
  action: string;
  time: string;
}

interface TaskItem {
  id: number;
  key: string;
  title: string;
  category: Category;
  priority: Priority;
  assignee: string;
  avatar: AvatarColor;
  due: string;
  estimate: string;
  done: boolean;
  summary: string;
  subtasks: SubtaskItem[];
  activity: ActivityEntry[];
}

const INITIAL_TASKS: TaskItem[] = [
  {
    id: 1,
    key: "DS-101",
    title: "Define semantic color contract for light and dark surfaces",
    category: "Tokens",
    priority: "high",
    assignee: "AK",
    avatar: "teal",
    due: "Oct 31",
    estimate: "3 pts",
    done: true,
    summary:
      "Establish surface, elevated, border, and semantic status tokens under stylex.defineVars() so light and dark themes swap without runtime recalculation.",
    subtasks: [
      { label: "Map neutral surface scale (#ffffff to #0a0b0d)", done: true },
      { label: "Verify WCAG AA contrast on muted labels", done: true },
      { label: "Export typed token group from tokens.stylex.ts", done: true },
    ],
    activity: [
      { author: "A. Kurosawa", action: "merged pull request #42", time: "2h ago" },
      { author: "M. Sato", action: "approved token contrast audit", time: "4h ago" },
    ],
  },
  {
    id: 2,
    key: "DS-102",
    title: "Compose multi-axis styleVariants for buttons and status pills",
    category: "Design System",
    priority: "medium",
    assignee: "MS",
    avatar: "emerald",
    due: "Nov 02",
    estimate: "2 pts",
    done: true,
    summary:
      "Separate tone and size axes into static stylex.create() lookup maps so components merge atomic classes deterministically via stylex.attrs().class.",
    subtasks: [
      { label: "Create tone and size style lookup maps", done: true },
      { label: "Add leading status dot indicator for priority pills", done: true },
      { label: "Remove nested container borders in preview rows", done: true },
    ],
    activity: [
      { author: "M. Sato", action: "marked issue as completed", time: "Yesterday" },
      { author: "K. Tanaka", action: "reviewed CSS bundle output", time: "2d ago" },
    ],
  },
  {
    id: 3,
    key: "DS-103",
    title: "Implement container query breakpoints for responsive issue table",
    category: "Compiler",
    priority: "high",
    assignee: "KT",
    avatar: "amber",
    due: "Nov 04",
    estimate: "5 pts",
    done: false,
    summary:
      "Use @container rules inside the board panel so secondary metadata columns collapse gracefully when the split inspector is open on narrower screens.",
    subtasks: [
      { label: "Set containerType: inline-size on board panel", done: true },
      { label: "Collapse category and due columns below 560px", done: true },
      { label: "Verify stylex.when.ancestor(':hover') reveals delete action", done: false },
    ],
    activity: [
      { author: "K. Tanaka", action: "pushed container query rules", time: "35m ago" },
      { author: "Y. Mori", action: "tested tablet split layout", time: "1h ago" },
    ],
  },
  {
    id: 4,
    key: "DS-104",
    title: "Replace native browser select arrow with themed SVG chevron",
    category: "Accessibility",
    priority: "high",
    assignee: "YM",
    avatar: "rose",
    due: "Nov 05",
    estimate: "2 pts",
    done: false,
    summary:
      "Reset appearance: none on select controls and bind a theme-aware SVG data URI chevron with balanced right padding and focus ring states.",
    subtasks: [
      { label: "Set appearance: none and 30px right padding", done: true },
      { label: "Bind tokens.chevron for light and dark stroke colors", done: true },
      { label: "Check keyboard focus-visible outline contrast", done: false },
    ],
    activity: [
      { author: "Y. Mori", action: "updated selectInput styles", time: "15m ago" },
      { author: "A. Kurosawa", action: "requested visual check", time: "1h ago" },
    ],
  },
  {
    id: 5,
    key: "DS-105",
    title: "Verify zero-runtime CSS extraction and SSR hydration output",
    category: "SSR",
    priority: "medium",
    assignee: "AK",
    avatar: "teal",
    due: "Nov 08",
    estimate: "3 pts",
    done: false,
    summary:
      "Ensure all static stylesheets prerender cleanly in Solid Start turnkey server builds with zero style tag injection during client hydration.",
    subtasks: [
      { label: "Inspect extracted dist/client/assets/*.css output", done: true },
      { label: "Compare @layer priority specificity across libraries", done: false },
      { label: "Run automated layout and contrast checks", done: false },
    ],
    activity: [{ author: "A. Kurosawa", action: "opened issue for Q4 milestone", time: "3d ago" }],
  },
  {
    id: 6,
    key: "DS-106",
    title: "Audit tabular-nums alignment across metric cards and badges",
    category: "Design System",
    priority: "low",
    assignee: "MS",
    avatar: "emerald",
    due: "Nov 12",
    estimate: "1 pt",
    done: false,
    summary:
      "Apply font-variant-numeric: tabular-nums to all counters, issue keys, due dates, and completion percentages to prevent horizontal jitter.",
    subtasks: [
      { label: "Add tabular-nums to KPI values and issue keys", done: true },
      { label: "Check filter tab badge counts under updates", done: false },
    ],
    activity: [{ author: "M. Sato", action: "assigned to sprint backlog", time: "4d ago" }],
  },
  {
    id: 7,
    key: "DS-107",
    title: "Benchmark atomic vs scoped class generation in production build",
    category: "Compiler",
    priority: "medium",
    assignee: "KT",
    avatar: "amber",
    due: "Nov 14",
    estimate: "3 pts",
    done: false,
    summary:
      "Compare generated CSS rule deduplication, media query grouping, and pseudo-selector output between vanilla-extract, StyleX, and zyzz.",
    subtasks: [
      { label: "Collect gzipped CSS sizes after build", done: true },
      { label: "Inspect combined hover and ancestor marker selectors", done: false },
    ],
    activity: [{ author: "K. Tanaka", action: "linked build pipeline benchmark", time: "5d ago" }],
  },
  {
    id: 8,
    key: "DS-108",
    title: "Standardize focus-within and focus-visible rings on form fields",
    category: "Accessibility",
    priority: "low",
    assignee: "YM",
    avatar: "rose",
    due: "Nov 18",
    estimate: "2 pts",
    done: false,
    summary:
      "Ensure search wrappers, text inputs, and custom selects share a consistent brand focus border transition across keyboard navigation.",
    subtasks: [
      { label: "Apply :focus-within border color on searchField", done: true },
      { label: "Verify keyboard tab order across filter controls", done: true },
    ],
    activity: [{ author: "Y. Mori", action: "verified keyboard focus ring", time: "6d ago" }],
  },
];

const FILTER_LABELS: Record<Filter, string> = {
  all: "All",
  active: "Active",
  done: "Done",
};

const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

const CATEGORIES: Category[] = ["Design System", "Tokens", "Compiler", "Accessibility", "SSR"];

const priorityPillMap = {
  low: appStyles.pillLow,
  medium: appStyles.pillMedium,
  high: appStyles.pillHigh,
} as const;

const avatarColorMap = {
  teal: appStyles.avatarTeal,
  emerald: appStyles.avatarEmerald,
  amber: appStyles.avatarAmber,
  rose: appStyles.avatarRose,
} as const;

export default function Home() {
  const [isDark, setIsDark] = createSignal(false);
  const [filter, setFilter] = createSignal<Filter>("all");
  const [categoryFilter, setCategoryFilter] = createSignal<string>("all");
  const [searchQuery, setSearchQuery] = createSignal("");
  const [tasks, setTasks] = createSignal<TaskItem[]>(INITIAL_TASKS);
  const [selectedId, setSelectedId] = createSignal<number>(3);

  const [draftTitle, setDraftTitle] = createSignal("");
  const [draftCategory, setDraftCategory] = createSignal<Category>("Design System");
  const [draftPriority, setDraftPriority] = createSignal<Priority>("medium");

  const completedCount = createMemo(() => tasks().filter((t) => t.done).length);
  const activeCount = createMemo(() => tasks().length - completedCount());
  const highPriorityActiveCount = createMemo(
    () => tasks().filter((t) => !t.done && t.priority === "high").length,
  );
  const completionRate = createMemo(() => {
    const total = tasks().length;
    return total === 0 ? 0 : Math.round((completedCount() / total) * 100);
  });

  const countForFilter = (f: Filter) => {
    if (f === "active") return activeCount();
    if (f === "done") return completedCount();
    return tasks().length;
  };

  const filteredTasks = createMemo(() => {
    const currentStatus = filter();
    const currentCategory = categoryFilter();
    const q = searchQuery().trim().toLowerCase();

    return tasks().filter((t) => {
      if (currentStatus === "active" && t.done) return false;
      if (currentStatus === "done" && !t.done) return false;
      if (currentCategory !== "all" && t.category !== currentCategory) return false;
      if (
        q &&
        !t.title.toLowerCase().includes(q) &&
        !t.key.toLowerCase().includes(q) &&
        !t.category.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
  });

  const selectedTask = createMemo(
    () => tasks().find((t) => t.id === selectedId()) ?? filteredTasks()[0] ?? tasks()[0],
  );

  const toggleTask = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const cyclePriority = (id: number) => {
    const order: Priority[] = ["low", "medium", "high"];
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const next = order[(order.indexOf(t.priority) + 1) % order.length];
        return { ...t, priority: next };
      }),
    );
  };

  const addTask = (e: SubmitEvent) => {
    e.preventDefault();
    const title = draftTitle().trim();
    if (!title) return;
    const nextNum = tasks().length + 101;
    const newId = Date.now();
    const newItem: TaskItem = {
      id: newId,
      key: `DS-${nextNum}`,
      title,
      category: draftCategory(),
      priority: draftPriority(),
      assignee: "AK",
      avatar: "teal",
      due: "Nov 15",
      estimate: "2 pts",
      done: false,
      summary:
        "Newly added styling verification task. Select this row to inspect its metadata, acceptance criteria, and theme token bindings.",
      subtasks: [
        { label: "Verify light and dark theme token contrast", done: false },
        { label: "Check responsive container query collapse", done: false },
      ],
      activity: [{ author: "You", action: "created this issue", time: "Just now" }],
    };
    setTasks((prev) => [newItem, ...prev]);
    setSelectedId(newId);
    setDraftTitle("");
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div class={stylex.attrs(appStyles.pageShell, isDark() && darkTheme).class}>
      <Title>Solid 2.0 × StyleX — Issue Tracker</Title>
      <div class={stylex.attrs(appStyles.container).class}>
        {/* Top Workspace Header */}
        <header class={stylex.attrs(appStyles.headerBar).class}>
          <div class={stylex.attrs(appStyles.brandGroup).class}>
            <span class={stylex.attrs(appStyles.liveDot).class} />
            <div class={stylex.attrs(appStyles.titleBlock).class}>
              <div class={stylex.attrs(appStyles.breadcrumbRow).class}>
                <span>Design Engineering</span>
                <span>/</span>
                <span>Q4 Styling Migration</span>
              </div>
              <h1 class={stylex.attrs(appStyles.appTitle).class}>Solid 2.0 × StyleX</h1>
            </div>
          </div>

          <div class={stylex.attrs(appStyles.headerActions).class}>
            <div class={stylex.attrs(appStyles.avatarStack).class} aria-label="Active team members">
              <span
                class={stylex.attrs(appStyles.avatarBase, appStyles.avatarTeal).class}
                title="A. Kurosawa"
              >
                AK
              </span>
              <span
                class={stylex.attrs(appStyles.avatarBase, appStyles.avatarEmerald).class}
                title="M. Sato"
              >
                MS
              </span>
              <span
                class={stylex.attrs(appStyles.avatarBase, appStyles.avatarAmber).class}
                title="K. Tanaka"
              >
                KT
              </span>
              <span
                class={stylex.attrs(appStyles.avatarBase, appStyles.avatarRose).class}
                title="Y. Mori"
              >
                YM
              </span>
            </div>
            <span class={stylex.attrs(appStyles.pillBase, appStyles.pillBrand).class}>
              Sprint 14
            </span>
            <button
              type="button"
              class={
                stylex.attrs(appStyles.buttonBase, appStyles.toneNeutral, appStyles.sizeSm).class
              }
              onClick={() => {
                setIsDark((d) => !d);
              }}
            >
              {isDark() ? "Light Theme" : "Dark Theme"}
            </button>
          </div>
        </header>

        {/* 4-Column Divided KPI Strip */}
        <section class={stylex.attrs(appStyles.statsGrid).class}>
          <article class={stylex.attrs(appStyles.statCard).class}>
            <span class={stylex.attrs(appStyles.statLabel).class}>Sprint progress</span>
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
            <span class={stylex.attrs(appStyles.statLabel).class}>Open issues</span>
            <div class={stylex.attrs(appStyles.statValueRow).class}>
              <span class={stylex.attrs(appStyles.statValue).class}>{activeCount()}</span>
              <span class={stylex.attrs(appStyles.pillBase, appStyles.pillBrand).class}>
                In Queue
              </span>
            </div>
            <span class={stylex.attrs(appStyles.appSubtitle).class}>Active engineering tasks</span>
          </article>

          <article class={stylex.attrs(appStyles.statCard).class}>
            <span class={stylex.attrs(appStyles.statLabel).class}>High priority</span>
            <div class={stylex.attrs(appStyles.statValueRow).class}>
              <span class={stylex.attrs(appStyles.statValue).class}>
                {highPriorityActiveCount()}
              </span>
              <span class={stylex.attrs(appStyles.pillBase, appStyles.pillHigh).class}>
                <span class={stylex.attrs(appStyles.priorityDot).class} />
                Urgent
              </span>
            </div>
            <span class={stylex.attrs(appStyles.appSubtitle).class}>Requires immediate review</span>
          </article>

          <article class={stylex.attrs(appStyles.statCard).class}>
            <span class={stylex.attrs(appStyles.statLabel).class}>Categories</span>
            <div class={stylex.attrs(appStyles.statValueRow).class}>
              <span class={stylex.attrs(appStyles.statValue).class}>{CATEGORIES.length}</span>
              <span class={stylex.attrs(appStyles.pillBase, appStyles.pillNeutral).class}>
                Scoped
              </span>
            </div>
            <span class={stylex.attrs(appStyles.appSubtitle).class}>
              Tokens, SSR, A11y &amp; Compiler
            </span>
          </article>
        </section>

        {/* Main Split Workspace: Left Issue Table + Right Detail Inspector */}
        <div class={stylex.attrs(appStyles.workspaceGrid).class}>
          {/* Left Column: Issue Table */}
          <section class={stylex.attrs(appStyles.panel).class}>
            <div class={stylex.attrs(appStyles.panelHeader).class}>
              <div class={stylex.attrs(appStyles.panelTitleGroup).class}>
                <h2 class={stylex.attrs(appStyles.panelTitle).class}>Sprint Backlog</h2>
                <span class={stylex.attrs(appStyles.pillBase, appStyles.pillNeutral).class}>
                  {filteredTasks().length} issues
                </span>
              </div>

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
                      onClick={() => {
                        setFilter(f);
                      }}
                    >
                      <span>{FILTER_LABELS[f]}</span>
                      <span class={stylex.attrs(appStyles.tabCount).class}>
                        {countForFilter(f)}
                      </span>
                    </button>
                  )}
                </For>
              </div>
            </div>

            {/* Search & Category Filter Toolbar */}
            <div class={stylex.attrs(appStyles.toolbarRow).class}>
              <label class={stylex.attrs(appStyles.searchField).class}>
                <svg
                  class={stylex.attrs(appStyles.searchIcon).class}
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="7" cy="7" r="4.75" stroke="currentColor" stroke-width="1.5" />
                  <path
                    d="M10.5 10.5L14 14"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                <input
                  class={stylex.attrs(appStyles.searchInput).class}
                  type="search"
                  placeholder="Search key, title, or tag..."
                  value={searchQuery()}
                  onInput={(e) => setSearchQuery(e.currentTarget.value)}
                />
              </label>

              <div class={stylex.attrs(appStyles.filterControls).class}>
                <select
                  class={stylex.attrs(appStyles.selectInput).class}
                  aria-label="Filter by category"
                  value={categoryFilter()}
                  onChange={(e) => setCategoryFilter(e.currentTarget.value)}
                >
                  <option value="all">All Categories</option>
                  <For each={CATEGORIES}>{(cat) => <option value={cat}>{cat}</option>}</For>
                </select>
              </div>
            </div>

            {/* Quick Issue Creation Form */}
            <form class={stylex.attrs(appStyles.formRow).class} onSubmit={addTask}>
              <input
                class={stylex.attrs(appStyles.textInput).class}
                aria-label="New issue title"
                placeholder="Add an issue to the sprint..."
                value={draftTitle()}
                onInput={(e) => setDraftTitle(e.currentTarget.value)}
              />
              <select
                class={stylex.attrs(appStyles.selectInput).class}
                aria-label="New issue category"
                value={draftCategory()}
                onChange={(e) => setDraftCategory(e.currentTarget.value as Category)}
              >
                <For each={CATEGORIES}>{(cat) => <option value={cat}>{cat}</option>}</For>
              </select>
              <select
                class={stylex.attrs(appStyles.selectInput).class}
                aria-label="New issue priority"
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
                Create
              </button>
            </form>

            {/* Table Column Headers */}
            <div class={stylex.attrs(appStyles.tableHeader).class}>
              <span>Issue</span>
              <span class={stylex.attrs(appStyles.hideOnCompact).class}>Category</span>
              <span>Priority</span>
              <span class={stylex.attrs(appStyles.hideOnCompact).class}>Due</span>
              <span class={stylex.attrs(appStyles.alignEnd).class}>Action</span>
            </div>

            {/* Issue Rows */}
            <Show
              when={filteredTasks().length > 0}
              fallback={
                <p class={stylex.attrs(appStyles.emptyState).class}>
                  No issues match the current filter criteria.
                </p>
              }
            >
              <ul class={stylex.attrs(appStyles.taskList).class}>
                <For each={filteredTasks()}>
                  {(item) => (
                    <li
                      class={
                        stylex.attrs(
                          rowMarker,
                          appStyles.taskRow,
                          selectedTask()?.id === item.id && appStyles.taskRowSelected,
                          item.done && appStyles.taskRowDone,
                        ).class
                      }
                      data-selected={selectedTask()?.id === item.id ? "true" : "false"}
                      onClick={() => {
                        setSelectedId(item.id);
                      }}
                    >
                      <div class={stylex.attrs(appStyles.taskPrimaryCell).class}>
                        <input
                          type="checkbox"
                          class={stylex.attrs(appStyles.checkboxInput).class}
                          checked={item.done}
                          aria-label={`Mark ${item.key} as done`}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => toggleTask(item.id)}
                        />
                        <span class={stylex.attrs(appStyles.issueKey).class}>{item.key}</span>
                        <span
                          class={
                            stylex.attrs(appStyles.taskTitle, item.done && appStyles.taskTitleDone)
                              .class
                          }
                        >
                          {item.title}
                        </span>
                      </div>

                      <span
                        class={
                          stylex.attrs(
                            appStyles.pillBase,
                            appStyles.pillNeutral,
                            appStyles.hideOnCompact,
                          ).class
                        }
                      >
                        {item.category}
                      </span>

                      <span
                        class={
                          stylex.attrs(appStyles.pillBase, priorityPillMap[item.priority]).class
                        }
                      >
                        <span class={stylex.attrs(appStyles.priorityDot).class} />
                        {PRIORITY_LABELS[item.priority]}
                      </span>

                      <span class={stylex.attrs(appStyles.dueCell, appStyles.hideOnCompact).class}>
                        {item.due}
                      </span>

                      <button
                        type="button"
                        class={stylex.attrs(appStyles.rowActionBtn).class}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTask(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  )}
                </For>
              </ul>
            </Show>

            <div class={stylex.attrs(appStyles.tableFooter).class}>
              <span>
                Showing {filteredTasks().length} of {tasks().length} sprint issues
              </span>
              <span>Click any row to inspect specification</span>
            </div>
          </section>

          {/* Right Column: Issue Detail Inspector */}
          <aside class={stylex.attrs(appStyles.panel).class}>
            <Show
              when={selectedTask()}
              fallback={
                <p class={stylex.attrs(appStyles.emptyState).class}>
                  Select an issue to inspect its details.
                </p>
              }
            >
              {(current) => (
                <>
                  <div class={stylex.attrs(appStyles.inspectorHeader).class}>
                    <div class={stylex.attrs(appStyles.inspectorTitleBlock).class}>
                      <div class={stylex.attrs(appStyles.breadcrumbRow).class}>
                        <span class={stylex.attrs(appStyles.issueKey).class}>{current().key}</span>
                        <span>·</span>
                        <span>{current().category}</span>
                      </div>
                      <h2 class={stylex.attrs(appStyles.inspectorTitle).class}>
                        {current().title}
                      </h2>
                    </div>
                    <span
                      class={
                        stylex.attrs(appStyles.pillBase, priorityPillMap[current().priority]).class
                      }
                    >
                      <span class={stylex.attrs(appStyles.priorityDot).class} />
                      {PRIORITY_LABELS[current().priority]}
                    </span>
                  </div>

                  {/* Metadata Grid */}
                  <dl class={stylex.attrs(appStyles.metaGrid).class}>
                    <div class={stylex.attrs(appStyles.metaItem).class}>
                      <dt class={stylex.attrs(appStyles.metaLabel).class}>Status</dt>
                      <dd class={stylex.attrs(appStyles.metaValue).class}>
                        <span
                          class={
                            stylex.attrs(
                              appStyles.pillBase,
                              current().done ? appStyles.pillLow : appStyles.pillBrand,
                            ).class
                          }
                        >
                          {current().done ? "Completed" : "In Progress"}
                        </span>
                      </dd>
                    </div>

                    <div class={stylex.attrs(appStyles.metaItem).class}>
                      <dt class={stylex.attrs(appStyles.metaLabel).class}>Assignee</dt>
                      <dd class={stylex.attrs(appStyles.metaValue).class}>
                        <span class={stylex.attrs(appStyles.assigneeCell).class}>
                          <span
                            class={
                              stylex.attrs(appStyles.avatarBase, avatarColorMap[current().avatar])
                                .class
                            }
                          >
                            {current().assignee}
                          </span>
                          <span>{current().assignee}</span>
                        </span>
                      </dd>
                    </div>

                    <div class={stylex.attrs(appStyles.metaItem).class}>
                      <dt class={stylex.attrs(appStyles.metaLabel).class}>Target date</dt>
                      <dd class={stylex.attrs(appStyles.metaValue).class}>{current().due}</dd>
                    </div>

                    <div class={stylex.attrs(appStyles.metaItem).class}>
                      <dt class={stylex.attrs(appStyles.metaLabel).class}>Estimate</dt>
                      <dd class={stylex.attrs(appStyles.metaValue).class}>{current().estimate}</dd>
                    </div>
                  </dl>

                  {/* Specification Summary */}
                  <div class={stylex.attrs(appStyles.sectionBlock).class}>
                    <h3 class={stylex.attrs(appStyles.sectionTitle).class}>Specification</h3>
                    <p class={stylex.attrs(appStyles.descriptionText).class}>{current().summary}</p>
                  </div>

                  {/* Subtask Checklist */}
                  <div class={stylex.attrs(appStyles.sectionBlock).class}>
                    <h3 class={stylex.attrs(appStyles.sectionTitle).class}>Acceptance Criteria</h3>
                    <ul class={stylex.attrs(appStyles.checklistGroup).class}>
                      <For each={current().subtasks}>
                        {(sub) => (
                          <li class={stylex.attrs(appStyles.checklistItem).class}>
                            <span
                              class={
                                stylex.attrs(
                                  appStyles.taskTitle,
                                  sub.done && appStyles.taskTitleDone,
                                ).class
                              }
                            >
                              {sub.label}
                            </span>
                            <span
                              class={
                                stylex.attrs(
                                  appStyles.pillBase,
                                  sub.done ? appStyles.pillLow : appStyles.pillNeutral,
                                ).class
                              }
                            >
                              {sub.done ? "Done" : "Pending"}
                            </span>
                          </li>
                        )}
                      </For>
                    </ul>
                  </div>

                  {/* Activity Log */}
                  <div class={stylex.attrs(appStyles.sectionBlock).class}>
                    <h3 class={stylex.attrs(appStyles.sectionTitle).class}>Recent Activity</h3>
                    <ul class={stylex.attrs(appStyles.activityList).class}>
                      <For each={current().activity}>
                        {(entry) => (
                          <li class={stylex.attrs(appStyles.activityItem).class}>
                            <span>
                              <span class={stylex.attrs(appStyles.activityAuthor).class}>
                                {entry.author}
                              </span>{" "}
                              {entry.action}
                            </span>
                            <span>{entry.time}</span>
                          </li>
                        )}
                      </For>
                    </ul>
                  </div>

                  {/* Inspector Footer Actions */}
                  <div class={stylex.attrs(appStyles.inspectorFooter).class}>
                    <button
                      type="button"
                      class={
                        stylex.attrs(appStyles.buttonBase, appStyles.toneNeutral, appStyles.sizeSm)
                          .class
                      }
                      onClick={() => {
                        cyclePriority(current().id);
                      }}
                    >
                      Cycle Priority
                    </button>
                    <button
                      type="button"
                      class={
                        stylex.attrs(
                          appStyles.buttonBase,
                          current().done ? appStyles.toneNeutral : appStyles.toneSuccess,
                          appStyles.sizeSm,
                        ).class
                      }
                      onClick={() => {
                        toggleTask(current().id);
                      }}
                    >
                      {current().done ? "Reopen Issue" : "Mark Complete"}
                    </button>
                  </div>
                </>
              )}
            </Show>
          </aside>
        </div>
      </div>
    </div>
  );
}
