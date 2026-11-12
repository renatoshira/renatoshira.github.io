/* w10b · as-curvas-originais : NIDA slide curves (Di Chiara & Imperato 1988; Fiorino 1997;
   Bassareo & Di Chiara 1999), % of baseline over 300 min, all curves at once, linear,
   with the area above baseline for each visible curve. Values read by hand (±5 to 10%). */
(function () {
  'use strict';
  var root = DN.body('w10b'); if (!root) return;
  var L = DN.L, C = DN.COL, fmt = DN.fmt;

  function grid(vals, step) { return vals.map(function (v, i) { return [i * (step || 20), v]; }); }
  var MORPH = {
    '0.5': grid([100, 125, 142, 135, 128, 120, 113, 105, 103, 100]),
    '1': grid([100, 138, 155, 168, 152, 143, 133, 113, 110, 108, 107, 106, 105, 105, 104]),
    '2.5': grid([100, 145, 158, 180, 183, 165, 150, 140, 130, 125, 118, 110, 105, 105, 103, 100]),
    '10': grid([100, 148, 160, 178, 195, 198, 196, 195, 195, 187, 172, 158, 133, 122, 120, 110])
  };
  var CURVES = [
    { id: 'anfetamina', pt: 'anfetamina', en: 'amphetamine', on: true,
      d: grid([100, 520, 1000, 670, 450, 400, 370, 340, 310, 280, 240, 225, 210, 190, 170, 150]) },
    { id: 'cocaina', pt: 'cocaína', en: 'cocaine', on: true,
      d: grid([100, 220, 255, 285, 330, 320, 305, 280, 260, 185, 178, 165, 150, 138, 128, 125]) },
    { id: 'nicotina', pt: 'nicotina', en: 'nicotine', on: true,
      d: grid([100, 222, 175, 162, 157, 152, 143, 142, 140, 140]) },
    { id: 'morfina', pt: 'morfina', en: 'morphine', on: true, d: MORPH['10'] },
    { id: 'comida', pt: 'comida', en: 'food', on: true,
      d: [[0, 100], [10, 103], [20, 97], [30, 100], [40, 93], [50, 150], [60, 140], [70, 125], [80, 115], [90, 112], [120, 105], [130, 100], [180, 100]] },
    { id: 'sexo', pt: 'sexo', en: 'sex', on: true,
      d: [[0, 105], [15, 147], [30, 197], [45, 182], [60, 172], [75, 175], [90, 163], [105, 163]] }
  ];
  var dose = '10';
  var logMix = 0, logOn = false;

  function area(d) {
    var s = 0;
    for (var i = 1; i < d.length; i++) {
      var a = Math.max(0, d[i - 1][1] - 100), b = Math.max(0, d[i][1] - 100);
      s += (a + b) / 2 * (d[i][0] - d[i - 1][0]);
    }
    return s;
  }

  /* ---------- DOM ---------- */
  var read = DN.el('p', { class: 'w10b-read' }, root);
  var holder = DN.el('div', { class: 'w10b-svg' }, root);
  var sv = DN.svg('svg', { role: 'img' }, holder);
  var cnt = DN.el('div', { class: 'w10b-area' }, root);
  var cntHead = DN.el('div', { class: 'glabel' }, cnt);
  var cntRows = DN.el('div', { class: 'w10b-rows' }, cnt);
  var det = DN.el('details', { class: 'more' }, root);
  var sum = DN.el('summary', null, det);
  var tblWrap = DN.el('div', { class: 'w10b-tbl' }, det);

  /* ---------- scales ---------- */
  var W = 600, H = 320, M = { l: 40, r: 96, t: 14, b: 30 };
  var LIN = [0, 1100], LOG = [80, 1300];
  function X(t) { return M.l + t / 300 * (W - M.l - M.r); }
  function yLin(v) { return M.t + (LIN[1] - v) / (LIN[1] - LIN[0]) * (H - M.t - M.b); }
  function yLog(v) { var a = Math.log(LOG[0]), b = Math.log(LOG[1]); return M.t + (b - Math.log(Math.max(v, LOG[0]))) / (b - a) * (H - M.t - M.b); }
  function Y(v) { return DN.lerp(yLin(v), yLog(v), logMix); }

  /* monotone cubic (Fritsch Carlson) through pixel points */
  function monotone(pts) {
    var n = pts.length; if (n < 2) return '';
    var dx = [], dy = [], ms = [], t = [];
    for (var i = 0; i < n - 1; i++) { dx[i] = pts[i + 1][0] - pts[i][0]; dy[i] = pts[i + 1][1] - pts[i][1]; ms[i] = dy[i] / dx[i]; }
    t[0] = ms[0]; t[n - 1] = ms[n - 2];
    for (i = 1; i < n - 1; i++) t[i] = ms[i - 1] * ms[i] <= 0 ? 0 : (ms[i - 1] + ms[i]) / 2;
    for (i = 0; i < n - 1; i++) {
      if (ms[i] === 0) { t[i] = 0; t[i + 1] = 0; continue; }
      var a = t[i] / ms[i], b = t[i + 1] / ms[i], h = a * a + b * b;
      if (h > 9) { var k = 3 / Math.sqrt(h); t[i] = k * a * ms[i]; t[i + 1] = k * b * ms[i]; }
    }
    var d = 'M' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1);
    for (i = 0; i < n - 1; i++) {
      var h3 = dx[i] / 3;
      d += 'C' + (pts[i][0] + h3).toFixed(1) + ',' + (pts[i][1] + t[i] * h3).toFixed(1) + ' ' +
        (pts[i + 1][0] - h3).toFixed(1) + ',' + (pts[i + 1][1] - t[i + 1] * h3).toFixed(1) + ' ' +
        pts[i + 1][0].toFixed(1) + ',' + pts[i + 1][1].toFixed(1);
    }
    return d;
  }

  var gAxis, gCurves, gLabels, defs;
  function build() {
    while (sv.firstChild) sv.removeChild(sv.firstChild);
    W = holder.clientWidth || 600;
    var small = W < 520;
    H = small ? 320 : 380;
    M = { l: small ? 36 : 44, r: small ? 76 : 100, t: 14, b: 32 };
    sv.setAttribute('viewBox', '0 0 ' + W + ' ' + H); sv.setAttribute('width', W); sv.setAttribute('height', H);
    defs = DN.svg('defs', null, sv);
    gAxis = DN.svg('g', null, sv);
    gCurves = DN.svg('g', null, sv);
    gLabels = DN.svg('g', null, sv);
    CURVES.forEach(function (c) {
      var id = 'w10bclip-' + c.id;
      var cp = DN.svg('clipPath', { id: id }, defs);
      c.clip = DN.svg('rect', { x: 0, y: 0, width: c.on ? W : 0, height: H }, cp);
      c.g = DN.svg('g', { 'clip-path': 'url(#' + id + ')' }, gCurves);
      c.pa = DN.svg('path', { fill: C.sub[c.id], 'fill-opacity': 0.07, stroke: 'none' }, c.g);
      c.pl = DN.svg('path', { fill: 'none', stroke: C.sub[c.id], 'stroke-width': 2.4, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, c.g);
      c.lab = DN.svg('text', { class: 'w10b-lab', 'font-size': small ? 10.5 : 11.5, fill: C.sub[c.id] }, gLabels);
      c.drawn = c.on ? 1 : 0;
    });
    redraw();
  }
  function axis() {
    while (gAxis.firstChild) gAxis.removeChild(gAxis.firstChild);
    var ticks = logMix > 0.5 ? [100, 200, 500, 1000] : [0, 100, 250, 500, 750, 1000];
    ticks.forEach(function (v) {
      if (logMix > 0.5 && v < LOG[0]) return;
      var y = Y(v);
      DN.svg('line', { x1: M.l, x2: W - M.r + 6, y1: y, y2: y, stroke: v === 100 ? C.ink : C.line, 'stroke-width': 1, 'stroke-dasharray': v === 100 ? '4 3' : null }, gAxis);
      var t = DN.svg('text', { x: M.l - 6, y: y + 3.5, 'text-anchor': 'end', 'font-size': 10, fill: v === 100 ? C.ink : C.dim }, gAxis);
      t.textContent = fmt(v, 0) + (v === 1000 ? '%' : '');
    });
    /* the baseline word sits under the dashed line at the right end, where no curve goes below 100 */
    var bl = DN.svg('text', { x: W - M.r, y: Y(100) + 5, 'text-anchor': 'end', 'dominant-baseline': 'hanging', 'font-size': 9.5, fill: C.ink }, gAxis);
    bl.textContent = L('basal', 'baseline');
    [0, 60, 120, 180, 240, 300].forEach(function (t) {
      var x = X(t);
      DN.svg('line', { x1: x, x2: x, y1: H - M.b, y2: H - M.b + 4, stroke: C.ink }, gAxis);
      var tx = DN.svg('text', { x: x, y: H - M.b + 16, 'text-anchor': 'middle', 'font-size': 10, fill: C.dim }, gAxis);
      tx.textContent = String(t);
    });
    var xl = DN.svg('text', { x: W - M.r, y: H - 2, 'text-anchor': 'end', 'font-size': 9.5, fill: C.dim }, gAxis);
    xl.textContent = L('minutos depois do início', 'minutes after onset');
    var yl = DN.svg('text', { x: 2, y: M.t - 4, 'font-size': 9.5, fill: C.dim }, gAxis);
    yl.textContent = L('% do basal', '% of baseline');
    DN.svg('line', { x1: M.l, x2: W - M.r + 6, y1: H - M.b, y2: H - M.b, stroke: C.ink }, gAxis);
    /* callout at the amphetamine peak */
    var pk = DN.svg('text', { x: X(40) + 10, y: Y(1000) + 2, 'text-anchor': 'start', 'dominant-baseline': 'central', class: 'w10b-call', fill: C.sub.anfetamina }, gAxis);
    pk.textContent = L('10 vezes o basal aos 40 min', '10 times baseline at 40 min');
  }
  function curvePts(c) { return c.d.map(function (p) { return [X(p[0]), Y(p[1])]; }); }
  function drawCurve(c, animate) {
    var pts = curvePts(c), d = monotone(pts);
    c.pl.setAttribute('d', d);
    var last = pts[pts.length - 1];
    c.pa.setAttribute('d', d + 'L' + last[0].toFixed(1) + ',' + Y(100).toFixed(1) + 'L' + pts[0][0].toFixed(1) + ',' + Y(100).toFixed(1) + 'Z');
    if (animate) reveal(c);
  }
  function reveal(c) {
    var x0 = M.l, x1 = W;
    if (DN.RM) { c.clip.setAttribute('width', c.on ? W : 0); c.drawn = c.on ? 1 : 0; counters(); placeLabels(); return; }
    if (!c.on) { c.clip.setAttribute('width', 0); c.drawn = 0; counters(); placeLabels(); return; }
    var t0 = performance.now();
    c.drawn = 0;
    (function tick(now) {
      var u = Math.min(1, (now - t0) / 600), e = 1 - Math.pow(1 - u, 3);
      c.clip.setAttribute('width', x0 + (x1 - x0) * e);
      c.drawn = e; counters(); placeLabels();
      if (u < 1) requestAnimationFrame(tick);
    })(t0);
  }
  function placeLabels() {
    var items = [], GAP = W < 520 ? 13 : 14;
    CURVES.forEach(function (c) {
      var last = c.d[c.d.length - 1];
      var x = X(last[0]) + 6, y = Y(last[1]);
      /* a curve that ends on the baseline gets its name just above the dashed line */
      if (last[1] <= 102) y = Y(100) - 9;
      c.lab.textContent = L(c.pt, c.en) + (c.id === 'morfina' ? ' ' + fmt(+dose, dose === '0.5' || dose === '2.5' ? 1 : 0) : '');
      c.lab.setAttribute('opacity', c.on ? Math.min(1, c.drawn * 1.6) : 0);
      c.lab.setAttribute('dominant-baseline', 'central');
      c.lab.style.pointerEvents = c.on ? 'auto' : 'none';
      if (c.on) items.push({ c: c, x: x, y: y, y0: y });
    });
    /* labels in the same column are spread with a fixed gap, centred on where they want to be */
    var cols = [];
    items.forEach(function (it) {
      var col = cols.filter(function (q) { return Math.abs(q.x - it.x) < 40; })[0];
      if (!col) cols.push(col = { x: it.x, its: [] });
      col.its.push(it);
    });
    cols.forEach(function (col) {
      var its = col.its.sort(function (a, b) { return a.y0 - b.y0; });
      for (var pass = 0; pass < 2; pass++) {
        for (var i = 1; i < its.length; i++) if (its[i].y < its[i - 1].y + GAP) its[i].y = its[i - 1].y + GAP;
        var shift = 0;
        its.forEach(function (o) { shift += o.y - o.y0; });
        shift /= its.length;
        its.forEach(function (o) { o.y -= shift; });
        for (i = 1; i < its.length; i++) if (its[i].y < its[i - 1].y + GAP) its[i].y = its[i - 1].y + GAP;
      }
      var lo = H - M.b - 6, hi = M.t + 6;
      var over = its[its.length - 1].y - lo;
      if (over > 0) its.forEach(function (o) { o.y -= over; });
      if (its[0].y < hi) { var d = hi - its[0].y; its.forEach(function (o) { o.y += d; }); }
    });
    items.forEach(function (o) { o.c.lab.setAttribute('x', o.x); o.c.lab.setAttribute('y', o.y.toFixed(1)); });
  }
  function redraw() {
    axis();
    CURVES.forEach(function (c) { drawCurve(c, false); c.clip.setAttribute('width', c.on ? W * c.drawn : 0); });
    placeLabels();
    sv.setAttribute('aria-label', L('Gráfico de linhas, dopamina em % do basal de 0 a 300 minutos. Curvas ligadas: ', 'Line chart, dopamine as % of baseline from 0 to 300 minutes. Curves shown: ') +
      CURVES.filter(function (c) { return c.on; }).map(function (c) { return L(c.pt, c.en) + ' ' + L('pico de ', 'peak ') + fmt(Math.max.apply(null, c.d.map(function (p) { return p[1]; })), 0) + '%'; }).join(', ') + '.');
  }

  /* ---------- area counters ---------- */
  function counters() {
    var on = CURVES.filter(function (c) { return c.on || c.drawn > 0; });
    var maxA = Math.max.apply(null, CURVES.map(function (c) { return area(c.d); }));
    var food = area(CURVES[4].d);
    cntHead.textContent = L('área acima do basal (% × minuto)', 'area above baseline (% × minute)');
    while (cntRows.firstChild) cntRows.removeChild(cntRows.firstChild);
    if (!on.length) { DN.el('div', { class: 'w10b-empty' }, cntRows, L('Ligue uma curva acima.', 'Turn on a curve above.')); return; }
    on.sort(function (a, b) { return area(b.d) - area(a.d); }).forEach(function (c) {
      var a = area(c.d) * (c.on ? c.drawn : 0);
      var row = DN.el('div', { class: 'w10b-row' }, cntRows);
      DN.el('span', { class: 'w10b-nm' }, row, L(c.pt, c.en) + (c.id === 'morfina' ? ' ' + fmt(+dose, 0) + ' mg/kg' : ''));
      var track = DN.el('span', { class: 'w10b-track' }, row);
      var bar = DN.el('span', { class: 'w10b-bar' }, track);
      bar.style.width = 'max(2px,' + (a / maxA * 100).toFixed(2) + '%)';
      bar.style.background = C.sub[c.id];
      var ratio = c.id !== 'comida' ? ' <i>' + fmt(area(c.d) / food, area(c.d) / food < 10 ? 1 : 0) + L('× a comida', '× food') + '</i>' : '';
      DN.el('span', { class: 'w10b-val' }, row, fmt(Math.round(a / 10) * 10, 0) + (c.drawn >= 1 ? ratio : ''));
      var pk = peakOf(c), back = backOf(c), lastT = c.d[c.d.length - 1][0];
      DN.el('span', { class: 'w10b-det' }, row,
        L('pico de ', 'peak of ') + fmt(pk[1], 0) + L('% aos ', '% at ') + pk[0] + ' min · ' +
        (back != null ? L('de volta ao basal aos ', 'back to baseline at ') + back + ' min'
          : L('ainda acima do basal aos ', 'still above baseline at ') + lastT + ' min' + (lastT < 300 ? L(', fim da série', ', end of the series') : '')));
    });
  }

  function peakOf(c) { return c.d.reduce(function (a, p) { return p[1] > a[1] ? p : a; }); }
  function backOf(c) {
    var pk = peakOf(c);
    for (var i = c.d.indexOf(pk); i < c.d.length; i++) if (c.d[i][1] <= 101) return c.d[i][0];
    return null;
  }

  function table() {
    var cols = [['anfetamina', 'amphetamine'], ['cocaína', 'cocaine'], ['nicotina', 'nicotine'], ['morfina 0,5', 'morphine 0.5'], ['morfina 1', 'morphine 1'], ['morfina 2,5', 'morphine 2.5'], ['morfina 10', 'morphine 10']];
    var series = [CURVES[0].d, CURVES[1].d, CURVES[2].d, MORPH['0.5'], MORPH['1'], MORPH['2.5'], MORPH['10']];
    var h = '<table class="t"><thead><tr><th>min</th>' + cols.map(function (c) { return '<th>' + L(c[0], c[1]) + '</th>'; }).join('') + '</tr></thead><tbody>';
    for (var t = 0; t <= 300; t += 20) {
      h += '<tr><td>' + t + '</td>' + series.map(function (s) { var p = s.filter(function (q) { return q[0] === t; })[0]; return '<td>' + (p ? p[1] : '') + '</td>'; }).join('') + '</tr>';
    }
    h += '</tbody></table>';
    h += '<table class="t"><thead><tr><th>min</th><th>' + L('comida', 'food') + '</th></tr></thead><tbody>' +
      CURVES[4].d.map(function (p) { return '<tr><td>' + p[0] + '</td><td>' + p[1] + '</td></tr>'; }).join('') + '</tbody></table>';
    h += '<table class="t"><thead><tr><th>min</th><th>' + L('sexo', 'sex') + '</th></tr></thead><tbody>' +
      CURVES[5].d.map(function (p) { return '<tr><td>' + p[0] + '</td><td>' + p[1] + '</td></tr>'; }).join('') + '</tbody></table>';
    h += '<p>' + L('Valores em % do basal. Drogas: amostras de 20 minutos, núcleo accumbens, tempo zero na injeção; doses de morfina em mg/kg. Comida: amostras de 10 minutos, comendo aos 50. Sexo: amostras de 15 minutos; a série termina na última amostra publicada.',
      'Values in % of baseline. Drugs: 20 minute samples, nucleus accumbens, time zero at injection; morphine doses in mg/kg. Food: 10 minute samples, eating at 50. Sex: 15 minute samples; the series ends at the last published sample.') + '</p>';
    tblWrap.innerHTML = h;
  }

  function relabel() {
    var ratio = Math.round(area(CURVES[0].d) / area(CURVES[4].d));
    read.textContent = L('A comida sobe a 150% do basal e volta a ele 80 minutos depois. A anfetamina chega a 1.000% e continua acima do basal cinco horas depois. Somada no tempo, a área dela é ' + ratio + ' vezes a da comida.',
      'Food rises to 150% of baseline and returns to it 80 minutes later. Amphetamine reaches 1,000% and is still above baseline five hours later. Added up over time, its area is ' + ratio + ' times that of food.');
    sum.textContent = L('ver os valores digitalizados', 'see the digitized values');
    table(); redraw(); counters();
  }

  build(); relabel();
  /* draw the initial curves left to right when the chart first comes into view */
  if (!DN.RM) {
    CURVES.forEach(function (c) { if (c.on) { c.drawn = 0; c.clip.setAttribute('width', 0); } });
    placeLabels(); counters();
    DN.onVisible(holder, function (v) { if (v) CURVES.forEach(function (c) { if (c.on && c.drawn === 0) reveal(c); }); }, { once: true, threshold: 0.3 });
  }
  DN.onLang(relabel);
  var rz = 0, lastW = holder.clientWidth;
  window.addEventListener('resize', function () {
    clearTimeout(rz); rz = setTimeout(function () { if (holder.clientWidth !== lastW) { lastW = holder.clientWidth; build(); } }, 150);
  });
})();
