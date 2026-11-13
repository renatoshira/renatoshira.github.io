# Cortisol: a camada pop, os produtos e o que dizem os médicos

Pesquisa para o ensaio "Como baixar o cortisol (e se você deveria)". Consulta feita em 12/11/2026. A biologia de base (eixo HPA, ritmo circadiano, Cushing) fica com o outro documento; aqui estão a tendência, as buscas, os suplementos, os aparelhos, o Brasil e a crítica clínica.

**Legenda.** [V] verificado por mim na fonte primária ou nos dados brutos. [S] fonte secundária confiável (imprensa, resumo de terceiros), não conferida no original. [NV] não verificado, hipótese ou número de origem duvidosa.

**Método.** Google Trends consultado diretamente pela API não oficial (biblioteca pytrends, num ambiente virtual) em 12/11/2026, série mensal de jan/2018 a nov/2026 (novembro parcial); médias anuais e picos calculados por mim. Consultas "relacionadas" (related queries) puxadas para as janelas dos picos. Produção ambulatorial do SUS puxada do TabNet do DATASUS (SIA/SUS) por POST no formulário público. Resumos de artigos lidos pela API da Europe PMC. Os CSVs brutos estão em `cortisol-pesquisa/dados/`.

---

## 0. Resumo em 10 linhas

1. **Cortisol contra dopamina, mundo:** a frase "o cortisol passou a dopamina em 2023" está **errada no detalhe**. Nas médias anuais o cortisol já estava à frente desde 2018 (10,9 contra 9,5), só que por pouco e alternando mês a mês. O que acontece em 2023 é o fim da alternância: **o último mês em que a dopamina empatou ou venceu foi jan/2023**; desde fev/2023 o cortisol fica acima todo mês. A separação de verdade é 2024 (37,7 contra 19,6). Em 2026 o cortisol tem o dobro (66,5 contra 32,5) [V].
2. **Brasil:** a frase "passou em 2024" **se confirma**, por pouco. A "dopamina" liderou de abr/2022 a set/2024; **out/2024 é o primeiro mês da virada definitiva**, e na média anual de 2024 o cortisol fica 38,5 contra 36,8. Em 2026: 71,2 contra 26,5, quase o triplo [V].
3. **O pico mundial do cortisol é mar/2026 (=100); o do Brasil, abr/2026.** O que puxou esse pico não foi saúde: as buscas que mais subiram foram **"low cortisol meme"**, "high cortisol meme", "low cortisol dance" e "low cortisol song". O cortisol virou gíria e meme antes de virar produto [V].
4. Desde o pico, queda: em out/2026 o índice mundial está em 41 e nov (parcial) em 35, pouco acima da média de 2024 [V].
5. Cronologia dos termos (mundo): "cortisol cocktail" explode em **abr/2024**; "cortisol face" em **ago/2024** e de novo em mai/2026; "cortisol detox" tem pico em **jan/2025**; "cortisol belly" em mai/2026. "Adrenal fatigue" está em queda lenta desde 2018 [V].
6. No Brasil, o pico de **dez/2024** foi puxado por "detox de cortisol" e "o que é detox de cortisol" [V].
7. **Ashwagandha:** sinal de queda de cortisol é consistente em meta-análises (de 7 a 23 ensaios), mas com ensaios pequenos, em sua maioria indianos e financiados por fabricantes de extratos; a meta-análise de 2025 achou cortisol menor **sem** melhora no estresse percebido. Lesão hepática documentada (5 casos em 2020; revisões de 2026 com 26 a 37 casos, incluindo transplantes). Proibida na Dinamarca (2023) e **proibida como suplemento no Brasil** (Anvisa reforçou em 21/10/2026), e ainda assim buscada: pico no Brasil em ago/2025 [V/S].
8. Aparelhos: o Hormometer (Eli Health) custa a partir de US$ 8,25 por teste, com validação só da própria empresa; Lume e Adaptyx ainda não estão à venda; Oura e Whoop dão "estresse" a partir de frequência cardíaca e VFC, **não medem cortisol** [S].
9. **SUS:** as dosagens de cortisol aprovadas foram de 188 mil (2019) para 510 mil (2025), ×2,7; mas o estradiol, usado como controle, subiu ×2,3 no mesmo período. Parte do aumento é o crescimento geral de exames hormonais; o excesso específico do cortisol é modesto [V, com ressalvas].
10. A crítica clínica 2025 e 2026 é unânime: um cortisol isolado não diz nada, "detox" é impossível, "fadiga adrenal" não existe, e o risco real é prescrição de corticoide para um diagnóstico inventado.

---

## 1. A tendência: origens e propagação

### 1.1 Linha do tempo dos termos

| Data | Evento | Status |
|---|---|---|
| 1998 a 2001 | O naturopata James L. Wilson cunha "adrenal fatigue" e publica *Adrenal Fatigue: The 21st Century Stress Syndrome* (2001). Fontes divergem sobre o ano da cunhagem. | [S] |
| 2016 | Cadegiani e Kater (brasileiros, Unifesp) publicam "Adrenal fatigue does not exist: a systematic review". | [V] |
| 2016 | SBEM publica nota de esclarecimento sobre "fadiga adrenal" e alerta para hormônio adrenal em fórmulas manipuladas. | [S] |
| 2018 | Pico mundial de buscas por "adrenal fatigue" (mar/2018). Daí em diante, queda. | [V] |
| 2018 | Mayo Clinic Proceedings: 12 suplementos de "suporte adrenal" testados, todos com hormônio tireoidiano, 7 com esteroides, nenhum declarado no rótulo. | [S] |
| 2023 | "Adrenal cocktail" viraliza no TikTok (Essence, ago/2023), vendido como remédio para "fadiga adrenal". | [S] |
| fev a abr/2024 | Renomeado "cortisol cocktail": buscas mundiais saem de zero e batem o pico em **abr/2024**. Consultas que mais subiram em fev a ago/2024: "cortisol detox diet", "cortisol triggering foods", "viral cortisol cocktail", "cortisol face". | [V] |
| ago/2024 | Primeiro pico de "cortisol face" (32 no índice da consulta de termos pequenos). Matérias de HuffPost UK (ago/2024), CU Anschutz (25/11/2024). | [V] |
| nov e dez/2024 | Brasil: buscas por "cortisol" saltam de 42 para 54 e 74. Consultas em alta: "o que é detox de cortisol", "desintoxicação de cortisol", "liven cortisol", "bariátrica de cortisol". | [V] |
| jan/2025 | Pico mundial de "cortisol detox" (=100). | [V] |
| fev/2025 | O meme "cortisol spike"/"spike my cortisol" nasce no X (Daily Dot data em 27/02/2025). | [S] |
| mar/2025 | Congresso Alemão de Endocrinologia: Birgit Harbeck chama o "Cortisol-Detox" de perigoso e os testes de "não válidos, imprecisos e enganosos". | [S] |
| jul/2025 | CNBC, NYT e Vogue fazem matérias sobre o cocktail; no Brasil, Times Brasil (republicando a CNBC), Portal Tela (05/07/2025), Metrópoles, TudoGostoso. | [S] |
| fim de 2025 | O meme do "medidor de cortisol" ganha força com clipes do influenciador letão de nutrição Goatis e entra na comunidade "looksmaxxing". | [S] |
| fev/2026 | AP: "Do you need to control your cortisol? Probably not, doctors say" (02/02/2026). | [S] |
| 12/02/2026 | "Low Cortisol Dance": edição de @quandung0101 no TikTok com a personagem Agnes Tachyon (*Uma Musume*) dançando "Ai Đưa Em Về"; 2,8 milhões de views em duas semanas. | [S] |
| mar/2026 | **Pico mundial de buscas por "cortisol"** (=100). Brasil: abr/2026. | [V] |
| mai/2026 | Segundo pico de "cortisol face" e pico de "cortisol belly". Cleveland Clinic publica "What some people get wrong about cortisol" (12/05/2026). | [V/S] |
| jun a set/2026 | 2 Minute Medicine (04/09/2026): "cortisol face" levou mais pacientes a pedir exame. The Conversation/PsyPost (25/08/2026) desmonta o cocktail. | [S] |
| out/2026 | Anvisa reforça proibição da ashwagandha (21/10/2026). Lume Health mostra sensor de suor (15/10/2026). | [S] |

