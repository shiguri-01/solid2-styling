import { createUniqueId, omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import s from "./Switch.module.css";
type SwitchProps = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "role" | "children"> & {
  label: string;
  description: string;
};
export function Switch(props: SwitchProps) {
  const id = createUniqueId();
  const rest = omit(props, "label", "description", "class");
  return (
    <label class={s.row}>
      <span>
        <strong>{props.label}</strong>
        <small id={id}>{props.description}</small>
      </span>
      <input
        {...rest}
        type="checkbox"
        role="switch"
        class={[s.control, props.class]}
        aria-describedby={`${id} ${props["aria-describedby"] ?? ""}`}
      />
    </label>
  );
}
