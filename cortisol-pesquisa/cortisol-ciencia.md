# Cortisol: a biologia central, em números que viram gráficos

Dossiê de apoio para o ensaio interativo "Como baixar o cortisol (e se você deveria)" (estilo ciechanow.ski / The Pudding). Pesquisa feita em 12 nov 2026. Pauta em `temas-pesquisa/temas-nov-2026.md`, seção 3.

Escopo: o eixo HPA, a curva diária, as respostas agudas, a medição, as doenças de verdade (Cushing, Addison), o estresse crônico e as diferenças individuais. Fora do escopo: suplementos e "hacks" (ashwagandha, magnésio, "cortisol cocktail"), "cortisol face" nas redes e dados de busca, que ficam com outros dossiês.

**Legenda de confiabilidade**
- **[V]**: verificado na fonte primária (abstract, texto completo ou tabela lidos nesta pesquisa).
- **[S]**: confirmado só em fontes secundárias confiáveis (revisão, livro-texto, imprensa, resumo de terceiros), ou é conhecimento de livro-texto que não reli na fonte.
- **[NV]**: não verificado, de memória ou de fonte fraca. Conferir antes de publicar.

Observação de método: os abstracts foram lidos pela API E-utilities do NCBI. URLs no formato `https://pubmed.ncbi.nlm.nih.gov/<PMID>/`. O texto completo de Dickerson & Kemeny 2004 foi lido em PDF (cópia de curso da Univ. de Wisconsin). A tabela de referência do CIRCORT foi lida no texto completo da PMC.

Conversões úteis: cortisol sérico 1 µg/dL = 27,6 nmol/L. Cortisol salivar costuma vir em nmol/L e é uma ordem de grandeza menor que o sérico (mede só a fração livre).

---

## 0. Cinco números para abrir o ensaio

| Número | O que é | Fonte |
|---|---|---|
| ~10 mg/dia | Quanto cortisol um adulto saudável fabrica por dia (9,9 ± 2,7 mg) | Esteban 1991 [V] |
| 15,5 → <2 µg/dL | Do pico das 8h30 ao vale da meia-noite no sangue: queda de ~8 vezes, todo dia | Debono 2009 [V] |
| 2 a 26 nmol/L | Faixa normal (5º a 95º percentil) de cortisol salivar 1 h após acordar num adulto de 21 a 30 anos: uma faixa "normal" de 13 vezes | CIRCORT, Miller 2016 [V] |
| d = 0,92 vs 0,32 | Uma tarefa com plateia julgando E sem controle sobre o resultado gera quase 3 vezes mais cortisol que só uma das duas coisas | Dickerson & Kemeny 2004 [V] |
| ~10.000 vs ~3 por milhão | Pessoas tomando corticoide oral num dado momento (cerca de 1% dos adultos) vs casos novos de Cushing endógeno por ano | Fardet 2011, Overman 2013, Wengander 2019 [V] |

---

## 1. O que o cortisol é e faz

### 1.1 O eixo HPA em três andares

- **Achado:** o cortisol é o fim de uma cascata de três estações. O hipotálamo (núcleo paraventricular) libera CRH (e vasopressina). A hipófise anterior responde com ACTH. O córtex da adrenal (zona fasciculada) fabrica cortisol a partir do colesterol. O cortisol volta e freia os andares de cima (retroalimentação negativa) no hipotálamo, na hipófise e no hipocampo. [S, livro-texto]
- **Números de tempo:** na meta-análise de Dickerson & Kemeny, o ACTH tem pico 11 a 20 min após o início do estressor e "precede o cortisol em aproximadamente 10 a 20 min". O cortisol tem pico 21 a 40 min após o início. [V] https://pubmed.ncbi.nlm.nih.gov/15122924/
- **Freio rápido:** em homens saudáveis com sangue coletado a cada 10 min, uma infusão de prednisolona inibiu os pulsos de ACTH e cortisol **em até 30 min**. O efeito passa pelo receptor GR (bloqueado por antagonista de GR, não de MR), na hipófise. Um pulso já iniciado não é interrompido. [V] Russell et al. 2010, J Neurosci. https://pubmed.ncbi.nlm.nih.gov/20427668/
- **Quanto se produz:** produção diária medida por diluição de isótopo estável em 12 voluntários: **9,9 ± 2,7 mg/dia** (5,7 mg/m²/dia), menor do que se acreditava. A produção também varia ao longo do dia. [V] Esteban et al. 1991, JCEM. https://pubmed.ncbi.nlm.nih.gov/1986026/
- **Meia-vida:** depois de cortisol intravenoso em 4 homens, a meia-vida da fase lenta foi de **66 ± 18 min**. [V] Kraan et al. 1997. https://pubmed.ncbi.nlm.nih.gov/9449215/
- **Fração livre:** em plasma normal, o cortisol livre é **menos de 6%** do total. 80 a 90% vão ligados à CBG (globulina ligadora de corticosteroides) e o resto à albumina. [V] Lewis 2005. https://pubmed.ncbi.nlm.nih.gov/15904907/ Bhake 2020 (JCEM) arredonda para "aproximadamente 95% ligado". [V] https://pubmed.ncbi.nlm.nih.gov/31529059/
- **Ressalvas:** a CBG sobe com estrogênio (anticoncepcional oral, gravidez), o que eleva o cortisol total no sangue sem mudar o livre. É uma armadilha clássica de exame. [S]
- **Potencial de widget:** ★★★ "Simulador do termostato HPA" (já na pauta). Três caixas empilhadas (hipotálamo, hipófise, adrenal) com setas de ida e uma seta de volta (o freio). O leitor aperta "estressor" e vê o ACTH subir primeiro e o cortisol 10 a 20 min depois. O freio desliga o sistema em ~1 h. Um controle "freio fraco" (menos GR) faz a curva demorar a voltar, o que ilustra a ideia de estresse crônico. A interação ensina aqui, porque o atraso entre ACTH e cortisol e o efeito do freio são dinâmicos.

### 1.2 Dois receptores, duas sensibilidades (MR vs GR)

- **Achado:** o cérebro tem dois receptores para o mesmo hormônio. O receptor mineralocorticoide (MR) tem afinidade alta (Kd ≈ 0,5 nM no rato). O receptor glicocorticoide (GR) tem afinidade **6 a 10 vezes menor** (Kd ≈ 2,5 a 5 nM).
- **Números de ocupação (rato):** o MR fica **89,5%** ocupado já no vale do ciclo diário, 88,7% no pico e 97,6% após 1 h de contenção. O GR quase não é ocupado no basal e chega a 50% de ocupação com níveis de ~25 µg/100 mL, "na faixa atingida após estresse ou no pico diário". Conclusão dos autores: o MR dá um tom constante ("permissivo") e o GR é o detector de picos. [V] Reul & de Kloet 1985, Endocrinology. https://pubmed.ncbi.nlm.nih.gov/2998738/
- **Ressalvas:** dados de rato (corticosterona). Em humanos, o princípio vale e é base da teoria MR/GR (de Kloet, Joëls e Holsboer 2005, Nat Rev Neurosci) [S].
- **Potencial de widget:** ★★★ Infográfico simples, sem interação: duas curvas de ocupação (MR e GR) contra o nível de cortisol, com três marcas verticais ("vale da noite", "pico da manhã", "prova oral"). O MR já está cheio na primeira marca. O GR só enche nas duas últimas. Explica num gráfico por que "um pouco de cortisol" e "muito cortisol" fazem coisas diferentes.

### 1.3 Funções, com o tom certo: mobilização, não vilania

