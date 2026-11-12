# Dopamina, vício e recuperação: a fronteira (2024–nov/2026) e os dados para gráficos

Dossiê de apoio para o ensaio interativo "Como resetar seu sistema de dopamina e superar o vício", que parte do corte do Huberman Lab com a Dra. Anna Lembke (publicado em 10/11/2026). Pesquisa feita em 12/11/2026.

**Escopo deste arquivo:** a camada "o que há de novo" (GLP-1, intervenções digitais, novas medições de dopamina, neuromodulação, psicodélicos, manejo de contingências), mais dados de prevalência e recuperação que rendem bons gráficos. A neurociência clássica (Di Chiara, Solomon-Corbit, D2 de Volkow) fica em outro arquivo.

**Legenda de confiabilidade**
- **[V]**: verificado na fonte primária (abstract, paper ou base de dados oficial lida nesta pesquisa).
- **[S]**: confirmado só em fontes secundárias confiáveis (imprensa, release, resenha) ou em conhecimento consolidado que não reli na fonte nesta sessão.
- **[NV]**: não verificado, ou vindo de fonte fraca. Conferir antes de publicar.

**Como os abstracts foram lidos:** pela API do Europe PMC (`ebi.ac.uk/europepmc/webservices/rest/search`), que devolve o abstract completo. Os números de overdose nos EUA vieram direto da base do CDC (`data.cdc.gov`, conjunto `xkb8-kh2a`), com dados disponíveis até 01/11/2026.

---

## 0. O que a fala da Lembke afirma, e o que este dossiê testa

A transcrição (`transcricao-huberman-lembke-2026.txt`) traz cinco afirmações que dá para conferir com dados:

1. **Escala de dopamina em roedores:** chocolate +55%, sexo +100%, nicotina +150%, metanfetamina +1.000%. É neurociência clássica e fica no outro arquivo.
2. **Mesma via final comum:** redes sociais, apostas e sexo ativariam a mesma via de recompensa das drogas. Ver a seção 3: as novas medições complicam o quadro de "dopamina = prazer".
3. **10 a 14 dias de abstinência aguda, e cerca de 80% se sentem bem melhor na 3ª ou 4ª semana.** O apoio empírico mais próximo é Brown & Schuckit 1988 (seção 6.4): a depressão clínica cai de 42% para 6% em 4 semanas de abstinência de álcool.
4. **30 dias para "resetar".** Os experimentos de abstinência digital com duração de 1 a 6 semanas são o teste mais direto disso (seção 2).
5. **Largar álcool e cigarro juntos dá resultados melhores.** Não está no meu escopo, mas vale conferir no outro arquivo.

---

## 1. GLP-1 (semaglutida, tirzepatida) contra o vício: a maior novidade farmacológica em décadas

### 1.1 Hendershot et al., JAMA Psychiatry, 2025: o primeiro ensaio randomizado de semaglutida em transtorno por uso de álcool (TUA)

- **Achado:** em doses baixas, a semaglutida reduziu o álcool consumido em laboratório, os drinques por dia de consumo e a fissura. Não mudou o número de dias em que a pessoa bebe.
- **Números [V]** (abstract via Europe PMC):
  - **Desenho:** fase 2, duplo-cego, 9 semanas. Foram 48 adultos com TUA que **não buscavam tratamento** (71% mulheres, idade média de 39,9 anos), selecionados entre 504 triados.
  - **Dose:** 0,25 mg/semana por 4 semanas, depois 0,5 mg/semana por 4 semanas, depois 1,0 mg por 1 semana. É uma dose baixa comparada aos 2,4 mg usados para obesidade.
  - **Laboratório:** gramas de álcool consumidas β = −0,48 (IC 95% −0,85 a −0,11; p = 0,01). Pico de alcoolemia no ar expirado β = −0,46 (p = 0,03). Os autores chamam de efeito "médio a grande".
  - **Vida real:** drinques por dia de consumo β = −0,41 (p = 0,04). Fissura semanal β = −0,39 (p = 0,01). Sem efeito em drinques por dia corrido nem em número de dias de consumo.
  - **Cigarro (exploratório):** no subgrupo de fumantes, a redução de cigarros por dia foi maior (β = −0,10; p = 0,005).
- **Fonte:** https://doi.org/10.1001/jamapsychiatry.2024.4789 (online em fev/2025); NCT05520775.
- **Ressalvas:** amostra pequena, curta duração, dose baixa, sem psicoterapia, e participantes com consumo moderado. Um detalhe que conversa com a Lembke: o remédio não fez as pessoas beberem *menos vezes*, mas *menos quando bebem*. É compatível com uma recompensa menor por dose.
- **Potencial de widget:** ★★ "Mesma noite, menos copos". Duas barras, placebo e semaglutida, com drinques por ocasião. Ao lado, mostrar que a frequência não muda.

### 1.2 Klausen et al., The Lancet, 30/04/2026 (SEMALCO): o primeiro ensaio robusto em pacientes que buscam tratamento

- **Achado:** em 26 semanas, a semaglutida em dose cheia, somada à terapia cognitivo-comportamental (TCC), reduziu os dias de consumo pesado bem mais que placebo com TCC.
- **Números [V]** (abstract):
  - **Amostra:** 108 participantes com TUA moderado a grave e obesidade (54 por braço), na Dinamarca. Recrutamento de jun/2023 a fev/2025. 81% completaram.
  - **Dose:** 2,4 mg/semana por via subcutânea.
  - **Dias de consumo pesado (percentual):** −41,1 pontos percentuais no grupo da semaglutida contra −26,4 no placebo. Diferença: **−13,7 pp** (IC −22,0 a −5,4; p = 0,0015).
  - **Em dias por mês [S]** (NIH/EMJ): de cerca de **17 para 5 dias** com semaglutida, contra cerca de **9 dias** com placebo.
  - **Secundários [S]:** álcool total de −1.550 g contra −1.026 g por 30 dias, e drinques por dia de consumo de −3,5 contra −2,1.
- **Fonte:** https://doi.org/10.1016/S0140-6736(26)00305-3 ; protocolo em https://doi.org/10.1136/bmjopen-2024-086454 ; NCT05895643.
- **Ressalvas:**
  - Só pacientes com obesidade, então não dá para separar o efeito sobre o álcool do efeito metabólico ou de perda de peso.
  - Centro único e sem seguimento longo.
  - **O placebo com TCC também melhorou muito**, de 17 para 9 dias. Esse é um ponto pedagógico ótimo para o ensaio.
- **Potencial de widget:** ★★★ "17 → 9 → 5". Um calendário mensal com 17 dias marcados em vermelho. Um slider "TCC + placebo" apaga 8 dias, e "TCC + semaglutida" apaga mais 4. O leitor vê que a terapia sozinha já faz muita coisa.

### 1.3 Schacht et al., American Journal of Psychiatry, 29/07/2026: a semaglutida oral

- **Números [V]:**
  - **Desenho:** 50 adultos com TUA moderado a grave que buscavam tratamento, 8 semanas. Semaglutida oral 3 mg/dia, depois 7 mg/dia.
  - **Desfecho primário falhou:** a fissura provocada por pistas de álcool em laboratório não mudou.
  - **Dias de consumo pesado:** b = −0,580 (IC −1,012 a −0,148).
  - **Drinques por dia de consumo:** b = −1,177.
  - **Fissura no dia a dia:** b = −2,195.
  - **Consequências do álcool:** queda mais rápida, b = −4,618.
  - **Dias de uso de cannabis (exploratório):** b = −1,434. Eram só 11 usuários de cannabis.
- **Fonte:** https://doi.org/10.1176/appi.ajp.20260003 (PMID 42522065).
- **Ressalvas:** amostra pequena e desfecho primário negativo. Não houve perda de peso nessas doses, o que **sugere um efeito não mediado pelo peso**.
- **Potencial de widget:** ★ entra como nota de rodapé no widget 1.2.

### 1.4 Estudos de coorte com prontuários e registros: os números grandes (só associação)

