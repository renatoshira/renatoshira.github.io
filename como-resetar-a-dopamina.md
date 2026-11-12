# Como resetar seu sistema de dopamina

**Ensaio interativo sobre a molécula que move, ensina e faz querer · estado da evidência em novembro de 2026 · por Renato Shirakashi**

> Subtítulo para o hero: *Meio milhão de neurônios, um sinal de surpresa e uma palavra da moda. O que é a dopamina, o que mexe nela de verdade e o que sobraria para resetar.*

> **Nota de formato.** Este é o roteiro completo, com a prosa final e a especificação de cada widget, gráfico e movimento. Ainda não há HTML. O ponto de partida é um trecho do Huberman Lab com a psiquiatra Anna Lembke, publicado em 10/11/2026 com o título "How to Reset Your Dopamine System & Overcome Addiction". O vídeo serve só como provocação. O ensaio trata da dopamina como sistema, e o vício ocupa duas das quinze seções. A pesquisa de apoio está em `dopamina-pesquisa/`: `dopamina-geral.md`, `dopamina-cotidiano-e-mitos.md`, `ciencia-factcheck.md`, `fronteira-e-dados.md`, `visual-sota.md`, `prior-art-e-estilo.md` e `estilo-escrita.md`. As seções são numeradas de 00 a 14, e há um widget ou mais por seção. Cada número foi conferido na fonte primária ou leva a marca `[CONFERIR]`, e as fontes estão no fim. Esta nota sai da versão final.

---

## Direção de arte e movimento

Esta parte vale para o ensaio inteiro. Os widgets só descrevem o que é próprio de cada um.

**Papel e tinta.** O fundo é o papel branco da casa (`--paper:#fff`, `--ink:#141414`, `--dim:#6b6b6b`, `--line:#e2e2e2`). A família de acento tem dois polos. `--dopa` é um âmbar quente (`oklch(72% 0.16 60)`) e marca tudo que é dopamina liberada, disparo ou sinal positivo. `--pausa` é um índigo fundo (`oklch(42% 0.14 275)`) e marca falta, pausa, erro negativo e o prato da dor na seção 10. Os dois se misturam com `color-mix()` perto do zero. A convenção vale para todos os gráficos.

**Cores fixas por coisa.** Cada recompensa ou substância ganha uma cor na primeira vez que aparece e a mantém até o fim (comida, música, café, nicotina, cocaína, anfetamina, metilfenidato, levodopa, apostas). A mesma cor marca a barra, a curva no tempo e o ponto no gráfico de PET, o que dá constância de objeto às transições entre tipos de gráfico.

**Tipografia.** Corpo na sans do sistema; títulos, rótulos e números em Space Mono, com algarismos tabulares. A seção 11 acrescenta Recursive, fonte variável do Google Fonts, cujos eixos `CASL`, `slnt` e `wght` reagem ao estado do widget.

**O neurônio-companheiro.** A partir da seção 00, um único neurônio de dopamina desenhado em traço fino fica preso à margem direita no desktop e ao canto inferior esquerdo no celular, com uns 64 px. Ele pisca em âmbar no ritmo tônico, cerca de quatro vezes por segundo, como um metrônomo discreto. Quando o leitor revela um dado que contraria o próprio palpite (seções 04, 09, 11 e 13), o neurônio dispara uma rajada de seis piscadas rápidas. Quando o palpite estava certo, ele continua no ritmo. Quando o leitor esperava um resultado que não veio, ele faz uma pausa de um quarto de segundo, em índigo. O companheiro é a seção 05 funcionando em miniatura do começo ao fim, e o leitor só descobre o que ele está fazendo ao chegar lá. Ele tem um botão de silenciar, some com `prefers-reduced-motion` e sob 360 px, e descreve o próprio estado em `aria-live` só quando o leitor pede.

**Princípios de movimento.**
1. Um movimento por ideia. A física real (Matter.js) fica na balança da seção 10 e no rato da seção 06. O resto usa interpolação.
2. O scroll move o tempo dentro do gráfico só quando o gráfico mostra tempo (seções 01, 04, 11 e 13). Nos outros, o scroll só revela.
3. As revelações por scroll usam CSS scroll-driven animations (`animation-timeline: view()`), Baseline desde 27/10/2026, com GSAP 3.15 e ScrollTrigger onde for preciso fixar e arrastar com precisão.
4. Trocas de tipo de gráfico usam View Transitions no mesmo documento. Caminhos SVG usam GSAP MorphSVG.
5. Durações: 180 ms para toque, 450 ms para revelação, 900 ms para queda de peso. Curva padrão `cubic-bezier(.2,.7,.2,1)`.
6. Com `prefers-reduced-motion: reduce`, cada widget mostra o estado final e troca a animação por botões `anterior` e `próximo`.

**Som (opcional).** Um botão `ouvir` no topo liga uma camada de Web Audio. O neurônio-companheiro vira um clique suave a 4 Hz, a rajada vira seis cliques a 20 Hz, e a pausa vira silêncio. Na seção 03, o som é a própria explicação. Nada toca sem gesto do leitor, e todo som tem equivalente visual.

**Pilha técnica.** Arquivo HTML único, como os outros ensaios.

| Peça | Biblioteca | Carregamento |
|---|---|---|
| Revelações por scroll | CSS nativo, GSAP 3.15.0 + ScrollTrigger | sempre |
| Morph de caminhos e texto | GSAP MorphSVG, SplitText | sempre |
| Balança (10) e rato (06) | Matter.js 0.20.0, renderizado em Canvas 2D próprio | sempre |
| Gráficos | SVG inline, `d3-scale`, `d3-shape` | sempre |
| O axônio (02) | Three.js 0.186.1 com WebGPURenderer e TSL, que cai para WebGL2 sozinho | só perto da seção, com `IntersectionObserver` e `import()` |
| Som | Web Audio puro | sob gesto |
| Respostas do leitor | `localStorage` dentro de `try/catch` | sempre |

Evitar Theatre.js, Rapier, p5, scroll-jacking e View Transitions entre documentos.

**Celular.** Tudo testado em 375 px. Pequenos múltiplos viram carrossel com `scroll-snap`. O axônio 3D cai para Canvas 2D quando `navigator.hardwareConcurrency <= 4`.

**Bilíngue.** `data-i18n` em cada nó de texto, dicionário PT/EN e a chave `rs_lang`, como nos outros ensaios.

---

## 00 · A pergunta

Em 10 de novembro de 2026, o canal Huberman Lab publicou um trecho de onze minutos com o título "How to Reset Your Dopamine System & Overcome Addiction" (como resetar seu sistema de dopamina e superar o vício). Nele, a psiquiatra Anna Lembke, de Stanford, explica o vício com a imagem de uma balança no cérebro e propõe trinta dias sem a droga de escolha. O título supõe três coisas: que existe um sistema de dopamina, que esse sistema tem um ponto de ajuste e que dá para devolvê-lo ao ponto original.

A palavra chegou ao título de um vídeo de neurociência depois de cinco anos de crescimento fora dos laboratórios. No Google, as buscas mundiais por "dopamine" mais que triplicaram entre 2018 e 2026. "Dopamine detox" saiu de quase zero em 2019 e chegou ao pico em novembro de 2024. No Brasil, quase ninguém busca o protocolo, e as buscas por "dopamina" tiveram o pico em junho de 2023, um ano depois da edição brasileira do livro de Lembke, *Nação Dopamina*.

Para saber o que um reset poderia mudar, é preciso saber o que a dopamina faz. Antes de começar, marque as funções que você acha que ela tem:

> **WIDGET 00 · `o-que-a-dopamina-faz`**
> **Tag:** a pergunta · marque o que você acha
> **Tipo:** HTML com seis cartões selecionáveis sobre o hero, que é um campo de pontos em Canvas 2D.
> **Referência:** os quizzes de abertura da Reuters e do *New York Times* em 2025 e 2026, que pedem uma resposta do leitor antes de qualquer gráfico; a abertura de "Mechanical Watch", de Ciechanowski, que põe o objeto em cena antes da explicação.
> **O que mostra:** no fundo, um campo de 170 mil pontos cinza muito pequenos, quase uma textura de papel. Um único ponto âmbar pisca no ritmo tônico. Na frente, seis cartões: `dar prazer`, `fazer querer`, `ensinar o que vale repetir`, `mover o corpo`, `controlar a prolactina`, `provocar náusea`.
> **Trabalho cognitivo:** registrar a crença do leitor antes do ensaio, para que ele veja depois quais funções conhecia.
> **Estado inicial:** cartões desmarcados, o ponto âmbar piscando.
> **Interação:** o leitor marca quantos quiser e toca em `guardar`. A resposta fica no `localStorage`. O resultado só aparece na seção 14, com a correção de cada cartão.
> **Motion:** ao guardar, os cartões encolhem e o ponto âmbar voa para a margem, onde vira o neurônio-companheiro (View Transition). O campo de pontos permanece até a seção 02.
> **Celular/acessibilidade:** cartões em grade 2 × 3, com `aria-pressed`. O campo de pontos é decorativo (`aria-hidden`).
> **Legenda:** nenhuma no hero.

---

## 01 · A molécula do movimento

A dopamina foi descoberta como a molécula que faz o corpo se mexer. Até meados dos anos 1950, os farmacologistas a tratavam como um degrau na fabricação da noradrenalina, sem função própria. Em 1957, o farmacologista sueco Arvid Carlsson deu reserpina a coelhos e camundongos. A reserpina, então usada contra pressão alta e psicose, esvazia os estoques de várias moléculas de sinalização do cérebro. Os animais ficaram imóveis, de pálpebras caídas. Carlsson injetou L-DOPA, a matéria-prima da dopamina, e os coelhos voltaram a andar em poucos minutos. No ano seguinte, ele mostrou que a recuperação acompanhava a volta da dopamina ao cérebro, e não a da noradrenalina. No modelo abaixo, arraste a seringa de reserpina até o coelho e depois a de L-DOPA:

> **WIDGET 01a · `o-coelho-de-carlsson`**
> **Tag:** a descoberta · aplique as duas seringas
> **Tipo:** SVG com um coelho desenhado em traço da casa e um medidor vertical de dopamina no cérebro.
> **Referência:** as ilustrações-dado de "Searching for Birds" (2025), em que o desenho é o próprio gráfico; as demonstrações de causa e efeito de Nicky Case.
> **O que mostra:** um coelho de perfil, uma seringa marcada `reserpina` e outra `L-DOPA`, e um medidor ao lado com a dopamina do estriado.
> **Trabalho cognitivo:** apresentar a dopamina pelo movimento, antes de qualquer menção a prazer.
> **Estado inicial:** coelho mexendo as orelhas, medidor cheio.
> **Interação:** arrastar a seringa até o coelho. Com reserpina, o medidor esvazia e o coelho para, com as pálpebras caindo. Com L-DOPA, o medidor sobe e o coelho volta a andar. Um cronômetro estilizado mostra "16 horas" depois da reserpina e "cerca de 15 minutos" depois da L-DOPA.
> **Motion:** a parada do coelho é uma desaceleração de 1,2 s; a volta começa pelas orelhas, depois as patas.
> **Celular/acessibilidade:** botões `aplicar reserpina` e `aplicar L-DOPA` no lugar do arrasto. `aria-live`: "O coelho está imóvel. Dopamina no estriado: quase zero."
> **Legenda:** Carlsson, Lindqvist e Magnusson (*Nature*, 1957); Carlsson et al. (*Science*, 1958). O tempo de 15 minutos vem de relatos históricos. `[CONFERIR: tempo de recuperação no texto de 1957]`

