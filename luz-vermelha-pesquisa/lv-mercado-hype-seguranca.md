# Luz vermelha: tendência, mercado, regulação e segurança

Pesquisa para o ensaio "Terapia de luz vermelha: hype ou não?". Escopo deste arquivo: a curva de interesse, o dinheiro, o que os reguladores dizem, o que os aparelhos realmente emitem e os riscos. Consulta feita em 14/11/2026.

**Legenda.** [V] verificado por mim na fonte primária ou em dado bruto que eu mesmo puxei. [S] sustentado por fonte secundária confiável (imprensa séria, revisão, documento oficial lido por resumo). [NV] não verificado, de memória ou de fonte fraca; checar antes de publicar.

**Método.** Google Trends puxado pela API não oficial (pytrends, num ambiente virtual), série mensal de jan/2018 a nov/2026 (novembro parcial), cada grupo de até 5 termos numa sessão nova de Python (para evitar o bug, já visto na pesquisa do cortisol, em que uma consulta mundial depois de uma brasileira devolvia dados do Brasil; conferi que "red light therapy" mundial é idêntico nos grupos world_en, world_pt, world_misc e world_brands). Médias anuais e picos calculados por mim. Consultas relacionadas puxadas para as janelas de pico. Dados da FDA puxados pela openFDA (API pública: classificação, 510(k) e MAUDE). Resumos de artigos lidos pela Europe PMC. CSVs em `luz-vermelha-pesquisa/dados/`:

- `trends-world_en.csv`: red light therapy, red light therapy mask, photobiomodulation, LED facial, red light therapy bed (mundo)
- `trends-world_pt.csv`: red light therapy, luz vermelha, terapia de luz vermelha, fotobiomodulação, LED facial (mundo)
- `trends-world_misc.csv`: red light therapy, LED face mask, red light mask, morning sunlight, cold plunge (mundo; cold plunge como régua de outra moda de bem-estar)
- `trends-world_brands.csv`: red light therapy, Omnilux, CurrentBody, Joovv, Mito Red Light (mundo)
- `trends-us_en.csv`: red light therapy, ...mask, ...bed, photobiomodulation, LED face mask (EUA)
- `trends-br_pt.csv`: luz vermelha, terapia de luz vermelha, fotobiomodulação, LED facial, red light therapy (Brasil)
- `trends-br_en.csv`: red light therapy, red light therapy mask, photobiomodulation, laserterapia, LED facial (Brasil)
- `trends-br_misc.csv`: máscara de led, máscara led, luz vermelha, fotobiomodulação, laserterapia (Brasil)
- `fda-510k-OHS-por-ano.csv`: liberações 510(k) por ano no código OHS (redução de rugas por luz, venda livre)
- `fda-maude-OHS-por-ano.csv`: relatos de eventos adversos no MAUDE para o código OHS (amostra dos 100 primeiros de 109)

---

## 1. A tendência

### 1.1 Google Trends: o veredito

**Mundo, "red light therapy" (índice 0 a 100, pico = abr/2026) [V]:**

| Ano | Média anual |
|---|---|
| 2018 | 2,8 |
| 2019 | 3,8 |
| 2020 | 4,1 |
| 2021 | 5,5 |
| 2022 | 8,1 |
| 2023 | 13,8 |
| 2024 | 25,2 |
| 2025 | 46,0 |
| 2026 (até nov) | 65,5 |

Série mensal recente (mundo): out/2023 13, dez/2023 22, jan/2024 27, out/2024 23, dez/2024 39, jan/2025 44, jul/2025 34, ago/2025 48, out/2025 49, nov/2025 66, **dez/2025 82**, jan/2026 80, fev/2026 66, mar/2026 74, **abr/2026 100**, mai/2026 90, jun/2026 71, jul/2026 51, ago/2026 47, set/2026 56, **out/2026 41**, nov/2026 (parcial) 44.

Leitura:

1. **Crescimento de cerca de 23 vezes entre 2018 e 2026 na média anual** [V]. Até 2022 era nicho (biohacker, fisioterapia, Joovv). A virada começa no fim de 2023.
2. **Pico absoluto em abril de 2026** [V], no mundo e nos EUA (o gráfico dos EUA é quase idêntico, pico também em abr/2026). Não identifiquei um gatilho único para abril [NV]; as consultas "em alta" na janela mar a mai/2026 mostram a moda se espalhando do rosto para o corpo inteiro: "red light therapy mat" (+200%), "cap" (+190%), "belt" (+190%), "full body red light therapy" (+180%), "hat", "lamp", "Hooga", "bed" (+130%), "wand" [V]. As consultas "top" são lideradas por "red light therapy mask" e "red light mask".
3. **Sazonalidade de presente de fim de ano**: todo ano o índice salta entre outubro e dezembro (2023: 13 para 22; 2024: 23 para 39; 2025: 49 para 82) [V]. "red light mask" tem seu pico em **dez/2025** (34), não em abril [V]. A máscara é um produto de Black Friday e Natal. Coincide com Kim Kardashian presenteando família e amigos com máscaras CurrentBody e Omnilux no Natal de 2023 e postando "I'm obsessed with these" no Instagram [S].
4. **Depois do pico, queda de cerca de 60%**: de 100 (abr/2026) para 41 (out/2026). Ainda assim, out/2026 está no mesmo nível de out/2025 (49) e três vezes acima de out/2023 (13) [V]. Isso parece mais o desinflar de uma bolha de atenção que um colapso; o teste real é se dez/2026 superar ou não dez/2025.
5. **Régua de comparação**: "cold plunge" (outra moda de bem-estar) teve pico de 24 em mai/2026 na mesma escala em que "red light therapy" bateu 100. A luz vermelha foi cerca de 4 vezes maior em busca [V]. "morning sunlight" é minúsculo (máximo 6), ou seja, o conselho de "luz do sol de manhã" do Huberman não se traduz em busca [V].
6. **Marcas**: Omnilux pico nov/2025 (12), CurrentBody pico abr/2026 (14); Joovv e Mito Red Light (painéis) quase zero na mesma escala (máximo 1) [V]. A demanda de massa é de máscara facial, não de painel.
7. **"photobiomodulation"** (o termo científico) também cresceu, de 0 até pico de 13 em mai/2026 [V]: a palavra técnica vazou para o público.

