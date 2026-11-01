import type { TaskItem } from "utils";
import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Progress } from "../../components/Progress";
import { css } from "@yak/solid";
import { Heading, Description } from "../../components/ui";
export type ProjectSummary = {
  category: string;
  issues: TaskItem[];
  done: number;
  percent: number;
  owner: string;
};
export function ProjectCard(props: {
  project: ProjectSummary;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      as="article"
      css={css`
        display: grid;
        gap: 1rem;
      `}
      selected={props.selected}
    >
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
          flex-wrap: wrap;
          font-size: 0.75rem;
          color: var(--muted);
        `}
      >
        <Badge tone={props.project.percent === 100 ? "success" : "neutral"}>
          {props.project.percent === 100 ? "Complete" : "In progress"}
        </Badge>
        <span>Q4 / 2026</span>
      </div>
      <Heading>
        <button
          css={css`
            border: 0;
            background: none;
            color: var(--ink);
            padding: 0;
            font-size: 1.125rem;
            font-weight: 600;
            text-align: left;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          `}
          onClick={() => props.onSelect()}
          aria-pressed={props.selected ? "true" : "false"}
        >
          {props.project.category}
        </button>
      </Heading>
      <Description
        css={css`
          font-size: 12px;
        `}
      >
        {props.project.owner} · Project lead
      </Description>
      <Progress value={props.project.percent} label={`${props.project.category} completion`} />
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
          flex-wrap: wrap;
          font-size: 0.75rem;
          color: var(--muted);
        `}
      >
        <span>
          {props.project.done} of {props.project.issues.length} issues complete
        </span>
        <strong>{props.project.percent}%</strong>
      </div>
      <div
        css={css`
          border-top: 1px solid var(--line);
          padding-top: 0.75rem;
          font-size: 0.75rem;
          color: var(--muted);
        `}
      >
        {props.project.issues.filter((t) => !t.done && t.priority === "high").length} high-priority
        open issues
      </div>
    </Card>
  );
}
