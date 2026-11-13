# Temas quentes para o próximo ensaio (novembro de 2026)

Pesquisa feita em 12/11/2026. O critério: assunto em alta nas últimas 4 a 8 semanas, com uma promessa popular para servir de provocação, um corpo real de pesquisa, séries de dados para desenhar e um mecanismo que fique melhor explicado com interação. Temas já cobertos no site (microbioma, longevidade, Big Five, querer menos, sorte vs habilidade, algoritmo do X, personalidade de LLMs, viagens, dopamina) foram evitados ou estão sinalizados quando há sobreposição.

Convenções:
- **[NV]** = não consegui verificar em fonte primária ou com número exato.
- Google Trends não deixa extrair séries por fetch automático; os números de busca citados vêm de terceiros e estão marcados. Antes de escolher, vale abrir o Trends à mão (comparações sugeridas em cada tema).
- Nota de adequação de 1 a 5 para o site.

---

## Ranking resumido

| # | Título de trabalho | Nota |
|---|---|---|
| 1 | Por que as pesquisas erraram a eleição de 2026? | 5 |
| 2 | Fim da escala 6x1: trabalhar menos deixa o Brasil mais pobre ou mais produtivo? | 5 |
| 3 | Como baixar o cortisol (e se você deveria) | 5 |
| 4 | Super El Niño: o que ele vai fazer com o Brasil até março | 4 |
| 5 | Quanta proteína você precisa de verdade? | 4 |
| 6 | Ultraprocessados: a ideia brasileira que virou guerra mundial | 4 |
| 7 | Canetas emagrecedoras: genérico, retatrutida e o que vem depois do Ozempic | 4 |
| 8 | Novembro Azul: todo homem deve fazer o PSA? | 4 |
| 9 | Bets: como a casa sempre ganha (e quem perde) | 4 |
| 10 | A IA está numa bolha? Data centers, conta de luz e a eleição americana | 4 |
| 11 | "Psicose de IA": o chatbot pode enlouquecer alguém? | 4 |
| 12 | Celular proibido na escola: um ano depois, funcionou? | 4 |
| 13 | Ouro e bitcoin caíram juntos: o mito da reserva de valor | 3 |
| 14 | Peptídeos (BPC-157): a nova febre da biohackeragem | 3 |
| 15 | Por que a geração Z está bebendo menos | 3 |
| 16 | Corrida de rua: 15 milhões de brasileiros correndo para onde? | 3 |

Menções honrosas no fim (testosterona, vacina de herpes zóster e demência, sachês de nicotina, sleepmaxxing).

---

## 1. Por que as pesquisas erraram a eleição de 2026?

**Gancho:** Datafolha e Quaest davam Flávio 51 a 49 na véspera; Lula ganhou por 51,8 a 48,2. Como amostras de 2 mil pessoas preveem 150 milhões de eleitores, e onde exatamente a conta quebrou?

**Por que está quente agora**
- Segundo turno em 25/10/2026: Lula 51,79% dos válidos, Flávio Bolsonaro 48,21% (TSE, via O POVO+). Reportagem especial do O POVO de 02/11/2026: sete institutos nacionais mostravam Flávio numericamente à frente; a Futura (50,1 a 49,9 para Flávio) foi a única dentro da própria margem. https://mais.opovo.com.br/reportagens-especiais/resultado-presidente-eleicoes-2026/2026/11/02/como-pesquisas-erraram-e-um-algoritmo-acertou-a-vitoria-de-lula-sobre-flavio-bolsonaro.html
- Relatos de que foi a primeira vez que o Datafolha errou o vencedor de um segundo turno presidencial (Portal Leo Dias) e de que 17 de 21 levantamentos erraram além da margem (Rede98, TV Sim Brasil, 29/10/2026). https://rede98.com.br/eleicoes2026/todas-as-21-pesquisas-eleitorais-erraram-o-resultado-das-eleicoes-no-segundo-turno/ e https://tvsimbrasil.com.br/brasil/eleicoes-2026/noticia/2026/10/29/pesquisas-erraram-eleicao-davam-flavio-frente-2-turno [contagem 17/21 NV em fonte primária]
- Debate público ativo: CEO da AtlasIntel culpou modelos de "eleitor provável" de Quaest e Datafolha; abstenção caiu de 21,08% para 19,21% entre turnos; um modelo em tempo real com urnas (Rodrigo Mahlmeister) cravou 51,6 a 48,4 com 2,42% apurado.

**A profundidade**
- Estatística de amostragem: erro amostral cai com raiz de n; a margem de 2 pontos só cobre o erro aleatório, não o viés (não resposta, cota mal calibrada, ponderação, eleitor provável).
- Literatura: "total survey error"; Shirani-Mehr, Rothschild, Goel e Gelman (2018, JASA) mostram que o erro real das pesquisas é cerca de 2 vezes a margem declarada. AAPOR sobre 2016 e 2020 nos EUA (viés de não resposta correlacionado com voto). Brasil: erros de 2018 e 2022 no 1º turno (subestimação de Bolsonaro), agora na direção oposta.
- Mito vs evidência: "as pesquisas são compradas" vs a mecânica real de viés sistemático e erro correlacionado entre institutos (todos usam as mesmas bases do IBGE/TSE para cotas). Outra tensão: pesquisa é retrato, não previsão; mas a correlação dos erros entre institutos fala contra "foi mudança de última hora".

**Widgets e gráficos**
1. Simulador de amostra: o leitor sorteia 2.000 eleitores de um Brasil sintético e vê a distribuição dos resultados; depois liga um viés de não resposta de 2% em um grupo e vê a nuvem inteira se deslocar para fora da margem.
2. Controle deslizante de "eleitor provável": ajustar a probabilidade de comparecimento de jovens/pobres e ver a pesquisa virar de Flávio para Lula.
3. Gráfico de erro histórico: erro médio de véspera dos institutos em 2002 a 2026, 1º e 2º turnos, com a margem declarada como faixa.
4. Mapa de swing por seção eleitoral (dados abertos do TSE) explicando como o modelo de apuração acertou com 2% das urnas.
5. Infográfico "anatomia de uma pesquisa": cotas, ponderação, campo, intervalo.

**Dados e dificuldade:** Excelente. TSE tem resultados por seção (dadosabertos.tse.jus.br); pesquisas registradas no PesqEle do TSE com metodologia; agregadores. Dificuldade média (limpeza do PesqEle dá trabalho).

**Nota: 5.** Tema brasileiro, recente, com mecânica estatística perfeita para interação e um mito claro para testar.

---

