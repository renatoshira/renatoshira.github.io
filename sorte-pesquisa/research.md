# Sorte vs. Habilidade no Sucesso: dossiê de pesquisa

Dossiê de apoio para um ensaio interativo (estilo ciechanow.ski / Nicky Case), inspirado no vídeo do Veritasium "Is Success Luck or Hard Work?" (2020).

**Legenda de confiabilidade**
- **[V]**: verificado na fonte primária (paper, abstract ou PDF lido nesta pesquisa).
- **[S]**: confirmado só em fontes secundárias confiáveis (imprensa, release, resenha).
- **[NV]**: não verificado, ou vindo de memória ou de fonte fraca. Conferir antes de publicar.

---

## 0. O ponto de partida: Veritasium, "Is Success Luck or Hard Work?" (28 ago 2020)

- **Achado:** quando a competição é muito acirrada, mesmo um peso pequeno da sorte determina quem vence. Os vencedores são habilidosos, mas quase sempre também são os mais sortudos.
- **Números [S]:**
  - O exemplo usa a turma de astronautas da NASA de 2017: 18.300 candidatos e 11 selecionados.
  - Modelo: nota = 95% habilidade + 5% sorte, com as duas variáveis uniformes em 0–100.
  - Em 1.000 simulações, em média só **1,6 dos 11** selecionados estariam também no top 11 por habilidade pura. Ou seja, 9 ou 10 dos 11 mudariam se a sorte não existisse.
  - A sorte média dos escolhidos foi **94,7/100**.
- **Fonte:** reconstrução em R com as citações do vídeo: https://www.r-bloggers.com/2022/05/the-success-paradox-why-even-a-little-bit-of-luck-often-beats-skill/ . Data do vídeo: TVmaze, https://www.tvmaze.com/episodes/2777621/veritasium-2020-08-28-is-success-luck-or-hard-work/cast
- **Ressalvas:**
  - Com distribuição uniforme, o topo fica "achatado" e há muitos empatados perto de 100. Com habilidade normal (caudas finas), o efeito diminui, mas não some.
  - O vídeo também menciona a pesquisa sobre viés de crença na sorte e a ideia de que reconhecer a sorte torna as pessoas mais generosas, ligando ao Frank (ver C).
- **Vídeo de 2025:** "You've (Likely) Been Playing The Game of Life Wrong", Veritasium, 26 nov 2025 [S, só título, data e tagline "The world is not Normal"]. O conteúdo (lei de potência, ergodicidade, Kelly) é [NV]: não achei transcrição. https://www.tvmaze.com/episodes/3455487/veritasium-2025-11-26-youve-likely-been-playing-the-game-of-life-wrong
- **Potencial de widget:** ★★★ "Seleção de astronautas". Sliders para nº de candidatos, nº de vagas e % de sorte. O leitor vê quantos dos escolhidos mudariam e a sorte média dos vencedores.

---

## A. Modelos e matemática

### A1. Pluchino, Biondo & Rapisarda, "Talent vs Luck: the role of randomness in success and failure" (2018)

- **Achado:** num modelo em que o talento é gaussiano e os ganhos são multiplicativos, quem chega ao topo quase nunca é o mais talentoso. São indivíduos de talento mediano, mas bem mais sortudos.
- **Regras exatas do modelo [V]** (ar5iv, seção 2):
  - **Agentes:** N = 1000, fixos num grid 201×201 toroidal.
  - **Talento:** T_i ~ Normal(média 0,6; dp 0,1), truncado em [0,1] e constante ao longo da vida.
  - **Eventos:** 500 eventos móveis, 50% sortudos e 50% azarados. Cada evento anda 2 casas por passo em direção aleatória e atinge um agente num raio de 1 casa.
  - **Capital inicial:** C(0) = 10 para todos.
  - **Evento sortudo:** o capital **dobra** se rand < T_i (talento = probabilidade de aproveitar a oportunidade). Caso contrário, nada acontece.
  - **Evento azarado:** o capital **cai pela metade**, independentemente do talento.
  - **Tempo:** passo = 6 meses, 80 passos = 40 anos de vida profissional (dos 20 aos 60 anos). Atenção: não são "80 anos".
- **Resultados [V]:**
  - **Rodada única:** a cauda é uma lei de potência com inclinação −1,27, e só 4 agentes passam de 500 unidades.
    - O mais rico tem C = 2560 com T = 0,61, praticamente a média.
    - O **mais talentoso** (T = 0,89) termina com **C = 0,625**, abaixo do capital inicial.
    - Os 20 mais ricos detêm 44% do capital.
    - Sobre o 80/20, o paper se contradiz: o texto diz que os 80% de baixo têm 20% do capital, e a legenda da Fig. 3 diz que os 20% de cima têm 80%. Na prática é "aproximadamente Pareto".
  - **100 rodadas:** o melhor desempenho geral foi T = 0,6048 com C = 40.960.
    - Agentes com T > 0,8 (média + 2 dp) só foram os mais bem-sucedidos em **3%** dos casos.
    - O capital médio dos mais talentosos (~63) é maior que o dos medianos (~33). O talento ajuda **na média**, mas não decide o topo.
  - **10.000 rodadas:** o talento dos campeões segue uma gaussiana com média 0,667 e dp 0,09, só um pouco acima da média da população.
  - **Políticas de financiamento:** dar um pouco a todos ("igualitária", 1 unidade a cada 5 anos) foi a estratégia mais eficiente para fazer talentosos terem sucesso. P_T sobe de 32% para 69%, contra menos de 20% de ganho nas estratégias "elitistas" (dar a quem já teve sucesso). A loteria aleatória também supera o elitismo.
- **Método:** simulação baseada em agentes (NetLogo).
- **Fontes:** https://arxiv.org/abs/1802.07068 ; texto completo em https://ar5iv.labs.arxiv.org/html/1802.07068 ; Advances in Complex Systems 21(03n04), 1850014.
  - Follow-up: Challet, Pluchino, Biondo & Rapisarda (2020), "The origins of extreme wealth inequality in the Talent vs Luck Model", https://arxiv.org/abs/1907.04237 . Mostra que a desigualdade extrema surge mesmo só com eventos sortudos e taxas heterogêneas, ou seja, vem da dinâmica multiplicativa.
- **Ressalvas:**
  - (1) A conclusão está embutida nas premissas:
    - a dispersão do talento é pequena (dp 0,1, e o talento só entra como probabilidade de aproveitar um evento);
    - o azar atinge todos igualmente;
    - não há esforço, aprendizado nem escolha de onde ficar;
    - os agentes são fixos, e quem estiver numa vizinhança "quente" ganha.
  - (2) É um modelo de brinquedo. Os próprios autores e críticos (blogs) dizem que não serve para política pública sem calibração.
  - (3) Os "3%" vêm de só 100 rodadas e são fáceis de exagerar na leitura: não significam que "97% do sucesso é sorte".
  - (4) Não achei uma crítica acadêmica formal publicada contra o modelo [NV], só comentários de blog. Uma crítica comum: se o talento também reduzisse o impacto do azar, ou se agentes talentosos buscassem mais eventos, o resultado mudaria muito.
- **Potencial de widget:** ★★★ É **o** widget central. O grid com agentes (cor = talento, tamanho = capital) e pontos verdes e vermelhos passeando, com sliders de dp do talento, % de eventos sortudos, nº de eventos e "o talento também protege contra o azar?". Painel final: "o mais talentoso terminou em X° lugar". Botão "rodar 100 mundos" com histograma do talento dos campeões.

