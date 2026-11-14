# Luz vermelha: a física e a biologia da fotobiomodulação, em números que viram gráficos

Dossiê de apoio para o ensaio interativo "Terapia de luz vermelha: hype ou não?" (estilo ciechanow.ski / The Pudding). Pesquisa feita em 14 nov 2026.

Escopo: história, mecanismos propostos (com força de evidência), física da dose, penetração no tecido por comprimento de onda, fontes de luz (laser vs LED, painéis e máscaras de consumo, distância) e escalas de comparação (sol, lanterna, sauna, calor). Fora do escopo: eficácia clínica por indicação (pele, cabelo, dor, músculo, cérebro), mercado, redes sociais, que ficam com outros dossiês.

**Legenda de confiabilidade**
- **[V]**: verificado na fonte primária (abstract, texto completo, tabela ou base de dados lidos nesta pesquisa).
- **[S]**: confirmado só em fonte secundária (revisão, imprensa, blog técnico, site com afiliação comercial) ou é conhecimento de livro-texto que não reli na fonte. Também uso [S] para cálculos meus feitos sobre dados verificados (marcados "cálculo próprio").
- **[NV]**: não verificado, de memória ou estimativa grosseira. Conferir antes de publicar.

Observação de método: abstracts lidos pela API E-utilities do NCBI (URLs `https://pubmed.ncbi.nlm.nih.gov/<PMID>/`). Textos completos lidos via PMC/Europe PMC quando abertos (Jagdeo 2012, Lapchak 2015, Ash 2017, Huang 2009, Huang 2011, Grimes 2025, Cronshaw 2025). O espectro solar foi integrado por mim a partir da tabela ASTM G173-03 (cópia em `pvlib`). Coeficientes de absorção de hemoglobina e água vêm das tabelas do Oregon Medical Laser Center (Prahl; Hale & Querry 1973). A tabela de doses da WALT foi lida no PDF oficial.

Unidades que o leitor vai ver o ensaio inteiro:
- **Potência** (mW): quanto a fonte emite.
- **Irradiância** (mW/cm²): potência por área na pele. É o "brilho" que importa.
- **Fluência ou dose** (J/cm²) = irradiância (W/cm²) × tempo (s). Exemplo: 30 mW/cm² por 10 min = 0,03 × 600 = 18 J/cm².
- **Energia por ponto** (J): usada em laser de consultório, onde o feixe é pequeno.

---

## 0. Cinco números para abrir o ensaio

| Número | O que é | Fonte |
|---|---|---|
| ~40 mW/cm² | Quanto o sol de meio-dia entrega só na faixa de 600 a 1000 nm (vermelho e infravermelho próximo). Um painel de consumo medido a 15 cm entrega de 50 a 90 mW/cm². O sol é "meio painel" de graça | ASTM G173, cálculo próprio [S]; medições de painéis [S] |
| 4,2% | Fração de luz de 800 nm que atravessa um crânio humano seco (5,9 a 7,2 mm de osso), sem contar couro cabeludo | Lapchak 2015 [V] |
| 2 J/cm² vs 50 J/cm² | Na ferida de camundongo, 2 J/cm² de luz de 635 nm acelerou o fechamento; 50 J/cm² fez a ferida crescer mais que a do grupo sem luz | Demidova-Rice 2007, via Huang 2009 [V] |
| 33% a 57% abaixo | Diferença entre a irradiância anunciada e a medida (a 15 cm) em cinco painéis populares | LightTherapyIQ / Light Therapy Insiders, sites com afiliação [S] |
| 2019 | Ano em que "photobiomodulation" passou "low-level laser/light therapy" em número de artigos no PubMed (365 vs 363) | Contagem própria no PubMed [V] |

---

## 1. História: de um acidente com camundongos ao nome novo

### 1.1 Mester, Budapeste, 1967

- **Achado:** Endre Mester (Semmelweis, Budapeste) queria saber se laser causava câncer. Raspou o dorso de camundongos e irradiou um grupo com um laser de rubi (694 nm) de baixa potência, fraco demais para repetir os experimentos de tumor de McGuff em Boston. Os camundongos não tiveram câncer, mas o pelo cresceu mais rápido no grupo irradiado. Mester chamou isso de "bioestimulação por laser". [S] (história contada em revisões de Hamblin e em de Freitas & Hamblin 2016)
- **Publicação:** o experimento é de 1967, mas o artigo saiu em 1968, em alemão: Mester E, Szende B, Gärtner P. "Die Wirkung der Lasstrahlen auf den Haarwuchs der Maus", Radiobiol Radiother (Berl) 1968;9(5):621-6. [V] https://pubmed.ncbi.nlm.nih.gov/5732466/
- **Desdobramentos:** em 1968 e 1969 o grupo já publicava sobre efeitos "inibidores e ativadores" do laser e sobre "somação de irradiação fracionada", ou seja, a ideia de que dose importa e que existe um lado inibidor já está no começo. [V] https://pubmed.ncbi.nlm.nih.gov/5758676/ e https://pubmed.ncbi.nlm.nih.gov/5349850/. Em 1971, cicatrização de feridas com laser (Lyon Chir). [V] https://pubmed.ncbi.nlm.nih.gov/5145042/
- **Ressalvas:** a dose exata do experimento de 1967 (circula "1 J/cm²") não foi verificada. [NV]
- **Potencial de widget:** ★ Linha do tempo estática (ver 1.4).

### 1.2 NASA, LEDs e plantas no espaço

- **Achado:** Ronald Ignatius (Quantum Devices, Wisconsin) propôs LEDs vermelhos como fonte de luz para cultivar plantas em experimentos no ônibus espacial (câmara Astroculture). Daí veio a parceria com Harry Whelan (Medical College of Wisconsin) e uma série de oito contratos SBIR da NASA entre 1995 e 2003, a maioria via Marshall Space Flight Center. [S] NASA Spinoff, https://spinoff.nasa.gov/Spinoff2005/hm%5F1.html ; Space Foundation, https://www.spacefoundation.org/space_technology_hal/light-emitting-diodes-for-medical-applications/
- **O artigo de 2001:** Whelan et al., "Effect of NASA light-emitting diode irradiation on wound healing", J Clin Laser Med Surg 2001;19(6):305-14. Números do abstract: crescimento celular in vitro de **140 a 200%** em fibroblastos de camundongo, osteoblastos e músculo de rato; **155 a 171%** em células epiteliais humanas; ferida até **36% menor** (com oxigênio hiperbárico) em rato isquêmico; **>40%** de melhora em lesões de treino de Navy SEALs; **47%** menos dor em crianças com mucosite oral. [V] https://pubmed.ncbi.nlm.nih.gov/11776448/
- **Ressalvas:** o próprio abstract mistura cultura de células, rato e relatos em militares, com parâmetros "variados". Não é um ensaio controlado. O valor histórico é ter popularizado o LED (barato, área grande) no lugar do laser. A NASA nunca usou a tecnologia médica no espaço e a Quantum Devices saiu do ramo em 2013. [S]
- **Potencial de widget:** ★ Parte da linha do tempo. A virada "de laser caro para LED barato" é a semente do mercado de consumo.

### 1.3 De LLLT para PBM: o nome mudou porque a coisa mudou

- **Achado:** em 2014, um encontro de consenso de nomenclatura da NAALT e da WALT recomendou trocar "low-level laser therapy" (LLLT) por "photobiomodulation (PBM) therapy". Motivos: "laser" já não descrevia as fontes (LEDs, lâmpadas) e "low-level" era vago. Editorial: Anders, Lanzafame & Arany, Photomed Laser Surg 2015;33(4):183-4. [V para a existência e a data do editorial; S para os detalhes do encontro] https://pubmed.ncbi.nlm.nih.gov/25844681/
- **MeSH, com precisão:** o descritor MeSH continua sendo "Low-Level Light Therapy" (D028022, criado em 2002). O termo "Photobiomodulation Therapy" entrou como sinônimo no MeSH 2016 (registro criado em 10 set 2014). O termo solto "Photobiomodulation" só entrou no MeSH 2024. O mesmo descritor trocou o nome de "Laser Therapy, Low-Level" para "Low-Level Light Therapy" também em 2016. [V] https://id.nlm.nih.gov/mesh/D028022.html
- **Correção para o texto:** é comum ler que "PBM virou termo MeSH em 2015". O mais exato é "entrou no MeSH como sinônimo na edição de 2016". [V]
- **Números para gráfico (artigos por ano no PubMed, termo no título ou resumo; contagem própria em 14 nov 2026):** [V]

