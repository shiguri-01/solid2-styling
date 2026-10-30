export type Priority = "low" | "medium" | "high";
export type Filter = "all" | "active" | "done";
export type Category = "Design System" | "Compiler" | "Tokens" | "Accessibility" | "SSR";
export type AvatarColor = "teal" | "emerald" | "amber" | "rose";

export interface SubtaskItem {
  label: string;
  done: boolean;
}

export interface ActivityEntry {
  author: string;
  action: string;
  time: string;
}

export interface TaskItem {
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

export interface TeamMember {
  initials: string;
  name: string;
  tone: AvatarColor;
}

export const TEAM_MEMBERS: readonly TeamMember[] = [
  { initials: "AK", name: "A. Kurosawa", tone: "teal" },
  { initials: "MS", name: "M. Sato", tone: "emerald" },
  { initials: "KT", name: "K. Tanaka", tone: "amber" },
  { initials: "YM", name: "Y. Mori", tone: "rose" },
];

export const FILTER_OPTIONS: readonly Filter[] = ["all", "active", "done"];

export const FILTER_LABELS: Record<Filter, string> = {
  all: "All",
  active: "Active",
  done: "Done",
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export const CATEGORIES: readonly Category[] = [
  "Design System",
  "Tokens",
  "Compiler",
  "Accessibility",
  "SSR",
];

export const INITIAL_TASKS: TaskItem[] = [
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
      "Establish surface, elevated, border, and semantic status tokens under createThemeContract so light and dark themes swap without runtime recalculation.",
    subtasks: [
      { label: "Map neutral surface scale (#ffffff to #0a0b0d)", done: true },
      { label: "Verify WCAG AA contrast on muted labels", done: true },
      { label: "Export typed contract reference for components", done: true },
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
      "Separate tone and size axes into static styleVariants lookup tables so components bind class strings directly without object allocation.",
    subtasks: [
      { label: "Create buttonTone and buttonSize variant maps", done: true },
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
      { label: "Register named boardContainer with createContainer()", done: true },
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
      "Reset appearance: none on select controls and bind a theme-aware SVG data URI chevron with balanced right padding and focus ring states.",
    subtasks: [
      { label: "Set appearance: none and 30px right padding", done: true },
      { label: "Bind vars.chevron for light and dark stroke colors", done: true },
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
      { label: "Compare selector specificity across libraries", done: false },
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
      { label: "Inspect combined hover and attribute selectors", done: false },
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