- **Potencial de widget:** ★★★ Linha do tempo horizontal sobre a curva mundial do Trends, com cada termo "nascendo" no mês do seu pico (adrenal fatigue em 2018 se apagando; cocktail abr/2024; face ago/2024; detox jan/2025; meme mar/2026). A virada narrativa é forte: a curva de saúde é ultrapassada pela curva do meme.

### 1.2 "Fadiga adrenal": o antepassado

- **Cadegiani FA, Kater CE. BMC Endocr Disord 2016;16:48** [V, resumo lido]. Busca em PubMed, MEDLINE e Cochrane até 22/04/2016. De **3.470 artigos, 58 estudos** cumpriram os critérios (33 em saudáveis, 25 em sintomáticos). Exames mais usados: cortisol ao despertar (29), resposta do cortisol ao despertar, CAR (27), ritmo de cortisol salivar (26). Achado: "resultados quase sistematicamente conflitantes". Conclusão literal: "adrenal fatigue is still a myth". Há uma correção publicada (BMC Endocr Disord 2016;16:63) [S]. https://bmcendocrdisord.biomedcentral.com/articles/10.1186/s12902-016-0128-4
  - **Ressalva importante para o texto:** Flávio Cadegiani depois ficou conhecido no Brasil como pesquisador principal dos ensaios de proxalutamida contra covid-19 (2021), investigados pela Conep por irregularidades éticas [S, de memória, conferir antes de citar]. Não invalida a revisão de 2016, mas se o ensaio elogiar "autores brasileiros", vale saber disso.
- **Endocrine Society** [S]: a página de pacientes ("Adrenal fatigue", Endocrine Library, atualizada em 25/01/2022) diz que não há prova científica de que "fadiga adrenal" seja uma condição médica verdadeira e que não há teste para ela. https://www.endocrine.org/patient-engagement/endocrine-library/adrenal-fatigue ; cobertura Healio 2018: https://www.healio.com/news/endocrinology/20180410/in-age-of-internet-diagnoses-endocrinologists-confront-myth-of-adrenal-fatigue
- **Buscas:** "adrenal fatigue" no mundo cai de 71,6 (2018) para 22,5 (2026), na consulta de termos pequenos [V]. No Brasil, "fadiga adrenal" é residual (média máxima 1,9 em 2018, zero em 2026) [V]. **O conceito não morreu, mudou de nome:** saiu "adrenal", entrou "cortisol".
- **Potencial de widget:** ★★ Gráfico de duas linhas: "adrenal fatigue" descendo, "cortisol detox/face/belly" subindo, com a etiqueta "mesmo produto, nova embalagem".

### 1.3 "Cortisol cocktail"

- Receita típica: suco de laranja, água de coco, sal (às vezes cremor tártaro, magnésio em pó, água com gás), servido em taça de vinho [S]. https://www.nbcnewyork.com/news/business/money-report/the-cortisol-cocktail-has-gone-viral-on-tiktok-but-can-it-actually-reduce-stress-heres-what-doctors-say/6326382/
- Era o "adrenal cocktail" de 2023 rebatizado (Wikipedia, com fontes Essence 2023, NYT e Vogue 2025) [S]. https://en.wikipedia.org/wiki/Cortisol_cocktail
- **Números da bebida** (Theresa Larkin, Univ. de Wollongong, The Conversation/PsyPost, 25/08/2026) [S]: cerca de **16 g de açúcar** (11 g do suco, 5 g da água de coco), um terço do limite diário recomendado; cerca de 1/4 de colher de chá de sal, um quarto do limite diário. https://www.psypost.org/anatomy-of-a-viral-wellness-trend-why-the-cortisol-cocktail-fundamentally-misunderstands-human-stress/
- Médicos ouvidos pela CNBC: nenhum estudo testou esses ingredientes sobre o cortisol; potássio e magnésio são risco para doença renal crônica; açúcar para diabéticos [S].
- **Ironia biológica** [V, raciocínio]: a lógica original do "adrenal cocktail" era *repor* o que a adrenal "cansada" não produz (sal, potássio, vitamina C), ou seja, pensado para cortisol **baixo**. Rebatizado, passou a ser vendido para **baixar** o cortisol. A mesma bebida serve para os dois problemas opostos.
- Buscas: pico em abr/2024; hoje no índice 4 (da escala da consulta de termos pequenos) [V].
- **Potencial de widget:** ★★ "Desmonte o cocktail": um copo dividido em camadas (suco, água de coco, sal), cada camada mostrando o que tem (gramas de açúcar, mg de sódio e potássio) e o que a ciência diz sobre cortisol (nada). Infográfico, sem interação obrigatória.

### 1.4 "Cortisol face" e "cortisol belly"

- Ninguém documentou quem cunhou o termo [S]. Decolou no TikTok e Instagram em 2024. Vídeos citados pela Logically Facts (nov/2024): um com 11,6 milhões de views prometendo "transformação inacreditável" ao baixar o cortisol, outro com 1,5 milhão afirmando que cortisol alto muda o rosto [S]. https://logicallyfacts.com/en/article/does-high-cortisol-cause-moon-face
- A influenciadora de bem-estar Mandana Zarghami aparece citada em vídeo viral dizendo que o rosto inchado vem do cortisol alto (Canal 26, 12/11/2024) [S]. https://www.canal26.com/bienestar-y-salud/2024/11/12/cara-de-cortisol-la-advertencia-de-los-medicos-por-esta-obsesion-que-se-hizo-viral-en-tiktok/
- O que dizem endocrinologistas [S]: Christie Turin More (CU Anschutz, 25/11/2024): "cortisol face e moon face não são termos médicos"; inchaço só no rosto, sem outros sinais, quase nunca é Cushing. https://news.cuanschutz.edu/department-of-medicine/cortisol-face . Caroline Messer, Christoph Buettner, Ada Cheung no mesmo tom (HuffPost UK, ago/2024). https://huffingtonpost.co.uk/entry/tiktok-says-puffy-skin-is-caused-by-cortisol-face-is-that-true_uk_66c351c7e4b0972f8acdf214
- 2 Minute Medicine (Deepti Shroff, 04/09/2026) [S]: a tendência "levou mais pacientes a pedir dosagem de cortisol", muitas vezes cortisol sérico aleatório, que **não é** exame de triagem; lembra os falsos positivos (obesidade, resistência à insulina, SOP, depressão, álcool, esteatose). Sem números de pedidos. https://www.2minutemedicine.com/tiktoks-cortisol-face-trend-meets-endocrine-reality/
- No Brasil, a busca relacionada "barriga de cortisol" já aparece em alta em mar a ago/2024 [V].
- **Potencial de widget:** ★★★ "Rosto inchado: o que é mais provável?" Um infográfico de probabilidade: de 1.000 pessoas com rosto inchado, quantas têm sono ruim, sal, álcool, alergia, retenção, remédio, anatomia, e quantas (quase nenhuma) têm Cushing. Precisa de números de prevalência do outro documento (Cushing endógeno: cerca de 2 a 3 casos novos por milhão por ano).

