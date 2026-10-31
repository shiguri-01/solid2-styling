---
date: 2026-10-31
task: CSS Modules版と比較可能な大枠レイアウト・スクロール挙動へ統一
level: 通常（既存コード基準のレイアウト修正。画素再現ではない）
---

初期確認した資料: SKILL.md, property-class.md, property-class/all-props.md, property-class/hov.md, tokens.md, responsive.md, css-rules.md, naming.md, trait-class.md, trait-class/is--container.md, primitives/l--stack.md, l--flex.md, l--cluster.md, l--grid.md, l--columns.md, l--withSide.md, set-class.md, components-core.md, components-ui.md, base-styles.md, utility-class.md, antipatterns.md, antipatterns-layout.md, references/authoring.md。

## レイアウト比較条件の追加（2026-10-31）

ユーザー指示: 「サイドバーが固定されてなかったり」「大まかなレイアウトは一緒にしてください」。この指示を優先し、元のsize tokenを使った幅の大幅な変更を撤回する。親担当から220〜240pxのsidebarと300pxのproject detail、Issues/Reports/Settingsの列比を具体的な比較条件として指定・採用許可済み。これらを独自の直書き例外カテゴリにせず、ユーザー指定のレイアウト値としてProperty Classの変数に渡す。

| 判断     | 最終実装                                                                                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ✅ C1/C6 | 不等幅の決まった分割はGrid+gtc Property Classes。等幅cards/metricsはColumns。自動幅のWithSideによる意図しない縦積みを撤去                                     |
| ✅ C5    | 220px sidebar、300px detail、320px inspector最小幅は指定された比較用の採用値。padding32px相当は既定s35、section gap40px相当はs40を使用                        |
| ✅ C7/C8 | sticky/height/flex/overflow等もProperty Classesで指定。navのflexはmobile none、md 1、footerはmt:auto。sidebarはdesktop100dvh/mobile auto。独自CSSを増やさない |
| ✅ C0    | root containerの内側にshell Gridを置き、sidebarとmainの2列。skip linkはGrid外とし余分なGrid itemを作らない                                                    |

再確認資料: property-class.md、property-class/all-props.md、responsive.md、tokens.md、utility-class.md、antipatterns.md、antipatterns-layout.md、primitives/l--grid.md、l--columns.md、l--withSide.md、l--stack.md、l--flex.md、l--cluster.md、trait-class/is--container.md。新規採用のpos/h/fx/gtcのBPクラスとclipTextはインストール済みfull.cssで実在確認。

| 項目 | 判定・最終実装方針                                                                                                                                                                                                                                                    |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C0   | ✅ Solid 2 / Lism 1.1。Issues/Projects/Reports/Settingsと共有tracker。CSS Modules版は変更しない                                                                                                                                                                       |
| C1   | ✅ 縦積みStack、折返しCluster、等幅Columns、非等幅分割Grid。WithSideの自動折返しは比較条件を満たさないため外殻・画面分割から撤去。rootとmainをcontainerとする                                                                                                         |
| C2   | ✅新規 Button/Card/Badge/Progress/TextInput/Select/Switch/PageHeading/Empty。UIパッケージはReact/Astro専用なのでSolid用に同じHTML基盤で構成                                                                                                                           |
| C3   | ✅新規 共通基礎部品はb--button, b--card, b--badge, b--control, b--progress, b--switch。CSSで参照するページ部品はc--workspace/c--issueRow/c--issueTitle/c--feedback/c--skipLink/c--reportTable/c--reportMetrics。c--issueFilter/c--previewは名前だけの本体クラス       |
| C4   | ✅ 状態はdata-theme/data-density/data-selected/data-done/aria-pressed/aria-current。見た目variantは同じprefixのmodifier（button/card/badge）。nav/tabの選択装飾は完全なProperty Class文字列の分岐                                                                     |
| C5   | ✅前提 既定トークンを使用。space=5/10/15/20/25/30/35、fz=xs/s/m/l/2xl、radius=20/30/99、size=xs/s、semantic palette。darkはblack/whiteを参照しcolor-mixで中間面を作る。nav/tab文字はsemantic text色で両モードの可読性を保つ                                           |
| C6   | ✅ 外殻Gridはbase1列→md220px+1fr。sidebarはmd以降sticky/top0/100dvh、nav伸長・独立スクロール、footer底。Projectsはlg以降1fr+300px、Issuesはmd以降1.35fr+0.9fr、Reportsはmd以降2fr+1fr、Settingsはmd以降1fr+1.5fr。等幅cards/metricsはColumnsを維持。祖先containerあり |
| C7   | ✅ 単一装飾はProperty Class。CSS残留宣言は下表に全て対応。min-heightは-min-h + --min-h:100dvh                                                                                                                                                                         |
| C8   | ✅ Clusterのwrap/center、Stackのcolumn、Columnsのgrid等を重ねない。set--plainでbutton resetを再実装しない。既定disabled opacityは除去                                                                                                                                 |
| 例外 | ✅例外 「1px / -1px の罫線・視覚補正」: 部品border/focus outline。共通padding/gapは既定space token。比較に必要な列幅は下記のユーザー指示による採用値                                                                                                                  |