| Estudo | População | Comparação | Resultado | Status |
|---|---|---|---|---|
| Wang, Volkow et al., *Nat Commun*, mai/2024 | 83.825 pessoas com obesidade (replicado em 598.803 com diabetes tipo 2, DM2) | semaglutida contra outros antiobesidade | risco **50–56% menor** de TUA, incidente e recorrente, em 12 meses | [V] https://doi.org/10.1038/s41467-024-48780-6 |
| Lähteenvuo et al., *JAMA Psychiatry*, 2025 (Suécia) | 227.866 pessoas com TUA, seguidas 2006–2023 (mediana de 8,8 anos) | mesma pessoa usando contra sem usar | internação por TUA: semaglutida **aHR 0,64**; liraglutida 0,72. Qualquer transtorno por uso de substâncias: 0,68 | [V] https://doi.org/10.1001/jamapsychiatry.2024.3599 |
| Xie, Choi & Al-Aly, *Nat Med*, jan/2025 (veteranos dos EUA) | 215.970 iniciando GLP-1 | 175 desfechos | menor risco de transtornos por uso de substâncias (álcool, cannabis, estimulantes, opioides) | [V] https://doi.org/10.1038/s41591-024-03412-w |
| Tang, Kranzler et al., *Diabetes Obes Metab*, 03/11/2026 | DM2 na rede TriNetX, 2022–2025 | sema ou tirzepatida contra SGLT2i | internação ou pronto-socorro por TUA: sema **HR 0,54**, tirzepatida **HR 0,61**, sema contra tirzepatida 0,98 | [V] https://doi.org/10.1111/dom.71470 |
| Kennedy, Oslin et al., *J Clin Psychiatry*, jul/2026 | veteranos com DM2 e transtorno por uso de opioides (TUO) | GLP-1 contra insulina ou SGLT2i | overdose por qualquer causa: **HR 0,32** contra insulina e 0,25 contra SGLT2i. **Nulo** contra metformina, sulfonilureia e DPP4 | [V] https://doi.org/10.4088/jcp.25m16212 |
| Taipale et al., *Lancet Psychiatry*, abr/2026 (Suécia) | 95.490 pessoas com depressão ou ansiedade | dentro do mesmo indivíduo | piora de transtorno por uso de substâncias com semaglutida: **aHR 0,53** | [V] https://doi.org/10.1016/S2215-0366(26)00014-3 |

- **Ressalvas:**
  - Confusão por indicação: quem recebe GLP-1 tem mais acesso a cuidado médico.
  - O resultado de Kennedy 2026 mostra o problema: o benefício aparece contra insulina, mas **some contra metformina**.
  - Desfechos "registrados clinicamente" medem internações, não consumo.
- **Potencial de widget:** ★★ "Floresta de razões de risco". Um forest plot com HRs de 0,25 a 1,20. Um botão "escolha o comparador" mostra como o efeito muda com o grupo de controle. Funciona como lição de epidemiologia.

### 1.5 Opioides, nicotina e cannabis: onde ainda não há ensaio que responda

- **Opioides [S]:**
  - Um piloto de liraglutida (Penn State, 2024) teve 20 internados e menos fissura, mas **11 de 20 abandonaram**, em geral por efeitos gastrointestinais.
  - O ensaio NCT06548490 (semaglutida mais buprenorfina ou metadona, n ≈ 200) tem término previsto para 01/11/2026 e ainda **não tem resultado publicado**.
  - Em suma, não existe nenhum ensaio randomizado de eficácia de GLP-1 em TUO até nov/2026.
- **Nicotina [V]:** a meta-análise de Heshmati et al. (*Tob Induc Dis*, jul/2026) reuniu 2 ensaios (n = 337).
  - Cessação: **OR 1,36 (IC 0,55–3,35), não significativo**, com certeza muito baixa.
  - Ganho de peso pós-cessação: cerca de 4 kg a menos.
  - Fonte: https://doi.org/10.18332/tid/219815
  - Conclusão: para cigarro, o GLP-1 hoje é remédio contra o ganho de peso, não contra o vício.
- **Cannabis:**
  - Existe um sinal exploratório em Schacht 2026 (1.3).
  - Wang et al. (*Mol Psychiatry*, 2024) acharam risco cerca de 44% menor de transtorno por uso de cannabis em usuários de semaglutida [S].
- **Fase 3 em andamento:**
  - O VA tem um ensaio de semaglutida em veteranos com TUA (NCT07218354, início em 2026 e fim previsto para 2029) [S].
  - "Brenipatide" (RENEW-ALC-2), descrito como agonista de GLP-1, tem cerca de 1.100 participantes e 56 semanas [S]. O patrocinador não foi confirmado [NV].
- **Potencial de widget:** ★★ "Placar das substâncias". Uma matriz com álcool, opioides, nicotina e cannabis nas linhas e "rato / coorte / ensaio pequeno / ensaio robusto / fase 3" nas colunas. As células acendem conforme o nível de evidência. Só o álcool chega a "ensaio robusto".

### 1.6 O mecanismo: GLP-1 e o circuito da dopamina

- **Pré-clínico [S]** (Jerlhag, Egecioglu et al., 2013 em diante): agonistas de GLP-1 atenuam a liberação de dopamina no núcleo accumbens (NAc) induzida por álcool, nicotina, cocaína e anfetamina, e reduzem a autoadministração. Há receptores GLP-1R na área tegmental ventral (VTA), no NAc e no núcleo do trato solitário.
- **Rato de 2026 [V]:** em ratos msP, que preferem álcool, a semaglutida reduziu o consumo de forma dose-dependente e teve efeito ansiolítico na abstinência (Palmisano et al., *Neuropharmacology*, out/2026). https://doi.org/10.1016/j.neuropharm.2026.111240
- **Humano, de dentro do NAc [V]:** Choi et al. (*Nature Medicine*, 17/11/2025), um caso único.
  - Uma paciente com eletrodos de estimulação cerebral profunda no NAc tomou **tirzepatida**. A "preocupação com comida" sumiu no início e **voltou** depois.
  - Os episódios de retorno vinham precedidos de aumento de potência delta-teta (≤ 7 Hz) no NAc.
  - É a primeira janela eletrofisiológica humana sobre como os incretínicos agem no circuito de recompensa.
  - Fonte: https://doi.org/10.1038/s41591-025-04035-5
- **Exenatida no álcool (Klausen, JCI Insight, 2022) [S]:**
  - Desfecho primário nulo nos dias de consumo pesado no total, mas houve redução no subgrupo com IMC > 30.
  - Na ressonância funcional, houve menor reatividade a pistas de álcool no estriado ventral.
- **Nature, 04/11/2026 (UCSF) [S]:** a descrição de um sinal de dopamina **lento**, do intestino ao cérebro, que ensina camundongos a valorizar alimentos calóricos. Os autores especulam que os GLP-1 reduziriam esse sinal. Não li o paper.
- **Potencial de widget:** ★★★ "O volume da recompensa". Reaproveita a balança prazer-dor da Lembke: um GLP-1 "abaixa o volume" do pico de dopamina. O pico do lado do prazer fica menor, e menos "gremlins" sobem no lado da dor.

### 1.7 "Ruído alimentar" (food noise)

- **Achado:** o termo surgiu no TikTok e no Reddit para descrever pensamentos intrusivos e persistentes sobre comida, que "silenciam" com GLP-1. Em 2026 ele entrou na literatura acadêmica, ainda sem definição consensual.
- **Fontes [V]:**
  - Wylie et al., *Appetite*, set/2026, uma revisão teórica com 5 hipóteses (homeostática, reatividade a pistas, vício em comida, supressão de pensamento, inibição de memória). https://doi.org/10.1016/j.appet.2026.108791
  - Brewis et al., *Appetite*, jul/2026, uma crítica conceitual e ética: há risco de patologizar uma experiência comum. https://doi.org/10.1016/j.appet.2026.108700
- **Ressalvas:** os questionários de ruído alimentar são novos, têm validação limitada e muitas vezes vêm de grupos ligados à indústria.
- **Potencial de widget:** ★★ "Rádio interno". Uma barra de "ruído de fundo" que o leitor arrasta. Serve de ponte para a fissura da Lembke: "querer mais um vídeo" é ruído do mesmo tipo.

