# Terapia de luz vermelha funciona?

**Ensaio interativo sobre a luz vermelha e o infravermelho próximo, o que eles fazem no corpo, onde funcionam e quanto de luz um aparelho precisa entregar · estado da evidência em novembro de 2026 · por Renato Shirakashi**

> Subtítulo para o hero: *A luz vermelha e o infravermelho próximo entram poucos milímetros na pele e, em células, aumentam a energia que a mitocôndria produz. Hospitais usam essa luz para prevenir feridas na boca de quem trata câncer, e os estudos mostram efeito moderado contra a calvície e a dor no pescoço. Para rugas, gordura, testosterona e longevidade, a evidência é fraca ou não existe, e o resultado de qualquer aparelho depende de uma dose que quase nenhuma caixa informa de um jeito que se possa conferir.*

> **Nota de formato.** Este é o roteiro completo, com a prosa final e a especificação de cada widget, gráfico e movimento. Ainda não há HTML. O ponto de partida é a moda de 2023 a 2026: as máscaras de LED, o pico de buscas de abril de 2026 e a corrida de liberações na FDA. A moda serve só como provocação na seção 00, e o resto do ensaio segue a espinha didática recomendada em `luz-vermelha-pesquisa/lv-prior-art-e-visual.md`: o que a luz é e o que ela faz no tecido (seções 01 a 04), onde funciona e onde não funciona (05 e 06), dose, aparelhos e sol (07 e 08), segurança (09) e o que fazer antes de comprar (10). A pesquisa de apoio está em `luz-vermelha-pesquisa/`: `lv-fisica-e-mecanismo.md`, `lv-evidencia-clinica.md`, `lv-mercado-hype-seguranca.md`, `lv-prior-art-e-visual.md` e os CSVs de `dados/`. Em cada seção, a linha `##` é a linha pequena acima do título na página (número e tema), e a linha `###` é o título da seção, que diz a conclusão. Números sem marca foram verificados na fonte primária ([V] nos dossiês). A marca `[S]` indica fonte secundária, cálculo próprio do dossiê ou inferência sobre dado verificado, e `[NV]` indica dado não verificado; os dois aparecem na lista do fim. `[CONFERIR: ...]` indica o que falta verificar. A frase que vem logo depois de **[destaque]** recebe o fundo escuro (`.mark`). Siglas técnicas ficam no glossário; o texto usa a palavra comum. Esta nota sai da versão final.

---

## Direção de arte e movimento

Esta parte vale para o ensaio inteiro. Os widgets só descrevem o que é próprio de cada um.

**Papel e tinta.** O fundo é o papel branco da casa (`--paper:#fff`, `--ink:#141414`, `--dim:#6b6b6b`, `--mid:#9a9a9a`, `--line:#e2e2e2`), com `body` de fundo explícito. O tambor da risografia muda a cada ensaio da série: a dopamina saiu em âmbar e índigo, o cortisol em vermelhão e verde-petróleo, e a luz vermelha sai em rubi fluorescente e ameixa, a paleta proposta no dossiê de prior art. As duas tintas desenham a física do ensaio, porque o rubi é a luz que se vê e a ameixa é a luz que não se vê.

| Token | Cor | Uso |
|---|---|---|
| `--rubi` | `#ef2a6b` | Luz vermelha visível (620 a 700 nm): fótons, LEDs, faixas do espectro, a curva de efeito. Na ilustração, a tinta clara. Contraste de 4,03:1 no branco, por isso só marcas e texto grande. |
| `--rubi-txt` | `#c0185a` | Rótulos e números em rubi (5,97:1). |
| `--infra` | `#5a1a4a` (ameixa) | Infravermelho próximo (700 a cerca de 1.100 nm): profundidade, tecido. Na ilustração, a tinta escura. Nos gráficos vai sempre com hachura ou meio-tom, porque fica perto da tinta preta. |
| `--rubi-soft`, `--infra-soft` | as mesmas com 14% a 16% de alfa | Faixas de incerteza, nuvens de luz, áreas. |
| sobreposição | multiplicar as duas dá um vinho quase preto (cerca de `#54041f`) | Terceira tinta das ilustrações, para osso e sombra. |
| resto do espectro | `--mid #9a9a9a` com rótulo | Ultravioleta, azul, verde e infravermelho distante, as faixas que não entram no tecido. |

A convenção vale para todos os gráficos. Rubi quer dizer vermelho visível, ameixa quer dizer infravermelho próximo, e nenhuma das duas quer dizer "funciona" ou "não funciona". Na escada de evidência (l05), o degrau é marcado por posição e por rótulo, nunca por verde e vermelho. Toda série leva rótulo direto, para não depender da cor. O dossiê calculou a distância entre as duas tintas em ΔE 58 (49 com simulação de deuteranopia) e a razão de luminância entre elas em 3,1:1, de modo que elas se separam pela claridade. `[CONFERIR: rodar o par no validador da skill dataviz antes do build]`

**Uma seção no escuro.** Os ensaios anteriores escureceram uma seção. Aqui é a seção 01, a da régua de cores, porque a luz se vê melhor no escuro: fundo `--night #0f1020`, texto em `#f2f2f2` e um rubi claro `#ff6a95` para esse fundo. A troca acontece uma vez só e volta ao papel branco na seção 02. Os tokens de modo escuro ficam em `:root` e são redefinidos em `@media (prefers-color-scheme: dark)` com a guarda `:root:not([data-theme="light"])` e em `:root[data-theme="dark"]`.

**Tipografia.** Corpo na sans do sistema; títulos, linhas pequenas, rótulos, comprimentos de onda e números em Space Mono, com algarismos tabulares, como nos ensaios anteriores.

**Risografia.** As ilustrações usam a técnica do `dopamina-src/widgets/w00.js` e do `DN.cortRiso` do cortisol, generalizada para `DN.riso` com as tintas como parâmetro: gerador `rng` com semente fixa, uma camada por tinta, retículas de meio-tom em ângulos clássicos de Riso (padrões SVG), grão com `feTurbulence` que come a tinta, desregistro de 1 a 3 px entre as camadas e `mix-blend-mode: multiply` na sobreposição. Ficam em riso: o celular-selo do l00, o prisma do l01, a mão e o corte de bochecha e crânio do l02, a mitocôndria do l03, os camundongos do l04, os ícones das fichas do l05, os bonecos do l06, a máscara e o cronômetro do l08, o painel e a pessoa do l09, o sol, a janela e a máscara do l10, o olho e os óculos do l11, os carimbos do l12 e a etiqueta do l13. Marcas de gráfico (linhas, barras, pontos, eixos) ficam nítidas. Desenhos de corpo, de olho e de aparelho têm proporção real. Nenhum rosto de modelo dentro de máscara, nenhuma mitocôndria sorridente e nenhum raio de luz atravessando o corpo em linha reta.

**Etiqueta de produto.** As fichas de aparelho (l08, l09 e l13) imitam a etiqueta técnica de uma caixa, em Space Mono, com quatro campos fixos: comprimento de onda, irradiância, distância da medida e minutos por sessão. Campo sem dado aparece como "não informado". O leitor aprende o formato e passa a procurá-lo nas caixas de verdade.

**Sem companheiro na barra superior.** O mini-relógio do cortisol funcionava porque a hora do leitor muda a leitura da curva. Aqui não há um dado do leitor que se encaixe numa barra fixa, e uma régua de profundidade decorativa distrairia sem ensinar. A barra superior fica com "Renato Shirakashi", "Luz vermelha · 2026" e o seletor PT/EN. Sem botão de som.

**Princípios de movimento.**
1. Um movimento por ideia.
2. O scroll só revela. Nenhum gráfico deste ensaio mostra tempo contínuo, e por isso nenhum avança preso ao scroll.
3. Revelações por CSS scroll-driven animations (`animation-timeline: view()`), com estado final estático quando o recurso falta.
4. Durações: 180 ms para toque, 450 ms para revelação, 900 ms para uma curva que se desenha. Curva padrão `cubic-bezier(.2,.7,.2,1)`.
5. Com `prefers-reduced-motion: reduce` (`DN.RM`), cada widget mostra o estado final, e os palpites continuam funcionando sem animação.

**Pilha técnica.** A mesma arquitetura de `cortisol-src/`: `shell.html` com os textos em `data-i18n`, um par `lNN.js` e `lNN.css` por widget (prefixo `l`, de luz), `DN.body`, `DN.RM`, `DN.store` (em `localStorage`, dentro de `try/catch`), `DN.surprise`, `glossary.js` e `build.py`. Gráficos em SVG inline. Canvas 2D só para as nuvens de luz do l02. Widgets construídos por subagentes em paralelo, e um agente de texto para a passada de clareza, glossário e inglês.

**Celular.** Tudo testado em 375 px, com margem lateral de 16 px e sem rolagem horizontal da página. Pequenos múltiplos empilham ou viram carrossel com `scroll-snap`, sempre dentro do contêiner do widget.

**Bilíngue.** `data-i18n` em cada nó de texto, dicionário PT/EN e a chave `rs_lang`, como nos outros ensaios.

---

## 00 · A moda

### As buscas por terapia de luz vermelha cresceram cerca de 23 vezes desde 2018 e bateram recorde em abril de 2026, puxadas pelas máscaras de LED

No Natal de 2023, Kim Kardashian deu máscaras de LED vermelho das marcas CurrentBody e Omnilux à família e aos amigos e escreveu nos stories do Instagram que estava obcecada por elas [S]. As máscaras já eram vendidas havia anos, mas foi a partir daquele fim de ano que as buscas mundiais por "red light therapy" no Google mudaram de patamar. A média anual do índice de buscas, que tinha ficado entre 3 e 8 de 2018 a 2022, foi a 25 em 2024 e a 46 em 2025, e chegou a 65 em 2026, cerca de 23 vezes a média de 2018. O índice salta todo ano entre outubro e dezembro, quando as máscaras viram presente, e as buscas por "red light mask" tiveram o maior valor em dezembro de 2025.

O recorde de "red light therapy" veio em abril de 2026. Entre março e maio, as buscas que mais cresceram foram por colchonete, gorro, cinto e cama de luz vermelha, sinal de que a moda tinha saído do rosto para o corpo inteiro. Em outubro, o índice tinha caído cerca de 60%, para um nível que ainda era três vezes o de outubro de 2023. Para dar uma régua, o banho de gelo ("cold plunge"), outra moda de bem-estar da mesma época, chegou a 24 na escala em que a luz vermelha chegou a 100.

No Brasil, quase ninguém busca "terapia de luz vermelha". Os brasileiros procuram "laserterapia", um termo antigo da fisioterapia, da odontologia e da estética que cresce sem saltos desde 2018, e "LED facial", que teve o maior valor em julho de 2026. A onda em inglês passou pelo país entre novembro de 2025 e junho de 2026 e quase sumiu em outubro, numa série de pouco volume e com sinais de tráfego automatizado.

Os fabricantes acompanharam a procura. A FDA, a agência americana que regula aparelhos médicos, liberou de 2 a 8 aparelhos de luz para rugas por ano entre 2008 e 2021, 16 em 2024 e 42 em 2025. A CurrentBody, uma das marcas dos presentes de Kardashian, faturou 125,8 milhões de libras com as máscaras em 2025, cerca de 89% da receita do grupo que a controla, que abriu o capital na Bolsa de Londres em outubro daquele ano [S]. O gráfico abaixo junta as buscas e as liberações:

> **WIDGET l00 · `as-buscas`**
> **Título:** Buscas por luz vermelha no Google e aparelhos liberados pela FDA, de 2018 a 2026
> **Instrução:** Siga a linha de cima até o pico de abril de 2026 e compare o salto de cada fim de ano com as colunas de liberações, embaixo.
> **Tipo:** SVG estático, três painéis empilhados com o mesmo eixo de anos.
> **Referência:** os gráficos anotados do *Financial Times* (John Burn-Murdoch), com rótulo direto no fim da linha e anotações curtas presas ao ponto; o c00 do ensaio do cortisol e o w13a do da dopamina, dos quais este é a continuação.
> **O que mostra:** painel 1, "red light therapy" no mundo, série mensal de `dados/trends-world_en.csv`, jan/2018 a nov/2026, com novembro parcial em pontilhado, linha em `--rubi`. Ao lado, em cinza fino e na mesma escala, "cold plunge" de `dados/trends-world_misc.csv` (pico de 24 em mai/2026). Anotações, uma por ponto e nenhuma sobre a linha: "dez/2023 · Kardashian dá máscaras de Natal" [S]; "dez/2025 = 82 · pico das buscas por máscara"; "abr/2026 = 100 · gorro, cinto, colchonete e cama"; "out/2026 = 41". Médias anuais em Space Mono pequeno sob o eixo: 2,8 (2018), 3,8, 4,1, 5,5, 8,1, 13,8, 25,2, 46,0, 65,5 (2026). Painel 2, Brasil, de `dados/trends-br_misc.csv` e `dados/trends-br_pt.csv`: "laserterapia" em tinta e "LED facial" em `--rubi`, com a nota "terapia de luz vermelha: perto de zero em todos os meses". Painel 3, colunas de `dados/fda-510k-OHS-por-ano.csv`: liberações 510(k) no código OHS (luz para rugas, venda livre) por ano, de 2 a 8 até 2021, 16 em 2022, 12 em 2023, 16 em 2024, 42 em 2025 e 27 em 2026 até novembro, com o total "166 desde 2008".
> **Leitura:** As buscas cresceram cerca de 23 vezes entre 2018 e 2026, com um salto a cada temporada de presentes, e caíram cerca de 60% depois do recorde de abril. No mesmo período, as liberações de máscaras e aparelhos para rugas na FDA passaram de poucas por ano para 42 em 2025.
> **Interação:** nenhuma, infográfico.
> **Motion:** as linhas se desenham da esquerda para a direita ao entrar na tela (900 ms); as anotações aparecem em seguida, uma de cada vez; as colunas crescem do zero por último.
> **Risograph:** nenhuma no gráfico; um celular pequeno em duas tintas no canto superior direito, como selo, igual aos ensaios anteriores.
> **Celular/acessibilidade:** os três painéis empilham com 200 a 240 px de altura cada; as anotações viram números pequenos no ponto, com a lista embaixo. Tabela equivalente com as médias anuais e as liberações por ano para leitor de tela.
> **Legenda:** Google Trends, consultas de 14/11/2026 (pytrends). O índice vai de 0 a 100, e 100 é o mês com mais buscas dentro de cada consulta; os painéis do mundo e do Brasil não se comparam entre si. FDA, base openFDA de 510(k), código de produto OHS. Marie Claire, sobre os presentes de Kardashian [S].

Quem promove essas máscaras nas redes raramente é médico. Num levantamento de 132 posts publicado em fevereiro de 2026, 64,4% vinham de pessoas sem formação em saúde, e só 8,3% traziam o link de um estudo revisado por pares (Merkle e colegas, *Cureus*) [S]. As promessas vão das rugas e da acne à queda de cabelo, à gordura da barriga, à testosterona, ao sono e à "energia das mitocôndrias". Algumas têm estudos sólidos por trás e outras não têm nenhum, e para separar umas das outras é preciso saber o que essa luz é e o que acontece com ela quando entra no corpo.

---

## 01 · A luz

### O vermelho e o infravermelho próximo atravessam a pele melhor que as outras cores, porque o sangue e a água absorvem pouco deles

