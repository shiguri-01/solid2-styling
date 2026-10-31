import type { JSX } from "@solidjs/web";
import s from "./PageHeading.module.css";
export function PageHeading(props: { title: string; description: string; children?: JSX.Element }) {
  return (
    <header class={s.heading}>
      <div>
        <p class={s.kicker}>Design engineering / Q4</p>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
      </div>
      <div>{props.children}</div>
    </header>
  );
}
