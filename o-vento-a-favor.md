# O vento a favor

**Ensaio interativo sobre sorte e sucesso · estado da evidência em outubro de 2026 · por Renato Shirakashi**

> Subtítulo para o hero: *Quanto do que você conquistou foi talento e quanto foi sorte? A resposta depende de uma coisa que quase ninguém considera: o tamanho da fila em que você estava.*

> **Nota de formato.** Proposta de projeto: roteiro com a prosa principal e a especificação de cada figura interativa. Nenhum HTML ainda. Segue a estrutura de *O feed por dentro* e *A régua e o rótulo*: seções numeradas, uma figura por seção, números conferidos nas fontes primárias, fontes no fim.
>
> Ponto de partida: o vídeo do Veritasium *Is Success Luck or Hard Work?* (agosto de 2020, hoje com o título *Why Being Delusional is a Superpower*), inspirado no livro *Success and Luck* (2016), de Robert Frank. O ensaio vai além do vídeo em três frentes:
> 1. **Deixa o leitor mexer nos botões** de cada simulação que o vídeo só mostra pronta.
> 2. **Corrige o vídeo onde ele exagera.** A principal correção é a simulação dos astronautas, que depende de uma premissa escondida (seção 05).
> 3. **Traz o que veio depois:** experimentos de campo sobre o efeito Mateus, mundos paralelos (MusicLab), sequências quentes em carreiras e o vídeo de 2025 sobre leis de potência.
>
> **Personagem e estado compartilhado:** o personagem é o próprio leitor. Na seção 00 ele responde quanto do seu sucesso atribui à sorte, e a resposta volta na seção 12. Fica só no `localStorage`, que é uma conveniência local: a figura funciona sem ele.
>
> Cada bloco traz **trabalho cognitivo**, **estado inicial** (a figura parada precisa funcionar sozinha) e **celular/acessibilidade**. Itens marcados **[verificar]** ainda precisam ser conferidos na fonte primária antes de publicar. Esta nota sai da versão final.

---

## 00 · A pergunta

Em abril de 2020, com as escolas fechadas, uma pesquisa perguntou aos pais americanos quem cuidava da maior parte do ensino em casa. **45%** dos homens disseram que eram eles. **3%** das mulheres concordaram.

Não é mentira, e não é só vaidade. Em 1979, Michael Ross e Fiore Sicoly pediram a casais que estimassem sua parte nas tarefas da casa. Somadas, as partes passavam de 100%. Também passavam de 100% quando a pergunta era quem começava as brigas e quem fazia a bagunça. As pessoas não superestimam só o que fizeram de bom. Superestimam tudo o que fizeram, porque lembram de cada coisa que elas mesmas fizeram e de só uma parte do que os outros fizeram.

A sorte funciona como o trabalho do outro: acontece fora do seu campo de visão. Antes de continuar, responda a pergunta abaixo.

> **WIDGET 00 · `sua-parte`**
> **Tag:** a pergunta · responda antes de ler
> **Tipo:** SVG inline, uma barra horizontal dividida em duas cores (talento e esforço × sorte e circunstância).
> **O que mostra:** "Pense na sua maior conquista profissional. Quanto dela foi sorte?" Uma alça arrastável divide a barra. Depois de soltar, aparece uma segunda barra com a soma das respostas de casais no estudo de Ross e Sicoly, passando de 100% (o pedaço que excede fica hachurado em vermelho).
> **Trabalho cognitivo:** compromisso. O leitor registra a própria crença antes de ver a evidência, e essa crença volta no fim.
> **Estado inicial:** barra vazia com a pergunta e a alça no meio, mais um botão `pular`.
> **Interação:** arrastar a alça e depois `responder`.
> **Persistência:** a resposta fica no `localStorage` (`rs_sorte_resposta`) e reaparece na seção 12. Sem `localStorage`, a seção 12 pede de novo.
> **Celular/acessibilidade:** a alça tem 44 px. Há também um `<input type=range>` acessível com rótulo.
> **Legenda:** Todo mundo enxerga melhor o que fez do que o que aconteceu com ele.

---

## 01 · O mês em que você nasceu

Pergunte a um jogador profissional de hóquei como ele chegou lá. Ele vai falar de treino, de técnicos, dos pais acordando às cinco da manhã. Não vai agradecer pela data de nascimento.

Em 1985, Roger Barnsley olhou as ligas juniores de elite do Canadá: **41,5%** dos jogadores tinham nascido entre janeiro e março, e só **9,7%** entre outubro e dezembro. O corte das categorias de base é 1º de janeiro. Aos 8 anos, quem nasceu em janeiro tem quase um ano a mais de corpo que um colega de dezembro na mesma categoria. Parece mais talentoso, ganha mais tempo no gelo e técnicos melhores, e a vantagem se acumula.

