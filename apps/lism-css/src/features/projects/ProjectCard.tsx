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
    <Card as="article" class="l--stack -g:20" selected={props.selected}>
      <div class="l--cluster -jc:between -g:10 -fz:s -c:text-2">
        <Badge tone={props.project.percent === 100 ? "success" : "neutral"}>
          {props.project.percent === 100 ? "Complete" : "In progress"}
        </Badge>
        <span>Q4 / 2026</span>
      </div>
      <h2 class="-fz:l">
        <button
          class="set--plain -fw:600 -fz -c:text -ta:left"
          style={{ "--fz": "var(--projectTitleSize)" }}
          onClick={() => props.onSelect()}
          aria-pressed={props.selected ? "true" : "false"}
        >
          {props.project.category}
        </button>
      </h2>
      <p class="-fz:s -c:text-2">{props.project.owner} · Project lead</p>
      <Progress value={props.project.percent} label={`${props.project.category} completion`} />
      <div class="l--cluster -jc:between -g:10 -fz:s -c:text-2">
        <span>
          {props.project.done} of {props.project.issues.length} issues complete
        </span>
        <strong>{props.project.percent}%</strong>
      </div>
      <div class="-pt:15 -bd-bs -fz:s -c:text-2">
        {props.project.issues.filter((t) => !t.done && t.priority === "high").length} high-priority
        open issues
      </div>
    </Card>
  );
}