### 1.5 "Cortisol detox" e checklists de "sintomas de cortisol alto"

- Formato: programa autoaplicado de 7 a 30 dias que promete "eliminar" um hormônio [S]. https://acibademinternational.com/blog/the-cortisol-detox-why-the-viral-trend-misreads-a-normal-hormone/
- Checklists que circulam (web.de, 21/03/2025; AP, fev/2026) [S]: acordar às 3 da manhã, cansaço constante, beliscar, ir ao banheiro de madrugada, queda de cabelo, dificuldade de emagrecer, "rosto de lua", gordura na barriga. Todos sintomas inespecíficos e extremamente comuns. https://web.de/magazine/gesundheit/mediziner-warnen-tiktok-trend-cortisol-detox-40775504
- Pico de buscas por "cortisol detox": jan/2025 [V].
- **Potencial de widget:** ★★★ (o melhor desta seção) **"Faça o checklist do TikTok"**: o leitor marca os sintomas que tem; o widget mostra que, com a prevalência de cada sintoma na população (insônia, cansaço, gordura abdominal), quase todo mundo "tem cortisol alto", e depois mostra quantos de fato teriam Cushing (o valor preditivo despenca). Interação que ensina: o problema da probabilidade a priori. Precisa de prevalências de cada sintoma.

### 1.6 Contagens de views (todas com ressalva)

- **#cortisoldetox: perto de 800 milhões de views no TikTok** (segundo Cam Hostinar, UC Davis, citada pela Food Manufacture, 22/07/2026) [S]. https://www.foodmanufacture.co.uk/Article/2026/07/22/cortisol-the-viral-trend-thats-rewriting-shopping-lists/
- **#HowToReduceCortisol e #CortisolLevels: mais de 140 milhões de views somados** (UC Davis Wellness, sem data) [S].
- "Low Cortisol Dance": 2,8 milhões de views em duas semanas, um vídeo (Know Your Meme) [S]. https://knowyourmeme.com/memes/low-cortisol-dance
- Números de "bilhões de views" do cocktail aparecem só em sites de fazenda de conteúdo [NV, descartar].
- **Estudo de conteúdo:** Shaheen, Beyene, Arnha, Taylor (Univ. de Birmingham), "Hormone hype and health misinformation: social media marketing of cortisol and testosterone", SfE BES 2026, Endocrine Abstracts 117 OP5.3 [S]. Analisaram os vídeos de TikTok mais engajados sobre cortisol e testosterona com 11 critérios; acharam desinformação disseminada, cortisol culpado por barriga, cansaço e mau desempenho, venda de suplementos por medo e links de afiliado, e fiscalização inconsistente da plataforma. **Sem números no resumo**; o PDF completo pode ter. https://www.endocrine-abstracts.org/ea/0117/ea0117op5.3

### 1.7 Livros

- *The Cortisol Reset Plan*, Marina Wright (Vermilion, 2024/2025) [S].
- *Everything I Know About Cortisol*, Hannah Alderson (Penguin Random House, selo "Best Seller" no site da editora) [S].
- *Stress Nation*, Justin Hai (Wiley, set/2025, lista do USA Today e PW) [S].
- *The Cortisol Cure*, Erin Kinney (Hachette UK, set/2026), com o conceito de "conta bancária de cortisol" [S].
- Brasil: não encontrei livro de cortisol em lista de mais vendidos [NV, lacuna]. O paralelo com *Nação Dopamina* não existe aqui.

### 1.8 Influenciadores

- EUA/global: Goatis (Letônia) no meme do "cortisol spike"; Mandana Zarghami no "cortisol face" [S]. Não levantei números de seguidores.
- Brasil: **não encontrei** influenciador brasileiro específico associado ao tema com dados de alcance [NV, lacuna]. O que aparece é conteúdo de portal (Tua Saúde publicou em 13/04/2026 "Cansaço constante: hábitos que sobrecarregam as glândulas adrenais e levam ao esgotamento hormonal", um texto que reabilita a ideia de "fadiga adrenal" num dos maiores portais de saúde do país) [S]. https://www.tuasaude.com/news/2026/04/13/cansaco-constante-habitos-que-sobrecarregam-as-glandulas-adrenais-e-levam-ao-esgotamento-hormonal-a-longo-prazo/
- **Hipótese [NV]:** a busca "liven cortisol" em alta no pico brasileiro de dez/2024 sugere que anúncios do aplicativo de bem-estar Liven (que tem versão em português) usavam "detox de cortisol" como isca. Não confirmei os anúncios.

---

## 2. Google Trends: os números

Dados brutos em `cortisol-pesquisa/dados/trends-*.csv`. Índice 0 a 100, relativo ao maior mês **dentro de cada consulta**. Valores na mesma tabela são comparáveis; entre tabelas, não. 2026 vai de jan a nov (nov parcial). Pequenas diferenças frente ao ensaio da dopamina (por exemplo 37,7 contra 36,8 em 2024) são amostragem do próprio Google, que muda um pouco a cada consulta.

### 2.1 Mundo: "cortisol" contra "dopamine" (consulta conjunta) [V]

| | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|---|---|---|---|---|
| cortisol | 10,9 | 11,5 | 11,9 | 12,5 | 16,6 | 21,2 | 37,7 | 44,2 | **66,5** |
| dopamine | 9,5 | 9,9 | 11,0 | 11,7 | 16,2 | 18,4 | 19,6 | 24,4 | 32,5 |
| razão | 1,15 | 1,16 | 1,08 | 1,07 | 1,02 | 1,15 | 1,92 | 1,81 | 2,05 |

- Picos: cortisol **mar/2026 = 100**; dopamine mai/2026 = 44.
- Cortisol acima da dopamina em **89 de 107 meses**. Meses em que a dopamina empatou ou venceu: 18, todos entre jan/2018 e **jan/2023** (o último). Desde fev/2023, cortisol acima em todos os meses.
- Evolução de 2024 a 2026, mês a mês: cortisol estável em 40 a 47 de abr/2024 a dez/2025; salta para 56 (jan/2026), 79 (fev), **100 (mar)**, 82 (abr), 86 (mai), 76 (jun), 64, 53, 60, 41 (out), 35 (nov parcial).
- **Veredito:** "O cortisol passou a dopamina em 2023" está impreciso. Correto seria: "os dois andavam empatados até 2022; desde fev/2023 o cortisol nunca mais ficou atrás, e em 2024 abriu o dobro de vantagem". A afirmação do relato da Scope Weekly (01/04/2026) de que "cortisol quase dobrou no início de 2026" se **confirma**: mar/2026 = 100 contra média de 44 em 2025.

### 2.2 Brasil: "cortisol" contra "dopamina" (consulta conjunta) [V]

| | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|---|---|---|---|---|
| cortisol | 17,1 | 18,4 | 18,2 | 20,5 | 25,8 | 27,8 | 38,5 | 52,8 | **71,2** |
| dopamina | 12,9 | 15,2 | 15,7 | 16,6 | 29,6 | **42,8** | 36,8 | 33,0 | 26,5 |

