import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { Select } from "../../components/Select";
import { For, Show } from "solid-js";
import { cx } from "zyzz";
import { style, vars } from "../../zyzz.config";
import {
  CATEGORIES,
  FILTER_LABELS,
  FILTER_OPTIONS,
  PRIORITY_LABELS,
  TEAM_MEMBERS,
  type Category,
  type IssueTrackerStore,
  type Priority,
} from "utils";

const s = {
  page: style({
    minWidth: 0,
  }),
  shell: style({
    display: "flex",
    flexDirection: "column",
    gap: "20px !custom",
  }),
  header: style({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: vars.space.lg,
    paddingBottom: "18px !custom",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: vars.color.border,
  }),
  brand: style({
    display: "flex",
    alignItems: "center",
    gap: vars.space.md,
  }),
  title: style({
    margin: 0,
    fontSize: "22px",
    fontWeight: 600,
  }),
  mark: style({
    display: "grid",
    width: "34px",
    height: "34px",
    placeItems: "center",
    borderRadius: "10px !custom",
    backgroundColor: vars.color.brand,
    color: vars.color.surface,
    fontWeight: 700,
  }),
  eyebrow: style({
    margin: 0,
    color: vars.color.textMuted,
    fontSize: "11px",
    letterSpacing: ".08em",
  }),
  headerActions: style({
    display: "flex",
    alignItems: "center",
    gap: "10px !custom",
  }),
  avatars: style({
    display: "flex",
    alignItems: "center",
    gap: 0,
  }),
  avatar: style({
    display: "grid",
    width: "27px",
    height: "27px",
    marginLeft: "-5px !custom",
    placeItems: "center",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: vars.color.bg,
    borderRadius: "50% !custom",
    fontSize: "10px",
  }),
  toneTeal: style({
    backgroundColor: vars.color.surfaceSelected,
    color: vars.color.brand,
  }),
  toneEmerald: style({
    backgroundColor: vars.color.successSoft,
    color: vars.color.success,
  }),
  toneAmber: style({
    backgroundColor: vars.color.warningSoft,
    color: vars.color.warning,
  }),
  toneRose: style({
    backgroundColor: vars.color.dangerSoft,
    color: vars.color.danger,
  }),
  sprint: style({
    color: vars.color.textMuted,
    fontSize: "11px",
  }),
  count: style({
    color: vars.color.textMuted,
    fontSize: "11px",
  }),
  metrics: style({
    display: "grid",
    gridTemplateColumns: "repeat(4,minmax(0,1fr))",
    "@media (max-width:800px)": {
      gridTemplateColumns: "repeat(2,minmax(0,1fr))",
    },
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: vars.color.border,
    borderRadius: "9px !custom",
    backgroundColor: vars.color.surface,
  }),
  metric: style({
    display: "flex",
    flexDirection: "column",
    gap: "6px !custom",
    paddingBlock: "18px !custom",
    paddingInline: "20px !custom",
    borderRightWidth: "1px",
    borderRightStyle: "solid",
    borderRightColor: vars.color.border,
    color: vars.color.textMuted,
    fontSize: "12px",
  }),
  lastMetric: style({
    borderRightWidth: 0,
  }),
  metricValue: style({
    color: vars.color.text,
    fontSize: "24px",
    lineHeight: 1.2,
  }),
  metricNote: style({
    fontSize: "11px",
  }),
  progress: style({
    height: "4px",
    overflow: "hidden",
    borderRadius: "4px !custom",
    backgroundColor: vars.color.border,
  }),
  progressFill: style({
    display: "block",
    height: "100%",
    backgroundColor: vars.color.brand,
  }),
  workspace: style({
    display: "grid",
    gridTemplateColumns: "minmax(0,1.35fr) minmax(320px,.9fr)",
    "@media (max-width:1000px)": {
      gridTemplateColumns: "minmax(0,1fr)",
    },
    gap: "18px !custom",
    alignItems: "start",
  }),
  panel: style({
    containerType: "inline-size",
    containerName: "issue-panel",
  }),
  panelHeading: style({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px !custom",
  }),
  panelTitle: style({
    margin: 0,
    fontSize: "16px",
    fontWeight: 700,
  }),
  panelDescription: style({
    marginTop: vars.space.xs,
    marginBottom: 0,
    color: vars.color.textMuted,
    fontSize: "12px",
  }),
  toolbar: style({
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr) minmax(140px,180px)",
    "@container issue-panel (max-width:380px)": {
      gridTemplateColumns: "minmax(0,1fr)",
    },
    gap: vars.space.sm,
    alignItems: "center",
    marginTop: "18px !custom",
  }),
  filters: style({
    display: "flex",
    gap: vars.space.xs,
    marginTop: vars.space.md,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: vars.color.border,
  }),
  filter: style({
    paddingBlock: "9px !custom",
    paddingInline: "10px !custom",
    borderWidth: 0,
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: vars.color.transparent,
    borderRadius: "0 !custom",
    backgroundColor: vars.color.transparent,
    color: vars.color.textMuted,
    cursor: "pointer",
    fontSize: "12px",
  }),
  filterCount: style({
    marginLeft: vars.space.xs,
    fontSize: "10px",
  }),
  filterActive: style({
    borderBottomColor: vars.color.brand,
    color: vars.color.brand,
  }),
  createForm: style({
    display: "grid",
    gridTemplateColumns: "minmax(180px,1fr) minmax(140px,160px) minmax(100px,120px) auto",
    "@container issue-panel (max-width:640px)": {
      gridTemplateColumns: "minmax(0,1fr) minmax(100px,140px) auto",
    },
    "@container issue-panel (max-width:380px)": {
      gridTemplateColumns: "repeat(2,minmax(0,1fr))",
    },
    gap: vars.space.sm,
    alignItems: "center",
    marginTop: "14px !custom",
  }),
  createTitle: style({
    minWidth: 0,
    gridColumn: "auto",
    "@container issue-panel (max-width:640px)": {
      gridColumn: "1 / -1",
    },
  }),
  createAction: style({
    whiteSpace: "nowrap",
    gridColumn: "auto",
    "@container issue-panel (max-width:380px)": {
      gridColumn: "1 / -1",
    },
  }),
  tableHead: style({
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr) 100px 78px 55px 45px",
    "@container issue-panel (max-width:560px)": {
      gridTemplateColumns: "minmax(0,1fr) 70px 42px",
    },
    gap: vars.space.sm,
    alignItems: "center",
    marginTop: "20px !custom",
    paddingInline: "5px !custom",
    paddingBottom: vars.space.sm,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: vars.color.border,
    color: vars.color.textMuted,
    fontSize: "11px",
  }),
  rows: style({
    margin: 0,
    padding: 0,
    listStyle: "none",
  }),
  row: style({
    display: "grid",
    gridTemplateColumns: "minmax(0,1fr) 100px 78px 55px 45px",
    "@container issue-panel (max-width:560px)": {
      gridTemplateColumns: "minmax(0,1fr) 70px 42px",
    },
    gap: vars.space.sm,
    alignItems: "center",
    minHeight: "49px",
    paddingInline: "5px !custom",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: vars.color.border,
    fontSize: "11px",
    cursor: "pointer",
    backgroundColor: vars.color.transparent,
    ":hover": {
      backgroundColor: vars.color.surfaceHover,
    },
    outlineColor: vars.color.brand,
    outlineOffset: "-2px",
  }),
  selected: style({
    backgroundColor: vars.color.surfaceSelected,
    ":hover": {
      backgroundColor: vars.color.surfaceSelected,
    },
    position: "relative",
    "::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "2px !custom",
      backgroundColor: vars.color.brand,
      pointerEvents: "none",
    },
  }),
  issue: style({
    display: "flex",
    minWidth: 0,
    alignItems: "center",
    gap: "7px !custom",
  }),
  issueTitle: style({
    minWidth: 0,
    borderWidth: 0,
    padding: 0,
    backgroundColor: vars.color.transparent,
    color: "inherit !custom",
    font: "inherit",
    textAlign: "left",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  issueKey: style({
    color: vars.color.textMuted,
    fontSize: "10px",
    flexShrink: 0,
    whiteSpace: "nowrap",
  }),
  done: style({
    color: vars.color.textMuted,
    textDecoration: "line-through",
  }),
  category: style({
    overflow: "hidden",
    color: vars.color.textMuted,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  secondary: style({
    display: "block",
    "@container issue-panel (max-width:560px)": {
      display: "none",
    },
  }),
  badge: style({
    width: "max-content",
    paddingBlock: "3px !custom",
    paddingInline: "7px !custom",
    borderRadius: "20px !custom",
    backgroundColor: vars.color.surfaceHover,
    color: vars.color.textMuted,
    fontSize: "10px",
  }),
  priorityHigh: style({
    backgroundColor: vars.color.dangerSoft,
    color: vars.color.danger,
  }),
  priorityMedium: style({
    backgroundColor: vars.color.warningSoft,
    color: vars.color.warning,
  }),
  priorityLow: style({
    backgroundColor: vars.color.successSoft,
    color: vars.color.success,
  }),
  delete: style({
    borderWidth: 0,
    backgroundColor: vars.color.transparent,
    color: vars.color.textMuted,
    fontSize: "10px",
    cursor: "pointer",
  }),
  empty: style({
    padding: vars.space.xl,
    textAlign: "center",
    color: vars.color.textMuted,
  }),
  footer: style({
    paddingTop: vars.space.md,
    color: vars.color.textMuted,
    fontSize: "11px",
  }),
  detailTop: style({
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "10px !custom",
    paddingBottom: "14px !custom",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: vars.color.border,
  }),
  detailTitle: style({
    marginTop: "5px !custom",
    marginBottom: 0,
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: 1.4,
  }),
  meta: style({
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px !custom",
    margin: 0,
    paddingBlock: vars.space.lg,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: vars.color.border,
  }),
  metaItem: style({
    display: "grid",
    gap: vars.space.xs,
  }),
  metaLabel: style({
    color: vars.color.textMuted,
    fontSize: "11px",
  }),
  metaValue: style({
    margin: 0,
    fontSize: "12px",
    fontWeight: 500,
  }),
  detailSection: style({
    marginTop: vars.space.lg,
  }),
  sectionTitle: style({
    marginTop: 0,
    marginBottom: vars.space.sm,
    color: vars.color.textMuted,
    fontSize: "12px",
  }),
  sectionDescription: style({
    margin: 0,
    color: vars.color.text,
    fontSize: "12px",
    lineHeight: 1.6,
  }),
  criteria: style({
    margin: 0,
    padding: 0,
    listStyle: "none",
  }),
  activity: style({
    margin: 0,
    padding: 0,
    listStyle: "none",
  }),
  criteriaItem: style({
    display: "flex",
    justifyContent: "space-between",
    gap: "10px !custom",
    paddingBlock: vars.space.sm,
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: vars.color.border,
    fontSize: "11px",
  }),
  activityItem: style({
    display: "flex",
    justifyContent: "space-between",
    gap: "10px !custom",
    paddingBlock: vars.space.sm,
    fontSize: "11px",
  }),
  itemNote: style({
    color: vars.color.textMuted,
    whiteSpace: "nowrap",
  }),
  detailActions: style({
    display: "flex",
    gap: vars.space.sm,
    marginTop: "18px !custom",
    paddingTop: "14px !custom",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: vars.color.border,
  }),
  compareNote: style({
    margin: 0,
    textAlign: "center",
    color: vars.color.textMuted,
    fontSize: "11px",
  }),
};

export function Board(props: { tracker: IssueTrackerStore }) {
  return (
    <section class={cx(s.page()).class}>
      <div class={cx(s.shell()).class}>
        <header class={cx(s.header()).class}>
          <div class={cx(s.brand()).class}>
            <span class={cx(s.mark()).class}>S</span>
            <div>
              <p class={cx(s.eyebrow()).class}>DESIGN ENGINEERING / Q4 STYLING MIGRATION</p>
              <h1 class={cx(s.title()).class}>Solid 2.0 × Zyzz</h1>
            </div>
          </div>
          <div class={cx(s.headerActions()).class}>
            <div class={cx(s.avatars()).class} aria-label="Active team members">
              <For each={TEAM_MEMBERS}>
                {(m) => (
                  <span
                    class={
                      cx(
                        s.avatar(),
                        m.tone === "teal" && s.toneTeal(),
                        m.tone === "emerald" && s.toneEmerald(),
                        m.tone === "amber" && s.toneAmber(),
                        m.tone === "rose" && s.toneRose(),
                      ).class
                    }
                    title={m.name}
                  >
                    {m.initials}
                  </span>
                )}
              </For>
            </div>
            <span class={cx(s.sprint()).class}>Sprint 14</span>
            <Button onClick={() => props.tracker.toggleTheme()}>
              {props.tracker.isDark() ? "Light theme" : "Dark theme"}
            </Button>
          </div>
        </header>
        <section class={cx(s.metrics()).class}>
          <div class={cx(s.metric()).class}>
            <span>Sprint progress</span>
            <strong class={cx(s.metricValue()).class}>{props.tracker.completionRate()}%</strong>
            <div class={cx(s.progress()).class}>
              <i {...s.progressFill()} style={{ width: `${props.tracker.completionRate()}%` }} />
            </div>
          </div>
          <div class={cx(s.metric()).class}>
            <span>Open issues</span>
            <strong class={cx(s.metricValue()).class}>{props.tracker.activeCount()}</strong>
            <small class={cx(s.metricNote()).class}>Active engineering tasks</small>
          </div>
          <div class={cx(s.metric()).class}>
            <span>High priority</span>
            <strong class={cx(s.metricValue()).class}>
              {props.tracker.highPriorityActiveCount()}
            </strong>
            <small class={cx(s.metricNote()).class}>Requires immediate review</small>
          </div>
          <div class={cx(s.metric(), s.lastMetric()).class}>
            <span>Categories</span>
            <strong class={cx(s.metricValue()).class}>{CATEGORIES.length}</strong>
            <small class={cx(s.metricNote()).class}>Tokens, SSR, A11y &amp; Compiler</small>
          </div>
        </section>
        <div class={cx(s.workspace()).class}>
          <Card as="section" class={s.panel().class}>
            <div class={cx(s.panelHeading()).class}>
              <div>
                <h2 class={cx(s.panelTitle()).class}>Sprint issues</h2>
                <p class={cx(s.panelDescription()).class}>
                  Compare how each library styles this interface
                </p>
              </div>
              <span class={cx(s.count()).class}>{props.tracker.filteredTasks().length} issues</span>
            </div>
            <div class={cx(s.toolbar()).class}>
              <TextInput
                type="search"
                aria-label="Search issues"
                placeholder="Search key, title, or category…"
                value={props.tracker.searchQuery()}
                onInput={(e) => props.tracker.setSearchQuery(e.currentTarget.value)}
              />
              <Select
                aria-label="Filter by category"
                value={props.tracker.categoryFilter()}
                onChange={(e) => props.tracker.setCategoryFilter(e.currentTarget.value)}
              >
                <option value="all">All categories</option>
                <For each={CATEGORIES}>{(cat) => <option>{cat}</option>}</For>
              </Select>
            </div>
            <nav class={cx(s.filters()).class} aria-label="Issue status">
              <For each={FILTER_OPTIONS}>
                {(filter) => (
                  <button
                    class={
                      cx(s.filter(), props.tracker.filter() === filter && s.filterActive()).class
                    }
                    aria-pressed={props.tracker.filter() === filter ? "true" : "false"}
                    onClick={() => props.tracker.setFilter(filter)}
                  >
                    {FILTER_LABELS[filter]}{" "}
                    <span class={cx(s.filterCount()).class}>
                      {props.tracker.countForFilter(filter)}
                    </span>
                  </button>
                )}
              </For>
            </nav>
            <form class={cx(s.createForm()).class} onSubmit={(e) => props.tracker.addTask(e)}>
              <TextInput
                class={s.createTitle().class}
                aria-label="New issue title"
                placeholder="Add an issue to the sprint…"
                value={props.tracker.draftTitle()}
                onInput={(e) => props.tracker.setDraftTitle(e.currentTarget.value)}
              />
              <Select
                aria-label="New issue category"
                value={props.tracker.draftCategory()}
                onChange={(e) => props.tracker.setDraftCategory(e.currentTarget.value as Category)}
              >
                <For each={CATEGORIES}>{(cat) => <option>{cat}</option>}</For>
              </Select>
              <Select
                aria-label="New issue priority"
                value={props.tracker.draftPriority()}
                onChange={(e) => props.tracker.setDraftPriority(e.currentTarget.value as Priority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
              <Button class={s.createAction().class} variant="primary" type="submit">
                Create issue
              </Button>
            </form>
            <div class={cx(s.tableHead()).class}>
              <span>Issue</span>
              <span class={cx(s.secondary()).class}>Category</span>
              <span>Priority</span>
              <span class={cx(s.secondary()).class}>Due</span>
              <span />
            </div>
            <ul class={cx(s.rows()).class}>
              <For each={props.tracker.filteredTasks()}>
                {(item) => (
                  <li
                    class={
                      cx(s.row(), props.tracker.selectedTask()?.id === item.id && s.selected())
                        .class
                    }
                    onClick={() => props.tracker.setSelectedId(item.id)}
                  >
                    <div class={cx(s.issue()).class}>
                      <input
                        type="checkbox"
                        checked={item.done}
                        aria-label={`Mark ${item.key} done`}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => props.tracker.toggleTask(item.id)}
                      />
                      <code class={cx(s.issueKey()).class}>{item.key}</code>
                      <button
                        type="button"
                        class={cx(s.issueTitle(), item.done && s.done()).class}
                        aria-pressed={
                          props.tracker.selectedTask()?.id === item.id ? "true" : "false"
                        }
                        onClick={(event) => {
                          event.stopPropagation();
                          props.tracker.setSelectedId(item.id);
                        }}
                      >
                        {item.title}
                      </button>
                    </div>
                    <span class={cx(s.category(), s.secondary()).class}>{item.category}</span>
                    <span
                      class={
                        cx(
                          s.badge(),
                          item.priority === "high" && s.priorityHigh(),
                          item.priority === "medium" && s.priorityMedium(),
                          item.priority === "low" && s.priorityLow(),
                        ).class
                      }
                    >
                      {PRIORITY_LABELS[item.priority]}
                    </span>
                    <span class={cx(s.secondary()).class}>{item.due}</span>
                    <button
                      class={cx(s.delete()).class}
                      onClick={(e) => {
                        e.stopPropagation();
                        props.tracker.removeTask(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                )}
              </For>
            </ul>
            <Show when={!props.tracker.filteredTasks().length}>
              <p class={cx(s.empty()).class}>No issues match these filters.</p>
            </Show>
            <footer class={cx(s.footer()).class}>
              Showing {props.tracker.filteredTasks().length} of {props.tracker.tasks().length}{" "}
              sprint issues
            </footer>
          </Card>
          <Card as="aside">
            <Show when={props.tracker.selectedTask()}>
              {(task) => (
                <>
                  <div class={cx(s.detailTop()).class}>
                    <div>
                      <p class={cx(s.eyebrow()).class}>
                        {task().key} · {task().category}
                      </p>
                      <h2 class={cx(s.detailTitle()).class}>{task().title}</h2>
                    </div>
                    <span
                      class={
                        cx(
                          s.badge(),
                          task().priority === "high" && s.priorityHigh(),
                          task().priority === "medium" && s.priorityMedium(),
                          task().priority === "low" && s.priorityLow(),
                        ).class
                      }
                    >
                      {PRIORITY_LABELS[task().priority]}
                    </span>
                  </div>
                  <dl class={cx(s.meta()).class}>
                    <div class={cx(s.metaItem()).class}>
                      <dt class={cx(s.metaLabel()).class}>Status</dt>
                      <dd class={cx(s.metaValue()).class}>
                        {task().done ? "Completed" : "In progress"}
                      </dd>
                    </div>
                    <div class={cx(s.metaItem()).class}>
                      <dt class={cx(s.metaLabel()).class}>Assignee</dt>
                      <dd class={cx(s.metaValue()).class}>{task().assignee}</dd>
                    </div>
                    <div class={cx(s.metaItem()).class}>
                      <dt class={cx(s.metaLabel()).class}>Target date</dt>
                      <dd class={cx(s.metaValue()).class}>{task().due}</dd>
                    </div>
                    <div class={cx(s.metaItem()).class}>
                      <dt class={cx(s.metaLabel()).class}>Estimate</dt>
                      <dd class={cx(s.metaValue()).class}>{task().estimate}</dd>
                    </div>
                  </dl>
                  <section class={cx(s.detailSection()).class}>
                    <h3 class={cx(s.sectionTitle()).class}>Specification</h3>
                    <p class={cx(s.sectionDescription()).class}>{task().summary}</p>
                  </section>
                  <section class={cx(s.detailSection()).class}>
                    <h3 class={cx(s.sectionTitle()).class}>Acceptance criteria</h3>
                    <ul class={cx(s.criteria()).class}>
                      <For each={task().subtasks}>
                        {(sub) => (
                          <li class={cx(s.criteriaItem()).class}>
                            <span>
                              {sub.done ? "✓" : "○"} {sub.label}
                            </span>
                            <small class={cx(s.itemNote()).class}>
                              {sub.done ? "Done" : "Pending"}
                            </small>
                          </li>
                        )}
                      </For>
                    </ul>
                  </section>
                  <section class={cx(s.detailSection()).class}>
                    <h3 class={cx(s.sectionTitle()).class}>Recent activity</h3>
                    <ul class={cx(s.activity()).class}>
                      <For each={task().activity}>
                        {(a) => (
                          <li class={cx(s.activityItem()).class}>
                            <span>
                              <b>{a.author}</b> {a.action}
                            </span>
                            <small class={cx(s.itemNote()).class}>{a.time}</small>
                          </li>
                        )}
                      </For>
                    </ul>
                  </section>
                  <div class={cx(s.detailActions()).class}>
                    <Button onClick={() => props.tracker.cyclePriority(task().id)}>
                      Cycle priority
                    </Button>
                    <Button onClick={() => props.tracker.toggleTask(task().id)}>
                      {task().done ? "Reopen issue" : "Mark complete"}
                    </Button>
                  </div>
                </>
              )}
            </Show>
          </Card>
        </div>
        <p class={cx(s.compareNote()).class}>
          Same Solid 2.0 issue board and interactions in each app · styling: StyleX
        </p>
      </div>
    </section>
  );
}