O Brasil tem o mesmo padrão. Na base do São Paulo FC, **47,5%** dos atletas nasceram no primeiro trimestre e **8,8%** no último (Massa et al., 2014).

O efeito diminui no topo. Entre os selecionados no draft da NHL de 1980 a 2024, a proporção é de 35,6% no primeiro trimestre contra 15,4% no último. E os nascidos no fim do ano que chegam à NHL marcam mais gols e ganham mais. Eles tiveram de ser melhores para passar pela mesma peneira.

> **WIDGET 01 · `o-calendario`**
> **Tag:** idade relativa · mude a data de corte
> **Tipo:** canvas 2D, simulação de categorias de base com 1.000 crianças e quatro peneiras anuais.
> **O que mostra:**
> - **Em cima:** 1.000 pontos, cada um uma criança, coloridos pelo mês de nascimento. O talento é igual em todos os meses.
> - **A cada ano**, a peneira seleciona os 30% que *parecem* melhores. A aparência é talento mais tamanho, e o tamanho depende da idade em meses. Os escolhidos treinam mais, e o talento deles cresce 10% ao ano.
> - **Embaixo:** o histograma de nascimentos dos que sobram depois de quatro peneiras, ao lado dos dados reais do São Paulo FC e da NHL.
> **Trabalho cognitivo:** processo. Mostra como uma vantagem de meses vira uma carreira.
> **Estado inicial:** a simulação já rodou, e o histograma final é inclinado como o real.
> **Interação:** `data de corte` (1º de janeiro / 1º de julho), `peso do tamanho` (presets `nenhum`, `pequeno`, `como no hóquei`) e `rodar de novo`. Mudar o corte desloca a inclinação para os nascidos em julho.
> **Celular/acessibilidade:** as crianças viram uma grade de 20×50. A tabela dos dados reais fica disponível como texto.
> **Legenda:** Ninguém escolheu nascer em janeiro. A peneira transformou isso em talento.

---

## 02 · A loteria do berço

O mês em que você nasceu é um detalhe perto do país. O economista Branko Milanovic decompôs a desigualdade de renda do mundo: **mais da metade** da variação de renda entre as pessoas se explica pelo país onde elas vivem e pela distribuição de renda desse país. Ele chama isso de prêmio de cidadania.

Em Burundi, a renda nacional por pessoa é de **US$ 250 por ano** a preços de mercado (1.190 em poder de compra, Banco Mundial, 2024). Nenhum talento leva um burundinês médio à renda de um brasileiro médio.

Dentro de um mesmo país, o berço também conta. Raj Chetty acompanhou 1,2 milhão de americanos e descobriu que filhos de pais do 1% mais rico têm **10 vezes** mais chance de registrar uma patente do que filhos de pais abaixo da mediana. Crianças pobres que estavam entre os 5% melhores em matemática no terceiro ano inventam tanto quanto crianças ricas abaixo da média. Chetty chamou essas crianças de *Einsteins perdidos*. O que falta para elas não é talento, é ter visto alguém inventar.

> **WIDGET 02 · `nascer-de-novo`**
> **Tag:** loteria do berço · nasça de novo
> **Tipo:** SVG inline, um globo plano em retângulos proporcionais à população (cartograma) e uma curva de renda.
> **O que mostra:** um botão sorteia onde você nasce, ponderado pela população do mundo. O país sorteado acende, e um segundo sorteio escolhe sua posição na distribuição de renda dele. O resultado é sua renda em dólares por poder de compra, marcada num eixo logarítmico mundial. O ponto do leitor tem um slider `talento` que move a posição dentro do país em até ±20 percentis.
> **Trabalho cognitivo:** comparação de escala. O talento move você dentro do país, e o berço escolhe o país.
> **Estado inicial:** três sorteios já feitos e fixados (Índia, Brasil, Estados Unidos) para mostrar a distância.
> **Interação:** `nascer de novo` (acumula até 50 pontos), `talento` (−20 a +20 percentis) e `limpar`.
> **Dados:** World Inequality Database ou Lakner–Milanovic, por decil e país. **[verificar]** a fonte exata e a licença.
> **Celular/acessibilidade:** o cartograma vira uma lista ordenada por renda. O resultado também é anunciado por texto (`aria-live`).
> **Legenda:** Você não escolheu nascer. Mais da metade da sua renda já estava decidida ali.

---

## 03 · Somar ou multiplicar

Até aqui a sorte foi um empurrão inicial. Para entender por que esse empurrão pode virar um abismo, é preciso ver de que jeito ela se acumula.

Se a vida soma pequenos acasos, como a altura soma genes e nutrição, o resultado é uma curva em sino: muita gente perto da média e ninguém cinco vezes maior que o resto. Se a vida *multiplica* pequenos acasos, como um investimento que rende uma porcentagem diferente a cada ano, o resultado é outra curva, com uma cauda longa à direita. A maioria fica um pouco abaixo da média, e alguns ficam cem vezes acima.

