# Luz vermelha (fotobiomodulação): a evidência clínica, indicação por indicação

Dossiê de apoio para o ensaio interativo sobre terapia de luz vermelha ("hype ou não?"). Pesquisa feita em 14 nov 2026.

Escopo deste arquivo: a evidência clínica em humanos, organizada como uma escada de evidência. Para cada indicação: melhor evidência, viés e problema de sham, financiamento, posição de diretrizes, status regulatório e veredito. Fora do escopo: mecanismo (citocromo c oxidase, janela óptica, curva bifásica de dose), mercado de aparelhos e dados de busca, que ficam com outros dossiês.

**Legenda de confiabilidade**
- **[V]**: verificado na fonte primária (abstract, texto completo ou documento oficial lido nesta pesquisa).
- **[S]**: confirmado só em fonte secundária confiável (imprensa especializada, resumo de terceiros, revisão) ou conhecimento estabelecido do campo que não reli na fonte.
- **[NV]**: não verificado, de memória ou fonte fraca. Conferir antes de publicar.

**Escala de veredito**
- **forte**: diretriz recomenda, vários ECRs bem cegados, efeito clinicamente relevante.
- **moderada**: efeito consistente em meta-análises de ECRs com sham, mas com heterogeneidade, estudos pequenos ou conflito de interesse.
- **fraca**: poucos ECRs pequenos, resultados positivos mas frágeis.
- **sem evidência**: só animais, células, séries de casos ou marketing.
- **contrária**: ECRs ou meta-análises sem efeito, ou diretriz que diz "não oferecer".

**Método.** Abstracts lidos pela API E-utilities do NCBI (URLs no formato `https://pubmed.ncbi.nlm.nih.gov/<PMID>/`). O resumo da De Novo do FDA para o Valeda (DEN230083) foi lido em PDF. Páginas da NICE bloquearam acesso automático (403), então as posições da NICE estão como [S].

**Convenções.** EVA = escala visual analógica de dor de 0 a 100 mm. Diferença mínima clinicamente importante para dor costuma ficar entre 10 e 20 mm. SMD = diferença média padronizada (0,2 pequena, 0,5 média, 0,8 grande). RR = risco relativo. ECR = ensaio clínico randomizado. "Laser de baixa potência" (LLLT), "LED" e "fotobiomodulação" (PBM) são usados como sinônimos na literatura, embora os aparelhos sejam muito diferentes.

---

## 0. A escada em uma tabela

| # | Indicação | Melhor evidência (resumo) | Veredito |
|---|---|---|---|
| 1 | Mucosite oral: prevenção em TCTH e cabeça e pescoço | MASCC/ISOO recomenda (2019); meta-análise de 18 ECRs, RR 0,37 para mucosite grave; fase III brasileira RR 0,16 | **forte** |
| 1b | Mucosite oral: tratamento da lesão já instalada, quimio sem radio | MASCC/ISOO: "nenhuma diretriz possível" | **fraca** |
| 2 | Alopecia androgenética | Meta-análises de ECRs com sham, SMD ~1,3; FDA 510(k) desde 2007 | **moderada** |
| 3a | Acne (azul + vermelho) | Cochrane 2016/2018: 71 ECRs, qualidade baixa, sem efeito clinicamente claro da luz sozinha | **fraca** |
| 3b | Rugas / fotoenvelhecimento | ECRs pequenos, controle sem sham, financiamento de fabricante | **fraca** |
| 3c | Feridas: úlcera de pé diabético | 7 ECRs, 194 pacientes, efeito grande e frágil | **fraca** |
| 3d | Feridas: úlcera venosa | Meta-análise 2026: sem diferença (MD 3,8 cm², IC -4,5 a 12,0) | **contrária / fraca** |
| 3e | Cicatrizes e queloides | Quase só laser cirúrgico (não PBM); PBM sozinho sem ECR robusto | **sem evidência** |
| 4a | Dor cervical | Chow 2009, Lancet: 16 ECRs, -19,9 mm EVA | **moderada** |
| 4b | Artrose de joelho | Stausholm 2019: 22 ECRs, -14 mm EVA; mas NICE 2022 diz "não oferecer" | **moderada (contestada)** |
| 4c | Tendinopatia de membro inferior / fascite plantar | Naterstad 2022: -13 mm EVA, IC largo | **fraca a moderada** |
| 4d | Lombalgia | Cochrane 2008: "dados insuficientes" | **fraca** |
| 5 | Desempenho e recuperação no exercício | Meta-análises SMD 0,27 a 0,35 em resistência; zero em força, corrida e natação | **fraca** |
| 6a | DMRI seca (Valeda) | LIGHTSITE III: +3,8 letras vs sham aos 21 meses; FDA De Novo nov 2024 | **fraca a moderada** |
| 6b | Controle de miopia em crianças (RLRL) | ECRs chineses grandes, -0,26 mm de comprimento axial/ano; risco retiniano e rebote | **moderada para eficácia, segurança não resolvida** |
| 7a | Demência / comprometimento cognitivo leve | ECRs de 20 a 30 pessoas; ensaio pivotal da Vielight suspenso | **fraca** |
| 7b | Depressão | Meta-análise 2026, 18 estudos, g = -0,47, quase todos pequenos | **fraca** |
| 7c | Traumatismo craniano | ECRs de 17 a 38 pessoas, desfechos de imagem | **fraca** |
| 8a | Testosterona / "luz nos testículos" | Nenhum ECR humano; ratos | **sem evidência** |
| 8b | Hashimoto (tireoide) | Um ECR brasileiro, n = 43, sem replicação independente | **fraca** |
| 8c | Sono / melatonina | Um estudo de 20 atletas sem sham real; um ECR de 30 com insônia | **fraca** |
| 8d | Gordura localizada / contorno corporal | ECRs com sham pagos pelo fabricante; ~1 a 2 cm, efeito some em semanas | **fraca** |
| 8e | Celulite | Estudos pequenos, quase sempre combinados com massagem | **sem evidência / fraca** |
| 8f | "Saúde mitocondrial", longevidade | Nenhum desfecho clínico em humanos | **sem evidência** |

