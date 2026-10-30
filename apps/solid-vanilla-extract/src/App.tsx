import { Title } from "@solidjs/meta";
import { Loading } from "solid-js";
import { paths, Router } from "./router";
import { main, nav, navLink } from "./styles.css";

export default function App() {
  return (
    <Router>
      {(props) => (
        <>
          <Title>Solid App (vanilla-extract)</Title>
          <nav class={nav}>
            <a class={navLink} href={paths()}>
              Home
            </a>
            <a class={navLink} href={paths.users()}>
              Users
            </a>
          </nav>
          <Loading fallback={<main class={main}>Loading…</main>}>{props.children}</Loading>
        </>
      )}
    </Router>
  );
}