O Veritasium mostra isso em 2025 com duas mesas de cassino. Na primeira, cada cara vale US$ 1, e 100 lançamentos rendem em média US$ 50. Na segunda, cada cara multiplica o que você tem por 1,1 e cada coroa por 0,9. O valor esperado continua US$ 1, mas a mediana cai para cerca de 61 centavos e o máximo chega a 13 mil dólares.

Carreiras, empresas, audiência e patrimônio funcionam mais como a segunda mesa.

> **WIDGET 03 · `duas-maquinas`**
> **Tag:** soma e produto · solte as bolinhas
> **Tipo:** canvas 2D, duas máquinas de Galton lado a lado.
> **O que mostra:**
> - **Esquerda:** cada pino soma ±1. Forma um sino.
> - **Direita:** cada pino multiplica por 1,1 ou 0,9. As colunas ficam em escala linear de dinheiro, então a pilha se amontoa à esquerda e algumas bolinhas voam para longe.
> - **Abaixo de cada máquina:** média, mediana e o que o 1% do topo tem.
> **Trabalho cognitivo:** intuição. As mesmas moedas, combinadas de outro jeito, dão um mundo mais desigual.
> **Estado inicial:** 2.000 bolinhas já caídas nas duas máquinas.
> **Interação:** `soltar 1.000`, `número de pinos` (10, 50, 100) e `eixo logarítmico` (na direita, revela que o log vira um sino).
> **Celular/acessibilidade:** as máquinas ficam empilhadas. Com `prefers-reduced-motion`, mostra só os histogramas.
> **Legenda:** Com a mesma sorte, quem soma fica perto da média e quem multiplica se espalha por ordens de grandeza.

---

## 04 · Talento contra sorte

Em 2018, três físicos de Catânia (Pluchino, Biondo e Rapisarda) montaram o modelo mais citado sobre o tema.

São 1.000 pessoas, cada uma com um talento sorteado de uma curva normal (média 0,6, desvio 0,1). Todas começam com o mesmo capital. Durante 40 anos, divididos em 80 semestres, eventos de sorte e azar se movem pelo espaço:
- **Evento de sorte:** dobra o capital de quem é atingido, *se* a pessoa tiver talento para aproveitar. A chance de aproveitar é igual ao próprio talento.
- **Evento de azar:** corta o capital pela metade, de qualquer um.

O resultado típico: o mais rico tem talento perto da média, e o mais talentoso termina abaixo do capital inicial. Em 100 rodadas, as pessoas com talento acima de 0,8 ficaram no topo só 3% das vezes. Na média, ainda acabaram com o dobro do capital das outras. O talento ajuda, mas não decide quem chega ao topo.

O modelo tem premissas que favorecem a sorte:
- os talentos são muito parecidos entre si;
- o azar atinge todos igualmente;
- ninguém escolhe onde fica.

A figura deixa você mudar cada uma dessas premissas e ver quanto do resultado sobrevive.

> **WIDGET 04 · `talento-vs-sorte`** (figura âncora)
> **Tag:** o modelo de Catânia · mude as premissas
> **Tipo:** canvas 2D. À esquerda, o mundo: pontos parados e eventos verdes e vermelhos se movendo. À direita, um gráfico de dispersão de talento × capital final em escala logarítmica, atualizado a cada semestre.
> **O que mostra:** a corrida de 40 anos. No fim, o mais rico e o mais talentoso ganham contorno e etiqueta ("talento 0,61 · capital 2.560" e "talento 0,89 · capital 0,6").
> **Trabalho cognitivo:** revelação e depois teste de robustez. Primeiro o resultado chocante, depois as premissas que o produzem.
> **Estado inicial:** uma rodada completa já feita, com a semente fixa do artigo original. As duas etiquetas estão visíveis.
> **Interação:**
> - `rodar 40 anos` (com velocidade ×1, ×10 e ×100) e `rodar 100 vezes`, que mostra quantas vezes alguém do topo do talento ganhou.
> - Botões de premissa:
>   - `talentos mais diferentes` (desvio 0,1 → 0,25);
>   - `talento protege do azar` (o azar só atinge com probabilidade 1 − talento);
>   - `talento atrai sorte` (o talentoso se move em direção aos eventos verdes).
>   A rodada anterior fica em cinza para comparar.
> **Celular/acessibilidade:** o mundo e o gráfico ficam empilhados, e o mundo vira 300×300. Há um resumo em texto: "o mais rico tem talento X, no percentil Y".
> **Legenda:** No modelo original, o talento dobra o capital médio, mas quase nunca leva ao topo. Ao mudar as premissas, o talento volta a contar. O quanto conta depende do que você acredita sobre o mundo.

---