| Ano | "photobiomodulation" | LLLT e variantes* | "red light therapy" |
|---|---|---|---|
| 2005 | 6 | 58 | 0 |
| 2010 | 18 | 180 | 1 |
| 2012 | 23 | 258 | 2 |
| 2014 | 43 | 309 | 1 |
| 2015 | 60 | 328 | 0 |
| 2016 | 155 | 356 | 4 |
| 2017 | 190 | 367 | n/d |
| 2018 | 278 | 386 | 3 |
| 2019 | 365 | 363 | 4 |
| 2020 | 521 | 401 | 4 |
| 2021 | 606 | 405 | 8 |
| 2022 | 619 | 378 | 17 |
| 2023 | 556 | 359 | 24 |
| 2024 | 696 | 431 | 37 |
| 2025 | 867 | 496 | 67 |

*"low level laser", "low-level laser", "low level light", "low-level light" ou "LLLT" em [tiab]. Os termos se sobrepõem (muitos artigos usam os dois). 2026 incompleto, omitido. Antes de ~2000 a contagem por [tiab] subestima (abstracts antigos menos indexados).
- **Leitura:** "red light therapy", o nome do TikTok, praticamente não existe na literatura até 2021 e explode depois (1 em 2010, 67 em 2025). O nome científico e o nome de marketing vivem em mundos separados.
- **Potencial de widget:** ★★★ Gráfico de linhas com as três curvas e o cruzamento de 2019 marcado. A terceira curva (minúscula, mas subindo em exponencial) é uma ótima ponte para a parte de hype.

### 1.4 Linha do tempo para o infográfico

| Ano | Marco | Conf. |
|---|---|---|
| 1960 | Maiman constrói o primeiro laser (rubi) | [S] |
| 1967 | Mester: laser de rubi fraco faz pelo de camundongo crescer mais rápido | [S], artigo de 1968 [V] |
| 1971 | Mester publica cicatrização de feridas com laser | [V] |
| 1984 | Passarella: laser He-Ne aumenta potencial de membrana e síntese de ATP em mitocôndrias isoladas de fígado de rato | [V] https://pubmed.ncbi.nlm.nih.gov/6479342/ |
| 1999 | Karu propõe a citocromo c oxidase como fotoaceptor | [V] https://pubmed.ncbi.nlm.nih.gov/10365442/ |
| 1995 a 2003 | Contratos SBIR da NASA para LEDs médicos (Whelan) | [S] |
| 2001 | Whelan et al., LED da NASA e cicatrização | [V] |
| 2002 | MeSH cria o descritor "Laser Therapy, Low-Level" | [V] |
| 2005 | Karu & Kolyakov publicam os espectros de ação "exatos" (4 picos) | [V] |
| 2009 | Huang, Chen, Carroll & Hamblin: revisão da resposta bifásica | [V] |
| 2009 | Lancet: meta-análise de laser para dor no pescoço (Chow et al.) | [V] https://pubmed.ncbi.nlm.nih.gov/19913903/ |
| 2010 | WALT publica tabelas de dose por diagnóstico | [V] |
| 2014 a 2016 | Consenso NAALT/WALT troca LLLT por PBM; MeSH 2016 adota o sinônimo | [V] |
| 2019 | Lima et al.: células sem citocromo c oxidase também respondem à luz | [V] |
| 2019 | "photobiomodulation" passa LLLT no PubMed | [V] |
| 2020 | Quirk & Whelan: "nenhuma demonstração confiável" do efeito direto da luz na CCO | [V] |

- **Potencial de widget:** ★★ Linha do tempo horizontal, estática, com três cores: física (laser, LED), biologia (mecanismos) e nome/mercado.

---

## 2. Mecanismos propostos, do mais sólido ao mais especulativo

Ideia-mãe: para a luz ter efeito biológico, alguma molécula precisa absorvê-la (primeira lei da fotobiologia, Grotthuss-Draper). A pergunta é qual. [S, livro-texto]

### 2.1 Citocromo c oxidase (CCO) como fotoaceptor

- **A hipótese:** a CCO, enzima IV (última) da cadeia respiratória da mitocôndria, tem centros de cobre e heme que absorvem no vermelho e no infravermelho próximo. Absorver fótons mudaria o estado redox da enzima e aceleraria a respiração. Karu 1999 lista quatro mecanismos primários possíveis (mudança redox, oxigênio singlete, aquecimento local transitório, superóxido/H2O2) e uma cascata secundária (pH, cálcio, cAMP, ATP). [V] https://pubmed.ncbi.nlm.nih.gov/10365442/
- **Os espectros de ação de Karu (o gráfico mais citado da área):** células HeLa irradiadas com luz monocromática de 580 a 860 nm; sete espectros de ação para síntese de DNA/RNA e adesão celular, decompostos em picos. Resultado: quatro regiões "ativas". [V] Karu & Kolyakov 2005, Photomed Laser Surg 23:355-61. https://pubmed.ncbi.nlm.nih.gov/16144476/

| Região | Faixa dos picos (nm) |
|---|---|
| Vermelho | 613,5 a 623,5 (um espectro em 606) |
| Vermelho distante | 667,5 a 683,7 |
| Infravermelho próximo 1 | 750,7 a 772,3 |
| Infravermelho próximo 2 | 812,5 a 846,0 |

- **Outro espectro do mesmo grupo (adesão de HeLa):** máximos em 619, 657, 675, 740, 760 e 820 nm. Com doador de NO (nitroprussiato) antes da luz, os picos se deslocam para 642, 685, 700, 742, 842 e 856 nm e o efeito some. [V] Karu et al. 2005, Lasers Surg Med. https://pubmed.ncbi.nlm.nih.gov/15739174/
- **Espectro da enzima pura:** Mason, Nicholls & Cooper 2014 (BBA) reavaliaram o espectro NIR da CCO: o principal absorvedor entre 700 e 980 nm é o CuA oxidado, com máximo em **835 nm** (enzima de coração bovino); banda de 655 nm do centro binuclear heme a3/CuB. [V] https://pubmed.ncbi.nlm.nih.gov/25175349/
- **Evidência in vivo em humanos:** com espectroscopia NIR de banda larga, laser de 1064 nm na testa de 11 voluntários aumentou a CCO oxidada (>0,08 µM) e a oxi-hemoglobina (>0,8 µM) contra placebo. [V] Wang et al. 2017, J Cereb Blood Flow Metab. https://pubmed.ncbi.nlm.nih.gov/28178891/ Um controle com aquecimento equivalente da pele não mudou a CCO. [V] Wang et al. 2018, Neurophotonics. https://pubmed.ncbi.nlm.nih.gov/28948191/
- **Força da evidência:** moderada para "a luz nessas faixas muda o metabolismo mitocondrial em células"; fraca para "a CCO é O fotoaceptor". Os espectros de Karu vêm essencialmente de um laboratório, em células HeLa, com desfechos indiretos. [S]
- **Curiosidade útil para o texto:** os LEDs de consumo mais comuns são 630, 660, 810, 830 e 850 nm. 630 e 660 ficam perto (não em cima) dos picos de Karu; 850 nm fica logo fora da faixa 812,5 a 846. A escolha é tanto de disponibilidade e custo de LED quanto de espectro de ação. [S, inferência minha]
- **Potencial de widget:** ★★★ Espectro interativo: eixo x de 400 a 1100 nm; camadas que o leitor liga e desliga: (1) os quatro picos de Karu como faixas, (2) absorção de hemoglobina, melanina e água (ver seção 4), (3) os comprimentos de onda vendidos nos painéis, (4) o espectro do sol. Aqui a interação ensina: o leitor vê que a "janela" onde a luz entra coincide com a região onde a CCO absorve, e que os LEDs foram postos onde há LED barato.

### 2.2 Dissociação do óxido nítrico (NO)

- **A hipótese:** em células estressadas, o NO se liga ao heme a3 da CCO e freia a respiração. A luz soltaria esse NO, a respiração voltaria e o NO liberado ainda teria efeitos próprios (vasodilatação). É a hipótese "líder" segundo de Freitas & Hamblin 2016. [V] https://pubmed.ncbi.nlm.nih.gov/28070154/
- **O que existe de dado:** o complexo heme-NO é sensível a luz branca; doadores de NO alteram o espectro de ação de Karu (2.1). [V]
- **Crítica forte, de dentro da área:** Quirk & Whelan 2020 (o mesmo Whelan da NASA): "Nenhuma demonstração confiável de qualquer efeito mecanístico induzido por luz relacionado a PBM na CCO foi relatada. Estudos são não reprodutíveis, de relevância questionável ou usam comprimentos de onda que provavelmente não operam in vivo." Eles propõem que o centro da PBM seja a produção de NO (via atividade nitrito-redutase da CCO e da hemoglobina/mioglobina em hipóxia), e não a ativação da CCO. [V] https://pubmed.ncbi.nlm.nih.gov/32716711/
- **Força da evidência:** plausível, popular, pouco demonstrada.
- **Potencial de widget:** ★★ Animação simples em três quadros: CCO "travada" por NO, fóton chega, NO sai. Com um selo "hipótese" bem visível.

