import { Title } from "@solidjs/meta";
import * as stylex from "@stylexjs/stylex";
import { For } from "solid-js";
import users from "../../data/users.json";
import { paths } from "../../router";
import { appStyles } from "../../styles";

export default function UsersIndex() {
  return (
    <section>
      <Title>Users - Solid App</Title>
      <ul class={stylex.attrs(appStyles.userList).class}>
        <For each={Object.entries(users)}>
          {([id, user]) => (
            <li>
              <a class={stylex.attrs(appStyles.contentLink).class} href={paths.users(Number(id))}>
                {user.name}
              </a>
            </li>
          )}
        </For>
      </ul>
    </section>
  );
}
