import { useWorkspace } from "../layouts/workspace-context";
import { Board } from "../features/issues/Board";
export default function Issues() {
  const workspace = useWorkspace();
  return <Board library="Panda CSS" tracker={workspace.tracker} />;
}