### A2. Mauboussin, *The Success Equation* (2012): o continuum sorte–habilidade

- **Achado:** todo resultado observado é habilidade mais sorte. Dá para estimar a fração de sorte numa liga comparando a variância real dos aproveitamentos com a variância que haveria se todos os jogos fossem cara ou coroa.
- **Fórmula:**
  - var(observado) = var(habilidade) + var(sorte), logo var(sorte) ≈ p(1−p)/n para n jogos com p = 0,5.
  - Fração de sorte ≈ var(sorte)/var(observado). Vem da "true score theory", via Tom Tango (sabermetria).
- **Números (fração de sorte na classificação de temporada) [S]:**
  - **NBA ~12%**
  - **Premier League ~31%**
  - **MLB ~34%**
  - **NFL ~38%**
  - **NHL ~53%**
  - Janelas de anos aproximadas: 2007–2012, segundo blogs.
  - Recálculos independentes deram NBA 13,4% (2024) e NHL 47,7%.
  - **Por que o basquete é tão "habilidoso":** são muitas posses por jogo (n grande, logo menos ruído), placares altos e poucos jogadores que tocam muito na bola. No hóquei e no futebol há poucos gols, então um único lance aleatório decide.
- **Fontes:**
  - Resumos: https://fs.blog/untangling-skill-and-luck/ , https://optimumsportsperformance.com/blog/the-role-of-skill-vs-luck-in-team-sport-winning/
  - Replicação: https://aidanconnerly.github.io/blog/2024/09/untangling-luck-skill-sports/
  - Crítica (Phil Birnbaum): mais sorte no resultado não significa jogadores menos habilidosos, http://blog.philbirnbaum.com/2013/02/more-luck-in-outcomes-doesnt-imply-less.html
  - Ludometrics (arXiv): https://arxiv.org/pdf/1811.00673
- **Ressalvas:**
  - Os percentuais exatos não foram lidos no livro [S]. A ordem NBA < futebol/MLB/NFL < NHL é robusta.
  - A medida depende do nº de jogos da temporada: com n maior, a sorte cai.
  - Exige calendário balanceado.
  - Para o Brasileirão não há número publicado [NV]. **Dá para calcular nós mesmos** com tabelas históricas (38 rodadas, vitória = 3 pontos: precisa adaptar para pontos, não p).
- **Potencial de widget:** ★★★ Uma "liga de moedas". O leitor escolhe a liga, vê a distribuição real dos aproveitamentos sobreposta à de uma liga 100% cara-ou-coroa e lê a % de sorte. Slider de "nº de jogos" mostra a sorte encolhendo.

### A3. O paradoxo da habilidade (Gould e o rebatedor .400)

- **Achado:** quando todos ficam mais habilidosos, a dispersão da habilidade encolhe, e a sorte (de variância constante) passa a decidir mais.
- **Números [S]:**
  - Ted Williams rebateu **.406 em 1941**, o último acima de .400 na MLB.
  - A média de rebatidas fica estável em ~.260, mas o **desvio padrão caiu de forma quase regular** ao longo do século XX (Gould, "Entropic Homogeneity Isn't Why No One Hits .400 Any More", Discover, ago 1986; *Full House*, 1996).
  - Mauboussin aplica isso a fundos de investimento: a dispersão de alfa entre gestores caiu.
- **Fontes:** https://en.wikipedia.org/wiki/Full_House:_The_Spread_of_Excellence_from_Plato_to_Darwin ; https://fs.blog/the-paradox-of-skill/ ; https://knowledge.wharton.upenn.edu/article/michael-mauboussin-on-the-success-equation/
- **Ressalvas:**
  - Os dados de Gould iam só até ~1983. Baseball Prospectus confirma a tendência depois.
  - Miceli (2005) propõe uma explicação alternativa: triagem melhor no extremo inferior, https://media.economics.uconn.edu/working/2005-15.pdf
- **Potencial de widget:** ★★★ Duas distribuições sobrepostas (habilidade e sorte). O slider "o mundo fica mais habilidoso" encolhe a dispersão da habilidade, e a % de vezes que "o melhor vence" despenca.

### A4. Regressão à média (Galton, Kahneman, capa da Sports Illustrated)

- **Achado:** se o resultado = habilidade + sorte, quem teve resultado extremo provavelmente teve sorte (ou azar) extrema, e a próxima medição tende a voltar para perto da média. Isso cria ilusões causais.
- **Galton (1886)** [NV-memória]: "Regression towards mediocrity in hereditary stature". Filhos de pais muito altos são altos, mas menos que os pais. O coeficiente é ~2/3.
- **Kahneman e os instrutores de voo [S]:**
  - Na Força Aérea de Israel, um instrutor disse que elogiar uma boa manobra piorava a seguinte, e que gritar após uma ruim fazia melhorar.
  - Kahneman: "certo, mas completamente errado". Era regressão à média.
  - Demonstração: cada instrutor jogou moedas num alvo duas vezes, e quem foi melhor na 1ª piorou na 2ª.
  - Fonte: *Thinking, Fast and Slow*, cap. 17; https://www.litcharts.com/lit/thinking-fast-and-slow/part-2-chapter-17
- **Equação de Kahneman [S]:**
  - "Success = talent + luck. Great success = a little more talent + a lot of luck."
  - Resposta ao "favorite equation" da Edge, também em TF&S. Algumas fontes trazem "some talent".
  - https://alearningaday.blog/2019/02/08/daniel-kahnemans-success-equations/
- **Capa da Sports Illustrated ("jinx") [S]:**
  - Atletas vão para a capa após uma fase excepcional e depois "caem". É regressão à média.
  - A própria SI fez uma matéria em 2002 (Alexander Wolff, "That Old Black Magic", 21 jan 2002) com análise das capas.
  - O número frequentemente citado, ~37% de "azarados" em ~2.456 capas, é **[NV]**.
  - https://en.wikipedia.org/wiki/Sports_Illustrated_cover_jinx
- **Potencial de widget:** ★★★ "Os instrutores de voo". O leitor "treina" 20 pilotos (habilidade fixa + ruído), elogia ou grita, e o gráfico mostra que o grito "funciona" mesmo sem efeito causal nenhum. Variante: escolha os 10 melhores da temporada 1 e veja-os na temporada 2.

### A5. "As caudas se separam" (tails come apart)

- **Achado:** mesmo com correlação forte entre talento e resultado, o melhor no resultado raramente é o melhor no talento. Geometricamente, a nuvem de pontos é uma elipse, e o canto extremo de um eixo não coincide com o do outro.
- **Exemplo:** milhares de homens americanos são mais altos que o jogador médio da NBA e não estão na NBA.
- **Fonte:** "Why the tails come apart", LessWrong (2014; autor "Thrasymachus" [NV]), https://www.lesswrong.com/posts/dC7mP5nSwvpL65Qu5/why-the-tails-come-apart
- **Ressalvas:** é um post, não um paper, mas a matemática (correlação < 1 implica regressão nas caudas) é padrão.
- **Potencial de widget:** ★★★ Gráfico de dispersão talento × sucesso com slider de correlação ρ e um destaque para "o mais talentoso" e "o mais bem-sucedido". Contador: "% de vezes em que são a mesma pessoa" (com N = 1000 e ρ = 0,7, raramente são).