## 2. Fim da escala 6x1: trabalhar menos deixa o Brasil mais pobre ou mais produtivo?

**Gancho:** Em 16 de dezembro, 44 horas viram 42 e todo mundo ganha duas folgas. Os empresários dizem que é o fim da economia; os sindicatos, que a produtividade sobe. Os dados de França, Islândia, Reino Unido e do próprio Brasil dizem outra coisa.

**Por que está quente agora**
- Congresso concluiu a PEC em 14/10/2026; Emenda Constitucional 141/2026 promulgada e publicada no DOU em 16/10/2026, com Lula, Motta e Alcolumbre. Correio 24 Horas: teto cai de 44 para 42 horas e duas folgas semanais até 16/12/2026. https://www.correio24horas.com.br/brasil/emenda-do-fim-da-6x1-e-publicada-no-diario-oficial-prazos-comecam-a-valer-1026 ; O Liberal 16/10/2026: https://www.oliberal.com/economia/congresso-nacional-promulga-fim-da-escala-de-trabalho-6x1-1.1183203
- 40 horas em cerca de 12 a 14 meses (fontes divergem sobre o prazo exato; conferir texto da EC). ADI 8041 no STF e decreto de regulamentação citados por um site jurídico [NV]. https://valorfinal.com.br/guia/escala-6x1
- Dieese/MTE: 14,8 milhões de trabalhadores (33,2% dos ocupados) na 6x1; 26,8 milhões beneficiados pela redução da jornada. https://www.cut.org.br/noticias/escala-6x1-atinge-14-8-milhoes-de-pessoas-e-pesa-nos-setores-de-servicos-e-comer-cbd9

**A profundidade**
- Curva horas vs produção: Pencavel (2014, Economic Journal) com operários britânicos da Primeira Guerra; produção por hora cai acima de ~50 horas. Collewet e Sauermann (2017) em call center.
- Experimentos naturais: França 35 horas (Crépon e Kramarz 2002; Chemin e Wasmer 2009: sem ganho de emprego); Portugal 1996; Chile 45 para 40 horas (lei de 2023, em transição); Coreia do Sul 68 para 52 horas (2018); Islândia (2015 a 2019); pilotos de semana de 4 dias (Reino Unido 2022, 61 empresas, Autonomy/4 Day Week Global; piloto brasileiro de 2024 com a Reconnect). Ressalva: pilotos são autosselecionados.
- Brasil 1988 (48 para 44 horas): Gonzaga, Menezes-Filho e Camargo (2003) estimaram efeitos sobre emprego e salário-hora. É o melhor contrafactual doméstico.
- Mito vs evidência: "menos horas, mesma produção" vale para trabalho cognitivo com folga, muito menos para varejo e serviços com cobertura de turno (é justamente onde está a 6x1). E o oposto, "vai quebrar as empresas", não aparece em 1988 nem na França.

**Widgets e gráficos**
1. Curva de Pencavel interativa: arraste as horas semanais e veja produção total e por hora, com faixas para tipos de trabalho (fábrica, escritório, caixa de supermercado).
2. Calculadora de escala: monte a escala de uma loja que abre 7 dias com 42 horas por pessoa; quantos funcionários a mais são necessários? (mostra por que o impacto é setorial).
3. Gráfico de horas anuais por país (OCDE) vs PIB por hora, com o Brasil destacado.
4. Linha do tempo de reduções de jornada no mundo com o resultado medido de cada uma.
5. Mapa do Brasil por setor e UF da proporção de vínculos 6x1 (RAIS).

**Dados e dificuldade:** Muito bons. OCDE (horas e produtividade), PNAD Contínua (horas habituais), RAIS, papers com números. Dificuldade média.

**Nota: 5.** Muda a vida de dezenas de milhões em um mês, tem economia do trabalho sólida e uma curva perfeita para interação.

---

## 3. Como baixar o cortisol (e se você deveria)

**Gancho:** Depois da dopamina, o hormônio da moda é o cortisol: "cortisol face", "cortisol cocktail", medidores de cortisol em casa. O sequel natural do ensaio da dopamina, com a mesma pergunta: o que esse hormônio faz de verdade?

**Por que está quente agora**
- Lista de tendências de saúde de novembro de 2026 da Trendhunter abre com "at-home cortisol trackers". https://www.trendhunter.com/slideshow/november-2026-health
- Hormometer (Eli Health), teste de cortisol pela saliva com o celular, lançado e resenhado na CES 2026; Lume Health mostrou sensor de suor no TechCrunch Disrupt 2026 (lançamento previsto para 2027); Adaptyx mostrou primeira medição contínua de cortisol em humanos no ADA 2026. https://www.tomsguide.com/wellness/fitness-trackers/i-just-tried-the-hormometer-at-ces-2026-to-measure-my-cortisol-levels-and-testosterone-is-coming-next ; https://insider.fitt.co/press-release/lume-health-unveils-first-wearable-to-continuously-measure-hormones-through-sweat-at-techcrunch-disrupt-2026/
- "Cortisol face" levou pacientes a pedir exames (2 Minute Medicine, junho de 2026). https://www.2minutemedicine.com/tiktoks-cortisol-face-trend-meets-endocrine-reality/
- Busca: relatos de que "cortisol" quase dobrou nas buscas no início de 2026 e ficou em recorde por três meses (Scope Weekly, 01/04/2026, sem fonte de dados) [NV]. "cortisol alto" no Brasil ~2,9 mil buscas/mês (Treendly) [NV]. A afirmação de que cortisol ultrapassou dopamina no Trends não encontrei documentada [NV]; comparar à mão "cortisol" vs "dopamina" no Trends BR, 5 anos.
- Ressalva honesta: o pico viral foi 2025 e início de 2026; em novembro o tema está sustentado (produtos, wearables), não explodindo.

**A profundidade**
- Eixo HPA, ritmo circadiano (pico ao acordar, resposta ao despertar, CAR), por que uma medida isolada quase não diz nada.
- Cushing real (exógeno, como o caso Amy Schumer) vs estresse cotidiano, que não gera a redistribuição de gordura do "cortisol face".
- "Fadiga adrenal" não é diagnóstico reconhecido (Endocrine Society; revisão de Cadegiani e Kater 2016, autores brasileiros!).
- Suplementos: ashwagandha (ensaios pequenos, sinal de queda de cortisol, alertas de hepatotoxicidade; Dinamarca proibiu), magnésio, "cortisol cocktail" (suco de laranja, água de coco, sal).
- Estresse crônico e saúde: Whitehall II, alostase (McEwen), o cortisol como hormônio de mobilização de energia e não "vilão".