---

## 2. Abstinência digital: o "jejum de dopamina" testado em ensaios randomizados

### 2.1 Castelo et al., PNAS Nexus, fev/2025: bloquear a internet móvel por 2 semanas

- **Achado:** bloquear a internet móvel no celular, mantendo ligações, SMS e internet no computador, melhorou bem-estar, saúde mental e atenção sustentada medida de forma objetiva.
- **Números [V]** (texto completo):
  - **Amostra:** 467 participantes (242 na intervenção e 225 na intervenção adiada), de 18 a 74 anos.
  - **Adesão baixa:** 266 instalaram o app e só **119 foram "aderentes"** (bloqueio ativo em pelo menos 10 dos 14 dias). Isso é 25,5% de quem se comprometeu.
  - **Tempo de tela, grupo intervenção:** **314 → 161 → 265 min/dia** (antes, durante, depois). No grupo adiado: 336 → 322 → 190.
  - **Tamanhos de efeito (Cohen dz, intenção de tratar):** bem-estar subjetivo 0,45; saúde mental 0,56; atenção sustentada 0,23. Entre os tratados: 0,50, 0,68 e 0,26. Depressão: dz = 0,56.
  - **91%** melhoraram em pelo menos um desfecho, e 70,5% melhoraram no índice de saúde mental.
  - **Persistência:** os ganhos se mantiveram 2 semanas depois de reconectar.
  - **Comparações da imprensa [S]:** o ganho de atenção "equivale a reverter 10 anos de declínio etário", e o efeito na depressão seria "maior que o de antidepressivos". São enquadramentos dos autores e do release. Tratar com cautela.
- **Fonte:** https://doi.org/10.1093/pnasnexus/pgaf017
- **Ressalvas:**
  - Não há grupo placebo; o controle é a lista de espera.
  - Saúde mental foi autorrelatada, num estudo sem cegamento.
  - Muita gente desistiu, o que favorece um viés de autosseleção.
- **Potencial de widget:** ★★★ "314 → 161 → 265". Linha do tempo das 4 semanas com os dois grupos cruzando, um desenho em cruz que o leitor reconstrói. Um toggle mostra "quem aderiu" contra "quem tentou".

### 2.2 Desativar Facebook e Instagram (Allcott, Gentzkow et al.)

- **Allcott et al. (*AER*, 2020) [S]:**
  - Desativar o Facebook por 4 semanas antes das eleições de meio de mandato de 2018 (n ≈ 2.700) liberou cerca de 1 h/dia.
  - Elevou o bem-estar subjetivo em cerca de 0,09 desvio-padrão (DP).
  - Reduziu o uso do Facebook depois do experimento e diminuiu a polarização.
- **Eleição de 2020, parte política (*PNAS*, 13/05/2024) [V]:** 19.857 usuários do Facebook e 15.585 do Instagram desativaram por 6 semanas. Os efeitos em polarização e participação foram próximos de zero.
  - https://doi.org/10.1073/pnas.2321584121
- **Eleição de 2020, estado emocional (NBER w33697, abr/2025) [S]:**
  - Facebook: **+0,060 DP** num índice de felicidade, depressão e ansiedade. Efeito concentrado em quem tem mais de 35 anos.
  - Instagram: **+0,041 DP**. Efeito concentrado em mulheres com menos de 25 anos.
  - Ainda é working paper. https://www.nber.org/papers/w33697
- **Ressalvas:**
  - Os efeitos são reais, mas pequenos: algo como 1/10 do efeito do bloqueio total da internet móvel em Castelo.
  - Há duas explicações possíveis: tirar um app é pouco, ou quem desativa compensa em outros apps.
- **Potencial de widget:** ★★★ "Régua de tamanhos de efeito". Uma única régua de 0 a 0,7 DP com Instagram 0,04, Facebook 0,06, Facebook em 2018 0,09, meta-análise 0,16 e bloqueio total da internet móvel 0,45–0,56. Isso deixa visível que **o quanto você corta importa**.

### 2.3 Meta-análises: quanto tempo de abstinência?

- **Ferguson (2024, *Psychol Pop Media*) [S]:** 27 experimentos e efeito agregado indistinguível de zero.
- **Reanálise de Thrul et al. (2025) [V]:**
  - Separaram os estudos pela duração da intervenção.
  - Menos de 1 semana: d = **−0,175** (piora).
  - 1 semana ou mais: d = **+0,156** (melhora).
  - Relação quadrática, com **ótimo perto de 3 semanas**.
  - https://doi.org/10.1037/ppm0000574
- **Lemahieu et al. (*Sci Rep*, mar/2025) [V]:** 10 estudos (N = 4.674) e nenhum efeito significativo em afeto positivo, afeto negativo ou satisfação com a vida. https://doi.org/10.1038/s41598-025-90984-3
- **Leitura para o ensaio:** a curva de Thrul é quase uma ilustração direta do modelo da Lembke. Nos primeiros dias vem a "abstinência", e a pessoa piora. Depois de cerca de 1 semana, ela melhora. O "ótimo de cerca de 3 semanas" bate com as "3 a 4 semanas" da Lembke. Mas o resultado é frágil: veio de uma reanálise com 19 estudos.
- **Potencial de widget:** ★★★ "A curva em J da abstinência". O eixo x vai de dias a semanas, o y é o efeito na saúde mental. Abaixo de 7 dias a curva fica negativa, depois sobe, com pico perto de 21 dias. Pode ser sobreposto à "balança" da Lembke.

### 2.4 Celular proibido nas escolas: os resultados de 2025 e 2026

- **Allcott, Baron, Dee, Duckworth, Gentzkow & Jacob, NBER w35132 (mai/2026) [S]:** a maior avaliação já feita, sobre bolsas com trava (tipo Yondr). Cobriu cerca de 4.600 a 5.000 escolas com bolsas, num painel de mais de 41 mil escolas entre 2018 e 2025.
  - **Uso de celular na escola:** cerca de 30% menos sinais de celular (pings de GPS) no 3º ano.
  - **Notas:** efeito "consistentemente próximo de zero". Houve leve alta em matemática no ensino médio.
  - **Bem-estar:** **piora no 1º ano e melhora no 3º**, uma curva em J de novo.
  - **Sem efeito** em frequência, atenção autorrelatada e cyberbullying.
  - https://www.nber.org/papers/w35132
- **Goodyear et al. (SMART Schools, *Lancet Reg Health Eur*, fev/2025) [S]:** estudo transversal com 1.227 alunos em 30 escolas inglesas. Escolas restritivas e permissivas não diferiram em bem-estar, sono ou notas. Mas **mais tempo de tela, em qualquer escola, se associa a pior bem-estar**. https://doi.org/10.1016/j.lanepe.2025.101211
- **Brasil, Lei 15.100/2025 [S]:** a pesquisa do MEC, divulgada em 30/06/2026, ouviu 8.189 gestores.
  - 92% das escolas aderiram.
  - A restrição em todos os espaços, recreio incluído, subiu de 20% para 48%.
  - Os gestores relatam mais concentração e menos ansiedade, mas é **percepção de gestor, não medida**.
  - 62% das escolas guardam o celular na mochila do próprio aluno.
  - https://agenciabrasil.ebc.com.br/educacao/noticia/2026-06/lei-que-restringe-uso-de-celulares-ja-e-adotada-por-92-das-escolas
- **Potencial de widget:** ★★ "A curva em J da escola". Bem-estar no ano 1, 2 e 3 depois da proibição, colocado ao lado da curva em J individual da seção 2.3. O padrão "primeiro piora, depois melhora" se repete em escalas diferentes.

### 2.5 Regulação de 2025 e 2026: o "design viciante" vai ao tribunal