- Picos: cortisol **abr/2026 = 100**; dopamina mai/2023 = 55 (o ensaio da dopamina diz jun/2023 em outra consulta; a diferença é de um mês e vem da amostragem).
- A dopamina liderou de **abr/2022 a set/2024** (com raras exceções). **Out/2024: cortisol 42 contra dopamina 36**, e daí em diante o cortisol fica acima todos os meses. Nov e dez/2024: 54 e 74 (onda do "detox de cortisol").
- **Veredito:** "o cortisol passou a dopamina em 2024 no Brasil" está **correto**, com a precisão de que foi no último trimestre e que na média anual de 2024 a diferença é pequena (38,5 contra 36,8). Antes de 2022, o cortisol também estava à frente: no Brasil a história é "cortisol, depois dopamina (2022 a 2024), depois cortisol de novo".

### 2.3 Mundo: cortisol, ashwagandha e os termos derivados

Consulta A (cortisol, ashwagandha, cortisol face, adrenal fatigue, cortisol cocktail) [V]:

| | 2018 | 2020 | 2022 | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|---|---|---|
| cortisol | 10,9 | 11,9 | 16,6 | 21,2 | 37,7 | 44,2 | 66,5 |
| ashwagandha | 8,2 | 13,5 | 22,0 | 30,7 | 36,4 | 41,4 | 40,1 |
| cortisol face | 0 | 0 | 0 | 0 | 0,5 | 0,8 | 0,7 |
| adrenal fatigue | 2,3 | 1,3 | 1,0 | 1,0 | 1,0 | 1,0 | 0,8 |
| cortisol cocktail | 0 | 0 | 0 | 0 | 0,3 | 0 | 0 |

- A ashwagandha esteve **acima** do cortisol de 2020 a 2023 e foi ultrapassada em 2024. Pico da ashwagandha: abr/2026 (55). Ela cresce colada no cortisol mas parou de subir em 2025 e 2026.
- **Escala real dos termos virais:** perto da palavra "cortisol", "cortisol face" e "cortisol cocktail" são quase zero. Os termos que ganham matéria de jornal são minúsculos; o grosso da busca é "o que é cortisol", "cortisol alto", "como baixar".

Consulta B, só termos pequenos (cortisol face, adrenal fatigue, cortisol cocktail, cortisol belly, cortisol detox) [V]:

| | 2018 | 2020 | 2022 | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|---|---|---|
| cortisol face | 1,0 | 1,3 | 2,1 | 2,8 | 15,0 | 16,9 | 21,4 |
| adrenal fatigue | **71,6** | 41,5 | 33,6 | 34,1 | 26,9 | 21,8 | 22,5 |
| cortisol cocktail | 0 | 0 | 0 | 0,4 | 12,2 | 7,1 | 7,2 |
| cortisol belly | 1,8 | 1,8 | 2,5 | 5,3 | 17,5 | 18,3 | 24,3 |
| cortisol detox | 0 | 0 | 0 | 0 | 30,9 | **43,8** | 20,9 |

- Picos mensais: cortisol face mai/2026 (35); adrenal fatigue mar/2018 (100 da escala, implícito); cortisol cocktail abr/2024 (29); cortisol belly mai/2026 (34); cortisol detox **jan/2025 (100)**.
- Em 2026, "cortisol face" (21,4) e "cortisol belly" (24,3) praticamente igualam "adrenal fatigue" (22,5), que em 2018 era 70 vezes maior.

### 2.4 Brasil: termos em português [V]

Consulta (cortisol alto, como baixar o cortisol, ashwagandha, fadiga adrenal, dopamina):

| | 2018 | 2020 | 2022 | 2023 | 2024 | 2025 | 2026 |
|---|---|---|---|---|---|---|---|
| cortisol alto | 3,2 | 4,0 | 5,7 | 6,8 | 9,8 | 14,0 | **23,5** |
| como baixar o cortisol | 0 | 0 | 0,8 | 0,8 | 1,4 | 2,0 | 3,2 |
| ashwagandha | 4,7 | 6,8 | 13,4 | 16,8 | 20,1 | **36,0** | 34,2 |
| fadiga adrenal | 1,9 | 1,0 | 1,0 | 1,0 | 1,0 | 0,3 | 0,1 |
| dopamina | 23,7 | 29,0 | 53,8 | **78,1** | 67,8 | 60,3 | 48,2 |

- "Cortisol alto" multiplicou por 7 desde 2018. Pico em abr/2026.
- **Ashwagandha no Brasil: pico em ago/2025**, e a média de 2025 e 2026 é o dobro de 2023, **apesar de proibida como suplemento desde 2022**. Bom dado para a seção de produtos.

### 2.5 O que o brasileiro e o mundo perguntam (related queries) [V]

- **Mundo, fev a ago/2024 (onda do cocktail):** em alta: "cortisol detox diet" (+9.250%), "cortisol triggering foods" (+5.250%), "cortisol detox" (+3.100%), "viral cortisol cocktail" (+2.900%), "cortisol face" (+170%), "supplements to reduce cortisol and belly fat" (+150%), "signs of high cortisol in women" (+130%).
- **Brasil, out/2024 a jan/2025:** topo: "cortisol alto", "detox cortisol", "o que é cortisol", "exame cortisol". Em alta: "o que é detox de cortisol" (+104.400%), "desintoxicação de cortisol", "liven cortisol", "bariátrica de cortisol", "cortisol cleanse", "dieta do cortisol", "metirapona" (o remédio de verdade para Cushing).
- **Mundo, jan a mai/2026 (o pico):** topo: "high cortisol", "low cortisol", "cortisol levels", "what is cortisol". Em alta: **"low cortisol meme" (+11.100%), "high cortisol meme", "low cortisol dance", "low cortisol song"**, e perguntas como "is low cortisol bad", "is low cortisol good". Países com maior interesse relativo: EUA, Singapura, Filipinas, Austrália, Canadá.
- **Brasil, fev a mai/2026:** em alta: "low cortisol meme" (+86.650%), "high cortisol meme", "low cortisol song"; no topo, "o que é cortisol", "cortisol alto", "exame cortisol".
- **Leitura:** o pico de 2026 é de **curiosidade semântica** (gente vendo o meme e perguntando o que é cortisol), não de doença. E "exame cortisol" aparece no topo do Brasil nas três janelas.
- **Ressalva técnica:** na pytrends, uma consulta mundial feita logo depois de uma consulta brasileira na mesma sessão devolveu dados do Brasil; refiz as consultas mundiais em sessão nova e conferi que a série do "cortisol" bate com a consulta mundial original.

### 2.6 Potencial de widget (Trends)

- ★★★ **Gráfico principal**, continuação direta do widget do ensaio da dopamina: dois painéis (mundo e Brasil), cortisol contra dopamina, 2018 a 2026, série **mensal** (não anual, porque a história está nos meses). Anotações: "jan/2023, última vez que a dopamina empatou" (mundo); "out/2024, a virada" (Brasil); "mar/2026, o meme" no pico. **Corrigir o widget w13a do ensaio da dopamina**: a nota "2023 · o cortisol passa a dopamina" está imprecisa para o mundo (sugestão: "2023 · o cortisol se descola").
- ★★ Painel "o que puxou cada pico": ao passar o cursor em cada pico, aparece a lista das buscas que mais subiram naquela janela (cocktail em 2024, detox no Brasil em dez/2024, meme em 2026). Interação que ensina: mostra que os picos têm causas diferentes.
- ★★ Pequenos múltiplos dos termos derivados (face, belly, detox, cocktail, adrenal fatigue), mesma escala.

