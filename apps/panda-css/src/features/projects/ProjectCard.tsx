import type { TaskItem } from "utils";
import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Progress } from "../../components/Progress";
import { s } from "./project-card-styles";
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
    <Card as="article" css={s.project} selected={props.selected}>
      <div class={s.meta}>
        <Badge tone={props.project.percent === 100 ? "success" : "neutral"}>
          {props.project.percent === 100 ? "Complete" : "In progress"}
        </Badge>
        <span>Q4 / 2026</span>
      </div>
      <h2 class={s.heading}>
        <button
          class={s.name}
          onClick={() => props.onSelect()}
          aria-pressed={props.selected ? "true" : "false"}
        >
          {props.project.category}
        </button>
      </h2>
      <p class={s.description}>{props.project.owner} · Project lead</p>
      <Progress value={props.project.percent} label={`${props.project.category} completion`} />
      <div class={s.meta}>
        <span>
          {props.project.done} of {props.project.issues.length} issues complete
        </span>
        <strong>{props.project.percent}%</strong>
      </div>
      <div class={s.risk}>
        {props.project.issues.filter((t) => !t.done && t.priority === "high").length} high-priority
        open issues
      </div>
    </Card>
  );
}