**Potencial de widget:** ★★★ "A escada da luz vermelha". Infográfico estático vertical: cada indicação é um degrau, colorido pelo veredito, com o tamanho do efeito escrito ao lado e um ícone para "tem diretriz", "tem sham", "pago pelo fabricante". O degrau do topo (mucosite) e os do chão (testosterona, longevidade) mostram em uma olhada que "funciona?" depende de "para quê?". Um único toque interativo útil: filtrar por "o que se vende no Instagram" vs "o que hospital usa", e ver que as duas listas quase não se cruzam.

---

## 1. Mucosite oral no tratamento do câncer (o degrau mais alto)

### 1.1 A diretriz MASCC/ISOO
- **Achado:** a revisão sistemática do Mucositis Study Group da MASCC/ISOO (Zadik et al. 2019, Support Care Cancer) emitiu **recomendação** (o grau mais alto da escala deles) de PBM para **prevenção** de mucosite oral e dor associada em três cenários: transplante de células-tronco hematopoéticas (TCTH), radioterapia de cabeça e pescoço sem quimio e radioterapia de cabeça e pescoço com quimio. Para cada cenário recomenda 1 a 2 protocolos e diz que "o clínico deve aderir a todos os parâmetros do protocolo escolhido". Para **tratamento** da mucosite já instalada e para mucosite só de quimioterapia: **"No Guideline Possible"** por evidência inadequada. [V] https://pubmed.ncbi.nlm.nih.gov/31286228/
- **Nível de evidência:** segundo uma tabela secundária, TCTH e radio+quimio de cabeça e pescoço receberam nível de evidência I; radio sem quimio, nível II. [S] https://www.guidelinecentral.com/guideline/302396
- **Pediatria:** a subanálise pediátrica da MASCC/ISOO (Miranda-Silva 2021) concluiu que a eficácia de quase todas as intervenções "não pôde ser determinada" em crianças, mas citou PBM e mel como "potencial encorajador"; sugere extrapolar dados de adultos. [V] https://pubmed.ncbi.nlm.nih.gov/33156403/ Uma meta-análise de 2025 (5 ECRs, 177 crianças tratadas) achou benefício com IC raspando no zero (IC 0,01 a 0,84; p = 0,04). [V] https://pubmed.ncbi.nlm.nih.gov/40889543/

### 1.2 Os números
- **Meta-análise de referência:** Oberoi et al. 2014 (PLoS One), 18 ECRs, 1.144 pacientes. PBM profilática reduziu mucosite grave: **RR 0,37 (IC 95% 0,20 a 0,67)**. Dor grave: **RR 0,26 (0,18 a 0,37)**. Duração da mucosite grave: **-5,3 dias (-9,5 a -1,2)**. [V] https://pubmed.ncbi.nlm.nih.gov/25198431/
- **O ECR brasileiro (INCA):** Antunes et al. 2013 (Oral Oncology), fase III, duplo-cego, placebo, 94 pacientes de cabeça e pescoço em quimiorradioterapia com cisplatina. Laser InGaAlP 660 nm, 100 mW, 1 J por ponto (4 J/cm²). Mucosite grau 3 a 4: **6,4% vs 40,5%**, RR **0,158 (0,050 a 0,498)**. Melhora em dor, deglutição e qualidade de vida. [V] https://pubmed.ncbi.nlm.nih.gov/24044799/
- **O alerta sobre tumor:** existe um receio teórico de que luz estimule células tumorais na boca. No seguimento de longo prazo do mesmo ECR (Antunes 2017), o grupo laser teve **mais** resposta completa (89,1% vs 67,4%) e mais sobrevida livre de progressão (61,7% vs 40,4%; HR 1,93, IC 1,07 a 3,5). Os autores pedem cautela: 94 pacientes, desfecho secundário. Não é prova de que laser "cura câncer", mas é o dado mais tranquilizador disponível sobre segurança oncológica. [V] https://pubmed.ncbi.nlm.nih.gov/28688677/
- **ECR novo, 2026:** Hu et al. 2026 (Support Care Cancer), 85 pacientes em 12 centros dos EUA, aparelho intraoral de LED, duplo-cego com sham. Mucosite grave (OMS ≥3) durante 6 semanas de IMRT: **36,8% vs 57,1%** (p = 0,046). Duas semanas após: 10,8% vs 36,4%. [V] https://pubmed.ncbi.nlm.nih.gov/42360517/ Ressalva: trial de aparelho comercial, com p no limite; financiamento não aparece no abstract. [NV para patrocínio]

### 1.3 O lado cético
- **Umbrella review 2024:** Rodrigues et al. avaliaram 21 revisões sistemáticas sobre PBM em mucosite. Pelo AMSTAR-2, **71,4% eram de qualidade "criticamente baixa"** e o resto "baixa". Das 40 estimativas meta-analíticas, 87,5% eram significativas, mas só uma tinha força "altamente sugestiva"; o resto, "fraca". [V] https://pubmed.ncbi.nlm.nih.gov/39294629/
- **Leitura honesta:** o efeito é grande e consistente na prevenção, em populações específicas, com protocolos específicos. As revisões sobre o tema é que são ruins, não necessariamente os ECRs centrais. A própria MASCC/ISOO avisa que os parâmetros clínicos eram "extremamente variáveis".
- **Cochrane:** existe um protocolo Cochrane só de PBM para prevenção de mucosite (CD016068, publicado em 3 dez 2024). A revisão completa ainda não saiu nesta pesquisa. [V para o protocolo] https://cochranelibrary.com/cdsr/doi/10.1002/14651858.CD016068/information

