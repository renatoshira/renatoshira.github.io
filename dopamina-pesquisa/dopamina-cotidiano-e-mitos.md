# Dopamina no cotidiano: o que mexe nela, quanto, e o que "resetar" pode querer dizer

Dossiê de pesquisa para o ensaio "Como resetar seu sistema de dopamina". Data: 12/11/2026.

**Escopo.** O que muda a dopamina no dia a dia de pessoas comuns, o tamanho de cada efeito em humanos, o que o mercado vende para "aumentar" ou "resetar" a dopamina, a camada pop ("detox", "menu", "dressing", "dopamina barata") e a pergunta literal do título.

**O que fica de fora (já está em outros dossiês):** vício, abstinência, números de rato, receptores D2 em dependentes e recuperação (`ciencia-factcheck.md`, seções A, D, E); crítica ao "dopamine fast" de Sepah, Grinspoon, McCabe e Robbins (`ciencia-factcheck.md` K1); água fria e Šrámek 2000 (`ciencia-factcheck.md`); ensaios de abstinência digital e GLP-1 (`fronteira-e-dados.md` 1 e 2); idade, sono e Karrer 2017 (`dopamina-geral.md` 5.1 e 5.4); Ferreri 2019 e Fiorillo 2003 (`ciencia-factcheck.md` C). Aqui eles só aparecem como referência cruzada, com o dado novo que interessa a este recorte.

**Legenda de confiabilidade:** [V] verificado na fonte primária (resumo ou texto completo lido); [S] fonte secundária confiável; [NV] não verificado.

**Método.** Resumos e textos completos lidos pela API da Europe PMC (o PubMed bloqueou a leitura automática); PDFs completos de Salimpoor 2011 e Koepp 1998 lidos; Google Trends consultado diretamente pela API pública em 12/11/2026 (séries mensais de jan/2018 a nov/2026, médias anuais calculadas por mim).

---

## 0. Resumo em uma tela

1. **O eixo comum existe, mas é traiçoeiro.** Quase tudo que se mediu em humanos usa PET com [11C]raclopride: a queda na ligação do traçador ao receptor D2/D3 indica mais dopamina na sinapse. Nesse eixo, música que arrepia dá **-6 a -9%**, meditação **-7,9%**, videogame **-13%**, cigarro **-26 a -37%** (método diferente), anfetamina IV **-15%**, metilfenidato oral **-20%**. O ruído de teste e reteste do próprio exame é **cerca de 4%**. Ou seja: os prazeres cotidianos ficam **a um ou dois "ruídos" de distância do zero**, e os remédios e drogas ficam **duas a quatro vezes acima**.
2. **Café e noite mal dormida mexem no receptor, não na "dose" de dopamina.** Cafeína 300 mg **aumenta** a disponibilidade de D2/D3 (+4,6% no putâmen, +5,6% no estriado ventral). Uma noite sem dormir **reduz** a disponibilidade no estriado ventral, e o grupo de Volkow mudou de interpretação entre 2008 ("mais dopamina") e 2012 ("menos receptor").
3. **Exercício: o dado humano é misto.** 30 min de esteira não mudaram nada (Wang 2000); bicicleta deitada em 2024 mostrou liberação (Ando 2024). A frase "exercício dá dopamina" tem base em rato, e só agora começa a ter em gente.
4. **A coisa mais perto de um "nível basal" medido em humanos** é a ocupação dos receptores por dopamina em repouso, revelada por depleção aguda com AMPT: **+9 a +11%** de ligação em pessoas saudáveis quando se esvazia a dopamina, e **+5,7%** em dependentes de cocaína (Martinez 2009). É pequeno, é estável e não se mede em casa.
5. **O "reset" honesto não é químico, é de aprendizado.** A dopamina fásica codifica a diferença entre o esperado e o recebido. Mudar o que você espera (e as pistas que disparam a espera) é a única alavanca com mecanismo claro. Hábitos de saúde levam em mediana **59 a 66 dias** para ficar automáticos, com variação de **4 a 335 dias**, e não 30.
6. **Pop.** No Google Trends mundial, "dopamine detox" foi de praticamente zero em 2019 a um pico em **nov/2024** e está caindo (média anual 73 em 2024, 45 em 2026). "Dopamine menu" ainda sobe (de 3 em 2023 para 21 em 2026, na mesma escala). No Brasil ninguém busca "detox de dopamina" (índice perto de zero); busca-se **"dopamina"**, que teve pico em **jun/2023**, um ano depois da edição brasileira de *Nação Dopamina*. E em 2025 e 2026 a molécula da moda no Brasil virou **cortisol**.
7. **Suplementos.** Mucuna pruriens é levodopa de verdade: cápsulas vendidas nos EUA tinham de **2 a 241 mg** de levodopa por dose, sem relação com o rótulo (Cohen 2022, *JAMA Neurology*). L-tirosina só mostrou efeito cognitivo em situação de estresse agudo ou de esgotamento. Probióticos: nenhum estudo humano mediu dopamina no cérebro.

---

## 1. A régua comum: PET com [11C]raclopride

### 1.0 Como ler o eixo (antes de qualquer gráfico)

- **Achado [V]:** o [11C]raclopride compete com a dopamina pelo receptor D2/D3. Se há mais dopamina na sinapse, menos traçador se liga, e o "potencial de ligação" (BP) cai. Uma queda de X% no BP **não é** um aumento de X% de dopamina.
- **As conversões que viraram manchete:**
  - Koepp 1998 escreveu que "uma queda de 1% na ligação reflete pelo menos 8% de aumento da dopamina extracelular", daí que -13% viraria "dopamina dobrou" [V, PDF].
  - Kjaer 2002 converteu -7,9% em "aumento de 65% da liberação de dopamina" [V, resumo].
  - Essas conversões vêm de calibrações em macacos com microdiálise e não valem de forma linear para qualquer região ou estímulo. O ensaio deve mostrar o número medido (% de BP), não o convertido.
- **Ruído do instrumento [V]:** Alakurtti et al. 2015, *J Cereb Blood Flow Metab*, 7 homens, reteste com 5 semanas: variabilidade de **4,5% (caudado), 3,9% (putâmen), 3,9% (estriado ventral)**, ICC de 0,82 a 0,83. Koepp 1998 cita 4 a 6% para o método da época. https://pubmed.ncbi.nlm.nih.gov/25853904/
- **Confusões conhecidas [V]:** Egerton et al. 2009 (*Neurosci Biobehav Rev*, revisão sistemática do próprio grupo de Koepp) reanalisou o estudo do videogame e apontou que **movimento de cabeça e mudança de fluxo sanguíneo** podem produzir quedas aparentes de ligação. "A heterogeneidade dos métodos impede meta-análise." https://pubmed.ncbi.nlm.nih.gov/19481108/
- **Ressalvas gerais:** amostras de 5 a 20 pessoas; regiões diferentes (caudado, putâmen, estriado ventral); métodos diferentes (bolus contra bolus mais infusão); controles diferentes (música neutra, jejum, ficar parado). O eixo é comum só no nome.
- **Potencial de widget:** ★★★ Uma faixa cinza de "ruído do exame" (±4%) atrás de todas as barras. Metade dos prazeres cotidianos fica colada na borda da faixa. É o gráfico mais honesto do ensaio.