## 05 · A fila dos astronautas

A sorte decide mais quando a fila é longa. Em 2017, mais de **18.300 pessoas** se candidataram para ser astronautas da NASA, e **12** foram escolhidas (11 se formaram).

No vídeo, Derek Muller simula a seleção com uma nota feita de 95% habilidade e 5% sorte, as duas sorteadas de 0 a 100, e escolhe os 11 melhores. Em mil repetições, os escolhidos tiveram sorte média de **94,7** em 100, e só **1,6** dos 11 estariam entre os 11 mais habilidosos. Refizemos a conta e o resultado é o mesmo.

Mas a conta tem uma premissa escondida: habilidade distribuída de forma *uniforme*, com tanta gente perto de 100 quanto perto de 50. Nesse caso, há centenas de candidatos praticamente empatados no topo, e qualquer pitada de sorte decide entre eles. Os que entram por sorte são só 0,25 ponto menos hábeis do que os que saem.

Com a habilidade numa curva normal, que é como costumam se distribuir as medidas de desempenho, os mesmos 5% de sorte deixam **9,3 dos 11** no lugar.

O vídeo acerta a direção e exagera o tamanho. A sorte pesa mais quanto mais longa é a fila e quanto mais parecidos são os candidatos no topo. A segunda condição depende do formato da curva de talento, e o vídeo não diz qual formato usou.

> **WIDGET 05 · `a-selecao`**
> **Tag:** seleção · alongue a fila
> **Tipo:** canvas 2D, nuvem de candidatos (eixo x: habilidade, eixo y: sorte) com uma linha diagonal de corte. Ao lado, as 11 vagas.
> **O que mostra:**
> - Cada candidato é um ponto. A linha de corte separa os 11 escolhidos, que ficam em laranja.
> - Os 11 mais hábeis ganham contorno.
> - O placar diz "X dos 11 escolhidos também estão entre os 11 mais hábeis" e "sorte média dos escolhidos: Y".
> **Trabalho cognitivo:** manipulação direta, e ensinar pela falha: o leitor descobre sozinho a premissa que muda o resultado.
> **Estado inicial:** a configuração do vídeo (18.300 candidatos, 5% de sorte, habilidade uniforme), com o placar em 1,6 de 11.
> **Interação:**
> - `candidatos`: 100, 1.000, 18.300, 100.000.
> - `peso da sorte`: 1%, 2%, 5%, 10%, 20%.
> - `formato do talento`: `uniforme (vídeo)` ou `normal`. Trocar o formato é o momento central da seção.
> - `rodar 1.000 seleções`, que mostra o histograma do placar.
> **Dados de referência:** tabela da simulação (5% de sorte: 100 candidatos → 10,2 de 11; 1.000 → 6,0; 18.300 → 1,6; 100.000 → 0,7. Com talento normal e 18.300 candidatos → 9,3).
> **Celular/acessibilidade:** a nuvem é amostrada em 2.000 pontos visíveis. A tabela completa fica disponível como texto.
> **Legenda:** Quanto mais longa a fila e mais apertado o topo, mais a sorte decide. Se o topo é apertado depende de como o talento se distribui.

---

## 06 · Os melhores dependem mais da sorte

Gould tinha uma pergunta: por que ninguém mais rebate acima de 0,400 no beisebol? Ted Williams fez 0,406 em 1941, e desde então ninguém repetiu. Os jogadores não pioraram. Eles ficaram tão bons, e tão parecidos, que a diferença entre o melhor e a média encolheu. A média continuou perto de 0,260 enquanto a dispersão caía.

Michael Mauboussin chamou isso de **paradoxo da habilidade**: quanto mais habilidosos e parecidos são os competidores, mais o resultado depende da sorte. Nas oito provas de velocidade e salto do atletismo, seis recordes mundiais foram batidos com vento a favor. Todos os recordistas eram extraordinários, e o recorde ainda precisou do vento.

Dá para medir quanto de uma liga é sorte. Simule um campeonato em que todos os times são iguais e cada jogo é cara ou coroa. A tabela final ainda terá dispersão, que é só sorte. Compare com a dispersão real: a diferença é habilidade. Pelas contas de Mauboussin, a sorte explica **12%** da variação na NBA, **31%** na Premier League e **53%** na NHL **[verificar no livro]**.

