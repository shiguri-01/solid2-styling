import type { ParentProps } from "solid-js";
import { main } from "../styles.css";

export default function UsersLayout(props: ParentProps) {
  return (
    <main class={main}>
      <h1>Users</h1>
      {props.children}
    </main>
  );
}
