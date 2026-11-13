# Como baixar o cortisol (e se você deveria)

**Ensaio interativo sobre o hormônio que prepara o corpo para o dia, segue um relógio e responde ao jeito como você vive · estado da evidência em novembro de 2026 · por Renato Shirakashi**

> Subtítulo para o hero: *O cortisol acorda o corpo, abastece o sangue e prepara para os desafios. O sono, a luz, o café, o treino e o estresse mudam a curva dele ao longo do dia, e é a forma dessa curva que acompanha a saúde.*

> **Nota de formato.** Este é o roteiro completo, com a prosa final e a especificação de cada widget, gráfico e movimento. Ainda não há HTML. O ponto de partida é a moda de 2024 a 2026: o meme "low cortisol", o "cortisol face", o "cortisol cocktail" e os medidores caseiros de saliva. A moda serve só como provocação, e o ensaio trata do cortisol em geral: para que ele serve, como ele segue a hora do dia, o que o estilo de vida e o estresse fazem com ele, quando ele vira doença e o que alguém pode fazer. A pesquisa de apoio está em `cortisol-pesquisa/`: `cortisol-ciencia.md`, `cortisol-intervencoes.md`, `cortisol-pop-e-mitos.md`, `cortisol-prior-art-e-visual.md` e os CSVs de `dados/`. As seções vão de 00 a 09. Em cada uma, a linha `##` é a linha pequena acima do título na página (número e tema), e a linha `###` é o título da seção, que diz a conclusão. A hora do dia aparece dentro das seções 02, 03, 05 e 09, nos gráficos e no texto. Números sem marca foram verificados na fonte primária ([V] nos dossiês). A marca `[S]` indica número de fonte secundária confiável, a conferir antes do HTML. `[CONFERIR: ...]` indica o que falta verificar. A frase que vem logo depois de **[destaque]** recebe o fundo escuro (`.mark`). Siglas técnicas ficam no glossário; o texto usa a palavra comum. Esta nota sai da versão final.

---

## Direção de arte e movimento

Esta parte vale para o ensaio inteiro. Os widgets só descrevem o que é próprio de cada um.

**Papel e tinta.** O fundo é o papel branco da casa (`--paper:#fff`, `--ink:#141414`, `--dim:#6b6b6b`, `--mid:#9a9a9a`, `--line:#e2e2e2`), com `body` de fundo explícito. O tambor da risografia muda a cada ensaio da série. A dopamina saiu em âmbar e índigo; o cortisol sai em vermelhão e verde-petróleo, duas tintas que existem em máquinas Riso (Bright Red e Teal).

| Token | Cor | Uso |
|---|---|---|
| `--alta` | `#e8553e` (vermelhão) | Mais cortisol: subida, pico, manhã, mobilização. Só marcas e texto grande. |
| `--alta-txt` | `#b63b28` | Rótulos e números em vermelhão. |
| `--baixa` | `#0e7a7c` (verde-petróleo) | Menos cortisol: descida, vale, noite. |
| `--alta-soft`, `--baixa-soft` | as mesmas com 14% a 16% de alfa | Faixas de variação e áreas. |
| sobreposição | multiplicar as duas dá um quase preto esverdeado (cerca de `#1f2a2a`) | Terceira tinta nas ilustrações. |
| `--plana` | `--mid #9a9a9a` | A curva plana, sem contraste entre manhã e noite. |

A convenção vale para todos os gráficos: quente quer dizer mais cortisol, frio quer dizer menos, e nenhuma das duas cores quer dizer ruim. A curva saudável precisa das duas, e o gradiente do vermelhão da manhã ao verde-petróleo da noite desenha o argumento. A curva plana aparece em cinza, a ausência de contraste entre as tintas, o que torna o achado da seção 05 visível na própria paleta. Toda curva leva rótulo direto, para não depender da cor. `[CONFERIR: contraste de --alta-txt e --baixa no branco com o validador da skill dataviz; a estimativa do dossiê é cerca de 5,5:1 e 5:1]`

**Tipografia.** Corpo na sans do sistema; títulos, linhas pequenas, rótulos, horários e números em Space Mono, com algarismos tabulares, como no ensaio da dopamina.

**Risografia.** As ilustrações usam a técnica do `dopamina-src/widgets/w00.js`: gerador `rng` com semente fixa, uma camada por tinta, retículas de meio-tom em ângulos clássicos de Riso (padrões SVG), grão com `feTurbulence` que come a tinta, desregistro de 1 a 3 px entre as camadas e `mix-blend-mode: multiply` na sobreposição. Ficam em riso: o corpo do c01, o despertador do c02b, os carimbos de hábito do c03 e do c09, a banca do c04a, os três retratos do c06b, o tubo de saliva do c07 e os ícones da régua do c08. Marcas de gráfico (linhas, barras, pontos, eixos) ficam nítidas. Desenhos de corpo e de órgão têm proporção real.

**O companheiro.** Na barra superior, ao lado de "Cortisol · 2026", um mini-gráfico com uns 96 × 18 px desenha a curva de 24 horas do c02a, e um ponto marca a hora real do relógio do leitor sobre ela. Quem lê às 8h vê o ponto perto do pico; quem lê à meia-noite, no vale. O ponto não se mexe com o scroll. É decorativo (`aria-hidden`), com um `title` que diz "agora são 23h10; neste horário o cortisol costuma estar perto do vale do dia".

**Princípios de movimento.**
1. Um movimento por ideia.
2. O scroll move o tempo dentro do gráfico só quando o gráfico mostra tempo (c02b e c03). Nos outros, o scroll só revela.
3. Revelações por CSS scroll-driven animations (`animation-timeline: view()`), com estado final estático quando o recurso falta.
4. Durações: 180 ms para toque, 450 ms para revelação, 900 ms para uma curva que se desenha. Curva padrão `cubic-bezier(.2,.7,.2,1)`.
5. Com `prefers-reduced-motion: reduce` (`DN.RM`), cada widget mostra o estado final.

**Pilha técnica.** A mesma arquitetura de `dopamina-src/`: `shell.html` com os textos em `data-i18n`, um par `cNN.js` e `cNN.css` por widget, `DN.body`, `DN.RM`, `DN.store` (em `localStorage`, dentro de `try/catch`), `DN.surprise`, `glossary.js` e `build.py`. Gráficos em SVG inline. Canvas 2D só no c06a (um milhão de pontos) e nos pontos do c07. Sem Three.js e sem Matter.js. Widgets construídos por subagentes em paralelo, como no ensaio anterior.

**Celular.** Tudo testado em 375 px, com margem lateral de 16 px e sem rolagem horizontal da página. Pequenos múltiplos viram carrossel com `scroll-snap` ou empilham.

**Bilíngue.** `data-i18n` em cada nó de texto, dicionário PT/EN e a chave `rs_lang`, como nos outros ensaios.

---

## 00 · A moda

### As buscas por cortisol bateram recorde em 2026, puxadas por um meme

Em 12 de fevereiro de 2026, uma conta do TikTok publicou uma edição de poucos segundos em que Agnes Tachyon, personagem do jogo japonês *Uma Musume*, dança a música vietnamita "Ai Đưa Em Về". O vídeo ficou conhecido como "Low Cortisol Dance" e teve 2,8 milhões de visualizações em duas semanas [S]. Na gíria das redes, "low cortisol" (cortisol baixo) virou o nome de uma estética: vídeos que saem de uma cena tensa e passam para uma vida lenta, com música calma. Em março, as buscas mundiais por "cortisol" no Google chegaram ao maior valor da série. As consultas que mais cresceram foram "low cortisol meme", "high cortisol meme", "low cortisol dance" e "low cortisol song", e no topo da lista estava "what is cortisol", o que é cortisol.

A onda começou dois anos antes. Em abril de 2024, o "cortisol cocktail", uma bebida de suco de laranja, água de coco e sal [S], teve o pico de buscas. O "cortisol face", a ideia de que o estresse incha o rosto, teve picos em agosto de 2024 e em maio de 2026. No Brasil, a onda de dezembro de 2024 veio com buscas por "detox de cortisol". Desde setembro de 2025, também dá para medir o cortisol em casa nos Estados Unidos. O Hormometer, da Eli Health, lê uma amostra de saliva com a câmera do celular e custa a partir de 8,25 dólares por teste [S].

As buscas por cortisol passaram as buscas por dopamina, o tema do ensaio anterior desta série. No mundo, o cortisol fica à frente em todos os meses desde fevereiro de 2023. No Brasil, a virada veio em outubro de 2024, e em 2026 as buscas por cortisol foram quase o triplo das buscas por dopamina:

> **WIDGET c00 · `as-buscas`**
> **Título:** Cortisol e dopamina no Google, mês a mês, de 2018 a 2026
> **Instrução:** Compare os dois painéis. As caixas nos picos dizem o que as pessoas buscavam naquele mês.
> **Tipo:** SVG estático, dois painéis empilhados (mundo em cima, Brasil embaixo), séries mensais.
> **Referência:** os gráficos anotados do *Financial Times* (John Burn-Murdoch), com rótulo direto no fim da linha e anotações curtas presas ao ponto; o w13a do ensaio da dopamina, do qual este é a continuação.
> **O que mostra:** as séries mensais de `dados/trends-world_cd.csv` (cortisol × dopamine) e `dados/trends-br_cd.csv` (cortisol × dopamina), jan/2018 a nov/2026, com novembro parcial em traço pontilhado. Cortisol em vermelhão, dopamina em cinza-escuro. Médias anuais no mundo: cortisol 10,9 (2018), 21,2 (2023), 37,7 (2024), 44,2 (2025), 66,5 (2026); dopamina 9,5, 18,4, 19,6, 24,4, 32,5. No Brasil: cortisol 17,1, 27,8, 38,5, 52,8, 71,2; dopamina 12,9, 42,8, 36,8, 33,0, 26,5. Anotações, uma por ponto, sem texto sobre as linhas: mundo, "jan/2023 · última vez que a dopamina empatou ou venceu"; mundo, "mar/2026 = 100 · o meme"; Brasil, "out/2024 · cortisol 42, dopamina 36, a virada"; Brasil, "abr/2026 = 100". Três caixas de "o que se buscava": abr/2024 (mundo), "cortisol detox diet" +9.250% e "viral cortisol cocktail" +2.900%; dez/2024 (Brasil), "o que é detox de cortisol" +104.400%; mar/2026, "low cortisol meme" +11.100% no mundo e +86.650% no Brasil.
> **Leitura:** Desde fevereiro de 2023, o cortisol não ficou atrás da dopamina em nenhum mês no mundo. Os picos vieram de uma bebida, de um detox e de um meme.
> **Interação:** nenhuma, infográfico.
> **Motion:** as linhas se desenham da esquerda para a direita ao entrar na tela (900 ms); as caixas aparecem em seguida, uma de cada vez.
> **Risograph:** nenhuma no gráfico; um celular pequeno em duas tintas no canto superior direito, como selo.
> **Celular/acessibilidade:** os painéis empilham com 260 px de altura cada; as caixas de busca viram uma lista abaixo de cada painel, numerada pelos pontos. Tabela equivalente com as médias anuais para leitor de tela.
> **Legenda:** Google Trends, consultas conjuntas de 12/11/2026 (pytrends). O índice vai de 0 a 100, e 100 é o mês com mais buscas dentro de cada painel; os dois painéis não se comparam entre si.

O grosso da procura é por "cortisol alto", "o que é cortisol" e "exame cortisol". No Brasil, as buscas por "cortisol alto" ficaram sete vezes maiores entre 2018 e 2026. A pergunta por trás delas tem duas partes: o que baixa o cortisol, e se alguém deveria querer baixá-lo. Para responder, primeiro é preciso saber para que ele serve.

---

## 01 · Para que serve

### O cortisol prepara o corpo para o dia e para os desafios dele

O cortisol é o hormônio que põe o corpo para trabalhar. Ele ajuda a acordar, põe açúcar no sangue para os músculos e o cérebro, mantém a pressão de pé e freia a inflamação. Quando aparece um desafio, uma prova, uma corrida ou uma discussão, a produção sobe e o corpo ganha combustível para enfrentá-lo. Quem fabrica o cortisol são as adrenais, duas glândulas pequenas que ficam em cima dos rins.