- **Energia:** estimula a gliconeogênese no fígado, a lipólise e o catabolismo de proteína muscular para fornecer substrato. Antagoniza a insulina. [S, livro-texto]
- **Imunidade:** suprime inflamação (por isso é remédio). Nas doses fisiológicas, modula e redistribui células imunes em vez de "desligar" o sistema. [S]
- **Pressão arterial:** é permissivo para o efeito das catecolaminas no vaso. Na falta de cortisol (crise adrenal), a pressão desaba. [S] O resumo da Lancet sobre insuficiência adrenal lista hipotensão postural entre os sinais cardinais. [V] https://pubmed.ncbi.nlm.nih.gov/33484633/
- **Memória em U invertido:** níveis moderados ajudam a consolidar memórias emocionais, enquanto níveis muito baixos ou muito altos atrapalham, sobretudo a evocação. A revisão de Lupien et al. 2007 (Brain Cogn) cobre "psicose esteroide", efeitos exógenos e endógenos. [V para a existência e o escopo da revisão; S para a forma em U, que não aparece no abstract] https://pubmed.ncbi.nlm.nih.gov/17466428/
- **Sinal de relógio:** o pico matinal sincroniza relógios periféricos (fígado, músculo, células imunes). Adam et al. 2017 propõem que curvas achatadas "refletem e contribuem para" a desregulação desses relógios. [V para a proposta] https://pubmed.ncbi.nlm.nih.gov/28578301/
- **Da primeira frase do Selye:** os animais sob agressões variadas formavam a mesma síndrome, o que levou à ideia de uma resposta inespecífica ao estresse. [V, ver 1.4]
- **Potencial de widget:** ★★ Um corpo desenhado com cinco ícones (fígado, vaso, células imunes, hipocampo, relógio). Passando o mouse sobre cada um aparece "o que o cortisol faz aqui" e "o que acontece se falta / se sobra". Funciona como infográfico estático com legendas.

### 1.4 História em três datas

- **1936, Selye e o "stress":** carta na Nature 138:32, de 4 de julho de 1936, "A Syndrome produced by Diverse Nocuous Agents". Ratos expostos a frio, cirurgia, choque espinhal, exercício excessivo ou drogas em doses subletais mostravam a mesma síndrome (adrenais aumentadas, timo encolhido, úlceras). Selye usou a palavra "stress", e o editor teria sugerido trocar por "alarm reaction". Ele também teria escrito "noxious", e o editor trocou por "nocuous". [S] https://www.nature.com/articles/138032a0 ; https://www.stress.org/about/hans-selye-birth-of-stress
- **1948, a cortisona na artrite reumatoide:** em 21 de setembro de 1948, na Mayo Clinic, Philip Hench e Charles Slocumb deram 100 mg do "Composto E" de Kendall a uma paciente de 29 anos ("Mrs. G"). No terceiro dia restavam poucos sintomas. Hench e Kendall rebatizaram o composto de "cortisona". [S] https://history.mayoclinic.org/wp-content/uploads/2022/11/1950.pdf ; https://libraryguides.mayo.edu/historicalunit/cortisone
- **1950, o Nobel:** Kendall, Hench e Tadeus Reichstein dividiram o Nobel de Fisiologia ou Medicina de 1950 pelas descobertas sobre os hormônios do córtex adrenal. O site da Nobel bloqueou a leitura automática. [S]
- **Ressalva para o texto:** a cortisona é um pró-hormônio. Ela precisa ser convertida em cortisol (pela 11β-HSD1) para agir. [S]
- **Potencial de widget:** ★★ Linha do tempo de 1936 a 2026: Selye → Composto E → Nobel → teste de supressão com dexametasona na depressão (1981) → CAR (1997) → cortisol no cabelo (anos 2000) → medidores caseiros (CES 2026). Arco narrativo: de remédio milagroso a "vilão" das redes.

---

## 2. A curva diária

### 2.1 A curva no sangue: os parâmetros oficiais

- **Achado:** em 33 voluntários saudáveis com perfis de 24 h:
  - **pico 15,5 µg/dL** (faixa de referência de 95%: 11,7 a 20,6), ≈ 428 nmol/L;
  - **acrofase às 08h32** (IC95% 07h59 a 09h05);
  - **vale < 2 µg/dL** (1,5 a 2,5), ≈ 55 nmol/L;
  - **horário do vale: 00h18** (IC95% 23h39 a 00h58);
  - **fase quiescente** (abaixo da média do dia): **19h43 a 05h31**.
- [V] Debono et al. 2009, JCEM. https://pubmed.ncbi.nlm.nih.gov/19223520/
- **Ressalvas:** amostra pequena e jovem. A amplitude é de ~8 vezes num mesmo dia, todo dia. A subida começa por volta das 2h a 3h, ainda durante o sono [S].
- **Potencial de widget:** ★★★ É a espinha dorsal do "Relógio do cortisol" da pauta. A curva-base de 24 h é desenhada com estes cinco pontos e interpolação suave, com uma faixa sombreada para a fase quiescente. Ver 2.6 para os eventos que deformam a curva.

### 2.2 A curva na saliva: faixas de referência de 18.698 pessoas (CIRCORT)

- **Achado:** o banco CIRCORT junta 15 estudos de campo, com **104.623 amostras** de **18.698 pessoas** de 0,5 a 98,5 anos. As faixas são calibradas por LC-MS/MS, com o despertar fixado às 07h00. [V] Miller et al. 2016, Psychoneuroendocrinology. https://pubmed.ncbi.nlm.nih.gov/27448524/ ; texto completo: https://pmc.ncbi.nlm.nih.gov/articles/PMC5108362/
- **Medianas (nmol/L) por horas após acordar, adultos de 21 a 30 anos** [V]:

| Horas após acordar | 1 h | 3,5 h | 6 h | 8,5 h | 11 h | 13,5 h | 16 h |
|---|---|---|---|---|---|---|---|
| Mulheres 21 a 30 | 7,5 | 4,1 | 2,4 | 1,6 | 1,1 | 0,8 | 0,7 |
| Homens 21 a 30 | 7,1 | 3,9 | 2,3 | 1,5 | 1,0 | 0,8 | 0,7 |
| Homens > 80 | 8,8 | 4,8 | 2,8 | 1,8 | 1,3 | 1,0 | 0,8 |

- **Percentis 5 / 50 / 95 (nmol/L)** [V]:
  - Mulheres de 21 a 30 anos, 1 h após acordar: **2,1 / 7,5 / 26,7**. Às 16 h: **0,2 / 0,7 / 2,5**.
  - Homens de 21 a 30 anos, 1 h após acordar: **2,0 / 7,1 / 25,3**. Às 16 h: 0,2 / 0,7 / 2,4.
  - Os outros horários estão na Tabela 3 do artigo.
- **Estação do ano:** o cortisol foi **10,5% menor no outono** que na primavera. No verão foi −5,2%, e no inverno a diferença foi nula. [V]
- **De onde vem a variação:** pelos componentes da Tabela 2 (cálculo meu), ~23% da variância está entre pessoas, ~19% entre estudos e ~54% é residual (dentro da pessoa e do dia). [V para os componentes, cálculo próprio]
- **Ressalvas:**
  - A faixa normal é enorme: do 5º ao 95º percentil vai um fator de **~13 vezes** no mesmo horário.
  - Os dados do CIRCORT são de campo (sem supervisão do horário da coleta).
  - A sazonalidade vem de estudos do hemisfério norte. No Brasil, "primavera" seria setembro a novembro, e não testei isso.
- **Potencial de widget:** ★★★ "Seu número cabe em quase tudo". Um gráfico de faixas (leque de percentis 5, 25, 50, 75 e 95) ao longo do dia. O leitor digita um valor de saliva e um horário, e o gráfico mostra onde ele cai. A lição é que quase qualquer número caseiro cai dentro do normal ou perto dele. É um ótimo antídoto para o medidor caseiro.