> **WIDGET 06 · `o-termometro`**
> **Tag:** paradoxo da habilidade · jogue um campeonato de moedas
> **Tipo:** SVG inline, duas tabelas de classificação lado a lado e um termômetro horizontal de sorte para habilidade.
> **O que mostra:** à esquerda, um campeonato de 20 times iguais, sorteado ao vivo (38 rodadas). À direita, a tabela real do **Brasileirão** de uma temporada. Embaixo, o termômetro com Brasileirão, NBA, Premier League, NFL e NHL posicionados.
> **Trabalho cognitivo:** previsão e depois revelação. Antes de sortear, o leitor marca onde acha que o Brasileirão fica no termômetro.
> **Estado inicial:** um campeonato de moedas já sorteado. Visto sozinho, ele parece uma tabela real, com campeão, rebaixados e "times em crise".
> **Interação:** `sortear outro campeonato`, `marque seu palpite` (no termômetro), `revelar` e `temporada` (2015–2025).
> **Dados:** cálculo próprio com as tabelas históricas do Brasileirão (var(sorte) = p(1−p)/n). **[a calcular]**. Seria o primeiro número desse tipo para o Brasileirão.
> **Celular/acessibilidade:** as tabelas viram listas de pontos e o termômetro fica no topo.
> **Legenda:** Um campeonato só de moedas também produz campeão e rebaixado. A sorte é a parte da tabela real que se parece com ele.

---

## 07 · Oito mundos

Se pudéssemos rebobinar o mundo e tocar tudo de novo, os mesmos vencedores ganhariam?

Em 2006, Matthew Salganik, Peter Dodds e Duncan Watts quase fizeram isso. Criaram um site com **48 músicas** de bandas desconhecidas e dividiram **14.341** visitantes, sem eles saberem, em nove mundos:
- **Um mundo independente:** ninguém via o que os outros baixavam.
- **Oito mundos com influência:** cada um tinha seu próprio contador de downloads.

Nos mundos com influência, as músicas populares ficaram muito mais populares, e *quais* eram as populares mudou de um mundo para outro. Nas palavras dos autores, as melhores músicas nunca foram muito mal e as piores nunca foram muito bem, mas qualquer outro resultado era possível.

Num estudo seguinte, eles inverteram o ranking: mostraram as piores como se fossem as mais baixadas. Muitas viraram profecias autorrealizáveis.

> **WIDGET 07 · `oito-mundos`**
> **Tag:** mundos paralelos · rebobine o mundo
> **Tipo:** canvas 2D, oito colunas (os mundos) com 48 barras cada, ordenadas por downloads, e uma nona coluna para o mundo independente.
> **O que mostra:** as 48 músicas têm qualidade fixa, a mesma nos nove mundos. Cada uma tem uma cor estável, para o leitor seguir a mesma música entre os mundos. Ouvintes simulados entram um a um e escolhem com uma probabilidade que mistura qualidade com popularidade naquele mundo.
> **Trabalho cognitivo:** revelação. A mesma música é a primeira num mundo e a 30ª em outro.
> **Estado inicial:** os oito mundos já rodaram 700 ouvintes cada. Uma música (em laranja) está em 1º num mundo e em 25º em outro, com destaque.
> **Interação:** `influência social` (`nenhuma`, `fraca`, `como no MusicLab`), `rebobinar e tocar de novo` e `inverter o ranking`, que repete o estudo de 2008. Tocar numa música destaca sua posição nos nove mundos.
> **Celular/acessibilidade:** mostra 4 mundos por tela, deslizando horizontalmente com aviso. Também há uma tabela "melhor e pior posição por música".
> **Legenda:** A qualidade define o piso e o teto. Entre os dois, quem decide é a ordem em que as pessoas chegaram.

---

## 08 · A linha de corte

O MusicLab mostra que um começo aleatório pode decidir o fim. Faltava provar isso no mundo real, onde não dá para rebobinar.

A solução foi achar pessoas que ficaram dos dois lados de uma linha por acaso. Na Holanda, a bolsa Veni para jovens cientistas é decidida por nota. Thijs Bol, Mathijs de Vaan e Arnout van de Rijt (2018) compararam quem ficou logo acima do corte com quem ficou logo abaixo, com notas praticamente iguais. Oito anos depois, quem ganhou a bolsa tinha recebido **mais que o dobro** de financiamento e tinha cerca de **50% mais chance** de virar professor titular.

Van de Rijt já tinha feito o experimento ao contrário (2014). Ele deu, por sorteio, uma pequena vantagem a projetos no Kickstarter, a editores na Wikipédia e a petições no Change.org. Os sorteados atraíram mais apoio depois, mas o efeito diminuía rápido, e uma réplica com petições não encontrou nada. O sucesso puxa sucesso, mas nem sempre.

Robert Merton chamou isso de **efeito Mateus**: *"a quem tem, mais será dado"*.