### 1.1 Tabela mestra (para um gráfico de barras horizontais)

Valores negativos = menos traçador ligado = mais dopamina (interpretação usual). Positivo = mais receptor disponível.

| Estímulo | Δ BP [11C]raclopride | Região | N | Fonte | Conf. |
|---|---|---|---|---|---|
| Ruído de teste e reteste | ±3,9 a 4,5% | estriado | 7 | Alakurtti 2015 | [V] |
| Cafeína 300 mg oral | **+4,6% / +5,6%** | putâmen / estriado ventral | 20 | Volkow 2015 | [V] |
| Exercício: 30 min de esteira | +1,2% (4,17 → 4,22; n.s.) | putâmen | 12 | Wang 2000 | [S] |
| Música com arrepios (vs neutra) | **-6,4 a -9,2%** | caudado, putâmen, NAc | 8 | Salimpoor 2011 | [V] |
| Meditação (yoga nidra) | **-7,9%** | estriado ventral | 8 | Kjaer 2002 | [V] |
| Dinheiro imprevisível (VR vs controle) | **-6,3%** (e **+9,1%** no putâmen lateral) | caudado medial | 9 | Zald 2004 | [V] |
| Videogame (tanque) | **-13%** (faixa +8 a -42%) | estriado ventral | 8 | Koepp 1998 | [V] |
| Placebo em Parkinson | cerca de **-17 a -21%** | estriado | 6 | de la Fuente-Fernández 2001 | [S] |
| Anfetamina IV 0,3 mg/kg | **-15,3%** (VS), -16,1% (putâmen), -8,1% (associativo) | estriado | 14 | Martinez 2003 | [V] |
| Metilfenidato oral 0,8 mg/kg | **-20 ± 12%** | estriado | 11 | Volkow 2001 | [V] |
| Cigarro (dependentes) | **-25,9 a -36,6%** | caudado ventral/NAc, putâmen ventral | 10+10 | Brody 2004 | [V] |
| Refeição favorita após jejum de 16 h | queda significativa, % [NV] | estriado dorsal (não ventral) | 7 | Small 2003 | [V direção] |
| Álcool 1 ml/kg oral | queda significativa, % [NV] | estriado ventral/NAc | 6 | Boileau 2003 | [V direção] |
| Uma noite sem dormir | queda, % [NV] | estriado ventral | 15 e 20 | Volkow 2008, 2012 | [V direção] |

**Fontes e detalhes por linha:**

- **Música [V]:** Salimpoor et al. 2011, *Nat Neurosci*. 217 pessoas triadas, **8** escaneadas, cada uma com suas próprias músicas instrumentais que dão arrepio (média de 3,7 arrepios por trecho). Quedas de BP lidas na figura 2 do PDF: 6,4%, 7,9%, 6,6%, 7,4%, 6,5% e **9,2%** (o maior no NAc direito). No fMRI das mesmas pessoas, o **caudado** se ativa na **antecipação** do arrepio e o **NAc** no **pico**. https://pubmed.ncbi.nlm.nih.gov/21217764/ , PDF: https://www.zlab.mcgill.ca/publications/docs/salimpoor_2011_nn.pdf
  - Complemento causal (já em `ciencia-factcheck.md` C): Ferreri 2019, levodopa aumenta e risperidona reduz o prazer musical.
- **Meditação [V]:** Kjaer et al. 2002, *Cogn Brain Res*. Yoga nidra contra ouvir fala de olhos fechados. -7,9% no estriado ventral, correlacionado com mais ondas teta no EEG. Detalhe que o ensaio pode explorar: os participantes relataram **menos desejo de agir**, e **nem o prazer nem o relaxamento diferiram** entre as condições. Dopamina subiu sem mais prazer. https://pubmed.ncbi.nlm.nih.gov/11958969/
  - Ressalvas: amostra pequena (8 instrutores de yoga homens, segundo AuntMinnie [S]; uma tabela de revisão de Newberg cita N = 5 [S], discrepância não resolvida). **Não encontrei replicação** com PET de dopamina em meditação. [NV] para qualquer crítica formal publicada.
- **Videogame [V]:** Koepp et al. 1998, *Nature*. 8 homens, jogo de tanque com recompensa em dinheiro. -13% no estriado ventral, mas com **faixa de +8% a -42%**, correlacionada com o desempenho. O próprio paper compara com anfetamina IV (-16%) e metilfenidato IV (-23%). Revisitado com crítica por Egerton 2009 (ver 1.0). https://pubmed.ncbi.nlm.nih.gov/9607763/
- **Dinheiro [V]:** Zald et al. 2004, *J Neurosci*. 9 pessoas, cartas que pagam US$ 1 canadense, em três esquemas: razão variável (imprevisível, 25% das jogadas), razão fixa (toda quarta carta) e controle sensório-motor. O resultado é **misto**: o esquema imprevisível reduziu a ligação no caudado medial (-6,3%) mas **aumentou** no putâmen lateral (+9,1%); o estriado ventral não mudou. https://pmc.ncbi.nlm.nih.gov/articles/PMC6729274/
  - Lição para o ensaio: até o "dinheiro imprevisível", que é o caça-níquel em forma de experimento, dá sinal pequeno e espalhado no PET.
- **Placebo [V resumo, S números]:** de la Fuente-Fernández et al. 2001, *Science*. Pacientes com Parkinson que recebem soro achando que é apomorfina liberam dopamina no estriado em magnitude comparável à do remédio verdadeiro; mais em quem sentiu melhora. Números de 17 a 21% de queda vêm do resumo da Alzforum. https://pubmed.ncbi.nlm.nih.gov/11498597/ ; https://alzforum.org/node/38469
  - Gancho forte: **a expectativa sozinha** produz um efeito do tamanho de uma droga, num cérebro com dopamina danificada.
