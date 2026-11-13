/* c02b · a-primeira-hora : the cortisol awakening response, a zoom on the first hour after waking */
(function () {
  'use strict';
  var root = DN.body('c02b'); if (!root) return;
  var L = DN.L, C = DN.COL;

  /* ---------- 24 h curve for the overview (same construction as c02a, Debono et al. 2009) ---------- */
  var T_PEAK = 2 + 32 / 60, T_NADIR = 18 + 18 / 60, T_Q0 = 13 + 43 / 60, T_Q1 = 23 + 31 / 60;
  function pchip(xs, ys) {
    var n = xs.length, h = [], d = [], m = [], i;
    for (i = 0; i < n - 1; i++) { h[i] = xs[i + 1] - xs[i]; d[i] = (ys[i + 1] - ys[i]) / h[i]; }
    for (i = 1; i < n - 1; i++) {
      if (d[i - 1] * d[i] <= 0) m[i] = 0;
      else { var w1 = 2 * h[i] + h[i - 1], w2 = h[i] + 2 * h[i - 1]; m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]); }
    }
    m[0] = m[n - 1] = (d[0] + d[n - 2]) / 2;
    return function (x) {
      var k = 0; while (k < n - 2 && x > xs[k + 1]) k++;
      var t = (x - xs[k]) / h[k], t2 = t * t, t3 = t2 * t;
      return (2 * t3 - 3 * t2 + 1) * ys[k] + (t3 - 2 * t2 + t) * h[k] * m[k] + (-2 * t3 + 3 * t2) * ys[k + 1] + (t3 - t2) * h[k] * m[k + 1];
    };
  }
  var M = 8, day;
  for (var it = 0; it < 30; it++) {
    var v6 = M + (15.5 - M) * 0.22;
    day = pchip([0, T_PEAK, 6, 10, T_Q0, T_NADIR, 20.5, T_Q1, 24], [v6, 15.5, 12.0, 9.6, M, 1.8, 2.15, M, v6]);
    var s = 0; for (var q = 0; q < 960; q++) s += day(q / 40); M = s / 960;
  }
  if (DN.cortCurve && DN.cortCurve.base) day = function (t) { return DN.cortCurve.base(6 + t); };

  /* ---------- the first hour (% of the value at waking) ----------
     Clow et al. 2004: +50% to +160% in the first 30 min. Wüst et al. 2000: mean ~+50%, ~75% of people
     show the rise on a given morning. Stalder et al. 2016: the rise lasts 30 to 45 min.
     After 30 min the mean line is illustrative (marked so). */
  var MEAN = pchip([0, 10, 20, 30, 38, 45, 60], [100, 119, 137, 150, 147, 140, 124]);
  var BAND_HI = pchip([0, 10, 20, 30, 45], [100, 160, 220, 260, 252]);
  var BAND_LO = pchip([0, 30, 45], [100, 150, 146]);
  var MINI = [
    { k: 'a', f: pchip([0, 15, 32, 45, 60], [100, 128, 156, 150, 134]) },
    { k: 'b', f: pchip([0, 15, 35, 45, 60], [100, 150, 196, 188, 166]) },
    { k: 'c', f: pchip([0, 15, 30, 42, 60], [100, 170, 238, 230, 198]) },
    { k: 'flat', f: pchip([0, 20, 40, 60], [100, 103, 99, 97]), flat: true }
  ];
  var Y0 = 90, Y1 = 270;

  /* ---------- risograph: an arm out of the blanket switching off the alarm clock ---------- */
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
  function riso() {
    var R = rng(730);
    var art = {
      a: /* bells, hammer, ringing marks, arm and hand */
        '<circle cx="18" cy="40" r="6" fill="$0"/><circle cx="42" cy="40" r="6" fill="$0"/>' +
        '<path d="M8,30 l-4,-4 M10,24 l-2,-6 M50,30 l4,-4 M48,24 l2,-6" stroke="$0" stroke-width="1.8" stroke-linecap="round"/>' +
        '<path d="M98,63 C86,52 70,40 52,34" stroke="$2" stroke-width="10" stroke-linecap="round" fill="none"/>' +
        '<path d="M98,63 C86,52 70,40 52,34" stroke="$0" stroke-width="1" fill="none" transform="translate(0 -5)"/>' +
        '<path d="M98,63 C86,52 70,40 52,34" stroke="$0" stroke-width="1" fill="none" transform="translate(1 5)"/>' +
        '<path d="M54,26 C46,24 37,26 33,31 C31,35 35,37 40,37 C46,38 52,40 56,39 Z" fill="$2"/>' +
        '<path d="M54,26 C46,24 37,26 33,31 C31,35 35,37 40,37 C46,38 52,40 56,39" stroke="$0" stroke-width="1" fill="none"/>' +
        '<path d="M41,30 h-6 M42,33 h-7" stroke="$0" stroke-width=".8"/>',
      b: /* clock body, face, hands, legs, blanket, pillow and hair */
        '<circle cx="30" cy="57" r="15" fill="$0"/><circle cx="30" cy="57" r="11" fill="#fff" class="pp"/>' +
        '<path d="M30,49 v8 l5,3" stroke="$0" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
        '<rect x="28" y="38" width="4" height="5" fill="$0"/>' +
        '<path d="M20,70 l-4,6 M40,70 l4,6" stroke="$0" stroke-width="2.4" stroke-linecap="round"/>' +
        '<ellipse cx="124" cy="56" rx="18" ry="8" fill="$1"/>' +
        '<path d="M108,57 C110,46 122,44 130,50 C126,52 118,54 108,57Z" fill="$3"/>' +
        '<path d="M60,90 C60,76 74,66 92,62 C108,58 122,62 140,60 L140,90 Z" fill="$2"/>' +
        '<path d="M60,90 C60,76 74,66 92,62 C108,58 122,62 140,60" stroke="$0" stroke-width="1.6" fill="none"/>' +
        '<path d="M84,88 C88,80 94,74 104,70 M110,88 C114,80 120,74 132,70" stroke="$0" stroke-width="1" fill="none"/>' +
        '<path d="M2,82 H58" stroke="$0" stroke-width="1.4"/>'
    };
    var defs = '', layers = '';
    [{ k: 'a', col: C.alta, ang: 15 }, { k: 'b', col: C.baixa, ang: 75 }].forEach(function (ink, li) {
      var p = 'c02br-' + ink.k;
      [0.5, 0.82, 1.12].forEach(function (r, j) {
        defs += '<pattern id="' + p + 'h' + (j + 1) + '" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.3" cy="1.3" r="' + r + '" fill="' + ink.col + '"/></pattern>';
      });
      defs += '<filter id="' + p + 'g" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.4" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.6" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
      var mx = f1((R() < 0.5 ? -1 : 1) * (0.5 + R() * (li ? 1.2 : 0.6))), my = f1((R() < 0.5 ? -1 : 1) * (0.4 + R() * (li ? 1 : 0.5)));
      var body = art[ink.k].replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#' + p + 'h$1)');
      for (var s2 = 0; s2 < 4; s2++) body += '<circle cx="' + f1(6 + R() * 128) + '" cy="' + f1(6 + R() * 80) + '" r="' + f1(0.3 + R() * 0.5) + '" fill="' + ink.col + '"/>';
      layers += '<g class="c02b-ink c02b-ink-' + ink.k + '" transform="translate(' + mx + ' ' + my + ')" opacity=".94" filter="url(#' + p + 'g)">' + body + '</g>';
    });
    return '<svg viewBox="0 0 140 90" focusable="false" aria-hidden="true"><defs>' + defs + '</defs>' + layers + '</svg>';
  }

  /* ---------- skeleton ---------- */
  root.innerHTML = '';
  var take = DN.el('p', { class: 'c02b-read' }, root);
  var top = DN.el('div', { class: 'c02b-top' }, root);
  DN.el('div', { class: 'c02b-art' }, top, riso());
  var ovW = DN.el('div', { class: 'c02b-ov' }, top);
  var zoomW = DN.el('div', { class: 'c02b-zoom' }, root);
  var miniH = DN.el('div', { class: 'c02b-mh' }, root);
  var miniW = DN.el('div', { class: 'c02b-minis' }, root);
  var srTxt = DN.el('p', { class: 'sr' }, root);
  var over = DN.svg('svg', { class: 'c02b-over', 'aria-hidden': 'true' }, root);

  function t(parent, x, y, str, cls, anchor) {
    var e = DN.svg('text', { x: x, y: y, class: cls, 'text-anchor': anchor || 'start' }, parent);
    e.textContent = str; return e;
  }
  function tl(parent, x, y, lines, cls, anchor, lh) {
    var e = DN.svg('text', { x: x, y: y, class: cls, 'text-anchor': anchor || 'start' }, parent);
    lines.forEach(function (ln, j) { var ts = DN.svg('tspan', { x: x, dy: j ? (lh || 13) : 0 }, e); ts.textContent = ln; if (!j) ts.setAttribute('class', 'c02b-lb'); });
    return e;
  }
  var LENS = [1, 2]; /* lens on the overview: hours after 06:00 (illustrative position) */

  function build() {
    var W = Math.max(280, Math.floor(root.clientWidth || 600));
    var narrow = W < 520;
    root.classList.toggle('c02b-narrow', narrow);
    take.textContent = L('O cortisol sobe de 50% a 160% na primeira meia hora depois de acordar e começa a descer em seguida, mas cerca de uma em cada quatro pessoas não mostra essa subida numa manhã qualquer.',
      'Cortisol rises 50% to 160% in the first half hour after waking and starts to fall soon after, but about one in four people show no such rise on any given morning.');

    /* ---- overview ---- */
    ovW.innerHTML = '';
    var OW = Math.floor(ovW.clientWidth || (W - 150)), OH = narrow ? 92 : 104;
    var om = { t: 18, r: 4, b: 18, l: 4 };
    var ox = function (h) { return om.l + h / 24 * (OW - om.l - om.r); };
    var oy = function (v) { return om.t + (OH - om.t - om.b) * (1 - v / 17); };
    var os = DN.svg('svg', { viewBox: '0 0 ' + OW + ' ' + OH, width: OW, height: OH, role: 'img', class: 'c02b-osvg' }, ovW);
    os.setAttribute('aria-label', L('O dia inteiro, das 6h às 6h, com uma lupa sobre a primeira hora depois de acordar.', 'The whole day, 6 am to 6 am, with a magnifier over the first hour after waking.'));
    t(os, om.l, 11, L('o dia inteiro, no sangue', 'the whole day, in blood'), 'c02b-ot');
    DN.svg('line', { x1: ox(0), x2: ox(24), y1: oy(0), y2: oy(0), class: 'c02b-base' }, os);
    [0, 6, 12, 18, 24].forEach(function (h) {
      DN.svg('line', { x1: ox(h), x2: ox(h), y1: oy(0), y2: oy(0) + 3, class: 'c02b-base' }, os);
      t(os, ox(h), oy(0) + 13, ['06h', '12h', '18h', '00h', '06h'][h / 6], 'c02b-tick', h === 0 ? 'start' : h === 24 ? 'end' : 'middle');
    });
    var d = ''; for (var i = 0; i <= 240; i++) d += (i ? 'L' : 'M') + ox(i / 10).toFixed(1) + ',' + oy(day(i / 10)).toFixed(1);
    DN.svg('path', { d: d, class: 'c02b-oline' }, os);
    var lx0 = ox(LENS[0]), lx1 = ox(LENS[1]), ly0 = oy(16.6), ly1 = oy(0);
    DN.svg('rect', { x: lx0, y: ly0, width: lx1 - lx0, height: ly1 - ly0, class: 'c02b-lens' }, os);
    t(os, lx1 + 6, oy(2.2), narrow ? L('1ª hora', '1st hour') : L('1ª hora depois de acordar', '1st hour after waking'), 'c02b-lensT');

    /* ---- zoom ---- */
    zoomW.innerHTML = '';
    var ZH = narrow ? 300 : 330;
    var m = { t: 34, r: narrow ? 8 : 150, b: 34, l: narrow ? 40 : 46 };
    var iw = W - m.l - m.r, ih = ZH - m.t - m.b;
    var x = function (mn) { return m.l + mn / 60 * iw; };
    var y = function (v) { return m.t + ih * (1 - (v - Y0) / (Y1 - Y0)); };
    var zs = DN.svg('svg', { viewBox: '0 0 ' + W + ' ' + ZH, width: W, height: ZH, role: 'img', class: 'c02b-zsvg' }, zoomW);
    zs.setAttribute('aria-label', L('Os primeiros 60 minutos depois de acordar, em que o cortisol da saliva sobe de 50% a 160% em 30 minutos, com média de cerca de 50% e pico entre 30 e 45 minutos.',
      'The first 60 minutes after waking, in which saliva cortisol rises 50% to 160% in 30 minutes, with a mean of about 50% and a peak between 30 and 45 minutes.'));
    /* connector from the lens: drawn as two lines from the top edge */
    var lensEl = os.querySelector('.c02b-lens');
    var g = DN.svg('g', null, zs);
    [100, 150, 200, 250].forEach(function (v) {
      DN.svg('line', { x1: m.l, x2: m.l + iw, y1: y(v), y2: y(v), class: v === 100 ? 'c02b-ref' : 'c02b-gl' }, g);
      t(g, m.l - 6, y(v) + 3.5, v + '%', 'c02b-tick', 'end');
    });
    DN.svg('line', { x1: m.l, x2: m.l + iw, y1: y(Y0), y2: y(Y0), class: 'c02b-base' }, g);
    [0, 15, 30, 45, 60].forEach(function (mn) {
      DN.svg('line', { x1: x(mn), x2: x(mn), y1: y(Y0), y2: y(Y0) + 4, class: 'c02b-base' }, g);
      t(g, x(mn), y(Y0) + 16, mn + ' min', 'c02b-tick', mn === 0 ? 'start' : mn === 60 ? 'end' : 'middle');
    });
    t(g, m.l + iw, y(Y0) + 30, L('minutos depois de acordar', 'minutes after waking'), 'c02b-tick c02b-axl', 'end');
    t(g, m.l + 8, m.t + 14, L('% do valor ao acordar', '% of the waking value'), 'c02b-tick c02b-axl', 'start');
    /* peak window 30 to 45 */
    DN.svg('rect', { x: x(30), y: m.t, width: x(45) - x(30), height: ih, class: 'c02b-pk' }, g);
    var pb = DN.svg('g', { class: 'c02b-pkb' }, g);
    DN.svg('path', { d: 'M' + x(30) + ',' + (m.t + 6) + ' v-5 H' + x(45) + ' v5', class: 'c02b-brk' }, pb);
    t(pb, (x(30) + x(45)) / 2, m.t - 5, L('pico: 30 a 45 min', 'peak: 30 to 45 min'), 'c02b-pkt', 'middle');
    /* band (Clow 2004) */
    var up = '', lo = '';
    for (var k = 0; k <= 45; k++) { up += (k ? 'L' : 'M') + x(k).toFixed(1) + ',' + y(BAND_HI(k)).toFixed(1); }
    for (k = 45; k >= 0; k--) { lo += 'L' + x(k).toFixed(1) + ',' + y(BAND_LO(k)).toFixed(1); }
    DN.svg('path', { d: up + lo + 'Z', class: 'c02b-band' }, g);
    /* mean line (Wüst 2000): solid to 30 min, illustrative afterwards */
    var d1 = '', d2 = '';
    for (k = 0; k <= 30; k++) d1 += (k ? 'L' : 'M') + x(k).toFixed(1) + ',' + y(MEAN(k)).toFixed(1);
    for (k = 30; k <= 60; k++) d2 += (k > 30 ? 'L' : 'M') + x(k).toFixed(1) + ',' + y(MEAN(k)).toFixed(1);
    DN.svg('path', { d: d1, class: 'c02b-mean' }, g);
    DN.svg('path', { d: d2, class: 'c02b-mean c02b-ill' }, g);
    /* sample marker: planned at 30, collected at 45 */
    var gs = DN.svg('g', { class: 'c02b-smp' }, g);
    DN.svg('line', { x1: x(45), x2: x(45), y1: y(Y0), y2: y(MEAN(45)) + 4, class: 'c02b-smpl' }, gs);
    DN.svg('circle', { cx: x(30), cy: y(MEAN(30)), r: 4, class: 'c02b-dot' }, gs);
    DN.svg('circle', { cx: x(45), cy: y(MEAN(45)), r: 4, class: 'c02b-dot c02b-dot2' }, gs);
    /* labels */
    var lab = DN.svg('g', { class: 'c02b-labs' }, g);
    if (narrow) {
      tl(lab, x(1), y(238), [L('+50% a +160%', '+50% to +160%'), L('em 30 min', 'in 30 min'), '(Clow 2004)'], 'c02b-lab c02b-labA');
      tl(lab, x(16), y(110), [L('média +50%', 'mean +50%'), '(Wüst 2000)'], 'c02b-lab', 'start');
      t(lab, x(45) + 7, y(MEAN(45)) + 16, '*', 'c02b-lab c02b-star', 'start');
      var fn = DN.el('p', { class: 'c02b-fn' }, zoomW);
      fn.textContent = L('* Quando a amostra é colhida 15 minutos depois do previsto, a leitura muda (valor ilustrativo). A linha tracejada depois de 30 min é uma forma ilustrativa.',
        '* When the sample is collected 15 minutes later than planned, the reading changes (illustrative value). The dashed line after 30 min is an illustrative shape.');
    } else {
      tl(lab, x(2), y(250), [L('faixa da subida: +50% a +160%', 'range of the rise: +50% to +160%'), L('em 30 min, adultos saudáveis', 'in 30 min, healthy adults'), '(Clow 2004)'], 'c02b-lab c02b-labA');
      tl(lab, x(17), y(114), [L('média: +50% em 30 min', 'mean: +50% in 30 min'), L('(Wüst 2000, 509 adultos)', '(Wüst 2000, 509 adults)'), L('tracejado: forma ilustrativa', 'dashed: illustrative shape')], 'c02b-lab', 'start');
      DN.svg('line', { x1: x(45) + 6, x2: x(60) + 12, y1: y(MEAN(45)), y2: y(MEAN(45)), class: 'c02b-lead' }, lab);
      tl(lab, x(60) + 16, y(MEAN(45)) + 4, L(['amostra colhida', '15 minutos depois', 'do previsto: a', 'leitura muda', '(valor ilustrativo)'], ['sample collected', '15 minutes later', 'than planned: the', 'reading changes', '(illustrative value)']), 'c02b-lab c02b-labS', 'start');
      tl(lab, x(30) - 7, y(MEAN(30)) + 18, [L('prevista', 'planned')], 'c02b-lab c02b-labP', 'end');
    }

    /* ---- small multiples ---- */
    miniH.textContent = L('Quatro manhãs na mesma escala', 'Four mornings on the same scale');
    miniW.innerHTML = '';
    var cols = narrow ? 2 : 4, gap = 12;
    var MW = Math.floor((W - gap * (cols - 1)) / cols), MH = narrow ? 92 : 96;
    MINI.forEach(function (mi, j) {
      var fig = DN.el('figure', { class: 'c02b-mini' + (mi.flat ? ' c02b-mflat' : '') }, miniW);
      var mm = { t: 6, r: 4, b: 14, l: 4 };
      var mx = function (mn) { return mm.l + mn / 60 * (MW - mm.l - mm.r); };
      var my = function (v) { return mm.t + (MH - mm.t - mm.b) * (1 - (v - Y0) / (Y1 - Y0)); };
      var ms = DN.svg('svg', { viewBox: '0 0 ' + MW + ' ' + MH, width: MW, height: MH, 'aria-hidden': 'true' }, fig);
      DN.svg('line', { x1: mx(0), x2: mx(60), y1: my(100), y2: my(100), class: 'c02b-ref' }, ms);
      DN.svg('line', { x1: mx(0), x2: mx(60), y1: my(Y0), y2: my(Y0), class: 'c02b-base' }, ms);
      [0, 30, 60].forEach(function (mn) { DN.svg('line', { x1: mx(mn), x2: mx(mn), y1: my(Y0), y2: my(Y0) + 3, class: 'c02b-base' }, ms); });
      t(ms, mx(0), MH - 2, '0', 'c02b-mt'); t(ms, mx(60), MH - 2, '60 min', 'c02b-mt', 'end');
      var dd = ''; for (var q2 = 0; q2 <= 60; q2++) dd += (q2 ? 'L' : 'M') + mx(q2).toFixed(1) + ',' + my(mi.f(q2)).toFixed(1);
      DN.svg('path', { d: dd, class: 'c02b-mline' }, ms);
      DN.el('figcaption', null, fig, mi.flat ? L('sem subida', 'no rise') : L('com subida', 'with a rise'));
    });
    var note = DN.el('p', { class: 'c02b-mnote' }, miniW);
    note.innerHTML = L('<b>Cerca de 1 em cada 4 pessoas não mostra a subida num dado dia</b> (Wüst 2000). As quatro formas são ilustrativas.',
      '<b>About 1 in 4 people show no rise on a given day</b> (Wüst 2000). The four shapes are illustrative.');

    /* connector: from the lens bottom corners to the zoom plot's top corners */
    over.innerHTML = '';
    var rr = root.getBoundingClientRect(), lr = lensEl.getBoundingClientRect(), zr = zs.getBoundingClientRect();
    over.setAttribute('width', rr.width); over.setAttribute('height', rr.height);
    var zx0 = zr.left - rr.left + m.l, zx1 = zr.left - rr.left + m.l + iw, zy = zr.top - rr.top + m.t;
    var lx0b = lr.left - rr.left, lx1b = lr.right - rr.left, lyb = lr.bottom - rr.top;
    DN.svg('path', { d: 'M' + f1(lx0b) + ',' + f1(lyb) + ' L' + f1(zx0) + ',' + f1(zy) + ' M' + f1(lx1b) + ',' + f1(lyb) + ' L' + f1(zx1) + ',' + f1(zy), class: 'c02b-conl', pathLength: 1 }, over);
    DN.svg('rect', { x: zx0, y: zy, width: zx1 - zx0, height: zr.height - m.t - m.b, class: 'c02b-zframe' }, over);

    srTxt.textContent = L('Em números: subida de 50% a 160% nos primeiros 30 minutos (Clow 2004); subida média de cerca de 50% em 509 adultos, com cerca de 75% de pessoas que mostram a subida (Wüst 2000); pico entre 30 e 45 minutos (Stalder 2016).',
      'In numbers: a rise of 50% to 160% in the first 30 minutes (Clow 2004); a mean rise of about 50% in 509 adults, with about 75% of people showing the rise (Wüst 2000); the peak between 30 and 45 minutes (Stalder 2016).');
  }

  /* reveal: the zoom grows out of the lens once, on first view */
  var seen = false;
  DN.onVisible(root, function (v) {
    if (v && !seen) { seen = true; build(); requestAnimationFrame(function () { root.classList.add('c02b-in'); }); }
  }, { threshold: 0.2 });
  if (DN.RM) { seen = true; root.classList.add('c02b-in'); }

  var rt, lastW = 0;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { var w = root.clientWidth; if (w !== lastW) { lastW = w; build(); } }, 150);
  });
  DN.onLang(build);
  lastW = root.clientWidth;
  build();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(build);
})();
