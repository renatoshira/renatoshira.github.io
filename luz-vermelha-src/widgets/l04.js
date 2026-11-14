/* l04 · pouca-e-demais : guess the light time on mouse wounds (Demidova-Rice 2007), then small multiples of other dose studies */
(function () {
  'use strict';
  var root = DN.body('l04'); if (!root) return;
  var L = DN.L, C = DN.COL;

  /* ---------- risograph helpers (copied from c02a, prefixed l04) ---------- */
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
  var INK = { a: C.rubi, b: C.infra };
  function risoDefs(R) {
    var defs = '';
    [{ k: 'a', ang: 15 }, { k: 'b', ang: 75 }].forEach(function (ink) {
      var p = 'l04r-' + ink.k;
      [0.45, 0.78, 1.08].forEach(function (r, j) {
        defs += '<pattern id="' + p + 'h' + (j + 1) + '" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.3" cy="1.3" r="' + r + '" fill="' + INK[ink.k] + '"/></pattern>';
      });
      defs += '<filter id="' + p + 'g" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.4" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.6" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
    });
    return defs;
  }
  function inkLayer(k, body, R) {
    var p = 'l04r-' + k;
    var mx = f1((R() < 0.5 ? -1 : 1) * (0.6 + R() * 1.1)), my = f1((R() < 0.5 ? -1 : 1) * (0.4 + R() * 0.9));
    body = body.replace(/\$0/g, INK[k]).replace(/\$([123])/g, 'url(#' + p + 'h$1)');
    return '<g class="l04-ink l04-ink-' + k + '" transform="translate(' + mx + ' ' + my + ')" opacity=".94" filter="url(#' + p + 'g)">' + body + '</g>';
  }
  /* mouse in profile (about 9 cm of body) with a wound on the back under a lamp, and a kitchen timer (about 6 cm) */
  function mouseArt() {
    var a = '', b = '';
    /* lamp and light falling on the wound */
    b += '<rect x="76" y="2" width="40" height="7" fill="$0"/>';
    a += '<path d="M80,9 L112,9 L106,47 L86,47Z" fill="$1"/>';
    /* tail */
    b += '<path d="M52,82 C30,92 22,100 4,96" stroke="$0" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    /* body and head */
    b += '<path d="M50,80 C46,58 70,44 98,46 C122,47 136,52 146,56 C156,60 166,66 172,74 C166,79 156,82 146,83 C128,90 76,92 50,80Z" fill="$2"/>';
    b += '<path d="M50,80 C46,58 70,44 98,46 C122,47 136,52 146,56 C156,60 166,66 172,74 C166,79 156,82 146,83 C128,90 76,92 50,80Z" stroke="$0" stroke-width="1.3" fill="none"/>';
    b += '<circle cx="140" cy="50" r="8" fill="$3"/><circle cx="156" cy="64" r="1.8" fill="$0"/>';
    b += '<path d="M70,88 l-3,6 M100,90 l1,6 M130,86 l3,6 M150,82 l3,5" stroke="$0" stroke-width="1.6" stroke-linecap="round"/>';
    /* shaved patch and wound (both inks overlap into wine) */
    b += '<ellipse cx="96" cy="49" rx="14" ry="4.2" fill="#fff"/>';
    a += '<ellipse cx="96" cy="48.6" rx="7" ry="2.6" fill="$0"/>';
    b += '<ellipse cx="96" cy="48.8" rx="5" ry="1.8" fill="$0"/>';
    /* timer */
    var tx = 212, ty = 66, r = 26;
    b += '<rect x="' + (tx - 5) + '" y="' + (ty - r - 7) + '" width="10" height="7" fill="$0"/>';
    b += '<circle cx="' + tx + '" cy="' + ty + '" r="' + r + '" stroke="$0" stroke-width="2.4" fill="$1"/>';
    var ticks = '';
    for (var i = 0; i < 12; i++) {
      var an = i / 12 * Math.PI * 2, c = Math.sin(an), s = -Math.cos(an);
      ticks += 'M' + f1(tx + c * (r - 3)) + ',' + f1(ty + s * (r - 3)) + 'L' + f1(tx + c * (r - 7)) + ',' + f1(ty + s * (r - 7));
    }
    b += '<path d="' + ticks + '" stroke="$0" stroke-width="1.3"/>';
    var e = 0.62 * Math.PI * 2;
    a += '<path d="M' + tx + ',' + ty + ' L' + tx + ',' + (ty - r + 8) + ' A' + (r - 8) + ',' + (r - 8) + ' 0 1 1 ' + f1(tx + Math.sin(e) * (r - 8)) + ',' + f1(ty - Math.cos(e) * (r - 8)) + 'Z" fill="$0"/>';
    b += '<path d="M' + tx + ',' + ty + ' L' + f1(tx + Math.sin(e) * (r - 6)) + ',' + f1(ty - Math.cos(e) * (r - 6)) + '" stroke="$0" stroke-width="1.8" stroke-linecap="round"/>';
    return { a: a, b: b };
  }

  /* ---------- data ---------- */
  /* Demidova-Rice 2007, 635 nm at 100 mW/cm2. The dossiers give only the order of the results:
     2 J/cm2 was the best, 50 J/cm2 left the wound larger than no light. Heights of 1 and 10 are
     drawn as approximate (dashed rings); the vertical axis has no scale. */
  var OPTS = [
    { d: 1, s: 10, v: 0.52, exact: false },
    { d: 2, s: 20, v: 1, exact: true },
    { d: 10, s: 100, v: 0.42, exact: false },
    { d: 50, s: 500, v: -0.5, exact: true }
  ];
  function tlabel(s) {
    if (s < 60) return s + ' s';
    var m = Math.floor(s / 60), r = s % 60;
    return m + ' min' + (r ? ' ' + r + ' s' : '');
  }
  function STUDIES() {
    return [
      { m: L('fibroblastos', 'fibroblasts'), r: 'Chen 2011', best: 0.3, up: 3, harm: false, upT: L('menor a 3', 'lower at 3') },
      { m: L('fibroblastos humanos', 'human fibroblasts'), r: 'Zhang 2003', best: 0.88, up: 8.68, harm: false, upT: L('menor a ', 'lower at ') + DN.fmt(8.68) },
      { m: L('fibroblastos feridos', 'wounded fibroblasts'), r: 'Hawkins 2005', best: 2.5, up: 10, harm: true, upT: L('dano a 10', 'damage at 10') },
      { m: L('neurônios de camundongo', 'mouse neurons'), r: 'Sharma 2011', best: 3, up: 30, harm: true, upT: L('membrana abaixo do normal a 30', 'membrane below normal at 30') },
      { m: L('células de articulação', 'joint cells'), r: 'Yamaura 2009', best: 5, up: 50, harm: false, upT: L('menos efeito a 50', 'less effect at 50') },
      { m: L('inflamação no pulmão de camundongo', 'lung inflammation in mice'), r: 'Lopes-Martins 2005', best: 7.5, up: 15, harm: false, upT: L('menos efeito a 15', 'less effect at 15') },
      { m: L('traumatismo craniano em camundongo', 'head injury in mice'), r: 'Huang 2011', best: 36, up: 360, harm: true, upT: L('pior que sem luz a 360', 'worse than no light at 360') }
    ];
  }

  function pchip(xs, ys) {
    var n = xs.length, h = [], d = [], m = [], i;
    for (i = 0; i < n - 1; i++) { h[i] = xs[i + 1] - xs[i]; d[i] = (ys[i + 1] - ys[i]) / h[i]; }
    for (i = 1; i < n - 1; i++) {
      if (d[i - 1] * d[i] <= 0) m[i] = 0;
      else { var w1 = 2 * h[i] + h[i - 1], w2 = h[i] + 2 * h[i - 1]; m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]); }
    }
    m[0] = d[0]; m[n - 1] = d[n - 2];
    return function (x) {
      if (x <= xs[0]) return ys[0];
      if (x >= xs[n - 1]) return ys[n - 1];
      var k = 0; while (k < n - 2 && x > xs[k + 1]) k++;
      var t = (x - xs[k]) / h[k], t2 = t * t, t3 = t2 * t;
      return (2 * t3 - 3 * t2 + 1) * ys[k] + (t3 - 2 * t2 + t) * h[k] * m[k] + (-2 * t3 + 3 * t2) * ys[k + 1] + (t3 - t2) * h[k] * m[k + 1];
    };
  }
  var lg = Math.log10 || function (v) { return Math.log(v) / Math.LN10; };

  /* ---------- state ---------- */
  var choice = null, revealed = !!DN.RM, surprised = false;

  /* ---------- skeleton ---------- */
  root.innerHTML = '';
  var guess = DN.el('div', { class: 'l04-guess' }, root);
  var artSvg = DN.svg('svg', { class: 'l04-art', viewBox: '0 0 242 102', 'aria-hidden': 'true' }, guess);
  var gR = DN.el('div', { class: 'l04-gr' }, guess);
  var q = DN.el('p', { class: 'l04-q', id: 'l04-q' }, gR);
  var btnRow = DN.el('div', { class: 'l04-btns', role: 'group', 'aria-labelledby': 'l04-q' }, gR);
  var btns = OPTS.map(function (o, i) {
    var b = DN.el('button', { type: 'button', class: 'btn l04-b', 'aria-pressed': 'false' }, btnRow);
    b.addEventListener('click', function () { pick(i); });
    return b;
  });
  var skip = DN.el('button', { type: 'button', class: 'l04-skip' }, gR);
  skip.addEventListener('click', function () { pick(null); });

  var main = DN.el('div', { class: 'l04-main' }, root);
  var mSvg = DN.svg('svg', { class: 'l04-msvg', role: 'img' }, main);
  var verdict = DN.el('p', { class: 'l04-verdict', 'aria-live': 'polite' }, root);
  var mult = DN.el('div', { class: 'l04-mult' }, root);
  var mHead = DN.el('p', { class: 'glabel l04-mh' }, mult);
  var sSvg = DN.svg('svg', { class: 'l04-ssvg', role: 'img' }, mult);
  var take = DN.el('p', { class: 'l04-read' }, root);
  var srT = DN.el('div', { class: 'sr' }, root);

  function drawArt() {
    var R = rng(4407), a = mouseArt();
    artSvg.innerHTML = '<defs>' + risoDefs(R) + '</defs>' + inkLayer('b', a.b, R) + inkLayer('a', a.a, R);
  }

  function text(parent, x, y, lines, cls, anchor, lh) {
    var t = DN.svg('text', { x: x, y: y, 'text-anchor': anchor || 'start', class: cls }, parent);
    lines.forEach(function (ln, j) {
      var ts = DN.svg('tspan', { x: x, dy: j ? (lh || 13) : 0 }, t); ts.textContent = ln;
      if (!j) ts.setAttribute('class', 'l04-lb');
    });
    return t;
  }

  /* ---------- the big chart ---------- */
  var MG = {}, W, narrow;
  function drawMain(anim) {
    W = Math.max(280, Math.floor(main.clientWidth || 900));
    narrow = W < 560;
    var H = narrow ? 382 : 330;
    var m = { t: narrow ? 58 : 34, r: narrow ? 12 : 40, b: narrow ? 92 : 50, l: narrow ? 10 : 118 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    var VMIN = narrow ? -1.25 : -0.85, VMAX = 1.2;
    function x(d) { return m.l + (lg(d) + 1) / 3 * iw; }
    function y(v) { return m.t + (VMAX - v) / (VMAX - VMIN) * ih; }
    mSvg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    mSvg.setAttribute('width', W); mSvg.setAttribute('height', H);
    mSvg.innerHTML = '';
    var g = DN.svg('g', { class: 'l04-grid' }, mSvg);
    /* decades */
    [0.1, 1, 10, 100].forEach(function (d) {
      DN.svg('line', { x1: x(d), x2: x(d), y1: m.t, y2: m.t + ih, class: 'l04-gl' }, g);
      var t = DN.svg('text', { x: x(d), y: m.t + ih + 16, 'text-anchor': d === 0.1 ? 'start' : d === 100 ? 'end' : 'middle', class: 'l04-tick' }, g);
      t.textContent = DN.fmt(d);
    });
    for (var e = -1; e < 2; e++) for (var k = 2; k < 10; k++) {
      var dd = k * Math.pow(10, e);
      DN.svg('line', { x1: x(dd), x2: x(dd), y1: m.t + ih, y2: m.t + ih + 3, class: 'l04-base' }, g);
    }
    DN.svg('line', { x1: m.l, x2: m.l + iw, y1: m.t + ih, y2: m.t + ih, class: 'l04-base' }, g);
    text(g, m.l + iw / 2, m.t + ih + 36, [L('dose de luz, J/cm² (escala logarítmica)', 'light dose, J/cm² (log scale)')], 'l04-axt', 'middle');
    /* zero line */
    DN.svg('line', { x1: m.l, x2: m.l + iw, y1: y(0), y2: y(0), class: 'l04-zero' }, g);
    /* y labels */
    if (!narrow) {
      text(g, m.l - 12, y(1) + 4, [L('fechou mais', 'closed faster'), L('depressa', 'than no light')], 'l04-ylab', 'end');
      text(g, m.l - 12, y(0) + 4, [L('sem luz', 'no light')], 'l04-ylab l04-ylab0', 'end');
      text(g, m.l - 12, y(-0.55) + 4, [L('ferida maior', 'wound larger'), L('que sem luz', 'than no light')], 'l04-ylab', 'end');
    } else {
      text(g, m.l + 2, y(0) - 6, [L('sem luz', 'no light')], 'l04-ylab l04-ylab0', 'start');
      text(g, m.l, 10, [L('↑ fechou mais depressa', '↑ closed faster')], 'l04-ylab', 'start');
    }
    /* curve: shape, not fit */
    var f = pchip([-1, 0, lg(2), 1, lg(50), 2], [0.06, 0.52, 1, 0.42, -0.5, -0.66]);
    var d = '';
    for (var i = 0; i <= 150; i++) { var lx = -1 + i / 150 * 3; d += (i ? 'L' : 'M') + (m.l + (lx + 1) / 3 * iw).toFixed(1) + ',' + y(f(lx)).toFixed(1); }
    var clip = DN.svg('clipPath', { id: 'l04-clip' }, mSvg);
    MG.clipR = DN.svg('rect', { x: 0, y: 0, width: W, height: H }, clip);
    MG.curveG = DN.svg('g', { 'clip-path': 'url(#l04-clip)' }, mSvg);
    DN.svg('path', { d: d, class: 'l04-curve' }, MG.curveG);
    if (!narrow) text(MG.curveG, m.l + (1.42 + 1) / 3 * iw + 8, y(f(1.42)) - 10, [L('forma, não ajuste', 'shape, not a fit')], 'l04-cl', 'start');
    /* points */
    MG.pts = DN.svg('g', { class: 'l04-pts' }, mSvg);
    MG.ring = DN.svg('circle', { r: 12, class: 'l04-ring' }, mSvg);
    OPTS.forEach(function (o, j) {
      var pg = DN.svg('g', { class: 'l04-p', style: '--j:' + j }, MG.pts);
      DN.svg('circle', { cx: x(o.d), cy: y(o.v), r: 5.5, class: o.exact ? 'l04-pt' : 'l04-pt l04-pt-ap' }, pg);
      var dl = DN.fmt(o.d) + ' J/cm²', tl = tlabel(o.s);
      if (j === 0) text(pg, x(o.d) - 18, y(o.v) - 10, [dl, tl], 'l04-plab', 'end');
      if (j === 1) text(pg, x(o.d), y(o.v) - 30, [L('melhor resultado', 'best result'), dl + ' · ' + tl], 'l04-plab l04-plab-a', 'middle');
      if (j === 2) text(pg, x(o.d) + (narrow ? 0 : 12), narrow ? y(o.v) + 22 : y(o.v) + 4, narrow ? [dl, tl] : [dl + ' · ' + tl], 'l04-plab', narrow ? 'middle' : 'start');
      if (j === 3) text(pg, x(o.d) - 12, y(o.v) + 22, [L('ferida maior que sem luz', 'wound larger than no light'), dl + ' · ' + tl], 'l04-plab l04-plab-a', 'end');
    });
    /* approximate note */
    var apx = narrow ? m.l + 2 : m.l + iw;
    if (narrow) text(mSvg, apx, H - 30, [L('tracejado: forma, não ajuste', 'dashed: shape, not a fit'), L('◌ altura aproximada; o eixo', '◌ approximate height; the'), L('vertical não tem escala', 'vertical axis has no scale')], 'l04-note', 'start');
    else text(mSvg, apx, m.t - 14, [L('◌ altura aproximada; o eixo vertical não tem escala', '◌ approximate height; the vertical axis has no scale')], 'l04-note', 'end');
    placeRing(x, y);
    MG.x = x; MG.y = y;
    mSvg.setAttribute('aria-label', L('Gráfico de Demidova-Rice 2007, feridas de camundongo com luz de 635 nm a 100 mW/cm². ', 'Chart of Demidova-Rice 2007, mouse wounds under 635 nm light at 100 mW/cm². ') +
      L('1 J/cm² (10 s) e 10 J/cm² (1 min 40 s) ajudaram menos; 2 J/cm² (20 s) deu o melhor resultado; 50 J/cm² (8 min 20 s) deixou a ferida maior que sem luz.',
        '1 J/cm² (10 s) and 10 J/cm² (1 min 40 s) helped less; 2 J/cm² (20 s) gave the best result; 50 J/cm² (8 min 20 s) left the wound larger than no light.'));
    if (anim && !DN.RM) play();
  }
  function placeRing(x, y) {
    x = x || MG.x; y = y || MG.y;
    if (choice == null) { MG.ring.setAttribute('display', 'none'); return; }
    var o = OPTS[choice];
    MG.ring.removeAttribute('display');
    MG.ring.setAttribute('cx', x(o.d)); MG.ring.setAttribute('cy', y(o.v));
  }
  function play() {
    main.classList.remove('l04-play'); void main.offsetWidth; main.classList.add('l04-play');
    var t0 = null, dur = 900, delay = 720;
    MG.clipR.setAttribute('width', 0);
    function step(ts) {
      if (t0 == null) t0 = ts;
      var k = DN.clamp((ts - t0 - delay) / dur, 0, 1);
      MG.clipR.setAttribute('width', (W * (1 - Math.pow(1 - k, 2))).toFixed(1));
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- small multiples ---------- */
  var SM = { shown: false };
  function drawMult() {
    var Wm = Math.max(280, Math.floor(mult.clientWidth || 900));
    var nar = Wm < 560;
    var S = STUDIES();
    var labW = nar ? 0 : 300, pl = labW, pr = nar ? 12 : 40, iw = Wm - pl - pr;
    var rowH = nar ? 112 : 64, plotH = nar ? 62 : 46, top = 30, bandH = nar ? 120 : 76, GAP = 34;
    var H = top + S.length * rowH + GAP + bandH + 30;
    function x(dv) { return pl + (lg(dv) + 3) / 6 * iw; }
    sSvg.setAttribute('viewBox', '0 0 ' + Wm + ' ' + H);
    sSvg.setAttribute('width', Wm); sSvg.setAttribute('height', H);
    sSvg.innerHTML = '';
    var g = DN.svg('g', null, sSvg);
    var yEnd = top + S.length * rowH + GAP + bandH;
    var decs = [0.001, 0.01, 0.1, 1, 10, 100, 1000];
    decs.forEach(function (dv) {
      DN.svg('line', { x1: x(dv), x2: x(dv), y1: top - 4, y2: yEnd, class: 'l04-gl' }, g);
      [top - 10, yEnd + 16].forEach(function (yy) {
        var t = DN.svg('text', { x: x(dv), y: yy, 'text-anchor': dv === 0.001 ? 'start' : dv === 1000 ? 'end' : 'middle', class: 'l04-tick' }, g);
        t.textContent = DN.fmt(dv);
      });
    });
    if (nar) text(g, Wm - pr, yEnd + 30, ['J/cm²'], 'l04-tick', 'end');
    else text(g, pl - 14, top - 10, ['J/cm²'], 'l04-tick', 'end');
    S.forEach(function (s, i) {
      var y0 = top + i * rowH, py0 = nar ? y0 + 38 : y0 + 8, base = py0 + plotH * 0.72, amp = plotH * 0.62;
      var rg = DN.svg('g', { class: 'l04-row', style: '--r:' + i }, sSvg);
      if (nar) {
        text(rg, 0, y0 + 14, [s.m], 'l04-rm', 'start');
        text(rg, 0, y0 + 28, [s.r + L(' · melhor: ', ' · best: ') + DN.fmt(s.best) + ' J/cm²'], 'l04-rr', 'start');
      } else {
        text(rg, 0, y0 + 24, [s.m], 'l04-rm', 'start');
        text(rg, 0, y0 + 40, [s.r + L(' · melhor: ', ' · best: ') + DN.fmt(s.best) + ' J/cm²'], 'l04-rr', 'start');
      }
      if (i) DN.svg('line', { x1: 0, x2: Wm - pr, y1: y0, y2: y0, class: 'l04-sep' }, rg);
      DN.svg('line', { x1: x(2), x2: x(2), y1: py0 - 4, y2: i === S.length - 1 ? top + S.length * rowH : y0 + rowH, class: 'l04-ref' }, rg);
      DN.svg('line', { x1: pl, x2: pl + iw, y1: base, y2: base, class: 'l04-zero l04-zero-s' }, rg);
      var c = lg(s.best), la = lg(s.up), ya = s.harm ? -0.32 : 0.34, ye = s.harm ? -0.42 : 0.06;
      var f = pchip([c - 2.3, c - 1.1, c, la, la + 0.9], [0.02, 0.32, 1, ya, ye]);
      var d = '';
      for (var k = 0; k <= 120; k++) { var lx = -3 + k / 120 * 6; d += (k ? 'L' : 'M') + (pl + (lx + 3) / 6 * iw).toFixed(1) + ',' + (base - f(lx) * amp).toFixed(1); }
      DN.svg('path', { d: d, class: 'l04-scurve' }, rg);
      DN.svg('circle', { cx: x(s.up), cy: base - ya * amp, r: 3.6, class: 'l04-sup' }, rg);
      DN.svg('circle', { cx: x(s.best), cy: base - amp, r: 4.6, class: 'l04-pt' }, rg);
      var bt = DN.svg('text', { x: x(s.best) - 8, y: base - amp + 4, 'text-anchor': 'end', class: 'l04-sb' }, rg); bt.textContent = DN.fmt(s.best);
      var upx = x(s.up) + 8, anc = 'start', upy = base - ya * amp + (s.harm ? 12 : -5);
      var upLen = s.upT.length * 10.5 * 0.6;
      if (nar) { upx = x(s.up) - 2; upy = s.harm ? base - ya * amp + 15 : base + 15; }
      if (upx + upLen > Wm - 2) { upx = x(s.up) + (nar ? 4 : -8); anc = 'end'; }
      var ut = DN.svg('text', { x: upx, y: upy, 'text-anchor': anc, class: 'l04-su' }, rg); ut.textContent = s.upT;
    });
    text(g, nar ? x(2) - 6 : x(2) + 6, top + S.length * rowH + 18, nar ? [L('2 J/cm²: a ferida de cima', '2 J/cm²: the wound above')] : [L('2 J/cm²: o melhor na ferida de cima', '2 J/cm²: the best for the wound above')], 'l04-reft', nar ? 'end' : 'start');
    /* device band */
    var by = top + S.length * rowH + GAP;
    var bg = DN.svg('g', { class: 'l04-band' }, sSvg);
    DN.svg('line', { x1: 0, x2: Wm - pr, y1: by - 6, y2: by - 6, class: 'l04-base' }, bg);
    text(bg, 0, by + 12, [L('o que um aparelho entrega', 'what a device delivers')], 'l04-rm', 'start');
    var r1 = nar ? by + 36 : by + 26, r2 = nar ? by + 86 : by + 56;
    DN.svg('rect', { x: x(31), y: r1 - 7, width: x(54) - x(31), height: 14, class: 'l04-range' }, bg);
    var t1 = nar ? [L('10 min de painel a 15 cm:', '10 min of a panel at 15 cm:'), L('cerca de 31 a 54 J/cm²', 'about 31 to 54 J/cm²')]
      : [L('10 min de painel a 15 cm: cerca de 31 a 54 J/cm²', '10 min of a panel at 15 cm: about 31 to 54 J/cm²')];
    text(bg, x(31) - 8, r1 + 4, t1, 'l04-bl', 'end');
    DN.svg('rect', { x: x(6) - 4, y: r2 - 4, width: 8, height: 8, class: 'l04-mask', transform: 'rotate(45 ' + x(6) + ' ' + r2 + ')' }, bg);
    var t2 = nar ? [L('10 min de máscara de', '10 min of a 10 mW/cm²'), L('10 mW/cm²: 6 J/cm²', 'mask: 6 J/cm²')]
      : [L('10 min de máscara de 10 mW/cm²: 6 J/cm²', '10 min of a 10 mW/cm² mask: 6 J/cm²')];
    text(bg, x(6) - 10, r2 + 4, t2, 'l04-bl', 'end');
    sSvg.setAttribute('aria-label', L('Sete pequenos gráficos com o mesmo eixo de dose, de 0,001 a 1.000 J/cm². ', 'Seven small charts on the same dose axis, 0.001 to 1,000 J/cm². ') +
      S.map(function (s) { return s.m + ' (' + s.r + '): ' + L('melhor ', 'best ') + DN.fmt(s.best) + ' J/cm², ' + s.upT; }).join('; ') + '. ' +
      L('Dez minutos de painel a 15 cm entregam cerca de 31 a 54 J/cm²; dez minutos de máscara de 10 mW/cm², 6 J/cm².', 'Ten minutes of a panel at 15 cm deliver about 31 to 54 J/cm²; ten minutes of a 10 mW/cm² mask, 6 J/cm².'));
  }

  function srTable() {
    var S = STUDIES();
    var h = '<table><caption>' + L('Melhor dose em cada estudo e o que acontece acima dela', 'Best dose in each study and what happens above it') + '</caption><tr><th>' + L('estudo', 'study') + '</th><th>' + L('modelo', 'model') + '</th><th>' + L('melhor dose', 'best dose') + '</th><th>' + L('acima', 'above') + '</th></tr>';
    h += '<tr><td>Demidova-Rice 2007</td><td>' + L('ferida de camundongo', 'mouse wound') + '</td><td>2 J/cm²</td><td>' + L('50 J/cm²: ferida maior que sem luz', '50 J/cm²: wound larger than no light') + '</td></tr>';
    S.forEach(function (s) { h += '<tr><td>' + s.r + '</td><td>' + s.m + '</td><td>' + DN.fmt(s.best) + ' J/cm²</td><td>' + s.upT + ' J/cm²</td></tr>'; });
    srT.innerHTML = h + '</table>';
  }

  function verdictText() {
    if (!revealed) return '';
    if (choice == null) return L('Sem palpite. O melhor resultado veio com <b>20 s</b> de luz, e <b>8 min 20 s</b> deixaram a ferida maior que sem luz.',
      'No guess. The best result came with <b>20 s</b> of light, and <b>8 min 20 s</b> left the wound larger than no light.');
    return [
      L('Você escolheu <b>10 s</b>. O melhor resultado veio com o dobro desse tempo, <b>20 s</b>.', 'You chose <b>10 s</b>. The best result came with twice that time, <b>20 s</b>.'),
      L('Você escolheu <b>20 s</b>, o tempo que deu o melhor resultado.', 'You chose <b>20 s</b>, the time that gave the best result.'),
      L('Você escolheu <b>1 min 40 s</b>. O melhor resultado veio com <b>20 s</b>, um quinto dessa luz.', 'You chose <b>1 min 40 s</b>. The best result came with <b>20 s</b>, one fifth of that light.'),
      L('Você escolheu <b>8 min 20 s</b>. Foi o único tempo que deixou a ferida maior que sem luz.', 'You chose <b>8 min 20 s</b>. It was the only time that left the wound larger than no light.')
    ][choice];
  }

  function pick(i) {
    var first = !revealed;
    choice = i; revealed = true;
    btns.forEach(function (b, j) { b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
    update(first);
    if (i === 3 && !surprised) { surprised = true; DN.surprise('l04'); }
  }

  function labels() {
    q.textContent = L('Com a mesma lâmpada, qual tempo de luz fechou a ferida mais depressa?', 'With the same lamp, which light time closed the wound fastest?');
    btns.forEach(function (b, j) {
      var o = OPTS[j];
      b.innerHTML = '<b>' + tlabel(o.s) + '</b><span>' + DN.fmt(o.d) + ' J/cm²</span>';
    });
    skip.textContent = L('ver sem palpitar', 'show without guessing');
    mHead.textContent = L('O melhor resultado em outros sete estudos, no mesmo eixo de dose', 'The best result in seven other studies, on the same dose axis');
    take.textContent = L('A dose que mais ajudou a ferida foi de 20 segundos, e oito minutos com o mesmo aparelho deixaram a ferida pior que sem luz. O ponto ótimo muda de um tecido para outro, de 0,3 a 36 J/cm² nestes estudos, e o formato de sino aparece em quase todos.',
      'The dose that helped the wound most was 20 seconds, and eight minutes with the same device left the wound worse than no light. The best point changes from one tissue to another, from 0.3 to 36 J/cm² in these studies, and the bell shape shows up in almost all of them.');
  }

  function update(anim) {
    root.classList.toggle('l04-rev', revealed);
    main.hidden = !revealed;
    take.hidden = !revealed;
    skip.hidden = revealed;
    if (revealed) drawMain(anim);
    verdict.innerHTML = verdictText();
  }

  function render() {
    labels(); drawArt(); drawMult(); srTable();
    update(false);
  }

  /* small multiples reveal on scroll, one row at a time */
  if (!DN.RM && 'IntersectionObserver' in window) {
    mult.classList.add('l04-pre');
    DN.onVisible(mult, function (vis) { if (vis) { mult.classList.add('l04-in'); mult.classList.remove('l04-pre'); } }, { once: true, margin: '0px 0px -15% 0px' });
  }

  var rt, lastW = 0;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { var w = root.clientWidth; if (w !== lastW) { lastW = w; drawMult(); if (revealed) drawMain(false); } }, 150);
  });
  DN.onLang(render);
  lastW = root.clientWidth;
  render();
})();
