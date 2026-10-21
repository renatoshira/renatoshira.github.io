# O feed por dentro

**Ensaio interativo sobre o algoritmo do X · estado do código em outubro de 2026 · por Renato Shirakashi**

> Subtítulo para o hero: *O código do For You é público. Este é o algoritmo do X lido linha por linha: quanto vale cada ação, o que decide o alcance de uma conta pequena e quais conselhos de "growth" o código desmente.*

> **Nota de formato.** Roteiro completo do artigo: prosa final mais a especificação de cada figura interativa. Nenhum HTML ainda. Segue a estrutura de *A régua e o rótulo*: seções numeradas, uma figura por seção, números conferidos no código, fontes no fim. O público já usa o X, então o texto não explica o produto, só o algoritmo. Um post de exemplo, o da **@ana** (1.200 seguidores, escreve sobre café), é usado por todas as figuras. Cada bloco traz **trabalho cognitivo**, **estado inicial** (a figura parada precisa funcionar sozinha, porque a maioria não interage) e **celular/acessibilidade**. Esta nota sai da versão final.

---

## 00 · O funil

Cada vez que o For You atualiza, o sistema busca candidatos numa base de cerca de **10 milhões** de posts recentes, seleciona até **2.800**, calcula uma nota para cada um, aplica um filtro de diversidade que deixa **50** e entrega **35**.

Tudo neste artigo vem do repositório `xai-org/x-algorithm`, que o X publica com os parâmetros de produção. A versão usada é de 21 de outubro de 2026.

O exemplo do artigo é este post da @ana, uma conta com 1.200 seguidores:

> *Fiz o mesmo café de seis jeitos diferentes. O método mais barato ganhou. Notas e fotos abaixo.*

A pergunta é o que o algoritmo faz com ele.

> **WIDGET 00 · `o-funil`**
> **Tag:** o funil · siga o post da @ana
> **Tipo:** canvas 2D, funil vertical de quatro estágios com partículas.
> **O que mostra:** `~10 milhões` → `até 2.800 candidatos` → `150 maiores notas` → `50 após diversidade` → `35 no feed`. Um ponto laranja (o post da @ana) desce com os outros. Os descartados saem pela lateral em cada estágio. Cada estágio tem o nome da seção que o explica: *fontes*, *nota*, *diversidade*, *entrega*.
> **Trabalho cognitivo:** dar o mapa do artigo antes dos detalhes.
> **Estado inicial:** anima uma vez ao entrar na tela e para no fim, com a @ana entre os 35.
> **Interação:** `ver de novo` e `e se a @ana não passar?` (o ponto cai na etapa de nota). Clicar num estágio leva à seção.
> **Celular/acessibilidade:** vertical, cabe em qualquer largura. Com `prefers-reduced-motion`, mostra só o estado final.
> **Legenda:** Quatro etapas entre o post e o feed. Cada seção abaixo cobre uma.

---

## 01 · De onde vêm os candidatos

Os candidatos vêm de quatro fontes:

| Fonte | O que traz | Máximo |
|---|---|---|
| **Thunder** | posts de quem você segue | 1.200 |
| **Phoenix** | posts de fora da rede parecidos com o seu histórico | 1.000 + 200 de posts novos |
| **SimClusters** | posts curtidos por pessoas com gosto parecido com o seu | 800 |
| **Populares** | posts em alta, só dos 0,005% maiores autores | 500 |

Para a @ana, isso significa: os 1.200 seguidores recebem o post via Thunder. Qualquer pessoa fora disso só vê o post se ele vier por Phoenix ou SimClusters.

Depois, os candidatos são filtrados. Saem posts com mais de 48 horas, posts já vistos e autores bloqueados ou silenciados. Dois filtros importam mais:

**Respostas e reposts de fora da rede são descartados.** Uma resposta da @ana a uma conta grande nunca aparece no For You de quem não segue a @ana. Fora da rede, só circulam posts originais.

**Rótulos tiram a conta do alcance fora da rede.** Classificadores marcam posts e contas como spam, conteúdo adulto ou texto genérico de IA (`llm_slop`). Com um rótulo, o post sai do feed de quem não te segue, seja qual for a nota. O rótulo de texto genérico de IA dura **30 dias**. Três posts adultos entre os cinco últimos rotulam a conta por **7 dias**. E citar ou responder um post rotulado derruba o seu post também, inclusive para seus seguidores.

