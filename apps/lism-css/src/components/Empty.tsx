import type { JSX } from "@solidjs/web";
export function Empty(props: { children: JSX.Element }) {
  return <p class="-ta:center -py:40 -px:25 -bd -bds:dashed -c:text-2">{props.children}</p>;
}
