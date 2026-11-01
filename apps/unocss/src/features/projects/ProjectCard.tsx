import type { TaskItem } from "utils";
import { Card } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Progress } from "../../components/Progress";
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
    <Card as="article" class="grid gap-4" selected={props.selected}>
      <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <Badge tone={props.project.percent === 100 ? "success" : "neutral"}>
          {props.project.percent === 100 ? "Complete" : "In progress"}
        </Badge>
        <span>Q4 / 2026</span>
      </div>
      <h2>
        <button
          class="cursor-pointer bg-transparent p-0 text-left text-lg text-ink font-semibold hover:underline"
          onClick={() => props.onSelect()}
          aria-pressed={props.selected ? "true" : "false"}
        >
          {props.project.category}
        </button>
      </h2>
      <p class="text-xs text-muted">{props.project.owner} · Project lead</p>
      <Progress value={props.project.percent} label={`${props.project.category} completion`} />
      <div class="flex items-center justify-between gap-3 text-xs text-muted">
        <span>
          {props.project.done} of {props.project.issues.length} issues complete
        </span>
        <strong>{props.project.percent}%</strong>
      </div>
      <div class="border-t border-line pt-3 text-xs text-muted">
        {props.project.issues.filter((t) => !t.done && t.priority === "high").length} high-priority
        open issues
      </div>
    </Card>
  );
}