- **Cigarro [V]:** Brody et al. 2004, *Am J Psychiatry*. Fumantes de 15 ou mais cigarros por dia, pausa de 10 min fora do scanner, 10 fumaram e 10 não. Ressalva: método de bolus mais infusão com saída do aparelho; o próprio grupo e outros acharam valores menores em estudos posteriores [S]. https://pubmed.ncbi.nlm.nih.gov/15229053/
- **Álcool [V]:** Boileau et al. 2003, *Synapse*. 6 pessoas, álcool no suco de laranja contra suco puro. Queda no estriado ventral, correlacionada com o aumento de frequência cardíaca e com impulsividade. https://pubmed.ncbi.nlm.nih.gov/12827641/
- **Comida [V]:** Small, Jones-Gotman & Dagher 2003, *NeuroImage*. 7 pessoas, jejum de 16 h contra refeição favorita. Liberação no estriado **dorsal**, não no ventral, correlacionada com o **prazer da refeição** e não com a fome. https://pubmed.ncbi.nlm.nih.gov/12948725/
- **Anfetamina [V]:** Martinez et al. 2003, *J Cereb Blood Flow Metab*. https://pubmed.ncbi.nlm.nih.gov/12621304/
- **Metilfenidato [V]:** Volkow et al. 2001, *J Neurosci*. Dose terapêutica oral. https://pubmed.ncbi.nlm.nih.gov/11160455/
- **Sexo e orgasmo [NV, lacuna]:** não encontrei nenhum estudo de PET com raclopride durante sexo ou orgasmo em humanos. O que existe é PET de fluxo sanguíneo (Holstege, Georgiadis, Huynh 2013, *J Sex Med*), que mostra ativação de regiões, não dopamina. Os números de "dopamina do sexo" que circulam vêm de microdiálise em rato. https://pubmed.ncbi.nlm.nih.gov/23981195/
- **Recompensa social [V]:** o dado humano mais limpo não é de dopamina. Rir com amigos próximos por 30 min liberou **opioides endógenos** (PET com [11C]carfentanil, 12 homens; Manninen et al. 2017, *J Neurosci*). https://pubmed.ncbi.nlm.nih.gov/28536272/ Isso combina com a ideia de que o "gostar" é mais opioide que dopaminérgico.
- **Potencial de widget:** ★★★ Barras horizontais em escala única, com a faixa de ruído, cores por categoria (cotidiano, remédio, droga) e um selo de "método diferente" no cigarro. Ao passar o mouse, aparece o N. Toggle "mostrar a conversão das manchetes" que estica as barras para "65%" e "dobrou", e mostra por que isso engana.

### 1.2 Cafeína: o caso ao contrário

- **Achado [V]:** Volkow et al. 2015, *Transl Psychiatry*. 20 pessoas, 300 mg de cafeína oral (cerca de 3 xícaras de café coado) contra placebo. A disponibilidade de D2/D3 **subiu**: putâmen de 2,84 para 2,97 (**+4,6%**), estriado ventral de 2,69 para 2,84 (**+5,6%**), caudado sem mudança. Se a cafeína liberasse dopamina, a ligação cairia. A interpretação dos autores: a cafeína **não aumenta a dopamina no estriado**; ela parece aumentar os receptores (ou a afinidade), via bloqueio de receptores de adenosina A2A. O aumento no estriado ventral se associou a mais alerta. https://pubmed.ncbi.nlm.nih.gov/25871974/ , texto: https://pmc.ncbi.nlm.nih.gov/articles/PMC4462609/
- **Ressalva:** os p-valores são limítrofes (p = 0,05), e o efeito está dentro do ruído de reteste de 4%.
- **Gancho:** a substância psicoativa mais usada do mundo não é um "hit de dopamina" no sentido pop. Ela mexe no volume do receptor.
- **Potencial de widget:** ★★ A única barra que vai para o lado positivo do gráfico mestre, com a anotação "aumenta o receptor, não a dopamina".

### 1.3 Sono: a mesma medida, duas interpretações

- **Achado [V]:**
  - Volkow et al. 2008, *J Neurosci*: 15 pessoas, uma noite sem dormir reduziu a ligação de raclopride no estriado e no tálamo, em proporção à fadiga e à piora cognitiva. Interpretação de então: **sono perdido aumenta a dopamina**. https://pubmed.ncbi.nlm.nih.gov/18716203/
  - Volkow et al. 2012, *J Neurosci*: 20 pessoas, com metilfenidato como teste. A liberação induzida pelo remédio foi igual com e sem sono. Nova interpretação: o que cai é o **receptor** no estriado ventral (downregulation), não sobe a dopamina. https://pubmed.ncbi.nlm.nih.gov/22573693/
- **Gancho para o ensaio:** um exemplo raro de autocorreção visível. A mesma queda de ligação foi lida primeiro como "mais dopamina" e depois como "menos receptor". É exatamente a ambiguidade que torna os "hits de dopamina" pop impossíveis de medir.
- **Já coberto:** o efeito do sono está em `dopamina-geral.md` 5.4; aqui o dado novo é a virada de interpretação de 2008 para 2012.
- **Potencial de widget:** ★★ Dois cartões lado a lado (2008 e 2012) com o mesmo gráfico e legendas diferentes.

### 1.4 Exercício: o dado humano é misto

- **Nulo [S, números do resumo citados na busca]:** Wang et al. 2000, *J Nucl Med*. 12 voluntários que treinam 5 ± 3 h por semana, 30 min de corrida vigorosa na esteira. Disponibilidade de D2 no putâmen: 4,17 ± 0,29 antes e 4,22 ± 0,34 depois (p < 0,6, sem diferença). https://pubmed.ncbi.nlm.nih.gov/10945526/ ; https://jnm.snmjournals.org/content/jnumed/41/8/1352.full-text.pdf
- **Positivo [V resumo]:** Ando et al. 2024, *J Physiol*. 16 pessoas, bicicleta deitada moderada (cerca de 35% do VO2 pico, segundo a PsyPost [S]). Houve liberação de dopamina, correlacionada com tempo de reação mais curto. A magnitude em % não aparece no resumo [NV]. Os próprios autores apontam fluxo sanguíneo como confusão possível. https://pubmed.ncbi.nlm.nih.gov/38165254/
- **Correlacional [V]:** Simonsson et al. 2022 (49 idosos): disponibilidade de D2/3 associada à motivação autônoma para exercício, estudo exploratório. https://pubmed.ncbi.nlm.nih.gov/36438629/
- **Veredito:** "exercício libera dopamina" é bem estabelecido em rato e **plausível, mas pouco medido** em humanos (dois estudos de PET agudo, resultados opostos, métodos diferentes). Os benefícios do exercício para humor são sólidos por outras vias; o rótulo "dopamina" é o elo fraco.
- **Potencial de widget:** ★★ Dois pontos com barras de erro (Wang nulo, Ando positivo) e um rato ao fundo com a curva de microdiálise. "Em gente, a pergunta ainda está aberta."

### 1.5 Sol e estação do ano: dois estudos, sinais opostos

