# Styling comparison layout

CSS Modules is the layout reference. Library-specific APIs, colors, decoration,
and modest breakpoint differences are allowed; changing the page composition is not.

## Shared structure

- Desktop: a roughly 220px sidebar and a flexible main column, with roughly 32px
  main padding. The sidebar stays at the top during document scrolling, occupies
  one viewport height, and can scroll independently. Navigation takes the spare
  height; the workspace identity and theme footer do not shrink. The theme footer
  remains at the bottom.
- Narrow screens: the sidebar returns to normal document flow, the navigation
  wraps horizontally, and the theme footer uses a compact horizontal layout.
  Page content must not force horizontal document overflow.
- Issues: header, four metrics, then issue list and inspector at approximately
  1.5:1. The board shares the main column's width without a second page wrapper
  adding padding or a full viewport's minimum height. Narrow layouts stack.
- Projects: toolbar, two equal card columns plus a roughly 300px detail panel.
  The detail panel stacks below the cards when the layout no longer fits.
- Reports: four metrics, a 2:1 completion/priority split, then a full-width team
  table. Narrow layouts use two metrics per row and stack the panels.
- Settings: each section has description and form at 1:1.5, with about 40px
  between them. Narrow layouts stack; form controls remain usable.

Reference sources: `apps/css-modules/src/workspace.module.css`,
`styles.module.css`, and `pages/{projects,reports,settings}.module.css`.

## Browser verification

Measure at the same 1440 × 900 viewport, including a real document scroll on
Settings. Compare sidebar width/height/top, footer position, main padding and
the major grid columns. Also inspect the four pages and a 390px viewport.

The reference's 1440px viewport has a 1425px content width: sidebar 220 × 900px,
main starts at x=220 with 32px padding. After scrolling the document by 248px,
sidebar top remains 0. Settings columns measure approximately 440/660px;
Projects measure approximately 817/300px, with 400/400px card columns.

Verified in Chrome at 1440 × 900 and 390 × 844:

- All eight apps use a 220px desktop sidebar, 32px main padding and a
  viewport-height sticky sidebar with a footer at the bottom.
- Settings retain the description/form split; Projects use two card columns
  plus a detail panel. At 390px Projects stack without document overflow.
- Yak, vanilla-extract and Zyzz Reports use the 2:1 panel split. Their Issues
  layouts stack without document overflow at 390px.
- Actual document scrolling verified the sticky position in Tailwind, UnoCSS,
  Panda, Lism, Yak, vanilla-extract and Zyzz.

## Shared visual contract

The library controls how styles are expressed, while the reference controls
the design: the same neutral/green palette in both themes, bordered status
badges with success/warning tints, primary button contrast, selected card
background/border, 6px progress bars and compact capsule switches. Issues
metrics contain the same information; the extra KPI badges in three apps
were removed. Utility classes, Panda recipes/tokens, Lism property classes,
Yak styled components, StyleX objects, vanilla-extract styles and Zyzz tokens
remain native to their respective implementations.

Validation: `vp run ready` completed all 28 tasks successfully. The final
vanilla-extract mobile metric adjustment also passed lint, build and browser
verification (two metric columns at 390px).