**Brasil [V]:**

- **"laserterapia" é o termo dominante e antigo** no Brasil (média 34 em 2018, 88 em 2025, pico mai/2025), puxado por fisioterapia, odontologia e estética. Cresceu de forma constante, sem bolha.
- **"red light therapy" (em inglês) no Brasil** era quase zero até 2024, deu um salto entre nov/2025 e jun/2026 (pico dez/2025, 63 na escala em que laserterapia = 100 no pico) e despencou para 5 a 7 em out e nov/2026. Ressalva: a série brasileira é ruidosa e de baixo volume; na janela do pico, a consulta relacionada "em alta" de maior valor foi "ai news today" (+97.650%), sinal típico de ruído ou tráfego automatizado no Trends. Tratar o pico brasileiro em inglês com cautela.
- **"LED facial"** cresce de forma estável no Brasil: média 4 a 7 entre 2018 e 2023, 14 em 2024, 23 em 2025, 39 em 2026, pico jul/2026 (50) [V]. É provavelmente o termo popular brasileiro mais confiável para a moda.
- **"terapia de luz vermelha"** é praticamente zero: o brasileiro não busca o termo traduzido [V]. "fotobiomodulação" é pequeno (pico 6 em set/2026 na escala de "luz vermelha") [V].
- **"luz vermelha"** sozinho é termo genérico demais (semáforo, música, filme, "sinal vermelho"); não serve como medida do hype [V].
- **"máscara de led"** é pequeno e teve pico em jun/2024 [V].

**Veredito Trends (para o texto):** a luz vermelha passou de nicho a moda de massa entre o fim de 2023 e 2025, puxada pela máscara facial e pela temporada de presentes; atingiu o pico mundial em abril de 2026, quando já tinha se espalhado para gorros, cintos, colchonetes e camas; e caiu cerca de 60% até outubro de 2026, ainda três vezes acima de 2023. No Brasil, o interesse "de verdade" passa por "laserterapia" e "LED facial", que crescem sem bolha; a onda em inglês foi curta e ruidosa.

**Literatura sobre o mesmo dado [S]:** Shen e Zhao, "The Influence of Popular Media on Public Interest in Red-Light Therapy: Longitudinal Trend Analysis", JMIR Dermatology 2025;8:e69796 (jun/2025), identificaram quebras estruturais no início de 2024 coincidentes com a exposição no TikTok. https://derma.jmir.org/2025/1/e69796

### 1.2 Redes sociais

- **TikTok**: "#redlighttherapy" com mais de 75 milhões de visualizações em 2023 (WWD) e mais de 96 milhões no início de 2024; o artigo do JMIR Dermatology cita "Red LED light therapy" com mais de 70 milhões em fev/2024 [S]. Contagens de 1,3 bilhão aparecem em indexadores não oficiais (Light Therapy Insiders) [NV]. O TikTok não publica contagem oficial vitalícia por hashtag. Creative Center: cerca de 177 mil posts no total, 14 mil nos últimos 30 dias (EUA), segundo blog do setor [NV].
- **Instagram**: contagens de terceiros conflitam (667 mil vs 78 milhões, este provavelmente erro de rótulo) [NV]. Não usar número.
- **Estudo de conteúdo (o melhor dado) [S]**: Merkle, Tomczak, Do, Aji, Ilyas, "At-Home Red Light Therapy Devices: Promotion and Recommendation Patterns on Social Media in the Context of Limited Evidence", Cureus, 9/fev/2026, doi:10.7759/cureus.103274. 132 posts, alcance potencial de 47,5 milhões de seguidores. 64,4% dos posts feitos por pessoas sem credencial de saúde; 18,2% por médicos (que somam 38,9% do alcance). No TikTok, 87,7% dos posts são de não credenciados. 88,6% prometem benefício de pele. Só 8,3% linkam artigo revisado por pares. Preço mediano do aparelho promovido: US$ 347 (não credenciados), US$ 469 (médicos), US$ 629 (outros profissionais). Os autores apontam discrepância entre a energia dos aparelhos promovidos e a usada nos estudos citados.
- **Pesquisa com usuários [S]**: Ilyas et al., J Clin Aesthet Dermatol 2025;18(7):8 a 10 (jul/2025). 226 respondentes recrutados em redes: 60,4% souberam da terapia pelas redes, só 11,5% por médico; 90% comprariam ou talvez comprariam um aparelho; 48,9% pagariam entre US$ 101 e 300; 44,1% esperam resultado em 1 a 3 meses. Amostra 88,5% feminina, 83,6% hispânica: não generalizável. https://jcadonline.com/social-media-red-light-therapy/

### 1.3 Quem empurrou

