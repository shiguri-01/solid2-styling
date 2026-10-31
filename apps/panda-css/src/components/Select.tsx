import { omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import { field } from "./fields";
import { css } from "../../styled-system/css";
const select = css({
  appearance: "none",
  paddingRight: "36px",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='m4.5 6.25 3.5 3.5 3.5-3.5' stroke='%237c8880' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  backgroundSize: "16px 16px",
});
export function Select(props: JSX.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...omit(props, "class")} class={[field, select, props.class]} />;
}
