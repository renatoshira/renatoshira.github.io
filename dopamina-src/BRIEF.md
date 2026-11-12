# Brief for widget builders (dopamine essay)

You are building interactive widgets for a published, single-file interactive essay in Brazilian Portuguese (with English toggle): "Como resetar seu sistema de dopamina". Quality bar: Bartosz Ciechanowski / The Pudding / NYT graphics, state of the art for November 2026. Impressive, precise, elegant, house-style minimalism (ink on white paper, Space Mono, one amber/indigo accent family). Not gimmicky.

## Files you must read first
- `/Users/renatoshira/Projects/renatoshira.github.io/como-resetar-a-dopamina.md`: the full script. The "Direção de arte e movimento" section applies to everything. Each widget has a detailed spec block (`WIDGET NN · slug`) with Tipo, O que mostra, Trabalho cognitivo, Estado inicial, Interação, Motion, Celular/acessibilidade. Implement YOUR widgets to that spec. Data numbers are in the spec; deeper data in `dopamina-pesquisa/*.md` if you need it (e.g. `ciencia-factcheck.md` section A2 has digitized time-series tables).
- `dopamina-src/shell.html`: the page. Each widget already has a container `<div class="widget" id="wXX">` with a `.wtag`, an empty `.wbody` and a `.wcap`. You render ONLY inside `#wXX .wbody`. Do not edit shell.html (tell the lead if something there must change).
- `dopamina-src/runtime.js`: the shared `DN` API. Use it.

## What you write
- `dopamina-src/widgets/<id>.js` per widget (e.g. `w04a.js`), optionally `dopamina-src/widgets/<id>.css`. Never touch other agents' files.
- JS: one IIFE, `'use strict'`, ES2020 OK, no modules, no build step. Start with `var root = DN.body('w04a'); if (!root) return;`.
- CSS: every selector prefixed with `#w04a` (or your own unique class). Do not restyle global elements. Shared classes you may use: `.btn`, `.btn.on`, `.rowbtns`, `.rowbtns.mt`, `.ctrlrow`, `.live`, `.glabel`, `.cvwrap`, `table.t`, `details.more`.
- Colors: use `DN.COL` (ink, dim, mid, line, dopa amber, pausa indigo, `DN.COL.sub.<name>` fixed per substance/reward: comida, sexo, musica, cafe, nicotina, cocaina, anfetamina, morfina, metilfenidato, levodopa, apostas, video, meditacao, dinheiro, placebo, cigarro). In CSS use `var(--dopa)`, `var(--pausa)`, `var(--ink)` etc.
- Libraries: none, except global `Matter` (matter-js 0.20.0 is already loaded on the page) and, only for w02b, Three.js 0.186.1 via dynamic `import('https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.min.js')` with a Canvas 2D fallback. No GSAP. Use SVG (via `DN.svg`), Canvas 2D (`DN.fitCanvas`), CSS transitions, Web Animations API, `requestAnimationFrame`, CSS scroll-driven animations with feature detection.

## Rules
1. **Bilingual.** Every visible string in PT and EN via `DN.L(pt, en)`. Register `DN.onLang(render)` (or a smaller relabel function) so switching language rerenders labels without losing state. Numbers via `DN.fmt(n, decimals)` (decimal comma in PT).
2. **Writing style for any text you write (labels, live messages, card text):** classic style, short complete sentences, no em dash or en dash characters anywhere (not in PT, not in EN, not in comments shown to users), no "não é X, é Y" / "not X but Y" constructions, no hype words. Use the wording already in the spec when it exists.
3. **Static first.** The widget must look complete and meaningful before any interaction (the "Estado inicial" in the spec). Most readers never touch it.
4. **Reduced motion.** If `DN.RM` is true: no autoplay animation, no tremor/particles; show final state, use step buttons.
5. **Accessibility.** Buttons are real `<button>`s; sliders are `<input type=range>` with `aria-valuetext`; SVG/canvas gets `role="img"` and an `aria-label`; a `.live` element with `aria-live="polite"` narrates state changes.
6. **Mobile.** Must work at 375 px width with touch, no horizontal page overflow. Redraw on resize (debounced) for canvas.
7. **Performance.** Pause rAF loops when off-screen (`DN.onVisible`). Keep DOM counts sane (canvas for >500 marks).
8. **Companion neuron.** When the reader's guess is clearly wrong or a result contradicts their expectation, call `DN.surprise('wXX')`. When an expected reward fails to come (e.g. juice removed), call `DN.letdown('wXX')`. Plain rewards (pigeon prize) `DN.reward('wXX')`. Don't spam: only on meaningful moments. The spec says where.
9. **Sound** only if `DN.sound()` is true and only after a user gesture; use `DN.audio()` / `DN.click()`.
10. **Persistence** via `DN.store.get/set` only (keys documented in your spec; e.g. `quiz`, `mythScore`).
11. Honest data: use only numbers from the spec/dossiers. Label illustrative models as such (the `.wcap` already does; add axis labels and units).