### 2.3 A resposta ao despertar (CAR)

- **Definição:** "o aumento acentuado da secreção de cortisol nos primeiros **30 a 45 min** após o despertar matinal". [V] Stalder et al. 2016, consenso de especialistas (ISPNE). https://pubmed.ncbi.nlm.nih.gov/26563991/
- **Tamanho:**
  - Em adultos saudáveis, o cortisol livre salivar sobe **50 a 160%** nos primeiros 30 min (aumento médio de ~9 nmol/L, faixa 4 a 15), "equivalente a cerca de três episódios secretórios". [V] Clow et al. 2004, Stress. https://pubmed.ncbi.nlm.nih.gov/15204030/
  - Valores absolutos: 4,7 a 18,5 nmol/L ao acordar e 8,6 a 21,9 nmol/L 30 min depois, "sem normas acordadas". [V] (Clow 2004)
  - Em 509 adultos, aumento médio de **~50% em 30 min** e taxa de "respondedores" de **~75%**. [V] Wüst et al. 2000. https://pubmed.ncbi.nlm.nih.gov/12689474/
  - Em crianças, adultos e idosos (n = 152), aumento de **50 a 75%** em 30 min. Mulheres na pré-menopausa tiveram aumento maior e pico mais tardio. [V] Pruessner et al. 1997. https://pubmed.ncbi.nlm.nih.gov/9416776/
- **Função proposta:** antecipação do dia que começa ("boost" de preparação). Fries et al. 2009 sustentam que a antecipação do dia é central para o tamanho da CAR. [V para a hipótese] https://pubmed.ncbi.nlm.nih.gov/18854200/
- **Ressalvas:**
  - A CAR é muito sensível ao horário real da coleta: atrasar a primeira amostra em 5 a 15 min já distorce o resultado. O consenso de 2016 pede verificação objetiva do horário (actigrafia, frascos eletrônicos).
  - Cerca de 1 em cada 4 pessoas não mostra CAR num dado dia.
- **Potencial de widget:** ★★★ Zoom da curva do relógio na primeira hora após acordar. Uma lupa sobre os primeiros 45 min mostra o "degrau" de +50 a 160%. Um alerta "coletou 15 min atrasado?" mostra como a medida muda.

### 2.4 Pulsos de hora em hora (ritmo ultradiano)

- **Achado:** a curva lisa de 24 h é uma ilusão de amostragem. O cortisol sai da adrenal em **pulsos aproximadamente horários**. A curva circadiana é a modulação da amplitude desses pulsos. [V] Spiga, Walker, Terry & Lightman 2014, Compr Physiol. https://pubmed.ncbi.nlm.nih.gov/24944037/
  - Weitzman et al. 1971 (JCEM) descreveram pela primeira vez a secreção "episódica" em 24 h com amostras a cada 20 min. [V para título e existência; o número de episódios por dia (~7 a 9 na literatura secundária) é S] https://pubmed.ncbi.nlm.nih.gov/4326799/
  - Microdiálise contínua com amostra a cada 10 min mostrou atividade pulsátil "clara" na hora do almoço. [V] Bhake 2020.
- **Por que importa (rato):** a resposta ao estresse depende da fase do pulso em que o estressor chega. É maior na subida que na descida, e uma infusão constante (sem pulsos) embota a resposta. [V] Sarabdjitsingh et al. 2010, Endocrinology. https://pubmed.ncbi.nlm.nih.gov/20861228/
- **Ressalvas:** a saliva coletada uma vez cai num ponto aleatório de um pulso, o que é mais uma fonte de ruído para a medida isolada.
- **Potencial de widget:** ★★★ Um "zoom de microscópio" no relógio. Ao ampliar uma janela de 4 h, a curva lisa se revela uma série de dentes. Funciona como animação de rolagem sem controles, e ensina que "a curva" é uma média.

### 2.5 Quanto do seu número é você e quanto é o dia

- **Achado:** a CAR de um único dia é "determinada em grande parte por fatores situacionais e só em pequena proporção por fatores de traço". São necessários **de 2 dias (AUCg) a 6 dias (AUCi)** de coleta para uma medida confiável de traço. [V] Hellhammer et al. 2007. https://pubmed.ncbi.nlm.nih.gov/17127010/
- **Confiabilidade entre visitas:**
  - Um **único cortisol salivar às 8h** teve a pior confiabilidade: **R = 0,18 a 0,47**.
  - A curva completa (várias amostras do despertar à meia-noite) teve r = 0,63 a 0,84, e o cortisol salivar das 23h teve r = 0,78.
  - [V] Golden et al. 2011, Eur J Epidemiol. https://pubmed.ncbi.nlm.nih.gov/21533585/
- **Meta-análise de 2023** (11 estudos, n = 3.307, mais 2 amostras novas): o ICC dia a dia variou de **0,00 a 0,75** conforme a métrica. A CAR tem confiabilidade "insuficiente para pesquisa de diferenças individuais". A AUCg é "razoável a boa". [V] Norton et al. 2023, Compr Psychoneuroendocrinol. https://pubmed.ncbi.nlm.nih.gov/37635863/
- **Estabilidade da CAR entre dias:** r = 0,39 a 0,67 (Pruessner 1997) e até r = 0,63 (Wüst 2000). [V]
- **Ressalvas:** não achei um coeficiente de variação (CV) dia a dia de referência consolidado [NV]. Os ICCs acima são a forma mais honesta de dizer isso.
- **Potencial de widget:** ★★★ "O que um teste de saliva te diz" (pauta). Simular 14 dias de uma pessoa saudável usando a curva do CIRCORT, com variância dentro da pessoa ≈ 2 vezes a variância entre pessoas (2.2). Cada clique em "medir hoje às 8h" sorteia um ponto. Depois de 10 cliques, o leitor vê os pontos espalhados por metade da faixa normal. Um segundo modo mostra a média de 6 dias, que converge. Aqui a interação ensina.

### 2.6 O que deforma a curva (insumos para o "Relógio do cortisol")

| Evento | Efeito medido | Fonte | Confiab. |
|---|---|---|---|
| Acordar | +50 a 160% em 30 a 45 min | Clow 2004; Stalder 2016 | [V] |
| Estressor social com plateia e sem controle (TSST) | 2 a 4 vezes o basal salivar, pico 21 a 40 min após início, volta ao basal 41 a 60 min após o fim | Kirschbaum 1993; Dickerson 2004 | [V] |
| Exercício 30 min a 40% VO2máx | +5,7% (não significativo; corrigido pelo volume plasmático, cai) | Hill 2008 | [V] |
| Exercício 30 min a 60% VO2máx | +39,9% | Hill 2008 | [V] |
| Exercício 30 min a 80% VO2máx | +83,1% | Hill 2008 | [V] |
| Repouso (controle) | −6,6% (queda circadiana normal) | Hill 2008 | [V] |
| Cafeína em quem se abstém (250 mg × 3) | aumento "robusto" ao longo do dia | Lovallo 2005 | [V, sem % no abstract] |
| Cafeína em consumidor habitual (300 a 600 mg/dia) | a dose da manhã não sobe mais nada; a da tarde ainda sobe | Lovallo 2005 | [V] |
| Refeição do meio-dia | pico pós-almoço; maior em mulheres após cafeína | Lovallo 2006; Bhake 2020 | [V, qualitativo] |
| Noite parcial (dormir 4h a 8h) ou noite em claro | cortisol da noite seguinte (18h a 23h) +37% e +45%; fase quiescente atrasa ≥ 1 h | Leproult 1997 | [V] |
| 6 noites de 4 h | cortisol vespertino elevado (p = 0,0001) | Spiegel 1999 | [V] |
| Voo para leste com −7 h | cortisol ao acordar abaixo do controle do dia 2 ao dia 9 com placebo; dias 2 a 5 com melatonina ou cafeína lenta | Piérard 2001 | [V] |
| Trabalho noturno | o período quiescente se desloca de forma diferente conforme o cronotipo (matutinos perdem mais) | Griefahn & Robens 2010 | [V] |

