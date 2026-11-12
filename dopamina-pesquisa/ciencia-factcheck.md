# Dopamina, gremlins e o "reset" de 30 dias: dossiê de neurociência e checagem

Dossiê de apoio para o ensaio interativo "Como resetar seu sistema de dopamina e superar o vício" (estilo ciechanow.ski / Nicky Case). Ponto de partida: o corte do Huberman Lab com a Dra. Anna Lembke publicado em 10 nov 2026 (transcrição em `transcricao-huberman-lembke-2026.txt`). Pesquisa feita em 12 nov 2026.

Escopo: a neurociência central e a checagem de cada alegação do clipe. Fora do escopo: design de visualização e tratamentos de fronteira 2025–26 (GLP-1 etc.), que ficam com outros dossiês.

**Legenda de confiabilidade**
- **[V]**: verificado na fonte primária (abstract, texto completo ou figura original lidos nesta pesquisa).
- **[S]**: confirmado só em fontes secundárias confiáveis (revisão, imprensa, livro-texto, resumo de terceiros).
- **[NV]**: não verificado, de memória ou de fonte fraca. Conferir antes de publicar.

Observação de método: os abstracts do PubMed foram lidos via a API E-utilities do NCBI (o site do PubMed bloqueia leitura automática). URLs no formato `https://pubmed.ncbi.nlm.nih.gov/<PMID>/` apontam para o registro. As curvas de microdiálise foram **digitalizadas à mão** de uma reprodução em baixa resolução do slide do NIDA (ver A1); trate os valores como ±5–10%.

---

## 0. Placar rápido: o que o clipe diz e como se sustenta

| # | Alegação no clipe | Veredito | Seção |
|---|---|---|---|
| 1 | Em ratos, chocolate +55%, sexo +100%, nicotina +150%, metanfetamina +1000% "acima da linha de base" | **Mistura de origens e de unidades.** Os números vêm de um slide do NIDA (Di Chiara & Imperato 1988; Di Chiara et al. 1999; Fiorino & Phillips 1997). O "1000%" é **% do basal** (≈ +900%) e é de **anfetamina**, não metanfetamina. A nicotina no slide fica em ~220% do basal (≈ +120%). "Comida" no slide provavelmente não é chocolate. | A1–A3 |
| 2 | "Dopamine firing" aumenta X% | **Impreciso.** A microdiálise mede concentração extracelular de dopamina, não disparo de neurônios. | A1 |
| 3 | O mesmo escalonamento vale em humanos, medido de forma relativa | **Parcialmente.** PET mostra que a dopamina liberada se correlaciona com o "barato" (r = 0,78), mas os números de PET (% de deslocamento de raclopride) não são comparáveis aos de microdiálise. | A4 |
| 4 | Quanto mais rápido a dopamina sobe, mais reforçador | **Bem sustentado** como regra geral (via de administração, metilfenidato oral × IV). Existem nuances (Samaha & Robinson; Rose 2010 sobre o cigarro). | B |
| 5 | Dopamina = prazer ("pleasure-pain balance") | **Simplificação contestada.** O consenso de Berridge e Robinson é que a dopamina faz "querer", não "gostar". Há evidências humanas mistas (Ferreri 2019). | C |
| 6 | Gangorra prazer-dor + "gremlins" de neuroadaptação | **Boa metáfora de uma teoria real** (processo oponente, Solomon & Corbit 1974; alostase, Koob & Le Moal). Não é uma descoberta da Lembke. | D |
| 7 | O uso crônico muda o ponto de ajuste hedônico | **Sustentado em animais** (limiares de autoestimulação elevados) e **compatível com PET humano** (menos D2, menos liberação de dopamina). Em humanos, parte disso pode ser **predisposição**, não consequência. | D, E |
| 8 | Sintomas "universais" de abstinência: ansiedade, irritabilidade, insônia, depressão, fissura | **Exagerado.** São comuns, mas os critérios do DSM-5 variam por substância, e algumas classes nem têm síndrome de abstinência definida. | F |
| 9 | 10–14 dias de abstinência aguda; nas semanas 3–4, ~80% se sentem bem melhor | **Plausível, evidência fraca.** O "80%" é impressão clínica da própria Lembke, sem estudo publicado. O melhor análogo (Brown & Schuckit 1988, álcool) mostra a depressão caindo de 42% para 6% em 4 semanas. | G |
| 10 | 30 dias "em média" para começar a resetar as vias de recompensa | **Sem base neurobiológica direta.** A própria Lembke disse à CNN: "pelo menos fenomenologicamente". Os estudos de PET mostram que receptores D2 e DAT levam **meses** e às vezes não se recuperam. | G, E |
| 11 | Buprenorfina/metadona funcionam por terem meia-vida longa | **Correto, mas incompleto** (também importam tolerância cruzada e agonismo parcial). Redução de mortalidade robusta: RR ≈ 0,47. | H |
| 12 | Largar álcool e cigarro juntos dá melhores resultados | **Misto.** Estudos observacionais e uma meta-análise de 2004 (+25% de sobriedade) apoiam. A Cochrane 2016 não acha efeito (RR 0,97). Um RCT (Joseph 2004) achou resultado **pior** para o álcool. | I |
| 13 | Café pareado com cigarro → largar os dois | **Plausível, pouco testado.** O pareamento existe, mas parar a cafeína não melhorou a cessação num RCT. | J1 |
| 14 | Largar uma droga sem substituir → melhora | **Apoiado:** quem remite tem **menos** risco de um novo transtorno (13,1% × 27,2%), contra o mito da substituição. | J2 |
| 15 | Redes sociais, jogo e sexo ativam a mesma via | **Parcialmente.** Jogo patológico é diagnóstico (DSM-5), mas tem um perfil dopaminérgico **diferente** das drogas. "Vício em rede social" não é diagnóstico, e a evidência é fraca e debatida. | J3 |

---

## A. Os números de dopamina em ratos

### A1. A origem: um slide do NIDA que junta três papers

- **Achado:** a escada "comida → sexo → nicotina → cocaína → anfetamina" vem de dois slides de um kit didático do NIDA ("Bringing the Power of Science to Bear on Drug Abuse & Addiction", fim dos anos 1990). Esse kit ainda circula, por exemplo na Supercourse da Univ. de Pittsburgh.
  - Slide **"Natural Rewards Elevate Dopamine Levels"**:
    - FOOD: "Di Chiara et al., Neuroscience, 1999", NAc shell, pico ~150% do basal.
    - SEX: "Fiorino and Phillips, J. Neuroscience, 1997", pico ~200% do basal.
  - Slide **"Effects of Drugs on Dopamine Release"**: "Di Chiara and Imperato, PNAS 1988". Quatro painéis (accumbens): **anfetamina** (pico ~1000–1100% do basal), **cocaína** (~330%), **nicotina** (~220%) e **morfina** (dose-dependente, ~140–200%).