- **Achado [V]:**
  - Tsai et al. 2011, *Prog Neuropsychopharmacol Biol Psychiatry*: 68 pessoas, SPECT com [123I]IBZM, comparação entre o quartil com mais sol (n = 17) e o com menos (n = 18). **Mais sol, mais disponibilidade de D2/D3** no estriado. Pessoas diferentes em épocas diferentes; sexo e tabagismo desbalanceados. https://pubmed.ncbi.nlm.nih.gov/20875835/
  - Eisenberg et al. 2010, *J Neurosci*: 86 adultos, PET com [18F]DOPA (capacidade de síntese, outra métrica). Síntese **maior no outono e inverno** que na primavera e verão, no putâmen (p = 0,038). https://pubmed.ncbi.nlm.nih.gov/21048126/
  - Neumeister et al. 2001, *Psychol Med*: transportador de dopamina (DAT) em transtorno afetivo sazonal, 11 contra 11, SPECT. https://pubmed.ncbi.nlm.nih.gov/11722161/
- **Ressalva:** métricas diferentes (receptor, síntese, transportador), desenhos transversais, p-valores limítrofes. Não dá para dizer "sol aumenta a dopamina".
- **Potencial de widget:** ★ Um calendário circular com dois estudos que puxam para lados opostos. Bom para a seção "a ciência é bagunçada".

---

## 2. O que se vende para "aumentar" ou "resetar" a dopamina

| Alavanca | Mexe na dopamina do cérebro humano? | Melhor evidência | Risco |
|---|---|---|---|
| Mucuna pruriens | **Sim** (é levodopa) | RCTs em Parkinson | Alto se sem supervisão |
| L-tirosina | Só se houver esgotamento | Revisão de estudos cognitivos | Baixo; cuidado com IMAO |
| Café | Mexe no receptor, não na liberação | PET, N = 20 | Baixo |
| Banho gelado | Plasma, não cérebro | Šrámek 2000 (ver outro dossiê) | Baixo a moderado (cardíaco) |
| "Jejum de dopamina" | Não há medida | Nenhum estudo de dopamina | Baixo, exceto versões extremas |
| Sol | Associação fraca e contraditória | Transversais | Pele |
| Exercício | Misto (1 nulo, 1 positivo) | PET agudo | Baixo |
| Probióticos | Nenhuma medida no cérebro humano | Revisões mecanísticas | Baixo |

### 2.1 Mucuna pruriens: o único suplemento que realmente é dopaminérgico

- **Achado [V]:**
  - Cilia et al. 2017, *Neurology*: RCT duplo-cego cruzado, 18 pacientes com Parkinson avançado. Pó de semente torrada em dose alta (17,5 mg/kg) deu **mais** melhora motora e menos discinesia que a levodopa com benserazida, em dose única. https://pubmed.ncbi.nlm.nih.gov/28679598/
  - Cohen et al. 2022, *JAMA Neurology* (carta de pesquisa): suplementos de Mucuna comprados nos EUA tinham de **2 a 241 mg de levodopa por dose**, um sem nada detectável, e o conteúdo **não era previsível pelo rótulo**. Para comparação, um comprimido comum de levodopa para Parkinson tem 100 a 250 mg. Estudo anterior citado pelos autores: 4 a 354 mg por porção. [S para os números, via NutraIngredients e MedicalXpress; resumo indexado sem texto] https://jamanetwork.com/journals/jamaneurology/fullarticle/2795169 ; https://pubmed.ncbi.nlm.nih.gov/35939305/
  - Cilia & Katzenschlager 2026, *J Parkinsons Dis* (opinião clínica): uso sem supervisão associado a **discinesia, síndrome de desregulação dopaminérgica e complicações psiquiátricas**; recomenda restringir a protocolos com neurologista. https://pubmed.ncbi.nlm.nih.gov/42053204/
- **Segurança [S]:** levodopa com inibidores não seletivos da MAO (alguns antidepressivos antigos, como fenelzina e tranilcipromina) é contraindicada por risco de crise hipertensiva; a mesma regra vale para Mucuna, que é levodopa. Interação também com antipsicóticos (efeito oposto) e possível piora de psicose.
- **Gancho:** o único "booster de dopamina" de farmácia natural que funciona é, quimicamente, um remédio de Parkinson com dose aleatória.
- **Potencial de widget:** ★★★ Um "frasco" com 16 cápsulas que se enchem em alturas diferentes (2 a 241 mg) ao lado de uma linha "comprimido de Parkinson = 100 mg". Choque visual imediato.

### 2.2 L-tirosina

- **Achado [V]:** Jongkees et al. 2015, *J Psychiatr Res*, revisão: tirosina melhora cognição **apenas** em situações curtas de estresse ou alta demanda, quando a dopamina e a noradrenalina estão temporariamente esgotadas; benefício para transtornos clínicos e para exercício "parece mínimo". https://pubmed.ncbi.nlm.nih.gov/26424423/
- **Detalhe ótimo [V]:** Jongkees 2020, *Cogn Affect Behav Neurosci*: 2 g de tirosina em 45 jovens, duplo-cego. A média **não mudou**: quem ia mal melhorou e quem ia bem **piorou** (U invertido). https://pubmed.ncbi.nlm.nih.gov/32133585/
- **Gancho:** o precursor não é o gargalo. A enzima tirosina hidroxilase limita a produção (ver `dopamina-geral.md` 1.1); encher o tanque não acelera o motor.
- **Segurança [S]:** geralmente bem tolerada nas doses de estudo; cautela teórica com IMAO e hipertireoidismo.
- **Potencial de widget:** ★★ Curva em U invertido com dois pontos que se movem em direções opostas ao "tomar tirosina".

### 2.3 Café, banho gelado, sol, exercício

- Café: ver 1.2. Banho gelado: os +250% de Šrámek 2000 são de **dopamina no plasma**, que não atravessa a barreira hematoencefálica (já em `ciencia-factcheck.md`). Sol: ver 1.5. Exercício: ver 1.4.

### 2.4 Probióticos e "eixo intestino-cérebro"

- **Achado [S]:** boa parte da dopamina periférica é produzida no trato gastrointestinal, e microrganismos produzem dopamina em cultura e em animais. **Não encontrei nenhum ensaio humano que medisse dopamina cerebral após probiótico.** Em Parkinson, os RCTs mostram benefício em constipação, não em sintomas dopaminérgicos. https://content.iospress.com/articles/journal-of-parkinsons-disease/jpd240172
- **Gancho:** dopamina do intestino não chega ao cérebro (a mesma barreira do banho gelado).
- **Potencial de widget:** ★ Uma "barreira" visual que barra as setas do intestino, do sangue e do frio.

