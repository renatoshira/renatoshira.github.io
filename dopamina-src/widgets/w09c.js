/* w09c · o-frasco : a bottle of Mucuna, sixteen capsules, sixteen doses of levodopa */
(function () {
  'use strict';
  var root = DN.body('w09c'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, S = DN.svg, E = DN.el, C = DN.COL;

  /* Cohen et al. 2022 measured 2 to 241 mg of levodopa per dose and one product with none.
     The extremes are measured; the values between them are an illustrative spread. */
  var DOSE = [58, 2, 152, 19, 241, 0, 88, 35, 126, 6, 190, 47, 12, 104, 28, 73];
  var N = DOSE.length, MG = 260, BAND = [100, 250];
  var inBand = DOSE.filter(function (d) { return d >= BAND[0] && d <= BAND[1]; }).length;

  var st = { open: true, sorted: false, sel: -1, busy: false }, risen = DN.RM;
  var G = {}, R = {};
  /* per capsule animated state: x, y, a (deg), s (scale), f (fill 0..1) */
  var cap = DOSE.map(function () { return { x: 0, y: 0, a: 0, s: 0.4, f: 0 }; });

  var read = E('p', { class: 'w9c-read' }, root);
  var holder = E('div', { class: 'w9c-svg' }, root);
  var note = E('p', { class: 'w9c-note' }, root);
  var sv = S('svg', { role: 'img', 'aria-describedby': 'w09c-desc' }, holder);
  var desc = E('p', { class: 'sr', id: 'w09c-desc' }, root);

  /* ---------- geometry ---------- */
  function layout() {
    var W = holder.clientWidth || 600;
    G.W = W; G.mob = W < 520;
    if (G.mob) {
      G.H = 462; G.cw = 18; G.cl = 104;
      G.jar = { x: W / 2 - 46, y: 34, w: 92, h: 108 };
      G.rows = [{ floor: 292, x0: 6, x1: W - 48, n: 8 }, { floor: 444, x0: 6, x1: W - 48, n: 8 }];
    } else {
      G.H = 240; G.cw = 20; G.cl = 160;
      G.jar = { x: 14, y: 66, w: 112, h: 154 };
      G.rows = [{ floor: 220, x0: 164, x1: W - 58, n: 16 }];
    }
    sv.setAttribute('width', W); G.curH = 0;
    build();
    place(true);
    if (!risen) cap.forEach(function (c) { c.f = 0; });
    draw();
  }
  function slot(k) {
    var ri = 0, idx = k;
    if (G.rows.length > 1 && k >= G.rows[0].n) { ri = 1; idx = k - G.rows[0].n; }
    var r = G.rows[ri], pitch = (r.x1 - r.x0) / r.n;
    return { x: r.x0 + pitch * (idx + 0.5), y: r.floor - G.cl / 2, row: ri };
  }
  /* where each capsule sits inside the closed jar */
  function inJar(i) {
    var j = G.jar, c = i % 2, rr = Math.floor(i / 2);
    var jitter = ((i * 37) % 9) - 4;
    return { x: j.x + j.w * (c ? 0.67 : 0.33) + jitter, y: j.y + j.h - 12 - rr * (j.h - 26) / 8, a: 90 + (((i * 53) % 50) - 25) * (rr % 2 ? 1 : -1), s: G.mob ? 0.26 : 0.22 };
  }
  function order() {
    var idx = DOSE.map(function (d, i) { return i; });
    if (st.sorted) idx.sort(function (a, b) { return DOSE[a] - DOSE[b]; });
    var pos = []; idx.forEach(function (i, k) { pos[i] = k; });
    return pos;
  }
  function yMg(row, mg) { return G.rows[row].floor - mg / MG * G.cl; }

  /* ---------- risograph inks (technique from w00) ----------
     Two spot inks, amber and indigo, each its own layer: halftone screens at riso angles,
     a grain filter that eats the ink, 1 to 2 px of misregistration, multiply where they overlap.
     The grain filter is switched off while capsules move, for speed. */
  var INKS = [
    { k: 'a', col: C.dopa, ang: 15, op: 0.95, mx: 0.6, my: -0.5, seed: [211, 487] },
    { k: 'b', col: C.pausa, ang: 75, op: 0.93, mx: -1.1, my: 0.9, seed: [733, 59] }
  ];
  function inkDefs(defs) {
    INKS.forEach(function (ink) {
      var p = 'w09c-' + ink.k;
      [0.62, 0.92, 1.2].forEach(function (r, j) {
        var pt = S('pattern', { id: p + 'h' + (j + 1), width: 2.8, height: 2.8, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(' + ink.ang + ')' }, defs);
        S('circle', { cx: 1.4, cy: 1.4, r: r, fill: ink.col }, pt);
      });
      var f = S('filter', { id: p + 'g', x: '-5%', y: '-5%', width: '110%', height: '110%', 'color-interpolation-filters': 'sRGB' }, defs);
      S('feTurbulence', { type: 'fractalNoise', baseFrequency: 0.07, numOctaves: 2, seed: ink.seed[0], result: 'w' }, f);
      S('feDisplacementMap', { in: 'SourceGraphic', in2: 'w', scale: 1.6, xChannelSelector: 'R', yChannelSelector: 'G', result: 'd' }, f);
      S('feTurbulence', { type: 'fractalNoise', baseFrequency: 0.9, numOctaves: 2, seed: ink.seed[1], result: 'n' }, f);
      S('feColorMatrix', { in: 'n', type: 'matrix', values: '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.6', result: 'm' }, f);
      S('feComposite', { in: 'd', in2: 'm', operator: 'in' }, f);
    });
  }
  /* t: 0 solid ink, 1 2 3 light, mid, dark halftone */
  function ink(k, t) { var o = k === 'a' ? INKS[0] : INKS[1]; return t ? 'url(#w09c-' + k + 'h' + t + ')' : o.col; }

  /* ---------- build ---------- */
  function build() {
    while (sv.firstChild) sv.removeChild(sv.firstChild);
    var defs = S('defs', null, sv);
    inkDefs(defs);
    var cw = G.cw, cl = G.cl;
    var cp = S('clipPath', { id: 'w9c-clip' }, defs);
    S('rect', { x: -cw / 2 + 1, y: -cl / 2 + 1, width: cw - 2, height: cl - 2, rx: cw / 2 - 1 }, cp);

    /* the reference band behind the capsules (a chart mark, plain ink) */
    R.bands = G.rows.map(function (r, ri) {
      var g = S('g', { class: 'w9c-band' }, sv);
      var yt = yMg(ri, BAND[1]), yb = yMg(ri, BAND[0]);
      S('rect', { x: r.x0 - 4, y: yt, width: G.W - 44 - r.x0 + 4, height: yb - yt, class: 'w9c-bandr' }, g);
      var xe = G.W - 44;
      S('line', { x1: r.x0 - 4, x2: xe, y1: yt, y2: yt, class: 'w9c-bandl' }, g);
      S('line', { x1: r.x0 - 4, x2: xe, y1: yb, y2: yb, class: 'w9c-bandl' }, g);
      S('line', { x1: r.x0 - 4, x2: xe, y1: r.floor, y2: r.floor, class: 'w9c-floor' }, g);
      /* tick labels sit in the gutter right of the last capsule, centred on their lines */
      [[BAND[1], yt], [BAND[0], yb], [0, r.floor]].forEach(function (q) {
        S('text', { x: G.W, y: q[1], 'text-anchor': 'end', 'dominant-baseline': 'central', class: 'w9c-tick' }, g).textContent = q[0] ? q[0] + ' mg' : '0';
      });
      if (ri === 0) {
        var t = S('text', { x: G.mob ? r.x0 - 4 : r.x0 - 4, y: Math.min(yt, r.floor - G.cl) - 10, 'text-anchor': 'start', class: 'w9c-bandt' }, g);
        R.bandT = t;
      }
      return g;
    });

    var j = G.jar, neck = j.w * 0.16, lw = j.w * 0.86, lh = j.h * 0.34, lx = j.x + (j.w - lw) / 2, ly = j.y + j.h * 0.36;
    R.L = {}; R.capA = []; R.capB = []; R.lid = null;
    INKS.forEach(function (o) {
      var k = o.k;
      var lay = S('g', { class: 'w9c-ink w9c-ink-' + k, transform: 'translate(' + o.mx + ' ' + o.my + ')', opacity: o.op, filter: 'url(#w09c-' + k + 'g)' }, sv);
      R.L[k] = lay;
      /* jar, behind the capsules */
      if (k === 'a') {
        S('ellipse', { cx: j.x + j.w / 2 + 3, cy: j.y + j.h + 5, rx: j.w * 0.56, ry: 4.5, fill: ink('a', 2) }, lay);
      } else {
        S('rect', { x: j.x, y: j.y, width: j.w, height: j.h, rx: 14, fill: 'none', stroke: ink('b', 0), 'stroke-width': 2.4 }, lay);
        S('rect', { x: j.x + 7, y: j.y + 12, width: 6, height: j.h - 24, rx: 3, fill: ink('b', 1) }, lay);
        S('rect', { x: j.x + neck, y: j.y - 10, width: j.w - 2 * neck, height: 11, fill: 'none', stroke: ink('b', 0), 'stroke-width': 2.2 }, lay);
      }
      /* capsules */
      DOSE.forEach(function (d, i) {
        var g = S('g', null, lay);
        if (k === 'a') {
          R.capA[i] = { g: g, fill: S('rect', { x: -cw / 2, width: cw, 'clip-path': 'url(#w9c-clip)', fill: ink('a', 0) }, g) };
        } else {
          S('path', { d: 'M' + (-cw / 2) + ' ' + (-cl * 0.08) + 'V' + (-cl / 2 + cw / 2) + 'A' + (cw / 2) + ' ' + (cw / 2) + ' 0 0 1 ' + (cw / 2) + ' ' + (-cl / 2 + cw / 2) + 'V' + (-cl * 0.08) + 'Z', fill: ink('b', 1) }, g);
          var body = S('rect', { x: -cw / 2, y: -cl / 2, width: cw, height: cl, rx: cw / 2, fill: 'none', stroke: ink('b', 0), 'stroke-width': 1.7, 'vector-effect': 'non-scaling-stroke' }, g);
          S('line', { x1: -cw / 2, x2: cw / 2, y1: -cl * 0.08, y2: -cl * 0.08, stroke: ink('b', 0), 'stroke-width': 1.1, 'vector-effect': 'non-scaling-stroke' }, g);
          R.capB[i] = { g: g, body: body };
        }
      });
      /* jar front: the label knocks out the capsules behind it, the lid sits on top */
      S('rect', { x: lx, y: ly, width: lw, height: lh, fill: '#fff', class: 'w9c-pp' }, lay);
      if (k === 'a') S('rect', { x: lx, y: ly, width: lw, height: lh, fill: ink('a', 2) }, lay);
      else {
        S('rect', { x: lx, y: ly, width: lw, height: lh, fill: 'none', stroke: ink('b', 0), 'stroke-width': 1.4 }, lay);
        var lid = S('g', null, lay);
        var lx0 = j.x + neck - 5, lwid = j.w - 2 * neck + 10;
        S('rect', { x: lx0, y: j.y - 28, width: lwid, height: 20, rx: 3, fill: ink('b', 0) }, lid);
        var rd = '';
        for (var q = 1; q < 8; q++) { var xx = (lx0 + q * lwid / 8).toFixed(1); rd += 'M' + xx + ' ' + (j.y - 25) + 'V' + (j.y - 11); }
        S('path', { d: rd, stroke: '#fff', 'stroke-width': 1.6, class: 'w9c-ps' }, lid);
        R.lid = lid;
      }
    });
    /* label words in indigo, unfiltered so they stay legible */
    R.jarText = S('g', { class: 'w9c-jartext' }, sv);
    R.lab1 = S('text', { x: j.x + j.w / 2, y: ly + lh * 0.4, 'text-anchor': 'middle', 'dominant-baseline': 'central', class: 'w9c-lab1' }, R.jarText);
    R.lab2 = S('text', { x: j.x + j.w / 2, y: ly + lh * 0.74, 'text-anchor': 'middle', 'dominant-baseline': 'central', class: 'w9c-lab2' }, R.jarText);

    /* dose under each capsule, plain ink on top */
    R.caps = DOSE.map(function (d, i) {
      var o = { g: S('g', { class: 'w9c-cap' }, sv) };
      o.zero = S('text', { y: cl / 2 - 9, 'text-anchor': 'middle', class: 'w9c-zero' }, o.g);
      o.mg = S('text', { y: cl / 2 + 13, 'text-anchor': 'middle', class: 'w9c-mg' + (d >= BAND[0] ? ' w9c-in' : '') }, o.g);
      return o;
    });
  }

  function place(open) {
    var pos = order();
    cap.forEach(function (c, i) {
      if (open) { var s = slot(pos[i]); c.x = s.x; c.y = s.y; c.a = 0; c.s = 1; c.f = 1; }
      else { var p = inJar(i); c.x = p.x; c.y = p.y; c.a = p.a; c.s = p.s; c.f = 0; }
    });
    R.lidState = 0;
  }

  /* ---------- draw ---------- */
  function draw() {
    if (!R.caps) return;
    var cl = G.cl;
    cap.forEach(function (c, i) {
      var o = R.caps[i];
      var tf = 'translate(' + c.x.toFixed(2) + ',' + c.y.toFixed(2) + ') rotate(' + c.a.toFixed(2) + ') scale(' + c.s.toFixed(3) + ')';
      o.g.setAttribute('transform', tf); R.capA[i].g.setAttribute('transform', tf); R.capB[i].g.setAttribute('transform', tf);
      var h = DOSE[i] / MG * cl * c.f;
      R.capA[i].fill.setAttribute('y', cl / 2 - h); R.capA[i].fill.setAttribute('height', Math.max(0, h));
      o.zero.textContent = '';
      o.mg.textContent = fmt(DOSE[i]);
      o.mg.style.opacity = c.f;
    });
    var t = R.lidState || 0, j = G.jar;
    R.lid.setAttribute('transform', 'translate(' + (t * (G.mob ? 70 : 34)) + ',' + (-t * (G.mob ? 30 : 60)) + ') rotate(' + (t * 28) + ' ' + (j.x + j.w / 2) + ' ' + (j.y - 18) + ')');
    R.lid.setAttribute('opacity', 1 - t);
    R.lab1.textContent = 'Mucuna';
    R.lab2.textContent = '500 mg';
    R.bandT.textContent = G.mob ? L('comprimido para Parkinson: 100 a 250 mg', 'Parkinson’s tablet: 100 to 250 mg') : L('faixa de um comprimido de levodopa para Parkinson: 100 a 250 mg', 'range of one levodopa tablet for Parkinson’s: 100 to 250 mg');
    R.bands.forEach(function (b, ri) { b.style.display = ri > 0 && !st.open ? 'none' : ''; });
    var h = G.rows.length > 1 && !st.open ? G.rows[0].floor + 14 : G.H;
    if (h !== G.curH) { G.curH = h; sv.setAttribute('viewBox', '0 0 ' + G.W + ' ' + h); sv.setAttribute('height', h); }
  }
  /* ---------- motion ---------- */
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function run(dur, fn, done) {
    var t0 = performance.now();
    sv.classList.add('w9c-moving');
    var d0 = done; done = function () { sv.classList.remove('w9c-moving'); if (d0) d0(); };
    (function step(now) {
      var t = DN.clamp((now - t0) / dur, 0, 1);
      fn(t); draw();
      if (t < 1) requestAnimationFrame(step); else if (done) done();
    })(t0);
  }
  /* the capsules sit already filled; on first view the levodopa rises in each, one after the other */
  function rise() {
    if (DN.RM) return;
    run(400 + (N - 1) * 45, function (tt) {
      var ms = tt * (400 + (N - 1) * 45);
      cap.forEach(function (c, i) { c.f = easeOut(DN.clamp((ms - i * 45) / 400, 0, 1)); });
    });
  }

  function relabel() {
    read.textContent = L('Pelo rótulo, não dá para saber quanta levodopa vem em cada cápsula. Nos suplementos de Mucuna testados, uma dose tinha de 0 a 241 mg.',
      'The label cannot tell you how much levodopa each capsule holds. In the Mucuna supplements tested, one dose held from 0 to 241 mg.');
    note.textContent = L('Cada cápsula representa um produto. Os extremos foram medidos; os valores entre eles são ilustrativos.',
      'Each capsule stands for one product. The extremes were measured; the values between them are illustrative.');
    sv.setAttribute('aria-label', L('Frasco de Mucuna 500 mg com 16 cápsulas transparentes e uma faixa de 100 a 250 mg, a dose de um comprimido de levodopa para Parkinson.', 'Bottle of Mucuna 500 mg with 16 clear capsules and a band from 100 to 250 mg, the dose of a levodopa tablet for Parkinson’s.'));
    desc.textContent = L('Cada cápsula se enche até a levodopa medida num produto, de 0 a 241 mg por dose; ' + inBand + ' de 16 ficam entre 100 e 250 mg. Os extremos foram medidos por Cohen et al. (2022); os valores intermediários são uma distribuição ilustrativa.',
      'Each capsule fills to the levodopa measured in one product, from 0 to 241 mg per dose; ' + inBand + ' of 16 fall between 100 and 250 mg. The extremes were measured by Cohen et al. (2022); the values in between are an illustrative spread.');
    layout();
  }
  relabel();
  DN.onLang(relabel);
  if (!risen) DN.onVisible(holder, function (v) { if (v && !risen) { risen = true; rise(); } }, { once: true, threshold: 0.4 });
  var rt = 0, lastW = 0;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      if (holder.clientWidth === lastW) return; lastW = holder.clientWidth;
      layout();
    }, 150);
  });
})();
