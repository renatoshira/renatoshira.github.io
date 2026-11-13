/* c02a · desenhe-o-dia : you-draw-it, the reader's 24 h cortisol guess vs Debono et al. 2009 */
(function () {
  'use strict';
  var root = DN.body('c02a'); if (!root) return;
  var L = DN.L, C = DN.COL;

  /* ---------- the measured curve ----------
     Debono et al. 2009 (33 healthy volunteers, serum): peak 15.5 µg/dL at 08:32 (95% range 11.7 to 20.6),
     nadir < 2 µg/dL at 00:18 (1.5 to 2.5), below the daily mean from 19:43 to 05:31; the rise starts
     around 02:00 to 03:00 [S]. Between those points the curve is a smooth monotone interpolation,
     and the mean level M is solved so that the curve crosses its own mean at 19:43 and 05:31.
     t = hours after 06:00 (0..24). */
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
  var M = 8, curve;
  for (var it = 0; it < 30; it++) {
    var v6 = M + (15.5 - M) * 0.22;
    curve = pchip([0, T_PEAK, 6, 10, T_Q0, T_NADIR, 20.5, T_Q1, 24], [v6, 15.5, 12.0, 9.6, M, 1.8, 2.15, M, v6]);
    var s = 0; for (var q = 0; q < 960; q++) s += curve(q / 40); M = s / 960;
  }
  /* the shared model in companion.js wins, so every widget draws the same curve */
  var CC = DN.cortCurve;
  if (CC && CC.base) {
    curve = function (t) { return CC.base(6 + t); };
    T_PEAK = CC.PEAK.h - 6; T_NADIR = CC.TROUGH.h + 18; T_Q0 = CC.QUIET[0] - 6; T_Q1 = CC.QUIET[1] + 18;
  }
  var V0 = curve(0);
  var STEPS = 96, VMAX = 22;

  /* ---------- state ---------- */
  var saved = DN.store.get('draw', null);
  var D = new Array(STEPS + 1);
  var revealed = false, drawing = false, lastK = null;
  function resetD() { for (var i = 0; i <= STEPS; i++) D[i] = null; D[0] = V0; }
  resetD();
  /* stored as [{h: 6..30, v: µg/dL}] every 15 min (read by c09) */
  if (Array.isArray(saved) && saved.length === STEPS + 1 && saved[0] && saved[0].h != null) {
    D = saved.map(function (p) { return p.v; }); revealed = true;
  }

  /* ---------- risograph strip: sunrise at 06:00, dark window at 00:18 ---------- */
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
  function risoDefs(R) {
    var defs = '';
    [{ k: 'a', col: C.alta, ang: 15 }, { k: 'b', col: C.baixa, ang: 75 }].forEach(function (ink) {
      var p = 'c02ar-' + ink.k;
      [0.5, 0.82, 1.12].forEach(function (r, j) {
        defs += '<pattern id="' + p + 'h' + (j + 1) + '" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.3" cy="1.3" r="' + r + '" fill="' + ink.col + '"/></pattern>';
      });
      defs += '<filter id="' + p + 'g" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.3" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.6" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
    });
    return defs;
  }
  function inkLayer(k, body, R) {
    var col = k === 'a' ? C.alta : C.baixa, p = 'c02ar-' + k;
    var mx = f1((R() < 0.5 ? -1 : 1) * (0.4 + R() * 0.9)), my = f1((R() < 0.5 ? -1 : 1) * (0.3 + R() * 0.7));
    body = body.replace(/\$0/g, col).replace(/\$([123])/g, 'url(#' + p + 'h$1)');
    return '<g class="c02a-ink c02a-ink-' + k + '" transform="translate(' + mx + ' ' + my + ')" opacity=".94" filter="url(#' + p + 'g)">' + body + '</g>';
  }
  function sun(cx, by) {
    var rays = '';
    for (var i = 0; i < 7; i++) {
      var a = Math.PI * (1.08 + i * 0.14), c = Math.cos(a), s = Math.sin(a);
      rays += 'M' + f1(cx + c * 13) + ',' + f1(by + s * 13) + 'L' + f1(cx + c * 18) + ',' + f1(by + s * 18);
    }
    return {
      a: '<path d="M' + (cx - 10) + ',' + by + ' A10,10 0 0 1 ' + (cx + 10) + ',' + by + 'Z" fill="$0"/>' +
        '<path d="' + rays + '" stroke="$0" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M' + (cx - 16) + ',' + (by + 3.5) + ' h32" stroke="$1" stroke-width="4"/>',
      b: '<path d="M' + (cx - 22) + ',' + by + ' h44" stroke="$0" stroke-width="1.6"/>' +
        '<path d="M' + (cx - 18) + ',' + (by + 3.5) + ' q8,-3 16,0 t16,0" stroke="$0" stroke-width="1.2" fill="none"/>'
    };
  }
  function windowArt(cx, by) {
    var x0 = cx - 12, y0 = by - 26;
    return {
      a: '<path d="M' + (cx + 5.5) + ',' + (y0 + 5) + ' a5.5,5.5 0 1 0 3.5,9.6 a4.4,4.4 0 1 1 -3.5,-9.6Z" fill="$0"/>' +
        '<circle cx="' + (cx - 6) + '" cy="' + (y0 + 17) + '" r=".9" fill="$0"/><circle cx="' + (cx - 3) + '" cy="' + (y0 + 8) + '" r=".7" fill="$0"/>',
      b: '<rect x="' + x0 + '" y="' + y0 + '" width="24" height="26" fill="$0"/>' +
        '<path d="M' + cx + ',' + y0 + ' v26 M' + x0 + ',' + (y0 + 13) + ' h24" stroke="#fff" class="ps" stroke-width="1.6"/>' +
        '<path d="M' + (x0 - 3) + ',' + by + ' h30" stroke="$0" stroke-width="2.2"/>'
    };
  }

  /* ---------- skeleton ---------- */
  root.innerHTML = '';
  var legend = DN.el('div', { class: 'c02a-legend', 'aria-hidden': 'true' }, root);
  var wrap = DN.el('div', { class: 'c02a-wrap' }, root);
  var svg = DN.svg('svg', { class: 'c02a-svg', role: 'img' }, wrap);
  var res = DN.el('div', { class: 'c02a-res' }, root);
  var resT = DN.el('p', { class: 'c02a-cmp', 'aria-live': 'polite' }, res);
  var btns = DN.el('div', { class: 'rowbtns c02a-btns' }, res);
  var bAgain = DN.el('button', { type: 'button', class: 'btn' }, btns);
  var bSkip = DN.el('button', { type: 'button', class: 'btn' }, btns);
  var live = DN.el('div', { class: 'live', 'aria-live': 'polite' }, root);
  var take = DN.el('p', { class: 'c02a-read' }, root);
  var srTxt = DN.el('p', { class: 'sr' }, root);

  var G = {};
  var W, H, m, iw, ih, narrow;
  function x(t) { return m.l + t / 24 * iw; }
  function y(v) { return m.t + ih - v / VMAX * ih; }
  function tOf(px) { return DN.clamp((px - m.l) / iw * 24, 0, 24); }
  function vOf(py) { return DN.clamp((m.t + ih - py) / ih * VMAX, 0, VMAX); }
  function clock(t, en) {
    var mins = Math.round(((t + 6) % 24) * 60) % 1440, hh = Math.floor(mins / 60), mm = mins % 60;
    if (DN.lang() === 'en' || en) {
      var ap = hh < 12 ? 'am' : 'pm', h12 = hh % 12 === 0 ? 12 : hh % 12;
      return h12 + (mm ? ':' + (mm < 10 ? '0' : '') + mm : '') + ' ' + ap;
    }
    return hh + 'h' + (mm ? (mm < 10 ? '0' : '') + mm : '');
  }
  function hhmm(t) {
    var mins = Math.round(((t + 6) % 24) * 60) % 1440, hh = Math.floor(mins / 60), mm = mins % 60;
    return (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm;
  }

  function build() {
    W = Math.max(280, Math.floor(wrap.clientWidth || 600));
    narrow = W < 520;
    H = narrow ? 300 : 360;
    m = { t: 50, r: narrow ? 10 : 16, b: 30, l: narrow ? 30 : 36 };
    iw = W - m.l - m.r; ih = H - m.t - m.b;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    svg.innerHTML = '';
    var R = rng(832);
    var defs = DN.svg('defs', null, svg);
    defs.innerHTML = risoDefs(R) +
      gradient();
    /* riso strip above the plot */
    var s1 = sun(x(0) + 52, 34), s2 = windowArt(x(T_NADIR), 34);
    var strip = DN.svg('g', { class: 'c02a-strip', 'aria-hidden': 'true' }, svg);
    strip.innerHTML = inkLayer('a', s1.a + s2.a, R) + inkLayer('b', s1.b + s2.b, R);
    /* night band */
    G.night = DN.svg('g', { class: 'c02a-night' }, svg);
    DN.svg('rect', { x: x(T_Q0), y: m.t, width: x(T_Q1) - x(T_Q0), height: ih, class: 'c02a-band' }, G.night);
    G.nightT = DN.svg('text', { x: (x(T_Q0) + x(T_Q1)) / 2, y: m.t + 13, 'text-anchor': 'middle', class: 'c02a-bt' }, G.night);
    /* grid */
    var g = DN.svg('g', { class: 'c02a-grid' }, svg);
    [0, 5, 10, 15, 20].forEach(function (v) {
      DN.svg('line', { x1: m.l, x2: m.l + iw, y1: y(v), y2: y(v), class: v ? 'c02a-gl' : 'c02a-base' }, g);
      var t = DN.svg('text', { x: m.l - 6, y: y(v) + 3.5, 'text-anchor': 'end', class: 'c02a-tick' }, g); t.textContent = v;
    });
    G.unit = DN.svg('text', { x: m.l - 6, y: m.t - 6, 'text-anchor': 'start', class: 'c02a-tick c02a-unit' }, g);
    for (var hh = 0; hh <= 24; hh += 3) {
      DN.svg('line', { x1: x(hh), x2: x(hh), y1: y(0), y2: y(0) + 4, class: 'c02a-base' }, g);
      if (narrow && hh % 6) continue;
      var tx = DN.svg('text', { x: x(hh), y: y(0) + 17, 'text-anchor': hh === 0 ? 'start' : hh === 24 ? 'end' : 'middle', class: 'c02a-tick' }, g);
      tx.textContent = hhmm(hh);
    }
    /* measured layer */
    G.meas = DN.svg('g', { class: 'c02a-meas' }, svg);
    var d = '';
    for (var i = 0; i <= 240; i++) { var tt = i / 10; d += (i ? 'L' : 'M') + x(tt).toFixed(1) + ',' + y(curve(tt)).toFixed(1); }
    G.peakBar = DN.svg('g', { class: 'c02a-ref' }, G.meas);
    refBar(G.peakBar, T_PEAK, 11.7, 20.6, 15.5, C.altaTxt);
    G.nadBar = DN.svg('g', { class: 'c02a-ref' }, G.meas);
    refBar(G.nadBar, T_NADIR, 1.5, 2.5, 1.8, C.baixa);
    G.curve = DN.svg('path', { d: d, class: 'c02a-curve', stroke: 'url(#c02a-grad)', pathLength: 1 }, G.meas);
    G.labs = DN.svg('g', { class: 'c02a-labs' }, G.meas);
    /* user's line */
    G.user = DN.svg('path', { class: 'c02a-user' }, svg);
    G.start = DN.svg('circle', { cx: x(0), cy: y(V0), r: 4.5, class: 'c02a-start' }, svg);
    G.hint = DN.svg('g', { class: 'c02a-hint' }, svg);
    G.hintT = DN.svg('text', { x: x(0) + 10, y: y(V0) - 12, class: 'c02a-hintt' }, G.hint);
    G.hintBig = DN.svg('text', { x: x(12), y: y(15), 'text-anchor': 'middle', class: 'c02a-hintb' }, G.hint);
    /* keyboard handles */
    G.kb = DN.svg('g', { class: 'c02a-kb' }, svg);
    G.handles = [0, 3, 6, 9, 12, 15, 18, 21].map(function (t, k) {
      var hg = DN.svg('g', { class: 'c02a-h', tabindex: 0, role: 'slider', 'aria-valuemin': 0, 'aria-valuemax': VMAX }, G.kb);
      DN.svg('circle', { r: 6 }, hg);
      hg.addEventListener('keydown', function (e) { onKey(e, k); });
      hg.addEventListener('focus', function () { root.classList.add('c02a-kbd'); if (!revealed) ensureKbLine(); });
      hg.addEventListener('blur', function () { setTimeout(function () { if (!root.contains(document.activeElement) || !document.activeElement.classList.contains('c02a-h')) root.classList.remove('c02a-kbd'); }, 0); });
      return { t: t, g: hg };
    });
    /* hit area */
    G.hit = DN.svg('rect', { x: m.l, y: m.t, width: iw, height: ih, class: 'c02a-hit' }, svg);
    G.hit.addEventListener('pointerdown', down);
    G.hit.addEventListener('pointermove', move);
    G.hit.addEventListener('pointerup', up);
    G.hit.addEventListener('pointercancel', up);
    labels();
    render(false);
  }

  function gradient() {
    var st;
    if (CC && CC.stops) st = CC.stops(CC.base);
    else { st = []; for (var i = 0; i <= 48; i++) { var v = curve(i / 2), k = DN.clamp((v - 1.8) / 13.7, 0, 1); st.push({ o: i / 48, c: k > 0.5 ? C.alta : C.baixa }); } }
    return '<linearGradient id="c02a-grad" gradientUnits="userSpaceOnUse" x1="' + x(0) + '" x2="' + x(24) + '" y1="0" y2="0">' +
      st.map(function (q) { return '<stop offset="' + q.o.toFixed(4) + '" stop-color="' + q.c + '"/>'; }).join('') + '</linearGradient>';
  }
  function refBar(g, t, lo, hi, v, col) {
    var cx = x(t);
    DN.svg('line', { x1: cx, x2: cx, y1: y(hi), y2: y(lo), stroke: col, class: 'c02a-rbar' }, g);
    DN.svg('line', { x1: cx - 4, x2: cx + 4, y1: y(hi), y2: y(hi), stroke: col, class: 'c02a-rbar' }, g);
    DN.svg('line', { x1: cx - 4, x2: cx + 4, y1: y(lo), y2: y(lo), stroke: col, class: 'c02a-rbar' }, g);
    DN.svg('circle', { cx: cx, cy: y(v), r: 3.6, fill: col, class: 'c02a-rdot' }, g);
  }

  function text(parent, x0, y0, lines, cls, anchor) {
    var t = DN.svg('text', { x: x0, y: y0, 'text-anchor': anchor || 'start', class: cls }, parent);
    lines.forEach(function (ln, j) {
      var ts = DN.svg('tspan', { x: x0, dy: j ? 13 : 0 }, t); ts.textContent = ln;
      if (!j) ts.setAttribute('class', 'c02a-lb');
    });
    return t;
  }

  function labels() {
    legend.innerHTML = '<span class="c02a-lg"><i class="c02a-lgu"></i>' + L('seu palpite', 'your guess') + '</span>' +
      '<span class="c02a-lg c02a-lgm"><i class="c02a-lgm"></i>' + L('medido no sangue, média de 33 pessoas', 'measured in blood, mean of 33 people') + '</span>';
    G.unit.textContent = 'µg/dL';
    G.nightT.textContent = narrow ? L('abaixo da média', 'below the mean') : L('abaixo da média do dia, 19h43 a 5h31', 'below the daily mean, 7:43 pm to 5:31 am');
    G.hintT.textContent = L('comece aqui', 'start here');
    G.hintBig.textContent = L('desenhe a curva até as 6h', 'draw the curve to 6 am');
    svg.setAttribute('aria-label', L('Gráfico do cortisol no sangue ao longo de 24 horas, das 6h às 6h. ', 'Chart of blood cortisol over 24 hours, 6 am to 6 am. ') +
      (revealed ? srText() : L('Desenhe o seu palpite com o mouse ou o dedo, ou use as setas nos oito pontos.', 'Draw your guess with the mouse or a finger, or use the arrow keys on the eight points.')));
    G.handles.forEach(function (h) { h.g.setAttribute('aria-label', L('cortisol às ', 'cortisol at ') + clock(h.t)); });
    /* reveal labels */
    G.labs.innerHTML = '';
    var pk = narrow ? [L('pico 15,5', 'peak 15.5'), L('às 8h32', 'at 8:32 am')] : [L('pico: 15,5 µg/dL às 8h32', 'peak: 15.5 µg/dL at 8:32 am'), L('faixa de 95%: 11,7 a 20,6', '95% range: 11.7 to 20.6')];
    text(G.labs, x(T_PEAK) + 9, y(20.6) + 4, pk, 'c02a-lab c02a-labA');
    var nd = narrow ? [L('vale < 2', 'trough < 2'), L('à 0h18', 'at 12:18 am')] : [L('vale: abaixo de 2', 'trough: below 2'), L('µg/dL à 0h18', 'µg/dL at 12:18 am')];
    text(G.labs, x(T_NADIR), y(2.5) - (narrow ? 62 : 30), nd, 'c02a-lab c02a-labB', 'middle');
    if (!narrow) {
      text(G.labs, x(20.5) + 4, y(14), [L('a subida começa', 'the rise starts'), L('por volta das 2h ou 3h', 'around 2 or 3 am')], 'c02a-lab c02a-labS', 'end');
      DN.svg('line', { x1: x(20.5), y1: y(curve(20.5)) - 5, x2: x(20.5), y2: y(14) + 18, class: 'c02a-lead' }, G.labs);
    }
    srTxt.textContent = srText();
    bAgain.textContent = L('apagar e desenhar de novo', 'erase and draw again');
    bSkip.textContent = L('ver a curva sem desenhar', 'show the curve without drawing');
    take.textContent = L('O pico vem pouco depois de acordar, por volta das 8h30, e à meia-noite o cortisol já caiu para perto de um oitavo desse valor.',
      'The peak comes soon after waking, around 8:30 am, and by midnight cortisol has fallen to about one eighth of that value.');
    compare(false);
  }
  function srText() {
    return L('Curva medida (Debono e colegas, 2009): pico de 15,5 µg/dL às 8h32, faixa de 11,7 a 20,6; vale abaixo de 2 µg/dL à 0h18, faixa de 1,5 a 2,5; abaixo da média do dia das 19h43 às 5h31; a subida começa por volta das 2h ou 3h.',
      'Measured curve (Debono and colleagues, 2009): peak of 15.5 µg/dL at 8:32 am, range 11.7 to 20.6; trough below 2 µg/dL at 12:18 am, range 1.5 to 2.5; below the daily mean from 7:43 pm to 5:31 am; the rise starts around 2 or 3 am.');
  }

  /* ---------- drawing ---------- */
  function pt(e) {
    var r = svg.getBoundingClientRect();
    return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height];
  }
  function setAt(t, v) {
    var k = Math.round(t / 24 * STEPS);
    if (lastK != null && lastK !== k) {
      var a = lastK, va = D[a] == null ? v : D[a], st = k > a ? 1 : -1;
      for (var j = a + st; j !== k; j += st) D[j] = va + (v - va) * (j - a) / (k - a);
    }
    if (k > 0) D[k] = v;
    lastK = k;
  }
  function down(e) {
    if (revealed) return;
    drawing = true; lastK = null;
    try { G.hit.setPointerCapture(e.pointerId); } catch (err) {}
    var p = pt(e);
    /* join from the last drawn point (or the start dot) to the pen */
    var t = tOf(p[0]), k = Math.round(t / 24 * STEPS), j = k;
    while (j > 0 && D[j] == null) j--;
    lastK = j;
    setAt(t, vOf(p[1]));
    root.classList.add('c02a-on');
    render(false);
    e.preventDefault();
  }
  function move(e) {
    if (!drawing) return;
    var p = pt(e);
    setAt(tOf(p[0]), vOf(p[1]));
    render(false);
  }
  function up() {
    if (!drawing) return;
    drawing = false;
    var n = 0; for (var i = 0; i <= STEPS; i++) if (D[i] != null) n++;
    var far = 0; for (var k = STEPS; k >= 0; k--) if (D[k] != null) { far = k; break; }
    if (far >= STEPS - 4 && n >= STEPS * 0.7) { fill(); reveal(true); }
    else live.textContent = L('Continue a linha até as 6h da manhã seguinte para ver a curva medida.', 'Keep drawing to 6 am the next morning to see the measured curve.');
  }
  function fill() {
    var lastV = D[0];
    for (var i = 0; i <= STEPS; i++) {
      if (D[i] != null) { lastV = D[i]; continue; }
      var j = i; while (j <= STEPS && D[j] == null) j++;
      var nv = j <= STEPS ? D[j] : lastV;
      for (var q = i; q < j; q++) D[q] = lastV + (nv - lastV) * (q - i + 1) / (j - i + 1);
      i = j - 1;
    }
  }
  /* keyboard: eight points; the line is a smooth interpolation through them */
  function ensureKbLine() {
    var any = false; for (var i = 1; i <= STEPS; i++) if (D[i] != null) { any = true; break; }
    if (!any) { kbVals = [V0, V0, V0, V0, V0, V0, V0, V0]; kbApply(); }
    else kbVals = G.handles.map(function (h) { var k = h.t * 4; return D[k] == null ? V0 : D[k]; });
  }
  var kbVals = null;
  function kbApply() {
    var xs = [0, 3, 6, 9, 12, 15, 18, 21, 24], ys = kbVals.concat([kbVals[7]]);
    var f = pchip(xs, ys);
    for (var i = 1; i <= STEPS; i++) D[i] = DN.clamp(f(i / 4), 0, VMAX);
    D[0] = kbVals[0];
    root.classList.add('c02a-on');
    render(false);
  }
  function onKey(e, k) {
    var key = e.key;
    if (key === 'Enter' || key === ' ') { e.preventDefault(); if (!revealed) { fill(); reveal(true); } return; }
    if (revealed) return;
    if (!kbVals) ensureKbLine();
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      e.preventDefault();
      kbVals[k] = DN.clamp(kbVals[k] + (key === 'ArrowUp' ? 0.5 : -0.5) * (e.shiftKey ? 4 : 1), 0, VMAX);
      kbApply();
    } else if (key === 'ArrowRight' || key === 'ArrowLeft') {
      e.preventDefault();
      var n = DN.clamp(k + (key === 'ArrowRight' ? 1 : -1), 0, 7);
      G.handles[n].g.focus();
    }
  }

  function userPath() {
    var d = '', pen = false;
    for (var i = 0; i <= STEPS; i++) {
      if (D[i] == null) { pen = false; continue; }
      d += (pen ? 'L' : 'M') + x(i / 4).toFixed(1) + ',' + y(D[i]).toFixed(1); pen = true;
    }
    return d;
  }

  function render(anim) {
    G.user.setAttribute('d', userPath());
    var drawn = false; for (var i = 1; i <= STEPS; i++) if (D[i] != null) { drawn = true; break; }
    root.classList.toggle('c02a-drawn', drawn);
    root.classList.toggle('c02a-rev', revealed);
    G.handles.forEach(function (h) {
      var v = D[h.t * 4] == null ? V0 : D[h.t * 4];
      h.g.setAttribute('transform', 'translate(' + x(h.t).toFixed(1) + ',' + y(v).toFixed(1) + ')');
      h.g.setAttribute('aria-valuenow', v.toFixed(1));
      h.g.setAttribute('aria-valuetext', DN.fmt(v, 1) + ' µg/dL ' + L('às ', 'at ') + clock(h.t));
    });
    bSkip.hidden = revealed || drawn;
    bAgain.hidden = !revealed && !drawn;
    G.meas.classList.toggle('c02a-show', revealed);
    G.meas.classList.toggle('c02a-anim', !!anim && !DN.RM);
    G.night.classList.toggle('c02a-show', revealed);
  }

  function peakOf() {
    var best = -1, bk = 0, drawn = false;
    for (var i = 1; i <= STEPS; i++) if (D[i] != null) { drawn = true; if (D[i] > best) { best = D[i]; bk = i; } }
    return drawn ? bk / 4 : null;
  }
  function compare(fresh) {
    if (!revealed) { resT.innerHTML = ''; return; }
    var tp = peakOf();
    if (tp == null) {
      resT.innerHTML = L('O pico medido: <b>8h32</b>.', 'The measured peak: <b>8:32 am</b>.');
      return;
    }
    var diff = Math.abs(tp - T_PEAK); diff = Math.min(diff, 24 - diff);
    resT.innerHTML = L('Seu pico: <b class="c02a-you">' + clock(tp) + '</b>. O medido: <b class="c02a-ms">8h32</b>.',
      'Your peak: <b class="c02a-you">' + clock(tp) + '</b>. The measured one: <b class="c02a-ms">8:32 am</b>.') +
      ' <span class="c02a-off">' + (diff <= 1 ? L('Você acertou a hora.', 'You got the time right.')
        : L('Uma diferença de ' + DN.fmt(Math.round(diff * 2) / 2) + ' h.', 'A gap of ' + DN.fmt(Math.round(diff * 2) / 2) + ' h.')) + '</span>';
    if (fresh) {
      live.textContent = '';
      if (diff > 4) DN.surprise('c02a');
    }
  }

  function reveal(fresh) {
    revealed = true;
    var drawn = peakOf() != null;
    if (drawn) DN.store.set('draw', D.map(function (v, i) { return { h: 6 + i / 4, v: Math.round((v == null ? V0 : v) * 100) / 100 }; }));
    render(fresh);
    labels();
    compare(fresh);
  }

  bAgain.addEventListener('click', function () {
    revealed = false; resetD(); kbVals = null;
    DN.store.set('draw', null);
    render(false); labels();
    live.textContent = L('O desenho foi apagado; desenhe de novo, das 6h às 6h.', 'The drawing was erased; draw again, from 6 am to 6 am.');
  });
  bSkip.addEventListener('click', function () {
    reveal(false);
    live.textContent = L('A curva medida apareceu sem palpite.', 'The measured curve is shown without a guess.');
  });

  var rt2, lastW = 0;
  window.addEventListener('resize', function () {
    clearTimeout(rt2);
    rt2 = setTimeout(function () { var w = wrap.clientWidth; if (w !== lastW) { lastW = w; build(); } }, 150);
  });
  DN.onLang(function () { build(); });
  lastW = wrap.clientWidth;
  build();
})();