A ligação com uma doença humana veio em 1960. O farmacologista austríaco Oleh Hornykiewicz mediu a dopamina no cérebro de seis pessoas que tinham morrido com doença de Parkinson e encontrou no estriado, a região que comanda o início dos movimentos, cerca de um décimo do normal. Em 1961, ele e o neurologista Walther Birkmayer injetaram L-DOPA em vinte pacientes, e a lentidão dos movimentos sumiu por algumas horas. Em 1967, George Cotzias mostrou que doses orais altas, aumentadas devagar, davam um efeito duradouro. A levodopa foi aprovada nos Estados Unidos em 1970 e continua sendo o tratamento de primeira linha do Parkinson. Em 2000, Carlsson dividiu o Nobel de Medicina com Paul Greengard e Eric Kandel. Hornykiewicz ficou de fora, e cerca de 230 cientistas assinaram uma carta de protesto. `[CONFERIR: "cerca de um décimo" em Ehringer e Hornykiewicz 1960]`

A L-DOPA funciona porque o cérebro fabrica dopamina numa linha de montagem com duas etapas. A tirosina, um aminoácido da comida, vira L-DOPA pela ação de uma enzima chamada tirosina hidroxilase, e a L-DOPA vira dopamina por outra enzima, rápida e pouco controlada. A primeira etapa decide a velocidade de tudo. A dopamina do sangue não atravessa a barreira que protege o cérebro, e a L-DOPA atravessa. Desligue uma estação de cada vez e acompanhe o que chega ao fim da linha:

> **WIDGET 01b · `a-linha-de-montagem`**
> **Tag:** a síntese · desligue uma enzima
> **Tipo:** SVG com quatro estações em fila, como uma esteira.
> **Referência:** as peças com código de cor de "Mechanical Watch", de Ciechanowski; os diagramas de fluxo de fábrica dos livros de David Macaulay.
> **O que mostra:** tirosina → (tirosina hidroxilase) → L-DOPA → (descarboxilase) → dopamina → (dopamina beta-hidroxilase) → noradrenalina. Um muro tracejado separa o sangue do cérebro, com a L-DOPA passando por uma porta e a dopamina batendo no muro. Abaixo da esteira, um contador de dopamina produzida por minuto.
> **Trabalho cognitivo:** mostrar o gargalo da produção e explicar por que dar tirosina adianta pouco (seção 09) e dar L-DOPA adianta muito.
> **Estado inicial:** esteira rodando, moléculas como pequenos hexágonos de traço passando de estação em estação, cada uma mudando de cor na passagem.
> **Interação:** tocar numa enzima a desliga. Sem tirosina hidroxilase, nada sai. Um controle `mais tirosina` enche a entrada e quase não muda o contador. Um botão `dar L-DOPA` injeta moléculas depois do gargalo e o contador sobe.
> **Motion:** a esteira anda a velocidade constante; a fila acumula visivelmente antes da estação do gargalo quando a entrada aumenta.
> **Celular/acessibilidade:** a esteira fica vertical. Cada estação tem rótulo e `aria-label`.
> **Legenda:** A tirosina hidroxilase limita a produção. A levodopa é dada hoje com carbidopa, que impede a conversão fora do cérebro e permite dose cerca de quatro a cinco vezes menor.

---

## 02 · Meio milhão

O cérebro humano tem cerca de 86 bilhões de neurônios. Os que fabricam dopamina e a soltam no resto do cérebro somam cerca de meio milhão, agrupados em dois núcleos pequenos no mesencéfalo, a substância negra e a área tegmental ventral. É um neurônio de dopamina para cada 170 mil. O campo de pontos que estava atrás do título tem 170 mil pontos. Aproxime a imagem até encontrar o ponto âmbar e então toque nele:

> **WIDGET 02a · `ache-o-neuronio`**
> **Tag:** a escala · encontre o ponto
> **Tipo:** Canvas 2D com zoom contínuo (pinça ou roda do mouse) sobre o campo de pontos do hero.
> **Referência:** "The Size of Space" e "The Deep Sea", de Neal Agarwal; os zooms de "Powers of Ten" (Eames, 1977) refeitos com scroll.
> **O que mostra:** 170 mil pontos cinza e um âmbar. Ao tocar no âmbar, ele dispara e lança uma árvore de axônio que cobre uma fatia grande do campo em 2 segundos.
> **Trabalho cognitivo:** contrastar a raridade dos neurônios com o alcance de cada um.
> **Estado inicial:** campo inteiro visível, com um círculo pulsante indicando a região onde o ponto está, para quem não quiser procurar.
> **Interação:** zoom e arrasto. Botão `mostrar` leva direto ao ponto.
> **Motion:** a árvore cresce por ramificação recursiva (L-system), com os ramos ficando mais finos a cada bifurcação.
> **Celular/acessibilidade:** o campo tem 40 mil pontos no celular, com o texto ajustado para manter a proporção de 1 em 170 mil em escala. Botão `mostrar` em destaque.
> **Legenda:** Cerca de 86 bilhões de neurônios (Azevedo et al., 2009) e cerca de meio milhão de neurônios de dopamina no mesencéfalo humano (Pakkenberg et al., 1991; faixa de 400 a 600 mil). `[CONFERIR: faixa de 400 a 600 mil em Björklund e Dunnett 2007]`

Cada um desses neurônios alcança muito longe. Em 2009, Wakoto Matsuda e colegas reconstruíram oito neurônios de dopamina de ratos, um por um, seguindo cada ramo. O axônio de um único neurônio somava em média 46,7 centímetros dentro do estriado, num cérebro com cerca de dois centímetros de comprimento, e cobria em média 2,7% do volume da região. Em 2012, Paul Bolam e Eleftheria Pissadaki estimaram o que isso significaria num cérebro humano: cerca de 4,5 metros de axônio e de 1 milhão a 2,4 milhões de sinapses por neurônio. Um neurônio típico do estriado faz de 300 a 500 sinapses. Desenrole o axônio de um neurônio humano e compare com as coisas ao lado:

> **WIDGET 02b · `desenrole-o-axonio`**
> **Tag:** o alcance · desenrole o axônio
> **Tipo:** Three.js com WebGPURenderer (axônio como tubo procedural gerado em TSL); versão Canvas 2D no celular fraco.
> **Referência:** os experimentos de geometria procedural da Codrops em 2026; as reconstruções de neurônios do projeto MouseLight (Janelia), redesenhadas em tinta sobre papel.
> **O que mostra:** primeiro, a árvore de axônio enovelada dentro de um estriado translúcido. Um controle estica o novelo numa linha reta, que passa por uma pessoa de 1,70 m, uma mesa e um carro, até chegar a 4,5 m. Depois, um gráfico de barras em escala logarítmica com sinapses por neurônio: neurônio espinhoso médio do estriado (cerca de 400), interneurônio rápido (cerca de 5 mil), neurônio de dopamina de rato (até 245 mil), neurônio de dopamina humano (até 2,4 milhões, tracejado por ser estimativa).
> **Trabalho cognitivo:** dar escala física a um número que, solto, não se imagina, e mostrar que a dopamina fala com uma população inteira.
> **Estado inicial:** o novelo girando devagar dentro do estriado.
> **Interação:** controle `desenrolar` (0 a 100%). Arrastar gira a vista. Botão `ver as sinapses` troca a cena pelo gráfico de barras com uma View Transition.
> **Motion:** o desenrolar é contínuo e preso ao controle; as comparações (pessoa, mesa, carro) entram em fade quando a linha passa por elas.
> **Celular/acessibilidade:** carregado só a 1,5 tela de distância. Com movimento reduzido, três quadros fixos. Texto equivalente com os quatro números.
> **Legenda:** Matsuda et al. (*J Neurosci*, 2009), oito neurônios de rato. Bolam e Pissadaki (*Mov Disord*, 2012), estimativa humana que supõe a mesma densidade de inervação do rato. O número humano nunca foi medido.

Bolam e Pissadaki propõem que esse tamanho tem um custo. Manter metros de axônio e milhões de sinapses consome muita energia, e isso ajudaria a explicar por que esses neurônios estão entre os primeiros a morrer no Parkinson.

Grande parte da dopamina também se espalha em vez de ir a um alvo só. A maioria dos terminais de dopamina não forma uma sinapse fechada com um neurônio vizinho. A dopamina sai, se difunde pelo espaço entre as células e alcança receptores a alguns micrômetros de distância, como um regador sobre um canteiro. Os quatro caminhos principais por onde ela viaja estão desenhados abaixo como linhas de metrô. Toque numa linha para ver o que ela faz e qual remédio mexe nela:

> **WIDGET 02c · `as-quatro-linhas`**
> **Tag:** as vias · toque numa linha
> **Tipo:** SVG com um corte sagital do cérebro em traço e quatro linhas coloridas em estilo de mapa de metrô.
> **Referência:** os mapas de metrô esquemáticos de Harry Beck; os mapas de rede da Bloomberg Graphics.
> **O que mostra:** nigroestriatal (substância negra ao estriado dorsal: movimento e hábitos), mesolímbica (área tegmental ventral ao núcleo accumbens: motivação e aprendizado por recompensa), mesocortical (área tegmental ventral ao córtex pré-frontal: memória de trabalho), tuberoinfundibular (hipotálamo à hipófise: freio da prolactina). Cada estação final tem um ícone do que falha quando a linha é bloqueada.
> **Trabalho cognitivo:** mostrar que "o sistema de dopamina" é pelo menos quatro sistemas com funções diferentes.
> **Estado inicial:** as quatro linhas desenhadas, sem destaque.
> **Interação:** tocar numa linha destaca o trajeto e abre um cartão com a função, a doença ligada e o remédio (levodopa, antipsicótico, metilfenidato, metoclopramida). Um interruptor `regador` troca a vista para uma ampliação de um terminal, com dopamina se difundindo num raio de cerca de 7 µm.
> **Motion:** um trem de pontos âmbar percorre a linha escolhida em 1,5 s.
> **Celular/acessibilidade:** as linhas viram uma lista com mini-mapas. `aria-label` por linha.
> **Legenda:** Björklund e Dunnett (2007). O raio de cerca de 7 µm vem de Cragg e Rice. `[CONFERIR: raio de influência em Cragg e Rice]`

---

## 03 · Dois ritmos

Um neurônio de dopamina em repouso dispara sozinho, de forma regular, cerca de quatro a cinco vezes por segundo. Anthony Grace e Benjamin Bunney descreveram esse ritmo em 1984 e mostraram que ele continua mesmo numa fatia de cérebro isolada. Às vezes o neurônio sai do ritmo e solta uma rajada de dois a dez disparos a 15 ou 30 por segundo, que dura de um décimo a três décimos de segundo. Outras vezes ele se cala pelo mesmo tempo. O ritmo regular mantém um nível de fundo de dopamina, e as rajadas e os silêncios mandam sinais rápidos por cima desse fundo.

Os receptores leem os dois sinais de forma diferente. Há cinco tipos de receptor de dopamina, agrupados em duas famílias. Os da família D2 são muito sensíveis e já ficam parcialmente ocupados com o nível de fundo. Os da família D1 são menos sensíveis e respondem sobretudo às rajadas. Ligue o som, ouça o ritmo de fundo e toque nos dois botões:

> **WIDGET 03 · `o-metronomo-e-a-rajada`**
> **Tag:** os ritmos · ouça o neurônio
> **Tipo:** Web Audio e SVG. Em cima, um traçado de disparos em tempo real; embaixo, duas curvas de ocupação de receptor.
> **Referência:** as gravações sonoras de neurônios nos laboratórios de eletrofisiologia; "Sound", de Ciechanowski, que usa som como explicação; "Dithering, Part I", vencedor da Pudding Cup 2025, pela ideia de uma frase curta por estado.
> **O que mostra:** um traçado de tracinhos verticais rolando da direita para a esquerda, com um clique a cada disparo. Abaixo, duas curvas de ocupação ao longo do tempo: D2 (alta, oscilando pouco) e D1 (baixa, saltando nas rajadas).
> **Trabalho cognitivo:** fazer o leitor ouvir a diferença entre o fundo e o sinal, e ver que receptores diferentes leem cada um.
> **Estado inicial:** sem som até o gesto. O traçado já roda a 4 Hz, mudo, com o botão `ouvir` em destaque.
> **Interação:** `surpresa` dispara uma rajada de seis cliques a 20 Hz; `decepção` produz 250 ms de silêncio. Um controle `ritmo de fundo` (1 a 8 Hz) mostra a ocupação de D2 acompanhando o fundo.
> **Motion:** a rajada aparece como um feixe denso de tracinhos âmbar; o silêncio como um trecho vazio sombreado de índigo. O neurônio-companheiro na margem repete o mesmo evento.
> **Celular/acessibilidade:** vibração curta no Android na rajada, se o leitor permitir. Legendas visuais para cada som. `aria-live`: "Rajada: seis disparos em três décimos de segundo."
> **Legenda:** Grace e Bunney (*J Neurosci*, 1984). As curvas de ocupação são esquemáticas. `[CONFERIR: diferença de afinidade entre D1 e D2 numa revisão primária; o dossiê traz "cerca de cem vezes" de fonte secundária]`

