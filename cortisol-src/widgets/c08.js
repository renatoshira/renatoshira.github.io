/* c08 · a-regua : what raises and what lowers cortisol, on one ruler */
(function () {
  'use strict';
  var root = DN.body('c08'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, S = DN.svg, E = DN.el, C = DN.COL;
  var MINUS = '−';

  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function f1(n) { return Math.round(n * 10) / 10; }
  function pct(v, d) { return (v > 0 ? '+' : v < 0 ? MINUS : '') + fmt(Math.abs(v), d == null ? (Math.abs(v) % 1 ? 1 : 0) : d) + '%'; }

  /* ---------- risograph icons, 32 x 32, two inks: a = vermilion, b = teal ----------
     $0 solid ink, $1 $2 $3 light, mid, dark halftone. Same technique as w00. */
  var INKS = [{ k: 'a', col: C.alta, ang: 15, op: 0.95 }, { k: 'b', col: C.baixa, ang: 75, op: 0.92 }];
  var ICON = {
    riso: { a: '<circle cx="16" cy="16" r="12.5" fill="$1"/><circle cx="9" cy="18.5" r="2.4" fill="$0"/><circle cx="23" cy="18.5" r="2.4" fill="$0"/>',
      b: '<path d="M8.5,12.5 q2.5,-3 5,0 M18.5,12.5 q2.5,-3 5,0" stroke="$0" stroke-width="1.8" fill="none" stroke-linecap="round"/><path d="M9.5,19 H22.5 C22.5,24.5 19.5,27 16,27 C12.5,27 9.5,24.5 9.5,19Z" fill="$0"/>' },
    omega: { a: '<rect x="4" y="11" width="13" height="10" rx="5" fill="$0" transform="rotate(-30 16 16)"/>',
      b: '<rect x="15" y="11" width="13" height="10" rx="5" fill="$2" transform="rotate(-30 16 16)"/><path d="M8,13.5 q2,-2.5 5,-3" stroke="#fff" class="c08-pp" stroke-width="1.4" fill="none" stroke-linecap="round" transform="rotate(-30 16 16)"/>' },
    maos: { a: '<path d="M6,27 C5,20 6,14 9,10 C10,8.6 12,9.4 11.4,11 L10.5,15 L14,6.5 C14.6,5 16.8,5.6 16.4,7.3 L14.6,14 L18.5,5.8 C19.2,4.4 21.3,5.2 20.8,6.8 L18,15.5 L21.5,10 C22.4,8.7 24.3,9.7 23.6,11.2 L19.5,20 C18,24 15,26.5 12,28Z" fill="$1"/>',
      b: '<path d="M3,30 C6,24 12,22 18,22 C22,22 26,20 29,17" stroke="$0" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M4,30 H28" stroke="$2" stroke-width="3"/>' },
    tenis: { a: '<path d="M3,25 H29 V27.5 H3Z" fill="$0"/><path d="M14,13 l2.5,3 M17,11.8 l2.5,3 M20,11 l2.5,3" stroke="$0" stroke-width="1.3" stroke-linecap="round"/>',
      b: '<path d="M3,25 C3,19 4,14 6,10 L12,10 C13,13 16,14.5 20,15.5 C25,16.5 29,19 29,25Z" fill="$2"/><path d="M6,10 L12,10" stroke="$0" stroke-width="2"/>' },
    noite: { a: '<rect x="3" y="13" width="26" height="14" rx="6" fill="$1"/><path d="M5,18 q11,4 22,0" stroke="$0" stroke-width="1.2" fill="none"/>',
      b: '<path d="M22,3.5 A6.5,6.5 0 1 0 28.5,11 A5,5 0 1 1 22,3.5Z" fill="$0"/><path d="M8,6 h4 l-4,4 h4" stroke="$0" stroke-width="1.3" fill="none" stroke-linejoin="round"/>' },
    sol: { a: '<circle cx="16" cy="17" r="7.5" fill="$0"/>',
      b: '<path d="M16,3 V6.5 M16,27.5 V31 M2,17 H5.5 M26.5,17 H30 M6,7 L8.4,9.4 M23.6,24.6 L26,27 M26,7 L23.6,9.4 M8.4,24.6 L6,27" stroke="$0" stroke-width="2" stroke-linecap="round"/><circle cx="16" cy="17" r="10" fill="$1"/>' },
    banca: { a: '<circle cx="9" cy="10" r="3.6" fill="$0"/><circle cx="16" cy="9" r="3.6" fill="$0"/><circle cx="23" cy="10" r="3.6" fill="$0"/><path d="M4,19 C4,15 14,15 14,19Z M11,18 C11,14 21,14 21,18Z M18,19 C18,15 28,15 28,19Z" fill="$2"/>',
      b: '<rect x="2" y="18" width="28" height="5" fill="$0"/><path d="M5,23 V30 M27,23 V30" stroke="$0" stroke-width="2"/>' },
    raiz: { a: '<rect x="9" y="11" width="14" height="9" fill="$0"/><path d="M14,23 c-1,3 -4,4 -6,7 M17,23 c1,3 3,4 4,7 M15.5,23 v7" stroke="$0" stroke-width="1.2" fill="none" stroke-linecap="round"/>',
      b: '<rect x="12" y="2.5" width="8" height="4" fill="$0"/><path d="M11,7 H21 V9 C24,10 25,12 25,15 V28 H7 V15 C7,12 8,10 11,9Z" fill="$2"/>' },
    cocktail: { a: '<path d="M7.5,10 H24.5 C24,15.5 20.5,18.5 16,18.5 C11.5,18.5 8,15.5 7.5,10Z" fill="$2"/><circle cx="23.5" cy="8.5" r="4.2" fill="$1"/><path d="M23.5,4.3 V12.7 M19.3,8.5 H27.7" stroke="$0" stroke-width=".8"/>',
      b: '<path d="M6,7 H26 C26,15 21.5,19.5 16,19.5 C10.5,19.5 6,15 6,7Z" stroke="$0" stroke-width="1.6" fill="none"/><path d="M16,19.5 V27.5 M10,28.5 H22" stroke="$0" stroke-width="1.8" stroke-linecap="round"/>' },
    pilula: { a: '<circle cx="13" cy="15" r="9" fill="$1"/><path d="M6.6,8.6 L19.4,21.4" stroke="$0" stroke-width="1.4"/>',
      b: '<circle cx="22" cy="22" r="6" fill="$2"/><path d="M17.8,22 H26.2" stroke="#fff" class="c08-ps" stroke-width="1.2"/>' },
    medita: { a: '<circle cx="16" cy="16" r="13" fill="$1"/>',
      b: '<circle cx="16" cy="8.5" r="3.4" fill="$0"/><path d="M16,12.5 C12,12.5 11,16 11,20 L5,25 C4,26 5,27.5 6.5,27 L16,25 L25.5,27 C27,27.5 28,26 27,25 L21,20 C21,16 20,12.5 16,12.5Z" fill="$0"/>' }
  };
  var defsSvg = S('svg', { width: 0, height: 0, 'aria-hidden': 'true', style: 'position:absolute;width:0;height:0' }, root);
  (function () {
    var d = '';
    var R = rng(808);
    INKS.forEach(function (ink) {
      [0.42, 0.62, 0.82].forEach(function (r, j) {
        d += '<pattern id="c08h-' + ink.k + (j + 1) + '" width="1.9" height="1.9" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx=".95" cy=".95" r="' + r + '" fill="' + ink.col + '"/></pattern>';
      });
      for (var s = 0; s < 3; s++) {
        d += '<filter id="c08g-' + ink.k + s + '" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">' +
          '<feTurbulence type="fractalNoise" baseFrequency="0.18" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
          '<feDisplacementMap in="SourceGraphic" in2="w" scale="0.9" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
          '<feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
          '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3 0 0 0 2.5" result="m"/>' +
          '<feComposite in="d" in2="m" operator="in"/></filter>';
      }
    });
    defsSvg.innerHTML = '<defs>' + d + '</defs>';
  })();
  var iconN = 0;
  function icon(key) {
    var art = ICON[key], R = rng(31 + iconN * 17), s = iconN++ % 3, layers = '';
    INKS.forEach(function (ink, li) {
      var mx = f1((R() < 0.5 ? -1 : 1) * (0.3 + R() * (li ? 0.7 : 0.4)));
      var my = f1((R() < 0.5 ? -1 : 1) * (0.3 + R() * (li ? 0.6 : 0.3)));
      var body = art[ink.k].replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#c08h-' + ink.k + '$1)');
      layers += '<g class="c08-ink c08-ink-' + ink.k + '" transform="translate(' + mx + ' ' + my + ')" opacity="' + ink.op + '" filter="url(#c08g-' + ink.k + s + ')">' + body + '</g>';
    });
    return '<svg class="c08-ic" viewBox="0 0 32 32" aria-hidden="true" focusable="false">' + layers + '</svg>';
  }

  /* ---------- data ---------- */
  var ROWS = [
    { ic: 'riso', v: -31.9, lo: -47.7, hi: -16.3,
      pt: 'Riso', en: 'Laughter',
      mpt: 'sessões de riso contra grupo controle; saliva ou sangue', men: 'laughter sessions against a control group; saliva or blood',
      ept: 'meta-análise, 8 estudos, 315 pessoas; intervalo de −47,7% a −16,3%; amostras pequenas', een: 'meta-analysis, 8 studies, 315 people; interval −47.7% to −16.3%; small samples',
      src: 'Kramer e Leitão, 2023' },
    { ic: 'omega', v: -19,
      pt: 'Ômega-3, 2,5 g por dia, 4 meses', en: 'Omega-3, 2.5 g a day, 4 months',
      mpt: 'cortisol durante um estresse de laboratório', men: 'cortisol during a laboratory stressor',
      ept: '1 ensaio, 138 adultos sedentários com sobrepeso', een: '1 trial, 138 sedentary adults with overweight',
      src: 'Madison et al., 2021' },
    { ic: 'maos', v: -31, ctrl: 0,
      pt: 'Massagem', en: 'Massage',
      mpt: 'antes e depois do mesmo grupo, e contra grupo controle', men: 'before and after in the same group, and against a control group',
      ept: 'antes e depois: revisão do próprio grupo; contra controle: 18 estudos, 704 pessoas', een: 'before and after: the group’s own review; against control: 18 studies, 704 people',
      src: 'Field et al., 2005; Moyer et al., 2011' },
    { ic: 'tenis', v: 5.7, ns: true,
      pt: 'Treino leve, 30 min a 40%', en: 'Light exercise, 30 min at 40%',
      mpt: 'sangue, antes e depois; igual a zero na estatística', men: 'blood, before and after; statistically equal to zero',
      ept: '1 experimento, 12 homens', een: '1 experiment, 12 men',
      src: 'Hill et al., 2008' },
    { ic: 'noite', v: 37,
      pt: 'Noite curta (dormir das 4h às 8h)', en: 'Short night (sleep from 4 to 8 a.m.)',
      mpt: 'cortisol da noite seguinte, das 18h às 23h', men: 'cortisol the next evening, 6 to 11 p.m.',
      ept: '1 experimento pequeno, só homens', een: '1 small experiment, men only',
      src: 'Leproult et al., 1997' },
    { ic: 'noite', v: 45,
      pt: 'Noite em claro', en: 'A night without sleep',
      mpt: 'cortisol da noite seguinte, das 18h às 23h', men: 'cortisol the next evening, 6 to 11 p.m.',
      ept: '1 experimento pequeno, só homens', een: '1 small experiment, men only',
      src: 'Leproult et al., 1997' },
    { ic: 'sol', v: 50,
      pt: 'Luz forte de manhã', en: 'Bright morning light',
      mpt: '5.000 lux das 5h às 8h, contra luz fraca', men: '5,000 lux from 5 to 8 a.m., against dim light',
      ept: '1 experimento pequeno', een: '1 small experiment',
      src: 'Leproult et al., 2001' },
    { ic: 'tenis', v: 39.9,
      pt: 'Treino de 30 min a 60%', en: 'Exercise, 30 min at 60%',
      mpt: 'sangue, antes e depois', men: 'blood, before and after',
      ept: '1 experimento, 12 homens', een: '1 experiment, 12 men',
      src: 'Hill et al., 2008' },
    { ic: 'tenis', v: 83.1,
      pt: 'Treino de 30 min a 80%', en: 'Exercise, 30 min at 80%',
      mpt: 'sangue, antes e depois', men: 'blood, before and after',
      ept: '1 experimento, 12 homens', een: '1 experiment, 12 men',
      src: 'Hill et al., 2008' },
    { ic: 'banca', lo: 100, hi: 300,
      pt: 'Banca de avaliadores', en: 'A panel of evaluators',
      mpt: 'falar e fazer contas diante da banca; saliva, pico contra o basal', men: 'a speech and mental arithmetic before the panel; saliva, peak against baseline',
      ept: 'protocolo padrão de laboratório, com picos parecidos entre estudos', een: 'a standard laboratory protocol, with similar peaks across studies',
      src: 'Kirschbaum et al., 1993' }
  ];
  var D0 = -50, D1 = 170, WAKE = [50, 160];
  var ASH = [
    { v: 1.16, lo: 0.69, hi: 1.64, y: '2025', pt: '7 ensaios, 488 pessoas', en: '7 trials, 488 people' },
    { v: 2.58, lo: 0.16, hi: 4.99, y: '2024', pt: '9 ensaios, 558 pessoas', en: '9 trials, 558 people' },
    { v: 3.27, y: '2026', pt: '14 estudos, sem intervalo publicado', en: '14 studies, no interval published' }
  ];
  var DROP = 13.5, U1 = 14;

  /* ---------- DOM ---------- */
  var wrap = E('div', { class: 'c08-wrap' }, root);
  var h1 = E('div', { class: 'c08-bh' }, wrap);
  var head = E('div', { class: 'c08-row c08-head' }, wrap);
  E('span', { class: 'c08-icw' }, head);
  var headL = E('div', { class: 'c08-lab c08-hl' }, head);
  var headSv = S('svg', { class: 'c08-trk', 'aria-hidden': 'true' }, E('div', { class: 'c08-tw' }, head));
  var headE = E('div', { class: 'c08-ev c08-he' }, head);
  var list = E('ol', { class: 'c08-rows', role: 'list' }, wrap);
  var rows = ROWS.map(function (r, i) {
    var li = E('li', { class: 'c08-row c08-r', style: '--i:' + i }, list);
    E('span', { class: 'c08-icw' }, li, icon(r.ic));
    var lab = E('div', { class: 'c08-lab' }, li);
    var t = E('b', null, lab), m = E('span', null, lab);
    var tw = E('div', { class: 'c08-tw' }, li);
    var sv = S('svg', { class: 'c08-trk', role: 'img' }, tw);
    var ev = E('div', { class: 'c08-ev' }, li);
    return { r: r, t: t, m: m, sv: sv, ev: ev };
  });
  var foot = E('div', { class: 'c08-row c08-foot' }, wrap);
  E('span', { class: 'c08-icw' }, foot); E('div', { class: 'c08-lab' }, foot);
  var footSv = S('svg', { class: 'c08-trk', 'aria-hidden': 'true' }, E('div', { class: 'c08-tw' }, foot));
  E('div', { class: 'c08-ev' }, foot);

  /* block 2: ashwagandha in µg/dL */
  var b2 = E('div', { class: 'c08-b2' }, root);
  var h2 = E('div', { class: 'c08-bh' }, b2);
  var b2g = E('div', { class: 'c08-b2g' }, b2);
  var b2l = E('div', { class: 'c08-b2l' }, b2g);
  var b2ic = E('span', { class: 'c08-icw c08-icbig' }, b2l, icon('raiz'));
  var b2sv = S('svg', { class: 'c08-b2sv', role: 'img' }, E('div', { class: 'c08-b2w' }, b2l));
  var b2leg = E('ol', { class: 'c08-b2leg' }, b2sv.parentNode);
  var seals = E('div', { class: 'c08-seals' }, b2g);
  var seal1 = E('p', { class: 'c08-seal c08-ban' }, seals);
  var seal2 = E('p', { class: 'c08-seal' }, seals);
  var b2n = E('p', { class: 'c08-note' }, b2);

  /* block 3: no comparable number */
  var b3 = E('div', { class: 'c08-b3' }, root);
  var h3 = E('div', { class: 'c08-bh' }, b3);
  var b3g = E('div', { class: 'c08-b3g' }, b3);
  function card(ic) {
    var c = E('div', { class: 'c08-card' }, b3g);
    var top = E('div', { class: 'c08-ct' }, c);
    E('span', { class: 'c08-icw' }, top, icon(ic));
    var t = E('b', null, top);
    var p = E('p', null, c);
    return { c: c, t: t, p: p };
  }
  var cc = card('cocktail'), cm = card('pilula'), cq = card('medita');
  var funSv = S('svg', { class: 'c08-fun', role: 'img' }, cq.c);
  var funN = E('p', { class: 'c08-fn' }, cq.c);

  var take = E('p', { class: 'c08-take' }, root);
  var det = E('details', { class: 'more c08-det' }, root);
  var sum = E('summary', null, det);
  var tblW = E('div', { class: 'c08-tw2' }, det);

  var G = {};
  function X(v) { return G.pad + (v - D0) / (D1 - D0) * (G.tw - G.pad * 2); }
  function txt(parent, x, y, s, cls, anchor) {
    var t = S('text', { x: f1(x), y: f1(y), class: cls, 'text-anchor': anchor || 'start' }, parent);
    t.textContent = s; return t;
  }
  function tw(s, px) { return s.length * px * 0.6; }

  function track(sv, h, withBand) {
    sv.innerHTML = '';
    sv.setAttribute('viewBox', '0 0 ' + G.tw + ' ' + h);
    sv.setAttribute('width', G.tw); sv.setAttribute('height', h);
    if (withBand) S('rect', { x: f1(X(WAKE[0])), y: 0, width: f1(X(WAKE[1]) - X(WAKE[0])), height: h, class: 'c08-wake' }, sv);
    [-50, 0, 50, 100, 150].forEach(function (v) {
      S('line', { x1: f1(X(v)), x2: f1(X(v)), y1: 0, y2: h, class: v === 0 ? 'c08-zero' : 'c08-grid' }, sv);
    });
  }
  function ticks(sv, top) {
    var h = G.mob ? (top ? 32 : 18) : (top ? 44 : 22);
    track(sv, h, true);
    var ty = top ? h - 5 : 13;
    [-50, 0, 50, 100, 150].forEach(function (v) {
      txt(sv, X(v), ty, v === 0 ? '0' : pct(v), 'c08-tick', 'middle');
    });
    if (top && G.mob) txt(sv, (X(WAKE[0]) + X(WAKE[1])) / 2, 11, L('despertar: +50% a +160%', 'waking: +50% to +160%'), 'c08-wt', 'middle');
    if (top && !G.mob) {
      txt(sv, (X(WAKE[0]) + X(WAKE[1])) / 2, 12, L('subida normal do despertar', 'normal rise after waking'), 'c08-wt', 'middle');
      txt(sv, (X(WAKE[0]) + X(WAKE[1])) / 2, 24, L('+50% a +160%, todo dia', '+50% to +160%, every day'), 'c08-wt2', 'middle');
      txt(sv, X(0) - 6, 24, L('← baixa', '← lowers'), 'c08-dir c08-dl', 'end');
      txt(sv, X(0) + 6, 24, L('sobe →', 'raises →'), 'c08-dir c08-du', 'start');
    }
  }
  function drawRow(o) {
    var r = o.r, sv = o.sv, h = G.mob ? 40 : 42, cy = G.mob ? 26 : 26, down = (r.v != null ? r.v : r.lo) < 0;
    track(sv, h, true);
    var col = down ? C.baixa : C.alta, tcls = down ? 'c08-vl c08-vb' : 'c08-vl c08-va';
    var g = S('g', { class: 'c08-mk' }, sv);
    var label, lx, la;
    if (r.ic === 'banca') {
      var x0 = X(r.lo), x1 = X(D1) + G.pad - 2;
      S('rect', { x: f1(x0), y: cy - 5, width: f1(x1 - x0 - 8), height: 10, class: 'c08-bancar' }, g);
      S('path', { d: 'M' + f1(x1 - 9) + ',' + (cy - 8) + ' L' + f1(x1) + ',' + cy + ' L' + f1(x1 - 9) + ',' + (cy + 8) + 'Z', fill: col }, g);
      label = L('+100% a +300%', '+100% to +300%');
      lx = x0 - 7; la = 'end';
    } else if (r.ctrl != null) {
      var xa = X(r.v), xb = X(r.ctrl);
      S('path', { d: 'M' + f1(xa + 7) + ',' + cy + ' L' + f1(xb - 8) + ',' + cy, class: 'c08-arr' }, g);
      S('path', { d: 'M' + f1(xb - 13) + ',' + (cy - 4) + ' L' + f1(xb - 7) + ',' + cy + ' L' + f1(xb - 13) + ',' + (cy + 4), class: 'c08-arrh' }, g);
      S('circle', { cx: f1(xa), cy: cy, r: 5, fill: col }, g);
      S('circle', { cx: f1(xb), cy: cy, r: 4.5, class: 'c08-hol', stroke: col }, g);
      txt(sv, xa - 9, cy + 4, pct(r.v), tcls, 'end');
      if (!G.mob) txt(sv, xb - 10, cy - 10, L('antes e depois', 'before and after'), 'c08-vs', 'end');
      txt(sv, xb + 9, cy + 4, G.mob ? L('contra controle: ~0', 'vs control: ~0') : L('contra controle: perto de zero', 'against control: near zero'), tcls, 'start');
      return;
    } else {
      var x = X(r.v);
      if (r.lo != null) {
        S('line', { x1: f1(X(r.lo)), x2: f1(X(r.hi)), y1: cy, y2: cy, stroke: col, class: 'c08-ci' }, g);
        [r.lo, r.hi].forEach(function (v) { S('line', { x1: f1(X(v)), x2: f1(X(v)), y1: cy - 4, y2: cy + 4, stroke: col, class: 'c08-ci' }, g); });
      }
      if (r.ns) S('circle', { cx: f1(x), cy: cy, r: 4.5, class: 'c08-hol', stroke: col }, g);
      else S('circle', { cx: f1(x), cy: cy, r: 5, fill: col }, g);
      label = pct(r.v);
      if (r.lo != null) {
        txt(sv, x, cy - 10, label, tcls, 'middle');
        return;
      }
      if (down) { lx = x - 9; la = 'end'; }
      else { lx = x + 9; la = 'start'; }
    }
    txt(sv, lx, cy + 4, label, tcls, la);
  }

  function drawB2() {
    var W = b2sv.parentNode.clientWidth || 600, mob = W < 470;
    var lw = mob ? 0 : 256, rh = 30, top = 6, n = ASH.length + 1, axisY = top + rh * n + 4;
    var H = axisY + 24;
    var x0 = lw + 6, x1 = W - (mob ? 44 : 70);
    function U(v) { return x0 + v / U1 * (x1 - x0); }
    b2sv.innerHTML = ''; b2leg.innerHTML = ''; b2leg.hidden = !mob;
    b2sv.setAttribute('viewBox', '0 0 ' + W + ' ' + H); b2sv.setAttribute('width', W); b2sv.setAttribute('height', H);
    [0, 2, 4, 6, 8, 10, 12, 14].forEach(function (v) {
      S('line', { x1: f1(U(v)), x2: f1(U(v)), y1: top - 2, y2: axisY, class: v ? 'c08-grid' : 'c08-zero' }, b2sv);
      txt(b2sv, U(v), axisY + 13, fmt(v), 'c08-tick', 'middle');
    });
    var items = [{ v: DROP, t: L('queda normal, do pico à meia-noite', 'normal fall, peak to midnight'), s: L('cerca de 13,5 µg/dL, todo dia', 'about 13.5 µg/dL, every day'), drop: true }]
      .concat(ASH.map(function (a) {
        return { v: a.v, lo: a.lo, hi: a.hi, t: L('ashwagandha, meta-análise de ', 'ashwagandha, meta-analysis of ') + a.y, s: L(a.pt, a.en) };
      }));
    items.forEach(function (it, i) {
      var cy = top + rh * i + rh / 2, g = S('g', { class: 'c08-b2r', style: '--i:' + i }, b2sv);
      S('rect', { x: f1(U(0)), y: cy - 6, width: f1(U(it.v) - U(0)), height: 12, class: it.drop ? 'c08-dropb' : 'c08-ashb' }, g);
      if (it.lo != null) {
        S('line', { x1: f1(U(it.lo)), x2: f1(U(it.hi)), y1: cy, y2: cy, class: 'c08-ashci' }, g);
        [it.lo, it.hi].forEach(function (v) { S('line', { x1: f1(U(v)), x2: f1(U(v)), y1: cy - 4, y2: cy + 4, class: 'c08-ashci' }, g); });
      }
      var vend = Math.max(U(it.v), it.hi != null ? U(it.hi) : 0);
      txt(g, vend + 7, cy + 4, (it.drop ? '' : MINUS) + fmt(it.v, it.v === DROP ? 1 : 2), it.drop ? 'c08-vl c08-vi' : 'c08-vl c08-vb', 'start');
      if (!mob) {
        txt(g, lw - 4, cy - 1, it.t, 'c08-bl', 'end');
        txt(g, lw - 4, cy + 11, it.s, 'c08-bs', 'end');
      } else {
        E('li', null, b2leg, '<b>' + it.t + '</b>, ' + it.s);
        txt(g, U(0) + 4, cy + 4, String(i + 1), it.drop ? 'c08-inb' : 'c08-inb c08-inb2', 'start');
      }
    });
    if (!mob) txt(b2sv, x1 + 18, axisY + 13, 'µg/dL', 'c08-tick', 'start');
    b2sv.setAttribute('aria-label', L(
      'Queda do cortisol no sangue de manhã, em µg/dL. Queda normal do pico à meia-noite: cerca de 13,5. Ashwagandha: 1,16 (2025), 2,58 (2024) e 3,27 (2026).',
      'Fall in morning blood cortisol, in µg/dL. Normal fall from peak to midnight: about 13.5. Ashwagandha: 1.16 (2025), 2.58 (2024) and 3.27 (2026).'));
    b2l.setAttribute('data-mob', mob ? '1' : '0');
  }

  /* meditation in saliva: 21 studies and the 8 that trim-and-fill adds. Positions are
     illustrative; the counts and the two pooled values (0.18, -0.10) come from Koncz 2021. */
  var FUN = (function () {
    var R = rng(2021), pts = [];
    for (var i = 0; i < 21; i++) {
      var se = 0.1 + Math.pow(R(), 1.3) * 0.4;
      var e = 0.12 + (R() + R() + R() - 1.5) * se * 1.1;
      pts.push({ g: e, se: se });
    }
    /* small studies with low effects are missing: push the lower half of small studies up */
    pts.forEach(function (p) { if (p.se > 0.28 && p.g < 0.18) p.g = 0.36 + (0.36 - p.g) * 0.5; });
    var big = pts.slice().filter(function (p) { return p.se > 0.2; }).sort(function (a, b) { return b.g - a.g; }).slice(0, 8);
    var ghost = big.map(function (p) { return { g: 2 * -0.10 - (p.g - 0.18) * 0.9 + 0.16, se: p.se }; });
    return { pts: pts, ghost: ghost };
  })();
  function drawFun() {
    var W = Math.max(200, (funSv.parentNode.clientWidth || 300) - 2), H = 150, l = 8, r = 8, t = 18, b = 30;
    var g0 = -1.1, g1 = 1.3;
    function GX(g) { return l + (g - g0) / (g1 - g0) * (W - l - r); }
    function GY(se) { return t + se / 0.52 * (H - t - b); }
    funSv.innerHTML = '';
    funSv.setAttribute('viewBox', '0 0 ' + W + ' ' + H); funSv.setAttribute('width', W); funSv.setAttribute('height', H);
    S('path', { d: 'M' + f1(GX(0.18 - 1.96 * 0.52)) + ',' + f1(GY(0.52)) + ' L' + f1(GX(0.18)) + ',' + f1(GY(0)) + ' L' + f1(GX(0.18 + 1.96 * 0.52)) + ',' + f1(GY(0.52)), class: 'c08-funl' }, funSv);
    S('line', { x1: f1(GX(0)), x2: f1(GX(0)), y1: t - 6, y2: H - b, class: 'c08-zero' }, funSv);
    FUN.pts.forEach(function (p) { S('circle', { cx: f1(GX(p.g)), cy: f1(GY(p.se)), r: 3, class: 'c08-fp' }, funSv); });
    var gg = S('g', { class: 'c08-ghosts' }, funSv);
    FUN.ghost.forEach(function (p) { S('circle', { cx: f1(GX(p.g)), cy: f1(GY(p.se)), r: 3, class: 'c08-fg' }, gg); });
    function dia(g, cls, parent) {
      var x = GX(g), y = H - b + 9;
      S('path', { d: 'M' + f1(x) + ',' + (y - 5) + ' L' + f1(x + 5) + ',' + y + ' L' + f1(x) + ',' + (y + 5) + ' L' + f1(x - 5) + ',' + y + 'Z', class: cls }, parent);
    }
    dia(0.18, 'c08-dia', funSv); dia(-0.10, 'c08-dia2', gg);
    txt(funSv, GX(0.18) + 8, H - b + 13, 'g = ' + fmt(0.18, 2), 'c08-fl', 'start');
    txt(gg, GX(-0.10) - 8, H - b + 13, fmt(-0.10, 2).replace('-', MINUS), 'c08-fl c08-flg', 'end');
    txt(funSv, GX(0), t - 9, L('zero', 'zero'), 'c08-tick', 'middle');
    txt(funSv, W - r, H - 3, L('estudos menores embaixo', 'smaller studies lower'), 'c08-tick', 'end');
    funSv.setAttribute('aria-label', L(
      'Funil de 21 estudos de meditação com cortisol na saliva. O efeito médio é g = 0,18. A correção de viés acrescenta 8 estudos que faltam do lado esquerdo, e o efeito vira −0,10.',
      'Funnel of 21 meditation studies with salivary cortisol. The average effect is g = 0.18. The bias correction adds 8 missing studies on the left, and the effect becomes −0.10.'));
  }

  function table() {
    var h = '<table class="t"><thead><tr><th>' + L('o quê', 'what') + '</th><th>' + L('efeito', 'effect') + '</th><th>' + L('medida', 'measure') + '</th><th>' + L('evidência e fonte', 'evidence and source') + '</th></tr></thead><tbody>';
    ROWS.forEach(function (r) {
      var e = r.ic === 'banca' ? '+100% a +300%'.replace('a', L('a', 'to'))
        : r.ctrl != null ? pct(r.v) + L(' (antes e depois); perto de zero contra controle', ' (before/after); near zero against control')
        : pct(r.v) + (r.lo != null ? ' (' + pct(r.lo) + L(' a ', ' to ') + pct(r.hi) + ')' : '');
      h += '<tr><td>' + L(r.pt, r.en) + '</td><td>' + e + '</td><td>' + L(r.mpt, r.men) + '</td><td>' + L(r.ept, r.een) + '. ' + r.src + '</td></tr>';
    });
    h += '<tr><td>' + L('Queda normal do dia', 'Normal daily fall') + '</td><td>' + MINUS + fmt(13.5, 1) + ' µg/dL</td><td>' + L('sangue, do pico à meia-noite', 'blood, peak to midnight') + '</td><td>Debono et al., 2009</td></tr>';
    ASH.forEach(function (a) {
      h += '<tr><td>Ashwagandha (' + a.y + ')</td><td>' + MINUS + fmt(a.v, 2) + ' µg/dL' + (a.lo != null ? ' (' + MINUS + fmt(a.lo, 2) + L(' a ', ' to ') + MINUS + fmt(a.hi, 2) + ')' : '') + '</td><td>' + L('sangue, de manhã', 'blood, morning') + '</td><td>' + L('meta-análise, ', 'meta-analysis, ') + L(a.pt, a.en) + '</td></tr>';
    });
    h += '<tr><td>' + L('Meditação, saliva', 'Meditation, saliva') + '</td><td>g = ' + fmt(0.18, 2) + L('; corrigido: ', '; corrected: ') + MINUS + fmt(0.10, 2) + '</td><td>' + L('saliva', 'saliva') + '</td><td>' + L('21 estudos, 1.163 pessoas. Koncz et al., 2021', '21 studies, 1,163 people. Koncz et al., 2021') + '</td></tr>';
    h += '<tr><td>' + L('Cortisol cocktail', 'Cortisol cocktail') + '</td><td>' + L('nenhum estudo', 'no study') + '</td><td>' + L('sem medida', 'no measure') + '</td><td>' + L('sem fonte', 'no source') + '</td></tr>';
    h += '<tr><td>' + L('Magnésio', 'Magnesium') + '</td><td>' + L('sem número', 'no number') + '</td><td>' + L('nenhuma revisão com cortisol como desfecho principal', 'no review with cortisol as the main outcome') + '</td><td>Boyle et al., 2017</td></tr>';
    tblW.innerHTML = h + '</tbody></table>';
  }

  function text() {
    h1.innerHTML = '<span class="c08-bn">1</span><span>' + L('Em porcentagem de mudança no cortisol', 'In percent change in cortisol') + '</span>';
    h2.innerHTML = '<span class="c08-bn">2</span><span>' + L('Ashwagandha, em <span class="c08-u">µg/dL</span> de queda no sangue de manhã', 'Ashwagandha, in <span class="c08-u">µg/dL</span> of fall in morning blood') + '</span>';
    h3.innerHTML = '<span class="c08-bn">3</span><span>' + L('Sem número comparável', 'No comparable number') + '</span>';
    headL.textContent = L('o que foi medido', 'what was measured');
    headE.textContent = L('evidência', 'evidence');
    rows.forEach(function (o) {
      var r = o.r;
      o.t.textContent = L(r.pt, r.en); o.m.textContent = L(r.mpt, r.men);
      o.ev.innerHTML = L(r.ept, r.een) + '<span class="c08-src">' + r.src + '</span>';
      var e = r.ic === 'banca' ? L('de +100% a +300%', 'from +100% to +300%') : r.ctrl != null ? L('−31% antes e depois, perto de zero contra controle', '−31% before and after, near zero against control') : pct(r.v);
      o.sv.setAttribute('aria-label', L(r.pt, r.en) + ': ' + e + '. ' + L(r.mpt, r.men) + '.');
    });
    seal1.innerHTML = '<b>' + L('A planta é proibida no Brasil como suplemento desde 2022.', 'The plant has been banned in Brazil as a supplement since 2022.') + '</b> ' +
      L('Em 21 de outubro de 2026, a Anvisa reforçou que fabricação, venda, distribuição e uso são proibidos no país.', 'On 21 October 2026, Anvisa, the Brazilian health regulator, restated that making, selling, distributing and using it are banned in the country.');
    seal2.innerHTML = '<b>' + L('Ela causa, em casos raros, lesão no fígado.', 'In rare cases, it injures the liver.') + '</b> ' +
      L('Cinco casos foram descritos em 2020, e revisões de 2026 reúnem de 26 a 37, alguns com transplante. A Dinamarca proibiu a planta em suplementos em 2023.', 'Five cases were described in 2020, and reviews from 2026 gather 26 to 37, some with a transplant. Denmark banned the plant in supplements in 2023.');
    b2n.textContent = L('A queda atribuída à planta vai de um doze avos a um quarto da queda que o corpo faz sozinho todo dia. Uma meta-análise de 2026 com 23 ensaios achou um efeito padronizado de −1,18, grande demais para ensaios tão pequenos.',
      'The fall attributed to the plant is between one twelfth and one quarter of the fall the body makes on its own every day. A 2026 meta-analysis of 23 trials found a standardized effect of −1.18, too large for trials this small.');
    cc.t.textContent = L('Cortisol cocktail', 'Cortisol cocktail');
    cc.p.innerHTML = '<b>' + L('Nenhum estudo testou a bebida.', 'No study has tested the drink.') + '</b> ' + L('Ela leva suco de laranja, água de coco e sal, e um copo tem cerca de 16 g de açúcar, um terço do limite do dia.', 'It is made of orange juice, coconut water and salt, and a glass has about 16 g of sugar, a third of the daily limit.');
    cm.t.textContent = L('Magnésio', 'Magnesium');
    cm.p.innerHTML = '<b>' + L('Nenhuma revisão', 'No review') + '</b> ' + L('teve o cortisol como desfecho principal.', 'had cortisol as its main outcome.');
    cq.t.textContent = L('Meditação, na saliva', 'Meditation, in saliva');
    cq.p.innerHTML = '<b>g = ' + fmt(0.18, 2) + L('; depois da correção de viés, ', '; after correcting for bias, ') + MINUS + fmt(0.10, 2) + '.</b> ' + L('21 estudos, 1.163 pessoas.', '21 studies, 1,163 people.');
    funN.textContent = L('Os pontos cheios são os 21 estudos, e os vazados são os 8 que a correção supõe faltar; as posições são ilustrativas.', 'The filled dots are the 21 studies, and the hollow ones are the 8 the correction assumes are missing; the positions are illustrative.');
    take.textContent = L('O maior efeito para baixar o cortisol com número comparável fica abaixo da subida de uma manhã comum, e treino forte, luz cedo e uma prova sobem o cortisol mais do que qualquer truque o baixa.',
      'The largest cortisol-lowering effect with a comparable number stays below the rise of an ordinary morning, and hard exercise, early light and an exam raise cortisol more than any trick lowers it.');
    sum.textContent = L('Tabela com todas as linhas, unidade e fonte', 'Table with every row, unit and source');
    table();
  }

  function layout() {
    var W = wrap.clientWidth || 700;
    G.mob = W < 640;
    wrap.classList.toggle('c08-mob', G.mob);
    root.classList.toggle('c08-m', G.mob);
    var tw0 = rows[0].sv.parentNode.clientWidth;
    G.tw = Math.max(200, tw0 || 400);
    G.pad = G.mob ? 18 : 22;
    text();
    ticks(headSv, true); ticks(footSv, false);
    rows.forEach(drawRow);
    drawB2(); drawFun();
  }

  /* entrance: the waking band first, then rows top to bottom, then the ghost studies */
  if (!DN.RM) {
    root.classList.add('c08-anim');
    DN.onVisible(wrap, function (v) { if (v) root.classList.add('c08-in'); }, { once: true, threshold: 0.15 });
    DN.onVisible(b3, function (v) { if (v) b3.classList.add('c08-in3'); }, { once: true, threshold: 0.15 });
  }
  var rt, lastW = 0;
  function onResize() { clearTimeout(rt); rt = setTimeout(function () { if (root.clientWidth !== lastW) { lastW = root.clientWidth; layout(); } }, 120); }
  if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(root); else window.addEventListener('resize', onResize);
  DN.onLang(layout);
  layout();
  /* the track width depends on the grid; settle once fonts and grid are in */
  requestAnimationFrame(function () { var w = rows[0].sv.parentNode.clientWidth; if (w && Math.abs(w - G.tw) > 1) layout(); });
})();