> **WIDGET 01 · `as-fontes`**
> **Tag:** as fontes · troque de leitor
> **Tipo:** SVG inline, diagrama de fluxo: quatro fontes → candidatos → filtros → ranking.
> **O que mostra:** as quatro fontes com seus limites, os filtros listados abaixo e o post da @ana destacado em laranja no caminho que ele percorre.
> **Trabalho cognitivo:** mostrar que dentro e fora da rede são caminhos diferentes, e que rótulo é bloqueio, não desconto.
> **Estado inicial:** leitor é seguidor da @ana. O post chega via Thunder.
> **Interação:** três botões, um conceito cada:
> - `leitor não segue a @ana`: Thunder fica inativo para ela; o post só aparece via Phoenix ou SimClusters se já estiver nos índices (seção 03).
> - `é uma resposta`: o post é barrado no filtro de fora da rede.
> - `conta rotulada`: Phoenix, SimClusters e Populares ficam todos bloqueados.
> **Celular/acessibilidade:** fontes empilhadas. Botões com `aria-pressed`. Uma frase abaixo descreve o estado ("O post chega via Thunder").
> **Legenda:** Seguidores recebem o post por um caminho próprio. Para o resto, o post precisa entrar nas fontes de fora da rede, onde respostas e contas rotuladas não entram.

---

## 02 · Como o sistema representa você e o post

Phoenix e SimClusters funcionam com **embeddings**: cada usuário e cada post vira um vetor, e posts parecidos ficam próximos. Buscar candidatos fora da rede é buscar os posts mais próximos do seu vetor.

Seu vetor vem das suas últimas **1.022 ações**. Curtiu três posts de café hoje, e na próxima atualização a @ana está mais perto de você.

O texto do post não entra cru no modelo. O post vira um conjunto de códigos (*semantic IDs*) gerado a partir do texto, das imagens, da transcrição do áudio e do título do link. Dados do autor também entram: bio, selo, número de seguidores, país e idioma. A bio conta, mas o código não diz quanto.

> **WIDGET 02 · `o-espaco`**
> **Tag:** embeddings · curta e veja seu vetor mudar
> **Tipo:** canvas 2D, ~400 pontos em quatro grupos de tema (café, futebol, tecnologia, política) e um ponto maior para o leitor.
> **O que mostra:** um mini-feed com seis posts (dois de café, um deles o da @ana) e o espaço 2D abaixo. Um círculo em volta do leitor marca os candidatos que Phoenix traria.
> **Trabalho cognitivo:** ver o histórico virar posição.
> **Estado inicial:** leitor no centro; o post da @ana fora do círculo.
> **Interação:** curtir posts do mini-feed move o ponto do leitor na direção do post curtido. Depois de dois likes em café, a @ana entra no círculo. Botão `zerar`.
> **Ao lado (estático):** o post da @ana e, embaixo, a sequência de códigos em que ele vira.
> **Celular/acessibilidade:** mini-feed em cima, espaço embaixo com `position: sticky`. Texto: "3 posts novos de café entraram nos seus candidatos".
> **Legenda:** Os candidatos de fora da rede são os posts mais próximos do seu vetor. O espaço real tem centenas de dimensões; aqui são duas.

---

## 03 · O primeiro like e o 32º

Phoenix só busca posts que estão nos seus **índices**. Post fora do índice não chega a quem não segue o autor.

Os índices têm nomes diretos: **`1fav`**, para posts com pelo menos 1 like, e **`32fav`**, para posts com pelo menos 32. Sem o primeiro like, o post da @ana não existe fora da rede dela. Com 32, entra num segundo índice.

SimClusters distribui o post para os grupos de quem curtiu. Então importa quem curte, não só quantos. Likes de quem segue contas de café levam o post a mais gente de café. Likes de amigos aleatórios levam a grupos aleatórios.

> **WIDGET 03 · `os-indices`**
> **Tag:** as primeiras 24 horas · arraste o tempo
> **Tipo:** SVG inline, likes acumulados ao longo de 24h.
> **O que mostra:** a curva de likes do post. Marcas em `1 like` (entra no `1fav`) e `32 likes` (entra no `32fav`). Abaixo, três faixas que acendem: *seguidores* (desde o início), *Phoenix*, *SimClusters*.
> **Trabalho cognitivo:** mostrar a ordem dos eventos e o que cada limiar libera.
> **Estado inicial:** dia em que o post passa dos dois limiares, com tudo aceso.
> **Interação:** cursor de tempo. Presets `likes rápidos` (1º like em 4 min, 32 às 5h) e `likes lentos` (1º like aos 50 min, para em 25). Botão `likes do nicho` / `likes aleatórios` muda o destino da faixa SimClusters.
> **Celular/acessibilidade:** cursor é `<input type=range>` nativo.
> **Legenda:** 1 like põe o post no índice principal. 32 likes, no segundo. O primeiro depende de velocidade; o segundo, de concentrar engajamento num post.