O pedido sai do cérebro. O hipotálamo avisa a hipófise, logo abaixo dele, e a hipófise manda um sinal pelo sangue até as adrenais. O cortisol produzido volta ao cérebro e desliga o pedido, como um termostato que desliga o aquecedor quando a sala esquenta. Como o pedido nasce no cérebro, ele responde ao que o cérebro percebe. A luz e o sono dizem a hora do dia. A comida, o jejum e o esforço do corpo mudam a necessidade de combustível. E as ameaças, sobretudo as que vêm de outras pessoas, pedem mobilização. Por isso o jeito de viver muda quando e quanto cortisol sai.

A quantidade é pequena. Medida com um marcador de isótopo em 12 voluntários, a produção foi de 9,9 mg por dia (Esteban e colegas, 1991), um cinquenta avos de um comprimido de analgésico de 500 mg. E ele dura pouco: em quatro homens que receberam cortisol na veia, metade da dose saiu do sangue em cerca de 66 minutos (Kraan e colegas, 1997). Por isso o nível sobe e desce várias vezes num mesmo dia. O desenho abaixo mostra o que ele faz em cada parte do corpo:

> **WIDGET c01 · `o-que-ele-faz`**
> **Título:** O que o cortisol faz em cada parte do corpo
> **Instrução:** Siga as linhas do corpo até cada caixa. Na faixa de baixo, veja o que acontece quando ele falta e quando sobra por meses.
> **Tipo:** SVG estático com ilustração em risografia e caixas de texto ligadas por linhas de chamada.
> **Referência:** as pranchas de *The Way We Work*, de David Macaulay; os rótulos com linha de chamada de "Mechanical Watch", de Bartosz Ciechanowski.
> **O que mostra:** um corpo de frente, de proporção real, em duas tintas, com as adrenais em cima dos rins destacadas em vermelhão e uma seta fina do cérebro até elas ("o pedido") e de volta ("o freio"). Seis caixas, cada uma com uma frase e uma fonte: **cérebro**, "ajuda a acordar e a gravar a memória de um momento emocional; demais ou de menos atrapalha a lembrança" (Lupien 2007) [S]; **fígado**, "fabrica glicose a partir de outras moléculas" [S, livro-texto]; **gordura e músculo**, "liberam matéria-prima para essa glicose, e a insulina perde força" [S]; **vasos**, "mantêm a pressão; sem cortisol, a pressão cai quando a pessoa se levanta" (Husebye 2021); **células de defesa**, "freiam a inflamação, e por isso versões do cortisol viraram remédio" [S]; **relógios dos órgãos**, "o pico da manhã acerta os relógios do fígado, dos músculos e das defesas" (Adam 2017). Nas adrenais, "cerca de 10 mg por dia" (Esteban 1991). Faixa de baixo com dois cartões: "falta (doença de Addison, parar corticoide de repente): pressão cai, uma infecção vira emergência" e "sobra por meses (síndrome de Cushing, quase sempre por remédio): rosto redondo, estrias, ossos e músculos fracos", com a nota "ver seção 06".
> **Leitura:** O cortisol é o hormônio da mobilização. Ele dá energia, sustenta a pressão e segura a inflamação, e o corpo adoece tanto com pouco quanto com muito.
> **Interação:** nenhuma, infográfico.
> **Motion:** as linhas de chamada se desenham uma de cada vez de cima para baixo ao rolar (450 ms cada); com `DN.RM`, tudo visível.
> **Risograph:** o corpo inteiro em duas tintas, órgãos em meio-tom de verde-petróleo, adrenais em vermelhão sólido, desregistro de 1 a 3 px e grão. As caixas e linhas ficam nítidas.
> **Celular/acessibilidade:** o corpo fica em cima, com números nos órgãos, e as seis caixas viram uma lista numerada abaixo dele. A ilustração tem `role="img"` e `aria-label` com as seis funções.
> **Legenda:** Funções de livro-texto de endocrinologia [S]; Husebye et al. (*Lancet*, 2021); Adam et al. (*Psychoneuroendocrinology*, 2017), que propõem o papel de relógio; Esteban et al. (*J Clin Endocrinol Metab*, 1991); Lupien et al. (*Brain Cogn*, 2007) [S].

O efeito sobre a inflamação deu ao cortisol uma carreira de remédio. Em setembro de 1948, na Mayo Clinic, o médico Philip Hench deu cortisona a uma mulher de 29 anos com artrite reumatoide, e no terceiro dia ela tinha poucos sintomas [S]. A cortisona é uma forma do cortisol que o corpo ativa. Dois anos depois, Hench, Edward Kendall e Tadeus Reichstein dividiram o Nobel de Medicina [S]. Os corticoides de farmácia, como a prednisona, vêm dessa linhagem.

O cortisol que os vídeos querem baixar é o mesmo que deixa o corpo pronto de manhã e numa prova. Saber se faz sentido baixá-lo depende de quando ele sobe e de quanto.

---

## 02 · Ele segue um relógio

### O cortisol sobe logo depois de acordar e cai cerca de oito vezes até a meia-noite

Antes de ver a curva medida, desenhe a sua. O eixo abaixo vai das 6h da manhã às 6h do dia seguinte. Trace com o dedo ou o mouse onde você acha que o cortisol sobe e onde ele desce:

> **WIDGET c02a · `desenhe-o-dia`**
> **Título:** Desenhe o cortisol de um dia
> **Instrução:** Trace a linha da esquerda para a direita, das 6h às 6h. Ao soltar, a curva medida aparece por cima da sua.
> **Tipo:** SVG com Pointer Events, no formato *You Draw It*.
> **Referência:** "You Draw It: How Family Income Predicts Children's College Chances" (*The New York Times*, 2015), em que o leitor desenha antes de ver o dado; o w00 do ensaio da dopamina, que guarda a resposta do leitor para o fim.
> **O que mostra:** eixo x de 06:00 a 06:00 com marcas a cada 3 h; eixo y em µg/dL de 0 a 22, cortisol no sangue. Antes do desenho, só o eixo e um ponto de partida às 06:00. Depois do desenho, a curva de Debono e colegas (2009): pico médio de 15,5 µg/dL às 08:32, com a faixa de referência de 95% do pico (11,7 a 20,6) como barra vertical; vale abaixo de 2 µg/dL às 00:18, com a faixa do vale (1,5 a 2,5); período de cortisol baixo de 19:43 a 05:31 sombreado em `--baixa-soft`; a subida da madrugada começando por volta das 02:00 a 03:00 [S]. A curva entre os pontos é uma interpolação suave, com gradiente do vermelhão (pico) ao verde-petróleo (vale). A linha do leitor fica em tinta, tracejada. Uma etiqueta compara os dois picos: "Seu pico: 17h. O medido: 8h32."
> **Leitura:** O pico vem pouco depois de acordar, por volta das 8h30. À meia-noite, o cortisol está perto de um oitavo do pico.
> **Interação:** desenhar uma linha; ao soltar, a revelação. A interação ensina por previsão: o leitor compromete um palpite antes do dado. Quando o pico do leitor fica a mais de 4 horas do medido, chama `DN.surprise`. A linha fica guardada em `DN.store` (`rs_cort_draw`) e volta no c09. Botão `apagar e desenhar de novo`.
> **Motion:** a curva medida se desenha da esquerda para a direita em 900 ms, e a faixa da noite escurece em seguida.
> **Risograph:** uma faixa fina acima do eixo com um sol nascente às 06:00 e uma janela escura às 00:18, em duas tintas; nada dentro da área do gráfico.
> **Celular/acessibilidade:** desenho com o dedo em largura total, com `touch-action: none` só na área do gráfico. Alternativa de teclado: oito pontos (06, 09, 12, 15, 18, 21, 00, 03 h) ajustados com as setas, e `Enter` revela. Texto equivalente com os cinco números de Debono.
> **Legenda:** Debono et al. (*J Clin Endocrinol Metab*, 2009), perfis de 24 h em 33 voluntários saudáveis. Vermelhão marca mais cortisol e verde-petróleo marca menos; as cores não indicam bom ou ruim. A curva lisa é uma média e esconde pulsos de cerca de uma hora.

A curva medida vem de 33 voluntários saudáveis que tiveram o sangue colhido ao longo de 24 horas (Debono e colegas, 2009). O pico médio foi de 15,5 µg/dL às 8h32, e o vale ficou abaixo de 2 µg/dL à 0h18. Das 19h43 às 5h31, o cortisol ficou abaixo da média do dia. Do pico ao vale, o nível cai cerca de oito vezes, e isso se repete todo dia. A subida começa por volta das 2h ou 3h, com a pessoa ainda dormindo [S]. Se o seu desenho pôs o pico no fim da tarde, depois do trabalho, ele tratou o cortisol como um registro do cansaço acumulado. O corpo faz o contrário e põe o cortisol mais alto quando o dia começa.

O maior salto vem na primeira meia hora depois de acordar. Em adultos saudáveis, o cortisol da saliva sobe de 50% a 160% nesse intervalo (Clow e colegas, 2004), até 1,5 a 2,6 vezes o valor do momento em que a pessoa abriu os olhos. Num estudo com 509 adultos, a subida média foi de cerca de 50%, e cerca de três em cada quatro pessoas mostraram a subida numa dada manhã (Wüst e colegas, 2000). Fries e colegas (2009) propõem que o tamanho do salto acompanha a antecipação do dia que começa. O gráfico abaixo amplia essa primeira hora:

> **WIDGET c02b · `a-primeira-hora`**
> **Título:** A primeira hora depois de acordar
> **Instrução:** Role a página: o gráfico do dia inteiro se aproxima da primeira hora. Repare na faixa da subida e nas quatro manhãs embaixo.
> **Tipo:** SVG estático com zoom dirigido pelo scroll.
> **Referência:** os zooms de escala de "The Deep Sea", de Neal Agarwal, aplicados a um eixo de tempo; os pequenos múltiplos de Edward Tufte.
> **O que mostra:** estado inicial, a curva de 24 h do c02a com uma lupa sobre os primeiros 60 minutos depois de acordar. Com o scroll, a lupa ocupa o gráfico inteiro. No zoom, eixo x de 0 a 60 min depois de acordar e eixo y em porcentagem do valor ao acordar (100% a 270%). Uma faixa em `--alta-soft` mostra a subida de 50% a 160% nos primeiros 30 minutos (Clow 2004), e uma linha média em +50% (Wüst 2000). Rótulo "pico" entre 30 e 45 min (consenso de Stalder 2016). Um marcador tracejado em 45 min, rotulado "amostra colhida 15 minutos depois do previsto", mostra num ponto da mesma curva que a leitura muda; o valor do marcador é ilustrativo e assim rotulado. Embaixo, quatro mini-curvas da mesma escala: três manhãs com a subida e uma plana, com o rótulo "cerca de 1 em cada 4 pessoas não mostra a subida num dado dia".
> **Leitura:** O cortisol sobe de 50% a 160% na primeira meia hora depois de acordar e começa a descer em seguida. Cerca de três em cada quatro pessoas mostram essa subida numa manhã qualquer.
> **Interação:** nenhuma, infográfico. O scroll só faz o zoom.
> **Motion:** zoom contínuo preso ao scroll (`animation-timeline: view()`), de 24 h para 60 min, com o eixo x trocando os rótulos de hora por minutos no meio do caminho. Com `DN.RM`, mostra os dois quadros lado a lado.
> **Risograph:** um braço saindo do cobertor para desligar o despertador, no canto superior esquerdo, fora da área das marcas.
> **Celular/acessibilidade:** zoom vertical na mesma largura; as quatro mini-curvas em grade 2 × 2. Texto equivalente com os três números.
> **Legenda:** Stalder et al. (*Psychoneuroendocrinology*, 2016), consenso de especialistas sobre a resposta ao despertar; Clow et al. (*Stress*, 2004); Wüst et al. (2000), 509 adultos. Cortisol livre na saliva.