### A6. Efeito Mateus e vantagem cumulativa (Merton, 1968)

- **Achado:** cientistas já eminentes recebem crédito desproporcional, e os desconhecidos recebem pouco por contribuições comparáveis. "A todo aquele que tem, será dado."
- **Método [S]:** entrevistas de Harriet Zuckerman com laureados do Nobel nos EUA. Merton mais tarde admitiu que ela deveria ter sido coautora.
- **Fonte:** Merton, *Science* 159:56–63 (1968), https://pubmed.ncbi.nlm.nih.gov/5634379 ; PDF: https://inst.eecs.berkeley.edu/~cs298-7/fa21/readings/matthew.pdf . Rossiter (1993), "Matilda effect".
- **Potencial de widget:** ★★ Uma urna de Pólya: cada bola tirada adiciona outra da mesma cor. O leitor vê pequenas diferenças iniciais virarem abismos.

### A7. Ergodicidade e crescimento multiplicativo (Ole Peters)

- **Achado:** em processos multiplicativos, a média sobre o conjunto (muitas pessoas) é diferente da média no tempo (uma pessoa ao longo da vida). Uma aposta com valor esperado positivo pode levar quase todo mundo à ruína, enquanto uns poucos sortudos ficam com quase tudo.
- **Exemplo canônico [NV, conferir figura do paper]:**
  - Cara: +50%. Coroa: −40%.
  - Valor esperado por rodada: +5% (0,5·1,5 + 0,5·0,6 = 1,05).
  - Crescimento no tempo: √(1,5·0,6) = √0,9 ≈ 0,949, ou seja, **−5,1% por rodada**.
  - Depois de muitas rodadas, a média da população cresce, mas a mediana vai a zero.
- **Fonte:**
  - Peters, "The ergodicity problem in economics", *Nature Physics* 15, 1216 (2019), doi:10.1038/s41567-019-0732-0 (há uma Author Correction).
  - https://www.sciencedaily.com/releases/2019/12/191202113024.htm ; https://ergodicityeconomics.com
- **Ressalvas:**
  - É controverso entre economistas. Críticos dizem que é utilidade logarítmica reembalada, ou que não gera previsões falsificáveis, ver https://buttondown.com/mdickens/archive/against-ergodicity-economics/ .
  - A matemática do exemplo da moeda é incontestável.
  - Conecta com A1: o modelo de Pluchino é multiplicativo (dobrar ou dividir por dois), e é isso que gera a lei de potência.
- **Potencial de widget:** ★★★ Um "cassino de Peters". O leitor joga a moeda 100 vezes com 1 pessoa, depois com 10.000. Gráfico em escala log: a média sobe, a mediana afunda, e 1% dos jogadores fica com quase toda a riqueza. Slider para "apostar só uma fração do patrimônio", que mostra Kelly salvando a mediana.

### A8. Frank: torneios grandes, sorte pequena

- **Achado [S]:**
  - Desempenho = 98% habilidade + 2% sorte.
  - Com **1.000** competidores, o mais habilidoso vence só **~22%** das vezes.
  - Com **100.000**, só **~6%**.
- **Fonte:** Robert H. Frank, *Success and Luck: Good Fortune and the Myth of Meritocracy* (Princeton UP, 2016). Resumo: https://www.fa-mag.com/news/why-luck-plays-a-big-role-in-making-you-rich-28775.html
- **Ressalvas:** os parâmetros vêm de um resumo de imprensa. Conferir o apêndice do livro.
- **Potencial de widget:** ★★★ É o mesmo widget dos astronautas, com o eixo X = tamanho do torneio. Mostra que **quanto maior a competição, mais a sorte decide**, mesmo com peso fixo.

---

## B. Experimentos e experimentos naturais

### B1. Salganik, Dodds & Watts, MusicLab (Science, 2006)

- **Achado:** a influência social (ver quantos baixaram) aumenta tanto a **desigualdade** quanto a **imprevisibilidade** do sucesso. A qualidade importa só em parte.
- **Números [V]:**
  - **14.341** participantes, a maioria vinda de um site para adolescentes.
  - **48 músicas** de bandas desconhecidas.
  - **1 mundo independente** (~1.400 pessoas, 20%) e **8 mundos de influência social** (~700 cada, 10% cada).
  - Exp. 1: grade 16×3 em ordem aleatória, com contagem. Exp. 2: lista ordenada por popularidade, um sinal social mais forte.
  - Nos 8 mundos sociais, o Gini foi maior que no independente, e mais ainda no Exp. 2.
  - Citação do paper: "the 'best' songs never do very badly, and the 'worst' songs never do extremely well, but almost any other result is possible."
- **Exemplo famoso [NV]:** a música "Lockdown", da banda 52metro, teria ficado em 26º/48 em qualidade, 1ª num mundo e 40ª em outro (de um ensaio de Watts no NYT, 2007). Não confirmei.
- **Follow-up [S]:** Salganik & Watts (2008), "Leading the Herd Astray", *Social Psychology Quarterly* 71(4), com 12.207 participantes.
  - Eles **inverteram** o ranking de popularidade, e a maioria das músicas virou profecia autorrealizável.
  - As melhores músicas recuperaram a posição no longo prazo, e o total de downloads caiu.
  - https://journals.sagepub.com/doi/10.1177/019027250807100404
- **Fonte:** https://pdodds.w3.uvm.edu/research/papers/years/2006/salganik2006a.pdf ; *Science* 311:854–856. Dados: https://oprdata.princeton.edu/Archive/cm
- **Ressalvas:**
  - Público adolescente, músicas desconhecidas, mercado artificial.
  - No mundo real, marketing e mídia amplificam ainda mais.
- **Potencial de widget:** ★★★ "Rebobine a história". O leitor vota numa mini-parada de 10 músicas (ou memes), o widget roda 8 mundos paralelos com agentes que copiam a popularidade, e mostra o mesmo hit em 1º num mundo e em 8º noutro. É o experimento mais "explorável" da lista.

### B2. van de Rijt, Kang, Restivo & Patil, "Field experiments of success-breeds-success dynamics" (PNAS, 2014)

- **Achado:** dar um pequeno sucesso inicial **aleatório** gera mais sucesso depois, em 4 plataformas reais. Mas há retornos decrescentes: empurrões maiores não geram muito mais.
- **Números [S]:**
  - **Kickstarter:** 100 de 200 projetos receberam uma doação pequena dos pesquisadores, e os "sortudos" atraíram mais que o dobro de doações seguintes.
    - Follow-up: com 0 doadores, 32% atraíram financiamento; com 1, 74%; com 4, 87%.
  - **Epinions:** avaliações "muito útil" dadas aleatoriamente ainda rendiam mais avaliações positivas 2 semanas depois.
  - **Wikipedia:** prêmios (barnstars) dados a editores produtivos aleatórios fizeram os premiados acumular mais prêmios 3 meses depois.
  - **Change.org:** algumas assinaturas a mais aumentaram o apoio.
- **Fonte:** PNAS 111(19):6934–6939, https://www.eui.eu/Documents/DepartmentsCentres/SPS/Profiles/Van-de-Rijt/PNAS-2014-van-de-Rijt-6934-9-11.pdf
- **Ressalvas:**
  - Uma replicação de 2016 (*Sociological Science*) com 200 petições **não** achou efeito de assinaturas dadas pelos experimentadores. O estudo original pode ter tido pouco poder estatístico.
  - Os autores concluem que o papel da vantagem cumulativa é "mais modesto do que se pensava".
