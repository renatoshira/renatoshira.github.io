/* w07c · o-termostato : the D2 occupancy window (Kapur 2000), as a static annotated
   infographic: a risograph body showing what turns on, and the occupancy bands. */
(function () {
  'use strict';
  var root = DN.body('w07c'); if (!root) return;
  var L = DN.L, C = DN.COL;
  var T1 = 65, T2 = 72, T3 = 78;

  /* ---------- DOM ---------- */
  var grid = DN.el('div', { class: 'w07c-grid' }, root);
  var bodyBox = DN.el('div', { class: 'w07c-body' }, grid);
  var right = DN.el('div', { class: 'w07c-right' }, grid);
  var hd = DN.el('div', { class: 'w07c-read' }, right);
  var big = DN.el('div', { class: 'w07c-big' }, hd);
  var bigL = DN.el('div', { class: 'w07c-bigl' }, hd);
  var chartBox = DN.el('div', { class: 'w07c-chart' }, right);
  var take = DN.el('p', { class: 'w07c-take' }, root);
  var note = DN.el('div', { class: 'w07c-note' }, root);

  /* ---------- body (risograph print, technique from w00) ----------
     Two spot inks, each its own layer: halftone screens at riso angles, a grain
     filter that eats into the ink, a slight misregistration, multiply overlap.
     Tokens: $0 solid ink, $1 $2 $3 light, mid, dark halftone. */
  var bs = DN.svg('svg', { viewBox: '0 0 290 280', role: 'img', class: 'w07c-bsvg' }, bodyBox);
  function rng(sd) {
    var a = sd >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function f1(n) { return Math.round(n * 10) / 10; }
  var INKS = [{ k: 'a', col: C.dopa, ang: 15, op: 0.95 }, { k: 'b', col: C.pausa, ang: 75, op: 0.93 }];
  var RZ = (function () {
    var R = rng(4021), defs = '', m = {};
    INKS.forEach(function (ink, li) {
      var p = 'w07c-r-' + ink.k;
      [0.62, 0.92, 1.2].forEach(function (r, j) {
        defs += '<pattern id="' + p + 'h' + (j + 1) + '" width="2.8" height="2.8" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.4" cy="1.4" r="' + r + '" fill="' + ink.col + '"/></pattern>';
      });
      defs += '<filter id="' + p + 'g" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.6" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
      m[ink.k] = { p: p, mx: f1((li ? -1 : 1) * (0.6 + R() * 0.8)), my: f1((li ? 1 : -1) * (0.5 + R() * 0.7)) };
    });
    m.defs = defs;
    return m;
  })();
  function inks(art) {
    return INKS.map(function (ink) {
      var r = RZ[ink.k];
      var body = art[ink.k].replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#' + r.p + 'h$1)');
      return '<g class="w07c-ink w07c-ink-' + ink.k + '" transform="translate(' + r.mx + ' ' + r.my + ')" opacity="' + ink.op + '" filter="url(#' + r.p + 'g)">' + body + '</g>';
    }).join('');
  }
  var BODY = {
    a: '<circle cx="70" cy="36" r="21" fill="$2"/>' +
      '<rect x="63" y="54" width="14" height="14" fill="$2"/>' +
      '<path d="M34 82 C40 70 56 66 70 66 C84 66 100 70 106 82 L100 150 C98 164 96 174 96 180 L44 180 C44 174 42 164 40 150 Z" fill="$1"/>' +
      '<circle cx="22" cy="187" r="6.5" fill="$2"/>' +
      '<circle cx="56" cy="44" r="3.2" fill="$0"/><circle cx="84" cy="44" r="3.2" fill="$0"/>',
    b: '<path d="M49 34 C47 16 60 10 72 11 C86 12 94 22 91 36 C86 26 74 21 60 26 C55 28 51 31 49 34 Z" fill="$0"/>' +
      '<circle cx="63" cy="38" r="1.9" fill="$0"/><circle cx="77" cy="38" r="1.9" fill="$0"/>' +
      '<path d="M65 47 Q70 50 75 47" stroke="$0" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
      '<path d="M34 82 C40 70 56 66 70 66 C84 66 100 70 106 82 L100 150 C98 164 96 174 96 180 L44 180 C44 174 42 164 40 150 Z" fill="none" stroke="$0" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<path d="M54 108 C57 115 63 115 66 108 M74 108 C77 115 83 115 86 108" stroke="$0" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
      '<path d="M34 82 C26 100 22 124 20 146 L16 182 L28 182 L32 146 C34 124 36 104 40 86 Z" fill="$2"/>' +
      '<path d="M44 180 L96 180 L92 266 L76 266 L71 194 L69 194 L64 266 L48 266 Z" fill="$2"/>' +
      '<path d="M44 181 H96" stroke="$0" stroke-width="3"/>' +
      '<ellipse cx="55" cy="269" rx="10" ry="4" fill="$0"/><ellipse cx="85" cy="269" rx="10" ry="4" fill="$0"/>'
  };
  var ARM = {
    a: '<circle cx="118" cy="187" r="6.5" fill="$2"/>',
    b: '<path d="M106 82 C114 100 118 124 120 146 L124 182 L112 182 L108 146 C106 124 104 104 100 86 Z" fill="$2"/>'
  };
  var bg = DN.svg('g', { class: 'w07c-riso' }, bs);
  bg.innerHTML = '<defs>' + RZ.defs + '</defs>' + inks(BODY) + '<g class="w07c-arm">' + inks(ARM) + '</g>';
  var armG = bg.querySelector('.w07c-arm');

  var IND = [
    { key: 'head', x: 70, y: 32, r: 11, ly: 34, th: T1, col: C.dopa, pt: ['cabeça', 'psicose melhora'], en: ['head', 'psychosis improves'] },
    { key: 'chest', x: 80, y: 112, r: 8, ly: 112, th: T2, col: C.pausa, pt: ['mama', 'prolactina alta'], en: ['breast', 'high prolactin'] },
    { key: 'arm', x: 116, y: 160, r: 9, ly: 170, th: T3, col: C.pausa, pt: ['braço', 'rigidez e tremor'], en: ['arm', 'rigidity, tremor'] }
  ];
  IND.forEach(function (d) {
    d.lead = DN.svg('path', { d: 'M' + (d.x + d.r + 2) + ' ' + d.y + ' L150 ' + d.ly + ' L156 ' + d.ly, fill: 'none', stroke: C.mid, 'stroke-width': 0.8 }, bs);
    d.ring = DN.svg('circle', { cx: d.x, cy: d.y, r: d.r, class: 'w07c-ind', fill: d.col, 'fill-opacity': 0, stroke: C.mid, 'stroke-width': 1, 'stroke-dasharray': '2 2' }, bs);
    d.t1 = DN.svg('text', { x: 160, y: d.ly - 2, 'font-size': 12, 'font-weight': 700, fill: C.ink }, bs);
    d.t2 = DN.svg('text', { x: 160, y: d.ly + 13, 'font-size': 11, fill: C.dim }, bs);
    d.t3 = DN.svg('text', { x: 160, y: d.ly + 27, 'font-size': 10, fill: C.mid }, bs);
  });

  /* every indicator is shown on: the drawing labels what each band turns on */
  IND.forEach(function (d) {
    d.ring.setAttribute('fill-opacity', 0.3);
    d.ring.setAttribute('stroke', d.col); d.ring.setAttribute('stroke-width', 2.2);
    d.ring.removeAttribute('stroke-dasharray');
  });

  /* ---------- the bands: what turns on as more D2 receptors are occupied ---------- */
  var cg = {};
  function buildChart() {
    chartBox.innerHTML = '';
    var W = Math.max(260, chartBox.clientWidth || 380), mob = W < 360;
    var m = { l: 4, r: 10, t: 40 }, rowH = 44, H = m.t + rowH * 3 + 40;
    var s = DN.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img' }, chartBox);
    var sx = function (v) { return m.l + v / 100 * (W - m.l - m.r); };
    var yb = m.t + rowH * 3 + 4;
    /* the useful window, shaded across all rows */
    DN.svg('rect', { x: sx(T1), y: m.t - 14, width: sx(T3) - sx(T1), height: yb - m.t + 14, fill: C.dopaSoft }, s);
    DN.svg('path', { d: 'M' + sx(T1) + ' ' + (m.t - 10) + 'V' + (m.t - 16) + 'H' + sx(T3) + 'V' + (m.t - 10), fill: 'none', stroke: C.dopa, 'stroke-width': 1.4 }, s);
    cg.win = DN.svg('text', { x: (sx(T1) + sx(T3)) / 2, y: m.t - 22, 'text-anchor': 'middle', 'font-size': 10.5, 'font-weight': 700, fill: C.ink }, s);
    cg.rows = [];
    [[T1, C.dopa, 1], [T2, C.pausa, 0.55], [T3, C.pausa, 0.95]].forEach(function (r, i) {
      var y = m.t + rowH * i + 26;
      DN.svg('line', { x1: sx(0), x2: sx(r[0]), y1: y, y2: y, stroke: C.line, 'stroke-width': 2 }, s);
      DN.svg('rect', { x: sx(r[0]), y: y - 6, width: sx(100) - sx(r[0]), height: 12, fill: r[1], opacity: r[2] }, s);
      var t = DN.svg('text', { x: sx(0), y: y - 12, 'font-size': 11, fill: C.ink }, s);
      cg.rows.push(t);
    });
    DN.svg('line', { x1: sx(0), x2: sx(100), y1: yb, y2: yb, stroke: C.ink }, s);
    [0, 25, 50, 100, T1, T2, T3].forEach(function (v) {
      var th = v === T1 || v === T2 || v === T3;
      DN.svg('line', { x1: sx(v), x2: sx(v), y1: yb, y2: yb + 4, stroke: C.ink }, s);
      var dx = v === T1 ? -2 : v === T3 ? 2 : 0;
      DN.svg('text', { x: sx(v) + dx, y: yb + 15, 'text-anchor': v === 0 ? 'start' : v === 100 ? 'end' : v === T1 ? 'end' : v === T3 ? 'start' : 'middle', 'font-size': th ? 10 : 9.5, 'font-weight': th ? 700 : 400, fill: th ? C.ink : C.dim }, s).textContent = v === T2 ? (mob ? '' : v) : v + '%';
    });
    cg.xl = DN.svg('text', { x: sx(0), y: yb + 32, 'font-size': 10, fill: C.dim }, s);
    cg.s = s;
    labelChart();
  }
  function labelChart() {
    if (!cg.s) return;
    cg.win.textContent = L('janela útil', 'useful window');
    var names = [L('a psicose melhora (acima de 65%)', 'psychosis improves (above 65%)'), L('a prolactina sobe (acima de 72%)', 'prolactin rises (above 72%)'), L('rigidez e tremor (acima de 78%)', 'rigidity and tremor (above 78%)')];
    cg.rows.forEach(function (t, i) { t.textContent = names[i]; });
    cg.xl.textContent = L('receptores D2 ocupados', 'D2 receptors occupied');
    cg.s.setAttribute('aria-label', L('Faixas de ocupação dos receptores D2: a psicose melhora acima de 65%, a prolactina sobe acima de 72%, rigidez e tremor aparecem acima de 78%. A janela útil vai de 65% a 78%.',
      'D2 occupancy bands: psychosis improves above 65%, prolactin rises above 72%, rigidity and tremor appear above 78%. The useful window runs from 65% to 78%.'));
  }

  function relabel() {
    IND.forEach(function (d) {
      var a = L(d.pt, d.en);
      d.t1.textContent = a[0]; d.t2.textContent = a[1];
      d.t3.textContent = L('acima de ', 'above ') + d.th + '%';
    });
    big.textContent = L('65 a 78%', '65 to 78%');
    bigL.textContent = L('dos receptores D2 ocupados: a janela em que o remédio ajuda sem cobrar caro', 'of D2 receptors occupied: the window where the drug helps without a heavy cost');
    bs.setAttribute('aria-label', L('Corpo esquemático. A cabeça marca a melhora da psicose acima de 65%, a mama marca a prolactina alta acima de 72% e o braço marca rigidez e tremor acima de 78%.',
      'Schematic body. The head marks psychosis improving above 65%, the breast marks high prolactin above 72% and the arm marks rigidity and tremor above 78%.'));
    take.textContent = L('A dose útil fica numa faixa estreita, entre 65% e 78% dos receptores D2 ocupados. Abaixo dela, a psicose não melhora. Acima, a prolactina sobe e vêm rigidez e tremor.',
      'The useful dose sits in a narrow band, between 65% and 78% of D2 receptors occupied. Below it, psychosis does not improve. Above it, prolactin rises, then rigidity and tremor.');
    note.innerHTML = L('<b>Domperidona.</b> Bloqueia o mesmo receptor e trata a náusea, porque age numa área do tronco cerebral que fica fora da barreira do cérebro. Ela quase não entra no cérebro, e por isso causa pouca rigidez.',
      '<b>Domperidone.</b> It blocks the same receptor and treats nausea, because it acts on a brainstem area that sits outside the brain’s barrier. It barely enters the brain, so it causes little rigidity.');
    labelChart();
  }

  buildChart(); relabel();
  DN.onLang(relabel);
  var rt, lw = root.clientWidth;
  window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(function () { if (root.clientWidth !== lw) { lw = root.clientWidth; buildChart(); } }, 150);
  });
})();
