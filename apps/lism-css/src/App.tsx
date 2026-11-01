import { Title } from "@solidjs/meta";
import Workspace from "./layouts/Workspace";
import { WorkspaceProvider } from "./layouts/workspace-context";
import { Router } from "./router";

export default function App() {
  return (
    <Router>
      {(props) => (
        <>
          <Title>Solid 2.0 × Lism CSS — Workspace</Title>
          <WorkspaceProvider>
            <Workspace>{props.children}</Workspace>
          </WorkspaceProvider>
        </>
      )}
    </Router>
  );
}