---

## 04 · Teste: quanto vale cada ação

Antes dos pesos: ordene estas seis ações da que mais ajuda à que mais prejudica um post.

> **WIDGET 04 · `a-aposta`**
> **Tag:** sua aposta · ordene e revele
> **Tipo:** lista reordenável (arrastar ou setas ↑ ↓), depois barras horizontais em SVG.
> **O que mostra:** *curtir*, *responder*, *repostar*, *salvar*, *copiar link*, *silenciar o autor*, embaralhados. Ao revelar, reordenam com o peso real: copiar link `20`, responder `5`, repostar `1`, curtir `0,66`, salvar `0`, silenciar `−58,8`. Linhas ligam a posição escolhida à real.
> **Trabalho cognitivo:** previsão. Quase todo mundo põe *salvar* alto e *copiar link* baixo.
> **Estado inicial:** embaralhado. A resposta está no parágrafo seguinte para quem não interage.
> **Interação:** reordenar, `revelar`, e depois `pesos de 2023`, que mostra em cinza os pesos do código de 2023 (de onde veio o "reply = 27 likes").
> **Celular/acessibilidade:** setas ↑ ↓ como forma principal. Alvos de 44 px.
> **Legenda:** Ordene e revele. Em cinza, o código de 2023.

**Salvar tem peso zero. Copiar o link do post vale 20, cerca de 30 likes.** É a ação mais valiosa do sistema. O "reply = 27 likes" vem do código de 2023 e não vale mais.

---

## 05 · A nota

O ranking usa o **Phoenix**, um transformer derivado do Grok. Para cada par (você, post), ele prevê a probabilidade de 64 ações. A nota é a soma de cada probabilidade multiplicada pelo seu peso:

**nota = 0,66 × P(like) + 5 × P(reply) + 20 × P(copiar link) + … − 52 × P(não tenho interesse) − 59 × P(silenciar) − 234 × P(denunciar)**

Os pesos multiplicam **probabilidades previstas para cada usuário**, não contagens. O post da @ana não tem uma nota: tem uma para cada pessoa. Para quem curte café, P(reply) é alta. Para quem só vê futebol, é quase zero e P(não tenho interesse) sobe.

| Ação | Peso | Em likes |
|---|---|---|
| Copiar link | 20 | 30× |
| Reply | 5 | 7,6× |
| Quote | 5 | 7,6× |
| Enviar por DM | 5 | 7,6× |
| Seguir o autor | 4 | 6× |
| Like | 0,66 | 1× |
| Salvar, clique no perfil, view de vídeo | 0 | 0 |
| Bloquear | −31,2 | −47× |
| Não tenho interesse | −52,3 | −79× |
| Silenciar | −58,8 | −89× |
| Denunciar | −234 | −355× |

*(Tabela completa recolhível: repost 1, compartilhar 2, tempo de leitura após abrir 0,4 por unidade, clique 0,3, abrir link 0,2, dwell 0,05, expandir foto 0,05, abrir vídeo 0,02, rolar sem parar −0,02.)*

### Seguidores mútuos

Se autor e leitor se seguem e o post é original, o reply ganha **+15 e passa a valer 20**. O repositório registra a história: testaram de 5 a 20, lançaram com 20 e baixaram para 15 em julho, depois de reclamações durante a Copa.

Na prática: seguir de volta quem comenta nos seus posts multiplica por 4 o peso do reply dessas pessoas. Seguir de volta quem nunca interage não muda nada, porque a P(reply) delas é perto de zero.

