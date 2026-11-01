import { createContext, createSignal, useContext, type ParentProps } from "solid-js";
import { createIssueTracker } from "utils";

function createWorkspace() {
  const tracker = createIssueTracker();
  const [compact, setCompact] = createSignal(false);
  const [name, setName] = createSignal("Solid / Design engineering");
  return { tracker, compact, setCompact, name, setName };
}

const WorkspaceContext = createContext<ReturnType<typeof createWorkspace>>();

export function WorkspaceProvider(props: ParentProps) {
  const workspace = createWorkspace();
  return <WorkspaceContext value={workspace}>{props.children}</WorkspaceContext>;
}

export function useWorkspace() {
  const workspace = useContext(WorkspaceContext);
  if (!workspace) throw new Error("WorkspaceProvider is required");
  return workspace;
}