### 2.5 "Jejum de dopamina"

- Crítica científica já em `ciencia-factcheck.md` K1; ensaios de abstinência digital em `fronteira-e-dados.md` 2. O dado novo aqui: **nenhum estudo mediu dopamina** em quem fez o jejum. Tudo o que se testou foi comportamento e humor.

---

## 3. A camada pop

### 3.1 Linha do tempo dos termos

- **"Pleasure chemical" [S]:** a expressão se popularizou nos anos 1990; a revista *Time* de 1997 ("Addicted") é a citação clássica. https://filtermag.org/addiction-dopamine/amp/
- **"Dopamine fasting" (ago a nov/2019) [S]:** Cameron Sepah, psicólogo da UCSF, publica no LinkedIn o guia "Dopamine Fasting 2.0"; o *New York Times* (Nellie Bowles, nov/2019) leva o termo ao público. No Trends, "dopamine fasting" pula de 6 (set/2019) para **79 (nov/2019)**, na mesma escala do pico de 2026.
- **"Dopamine detox" (2020 em diante):** primeiro salto em **abril e maio de 2020** (de 3 para 52), em plena quarentena, carregado por YouTube de autoajuda [S]. Depois cresce ano a ano até 2024.
- **"Dopamine dressing" (2020 a 2022) [S]:** atribuído à "psicóloga da moda" Dawnn Karen (livro *Dress Your Best Life*, 2020). Não há estudo que teste a ideia com dopamina; o que existe é pesquisa de "enclothed cognition", que não mede neurotransmissor. https://www.inverse.com/input/style/dopamine-dressing-tiktok-trend-psychology
- **"Dopamine menu" / "dopamenu" (2020, viral em 2023) [S]:** surgiu numa conversa entre Jessica McCabe (canal *How to ADHD*) e o coach de TDAH Eric Tivers, em vídeo de maio de 2020. É uma lista pré-planejada de atividades para escolher quando bate o tédio, organizada como cardápio (entradas, pratos principais, "sobremesas" de tela). Ficou restrito à comunidade de TDAH até explodir no TikTok em 2023. https://dailydot.com/memes/dopamine-menu/ ; https://theconversation.com/dopamine-menus-the-science-behind-the-trend-and-how-it-might-help-people-with-adhd-218970
  - Nota justa: o menu é, na prática, **planejamento antecipado de alternativas**, uma técnica comportamental razoável. O nome é que é químico.
- **"Cheap dopamine" / "dopamina barata" [S]:** sem origem rastreável; aparece em newsletters de produtividade (Dan Koe e outros) e Substacks. Dicotomia entre recompensa rápida (rolar a tela) e "cara" (exercício, conquista). Nenhuma fonte neurocientífica testa essa categoria. https://thedankoe.com/letters/the-dopamine-epidemic-how-society-failed-to-think-long-term/
- **Potencial de widget:** ★★ Linha do tempo horizontal com os termos nascendo em cima das curvas do Trends.

### 3.2 Google Trends: séries prontas [V, API do Google Trends, consulta de 12/11/2026]

Médias anuais do índice mensal (0 a 100). **Valores na mesma linha são comparáveis entre si** (mesma consulta); entre tabelas, não. 2026 vai de janeiro a 10 de novembro.

**Mundo, consulta conjunta:**

| Termo | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|---|---|---|---|---|
| dopamine detox | 0,5 | 1,0 | 21,8 | 18,8 | 42,0 | 58,0 | **73,3** | 57,0 | 45,4 |
| dopamine fasting | 0,6 | 3,8 | 6,4 | 3,5 | 5,0 | 4,7 | 4,8 | 5,5 | 11,9 |
| dopamine menu | 0,4 | 0,4 | 0,8 | 0,9 | 1,0 | 2,8 | 6,3 | 11,8 | **20,6** |
| dopamine dressing | 0,0 | 0,0 | 0,0 | 0,5 | 5,4 | 4,0 | 3,3 | 7,0 | 8,0 |

- Pico mensal de "dopamine detox": **nov/2024 = 100**. Em out e nov/2026, 25 e 23: **queda de três quartos desde o pico**.
- "Dopamine menu" é o único termo ainda em alta. "Dopamine fasting" teve um repique em mai e jun/2026 (pico próprio de 100 na série isolada), sem causa identificada [NV].

**Mundo, a molécula contra as rivais (consulta conjunta):**

| Termo | 2018 | 2020 | 2022 | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|---|---|---|
| dopamine | 9,5 | 10,6 | 16,1 | 18,0 | 19,4 | 23,8 | 32,4 |
| serotonin | 10,4 | 12,6 | 14,0 | 12,8 | 12,5 | 14,3 | 19,9 |
| cortisol | 10,8 | 11,9 | 16,3 | 21,2 | 36,8 | 44,2 | **67,1** |
| oxytocin | 4,2 | 5,0 | 6,3 | 6,9 | 6,7 | 7,5 | 10,1 |

- "Dopamine" passou "serotonin" em 2022 e mais que triplicou desde 2018 (pico mensal em mai/2026). Mas **"cortisol" passou a dopamina em 2023** e hoje tem o dobro do interesse (onda de "cortisol face" e "baixar o cortisol").

**Brasil, consulta conjunta:**

| Termo | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|---|---|---|---|---|
| dopamina | 13,1 | 15,5 | 15,8 | 16,5 | 29,7 | **43,0** | 38,2 | 33,5 | 26,3 |
| serotonina | 17,2 | 24,0 | 24,4 | 24,1 | 30,6 | 28,2 | 22,0 | 19,1 | 14,2 |
| cortisol | 17,3 | 18,6 | 18,4 | 20,2 | 25,8 | 28,3 | 38,3 | 52,5 | **72,9** |
| detox de dopamina | 0 | 0 | 0 | 0 | 0 | 0 | 0,1 | 0,1 | 0 |

- Em outra consulta brasileira: "jejum de dopamina" teve média máxima de 1,2 (2023) e "dopamine detox" em inglês ficou em 0 frente a "dopamina". **O brasileiro não busca o protocolo, busca a palavra.**
- "Dopamina" no Brasil: pico mensal em **jun/2023**, e queda contínua desde então (2026 cerca de 40% abaixo de 2023). A subida de 2022 e 2023 coincide com a edição brasileira de *Nação Dopamina* (Vestígio, 2022), que passou cerca de um ano nas listas de mais vendidos [S, Bandab] e ganhou um *Workbook* (2024) [S]. Coincidência temporal, não causalidade.
- **Potencial de widget:** ★★★ Gráfico de linhas animado: as quatro curvas mundiais nascendo uma depois da outra (fasting em 2019, detox em 2020, dressing em 2022, menu em 2023), com o detox virando para baixo depois de 2024. Segundo painel: no Brasil, "dopamina" sobe e desce, e o "cortisol" a ultrapassa. Fecho perfeito: "a próxima molécula da moda já chegou".