> **WIDGET 08 · `a-linha-de-corte`**
> **Tag:** efeito Mateus · empurre um centímetro
> **Tipo:** SVG inline. Em cima, duas fichas quase idênticas (Ana: nota 8,51, Bia: nota 8,49) e uma linha de corte em 8,50. Embaixo, um gráfico de trajetória de 0 a 8 anos.
> **O que mostra:** Ana passa e Bia não. A trajetória de financiamento acumulado se abre em leque, com a mediana grossa e 50 trajetórias simuladas finas para cada uma. O fim do leque marca os números reais do estudo ("2× financiamento").
> **Trabalho cognitivo:** comparação. O mérito igual e o destino diferente ficam visíveis ao mesmo tempo.
> **Estado inicial:** as duas trajetórias já desenhadas, com a distância final rotulada.
> **Interação:** `trocar quem passou` (as curvas trocam de cor, porque a diferença era a linha) e `força do efeito Mateus` (`nenhuma`, `como nas bolsas holandesas`, `forte`).
> **Celular/acessibilidade:** as fichas ficam lado a lado e o gráfico fica em largura total.
> **Legenda:** Dois centésimos de nota viraram o dobro de dinheiro em oito anos. A segunda vantagem veio da primeira, não do talento.

---

## 09 · O gestor campeão

Se a sorte pesa tanto, deveria ser fácil confundi-la com habilidade. E é.

Em 2020, 56 fundos de ações brasileiros terminaram o ano no quartil de cima. Quatro anos depois, só **um** continuava lá (S&P SPIVA Brasil) **[verificar no relatório]**. Se o desempenho fosse puro acaso, a conta daria cerca de 0,2. Portanto, esse é um resultado *pior* que o acaso.

Daniel Kahneman conta que instrutores de voo israelenses juravam que elogiar piorava os cadetes e que gritar melhorava. A explicação era mais simples: depois de um voo excepcional, o próximo tende a ser mais normal, com ou sem elogio. Isso é **regressão à média**. A capa da *Sports Illustrated* não dá azar. Ela escolhe atletas no pico.

A regressão também serve de medidor. Quanto mais um resultado volta para a média no período seguinte, mais dele era sorte.

> **WIDGET 09 · `o-gestor-campeao`**
> **Tag:** regressão à média · contrate um gestor de moedas
> **Tipo:** canvas 2D. Uma grade de 100 gestores, em que cada um lança uma moeda por ano, e um gráfico de "ranking no ano 1 × ranking no ano 2".
> **O que mostra:** depois de 5 anos de moedas, os 5 gestores com mais caras ganham destaque e um "histórico" impressionante. No ano seguinte, o desempenho deles cai para 50%. O gráfico de dispersão entre um ano e o seguinte forma uma nuvem sem inclinação.
> **Trabalho cognitivo:** ensinar pela falha. O leitor escolhe um gestor pelo histórico e vê o desempenho dele cair.
> **Estado inicial:** 5 anos já lançados, com um gestor com 5 de 5 em destaque e a frase "Este gestor nunca errou."
> **Interação:** `contratar este gestor`, `lançar o próximo ano` e o slider `quanto é habilidade` (0% a 100%). Com 100%, a nuvem vira uma diagonal. O ponto real dos fundos brasileiros fica marcado no slider.
> **Celular/acessibilidade:** a grade fica em 10×10 com ícones grandes, e o gráfico fica abaixo.
> **Legenda:** Um histórico perfeito entre 100 lançadores de moeda é quase garantido. Quanto mais o vencedor volta para a média, mais da vitória era sorte.

---

## 10 · A sorte que se cria

Nem toda sorte é distribuída de cima. Richard Wiseman, psicólogo inglês, recrutou pessoas que se diziam muito sortudas ou muito azaradas e deu a todas o mesmo jornal com a mesma tarefa: contar as fotografias.

Os azarados levaram cerca de dois minutos. Os sortudos levaram segundos. Na segunda página havia um anúncio de meia página com letras enormes: *"Pare de contar. Este jornal tem 43 fotografias."* Os azarados, focados na tarefa, não viram.

O estudo nunca passou por revisão por pares, e a amostra é de pessoas que se dizem sortudas. Mesmo assim, a ideia é útil: parte da sorte é a atenção a oportunidades que não foram buscadas.

> **WIDGET 10 · `conte-as-fotos`**
> **Tag:** experimento · conte as fotos
> **Tipo:** HTML/CSS, uma página de jornal falso em português, com cronômetro.
> **O que mostra:** um jornal de 4 páginas roláveis com fotos em preto e branco. Na página 2, um anúncio em letras grandes: "PARE DE CONTAR: SÃO 31 FOTOS. GANHE A RESPOSTA CLICANDO AQUI." Mais adiante, um segundo anúncio mais discreto. O cronômetro corre até o leitor responder ou clicar no anúncio.
> **Trabalho cognitivo:** experiência direta. O leitor sente, em vez de ler, como o foco esconde oportunidades.
> **Estado inicial:** o botão `começar` e a instrução "Conte as fotos deste jornal. Seja rápido."
> **Interação:** `começar`, rolar, digitar o número ou clicar no anúncio. No fim aparece "você levou X s e viu / não viu o anúncio", ao lado dos tempos de Wiseman.
> **Persistência:** nenhuma. A versão final também não agrega resultados de leitores, para continuar sem servidor.
> **Celular/acessibilidade:** o jornal fica em uma coluna. Para leitores de tela, uma versão em texto avisa que o anúncio existe e explica o experimento sem cronômetro.
> **Legenda:** A oportunidade estava na página. Faltou olhar para ela.