> **WIDGET 05 · `a-nota`**
> **Tag:** a nota · dois leitores, o mesmo post
> **Tipo:** SVG inline. Figura principal do artigo.
> **O que mostra:** dois gráficos lado a lado, um por leitor. Em cada um, barras empilhadas: acima do zero, as contribuições positivas (P × peso de like, reply, copiar link, repost, tempo de leitura); abaixo, as negativas (não tenho interesse, silenciar, denunciar). A nota total em cima. Cada ação tem a mesma cor aqui e na fórmula do texto.
> **Trabalho cognitivo:** tornar visível que a nota é por leitor.
> **Estado inicial:** à esquerda, **Bia, que segue contas de café**: P(like) 12%, P(reply) 3%, P(copiar link) 0,5%, P(não tenho interesse) 0,1%. Nota positiva, e a maior contribuição é o reply (0,15), não o like (0,08). À direita, **Caio, que só vê futebol**: P(like) 1%, P(reply) 0,1%, P(não tenho interesse) 1,5%. Nota negativa.
> **Interação:**
> - Probabilidades da Bia editáveis (slider e campo numérico).
> - Botão `Bia e @ana se seguem`: a contribuição do reply dela quadruplica.
> - Presets do post: `útil`, `thread longa`, `rage bait`, `meme`. Ao trocar, um traço mostra a nota anterior.
> **Persistência:** post e leitores ficam em memória e são usados nas seções 06 e 10.
> **Celular/acessibilidade:** gráficos empilhados. Sliders `<input type=range>` com `aria-valuetext` ("reply: 3%, soma 0,15").
> **Legenda:** A nota é calculada por leitor. Um reply pouco provável pode valer mais que um like provável, e uma probabilidade pequena de feedback negativo apaga várias positivas.

---

## 06 · Sinais negativos

No preset `rage bait`, o post tem mais likes e replies e mesmo assim a nota cai. P(não tenho interesse) e P(silenciar) sobem, e os pesos delas são −52 e −59. Considerando só likes, 1% de chance de "não tenho interesse" exige cerca de 80% de chance de like para compensar. Nota negativa põe o post abaixo de todos os positivos do feed.

O contrário também circula: *uma denúncia cancela 468 likes, então denúncia em massa derruba qualquer conta*. Essa conta usa o peso antigo do like (0,5); com o atual, seria 355. Mas a conta está errada de qualquer forma, e um comentário dos engenheiros em `param.rs` explica por quê:

1. O peso multiplica a **probabilidade prevista** de denúncia, não o número de denúncias. Denúncia é mais de mil vezes mais rara que like; o peso é alto para que essa probabilidade minúscula tenha algum efeito.
2. A previsão é personalizada. Denúncias de um grupo mudam a previsão para usuários parecidos com esse grupo, não para todos.

> **WIDGET 06 · `contagem-ou-probabilidade`**
> **Tag:** o mito dos 468 likes · troque o modo
> **Tipo:** reusa o gráfico da Bia da seção 05, com um painel em SVG.
> **O que mostra:** modo `contagem` (como os guias explicam): 1 denúncia vira uma barra negativa do tamanho de centenas de likes. Modo `probabilidade` (como o código faz): uma grade de 1.000 likes com uma denúncia, e as barras recalculadas como P × peso, em que a denúncia fica do tamanho das outras contribuições.
> **Trabalho cognitivo:** mostrar o modelo errado e depois corrigi-lo.
> **Estado inicial:** modo `contagem`, rotulado *como os guias explicam*.
> **Interação:** alternar `contagem` / `probabilidade`. Link para o comentário original no código, com tradução.
> **Celular/acessibilidade:** painel abaixo do gráfico. Grade 20 × 50 com descrição em texto.
> **Legenda:** Os pesos negativos são altos porque essas ações são raras. Um post cai quando o modelo prevê que muita gente não quer vê-lo, não por uma denúncia isolada.

---

## 07 · Diversidade

Das 150 maiores notas, um algoritmo de diversidade (DPP) escolhe **50** que tenham nota alta e embeddings distantes entre si. **Os não escolhidos recebem nota zero.** Das 50, as 35 maiores notas vão para o feed.

Consequência: um post compete com posts parecidos, não só com posts melhores. Se a @ana posta a mesma opinião que todo mundo sobre o assunto do dia, ela disputa vaga com dezenas de posts próximos no espaço de embeddings. Com um ângulo próprio, um dado original ou um formato visual diferente, ela fica sem concorrente próximo.