### 1.4 Brasil: SUS, ANS e prática
- **SUS:** a Portaria SAES/MS nº 3.035, de 14 jul 2025, incluiu na tabela SIGTAP o procedimento **03.07.05.001-7, "fotobiomodulação a laser de baixa potência para tratamento da mucosite oral radioinduzida e/ou quimioinduzida"**. A Portaria SAES/MS nº 3.489, de 18 nov 2025, alterou atributos (valor hospitalar R$ 47,50; registro em e-SUS APS e AIH especial). [S, via Conass e Legismap; conferir no DOU] https://www.conass.org.br/?p=52956
- **Planos de saúde (ANS):** a laserterapia para mucosite está no Rol com diretriz de utilização (DUT 51, Anexo II da RN 465/2021), restrita a pacientes com câncer de cabeça e pescoço e a submetidos a transplante de medula óssea. Em 9 dez 2025 o Conselho Federal de Odontologia pediu à ANS para ampliar a DUT a "todos os pacientes em quimioterapia com risco moderado a alto de mucosite oral" (mama, cólon, pulmão, ovário). [S] https://legismap.com.br/conteudos/artigos-e-noticias/cfo-solicita-a-ans-revisao-de-diretrizes-para-tratamento-de-mucosite-oral-com-laserterapia
- **Curiosidade de contraste:** o pedido do CFO vai além do que a MASCC/ISOO sustenta (para mucosite só de quimioterapia, a diretriz diz "nenhuma recomendação possível").
- **ANVISA:** lasers terapêuticos de baixa potência são registrados como equipamentos médicos (classe de risco II/III conforme o aparelho). [NV, conferir classificação exata]
- **Contexto:** o Brasil é um dos centros mundiais de pesquisa em PBM (INCA, USP, Uninove, UFMG), o que aparece em quase todas as meta-análises. [S]

**Veredito:** prevenção em TCTH e cabeça e pescoço: **forte**. Tratamento da lesão instalada e mucosite só de quimio: **fraca**.

**Potencial de widget:** ★★★ "100 pacientes de cabeça e pescoço". Grade de 100 bonequinhos: no placebo, 40 ficam vermelhos (mucosite grau 3 a 4); no laser, 6 (Antunes 2013). Um seletor troca para a meta-análise (RR 0,37). Estático já ensina tudo; o toque só alterna os dois mundos.

---

## 2. Alopecia androgenética (calvície)

- **Meta-análise de dispositivos com aval do FDA:** Lueangarun et al. 2021 (J Clin Aesthet Dermatol), 7 ECRs duplo-cegos contra sham. Densidade capilar: **SMD 1,27 (IC 0,99 a 1,64)**. Só diodos laser: SMD 1,52 (1,16 a 1,88); laser + LED: 0,85 (0,55 a 1,16). Em jan 2020, 32 aparelhos domésticos tinham 510(k). [V] https://pubmed.ncbi.nlm.nih.gov/34980962/
- **Liu et al. 2019 (Lasers Med Sci):** 11 ECRs duplo-cegos, SMD 1,316 (0,993 a 1,639). [S, via resumo de busca]
- **Em fios por cm²:** Leavitt 2009 (HairMax): +19,8 fios/cm² vs -7,6 no sham. Kim 2013: +17,2 vs -2,1. [S] Para comparação, minoxidil 5% costuma dar algo na faixa de +15 a +20 fios/cm² em 16 a 48 semanas. [NV]
- **Comparação com remédios:** Adil 2017 (JAAD): LLLT, minoxidil 2% e 5% e finasterida 1 mg foram todos superiores a placebo em homens. [V] https://pubmed.ncbi.nlm.nih.gov/28396101/ A meta-análise em rede de Gupta 2022 colocou LLLT em 2º lugar em homens (atrás de PRP) e em 1º em mulheres, **mas julgou a qualidade da evidência das terapias no topo como "baixa"**. [V] https://pubmed.ncbi.nlm.nih.gov/32250713/
- **Umbrella review 2025:** certeza **moderada** para densidade capilar (eSMD 1,32, IC 1,00 a 1,63). [V] https://pubmed.ncbi.nlm.nih.gov/40770824/
- **FDA:** o HairMax LaserComb recebeu **510(k) K060305 em 18 jan 2007** para homens (Norwood-Hamilton IIa a V, Fitzpatrick I a IV); extensão para mulheres em 2011 (K112524). [S, via base Innolitics do FDA] https://fda.innolitics.com/device/K060305 **Importante:** 510(k) é "liberação" (cleared) por equivalência substancial a um aparelho já existente, não "aprovação" (approved, PMA). A empresa e muitos artigos dizem "FDA-approved", o que é tecnicamente errado.
- **Vieses e sham:** quase todos os ECRs centrais foram financiados ou conduzidos pelos fabricantes (HairMax/Lexington, Capillus, iRestore, Theradome). [S] O sham é razoável (aparelho idêntico com LEDs não terapêuticos), mas a luz vermelha visível dificulta o cegamento. Desfecho por fototricograma em área pequena; poucos dados além de 6 meses; ninguém sabe o que acontece quando o usuário para.
- **Diretrizes:** a diretriz europeia S3 de alopecia androgenética (2018) trata LLLT como opção que "pode ser considerada", recomendação fraca. [NV, conferir texto] Não há diretriz formal da AAD para alopecia androgenética que eu tenha verificado. [NV]

**Veredito:** **moderada**. Efeito real e mensurável contra sham, de tamanho comparável ao minoxidil, mas com pesquisa quase toda de fabricante, curta e sem dados de uso real.

**Potencial de widget:** ★★ Dois quadradinhos de 1 cm² de couro cabeludo desenhados com pontos (fios): antes, sham, laser, minoxidil. Os +20 fios aparecem como pontos novos. Estático.

---

## 3. Pele

