# Rascunho LinkedIn (PT): estratégia para marcas

> Capa: vídeo da fábrica em PT (`videos/pt/v0-factory.mp4`). GIFs inline em `videos/pt/*.gif` nos pontos `[GIF n]`.

## Título

**Dissequei o algoritmo do X linha por linha. O que o código ensina sobre distribuição de conteúdo**

(alternativa: "Li o código do algoritmo do X. 6 lições para quem cuida de conteúdo de marca")

---

Todo time de marketing tem uma teoria sobre algoritmo. Hashtag ajuda. Link derruba alcance. Postar demais queima a conta.

No X, isso deixou de ser teoria. A empresa publica no GitHub o código que monta o feed "Para você", com os parâmetros de produção. Eu li o código, linha por linha, e reconstruí o sistema num ensaio interativo para entender cada peça.

Este texto não é sobre crescer no X. É sobre o que o código de um sistema de recomendação moderno revela sobre distribuição de conteúdo. Os números são do X. A lógica vale para quem planeja conteúdo em qualquer feed.

## A ideia central: o post não tem uma nota

Para cada post e cada pessoa que poderia vê-lo, um modelo derivado do Grok prevê a probabilidade de 64 ações: curtir, responder, compartilhar, copiar o link, silenciar o autor, denunciar. Cada probabilidade é multiplicada por um peso, e a soma é a nota.

Ou seja: o mesmo post tem uma nota alta para quem se interessa pelo tema e uma nota negativa para quem não se interessa.

[GIF 2: mesmo post, duas notas]

Para marcas, isso desmonta a pergunta "esse conteúdo é bom?". A pergunta certa é **"para quem esse conteúdo é óbvio, e para quem ele é um incômodo?"**. Alcance genérico é exatamente o que o sistema pune.

## Como o feed é montado

A cada atualização, o X percorre cinco etapas:

1. **Busca de candidatos:** quatro fontes trazem até 2.800 posts.
2. **Filtro:** saem posts velhos, já vistos, respostas de fora da rede e contas rotuladas.
3. **Ranking:** o modelo prevê as 64 probabilidades para cada post.
4. **Pesos e diversidade:** as probabilidades viram uma nota, e posts parecidos demais são cortados.
5. **Cold start:** uma posição, a 16ª, fica reservada para um post novo de conta pequena.

Saem 35 posts. Cada uma dessas etapas tem uma lição para quem produz conteúdo.

## 1. Conteúdo bom é conteúdo enviado

Estes são os pesos do código:

[GIF 1: quanto vale cada ação]

**Copiar o link de um post vale 20, cerca de 30 likes.** É a ação mais valiosa do sistema, porque significa que alguém vai mandar o conteúdo para outra pessoa. **Salvar nos favoritos vale zero.** O famoso "um reply vale 27 likes" vem do código de 2023 e não vale mais.

**Para marcas:** a métrica que mais pesa é a intenção de encaminhar. Dados próprios, comparações, frameworks e listas que resolvem uma discussão são feitos para isso. Post institucional raramente é.

## 2. O "não tenho interesse" custa caro

Os pesos negativos são enormes: −52 para "não tenho interesse", −59 para silenciar o autor. Considerando só likes, um post com 1% de chance de "não tenho interesse" precisaria de cerca de 80% de chance de like para empatar.

**Para marcas:** mostrar conteúdo para o público errado não é neutro, é negativo. Provocação gratuita, tema forçado e post fora da linha editorial atraem justamente as ações que afundam a nota. Segmentação ruim custa mais do que conteúdo fraco.

## 3. Diferenciação virou regra de código

Depois da nota, as 150 melhores passam por um algoritmo de diversidade. Ele escolhe 50 que tenham nota alta e sejam diferentes entre si. **Os que não são escolhidos recebem nota zero.**

[GIF 5: posts parecidos ganham nota zero]

**Para marcas:** a pauta de oportunidade que todo mundo publica no mesmo dia disputa vaga com dezenas de posts quase iguais. Ângulo próprio, dado próprio ou formato diferente não são estética, são condição para ser escolhido.

## 4. Texto genérico de IA tem rótulo próprio

Antes do ranking, classificadores marcam contas e posts. Um deles se chama literalmente `llm_slop`, texto genérico de IA. O rótulo dura 30 dias e tira o post do feed de todo mundo que não segue a conta. Citar ou responder um post rotulado também derruba o seu.

**Para marcas:** times que usam IA para produzir em escala precisam de voz, edição e especificidade. O risco não é a IA, é o texto que soa como média de todos os textos.

## 5. Contas pequenas têm uma vaga reservada

Em cada feed, a 16ª posição pode ir para um post em "cold start": original, com até 2 horas, menos de 200 visualizações no feed e de um autor com até 50 mil seguidores. O critério é a taxa de likes por visualização, com uma estimativa conservadora: 3 likes em 20 views viram 5,4%, não 15%.

[GIF 4: cold start]

**Para marcas:** essa regra favorece perfis de pessoas, não de empresas grandes. Executivos, especialistas e funcionários que publicam conteúdo próprio competem por uma vaga que a conta oficial não disputa. E as primeiras visualizações decidem: publique quando o público mais engajado está online, não quando há mais gente online.

## 6. Relacionamento tem peso no código

Quando autor e leitor se seguem, uma resposta num post original vale 20 em vez de 5. O próprio repositório registra que testaram valores de 5 a 20 e ajustaram para 15 de bônus depois de reclamações durante a Copa.

**Para marcas:** responder e acompanhar quem interage não é cortesia, é distribuição. Comunidade aparece literalmente como multiplicador.

## Os números mudam. O mecanismo fica.

Quase todo número acima é configurável sem novo deploy: o serviço de ranking relê a configuração a cada 30 segundos, e testes A/B dividem usuários em grupos. Pesos vão mudar. O que tende a ficar é o desenho: nota por leitor, punição pesada para feedback negativo, diversidade obrigatória e espaço reservado para contas novas.

## Checklist para times de conteúdo

- Para cada post, defina para quem ele é óbvio e para quem ele é incômodo.
- Meça encaminhamentos e compartilhamentos, não só likes e salvamentos.
- Antes de entrar numa pauta do dia, encontre o ângulo que ninguém está usando.
- Edite todo texto gerado por IA até ele soar como alguém específico.
- Invista em porta-vozes com conta própria e responda quem interage nas primeiras horas.

---

Montei uma versão interativa onde dá para rodar o sistema: mudar as probabilidades, adicionar likes, inundar o feed com posts parecidos e ver o post ganhar nota zero.

**Dissecando o algoritmo do X (ensaio interativo):** https://renatoshira.github.io/dissecando-o-algoritmo-do-x.html

Tudo aqui vem do repositório público `xai-org/x-algorithm` (commit 7f2ca2b, 21 de outubro de 2026). Os arquivos e as linhas estão citados no ensaio.