**Widgets e gráficos**
1. Relógio do cortisol: curva de 24 horas que o leitor deforma com eventos (acordar, café, treino, prova, noite mal dormida, viagem de fuso).
2. "O que um teste de saliva te diz": sorteio de medidas ao longo do dia de uma pessoa saudável, mostrando a variabilidade entre dias e por que um número único engana.
3. Simulador de feedback negativo do eixo HPA (hipotálamo, hipófise, adrenal) com um controle de "estresse crônico".
4. Tabela de evidências dos "hacks" (suplementos, banho frio, respiração) com tamanho de efeito e qualidade.
5. Gráfico de buscas "cortisol" vs "dopamina" no Trends (BR e mundo).

**Dados e dificuldade:** Bons. Muitos estudos com curvas de cortisol publicadas; dados de Trends exportáveis à mão. Dificuldade média (precisa reconstruir curvas a partir de papers).

**Nota: 5.** Continuação natural do último ensaio, com a mesma estrutura de mito vs mecanismo; a calidez do "agora" é menor que a dos dois primeiros.

---

## 4. Super El Niño: o que ele vai fazer com o Brasil até março

**Gancho:** O Pacífico está 2,5 °C acima do normal, perto do maior El Niño já medido. Seca no Norte e Nordeste, enchente no Sul, calor em todo lugar. Como uma faixa de água quente do outro lado do planeta decide a chuva de Porto Alegre?

**Por que está quente agora**
- NOAA, discussão ENSO de 12/11/2026: mais de 79% de chance de El Niño forte a muito forte até jan a mar de 2027 e ~60% de chance de um evento histórico, maior que todos desde 1950. Niño 3.4 diário ~2,5 °C; RONI de ago a out 1,97 °C (1997: 2,07 °C; recorde 2,4 °C em 1982/83). https://weather.com/2026/11/12/forecast/national/super-el-nino-nearing-a-record-us-weather-pattern ; https://unofficialnetworks.com/2026/11/12/new-noaa-el-nino-forecast/
- Brasil: anomalia semanal recorde de 3,7 °C em Niño 3.4 no fim de outubro (NC News, 04/11/2026) [NV em fonte primária]; previsão oficial de nov a jan 1 a 2 °C acima do normal; 68 municípios em seca extrema; tempestades e tornados no Sul no início de novembro; ciclone em alta no Trends BR em 12/11. https://ncnews.com.br/2026/11/04/el-nino-bate-recorde-historico-de-aquecimento-e-acende-alerta-para-chuvas-e-calor-no-brasil/ ; https://www.mixvale.com.br/2026/11/10/el-nino-no-brasil-2026-2027-veja-o-impacto-nas-regioes-brasileiras/
- Nature Health de outubro de 2026: 50.391 mortes por calor em 854 cidades europeias no verão de 2026, cerca de dois terços atribuíveis à mudança do clima. https://www.nature.com/naturehealth/volumes/1/issues/10

**A profundidade**
- Mecanismo: ventos alísios, termoclina, feedback de Bjerknes, ondas de Kelvin; teleconexões via célula de Walker e jatos.
- Brasil: correlações clássicas (seca no Norte e Nordeste, chuva no Sul), 2015/16 (seca na Amazônia, incêndios), 2023/24 (Rio Grande do Sul, seca do Amazonas). Super El Niño + aquecimento de fundo = 2027 candidato a ano mais quente [NV].
- Mito vs evidência: "o El Niño causa tudo" (as enchentes do RS de 2024 tiveram múltiplos fatores) e "El Niño é o aquecimento global" (são coisas diferentes que se somam). Também: a previsibilidade, por que a NOAA erra a força com meses de antecedência (barreira de primavera).

**Widgets e gráficos**
1. Pacífico interativo: o leitor controla a força dos alísios e vê a piscina quente e a termoclina se moverem (simulação simples de duas camadas).
2. Série ONI 1950 a 2026 com os super eventos destacados e a trajetória atual sobreposta (scrollytelling).
3. Mapa do Brasil com anomalias de chuva e temperatura nos 5 maiores El Niños, alternável por evento.
4. "O que muda na sua cidade": escolha o município e veja a anomalia típica em El Niño forte (dados Inmet/CPC).
5. Gráfico de temperatura global com e sem a componente ENSO removida.

**Dados e dificuldade:** Excelentes e abertos (NOAA ONI/RONI, ERA5, Inmet, CHIRPS). Dificuldade média a alta pela simulação.

**Nota: 4.** Ótimo mecanismo e dados abertos; é menos uma "promessa viral" e mais um fenômeno, então a tensão mito vs evidência é mais fraca.

---

## 5. Quanta proteína você precisa de verdade?

**Gancho:** Proteína no café, no salgadinho, no sorvete. O whey triplicou de preço e as diretrizes americanas dobraram a meta. Mas o brasileiro médio já come proteína de sobra?

**Por que está quente agora**
- Whey concentrado passou de US$ 13 a libra, quase o triplo do ano anterior, com estoque vendido (Business Model Analyst) [NV em fonte primária]. https://businessmodelanalyst.com/whey-protein-shortage-prices/
- Diretrizes alimentares americanas de 2026 subiram a recomendação de 0,8 para 1,2 a 1,6 g/kg (eMarketer) [conferir texto oficial]. https://www.emarketer.com/content/protein-top-of-mind-shoppers-brands-2026
- Chick-fil-A lançou sanduíche "proteico" em 12/11/2026 (Fox News); Dunkin, Starbucks, Subway com linhas proteicas. Lista da New Engen de tendências fitness de 2026 inclui creatina e proteína como suplementos cotidianos. https://newengen.com/insights/social-media-fitness-trends/
- GLP-1 amplifica: quem usa caneta é orientado a comer mais proteína para preservar massa magra.

**A profundidade**
- Metanálise de Morton et al. (2018, BJSM): ganho de massa magra com proteína satura perto de 1,6 g/kg/dia (IC até ~2,2). Estudos de síntese proteica por refeição (o "teto de 30 g" foi derrubado por Trommelen et al. 2023, Cell Reports Medicine).
- Idosos e sarcopenia (PROT-AGE), a hipótese da alavanca da proteína (Simpson e Raubenheimer), IGF-1 e o debate longevidade [sobreposição leve com o ensaio de longevidade].
- Brasil: POF/IBGE mostra consumo médio que já passa da RDA [verificar números].
- Mito vs evidência: "mais é sempre melhor", "rim", "só 30 g por refeição", "precisa de suplemento".

