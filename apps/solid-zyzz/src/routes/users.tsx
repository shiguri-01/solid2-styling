import type { ParentProps } from "solid-js";
import { main } from "../styles";

export default function UsersLayout(props: ParentProps) {
  return (
    <main class={main().class}>
      <h1>Users</h1>
      {props.children}
    </main>
  );
}
