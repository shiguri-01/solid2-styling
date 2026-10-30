import { Title } from "@solidjs/meta";
import * as stylex from "@stylexjs/stylex";
import { Loading } from "solid-js";
import { paths, Router } from "./router";
import { appStyles } from "./styles";
import "./stylex.css";

export default function App() {
  return (
    <Router>
      {(props) => (
        <>
          <Title>Solid App (StyleX)</Title>
          <nav class={stylex.attrs(appStyles.nav).class}>
            <a class={stylex.attrs(appStyles.navLink).class} href={paths()}>
              Home
            </a>
            <a class={stylex.attrs(appStyles.navLink).class} href={paths.users()}>
              Users
            </a>
          </nav>
          <Loading fallback={<main class={stylex.attrs(appStyles.main).class}>Loading…</main>}>
            {props.children}
          </Loading>
        </>
      )}
    </Router>
  );
}
