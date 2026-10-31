import { createUniqueId, omit } from "solid-js";
import { Dynamic, type JSX } from "@solidjs/web";
import { cx } from "zyzz";
import { style, variants, vars } from "../zyzz.config";

const styles = {
  control: style({
    minWidth: 0,
    maxWidth: "100%",
    minHeight: "40px",
    lineHeight: "20px",
    padding: "9px 12px",
    border: "1px solid",
    borderColor: vars.color.control,
    borderRadius: vars.radius.sm,
    backgroundColor: vars.color.surface,
    color: vars.color.text,
    font: "inherit",
    outlineColor: vars.color.brand,
    outlineOffset: "3px",
    ":disabled": { opacity: 0.55, cursor: "not-allowed" },
    '&[aria-invalid="true"]': { borderColor: vars.color.danger },
  }),
  button: variants({
    selection: "class",
    base: {
      cursor: "pointer",
      ":hover": { backgroundColor: vars.color.surfaceHover },
      ":disabled": { cursor: "not-allowed", opacity: 0.55 },
    },
    variants: {
      visual: {
        default: {},
        primary: {
          backgroundColor: vars.color.primary,
          borderColor: vars.color.primary,
          color: vars.color.primaryInk,
          ":hover": {
            backgroundColor: vars.color.primary,
            color: vars.color.primaryInk,
            opacity: 0.9,
          },
        },
      },
    },
    defaultVariants: { visual: "default" },
  }),
  card: variants({
    selection: "class",
    base: {
      minWidth: 0,
      padding: "20px",
      border: "1px solid",
      borderColor: vars.color.border,
      borderRadius: vars.radius.md,
      backgroundColor: vars.color.surface,
      display: "block",
      "@media (max-width:700px)": { padding: vars.space.lg },
    },
    variants: {
      visual: { outlined: {}, plain: { borderWidth: 0 } },
      spacing: {
        default: {},
        roomy: { padding: vars.space.xl, "@media (max-width:700px)": { padding: vars.space.lg } },
      },
      flow: {
        default: {},
        stack: { display: "flex", flexDirection: "column", gap: vars.space.lg },
        tight: { display: "flex", flexDirection: "column", gap: vars.space.md },
      },
      selected: {
        true: { borderColor: vars.color.brand, backgroundColor: vars.color.surfaceSelected },
        false: {},
      },
    },
    defaultVariants: { visual: "outlined", spacing: "default", flow: "default", selected: false },
  }),
  badge: variants({
    selection: "class",
    base: {
      display: "inline-flex",
      width: "fit-content",
      padding: "2px 8px",
      border: "1px solid",
      borderColor: vars.color.border,
      whiteSpace: "nowrap",
      borderRadius: vars.radius.sm,
      fontSize: "12px",
    },
    variants: {
      tone: {
        neutral: { color: vars.color.text },
        success: { backgroundColor: vars.color.successTint, color: vars.color.brand },
        warning: { backgroundColor: vars.color.warningTint, color: vars.color.warningInk },
      },
    },
    defaultVariants: { tone: "neutral" },
  }),
  empty: style({
    padding: "40px 20px",
    border: "1px dashed",
    borderColor: vars.color.border,
    color: vars.color.textMuted,
    textAlign: "center",
  }),
  heading: style({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: vars.space.lg,
    marginBottom: "28px",
  }),
  title: style({ fontSize: "26px", fontWeight: 600, margin: "4px 0", letterSpacing: "-.03em" }),
  kicker: style({
    fontSize: "12px",
    margin: 0,
    color: vars.color.textMuted,
  }),
  description: style({ color: vars.color.textMuted, margin: 0 }),
  progress: style({
    height: "6px",
    overflow: "hidden",
    borderRadius: vars.radius.full,
    backgroundColor: vars.color.border,
  }),
  fill: style((value: { width: `${number}%` }) => ({
    display: "block",
    height: "100%",
    width: value.width,
    backgroundColor: vars.color.brand,
  })),
  switchRow: style({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: vars.space.lg,
  }),
  switchLabel: style({ display: "block", fontWeight: 500 }),
  switchDescription: style({
    display: "block",
    marginTop: vars.space.xs,
    fontSize: "12px",
    color: vars.color.textMuted,
  }),
  field: style({ width: "100%" }),
  select: style({
    width: "100%",
    appearance: "none",
    paddingRight: "36px",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'%3E%3Cpath d='m4.5 6.25 3.5 3.5 3.5-3.5' stroke='%237c8880' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    backgroundSize: "16px 16px",
  }),
  switchInput: style({
    appearance: "none",
    boxSizing: "border-box",
    margin: 0,
    padding: "2px",
    border: "1px solid",
    borderColor: vars.color.textMuted,
    borderRadius: vars.radius.full,
    backgroundColor: vars.color.surface,
    "::before": {
      content: '""',
      display: "block",
      width: "14px",
      height: "14px",
      borderRadius: vars.radius.full,
      backgroundColor: vars.color.textMuted,
    },
    ":checked": { backgroundColor: vars.color.brand, borderColor: vars.color.brand },
    "&:checked::before": { transform: "translateX(14px)", backgroundColor: vars.color.bg },
    width: "34px",
    height: "20px",
    flexShrink: 0,
    accentColor: vars.color.brand,
    cursor: "pointer",
    outlineColor: vars.color.brand,
    outlineOffset: "3px",
  }),
};
export type ButtonProps = Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "class"> & {
  class?: string;
  variant?: "default" | "primary";
};
export function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      {...omit(props, "variant", "class")}
      {...cx(
        styles.control(),
        styles.button({ visual: props.variant ?? "default", className: props.class }),
      )}
    />
  );
}
type CardElementProps =
  | (Omit<JSX.HTMLAttributes<HTMLElement>, "class"> & {
      class?: string;
      as?: "div" | "article" | "aside" | "section";
    })
  | (Omit<JSX.FormHTMLAttributes<HTMLFormElement>, "class"> & { class?: string; as: "form" });
