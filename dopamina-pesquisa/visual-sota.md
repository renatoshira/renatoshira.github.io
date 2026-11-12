# Pesquisa visual e de interação: "Como resetar seu sistema de dopamina"

Data da pesquisa: 2026-11-12. Fonte do conteúdo: clipe Huberman Lab com a Dra. Anna Lembke (`transcricao-huberman-lembke-2026.txt`).

Convenções:
- **[V]** verificado nesta pesquisa (página aberta, registro npm, arquivo no CDN com HTTP 200, ou dados do pacote `web-features` 3.45.0).
- **[NV]** não verificado: vem de memória, de fonte única ou de agregador. Conferir antes de citar.
- Versões "pin recomendado" = a última versão publicada há pelo menos 14 dias (mais estável que a do dia).

---

## 0. O que o texto precisa mostrar (mapa de conteúdo → visual)

| Trecho da transcrição | Ideia central | Melhor forma visual |
|---|---|---|
| 0:29–0:41 | Chocolate +55%, sexo +100%, nicotina +150%, metanfetamina +1000% acima do basal (ratos, microdiálise no núcleo accumbens) | Escala que "quebra" a página: a barra da metanfetamina não cabe no layout |
| 0:06–0:20, 1:21 | Quanto **mais** e quanto **mais rápido**, mais reforçador | Curvas de liberação no tempo (pico × latência), small multiples |
| 2:24–3:54 | Balança prazer-dor; gremlins da neuroadaptação pulam no lado da dor; ficam até inclinar ao contrário (ressaca/fissura); descem se você resiste | Gangorra com física real e criaturas |
| 3:56–4:20 | Uso repetido: gremlins se multiplicam, ficam maiores, "fazem musculação"; set point hedônico muda | Simulação acumulativa, ponto de equilíbrio migrando |
| 4:22–4:37 | Sintomas universais de abstinência: ansiedade, irritabilidade, insônia, depressão, fissura | Seção "noturna" escura, ruído, tipografia instável |
| 4:51–5:20 | Automedicação: usar "melhora" porque restaura homeostase, mas adiciona gremlins | Loop causal (estilo LOOPY) |
| 5:33–5:51 | 10–14 dias de abstinência aguda; semanas 3–4: ~80% se sentem bem melhor | Linha do tempo de 30 dias, recuperação de receptores |
| 5:51–6:05 | Alternativa: medicação de meia-vida longa (buprenorfina/metadona) no lado do prazer | Peso fixo na balança que não gera gremlins |
| 8:40–10:10 | Largar só um já ajuda, se não substituir; largar álcool+nicotina juntos tem desfecho melhor | Comparação de dois cenários lado a lado |
| 10:10–10:24 | Pistas pareadas: café → cigarro | Grafo de associação, "corrente" de gatilhos |
| 10:24–10:40 | Experimento de 30 dias, "seja o cientista da sua vida" | Tracker pessoal do leitor |

---

## (a) Galeria de referências

### a.1 Explicadores interativos de autor

| Referência | Data | URL | O que é especial | Como inspira este ensaio |
|---|---|---|---|---|
| Bartosz Ciechanowski, *Moon* | 17/12/2024 [V] | https://ciechanow.ski/moon/ | Dezenas de pequenos widgets WebGL, cada um com **um** slider; o leitor manipula a física em vez de assistir. Prosa e widget alternam em ritmo curto. | Modelo para a balança: vários mini-widgets que acrescentam uma regra por vez (1 gremlin → gremlins ficam → gremlins se multiplicam → set point). Nota: não há artigo novo dele em 2025–2026 [V, arquivo do site]. |
| Ciechanowski, *Sound* | 18/10/2022 [V] | https://ciechanow.ski/sound/ | Visualização de onda + áudio sincronizado | Base para a sonificação da dopamina |
| Nicky Case, *Adventures with Anxiety* | 2019 [NV data] | https://ncase.me/anxiety/ | Narrativa jogável onde **você é a ansiedade**; escolhas em diálogo | Inverter o ponto de vista: o leitor joga como o gremlin, ou "conversa" com a fissura |
| Nicky Case, *LOOPY* | 2017 [NV data] | https://ncase.me/loopy/ | Diagramas de laço causal que rodam | Diagrama do ciclo de automedicação (seção 4:51) |
| Nicky Case, *The Evolution of Trust* | 2017 | https://ncase.me/trust/ | Teoria dos jogos ensinada por simulação incremental | Estrutura pedagógica "regra por regra" |
| Damar Aji Pramudita, *Dithering — Part I* (vencedor Pudding Cup 2025) | 2025 [V] | https://visualrambling.space/dithering-part-1/ | Animações temporizadas explicando um conceito técnico, estética 1-bit | A estética de pontilhado combina com Space Mono e papel branco; serve para a "visão" da abstinência |
| Neal Agarwal, *Size of Life* | 2025 [V via roundups] | https://neal.fun/size-of-life/ | Escala com ilustração, música e som; zoom contínuo | A escala 55% → 1000%: zoom out progressivo até a metanfetamina |
| Nadieh Bremer + Emily Barone, *Searching for Birds* (Google Trends) | ago/2025–jan/2026 [V]; People's Voice Webby 2026 [V] | https://www.visualcinnamon.com/portfolio/searching-for-birds/ | Linguagem visual própria que funde ilustração e dado; ~700 espécies | Gremlins como "glifos de dado": tamanho, força e número codificam o tempo de uso |

### a.2 Redações e estúdios (2025–2026)