- **Kardashians** [S]: Kim deu máscaras CurrentBody e Omnilux de presente no Natal de 2023 e postou nos Stories; Kourtney já postava com uma máscara DMH Aesthetics (US$ 190) desde 2016; Kylie também já "presenteou" aparelho de pele. https://marieclaire.com/beauty/kim-kardashian-led-therapy
- **Andrew Huberman** [S]: episódio "Using Light (Sunlight, Blue Light & Red Light) to Optimize Health". A ênfase dele é a luz do sol de manhã (5 a 10 minutos em dia claro, até 30 em dia nublado) e evitar luz forte à noite; sobre luz vermelha, cita os estudos de Glen Jeffery (UCL): 3 minutos de luz 670 nm de manhã melhoraram em 17% a sensibilidade ao contraste de cor em 20 pessoas acima de 40 anos, efeito de cerca de uma semana, e nenhum efeito quando a exposição foi à tarde (Scientific Reports, 2021; amostra pequena, dados "ruidosos" segundo os próprios autores). https://hubermanlab.com/using-light-sunlight-blue-light-and-red-light-to-optimize-health e https://ucl.ac.uk/news/2021/nov/morning-exposure-deep-red-light-improves-declining-eyesight . Ressalva importante para o texto: "luz do sol ao amanhecer/pôr do sol" (ritmo circadiano) e "painel de LED vermelho" (fotobiomodulação) são coisas diferentes que o algoritmo mistura.
- **Bryan Johnson** [S/NV]: usa gorro de luz vermelha/laser para cabelo (cerca de 6 minutos por dia) e sessões de corpo inteiro após sauna, segundo resumos de vídeos dele; não confirmei se a Blueprint vende um gorro próprio.
- **Academias, spas, salões** [S]: reportagem da WSMV (jul/2026) sobre a expansão em academias e centros de bem-estar; franquias da Anytime Fitness adicionaram luz vermelha em algumas unidades. Salões de bronzeamento trocam lâmpadas UV por LED vermelho em camas antigas; uma fonte dermatológica alerta que essas adaptações não seguem as diretrizes da FDA. Preço nos EUA: US$ 100 a 150 por sessão em spa, cerca de US$ 30 em salão de bronzeamento [S]. https://www.wsmv.com/2026/07/30/red-light-therapy-gaining-popularity-gyms-wellness-centers-home/
- **Brasil**: imprensa liga a moda a celebridades como Marina Ruy Barbosa (máscara de LED) [S]. https://www.itatiaia.com.br/entretenimento/mascara-de-led-o-segredo-para-deixar-a-pele-perfeita-revelado-por-marina-ruy-barbosa/

**Potencial de widget (tendência):** um infográfico estático de linha única, "red light therapy" mundial 2018 a 2026, com anotações (Natal 2023 Kardashian; dez/2025 pico da máscara; abr/2026 pico absoluto e a explosão de "gorro, cinto, colchonete"; out/2026 41). Ao lado, linhas finas de "cold plunge" e "morning sunlight" na mesma escala como régua. Um segundo painel pequeno para o Brasil mostrando que "laserterapia" e "LED facial" sobem sem bolha enquanto "red light therapy" faz um pico e some. Interação só se ajudar: um seletor "mundo / EUA / Brasil" já basta.

---

## 2. Mercado e preços

### 2.1 Tamanho do mercado (com ressalva)

Os relatórios de "market research" são caros, de metodologia opaca, e definem o mercado de jeitos incompatíveis. A variação entre eles é ela mesma um dado.

| Fonte | Recorte | 2025 | Projeção |
|---|---|---|---|
| Grand View Research [S] | terapia de luz vermelha | US$ 534 milhões | US$ 1,13 bi em 2033 (9,8% ao ano) |
| Coherent Market Insights [S] | só camas de luz vermelha | US$ 8,21 bi | US$ 19,3 bi em 2032 |
| Future Market Insights / SNS Insider [S] | terapia de luz (inclui azul e branca) | US$ 1,1 a 1,17 bi | |
| Mobility Foresights [S] | só EUA | US$ 0,59 bi | US$ 1,32 bi em 2031 |
| citado por Consulting Room [NV] | máscaras LED faciais | US$ 360,2 milhões (2024) | |

Fontes: https://www.marketresearch.com/Grand-View-Research-v4060/Red-Light-Therapy-44620781/ ; https://www.marketresearch.com/Coherent-Market-Insights-v4137/Red-Light-Therapy-Beds-Product-39895628

Um "mercado de camas" 15 vezes maior que o "mercado total" mostra que esses números não se somam. **Dado duro melhor que relatório: o balanço de uma empresa.**

- **The Beauty Tech Group (dona da CurrentBody), ano fiscal 2025** [S]: receita de £ 141,0 milhões (+39,4%), lucro antes de impostos £ 15,2 milhões (+196%). A marca de máscaras CurrentBody Skin sozinha: £ 125,8 milhões, cerca de 89% da receita, +59% no ano. IPO na Bolsa de Londres em 8/out/2025, a 271 pence, avaliação de cerca de £ 300 milhões. Orientação para 2026: pelo menos £ 170 milhões (o consenso compilado pela empresa fala em £ 160 milhões; fontes conflitam). https://www.investegate.co.uk/announcement/rns/the-beauty-tech-group-plc--tbtg/final-results-for-the-year-ended-31-december-2025/9522502 e https://www.cityam.com/?p=2415773
- **Corrida de aprovações na FDA** [V]: liberações 510(k) no código OHS (redução de rugas por luz, venda livre): 2 a 8 por ano entre 2008 e 2021; 16 em 2022; 12 em 2023; 16 em 2024; **42 em 2025**; 27 em 2026 até novembro. 166 no total. É o melhor termômetro de quantos fabricantes entraram no jogo. Fonte: openFDA, `fda-510k-OHS-por-ano.csv`.

### 2.2 Preços (EUA e Reino Unido)