## CSSに残す宣言（C7）

| layer / selector                               | CSSに残す宣言と理由                                                                                                                                                  |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| lism-base / c--workspace                       | --rowSpaceとcolor-scheme。data-theme=darkでbase/base-2/text/text-2/dividerを既定black/whiteから再定義。data-density=compactで--rowSpaceのみ切替                      |
| lism-base / workspace descendant focus-visible | outline/outline-offset。入力・リンク等の共通フォーカス状態                                                                                                           |
| lism-base / workspace checkbox                 | accent-color。Property Class非対応                                                                                                                                   |
| lism-block / b--button                         | 共通部品のpadding/border/radius/background/color/font-size。primary modifierは背景・文字・border色。disabledはLism既定を利用                                         |
| lism-block / b--control                        | 共通form controlのmin/max inline size/padding/border/radius/background/color。aria-invalidでborder色                                                                 |
| lism-block / b--card                           | 共通cardのmin inline size/padding/border/radius/background。plain/roomy modifiersとdata-selectedによるborder切替                                                     |
| lism-block / b--badge                          | 共通badgeのdisplay/inline-size/padding/radius/background/color/font-size。success/warning/danger modifiersによる文字色                                               |
| lism-block / b--progress                       | 反復progress部品のblock-size（s10）。子の幅は-w + --w:動的百分率                                                                                                     |
| lism-block / b--switch                         | checkboxベースのswitch部品。accent-colorとflex-shrink                                                                                                                |
| lism-custom / c--issueRow[data-selected]       | 選択状態の背景色                                                                                                                                                     |
| lism-custom / c--issueTitle[data-done]         | 完了状態のtext-decoration                                                                                                                                            |
| lism-custom / c--feedback:empty                | 空のerror/statusを非表示                                                                                                                                             |
| lism-custom / c--skipLink:not(:focus), :focus  | 非focus時clip-path/absolute/pointer-events、focus時clip解除とfixed位置/サイズ/z-index/padding/background/color/white-space。u--srOnlyは併用せず同一layerで復帰を保証 |
| lism-custom / c--reportTable                   | Lism標準--cells-pに密度変数を渡す。font-variant-numeric:tabular-nums（Property Class非対応）                                                                         |
| lism-custom / c--reportMetrics                 | font-variant-numeric:tabular-nums（Property Class非対応）                                                                                                            |

その他のpadding/gap/color/layoutはマークアップのProperty Class。チェックリストとプレビューは-py + --py:var(--rowSpace)で密度に追従する。

資料確認ログ: 上記Lism資料は実装前確認。full.cssと既定configで採用クラス/変数を照合。再レビュー時にSolid diagnosticsのSILENT_HOLD節を確認し、navはlatest(page)を読んでlazy遷移の入力を即時反映。評価サブエージェントは親担当が手配する。

計画変更（意図的）: CSS Modulesの色・pxを引き写さず既定トークンへ。nav/tabに独自CSSは残さない。skipのu--srOnly併用を撤回し、同一layer内のfocus状態に統一。既定disabled opacityの重複を除去。

