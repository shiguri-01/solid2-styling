import type { JSX } from "@solidjs/web";
export function PageHeading(props: { title: string; description: string; children?: JSX.Element }) {
  return (
    <header class="l--cluster -jc:between -g:20 -mb:30">
      <div class="l--stack -g:10">
        <p class="-fz:xs -c:text-2">DESIGN ENGINEERING / Q4</p>
        <h1 class="-fz:2xl">{props.title}</h1>
        <p class="-c:text-2">{props.description}</p>
      </div>
      <div>{props.children}</div>
    </header>
  );
}
