import { Title } from "@solidjs/meta";
import { For } from "solid-js";
import users from "../../data/users.json";
import { paths } from "../../router";
import { contentLink, userList } from "../../styles.css";

export default function UsersIndex() {
  return (
    <section>
      <Title>Users - Solid App</Title>
      <ul class={userList}>
        <For each={Object.entries(users)}>
          {([id, user]) => (
            <li>
              <a class={contentLink} href={paths.users(Number(id))}>
                {user.name}
              </a>
            </li>
          )}
        </For>
      </ul>
    </section>
  );
}