- **Potencial de widget:** ★★ Dois projetos idênticos de crowdfunding, um com uma doação inicial grátis. O leitor clica "avançar dia" e vê as trajetórias divergirem.

### B3. Bol, de Vaan & van de Rijt, "The Matthew effect in science funding" (PNAS, 2018)

- **Achado:** cientistas holandeses em início de carreira que ficaram **logo acima** da nota de corte da bolsa Veni (NWO) acumularam muito mais financiamento depois que os que ficaram **logo abaixo**, mesmo com propostas praticamente idênticas.
- **Números [S]:**
  - Os vencedores marginais receberam **mais que o dobro** do financiamento posterior em 8 anos (~**€180.000 a mais**).
  - Tiveram também chance ~**47–50% maior** de virar professor titular.
  - Parte do efeito vem de os perdedores **pararem de se candidatar**.
  - Os autores não acharam evidência de que o efeito viesse da produção gerada pela bolsa. É status e credencial.
- **Método:** regressão descontínua em torno da nota de corte (rodadas de 2000–2008).
- **Fonte:** PNAS 115(19):4887–4890, doi:10.1073/pnas.1719557115 ; https://pmc.ncbi.nlm.nih.gov/articles/PMC5948972 ; https://newsroom.haas.berkeley.edu/research/matthew-effect-how-early-career-wins-yield-large-and-lasting-advantages-2/
- **Ressalvas:** é uma amostra de um país e um programa, e a janela perto do corte é pequena. É de qualquer forma um dos desenhos causais mais limpos sobre vantagem cumulativa.
- **Potencial de widget:** ★★★ "A linha de corte". Duas pesquisadoras com nota 7,49 e 7,51, e uma linha do tempo de 8 anos que se abre em leque. O leitor arrasta o corte e vê quem vira "estrela".

### B4. Sinatra, Wang, Deville, Song & Barabási, "Quantifying the evolution of individual scientific impact" (Science, 2016)

- **Achado (regra do impacto aleatório):** o artigo de maior impacto de um cientista pode ser **qualquer um** da sequência: o primeiro, o do meio ou o último, com igual probabilidade. Os picos parecem cedo na carreira só porque a produtividade é maior cedo.
- **Modelo Q:**
  - Impacto de um paper = Q_i × p, onde p é a "sorte" da ideia (igual para todos) e Q_i é um parâmetro individual **constante ao longo da carreira**.
  - Q prevê impacto futuro, mas Barabási admite não saber de onde Q vem.
- **Números [S/V parcial]:**
  - A análise principal usa 2.887 físicos (dados APS), com validação em outras áreas.
  - A medida é c10 (citações após 10 anos).
- **Fonte:** *Science* 354(6312), aaf5239; https://barabasi.com/media/pub_imports/files/825.pdf ; https://www.sciencedaily.com/releases/2016/11/161103142438.htm ; crítica: https://scholarlykitchen.sspnet.org/2016/11/09/is-publication-success-a-matter-of-dumb-luck/
- **Ressalvas:**
  - O modelo ignora instituição e formação.
  - "Aleatório" quer dizer que a posição na sequência de papers é uniforme, não que o impacto seja só sorte (Q importa muito).
- **Potencial de widget:** ★★ "Onde estará sua obra-prima?" Uma carreira de 50 papers como barras. O leitor "aposta" onde está o maior, e o widget mostra que a posição é uniforme. Mensagem: continue tentando (é a mensagem prática mais esperançosa do ensaio).

### B5. Liu et al., "Hot streaks in artistic, cultural, and scientific careers" (Nature, 2018)

- **Achado:** os melhores trabalhos se aglomeram numa "fase quente" que surge aleatoriamente na carreira, sem aumento de produtividade.
- **Números [V]:**
  - Amostra: 3.480 artistas (leilões), 6.233 diretores (IMDB) e 20.040 cientistas.
  - Têm ao menos uma fase quente: **91%** dos artistas, **82%** dos diretores e **90%** dos cientistas.
  - A maioria tem só uma (64% dos artistas, 80% dos diretores e 68% dos cientistas, entre quem tem alguma). Cerca de 30% dos artistas e cientistas têm duas, e só 11% dos diretores.
  - Duração típica: **5,7 anos** (artistas), **5,2** (diretores), **3,7** (cientistas), ~20% da carreira.
  - As duas obras mais importantes de um artista têm 1,48× mais chance de serem consecutivas que o esperado ao acaso.
  - A produtividade **não** aumenta durante a fase quente.
- **Fonte:** *Nature* 559:396–399; https://arxiv.org/abs/1712.01804
- **Potencial de widget:** ★★ A linha de uma carreira com um trecho que "acende" em posição aleatória. O leitor tenta adivinhar quando vai começar.

### B6. Barabási, *The Formula: The Universal Laws of Success* (2018)

- **Achado:** "sucesso é um fenômeno coletivo", a reação da rede ao seu desempenho. As 5 leis:
  1. O desempenho impulsiona o sucesso, mas quando o desempenho não pode ser medido, as redes impulsionam o sucesso.
  2. O desempenho é limitado, o sucesso não (lei de potência).
  3. Sucesso prévio × aptidão = sucesso futuro (o efeito Mateus modulado pela qualidade).
  4. Em equipes, um único indivíduo leva o crédito.
  5. Com persistência, o sucesso pode vir a qualquer hora (regra Q/impacto aleatório).
- **Fonte:** https://barabasi.com/book . O enunciado exato das leis é **[NV]**: conferir no livro.
- **Ressalvas:** é livro de divulgação. Exemplo interessante dele: vinhos e ciclistas mostram que, quando o desempenho é mensurável (tempo de prova), a rede importa pouco. Já em arte (Barabási et al., *Science* 2018, Fraiberger et al.), o acesso inicial a galerias de prestígio prediz a carreira.
- **Potencial de widget:** ★ Um widget conceitual que separa "desempenho mensurável" de "não mensurável".

### B7. Richard Wiseman, *The Luck Factor* (2003)

- **Achado:** "sortudos" e "azarados" (autodeclarados) diferem em atenção e abertura, o que gera mais oportunidades percebidas.
- **Experimento do jornal [S]:**
  - Participantes contavam as fotos de um jornal.
  - Na página 2 havia um anúncio de meia página: "Pare de contar. Há 43 fotos neste jornal."
  - Os "azarados" levavam em média ~2 minutos, os "sortudos" segundos.
  - Um segundo anúncio dizia "Diga ao pesquisador que viu isto e ganhe £250", e os azarados tendiam a não ver.
  - Fontes divergem na posição do anúncio (p. 2 ou após ~3 páginas) e no prêmio (£150 ou £250).
- **Pesquisa:** ~400 voluntários entrevistados ao longo de ~10 anos.
- **"Luck School":** 4 princípios:
  - maximizar oportunidades;
  - ouvir intuições;
  - esperar boa sorte;
  - transformar azar em sorte.
  - **80%** disseram se sentir mais felizes, satisfeitos **e mais sortudos** após um mês.
- **Fontes:** coluna do autor no Telegraph (2003), resumo em https://www.wilsonquarterly.com/quarterly/_/how-get-lucky/ ; https://www.damninteresting.com/you-make-your-own-luck/
- **Ressalvas:**
  - Não há paper revisado por pares com os números do teste do jornal [NV].
  - A "sorte" na Luck School é **autorrelatada**, sem grupo controle robusto.
  - Há demand effects evidentes. É uma história ótima e uma evidência fraca.