**Widgets e gráficos**
1. Calculadora de necessidade com curva de retorno decrescente (Morton) e onde o leitor está hoje com base no que comeu ontem.
2. Gráfico "custo por 30 g de proteína": ovo, frango, feijão, whey, barra proteica, "salgadinho proteico".
3. Prato interativo: monte refeições brasileiras típicas e veja quanto já dá.
4. Linha do tempo das recomendações oficiais (RDA desde 1943, OMS, DGA 2026).
5. Gráfico de consumo per capita de proteína por país vs recomendação.

**Dados e dificuldade:** Bons (FAOSTAT, POF, TACO, metanálises com números). Dificuldade baixa a média.

**Nota: 4.** Mito claro, grande interesse, muito "útil"; o mecanismo é menos espetacular que o de outros temas.

---

## 6. Ultraprocessados: a ideia brasileira que virou guerra mundial

**Gancho:** A classificação NOVA nasceu na USP e hoje divide a nutrição do mundo. Um ensaio clínico novo mostra que o cérebro reage diferente a refeições com as mesmas calorias. E 91% dos artigos contra a NOVA têm autor ligado à indústria.

**Por que está quente agora**
- Nature Metabolism, 05/10/2026: ensaio randomizado cruzado com 57 adultos; refeições ultraprocessadas nutricionalmente pareadas geraram maior resposta de insulina e energia e atividade estriatal alterada. https://www.nature.com/articles/s42255-026-01619-4
- JAMA Psychiatry, 30/09/2026: quem cortou mais de 85% dos ultraprocessados teve melhora moderada a grande de depressão (ScienceDaily). https://www.sciencedaily.com/releases/2026/09/260930225448.htm
- USC, 03/11/2026: crianças que comem mais ultraprocessados têm mais ativação do estriado dorsal a fotos de comida e maior IMC. https://www.sciencedaily.com/releases/2026/11/261101010549.htm
- American Journal of Public Health (via EWG, 12/11/2026): de 69 artigos críticos à NOVA, 91% têm autor com vínculo à indústria. https://www.ewg.org/news-insights/news/2026/11/big-food-influencing-debate-over-ultra-processed-food
- Suécia (Gotemburgo, 02/11/2026): resultados mudam conforme a definição NOVA ampla ou estreita. https://medicalxpress.com/news/2026-11-swedish-dietary-surveys-link-higher.html

**A profundidade**
- Hall et al. (2019, Cell Metabolism): +500 kcal/dia na dieta ultraprocessada; o novo ensaio repete com imagem cerebral. Densidade energética, velocidade de ingestão, "hiperpalatabilidade" (Fazzino 2019).
- Coortes: NutriNet-Santé, ELSA-Brasil; série da Lancet de nov 2025.
- Mito vs evidência em duas direções: "ultraprocessado é veneno" vs "NOVA é vaga e não explica nada"; o pão integral industrializado e o iogurte caem no mesmo saco do refrigerante.

**Widgets e gráficos**
1. "Classifique você mesmo": o leitor classifica 20 alimentos reais na NOVA e compara com especialistas (mostra a discordância, que é dado publicado).
2. Experimento de Hall reencenado: duas semanas, duas dietas, gráfico de ingestão diária e peso.
3. Mapa mundial de participação de ultraprocessados nas calorias (Brasil vs EUA vs Itália).
4. Rede de autores e financiamento dos artigos pró e contra NOVA.
5. Diagrama do caminho alimento, velocidade, saciedade, estriado.

**Dados e dificuldade:** Bons (POF com NOVA, NHANES, dados suplementares de Hall). Dificuldade média.

**Nota: 4.** Gancho brasileiro forte e pesquisa fresca; risco de sobreposição leve com o ensaio do microbioma.

---

## 7. Canetas emagrecedoras: genérico, retatrutida e o que vem depois do Ozempic

**Gancho:** A patente caiu, a semaglutida sintética chegou às farmácias e o próximo remédio tira 25% do peso e ainda alivia o joelho. Quanto peso cada molécula tira, o que acontece quando você para e quem vai pagar?

**Por que está quente agora**
- Retatrutida (Lilly): dois ensaios de fase 3 no NEJM com mais de 1.000 adultos com artrose de joelho; até 25% de perda de peso na dose alta; cerca de dois terços com redução de 50% ou mais na dor. Plenária no ACR Convergence em 08/11/2026; Washington Post 11/11/2026. https://newatlas.com/disease/obesity/knee-osteoarthritis-pain-relief-weight-loss ; https://www.washingtonpost.com/wellness/2026/11/11/powerful-new-weight-loss-drug-may-also-ease-knee-pain-major-study-finds/
- FDA decidiu em 02/10/2026 que a retatrutida segue como NDA; pedido de registro previsto para o 1º tri de 2027 [NV em fonte primária].
- Orforglipron (pílula) aprovado na China em 12/11/2026; já aprovado nos EUA (abril de 2026, Foundayo). https://thenews.com.pk/latest/1423340-china-green-lights-eli-lilly-oral-obesity-treatment-with-orforglipron
- Brasil: patente da semaglutida caiu em março de 2026; Ozivy (EMS) nas farmácias desde junho a partir de ~R$ 452; primeiro genérico registrado pela Anvisa em 17/08/2026, aguardando preço da CMED (35% abaixo da referência). https://www.voysaude.com.br/blog/ozempic-generico-preco-brasil-2026 ; https://alertagov.com.br/2026/08/anvisa-aprova-1o-generico-de-semaglutida-do-pais-caneta-emagrecedora-deve-custar-35-menos/

**A profundidade**
- Mecanismo: incretinas, GLP-1, GIP, glucagon (agonismo triplo), saciedade central e esvaziamento gástrico.
- Curvas de STEP-1 (semaglutida ~15%), SURMOUNT-1 (tirzepatida ~21%), retatrutida fase 2 (~24% em 48 semanas), orforglipron (ATTAIN). STEP-1 extension: reganho de ~2/3 ao parar. Perda de massa magra. SELECT (eventos cardiovasculares).
- Mito vs evidência: "é só para estética", "faz perder músculo", "efeito rebote prova que não funciona", "manipulado é igual".

**Widgets e gráficos**
1. Corrida de curvas: perda de peso ao longo de 72 semanas por molécula, com placebo, que o leitor pode "parar" em qualquer semana para ver o reganho.
2. Simulador de receptores: o leitor liga GLP-1, GIP e glucagon e vê o efeito somado em fome, gasto e glicemia (modelo didático).
3. Calculadora de custo no Brasil: Ozempic, Ozivy, genérico, Mounjaro, por mês e por kg perdido.
4. Mapa de prevalência de obesidade no Brasil (Vigitel) vs acesso.

