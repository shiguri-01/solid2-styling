# Component parity checklist

CSS Modules is the visual source of truth. Library idioms change the style
implementation, not the element order, borders, alignment or shape.

## Issues

- Header: 34px rounded-square S mark; plain Sprint 14 text; normal theme button.
- Metrics: one bordered group, radius 9px, four cells with internal dividers.
- Panel heading: title and description on the left; plain issue count on right.
- Search/category toolbar, then a separate status navigation, then create form.
- Status navigation: transparent, square tabs with a bottom rule; active brand
  underline. No segmented background, pill or raised active button.
- Category cells are plain text. Priority pills have radius 20px and no dot.
- Table headings and cells align left; final heading is empty.
- Inspector status and assignee are plain text. Acceptance criteria are plain
  rows with a leading check/circle and a small, unboxed status on the right.
- Footer only says how many sprint issues are shown; no extra hint.

## Projects

- Project count aligns to the toolbar's right edge on desktop.
- Status badges: radius 4px, 1px border, 2px 8px padding. Success/warning have
  an 8% tinted background; neutral has no background.
- Cards: radius 6px, 1px border; selected card has brand border and selected
  background. Card title and owner text have no default margins.
- Card risk has a top divider. Detail checklist has bottom dividers.

## Reports

- Metrics have top/bottom borders and internal vertical dividers.
- Priority rows have bottom dividers and rectangular shared badges.
- Workload table: first column left; all numerical columns right; bottom rules.

## Settings

- General/Members use square transparent tabs, 2px bottom underline; selected
  ink color. Whole tab bar has a 1px bottom rule.
- Sections have bottom rules; description/form split has 40px gap.
- Members are divider-separated rows, without surrounding cards. Avatar 32px;
  role label/select align horizontally at the right.
- Preview has a border; internal rows have rules except the last row.

## Common

- Sidebar links and normal controls: radius 4px. Cards: radius 6px.
- Shared Badge is distinct from Issues priority pill: never globally flatten
  both shapes into the same style.
- Normal controls are at least 40px high. Disabled opacity 0.55.
- Preserve these conventions in light/dark, selected/inactive and compact modes.

## Parent browser review

Tailwind and UnoCSS: all four pages inspected at 1440px and 390px. Verified
0px tab radius, transparent tab backgrounds, 2px active underline, plain
category/status/assignee, 20px priority pill, 4px bordered project badge,
project count at the right, report metric dividers, right-aligned numeric
columns and plain member rows with roles on the right. No document overflow
at 390px. The review caught Tailwind active-tab utility conflicts and UnoCSS
priority background conflicts; both were fixed and rechecked in the browser.

Panda, Lism, StyleX and vanilla-extract: reviewed the same four pages at
1440px and 390px. Verified actual computed borders, radii, tab selection,
report dividers/alignment and member-role placement. All 16 narrow page
checks had document width equal to viewport width. Additional review caught
Panda detail-heading/delete styling, Lism invisible titles and missing shape
heights/selected state, and StyleX box-sizing/accent-color; fixes were applied.

Yak: all four desktop pages checked. The Members fallback initially had no
extracted styles; moving its styles to module-level styled components restored
32px circular avatars, dividers, horizontal role labels and auto-width selects.
The browser confirmed the roles at the right and 86px selects after the fix.
All four Yak pages also passed the 390px document-width check, and Members
retained visible avatars, divider rows and usable role selects.
Panda's dark success tint initially referenced the light color; explicit theme
conditions fixed it, and the browser confirmed the dark-brand 8% tint.

Zyzz: all four pages reviewed at 1440px and 390px. The AOT compiler rejected
runtime objects passed to cx and imported object-member composition; styles
now use the official className option and local static applications. Final
fresh-server checks verified tab switching, navigation and theme switching,
700-weight Issues headings, the selected row's 2px brand line, right-aligned
project count, 4px bordered badges, report metric dividers/numeric alignment,
and member-role placement. No document overflow at 390px.

Final validation: `vp run ready` succeeded with all 28 tasks. `git diff --check`
also passed. CSS Modules and the excluded website app were not edited.