> **WIDGET 07 · `o-dpp`**
> **Tag:** diversidade · adicione posts do assunto do dia
> **Tipo:** canvas 2D, 150 posts posicionados por similaridade.
> **O que mostra:** cada post é um retângulo com cor por tema e altura pela nota; a @ana com borda laranja. `rodar` executa a seleção gulosa: a cada escolhido, os vizinhos perdem valor. No fim, 50 selecionados e 100 com `nota 0`.
> **Trabalho cognitivo:** comparação. Mesmo cenário rodado duas vezes, com uma variável trocada.
> **Estado inicial:** já rodado, @ana entre os 50.
> **Interação:** `+10 posts do assunto do dia` (dez posts parecidos com o da @ana; ela sai). `post com ângulo próprio` (o post da @ana muda de posição; ela volta, mesmo com nota menor que os vizinhos).
> **Celular/acessibilidade:** grade 10 × 15. Resultado em texto. Com movimento reduzido, seleção instantânea.
> **Legenda:** Os posts não escolhidos ficam com nota zero. Ficar perto de muitos posts parecidos custa mais que ter nota um pouco menor.

---

## 08 · Cold start

Esta é a regra que mais importa para contas pequenas.

**Em cada feed, a 16ª posição pode ser ocupada por um post em cold start**, escolhido entre os candidatos daquele feed. Para concorrer, o post precisa ser **original**, ter até **2 horas**, menos de **200 views no feed**, e o autor precisa ter até **50 mil seguidores**.

O critério é a **taxa de likes por view**. Para não confiar em amostras pequenas, o código parte de uma taxa de **1,5%** com peso de **50 views fictícias**: a estimativa é uma distribuição Beta(0,75 + likes; 49,25 + views − likes).

Antes da figura: **com 3 likes em 20 views, qual taxa o sistema estima?**

> **WIDGET 08a · `a-estimativa`**
> **Tag:** cold start · palpite, depois resultado
> **Tipo:** canvas 2D.
> **O que mostra:** a distribuição Beta da taxa de like do post sobre um eixo de 0% a 20%, com a linha de 1,5% tracejada. Abaixo, uma fileira de quadrados: cinza por view, laranja por like.
> **Trabalho cognitivo:** previsão, resultado, explicação.
> **Estado inicial:** 20 views, 3 likes. Slider `seu palpite` em 15% (3 ÷ 20) e botão `ver a estimativa`. A distribuição aparece só depois.
> **Interação:** depois de revelar (5,4%), dois botões: `+1 view` e `+1 like`. A distribuição se desloca e estreita a cada clique.
> **Celular/acessibilidade:** botões abaixo do canvas. Texto: "Estimativa: 5,4%. Seu palpite: 15%".
> **Legenda:** Com poucas views, a estimativa fica perto de 1,5%. Cada like no começo move bastante a estimativa; depois de muitas views, move pouco.

A resposta é **5,4%**, não 15%. As 50 views fictícias puxam a estimativa para baixo, mas 5,4% ainda é mais que o triplo do ponto de partida.

A escolha não pega simplesmente a maior estimativa. É *Thompson sampling*: a cada feed, o sistema sorteia um valor da distribuição de cada post, leva os dois maiores sorteios para a final e escolhe o de maior nota do modelo. Posts com poucos dados às vezes ganham, e é assim que o sistema testa posts novos.

> **WIDGET 08b · `os-sorteios`**
> **Tag:** a 16ª posição · rode os sorteios
> **Tipo:** canvas 2D.
> **O que mostra:** cinco posts concorrentes, cada um com sua distribuição. A cada atualização de feed, um ponto sorteado aparece em cada distribuição, os dois maiores são destacados e um vence. Placar de vitórias.
> **Trabalho cognitivo:** mostrar a incerteza como sequência de resultados possíveis.
> **Estado inicial:** pausado após 20 sorteios; a @ana venceu 4.
> **Interação:** `play/pause` e `+1 like para a @ana`, que muda o placar visivelmente.
> **Celular/acessibilidade:** pausado por padrão, parado fora da tela. Texto: "@ana: 7 de 20".
> **Legenda:** Cada feed é um novo sorteio. Um like a mais no começo muda a frequência com que a @ana vence.

Dois detalhes do código:

- **Views só contam se forem no feed; likes contam de qualquer lugar** (perfil, notificações, link), limitados ao número de views no feed.
- Daí uma inferência que não está escrita no código: o melhor horário para postar não é o de maior audiência, e sim o horário em que os seguidores **mais engajados** estão online. Views de seguidores que não curtem consomem as 200 views com taxa baixa.

---

## 09 · Mito ou código