**Dados e dificuldade:** Muito bons (ensaios com curvas publicadas, Vigitel, CMED). Dificuldade média.

**Nota: 4.** Enorme interesse e dados ricos; o tema já foi muito coberto pela imprensa, então o diferencial precisa vir da interação.

---

## 8. Novembro Azul: todo homem deve fazer o PSA?

**Gancho:** Prefeituras distribuem senhas de PSA, mas o Ministério da Saúde e o INCA não recomendam rastreamento em homens sem sintomas. Quem está certo? Um ensaio sobre o paradoxo do sobrediagnóstico.

**Por que está quente agora**
- Novembro Azul em curso: São Caetano oferece PSA por livre demanda nas UBSs a partir de 16/11 (DGABC, 12/11/2026); hospital de Campo Grande distribui 100 senhas diárias até 27/11. https://www.dgabc.com.br/Noticia/4368399/sao-caetano-oferece-coleta-de-psa-nas-ubss-durante-novembro-azul ; https://acritica.net/saude/novembro-azul-ms-1400-casos-cancer-prostata-2026-senhas-psa-hospital-cancer-campo-grande/
- Contradição oficial: MS e INCA contra rastreamento populacional; ANS recomenda a partir de 45 anos com fatores de risco. https://www.gov.br/ans/pt-br/assuntos/noticias/beneficiario/novembro-azul-ans-enfatiza-habitos-para-a-reducao-de-risco-do-cancer-de-prostata
- INCA: 77.920 casos novos estimados em 2026.
- Ressalva: é sazonal (todo novembro), não um viral novo; mas o pico de busca é exatamente agora.

**A profundidade**
- ERSPC (redução de mortalidade de ~20% com 16 anos; número necessário para rastrear ~456 e para diagnosticar ~12), PLCO (sem efeito, contaminado), ProtecT (vigilância ativa vs cirurgia vs radio: mortalidade igual em 15 anos), CAP (UK).
- Viés de tempo de antecipação e de duração, sobrediagnóstico, ressonância antes da biópsia (mudança recente que melhora a equação).
- Mito vs evidência: "detectar cedo sempre salva" vs "PSA não serve para nada".

**Widgets e gráficos**
1. Matriz de 1.000 homens (ícones) que o leitor rastreia: quantos falsos positivos, biópsias, sobrediagnósticos, impotência/incontinência, mortes evitadas.
2. Demonstração do viés de antecipação: duas linhas do tempo de um mesmo tumor, com e sem rastreio; a "sobrevida" sobe sem ninguém viver mais.
3. Calculadora de risco por idade e histórico familiar com e sem ressonância no fluxo.
4. Gráfico de incidência vs mortalidade de câncer de próstata (EUA desde 1975; Brasil SIM/INCA), mostrando o pico da era PSA.

**Dados e dificuldade:** Excelentes (ensaios publicados, SEER, INCA, SIM/DATASUS). Dificuldade baixa a média.

**Nota: 4.** Clássico de mito vs evidência com widget forte; menos "novidade", mas com timing perfeito para publicar até o fim do mês.

---

## 9. Bets: como a casa sempre ganha (e quem perde)

**Gancho:** 50 milhões de apostadores, R$ 213 por mês, R$ 4,7 bilhões por mês via Pix. O Banco Central chama de "fator central" do endividamento; a indústria diz que não é. O que os dados mostram?

**Por que está quente agora**
- CNDL/SPC Brasil: gasto médio mensal subiu 14% para R$ 213; 24% dos apostadores já ficaram negativados; Pix é usado por 78%. https://cndl.org.br/varejosa/gasto-mensal-com-apostas-sobe-14-e-chega-a-r-213-por-apostador/
- Perda líquida média nas bets autorizadas: R$ 108,27 por mês no 1º semestre de 2026 [NV fonte primária].
- Diretor do BC (Ailton de Aquino) chamou bets de elemento "central" e "indiscutível" do endividamento; contraponto de veículos da indústria. Endividamento das famílias 49,9% em fev/2026, recorde da série. https://ibegi.org.br/noticia/2454/banco-central-aponta-bets-como-fator-central-do-endividamento-das-familias-e-prepara-medidas-para-credito-mais-caro ; https://igamingbusiness.com/br/apostas-esportivas/dados-apresentados-pelo-presidente-do-banco-central-confirmam-que-bets-nao-sao-responsaveis-por-endividamento/
- Intercept (05/2026): bets já tiram mais dinheiro das famílias pobres que os juros. https://www.intercept.com.br/2026/05/04/bets-tiram-mais-dinheiro-que-juros/
- Paralelo global: mercados de previsão (Kalshi passou de US$ 3 bi em contratos das midterms; apostas esportivas combinadas somaram ~US$ 25 bi em 10 dias). https://www.cnbc.com/2026/11/09/millions-of-dollars-poured-into-prediction-markets-on-election-night.html
- Ressalva: o tema é constante desde 2024; não encontrei um fato único de novembro.

**A profundidade**
- Matemática: margem da casa, "overround", RTP dos jogos de cassino (Tigrinho), variância vs valor esperado; quase-acertos e reforço intermitente (Clark et al. 2009) [ligação com o ensaio da dopamina, sem repetir].
- Distribuição: poucos apostadores concentram a maior parte das perdas (dados de operadores do Reino Unido, Gambling Commission; Hollenbeck et al. 2024 sobre legalização nos EUA e queda de poupança, aumento de inadimplência; Baker et al. 2024).
- Nota técnica do BC (2024) sobre Pix para bets e Bolsa Família.
- Mito vs evidência: "dá para ganhar com estratégia" e "só aposta quem quer"; e do outro lado, "bets explicam todo o endividamento".

**Widgets e gráficos**
1. Simulador de 1.000 apostadores com R$ 213/mês por 12 meses: histograma de saldo final, quantos estão no positivo (spoiler: alguns, e é isso que alimenta o marketing).
2. Calculadora de overround: insira odds reais de um jogo do Brasileirão e veja a margem embutida.
3. Curva de Lorenz das perdas: quantos % dos apostadores respondem por 80% do dinheiro.
4. Série de Pix para bets vs inadimplência por faixa de renda.

**Dados e dificuldade:** Médios. BC, SPA/Ministério da Fazenda (dados do mercado regulado), estudos americanos com microdados. Dificuldade média.

**Nota: 4.** Brasileiríssimo e com matemática ótima para widgets; atenção à sobreposição com "sorte vs habilidade".

---

## 10. A IA está numa bolha? Data centers, conta de luz e a eleição americana

