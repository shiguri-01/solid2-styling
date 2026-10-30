# Solid 2.0 Zero-Runtime Styling Comparison

A Vite+ monorepo comparing three zero-runtime, type-safe CSS-in-TS styling libraries in **Solid 2.0** (`solid-js@^2.0.0-rc.20` + `@solidjs/vite-plugin@^3.0.0-next.53`):

- **`apps/solid-vanilla-extract`** — [vanilla-extract](https://vanilla-extract.style/) (`@vanilla-extract/css` + `@vanilla-extract/vite-plugin`) on port `3001`
- **`apps/solid-stylex`** — [StyleX](https://stylexjs.com/) (`@stylexjs/stylex` + `@stylexjs/unplugin`) on port `3002`
- **`apps/solid-zyzz`** — [Zyzz](https://zyzz.style/) (`zyzz` + `zyzz/vite`) on port `3003`

Each app implements the same interactive single-page **Design System & Task Management Dashboard** (Light/Dark theming, KPI progress cards, filterable task board, multi-axis button variant playground, and a `@solidjs/diagnostics`-verified counter) without relying on hand-written `.css` rules.

---

## Quick Start

```bash
# Install dependencies
vp install

# Format, lint, and type-check all packages
vp check

# Run unit & reactivity diagnostics tests across all apps
vp run -r test

# Build all apps (client + SSR prerendered shell)
vp run -r build

# Start individual dev servers
vp run solid-vanilla-extract#dev   # http://localhost:3001/
vp run solid-stylex#dev            # http://localhost:3002/
vp run solid-zyzz#dev              # http://localhost:3003/
```

---

## At-a-Glance Comparison

| Feature                   | vanilla-extract                           | StyleX (`@stylexjs/unplugin`)                                                       | Zyzz (`zyzz`)                                                                                         |
| :------------------------ | :---------------------------------------- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| **Authoring Location**    | Separate `*.css.ts` files                 | Co-located or separate (`*.stylex.ts` for vars)                                     | Co-located or separate (`zyzz.config.ts` for config)                                                  |
| **Vite Plugin**           | `vanillaExtractPlugin()`                  | `stylex.vite({ useCSSLayers: true })`                                               | `zyzz({ reset: true })`                                                                               |
| **Solid JSX Binding**     | `class={buttonVariants.idle}`             | `class={stylex.attrs(styles.btn).class}`                                            | `class={button({ tone }).class}` (`output: "html"`)                                                   |
| **Theme Mechanism**       | `createThemeContract()` + `createTheme()` | `stylex.defineVars()` + `stylex.createTheme()`                                      | `defineConfig({ vars })` with `{ light, dark }` pairs                                                 |
| **Variants / Recipes**    | `styleVariants()`                         | Conditional args in `stylex.attrs(base, cond && active)`                            | Built-in multi-axis `variants({ selection: "class" })`                                                |
| **Token Enforcement**     | Opt-in via theme contract references      | Opt-in via `defineVars` + longhand property rules                                   | **Strict**: raw values on token-mapped properties fail at compile time unless suffixed with `!custom` |
| **Global Styles / Reset** | `globalStyle("body", ...)` in `*.css.ts`  | Intentional no-global-selector design; style `<body class={...}>` in `Document.tsx` | Built-in `zyzz({ reset: true })` (`@layer reset`) + `<body class={...}>`                              |

---

## Integration Tips & Solid 2.0 Best Practices

### 1. Bind `class={...}` Directly — Avoid JSX Object Spreads (`{...props}`)

Many React-oriented styling libraries return an object intended for JSX spreading (e.g., `{ className, style }`).

- **Why it matters in Solid 2.0**: Passing `{...stylex.attrs(...)}` or `{...zyzzStyle()}` creates a dynamic spread effect over the entire DOM element instead of a targeted attribute binding, and React-default helpers return `className` instead of `class`.
- **How to bind cleanly in Solid 2.0**:
  - **vanilla-extract**: Returns plain class strings out of the box (`class={card}`).
  - **StyleX**: Use `stylex.attrs(...).class` instead of `stylex.props(...)`:
    ```tsx
    <button class={stylex.attrs(styles.button, isActive() && styles.buttonActive).class} />
    ```
  - **Zyzz**: Configure `output: "html"` in `zyzz.config.ts` so callable styles return `{ class: string, style?: string }` instead of React's `{ className }`, then bind `.class`:
    ```ts
    // src/zyzz.config.ts
    export const { style, variants, vars } = defineConfig({
      output: "html",
      vars: {/* ... */},
    });
    ```
    ```tsx
    <button class={actionButton({ tone: selectedTone(), size: selectedSize() }).class} />
    ```

### 2. Understanding `@solidjs/diagnostics` & `expectRerunBudget`

Solid 2.0's test suite includes `@solidjs/diagnostics` (`captureArtifact`, `expectNoDiagnostics`, `expectRerunBudget`), which tracks exact reactive scope re-runs per interaction:

- If a signal (such as `count()`) only updates button text (`Clicks: {count()}`), clicking the button re-runs **1** reactive scope (`button.children`).
- If `count()` also drives a dynamic variant class on the button (`count() > 0 ? "active" : "idle"`), Solid runs **2** fine-grained scopes on click (`button.children` + `button.class`).
- Keep static styles outside reactive expressions so only truly dynamic variant switches allocate a reactive effect.

### 3. Library-Specific Setup Gotchas in Solid 2.0

#### StyleX (`@stylexjs/unplugin`) with Solid 2.0 Turnkey Mode (`Document.tsx`)

Solid 2.0's turnkey mode (`solid({ start: true })`) renders `src/Document.tsx` instead of using a static `index.html`. This has two implications for `@stylexjs/unplugin`:

1. **Dev Server Virtual CSS & HMR**: Because Vite's `transformIndexHtml` hook does not run without an `index.html`, `@stylexjs/unplugin` cannot auto-inject its dev virtual tags. Add them guarded by `import.meta.env.DEV` inside `src/Document.tsx`:
   ```tsx
   {
     import.meta.env.DEV && (
       <>
         <link rel="stylesheet" href="/virtual:stylex.css" />
         <script type="module" src="/@id/virtual:stylex:runtime" />
       </>
     );
   }
   ```
2. **Production Build CSS Injection Target**: During `vp build`, `@stylexjs/unplugin` appends collected StyleX rules to an existing CSS asset in the Rollup bundle. Import a minimal 1-line `src/stylex.css` (`@layer priority1;`) in `src/App.tsx` so the bundler always emits a target CSS asset.
3. **Token File Naming**: `stylex.defineVars()` must live in a file ending with `.stylex.ts` (e.g., `src/tokens.stylex.ts`) for the StyleX Babel transform to process exported variable contracts across modules.

#### Zyzz (`zyzz`) Strict Token Validation & Variant Selection

1. **Strict Token Domain Checks**: Once `vars.color` or `vars.radius` is configured in `zyzz.config.ts`, Zyzz's compiler rejects raw color/radius literals (like `"#ffffff"` or `"transparent"`) on mapped CSS properties. Define all palette values (including `white`, `transparent`, and semantic colors) in `zyzz.config.ts`, or append `" !custom"` when an one-off escape hatch is intentionally needed.
2. **Native Light/Dark Token Pairs**: Zyzz lets you declare `{ light: "#fff7ed", dark: "#140c06" }` directly inside `vars`. Calling `vars({ colorScheme: isDark() ? "dark" : "light" }).class` on a root wrapper toggles the CSS `color-scheme` property and flips all `light-dark()` tokens in that subtree automatically.
3. **`selection: "class"` on `variants()`**: By default, `variants()` uses `data-*` attributes for variant selection. Setting `selection: "class"` in `variants({ selection: "class", ... })` emits pure class names so you only need `class={recipe({ ... }).class}` without spreading `data-*` attributes onto the element.

---

## Compiled CSS Output Analysis

Running `vp run -r build` compiles all three apps into static assets under `dist/client/assets/`. Here is how their generated CSS and chunking strategies compare:

### 1. Asset Structure & Bundle Sizes

| App / Library       | Emitted CSS Assets (`dist/client/assets/`)                                                                       | Size (Raw / Gzip)                                                                                                                   | Chunking & Bundling Strategy                                                                                                                                                         |
| :------------------ | :--------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **vanilla-extract** | `styles-BlyaTDeQ.css`<br>`index-BODdRLnB.css`                                                                    | 6.50 kB / 1.53 kB<br>0.91 kB / 0.41 kB<br>**Total: 7.41 kB / 1.94 kB**                                                              | **Per-Module Code Splitting**: Each `.css.ts` module is paired with its importing JS chunk (`styles.css.ts` and `Counter.css.ts`) and loaded on demand.                              |
| **StyleX**          | `virtual_solid-ssr-entry-client-MOybfDYq.css`                                                                    | **7.63 kB / 2.28 kB**                                                                                                               | **Single Consolidated Atomic Bundle**: Deduplicates all atomic rules across the entire app and emits a single stylesheet ordered by `@layer priority1..N`.                           |
| **Zyzz**            | `virtual_solid-ssr-entry-client-BTEgAkGt.css` _(reset + theme)_<br>`styles-C9E8FPxF.css`<br>`index-DJJy1OUO.css` | 4.36 kB / 1.58 kB<br>8.96 kB / 1.88 kB<br>1.44 kB / 0.59 kB<br>**Total: 14.76 kB / 4.05 kB**<br>_(Excl. reset: 10.40 kB / 2.47 kB)_ | **Hybrid Shared Layer + Per-Chunk Atomic CSS**: Emits `@layer reset` and root theme variables in the entry stylesheet, while splitting component atomic rules by route/module chunk. |

### 2. What the Generated CSS Looks Like

#### A. vanilla-extract — Scoped Semantic Classes & Theme Variable Blocks

`createTheme` compiles into scoped theme classes (`._1ckokehl` for light, `._1ckokehm` for dark) that assign hashed custom properties, while `style()` emits standard grouped CSS declarations per component:

```css
@keyframes _1ckokehn {
  0%,
  to {
    opacity: 1;
  }
  50% {
    opacity: 0.45;
  }
}

/* Light Theme Scope */
._1ckokehl {
  --_1ckokeh0: #f1f5f9;
  --_1ckokeh1: #fff; /* ... */
}
/* Dark Theme Scope */
._1ckokehm {
  --_1ckokeh0: #090d16;
  --_1ckokeh1: #111827; /* ... */
}

/* Component Rule */
._1ckokeho {
  background-color: var(--_1ckokeh0);
  color: var(--_1ckokeh5);
  min-height: 100vh;
  padding: 2rem 1.5rem 4rem;
  transition:
    background-color 0.2s,
    color 0.2s;
}
```

#### B. StyleX — `@layer` Priority Atomic CSS

StyleX compiles every declaration into a single-purpose atomic class and groups them into numbered cascade layers (`@layer priority2` through `@layer priority5`) based on property shorthand specificity. This guarantees that the last style passed to `stylex.attrs()` always wins regardless of CSS declaration order:

```css
@layer priority2 {
  .x1ghz6dp {
    margin: 0;
  }
  .xomzojh {
    padding: 1.25rem;
  }
}
@layer priority3 {
  .xrywa9j {
    border-color: var(--xr8ueh7);
  }
  .x6i6fhv {
    border-radius: 0.375rem;
  }
}
@layer priority4 {
  .x1aerksh {
    animation-name: x1wc8ddo-B;
  }
  .x114er4c:focus-visible {
    outline-color: #0284c7;
  }
}
```

#### C. Zyzz — Modern `light-dark()` Variables & Zero-Specificity `&:where()` Variants

Zyzz generates atomic classes backed by CSS custom properties with native CSS `light-dark()` fallbacks, and compiles `variants({ selection: "class" })` choices using nested `&:where(...)` selectors so variant modifiers never inflate selector specificity:

```css
/* { light, dark } token pairs compile to CSS Variables + light-dark() fallbacks */
.z_JbcWgH3 {
  background-color: var(--z-color-bg, light-dark(#fff7ed, #140c06));
}
.z_JbcWgH4 {
  color: var(--z-color-text, light-dark(#431407, #fff7ed));
}

/* Variant modifiers use &:where() to keep specificity flat */
.z_0iwsGgs {
  &:where(.zv43JlU7Dg0) {
    background-color: var(--z-color-brand, light-dark(#ea580c, #f97316));
  }
}
```

### 3. Prerendered `<head>` Behavior (`dist/client/index.html`)

- **StyleX & Zyzz**: Because `Document.tsx` applies `body` styles (and Zyzz injects its global reset), the prerendered `dist/client/index.html` automatically includes `<link rel="stylesheet" href="/assets/virtual_solid-ssr-entry-client-*.css">` in `<head>` and attaches the initial classes onto `<body>`.
- **vanilla-extract**: Because `styles.css.ts` is imported inside `src/routes/index.tsx` rather than `src/Document.tsx` or `src/App.tsx`, Vite splits `styles-BlyaTDeQ.css` into the route chunk. If you want the stylesheet statically linked in the initial `<head>` before route hydration, import `styles.css.ts` in `src/App.tsx` or `src/Document.tsx`.