A subida é tão rápida que o horário da coleta muda o resultado de um exame. Atrasar a primeira amostra de saliva em 5 a 15 minutos já distorce a medida (Stalder e colegas, 2016).

A curva lisa também é uma média. As adrenais soltam cortisol em pulsos de cerca de uma hora, e a curva do dia é a altura desses pulsos subindo e descendo (Spiga e colegas, 2014). Esse relógio é a base sobre a qual o estilo de vida trabalha: cada hábito acontece numa hora, e o mesmo hábito pesa diferente às 7h e às 23h.

---

## 03 · O estilo de vida

### Sono, luz, café, comida e treino mexem no cortisol, e o sono é o que mais muda a noite

A luz forte da manhã sobe o pico. Num experimento, 5.000 lux das 5h às 8h elevaram o cortisol em 50% em comparação com luz fraca, e 800 lux elevaram em 35% (Leproult e colegas, 2001) [S]. À tarde, a mesma luz não mudou nada. `[CONFERIR: equivalência de 5.000 e 800 lux com luz natural e luz de sala]` **[destaque]** Os vídeos que mandam tomar sol logo cedo e os que mandam baixar o cortisol pedem coisas opostas para a mesma hora do dia.

O café depende do costume. Em 2005, William Lovallo e colegas deram cafeína ou placebo a 96 adultos durante quatro semanas, num ensaio em que nem os participantes nem os pesquisadores sabiam quem tomava o quê. Depois de cinco dias sem cafeína, três doses de 250 mg (às 9h, às 13h e às 18h) subiram o cortisol ao longo do dia inteiro. Depois de cinco dias tomando 300 ou 600 mg por dia, a dose das 9h deixou de subir o cortisol, e a das 13h ainda subiu entre 13h e 19h. `[CONFERIR: quantos mg de cafeína tem uma xícara de café coado, para converter os 250 mg]` Para quem toma café todo dia, a xícara da manhã já não mexe no cortisol, e a da tarde ainda mexe. O conselho de esperar 90 a 120 minutos depois de acordar para tomar o primeiro café circula em podcasts de saúde e não tem ensaio clínico que o sustente.

A comida também aparece na curva. O almoço provoca um pico de cortisol, maior em mulheres depois de cafeína (Lovallo e colegas, 2006). Uma medição contínua com amostras a cada 10 minutos mostrou pulsos claros nessa hora (Bhake e colegas, 2020). O jejum sobe o cortisol de forma forte, e uma restrição moderada de calorias não sobe; o efeito volta ao normal em semanas (Nakamura e colegas, 2016) [S]. Dietas pobres em carboidratos subiram o cortisol de repouso nas três primeiras semanas (SMD 0,41, um efeito pequeno a médio) e deixaram de subir depois disso (Whittaker e Harris, 2022).

O treino sobe o cortisol conforme a intensidade. Em 2008, Hill e colegas puseram 12 homens ativos para se exercitar durante 30 minutos em três intensidades: 40%, 60% e 80% da capacidade máxima de usar oxigênio. Em repouso, o cortisol caiu 6,6% nesses 30 minutos. A 40%, subiu 5,7%, um valor que não se distingue do zero. A 60%, subiu 39,9%, e a 80%, 83,1%, quase o dobro do valor inicial. Parte dessa subida vem do sangue mais concentrado, porque o exercício tira líquido do plasma; corrigido por isso, o exercício leve baixou o cortisol. A subida de um treino forte faz parte do treino, porque libera combustível enquanto o músculo trabalha, e se desfaz em poucas horas.

O sono pesa na parte da curva que mais importa. Em 1997, Rachel Leproult e colegas mediram o cortisol de homens jovens durante 32 horas seguidas. Eles compararam uma noite normal, uma noite em que só dormiram das 4h às 8h e uma noite em claro. Na manhã seguinte, o cortisol não mudou. Entre 18h e 23h do dia seguinte, ele ficou 37% mais alto depois da noite curta e 45% mais alto depois da noite em claro. O período de cortisol baixo da noite começou pelo menos uma hora mais tarde. Num experimento de 1999, 11 jovens passaram seis noites com 4 horas na cama (Spiegel, Leproult e Van Cauter). O cortisol do fim da tarde ficou mais alto do que na fase de recuperação. No Brasil, 20,2% dos adultos das capitais dormem menos de 6 horas por noite, um em cada cinco, segundo o Vigitel 2025 [S].

O horário do sono move a curva inteira. Em 2001, Piérard e colegas acompanharam 27 militares num voo para o leste que adiantou o relógio em 7 horas, a diferença entre São Paulo e Dubai. Com placebo, o cortisol ao acordar ficou abaixo do normal do segundo ao nono dia. O álcool e o cigarro mexem no cortisol sem hora fixa. O uso pesado de álcool e a abstinência sobem o cortisol, e o uso crônico achata a resposta ao estresse [S]. Fumantes têm cortisol mais alto ao longo do dia e no despertar [S]. O gráfico abaixo põe cada hábito na hora em que acontece:

> **WIDGET c03 · `um-dia-de-habitos`**
> **Título:** O que cada hábito faz com a curva do cortisol, hora a hora
> **Instrução:** Leia o dia da esquerda para a direita. Cada carimbo está na hora em que o hábito acontece, e a área colorida mostra quanto ele muda a curva.
> **Tipo:** SVG estático: uma curva de 24 h com anotações presas à hora, e uma coluna lateral para o que não tem hora.
> **Referência:** "A Day in the Life of Americans", de Nathan Yau (FlowingData), pela linha do dia como eixo; os gráficos de clima anotados do *New York Times*, com o desvio desenhado sobre a curva normal.
> **O que mostra:** eixo x de 06:00 a 06:00, com horas em Space Mono. Curva de referência do c02a em gradiente. Sobre ela, cada hábito desenha o próprio desvio em área clara, com um carimbo em riso e um rótulo com número e fonte, sem texto sobre as linhas:
> - **06:30 · acordar:** subida de 50% a 160% na primeira meia hora (Clow 2004).
> - **05:00 a 08:00 · luz forte:** pico 50% mais alto com 5.000 lux e 35% com 800 lux (Leproult 2001) [S]; um carimbo cinza às 15:00, "a mesma luz à tarde: nada".
> - **09:00 · café:** duas fichas, "quem não toma café: sobe" (tamanho não publicado no resumo, área tracejada) e "quem toma todo dia: nada".
> - **13:00 · almoço:** um pico pequeno, qualitativo, área tracejada (Lovallo 2006; Bhake 2020).
> - **13:00 a 19:00 · café da tarde:** "ainda sobe em quem toma todo dia" (Lovallo 2005), área tracejada.
> - **18:00 · treino de 30 min:** três mini-barras dentro da ficha, 40%: +5,7% (nada), 60%: +39,9%, 80%: +83,1%, com a parte "sangue mais concentrado" em cinza (Hill 2008).
> - **18:00 a 23:00 · depois de uma noite curta:** área em `--alta-soft`, "+37% depois de dormir das 4h às 8h; +45% depois de uma noite em claro" (Leproult 1997), e uma seta "o período de cortisol baixo começa 1 h mais tarde".
> - **00:18 · vale:** rótulo "o ponto mais baixo do dia".
> Coluna lateral "sem hora fixa": jejum, "sobe de forma forte; volta em semanas" (Nakamura 2016) [S]; dieta pobre em carboidratos, "sobe nas 3 primeiras semanas" (Whittaker 2022); álcool, "uso pesado e abstinência sobem" [S]; cigarro, "fumantes têm o dia todo mais alto" [S]; voo para o leste de 7 h, "despertar abaixo do normal por 8 dias" (Piérard 2001). As áreas sem número publicado são tracejadas e rotuladas como forma ilustrativa.
> **Leitura:** Quase todo hábito do dia faz um calombo que se desfaz em uma ou duas horas. A noite curta é o que mais mexe na parte da curva que deveria estar caindo.
> **Interação:** nenhuma, infográfico.
> **Motion:** o scroll faz o dia andar: um cursor vertical vai das 06:00 às 06:00, e cada carimbo cai na hora quando o cursor passa por ela (180 ms). Com `DN.RM`, o dia inteiro já anotado.
> **Risograph:** carimbos de 32 px em duas tintas, como fichas de borracha: despertador, sol, xícara, prato, tênis, travesseiro com celular aceso, lua; na coluna lateral, prato vazio, copo, cigarro e avião.
> **Celular/acessibilidade:** o dia vira vertical, de cima para baixo, com a curva de lado e as fichas à direita, presas à hora. Lista equivalente, hora a hora, para leitor de tela.
> **Legenda:** Curva de base de Debono et al. (2009). Clow et al. (2004); Leproult et al. (2001) [S] e (*Sleep*, 1997); Lovallo et al. (*Psychosom Med*, 2005 e 2006); Bhake et al. (2020); Hill et al. (*J Endocrinol Invest*, 2008), 12 homens; Nakamura et al. (*Stress*, 2016) [S]; Whittaker e Harris (2022); Piérard et al. (2001). Os estudos são pequenos e, em sua maioria, com homens. A meia-vida do cortisol, de cerca de 66 minutos (Kraan et al., 1997), dá o tempo de decaimento dos calombos.

Os efeitos de sono aparecem com clareza nos protocolos severos. Uma meta-análise de 2024 com 24 estudos de privação aguda não achou efeito consistente, e cinco noites de restrição leve não mudaram a subida do despertar em 111 homens (Kontou e colegas, 2022) [S]. Quase nenhum ensaio testou o caminho inverso, se dormir mais baixa o cortisol da noite. `[CONFERIR: ausência de ensaio de extensão de sono com cortisol como desfecho]`

Ao longo de semanas, o exercício regular tem o efeito contrário ao de um treino isolado. Uma meta-análise em rede de 44 ensaios com pessoas em sofrimento psicológico achou a maior queda de cortisol perto de 530 MET-minutos de exercício por semana (Li e colegas, 2025). Isso dá algo como duas horas e meia de caminhada rápida. Entre os tipos de exercício, o ioga teve a queda mais confiável (SMD −0,59), e o treino intervalado de alta intensidade tendeu a subir o cortisol. Num ensaio de 2026 com 130 adultos, um ano de 150 minutos semanais de exercício aeróbico baixou o cortisol guardado no cabelo (Gianaros e colegas) [S].

---

## 04 · O estresse que mais pesa

### O cortisol dispara quando alguém avalia você e o resultado foge do seu controle

Em 1993, Clemens Kirschbaum, Karl Pirke e Dirk Hellhammer, da cidade alemã de Trier, publicaram um jeito padronizado de provocar estresse em laboratório. A pessoa tem 10 minutos para preparar um discurso e depois passa 10 minutos falando e fazendo contas de cabeça diante de uma banca que não sorri. O teste eleva o cortisol da saliva a 2 a 4 vezes o valor de repouso. `[CONFERIR: primeiro nome de Pirke no artigo de 1993]`

A versão abaixo dura um minuto. A banca é desenhada, e a conta é sua: subtraia 13 a partir de 1.022 e digite cada resultado. Quando o minuto acabar, aparece a curva do cortisol de quem faz o teste completo:

