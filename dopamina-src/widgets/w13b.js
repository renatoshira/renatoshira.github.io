/* w13b · verdade-ou-exagero : seven flip cards and a running score */
(function () {
  'use strict';
  var root = DN.body('w13b'); if (!root) return;
  var L = DN.L;

  /* t = the correct call: 'x' (exagero) or 'v' (verdade) */
  var CARDS = [
    { t: 'x', q: ['“Dopamina é a molécula do prazer.”', '“Dopamine is the pleasure molecule.”'],
      v: ['Incompleto', 'Incomplete'], tone: 'part',
      a: ['Ela pesa mais no querer, no esforço e na previsão do que no gostar. Ratos sem dopamina continuam gostando do açúcar e deixam de ir buscá-lo.',
          'It weighs more on wanting, effort and prediction than on liking. Rats without dopamine still like sugar and stop going to get it.'],
      src: ['Seções 04 e 05. Berridge e Robinson, 1998. Salamone e Correa, 2012.', 'Sections 04 and 05. Berridge and Robinson, 1998. Salamone and Correa, 2012.'] },
    { t: 'v', q: ['“Um remédio para Parkinson pode fazer alguém começar a jogar compulsivamente.”', '“A Parkinson’s drug can make someone start gambling compulsively.”'],
      v: ['Verdade', 'True'], tone: 'yes',
      a: ['Entre pacientes que tomavam agonistas de dopamina, 17,1% tinham algum transtorno de impulso, contra 6,9% dos que não tomavam. Os sintomas costumam regredir quando o remédio é suspenso.',
          'Among patients taking dopamine agonists, 17.1% had an impulse control disorder, against 6.9% of those who were not. Symptoms usually recede when the drug is stopped.'],
      src: ['Seção 07. Weintraub et al., Arch Neurol, 2010. Corvol et al., Neurology, 2018.', 'Section 07. Weintraub et al., Arch Neurol, 2010. Corvol et al., Neurology, 2018.'] },
    { t: 'x', q: ['“Um banho frio aumenta a dopamina em 250%.”', '“A cold plunge raises dopamine by 250%.”'],
      v: ['Exagero', 'Overstated'], tone: 'no',
      a: ['A medida foi no sangue, depois de uma hora na água a 14 °C, em dez homens. A dopamina do sangue não passa para o cérebro.',
          'The measurement was in blood, after an hour in water at 14 °C, in ten men. Blood dopamine does not cross into the brain.'],
      src: ['Šrámek et al., Eur J Appl Physiol, 2000.', 'Šrámek et al., Eur J Appl Physiol, 2000.'] },
    { t: 'v', q: ['“Um remédio contra psicose pode fazer o corpo produzir leite.”', '“An antipsychotic drug can make the body produce milk.”'],
      v: ['Verdade', 'True'], tone: 'yes',
      a: ['A dopamina freia a prolactina. Acima de cerca de 72% dos receptores D2 bloqueados, a prolactina sobe, e isso pode causar leite fora da gravidez.',
          'Dopamine holds prolactin in check. Above roughly 72% of D2 receptors blocked, prolactin rises, which can cause milk production outside pregnancy.'],
      src: ['Seção 06. Kapur et al., Am J Psychiatry, 2000.', 'Section 06. Kapur et al., Am J Psychiatry, 2000.'] },
    { t: 'x', q: ['“Café dá um pico de dopamina.”', '“Coffee gives you a dopamine spike.”'],
      v: ['Falso no PET', 'False on PET'], tone: 'no',
      a: ['Com 300 mg de cafeína, a ligação do traçador subiu cerca de 5%. Se houvesse mais dopamina, ela cairia. A cafeína aumenta a disponibilidade dos receptores.',
          'With 300 mg of caffeine, tracer binding rose about 5%. More dopamine would have lowered it. Caffeine raises receptor availability.'],
      src: ['Volkow et al., Transl Psychiatry, 2015. Seção 08.', 'Volkow et al., Transl Psychiatry, 2015. Section 08.'] },
    { t: 'v', q: ['“A maioria das pessoas que já foi dependente se recupera.”', '“Most people who were once addicted recover.”'],
      v: ['Verdade', 'True'], tone: 'yes',
      a: ['Numa amostra de 43.093 adultos americanos, a chance de remissão ao longo da vida foi de 83,7% para a nicotina, 90,6% para o álcool e 99,2% para a cocaína.',
          'In a sample of 43,093 American adults, the lifetime chance of remission was 83.7% for nicotine, 90.6% for alcohol and 99.2% for cocaine.'],
      src: ['Seção 10. Lopez-Quintero et al., Addiction, 2011.', 'Section 10. Lopez-Quintero et al., Addiction, 2011.'] },
    { t: 'x', q: ['“Trinta dias resetam a dopamina.”', '“Thirty days reset your dopamine.”'],
      v: ['Exagero', 'Overstated'], tone: 'no',
      a: ['O humor melhora em semanas. Os hábitos levam meses, com mediana de 59 a 66 dias. Os receptores levam meses ou mais, e em alguns casos não voltam.',
          'Mood improves within weeks. Habits take months, with a median of 59 to 66 days. Receptors take months or longer, and in some cases do not recover.'],
      src: ['Seção 10. Singh et al., 2024. Volkow et al., 1993. Nader et al., 2006.', 'Section 10. Singh et al., 2024. Volkow et al., 1993. Nader et al., 2006.'] }
  ];
  var N = CARDS.length;
  var ans = new Array(N).fill(null);   // 'v' | 'x'
  var flipped = new Array(N).fill(false);

  root.innerHTML = '';
  var head = DN.el('div', { class: 'w13b-head' }, root);
  var pips = DN.el('div', { class: 'w13b-pips' }, head);
  var hint = DN.el('div', { class: 'w13b-hint' }, head);
  var deck = DN.el('div', { class: 'w13b-deck' }, root);
  var take = DN.el('p', { class: 'w13b-take' }, root);
  var live = DN.el('div', { class: 'live sr', 'aria-live': 'polite' }, root);

  var els = CARDS.map(function (c, i) {
    var card = DN.el('article', { class: 'w13b-card', 'data-i': i }, deck);
    var inner = DN.el('div', { class: 'w13b-inner' }, card);
    var f = DN.el('div', { class: 'w13b-face w13b-front' }, inner);
    var num = DN.el('div', { class: 'w13b-num' }, f);
    var q = DN.el('p', { class: 'w13b-q' }, f);
    var btns = DN.el('div', { class: 'w13b-btns' }, f);
    var bv = DN.el('button', { class: 'btn', type: 'button' }, btns);
    var bx = DN.el('button', { class: 'btn', type: 'button' }, btns);
    var ff = DN.el('button', { class: 'w13b-flipback', type: 'button', hidden: '' }, f);
    var b = DN.el('div', { class: 'w13b-face w13b-back', 'aria-hidden': 'true' }, inner);
    var bnum = DN.el('div', { class: 'w13b-num' }, b);
    var stamp = DN.el('div', { class: 'w13b-stamp w13b-' + c.tone, tabindex: '-1' }, b);
    var res = DN.el('div', { class: 'w13b-res' }, b);
    var exp = DN.el('p', { class: 'w13b-a' }, b);
    var src = DN.el('p', { class: 'w13b-src' }, b);
    var back = DN.el('button', { class: 'w13b-flipback', type: 'button' }, b);
    bv.addEventListener('click', function () { answer(i, 'v'); });
    bx.addEventListener('click', function () { answer(i, 'x'); });
    back.addEventListener('click', function () { flip(i, false, true); });
    ff.addEventListener('click', function () { flip(i, true, true); });
    var pip = DN.el('button', { class: 'w13b-pip', type: 'button' }, pips);
    pip.addEventListener('click', function () {
      card.scrollIntoView({ behavior: DN.RM ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    });
    return { card: card, f: f, b: b, num: num, bnum: bnum, q: q, bv: bv, bx: bx, stamp: stamp, res: res, exp: exp, src: src, back: back, ff: ff, pip: pip };
  });

  var tile = DN.el('div', { class: 'w13b-tile' }, deck);
  var tBig = DN.el('div', { class: 'w13b-big', 'aria-live': 'polite' }, tile);
  var score = DN.el('p', { class: 'w13b-score' }, tile);

  function k(i) { return DN.lang() === 'en' ? 1 : 0; }

  function answer(i, a) {
    if (ans[i]) return;
    ans[i] = a;
    var right = a === CARDS[i].t;
    if (!right) DN.surprise('w13b');
    if (DN.sound()) DN.click();
    var tot = tally();
    DN.store.set('mythScore', { right: tot.right, total: 7 });
    paint(i);
    flip(i, true, true);
    var c = CARDS[i];
    live.textContent = (right ? L('Acertou. ', 'Right. ') : L('Errou. ', 'Wrong. ')) + c.v[k()] + '. ' + c.a[k()];
  }

  function flip(i, on, focus) {
    flipped[i] = on;
    var e = els[i];
    e.card.classList.toggle('is-flipped', on);
    e.f.setAttribute('aria-hidden', on ? 'true' : 'false');
    e.b.setAttribute('aria-hidden', on ? 'false' : 'true');
    if ('inert' in e.f) { e.f.inert = on; e.b.inert = !on; }
    if (focus) setTimeout(function () { (on ? e.stamp : e.ff).focus({ preventScroll: true }); }, DN.RM ? 0 : 260);
  }

  function tally() {
    var r = 0, d = 0;
    ans.forEach(function (a, i) { if (a) { d++; if (a === CARDS[i].t) r++; } });
    return { right: r, done: d };
  }

  function paint(i) {
    var c = CARDS[i], e = els[i], a = ans[i], kk = k();
    e.num.textContent = e.bnum.textContent = (i + 1) + ' / ' + N;
    e.q.textContent = c.q[kk];
    e.bv.textContent = L('verdade', 'true');
    e.bx.textContent = L('exagero', 'overstated');
    e.bv.setAttribute('aria-pressed', a === 'v');
    e.bx.setAttribute('aria-pressed', a === 'x');
    e.bv.disabled = e.bx.disabled = !!a;
    e.stamp.textContent = c.v[kk];
    e.exp.textContent = c.a[kk];
    e.src.textContent = L('Fonte: ', 'Source: ') + c.src[kk];
    if (a) {
      var right = a === c.t;
      e.res.className = 'w13b-res ' + (right ? 'ok' : 'bad');
      e.res.innerHTML = '<span class="w13b-mark" aria-hidden="true">' + (right ? '✓' : '×') + '</span>' +
        L('você disse ', 'you said ') + '<b>' + (a === 'x' ? L('exagero', 'overstated') : L('verdade', 'true')) + '</b> · ' +
        (right ? L('acertou', 'right') : L('errou', 'wrong'));
    } else {
      e.res.className = 'w13b-res';
      e.res.textContent = '';
    }
    e.back.textContent = L('↺ ver a frase', '↺ see the statement');
    e.ff.textContent = L('↺ ver o verso', '↺ see the back');
    e.ff.hidden = !a;
    e.pip.className = 'w13b-pip' + (a ? (a === c.t ? ' ok' : ' bad') : '');
    e.pip.setAttribute('aria-label', L('cartão ', 'card ') + (i + 1) + (a ? (a === c.t ? L(', acertou', ', right') : L(', errou', ', wrong')) : L(', sem resposta', ', unanswered')));
    e.card.setAttribute('aria-label', L('Cartão ', 'Card ') + (i + 1) + L(' de ', ' of ') + N);
  }

  function paintScore() {
    var t = tally();
    take.textContent = L('Quatro das sete frases exageram o que a dopamina faz ou o que dá para medir dela.',
      'Four of the seven statements overstate what dopamine does or what can be measured of it.');
    pips.setAttribute('aria-label', L('placar por cartão', 'score by card'));
    tBig.innerHTML = '<span>' + t.right + '</span><small>/' + N + '</small>';
    tBig.setAttribute('aria-label', L('placar: ', 'score: ') + t.right + L(' de ', ' of ') + N);
    hint.textContent = t.done ? L('Toque num quadrado para ir ao cartão.', 'Tap a square to jump to its card.') : L('Leia, decida, vire.', 'Read, decide, turn.');
    if (!t.done) score.innerHTML = L('Sete frases que circulam sobre dopamina. O placar soma aqui.', 'Seven claims about dopamine that get passed around. The score adds up here.');
    else if (t.done < N) score.innerHTML = t.right + L(t.right === 1 ? ' certa em ' : ' certas em ', ' right out of ') + t.done + L(t.done === 1 ? ' respondida. Faltam ' : ' respondidas. Faltam ', ' answered. ') + (N - t.done) + L('.', ' to go.');
    else score.innerHTML = (t.right === N ? L('Sete de sete. Três frases eram verdadeiras e quatro eram exageros.', 'Seven out of seven. Three statements were true and four were overstated.')
        : L('Três frases eram verdadeiras e quatro eram exageros. O placar volta no cartão do fim.', 'Three statements were true and four were overstated. The score comes back on the final card.'));
  }

  function paintAll() { for (var i = 0; i < N; i++) paint(i); paintScore(); }

  /* repaint the flip-back label after each flip */
  var _flip = flip;
  flip = function (i, on, focus) { _flip(i, on, focus); paint(i); paintScore(); };

  DN.onLang(paintAll);
  paintAll();
})();
