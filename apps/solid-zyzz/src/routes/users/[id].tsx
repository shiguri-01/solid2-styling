import { Title } from "@solidjs/meta";
import { query, type RouteDefinition, type RouteProps } from "@solidjs/router";
import { createMemo, isPending } from "solid-js";
import users from "../../data/users.json";
import { paths } from "../../router";
import { contentLink, userSection } from "../../styles";

const getUser = query(async (id: string) => {
  return (
    users[id as keyof typeof users] ?? {
      name: "Unknown",
      title: "No such user",
    }
  );
}, "user");

export const route = {
  preload: ({ params }) => void getUser(params.id!),
} satisfies RouteDefinition;

export default function User(props: RouteProps<"/users/:id">) {
  const user = createMemo(() => getUser(props.params.id));

  return (
    <section class={userSection({ pending: isPending(user) }).class}>
      <Title>{`User ${props.params.id} - Solid App`}</Title>
      <h2>{user().name}</h2>
      <p>{user().title}</p>
      <p>
        <a class={contentLink().class} href={paths.users(Number(props.params.id) + 1)}>
          Next user
        </a>
      </p>
    </section>
  );
}