> **WIDGET c04a · `a-banca`**
> **Título:** Um minuto diante da banca
> **Instrução:** Subtraia 13 a partir de 1.022 e digite cada resultado o mais rápido que puder. Se errar, volte ao 1.022. Você pode pular a tarefa quando quiser.
> **Tipo:** HTML para a tarefa e SVG para a curva.
> **Referência:** "Adventures with Anxiety", de Nicky Case, em que o leitor sente a lógica do alarme; os testes cronometrados das matérias de ciência do *New York Times*.
> **O que mostra:** em cima, três avaliadores de jaleco, uma prancheta e uma câmera, em risografia, olhando para o leitor. Embaixo, um campo numérico, um cronômetro de 60 s e o último número certo. A cada erro, um avaliador diz "Errado. Comece de novo do 1.022." Depois do minuto (ou do botão `pular`), a banca encolhe e entra a curva: eixo x de −10 a +80 min a partir do início do teste; eixo y em múltiplos do valor de repouso (1× a 4×). Faixa de resultado de 2× a 4× (Kirschbaum 1993). Uma curva fina, "sinal do cérebro para as adrenais", com pico entre +11 e +20 min, e a curva do cortisol com pico entre +21 e +40 min; volta ao repouso entre 41 e 60 min depois do fim. Blocos no topo do eixo: "preparação, 10 min" e "discurso e contas, 10 min". Um marcador "o teste acabou aqui" no fim do segundo bloco. O eixo é relativo, sem valores absolutos.
> **Leitura:** O cortisol chega atrasado. O pico vem de 21 a 40 minutos depois do começo do teste, quando a parte difícil está acabando ou já acabou, e some em cerca de uma hora.
> **Interação:** a tarefa de um minuto, com saída fácil sempre visível. O placar ("você chegou a 957") fica ao lado da curva. A interação ensina pelo que se sente: o leitor percebe o momento mais tenso e vê que o cortisol chega depois dele.
> **Motion:** durante a tarefa, os avaliadores piscam e anotam, um de cada vez, a cada 8 a 12 s. Na revelação, a curva fina se desenha primeiro e a do cortisol 600 ms depois, para o atraso ser visto.
> **Risograph:** a banca é a maior ilustração da seção: três figuras de proporção real, jaleco e prancheta, em vermelhão e verde-petróleo, com desregistro.
> **Celular/acessibilidade:** teclado numérico nativo (`inputmode="numeric"`); banca em cima com 140 px, tarefa embaixo. Botão `pular` com 44 px. Com leitor de tela, a tarefa é opcional e a curva tem descrição completa. Sem som.
> **Legenda:** Kirschbaum, Pirke e Hellhammer (*Neuropsychobiology*, 1993); tempos de Dickerson e Kemeny (*Psychol Bull*, 2004). A forma da curva entre os tempos publicados é ilustrativa. A tarefa da página é uma versão curta e não reproduz o teste.

Durante a conta, a tensão é maior enquanto a banca olha, e o cortisol ainda não começou a subir. O pico vem de 21 a 40 minutos depois do início, e o cortisol volta ao valor de repouso entre 41 e 60 minutos depois do fim (Dickerson e Kemeny, 2004).

Em 2004, Sally Dickerson e Margaret Kemeny reuniram 208 estudos de laboratório para saber que tipo de situação sobe o cortisol. Filmes tristes ou assustadores e barulho não mudaram nada. Falar em público subiu, e falar em público fazendo contas subiu mais. O que separou as situações foram dois ingredientes: alguém avaliando o desempenho e um resultado que a pessoa não consegue controlar. Com os dois juntos, a pessoa típica do grupo terminou com mais cortisol do que 82% das pessoas do grupo de controle. Com um ingrediente só, a proporção ficou perto de 63%:

> **WIDGET c04b · `plateia-e-controle`**
> **Título:** O que sobe o cortisol num laboratório
> **Instrução:** Compare a barra do canto inferior direito com as outras. Depois olhe a faixa de baixo, com filme e barulho.
> **Tipo:** SVG estático, matriz 2 × 2 com barras e uma faixa de comparação.
> **Referência:** as matrizes anotadas da *The Economist*; os gráficos de efeito com intervalo de confiança do Our World in Data.
> **O que mostra:** linhas "alguém avalia: não / sim"; colunas "dá para controlar: sim / não". Em cada célula, uma barra horizontal com o tamanho do efeito (d) e a conversão em porcentagem do grupo de controle que fica abaixo da média do grupo estressado. Avaliação sim + controle não: d = 0,92 (IC 0,70 a 1,14), "82%", em vermelhão. Só incontrolabilidade: d = 0,32, "cerca de 63%". Só avaliação: d = 0,35, "cerca de 63%". Nenhum dos dois: barra cinza com o rótulo "tarefas sem esses ingredientes", sem número. Faixa de baixo, na mesma escala: filme d = −0,13 e barulho d = −0,06, com o rótulo "sem diferença do zero"; falar em público 0,39; falar e fazer contas 0,87. Uma nota lateral: "sensação de estresse relatada: igual com e sem os dois ingredientes".
> **Leitura:** Com plateia e sem controle, o efeito é quase três vezes o de cada ingrediente sozinho. Filme triste e barulho ficaram no zero.
> **Interação:** nenhuma, infográfico.
> **Motion:** as barras crescem a partir do zero ao entrar na tela, a do canto inferior direito por último, com 300 ms de atraso.
> **Risograph:** nenhuma no gráfico; ícones pequenos em duas tintas no cabeçalho das linhas e colunas (um olho, um cadeado aberto).
> **Celular/acessibilidade:** a matriz vira quatro cartões empilhados, na ordem nenhum, avaliação, controle, os dois, com a mesma escala de barra. Tabela equivalente.
> **Legenda:** Dickerson e Kemeny (*Psychol Bull*, 2004), meta-análise de 208 estudos de laboratório, em sua maioria com universitários jovens. O d mede a distância entre os grupos em desvios padrão; 0,2 é pequeno e 0,8 é grande. As porcentagens são a conversão padrão do d (cálculo meu).

**[destaque]** Nos mesmos estudos, as pessoas relataram o mesmo nível de estresse com e sem os dois ingredientes, e o cortisol foi muito diferente. O cortisol mede pouco do nervosismo que a pessoa sente e responde sobretudo a ser julgado sem poder controlar o resultado.

Esses dois ingredientes estão em muitas situações comuns: uma entrevista de emprego, uma apresentação para o chefe, uma prova, uma discussão em que a outra pessoa tem a palavra final. Os estudos feitos à tarde acharam efeitos maiores (d = 0,46) do que os feitos de manhã (d = 0,14), porque de manhã o cortisol já está alto e uma subida a mais aparece menos.

---

## 05 · Um dia ruim contra meses ruins

### Num dia difícil, o pico de cortisol ajuda; meses de estresse deixam o cortisol alto à noite, e quem vive assim adoece e morre mais

O pico de um dia difícil tem uso. Jeremy Jamieson e colegas (2010) disseram a um grupo de estudantes, antes de uma prova de matemática do GRE, o exame de admissão de pós-graduação americano, que a ativação do corpo melhora o desempenho. Esse grupo teve mais ativação, medida por uma enzima da saliva que acompanha a adrenalina, e tirou notas maiores no laboratório e na prova real, de um a três meses depois. Numa revisão Cochrane de quatro ensaios com 165 pacientes graves, hidrocortisona dada logo depois de um trauma reduziu o risco de estresse pós-traumático para cerca de um sexto (RR 0,17; Amos e colegas, 2014).

Meses ruins mudam outra coisa. Numa meta-análise de 2007, Gregory Miller, Edith Chen e Eric Zhou mostraram que o cortisol fica alto no começo de um estresse prolongado e cai com o passar do tempo. Estressores traumáticos, incontroláveis ou que ameaçam o corpo deixaram o dia "alto e plano", com pouca diferença entre manhã e noite. Em pessoas com estresse pós-traumático, o cortisol tende a ficar mais baixo. No cabelo, que guarda a exposição de meses, quem estava sob estresse contínuo tinha 43% mais cortisol, e quem tinha estresse pós-traumático, 17% menos (Stalder e colegas, 2017, 66 estudos com 10.289 pessoas). Adultos que sofreram maus-tratos ou adversidade na infância respondem com menos cortisol a um estresse social (g = −0,39; Bunea e colegas, 2017).

O estresse do trabalho no Brasil aparece nos números do INSS. Os afastamentos por transtornos mentais passaram de cerca de 283 mil em 2023 para cerca de 472 mil em 2024 [S]. Os afastamentos por burnout foram de 823 em 2021 para 4.880 em 2024, a partir de uma base pequena [S]. Uma revisão de 31 estudos não achou diferença de cortisol entre pessoas com burnout e controles (Danhof-Pont e colegas, 2011), e o burnout segue sem marcador no sangue ou na saliva.

O maior estudo sobre a forma da curva acompanha servidores públicos britânicos, o Whitehall II. Num dia útil, 4.047 deles, com idade média de 61 anos, colheram saliva seis vezes: ao acordar, 30 minutos depois, 2,5 horas depois, 8 horas depois, 12 horas depois e na hora de dormir. Kumari e colegas (2011) seguiram essas pessoas por 6,1 anos, e 139 morreram nesse período, cerca de 3 em cada 100.

**[destaque]** O cortisol da manhã e o salto do despertar não tiveram relação com as mortes. A relação apareceu na inclinação, o quanto o cortisol desceu do acordar até a hora de dormir. Para cada desvio padrão de curva mais plana, o risco de morte por qualquer causa foi 30% maior (HR 1,30, intervalo de 1,09 a 1,55). O de morte cardiovascular foi 87% maior (HR 1,87, de 1,32 a 2,64). Um desvio padrão separa, grosso modo, uma pessoa mediana de uma que está entre as 16% de curva mais plana.

Em 2017, Emma Adam e colegas juntaram 80 estudos, com 179 associações entre a inclinação da curva e a saúde, somando cerca de 26 mil pessoas. Curvas mais planas acompanharam pior saúde em 10 de 12 tipos de desfecho. A correlação média foi pequena, r = 0,147, e chegou a 0,288 em imunidade e inflamação. As curvas e as barras abaixo mostram os dois estudos:

> **WIDGET c05 · `ingreme-e-plana`**
> **Título:** Duas curvas com a mesma manhã e o que cada uma acompanha
> **Instrução:** No primeiro painel, veja o que um exame da manhã leria em cada curva. No segundo, compare as barras com a linha do 1, que quer dizer risco igual.
> **Tipo:** SVG estático, três painéis.
> **Referência:** os gráficos de floresta (forest plots) redesenhados da Bloomberg Graphics; as comparações de duas formas com o mesmo valor inicial dos explicadores da *The Pudding*.
> **O que mostra:** painel 1, eixo x com os seis horários do Whitehall II para quem acorda às 7h: 07:00, 07:30, 09:30, 15:00, 19:00 e 23:00 (hora de dormir). Curva íngreme em gradiente vermelhão a verde-petróleo; curva plana em `--plana`. As duas saem do mesmo ponto ao acordar. Um termômetro pequeno no ponto da manhã, com a mesma leitura nas duas, rotulado "exame da manhã: igual". Ao lado, dois mini-gráficos com os dois jeitos de ficar plana: "manhã baixa" e "noite alta". Painel 2, razões de risco por desvio padrão de curva mais plana: morte por qualquer causa 1,30 (1,09 a 1,55); morte cardiovascular 1,87 (1,32 a 2,64), com a contagem "139 mortes, 32 cardiovasculares". Duas linhas de texto sem ponto: "cortisol da manhã: sem associação" e "salto do despertar: sem associação". Um ponto vazado para "cortisol na hora de dormir, morte cardiovascular: 1,98 [S]", sem intervalo. Painel 3, barras horizontais de r por tipo de desfecho (Adam 2017): imunidade e inflamação 0,288; comportamento externalizante 0,254; câncer 0,231; outros mentais 0,176; fadiga 0,167; internalizante 0,129; outros físicos 0,125; depressão 0,106; cardiovascular 0,098 (sem significância); obesidade 0,093; ansiedade −0,084 (sem significância), com a média 0,147 como linha vertical.
> **Leitura:** Um exame da manhã não distingue as duas curvas. Nos estudos, a curva que desce pouco até a noite acompanha mais doença e mais morte, e o efeito é pequeno e observacional.
> **Interação:** nenhuma, infográfico.
> **Motion:** no painel 1, as duas curvas saem juntas do ponto da manhã e se separam ao longo de 900 ms. Nos painéis 2 e 3, as barras crescem a partir da linha de referência.
> **Risograph:** um selo pequeno no painel 2, "Whitehall II · 4.047 servidores", com um prédio de repartição em duas tintas.
> **Celular/acessibilidade:** os três painéis empilham; o painel 3 vira barras horizontais com 320 px de altura. Tabela equivalente com todos os números.
> **Legenda:** Kumari et al. (*J Clin Endocrinol Metab*, 2011), Whitehall II. Adam et al. (*Psychoneuroendocrinology*, 2017), 80 estudos e 179 associações. Os horários do painel 1 são os intervalos do Whitehall II aplicados a quem acorda às 7h. HR é a razão de risco; 1 quer dizer risco igual.