---

## 3. Suplementos e produtos

### 3.1 Ashwagandha (*Withania somnifera*)

**Eficácia sobre o cortisol** [V, resumos lidos na Europe PMC]

| Revisão | Ensaios / n | Cortisol | Outros desfechos |
|---|---|---|---|
| Nutrients 2023 (PMID 38140274, autoria não conferida), revisão sistemática sem meta-análise | 9 estudos, de 4.788 triados | reduz, sem efeitos adversos significativos | nenhum estudo avaliou função adrenal ou efeitos a longo prazo |
| Explore 2024 (PMID 39348746) | 9 ECRs, n = 558 | DM −2,58 µg/dL (IC 95% −4,99 a −0,16) | estresse percebido (PSS) DM −4,72; ansiedade (HAM-A) DM −2,19 |
| Nutrition and Health 2025 (PMID 40746175), "Dual impact" | 7 ECRs para cortisol, 6 para PSS, n = 488 | **−1,16 µg/dL** (IC −1,64 a −0,69), I² 50,9% | **sem efeito no estresse percebido** (SMD −0,36, IC −1,19 a 0,47) |
| Planta Medica 2026 (PMID 41740946), PROSPERO CRD42024611576 | 23 ECRs, n = 1.706 | SMD −1,18 (p < 0,04) | serotonina +31,75 ng/mL; T4 +0,61 µg/dL; sem efeito em TSH/T3 |
| JoVE 2026 (PMID 42858054), ashwagandha e açafrão | 14 estudos de ashwagandha | redução combinada **−3,27 µg/dL** | risco de viés baixo em só 10 de 31 ensaios; GRADE "moderada no máximo"; recomenda monitorar enzimas hepáticas |
| Pharmaceuticals 2026 (PMID 42198398), segurança | 23 estudos, n = 2.317, só extrato de raiz padronizado | redução "consistente" | biomarcadores hepáticos e renais normais; sem eventos graves |

- **Tamanho do efeito em perspectiva** [V, raciocínio]: −1 a −3 µg/dL de cortisol sérico matinal, numa faixa normal que vai de cerca de 5 a 25 µg/dL e que varia isso de um dia para o outro na mesma pessoa. É uma diferença estatística entre grupos, não algo que alguém sentiria. E a revisão de 2025 achou o cortisol mais baixo **sem** a pessoa se sentir menos estressada: o marcador mexe, a experiência não.
- **SMD de −1,18** é um efeito gigantesco para um fitoterápico (maior que o de muitos antidepressivos sobre sintomas). Efeito grande demais em ensaios pequenos é sinal clássico de viés de publicação ou de qualidade [V, raciocínio].
- **Financiamento** [S]: grande parte dos ensaios é financiada por fabricantes de extratos patenteados (KSM-66, da Ixoreal; Sensoril, da Natreon; Shoden, da Arjuna). Marion Nestle apontou um ensaio infantil com gomas de KSM-66 financiado pelo fabricante, cujo artigo declarava ausência de conflito. https://www.foodpolitics.com/?p=28882 . O ensaio de referência mais citado, Chandrasekhar et al. 2012 (Indian J Psychol Med, n = 64, KSM-66), relata queda de cortisol de **27,9% contra 7,9% no placebo** [S, número de fonte secundária, conferir no original]. Não encontrei meta-análise que compare formalmente ensaios industriais e independentes [NV, lacuna].
- Lopresti et al. 2019 (Medicine, PMID 31517876, n = 60, extrato Shoden): queda de cortisol matinal e de DHEA-S [S].

**Segurança: fígado** [V/S]

- **Björnsson et al., Liver International 2020** (PMID 31991029) [V]: 5 casos (3 na Islândia em 2017 e 2018, 2 na rede americana DILIN em 2016). Lesão colestática ou mista, sem insuficiência hepática; normalização em 1 a 5 meses em 4 dos 5.
- Bokan et al. 2023 (Pharmaceuticals): dois casos novos, um com **transplante de fígado** [S].
- Revisão de 2026 (Felemban et al., Egyptian J Intern Med): **26 casos**; maioria se recupera ao parar, casos graves com UTI ou transplante [S]. Pôster HCA Healthcare 2026 (não revisado): **37 casos**, alguns com morte ou transplante [S].
- Caso britânico citado pela Anvisa (out/2026) [S]: mulher de 44 anos, gomas de ashwagandha diárias desde jul/2025; cerca de um ano depois, insuficiência hepática aguda com transplante e, após a cirurgia, paradas cardíacas e dano neurológico. O próprio relato (via CFF) ressalva que as complicações neurológicas não provam causalidade.
- Outros riscos: efeito tireoidiano (T4 sobe na meta de 2026); abortivo em uso tradicional, por isso o alerta de gestação da TGA australiana (2020) [S].

**Reguladores** [S, timeline da NutraIngredients, 06/07/2026] https://www.nutraingredients.com/Article/2026/07/06/timeline-will-authorities-de-throne-the-king-of-herbs/

| Ano | Regulador | Ação |
|---|---|---|
| 2013 | BfR (Alemanha) | avaliação de risco recomendando procedimento do Artigo 8 na UE; não avançou |
| 2019 a 2020 | DTU (Dinamarca) | relatório encomendado em 2019, publicado em 2020: impossível definir dose segura |
| 2020 | TGA (Austrália) | alerta obrigatório de gravidez |
| 2021 | Ministério do Ayush (Índia) | aviso contra uso das folhas (06/10/2021); recuo após pressão da indústria |
| 2022 | **Anvisa (Brasil)** | proibição de produtos com ashwagandha (Resolução-RE 3.669, de 04/11/2022, segundo Afya; não confirmei o nome da planta no texto da RE) |
| 2023 | **Dinamarca (DVFA)** | proibição total em suplementos; notificações no RASFF. Suécia, Finlândia e França abrem investigações |
| 2024 | RIVM (Holanda) | desaconselha o uso |
| 2024 | FSA (Reino Unido) | consulta pública sobre proibição |
| 2024 a 2026 | Agências europeias | ashwagandha entre 12 botânicos "críticos"; possível revisão do Artigo 8 em toda a UE |
| 16/04/2026 | Índia | novo aviso restringindo folhas; suspenso por três liminares |
| 21/10/2026 | **Anvisa** | nota reforçando que fabricação, venda, distribuição e uso são proibidos |

- A ANSES (França) disse "não estamos considerando proibir" [S]. O artigo pró-ashwagandha de Patwardhan et al. (AYU 2024) critica o relatório do DTU por não ser revisado por pares [S].
- **Mercado** [S]: ashwagandha global cerca de US$ 725 milhões (2024), projeção de US$ 1,4 bilhão em 2033. EUA, canal mainstream (SPINS, 52 semanas até 30/11/2025): **US$ 176 milhões, +27%**. Em 2024 (ABC Herb Market Report): US$ 144,5 milhões no mainstream, +13,8%. https://www.nutritionaloutlook.com/view/2026-ingredients-to-watch-top-ingredients-and-trends-driving-nutraceutical-product-development
- **Potencial de widget:** ★★★ "Forest plot honesto": os ensaios de ashwagandha como pontos com barras de erro, tamanho proporcional ao n, cor por financiamento (indústria ou independente, se der para codificar), e uma faixa cinza mostrando a variação normal do cortisol de um dia para o outro numa mesma pessoa. O efeito médio cabe dentro da faixa cinza. ★★ Mapa-múndi com o status regulatório (proibido, alerta, livre).