| Categoria | Faixa | Exemplos |
|---|---|---|
| Máscara facial genérica | US$ 50 a 200 | marketplace, "7 cores" [S] |
| Máscara de marca | US$ 375 a 570 | Omnilux Contour Face US$ 395 (375 a 395 nos varejistas) [S]; CurrentBody Series 2 US$ 469,99, Multi-Light US$ 569,99 [S]; CurrentBody Series 3 cerca de £ 500 [S]; Dr. Dennis Gross DRx SpectraLite FaceWare Pro cerca de US$ 455 [NV] |
| Gorro/capacete para cabelo | US$ 200 a 1.500 [NV] | iRestore, Kiierr, CurrentBody Hair |
| Painel (corpo) | US$ 200 a 3.000+ [NV] | Mito Red, Joovv |
| Cama de corpo inteiro | dezenas de milhares de dólares [NV] | uso em academia/spa |
| Sessão em spa/consultório | US$ 30 (salão de bronzeamento) a 150 [S]; facial LED de spa US$ 200 a 300 (fonte de fabricante) [NV] | |

NPR (abr/2026): aparelhos de consumo vão de cerca de US$ 50 a milhares de dólares [S].

### 2.3 Brasil

- **Máscaras em marketplaces** [S]: modelos "7 cores" de R$ 135 a R$ 360 (Magazine Luiza R$ 150,10; R$ 169; Gelpal 7+1 cores R$ 310,34; Panvel R$ 310; modelo com app R$ 358,75); modelo só vermelho com 324 LEDs a R$ 1.362,34. https://www.panvel.com/panvel/mascara-facial-led-7-cores-foton-leve-recarregavel/p-10084818 e https://m.magazineluiza.com.br/busca/mascara+inteligente . O Mercado Livre bloqueou minha consulta automatizada (403); os preços de lá ficam [NV]. Omnilux e CurrentBody não têm preço oficial em reais; chegam por importação, a preço em dólar mais impostos [S].
- **Sessão em clínica** [S/NV]: laserterapia avulsa custa em média R$ 120 (R$ 90 a 150) segundo o GetNinjas; sessão de fisioterapia em clínica R$ 80 a 150 (30 minutos). https://www.getninjas.com.br/saude/biomedicina-estetica/preco/laserterapia . Não achei tabela pública de "LED facial" em clínica de dermatologia; checar com 2 ou 3 clínicas [NV].
- **Conta de cabeça para o leitor**: uma máscara de marca (cerca de US$ 400) equivale a algo como 15 a 20 sessões de laserterapia no Brasil [NV, câmbio a conferir].

**Potencial de widget (mercado):** (a) barra de "tamanho do mercado segundo cada relatório", lado a lado, para mostrar que os números não conversam (US$ 0,5 bi vs US$ 8,2 bi). (b) gráfico de colunas das liberações 510(k) por ano, com o salto para 42 em 2025. (c) "escada de preço": de máscara genérica a cama, com o preço de uma sessão no Brasil como régua. Estático basta.

---

## 3. Regulação

### 3.1 EUA: "FDA cleared" não é "FDA approved"

- **510(k) "clearance"** é a FDA dizendo que o aparelho é "substancialmente equivalente" a um aparelho já vendido legalmente (o "predicado"): mesma finalidade e tecnologia igual ou diferente sem novas questões de segurança e eficácia. Pode ser obtido com pouco ou nenhum dado clínico, só testes de bancada. O próprio regulamento da FDA diz que a clearance "não denota de forma alguma aprovação oficial" do aparelho, e que é enganoso dizer "FDA approved" [S]. https://www.pureglobal.com/blog-posts/fda-cleared-vs-approved-vs-granted-510k-pma-de-novo
- **PMA "approval"** exige prova de segurança e eficácia, é o caminho mais duro. **De Novo** cria uma nova classe para aparelhos de risco baixo a moderado sem predicado.
- Na prática, muitos consumidores e até dermatologistas citados na imprensa dizem "FDA-approved" para Omnilux e CurrentBody: é erro. Um dermatologista disse ao Marie Claire que ambos são "FDA-approved" [S]. MAUDE tem relatos de consumidores dizendo "FDA-APPROVED LYMA LASER" e uma caixa (Avologi) dizendo "FDA approved as a Class II medical device" [V].
- David Ozog (Henry Ford Health), à NPR: liberação significa que muitos aparelhos são seguros, mas não necessariamente eficazes; ele testou alguns que não emitiam energia suficiente para ter efeito [S].

**O que está liberado para quê (códigos de produto da FDA, todos Classe II) [V, openFDA]:**

| Código | Descrição oficial | 510(k) no total | Exemplos |
|---|---|---|---|
| OHS | Light Based Over The Counter Wrinkle Reduction (21 CFR 878.4810) | 166 | máscaras Omnilux, CurrentBody, LYMA, NIRA, Shark CryoGlow |
| OLP | Over-The-Counter Powered Light Based Laser For Acne | 51 | Neutrogena Light Therapy Acne Mask (recolhida em 2019) |
| OAP | Laser, Comb, Hair (crescimento de cabelo, 21 CFR 890.5500) | 116 | gorros e pentes laser |
| ILY | Lamp, Infrared, Therapeutic Heating (alívio temporário de dor) | 229 | muitos painéis LED entram aqui |
| NHN | Laser não térmico para uso adjunto em terapia de dor | 54 | |