### 3.1 Acne (luz azul, vermelha, combinada)
- **Cochrane (Barbaric et al. 2016, versão resumida 2018 no Br J Dermatol):** 71 ECRs, 4.211 participantes, **mediana de 31 por estudo**. Luz amarela, infravermelha e outras: "nenhuma mostrou efeito clinicamente significativo". A maior parte da evidência positiva é de terapia fotodinâmica (luz + ácido aminolevulínico), que é outra coisa. Qualidade da evidência baixa a moderada. [V] https://pubmed.ncbi.nlm.nih.gov/28338214/
- **Meta-análise de LEDs, 2023:** SMD de -2,42 para acne com luz azul e vermelha. [V] https://pubmed.ncbi.nlm.nih.gov/36310510/ Um SMD de 2,4 é implausivelmente grande para um tratamento cosmético e sugere estudos pequenos, sem cegamento e com seleção. Usar como exemplo de "meta-análise que promete demais".
- **Meta-análise em rede no Br J Dermatol 2022** (Huang et al.): comparou tratamentos tópicos, orais, físicos e combinados para acne. [V para a existência] https://pubmed.ncbi.nlm.nih.gov/35789996/ A diretriz da AAD para acne (2024) não recomenda luz como tratamento de primeira linha, citando evidência limitada. [NV, conferir texto]

**Veredito:** **fraca**.

### 3.2 Rugas e fotoenvelhecimento
- **O ECR mais citado:** Wunsch & Matuschka 2014 (Photomed Laser Surg), 136 voluntários; 113 tratados com luz policromática (611 a 650 nm ou 570 a 850 nm), 30 sessões, contra **23 controles sem tratamento** (não sham). Melhoras em rugosidade, densidade de colágeno por ultrassom e fotos avaliadas às cegas. Faixa larga não foi melhor que só vermelho. [V] https://pubmed.ncbi.nlm.nih.gov/24286286/
- **Ressalvas:** controle sem sham, grupo controle 5 vezes menor, aparelhos de câmara de corpo inteiro; um dos autores ligado a fabricante de equipamentos de bronzeamento e luz. [S para o vínculo, conferir] Os outros ECRs de LED facial são de 20 a 60 pessoas. [S]
- **FDA:** máscaras e painéis de LED para rugas costumam ser 510(k) de risco baixo (produto "OHS", aparelhos de luz para "tratamento de rugas"). [NV, conferir product code]

**Veredito:** **fraca**. Há sinal, mas nenhum ECR grande, bem cegado e independente.

### 3.3 Feridas
- **Pé diabético:** Li et al. 2018: 7 ECRs, 194 participantes. Área da úlcera reduzida (diferença ponderada 34%, IC 19 a 49) e cicatrização completa OR 6,72 (IC 1,99 a 22,64). [V] https://pubmed.ncbi.nlm.nih.gov/30009935/ IC enorme e n minúsculo: sinal de estudos pequenos.
- **Úlcera venosa (2026):** Rasul et al., 11 ECRs, todos com risco de viés "algumas preocupações" ou alto. Na meta-análise (4 ECRs): **sem diferença** na área (MD 3,77 cm², IC -4,45 a 11,99; I² = 96%). [V] https://pubmed.ncbi.nlm.nih.gov/41889013/
- **Cicatriz e queloide:** as meta-análises de queloide são sobre lasers ablativos ou vasculares (CO2, pulsed dye), não fotobiomodulação. [V para o escopo] https://pubmed.ncbi.nlm.nih.gov/34283306/ PBM sozinho para cicatriz: sem ECR robusto encontrado. [S]

**Veredito:** pé diabético **fraca**; úlcera venosa **contrária/fraca**; cicatriz **sem evidência**.

**Potencial de widget:** ★★ "O que uma meta-análise de pele esconde": um gráfico de pontos com o tamanho de cada ECR de acne (mediana 31) ao lado de um ECR típico de remédio para acne (centenas a milhares). Estático.

---

## 4. Dor musculoesquelética

### 4.1 Dor cervical (Chow 2009, Lancet)
- **Achado:** 16 ECRs, 820 pacientes. Dor aguda: RR 1,69 (1,22 a 2,33) para melhora vs placebo. Crônica: RR 4,05 (2,74 a 5,98). Redução média de **19,86 mm na EVA (IC 10,04 a 29,68)**; no seguimento de 1 a 22 semanas, -22,07 mm (17,42 a 26,72). Efeitos adversos iguais ao placebo. Financiamento declarado: nenhum. [V] https://pubmed.ncbi.nlm.nih.gov/19913903/
- **Ressalvas:** os autores (Chow, Johnson, Lopes-Martins, Bjordal) são do núcleo da WALT (World Association for Laser Therapy), a sociedade que promove a técnica. [S] RR de 4 para uma terapia física é grande demais e sugere estudos pequenos e alguns mal cegados. Não há ECR grande e independente posterior que confirme. [S]

**Veredito:** **moderada**.

### 4.2 Artrose de joelho
- **Stausholm et al. 2019 (BMJ Open):** 22 ECRs com placebo, 1.063 pacientes. Dor: **-14,23 mm EVA (7,31 a 21,14)** no fim do tratamento; com as doses recomendadas pela WALT, -18,71 mm; pico de -31,87 mm (18,18 a 45,56) 2 a 4 semanas depois. Risco de viés classificado como "insignificante". [V] https://pubmed.ncbi.nlm.nih.gov/31662383/
- **Conflito:** dois coautores (Bjordal, Lopes-Martins) são ex-presidentes da WALT; declaram nunca ter recebido dinheiro dela. [V, na declaração de conflito] A análise de "dose recomendada" usa a recomendação da própria WALT, o que pode inflar o efeito (escolha a posteriori). [S]
- **Contra:** NICE NG226 (2022, artrose) lista laser entre terapias que **não devem ser oferecidas** (junto com ultrassom, interferencial e ondas curtas), por evidência insuficiente de benefício. [S, página NICE bloqueou acesso; conferir texto] O próprio abstract de Stausholm abre dizendo que LLLT "não é recomendada nas principais diretrizes de artrose de joelho". [V]
- **Laser-acupuntura (2026):** 13 ECRs, 611 pacientes, **sem efeito** em dor (SMD 0,04, IC -0,36 a 0,45). [V] https://pubmed.ncbi.nlm.nih.gov/41571928/ Ajuda a mostrar que "laser" não é um tratamento único.
- **Umbrella 2025:** certeza moderada para incapacidade em artrose de joelho (eSMD 0,65, IC 0,14 a 1,15). [V] https://pubmed.ncbi.nlm.nih.gov/40770824/