Os dois estudos são observacionais. Uma curva plana pode ser consequência de uma doença que já existia, e Adam e colegas discutem se ela é marcador ou mecanismo. No Whitehall II, as mortes cardiovasculares foram poucas, 32. O que os dados mostram com segurança é onde está a informação: na descida até a noite, e quase nada no valor da manhã. Uma curva fica plana de dois jeitos, com a manhã baixa ou com a noite alta. Os hábitos da seção 03 mexem nos dois lados: a luz cedo e o despertar levantam a manhã, e a noite curta levanta a noite.

---

## 06 · Quando vira doença

### Cortisol alto de verdade vem quase sempre de um remédio, e cortisol de menos é uma emergência

O rosto redondo dos vídeos de "cortisol face" tem nome em medicina: face de lua, um dos sinais da síndrome de Cushing. A síndrome vem de excesso de cortisol durante meses, e a face de lua aparece junto com outros sinais [S]. Os mais comuns são gordura na nuca e acima da clavícula, estrias largas e arroxeadas, pele fina que fica roxa com facilidade, braços e pernas finos e fraqueza nas coxas. Christie Turin More, endocrinologista da Universidade do Colorado, lembra que "cortisol face" não é termo médico e que um rosto inchado sem outros sinais quase nunca é Cushing [S].

O Cushing que o próprio corpo produz, por um tumor na hipófise ou na adrenal, é raro. No oeste da Suécia, entre 2002 e 2017, surgiram 3,2 casos novos por milhão de habitantes por ano (Wengander e colegas, 2019), cerca de três por ano numa cidade de um milhão de pessoas. A causa mais comum de Cushing é o corticoide de remédio (Lacroix e colegas, 2015). No Reino Unido, cerca de 1% da população está tomando corticoide oral num dado momento (Fardet e colegas, 2011). Nos Estados Unidos, são 1,2%, e 28,8% desses usuários tomam há cinco anos ou mais (Overman e colegas, 2013). Entre adultos americanos com plano de saúde privado, 21,1% receberam pelo menos uma receita curta, de menos de 30 dias, em três anos. Nos 30 dias seguintes, o risco de sepse foi 5,3 vezes maior, o de trombose 3,3 vezes e o de fratura 1,9 vez (Waljee e colegas, 2017). O quadro abaixo põe esses grupos num milhão de pessoas:

> **WIDGET c06a · `um-milhao`**
> **Título:** Um milhão de pessoas e quem tem o cortisol fora do normal
> **Instrução:** Cada ponto é uma pessoa. As três lupas aproximam os grupos; procure os três pontos do Cushing.
> **Tipo:** Canvas 2D estático (um milhão de pontos de 1 px) com três lupas em SVG.
> **Referência:** os pictogramas de escala de Neal Agarwal; o campo de 170 mil pontos do w02a do ensaio da dopamina, aqui sem interação.
> **O que mostra:** um quadrado de 1.000 × 1.000 pontos cinza muito claros. Em vermelhão, um bloco de cerca de 10 mil pontos, com o rótulo "tomam corticoide oral agora · 0,85% no Reino Unido, 1,2% nos EUA" (a faixa de 8.500 a 12 mil aparece como borda do bloco). Em verde-petróleo, 144 pontos, "têm doença de Addison autoimune (Noruega)". Em tinta, 3 pontos, "ganham Cushing produzido pelo próprio corpo a cada ano · 3,2 por milhão (Suécia)". Cada grupo tem uma lupa circular presa por linha fina ao lugar dele, com os pontos ampliados e contáveis.
> **Leitura:** Num milhão de pessoas, cerca de 10 mil tomam corticoide hoje. Cerca de 3 desenvolvem Cushing por conta própria a cada ano.
> **Interação:** nenhuma, infográfico.
> **Motion:** ao entrar na tela, o bloco de corticoide acende primeiro, depois os 144, depois os 3, e cada lupa se abre em seguida (450 ms cada).
> **Risograph:** nenhuma; as lupas têm aro em duas tintas com leve desregistro.
> **Celular/acessibilidade:** no celular, 250 mil pontos com o texto "cada ponto, 4 pessoas", e as lupas empilham abaixo do quadrado. Texto equivalente com os três números.
> **Legenda:** Fardet, Petersen e Nazareth (*Rheumatology*, 2011); Overman et al. (*Arthritis Care Res*, 2013); Erichsen et al. (*J Clin Endocrinol Metab*, 2009); Wengander et al. (*Clin Endocrinol*, 2019). Prevalência (quantos têm agora) e incidência (quantos surgem por ano) estão misturadas de propósito e rotuladas.

Uma dose comum de 20 mg de prednisona equivale, em potência, a cerca de 80 mg de hidrocortisona, o nome do cortisol como remédio [S]. **[destaque]** É oito vezes o cortisol que o corpo fabrica num dia, todos os dias do tratamento.

O estresse do dia a dia fica longe disso. Os 43% a mais no cabelo de quem vive um estresse contínuo correspondem a 1,4 vez o normal. No Cushing, o cortisol livre na urina costuma ficar várias vezes acima do limite superior, e a curva perde o vale da meia-noite [S]. É esse vale que um dos exames de triagem procura: o cortisol da saliva colhida entre 23h e meia-noite, com sensibilidade e especificidade acima de 90% para Cushing (Raff, 2009). Os três retratos abaixo comparam a mesma pessoa em três situações:

> **WIDGET c06b · `tres-retratos`**
> **Título:** Cushing, um semestre de estresse e o "cortisol face"
> **Instrução:** Compare os três retratos da mesma pessoa e siga as linhas até cada sinal. Embaixo, a régua mostra quanto cortisol há em cada caso.
> **Tipo:** SVG estático com ilustração em risografia e uma régua de magnitude.
> **Referência:** as pranchas anatômicas lado a lado de *The Way We Work*, de David Macaulay; os rótulos com linha de chamada de "Mechanical Watch", de Ciechanowski.
> **O que mostra:** três retratos de busto da mesma pessoa, com o mesmo enquadramento e proporção real. (1) "Síndrome de Cushing, meses de excesso": rosto redondo, gordura na nuca e acima da clavícula, estrias largas e arroxeadas no abdome, pele fina com roxos, braços finos; cada sinal com linha de chamada e rótulo, sem texto sobre traço. (2) "Um semestre de estresse comum": a mesma pessoa sem mudança de corpo, com olheiras. (3) "'Cortisol face' do TikTok": inchaço de manhã que some até o almoço, com quatro causas comuns rotuladas (sal, álcool, choro, sono de bruços) [S]. Embaixo, uma régua horizontal em múltiplos do normal, escala logarítmica: "estresse em curso, cabelo: 1,43×" (Stalder 2017); "prednisona 20 mg: cerca de 8× a produção do dia" (cálculo); "Cushing, urina de 24 h: várias vezes o limite" com ponto vazado `[CONFERIR: múltiplo típico]`. Um relógio pequeno ao lado do retrato 1 marca 23:30, "o exame procura o vale que sumiu".
> **Leitura:** O rosto de lua do Cushing vem com outros sinais e de meses de excesso. O estresse do dia a dia muda o cortisol em dezenas de por cento, e o inchaço da manhã tem outras causas.
> **Interação:** nenhuma, infográfico.
> **Motion:** os três retratos entram juntos; as linhas de chamada se desenham uma de cada vez no retrato 1 ao rolar.
> **Risograph:** o maior desenho do ensaio. Duas tintas, meio-tom para o volume, desregistro de 1 a 3 px, grão. A pele em vermelhão a 15% de retícula, as sombras em verde-petróleo.
> **Celular/acessibilidade:** três painéis em carrossel com `scroll-snap`, mesmo enquadramento, e três pontos para trocar de retrato; a régua fica fixa abaixo. Descrição de cada retrato em texto, com `role="img"` e `aria-label` com os sinais listados.
> **Legenda:** Sinais clínicos do Cushing segundo Lacroix et al. (*Lancet*, 2015) [S]. Stalder et al. (*Psychoneuroendocrinology*, 2017). Equivalência de 5 mg de prednisona para 20 mg de hidrocortisona, tabela padrão [S]. Christie Turin More, CU Anschutz, 25/11/2024 [S].

Em 2026, a moda levou mais pacientes a pedir dosagem de cortisol, muitas vezes um exame de sangue colhido a qualquer hora, que não serve para triagem (Shroff, *2 Minute Medicine*, 2026) [S]. Obesidade, depressão, álcool e anticoncepcional oral podem subir o cortisol do exame sem que a pessoa tenha Cushing [S]. A diretriz da Endocrine Society manda primeiro excluir o uso de corticoide e investigar só quem tem vários sinais que pioram com o tempo (Nieman e colegas, 2008).

Cortisol de menos é mais perigoso a curto prazo. Na doença de Addison, o sistema imune destrói a parte da adrenal que fabrica cortisol. Na Noruega, 144 pessoas em cada milhão têm a forma autoimune da doença (Erichsen e colegas, 2009). Sem cortisol, a pressão cai quando a pessoa se levanta, e uma diarreia ou uma febre podem virar uma crise adrenal, com pressão baixa e choque. Hahner e colegas (2015) acompanharam por dois anos 423 pacientes, todos ensinados a aumentar a dose do remédio quando adoecem. Houve 8,3 crises por 100 pacientes por ano, uma crise a cada 12 anos para cada paciente, e cerca de 6% delas terminaram em morte. Infecção intestinal, febre e estresse emocional desencadearam 20% das crises cada um.

A causa mais comum de cortisol baixo de verdade é o espelho da causa mais comum de cortisol alto: parar um corticoide de uma vez [S]. Semanas de remédio fazem o cérebro ler "cortisol suficiente" e desligar o pedido às adrenais, que param de produzir. Quando o remédio some de repente, elas ainda estão paradas. `[CONFERIR: tempo de recuperação das adrenais depois de corticoide prolongado]` Quem toma corticoide há semanas precisa falar com o médico antes de parar.

Nos vídeos, cortisol de menos aparece como "fadiga adrenal", a ideia de que anos de estresse cansam a glândula. Em 2016, os endocrinologistas Flávio Cadegiani e Claudio Kater, da Unifesp, procuraram a condição na literatura. De 3.470 artigos, 58 estudos atenderam aos critérios, e os resultados foram, nas palavras deles, quase sistematicamente conflitantes. A conclusão do artigo diz que a fadiga adrenal "is still a myth", continua um mito. As buscas mundiais por "adrenal fatigue" tiveram o pico em março de 2018 e caíram para menos de um terço até 2026, enquanto "cortisol face" e "cortisol belly" subiram até o mesmo volume. O tratamento errado pode criar a doença verdadeira: hidrocortisona receitada para "fadiga adrenal" desliga as adrenais, e ao parar a pessoa pode ter insuficiência adrenal de verdade [S]. Em 2018, Akturk e colegas testaram os 12 suplementos de "suporte adrenal" mais populares, e todos tinham hormônio da tireoide; 7 tinham pelo menos um esteroide, nenhum declarado no rótulo [S].

---

## 07 · O medidor

### Uma medida de saliva diz mais sobre aquela manhã do que sobre você

O Hormometer está à venda nos Estados Unidos e no Canadá desde setembro de 2025. A pessoa põe um cartucho na boca por 60 segundos, e o celular lê o resultado em cerca de 20 minutos [S]. A Eli Health afirma 97% de acurácia em comparação com um método de laboratório, sem publicar o tamanho da amostra, o método de referência nem a variação entre medidas. A própria página diz que o aparelho é um produto de bem-estar e não substitui exames clínicos. `[CONFERIR: buscar de novo no PubMed e no medRxiv um estudo independente de validação]` Relógios como o Whoop dão uma nota de estresse calculada a partir dos batimentos do coração e não medem cortisol [S].