A luz vermelha dos aparelhos é luz comum, da mesma natureza da luz de uma lâmpada, concentrada numa faixa estreita de cores. A cor da luz depende do comprimento de onda, medido em nanômetros (nm), que são milionésimos de milímetro. O olho enxerga de cerca de 400 nm, o violeta, a cerca de 700 nm, o vermelho mais escuro. Acima de 700 nm começa o infravermelho próximo, que o olho não enxerga. Os aparelhos de luz vermelha emitem quase sempre em dois ou três pontos dessa régua, e os números que aparecem nas caixas são 630, 660, 810, 830 e 850 nm.

Para ter qualquer efeito no corpo, a luz precisa ser absorvida por alguma molécula, e a maior parte das cores é absorvida antes de ir longe. O sangue segura o azul e o verde, e a hemoglobina carregada de oxigênio absorve cerca de 117 vezes mais luz verde, de 550 nm, do que luz vermelha, de 650 nm (tabelas de Prahl, do Oregon Medical Laser Center). A melanina, o pigmento da pele, também absorve mais as cores curtas. Do outro lado da régua, a água começa a absorver forte depois de 950 nm, e em 980 nm absorve cerca de 20 vezes mais do que em 800 nm (Hale e Querry, 1973). Entre esses dois bloqueios sobra uma faixa, de cerca de 650 a 950 nm, em que a luz se espalha pelo tecido em vez de ser engolida e por isso vai mais fundo. Os físicos chamam essa faixa de janela óptica [S], e todos os aparelhos de luz vermelha trabalham dentro dela:

> **WIDGET l01 · `a-janela`**
> **Título:** As cores que o sangue, a melanina e a água deixam passar
> **Instrução:** Siga as três curvas da esquerda para a direita e procure o vale entre 650 e 950 nm, onde ficam as marcas dos aparelhos.
> **Tipo:** SVG estático, sobre o fundo escuro da seção 01.
> **Referência:** os espectros de absorção de livro de óptica biomédica (Jacques, 2013), redesenhados com rótulo direto; a régua de comprimentos de onda de "Light and Shadows", de Bartosz Ciechanowski.
> **O que mostra:** eixo x de 400 a 1.000 nm, com uma barra fina abaixo do eixo pintada nas cores reais do visível até 700 nm e, depois, em `--infra` com hachura, rotulada "infravermelho próximo · invisível". Eixo y em escala logarítmica, rotulado "quanto absorve (escala de 10 em 10)". Três curvas com rótulo direto no fim: hemoglobina oxigenada, dos valores da tabela de Prahl (550 nm: 43.016; 600: 3.200; 650: 368; 700: 290; 750: 518; 800: 816; 850: 1.058; 900: 1.198; 950: 1.204 cm⁻¹/M); água, da tabela de Hale e Querry (550: 0,00045; 600: 0,0023; 650: 0,0032; 700: 0,006; 750: 0,026; 800: 0,020; 850: 0,043; 900: 0,068; 950: 0,39; 980: 0,43 cm⁻¹); melanina, curva de forma com o expoente usado no dossiê (λ elevado a −3,5) [S], tracejada e rotulada "forma aproximada". Cada curva normalizada no próprio eixo, com a nota de que as três unidades diferem. A faixa de 650 a 950 nm sombreada em `--rubi-soft` com o rótulo "janela óptica". Duas chamadas: "550 nm → 650 nm: o sangue absorve 117 vezes menos" e "800 nm → 980 nm: a água absorve cerca de 20 vezes mais". Sobre a régua, etiquetas pequenas nos comprimentos das caixas: 415 (azul de máscara de acne, em cinza, fora da janela), 630, 660, 810, 830, 850. Por cima, quatro faixas finas com os picos de efeito em células de Karu e Kolyakov (2005): 614 a 624, 668 a 684, 751 a 772 e 813 a 846 nm, rotuladas "onde células responderam mais".
> **Leitura:** O sangue absorve o azul e o verde, e a água absorve o infravermelho mais longo. Sobra uma faixa do vermelho ao infravermelho próximo em que a luz entra mais fundo, e os aparelhos foram feitos para emitir dentro dela.
> **Interação:** nenhuma, infográfico.
> **Motion:** as três curvas se desenham uma de cada vez (900 ms cada); a janela se acende por último, junto com as etiquetas das caixas.
> **Risograph:** um prisma pequeno em duas tintas no canto superior esquerdo, decompondo um feixe branco, fora da área das marcas.
> **Celular/acessibilidade:** a régua vira vertical, com os comprimentos curtos em cima e os longos embaixo, e as etiquetas das caixas à direita. Tabela equivalente com os valores de absorção por comprimento de onda.
> **Legenda:** Hemoglobina: Prahl, Oregon Medical Laser Center (omlc.org). Água: Hale e Querry (*Applied Optics*, 1973). Melanina: forma aproximada usada no modelo do dossiê [S]. Picos em células HeLa: Karu e Kolyakov (*Photomed Laser Surg*, 2005). Janela óptica conforme Jacques (*Phys Med Biol*, 2013) [S].

A régua também ajuda a entender os números das caixas. Karu e Kolyakov (2005) iluminaram células humanas de cultura com uma cor de cada vez e mediram quanto elas passavam a fabricar DNA e a aderir à placa. As respostas tiveram picos em quatro faixas, e os LEDs de 630 e 660 nm ficam perto das duas primeiras, enquanto o de 850 nm fica logo acima da última. Os fabricantes também usam esses comprimentos porque são os LEDs mais baratos do mercado, uma inferência do dossiê que nenhuma empresa confirmou [S]. Os picos mostram onde as células responderam, e não dizem quanta luz uma pessoa precisa receber nem a que profundidade.

---

## 02 · Até onde entra

### A luz vermelha perde quase tudo no primeiro centímetro de pele, e o infravermelho próximo chega um pouco mais fundo

Quem já pôs a lanterna do celular atrás dos dedos viu a mão brilhar em vermelho. A luz que sai do outro lado é vermelha porque o sangue absorveu o azul e o verde no caminho, e ela sai fraca e espalhada em todas as direções. O brilho dá a impressão de que a luz atravessa o corpo com facilidade, e as medidas mostram uma perda grande.

Em 2012, Jagdeo e colegas apontaram um LED comercial para a bochecha de voluntários vivos e mediram quanta luz atravessava cerca de 1 cm de tecido. Antes de ver o resultado, escolha quanto da luz vermelha você acha que chegou ao outro lado:

> **WIDGET l02 · `ate-onde-entra`**
> **Título:** Quanto da luz atravessa uma bochecha, uma mão e um crânio
> **Instrução:** Escolha quanto da luz vermelha atravessa 1 cm de bochecha. Depois compare o vermelho com o infravermelho nos três cortes e nas barras do crânio.
> **Tipo:** palpite em HTML, depois SVG estático com três painéis e Canvas 2D para as nuvens de luz.
> **Referência:** o *You Draw It* do *New York Times* (2015), pelo palpite antes do dado; os cortes de tecido com escala em milímetros das pranchas de David Macaulay; os gráficos de barra em escala logarítmica de "The Scale of the Universe", de Cary e Michael Huang.
> **O que mostra:** estado inicial, o corte de uma bochecha em riso com uma régua de 0 a 10 mm e a pergunta "De cada 100 partes de luz vermelha (633 nm) que entram, quantas saem do outro lado?". Quatro botões grandes: "cerca de 50", "cerca de 25", "cerca de 10" e "cerca de 2". Ao escolher, o painel 1 se revela. **Painel 1, a bochecha (Jagdeo 2012, LED a cerca de 33 a 73 mW/cm²):** duas nuvens de pontos lado a lado na mesma escala, vermelho de 633 nm e infravermelho de 830 nm, que se apagam com a profundidade; no fim do corte, em waffle de 1.000 quadrados, os 21 que passam no vermelho (2,1%) e os 120 que passam no infravermelho (12%); com pressão forte, 4,0% e 15%, como nota. **Painel 2, a mão (25 mm, a palma):** o mesmo par, com "1 em cada 1.000" no infravermelho (0,096%) e "1 em cada 20 mil" no vermelho (0,005%). Uma faixa abaixo dos painéis 1 e 2 mostra, para cinco comprimentos (630, 660, 810, 850 e 940 nm), a profundidade em que a luz cai a 37% num modelo de derme do dossiê: 4,6, 6,0, 6,4, 5,3 e 2,9 mm [S], rotulada "simulação; serve para a forma". **Painel 3, o crânio:** barras horizontais em escala logarítmica, "quanto da luz atravessa o crânio": camundongo 40,1% (0,44 mm de osso), rato 21,2%, coelho 11,4%, crânio humano seco 4,2% (6 a 7 mm de osso, 800 nm; Lapchak 2015), têmpora humana com couro e tecido mole 0,9% no infravermelho de 830 nm e menos de 0,0015% no vermelho de 633 nm (Jagdeo 2012, cadáver), porco com couro 0,11% (Salehpour 2019). Barras do infravermelho em `--infra` com hachura e do vermelho em `--rubi`.
> **Leitura:** Da luz vermelha que entra numa bochecha, cerca de 2% chegam ao outro lado, e do infravermelho próximo chegam cerca de 12%. O crânio de uma pessoa deixa passar uma fração muito menor que o de um camundongo, e por isso o que funciona no cérebro do animal pode não receber luz suficiente no de uma pessoa.
> **Interação:** um palpite antes da revelação, com quatro opções. A interação ensina por previsão: a maioria das pessoas pensa na mão brilhando e escolhe um número alto. A etiqueta compara a escolha com o medido ("Seu palpite: 25. O medido: 2,1."), e uma escolha a mais de dez vezes do medido chama `DN.surprise`. O palpite fica em `DN.store` (`rs_luz_bochecha`). Botão `ver sem palpitar` sempre visível. Depois da revelação, o widget fica estático.
> **Motion:** ao escolher, as nuvens de pontos descem da superfície e se apagam com a profundidade em 900 ms; o waffle se preenche em seguida; as barras do crânio crescem da esquerda.
> **Risograph:** a abertura é a mão contra a lanterna, em rubi sobre a tinta de pele, com o brilho nas bordas dos dedos e desregistro de 2 px; é a candidata à imagem de compartilhamento. Os cortes de bochecha e de crânio em duas tintas com proporção real: epiderme, derme, gordura e músculo na bochecha; couro, osso e meninges no crânio, com o osso no branco do papel e contorno de tinta. As nuvens de luz ficam nítidas, como marcas de dado.
> **Celular/acessibilidade:** os botões do palpite empilham com 48 px de altura; os painéis 1 e 2 viram um carrossel com `scroll-snap` e a régua sempre visível; as barras do crânio ocupam a largura. Navegação por teclado nos botões, `aria-live` anuncia o resultado. Tabela equivalente com todas as porcentagens.
> **Legenda:** Jagdeo et al. (*PLoS One*, 2012), bochecha e mão de voluntários vivos e cabeça de cadáver; porcentagens calculadas pelo dossiê a partir das tabelas do artigo. Lapchak et al. (2015), crânios secos. Salehpour et al. (2019), revisão. Profundidades do modelo calculadas pelo dossiê com parâmetros médios de pele (Jacques, 2013) [S]. Os cadáveres e crânios secos não têm sangue circulando, que absorve mais luz.

Da luz vermelha de 633 nm, passaram 2,1%, cerca de 21 partes em cada 1.000. Do infravermelho de 830 nm, passaram 12%, quase seis vezes mais. Na palma da mão, com 25 mm de espessura, passou cerca de 1 parte em 1.000 do infravermelho e 1 em 20 mil do vermelho. As outras medidas dão a mesma ordem de grandeza. Numa cabeça de cadáver, o infravermelho de 808 nm caiu para cerca de 11% a cada centímetro e ainda foi detectado a 4 cm da superfície (Tedford e colegas, 2015). Numa simulação de pele, a luz de 750 nm caiu a 1% do valor máximo a cerca de 5,4 mm de profundidade (Ash e colegas, 2017). Por isso a luz vermelha visível age nos primeiros milímetros, onde ficam a epiderme e a derme, enquanto o infravermelho próximo chega a alguns centímetros com perdas grandes.

Essa perda pesa nos aparelhos que prometem chegar ao cérebro, como os capacetes de infravermelho vendidos para memória e humor. O crânio de um camundongo tem menos de meio milímetro de osso e deixou passar 40,1% da luz de 800 nm, enquanto um crânio humano seco, com 6 a 7 mm, deixou passar 4,2% (Lapchak e colegas, 2015). Com couro cabeludo e tecido mole, a têmpora de um cadáver deixou passar 0,9% do infravermelho e quase nada do vermelho. **[destaque]** Com o mesmo aparelho, o cérebro de um camundongo recebe de 10 a 300 vezes mais luz que o de uma pessoa [S], e uma revisão de 2019 concluiu que essa diferença põe em dúvida o uso dos animais como modelo (Salehpour e colegas).

---

## 03 · Na célula

### Em células, a luz vermelha faz a mitocôndria produzir mais energia, e em pessoas esse efeito ainda não foi medido diretamente

A primeira pista de que essa luz muda alguma coisa no corpo veio por acaso. Em 1967, em Budapeste, o médico Endre Mester queria saber se o laser, inventado sete anos antes, causava câncer [S]. Ele raspou o dorso de camundongos e iluminou um grupo com um laser de rubi fraco, de 694 nm. Os camundongos não tiveram câncer, e o pelo do grupo iluminado cresceu mais rápido [S]. O artigo saiu em alemão em 1968. A técnica ficou conhecida como laserterapia de baixa potência, e em 2014 um encontro de duas sociedades da área propôs trocar o nome por fotobiomodulação, porque a maioria dos aparelhos já usava LED e lâmpadas em vez de laser [S]. No PubMed, a base de artigos médicos, "photobiomodulation" passou o nome antigo em 2019. "Red light therapy", o nome que circula nas redes, apareceu em 1 artigo em 2010 e em 67 em 2025.

A explicação mais aceita para o efeito começa na mitocôndria, a estrutura da célula que usa oxigênio para produzir ATP, a molécula em que a célula guarda energia. A última enzima da cadeia que faz esse trabalho, a citocromo c oxidase, tem átomos de cobre e de ferro que absorvem vermelho e infravermelho próximo, e purificada ela absorve mais em 835 nm (Mason e colegas, 2014). A hipótese mais citada diz que, em células sob estresse, o óxido nítrico se prende a essa enzima e reduz a respiração da célula, e que a luz solta o óxido nítrico e deixa a enzima voltar a trabalhar (de Freitas e Hamblin, 2016). Depois disso viria um pulso curto de espécies reativas de oxigênio, moléculas que em pequena quantidade ativam genes de defesa da célula (Chen e colegas, 2011).

Parte dessa cadeia foi medida. Em mitocôndrias isoladas de fígado de rato, a luz de um laser de hélio-neônio aumentou a síntese de ATP já em 1984 (Passarella e colegas), e em culturas de células o aumento de ATP se repetiu em vários laboratórios. Em 11 voluntários, um laser de 1.064 nm apontado para a testa aumentou a forma oxidada da citocromo c oxidase, medida por espectroscopia, em comparação com placebo (Wang e colegas, 2017), e aquecer a pele na mesma medida não teve esse efeito (Wang e colegas, 2018).

