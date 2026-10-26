# Sorte vs. talento: house style + prior art

## Part 1 · House style (from repo drafts and HTML essays)

### Draft (.md) format: the "roteiro"
- **Header:**
  - `# Title` (short, a concrete metaphor: "A régua e o rótulo", "O feed por dentro").
  - A bold byline line: `**Ensaio interativo sobre X · estado da evidência em <mês> de <ano> · por Renato Shirakashi**`.
  - A blockquote with `Subtítulo para o hero:` and an italic question-style subtitle. The travel pieces also have a `**Standfirst:**`.
  - A blockquote `**Nota de formato.**` saying: this is the full script, with final prose plus a spec for each widget; no HTML yet; which earlier essay it follows; numbered sections, one widget per section, numbers checked against primary sources, sources at the end; and which widgets share state. The newest draft adds: "Esta nota sai da versão final."
- **Sections:** `## 00 · A pergunta`, `## 01 · …` and so on, with sections separated by `---`. There are usually 10–12 numbered sections (00–10 or 00–11), then `## Nota de método` (the newer style: bullets on caveats such as "simulador usa mecanismos reais com tamanhos de efeito inventados") and `## Fontes principais` (grouped by theme in bold, short citations: Author, *Journal* year). The last line is an italic colophon: `*Título · ensaio interativo · dados verificados contra … · mês ano*`.
- **Widget block** (a blockquote placed right after the section prose):
  ```
  > **WIDGET NN · `slug-em-kebab`**        (sub-widgets: 08a, 08b; hero: `hero-canvas: …`)
  > **Tag:** <tema> · <verbo imperativo curto>      e.g. "o funil · siga o post da @ana"
  > **Tipo:** canvas 2D | SVG inline | HTML cards …, plus a short description
  > **O que mostra:** concrete numbers and the encoding
  > **Trabalho cognitivo:** the one thing the figure must teach   (newest draft)
  > **Estado inicial:** the figure must work static, because most readers don't interact   (newest)
  > **Interação:** named buttons in backticks (`ver de novo`, `revelar`), presets, sliders
  > **Persistência / Personalizado:** what is kept in memory and which later widgets reuse it
  > **Celular/acessibilidade:** stacks vertically, prefers-reduced-motion, aria-valuetext   (newest)
  > **Legenda:** 1–3 sentence caption; it states the takeaway, often a little provocative
  ```
  Optional fields: `Linhas:`, `Simulação:`, `Placar:`, `Extra:`, `Complemento:`, `Aviso fixo`.
- **Count:** about 1 widget per section, so roughly 10–12 widgets. The X essay has 11 (with 08a/08b).
- **Recurring widget archetypes:**
  - an opening "map" widget (funnel / cloud);
  - a reader self-input anchor (the 20-item inventory);
  - "sua aposta · ordene e revele" (predict, then reveal);
  - a forest plot with uncertainty;
  - a sandbox or simulator near the end, with the previous run shown in grey;
  - "verdade ou hype" / "mito ou código" judgment cards with a score;
  - a closing personal summary card with `baixar como imagem` (canvas to PNG).

### Tone
- Brazilian Portuguese prose (the HTML is bilingual PT/EN). Second person ("você"). Opens with a concrete scene or paradox and makes the claim plainly.
- Numbers are exact and attributed in-line (author, year, N). There is an explicit honesty layer: error bands are "visualmente dominante, não um detalhe", plus "o que o efeito não significa", "o problema aberto mais honesto da área".
- The newer drafts (o-feed) are terser and more declarative, with less adjective-heavy prose than a-régua. It ends with a numbered list of conclusions or a plain summary, then the method notes.
- It debunks a market or myth layer ("o que o mercado vende", "mito ou código").