Detalhes e ressalvas de cada linha nas seções 3.x.

---

## 3. Respostas agudas

### 3.1 O Trier Social Stress Test (TSST)

- **Protocolo:** 10 min de antecipação mais 10 min de discurso livre e aritmética mental (contar de 13 em 13 para trás a partir de 1.022) diante de uma banca que não sorri. O resultado: "elevações de **2 a 4 vezes** sobre o basal" no cortisol salivar, com picos parecidos entre estudos. [V para os 2 a 4 vezes e o formato; S para o "1.022 de 13 em 13"] Kirschbaum, Pirke & Hellhammer 1993. https://pubmed.ncbi.nlm.nih.gov/8255414/
- **Quem responde:** o critério clássico de "respondedor" (aumento ≥ 2,5 nmol/L) é conservador demais e gera **16,5% de falsos negativos**. Os autores propõem **1,5 nmol/L** ou **+15,5%**. [V] Miller et al. 2013, Psychosom Med (n = 504). https://pubmed.ncbi.nlm.nih.gov/24184845/
- **Variação de protocolo:** uma meta-análise de 186 estudos (237 subamostras) testou variações do TSST. Encurtar o tempo de preparação do discurso não mudou a resposta. [V] Goodman et al. 2017. https://pubmed.ncbi.nlm.nih.gov/28292684/
- **Potencial de widget:** ★★ Curva de cortisol salivar de um TSST típico (basal ~5 nmol/L, pico ~12 a 15 nmol/L em ~+30 min, volta ~+70 min) sobreposta à curva do dia. A escala relativa (2 a 4 vezes) é [V]; os valores absolutos do exemplo são [NV], então reconstruir a partir de uma figura publicada antes de desenhar.

### 3.2 O que de fato liga o cortisol: Dickerson & Kemeny 2004

- **Achado:** meta-análise de **208 estudos** de laboratório. [V, texto completo] https://pubmed.ncbi.nlm.nih.gov/15122924/
  - **Efeito médio geral: d = 0,31** (IC 0,22 a 0,40), "pequeno".
  - **Por tipo de tarefa:**
    - tarefa cognitiva: d = 0,20;
    - falar em público: d = 0,39;
    - falar em público + tarefa cognitiva: **d = 0,87**;
    - indução de emoção (filmes etc.): **d = −0,13** (n.s.);
    - ruído: **d = −0,06** (n.s.).
  - **Por ingrediente psicológico:**
    - desempenho com **avaliação social E incontrolabilidade: d = 0,92** (IC 0,70 a 1,14);
    - só incontrolabilidade: d = 0,32;
    - só avaliação social: d = 0,35.
    - O combinado é "quase 3 vezes" cada componente sozinho.
  - **Curso temporal:** pico **21 a 40 min após o início**.
    - Após o fim do estressor: d = 0,38 (0 a 20 min), d = 0,26 (21 a 40 min), d = −0,05 (41 a 60 min). O cortisol volta ao basal em 41 a 60 min.
    - Com os dois ingredientes, a elevação ainda era d = 0,74 de 21 a 40 min após o fim, "quase 7 vezes" maior que as outras categorias.
  - **Hora do dia:** estudos de manhã d = 0,14; à tarde d = 0,46. É mais difícil ver a resposta de manhã, quando o nível já está alto e caindo.
  - **Achado contraintuitivo:** a **sensação subjetiva de estresse não diferiu** entre tarefas com e sem avaliação social ou incontrolabilidade. Mesmo assim, o cortisol foi muito diferente. O cortisol não é um "medidor de nervosismo".
- **Ressalvas:**
  - Os estudos são de laboratório, em sua maioria com jovens universitários.
  - Os autores também destacam que o resultado contradiz "a crença de que o cortisol responde a todos os tipos de estressores".
- **Potencial de widget:** ★★★ "O que liga o alarme". Uma matriz 2 × 2 (avaliação social sim/não × controle sim/não) com barras de d. O quadrante "plateia + sem controle" tem uma barra de 0,92, quase 3 vezes as vizinhas. Ao lado, barras de "filme triste" e "barulho" coladas no zero. É um infográfico sem interação e talvez o gráfico mais surpreendente do ensaio.

### 3.3 Exercício: o limiar de ~60% do VO2máx

- **Achado:** 12 homens ativos fizeram 30 min a 40, 60 e 80% do VO2máx, mais um controle em repouso.
  - Variação do cortisol do início ao fim: repouso −6,6 ± 3,5%; 40%: +5,7 ± 11,0%; **60%: +39,9 ± 11,8%**; **80%: +83,1 ± 18,5%**.
  - O ACTH só subiu de forma significativa a 80%.
  - Parte do aumento é hemoconcentração: o volume plasmático caiu 9,9%, 15,6% e 17,2%, respectivamente.
  - Corrigido, o exercício leve **reduz** o cortisol.
- [V] Hill et al. 2008, J Endocrinol Invest. https://pubmed.ncbi.nlm.nih.gov/18787373/
- **Ressalvas:** n = 12 homens treinados. Em treino de resistência longo (> 60 min), o cortisol sobe mesmo em intensidade moderada [S]. E o aumento agudo pós-treino é adaptativo, não um problema.
- **Potencial de widget:** ★★ Quatro barras (repouso, 40, 60, 80%) com a barra "fantasma" da hemoconcentração. A mensagem é que o treino forte sobe o cortisol de propósito e o leve o baixa.

### 3.4 Cafeína: tolerância parcial

- **Achado:** 96 adultos em ensaio cruzado duplo-cego de 4 semanas.
  - Após 5 dias de abstinência, a cafeína (250 mg às 9h, 13h e 18h) causou "aumento robusto do cortisol ao longo do dia" (p < 0,0001).
  - Com consumo diário de 300 ou 600 mg, a resposta à dose das 9h foi **abolida**. A dose das 13h ainda elevou o cortisol entre 13h e 19h.
  - Conclusão: a tolerância é parcial.
- [V] Lovallo et al. 2005, Psychosom Med. https://pubmed.ncbi.nlm.nih.gov/16204431/
- **Mais:** a cafeína somou-se ao estresse mental. Exercício sozinho (no protocolo deles) não subiu o cortisol, mas cafeína antes do exercício subiu. [V] Lovallo et al. 2006. https://pubmed.ncbi.nlm.nih.gov/16631247/
- **Ressalvas:** os abstracts não dão o % de aumento. Um número de ~30% circula, mas não verifiquei [NV]. Para o "café em jejum aumenta o cortisol" do TikTok, o efeito existe, mas é menor em quem já toma café todo dia.
- **Potencial de widget:** ★★ Duas curvas lado a lado ("não toma café" vs "toma 3 cafés por dia") com três xícaras clicáveis no eixo do tempo. Na curva do habitual, a xícara da manhã não faz nada.

### 3.5 Sono curto e fuso horário

- **Sono curto:**
  - Em jovens com perfis de cortisol de 32 h, a privação parcial (dormir das 4h às 8h) e a total elevaram o cortisol da **noite seguinte** (18h a 23h) em **37% e 45%** (p = 0,03 e 0,003).
  - O início da fase quiescente atrasou **pelo menos 1 h**.
  - Não houve mudança na manhã.
  - Interpretação dos autores: falha da retroalimentação negativa.
  - [V] Leproult et al. 1997, Sleep. https://pubmed.ncbi.nlm.nih.gov/9415946/