O neurônio na margem da página toca o mesmo ritmo desde a seção 00. Ele dispara rajadas e faz pausas em alguns momentos do ensaio, e a razão aparece na seção 05.

---

## 04 · Como se mede

Quase todos os números de dopamina que circulam vêm de experimentos com ratos e de uma técnica chamada microdiálise. Os pesquisadores implantam uma sonda fina no cérebro e recolhem, a cada dez ou vinte minutos, um pouco do líquido que banha os neurônios. O resultado sai como porcentagem do nível de repouso do próprio animal, o nível basal. No vídeo do Huberman Lab, Lembke cita quatro desses números: o chocolate eleva a dopamina 55% acima do basal, o sexo 100%, a nicotina 150% e a metanfetamina 1.000%. Antes de ver as barras, arraste cada uma até a altura que você acha certa:

> **WIDGET 04a · `a-barra-que-nao-cabe`**
> **Tag:** os números · aposte e role
> **Tipo:** SVG; primeiro um palpite com alças arrastáveis, depois barras reveladas com CSS scroll-driven animation.
> **Referência:** "You Draw It" do *New York Times*; "The Size of Life", de Neal Agarwal; as escalas que estouram a coluna nos gráficos da The Pudding.
> **O que mostra:** quatro barras horizontais na largura da coluna de texto. Chocolate e sexo cabem com folga, a nicotina encosta na margem, e a barra da metanfetamina rompe a coluna, atravessa a margem e sai da tela pela direita. Os palpites do leitor ficam como contornos tracejados por cima.
> **Trabalho cognitivo:** fazer o leitor sentir a distância entre uma recompensa natural e um estimulante, e preparar a correção que vem a seguir.
> **Estado inicial:** as quatro alças a 100%; depois do palpite, as barras com a última cortada por um sinal de quebra e o rótulo "11 vezes o basal".
> **Interação:** arrastar as alças, `revelar`, depois `escala logarítmica`.
> **Motion:** as barras crescem com o scroll. Quando a última passa da margem, o gráfico inteiro dá um zoom out de 450 ms e as três primeiras viram tocos. Se o palpite do leitor ficou abaixo de metade do valor real, o neurônio-companheiro dispara uma rajada.
> **Celular/acessibilidade:** barras verticais, com a última subindo além do topo da tela. Tabela equivalente.
> **Legenda:** Dopamina extracelular no núcleo accumbens de ratos, em % acima do nível basal, segundo Lembke. A origem e a correção desses números estão no parágrafo seguinte.

Os quatro números vêm de dois slides de um material didático do National Institute on Drug Abuse, dos Estados Unidos, feito no fim dos anos 1990, que junta três estudos com ratos (Di Chiara e Imperato, 1988; Fiorino e Phillips, 1997; Bassareo e Di Chiara, 1999). Nos gráficos originais, a comida chega a cerca de 50% acima do basal, o sexo a 95% e a cocaína a cerca de 230%. O pico de 1.000% pertence à anfetamina, uma prima da metanfetamina, e foi medido como porcentagem do basal, o que dá dez vezes o repouso, ou 900% acima dele. A nicotina chega a cerca de 120% acima. A comida do experimento era um salgadinho italiano de milho e queijo chamado Fonzies.

Cada amostra de microdiálise junta dez a vinte minutos de dopamina num único número. A rajada da seção 03 dura cerca de dois décimos de segundo, e caberiam seis mil delas numa amostra de vinte minutos. Desde os anos 1980, outras técnicas encurtaram essa janela. A voltametria rápida, com uma fibra de carbono mais fina que um fio de cabelo, mede a cada décimo de segundo. Sensores fluorescentes criados em 2018 fazem a dopamina brilhar dentro do cérebro de camundongos em dezenas de milissegundos. Em pessoas vivas, quase tudo o que se sabe vem da tomografia por emissão de pósitrons (PET), que leva de uma hora a uma hora e meia para produzir um número e mede a dopamina de forma indireta. No gráfico abaixo, a curva de cima é um sinal de dopamina com rajadas. Escolha uma técnica e veja o que ela registra desse sinal:

> **WIDGET 04b · `a-regua-do-tempo`**
> **Tag:** os instrumentos · escolha a técnica
> **Tipo:** SVG com dois painéis: em cima, um eixo logarítmico de 1 milissegundo a 1 hora com as técnicas como faixas; embaixo, um sinal simulado e a versão filtrada pela técnica escolhida.
> **Referência:** "The Scale of the Universe", de Cary e Michael Huang; os quadros de "amostragem e borrão" de "Dithering, Part I".
> **O que mostra:** faixas no eixo de tempo: registro elétrico de um neurônio (cerca de 1 ms), sensores GRAB-DA e dLight (10 a 100 ms, 2018), voltametria rápida (cerca de 100 ms; em humanos desde 2011, durante cirurgias), microdiálise (10 a 20 min, 1984 a 1988), PET (60 a 90 min por número). Embaixo, um sinal de 20 minutos com rajadas e pausas.
> **Trabalho cognitivo:** mostrar que o número de dopamina depende do instrumento, e que os números de rato e os de gente medem coisas diferentes.
> **Estado inicial:** voltametria selecionada, o sinal de baixo quase idêntico ao de cima.
> **Interação:** tocar numa faixa. Com microdiálise, as rajadas viram uma colina suave e um único degrau. Com PET, tudo vira um só número no fim, com uma barra de incerteza. Um contador mostra "rajadas que cabem nesta janela".
> **Motion:** a curva de baixo faz morph para a versão filtrada em 600 ms, como se um pano a alisasse.
> **Celular/acessibilidade:** os dois painéis empilhados; a régua rola na horizontal.
> **Legenda:** Kishida et al. (*PLoS One*, 2011; *PNAS*, 2016); Sun et al. (*Cell*, 2018); Patriarchi et al. (*Science*, 2018). O sinal é simulado.

---

## 05 · O sinal de surpresa

Wolfram Schultz gravou neurônios de dopamina de macacos nos anos 1980 e 1990. O macaco via uma luz e, um segundo depois, recebia uma gota de suco. No começo, os neurônios disparavam uma rajada quando o suco chegava. Depois de muitas repetições, passaram a disparar quando a luz acendia e a ficar no ritmo de fundo na chegada do suco. Quando o suco esperado não vinha, eles se calavam por um instante. Em 1997, Schultz, Peter Dayan e Read Montague descreveram esse sinal na *Science* como um erro de previsão, a diferença entre o que o animal esperava e o que recebeu. No modelo abaixo, cada toque em `próximo ensaio` repete a luz e o suco. Repita até o disparo mudar de lugar e então tire o suco:

> **WIDGET 05a · `treine-o-neuronio`**
> **Tag:** o erro de previsão · treine o neurônio
> **Tipo:** SVG com um raster de disparos (uma fileira por ensaio) e um histograma acima, como nas figuras de Schultz.
> **Referência:** a figura 1 de Schultz, Dayan e Montague (1997); a lição de 3Blue1Brown sobre redes neurais, que mostra o número nascendo na frente do leitor.
> **O que mostra:** uma linha do tempo de um ensaio com os marcadores `luz` e `suco`. Cada ensaio acrescenta uma fileira de tracinhos.
> **Trabalho cognitivo:** mostrar que o sinal se desloca da recompensa para a pista que a prevê e que a falta de uma recompensa esperada produz uma pausa.
> **Estado inicial:** cinco fileiras desenhadas, com o pico no suco.
> **Interação:** `próximo ensaio`, `20 ensaios`, `tirar o suco`. Um controle `chance de suco` (0% a 100%) faz aparecer, entre a luz e o suco, uma rampa de disparo mais alta em 50% (Fiorillo, Tobler e Schultz, 2003), que volta na seção 12.
> **Motion:** cada fileira cai de cima em 200 ms; o pico do histograma desliza para a esquerda com o aprendizado. Quando o leitor tira o suco, o neurônio-companheiro faz a mesma pausa índigo, e um rótulo aparece ao lado dele pela primeira vez: "este neurônio reage às suas surpresas".
> **Celular/acessibilidade:** 20 fileiras no celular, 40 no desktop. `aria-live`: "Ensaio 18. Rajada na luz. Ritmo de fundo no suco."
> **Legenda:** Modelo do sinal descrito por Schultz, Dayan e Montague (1997). A velocidade do aprendizado é ilustrativa.

Repare que o neurônio deixa de reagir ao suco quando o suco fica previsível. O sinal de dopamina marca a surpresa. O neurônio na margem da página fez a mesma coisa com as suas respostas. Ele disparou uma rajada quando a barra da metanfetamina passou muito do seu palpite, e vai se calar quando um resultado esperado não aparecer.

A ideia de aprender pela surpresa nasceu na psicologia e passou pela computação antes de chegar ao neurônio. Em 1972, Robert Rescorla e Allan Wagner propuseram que um animal aprende na proporção da diferença entre o que esperava e o que aconteceu. Em 1988, Richard Sutton transformou a ideia num algoritmo de aprendizado por diferença temporal, com o qual a máquina aprende sozinha a prever recompensas futuras. Os dados de Schultz mostraram que os neurônios de dopamina calculam algo muito parecido com o erro desse algoritmo. A mesma família de algoritmos ajudou o programa AlphaGo, da DeepMind, a vencer o campeão Lee Sedol em 2016. Em março de 2025, Sutton e Andrew Barto receberam o Prêmio Turing pelos fundamentos do aprendizado por reforço.

A troca continuou no sentido contrário. Em 2017, pesquisadores da DeepMind mostraram que agentes de inteligência artificial aprendem melhor quando preveem a distribuição inteira das recompensas possíveis, em vez de só a média. Em 2020, Will Dabney e colegas procuraram isso em neurônios de dopamina de camundongos e encontraram: cada neurônio tem um ponto de referência próprio, alguns otimistas e outros pessimistas, e juntos eles codificam a distribuição. Escolha uma loteria e veja como cada neurônio do coral aprende:

> **WIDGET 05b · `o-coral`**
> **Tag:** a distribuição · escolha a loteria
> **Tipo:** SVG com uma fileira de 20 neurônios-personagem, do mais pessimista ao mais otimista, e um histograma reconstruído abaixo.
> **Referência:** Dabney et al. (*Nature*, 2020), figura 4; os personagens-dado de "The Evolution of Trust", de Nicky Case.
> **O que mostra:** 20 neurônios desenhados como pequenos círculos com uma expressão que vai do franzido ao sorridente. Cada um tem uma marca vertical no seu ponto de referência. Abaixo, a distribuição de recompensas que a população reconstrói.
> **Trabalho cognitivo:** mostrar que duas loterias com a mesma média produzem padrões diferentes no coral, e ligar a neurociência à inteligência artificial com um exemplo concreto.
> **Estado inicial:** loteria `sempre 5`, todos os pontos de referência juntos no 5.
> **Interação:** duas loterias, `sempre 5` e `metade 1, metade 9`. Botão `tocar 100 rodadas`. Na segunda loteria, os pessimistas descem para perto de 1, os otimistas sobem para perto de 9, e o histograma de baixo mostra duas colinas. Um interruptor `modo IA` troca os rostos por barras de um agente de aprendizado distribucional, com o mesmo resultado.
> **Motion:** a cada rodada, um ponto cai na loteria e cada neurônio pisca âmbar ou índigo conforme o valor fica acima ou abaixo do seu ponto; os pontos de referência deslizam devagar.
> **Celular/acessibilidade:** 10 neurônios no celular. Texto equivalente com a média e as duas colinas.
> **Legenda:** Dabney et al. (*Nature*, 2020); Lowet et al. (*Nature*, 2025), que encontraram no estriado neurônios com receptor D1 lendo o lado melhor que o esperado e com D2 lendo o lado pior. Os dados de Dabney vêm de poucos animais.

