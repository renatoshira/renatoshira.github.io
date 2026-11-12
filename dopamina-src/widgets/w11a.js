/* w11a · desenhe-os-trinta-dias : "You Draw It" for the first 30 days without the drug */
(function () {
  'use strict';
  var root = DN.body('w11a'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, RM = DN.RM;

  /* Brown & Schuckit 1988: % with HAM-D >= 20. Entry and week 4 are published;
     weeks 1 to 3 are interpolated (approximate), keeping the biggest drop in week 2. */
  var BARS = [
    { d: 1, p: 42, ex: true }, { d: 7, p: 35 }, { d: 14, p: 16 }, { d: 21, p: 9 }, { d: 28, p: 6, ex: true }
  ];
  /* Lembke's clinical pattern (no published measurement): worse to day 10 to 14, better in weeks 3 and 4 */
  var LEMBKE = [[1, 0], [3, -0.32], [6, -0.55], [10, -0.62], [14, -0.48], [17, -0.18], [21, 0.18], [25, 0.38], [30, 0.5]];
  var ANCH = [7, 14, 21, 30];

  var vals = new Array(31).fill(null); vals[1] = 0;
  var maxDrawn = 1, revealed = false, day = 1, drawing = false, lastD = null, animate = false;

  /* ---------- static DOM ---------- */
  root.innerHTML = '';
  var legend = DN.el('div', { 'class': 'w11a-leg' }, root);
  var svgWrap = DN.el('div', { 'class': 'w11a-svgw' }, root);
  var btns = DN.el('div', { 'class': 'rowbtns mt' }, root);
  var bShow = DN.el('button', { 'class': 'btn solid', type: 'button' }, btns);
  var bClear = DN.el('button', { 'class': 'btn', type: 'button' }, btns);
  var det = DN.el('details', { 'class': 'more' }, root);
  var sum = DN.el('summary', null, det);
  var sliders = ANCH.map(function (d) {
    var row = DN.el('div', { 'class': 'ctrlrow' }, det);
    var lab = DN.el('label', { 'for': 'w11a-s' + d }, row);
    var inp = DN.el('input', { type: 'range', id: 'w11a-s' + d, min: -100, max: 100, step: 5, value: 0 }, row);
    var v = DN.el('span', { 'class': 'v' }, row);
    inp.addEventListener('input', function () { fromSliders(); });
    return { d: d, lab: lab, inp: inp, v: v };
  });
  var live = DN.el('div', { 'class': 'live', 'aria-live': 'polite' }, root);
  var take = DN.el('p', { 'class': 'w11a-take' }, root);

  function feel(v) {
    if (v == null) return '';
    if (v <= -0.6) return L('muito pior', 'much worse');
    if (v <= -0.2) return L('pior', 'worse');
    if (v < 0.2) return L('como antes', 'as before');
    if (v < 0.6) return L('melhor', 'better');
    return L('muito melhor', 'much better');
  }

  /* ---------- geometry ---------- */
  var G = {};
  function geom() {
    var W = Math.max(280, Math.round(root.clientWidth || 600));
    var mob = W < 520;
    var plotH = mob ? 230 : 280;
    G = { W: W, mob: mob, x0: mob ? 12 : 18, x1: W - (mob ? 12 : 18), t: 26, plotH: plotH };
    G.yc = G.t + plotH / 2; G.half = plotH / 2 - 6; G.yb = G.t + plotH;
    G.laneY = G.yb + 46; G.laneH = mob ? 30 : 26;
    G.H = G.laneY + G.laneH * 3 + 4;
  }
  function X(d) { return G.x0 + (d - 1) / 29 * (G.x1 - G.x0); }
  function Y(v) { return G.yc - v * G.half; }
  function dayAt(px) { return DN.clamp(Math.round(1 + (px - G.x0) / (G.x1 - G.x0) * 29), 1, 30); }
  function valAt(py) { return DN.clamp((G.yc - py) / G.half, -1, 1); }

  function smooth(pts) {
    if (!pts.length) return '';
    var s = 'M' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1);
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      s += 'C' + c1x.toFixed(1) + ',' + c1y.toFixed(1) + ' ' + c2x.toFixed(1) + ',' + c2y.toFixed(1) + ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1);
    }
    return s;
  }
  function lembkeAt(d) {
    for (var i = 0; i < LEMBKE.length - 1; i++) {
      var a = LEMBKE[i], b = LEMBKE[i + 1];
      if (d >= a[0] && d <= b[0]) return a[1] + (b[1] - a[1]) * (d - a[0]) / (b[0] - a[0]);
    }
    return LEMBKE[LEMBKE.length - 1][1];
  }
  /* reader values with gaps filled linearly */
  function filled() {
    var out = new Array(31).fill(null), last = 1;
    out[1] = vals[1];
    for (var d = 2; d <= maxDrawn; d++) {
      if (vals[d] != null) {
        for (var k = last + 1; k < d; k++) out[k] = vals[last] + (vals[d] - vals[last]) * (k - last) / (d - last);
        out[d] = vals[d]; last = d;
      }
    }
    return out;
  }

  /* ---------- render ---------- */
  var svg, gReader, gCursor, gData, gYou;
  function render() {
    geom();
    svgWrap.innerHTML = '';
    svg = DN.svg('svg', { viewBox: '0 0 ' + G.W + ' ' + G.H, width: G.W, height: G.H, role: 'img', 'class': 'w11a-svg' + (revealed ? ' rev' : '') }, svgWrap);
    svg.setAttribute('aria-label', L(
      'Gráfico de 30 dias depois de parar. Eixo vertical de muito pior a muito melhor que antes de parar. Desenhe sua curva com o ponteiro ou use os controles abaixo.',
      'Chart of the 30 days after quitting. Vertical axis from much worse to much better than before quitting. Draw your curve with the pointer or use the controls below.'));
    var defs = DN.svg('defs', null, svg);
    var pat = DN.svg('pattern', { id: 'w11a-hatch', width: 5, height: 5, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    DN.svg('rect', { width: 5, height: 5, 'class': 'w11a-hbg' }, pat);
    DN.svg('line', { x1: 0, y1: 0, x2: 0, y2: 5, 'class': 'w11a-hl' }, pat);
    function grad(id, stops) {
      var g = DN.svg('linearGradient', { id: id, gradientUnits: 'userSpaceOnUse', x1: X(1), x2: X(30), y1: 0, y2: 0 }, defs);
      stops.forEach(function (s) { DN.svg('stop', { offset: ((s[0] - 1) / 29).toFixed(4), 'class': 'w11a-stop', 'stop-opacity': s[1] }, g); });
    }
    grad('w11a-gtab', [[1, .95], [7, .95], [8, .55], [14, .5], [28, 0], [30, 0]]);
    grad('w11a-gcan', [[1, .95], [4, .95], [14, 0], [30, 0]]);
    grad('w11a-galc', [[1, .95], [21, .9], [30, .35]]);

    /* frame: zero line, half tints, labels */
    DN.svg('rect', { x: G.x0, y: G.yc, width: G.x1 - G.x0, height: G.yb - G.yc, 'class': 'w11a-worse' }, svg);
    DN.svg('line', { x1: G.x0, x2: G.x1, y1: G.t, y2: G.t, 'class': 'w11a-grid' }, svg);
    DN.svg('line', { x1: G.x0, x2: G.x1, y1: G.yb, y2: G.yb, 'class': 'w11a-grid' }, svg);
    [7, 14, 21].forEach(function (d) { DN.svg('line', { x1: X(d), x2: X(d), y1: G.t, y2: G.yb, 'class': 'w11a-grid' }, svg); });
    DN.svg('line', { x1: G.x0, x2: G.x1, y1: G.yc, y2: G.yc, 'class': 'w11a-zero' }, svg);
    var t1 = DN.svg('text', { x: G.x0, y: G.t - 9, 'class': 'w11a-ax' }, svg);
    t1.textContent = '↑ ' + L('muito melhor que antes de parar', 'much better than before quitting');
    [1, 7, 14, 21, 30].forEach(function (d) {
      var tx = DN.svg('text', { x: X(d), y: G.yb + 16, 'class': 'w11a-tick', 'text-anchor': d === 1 ? 'start' : d === 30 ? 'end' : 'middle' }, svg);
      tx.textContent = d === 1 ? L('dia 1', 'day 1') : d === 30 ? L('30 dias', '30 days') : String(d);
    });

    /* data layer */
    gData = DN.svg('g', { 'class': 'w11a-data' }, svg);
    var barLabels = [];
    var bw = Math.min(28, (G.x1 - G.x0) / 29 * 2.6);
    BARS.forEach(function (b, i) {
      var h = b.p / 50 * G.half;
      var x = DN.clamp(X(b.d) - bw / 2, G.x0, G.x1 - bw);
      var r = DN.svg('rect', { x: x, y: G.yc, width: bw, height: h, 'class': 'w11a-bar' + (b.ex ? '' : ' approx') }, gData);
      r.style.transitionDelay = (animate ? 120 + i * 140 : 0) + 'ms';
      var lb = DN.svg('text', { x: x + bw / 2, y: G.yc + h + 14, 'class': 'w11a-bl w11a-halo' + (b.ex ? '' : ' approx'), 'text-anchor': 'middle' }, null);
      barLabels.push(lb);
      lb.textContent = (b.ex ? '' : '≈') + fmt(b.p) + '%';
      lb.style.transitionDelay = (animate ? 260 + i * 140 : 0) + 'ms';
    });
    var lp = DN.svg('path', { d: smooth(LEMBKE.map(function (p) { return [X(p[0]), Y(p[1])]; })), 'class': 'w11a-lembke' }, gData);
    lp.style.transitionDelay = (animate ? 900 : 0) + 'ms';
    var ll = DN.svg('text', { x: X(30), y: Y(0.5) - 10, 'class': 'w11a-ll w11a-halo', 'text-anchor': 'end' }, null);
    ll.textContent = 'Lembke';
    ll.style.transitionDelay = lp.style.transitionDelay;

    /* lanes: symptom duration in other studies */
    var lanes = [
      ['w11a-gtab', L('tabaco · pico na 1ª semana, dura de 2 a 4', 'tobacco · peaks in week 1, lasts 2 to 4'), 28],
      ['w11a-gcan', L('cannabis · some entre os dias 4 e 14', 'cannabis · gone between days 4 and 14'), 14],
      ['w11a-galc', L('álcool · passa entre a 3ª e a 6ª semana →', 'alcohol · fades between weeks 3 and 6 →'), 30]
    ];
    var gl = DN.svg('g', { 'class': 'w11a-lanes' }, svg);
    gl.style.transitionDelay = (animate ? 1200 : 0) + 'ms';
    var lt = DN.svg('text', { x: G.x0, y: G.laneY - 6, 'class': 'w11a-lt' }, gl);
    lt.textContent = L('sintomas de abstinência em outros estudos', 'withdrawal symptoms in other studies');
    lanes.forEach(function (ln, i) {
      var y = G.laneY + i * G.laneH;
      var tx = DN.svg('text', { x: G.x0, y: y + 11, 'class': 'w11a-lane-t' }, gl);
      tx.textContent = ln[1];
      DN.svg('rect', { x: G.x0, y: y + 15, width: G.x1 - G.x0, height: 5, fill: 'url(#' + ln[0] + ')', 'class': 'w11a-lb' }, gl);
      DN.svg('line', { x1: G.x0, x2: G.x1, y1: y + 17.5, y2: y + 17.5, 'class': 'w11a-lph' }, gl);
    });

    /* reader layer */
    var hint = DN.svg('g', { 'class': 'w11a-hint' + (maxDrawn > 1 || revealed ? ' gone' : '') }, svg);
    var ht = DN.svg('text', { x: X(G.mob ? 3 : 2.5), y: G.yc - 24, 'class': 'w11a-ht' }, hint);
    ht.textContent = L('desenhe daqui até o dia 30 →', 'draw from here to day 30 →');
    gReader = DN.svg('g', null, svg);
    /* labels above every line, with a paper halo so no curve runs through the letters */
    var gLab = DN.svg('g', { 'class': 'w11a-labs' }, svg);
    var t2 = DN.svg('text', { x: G.x1 - 4, y: G.yb - 8, 'class': 'w11a-ax w11a-halo', 'text-anchor': 'end' }, gLab);
    t2.textContent = '↓ ' + L('muito pior', 'much worse');
    var t3 = DN.svg('text', { x: G.x1 - 4, y: G.yc - 7, 'class': 'w11a-ax w11a-halo', 'text-anchor': 'end' }, gLab);
    t3.textContent = L('como antes de parar', 'as before quitting');
    barLabels.forEach(function (lb) { gLab.appendChild(lb); });
    gLab.appendChild(ll);
    gYou = DN.svg('g', null, svg);
    gCursor = DN.svg('g', { 'class': 'w11a-cur' }, svg);
    var hit = DN.svg('rect', { x: 0, y: G.t - 10, width: G.W, height: G.plotH + 20, 'class': 'w11a-hit' }, svg);
    hit.addEventListener('pointerdown', pDown);
    hit.addEventListener('pointermove', pMove);
    hit.addEventListener('pointerup', pUp);
    hit.addEventListener('pointercancel', pUp);
    drawReader(); drawCursor();
    if (animate) {
      animate = false;
      requestAnimationFrame(function () { requestAnimationFrame(function () { svg.classList.add('rev'); }); });
    }
  }

  function drawReader() {
    gReader.innerHTML = ''; gYou.innerHTML = '';
    var f = filled(), pts = [];
    for (var d = 1; d <= maxDrawn; d++) if (f[d] != null) pts.push([X(d), Y(f[d])]);
    if (pts.length > 1) DN.svg('path', { d: smooth(pts), 'class': 'w11a-you' }, gReader);
    DN.svg('circle', { cx: X(1), cy: Y(0), r: 5, 'class': 'w11a-start' }, gReader);
    if (!revealed && maxDrawn < 2 && !RM) DN.svg('circle', { cx: X(1), cy: Y(0), r: 5, 'class': 'w11a-pulse' }, gReader);
    if (pts.length > 1) {
      var e = pts[pts.length - 1];
      var ly = e[1] - 9;
      if (e[0] > G.x1 - 170 && (Math.abs(ly - (G.yc - 7)) < 14 || Math.abs(ly - (G.yb - 8)) < 14)) ly = e[1] + (e[1] > G.yc + 20 ? -9 - 14 : 18);
      if (e[0] > G.x1 - 170 && Math.abs(ly - (G.yc - 7)) < 14) ly = G.yc - 24;
      var yt = DN.svg('text', { x: Math.min(e[0] + 6, G.x1 - 2), y: ly, 'class': 'w11a-yl w11a-halo', 'text-anchor': e[0] > G.x1 - 60 ? 'end' : 'start' }, gYou);
      yt.textContent = L('você', 'you');
    }
  }
  function drawCursor() {
    gCursor.innerHTML = '';
    return;
    var x = X(day);
    DN.svg('line', { x1: x, x2: x, y1: G.t, y2: G.yb, 'class': 'w11a-cl' }, gCursor);
    var t = DN.svg('text', { x: DN.clamp(x, G.x0 + 22, G.x1 - 22), y: G.t + 12, 'class': 'w11a-ct', 'text-anchor': 'middle' }, gCursor);
    t.textContent = L('dia ', 'day ') + day;
    var f = filled();
    if (f[day] != null && maxDrawn >= day) DN.svg('circle', { cx: x, cy: Y(f[day]), r: 4, 'class': 'w11a-cd you' }, gCursor);
    if (revealed) DN.svg('circle', { cx: x, cy: Y(lembkeAt(day)), r: 3.5, 'class': 'w11a-cd lem' }, gCursor);
  }

  /* ---------- drawing ---------- */
  function local(e) {
    var r = svg.getBoundingClientRect();
    return [(e.clientX - r.left) * G.W / r.width, (e.clientY - r.top) * G.H / r.height];
  }
  function put(px, py) {
    var d = dayAt(px), v = valAt(py);
    if (d < 2) return;
    if (lastD != null && lastD !== d) {
      var a = Math.min(lastD, d), b = Math.max(lastD, d);
      var va = lastD < d ? vals[lastD] : v, vb = lastD < d ? v : vals[lastD];
      for (var k = Math.max(2, a); k <= b; k++) vals[k] = va + (vb - va) * (k - a) / ((b - a) || 1);
    }
    vals[d] = v; lastD = d;
    if (d > maxDrawn) maxDrawn = d;
    var hint = svg.querySelector('.w11a-hint'); if (hint) hint.classList.add('gone');
    drawReader(); drawCursor();
  }
  function pDown(e) {
    var p = local(e);
    e.preventDefault();
    try { e.target.setPointerCapture(e.pointerId); } catch (er) {}
    drawing = true;
    if (revealed) { drawing = false; return; }
    lastD = null;
    put(p[0], p[1]);
  }
  function pMove(e) {
    if (!drawing) return;
    var p = local(e);
    if (revealed) return;
    put(p[0], p[1]);
  }
  function pUp() {
    if (!drawing) return;
    drawing = false; lastD = null;
    if (!revealed && maxDrawn > 1) { syncSliders(); relabelButtons(); say(drawMsg()); }
  }
  function drawMsg() {
    return maxDrawn >= 30
      ? L('Sua curva está pronta. Aperte mostrar os dados.', 'Your curve is done. Press show the data.')
      : L('Sua curva vai até o dia ' + maxDrawn + '. Continue até o dia 30 ou aperte mostrar os dados.', 'Your curve reaches day ' + maxDrawn + '. Keep going to day 30 or press show the data.');
  }

  /* ---------- keyboard alternative ---------- */
  function fromSliders() {
    if (revealed) return;
    var pts = [[1, 0]].concat(sliders.map(function (s) { return [s.d, +s.inp.value / 100]; }));
    for (var i = 0; i < pts.length - 1; i++) {
      for (var d = pts[i][0]; d <= pts[i + 1][0]; d++) vals[d] = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * (d - pts[i][0]) / (pts[i + 1][0] - pts[i][0]);
    }
    vals[1] = 0; maxDrawn = 30;
    var hint = svg.querySelector('.w11a-hint'); if (hint) hint.classList.add('gone');
    labelSliders(); relabelButtons(); drawReader(); drawCursor();
  }
  function syncSliders() {
    var f = filled();
    sliders.forEach(function (s) { if (f[s.d] != null) s.inp.value = Math.round(f[s.d] * 20) * 5; });
    labelSliders();
  }
  function labelSliders() {
    sliders.forEach(function (s) {
      s.lab.textContent = L('dia ', 'day ') + s.d;
      var v = +s.inp.value / 100;
      s.v.textContent = (v > 0 ? '+' : '') + fmt(Math.round(v * 10));
      s.inp.setAttribute('aria-valuetext', L('dia ', 'day ') + s.d + ': ' + feel(v));
      s.inp.disabled = revealed;
    });
  }

  /* ---------- day cursor ---------- */
  function dayMsg(d) {
    var f = filled(), yours = (maxDrawn >= d && f[d] != null) ? ' ' + L('Na sua curva: ', 'Your curve: ') + feel(f[d]) + '.' : '';
    var m;
    if (d <= 7) m = L('Primeira semana. O tabaco está no pico dos sintomas. Na entrada, 42% tinham depressão clínica.', 'Week one. Tobacco symptoms are at their peak. At entry, 42% had clinical depression.');
    else if (d <= 14) m = L('Segunda semana. Nas barras, é a semana da maior queda da depressão. Na curva de Lembke, ainda é a pior fase.', 'Week two. In the bars, depression drops most this week. On Lembke\'s curve, this is still the worst stretch.');
    else if (d <= 21) m = L('Terceira semana. Os sintomas da cannabis já passaram. Lembke descreve uma melhora clara a partir daqui.', 'Week three. Cannabis symptoms have passed. Lembke describes clear improvement from here.');
    else m = L('Quarta semana. Na semana 4, 6% ainda tinham depressão clínica. No álcool, os sintomas agudos podem durar até a sexta semana.', 'Week four. At week 4, 6% still had clinical depression. With alcohol, acute symptoms can last until week six.');
    return L('Dia ', 'Day ') + d + '. ' + (revealed ? m : '') + yours;
  }
  function setDay(d, quiet) {
    d = DN.clamp(d | 0, 1, 30);
    if (d === day && !quiet) return;
    day = d;
    drawCursor();
    if (!quiet && (revealed || maxDrawn >= d)) say(dayMsg(d));
  }
  function labelDay() {}

  /* ---------- reveal ---------- */
  function reveal() {
    if (revealed) return;
    revealed = true; animate = !RM;
    render(); labelSliders(); relabelButtons(); relabelLegend();
    var r = revealText();
    if (r[1]) DN.letdown('w11a');
    say(r[0]);
  }
  function revealText() {
    var f = filled(), drew = maxDrawn >= 7, early = false, low = 1, lowD = 1;
    if (drew) {
      for (var d = 2; d <= 7; d++) if (f[d] > 0.2) early = true;
      if (f[7] - f[1] > 0.12) early = true;
      for (var k = 1; k <= maxDrawn; k++) if (f[k] < low) { low = f[k]; lowD = k; }
    }
    var msg;
    if (!drew) msg = L('Nos dados, a primeira semana é a pior, a maior queda da depressão vem na segunda e, na quarta, só 6% seguem deprimidos.', 'In the data, the first week is the worst, depression drops most in the second, and by the fourth only 6% are still depressed.');
    else if (early) {
      msg = L('Sua curva melhorava antes do dia 7. Nos dados, a primeira semana é a pior, e a maior queda da depressão só vem na segunda.', 'Your curve improved before day 7. In the data, the first week is the worst, and depression drops most only in the second.');
    } else if (low < -0.15) msg = L('Sua curva chegava ao pior no dia ' + lowD + '. Na curva de Lembke, a pior fase vai até o dia 10 a 14, e a maior queda da depressão vem na segunda semana.', 'Your curve hit bottom on day ' + lowD + '. On Lembke\'s curve the worst stretch runs to day 10 to 14, and depression drops most in week two.');
    else msg = L('Sua curva quase não piorava. Nos dados, 42% tinham depressão clínica na entrada e 6% na quarta semana.', 'Your curve barely got worse. In the data, 42% had clinical depression at entry and 6% at week four.');
    return [msg, early];
  }
  function clear() {
    vals = new Array(31).fill(null); vals[1] = 0; maxDrawn = 1; revealed = false;
    sliders.forEach(function (s) { s.inp.value = 0; });
    render(); labelSliders(); relabelButtons(); relabelLegend();
    say(L('Desenhe de novo a partir do dia 1.', 'Draw again from day 1.'));
  }
  bShow.addEventListener('click', reveal);
  bClear.addEventListener('click', clear);

  function relabelButtons() {
    bShow.textContent = L('mostrar os dados', 'show the data');
    bShow.disabled = revealed;
    bClear.textContent = L('apagar e desenhar de novo', 'erase and redraw');
    bClear.hidden = !revealed && maxDrawn < 2;
  }
  function relabelLegend() {
    legend.innerHTML =
      '<span><i class="sw you"></i>' + L('sua curva', 'your curve') + '</span>' +
      '<span class="dat"><i class="sw lem"></i>' + L('Lembke, padrão clínico', 'Lembke, clinical pattern') + '</span>' +
      '<span class="dat"><i class="sw bar"></i>' + L('% com depressão clínica, 191 homens, álcool', '% with clinical depression, 191 men, alcohol') + '</span>' +
      '<span class="dat"><i class="sw apx"></i>' + L('≈ semanas 1 a 3 aproximadas', '≈ weeks 1 to 3 approximate') + '</span>';
    legend.classList.toggle('rev', revealed);
  }
  function say(t) { live.textContent = t; }

  function relabel() {
    take.textContent = L('O pior vem nas duas primeiras semanas. Na quarta, a depressão clínica tinha caído de 42% para 6%.',
      'The worst comes in the first two weeks. By week four, clinical depression had fallen from 42% to 6%.');
    sum.textContent = L('desenhar com controles deslizantes', 'draw with sliders');
    labelSliders(); labelDay(); relabelButtons();
    render(); relabelLegend();
    say(revealed ? revealText()[0] : L('O dia 1 está marcado no zero. Desenhe como você acha que a pessoa se sente até o dia 30.', 'Day 1 is marked at zero. Draw how you think the person feels up to day 30.'));
  }
  relabel();
  DN.onLang(relabel);
  var rt = 0, lastW = root.clientWidth;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { if (Math.abs(root.clientWidth - lastW) > 2) { lastW = root.clientWidth; render(); } }, 150);
  });
})();