- **Débito crônico:** 11 jovens com 4 h na cama por 6 noites, comparados à fase de recuperação (12 h por 6 noites), tiveram cortisol vespertino elevado (p = 0,0001), pior tolerância à glicose e mais atividade simpática. [V] Spiegel, Leproult & Van Cauter 1999, Lancet. https://pubmed.ncbi.nlm.nih.gov/10543671/
- **Jet lag:** 27 militares em voo para leste com perda de 7 h. No grupo placebo, o cortisol ao acordar ficou abaixo do controle do dia 2 ao dia 9. Com melatonina 5 mg ou cafeína de liberação lenta 300 mg, a diferença durou só do dia 2 ao 5. [V] Piérard et al. 2001. https://pubmed.ncbi.nlm.nih.gov/11513308/
- **Turno da noite:** em trabalho noturno simulado com luz forte, o período quiescente do cortisol encurtou nos matutinos e alongou nos vespertinos. Os autores sugerem desvantagem para matutinos. [V] Griefahn & Robens 2010. https://pubmed.ncbi.nlm.nih.gov/19911191/
- **Ressalvas:** os estudos de sono são pequenos e só com homens. O efeito noturno de +37 a 45% é sobre uma base baixa (o vale), então em termos absolutos é modesto.
- **Potencial de widget:** ★★★ Botão "noite mal dormida" no relógio. A cauda da curva à noite levanta e o vale se desloca 1 h para a direita. O botão "voo São Paulo → Lisboa" desloca a curva inteira e mostra os "9 dias para realinhar".

---

## 4. Medição

### 4.1 Sangue, saliva, urina, cabelo: quatro janelas de tempo

| Matriz | Mede | Janela | Uso clínico | Fonte |
|---|---|---|---|---|
| Soro | cortisol total (ligado + livre) | instantâneo | 8h para insuficiência; pós-dexametasona para Cushing | Nieman 2008 [V] |
| Saliva | cortisol livre (ativo) | instantâneo (~minutos) | **saliva da meia-noite (23h a 24h)**: sensibilidade e especificidade > 90% para Cushing endógeno | Raff 2009 [V] |
| Urina 24 h | cortisol livre acumulado | 1 dia | rastreio de Cushing | Nieman 2008 [V] |
| Cabelo | cortisol incorporado na fibra | ~1 cm por mês, então 3 cm ≈ 3 meses | pesquisa; promissor para Cushing cíclico | Stalder 2017 [V]; taxa de crescimento [S] |

- **Saliva como reflexo do livre:** "a avaliação do cortisol na saliva provou ser um reflexo válido e confiável do respectivo hormônio livre no sangue". [V] Kirschbaum & Hellhammer 1994. https://pubmed.ncbi.nlm.nih.gov/8047637/
- **Diretriz da Endocrine Society (2008):**
  - Primeiro, excluir uso de glicocorticoide exógeno.
  - Testar só quem tem múltiplos sinais progressivos e discriminativos.
  - Usar 1 teste de alta acurácia: urina de 24 h, saliva da noite, ou supressão com 1 mg de dexametasona.
  - Se der anormal, confirmar com um segundo teste.
  - [V] Nieman et al. 2008. https://pubmed.ncbi.nlm.nih.gov/18334580/
- **Ressalvas:** o ponto clínico mais forte do cortisol salivar é a **noite**, não a manhã. É o vale que denuncia o Cushing, não o pico. Um medidor caseiro usado de manhã olha para a parte menos informativa da curva.
- **Potencial de widget:** ★★ Infográfico de "réguas de tempo": quatro barras horizontais (minutos, minutos, 1 dia, 3 meses) para mostrar que cada matriz responde a uma pergunta diferente.

### 4.2 Cabelo: o que o cortisol de meses mostra

- **Achado:** meta-análise com 66 estudos (124 subamostras, N = 10.289).
  - Grupos expostos a estresse têm cortisol capilar **22% maior** no total.
  - Com estresse ainda em curso, a diferença é **+43%**.
  - Com estresse passado, é −9% (n.s.).
  - Em transtornos de ansiedade como o TEPT, o cortisol capilar é **17% menor**.
  - **Não há** associação consistente com estresse percebido autorrelatado, depressão ou apoio social.
  - Há associação positiva com IMC, relação cintura-quadril e pressão sistólica.
- [V] Stalder et al. 2017. https://pubmed.ncbi.nlm.nih.gov/28135674/
- **Predição:** na coorte Lifelines (n = 6.341 amostras de cabelo), a **cortisona** capilar (não o cortisol) previu doença cardiovascular incidente em 5 a 7 anos. Em menores de 60 anos, a OR ajustada foi 4,21 por ponto de log10. [V] van der Valk et al. 2024, JCEM. https://pubmed.ncbi.nlm.nih.gov/38500477/
- **Ressalvas:** o "+43%" de quem está sob estresse contínuo é uma ordem de grandeza menor que o excesso no Cushing (ver 5.1). Lavagem, tintura e anticoncepcional mexem no valor.
- **Potencial de widget:** ★★ Uma régua horizontal em escala log com marcas: "estresse crônico em curso" (+43%), "TEPT" (−17%), "Cushing" (várias vezes o normal [S]). A distância visual entre estresse e Cushing é o argumento.

### 4.3 Medidores caseiros (Hormometer / Eli Health)

- **O que a empresa afirma:**
  - "97% de acurácia, quando comparado a um método de referência laboratorial".
  - Sem coeficiente de correlação publicado, sem tamanho de amostra, sem nome do método de referência, sem faixa de medida e sem CV.
  - A página fala em "300 participantes em 18 testes piloto", sem ligar isso ao número de 97%.
  - A própria página diz: "é um produto de bem-estar e não substitui testes laboratoriais ou clínicos".
  - [V, lido no site] https://eli.health/pages/science
- **Inconsistências:**
  - A central de ajuda fala em ELISA, enquanto a página de ciência descreve ensaio de fluxo lateral (LFA). São plataformas diferentes.
  - O cortisol é comercializado sob a política de "General Wellness" da FDA, não como diagnóstico liberado.
  - [S, via resumo de busca] https://intercom.help/eli-health/en/articles/12548122-how-comparable-are-eli-s-saliva-cortisol-tests-to-actual-blood-tests
- **Busca no PubMed:** não achei estudo revisado por pares de validação do dispositivo [NV quanto à inexistência; buscar de novo antes de publicar].
- **O problema de fundo, que nenhuma acurácia resolve:**
  1. A variação dentro da pessoa é maior que a variação entre pessoas (2.2 e 2.5).
  2. Uma medida às 8h tem confiabilidade de R = 0,18 a 0,47 (Golden 2011).
  3. A CAR muda com minutos de atraso na coleta (Stalder 2016).
  4. A faixa normal tem um fator de ~13 vezes (CIRCORT).
- **Potencial de widget:** ★★★ Combina com o widget 2.5. Um "termômetro com 97% de acurácia" ainda erraria o diagnóstico, porque o problema é a biologia, não o aparelho. Uma faixa de "ruído do aparelho" (±3%, nominal) aparece fininha dentro da faixa de "ruído do dia" (fator de vários). É a versão cortisol do gráfico mais honesto do ensaio da dopamina.

---

## 5. Doenças: a escala real do excesso e da falta

### 5.1 Síndrome de Cushing