---

## 06 · Querer

Se a dopamina marca surpresa e ensina o que vale repetir, resta saber se ela também produz o prazer. Em 1998, Kent Berridge e Terry Robinson destruíram até 99% da dopamina de ratos com uma toxina. Os ratos continuaram a fazer a careta de satisfação diante de água com açúcar, a mesma dos ratos normais, e a careta de nojo diante do quinino. Eles deixaram de ir atrás da comida. Berridge chamou de querer o impulso de ir atrás, que depende da dopamina, e de gostar a reação de satisfação, que depende de opioides agindo num ponto de cerca de um milímetro cúbico no núcleo accumbens.

John Salamone mediu o querer como esforço. Em 1991, ele deu a ratos com fome uma escolha: apertar uma alavanca cinco vezes por uma pelota doce ou comer de graça a ração comum que estava no chão da gaiola. Os ratos normais trabalhavam pela pelota. Com uma dose baixa de um bloqueador de dopamina, passavam a comer a ração e comiam a mesma quantidade total. O apetite e o gosto pelo doce continuavam lá. O que caía era a disposição de pagar pelo doce com esforço. No modelo abaixo, você é o rato. Baixe a dopamina e tente continuar apertando a alavanca:

> **WIDGET 06a · `o-rato-de-salamone`**
> **Tag:** o esforço · aperte a alavanca
> **Tipo:** Canvas 2D com Matter.js (a alavanca tem mola e peso), uma gaiola em traço e um contador de pelotas e de ração.
> **Referência:** os jogos explicativos de Nicky Case ("Adventures with Anxiety", "The Evolution of Trust"); os protótipos de Bret Victor em "Explorable Explanations", em que o controle tem consequência física.
> **O que mostra:** um rato em vista lateral, a alavanca à esquerda com a pelota doce atrás e a ração no chão à direita. Um controle `dopamina` (100% a 20%). Dois contadores: pelotas e ração.
> **Trabalho cognitivo:** fazer o leitor sentir que a dopamina baixa tira a disposição de se esforçar, sem tirar a fome nem o gosto.
> **Estado inicial:** dopamina em 100%, cinco cliques na alavanca soltam uma pelota.
> **Interação:** o leitor clica na alavanca. A cada redução da dopamina, a alavanca fica visualmente mais pesada (a mola endurece e o clique precisa ser segurado por mais tempo), e o rato olha para a ração com mais frequência. Se o leitor parar de clicar por três segundos, o rato vai para a ração sozinho. Um botão `labirinto` troca para a versão em T de Cousins e Salamone: quatro pelotas atrás de uma barreira de 30 cm ou duas sem barreira.
> **Motion:** a alavanca balança com física; o rato anda com um ciclo de quatro quadros desenhados.
> **Celular/acessibilidade:** clique substituído por toque longo. Contadores anunciados em `aria-live`.
> **Legenda:** Salamone et al. (*Psychopharmacology*, 1991); Salamone e Correa (*Neuron*, 2012). Em humanos, Treadway et al. (2012) encontraram mais liberação de dopamina no estriado em quem aceitava tarefas mais trabalhosas por dinheiro. `[CONFERIR: porcentagens de mudança nos gráficos de Salamone 1991]`

Os estudos em humanos mostram o mesmo padrão. Brian Knutson mostrou em 2001, com ressonância magnética, que o núcleo accumbens se ativa quando a pessoa espera ganhar dinheiro, e quase nada quando o dinheiro chega. Em 2009, Tali Sharot deu levodopa a voluntários enquanto eles imaginavam férias em lugares diferentes. Mais tarde, eles avaliaram como mais prazerosas as férias imaginadas sob efeito da levodopa. A dopamina mudou a previsão do prazer. Em 2002, Troels Kjaer mediu com PET um aumento de dopamina durante uma sessão de meditação guiada, e os participantes relataram menos vontade de agir, com prazer e relaxamento iguais aos da condição de controle. Em 2017, um estudo com PET mostrou que meia hora rindo com amigos libera opioides do próprio corpo. Os dados de humanos têm uma exceção conhecida: em 2019, Laura Ferreri deu levodopa a 27 pessoas, e elas relataram mais prazer ao ouvir música.

O ensaio [Como querer menos](como-querer-menos.html) trata do querer e do gostar na vida cotidiana. Para esta página, basta guardar que a dopamina pesa mais no querer, no esforço e na expectativa do que na satisfação de receber.

---

## 07 · Mais nem sempre é melhor

A dopamina no córtex pré-frontal, a parte da frente do cérebro que segura informações por alguns segundos e controla a atenção, segue uma curva em U invertido. Com pouca, a memória de trabalho falha. Com muita, também falha. Roshan Cools e Mark D'Esposito reuniram os estudos em 2011. A bromocriptina, que imita a dopamina, melhorou a memória de trabalho de quem tinha pouca capacidade e piorou a de quem tinha muita. Em 2020, um estudo deu 2 gramas de tirosina, a matéria-prima da dopamina, a 45 jovens. A média do grupo não mudou, porque os que iam mal melhoraram e os que iam bem pioraram. Mova as três pessoas da curva com o mesmo remédio:

> **WIDGET 07a · `o-u-invertido`**
> **Tag:** a dose · dê o mesmo remédio a todos
> **Tipo:** SVG com uma curva em U invertido e três bolinhas sobre ela.
> **Referência:** as curvas de dose e resposta dos livros de farmacologia, redesenhadas com rótulo direto; as bolinhas-personagem da The Pudding.
> **O que mostra:** eixo horizontal "dopamina no córtex pré-frontal", vertical "memória de trabalho". Três bolinhas: uma à esquerda da curva (pouca dopamina), uma no topo e uma à direita.
> **Trabalho cognitivo:** desmontar a ideia de que mais dopamina é sempre melhor.
> **Estado inicial:** as três bolinhas paradas.
> **Interação:** botão `mesma dose para os três` desloca as três para a direita; a da esquerda sobe, a do topo desce um pouco, a da direita cai. Um seletor troca o rótulo do remédio (bromocriptina, tirosina, tolcapona). Com a tolcapona, as bolinhas ganham rótulos genéticos (Val/Val, Val/Met, Met/Met) e o leitor vê o resultado de Farrell et al. (2012).
> **Motion:** as bolinhas deslizam pela curva com uma mola leve; a média do grupo aparece como uma linha horizontal tracejada que quase não se move.
> **Celular/acessibilidade:** curva em largura total; valores no `aria-valuetext`.
> **Legenda:** Cools e D'Esposito (*Biol Psychiatry*, 2011); Jongkees et al. (2020); Farrell et al. (2012). Os efeitos genéticos isolados são pequenos e pouco replicados em amostras grandes.

A mesma lógica de janela estreita aparece nos remédios que bloqueiam a dopamina. Em 1976, o grupo de Philip Seeman, na *Nature*, e o de Solomon Snyder, na *Science*, compararam os antipsicóticos usados na clínica. A dose diária de cada um acompanhava a força com que ele se prendia ao receptor que hoje se chama D2. A relação cobria três ordens de grandeza. A afinidade por outros receptores não seguia o mesmo padrão:

> **WIDGET 07b · `o-grafico-de-seeman`**
> **Tag:** os antipsicóticos · troque o receptor
> **Tipo:** SVG com gráfico de dispersão em escala log-log.
> **Referência:** o gráfico original de Seeman et al. (1976), um dos mais reproduzidos da psicofarmacologia; os gráficos de dispersão com rótulo ao passar o mouse do *Financial Times*.
> **O que mostra:** cada ponto é um antipsicótico (espiperona, haloperidol, flufenazina, risperidona, olanzapina, clorpromazina, clozapina, quetiapina). Eixo horizontal: afinidade pelo receptor D2. Eixo vertical: dose clínica diária.
> **Trabalho cognitivo:** mostrar a evidência que sustenta a hipótese da dopamina na psicose num único gráfico.
> **Estado inicial:** os pontos alinhados numa diagonal.
> **Interação:** interruptor `receptor de serotonina` troca o eixo horizontal, e os pontos se espalham numa nuvem sem padrão. Passar o dedo num ponto mostra o nome e os valores.
> **Motion:** os pontos fazem a troca de posição juntos em 700 ms.
> **Celular/acessibilidade:** pontos maiores no celular; tabela equivalente.
> **Legenda:** Seeman et al. (*Nature* 261:717, 1976); Creese, Burt e Snyder (*Science* 192:481, 1976). `[CONFERIR: digitalizar a figura original em vez de usar os valores aproximados de Seeman 2002; confirmar o padrão do eixo de serotonina]`

Em 2000, Shitij Kapur mediu com PET quantos receptores D2 o haloperidol ocupava em 22 pacientes no primeiro episódio de psicose. A melhora clínica ficou mais provável acima de 65% de ocupação. Acima de 72%, a prolactina subia, porque a dopamina é o freio que o hipotálamo usa para segurar esse hormônio, e soltar o freio pode fazer o corpo produzir leite fora da gravidez. Acima de 78%, apareciam rigidez e tremor, porque a mesma molécula comanda o movimento. A dopamina também age numa região do tronco cerebral que fica fora da barreira do cérebro e prova o sangue em busca de toxinas. Por isso, remédios que bloqueiam a dopamina servem contra náusea. Arraste a ocupação e tente ficar dentro da janela:

> **WIDGET 07c · `o-termostato`**
> **Tag:** a janela · ajuste a ocupação
> **Tipo:** SVG com um controle deslizante horizontal de 0% a 100% e um corpo humano esquemático ao lado.
> **Referência:** os seletores de faixa dos simuladores de orçamento do *New York Times*; os diagramas de corpo da Mayo Clinic, redesenhados em traço.
> **O que mostra:** três marcas no controle (65% resposta clínica, 72% prolactina, 78% rigidez). No corpo, três indicadores acendem conforme a faixa: cabeça (psicose melhorando), mama (prolactina), braço (rigidez). Uma nota sobre a domperidona, que trata náusea quase sem entrar no cérebro.
> **Trabalho cognitivo:** mostrar que o mesmo receptor serve a funções diferentes e que a janela útil tem só 13 pontos percentuais.
> **Estado inicial:** ocupação em 40%.
> **Interação:** arrastar o controle. Um placar marca quanto tempo o leitor consegue ficar entre 65% e 78% enquanto uma dose decai devagar.
> **Motion:** os indicadores do corpo acendem com 200 ms. A dose decai em 20 segundos, o que obriga o leitor a corrigir.
> **Celular/acessibilidade:** o corpo fica acima do controle. `aria-valuetext`: "Ocupação 74%. Resposta clínica provável. Prolactina alta."
> **Legenda:** Kapur et al. (*Am J Psychiatry*, 2000), 22 pacientes com haloperidol de 1 a 2,5 mg por dia. A alteração mais consistente na esquizofrenia está na produção de dopamina, que é maior no estriado de muitos pacientes (Howes e Kapur, 2009).

---

## 08 · Um experimento sem querer

Os remédios para Parkinson mostram em milhões de pessoas o que a dopamina faz com o querer. Além da levodopa, muitos pacientes tomam agonistas de dopamina, como o pramipexol e o ropinirol, que imitam a molécula e preferem os receptores D2 e D3, muito densos no núcleo accumbens. No começo dos anos 2000, neurologistas começaram a descrever pacientes sem histórico de vício que passaram a jogar compulsivamente, a comprar sem controle e a ter impulsos sexuais novos depois de começar o remédio.

