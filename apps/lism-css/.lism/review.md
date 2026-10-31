---
date: 2026-10-31
task: CSS Modulesと同じ部品形状・罫線・配置への再修正
level: 値照合付き
reviewer: precise_lism_audit（実装担当から独立、ソース編集なし）
---

今回の最終ソースに対するルール照合結果: 未解消の違反0件。
既存のテーマ具体値とユーザー指定の比較条件を優先し、最寄りトークンへの
丸めで別デザインへ戻さないことを前提にした評価。

## 照合資料

- lism-css-guide/SKILL.md（最小ゲート、判定記号、提出前チェック）
- antipatterns.md、antipatterns-layout.md（全TOC項目）
- property-class.md、tokens.md、references/verification.md
- apps/lism-css/.lism/plan.md の今回の値差分表・追加C7構成表
- インストール済み lism-css 1.1.0 の full.css と最終purge後CSS
- CSS ModulesのBoard・共通部品・各ページ、およびdocs/component-parity.md

## 指摘と解消

| file          | 指摘                                                   | 最終判定                                                 |
| ------------- | ------------------------------------------------------ | -------------------------------------------------------- |
| Board.tsx     | Boolean data-selected/data-doneと文字列属性CSSの不一致 | 明示的true/false文字列へ修正済み                         |
| Board.tsx     | 全avatarに同じinline --cを渡すとtone色を上書き         | tone別のsemantic変数参照へ修正済み                       |
| .lism/plan.md | 追加block・子孫/状態CSSのC7対応記録不足                | 追加C7構成表と最終追記で対応済み                         |
| Board.tsx     | u--clipTextはellipsisではなく文字を透明にするutility   | 撤去し、b--issueTitleのtext-overflowへ置換済み           |
| Board.tsx     | -szはinline-sizeのみで正方形にならない                 | -hを併用しmark/avatarの高さを保証                        |
| style.css     | preview最終罫線・activity罫線のProperty Class競合      | previewを子孫CSSで統一、activityの不要border classを撤去 |

## 最小ゲートと実装構成

構造はStack/Cluster/Flex/Grid/Columnsの静的Primitive Classを使用し、BP値には
is--container祖先がある。SolidではReact/Astro用UIを直接使わず、基礎部品を
b--button/card/badge/control/switch/progress/tab/priorityとして再利用している。
独自CSSはlism-base/block/custom内、命名はcamelCaseと同prefix Modifier。
状態はARIA/data属性、Property Classは完全な静的文字列で記述されている。
メディア枠・全面リンク・Wrapper・exProps関連のアンチパターンは該当なし。

共有Badgeの4px枠付き形状と、Issues priorityの20px枠なしpillを分離。
タブは透明・角丸0・2px下線、カテゴリー/status/assignee/criteriaはplain。
Reportsの内部縦線・数値右揃え、Settingsの右寄せRoleとpreview最終線なしを
ソースで確認。Cardは700px以下16pxpaddingへ調整済み。

## 生成物・検証

実装担当の最終 `vp run lint` は警告/エラー0、`vp run build` 成功。
独立担当は最終生成物 `dist/assets/index-bb99ebe5.css`（17,694 bytes）を読み、
b--tab/priority/issueTitle、c--issueMetrics/reportMetrics/preview、
-h/-sz/-gc/-gtc_sm/-ov-y:auto/-whs:nowrap/-ta:right/-msの出力を確認した。
全TSXのProperty Class候補もfull.cssと照合し、無効クラスを検出しなかった。

描画の最終確認は親担当が行う。本評価はソース・プラン・生成CSSの独立照合であり、
ビルド成功だけを視覚的同一性の証明として扱わない。