## Build and test (required before you finish)
1. `python3 /Users/renatoshira/Projects/renatoshira.github.io/dopamina-src/build.py` (other agents build too; that's fine, rebuild before testing).
2. `cd /private/tmp/claude-501/-Users-renatoshira-Projects-renatoshira-github-io/c1d0afef-07f3-4f7f-b138-3248effbc76d/scratchpad/pw && node check.js ../shots-<yourname> en w04a w09a` : prints errors and saves desktop/mobile screenshots in PT and EN.
3. LOOK at every screenshot with the Read tool and fix what is ugly, cramped, overlapping, unreadable or broken. Iterate until it is genuinely good at both widths. Ignore errors that clearly come from other agents' widgets (their file name appears in the stack), but you must have zero errors from yours.
4. If you want to test interaction, write your own small Playwright script next to check.js (same `chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'})` pattern) that clicks your controls and screenshots.

## Report back (short)
Files written, what each widget does, any spec deviation and why, anything the lead must change in shell.html/runtime.js, and the screenshot paths of the final state.

## Round 2: polish brief (author feedback, read carefully)
The author reviewed the page and asked for three things that apply to every widget you own:
1. **Details.** "You need to see all these details in all widgets/charts. In w10a the text 'ponha uma dose...' sits on top of a line, crooked vertically. Fix these details." Check every label, annotation, axis text, legend, button row and live text: no text over lines or marks, consistent baselines and vertical centering, no clipping, no overlaps, consistent spacing and alignment, numbers aligned (tabular-nums), nothing cramped at 375 px, nothing too sparse at 1280 px. Check initial state AND every interactive state, in PT and EN (EN strings are often longer).
2. **The takeaway must be inside the widget.** Example comment on w09c (Mucuna): "the message here is that you can't know the amount of levodopa depending on the supplement. This CRUCIAL information is nowhere." Every widget must state its conclusion in plain words inside the widget itself (a short bold "reading" line or the live text in its resting state), consistent with the widget title. Example for w09c: "Pelo rótulo, não dá para saber quanta levodopa vem em cada cápsula: de 0 a 241 mg." (write your own, classic style, no dashes). The reader who never touches the widget must still get the point.
3. **Risograph drawings.** Illustrative drawings (characters, animals, bodies, objects; NOT chart marks/axes) should move to the risograph style already used in widget w00: read `dopamina-src/widgets/w00.js` and `w00.css` and reuse its technique (two spot inks amber DN.COL.dopa and indigo DN.COL.pausa, halftone dot patterns, grain filter that eats edges, 1 to 3 px misregistration between ink layers, multiply overlap, seeded randomness, bold simple shapes). Copy the helper code you need into your own file (prefix ids/classes with your widget id to avoid SVG id collisions; pattern/filter ids must be unique per widget). Keep animations working (animate group transforms, not the filtered layers, for performance; on canvas widgets you may pre-render riso sprites to offscreen canvases). Respect DN.RM.
Do not edit shell.html or en.js (another agent is editing them); if a caption (.wcap) or title must change, put the exact PT and EN text in your report.

## Round 2b: interaction only where it IS the experience (author, top priority)
Author: "Some widgets are very silly, asking for a click just to be 'interactive', when they could be a better-crafted infographic, a beautiful chart, with the data already there (e.g. Mucuna). Others are too complex (Humor, hábito e receptores). Others have silly controls just to move a dot along the chart. That makes no sense. Review everything."
Rules:
- Keep interaction ONLY when the interaction itself teaches: a prediction before the reveal, feeling effort, hearing a rhythm, watching accumulation over time, exploring scale. Otherwise make it a rich, beautiful, fully drawn static infographic (annotated chart, small multiples, side-by-side comparisons, direct labels, callouts), with every state that matters shown at once. Subtle entrance motion on scroll is fine.
- Remove sliders/buttons whose only effect is moving a dot or toggling something that could be shown side by side.
- Simplify anything that needs reading instructions to understand. One idea per widget, readable in 5 seconds.
- Update the widget's title/instruction line accordingly: if nothing to do anymore, the instruction line should state what to look at (send exact PT/EN text to the lead; do not edit shell.html/en.js).