### Visual conventions (HTML)
- Single-file HTML. Font: **Space Mono** (Google Fonts) for headings, labels and UI, with a system-ui sans for the body.
- Tokens on `:root`: `--paper:#fff --ink:#141414 --dim:#6b6b6b --line:#e2e2e2 --mid:#9a9a9a --maxw:760px`. On top of that, **one essay-specific accent family**:
  - genoma: `--bio:#0f9d73`, `--bad:#b23b3b`, `--cell:#2f6fd0`;
  - X: `--ana:#ef7d32` (the character's color), `--pos:#1f8a5f`, `--neg:#d2483a`, `--blue:#3e4ea6`, cream `#f2efe7`.
- There is **no dark mode** in any essay. `theme-color #141414`.
- Markup:
  - `header.hero` with `.eyebrow` ("Ensaio interativo · mês ano"), `h1`, `.sub`, `.byline`;
  - sections start with `.step` ("00 · Visão geral") and a `p.lead`;
  - `h2.part` and `h3.subh`;
  - `div.widget#wN` containing `.wtag` (with a `.dot` and the Tag text), the canvas or SVG, `.rowbtns` with `button.btn`, `.live[aria-live=polite]` and `.wcap` (the caption);
  - also `table` with `td.num`, `span.mark` for highlights, `code` for numbers, `p.refs`, `.foot`.
- Rendering: a mix of `<canvas>` (dot clouds, particles, distributions) and inline `<svg>` built in JS (bar charts, flows), each with `role="img"` and `aria-label`. `prefers-reduced-motion` is respected.
- i18n: every text node has `data-i18n="kNNN"`, with a PT/EN dictionary in JS and a toggle stored in `localStorage('rs_lang')`. Full OG/Twitter meta and a per-essay `og-*.png` (1200×630). Linked as `a.feature` cards in `index.html` under "Coisas que produzi".
- **Recurring character / shared state:**
  - The X essay uses **@ana** (1.200 seguidores, café) in every figure, plus readers Bia and Caio, with a JS `state` object.
  - The personality essay uses the reader's own profile from widget 02 to feed widgets 04–07 and 10.
  - The genome essay uses a `state={plants,ferm,fiber,exercise}` week builder.

### Persistence
- **No shared database or backend anywhere.** There is no fetch, Firebase or Supabase, and no `window.claude`. Reader inputs are deliberately kept in a JS variable "sem storage de navegador" (a-régua, widget 02). The only `localStorage` use is the language preference.
- **Opportunity:** a crowd-sourced layer (for example, readers' guesses aggregated, as in "You Draw It") would be new for the site. It would need a backend or an artifact DB, since GitHub Pages is static.

---

## Part 2 · Prior art: interactive treatments of luck, randomness and success

| # | Piece | URL | Interaction | What works | Gap / what's missing |
|---|---|---|---|---|---|
| 1 | **Pluchino, Biondo & Rapisarda, "Talent vs Luck"** (2018) and the HTML5 port | arXiv 1802.07068; NetLogo original; HTML5 app + critique at https://rf.mokslasplius.lt/talent-vs-luck-model/ ; NetLogo re-creation https://joshuaballoch.github.io/recreating-talent-vs-luck/ | A 201×201 world: 1.000 agents with normal talent; green and red event squares random-walk. The app shows an agent trajectory plus talent-vs-capital and luck-vs-capital scatters. | The canonical model, and visually striking (a talent scatter "uniform blob" vs. a luck scatter that trends up). | No narrative. Few or no exposed knobs. Events move while agents sit still (abstract). The "97%" headline gets over-read. It never asks how robust this is to model choices (Challet et al. 2019 show that lucky events alone reproduce the inequality). No reader stake. |
| 2 | **The Pudding, "Why the super rich are inevitable"** (Alvin Chang, Jan 2023) | https://pudding.cool/2022/12/yard-sale/ | Call a coin flip ($100 vs. $1,000), then run 100 people × 10,000 fair flips (bet up to 20%), then add 0.5% redistribution per round. | The best-crafted luck explorable. It goes from personal to aggregate and lands with a policy lever. | **Zero skill/talent in the model**: everyone is identical, so it can't answer "how much is luck vs. skill". It also has no inheritance, no networks, no selection effects and no real data. |
| 3 | **Veritasium, "Is Success Luck or Hard Work?"** (2019) and its R recreations | YouTube; recreations https://www.r-bloggers.com/2021/07/is-success-luck-or-hard-work/ , https://blog.ephorie.de/the-success-paradox-why-even-a-little-bit-of-luck-often-beats-skill | A video toy: 18.300 astronaut applicants, score = 95% skill + 5% luck, top 11 picked. Only about 1.6 of the 11 would be the same without luck; the winners' average luck is about 94.7. | The best single "aha" on **selection under extreme competition**. | No hosted interactive. Readers can't move the luck weight, the applicant count or the skill distribution (uniform vs. normal changes the answer). It conflates "selected" with "successful". |
| 4 | **Veritasium, "You've (Likely) Been Playing The Game of Life Wrong"** (Nov/Dec 2025, power laws) | Video page https://www.veritasium.com/videos/2025/12/25/youve-likely-been-playing-the-game-of-life-wrong ; free sims: **sandpile** https://www.veritasium.com/simulation3 , **Ising** …/simulation4 , **forest fire** …/simulation5 ; refs https://ve42.co/PowerLawsRefs ; tabletop game https://ve42.co/pld | The sandpile sim has start/pause/reset, speed, topple threshold K (4/5/6/8), center vs. random drop, seed, and a log-binned avalanche power-law plot. | Clean physics sandboxes, and power laws with a real log plot. The video connects to the St. Petersburg paradox, expected value and VC "hits" logic. | The sims are **physics, not people**: no talent, no agents, no career. The link from self-organized criticality to "how to play life" lives only in the video narration. There is no sim of a life strategy (many small bets vs. one big one, ergodicity). |
| 5 | **NYT Upshot: "You Draw It: How Family Income Predicts Children's College Chances"** (2015) and **"Extensive Data Shows Punishing Reach of Racism for Black Boys"** (Badger, Miller, Pearce, Quealy, Mar 2018) | nytimes.com/interactive/2015/05/28/upshot/you-draw-it-…  ; nytimes.com/interactive/2018/03/19/upshot/race-class-white-and-black-men.html (verify exact URLs; secondary coverage confirms both) | 2015: the reader draws the curve, then sees the real line plus everyone's guesses. 2018: animated dots for children born rich or poor, flowing to adult income quintiles (Chetty data). | The **predict-then-reveal** pattern plus the crowd's guesses, and dots-as-people for the **birth lottery**. Real data. | Descriptive only: circumstance → outcome. No separation of luck-of-birth from luck-after-birth or from effort, no counterfactual sandbox, and US-only. |
| 6 | **Nicky Case: "The Evolution of Trust"** (2017), **"Parable of the Polygons"** (with Vi Hart, 2014), **"The Wisdom and/or Madness of Crowds"** (2018) | https://ncase.me/trust/ · https://ncase.me/polygons/ · https://ncase.me/crowds/ | Trust: game-theory tournaments with a **"mistakes"/noise slider** (randomness changes which strategy wins). Polygons: tiny individual bias → huge segregation. Crowds: draw networks, then contagion. | The gold standard in voice and pacing. Sandboxes appear only after guided steps. Small rules → big emergent outcome. A recurring cast of characters. | None is about personal success or luck directly. Noise is a side knob, not the subject. They don't use real data or the reader's own life. |
| 7 | **MusicLab** (Salganik, Dodds & Watts, Science 2006) and the replication | Paper https://www.princeton.edu/~mjs3/salganik_watts09.pdf ; replication arXiv 1505.02469 | The original **was** a web experiment: 14.000 participants in 8 parallel "worlds" with download counts visible. Today **no playable demo exists**. | The cleanest real evidence that **cumulative advantage makes success unpredictable** (the same song ranks 1st in one world and 40th in another). | Open territory: no one offers a browser "8 parallel worlds" where the reader is a participant, or where the reader replays history. |
| 8 | **Galton board / regression-to-the-mean demos**: PhET "Plinko Probability"; 3Blue1Brown "But what is the Central Limit Theorem?" (2023); Seeing Theory (Brown) | https://phet.colorado.edu/en/simulations/plinko-probability · youtube zeJD6dqJ5lo · https://seeing-theory.brown.edu/ (6 chapters: Chance Events, Expectation, Variance … CLT … Regression/Correlation) · regression demos: onlinestatbook "Regression toward the mean" | Plinko: rows 5–26, bias p, histogram vs. binomial. Seeing Theory: polished D3 coin, dice and CLT, OLS and correlation. | Beautiful, canonical intuition for **sums of many small random nudges → bell curve**. | Textbook framing. There is no **multiplicative** board (where luck compounds → lognormal / power law), which is the key move for "success". There is no good interactive **regression-to-the-mean on performers** ("Sports Illustrated cover jinx", fund managers, the "second album"). That gap is clear on the web. |

### Also seen (secondary)
- **Yard-sale sandboxes:** Bilkent CANSI (https://cansi.bilkent.edu.tr/wp-content/themes/mac-academic-theme/assets/labs/yard-sale-model.html, with histogram, Lorenz curve and Gini) and HASH (https://simulation.hash.ai/@eadan/yard-sale-wealth-model, with bias and tax knobs). Both are functional tools without narrative.
- **Giving What We Can:** "Birth Lottery" (spin the globe; life expectancy, income and education from OWID) and "How Rich Am I" (https://givingwhatwecan.org/how-rich-am-i). These are single-shot calculators.
- **Survivorship bias:** a small interactive at https://wiz.jock.pl/experiments/survivorship-bias/ (shows survivors → verdict → reveals the graveyard).
- **Mauboussin:** *The Success Equation*'s luck–skill continuum and the "can you lose on purpose?" test. Only static charts exist and **no interactive was found**. The key formula, observed variance = skill variance + luck variance, read off regression to the mean, is waiting for a widget.
- **Bartosz Ciechanowski** (https://ciechanow.ski): no luck piece. He is a style benchmark: every figure is manipulable inline, there is no separate "sandbox", and the prose is tight and sequential.
- **Distill** (distill.pub): no luck piece. The useful meta-reference is Hohman et al., "Communicating with Interactive Articles" (2020). **explorabl.es** is a hub with no dedicated luck/success entry found.
- I found no 2024–2026 scrollytelling essay on luck vs. skill (an extended search returned only papers and blog recreations).

### Synthesis: where a new piece can be better or different
1. **Talent and luck in the same model, with the reader turning the knobs.** The Pudding has luck only. Pluchino has both, but no narrative and no robustness checks. Veritasium-astronaut has a fixed weight.
2. **Additive vs. multiplicative luck.** Show a Galton board that adds (bell curve) next to one that multiplies (power law). That is the bridge between Seeing Theory/3B1B and the 2025 Veritasium video, and nobody has drawn it in one widget.
3. **Selection under competition.** Let the reader move the applicant count and the luck share and watch the winners' luck rise.
4. **Regression to the mean as a skill meter** (Mauboussin): estimate how much of a domain is luck from how much it regresses. There is no web interactive for this.
5. **Parallel worlds / MusicLab replay.** Rerun history N times with the same talents and see how the ranking reshuffles. No playable version exists.
6. **Birth lottery with real data** (Chetty / OWID), then **"post-birth luck"** layered on top.
7. **A recurring character, house style** (like @ana): one person whose talent is fixed, followed across all widgets and all worlds. The reader can also put themselves in (guess → reveal), and the essay ends with a summary card.
8. **Practical turn:** what to do with a luck-heavy world, e.g. many cheap shots and surface area (Veritasium 2025), plus humility and policy (The Pudding redistribution, Pluchino's funding strategies).
