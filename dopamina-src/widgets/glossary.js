/* glossary.js : dashed terms in the prose (<span class="gl" data-gl="KEY">)
   open a small definition popup on hover (350 ms), click, tap or Enter.
   One popup for the page, appended to body so it follows the night colors. */
(function () {
  'use strict';
  var G = {
    dopamina: {
      pt: { n: 'Dopamina', d: 'Uma molécula que certos neurônios soltam para mandar sinal a outras células, ou seja, um neurotransmissor. Ela se encaixa em receptores das células vizinhas e muda a chance de elas dispararem. No ensaio, aparece no movimento, no aprendizado pela surpresa, no querer e no controle de hormônios.' },
      en: { n: 'Dopamine', d: 'A molecule that certain neurons release to signal other cells, which makes it a neurotransmitter. It fits into receptors on nearby cells and changes how likely those cells are to fire. In this essay it shows up in movement, in learning from surprise, in wanting and in the control of hormones.' }
    },
    setpoint: {
      pt: { n: 'Ponto de ajuste', d: 'O valor que um sistema do corpo tenta manter, como o termostato mantém a temperatura de uma sala. A ideia de resetar a dopamina supõe que ela tem um valor assim e que ele pode sair do lugar.' },
      en: { n: 'Set point', d: 'The value a body system tries to hold, the way a thermostat holds the temperature of a room. The idea of resetting dopamine assumes that it has such a value and that the value can drift.' }
    },
    noradrenalina: {
      pt: { n: 'Noradrenalina', d: 'Um neurotransmissor e hormônio que prepara o corpo para agir: acelera o coração e aumenta o alerta. O corpo a fabrica a partir da dopamina, com uma etapa a mais na mesma linha de montagem.' },
      en: { n: 'Noradrenaline', d: 'A neurotransmitter and hormone that readies the body for action: it speeds up the heart and raises alertness. The body makes it from dopamine, with one extra step on the same assembly line. In the United States it is usually called norepinephrine.' }
    },
    reserpina: {
      pt: { n: 'Reserpina', d: 'Um remédio extraído de uma planta indiana, a <i>Rauvolfia serpentina</i>. Ele impede os neurônios de guardar dopamina, noradrenalina e serotonina, e os estoques se esvaziam por dias. Hoje quase não se usa.' },
      en: { n: 'Reserpine', d: 'A drug extracted from an Indian plant, <i>Rauvolfia serpentina</i>. It stops neurons from storing dopamine, noradrenaline and serotonin, and the stores stay empty for days. It is rarely used today.' }
    },
    psicose: {
      pt: { n: 'Psicose', d: 'Um estado em que a pessoa perde parte do contato com a realidade, com delírios, que são crenças falsas e firmes, ou alucinações, como ouvir vozes que não existem. Aparece na esquizofrenia e em outras condições. Os remédios que bloqueiam o receptor D2 costumam reduzi-la.' },
      en: { n: 'Psychosis', d: 'A state in which a person loses part of their contact with reality, with delusions, which are false and fixed beliefs, or hallucinations, such as hearing voices that are not there. It occurs in schizophrenia and in other conditions. Drugs that block the D2 receptor usually reduce it.' }
    },
    neurotransmissor: {
      pt: { n: 'Neurotransmissor', d: 'Uma substância que um neurônio solta na ponta das suas fibras para mudar a atividade de outra célula. Dopamina, noradrenalina e serotonina são exemplos. O sinal acaba quando a molécula é recolhida ou desmontada.' },
      en: { n: 'Neurotransmitter', d: 'A substance that a neuron releases at the tips of its fibers to change the activity of another cell. Dopamine, noradrenaline and serotonin are examples. The signal ends when the molecule is taken back up or broken down.' }
    },
    ldopa: {
      pt: { n: 'L-DOPA (levodopa)', d: 'O aminoácido que o cérebro converte diretamente em dopamina, e também o nome do remédio feito com ele. A dopamina não passa do sangue para o cérebro, e a L-DOPA passa, por isso funciona em comprimido. Desde 1970 é o tratamento principal do Parkinson.' },
      en: { n: 'L-DOPA (levodopa)', d: 'The amino acid that the brain converts directly into dopamine, and also the name of the drug made from it. Dopamine cannot pass from the blood into the brain, and L-DOPA can, so it works as a pill. Since 1970 it has been the main treatment for Parkinson’s.' }
    },
    parkinson: {
      pt: { n: 'Doença de Parkinson', d: 'Uma doença em que os neurônios de dopamina da substância negra morrem aos poucos, ao longo de anos. Os sinais típicos são lentidão, rigidez e tremor, que só aparecem quando a maior parte da dopamina do putâmen já se perdeu. Os remédios repõem a dopamina ou imitam o seu efeito.' },
      en: { n: 'Parkinson’s disease', d: 'A disease in which the dopamine neurons of the substantia nigra die gradually, over years. The typical signs are slowness, rigidity and tremor, which appear only when most of the dopamine in the putamen is already gone. The drugs replace dopamine or mimic its effect.' }
    },
    estriado: {
      pt: { n: 'Estriado', d: 'Um conjunto de estruturas no fundo do cérebro formado pelo caudado, pelo putâmen e pelo núcleo accumbens. É o maior destino das fibras de dopamina e ajuda a escolher e a iniciar movimentos e ações. O nome vem das faixas que ele mostra quando cortado.' },
      en: { n: 'Striatum', d: 'A set of structures deep in the brain made up of the caudate, the putamen and the nucleus accumbens. It is the largest target of dopamine fibers and helps select and start movements and actions. The name comes from the stripes it shows when cut.' }
    },
    tirosina: {
      pt: { n: 'Tirosina', d: 'Um aminoácido presente nas proteínas da comida, como carne, ovos e queijo. É a matéria-prima da dopamina. O corpo já tem tirosina de sobra, por isso suplementos dela quase não mudam a produção.' },
      en: { n: 'Tyrosine', d: 'An amino acid found in dietary protein, such as meat, eggs and cheese. It is the raw material of dopamine. The body already has plenty of tyrosine, so supplements barely change production.' }
    },
    enzima: {
      pt: { n: 'Enzima', d: 'Uma proteína que acelera uma reação química específica, como uma ferramenta que só faz uma tarefa. Na linha de montagem da dopamina, cada etapa depende de uma enzima diferente.' },
      en: { n: 'Enzyme', d: 'A protein that speeds up one specific chemical reaction, like a tool built for a single task. On the dopamine assembly line, each step depends on a different enzyme.' }
    },
    th: {
      pt: { n: 'Tirosina hidroxilase', d: 'A enzima que transforma tirosina em L-DOPA, a etapa lenta da fabricação de dopamina. Ela já trabalha perto do limite e é freada pela própria dopamina quando sobra. Por isso é ela que decide quanto sai da linha de montagem.' },
      en: { n: 'Tyrosine hydroxylase', d: 'The enzyme that turns tyrosine into L-DOPA, the slow step in making dopamine. It already works close to its limit and is braked by dopamine itself when there is a surplus. That is why it sets how much comes off the assembly line.' }
    },
    barreira: {
      pt: { n: 'Barreira hematoencefálica', d: 'A camada de células bem coladas nas paredes dos vasos do cérebro, que filtra o que passa do sangue para o tecido. A dopamina não atravessa. A L-DOPA atravessa porque é levada por um transportador de aminoácidos.' },
      en: { n: 'Blood-brain barrier', d: 'The layer of tightly joined cells lining the brain’s blood vessels, which filters what passes from the blood into the tissue. Dopamine cannot cross it. L-DOPA can, because an amino acid transporter carries it across.' }
    },
    carbidopa: {
      pt: { n: 'Carbidopa', d: 'Um remédio dado junto com a levodopa. Ele bloqueia, fora do cérebro, a enzima que transforma levodopa em dopamina, e não atravessa a barreira do cérebro. Assim a conversão se concentra onde importa, a dose cai e a náusea diminui.' },
      en: { n: 'Carbidopa', d: 'A drug given together with levodopa. It blocks, outside the brain, the enzyme that turns levodopa into dopamine, and it does not cross the brain’s barrier. The conversion then happens where it matters, the dose falls and nausea decreases.' }
    },
    neuronio: {
      pt: { n: 'Neurônio', d: 'A célula do sistema nervoso que recebe sinais de outras células e, quando eles passam de um limiar, dispara um pulso elétrico pelo axônio. O pulso faz a ponta do axônio soltar neurotransmissores sobre as células seguintes.' },
      en: { n: 'Neuron', d: 'The nerve cell that receives signals from other cells and, when they cross a threshold, fires an electrical pulse along its axon. The pulse makes the tip of the axon release neurotransmitters onto the next cells.' }
    },
    mesencefalo: {
      pt: { n: 'Mesencéfalo', d: 'A parte de cima do tronco cerebral, logo abaixo dos dois hemisférios. Abriga os dois grupos principais de neurônios de dopamina, a substância negra e a área tegmental ventral.' },
      en: { n: 'Midbrain', d: 'The top part of the brainstem, just below the two hemispheres. It holds the two main groups of dopamine neurons, the substantia nigra and the ventral tegmental area.' }
    },
    sn: {
      pt: { n: 'Substância negra', d: 'Um núcleo do mesencéfalo que parece escuro a olho nu por causa de um pigmento, a neuromelanina. Seus neurônios de dopamina mandam fibras ao putâmen e ao caudado, e são os que morrem no Parkinson.' },
      en: { n: 'Substantia nigra', d: 'A midbrain nucleus that looks dark to the naked eye because of a pigment, neuromelanin. The name is Latin for black substance. Its dopamine neurons send fibers to the putamen and the caudate, and they are the ones that die in Parkinson’s.' }
    },
    atv: {
      pt: { n: 'Área tegmental ventral', d: 'Um grupo de neurônios de dopamina vizinho da substância negra, no mesencéfalo. Ele manda fibras ao núcleo accumbens e ao córtex pré-frontal e participa da motivação e do aprendizado por recompensa.' },
      en: { n: 'Ventral tegmental area', d: 'A group of dopamine neurons next to the substantia nigra, in the midbrain, often called the VTA. It sends fibers to the nucleus accumbens and the prefrontal cortex and takes part in motivation and in learning from reward.' }
    },
    axonio: {
      pt: { n: 'Axônio', d: 'A fibra longa que sai do corpo do neurônio e leva o sinal elétrico até outras células. No neurônio de dopamina, o axônio se ramifica muitas vezes e cobre uma parte grande do estriado.' },
      en: { n: 'Axon', d: 'The long fiber that leaves the body of a neuron and carries the electrical signal to other cells. In a dopamine neuron, the axon branches many times and covers a large part of the striatum.' }
    },
    sinapse: {
      pt: { n: 'Sinapse', d: 'O ponto de contato em que um neurônio passa o sinal a outra célula. A ponta do axônio solta um neurotransmissor num espaço estreito, e a célula do outro lado o capta com receptores.' },
      en: { n: 'Synapse', d: 'The point of contact where a neuron passes its signal to another cell. The tip of the axon releases a neurotransmitter into a narrow gap, and the cell on the other side picks it up with receptors.' }
    },
    receptor: {
      pt: { n: 'Receptor', d: 'Uma proteína na superfície da célula que reconhece uma molécula específica, como uma fechadura reconhece uma chave. Quando a dopamina se encaixa, o receptor muda o funcionamento da célula. Remédios podem ocupar o mesmo encaixe para imitar ou bloquear a dopamina.' },
      en: { n: 'Receptor', d: 'A protein on the surface of a cell that recognizes one specific molecule, the way a lock recognizes a key. When dopamine fits in, the receptor changes how the cell works. Drugs can occupy the same slot to mimic or block dopamine.' }
    },
    d2: {
      pt: { n: 'Receptores da família D2', d: 'Um dos dois grupos de receptores de dopamina, com os tipos D2, D3 e D4. São muito sensíveis e ficam em parte ocupados mesmo com o nível de fundo. São o alvo dos antipsicóticos e de quase todos os estudos de PET deste ensaio.' },
      en: { n: 'D2-family receptors', d: 'One of the two groups of dopamine receptors, with the types D2, D3 and D4. They are very sensitive and stay partly occupied even at the background level. They are the target of antipsychotics and of almost every PET study in this essay.' }
    },
    d1: {
      pt: { n: 'Receptores da família D1', d: 'O outro grupo de receptores de dopamina, com os tipos D1 e D5. Precisam de mais dopamina para responder, por isso reagem sobretudo às rajadas rápidas de disparo.' },
      en: { n: 'D1-family receptors', d: 'The other group of dopamine receptors, with the types D1 and D5. They need more dopamine to respond, so they react mainly to fast bursts of firing.' }
    },
    erro: {
      pt: { n: 'Erro de previsão', d: 'A diferença entre a recompensa que veio e a que se esperava. Quando vem mais que o esperado, o neurônio de dopamina dispara uma rajada. Quando vem menos, ele se cala, e quando vem o esperado, ele segue no ritmo de fundo.' },
      en: { n: 'Prediction error', d: 'The difference between the reward that came and the reward that was expected. When more comes than expected, the dopamine neuron fires a burst. When less comes, it falls silent, and when the expected reward arrives, it stays at the background rhythm.' }
    },
    td: {
      pt: { n: 'Aprendizado por diferença temporal', d: 'Um método de computação em que o programa corrige suas previsões a cada passo. Ele compara a previsão de agora com a do passo seguinte somada à recompensa recebida, e a diferença entre as duas é o erro que o ajusta. Esse erro se parece com o sinal dos neurônios de dopamina.' },
      en: { n: 'Temporal-difference learning', d: 'A computing method in which a program corrects its predictions at every step. It compares the current prediction with the next step’s prediction plus the reward received, and the difference between the two is the error that adjusts it. That error resembles the signal of dopamine neurons.' }
    },
    rl: {
      pt: { n: 'Aprendizado por reforço', d: 'A área da inteligência artificial em que um programa aprende por tentativa e erro. Ele não recebe a resposta certa, só pontos pelas boas ações, e precisa descobrir sozinho quais ações levam a eles.' },
      en: { n: 'Reinforcement learning', d: 'The field of artificial intelligence in which a program learns by trial and error. It never receives the right answer, only points for good actions, and must work out on its own which actions earn them.' }
    },
    quinino: {
      pt: { n: 'Quinino', d: 'Uma substância muito amarga tirada da casca de uma árvore, a quina, usada contra a malária e na água tônica. Em experimentos com ratos, serve de exemplo de gosto ruim.' },
      en: { n: 'Quinine', d: 'A very bitter substance taken from the bark of the cinchona tree, used against malaria and in tonic water. In rat experiments, it serves as the standard example of a bad taste.' }
    },
    opioides: {
      pt: { n: 'Opioides', d: 'Moléculas que agem nos mesmos receptores da morfina. O corpo fabrica as suas, como as endorfinas, que aliviam a dor e participam do prazer. No ensaio, são a química do gostar.' },
      en: { n: 'Opioids', d: 'Molecules that act on the same receptors as morphine. The body makes its own, such as endorphins, which relieve pain and take part in pleasure. In this essay, they are the chemistry of liking.' }
    },
    accumbens: {
      pt: { n: 'Núcleo accumbens', d: 'A parte de baixo e da frente do estriado, que recebe muitas fibras de dopamina da área tegmental ventral. Participa da motivação e de ir atrás de recompensas, e abriga um ponto pequeno em que os opioides aumentam o gostar.' },
      en: { n: 'Nucleus accumbens', d: 'The lower front part of the striatum, which receives many dopamine fibers from the ventral tegmental area. It takes part in motivation and in going after rewards, and it holds a small spot where opioids increase liking.' }
    },
    bloqueador: {
      pt: { n: 'Bloqueador de dopamina', d: 'Um remédio que ocupa o receptor de dopamina sem ativá-lo e assim impede a dopamina de agir. Os antipsicóticos e alguns remédios contra náusea funcionam assim. O termo técnico é antagonista.' },
      en: { n: 'Dopamine blocker', d: 'A drug that occupies the dopamine receptor without activating it and so keeps dopamine from acting. Antipsychotics and some anti-nausea drugs work this way. The technical term is antagonist.' }
    },
    rm: {
      pt: { n: 'Ressonância magnética', d: 'Um exame que usa ímãs fortes e ondas de rádio para fazer imagens do corpo, sem radiação. A versão funcional acompanha o fluxo de sangue oxigenado e mostra quais regiões do cérebro trabalham mais numa tarefa. Ela não mede dopamina.' },
      en: { n: 'Magnetic resonance imaging', d: 'A scan that uses strong magnets and radio waves to make images of the body, with no radiation. The functional version tracks the flow of oxygenated blood and shows which brain regions work harder during a task. It does not measure dopamine.' }
    },
    pet: {
      pt: { n: 'PET (tomografia por emissão de pósitrons)', d: 'Um exame que injeta no sangue uma dose mínima de uma molécula radioativa e registra onde ela se acumula. Com a molécula certa, mostra quantos receptores ou transportadores de dopamina estão livres. É a principal forma de medir o sistema de dopamina em pessoas vivas.' },
      en: { n: 'PET (positron emission tomography)', d: 'A scan that injects a tiny dose of a radioactive molecule into the blood and records where it collects. With the right molecule, it shows how many dopamine receptors or transporters are free. It is the main way to measure the dopamine system in living people.' }
    },
    pfc: {
      pt: { n: 'Córtex pré-frontal', d: 'A parte do córtex logo atrás da testa. Mantém planos e informações em mente, controla a atenção e freia respostas automáticas. Recebe fibras de dopamina da área tegmental ventral.' },
      en: { n: 'Prefrontal cortex', d: 'The part of the cortex just behind the forehead. It keeps plans and information in mind, directs attention and holds back automatic responses. It receives dopamine fibers from the ventral tegmental area.' }
    },
    ui: {
      pt: { n: 'Curva em U invertido', d: 'Uma relação em que o desempenho sobe com a dose até um ponto ótimo e depois cai. Quem está perto do topo piora com mais, e quem está embaixo melhora.' },
      en: { n: 'Inverted-U curve', d: 'A relationship in which performance rises with the dose up to an optimal point and then falls. People near the top get worse with more, and people near the bottom improve.' }
    },
    mt: {
      pt: { n: 'Memória de trabalho', d: 'A capacidade de manter e manipular algumas informações por poucos segundos, como guardar um número de telefone enquanto se disca. Depende do córtex pré-frontal e é muito sensível à quantidade de dopamina ali.' },
      en: { n: 'Working memory', d: 'The ability to hold and manipulate a few pieces of information for a few seconds, such as keeping a phone number in mind while dialing it. It depends on the prefrontal cortex and is very sensitive to the amount of dopamine there.' }
    },
    bromo: {
      pt: { n: 'Bromocriptina', d: 'Um remédio que imita a dopamina e age sobretudo nos receptores D2. É usado contra o excesso de prolactina e já foi muito usado no Parkinson.' },
      en: { n: 'Bromocriptine', d: 'A drug that mimics dopamine and acts mainly on D2 receptors. It is used against excess prolactin and was once widely used in Parkinson’s.' }
    },
    antipsic: {
      pt: { n: 'Antipsicótico', d: 'Um remédio contra psicose. Quase todos bloqueiam, em parte, o receptor D2 da dopamina. Os efeitos colaterais típicos, como rigidez e aumento da prolactina, vêm do mesmo bloqueio em outras vias.' },
      en: { n: 'Antipsychotic', d: 'A drug against psychosis. Almost all of them partly block dopamine’s D2 receptor. The typical side effects, such as rigidity and raised prolactin, come from the same blockade in other pathways.' }
    },
    ordem: {
      pt: { n: 'Ordem de grandeza', d: 'Um fator de dez. Três ordens de grandeza correspondem a um fator de mil entre o menor e o maior valor.' },
      en: { n: 'Order of magnitude', d: 'A factor of ten. Three orders of magnitude correspond to a factor of a thousand between the smallest and the largest value.' }
    },
    afinidade: {
      pt: { n: 'Afinidade', d: 'A força com que uma molécula se prende a um receptor. Com afinidade alta, uma quantidade pequena basta para ocupar muitos receptores, e a dose necessária é menor.' },
      en: { n: 'Affinity', d: 'How tightly a molecule binds to a receptor. With high affinity, a small amount is enough to occupy many receptors, and the dose needed is lower.' }
    },
    haloperidol: {
      pt: { n: 'Haloperidol', d: 'Um antipsicótico antigo, criado em 1958, que bloqueia com força o receptor D2. Por ser potente e bem estudado, é o remédio de referência nas medidas de ocupação com PET.' },
      en: { n: 'Haloperidol', d: 'An older antipsychotic, created in 1958, that blocks the D2 receptor strongly. Because it is potent and well studied, it is the reference drug in PET occupancy measurements.' }
    },
    ocupacao: {
      pt: { n: 'Ocupação de receptores', d: 'A porcentagem dos receptores de um tipo que está tomada por uma molécula num dado momento. O PET a calcula comparando quantos receptores sobram livres com e sem o remédio. Nos antipsicóticos, a faixa útil fica entre cerca de 65% e 78% dos D2 ocupados.' },
      en: { n: 'Receptor occupancy', d: 'The percentage of receptors of one type that a molecule is holding at a given moment. PET calculates it by comparing how many receptors remain free with and without the drug. For antipsychotics, the useful range lies between about 65% and 78% of D2 receptors occupied.' }
    },
    prolactina: {
      pt: { n: 'Prolactina', d: 'O hormônio que faz as mamas produzirem leite. A hipófise, uma glândula na base do cérebro, tende a soltá-lo o tempo todo, e a dopamina vinda do hipotálamo a segura. Quando um remédio bloqueia a dopamina, a prolactina sobe.' },
      en: { n: 'Prolactin', d: 'The hormone that makes the breasts produce milk. The pituitary, a gland at the base of the brain, tends to release it all the time, and dopamine from the hypothalamus holds it back. When a drug blocks dopamine, prolactin rises.' }
    },
    hipotalamo: {
      pt: { n: 'Hipotálamo', d: 'Uma região pequena na base do cérebro que controla fome, sede, temperatura e a liberação de hormônios, dando ordens à hipófise logo abaixo. No ensaio, aparece como o freio da prolactina.' },
      en: { n: 'Hypothalamus', d: 'A small region at the base of the brain that controls hunger, thirst, temperature and the release of hormones, sending orders to the pituitary just below it. In this essay, it appears as the brake on prolactin.' }
    },
    tronco: {
      pt: { n: 'Tronco cerebral', d: 'A parte do cérebro que liga os hemisférios à medula espinhal e controla funções automáticas como respirar e vomitar. A região citada, a área postrema, fica fora da barreira do cérebro e dispara a náusea quando detecta toxinas no sangue.' },
      en: { n: 'Brainstem', d: 'The part of the brain that connects the hemispheres to the spinal cord and controls automatic functions such as breathing and vomiting. The region mentioned, the area postrema, sits outside the brain’s barrier and triggers nausea when it detects toxins in the blood.' }
    },
    esquizo: {
      pt: { n: 'Esquizofrenia', d: 'Um transtorno mental de longa duração, com episódios de psicose, pensamento desorganizado e perda de motivação. Costuma começar no fim da adolescência ou no começo da vida adulta e afeta cerca de 1 em cada 300 pessoas.' },
      en: { n: 'Schizophrenia', d: 'A long-lasting mental disorder with episodes of psychosis, disorganized thinking and loss of motivation. It usually begins in late adolescence or early adulthood and affects about 1 in 300 people.' }
    },
    agonista: {
      pt: { n: 'Agonista de dopamina', d: 'Uma molécula que se encaixa no receptor de dopamina e o ativa, como a dopamina faria. Age direto no receptor, sem depender dos neurônios de dopamina que restam no Parkinson.' },
      en: { n: 'Dopamine agonist', d: 'A molecule that fits into the dopamine receptor and activates it, as dopamine would. It acts directly on the receptor, without depending on the dopamine neurons that remain in Parkinson’s.' }
    },
    prami: {
      pt: { n: 'Pramipexol', d: 'Um agonista de dopamina usado no Parkinson e na síndrome das pernas inquietas, com preferência pelos receptores D3 e D2. É um dos remédios mais ligados a jogo compulsivo e compras sem controle.' },
      en: { n: 'Pramipexole', d: 'A dopamine agonist used in Parkinson’s and restless legs syndrome, with a preference for D3 and D2 receptors. It is one of the drugs most strongly linked to compulsive gambling and uncontrolled shopping.' }
    },
    ropini: {
      pt: { n: 'Ropinirol', d: 'Outro agonista de dopamina usado no Parkinson e na síndrome das pernas inquietas, com preferência pelos receptores D2 e D3. Foi o remédio do caso Jambart, na França.' },
      en: { n: 'Ropinirole', d: 'Another dopamine agonist used in Parkinson’s and restless legs syndrome, with a preference for D2 and D3 receptors. It was the drug in the Jambart case in France.' }
    },
    tci: {
      pt: { n: 'Transtorno do controle de impulsos', d: 'Um padrão em que a pessoa não consegue resistir a um impulso que lhe faz mal, como jogar, comprar, comer ou buscar sexo, a ponto de prejudicar a própria vida. Em quem toma agonistas de dopamina, ele costuma regredir quando a dose cai ou o remédio é suspenso.' },
      en: { n: 'Impulse control disorder', d: 'A pattern in which a person cannot resist an urge that harms them, such as gambling, shopping, eating or seeking sex, to the point of damaging their life. In people taking dopamine agonists, it usually recedes when the dose is lowered or the drug is stopped.' }
    },
    transversal: {
      pt: { n: 'Estudo transversal', d: 'Um estudo que observa um grupo num único momento, como uma fotografia. Mostra associações, como quem toma um remédio ter mais de um problema, sem mostrar o que veio primeiro.' },
      en: { n: 'Cross-sectional study', d: 'A study that observes a group at a single moment, like a photograph. It shows associations, such as people on a drug having more of a problem, without showing which came first.' }
    },
    coorte: {
      pt: { n: 'Coorte', d: 'Um grupo de pessoas acompanhado ao longo do tempo. Como registra o que acontece depois de cada exposição, mostra melhor que um estudo transversal a ordem dos acontecimentos.' },
      en: { n: 'Cohort', d: 'A group of people followed over time. Because it records what happens after each exposure, it shows the order of events better than a cross-sectional study.' }
    },
    fda: {
      pt: { n: 'FDA', d: 'A agência do governo dos Estados Unidos que aprova e fiscaliza remédios e alimentos, com papel parecido com o da Anvisa no Brasil.' },
      en: { n: 'Food and Drug Administration', d: 'The US federal agency, known as the FDA, that approves and monitors drugs and food.' }
    },
    aripi: {
      pt: { n: 'Aripiprazol', d: 'Um antipsicótico que estimula o receptor D2 só em parte, com efeito menor que o da dopamina. Onde há dopamina demais, ele reduz o sinal, e onde há pouca, ele o aumenta. Esse estímulo parcial ajuda a explicar por que ele também pode provocar impulsos de jogo.' },
      en: { n: 'Aripiprazole', d: 'An antipsychotic that only partly stimulates the D2 receptor, with a weaker effect than dopamine. Where there is too much dopamine, it lowers the signal, and where there is little, it raises it. That partial stimulation helps explain why it can also trigger gambling urges.' }
    },
    putamen: {
      pt: { n: 'Putâmen', d: 'A parte do estriado mais ligada ao movimento e aos hábitos. É a primeira a perder dopamina no Parkinson.' },
      en: { n: 'Putamen', d: 'The part of the striatum most tied to movement and habits. It is the first to lose dopamine in Parkinson’s.' }
    },
    celtronco: {
      pt: { n: 'Células-tronco', d: 'Células que ainda não se especializaram e podem dar origem a outros tipos. Nos estudos de 2025, foram transformadas em laboratório em neurônios de dopamina e implantadas no cérebro de pacientes de Parkinson.' },
      en: { n: 'Stem cells', d: 'Cells that have not yet specialized and can give rise to other cell types. In the 2025 studies, they were turned into dopamine neurons in the laboratory and implanted in the brains of Parkinson’s patients.' }
    },
    raclopride: {
      pt: { n: 'Raclopride', d: 'Uma molécula que se prende aos receptores D2 e, marcada com carbono radioativo, serve de marcador no PET. Ela disputa os receptores com a dopamina. Quando o sinal cai, sabe-se que havia mais dopamina competindo, sem saber quanto.' },
      en: { n: 'Raclopride', d: 'A molecule that binds to D2 receptors and, labeled with radioactive carbon, serves as a PET tracer. It competes with dopamine for the receptors. When the signal drops, it shows that more dopamine was competing, without showing how much.' }
    },
    metilfen: {
      pt: { n: 'Metilfenidato (Ritalina)', d: 'Um estimulante usado no TDAH, vendido como Ritalina e Concerta. Ele bloqueia o transportador que recolhe a dopamina de volta para o neurônio, e a dopamina fica mais tempo do lado de fora. Por via oral, sobe devagar no cérebro.' },
      en: { n: 'Methylphenidate (Ritalin)', d: 'A stimulant used for ADHD, sold as Ritalin and Concerta. It blocks the transporter that pulls dopamine back into the neuron, so dopamine stays outside the cell longer. Taken by mouth, it rises slowly in the brain.' }
    },
    ruido: {
      pt: { n: 'Ruído de medida', d: 'A variação que um exame mostra quando se mede a mesma coisa duas vezes sem nada diferente. No PET com raclopride, fica em torno de 4%. Um efeito do tamanho do ruído é difícil de distinguir de zero.' },
      en: { n: 'Measurement noise', d: 'The variation a test shows when the same thing is measured twice with nothing different. In raclopride PET, it is about 4%. An effect the size of the noise is hard to tell apart from zero.' }
    },
    placebo: {
      pt: { n: 'Placebo', d: 'Um tratamento sem princípio ativo, como uma pílula de açúcar, usado para separar o efeito do remédio do efeito da expectativa. No Parkinson, a expectativa de melhora já libera dopamina.' },
      en: { n: 'Placebo', d: 'A treatment with no active ingredient, such as a sugar pill, used to separate the effect of a drug from the effect of expectation. In Parkinson’s, the expectation of improvement by itself releases dopamine.' }
    },
    spect: {
      pt: { n: 'SPECT', d: 'Um exame de imagem parecido com o PET, mais barato e menos preciso, que também usa um marcador radioativo para mostrar receptores ou transportadores no cérebro.' },
      en: { n: 'SPECT', d: 'An imaging scan similar to PET, cheaper and less precise, that also uses a radioactive tracer to show receptors or transporters in the brain.' }
    },
    mucuna: {
      pt: { n: 'Mucuna pruriens', d: 'Uma leguminosa tropical, conhecida no Brasil como pó-de-mico, cujas sementes contêm levodopa. Vendida como suplemento, age como um remédio de verdade, e a quantidade de levodopa varia muito de um frasco para outro.' },
      en: { n: 'Mucuna pruriens', d: 'A tropical legume, also called velvet bean, whose seeds contain levodopa. Sold as a supplement, it acts like a real drug, and the amount of levodopa varies widely from one bottle to the next.' }
    },
    imao: {
      pt: { n: 'Inibidores de MAO', d: 'Antidepressivos antigos que bloqueiam a monoamina oxidase, a enzima que desmonta dopamina, noradrenalina e serotonina. Junto com levodopa, essas moléculas se acumulam, e a pressão pode subir de forma perigosa.' },
      en: { n: 'MAO inhibitors', d: 'Older antidepressants that block monoamine oxidase, the enzyme that breaks down dopamine, noradrenaline and serotonin. Combined with levodopa, these molecules build up, and blood pressure can rise dangerously.' }
    },
    crise: {
      pt: { n: 'Crise hipertensiva', d: 'Uma subida súbita e muito forte da pressão arterial, que pode causar derrame ou lesão no coração e precisa de atendimento de urgência.' },
      en: { n: 'Hypertensive crisis', d: 'A sudden, severe rise in blood pressure that can cause a stroke or heart damage and needs emergency care.' }
    },
    circuito: {
      pt: { n: 'Circuito de recompensa', d: 'O nome comum do conjunto formado pela área tegmental ventral, pelo núcleo accumbens e pelo córtex pré-frontal, ligados por fibras de dopamina. Ele participa de aprender o que vale a pena e de ir atrás disso.' },
      en: { n: 'Reward circuit', d: 'The common name for the set formed by the ventral tegmental area, the nucleus accumbens and the prefrontal cortex, linked by dopamine fibers. It takes part in learning what is worth having and in going after it.' }
    },
    oponente: {
      pt: { n: 'Processo oponente', d: 'A teoria de Solomon e Corbit, de 1974, segundo a qual cada emoção forte provoca uma reação contrária, mais lenta, que a puxa de volta. Com a repetição, a reação contrária cresce e chega mais cedo, e o efeito inicial enfraquece.' },
      en: { n: 'Opponent process', d: 'The 1974 theory by Solomon and Corbit that every strong emotion provokes an opposite, slower reaction that pulls it back. With repetition, the opposite reaction grows and arrives sooner, and the initial effect weakens.' }
    },
    alostase: {
      pt: { n: 'Alostase', d: 'A manutenção de um equilíbrio num ponto novo, deslocado do original. No vício, segundo Koob e Le Moal, o humor de base desce aos poucos com as doses repetidas e fica lá enquanto elas continuam.' },
      en: { n: 'Allostasis', d: 'The maintenance of a balance at a new point, shifted away from the original one. In addiction, according to Koob and Le Moal, baseline mood sinks gradually with repeated doses and stays there while they continue.' }
    },
    cocaina: {
      pt: { n: 'Cocaína', d: 'Um estimulante extraído da folha de coca. Ela bloqueia o transportador que recolhe a dopamina de volta para o neurônio, e a dopamina se acumula do lado de fora. Quanto mais rápido chega ao cérebro, mais forte é o barato.' },
      en: { n: 'Cocaine', d: 'A stimulant extracted from the coca leaf. It blocks the transporter that pulls dopamine back into the neuron, so dopamine builds up outside the cell. The faster it reaches the brain, the stronger the high.' }
    },
    microdialise: {
      pt: { n: 'Microdiálise', d: 'Uma técnica em que uma sonda fina, com a ponta de membrana porosa, é implantada no cérebro de um animal. O líquido em volta das células atravessa a membrana e é recolhido em amostras, nas quais se mede a dopamina. Cada amostra resume dez ou vinte minutos.' },
      en: { n: 'Microdialysis', d: 'A technique in which a thin probe with a porous membrane at its tip is implanted in an animal’s brain. Fluid from around the cells crosses the membrane and is collected in samples, in which dopamine is measured. Each sample sums up ten or twenty minutes.' }
    },
    anfetamina: {
      pt: { n: 'Anfetamina', d: 'Um estimulante que entra no neurônio de dopamina e faz o transportador funcionar ao contrário, despejando dopamina para fora. Por isso costuma elevar a dopamina mais que a cocaína, que só impede o recolhimento. Alguns remédios para TDAH são feitos dela.' },
      en: { n: 'Amphetamine', d: 'A stimulant that enters the dopamine neuron and makes the transporter run in reverse, pushing dopamine out. That is why it usually raises dopamine more than cocaine, which only blocks the uptake. Some ADHD drugs are made from it.' }
    },
    metanfetamina: {
      pt: { n: 'Metanfetamina', d: 'Uma variante da anfetamina com um grupo químico a mais, que entra no cérebro mais depressa e dura mais. Age do mesmo modo e é mais tóxica para os neurônios de dopamina. O número de 1.000% citado no vídeo vem de medidas com anfetamina.' },
      en: { n: 'Methamphetamine', d: 'A variant of amphetamine with one extra chemical group, which enters the brain faster and lasts longer. It acts the same way and is more toxic to dopamine neurons. The 1,000% figure cited in the video comes from measurements with amphetamine.' }
    },
    dat: {
      pt: { n: 'Transportador de dopamina', d: 'Uma proteína na ponta do neurônio que recolhe a dopamina solta e a devolve para dentro, encerrando o sinal. A cocaína e o metilfenidato o bloqueiam, e a anfetamina o faz funcionar ao contrário. O PET consegue contar quantos existem.' },
      en: { n: 'Dopamine transporter', d: 'A protein at the tip of the neuron that collects released dopamine and brings it back inside, ending the signal. Cocaine and methylphenidate block it, and amphetamine makes it run in reverse. PET can count how many there are.' }
    },
    caudado: {
      pt: { n: 'Caudado', d: 'Uma parte do estriado em forma de vírgula, mais ligada a planejar e a aprender quais ações levam a quais resultados.' },
      en: { n: 'Caudate', d: 'A comma-shaped part of the striatum, most tied to planning and to learning which actions lead to which outcomes.' }
    },
    efeito: {
      pt: { n: 'Tamanho de efeito', d: 'Uma medida de quão grande é a diferença entre dois grupos, numa unidade que permite comparar estudos diferentes. A mais comum divide a diferença das médias pelo desvio padrão. Por convenção, 0,2 é pequeno, 0,5 é médio e 0,8 é grande.' },
      en: { n: 'Effect size', d: 'A measure of how large the difference between two groups is, in a unit that allows different studies to be compared. The most common one divides the difference in means by the standard deviation. By convention, 0.2 is small, 0.5 is medium and 0.8 is large.' }
    },
    dp: {
      pt: { n: 'Desvio padrão', d: 'A distância típica entre cada valor e a média do grupo. Num efeito de 0,56 desvio padrão, a média de um grupo se afastou da do outro um pouco mais que meia distância típica.' },
      en: { n: 'Standard deviation', d: 'The typical distance between each value and the group’s average. In an effect of 0.56 standard deviations, one group’s average moved away from the other’s by a little more than half of that typical distance.' }
    },
    meta: {
      pt: { n: 'Meta-análise', d: 'Um estudo que reúne os resultados de vários estudos anteriores sobre a mesma pergunta e os combina numa estimativa só, mais precisa que a de cada um.' },
      en: { n: 'Meta-analysis', d: 'A study that gathers the results of several earlier studies on the same question and combines them into a single estimate, more precise than any of them alone.' }
    },
    fenomeno: {
      pt: { n: 'Fenomenologicamente', d: 'Do ponto de vista da experiência, isto é, do que a pessoa sente e relata, sem medir o cérebro.' },
      en: { n: 'Phenomenologically', d: 'From the point of view of experience, that is, in terms of what the person feels and reports, without measuring the brain.' }
    },
    mediana: {
      pt: { n: 'Mediana', d: 'O valor do meio quando os resultados são postos em ordem: metade fica abaixo e metade acima. Ao contrário da média, não é puxada por poucos casos extremos, como quem levou 335 dias.' },
      en: { n: 'Median', d: 'The middle value when the results are put in order: half fall below and half above. Unlike the average, it is not pulled by a few extreme cases, such as the person who took 335 days.' }
    },
    remissao: {
      pt: { n: 'Remissão', d: 'O desaparecimento dos sintomas de um transtorno por um período longo. No estudo citado, contava como remissão deixar de cumprir os critérios de dependência da substância.' },
      en: { n: 'Remission', d: 'The disappearance of a disorder’s symptoms for a long period. In the study cited, remission meant no longer meeting the criteria for dependence on the substance.' }
    },
    razaofixa: {
      pt: { n: 'Razão fixa', d: 'Um esquema de recompensa em que o prêmio vem depois de um número fixo de respostas, sempre o mesmo, como um cartão de fidelidade que dá um café a cada dez.' },
      en: { n: 'Fixed ratio', d: 'A reward schedule in which the prize comes after a fixed number of responses, always the same, like a loyalty card that gives a free coffee every ten.' }
    },
    razaovar: {
      pt: { n: 'Razão variável', d: 'Um esquema de recompensa em que o prêmio vem depois de um número de respostas que muda a cada vez, em torno da mesma média. É o esquema das máquinas caça-níqueis.' },
      en: { n: 'Variable ratio', d: 'A reward schedule in which the prize comes after a number of responses that changes each time, around the same average. It is the schedule of slot machines.' }
    },
    dsm: {
      pt: { n: 'DSM-5', d: 'A quinta edição do Manual Diagnóstico e Estatístico de Transtornos Mentais, da Associação Americana de Psiquiatria, publicada em 2013. Define os critérios usados para diagnosticar transtornos mentais na pesquisa e em boa parte da clínica.' },
      en: { n: 'DSM-5', d: 'The fifth edition of the Diagnostic and Statistical Manual of Mental Disorders, from the American Psychiatric Association, published in 2013. It sets the criteria used to diagnose mental disorders in research and in much of clinical practice.' }
    },
    lenad: {
      pt: { n: 'LENAD', d: 'O Levantamento Nacional de Álcool e Drogas, uma pesquisa feita pela Unifesp em domicílios de todo o Brasil, com amostra que representa a população. A terceira edição, de 2023 a 2024, também mediu as apostas.' },
      en: { n: 'LENAD', d: 'Brazil’s National Survey on Alcohol and Drugs, a household survey run by Unifesp across the country with a sample that represents the population. The third edition, from 2023 to 2024, also measured betting.' }
    },
    tjogo: {
      pt: { n: 'Transtorno do jogo', d: 'O diagnóstico do DSM-5 para quem aposta de forma persistente apesar de prejuízos sérios. Os sinais incluem precisar apostar valores cada vez maiores e tentar recuperar as perdas apostando mais.' },
      en: { n: 'Gambling disorder', d: 'The DSM-5 diagnosis for people who keep gambling despite serious harm. The signs include needing to bet ever larger amounts and trying to win back losses by betting more.' }
    },
    lootbox: {
      pt: { n: 'Caixas de recompensa', d: 'Itens pagos em jogos eletrônicos cujo conteúdo só se descobre depois da compra, como um pacote de figurinhas. Funcionam como um esquema de razão variável.' },
      en: { n: 'Loot boxes', d: 'Paid items in video games whose contents are revealed only after purchase, like a pack of trading cards. They work as a variable-ratio schedule.' }
    },
    tcc: {
      pt: { n: 'Terapia cognitivo-comportamental', d: 'Uma psicoterapia estruturada e de curta duração que trabalha os pensamentos e os comportamentos que mantêm um problema. Usa técnicas práticas, como identificar os gatilhos de um hábito e planejar respostas alternativas.' },
      en: { n: 'Cognitive behavioral therapy', d: 'A structured, short-term psychotherapy that works on the thoughts and behaviors that keep a problem going. It uses practical techniques, such as identifying the triggers of a habit and planning alternative responses.' }
    },
    tdah: {
      pt: { n: 'TDAH', d: 'Transtorno do déficit de atenção com hiperatividade, uma condição que começa na infância e se manifesta por desatenção, impulsividade ou agitação. O tratamento mais comum usa estimulantes como o metilfenidato, que aumentam a dopamina disponível.' },
      en: { n: 'ADHD', d: 'Attention deficit hyperactivity disorder, a condition that begins in childhood and shows up as inattention, impulsivity or restlessness. The most common treatment uses stimulants such as methylphenidate, which increase the dopamine available.' }
    },
    benzo: {
      pt: { n: 'Benzodiazepínicos', d: 'Calmantes e remédios para dormir, como diazepam, clonazepam e alprazolam. Com uso diário prolongado, o corpo se adapta, e a parada abrupta pode causar convulsões.' },
      en: { n: 'Benzodiazepines', d: 'Sedatives and sleeping pills, such as diazepam, clonazepam and alprazolam. With long daily use, the body adapts, and stopping abruptly can cause seizures.' }
    }
  };

  var pop = document.createElement('div');
  pop.className = 'glpop';
  pop.id = 'glpop';
  pop.setAttribute('role', 'tooltip');
  document.body.appendChild(pop);

  var cur = null, timer = null, y0 = 0, pinned = false;
  var canHover = !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);

  function entry(el) {
    var g = G[el.getAttribute('data-gl')];
    return g ? (DN.lang() === 'en' ? g.en : g.pt) : null;
  }
  function place(el) {
    var r = el.getClientRects()[0] || el.getBoundingClientRect();
    var vw = document.documentElement.clientWidth || window.innerWidth;
    var vh = window.innerHeight;
    var pw = pop.offsetWidth, ph = pop.offsetHeight, m = 12;
    var x = DN.clamp(r.left + r.width / 2 - pw / 2, m, Math.max(m, vw - pw - m));
    var y = r.top - ph - 9;
    if (y < 60) y = r.bottom + 9; /* below when the topbar would cover it */
    if (y + ph > vh - m) y = Math.max(m, vh - ph - m);
    pop.style.left = Math.round(x) + 'px';
    pop.style.top = Math.round(y) + 'px';
  }
  function show(el, pin) {
    var e = entry(el);
    if (!e) return;
    pinned = !!pin;
    if (cur && cur !== el) unmark(cur);
    pop.innerHTML = '<div class="gh">' + e.n + '</div><div class="gd">' + e.d + '</div>';
    pop.classList.add('show');
    place(el);
    cur = el;
    y0 = el.getBoundingClientRect().top;
    el.classList.add('on');
    el.setAttribute('aria-expanded', 'true');
    el.setAttribute('aria-describedby', 'glpop');
  }
  function unmark(el) {
    el.classList.remove('on');
    el.setAttribute('aria-expanded', 'false');
    el.removeAttribute('aria-describedby');
  }
  function hide() {
    clearTimeout(timer);
    pop.classList.remove('show');
    if (cur) { unmark(cur); cur = null; }
    pinned = false;
  }
  /* a click on a term already opened by hover pins it instead of closing it */
  function toggle(el) {
    clearTimeout(timer);
    if (cur === el && pinned) hide();
    else if (cur === el) pinned = true;
    else show(el, true);
  }

  function wire() {
    DN.$all('.gl').forEach(function (el) {
      if (el._gl) return;
      el._gl = 1;
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-expanded', 'false');
      if (canHover) {
        el.addEventListener('mouseenter', function () {
          clearTimeout(timer);
          if (cur === el) return;
          timer = setTimeout(function () { show(el, false); }, 350);
        });
        el.addEventListener('mouseleave', function () {
          clearTimeout(timer);
          if (cur === el && !pinned) hide();
        });
      }
      el.addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        toggle(el);
      });
      el.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); toggle(el); }
        else if (ev.key === 'Escape' && cur === el) { hide(); }
      });
    });
  }

  document.addEventListener('click', function (ev) { if (cur && !pop.contains(ev.target)) hide(); });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && cur) hide(); });
  /* close when the term itself moves on screen; small nudges (focus, a resting
     finger, layout shifts above that scroll anchoring absorbs) keep it open */
  window.addEventListener('scroll', function () {
    if (!cur) return;
    if (Math.abs(cur.getBoundingClientRect().top - y0) > 40) hide(); else place(cur);
  }, { passive: true });
  window.addEventListener('resize', function () { if (cur) hide(); });

  wire();
  DN.onLang(function () { hide(); wire(); });
})();