type CardProps = CardElementProps & {
  variant?: "outlined" | "plain";
  spacing?: "default" | "roomy";
  selected?: boolean;
  flow?: "default" | "tight" | "stack";
};
export function Card(props: CardProps) {
  return (
    <Dynamic
      component={props.as ?? "div"}
      {...omit(props, "as", "variant", "spacing", "selected", "flow", "class")}
      {...styles.card({
        visual: props.variant ?? "outlined",
        spacing: props.spacing ?? "default",
        selected: !!props.selected,
        flow: props.flow ?? "default",
        className: props.class,
      })}
    />
  );
}
export function Badge(props: { children: JSX.Element; tone?: "neutral" | "success" | "warning" }) {
  return <span {...styles.badge({ tone: props.tone ?? "neutral" })}>{props.children}</span>;
}
export function TextInput(
  props: Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "class"> & { class?: string },
) {
  return (
    <input
      {...omit(props, "class")}
      {...cx(styles.control(), styles.field({ className: props.class }))}
    />
  );
}
export function Select(
  props: Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, "class"> & { class?: string },
) {
  return (
    <select
      {...omit(props, "class")}
      {...cx(styles.control(), styles.select({ className: props.class }))}
    />
  );
}
export function Empty(props: { children: JSX.Element }) {
  return <p {...styles.empty()}>{props.children}</p>;
}
export function PageHeading(props: { title: string; description: string; children?: JSX.Element }) {
  return (
    <header {...styles.heading()}>
      <div>
        <p {...styles.kicker()}>Design engineering / Q4</p>
        <h1 {...styles.title()}>{props.title}</h1>
        <p {...styles.description()}>{props.description}</p>
      </div>
      <div>{props.children}</div>
    </header>
  );
}
export function Progress(props: { value: number; label: string }) {
  return (
    <div
      {...styles.progress()}
      role="progressbar"
      aria-label={props.label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={props.value}
    >
      <span {...styles.fill({ width: `${props.value}%` })} />
    </div>
  );
}
type SwitchProps = Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "type" | "role" | "children" | "class"
> & { label: string; description: string };
export function Switch(props: SwitchProps) {
  const id = createUniqueId();
  return (
    <label {...styles.switchRow()}>
      <span>
        <strong {...styles.switchLabel()}>{props.label}</strong>
        <small id={id} {...styles.switchDescription()}>
          {props.description}
        </small>
      </span>
      <input
        {...omit(props, "label", "description")}
        {...styles.switchInput()}
        type="checkbox"
        role="switch"
        aria-describedby={`${id} ${props["aria-describedby"] ?? ""}`}
      />
    </label>
  );
}
