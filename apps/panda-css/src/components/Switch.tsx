import { createUniqueId, omit } from "solid-js";
import type { JSX } from "@solidjs/web";
import { css, sva } from "../../styled-system/css";
import type { StyleProps } from "./style-props";
const toggle = sva({
  slots: ["root", "label", "description", "control"],
  base: {
    root: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4" },
    label: { fontWeight: "medium" },
    description: { display: "block", color: "muted", fontSize: "xs" },
    control: {
      appearance: "none",
      flexShrink: "0",
      width: "34px",
      height: "20px",
      rounded: "full",
      bg: "progress",
      borderWidth: "1px",
      borderColor: "line",
      position: "relative",
      cursor: "pointer",
      _before: {
        content: '""',
        position: "absolute",
        width: "14px",
        height: "14px",
        rounded: "full",
        bg: "paper",
        top: "0.5",
        left: "0.5",
      },
      _checked: { bg: "brand", borderColor: "brand", _before: { transform: "translateX(14px)" } },
    },
  },
});
type Props = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type" | "role" | "children"> &
  StyleProps & {
    label: string;
    description: string;
  };
export function Switch(props: Props) {
  const id = createUniqueId();
  const classes = toggle();
  return (
    <label class={classes.root}>
      <span>
        <strong class={classes.label}>{props.label}</strong>
        <small class={classes.description} id={id}>
          {props.description}
        </small>
      </span>
      <input
        {...omit(props, "label", "description", "class", "css")}
        type="checkbox"
        role="switch"
        class={[css(toggle.raw().control, props.css), props.class]}
        aria-describedby={`${id} ${props["aria-describedby"] ?? ""}`}
      />
    </label>
  );
}