### 2.3 Aumento de ATP

- **O que existe:** em mitocôndrias isoladas (He-Ne, 1984) e em culturas de células, a luz aumenta ATP e potencial de membrana. [V] Passarella 1984; Chen 2011: em fibroblastos, 810 nm aumentou ATP, ao contrário de inibidores mitocondriais que também geram ROS. [V] https://pubmed.ncbi.nlm.nih.gov/21814580/
- **A curva em sino aparece de novo:** em neurônios corticais de camundongo (810 nm, 25 mW/cm², 0,03 a 30 J/cm²), ATP e potencial de membrana sobem nas doses baixas e caem nas altas; o potencial de membrana fica **abaixo do basal** a 30 J/cm². [V] Sharma et al. 2011. https://pubmed.ncbi.nlm.nih.gov/21956634/
- **O golpe na explicação simples:** Lima et al. 2019 usaram células sem nenhuma CCO montada (nocaute de Cox10 em camundongo e uma linhagem humana com mutação no mtDNA). Luz de 660 nm aumentou a proliferação **nas células com e sem CCO**, e ainda aumentou ATP e citrato sintase. Conclusão: "a CCO não é necessária" para o efeito proliferativo. [V] https://pubmed.ncbi.nlm.nih.gov/30927704/
- **Força da evidência:** "ATP sobe em cultura" é bem replicado. "ATP sobe no seu tecido sob um painel em casa" não tem medida direta em humanos que eu tenha encontrado. Os dados humanos (Wang 2017) medem CCO oxidada e hemoglobina, não ATP. [V para a ausência no que li; procurar 31P-MRS em humanos se o ensaio quiser afirmar isso]
- **Potencial de widget:** ★★ Diagrama "o que foi medido onde": quatro colunas (mitocôndria isolada, célula, animal, humano) e linhas (ATP, CCO, ROS, NO, efeito clínico), com ✓ onde há dado. Estático. Mostra de forma honesta que a cadeia causal tem buracos justamente na coluna humana.

### 2.4 Sinalização por ROS (espécies reativas de oxigênio)

- **Achado:** 810 nm em fibroblastos ativou NF-κB a partir de 0,003 J/cm², com pico a 0,3 J/cm², via ROS (antioxidantes bloqueiam). [V] Chen 2011. Huang 2011: ROS mitocondriais mostram resposta **trifásica**, com dois picos (3 J/cm² junto com ATP; um segundo, maior, a 30 J/cm², junto com queda do potencial de membrana). [V] https://pubmed.ncbi.nlm.nih.gov/22461763/
- **O paradoxo útil:** em células normais a PBM gera um pulso de ROS; em células já estressadas ou em modelos de doença, os ROS caem. [V] Hamblin 2017, AIMS Biophys. https://pubmed.ncbi.nlm.nih.gov/28748217/ É a lógica da hormese: um estresse pequeno ativa defesas.
- **Força da evidência:** boa em cultura; a extrapolação para o efeito clínico é inferência.
- **Potencial de widget:** ★★ Curva de ROS vs dose com dois picos, sobreposta à de ATP (ver 3.2).

### 2.5 Canais iônicos sensíveis a luz ou calor (TRPV1, TRPC) e opsinas

- **Achado-chave:** em células-tronco de tecido adiposo humano, 810 nm e 980 nm parecem agir por vias diferentes. 810 nm teve pico de proliferação a **3 J/cm²**; 980 nm teve pico **10 a 100 vezes menor**, a 0,03 ou 0,3 J/cm². Só 980 nm aumentou cálcio no citosol, efeito bloqueado por capsazepina (TRPV1) e SKF96365 (TRPC). Esfriar o meio a 4 °C ou pré-aquecer a 42 °C aboliu o efeito de 980 nm, não o de 810. Conclusão dos autores: 980 nm age via canais de cálcio sensíveis a temperatura (a água absorve e cria microgradientes térmicos); 810 nm age via CCO. [V] Wang et al. 2017, BBA. https://pubmed.ncbi.nlm.nih.gov/27751953/
- **Opsinas:** Hamblin 2017 cita canais de cálcio "possivelmente mediados por opsinas" como segundo cromóforo. [V para a menção] Evidência direta de opsinas respondendo a vermelho/NIR terapêutico é escassa; o que é mais sólido sobre opsinas em pele é com luz azul. [S]
- **Força da evidência:** interessante, poucos estudos, quase todos do mesmo grupo.
- **Potencial de widget:** ★ Nota lateral. Bom para dizer "nem todo comprimento de onda faz a mesma coisa".

### 2.6 Hipótese da água interfacial (Sommer)

- **A hipótese:** o aceptor principal do NIR não seria a CCO, e sim camadas nanométricas de água ligadas a superfícies dentro da mitocôndria. ROS aumentariam a viscosidade dessa água e "travariam" o rotor da ATP sintase; a luz reduziria a viscosidade e destravaria o motor. [V para o conteúdo da proposta] Sommer 2018, Photomed Laser Surg. https://pubmed.ncbi.nlm.nih.gov/29570422/ ; Sommer 2019, Ann Transl Med, "Mitochondrial cytochrome c oxidase is not the primary acceptor for near infrared light, it is mitochondrial bound water". https://pubmed.ncbi.nlm.nih.gov/31032294/
- **Força da evidência:** especulativa. Autor independente, base em experimentos de laboratório pequenos e um caso clínico ilustrativo. Não é consenso. [S]
- **Potencial de widget:** ★ Uma linha no quadro-resumo.

### 2.7 Quadro-resumo dos mecanismos (para infográfico)

| Mecanismo | O que está bem demonstrado | O que é suposição | Nota |
|---|---|---|---|
| CCO absorve vermelho/NIR | A enzima pura absorve (CuA, 835 nm); espectros de ação em células têm picos nessas faixas | Que seja o aceptor principal no tecido | Moderada |
| Luz solta NO da CCO | Complexo heme-NO é fotolábil; NO altera espectro de ação | Que isso ocorra com a luz que chega ao tecido | Fraca a moderada |
| Mais ATP | Replicado em mitocôndria isolada e células | Que ocorra no tecido humano com dose doméstica | Moderada in vitro, sem dado humano direto |
| Pulso de ROS / hormese | Replicado em células; padrão bifásico/trifásico | Que explique efeitos clínicos | Moderada in vitro |
| Canais TRP / calor (980 nm) | Um estudo com bloqueadores e controle térmico | Generalização | Fraca |
| Água interfacial | Proposta teórica com experimentos pequenos | Quase tudo | Especulativa |

- **Crítica transversal (para o ensaio):** (1) células sem CCO respondem (Lima 2019); (2) o próprio Whelan diz que não há demonstração confiável do efeito na CCO (2020); (3) a maior parte dos dados mecanísticos é de cultura de células, onde a luz chega sem pele, sangue nem melanina; (4) muitos estudos não verificam a dose que entregaram (ver 5.4). [V]
- **Potencial de widget:** ★★★ "Termômetro de evidência": cada mecanismo como uma barra de 0 a 5 com cor, e ao clicar abre a frase "o que foi medido" e "o que falta". A barra é estática; o clique só revela texto. Vale a pena porque o leitor pode comparar o tamanho da afirmação de marketing ("aumenta seu ATP") com o tamanho da evidência.

---

## 3. A física da dose: por que mais não é melhor

### 3.1 Irradiância, fluência e tempo