| Referência | Data | URL | Técnica | Inspiração |
|---|---|---|---|---|
| The Pudding, *afterlife of pi* | nov/2026 [V] | https://pudding.cool/2026/11/pi | Passeios aleatórios animados com play/velocidade/slider de passos; chat ao vivo falso com personagens históricos; linha do tempo log | Simulação com controles de "transporte" (play, velocidade, passo) para os 30 dias; escala log para 55→1000% |
| The Pudding, *lo-pi radio* | nov/2026 [V existência] | https://pudding.cool/projects/lopi | Peça sonora/generativa [NV detalhes] | Sonificação como camada opcional |
| The Pudding, *Life after death?* | out/2026 [V] | https://pudding.cool/2026/10/lifeafter | "Sala" com 1.500 pessoas desenhadas individualmente; trilhas originais feitas no Ableton | Unit chart de pessoas para "80% se sentem melhor na semana 3–4" (100 figuras, 80 acendem) |
| The Pudding, *30 minutes with a stranger* | jun/2025 [V] | https://pudding.cool/2025/06/hello-stranger/ | Dados de conversa codificados como padrão visual | Linha de humor diário como "textura" |
| The Pudding, *Dicing an onion* | ago/2025 [V] | https://pudding.cool/2025/08/onions/ | Animação passo a passo de geometria | Ritmo de explicação por passos |
| NYT, *Swept Away* (Camp Mystic) | 15/11/2025 [V] | https://www.nytimes.com/interactive/2025/11/15/us/camp-mystic-flooding-deaths-video-map.html | Reconstrução minuto a minuto com vídeo e mapa | Linha do tempo "dia a dia" da abstinência com marcador sincronizado ao scroll |
| NYT Upshot, *Your Zodiac Sign Is 2,000 Years Out of Date* | 2025 [V] | https://www.nytimes.com/interactive/2025/upshot/zodiac-signs.html | Personalização: você digita seu dado e a peça responde | O leitor escolhe "seu vício" e a peça toda se adapta |
| NYT Upshot, *You Draw It* | 28/05/2015 [NV URL exata] | https://www.nytimes.com/interactive/2015/05/28/upshot/you-draw-it-how-family-income-affects-childrens-college-chances.html | Leitor desenha a curva antes de ver o dado | "Desenhe como você acha que se sente no dia 1, 7, 14, 30" |
| NYT, *Inside Sednaya Prison* | 29/08/2025 [V] | https://www.nytimes.com/interactive/2025/08/29/world/middleeast/syria-sednaya-prison-assad.html | Reconstrução 3D navegável | Não aplicável diretamente; referência de 3D sóbrio |
| Reuters, *Where does the US get its goods? Take our quiz* | 2025–26; indicado Webby 2026 [V] | via https://winners.webbyawards.com/winners/websites-and-mobile-sites/features-design/best-data-visualization | Quiz que revela o dado depois do palpite | Quiz "ordene as substâncias por % de dopamina" |
| Reuters, *How California fights fires from the skies* | 2025 [V] | https://www.reuters.com/graphics/CALIFORNIA-WILDFIRES/AIRCRAFTS/egvbjgkajvq/ | Diagramas técnicos limpos + mapas | Diagrama da sinapse: rótulos finos, linhas de chamada |
| The Guardian, *Bird migration is changing* | 16/10/2025 [V] | https://www.theguardian.com/environment/ng-interactive/2025/oct/16/bird-migration-is-changing-what-does-this-reveal-about-our-planet-visualised-aoe | Mapas animados + ilustração + **som** | Som ambiente que muda de acordo com o estado da balança |
| The Straits Times, *Women's clothing sizes* | set/2025 [V] | https://www.straitstimes.com/multimedia/graphics/2025/09/womens-clothing-size-guide-singapore/index.html | Modelos 3D + dados coletados à mão | Personalização e comparação |
| FlowingData, *When You Will Die* | 2025 [V] | https://flowingdata.com/projects/2025/when-die/ | Simulação probabilística que roda na frente do leitor | Simular 100 "pessoas" passando pelos 30 dias, com variância |
| Bloomberg, *OpenAI, Nvidia and the web of AI deals* | 07/10/2025 [V] | https://www.bloomberg.com/news/features/2025-10-07/openai-s-nvidia-amd-deals-boost-1-trillion-ai-boom-with-circular-deals | Grafo circular de relações | Grafo de pistas pareadas (café → cigarro → álcool) |
| Our World in Data, *Measles vaccines save millions* | 2025 [V] | https://ourworldindata.org/measles-vaccines-save-lives | Heatmap temporal | Heatmap do tracker de 30 dias |
| Biocubes (Ménard & Shtarkman) | 2025 [V] | https://biocubes.net/ | Volumes 3D comparando massas | Volume de dopamina como cubos (alternativa à barra) |
| WWF, *Blue Corridors* (Ode Partners) — vencedor Webby 2026 Best Data Visualization | 2026 [V prêmio] | https://www.webbyawards.com/2026/websites-and-mobile-sites/features-design/best-data-visualization/364937/wwf--blue-corridors | Rotas animadas sobre o oceano [NV detalhes] | Partículas que seguem trajetórias (dopamina no caminho mesolímbico) |

### a.3 Prêmios: o que deu para confirmar