Outra parte não fecha. Em 2019, Lima e colegas usaram células que não tinham nenhuma citocromo c oxidase montada, e a luz de 660 nm aumentou a multiplicação delas tanto quanto a das células normais. Em 2020, Quirk e Whelan escreveram que nenhuma demonstração confiável de um efeito da luz sobre essa enzima tinha sido publicada; Harry Whelan é o pesquisador que, nos anos 1990, levou para a medicina os LEDs que a NASA testava no cultivo de plantas [S]. Nos estudos reunidos para este ensaio, nenhum mediu o ATP no tecido de uma pessoa depois de uma sessão com aparelho doméstico. O quadro abaixo mostra o que foi medido em cada nível:

> **WIDGET l03 · `o-que-foi-medido`**
> **Título:** O que a luz faz na mitocôndria e em que nível cada passo foi medido
> **Instrução:** Leia a cadeia de cima da esquerda para a direita e depois desça pela tabela, em que cada linha diz onde aquele passo foi medido.
> **Tipo:** SVG estático: um diagrama de três tempos em cima e uma matriz de quatro colunas embaixo.
> **Referência:** as matrizes de evidência da *Our World in Data*; os diagramas sequenciais com rótulos fora do traço de "Mechanical Watch", de Bartosz Ciechanowski.
> **O que mostra:** em cima, um corte da membrana interna da mitocôndria, com as cristas em proporção real, e três tempos ligados por setas com rótulo ao lado: (1) "a citocromo c oxidase absorve a luz", com a proteína em `--rubi`; (2) "o óxido nítrico se solta e a produção de ATP sobe", com o óxido nítrico em `--infra`; (3) "um pulso curto de espécies reativas de oxigênio ativa genes de defesa". Sob a cena, uma barra de tempo em Space Mono: segundos, minutos, horas. Selo "hipótese principal" sobre os passos 1 e 2. Embaixo, a matriz. Colunas: mitocôndria isolada, célula em cultura, animal, pessoa. Linhas e células: **a enzima absorve essa luz**, "medido" na enzima purificada (Mason 2014) e em células (Karu e Kolyakov 2005); em pessoa, "medida indireta: a forma oxidada sobe com laser de 1.064 nm na testa, 11 voluntários" (Wang 2017). **o óxido nítrico se solta**, "medido" em células (o óxido nítrico muda o espectro de resposta; Karu 2005); em animal e pessoa, "não medido". **ATP sobe**, "medido" em mitocôndria isolada (Passarella 1984) e em células (Chen 2011; Sharma 2011); em pessoa, "não medido". **pulso de espécies reativas de oxigênio**, "medido" em células (Chen 2011; Huang 2011); em pessoa, "não medido". **efeito em feridas, dor ou pele**, "medido" em animais (seção 04) e em pessoas conforme o uso (seções 05 e 06). Uma chamada lateral, presa à linha da enzima: "células sem a enzima também responderam à luz de 660 nm (Lima 2019)". Outra, presa à coluna das pessoas: "nenhuma demonstração confiável do efeito da luz na enzima (Quirk e Whelan, 2020)". Células "não medido" em cinza claro, com o texto escrito, e nunca vazias.
> **Leitura:** A cadeia que vai da luz ao ATP foi medida em mitocôndrias e em células, onde a luz chega sem pele e sangue no caminho. Na coluna das pessoas, a maior parte dos passos ainda não foi medida, e células sem a enzima também responderam à luz.
> **Interação:** nenhuma, infográfico.
> **Motion:** os três tempos aparecem um de cada vez, da esquerda para a direita (450 ms cada); a matriz se preenche por colunas, da mitocôndria isolada à pessoa, e a coluna das pessoas entra por último.
> **Risograph:** a membrana dobrada da mitocôndria em duas tintas, com proporção real, sem rosto, sem raio e sem a imagem da usina. A proteína em rubi sólido; o óxido nítrico em pontos de ameixa.
> **Celular/acessibilidade:** os três tempos empilham verticalmente, com a barra de tempo à esquerda; a matriz vira quatro cartões, um por linha, com as quatro colunas como lista de "medido" e "não medido". Tabela equivalente para leitor de tela.
> **Legenda:** Mason, Nicholls e Cooper (*BBA*, 2014); Karu e Kolyakov (2005); Karu et al. (*Lasers Surg Med*, 2005); Passarella et al. (*FEBS Lett*, 1984); Chen et al. (*PLoS One*, 2011); Sharma et al. (*Lasers Surg Med*, 2011); Huang et al. (*Dose Response*, 2011); Wang et al. (*J Cereb Blood Flow Metab*, 2017; *Neurophotonics*, 2018); Lima et al. (2019); Quirk e Whelan (*Photomed Laser Surg*, 2020); de Freitas e Hamblin (*IEEE J Sel Top Quantum Electron*, 2016).

A cadeia toda é plausível, e cada elo tem dados em algum nível. Os dados mais firmes vêm de células em placa, que recebem a luz sem pele, sangue e melanina no caminho, enquanto nas pessoas a maior parte dos passos ainda depende de inferência. O campo também é pequeno e concentrado em poucos grupos, e coautores de várias revisões-base declaram ligação com fabricantes de laser.

---

## 04 · A dose

### Na dose certa a luz ajudou feridas a fechar, e com uma dose 25 vezes maior deixou a ferida pior que sem luz

Dois números dizem quanta luz um tecido recebeu. A irradiância, em miliwatts por centímetro quadrado (mW/cm²), diz quanta luz chega a cada centímetro quadrado de pele a cada segundo, e é o número que o fabricante deveria imprimir na caixa. A dose, em joules por centímetro quadrado (J/cm²), soma essa luz ao longo do tempo e é igual à irradiância multiplicada pelos segundos. Um aparelho de 30 mW/cm² ligado por 10 minutos entrega 18 J/cm², porque 0,03 W/cm² vezes 600 segundos dá 18.

Em 2007, Demidova-Rice e colegas fizeram feridas no dorso de camundongos e as iluminaram com o mesmo aparelho, de 635 nm e 100 mW/cm², por tempos diferentes, para entregar 1, 2, 10 ou 50 J/cm². Com essa irradiância, 2 J/cm² levam 20 segundos, e 50 J/cm² levam 8 minutos e 20 segundos. Escolha a dose que você acha que fechou a ferida mais depressa:

> **WIDGET l04 · `pouca-e-demais`**
> **Título:** Quanto tempo de luz ajudou uma ferida a fechar e quanto atrapalhou
> **Instrução:** Escolha um dos quatro tempos de luz e veja onde ele caiu na curva. Depois compare a posição do melhor resultado nos outros estudos, embaixo.
> **Tipo:** palpite em HTML, depois SVG estático com um gráfico grande e pequenos múltiplos.
> **Referência:** os pequenos múltiplos de Edward Tufte, com o mesmo eixo em todos; o palpite com revelação do c02a do ensaio do cortisol.
> **O que mostra:** estado inicial, quatro botões com tempo e dose: "10 s · 1 J/cm²", "20 s · 2 J/cm²", "1 min 40 s · 10 J/cm²" e "8 min 20 s · 50 J/cm²", com um camundongo em riso e um cronômetro. Ao escolher, o gráfico grande aparece: eixo x de dose em escala logarítmica (0,1 a 100 J/cm²), eixo y "fechamento da ferida em relação ao grupo sem luz", com a linha do zero rotulada "sem luz". Os quatro pontos de Demidova-Rice 2007 em `--rubi`: 2 J/cm² rotulado "melhor resultado"; 50 J/cm² abaixo do zero, rotulado "ferida maior que sem luz". Uma curva fina e tracejada liga os pontos, rotulada "forma, não ajuste". A escolha do leitor fica marcada com um anel. Embaixo, sete pequenos múltiplos com o mesmo eixo de dose (0,001 a 1.000 J/cm²), cada um com um sino tracejado e o ponto do melhor resultado: fibroblastos humanos, 0,3 J/cm² (Chen 2011); fibroblastos, 0,88 J/cm² com queda a 8,68 (Zhang 2003); fibroblastos feridos, 2,5 J/cm² com dano a 10 (Hawkins 2005); neurônios de camundongo, 3 J/cm² e potencial da membrana abaixo do normal a 30 (Sharma 2011); células de articulação, 5 J/cm² e menos efeito a 50 (Yamaura 2009); inflamação no pulmão de camundongo, 7,5 J/cm² e menos efeito a 15 (Lopes-Martins 2005); traumatismo craniano em camundongo, 36 J/cm² e piora a 360 (Huang 2011). Uma faixa abaixo dos múltiplos marca, no mesmo eixo, "10 min de painel a 15 cm: 31 a 54 J/cm²" [S] e "10 min de máscara de 10 mW/cm²: 6 J/cm²".
> **Leitura:** A dose que mais ajudou a ferida foi de 20 segundos, e oito minutos com o mesmo aparelho deixaram a ferida pior que sem luz. O ponto ótimo muda de um tecido para outro, de 0,3 a 36 J/cm² nestes estudos, e o formato de sino aparece em quase todos.
> **Interação:** um palpite antes da revelação, com quatro opções. A interação ensina por previsão: quem acha que mais luz é sempre melhor escolhe 50 J/cm² e vê o ponto cair abaixo da linha do zero. A etiqueta diz "Você escolheu 8 min 20 s. Foi o único tempo que deixou a ferida maior que sem luz." quando for o caso; escolher 50 J/cm² chama `DN.surprise`. Botão `ver sem palpitar`. Depois da revelação, estático.
> **Motion:** os quatro pontos entram da esquerda para a direita (180 ms cada) e o tracejado se desenha depois (900 ms); os pequenos múltiplos se revelam ao rolar, um de cada vez.
> **Risograph:** um camundongo em perfil com a ferida no dorso e um cronômetro de cozinha, pequenos, em duas tintas, ao lado dos botões.
> **Celular/acessibilidade:** os quatro botões em grade 2 × 2; os pequenos múltiplos empilham, todos com o mesmo eixo de dose e 120 px de altura. Teclado nos botões; `aria-live` anuncia o resultado. Tabela equivalente com estudo, modelo, melhor dose e o que acontece acima.
> **Legenda:** Demidova-Rice et al. (*Photomed Laser Surg*, 2007); Chen et al. (2011); Zhang et al. (2003); Hawkins e Abrahamse (2005); Sharma et al. (2011); Yamaura et al. (2009); Lopes-Martins et al. (2005); Huang et al. (*Dose Response*, 2009 e 2011), de onde vêm os números desses estudos. As curvas tracejadas mostram a forma e não são ajustes aos dados. Doses de painel calculadas com as medidas de revisores do mercado [S].

**[destaque]** A dose que mais ajudou foi a de 2 J/cm², vinte segundos de luz, e com 50 J/cm², pouco mais de oito minutos do mesmo aparelho, as feridas cresceram mais do que as dos camundongos que não receberam luz nenhuma.

Esse padrão tem nome antigo. Em 1877 e 1888, Hugo Schulz viu que doses pequenas de venenos estimulavam leveduras e doses grandes as inibiam, e a ideia de que um estímulo fraco ativa e um forte inibe ganhou depois o nome de hormese. Na luz, os pesquisadores chamam o padrão de resposta bifásica. Ele aparece em células, em feridas e em cérebros de camundongo, sempre com o pico num lugar diferente. Em camundongos com traumatismo craniano, 36 J/cm² melhoraram o resultado por quatro semanas, e dez vezes mais luz tirou o benefício e deixou os seis primeiros dias piores que sem tratamento. Repetir também conta, porque 14 sessões diárias apagaram a vantagem que uma a três sessões tinham dado (Huang e colegas, 2011). Tecidos com muita mitocôndria, como músculo, nervo e cérebro, tendem a responder a doses menores que a pele e o tendão, e neles os estudos sem efeito parecem ter errado mais por excesso de luz que por falta (Zein, Selting e Hamblin, 2018).

A dose também deixa parte da história de fora. Em úlceras de pressão de camundongos, Lanzafame e colegas (2007) deram sempre 5 J/cm² por dia e mudaram só a irradiância, e entre 0,7 e 40 mW/cm² apenas a de 8 mW/cm² teve efeito significativo (Huang e colegas, 2009). A mesma dose dada devagar e dada depressa pode dar resultados diferentes, e por isso qualquer conta de minutos serve para a ordem de grandeza, e não para acertar o ponto exato.

Quase tudo isso foi medido em células e animais. Até 2009, nenhum estudo clínico tinha mostrado a curva em pessoas (Huang e colegas, 2011). Para uso clínico, a WALT, associação mundial de laserterapia, publicou em 2010 tabelas de dose por diagnóstico, de 4 a 16 joules por local tratado, divididos em poucos pontos, com 20 a 300 segundos por ponto e uma margem de 50% para mais ou para menos. Fora dessa margem, diz a própria tabela, a aplicação deixa de contar como laserterapia de baixa potência, e as doses foram calibradas para pele branca. Nos estudos de pele com LED, a ciência também não concorda sobre a dose. Uma revisão de 2025 reuniu 27 desses estudos e encontrou doses de 0,1 a 126 J/cm², com mediana de 40,5, e nenhum deles conferiu com um medidor a dose que disse ter entregado (Grimes).

---

## 05 · Onde funciona

### A luz vermelha tem diretriz clínica para prevenir feridas na boca de quem trata câncer, e efeito moderado contra a calvície e a dor no pescoço

O nome "luz vermelha" cobre um laser de 660 nm encostado na boca, um capacete de infravermelho, um pente de laser para o couro cabeludo e uma máscara de LED, e as doses desses aparelhos diferem por ordens de grandeza. Por isso a pergunta sobre o que funciona precisa de um alvo. As fichas abaixo trazem seis usos comuns. Arraste cada uma para o degrau que você acha que ela ocupa, do mais firme, em que uma diretriz médica recomenda o uso, ao mais fraco, em que não há estudo em pessoas:

> **WIDGET l05 · `a-escada`**
> **Título:** A escada da evidência da luz vermelha, uso por uso
> **Instrução:** Arraste as seis fichas para o degrau que você imagina e toque em `conferir`. As fichas vão para o degrau certo, e os outros usos aparecem em seguida.
> **Tipo:** HTML com CSS grid e Pointer Events.
> **Referência:** os cartões de palpite do w00 da dopamina e do c00 do cortisol; as escadas de evidência das revisões de saúde da *Vox* e do *Our World in Data*.
> **O que mostra:** cinco degraus, de cima para baixo, cada um com um rótulo e uma frase curta: **diretriz recomenda** ("uma sociedade médica recomenda com protocolo definido"); **efeito moderado** ("efeito consistente contra luz falsa, com estudos pequenos ou ligados a quem vende"); **sinal fraco** ("poucos estudos pequenos, positivos e frágeis"); **estudos sem efeito** ("ensaios ou meta-análises que não acharam diferença"); **nenhum estudo em pessoas** ("só células, animais ou anúncio"). Seis fichas para o palpite, cada uma com ícone: feridas na boca no tratamento de câncer, calvície, dor no joelho, rugas, emagrecer, testosterona. Ao conferir, as fichas deslizam para o lugar e entram as outras. Cada ficha mostra o melhor número numa linha:
> - **diretriz recomenda:** prevenção de mucosite oral em transplante de medula e radioterapia de cabeça e pescoço, "risco de mucosite grave 0,37 vez o do controle, 18 ensaios, 1.144 pacientes" (Oberoi 2014; MASCC/ISOO 2019).
> - **efeito moderado:** calvície, "diferença padronizada de 1,27 na densidade de fios, 7 ensaios contra luz falsa" (Lueangarun 2021); dor no pescoço, "19,9 mm a menos numa escala de 0 a 100, 16 ensaios" (Chow 2009); dor no joelho, "14,2 mm a menos, 22 ensaios", com o selo "diretriz britânica diz para não oferecer" (Stausholm 2019; NICE 2022 [S]); miopia em crianças, "olho cresceu 0,26 mm a menos em um ano, 264 crianças", com o selo "segurança não resolvida, ver seção 09" (Jiang 2022); degeneração macular seca, "3,8 letras a mais que a luz falsa aos 21 meses, um ensaio" (FDA, De Novo, 2024).
> - **sinal fraco:** tendão e fascite plantar, "13,2 mm a menos" (Naterstad 2022); rugas, "um ensaio de 136 pessoas sem luz falsa" (Wunsch 2014); acne, "71 ensaios, mediana de 31 pessoas" (Cochrane 2016); úlcera de pé diabético, "7 ensaios, 194 pessoas" (Li 2018); músculo e exercício, "diferença padronizada de 0,27 em resistência e zero em corrida e natação" (Dutra 2022); gordura localizada, "cerca de 1,8 cm por local, recuperados em parte em duas semanas" (Jackson 2009); memória e demência, "ensaio de 26 pessoas" (Chun 2025); depressão, "18 estudos pequenos" (Seok 2026); sono, "20 atletas sem luz falsa" (Zhao 2012); tireoide de Hashimoto, "um ensaio de 43 pessoas na USP, sem repetição" (Höfling 2013).
> - **estudos sem efeito:** úlcera venosa, "sem diferença na área, 4 ensaios" (Rasul 2026); laser em pontos de acupuntura para artrose, "sem efeito na dor, 13 ensaios" (2026).
> - **nenhum estudo em pessoas:** testosterona e "luz nos testículos" [S]; longevidade e "saúde mitocondrial" [S]; celulite sem massagem junto [S].
> Cada ficha tem um selo pequeno "testado em hospital ou consultório" ou "testado com aparelho de casa", quando o estudo diz qual. O placar do leitor aparece no topo: "Você acertou 3 de 6 degraus."
> **Leitura:** O único uso com diretriz é de hospital, com laser e protocolo exato. As promessas mais comuns dos anúncios, como rugas, emagrecimento e testosterona, ficam nos degraus de baixo.
> **Interação:** arrastar seis fichas e conferir, com alternativa de tocar na ficha e depois no degrau. A interação ensina por previsão: o leitor compromete um palpite sobre cada uso e vê a distância entre o que imaginava e o que os estudos mostram. Errar por dois ou mais degraus em três fichas chama `DN.surprise`. Botão `ver a escada pronta` sempre visível. Testar o arrasto de verdade no celular.
> **Motion:** ao conferir, cada ficha desliza para o degrau certo em 450 ms, uma de cada vez, e as fichas novas aparecem por degrau, de cima para baixo.
> **Risograph:** ícones de 28 px em duas tintas em cada ficha: boca, fio de cabelo, joelho, olho, fita métrica, pescoço, gota (pele), haltere, cérebro, lua, ampulheta, frasco.
> **Celular/acessibilidade:** a escada vira lista vertical de degraus, e as fichas do palpite ficam numa bandeja fixa embaixo; tocar numa ficha e depois num degrau substitui o arrasto. Alternativa de teclado: cada ficha é um botão que abre a lista de degraus. `aria-live` anuncia cada acerto. Tabela equivalente com uso, degrau, número e fonte.
> **Legenda:** Classificação de degraus do dossiê de evidência clínica (`lv-evidencia-clinica.md`), a partir de Zadik et al. (*Support Care Cancer*, 2019, MASCC/ISOO); Oberoi et al. (*PLoS One*, 2014); Lueangarun et al. (2021); Chow et al. (*Lancet*, 2009); Stausholm et al. (*BMJ Open*, 2019); Naterstad et al. (*BMJ Open*, 2022); Jiang et al. (*Ophthalmology*, 2022); FDA DEN230083; Barbaric et al. (Cochrane, 2016); Wunsch e Matuschka (2014); Li et al. (2018); Dutra et al. (2022); Jackson et al. (2009); Chun et al. (2025); Seok et al. (2026); Zhao et al. (2012); Höfling et al. (2013); Rasul et al. (2026). Diferença padronizada: 0,2 é pequena e 0,8 é grande.

O degrau mais alto tem um uso só, e quem o ocupa é um laser de hospital. A mucosite oral é uma inflamação com feridas na boca e na garganta causada pela quimioterapia e pela radioterapia, e nos casos graves as feridas doem a ponto de impedir o paciente de comer. Em 2019, a MASCC/ISOO, a sociedade internacional que reúne os especialistas no tema, passou a recomendar a fotobiomodulação para prevenir a mucosite em três situações: o transplante de células-tronco do sangue, a radioterapia de cabeça e pescoço sem quimioterapia e a radioterapia de cabeça e pescoço com quimioterapia. A recomendação vem com protocolos de comprimento de onda, potência e tempo, e a diretriz diz que o clínico deve seguir todos os parâmetros do protocolo escolhido.

Um dos ensaios centrais foi feito no Brasil. No Instituto Nacional de Câncer, no Rio de Janeiro, Antunes e colegas sortearam 94 pacientes de cabeça e pescoço em quimiorradioterapia para receber laser de 660 nm ou um aparelho igual desligado, sem que pacientes e avaliadores soubessem quem recebia o quê. Cada ponto da boca recebia 1 joule, cerca de 10 segundos de um laser de 100 mW:

> **WIDGET l06 · `cem-pacientes`**
> **Título:** Quantos de 100 pacientes de cabeça e pescoço tiveram mucosite grave com e sem o laser
> **Instrução:** Compare as duas grades. Cada boneco é um paciente, e os coloridos tiveram feridas graves na boca.
> **Tipo:** SVG estático, duas grades de 10 × 10 lado a lado.
> **Referência:** as grades de 100 pessoas dos explicadores de risco do *New York Times* e de David Spiegelhalter (Winton Centre).
> **O que mostra:** grade da esquerda, "aparelho desligado", 100 bonecos com 40 coloridos (40,5% com mucosite grau 3 ou 4). Grade da direita, "laser de 660 nm", 100 bonecos com 6 coloridos (6,4%). Os bonecos coloridos em `--rubi`, os outros em `--line` com contorno de tinta. Sob as grades, duas fichas pequenas: "a meta-análise de 18 ensaios, 1.144 pacientes: risco de mucosite grave 0,37 vez o do controle" (Oberoi 2014) e "um ensaio americano de 2026 com LED dentro da boca, 85 pacientes: 36,8% contra 57,1%" (Hu 2026). Uma terceira ficha, com selo de cautela: "no seguimento, o grupo do laser não teve mais câncer de volta; teve mais resposta completa, 89,1% contra 67,4%, num desfecho secundário de 94 pacientes" (Antunes 2017).
> **Leitura:** Sem o laser, cerca de 40 em cada 100 pacientes tiveram feridas graves na boca, e com o laser foram cerca de 6. É o efeito mais forte da luz vermelha em pessoas, num uso de hospital com protocolo exato.
> **Interação:** nenhuma, infográfico.
> **Motion:** os bonecos se colorem de cima para baixo nas duas grades ao mesmo tempo (450 ms), e a grade da direita para no sexto.
> **Risograph:** os bonecos são carimbos pequenos em duas tintas, com leve desregistro; o resto do gráfico fica nítido.
> **Celular/acessibilidade:** as grades empilham, com 10 × 10 bonecos de 22 px. Texto equivalente com os quatro números.
> **Legenda:** Antunes et al. (*Oral Oncology*, 2013), ensaio de fase III com placebo e duplo-cego, 94 pacientes do INCA; seguimento de Antunes et al. (2017); Oberoi et al. (*PLoS One*, 2014); Hu et al. (*Support Care Cancer*, 2026), financiamento não informado no resumo [NV]. Os 100 bonecos arredondam as porcentagens do ensaio.

Sem o laser, 40,5% dos pacientes tiveram mucosite grave, e com ele foram 6,4%, cerca de um sexto do risco (Antunes e colegas, 2013). Uma meta-análise de 18 ensaios com 1.144 pacientes achou o risco de mucosite grave em 0,37 vez o do controle, e a mucosite grave durou cerca de cinco dias a menos (Oberoi e colegas, 2014). Existia o receio de que a luz estimulasse o tumor na boca, e o seguimento do mesmo ensaio brasileiro achou o contrário, com mais respostas completas no grupo do laser, num número pequeno de pacientes. Em 2025, o Ministério da Saúde incluiu a fotobiomodulação para mucosite oral na tabela de procedimentos do SUS [S]. O degrau tem limites claros. Para tratar a mucosite que já apareceu, e para a mucosite só de quimioterapia, a MASCC/ISOO diz que não há evidência para nenhuma recomendação, e uma revisão de 2024 classificou a maioria das meta-análises sobre o tema como de qualidade criticamente baixa (Rodrigues e colegas).

O degrau de baixo dele já tem efeitos menores e mais ressalvas. Na calvície de padrão masculino e feminino, os pentes e capacetes de laser aumentaram a densidade de fios contra aparelhos de luz falsa em sete ensaios (Lueangarun e colegas, 2021), num efeito de tamanho comparável ao do minoxidil [S]. O primeiro desses aparelhos recebeu a liberação da FDA em 2007 [S]. Quase todos esses ensaios foram pagos pelos fabricantes, duraram até seis meses e não dizem o que acontece quando a pessoa para [S]. Um consenso de 21 especialistas publicado em 2025 no *Journal of the American Academy of Dermatology* pôs a calvície na lista de usos eficazes, junto com a neuropatia periférica, úlceras de várias causas e a dermatite causada pela radioterapia, e deixou rugas e acne de fora da lista (Maghfour e colegas).

A dor é o caso em que meta-análise e diretriz discordam. Para dor no pescoço, 16 ensaios deram em média 19,9 mm a menos numa escala de 0 a 100 (Chow e colegas, 2009, *Lancet*), cerca de 2 pontos numa escala de 0 a 10. Para artrose de joelho, 22 ensaios deram 14,2 mm a menos (Stausholm e colegas, 2019), e mesmo assim a NICE, a agência britânica que escreve as diretrizes do sistema público, lista o laser entre as terapias que não devem ser oferecidas para artrose [S]. A diferença que um paciente percebe fica entre 10 e 20 mm, e por isso esses efeitos ficam na borda do perceptível. Os autores das duas meta-análises são do núcleo da WALT, a associação que promove a técnica [S].

Os olhos têm dois usos novos. Na degeneração macular seca, a perda de visão central comum depois dos 60 anos, o aparelho Valeda recebeu da FDA a autorização De Novo em novembro de 2024. No único ensaio grande, os olhos tratados leram 3,8 letras a mais que os olhos com luz falsa aos 21 meses, menos que uma linha da tabela de letras do oftalmologista, que tem cinco. O grupo da luz falsa também melhorou, nenhum paciente não branco recebeu o tratamento, e os autores trabalham para a fabricante ou prestam consultoria a ela. Na miopia infantil, um ensaio chinês com 264 crianças de 8 a 13 anos usou 3 minutos de luz de 650 nm duas vezes por dia, e em um ano o olho cresceu 0,13 mm no grupo da luz e 0,38 mm no grupo de óculos comuns (Jiang e colegas, 2022). O efeito se repetiu em outros ensaios, também sem aparelho falso no controle, e numa pausa de três meses o olho cresceu mais depressa no grupo da luz do que num grupo tratado com atropina (Xie e colegas, 2026). A segurança desses aparelhos é o assunto da seção 09.

---

## 06 · Onde não convence

### Rugas, acne, gordura e cérebro têm estudos pequenos e muitas vezes pagos por fabricantes, e testosterona e longevidade não têm nenhum estudo em pessoas

As máscaras vendem sobretudo pele mais lisa. O ensaio mais citado sobre rugas, de Wunsch e Matuschka (2014), tratou 113 pessoas com luz vermelha em 30 sessões e mediu melhora na textura da pele e na densidade de colágeno por ultrassom. O grupo de comparação tinha 23 pessoas que não receberam nada, nem uma luz falsa, e por isso parte da melhora pode vir da expectativa e da atenção que o grupo tratado recebeu. Os outros ensaios de LED facial têm de 20 a 60 pessoas [S]. Especialistas ouvidos pela NPR em abril de 2026 descreveram a melhora das rugas como real e pequena, menor que a de um laser de consultório, e possível só com meses de uso várias vezes por semana [S].

A acne tem mais estudos e números mais fracos. Uma revisão Cochrane de 2016 reuniu 71 ensaios com 4.211 pessoas, com mediana de 31 participantes por ensaio, e nenhuma luz usada sozinha mostrou efeito clinicamente relevante. A maior parte dos resultados positivos veio da terapia fotodinâmica, que junta luz e um remédio aplicado na pele e por isso conta como outro tratamento (Barbaric e colegas). Uma meta-análise de LEDs de 2023 calculou uma diferença padronizada de 2,42 para acne, um efeito grande demais para um tratamento cosmético e típico de estudos pequenos e sem cegamento.

As promessas para o corpo ficam ainda mais abaixo. O aparelho Zerona, da Erchonia, recebeu da FDA a liberação para reduzir a circunferência de cintura, quadril e coxas [NV]. Num ensaio com autores ligados à empresa [S], a soma das quatro medidas caiu 8,9 cm no grupo tratado e 1,7 cm no grupo da luz falsa, cerca de 1,8 cm de diferença em cada local (Jackson e colegas, 2009). Duas semanas depois, o grupo tratado tinha recuperado parte dessas medidas. Num teste independente com o mesmo aparelho em 5 pessoas, tratando só um lado do corpo, dermatologistas que não sabiam o lado tratado acertaram em 51,1% das vezes, o mesmo que tirar cara ou coroa (Elm e colegas, 2011). Para o desempenho no exercício, uma meta-análise de 37 ensaios cruzados com luz falsa achou um efeito pequeno na resistência de um músculo isolado e nenhum na força, na corrida e na natação (Dutra e colegas, 2022). Boa parte desses ensaios veio de um grupo da Uninove, em São Paulo, ligado à fabricante de aparelhos Multi Radiance [S].

O cérebro, o sono e os hormônios têm menos ainda. O maior ensaio de capacete para memória publicado tinha 26 participantes (Chun e colegas, 2025), e o ensaio da Vielight, previsto para 228 pacientes com Alzheimer, aparece como suspenso, sem resultados [S]. Quase todo o marketing de "luz vermelha à noite melhora o sono" vem de um estudo com 20 jogadoras de basquete chinesas em que o grupo de comparação não recebeu luz nenhuma (Zhao e colegas, 2012). Uma luz vermelha fraca à noite atrapalha menos a melatonina do que uma luz branca ou azul, e isso é diferente de dizer que ela faz o corpo produzir melatonina [S]. Para testosterona, nenhum ensaio em pessoas apontou luz vermelha para os testículos, e os urologistas lembram que calor nos testículos tende a reduzir a produção de espermatozoides [S]. Para longevidade e "saúde mitocondrial", não existe ensaio em pessoas com qualquer desfecho de envelhecimento [S]. O quadro abaixo põe os principais ensaios lado a lado, com o tamanho, o tipo de comparação e quem estava por trás:

> **WIDGET l07 · `quem-testou`**
> **Título:** Quantas pessoas cada uso testou, contra o quê e com quem por trás
> **Instrução:** Leia cada linha da esquerda para a direita e compare os círculos do topo, os usos de hospital, com os de baixo, os usos de anúncio.
> **Tipo:** SVG estático, uma tabela gráfica com uma linha por uso.
> **Referência:** as tabelas gráficas de ensaios clínicos da *STAT News*; os gráficos de pontos com área proporcional de *The Pudding*.
> **O que mostra:** uma linha por uso, na ordem da escada do l05. Coluna 1, o uso e o ícone. Coluna 2, um círculo com área proporcional ao número de pessoas, com o número escrito: mucosite, 1.144 pacientes em 18 ensaios (meta-análise) e 94 no ensaio do INCA; pescoço, 820 em 16 ensaios; miopia, 264 crianças; rugas, 136 (113 tratadas e 23 sem tratamento); degeneração macular, 100 pacientes, 148 olhos; gordura, 67; tireoide, 43; acne, mediana de 31 por ensaio em 71 ensaios; memória, 26; sono, 20; testosterona, 0, como um círculo vazio tracejado. Coluna 3, o tipo de comparação, com três ícones fixos: "luz falsa ou aparelho desligado" (mucosite, pescoço, degeneração macular, gordura, tireoide, memória); "sem tratamento" (rugas); "sem luz nenhuma" (sono); "óculos comuns" (miopia). Coluna 4, ligação declarada com quem vende ou promove: "autores da fabricante" (degeneração macular, LumiThera); "fabricante pagou" (gordura, Erchonia [S]; calvície, quase todos os ensaios [S]); "autor sócio da fabricante" (miopia, Eyerising, declarado em outro ensaio do mesmo autor; no ensaio de 2022 [NV]); "autores da associação que promove a técnica" (pescoço, WALT [S]); "um único grupo, sem repetição" (tireoide); "não informado no resumo" quando for o caso. Uma linha de rodapé com a síntese mais ampla: "15 meta-análises, 204 ensaios, mais de 9.000 pessoas: certeza moderada só em 5 desfechos" (Son 2025).
> **Leitura:** Os usos que os anúncios mais prometem foram testados em grupos pequenos, muitas vezes sem luz falsa no grupo de comparação e por pesquisadores ligados a quem vende. O uso com diretriz reúne mais de mil pacientes em ensaios com placebo.
> **Interação:** nenhuma, infográfico.
> **Motion:** os círculos crescem do centro ao entrar na tela (450 ms), linha por linha, de cima para baixo.
> **Risograph:** só os ícones de uso, os mesmos do l05, em duas tintas.
> **Celular/acessibilidade:** cada linha vira um cartão com o círculo à esquerda e as três informações empilhadas à direita; a escala dos círculos é a mesma em todos os cartões. Tabela equivalente com todos os números e fontes.
> **Legenda:** Oberoi et al. (2014); Antunes et al. (2013); Chow et al. (2009); Jiang et al. (2022); Wunsch e Matuschka (2014); Boyer et al. (*Retina*, 2024) e Jaffe et al. (2026), LIGHTSITE III; Jackson et al. (2009); Höfling et al. (2013); Barbaric et al. (Cochrane, 2016); Chun et al. (2025); Zhao et al. (2012); Son et al. (*Syst Rev*, 2025). Vínculos conforme as declarações dos artigos e a imprensa citada no dossiê.

Luz falsa é difícil de fazer bem, porque a luz vermelha se vê e alguns aparelhos esquentam, e o voluntário pode perceber em que grupo está. Os ensaios que comparam com "nenhum tratamento" ou com "nenhuma luz" ficam sem essa proteção, e é justamente nos usos de anúncio que eles aparecem mais. A maior síntese recente reuniu 15 meta-análises, 204 ensaios e mais de 9.000 pessoas, e achou certeza moderada em só 5 desfechos. Eles foram a dor da síndrome da boca ardente, incapacidade na artrose de joelho, fadiga na fibromialgia, densidade de cabelo e função cognitiva, que misturava pessoas saudáveis e com demência (Son e colegas, 2025). Nenhuma linha dessa síntese trata de envelhecimento ou de mitocôndria como desfecho.

---

## 07 · Os aparelhos

### Os minutos de uma sessão dependem da luz que chega à pele, e essa luz costuma ser menor que a da caixa e cai com a distância

As máscaras, os painéis e os capacetes seguem a mesma conta da seção 04, em que a dose é a irradiância vezes o tempo. Uma máscara de LED usada num ensaio controlado com 630 e 850 nm entregava no máximo 10 mW/cm², e com ela 10 minutos dão 6 J/cm². Painéis de corpo inteiro medidos a 15 cm entregaram de 52 a 90 mW/cm², e a 30 cm, de 23 a 55 mW/cm² [S]. Um crítico do TikTok mediu cerca de 2 mW/cm² de média numa máscara, e com ela 10 minutos dão 1,2 J/cm² [S]. Como a dose que ajudou nos estudos vai de poucos joules no laser de hospital a dezenas de joules nos estudos de pele com LED, os mesmos 10 minutos por dia podem entregar de 1,2 a 54 J/cm², conforme o aparelho.

Nas feridas de camundongo de Demidova-Rice (2007), uma lâmpada comum de 635 nm e um laser de 633 nm não tiveram diferença, e revisões da área concluem que o LED funciona quando entrega o comprimento de onda e a dose certos (Kim e Calderhead, 2011; Heiskanen e Hamblin, 2018). O que o laser de consultório tem a mais é concentrar muita luz num ponto pequeno, enquanto o painel espalha luz mais fraca por uma área grande [S].

Para saber quantos minutos o seu aparelho precisaria, procure na caixa ou no site a irradiância e a distância em que ela foi medida. Digite o número abaixo, ou escolha um dos aparelhos de referência, e compare os minutos com as doses dos estudos:

> **WIDGET l08 · `quantos-minutos`**
> **Título:** Quantos minutos o seu aparelho precisa para entregar a dose dos estudos
> **Instrução:** Digite a irradiância da caixa do seu aparelho, ou escolha uma das referências, e os minutos que o fabricante manda usar. Compare os tempos de cada dose com o tempo da caixa.
> **Tipo:** HTML com um campo numérico e SVG para as barras de tempo, em escala logarítmica.
> **Referência:** as calculadoras de *The Pudding* em que o número do leitor muda o gráfico inteiro; as etiquetas nutricionais redesenhadas da *Fast Company*.
> **O que mostra:** em cima, a etiqueta de produto com quatro campos: "irradiância (mW/cm²)" com `inputmode="decimal"`, "medida a (cm)", "minutos por sessão" e "comprimento de onda", com o valor "não informado" quando o campo fica vazio. Atalhos de referência: "máscara de ensaio controlado · 10 mW/cm²"; "máscara medida por um crítico · 2 mW/cm²" [S]; "painel a 30 cm · 23 a 55 mW/cm²" [S]; "painel a 15 cm · 52 a 90 mW/cm²" [S]; "sol do meio-dia, 600 a 1.000 nm · 40 mW/cm²" [S]. Embaixo, três barras horizontais num eixo de tempo logarítmico (10 segundos a 10 horas), cada uma com o tempo para chegar a uma dose de referência: **4 J/cm²** ("a dose por ponto do laser de mucosite do INCA"; a WALT e outros grupos recomendam de 4 a 10 J/cm² no tecido-alvo); **40,5 J/cm²** ("a mediana dos 27 estudos de pele com LED", Grimes 2025); **50 J/cm²**, numa faixa hachurada rotulada "a partir daqui, os estudos em células e animais mostram efeito menor ou piora". Uma linha vertical em tinta marca os minutos da caixa, com a dose que eles entregam escrita ao lado ("10 min a 10 mW/cm² = 6 J/cm²"). A conta aparece escrita sob as barras: "minutos = dose ÷ (irradiância × 0,06)". Exemplos já calculados para os atalhos: máscara de 10 mW/cm², 6 min 40 s para 4 J/cm² e 67 min para 40,5 J/cm²; máscara de 2 mW/cm², 33 min para 4 J/cm² e 5 h 37 min para 40,5 J/cm²; painel de 70 mW/cm² a 15 cm, 57 s e 9 min 39 s. Ao lado das barras, uma faixa cinza com duas ressalvas escritas: "a mesma dose dada devagar e depressa pode ter efeitos diferentes (seção 04)" e "esta é a dose na superfície; a 1 cm de profundidade resta cerca de 2% da luz vermelha (seção 02)". Um seletor `a caixa diz a verdade / a caixa exagera como nos painéis medidos` reduz a irradiância digitada em 33% a 57% e mostra os minutos de novo [S].
> **Leitura:** Divida a dose do estudo pela irradiância da caixa e você tem os minutos. Com 10 mW/cm², a máscara precisa de cerca de 7 minutos para a dose do laser de hospital e de mais de uma hora para a dose mediana dos estudos de pele, e um painel forte a 15 cm passa da dose que piorou feridas em menos de 12 minutos.
> **Interação:** uma calculadora em que o número do leitor muda o resultado. A interação ensina porque o aparelho do leitor é o dado: ele descobre quantos minutos a caixa dele precisaria e se os minutos que o fabricante manda usar chegam perto de alguma dose estudada. Os valores digitados ficam em `DN.store` (`rs_luz_aparelho`) e voltam no l13. Sem valor digitado, o widget mostra a máscara de 10 mW/cm².
> **Motion:** as barras se refazem em 450 ms a cada mudança; nenhum movimento contínuo.
> **Risograph:** a máscara vista por dentro, em duas tintas, com a grade de LEDs em pontos de rubi e o papel branco entre eles, e um cronômetro de cozinha ao lado da etiqueta.
> **Celular/acessibilidade:** a etiqueta fica no topo do widget, com o teclado decimal nativo; as três barras viram três cartões com o tempo em número grande. Rótulos com `aria-describedby`, resultado em `aria-live`. Texto equivalente com a fórmula e os exemplos.
> **Legenda:** Máscara de ensaio: estudo coreano com 630 e 850 nm, máximo de 10 mW/cm² (PMC11835066) [V via resumo]. Máscara de 2 mW/cm²: medida citada por Lab Muffin (2025) [S]. Painéis: medições de Light Therapy Insiders e LightLab International, sites com afiliação declarada às marcas [S]. Sol: integração do espectro ASTM G173 feita pelo dossiê [S]. Doses: Antunes et al. (2013); WALT (2010); Zein et al. (2018); Grimes (*PLOS One*, 2025); Huang et al. (2009). Diferença entre anunciado e medido em cinco painéis: LightTherapyIQ [S].

A conta mostra uma diferença de escala grande entre os aparelhos. Com 10 mW/cm², a máscara do ensaio controlado leva cerca de 7 minutos para entregar os 4 J/cm² que o laser do INCA punha em cada ponto da boca, e mais de uma hora para a dose mediana dos estudos de pele com LED. Um painel a 15 cm entrega 31 a 54 J/cm² em 10 minutos [S], e passa da dose que piorou as feridas dos camundongos antes do tempo que muitos fabricantes recomendam.

A irradiância da caixa também costuma ser maior que a medida. Em cinco painéis populares medidos a 15 cm com espectrômetro, a irradiância ficou de 33% a 57% abaixo da anunciada [S]. Os sites que fizeram as medidas são afiliados às marcas, que doaram os painéis e pagaram os testes. Parte da diferença vem do método do fabricante, que às vezes mede com o sensor encostado no LED ou com um medidor feito para o sol, que superestima a luz de LED [S]. Os poucos testes revisados por pares apontam na mesma direção. Num estudo de bancada com cinco aparelhos de LED de uso doméstico, a potência oscilou durante o uso, e os autores concluíram que as instruções de dose dos fabricantes não permitem entregar uma dose precisa (Cronshaw e colegas, 2025). Uma análise de quatro máscaras cosméticas de 2026 encontrou grande variação no espectro e notou que a maioria não publica a irradiância [S].

A distância muda a dose mais do que parece, e de um jeito que contraria a regra da escola. Um painel foi medido a 15 cm, e você se afasta para 30 cm. Escolha quanto da luz você acha que sobra:

> **WIDGET l09 · `longe-do-painel`**
> **Título:** Quanto da luz de um painel sobra quando você se afasta
> **Instrução:** Escolha quanto sobra a 30 cm e veja a resposta nas três curvas. Depois compare, embaixo, o número de cada caixa com o medido.
> **Tipo:** palpite em HTML, depois SVG estático com dois painéis.
> **Referência:** as comparações de modelo e medida da *Bloomberg Graphics*; os gráficos de halteres (dumbbell) do *Financial Times* para "prometido contra entregue".
> **O que mostra:** estado inicial, uma pessoa vestida de perfil diante de um painel de 30 × 90 cm, em proporção real, a 15 cm e depois a 30 cm, com três botões: "cerca de metade", "um quarto" e "um oitavo". Ao escolher, o painel 1 se revela. **Painel 1:** eixo x de distância de 5 a 120 cm, eixo y em porcentagem da luz medida a 15 cm. Três curvas do modelo do dossiê [S], com rótulo direto: "uma lâmpada pequena, um ponto" (inverso do quadrado: 900% a 5 cm, 25% a 30 cm, 6% a 60 cm, 2% a 120 cm), em cinza; "painel grande" (137%, 59%, 25%, 8%), em `--rubi`; "painel com lentes de 60°" (106%, 76%, 41%, 15%), em `--infra` tracejado. Duas barras verticais de medida real nos pontos de 15 e 30 cm, "52 a 90 mW/cm²" e "23 a 55 mW/cm²" [S], com o rótulo "a medida cai para cerca de 50% a 60%". Uma chamada: "10 min a 15 cm: 31 a 54 J/cm². 10 min a 60 cm: cerca de um quarto disso" [S]. **Painel 2, a caixa e o medidor:** cinco halteres horizontais, um por painel, com o ponto vazio no anunciado e o cheio no medido: PlatinumLED BIOMAX 900, 135 → 90,3 (−33%); Hooga PRO1500, 189 → 86 (−54%); Bestqool Pro100, cerca de 90 a 109 (medido a 7,5 cm) → 51,7 (−43%); Joovv Solo 3.0, mais de 100 → 59,2 (−41%); Mito MitoPRO 1500X, mais de 160 → 68 (−57%). Selo bem visível: "medições de sites afiliados às marcas; não há teste independente revisado por pares de painéis de corpo inteiro".
> **Leitura:** Perto de um painel grande, a luz cai devagar, e de 15 para 30 cm sobra cerca de metade em vez do quarto que a regra do inverso do quadrado prevê. Longe dele, a queda acelera, e em cinco painéis medidos a luz a 15 cm ficou de um terço a mais da metade abaixo do número da caixa.
> **Interação:** um palpite antes da revelação, com três opções. A interação ensina por previsão: quem lembra da física da escola escolhe "um quarto", a resposta certa para uma lâmpada pequena e errada para um painel grande perto do corpo. A etiqueta diz qual curva corresponde à escolha. Botão `ver sem palpitar`. Depois, estático.
> **Motion:** ao escolher, a pessoa recua de 15 para 30 cm em 450 ms e o cone de luz em meio-tom de rubi clareia; em seguida as três curvas se desenham (900 ms) e os halteres crescem do ponto anunciado ao medido.
> **Risograph:** o painel e a pessoa em duas tintas com proporções reais (painel de 90 cm de altura, pessoa de 1,70 m), o cone de luz em retícula de rubi que fica mais aberta com a distância.
> **Celular/acessibilidade:** os botões empilham; o painel 1 ocupa a largura com 260 px de altura; os halteres viram cinco linhas com os dois números escritos. Teclado nos botões; `aria-live` anuncia o resultado. Tabela equivalente com as três curvas e os cinco painéis.
> **Legenda:** Curvas: cálculo do dossiê para um painel uniforme de 30 × 90 cm, normalizado a 15 cm [S]. Medidas a 15 e 30 cm: Light Therapy Insiders, LightTherapyIQ e LightLab International (2026), com afiliação declarada às marcas [S]. As duas medições usaram métodos diferentes.