Um aparelho perfeito ainda teria de lidar com a biologia. O banco de dados CIRCORT reuniu 104.623 amostras de saliva de 18.698 pessoas (Miller e colegas, 2016). Em mulheres de 21 a 30 anos, uma hora depois de acordar, a mediana foi de 7,5 nmol/L, e 90% dos valores ficaram entre 2,1 e 26,7 nmol/L. Do valor mais baixo ao mais alto considerado normal, no mesmo horário, vai um fator de 13. A maior parte da variação estava dentro da mesma pessoa, de um dia para o outro: cerca de 54% da variância, contra 23% entre pessoas diferentes (cálculo a partir da tabela 2 do artigo).

Uma única amostra às 8h teve confiabilidade entre 0,18 e 0,47 de uma visita para outra, numa escala em que 1 seria a mesma resposta toda vez (Golden e colegas, 2011). Hellhammer e colegas (2007) calcularam que são precisos de 2 a 6 dias de coleta para medir o que é próprio da pessoa. No simulador abaixo, a mesma pessoa saudável colhe saliva uma hora depois de acordar. Colha uma amostra, depois outras, e veja onde elas caem na faixa normal:

> **WIDGET c07 · `colha-de-novo`**
> **Título:** A mesma pessoa, uma amostra de saliva por manhã
> **Instrução:** Toque em colher hoje para sortear uma manhã. Colha pelo menos dez e depois ligue a média de 6 dias.
> **Tipo:** SVG para eixos e faixas, Canvas 2D para os pontos.
> **Referência:** as simulações de amostragem de "Seeing Theory" (Brown University); os pontos que se acumulam nos explicadores de Nicky Case.
> **O que mostra:** eixo y em nmol/L, escala logarítmica de 1 a 40. Faixa de referência do CIRCORT para mulheres de 21 a 30 anos, uma hora depois de acordar: 5º percentil 2,1, mediana 7,5, 95º percentil 26,7, como um leque cinza com a mediana em traço. Uma linha tracejada com a mediana própria da pessoa simulada, escondida até o 10º ponto. Cada toque sorteia uma manhã: o valor vem de uma distribuição log-normal em que a variação dentro da pessoa é cerca de 2,3 vezes a variação entre pessoas (54% contra 23% da variância, CIRCORT), mais um atraso de coleta sorteado de 0 a 15 min. O primeiro ponto tem semente fixa e cai alto, perto do 90º percentil. Ao lado, um histograma vertical dos pontos colhidos. Uma faixa fininha em vermelhão em volta de cada ponto, "erro do aparelho, se for de 3%", e uma faixa larga em cinza, "variação do dia". Contador: "manhãs colhidas: 7".
> **Leitura:** Num mesmo horário, a faixa normal vai de 2 a 27 nmol/L. Uma amostra sozinha cabe em quase tudo; são precisos de 2 a 6 dias para enxergar a pessoa.
> **Interação:** `colher hoje` (um ponto por toque) e, depois de 10 pontos, o interruptor `média de 6 dias`, que troca os pontos pela média móvel de 6 manhãs e mostra como ela se aproxima da mediana da pessoa. `recomeçar` zera. A interação ensina por acumulação: com um ponto o leitor acredita no número; com dez, vê a nuvem.
> **Motion:** cada ponto cai do topo até o valor em 450 ms e acende o bloco correspondente no histograma. A média de 6 dias se desenha como linha em 900 ms.
> **Risograph:** um tubo de coleta de saliva, pequeno, em duas tintas, ao lado do botão.
> **Celular/acessibilidade:** gráfico em cima, botão grande (48 px) embaixo, histograma vira uma faixa horizontal sob o gráfico. `aria-live` anuncia cada valor e em que percentil caiu. Com `DN.RM`, 14 pontos já colhidos e a média desenhada.
> **Legenda:** Miller et al. (*Psychoneuroendocrinology*, 2016), CIRCORT; Golden et al. (*Eur J Epidemiol*, 2011); Hellhammer et al. (2007). A pessoa é simulada a partir dos componentes de variância do CIRCORT; os 3% de erro do aparelho são uma hipótese generosa, sem relação com dados publicados de nenhum produto.

O primeiro ponto pareceu dizer algo sobre a pessoa, e os seguintes se espalharam por boa parte da faixa normal. A média de seis manhãs fica perto da mediana dela. O exame que ajuda o médico olha para outro horário: a saliva colhida perto da meia-noite, quando o vale deveria estar baixo, em quem tem sinais de Cushing (Raff, 2009). Um medidor usado de manhã olha para a parte da curva que menos informa.

A procura por exames também cresceu no Brasil. No SUS, as dosagens de cortisol aprovadas passaram de 188 mil em 2019 para 510 mil em 2025, 2,7 vezes mais. As de estradiol, outro hormônio, cresceram 2,3 vezes no mesmo período. A razão entre as duas ficou parada em 0,27 a 0,28 de 2016 a 2022 e subiu para 0,32 a 0,33 a partir de 2024. Esse excesso de 15% a 20% coincide com a onda das redes, sem provar que veio dela.

---

## 08 · Os truques

### Os truques para baixar o cortisol mexem pouco, e várias coisas que o sobem fazem bem

A ashwagandha, uma planta da medicina tradicional indiana, é o suplemento mais estudado contra o cortisol. Os ensaios são pequenos, em sua maioria feitos na Índia, e muitos foram financiados por fabricantes de extratos patenteados [S]. Uma meta-análise de 2025, com 7 ensaios e 488 pessoas, achou queda de 1,16 µg/dL no cortisol do sangue de manhã e nenhuma mudança no estresse que as pessoas relatavam. Outras duas acharam quedas de 2,58 µg/dL (2024) e 3,27 µg/dL (2026). Entre o pico da manhã e a meia-noite, o cortisol cai cerca de 13,5 µg/dL sozinho, e a queda atribuída à planta vai de um doze avos a um quarto disso. Uma meta-análise de 2026 com 23 ensaios achou um efeito padronizado de −1,18, maior do que o de muitos remédios, e efeitos grandes em ensaios pequenos costumam encolher quando aparecem estudos maiores.

A planta também tem risco. Björnsson e colegas (2020) descreveram cinco casos de lesão no fígado ligados a ela, e revisões de 2026 reúnem de 26 a 37 casos, alguns com transplante [S]. A Dinamarca proibiu a ashwagandha em suplementos em 2023 [S]. **[destaque]** No Brasil, ela é proibida como suplemento desde 2022, e as buscas por ela no Google dobraram entre 2023 e 2025. Em 21 de outubro de 2026, a Anvisa reforçou que fabricação, venda, distribuição e uso são proibidos no país [S].

A meditação mostra um padrão que se repete no tema. Na meta-análise de Koncz e colegas (2021), a meditação baixou o cortisol do sangue (g = 0,62, 10 estudos, 395 pessoas), quase sempre medido numa única coleta de manhã. O efeito apareceu sobretudo em pessoas com alguma doença. Na saliva, em 21 estudos com 1.163 pessoas, o efeito foi g = 0,18 e não se distinguiu do zero. Quando os autores corrigiram o viés de publicação, que vem dos estudos sem resultado que nunca chegam a ser publicados, o efeito na saliva virou −0,10.

O riso baixou o cortisol em 31,9% em média, em 8 estudos com 315 pessoas, com amostras pequenas e horários de coleta variados (Kramer e Leitão, 2023). Uma revisão do grupo de Tiffany Field relatou que a massagem baixa o cortisol em 31%, comparando o antes e o depois do mesmo grupo [S]. Moyer e colegas (2011) compararam a massagem com grupos de controle, em 18 estudos com 704 pessoas, e o efeito ficou muito pequeno e sem significância [S]. O cortisol do controle também cai do começo ao fim de uma sessão. Em 138 adultos sedentários com sobrepeso, 2,5 g de ômega-3 por dia durante quatro meses deixaram o cortisol 19% menor durante um estresse de laboratório (Madison e colegas, 2021). Nenhuma das revisões sobre magnésio teve o cortisol como desfecho principal (Boyle e colegas, 2017).

O "cortisol cocktail" nunca foi testado. Ele nasceu em 2023 como "adrenal cocktail", vendido para repor o que uma adrenal "cansada" deixaria de fabricar, e foi rebatizado em 2024 para baixar o cortisol [S]. A mesma bebida passou a ser vendida para dois problemas opostos. Um copo tem cerca de 16 g de açúcar, um terço do limite diário recomendado, e um quarto do limite diário de sal (Larkin, *The Conversation*, 2026) [S].

Do outro lado da régua ficam as coisas da seção 03 que sobem o cortisol, e várias delas fazem bem: a luz forte de manhã, o treino forte, o despertar. A régua abaixo põe na mesma escala o que tem número comparável, com a subida do despertar como referência:

> **WIDGET c08 · `a-regua`**
> **Título:** O que sobe e o que baixa o cortisol, na mesma régua
> **Instrução:** Compare cada linha com a faixa cinza do despertar, que se repete todo dia. Os efeitos que baixam ficam à esquerda do zero, os que sobem à direita.
> **Tipo:** SVG estático, três blocos.
> **Referência:** a régua de PET do w09a do ensaio da dopamina; os gráficos de pontos com intervalo do *Financial Times* e do Our World in Data.
> **O que mostra:** bloco 1, "em porcentagem de mudança", eixo x de −50% a +170%, com uma faixa cinza larga de +50% a +160% rotulada "subida normal do despertar" atrás de todas as linhas. Linhas, cada uma com ícone e fonte: riso −31,9% (IC −47,7 a −16,3; 8 estudos, 315 pessoas); ômega-3 durante estresse de laboratório −19%; massagem, antes e depois do mesmo grupo, −31% [S], com uma seta até "comparada a controle: perto de zero" [S]; exercício leve +5,7% (sem diferença do zero); noite curta +37% e noite em claro +45% (noite seguinte); luz forte de manhã +50% [S]; treino a 60% +39,9%; treino a 80% +83,1%; banca de laboratório de +100% a +300% como faixa que sai do eixo, com seta. Cor do ponto: verde-petróleo para os que baixam, vermelhão para os que sobem. Bloco 2, "em µg/dL no sangue de manhã": uma barra longa "queda normal do pico à meia-noite: cerca de 13,5" e três barras curtas da ashwagandha, 1,16 (2025), 2,58 (2024) e 3,27 (2026), na mesma escala; selos "proibida no Brasil desde 2022 [S]" e "casos raros de lesão no fígado". Bloco 3, "sem número comparável": cortisol cocktail, "nenhum estudo"; magnésio, "nenhuma revisão com cortisol como desfecho principal"; meditação na saliva, "g = 0,18; depois da correção de viés, −0,10", com um mini-funil de 21 pontos e 8 pontos fantasmas.
> **Leitura:** O maior efeito para baixar o cortisol com número comparável fica abaixo da subida de uma manhã comum. Treino forte, luz cedo e uma prova sobem mais do que qualquer truque baixa.
> **Interação:** nenhuma, infográfico.
> **Motion:** a faixa do despertar aparece primeiro; as linhas entram de cima para baixo, 80 ms cada. No bloco 3, os pontos fantasmas do funil aparecem por último.
> **Risograph:** ícones de 28 px na margem esquerda de cada linha, em duas tintas: rosto rindo, cápsula de peixe, mãos, tênis, travesseiro, sol, banca, frasco de raiz, taça de cocktail.
> **Celular/acessibilidade:** uma linha por cartão, com a faixa cinza do despertar desenhada no fundo de cada cartão para manter a comparação. Tabela equivalente com todas as linhas, unidade e fonte.
> **Legenda:** Kramer e Leitão (*PLOS ONE*, 2023); Madison et al. (*Mol Psychiatry*, 2021); Field et al. (2005) [S]; Moyer et al. (2011) [S]; Hill et al. (2008); Leproult et al. (1997; 2001 [S]); Kirschbaum et al. (1993); Clow et al. (2004); meta-análises de ashwagandha de 2024, 2025 e 2026; Koncz et al. (*Health Psychol Rev*, 2021). As porcentagens vêm de medidas diferentes (sangue, saliva, momentos diferentes do dia); a régua compara ordens de grandeza.