### 3.3 Brasil: imprensa e mercado

- **[S]** Reportagens brasileiras de 2020 a 2026 repetem a crítica: o termo é "tecnicamente incorreto", não dá para "desintoxicar" de algo que o corpo produz o tempo todo (Band, dez/2025; Canaltech; IHU Unisinos, jan/2020, traduzindo a matéria do Vale do Silício). Olhar Digital (jul/2025) é mais favorável. https://www.band.com.br/saude/jejum-de-dopamina-funciona-ou-e-apenas-um-mito-da-internet ; https://canaltech.com.br/comportamento/jejum-de-dopamina-funciona-veja-o-que-dizem-medicos-e-especialistas/ ; https://ihu.unisinos.br/595395-a-nova-moda-do-vale-do-silicio-de-abandonar-o-alcool-o-sexo-e-as-redes-sociais-para-reiniciar-o-cerebro
- **Loot boxes no Brasil [S]:** o ECA Digital (Lei 15.211/2025) está **em vigor desde 17/03/2026** (prazo encurtado pela MP 1.319/2025), com decretos de 18/03/2026; o art. 20 veda "caixas de recompensa" em jogos direcionados a crianças e adolescentes ou de provável acesso por eles; a fiscalização é da ANPD. Isso **resolve a pendência** de `fronteira-e-dados.md` 2.5. Conferir o texto no DOU antes de citar o número do artigo. https://www12.senado.leg.br/noticias/materias/2026/03/17/eca-digital-para-protecao-on-line-de-criancas-e-adolescentes-entra-em-vigor ; https://www.machadomeyer.com.br/pt/inteligencia-juridica/publicacoes-ij/direito-digital/estatuto-digital-da-crianca-e-do-adolescente-lei-n-15-211-2025-entra-em-vigor-em-17-de-marco-de-2026
- **Influenciadores específicos [NV]:** não levantei nomes com dados de alcance. Pendência se o ensaio quiser citar alguém.

### 3.4 O que o público acredita

- **[NV, lacuna]:** não encontrei pesquisa de opinião de 2025 ou 2026 que meça quantas pessoas acreditam que "dopamina = prazer". O que existe é comentário de especialistas: National Geographic (fev/2025) e o neurologista Masud Husain (Lithub) dizem que o consenso é que a dopamina não causa prazer diretamente. https://www.nationalgeographic.com/science/article/science-behind-dopamine-function ; https://lithub.com/a-complex-yet-crucial-chemical-exposing-myths-about-dopamine/
- **Sugestão:** se o ensaio quiser esse dado, um quiz interativo no próprio texto ("o que a dopamina faz?") gera a pesquisa, com a resposta do leitor comparada às dos demais.
- **Potencial de widget:** ★★ Quiz de abertura com 4 opções (prazer, desejo, aprendizado, movimento). Todas exceto "prazer" estão certas.

---

## 4. Existe um "nível basal" de dopamina para resetar?

### 4.1 O que dá para medir em humanos, e quão estável é

- **Tônico contra fásico [S]:** a dopamina tem um nível de fundo (tônico, de disparos lentos e constantes) e picos rápidos (fásicos, de dezenas a centenas de milissegundos). O PET mede médias de dezenas de minutos e não separa os dois. Ver `dopamina-geral.md` 2.5 e 6.
- **Ocupação basal por depleção (AMPT) [V]:** é o mais perto de um "nível basal" literal. Esvazia-se a dopamina por um dia com alfa-metil-para-tirosina e mede-se quanto receptor "aparece".
  - Abi-Dargham et al. 2000, *PNAS*: controles **+9 ± 7%**; esquizofrenia **+19 ± 11%**. https://pubmed.ncbi.nlm.nih.gov/10884434/
  - Martinez et al. 2009, *Am J Psychiatry*: controles **+11,1 ± 4,4%**; dependentes de cocaína **+5,7 ± 5,9%**, isto é, **menos dopamina endógena em repouso**. https://pubmed.ncbi.nlm.nih.gov/19723785/
  - Leitura: em repouso, a dopamina ocupa algo como **um décimo** dos receptores D2 de uma pessoa saudável. A diferença de "baixa dopamina" do vício é de cerca de 5 pontos percentuais, e só aparece com um protocolo farmacológico de dois dias.
- **Receptores são um traço estável [V]:** reteste de 5 semanas com ICC de 0,82 (Alakurtti 2015). O que move o número de forma confiável: **idade** (D2 cai cerca de 8% por década, Karrer 2017, em `dopamina-geral.md` 5.1), **sono** (1.3), drogas crônicas (`ciencia-factcheck.md` E).
- **Diferenças individuais [V]:**
  - Volkow et al. 1999, *Am J Psychiatry*: 23 homens sem histórico de drogas; quem **gostou** do metilfenidato IV tinha D2 mais baixo (2,72) que quem **não gostou** (3,16). https://pubmed.ncbi.nlm.nih.gov/10484959/
  - Buckholtz et al. 2010, *Science*: impulsividade de traço prevista por **menos autorreceptor D2/D3 no mesencéfalo** e **mais liberação** de dopamina induzida por anfetamina. https://pubmed.ncbi.nlm.nih.gov/20671181/
  - Leitura: há diferenças estáveis entre pessoas, mas elas são de **sensibilidade e de freio**, não de "tanque cheio ou vazio".
- **Potencial de widget:** ★★★ "Seu basal": uma grade de 100 receptores em que só ~10 estão ocupados em repouso; slider "controle saudável / dependente de cocaína" muda de 11 para 6. Depois um botão "tomar anfetamina" ocupa mais 15. Mostra a escala real de tudo.

### 4.2 Genética: a promessa que não se replicou

- **DRD2 Taq1A [V]:** a variante "do gene do receptor D2" fica, na verdade, no gene vizinho **ANKK1**. Meta-análise com 61 estudos e mais de 18 mil pessoas: razão de chances de **1,19** para dependência de álcool (Wang et al. 2013, *Hum Genet*). https://pubmed.ncbi.nlm.nih.gov/23203481/ Para fumar, Munafò et al. 2009 não acharam evidência forte de associação. https://pubmed.ncbi.nlm.nih.gov/19246443/
- **COMT Val158Met [S]:** meta-análises (Barnett et al. 2008) acharam efeito nulo ou minúsculo sobre cognição em pessoas saudáveis, apesar de anos de "gene do guerreiro contra o preocupado" na imprensa. [NV: conferir número exato da meta-análise]
- **A lição geral [V]:** Border et al. 2019, *Am J Psychiatry*, com 62 mil a 443 mil pessoas: nenhum dos 18 genes candidatos clássicos da depressão se sustentou. A genética de comportamento é **poligênica**: milhares de variantes de efeito minúsculo. Testes de DNA vendidos como "seu perfil de dopamina" vendem um mapa sem território. https://pubmed.ncbi.nlm.nih.gov/30845820/
- **Potencial de widget:** ★★ Barra única "quanto do risco o Taq1A explica" quase invisível ao lado de "tudo o resto".