---

## 11 · Como jogar um jogo com sorte

Se a sorte pesa tanto, o que resta fazer? Três estudos sobre carreiras apontam para o mesmo lugar.

1. **O maior acerto pode vir em qualquer momento.** Roberta Sinatra e colegas analisaram as publicações de milhares de cientistas (*Science*, 2016). O artigo mais citado de cada carreira tem a mesma chance de ser o primeiro, o décimo ou o último. O que aumenta a chance de um grande acerto é o número de tentativas.
2. **Sequências quentes existem.** Lu Liu e colegas (*Nature*, 2018) encontraram pelo menos uma sequência de anos excepcionais em **91%** dos artistas, **82%** dos diretores de cinema e **90%** dos cientistas. Elas duram cerca de cinco anos, começam em momento imprevisível e não coincidem com um aumento de produção.
3. **No mundo multiplicativo, a persistência vale mais que a constância.** O vídeo de 2025 do Veritasium resume: num restaurante, as noites boas e ruins se compensam e o que importa é a média. Num mundo de leis de potência, como livros, startups ou vídeos, a maior parte das tentativas falha e uma paga as outras. Entre 1985 e 2014, a Horsley Bridge investiu em 7.000 startups: mais da metade perdeu dinheiro, e **6%** delas geraram **60%** do lucro.

A sorte não é algo que você controla. O número de vezes que você se expõe a ela, sim.

> **WIDGET 11 · `mais-tentativas`**
> **Tag:** tentativas · escolha seu jogo
> **Tipo:** canvas 2D, uma carreira desenhada como uma fileira de tentativas, com a altura de cada barra igual ao impacto.
> **O que mostra:** cada tentativa tem um impacto sorteado de uma lei de potência. Uma linha marca o "sucesso que muda a vida". O leitor escolhe dois parâmetros e vê 100 carreiras simuladas, desenhadas como fileiras finas, com a porcentagem que cruzou a linha.
> **Trabalho cognitivo:** sandbox guiado, para ligar a teoria à decisão pessoal.
> **Estado inicial:** dois cenários lado a lado, `10 tentativas caprichadas` × `100 tentativas boas`, com as porcentagens de quem cruzou a linha.
> **Interação:**
> - `tipo de jogo`: `restaurante (normal)` ou `startup / livro / vídeo (lei de potência)`.
> - `tentativas por ano` e `qualidade de cada tentativa`, que se trocam entre si: mais de uma, menos da outra.
> - `simular 100 carreiras`.
> No jogo normal, qualidade vence. No jogo de lei de potência, o volume vence até um ponto.
> **Celular/acessibilidade:** os cenários ficam empilhados e o resultado também aparece em texto.
> **Legenda:** Num jogo de média, capriche. Num jogo de cauda longa, tente mais vezes. Saber em qual dos dois você está vale mais que qualquer conselho.

---

## 12 · O paradoxo útil

O vídeo termina com um conselho paradoxal. Para ter sucesso, acredite que tudo depende de você, porque quem acha que o resultado é sorte se esforça menos. E saiba que isso não é verdade, nem para você nem para ninguém.

A segunda parte tem consequências. Em experimentos citados por Robert Frank, quem listou fatores externos para algo bom que lhe aconteceu doou cerca de **25% mais** para caridade do que quem listou as próprias qualidades. Um empresário fictício que atribuía parte do sucesso à sorte foi julgado mais gentil e mais desejável como amigo do que o mesmo empresário levando todo o crédito. Os dois estudos são de Frank e nenhum foi revisado por pares.

Frank tem motivo pessoal para pensar nisso. Em 2007 ele teve uma parada cardíaca numa quadra de tênis. Sobreviveu porque uma ambulância estava, por acaso, a poucos minutos de distância.

Volte à sua resposta do início.

> **WIDGET 12 · `sua-parte-de-novo`**
> **Tag:** fechamento · responda de novo
> **Tipo:** SVG inline, a mesma barra da seção 00, agora com duas alças: antes e agora.
> **O que mostra:** a resposta do início, em cinza e fixa, e uma alça nova para responder de novo. Embaixo, um resumo de três linhas que muda conforme a diferença ("Você aumentou a parte da sorte em 18 pontos"). Abaixo, um cartão com os cinco números do ensaio: 47,5% (São Paulo FC), metade da renda (país), 3% (Catânia), 1,6 → 9,3 (astronautas), 1 de 56 (fundos).
> **Trabalho cognitivo:** memória e reflexão. Fecha o compromisso feito na seção 00.
> **Estado inicial:** se não há resposta salva, as duas alças aparecem no meio com o pedido "responda as duas".
> **Interação:** arrastar, `baixar cartão` (PNG 1200×630 gerado no canvas) e `começar de novo`.
> **Persistência:** lê `rs_sorte_resposta` do `localStorage`, com fallback silencioso.
> **Celular/acessibilidade:** igual à seção 00.
> **Legenda:** Acredite que depende de você. Saiba que não depende só de você. E aumente a sorte de alguém.