> **WIDGET 09 · `mito-ou-codigo`**
> **Tag:** 8 afirmações · mito ou código?
> **Tipo:** cartões HTML com frente e verso, e placar.
> **Cartões:**
> 1. *Hashtag aumenta alcance.* Mito. Nenhuma regra trata hashtags; são texto comum.
> 2. *Salvar ajuda o post.* Mito. Peso zero.
> 3. *Link externo é punido.* Mito. Abrir link vale +0,2. O X confirmou em julho de 2026 que não há penalidade.
> 4. *Premium dá boost.* Em parte. Não há bônus no ranking, mas o selo entra no embedding do post e Premium tem prioridade oficial nos replies.
> 5. *Clique no perfil conta.* Mito. Peso zero.
> 6. *Mandar o link num grupo para curtirem ajuda.* Em parte. Para a nota, não: só conta engajamento em post servido no feed. Para o cold start, os likes contam, limitados às views no feed.
> 7. *Seguir de volta quem comenta ajuda.* Código. O reply de um mútuo vale 20 em vez de 5.
> 8. *Postar várias vezes por dia derruba o alcance.* Mito, se os posts forem espaçados. A penalidade de autor vale só dentro de uma atualização do feed (2º post ×0,625, 3º ×0,44, mínimo ×0,25), e cada post novo concorre ao cold start.
> **Trabalho cognitivo:** memória, com recuperação ativa no fim do artigo.
> **Estado inicial:** cartões fechados, placar `0 de 8`. A resposta de cada um aparece em fonte menor abaixo, para quem não interage.
> **Interação:** `mito` / `código` em cada cartão. O verso traz a resposta, link para a seção e o arquivo do código.
> **Celular/acessibilidade:** um cartão por vez. Com movimento reduzido, troca de face sem girar.
> **Legenda:** A maior parte dos conselhos de crescimento no X atribui peso ao que não tem, ou ignora o que tem muito.

---

## 10 · Simulador

O simulador usa os mecanismos do código. O tamanho dos efeitos depende da audiência de cada conta, que o código não informa, então o resultado é relativo a um cenário base, e cada simulação roda cinco vezes com variação aleatória.

> **WIDGET 10 · `o-simulador`**
> **Tag:** simulador · monte o post
> **Tipo:** HTML + canvas 2D. Opções em cima, o funil da seção 00 embaixo.
> **O que mostra:** o funil com o resultado de cada etapa para o post: entrou nos índices? passou de 32 likes? sobreviveu ao DPP? ganhou a 16ª posição? No fim, cinco pontos (uma por rodada) num eixo de `muito menos` a `muito mais` alcance que o cenário base.
> **Opções:**
> - `horário`: seguidores engajados online / pico geral
> - `mútuos`: segue de volta quem comenta / não segue
> - `final do post`: pergunta específica / sem pergunta
> - `tema`: ângulo próprio / mesma opinião do assunto do dia
> - `tom`: informativo / provocativo
> - `citação`: nenhuma / citou post rotulado
> **Trabalho cognitivo:** exploração livre depois das seções guiadas.
> **Estado inicial:** cenário base da @ana (engajados online, segue de volta, pergunta específica, ângulo próprio, informativo, sem citação), já rodado. Dois desafios: *qual opção sozinha mais derruba o alcance?* e *perca a 16ª posição mudando só uma opção*.
> **Interação:** grupos de botões e `rodar`. A rodada anterior fica em cinza para comparação.
> **Persistência:** usa o post e os leitores da seção 05.
> **Celular/acessibilidade:** opções em cima, resultado embaixo, com resumo em texto ("Mais alcance que o base em 4 de 5 rodadas").
> **Legenda:** Nenhuma opção garante alcance, mas algumas o eliminam. O que mais pesa: likes rápidos de quem é do nicho, replies de mútuos, um post diferente dos outros e nenhum rótulo.

---

## 11 · Resumo

O post da @ana chega aos 1.200 seguidores via Thunder. Para chegar a mais gente, precisa do primeiro like para entrar no índice de Phoenix, e de 32 para entrar no segundo. Cada leitor recebe uma nota própria: probabilidades de like, reply e copiar link, menos as de "não tenho interesse" e silenciar. O DPP zera os posts parecidos demais. E nas duas primeiras horas o post concorre à 16ª posição pela taxa de likes por view.