### 3.2 Outros suplementos: tabela de evidências sobre o cortisol

| Produto | Melhor evidência | Efeito no cortisol | Qualidade e ressalvas | Status |
|---|---|---|---|---|
| **Magnésio** | Boyle et al. 2017 (Nutrients, 18 estudos); Cureus 2024 (15 estudos) | **nenhum estudo com cortisol como desfecho principal** nessas revisões; benefício sugestivo em ansiedade subjetiva em grupos vulneráveis | qualidade "pobre" (Boyle 2017); nenhum usou escala validada de estresse | [V] |
| **L-teanina** | Mol Psychiatry 2026 (31 ECRs, n = 1.168) | não é desfecho da meta; estresse agudo SMD 0,31, "puxado por estudos de alto risco de viés" | melhora robusta só na atenção (200 mg, SMD 0,51) | [V] |
| **Fosfatidilserina** | Hellhammer et al. 2014 (Lipids Health Dis, n = 75 homens) | PAS 400 mg normalizou ACTH e cortisol ao estressor (TSST) **só** em quem tinha estresse crônico alto; 200 mg sem efeito | ensaio pequeno, financiado pela fabricante (Lipogen, que aparece em outro estudo do grupo) [S]; um ensaio de ômega-3 em PS (n = 60, 2012) não achou efeito principal | [V] |
| **Rhodiola** | Olsson et al. 2009 (Planta Med, n = 60, burnout) | resposta do cortisol ao despertar diferente no grupo tratado | ensaio único pequeno; meta-análises de 2025 e 2026 não sustentam efeito ergogênico; adulteração de produtos é problema documentado (Front Pharmacol 2026) | [V] |
| **Manjericão sagrado (tulsi)** | Lopresti et al. 2022 (Front Nutr, n = 100, extrato Holixer, 8 semanas) | cortisol no cabelo menor (p = 0,025); cortisol salivar menor após estressor (p = 0,001) | ensaio único, extrato comercial | [V] |
| **Ômega-3** | Madison et al. 2021 (Mol Psychiatry, n = 138, 4 meses) | 2,5 g/dia: **cortisol 19% menor durante estressor** de laboratório contra placebo | estudo auxiliar de um ECR; população sedentária com sobrepeso; efeito na reatividade, não no cortisol basal | [V] |
| **Vitamina C** | Brody et al. 2002 (Psychopharmacology, n = 120, 3 g/dia) | recuperação do cortisol mais rápida após estressor; pressão e estresse subjetivo menores | um único ensaio, antigo; dose 30 vezes a recomendação | [S, de memória, conferir] |
| **Probióticos** | Nutrients 2024 (46 ECRs, n = 3.516) | SMD −0,45 (IC −0,83 a −0,07) | **I² 92,5%**, certeza GRADE baixa | [V] |
| **"Cortisol cocktail"** | nenhum estudo | nenhum dado | açúcar e sódio | [S] |
| **Comparação: MBSR (mindfulness)** | Health Psychol 2026 (39 estudos, n = 2.059) | contra controles: g −0,38 (IC −0,56 a −0,21) | só em ECRs; heterogeneidade alta | [V] |
| **Comparação: meditação** | Koncz et al. 2021 (Health Psychol Rev) | efeito médio no sangue só em amostras de risco (doença somática); saliva: pequeno e não significativo | | [V] |
| **Comparação: exercício** | Sports 2025, meta-análise em rede (44 estudos, pessoas com sofrimento psicológico) | ioga SMD −0,59; HIIT tende a **subir** o cortisol; ótimo perto de 530 MET-min/semana | certeza de muito baixa a alta | [V] |

- **Leitura para o ensaio:** os efeitos mais sólidos sobre cortisol vêm de práticas (ioga, mindfulness), não de cápsulas, e mesmo esses são pequenos e heterogêneos. Nenhum suplemento tem evidência de mudar desfecho clínico. E quase sempre o que muda é a **reatividade** a um estressor de laboratório, não o "cortisol alto" do TikTok.
- **"Adaptógeno"** é categoria de marketing. O termo vem da farmacologia soviética (Lazarev, 1947; Brekhman, anos 1960) e nunca ganhou definição regulatória no Ocidente [S, de memória; ver Panossian, Med Res Rev 2021, PMID 33103257].
- **Mercado de adaptógenos (2025)** [S, relatórios de mercado, grande variação]: US$ 11,9 bi (Fortune Business Insights), 12,7 bi (Business Research Co.), 13,7 bi (Research and Markets), 15,8 bi (DataM). Usar como "de 12 a 16 bilhões de dólares, conforme quem conta".
- **Suplementos "para cortisol" à venda no Brasil** [S]: *Cortisol-Stress Balance* (Life Extension) listado nas redes Drogasil, Droga Raia e Drogaria São Paulo; *Cortisol Manager* (Integrative Therapeutics) em marketplaces. Não conferi a composição nem o status de registro de cada um [NV].
- **Potencial de widget:** ★★★ **Tabela de evidências interativa** (já prevista na pauta, widget 4): cada "hack" é uma linha com uma barra de tamanho de efeito, um medidor de qualidade da evidência, um selo de risco e um selo regulatório (Brasil). Ordenável por efeito, por qualidade ou por preço. A interação ensina porque o leitor vê que ordenar por "efeito" e ordenar por "qualidade" dão listas diferentes.

### 3.3 Testes caseiros e wearables

| Produto | O que mede | Preço | Validação | Status |
|---|---|---|---|---|
| **Hormometer, Eli Health** | cortisol salivar (e, desde a CES 2026, testosterona e progesterona); cartucho na boca por 60 s, leitura pela câmera do celular, cerca de 20 min | **a partir de US$ 8,25 por teste** (assinatura ou avulso); pacote de 8 por US$ 99 segundo varejista alemão | empresa diz 97% de concordância com exames de laboratório (cortisol), "mais de 90%" em outro release; **"FDA registered"** não é aprovação nem liberação; nenhum estudo revisado por pares encontrado | cortisol à venda nos EUA e Canadá desde set/2025; prêmio CES; Série A de US$ 12 mi [S] |
| **Lume Health** | cortisol no suor (depois estrogênio e progesterona), sensor no pulso | não divulgado | "estudos iniciais" sem dados; 25 mil na lista de espera | beta; lançamento previsto para 2027 (anúncio 15/10/2026) [S] |
| **Adaptyx** | cortisol livre no fluido intersticial da pele, contínuo, com "interruptores" de DNA sintético | não à venda | dois estudos "first-in-human" apresentados no congresso da ADA (jun/2026): acompanhou o sangue após dose oral de hidrocortisona e captou a CAR e o nadir noturno; 400 horas de dados; não publicado | caminho regulatório Classe II na FDA; foco em Cushing e insuficiência adrenal; US$ 23 mi de seed; "a alguns anos do mercado" [S] |
| **Whoop Stress Monitor** (mar/2023) | escala 0 a 3 a partir de frequência cardíaca e VFC contra a linha de base pessoal | incluído na assinatura | **não mede cortisol**; o próprio site diz que estresse "pode ser medido por biomarcadores como cortisol", sem afirmar que o aparelho o faz | [S] https://www.whoop.com/ca/en/thelocker/introducing-stress-monitor-a-new-way-to-monitor-manage-stress/ |
| **Whoop Advanced Labs** | exame de sangue em laboratório Quest, painel que inclui cortisol | US$ 199 (1 coleta) a 899 (6) | é exame de laboratório comum, sem horário controlado para o cortisol | só EUA [S] |
| **Oura** | "stress" diurno e "resilience" a partir de VFC, frequência cardíaca e temperatura | assinatura | **não mede cortisol** | [NV, não li a documentação nesta rodada] |

