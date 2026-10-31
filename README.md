# Solid 2.0 Styling Library Comparison

A Vite+ monorepo comparing nine styling approaches in **Solid 2.0** (`solid-js@^2.0.0-rc.20` + `@solidjs/vite-plugin@^3.0.0-next.53`).

Each app implements an issue board using the data and state logic in [`packages/utils`](packages/utils/): search, category and status filters, creation, deletion, selection, priority changes, completion, and theme switching.

The comparison covers how each library expresses the same product requirements: authoring and composing styles, representing state, defining themes, handling responsive layouts, and producing CSS. Library defaults and opinions—such as Lism's harmonic scales, half-leading, and layout primitives—are part of the comparison. Typography, spacing, colors, and layout behavior can therefore differ between implementations.

## Implementation Comparison

| Library                                  | Authoring and composition                                                                                               | UI states and dynamic values                                                                                        | Themes and tokens                                                                                                                                                                      | Responsive styling                                                                                                           | CSS output                                                                                                      |
| :--------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| [vanilla-extract](apps/vanilla-extract/) | TypeScript objects in `.css.ts` files. `style()` composes declarations; `styleVariants()` defines named alternatives.   | Components choose classes for completion, priority, and button tone.                                                | `createThemeContract()` and light/dark `createTheme()` classes define the shared palette. One-off values remain CSS declarations.                                                      | Media and container queries are written in style objects.                                                                    | The Vite plugin extracts CSS into assets associated with importing modules.                                     |
| [StyleX](apps/stylex/)                   | `stylex.create()` defines typed style objects. Solid binds `stylex.attrs(...).class`.                                   | Conditional style objects compose base and state styles through `stylex.attrs()`.                                   | `tokens.stylex.ts` defines variables; `stylex.createTheme()` supplies alternate theme values.                                                                                          | Media conditions and pseudo-classes are expressed in style objects.                                                          | The Vite plugin extracts atomic rules into ordered cascade layers.                                              |
| [Zyzz](apps/zyzz/)                       | `style()` defines styles; `variants()` defines recipes. `output: "html"` provides Solid-compatible `.class` values.     | Recipes select tone and size variants from current state. `selection: "class"` supplies class-based variants.       | `zyzz.config.ts` defines native light/dark token pairs. Mapped token domains require tokens or the explicit `!custom` escape hatch.                                                    | Media conditions, nested selectors, and container properties are expressed in style objects.                                 | The Vite integration emits theme variables and compiled atomic CSS across shared and route assets.              |
| [Panda CSS](apps/panda-css/)             | Generated `css()` helpers consume TypeScript style objects; `cva()` defines recipes.                                    | Recipes select priority and filter variants; other state changes select named classes.                              | `panda.config.ts` extends the theme with project colors. One-off values can be written in style objects.                                                                               | Responsive conditions, media queries, and nested selectors are expressed in style objects.                                   | Codegen and the Vite integration emit static CSS.                                                               |
| [Tailwind CSS](apps/tailwind/)           | Utility classes are written directly on elements; arbitrary values express one-off declarations.                        | Solid composes class strings and selects priority/tone classes.                                                     | `@theme` defines named colors; the `dark:` variant handles theme-dependent styles.                                                                                                     | Responsive prefixes and arbitrary variants are written in utility strings.                                                   | The Vite plugin scans source classes and emits matching utilities.                                              |
| [UnoCSS](apps/unocss/)                   | Utility classes are written directly on elements. A separate reset supplies base styles.                                | Solid composes class strings and selects priority/tone utilities.                                                   | `uno.config.ts` extends the Wind3 theme with project colors.                                                                                                                           | Preset responsive variants and arbitrary selectors are written in utility strings.                                           | The Vite integration generates utilities on demand; the reset remains regular CSS.                              |
| [CSS Modules](apps/css-modules/)         | Semantic selectors are written in `.module.css`; Solid binds imported local class names.                                | Components select local classes for active, selected, completed, priority, and dark states.                         | CSS custom properties define the palette; a root class overrides dark values.                                                                                                          | Standard media queries and selectors are written in CSS.                                                                     | Vite scopes class names and emits ordinary CSS.                                                                 |
| [yak](apps/yak/)                         | `styled` defines components; `styled(Button)` extends components and `css` composes reusable styles.                    | Transient props select extracted state rules. `$percent` becomes a reactive CSS variable.                           | `yak.context.ts` defines the typed theme; `YakThemeProvider` supplies reactive theme values consumed by styled interpolations.                                                         | Native nested selectors and media queries are written in template literals.                                                  | `yak()` runs before `solid()` and extracts CSS. The Solid runtime handles reactive class and variable bindings. |
| [Lism CSS](apps/lism-css/)               | Intrinsic Solid elements use layout primitives and Property Classes. Component-specific rules use `@layer lism-custom`. | Complete class strings select palette colors and states. The progress bar's `-sz` class reads signal-driven `--sz`. | Native semantic colors, palette, harmonic typography/spacing, radii, and half-leading are retained. `lism.config.js` customizes the brand; a root class supplies dark semantic colors. | Container-based class/variable pairs control metric columns. `l--withSide` wraps the inspector according to available space. | The official Vite plugin generates configured `full.css` and purges unused production selectors.                |

## Run the Comparison

```sh
vp install
vp check
vp run -r test
vp run -r build
```

Start the apps you want to compare:

| App             | Command                      | URL                                 |
| :-------------- | :--------------------------- | :---------------------------------- |
| vanilla-extract | `vp run vanilla-extract#dev` | <http://vanilla-extract.localhost/> |
| StyleX          | `vp run stylex#dev`          | <http://stylex.localhost/>          |
| Zyzz            | `vp run zyzz#dev`            | <http://zyzz.localhost/>            |
| Panda CSS       | `vp run panda-css#dev`       | <http://panda-css.localhost/>       |
| Tailwind CSS    | `vp run tailwind#dev`        | <http://tailwind.localhost/>        |
| UnoCSS          | `vp run unocss#dev`          | <http://unocss.localhost/>          |
| CSS Modules     | `vp run css-modules#dev`     | <http://css-modules.localhost/>     |
| yak             | `vp run yak#dev`             | <http://yak.localhost/>             |
| Lism CSS        | `vp run lism-css#dev`        | <http://lism-css.localhost/>        |

Use the same issue and interactions in each app. Compare the corresponding source for:

- A priority badge and its variants.
- Active filters, selected rows, and completed issues.
- Light/dark theme definitions and bindings.
- The signal-driven progress bar.
- Layout changes at narrow widths.
- A reusable component, a shared token, and a one-off value.

## Production CSS

CSS totals below include all emitted client CSS assets, including resets and theme definitions. Gzip totals sum the separately compressed assets. Sizes are in bytes and depend on the source, dependency versions, and build configuration.

| Library         | Client asset directory                     | CSS files | Raw bytes | Gzip bytes |
| :-------------- | :----------------------------------------- | --------: | --------: | ---------: |
| vanilla-extract | `apps/vanilla-extract/dist/client/assets/` |         2 |    13,610 |      3,338 |
| StyleX          | `apps/stylex/dist/client/assets/`          |         1 |    14,570 |      3,954 |
| Zyzz            | `apps/zyzz/dist/client/assets/`            |         3 |    24,420 |      6,012 |
| Panda CSS       | `apps/panda-css/dist/assets/`              |         1 |    29,666 |      8,716 |
| Tailwind CSS    | `apps/tailwind/dist/assets/`               |         1 |    17,620 |      4,719 |
| UnoCSS          | `apps/unocss/dist/assets/`                 |         1 |    10,685 |      3,124 |
| CSS Modules     | `apps/css-modules/dist/assets/`            |         1 |     7,695 |      2,234 |
| yak             | `apps/yak/dist/assets/`                    |         1 |     6,632 |      1,917 |
| Lism CSS        | `apps/lism-css/dist/assets/`               |         1 |    12,089 |      3,815 |

These totals describe the implementations in this repository. They are not a library performance ranking: the apps retain different defaults, emit different declarations, and use different rendering configurations. CSS size also excludes JavaScript runtime cost. For a complete bundle comparison, inspect the emitted JavaScript and initial HTML alongside CSS.

vanilla-extract, StyleX, and Zyzz use Solid's turnkey/prerender configuration and emit `dist/client/` plus `dist/server/`. The other apps use an `index.html` client entry and emit `dist/`. Account for that difference when comparing initial stylesheet loading, route splitting, or hydration.

## Integration Details

### Solid bindings and state lifetime

Bind class strings to Solid's `class` attribute. StyleX uses `stylex.attrs(...).class`; Zyzz uses `output: "html"` and the returned `.class`. This preserves their styling APIs while giving Solid targeted bindings.

Create an issue tracker once within the owning component and pass that instance to the board. Reactive reads belong in JSX or tracked computations. Static style definitions stay outside reactive expressions; state-dependent variants and values remain reactive.

### Library-specific configuration

- **vanilla-extract:** `.css.ts` imports determine where extracted styles enter the module graph. Route-owned CSS can be split from entry CSS.
- **StyleX:** shared variable definitions live in `.stylex.ts` files. In turnkey mode, `Document.tsx` includes development virtual CSS/runtime tags because there is no `index.html` transform. `src/stylex.css` provides the production CSS asset used by the plugin.
- **Zyzz:** token-domain validation and native light/dark pairs remain enabled. `selection: "class"` selects the library's class-based recipe API.
- **Panda CSS:** codegen supplies the `css()` and recipe helpers used by the board.
- **Tailwind CSS:** `@theme` and the configured dark variant define the utility vocabulary and theme behavior.
- **UnoCSS:** the Wind3 preset and project theme drive utility generation; the app explicitly imports its reset.
- **CSS Modules:** module scoping and ordinary CSS custom properties provide isolation and theming without a separate styling runtime.
- **yak:** the Vite plugin precedes `solid()` so extraction sees original source. The Solid integration targets Solid 2 and is experimental.
- **Lism CSS:** the app uses the HTML/CSS API directly in Solid; packaged React components are not imported. Default scales and layout behavior remain active. `lismCss({ purge: { report: true } })` removes unused production CSS. Conditional classes are complete string literals so purge can discover every state; dynamically assembled classes require a safelist. The plugin's generic CSR warning can also match the `apps/lism-css/src/` path, so verify conditional styles in the production preview.

### Reactivity diagnostics

The configured component tests use `@solidjs/diagnostics` to check reactive behavior. A text-only signal update and a text-plus-class update have different scope counts; `expectRerunBudget` should reflect the bindings an interaction actually changes. Run tests through `vp run -r test` so each package uses its Solid-aware test configuration.