- **Potencial de widget:** ★★★ Reproduzir o teste: "conte os pontos/fotos nesta página", com uma mensagem escondida à vista ("pare de contar, são 43"). Mede o tempo do leitor e revela no fim. É perfeito como experimento com o leitor.

### B8. Loterias como experimentos naturais de riqueza

- **Suécia: Cesarini, Lindqvist, Östling & Wallace (QJE, 2016) [S]:**
  - Prêmios de loteria aleatórios **não** afetaram a mortalidade adulta nem a maioria dos resultados dos filhos (notas, habilidades, drogas).
  - Houve leve efeito no uso de saúde e na obesidade infantil.
  - Conclusão: em países ricos com rede de proteção, o gradiente riqueza→saúde ou riqueza→desempenho dos filhos **não é causal** em grande parte.
  - https://ideas.repec.org/a/oup/qjecon/v131y2016i2p687-738..html
- **Geórgia, 1832: Bleakley & Ferrie (QJE, 2016) [S]:**
  - Na Cherokee Land Lottery, quase todos os homens brancos adultos concorreram, e o prêmio ≈ riqueza mediana.
  - Os filhos dos vencedores **não** tiveram mais escolaridade, riqueza ou renda, e os netos não tiveram mais alfabetização.
  - https://www.nber.org/papers/w19348
- **Leitura para o ensaio:** a sorte do dinheiro sozinha não transmite vantagem pela educação. A vantagem dos ricos vem de outros canais (redes, exposição, ver Chetty). É uma nuance importante contra uma leitura simplista do "tudo é sorte".
- **Potencial de widget:** ★ Texto, com um gráfico simples de "vencedores vs. não vencedores".

### B9. Loteria do alistamento do Vietnã (Angrist, AER 1990)

- **Achado [S]:**
  - O número sorteado pela data de aniversário determinava o risco de convocação.
  - No início dos anos 1980, veteranos brancos ganhavam **~15% menos** que não veteranos comparáveis, sobretudo por perder experiência no mercado civil.
  - Angrist & Chen (2011), com o Censo de 2000, acharam efeito perto de **zero** na meia-idade.
- **Fonte:** AER 80(3):313–336, https://ideas.repec.org/a/aea/aecrev/v80y1990i3p313-36.html ; https://www.nber.org/papers/w13411.pdf
- **Ressalvas:** houve uma errata nas figuras, e o texto não foi afetado.
- **Potencial de widget:** ★★ "Sorteie sua data de nascimento". Um globo com 366 bolinhas, onde o leitor descobre se teria sido convocado em 1969.

### B10. Loterias de admissão escolar (Chicago)

- **Achado [S]:**
  - Cullen, Jacob & Levitt (*Econometrica*, 2006): ganhar a loteria para uma escola de ensino médio "melhor" **não** melhorou as medidas tradicionais de desempenho acadêmico.
  - Reduziu, porém, problemas disciplinares e prisões: −5,1 p.p. em prisões autodeclaradas, ~60% de queda sobre uma base de 9%.
- **Fonte:** https://econometricsociety.org/publications/econometrica/2006/09/01/effect-school-choice-participants-evidence-randomized-lotteries
- **Ressalvas:** escolas charter em Boston e NY (Abdulkadiroğlu, Angrist, Dobbie & Fryer) mostram efeitos acadêmicos grandes. O resultado depende do tipo de escola [NV, não detalhado aqui].
- **Potencial de widget:** ★ Texto.

### B11. Sobrenome e posse em economia (Einav & Yariv, JEP 2006)

- **Achado [S]:**
  - Nos 35 melhores departamentos de economia dos EUA, docentes com sobrenome de **inicial mais cedo no alfabeto** tinham mais chance de estabilidade (tenure) nos top-10, e mais chance de virar fellow da Econometric Society. Houve efeito mais fraco no Clark Medal e no Nobel.
  - O efeito se mantém com controles de país de origem, etnia e religião.
  - **Mecanismo:** autoria em ordem alfabética na economia (o "Aaron et al." aparece primeiro na citação).
  - **Placebo:** em psicologia, onde a ordem de autoria não é alfabética, **não há efeito**.
- **Fonte:** *J. Econ. Perspectives* 20(1):175–188, https://ideas.repec.org/a/aea/jecper/v20y2006i1p175-188.html
- **Ressalvas:** o efeito some na amostra ampla (top-35 inteiro). Os coeficientes exatos não foram lidos.
- **Potencial de widget:** ★★ "Digite seu sobrenome". O widget mostra onde você ficaria numa lista alfabética de coautores ("et al."). É divertido e pessoal.

### B12. Nomes fáceis de pronunciar (Laham, Koval & Alter, JESP 2012)

- **Achado [S]:**
  - Em 5 estudos, nomes mais fáceis de pronunciar são avaliados mais positivamente.
  - No **Estudo 5**, com ~500 advogados de escritórios dos EUA, quem tinha sobrenome mais fácil ocupava **posições mais altas** na hierarquia.
  - O efeito independe do comprimento, da estranheza ou de o nome soar estrangeiro.
- **Fonte:** *J. Exp. Soc. Psych.* 48(3):752–756, "The name-pronunciation effect: Why people like Mr. Smith more than Mr. Colquhoun"; https://www.stern.nyu.edu/experience-stern/faculty-research/adam-alter-names-study ; https://freakonomics.com/2012/02/bad-news-for-people-with-hard-to-pronounce-names/
- **Ressalvas:** o estudo de campo é correlacional, e o número de escritórios é [NV].
- **Potencial de widget:** ★ Pode virar um "teste de fluência" do nome do leitor, mas há risco de soar frívolo.

### B13. Mês de nascimento e idade relativa (esporte e escola; dados do Brasil)

- **Achado:** quem nasce logo após a data de corte é o mais velho da turma, parece mais talentoso aos 8–10 anos, recebe mais treino e seleção, e a vantagem se autorreforça.
- **Hóquei canadense [S]:**
  - Barnsley, Thompson & Legault (1985), "Hockey success and birthdate: The relative age effect", CAHPER Journal.
  - Popularizado em *Outliers*. Um levantamento ESPN citado: ~37% dos melhores patinadores norte-americanos de uma classe do draft nasceram no 1º trimestre.
  - A própria ESPN e estudos como Gibbs et al. (2011) sugerem **reversão** no topo (NHL): os nascidos tarde que sobrevivem tendem a ser melhores.
  - https://www.smithsonianmag.com/smart-news/the-stupid-reason-the-nhl-drafts-older-players-first-20180/
- **Brasil, futebol [V abstract]:**
  - Na base do **São Paulo FC** (n = 341, sub-10 ao sub-20), **47,5%** nasceram no 1º trimestre (jan–mar) e só **8,8%** no 4º (out–dez), contra a distribuição de 5,48 milhões de nascidos vivos em SP (χ² = 29,53, p < 0,0001).
  - Fonte: *Rev. Bras. Cineantropom. Desempenho Hum.* 16(4):399 (2014), https://periodicos.ufsc.br/index.php/rbcdh/article/view/1980-0037.2014v16n4p399
  - Há também estudos com 868 jogadores de clubes brasileiros (tendência ao 1º semestre) e com o futsal brasileiro (sobrerrepresentação dos 1º e 2º quartis).