**Gancho:** US$ 3,2 trilhões evaporaram num dia, 40 de 41 plebiscitos americanos rejeitaram data centers e a conta de luz virou pauta eleitoral. Quanto de energia (e de água) a IA gasta, e quem paga?

**Por que está quente agora**
- Selloff de IA após as midterms de 03/11/2026: CNBC 06/11 ("war of attrition"); Motley Fool 05/11; perda de ~US$ 3,2 tri em uma sessão (FT via FactSet). https://www.cnbc.com/2026/11/06/ai-data-center-midterms-selloff.html ; https://www.fool.com/investing/2026/11/05/the-ai-selloff-is-getting-worse-nvidia-dell-and-data-center-stocks-are-plunging-hard-is-it-time-to-buy-the-dip/
- Al Jazeera 07/11/2026: eleitores rejeitaram data centers em 40 de 41 medidas; Fed de Dallas estima +6,9% no preço atacadista de energia por causa de data centers. https://www.aljazeera.com/economy/2026/11/7/how-the-us-midterm-elections-reflected-resistance-to-data-centres
- Brookings, Forbes (02/11), Reuters/Ipsos: 77% temem alta da conta de luz. https://www.brookings.edu/articles/why-data-centers-are-a-top-issue-in-the-2026-midterms/
- Relato de renúncia do CEO da Nvidia (Washington Times, 12/11/2026) não corroborado por outras fontes [NV].

**A profundidade**
- Energia por consulta (estimativas de Epoch AI, de Luccioni, divulgações do Google de 2025 de ~0,24 Wh por prompt do Gemini), uso de água (evaporativo vs total), participação dos data centers no consumo dos EUA (LBNL 2024: 4,4% em 2023, projeção 6,7 a 12% em 2028).
- Economia da bolha: capex vs receita (Goldman: ~US$ 7,6 tri de 2026 a 2031), comparação com ferrovias no século 19 e fibra óptica em 2000; financiamento circular.
- Brasil: leilões e data centers no Nordeste e no Sul (Redata) [checar estado atual].
- Mito vs evidência: "cada pergunta ao ChatGPT gasta uma garrafa de água" (número de 2023 inflado) vs "o impacto é desprezível" (local é enorme).

**Widgets e gráficos**
1. Calculadora "seu dia em IA": quantos prompts, imagens, vídeos, comparado a banho, ar-condicionado, Netflix, carro elétrico.
2. Mapa de data centers nos EUA vs variação da tarifa residencial por estado (EIA).
3. Gráfico capex de big techs vs receita de IA, com a "lacuna" que o leitor pode extrapolar sob cenários.
4. Comparação de bolhas: Nasdaq 2000, ferrovias de 1840, Nvidia 2023 a 2026 normalizados.

**Dados e dificuldade:** Bons (EIA, LBNL, balanços trimestrais, IEA). Dificuldade média.

**Nota: 4.** Atualíssimo e com números concretos; foco americano exige ponte com o Brasil.

---

## 11. "Psicose de IA": o chatbot pode enlouquecer alguém?

**Gancho:** Um estudo na JAMA Psychiatry vasculhou 578 mil prontuários atrás de pessoas cujos delírios cresceram conversando com o ChatGPT. Achou 28. Raro, real, e o que a bajulação dos modelos tem a ver com isso.

**Por que está quente agora**
- JAMA Psychiatry, 07/10/2026 (Vanderbilt): 578.058 registros de 215.712 pacientes; 73 pacientes elegíveis; 28 com psicose associada a chatbot (0,013% dos atendidos em saúde mental); 60,7% em primeiro episódio; "amplificador" em 64,3% dos casos; ChatGPT em 53,6%; 85,7% depois do GPT-4o (maio de 2024). https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2854891 ; Medscape 30/10/2026.
- NPR/OPB 30/10/2026: dois levantamentos (JED Foundation com 5.500 jovens de 9 a 17 anos; Common Sense Media) mostram que quase 2 em 3 usam chatbots e certos usos se associam a sintomas piores; estudo da UNC: uso para companhia ligado a mais solidão ao longo do tempo. https://www.npr.org/2026/10/30/nx-s1-6022278/ai-artificial-intelligence-teens-jed-common-sense-media
- arXiv set/2026: 185 relatos reais de delírios e danos associados a chatbots. https://arxiv.org/pdf/2609.08027

**A profundidade**
- Psiquiatria do delírio (modelos de erro de predição, "aberrant salience", folie à deux), sycophancy como mecanismo técnico (RLHF otimiza aprovação), episódio do GPT-4o "bajulador" de abril de 2025.
- Epidemiologia: incidência de psicose de base (~15 a 30 por 100 mil/ano) vs casos relatados; o problema do denominador.
- Mito vs evidência: "a IA está causando uma epidemia de psicose" vs "é só gente que já ia surtar".

**Widgets e gráficos**
1. Conversa simulada com dois modelos (bajulador vs calibrado) respondendo a uma crença cada vez mais delirante, com um medidor de "reforço".
2. O problema do denominador: 1 bilhão de usuários semanais vs taxa de base de psicose; quantos casos esperaríamos por acaso?
3. Infográfico das quatro categorias (catalisador, amplificador, coautor, objeto) com casos anonimizados.
4. Gráfico de uso de chatbots por adolescentes vs sintomas (dados JED/Common Sense).

**Dados e dificuldade:** Médios (estudos pequenos; ChatGPT ~900 milhões a 1 bilhão de usuários semanais, números de terceiros [NV]). Dificuldade média.

**Nota: 4.** Muito atual e com um mecanismo interessante; sobreposição real com "personalidade das máquinas" (sycophancy), então precisa de recorte clínico.

---

## 12. Celular proibido na escola: um ano depois, funcionou?

**Gancho:** 92% das escolas aplicam a lei e 95% dos diretores dizem que a concentração melhorou. Mas percepção de diretor não é nota de prova. O que a evidência internacional diz, e o ECA Digital vai além?

**Por que está quente agora**
- Pesquisa MEC/Inep/Instituto Alana divulgada em novembro de 2026: lei em vigor em 92% das escolas; 97% dos gestores veem mais envolvimento e 95% melhor concentração; MEC diz que é cedo para afirmar ganho de aprendizagem (amostra citada como 8.189 ou 2.469 gestores, conferir). https://www.rondoniadinamica.com/noticias/2026/11/pesquisa-aponta-resultados-positivos-apos-um-ano-de-regulamentacao-do-uso-de-celulares-nas-escolas,258633.shtml ; https://canaltech.com.br/smartphone/celular-proibido-nas-escolas-funcionou-o-que-mudou-apos-1-ano/
- ECA Digital (Lei 15.211/2025) em vigor desde 17/03/2026; ANPD abriu processo contra o Discord e suspendeu lives (agosto); canal de denúncias com ~200 relatos; fase sancionatória plena em jan/2027 [NV]. https://www.2viaonline.com/2026/10/eca-digital-regras-fiscalizacao-anpd.html ; https://agenciagov.ebc.com.br/noticias/202609/1-ano-de-eca-digital-o-que-mudou-para-criancas-e-adolescentes
- Pano de fundo: metanálise de 71 estudos (~98 mil pessoas) sobre vídeo curto e atenção (Psychological Bulletin, 2025).

