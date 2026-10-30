import { createMemo, createSignal } from "solid-js";
import {
  type Category,
  type Filter,
  INITIAL_TASKS,
  type Priority,
  type TaskItem,
} from "./issue-tracker-data.ts";

export function createIssueTracker() {
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

  const toggleTheme = () => {
    setIsDark((d) => !d);
  };

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

  const addTask = (e: { preventDefault: () => void }) => {
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

  return {
    isDark,
    toggleTheme,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    tasks,
    selectedId,
    setSelectedId,
    draftTitle,
    setDraftTitle,
    draftCategory,
    setDraftCategory,
    draftPriority,
    setDraftPriority,
    completedCount,
    activeCount,
    highPriorityActiveCount,
    completionRate,
    countForFilter,
    filteredTasks,
    selectedTask,
    toggleTask,
    cyclePriority,
    addTask,
    removeTask,
  };
}

export type IssueTrackerStore = ReturnType<typeof createIssueTracker>;