Em 2010, Daniel Weintraub publicou o estudo DOMINION, com 3.090 pacientes de Parkinson em 46 centros dos Estados Unidos e do Canadá. Entre os que tomavam agonista, 17,1% tinham algum transtorno do controle de impulsos. Entre os que não tomavam, 6,9%. Em 2018, Jean-Christophe Corvol acompanhou 411 pacientes franceses por cinco anos. Entre os que já tinham usado agonista, 51,5% desenvolveram um transtorno desses. Entre os que nunca tinham usado, 12,4%. O risco subiu com a dose, e os transtornos regrediram quando o remédio foi suspenso:

> **WIDGET 08 · `a-mesma-pessoa-outro-remedio`**
> **Tag:** o Parkinson · compare com e sem agonista
> **Tipo:** SVG com dois painéis: grades de pessoas e curvas de incidência em cinco anos, mais um seletor de dose.
> **Referência:** os pictogramas de risco de Gerd Gigerenzer; as curvas de incidência acumulada do *The Upshot*.
> **O que mostra:** painel 1, duas grades de 100 pessoas (DOMINION): 7 e 17 pintadas em âmbar. Painel 2, duas curvas de cinco anos (Corvol): 12,4% e 51,5%. Abaixo, quatro cartões com os tipos de transtorno no DOMINION: compras compulsivas, jogo, compulsão alimentar e compulsão sexual.
> **Trabalho cognitivo:** mostrar que mexer na dopamina muda o que a pessoa quer, mesmo sem histórico nenhum, e que o efeito é reversível.
> **Estado inicial:** os dois painéis desenhados.
> **Interação:** seletor de dose de agonista (baixa, média, alta) que muda a curva de cinco anos segundo a relação de dose e efeito de Corvol. Botão `parar o remédio` faz a curva descer.
> **Motion:** as pessoas da grade se acendem em ordem aleatória; as curvas crescem da esquerda para a direita com o scroll.
> **Celular/acessibilidade:** painéis empilhados; grades de 10 × 10.
> **Legenda:** Weintraub et al. (*Arch Neurol*, 2010), estudo transversal financiado pela Boehringer Ingelheim, fabricante do pramipexol. Corvol et al. (*Neurology*, 2018), coorte DIGPD. `[CONFERIR: porcentagem de cada tipo de transtorno no DOMINION e a forma da relação de dose em Corvol]`

Na França, Didier Jambart, pai de família e conselheiro municipal, tomou ropinirol a partir de 2003. Ele passou a jogar até perder as economias da família, desenvolveu uma compulsão sexual que não tinha antes e roubou para jogar. Os sintomas sumiram quando ele parou o remédio, em 2005. Em 2011, um tribunal de Nantes condenou a fabricante, GSK, a pagar 117 mil euros, e na apelação, em 2012, o valor subiu para cerca de 197 mil euros. Desde meados dos anos 2000, as bulas desses remédios alertam para jogo e hipersexualidade. Em 2016, a agência americana FDA fez o mesmo alerta para o aripiprazol, um antipsicótico que estimula parcialmente o receptor D2.

O Parkinson também mostra quanto o sistema aguenta antes de falhar. Os sintomas motores só aparecem quando cerca de 80% da dopamina do putâmen já se foi. Quatro anos depois do diagnóstico, os marcadores de dopamina dessa região estão quase ausentes (Kordower, 2013). O número de pessoas com Parkinson no mundo deve passar de 11,9 milhões em 2021 para 25,2 milhões em 2050, quase tudo por causa do envelhecimento da população. Em abril de 2025, dois estudos na *Nature* relataram transplantes de células produtoras de dopamina feitas a partir de células-tronco, seguros e com sinais de que as células sobreviveram no cérebro. `[CONFERIR: detalhes de Tabar et al. e Sawamoto et al. 2025]`

---

## 09 · O que mexe na sua dopamina

Em pessoas, a medida mais usada é o PET com um marcador chamado raclopride, que compete com a dopamina pelos receptores D2. Quando há mais dopamina perto dos receptores, menos marcador se prende, e o sinal cai. Uma queda de 10% no sinal indica que alguma coisa liberou dopamina, mas não que a dopamina subiu 10%. O próprio exame varia cerca de 4% quando a mesma pessoa é medida duas vezes, semanas depois, sem nada diferente. Antes de ver o gráfico, ponha em ordem do maior para o menor efeito: música que dá arrepio, videogame, café, cigarro e metilfenidato:

> **WIDGET 09a · `a-regua-comum`**
> **Tag:** o cotidiano · ordene e revele
> **Tipo:** SVG com barras horizontais divergentes num eixo único, precedido de um palpite por arrasto.
> **Referência:** os gráficos de barras divergentes com faixa de incerteza do Our World in Data; os forest plots com incerteza dominante dos ensaios anteriores da casa.
> **O que mostra:** um eixo de +10% a −40% de mudança no sinal do raclopride (negativo significa mais dopamina liberada). Uma faixa cinza de ±4% marca o ruído do exame. Barras: cafeína 300 mg (+4,6% a +5,6%, para o lado positivo), meditação guiada (−7,9%), música com arrepios (−6,4% a −9,2%), dinheiro imprevisível (−6,3% numa região e +9,1% em outra), videogame (−13%, com faixa de +8% a −42%), anfetamina na veia (−15%), placebo em pacientes de Parkinson (−17% a −21%), metilfenidato oral (−20%), cigarro em fumantes dependentes (−26% a −37%, método diferente). Cada barra mostra o número de participantes.
> **Trabalho cognitivo:** pôr os prazeres cotidianos e as drogas num mesmo eixo honesto, com o ruído do instrumento à vista.
> **Estado inicial:** antes do palpite, cinco cartões soltos. Depois, as barras com a faixa de ruído.
> **Interação:** ordenar os cinco cartões e `revelar`. Depois, um interruptor `a conversão das manchetes` estica as barras de videogame e meditação para "dopamina dobrou" e "+65%", como foram noticiadas, com um aviso de que essas conversões vêm de calibrações em macacos e não valem para qualquer região.
> **Motion:** as barras crescem a partir do zero; a faixa de ruído aparece primeiro, como um nevoeiro de onde as barras saem. Se a ordem do leitor colocou o café acima da música, o neurônio-companheiro dispara uma rajada.
> **Celular/acessibilidade:** barras empilhadas com rótulo direto; o N fica em letra menor ao lado.
> **Legenda:** Alakurtti et al. (2015, ruído); Volkow et al. (2015, cafeína); Kjaer et al. (2002, meditação); Salimpoor et al. (2011, música); Zald et al. (2004, dinheiro); Koepp et al. (1998, videogame, revisto com críticas por Egerton et al., 2009); Martinez et al. (2003, anfetamina); de la Fuente-Fernández et al. (2001, placebo); Volkow et al. (2001, metilfenidato); Brody et al. (2004, cigarro). Amostras de 7 a 20 pessoas. `[CONFERIR: números do placebo em de la Fuente-Fernández 2001, hoje de fonte secundária]`

Repare que a música, a meditação e o dinheiro ficam a um ou dois ruídos de distância do zero, e que os remédios e o cigarro ficam duas a quatro vezes mais longe. O café empurra o sinal para o outro lado. Nora Volkow mediu isso em 2015 com 20 pessoas que tomaram 300 miligramas de cafeína, o equivalente a cerca de três xícaras de café coado. A cafeína aumentou a disponibilidade dos receptores, o que indica que ela age no receptor e não na quantidade de dopamina liberada. O placebo em pacientes de Parkinson liberou dopamina comparável à de um remédio, só pela expectativa de melhora.

A falta de sono mostra como a mesma medida pode ser lida de duas formas. Em 2008, o grupo de Volkow viu o sinal do raclopride cair depois de uma noite sem dormir e interpretou a queda como mais dopamina. Em 2012, o mesmo grupo repetiu o experimento com um teste extra e concluiu que a dopamina liberada era igual, e que o que caía era o número de receptores disponíveis. O exercício tem dois estudos de PET agudo com resultados opostos: trinta minutos de esteira não mudaram nada em 12 pessoas (Wang, 2000), e bicicleta deitada mostrou liberação em 16 pessoas (Ando, 2024). Dois estudos sobre luz do sol e estação do ano usaram medidas diferentes e apontaram em direções opostas.

O que muda os receptores de forma confiável é menos glamoroso. Em 2017, Teresa Karrer reuniu 95 estudos com 2.611 adultos saudáveis e mediu quanto cada parte do sistema perde por década de vida. Arraste a idade:

> **WIDGET 09b · `o-relogio-do-sistema`**
> **Tag:** a idade · arraste os anos
> **Tipo:** SVG com quatro barras verticais e um controle de idade de 20 a 80 anos.
> **Referência:** os controles de idade de "Your Life in Weeks", de Tim Urban, e das calculadoras de expectativa de vida da Our World in Data.
> **O que mostra:** quatro barras que encolhem cada uma no seu ritmo: receptores D1 (−14% por década), transportador de dopamina (−8,9%), receptores D2 (−8,2%) e capacidade de síntese (−3,7%, sem significância estatística). Aos 80 anos, os receptores D1 estão em cerca de 40% do valor dos 20.
> **Trabalho cognitivo:** mostrar que a fábrica quase não envelhece e que os receptores envelhecem muito, e dar uma escala para comparar com qualquer hábito.
> **Estado inicial:** idade em 20 anos, quatro barras cheias.
> **Interação:** arrastar a idade. Um segundo controle `uma noite sem dormir` baixa a barra de D2 por um instante e a devolve.
> **Motion:** as barras encolhem com interpolação contínua; a de síntese quase não se move, o que se nota pelo contraste.
> **Celular/acessibilidade:** controle em largura total. Valores no `aria-valuetext`.
> **Legenda:** Karrer et al. (*Neurobiol Aging*, 2017). Os estudos são transversais, então diferenças entre gerações se misturam ao envelhecimento.

O que se vende para aumentar a dopamina quase sempre falha em chegar ao cérebro. A tirosina enche a entrada da linha de montagem da seção 01 e quase não muda a saída. Os 250% de aumento atribuídos ao banho frio vêm de um estudo de 2000 em que dez homens ficaram uma hora imersos até o pescoço em água a 14 °C, e a medida foi feita no sangue. Cerca de metade da dopamina do corpo é fabricada no intestino, e ela fica do lado de fora da barreira do cérebro. Nenhum exame de sangue ou urina mede a dopamina do cérebro. A exceção é a *Mucuna pruriens*, uma leguminosa vendida como suplemento, cujas sementes contêm levodopa de verdade:

> **WIDGET 09c · `o-frasco`**
> **Tag:** os suplementos · abra o frasco
> **Tipo:** SVG com um frasco de cápsulas transparentes que se enchem em alturas diferentes.
> **Referência:** as comparações de rótulo contra conteúdo da *Consumer Reports*; os gráficos de unidade da ProPublica.
> **O que mostra:** cápsulas preenchidas proporcionalmente à levodopa medida em cada produto, de 2 a 241 miligramas por dose, uma delas vazia. Uma faixa horizontal marca 100 a 250 mg, a dose de um comprimido de levodopa para Parkinson.
> **Trabalho cognitivo:** mostrar que o único suplemento que de fato aumenta a dopamina é um remédio de Parkinson com dose imprevisível.
> **Estado inicial:** frasco fechado com o rótulo "Mucuna 500 mg".
> **Interação:** `abrir` derrama as cápsulas em fila e cada uma se enche até a sua dose real. Tocar numa cápsula mostra o valor.
> **Motion:** as cápsulas caem e rolam até a fila com física leve; o enchimento sobe em 400 ms.
> **Celular/acessibilidade:** fila em duas linhas. Texto equivalente com a faixa.
> **Legenda:** Cohen et al. (*JAMA Neurology*, 2022). Levodopa combinada com antidepressivos inibidores de MAO não seletivos pode causar crise hipertensiva, e a mesma regra vale para a Mucuna. `[CONFERIR: número de produtos testados por Cohen et al.]`

