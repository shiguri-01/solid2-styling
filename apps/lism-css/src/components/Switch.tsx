import { createUniqueId, omit } from "solid-js";
import type { JSX } from "@solidjs/web";
type SwitchProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "role" | "children"> & {
  label: string;
  description: string;
};
export function Switch(props: SwitchProps) {
  const id = createUniqueId();
  const rest = omit(props, "label", "description", "class");
  return (
    <label class="l--flex -ai:center -jc:between -g:20">
      <span class="l--stack -g:5">
        <strong>{props.label}</strong>
        <small id={id} class="-c:text-2">
          {props.description}
        </small>
      </span>
      <input
        {...rest}
        type="checkbox"
        role="switch"
        class={["b--switch", props.class]}
        aria-describedby={`${id} ${props["aria-describedby"] ?? ""}`}
      />
    </label>
  );
}
