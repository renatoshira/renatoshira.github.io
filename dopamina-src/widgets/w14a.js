/* w14a · o-painel : four analog gauges and the buttons that do (or do not) move them */
(function () {
  'use strict';
  var root = DN.body('w14a'); if (!root) return;
  var L = DN.L, C = DN.COL;
  var SVGW = 200, SVGH = 176, CX = 100, CY = 90, R = 74, A0 = -110, A1 = 110;
  var HOLD = 4600; // ms a transient effect stays before "a few hours later"

  function pol(r, deg) { var a = deg * Math.PI / 180; return [CX + r * Math.sin(a), CY - r * Math.cos(a)]; }
  function arc(r, d0, d1) {
    var p0 = pol(r, d0), p1 = pol(r, d1);
    return 'M' + p0[0].toFixed(2) + ',' + p0[1].toFixed(2) + 'A' + r + ',' + r + ' 0 ' + (d1 - d0 > 180 ? 1 : 0) + ' 1 ' + p1[0].toFixed(2) + ',' + p1[1].toFixed(2);
  }
  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  /* ---------- the four gauges ---------- */
  var G = [
    { id: 'occ', base: 10, min: 0, max: 30,
      t: function () { return L('ocupação em repouso', 'occupancy at rest'); },
      s: function () { return L('PET depois de esvaziar a dopamina', 'PET after depleting dopamine'); },
      u: function () { return L('ocupados', 'occupied'); },
      ang: function (v) { v = DN.clamp(v, 0, 30); return v <= 10 ? A0 + v / 10 * (0 - A0) : (v - 10) / 20 * A1; },
      minor: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
      major: [0, 5, 10, 20, 30], fmt: function (v) { return DN.fmt(v, 0) + '%'; } },
    { id: 'rec', base: 100, min: 70, max: 130,
      t: function () { return L('receptores', 'receptors'); },
      s: function () { return L('PET, receptores D2 disponíveis', 'PET, available D2 receptors'); },
      u: function () { return L('do seu normal', 'of your baseline'); },
      ang: function (v) { v = DN.clamp(v, 70, 130); return (v - 100) / 30 * A1; },
      minor: [70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130],
      major: [70, 80, 90, 100, 110, 120, 130], fmt: function (v) { return DN.fmt(v, 0) + '%'; } },
    { id: 'syn', base: 100, min: 60, max: 140,
      t: function () { return L('fabricação', 'synthesis'); },
      s: function () { return L('PET com F-DOPA', 'PET with F-DOPA'); },
      u: function () { return L('do seu normal', 'of your baseline'); },
      ang: function (v) { v = DN.clamp(v, 60, 140); return (v - 100) / 40 * A1; },
      minor: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140],
      major: [60, 80, 100, 120, 140], fmt: function (v) { return DN.fmt(v, 0) + '%'; } },
    { id: 'pha', base: 0, min: -1, max: 1,
      t: function () { return L('rajadas e pausas', 'bursts and pauses'); },
      s: function () { return L('décimos de segundo, medidos em animais', 'tenths of a second, measured in animals'); },
      ang: function (v) { return DN.clamp(v, -1, 1) * A1; },
      minor: [-1, -.8, -.6, -.4, -.2, 0, .2, .4, .6, .8, 1], major: [-1, 0, 1] }
  ];

  /* ---------- model ---------- */
  var S;
  function fresh() {
    return { decades: 0, coc: 'none', cafe: 0, sono: 0, mph: 0, muc: 0, mg: 0, cues: 'old', touched: false };
  }
  S = fresh();
  function targets() {
    var occ = 10, rec = 100, syn = 100;
    if (S.coc === 'use') { occ *= 0.51; rec -= 20; }
    if (S.coc === 'abst') { occ *= 0.75; rec -= 12; }
    if (S.mph) occ += 20;
    rec -= 8 * S.decades;
    if (S.cafe) rec += 5;
    if (S.sono) rec -= 6;
    if (S.muc) syn += S.mg / 241 * 36;
    return [occ, rec, syn];
  }

  /* ---------- skeleton ---------- */
  root.innerHTML = '';
  var stick = DN.el('div', { class: 'w14a-stick' }, root);
  var msg = DN.el('div', { class: 'w14a-msg', 'aria-live': 'polite' }, stick);
  var row = DN.el('div', { class: 'w14a-gauges' }, stick);

  var RX0 = 22, RX1 = 178, RY0 = 140, NROW = 7, RP = 4.1;
  var CUE = { cafe: 58, bell: 100, book: 142 };
  var rast = { rows: [], g: null, ph: null, icons: {}, cur: NROW - 1, writing: -1 };
  var gEls = G.map(function (g, gi) {
    var card = DN.el('div', { class: 'w14a-g' }, row);
    var h = DN.el('div', { class: 'w14a-gt' }, card);
    var ht = DN.el('div', { class: 'w14a-gname' }, h);
    var hs = DN.el('div', { class: 'w14a-gsub' }, h);
    var s = DN.svg('svg', { viewBox: '0 0 ' + SVGW + ' ' + SVGH, role: 'img' }, card);
    var defs = DN.svg('defs', null, s);
    var f = DN.svg('filter', { id: 'w14a-ink' + gi, x: '-5%', y: '-5%', width: '110%', height: '110%' }, defs);
    DN.svg('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.045', numOctaves: 2, seed: 3 + gi * 5, result: 'n' }, f);
    DN.svg('feDisplacementMap', { in: 'SourceGraphic', in2: 'n', scale: 1.6, xChannelSelector: 'R', yChannelSelector: 'G' }, f);

    var ink = DN.svg('g', { filter: 'url(#w14a-ink' + gi + ')' }, s);
    var mid = g.ang(g.base);
    /* zones: below normal in indigo, above in amber */
    DN.svg('path', { d: arc(61, A0, mid), fill: 'none', stroke: C.pausa, 'stroke-opacity': .22, 'stroke-width': 5 }, ink);
    DN.svg('path', { d: arc(61, mid, A1), fill: 'none', stroke: C.dopa, 'stroke-opacity': .32, 'stroke-width': 5 }, ink);
    DN.svg('path', { d: arc(R, A0, A1), fill: 'none', stroke: C.ink, 'stroke-width': 1.3 }, ink);
    DN.svg('path', { d: arc(R - 3.5, A0, A1), fill: 'none', stroke: C.ink, 'stroke-width': .5 }, ink);
    g.minor.forEach(function (v) {
      var a = g.ang(v), maj = g.major.indexOf(v) >= 0;
      var p0 = pol(R, a), p1 = pol(R - (maj ? 10 : 5.5), a);
      DN.svg('line', { x1: p0[0], y1: p0[1], x2: p1[0], y2: p1[1], stroke: C.ink, 'stroke-width': maj ? 1.4 : .8 }, ink);
    });
    /* tick labels */
    if (g.id !== 'pha') {
      /* numbers sit outside the rim, so the needle never crosses them;
         the baseline value is marked by the triangle and the readout */
      g.major.forEach(function (v) {
        if (v === g.base) return;
        var a = g.ang(v), p = pol(R + 7, a);
        var anc = a < -12 ? 'end' : a > 12 ? 'start' : 'middle';
        var dy = 3.4 + Math.cos(a * Math.PI / 180) * -1.5;
        var t = DN.svg('text', { x: p[0], y: p[1] + dy, 'text-anchor': anc, class: 'w14a-tk' }, s);
        t.textContent = v;
      });
    }
    var endL = null, endR = null, endM = null;
    if (g.id === 'pha') {
      var pl = pol(R - 14, A0 + 8), pr = pol(R - 14, A1 - 8);
      endL = DN.svg('text', { x: pl[0], y: pl[1] + 3, 'text-anchor': 'start', class: 'w14a-tk w14a-tkp' }, s);
      endR = DN.svg('text', { x: pr[0], y: pr[1] + 3, 'text-anchor': 'end', class: 'w14a-tk w14a-tkd' }, s);
      endM = null;
    }
    /* "your normal" marker */
    var pn = pol(R + 4, mid), pn2 = pol(R + 10, mid - 3.2), pn3 = pol(R + 10, mid + 3.2);
    DN.svg('path', { d: 'M' + pn[0] + ',' + pn[1] + 'L' + pn2[0] + ',' + pn2[1] + 'L' + pn3[0] + ',' + pn3[1] + 'Z', fill: C.ink }, s);

    /* window under the dial */
    var win = DN.svg('g', { class: 'w14a-win' }, s);
    var ro = {};
    if (g.id !== 'pha') {
      DN.svg('rect', { x: 46, y: 126, width: 108, height: 44, fill: '#fbfaf6', stroke: C.ink, 'stroke-width': .8 }, win);
      ro.v = DN.svg('text', { x: CX, y: 150, 'text-anchor': 'middle', class: 'w14a-ro' }, win);
      ro.d = DN.svg('text', { x: 150, y: 138, 'text-anchor': 'end', class: 'w14a-rd' }, win);
      ro.u = DN.svg('text', { x: CX, y: 163, 'text-anchor': 'middle', class: 'w14a-ru' }, win);
    } else {
      buildRaster(win);
    }

    /* needle */
    var nd = DN.svg('g', { class: 'w14a-needle' }, s);
    DN.svg('path', { d: 'M' + (CX - 2.5) + ',' + (CY + 13) + 'L' + (CX - 1.1) + ',' + (CY - 58) + 'L' + CX + ',' + (CY - 66) + 'L' + (CX + 1.1) + ',' + (CY - 58) + 'L' + (CX + 2.5) + ',' + (CY + 13) + 'Z', fill: C.ink }, nd);
    DN.svg('path', { d: 'M' + (CX - 1.1) + ',' + (CY - 58) + 'L' + CX + ',' + (CY - 66) + 'L' + (CX + 1.1) + ',' + (CY - 58) + 'Z', fill: C.dopa, stroke: C.dopa, 'stroke-width': .8 }, nd);
    DN.svg('circle', { cx: CX, cy: CY + 10, r: 3.6, fill: C.ink }, nd);
    var ring = DN.svg('circle', { cx: CX, cy: CY, r: 10, fill: 'none', stroke: C.dopa, 'stroke-width': 2.2, pathLength: 100,
      'stroke-dasharray': '0 100', transform: 'rotate(-90 ' + CX + ' ' + CY + ')', class: 'w14a-ring' }, s);
    DN.svg('circle', { cx: CX, cy: CY, r: 5.6, fill: C.ink }, s);
    DN.svg('circle', { cx: CX, cy: CY, r: 1.9, fill: '#fff' }, s);

    var a0 = g.ang(g.base);
    return { g: g, card: card, ht: ht, hs: hs, svg: s, nd: nd, ring: ring, ro: ro, endL: endL, endR: endR, endM: endM,
      a: a0, v: 0, tgt: a0, k: g.id === 'pha' ? 520 : 95, z: g.id === 'pha' ? .55 : .38, val: g.base };
  });

  /* ---------- the raster window of gauge 4 ---------- */
  function buildRaster(win) {
    DN.svg('rect', { x: RX0 - 4, y: 124, width: RX1 - RX0 + 8, height: 48, fill: '#fbfaf6', stroke: C.ink, 'stroke-width': .8 }, win);
    /* cue icons (line drawings) */
    rast.icons.cafe = icon(win, CUE.cafe, 'M-4,-3h7v4.2a3.5,3.5 0 0 1 -7,0z M3,-1.6h1.6a1.5,1.5 0 0 1 0,3h-1.6 M-2.4,-5.4q1,-1 0,-2 M.4,-5.4q1,-1 0,-2');
    rast.icons.bell = icon(win, CUE.bell, 'M-4,2.4h8 M-3.2,2.4v-3.2a3.2,3.2 0 0 1 6.4,0v3.2 M-1,4h2 M0,-4.1v-1.2');
    rast.icons.book = icon(win, CUE.book, 'M0,-3.6v7.6 M0,-3.6q-2.6,-1.4 -5,-.6v7.2q2.4,-.8 5,.6 M0,-3.6q2.6,-1.4 5,-.6v7.2q-2.4,-.8 -5,.6');
    rast.g = DN.svg('g', null, win);
    rast.ph = DN.svg('line', { stroke: C.ink, 'stroke-width': .7, opacity: 0 }, win);
    for (var r = 0; r < NROW; r++) rast.rows.push(makeRow(r, 1, 0, false));
    drawRaster();
  }
  function icon(win, x, d) {
    var g = DN.svg('g', { transform: 'translate(' + x + ',131.5)', class: 'w14a-ico' }, win);
    DN.svg('path', { d: d, fill: 'none', stroke: C.ink, 'stroke-width': .9, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
    return g;
  }
  /* one row = one week; old cues (coffee, notification) vs new cue (book) */
  function makeRow(r, old, nw, pause) {
    seed = 11 + r * 131 + Math.round(old * 50) + Math.round(nw * 70);
    var sp = [];
    function burst(cx, n, kind) { for (var i = 0; i < n; i++) sp.push({ x: cx + 2 + i * 1.9 + rnd() * 1.1, k: kind }); }
    var no = Math.round(5 * old), nn = Math.round(5 * nw);
    [CUE.cafe, CUE.bell].forEach(function (cx) {
      burst(cx, no, 'b');
      if (pause) sp.push({ x: cx + 2 + no * 1.9, k: 'p', w: 12 - no * 1.5 });
    });
    burst(CUE.book, nn, 'b');
    /* tonic background firing */
    for (var x = RX0 + rnd() * 6; x < RX1; x += 7 + rnd() * 9) {
      var busy = sp.some(function (q) { return q.k === 'p' ? x > q.x - 1 && x < q.x + q.w + 1 : Math.abs(q.x - x) < 2.2; });
      if (!busy) sp.push({ x: x, k: 't' });
    }
    sp.sort(function (a, b) { return a.x - b.x; });
    return sp;
  }
  function drawRaster() {
    if (!rast.g) return;
    rast.g.innerHTML = '';
    rast.rows.forEach(function (sp, r) {
      if (!sp) return;
      var y = RY0 + r * RP;
      sp.forEach(function (q) {
        if (q.k === 'p') DN.svg('rect', { x: q.x, y: y + .6, width: q.w, height: 1.3, fill: C.pausa }, rast.g);
        else DN.svg('line', { x1: q.x, x2: q.x, y1: y, y2: y + 3, stroke: q.k === 'b' ? C.dopa : '#a9a9a9', 'stroke-width': q.k === 'b' ? 1.1 : .7 }, rast.g);
      });
    });
    var nw = S.cues !== 'old';
    rast.icons.cafe.style.opacity = rast.icons.bell.style.opacity = nw && S.cues === 'new' ? .45 : 1;
    rast.icons.book.style.opacity = S.cues === 'new' ? 1 : (S.cues === 'old' ? .45 : .75);
  }

  /* ---------- buttons ---------- */
  var BTN = [
    { grp: 0, id: 'detox', t: ['detox de dopamina', 'dopamine detox'], nil: ['ninguém mediu', 'nobody measured'] },
    { grp: 0, id: 'frio', t: ['banho gelado', 'cold plunge'], nil: ['medido no sangue', 'measured in blood'] },
    { grp: 0, id: 'tiro', t: ['tirosina', 'tyrosine'], nil: ['não é o gargalo', 'not the bottleneck'] },
    { grp: 0, id: 'muc', t: ['Mucuna', 'Mucuna'] },
    { grp: 1, id: 'cafe', t: ['café', 'coffee'] },
    { grp: 1, id: 'sono', t: ['uma noite sem dormir', 'a night without sleep'] },
    { grp: 1, id: 'idade', t: ['dez anos a mais', 'ten years older'] },
    { grp: 2, id: 'mph', t: ['metilfenidato', 'methylphenidate'] },
    { grp: 2, id: 'coc', t: ['um ano de cocaína', 'a year of cocaine'] },
    { grp: 2, id: 'abst', t: ['três meses sem cocaína', 'three months off cocaine'] },
    { grp: 3, id: 'pistas', t: ['mudar as pistas por dois meses', 'change the cues for two months'] }
  ];
  var GRP = [['o que se vende', 'what gets sold'], ['o dia a dia', 'daily life'], ['remédios e drogas', 'medicines and drugs'], ['o ambiente', 'the environment']];
  var panel = DN.el('div', { class: 'w14a-btns' }, root);
  var grpEls = GRP.map(function (gname, i) {
    var gr = DN.el('div', { class: 'w14a-grp' }, panel);
    var lab = DN.el('div', { class: 'w14a-glab', id: 'w14a-grp' + i }, gr);
    var list = DN.el('div', { class: 'w14a-list', role: 'group', 'aria-labelledby': 'w14a-grp' + i }, gr);
    return { lab: lab, list: list };
  });
  var bEl = {};
  BTN.forEach(function (b) {
    var e = DN.el('button', { class: 'w14a-b', type: 'button' }, grpEls[b.grp].list);
    DN.el('span', { class: 'w14a-led', 'aria-hidden': 'true' }, e);
    var tx = DN.el('span', { class: 'w14a-bt' }, e);
    var tag = DN.el('span', { class: 'w14a-tag' }, e);
    e.addEventListener('click', function () { press(b.id); });
    bEl[b.id] = { b: b, e: e, tx: tx, tag: tag };
  });
  var foot = DN.el('div', { class: 'w14a-foot' }, root);
  var bZ = DN.el('button', { class: 'btn', type: 'button' }, foot);
  var note = DN.el('div', { class: 'w14a-note' }, foot);
  var take = DN.el('p', { class: 'w14a-take' }, root);
  bZ.addEventListener('click', reset);

  /* ---------- messages ---------- */
  var MUC_MG = 0;
  function M(id) {
    var en = DN.lang() === 'en';
    var m = {
      detox: [L('Nenhum ponteiro se move. Nenhum estudo mediu a dopamina de quem fez o jejum. Os estudos mediram humor e comportamento.',
                'No needle moves. No study has measured dopamine in people doing the fast. Studies measured mood and behavior.'),
              L('seção 12', 'section 12')],
      frio: [L('Nenhum ponteiro se move. Os +250% vieram da dopamina no sangue, depois de uma hora a 14 °C, em dez homens. Essa dopamina não chega ao cérebro.',
               'No needle moves. The +250% was dopamine in blood, after an hour at 14 °C, in ten men. That dopamine does not reach the brain.'),
             'Šrámek et al., 2000'],
      tiro: [L('Nenhum ponteiro se move. A enzima que fabrica a dopamina limita a produção, e o precursor sobra. Com 2 g de tirosina, a média de 45 jovens não mudou.',
               'No needle moves. The enzyme that makes dopamine limits production, and the precursor is already in excess. With 2 g of tyrosine, the average of 45 young adults did not change.'),
             'Jongkees et al., 2015 ' + L('e', 'and') + ' 2020'],
      muc: [MUC_MG === 0
              ? L('A Mucuna é levodopa, mas esta dose não tinha levodopa detectável, como um dos frascos testados. Os outros tinham de 2 a 241 mg por dose.',
                  'Mucuna is levodopa, but this dose had no detectable levodopa, like one of the bottles tested. The others had 2 to 241 mg per dose.')
              : L('A Mucuna é levodopa, e a fabricação sobe por algumas horas. Esta dose tinha ' + MUC_MG + ' mg. Nos frascos testados, de 2 a 241 mg por dose, sem relação com o rótulo.',
                  'Mucuna is levodopa, and synthesis rises for a few hours. This dose had ' + MUC_MG + ' mg. In the bottles tested, 2 to 241 mg per dose, unrelated to the label.'),
            'Cohen et al., JAMA Neurology, 2022'],
      cafe: [L('Os receptores sobem cerca de 5% por algumas horas, perto do ruído do exame. Com 300 mg de cafeína, a ligação do traçador subiu, sinal de que não houve mais dopamina.',
               'Receptors rise about 5% for a few hours, close to the scan’s noise. With 300 mg of caffeine, tracer binding went up, a sign that there was no extra dopamine.'),
             'Volkow et al., 2015'],
      sono: [L('Os receptores do estriado ventral caem por cerca de um dia. A liberação de dopamina continua igual.',
               'Receptors in the ventral striatum drop for about a day. Dopamine release stays the same.'),
             'Volkow et al., 2012'],
      idade: [S.decades >= 3
                ? L('O painel para em trinta anos. A cada década, os receptores D2 caem cerca de 8%.', 'The panel stops at thirty years. Each decade, D2 receptors fall about 8%.')
                : L('Os receptores D2 caem cerca de 8% por década, e a queda fica. A fabricação quase não muda com a idade.',
                    'D2 receptors fall about 8% per decade, and the loss stays. Synthesis barely changes with age.'),
              'Karrer et al., 2017, ' + L('95 estudos', '95 studies')],
      mph: [L('Uma dose oral tira cerca de 20% do traçador dos receptores, o dobro ou o triplo dos prazeres do dia a dia. O efeito dura algumas horas.',
              'One oral dose displaces about 20% of the tracer from receptors, two to three times the everyday pleasures. The effect lasts a few hours.'),
            'Volkow et al., 2001'],
      coc: [L('Em repouso, a dopamina ocupa cerca de 6% dos receptores, contra 11% em quem não usa. Os receptores caem de 15 a 20%, e a queda fica.',
              'At rest, dopamine occupies about 6% of receptors, against 11% in non-users. Receptors fall 15 to 20%, and the loss stays.'),
            'Martinez et al., 2009. Nader et al., 2006'],
      abst: [S.coc === 'abst'
               ? L('Uma parte volta. Depois de três a quatro meses, a queda de receptores ainda aparece no PET. Em alguns macacos, durou mais de um ano.',
                   'Part of it comes back. After three to four months, the receptor loss still shows on PET. In some monkeys it lasted more than a year.')
               : L('Sem um ano de cocaína antes, não há nada a devolver. Aperte primeiro “um ano de cocaína”.',
                   'Without a year of cocaine first, there is nothing to give back. Press “a year of cocaine” first.'),
             'Volkow et al., 1993. Nader et al., 2006'],
      pistas: [L('Os três primeiros ponteiros ficam parados. Semana a semana, a rajada sai do café e da notificação e passa para a pista nova. O humor muda em semanas, e o hábito leva cerca de dois meses.',
                 'The first three needles stay still. Week by week, the burst leaves the coffee and the notification and moves to the new cue. Mood shifts within weeks, and the habit takes about two months.'),
               L('seção 04. Lally et al., 2010, mediana de 66 dias', 'section 04. Lally et al., 2010, median of 66 days')]
    };
    return m[id];
  }

  /* ---------- actions ---------- */
  var timers = {};
  var ringT = [null, null, null];
  var lastId = null;
  function say(id) {
    lastId = id;
    if (!id) {
      msg.innerHTML = '<p class="w14a-m0">' + L('Nenhum botão foi apertado.', 'No button has been pressed.') + '</p>' +
        '<p class="w14a-src">' + L('Os quatro ponteiros estão no seu normal, marcado pelo triângulo.', 'All four needles sit at your baseline, marked by the triangle.') + '</p>';
      return;
    }
    var m = M(id), b = bEl[id].b;
    msg.innerHTML = '<p><b>' + b.t[DN.lang() === 'en' ? 1 : 0] + '.</b> ' + m[0] + '</p><p class="w14a-src">' + L('Fonte: ', 'Source: ') + m[1] + '</p>';
  }

  function nil(id, keep) {
    var e = bEl[id].e;
    e.classList.remove('shake'); void e.offsetWidth;
    if (!DN.RM) e.classList.add('shake');
    if (!keep) e.classList.add('nil');
  }

  function flash(idx) {
    idx.forEach(function (i) {
      var c = gEls[i].card; c.classList.remove('moved'); void c.offsetWidth; c.classList.add('moved');
    });
  }

  function transient(key, gi, ms) {
    clearTimeout(timers[key]);
    S[key] = 1;
    ringT[gi] = { t0: performance.now(), ms: ms, key: key };
    timers[key] = setTimeout(function () {
      S[key] = 0;
      if (ringT[gi] && ringT[gi].key === key) ringT[gi] = null;
      gEls[gi].ring.setAttribute('stroke-dasharray', '0 100');
      led();
      update();
    }, ms);
  }

  function press(id) {
    S.touched = true;
    if (DN.sound()) DN.click();
    switch (id) {
      case 'detox': case 'frio': case 'tiro': nil(id); break;
      case 'muc':
        MUC_MG = Math.random() < 0.1 ? 0 : Math.round(2 + Math.pow(Math.random(), 1.4) * 239);
        S.mg = MUC_MG;
        if (MUC_MG) { transient('muc', 2, HOLD); flash([2]); } else { S.muc = 0; nil('muc', true); }
        break;
      case 'cafe': transient('cafe', 1, HOLD); flash([1]); break;
      case 'sono': transient('sono', 1, HOLD); flash([1]); break;
      case 'idade':
        if (S.decades >= 3) { nil('idade', true); break; }
        S.decades++; flash([1]); break;
      case 'mph': transient('mph', 0, HOLD); flash([0]); break;
      case 'coc': S.coc = 'use'; flash([0, 1]); break;
      case 'abst':
        if (S.coc === 'use') { S.coc = 'abst'; flash([0, 1]); }
        else if (S.coc !== 'abst') nil('abst', true);
        break;
      case 'pistas': shiftCues(); flash([3]); break;
    }
    if (id === 'idade' && S.decades > 0) bEl.idade.tag.textContent = '+' + (S.decades * 10) + L(' anos', ' years');
    say(id);
    led();
    update();
    root.classList.add('w14a-used');
  }

  function led() {
    bEl.muc.e.classList.toggle('lit', !!S.muc);
    bEl.cafe.e.classList.toggle('lit', !!S.cafe);
    bEl.sono.e.classList.toggle('lit', !!S.sono);
    bEl.mph.e.classList.toggle('lit', !!S.mph);
    bEl.idade.e.classList.toggle('lit', S.decades > 0);
    bEl.coc.e.classList.toggle('lit', S.coc === 'use');
    bEl.abst.e.classList.toggle('lit', S.coc === 'abst');
    bEl.pistas.e.classList.toggle('lit', S.cues !== 'old');
    ['muc', 'cafe', 'sono', 'mph', 'coc', 'abst', 'pistas'].forEach(function (k) {
      bEl[k].e.setAttribute('aria-pressed', bEl[k].e.classList.contains('lit'));
    });
    bEl.idade.e.setAttribute('aria-pressed', S.decades > 0);
  }

  var shiftTimer = null;
  function shiftCues() {
    clearTimeout(shiftTimer);
    S.cues = 'shifting';
    rast.rows = rast.rows.map(function () { return null; });
    var r = 0;
    function step() {
      var t = (r + 1) / NROW;
      rast.rows[r] = makeRow(r, Math.max(0, 1 - t * 1.35), Math.min(1, t * 1.2), r <= 2);
      rast.writing = r;
      rast.cur = r;
      phX = RX0 - 6;
      drawRaster();
      r++;
      if (r < NROW) shiftTimer = setTimeout(step, DN.RM ? 0 : 520);
      else { S.cues = 'new'; rast.writing = -1; rast.cur = NROW - 1; drawRaster(); led(); paintGaugeText(); }
    }
    if (DN.RM) { while (r < NROW) { var t = (r + 1) / NROW; rast.rows[r] = makeRow(r, Math.max(0, 1 - t * 1.35), Math.min(1, t * 1.2), r <= 2); r++; } S.cues = 'new'; rast.cur = NROW - 1; drawRaster(); }
    else step();
    paintGaugeText();
  }

  function reset() {
    Object.keys(timers).forEach(function (k) { clearTimeout(timers[k]); });
    clearTimeout(shiftTimer);
    S = fresh();
    ringT = [null, null, null];
    gEls.forEach(function (e) { e.ring.setAttribute('stroke-dasharray', '0 100'); });
    BTN.forEach(function (b) { bEl[b.id].e.classList.remove('nil', 'shake', 'lit'); bEl[b.id].tag.textContent = b.nil ? '' : ''; });
    rast.rows = []; for (var r = 0; r < NROW; r++) rast.rows.push(makeRow(r, 1, 0, false));
    rast.cur = NROW - 1; rast.writing = -1;
    drawRaster();
    root.classList.remove('w14a-used');
    labels();
    say(null);
    led();
    update();
  }

  /* ---------- rendering ---------- */
  function paintGaugeText() {
    var tg = targets();
    gEls.forEach(function (e, i) {
      var g = e.g;
      e.ht.textContent = g.t();
      e.hs.textContent = g.id === 'pha'
        ? (S.cues === 'new' ? L('a rajada mudou de pista', 'the burst moved to a new cue') : S.cues === 'shifting' ? L('as semanas passam', 'the weeks go by') : g.s())
        : g.s();
      if (g.id === 'pha') {
        e.endL.textContent = L('pausa', 'pause'); e.endR.textContent = L('rajada', 'burst');
        e.svg.setAttribute('aria-label', g.t() + '. ' + (S.cues === 'new'
          ? L('As rajadas aparecem na pista nova, o livro. O café e a notificação perderam a rajada.', 'Bursts appear at the new cue, the book. Coffee and the notification lost their burst.')
          : L('As rajadas aparecem no café e na notificação.', 'Bursts appear at the coffee and the notification.')));
        return;
      }
      var v = tg[i], d = v - g.base;
      e.ro.v.textContent = g.fmt(v);
      e.ro.u.textContent = g.u();
      var ad = Math.abs(d);
      e.ro.d.textContent = ad < 0.5 ? '' : (d > 0 ? '▲' : '▼') + DN.fmt(ad, 0);
      e.ro.d.setAttribute('fill', d > 0 ? C.dopa : C.pausa);
      e.svg.setAttribute('aria-label', g.t() + ': ' + g.fmt(v) + ' ' + g.u() + '. ' + L('Normal: ', 'Baseline: ') + g.fmt(g.base) + '.');
    });
  }
  function update() {
    var tg = targets();
    for (var i = 0; i < 3; i++) gEls[i].tgt = gEls[i].g.ang(tg[i]);
    paintGaugeText();
    if (DN.RM) { gEls.forEach(function (e) { e.a = e.tgt; e.v = 0; place(e); }); }
    else kick();
  }
  function place(e) { e.nd.setAttribute('transform', 'rotate(' + e.a.toFixed(2) + ' ' + CX + ' ' + CY + ')'); }

  function labels() {
    BTN.forEach(function (b) {
      var o = bEl[b.id];
      o.tx.textContent = b.t[DN.lang() === 'en' ? 1 : 0];
      if (b.nil) o.tag.textContent = L(b.nil[0], b.nil[1]);
      if (b.id === 'idade') o.tag.textContent = S.decades ? '+' + (S.decades * 10) + L(' anos', ' years') : '';
      if (b.id === 'muc') o.tag.textContent = L('dose imprevisível', 'unpredictable dose');
      if (b.id === 'abst') o.tag.textContent = '';
    });
    GRP.forEach(function (g, i) { grpEls[i].lab.textContent = L(g[0], g[1]); });
    bZ.textContent = L('zerar', 'reset');
    take.textContent = L('Só a idade, o sono, as drogas e os remédios movem os três primeiros ponteiros. O único que responde a uma mudança de vida é o das rajadas e pausas, porque ele aprende.',
      'Only age, sleep, drugs and medicines move the first three needles. The only one that responds to a change in your life is bursts and pauses, because it learns.');
    note.textContent = L('Os botões cinza não movem nada no cérebro. A idade e a cocaína ficam até você zerar.',
      'Grey buttons move nothing in the brain. Age and cocaine stay until you reset.');
  }

  /* ---------- animation loop: springs + phasic needle ---------- */
  var raf = 0, last = 0, visible = false, phX = RX0 - 6, phTgt = 0;
  function kick() { if (!raf && visible) { last = performance.now(); raf = requestAnimationFrame(loop); } }
  function loop(now) {
    raf = 0;
    var dt = Math.min(0.033, (now - last) / 1000); last = now;
    var busy = false;
    /* phasic needle: a playhead sweeps the current week, bursts kick right, pauses kick left */
    if (!DN.RM && rast.rows.length) {
      var prev = phX;
      phX += dt * (S.cues === 'shifting' ? 330 : 64);
      var rowS = rast.rows[rast.cur];
      if (rowS) rowS.forEach(function (q) {
        if (q.x > prev && q.x <= phX) {
          if (q.k === 'b') phTgt = Math.max(phTgt, .55 + .1 * Math.random() + .07);
          else if (q.k === 'p') phTgt = -0.75;
          else phTgt = Math.max(phTgt, .09);
        }
      });
      if (phX > RX1 + 26) phX = RX0 - 10;
      phTgt *= Math.exp(-dt / 0.16);
      var y = RY0 + rast.cur * RP;
      rast.ph.setAttribute('x1', phX); rast.ph.setAttribute('x2', phX);
      rast.ph.setAttribute('y1', y - 1); rast.ph.setAttribute('y2', y + 4);
      rast.ph.setAttribute('opacity', phX >= RX0 - 2 && phX <= RX1 + 2 ? .9 : 0);
      gEls[3].tgt = gEls[3].g.ang(phTgt);
      busy = true;
    }
    gEls.forEach(function (e, i) {
      var k = e.k, c = 2 * Math.sqrt(k) * e.z;
      var acc = -k * (e.a - e.tgt) - c * e.v;
      e.v += acc * dt; e.a += e.v * dt;
      if (Math.abs(e.a - e.tgt) > 0.02 || Math.abs(e.v) > 0.02) busy = true;
      place(e);
      if (i < 3) {
        var rt = ringT[i];
        if (rt) {
          var p = DN.clamp(1 - (now - rt.t0) / rt.ms, 0, 1);
          e.ring.setAttribute('stroke-dasharray', (p * 100).toFixed(1) + ' 100');
          busy = true;
        }
      }
    });
    if (busy && visible) raf = requestAnimationFrame(loop);
  }

  DN.onVisible(root, function (v) {
    visible = v;
    if (v) kick(); else if (raf) { cancelAnimationFrame(raf); raf = 0; }
  });

  DN.onLang(function () { labels(); say(lastId); paintGaugeText(); });
  labels();
  say(null);
  led();
  gEls.forEach(place);
  update();
})();