---

## 10 · A balança

O vídeo do Huberman Lab trata de um caso extremo do sistema: o que acontece quando a dopamina é empurrada para cima muitas vezes seguidas. Lembke explica com uma balança no circuito de recompensa, com o prazer num prato e a dor no outro. Quando ela assiste a um vídeo de fofoca à noite, a balança pende para o prazer, e o cérebro põe pesos no prato da dor até nivelar. Lembke chama esses pesos de gremlins. Eles só descem depois de inclinar o outro lado na mesma medida, e esse intervalo é a ressaca, ou a vontade de ver mais um vídeo. A imagem é uma versão desenhada de uma teoria de 1974. Os psicólogos Richard Solomon e John Corbit propuseram que todo estímulo que mexe com o humor dispara um processo rápido e recruta um processo oposto e mais lento, e que, com a repetição, o processo lento cresce. No modelo abaixo, cada toque em `uma dose` põe um peso no prato do prazer. Ponha uma dose, avance o relógio, e depois encurte o intervalo entre as doses:

> **WIDGET 10a · `a-balanca`**
> **Tag:** a tolerância · ponha uma dose
> **Tipo:** Canvas 2D com Matter.js (viga presa a um pivô, gremlins como corpos), com dois gráficos de linha em SVG embaixo.
> **Referência:** "The Evolution of Trust", de Nicky Case; o modelo de processo oponente de Solomon e Corbit (1974); os controles de transporte de "the afterlife of pi" (The Pudding).
> **O que mostra:** em cima, a balança em traço preto com o prato do prazer em âmbar e o da dor em índigo, e gremlins desenhados à mão (pequenos, redondos, de dois olhos, com halteres quando crescem). Embaixo, o primeiro gráfico mostra horas: o processo rápido (âmbar), o lento (índigo) e a diferença (preto grosso). O segundo mostra 30 dias, com uma linha tracejada para o ponto de equilíbrio em repouso.
> **Trabalho cognitivo:** mostrar que a compensação passa do ponto, que ela cresce com a repetição e que o ponto de repouso se desloca quando as doses chegam antes de os gremlins descerem.
> **Estado inicial:** balança nivelada, relógio em zero.
> **Modelo:** `a(t)` vale A durante o estímulo; `db/dt = (k·a − b)/τ_b`, com `τ_b` muito maior que a constante de `a`; o que se sente é `a − b`. Cada uso aumenta `k` e `τ_b`. Os gremlins desenhados correspondem a `round(b / unidade)`.
> **Interação:** `uma dose`, `avançar uma hora`, `resistir`, controle `intervalo entre doses` (7 dias a 2 horas), `de novo`.
> **Motion:** o peso cai com física; os gremlins entram pela direita e pulam no prato um de cada vez; crescem com mola quando `k` aumenta e ganham halteres acima de um limiar.
> **Som (se ligado):** tom que sobe com `a − b` positivo, ruído grave com `a − b` negativo.
> **Celular/acessibilidade:** balança acima dos gráficos; limite de 60 corpos com física. `aria-live`: "Dia 21. Ponto de equilíbrio 30% abaixo do centro. Doze gremlins."
> **Legenda:** Metáfora de Lembke (*Dopamine Nation*, 2021) sobre a teoria do processo oponente (Solomon e Corbit, 1974) e da alostase (Koob e Le Moal, 2001). Os valores são ilustrativos.

Repare que, abaixo de certo intervalo, a linha tracejada desce e não volta sozinha enquanto as doses continuam. George Koob e Michel Le Moal chamaram esse deslocamento de alostase. Em ratos que se administram cocaína à vontade, a estimulação elétrica necessária para ativar o circuito de recompensa aumenta, e aumenta mais nos que consumiram mais (Markou e Koob, 1991).

As drogas empurram o sistema mais longe e por mais tempo do que as recompensas naturais. Na seção 04, a anfetamina chegava a dez vezes o nível basal em ratos. Ela também ficava alta por mais de cinco horas, e a comida voltava ao basal em menos de uma hora e meia:

> **WIDGET 10b · `as-curvas-originais`**
> **Tag:** a duração · ligue as curvas
> **Tipo:** SVG com `d3-shape`, eixo de 0 a 300 minutos.
> **Referência:** os gráficos de séries temporais com rótulo direto do *Financial Times*.
> **O que mostra:** as curvas digitalizadas dos slides do NIDA, em % do basal: anfetamina (pico de 1.000 aos 40 minutos), cocaína (330 aos 80), nicotina (222 aos 20), morfina em quatro doses (142 a 198), comida (150 aos 50, de volta ao basal aos 130) e sexo (195). Um contador de área acima do basal para cada curva ligada.
> **Trabalho cognitivo:** mostrar que a duração pesa tanto quanto o pico.
> **Estado inicial:** comida, sexo e anfetamina ligadas.
> **Interação:** ligar e desligar curvas; `escala logarítmica`; seletor de dose da morfina.
> **Motion:** cada curva se desenha da esquerda para a direita em 600 ms.
> **Celular/acessibilidade:** rótulos diretos na ponta de cada curva; tabela num `details`.
> **Legenda:** Di Chiara e Imperato (*PNAS*, 1988); Fiorino et al. (*J Neurosci*, 1997); Bassareo e Di Chiara (1999). Curvas lidas à mão com margem de 5% a 10%. `[CONFERIR: doses no PDF de Di Chiara e Imperato 1988]`

A velocidade também pesa. Em 2000, Volkow deu cocaína a 32 usuários por três vias, e o bloqueio dos transportadores de dopamina ficou parecido nas três. O pico do barato veio em 1,4 minuto com a cocaína fumada, em 3,1 minutos com a injetada e em 14,6 minutos com a aspirada. O metilfenidato oral ocupa o mesmo transportador, leva uma hora para chegar ao pico no cérebro e, em dose clínica, raramente dá barato.

Em pessoas com vício, o PET mostra o sistema rebaixado. Usuários de metanfetamina tinham 16% menos receptores D2 disponíveis no caudado que voluntários sem vício (Volkow, 2001), uma queda equivalente a cerca de duas décadas de envelhecimento no gráfico da seção 09. Em 2009, Diana Martinez esvaziou por um dia a dopamina de voluntários com um remédio e mediu quantos receptores ficavam livres. Em pessoas saudáveis, a dopamina de repouso ocupava cerca de 11% dos receptores D2. Em dependentes de cocaína, cerca de 6%. É a medida mais próxima de um nível basal de dopamina que existe em humanos, e ela exige um protocolo farmacológico num centro de PET. Parte da diferença pode existir antes da droga: em 2006, Michael Nader mediu os receptores de doze macacos antes de qualquer contato com cocaína, e os que tinham menos receptores foram os que mais se administraram a droga depois.

---

## 11 · Trinta dias

> **Mudança de página.** Ao entrar na seção 11, o papel escurece (`--paper` vai para `#0f1020`, `--ink` para `#e9e6dc`), com uma textura de pontilhado 1-bit ao fundo, inspirada em "Dithering, Part I". A transição dura meio viewport de scroll. Os cinco sintomas que Lembke associa à abstinência (ansiedade, irritabilidade, insônia, depressão e fissura) aparecem como palavras grandes em Recursive, com os eixos `CASL` e `slnt` oscilando devagar e um tremor leve de 1 px. A cada dia que o 11a avança, as palavras assentam um pouco. No fim da seção, a página clareia de volta ao papel branco. Com movimento reduzido, a seção é escura e estática, e o clareamento acontece num corte. Contraste acima de 4,5:1 em todo o percurso e nada piscando mais de três vezes por segundo.

A receita do vídeo é ficar trinta dias sem a droga de escolha. Lembke diz que os primeiros 10 a 14 dias são os piores e que, nas semanas três e quatro, cerca de 80% dos pacientes dela se sentem bem melhor. O número de 80% vem da experiência clínica dela. O dado publicado mais próximo é um estudo de 1988 com 191 homens internados por alcoolismo: na entrada, 42% tinham depressão clinicamente significativa, e na quarta semana, 6%, com a maior queda na segunda semana. Desenhe primeiro como você acha que uma pessoa se sente nos trinta dias depois de parar:

> **WIDGET 11a · `desenhe-os-trinta-dias`**
> **Tag:** a abstinência · desenhe sua curva
> **Tipo:** SVG com Pointer Events, no modo noturno.
> **Referência:** "You Draw It" do *New York Times*.
> **O que mostra:** eixo de 0 a 30 dias e eixo de "muito pior" a "muito melhor que antes de parar". Depois do desenho, as barras semanais de Brown e Schuckit (42% na entrada, 6% na quarta semana) e as faixas de outros estudos: tabaco com pico na primeira semana e duração de duas a quatro (Hughes, 2007), cannabis com sintomas que somem entre o quarto e o décimo quarto dia (Budney, 2003), álcool com sintomas negativos agudos que passam entre a terceira e a sexta semana (Heilig, 2010).
> **Trabalho cognitivo:** comparar a expectativa do leitor com os prazos medidos.
> **Estado inicial:** dia 1 marcado no zero.
> **Interação:** desenhar; `mostrar os dados`; um cursor de dias que avança as palavras do fundo.
> **Motion:** as barras sobem depois que a curva do leitor congela. Se o desenho do leitor melhorava antes do dia 7, o neurônio-companheiro faz uma pausa índigo.
> **Celular/acessibilidade:** quatro controles deslizantes (dias 1, 7, 14 e 30) como alternativa ao desenho.
> **Legenda:** Brown e Schuckit (*J Stud Alcohol*, 1988); Hughes (2007); Budney et al. (2003); Heilig et al. (2010). A curva de Lembke é padrão clínico, sem medição publicada. `[CONFERIR: valores das semanas 1 a 3 em Brown e Schuckit]`

Os experimentos com telas mostram uma curva parecida em comportamentos que nenhum manual classifica como vício. Em 2025, Johannes Thrul reanalisou os estudos de pausa nas redes sociais. Pausas de menos de uma semana pioraram o humor, pausas de uma semana ou mais melhoraram, e o melhor resultado apareceu perto de três semanas. No mesmo ano, Noah Castelo bloqueou por duas semanas a internet móvel do celular de 467 adultos americanos. O tempo de tela caiu de 314 para 161 minutos por dia, e a saúde mental melhorou com tamanho de efeito de 0,56 desvio padrão, mesmo contando os três quartos que não mantiveram o bloqueio até o fim:

> **WIDGET 11b · `a-curva-em-j`**
> **Tag:** as telas · mova a duração
> **Tipo:** SVG com a curva em J em cima e uma régua de tamanhos de efeito embaixo.
> **Referência:** "Interpreting Cohen's d", de Kristoffer Magnusson (rpsychologist.com); os forest plots da casa.
> **O que mostra:** curva do efeito no humor pela duração da pausa, negativa abaixo de 7 dias (−0,175), positiva acima (0,156), com pico perto de 21 dias e faixa de incerteza larga. Régua de 0 a 0,7 desvio padrão: desativar o Instagram por seis semanas (0,04), o Facebook (0,06), o Facebook em 2018 (0,09), média dos estudos de uma semana ou mais (0,16), bloquear toda a internet móvel (0,45 a 0,56).
> **Trabalho cognitivo:** mostrar que a duração e o tamanho do corte mudam o resultado.
> **Estado inicial:** os dois painéis desenhados.
> **Interação:** controle de duração (1 a 42 dias) que move um ponto pela curva e acende na régua o estudo mais próximo.
> **Motion:** a faixa de incerteza respira devagar, entre 25% e 35% de opacidade. Desligada com movimento reduzido.
> **Celular/acessibilidade:** painéis empilhados.
> **Legenda:** Thrul et al. (2025), reanálise de 19 estudos pequenos; Castelo et al. (*PNAS Nexus*, 2025), sem grupo placebo; Allcott et al. (2020); NBER w33697 (2025).