---

## Nota de método

- **Correções ao vídeo** (entram como notas laterais discretas nas seções, não como "pegadinha"):
  - **140% dos coautores:** não é a soma real das respostas. É a média de quanto cada autor diz ter feito multiplicada pelo número de autores (Caruso, Epley e Bazerman, 2006).
  - **"4× mais chance de virar profissional" no hóquei:** vale para as ligas juniores de elite (Barnsley, 1985). No draft da NHL a razão é cerca de 2,3×.
  - **"7 de 8 recordes com vento":** são 6 de 8 com vento a favor medido. O sétimo é o de Florence Griffith Joyner, com leitura de 0,0 contestada.
  - **NASA:** foram 12 selecionados, e 11 se formaram.
  - **Biscoitos:** eram 5 biscoitos, não 4. O líder pegava o extra *com mais frequência*, não sempre. O líder também tinha um papel: dar pontos aos colegas. O estudo (Ward e Keltner, 1998) nunca foi publicado formalmente, por isso fica fora do ensaio.
  - **Doações:** o grupo que listou fatores externos doou 25% *mais*, o que equivale a cerca de 20% menos para o outro grupo, não aos "25% menos" do vídeo.
- **Astronautas:** o resultado de 1,6 em 11 depende da habilidade uniforme. A seção 05 mostra as duas versões.
- **Modelo de Catânia:** o resultado depende das premissas, e o widget 04 deixa essas premissas mudáveis. Não usamos o "80/20" do artigo, porque o próprio artigo se contradiz sobre ele.
- **Wiseman e Frank:** os estudos não foram revisados por pares e aparecem como tal no texto.
- **Contrapeso:** estudos com loterias suecas e da Geórgia mostram que dinheiro sorteado não melhorou a educação dos filhos (Cesarini et al.; Bleakley e Ferrie). A sorte de ganhar dinheiro não é a mesma sorte de nascer num ambiente. Entra numa nota da seção 02.
- **Fora do ensaio:** citações sem fonte primária (Kodak, Nokia), a "Escola da Sorte" de Wiseman (com resultados autodeclarados) e o "efeito CEO" de Fitza, que é contestado.

## Fontes principais

**Vídeos:** Veritasium, *Is Success Luck or Hard Work?* (28/08/2020, hoje *Why Being Delusional is a Superpower*) · Veritasium, *You've (Likely) Been Playing The Game Of Life Wrong* (26/11/2025) e as simulações em veritasium.com/simulation3–5.

**Livros:** Robert H. Frank, *Success and Luck* (2016) · Michael Mauboussin, *The Success Equation* (2012) · Daniel Kahneman, *Rápido e Devagar* (2011) · Malcolm Gladwell, *Fora de Série* (2008) · Richard Wiseman, *O Fator Sorte* (2003).

**Viés e atribuição:** Ross e Sicoly, *JPSP* 1979 · Caruso, Epley e Bazerman, *JPSP* 2006 · Morning Consult/NYT, abril de 2020.

**Idade relativa:** Barnsley, Thompson e Barnsley, *CAHPER Journal* 1985 · Massa et al., 2014 (São Paulo FC) · dados do draft da NHL, 1980–2024.

**Berço:** Milanovic, *Review of Economics and Statistics* 2015 · Banco Mundial, RNB per capita 2024 · Bell, Chetty et al., *QJE* 2019 ("Lost Einsteins").

**Modelos:** Pluchino, Biondo e Rapisarda, *Advances in Complex Systems* 2018 · Peters, *Nature Physics* 2019 (ergodicidade).

**Experimentos:** Salganik, Dodds e Watts, *Science* 2006 · Salganik e Watts, *Social Psychology Quarterly* 2008 · van de Rijt et al., *PNAS* 2014 · Bol, de Vaan e van de Rijt, *PNAS* 2018 · Sinatra et al., *Science* 2016 · Liu et al., *Nature* 2018.

**Mercado:** S&P Dow Jones Indices, SPIVA Brasil e Persistence Scorecard · Horsley Bridge, dados citados por Benedict Evans.

**Simulação dos astronautas:** script próprio (`luck_sim.py`), 1.000 repetições por célula.

---

*O vento a favor · ensaio interativo · proposta de projeto · outubro de 2026*