**A profundidade**
- Evidência causal: Beland e Murphy (2016, Reino Unido: +6,4% de desvio padrão nas notas); Noruega (Abrahamsson 2024); estudo SMART Schools (Goodyear et al. 2025, Lancet Regional Health Europe: sem diferença em bem-estar); PISA 2022 (distração por dispositivos). Debate Haidt vs Odgers/Orben.
- Mito vs evidência: "proibir resolve a saúde mental" vs "não tem efeito nenhum". Efeitos maiores para alunos de baixo desempenho.

**Widgets e gráficos**
1. "Quantas notificações numa aula": simulação em tempo real de uma aula de 50 minutos com as notificações médias de um adolescente.
2. Gráfico de floresta de todos os estudos de proibição (efeito e intervalo), filtrável por desfecho (nota, bem-estar, bullying).
3. Mapa mundial de proibições com data e resultado medido.
4. Linha do tempo de PISA Brasil vs penetração de smartphones.

**Dados e dificuldade:** Médios (PISA aberto, papers com números; os dados brasileiros são de percepção). Dificuldade média.

**Nota: 4.** Relevância brasileira e boa evidência internacional; o dado nacional de aprendizagem ainda não existe, o que pode virar o próprio argumento.

---

## 13. Ouro e bitcoin caíram juntos: o mito da reserva de valor

**Gancho:** Pela primeira vez, ouro e bitcoin são os dois piores ativos do ano ao mesmo tempo, enquanto o petróleo dobrou. O que é "reserva de valor" e por que ela falhou em 2026?

**Por que está quente agora**
- 24/7 Wall St, 09/11/2026: bitcoin -14,3% no ano, ouro (GLD) -6%, ouro 26,5% abaixo do pico de US$ 5.518 (28/01/2026), petróleo (USO) +114,6%, dólar +7,8%, Treasury de 10 anos chegou a 5,31% em outubro. https://247wallst.com/investing/cryptocurrency/2026/11/09/bitcoin-and-gold-have-never-been-the-two-worst-major-assets-in-the-same-year-until-2026-why-are-both-store-of-value-assets-falling/
- Bitcoin na mínima desde agosto (~US$ 73,7 mil em 09/11), 38% abaixo do pico de out/2025. https://finance.yahoo.com/markets/article/gold-and-bitcoin-were-2026s-worst-assets--the-midterms-just-gave-them-a-pulse-174344496.html

**A profundidade**
- Ouro: correlação com juros reais (TIPS), compras de bancos centrais, ouro como hedge de inflação só em horizontes de séculos (Erb e Harvey, 2013, "The Golden Dilemma").
- Bitcoin: correlação com Nasdaq desde 2020, fluxo de ETFs, alavancagem.
- Brasil: ouro e bitcoin em reais (o câmbio muda a história).
- Mito vs evidência: "protege da inflação" e "ouro digital".

**Widgets e gráficos**
1. Máquina do tempo: escolha data de compra e de venda (ouro, bitcoin, Ibovespa, CDI, IPCA) e veja retorno real em reais.
2. Gráfico de dispersão ouro vs juros reais desde 2006, com 2026 destacado.
3. Correlação móvel bitcoin vs Nasdaq vs ouro.
4. Gráfico de drawdowns máximos de cada ativo.

**Dados e dificuldade:** Excelentes (FRED, LBMA, CoinGecko, BCB/SGS). Dificuldade baixa.

**Nota: 3.** Dados ótimos e fáceis, mas é mais finanças do que ciência; a história pode mudar rápido até a publicação.

---

## 14. Peptídeos (BPC-157): a nova febre da biohackeragem

**Gancho:** Injeção de "peptídeo de cura" virou moda no TikTok e nos podcasts. Em outubro, o governo americano liberou farmácias de manipulação para produzir seis deles. Quase toda a evidência é em ratos.

**Por que está quente agora**
- HHS/FDA, 29/10/2026: discricionariedade de fiscalização para farmácias 503A manipularem BPC-157, Epitalon, KPV, MOTS-c, Semax e TB-500; comitê consultivo votou 8 a 6 em julho de 2026, com membros ligados ao setor. The Conversation, 10/11/2026. https://theconversation.com/rfk-jr-loosens-access-to-unapproved-peptides-a-health-law-scholar-explains-what-consumers-need-to-know-295526
- NCPA 29/10/2026 (página bloqueou fetch) [NV]. https://ncpa.org/newsroom/qam/2026/10/29/fda-grants-enforcement-discretion-compounding-six-peptides

**A profundidade**
- BPC-157: estudos quase todos do mesmo grupo croata (Sikiric) em animais; um punhado de séries humanas minúsculas; proibido pela WADA (S0). Revisão de 2025 em Pharmaceuticals.
- O que são peptídeos (insulina e GLP-1 também são!), por que "peptídeo" virou palavra mágica depois das canetas.
- Mito vs evidência: "cura tendões e intestino", "natural, sem efeito colateral".

**Widgets e gráficos**
1. Pirâmide de evidência interativa: cada peptídeo posicionado (célula, rato, série de casos, ensaio) com o número de humanos estudados.
2. Comparativo "semaglutida vs BPC-157": anos de pesquisa, participantes de ensaios, aprovações.
3. Linha do tempo regulatória (2023 a 2026).

**Dados e dificuldade:** Fracos para gráficos ricos (poucos dados humanos), o que é parte da história. Dificuldade baixa.

**Nota: 3.** Hype puro com contraste claro, mas pouco dado para charts e sobreposição com o ensaio de longevidade.

---

## 15. Por que a geração Z está bebendo menos

**Gancho:** 54% dos americanos bebem, o menor índice desde 1939, e 53% acham que uma ou duas doses por dia faz mal. A queda entre jovens é saúde, dinheiro, celular ou Ozempic?