- **Austrália, proibição para menores de 16 anos (em vigor desde 10/12/2025) [S]:**
  - Cerca de **4,7 milhões** de contas foram removidas ou restringidas na primeira metade de dezembro, e mais 300 mil até março.
  - Avaliação de 3 meses do eSafety (jul/2026): a parcela de menores de 16 com conta caiu de **52,4% para 42,1%**.
  - Relatório de ago/2026: mais de 8 em cada 10 continuam usando redes sociais.
  - https://www.esafety.gov.au/sites/default/files/2026-07/Early-days-early-insights-SMMA-evaluation-three-months-July-2026.pdf (o PDF deu timeout aqui; números vindos da imprensa)
- **EUA, primeiro júri sobre "vício em redes" [S]:**
  - Em 25/03/2026, um júri de Los Angeles considerou **Meta e Google negligentes** no design (KGM, caso-piloto), com placar de 10 a 2.
  - Indenização compensatória de pelo menos US$ 2,1 milhões (Meta) e US$ 0,9 milhão (Google). Os valores totais divergem entre fontes.
  - TikTok e Snap fizeram acordo antes do julgamento.
  - No Novo México, outro júri condenou a Meta a pagar **US$ 375 milhões** por enganar adolescentes.
  - Há cerca de 2.000 ações pendentes, mais de 1.000 delas movidas por distritos escolares.
  - https://www.npr.org/2026/03/25/nx-s1-5746125
- **União Europeia, Lei de Serviços Digitais (DSA) [S]:**
  - Em 06/02/2026, a Comissão Europeia concluiu de forma **preliminar** que o design do TikTok (rolagem infinita, autoplay, notificações push, recomendação personalizada) viola a DSA.
  - A multa pode chegar a 6% do faturamento global. A decisão ainda não é final.
  - https://digital-strategy.ec.europa.eu/en/news/commission-preliminarily-finds-tiktoks-addictive-design-breach-digital-services-act
- **Brasil:** o ECA Digital (Lei 15.211/2025) inclui verificação de idade e veto a loot boxes para menores [NV: conferir datas e vigência].
- **Potencial de widget:** ★★ "Mapa-múndi do design viciante". Uma linha do tempo de 2024 a 2026 com marcos (Austrália, LA, Novo México, DSA, Brasil) e um ícone para cada recurso visado (rolagem infinita, autoplay, notificação).

### 2.6 O debate sobre a qualidade da evidência: Haidt contra Odgers, Orben e Przybylski

- **Haidt (*The Anxious Generation*, 2024):** os smartphones mais as redes sociais, a partir de 2010–2012, causaram a crise de saúde mental adolescente. Ele invoca experimentos, quase-experimentos e o "momento" da virada.
- **Odgers (*Nature*, mar/2024), resenha [S]:** "centenas de pesquisadores procuraram os grandes efeitos e acharam associações nulas, pequenas ou mistas". A crítica: correlação, causalidade reversa, "pânico moral".
- **Orben & Przybylski (*Nat Hum Behav*, 2019) [S]:** o uso de tecnologia explica no máximo **cerca de 0,4%** da variância do bem-estar adolescente, algo da ordem de "comer batata". Usar óculos tem associação mais negativa.
- **Situação em 2026:** os dados novos são mistos.
  - O RCT de Castelo mostra efeito grande para **bloqueio total**.
  - As desativações de apps isolados mostram efeitos pequenos (0,04–0,09 DP).
  - As proibições escolares mostram efeitos nulos ou tardios.
  - Uma leitura conciliadora é que o efeito depende da **dose de corte** e da **substituição**: tirar um app e migrar para outro não muda nada.
- **Potencial de widget:** ★★ "Quem tem razão?". Um "medidor de evidência" com 3 pesos (correlacional, experimental, quase-experimental) que o leitor ajusta, e as conclusões mudam conforme o peso.

---

## 3. Medir a dopamina: o que mudou na visão "dopamina = prazer"

### 3.1 Dopamina medida em humanos em tempo real (voltametria cíclica de varredura rápida, FSCV)

- **Contexto:** a Lembke diz que "em humanos não colocamos uma sonda no accumbens". Isso é *quase* verdade. Desde 2011, o grupo de Montague e Kishida mede dopamina com resolução abaixo de 1 segundo em pacientes acordados durante cirurgias de estimulação cerebral profunda (Parkinson, tremor, depressão).
- **Trabalhos de 2025 e 2026 [V]:**
  - Sadibolova, …, Kishida & Terhune (*Brain*, set/2026): no núcleo caudado de 5 pacientes com Parkinson, um pico fásico de dopamina 625–670 ms depois do estímulo enviesou o julgamento de tempo. Dopamina e serotonina foram registradas juntas, a 10 Hz. https://doi.org/10.1093/brain/awag336
  - Shevlin et al. (preprint, dez/2025): na estimulação cerebral profunda para depressão (cíngulo subcaloso), os transientes de dopamina e serotonina previram a remissão em 6 meses. https://doi.org/10.64898/2025.11.28.691184
  - DiMarco, …, Kishida (preprint, jul/2025): a dopamina estriatal humana acompanha o *erro* temporal durante o aprendizado com recompensa monetária.
- **Ressalvas:** os pacientes são neurológicos, com eletrodos no caudado ou putâmen, não no accumbens, e as amostras têm de 5 a 20 pessoas. Ninguém mediu dopamina humana subsegundo durante um uso de droga ou de rede social.
- **Potencial de widget:** ★★ "Sonda dentro do cérebro". Traçado animado de dopamina a 10 Hz (curva estilizada) sincronizado com um estímulo na tela.

### 3.2 Sensores fluorescentes (GRAB-DA, dLight) e a dopamina vista no espaço

- **Contexto [S]:** os sensores GRAB-DA (laboratório de Yulong Li, desde 2018) e dLight (Tian e Patriarchi, 2018) são receptores de dopamina modificados que brilham quando se ligam à molécula. Permitem ver a dopamina em camundongos que se comportam livremente, com resolução de subsegundos e de célula.
- **Novidades [V]:**
  - O HaloDA1.0 (Zheng et al., preprint, dez/2024) é um sensor no vermelho distante que permite imagem multiplex com outros neuromoduladores.
  - Ressalva técnica importante (López, …, Li, Kaeser, preprint, nov/2024): sensores de noradrenalina e dopamina **se ativam cruzado** onde a inervação é densa.
- **Kang, …, Jeong, Namboodiri & Berke (preprint, set/2026) [V]:**
  - Com imagem de dois fótons, o núcleo do accumbens tem um **gradiente espacial**.
  - Na parte posterior, a dopamina sobe tanto com recompensa quanto com estímulo aversivo.
  - Na parte anterior, a dopamina **cai** com o aversivo e tem tônus mais alto, amplificado pela cocaína.
  - Os autores concluem que nenhuma das duas regiões corresponde ao erro de previsão de recompensa (RPE) canônico.
  - https://doi.org/10.64898/2026.09.23.753606
- **Potencial de widget:** ★★★ "O accumbens não é um ponto". Um mapa 2D do accumbens que muda de cor do posterior ao anterior. O leitor escolhe "recompensa", "choque" ou "cocaína" e vê a região responder de forma diferente. Isso desmonta a ideia de uma "taxa de dopamina" única.

### 3.3 O debate teórico: erro de previsão de recompensa (RPE), aprendizado retrospectivo (ANCCR), rampas e distribuições

- **Jeong et al. (*Science*, 2022) [S]:** propuseram o **ANCCR**, em que a dopamina sinalizaria causalidade *retrospectiva* ("o que causou esta recompensa?"). Foi o desafio mais forte ao RPE de Schultz em 25 anos.
- **Contra-ataque de Qian, …, Gershman & Uchida (*Nat Neurosci*, mar/2025) [V]:**
  - Num teste de degradação de contingência, os dados **conflitam com o ANCCR**.
  - São explicados por aprendizado por diferença temporal (TD) com uma representação adequada do intervalo entre tentativas.
  - https://doi.org/10.1038/s41593-025-01915-4
- **Rampas de dopamina (Floeder, Jeong, Mohebi & Namboodiri, *eLife*, ago/2025) [V]:** as rampas só aparecem quando o intervalo entre tentativas é curto em relação à tentativa. https://doi.org/10.7554/elife.98666
- **Sousa, …, Paton (*Nature*, jun/2025) [V]:**
  - Os neurônios dopaminérgicos codificam um **mapa probabilístico 2D** de recompensas futuras, cruzando *quando* e *quanto* ("RL distribucional tempo-magnitude").
  - Esse mapa sai de apenas 450 ms de resposta da população.
  - https://doi.org/10.1038/s41586-025-09089-6
