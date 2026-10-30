import * as stylex from "@stylexjs/stylex";
import type { ParentProps } from "solid-js";
import { appStyles } from "../styles";

export default function UsersLayout(props: ParentProps) {
  return (
    <main class={stylex.attrs(appStyles.main).class}>
      <h1>Users</h1>
      {props.children}
    </main>
  );
}