Mesmo quando um tratamento funciona, o cortisol pode não mudar. Em 12 ensaios com 428 pessoas com estresse pós-traumático, a psicoterapia melhorou os sintomas e não mexeu no cortisol (g = −0,07; Schumacher e colegas, 2018) [S].

---

## 09 · O que fazer

### Quase ninguém precisa baixar o cortisol; o que se pode cuidar é a descida até a noite

Para quem tem saúde, baixar o cortisol da manhã achataria a curva pelo lado que deveria ficar alto. A parte da curva que os estudos ligam à doença é a noite, e os hábitos que mais mexem nela são conhecidos. Dormir o suficiente, num horário que se repete, deixa o cortisol cair na hora certa; uma noite curta o deixa 37% mais alto entre 18h e 23h do dia seguinte. A luz forte entre 6h e 8h deixa o pico mais alto e a curva mais íngreme. Para quem toma café todo dia, a xícara das 9h não mexe no cortisol, e a das 14h ainda mexe. O exercício regular e moderado, perto de duas horas e meia de caminhada rápida por semana, acompanha cortisol mais baixo ao longo de meses.

As pessoas também contam. Em 37 homens, a presença de um amigo baixou o cortisol num teste de estresse, e a combinação de amigo e ocitocina baixou mais (Heinrichs e colegas, 2003). Em 67 mulheres, 10 minutos de massagem do parceiro antes do teste baixaram o cortisol e a frequência cardíaca, e o apoio só com palavras não baixou (Ditzen e colegas, 2007). O estresse que mais sobe o cortisol junta julgamento e falta de controle (seção 04), e situações de trabalho com essas duas coisas são candidatas naturais a mudar. `[CONFERIR: estudo com cortisol medido em trabalhadores com mais ou menos controle sobre o próprio trabalho; os dossiês só trazem a evidência de laboratório]` James Findling, endocrinologista do Medical College of Wisconsin, disse à AP em fevereiro de 2026 que dormir, se exercitar e controlar o estresse não têm "nada de novo" [S].

O cortisol alto que precisa de médico vem com vários sinais que pioram ao longo de meses, como o rosto que arredonda junto com estrias arroxeadas, pele fina e fraqueza nas pernas. Ele se investiga com saliva da noite, urina de 24 horas ou dexametasona. O cortisol baixo que precisa de médico aparece em quem tem Addison ou parou um corticoide, com a pressão caindo ao levantar e crises com infecções.

O relógio abaixo começa com a curva que você desenhou no começo, em tracejado, e a curva medida por cima. Arraste para o relógio os carimbos do dia e acompanhe o medidor de inclinação. Tente achatar a curva:

> **WIDGET c09 · `monte-um-dia`**
> **Título:** O que um dia faz com a curva do cortisol
> **Instrução:** Arraste os carimbos para o horário em que acontecem e acompanhe o medidor de inclinação. Tente deixar a curva plana.
> **Tipo:** SVG com Pointer Events: curva de 24 h, bandeja de carimbos e um medidor.
> **Referência:** "Parable of the Polygons", de Vi Hart e Nicky Case, em que o leitor monta o sistema e vê o resultado acumulado.
> **O que mostra:** eixo x de 06:00 a 06:00 com horas em Space Mono; eixo y relativo (múltiplos do vale). A curva do leitor no c02a em tracejado (lida de `DN.store`; sem resposta guardada, não aparece), a curva de referência em gradiente. Carimbos e efeitos, os mesmos do c03, cada um com a fonte num toque longo: `acordar` (move o começo da subida e põe +50% na primeira meia hora, Wüst 2000); `luz forte cedo` (+50% no pico se antes das 8h e nada à tarde, Leproult 2001 [S]); `café` (em quem toma todo dia: nada de manhã, um calombo entre 13h e 19h, tamanho ilustrativo e assim rotulado, Lovallo 2005); `banca` (2× a 4× do valor da hora, pico 30 min depois, Kirschbaum 1993 e Dickerson 2004); `treino forte` (+83% ao fim de 30 min, Hill 2008); `treino leve` (perto de zero); `noite curta` (+37% entre 18h e 23h do dia seguinte e o período de cortisol baixo 1 h mais tarde, Leproult 1997); `voo para o leste, 7 h` (desloca a curva inteira e baixa o despertar, Piérard 2001); `amigo por perto na banca` (encolhe o carimbo da banca, sem número próprio, Heinrichs 2003). Cada calombo decai com meia-vida de 66 min (Kraan 1997). O medidor, à direita, mostra a inclinação do acordar à hora de dormir, como no Whitehall II, numa escala de "íngreme" (gradiente vermelhão a verde-petróleo) a "plana" (cinza); a cor da curva acompanha o medidor.
> **Leitura:** Quase tudo que acontece de dia faz um calombo que se desfaz em uma ou duas horas. A curva fica plana com o que acontece à noite e com a manhã sem luz.
> **Interação:** arrastar carimbos da bandeja para o relógio e ajustar o horário; tocar num carimbo colocado o remove. Um botão `dia típico` põe acordar às 7h, café às 9h e às 14h, e treino às 18h. A meta "deixe a curva plana" só se cumpre com noite curta, voo, café da tarde ou tirando a luz da manhã; quando a inclinação cai abaixo de um limiar, o medidor diz "plana: é o padrão que acompanhou mais doença no Whitehall II". A interação ensina pela acumulação: o leitor vê que os calombos do dia somem e que a noite muda a forma.
> **Motion:** cada carimbo cai com uma escala de 1,08 que volta em 180 ms; a curva se refaz em 450 ms; o ponteiro do medidor gira com mola.
> **Risograph:** os carimbos são as fichas de borracha do c03, em duas tintas, com grão forte e borda irregular.
> **Celular/acessibilidade:** a curva ocupa a largura toda; a bandeja vira uma faixa rolável abaixo, com carimbos de 56 px; tocar num carimbo o coloca na hora de um seletor, e arrastar ajusta. Alternativa de teclado: lista de carimbos com campo de hora. `aria-live` descreve a inclinação depois de cada mudança. Com `DN.RM`, sem animação de queda.
> **Legenda:** Modelo ilustrativo. A curva de base é a de Debono et al. (2009); os efeitos são os médios publicados nas fontes citadas em cada carimbo, somados de forma simples, e o corpo real não soma de forma tão limpa.

Quase tudo que acontece de dia faz um calombo que se desfaz em uma ou duas horas, porque metade do cortisol do sangue sai em pouco mais de uma hora. A inclinação só cai de verdade com o que acontece à noite, como a noite curta, o café da tarde e o fuso, e com uma manhã sem luz.

O meme de "low cortisol" mostra uma vida lenta, com café sem pressa e música calma. Medida, a vida desses vídeos teria o cortisol alto às 8h, como o de qualquer pessoa saudável, e baixo à meia-noite.

---

## Glossário

Termos para marcar com popup (`.gl`) na primeira vez que aparecem. Siglas que o texto evita ficam aqui para quem quiser o nome técnico.

**Hormônios, glândulas e sistema**
- **cortisol**: hormônio fabricado pelas adrenais que dá energia, sustenta a pressão, freia a inflamação e sobe e desce ao longo do dia.
- **hormônio**: molécula que uma glândula solta no sangue para mandar uma ordem a órgãos distantes.
- **glândulas adrenais (suprarrenais)**: duas glândulas pequenas em cima dos rins; a parte de fora delas fabrica cortisol.
- **hipotálamo**: região na base do cérebro que liga o sistema nervoso aos hormônios e dá a primeira ordem para fabricar cortisol.
- **hipófise**: glândula do tamanho de uma ervilha sob o cérebro que repassa a ordem às adrenais.
- **eixo HPA**: nome técnico da cadeia hipotálamo, hipófise e adrenais; no texto, "o pedido" e "o freio".
- **CRH e ACTH**: os dois mensageiros da cadeia; o CRH vai do hipotálamo à hipófise, e o ACTH vai da hipófise às adrenais pelo sangue.
- **retroalimentação negativa**: o freio da cadeia: o cortisol que chega ao cérebro faz o pedido diminuir, como um termostato.
- **cortisol livre**: a pequena parte do cortisol que não viaja presa a proteínas e de fato age; é a que a saliva mede.
- **adrenalina**: hormônio que acelera o coração em segundos durante um susto.
- **insulina**: hormônio do pâncreas que faz as células tirarem açúcar do sangue.
- **gliconeogênese**: fabricação de glicose no fígado a partir de moléculas que não são açúcar.
- **inflamação**: reação de defesa do corpo, com inchaço e vermelhidão, que o cortisol freia.
- **melatonina**: hormônio da noite, fabricado no escuro, usado em comprimido para ajustar o relógio do corpo.
- **ocitocina**: hormônio ligado ao vínculo e ao contato entre pessoas.
- **estradiol**: o principal estrogênio, usado aqui como comparação de exames hormonais no SUS.

**Ritmo e medição**
- **ritmo circadiano**: ciclo de cerca de 24 horas que o corpo repete mesmo sem relógio.
- **resposta ao despertar (CAR)**: a subida do cortisol nos primeiros 30 a 45 minutos depois de acordar.
- **vale**: o ponto mais baixo da curva, por volta da meia-noite.
- **inclinação**: o quanto o cortisol desce do acordar até a hora de dormir; curva íngreme desce muito, curva plana desce pouco.
- **meia-vida**: o tempo para metade de uma substância sair do sangue; a do cortisol é de cerca de uma hora.
- **teste de estresse de Trier (TSST)**: teste de laboratório com discurso e contas diante de uma banca, usado para provocar estresse.
- **capacidade máxima de usar oxigênio (VO2máx)**: a régua de intensidade do exercício; 80% dela é um esforço forte.
- **MET-minuto**: unidade de quantidade de exercício: a intensidade em múltiplos do repouso vezes os minutos.
- **lux**: unidade de quanta luz chega a uma superfície.
- **nmol/L e µg/dL**: unidades de concentração; 1 µg/dL de cortisol no sangue equivale a 27,6 nmol/L.
- **percentil**: posição numa lista ordenada; o 95º percentil é o valor abaixo do qual ficam 95% das pessoas.
- **mediana**: o valor do meio de uma lista ordenada.
- **cortisol no cabelo**: cortisol incorporado ao fio enquanto ele cresce, que guarda a exposição de meses.
- **alfa-amilase salivar**: enzima da saliva que sobe junto com a adrenalina e serve para medi-la.

**Doenças e remédios**
- **corticoide (glicocorticoide)**: remédio que imita o cortisol, usado contra inflamação e alergia.
- **prednisona**: corticoide em comprimido, cerca de quatro vezes mais potente que a hidrocortisona.
- **hidrocortisona**: o próprio cortisol, fabricado como remédio.
- **cortisona**: forma do cortisol que o corpo precisa ativar; foi o primeiro corticoide usado como remédio.
- **dexametasona**: corticoide potente usado num exame que verifica se o freio do cortisol funciona.
- **síndrome de Cushing**: excesso de cortisol durante meses, por tumor ou, quase sempre, por remédio.
- **face de lua**: o rosto arredondado do Cushing, que vem acompanhado de outros sinais.
- **doença de Addison**: destruição das adrenais, quase sempre pelo próprio sistema imune, que deixa o corpo sem cortisol.
- **insuficiência adrenal**: produção de cortisol abaixo do necessário, por Addison ou por parar um corticoide.
- **crise adrenal**: emergência por falta de cortisol, com pressão baixa e choque, em geral puxada por uma infecção.
- **fadiga adrenal**: diagnóstico popular de glândula "cansada" pelo estresse; não aparece nos estudos.
- **burnout**: esgotamento ligado ao trabalho, classificado como fenômeno ocupacional.
- **sepse**: reação grave do corpo a uma infecção, que pode levar à falência de órgãos.
- **TEPT (estresse pós-traumático)**: transtorno que pode surgir depois de um trauma, com memórias intrusivas e alerta constante.
- **ashwagandha**: planta da medicina tradicional indiana vendida como suplemento contra o estresse; proibida como suplemento no Brasil.
- **ômega-3**: tipo de gordura do peixe vendida em cápsulas.