- Liberações relevantes fora do consumo [S]: **Valeda (LumiThera)**, autorização De Novo em 4/nov/2024 para degeneração macular seca (estudo LIGHTSITE III: ganho de mais de 5 letras de acuidade em 24 meses; atrofia geográfica nova 6,8% vs 24% no sham, desfecho não pré-especificado). A NPR (abr/2026) cita também aparelho liberado para alívio temporário da dor da fibromialgia. https://cm.healio.com/news/ophthalmology/20241105/fda-grants-de-novo-authorization-to-photobiomodulation-device-for-dry-amd
- Luz vermelha para **miopia infantil** (RLRL) **não é aprovada nos EUA**, segundo a Academia Americana de Oftalmologia [S]. https://aao.org/eye-health/news/red-light-therapy-nearsightedness-myopia-children

### 3.2 FTC e autorregulação

Não achei carta de advertência da FTC dirigida especificamente a máscaras de luz vermelha. O que existe [S/V]:

- **Willow Curve (jun/2020)**: acordo de US$ 22 milhões com fabricantes de um aparelho de luz de baixa intensidade para dor; proíbe alegações enganosas e "publicidade nativa" disfarçada; acusação incluía dizer falsamente que era "aprovado pelo governo" [S].
- **COVID (nov/2020)**: cartas de advertência a 20 empresas, entre elas I B Tan e Vibrant Life Oklahoma, que vendiam bronzeamento/luz vermelha/UV como prevenção de COVID [V]. https://www.ftc.gov/node/48568
- **DERMAdoctor (2014)**: acordo sobre loções "Photodynamic Therapy" que diziam converter UV em luz vermelha [S].
- **NAD/BBB (11/dez/2019)**: a Zero Gravity (aparelhos LED Perfectio) dizia "91% viram melhora em uma semana, 100% melhora dramática em sete semanas"; não apresentou provas e foi encaminhada à FTC e à FDA [V]. https://bbbprograms.org/media/newsroom/decisions/nad-zero-gravity-claims-ftc-fda
- **Ação coletiva privada**: Chambers v. Carol Cole Co. (NuFACE), 2024, sobre alegações de colágeno e rugas em aparelhos de luz vermelha; terminou em acordo [S].

### 3.3 Reino Unido e União Europeia