- **Jeong et al. (preprint, jan/2026) [V]:**
  - Apresentar a **recompensa sem a pista** ("extinção retrospectiva") apaga de fato a memória associativa.
  - A extinção clássica, que apresenta a pista sem recompensa, só suprime o comportamento, que volta depois.
  - A dopamina no momento do desfecho é necessária para isso.
  - Implicação direta para recaída: https://doi.org/10.64898/2026.01.17.700100
- **Síntese para o ensaio:**
  - Em 2026, ninguém sério diz que "dopamina = prazer". O "gostar" é mais opioide e endocanabinoide (Berridge), e a própria Lembke cita a "sinfonia de neuromoduladores".
  - A disputa é entre "dopamina = erro de previsão (TD/RPE)" e "dopamina = sinal causal ou retrospectivo". Todos os lados concordam que a dopamina é sinal de **aprendizado e motivação**, não de felicidade.
  - A "balança" da Lembke continua sendo uma metáfora clínica útil, mas é uma metáfora.
- **Potencial de widget:** ★★★ "Ensine um macaco". Uma simulação TD interativa: pista → recompensa. O pico de dopamina migra da recompensa para a pista ao longo das tentativas, e se a recompensa falta, aparece o "vale". Depois, o botão "recompensa sem pista" mostra o caso que o ANCCR e o TD explicam de jeitos diferentes.

---

## 4. Tratamentos na fronteira

### 4.1 Estimulação magnética transcraniana (TMS) para tabagismo: a única neuromodulação aprovada pela FDA contra vício

- **Zangen et al. (*World Psychiatry*, 2021) [V]:**
  - Ensaio multicêntrico com 262 fumantes; 68% já tinham tentado parar pelo menos 3 vezes.
  - TMS profunda (bobina H4) no córtex pré-frontal lateral e na ínsula, depois de expor a pistas de fissura. Foram 3 semanas diárias e 3 semanas semanais.
  - Taxa de abandono contínuo por 4 semanas (até a semana 18): **19,4% com TMS ativa contra 8,7% com simulação** (intenção de tratar). Entre quem completou: 28,0% contra 11,7%.
  - Levou à liberação da FDA em ago/2020.
  - https://doi.org/10.1002/wps.20905
- **TMS na ínsula mais vareniclina (Ibrahim et al., *Brain Stim*, 2023) [V]:** abstinência de 82,4% contra 30,7% na semana 12 (n = 42). **Sem diferença em 6 meses.**
- **Potencial de widget:** ★★ "19 contra 9". Um pictograma com 100 fumantes de cada lado.

### 4.2 Ultrassom focado no núcleo accumbens (WVU, Rezai)

- **Rezai et al. (*Biol Psychiatry*, jan/2025) [V]:**
  - Estudo aberto, braço único, com **8 participantes** com transtorno grave por uso de opioides e outras substâncias.
  - 20 minutos de ultrassom focado de baixa intensidade (220 kHz) nos dois accumbens, com seguimento de 90 dias.
  - Sem eventos adversos graves.
  - Imprensa e EPFL [S]: fissura **91% menor** em 90 dias e menor conectividade do accumbens com redes de recompensa.
  - https://doi.org/10.1016/j.biopsych.2025.01.001
- **Caso de metanfetamina (Mahoney et al., 2025) [V]:** fissura de 9/10 → 0/10 por 90 dias e exames de urina negativos. É um único paciente.
- **Banho de água fria pré-clínico (Martin et al., preprint, out/2026) [V]:**
  - Em ratos (n = 76), 3 esquemas de ultrassom focado guiado por ressonância no accumbens **não reduziram** a motivação por fentanil oral.
  - A inativação química do accumbens reduziu, o que confirma que o alvo está certo e o problema são os parâmetros.
  - https://doi.org/10.64898/2026.10.17.759605
- **Ressalvas:** nenhum ensaio randomizado com simulação foi publicado até nov/2026. Há ensaios em andamento na WVU e em Taiwan (NCT07734623).
- **Potencial de widget:** ★ "N = 8". Um aviso visual sobre estudos sem grupo controle: o leitor vê 8 bonequinhos e uma seta de "regressão à média".

### 4.3 Psicodélicos (psilocibina) para alcoolismo

- **Bogenschutz et al. (*JAMA Psychiatry*, 2022) [S]:**
  - 95 participantes randomizados, 2 sessões de psilocibina contra difenidramina (placebo ativo), mais 12 semanas de psicoterapia.
  - Percentual de dias de consumo pesado nas semanas 5 a 36: **9,7% contra 23,6%**, uma diferença de cerca de 14 pontos.
  - Desenho em https://doi.org/10.1016/j.cct.2022.106976
- **Extensão aberta (Pagni et al., *Drug Alcohol Depend*, out/2026) [V]:**
  - 59 participantes receberam uma dose aberta de psilocibina.
  - Quem chegou abstinente se manteve em remissão.
  - Quem ainda bebia pesado teve redução **transitória** no mês 1, que voltou ao nível de entrada nos meses 2 a 4.
  - https://doi.org/10.1016/j.drugalcdep.2026.113387
- **Luquiens et al. (*Addiction*, 2025) [V]:** ensaio de viabilidade na França, com 30 pacientes que tinham TUA grave e depressão (25 mg contra 1 mg). Viável.
- **Ressalvas:** o cegamento quase sempre falha, porque o participante sabe se tomou psilocibina. Os efeitos dependem muito da psicoterapia junto, e a duração do efeito é incerta.
- **Potencial de widget:** ★★ "A queda e o rebote". As curvas de dias de consumo pesado no ensaio duplo-cego (efeito longo) contra a extensão aberta (efeito que some em 2 meses).

### 4.4 Manejo de contingências (CM): o tratamento mais eficaz para estimulantes, e o menos usado

- **Bolívar et al. (*JAMA Psychiatry*, 2021) [V]:**
  - 74 relatos com 10.444 pacientes em tratamento com medicação para opioides.
  - Efeito do CM: **estimulantes d = 0,70**; cigarro d = 0,78; opioides ilícitos d = 0,58; adesão à medicação d = 0,75; abstinência no geral d = 0,58.
  - https://doi.org/10.1001/jamapsychiatry.2021.1969
- **Pfund et al. (*Clin Psychol Sci Pract*, 2022) [V]:** pelos critérios de Tolin, abstinência ao fim do tratamento d = 0,54, mas **no seguimento d = 0,08**. O efeito cai muito quando o incentivo acaba. Mesmo assim, recebeu recomendação "forte".
- **CM para uso combinado de estimulantes e opioides (Jegede et al., *J Addict Med*, mai/2026) [V]:**
  - 26 ensaios com 2.356 participantes.
  - Urina negativa: OR 2,46.
  - Abstinência contínua: +1,42 semana.
  - **Nenhum** ensaio mediu fentanil.
  - https://doi.org/10.1097/adm.0000000000001708
- **CM para álcool (Alessi et al., 2025) [V]:** 29 estudos. Amostras negativas OR 3,07 e dias sem álcool OR 3,97.
- **Ligação com a Lembke:** CM é literalmente pôr um peso (uma recompensa pequena e previsível) do lado do prazer da balança, em troca de não usar. Para estimulantes, para os quais **não existe remédio aprovado**, é a melhor ferramenta disponível.
- **Potencial de widget:** ★★★ "O vale-recompensa". O leitor "recebe" fichas por urina negativa num esquema crescente (a cada semana o valor sobe e zera se houver uso). Depois vê a curva do efeito despencando quando as fichas acabam (d de 0,54 para 0,08).

### 4.5 Naltrexona e o "método Sinclair"

