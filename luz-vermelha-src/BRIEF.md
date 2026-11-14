# Brief for widget builders (red light essay)

You build widgets and infographics for a single-file interactive essay in Brazilian Portuguese with an English toggle: "Terapia de luz vermelha funciona?". It is the third essay of a series, after dopamine (`como-resetar-a-dopamina.html`, source `dopamina-src/`) and cortisol (`como-baixar-o-cortisol.html`, source `cortisol-src/`), and uses the same architecture. Quality bar: Bartosz Ciechanowski, The Pudding, NYT graphics, state of the art for November 2026. House style: ink on white paper, Space Mono, risograph illustrations, precise and not gimmicky.

All paths below are relative to `/Users/renatoshira/Projects/renatoshira.github.io/`.

## Read first
- `terapia-de-luz-vermelha.md`: the approved script. Read "Direção de arte e movimento" and the spec block of each widget you own (`WIDGET lXX`): Título, Instrução, O que mostra (exact data), Leitura (the takeaway), Interação, Motion, Risograph, Celular/acessibilidade, Legenda. Implement to spec. Deeper data is in `luz-vermelha-pesquisa/*.md` and `luz-vermelha-pesquisa/dados/*.csv`. Use only those numbers. Anything marked [NV], [S] or `[CONFERIR]` is drawn as approximate (with "cerca de" / a dashed mark) or left out; never invent values.
- `luz-vermelha-src/shell.html`: the page. Each widget has `<div class="widget" id="lXX">` with `.wtag` (title and instruction), an empty `.wbody` and `.wcap` (caption). Render ONLY inside `#lXX .wbody`. Do not edit shell.html, en.js or glossary files (a text agent owns them in parallel). If a title, instruction or caption must change, put the exact PT and EN text in your report.
- `luz-vermelha-src/runtime.js`: the shared `DN` API (`DN.body`, `DN.L`, `DN.onLang`, `DN.fmt`, `DN.svg`, `DN.el`, `DN.onVisible`, `DN.fitCanvas`, `DN.RM`, `DN.store`, `DN.surprise`). Palette in `DN.COL`: `rubi` #ef2a6b (visible red light; marks and large text only), `rubiTxt` #c0185a (text in rubi), `infra` #5a1a4a ameixa (near infrared; in charts pair it with hatching or halftone, it sits close to ink), `rubiSoft`/`infraSoft`, `vinho` #54041f (overlap of both inks, for bone and shadow in illustrations), plus `ink`, `dim`, `mid` (the rest of the spectrum: UV, blue, green, far infrared, with labels), `line`. Neither ink means good or bad. On the evidence ladder the rung is shown by position and label, never green and red. Every series carries a direct label.
- Section 01 sits on a dark band (`.night-band`, background #0f1020). Inside it the CSS variables are redefined (`--ink:#f2f2f2`, `--dim`, `--line`, `--rubi:#ff6a95`); use `DN.COL.rubiNight` #ff6a95 and light ink for canvas there.
- Risograph technique: `dopamina-src/widgets/w00.js` and `w00.css`, and `cortisol-src/widgets/c01.js` and `companion.js` (`DN.cortRiso`). Seeded rng, one SVG layer per ink, halftone dot patterns, a grain filter that eats the edges, 1 to 3 px misregistration, multiply overlap. Use rubi and ameixa. Copy the helper code into your own file, with ids and classes prefixed by your widget id (there is no shared riso helper in this essay).
- Polished widgets with a takeaway line: `cortisol-src/widgets/c03.js`, `c05.js`, `c08.js`, `dopamina-src/widgets/w09c.js`.

## What you write
- `luz-vermelha-src/widgets/<id>.js` and optionally `<id>.css`. Never touch other agents' files.
- JS: one IIFE, `'use strict'`, no modules. Start with `var root = DN.body('l03'); if (!root) return;`.
- CSS: every selector prefixed with `#l03`.
- No libraries (matter-js 0.20.0 is on the page only if physics truly helps). SVG, Canvas 2D, CSS transitions, WAAPI, rAF.

## Rules (all approved by the author in the two earlier essays)
1. **Interaction only when it teaches**: a prediction before the reveal, a calculation with the reader's own device, exploring a distribution. Otherwise a rich static infographic with the data already drawn (side by side, small multiples, callouts, direct labels). No sliders that only move a dot, no clicks just to reveal data, no toggles for things that can sit side by side. One idea per widget, readable in 5 seconds.
2. **The takeaway goes inside the widget**: a bold "Leitura" line from the spec with a rubi left rule (like `w09c.js`). A reader who never touches the widget still gets the point. In a prediction widget, show it after the reveal and also in the static/reduced-motion state.
3. **Polish every detail**: no text over lines or marks, consistent baselines, nothing clipped, overlapping or crooked, in every state, in PT and EN (EN strings are longer), at 1280 and 375 px. Tabular numbers. Halos on labels that cross grid lines.
4. **Risograph for illustrations** (skin, tissue, faces, devices, eyes, people, the sun), with real proportions. Chart marks stay crisp. No cliché glowing faces in masks, no "powerhouse" mitochondria cartoons.
5. **Bilingual**: every string through `DN.L(pt, en)`; register `DN.onLang(render)`; numbers with `DN.fmt` (PT decimal comma).
6. **Writing** (also labels, callouts, takeaways): classic style, direct and concrete, name the thing and the effect; complete sentences linked by real connectives (porque, por isso, mas, enquanto), no staccato fragments, no metaphors that need decoding; no em or en dashes anywhere (use commas, "a" for ranges: "620 a 700 nm"); no "não é X, é Y" or "not X but Y".
7. **Static first**: complete and meaningful before any interaction. Reduced motion (`DN.RM`) shows the final state.
8. **Accessibility**: real buttons; range/number inputs with labels and `aria-valuetext`; `role="img"` and `aria-label` on SVG/canvas; a `.live` region for state changes; drag interactions need a keyboard/click alternative.
9. **Mobile**: works at 375 px with touch, never causes horizontal page overflow.
10. **Performance**: pause rAF off-screen; canvas for more than 500 marks.
11. **Storage**: `DN.store.get/set` (prefix rs_lv_). The l08 calculator stores the reader's device as key `device` = `{irr: mW/cm², name}`; l13 reads it. `DN.surprise('lXX')` when the reader's guess is clearly wrong (no visible companion in this essay; it is a no-op hook).

## Build and test (required)
1. `python3 luz-vermelha-src/build.py` (other agents build too; if the page fails because of another file, rerun after a moment and judge only your own errors).
2. `cd /private/tmp/claude-501/-Users-renatoshira-Projects-renatoshira-github-io/c1d0afef-07f3-4f7f-b138-3248effbc76d/scratchpad/pw && node check-lv.js ../shots-lv-<you> en l03 l04`: prints errors and saves desktop and mobile screenshots in PT and EN. Element screenshots of widgets taller than the viewport come out blank; for review write your own Playwright script with a tall viewport (pattern in `pw/q4lib-lv.js`, Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`, page `file:///Users/renatoshira/Projects/renatoshira.github.io/terapia-de-luz-vermelha.html`).
3. LOOK at every screenshot with the Read tool and iterate until each widget is genuinely good at both widths. Test every interaction with a script (click, drag, keyboard, typing).
4. Zero errors from your files. `grep -c '—\|–'` on your files must be 0.

## Report back (short)
Files written and what each widget does; deviations from spec and why; exact PT and EN text the lead must change in shell.html/en.js; paths to final screenshots.