追加要件による計画更新: 比較可能性を優先し、CSS Modulesと同じ220pxのサイドバー、主要グリッド比率、共通パレットとバッジ装飾を採用。ユーザー指定のデザイン値をテーマトークンとして定義し、レイアウトは静的Property Classを維持する。

## 2026-10-31 部品同一性の再照合（値照合付き）

ユーザーの追加指示によりCSS Modulesと同じ形状・罫線・配置を採用。既存の具体値テーマ定義を継続し、曖昧な最寄り値変更はしない。初期資料: property-class/all-props, property-class, css-rules, naming, tokens, antipatterns, responsive, trait-class, primitives l--grid/l--stack/l--cluster, references/authoring/verification。

| 用途                             | デザイン値                           | 採用トークン                                      | 差分 | 判定   |
| -------------------------------- | ------------------------------------ | ------------------------------------------------- | ---- | ------ |
| 共有badge/card角丸               | 4/6px                                | 既存bdrs20/30                                     | 0    | ✅     |
| priority pill                    | 20px                                 | --priorityRadius                                  | 0    | ✅新規 |
| priority high/medium/low surface | 参照パレット                         | --dangerSurface/--warningSurface/--successSurface | 0    | ✅新規 |
| Tabs線幅                         | 2px                                  | --tabLine                                         | 0    | ✅新規 |
| Metrics角丸                      | 9px                                  | --metricRadius                                    | 0    | ✅新規 |
| サイズ/フォント                  | 34/27/32px,10/11/12/16/18/22/24/28px | 用途別workspace token                             | 0    | ✅新規 |

C0全4ページ/C1既存Primitiveを維持/C2共通badgeとpriority別block/C3 b--priority,b--tabは基礎部品、c--は子孫/状態/C4 active aria-pressed,C5上表,C6既存container,C7単体配置はProperty Classと変数、CSSはblock/状態/子孫,C8既定Primitiveを重複指定しない。

### 追加C7構成表

| 対象                   | Property Class                | CSSに残す                                       | 判定   |
| ---------------------- | ----------------------------- | ----------------------------------------------- | ------ |
| b--priority            | —                             | 共有基礎部品のベース、色modifier                | ✅新規 |
| b--tab                 | —                             | 共有基礎部品のベース、aria-pressed状態          | ✅新規 |
| b--issueTitle          | overflow/whitespace/alignment | text-overflow（未対応）、font inheritの基礎部品 | ✅新規 |
| c--issueMetrics        | columns/背景/外枠/角丸        | 子孫セルの余白/縦線/文字サイズ、BP状態          | ✅     |
| c--reportMetrics       | columns/上下線/外余白         | 子孫セル縦線/padding/数値margin                 | ✅     |
| c--reportTable         | width/nowrap/セルtextalign    | 子孫セル罫線/theadとtbodyのweight               | ✅     |
| c--preview             | border/radius/padding/font    | last-child罫線なし                              | ✅     |
| c--activity            | stack/gap                     | 子孫liのborder除去                              | ✅     |
| c--issueRow/c--navLink | grid/padding/hover            | 選択状態背景とhover変数                         | ✅     |
| c--issueCreate         | grid/gap/gtc/子inputのgc      | 狭幅時button全列と子要素min-size                | ✅     |

utility-class.md追加確認: u--clipTextはellipsisではなくbackground-clip:textなので撤去。-szはinline-sizeのみであることをfull.cssで確認し、正方形サイズには-hを併用。data-selectedは文字列true/falseに統一。Projects data-doneは親確認により参照と同じ線なしを維持。

b--controlのfont/line-heightは基礎control再利用規約で統一。b--tabのspan子孫はcountの10pxと4px gapをtoken参照してCSSに残す。

最終C7更新: c--preview子孫罫線はProperty Classとのlayer競合を避けCSSで一括適用/last-childだけ0。c--activityではliの罫線Property Classを除去。Cardは700px以下に既存s20=16pxを適用し参照と差分0。