- **Definições:** ver o topo. A mesma fluência pode vir de irradiância alta por pouco tempo ou baixa por muito tempo. Se o corpo só "contasse fótons", o resultado seria igual (lei de reciprocidade de Bunsen-Roscoe). Na PBM, essa reciprocidade "falhou com frequência". [V] Huang 2009. https://pubmed.ncbi.nlm.nih.gov/20011653/
- **Exemplo limpo de falha da reciprocidade:** úlceras de pressão em camundongos, 670 nm, sempre 5 J/cm²/dia. Combinações eficazes: 625 s a 8 mW, 62,5 s a 40 mW ×2/dia, 312,5 s a 8 mW ×2/dia. A mesma dose a 40 mW uma vez por dia funcionou no dia 7 mas não no dia 18. Conclusão dos autores: variar irradiância e tempo com a mesma dose muda o resultado. [V] Lanzafame et al. 2007. https://pubmed.ncbi.nlm.nih.gov/17659591/ Na revisão de Huang 2009, das irradiâncias de 0,7 a 40 mW/cm² (a 5 J/cm²), só 8 mW/cm² foi significativa. [V]
- **Outros exemplos com a mesma dose:** em feridas de rato, 670 nm, 5 J/cm²: efeito só a 4 mW/cm² (1250 s), não a 15 mW/cm² (333 s). Em mucosite de hamster, 660 nm, 0,9 J/cm²: efeito só a 55 mW/cm² (16 s), não a 155 mW/cm² (6 s). [V] Huang 2011.
- **Potencial de widget:** ★★★ "Calculadora de dose" com dois controles deslizantes (irradiância em mW/cm² e tempo em min) e o resultado em J/cm², com faixas coloridas atrás: "faixa estudada em clínica" (4 a 10 J/cm² no alvo; ver 3.3) e "zona de inibição em estudos de células e animais". Mostra também quanto chega a 1 cm de profundidade (ligando com a seção 4). A interação ensina porque o leitor descobre que 20 min na frente de um painel forte já passa de 50 J/cm² na superfície.

### 3.2 A resposta bifásica (curva de Arndt-Schulz)

- **História:** Hugo Schulz (1877, 1888) viu que doses pequenas de venenos estimulavam levedura; com o psiquiatra Rudolf Arndt formulou a regra "estímulos fracos aceleram, fortes inibem". Townsend & Luckey (1960) listaram 100 substâncias com esse padrão; Stebbing (1982) cunhou "hormese". [V] Huang 2009.
- **Dados para o gráfico principal (doses que funcionam e doses que atrapalham):** [V] (Huang 2009, Huang 2011 e artigos originais)

| Estudo | Modelo | Parâmetros | Melhor dose | O que acontece acima |
|---|---|---|---|---|
| Demidova-Rice 2007 | Ferida em camundongo | 635 nm, 100 mW/cm²; 1, 2, 10, 50 J/cm² | 2 J/cm² | A 50 J/cm² a ferida aumentou mais que no controle sem luz |
| Sharma 2011 | Neurônios corticais | 810 nm, 25 mW/cm²; 0,03 a 30 J/cm² | 3 J/cm² (ATP, potencial de membrana) | A 30 J/cm² potencial de membrana abaixo do basal; segundo pico de ROS |
| Chen 2011 | Fibroblastos (NF-κB) | 810 nm; 0,003 a 30 J/cm² | 0,3 J/cm² | Cai a 3 e 30 J/cm² |
| Wang 2017 | Células-tronco adiposas | 810 nm vs 980 nm | 3 J/cm² (810); 0,03 a 0,3 J/cm² (980) | Bifásica nos dois |
| Zhang 2003 | Fibroblastos humanos | 628 nm LED, 11,46 mW/cm² | 0,88 J/cm² (+30% proliferação) | Reduzido a 8,68 J/cm² |
| Hawkins 2005 | Fibroblastos feridos | He-Ne, 2 mW/cm²; 0,5 a 10 J/cm² | 2,5 J/cm² | Dano a 10 J/cm² |
| Yamaura 2009 | Sinoviócitos (artrite) | 810 nm; 1 a 50 J/cm² | 5 J/cm² | Menor a 50 J/cm² |
| Lopes-Martins 2005 | Pleurisia em camundongo | 650 nm; 3, 7,5, 15 J/cm² | 7,5 J/cm² | Menor a 15 |
| Oron 2001 | Infarto em rato | 810 nm; 2,5 a 20 mW/cm² | 5 mW/cm² | Menos efeito a 2,5 e a 25 |
| Ando/Wu (Huang 2011) | TCE em camundongo, transcraniano | 810 nm, 12 min | 36 J/cm² a 50 mW/cm² (melhora por 4 semanas) | 360 J/cm² a 500 mW/cm²: benefício sumiu; dias 1 a 6 piores que sem tratamento |
| Xuan (Huang 2011) | TCE em camundongo, número de sessões | 36 J/cm² por sessão | 1 a 3 sessões | 14 sessões diárias: vantagem some no dia 5; dias 16 a 28 tendem a pior que sem tratamento (n.s.) |

- **Leitura:** o ponto ótimo muda 1000 vezes de um modelo para outro (de 0,03 a 36 J/cm²), mas o formato em sino aparece em quase todos. E repetir demais também é uma forma de overdose (Xuan). [V]
- **Tecidos diferentes, doses diferentes:** Zein, Selting & Hamblin 2018 plotaram fluência vs irradiância de estudos eficazes e ineficazes: tecidos com muita mitocôndria (músculo, cérebro, coração, nervo) tendem a responder a doses menores que pele, tendão e cartilagem; nos tecidos ricos em mitocôndria, estudos ineficazes pareciam "mais por overdose que por subdose". [V] https://pubmed.ncbi.nlm.nih.gov/30550048/
- **Ressalvas:** a curva idealizada de Huang 2009 (Fig. 8) é ilustrativa, adaptada de Sommer et al. 2001, não um ajuste de dados. Os números de "melhor dose" dependem do desfecho medido. Não existe uma "dose humana ótima" universal. [V]
- **Potencial de widget:** ★★★ Gráfico "pequenos múltiplos": cada estudo como um mini-gráfico com eixo x logarítmico de dose (0,001 a 1000 J/cm²) e a mesma forma de sino, com o pico em lugar diferente. Por cima, um único eixo mostra onde caem "10 min de painel a 15 cm" (~36 a 54 J/cm²) e "10 min de sol" (~24 J/cm² em 600 a 1000 nm). Estático com tooltip basta.

### 3.3 Recomendações de dose da WALT

- **Tabela oficial (WALT, revisada em abril de 2010), laser 780 a 860 nm, classe 3B, 5 a 500 mW:** [V] https://waltpbm.org/wp-content/uploads/2021/08/Dose_table_780-860nm_for_Low_Level_Laser_Therapy_WALT-2010.pdf

| Diagnóstico | Pontos ou cm² | Joules (780 a 820 nm) | Nota da tabela |
|---|---|---|---|
| Túnel do carpo | 2 a 3 | 8 | Mín. 4 J por ponto |
| Epicondilite lateral | 1 a 2 | 4 | Máx. 100 mW/cm² |
| Supraespinal | 2 a 3 | 8 | Mín. 4 J por ponto |
| Tendão de Aquiles | 2 a 3 | 8 | Máx. 100 mW/cm² |
| Fascite plantar | 2 a 3 | 8 | Mín. 4 J por ponto |
| Dedo (IFP ou MCF) | 1 a 2 | 4 | |
| Coluna cervical | 4 a 12 | 16 | Mín. 4 J por ponto |
| Coluna lombar | 4 a 8 | 16 | Mín. 4 J por ponto |
| Quadril | 2 a 4 | 12 | Mín. 6 J por ponto |
| Joelho medial | 3 a 6 | 12 | Mín. 4 J por ponto |

- **Regras da mesma tabela:** tempo de irradiação entre **20 e 300 s**; sessões diárias por 2 semanas ou em dias alternados por 3 a 4 semanas; reduzir 30% quando a inflamação ceder; "janelas terapêuticas costumam ser de **±50%** dos valores; doses fora dessas janelas são inadequadas e não devem ser consideradas laserterapia de baixa intensidade"; doses calibradas para **pele branca/caucasiana**. [V]
- **Outras referências de faixa:** "alguns grupos recomendam irradiância abaixo de 100 mW/cm² e 4 a 10 J/cm² no tecido-alvo; outros recomendam até 50 J/cm² na superfície". [V] Zein 2018. Huang 2009 resume: "fluências de 3 ou 5 J/cm² serão benéficas in vivo"; 50 ou 100 J/cm² podem virar prejudiciais. [V]
- **Por que importa para o consumidor:** a WALT fala em joules por ponto de poucos cm² e alerta para um teto de 100 mW/cm² em tendões superficiais. Um painel de corpo inteiro entrega isso em centenas de cm² ao mesmo tempo, sem alvo, por 10 a 20 min. [S, inferência]
- **Revisões que atribuem estudos negativos a dose:** Bjordal (14 ECRs; 4 falharam, atribuídos a irradiância ou energia alta ou baixa demais); Tumilty (13 de 25 ECRs de tendinopatia, 55%, negativos ou inconclusivos; os que reportaram irradiância excediam a WALT). [V via Huang 2009]
- **Ressalva:** "atribuir o fracasso à dose errada" também pode ser uma forma de nunca aceitar resultado negativo. Vale dizer isso no ensaio. [S, opinião editorial]
- **Potencial de widget:** ★★ Tabela visual com "janela de ±50%" desenhada como faixa em torno de cada valor.