- **Achado:** a naltrexona bloqueia o receptor opioide μ e reduz o "gostar" do álcool. O método Sinclair propõe tomá-la **1 hora antes de beber**, sempre, para "extinguir" o reforço aos poucos.
- **Evidência [S]:**
  - O ensaio COMBINE (2006) e a meta-análise de Jonas et al. (*JAMA*, 2014) confirmam a naltrexona diária. O número necessário para tratar (NNT) para evitar o retorno ao consumo pesado fica em torno de 12; os números são de memória, conferir.
  - Kranzler et al. (2009) testaram a naltrexona "direcionada" em 150 bebedores-problema, com redução maior que placebo.
  - Na Europa, o nalmefeno sob demanda foi aprovado pela EMA em 2013.
  - **Não existe meta-análise específica** do protocolo Sinclair contra a naltrexona diária [NV].
- **Potencial de widget:** ★ "Beber com o freio puxado". Uma animação conceitual de extinção: a cada dose bloqueada, a "força" da associação cai.

---

## 5. Prevalência e epidemiologia (séries prontas para gráficos)

### 5.1 Overdoses nos EUA: a maior queda já registrada [V]

Fonte primária: CDC/NCHS VSRR, conjunto `xkb8-kh2a` em data.cdc.gov, com dados disponíveis em 01/11/2026. Os números são **mortes previstas em 12 meses móveis**.

**Totais anuais (12 meses terminando em dezembro):**

| Ano | Mortes previstas |
|---|---|
| 2015 | 53.053 |
| 2016 | 64.557 |
| 2017 | 71.193 |
| 2018 | 68.313 |
| 2019 | 71.740 |
| 2020 | 93.129 |
| 2021 | 108.553 |
| 2022 | 110.393 |
| 2023 | 107.966 |
| 2024 | 81.313 |
| 2025 | 70.735 |
| **12 meses até jun/2026** | **65.724** |

- **Pico:** 112.418 nos 12 meses até **ago/2023**.
- **Queda do pico a jun/2026:** **−41,5%**, cerca de 46.700 mortes a menos por ano. É o menor patamar desde cerca de 2016.
- **Por droga, contagens registradas** (dez de cada ano → jun/2026):
  - **Opioides sintéticos (fentanil, T40.4):** 9.683 (2015) → 75.453 (2022) → 74.792 (2023) → 48.913 (2024) → 38.506 (2025) → **33.876 (jun/2026)**.
  - **Psicoestimulantes (metanfetamina, T43.6):** 5.835 → 36.416 (2023) → 26.315 (2025) → 24.111.
  - **Cocaína (T40.5):** 6.894 → 30.205 (2023) → 19.953 (2025) → 18.994.
- **Exceções:** Novo México, Arizona e Colorado subiram 10% ou mais em 2025 contra 2024 [V, release do NCHS de 13/05/2026]. https://www.cdc.gov/nchs/pressroom/releases/20260513.html
- **Ressalvas:**
  - Os dados são provisórios; os valores "previstos" corrigem atrasos de notificação.
  - As causas da queda são debatidas: naloxona, mudança na oferta (fentanil menos puro, xilazina), coortes de usuários que já morreram, buprenorfina. Não há consenso [S].
- **Potencial de widget:** ★★★ "A montanha e a descida". Linha mensal de 2015 a jun/2026 com áreas empilhadas por droga. O leitor arrasta o cursor e vê "X vidas a menos por ano". Pode ter uma anotação "pico: ago/2023".

### 5.2 Carga global (OMS e GBD)

- **Relatório global da OMS sobre álcool, saúde e tratamento de transtornos por uso de substâncias (25/06/2024; dados de 2019) [S]:**
  - **2,6 milhões de mortes** atribuíveis ao álcool, 4,7% de todas as mortes.
  - Cerca de **600 mil mortes** por drogas psicoativas.
  - Cerca de **400 milhões** de pessoas vivem com transtornos por uso de álcool ou drogas, 209 milhões delas com dependência de álcool.
  - A maior proporção de mortes por álcool está na faixa de 20 a 39 anos (13%).
  - https://www.paho.org/en/news/25-6-2024-over-3-million-annual-deaths-due-alcohol-and-drug-use-majority-among-men
- **GBD 2023 (*Lancet*, out/2025) [S]:**
  - Entre 2010 e 2023, a taxa de anos de vida perdidos ajustados por incapacidade (DALYs) atribuíveis a uso de drogas subiu cerca de 9%.
  - O álcool subiu do 14º para o 11º lugar entre os fatores de risco por DALY.
  - Na América do Norte de alta renda, houve o maior aumento de mortes entre 20 e 39 anos (suicídio, overdose e álcool).
  - Não achei o total global de mortes por álcool e drogas em 2023 [NV].
- **Potencial de widget:** ★★ "3 milhões". Um contador de 2,6 milhões mais 0,6 milhão de mortes por ano convertido em "uma a cada X segundos" (≈ 10,5 s).

### 5.3 Cigarro em queda, vape estagnado, e o Brasil indo na contramão

- **EUA, jovens (NYTS 2025, Park-Lee et al., *Pediatrics*, 2026) [S]:**
  - 5,2% dos alunos do 6º ano do fundamental ao 3º do médio usaram cigarro eletrônico nos últimos 30 dias, cerca de 1,44 milhão de estudantes.
  - Variação anual de **−18,1%** de 2022 a 2025, mas **sem queda de 2024 para 2025**.
  - Mais de 40% dos usuários vaporizam em 20 ou mais dos 30 dias.
  - https://www.fda.gov/tobacco-products/ctp-newsroom/national-youth-tobacco-survey-fda-publishes-peer-reviewed-journal-article-releases-2025-findings
- **Brasil, Vigitel [S]:**
  - Fumantes adultos nas capitais: **15,7% (2006) → 9,3% (2023) → 11,6% (2024)**.
  - É a **primeira alta em cerca de 20 anos** (+25% em um ano).
  - Mulheres: 7,2% → 9,8%.
  - Jovens de 18 a 24 anos: 7,4% (2019) → 10,1% (2024), recorde da série.
  - Cigarro eletrônico, uso diário ou ocasional: cerca de 2,1–2,4% → 2,6%, **apesar de a venda ser proibida**.
  - Os números de 2023 variam entre 8,6% e 9,3% conforme o recorte [conferir no relatório Vigitel 2006–2024: https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/vigitel/vigitel-brasil-2006-2024.pdf].
- **Potencial de widget:** ★★★ "O fim da curva do cigarro?". A série do Vigitel de 2006 a 2024 cai 18 anos seguidos e depois dá um "soluço" em 2024. Um toggle sobrepõe a faixa de 18 a 24 anos e o vape.

### 5.4 O boom das apostas esportivas nos EUA depois de 2018 e os danos medidos

- **Volume apostado [V]** (Yeola, …, Ayers, *JAMA Intern Med*, abr/2025):
  - Estados com casas de apostas operando: 1 (2017) → 38 (2024).
  - Total apostado: **US$ 4,9 bi (2017) → US$ 121,1 bi (2023)**, com 94% online em 2023.
  - Buscas por ajuda para vício em jogo: **+23%** no país depois da decisão Murphy contra NCAA. Por estado: Pensilvânia +50%, Massachusetts +47%, Nova York +37%, Nova Jersey +34%.
  - https://doi.org/10.1001/jamainternmed.2024.8193
- **Volume apostado em 2025 [S]** (rastreador da AGA): **US$ 166,9 bi** (+11%), com receita bruta de US$ 16,96 bi (+22,8%). No 1º tri de 2026, o volume caiu cerca de 2%, a primeira queda trimestral da série, ligada ao avanço dos mercados de previsão.
- **Finanças domésticas:**
  - Hollenbeck, Larsen & Proserpio (SSRN 4903302, revisado em fev/2026) [S]: o score de crédito médio cai cerca de 0,3% (cerca de 3 vezes mais com aposta online). As **falências sobem cerca de 25–30%** 4 anos depois da legalização. Working paper.
  - Baker et al. (Northwestern, 2024) [S]: cada US$ 1 apostado online corresponde a cerca de US$ 2 a menos investidos em ações.
  - Contraponto do PPI (2025) [S]: sem diferença agregada em falências.