- **ASA (Reino Unido), 5/nov/2025** [S]: proibiu anúncios de máscaras LED de quatro vendedores (Beautaholics, Luyors Retail, Project E Beauty, Silk'n) por alegações médicas (tratar acne, rosácea) sem registro na MHRA. Exemplos: "targeted solutions for acne and rosacea"; "help tackle everything from acne with clinical precision". Os casos foram achados pelo monitoramento por IA da própria ASA. A ASA não baniu a tecnologia, só as alegações. https://professionalbeauty.co.uk/asa-bans-led-mask-adverts-over-acne-and-rosacea-claims e https://www.asa.org.uk/rulings/luyors-retail-inc-a25-1293787-luyors-retail-inc.html
- **UE** [S]: o Regulamento de Dispositivos Médicos (MDR 2017/745), Anexo XVI, item 5, inclui equipamentos que emitem radiação eletromagnética de alta intensidade (infravermelho, luz visível, UV) para tratamento de pele mesmo sem finalidade médica; o BSI lista "equipamento LED para rejuvenescimento da pele" no escopo. As especificações comuns estão no Regulamento de Execução (UE) 2022/2346, com exigência de organismo notificado. Ressalva [NV]: se uma máscara de baixa potência é "alta intensidade" é zona cinzenta; conferir texto na EUR-Lex. https://www.kiwa.com/en-gb/insights/stories/mdr-annex-xvi/

### 3.4 Brasil

- **ANVISA** [S]: aparelhos com finalidade terapêutica ou estética são "produtos para saúde" (equipamentos eletromédicos), sujeitos a notificação ou registro conforme a classe de risco (I a IV), pela RDC 751/2022. Lasers seguem a classificação da IEC 60825-1 e a norma ABNT NBR IEC 60601-2-22; fontes de luz não laser (LED) para uso terapêutico, cosmético ou estético, a ABNT NBR IEC 60601-2-57. A maioria dos aparelhos estéticos baseados em energia cai em Classe II ou III (fonte de consultoria) [S]. https://www.gov.br/anvisa/pt-br/setorregulado/regularizacao/produtos-para-saude/notas-tecnicas/nota-tecnica-gquip-no-002-2017.pdf e https://antigo.anvisa.gov.br/documents/10181/5672055/%281%29RDC_751_2022_COMP.pdf/4aef938f-dec2-42b2-8f06-5ec94abfbe31
- **Lacuna**: não achei alerta da ANVISA específico sobre máscaras de LED sem registro [V, busca]. Há decisões autuando empresas por vender equipamento LED (fotopolimerizador odontológico) sem registro. Dermatologistas na imprensa recomendam conferir o registro na ANVISA antes de comprar [S]. Sugestão de apuração: consultar no portal da ANVISA quantas máscaras faciais LED de uso doméstico têm registro, e comparar com o número de anúncios no Mercado Livre [NV].
- **Conselhos profissionais** [S]: dentistas: a Resolução CFO-82/2008 reconhece a laserterapia como prática na odontologia e define habilitação; o CROSP tem Câmara Técnica de Laserterapia e define fotobiomodulação como terapia com laser ou LED de baixa potência. Fisioterapeutas: a Resolução COFFITO 80 inclui fontes de fototerapia entre os recursos do fisioterapeuta, com exigência de capacitação. **CFM**: não achei posição específica sobre luz vermelha ou máscaras LED [NV]. https://sistemas.cfo.org.br/visualizar/atos/RESOLU%C3%87%C3%83O/SEC/2008/82
- Curiosidade útil: no Brasil, a fotobiomodulação é rotina no SUS e em hospitais para mucosite oral de pacientes em quimioterapia e radioterapia (terreno dos dentistas) [NV, checar com o agente de evidência]. É a melhor ponte entre "hype de TikTok" e "terapia séria".

**Potencial de widget (regulação):** um "decodificador de selo": três cartões estáticos, "FDA cleared", "FDA approved", "registrado na ANVISA", cada um com o que significa e o que NÃO significa. E uma tabela "liberado para quê" com ícones (rugas, acne, cabelo, dor, olho/DMRI). Sem interação.

---

## 4. Promessa versus medição

- **Estudo-piloto de bancada (2025)** [V, resumo]: Cronshaw, Parker, Hamadah, Arnabat-Dominguez, Grootveld, "Photobiomodulation LED Devices for Home Use: Design, Function and Potential: A Pilot Study", Dentistry Journal 2025;13(2):76 (PMC11853966). Cinco aparelhos manuais/intraorais escolhidos ao acaso: resultados heterogêneos em comprimento de onda, potência e irradiância; potência instável; ângulo de divergência do feixe de 74°; as instruções de dose do fabricante "inconsistentes com uma entrega de dose precisa". Amostra minúscula, não são máscaras. https://www.mdpi.com/2304-6767/13/2/76
- **Aparelhos de miopia (bancada, JAMA Ophthalmology)** [S]: ver seção 5.2. É o teste independente mais sólido: mostra que aparelhos podem emitir **mais** do que o limite de segurança, não só menos do que prometem.
- **"Mede com medidor solar"** [S/NV]: revisores com interesse comercial (Outliyr, Light Therapy Insiders) mostram que muitos fabricantes de painéis declaram irradiância medida com medidor solar, que superestima LEDs vermelhos e infravermelhos em 40% a 70%; um painel "de 200 mW/cm²" entregaria de 80 a 120 mW/cm² [NV]. Em espectrômetro calibrado, a Outliyr achou aparelhos entregando de 67% a quase o triplo da potência anunciada (press release de jul/2026) [S]. https://outliyr.com/light-therapy-testing-methodology
- **Cobertura da máscara** [NV]: fabricante de painel (Mito Red) argumenta que uma máscara de 66 LEDs cobre cerca de 2% do rosto com luz direta e que a diferença entre pico e média de irradiância chega a 44 vezes (dados atribuídos à Light Therapy Insiders). Interesse comercial evidente; usar só como hipótese a testar.
- **Ozog e Arany (NPR)** [S]: alguns aparelhos vendidos online não emitem o comprimento de onda certo; recomendam certificação de segurança independente (UL, Intertek) e teste óptico de terceiros para comprimento de onda e irradiância.
- **Influenciadores vs estudos** [S]: o estudo do Cureus (2026) achou que a energia dos aparelhos promovidos não bate com a dos estudos citados nos posts.
- **Jornalismo de teste**: Which? (Reino Unido) testa máscaras, mas resultados de medição ficam atrás de paywall [S]. Não achei teste com espectrômetro de Wirecutter, Consumer Reports ou Washington Post [V, busca]. Um teste próprio (comprar 3 máscaras e medir com espectrorradiômetro emprestado de universidade) seria um diferencial do ensaio [NV, ideia].
- **Recalls**: Neutrogena Light Therapy Acne Mask, jul/2019, recolhimento "por precaução" por "risco teórico de lesão ocular" em pessoas com certas doenças oculares ou usando remédios fotossensibilizantes; a máscara usava luz azul; o recall começou por alerta do governo australiano [S]. https://www.aop.org.uk/ot/news/2019/07/22/eye-injury-risk-prompts-recall-of-neutrogena-light-therapy-acne-mask . Health Canada fez recall da MyBlend MyLEDMask [S, detalhes a conferir]. https://recalls-rappels.canada.ca/en/alert-recall/myblend-myledmask . Não achei recall ou aviso de segurança da Omnilux ou da CurrentBody [V, busca]; a CurrentBody Series 2 (MK-90H, K250966) e a Multi-Light (MK-110D, K260715, jun/2026) têm 510(k) [S].

**Potencial de widget (medição):** um "rótulo vs medidor": barras pareadas de irradiância anunciada e medida (usar os números do JAMA Ophthalmology, que são independentes; os de revisores comerciais, só com selo de ressalva). Ou um diagrama estático explicando por que o medidor solar mente (curva do sol vs pico estreito do LED). Este é um caso em que um pequeno interativo ensina: um controle de distância (1, 5, 10, 20 cm) mostrando a irradiância caindo e a dose (J/cm²) que se acumula em 10 minutos, para o leitor ver que "a distância importa mais que o número de LEDs".

---

## 5. Segurança

### 5.1 Olhos e a norma IEC 62471

- **IEC 62471** (segurança fotobiológica de lâmpadas e LEDs) classifica fontes em Grupo de Risco 0 (isento) a 3 (alto risco). O dano retiniano por luz azul é o principal na faixa de 400 a 550 nm; vermelho e infravermelho próximo preocupam mais pelo efeito térmico na retina e pela exposição prolongada [S]. Classificações são conservadoras [S]. https://www.lightingglobal.org/issue_5_eyesafety2_econotes/
- **Para aparelhos oftálmicos** vale a ANSI Z80.36 (Grupo 1: sem risco; Grupo 2: potencialmente perigoso) e, para laser, ANSI Z136.1 [S].
- Ozog (NPR): exposição prolongada a vermelho/infravermelho "poderia danificar a retina"; por isso muitas máscaras vêm com óculos. Algumas pessoas relatam dor de cabeça [S].
- **MAUDE (FDA), relatos para o código OHS** [V]: 109 relatos no total; analisei os 100 retornados: 37 recebidos em 2025 e 46 em 2026 (antes de 2023, 1 a 2 por ano). Palavras nos relatos: "eye" em 38, "burn" em 27, "redness" em 15, "rash" em 9, "blister" em 5. 66 dos 100 são da **Shark CryoGlow** (máscara com LED e resfriamento), muitos enviados em lote em abr/2025 pela empresa sobre eventos ocorridos fora dos EUA (queimação, vermelhidão, inchaço sob os olhos). Exemplos: "usei a máscara depois de tretinoína: rash, queimadura e bolhas" (CurrentBody, 2023); "apliquei a Contour e a pele queimou" (Omnilux, 2024). Ressalvas fortes: MAUDE é notificação passiva, não verificada, não prova causa, e um fabricante que reporta mais aparece mais. Serve para mostrar o **tipo** de problema, não a frequência.
- **Código OLP (acne)** [V]: 51 relatos, concentrados em 2018 a 2021, quase todos da máscara Neutrogena; "eye" em 24, "vision" em 23, "retina" em 8, "headache" em 7, "migraine" em 6.

### 5.2 Miopia infantil (RLRL): o caso mais sério

- **Caso clínico (2023)** [S]: menina de 12 anos com miopia alta, após 5 meses de RLRL, teve queda de acuidade de 20/20 para 20/30 nos dois olhos em cerca de duas semanas, com dano na camada de fotorreceptores na OCT; recuperação parcial (20/25) cerca de 3 meses após parar. Citações conflitam (Liu et al., JAMA Ophthalmology 2023, vs Tian e Xiao, Chinese Journal of Experimental Ophthalmology 2023) [NV, conferir]. O grande ensaio randomizado (Jiang et al., Ophthalmology 2022) não relatou eventos adversos graves nem dano estrutural. https://www.myopiaprofile.com/articles/is-red-light-therapy-safe-and-effective-myopia
- **Teste de bancada independente** [S]: Ostrin LA, Schill AW (Universidade de Houston), JAMA Ophthalmology 2025/2026, doi:10.1001/jamaophthalmol.2025.5660, reportado pela Healio em 30/jun/2026. Quatro aparelhos de miopia, sessão de 180 s, comparados às normas ANSI. Tempo até ultrapassar o Grupo 1 (pupila de 7 mm): **Eyerising 1,4 s**; **Sky-n1201a 2,8 s**; Future Vision 253 s; AirDoc (LED) 22.761 s (mais de 6 horas). Eyerising: irradiância medida de 2,31 mW/cm² a 1 cm (131% acima do limite de 1 mW/cm²) e 1,7 mW/cm² a 10 cm (70% acima); também excedeu a Classe 1 de laser. Resposta da Eyerising (cujo diretor médico é Mingguang He): mais de 110 mil tratados sem lesão retiniana permanente confirmada quando seguido o protocolo; normas pensadas para exposição acidental; cita avaliação própria em preprint não revisado. Ostrin: resposta "justa mas incompleta", toxicidade retiniana sutil pode não aparecer em exame de rotina. Financiamento: National Eye Institute. https://www.healio.com/news/optometry/20260630/some-red-light-therapy-devices-for-myopia-control-may-exceed-safe-exposure-limits
- **China** [S]: a NMPA reclassificou os aparelhos RLRL de miopia de Classe II para Classe III (efeito em 1/jul/2024), revogando as aprovações anteriores; novas regras restringem a crianças de 8 anos ou mais e proíbem uso preventivo; um comentário estima pausa comercial de pelo menos 5 anos. Fontes conflitam sobre se aparelhos LED (não laser) seguem como Classe II. Referência: Wang, Wang e Wong, JAMA Ophthalmology 2025. https://www.myopiaprofile.com/articles/tighter-regulation-rlrl-devices-in-china
- **Gancho para o texto**: o mesmo princípio vendido como "inofensivo" na máscara facial foi apertado ao nível de risco máximo pelo regulador chinês quando apontado direto para a retina de crianças.

### 5.3 Pele, remédios e situações especiais

- **Queimaduras e irritação** [V/S]: aparecem no MAUDE (ver 5.1), especialmente combinadas com ácidos e retinoides (tretinoína). Dermatologista na Elle Brasil recomenda não usar sobre pele tratada com ácidos fortes [S]. Dermatologista em matéria de 2020: uso inadequado pode causar problemas oftalmológicos e queimaduras [S].
- **Remédios fotossensibilizantes** [S, fontes de fabricantes]: tetraciclinas, ciprofloxacino, isotretinoína, tretinoína, alguns quimioterápicos (5-FU, metotrexato); o recall da Neutrogena citou explicitamente quem usa remédios que aumentam a fotossensibilidade ocular [S].
- **Melasma e pigmentação** [S]: Zakia Rahman (Stanford) à NPR: luz visível pode estimular pigmento, mais com comprimentos curtos (azul); uso excessivo pode piorar distúrbios de pigmentação, mais comuns em pele negra e parda. Relevante para o leitor brasileiro.
- **Tumores** [S/NV]: a recomendação comum é não aplicar sobre tumor conhecido ou suspeito sem aval do oncologista; um estudo em camundongos com LED 642 nm estimulou crescimento de tumor de pele; um estudo de 2022 em câncer de cabeça e pescoço não achou impacto da fotobiomodulação nos desfechos oncológicos durante radioterapia. O consenso de 2025 (abaixo) diz que luz vermelha não causa dano ao DNA.
- **Gravidez e tireoide** [NV]: cautela por falta de dados; sobre tireoide (luz no pescoço), as fontes conflitam e nenhuma é de sociedade médica. Não afirmar risco; dizer "não estudado".
- **Camas adaptadas de bronzeamento** [S]: trocar lâmpadas UV por LED vermelho não transforma a cama em aparelho liberado.

**Potencial de widget (segurança):** um "mapa do rosto" estático com o que importa: olhos (óculos, sobretudo se houver luz azul), pele com ácido/retinoide, melasma, pescoço/tireoide (não estudado), gravidez (não estudado). E um quadro do caso da miopia: "segundos até passar do limite seguro" em escala logarítmica (1,4 s, 2,8 s, 253 s, 22.761 s), que é visualmente forte e honesto.

---

## 6. O que dizem dermatologistas e fisioterapeutas (2025 e 2026)

- **Consenso internacional (2025)** [V, resumo]: Maghfour J, Mineroff J, Ozog DM, Jagdeo J, Lim HW, ... Arany PR, Sliney D, ... Tuner J, "Evidence-based consensus on the clinical application of photobiomodulation", Journal of the American Academy of Dermatology 2025 (PMID 40253006). 21 especialistas, revisão sistemática mais Delphi. Conclusões: fotobiomodulação é segura em adultos e a luz vermelha não induz dano ao DNA; é eficaz para neuropatia periférica, alopecia androgenética, úlceras de várias causas, úlceras de pressão, dor de úlcera de pé diabético e radiodermatite aguda. Note que rugas e acne **não** estão na lista de "eficaz" do resumo. (Detalhe da evidência fica com o agente de ciência.)
- **AAD** [S]: luz vermelha é usada para rugas, manchas, flacidez, queda de cabelo e acne; pesquisa não mostrou que cause câncer, ao contrário do UV; "FDA-cleared" na caixa significa baixo risco, não eficácia; "é difícil saber quão eficazes são os aparelhos domésticos"; aparelho de casa não iguala laser de consultório (Samantha Karlin, AAD, à Axios, dez/2024). https://www.aad.org/news/social-media-skin-care-trends e https://www.axios.com/2024/12/04/red-light-therapy-masks-doctor-recommendations
- **NPR, 13/abr/2026** [S]: "não é mágica"; melhora de rugas real mas pequena comparada a laser de consultório; ajuda em mudanças de superfície, não em rugas profundas; benefícios de pele e cabelo exigem meses de uso, várias vezes por semana. Especialistas: Zakia Rahman (Stanford), Praveen Arany (Universidade de Buffalo), David Ozog (Henry Ford Health), Elma Baron (Case Western). https://www.npr.org/2026/04/13/nx-s1-5759287/is-red-light-therapy-healthy-or-all-hype
- **SBD (Brasil)**: não achei posicionamento oficial da Sociedade Brasileira de Dermatologia sobre máscaras de LED [V, busca]. Na imprensa, membros da SBD dizem que o aparelho é seguro e ajuda em acne e linhas finas, mas recomendam avaliação dermatológica, aparelho certificado (ANVISA) e uso constante; outros lembram que máscara doméstica não equivale a equipamento profissional e não substitui protetor solar nem consulta [S]. Frequência citada: 3 a 5 vezes por semana para luz vermelha [S]. Um assessor do departamento de laser ligado à SBD recomendou dias alternados [S]. Revisão publicada nos Anais Brasileiros de Dermatologia (2017): luz azul, sozinha ou com vermelha, foi mais eficaz que clindamicina tópica em acne inflamatória leve a moderada [S]. https://elle.com.br/beleza/mascara-de-led-facial-vale-o-investimento e https://www.opovo.com.br/trends/mascaras-de-led-podem-ajudar-em-acne-e-sinais-da-pele-mas-resultado-depende-muito-do-aparelho-e-da-frequencia/
- **Fisioterapia** [S]: no Brasil, laserterapia/fotobiomodulação é recurso antigo e regulamentado da fisioterapia (COFFITO) e da odontologia (CFO), com cursos e protocolos de dose; é aí que "laserterapia" domina o Trends. A diferença de linguagem é reveladora: o profissional fala em joules por centímetro quadrado; o anúncio fala em "número de LEDs" e "7 cores".
- **Sugestão de fonte a entrevistar** [NV]: pesquisadores do grupo de óptica do IFSC/USP São Carlos (Vanderlei Bagnato), que publicaram "Aplicações Clínicas de Laserterapia" (2026), e a Câmara Técnica de Laserterapia do CROSP. https://www2.ifsc.usp.br/portal-ifsc/wp-content/uploads/2026/01/Aplicacoes-Clinicas-de-Laserterapia-volume-1-1.pdf

**Potencial de widget (vozes):** um "termômetro de consenso" estático: cada uso (rugas, acne, cabelo, dor, feridas, miopia, "energia/longevidade") com a posição de AAD, consenso JAAD 2025, FDA e SBD lado a lado. Deve ser cruzado com o arquivo de evidência científica para não contradizer.

---

## Lacunas e o que conferir antes de publicar

1. Preços no Mercado Livre (o site bloqueou consulta automatizada): olhar à mão, anotar 10 máscaras e 5 painéis, data da consulta.
2. Preço de sessão de LED facial em dermatologia (SP e outra capital).
3. Quantas máscaras LED domésticas têm registro na ANVISA (consulta pública de produtos para saúde).
4. Citação exata do caso clínico de miopia de 2023 e data definitiva do artigo de Ostrin e Schill (doi 2025, cobertura em jun/2026).
5. Gatilho do pico de abril de 2026 (não identificado).
6. Texto do Anexo XVI / Reg. 2022/2346 sobre LED de baixa potência.
7. Preço atual da Dr. Dennis Gross SpectraLite e de Joovv/Mito Red.