- **Verificação [V]:** os slides foram lidos diretamente: https://sites.pitt.edu/~super1/lecture/lec27261/019.htm (comida/sexo, imagem `img019.GIF`) e o slide "Effects of Drugs on Dopamine Release" (`img018.GIF` na mesma pasta).
- **O livro da Lembke** (*Dopamine Nation*, 2021) diz que, "para um rato numa caixa, o chocolate aumenta a liberação basal de dopamina em 55%, o sexo em 100%". Na sequência vêm nicotina 150%, cocaína 225% e "**anfetamina** aumenta a liberação de dopamina em 1.000%". [S] (citação parcial no Goodreads: https://www.goodreads.com/quotes/11529676-for-a-rat-in-a-box-chocolate-increases-the-basal ; resumo com os cinco números: https://principus.si/?p=8541 ; entrevista à NPR com "cerca de 50%" para o chocolate: https://www.npr.org/transcripts/1030930259)
- **Divergências entre o clipe e as fontes:**
  1. **Mistura de "% do basal" com "% acima do basal".**
     - Comida: pico 150% do basal = +50% (≈ "55%").
     - Sexo: 195% = **+95%** (≈ "100%").
     - Cocaína: ~330% = +230% (≈ "225%").
     - Esses três foram convertidos corretamente para "acima".
     - A anfetamina, porém, tem pico de **~1000% do basal = +900%**. Dizer "1000% acima" infla o número.
     - A nicotina no slide fica em ~220% do basal, ou seja **+120%**, não +150%. É possível que o livro use outra fonte para a nicotina [NV].
  2. **Anfetamina ≠ metanfetamina.** O livro e o slide falam de anfetamina (d-anfetamina). No clipe ela diz "methamphetamines". A metanfetamina também produz aumentos enormes, mas o número citado não é dela [NV quanto ao valor exato para metanfetamina].
  3. **"Chocolate" provavelmente não é o alimento do gráfico.** O paper que bate com "Di Chiara et al., Neuroscience 1999" é Bassareo & Di Chiara 1999 (Neuroscience 89:637), que usou **Fonzies**, um salgadinho italiano de milho e queijo [V, abstract]. O grupo também usou chocolate em outros estudos (Bassareo & Di Chiara 1999 EJN; Bassareo, De Luca & Di Chiara 2002), mas não achei um "+55%" com chocolate [NV].
  4. **"Mice and rats".** Todos os dados são de **ratos**.
  5. **"Dopamine firing".** A microdiálise mede **dopamina extracelular** em amostras de 10–20 min. Não mede disparo neuronal.
  6. **Doses arbitrárias.** O painel da morfina mostra que o pico vai de ~140% (0,5 mg/kg) a ~200% (10 mg/kg). Comparar substâncias em doses escolhidas por conveniência não mede "potencial de vício intrínseco". As doses exatas de anfetamina, cocaína e nicotina em Di Chiara & Imperato 1988 não puderam ser lidas (o PDF da PMC tem bloqueio anti-robô) [NV].
- **Fontes primárias:**
  - Di Chiara G, Imperato A (1988). "Drugs abused by humans preferentially increase synaptic dopamine concentrations in the mesolimbic system of freely moving rats." *PNAS* 85:5274–8. https://pubmed.ncbi.nlm.nih.gov/2899326/ (PMC281732) [V, abstract]. Opiáceos, etanol, nicotina, anfetamina e cocaína aumentam a dopamine extracelular "especialmente no accumbens". Agonistas kappa (aversivos) **reduzem** a dopamina. Imipramina, atropina e difenidramina não alteram nada.
  - Fiorino DF, Coury A, Phillips AG (1997). "Dynamic changes in nucleus accumbens dopamine efflux during the Coolidge effect in male rats." *J Neurosci* 17:4849. https://pubmed.ncbi.nlm.nih.gov/9169543/ (PMC6573325) [V, texto completo]:
    - amostras a cada **15 min**; basal 3,0 ± 0,7 nM;
    - fêmea atrás de uma tela: **+44%**;
    - primeira cópula: **+95%** (pico);
    - saciedade: volta ao basal;
    - fêmea nova atrás da tela: +12% (n.s.);
    - cópula com a fêmea nova: **+34%**.
  - Bassareo V, Di Chiara G (1999). *Neuroscience* 89:637–41. https://pubmed.ncbi.nlm.nih.gov/10199600/ [V, abstract]. Comer Fonzies sem aviso estimula a dopamina mais na *shell* do que no *core*. Pistas apetitivas estimulam o *core*.
- **Potencial de widget:** ★★★ "A escada da dopamina", em duas camadas. A primeira são barras com os números do clipe. Um botão "ver as curvas originais" troca as barras pelas séries temporais reais (A2) e põe um interruptor "% do basal ↔ % acima do basal". O leitor vê o "1000%" virar "+900%" e a nicotina encolher. Um alerta "anfetamina ≠ metanfetamina" fecha a camada.

### A2. As curvas: séries temporais digitalizadas (prontas para gráfico)

Valores em **% do basal** (100 = linha de base). Lidos à mão das figuras do slide do NIDA, com incerteza de ±5–10% [V quanto à forma; valores aproximados].

**Drogas (Di Chiara & Imperato 1988, núcleo accumbens, amostras de ~20 min, t = 0 na injeção):**

| t (min) | Anfetamina | Cocaína | Nicotina (accumbens) | Nicotina (caudado) | Morfina 0,5 | Morfina 1,0 | Morfina 2,5 | Morfina 10 mg/kg |
|---|---|---|---|---|---|---|---|---|
| 0 | 100 | 100 | 100 | 100 | 100 | 100 | 100 | 100 |
| 20 | 520 | 220 | 222 | 120 | 125 | 138 | 145 | 148 |
| 40 | **1000** | 255 | 175 | 150 | **142** | 155 | 158 | 160 |
| 60 | 670 | 285 | 162 | 150 | 135 | **168** | 180 | 178 |
| 80 | 450 | **330** | 157 | 147 | 128 | 152 | **183** | 195 |
| 100 | 400 | 320 | 152 | 147 | 120 | 143 | 165 | **198** |
| 120 | 370 | 305 | 143 | 143 | 113 | 133 | 150 | 196 |
| 140 | 340 | 280 | 142 | 142 | 105 | 113 | 140 | 195 |
| 160 | 310 | 260 | 140 | 130 | 103 | 110 | 130 | 195 |
| 180 | 280 | 185 | 140 | 123 | 100 | 108 | 125 | 187 |
| 200 | 240 | 178 | – | – | – | 107 | 118 | 172 |
| 220 | 225 | 165 | – | – | – | 106 | 110 | 158 |
| 240 | 210 | 150 | – | – | – | 105 | 105 | 133 |
| 260 | 190 | 138 | – | – | – | 105 | 105 | 122 |
| 280 | 170 | 128 | – | – | – | 104 | 103 | 120 |
| 300 | 150 | 125 | – | – | – | – | 100 | 110 |

- Notas de leitura:
  - Na figura, os metabólitos DOPAC e HVA **caem** com a anfetamina, porque ela libera dopamina via o transportador e inibe a MAO. Com a cocaína, o HVA sobe um pouco.
  - O eixo da nicotina tem quebra e vai até ~250. O pico de ~220 é a melhor leitura possível.

**Recompensas naturais:**

| Comida (NAc shell, "Di Chiara et al. 1999", amostras de 10 min) | | Sexo (Fiorino & Phillips 1997, amostras de 15 min) | |
|---|---|---|---|
| t (min) | % basal | Amostra (fase) | % basal |
| 0–30 | ~100 (97–107) | 1 (basal) | ~105 |
| 40 (caixa vazia) | ~93 | 2 (fêmea atrás da tela) | ~144–150 [V: +44%] |
| 50 (comendo) | **~150** | 3 (cópula) | **~195–200** [V: +95%] |
| 60 | ~140 | 4 | ~182 |
| 70 | ~125 | 5 | ~172 |
| 80 | ~115 | 6 | ~175 |
| 90–120 | ~112 → 105 | 7 | ~163 |
| 130–180 | ~100 | 8 | ~163 |

- **Pontos para o texto:**
  - A comida dá um pico curto (~30 min) e volta.
  - O sexo sustenta a elevação enquanto dura a cópula e volta ao basal na saciedade (Coolidge).
  - A anfetamina sobe 10× e leva **mais de 5 h** para voltar.
  - A cocaína sobe ~3× e dura ~3 h.
  - **A diferença não está só no pico, está na área sob a curva.**
- **Potencial de widget:** ★★★ "Corrida de curvas". Um único eixo com escala alternável (linear ↔ log). O leitor liga e desliga cada curva e um contador mostra a "área sob a curva" (dopamina-minuto) de cada uma. Na escala linear, comida e sexo viram uma ondinha perto do chão, o que comunica o argumento da Lembke melhor que as barras.

### A3. Comida em rato faminto, habituação e novidade

- **Achado:** a resposta da dopamina à comida **habitua**. Depois de uma única pré-exposição, o mesmo alimento deixa de liberar dopamina na *shell* do accumbens, mas um alimento **novo** (chocolate) volta a liberar. A privação de comida reverte a habituação.
  - [V, abstract] Bassareo & Di Chiara 1999, *Eur J Neurosci* 11:4389: o chocolate, alimento não familiar, libera dopamina na *shell* habituada, e a habituação é específica ao sabor.
  - [V, texto completo] Bassareo, De Luca & Di Chiara 2002, *J Neurosci* 22:4709, https://pmc.ncbi.nlm.nih.gov/articles/PMC6758788/ :
    - "chocolate" = xarope Yoo-hoo diluído 1:1, dado intraoral;
    - em ratos pré-expostos 24 h antes, o chocolate **não** aumentou a dopamina na *shell*, mas aumentou no *core* e no córtex pré-frontal;
    - o texto não traz os percentuais de pico, que estão só nas figuras.
- **Contraste com a droga [S]:** Di Chiara insistiu que as drogas **não habituam** dessa forma: a liberação na *shell* se repete a cada dose. Esse é um argumento central de "por que a droga sequestra o aprendizado". Ver Di Chiara 1999, *Eur J Pharmacol* 375:13 [NV, não lido].
- **"Comida ~150% em ratos famintos":** a curva do slide é de ~150% do basal. Não achei a condição exata de privação do experimento do slide [NV].
- **Potencial de widget:** ★★ "Primeira mordida × segunda mordida". Duas curvas lado a lado (naive × pré-exposto) e o botão "trocar de alimento" que restaura o pico. Ilustra novidade e habituação, e abre o gancho para o *feed* infinito como "alimento sempre novo".

### A4. E em humanos?

- **Achado:** em humanos, a dopamina é medida indiretamente por PET com [11C]raclopride, que compete com a dopamina pelo receptor D2. Uma queda de 10–20% na ligação já é um efeito grande. Esses números **não são comparáveis** aos % de microdiálise.
- **Números [V]:**
  - Volkow et al. 1999, *JPET* 291:409, https://pubmed.ncbi.nlm.nih.gov/10490931/ : metilfenidato IV em 14 controles. O "barato" se correlaciona com a dopamina liberada (**r = 0,78**). Quem não teve aumento de dopamina não sentiu barato.
  - Leyton et al. 2002, *Neuropsychopharmacology* 27:1027, https://pubmed.ncbi.nlm.nih.gov/12464459/ : d-anfetamina oral (0,3 mg/kg) em 8 homens. A queda de ligação no estriado ventral se correlacionou com **"drug wanting" (r = 0,83)**, **não com humor**. Isso é evidência humana para "querer ≠ gostar" (ver C).
  - Koepp et al. 1998, *Nature* 393:266, https://pubmed.ncbi.nlm.nih.gov/9607763/ : jogar videogame reduz a ligação de raclopride no estriado, sobretudo o ventral, em proporção ao desempenho. Ressalva **[V]**: o próprio grupo (Egerton et al. 2009, https://pubmed.ncbi.nlm.nih.gov/19481108/) revisitou o estudo e apontou confusões possíveis por **movimento de cabeça e fluxo sanguíneo**. A comparação "videogame = dobra a dopamina", comum na imprensa, é [NV].
- **Potencial de widget:** ★ Nota de rodapé interativa: "por que não dá para medir em gente como em rato". Uma sonda de microdiálise contra um scanner PET, com a escala diferente dos números.

---

## B. "Quanto mais rápido, mais reforçador"

- **Achado:** a mesma molécula, no mesmo alvo e com o mesmo grau de bloqueio, é mais "gostosa" e mais abusada quando chega rápido ao cérebro. A forma da curva importa, não só a altura.
- **Números [V]:**
  - **Cocaína por via:** Volkow et al. 2000, *Life Sci* 67:1507, https://pubmed.ncbi.nlm.nih.gov/10983846/ . PET em 32 usuários.
    - O bloqueio do transportador (DAT) foi **comparável** entre as vias.
    - O tempo até o pico do "barato" foi:
      - **fumada 1,4 ± 0,5 min**;
      - **IV 3,1 ± 0,9 min**;
      - **intranasal 14,6 ± 8 min**.
    - Com o mesmo nível plasmático e o mesmo bloqueio, a fumada deu mais "barato" que a intranasal.
  - **Metilfenidato (Ritalina) × cocaína:** Volkow et al. 1995, *Arch Gen Psychiatry* 52:456, https://pubmed.ncbi.nlm.nih.gov/7771915/ .
    - Mesmos sítios de ligação.
    - Depuração do estriado: **90 min** para o metilfenidato e **20 min** para a cocaína.
    - O barato do metilfenidato some rápido mesmo com a droga ainda ligada.
  - **Metilfenidato oral:** Volkow et al. 1998, *Am J Psychiatry* 155:1325, https://pubmed.ncbi.nlm.nih.gov/9766762/ .
    - Ocupação do DAT aos 120 min: **12% (5 mg), 40% (10 mg), 54% (20 mg), 72% (40 mg), 74% (60 mg)**.
    - O pico cerebral só ocorre aos **60 min**.
    - Swanson & Volkow 2003, https://pubmed.ncbi.nlm.nih.gov/14624806/ : por via IV, o efeito reforçador aparece acima de ~**60% de bloqueio do DAT**. Por via oral, em dose clínica, esse limiar também é passado, mas "raramente" há efeito reforçador. A hipótese é que a via IV imita o disparo **fásico** e a oral, o **tônico**.
- **Nuances e contrapontos:**
  - [V] Samaha & Robinson 2005, *Trends Pharmacol Sci* 26:82, https://pubmed.ncbi.nlm.nih.gov/15681025/ : a ideia de que a entrega rápida é mais euforizante "não é convincente". Eles propõem que a velocidade promove a **plasticidade e a sensibilização**, não necessariamente mais prazer.
  - [V] Rose et al. 2010, *PNAS* 107:5190, https://pubmed.ncbi.nlm.nih.gov/20212132/ : PET com 11C-nicotina dentro do cigarro, resolução de 3 s. **Não há picos de nicotina cerebral a cada tragada.** A concentração sobe gradualmente. Os dependentes acumulam nicotina **mais devagar** que os não dependentes. Isso contradiz o folclore do "cada tragada é um pico".
- **Potencial de widget:** ★★★ "Mesma dose, três vias". Um slider de velocidade de entrega (fumado ↔ IV ↔ nasal ↔ oral) altera a curva de concentração cerebral. A área sob a curva fica fixa, mas o pico e a inclinação mudam, e um "medidor de barato" responde à **inclinação**. Dá para incluir o par "Ritalina oral × cocaína fumada" e o caso do cigarro como surpresa ("não é o que você pensava").

---

## C. Querer não é gostar: o que a dopamina realmente faz

### C1. Saliência de incentivo (Berridge & Robinson)

- **Achado:** a dopamina mesolímbica é necessária para **querer** ("wanting", saliência de incentivo), não para **gostar** ("liking", impacto hedônico) nem para aprender novos gostos.
- **Evidência [V]:**
  - Berridge & Robinson 1998, *Brain Res Rev* 28:309, https://pubmed.ncbi.nlm.nih.gov/9858756/ .
  - Ratos com **até 99% de depleção de dopamina** (6-OHDA) mantêm reações hedônicas normais à sacarose (lambidas, "sorriso" orofacial) e aversivas ao quinino.
  - Eles também aprendem novas aversões e respondem ao realce hedônico por benzodiazepínico.
  - Mas não se movem para buscar a comida.
- **Com dados humanos [V]:**
  - Leyton 2002: a dopamina correlaciona com "querer a droga" e não com humor (A4).
  - Volkow 1997 (*Nature* 386:830, https://pubmed.ncbi.nlm.nih.gov/9126741/ ): dependentes de cocaína têm **menor** liberação de dopamina e **menor** barato com metilfenidato, mas resposta aumentada no tálamo, associada à fissura. **No vício, o "querer" cresce enquanto o "gostar" encolhe.**
- **Contraponto [V]:** Ferreri et al. 2019, *PNAS* 116:3793, https://pubmed.ncbi.nlm.nih.gov/30670642/ . Em 27 pessoas, levodopa **aumentou** o prazer musical e risperidona **reduziu**. Em humanos, a dopamina parece modular o prazer relatado em alguma medida. O debate não está 100% fechado.
- **Histórico [V]:** Wise 2008, https://pubmed.ncbi.nlm.nih.gov/19073424/ . O próprio autor da "hipótese da anedonia" (dopamina = prazer, 1982) a reinterpreta como reforço e motivação de incentivo.
- **Implicação para o ensaio:** a "gangorra prazer-dor" da Lembke trata a dopamina como moeda do prazer. É a imagem que a neurociência atual mais corrige. Uma formulação mais precisa: **a dopamina é a moeda do "vale a pena ir atrás"**. O prazer vem de pontos quentes opioides e endocanabinoides. A própria Lembke ressalva no clipe que o prazer depende da "sinfonia" com opioides e canabinoides endógenos.
- **Potencial de widget:** ★★★ "Dois botões". Um rato (ou pessoa) com o botão QUERER (dopamina) e o botão GOSTAR (opioide no hotspot). O leitor gira cada um e vê o comportamento (correr até a alavanca) separado da expressão facial (o "sorriso" de rato de Berridge). O vício aparece como QUERER no máximo e GOSTAR caindo.

### C2. Pontos quentes hedônicos

- **Achado [V]:** Peciña & Berridge 2005, *J Neurosci* 25:11777, https://pubmed.ncbi.nlm.nih.gov/16354936/ . O aumento de "gostar" por opioide (DAMGO) acontece num **sítio de ~1 mm³** na *shell* medial rostrodorsal do accumbens. Já o aumento de **comer** ocorre em toda a *shell* medial.
- **Em revisão [V]:** Berridge & Kringelbach 2015, *Neuron* 86:646, https://pubmed.ncbi.nlm.nih.gov/25950633/ . "Querer" é gerado por um sistema grande e distribuído. "Gostar" é gerado por **pequenos hotspots**. Os candidatos clássicos a gerador de prazer, "incluindo os eletrodos de prazer e o sistema dopaminérgico mesolímbico, podem não gerar prazer afinal".
- **Potencial de widget:** ★★ Um mapa do accumbens em que o "querer" pinta uma área grande e o "gostar" acende só uma ilha de 1 mm³ (o tamanho importa visualmente).

### C3. Erro de predição de recompensa (Schultz)

- **Achado [V]:** Schultz, Dayan & Montague 1997, *Science* 275:1593, https://pubmed.ncbi.nlm.nih.gov/9054347/ . Os neurônios dopaminérgicos sinalizam o **erro de predição**: recompensa melhor que o esperado → disparo; igual ao esperado → nada; pior (omissão) → **pausa** abaixo da linha de base. Antes do aprendizado, o disparo ocorre na recompensa. Depois, migra para a pista que a prevê.
- **Incerteza [S]:** Fiorillo, Tobler & Schultz 2003, *Science* 299:1898 (citado em https://pubmed.ncbi.nlm.nih.gov/30990388/ ). Além do sinal fásico, há uma rampa sustentada máxima com probabilidade de recompensa de **50%**, a incerteza máxima. É um gancho para jogo e *feeds* de recompensa variável [o valor de 50% é S].
- **Relevância para o clipe:** o modelo de erro de predição explica a habituação (A3), a força das pistas (café → cigarro, J1) e por que a recompensa variável prende mais. O clipe não fala disso, mas é a peça que falta entre "dopamina sobe" e "a gente volta".
- **Potencial de widget:** ★★★ "Treine o neurônio". Pista luminosa → suco. O leitor aperta "próximo ensaio" e vê o pico de disparo migrar do suco para a luz. Depois, omitir o suco produz o "buraco". Um slider de probabilidade de recompensa mostra a rampa de incerteza no máximo em 50%.

---

## D. A gangorra e os gremlins: processo oponente e alostase

### D1. Solomon & Corbit 1974: a origem da metáfora

- **Achado:** todo estímulo afetivo dispara um **processo a** (rápido, ligado ao estímulo) e recruta um **processo b** oposto (lento, inercial). O que se sente é a − b. Com a repetição, **a não muda e b cresce**: começa mais cedo, fica maior e demora mais a decair. É exatamente a imagem dos "gremlins que se multiplicam e fazem musculação".
- **Fontes:**
  - Solomon RL, Corbit JD (1974). "An opponent-process theory of motivation: I. Temporal dynamics of affect." *Psychological Review* 81:119–145 [S, citação conferida em https://pubmed.ncbi.nlm.nih.gov/17289192/ ; texto original não lido].
  - Solomon RL (1980). "The opponent-process theory of acquired motivation: **the costs of pleasure and the benefits of pain**." *Am Psychol* 35:691. https://pubmed.ncbi.nlm.nih.gov/7416563/ [V, registro; sem abstract]. O título é praticamente a tese da Lembke, 40 anos antes.
  - Resumos: https://en.wikipedia.org/wiki/Opponent-process_theory [S].
- **Forma da curva ("padrão-padrão da dinâmica afetiva") [S]:**
  1. Ao ligar o estímulo, o afeto sobe a um **pico** (A).
  2. Vem uma **adaptação**: queda até um **platô** (o b entra em cena).
  3. Ao desligar o estímulo, há um **pós-efeito** de sinal oposto (B), com pico rápido.
  4. Esse B decai lentamente até zero.
  - Com repetição (usuário experiente): o pico A fica menor (tolerância), o platô fica próximo de zero ou negativo, e o pós-efeito B fica **maior e mais longo** (abstinência).
  - Exemplos clássicos: paraquedistas (medo → euforia de alívio); cães recebendo choques (frequência cardíaca, depois rebote); opiáceos (euforia → abstinência).
- **Um modelo simples para animar [proposta nossa, não do paper]:**
  - `a(t) = A·s(t)`, em que s = 1 enquanto o estímulo está presente.
  - `db/dt = (k·a(t) − b)/τ_b`, com τ_b ≫ τ_a.
  - Afeto sentido `= a − b`.
  - A cada uso, `k ← k + Δk` e `τ_b ← τ_b + Δτ` (os gremlins se multiplicam e ficam mais lentos para descer).
  - Em abstinência prolongada, k e τ_b decaem de volta (os gremlins "recebem o recado").
  - Alostase (D2): acrescentar um deslocamento do ponto de ajuste `S(t)`, que vai ficando negativo com o uso acumulado e decai muito devagar.
- **Ressalvas:**
  - É uma teoria psicológica dos anos 1970, não um mecanismo único. O b não é um neurotransmissor; ele inclui sistemas de estresse (CRF, dinorfina) e queda de dopamina e opioides.
  - O próprio Koob a transformou em alostase porque o b **não volta** totalmente ao zero.
- **Potencial de widget:** ★★★ É **o** widget central do ensaio: a gangorra animada ligada a um gráfico a−b em tempo real.
  - O leitor clica "usar" repetidamente e vê os gremlins (processo b) crescerem. O pico encolhe e o vale depois de cada uso aprofunda e alarga.
  - Um botão "parar por N dias" mostra o vale se fechar lentamente.
  - Um slider de "intervalo entre usos" mostra que, se você usa de novo antes de o b decair, o ponto de ajuste afunda (o espiral).

### D2. Koob & Le Moal: alostase e o "lado escuro" do vício

- **Achado [V]:**
  - Koob & Le Moal 1997, *Science* 278:52 ("hedonic homeostatic dysregulation"), https://pubmed.ncbi.nlm.nih.gov/9311926/ .
  - Koob & Le Moal 2001, *Neuropsychopharmacology* 24:97, https://pubmed.ncbi.nlm.nih.gov/11120394/ .
  - Koob & Le Moal 2008, *Annu Rev Psychol* 59:29 ("antireward system"), https://pubmed.ncbi.nlm.nih.gov/18154498/ .
  - O vício é uma "espiral de desregulação" em que processos oponentes "não retornam à faixa homeostática normal". Forma-se um **estado alostático**, um "**desvio crônico do ponto de ajuste da recompensa**", com dopamina e opioides diminuídos e CRF (estresse) aumentado.
  - O uso de droga alivia o déficit no curto prazo e piora a desregulação no longo. É a frase da Lembke: "self-medication… digging themselves deeper into that reward deficit hole".
- **Evidência animal com números:**
  - [V] Markou & Koob 1991, *Neuropsychopharmacology* 4:17, https://pubmed.ncbi.nlm.nih.gov/2003866/ : depois de uma farra de cocaína autoadministrada, o **limiar de autoestimulação intracraniana sobe** ("anedonia"), em magnitude e duração **proporcionais à quantidade consumida**.
  - [V] Ahmed, Kenny, Koob & Markou 2002, *Nat Neurosci* 5:625, https://pubmed.ncbi.nlm.nih.gov/12055635/ : abstinências repetidas de acesso prolongado à cocaína produzem uma **queda persistente** da função de recompensa, **altamente correlacionada com a escalada** do consumo, e reduzem o impacto hedônico da própria cocaína.
  - [S] Ahmed & Koob 1998, *Science* 282:298 ("change in hedonic set point"): ratos com acesso de 6 h/dia (LgA) escalam o consumo; com 1 h/dia (ShA) ficam estáveis. Os números exatos de infusões não foram lidos [NV]. Christensen et al. 2008 (https://pubmed.ncbi.nlm.nih.gov/18692088/ ) reanalisa: a "força" da cocaína cresce com a experiência, a da comida não.
- **Potencial de widget:** ★★★ "O ponto de ajuste que afunda". Uma linha de base pontilhada que vai descendo com o uso acumulado. "Normal" passa a exigir droga. Pode ser uma camada sobre o widget D1, ou o gráfico de limiar de autoestimulação (ShA × LgA) ao longo de sessões.

---

## E. Downregulation: receptores D2, transportadores e recuperação

- **Achado:** usuários crônicos de cocaína, metanfetamina, álcool e heroína mostram **menos receptores D2 disponíveis** no estriado (PET com raclopride) e **menos liberação** de dopamina a um desafio. A recuperação na abstinência é **parcial, lenta (meses) e variável**. Parte da redução pode **anteceder** o uso (vulnerabilidade).
- **Números [V]:**
  - **Cocaína:**
    - Volkow 1990, *Am J Psychiatry* 147:719, https://pubmed.ncbi.nlm.nih.gov/2343913/ : D2 reduzido com ≤1 semana de desintoxicação, **comparável ao normal com 1 mês**. Amostra pequena (n = 10), traçador antigo (NMS).
    - Volkow 1993, *Synapse* 14:169, https://pubmed.ncbi.nlm.nih.gov/8101394/ : a redução de D2 **persistiu 3–4 meses** após a desintoxicação e se associou a menor metabolismo orbitofrontal.
    - Volkow 1997, *Nature* (C1): menor liberação de dopamina e menor barato.
  - **Metanfetamina:**
    - Volkow 2001, *Am J Psychiatry* 158:2015, https://pubmed.ncbi.nlm.nih.gov/11729018/ : D2 **−16% no caudado e −10% no putâmen** (15 usuários × 20 controles).
    - DAT −27,8% (caudado) e −21,1% (putâmen) (Volkow et al. 2001, "Association of dopamine transporter reduction with psychomotor impairment in methamphetamine abusers") [V, trecho do abstract; volume e página da revista NV].
    - **Recuperação:** Volkow 2001, *J Neurosci* 21:9414, https://pubmed.ncbi.nlm.nih.gov/11717374/ . **n = 5**, retestados entre abstinência curta (<6 meses) e prolongada (**12–17 meses**). O DAT subiu **+19% (caudado) e +16% (putâmen)**. O desempenho cognitivo e motor **não** melhorou significativamente.
  - **Álcool:**
    - Volkow 2002, *Psychiatry Res* 116:163, https://pubmed.ncbi.nlm.nih.gov/12477600/ : 14 alcoólicos testados em até 6 semanas de desintoxicação e de novo **1–4 meses** depois. **Sem recuperação significativa** de D2. Os autores sugerem que o D2 baixo "pode refletir um fator predisponente".
    - Volkow 2007, *J Neurosci* 27:12700, https://pubmed.ncbi.nlm.nih.gov/18003850/ : a liberação de dopamina por metilfenidato é **70% menor no estriado ventral e 50% menor no putâmen** em alcoólicos desintoxicados.
  - **Obesidade:** Wang et al. 2001, *Lancet* 357:354, https://pubmed.ncbi.nlm.nih.gov/11210998/ . D2 estriatal 2,47 ± 0,36 em 10 obesos × 2,99 ± 0,41 nos controles, correlação negativa com o IMC. **Ressalva [V]:** Horstmann et al. 2015, *Obes Rev*, https://pubmed.ncbi.nlm.nih.gov/26098597/ : os dados humanos são "equívocos", com relações positivas, negativas ou nulas. A proposta deles é uma relação **quadrática**. Não use a obesidade como exemplo limpo.
  - **Causalidade nos dois sentidos (macacos) [V]:** Nader et al. 2006, *Nat Neurosci* 9:1050, https://pubmed.ncbi.nlm.nih.gov/16829955/ .
    - 12 macacos rhesus.
    - O D2 **basal previu** a taxa de autoadministração de cocaína.
    - O D2 caiu **15–20% na primeira semana** de uso e ficou ~20% abaixo durante 1 ano.
    - Na abstinência, alguns macacos recuperaram e outros continuavam baixos **após até 1 ano**.
    - [S] Morgan et al. 2002 (*Nat Neurosci*): macacos que viraram dominantes ganharam D2 e se autoadministraram menos cocaína [NV quanto aos números].
  - **Vulnerabilidade [V, parcial]:** Volkow 2006 (*Arch Gen Psychiatry*): membros **não alcoólicos** de famílias com alcoolismo têm D2 **mais alto** que o normal, o que sugere um fator protetor.
  - **Envelhecimento (escala de referência) [V]:** Volkow 1996, *Psychiatry Res* 67:11, https://pubmed.ncbi.nlm.nih.gov/8797238/ : D2 cai ~**8% por década**. Ou seja, os −10 a −20% do vício equivalem a "envelhecer" uma a duas décadas nesse marcador (comparação nossa, retórica).
- **Ressalvas:**
  - "Disponibilidade" de D2 no PET mistura densidade de receptores com dopamina endógena competindo.
  - As amostras são pequenas (n = 5 a 20).
  - Os estudos são transversais na maioria.
- **Potencial de widget:** ★★★ "Os receptores voltam?".
  - Barras de D2 e DAT em % dos controles: meth D2 84/90; meth DAT 72/79 → depois de 12–17 meses ~86/92 (aplicando +19/+16%, aproximação nossa).
  - Uma linha do tempo de recuperação com os pontos reais: 1 semana (baixo), 1 mês (normal, Volkow 1990), 3–4 meses (ainda baixo, Volkow 1993), 1–4 meses no álcool (sem mudança), 12–17 meses na meth (DAT parcial).
  - Mensagem: **"30 dias" é cedo demais para o hardware**, mesmo que o humor já tenha melhorado (G).
  - Variante: o gráfico de Nader com macacos individuais (um "espaguete" de linhas que recuperam ou não).

---

## F. Os sintomas "universais" de abstinência

- **Alegação:** "os sintomas universais de abstinência de qualquer substância ou comportamento são ansiedade, irritabilidade, insônia, depressão e fissura".
- **Checagem:**
  - **Os sintomas afetivos negativos são comuns** a muitas classes. É a "síndrome motivacional de abstinência" de Koob (D2).
  - [V] Tabaco: Hughes 2007, *Nicotine Tob Res* 9:315, https://pubmed.ncbi.nlm.nih.gov/17365764/ . Raiva, ansiedade, depressão, dificuldade de concentração, impaciência, insônia e inquietação são sintomas válidos, com **pico na 1ª semana e duração de 2–4 semanas**. Sonolência e fadiga **não** são.
  - [V] Cannabis: Budney et al. 2003, *J Abnorm Psychol* 112:393, https://pubmed.ncbi.nlm.nih.gov/12943018/ . Agressão, raiva, ansiedade, irritabilidade, inquietação, problemas de sono e perda de apetite. **Início entre os dias 1–3, pico entre os dias 2–6, a maioria dura 4–14 dias.** Magnitude "comparável à do tabaco".
  - [V] Cocaína: Weddington et al. 1990, *Arch Gen Psychiatry* 47:861, https://pubmed.ncbi.nlm.nih.gov/2393345/ . Em internação controlada (n = 12), o sofrimento e a fissura foram **máximos na admissão e caíram gradual e continuamente em 28 dias**. Os autores dizem que **não houve um padrão clássico de "abstinência"** e preferem o termo "abstinência de curto prazo". Isso contrasta com o modelo trifásico de "crash" de Gawin & Kleber 1986 (https://pubmed.ncbi.nlm.nih.gov/3947206/ ).
  - **Não é universal [S]:**
    - No DSM-5, os critérios de abstinência **variam** por classe. A cocaína/estimulantes listam disforia + fadiga, sonhos vívidos, insônia ou hipersonia e aumento de apetite; ansiedade não é critério. Os opioides incluem sintomas físicos (náusea, diarreia, midríase).
    - O DSM-5 **não define síndrome de abstinência** para alucinógenos, inalantes e fenciclidina.
    - No transtorno do jogo, o critério é "inquietação ou irritabilidade ao tentar reduzir", não uma síndrome completa.
    - Para "vício" em redes sociais não há critério oficial (J3).
  - **Abstinência protraída [V]:** Heilig et al. 2010, *Addict Biol* 15:169, https://pubmed.ncbi.nlm.nih.gov/20148778/ . No álcool, os sintomas negativos agudos ocorrem na "grande maioria" e **desaparecem em 3–6 semanas**, mas o **risco de recaída persiste muito além**. Neuroadaptações sutis (sensibilidade ao estresse, afeto negativo) duram meses. Isso desacopla "sentir-se melhor" de "estar fora de risco".
- **Potencial de widget:** ★★ Uma "matriz de sintomas × substâncias" (heatmap), com células marcadas como critério do DSM-5, comum mas não critério, ou ausente. A diagonal comum (irritabilidade, humor, sono, fissura) aparece, mas com buracos visíveis.

---

## G. A linha do tempo: 10–14 dias, semanas 3–4, "80%" e "30 dias"

- **Alegações:**
  - "Para a maioria das substâncias e pessoas, 10 a 14 dias de abstinência aguda."
  - "Nas semanas 3 ou 4, cerca de 80% relatam se sentir significativamente melhor."
  - "30 dias porque, em média, é o tempo para começar a resetar as vias de recompensa."
- **O que existe:**
  - **O melhor dado quantitativo [V]:** Brown & Schuckit 1988, *J Stud Alcohol* 49:412, https://pubmed.ncbi.nlm.nih.gov/3216643/ .
    - 191 homens alcoólicos, sem transtorno psiquiátrico prévio, internados.
    - Escala de Hamilton na admissão e a cada semana.
    - **42% com depressão clinicamente significativa (HAM-D ≥ 20) na admissão, só 6% na semana 4.** A maior queda ocorre na **semana 2**.
    - Os sintomas de humor caem mais rápido; os vegetativos (sono, apetite) persistem mais.
    - Os autores recomendam **não prescrever antidepressivo antes de 4 semanas** de abstinência. Muito provavelmente essa é a raiz clínica da regra das 4 semanas usada pela Lembke.
  - **Tabaco:** sintomas por 2–4 semanas (Hughes 2007) [V]. **Cannabis:** 4–14 dias, com o sono podendo durar mais (Budney 2003) [V]. **Cocaína:** melhora contínua em 28 dias (Weddington 1990) [V]. **Álcool:** sintomas negativos agudos se resolvem em 3–6 semanas (Heilig 2010) [V].
  - **O "80%" é da própria Lembke, como impressão clínica.**
    - Em ensaio publicado, ela escreve que "cerca de 80% dos meus pacientes se sentem melhor só com essa intervenção" [S, via resultados de busca; texto original atrás de paywall no IAI, 20 mar 2023: https://iai.tv/articles/too-much-pleasure-causes-pain-anna-lembke-auid-2421 ].
    - À Medscape/MDedge (19 jan 2024), ela disse que a fissura "começa a diminuir em cerca de 4 semanas", que gostaria de "ver mais evidências também" e que a base é observação clínica e consenso: https://community.the-hospitalist.org/content/dopamine-fasting-some-mds-are-prescribing-it-should-you [S].
    - À CNN (jul 2025): "é, em média, o tempo que leva para resetar as vias de recompensa, **pelo menos fenomenologicamente**": https://www.ksl.com/article/51340206/how-to-tell-if-you-have-a-dopamine-deficit-and-what-you-can-do-to-reset [S].
  - **O que *não* existe:** nenhum estudo que meça "reset das vias de recompensa" em 30 dias. Os marcadores biológicos medidos (D2, DAT, liberação de dopamina) levam **meses** e às vezes não se normalizam (E). O "30 dias" é uma **janela clínica pragmática** (tempo suficiente para a síndrome aguda passar, curto o bastante para o paciente aceitar), não uma constante biológica.
- **Veredito:**
  - "10–14 dias de pior fase" e "melhora clara em 3–4 semanas" são **compatíveis** com a literatura de álcool, tabaco, cannabis e cocaína.
  - "80%" é **[NV]**: impressão clínica sem denominador publicado. Não converter em estatística no ensaio.
  - "Resetar vias de recompensa em 30 dias" é **fraco/enganoso** se lido literalmente. O humor se recupera antes do hardware.
- **Potencial de widget:** ★★★ "As duas curvas da recuperação".
  - No mesmo eixo de 0 a 18 meses, plotar a % com depressão clínica no álcool (42 → 6% em 4 semanas, Brown & Schuckit) e a disponibilidade de DAT/D2 (pontos de E).
  - Uma faixa sombreada marca os "30 dias".
  - O leitor vê que o **humor** volta dentro da janela e os **receptores** não.
  - Uma terceira curva opcional, conceitual: "risco de recaída" (Heilig), descendo devagar.

---

## H. Buprenorfina e metadona: meia-vida longa e mortalidade

- **A lógica do clipe:** pôr um peso estável no lado do prazer sem os ciclos de pico e queda que alimentam os gremlins. Isso é coerente com o processo oponente. Picos rápidos e quedas rápidas (heroína, fentanil) maximizam o b. Uma ocupação estável e lenta evita os rebotes de abstinência várias vezes ao dia.
- **Meias-vidas:**
  - Buprenorfina sublingual ~**38 h** (25–70 h) [S, StatPearls: https://www.statpearls.com/point-of-care/18708 ].
  - Metadona **~8–60 h**, média ~22–24 h, com enorme variação individual (5–130 h numa revisão) [S, StatPearls / PMC3890252].
  - Heroína: poucos minutos, convertida em 6-MAM e morfina; morfina ~2–3 h [NV, de memória].
- **O que falta na explicação:** a buprenorfina é **agonista parcial** com teto de efeito respiratório e alta afinidade (bloqueia outros opioides). A metadona dá **tolerância cruzada**. O benefício não é só a meia-vida [S].
- **Mortalidade [V]:**
  - Sordo et al. 2017, *BMJ* 357:j1550, https://pubmed.ncbi.nlm.nih.gov/28446428/ . 19 coortes, 122.885 em metadona e 15.831 em buprenorfina.
    - **Mortalidade por todas as causas, por 1.000 pessoa-anos:**
      - metadona: **11,3 em tratamento × 36,1 fora** (razão 3,20);
      - buprenorfina: **4,3 × 9,5** (razão 2,20).
    - **Overdose:** metadona 2,6 × 12,7; buprenorfina 1,4 × 4,6.
    - A mortalidade cai bruscamente nas **4 primeiras semanas** de metadona e sobe nas semanas após sair do tratamento.
  - Santo et al. 2021, *JAMA Psychiatry* 78:979, https://pubmed.ncbi.nlm.nih.gov/34076676/ . 36 coortes (749.634 pessoas) + 15 RCTs.
    - Mortalidade em tratamento: **RR 0,47** (metadona 0,47; buprenorfina 0,34).
    - Suicídio 0,48; morte relacionada a drogas 0,41.
    - **Nas 4 semanas após parar o tratamento, a mortalidade é 6× maior** (RR 6,01).
    - Nas 4 primeiras semanas de metadona, a mortalidade é ~2× a do resto do tratamento.
- **Ressalva:** os dados são observacionais (confusão e seleção), mas o efeito é grande e consistente.
- **Potencial de widget:** ★★ "Curvas de concentração ao longo de 3 dias": heroína (dentes de serra várias vezes ao dia) × metadona (onda suave diária) × buprenorfina (quase plana), sobrepostas à gangorra. Barras de mortalidade por 1.000 pessoa-anos (36,1 → 11,3) e um alerta sobre o pico de risco ao sair do tratamento.

---

## I. Largar álcool e cigarro ao mesmo tempo

- **Alegação:** há estudos mostrando que quem larga álcool e nicotina juntos tem melhores resultados do que quem larga só o álcool.
- **Evidência a favor:**
  - [V] Prochaska, Delucchi & Hall 2004, *J Consult Clin Psychol* 72:1144, https://pubmed.ncbi.nlm.nih.gov/15612860/ . Meta-análise de **19 RCTs**: intervenções de cessação durante o tratamento de dependência estão associadas a **+25% de probabilidade de abstinência de longo prazo de álcool e drogas**. O efeito sobre o **fumo** foi significativo no pós-tratamento, mas **não** no longo prazo.
  - [V] Tsoh et al. 2011, *Drug Alcohol Depend* 114:110, https://pubmed.ncbi.nlm.nih.gov/21050681/ . 1.185 adultos acompanhados por 9 anos.
    - Só 14,1% dos fumantes pararam no 1º ano.
    - Quem parou teve mais abstinência de drogas (**OR 2,4**) e mais remissão combinada (**OR 1,6**).
    - **Mas não houve associação com abstinência de álcool** entre os dependentes de álcool, controlando o status no 1º ano.
  - [V] Weinberger et al. 2017, *J Clin Psychiatry* 78:e152, https://pubmed.ncbi.nlm.nih.gov/28234432/ . NESARC, n = 5.515 com transtorno remitido. Continuar fumando → **OR 2,02 de recaída**. Começar a fumar → **OR 4,86**.
  - [V] Kalman et al. 2010, *Clin Psychol Rev*, https://pubmed.ncbi.nlm.nih.gov/19748166/ : até **80%** dos alcoólicos em tratamento fumam. O fumo retarda a recuperação cognitiva. Tratar o tabaco "não compromete" a abstinência de álcool.
- **Evidência contra ou neutra:**
  - [V] **Joseph et al. 2004**, *J Stud Alcohol* 65:681, https://pubmed.ncbi.nlm.nih.gov/15700504/ . RCT com 499 fumantes em tratamento de álcool, cessação concomitante × adiada 6 meses.
    - Cessação do fumo aos 18 meses: igual (12,4% × 13,7%).
    - **Abstinência prolongada de álcool foi PIOR no grupo concomitante:** 41% × 56% (6 meses), 33% × 42% (12 meses), 41% × 48% (18 meses).
    - Os autores pedem confirmação porque o resultado destoa da literatura.
  - [S] Apollonio, Philipps & Bero 2016, **Cochrane** CD010274 (34 estudos): a cessação do tabaco **não altera** a abstinência de álcool e drogas (**RR 0,97**, IC 0,91–1,03). Certeza baixa. Para o fumo, aconselhamento + farmacoterapia dá ~16% × 9% (RR 1,74). https://cochranelibrary.com/cdsr/doi/10.1002/14651858.CD010274.pub2/information
- **Veredito:**
  - "Melhores resultados" é **apoiado por estudos observacionais e por uma meta-análise de 2004**.
  - A evidência experimental mais recente mostra, na melhor das hipóteses, **que não atrapalha**, e um RCT mostrou o contrário.
  - A frase mais honesta: **"largar o cigarro junto não prejudica a sobriedade e pode ajudar"**.
  - A explicação da Lembke ("você não fica cutucando a via de recompensa") é a interpretação dela, não testada diretamente.
  - Os observacionais têm confusão óbvia: quem consegue parar de fumar é diferente de quem não consegue.
- **Potencial de widget:** ★★ "Floresta de estudos". Um forest plot simples com Prochaska (+25%), Tsoh (OR 2,4 drogas; nulo álcool), Weinberger (OR 2,02), Cochrane (RR 0,97) e Joseph (abstinência de álcool 41 × 56%), coloridos por desenho (RCT × observacional). Mostra visualmente que "depende de qual estudo".

---

## J. Pistas, substituição e "vícios comportamentais"

### J1. Pareamento de pistas (café → cigarro)

- **Achado:** pistas pareadas disparam fissura e lapsos. É o mecanismo de condicionamento pavloviano que se encaixa no erro de predição (C3).
  - [V] Shiffman et al. 1996, *J Consult Clin Psychol* 64:366, https://pubmed.ncbi.nlm.nih.gov/8871421/ . Com relatos em tempo real (palmtops), os primeiros lapsos foram atribuídos a humor negativo e **pistas de fumo**, e ocorreram mais com cigarros disponíveis e outros fumantes por perto.
  - [S] Estudos de laboratório (Marshall/Epstein, anos 1980, "Coffee drinking and cigarette smoking I"): fumantes que recebem café fumam mais, **com cafeína ou descafeinado**. O café "marca a ocasião", independentemente da cafeína. https://researchconnect.buffalo.edu/en/publications/coffee-drinking-and-cigarette-smoking-i-coffee-caffeine-and-cigar/
  - [S] Um RCT (tese de Swanson, Loma Linda, 162 fumantes): **cortar a cafeína** ao parar de fumar aumentou a fissura inicial, mas **não mudou** o sucesso em 16 dias, 6 meses e 12 meses. https://scholarsrepository.llu.edu/etd/920
- **Veredito:** o pareamento é real. "Largar o café junto" é uma tática clínica razoável, mas sem evidência de benefício. Talvez seja melhor **mudar o ritual** (chá, outro lugar) do que eliminar a cafeína [inferência nossa].
- **Potencial de widget:** ★★ "Treinador de pistas": uma linha do tempo do dia em que cada ☕ é seguido por 🚬. Depois de N pareamentos, o ☕ sozinho acende a fissura. Um botão "trocar o ritual" quebra o pareamento mais rápido que "aguentar firme" (extinção).

### J2. Substituição ("trocar um vício por outro")

- **Achado [V]:** Blanco et al. 2014, *JAMA Psychiatry* 71:1246, https://pubmed.ncbi.nlm.nih.gov/25208305/ . NESARC, 34.653 adultos, ondas com 3 anos de intervalo.
  - Quem **remitiu** de um transtorno por uso de substância teve **menos** novos transtornos: **13,1% × 27,2%** nos que não remitiram.
  - Ajustando pelo nº de transtornos na linha de base, a remissão de drogas reduziu o risco (OR 0,66). Cada transtorno basal a mais aumentou o risco (OR 1,68).
  - "Contrário ao folclore clínico, a remissão não leva tipicamente à substituição."
- **Relação com o clipe:** isso **apoia** a observação clínica da Lembke ("se não substituírem nem escalarem, vemos melhora"). Mas também mostra que o risco de substituição que ela adverte é **menor** do que se imagina. Ressalva: a pesquisa é sobre substâncias, não sobre comportamentos (pornografia, telas).
- **Potencial de widget:** ★★ Duas barras grandes (27,2% × 13,1%) com o título "trocar um vício por outro é a exceção".

### J3. "Redes sociais, jogo e sexo ativam a mesma via"

- **Jogo patológico [V]:** Clark, Boileau & Zack 2019, *Mol Psychiatry* 24:674, https://pubmed.ncbi.nlm.nih.gov/30214041/ .
  - Reclassificado como **vício comportamental no DSM-5** (2013).
  - O PET mostra **liberação de dopamina amplificada** e **diferenças mínimas de D2 basal**, "um perfil distinto dos transtornos por substâncias".
  - Os dados de fMRI são consistentes em desregulação do estriado ventral, mas **a direção é mista**.
  - A explicação proposta é que a incerteza máxima do jogo ativa a dopamina "perpetuamente", ao passo que as drogas têm efeitos "suprafisiológicos".
  - Logo: **mesma via, sim; mesmo mecanismo, não exatamente.**
- **Videogame:**
  - Transtorno de jogo (gaming disorder) entrou na **CID-11** (OMS, aprovada em 2019, em vigor em 2022) [S]. No DSM-5 fica só na Seção III, como "condição para estudo adicional" [S].
  - [V] Aarseth et al. 2017, *J Behav Addict* 6:267, https://pubmed.ncbi.nlm.nih.gov/28033714/ : 26 pesquisadores contestam a inclusão por "baixa qualidade da base de pesquisa", critérios emprestados de substâncias e risco de pânico moral e falsos positivos.
- **Redes sociais:**
  - **Não há diagnóstico** de "vício em redes sociais" no DSM-5-TR nem na CID-11 [S].
  - [V] Sherman et al. 2016, *Psychol Sci* 27:1027, https://pubmed.ncbi.nlm.nih.gov/27247125/ : adolescentes vendo fotos com muitas curtidas ativam regiões de recompensa (fMRI). É **ativação BOLD, não dopamina medida**.
  - [V, registro] Lindström et al. 2021, *Nat Commun* 12:1311: o padrão de postagens em >1 milhão de posts segue um modelo de aprendizado por recompensa (a correção está no PMID 33727545).
  - [V] Orben & Przybylski 2019, *Nat Hum Behav* 3:173, https://pubmed.ncbi.nlm.nih.gov/30944443/ : a associação entre uso de tecnologia digital e bem-estar adolescente explica **no máximo 0,4%** da variância (n = 355.358). O debate com Haidt e Twenge continua.
  - **Nenhum estudo mediu liberação de dopamina por rolar o feed em humanos** [NV: não achei]. Afirmações do tipo "o like libera X% de dopamina" não têm fonte (a Wikipedia sobre "dopamine fasting" marca como **sem citação** a frase "tecnologia produz aumento de 50–100% de dopamina").
- **Sexo e pornografia [S]:** o "transtorno do comportamento sexual compulsivo" entrou na CID-11 como **transtorno de controle de impulsos**, não como vício. A classificação como vício segue em debate.
- **Veredito:** "ativam a mesma via de recompensa" é **verdade trivial**: toda recompensa passa por ela, inclusive abraço e música. O passo seguinte, "logo são vícios equivalentes a drogas", é **forte para o jogo de azar, plausível mas contestado para videogame e fraco para redes sociais**.
- **Potencial de widget:** ★★ "Termômetro de evidência": uma régua com cada comportamento posicionado por nível de evidência (diagnóstico oficial? dopamina medida em humanos? estudos longitudinais? consenso?).

---

## K. Críticas

### K1. O "dopamine fast" / "dopamine detox"

- **Origem [S]:** o psicólogo Cameron Sepah (UCSF/Califórnia) propôs em 2019 um protocolo de **terapia cognitivo-comportamental**, controle de estímulos para comportamentos impulsivos. Ele mesmo diz que o nome **não é literal**: "o objetivo não é reduzir dopamina", e "o título não deve ser tomado literalmente" (NYT). Ele publicou o "Dopamine Fasting 2.0" no LinkedIn para corrigir a "má interpretação da mídia". Fontes: https://en.wikipedia.org/wiki/Dopamine_fasting ; https://www.livescience.com/is-there-science-behind-dopamine-fasting-trend.html
- **Críticas [S]:**
  - Peter Grinspoon (Harvard Health, 26 fev 2020): a dopamina "não diminui quando você evita atividades superestimulantes". Os praticantes extremos estão "se privando de coisas saudáveis sem razão". https://www.harvardhealth.org/blog/dopamine-fasting-misunderstanding-science-spawns-a-maladaptive-fad-2020022618917
  - Ciara McCabe (Univ. Reading): "resetar" o cérebro evitando gatilhos é "nonsense". Tirar o estímulo reduz a **estimulação**, não os **níveis** de dopamina.
  - Trevor Robbins (Cambridge): "rótulo da moda". Outras regiões (pré-frontais) importam mais para controlar a tentação (MDedge 2024).
  - David Tzall: sem evidência de segurança e eficácia, e "one-size-fits-all".
- **Distinção importante para o ensaio:** a proposta da Lembke é um **teste de abstinência de 30 dias da droga de escolha**, direcionado a uma substância ou comportamento problemático e sob supervisão clínica. É diferente do "jejum de dopamina" genérico do TikTok (ficar sem música, comida gostosa e conversa). Ela própria exclui quem tem abstinência perigosa (álcool, benzodiazepínicos) e quem já falhou várias vezes sozinho [S, MDedge]. O clipe também diz isso (nível de cuidado maior).

### K2. Críticas à linguagem pop da dopamina e ao *Dopamine Nation*

- O núcleo científico da crítica é a seção C: dopamina ≠ prazer. A gangorra "prazer-dor" reduz a um eixo o que são pelo menos dois sistemas (querer/dopamina e gostar/opioides), além do aprendizado por erro de predição.
- Os números de rato são apresentados como escala de "potencial viciante", mas dependem de dose e via e misturam unidades (A1).
- Críticas genéricas ao livro (individualização de um problema estrutural, risco de patologizar prazeres comuns) aparecem em resenhas [S, fontes fracas: https://neurolaunch.com/dopamine-nation-criticism/]. **Não achei uma resenha acadêmica formal** contra o livro [NV].
- Contraponto justo: Lembke é psiquiatra clínica, chefe da clínica de dependência de Stanford, e a metáfora tem raiz teórica séria (Solomon, Koob). O problema está nos números e na literalidade, não na ideia geral.

### K3. Críticas ao Huberman

- [S] Kerry Howley, *New York Magazine* (25 mar 2024): Huberman "posits certainty where there is ambiguity" (apresenta como certo o que é ambíguo).
- [S] Andrea Love, *Slate* (mar 2024): pseudociência com verniz científico (ex.: "leaky gut").
- [S] Jonathan Jarry, McGill Office for Science and Society (abr 2023): promoção de suplementos de base fraca (AG1 etc.).
- [S] *Time* (jun 2023): extrapolação de estudos animais para humanos. *El País* (nov 2025): "neurociência pop".
- Fonte agregada: https://en.wikipedia.org/wiki/Andrew_Huberman
- **No próprio clipe**, Huberman faz a pergunta certa ("os dados são de roedores, dá para assumir o mesmo em humanos?") e admite que a segunda pergunta "não existe na literatura mecanística". Isso é um ponto a favor do trecho.

- **Potencial de widget:** ★ Um box "o que este ensaio NÃO está dizendo", com mitos comuns (dopamina = prazer; dá para "zerar" a dopamina; 1 like = X% de dopamina) e a correção de cada um.

---

## L. Dados prontos para gráficos (resumo)

| Conjunto | Valores | Fonte | Confiab. |
|---|---|---|---|
| Curvas de microdiálise (anfetamina, cocaína, nicotina, morfina × 4 doses) | tabela em A2 | Di Chiara & Imperato 1988 via slide NIDA | V (forma) / ±10% |
| Comida e sexo | tabela em A2; sexo +44% / +95% / +34% | Di Chiara 1999 (slide); Fiorino 1997 | V |
| Tempo até o pico do barato da cocaína | fumada 1,4; IV 3,1; nasal 14,6 min | Volkow 2000 | V |
| Ocupação do DAT pelo metilfenidato oral | 12/40/54/72/74% para 5/10/20/40/60 mg | Volkow 1998 | V |
| Depuração estriatal | metilfenidato 90 min; cocaína 20 min | Volkow 1995 | V |
| D2 na meth | −16% caudado, −10% putâmen | Volkow 2001 | V |
| DAT na meth e recuperação | −27,8/−21,1% → +19/+16% após 12–17 meses (n = 5) | Volkow 2001 (×2) | V |
| D2 em macacos | −15–20% em 1 semana; ~−20% por 1 ano | Nader 2006 | V |
| Liberação de dopamina em alcoólicos | −70% estriado ventral; −50% putâmen | Volkow 2007 | V |
| Depressão em alcoólicos | 42% → 6% (sem. 0 → 4), maior queda na sem. 2 | Brown & Schuckit 1988 | V |
| Abstinência de cannabis | início d1–3, pico d2–6, duração 4–14 d | Budney 2003 | V |
| Abstinência de tabaco | pico na 1ª semana, 2–4 semanas | Hughes 2007 | V |
| Mortalidade metadona / buprenorfina | 36,1 → 11,3 e 9,5 → 4,3 por 1.000 pessoa-anos | Sordo 2017 | V |
| Risco nas 4 semanas pós-tratamento | RR 6,01 | Santo 2021 | V |
| Substituição | 27,2% × 13,1% de novo transtorno | Blanco 2014 | V |
| Fumo e recaída | OR 2,02 / 4,86 | Weinberger 2017 | V |
| Cessação concomitante (RCT) | álcool 41% × 56% (6 meses) | Joseph 2004 | V |
| Cochrane, cessação × sobriedade | RR 0,97 | Apollonio 2016 | S |
| D2 por década de idade | −7,9% | Volkow 1996 | V |
| Hotspot hedônico | ~1 mm³ | Peciña & Berridge 2005 | V |
| Correlação dopamina–barato / dopamina–querer | r = 0,78 / r = 0,83 | Volkow 1999 / Leyton 2002 | V |

---

## M. Pendências antes de publicar

1. Ler o PDF de Di Chiara & Imperato 1988 (PMC281732) para pegar **doses** e confirmar os picos digitalizados. O PDF da PMC tem proteção anti-robô; abrir no navegador.
2. Conferir no *Dopamine Nation* (notas do cap. 1) **quais papers** a Lembke cita para chocolate (55%) e nicotina (150%).
3. Confirmar se existe um "+55% com chocolate" no grupo de Di Chiara (talvez Bassareo & Di Chiara 1997, *J Neurosci* 17:851).
4. Obter os números de escalada de Ahmed & Koob 1998 (*Science* 282:298) para o gráfico ShA × LgA.
5. Obter o texto original de Solomon & Corbit 1974 para reproduzir fielmente a figura do "standard pattern of affective dynamics".
6. Achar a fonte do "80%" num texto da Lembke com denominador (se existir).
