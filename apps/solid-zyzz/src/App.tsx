import { Title } from "@solidjs/meta";
import { Loading } from "solid-js";
import { paths, Router } from "./router";
import { main, nav, navLink } from "./styles";

export default function App() {
  return (
    <Router>
      {(props) => (
        <>
          <Title>Solid App (Zyzz)</Title>
          <nav class={nav().class}>
            <a class={navLink().class} href={paths()}>
              Home
            </a>
            <a class={navLink().class} href={paths.users()}>
              Users
            </a>
          </nav>
          <Loading fallback={<main class={main().class}>Loading…</main>}>{props.children}</Loading>
        </>
      )}
    </Router>
  );
}