Os pesos mudam a cada poucas semanas. O repositório tem um segundo conjunto de pesos (like 0,5, "não tenho interesse" −47,5), e o código não diz qual está em produção. Em 19 de outubro de 2026, Elon Musk anunciou um modelo novo que prevê tempo gasto em cada post e leitura até o fim.

Os mecanismos tendem a durar mais que os números: nota por leitor, punição forte para feedback negativo, diversidade obrigatória e cold start baseado em likes por view.

---

## Nota de método

- **Código ≠ produção garantida.** O repositório espelha os parâmetros de produção, mas o X pode trocá-los por configuração ou teste A/B.
- **Dois conjuntos de pesos.** O artigo usa `home-mixer/params/param.rs` (like 0,66). `vm-ranker/params.rs` (like 0,5) é diferente, e não se sabe qual está ativo.
- **Probabilidades ilustrativas.** O código dá os pesos, não as probabilidades típicas.
- **Limiares de 1 e 32 likes** vêm dos nomes dos índices (`1fav`, `32fav`). O código que insere posts neles não está no repositório.
- **O simulador** usa os mecanismos reais com tamanhos de efeito inventados.

---

## Fontes principais

**Código-fonte:** `xai-org/x-algorithm`, commit `7f2ca2b`, 21 de outubro de 2026.
- Pesos e comentário sobre probabilidades e denúncias em massa: `home-mixer/params/param.rs`, linhas 316 a 462.
- Bônus de mútuos e histórico do teste: `home-mixer/params/param.rs`, linha 347, e `docs/BIDIRECTIONAL_BOOST_CHANGE.md`.
- Cold start (200 views, 16ª posição, 50 mil seguidores, 2 horas, Beta 0,75 / 49,25, Thompson sampling): `home-mixer/params/param.rs`, linhas 538 a 605, e `home-mixer/scorers/author_cold_start.rs`, linhas 217 a 283.
- Fontes (Thunder 1.200, Phoenix 1.000 + 200, SimClusters 800, populares para 0,005% dos autores): `home-mixer/params/param.rs`, linhas 4 a 41, e `home-mixer/util/popular_authors.rs`, linha 11.
- Funil (2.800, 50, 35) e idade máxima de 48 horas: `home-mixer/util/phoenix_request.rs`, linha 20, e `home-mixer/params/config.rs`, linhas 17, 19 e 40.
- Phoenix (8 camadas, 1.022 ações, 64 ações, semantic IDs): `phoenix/README.md`. Entradas do embedding: `grox/flows/mm_emb/renderer_v82.py`.
- Índices `1fav` e `32fav`: `phoenix-rankall/src/config/mod.rs`, linhas 172 a 180.
- DPP (150 → 50, nota zero): `vm-ranker/params.rs`, linhas 249 a 252, `vm-ranker/args.rs`, linha 18, e `vm-ranker/scoring/dpp_model.rs`, linhas 200 a 204.
- Penalidade de autor (0,625 · 0,44 · 0,25) e fora da rede ×0,75: `xai-value-model/scoring.rs`, linhas 183 e 206, e `vm-ranker/params.rs`, linhas 179 a 215.
- Replies e reposts de fora da rede: `home-mixer/filters/oon_retweet_reply_filter.rs`.
- Rótulos (IA genérica 30 dias, 3 de 5 posts adultos 7 dias, citação de post rotulado): `abuse-enforcement-service/service-lib/rules/enforcement_user.yaml`, `safety-label-user-agg/postToUserLabelRules.strato` e `home-mixer/candidate_hydrators/vf_candidate_hydrator.rs`.
- Segundo conjunto de pesos: `vm-ranker/params.rs`.

**Anúncios e cobertura:** Elon Musk sobre o novo modelo de ranking, 19 de outubro de 2026 · TechCrunch, "X abre o código e lança o Under the Hood", 13 de agosto de 2026 · TechCrunch, dados de follow mútuo, 13 de julho de 2026 · Nikita Bier sobre links e sobre o rebaixamento de *engagement bait*, 2026.

**Dados de terceiros:** Buffer, análise de Premium no X (18,8 milhões de posts) e análise de links, 2025.

**Desenho das figuras:** guia *Awesome Interactive Widgets* (referência interna): Kim, Reinecke e Hullman, CHI 2017; Hullman, Resnick e Adar, 2015; Segel e Heer, 2010; Conlen, Kale e Heer, 2019.

---

*O feed por dentro · ensaio interativo · dados verificados contra o código-fonte · outubro de 2026*