---

## 5. Hábito, aprendizado e esquemas de recompensa

### 5.1 Quanto do dia é hábito

- **Achado [V estudo; S número]:** Wood, Quinn & Kashy 2002, *J Pers Soc Psychol*. Dois estudos de diário com relatos a cada hora. Hábito definido como comportamento feito quase todo dia no mesmo contexto. Durante hábitos, as pessoas pensam em outra coisa e sentem menos estresse. O número popular: **cerca de 43%** das ações diárias eram habituais. https://pubmed.ncbi.nlm.nih.gov/12500811/
- **Ressalva:** amostra de universitários, autorrelato, definição operacional ampla.
- **Potencial de widget:** ★★ Um "dia" em 16 blocos de uma hora, com 43% pintados de cinza ("piloto automático").

### 5.2 Do ventral ao dorsal

- **Achado [V]:** Everitt & Robbins 2005, *Nat Neurosci*: a passagem de ação voluntária a hábito e a compulsão corresponde a uma passagem do controle **pré-frontal** para o **estriado**, e do estriado **ventral** para o **dorsal**, com sua inervação dopaminérgica. https://pubmed.ncbi.nlm.nih.gov/16251991/
- **Contraponto importante [V]:** de Wit et al. 2018, *J Exp Psychol Gen*: **cinco tentativas fracassadas** de induzir hábito em humanos por treino excessivo, incluindo duas réplicas do estudo original (Tricomi 2009). Em rato funciona; em gente, o laboratório não consegue reproduzir. https://pubmed.ncbi.nlm.nih.gov/29975092/
- **Gancho para o ensaio:** o mapa "ventral = querer, dorsal = automático" é bom como metáfora, mas o hábito humano é mais difícil de fabricar do que a imprensa faz parecer.

### 5.3 Quanto tempo leva para criar (ou desfazer) um hábito

- **Achado [V]:** Singh et al. 2024, *Healthcare*, revisão sistemática e meta-análise, 20 estudos, 2.601 pessoas: medianas de **59 a 66 dias** para automatizar um hábito de saúde, médias de **106 a 154 dias**, faixa individual de **4 a 335 dias**. https://pubmed.ncbi.nlm.nih.gov/39685110/
- **Clássico [S]:** Lally et al. 2010, *Eur J Soc Psychol*: 96 pessoas, mediana de **66 dias**, faixa de **18 a 254**.
- **Gancho:** os "30 dias" de qualquer reset (inclusive o da Lembke, que é sobre abstinência de droga, não sobre hábito) estão abaixo da mediana de formação de hábito. Não é que 30 dias não sirvam; é que "30" é um número redondo, não um número biológico.
- **Potencial de widget:** ★★★ Histograma de dias até o hábito (cauda longa até 335), com uma linha vertical em "30 dias" e outra em "21 dias" (mito popular de Maltz). O leitor vê quanta gente fica à direita.

### 5.4 Esquemas de reforço: por que o imprevisível prende

- **Clássico [S]:** Ferster & Skinner 1957, *Schedules of Reinforcement*: em **razão fixa** (recompensa a cada N respostas), o pombo faz uma pausa depois de cada prêmio e depois acelera ("pausa e corrida"); em **razão variável** (a cada N em média, imprevisível), a taxa é alta e **sem pausas**, e a resposta resiste muito mais à extinção (efeito do reforço parcial). Os registros cumulativos (escadinha contra rampa lisa) são o gráfico clássico.
- **Ponte neural [V]:** Fiorillo, Tobler & Schultz 2003, *Science*: além do pico de surpresa, os neurônios de dopamina têm uma **rampa sustentada que é máxima quando a probabilidade de recompensa é 50%** (incerteza máxima). Já citado em `ciencia-factcheck.md` C3. https://pubmed.ncbi.nlm.nih.gov/12649484/
- **Em humanos [V]:** o desenho de Zald 2004 (1.1) é literalmente razão fixa contra razão variável com dinheiro.
- **Apps [S]:** Loren Brichter, criador do "puxar para atualizar" (Tweetie, 2009), ao *Guardian* (Paul Lewis, out/2017): disse que **não projetou o gesto para viciar**, mas que hoje o vê como viciante e que, com notificações push, ele "poderia ser aposentado". A comparação com a alavanca do caça-níquel é do repórter, não dele. https://longreads.com/2017/10/10/immature-architects/ ; https://www.shortlist.com/news/pull-refresh-facebook-gambling [NV: conferir a frase exata no original do Guardian]
- **Loot boxes [V]:** Zendle & Cairns 2018/2019 (*PLoS One*): 1.172 jogadores que não sabiam o tema do estudo; associação entre gasto em loot box e gravidade de jogo problemático com **η² = 0,051** (efeito pequeno a moderado, transversal). Lei brasileira em 3.3.
- **Potencial de widget:** ★★★ Simulador de pombo: o leitor clica num botão sob esquema fixo e depois variável; um registro cumulativo é desenhado em tempo real. No esquema variável, o leitor sente a vontade de "só mais um". Depois, o mesmo gráfico com a curva de Fiorillo (pico em 50%).

---

## 6. Querer, gostar e esperar no cotidiano

(A teoria de Berridge e o erro de predição estão em `ciencia-factcheck.md` C. Aqui só os exemplos cotidianos e os dados humanos.)

- **A antecipação é o pico [V]:**
  - Knutson et al. 2001, *NeuroReport*: tarefa de atraso de incentivo monetário (MID), 9 pessoas. A **antecipação** do ganho ativa o estriado ventral; o **recebimento** ativa o córtex ventromedial frontal, não o estriado ventral. https://pubmed.ncbi.nlm.nih.gov/11726774/
  - Knutson et al. 2001, *J Neurosci*: a ativação do NAc cresce com o tamanho do prêmio esperado, e com a felicidade que o sinal desperta; não cresce com a punição esperada. https://pubmed.ncbi.nlm.nih.gov/11459880/
  - Salimpoor 2011 (1.1): caudado na antecipação do arrepio, NAc no pico. A mesma divisão aparece com música.
  - Ressalva: fMRI mede fluxo sanguíneo (BOLD), não dopamina. Um estudo que comparou PET e fMRI na mesma tarefa MID (Urban et al.) achou correspondência imperfeita [S]. https://tauruspet.med.yale.edu/staff/edm42/courses/ENAS_880_2011/papers/Urban-pp2011-fMRI-and-PET-MIDT.pdf