| Prêmio | Situação verificada |
|---|---|
| **Webby 2026** (anunciado 21/04/2026) [V] | Best Data Visualization: vencedor *WWF – Blue Corridors* (Ode Partners); People's Voice: *Searching for Birds* (Visual Cinnamon); indicados: Climate TRACE, Reuters (quiz de importações), Spotify Wrapped. |
| **SND47** (competição 2026) [V] | NYT eleito *World's Best-Designed Digital Presence*; finalistas digitais: ProPublica, The Pudding, The Washington Post. Lista completa: https://snd.org/results/ |
| **Awwwards Annual 2025** [V, página de vencedores] | Site of the Year: *Lando Norris* (OFF+BRAND); Developer SOTY: *Messenger*; Agency: Immersive Garden. Referência de "wow" WebGL, não de dataviz. |
| **Pudding Cup 2025** [V via roundup] | *Dithering — Part I*; *Legislative network behind state trans laws*; *Benford's Law*. |
| **Information is Beautiful Awards** | O site só mostra vencedores até **2024** (https://www.informationisbeautifulawards.com/news/680-announcing-the-2024-winners). Não achei edições 2025/2026 [V ausência; possível pausa do prêmio, NV]. |
| **Malofiej 2026** | Não consegui confirmar os vencedores; o site atual (malofiejgraphics.com) só lista PDFs de edições antigas [V]. Tratar como [NV]. |
| **Kantar Information is Beautiful** | Mesma situação do IIB [NV]. |
| **Codrops 2026** [V] | Tendência clara: Three.js + **WebGPU + TSL**: *WebGPU Gommage Effect* (texto MSDF se desfazendo em poeira, 28/01/2026) https://tympanus.net/codrops/2026/01/28/webgpu-gommage-effect-dissolving-msdf-text-into-dust-and-petals-with-three-js-tsl/ ; *Garden Anomaly* (06/08/2026) https://tympanus.net/codrops/2026/08/06/garden-anomaly-a-tiny-webgpu-and-tsl-experiment/ ; *Procedural Geometry with Three.js and WebGPU* (11/08/2026) https://tympanus.net/codrops/2026/08/11/exploring-procedural-geometry-with-three-js-and-webgpu/ ; *Custom-shaped cursor trail* com TSL (24/09/2026) https://tympanus.net/codrops/2026/09/24/custom-shaped-cursor-trail/ |

Roundups de 2025 usados: FlowingData, *Best Data Visualization Projects of 2025* (https://flowingdata.com/2025/12/31/best-data-visualization-2025/) e AnyChart DataViz Weekly (https://www.anychart.com/blog/2026/01/09/best-data-visualizations-2025/).

### a.4 Referências de tema (design viciante)

- Harry Brignull, *Deceptive Patterns*, cap. 11 "Exploiting addiction": https://deceptive.design/book/contents/chapter-11 (reforço variável, arrependimento de Aza Raskin pelo scroll infinito).
- Nir Eyal, *Infinite Scroll: The Web's Slot Machine*: https://www.nirandfar.com/the-webs-slot-machine
- Solomon & Corbit (1974), *An opponent-process theory of motivation* (curvas a/b) [NV citação exata]; Lembke, *Dopamine Nation* (2021).
- Dados de % de dopamina: Di Chiara & Imperato (1988) e trabalhos de microdiálise em ratos, citados por Lembke [NV qual estudo exato gera cada número; conferir antes de mostrar como "dado"].

**Lacuna encontrada:** não achei explicador interativo de qualidade sobre dopamina/vício em 2025–2026 [V busca]. Os resultados são textos. Isso é uma oportunidade: o ensaio pode ocupar um espaço vazio.

---

## (b) Capacidades da plataforma web em novembro de 2026

Fonte principal: pacote `web-features` 3.45.0 (dados do Baseline, os mesmos do web.dev/caniuse), lido nesta sessão [V]. "Baseline baixo" = disponível em todos os navegadores principais desde a data; "alto" = há mais de 30 meses.

| Recurso | Status Baseline | Versões | Uso no ensaio | Fallback |
|---|---|---|---|---|
| **Scroll-driven animations** (`animation-timeline: scroll()/view()`) | **Baseline desde 27/10/2026** (Firefox 159 ativou por padrão) [V]; está no Interop 2026 [V] | Chrome/Edge 115, Firefox 159, Safari 26 | Curvas que se desenham com o scroll, barras crescendo, parallax sem JS | `@supports (animation-timeline: view())`; sem suporte, estado final estático |
| **View Transitions** (mesmo documento) | Baseline desde 14/10/2025 [V]; Interop 2026 | Chrome 111, Firefox 144, Safari 18 | Morph entre tipos de gráfico (barras → curvas → waffle) | Troca instantânea |
| `view-transition-class` | Baseline 14/10/2025 [V] | Chrome 125, Firefox 144, Safari 18.2 | Agrupar animação de muitos gremlins | — |
| View Transitions entre documentos | **Não Baseline** (falta Firefox) [V] | Chrome 126, Safari 18.2 | Pouco útil (arquivo único) | — |
| View Transitions com escopo de elemento | Só Chrome 147 [V] | — | Não usar | — |
| **WebGPU** | **Não Baseline** [V] | Chrome/Edge 144 (desktop todos SO), Chrome Android 121, Safari 26 (macOS/iOS); Firefox 141 Windows e 145 macOS ARM, Linux/Android ainda não [NV, fontes de 2025] | Partículas de dopamina na sinapse, shader "neural" | Three.js `WebGPURenderer` cai para WebGL2 sozinho (o build `three.webgpu.js` traz o `WebGLBackend` [V]) |
| **CSS anchor positioning** | Recurso agregado não Baseline, mas o núcleo existe em todos: Chrome 125, Firefox 147, Safari 26 [V via chaves de compat]; Safari 27 ajustou detalhes (`position-anchor: normal`, segue transform) [V]; Interop 2026 | Rótulos e anotações presos a pontos do gráfico, tooltips dos gremlins | `position: absolute` calculado em JS |
| `@property` (custom properties registradas) | Baseline 09/07/2024 [V] | Chrome 85, Firefox 128, Safari 16.4 | Animar `--dopamina` como número/cor; gradientes animados | — |
| Container queries (tamanho) | Baseline alto (08/2025) [V] | todos | Widgets que se reorganizam no celular | — |
| Container **style** queries | Baseline 19/05/2026 [V]; Interop 2026 | Chrome 111, Firefox 151, Safari 18 | `@container style(--estado: abstinencia)` troca o tema da seção | Classe CSS |
| Scroll-state queries (`stuck`, `snapped`) | Só Chrome 144 [V] | — | Opcional (cabeçalho "grudado") | — |
| **Popover API** | Baseline 27/01/2025 [V]; Interop 2026 | Chrome 116, Firefox 125, Safari 17 / iOS 18.3 | Notas, glossário ("núcleo accumbens"), fontes | `<details>` |
| Invoker commands (`command`/`commandfor`) | Baseline 12/12/2025 [V] | Chrome 135, Firefox 144, Safari 26.2 | Abrir popovers/dialogs sem JS | JS |
| `@starting-style` + `transition-behavior: allow-discrete` | Baseline 08/2024 [V] | todos | Entrada animada de popovers e gremlins | — |
| **Web Audio** | Baseline alto [V] | todos | Sonificação | Silêncio (som sempre opt-in) |
| Houdini Paint API (`paint()`) | **Não Baseline** (só Chromium) [V] | Chrome 65 | Não usar; canvas resolve | — |
| `field-sizing: content` | Baseline 16/06/2026 [V] | Chrome 123, Firefox 152, Safari 26.2 | Campo de anotação do diário de 30 dias | altura fixa |
| `sibling-index()` / `sibling-count()` | `sibling-count` Baseline 18/08/2026 [V] | Chrome 138, Firefox 154, Safari 26.2 | Atraso escalonado de 100 figuras do waffle só em CSS | `--i` inline |
| CSS `random()` | Chrome 156, Safari 26.2; Firefox só em preview [V web.dev out/2026] | — | Posição aleatória de gremlins em CSS | JS |
| CSS `shape()` | Baseline 24/02/2026 [V]; Interop 2026 | Chrome 135, Firefox 148, Safari 18.4 | `clip-path` responsivo para a curva a/b | SVG path |
| `contrast-color()` | Baseline 10/04/2026 [V] | Chrome 147, Firefox 146, Safari 26 | Texto legível sobre cor que muda com o estado | cor fixa |
| `light-dark()`, `color-mix()`, oklch, cor relativa | Baseline [V] | todos | Uma família de acento derivada de um token | — |
| `text-wrap: balance` | Baseline 05/2024 [V] | todos | Títulos | — |
| `text-wrap: pretty` | Não Baseline (falta Firefox) [V] | Chrome 117, Safari 26 | Parágrafos | ignora |
| Navigation API | Baseline 13/01/2026 [V] | Chrome 102, Firefox 147, Safari 26.2 | Não é necessário (arquivo único) | — |
| `interpolate-size` / `calc-size()` | Só Chromium [V] | — | Abrir `<details>` animado | sem animação |
| `content-visibility` | Baseline 15/09/2025 [V] | Chrome 108, Firefox 130, Safari 26 | Performance de página longa | — |
| OffscreenCanvas | Baseline alto [V] | todos | Partículas em Worker | canvas no main thread |
| **Vibração** (`navigator.vibrate`) | **Não Baseline**: só Chromium (Android) [V] | Chrome 32 | Háptico no "puxe a alavanca" | Nada no iOS |
| Háptico no iOS via `<input type="checkbox" switch>` | `switch-control` Safari 17.4 [V]; truque de clicar no label do switch dispara háptico; um README diz que a Apple corrigiu no iOS 26.5 [NV] | — | Não depender | Aprimoramento progressivo |
| `prefers-reduced-motion` | Baseline alto [V] | todos | Obrigatório em tudo | — |
| Device orientation | Baseline alto [V] (iOS exige permissão) | — | Inclinar o celular inclina a balança | Arrastar |

**Interop 2026** (focos, lidos do repositório oficial [V], https://github.com/web-platform-tests/interop/tree/main/2026): container style queries, anchor positioning, `attr()`, `contrast-color()`, CSS zoom, custom highlights, dialogs e popovers, Navigation API, **scroll-driven animations**, scroll snap, `shape()`, **view transitions**, entre outros. Em resumo: os três recursos de animação que mais interessam a este ensaio (scroll-driven, view transitions, anchor positioning) são exatamente os que os navegadores estão alinhando em 2026.

---

## (c) Bibliotecas por CDN (versões consultadas no registro npm em 12/11/2026)

Todos os arquivos abaixo responderam HTTP 200 no jsDelivr nesta sessão [V], salvo indicação. "Pin" é a recomendação estável.

| Biblioteca | Última | Pin recomendado | URL CDN (com a última) | Peso min | Notas |
|---|---|---|---|---|---|
| **GSAP** (core) | 3.15.1 (04/11/2026) | 3.15.0 (13/04/2026) | `https://cdn.jsdelivr.net/npm/gsap@3.15.1/dist/gsap.min.js` (cdnjs também tem 3.15.1 [V]) | 73 KB | **100% gratuito, inclusive plugins bônus, inclusive uso comercial** (licença "Standard no-charge", patrocínio Webflow) [V, README do pacote] |
| GSAP ScrollTrigger | 3.15.1 | 3.15.0 | `.../gsap@3.15.1/dist/ScrollTrigger.min.js` | 45 KB | Scrub, pin |
| GSAP SplitText | 3.15.1 | 3.15.0 | `.../dist/SplitText.min.js` | 8 KB | Texto letra a letra (sintomas) |
| GSAP MorphSVGPlugin | 3.15.1 | 3.15.0 | `.../dist/MorphSVGPlugin.min.js` | 21 KB | Morph de formas, substitui Flubber |
| GSAP DrawSVG / Flip / Physics2D / Inertia / ScrollSmoother | 3.15.1 | 3.15.0 | `.../dist/DrawSVGPlugin.min.js`, `Flip.min.js`, `Physics2DPlugin.min.js`, `InertiaPlugin.min.js`, `ScrollSmoother.min.js` | 2–26 KB | Flip para trocas de layout; Inertia para arrastar a balança com inércia |
| **Motion** (motion.dev) | 14.12.0 (10/11/2026) | 14.7.1 (27/10/2026) | `https://cdn.jsdelivr.net/npm/motion@14.12.0/dist/motion.js` | 189 KB (UMD) | Exporta também `motion/three` e `motion/vgpu` (liga motion values a uniforms) [V nos tipos; NV uso via CDN] |
| **Three.js** | 0.187.0 (30/10/2026) | 0.186.1 (24/09/2026) | `https://cdn.jsdelivr.net/npm/three@0.187.0/build/three.webgpu.js` e `.../build/three.tsl.js` (ES module, via import map) | 1,35 MB + 1,07 MB não minificados | WebGPURenderer + TSL com fallback WebGL2 embutido. Pesado: carregar só sob demanda |
| **D3** | 7.9.2 (03/11/2026) | 7.9.0 | `https://cdn.jsdelivr.net/npm/d3@7.9.2/dist/d3.min.js` | 281 KB | Escalas, formas, force. Para economizar, importar só `d3-scale`, `d3-shape` |
| **Observable Plot** | 0.6.19 (05/11/2026) | 0.6.17 | `https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6.19/dist/plot.umd.min.js` (precisa do D3) | 212 KB | Ótimo para small multiples, ridgelines, beeswarm (dodge) estáticos |
| **Rive** (canvas) | 2.50.0 (09/11/2026) | 2.48.0 | `https://cdn.jsdelivr.net/npm/@rive-app/canvas@2.50.0/rive.js` | 684 KB | Gremlins com state machine (idle, pular, musculação). Exige arquivo `.riv` feito no editor Rive |
| **dotLottie web** | 0.83.2 (hoje) | 0.81.0 | `https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.83.2/dist/index.js` | 161 KB + WASM | Player com theming e state machines [NV detalhes] |
| lottie-web | 5.13.0 (05/2025) | 5.13.0 | `https://cdn.jsdelivr.net/npm/lottie-web@5.13.0/...` [NV caminho] | ~250 KB | Legado |
| **Matter.js** | 0.20.0 (06/2024) | 0.20.0 | `https://cdn.jsdelivr.net/npm/matter-js@0.20.0/build/matter.min.js` (cdnjs também) | 83 KB | Física 2D simples: gangorra com junta pivô + corpos que caem. Projeto lento mas estável |
| **Rapier 2D** (compat) | 0.21.0 (25/09/2026) | 0.21.0 | `https://cdn.jsdelivr.net/npm/@dimforge/rapier2d-compat@0.21.0/dist/rapier.mjs` (o caminho `rapier.es.js` dá 404 [V]) | **3,4 MB** (WASM em base64) | Determinístico e rápido, mas pesado demais para um ensaio. Usar Matter.js |
| **p5.js** | 2.4.0 (11/11/2026) | 2.3.4 | `https://cdn.jsdelivr.net/npm/p5@2.4.0/lib/p5.min.js` | 1,07 MB | Pesado para o que entrega aqui; canvas puro basta |
| **PixiJS** | 8.23.0 (11/11/2026) | 8.22.0 | `https://cdn.jsdelivr.net/npm/pixi.js@8.23.0/dist/pixi.min.js` | 913 KB | WebGPU/WebGL 2D; útil se houver milhares de sprites (gremlins) |
| regl | 2.1.1 (11/2024) | 2.1.1 | `https://cdn.jsdelivr.net/npm/regl@2.1.1/dist/regl.min.js` | 87 KB | WebGL funcional e leve; alternativa ao Three para um único shader de fundo |
| OGL | 1.0.11 (01/2025) | 1.0.11 | jsDelivr [NV caminho] | ~30 KB | WebGL mínimo |
| twgl.js | 7.0.0 (07/2025) | 7.0.0 | jsDelivr [NV caminho] | pequeno | Idem |
| Theatre.js | 0.7.2 (05/2024) | — | — | — | **Sem release há 2,5 anos**; evitar |
| **Tone.js** | 15.1.22 (tag `latest`, 04/2025) | 15.1.22 | `https://cdn.jsdelivr.net/npm/tone@15.1.22/build/Tone.js` | 346 KB | Há uma linha 15.5.x com tag `next` (15.5.66, 31/10/2026) e o cdnjs já serve 15.5.66 [V]; preferir 15.1.22 estável |
| Flubber | 0.4.2 (2018) | 0.4.2 | `https://cdn.jsdelivr.net/npm/flubber@0.4.2/build/flubber.min.js` | 54 KB | Funciona, mas MorphSVG (agora grátis) é melhor |
| Scrollama | 3.2.0 (2022) | 3.2.0 | `https://cdn.jsdelivr.net/npm/scrollama@3.2.0/build/scrollama.min.js` | 5 KB | Gatilhos de passo; ScrollTrigger ou IntersectionObserver fazem o mesmo |
| Lenis | 1.3.27 (15/10/2026) | 1.3.27 | `https://cdn.jsdelivr.net/npm/lenis@1.3.27/dist/lenis.min.js` | 19 KB | Smooth scroll. Discutível para acessibilidade; não recomendo |
| canvas-confetti | 1.9.4 (10/2025) | 1.9.4 | jsDelivr | ~10 KB | Recompensa falsa no "feed caça-níquel" (ironia) |

Padrão de import map para módulos ES (Three):

```html
<script type="importmap">
{ "imports": {
  "three": "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.webgpu.js",
  "three/tsl": "https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.tsl.js"
} }
</script>
```

Fontes variáveis do Google Fonts confirmadas (HTTP 200 no `css2` com os eixos) [V]:
- **Recursive**: eixos `MONO` 0–1, `CASL` 0–1, `wght` 300–1000, `slnt` −15–0, `CRSV`. O eixo MONO permite passar de monoespaçada (combina com Space Mono) a sans "casual" de forma contínua: o texto pode "ficar instável" na abstinência e "assentar" na recuperação.
- **Fraunces**: `opsz`, `wght`, `SOFT`, `WONK`.
- **Space Grotesk**: `wght` 300–700 (parente da Space Mono).
- **Anybody**: `wdth` 50–150, `wght` 100–900 (largura que estica com o pico).

---

## (d) Conceitos de widgets e animação (18)

Legenda de risco: técnico (T), conteúdo/ética (C), acessibilidade (A), performance (P).

### 1. "A barra que não cabe" (escala 55 → 1000%)
- **Inspira:** *Size of Life* (Neal Agarwal), log timeline do *afterlife of pi* (Pudding).
- **Stack:** SVG inline + CSS scroll-driven (`animation-timeline: view()`), fallback GSAP ScrollTrigger.
- **Interação:** cada substância entra com o scroll; chocolate e sexo cabem na coluna de texto; nicotina encosta na margem; a barra da metanfetamina **rompe a coluna**, atravessa a viewport e o gráfico dá zoom out (a escala reescala com transição) até que as outras virem pequenos tocos. Toggle "linear/log" no final.
- **Fallback estático:** barras horizontais com a de metanfetamina quebrada por um "≈" e rótulo "10×".
- **Wow:** ★★★
- **Risco:** C (dados de ratos; mostrar "em ratos" no rótulo, como a própria Lembke faz); A (anunciar valores em texto).

### 2. "Adivinhe antes" (quiz de ordenação)
- **Inspira:** quiz da Reuters indicado ao Webby 2026; *You Draw It* (NYT).
- **Stack:** HTML + arrastar (Pointer Events), View Transitions para revelar a ordem correta.
- **Interação:** o leitor arrasta 4 cartões (chocolate, sexo, nicotina, metanfetamina) e arrasta um controle de altura para cada palpite; ao confirmar, os cartões fazem morph para as barras reais e mostra o erro dele.
- **Fallback:** lista ordenada com valores.
- **Wow:** ★★
- **Risco:** baixo. Teclado: botões ↑↓ em cada cartão.

### 3. Curvas de liberação "quanto e quão rápido" (small multiples)
- **Inspira:** small multiples clássicos; Observable Plot.
- **Stack:** Canvas 2D ou SVG com D3 (`d3-shape` curveBasis); scroll-scrubbed.
- **Interação:** 4 miniaturas de curva no tempo (pico × velocidade de subida). Um slider "velocidade de entrada" (comer, fumar, injetar) mexe a mesma quantidade total e mostra que o pico fica mais estreito e mais alto. Área igual, forma diferente.
- **Fallback:** imagem SVG estática das 4 curvas.
- **Wow:** ★★
- **Risco:** C (curvas são ilustrativas, não medidas; dizer isso na legenda).

### 4. A balança prazer-dor com gremlins (peça central)
- **Inspira:** Ciechanowski (uma regra por widget), Nicky Case (*Evolution of Trust*).
- **Stack:** Matter.js 0.20 (viga com `Constraint` pivô + corpos dos gremlins) renderizado em Canvas 2D próprio (não o renderer do Matter) com o estilo da casa; gremlins como SVG/sprites desenhados à mão.
- **Interação:** botão/gesto "dose" coloca um peso no lado do prazer; a viga inclina com física real; após um atraso, gremlins **pulam** no lado da dor, nivelam, e continuam até inclinar para o lado oposto (a ressaca). Botão "resistir" faz os gremlins descerem. Botão "usar de novo" no meio da ressaca adiciona mais gremlins.
- **Fallback:** sequência de 4 ilustrações SVG (repouso, prazer, gremlins, ressaca) com legenda.
- **Wow:** ★★★
- **Risco:** T (afinar física para não "explodir"; fixar passo de tempo); A (descrever o estado em `aria-live`: "Balança inclinada para a dor, 3 gremlins").

### 5. "Dias, semanas, anos": gremlins que fazem musculação
- **Inspira:** glifos de dado do *Searching for Birds*.
- **Stack:** mesmo motor do nº 4 + slider de tempo (dias → anos) + escala dos corpos.
- **Interação:** slider de "tempo de uso". Os gremlins se multiplicam, crescem e ganham halteres; a linha de "nível" da balança desce — o **set point hedônico** marcado por uma linha tracejada que migra. Mesmo com dose máxima no prazer, a balança só chega ao "normal".
- **Fallback:** 3 painéis (semana, mês, ano).
- **Wow:** ★★★
- **Risco:** P (limitar a ~60 corpos; acima disso, empilhar em "pilha" estática sem física).

### 6. Curvas de processo oponente a/b roladas pelo scroll
- **Inspira:** Solomon & Corbit (1974); scroll-scrub do NYT.
- **Stack:** SVG path + `animation-timeline: view()` animando `stroke-dashoffset`; `@property --t` para mover um marcador; fallback ScrollTrigger.
- **Interação:** primeira exposição: processo **a** (prazer) alto, **b** (dor) pequeno e curto. Com o scroll, a peça repete a exposição 5 vezes: a encolhe, b cresce e se alonga. A soma (linha grossa) fica abaixo de zero cada vez mais tempo.
- **Fallback:** gráfico final com as 5 sobreposições.
- **Wow:** ★★
- **Risco:** baixo; é o gráfico com mais rigor conceitual do ensaio.

### 7. Sinapse com partículas de dopamina
- **Inspira:** Codrops *Gommage* e *Garden Anomaly* (WebGPU + TSL).
- **Stack:** Three.js 0.186 `WebGPURenderer` + TSL compute (fallback WebGL2 automático); versão leve em Canvas 2D com ~2.000 partículas.
- **Interação:** fenda sináptica em corte; cada substância libera uma nuvem de partículas proporcional ao % (55% = sopro, 1000% = tempestade). Com uso crônico, os receptores (pequenos "cálices" na membrana) **somem** (downregulation) e as partículas passam sem se ligar.
- **Fallback:** diagrama SVG com 3 estados.
- **Wow:** ★★★
- **Risco:** P (2,4 MB do Three; carregar só quando a seção estiver perto, com `IntersectionObserver` + `import()`); C (downregulation é simplificação; Lembke fala em gremlins, não em receptores — marcar como ilustração).

### 8. Sonificação da dopamina (opt-in)
- **Inspira:** *Bird migration* (Guardian) com som; *Life after death?* (Pudding) com trilha; *Sound* (Ciechanowski).
- **Stack:** Web Audio puro (OscillatorNode + GainNode + BiquadFilter) ou Tone.js 15.1.22.
- **Interação:** botão "ouvir". Altura = nível de dopamina; o lado da dor entra como ruído grave filtrado; no set point deslocado, o tom "normal" soa desafinado (detune) até a recuperação. Na seção 1, cada barra toca uma nota: a metanfetamina sobe 4 oitavas.
- **Fallback:** silêncio (padrão). Nunca tocar som sem gesto do usuário.
- **Wow:** ★★
- **Risco:** A (nunca autoplay; controle de volume; legenda visual do som).

### 9. O feed caça-níquel (sentir o reforço de razão variável)
- **Inspira:** *Deceptive Patterns* cap. 11; "slot machine in your pocket" (Tristan Harris); pull-to-refresh de Loren Brichter.
- **Stack:** HTML + CSS scroll snap + JS; recompensas com agenda de razão variável (VR-5); canvas-confetti; `navigator.vibrate` no Android.
- **Interação:** uma caixa embutida que imita um feed com scroll infinito (dentro de um contêiner, nunca a página inteira). A maioria dos cartões é cinza; a cada ~5 em média, aleatório, um "brilha" com confete e um som. Um contador discreto mede quantos cartões o leitor rolou e por quanto tempo. Ao sair, a peça revela: "você rolou 47 cartões por 3 recompensas", com o gráfico do intervalo entre recompensas.
- **Fallback:** descrição + gif estático; com reduced motion, confete vira um "+1" sem movimento.
- **Wow:** ★★★
- **Risco:** C (é manipulação de propósito; deixar claro, com saída fácil e sem dark pattern real); A (armadilha de foco: botão "sair do feed" sempre visível).

### 10. Desenhe sua abstinência (You Draw It)
- **Inspira:** NYT *You Draw It*.
- **Stack:** SVG + Pointer Events; D3 para escalas.
- **Interação:** eixo de 30 dias, eixo de "como me sinto". O leitor desenha. Ao soltar, aparece a curva típica descrita por Lembke: piora nos dias 1–14, melhora clara nas semanas 3–4. O texto comenta a diferença ("você achou que melhoraria no dia 5").
- **Fallback:** curva típica estática.
- **Wow:** ★★★
- **Risco:** C (a curva é esquemática, não dado; legenda "padrão clínico relatado, não medição"); A (alternativa de teclado: 4 sliders para dias 1, 7, 14, 30).

### 11. Waffle dos 80%
- **Inspira:** "sala" de 1.500 pessoas do *Life after death?* (Pudding).
- **Stack:** grade CSS de 100 figuras SVG; `sibling-index()` para atraso escalonado (fallback `--i` inline).
- **Interação:** as 100 figuras atravessam os dias com o scroll; nas semanas 1–2, quase todas cinzas e trêmulas; na semana 3–4, 80 se acendem na cor de acento e param de tremer; 20 continuam, para não vender milagre.
- **Fallback:** waffle estático com 80 coloridas.
- **Wow:** ★★
- **Risco:** baixo.

### 12. Seção noturna: a abstinência
- **Inspira:** estética 1-bit de *Dithering* (visualrambling.space); estados do NYT.
- **Stack:** `@container style(--fase: abstinencia)` ou classe que troca tokens para modo escuro; shader de ruído/pontilhado em Canvas 2D ou regl; Recursive com eixos `MONO`/`CASL`/`slnt` oscilando; GSAP SplitText.
- **Interação:** ao entrar, a página escurece (quebra justificada do papel branco). Os 5 sintomas (ansiedade, irritabilidade, insônia, depressão, fissura) aparecem como palavras com tipografia **instável** (eixo casual oscilando, leve tremor, letras trocando de peso). Ao fim do dia 14 a tipografia assenta, o fundo clareia gradualmente até o papel branco na semana 4.
- **Fallback:** seção escura estática com tipografia normal.
- **Wow:** ★★★
- **Risco:** A (tremor e flicker: desligar sob reduced motion; contraste ≥ 4.5:1; sem flashes > 3/s).

### 13. Linha do tempo de 30 dias com recuperação dos receptores (time-lapse)
- **Inspira:** *Swept Away* (NYT, minuto a minuto); controles de transporte do *afterlife of pi*.
- **Stack:** Canvas 2D; scrub por scroll ou play/pausa/velocidade.
- **Interação:** um "relógio" de 30 dias; a cada dia a balança da seção 4 perde gremlins (pulam para fora), o set point sobe, e um mini-diagrama da sinapse repovoa receptores. Marcadores: dia 14 ("fim do pior"), dia 21–28 ("80%"), dia 30.
- **Fallback:** 4 quadros fixos (dias 1, 14, 21, 30).
- **Wow:** ★★
- **Risco:** C (não prometer cura; dizer "em média").

### 14. Pistas pareadas: café → cigarro
- **Inspira:** grafo de relações da Bloomberg; LOOPY de Nicky Case.
- **Stack:** SVG + d3-force (pequeno) ou layout fixo; anchor positioning para rótulos.
- **Interação:** o leitor clica em "café" e vê uma onda que acende "cigarro" (a associação). Ao remover só o cigarro, o café continua disparando fissura (o nó pisca vermelho); ao remover os dois, a corrente quebra. Opção de montar a própria corrente (ex.: celular na cama → rolar o feed).
- **Fallback:** diagrama estático de dois nós e uma seta.
- **Wow:** ★★
- **Risco:** baixo.

### 15. Largar um ou largar dois (comparação de cenários)
- **Inspira:** slope charts; comparação lado a lado de FlowingData.
- **Stack:** duas balanças do nº 4 lado a lado (mesmo motor, duas instâncias) + slope chart ilustrativo.
- **Interação:** cenário A: larga o álcool, mantém a nicotina (a balança recebe "cutucadas" constantes e demora a nivelar). Cenário B: larga os dois; nivela antes. Um terceiro modo: "largar um e substituir" — o leitor vê os gremlins migrarem para o novo vício.
- **Fallback:** slope chart estático com dois cenários.
- **Wow:** ★★
- **Risco:** C (Lembke cita estudos com desfechos melhores; não temos números — não inventar eixo quantitativo).

### 16. Medicação de meia-vida longa (peso fixo)
- **Inspira:** a própria metáfora.
- **Stack:** motor do nº 4.
- **Interação:** comparar "pico rápido" (peso que cai e some, gerando gremlins) com "peso estável" (buprenorfina/metadona: um bloco que fica e não chama gremlins).
- **Fallback:** dois quadros.
- **Wow:** ★
- **Risco:** C (tema médico: nota clara "converse com um profissional").

### 17. O experimento de 30 dias do leitor (tracker)
- **Inspira:** "seja o cientista da sua vida" (Lembke, 10:24); heatmap do OWID.
- **Stack:** HTML + `localStorage` (envolto em try/catch); `field-sizing: content` para notas; heatmap SVG de 30 células; exportar `.ics` (lembretes) ou `.csv`; Popover API para o registro do dia.
- **Interação:** o leitor escolhe o que vai largar e o par associado (ex.: café). Cada dia: humor 1–5, fissura 1–5, nota curta. A grade de 30 dias mostra a curva dele sobreposta à curva típica (nº 10). Nada sai do navegador.
- **Fallback:** PDF/print de uma grade em branco (CSS `@media print`).
- **Wow:** ★★★ (é o que faz o leitor voltar)
- **Risco:** C (privacidade: dizer explicitamente que fica só no aparelho; sem coleta); T (localStorage pode falhar em aba privada).

### 18. Cursor/toque como "fissura"
- **Inspira:** Codrops *Custom-shaped cursor trail* (TSL, 09/2026).
- **Stack:** Canvas 2D sobreposto, leve; no celular, só no toque.
- **Interação:** na seção da fissura, um rastro tênue segue o cursor e "puxa" em direção ao botão "usar de novo" (atração magnética sutil). Ao resistir (afastar o cursor por 3 s), o rastro enfraquece. Faz sentir a "puxada".
- **Fallback:** nada (efeito decorativo).
- **Wow:** ★★
- **Risco:** A (pode irritar; desligar com reduced motion; nunca mover o cursor real).

### Extra (bônus, mais arriscados)
- **Inclinar o celular inclina a balança** (DeviceOrientation; iOS pede permissão). ★★, risco T/A.
- **Háptico na dose** (`navigator.vibrate([30])` no Android; truque do `switch` no iOS só como bônus, pode ter sido corrigido no 26.5 [NV]). ★, risco baixo se opcional.
- **Gremlins em Rive** com state machine (idle, pulando, musculação). ★★★ visual, mas exige criar o `.riv` no editor (fora do arquivo HTML; precisaria virar base64 ou um arquivo separado no repositório).

---

## (e) Ofício de dataviz para este ensaio

**Camadas de anotação.** Separar três camadas: dado (marcas), anotação (texto e setas desenhadas à mão em SVG, posicionadas com anchor positioning quando o alvo é HTML) e narrativa (prosa). Rótulo direto no lugar da legenda. Uma anotação por passo de scroll.

**Transições entre tipos de gráfico.** As mesmas 4 substâncias passam por barra → curva no tempo → partículas → peso na balança. Manter cor e posição de cada substância constantes (constância de objeto). Ferramentas: View Transitions (Baseline) para elementos HTML; GSAP MorphSVG para paths SVG; Flubber como alternativa leve; Flip para reordenações.

**Tipologias que deixariam o dado de dopamina com cara nova:**

| Tipologia | Onde usar | Por quê |
|---|---|---|
| **Ridgeline** | Curvas de liberação das 4 substâncias empilhadas, mesma escala de tempo | Mostra pico e duração de uma vez, visual "sismógrafo" |
| **Horizon chart** | Humor ao longo de 30 dias (tracker), acima/abaixo do basal | Codifica positivo (prazer) e negativo (dor) em duas cores dobradas: é literalmente a balança no tempo |
| **Beeswarm** | 100 "pessoas" simuladas e o dia em que se sentiram melhor | Mostra a variância em torno de "semana 3–4" |
| **Slope chart** | Largar um × largar dois | Dois pontos, uma inclinação |
| **Waffle** | 80% de 100 | Mais concreto que uma porcentagem |
| **Radial / relógio** | 24 h de pistas (café da manhã → cigarro) | Pistas são ligadas a horários |
| **Stream graph** | Composição de "fontes de dopamina" num dia (feed, comida, café) | Mostra substituição de um vício por outro |
| **Gráfico de divergência** | Balança como barra divergente centrada no zero | Versão "séria" da gangorra para quem desliga a animação |

**Boas práticas 2025–26 observadas nos vencedores:**
- Personalização no início (NYT zodíaco, quiz da Reuters): o leitor entra com um palpite ou um dado próprio.
- Som como camada opcional (Guardian, Pudding *Life after death?*).
- Ilustração fundida ao dado (*Searching for Birds*): os gremlins devem ser glifos de dado, não decoração.
- Controles de transporte em simulações (*afterlife of pi*): play, passo, velocidade.
- Honestidade de escala: mostrar log e linear, dizer "em ratos".

---

## (f) Stack recomendado

**Base (sempre carregado, ~150 KB):**
- HTML/CSS da casa (Space Mono + sans do sistema, papel branco, uma família de acento em oklch com `color-mix()` e `light-dark()`).
- **CSS scroll-driven animations** como motor principal de scroll (agora Baseline), com `@supports` e **GSAP 3.15 + ScrollTrigger** como fallback/orquestração onde precisar de pin e scrub preciso.
- **View Transitions** para morph entre gráficos; **GSAP MorphSVG** para paths.
- **Matter.js 0.20** para a balança e os gremlins, com renderização própria em Canvas 2D.
- **Web Audio puro** para sonificação (Tone.js só se a trilha crescer).
- SVG inline para gráficos; D3 só `d3-scale` + `d3-shape` (ou funções próprias).
- Popover API + invoker commands para glossário e fontes.
- `localStorage` com try/catch para o tracker de 30 dias.

**Sob demanda (carregar só perto da seção):**
- **Three.js 0.186.1 WebGPURenderer + TSL** para a sinapse (fallback WebGL2 automático); versão Canvas 2D quando `prefers-reduced-motion` ou celular fraco (`navigator.hardwareConcurrency <= 4`).

**Fontes:** Space Mono (texto técnico) + **Recursive** variável (eixos MONO/CASL/slnt) para a seção de abstinência. Ambas no Google Fonts.

**Evitar:** Theatre.js (abandonado), Rapier (3,4 MB), p5 (1 MB sem ganho), Lenis/scroll-jacking, Houdini Paint (só Chromium), View Transitions entre documentos (falta Firefox).

**Movimento reduzido (`prefers-reduced-motion: reduce`):** cada widget tem um estado final estático; física vira "passo a passo" com botões; sem tremor tipográfico, sem confete, sem rastro de cursor; som continua opt-in.

**Celular:** balança e feed funcionam com toque; sinapse cai para Canvas 2D; small multiples viram carrossel com scroll snap; testar a 375 px.

**Quebra de estilo da casa justificada:** apenas na seção de abstinência (escura, pontilhada, tipografia instável), porque o contraste "noite → manhã" carrega o argumento central: o pior passa em 2 semanas e a página literalmente amanhece.