**Veredito:** **moderada, mas contestada**. É o melhor caso para mostrar que meta-análise e diretriz podem discordar.

### 4.3 Tendinopatia
- **Naterstad et al. 2022 (BMJ Open):** tendinopatia de membro inferior e fascite plantar. Dor -13,15 mm (7,82 a 18,48) ao fim; como adição a exercício, -18,15 mm. "Alguma incerteza sobre o tamanho do efeito permanece por ICs largos e falta de ensaios grandes." Mesmo grupo WALT. [V] https://pubmed.ncbi.nlm.nih.gov/36171024/
- Cotovelo de tenista (Bjordal 2008) e ombro (2015): meta-análises antigas positivas com doses "certas". [S] https://pubmed.ncbi.nlm.nih.gov/18510742/

**Veredito:** **fraca a moderada**.

### 4.4 Lombalgia
- **Cochrane (Yousefi-Nooraie 2008):** 6 ECRs; "algum alívio" vs sham a curto e médio prazo, sem diferença em incapacidade; "dados insuficientes para conclusões firmes". [V] https://pubmed.ncbi.nlm.nih.gov/18425909/ A revisão não foi atualizada desde então. [NV para o status atual]
- **Meta-análise 2022 (Chen, Clin Rehabil):** laser em lombalgia crônica. [V para a existência; abstract não disponível na API] https://pubmed.ncbi.nlm.nih.gov/34757882/
- NICE NG59 (lombalgia, 2016): recomenda não oferecer ultrassom, TENS e interferencial; o tratamento a laser também aparece no rol de terapias não recomendadas. [NV, página bloqueada]

**Veredito:** **fraca**.

**Potencial de widget:** ★★★ "Floresta de dor". Forest plot estático com as diferenças em mm na EVA (pescoço -19,9; joelho -14,2; tendão -13,2) e uma faixa sombreada de 10 a 20 mm marcada como "o mínimo que um paciente percebe". Mostra que os efeitos ficam na borda do perceptível. Um rótulo de cor no autor indica "grupo WALT".

---

## 5. Desempenho e recuperação no exercício

- **Dutra et al. 2022:** só ECRs cruzados, duplo-cegos, com placebo; 37 estudos, 586 participantes. **Resistência em exercício monoarticular: SMD 0,27 (0,12 a 0,41)**. Tempo até exaustão no ciclismo: SMD 0,35 (0,10 a 0,59). **Sem efeito** em força, sprint de bicicleta, corrida (tempo até exaustão, contrarrelógio, sprints repetidos) e natação. [V para números; NV para o periódico] https://pubmed.ncbi.nlm.nih.gov/35802348/
- **Li et al. 2024:** 34 ECRs. Resistência SMD 0,31 (0,11 a 0,51); recuperação de força SMD 0,24; creatina quinase -77,6 U/L. Benefício em sedentários e atletas, **nenhum em pessoas fisicamente ativas**, explicação dos autores bastante especulativa. [V] https://pubmed.ncbi.nlm.nih.gov/38758297/
- **Vanin et al. 2018:** 39 ECRs, 861 participantes; qualidade da evidência "muito baixa a moderada". [V] https://pubmed.ncbi.nlm.nih.gov/29090398/
- **Leal-Junior 2015:** +4,12 s no tempo até exaustão e +5,47 repetições. [V] https://pubmed.ncbi.nlm.nih.gov/24249354/
- **Conflito e sham:** boa parte dos ECRs vem do grupo de Ernesto Leal-Junior (Uninove, São Paulo), com aparelhos da Multi Radiance Medical, empresa que também aparece como afiliação de autores e publica material promocional com o pesquisador. [S] Não achei retratações nem acusações de fraude. Em teste de força e repetição, o voluntário que sente calor ou vê luz pode se esforçar mais; vários estudos usam infravermelho (invisível), o que ajuda o cegamento, mas o aparelho ativo às vezes esquenta. [S]

**Veredito:** **fraca**. Efeitos pequenos (SMD ~0,3), restritos a testes de laboratório, nulos nos desfechos que atleta de verdade mede (tempo de prova).

**Potencial de widget:** ★★ Barras horizontais "funciona em qual teste?": seis modalidades, quatro com IC cruzando zero. Estático.

---

## 6. Olhos

### 6.1 DMRI seca (Valeda, LIGHTSITE)
- **LIGHTSITE III (Boyer 2024, Retina):** 100 pacientes, 148 olhos, randomização **2:1 para PBM** (91 olhos PBM vs 54 sham, mITT). Luz de 590, 660 e 850 nm, 9 sessões a cada 4 meses por 24 meses. Aos 13 meses: diferença de 2,4 letras. **O sham também melhorou 3,0 letras** (PBM 5,4). [V] https://pubmed.ncbi.nlm.nih.gov/37972955/
- **24 meses (Jaffe 2026):** desfecho primário atingido aos 21 meses (p = 0,0036). Atrofia geográfica nova: 24,0% sham vs 6,8% PBM (p = 0,007). Autores funcionários ou consultores da LumiThera. [V] https://pubmed.ncbi.nlm.nih.gov/41791029/
- **O que o FDA leu (DEN230083):** De Novo concedida em **4 nov 2024**, classe II (21 CFR 886.5520), para AV entre 20/32 e 20/70. Diferença média aos 13 meses **2,6 letras (p = 0,0548, não significativa)**; aos 21 meses **3,8 letras (IC 1,2 a 6,3)**. No subgrupo de **DMRI precoce, nenhuma diferença** (+0,29 letra aos 24 meses). **"Nenhum paciente não branco recebeu tratamento"**; benefício pode não persistir após parar; olhos com DMRI úmida no outro olho converteram mais no grupo PBM (41,7% vs 25,0%, números pequenos). [V] https://www.accessdata.fda.gov/cdrh_docs/reviews/DEN230083.pdf
- **Tradução:** 5 letras = uma linha da tabela de Snellen. O efeito vs sham é menos de uma linha. A empresa divulga "+5,6 letras", que é a melhora do grupo tratado contra a linha de base, não contra o sham. [V]
- **Regulatório:** De Novo é a via para aparelho novo de risco baixo a moderado sem predicado; é mais exigente que 510(k), mas não é PMA. Exige estudo clínico, mas não dois ensaios pivotais. [S]

