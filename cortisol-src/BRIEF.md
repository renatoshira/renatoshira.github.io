# Brief for widget builders (cortisol essay)

You build interactive widgets and infographics for a published, single-file interactive essay in Brazilian Portuguese with an English toggle: "Como baixar o cortisol (e se você deveria)". It is the sequel to the dopamine essay (`/Users/renatoshira/Projects/renatoshira.github.io/como-resetar-a-dopamina.html`, source in `dopamina-src/`), and uses the same architecture. Quality bar: Bartosz Ciechanowski, The Pudding and NYT graphics, state of the art for November 2026. House style: ink on white paper, Space Mono, risograph illustrations, precise and not gimmicky.

## Read first
- `/Users/renatoshira/Projects/renatoshira.github.io/como-baixar-o-cortisol.md`: the approved script. Read "Direção de arte e movimento" and the spec block of each widget you own (`WIDGET cXX`). Each block gives Título, Instrução, O que mostra (exact data), Leitura (the takeaway), Interação, Motion, Risograph, Celular/acessibilidade and Legenda. Implement to spec. Deeper data is in `cortisol-pesquisa/*.md` and `cortisol-pesquisa/dados/*.csv`. Use only those numbers. Anything marked [NV] or `[CONFERIR]` must be drawn as approximate or left out; never invent values.
- `cortisol-src/shell.html`: the page. Each widget has a container `<div class="widget" id="cXX">` with `.wtag` (title and instruction), an empty `.wbody` and `.wcap` (caption). Render ONLY inside `#cXX .wbody`. Do not edit shell.html or en.js. If text there must change, put the exact PT and EN text in your report.
- `cortisol-src/runtime.js`: the shared `DN` API. It is the same as the dopamine essay's, with the cortisol palette: `DN.COL.alta` (vermilion #e8553e, more cortisol, morning), `DN.COL.altaTxt` (#b63b28, for text in vermilion), `DN.COL.baixa` (teal #0e7a7c, less cortisol, night), `DN.COL.plana` (grey, a flat curve), with `altaSoft`/`baixaSoft`, plus ink, dim, mid and line. The aliases `dopa` and `pausa` point to the same two colors. Neither color means "bad"; a healthy curve needs both.
- `dopamina-src/widgets/w00.js` and `w00.css`: the risograph technique. It uses seeded rng, one SVG layer per ink, halftone dot patterns, a grain filter that eats edges, 1 to 3 px misregistration and multiply overlap. Use vermilion and teal here instead of amber and indigo. Copy the helper code into your own file, with ids and classes prefixed by your widget id.
- For examples of polished widgets with a takeaway line, see `dopamina-src/widgets/w09c.js`, `w11c.js` and `w08.js`.

## What you write
- `cortisol-src/widgets/<id>.js` and optionally `<id>.css`. Never touch other agents' files.
- JS: one IIFE, `'use strict'`, no modules. Start with `var root = DN.body('c03'); if (!root) return;`.
- CSS: every selector prefixed with `#c03` (or your unique class).
- Libraries: none, except the global `Matter` (matter-js 0.20.0 is loaded on the page) if physics truly helps. Use SVG (`DN.svg`), Canvas 2D (`DN.fitCanvas`), CSS transitions, WAAPI and rAF.

## Rules (all approved by the author during the dopamine essay review)
1. **Interaction only when it teaches.** Good reasons: a prediction before the reveal, a felt experience, something accumulating over time, or exploring a distribution. Otherwise build a rich static infographic with the data already drawn (side by side, small multiples, callouts, direct labels). No sliders that only move a dot, no clicks just to reveal data, no toggles for things that can sit side by side. One idea per widget, readable in 5 seconds.
2. **The takeaway goes inside the widget.** Add a bold "Leitura" line from the spec, styled like `dopamina-src/widgets/w09c.js` (an amber left rule there; use the vermilion `--alta` here). A reader who never touches the widget still gets the point.
3. **Polish every detail.** No text on top of lines or marks. Keep baselines consistent, with nothing clipped, overlapping or crooked, in every state, in PT and EN (EN strings are longer), at 1280 and 375 px. Use tabular numbers. Put labels on halos when they cross grid lines.
4. **Risograph for illustrations** (bodies, organs, people, objects, icons in the spec), with proportions that look real. Chart marks stay crisp.
5. **Bilingual:** every string goes through `DN.L(pt, en)`; register `DN.onLang(render)`; format numbers with `DN.fmt`.
6. **Writing:**
   - classic style, direct and concrete: name the thing and the effect, no abstract phrasing like "a curva que acompanha a saúde";
   - complete sentences;
   - no em or en dashes anywhere;
   - no "não é X, é Y" or "not X but Y".
7. **Static first:** the widget is complete and meaningful before any interaction. Reduced motion (`DN.RM`) shows the final state.
8. **Accessibility:** real buttons; range inputs with `aria-valuetext`; `role="img"` and `aria-label` on SVG and canvas; a `.live` region for state changes.
9. **Mobile:** works at 375 px with touch and never causes horizontal page overflow.
10. **Performance:** pause rAF off-screen; use canvas for more than 500 marks.
11. **Companion and storage:** `DN.surprise('cXX')` when the reader's guess is clearly wrong; `DN.store.get/set` for persistence (keys in the spec, e.g. the c02a drawing reused by c09).

## Build and test (required)
1. `python3 /Users/renatoshira/Projects/renatoshira.github.io/cortisol-src/build.py`
2. `cd /private/tmp/claude-501/-Users-renatoshira-Projects-renatoshira-github-io/c1d0afef-07f3-4f7f-b138-3248effbc76d/scratchpad/pw && node check-cort.js ../shots-cort-<name> en c03 c09`. It prints errors and saves desktop and mobile screenshots in PT and EN.
   - Known artifact: element screenshots of widgets taller than the viewport come out blank.
   - For review, write your own Playwright script with a tall viewport. Use the pattern in `pw/q4lib.js`: grow the viewport, then clip.
3. LOOK at every screenshot with the Read tool and iterate until each widget is genuinely good at both widths. Test every interaction with a script.
4. You must have zero errors from your own files.

## Report back (short)
- The files you wrote and what each widget does.
- Any deviation from the spec, and why.
- Any exact PT and EN text the lead must change in shell.html or en.js.
- The paths to your final screenshots.