- **O ponto do ensaio** [V, raciocínio]: um teste de cortisol salivar barato e frequente é, ironicamente, a única forma de medir cortisol que faz algum sentido para curva diária (a saliva da meia-noite é um dos três testes de triagem de Cushing). O problema não é a tecnologia, é a pergunta: o aparelho entrega um número a cada manhã, e o número normal varia tanto que vira gerador de ansiedade. E os "scores de estresse" dos relógios não têm nada a ver com cortisol.
- **Potencial de widget:** ★★★ "O que cada aparelho mede de verdade": quatro aparelhos lado a lado, cada um com um diagrama de onde vem o sinal (saliva, suor, pele, pulso) e uma seta até "cortisol" que fica cheia, tracejada ou cortada. Infográfico estático. ★★ Ligação com o widget 2 da pauta (sorteio de medidas de saliva): "isto é o que o Hormometer te mostraria em 30 manhãs de uma pessoa saudável".

---

## 4. Brasil

### 4.1 Mercado de conteúdo "cortisol alto"

- Buscas: ver 2.2 e 2.4. "Cortisol alto" ×7 desde 2018; "exame cortisol" no topo das buscas relacionadas nas três janelas de pico [V].
- Imprensa brasileira (2025 e 2026) segue a CNBC e a AP, quase sempre com tom cético: Times Brasil, Portal Tela (05/07/2025), Metrópoles, Olhar Digital, Diário do Comércio, TudoGostoso, Folha Vitória [S]. https://timesbrasil.com.br/empresas-e-negocios/ciencias-e-saude/o-coquetel-de-cortisol-viralizou-no-tiktok-mas-sera-que-ele-realmente-reduz-o-estresse-veja-o-que-os-medicos-dizem/
- Portais de serviço (Tua Saúde) publicam conteúdo que reabilita a "exaustão adrenal" [S].
- Treendly: "cortisol alto" cerca de 2,9 mil buscas/mês [NV, da pauta; não conferi].

### 4.2 Ashwagandha e a Anvisa

- Proibida como suplemento desde nov/2022 (Resolução-RE 3.669/2022, segundo Afya e Bem Paraná) [S]. Base geral: RDC 243/2018 exige que suplementos usem só ingredientes da lista autorizada, e a ashwagandha não está nela [S].
- Nota de 21/10/2026: "sua fabricação, comercialização, distribuição e uso são proibidos no país"; proíbe alegação de cura, tratamento ou prevenção; cita o caso britânico (Forbes Brasil e Agência Brasil, 22/10/2026) [S]. https://forbes.com.br/forbes-saude/2026/10/ashwagandha-anvisa-alerta-que-suplemento-do-tiktok-nao-tem-registro/ ; https://portal.afya.com.br/clinica-medica/anvisa-reforca-falta-de-registro-de-suplementos-com-ashwagandha-no-brasil
- A mídia de out/2026 chama a ashwagandha de "suplemento do TikTok", promovido sobretudo para relaxamento e **perimenopausa** [S].
- **Farmácias de manipulação: lacuna [NV].** Nenhuma fonte esclareceu se manipulados com prescrição estão cobertos pela proibição. Na prática, a erva é vendida online e por importação. Conferir com a Anvisa ou o CFF antes de afirmar qualquer coisa.
- O paradoxo para o texto: **proibida desde 2022, e as buscas no Brasil dobraram entre 2023 e 2025** (16,8 para 36,0) [V].

### 4.3 Exames de cortisol: dados do SUS (SIA/SUS, TabNet) [V, com ressalvas]

Quantidade aprovada por ano de processamento, Brasil. Dados em `cortisol-pesquisa/dados/sus-sia-cortisol.csv`.

| Ano | Dosagem de cortisol (02.02.06.013-6) | Supressão com dexametasona (02.02.06.044-6) | Estradiol (controle) | Cortisol/estradiol |
|---|---|---|---|---|
| 2016 | 154.910 | 4.448 | 562.448 | 0,28 |
| 2018 | 176.189 | 5.245 | 661.075 | 0,27 |
| 2019 | 187.654 | 4.520 | 695.710 | 0,27 |
| 2020 | 152.391 | 3.534 | 564.325 | 0,27 |
| 2021 | 220.396 | 3.660 | 783.275 | 0,28 |
| 2022 | 291.443 | 4.710 | 1.045.181 | 0,28 |
| 2023 | 710.536 (sem ago: ~392.600) | 86.631 | 1.304.693 | ver nota |
| 2024 | 483.873 | 57.943 | 1.501.923 | 0,32 |
| 2025 | 510.246 | 12.638 | 1.594.202 | 0,32 |
| 2026 (jan a ago) | 424.424 (ritmo anual ~636 mil) | 5.098 | 1.297.594 | 0,33 |

- **Outlier:** ago/2023 sozinho registra 317.912 dosagens de cortisol contra 29 a 42 mil nos outros meses. É quase certamente erro ou lote de processamento, não demanda. Também o teste de dexametasona tem um salto estranho em 2023 e 2024 (de 4,7 mil para 86,6 mil e 57,9 mil) e volta a 12,6 mil em 2025; não investiguei a origem [NV]. Em 2023, o Rio de Janeiro mais que dobrou seus registros nos meses que amostrei.
- **Leitura honesta:** as dosagens de cortisol no SUS cresceram ×2,7 entre 2019 e 2025, mas os exames hormonais em geral também cresceram (estradiol ×2,3). A razão cortisol/estradiol ficou parada em 0,27 a 0,28 de 2016 a 2022 e subiu para 0,32 a 0,33 de 2024 em diante: **um excesso de cerca de 15 a 20% que coincide com a onda das redes**, mas não prova causalidade. O SUS é só uma fatia; a rede privada (Dasa, Fleury, Sabin, Pardini) não publica volumes por exame [NV, lacuna].
- **Potencial de widget:** ★★ Gráfico de barras com as duas séries normalizadas (2019 = 1), cortisol e estradiol, e uma linha da razão. Mostra o leitor separando "mais exames de tudo" de "mais exames de cortisol". Honesto sobre o outlier (barra de 2023 hachurada).

### 4.4 SBEM e o "cortisol face" / "fadiga adrenal"

- **Nota de esclarecimento da SBEM de 2016** sobre diagnósticos de "fadiga adrenal", com alerta para hormônio adrenal em fórmulas manipuladas (via Folha BV) [S, não achei o texto original]. https://www.folhabv.com.br/?p=61880
- Felipe Henning Gaia Duarte, presidente da SBEM-SP, em entrevista ao Vitat: "a fadiga adrenal não existe"; critica a reposição de "cortisol bioidêntico" prescrita sob o argumento de glândulas "cansadas"; um exame isolado de sangue ou saliva não basta [S]. https://vitat.com.br/fadiga-adrenal/
- **Não encontrei posicionamento oficial da SBEM sobre "cortisol face" ou "cortisol detox" em 2025 ou 2026** [NV, lacuna]. A SBEM assinou em mar/2026 um comunicado conjunto contra a fake news da "epidemia de micropênis" (sinal de que a sociedade se manifesta sobre desinformação hormonal, mas não sobre esta) [S]. https://www.sbp.com.br/sociedades-medicas-alertam-para-fake-news-sobre-epidemia-de-micropenis-e-riscos-de-uso-indevido-de-hormonios-em-criancas/
- Contexto regulatório relacionado: o CFM não reconhece a "modulação hormonal" (Afya) [S]. https://portal.afya.com.br/endocrinologia/por-que-a-modulacao-hormonal-nao-e-uma-pratica-reconhecida-pelo-cfm
- **Pendência sugerida:** escrever à SBEM pedindo posição sobre "cortisol face" e testes caseiros. Uma resposta inédita seria bom material.

