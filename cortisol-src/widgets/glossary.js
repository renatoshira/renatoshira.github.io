/* glossary.js : dashed terms in the prose (<span class="gl" data-gl="KEY">)
   open a small definition popup on hover (350 ms), click, tap or Enter.
   One popup for the page, appended to body so it follows the page colors.
   Same mechanism as dopamina-src/widgets/glossary.js; cortisol dictionary. */
(function () {
  'use strict';
  function T(ptn, ptd, enn, end) { return { pt: { n: ptn, d: ptd }, en: { n: enn, d: end } }; }
  var G = {
    cortisol: T('Cortisol', 'Hormônio fabricado pelas glândulas adrenais. Ele põe açúcar no sangue, sustenta a pressão e freia a inflamação. O nível começa a subir de madrugada, chega ao pico logo depois de acordar e cai até perto da meia-noite.',
      'Cortisol', 'A hormone made by the adrenal glands. It puts sugar into the blood, holds up blood pressure and damps down inflammation. The level starts rising in the small hours, peaks soon after waking and falls until around midnight.'),
    hormonio: T('Hormônio', 'Molécula que uma glândula solta no sangue para mudar o funcionamento de órgãos distantes.',
      'Hormone', 'A molecule that a gland releases into the blood to change how distant organs work.'),
    adrenais: T('Glândulas adrenais', 'Duas glândulas pequenas que ficam em cima dos rins, também chamadas de suprarrenais. A camada de fora fabrica o cortisol, e o miolo fabrica a adrenalina.',
      'Adrenal glands', 'Two small glands that sit on top of the kidneys. The outer layer makes cortisol, and the core makes adrenaline.'),
    hipotalamo: T('Hipotálamo', 'Região do tamanho de uma amêndoa na base do cérebro, que liga o sistema nervoso aos hormônios. Dele sai a primeira ordem para fabricar cortisol.',
      'Hypothalamus', 'An almond-sized region at the base of the brain that links the nervous system to the hormones. The first order to make cortisol comes from it.'),
    hipofise: T('Hipófise', 'Glândula do tamanho de uma ervilha logo abaixo do cérebro. Ela recebe a ordem do hipotálamo e solta no sangue o ACTH, o hormônio que faz as adrenais fabricarem cortisol.',
      'Pituitary gland', 'A pea-sized gland just below the brain. It takes the order from the hypothalamus and releases ACTH into the blood, the hormone that makes the adrenals produce cortisol.'),
    eixo: T('Eixo HPA', 'Nome técnico da cadeia hipotálamo, hipófise e adrenais. O hipotálamo solta o CRH, o CRH faz a hipófise soltar o ACTH, e o ACTH faz as adrenais soltarem cortisol.',
      'HPA axis', 'The technical name for the chain of hypothalamus, pituitary and adrenals. The hypothalamus releases CRH, CRH makes the pituitary release ACTH, and ACTH makes the adrenals release cortisol.'),
    retro: T('O freio (retroalimentação negativa)', 'O cortisol que chega ao cérebro reduz o CRH e o ACTH, e a produção cai, como num termostato. Os corticoides de remédio também acionam esse freio.',
      'The brake (negative feedback)', 'Cortisol that reaches the brain lowers CRH and ACTH, and production falls, as in a thermostat. Corticosteroid drugs pull the same brake.'),
    inflamacao: T('Inflamação', 'Reação de defesa do corpo a uma infecção ou a uma lesão, com calor, inchaço, vermelhidão e dor. O cortisol a freia, e por isso versões dele viraram remédio.',
      'Inflammation', 'The body’s defensive reaction to an infection or an injury, with heat, swelling, redness and pain. Cortisol damps it down, which is why versions of cortisol became drugs.'),
    cortisona: T('Cortisona', 'Forma inativa do cortisol, que o fígado e outros tecidos convertem em cortisol. Foi o primeiro corticoide usado como remédio, em 1948.',
      'Cortisone', 'An inactive form of cortisol, which the liver and other tissues convert into cortisol. It was the first corticosteroid used as a drug, in 1948.'),
    corticoide: T('Corticoide', 'Remédio que imita o cortisol, como a prednisona e a dexametasona, usado contra inflamação, alergia, asma e doenças autoimunes. Em doses altas por semanas, causa os mesmos efeitos de um excesso de cortisol.',
      'Corticosteroid', 'A drug that mimics cortisol, such as prednisone and dexamethasone, used against inflammation, allergy, asthma and autoimmune disease. At high doses for weeks, it has the same effects as an excess of cortisol.'),
    prednisona: T('Prednisona', 'Corticoide em comprimido, um dos mais receitados. Cada 5 mg têm o efeito de cerca de 20 mg de hidrocortisona.',
      'Prednisone', 'A corticosteroid taken as a pill, one of the most prescribed. Each 5 mg has the effect of about 20 mg of hydrocortisone.'),
    meiavida: T('Meia-vida', 'O tempo que leva para metade de uma substância sair do sangue. A do cortisol é de cerca de uma hora, e por isso uma subida se desfaz em poucas horas.',
      'Half-life', 'The time it takes for half of a substance to leave the blood. Cortisol’s is about an hour, so a rise fades within a few hours.'),
    unidades: T('µg/dL e nmol/L', 'Unidades de concentração. O cortisol do sangue costuma vir em microgramas por decilitro (µg/dL), e o da saliva em nanomols por litro (nmol/L). 1 µg/dL equivale a 27,6 nmol/L.',
      'µg/dL and nmol/L', 'Units of concentration. Blood cortisol is usually given in micrograms per decilitre (µg/dL), and saliva cortisol in nanomoles per litre (nmol/L). 1 µg/dL equals 27.6 nmol/L.'),
    vale: T('Vale', 'O ponto mais baixo do cortisol no dia, por volta da meia-noite. No Cushing o vale some, e um dos exames de triagem procura por ele.',
      'Trough', 'The lowest point of cortisol in the day, around midnight. In Cushing’s the trough disappears, and one of the screening tests looks for it.'),
    livre: T('Cortisol livre', 'A maior parte do cortisol do sangue viaja presa a proteínas. A pequena parte solta, em torno de 5% a 10%, é a que age nas células e a que passa para a saliva.',
      'Free cortisol', 'Most of the cortisol in the blood travels bound to proteins. The small unbound part, around 5% to 10%, is the part that acts on cells and passes into saliva.'),
    car: T('Resposta ao despertar', 'A subida do cortisol nos primeiros 30 a 45 minutos depois de acordar, de 50% a 160% em adultos saudáveis. Na literatura, a sigla é CAR.',
      'Awakening response', 'The rise in cortisol in the first 30 to 45 minutes after waking, of 50% to 160% in healthy adults. In the literature it is called the CAR.'),
    lux: T('Lux', 'Unidade de quanta luz chega a uma superfície. Uma sala bem iluminada tem algumas centenas de lux; ao ar livre, mesmo nublado, passa de 1.000.',
      'Lux', 'A unit of how much light reaches a surface. A well-lit room has a few hundred lux; outdoors, even on a cloudy day, it is above 1,000.'),
    placebo: T('Placebo', 'Tratamento sem princípio ativo, igual por fora ao verdadeiro. Ele separa o efeito do tratamento do efeito de achar que se está sendo tratado.',
      'Placebo', 'A treatment with no active ingredient that looks like the real one. It separates the effect of the treatment from the effect of believing you are being treated.'),
    ensaio: T('Ensaio clínico', 'Experimento com pessoas em que o pesquisador decide quem recebe o tratamento, em geral por sorteio, e compara com um grupo de controle. É o tipo de estudo que consegue mostrar causa.',
      'Clinical trial', 'An experiment on people in which the researchers decide who gets the treatment, usually by lottery, and compare them with a control group. It is the kind of study that can show cause.'),
    efeito: T('Tamanho de efeito (d, g, SMD)', 'A diferença entre dois grupos medida em desvios padrão, o que permite comparar estudos com unidades diferentes. Por convenção, 0,2 é pequeno, 0,5 é médio e 0,8 é grande.',
      'Effect size (d, g, SMD)', 'The difference between two groups measured in standard deviations, which lets studies with different units be compared. By convention, 0.2 is small, 0.5 is medium and 0.8 is large.'),
    vo2: T('Capacidade máxima de usar oxigênio', 'O máximo de oxigênio que o corpo consegue usar por minuto no esforço mais forte, chamado de VO2máx. Serve de régua de intensidade: 40% é um esforço leve, e 80% é um esforço que mal deixa falar.',
      'Maximal oxygen uptake', 'The most oxygen the body can use per minute at its hardest effort, called VO2 max. It works as a scale of intensity: 40% is a light effort, and 80% is an effort that leaves you barely able to talk.'),
    metaanalise: T('Meta-análise', 'Estudo que junta os resultados de vários estudos sobre a mesma pergunta para estimar um efeito médio. A qualidade dela depende da qualidade dos estudos que reúne.',
      'Meta-analysis', 'A study that pools the results of several studies on the same question to estimate an average effect. Its quality depends on the quality of the studies it pools.'),
    metarede: T('Meta-análise em rede', 'Meta-análise que compara vários tratamentos ao mesmo tempo, inclusive os que nunca foram testados lado a lado, usando comparações indiretas.',
      'Network meta-analysis', 'A meta-analysis that compares several treatments at once, including ones never tested side by side, through indirect comparisons.'),
    met: T('MET-minuto', 'Unidade de quantidade de exercício. Um MET é o gasto de energia em repouso, e a intensidade em METs vezes os minutos dá os MET-minutos. Uma caminhada rápida tem cerca de 3,5 METs.',
      'MET-minute', 'A unit of amount of exercise. One MET is the energy used at rest, and the intensity in METs times the minutes gives MET-minutes. A brisk walk is about 3.5 METs.'),
    cabelo: T('Cortisol no cabelo', 'O cortisol entra no fio enquanto ele cresce, cerca de 1 cm por mês. Os 3 cm mais perto da raiz mostram a exposição média dos últimos três meses.',
      'Hair cortisol', 'Cortisol enters the hair as it grows, about 1 cm a month. The 3 cm closest to the scalp show the average exposure of the past three months.'),
    tsst: T('Teste de estresse de Trier', 'Teste criado em 1993 na cidade alemã de Trier: preparar um discurso, falar diante de uma banca que não reage e fazer contas de cabeça. É o jeito padrão de subir o cortisol em laboratório. A sigla em inglês é TSST.',
      'Trier Social Stress Test', 'A test created in 1993 in the German city of Trier: prepare a speech, give it to a panel that does not react and do mental arithmetic. It is the standard way to raise cortisol in the laboratory, known as the TSST.'),
    alfa: T('Alfa-amilase salivar', 'Enzima da saliva que digere amido. A produção dela sobe com o mesmo sistema nervoso que solta a adrenalina, e por isso serve para medir essa ativação sem tirar sangue.',
      'Salivary alpha-amylase', 'An enzyme in saliva that digests starch. Its output rises with the same nervous system that releases adrenaline, so it measures that activation without drawing blood.'),
    adrenalina: T('Adrenalina', 'Hormônio do miolo das adrenais que, num susto, acelera o coração em segundos. Age bem antes do cortisol, que leva de 20 a 40 minutos para chegar ao pico.',
      'Adrenaline', 'A hormone from the core of the adrenal glands that speeds up the heart within seconds of a fright. It acts well before cortisol, which takes 20 to 40 minutes to peak. In the United States it is usually called epinephrine.'),
    cochrane: T('Revisão Cochrane', 'Revisão sistemática feita pela Cochrane, uma rede internacional de pesquisadores, com regras rígidas para escolher e somar estudos. É uma das referências mais confiáveis da medicina.',
      'Cochrane review', 'A systematic review made by Cochrane, an international network of researchers, with strict rules for choosing and pooling studies. It is one of the most trusted references in medicine.'),
    hidrocortisona: T('Hidrocortisona', 'O nome do cortisol quando ele é fabricado como remédio; a molécula é idêntica à do corpo. Ela repõe o cortisol em quem tem Addison e serve de régua para a potência dos outros corticoides.',
      'Hydrocortisone', 'The name of cortisol when it is made as a drug; the molecule is identical to the body’s. It replaces cortisol in people with Addison’s and is the yardstick for the potency of other corticosteroids.'),
    tept: T('Estresse pós-traumático', 'Transtorno que pode surgir depois de um trauma, com lembranças que invadem, pesadelos, esquiva e alerta constante. A sigla é TEPT, e em inglês, PTSD.',
      'Post-traumatic stress', 'A disorder that can follow a trauma, with intrusive memories, nightmares, avoidance and constant alertness. It is known as PTSD.'),
    rr: T('RR (risco relativo)', 'O risco de um grupo dividido pelo risco de outro. RR de 0,17 quer dizer cerca de um sexto do risco, e 1 quer dizer risco igual.',
      'RR (relative risk)', 'The risk in one group divided by the risk in another. An RR of 0.17 means about one sixth of the risk, and 1 means equal risk.'),
    burnout: T('Burnout', 'Esgotamento ligado ao trabalho, com exaustão, distanciamento do trabalho e queda de eficiência. A OMS o classifica como fenômeno ocupacional, fora da lista de doenças.',
      'Burnout', 'Work-related exhaustion, with fatigue, detachment from work and falling effectiveness. The WHO classifies it as an occupational phenomenon, outside its list of diseases.'),
    inclinacao: T('Inclinação', 'O quanto o cortisol desce do acordar até a hora de dormir. Uma curva íngreme desce muito; uma curva plana desce pouco, porque a manhã está baixa ou a noite está alta.',
      'Slope', 'How far cortisol falls from waking to bedtime. A steep curve falls a lot; a flat curve falls little, because the morning is low or the evening is high.'),
    dp: T('Desvio padrão', 'Medida de quanto os valores se espalham em volta da média. Numa distribuição em forma de sino, cerca de dois terços das pessoas ficam a menos de um desvio padrão da média.',
      'Standard deviation', 'A measure of how widely values spread around the average. In a bell-shaped distribution, about two thirds of people fall within one standard deviation of the average.'),
    hr: T('HR (razão de risco)', 'Quantas vezes o risco de um grupo é maior que o de outro ao longo do acompanhamento. HR de 1,30 quer dizer risco 30% maior, e 1 quer dizer risco igual.',
      'HR (hazard ratio)', 'How many times higher the risk in one group is than in another over the follow-up. An HR of 1.30 means a 30% higher risk, and 1 means equal risk.'),
    ic: T('Intervalo de confiança', 'A faixa de valores compatíveis com os dados, em geral com 95% de confiança. Quando a faixa inclui o zero, ou o 1 numa razão de risco, o efeito pode não existir.',
      'Confidence interval', 'The range of values compatible with the data, usually at 95% confidence. When the range includes zero, or 1 for a ratio of risks, the effect may not exist.'),
    r: T('Correlação (r)', 'Número de −1 a 1 que diz quanto duas medidas andam juntas. Uma correlação de 0,1 é pequena e uma de 0,3 é média, mas ela não diz qual das duas causa a outra.',
      'Correlation (r)', 'A number from −1 to 1 that says how closely two measures move together. A correlation of 0.1 is small and one of 0.3 is medium. It does not say which of the two causes the other.'),
    observacional: T('Estudo observacional', 'Estudo que acompanha pessoas sem mudar nada na vida delas e, por isso, mostra que duas coisas andam juntas sem provar que uma causa a outra.',
      'Observational study', 'A study that follows people without changing anything in their lives. It shows that two things go together, without proving that one causes the other.'),
    cushing: T('Síndrome de Cushing', 'Excesso de cortisol durante meses. Quase sempre vem de corticoide de remédio e, mais raramente, de um tumor na hipófise ou na adrenal. Causa rosto redondo, estrias arroxeadas, pele fina, fraqueza nos músculos, pressão alta e diabetes.',
      'Cushing’s syndrome', 'An excess of cortisol over months. It nearly always comes from corticosteroid drugs and, more rarely, from a tumour in the pituitary or the adrenal gland. It causes a round face, purple stretch marks, thin skin, weak muscles, high blood pressure and diabetes.'),
    facelua: T('Face de lua', 'O rosto redondo e corado da síndrome de Cushing, com gordura acumulada nas bochechas. Aparece junto com outros sinais, depois de meses de excesso de cortisol.',
      'Moon face', 'The round, flushed face of Cushing’s syndrome, with fat built up in the cheeks. It appears together with other signs, after months of excess cortisol.'),
    sepse: T('Sepse', 'Reação descontrolada do corpo a uma infecção, que pode derrubar a pressão e parar órgãos. É uma emergência médica.',
      'Sepsis', 'An uncontrolled reaction of the body to an infection, which can crash blood pressure and shut down organs. It is a medical emergency.'),
    sensibilidade: T('Sensibilidade e especificidade', 'A sensibilidade é a fração dos doentes que o exame acusa. A especificidade é a fração dos saudáveis que o exame dá como saudáveis. Acima de 90% nas duas, o exame erra pouco para os dois lados.',
      'Sensitivity and specificity', 'Sensitivity is the share of sick people the test flags. Specificity is the share of healthy people the test clears. Above 90% on both, the test rarely errs in either direction.'),
    addison: T('Doença de Addison', 'O sistema imune destrói a camada de fora das adrenais, e o corpo fica sem cortisol. O tratamento é tomar hidrocortisona pelo resto da vida e aumentar a dose quando a pessoa adoece.',
      'Addison’s disease', 'The immune system destroys the outer layer of the adrenal glands, and the body is left without cortisol. Treatment is hydrocortisone for life, with a higher dose when the person falls ill.'),
    crise: T('Crise adrenal', 'Emergência por falta de cortisol, com vômito, pressão muito baixa e choque. Costuma vir com uma infecção em quem já produz pouco cortisol e se trata com hidrocortisona na veia.',
      'Adrenal crisis', 'An emergency caused by a lack of cortisol, with vomiting, very low blood pressure and shock. It usually comes with an infection in someone who already makes little cortisol, and is treated with intravenous hydrocortisone.'),
    insuficiencia: T('Insuficiência adrenal', 'Produção de cortisol abaixo do que o corpo precisa. Vem da doença de Addison, de problemas na hipófise ou, com mais frequência, da parada brusca de um corticoide.',
      'Adrenal insufficiency', 'Cortisol production below what the body needs. It comes from Addison’s disease, from pituitary problems or, most often, from stopping a corticosteroid abruptly.'),
    fadiga: T('Fadiga adrenal', 'Diagnóstico popular segundo o qual anos de estresse cansam as adrenais. As revisões não acharam evidência dele, e as sociedades de endocrinologia não o aceitam como diagnóstico.',
      'Adrenal fatigue', 'A popular diagnosis holding that years of stress wear out the adrenal glands. Reviews have found no evidence for it, and endocrinology societies do not accept it as a diagnosis.'),
    mediana: T('Mediana', 'O valor do meio quando todos os valores estão em ordem. Metade das pessoas fica abaixo dele e metade fica acima.',
      'Median', 'The middle value when all the values are in order. Half the people fall below it and half above.'),
    variancia: T('Variância', 'Medida de quanto os valores se espalham. Ela pode ser dividida entre fontes: quanto vem de diferenças entre pessoas e quanto vem de diferenças entre os dias da mesma pessoa.',
      'Variance', 'A measure of how widely values spread. It can be split by source: how much comes from differences between people and how much from differences between days in the same person.'),
    confiabilidade: T('Confiabilidade', 'Quanto uma medida repete o mesmo resultado quando a coisa medida não mudou. Vai de 0 a 1, e em 1 a medida dá sempre a mesma resposta.',
      'Reliability', 'How well a measurement repeats the same result when the thing measured has not changed. It runs from 0 to 1, and at 1 the measurement always gives the same answer.'),
    estradiol: T('Estradiol', 'O principal estrogênio, hormônio fabricado sobretudo pelos ovários. Aqui ele serve de comparação para separar a moda do cortisol do aumento geral de exames no SUS.',
      'Estradiol', 'The main oestrogen, a hormone made mostly by the ovaries. Here it serves as a comparison, to separate the cortisol fad from the general rise in tests in Brazil’s public health system.'),
    ashwagandha: T('Ashwagandha', 'Planta da medicina tradicional indiana (<i>Withania somnifera</i>) vendida como suplemento contra o estresse. Há casos raros de lesão no fígado, e o Brasil a proíbe em suplementos desde 2022.',
      'Ashwagandha', 'A plant from traditional Indian medicine (<i>Withania somnifera</i>) sold as a supplement against stress. There are rare cases of liver injury, and Brazil has banned it in supplements since 2022.'),
    vies: T('Viés de publicação', 'Distorção que surge porque estudos com resultado positivo são publicados mais do que os estudos sem resultado. Quem soma só os publicados superestima o efeito.',
      'Publication bias', 'A distortion that arises because studies with positive results are published more often than studies with none. Anyone who pools only the published ones overestimates the effect.'),
    omega: T('Ômega-3', 'Tipo de gordura presente em peixes como a sardinha e o salmão, vendida em cápsulas de óleo de peixe.',
      'Omega-3', 'A type of fat found in fish such as sardines and salmon, sold as fish-oil capsules.'),
    ocitocina: T('Ocitocina', 'Hormônio fabricado no hipotálamo e solto pela hipófise. Age no parto e na amamentação e está ligado ao vínculo e ao contato entre pessoas.',
      'Oxytocin', 'A hormone made in the hypothalamus and released by the pituitary. It acts in childbirth and breastfeeding and is linked to bonding and touch between people.'),
    dexametasona: T('Dexametasona', 'Corticoide muito potente. No exame de supressão, a pessoa toma um comprimido à noite, e na manhã seguinte o cortisol deveria estar baixo; no Cushing, ele continua alto.',
      'Dexamethasone', 'A very potent corticosteroid. In the suppression test, the person takes a pill at night, and the next morning cortisol should be low; in Cushing’s, it stays high.')
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