- **Brasil, escola [S]:**
  - A data de corte nacional é **31 de março** (6 anos completos para entrar no 1º ano). Antes de 2018, cada estado definia a sua.
  - Menezes-Filho, Herdeiro & Oliveira (Insper), "The Effect of Age at School Entry on Education and Labor Market Outcomes: A Regression Discontinuity Analysis", usam Inep 2007–2017 e encontram melhor desempenho para quem entra mais velho. Os números são [NV] (página do Insper retornou 403).
  - https://www.insper.edu.br/pt/conteudos/politicas-publicas/alunos-que-entram-depois-no-ensino-fundamental-tem-melhor-desempenho-escolar
- **Potencial de widget:** ★★★ "Digite seu mês de nascimento". O widget mostra sua idade relativa na turma e, num gráfico de barras por trimestre, a sua posição na base do São Paulo FC. É o gancho brasileiro perfeito.

### B14. Chetty et al., "Lost Einsteins" (QJE, 2019) e mobilidade

- **Achado [S]:**
  - Com 1,2 milhão de inventores (patentes de 1996–2014 ligadas a dados fiscais), filhos de pais no **top 1%** de renda têm **10× mais chance** de virar inventores que filhos de pais abaixo da mediana.
  - **Crianças de baixa renda no top 5% em matemática no 3º ano não têm mais chance de virar inventoras que crianças ricas abaixo da média** em matemática.
  - Mecanismo: a **exposição** à inovação na infância (crescer perto de inventores, na mesma área tecnológica). Se as meninas tivessem a mesma exposição a inventoras que os meninos têm a inventores, a diferença de gênero cairia pela metade.
  - Se mulheres, minorias e pobres inventassem na taxa dos homens brancos ricos, a inovação nos EUA **quadruplicaria**.
- **Fonte:** Bell, Chetty, Jaravel, Petkova & Van Reenen, QJE 134(2) (2019); NBER w24062; https://opportunityinsights.org/innovation/
- **Ressalvas:** patentes são uma medida estreita de inovação, e a exposição é causal só via desenho de mudança de cidade.
- **Potencial de widget:** ★★★ Duas crianças com a mesma nota em matemática e CEPs diferentes. Um gráfico de barras com a "taxa de inventores por 1.000" e um slider de renda dos pais. Os valores por 1.000 são [NV]: pegar a figura do paper.

### B15. Gladwell, *Outliers* (2008): quão sólidos são os exemplos?

- **Bill Gates e Lakeside [S]:**
  - Em 1968, o Clube de Mães da escola Lakeside comprou (ou alugou, as fontes divergem) um terminal Teletype ASR-33 com acesso a tempo compartilhado.
  - O valor de ~US$3.000 é [NV].
  - É um fato histórico sólido. A tese de que Gates teve acesso **raríssimo** em 1968 é plausível.
  - https://tatler.lakesideschool.org/7088/science-technology/a-history-of-cs-at-lakeside/
- **Beatles em Hamburgo [S]:**
  - Gladwell fala em ~1.200 apresentações e "10.000 horas".
  - Os críticos dizem que a conta não fecha (seriam bem menos horas, tocando em alternância com outras bandas) e que a habilidade de Hamburgo (tocar ao vivo, por horas) não é a que os fez geniais (composição).
  - O próprio **Ericsson** criticou a "regra das 10.000 horas" de Gladwell.
  - https://longreads.com/2013/11/11/the-beatles-succeeded-through-talent-ambition-and-a-lot-of-arrogance/
- **Magnatas nascidos em 1831–1840 [S]:**
  - 14 dos 75 mais ricos da história (todas as épocas) são americanos nascidos numa janela de 9 anos, a idade certa para a revolução das ferrovias e de Wall Street (anos 1860–70).
  - A lista é de construção questionável (ajuste de riqueza por época), e não achei uma refutação formal [NV].
- **Prática deliberada: Macnamara, Hambrick & Oswald (*Psych. Science*, 2014) [S]:**
  - Meta-análise: a prática deliberada explica **26%** da variância em jogos, **21%** em música, **18%** em esportes, **4%** em educação e **<1%** em profissões.
  - Em atletas de **elite**, ~1% (Macnamara et al., 2016).
  - Ericsson contestou as definições.
  - https://pmc.ncbi.nlm.nih.gov/articles/PMC4101876/
- **Potencial de widget:** ★★ Um gráfico de barras com "quanto a prática explica" por domínio, com o resto rotulado como "outra coisa" (talento, sorte, contexto). É útil para não cair no extremo "tudo é sorte".

---

## C. Psicologia da atribuição de sorte

### C1. Erro fundamental de atribuição e viés de autosserviço

- **Achado:** explicamos o comportamento alheio por traços (e subestimamos a situação). Nossos sucessos são atribuídos a nós mesmos, e nossos fracassos ao azar.
- **Fontes clássicas [NV-memória]:**
  - Ross (1977) cunhou "fundamental attribution error".
  - Jones & Harris (1967): ensaios pró ou anti-Castro.
  - Miller & Ross (1975), sobre o viés de autosserviço.
- **Potencial de widget:** ★★ Um quiz. O leitor vê o resultado de alguém e escolhe "habilidade ou sorte"; depois o mesmo cenário é narrado em primeira pessoa.

### C2. Hipótese do mundo justo (Lerner)

- **Achado [S]:**
  - Lerner & Simmons (1966): 72 universitárias assistiram a uma colega receber choques aparentemente dolorosos.
  - Quando não podiam ajudar e esperavam que ela continuasse sofrendo, **desvalorizavam a vítima**. Foi pior na condição "mártir".
  - Interpretação: precisamos acreditar que as pessoas recebem o que merecem.
- **Fonte:** *J. Pers. Soc. Psych.* 4(2):203–210; https://en.wikipedia.org/wiki/Melvin_J._Lerner
- **Potencial de widget:** ★ Texto, mas é ótimo para o argumento moral.

### C3. Viés de sobrevivência (Wald e fundos de investimento)

- **Abraham Wald [S]:**
  - Em 1943, no Statistical Research Group (Columbia), Wald escreveu 8 memorandos sobre como estimar a vulnerabilidade de aviões a partir dos danos nos que **voltaram**.
  - Se os motores aparecem pouco atingidos, é porque os atingidos ali não voltaram.
  - O desenho famoso do avião com pontos vermelhos e a cena da sala de reunião são **embelezamentos posteriores** (AMS Feature Column).
  - Fontes: https://www.ams.org/samplings/feature-column/fc-2016-06 ; Mangel & Samaniego, JASA 79:259–267 (1984).
- **Fundos (SPIVA, S&P Dow Jones) [S]:**
  - EUA: **0%** dos fundos large-cap no quartil superior em 2022 continuaram no quartil superior nos 2 anos seguintes, contra 6,25% esperados ao acaso.
  - EUA: só ~4,2% dos fundos de ações na metade superior ficaram lá por 5 anos seguidos (2020–2024; número de uma fonte secundária).
  - **Brasil:** dos **56 fundos de ações brasileiros** no quartil superior em 12 meses até dez/2020, **apenas 1** permaneceu no quartil superior nos 4 anos seguintes (Latin America Persistence Scorecard, final de 2024).
  - https://www.spglobal.com/spdji/en/spiva/article/latin-america-persistence-scorecard-year-end-2024/ (403 no fetch; número via resultado de busca [S]); https://www.spglobal.com/spdji/en/spiva/article/us-persistence-scorecard-year-end-2024/
  - Ao acaso, com 4 períodos independentes, seriam 56 × 0,25⁴ ≈ **0,22 fundo**. Na prática, persistência ≈ acaso.