---

## 5. O que dizem os clínicos (2025 e 2026)

### 5.1 Citações utilizáveis [S]

- **Roberto Salvatori** (endocrinologista, Johns Hopkins, AP, fev/2026): "Nosso nível de cortisol é regulado minuto a minuto." Fica nervoso com pacientes pedindo o próprio exame sem médico.
- **Katie Guttenberg** (UTHealth Houston, AP): "Há muita nuance em interpretar o cortisol." Um exame de sangue avulso não dá informação útil para a maioria e pode gerar estresse e exames desnecessários. Anticoncepcional falsamente eleva o cortisol no sangue (sobe a globulina que o transporta).
- **James Findling** (Medical College of Wisconsin, AP): suplementos não regulados "não são inócuos"; sobre dormir, se exercitar e controlar estresse: "nada de novo nisso".
- **Birgit Harbeck** (Alemanha, mar/2025): detox de cortisol "nem é possível"; testes "não válidos, imprecisos e enganosos"; assustam pacientes.
- **Matthew Badgett** (Cleveland Clinic, mai/2026): culpar o cortisol pelo ganho de peso é "uma forma simplista demais de pensar o metabolismo". https://newsroom.clevelandclinic.org/2026/05/12/what-some-people-get-wrong-about-cortisol
- **Christie Turin More** (CU Anschutz): não conhece dieta que "equilibre" o cortisol; o diagnóstico precoce importa porque o Cushing por tumor tem cura.
- AP: https://www.newstribune.com/news/2026/feb/10/do-you-need-to-control-your-cortisol-probably-not/

### 5.2 O risco de pedir o exame e interpretar errado [S/V]

- Diretriz da Endocrine Society para Cushing (Nieman et al., JCEM 2008;93(5):1526): triagem só depois de excluir corticoide exógeno e quando há **várias características progressivas**; usar um de três testes de alta acurácia: cortisol livre na urina de 24 h, cortisol salivar da madrugada, ou supressão com 1 mg de dexametasona. **Cortisol sérico aleatório não está na lista** [S, via 2 Minute Medicine; o outro documento deve citar a diretriz atualizada].
- Falsos positivos comuns ("pseudo-Cushing"): obesidade, resistência à insulina, SOP, depressão, álcool, esteatose, diabetes descompensado, gravidez, anticoncepcional oral [S]. https://portal.afya.com.br/clinica-medica/sindromes-pseudo-endocrinas-como-reconhecer-e-manejar
- **Raciocínio para widget** [V, aritmética]: com Cushing endógeno raríssimo e falso positivo frequente justamente nas pessoas que fazem o checklist (obesas, deprimidas, estressadas), o valor preditivo positivo de um cortisol alto num exame aleatório é baixíssimo. Ligar ao widget 1.5.
- **Cascata:** um resultado "alto" leva a mais exames, às vezes imagem, e imagem acha incidentalomas adrenais (frequentes com a idade), o que gera mais exames [S, conhecimento clínico geral; o outro documento pode trazer a prevalência de incidentaloma].

### 5.3 Mau uso de glicocorticoide

- **"Fadiga adrenal" tratada com hidrocortisona** (manipulada ou "bioidêntica"): suprime o eixo; ao parar, pode causar **insuficiência adrenal de verdade**, e potencialmente crise adrenal. O diagnóstico inventado cria a doença real [S, SBEM-SP via Vitat; mecanismo bem estabelecido].
- **Suplementos de "suporte adrenal" com hormônio escondido:** Akturk et al., Mayo Clin Proc 2018;93(3):284 a 290: os 12 produtos mais populares de "metabolismo, energia ou suporte adrenal"; **todos tinham T3**, **7 tinham ao menos um esteroide** (pregnenolona em 5), nenhum declarado [S]. https://inthenews.mayoclinic.org/tag/adrenal-support/
- **Artri King / Artri Ajo King:** "suplemento" para articulações vendido online, com **dexametasona e diclofenaco não declarados** (FDA, 2022; TGA também detectou fenolftaleína). A FDA recebeu relatos de lesão hepática e morte, e alerta para supressão adrenal ao interromper. https://www.fda.gov/drugs/medication-health-fraud/artri-ajo-rey-and-artri-ajo-king-may-be-harmful-due-hidden-drug-ingredients . Não encontrei ação específica da Anvisa [NV].
- **Caso exógeno famoso:** Amy Schumer relatou em 2024 Cushing exógeno após injeções de corticoide; "real, mas não representativo" (2 Minute Medicine) [S].
- **O paradoxo de fundo** [V, raciocínio]: a causa mais comum de cortisol alto de verdade é o remédio de corticoide; e a causa mais comum de cortisol baixo de verdade é parar o corticoide. O TikTok vende o contrário: cortisol alto por estresse e cortisol baixo por "cansaço".
- **Potencial de widget:** ★★ Diagrama "quem tem cortisol fora do normal de verdade": um treemap com as causas reais (corticoide exógeno, tumor de hipófise, tumor adrenal, insuficiência por doença autoimune, por parada de corticoide) contra a fatia "estresse do dia a dia" (que fica dentro da faixa normal). Precisa de números de incidência do outro documento.

---

## 6. Ganchos e frases para o texto

- "A dopamina teve três anos de fama no Brasil. O cortisol tomou o lugar em outubro de 2024 e, no auge, virou meme de dança de anime."
- "O pico das buscas por cortisol em 2026 não foi de gente doente. Foi de gente perguntando o que o meme queria dizer."
- "A fadiga adrenal saiu de moda em 2018. Voltou em 2024 com outro nome."
- "A mesma bebida que era vendida para levantar uma adrenal cansada passou a ser vendida para acalmar uma adrenal agitada."
- "A ashwagandha baixa o cortisol no exame e não muda o estresse que a pessoa sente."
- "No Brasil a ashwagandha é proibida desde 2022. As buscas dobraram depois disso."

## 7. Lacunas e pendências

1. Texto original da nota da SBEM de 2016 e eventual posição 2025/2026 sobre "cortisol face" (pedir à SBEM).
2. Escopo exato da proibição da ashwagandha para farmácias de manipulação (Anvisa/CFF).
3. Conferir Chandrasekhar 2012 (27,9% contra 7,9%) e Brody 2002 (vitamina C) nos originais.
4. Número de casos e views do estudo de Birmingham (SfE BES 2026): pedir o PDF ou o pôster.
5. Influenciadores brasileiros com alcance mensurável (não encontrados).
6. Origem do outlier do SUS em ago/2023 e do salto do teste de dexametasona em 2023 e 2024.
7. Documentação do Oura sobre o "stress" e o "resilience".
8. Confirmar a hipótese "liven cortisol" (anúncios do app Liven no Brasil, dez/2024).
9. Corrigir a anotação do widget w13a no ensaio da dopamina (mundo: "2023, o cortisol se descola", em vez de "passa").
