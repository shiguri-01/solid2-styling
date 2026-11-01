import { For, Show } from "solid-js";
import {
  Page,
  Shell,
  Header,
  Brand,
  Mark,
  Eyebrow,
  HeaderActions,
  Avatars,
  Avatar,
  Sprint,
  Button,
  Metrics,
  Progress,
  ProgressFill,
  Workspace,
  Panel,
  PanelHeading,
  Count,
  Toolbar,
  Input,
  Select,
  Filters,
  Filter,
  CreateForm,
  Primary,
  TableHead,
  Rows,
  Row,
  Issue,
  Done,
  CategoryLabel,
  Badge,
  Delete,
  Empty,
  Footer,
  PanelAside,
  DetailTop,
  Meta,
  DetailSection,
  Criteria,
  Activity,
  DetailActions,
  CompareNote,
} from "./board-styles";
import "../../reset.css";
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

export function Board(props: { library: string; tracker: IssueTrackerStore }) {
  return (
    <Page>
      <Shell>
        <Header>
          <Brand>
            <Mark>S</Mark>
            <div>
              <Eyebrow>DESIGN ENGINEERING / Q4 STYLING MIGRATION</Eyebrow>
              <h1>Solid 2.0 × {props.library}</h1>
            </div>
          </Brand>
          <HeaderActions>
            <Avatars aria-label="Active team members">
              <For each={TEAM_MEMBERS}>
                {(m) => (
                  <Avatar $tone={m.tone} title={m.name}>
                    {m.initials}
                  </Avatar>
                )}
              </For>
            </Avatars>
            <Sprint>Sprint 14</Sprint>
            <Button onClick={() => props.tracker.toggleTheme()}>
              {props.tracker.isDark() ? "Light theme" : "Dark theme"}
            </Button>
          </HeaderActions>
        </Header>
        <Metrics>
          <div>
            <span>Sprint progress</span>
            <strong>{props.tracker.completionRate()}%</strong>
            <Progress>
              <ProgressFill $percent={props.tracker.completionRate()} />
            </Progress>
          </div>
          <div>
            <span>Open issues</span>
            <strong>{props.tracker.activeCount()}</strong>
            <small>Active engineering tasks</small>
          </div>
          <div>
            <span>High priority</span>
            <strong>{props.tracker.highPriorityActiveCount()}</strong>
            <small>Requires immediate review</small>
          </div>
          <div>
            <span>Categories</span>
            <strong>{CATEGORIES.length}</strong>
            <small>Tokens, SSR, A11y &amp; Compiler</small>
          </div>
        </Metrics>
        <Workspace>
          <Panel>
            <PanelHeading>
              <div>
                <h2>Sprint issues</h2>
                <p>Compare how each library styles this interface</p>
              </div>
              <Count>{props.tracker.filteredTasks().length} issues</Count>
            </PanelHeading>
            <Toolbar>
              <Input
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
            </Toolbar>
            <Filters aria-label="Issue status">
              <For each={FILTER_OPTIONS}>
                {(filter) => (
                  <Filter
                    $active={props.tracker.filter() === filter}
                    aria-pressed={props.tracker.filter() === filter ? "true" : "false"}
                    onClick={() => props.tracker.setFilter(filter)}
                  >
                    {FILTER_LABELS[filter]} <span>{props.tracker.countForFilter(filter)}</span>
                  </Filter>
                )}
              </For>
            </Filters>
            <CreateForm onSubmit={(e) => props.tracker.addTask(e)}>
              <Input
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
              <Primary type="submit">Create issue</Primary>
            </CreateForm>
            <TableHead>
              <span>Issue</span>
              <span>Category</span>
              <span>Priority</span>
              <span>Due</span>
              <span />
            </TableHead>
            <Rows>
              <For each={props.tracker.filteredTasks()}>
                {(item) => (
                  <Row
                    $selected={props.tracker.selectedTask()?.id === item.id}
                    onClick={() => props.tracker.setSelectedId(item.id)}
                  >
                    <Issue>
                      <input
                        type="checkbox"
                        checked={item.done}
                        aria-label={`Mark ${item.key} done`}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => props.tracker.toggleTask(item.id)}
                      />
                      <code>{item.key}</code>
                      <Done $done={item.done}>{item.title}</Done>
                    </Issue>
                    <CategoryLabel>{item.category}</CategoryLabel>
                    <Badge $priority={item.priority}>{PRIORITY_LABELS[item.priority]}</Badge>
                    <span>{item.due}</span>
                    <Delete
                      onClick={(e) => {
                        e.stopPropagation();
                        props.tracker.removeTask(item.id);
                      }}
                    >
                      Delete
                    </Delete>
                  </Row>
                )}
              </For>
            </Rows>
            <Show when={!props.tracker.filteredTasks().length}>
              <Empty>No issues match these filters.</Empty>
            </Show>
            <Footer>
              Showing {props.tracker.filteredTasks().length} of {props.tracker.tasks().length}{" "}
              sprint issues
            </Footer>
          </Panel>
          <PanelAside>
            <Show when={props.tracker.selectedTask()}>
              {(task) => (
                <>
                  <DetailTop>
                    <div>
                      <Eyebrow>
                        {task().key} · {task().category}
                      </Eyebrow>
                      <h2>{task().title}</h2>
                    </div>
                    <Badge $priority={task().priority}>{PRIORITY_LABELS[task().priority]}</Badge>
                  </DetailTop>
                  <Meta>
                    <div>
                      <dt>Status</dt>
                      <dd>{task().done ? "Completed" : "In progress"}</dd>
                    </div>
                    <div>
                      <dt>Assignee</dt>
                      <dd>{task().assignee}</dd>
                    </div>
                    <div>
                      <dt>Target date</dt>
                      <dd>{task().due}</dd>
                    </div>
                    <div>
                      <dt>Estimate</dt>
                      <dd>{task().estimate}</dd>
                    </div>
                  </Meta>
                  <DetailSection>
                    <h3>Specification</h3>
                    <p>{task().summary}</p>
                  </DetailSection>
                  <DetailSection>
                    <h3>Acceptance criteria</h3>
                    <Criteria>
                      <For each={task().subtasks}>
                        {(sub) => (
                          <li>
                            <span>
                              {sub.done ? "✓" : "○"} {sub.label}
                            </span>
                            <small>{sub.done ? "Done" : "Pending"}</small>
                          </li>
                        )}
                      </For>
                    </Criteria>
                  </DetailSection>
                  <DetailSection>
                    <h3>Recent activity</h3>
                    <Activity>
                      <For each={task().activity}>
                        {(a) => (
                          <li>
                            <span>
                              <b>{a.author}</b> {a.action}
                            </span>
                            <small>{a.time}</small>
                          </li>
                        )}
                      </For>
                    </Activity>
                  </DetailSection>
                  <DetailActions>
                    <Button onClick={() => props.tracker.cyclePriority(task().id)}>
                      Cycle priority
                    </Button>
                    <Button onClick={() => props.tracker.toggleTask(task().id)}>
                      {task().done ? "Reopen issue" : "Mark complete"}
                    </Button>
                  </DetailActions>
                </>
              )}
            </Show>
          </PanelAside>
        </Workspace>
        <CompareNote>
          Same Solid 2.0 issue board and interactions in each app · styling: {props.library}
        </CompareNote>
      </Shell>
    </Page>
  );
}