**Veredito:** **fraca a moderada**. Um único ECR pivotal, financiado pelo fabricante, efeito menor que uma linha de visão, sham que melhora, população só branca. O sinal em atrofia geográfica é interessante e precisa replicação.

**Potencial de widget:** ★★★ Tabela de Snellen desenhada com uma linha piscando: "isto é 5 letras". Ao lado, as barras: sham +3,0, PBM +5,4 (13 meses). O leitor vê que a maior parte da "melhora" aparece também no sham. Estático com uma animação simples.

### 6.2 Miopia infantil (RLRL, luz vermelha repetida de baixa intensidade)
- **ECR de referência:** Jiang et al. 2022 (Ophthalmology), multicêntrico na China, 264 crianças de 8 a 13 anos. Aparelho de mesa, 650 nm, 3 min, 2 vezes ao dia, 5 dias por semana. Em 12 meses, comprimento axial cresceu **0,13 mm vs 0,38 mm**; diferença **0,26 mm (0,20 a 0,31)** e **-0,59 D (-0,72 a -0,46)**. Sem eventos graves. [V] https://pubmed.ncbi.nlm.nih.gov/34863776/ Controle: óculos comuns, **sem sham**; cegamento só do avaliador.
- **Meta-meta-análise 2025 (Zaabaar):** RLRL 0,55 D (0,46 a 0,65) e -0,25 mm (-0,29 a -0,20) por ano; atropina baixa concentração 0,33 D e -0,14 mm; orto-k -0,47 mm; tempo ao ar livre 0,17 D. [V] https://pubmed.ncbi.nlm.nih.gov/39530399/
- **Rede 2025 (Zheng, Br J Ophthalmol):** 41 ECRs, 6.434 olhos; RLRL ficou em 1º para comprimento axial (-0,31 mm). [V] https://pubmed.ncbi.nlm.nih.gov/40610049/
- **Rebote (2026):** Xie et al., 136 crianças, RLRL vs atropina 1%. Na pausa de 3 meses, olho cresceu mais no grupo RLRL (0,163 vs 0,115 mm); quem aderiu mais teve mais rebote. [V] https://pubmed.ncbi.nlm.nih.gov/41796439/
- **Segurança da retina:**
  - Caso de dano retiniano em menina de 12 anos após RLRL (Liu et al. 2023, JAMA Ophthalmol). [V] https://pubmed.ncbi.nlm.nih.gov/37227712/
  - Ostrin et al. 2024: o aparelho Sky-n1201a entrega 7,2 W/cm² na retina (pupila de 2 mm); limite de exposição para dano fotoquímico atingido em **0,55 a 7 s**, e a sessão dura 180 s. [V] https://pubmed.ncbi.nlm.nih.gov/38180093/
  - Ostrin et al. 2026 (JAMA Ophthalmol), 4 aparelhos: Sky-n1201 e EyeRising atingem o limite ANSI do grupo 1 em **2,8 s e 1,4 s** (pupila 7 mm); o EyeRising é **classe 2M**. O AirDoc (LED difuso) levou 22.761 s. [V] https://pubmed.ncbi.nlm.nih.gov/41642586/
  - **China:** a NMPA reclassificou aparelhos RLRL para **classe III** (anúncio em 2023, vigência 1 jul 2024), restringiu a crianças de 8 anos ou mais e proibiu uso preventivo; um comentário no JAMA Ophthalmol estimou que nenhum aparelho cumpria os requisitos novos. [S] https://www.myopiaprofile.com/articles/tighter-regulation-rlrl-devices-in-china
  - Conflito: Mingguang He, autor sênior de vários ECRs de RLRL, é inventor de patentes e diretor e acionista da Eyerising. [V no ECR de presbiopia de 2026] https://pubmed.ncbi.nlm.nih.gov/42046494/ Confirmar declaração no Jiang 2022. [NV]
- **Ponte com o consumidor:** os mesmos 650 nm que freiam o olho de uma criança, se entregues por laser pontual, chegam ao limite de dano em segundos. Painéis de LED de "red light therapy" vendidos para rosto não são feitos para olhar diretamente, e óculos de proteção vêm na caixa por isso. [S]

**Veredito:** eficácia **moderada** (ECRs grandes, efeito consistente, mas sem sham, quase todos de um grupo com conflito, com rebote); segurança **não resolvida**.

**Potencial de widget:** ★★★ Dois relógios lado a lado: "duração recomendada da sessão: 180 s" e "tempo até o limite de segurança ANSI: 1,4 a 2,8 s" (laser) vs "22.761 s" (LED difuso). Uma barra logarítmica de tempo deixa claro o abismo. É o gráfico mais chocante do ensaio e é estático.

---

## 7. Cérebro

