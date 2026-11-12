/* w05b · o-coral : distributional RL, as a static side-by-side comparison. Each
   neuron learns an expectile of the reward distribution with its own asymmetric
   learning rates; the population is decoded back into a distribution. Two lotteries
   with the same mean, after learning: one hill versus two. */
(function () {
  'use strict';
  var root = DN.body('w05b'); if (!root) return;
  var L = DN.L, C = DN.COL;

  /* ---------- risograph helpers (technique from w00) ----------
     Two spot inks, each its own layer: halftone screens at riso angles, a grain
     filter that eats into the ink, a slight misregistration, multiply overlap.
     Tokens: $0 solid ink, $1 $2 $3 light, mid, dark halftone. */
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
  /* art = {a: svg string, b: svg string}; returns defs + two ink groups */
  function riso(id, art, sd, pitch) {
    var R = rng(sd), defs = '', layers = '', pc = pitch / 2;
    INKS.forEach(function (ink, li) {
      var p = id + '-' + ink.k;
      [0.22, 0.33, 0.43].forEach(function (r, j) {
        defs += '<pattern id="' + p + 'h' + (j + 1) + '" width="' + pitch + '" height="' + pitch + '" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="' + pc + '" cy="' + pc + '" r="' + Math.round(r * pitch * 100) / 100 + '" fill="' + ink.col + '"/></pattern>';
      });
      defs += '<filter id="' + p + 'g" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="0.8" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.6" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
      var mx = f1((R() < 0.5 ? -1 : 1) * (0.4 + R() * (li ? 0.8 : 0.4)));
      var my = f1((R() < 0.5 ? -1 : 1) * (0.3 + R() * (li ? 0.7 : 0.4)));
      var body = art[ink.k].replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#' + p + 'h$1)');
      layers += '<g class="w05b-ink w05b-ink-' + ink.k + '" transform="translate(' + mx + ' ' + my + ')" opacity="' + ink.op + '" filter="url(#' + p + 'g)">' + body + '</g>';
    });
    return { defs: defs, layers: layers };
  }

  /* ---------- model ---------- */
  var N = 10, G = 41, XS = [], TAU = [];
  for (var k = 0; k < G; k++) XS.push(10 * k / (G - 1));
  for (k = 0; k < N; k++) TAU.push(0.1 + 0.8 * k / (N - 1));

  /* train the choir on a lottery: shuffled bags of ten draws, annealed learning rate */
  function train(lot) {
    var seed = 11, th = [], bag = [];
    function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
    function sample() {
      if (lot === 'five') return 5;
      if (!bag.length) {
        bag = [1, 1, 1, 1, 1, 9, 9, 9, 9, 9];
        for (var q = 9; q > 0; q--) { var j = Math.floor(rnd() * (q + 1)), t = bag[q]; bag[q] = bag[j]; bag[j] = t; }
      }
      return bag.pop();
    }
    for (var i = 0; i < N; i++) th.push(5);
    for (var r = 0; r < 400; r++) {
      var v = sample(), big = 0.02 + 0.5 * Math.exp(-r / 25);
      for (i = 0; i < N; i++) {
        var d = v - th[i], m = Math.max(TAU[i], 1 - TAU[i]);
        th[i] += big * (d > 0 ? TAU[i] : 1 - TAU[i]) / m * d;
      }
    }
    return th;
  }
  /* decode: the distribution on a grid whose expectiles match th */
  function decode(th) {
    var logits = new Float64Array(G), p = new Float64Array(G), gp = new Float64Array(G), A = [], i, kk;
    for (kk = 0; kk < G; kk++) {
      var s0 = 0;
      for (i = 0; i < N; i++) s0 += Math.exp(-Math.pow(XS[kk] - th[i], 2) / 0.72);
      logits[kk] = Math.log(s0 / N + 1e-3);
    }
    for (i = 0; i < N; i++) {
      var row = new Float64Array(G);
      for (kk = 0; kk < G; kk++) { var d = XS[kk] - th[i]; row[kk] = (d > 0 ? TAU[i] : 1 - TAU[i]) * d; }
      A.push(row);
    }
    var tlo = Math.min.apply(null, th), thi = Math.max.apply(null, th);
    for (var it = 0; it < 600; it++) {
      var mx = -1e9, S = 0;
      for (kk = 0; kk < G; kk++) mx = Math.max(mx, logits[kk]);
      for (kk = 0; kk < G; kk++) { p[kk] = Math.exp(logits[kk] - mx); S += p[kk]; }
      for (kk = 0; kk < G; kk++) { p[kk] /= S; gp[kk] = 0; }
      for (i = 0; i < N; i++) {
        var rr = 0, a = A[i];
        for (kk = 0; kk < G; kk++) rr += a[kk] * p[kk];
        for (kk = 0; kk < G; kk++) gp[kk] += 2 * rr * a[kk];
      }
      var dot = 0;
      for (kk = 0; kk < G; kk++) {
        var out = Math.max(0, tlo - XS[kk], XS[kk] - thi);
        gp[kk] += 0.2 * out * out;
        var lft = kk ? p[kk] - p[kk - 1] : 0, rgt = kk < G - 1 ? p[kk] - p[kk + 1] : 0;
        gp[kk] += 0.04 * (lft + rgt);
        dot += gp[kk] * p[kk];
      }
      for (kk = 0; kk < G; kk++) logits[kk] -= 0.02 * (gp[kk] - dot);
    }
    return Array.prototype.slice.call(p);
  }
  function meanOf(th) {
    var f = (0.5 - TAU[0]) / (TAU[N - 1] - TAU[0]) * (N - 1), i0 = Math.floor(f), w = f - i0;
    return th[i0] * (1 - w) + th[Math.min(N - 1, i0 + 1)] * w;
  }
  var LOTS = [
    { key: 'five', pt: 'sempre 5', en: 'always 5', th: train('five') },
    { key: 'half', pt: 'metade 1, metade 9', en: 'half 1, half 9', th: train('half') }
  ];
  LOTS.forEach(function (l) { l.dens = decode(l.th); l.mean = meanOf(l.th); });

  /* ---------- DOM ---------- */
  var gridEl = DN.el('div', { class: 'w05b-grid' }, root);
  LOTS.forEach(function (l, i) {
    l.box = DN.el('div', { class: 'w05b-panel' }, gridEl);
    l.head = DN.el('div', { class: 'w05b-ph' }, l.box);
    l.wrap = DN.el('div', { class: 'cvwrap w05b-wrap' }, l.box);
    l.i = i;
  });
  var note = DN.el('p', { class: 'w05b-note' }, root);
  var take = DN.el('p', { class: 'w05b-take' }, root);

  var prog = DN.RM ? 1 : 0;   /* entrance: 0 = untrained (all at 5), 1 = trained */
  var ML = 12, MR = 12;

  function build(l) {
    var W = Math.max(260, l.wrap.clientWidth || 320);
    var sp = (W - ML - MR) / N, FR = Math.min(12.5, sp * 0.4);
    var FY = 22 + FR, AY = FY + FR + 92, DY = AY + 62, DH = 74, H = DY + DH + 26;
    var x = function (v) { return ML + v / 10 * (W - ML - MR); };
    var fx = function (i) { return ML + sp * (i + 0.5); };
    l.g = { W: W, H: H, FR: FR, FY: FY, AY: AY, DY: DY, DH: DH, x: x, fx: fx };
    l.wrap.innerHTML = '';
    var svg = DN.svg('svg', { role: 'img', viewBox: '0 0 ' + W + ' ' + H, width: W, height: H }, l.wrap);
    l.g.svg = svg;
    l.g.lblL = DN.svg('text', { x: ML, y: 10, 'font-size': 9.5, fill: C.dim }, svg);
    l.g.lblR = DN.svg('text', { x: W - MR, y: 10, 'font-size': 9.5, fill: C.dim, 'text-anchor': 'end' }, svg);
    var gL = DN.svg('g', null, svg), gT = DN.svg('g', null, svg), gF = DN.svg('g', { class: 'w05b-face' }, svg);
    l.g.links = []; l.g.ticks = [];
    for (var i = 0; i < N; i++) {
      l.g.links.push(DN.svg('path', { fill: 'none', stroke: TAU[i] > 0.5 ? C.dopa : C.pausa, 'stroke-opacity': 0.45, 'stroke-width': 1 }, gL));
      l.g.ticks.push(DN.svg('line', { y1: AY - 11, y2: AY, stroke: C.ink, 'stroke-width': 1.6 }, gT));
    }
    var rz = riso('w05b-r' + l.i, faceArt(l.g), 557 + l.i * 31, W < 340 ? 2.5 : 2.7);
    gF.innerHTML = '<defs>' + rz.defs + '</defs>' + rz.layers;
    /* axis */
    DN.svg('line', { x1: x(0), x2: x(10), y1: AY, y2: AY, stroke: C.ink }, svg);
    [0, 1, 5, 9, 10].forEach(function (v) {
      DN.svg('line', { x1: x(v), x2: x(v), y1: AY, y2: AY + 4, stroke: C.ink }, svg);
      DN.svg('text', { x: x(v), y: AY + 15, 'text-anchor': 'middle', 'font-size': 9.5, fill: C.dim }, svg).textContent = v;
    });
    l.g.axl = DN.svg('text', { x: W - MR, y: AY + 29, 'text-anchor': 'end', 'font-size': 9.5, fill: C.dim }, svg);
    /* density panel with the true distribution as dashed bars */
    DN.svg('line', { x1: x(0), x2: x(10), y1: DY + DH, y2: DY + DH, stroke: C.ink }, svg);
    var gh = '', bw = (x(10) - x(0)) / (G - 1) * 0.9;
    (l.key === 'five' ? [[5, 1]] : [[1, 1], [9, 1]]).forEach(function (q) {
      var X = x(q[0]), Y = DY + DH - 0.86 * DH * q[1];
      gh += 'M' + (X - bw) + ' ' + (DY + DH) + 'V' + Y + 'H' + (X + bw) + 'V' + (DY + DH);
    });
    DN.svg('path', { d: gh, fill: 'none', stroke: C.ink, 'stroke-dasharray': '3 3', opacity: 0.6 }, svg);
    l.g.area = DN.svg('path', { fill: C.dopaSoft, stroke: 'none' }, svg);
    l.g.curve = DN.svg('path', { fill: 'none', stroke: C.ink, 'stroke-width': 1.6 }, svg);
    /* mean marker */
    var mxp = x(l.mean);
    DN.svg('line', { x1: mxp, x2: mxp, y1: DY - 4, y2: DY + DH, stroke: C.ink, 'stroke-width': 1, 'stroke-dasharray': '1 3' }, svg);
    l.g.meanT = DN.svg('text', { x: mxp, y: DY - 8, 'text-anchor': 'middle', 'font-size': 10, 'font-weight': 700, fill: C.ink, class: 'w05b-halo' }, svg);
    /* legend row */
    var ly = DY + DH + 18;
    DN.svg('rect', { x: ML, y: ly - 7, width: 12, height: 7, fill: C.dopaSoft }, svg);
    DN.svg('line', { x1: ML, x2: ML + 12, y1: ly - 7, y2: ly - 7, stroke: C.ink, 'stroke-width': 1.6 }, svg);
    l.g.dl = DN.svg('text', { x: ML + 17, y: ly, 'font-size': 9.5, fill: C.dim }, svg);
    l.g.tl = DN.svg('text', { x: W - MR, y: ly, 'font-size': 9.5, fill: C.dim, 'text-anchor': 'end' }, svg);
    l.g.tlr = DN.svg('path', { fill: 'none', stroke: C.ink, 'stroke-dasharray': '2 2', opacity: 0.6 }, svg);
    draw(l);
  }

  function faceArt(g) {
    var a = '', b = '', r = g.FR;
    for (var i = 0; i < N; i++) {
      var w = TAU[i], X = f1(g.fx(i)), T = 'translate(' + X + ' ' + f1(g.FY) + ')';
      var ta = w > 0.66 ? '$3' : w > 0.45 ? '$2' : w > 0.3 ? '$1' : '';
      var tb = w < 0.34 ? '$2' : w < 0.55 ? '$1' : '';
      var e = f1(r * 0.36), ey = f1(-r * 0.14), er = f1(Math.max(1.2, r * 0.13));
      var curv = (w - 0.5) * 2, my = r * 0.36 - curv * r * 0.08, mw = r * 0.46;
      a += '<g transform="' + T + '">' + (ta ? '<circle r="' + f1(r) + '" fill="' + ta + '"/>' : '') +
        (w > 0.6 ? '<circle cx="' + f1(-r * 0.56) + '" cy="' + f1(r * 0.2) + '" r="' + f1(r * 0.17) + '" fill="$0"/><circle cx="' + f1(r * 0.56) + '" cy="' + f1(r * 0.2) + '" r="' + f1(r * 0.17) + '" fill="$0"/>' : '') +
        '</g>';
      b += '<g transform="' + T + '">' + (tb ? '<circle r="' + f1(r) + '" fill="' + tb + '"/>' : '') +
        '<circle r="' + f1(r - 0.7) + '" fill="none" stroke="$0" stroke-width="1.4"/>' +
        '<circle cx="' + (-e) + '" cy="' + ey + '" r="' + er + '" fill="$0"/><circle cx="' + e + '" cy="' + ey + '" r="' + er + '" fill="$0"/>' +
        '<path d="M' + f1(-mw) + ' ' + f1(my) + 'Q0 ' + f1(my + curv * r * 0.5) + ' ' + f1(mw) + ' ' + f1(my) + '" fill="none" stroke="$0" stroke-width="1.5" stroke-linecap="round"/>';
      if (w < 0.3) {
        var bw = r * 0.24, by = -r * 0.46, tilt = (0.3 - w) * r * 0.9;
        b += '<path d="M' + f1(-e - bw) + ' ' + f1(by + tilt * 0.2) + 'L' + f1(-e + bw) + ' ' + f1(by - tilt) + 'M' + f1(e - bw) + ' ' + f1(by - tilt) + 'L' + f1(e + bw) + ' ' + f1(by + tilt * 0.2) + '" stroke="$0" stroke-width="1.2" stroke-linecap="round" fill="none"/>';
      }
      b += '</g>';
    }
    return { a: a, b: b };
  }

  var FLAT = decode([5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
  function curvePath(g, arr) {
    var mx = 0, k2, pts = [];
    for (k2 = 0; k2 < G; k2++) mx = Math.max(mx, arr[k2]);
    var sc = 0.86 * g.DH / Math.max(mx, 0.02);
    for (k2 = 0; k2 < G; k2++) {
      var v = arr[k2] * 0.5 + (k2 ? arr[k2 - 1] : arr[k2]) * 0.25 + (k2 < G - 1 ? arr[k2 + 1] : arr[k2]) * 0.25;
      pts.push([g.x(XS[k2]), g.DY + g.DH - Math.min(g.DH, v * sc)]);
    }
    var d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for (k2 = 1; k2 < pts.length; k2++) {
      var p0 = pts[k2 - 2] || pts[k2 - 1], p1 = pts[k2 - 1], p2 = pts[k2], p3 = pts[k2 + 1] || p2;
      d += 'C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ' ' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + ' ' +
        (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ' ' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + ' ' + p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
    }
    return d;
  }
  function draw(l) {
    var g = l.g; if (!g) return;
    var e = 1 - Math.pow(1 - prog, 3);
    for (var i = 0; i < N; i++) {
      var X = g.fx(i), T = g.x(5 + (l.th[i] - 5) * e), y0 = g.FY + g.FR + 3, y1 = g.AY - 12;
      g.links[i].setAttribute('d', 'M' + X.toFixed(1) + ' ' + y0 + 'C' + X.toFixed(1) + ' ' + ((y0 + y1) / 2) + ' ' + T.toFixed(1) + ' ' + ((y0 + y1) / 2) + ' ' + T.toFixed(1) + ' ' + y1);
      g.ticks[i].setAttribute('x1', T.toFixed(1)); g.ticks[i].setAttribute('x2', T.toFixed(1));
    }
    var arr = l.dens.map(function (v, k2) { return FLAT[k2] + (v - FLAT[k2]) * e; });
    var d = curvePath(g, arr);
    g.curve.setAttribute('d', d);
    g.area.setAttribute('d', d + 'L' + g.x(10) + ' ' + (g.DY + g.DH) + 'L' + g.x(0) + ' ' + (g.DY + g.DH) + 'Z');
  }

  function relabel() {
    LOTS.forEach(function (l) {
      l.head.innerHTML = '<span>' + L('loteria', 'lottery') + '</span><b>' + L(l.pt, l.en) + '</b>';
      var g = l.g; if (!g) return;
      g.lblL.textContent = L('mais pessimista', 'most pessimistic');
      g.lblR.textContent = L('mais otimista', 'most optimistic');
      g.axl.textContent = L('ponto de referência de cada neurônio', 'each neuron’s reference point');
      g.meanT.textContent = L('média ', 'mean ') + DN.fmt(l.mean, 1);
      g.dl.textContent = l.key === 'five' ? L('reconstruída: uma colina', 'decoded: one hill') : L('reconstruída: duas colinas', 'decoded: two hills');
      g.tl.textContent = L('real', 'true');
      var tw = 0; try { tw = g.tl.getComputedTextLength(); } catch (e) {}
      var lx = g.W - MR - tw - 18, ly = g.DY + g.DH + 18;
      g.tlr.setAttribute('d', 'M' + lx + ' ' + ly + 'V' + (ly - 8) + 'H' + (lx + 12) + 'V' + ly);
      g.svg.setAttribute('aria-label', L('Loteria ' + l.pt + '. Dez neurônios, do pessimista ao otimista, com seus pontos de referência depois de aprender, e a distribuição que reconstroem. Média ' + DN.fmt(l.mean, 1) + '.',
        'Lottery ' + l.en + '. Ten neurons, from pessimist to optimist, with their reference points after learning, and the distribution they decode. Mean ' + DN.fmt(l.mean, 1) + '.'));
    });
    note.textContent = L('O mesmo cálculo roda em agentes de inteligência artificial que aprendem a distribuição inteira das recompensas (DeepMind, 2017).',
      'The same math runs in artificial agents that learn the whole distribution of rewards (DeepMind, 2017).');
    take.textContent = L('As duas loterias têm a mesma média, 5. Os pessimistas e os otimistas se espalham de jeitos diferentes em cada uma, e juntos reconstroem a forma: uma colina para o prêmio fixo, duas colinas para o prêmio de 1 ou 9.',
      'Both lotteries have the same mean, 5. Pessimists and optimists spread out differently in each, and together they rebuild the shape: one hill for the fixed prize, two hills for a prize of 1 or 9.');
  }

  function buildAll() { LOTS.forEach(build); relabel(); }
  buildAll();
  DN.onLang(relabel);
  /* entrance: the choir learns once, the first time it is seen */
  if (!DN.RM) DN.onVisible(gridEl, function (v) {
    if (!v) return;
    var t0 = performance.now();
    (function step(now) {
      prog = Math.min(1, (now - t0) / 1600);
      LOTS.forEach(draw);
      if (prog < 1) requestAnimationFrame(step);
    })(t0);
  }, { once: true, threshold: 0.4 });
  var rt, lw = gridEl.clientWidth;
  window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(function () { if (gridEl.clientWidth !== lw) { lw = gridEl.clientWidth; buildAll(); } }, 160);
  });
})();