**Por que está quente agora**
- Gallup julho/2026 (divulgado em agosto): 54% bebem, empatado com 2025 no recorde de baixa; jovens de 18 a 29 com consumo na última semana caiu de 71% (2015 a 2017) para 55% (2024 a 2026). https://time.com/article/2026/08/20/americans-drinking-less-gallup-poll/
- Gasto com álcool nos EUA em recorde de baixa (Seoul Economic Daily, 01/11/2026). https://en.sedaily.com/international/2026/11/01/us-alcohol-spending-falls-to-record-low-as-young-adults
- Contraponto: IWSR diz que o consumo da geração Z se estabilizou em 74% em 15 mercados.
- Ressalva: o pico de notícia foi agosto; em novembro é menos quente. Brasil: Vigitel/Covitel [checar dados de 2025 e 2026].

**A profundidade**
- Mudança na mensagem científica (Stockwell 2023, metanálise que derruba a "curva J"; aviso do Surgeon General de jan/2025 sobre câncer), substituição (cannabis, bebidas sem álcool), socialização online, GLP-1 reduz vontade de beber.
- Mito vs evidência: "uma taça de vinho faz bem ao coração".

**Widgets e gráficos**
1. Curva J que se desfaz: o leitor remove os "abstêmios doentes" do grupo de comparação e vê o benefício sumir.
2. Coortes por geração (consumo aos 20 anos de cada geração).
3. Comparação de países e Brasil (Vigitel).

**Dados e dificuldade:** Bons (Gallup, NSDUH, Vigitel, metanálises). Dificuldade baixa.

**Nota: 3.** Ótima curva J para widget, mas o "agora" é fraco.

---

## 16. Corrida de rua: 15 milhões de brasileiros correndo para onde?

**Gancho:** Maratona do Rio com 70 mil inscritos, run clubs crescendo 8,6 vezes no Brasil. Correr virou o novo bar. O que a fisiologia diz sobre zona 2, VO2 máximo e quanto é demais?

**Por que está quente agora**
- Maratona do Rio 2026 com ~70 mil inscritos, recorde; Strava: clubes de corrida cresceram 8,6 vezes no Brasil (3,5 no mundo); 14,6 a 15 milhões de praticantes. https://webrun.com.br/maratona-do-rio-2026-consolida-crescimento-da-corrida-de-rua-no-brasil-com-recorde-de-publico-expansao-de-marcas-e-novo-reconhecimento-internacional/ ; https://maquinadoesporte.com.br/running/corrida-de-rua-bate-146-milhoes-de-praticantes-e-ve-produto-perder-espaco-para-comunidade/
- Contraponto InfoMoney: crescimento desacelerou para 5 a 7% em 2026, mercado saturado. https://www.infomoney.com.br/colunistas/daniel-krutman/mercado-de-running-sofre-com-saturacao-apesar-de-crescimento/
- Ressalva: tendência de ano todo, sem pico específico em novembro (São Silvestre em 31/12 pode servir de gancho).

**A profundidade**
- VO2 máximo e mortalidade (Mandsager 2018, JAMA Netw Open), curva dose-resposta da corrida (Lee 2014: benefício já com 5 a 10 min/dia), "zona 2" (muito hype, pouca evidência específica), coração de maratonista e calcificação coronária.
- Mito vs evidência: "corrida estraga o joelho" (corredores recreativos têm menos artrose, Alentorn-Geli 2017).

**Widgets e gráficos**
1. Curva dose-resposta de mortalidade vs minutos de corrida por semana, onde o leitor marca o próprio volume.
2. Calculadora de zonas e VO2 estimado a partir de um tempo de 5 km.
3. Joelho: prevalência de artrose em sedentários, corredores recreativos e de elite.

**Dados e dificuldade:** Bons (metanálises, dados Strava agregados). Dificuldade baixa.

**Nota: 3.** Popular e bem documentado, mas sobrepõe com o ensaio de longevidade e falta urgência.

---

## Menções honrosas (checadas, mas abaixo da linha)

- **Testosterona para todos?** FDA pediu em junho de 2026 para tirar a restrição de "baixa testosterona por idade" do rótulo, com base no TRAVERSE (5.200 homens). Forte mito ("a testosterona dos jovens despencou"), mas o gatilho é de junho. https://www.cnn.com/2026/06/20/health/testosterone-therapy-warning-label-changes-wellness
- **Vacina de herpes zóster contra demência / exame de sangue de Alzheimer.** Estudo de agosto de 2026 (24% menos demência com Shingrix, observacional), experimento natural do País de Gales (20% de redução relativa); p-tau217 no AAIC 2026 (JAMA). Lítio falhou em ensaio de março de 2026. O caso FHC (Alzheimer avançado, vídeo de influenciador derrubado em novembro de 2026) colocou o tema em pauta no Brasil. Bom para o futuro, mas o pico de pesquisa foi em julho e agosto. https://www.sciencedaily.com/releases/2026/08/260823015013.htm ; https://www.em.com.br/politica/2026/11/7536817-tiktok-tira-do-ar-conta-de-influenciador-que-filmava-fhc.html
- **Sachês de nicotina (Zyn).** Proibidos no Brasil e vendidos por WhatsApp; Anvisa abriu chamamento em 25/05/2026; nos EUA, 12º ano com uso na vida de 6,8% para 10%. Interessante, mas sem gatilho em novembro. https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2026/anvisa-inicia-coleta-de-informacoes-sobre-produtos-fumigenos-a-base-de-nicotina
- **Sleepmaxxing e ortossonia.** Outside Online (04/11/2026) sobre ansiedade gerada por notas de sono; fita na boca sem evidência boa. Bom ângulo "a obsessão com otimização faz mal", mas pouco dado novo. https://www.outsideonline.com/health/wellness/wellness-trends-2026-we-are-over/
- **Fibermaxxing.** Viral em 2026 (NPR, maio), mas colide com o ensaio do microbioma.
- **Creatina para o cérebro (mulheres na perimenopausa).** Ensaios pequenos de 2026 (36 e 51 participantes); interessante, mas fino para um ensaio longo.

---

## Observações para a escolha

- **Melhor combinação de calor + mecanismo + dados:** temas 1 e 2. Ambos brasileiros, ambos com data de validade curta (o 2 ganha um gancho extra em 16/12, quando a regra entra em vigor).
- **Melhor continuidade com o ensaio da dopamina:** tema 3 (cortisol). Mesmo público, mesma estrutura, menos urgência; pode esperar.
- **Publicação com prazo:** tema 8 (Novembro Azul) só funciona se sair até o fim de novembro; tema 4 (El Niño) rende até março, no pico dos impactos.
- **Riscos de sobreposição:** 11 com "personalidade das máquinas", 9 com "sorte vs habilidade", 14 e 16 com longevidade, 6 com microbioma.