- **Saúde mental [V]** (Westermeyer, Eisenberg & Meiselbach, *JAMA Psychiatry*, 14/10/2026):
  - Diferenças-em-diferenças escalonadas com 62 milhões de pessoas-ano de planos de saúde de empresas.
  - Legalizar a aposta online elevou o uso de **antidepressivos** (homens +0,57 pp, mulheres +1,08 pp), de ansiolíticos e de diagnósticos ambulatoriais de depressão e ansiedade.
  - **Sem mudança** nos indicadores de transtorno por uso de substâncias.
  - https://doi.org/10.1001/jamapsychiatry.2026.3175
- **Ontário, Canadá: séries interrompidas de alta qualidade [V]:**
  - **Linha de ajuda** (Forrest et al., *CMAJ*, mar/2026): contatos sobre jogo por milhão de pessoas por mês foram **13,4 → 17,0** (depois do PlayOLG em 2015) **→ 26,2** (depois da privatização com aposta esportiva em abr/2022). Isso dá **+198%** contra o cenário contrafactual em set/2025. https://doi.org/10.1503/cmaj.251894
  - **Pronto-socorro** (Forrest et al., *AJPM*, set/2026): sobe **7% por trimestre** depois da liberalização. Em abr–jun/2025, o nível era **+99%** no geral e **+154% em homens**. https://doi.org/10.1016/j.amepre.2026.108551
- **Linhas de ajuda dos EUA [S]:** Flórida +138% desde 2023, Ohio +55% em 2023. Ressalva do NCPG: o volume de ligações não serve como medida de prevalência, porque a propaganda do número também gera ligações.
- **Potencial de widget:** ★★★ "Murphy contra NCAA, o antes e o depois". Um painel duplo com o volume apostado de 2017 a 2025 (US$ 4,9 bi → US$ 167 bi) e, sincronizada, a série de Ontário da linha de ajuda e do pronto-socorro com a linha vertical da liberalização. É o melhor "dose-resposta populacional" do dossiê.

### 5.5 Brasil: a crise das "bets"

- **Nota técnica do Banco Central (24/09/2024) [S]:**
  - Em agosto de 2024, **5 milhões** de beneficiários do Bolsa Família enviaram **R$ 3 bilhões** por Pix a sites de apostas, com média de cerca de R$ 100 por pessoa.
  - O total do país foi estimado em **R$ 18–21 bilhões por mês**.
  - Ressalvas: só conta Pix, não desconta prêmios, e pode haver fraude com CPFs.
  - https://www.opovo.com.br/noticias/economia/2024/09/24/bc-beneficiarios-do-bolsa-familia-transferiram-rs-3-bi-via-pix-para-bets.html
- **Mercado regulado desde 01/01/2025** (Lei 14.790/2023; Secretaria de Prêmios e Apostas, SPA/MF) [S]:
  - **2025:** receita bruta (já descontados os prêmios) de cerca de **R$ 37 bi**, **25,2 milhões** de CPFs únicos, 100,8 milhões de contas e cerca de **217 mil pedidos de autoexclusão**.
  - **1º semestre de 2026** (BNLData via Lei de Acesso à Informação): receita bruta de R$ 20,07 bi e cerca de 30,9 milhões de CPFs ativos.
  - Gasto médio de R$ 108 a R$ 164 por mês por apostador; as metodologias divergem.
  - Mais de 15 a 25 mil sites ilegais foram bloqueados.
  - https://bnldata.com.br/ggr-de-apostas-reguladas-no-brasil-atinge-r-2007-bi-no-1o-semestre-de-2026
- **LENAD III (Unifesp, campo em 2023–2024, divulgado em abr/2025) [S]:**
  - Amostra de 16.608 pessoas; o módulo de jogo teve 4.860.
  - **17,4%** dos brasileiros com 14 anos ou mais apostam, cerca de 28 milhões.
  - **6,8%** apostam de forma arriscada, cerca de 10,9 milhões.
  - **0,8%** têm padrão compatível com transtorno do jogo, cerca de 1,4 milhão. Seria a **3ª dependência mais comum do país**, atrás de álcool e tabaco e à frente de cocaína e crack (segundo Hermano Tavares).
  - Na renda de até 1 salário mínimo, **52,8%** dos apostadores apostam de forma arriscada ou problemática, contra 21,1% na renda de 2 salários ou mais.
  - Entre adolescentes apostadores, 84,1% usam plataformas online.
  - Não é comparável com o LENAD I (2006), porque os instrumentos mudaram.
  - https://revistapesquisa.fapesp.br/quase-11-milhoes-de-brasileiros-apostam-de-modo-a-por-em-risco-a-saude-e-as-financas/
- **LENAD III, álcool [S]:** 42,5% da população com 14 anos ou mais bebeu, cerca de 73,9 milhões. A prevalência de TUA não foi extraída [NV]. https://lenad.uniad.org.br/cadernos-lenad/alcool_vf-250925.pdf
- **Potencial de widget:** ★★★ "Pirâmide do apostador". Um funil com 100% da população → 17,4% apostam → 6,8% de risco → 0,8% transtorno, e um seletor de renda que mostra 52,8% contra 21,1%. Em segundo plano, um contador "R$ 3 bi do Bolsa Família em 1 mês".

### 5.6 Tempo de tela em 2025 e 2026

- **Pew Research (09/12/2025; 1.458 adolescentes americanos de 13 a 17 anos) [S]:**
  - **40%** estão online "quase o tempo todo", mais que há uma década e um pouco menos que em 2024.
  - 36% usam pelo menos uma das 5 grandes plataformas "quase o tempo todo"; TikTok 21% e YouTube 17%.
  - Por renda: 54% na baixa renda contra 35% na alta.
  - https://www.pewresearch.org/internet/2025/12/09/teens-social-media-and-ai-chatbots-2025/
- **Global (DataReportal Digital 2026) [NV]:** cerca de 6h38min por dia online e cerca de 2h21min em redes sociais. O Brasil costuma aparecer entre os 3 primeiros do mundo, com mais de 9 h por dia online. Conferir na fonte.
- **Contraste dentro do dossiê:** o adulto médio do RCT de Castelo usava **5h14min por dia** só no celular (314 min).
- **Potencial de widget:** ★★ "Seu dia em pixels". Uma grade de 24 h × 60 min que o leitor pinta com o próprio tempo de tela e compara com a média e com o "depois do bloqueio" (161 min).

---

## 6. Recuperação: os números que contradizem o "vício é para sempre"

### 6.1 A maioria se recupera, e muitos sem tratamento

- **Kelly et al. (*Drug Alcohol Depend*, 2017) [V]:**
  - Amostra probabilística nacional dos EUA: 39.809 pessoas, 63,4% de resposta.
  - **9,1%** dos adultos americanos dizem que "já tiveram um problema com álcool ou drogas e não têm mais", cerca de **22,35 milhões** de pessoas [o número absoluto é S].
  - Só **46%** se identificam como "em recuperação".
  - **53,9%** usaram alguma via assistida: grupos de mútua ajuda 45,1%, tratamento 27,6%, serviços de apoio à recuperação 21,8%. Ou seja, **cerca de 46% resolveram sem nenhuma ajuda formal**.
  - https://doi.org/10.1016/j.drugalcdep.2017.09.028
- **Lopez-Quintero et al. (*Addiction*, 2011; NESARC, n = 43.093) [V]:**
  - Probabilidade de remissão ao longo da vida: **nicotina 83,7%, álcool 90,6%, cannabis 97,2%, cocaína 99,2%**.
  - Metade remite em cerca de **26 anos (nicotina), 14 (álcool), 6 (cannabis) e 5 (cocaína)** depois do início da dependência.
  - https://doi.org/10.1111/j.1360-0443.2010.03194.x
- **Dennis & Scott (2007) [S]:** cerca de 58–60% de quem já teve transtorno por uso de substâncias chega à recuperação sustentada. A mediana entre o primeiro uso e 1 ano limpo é de **27 anos**; entre o primeiro tratamento e 1 ano limpo, 9 anos. https://pmc.ncbi.nlm.nih.gov/articles/PMC2797101
- **Ressalvas:**
  - Na NESARC, a amostra é populacional, com muitos casos leves; em clínica, as taxas são menores.
  - A remissão rápida da cocaína é contraintuitiva e reflete casos que se resolvem sozinhos, como o "maturing out".
  - Em Kelly, recuperação é autodeclarada.
