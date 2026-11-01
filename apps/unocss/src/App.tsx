import { Title } from "@solidjs/meta";
import { Loading } from "solid-js";
import { Router } from "./router";

export default function App() {
  return (
    <Router>
      {(props) => (
        <>
          <Title>Solid 2.0 × UnoCSS — Workspace</Title>
          <Loading fallback={<div>Loading…</div>}>{props.children}</Loading>
        </>
      )}
    </Router>
  );
}