A regra do inverso do quadrado, em que dobrar a distância divide a luz por quatro, vale para uma fonte pequena. Um painel de 90 cm visto de perto se comporta como uma parede de luz, e só a distâncias maiores que o próprio painel a queda se aproxima da regra [S]. As medidas a 15 e 30 cm caíram para cerca de 50% a 60%, perto do modelo do painel grande. Mesmo assim, ficar a 60 cm em vez de 15 cm divide a dose por cerca de quatro [S], e as instruções de uso raramente dizem a que distância ficar.

---

## 08 · O sol

### Dez minutos de sol do meio-dia entregam mais luz vermelha e infravermelha que a dose de muitos estudos, com ultravioleta junto

O sol emite em todo o espectro, e uma parte grande dessa luz cai na mesma faixa dos aparelhos. Ao meio-dia, com céu limpo, numa latitude média, o espectro de referência usado em engenharia solar soma cerca de 100 mW/cm², e cerca de 40 mW/cm² ficam entre 600 e 1.000 nm, o vermelho e o infravermelho próximo, segundo a conta do dossiê sobre a tabela ASTM G173 [S]. É mais que a máscara do ensaio controlado e fica entre metade e três quartos de um painel a 15 cm. O gráfico abaixo divide a luz de cada fonte por faixa:

> **WIDGET l10 · `o-sol`**
> **Título:** Quanta luz vermelha, infravermelha e ultravioleta o sol, um painel, uma máscara e uma lâmpada entregam
> **Instrução:** Compare a fatia vermelha e ameixa de cada fonte e depois o tempo de cada uma para chegar a 10 J/cm², à direita.
> **Tipo:** SVG estático, barras empilhadas por faixa de comprimento de onda, uma linha por fonte, na mesma escala.
> **Referência:** as barras empilhadas de matriz energética do *Our World in Data*; o espectro solar anotado de "Lights and Shadows", de Bartosz Ciechanowski.
> **O que mostra:** em cima, o espectro do sol ao meio-dia (ASTM G173, 280 a 1.400 nm), com a área de 600 a 1.000 nm pintada em `--rubi` até 700 nm e em `--infra` com hachura depois, e, na mesma escala, o espectro de um painel de LED como dois picos estreitos em 660 e 850 nm. Embaixo, uma barra por fonte, em mW/cm², dividida em ultravioleta (cinza escuro com hachura), visível abaixo de 600 nm (cinza), 600 a 1.000 nm (rubi e ameixa) e acima de 1.000 nm, que vira calor (cinza claro): **sol ao meio-dia**, UV 4,6, visível de 400 a 600 nm cerca de 29, 600 a 1.000 nm 40,3, acima de 1.000 nm 26,0 [S]; **painel a 15 cm**, 52 a 90 só na faixa de 600 a 1.000 nm, UV zero [S]; **máscara de ensaio controlado**, até 10, UV zero; **lâmpada incandescente de calor**, só 15% a 18% da luz entre 600 e 1.000 nm e 80% a 84% acima de 1.000 nm [S], como proporção, sem valor absoluto. Duas chamadas sobre a barra do sol: "650 a 670 nm, a faixa de um LED de 660: só 2,8 mW/cm²" e "800 a 870 nm, a faixa de um LED de 850: 6,8 mW/cm²" [S]. Coluna da direita, o tempo para chegar a 10 J/cm² em 600 a 1.000 nm: sol, cerca de 4 min; painel a 15 cm, 2 a 3 min; máscara de 10 mW/cm², cerca de 17 min [S, cálculo]. Uma nota sobre a sauna: "a sauna finlandesa e a de infravermelho distante emitem quase tudo acima de 3.000 nm, fora da faixa" [S].
> **Leitura:** Ao meio-dia, o sol entrega cerca de 40 mW/cm² entre 600 e 1.000 nm, mais que uma máscara e entre metade e três quartos de um painel a 15 cm. O sol espalha essa luz por uma faixa larga e traz ultravioleta junto, enquanto o LED concentra tudo em dois picos estreitos e não tem ultravioleta.
> **Interação:** nenhuma, infográfico.
> **Motion:** a área de 600 a 1.000 nm se acende no espectro do sol (450 ms); as barras crescem da esquerda, uma fonte por vez.
> **Risograph:** um sol, uma janela de escritório e uma máscara, pequenos, em duas tintas, na margem esquerda de cada linha.
> **Celular/acessibilidade:** uma fonte por cartão, com a fatia de 600 a 1.000 nm alinhada na mesma coluna em todos; o espectro de cima ocupa a largura com 180 px de altura. Tabela equivalente com as faixas de cada fonte.
> **Legenda:** Espectro de referência ASTM G173-03 (céu limpo, latitude média, superfície inclinada a 37°), integrado pelo dossiê [S]; no verão brasileiro ao meio-dia o total pode passar de 100 mW/cm², e com nuvens cai muito. Painel: medições de revisores com afiliação [S]. Lâmpada e sauna: lei de Planck, cálculo do dossiê [S]. Máscara: ensaio coreano (PMC11835066).

**[destaque]** Dez minutos de sol forte entregam cerca de 24 J/cm² de vermelho e infravermelho próximo [S], mais do que a dose de muitos estudos com aparelho.

A comparação muda com o recorte. Contando só a faixa estreita de um LED, o sol fica fraco, porque entre 650 e 670 nm ele entrega 2,8 mW/cm², enquanto um painel entrega dezenas [S]. Grimes (2025) converteu as doses dos 27 estudos de pele com LED em tempo de sol contando só a faixa de cada LED e achou de 36 segundos a 19 horas, com mediana de 3,3 horas. Os dois recortes são legítimos, e o que nenhum estudo mediu é se a luz larga do sol produz os mesmos efeitos que a luz estreita do LED [S]. O sol também traz ultravioleta, cerca de 4,6 mW/cm² ao meio-dia [S], e é o ultravioleta que queima a pele e causa câncer de pele. Por isso uma hora ao sol do meio-dia queima a pele, e uma hora sob um LED vermelho sem ultravioleta não queima. Quem quer a luz vermelha do sol recebe junto o ultravioleta, e o protetor solar continua necessário.

A sauna fica fora da comparação. A sauna finlandesa e a de infravermelho distante aquecem por ar quente e por radiação acima de 3.000 nm, e quase nada da energia delas cai entre 600 e 1.000 nm [S]. As saunas de "infravermelho próximo" com lâmpadas incandescentes põem só 15% a 18% da luz nessa faixa, e a maior parte vira calor [S].

---

## 09 · Segurança

### Na pele, a luz vermelha causa poucos problemas, e os riscos sérios estão nos olhos, sobretudo nos aparelhos de miopia para crianças

Na dose dos estudos, a luz vermelha esquenta a pele pouco. Com laser de 635 e 808 nm entregando de 6 a 12 joules, a pele aqueceu de 0,7 a 1,6 °C, e os voluntários não perceberam (Souza-Barros e colegas, 2018). O consenso de especialistas de 2025 concluiu que a fotobiomodulação é segura em adultos e que a luz vermelha não causa dano ao DNA, ao contrário do ultravioleta (Maghfour e colegas). Os problemas de pele que aparecem nos registros vêm sobretudo da combinação com outros tratamentos. No MAUDE, o sistema em que a FDA recebe relatos de problemas com aparelhos, há 109 relatos para as máscaras de rugas. Nos 100 que o dossiê leu, a palavra "eye" (olho) aparece em 38 e "burn" (queimadura) em 27, e 66 são de um só modelo, a Shark CryoGlow, que junta LED e resfriamento. Um dos relatos descreve rash, queimadura e bolhas depois de usar a máscara sobre pele tratada com tretinoína, um ácido para acne e rugas. Esses relatos são voluntários e não provam causa, e servem para mostrar o tipo de problema.

A cor da pele muda a conta. A melanina absorve parte da luz antes que ela chegue à derme, e pela simulação do dossiê uma pele escura perderia cerca de metade da luz de 630 e 660 nm só na camada de cima, enquanto o infravermelho perderia menos [S]. Com doses acima das tabelas da WALT, um laser de 810 nm e 200 mW gerou de 3 a 6 vezes mais calor em pele escura do que em pele clara e chegou a aquecer a pele em 22,3 °C. Dos 13 participantes de pele escura, 8 pediram para parar por desconforto (Joensen e colegas, 2011). Nas doses da WALT, o aquecimento ficou abaixo de 1,5 °C em todos os tons. Zakia Rahman, dermatologista de Stanford, lembrou à NPR que a luz visível pode estimular pigmento, mais com as cores curtas, e que o uso excessivo pode piorar manchas como o melasma, mais comuns em peles negras e pardas [S]. As tabelas de dose da WALT foram calibradas em pele branca, e no ensaio que levou à autorização do Valeda nenhum paciente não branco recebeu o tratamento.

Os olhos são o ponto fraco, porque a retina recebe a luz focada pela lente do olho. Muitas máscaras e painéis vêm com óculos de proteção na caixa [S], e a Neutrogena recolheu em 2019 uma máscara de acne de luz azul por risco teórico para quem tinha certas doenças de olho ou tomava remédios que aumentam a sensibilidade à luz [S]. O caso mais sério é o da miopia infantil, em que a luz é apontada de propósito para a retina de crianças. Em 2026, Ostrin e Schill, da Universidade de Houston, mediram quatro aparelhos de miopia, todos com sessões de 3 minutos, e calcularam o tempo até cada um passar do limite de exposição segura das normas americanas:

> **WIDGET l11 · `segundos-ate-o-limite`**
> **Título:** Em quantos segundos cada aparelho de miopia passa do limite seguro para a retina, numa sessão de 3 minutos
> **Instrução:** Compare cada barra com a linha da sessão de 180 segundos. As barras que terminam antes dela passam do limite durante a sessão.
> **Tipo:** SVG estático, barras horizontais num eixo de tempo logarítmico.
> **Referência:** os gráficos de escala logarítmica com marcos do cotidiano de "The Scale of the Universe"; os gráficos de segurança de produto da *Consumer Reports*.
> **O que mostra:** eixo x de tempo em escala logarítmica, de 1 segundo a 10 horas, com marcos em Space Mono: "1 s", "1 min", "1 h". Uma linha vertical em tinta em 180 s, rotulada "a sessão recomendada: 3 minutos". Quatro barras, cada uma até o tempo em que o aparelho passa do limite do grupo 1 da norma ANSI (pupila de 7 mm): Eyerising, 1,4 s; Sky-n1201a, 2,8 s; Future Vision, 253 s [S]; AirDoc (LED difuso), 22.761 s, cerca de 6 horas e 19 minutos. As duas primeiras em `--rubi`, com a conta escrita: "a sessão dura cerca de 130 vezes o tempo até o limite" e "cerca de 64 vezes". As duas últimas em cinza, terminando depois da linha da sessão. Sob as barras, três fichas com data: "2023 · menina de 12 anos perde visão nos dois olhos depois de 5 meses de uso, com lesão nos fotorreceptores; recupera parte em 3 meses" (Liu et al., *JAMA Ophthalmol*); "2024 · a China passa os aparelhos à classe de risco mais alta, só para crianças de 8 anos ou mais e proíbe o uso preventivo" [S]; "EUA · a luz vermelha para miopia não é aprovada, segundo a Academia Americana de Oftalmologia" [S].
> **Leitura:** Dois dos quatro aparelhos de miopia passaram do limite de segurança da retina em menos de 3 segundos, numa sessão de 3 minutos. O aparelho de LED difuso levou mais de 6 horas, e a diferença entre eles é o tipo de luz que chega ao olho.
> **Interação:** nenhuma, infográfico.
> **Motion:** as barras crescem da esquerda ao entrar na tela (900 ms), e a linha da sessão aparece antes delas, para que as duas primeiras sejam vistas parando cedo.
> **Risograph:** um corte do olho com proporção real (cerca de 24 mm de diâmetro), com o feixe em rubi entrando pela pupila e focando na retina, e um par de óculos de proteção ao lado, na margem esquerda.
> **Celular/acessibilidade:** as barras ocupam a largura com o eixo logarítmico mantido; os rótulos ficam acima de cada barra; as fichas empilham. Tabela equivalente com aparelho, tempo até o limite e razão em relação à sessão.
> **Legenda:** Ostrin e Schill (*JAMA Ophthalmology*, 2026), teste de bancada financiado pelo National Eye Institute; o tempo da Future Vision vem da cobertura da Healio (30/06/2026) [S]. Ostrin et al. (2024), que mediu 7,2 W/cm² na retina com o Sky-n1201a. Liu et al. (*JAMA Ophthalmol*, 2023). Regulação chinesa conforme Wang, Wang e Wong (*JAMA Ophthalmol*, 2025) [S]. As razões da sessão pelo tempo até o limite são contas do roteiro.

**[destaque]** Dois aparelhos vendidos para frear a miopia de crianças passaram do limite seguro para a retina em menos de 3 segundos, e cada sessão dura 3 minutos.

A Eyerising, cuja direção médica é de Mingguang He, autor sênior de vários dos ensaios de miopia, respondeu que mais de 110 mil crianças foram tratadas sem lesão permanente confirmada da retina quando o protocolo foi seguido, e que as normas foram feitas para exposição acidental [S]. Ostrin chamou a resposta de justa e incompleta, porque uma lesão sutil da retina pode não aparecer num exame de rotina [S]. O grande ensaio de 2022 não relatou eventos graves, e o caso da menina de 12 anos é um relato isolado. O efeito sobre o crescimento do olho aparece nos ensaios, e a segurança desses aparelhos ainda não foi resolvida.

Outros cuidados têm menos dados. Remédios que aumentam a sensibilidade à luz, como tetraciclinas, isotretinoína e tretinoína, aparecem nas listas de cautela dos fabricantes [S]. Sobre tumores, a recomendação comum é não aplicar luz sobre um tumor conhecido sem falar com o oncologista, e o dado mais tranquilizador é o do ensaio do INCA [S]. Gravidez e a luz sobre a tireoide não foram estudadas, e nenhuma sociedade médica afirma risco ou ausência de risco [NV].

---

## 10 · Antes de comprar

### Um aparelho de luz vermelha só faz sentido para os usos dos degraus de cima, com a luz e os minutos que os estudos usaram

A maioria das máscaras vendidas como aprovadas pela FDA foi apenas liberada por ela. A liberação 510(k) exige que o fabricante mostre que o aparelho é parecido com outro já vendido legalmente, e pode sair com testes de bancada, sem ensaio clínico de eficácia. A própria FDA diz que a liberação não significa aprovação e que dizer "aprovado pela FDA" nesse caso engana o consumidor [S]. A autorização De Novo cria uma categoria nova para aparelhos de risco baixo a moderado e exige estudo clínico, como o do Valeda. A aprovação PMA, a mais exigente, pede prova de segurança e eficácia, e o dossiê não encontrou nenhum aparelho de fotobiomodulação aprovado por essa via [S]. No Brasil, a Anvisa classifica os aparelhos de luz com finalidade terapêutica ou estética como produtos para saúde, em classes de risco de I a IV, e não publicou alerta específico sobre máscaras de LED sem registro [S]:

> **WIDGET l12 · `os-selos`**
> **Título:** O que cada selo da FDA e da Anvisa garante sobre um aparelho de luz vermelha
> **Instrução:** Leia cada cartão de cima para baixo, do que o fabricante precisou mostrar até a frase que o anúncio deveria usar.
> **Tipo:** HTML estático, quatro cartões em grade.
> **Referência:** os quadros comparativos de regulação da *ProPublica*; as etiquetas de "o que significa e o que não significa" dos guias de consumo da *Which?*.
> **O que mostra:** quatro cartões com a mesma estrutura de quatro linhas: o que o fabricante precisou mostrar; um exemplo de luz vermelha; quantos existem; a frase honesta para o anúncio. **510(k), liberado ("cleared"):** "semelhança com um aparelho já vendido; testes de bancada, às vezes sem ensaio clínico"; exemplos, máscaras de rugas (código OHS, 166 liberações), máscaras de acne (OLP, 51), pentes e capacetes de cabelo (OAP, 116), lâmpadas de calor para dor (ILY, 229) e lasers para dor (NHN, 54); "liberado pela FDA para venda como semelhante a outro aparelho". **De Novo, autorizado:** "aparelho novo de risco baixo a moderado, com estudo clínico"; Valeda para degeneração macular seca, 4/11/2024; "autorizado pela FDA com um ensaio clínico". **PMA, aprovado ("approved"):** "prova de segurança e eficácia em ensaios clínicos"; "nenhum aparelho de fotobiomodulação encontrado" [S]; a frase fica vazia. **Anvisa, registrado ou notificado:** "classificado por risco, de I a IV; notificação ou registro conforme a classe" [S]; "consulte o número no site da Anvisa antes de comprar". No topo de cada cartão, um carimbo em riso: "CLEARED", "DE NOVO", "APPROVED", "ANVISA". Uma faixa de rodapé com três casos de anúncio corrigido: ASA, Reino Unido, 5/11/2025, proíbe anúncios de máscaras que prometiam tratar acne e rosácea [S]; NAD, EUA, 2019, a Zero Gravity não comprovou "91% viram melhora em uma semana"; FTC, EUA, 2020, acordo de 22 milhões de dólares com a Willow Curve, que se dizia aprovada pelo governo [S].
> **Leitura:** Quase toda máscara anunciada como aprovada pela FDA foi só liberada, o que quer dizer que ela é parecida com outra já vendida. A liberação diz pouco sobre se o aparelho entrega a dose de algum estudo.
> **Interação:** nenhuma, infográfico.
> **Motion:** os carimbos caem sobre os cartões um de cada vez, com uma escala de 1,08 que volta em 180 ms.
> **Risograph:** os quatro carimbos de borracha em rubi com desregistro, como se impressos no papel; o resto nítido.
> **Celular/acessibilidade:** os quatro cartões empilham, com o carimbo no topo de cada um. Texto equivalente em lista.
> **Legenda:** FDA, base openFDA de classificação e 510(k), consulta de 14/11/2026; FDA DEN230083. Pure Global, sobre "cleared", "granted" e "approved" [S]. Anvisa, RDC 751/2022 e Nota Técnica GQUIP 002/2017 [S]. ASA, 05/11/2025 [S]; BBB National Programs, NAD, 11/12/2019; FTC, Willow Curve, 2020 [S].

David Ozog, dermatologista do Henry Ford Health, disse à NPR que a liberação mostra que muitos aparelhos são seguros, e não que funcionam, e que ele testou aparelhos que não emitiam luz suficiente para ter efeito [S]. Por isso a caixa importa mais que o selo. O cartão abaixo reúne o que o ensaio mostrou numa ficha para o aparelho que você tem ou quer comprar. Se você digitou os números da sua caixa na seção 07, eles já estão preenchidos:

> **WIDGET l13 · `antes-de-comprar`**
> **Título:** A etiqueta do seu aparelho, preenchida com o que os estudos dizem
> **Instrução:** Escolha o uso que você quer e complete os campos da caixa. A etiqueta devolve o degrau de evidência do uso, os minutos para a dose dos estudos e os avisos que valem para o seu caso.
> **Tipo:** HTML com formulário curto e SVG para a etiqueta, com exportação em PNG.
> **Referência:** o cartão final do ensaio do cortisol; as etiquetas de eficiência energética, pelo formato de ficha técnica.
> **O que mostra:** cinco perguntas, uma por linha: (1) "para que você quer", com a lista dos usos do l05; (2) "comprimento de onda da caixa", com as opções 630 a 670 nm, 810 a 850 nm, os dois, azul (415 nm), não informado; (3) "irradiância e distância da medida", lidas de `DN.store` (`rs_luz_aparelho`) quando existirem; (4) "minutos por sessão que o fabricante manda"; (5) "o selo da caixa", com 510(k), De Novo, registro na Anvisa, "aprovado pela FDA" e nenhum. A etiqueta devolvida tem quatro blocos: **o degrau** do uso escolhido, com o número principal da ficha do l05; **a dose**, com os minutos da caixa convertidos em J/cm² e o tempo para 4 e 40,5 J/cm², com a ressalva da seção 04; **os avisos**, que aparecem só quando se aplicam: "uso nos degraus de baixo: nenhum aparelho resolve o que os estudos não mostraram"; "irradiância não informada: não dá para saber a dose"; "a caixa diz aprovado pela FDA: confira se é 510(k)"; "luz perto dos olhos: use os óculos da caixa, e procure o oftalmologista se tiver doença de retina ou tomar remédio que aumenta a sensibilidade à luz"; "uso em criança para miopia: só com oftalmologista, e o aparelho de laser pode passar do limite seguro em segundos"; "pele tratada com ácido ou retinoide: os relatos de queimadura vêm dessa combinação"; "pele com melasma: a luz visível pode escurecer manchas"; **o preço por dose**, quando o leitor informa o preço e o número de sessões. Os campos sem resposta aparecem como "não informado", no mesmo formato da caixa.
> **Leitura:** Se o uso que você quer está nos degraus de baixo da escada, nenhum aparelho resolve. Se está nos de cima, procure a irradiância na caixa e os minutos que ela precisa para chegar à dose dos estudos, e trate a falta desse número como um sinal de que a dose é desconhecida.
> **Interação:** um formulário curto cujo resultado depende do aparelho do leitor. A interação ensina porque junta, para um aparelho concreto, as três perguntas que o ensaio separou: para que serve, quanta luz entrega e o que pode machucar. A etiqueta fica em `DN.store` (`rs_luz_etiqueta`) e exporta um PNG em duas tintas para guardar.
> **Motion:** cada bloco da etiqueta se imprime em 180 ms quando a pergunta correspondente é respondida.
> **Risograph:** a etiqueta inteira impressa em duas tintas, como o rótulo técnico colado numa caixa de papelão, com grão e desregistro; os números ficam nítidos.
> **Celular/acessibilidade:** uma pergunta por tela, com botões de 48 px; a etiqueta ocupa a largura e o PNG sai em retrato. Rótulos e resultado com `aria-live`. Funciona sem o l08 preenchido.
> **Legenda:** Degraus: l05 e o dossiê de evidência clínica. Doses: seção 04 e l08. Avisos: Ostrin e Schill (2026); MAUDE/FDA; Rahman, à NPR (13/04/2026) [S]; recall da Neutrogena (2019) [S]. A etiqueta resume os estudos citados no ensaio e não substitui consulta médica.

A máscara que fez as buscas baterem recorde em abril de 2026 trabalha com a física certa, porque emite vermelho e infravermelho próximo dentro da faixa que a pele deixa passar. A luz dela age nos primeiros milímetros da pele, em doses que quase nenhuma caixa informa de um jeito conferível, para usos que ficam nos degraus de baixo da escada. A mesma física, num laser de 660 nm com protocolo de hospital, baixou as feridas graves na boca de cerca de 40 para cerca de 6 em cada 100 pacientes de cabeça e pescoço no ensaio do INCA, e no Brasil esse tratamento entrou na tabela do SUS em 2025 [S].

---

## Glossário

Termos para marcar com popup (`.gl`) na primeira vez que aparecem. Siglas que o texto evita ficam aqui para quem quiser o nome técnico.

**Luz e física**
- **fotobiomodulação (PBM)**: uso de luz vermelha ou infravermelha de baixa potência para mudar o funcionamento das células sem aquecer o tecido.
- **laserterapia de baixa potência (LLLT)**: o nome antigo da fotobiomodulação, de quando quase todos os aparelhos eram laser.
- **terapia de luz vermelha**: o nome popular da fotobiomodulação nos anúncios e nas redes.
- **comprimento de onda**: a medida que define a cor da luz, em nanômetros.
- **nanômetro (nm)**: um milionésimo de milímetro.
- **infravermelho próximo**: luz logo acima do vermelho, de 700 a cerca de 1.100 nm, que o olho não enxerga.
- **infravermelho distante**: luz de comprimento de onda bem mais longo, que a pele sente como calor; é a das saunas.
- **ultravioleta (UV)**: luz abaixo do violeta, invisível, que bronzeia, queima e pode causar câncer de pele.
- **LED**: componente eletrônico que emite luz numa faixa estreita de cores; é a fonte das máscaras e painéis.
- **laser**: fonte que concentra a luz num feixe estreito e de uma cor só; nos consultórios, entrega muita luz num ponto pequeno.
- **irradiância (mW/cm²)**: quanta luz chega a cada centímetro quadrado de pele a cada segundo.
- **dose ou fluência (J/cm²)**: a luz acumulada por centímetro quadrado; é a irradiância multiplicada pelo tempo.
- **joule (J)**: unidade de energia; um watt durante um segundo.
- **miliwatt (mW)**: um milésimo de watt, a unidade de potência.
- **inverso do quadrado**: regra em que dobrar a distância de uma fonte pequena divide a luz por quatro.
- **janela óptica**: a faixa de cerca de 650 a 950 nm em que o sangue e a água absorvem pouco e a luz entra mais fundo no tecido.
- **espectro**: a distribuição da luz de uma fonte pelas cores.
- **espectro de ação**: o gráfico do efeito biológico da luz em cada comprimento de onda.
- **espectrômetro**: aparelho que mede quanta luz uma fonte emite em cada comprimento de onda.
- **ASTM G173**: espectro de referência do sol ao meio-dia com céu limpo, usado em engenharia solar.

**Corpo e célula**
- **epiderme**: a camada de fora da pele, com cerca de um décimo de milímetro.
- **derme**: a camada da pele abaixo da epiderme, onde ficam o colágeno e os vasos.
- **melanina**: o pigmento que dá cor à pele e absorve luz, mais a de cores curtas.
- **hemoglobina**: a proteína do sangue que carrega oxigênio e absorve muito o azul e o verde.
- **mitocôndria**: a estrutura da célula que usa oxigênio para produzir energia.
- **ATP**: a molécula em que a célula guarda a energia que vai usar.
- **citocromo c oxidase**: a última enzima da cadeia de respiração da mitocôndria, apontada como a principal molécula que absorve a luz vermelha.
- **óxido nítrico**: gás produzido pelo corpo que dilata vasos e pode frear a respiração da mitocôndria.
- **espécies reativas de oxigênio**: moléculas instáveis de oxigênio que em pequena quantidade ativam defesas da célula e em grande quantidade causam dano.
- **cultura de células**: células mantidas vivas numa placa de laboratório, fora do corpo.
- **resposta bifásica**: o padrão em que pouca luz não faz efeito, uma dose intermediária ajuda e luz demais anula ou piora.
- **hormese**: o nome geral do padrão em que um estímulo fraco ativa e um forte inibe.
- **fibroblasto**: célula da pele que fabrica colágeno.
- **colágeno**: a proteína que dá firmeza à pele.
- **retina**: a camada do fundo do olho que transforma luz em sinal nervoso.
- **fotorreceptores**: as células da retina que captam a luz.

**Doenças e usos**
- **mucosite oral**: feridas na boca e na garganta causadas pela quimioterapia e pela radioterapia.
- **transplante de células-tronco hematopoéticas (TCTH)**: o transplante de medula óssea, feito em alguns cânceres do sangue.
- **alopecia androgenética**: a calvície de padrão masculino e feminino, ligada a hormônios e herança.
- **minoxidil**: remédio aplicado no couro cabeludo contra a calvície.
- **artrose**: desgaste da cartilagem das articulações, comum no joelho.
- **tendinopatia**: dor e lesão de tendão por esforço repetido.
- **fascite plantar**: inflamação do tecido da sola do pé, que dói ao pisar.
- **degeneração macular relacionada à idade (DMRI)**: perda da visão central comum depois dos 60 anos; na forma seca, o centro da retina se desgasta devagar.
- **atrofia geográfica**: a fase avançada da DMRI seca, com áreas da retina que morrem.
- **miopia**: dificuldade de ver de longe, que piora quando o olho cresce demais no comprimento.
- **comprimento axial**: a medida do olho da frente ao fundo; na criança míope, quanto mais cresce, pior a miopia.
- **RLRL**: luz vermelha repetida de baixa intensidade, o tratamento de miopia com aparelho de mesa.
- **letras da tabela**: a medida de visão dos ensaios de olho; uma linha da tabela tem cinco letras.
- **úlcera de pé diabético**: ferida crônica no pé de quem tem diabetes.
- **úlcera venosa**: ferida crônica na perna causada por má circulação nas veias.
- **neuropatia periférica**: lesão dos nervos dos pés e das mãos, com dor e dormência.
- **dermatite da radioterapia**: a irritação da pele causada pela radioterapia.
- **síndrome da boca ardente**: dor crônica de queimação na boca sem lesão visível.
- **fibromialgia**: dor crônica espalhada pelo corpo, com fadiga.
- **tireoidite de Hashimoto**: inflamação autoimune da tireoide que leva ao hipotireoidismo.
- **levotiroxina**: o hormônio da tireoide em comprimido.
- **terapia fotodinâmica**: tratamento que junta luz e um remédio aplicado na pele que reage à luz.
- **tretinoína e isotretinoína**: remédios derivados da vitamina A para acne e rugas, que deixam a pele mais sensível.
- **fotossensibilizante**: remédio ou substância que aumenta a reação da pele ou do olho à luz.
- **melasma**: manchas escuras no rosto, mais comuns em mulheres e em peles negras e pardas.

**Estudos e estatística**
- **ensaio clínico randomizado**: estudo em que o sorteio decide quem recebe o tratamento e quem recebe o controle.
- **luz falsa (sham)**: aparelho igual ao verdadeiro que acende sem entregar a luz ativa, usado como placebo.
- **placebo**: tratamento sem efeito ativo, usado para comparar.
- **duplo-cego**: estudo em que nem os participantes nem os avaliadores sabem quem recebeu o quê.
- **meta-análise**: estudo que junta os resultados de vários estudos para estimar um efeito médio.
- **revisão guarda-chuva (umbrella review)**: revisão que junta várias meta-análises.
- **revisão Cochrane**: revisão sistemática feita com o método da Colaboração Cochrane, referência em medicina.
- **diferença padronizada (SMD, g)**: a distância entre dois grupos medida em desvios padrão; 0,2 é pequena e 0,8 é grande.
- **risco relativo (RR)**: a razão entre o risco de dois grupos; 0,37 quer dizer pouco mais de um terço do risco.
- **escala visual analógica (EVA)**: régua de dor de 0 a 100 mm em que o paciente marca quanto dói.
- **diferença mínima perceptível**: a menor mudança que um paciente sente; na dor, de 10 a 20 mm na escala de 0 a 100.
- **intervalo de confiança**: a faixa de valores compatíveis com os dados; quando cruza o zero, o efeito pode não existir.
- **certeza da evidência (GRADE)**: o grau de confiança num resultado, de muito baixa a alta.