### 3.4 Pulsado vs contínuo

- **Achado:** revisão de 1970 a 2010: "há alguma evidência de que luz pulsada tem efeitos diferentes da contínua", sem consenso sobre parâmetros. [V] Hashmi et al. 2010. https://pubmed.ncbi.nlm.nih.gov/20662021/ Em cadáver, Tedford 2015 não viu diferença de penetração entre pulsado e contínuo a 808 nm. [V]
- **Potencial de widget:** nenhum. Nota de rodapé para desarmar o marketing de "pulsos de 10 Hz".

---

## 4. Até onde a luz entra: penetração por comprimento de onda

### 4.1 A janela óptica (~650 a 950 nm)

- **Por que existe:** abaixo de ~600 nm, a hemoglobina e a melanina absorvem muito; acima de ~950 nm, a água começa a absorver forte. No meio, há uma janela onde o espalhamento domina e a luz vai mais fundo. [S, livro-texto; Jacques 2013, https://pubmed.ncbi.nlm.nih.gov/23666068/]
- **Números de absorção que desenham a janela:** [V] (OMLC, Prahl para hemoglobina; Hale & Querry 1973 para água)

| λ (nm) | HbO2 (cm⁻¹/M) | Hb (cm⁻¹/M) | Água μa (cm⁻¹) |
|---|---|---|---|
| 550 | 43.016 | 53.412 | 0,00045 |
| 600 | 3.200 | 14.677 | 0,0023 |
| 650 | 368 | 3.750 | 0,0032 |
| 700 | 290 | 1.794 | 0,0060 |
| 750 | 518 | 1.405 | 0,026 |
| 800 | 816 | 762 | 0,020 |
| 850 | 1.058 | 691 | 0,043 |
| 900 | 1.198 | 762 | 0,068 |
| 950 | 1.204 | 602 | 0,39 |
| 980 | n/d | n/d | 0,43 |

- **Leitura:** a oxi-hemoglobina absorve **~117 vezes** mais em 550 nm (verde) do que em 650 nm. A água absorve **~20 vezes** mais em 950 a 980 nm do que em 800 nm. [V, cálculo sobre a tabela]
- **Fontes:** https://omlc.org/spectra/hemoglobin/summary.html ; https://omlc.org/spectra/water/data/hale73.txt

### 4.2 Dados para o gráfico profundidade vs comprimento de onda (modelo)

- **Método (cálculo próprio, [S]):** tecido genérico de Jacques 2013 em aproximação de difusão. Espalhamento reduzido μs' = 46 × (λ/500)^-1,421 cm⁻¹ (parâmetros médios de pele que recordo de Jacques 2013, conferir [NV]); absorção = sangue (150 g/L de Hb, 75% oxigenado) + água + melanina (519 × (λ/500)^-3,5 cm⁻¹). Profundidade de penetração δ = 1/√(3μa(μa+μs')), a profundidade onde a luz cai para 1/e (37%). "Fração a x mm" = e^(-x/δ), ignorando o acúmulo logo abaixo da superfície e as bordas. Serve para a **forma** da curva, não para números exatos.

| λ (nm) | δ derme (0,5% sangue), mm | Resta a 5 mm | Resta a 1 cm | Resta a 2 cm | δ tecido tipo músculo (2% sangue), mm |
|---|---|---|---|---|---|
| 450 | 0,56 | 0,01% | ~0 | ~0 | 0,26 |
| 550 | 0,81 | 0,2% | ~0 | ~0 | 0,39 |
| 600 | 2,4 | 12% | 1,5% | 0,02% | 1,2 |
| 630 | 4,6 | 33% | 11% | 1,2% | 2,3 |
| 660 | 6,0 | 43% | 19% | 3,5% | 3,1 |
| 700 | 7,3 | 51% | 26% | 6,5% | 3,9 |
| 750 | 5,9 | 43% | 18% | 3,4% | 3,6 |
| 810 | 6,4 | 46% | 21% | 4,4% | 3,7 |
| 850 | 5,3 | 39% | 15% | 2,4% | 3,4 |
| 900 | 4,8 | 35% | 12% | 1,5% | 3,1 |
| 940 | 2,9 | 18% | 3,4% | 0,1% | 2,4 |
| 980 | 2,5 | 13% | 1,7% | 0,03% | 2,1 |

- **Âncora medida para checar o modelo:** cabeça de cadáver inteira (couro, crânio, meninges, cérebro), 808 nm: coeficiente de atenuação efetivo **2,22 cm⁻¹**, ou seja, δ ≈ 4,5 mm e ~11% por centímetro; luz detectável até ~40 mm. No parênquima, 808 nm espalhou e absorveu menos que 660 e 940 nm. [V] Tedford et al. 2015. https://pubmed.ncbi.nlm.nih.gov/25772014/ O modelo (δ 3,7 a 6,4 mm em 810 nm) bate na ordem de grandeza.
- **Outra âncora (Monte Carlo de pele):** a 750 nm, a profundidade onde a energia cai a 1% do máximo foi 5378 µm (~5,4 mm), coerente com a faixa de 4 a 6 mm da literatura. Feixe de 10 mm já entrega 73 a 88% da fluência de um feixe infinito a 1 a 3 mm de profundidade, ou seja, feixe maior ajuda pouco em profundidade. [V] Ash et al. 2017, Lasers Med Sci. https://pubmed.ncbi.nlm.nih.gov/28900751/
- **Medidas em tecido vivo (Jagdeo 2012, LED comercial a ~33 mW/cm²):** [V, porcentagens calculadas por mim a partir das tabelas] https://pubmed.ncbi.nlm.nih.gov/23077622/

| Tecido (espessura) | 830 nm passa | 633 nm passa |
|---|---|---|
| Bochecha humana viva (~10 mm), pressão leve | 12% | 2,1% |
| Bochecha, pressão forte | 15% | 4,0% |
| Mão humana viva, palma (25 mm) | 0,096% | 0,005% |
| Mão (30 mm) | 0,014% | 0,0002% |

- **Leitura para o leitor:** a 2 a 3 cm, o que sobra é da ordem de 0,01% a 0,1% em NIR e praticamente zero em vermelho. Vermelho é tratamento de superfície (pele, poucos mm). NIR chega a alguns cm, com perdas enormes. [V/S]
- **Henderson & Morries 2015 (clínicos que vendem laser de alta potência):** "nenhuma penetração de NIR de baixa potência através de 2 mm de pele"; com 10 a 15 W, 0,45 a 2,90% de 810 nm chegaram a 3 cm; "na literatura de baixa potência, menos de meio por cento da energia de superfície chega a 1 cm". [V] https://pubmed.ncbi.nlm.nih.gov/26346298/ Ressalva: conflito de interesse óbvio (defendem lasers de 10 a 15 W) e a afirmação sobre 2 mm de pele contradiz outros dados (Jagdeo). [S]
- **Potencial de widget:** ★★★ O gráfico-estrela da seção. Um corte de pele e músculo na vertical (0 a 3 cm), o leitor arrasta um controle de comprimento de onda (450 a 1000 nm) e vê a "nuvem" de luz encolher ou crescer; ao lado, a curva δ(λ) com a janela sombreada. Um segundo controle de tom de pele (ver 4.4). Aqui a interação ensina diretamente: o leitor descobre sozinho que o verde morre em menos de 1 mm, que 700 a 850 é o melhor e que 980 volta a cair pela água.

### 4.3 Atravessar o crânio

- **Crânio humano seco, 800 nm (Lapchak 2015):** espessura média de 7,19 mm (bregma) e 5,91 mm (parietal); passaram **4,18% e 4,24%**. Em animais: camundongo 40,1% (0,44 mm de osso), rato 21,2% (0,83 mm), coelho 11,4% (2,11 mm). [V] https://pubmed.ncbi.nlm.nih.gov/26039354/
- **Cadáver, com e sem tecido mole (Jagdeo 2012):** [V, porcentagens calculadas por mim]

| Região | 830 nm | 633 nm |
|---|---|---|
| Osso parietal só (~5 mm) | 8 a 10% | 1,2 a 6,3% |
| Osso frontal só | 4,4 a 7,4% | 0,3 a 1,8% |
| Têmpora com tecido mole | 0,9% | <0,0015% |
| Frontal com tecido mole | 2,1% | 0,55% |
| Occipital com tecido mole | 11,7% | 0,65% |

