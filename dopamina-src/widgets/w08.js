/* w08 · a-mesma-pessoa-outro-remedio : DOMINION pictograms + Corvol five-year curves */
(function () {
  'use strict';
  var root = DN.body('w08'); if (!root) return;
  var L = DN.L, C = DN.COL;

  var seed = 23;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  var NEVER = 12.4, EVER = 51.5;
  var DOSE = { all: EVER, low: 34, mid: 50, high: 66 };   /* low/mid/high: illustrative */
  var STOP_AT = 3;
  var st = { dose: 'all', stopped: false, grow: DN.RM ? 1 : 0, lit: DN.RM ? 1 : 0, s: 0, fin: EVER };

  /* ---------- panel 1 ---------- */
  var p1 = DN.el('div', { class: 'w08-panel' }, root);
  var h1 = DN.el('div', { class: 'glabel' }, p1);
  var grids = DN.el('div', { class: 'w08-grids' }, p1);
  function makeGrid(n) {
    var box = DN.el('div', { class: 'w08-g' }, grids);
    var head = DN.el('div', { class: 'w08-gh' }, box);
    var s = DN.svg('svg', { viewBox: '0 0 100 100', role: 'img' }, box);
    var order = []; for (var i = 0; i < 100; i++) order.push(i);
    for (i = 99; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = order[i]; order[i] = order[j]; order[j] = t; }
    var people = [];
    for (i = 0; i < 100; i++) {
      var r = Math.floor(i / 10), c = i % 10, x = c * 10 + 5, y = r * 10;
      var gp = DN.svg('g', { transform: 'translate(' + x + ',' + y + ')' }, s);
      DN.svg('circle', { cx: 0, cy: 2.6, r: 1.75 }, gp);
      DN.svg('path', { d: 'M-3 9.2 L-3 6.4 C-3 5 -1.6 4.6 0 4.6 C1.6 4.6 3 5 3 6.4 L3 9.2 Z' }, gp);
      people.push(gp);
    }
    /* the n lit people are the first n of a random order */
    var litSet = order.slice(0, n);
    return { box: box, head: head, s: s, people: people, lit: litSet, n: n };
  }
  var gA = makeGrid(7), gB = makeGrid(17);
  function paintGrids() {
    [gA, gB].forEach(function (g) {
      var k = Math.round(st.lit * g.n);
      g.people.forEach(function (p) { p.setAttribute('fill', C.line); });
      for (var i = 0; i < k; i++) g.people[g.lit[i]].setAttribute('fill', C.dopa);
    });
  }

  /* ---------- panel 2 ---------- */
  var p2 = DN.el('div', { class: 'w08-panel' }, root);
  var h2 = DN.el('div', { class: 'glabel' }, p2);
  var holder = DN.el('div', { class: 'w08-svg' }, p2);
  var live = DN.el('div', { class: 'live', 'aria-live': 'polite' }, root);

  /* ---------- cards ---------- */
  var h3 = DN.el('div', { class: 'glabel' }, root);
  var cards = DN.el('div', { class: 'w08-cards' }, root);
  var TYPES = [
    { pt: 'compras compulsivas', en: 'compulsive buying', v: 5.7, col: C.sub.dinheiro },
    { pt: 'jogo', en: 'gambling', v: 5.0, col: C.sub.apostas },
    { pt: 'compulsão alimentar', en: 'binge eating', v: 4.3, col: C.sub.comida },
    { pt: 'compulsão sexual', en: 'compulsive sexual behavior', v: 3.5, col: C.sub.sexo }
  ];
  TYPES.forEach(function (t) {
    var c = DN.el('div', { class: 'w08-card' }, cards);
    t.num = DN.el('div', { class: 'w08-cn' }, c);
    t.name = DN.el('div', { class: 'w08-cl' }, c);
    var bar = DN.el('div', { class: 'w08-cb' }, c);
    var fill = DN.el('span', null, bar);
    fill.style.width = (t.v / 6 * 100) + '%'; fill.style.background = t.col;
  });
  var cnote = DN.el('div', { class: 'w08-cnote' }, root);
  var take = DN.el('p', { class: 'w08-take' }, root);

  /* ---------- curve math ---------- */
  var K = 0.28;
  function cum(fin, t) { return fin * (1 - Math.exp(-K * t)) / (1 - Math.exp(-K * 5)); }
  function stopFn(t) {
    var at = cum(EVER, STOP_AT), base = cum(NEVER, t);
    return t <= STOP_AT ? cum(EVER, t) : base + (at - cum(NEVER, STOP_AT)) * Math.exp(-(t - STOP_AT) / 0.55);
  }
  function agon(t) {
    var v = cum(st.fin, t);
    if (t <= STOP_AT || st.s <= 0) return v;
    var at = cum(st.fin, STOP_AT), base = cum(NEVER, t);
    var rec = base + (at - cum(NEVER, STOP_AT)) * Math.exp(-(t - STOP_AT) / 0.55);
    return v + (rec - v) * st.s;
  }

  var g = {};
  function build() {
    holder.innerHTML = '';
    var W = Math.max(280, holder.clientWidth || 600), mob = W < 480;
    var H = mob ? 260 : 300;
    var m = { l: mob ? 30 : 36, r: mob ? 100 : 150, t: 20, b: 34 };
    var s = DN.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img' }, holder);
    g = { s: s, W: W, H: H, m: m, mob: mob };
    g.sx = function (t) { return m.l + t / 5 * (W - m.l - m.r); };
    g.sy = function (v) { return H - m.b - v / 70 * (H - m.t - m.b); };
    [0, 20, 40, 60].forEach(function (v) {
      var y = g.sy(v);
      DN.svg('line', { x1: m.l, x2: W - m.r, y1: y, y2: y, stroke: v ? C.line : C.ink }, s);
      var t = DN.svg('text', { x: m.l - 6, y: y + 3.5, 'text-anchor': 'end', 'font-size': 10, fill: C.dim }, s);
      t.textContent = v + '%';
    });
    g.xt = [];
    for (var y = 0; y <= 5; y++) {
      var t = DN.svg('text', { x: g.sx(y) + (y ? 0 : 2), y: H - m.b + 15, 'text-anchor': y ? 'middle' : 'start', 'font-size': 10, fill: C.dim }, s);
      t.setAttribute('data-y', y); g.xt.push(t);
    }
    g.xl = DN.svg('text', { x: W - m.r, y: H - 4, 'text-anchor': 'end', 'font-size': 10, fill: C.dim }, s);
    g.stopL = DN.svg('line', { x1: g.sx(STOP_AT), x2: g.sx(STOP_AT), y1: m.t, y2: H - m.b, stroke: C.pausa, 'stroke-width': 1, 'stroke-dasharray': '3 3' }, s);
    g.stopT = DN.svg('text', { x: g.sx(STOP_AT) + 5, y: m.t - 2, 'font-size': 10, fill: C.pausa, 'font-weight': 700 }, s);
    g.stopT2 = DN.svg('text', { x: g.sx(STOP_AT) + 5, y: m.t + 10, 'font-size': 10, fill: C.pausa }, s);
    g.stopT3 = DN.svg('text', { x: g.sx(STOP_AT) + 5, y: m.t + 22, 'font-size': 10, fill: C.pausa }, s);
    g.stopP = DN.svg('path', { fill: 'none', stroke: C.pausa, 'stroke-width': 2, 'stroke-dasharray': '4 3', 'stroke-linecap': 'round' }, s);
    g.ref = DN.svg('path', { fill: 'none', stroke: C.dopa, 'stroke-width': 1, 'stroke-dasharray': '2 3', opacity: 0.8 }, s);
    g.area = DN.svg('path', { fill: C.dopaSoft, stroke: 'none' }, s);
    g.never = DN.svg('path', { fill: 'none', stroke: C.ink, 'stroke-width': 2, 'stroke-linecap': 'round' }, s);
    g.ag = DN.svg('path', { fill: 'none', stroke: C.dopa, 'stroke-width': 2.6, 'stroke-linecap': 'round' }, s);
    g.dN = DN.svg('circle', { r: 3.5, fill: C.ink }, s);
    g.dA = DN.svg('circle', { r: 4, fill: C.dopa }, s);
    g.lN = DN.svg('text', { 'font-size': mob ? 10 : 11, fill: C.ink }, s);
    g.lN2 = DN.svg('text', { 'font-size': mob ? 10 : 11, fill: C.ink, 'font-weight': 700 }, s);
    g.lA = DN.svg('text', { 'font-size': mob ? 10 : 11, fill: C.ink }, s);
    g.lA2 = DN.svg('text', { 'font-size': mob ? 10 : 11, fill: C.dopa, 'font-weight': 700 }, s);
    g.lA3 = DN.svg('text', { 'font-size': 9.5, fill: C.dim }, s);
    g.lR = DN.svg('text', { 'font-size': 9.5, fill: C.dopa, 'text-anchor': 'end', class: 'w08-halo' }, s);
  }

  function path(fn, tEnd) {
    var d = '', n = 80;
    for (var i = 0; i <= n; i++) { var t = tEnd * i / n; d += (i ? 'L' : 'M') + g.sx(t).toFixed(1) + ',' + g.sy(fn(t)).toFixed(1); }
    return d;
  }
  function draw() {
    if (!g.s) return;
    var te = 5 * st.grow; if (te < 0.001) te = 0.001;
    var neverFn = function (t) { return cum(NEVER, t); };
    g.never.setAttribute('d', path(neverFn, te));
    g.ag.setAttribute('d', path(agon, te));
    var top = path(agon, te), back = '';
    for (var i = 80; i >= 0; i--) { var t = te * i / 80; back += 'L' + g.sx(t).toFixed(1) + ',' + g.sy(cum(NEVER, t)).toFixed(1); }
    g.area.setAttribute('d', top + back + 'Z');
    /* reference: the reported 51.5% curve, shown when a dose or stop changes the agonist curve */
    var showRef = false;
    g.ref.setAttribute('d', showRef ? path(function (t) { return cum(EVER, t); }, 5) : '');
    /* the stop branch: what happens if the drug is stopped in year three (illustrative shape) */
    var showStop = te > STOP_AT;
    [g.stopL, g.stopT, g.stopT2, g.stopT3, g.stopP].forEach(function (n) { n.style.display = showStop ? '' : 'none'; });
    if (showStop) {
      var d = '', n = 40;
      for (var j = 0; j <= n; j++) { var tt = STOP_AT + (te - STOP_AT) * j / n; d += (j ? 'L' : 'M') + g.sx(tt).toFixed(1) + ',' + g.sy(stopFn(tt)).toFixed(1); }
      g.stopP.setAttribute('d', d);
    }
    var eN = cum(NEVER, te), eA = agon(te);
    g.dN.setAttribute('cx', g.sx(te)); g.dN.setAttribute('cy', g.sy(eN));
    g.dA.setAttribute('cx', g.sx(te)); g.dA.setAttribute('cy', g.sy(eA));
    var lx = g.sx(5) + 9;
    var on = st.grow >= 0.98;
    [g.lN, g.lN2, g.lA, g.lA2, g.lA3, g.lR].forEach(function (n) { n.style.display = on ? '' : 'none'; n.setAttribute('x', lx); });
    var yN = g.sy(cum(NEVER, 5)), yA = g.sy(agon(5));
    var need = g.lA3.textContent ? 44 : 32;
    if (yN - yA < need) { var mid = (yA + yN) / 2; yA = mid - need / 2; yN = mid + need / 2; }
    g.lN.setAttribute('y', yN - 2); g.lN2.setAttribute('y', yN + 12);
    g.lA.setAttribute('y', yA - 2); g.lA2.setAttribute('y', yA + 12); g.lA3.setAttribute('y', yA + 25);
    labelCurves();
    g.lR.setAttribute('x', g.sx(5) - 4); g.lR.setAttribute('y', st.s > 0.5 ? g.sy(cum(EVER, 3.3)) + 13 : g.sy(EVER) - 7);
    g.lR.style.display = on && showRef ? '' : 'none';
  }
  function labelCurves() {
    var mob = g.mob;
    g.lN.textContent = L('nunca usou', 'never used');
    g.lN2.textContent = DN.fmt(NEVER, 1) + '%';
    var a5 = agon(5);
    g.lA.textContent = st.s > 0.5 ? L('parou o remédio', 'stopped the drug') : (st.dose === 'all' ? L('já usou agonista', mob ? 'used agonist' : 'used an agonist') : L('dose ', '') + doseName(st.dose) + L('', ' dose'));
    g.lA2.textContent = DN.fmt(st.s > 0.5 || st.dose !== 'all' ? Math.round(a5) : EVER, st.s > 0.5 || st.dose !== 'all' ? 0 : 1) + '%';
    g.lA3.textContent = st.dose !== 'all' || st.s > 0.5 ? L('ilustrativo', 'illustrative') : '';
    g.lR.textContent = L('relatado: ', 'reported: ') + DN.fmt(EVER, 1) + '%';
    g.stopT.textContent = L('parou no ano 3:', 'stopped in year 3:');
    g.stopT2.textContent = L('o risco regride', 'the risk recedes');
    g.stopT3.textContent = L('(forma ilustrativa)', '(illustrative shape)');
    g.xt.forEach(function (t) { var y = +t.getAttribute('data-y'); t.textContent = y === 0 ? (mob ? '0' : L('início', 'start')) : String(y); });
    g.xl.textContent = L('anos de acompanhamento', 'years of follow-up');
    g.s.setAttribute('aria-label', L('Incidência acumulada em cinco anos de transtorno do controle de impulsos. Nunca usou agonista: 12,4%. Já usou: 51,5%. ', 'Five-year cumulative incidence of impulse control disorder. Never used an agonist: 12.4%. Used one: 51.5%. ') + live.textContent);
  }
  function doseName(k) { return { low: L('baixa', 'low'), mid: L('média', 'medium'), high: L('alta', 'high') }[k] || ''; }

  var rF = 0, rS = 0;
  function tween(from, to, ms, set, done) {
    if (DN.RM) { set(to); draw(); if (done) done(); return 0; }
    var t0 = performance.now(), id = { r: 0 };
    function step(now) {
      var u = Math.min(1, (now - t0) / ms), e = 1 - Math.pow(1 - u, 3);
      set(from + (to - from) * e); draw();
      if (u < 1) id.r = requestAnimationFrame(step); else if (done) done();
    }
    id.r = requestAnimationFrame(step);
    return id;
  }
  function tweenFinal(to) { if (rF) cancelAnimationFrame(rF.r); rF = tween(st.fin, to, 600, function (v) { st.fin = v; }); }
  function tweenS(to) { if (rS) cancelAnimationFrame(rS.r); rS = tween(st.s, to, 900, function (v) { st.s = v; }); }

  function relabel() {
    h1.textContent = L('DOMINION · 3.090 pacientes · a cada 100', 'DOMINION · 3,090 patients · per 100');
    gA.head.innerHTML = L('<b>sem agonista</b><span>7 em 100 (6,9%)</span>', '<b>no agonist</b><span>7 in 100 (6.9%)</span>');
    gB.head.innerHTML = L('<b>com agonista</b><span>17 em 100 (17,1%)</span>', '<b>on an agonist</b><span>17 in 100 (17.1%)</span>');
    gA.s.setAttribute('aria-label', L('7 de 100 pessoas sem agonista têm transtorno do controle de impulsos.', '7 of 100 people without an agonist have an impulse control disorder.'));
    gB.s.setAttribute('aria-label', L('17 de 100 pessoas com agonista têm transtorno do controle de impulsos.', '17 of 100 people on an agonist have an impulse control disorder.'));
    h2.textContent = L('Corvol · 411 pacientes acompanhados por 5 anos', 'Corvol · 411 patients followed for 5 years');
    h3.textContent = L('os tipos no DOMINION · % de todos os pacientes', 'the types in DOMINION · % of all patients');
    TYPES.forEach(function (t) { t.num.textContent = DN.fmt(t.v, 1) + '%'; t.name.textContent = L(t.pt, t.en); });
    cnote.textContent = L('Cerca de 3,9% tinham dois tipos ou mais.', 'About 3.9% had two types or more.');
    var msg = L('Em cinco anos, <b>51,5%</b> de quem já usou agonista desenvolveu um transtorno do controle de impulsos, contra <b>12,4%</b> de quem nunca usou. O risco subiu com a dose.',
      'Within five years, <b>51.5%</b> of those who had used an agonist developed an impulse control disorder, against <b>12.4%</b> of those who never had. The risk rose with the dose.');
    take.textContent = L('Remédios que imitam a dopamina fizeram pacientes sem histórico de vício jogar, comprar, comer e buscar sexo de forma compulsiva. O risco subiu com a dose e regrediu quando o remédio foi suspenso.',
      'Drugs that mimic dopamine made patients with no history of addiction gamble, shop, eat and seek sex compulsively. The risk rose with the dose and receded when the drug was stopped.');
    live.innerHTML = msg;
    draw();
  }

  build(); paintGrids(); relabel();
  DN.onLang(relabel);

  /* reveal: people light in random order, curves grow left to right */
  if (!DN.RM) {
    DN.onVisible(root, function (v) {
      if (!v) return;
      tween(0, 1, 1400, function (x) { st.lit = x; paintGrids(); });
      setTimeout(function () { tween(0, 1, 1600, function (x) { st.grow = x; }); }, 300);
    }, { once: true, threshold: 0.25 });
  }

  var rt; window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(function () { var w = Math.max(280, holder.clientWidth); if (w !== g.W) { build(); draw(); } }, 150);
  });
})();