**Regulação e segurança**
- **FDA**: a agência americana que regula remédios, alimentos e aparelhos médicos.
- **510(k)**: a liberação da FDA para um aparelho parecido com outro já vendido; o anúncio diz "cleared".
- **De Novo**: a autorização da FDA para um aparelho novo de risco baixo a moderado, com estudo clínico.
- **PMA**: a aprovação mais exigente da FDA, com prova de segurança e eficácia; o anúncio diz "approved".
- **MAUDE**: a base pública em que a FDA recebe relatos de problemas com aparelhos médicos.
- **Anvisa**: a agência brasileira que regula remédios e produtos para saúde.
- **NICE**: a agência britânica que escreve as diretrizes do sistema público de saúde.
- **MASCC/ISOO**: a sociedade internacional de cuidados de suporte em câncer e de oncologia oral, que publica a diretriz de mucosite.
- **WALT**: a associação mundial de laserterapia, que publica tabelas de dose e promove a técnica.
- **ANSI e IEC 62471**: normas americana e internacional que definem limites seguros de luz para os olhos e a pele.
- **limite de exposição**: a quantidade máxima de luz que uma norma considera segura para um tecido num dado tempo.
- **ASA**: a autoridade britânica de publicidade, que pode proibir anúncios enganosos.
- **FTC**: a agência americana de defesa do consumidor, que pune propaganda enganosa.

---

## Nota de método

- A moda das máscaras abre o ensaio na seção 00 e volta só no fecho. O resto do texto trata da luz vermelha em geral, e nenhuma marca, influenciador ou aparelho é seguido ponto a ponto.
- A ordem do ensaio vai da física à célula, da célula à dose, da dose à evidência em pessoas, e só depois chega aos aparelhos, ao sol, à segurança e à compra. Assim o leitor chega à escada de evidência sabendo ler nanômetros, irradiância e dose.
- Os números de penetração vêm de voluntários vivos (bochecha e mão), de cadáveres e crânios secos e de simulações. Cadáveres não têm sangue circulando, que absorve mais luz, e por isso as porcentagens medidas neles devem ser lidas como teto. As profundidades por comprimento de onda da faixa do l02 vêm de uma simulação feita para a pesquisa deste ensaio com parâmetros médios de pele, e servem para a forma da curva.
- Os pontos de dose da seção 04 vêm de estudos com células e animais, reunidos em duas revisões de Huang e colegas (2009 e 2011). As curvas tracejadas ligam os pontos e não são ajustes estatísticos. Em pessoas, quase nenhum estudo testou várias doses do mesmo aparelho.
- A escada de evidência usa cinco degraus: diretriz recomenda, efeito moderado, sinal fraco, estudos sem efeito e nenhum estudo em pessoas. Cada uso foi classificado pela melhor evidência encontrada em ensaios com pessoas, e as fichas dizem qual é ela. Os usos com diretriz e os usos de anúncio usam aparelhos diferentes, e as fichas dizem quando o estudo foi feito com aparelho de hospital ou de casa.
- As irradiâncias de painéis vêm de sites de revisão de produtos afiliados às marcas, porque não há teste independente revisado por pares de painéis de corpo inteiro. Os testes revisados por pares citados são de aparelhos de mão, de máscaras e de aparelhos de miopia.
- Algumas contas são deste ensaio, a partir de dados publicados: os tempos de luz no estudo das feridas (dose dividida por 100 mW/cm²); os minutos de cada aparelho no l08 (dose dividida pela irradiância vezes 0,06); as doses de 10 minutos de painel, de máscara e de sol; a soma do sol entre 600 e 1.000 nm sobre o espectro de referência; as curvas de distância de um painel uniforme; a fração da luz de uma lâmpada incandescente na faixa, pela lei de Planck; a conversão de 19,9 mm para cerca de 2 pontos de 10; os 1,8 cm por local no estudo de gordura; e as razões entre a sessão de miopia e o tempo até o limite.
- Google Trends: índice relativo dentro de cada consulta, coletado em 14/11/2026 pela pytrends, com cada grupo de termos numa sessão nova para evitar a mistura de países que apareceu na pesquisa do cortisol. A série brasileira de "red light therapy" é pequena e ruidosa, e por isso o ensaio usa "laserterapia" e "LED facial" para o Brasil. FDA: base pública openFDA, códigos de produto OHS, OLP, OAP, ILY e NHN. Os relatos do MAUDE são voluntários e não provam causa.
- Itens marcados com `[S]` ou `[NV]` precisam de leitura na fonte primária antes do HTML.
- O ensaio não é orientação médica. Aparelhos de luz perto dos olhos, sobretudo em crianças, devem ser usados com acompanhamento de oftalmologista.

## Fontes principais

**Ponto de partida.** Google Trends, consultas de 14/11/2026 (`luz-vermelha-pesquisa/dados/`). openFDA, 510(k) e MAUDE, consulta de 14/11/2026. Marie Claire, sobre Kim Kardashian e as máscaras [S]. The Beauty Tech Group, resultados de 2025 [S]. Merkle et al., *Cureus* 2026 [S]. Shen e Zhao, *JMIR Dermatology* 2025 [S].

**Física e penetração.** Prahl, Oregon Medical Laser Center (hemoglobina). Hale e Querry, *Applied Optics* 1973 (água). Jacques, *Phys Med Biol* 2013. Jagdeo et al., *PLoS One* 2012. Tedford et al., *Lasers Surg Med* 2015. Ash et al., *Lasers Med Sci* 2017. Lapchak et al., 2015. Salehpour et al., 2019. ASTM G173-03 (espectro solar). Souza-Barros et al., 2018. Joensen et al., 2011.

**História e mecanismo.** Mester, Szende e Gärtner, *Radiobiol Radiother* 1968. Whelan et al., *J Clin Laser Med Surg* 2001. Anders, Lanzafame e Arany, *Photomed Laser Surg* 2015. MeSH D028022. Karu, 1999. Karu e Kolyakov, *Photomed Laser Surg* 2005. Mason, Nicholls e Cooper, *BBA* 2014. Passarella et al., *FEBS Lett* 1984. de Freitas e Hamblin, 2016. Chen et al., *PLoS One* 2011. Wang et al., 2017 e 2018. Lima et al., 2019. Quirk e Whelan, 2020.

**Dose.** Huang, Chen, Carroll e Hamblin, *Dose Response* 2009. Huang et al., *Dose Response* 2011. Demidova-Rice et al., *Photomed Laser Surg* 2007. Lanzafame et al., 2007. Sharma et al., 2011. Zein, Selting e Hamblin, 2018. WALT, tabela de doses de 2010. Grimes, *PLOS One* 2025.

**Evidência clínica.** Zadik et al., *Support Care Cancer* 2019 (MASCC/ISOO). Oberoi et al., *PLoS One* 2014. Antunes et al., *Oral Oncology* 2013 e 2017. Hu et al., *Support Care Cancer* 2026. Rodrigues et al., 2024. Lueangarun et al., 2021. Adil e Godwin, *JAAD* 2017. Chow et al., *Lancet* 2009. Stausholm et al., *BMJ Open* 2019. Naterstad et al., *BMJ Open* 2022. NICE NG226 [S]. Dutra et al., 2022. Boyer et al., *Retina* 2024. Jaffe et al., 2026. FDA DEN230083. Jiang et al., *Ophthalmology* 2022. Xie et al., 2026. Barbaric et al., Cochrane 2016. Wunsch e Matuschka, *Photomed Laser Surg* 2014. Li et al., 2018. Rasul et al., 2026. Jackson et al., 2009. Elm et al., 2011. Chun et al., 2025. Seok et al., 2026. Zhao et al., 2012. Höfling et al., *Lasers Med Sci* 2013. Son et al., *Syst Rev* 2025. Maghfour et al., *JAAD* 2025.

**Aparelhos.** Cronshaw et al., *Dentistry Journal* 2025. Baeza-Moyano, Bernardez e Sola, *Photochem Photobiol Sci* 2026 [S]. Ensaio coreano de máscara LED (PMC11835066). Lab Muffin, "The science of red light masks" (2025) [S]. LightTherapyIQ e Light Therapy Insiders, com afiliação declarada [S]. NPR, "Is red light therapy healthy or all hype", 13/04/2026 [S].

**Segurança e regulação.** Ostrin e Schill, *JAMA Ophthalmology* 2026. Ostrin et al., 2024. Liu et al., *JAMA Ophthalmol* 2023. Healio, 30/06/2026 [S]. Wang, Wang e Wong, *JAMA Ophthalmol* 2025 [S]. Academia Americana de Oftalmologia [S]. FDA, MAUDE. Recall da Neutrogena, AOP 2019 [S]. ASA, 05/11/2025 [S]. NAD/BBB, 2019. FTC, Willow Curve 2020 [S]. Anvisa, RDC 751/2022 [S]. Portaria SAES/MS 3.035/2025 [S].

---

## Itens a conferir antes de publicar

Ainda sem verificação na fonte primária ([NV], ou [S] usado no texto ou nos widgets):

1. Kim Kardashian e as máscaras de Natal de 2023 (Marie Claire): data e marcas.
2. CurrentBody: receita de 125,8 milhões de libras com as máscaras, os 89% da receita e o IPO de outubro de 2025, no relatório anual da The Beauty Tech Group.
3. Cureus 2026 (Merkle et al.): 132 posts, 64,4% sem credencial e 8,3% com link para estudo; ler o artigo completo.
4. Gatilho do pico de abril de 2026, que o dossiê não identificou; o texto não aponta nenhum.
5. Mester 1967: a história do experimento (o que ele queria testar, o laser de rubi fraco) em fonte primária ou numa revisão histórica confiável; a dose de "1 J/cm²" que circula não entrou no texto.
6. Whelan e os LEDs da NASA: os contratos SBIR de 1995 a 2003 e o papel de Ronald Ignatius, na página da NASA Spinoff.
7. A inferência de que os LEDs de 630, 660 e 850 nm foram escolhidos também por custo.
8. Modelo de penetração do dossiê: os parâmetros de espalhamento de Jacques 2013 usados de memória (μs' = 46 × (λ/500)^−1,421) e as profundidades da faixa do l02.
9. A inferência de 10 a 300 vezes mais luz no cérebro de camundongo, que vem da comparação de estudos diferentes; conferir a frase exata de Salehpour 2019.
10. Curva da melanina do l01 e o modelo de epiderme da seção 09 (pele escura perdendo cerca de metade do vermelho): cálculos do dossiê.
11. Painéis: irradiância medida a 15 cm (52 a 90 mW/cm²) e a 30 cm (23 a 55 mW/cm²) e a diferença de 33% a 57% em relação ao anunciado; todas vêm de sites afiliados às marcas. Procurar teste independente.
12. Máscara de 2 mW/cm² medida por um crítico do TikTok (via Lab Muffin): localizar o vídeo e o método.
13. Ensaio coreano com máscara de no máximo 10 mW/cm² (PMC11835066): ler o texto completo, já que o dossiê leu só o resumo pela busca.
14. Baeza-Moyano 2026, quatro máscaras cosméticas: ler além do resumo.
15. Sol: a integração do ASTM G173 (40,3 mW/cm² em 600 a 1.000 nm, 4,6 de UV, 26,0 acima de 1.000 nm, 2,8 em 650 a 670 e 6,8 em 800 a 870), os 24 J/cm² em 10 minutos e o tempo para 10 J/cm²; refazer a conta e confirmar que o visível de 400 a 600 nm fica em cerca de 29.
16. Lâmpada incandescente (15% a 18% na faixa) e sauna (quase nada abaixo de 3.000 nm): contas de Planck do dossiê.
17. Curvas de distância (inverso do quadrado, painel grande, lentes de 60°): modelo do dossiê; e a afirmação de que a dose cai cerca de quatro vezes de 15 para 60 cm.
18. Grimes 2025: confirmar que o mínimo de 0,01 h corresponde a 36 segundos e a frase sobre a conversão por banda.
19. Calvície: os fios por cm² de Leavitt 2009 e Kim 2013 (fora do texto, só como reserva), a comparação com o minoxidil, a liberação do HairMax K060305 em 2007 e o financiamento dos ensaios pelos fabricantes.
20. NICE NG226 (2022): o texto exato que lista o laser entre as terapias a não oferecer para artrose; NICE NG59 para lombalgia.
21. Vínculo dos autores de Chow 2009 e Stausholm 2019 com a WALT (Stausholm declara ex-presidentes; Chow, conferir).
22. Wunsch e Matuschka 2014: o vínculo de um autor com fabricante de equipamentos de luz.
23. Zerona: número da liberação 510(k) (K082609?) e a descrição "redução de circunferência".
24. Grupo da Uninove e a Multi Radiance Medical: as afiliações declaradas nos ensaios de exercício.
25. Vielight, ensaio Neuro RX Gamma (NCT03484143): status "suspenso" no ClinicalTrials.gov.
26. Sono e melatonina: a afirmação de que a luz vermelha fraca suprime menos melatonina do que a branca ou azul; buscar estudo primário.
27. Testosterona e calor nos testículos: buscar fonte primária de urologia; confirmar que nenhum ECR existe.
28. Longevidade: confirmar a ausência de ensaio com desfecho de envelhecimento.
29. Hu 2026 (mucosite com LED intraoral): financiamento.
30. SUS: Portarias SAES/MS 3.035/2025 e 3.489/2025 no Diário Oficial, e o código 03.07.05.001-7.
31. Mingguang He: declaração de conflito no ensaio de Jiang 2022.
32. Miopia: data e citação exata do caso de 2023 (Liu et al. contra Tian e Xiao); o tempo de 253 s da Future Vision e a resposta da Eyerising (110 mil crianças) na cobertura da Healio; a reclassificação chinesa e se ela vale para LED; a posição da Academia Americana de Oftalmologia.
33. Neutrogena, recall de 2019: os detalhes no comunicado oficial.
34. Remédios fotossensibilizantes: a lista vem de fabricantes; conferir numa fonte médica.
35. Tumores e luz: o estudo em camundongos com LED de 642 nm e a recomendação de não aplicar sobre tumor.
36. Gravidez e tireoide: confirmar que não há estudo nem posição de sociedade médica [NV].
37. Regulação: a frase da FDA de que "cleared" não é aprovação; a ausência de qualquer PMA de fotobiomodulação; a classificação da Anvisa (RDC 751/2022) e a ausência de alerta específico sobre máscaras; o caso da ASA de 05/11/2025; o acordo da Willow Curve com a FTC.
38. Consenso JAAD 2025 (Maghfour et al.): ler o texto completo para a lista de usos eficazes e a frase sobre DNA.
39. NPR (13/04/2026): as falas de Ozog, Rahman e Arany.
40. Nomes próprios: o texto usa só os sobrenomes que aparecem nos dossiês; conferir grafia e acrescentar primeiros nomes (Antunes, Demidova-Rice, Jagdeo, Wunsch, Ostrin, Schill) a partir dos artigos, se o texto ganhar com eles.

*Terapia de luz vermelha funciona? · ensaio interativo · dados conferidos contra as fontes listadas em `luz-vermelha-pesquisa/` · novembro de 2026*