- **Revisão (Salehpour et al. 2019):** penetração média transcraniana de 630 a 810 nm: **0,2 a 10%** em humanos (couro + crânio); 60 a 70% em crânio de camundongo C57BL/6; 0,11% em porco (couro + crânio, 808 nm). Os autores concluem que os dados "desafiam a aplicabilidade" dos modelos animais. [V] https://pubmed.ncbi.nlm.nih.gov/31553265/
- **Cérebro profundo:** iluminar pelos ventrículos foi 20 vezes mais eficiente que pelo crânio; 808 nm sempre melhor que 671 nm. [V] Pitzschke 2015. https://pubmed.ncbi.nlm.nih.gov/25789711/
- **Leitura:** um camundongo recebe 10 a 300 vezes mais luz no cérebro do que um humano com o mesmo aparelho. Esse é um dos maiores buracos entre "funcionou no camundongo" e "vai funcionar em você". [S, inferência sobre dados V]
- **Ressalvas:** cadáveres fixados em formol, n pequeno (Jagdeo: uma cabeça), crânios secos. Fluxo de sangue in vivo absorve mais.
- **Potencial de widget:** ★★★ Gráfico de barras logarítmico "quanto da luz chega ao cérebro": camundongo, rato, coelho, porco, humano (osso só), humano (com couro), com 633 vs 830 nm. Estático. A escala log é a lição: as barras humanas são minúsculas.

### 4.4 Melanina e tom de pele

- **Medidas em 40 voluntários, 635 e 808 nm (~0,2 W/cm²):** pele mais escura reflete menos e absorve mais; a vantagem de transmissão do 808 sobre o 635 "se perde em parte" na pele escura e mais ainda com tecido mais grosso. Aquecimento de 0,7 a 1,6 °C entre 6 e 12 J, sem diferença relevante por cor nessa faixa. [V] Souza-Barros et al. 2018. https://pubmed.ncbi.nlm.nih.gov/29178437/
- **Calor em pele escura (Joensen 2011, 40 voluntários):** nas doses da WALT, aquecimento abaixo de 1,5 °C em pele clara, média e escura. Com doses maiores, laser de 200 mW em 810 nm gerou **3 a 6 vezes mais calor** na pele escura; **8 de 13** participantes de pele escura pediram para parar por desconforto; aumento máximo de **22,3 °C**. Com 904 nm/60 mW, +5,7 °C em pele escura a 12 J. [V] https://pubmed.ncbi.nlm.nih.gov/21219241/
- **Modelo da epiderme (cálculo próprio [S], 60 µm de epiderme, caminho difuso ×2, fração de melanossomos 2%, 10% e 30% para clara, média e escura):** transmissão pela epiderme

| λ (nm) | Clara | Média | Escura |
|---|---|---|---|
| 450 | 84% | 41% | 7% |
| 630 | 95% | 76% | 44% |
| 660 | 95% | 79% | 49% |
| 810 | 98% | 89% | 71% |
| 850 | 98% | 91% | 75% |

- **Leitura:** em pele escura, um painel vermelho de 630/660 nm perde cerca de metade da luz só na epiderme; o NIR perde menos. As doses da WALT foram calibradas em pele branca. [V para a WALT; S para o modelo]
- **Potencial de widget:** ★★ O controle de tom de pele dentro do widget de 4.2. Sozinho, uma barra dupla por tom de pele.

---

## 5. Fontes de luz: laser, LED, painel, máscara

### 5.1 Coerência: quase irrelevante

- **Achado:** nas feridas de camundongo, "nenhuma diferença" entre luz não coerente de lâmpada (635 ± 15 nm) e laser He-Ne coerente (633 nm). [V] Demidova-Rice 2007. https://pubmed.ncbi.nlm.nih.gov/17960752/
- **Revisão:** "LEDs têm vantagens: sem riscos de segurança de laser, uso doméstico, área grande, dispositivos vestíveis e custo por mW muito menor. A PBM com LED veio para ficar." Alguns autores antigos insistiam que o laser era essencial. [V] Heiskanen & Hamblin 2018. https://pubmed.ncbi.nlm.nih.gov/30044464/ Kim & Calderhead 2011: com o comprimento de onda certo, a irradiância e a fluência adequadas, LED funciona. [V] https://pubmed.ncbi.nlm.nih.gov/24155530/
- **Nuance:** a coerência se perde em poucas centenas de µm de tecido por espalhamento; o que o laser tem de vantagem real é concentrar muita potência num ponto pequeno (irradiância alta) e o feixe estreito, o que ajuda em profundidade em pontos específicos. [S]
- **Potencial de widget:** ★ Duas fotos lado a lado (feixe de laser e painel) com a frase "o que importa é quantos fótons chegam onde, não se eles marcham em fila".

### 5.2 Irradiância típica: consumo vs clínica

| Fonte | Irradiância típica | Conf. |
|---|---|---|
| Laser de consultório (classe 3B), ponto de ~0,1 a 1 cm² | 100 mW/cm² a vários W/cm² | [S] (WALT: 5 a 500 mW; Lapchak usou 200 a 700 mW/cm²) |
| Laser classe 4 "de alta potência" (10 a 15 W) | Vários W/cm² | [V] Henderson 2015 |
| LED usado em estudos de NIR transcraniano | 7,5 a 25 mW/cm² (animais) | [V] citado em Lapchak 2015 |
| LED comercial usado por Jagdeo (Photomedex) | ~33 a 35 mW/cm² (830 nm) e ~67 a 73 mW/cm² (633 nm) a 5 a 10 mm | [V] |
| Máscara LED de uso doméstico em ensaio controlado (630 + 850 nm) | máx. 10 mW/cm² | [V via busca, abstract] https://pmc.ncbi.nlm.nih.gov/articles/PMC11835066/ |
| Painéis de corpo inteiro, medidos a 15 cm (6 pol.) | 52 a 90 mW/cm² | [S] |
| Painéis de corpo inteiro, medidos a 30 cm (12 pol.), média sobre 61 × 76 cm | 23 a 55 mW/cm² | [S] |

- **Painéis: anunciado vs medido (a 15 cm, espectrômetro, grade de 9 pontos; medições de Light Therapy Insiders / Alex Fergus compiladas por LightTherapyIQ):** [S] https://www.lighttherapyiq.com/best/best-red-light-therapy-panels

| Painel | Anunciado | Medido (média) | Diferença |
|---|---|---|---|
| PlatinumLED BIOMAX 900 | 135 mW/cm² | 90,3 | -33% |
| Hooga PRO1500 | 189 | 86 | -54% |
| Bestqool Pro100 | ~90 a 109 (a 7,5 cm) | 51,7 | -43% |
| Joovv Solo 3.0 | >100 | 59,2 | -41% |
| Mito MitoPRO 1500X | >160 | 68 | -57% |

- **Painéis a 30 cm (laboratório LightLab International, esfera integradora Labsphere de 2 m, 2026):** de 23,4 (BestQool Pro300) a 54,8 mW/cm² (MitoHacker 5.0) de média sobre 61 × 76 cm; numa área do tamanho do rosto, até 92,5 mW/cm². [S] https://www.lighttherapyinsiders.com/red-light-therapy-panel-comparison/
- **Ressalvas fortes:** os dois sites têm afiliação declarada com as marcas (o autor diz que "é afiliado a todas as marcas da página", que os painéis foram doados e que cada marca pagou o próprio teste). Não encontrei estudo revisado por pares que teste painéis de consumo contra o anunciado. Parte da diferença vem de método: alguns fabricantes medem com o sensor encostado no LED (0 mm, números de 200+ mW/cm²) ou com "medidor solar" de banda larga, que superestima LED vermelho. [S]
- **Peer-reviewed mais próximo:**
  - Cronshaw et al. 2025 (Dent J, De Montfort): cinco aparelhos de LED de mão para uso doméstico; resultados "heterogêneos", potência instável, ângulo de divergência de 74°; "as instruções de dosimetria do fabricante são inconsistentes com uma entrega de dose precisa". [V] https://pubmed.ncbi.nlm.nih.gov/39996950/
  - Baeza-Moyano, Bernardez & Sola 2026 (Photochem Photobiol Sci): quatro máscaras LED cosméticas com grande variação de pico e forma espectral; a maioria não publica irradiância espectral; máscaras domésticas raramente são calibradas. [S, li só o resumo via busca] https://link.springer.com/article/10.1007/s43630-026-00908-x
  - Grimes 2025 (PLOS One, Trinity College Dublin): 27 estudos dermatológicos com LED; fluências de **0,1 a 126 J/cm²** (mediana 40,5), mais de três ordens de grandeza, mesmo para a mesma condição; **nenhum** estudo relatou validação da dose; 37% patrocinados pelo fabricante, mais 11% feitos por clínicas que vendem o tratamento; só 33% tinham grupo controle e avaliação cega. [V] https://pubmed.ncbi.nlm.nih.gov/41032498/
  - Jenkins & Carroll 2011: periódicos "frequentemente publicam estudos com dados faltando, erros matemáticos e nenhuma verificação dos parâmetros do feixe"; a potência cai com o aquecimento e o envelhecimento do aparelho. [V] https://pubmed.ncbi.nlm.nih.gov/22107486/
