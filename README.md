# Styling Libraries in Solid 2.0

A side-by-side comparison of **nine styling approaches in Solid 2.0**, implemented against the same issue tracker app in [`apps/`](apps/).

## Overview

| Library                                      | Authoring                            | Variant API                  | Token Enforcement                    | Lint Plugin                                                                                | Agent Skills                                                    |
| :------------------------------------------- | :----------------------------------- | :--------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| **[CSS Modules](apps/css-modules/)**         | `.module.css`                        | — (plain CSS)                | Optional (`var(--*)`)                | —                                                                                          | —                                                               |
| **[Tailwind CSS](apps/tailwind/)**           | Utility classes                      | — (utility composition)      | Utility scale + arbitrary `[...]`    | —                                                                                          | —                                                               |
| **[UnoCSS](apps/unocss/)**                   | Utility classes + `shortcuts`        | — (utility composition)      | Utility scale + arbitrary `[...]`    | [ESLint](https://unocss.dev/integrations/eslint)                                           | —                                                               |
| **[Lism CSS](apps/lism-css/)**               | Layout primitives & property classes | — (modifier classes)         | Harmonic scales + custom CSS         | —                                                                                          | [Skills](https://github.com/lism-css/lism-css/tree/main/skills) |
| **[vanilla-extract](apps/vanilla-extract/)** | TS objects in `.css.ts`              | `styleVariants()`            | Typed contract + free CSS            | —                                                                                          | —                                                               |
| **[Panda CSS](apps/panda-css/)**             | `css()` TS objects                   | `cva()` recipes              | Typed tokens + free CSS              | [ESLint / Oxlint](https://github.com/chakra-ui/panda/tree/main/packages/eslint-plugin)     | [Skills](https://github.com/chakra-ui/panda/tree/main/skills)   |
| **[StyleX](apps/stylex/)**                   | `stylex.create()` TS objects         | `stylex.attrs()` composition | Typed vars + free CSS                | [ESLint](https://stylexjs.com/docs/api/configuration/eslint-plugin/)                       | —                                                               |
| **[Zyzz](apps/zyzz/)**                       | `style()` TS objects                 | `variants()` recipes         | Strict (requires token or `!custom`) | —                                                                                          | —                                                               |
| **[yak](apps/yak/)**                         | `styled` / `css` templates           | `$` transient props          | Standard CSS custom properties       | [ESLint / Oxlint](https://github.com/galaxuslabs/yak/tree/main/packages/yak-eslint-plugin) | —                                                               |

---

## Libraries

### [CSS Modules](apps/css-modules/)

Standard CSS scoped per file by Vite, with zero external styling libraries. You write ordinary CSS rules—using native nesting, container queries, and custom properties—while Vite hashes class names locally so styles never leak across components.

### [Tailwind CSS](apps/tailwind/)

CSS-first utility styling powered by Tailwind v4 (`@tailwindcss/vite`). Design tokens are declared directly in CSS via `@theme`, and components are styled by composing utility classes in JSX—reaching for arbitrary value syntax only when stepping outside the scale.

### [UnoCSS](apps/unocss/)

A customizable on-demand utility engine configured in TypeScript (`uno.config.ts`). Alongside standard utilities via `presetWind3()`, it lets you group recurring utility combinations into named `shortcuts` to keep JSX templates concise.

### [Lism CSS](apps/lism-css/)

An opinionated CSS architecture built around layout primitives (`l--*`), component blocks (`b--*`), and single-purpose Property Classes (`-prop:value`). Rather than treating every spacing or font size as an arbitrary value, Lism provides built-in harmonic scales, half-leading typography, and container-aware layouts out of the box.

In Solid, you use Lism's HTML/CSS class API directly on elements instead of its React component package. Because `@lism-css/plugin/vite` statically purges unused selectors in production, conditional classes should be written as complete string literals.

### [vanilla-extract](apps/vanilla-extract/)

Type-safe static stylesheets written in `.css.ts` files. It separates style authoring from component code while keeping full TypeScript autocomplete across theme contracts (`createThemeContract()`) and variants (`styleVariants()`), emitting module-scoped CSS chunks.

### [Panda CSS](apps/panda-css/)

Codegen-driven atomic CSS that generates a project-specific `styled-system` from `panda.config.ts`. It pairs inline `css()` style objects for layout with `cva()` recipes for multi-variant components, backed by semantic tokens that adapt to conditions like `_dark`.

### [StyleX](apps/stylex/)

A compiler-driven atomic CSS system designed for predictable style composition. Styles are co-located in component files with `stylex.create()`, disallowing selector reach-out and resolving overrides deterministically—the last style passed always wins—via atomic rules and CSS cascade layers.

In Solid, bind styles with `{...stylex.attrs(...)}` or `stylex.attrs(...).class` (since `stylex.props()` outputs `className`).

### [Zyzz](apps/zyzz/)

An atomic TypeScript styling system with strict design-token governance. It provides `style()` and `variants()` recipes while enforcing token boundaries by default: properties mapped to token domains require a defined token unless you explicitly opt out with the `!custom` escape hatch. Theme tokens are declared as native `{ light, dark }` pairs in `zyzz.config.ts`.

To integrate with Solid, set `output: "html"` in `defineConfig()` so Zyzz returns `{ class: string }` objects that spread directly onto Solid elements.

### [yak](apps/yak/)

Zero-runtime CSS-in-JS that preserves the classic `styled.div` and tagged-template authoring model. Styles and conditional blocks driven by `$`-prefixed transient props are extracted into static CSS at build time, while dynamic interpolations compile into reactive CSS variables.

Solid 2 support is provided by `@yak/solid`. In `vite.config.ts`, `yak()` must be placed **before** `solid()` so template literals are extracted before Solid compiles JSX.

---

## Production CSS Output

All client CSS emitted by `vp run -r build` for the sample issue tracker (which covers multi-route navigation, filtering, dynamic progress values, priority variants, and light/dark themes):

| Library             | Bundling Strategy                                | CSS Files | Raw Bytes | Gzip Bytes |
| :------------------ | :----------------------------------------------- | --------: | --------: | ---------: |
| **CSS Modules**     | Per-route & per-component CSS chunks             |        11 |    20,115 |      7,234 |
| **Tailwind CSS**    | Single v4 utility + `@theme` stylesheet          |         1 |    30,986 |      7,270 |
| **UnoCSS**          | Single on-demand utility bundle + reset          |         1 |    17,504 |      5,220 |
| **Lism CSS**        | Single purged architecture + property stylesheet |         1 |    17,714 |      5,269 |
| **vanilla-extract** | Route- and module-split static CSS chunks        |         5 |    17,867 |      5,251 |
| **Panda CSS**       | Single static codegen + recipe stylesheet        |         1 |    42,608 |     11,007 |
| **StyleX**          | Single atomic stylesheet with cascade layers     |         1 |    17,412 |      4,569 |
| **Zyzz**            | Shared + route-split atomic CSS & theme tokens   |         3 |    51,219 |      8,759 |
| **yak**             | Route-split extracted CSS-in-JS chunks           |         5 |    19,306 |      5,609 |

> [!NOTE]
> Gzip sizes are summed across emitted files. Totals include each library's baseline reset, token definitions, and design defaults.

---

## Running the Apps

```sh
vp install
vp check
vp run -r lint
vp run -r test
vp run -r build
```

Start any implementation locally:

| App                 | Command                      | Local URL                           |
| :------------------ | :--------------------------- | :---------------------------------- |
| **CSS Modules**     | `vp run css-modules#dev`     | <http://css-modules.localhost/>     |
| **Tailwind CSS**    | `vp run tailwind#dev`        | <http://tailwind.localhost/>        |
| **UnoCSS**          | `vp run unocss#dev`          | <http://unocss.localhost/>          |
| **Lism CSS**        | `vp run lism-css#dev`        | <http://lism-css.localhost/>        |
| **vanilla-extract** | `vp run vanilla-extract#dev` | <http://vanilla-extract.localhost/> |
| **Panda CSS**       | `vp run panda-css#dev`       | <http://panda-css.localhost/>       |
| **StyleX**          | `vp run stylex#dev`          | <http://stylex.localhost/>          |
| **Zyzz**            | `vp run zyzz#dev`            | <http://zyzz.localhost/>            |
| **yak**             | `vp run yak#dev`             | <http://yak.localhost/>             |
