import { Board } from "../features/issues/Board";
import { useWorkspace } from "../layouts/workspace-context";

export default function Issues() {
  const workspace = useWorkspace();
  return <Board library="UnoCSS" tracker={workspace.tracker} />;
}