- **Dopamina infla a expectativa de prazer [V]:** Sharot et al. 2009, *Curr Biol*: levodopa tomada enquanto a pessoa imagina férias futuras faz essas férias serem avaliadas depois como **mais prazerosas de antemão**. A dopamina mexe no "quanto vou gostar", não no "quanto gostei". https://pubmed.ncbi.nlm.nih.gov/19913423/
- **Meditação, de novo [V]:** em Kjaer 2002, a dopamina subiu e o prazer não mudou (1.1). Mais um caso de dopamina sem "gostar".
- **Adaptação hedônica [S]:** Brickman, Coates & Janoff-Bulman 1978 (*J Pers Soc Psychol*): 22 ganhadores de loteria não estavam mais felizes que controles meses depois e sentiam menos prazer em coisas cotidianas. Amostra pequena; estudos posteriores com dados maiores acharam efeitos de renda mais duradouros. Mecanismo plausível: o erro de predição zera quando o prêmio vira esperado, e os neurônios ajustam a escala ao contexto de recompensas disponíveis (Tobler, Fiorillo & Schultz 2005, *Science*, "adaptive coding") [S].
- **Novidade [S]:** a região SN/VTA responde a estímulos novos, mesmo sem recompensa (Bunzeck & Düzel 2006, *Neuron*). Explica o apelo do feed infinito: cada item é uma pequena aposta de novidade.
- **Potencial de widget:** ★★★ Linha do tempo de uma recompensa cotidiana (a notificação, a comida no forno, a música chegando no refrão), com a curva de "querer" subindo antes e a de "gostar" num pico curto depois. Toggle "depois de 100 vezes": a curva de querer migra toda para a pista (o som da notificação) e o gostar fica igual ou menor.

---

## 7. A pergunta do título: o que "resetar a dopamina" pode querer dizer, honestamente

1. **Não existe um "nível de dopamina" único que suba, desça e possa ser zerado.** Há pelo menos quatro coisas diferentes: a ocupação basal dos receptores (~10% em repouso, medida só com depleção farmacológica), a densidade de receptores (estável como um traço, ICC 0,82), a capacidade de síntese (varia pouco, talvez com a estação) e os disparos fásicos (milissegundos, ligados ao erro de predição).
2. **Coisas que comprovadamente mexem nesses números em humanos:** idade (D2 cerca de -8% por década), uma noite sem dormir (menos receptor no estriado ventral), drogas crônicas (menos dopamina basal e menos receptor, parcialmente reversível; ver `ciencia-factcheck.md` E), remédios (metilfenidato -20%). Ficar um dia sem celular não está na lista, porque ninguém mediu.
3. **Os prazeres cotidianos são pequenos no PET:** música, meditação, comida e jogo dão sinais de 6 a 13%, perto do ruído de 4% do exame. Não há "overdose de dopamina" por TikTok mensurável; também não há "falta" mensurável por excesso de TikTok.
4. **O sentido honesto de "resetar":** mudar **previsões e pistas**. A dopamina fásica ensina o cérebro o que esperar. Quando o ambiente muda (sem a notificação, sem a pista do café com cigarro, com recompensas mais previsíveis), o erro de predição se recalibra, a "vontade" muda de alvo, e hábitos novos levam de semanas a meses (mediana de cerca de 2 meses, com enorme variação). É reaprendizado, não desintoxicação.
5. **O que é real nos protocolos pop:** o "jejum" e o "menu" funcionam, quando funcionam, como **controle de estímulos** e **planejamento de alternativas**, que são técnicas comportamentais com base. O nome químico é marketing; a técnica pode ser boa.
6. **O que é perigoso:** tratar a dopamina como algo a "repor" com suplementos. O único suplemento que realmente aumenta dopamina (Mucuna) é levodopa com dose aleatória.

- **Potencial de widget:** ★★★ "Painel de controle falso": o leitor vê botões "detox", "banho gelado", "Mucuna", "dormir mal", "envelhecer 10 anos", "parar de fumar 3 meses". Cada botão move (ou não move) quatro medidores (ocupação, receptores, síntese, picos). A maioria dos botões pop não mexe em nada mensurável; os chatos (sono, idade, drogas) mexem.

---

## 8. Ranking dos widgets deste dossiê

1. ★★★ **Régua comum com faixa de ruído** (1.0 e 1.1): todos os prazeres e drogas num eixo só, com o ruído do exame ao fundo.
2. ★★★ **Trends: a ascensão e queda das palavras** (3.2), com o cortisol ultrapassando no Brasil.
3. ★★★ **Frasco de Mucuna** (2.1): 2 a 241 mg contra o comprimido de 100 mg.
4. ★★★ **Simulador de pombo** (5.4): esquema fixo contra variável, registro cumulativo ao vivo.
5. ★★★ **Histograma do hábito** (5.3): 30 dias contra a mediana de 66 e a cauda até 335.
6. ★★★ **Grade de 100 receptores** (4.1): o "basal" é ~10 ocupados.
7. ★★★ **Painel de controle falso** (7).
8. ★★ Café como barra positiva (1.2); sono 2008 contra 2012 (1.3); exercício nulo contra positivo (1.4); tirosina em U invertido (2.2); quiz "o que a dopamina faz" (3.4).

---

## 9. Pendências antes de publicar

- Small 2003 e Boileau 2003: obter o % de queda de BP no texto completo (só a direção está verificada).
- de la Fuente-Fernández 2001: confirmar 17 a 21% no texto completo da *Science* (hoje via Alzforum).
- Volkow 2008 e 2012 (sono): obter o % de queda no estriado ventral.
- Ando 2024 (exercício): obter o % de queda de BP no texto completo.
- Wang 2000 (exercício): números vieram de citação do resumo pela busca; conferir no PDF do *J Nucl Med*.
- Kjaer 2002: resolver N = 8 contra N = 5 e procurar crítica ou replicação.
- Wood 2002: confirmar o "43%" no texto completo (o resumo não traz o número).
- Cohen 2022 (Mucuna): confirmar no texto se foram 16 ou 20 produtos analisados.
- Brichter: conferir a citação literal no *Guardian* (Paul Lewis, 6/10/2017).
- ECA Digital art. 20: conferir no texto oficial.
- Google Trends: os valores mudam levemente a cada consulta (amostragem do Google). Para o gráfico final, refazer a consulta na data de publicação e guardar o CSV.
- Barnett 2008 (COMT): conferir o número exato da meta-análise.
