/* w09a · a-regua-comum : rank five things, then one honest [11C]raclopride axis */
(function () {
  'use strict';
  var root = DN.body('w09a'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, S = DN.svg, E = DN.el, C = DN.COL;
  var MINUS = '−';

  /* cards to rank, in the order the prose lists them */
  var CARDS = [
    { k: 'musica', pt: 'música com arrepios', en: 'music with chills' },
    { k: 'video', pt: 'videogame', en: 'video game' },
    { k: 'cafe', pt: 'café', en: 'coffee' },
    { k: 'cigarro', pt: 'cigarro', en: 'cigarette' },
    { k: 'metilfenidato', pt: 'metilfenidato', en: 'methylphenidate' }
  ];
  var TRUTH = ['cigarro', 'metilfenidato', 'video', 'musica', 'cafe'];

  /* change in [11C]raclopride binding, %. negative = more dopamine released */
  var ROWS = [
    { k: 'cafe', pt: 'cafeína 300 mg', en: 'caffeine 300 mg', n: '20', lo: 4.6, hi: 5.6,
      dpt: 'Putâmen +4,6% e estriado ventral +5,6%. Mais receptor livre: a cafeína age no receptor e não na quantidade de dopamina. Volkow et al., 2015.',
      den: 'Putamen +4.6% and ventral striatum +5.6%. More free receptor: caffeine acts on the receptor and not on the amount of dopamine. Volkow et al., 2015.' },
    { k: 'meditacao', pt: 'meditação guiada', en: 'guided meditation', n: '8', v: -7.9,
      dpt: 'Estriado ventral, yoga nidra contra ouvir fala de olhos fechados. Prazer e relaxamento não mudaram. Kjaer et al., 2002.',
      den: 'Ventral striatum, yoga nidra against listening to speech with eyes closed. Pleasure and relaxation did not change. Kjaer et al., 2002.' },
    { k: 'musica', pt: 'música com arrepios', en: 'music with chills', n: '8', lo: -6.4, hi: -9.2,
      dpt: 'Caudado, putâmen e núcleo accumbens, cada pessoa com as próprias músicas. Salimpoor et al., 2011.',
      den: 'Caudate, putamen and nucleus accumbens, each person with their own music. Salimpoor et al., 2011.' },
    { k: 'dinheiro', pt: 'dinheiro imprevisível', en: 'unpredictable money', n: '9', two: [-6.3, 9.1],
      dpt: '−6,3% no caudado medial e +9,1% no putâmen lateral. O estriado ventral não mudou. Zald et al., 2004.',
      den: '−6.3% in the medial caudate and +9.1% in the lateral putamen. The ventral striatum did not change. Zald et al., 2004.' },
    { k: 'video', pt: 'videogame', en: 'video game', n: '8', v: -13, wa: 8, wb: -42,
      dpt: 'Estriado ventral, de +8% a −42% entre os oito jogadores. Movimento de cabeça e fluxo sanguíneo podem imitar o efeito (Egerton et al., 2009). Koepp et al., 1998.',
      den: 'Ventral striatum, from +8% to −42% across the eight players. Head movement and blood flow can mimic the effect (Egerton et al., 2009). Koepp et al., 1998.' },
    { k: 'anfetamina', pt: 'anfetamina na veia', en: 'IV amphetamine', n: '14', v: -15,
      dpt: '0,3 mg/kg na veia, estriado ventral. Martinez et al., 2003.',
      den: '0.3 mg/kg intravenous, ventral striatum. Martinez et al., 2003.' },
    { k: 'placebo', pt: 'placebo em Parkinson', en: 'placebo in Parkinson’s', n: '6', lo: -17, hi: -21,
      dpt: 'Soro que o paciente achava ser um remédio. Números de fonte secundária. de la Fuente-Fernández et al., 2001.',
      den: 'Saline the patient believed was a drug. Numbers from a secondary source. de la Fuente-Fernández et al., 2001.' },
    { k: 'metilfenidato', pt: 'metilfenidato oral', en: 'oral methylphenidate', n: '11', v: -20, wa: -8, wb: -32,
      dpt: '0,8 mg/kg por via oral, −20% com desvio de 12 pontos entre pessoas. Volkow et al., 2001.',
      den: '0.8 mg/kg by mouth, −20% with a spread of 12 points between people. Volkow et al., 2001.' },
    { k: 'cigarro', pt: 'cigarro em dependentes', en: 'cigarette, dependent smokers', n: '10 + 10', lo: -26, hi: -37, alt: true,
      dpt: 'Caudado ventral e putâmen ventral; 10 fumaram e 10 não. Método diferente, com infusão contínua e saída do aparelho. Brody et al., 2004.',
      den: 'Ventral caudate and ventral putamen; 10 smoked and 10 did not. A different method, with continuous infusion and leaving the scanner. Brody et al., 2004.' }
  ];
  var HEAD = { video: { pt: 'manchete: “dopamina dobrou”', en: 'headline: “dopamine doubled”' }, meditacao: { pt: 'manchete: “+65% de dopamina”', en: 'headline: “+65% dopamine”' } };
  var DOM0 = 10, DOM1 = -44;

  var st = { order: CARDS.map(function (c) { return c.k; }), phase: 'guess', grow: 0, fog: 0, head: 0, sel: -1 };
  var G = {}, R = {};

  /* ---------- DOM ---------- */
  var guess = E('div', { class: 'w9-guess' }, root);
  var gl = E('div', { class: 'glabel' }, guess);
  var gwrap = E('div', { class: 'w9-gwrap' }, guess);
  var gcol = E('div', null, gwrap);
  var ends = E('div', { class: 'w9-ends' }, gcol);
  var endTop = E('span', null, ends);
  var list = E('ol', { class: 'w9-cards' }, gcol);
  var endBot = E('div', { class: 'w9-ends w9-endb' }, gcol);
  var key = E('div', { class: 'w9-key' }, gwrap);
  var keyH = E('div', { class: 'glabel' }, key);
  var keySv = S('svg', { viewBox: '0 0 300 74', 'aria-hidden': 'true' }, key);
  var keyP = E('p', null, key);
  var gBtns = E('div', { class: 'rowbtns mt' }, guess);
  var bRev = E('button', { class: 'btn solid', type: 'button' }, gBtns);

  var res = E('div', { class: 'w9-res' }, root);
  var read = E('p', { class: 'w9-read' }, res);
  var cmp = E('div', { class: 'w9-cmp' }, res);
  var chartBox = E('div', { class: 'w9-chart' }, res);
  var sv = S('svg', { role: 'img' }, chartBox);
  var warn = E('div', { class: 'w9-warn' }, res);
  var rBtns = E('div', { class: 'rowbtns mt' }, res);
  var bHead = E('button', { class: 'btn w9-head', type: 'button', 'aria-pressed': 'false' }, rBtns);
  var bAgain = E('button', { class: 'btn', type: 'button' }, rBtns);
  var live = E('div', { class: 'live', 'aria-live': 'polite' }, root);
  var det = E('details', { class: 'more' }, res);
  var sum = E('summary', null, det);
  var tbl = E('table', { class: 't' }, det);

  /* ---------- cards ---------- */
  var cardEls = {};
  CARDS.forEach(function (c) {
    var li = E('li', { class: 'w9-card', 'data-k': c.k }, list);
    E('span', { class: 'w9-rank' }, li);
    E('span', { class: 'w9-grip', 'aria-hidden': 'true' }, li, '<i></i><i></i><i></i>');
    E('span', { class: 'w9-sw', style: 'background:' + C.sub[c.k] }, li);
    E('span', { class: 'w9-name' }, li);
    var up = E('button', { class: 'w9-mv', type: 'button' }, li, '↑');
    var dn = E('button', { class: 'w9-mv', type: 'button' }, li, '↓');
    up.addEventListener('click', function () { move(c.k, -1, up); });
    dn.addEventListener('click', function () { move(c.k, 1, dn); });
    li.addEventListener('pointerdown', function (e) { startDrag(li, e); });
    li.addEventListener('dragstart', function (e) { e.preventDefault(); });
    /* arrow keys move the card while one of its buttons has focus */
    li.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      e.preventDefault();
      move(c.k, e.key === 'ArrowUp' ? -1 : 1);
    });
    cardEls[c.k] = { li: li, up: up, dn: dn };
  });
  function cardName(k) { var c = CARDS.filter(function (x) { return x.k === k; })[0]; return L(c.pt, c.en); }
  function paintCards() {
    st.order.forEach(function (k, i) {
      var o = cardEls[k];
      o.li.querySelector('.w9-rank').textContent = (i + 1);
      o.li.querySelector('.w9-name').textContent = cardName(k);
      o.up.disabled = i === 0; o.dn.disabled = i === st.order.length - 1;
      o.up.setAttribute('aria-label', L('subir ', 'move up ') + cardName(k));
      o.dn.setAttribute('aria-label', L('descer ', 'move down ') + cardName(k));
    });
  }
  function flip(fn) {
    var lis = DN.$all('.w9-card', list), r0 = lis.map(function (l) { return l.getBoundingClientRect().top; });
    lis.forEach(function (l) { if (l.getAnimations) l.getAnimations().forEach(function (a) { a.cancel(); }); });
    fn();
    if (DN.RM) return;
    lis.forEach(function (l, i) {
      var d = r0[i] - l.getBoundingClientRect().top;
      if (Math.abs(d) > 0.5 && l.animate) l.animate([{ transform: 'translateY(' + d + 'px)' }, { transform: 'none' }], { duration: 200, easing: 'cubic-bezier(.2,.7,.2,1)' });
    });
  }
  function syncDom() {
    st.order.forEach(function (k) { list.appendChild(cardEls[k].li); });
    paintCards();
  }
  function move(k, d) {
    if (drag) return;
    var i = st.order.indexOf(k), j = i + d;
    if (j < 0 || j >= st.order.length) return;
    st.order.splice(i, 1); st.order.splice(j, 0, k);
    flip(syncDom);
    var b = d < 0 ? cardEls[k].up : cardEls[k].dn;
    (b.disabled ? (d < 0 ? cardEls[k].dn : cardEls[k].up) : b).focus();
    live.textContent = cardName(k) + L(' agora em ', ' now in place ') + (j + 1) + '.';
  }

  /* ---------- drag to reorder ----------
     The DOM order stays fixed while dragging. The dragged card follows the pointer,
     clamped to the list box; the others slide out of the way with transforms. The new
     order is committed on release with a FLIP, so nothing can get stuck half way. */
  var drag = null;
  function startDrag(li, e) {
    if (drag || st.phase !== 'guess') return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (e.target.closest('button')) return;
    if (e.pointerType !== 'mouse' && !e.target.closest('.w9-grip')) return;   /* touch and pen drag by the grip, so the page still scrolls */
    e.preventDefault();
    var k = li.getAttribute('data-k');
    var lis = st.order.map(function (q) { return cardEls[q].li; });
    lis.forEach(function (l) { if (l.getAnimations) l.getAnimations().forEach(function (a) { a.cancel(); }); l.style.transform = ''; });
    var tops = lis.map(function (l) { return l.offsetTop; }), hs = lis.map(function (l) { return l.offsetHeight; });
    var from = st.order.indexOf(k);
    var gap = lis.length > 1 ? tops[1] - tops[0] - hs[0] : 6;
    drag = { k: k, li: li, lis: lis, id: e.pointerId, from: from, to: from, tops: tops, hs: hs, gap: gap,
      grab: e.clientY - li.getBoundingClientRect().top, y: e.clientY, raf: 0 };
    li.classList.add('w9-drag'); list.classList.add('w9-dragging');
    try { li.setPointerCapture(e.pointerId); } catch (er) {}
    li.addEventListener('pointermove', onMove);
    li.addEventListener('pointerup', onUp);
    li.addEventListener('pointercancel', onUp);
    li.addEventListener('lostpointercapture', onUp);
    window.addEventListener('blur', onUp);
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('keydown', onKey, true);
    document.addEventListener('visibilitychange', onUp);
    drag.raf = requestAnimationFrame(autoScroll);
    position();
  }
  function onMove(e) { if (!drag || e.pointerId !== drag.id) return; drag.y = e.clientY; position(); }
  function onScroll() { if (drag) position(); }
  function onUp(e) { if (!drag) return; if (e && e.pointerId != null && e.pointerId !== drag.id) return; endDrag(true); }
  function onKey(e) { if (drag && e.key === 'Escape') { e.preventDefault(); endDrag(false); } }
  function position() {
    var d = drag, n = d.lis.length, h = d.hs[d.from];
    var lr = list.getBoundingClientRect();
    var minT = d.tops[0], maxT = d.tops[n - 1] + d.hs[n - 1] - h;
    var top = DN.clamp(d.y - d.grab - lr.top, minT, maxT);
    d.li.style.transform = 'translateY(' + (top - d.tops[d.from]).toFixed(1) + 'px)';
    /* target slot: the one whose center is nearest the dragged card's center */
    var c = top + h / 2, best = d.from, bd = 1e9;
    for (var i = 0; i < n; i++) {
      var sc = d.tops[i] + d.hs[i] / 2, dd = Math.abs(sc - c);
      if (dd < bd) { bd = dd; best = i; }
    }
    if (best !== d.to) { d.to = best; shiftOthers(); }
  }
  function shiftOthers() {
    var d = drag, sh = d.hs[d.from] + d.gap;
    d.lis.forEach(function (l, j) {
      if (j === d.from) return;
      var s = 0;
      if (d.from < d.to && j > d.from && j <= d.to) s = -sh;
      else if (d.to < d.from && j >= d.to && j < d.from) s = sh;
      l.style.transform = s ? 'translateY(' + s + 'px)' : '';
    });
    var prov = provisional();
    prov.forEach(function (k, i) { cardEls[k].li.querySelector('.w9-rank').textContent = (i + 1); });
  }
  function provisional(d) {
    d = d || drag;
    var o = st.order.slice();
    o.splice(d.from, 1); o.splice(d.to, 0, d.k);
    return o;
  }
  function autoScroll() {
    if (!drag) return;
    var y = drag.y, vh = window.innerHeight, lr = list.getBoundingClientRect(), v = 0, edge = 70;
    if (y < edge + 50 && lr.top < 60) v = -Math.ceil((edge + 50 - y) / 6);
    else if (y > vh - edge && lr.bottom > vh) v = Math.ceil((y - vh + edge) / 6);
    if (v) { window.scrollBy(0, DN.clamp(v, -14, 14)); position(); }
    drag.raf = requestAnimationFrame(autoScroll);
  }
  function endDrag(commit) {
    var d = drag; drag = null;
    cancelAnimationFrame(d.raf);
    d.li.removeEventListener('pointermove', onMove);
    d.li.removeEventListener('pointerup', onUp);
    d.li.removeEventListener('pointercancel', onUp);
    d.li.removeEventListener('lostpointercapture', onUp);
    window.removeEventListener('blur', onUp);
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('keydown', onKey, true);
    document.removeEventListener('visibilitychange', onUp);
    try { if (d.li.hasPointerCapture && d.li.hasPointerCapture(d.id)) d.li.releasePointerCapture(d.id); } catch (er) {}
    var moved = commit && d.to !== d.from;
    flip(function () {
      list.classList.remove('w9-dragging');
      d.li.classList.remove('w9-drag');
      d.lis.forEach(function (l) { l.style.transform = ''; });
      if (moved) st.order = provisional(d);
      syncDom();
    });
    if (moved) live.textContent = L('Sua ordem: ', 'Your order: ') + st.order.map(cardName).join(', ') + '.';
  }
  /* ---------- chart ---------- */
  function x(v) { return G.x0 + (DOM0 - v) / (DOM0 - DOM1) * (G.x1 - G.x0); }
  function layout() {
    var W = chartBox.clientWidth || 700;
    G.W = W; G.mob = W < 600;
    if (G.mob) { G.x0 = 4; G.x1 = W - 6; G.top = 40; G.rowH = 56; G.bh = 14; G.lab = 18; }
    else { G.x0 = W < 820 ? 196 : 236; G.x1 = W - 70; G.top = 40; G.rowH = 42; G.bh = 16; G.lab = 0; }
    G.H = G.top + ROWS.length * G.rowH + 40;
    sv.setAttribute('viewBox', '0 0 ' + W + ' ' + G.H);
    sv.setAttribute('width', W); sv.setAttribute('height', G.H);
    build(); draw();
  }
  function rowY(i) { return G.top + i * G.rowH + (G.mob ? G.lab + (G.rowH - G.lab) / 2 - 2 : G.rowH / 2); }

  function build() {
    while (sv.firstChild) sv.removeChild(sv.firstChild);
    var defs = S('defs', null, sv);
    var gr = S('linearGradient', { id: 'w9-fog', x1: '0', x2: '1', y1: '0', y2: '0' }, defs);
    [[0, 0], [0.22, 0.75], [0.5, 1], [0.78, 0.75], [1, 0]].forEach(function (s) { S('stop', { offset: s[0], 'stop-color': '#8d8d8d', 'stop-opacity': 0.28 * s[1] }, gr); });
    var hp = S('pattern', { id: 'w9-hatch', width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    S('rect', { width: 6, height: 6, fill: 'rgba(232,149,47,.14)' }, hp);
    S('line', { x1: 0, y1: 0, x2: 0, y2: 6, stroke: C.dopa, 'stroke-width': 2 }, hp);
    var ap = S('pattern', { id: 'w9-alt', width: 5, height: 5, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(-45)' }, defs);
    S('rect', { width: 5, height: 5, fill: C.sub.cigarro }, ap);
    S('line', { x1: 0, y1: 0, x2: 0, y2: 5, stroke: '#fff', 'stroke-width': 1.4, 'stroke-opacity': 0.55 }, ap);

    R.fogG = S('g', { class: 'w9-foggroup' }, sv);
    R.fog = S('rect', { fill: 'url(#w9-fog)' }, R.fogG);
    R.fogT = S('text', { class: 'w9-fogt', 'text-anchor': 'middle' }, R.fogG);
    R.grid = S('g', { class: 'w9-grid' }, sv);
    R.zero = S('line', { class: 'w9-zero' }, sv);
    R.rows = ROWS.map(function (r, i) {
      var o = {}, g = S('g', { class: 'w9-row', tabindex: '0', role: 'button' }, sv);
      o.g = g;
      o.hit = S('rect', { class: 'w9-hit' }, g);
      o.name = S('text', { class: 'w9-rname w9-halo' }, g);
      o.sub = S('text', { class: 'w9-rsub' }, g);
      o.ghost = S('rect', { fill: 'url(#w9-hatch)', stroke: C.dopa, 'stroke-width': 1, class: 'w9-ghost' }, g);
      o.ghostT = S('text', { class: 'w9-ghostt w9-halo' }, g);
      o.b1 = S('rect', { fill: r.alt ? 'url(#w9-alt)' : C.sub[r.k] }, g);
      o.b2 = S('rect', { fill: C.sub[r.k], 'fill-opacity': 0.4 }, g);
      o.wh = S('path', { class: 'w9-wh', stroke: C.ink }, g);
      o.val = S('text', { class: 'w9-val w9-halo' }, g);
      o.val2 = S('text', { class: 'w9-val w9-halo' }, g);
      g.appendChild(o.ghostT);   /* headline text above the whiskers */
      g.addEventListener('click', function () { select(i); });
      g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i); } });
      return o;
    });
    R.dirL = S('text', { class: 'w9-dir', 'text-anchor': 'start' }, sv);
    R.dirR = S('text', { class: 'w9-dir', 'text-anchor': 'end' }, sv);
    R.axt = S('text', { class: 'w9-axt' }, sv);
  }

  function setR(n, x0, y, x1, h) { n.setAttribute('x', Math.min(x0, x1)); n.setAttribute('y', y); n.setAttribute('width', Math.abs(x1 - x0)); n.setAttribute('height', Math.max(0, h)); }
  function pct(v, d) { return (v > 0 ? '+' : v < 0 ? MINUS : '') + fmt(Math.abs(v), d == null ? (Math.round(v) === v ? 0 : 1) : d); }

  function draw() {
    if (!R.rows) return;
    var g0 = st.grow, z = x(0), bottom = G.top + ROWS.length * G.rowH;
    /* fog of noise first */
    setR(R.fog, x(6.5), G.top - 8, x(-6.5), bottom - G.top + 12);
    R.fogG.style.opacity = st.fog;
    R.fogT.setAttribute('x', z); R.fogT.setAttribute('y', bottom + 18);
    R.fogT.textContent = L('ruído do exame ±4%', 'scan noise ±4%');
    /* grid */
    while (R.grid.firstChild) R.grid.removeChild(R.grid.firstChild);
    [10, 0, -10, -20, -30, -40].forEach(function (v) {
      var p = x(v);
      if (v !== 0) S('line', { x1: p, x2: p, y1: G.top - 8, y2: bottom }, R.grid);
      S('text', { x: p, y: G.top - 16, 'text-anchor': G.mob && v === 10 ? 'start' : G.mob && v === -40 ? 'end' : 'middle' }, R.grid).textContent = pct(v) + '%';
    });
    R.zero.setAttribute('x1', z); R.zero.setAttribute('x2', z); R.zero.setAttribute('y1', G.top - 8); R.zero.setAttribute('y2', bottom);
    var ranks = {}; st.order.forEach(function (k, i) { ranks[k] = i + 1; });

    ROWS.forEach(function (r, i) {
      var o = R.rows[i], cy = rowY(i), h = G.bh, y = cy - h / 2;
      var sel = st.sel === i;
      o.g.classList.toggle('w9-sel', sel);
      o.g.setAttribute('aria-label', L(r.pt, r.en) + ', N = ' + r.n + '. ' + valText(r));
      setR(o.hit, 0, G.top + i * G.rowH, G.W, G.rowH);
      /* labels */
      var nm = L(r.pt, r.en), sub = 'N = ' + r.n + (r.alt ? L(' · método diferente', ' · different method') : '') + (ranks[r.k] ? L(' · seu nº ', ' · your no. ') + ranks[r.k] : '');
      if (G.mob) {
        if (r.alt) nm = L('cigarro (método diferente)', 'cigarette (other method)');
        sub = 'N = ' + r.n + (ranks[r.k] ? L(' · nº ', ' · no. ') + ranks[r.k] : '');
      }
      if (G.mob) {
        var ly = G.top + i * G.rowH + 14;
        o.name.setAttribute('x', 0); o.name.setAttribute('y', ly); o.name.textContent = nm;
        S('tspan', { class: 'w9-n', dx: 6 }, o.name).textContent = 'N=' + r.n.replace(/ /g, '');
        o.sub.setAttribute('x', G.W); o.sub.setAttribute('y', ly); o.sub.setAttribute('text-anchor', 'end');
        o.sub.textContent = r.two ? '' : shortVal(r);
        o.sub.classList.add('w9-mval');
      } else {
        o.name.setAttribute('x', 0); o.name.setAttribute('y', cy - 1); o.name.textContent = nm;
        o.sub.setAttribute('x', 0); o.sub.setAttribute('y', cy + 12); o.sub.setAttribute('text-anchor', 'start'); o.sub.textContent = sub;
        o.sub.classList.remove('w9-mval');
      }
      o.name.classList.toggle('w9-ranked', !!ranks[r.k]);
      /* marks */
      var wa = null, wb = null, end, lab, lab2 = null, b2 = false;
      o.val2.textContent = '';
      if (r.two) {
        var a = r.two[0] * g0, b = r.two[1] * g0;
        setR(o.b1, z, y - 1, x(a), h / 2);
        setR(o.b2, z, y + h / 2 + 1, x(b), h / 2);
        o.b2.setAttribute('fill-opacity', 1);
        b2 = true;
        end = x(a); lab = pct(r.two[0]) + '% ' + L('caudado', 'caudate');
        o.val2.textContent = pct(r.two[1]) + '% ' + L('putâmen', 'putamen');
        if (G.mob) { o.val2.setAttribute('x', z + 6); o.val2.setAttribute('y', y + h + 3); o.val2.setAttribute('text-anchor', 'start'); }
        else { o.val2.setAttribute('x', x(b) - 7); o.val2.setAttribute('y', y + h + 2); o.val2.setAttribute('text-anchor', 'end'); }
        o.val2.style.opacity = g0;
      } else if (r.lo != null) {
        setR(o.b1, z, y, x(r.lo * g0), h);
        setR(o.b2, x(r.lo * g0), y, x(r.hi * g0), h);
        o.b2.setAttribute('fill-opacity', 0.38);
        b2 = true;
        wa = r.lo; wb = r.hi;
        end = x(r.hi * g0);
        lab = pct(r.lo) + L(' a ', ' to ') + pct(r.hi) + '%';
      } else {
        setR(o.b1, z, y, x(r.v * g0), h);
        setR(o.b2, z, y, z, 0);
        end = x(r.v * g0);
        lab = pct(r.v) + '%';
        if (r.wa != null) { wa = r.wa; wb = r.wb; }
      }
      /* whiskers (only for spreads across people) */
      if (r.wa != null && g0 > 0) {
        var xa = x(DN.lerp(r.v, r.wa, g0)), xb = x(DN.lerp(r.v, r.wb, g0));
        o.wh.setAttribute('d', 'M' + xa + ' ' + cy + 'H' + xb + 'M' + xa + ' ' + (cy - 5) + 'V' + (cy + 5) + 'M' + xb + ' ' + (cy - 5) + 'V' + (cy + 5));
        o.wh.style.display = '';
        end = Math.max(end, xa, xb);
        lab = pct(r.v) + '%  ' + L('(' + pct(r.wa) + ' a ' + pct(r.wb) + ')', '(' + pct(r.wa) + ' to ' + pct(r.wb) + ')');
        if (r.k === 'metilfenidato') lab = pct(r.v) + ' ± 12%';
      } else o.wh.style.display = 'none';
      /* value label: to the right of the farthest mark, or right of zero for marks on the positive side */
      var lx = Math.max(end, z) + 7;
      if (r.k === 'cafe') lx = z + 7;
      o.val.setAttribute('text-anchor', 'start');
      o.val.setAttribute('x', lx); o.val.setAttribute('y', r.two ? y + 6 : cy + 4);
      o.val.textContent = lab; o.val.style.opacity = g0;
      o.val.style.display = (G.mob && !r.two) ? 'none' : '';
      /* headline conversion ghosts */
      if (HEAD[r.k] && st.head > 0) {
        var gx = DN.lerp(x(r.v), G.W - 1, st.head);
        setR(o.ghost, z, y - 3, gx, h + 6);
        o.ghost.style.display = '';
        o.ghostT.style.display = '';
        o.ghostT.textContent = G.mob ? L(HEAD[r.k].pt, HEAD[r.k].en).replace(/^[^:]*: /, '') : L(HEAD[r.k].pt, HEAD[r.k].en);
        o.ghostT.setAttribute('x', gx - 8); o.ghostT.setAttribute('y', G.mob ? cy + 4 : y - 7); o.ghostT.setAttribute('text-anchor', 'end');
        o.ghostT.style.opacity = st.head;
      } else { o.ghost.style.display = 'none'; o.ghostT.style.display = 'none'; }
    });
    R.dirL.setAttribute('x', G.x0); R.dirL.setAttribute('y', bottom + 34); R.dirL.textContent = L('← mais receptor livre', '← more free receptor');
    R.dirR.setAttribute('x', G.x1); R.dirR.setAttribute('y', bottom + 34); R.dirR.textContent = L('mais dopamina liberada →', 'more dopamine released →');
    R.axt.setAttribute('x', G.mob ? 0 : 0); R.axt.setAttribute('y', 12);
    R.axt.textContent = L('mudança no sinal do [11C]raclopride, %', 'change in [11C]raclopride signal, %');
  }
  function shortVal(r) {
    if (r.lo != null) return pct(r.lo) + L(' a ', ' to ') + pct(r.hi) + '%';
    if (r.k === 'metilfenidato') return pct(r.v) + ' ± 12%';
    if (r.wa != null) return pct(r.v) + '% (' + pct(r.wa) + L(' a ', ' to ') + pct(r.wb) + ')';
    return pct(r.v) + '%';
  }
  function valText(r) {
    if (r.two) return pct(r.two[0]) + L('% numa região e ', '% in one region and ') + pct(r.two[1]) + L('% em outra', '% in another');
    if (r.lo != null) return pct(r.lo) + L(' a ', ' to ') + pct(r.hi) + '%';
    if (r.wa != null) return pct(r.v) + L('%, faixa de ', '%, range ') + pct(r.wa) + L(' a ', ' to ') + pct(r.wb) + '%';
    return pct(r.v) + '%';
  }
  function select(i) {
    st.sel = st.sel === i ? -1 : i; draw();
    if (st.sel >= 0) { var r = ROWS[i]; live.textContent = L(r.pt, r.en) + ' (N = ' + r.n + '): ' + L(r.dpt, r.den); }
  }

  /* ---------- reveal ---------- */
  function tween(dur, fn, done, delay) {
    var t0 = performance.now() + (delay || 0);
    (function step(now) {
      var t = DN.clamp((now - t0) / dur, 0, 1);
      fn(1 - Math.pow(1 - t, 3)); draw();
      if (t < 1) requestAnimationFrame(step); else if (done) done();
    })(performance.now());
  }
  function compare() {
    var hits = 0;
    var mine = st.order.map(function (k, i) { var ok = TRUTH[i] === k; if (ok) hits++; return '<span class="' + (ok ? 'ok' : '') + '">' + (i + 1) + ' ' + cardName(k) + '</span>'; }).join('');
    var real = TRUTH.map(function (k, i) { return '<span>' + (i + 1) + ' ' + cardName(k) + (k === 'cafe' ? L(' (sinal oposto)', ' (opposite sign)') : '') + '</span>'; }).join('');
    cmp.innerHTML = '<div><b>' + L('sua ordem', 'your order') + '</b>' + mine + '</div><div><b>' + L('no PET', 'on PET') + '</b>' + real + '</div>';
    return hits;
  }
  function reveal() {
    if (drag) endDrag(true);
    st.phase = 'shown';
    guess.hidden = true; res.hidden = false;
    var hits = compare();
    buildTable();
    layout();
    var ci = st.order.indexOf('cafe'), mi = st.order.indexOf('musica');
    if (ci < mi) DN.surprise('w09a');
    live.textContent = L('Você acertou ', 'You placed ') + hits + L(' de 5 posições. ', ' of 5 correctly. ') +
      (ci < mi ? L('O café ficou acima da música na sua ordem, mas no PET ele empurra o sinal para o lado oposto.', 'Coffee ranked above music in your order, but on PET it pushes the signal the other way.') :
        L('No PET, o cigarro e o metilfenidato ficam mais longe do zero, e o café vai para o lado oposto.', 'On PET, cigarettes and methylphenidate land farthest from zero, and coffee goes the other way.'));
    if (DN.RM) { st.fog = 1; st.grow = 1; draw(); return; }
    st.fog = 0; st.grow = 0; draw();
    res.scrollIntoView && chartBox.getBoundingClientRect().top < 0 && chartBox.scrollIntoView({ block: 'start', behavior: 'smooth' });
    tween(500, function (t) { st.fog = t; });
    tween(700, function (t) { st.grow = t; }, null, 380);
  }
  function setHead(on) {
    bHead.setAttribute('aria-pressed', on ? 'true' : 'false');
    warn.hidden = !on;
    if (on) live.textContent = L('As manchetes converteram −13% em “dopamina dobrou” e −7,9% em “+65%”. O eixo do gráfico continua medindo o sinal do exame.', 'Headlines converted −13% into “dopamine doubled” and −7.9% into “+65%”. The chart axis still measures the scan signal.');
    if (DN.RM) { st.head = on ? 1 : 0; draw(); return; }
    var h0 = st.head;
    tween(450, function (t) { st.head = DN.lerp(h0, on ? 1 : 0, t); });
  }
  function again() {
    if (drag) endDrag(false);
    st.phase = 'guess'; st.head = 0; st.sel = -1; setHead(false);
    guess.hidden = false; res.hidden = true;
    live.textContent = L('Ordene de novo.', 'Rank them again.');
  }

  function buildTable() {
    tbl.innerHTML = '';
    var h = E('tr', null, E('thead', null, tbl));
    [L('estímulo', 'stimulus'), L('mudança no sinal', 'signal change'), 'N'].forEach(function (t) { E('th', null, h, t); });
    var tb = E('tbody', null, tbl);
    ROWS.forEach(function (r) {
      var tr = E('tr', null, tb);
      E('td', null, tr, L(r.pt, r.en)); E('td', null, tr, valText(r)); E('td', null, tr, r.n);
    });
  }

  function drawKey() {
    while (keySv.firstChild) keySv.removeChild(keySv.firstChild);
    var kx = function (v) { return 14 + (10 - v) / 54 * 272; };
    var defs = S('defs', null, keySv);
    var gr = S('linearGradient', { id: 'w9-kfog', x1: 0, x2: 1, y1: 0, y2: 0 }, defs);
    [[0, 0], [0.22, 0.75], [0.5, 1], [0.78, 0.75], [1, 0]].forEach(function (q) { S('stop', { offset: q[0], 'stop-color': '#8d8d8d', 'stop-opacity': 0.3 * q[1] }, gr); });
    S('rect', { x: kx(6.5), y: 14, width: kx(-6.5) - kx(6.5), height: 30, fill: 'url(#w9-kfog)' }, keySv);
    S('line', { x1: kx(10), x2: kx(-44), y1: 44, y2: 44, stroke: C.line }, keySv);
    S('line', { x1: kx(0), x2: kx(0), y1: 10, y2: 48, stroke: C.ink, 'stroke-width': 1.2 }, keySv);
    [10, 0, -20, -40].forEach(function (v) { S('text', { x: kx(v), y: 60, 'text-anchor': 'middle', class: 'w9-kt' }, keySv).textContent = pct(v) + '%'; });
    S('rect', { x: kx(0), y: 22, width: kx(-20) - kx(0), height: 12, fill: C.mid, 'fill-opacity': 0.45 }, keySv);
    S('text', { x: kx(-20) + 6, y: 32, class: 'w9-kt w9-kink' }, keySv).textContent = L('mais dopamina →', 'more dopamine →');
    S('text', { x: kx(0), y: 8, 'text-anchor': 'middle', class: 'w9-kt' }, keySv).textContent = L('ruído ±4%', 'noise ±4%');
    keyH.textContent = L('como ler o gráfico que vem', 'how to read the chart ahead');
    keyP.textContent = L('O PET mede quanto o marcador deixa de se prender aos receptores. Quanto mais a barra vai para a direita, mais dopamina foi liberada. A faixa cinza é o quanto o exame varia sozinho.',
      'PET measures how much less tracer sticks to the receptors. The farther right a bar goes, the more dopamine was released. The grey band is how much the scan varies on its own.');
  }
  function relabel() {
    drawKey();
    gl.textContent = L('ordene: arraste os cartões ou use as setas', 'rank them: drag the cards or use the arrows');
    endTop.textContent = L('maior efeito', 'largest effect');
    endBot.textContent = L('menor efeito', 'smallest effect');
    bRev.textContent = L('revelar', 'reveal');
    read.textContent = L('Música, meditação e dinheiro ficam a um ou dois ruídos do zero. O metilfenidato e o cigarro vão duas a quatro vezes mais longe, e o café empurra o sinal para o lado oposto.',
      'Music, meditation and money land one or two noise widths from zero. Methylphenidate and cigarettes go two to four times farther, and coffee pushes the signal the other way.');
    bHead.textContent = L('a conversão das manchetes', 'the headline conversion');
    bAgain.textContent = L('ordenar de novo', 'rank again');
    sum.textContent = L('tabela', 'table');
    warn.innerHTML = '<b>' + L('Aviso.', 'Warning.') + '</b> ' + L('As manchetes multiplicaram a queda do sinal por fatores de calibração tirados de macacos, medidos com microdiálise. Essas conversões não valem para qualquer região do cérebro nem para qualquer estímulo. As barras tracejadas usam outra unidade e não cabem neste eixo.',
      'The headlines multiplied the signal drop by calibration factors taken from monkeys, measured with microdialysis. These conversions do not hold for every brain region or every stimulus. The hatched bars use a different unit and do not fit on this axis.');
    sv.setAttribute('aria-label', L('Barras divergentes da mudança no sinal do raclopride, de +10% a −40%. Valores negativos indicam mais dopamina liberada. Faixa de ruído do exame de ±4%.', 'Diverging bars of change in raclopride signal, from +10% to −40%. Negative values indicate more dopamine released. Scan noise band of ±4%.'));
    paintCards();
    if (st.phase === 'shown') { compare(); buildTable(); }
    layout();
  }

  bRev.addEventListener('click', reveal);
  bHead.addEventListener('click', function () { setHead(bHead.getAttribute('aria-pressed') !== 'true'); });
  bAgain.addEventListener('click', again);
  res.hidden = true; warn.hidden = true;
  relabel();
  DN.onLang(relabel);
  var rt = 0;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(layout, 150); });
})();