Os estudos que medem o cérebro dão prazos mais longos. Em dependentes de cocaína, os receptores D2 continuavam baixos de três a quatro meses depois da desintoxicação. Em alcoólicos, não houve recuperação mensurável entre o primeiro e o quarto mês. Em cinco usuários de metanfetamina, os transportadores de dopamina subiram cerca de 19% depois de 12 a 17 meses sem a droga. Numa entrevista à CNN em 2025, Lembke disse que os trinta dias resetam as vias de recompensa "pelo menos fenomenologicamente", isto é, no que a pessoa sente. Os hábitos também levam mais tempo. Em 2024, uma meta-análise de 20 estudos com 2.601 pessoas encontrou medianas de 59 a 66 dias para um hábito de saúde ficar automático, com variação individual de 4 a 335 dias:

> **WIDGET 11c · `os-tres-relogios`**
> **Tag:** os prazos · compare os relógios
> **Tipo:** SVG com eixo logarítmico de 1 dia a 2 anos e três camadas: humor, hábito e receptores.
> **Referência:** as linhas do tempo em camadas do *New York Times*; os histogramas de cauda longa da The Pudding.
> **O que mostra:** camada do humor (a curva de Brown e Schuckit, que termina em quatro semanas); camada do hábito (um histograma de dias até o hábito ficar automático, com mediana de 59 a 66 dias e cauda até 335); camada dos receptores (pontos de PET aos 3 a 4 meses na cocaína, 1 a 4 meses no álcool e 12 a 17 meses na metanfetamina, com o tamanho proporcional ao número de participantes). Uma faixa clara marca os 30 dias, e uma linha marca os 21 dias do mito popular.
> **Trabalho cognitivo:** separar o que melhora em semanas (o humor), o que leva meses (o hábito) e o que leva meses ou anos (os receptores).
> **Estado inicial:** as três camadas desenhadas, a faixa dos 30 dias em destaque.
> **Interação:** cursor de tempo com uma frase-resumo em cada posição ("Dia 30: a depressão passou na maioria dos casos; metade dos hábitos ainda não ficou automática; os receptores continuam baixos").
> **Motion:** as camadas entram uma de cada vez com o scroll. Quando o cursor passa do dia 30, a página começa a clarear.
> **Celular/acessibilidade:** camadas empilhadas com o mesmo eixo.
> **Legenda:** Brown e Schuckit (1988); Singh et al. (*Healthcare*, 2024); Lally et al. (2010); Volkow et al. (1993, 2001, 2002). Os estudos de PET têm de 5 a 20 pessoas.

A maioria das pessoas sai. Numa amostra de 43.093 adultos americanos, a chance de remissão ao longo da vida de quem já foi dependente foi de 83,7% para a nicotina, 90,6% para o álcool, 97,2% para a cannabis e 99,2% para a cocaína. Metade das pessoas saiu em cerca de 5 anos na cocaína e em cerca de 26 anos na nicotina (Lopez-Quintero, 2011).

---

## 12 · O imprevisível

O neurônio da seção 05 tinha uma rampa de disparo mais alta quando a chance de suco era de 50%. A incerteza máxima mantém a dopamina ativa por mais tempo. Os pombos de B. F. Skinner mostram o efeito no comportamento. Em 1957, Charles Ferster e Skinner compararam dois esquemas. No de razão fixa, o pombo ganha comida a cada número fixo de bicadas e faz uma pausa depois de cada prêmio. No de razão variável, ganha em média a cada mesmo número, só que em momentos imprevisíveis, e bica sem parar. O comportamento treinado no esquema variável também demora muito mais a desaparecer quando a comida para. No modelo abaixo, clique no botão sob os dois esquemas e acompanhe o registro dos seus cliques:

> **WIDGET 12a · `o-pombo`**
> **Tag:** o esquema · clique e compare
> **Tipo:** HTML com um botão grande e um registro cumulativo em SVG desenhado em tempo real, como os registradores de papel de Skinner.
> **Referência:** os registros cumulativos de Ferster e Skinner (1957); "Deceptive Patterns", de Harry Brignull, sobre recompensa variável em apps.
> **O que mostra:** um botão `bicar`. Em cima, uma caneta desenha uma linha que sobe um passo a cada clique e marca um pequeno traço a cada prêmio. Fase 1, razão fixa: prêmio a cada 5 cliques. Fase 2, razão variável: prêmio em média a cada 5, sorteado. Fase 3, extinção: nenhum prêmio.
> **Trabalho cognitivo:** fazer o leitor sentir a diferença entre o prêmio previsível e o imprevisível no próprio dedo, e ver no registro.
> **Estado inicial:** fase 1, registro vazio.
> **Interação:** clicar; `próxima fase`. No fim, o widget mostra os dois registros sobrepostos e quantos cliques o leitor deu na extinção depois de cada esquema.
> **Motion:** a caneta anda para a direita a velocidade constante; o prêmio é um pequeno brilho âmbar no botão, sem confete. O neurônio-companheiro dispara uma rajada a cada prêmio da fase 2.
> **Celular/acessibilidade:** botão grande; vibração curta no prêmio no Android, se permitida. Botão `sair` sempre visível.
> **Legenda:** Ferster e Skinner (*Schedules of Reinforcement*, 1957); Fiorillo, Tobler e Schultz (*Science*, 2003). Em 2004, David Zald testou os dois esquemas com dinheiro em pessoas no PET e encontrou um sinal pequeno e espalhado.

O jogo de azar funciona inteiro nessa faixa de incerteza, e é o único comportamento que o manual de diagnóstico da psiquiatria americana, o DSM-5, classifica como vício desde 2013. Os estudos de PET mostram liberação de dopamina amplificada em jogadores patológicos, com um perfil diferente do das drogas (Clark, 2019). No Brasil, as apostas online foram reguladas em janeiro de 2025. Segundo o Levantamento Nacional de Álcool e Drogas (LENAD III), da Unifesp, 17,4% das pessoas com 14 anos ou mais apostam, 6,8% apostam de forma arriscada e 0,8%, cerca de 1,4 milhão de pessoas, têm padrão compatível com transtorno do jogo:

> **WIDGET 12b · `o-funil-das-apostas`**
> **Tag:** as apostas · escolha a renda
> **Tipo:** SVG com uma grade de 1.000 pontos que se reorganiza em funil.
> **Referência:** os gráficos de unidade do *Washington Post*; os waffles de "Life after death?" (The Pudding).
> **O que mostra:** 1.000 pontos (a população com 14 anos ou mais); 174 em âmbar (apostam), 68 em índigo (apostam de forma arriscada), 8 em índigo escuro (transtorno do jogo). Ao lado, o dado do Banco Central: em agosto de 2024, beneficiários do Bolsa Família enviaram R$ 3 bilhões por Pix a sites de apostas.
> **Trabalho cognitivo:** mostrar o tamanho de cada camada e a concentração do risco na renda baixa.
> **Estado inicial:** as camadas pintadas.
> **Interação:** seletor `até 1 salário mínimo` e `2 salários ou mais`. Entre os apostadores, a parcela em aposta arriscada ou problemática muda de 52,8% para 21,1%.
> **Motion:** os pontos escorrem da grade para o funil em 800 ms, com atraso escalonado.
> **Celular/acessibilidade:** 500 pontos no celular. Texto equivalente.
> **Legenda:** LENAD III (Unifesp, 2023 a 2024). Nota técnica do Banco Central de 24/09/2024, que conta só Pix e não desconta prêmios. Desde 17/03/2026, o ECA Digital (Lei 15.211/2025) proíbe caixas de recompensa em jogos acessíveis a crianças e adolescentes. `[CONFERIR: artigo da lei no Diário Oficial]`

Os aplicativos usam a mesma mecânica em escala menor. Loren Brichter criou o gesto de puxar a tela para atualizar em 2009 e disse ao *The Guardian* em 2017 que não o projetou para viciar, mas que hoje o vê assim. Nenhum estudo mediu a dopamina de uma pessoa rolando um feed. `[CONFERIR: frase exata de Brichter no Guardian]`

---

## 13 · O que circula

A ideia de que dá para resetar a dopamina tem uma origem rastreável. Em 2019, o psicólogo Cameron Sepah propôs um "jejum de dopamina" como técnica de terapia cognitivo-comportamental para afastar pessoas de comportamentos impulsivos específicos, e avisou que o nome era uma figura e que o objetivo nunca foi reduzir a dopamina. O *New York Times* levou o termo ao grande público em novembro de 2019. Na quarentena de 2020, os vídeos de autoajuda do YouTube transformaram o jejum em "detox". Em 2023, o "dopamine menu", uma lista de atividades planejada com antecedência que vinha da comunidade de pessoas com TDAH, ficou viral no TikTok. As buscas contam a sequência:

> **WIDGET 13a · `as-palavras`**
> **Tag:** a moda · siga as buscas
> **Tipo:** SVG com gráfico de linhas animado e dois painéis (mundo e Brasil).
> **Referência:** os gráficos de Google Trends anotados do *The Upshot*; as linhas que nascem em sequência dos gráficos de "The Pudding" sobre vocabulário.
> **O que mostra:** painel do mundo, médias anuais de 2018 a 2026: "dopamine detox" (de 0,5 a 73,3 em 2024 e 45,4 em 2026, com pico mensal em novembro de 2024), "dopamine fasting", "dopamine menu" (de 0,4 a 20,6, ainda subindo) e "dopamine dressing". Um segundo gráfico do mundo mostra "dopamine", "serotonin", "cortisol" e "oxytocin", com o cortisol passando a dopamina em 2023. Painel do Brasil: "dopamina" com pico em junho de 2023, "serotonina", "cortisol" passando os dois, e "detox de dopamina" colado no zero.
> **Trabalho cognitivo:** mostrar a palavra como moda, com começo, pico e substituição.
> **Estado inicial:** os eixos vazios.
> **Interação:** com o scroll, cada linha nasce no ano da sua origem, com uma anotação (Sepah em 2019, a quarentena em 2020, a edição brasileira de *Nação Dopamina* em 2022, o TikTok em 2023). Interruptor `mundo` e `Brasil`. Interruptor `a próxima molécula` acende o cortisol.
> **Motion:** as linhas se desenham presas ao scroll; as anotações entram com 300 ms de atraso.
> **Celular/acessibilidade:** um painel por vez; tabela de médias anuais num `details`.
> **Legenda:** Google Trends, consulta de 12/11/2026, médias anuais do índice mensal de 0 a 100. Valores comparáveis só dentro de cada consulta. 2026 vai até 10 de novembro.

Os cartões abaixo trazem sete frases comuns sobre dopamina. Decida cada uma antes de virar o cartão:

> **WIDGET 13b · `verdade-ou-exagero`**
> **Tag:** as frases · decida e vire
> **Tipo:** HTML com sete cartões que viram e um placar.
> **Referência:** os cartões "mito ou código" do ensaio sobre o algoritmo do X; os selos de checagem do *Aos Fatos*.
> **O que mostra:**
> 1. "Dopamina é a molécula do prazer." Incompleto. Ela pesa mais no querer, no esforço e na previsão (seções 05 e 06).
> 2. "Um banho frio aumenta a dopamina em 250%." Exagero. A medida foi no sangue, depois de uma hora a 14 °C, em dez homens.
> 3. "Café dá um pico de dopamina." Falso no PET. A cafeína aumenta a disponibilidade dos receptores.
> 4. "Suplementos repõem a dopamina." Quase sempre falso. A tirosina quase não muda a saída, e a Mucuna é levodopa em dose imprevisível.
> 5. "Um exame de sangue mostra sua dopamina." Falso. Cerca de metade da dopamina do corpo vem do intestino, e a do cérebro não passa para o sangue.
> 6. "Mais dopamina deixa você mais esperto." Depende de onde você está na curva em U (seção 07).
> 7. "Trinta dias resetam a dopamina." Exagero. O humor melhora em semanas, os hábitos levam meses, e os receptores, meses ou mais.
> **Trabalho cognitivo:** consolidar as correções no formato em que o leitor vai encontrá-las.
> **Estado inicial:** sete cartões com a frente visível e dois botões (`verdade`, `exagero`).
> **Interação:** escolher, virar, somar no placar.
> **Motion:** virada de 500 ms no eixo Y. O neurônio-companheiro dispara a cada erro do leitor.
> **Celular/acessibilidade:** carrossel com `scroll-snap`; o verso é texto real.
> **Legenda:** Fontes no verso de cada cartão.