**Estatística**
- **meta-análise**: estudo que junta os resultados de vários estudos para estimar um efeito médio.
- **meta-análise em rede**: meta-análise que compara vários tratamentos entre si de uma vez.
- **ensaio clínico randomizado**: estudo em que o sorteio decide quem recebe o tratamento e quem recebe o controle.
- **placebo**: tratamento sem princípio ativo, usado para comparar.
- **estudo observacional**: estudo que acompanha pessoas sem intervir; mostra associação, sem provar causa.
- **desvio padrão**: medida de quanto os valores se espalham em volta da média.
- **d, g e SMD (tamanho de efeito)**: a distância entre dois grupos medida em desvios padrão; 0,2 é pequeno e 0,8 é grande.
- **correlação (r)**: número de −1 a 1 que diz quanto duas medidas andam juntas; 0,1 é pequena e 0,3 é média.
- **HR (razão de risco)**: quantas vezes o risco de um grupo é maior que o de outro ao longo do tempo; 1 quer dizer igual.
- **RR (risco relativo)**: a razão entre o risco de dois grupos; 0,17 quer dizer cerca de um sexto do risco.
- **intervalo de confiança**: a faixa de valores compatíveis com os dados; quando cruza o zero (ou o 1), o efeito pode não existir.
- **viés de publicação**: a distorção que surge porque estudos sem resultado são publicados menos.
- **confiabilidade**: quanto uma medida repete o mesmo valor quando a coisa medida não mudou.
- **variância**: a medida do espalhamento dos valores; pode ser dividida entre fontes (pessoa, dia).
- **prevalência e incidência**: quantas pessoas têm uma condição num dado momento, e quantos casos novos surgem num período.
- **sensibilidade e especificidade**: a fração de doentes que o exame acerta e a fração de saudáveis que ele não acusa.
- **revisão Cochrane**: revisão sistemática feita com o método da Colaboração Cochrane, referência em medicina.

---

## Nota de método

- A moda das redes aparece como ponto de partida na seção 00 e volta nas seções 06, 07, 08 e 09. As afirmações dos vídeos foram conferidas contra estudos, e o ensaio não segue nenhum influenciador ponto a ponto.
- A ordem do ensaio vai da função (para que serve) ao ritmo, ao estilo de vida e ao estresse, e só depois chega à doença, à medição e aos produtos. A hora do dia aparece dentro dos gráficos das seções 02, 03, 05 e 09 e no companheiro da barra superior.
- Os números de cortisol vêm de três matrizes que não se comparam diretamente: sangue (cortisol total, em µg/dL), saliva (cortisol livre, em nmol/L) e cabelo (exposição de meses). Cada gráfico usa uma só, dita no eixo. A régua do c08 mistura porcentagens de medidas diferentes e diz isso na legenda.
- A curva do c02a interpola os cinco parâmetros publicados por Debono e colegas (2009). A forma entre os pontos é suave e esconde os pulsos de cerca de uma hora. Os desvios do c03 e do c09 sem número publicado são tracejados e rotulados como forma ilustrativa.
- Os modelos do c04a, c07 e c09 usam números publicados com formas escolhidas para caber na tela. Eles mostram a forma do fenômeno e não fazem previsão. O c07 simula uma pessoa a partir dos componentes de variância do CIRCORT, calculados pelo dossiê a partir da tabela 2 do artigo.
- Conversões feitas por mim: a proporção do grupo de controle abaixo da média do grupo estressado para os d de Dickerson e Kemeny (82% e cerca de 63%); a leitura de um desvio padrão como a distância até os 16% de curva mais plana; 139 mortes em 4.047 como cerca de 3 em 100; a frequência de crises de Addison como uma a cada 12 anos; prednisona 20 mg como cerca de oito vezes a produção diária; a queda da ashwagandha como fração da queda diária de 13,5 µg/dL; os horários do Whitehall II para quem acorda às 7h.
- Os estudos de sono, de exercício agudo e de fuso são pequenos e, em sua maioria, só com homens. Os estudos sobre a inclinação da curva e a saúde são observacionais, e a seção 05 apresenta a dúvida entre marcador e mecanismo.
- Google Trends: índice relativo dentro de cada consulta, coletado em 12/11/2026 pela pytrends; valores de painéis diferentes não se comparam. SUS: SIA/SUS via TabNet; agosto de 2023 é um outlier de processamento e fica fora da razão.
- Itens marcados com `[S]` ou `[CONFERIR]` precisam de leitura na fonte primária antes do HTML.
- O ensaio não é orientação médica. Corticoides não devem ser interrompidos sem acompanhamento.

## Fontes principais

**Ponto de partida.** Google Trends, consultas de 12/11/2026 (`cortisol-pesquisa/dados/`). Know Your Meme, "Low Cortisol Dance" [S]. Eli Health, página de ciência do Hormometer. AP, "Do you need to control your cortisol? Probably not, doctors say", 02/02/2026 [S]. CU Anschutz, "Cortisol face", 25/11/2024 [S]. Shroff, *2 Minute Medicine*, 04/09/2026 [S]. Larkin, *The Conversation*/PsyPost, 25/08/2026 [S].

**Função e curva.** Esteban et al., *J Clin Endocrinol Metab* 1991. Kraan et al., 1997. Debono et al., *J Clin Endocrinol Metab* 2009. Spiga et al., *Compr Physiol* 2014. Lupien et al., *Brain Cogn* 2007. Adam et al., *Psychoneuroendocrinology* 2017. Husebye et al., *Lancet* 2021. Hench e a cortisona, arquivo histórico da Mayo Clinic [S]. Stalder et al., *Psychoneuroendocrinology* 2016. Clow et al., *Stress* 2004. Wüst et al., 2000. Fries et al., 2009.

**Estilo de vida.** Leproult et al., 2001 (luz) [S]. Lovallo et al., *Psychosom Med* 2005 e 2006. Bhake et al., *J Clin Endocrinol Metab* 2020. Nakamura et al., *Stress* 2016 [S]. Whittaker & Harris, 2022. Hill et al., *J Endocrinol Invest* 2008. Li et al., 2025 (meta-análise em rede, 44 ensaios). Gianaros et al., *J Sport Health Sci* 2026 [S]. Leproult et al., *Sleep* 1997. Spiegel, Leproult & Van Cauter, *Lancet* 1999. Kontou et al., 2022 [S]. Piérard et al., 2001. Vigitel 2025 [S]. Álcool, meta-análise de 2023 com 46 estudos [S]. Steptoe e Ussher, cortisol em fumantes [S].

**Estresse.** Kirschbaum, Pirke & Hellhammer, *Neuropsychobiology* 1993. Dickerson & Kemeny, *Psychol Bull* 2004. Jamieson et al., *J Exp Soc Psychol* 2010. Miller, Chen & Zhou, *Psychol Bull* 2007. Stalder et al., *Psychoneuroendocrinology* 2017 (cabelo). Bunea et al., *Transl Psychiatry* 2017. Amos et al., Cochrane 2014. Danhof-Pont et al., *J Psychosom Res* 2011. Kumari et al., *J Clin Endocrinol Metab* 2011 (Whitehall II). INSS, afastamentos 2021 a 2024, via imprensa [S].

**Doença.** Nieman et al., *J Clin Endocrinol Metab* 2008 (diretriz). Raff, 2009. Lacroix et al., *Lancet* 2015. Wengander et al., *Clin Endocrinol* 2019. Fardet, Petersen & Nazareth, 2011. Overman et al., 2013. Waljee et al., *BMJ* 2017. Erichsen et al., *J Clin Endocrinol Metab* 2009. Hahner et al., *J Clin Endocrinol Metab* 2015. Cadegiani & Kater, *BMC Endocr Disord* 2016. Akturk et al., *Mayo Clin Proc* 2018 [S].

**Medição.** Miller et al., *Psychoneuroendocrinology* 2016 (CIRCORT). Golden et al., *Eur J Epidemiol* 2011. Hellhammer et al., 2007. SIA/SUS, TabNet/DATASUS, consulta de 12/11/2026.

**Intervenções.** Koncz et al., *Health Psychol Rev* 2021. Kramer & Leitão, *PLOS ONE* 2023. Field et al., *Int J Neurosci* 2005 [S]. Moyer et al., *J Bodyw Mov Ther* 2011 [S]. Madison et al., *Mol Psychiatry* 2021. Boyle et al., *Nutrients* 2017. Heinrichs et al., 2003. Ditzen et al., 2007. Schumacher et al., 2018 [S]. Meta-análises de ashwagandha: *Explore* 2024 (PMID 39348746), *Nutrition and Health* 2025 (PMID 40746175), *Planta Medica* 2026 (PMID 41740946), *JoVE* 2026 (PMID 42858054). Björnsson et al., *Liver International* 2020. Anvisa, nota de 21/10/2026 [S]. NutraIngredients, linha do tempo regulatória, 06/07/2026 [S].

---

## Itens a conferir antes de publicar

Ainda sem verificação na fonte primária ([NV], ou [S] usado no texto):

1. Cafeína: o tamanho do aumento de cortisol em Lovallo 2005 (o resumo não dá a porcentagem) e a conversão de 250 mg para xícaras de café coado.
2. Hormometer: estudo independente de validação; preço de 8,25 dólares e data de lançamento; a afirmação de que relógios como Whoop não medem cortisol.
3. Luz da manhã: +50% com 5.000 lux e +35% com 800 lux (Leproult 2001) no original; equivalência de lux com luz natural.
4. Comida: jejum (Nakamura 2016) no original; tamanho do pico do almoço, hoje só qualitativo.
5. Álcool e cigarro: a meta-análise de 2023 sobre álcool e os estudos de Steptoe e Ussher sobre fumo; procurar números com hora do dia para o c03.
6. TSST: primeiro nome de Pirke; a conta original do protocolo (o "1.022 de 13 em 13" aqui só nomeia a tarefa da página).
7. Funções do cortisol na prancha do c01: conferir cada frase num livro-texto de endocrinologia.
8. Cushing: múltiplo típico do cortisol livre urinário para a régua do c06b; lista de sinais em Lacroix 2015; causas do inchaço matinal.
9. Prednisona: tabela de equivalência (5 mg para 20 mg de hidrocortisona) para a conta de "oito vezes".
10. Recuperação das adrenais depois de parar corticoide prolongado.
11. Whitehall II: HR de 1,98 para cortisol na hora de dormir e o intervalo dele.
12. Exercício: Gianaros 2026 e a forma da curva de Li 2025 além do pico.
13. Sono: meta-análise de 2024, Kontou 2022, Vigitel 2025, e a ausência de ensaios de extensão do sono com cortisol.
14. Estresse crônico: INSS (472 mil e 823 para 4.880) na série oficial de dados abertos; evidência de cortisol e controle sobre o trabalho fora do laboratório.
15. Intervenções: os 31% de Field 2005 e o efeito exato de Moyer 2011; Schumacher 2018.
16. Ashwagandha: casos de lesão hepática de 2026; financiamento dos ensaios; nome da planta na Resolução-RE 3.669/2022; alcance da proibição para farmácias de manipulação; proibição dinamarquesa de 2023.
17. Cocktail: os 16 g de açúcar e o quarto do limite de sal; a origem "adrenal cocktail" de 2023.
18. Moda: as 2,8 milhões de visualizações do "Low Cortisol Dance".
19. História: a data e o caso de 1948 e o Nobel de 1950 com Reichstein no site oficial.
20. Fuso: confirmar que São Paulo e Dubai têm 7 horas de diferença na data de publicação.
21. Fora deste roteiro: corrigir a anotação do w13a no ensaio da dopamina ("2023 · o cortisol passa a dopamina" está impreciso no mundo; sugestão "2023 · o cortisol se descola"). O `dopamina-src/widgets/w13a.js` aparece modificado no git; conferir se a correção já foi feita.

*Como baixar o cortisol (e se você deveria) · ensaio interativo · dados conferidos contra as fontes listadas em `cortisol-pesquisa/` · novembro de 2026*