- **Potencial de widget:** ★★★ Gráfico de halteres "anunciado vs medido" (um ponto vazio e um cheio por painel, ligados por uma linha). Estático. Com nota de afiliação visível. E um segundo gráfico, de pontos em escala log, com as fluências dos 27 estudos de Grimes (0,1 a 126 J/cm²) para mostrar que nem a ciência concorda.

### 5.3 Distância: o painel grande não obedece ao inverso do quadrado (de perto)

- **Física:** uma fonte pontual cai com 1/d². Um painel grande (30 × 90 cm) visto de perto é quase um "plano infinito" e cai bem mais devagar; só a distâncias maiores que o tamanho do painel a queda se aproxima de 1/d². LEDs com lente (feixe de 30° a 60°) caem ainda mais devagar de perto, mas concentram em manchas. [S, física de livro-texto]
- **Números (cálculo próprio [S], painel 30 × 90 cm uniforme, irradiância normalizada a 100% em 15 cm):**

| Distância | Fonte pontual (1/d²) | Painel lambertiano | Painel com LEDs de 60° |
|---|---|---|---|
| 5 cm | 900% | 137% | 106% |
| 10 cm | 225% | 119% | 104% |
| 15 cm | 100% | 100% | 100% |
| 30 cm | 25% | 59% | 76% |
| 45 cm | 11% | 37% | 56% |
| 60 cm | 6% | 25% | 41% |
| 90 cm | 3% | 13% | 24% |
| 120 cm | 2% | 8% | 15% |

- **Checagem com medida:** painéis medidos a 15 cm ficaram em 52 a 90 mW/cm² e a 30 cm em 23 a 55 mW/cm², uma queda para ~50 a 60%, compatível com o modelo lambertiano e longe do 25% do inverso do quadrado. [S, modelos diferentes nas duas medições]
- **Consequência prática:** o mesmo painel a 15 cm por 10 min dá ~36 a 54 J/cm²; a 60 cm, ~9 a 14 J/cm². A distância muda a dose em 4 vezes, e as instruções de uso raramente dizem a distância. [S, cálculo]
- **Potencial de widget:** ★★★ Controle deslizante de distância (5 a 120 cm) com uma pessoa e um painel desenhados; mostra mW/cm² e, com o tempo escolhido, a dose em J/cm², sobre as faixas da curva bifásica. Três curvas (ponto, painel, lente) num gráfico ao lado. A interação ensina: o leitor vê que "chegar mais perto" não é linear e que a dose escapa fácil das faixas estudadas.

---

## 6. Escalas de comparação para o leitor

### 6.1 O sol

- **Espectro ASTM G173-03 (global, AM1.5, superfície inclinada 37°, total ≈ 1000 W/m² = 100 mW/cm²), integrado por mim:** [S, cálculo sobre dado V] https://raw.githubusercontent.com/pvlib/pvlib-python/main/pvlib/data/ASTMG173.csv

| Faixa | mW/cm² |
|---|---|
| Total (280 a 4000 nm) | 100,0 |
| UV (280 a 400 nm) | 4,6 |
| Visível (400 a 700 nm) | 43,0 |
| Vermelho (600 a 700 nm) | 13,9 |
| 620 a 680 nm | 8,4 |
| 650 a 670 nm (faixa de um LED de 660) | 2,8 |
| 800 a 870 nm (faixa de um LED de 830/850) | 6,8 |
| **600 a 1000 nm (vermelho + NIR)** | **40,3** |
| Janela óptica (650 a 950 nm) | 30,2 |
| Acima de 1000 nm (IV que vira calor) | 26,0 |

- **Leitura:** **10 minutos de sol forte entregam ~24 J/cm² de 600 a 1000 nm**, mais que muitas doses de estudo. Mas o sol vem com 4,6 mW/cm² de UV e 26 mW/cm² de IV longo, que aquecem; o painel entrega só a faixa estreita, sem UV. Num comprimento de onda específico, o LED ganha de longe (o sol tem 2,8 mW/cm² em 650 a 670 nm; um painel tem dezenas). [S, cálculo]
- **Comparação publicada:** Grimes 2025 converteu as doses dos estudos de LED em "tempo equivalente de sol" contando só a banda do LED (ex.: 625 a 750 nm para vermelho): de 0,01 a 19,35 h, mediana 3,3 h. [V] Ressalva: contar só a banda estreita torna o sol "fraco"; contar 600 a 1000 nm torna o sol "forte". As duas comparações são legítimas e o ensaio deve dizer qual usa.
- **Ressalvas:** AM1.5 é meio-dia de latitude média sem nuvens; no Brasil, ao meio-dia de verão, o total pode passar de 100 mW/cm²; com nuvem, cai muito. [S]
- **Potencial de widget:** ★★★ Espectro do sol desenhado com a área 600 a 1000 nm pintada, e por cima, na mesma escala, o espectro de um painel (dois picos estreitos em 660 e 850). O leitor vê que a "área" é parecida mas a forma é diferente. Um controle de hora do dia (manhã, meio-dia, fim de tarde) seria um bônus, mas só se houver dado; senão, estático.

### 6.2 Lanterna do celular

- **Estimativa grosseira [NV]:** flash de celular emite algo como 50 a 100 lúmens, ~0,2 a 0,3 W de luz, com espectro de LED branco (pico azul em ~450 nm, banda larga em 500 a 650 nm, quase nada acima de 700 nm). A 10 cm, num cone de ~70°, a irradiância total fica na ordem de 1 a 2 mW/cm², dos quais talvez um quarto acima de 600 nm (~0,3 a 0,5 mW/cm²) e quase zero de NIR.
- **Dado publicado mais próximo:** estudo com flashes de celular para fotografia de retina: emissão de 400 a 750 nm, "sem infravermelho significativo"; irradiância ponderada de 0,58 a 2,30 mW/cm² num arranjo com lente de +20 D a 25 cm (não comparável diretamente). [S] https://pmc.ncbi.nlm.nih.gov/articles/PMC9674527/
- **Leitura:** um painel entrega ~100 vezes mais vermelho que a lanterna do celular, e o sol ~100 vezes mais que a lanterna também. [NV, ordem de grandeza]
- **Potencial de widget:** ★★ Entra no gráfico-escada de 6.5.

### 6.3 Sauna e lâmpadas de calor

- **Sauna tradicional (finlandesa):** aquece pelo ar (80 a 100 °C) e por radiação de pedras quentes; a radiação de um corpo a ~400 °C está quase toda acima de 3 µm. A fração em 600 a 1000 nm é desprezível. [S, Planck]
- **Sauna de "infravermelho distante":** emissores de carbono ou cerâmica com pico em ~5 a 10 µm; idem, quase nada na janela de PBM. [S]
- **Sauna de "infravermelho próximo" (lâmpadas de calor incandescentes ~250 W):** filamento a ~2500 a 2700 K. Pela lei de Planck (cálculo próprio [S]), só **15 a 18%** da radiação cai entre 600 e 1000 nm; **80 a 84%** está acima de 1000 nm (calor). Para comparar: o sol (~5800 K de corpo negro) tem 34% em 600 a 1000 nm.
- **Leitura:** "sauna infravermelha" e "luz vermelha" são coisas físicas diferentes. A sauna é calor; o painel de LED quase não emite acima de 1000 nm. [S]
- **Potencial de widget:** ★★ Três espectros normalizados (sauna de 400 °C, lâmpada de 2700 K, sol de 5800 K, LED 660/850) com a janela de PBM pintada. Estático.

### 6.4 Quando vira só aquecimento

- **Números de aquecimento medidos:**
  - Laser 635/808 nm a ~0,2 W/cm², 6 a 12 J: +0,7 a 1,6 °C, sem percepção pelos voluntários. [V] Souza-Barros 2018
  - Laser 810 nm, 200 mW, doses acima da WALT, pele escura: até +22,3 °C; 8 de 13 pediram para parar. [V] Joensen 2011
  - Laser 1064 nm na testa (Wang 2018): aquecimento da pele medido e reproduzido com aquecedor; o calor sozinho não mudou a CCO, mas mudou a hemodinâmica de forma diferente. [V]