- **Incidência (Dinamarca, 11 anos):**
  - Doença de Cushing (tumor de hipófise): 1,2 a 1,7 por milhão por ano.
  - Adenoma adrenal: 0,6 por milhão por ano.
  - Carcinoma adrenal: 0,2 por milhão por ano.
  - Em casos não malignos, a mortalidade padronizada foi **3,68** vezes a esperada, concentrada no 1º ano. Curados por cirurgia: SMR 0,31. Com hipercortisolismo persistente: SMR 5,06.
  - [V] Lindholm et al. 2001, JCEM. https://pubmed.ncbi.nlm.nih.gov/11231987/
- **Incidência moderna (oeste da Suécia, 2002 a 2017):** **3,2 casos por milhão por ano** de Cushing endógeno. Distribuição: doença de Cushing 1,5; ACTH ectópico 0,8; adrenal benigno 0,7; carcinoma 0,2. [V] Wengander et al. 2019, Clin Endocrinol. https://pubmed.ncbi.nlm.nih.gov/31094003/
- **Causa mais comum:** o Cushing **exógeno**, por glicocorticoide de remédio. É por isso que a diretriz manda excluir esse uso antes de qualquer teste (Nieman 2008). [V] Revisão de referência: Lacroix et al. 2015, Lancet. https://pubmed.ncbi.nlm.nih.gov/26004339/
- **Nível de cortisol no Cushing:** cortisol livre urinário em geral várias vezes o limite superior, e perda do vale noturno (a saliva das 23h fica alta) [S]. Esse é o traço que distingue o Cushing do estresse: o **estresse sobe o pico e achata um pouco a curva, mas o vale da meia-noite continua lá**. No Cushing, o relógio quebra. [S para a formulação; ver 2.6 e 4.1]
- **Moon face e corcova:** resultam de exposição a excesso de glicocorticoide por **meses**, em níveis ordens de grandeza acima de um dia ruim. Os estados de "pseudo-Cushing" (alcoolismo, depressão grave, obesidade grave) podem dar hipercortisolismo leve, mas eles são doenças, não estresse cotidiano [S]. Não achei estudo que mostre estresse psicológico comum causando a redistribuição de gordura do Cushing [NV quanto à inexistência; é inferência razoável].
- **Potencial de widget:** ★★★ "Quantas provas orais equivalem a um Cushing?". Barras empilhadas de exposição diária ao cortisol (área sob a curva): dia normal; dia com TSST (soma ~1 h de 2 a 4 vezes o basal); semana de sono ruim; Cushing (várias vezes o normal, 24 h por dia, por meses); prednisona 20 mg (ver 5.3). As proporções exatas precisam de reconstrução [NV]. A versão qualitativa já é forte.

### 5.2 Insuficiência adrenal (Addison) e a crise

- **Epidemiologia (Noruega):**
  - Prevalência de Addison autoimune de **144 por milhão**, incidência de **0,44 por 100 mil por ano** (≈ 4,4 por milhão por ano).
  - 66% têm outra doença autoimune, sobretudo tireoide (47%).
  - Os anticorpos anti-21-hidroxilase estão em 86%.
  - [V] Erichsen et al. 2009, JCEM. https://pubmed.ncbi.nlm.nih.gov/19858318/
- **Crise adrenal:** em 423 pacientes educados para ajustar a dose, seguidos por 2 anos:
  - **8,3 crises por 100 pacientes-ano**;
  - 0,5 morte ligada à crise por 100 pacientes-ano, ou **~6% das crises**;
  - gatilhos: infecção gastrointestinal, febre e **estresse emocional** (20% cada).
  - [V] Hahner et al. 2015, JCEM. https://pubmed.ncbi.nlm.nih.gov/25419882/
- **Proporção na vida:** a crise adrenal "ocorre em cerca de 50% dos pacientes com insuficiência adrenal após o diagnóstico". [V] Husebye et al. 2021, Lancet. https://pubmed.ncbi.nlm.nih.gov/33484633/
- **Por que importa para o ensaio:** é a prova viva de que cortisol é **necessário**. Quem não tem cortisol pode morrer de uma gastroenterite. Faz contraponto ao "baixar o cortisol" das redes.
- **"Fadiga adrenal" não existe:**
  - A revisão sistemática de dois autores brasileiros achou 58 estudos elegíveis entre 3.470.
  - Concluiu por "um achado quase sistemático de resultados conflitantes".
  - Nenhuma sociedade de endocrinologia reconhece a condição.
  - [V] Cadegiani & Kater 2016, BMC Endocr Disord. https://pubmed.ncbi.nlm.nih.gov/27557747/
- **Potencial de widget:** ★★ Um "espectro" horizontal: Addison sem tratamento (quase zero) → normal (faixa larga) → Cushing (várias vezes). Os usuários de corticoide ficam marcados à direita. A "fadiga adrenal" aparece como um balão de fala apontando para dentro da faixa normal.

### 5.3 Corticoides de remédio: a exposição mais comum de todas

- **Reino Unido (base THIN, 1989 a 2008, 4,5 milhões de adultos):**
  - Prevalência média de uso de glicocorticoide oral de **0,85%**, subindo de 0,65% em 1989 para 0,91% em 2008.
  - 79% dos tratamentos foram curtos (mediana de 9 dias, dose cumulativa de ~210 mg de prednisona-equivalente).
  - "Cerca de 1% da população recebe glicocorticoide em qualquer momento."
  - [V] Fardet, Petersen & Nazareth 2011. https://pubmed.ncbi.nlm.nih.gov/21420765/
- **EUA (NHANES 1999 a 2008):**
  - Prevalência de uso oral de **1,2%** (≈ 2,5 milhões de pessoas).
  - Duração média de 1.606 dias, e **28,8%** usam há 5 anos ou mais.
  - [V] Overman et al. 2013. https://pubmed.ncbi.nlm.nih.gov/22807233/
- **Uso curto:**
  - **21,1%** dos adultos americanos com plano privado receberam pelo menos uma receita curta (< 30 dias) em 3 anos.
  - Nos 30 dias seguintes, o risco de sepse foi 5,30 vezes maior, o de tromboembolismo 3,33 vezes e o de fratura 1,87 vezes.
  - Mesmo com dose < 20 mg/dia, a sepse ficou 4,02 vezes maior.
  - [V] Waljee et al. 2017, BMJ. https://pubmed.ncbi.nlm.nih.gov/28404617/
- **Equivalência de dose:**
  - 5 mg de prednisona ≈ 20 mg de hidrocortisona (cortisol) em potência glicocorticoide [S, tabela padrão].
  - Com a produção natural de ~10 mg/dia (Esteban 1991), uma dose comum de 20 mg de prednisona ≈ 80 mg de hidrocortisona ≈ **8 vezes a produção diária do corpo**, todos os dias do tratamento.
  - O cálculo é meu, a partir de [V] + [S].
- **Potencial de widget:** ★★★ Gráfico de "escala de pessoas por milhão", em pictograma de 1 milhão de pontos ou um quadrado de 1.000 × 1.000:
  - ~10.000 a 12.000 usam corticoide oral agora;
  - ~144 têm Addison;
  - ~3 ganham Cushing endógeno por ano.
  - O leitor rola e os grupos vão aparecendo. Mensagem: se alguém tem cara de Cushing, a causa mais provável é uma receita, não o estresse.

---

## 6. Estresse crônico e saúde

### 6.1 Alostase e carga alostática (McEwen 1998)

- **Achado:**
  - **Alostase** é a estabilidade por meio da mudança: os mediadores do estresse (cortisol, adrenalina) protegem a curto prazo.
  - **Carga alostática** é o desgaste quando eles são acionados demais ou de forma errada.
  - McEwen descreve quatro padrões: estresse repetido; falta de adaptação ao mesmo estressor; resposta que não desliga; e resposta insuficiente (que deixa outros sistemas, como a inflamação, sem freio).
