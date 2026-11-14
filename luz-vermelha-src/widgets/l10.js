/* l10 · o-sol : the midday sun, a panel, a mask and a heat lamp split by wavelength band.
   Top: the ASTM G173 spectrum with the 600 to 1000 nm area painted and a schematic LED
   panel. Bottom: one bar per source, aligned at 600 nm, and the time to 10 J/cm². */
(function () {
  'use strict';
  var root = DN.body('l10'); if (!root) return;
  var host = document.getElementById('l10');
  var L = DN.L, fmt = DN.fmt, C = DN.COL;

  /* ASTM G173-03 global tilt, 280 to 1400 nm, mean of each 5 nm bin, W/m2/nm */
  var G173 = [0.0,0.0,0.0,0.0,0.001,0.014,0.058,0.126,0.211,0.303,0.415,0.422,0.466,0.474,0.507,0.553,0.505,0.648,0.7,0.622,0.739,0.576,0.746,0.61,1.018,1.144,1.17,1.22,1.212,1.213,1.054,1.274,1.302,1.423,1.548,1.529,1.56,1.551,1.557,1.574,1.615,1.488,1.532,1.591,1.528,1.554,1.57,1.469,1.493,1.505,1.583,1.526,1.514,1.545,1.541,1.536,1.499,1.508,1.485,1.495,1.495,1.53,1.411,1.458,1.458,1.484,1.475,1.439,1.464,1.415,1.389,1.44,1.448,1.436,1.388,1.324,1.39,1.407,1.418,1.405,1.398,1.289,1.187,1.277,1.285,1.305,1.311,1.246,1.053,1.081,1.088,1.212,1.213,1.247,1.234,1.23,0.706,0.679,1.15,1.177,1.168,1.156,1.11,1.089,1.089,1.076,1.055,0.898,0.908,0.899,0.903,0.975,1.005,1.004,0.963,0.939,0.991,0.941,0.959,0.947,0.934,0.925,0.923,0.793,0.655,0.753,0.668,0.648,0.711,0.734,0.457,0.194,0.37,0.3,0.334,0.342,0.432,0.495,0.675,0.596,0.653,0.717,0.744,0.746,0.737,0.716,0.721,0.712,0.699,0.695,0.689,0.679,0.673,0.66,0.657,0.647,0.629,0.624,0.608,0.607,0.595,0.578,0.58,0.531,0.492,0.464,0.411,0.22,0.148,0.118,0.161,0.125,0.235,0.158,0.212,0.258,0.327,0.409,0.441,0.439,0.413,0.44,0.427,0.456,0.424,0.429,0.43,0.451,0.456,0.451,0.466,0.464,0.463,0.457,0.456,0.444,0.422,0.388,0.364,0.412,0.412,0.42,0.411,0.397,0.382,0.344,0.34,0.305,0.292,0.273,0.186,0.19,0.174,0.086,0.009,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.001];

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
  function T(parent, x, y, txt, cls, anchor) {
    var t = DN.svg('text', { x: f1(x), y: f1(y), class: cls || '', 'text-anchor': anchor || 'start' }, parent);
    t.textContent = txt; return t;
  }
  function E(tag, cls, parent, html) { return DN.el(tag, { class: cls }, parent, html); }

  /* ---------- risograph icons ---------- */
  var INKS = [{ k: 'a', col: C.rubi, ang: 15, op: 0.95 }, { k: 'b', col: C.infra, ang: 75, op: 0.92 }];
  function risoDefs(p) {
    var R = rng(1010), s = '';
    INKS.forEach(function (ink) {
      var q = p + ink.k;
      [0.5, 0.82, 1.12].forEach(function (r, j) {
        s += '<pattern id="' + q + 'h' + (j + 1) + '" width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.2" cy="1.2" r="' + r + '" fill="' + ink.col + '"/></pattern>';
      });
      s += '<filter id="' + q + 'g" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.4" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3 0 0 0 2.5" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
    });
    s += '<pattern id="l10-hat" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="4" fill="' + C.infra + '"/><line x1="0" y1="0" x2="0" y2="4" stroke="#fff" stroke-width="1" stroke-opacity=".45"/></pattern>' +
      '<pattern id="l10-two" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="' + C.rubi + '"/><rect width="2.4" height="6" fill="' + C.infra + '"/></pattern>' +
      '<pattern id="l10-uv" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><rect width="4" height="4" fill="#555"/><line x1="0" y1="0" x2="0" y2="4" stroke="#fff" stroke-width="1" stroke-opacity=".5"/></pattern>' +
      '<pattern id="l10-rng" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" stroke="' + C.rubi + '" stroke-width="1.6"/></pattern>';
    return '<svg class="l10-defs" width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden"><defs>' + s + '</defs></svg>';
  }
  var ICON = {
    sol: {
      a: '<circle cx="32" cy="32" r="13" fill="$0"/>' +
        '<path d="M32,9 V14 M32,50 v5 M9,32 h5 M50,32 h5 M15.7,15.7 l3.5,3.5 M44.8,44.8 l3.5,3.5 M15.7,48.3 l3.5,-3.5 M44.8,19.2 l3.5,-3.5" stroke="$0" stroke-width="3" stroke-linecap="round"/>',
      b: '<circle cx="34" cy="34" r="13" fill="$1"/>'
    },
    painel: {
      a: (function () { var s = ''; for (var r = 0; r < 6; r++) for (var c = 0; c < 3; c++) s += '<circle cx="' + (24 + c * 8) + '" cy="' + (13 + r * 7.6) + '" r="2.4" fill="' + ((r + c) % 2 ? '$2' : '$0') + '"/>'; return s; })(),
      b: '<rect x="18" y="7" width="28" height="50" rx="2" fill="none" stroke="$0" stroke-width="2.6"/>' +
        '<path d="M22,57 v4 M42,57 v4" stroke="$0" stroke-width="2.6" stroke-linecap="round"/>' +
        (function () { var s = ''; for (var r = 0; r < 6; r++) for (var c = 0; c < 3; c++) if ((r + c) % 2) s += '<circle cx="' + (24 + c * 8) + '" cy="' + (13 + r * 7.6) + '" r="2.2" fill="$0"/>'; return s; })()
    },
    mascara: {
      a: '<path d="M15,22 C15,12 22,7 32,7 C42,7 49,12 49,22 L49,36 C49,48 41,57 32,57 C23,57 15,48 15,36Z" fill="$1"/>' +
        (function () { var s = ''; [[24, 18], [32, 15], [40, 18], [21, 30], [43, 30], [24, 44], [32, 49], [40, 44], [32, 33]].forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.9" fill="$0"/>'; }); return s; })(),
      b: '<path d="M15,22 C15,12 22,7 32,7 C42,7 49,12 49,22 L49,36 C49,48 41,57 32,57 C23,57 15,48 15,36Z" fill="none" stroke="$0" stroke-width="2.6"/>' +
        '<path d="M21,25 q5,-4 9,0 q-4,3 -9,0Z M34,25 q5,-4 9,0 q-4,3 -9,0Z M27,41 q5,3 10,0" fill="$0" stroke="$0" stroke-width="1.6" stroke-linejoin="round"/>' +
        '<path d="M15,30 H7 M49,30 h8" stroke="$0" stroke-width="2" stroke-linecap="round"/>'
    },
    lampada: {
      a: '<path d="M32,8 C20,8 13,17 13,27 C13,35 18,40 23,45 L41,45 C46,40 51,35 51,27 C51,17 44,8 32,8Z" fill="$1"/>' +
        '<path d="M26,36 L29,26 L32,34 L35,26 L38,36" stroke="$0" stroke-width="2" fill="none" stroke-linejoin="round"/>',
      b: '<path d="M32,8 C20,8 13,17 13,27 C13,35 18,40 23,45 L41,45 C46,40 51,35 51,27 C51,17 44,8 32,8Z" fill="none" stroke="$0" stroke-width="2.4"/>' +
        '<path d="M23,45 H41 V50 H23Z M25,50 H39 V54 H25Z M28,54 H36 V58 H28Z" fill="$2"/>' +
        '<path d="M23,47.5 H41 M25,52 H39" stroke="$0" stroke-width="1.4"/>'
    }
  };
  function icon(k) {
    var R = rng(k.length * 97 + 13), out = '';
    INKS.forEach(function (ink, li) {
      var q = 'l10r-' + ink.k;
      var mx = f1((R() < 0.5 ? -1 : 1) * (0.6 + R() * (li ? 1.3 : 0.6)));
      var my = f1((R() < 0.5 ? -1 : 1) * (0.5 + R() * (li ? 1.0 : 0.5)));
      var body = ICON[k][ink.k].replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#' + q + 'h$1)');
      for (var s = 0; s < 3; s++) body += '<circle cx="' + f1(6 + R() * 52) + '" cy="' + f1(6 + R() * 52) + '" r="' + f1(0.35 + R() * 0.45) + '" fill="' + ink.col + '"/>';
      out += '<g class="l10-ink l10-ink-' + ink.k + '" transform="translate(' + mx + ' ' + my + ')" opacity="' + ink.op + '" filter="url(#' + q + 'g)">' + body + '</g>';
    });
    return '<svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">' + out + '</svg>';
  }

  /* ---------- the sources (mW/cm2) ---------- */
  var SRC = [
    { k: 'sol', n: ['Sol ao meio-dia', 'Midday sun'], d: ['céu limpo, latitude média', 'clear sky, mid latitude'],
      uv: 4.6, vis: 29.1, win: 40.3, heat: 26.0, t: ['cerca de 4 min', 'about 4 min'] },
    { k: 'painel', n: ['Painel a 15 cm', 'Panel at 15 cm'], d: ['medido por revisores', 'measured by reviewers'],
      uv: 0, vis: 0, win: 52, winHi: 90, heat: 0, t: ['2 a 3 min', '2 to 3 min'] },
    { k: 'mascara', n: ['Máscara de LED', 'LED mask'], d: ['do ensaio controlado', 'from the controlled trial'],
      uv: 0, vis: 0, win: 10, upTo: true, heat: 0, t: ['cerca de 17 min', 'about 17 min'] }
  ];

  /* ---------- skeleton ---------- */
  root.innerHTML = risoDefs('l10r-');
  var read = E('p', 'l10-read', root);
  var spec = E('div', 'l10-spec', root);
  var bars = E('div', 'l10-bars', root);
  var lamp = E('div', 'l10-lamp', root);
  var note = E('p', 'l10-note', root);
  var table = DN.el('table', { class: 'sr' }, root);
  var shown = DN.RM;

  function drawSpec(W) {
    spec.innerHTML = '';
    var mob = W < 640;
    var H = mob ? 210 : 270, pl = mob ? 34 : 50, pr = W - (mob ? 6 : 12), pt = mob ? 54 : 30, pb = H - 42;
    var YM = 2.0;
    function X(l) { return pl + (l - 280) / 1120 * (pr - pl); }
    function Y(v) { return pb - Math.min(v, YM) / YM * (pb - pt); }
    var svg = DN.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H, role: 'img' }, spec);
    svg.setAttribute('aria-label', L('Espectro do sol ao meio-dia de 280 a 1.400 nm. A área de 600 a 1.000 nm soma 40,3 mW/cm². Na faixa de 650 a 670 nm o sol entrega 2,8 mW/cm², e na de 800 a 870 nm, 6,8. Um painel de LED concentra a luz em dois picos estreitos, em 660 e 850 nm.',
      'Spectrum of the midday sun from 280 to 1,400 nm. The area from 600 to 1,000 nm adds up to 40.3 mW/cm². In the 650 to 670 nm band the sun delivers 2.8 mW/cm², and in the 800 to 870 nm band, 6.8. An LED panel concentrates its light in two narrow peaks, at 660 and 850 nm.'));
    var clip = DN.svg('clipPath', { id: 'l10-cl' }, DN.svg('defs', null, svg));
    DN.svg('rect', { x: pl, y: pt - 2, width: pr - pl, height: pb - pt + 2 }, clip);
    /* y grid in mW/cm2 per nm */
    [0, 0.05, 0.1, 0.15].forEach(function (v) {
      DN.svg('line', { x1: pl, y1: Y(v * 10), x2: pr, y2: Y(v * 10), class: 'l10-grid' }, svg);
      T(svg, pl - 6, Y(v * 10) + 3.5, v ? fmt(v, 2) : '0', 'l10-tick', 'end');
    });
    T(svg, pl - (mob ? 30 : 46), pt - (mob ? 40 : 16), L('mW/cm² por nm', 'mW/cm² per nm'), 'l10-tick', 'start');
    function area(a, b) {
      var d = 'M' + f1(X(a)) + ',' + f1(pb);
      for (var i = 0; i < G173.length; i++) {
        var l = 280 + i * 5; if (l < a || l > b) continue;
        d += 'L' + f1(X(l)) + ',' + f1(Y(G173[i]));
      }
      return d + 'L' + f1(X(b)) + ',' + f1(pb) + 'Z';
    }
    var gA = DN.svg('g', null, svg);
    DN.svg('path', { d: area(280, 400), fill: 'url(#l10-uv)', class: 'l10-a' }, gA);
    DN.svg('path', { d: area(400, 600), class: 'l10-a l10-avis' }, gA);
    DN.svg('path', { d: area(1000, 1400), class: 'l10-a l10-aheat' }, gA);
    var gW = DN.svg('g', { class: 'l10-win' + (shown ? ' l10-on' : '') }, svg);
    DN.svg('path', { d: area(600, 700), fill: C.rubi }, gW);
    DN.svg('path', { d: area(700, 1000), fill: 'url(#l10-hat)' }, gW);
    DN.svg('path', { d: area(650, 670), class: 'l10-band' }, gW);
    DN.svg('path', { d: area(800, 870), class: 'l10-band' }, gW);
    /* the sun outline */
    var d = '';
    G173.forEach(function (v, i) { d += (i ? 'L' : 'M') + f1(X(280 + i * 5)) + ',' + f1(Y(v)); });
    DN.svg('path', { d: d, class: 'l10-sun' }, svg);
    /* schematic LED panel: two narrow peaks that run off the top */
    var led = '';
    [660, 850].forEach(function (c) {
      var p = 'M' + f1(X(c - 40)) + ',' + f1(pb);
      for (var l = c - 40; l <= c + 40; l += 2) {
        var g = Math.exp(-Math.pow(l - c, 2) / (2 * 10.6 * 10.6)) * 12;
        p += 'L' + f1(X(l)) + ',' + f1(pb - g / YM * (pb - pt));
      }
      led += p;
    });
    DN.svg('path', { d: led, class: 'l10-led', 'clip-path': 'url(#l10-cl)' }, svg);
    [660, 850].forEach(function (c) {
      DN.svg('path', { d: 'M' + f1(X(c)) + ',' + f1(pt - 10) + ' l-3.5,6 h7Z', class: 'l10-arrow' }, svg);
    });
    DN.svg('line', { x1: pl, y1: pb, x2: pr, y2: pb, class: 'l10-axis' }, svg);
    [400, 600, 700, 1000, 1400].forEach(function (l) {
      if (mob && l === 700) return;
      DN.svg('line', { x1: X(l), y1: pb, x2: X(l), y2: pb + 4, class: 'l10-axis' }, svg);
      T(svg, X(l), pb + 15, fmt(l) + (l === 1400 ? ' nm' : ''), 'l10-tick', l === 1400 ? 'end' : 'middle');
    });
    /* bracket under the painted area */
    var by = pb + 24;
    DN.svg('path', { d: 'M' + f1(X(600)) + ',' + (by - 4) + ' V' + by + ' H' + f1(X(1000)) + ' V' + (by - 4), class: 'l10-brk' }, svg);
    T(svg, X(800), by + 13, L('600 a 1.000 nm: 40,3 mW/cm²', '600 to 1,000 nm: 40.3 mW/cm²'), 'l10-brkt', 'middle');
    /* labels */
    var lab = DN.svg('g', null, svg);
    T(lab, X(mob ? 470 : 480), Y(1.62) - 8, L('sol', 'sun'), 'l10-labk', 'middle');
    if (!mob) {
      T(lab, X(905), pt + 2, L('painel de LED, forma esquemática:', 'LED panel, schematic shape:'), 'l10-labl', 'start');
      T(lab, X(905), pt + 15, L('os picos passam do topo', 'the peaks run off the top'), 'l10-labl', 'start');
      DN.svg('path', { d: 'M' + f1(X(902)) + ',' + f1(pt + 5) + ' L' + f1(X(860)) + ',' + f1(pt + 12), class: 'l10-lead' }, lab);
      /* callouts on the two narrow bands */
      var c1 = [X(1100), Y(1.55)], c2 = [X(1100), Y(1.2)];
      T(lab, c1[0], c1[1], L('650 a 670 nm, a faixa de um LED de 660:', '650 to 670 nm, the band of a 660 LED:'), 'l10-call', 'start');
      T(lab, c1[0], c1[1] + 13, L('só 2,8 mW/cm²', 'only 2.8 mW/cm²'), 'l10-callb', 'start');
      T(lab, c2[0], c2[1], L('800 a 870 nm, a faixa de um LED de 850:', '800 to 870 nm, the band of an 850 LED:'), 'l10-call', 'start');
      T(lab, c2[0], c2[1] + 13, L('6,8 mW/cm²', '6.8 mW/cm²'), 'l10-callb', 'start');
      DN.svg('path', { d: 'M' + f1(c1[0] - 4) + ',' + f1(c1[1] - 4) + ' C' + f1(X(900)) + ',' + f1(c1[1] - 30) + ' ' + f1(X(700)) + ',' + f1(Y(1.7)) + ' ' + f1(X(662)) + ',' + f1(Y(1.42) - 2), class: 'l10-lead' }, lab);
      DN.svg('path', { d: 'M' + f1(c2[0] - 4) + ',' + f1(c2[1] - 4) + ' L' + f1(X(872)) + ',' + f1(Y(1.0)), class: 'l10-lead' }, lab);
      T(lab, X(345), Y(0.85), 'UV', 'l10-labs', 'middle');
      T(lab, X(1200), Y(0.62), L('acima de 1.000 nm: calor', 'above 1,000 nm: heat'), 'l10-labs', 'middle');
    } else {
      T(lab, X(905), pt - 26, L('LED: picos que', 'LED: peaks that'), 'l10-labl', 'start');
      T(lab, X(905), pt - 14, L('passam do topo', 'run off the top'), 'l10-labl', 'start');
      T(lab, X(1110), Y(1.35), L('faixa de 660:', 'band of 660:'), 'l10-call', 'start');
      T(lab, X(1110), Y(1.35) + 12, '2,8 mW/cm²'.replace('2,8', fmt(2.8, 1)), 'l10-callb', 'start');
      T(lab, X(1110), Y(1.35) + 28, L('faixa de 850:', 'band of 850:'), 'l10-call', 'start');
      T(lab, X(1110), Y(1.35) + 40, fmt(6.8, 1) + ' mW/cm²', 'l10-callb', 'start');
    }
  }

  function drawBars(W) {
    bars.innerHTML = '';
    var mob = W < 640;
    var LEFT = 34, RIGHT = 90;
    var head = E('div', 'l10-bh', bars);
    var rows = E('div', 'l10-rows', bars);
    var bw = mob ? W - 4 : W - 64 - 170 - 180 - 24;
    var x0 = (LEFT / (LEFT + RIGHT)) * (bw - 74) + 4;
    var u = (bw - 74) / (LEFT + RIGHT);
    function X(v) { return x0 + v * u; }
    head.innerHTML = '<span class="l10-sp1"></span><span class="l10-hd" style="width:' + bw + 'px">' +
      '<span style="left:0;width:' + f1(x0 - 4) + 'px;text-align:right">' + L('← UV e visível', '← UV and visible') + '</span>' +
      '<span class="l10-hd6" style="left:' + f1(x0 + 4) + 'px">' + L('600 a 1.000 nm, depois calor →', '600 to 1,000 nm, then heat →') + '</span></span>' +
      '<span class="l10-hdt">' + L('para chegar a 10 J/cm² em 600 a 1.000 nm', 'to reach 10 J/cm² in 600 to 1,000 nm') + '</span>';
    SRC.forEach(function (s, i) {
      var row = E('div', 'l10-row l10-row-' + s.k, rows);
      E('div', 'l10-ic', row, icon(s.k));
      E('div', 'l10-nm', row, '<b>' + L(s.n[0], s.n[1]) + '</b><span>' + L(s.d[0], s.d[1]) + '</span>');
      var top = i === 0 ? 30 : 6;
      var H = top + 22 + 8 + (i === 0 ? 14 : 0);
      var svg = DN.svg('svg', { viewBox: '0 0 ' + bw + ' ' + H, width: bw, height: H, class: 'l10-bsvg', role: 'img' }, E('div', 'l10-bar', row));
      var by = top, bh = 20;
      var g = DN.svg('g', { class: 'l10-grow' + (shown ? ' l10-on' : '') }, svg);
      g.style.transitionDelay = (DN.RM ? 0 : 0.15 + i * 0.35) + 's';
      g.style.transformOrigin = f1(X(0)) + 'px 0px';
      var segs = [];
      if (s.uv) segs.push({ a: -(s.uv + s.vis), b: -s.vis, fill: 'url(#l10-uv)' });
      if (s.vis) segs.push({ a: -s.vis, b: 0, cls: 'l10-svis' });
      segs.push({ a: 0, b: s.win, fill: 'url(#l10-two)' });
      if (s.winHi) segs.push({ a: s.win, b: s.winHi, fill: 'url(#l10-rng)', cls: 'l10-srng' });
      if (s.heat) segs.push({ a: s.win, b: s.win + s.heat, cls: 'l10-sheat' });
      segs.forEach(function (q) {
        DN.svg('rect', { x: f1(X(q.a)), y: by, width: f1(X(q.b) - X(q.a)), height: bh, fill: q.fill, class: 'l10-seg ' + (q.cls || '') }, g);
      });
      DN.svg('line', { x1: X(0), y1: by - (i === 0 ? 26 : 4), x2: X(0), y2: by + bh + 4, class: 'l10-zero' }, svg);
      var txt = DN.svg('g', { class: 'l10-late' + (shown ? ' l10-on' : '') }, svg);
      txt.style.transitionDelay = (DN.RM ? 0 : 0.6 + i * 0.35) + 's';
      if (s.k === 'sol') {
        /* names and values above each segment of the sun */
        T(txt, X(-s.vis - s.uv), by + bh + 13, 'UV ' + fmt(4.6, 1), 'l10-v', 'start');
        T(txt, X(-s.vis / 2), by - 16, L('visível', 'visible'), 'l10-sn', 'middle');
        T(txt, X(-s.vis / 2), by - 4, mob ? '29' : L('cerca de 29', 'about 29'), 'l10-v', 'middle');
        T(txt, X(s.win / 2), by - 16, mob ? L('600 a 1.000', '600 to 1,000') : L('600 a 1.000 nm', '600 to 1,000 nm'), 'l10-sn', 'middle');
        T(txt, X(s.win / 2), by - 4, fmt(40.3, 1), 'l10-vb', 'middle');
        T(txt, X(s.win) + 3, by - 16, L('acima de 1.000', 'above 1,000'), 'l10-sn', 'start');
        T(txt, X(s.win) + 3, by - 4, fmt(26.0, 1) + L(', calor', ', heat'), 'l10-v', 'start');
      } else {
        T(txt, X(0) - 6, by + 14, L('sem UV', 'no UV'), 'l10-v l10-dim', 'end');
        var end = s.winHi || s.win;
        T(txt, X(end) + 6, by + 14, s.winHi ? L('52 a 90', '52 to 90') : L('até 10', 'up to 10'), 'l10-vb', 'start');
      }
      if (s.upTo) DN.svg('path', { d: 'M' + f1(X(s.win)) + ',' + (by - 3) + ' v' + (bh + 6), class: 'l10-upto' }, txt);
      E('div', 'l10-t', row, '<span class="l10-tl">' + L('10 J/cm² em ', '10 J/cm² in ') + '</span><b>' + L(s.t[0], s.t[1]) + '</b>');
    });
    /* scale */
    var ax = E('div', 'l10-row l10-axrow', rows);
    E('div', 'l10-ic', ax); E('div', 'l10-nm', ax);
    var asvg = DN.svg('svg', { viewBox: '0 0 ' + bw + ' 22', width: bw, height: 22 }, E('div', 'l10-bar', ax));
    DN.svg('line', { x1: X(-30), y1: 3, x2: X(90), y2: 3, class: 'l10-axis' }, asvg);
    [-30, -20, -10, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90].forEach(function (v) {
      if (mob && v % 20 && v !== -30 && v !== -10) return;
      DN.svg('line', { x1: X(v), y1: 3, x2: X(v), y2: 7, class: 'l10-axis' }, asvg);
      T(asvg, X(v), 18, String(Math.abs(v)), 'l10-tick', 'middle');
    });
    E('div', 'l10-t l10-unit', ax, 'mW/cm²');
  }

  function drawLamp(W) {
    lamp.innerHTML = '';
    var mob = W < 640;
    var row = E('div', 'l10-row l10-row-lampada', lamp);
    E('div', 'l10-ic', row, icon('lampada'));
    E('div', 'l10-nm', row, '<b>' + L('Lâmpada incandescente de calor', 'Incandescent heat lamp') + '</b><span>' + L('em proporção da luz que emite, sem valor absoluto', 'as a share of the light it gives off, no absolute value') + '</span>');
    var bw = mob ? W - 4 : W - 64 - 170 - 180 - 24;
    var svg = DN.svg('svg', { viewBox: '0 0 ' + bw + ' 48', width: bw, height: 48, class: 'l10-bsvg', role: 'img' }, E('div', 'l10-bar', row));
    svg.setAttribute('aria-label', L('Lâmpada de calor: 15% a 18% da luz entre 600 e 1.000 nm e 80% a 84% acima de 1.000 nm.', 'Heat lamp: 15% to 18% of the light between 600 and 1,000 nm and 80% to 84% above 1,000 nm.'));
    var w = bw - 4;
    var g = DN.svg('g', { class: 'l10-grow' + (shown ? ' l10-on' : '') }, svg);
    g.style.transitionDelay = (DN.RM ? 0 : 1.3) + 's';
    g.style.transformOrigin = '2px 0px';
    /* rest (visible) about 2%, window 16.5%, heat 81.5% at the midpoints; the ranges are written */
    var a = w * 0.02, b = w * 0.185;
    DN.svg('rect', { x: 2, y: 4, width: f1(a), height: 20, class: 'l10-seg l10-svis' }, g);
    DN.svg('rect', { x: f1(2 + a), y: 4, width: f1(b - a), height: 20, fill: 'url(#l10-two)', class: 'l10-seg' }, g);
    DN.svg('rect', { x: f1(2 + b), y: 4, width: f1(w - b), height: 20, class: 'l10-seg l10-sheat' }, g);
    T(svg, 2 + a, 40, L('15 a 18%', '15 to 18%'), 'l10-vb', 'start');
    T(svg, w + 2, 40, L('80 a 84% acima de 1.000 nm, calor', '80 to 84% above 1,000 nm, heat'), 'l10-v', 'end');
    E('div', 'l10-t', row, '<span class="l10-tl">' + L('10 J/cm²: ', '10 J/cm²: ') + '</span><b>' + L('sem dado', 'no data') + '</b>');
  }

  function render() {
    var W = Math.max(280, root.clientWidth || 600);
    host.classList.toggle('l10-mob', W < 640);
    read.textContent = L('Ao meio-dia, o sol entrega cerca de 40 mW/cm² entre 600 e 1.000 nm, mais que uma máscara e entre metade e três quartos de um painel a 15 cm. O sol espalha essa luz por uma faixa larga e traz ultravioleta junto, enquanto o LED concentra tudo em dois picos estreitos e não tem ultravioleta.',
      'At midday the sun delivers about 40 mW/cm² between 600 and 1,000 nm, more than a mask and between half and three quarters of a panel at 15 cm. The sun spreads that light over a wide band and brings ultraviolet with it, while the LED packs everything into two narrow peaks and has no ultraviolet.');
    drawSpec(W);
    drawBars(W);
    drawLamp(W);
    note.textContent = L('A sauna finlandesa e a de infravermelho distante emitem quase tudo acima de 3.000 nm, fora da faixa deste gráfico.',
      'Finnish and far infrared saunas emit almost everything above 3,000 nm, outside the range of this chart.');
    table.innerHTML = '<caption>' + L('Luz por faixa, em mW/cm²', 'Light by band, in mW/cm²') + '</caption><tr><th>' + L('fonte', 'source') + '</th><th>UV</th><th>' + L('400 a 600 nm', '400 to 600 nm') + '</th><th>' + L('600 a 1.000 nm', '600 to 1,000 nm') + '</th><th>' + L('acima de 1.000 nm', 'above 1,000 nm') + '</th><th>' + L('tempo para 10 J/cm²', 'time to 10 J/cm²') + '</th></tr>' +
      '<tr><td>' + L('sol ao meio-dia', 'midday sun') + '</td><td>' + fmt(4.6, 1) + '</td><td>' + L('cerca de 29', 'about 29') + '</td><td>' + fmt(40.3, 1) + '</td><td>' + fmt(26.0, 1) + '</td><td>' + L('cerca de 4 min', 'about 4 min') + '</td></tr>' +
      '<tr><td>' + L('painel a 15 cm', 'panel at 15 cm') + '</td><td>0</td><td>0</td><td>' + L('52 a 90', '52 to 90') + '</td><td>0</td><td>' + L('2 a 3 min', '2 to 3 min') + '</td></tr>' +
      '<tr><td>' + L('máscara', 'mask') + '</td><td>0</td><td>0</td><td>' + L('até 10', 'up to 10') + '</td><td>0</td><td>' + L('cerca de 17 min', 'about 17 min') + '</td></tr>' +
      '<tr><td>' + L('lâmpada de calor', 'heat lamp') + '</td><td colspan="2"></td><td>' + L('15% a 18%', '15% to 18%') + '</td><td>' + L('80% a 84%', '80% to 84%') + '</td><td></td></tr>';
  }

  render();
  if (!shown) DN.onVisible(spec, function (v) {
    if (!v || shown) return;
    shown = true;
    requestAnimationFrame(function () { DN.$all('#l10 .l10-win, #l10 .l10-grow, #l10 .l10-late').forEach(function (e) { e.classList.add('l10-on'); }); });
  }, { threshold: 0.35, once: true });
  var lastW = root.clientWidth, rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { if (root.clientWidth !== lastW) { lastW = root.clientWidth; render(); } }, 150);
  });
  DN.onLang(render);
})();