- **Potencial de widget:** ★★★ "Gestores-moeda". São 1.000 "gestores" que jogam moeda todo ano, e após 10 anos alguns têm 10 caras seguidas (~1 em 1.024). O widget mostra as "manchetes" sobre o gênio deles e depois revela os 1.023 que sumiram. Combina com os números do SPIVA Brasil.

### C4. Viés de retrospecto e de resultado ("resulting", Annie Duke)

- **Achado:** julgamos a qualidade de uma decisão pelo resultado. No pôquer, aprende-se a separar as duas coisas.
- **História [S]:**
  - Super Bowl XLIX (2015). Seattle estava na linha de 1 jarda, a 26 segundos do fim, e Pete Carroll chamou um passe que foi interceptado.
  - Manchetes: "pior jogada da história do Super Bowl".
  - Duke argumenta que a probabilidade de interceptação daquela posição era ~1%, então a decisão era defensável e o **resultado** foi ruim.
  - Carroll: "the worst result of a call ever".
- **Fonte:** Annie Duke, *Thinking in Bets* (2018); https://bigthink.com/smart-skills/decision-making-outcomes/ ; https://www.cbssports.com/nfl/news/pete-carroll-on-decision-to-throw-it-was-the-worst-result-of-a-call-ever
- **Ressalvas:** o ~1% é da própria Duke (temporada regular). Há quem conteste a análise de jogo.
- **Potencial de widget:** ★★ Uma matriz 2×2 (decisão boa ou ruim × resultado bom ou ruim). O leitor classifica cenários, e só depois é revelada a probabilidade.

### C5. O paradoxo da meritocracia (Castilla & Benard, ASQ 2010)

- **Achado [S]:**
  - Em 3 experimentos com 445 participantes com experiência gerencial, quando a empresa se apresentava como **meritocrática**, os gestores davam **bônus maiores ao homem** que à mulher com avaliação idêntica (a divisão era de US$1.000 entre 3 funcionários).
  - Sem a ênfase meritocrática, a diferença não foi significativa.
  - Mecanismo provável: "licenciamento moral" (sentir-se objetivo autoriza o viés).
- **Fonte:** *Administrative Science Quarterly* 55:543–576; https://dspace.mit.edu/handle/1721.1/65884 ; https://weforum.org/agenda/2016/03/the-paradox-of-meritocracy
- **Ressalvas:** os valores exatos dos bônus são [NV]. Experimentos com cenários hipotéticos.
- **Potencial de widget:** ★ Texto, para o argumento "crer em meritocracia pura tem custos".

### C6. Frank: reconhecer a sorte torna mais generoso

- **Achado [S]:**
  - Experimento de Yuezhou Huo (assistente de Frank). Quem listou fatores **externos** para um bom acontecimento recente doou **~25% mais** do pagamento para caridade que quem listou qualidades pessoais. O controle ficou no meio.
- **História pessoal de Frank [S]:**
  - Em nov. 2007, numa quadra de tênis em Ithaca, ele teve uma **parada cardíaca súbita** (que mata ~98% das vítimas).
  - Uma ambulância, que normalmente viria de mais de 8 km, estava a minutos dali porque duas haviam sido enviadas a um acidente próximo e uma sobrou. Ele voltou a jogar em 2 semanas.
  - "Pure dumb luck."
- **Fontes:** https://greatergood.berkeley.edu/article/item/success_hard_work_luck ; *The Atlantic*, maio 2016, "Why Luck Matters More Than You Might Think" (repost: https://pacesconnection.com/blog/why-luck-matters-more-than-you-might-think-theatlantic-com)
- **Ressalvas:** o tamanho de amostra e a significância do experimento não foram verificados. Fica a preocupação de que reconhecer a sorte reduza a motivação.
- **Potencial de widget:** ★★★ Um "exercício de gratidão" no fim do ensaio. O leitor lista 3 sortes que teve (país, pais, saúde, um encontro), e o ensaio fecha com essa reflexão.

### C7. Crenças por país: trabalho duro ou sorte?

- **Pew Global Attitudes 2014 (44 países) [V/S]:**
  - "O sucesso é praticamente determinado por forças fora do nosso controle": mediana de **56%** concordam nos países emergentes e **51%** nos avançados. **EUA: 40%**, um dos mais baixos.
  - "Trabalho duro é muito importante para progredir" (nota 10/10): **EUA 73%**, UK 60%, Japão 42%.
  - O número do **Brasil não foi encontrado** na página [NV]: pegar a topline do Pew Spring 2014.
  - https://www.pewresearch.org/global/2014/10/09/emerging-and-developing-economies-much-more-optimistic-than-rich-countries-about-the-future/
- **Pew 2012 [S]:** **Brasil 69%** concordam que "a maioria das pessoas consegue ter sucesso se estiver disposta a trabalhar duro", com pouca diferença entre ricos e pobres no Brasil. https://www.pewresearch.org/global/2012/07/12/chapter-4-the-casualties-faith-in-hard-work-and-capitalism/
- **Datafolha (Brasil) [S]:**
  - **40%** associam a pobreza à "preguiça de pessoas que não querem trabalhar" e **58%** à "falta de oportunidades iguais".
  - A primeira opção subiu de **22% para 40%** desde a edição anterior. Pesquisa divulgada em 2026 [S]. Confirmar a data exata e a edição anterior.
  - https://www.brasildefato.com.br/2026/07/10/pobreza-and-preguica-or-desigualdade/ ; https://www.folhape.com.br/politica/datafolha-direita-supera-esquerda/498401/
- **World Values Survey:** escala "No longo prazo, trabalho duro geralmente traz uma vida melhor" vs. "Trabalho duro geralmente não traz sucesso; é mais questão de sorte e contatos". O Brasil está na Onda 7 (2017–2022), mas o valor é [NV]: extrair via https://www.worldvaluessurvey.org (online analysis).
- **Potencial de widget:** ★★★ "Onde você está?" O leitor posiciona-se num slider de 1 a 10 (trabalho ↔ sorte), e o seu ponto aparece sobre as médias por país. No fim do ensaio, pergunta-se de novo para ver se mudou.

---

## D. Histórias

### D1. Sortes famosas

- **Alexander Fleming e a penicilina (1928) [S]:**
  - Fleming voltou de ~2 semanas de férias em setembro de 1928 ao laboratório no St Mary's Hospital, em Londres.
  - Uma placa de *Staphylococcus* esquecida na bancada tinha mofo (*Penicillium*), com um halo sem bactérias ao redor.
  - O esporo provavelmente veio do laboratório de micologia do andar de baixo (C. J. La Touche).
  - A reconstrução de Ronald Hare (1970) sugere que um período frio seguido de calor teria permitido ao fungo crescer antes das bactérias [NV].
  - A sorte não bastou: a penicilina só virou remédio com Florey e Chain (Oxford, 1940), 12 anos depois.
  - https://jmla.pitt.edu/ojs/jmla/article/view/1780/2309
