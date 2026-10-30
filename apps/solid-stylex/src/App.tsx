import { Title } from "@solidjs/meta";
import { Loading } from "solid-js";
import { Router } from "./router";
import "./stylex.css";

export default function App() {
  return (
    <Router>
      {(props) => (
        <>
          <Title>Solid 2.0 + StyleX Showcase</Title>
          <Loading fallback={<div>Loading…</div>}>{props.children}</Loading>
        </>
      )}
    </Router>
  );
}