- **Demência / CCL:** Chun et al. 2025, ECR duplo-cego, **26 participantes**, capacete doméstico: MoCA melhorou vs sham, MMSE não. [V] https://pubmed.ncbi.nlm.nih.gov/40939031/ Japão: protocolo de ECR com 30 pacientes (20 ativo, 10 sham) em andamento. [V] https://pubmed.ncbi.nlm.nih.gov/39036627/ Saltmarche 2017: série de casos de 5 pacientes (sem controle). [V] https://pubmed.ncbi.nlm.nih.gov/28186867/
- **O pivotal que sumiu:** o ensaio "Neuro RX Gamma" da Vielight (NCT03484143), 228 pacientes previstos com Alzheimer moderado a grave, aparece como **suspenso**, sem resultados publicados. Os aparelhos da Vielight não são liberados pelo FDA para tratar doença. [S] https://ctv.veeva.com/study/neuro-rx-gamma-pivotal-phase
- **Umbrella 2025:** função cognitiva eSMD 0,49 (0,14 a 0,84), certeza "moderada", mas mistura saudáveis, CCL e demência. [V] https://pubmed.ncbi.nlm.nih.gov/40770824/
- **Depressão:** Seok et al. 2026, 18 estudos, **g = -0,47 (-0,73 a -0,22)**; PBM sistêmico com efeito maior que transcraniano. [V] https://pubmed.ncbi.nlm.nih.gov/41101469/ A revisão de 2019 (Caldieraro & Cassano) apontou estudos pequenos e abertos. [V para existência] https://pubmed.ncbi.nlm.nih.gov/30248638/
- **Traumatismo craniano:** Lee 2025, 17 pacientes em cruzamento. [V] https://pubmed.ncbi.nlm.nih.gov/40485299/ Chan 2024 (Radiology): 17 vs 21 pacientes, desfecho de conectividade em ressonância, análise secundária. [V] https://pubmed.ncbi.nlm.nih.gov/38805733/
- **Problema físico:** só uma fração pequena da luz infravermelha atravessa couro cabeludo e crânio até o córtex; vermelho visível praticamente não chega. [S, detalhar no dossiê de mecanismo]

**Veredito:** demência **fraca**; depressão **fraca**; TCE **fraca**.

**Potencial de widget:** ★★ "Do tamanho de uma sala de aula": cada ECR de cérebro desenhado como um grupo de bonequinhos (26, 30, 17, 38), ao lado do ECR de lecanemabe (1.795 [S]). Estático.

---

## 8. Hormônios e promessas populares

### 8.1 Testosterona e "luz nos testículos"
- Nenhum ECR humano com luz vermelha nos testículos e testosterona como desfecho foi encontrado nesta pesquisa. A evidência citada é de ratos (2013) e de um estudo italiano de 2016 com caixa de luz brilhante (não vermelha) apresentado em congresso. [S] Urologistas lembram que calor nos testículos tende a **reduzir** a espermatogênese. [S] https://www.businessinsider.in/science/health/news/tucker-carlson-says-men-should-try-testicle-tanning-to-boost-testosterone-levels-but-the-science-behind-red-light-therapy-is-flawed/articleshow/90919087.cms
- Busca no PubMed por "red light testosterone" devolve estudos em peixe dourado e jumentos. [V, curiosidade]

**Veredito:** **sem evidência**.

### 8.2 Tireoide (Hashimoto), o estudo brasileiro
- **Höfling et al. 2013 (Lasers Med Sci), USP:** ECR com placebo, 43 pacientes com hipotireoidismo por tireoidite autoimune. 10 sessões de laser 830 nm, 50 mW, **707 J/cm²** (dose alta para "baixa potência"). Levotiroxina suspensa 30 dias depois. Após 9 meses, dose necessária: **38,6 ± 20,2 µg/dia vs 106,9 ± 22,9 µg/dia** no placebo. Anti-TPO menor. [V] https://pubmed.ncbi.nlm.nih.gov/22718472/
- **Seguimento de 6 anos (2018):** dose de levotiroxina ainda menor no grupo laser; anticorpos sem diferença; nódulos iguais (3 vs 3). Grupos relatados como 25 e 18, não 23 e 20 como no ECR original. [V] https://pubmed.ncbi.nlm.nih.gov/30532779/
- **Ressalvas:** um único grupo, um único ECR pequeno, sem replicação independente em 13 anos; dose de levotiroxina é desfecho titulado pelo médico. Nenhuma sociedade de endocrinologia recomenda. [S]

**Veredito:** **fraca** (curiosa, mas isolada).

### 8.3 Sono e melatonina
- **Zhao et al. 2012:** 20 jogadoras de basquete chinesas; luz vermelha de corpo inteiro 30 min por noite por 14 dias; **o "placebo" não recebeu luz nenhuma** (sem sham); o próprio abstract chama o desenho de "coorte". PSQI e melatonina sérica melhoraram. [V] https://pubmed.ncbi.nlm.nih.gov/23182016/ É o estudo que sustenta quase todo o marketing de "luz vermelha à noite melhora o sono".
- **Insônia (2025):** ECR de 30 adultos, PBM transcraniano 810 nm, PSQI -4,6 pontos (IC -7,2 a -2,0) após 3 sessões. [V] https://pubmed.ncbi.nlm.nih.gov/41125953/
- **Nuance que vale contar:** a afirmação plausível é negativa: luz vermelha fraca à noite **suprime menos melatonina** do que luz azul/branca. Isso é diferente de "luz vermelha produz melatonina". [S]

**Veredito:** **fraca**.

### 8.4 Gordura localizada e contorno corporal
- **Jackson et al. 2009 (Erchonia/Zerona):** ECR duplo-cego, 67 voluntários (59 com medida final), 6 sessões em 2 semanas. Soma das circunferências de cintura, quadril e duas coxas: **-3,51 polegadas (8,9 cm) vs -0,68 pol (1,7 cm)**. **Duas semanas depois, o grupo tratado recuperou 0,31 pol.** [V] https://pubmed.ncbi.nlm.nih.gov/20014253/ Tradução: ~7 cm de diferença somando 4 medidas, ou seja, cerca de 1,8 cm por local.
- **Caruso-Davis 2011 (Obes Surg):** 40 pessoas, 8 sessões em 4 semanas; cintura **-0,78 cm vs +1,35 cm** no controle (diferença -2,15 cm). Análise só de quem não variou mais de 1,5 kg de peso. Em células, sem lipólise nem morte de adipócitos. [V] https://pubmed.ncbi.nlm.nih.gov/20393809/
- **Elm et al. 2011:** mesmo aparelho Zerona, 5 pessoas, desenho de meio corpo: **sem redução significativa**; dermatologistas cegos acertaram o lado tratado em 51,1% (acaso). [V] https://pubmed.ncbi.nlm.nih.gov/21384392/
- **FDA:** o Zerona obteve 510(k) em 2010 para "redução de circunferência de cintura, quadril e coxas" (primeiro aparelho do tipo). [NV, conferir número K082609 na base FDA] Liberação para "circunferência", não para "perder gordura".
- **Ressalva:** Jackson e outros autores trabalham para ou com a Erchonia. [S] Fita métrica é desfecho frágil (respiração, retenção de água, posição).