- **Harrison Ford [S]:**
  - Era carpinteiro em Los Angeles quando o diretor de elenco Fred Roos o contratou e o pôs no teste de *American Graffiti* (1973).
  - Para *Star Wars*, Lucas não queria atores de *Graffiti*. Ford estava lá instalando uma porta (versão de Roos: armado de propósito) e acabou lendo falas com os outros atores, até virar Han Solo.
  - As versões de Ford e Roos divergem sobre quanto foi acaso.
  - https://au.news.yahoo.com/remarkable-story-harrison-ford-han-solo-130342666.html
- **J.K. Rowling [S]:**
  - O manuscrito foi recusado por ~12 editoras (as fontes variam de 8 a "uma dúzia").
  - Na Bloomsbury, Nigel Newton levou capítulos para casa, e a filha **Alice, de 8 anos**, escreveu um parecer entusiasmado.
  - Adiantamento: **£2.500**.
  - O crédito também vai para o editor Barry Cunningham.
  - https://www.agbi.com/article/25-years-of-harry-potter-from-rejection-and-2500-advance-to-500m-global-sales/
- **Bill Gates [S]:** o terminal de Lakeside em 1968 (ver B15).
  - Gates também cita sorte de *timing*. Paul Allen viu a capa da *Popular Electronics* (jan. 1975) com o Altair [NV-memória].
  - Gates disse a Gladwell que "teve mais exposição ao desenvolvimento de software tão jovem do que qualquer um naquele período" [NV, citação de *Outliers*].
- **Airbnb [S]:**
  - Em 2008, quebrados, os fundadores venderam caixas de cereal "Obama O's" e "Cap'n McCain's" (~US$40 cada) e levantaram **~US$30 mil**.
  - Paul Graham (Y Combinator) não acreditava na ideia, mas se impressionou com a tenacidade, e a startup entrou na YC.
  - O nº de caixas varia entre fontes (800 a 1.000).
- **Post-it (3M) [NV-memória]:**
  - Spencer Silver criou em 1968 um adesivo "fracassado", fraco demais.
  - Em 1974, Art Fry, frustrado com marcadores que caíam do hinário do coral, teve a ideia de usá-lo.
  - O lançamento nacional foi em 1980.
- **Kodak (o reverso: azar ou cegueira) [S]:**
  - **Steven Sasson** inventou a câmera digital na Kodak em **1975**: 3,6 kg, **0,01 megapixel** (100×100), em P&B, gravando em fita cassete, **23 s por foto**.
  - A gerência reagiu com ceticismo ("quem vai querer ver fotos na TV?").
  - A frase "That's cute — but don't tell anyone about it" é [NV].
  - A Kodak pediu concordata em 2012.
  - https://petapixel.com/2017/09/21/kodak-said-digital-photography-1975/
- **Nokia [S/NV]:**
  - A frase "We didn't do anything wrong, but somehow, we lost", atribuída a Stephen Elop (2013–14, venda para a Microsoft), circula muito.
  - Aparece citada em publicação da ONU (International Trade Forum), mas **sem fonte primária** (transcrição ou vídeo). Usar como "atribuída a".

### D2. Sorte confundida com habilidade

- **CEOs (Fitza, SMJ 2014) [S]:**
  - Estudos de decomposição de variância atribuíam ~15–20% da variação de desempenho das empresas ao "efeito CEO".
  - Fitza (1.500 maiores empresas dos EUA, 1993–2012, dados reais + simulados) mostra que boa parte disso é **acaso**: o efeito separável do CEO fica entre **3,9% e 5,0%**, e "mais de 70%" do efeito CEO medido pode ser sorte.
  - **Contestação:** Quigley & Graffin (SMJ 2017), com modelagem multinível, dizem que Fitza superestima o acaso.
  - https://stories.tamu.edu/news/2015/10/14/ceo-effect-on-firm-performance-mostly-due-to-chance ; https://ideas.repec.org/a/bla/stratm/v38y2017i3p793-801.html
- **Taleb, *Fooled by Randomness* (2001) [S]:**
  - O **dentista aposentado** tem uma carteira com retorno esperado de 15% e volatilidade de 10% ao ano.
  - Probabilidade de estar no lucro: **93%** num ano, mas só **~50,02% num segundo**.
  - Quem olha a carteira a cada minuto sente dor quase metade do tempo, enquanto quem olha uma vez por ano quase sempre sente prazer.
  - **Macacos datilógrafos:** com macacos suficientes, um escreverá a *Ilíada*. Você apostaria que ele escreve a *Odisseia* em seguida? Num universo grande de gestores, sempre haverá "gênios" por acaso.
  - https://www.goodreads.com/quotes/11350865-a-15-return-with-a-10-volatility-or-uncertainty-per
  - Tabela do livro (dentista) [S]: 1 ano 93%; 1 trimestre 77%; 1 mês 67%; 1 dia 54%; 1 hora 51,3%; 1 minuto 50,17%; 1 segundo 50,02%. Os valores intermediários são [NV-memória], mas são conferíveis pela normal: P = Φ(μ√t/σ).
- **Fundos (SPIVA Brasil e EUA):** ver C3.
- **Potencial de widget:** ★★★ "O dentista de Taleb". Um slider de frequência de checagem (ano → segundo) mostra a mesma carteira vista como sequência de verdes e vermelhos, e a % de dias de dor sobe para ~50%. Fórmula exata: P(ganho) = Φ((μ/σ)·√Δt).

### D3. "Deveria ter dado certo": contrafactuais

- **Os "Lost Einsteins" de Chetty** (B14): talento sem exposição.
- **Os quase-vencedores da bolsa Veni** (B3): com propostas praticamente idênticas, metade das chances de virar professor.
- **O mais talentoso do modelo de Pluchino** (A1): T = 0,89 e capital final de 0,625.
- **As músicas do MusicLab** (B1): a mesma música vai de hit a fracasso conforme o "mundo".
- **Sasson e a Kodak** (D1): a ideia certa na empresa errada.
- Outras candidatas [NV, a pesquisar]:
  - Gary Kildall/CP/M, que teria "perdido" o contrato da IBM para a Microsoft em 1980 (a história do "foi voar de avião" é disputada).
  - Pete Best, demitido dos Beatles em 1962, dias antes do sucesso.
  - Ronald Wayne, que vendeu os 10% da Apple por US$800 em 1976.

---

## Notas de método para o ensaio

1. **A matemática central é uma só:** resultado = habilidade + sorte, com seleção no extremo, o que leva a vencedores sortudos (A1, A2, A5, A8, Veritasium). É uma consequência estatística, não ideologia, e cabe numa linha de JS.
2. **O segundo motor é a dinâmica multiplicativa e a vantagem cumulativa** (A6, A7, B1–B3), que transforma pequenas sortes em leis de potência.
3. **Contrapesos importantes, para não cair no "tudo é sorte":**
   - talento e esforço elevam a **média** (A1: capital médio dos talentosos ~2× maior);
   - prática importa em domínios mensuráveis (B15);
   - tentar mais vezes aumenta a chance do "golpe de sorte" (B4, a regra do impacto aleatório);
   - a "sorte" de Wiseman é parcialmente comportamental (B7);
   - o modelo de Pluchino é de brinquedo;
   - vantagem cumulativa tem retornos decrescentes (B2).
4. **Ganchos brasileiros:** base do São Paulo FC (47,5% nascidos em jan–mar), SPIVA Brasil (1 de 56 fundos), Pew 2012 (69% dos brasileiros acreditam no trabalho duro), Datafolha (40% atribuem pobreza à preguiça), data de corte escolar de 31/03. O nº de luck-share do Brasileirão está por calcular (A2).
