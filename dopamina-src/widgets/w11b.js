/* w11b · a-curva-em-j : effect of a social media pause by its duration, plus an effect-size ruler */
(function () {
  'use strict';
  var root = DN.body('w11b'); if (!root) return;
  var L = DN.L, fmt = DN.fmt;

  /* illustrative quadratic shape (Thrul et al. 2025): negative under 7 days, best near 21 */
  function J(d) { return d <= 21 ? 0.25 - 0.00119 * (d - 21) * (d - 21) : 0.25 - 0.00025 * (d - 21) * (d - 21); }
  function U(d) { return 0.12 + 0.004 * Math.abs(d - 14); }

  var STUDIES = [
    { k: 'ig', v: 0.04, lab: ['Instagram, 6 semanas', 'Instagram, 6 weeks'], sh: ['Instagram, 6 sem.', 'Instagram, 6 wk'] },
    { k: 'fb20', v: 0.06, lab: ['Facebook 2020, 6 semanas', 'Facebook 2020, 6 weeks'], sh: ['Facebook 2020, 6 sem.', 'Facebook 2020, 6 wk'] },
    { k: 'fb18', v: 0.09, lab: ['Facebook 2018, 4 semanas', 'Facebook 2018, 4 weeks'], sh: ['Facebook 2018, 4 sem.', 'Facebook 2018, 4 wk'] },
    { k: 'meta', v: 0.16, lab: ['média, pausas de 1 semana ou mais', 'mean, pauses of 1 week or more'], sh: ['média, 1 semana ou mais', 'mean, 1 week or more'] },
    { k: 'mob', v: 0.45, v2: 0.56, lab: ['internet móvel bloqueada, 2 semanas', 'mobile internet blocked, 2 weeks'], sh: ['internet móvel, 2 sem.', 'mobile internet, 2 wk'] }
  ];

  var dur = 21;
  root.innerHTML = '';
  var svgWrap = DN.el('div', { 'class': 'w11b-svgw' }, root);
  var take = DN.el('p', { 'class': 'w11b-take' }, root);

  var G = {}, svg, gDot, studyEls = {};
  function render() {
    var W = Math.max(280, Math.round(root.clientWidth || 600)), mob = W < 520;
    G = { W: W, mob: mob, x0: mob ? 34 : 44, x1: W - 10, t: 28, h: mob ? 190 : 210 };
    G.yb = G.t + G.h;
    G.rt = G.yb + 66;             /* ruler title */
    G.ry = G.rt + (mob ? 94 : 112); /* ruler axis line */
    G.H = G.ry + (mob ? 50 : 34);
    var ymin = -0.42, ymax = 0.48;
    G.X = function (d) { return G.x0 + (d - 1) / 41 * (G.x1 - G.x0); };
    G.Y = function (v) { return G.t + (ymax - v) / (ymax - ymin) * G.h; };
    G.R = function (v) { return G.x0 + v / 0.7 * (G.x1 - G.x0); };

    svgWrap.innerHTML = '';
    svg = DN.svg('svg', { viewBox: '0 0 ' + W + ' ' + G.H, width: W, height: G.H, role: 'img' }, svgWrap);
    svg.setAttribute('aria-label', L(
      'Em cima, o efeito no humor pela duração da pausa nas redes: negativo abaixo de 7 dias, média de menos 0,175; positivo acima, média de 0,156, com o melhor perto de 21 dias. Embaixo, uma régua de tamanhos de efeito de 0 a 0,7 desvio padrão: Instagram 0,04, Facebook 2020 0,06, Facebook 2018 0,09, média dos estudos de uma semana ou mais 0,16, internet móvel bloqueada 0,45 a 0,56.',
      'Top: mood effect by length of the social media pause: negative under 7 days, mean minus 0.175; positive above, mean 0.156, best near 21 days. Bottom: an effect size ruler from 0 to 0.7 standard deviations: Instagram 0.04, Facebook 2020 0.06, Facebook 2018 0.09, mean of studies of one week or more 0.16, mobile internet blocked 0.45 to 0.56.'));
    var X = G.X, Y = G.Y, R = G.R;

    /* --- panel 1: the J curve --- */
    var t = DN.svg('text', { x: 0, y: 11, 'class': 'w11b-pt' }, svg);
    t.textContent = L('efeito no humor (d) pela duração da pausa', 'mood effect (d) by pause length');
    [-0.2, 0.2, 0.4].forEach(function (v) {
      DN.svg('line', { x1: G.x0, x2: G.x1, y1: Y(v), y2: Y(v), 'class': 'w11b-grid' }, svg);
      var tx = DN.svg('text', { x: G.x0 - 6, y: Y(v) + 3.5, 'class': 'w11b-tk', 'text-anchor': 'end' }, svg);
      tx.textContent = (v > 0 ? '+' : '−') + fmt(Math.abs(v), 1);
    });
    var tz = DN.svg('text', { x: G.x0 - 6, y: Y(0) + 3.5, 'class': 'w11b-tk', 'text-anchor': 'end' }, svg);
    tz.textContent = '0';
    DN.svg('rect', { x: X(1), y: G.t, width: X(7) - X(1), height: G.h, 'class': 'w11b-neg' }, svg);
    /* uncertainty band */
    var up = [], dn = [];
    for (var d = 1; d <= 42; d += 0.5) { up.push([X(d), Y(J(d) + U(d))]); dn.unshift([X(d), Y(J(d) - U(d))]); }
    DN.svg('path', { d: 'M' + up.concat(dn).map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join('L') + 'Z', 'class': 'w11b-band' }, svg);
    DN.svg('line', { x1: G.x0, x2: G.x1, y1: Y(0), y2: Y(0), 'class': 'w11b-zero' }, svg);
    var cp = [];
    for (d = 1; d <= 42; d += 0.5) cp.push(X(d).toFixed(1) + ',' + Y(J(d)).toFixed(1));
    DN.svg('path', { d: 'M' + cp.join('L'), 'class': 'w11b-curve' }, svg);
    /* group means: the measured numbers */
    DN.svg('line', { x1: X(1), x2: X(7), y1: Y(-0.175), y2: Y(-0.175), 'class': 'w11b-mean neg' }, svg);
    DN.svg('line', { x1: X(7), x2: X(42), y1: Y(0.156), y2: Y(0.156), 'class': 'w11b-mean pos' }, svg);
    var m1 = DN.svg('text', { x: X(1) + 4, y: G.yb - 7, 'class': 'w11b-ml neg' }, null);
    m1.textContent = '−' + fmt(0.175, 3) + L(' média, menos de 7 dias', ' mean, under 7 days');
    var m2 = DN.svg('text', { x: X(38), y: Y(0.156) + 15, 'class': 'w11b-ml pos', 'text-anchor': 'end' }, null);
    m2.textContent = '+' + fmt(0.156, 3) + L(' média, 7 dias ou mais', ' mean, 7 days or more');
    var pk = DN.svg('text', { x: X(21), y: Y(J(21) + U(21)) - 6, 'class': 'w11b-pk', 'text-anchor': 'middle' }, null);
    pk.textContent = L('melhor perto de 3 semanas', 'best near 3 weeks');
    [1, 7, 14, 21, 28, 42].forEach(function (dd) {
      var tx = DN.svg('text', { x: X(dd), y: G.yb + 16, 'class': 'w11b-tk', 'text-anchor': dd === 42 ? 'end' : 'middle' }, svg);
      tx.textContent = dd === 42 ? L('42 dias', '42 days') : String(dd);
    });
    var cap = DN.svg('text', { x: G.x0, y: G.yb + 34, 'class': 'w11b-note' }, svg);
    cap.textContent = mob ? L('forma ilustrativa; faixa = incerteza', 'illustrative shape; band = uncertainty') : L('forma ilustrativa da relação quadrática; faixa = incerteza larga', 'illustrative shape of the quadratic fit; band = wide uncertainty');
    gDot = DN.svg('g', null, svg);
    /* labels sit above the cursor with a paper halo */
    var gLab = DN.svg('g', { 'class': 'w11b-labs' }, svg);
    [m1, m2, pk].forEach(function (e) { gLab.appendChild(e); });
    G.boxes = [m1, m2].map(function (e) { try { return e.getBBox(); } catch (er) { return null; } }).filter(Boolean);

    /* --- panel 2: the ruler --- */
    var t2 = DN.svg('text', { x: 0, y: G.rt, 'class': 'w11b-pt' }, svg);
    t2.textContent = L('tamanho do efeito, em desvios padrão', 'effect size, in standard deviations');
    DN.svg('line', { x1: R(0), x2: R(0.7), y1: G.ry, y2: G.ry, 'class': 'w11b-zero' }, svg);
    for (var v = 0; v <= 0.7001; v += 0.1) {
      DN.svg('line', { x1: R(v), x2: R(v), y1: G.ry, y2: G.ry + 5, 'class': 'w11b-zero' }, svg);
      var tv = DN.svg('text', { x: R(v), y: G.ry + 18, 'class': 'w11b-tk', 'text-anchor': v > 0.69 ? 'end' : 'middle' }, svg);
      tv.textContent = fmt(+v.toFixed(1), 1);
    }
    /* label rows: three stacked rows for the crowded small effects */
    /* one row per study, ordered by value so no leader line crosses a label */
    var rowY = [G.rt + 20, G.rt + 38, G.rt + 56, G.rt + 74, G.rt + 92];
    var place = { ig: 0, fb20: 1, fb18: 2, meta: 3, mob: 4 };
    studyEls = {};
    STUDIES.forEach(function (s) {
      var g = DN.svg('g', { 'class': 'w11b-st' + (s.k === 'meta' ? ' on' : '') }, svg);
      var x = R(s.v), ry = rowY[place[s.k]], below = mob && s.k === 'mob';
      if (below) ry = G.ry + 40;
      if (s.v2 != null) DN.svg('rect', { x: R(s.v), y: G.ry - 5, width: R(s.v2) - R(s.v), height: 10, rx: 5, 'class': 'w11b-range' }, g);
      if (below) DN.svg('line', { x1: x, x2: x, y1: G.ry + 6, y2: ry - 11, 'class': 'w11b-lead' }, g);
      else DN.svg('line', { x1: x, x2: x, y1: ry + 4, y2: G.ry - 6, 'class': 'w11b-lead' }, g);
      DN.svg('circle', { cx: x, cy: G.ry, r: 5, 'class': 'w11b-m' }, g);
      if (s.v2 != null) DN.svg('circle', { cx: R(s.v2), cy: G.ry, r: 5, 'class': 'w11b-m' }, g);
      var num = s.v2 != null ? fmt(s.v, 2) + L(' a ', ' to ') + fmt(s.v2, 2) : fmt(s.v, 2);
      var str = (mob ? L(s.sh[0], s.sh[1]) : L(s.lab[0], s.lab[1])) + ' · ' + num;
      var w = str.length * 6.4, right = x - 3 + w > G.x1;
      var ax = right ? Math.max(x + 3, w) : x - 3;
      if (s.v2 != null && right) ax = Math.max(R(s.v2) + 3, w);
      if (below) { right = true; ax = G.x1; }
      var tx = DN.svg('text', { x: ax, y: ry, 'class': 'w11b-sl', 'text-anchor': right ? 'end' : 'start' }, g);
      tx.textContent = str;
      studyEls[s.k] = g;
    });
    update(false);
  }

  function update() {
    var X = G.X, Y = G.Y, f = J(dur);
    gDot.innerHTML = '';
    /* the optimum near three weeks: a dotted drop line from the peak to the axis */
    var segs = [[Y(f) + 8, G.yb]], cx = X(dur);
    (G.boxes || []).forEach(function (b) {
      if (cx < b.x - 3 || cx > b.x + b.width + 3) return;
      var a = b.y - 3, z = b.y + b.height + 3, out = [];
      segs.forEach(function (sg) {
        if (z <= sg[0] || a >= sg[1]) { out.push(sg); return; }
        if (a > sg[0]) out.push([sg[0], a]);
        if (z < sg[1]) out.push([z, sg[1]]);
      });
      segs = out;
    });
    segs.forEach(function (sg) { DN.svg('line', { x1: cx, x2: cx, y1: sg[0], y2: sg[1], 'class': 'w11b-cl' }, gDot); });
    DN.svg('circle', { cx: cx, cy: Y(f), r: 6.5, 'class': 'w11b-dot pos' }, gDot);
  }

  function relabel() {
    take.textContent = L('Menos de uma semana de pausa piorou o humor. Uma semana ou mais melhorou, e o melhor resultado veio perto de três semanas.',
      'Pauses under a week made mood worse. A week or more improved it, and the best result came near three weeks.');
    render();
  }
  relabel();
  DN.onLang(relabel);
  var rt = 0, lastW = root.clientWidth;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { if (Math.abs(root.clientWidth - lastW) > 2) { lastW = root.clientWidth; render(); } }, 150);
  });
})();