- [V para a referência e o título; S para os quatro padrões, que não aparecem no registro do PubMed, sem abstract] McEwen 1998, NEJM 338:171. https://pubmed.ncbi.nlm.nih.gov/9428819/
- **Potencial de widget:** ★★★ Quatro mini-gráficos clássicos (os da figura do NEJM) redesenhados lado a lado: "normal", "golpes repetidos", "não se acostuma", "não desliga", "resposta fraca". É infográfico puro, e a curva do TSST de 3.1 serve como "normal".

### 6.2 O que o estresse crônico faz com a curva: depende

- **Achado:**
  - Na meta-análise de Miller, Chen & Zhou 2007, a variação entre estudos se explica pelo tempo e pelo tipo de estressor.
  - O cortisol fica **elevado no início** do estressor e **cai com o passar do tempo**.
  - Estressores que ameaçam a integridade física, traumáticos e incontroláveis produzem um perfil diurno "**alto e plano**".
  - O cortisol aumenta com o sofrimento subjetivo, mas é **menor em pessoas com TEPT**.
- [V] Psychol Bull 2007. https://pubmed.ncbi.nlm.nih.gov/17201569/
- **Ressalvas:** "estresse crônico = cortisol alto" é falso como regra. Pode ser alto, normal ou baixo conforme a fase.
- **Potencial de widget:** ★★ Um slider "meses desde o início do estressor". A curva do dia começa alta e vai achatando e baixando. Com o interruptor "TEPT", a curva fica abaixo do normal.

### 6.3 Curva achatada e mortalidade (Whitehall II)

- **Achado:**
  - Em 4.047 servidores públicos britânicos (idade média de 61 anos), foram coletadas seis amostras de saliva num dia útil: ao acordar, +30 min, +2,5 h, +8 h, +12 h e na hora de dormir.
  - Em 6,1 anos de seguimento houve 139 mortes.
  - Uma **inclinação 1 DP mais plana** aumentou o risco de morte por todas as causas em **30%** (HR 1,30; IC 1,09 a 1,55).
  - Para morte cardiovascular, o HR foi **1,87** (1,32 a 2,64), independente de covariáveis.
  - **Cortisol matinal e CAR não se associaram** à mortalidade.
- [V] Kumari et al. 2011, JCEM. https://pubmed.ncbi.nlm.nih.gov/21346074/ (texto completo: https://pmc.ncbi.nlm.nih.gov/articles/PMC3085201/)
- **Meta-análise:** 80 estudos e 179 associações. Curvas mais planas se associam a pior saúde com **r = 0,147** em média. Isso vale em 10 de 12 tipos de desfecho, e o efeito é maior em imunidade e inflamação (**r = 0,288**). [V] Adam et al. 2017. https://pubmed.ncbi.nlm.nih.gov/28578301/
- **Ressalvas:**
  - É observacional. A curva plana pode ser marcador de doença já presente, não causa, e Adam et al. discutem "marcador ou mecanismo".
  - Só 32 mortes cardiovasculares no Whitehall II.
  - O número que importa é a **forma da curva** (o contraste entre manhã e noite), não o nível da manhã. Isso é o oposto do que os medidores caseiros medem.
- **Potencial de widget:** ★★★ "Não é o pico, é a queda". Duas curvas (íngreme e plana) com o mesmo valor ao acordar. Um medidor que só olha de manhã as vê como idênticas. Um segundo painel mostra as barras de HR (1,30 todas as causas; 1,87 cardiovascular; ~1,0 para cortisol matinal e CAR). Dá para fazer estático.

### 6.4 Causalidade: cortisol e doença cardiovascular (Mendelian randomization)

- **Achado:**
  - Cortisol plasmático matinal 1 DP maior: OR 1,28 para doença cardiovascular incidente em dois estudos caso-controle aninhados.
  - Na meta-análise de estudos prospectivos, OR 1,18.
  - Na randomização mendeliana de duas amostras (122.737 casos de doença coronariana), **OR 1,06 (IC 0,98 a 1,15)**, intervalo que cruza 1.
  - Os autores concluem por um fator "causal".
