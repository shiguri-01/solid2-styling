import { Title } from "@solidjs/meta";
import { createMemo, createSignal, For, Show } from "solid-js";
import { cx } from "zyzz";
import {
  actionButton,
  activityAuthor,
  activityItem,
  activityList,
  alignEnd,
  appSubtitle,
  appTitle,
  assigneeCell,
  avatar,
  avatarStack,
  brandGroup,
  breadcrumbRow,
  checkboxInput,
  checklistGroup,
  checklistItem,
  container,
  descriptionText,
  dueCell,
  emptyState,
  filterControls,
  filterGroup,
  filterTab,
  formRow,
  headerActions,
  headerBar,
  hideOnCompact,
  inspectorFooter,
  inspectorHeader,
  inspectorTitle,
  inspectorTitleBlock,
  issueKey,
  liveDot,
  metaGrid,
  metaItem,
  metaLabel,
  metaValue,
  pageShell,
  panel,
  panelHeader,
  panelTitle,
  panelTitleGroup,
  pill,
  priorityDot,
  progressFill,
  progressTrack,
  rowActionBtn,
  searchField,
  searchIcon,
  searchInput,
  sectionBlock,
  sectionTitle,
  selectInput,
  statCard,
  statLabel,
  statsGrid,
  statValue,
  statValueRow,
  tabCount,
  tableFooter,
  tableHeader,
  taskList,
  taskPrimaryCell,
  taskRow,
  taskTitle,
  textInput,
  titleBlock,
  toolbarRow,
  workspaceGrid,
} from "../styles";
import { vars } from "../zyzz.config";

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
      "Establish surface, elevated, border, and semantic status tokens as { light, dark } pairs in zyzz.config.ts so color schemes swap with zero runtime overhead.",
    subtasks: [
      { label: "Map neutral surface scale (#ffffff to #0a0b0d)", done: true },
      { label: "Verify WCAG AA contrast on muted labels", done: true },
      { label: "Export typed vars contract from zyzz.config.ts", done: true },
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
      "Author multi-axis recipes with variants({ selection: 'class' }) and output: 'html' so components bind precompiled .class strings directly in Solid 2.0.",
    subtasks: [
      { label: "Create actionButton and pill recipes with selection: 'class'", done: true },
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
      { label: "Verify parent row hover reveals delete action", done: false },
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
      "Reset appearance: none on select controls and bind a custom SVG data URI chevron with balanced right padding and focus ring states.",
    subtasks: [
      { label: "Set appearance: none and 30px right padding", done: true },
      { label: "Configure custom SVG chevron background image", done: true },
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
      { label: "Compare atomic vs grouped selector output across libraries", done: false },
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
      { label: "Inspect combined hover and variant selectors", done: false },
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
    <div class={cx(vars({ colorScheme: isDark() ? "dark" : "light" }), pageShell()).class}>
      <Title>Solid 2.0 × Zyzz — Issue Tracker</Title>
      <div class={container().class}>
        {/* Top Workspace Header */}
        <header class={headerBar().class}>
          <div class={brandGroup().class}>
            <span class={liveDot().class} />
            <div class={titleBlock().class}>
              <div class={breadcrumbRow().class}>
                <span>Design Engineering</span>
                <span>/</span>
                <span>Q4 Styling Migration</span>
              </div>
              <h1 class={appTitle().class}>Solid 2.0 × Zyzz</h1>
            </div>
          </div>

          <div class={headerActions().class}>
            <div class={avatarStack().class} aria-label="Active team members">
              <span class={avatar({ tone: "teal" }).class} title="A. Kurosawa">
                AK
              </span>
              <span class={avatar({ tone: "emerald" }).class} title="M. Sato">
                MS
              </span>
              <span class={avatar({ tone: "amber" }).class} title="K. Tanaka">
                KT
              </span>
              <span class={avatar({ tone: "rose" }).class} title="Y. Mori">
                YM
              </span>
            </div>
            <span class={pill({ tone: "brand" }).class}>Sprint 14</span>
            <button
              type="button"
              class={actionButton({ tone: "neutral", size: "sm" }).class}
              onClick={() => {
                setIsDark((d) => !d);
              }}
            >
              {isDark() ? "Light Theme" : "Dark Theme"}
            </button>
          </div>
        </header>

        {/* 4-Column Divided KPI Strip */}
        <section class={statsGrid().class}>
          <article class={statCard().class}>
            <span class={statLabel().class}>Sprint progress</span>
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
            <span class={statLabel().class}>Open issues</span>
            <div class={statValueRow().class}>
              <span class={statValue().class}>{activeCount()}</span>
              <span class={pill({ tone: "brand" }).class}>In Queue</span>
            </div>
            <span class={appSubtitle().class}>Active engineering tasks</span>
          </article>

          <article class={statCard().class}>
            <span class={statLabel().class}>High priority</span>
            <div class={statValueRow().class}>
              <span class={statValue().class}>{highPriorityActiveCount()}</span>
              <span class={pill({ tone: "high" }).class}>
                <span class={priorityDot().class} />
                Urgent
              </span>
            </div>
            <span class={appSubtitle().class}>Requires immediate review</span>
          </article>

          <article class={statCard().class}>
            <span class={statLabel().class}>Categories</span>
            <div class={statValueRow().class}>
              <span class={statValue().class}>{CATEGORIES.length}</span>
              <span class={pill({ tone: "neutral" }).class}>Scoped</span>
            </div>
            <span class={appSubtitle().class}>Tokens, SSR, A11y &amp; Compiler</span>
          </article>
        </section>

        {/* Main Split Workspace: Left Issue Table + Right Detail Inspector */}
        <div class={workspaceGrid().class}>
          {/* Left Column: Issue Table */}
          <section class={panel().class}>
            <div class={panelHeader().class}>
              <div class={panelTitleGroup().class}>
                <h2 class={panelTitle().class}>Sprint Backlog</h2>
                <span class={pill({ tone: "neutral" }).class}>{filteredTasks().length} issues</span>
              </div>

              <div class={filterGroup().class}>
                <For each={["all", "active", "done"] as const}>
                  {(f) => (
                    <button
                      type="button"
                      class={filterTab({ active: filter() === f }).class}
                      onClick={() => {
                        setFilter(f);
                      }}
                    >
                      <span>{FILTER_LABELS[f]}</span>
                      <span class={tabCount().class}>{countForFilter(f)}</span>
                    </button>
                  )}
                </For>
              </div>
            </div>

            {/* Search & Category Filter Toolbar */}
            <div class={toolbarRow().class}>
              <label class={searchField().class}>
                <svg class={searchIcon().class} viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="4.75" stroke="currentColor" stroke-width="1.5" />
                  <path
                    d="M10.5 10.5L14 14"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
                <input
                  class={searchInput().class}
                  type="search"
                  placeholder="Search key, title, or tag..."
                  value={searchQuery()}
                  onInput={(e) => setSearchQuery(e.currentTarget.value)}
                />
              </label>

              <div class={filterControls().class}>
                <select
                  class={selectInput().class}
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
            <form class={formRow().class} onSubmit={addTask}>
              <input
                class={textInput().class}
                aria-label="New issue title"
                placeholder="Add an issue to the sprint..."
                value={draftTitle()}
                onInput={(e) => setDraftTitle(e.currentTarget.value)}
              />
              <select
                class={selectInput().class}
                aria-label="New issue category"
                value={draftCategory()}
                onChange={(e) => setDraftCategory(e.currentTarget.value as Category)}
              >
                <For each={CATEGORIES}>{(cat) => <option value={cat}>{cat}</option>}</For>
              </select>
              <select
                class={selectInput().class}
                aria-label="New issue priority"
                value={draftPriority()}
                onChange={(e) => setDraftPriority(e.currentTarget.value as Priority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button type="submit" class={actionButton({ tone: "primary", size: "md" }).class}>
                Create
              </button>
            </form>

            {/* Table Column Headers */}
            <div class={tableHeader().class}>
              <span>Issue</span>
              <span class={hideOnCompact().class}>Category</span>
              <span>Priority</span>
              <span class={hideOnCompact().class}>Due</span>
              <span class={alignEnd().class}>Action</span>
            </div>

            {/* Issue Rows */}
            <Show
              when={filteredTasks().length > 0}
              fallback={
                <p class={emptyState().class}>No issues match the current filter criteria.</p>
              }
            >
              <ul class={taskList().class}>
                <For each={filteredTasks()}>
                  {(item) => (
                    <li
                      class={
                        taskRow({
                          done: item.done,
                          selected: selectedTask()?.id === item.id,
                        }).class
                      }
                      data-selected={selectedTask()?.id === item.id ? "true" : "false"}
                      onClick={() => {
                        setSelectedId(item.id);
                      }}
                    >
                      <div class={taskPrimaryCell().class}>
                        <input
                          type="checkbox"
                          class={checkboxInput().class}
                          checked={item.done}
                          aria-label={`Mark ${item.key} as done`}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => toggleTask(item.id)}
                        />
                        <span class={issueKey().class}>{item.key}</span>
                        <span class={taskTitle({ done: item.done }).class}>{item.title}</span>
                      </div>

                      <span class={cx(pill({ tone: "neutral" }), hideOnCompact()).class}>
                        {item.category}
                      </span>

                      <span class={pill({ tone: item.priority }).class}>
                        <span class={priorityDot().class} />
                        {PRIORITY_LABELS[item.priority]}
                      </span>

                      <span class={cx(dueCell(), hideOnCompact()).class}>{item.due}</span>

                      <button
                        type="button"
                        class={rowActionBtn().class}
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

            <div class={tableFooter().class}>
              <span>
                Showing {filteredTasks().length} of {tasks().length} sprint issues
              </span>
              <span>Click any row to inspect specification</span>
            </div>
          </section>

          {/* Right Column: Issue Detail Inspector */}
          <aside class={panel().class}>
            <Show
              when={selectedTask()}
              fallback={<p class={emptyState().class}>Select an issue to inspect its details.</p>}
            >
              {(current) => (
                <>
                  <div class={inspectorHeader().class}>
                    <div class={inspectorTitleBlock().class}>
                      <div class={breadcrumbRow().class}>
                        <span class={issueKey().class}>{current().key}</span>
                        <span>·</span>
                        <span>{current().category}</span>
                      </div>
                      <h2 class={inspectorTitle().class}>{current().title}</h2>
                    </div>
                    <span class={pill({ tone: current().priority }).class}>
                      <span class={priorityDot().class} />
                      {PRIORITY_LABELS[current().priority]}
                    </span>
                  </div>

                  {/* Metadata Grid */}
                  <dl class={metaGrid().class}>
                    <div class={metaItem().class}>
                      <dt class={metaLabel().class}>Status</dt>
                      <dd class={metaValue().class}>
                        <span class={pill({ tone: current().done ? "low" : "brand" }).class}>
                          {current().done ? "Completed" : "In Progress"}
                        </span>
                      </dd>
                    </div>

                    <div class={metaItem().class}>
                      <dt class={metaLabel().class}>Assignee</dt>
                      <dd class={metaValue().class}>
                        <span class={assigneeCell().class}>
                          <span class={avatar({ tone: current().avatar }).class}>
                            {current().assignee}
                          </span>
                          <span>{current().assignee}</span>
                        </span>
                      </dd>
                    </div>

                    <div class={metaItem().class}>
                      <dt class={metaLabel().class}>Target date</dt>
                      <dd class={metaValue().class}>{current().due}</dd>
                    </div>

                    <div class={metaItem().class}>
                      <dt class={metaLabel().class}>Estimate</dt>
                      <dd class={metaValue().class}>{current().estimate}</dd>
                    </div>
                  </dl>

                  {/* Specification Summary */}
                  <div class={sectionBlock().class}>
                    <h3 class={sectionTitle().class}>Specification</h3>
                    <p class={descriptionText().class}>{current().summary}</p>
                  </div>

                  {/* Subtask Checklist */}
                  <div class={sectionBlock().class}>
                    <h3 class={sectionTitle().class}>Acceptance Criteria</h3>
                    <ul class={checklistGroup().class}>
                      <For each={current().subtasks}>
                        {(sub) => (
                          <li class={checklistItem().class}>
                            <span class={taskTitle({ done: sub.done }).class}>{sub.label}</span>
                            <span class={pill({ tone: sub.done ? "low" : "neutral" }).class}>
                              {sub.done ? "Done" : "Pending"}
                            </span>
                          </li>
                        )}
                      </For>
                    </ul>
                  </div>

                  {/* Activity Log */}
                  <div class={sectionBlock().class}>
                    <h3 class={sectionTitle().class}>Recent Activity</h3>
                    <ul class={activityList().class}>
                      <For each={current().activity}>
                        {(entry) => (
                          <li class={activityItem().class}>
                            <span>
                              <span class={activityAuthor().class}>{entry.author}</span>{" "}
                              {entry.action}
                            </span>
                            <span>{entry.time}</span>
                          </li>
                        )}
                      </For>
                    </ul>
                  </div>

                  {/* Inspector Footer Actions */}
                  <div class={inspectorFooter().class}>
                    <button
                      type="button"
                      class={actionButton({ tone: "neutral", size: "sm" }).class}
                      onClick={() => {
                        cyclePriority(current().id);
                      }}
                    >
                      Cycle Priority
                    </button>
                    <button
                      type="button"
                      class={
                        actionButton({
                          tone: current().done ? "neutral" : "success",
                          size: "sm",
                        }).class
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