- **Limites de segurança (ANSI Z136.1, exposição máxima permitida da pele para t > 10 s):** 0,2 × C_A W/cm², com C_A = 10^(0,002(λ - 700)) entre 700 e 1050 nm: ≈ **200 mW/cm²** no vermelho e ≈ **330 mW/cm²** em 810 nm. [S, de memória da norma; Souza-Barros e Joensen citam a ANSI como teto] Limiar de dor térmica da pele por volta de 43 a 45 °C. [S, livro-texto]
- **Regra prática da área:** "fotobiomodulação" é por definição não térmica (a nota de escopo do MeSH diz "efeitos que são resposta à luz e não ao calor"). [V] Zein 2018 cita teto de ~100 mW/cm² no tecido; a WALT põe teto de 100 mW/cm² em tendões superficiais. [V] Acima disso e por minutos em área grande, o efeito térmico começa a confundir: o sol inteiro (100 mW/cm²) já aquece a pele de forma perceptível. [S]
- **Ponte para o ensaio:** um painel a 15 cm com 60 a 90 mW/cm² em área de corpo inteiro está no limite da faixa "não térmica"; o calor que a pessoa sente é em parte o que a faz achar que "está funcionando". [S, inferência editorial]
- **Potencial de widget:** ★★ Termômetro vertical com marcações de irradiância (lanterna, máscara, painel a 60 cm, painel a 15 cm, sol, teto ANSI, laser classe 4) e a zona "vira calor" pintada.

### 6.5 A escada de irradiância (o infográfico de escala)

| Fonte | Vermelho+NIR (mW/cm²) | Conf. |
|---|---|---|
| Lanterna de celular a 10 cm | ~0,3 a 0,5 | [NV] |
| Máscara LED doméstica | ~5 a 10 (máx. 10 no ensaio coreano) | [V/S] |
| Painel a 60 cm | ~15 a 25 | [S, modelo + medida] |
| Painel a 30 cm | 23 a 55 | [S] |
| Sol do meio-dia (600 a 1000 nm) | ~40 | [S, cálculo] |
| Painel a 15 cm | 52 a 90 | [S] |
| Teto WALT para tendões superficiais | 100 | [V] |
| Teto ANSI para pele, 810 nm | ~330 | [S] |
| Laser 3B no ponto | centenas a milhares | [S] |

- **Potencial de widget:** ★★★ Escada horizontal em escala log, com ícones. Cada degrau tem o tempo para chegar a 4 J/cm² e a 50 J/cm² (lanterna: horas; painel a 15 cm: ~1 min e ~10 min). Estático com tooltip. É o gráfico que coloca o leitor no mapa.

---

## 7. Lacunas e cuidados para o texto

- Não encontrei revisão da **Nature Reviews** dedicada a PBM nesta pesquisa; as revisões-base são de Hamblin e colaboradores (com conflito de interesse declarado de coautores como James Carroll, dono da THOR Photomedicine) e de Karu. Vale dizer que o campo é pequeno e muito concentrado em poucos grupos. [V para os conflitos declarados em Chung 2012 e Hashmi 2010]
- **Não há** teste independente revisado por pares de painéis de consumo de corpo inteiro. Os números anunciado vs medido vêm de sites com afiliação. [S]
- **Não há** medida direta de ATP em tecido humano após PBM doméstica no que li. [V para ausência no que li]
- Os dados de penetração vêm de cadáveres, crânios secos, poucos voluntários e modelos. O sangue vivo absorve mais que o cadáver.
- Cálculos próprios (sol, Planck, modelo de penetração, queda com distância, epiderme) estão marcados como [S] e devem ser apresentados como estimativa.

## 8. Fontes principais (lista rápida)

- Mester 1968: https://pubmed.ncbi.nlm.nih.gov/5732466/
- Whelan 2001: https://pubmed.ncbi.nlm.nih.gov/11776448/
- Anders 2015: https://pubmed.ncbi.nlm.nih.gov/25844681/
- MeSH D028022: https://id.nlm.nih.gov/mesh/D028022.html
- Karu 1999: https://pubmed.ncbi.nlm.nih.gov/10365442/
- Karu & Kolyakov 2005: https://pubmed.ncbi.nlm.nih.gov/16144476/
- Karu 2005 (NO): https://pubmed.ncbi.nlm.nih.gov/15739174/
- Mason 2014: https://pubmed.ncbi.nlm.nih.gov/25175349/
- Wang 2017 (CCO in vivo): https://pubmed.ncbi.nlm.nih.gov/28178891/
- Wang 2018 (controle de calor): https://pubmed.ncbi.nlm.nih.gov/28948191/
- de Freitas & Hamblin 2016: https://pubmed.ncbi.nlm.nih.gov/28070154/
- Hamblin 2017 (anti-inflamatório): https://pubmed.ncbi.nlm.nih.gov/28748217/
- Hamblin 2018 (redox): https://pubmed.ncbi.nlm.nih.gov/29164625/
- Lima 2019: https://pubmed.ncbi.nlm.nih.gov/30927704/
- Quirk & Whelan 2020: https://pubmed.ncbi.nlm.nih.gov/32716711/
- Chen 2011: https://pubmed.ncbi.nlm.nih.gov/21814580/
- Sharma 2011: https://pubmed.ncbi.nlm.nih.gov/21956634/
- Wang 2017 (810 vs 980): https://pubmed.ncbi.nlm.nih.gov/27751953/
- Sommer 2018 e 2019: https://pubmed.ncbi.nlm.nih.gov/29570422/ ; https://pubmed.ncbi.nlm.nih.gov/31032294/
- Huang 2009: https://pubmed.ncbi.nlm.nih.gov/20011653/
- Huang 2011: https://pubmed.ncbi.nlm.nih.gov/22461763/
- Demidova-Rice 2007: https://pubmed.ncbi.nlm.nih.gov/17960752/
- Lanzafame 2007: https://pubmed.ncbi.nlm.nih.gov/17659591/
- Zein 2018: https://pubmed.ncbi.nlm.nih.gov/30550048/
- Hashmi 2010: https://pubmed.ncbi.nlm.nih.gov/20662021/
- WALT 2010: https://waltpbm.org/wp-content/uploads/2021/08/Dose_table_780-860nm_for_Low_Level_Laser_Therapy_WALT-2010.pdf
- Tedford 2015: https://pubmed.ncbi.nlm.nih.gov/25772014/
- Jagdeo 2012: https://pubmed.ncbi.nlm.nih.gov/23077622/
- Lapchak 2015: https://pubmed.ncbi.nlm.nih.gov/26039354/
- Salehpour 2019: https://pubmed.ncbi.nlm.nih.gov/31553265/
- Pitzschke 2015: https://pubmed.ncbi.nlm.nih.gov/25789711/
- Henderson & Morries 2015: https://pubmed.ncbi.nlm.nih.gov/26346298/
- Ash 2017: https://pubmed.ncbi.nlm.nih.gov/28900751/
- Jacques 2013: https://pubmed.ncbi.nlm.nih.gov/23666068/
- Souza-Barros 2018: https://pubmed.ncbi.nlm.nih.gov/29178437/
- Joensen 2011: https://pubmed.ncbi.nlm.nih.gov/21219241/
- Heiskanen & Hamblin 2018: https://pubmed.ncbi.nlm.nih.gov/30044464/
- Kim & Calderhead 2011: https://pubmed.ncbi.nlm.nih.gov/24155530/
- Jenkins & Carroll 2011: https://pubmed.ncbi.nlm.nih.gov/22107486/
- Grimes 2025: https://pubmed.ncbi.nlm.nih.gov/41032498/
- Cronshaw 2025: https://pubmed.ncbi.nlm.nih.gov/39996950/
- Baeza-Moyano 2026: https://link.springer.com/article/10.1007/s43630-026-00908-x
- LightTherapyIQ: https://www.lighttherapyiq.com/best/best-red-light-therapy-panels
- Light Therapy Insiders: https://www.lighttherapyinsiders.com/red-light-therapy-panel-comparison/
- ASTM G173: https://raw.githubusercontent.com/pvlib/pvlib-python/main/pvlib/data/ASTMG173.csv
- OMLC hemoglobina e água: https://omlc.org/spectra/hemoglobin/summary.html ; https://omlc.org/spectra/water/data/hale73.txt
