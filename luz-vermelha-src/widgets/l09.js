/* l09 · longe-do-painel : how much of a panel's light is left when you step back from 15 to 30 cm
   Curves: dossier model for a uniform 30 x 90 cm panel normalised at 15 cm [S].
   Below: advertised vs measured irradiance for five panels, from affiliate sites [S]. */
(function () {
  'use strict';
  var root = DN.body('l09'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, S = DN.svg, E = DN.el, C = DN.COL;

  /* ---------- data ---------- */
  var DX = [5, 10, 15, 30, 45, 60, 90, 120];
  var BIG = [137, 119, 100, 59, 37, 25, 13, 8];
  var LENS = [106, 104, 100, 76, 56, 41, 24, 15];
  function point(d) { return 100 * (15 / d) * (15 / d); }
  var PANELS = [
    { n: 'PlatinumLED BIOMAX 900', adv: 135, m: 90.3, pct: 33 },
    { n: 'Hooga PRO1500', adv: 189, m: 86, pct: 54 },
    { n: 'Bestqool Pro100', advLo: 90, adv: 109, m: 51.7, pct: 43, at75: true },
    { n: 'Joovv Solo 3.0', adv: 100, more: true, m: 59.2, pct: 41 },
    { n: 'Mito MitoPRO 1500X', adv: 160, more: true, m: 68, pct: 57 }
  ];
  var GUESS = [
    { k: 'half', v: 50, pt: 'cerca de metade', en: 'about half' },
    { k: 'quarter', v: 25, pt: 'um quarto', en: 'a quarter' },
    { k: 'eighth', v: 12.5, pt: 'um oitavo', en: 'an eighth' }
  ];

  /* monotone cubic through the dossier table */
  function mono(xs, ys) {
    var n = xs.length, d = [], m = [], i;
    for (i = 0; i < n - 1; i++) d[i] = (ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]);
    m[0] = d[0]; m[n - 1] = d[n - 2];
    for (i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : 2 / (1 / d[i - 1] + 1 / d[i]);
    return function (x) {
      var k = 0; while (k < n - 2 && x > xs[k + 1]) k++;
      var h = xs[k + 1] - xs[k], t = (x - xs[k]) / h, t2 = t * t, t3 = t2 * t;
      return (2 * t3 - 3 * t2 + 1) * ys[k] + (t3 - 2 * t2 + t) * h * m[k] + (-2 * t3 + 3 * t2) * ys[k + 1] + (t3 - t2) * h * m[k + 1];
    };
  }
  var fBig = mono(DX, BIG), fLens = mono(DX, LENS);

  var st = { guess: null, shown: DN.RM, played: false };

  /* ---------- DOM ---------- */
  var top = E('div', { class: 'l09-top' }, root);
  var sceneW = E('div', { class: 'l09-scene' }, top);
  var scene = S('svg', { role: 'img', 'aria-labelledby': 'l09-st' }, sceneW);
  var ask = E('div', { class: 'l09-ask' }, top);
  var askP = E('p', { class: 'l09-q' }, ask);
  var btnRow = E('div', { class: 'l09-btns', role: 'group' }, ask);
  var GB = GUESS.map(function (g) {
    var b = E('button', { type: 'button', class: 'l09-g', 'aria-pressed': 'false' }, btnRow);
    b.addEventListener('click', function () { choose(g.k); });
    return b;
  });
  var skip = E('button', { type: 'button', class: 'l09-skip' }, ask);
  skip.addEventListener('click', function () { choose('skip'); });
  var live = E('p', { class: 'live l09-live', 'aria-live': 'polite' }, ask);

  var p1 = E('div', { class: 'l09-p1' }, root);
  var p1h = E('p', { class: 'l09-ph' }, p1);
  var leg = E('div', { class: 'l09-leg' }, p1);
  var chW = E('div', { class: 'l09-ch' }, p1);
  var ch = S('svg', { role: 'img', 'aria-labelledby': 'l09-ct' }, chW);
  var call = E('p', { class: 'l09-call' }, p1);
  var take = E('p', { class: 'l09-take' }, root);

  var p2 = E('div', { class: 'l09-p2' }, root);
  var p2h = E('p', { class: 'l09-ph' }, p2);
  var seal = E('p', { class: 'l09-seal' }, p2);
  var dbW = E('div', { class: 'l09-db' }, p2);
  var db = S('svg', { role: 'img', 'aria-labelledby': 'l09-dt' }, dbW);
  var tbl = E('div', { class: 'sr' }, root);

  /* ---------- risograph inks ---------- */
  var INKS = [
    { k: 'a', col: C.rubi, ang: 15, op: 0.95, mx: 0.8, my: -0.6, seed: [419, 613] },
    { k: 'b', col: C.infra, ang: 75, op: 0.92, mx: -1.1, my: 1.0, seed: [907, 37] }
  ];
  function inkDefs(defs, p0) {
    INKS.forEach(function (ink) {
      var p = p0 + ink.k;
      [0.5, 0.82, 1.15].forEach(function (r, j) {
        var pt = S('pattern', { id: p + 'h' + (j + 1), width: 2.8, height: 2.8, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(' + ink.ang + ')' }, defs);
        S('circle', { cx: 1.4, cy: 1.4, r: r, fill: ink.col }, pt);
      });
      var f = S('filter', { id: p + 'g', x: '-5%', y: '-5%', width: '110%', height: '110%', 'color-interpolation-filters': 'sRGB' }, defs);
      S('feTurbulence', { type: 'fractalNoise', baseFrequency: 0.07, numOctaves: 2, seed: ink.seed[0], result: 'w' }, f);
      S('feDisplacementMap', { in: 'SourceGraphic', in2: 'w', scale: 1.5, xChannelSelector: 'R', yChannelSelector: 'G', result: 'd' }, f);
      S('feTurbulence', { type: 'fractalNoise', baseFrequency: 0.9, numOctaves: 2, seed: ink.seed[1], result: 'n' }, f);
      S('feColorMatrix', { in: 'n', type: 'matrix', values: '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.6', result: 'm' }, f);
      S('feComposite', { in: 'd', in2: 'm', operator: 'in' }, f);
    });
  }

  /* ---------- the scene: panel 30 x 90 cm (seen edge on) and a person of 1.70 m, real scale ---------- */
  var SC = {};
  function buildScene() {
    while (scene.firstChild) scene.removeChild(scene.firstChild);
    var mob = (root.clientWidth || 600) < 520;
    var k = mob ? 1.25 : 1.4;               /* px per cm */
    var Wd = mob ? 300 : 250, Hd = 190 * k + 64;
    var floor = 184 * k + 26;
    var px0 = mob ? 92 : 70;                /* x of the panel's front face at gap 0 reference, px */
    SC = { k: k, floor: floor, face: px0, W: Wd, H: Hd };
    scene.setAttribute('viewBox', '0 0 ' + Wd + ' ' + Hd);
    scene.setAttribute('width', Wd); scene.setAttribute('height', Hd);
    S('title', { id: 'l09-st' }, scene).textContent = L('Uma pessoa de 1,70 m de perfil diante de um painel de 90 cm de altura, a 15 cm e depois a 30 cm.', 'A 1.70 m person in profile in front of a 90 cm tall panel, at 15 cm and then at 30 cm.');
    var defs = S('defs', null, scene);
    inkDefs(defs, 'l09-s');
    function X(cm) { return px0 + cm * k; }
    function Y(cm) { return floor - cm * k; }
    SC.X = X; SC.Y = Y;
    S('line', { x1: 4, x2: Wd - 4, y1: floor + 0.5, y2: floor + 0.5, class: 'l09-floor' }, scene);
    var layers = {};
    INKS.forEach(function (o) {
      layers[o.k] = S('g', { class: 'l09-ink', transform: 'translate(' + o.mx + ' ' + o.my + ')', opacity: o.op, filter: 'url(#l09-s' + o.k + 'g)' }, scene);
    });
    var a = layers.a, b = layers.b;
    function ha(t) { return 'url(#l09-sah' + t + ')'; }
    function hb(t) { return 'url(#l09-sbh' + t + ')'; }
    /* panel: 6 cm deep, from 80 to 170 cm, on a pole */
    S('rect', { x: X(-6), y: Y(170), width: 6 * k, height: 90 * k, fill: C.infra }, b);
    S('rect', { x: X(-4.5), y: Y(80), width: 3 * k, height: 80 * k - 0, fill: hb(3) }, b);
    S('rect', { x: X(-22), y: Y(2), width: 34 * k, height: 2 * k + 1, fill: C.infra }, b);
    for (var h = 83; h < 170; h += 4.5) S('rect', { x: X(-0.6), y: Y(h + 1.2), width: 2.2, height: 1.2 * k, fill: C.rubi }, a);
    /* light cone (drawn by setGap) */
    SC.cone = S('path', { fill: ha(3) }, a);
    SC.cone2 = S('path', { fill: ha(1) }, a);
    /* person, profile facing the panel; x = 0 is the front of the chest */
    var pg = S('g', null, b), pa = S('g', null, a);
    SC.pB = pg; SC.pA = pa;
    function P(pts) { return pts.map(function (q, i) { return (i ? 'L' : 'M') + (q[0] * k).toFixed(1) + ',' + (-q[1] * k).toFixed(1); }).join('') + 'Z'; }
    /* trousers */
    S('path', { d: P([[2, 94], [23, 94], [21, 3], [13.5, 3], [12.5, 60], [11, 3], [4, 3]]), fill: hb(3) }, pg);
    S('path', { d: P([[-3, 0], [14, 0], [14, 4], [-1, 4]]), fill: C.infra }, pg);
    /* shirt and arm */
    S('path', { d: 'M' + (2 * k) + ',' + (-147 * k) + ' C' + (-2 * k) + ',' + (-138 * k) + ' ' + (-2 * k) + ',' + (-118 * k) + ' ' + (1 * k) + ',' + (-104 * k) + ' L' + (2 * k) + ',' + (-92 * k) + ' L' + (23 * k) + ',' + (-92 * k) + ' C' + (25 * k) + ',' + (-112 * k) + ' ' + (26 * k) + ',' + (-132 * k) + ' ' + (22 * k) + ',' + (-147 * k) + ' Z', fill: hb(1), stroke: C.infra, 'stroke-width': 1.4 }, pg);
    S('path', { d: P([[8, 142], [16, 142], [16.5, 86], [9, 86]]), fill: hb(2) }, pg);
    S('ellipse', { cx: 12.5 * k, cy: -84 * k, rx: 3.6 * k, ry: 4.2 * k, fill: 'none', stroke: C.infra, 'stroke-width': 1.3 }, pg);
    /* neck and head: skin as an outline, hair in plum halftone */
    S('path', { d: P([[6, 146], [13, 146], [13, 151], [6, 151]]), fill: 'none', stroke: C.infra, 'stroke-width': 1.3 }, pg);
    S('ellipse', { cx: 9.5 * k, cy: -159 * k, rx: 10.5 * k, ry: 12 * k, fill: 'none', stroke: C.infra, 'stroke-width': 1.5 }, pg);
    S('path', { d: 'M' + (-0.8 * k) + ',' + (-161 * k) + ' L' + (-3 * k) + ',' + (-156 * k) + ' L' + (-0.4 * k) + ',' + (-155 * k), fill: 'none', stroke: C.infra, 'stroke-width': 1.3, 'stroke-linejoin': 'round' }, pg);
    S('path', { d: 'M' + (2 * k) + ',' + (-167 * k) + ' C' + (6 * k) + ',' + (-173 * k) + ' ' + (16 * k) + ',' + (-173 * k) + ' ' + (20 * k) + ',' + (-162 * k) + ' L' + (19.5 * k) + ',' + (-152 * k) + ' C' + (16 * k) + ',' + (-156 * k) + ' ' + (12 * k) + ',' + (-162 * k) + ' ' + (4 * k) + ',' + (-164 * k) + ' Z', fill: hb(3) }, pg);
    /* the light that lands on the skin, ruby halftone on the face and shirt front */
    SC.glow = S('path', { d: 'M' + (-1.5 * k) + ',' + (-168 * k) + ' L' + (3 * k) + ',' + (-168 * k) + ' L' + (3 * k) + ',' + (-90 * k) + ' L' + (1 * k) + ',' + (-90 * k) + ' Z', fill: ha(3) }, pa);
    /* dimension line */
    SC.dim = S('g', { class: 'l09-dim' }, scene);
    SC.dl = S('line', { y1: floor + 12, y2: floor + 12 }, SC.dim);
    SC.dl0 = S('line', { y1: floor + 7, y2: floor + 17 }, SC.dim);
    SC.dl1 = S('line', { y1: floor + 7, y2: floor + 17 }, SC.dim);
    SC.dt = S('text', { y: floor + 31, 'text-anchor': 'middle' }, SC.dim);
    var lab = S('g', { class: 'l09-slab' }, scene);
    var t1 = S('text', { x: X(0), y: Y(170) - 19, 'text-anchor': 'end' }, lab); t1.textContent = L('painel', 'panel');
    var t2 = S('text', { x: X(0), y: Y(170) - 6, 'text-anchor': 'end', class: 'l09-slab2' }, lab); t2.textContent = '30 × 90 cm';
    SC.pl1 = S('text', { y: Y(170) - 6, 'text-anchor': 'start' }, lab); SC.pl1.textContent = '1,70 m'.replace(',', L(',', '.'));
    setGap(st.shown ? 30 : 15);
  }
  function setGap(g) {
    st.gap = g;
    var k = SC.k, X = SC.X, Y = SC.Y;
    var bx = X(g);
    SC.pB.setAttribute('transform', 'translate(' + bx.toFixed(1) + ' ' + SC.floor + ')');
    SC.pA.setAttribute('transform', 'translate(' + bx.toFixed(1) + ' ' + SC.floor + ')');
    var spread = g * 0.35;
    var c = 'M' + X(0) + ',' + Y(168) + ' L' + (bx - 1.5 * k) + ',' + Y(168 + spread) + ' L' + (bx - 1.5 * k) + ',' + Y(82 - spread) + ' L' + X(0) + ',' + Y(82) + ' Z';
    var t = (g - 15) / 15;
    SC.cone.setAttribute('d', c); SC.cone.setAttribute('opacity', (1 - t * 0.75).toFixed(2));
    SC.cone2.setAttribute('d', c); SC.cone2.setAttribute('opacity', (t * 0.9).toFixed(2));
    SC.glow.setAttribute('opacity', (1 - t * 0.45).toFixed(2));
    SC.dl.setAttribute('x1', X(0)); SC.dl.setAttribute('x2', bx);
    SC.dl0.setAttribute('x1', X(0)); SC.dl0.setAttribute('x2', X(0)); SC.dl1.setAttribute('x1', bx); SC.dl1.setAttribute('x2', bx);
    SC.dt.setAttribute('x', (X(0) + bx) / 2); SC.dt.textContent = Math.round(g) + ' cm';
    SC.pl1.setAttribute('x', bx + 18 * k);
  }
  function walk(cb) {
    if (DN.RM) { setGap(30); cb(); return; }
    var t0 = performance.now(), g0 = st.gap || 15;
    function step(now) {
      var k = Math.min(1, (now - t0) / 450), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      setGap(g0 + (30 - g0) * e);
      if (k < 1) requestAnimationFrame(step); else cb();
    }
    requestAnimationFrame(step);
  }

  /* ---------- panel 1: the three curves ---------- */
  var G = {};
  function buildChart() {
    while (ch.firstChild) ch.removeChild(ch.firstChild);
    var W = chW.clientWidth || 600, mob = W < 520;
    var H = mob ? 260 : 300;
    var m = { l: 40, r: mob ? 8 : 168, t: 22, b: 36 };
    G = { W: W, H: H, m: m, mob: mob };
    ch.setAttribute('viewBox', '0 0 ' + W + ' ' + H); ch.setAttribute('width', W); ch.setAttribute('height', H);
    S('title', { id: 'l09-ct' }, ch).textContent = L('Porcentagem da luz medida a 15 cm, de 5 a 120 cm, para uma lâmpada pequena, um painel grande e um painel com lentes de 60 graus.', 'Percent of the light measured at 15 cm, from 5 to 120 cm, for a small bulb, a large panel and a panel with 60 degree lenses.');
    var x0 = m.l, x1 = W - m.r, y0 = H - m.b, y1 = m.t;
    function X(d) { return x0 + (d - 5) / 115 * (x1 - x0); }
    function Y(v) { return y0 - Math.min(v, 150) / 150 * (y0 - y1); }
    G.X = X; G.Y = Y;
    var defs = S('defs', null, ch);
    var cp = S('clipPath', { id: 'l09-cclip' }, defs);
    S('rect', { x: x0, y: y1 - 2, width: x1 - x0 + 2, height: y0 - y1 + 2 }, cp);
    var hp = S('pattern', { id: 'l09-hm', width: 4, height: 4, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    S('line', { x1: 0, y1: 0, x2: 0, y2: 4, stroke: C.ink, 'stroke-width': 1.2 }, hp);
    var grid = S('g', { class: 'l09-grid' }, ch);
    [0, 25, 50, 100, 150].forEach(function (v) {
      S('line', { x1: x0, x2: x1, y1: Y(v), y2: Y(v), class: v ? 'l09-gl' : 'l09-axl' }, grid);
      S('text', { x: x0 - 6, y: Y(v), 'text-anchor': 'end', 'dominant-baseline': 'central', class: 'l09-tick' }, grid).textContent = v + '%';
    });
    (mob ? [5, 15, 30, 60, 120] : [5, 15, 30, 45, 60, 90, 120]).forEach(function (d) {
      S('line', { x1: X(d), x2: X(d), y1: y0, y2: y0 + 4, class: 'l09-axl' }, grid);
      S('text', { x: X(d), y: y0 + 16, 'text-anchor': d === 120 && mob ? 'end' : 'middle', class: 'l09-tick' }, grid).textContent = d + (d === 120 ? ' cm' : '');
    });
    S('text', { x: x0, y: y0 + 31, class: 'l09-axt' }, grid).textContent = L('distância do painel', 'distance from the panel');
    S('line', { x1: X(30), x2: X(30), y1: y1, y2: y0, class: 'l09-g30' }, grid);
    S('line', { x1: X(15), x2: X(15), y1: y1, y2: y0, class: 'l09-g30' }, grid);
    /* curves */
    function path(f, a, b) {
      var d = '', n = 0;
      for (var x = a; x <= b + 1e-6; x += 0.5) { d += (n++ ? 'L' : 'M') + X(x).toFixed(1) + ',' + Y(f(x)).toFixed(1); }
      return d;
    }
    var cg = S('g', { 'clip-path': 'url(#l09-cclip)' }, ch);
    G.curves = [
      S('path', { d: path(point, 5, 120), class: 'l09-cp' }, cg),
      S('path', { d: path(fLens, 5, 120), class: 'l09-cl' }, cg),
      S('path', { d: path(fBig, 5, 120), class: 'l09-cb' }, cg)
    ];
    /* the point source leaves the top of the chart */
    var xTop = 15 * Math.sqrt(100 / 150);
    var ar = S('g', { class: 'l09-arr' }, ch);
    S('path', { d: 'M' + (X(xTop) - 4) + ',' + (y1 + 4) + ' L' + X(xTop) + ',' + (y1 - 3) + ' L' + (X(xTop) + 4) + ',' + (y1 + 4), class: 'l09-arrp' }, ar);
    S('text', { x: X(xTop) + 8, y: y1 - 8, class: 'l09-anno' }, ar).textContent = L('sobe até 900% a 5 cm', 'climbs to 900% at 5 cm');
    G.arr = ar;
    /* measured: 100% at 15 cm, about 50% to 60% at 30 cm (approximate, dashed) */
    var meas = S('g', { class: 'l09-meas' }, ch);
    S('rect', { x: X(30) - 6, y: Y(60), width: 12, height: Y(50) - Y(60), fill: 'url(#l09-hm)', stroke: C.ink, 'stroke-width': 1.2, 'stroke-dasharray': '3 2' }, meas);
    S('rect', { x: X(15) - 6, y: Y(100) - 2, width: 12, height: 4, fill: C.ink }, meas);
    G.meas = meas;
    /* labels: right gutter on desktop, legend rows on mobile */
    var lab = S('g', { class: 'l09-clab' }, ch);
    G.lab = lab;
    var ends = [
      { y: Y(point(120)), t: L('uma lâmpada pequena, um ponto', 'a small bulb, a point'), c: 'l09-tp' },
      { y: Y(fBig(120)), t: L('painel grande', 'large panel'), c: 'l09-tb' },
      { y: Y(fLens(120)), t: L('painel com lentes de 60°', 'panel with 60° lenses'), c: 'l09-tl' }
    ];
    if (!mob) {
      /* repel the three end labels so they never touch */
      ends.sort(function (a, b) { return b.y - a.y; });
      var lines = ends.map(function (e) { return wrap(e.t, 11, m.r - 14); });
      var pos = []; var bottom = y0 + 4;
      ends.forEach(function (e, i) {
        var h = lines[i].length * 13;
        var c = Math.min(e.y, bottom - h / 2 - 2);
        pos.push(c); bottom = c - h / 2 - 6;
      });
      ends.forEach(function (e, i) {
        var cy = pos[i], ls = lines[i], ty = cy - (ls.length - 1) * 6.5;
        S('line', { x1: x1 + 2, x2: x1 + 8, y1: e.y, y2: cy, class: 'l09-lead' }, lab);
        ls.forEach(function (s, j) { S('text', { x: x1 + 11, y: ty + j * 13, 'dominant-baseline': 'central', class: 'l09-el ' + e.c }, lab).textContent = s; });
      });
      /* measured callouts in the empty upper right of the plot */
      var mx = X(52);
      var t1 = S('text', { x: mx, y: Y(128), class: 'l09-ml' }, lab); t1.textContent = L('medido a 15 cm: 52 a 90 mW/cm²', 'measured at 15 cm: 52 to 90 mW/cm²');
      S('path', { d: 'M' + (mx - 4) + ',' + (Y(128) - 4) + ' L' + (X(15) + 9) + ',' + (Y(100) - 3), class: 'l09-lead' }, lab);
      var t2 = S('text', { x: mx, y: Y(98), class: 'l09-ml' }, lab); t2.textContent = L('medido a 30 cm: 23 a 55 mW/cm²', 'measured at 30 cm: 23 to 55 mW/cm²');
      var t3 = S('text', { x: mx, y: Y(98) + 15, class: 'l09-ml2' }, lab); t3.textContent = L('a medida cai para cerca de 50% a 60%', 'the reading drops to about 50% to 60%');
      S('path', { d: 'M' + (mx - 4) + ',' + (Y(98) + 2) + ' L' + (X(30) + 9) + ',' + Y(60), class: 'l09-lead' }, lab);
    } else {
      var mx2 = X(42);
      S('text', { x: mx2, y: Y(140), class: 'l09-ml' }, lab).textContent = L('medido a 15 cm: 52 a 90', 'measured at 15 cm: 52 to 90');
      S('path', { d: 'M' + (mx2 - 4) + ',' + (Y(140) - 2) + ' L' + (X(15) + 8) + ',' + (Y(100) - 3), class: 'l09-lead' }, lab);
      S('text', { x: mx2, y: Y(116), class: 'l09-ml' }, lab).textContent = L('medido a 30 cm: 23 a 55', 'measured at 30 cm: 23 to 55');
      S('text', { x: mx2, y: Y(116) + 14, class: 'l09-ml2' }, lab).textContent = L('cerca de 50% a 60%', 'about 50% to 60%');
      S('path', { d: 'M' + (mx2 - 4) + ',' + (Y(116) + 4) + ' L' + (X(30) + 8) + ',' + Y(60), class: 'l09-lead' }, lab);
    }
    leg.innerHTML = mob ? [['l09-sp', L('uma lâmpada pequena, um ponto', 'a small bulb, a point')], ['l09-sb', L('painel grande', 'large panel')], ['l09-sl', L('painel com lentes de 60°', 'panel with 60° lenses')]]
      .map(function (q) { return '<span class="l09-li"><i class="' + q[0] + '"></i>' + q[1] + '</span>'; }).join('') : '';
    /* the reader's guess at 30 cm */
    G.guess = S('g', { class: 'l09-guess' }, ch);
    G.gc = S('circle', { r: 6, cx: X(30) }, G.guess);
    G.gl = S('line', { x1: X(30), x2: X(30), class: 'l09-glead' }, G.guess);
    G.gt = S('text', { x: X(30), 'text-anchor': 'middle', 'dominant-baseline': 'central', class: 'l09-gt' }, G.guess);
    paintGuess();
  }
  function wrap(s, size, maxW) {
    var n = Math.max(6, Math.floor(maxW / (size * 0.62))), out = [], line = '';
    s.split(' ').forEach(function (w) { if (!line) line = w; else if ((line + ' ' + w).length <= n) line += ' ' + w; else { out.push(line); line = w; } });
    if (line) out.push(line); return out;
  }
  function paintGuess() {
    var g = null; GUESS.forEach(function (q) { if (q.k === st.guess) g = q; });
    if (!g || !st.shown) { G.guess.style.display = 'none'; return; }
    G.guess.style.display = '';
    var y = G.Y(g.v);
    G.gc.setAttribute('cy', y);
    if (g.v > 15) {
      G.gt.setAttribute('x', G.X(30)); G.gt.setAttribute('text-anchor', 'middle'); G.gt.setAttribute('y', G.Y(G.mob ? 9 : 6));
      G.gl.style.display = ''; G.gl.setAttribute('y1', y + 6); G.gl.setAttribute('y2', G.Y(G.mob ? 9 : 6) - 7);
    } else {
      G.gt.setAttribute('x', G.X(30) - 11); G.gt.setAttribute('text-anchor', 'end'); G.gt.setAttribute('y', y);
      G.gl.style.display = 'none';
    }
    G.gt.textContent = L('seu palpite', 'your guess');
  }
  function drawCurves() {
    if (DN.RM) return;
    G.curves.forEach(function (p, i) {
      var len = p.getTotalLength();
      p.style.strokeDasharray = len + ' ' + len;
      p.style.strokeDashoffset = len;
      p.getBoundingClientRect();
      p.style.transition = 'stroke-dashoffset 900ms cubic-bezier(.3,.6,.3,1) ' + (i * 120) + 'ms';
      p.style.strokeDashoffset = 0;
      setTimeout(function () { p.style.strokeDasharray = ''; p.style.transition = ''; if (p.classList.contains('l09-cl')) p.style.strokeDasharray = ''; }, 1200 + i * 120);
    });
    [G.lab, G.meas, G.arr, G.guess].forEach(function (n) {
      n.style.opacity = 0; n.getBoundingClientRect();
      n.style.transition = 'opacity 400ms ease 700ms'; n.style.opacity = 1;
    });
  }

  /* ---------- panel 2: advertised vs measured ---------- */
  var D = {};
  function buildDb() {
    while (db.firstChild) db.removeChild(db.firstChild);
    var W = dbW.clientWidth || 600, mob = W < 520;
    var max = 200, x0 = 4, x1 = W - (mob ? 10 : 30);
    function X(v) { return x0 + v / max * (x1 - x0); }
    var rowH = 58, y = 6;
    S('title', { id: 'l09-dt' }, db).textContent = L('Irradiância anunciada e medida a 15 cm em cinco painéis.', 'Advertised and measured irradiance at 15 cm in five panels.');
    var defs = S('defs', null, db);
    var mk = S('marker', { id: 'l09-ah', viewBox: '0 0 8 8', refX: 7, refY: 4, markerWidth: 7, markerHeight: 7, orient: 'auto' }, defs);
    S('path', { d: 'M0,0 L8,4 L0,8 Z', fill: C.ink }, mk);
    var H = 6 + PANELS.length * rowH + 40;
    var grid = S('g', null, db);
    [0, 50, 100, 150, 200].forEach(function (v) {
      S('line', { x1: X(v), x2: X(v), y1: 4, y2: H - 34, class: v ? 'l09-gl' : 'l09-axl' }, grid);
      S('text', { x: X(v), y: H - 18, 'text-anchor': v === 0 ? 'start' : 'middle', class: 'l09-tick' }, grid).textContent = v;
    });
    S('text', { x: X(200), y: H - 3, 'text-anchor': 'end', class: 'l09-axt' }, grid).textContent = L('mW/cm² a 15 cm', 'mW/cm² at 15 cm');
    D.rows = PANELS.map(function (p) {
      var g = S('g', { class: 'l09-row' }, db);
      S('text', { x: 0, y: y + 11, class: 'l09-pn' }, g).textContent = p.n;
      S('text', { x: W, y: y + 11, 'text-anchor': 'end', class: 'l09-pp' }, g).textContent = '−' + p.pct + '%';
      var cy = y + 34;
      var advX = X(p.adv), mX = X(p.m);
      var line = S('line', { x1: advX, x2: advX, y1: cy, y2: cy, class: 'l09-dbl' }, g);
      var r = {};
      if (p.advLo) {
        S('line', { x1: X(p.advLo), x2: X(p.adv), y1: cy, y2: cy, class: 'l09-dbr' }, g);
        S('circle', { cx: X(p.advLo), cy: cy, r: 5, class: 'l09-ao' }, g);
        S('circle', { cx: X(p.adv), cy: cy, r: 5, class: 'l09-ao' }, g);
        advX = X(p.advLo);
      } else {
        if (p.more) S('line', { x1: X(p.adv) + 6, x2: X(p.adv) + 26, y1: cy, y2: cy, class: 'l09-more', 'marker-end': 'url(#l09-ah)' }, g);
        S('circle', { cx: X(p.adv), cy: cy, r: 5, class: 'l09-ao' }, g);
      }
      var mc = S('circle', { cx: advX, cy: cy, r: 5.5, class: 'l09-mc' }, g);
      var advTxt = p.advLo ? L('cerca de 90 a 109, medido a 7,5 cm', 'about 90 to 109, measured at 7.5 cm') : p.more ? L('mais de ', 'over ') + p.adv : String(p.adv);
      var advC = p.advLo ? (X(p.advLo) + X(p.adv)) / 2 : X(p.adv) + (p.more ? 8 : 0);
      var at = S('text', { y: cy - 11, class: 'l09-av' }, g); at.textContent = L('caixa ', 'box ') + advTxt;
      var tw = at.textContent.length * 11 * 0.62;
      var ax = Math.max(0, Math.min(W - tw, advC - tw / 2));
      at.setAttribute('x', ax);
      var mt = S('text', { y: cy + 19, class: 'l09-mv' }, g); mt.textContent = L('medido ', 'measured ') + fmt(p.m);
      var mw = mt.textContent.length * 11.5 * 0.62;
      mt.setAttribute('x', Math.max(0, Math.min(W - mw, X(p.m) - mw / 2)));
      r = { line: line, mc: mc, from: advX, to: mX };
      y += rowH;
      return r;
    });
    db.setAttribute('viewBox', '0 0 ' + W + ' ' + H); db.setAttribute('width', W); db.setAttribute('height', H);
    paintDb(D.grown || DN.RM ? 1 : 0);
  }
  function paintDb(e) {
    D.rows.forEach(function (r) {
      var x = r.from + (r.to - r.from) * e;
      r.line.setAttribute('x2', x); r.mc.setAttribute('cx', x);
      r.mc.style.opacity = e > 0 ? 1 : 0;
    });
  }
  function growDb() {
    if (D.grown) return; D.grown = true;
    if (DN.RM) { paintDb(1); return; }
    var t0 = performance.now();
    function step(now) {
      var k = Math.min(1, (now - t0) / 700), e = 1 - Math.pow(1 - k, 3);
      paintDb(e); if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  DN.onVisible(dbW, function (vis) { if (vis) growDb(); }, { once: true, threshold: 0.3 });

  /* ---------- interaction ---------- */
  function choose(k) {
    var first = !st.shown || st.guess === null && k !== 'skip';
    st.guess = k === 'skip' ? st.guess : k;
    var was = st.shown;
    st.shown = true;
    setTexts();
    p1.hidden = false; take.hidden = false;
    buildChart();
    if (k !== 'skip' && k !== 'half') DN.surprise('l09');
    if (!was) {
      walk(function () { drawCurves(); });
      p1.style.opacity = 1;
    }
  }
  function setTexts() {
    askP.innerHTML = L('A 15 cm, o painel entrega 100% da luz. Você se afasta para <b>30 cm</b>. Quanto sobra?', 'At 15 cm, the panel delivers 100% of its light. You step back to <b>30 cm</b>. How much is left?');
    GUESS.forEach(function (g, i) { GB[i].textContent = L(g.pt, g.en); GB[i].setAttribute('aria-pressed', st.guess === g.k ? 'true' : 'false'); });
    skip.textContent = L('ver sem palpitar', 'show me without guessing');
    skip.hidden = st.shown;
    btnRow.setAttribute('aria-label', L('Seu palpite', 'Your guess'));
    var msg = '';
    if (st.shown) {
      if (st.guess === 'half') msg = L('<b>Certo.</b> No modelo do painel grande sobram 59%, e as medidas a 30 cm caíram para cerca de 50% a 60%. Seu palpite fica na curva do painel grande.',
        '<b>Right.</b> The large panel model keeps 59%, and the readings at 30 cm fell to about 50% to 60%. Your guess sits on the large panel curve.');
      else if (st.guess === 'quarter') msg = L('<b>Um quarto é a regra do inverso do quadrado</b>, que vale para uma lâmpada pequena. Um painel grande perto do corpo guarda cerca de 59% no modelo, e as medidas ficaram em cerca de 50% a 60%.',
        '<b>A quarter is the inverse square rule</b>, which holds for a small bulb. A large panel close to the body keeps about 59% in the model, and the readings came in at about 50% to 60%.');
      else if (st.guess === 'eighth') msg = L('<b>Um oitavo cai mais depressa que as três curvas</b>, até a da lâmpada pequena, que guarda um quarto. O painel grande guarda cerca de 59%, e as medidas ficaram em cerca de 50% a 60%.',
        '<b>An eighth falls faster than all three curves</b>, even the small bulb, which keeps a quarter. The large panel keeps about 59%, and the readings came in at about 50% to 60%.');
      else msg = L('A 30 cm, o painel grande guarda cerca de 59% no modelo, e as medidas ficaram em cerca de 50% a 60%. A regra do inverso do quadrado preveria 25%.',
        'At 30 cm, the large panel keeps about 59% in the model, and the readings came in at about 50% to 60%. The inverse square rule would predict 25%.');
    }
    live.innerHTML = msg;
    p1h.textContent = L('1 · Quanto da luz de 15 cm sobra em cada distância', '1 · How much of the 15 cm light is left at each distance');
    call.innerHTML = L('10 min a 15 cm: <b>31 a 54 J/cm²</b>. 10 min a 60 cm: <b>cerca de um quarto disso</b>.', '10 min at 15 cm: <b>31 to 54 J/cm²</b>. 10 min at 60 cm: <b>about a quarter of that</b>.');
    take.textContent = L('Perto de um painel grande, a luz cai devagar, e de 15 para 30 cm sobra cerca de metade em vez do quarto que a regra do inverso do quadrado prevê. Longe dele, a queda acelera, e em cinco painéis medidos a luz a 15 cm ficou de um terço a mais da metade abaixo do número da caixa.',
      'Close to a large panel the light falls slowly, and from 15 to 30 cm about half is left instead of the quarter the inverse square rule predicts. Farther away the drop speeds up, and in five measured panels the light at 15 cm came in a third to more than half below the number on the box.');
    p2h.textContent = L('2 · A caixa e o medidor, a 15 cm', '2 · The box and the meter, at 15 cm');
    seal.innerHTML = L('Medições de sites afiliados às marcas; não há teste independente revisado por pares de painéis de corpo inteiro.', 'Measurements from sites affiliated with the brands; there is no independent peer reviewed test of full body panels.') +
      ' <span class="l09-key"><i class="l09-ko"></i>' + L('caixa', 'box') + ' <i class="l09-kf"></i>' + L('medido', 'measured') + '</span>';
    var t = '<table><caption>' + L('Curvas, % da luz de 15 cm', 'Curves, % of the light at 15 cm') + '</caption><tr><th>cm</th><th>' + L('ponto', 'point') + '</th><th>' + L('painel grande', 'large panel') + '</th><th>' + L('lentes de 60°', '60° lenses') + '</th></tr>';
    DX.forEach(function (d, i) { t += '<tr><td>' + d + '</td><td>' + Math.round(point(d)) + '%</td><td>' + BIG[i] + '%</td><td>' + LENS[i] + '%</td></tr>'; });
    t += '</table><table><caption>' + L('Anunciado e medido a 15 cm, mW/cm²', 'Advertised and measured at 15 cm, mW/cm²') + '</caption>';
    PANELS.forEach(function (p) { t += '<tr><td>' + p.n + '</td><td>' + (p.advLo ? '90 a 109 (7,5 cm)' : (p.more ? '> ' : '') + p.adv) + '</td><td>' + fmt(p.m) + '</td><td>−' + p.pct + '%</td></tr>'; });
    tbl.innerHTML = t + '</table>';
  }
  function render() {
    setTexts();
    p1.hidden = !st.shown; take.hidden = !st.shown;
    buildScene();
    if (st.shown) buildChart();
    buildDb();
  }
  render();
  DN.onLang(render);
  var rt = 0, lastW = root.clientWidth;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { if (root.clientWidth !== lastW) { lastW = root.clientWidth; render(); } }, 120);
  });
})();