O "dopamine menu" e o jejum de Sepah têm um núcleo útil quando se tira o nome químico. Planejar alternativas antes de o tédio chegar e afastar as pistas de um comportamento são técnicas de terapia comportamental com evidência. A dopamina entra no nome como marketing.

---

## 14 · O que resetar quer dizer

O que se chama de sistema de dopamina são pelo menos quatro coisas, e cada uma se mede de um jeito. A primeira é a fração de receptores ocupados em repouso, cerca de um décimo. A segunda é a quantidade de receptores, estável como um traço de cada pessoa e que cai com a idade. A terceira é a capacidade de fabricar dopamina, que muda pouco. A quarta são as rajadas e pausas de décimos de segundo, que marcam a surpresa. O painel abaixo tem um medidor para cada uma. Aperte os botões e veja qual medidor cada um move:

> **WIDGET 14a · `o-painel`**
> **Tag:** o reset · aperte os botões
> **Tipo:** HTML e SVG com quatro medidores analógicos e uma fileira de botões.
> **Referência:** os painéis de simulação de "Parable of the Polygons", de Vi Hart e Nicky Case; os mostradores desenhados à mão de Ciechanowski.
> **O que mostra:** quatro medidores: `ocupação em repouso`, `receptores`, `fabricação`, `rajadas e pausas`. Botões: `detox de dopamina`, `banho gelado`, `tirosina`, `Mucuna`, `café`, `uma noite sem dormir`, `dez anos a mais`, `metilfenidato`, `um ano de cocaína`, `três meses sem cocaína`, `mudar as pistas por dois meses`.
> **Trabalho cognitivo:** responder à pergunta do título com o que foi medido.
> **Estado inicial:** os quatro medidores no meio, um texto curto acima: "Nenhum botão foi apertado."
> **Interação:** cada botão move os medidores conforme a evidência e mostra a fonte. `Detox de dopamina` e `banho gelado` não movem nada no cérebro e mostram "ninguém mediu" ou "medido no sangue". `Café` move os receptores para cima. `Uma noite sem dormir` baixa os receptores por um dia. `Dez anos a mais` baixa os receptores em cerca de 8%. `Metilfenidato` move a ocupação por algumas horas. `Um ano de cocaína` baixa a ocupação e os receptores; `três meses sem cocaína` devolve uma parte. `Mucuna` move a fabricação por algumas horas, de forma imprevisível. `Mudar as pistas por dois meses` não move os três primeiros medidores e muda o padrão de rajadas: a rajada sai da pista antiga (o café, a notificação) e passa a aparecer em outra coisa.
> **Motion:** os ponteiros giram com mola; os botões sem efeito tremem uma vez e ficam cinza.
> **Celular/acessibilidade:** medidores em grade 2 × 2; botões em lista. `aria-live` com o efeito de cada botão.
> **Legenda:** Valores derivados dos estudos citados nas seções 09 a 11. Os ponteiros mostram direção e ordem de grandeza.

Os botões que mexem nos medidores de forma confiável são a idade, o sono, as drogas e os remédios. Nenhum estudo mediu a dopamina de alguém fazendo detox. O único medidor que responde a uma mudança de vida é o das rajadas e pausas, porque ele aprende. Quando as pistas e as recompensas de um ambiente mudam, o sinal de surpresa da seção 05 se recalibra: a rajada que disparava com o som da notificação ou com o café da manhã deixa de disparar ali, porque aquilo deixou de prever o que previa. Esse reaprendizado leva semanas para mexer no humor e meses para mudar um hábito, e é o que os trinta dias do vídeo põem em movimento.

> **WIDGET 14b · `o-cartao`**
> **Tag:** o fim · confira suas respostas
> **Tipo:** Canvas 2D que gera um PNG de 1080 × 1350.
> **Referência:** o cartão final dos ensaios da casa (`baixar como imagem`).
> **O que mostra:** as seis funções que o leitor marcou na seção 00, com a correção: as cinco além de "dar prazer" são funções da dopamina, e "dar prazer" aparece como parcial. Embaixo, o placar do 13b, quantas rajadas o neurônio-companheiro disparou durante a leitura e um desenho do neurônio com a árvore de axônio da seção 02.
> **Trabalho cognitivo:** devolver ao leitor a crença inicial ao lado do que ele viu.
> **Estado inicial:** cartão montado com as respostas guardadas; sem respostas, mostra as seis funções corrigidas.
> **Interação:** `baixar como imagem`; Web Share API quando disponível.
> **Motion:** o neurônio do cartão dispara uma rajada quando o cartão termina de montar.
> **Celular/acessibilidade:** texto equivalente ao cartão.
> **Legenda:** nenhuma.

Na margem desta página, o neurônio de dopamina continua marcando o ritmo de fundo, quatro vezes por segundo. Ele disparou uma rajada quando a barra da metanfetamina passou do seu palpite, e outras quando os resultados do café, da música e dos cartões foram diferentes do que você esperava. Se você voltar ao começo e refizer os palpites, ele vai disparar menos, porque agora você já sabe o que vem.

---

## Nota de método

- O vídeo do Huberman Lab aparece como ponto de partida e como uma das vozes da seção 10. As afirmações de Lembke foram conferidas nos estudos de origem, e as correções estão nas seções 04, 10 e 11.
- Quase todos os números de dopamina medida em humanos vêm de PET com raclopride, em amostras de 7 a 20 pessoas, com ruído de reteste de cerca de 4%. O ensaio mostra a mudança no sinal medido e evita converter para "aumento de dopamina".
- Os números em ratos vêm de microdiálise e foram digitalizados à mão dos slides do NIDA, com margem de 5% a 10%.
- Os modelos dos widgets 03, 05a, 05b, 06a, 07a e 10a usam mecanismos descritos na literatura com parâmetros escolhidos para caber na tela. Eles mostram a forma do fenômeno e não fazem previsão.
- A estimativa de 4,5 m de axônio e até 2,4 milhões de sinapses por neurônio humano é uma extrapolação a partir de ratos.
- O estudo DOMINION foi financiado pelo fabricante do pramipexol. A coorte de Corvol foi independente e encontrou um efeito maior.
- Itens marcados com `[CONFERIR]` precisam de leitura na fonte primária antes do HTML.
- O ensaio não é orientação médica. A abstinência de álcool diário, benzodiazepínicos e opioides precisa de acompanhamento.

## Fontes principais

**Ponto de partida.** Huberman Lab Clips, "How to Reset Your Dopamine System & Overcome Addiction", 10/11/2026. Lembke, *Dopamine Nation*, 2021 (*Nação Dopamina*, 2022). Google Trends, consulta de 12/11/2026.

**História e síntese.** Carlsson, Lindqvist & Magnusson, *Nature* 1957. Carlsson et al., *Science* 1958. Ehringer & Hornykiewicz, *Klin Wochenschr* 1960. Birkmayer & Hornykiewicz, *Wien Klin Wochenschr* 1961. Cotzias, Van Woert & Schiffer, *NEJM* 1967.

**Anatomia e ritmos.** Azevedo et al., *J Comp Neurol* 2009. Pakkenberg et al., 1991. Björklund & Dunnett, *Trends Neurosci* 2007. Matsuda et al., *J Neurosci* 2009. Bolam & Pissadaki, *Mov Disord* 2012. Grace & Bunney, *J Neurosci* 1984. Liu et al., *Cell* 2018.

**Medição.** Di Chiara & Imperato, *PNAS* 1988. Fiorino, Coury & Phillips, *J Neurosci* 1997. Bassareo & Di Chiara, *Neuroscience* 1999. Kishida et al., *PLoS One* 2011 e *PNAS* 2016. Sun et al., *Cell* 2018. Patriarchi et al., *Science* 2018. Alakurtti et al., *J Cereb Blood Flow Metab* 2015.

**Erro de previsão e IA.** Schultz, Dayan & Montague, *Science* 1997. Fiorillo, Tobler & Schultz, *Science* 2003. Rescorla & Wagner, 1972. Sutton, *Machine Learning* 1988. Dabney et al., *Nature* 2020. Lowet et al., *Nature* 2025. ACM, Prêmio Turing 2024 (anunciado em 03/2025).

**Querer e esforço.** Berridge & Robinson, *Brain Res Rev* 1998. Peciña & Berridge, *J Neurosci* 2005. Salamone et al., *Psychopharmacology* 1991. Salamone & Correa, *Neuron* 2012. Treadway et al., *J Neurosci* 2012. Knutson et al., *NeuroReport* 2001. Sharot et al., *Curr Biol* 2009. Kjaer et al., *Cogn Brain Res* 2002. Manninen et al., *J Neurosci* 2017. Ferreri et al., *PNAS* 2019.

**Dose, psicose e hormônios.** Cools & D'Esposito, *Biol Psychiatry* 2011. Jongkees et al., 2020. Farrell et al., 2012. Seeman et al., *Nature* 1976. Creese, Burt & Snyder, *Science* 1976. Kapur et al., *Am J Psychiatry* 2000. Howes & Kapur, *Schizophr Bull* 2009.

**Parkinson.** Weintraub et al., *Arch Neurol* 2010. Corvol et al., *Neurology* 2018. Bernheimer et al., *J Neurol Sci* 1973. Kordower et al., *Brain* 2013. Su et al., *BMJ* 2025. Tabar et al. e Sawamoto et al., *Nature* 2025.

**Cotidiano.** Salimpoor et al., *Nat Neurosci* 2011. Zald et al., *J Neurosci* 2004. Koepp et al., *Nature* 1998. Egerton et al., *Neurosci Biobehav Rev* 2009. de la Fuente-Fernández et al., *Science* 2001. Volkow et al., *Transl Psychiatry* 2015 (cafeína); *J Neurosci* 2008 e 2012 (sono). Wang et al., *J Nucl Med* 2000. Ando et al., *J Physiol* 2024. Karrer et al., *Neurobiol Aging* 2017. Eisenhofer et al., *J Clin Endocrinol Metab* 1997. Šrámek et al., *Eur J Appl Physiol* 2000. Cohen et al., *JAMA Neurology* 2022.

**Tolerância e vício.** Solomon & Corbit, *Psychol Rev* 1974. Koob & Le Moal, *Neuropsychopharmacology* 2001. Markou & Koob, 1991. Volkow et al., *Life Sci* 2000; *Am J Psychiatry* 2001. Martinez et al., *Am J Psychiatry* 2009. Nader et al., *Nat Neurosci* 2006.

**Tempo e recuperação.** Brown & Schuckit, *J Stud Alcohol* 1988. Hughes, 2007. Budney et al., 2003. Heilig et al., *Addict Biol* 2010. Thrul et al., 2025. Castelo et al., *PNAS Nexus* 2025. Singh et al., *Healthcare* 2024. Lally et al., *Eur J Soc Psychol* 2010. Lopez-Quintero et al., *Addiction* 2011.

**Imprevisível.** Ferster & Skinner, *Schedules of Reinforcement*, 1957. Clark, Boileau & Zack, *Mol Psychiatry* 2019. LENAD III, Unifesp, 2025. Banco Central, nota técnica de 24/09/2024. Lei 15.211/2025 (ECA Digital).

*Como resetar seu sistema de dopamina · ensaio interativo · dados conferidos contra as fontes primárias listadas em `dopamina-pesquisa/` · novembro de 2026*