- [V] Crawford et al. 2019, Eur J Endocrinol. https://pubmed.ncbi.nlm.nih.gov/31325907/
- **Ressalvas:** a MR não foi estatisticamente significativa. O instrumento genético (lócus SERPINA6, que codifica a CBG) mexe no cortisol **total** via proteína ligadora, o que complica a interpretação [V para o lócus: Crawford 2021, https://pubmed.ncbi.nlm.nih.gov/33469137/]. Leitura honesta: sinal fraco, compatível com efeito pequeno.
- **Potencial de widget:** ★ Gráfico de floresta com três linhas (1,28 / 1,18 / 1,06). Serve para um parágrafo sobre "associação não é causa".

### 6.5 Burnout: o cortisol não é um marcador

- **Achado:** revisão sistemática de 31 estudos e 38 biomarcadores. As meta-análises **não mostraram diferença** na CAR, na CAR pós-dexametasona nem no cortisol sanguíneo entre burnout e controles. "Nenhum biomarcador potencial para burnout foi encontrado." [V] Danhof-Pont et al. 2011, J Psychosom Res. https://pubmed.ncbi.nlm.nih.gov/21624574/
- **Ressalvas:** a revisão é antiga, e a heterogeneidade das definições de burnout atrapalha. Não achei meta-análise mais recente com conclusão diferente [NV].
- **Potencial de widget:** ★ Uma linha no quadro de "mitos".

### 6.6 Depressão: hiperatividade do eixo em subgrupos

- **Achado:** meta-análise de 361 estudos, com 18.454 pessoas.
  - Deprimidos têm cortisol maior: **d = 0,60** (0,54 a 0,66).
  - Isso **cai quase à metade (d = 0,33)** quando se exige qualidade metodológica mínima.
  - O ACTH é d = 0,28, e o CRH não difere (d = 0,02).
  - O efeito é maior em idosos internados e nas formas melancólica, psicótica, atípica e endógena.
- [V] Stetler & Miller 2011, Psychosom Med. https://pubmed.ncbi.nlm.nih.gov/21257974/
- **Ascensão e queda do teste de supressão com dexametasona (DST):**
  - 1981: Carroll et al. o propuseram como "teste laboratorial específico para melancolia", com sensibilidade de **67%** e especificidade de **96%** (n = 438, critério de cortisol > 5 µg/dL após 1 mg). [V] https://pubmed.ncbi.nlm.nih.gov/7458567/
  - 1987: a força-tarefa da APA concluiu que a sensibilidade em depressão maior é "modesta (cerca de 40 a 50%)". A especificidade vai de < 70% a > 90% em outros quadros psiquiátricos, e o teste não ajuda a escolher o tratamento. [V] https://pubmed.ncbi.nlm.nih.gov/3310667/
- **Resposta ao estresse:** deprimidos e não deprimidos têm resposta semelhante no pico, mas a **recuperação** é pior nos deprimidos (meta-análise pequena, 7 estudos). [V] Burke et al. 2005. https://pubmed.ncbi.nlm.nih.gov/15961250/
- **Potencial de widget:** ★★ Duas distribuições sobrepostas (d = 0,33, a estimativa de melhor qualidade). Elas se sobrepõem em ~87% [cálculo padrão para d = 0,33, S]. A mensagem é que a diferença existe em média e não serve como exame individual. A linha do tempo do DST (1981 → 1987) entra como nota.

### 6.7 Gordura visceral: associação clara, causalidade só no extremo

- **Associação:**
  - Mulheres com relação cintura-quadril alta secretaram mais cortisol no primeiro de três estresses de laboratório.
  - As magras com cintura alta **não se habituaram** ao estresse repetido.
  - [V] Epel et al. 2000, Psychosom Med (n = 59). https://pubmed.ncbi.nlm.nih.gov/11020091/
  - No cabelo, o cortisol se associa positivamente com IMC e relação cintura-quadril. [V] Stalder 2017.
- **Causalidade:**
  - No **Cushing** e no uso crônico de corticoide, a redistribuição para gordura visceral e a face de lua são causadas pelo excesso de cortisol [S].
  - Na população geral, a direção é ambígua: o tecido adiposo visceral tem 11β-HSD1, que regenera cortisol localmente a partir da cortisona [S]. A obesidade pode alterar o eixo, e não só o contrário.
  - Não encontrei randomização mendeliana robusta ligando cortisol a gordura visceral [NV].
- **Ressalvas:** o estudo de Epel é transversal e pequeno. Rosmond & Björntorp 1998 acharam supressão embotada pela dexametasona só no subgrupo ansioso-depressivo com obesidade abdominal (n = 25 de 284). [V] https://pubmed.ncbi.nlm.nih.gov/9781619/
- **Potencial de widget:** ★ Uma seta de duas pontas entre "cortisol" e "gordura abdominal" com o rótulo "na população: as duas direções; no Cushing: uma só".

---

## 7. Diferenças individuais e curso de vida

### 7.1 Sexo e ciclo menstrual

- **Achado:** 81 adultos fizeram o TSST e um teste com ACTH sintético.
  - O ACTH ao estresse foi maior em homens que em qualquer grupo de mulheres.
  - O cortisol salivar seguiu o padrão **fase lútea = homens > fase folicular = anticoncepcional oral**.
  - O cortisol **total** no sangue não diferiu.
  - A diferença está no cortisol livre, porque o anticoncepcional sobe a CBG.
- [V] Kirschbaum et al. 1999, Psychosom Med. https://pubmed.ncbi.nlm.nih.gov/10204967/
- **Mais:**
  - Mulheres tiveram resposta menor que homens ao estresse mental. [V] Lovallo 2006.
  - Na CAR, mulheres têm aumento semelhante (Wüst 2000) ou maior e mais tardio (Pruessner 1997). [V]
  - Revisão: Kudielka & Kirschbaum 2005, Biol Psychol. [V para a existência] https://pubmed.ncbi.nlm.nih.gov/15740829/
- **Potencial de widget:** ★★ Quatro barras de resposta salivar ao TSST (homens, lútea, folicular, anticoncepcional). Note que o anticoncepcional "baixa o cortisol" livre na saliva sem baixar o total. Isso vira um bom aparte sobre medir a coisa certa.

### 7.2 Idade

- **Achado:** reanálise de 177 perfis de 24 h (90 homens, 87 mulheres, de 18 a 83 anos).
  - O cortisol médio **sobe 20 a 50%** entre os 20 e os 80 anos, nos dois sexos.
  - O **vale noturno sobe progressivamente** com a idade.
  - O ritmo se mantém, mas com amplitude relativa menor e fase adiantada.
- [V] Van Cauter, Leproult & Kupfer 1996, JCEM. https://pubmed.ncbi.nlm.nih.gov/8675562/
- **Coerente com o CIRCORT:** a mediana 1 h após acordar vai de 7,1 (homens de 21 a 30 anos) a 8,8 nmol/L (homens > 80). [V]
- **Potencial de widget:** ★★ Curvas do CIRCORT por década sobrepostas, com um slider de idade. A mudança é sutil, e esse é o ponto. Pode ser estático (pequenos múltiplos).

### 7.3 Adversidade na infância: resposta embotada, não exagerada

- **Achado:** meta-análise de 30 conjuntos de dados (n = 4.292).
  - A adversidade precoce se associa a **resposta de cortisol mais baixa** ao estresse social (**g = −0,39**).
  - O efeito é grande no pico e na recuperação, e maior com maus-tratos e em adultos.
- [V] Bunea, Szentágotai-Tătar & Miu 2017, Transl Psychiatry. https://pubmed.ncbi.nlm.nih.gov/29225338/
- **Ressalvas:** a heterogeneidade é alta e pode haver viés de publicação. É contraintuitivo e bom para o texto: o trauma pode deixar o alarme **mais fraco**, não mais alto (coerente com o TEPT em 6.2 e 4.2).
- **Potencial de widget:** ★★ Duas curvas de TSST (com e sem adversidade), com a de adversidade mais baixa.

### 7.4 Genética

- **Achado:** a análise conjunta de 5 estudos com gêmeos sugere herdabilidade de **62%** para o cortisol basal. Os autores alertam que nenhum estudo tinha poder para separar genes de ambiente compartilhado e que o ritmo circadiano raramente foi considerado. [V] Bartels et al. 2003, Psychoneuroendocrinology. https://pubmed.ncbi.nlm.nih.gov/12510008/
- **GWAS:** com 25.314 pessoas, o único lócus robusto para o cortisol matinal é o **SERPINA6/SERPINA1**, que codifica a CBG. Isso significa que a principal variante genética mexe na "embalagem" do cortisol, não na produção. [V] Crawford et al. 2021, J Hum Genet. https://pubmed.ncbi.nlm.nih.gov/33469137/
- **Potencial de widget:** ★ Nota de rodapé ou um ícone "62% herdável, mas pergunte de qual medida".

---

## 8. Ideias de gráficos priorizadas (resumo para o designer)

1. ★★★ **Relógio do cortisol** (2.1 + 2.6): curva de Debono com eventos que a deformam (acordar, TSST, treino 40/60/80%, café em quem toma ou não, noite mal dormida, voo). Interativo.
2. ★★★ **"Seu número cabe em quase tudo"** (2.2): leque de percentis do CIRCORT. Interativo leve (o leitor digita um valor).
3. ★★★ **Sorteio de medidas** (2.5 + 4.3): 14 dias de saliva simulados, mostrando que uma medida engana e a média de 6 dias converge. Interativo (a interação ensina).
4. ★★★ **Matriz plateia × controle** (3.2): d = 0,92 vs 0,32 e 0,35; filmes tristes e barulho no zero. Estático.
5. ★★★ **"Não é o pico, é a queda"** (6.3): curvas íngreme e plana com o mesmo valor matinal, mais as barras de HR. Estático.
6. ★★★ **1 milhão de pessoas** (5.3): ~10 mil em corticoide, ~144 com Addison, ~3 com Cushing novo por ano. Rolagem.
7. ★★★ **Ocupação MR × GR** (1.2): dois receptores, um sempre cheio e outro que só enche no pico. Estático.
8. ★★★ **Zoom dos pulsos** (2.4): a curva lisa vira dentes horários. Animação de rolagem.
9. ★★ Exercício em 4 barras (3.3); cafeína com tolerância (3.4); régua do cabelo (4.2); espectro Addison ↔ Cushing (5.2); adversidade embotada (7.3).

## 9. Pendências para conferir antes de publicar

- O % exato do aumento de cortisol pela cafeína (Lovallo; procurar no texto completo) [NV].
- Os valores absolutos de uma curva típica de TSST para desenhar (extrair de uma figura, por exemplo Kirschbaum 1999 ou Goodman 2017) [NV].
- Uma validação independente do Hormometer (buscar de novo no PubMed e no medRxiv) [NV].
- O número de episódios secretórios por dia em Weitzman 1971 (texto completo) [S].
- A proporção de Cushing exógeno vs endógeno com um número citável [S].
- A confirmação do Nobel de 1950 com Reichstein no site oficial (bloqueado nesta sessão) [S].
- Os quatro padrões de carga alostática na figura original do NEJM [S].