**Veredito:** **fraca**. Efeito de 1 a 2 cm, transitório, financiado pelo fabricante e que não se replicou em estudo independente pequeno.

**Potencial de widget:** ★★ Fita métrica em escala real: 1,8 cm desenhado sobre uma cintura, com a seta de "volta em 2 semanas". Estático.

### 8.5 Celulite
- Estudos de PBM para celulite são pequenos e quase sempre combinam luz com massagem, sucção ou radiofrequência; impossível isolar a luz. [S] Revisões de contorno corporal (2024) tratam LLLT como a modalidade de evidência mais fraca do grupo. [V para existência] https://pubmed.ncbi.nlm.nih.gov/37749418/

**Veredito:** **sem evidência / fraca**.

### 8.6 "Saúde mitocondrial" e longevidade
- Não existe ECR em humanos com desfecho de longevidade, mortalidade, idade biológica validada ou "função mitocondrial" medida de forma clínica. O argumento vem de células (citocromo c oxidase, ATP) e de animais. [S]
- **Umbrella 2025:** a maior síntese recente (15 meta-análises, 204 ECRs, mais de 9.000 participantes) não tem uma única linha sobre envelhecimento, longevidade ou mitocôndria como desfecho. [V] https://pubmed.ncbi.nlm.nih.gov/40770824/

**Veredito:** **sem evidência**.

---

## 9. 2025 a 2026: o que mudou

- **Umbrella review de ECRs (Son et al. 2025, Syst Rev):** 15 meta-análises, 204 ECRs, mais de 9.000 participantes, 35 desfechos em 15 condições. Efeito significativo em 12 desfechos; **certeza moderada só em 5**: síndrome da boca ardente (dor, eSMD -0,92), artrose de joelho (incapacidade, 0,65), fibromialgia (fadiga, 1,25), alopecia androgenética (densidade, 1,32) e função cognitiva (0,49). O resto: certeza baixa ou muito baixa; viés de publicação em alguns. [V] https://pubmed.ncbi.nlm.nih.gov/40770824/ Atenção: não incluiu mucosite oral, provavelmente por recorte de busca.
- **Úlcera venosa 2026:** meta-análise negativa. [V] (ver 3.3)
- **Laser-acupuntura em artrose 2026:** negativa. [V] (ver 4.2)
- **Miopia 2026:** dados de rebote e o teste de 4 aparelhos que estouram o limite de segurança em segundos. [V] (ver 6.2)
- **LIGHTSITE III 24 meses e modelo de custo-efetividade (2026).** [V] https://pubmed.ncbi.nlm.nih.gov/42501959/
- **Mucosite:** ECR multicêntrico de LED intraoral nos EUA (2026), positivo; SUS incorporou o procedimento (2025); CFO quer ampliar na ANS (2025). [V/S]

**Potencial de widget:** ★★★ "Gráfico de bolhas da umbrella": cada desfecho é uma bolha, eixo x = tamanho do efeito, eixo y = certeza (muito baixa a moderada), tamanho = número de ECRs. A mensagem: há muitos efeitos grandes lá embaixo (certeza muito baixa) e poucos no alto. Estático.

---

## 10. Padrões transversais (para o texto)

1. **"Luz vermelha" não é um tratamento, é uma família.** Laser de 660 nm a 1 cm da mucosa, painel de LED de corpo inteiro, capacete infravermelho e laser pontual no olho têm doses que diferem por ordens de grandeza. A MASCC/ISOO só recomenda protocolos específicos, com parâmetros exatos.
2. **Onde há evidência forte, o uso é hospitalar e com dose controlada.** Onde há marketing forte (testosterona, longevidade, gordura), a evidência some.
3. **O problema do sham.** Luz vermelha é visível e alguns aparelhos esquentam; cegar é difícil. Estudos com controle "sem tratamento" (Wunsch, Zhao, Jiang) inflam efeito.
4. **Quem paga.** Alopecia (fabricantes), contorno corporal (Erchonia), DMRI (LumiThera), miopia (Eyerising), esporte (Multi Radiance), dor (WALT). Quase nenhuma indicação tem ECR grande e independente.
5. **Brasil é protagonista.** INCA (mucosite), USP (tireoide), Uninove (esporte). Uma boa história local para o ensaio.
6. **"Liberado pelo FDA" ≠ "aprovado".** 510(k) (alopecia, gordura, rugas, dor) = equivalência a outro aparelho. De Novo (Valeda) = novo aparelho com estudo clínico, risco moderado. Nenhum aparelho de PBM tem PMA, que é a via mais exigente. [S para "nenhum PMA", conferir]

**Potencial de widget:** ★★ "Três selos do FDA": três caixas com o que cada via exige (510(k), De Novo, PMA) e quais produtos de luz vermelha caem em cada uma. Estático.

---

## Pendências para conferir antes de publicar
- Texto exato das recomendações NICE NG226 e NG59 sobre laser (páginas bloquearam acesso automático).
- Número 510(k) do Zerona (2010) e product codes de LED cosmético.
- Diretriz europeia S3 de alopecia (2018) e diretriz de acne da AAD (2024): redação sobre luz.
- Declaração de conflito de M. He no Jiang 2022.
- Status atual da revisão Cochrane de lombalgia (2008) e se a Cochrane CD016068 (mucosite) já publicou resultados.
- Texto da Portaria SAES/MS 3.489/2025 no DOU.