- **Potencial de widget:** ★★★ "Curvas de saída". Quatro curvas de sobrevivência (cumulativas de remissão) por substância, de 0 a 50 anos, com marcadores de "metade saiu" em 5, 6, 14 e 26 anos. A surpresa: **o cigarro é o mais difícil de largar, e a cocaína o mais "rápido"**.

### 6.2 A curva de recaída de Hunt (1971) e o que veio depois

- **Hunt, Barnett & Branch (*J Clin Psychol*, 1971) [V, só os metadados; números S]:**
  - A curva clássica, tirada de vários programas, mostra que **heroína, cigarro e álcool têm curvas quase idênticas**.
  - Cerca de **2/3 recaem nos primeiros 90 dias**. Depois, a curva se achata: perto de 75–80% recaem em 12 meses.
  - É a origem da ideia de uma "via comum" do vício em termos comportamentais.
  - https://doi.org/10.1002/1097-4679(197110)27:4<455::aid-jclp2270270412>3.0.co;2-r
- **Seguimento de 8 anos de Dennis, Foss & Scott (*Eval Rev*, 2007) [V para o desenho; S para os números]:**
  - 1.162 pessoas, com mais de 94% de seguimento.
  - A chance de manter a abstinência no ano seguinte cresce com o tempo já abstinente. O número citado com frequência é que, depois de 5 anos, cerca de 86% se mantêm [S/NV: confirmar na tabela].
  - https://doi.org/10.1177/0193841x07307771
- **Potencial de widget:** ★★★ "Os primeiros 90 dias". A curva de Hunt com 3 linhas sobrepostas (heroína, cigarro, álcool) e uma sombra nos 90 primeiros dias. Um segundo painel mostra a "probabilidade de continuar limpo no próximo ano" subindo com os anos de abstinência. Conecta com os 30 dias da Lembke: o 1º mês é a parte mais íngreme da curva.

### 6.3 "Recaída igual à de outras doenças crônicas" (McLellan et al., JAMA, 2000)

- **Achado [V]:** dependência química se compara a diabetes tipo 2, hipertensão e asma em herdabilidade, papel da escolha pessoal, adesão e recaída.
  - Conclusão do abstract: "a adesão à medicação e as taxas de recaída são semelhantes entre essas doenças".
  - Fonte: https://doi.org/10.1001/jama.284.13.1689
- **Números da figura [S]**, a proporção que recai ou volta a ter sintomas em 1 ano:

| Condição | Recaída ou volta dos sintomas em 1 ano |
|---|---|
| Dependência de drogas | 40–60% |
| Diabetes tipo 1 | 30–50% |
| Hipertensão | 50–70% |
| Asma | 50–70% |

- **Ressalvas:** a "recaída" na hipertensão (pressão volta a subir por falta de adesão) é um conceito diferente da recaída no vício. A comparação é retórica, mas foi muito influente.
- **Potencial de widget:** ★★★ "Adivinhe qual é o vício". Quatro barras de intervalo sem rótulo; o leitor tenta adivinhar qual delas é a dependência química. Desarma o estigma.

### 6.4 As 4 semanas da Lembke têm base? Brown & Schuckit (1988)

- **Achado [V]:**
  - 191 homens alcoolistas internados, sem transtorno psiquiátrico prévio, avaliados semanalmente com a escala de Hamilton.
  - **42%** tinham depressão clinicamente significativa (Hamilton ≥ 20) na entrada, e só **6% na semana 4**.
  - A maior queda acontece na **semana 2**.
  - Os autores recomendam não iniciar antidepressivo antes de 4 semanas de abstinência.
- **Fonte:** https://doi.org/10.15288/jsa.1988.49.412
- **Ligação:** é o dado empírico mais próximo das afirmações da Lembke de que "10 a 14 dias são o pior" e "cerca de 80% se sentem melhor nas semanas 3 e 4". Cair de 42% para 6% significa que **cerca de 86% dos deprimidos deixaram de estar deprimidos**.
- **Ressalvas:** só homens, internados, só álcool, sem grupo controle, e os dados são de 1988. A afirmação da Lembke vale para "a maioria das substâncias", mas não achei nenhum estudo que a teste de forma ampla [NV].
- **Potencial de widget:** ★★★ "A abstinência semana a semana". Barras das semanas 0 a 4 com a % de deprimidos (42% → … → 6%). Um botão "e se tivesse recaído na semana 1?" ilustra a armadilha da automedicação descrita pela Lembke.

---

## 7. Novidades de novembro de 2026

- **03/11/2026:** Tang, Kranzler et al. (*Diabetes Obes Metab*) publicaram a primeira comparação direta entre semaglutida e tirzepatida para desfechos de álcool: equivalentes, HR 0,98 (1.4) [V].
- **04/11/2026:** *Nature* (UCSF) descreveu um sinal de dopamina lento do intestino ao cérebro para o aprendizado sobre nutrientes, com especulação de ligação com os GLP-1 [S].
- **Dados do CDC disponíveis em 01/11/2026:** 12 meses até jun/2026 com **65.724** mortes por overdose previstas, −41,5% desde o pico [V, 5.1]. A Axios (03/11/2026) noticiou a queda de cerca de 12% em 12 meses [S].
- **Out/2026:**
  - JAMA Psychiatry sobre apostas online e saúde mental (5.4) [V].
  - Extensão aberta da psilocibina com efeito transitório (4.3) [V].
  - Preprint com ultrassom focado negativo em ratos (4.2) [V].
- **10/11/2026:** saiu o corte do Huberman com a Lembke, o ponto de partida deste ensaio.
- **Matéria de destaque:** não achei nenhuma de novembro especificamente sobre "dopamina e vício" além dessas. Há um item de agregador sobre "laços de dopamina movidos por IA" que cita o Washington Post [NV].

---

## 8. Ranking dos widgets por potencial

1. ★★★ **Overdoses nos EUA, a montanha e a descida** (5.1). Dado primário do CDC, mensal, 2015 a jun/2026, por droga.
2. ★★★ **Curva em J da abstinência digital** (2.3 + 2.4). Thrul (pessoa) junto com as proibições escolares (escola).
3. ★★★ **Curvas de remissão por substância** (6.1). 26 anos para nicotina contra 5 para cocaína.
4. ★★★ **Murphy contra NCAA, antes e depois** (5.4). US$ 4,9 bi → US$ 167 bi, mais a série de Ontário.
5. ★★★ **Pirâmide do apostador no Brasil** (5.5). LENAD mais Bolsa Família.
6. ★★★ **17 → 9 → 5 dias de consumo pesado** (1.2). Mostra o efeito do placebo com TCC contra o da semaglutida.
7. ★★★ **Régua de tamanhos de efeito** (2.1 + 2.2). De 0,04 a 0,56 DP.
8. ★★★ **42% → 6%: as 4 semanas** (6.4).
9. ★★★ **O accumbens não é um ponto** (3.2) e **simulação TD** (3.3).
10. ★★★ **Recaída do vício contra doenças crônicas** (6.3).

## 9. Pendências antes de publicar

- Conferir na fonte primária:
  - os números de Bogenschutz 2022 (9,7% contra 23,6%);
  - os números de Allcott 2020 (0,09 DP);
  - a curva de Hunt 1971 (2/3 em 90 dias);
  - a figura de McLellan 2000;
  - o "86% após 5 anos" de Dennis.
- Vigitel: confirmar se os números são das capitais ou do total, e se o Vigitel 2025 já saiu.
- Ler o PDF de avaliação do eSafety (deu timeout).
- Confirmar o patrocinador do brenipatide e o status do NCT06548490 (GLP-1 em TUO, fim previsto para 01/11/2026).
- ECA Digital (Lei 15.211/2025): conferir vigência e o que exige.
- DataReportal 2026: tempo de tela no Brasil.
