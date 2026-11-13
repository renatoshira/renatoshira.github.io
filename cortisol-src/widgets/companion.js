/* companion · a tiny 24 h cortisol curve in the top bar with a dot at the reader's clock.
   Loads first, so it also defines the shared pieces used by c03 and c09:
     DN.cortCurve  the baseline 24 h curve (Debono et al. 2009) and helpers
     DN.cortRiso   risograph rubber stamps (two inks, halftone, grain, misregistration) */
(function () {
  'use strict';

  /* ================= the curve model =================
     Debono et al. 2009, 33 healthy volunteers, plasma total cortisol:
     peak 15.5 ug/dL at 08:32, trough < 2 ug/dL (1.5 to 2.5) at 00:18,
     quiescent phase (below the daily mean) 19:43 to 05:31.
     The rise starts around 02:00 to 03:00 [S]. Between those anchors the shape is a
     smooth monotone interpolation; the two crossings of the mean were solved so the
     curve's own 24 h mean (8.41 ug/dL) is crossed at 19:43 and 05:31. */
  var XS = [0.3, 2.5, 4, 5.517, 7, 8.533, 10, 12, 14, 16.5, 19.717, 21, 22.3, 24.3];
  var YS = [1.8, 2.1, 3.3, 8.41, 12.6, 15.5, 14.6, 12.6, 11.0, 9.7, 8.41, 5.6, 3.0, 1.8];
  var MS = (function () {
    var n = XS.length, d = [], m = [], i;
    for (i = 0; i < n - 1; i++) d[i] = (YS[i + 1] - YS[i]) / (XS[i + 1] - XS[i]);
    /* periodic end slopes: the curve at 24.3 continues the one at 0.3 */
    var dw = [d[n - 2], d[0]];
    function harm(a, b, h0, h1) {
      if (a * b <= 0) return 0;
      var w1 = 2 * h1 + h0, w2 = h1 + 2 * h0;
      return (w1 + w2) / (w1 / a + w2 / b);
    }
    m[0] = harm(dw[0], dw[1], XS[n - 1] - XS[n - 2], XS[1] - XS[0]);
    m[n - 1] = m[0];
    for (i = 1; i < n - 1; i++) m[i] = harm(d[i - 1], d[i], XS[i] - XS[i - 1], XS[i + 1] - XS[i]);
    return m;
  })();
  function wrap(h) { h = h % 24; if (h < 0) h += 24; return h; }
  /* base(h): ug/dL at clock hour h (any real number, wraps around the day) */
  function base(h) {
    h = wrap(h); if (h < XS[0]) h += 24;
    var i = 0; while (i < XS.length - 2 && h > XS[i + 1]) i++;
    var H = XS[i + 1] - XS[i], t = (h - XS[i]) / H, t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * YS[i] + (t3 - 2 * t2 + t) * H * MS[i] + (-2 * t3 + 3 * t2) * YS[i + 1] + (t3 - t2) * H * MS[i + 1];
  }
  function hex(c) { return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]; }
  function mixHex(a, b, t) {
    var A = hex(a), B = hex(b);
    return '#' + A.map(function (v, i) { var x = Math.round(v + (B[i] - v) * t); return (x < 16 ? '0' : '') + x.toString(16); }).join('');
  }
  /* the ink for a level: teal at the trough, vermilion at the peak; flat = grey */
  function inkFor(v, flat) {
    var t = Math.max(0, Math.min(1, (v - 1.8) / (15.5 - 1.8)));
    t = t < 0.5 ? 0.5 * Math.pow(t * 2, 1.6) : 1 - 0.5 * Math.pow((1 - t) * 2, 1.6);
    var c = mixHex(DN.COL.baixa, DN.COL.alta, t);
    return flat ? mixHex(c, DN.COL.plana, flat) : c;
  }
  /* stops for a horizontal gradient over the 06:00 to 06:00 axis */
  function stops(fn, flat) {
    var out = [];
    for (var i = 0; i <= 48; i++) out.push({ o: i / 48, c: inkFor(fn(6 + i / 2), flat) });
    return out;
  }
  function hhmm(h) {
    h = wrap(h); var H = Math.floor(h), M = Math.round((h - H) * 60);
    if (M === 60) { H = (H + 1) % 24; M = 0; }
    return (H < 10 ? '0' : '') + H + ':' + (M < 10 ? '0' : '') + M;
  }
  DN.cortCurve = {
    base: base, wrap: wrap, inkFor: inkFor, stops: stops, hhmm: hhmm, mix: mixHex,
    PEAK: { h: 8.533, v: 15.5, lo: 11.7, hi: 20.6 },
    TROUGH: { h: 0.3, v: 1.8, lo: 1.5, hi: 2.5 },
    QUIET: [19.717, 5.517], MEAN: 8.41,
    HALF_LIFE: 66 / 60 /* hours, Kraan et al. 1997 */
  };

  /* ================= risograph rubber stamps =================
     Technique from dopamina-src/widgets/w00.js: one SVG layer per ink, halftone
     screens at riso angles, a grain filter that eats the ink, 1 to 3 px of
     misregistration, multiply where the inks overlap. Art is drawn in a 64 x 64 box.
     Tokens: $0 solid ink, $1 $2 $3 light, mid and dark halftone. */
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
  var INKS = [
    { k: 'a', ang: 15, op: 0.95 },
    { k: 'b', ang: 75, op: 0.93 }
  ];
  /* defs(prefix, grey): patterns and grain filters, rendered once per widget */
  function defs(p) {
    var s = '';
    var sets = [['a', DN.COL.alta, 15], ['b', DN.COL.baixa, 75], ['g', '#8f8f8f', 45], ['k', '#141414', 45]];
    sets.forEach(function (st, si) {
      [0.62, 0.92, 1.2].forEach(function (r, j) {
        s += '<pattern id="' + p + st[0] + 'h' + (j + 1) + '" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(' + st[2] + ')">' +
          '<circle cx="1.3" cy="1.3" r="' + r + '" fill="' + st[1] + '"/></pattern>';
      });
      s += '<filter id="' + p + st[0] + 'g" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="' + (37 + si * 211) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="' + (91 + si * 157) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3 0 0 0 2.5" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
    });
    return '<svg class="cr-defs" width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden"><defs>' + s + '</defs></svg>';
  }

  /* the rubber frame: a rounded square with a slightly uneven edge */
  function frame(R) {
    var pts = [], n = 28, i;
    for (i = 0; i < n; i++) {
      var a = i / n * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
      /* superellipse, radius ~27 */
      var e = 0.32, rx = 27.5 + (R() - 0.5) * 0.9;
      var x = 32 + rx * Math.sign(c) * Math.pow(Math.abs(c), e), y = 32 + rx * Math.sign(s) * Math.pow(Math.abs(s), e);
      pts.push(f1(x) + ',' + f1(y));
    }
    return 'M' + pts.join('L') + 'Z';
  }

  var ART = {
    /* alarm clock */
    despertador: {
      a: '<circle cx="32" cy="35" r="14" fill="$2"/><path d="M18,20 a7,7 0 0 1 10,-5Z M46,20 a7,7 0 0 0 -10,-5Z" fill="$0"/>' +
        '<path d="M45,14 l5,-4 M48,19 l6,-1" stroke="$0" stroke-width="2.2" stroke-linecap="round"/>',
      b: '<circle cx="32" cy="35" r="14" fill="none" stroke="$0" stroke-width="3.2"/>' +
        '<path d="M32,35 V26 M32,35 l6,4" stroke="$0" stroke-width="2.6" stroke-linecap="round" fill="none"/>' +
        '<path d="M22,47 l-3,5 M42,47 l3,5" stroke="$0" stroke-width="3" stroke-linecap="round"/>'
    },
    /* rising sun */
    sol: {
      a: '<path d="M18,42 A14,14 0 0 1 46,42Z" fill="$0"/>' +
        '<path d="M32,22 V15 M19,28 l-5,-5 M45,28 l5,-5 M13,39 H8 M51,39 h5" stroke="$0" stroke-width="2.8" stroke-linecap="round"/>',
      b: '<path d="M8,43 H56" stroke="$0" stroke-width="2.6" stroke-linecap="round"/>' +
        '<path d="M10,47 H54 V52 H10Z" fill="$2"/>'
    },
    /* afternoon sun: a full disc high in the sky */
    solTarde: {
      a: '<circle cx="32" cy="29" r="10" fill="$0"/>' +
        '<path d="M32,13 V9 M32,49 v-4 M16,29 h-4 M52,29 h-4 M20.7,17.7 l-3,-3 M43.3,17.7 l3,-3 M20.7,40.3 l-3,3 M43.3,40.3 l3,3" stroke="$0" stroke-width="2.6" stroke-linecap="round"/>',
      b: '<path d="M10,53 H54" stroke="$0" stroke-width="2.4" stroke-linecap="round"/>'
    },
    /* coffee cup */
    xicara: {
      a: '<path d="M18,27 H42" stroke="$0" stroke-width="3"/>' +
        '<path d="M25,20 c-3,-4 3,-6 0,-10 M32,20 c-3,-4 3,-6 0,-10" stroke="$0" stroke-width="2.2" stroke-linecap="round" fill="none"/>',
      b: '<path d="M17,27 H43 V36 C43,43 37,47 30,47 C23,47 17,43 17,36Z" fill="$0"/>' +
        '<path d="M43,30 h3 a5,5 0 0 1 0,10 h-4" stroke="$0" stroke-width="3" fill="none"/>' +
        '<ellipse cx="30" cy="51" rx="17" ry="3" fill="$2"/>'
    },
    /* lunch plate with food */
    prato: {
      a: '<ellipse cx="32" cy="34" rx="9" ry="6" fill="$0"/><circle cx="26" cy="31" r="3" fill="$0"/>',
      b: '<ellipse cx="32" cy="35" rx="18" ry="13" fill="$1"/><ellipse cx="32" cy="35" rx="18" ry="13" fill="none" stroke="$0" stroke-width="2.4"/>' +
        '<path d="M8,20 V50 M6,20 V28 a2,2 0 0 0 4,0 V20 M56,20 c-4,4 -4,12 0,14 V50" stroke="$0" stroke-width="2.4" stroke-linecap="round" fill="none"/>'
    },
    /* empty plate */
    pratoVazio: {
      a: '<path d="M8,20 V50 M6,20 V28 a2,2 0 0 0 4,0 V20 M56,20 c-4,4 -4,12 0,14 V50" stroke="$0" stroke-width="2.4" stroke-linecap="round" fill="none"/>',
      b: '<ellipse cx="32" cy="35" rx="18" ry="13" fill="$1"/><ellipse cx="32" cy="35" rx="18" ry="13" fill="none" stroke="$0" stroke-width="2.4"/>' +
        '<ellipse cx="32" cy="35" rx="10" ry="7" fill="none" stroke="$0" stroke-width="1.4"/>'
    },
    /* running shoe */
    tenis: {
      a: '<path d="M10,40 C10,32 14,24 20,22 L28,30 C34,32 42,32 48,35 C53,37 55,40 55,44 H10Z" fill="$0"/>',
      b: '<path d="M9,44 H56 V48 C56,50 54,51 52,51 H12 C10,51 9,50 9,48Z" fill="$0"/>' +
        '<path d="M22,28 l4,-3 M26,32 l4,-3 M30,35 l4,-3" stroke="$0" stroke-width="2" stroke-linecap="round"/>' +
        '<path d="M3,28 h6 M2,35 h5" stroke="$0" stroke-width="2" stroke-linecap="round"/>'
    },
    /* walking shoe, calmer */
    tenisLeve: {
      a: '<path d="M9,44 H56 V48 C56,50 54,51 52,51 H12 C10,51 9,50 9,48Z" fill="$1"/>',
      b: '<path d="M10,40 C10,32 14,24 20,22 L28,30 C34,32 42,32 48,35 C53,37 55,40 55,44 H10Z" fill="$2"/>' +
        '<path d="M10,40 C10,32 14,24 20,22 L28,30 C34,32 42,32 48,35 C53,37 55,40 55,44 H10Z" fill="none" stroke="$0" stroke-width="2.2"/>'
    },
    /* pillow with a lit phone */
    travesseiro: {
      a: '<rect x="34" y="16" width="13" height="22" rx="2.5" fill="$0" transform="rotate(14 40 27)"/>' +
        '<path d="M50,14 l4,-3 M53,21 l5,-1 M47,9 l1,-4" stroke="$0" stroke-width="2" stroke-linecap="round"/>',
      b: '<path d="M8,38 C8,31 12,28 20,28 H44 C52,28 56,31 56,38 C56,46 52,50 44,50 H20 C12,50 8,46 8,38Z" fill="$1"/>' +
        '<path d="M8,38 C8,31 12,28 20,28 H44 C52,28 56,31 56,38 C56,46 52,50 44,50 H20 C12,50 8,46 8,38Z" fill="none" stroke="$0" stroke-width="2.4"/>' +
        '<path d="M16,40 q8,-4 16,0" stroke="$0" stroke-width="1.6" fill="none" stroke-linecap="round"/>'
    },
    /* crescent moon */
    lua: {
      a: '<path d="M46,16 l1.2,3 3,1.2 -3,1.2 -1.2,3 -1.2,-3 -3,-1.2 3,-1.2Z M50,38 l.9,2 2,.9 -2,.9 -.9,2 -.9,-2 -2,-.9 2,-.9Z" fill="$0"/>',
      b: '<path d="M36,12 A20,20 0 1 0 50,46 A16,16 0 1 1 36,12Z" fill="$0"/>'
    },
    /* bread slice */
    pao: {
      a: '<path d="M16,50 V30 C10,28 10,16 20,15 C24,10 40,10 44,15 C54,16 54,28 48,30 V50Z" fill="$1"/>' +
        '<path d="M16,50 V30 C10,28 10,16 20,15 C24,10 40,10 44,15 C54,16 54,28 48,30 V50Z" fill="none" stroke="$0" stroke-width="2.6" stroke-linejoin="round"/>',
      b: '<path d="M10,54 L54,10" stroke="$0" stroke-width="3.2" stroke-linecap="round"/>'
    },
    /* glass of wine */
    copo: {
      a: '<path d="M20,22 H44 C44,32 39,37 32,37 C25,37 20,32 20,22Z" fill="$0"/>',
      b: '<path d="M19,12 H45 C46,30 40,38 32,38 C24,38 18,30 19,12Z" fill="none" stroke="$0" stroke-width="2.4" stroke-linejoin="round"/>' +
        '<path d="M32,38 V50 M23,52 H41" stroke="$0" stroke-width="2.6" stroke-linecap="round"/>'
    },
    /* cigarette */
    cigarro: {
      a: '<path d="M46,36 h7 v7 h-7Z" fill="$0"/><path d="M8,36 h10 v7 h-10Z" fill="$2"/>',
      b: '<path d="M8,36 H46 V43 H8Z" fill="none" stroke="$0" stroke-width="2.2"/>' +
        '<path d="M50,32 c-4,-5 4,-8 0,-13 s4,-8 0,-11" stroke="$0" stroke-width="2" stroke-dasharray="0.1 3.6" stroke-linecap="round" fill="none"/>'
    },
    /* airplane heading east */
    aviao: {
      a: '<path d="M6,46 C14,44 18,44 24,42" stroke="$0" stroke-width="2.2" stroke-dasharray="0.1 4.4" stroke-linecap="round" fill="none"/>' +
        '<circle cx="50" cy="15" r="5" fill="$1"/>',
      b: '<path d="M14,36 L52,26 C56,25 58,28 54,30 L22,42 C18,43 15,40 14,36Z" fill="$0"/>' +
        '<path d="M30,32 L26,16 L32,15 L42,29Z M24,39 L28,50 L33,49 L32,37Z M16,37 L12,28 L16,27 L21,35Z" fill="$0"/>'
    },
    /* an evaluating panel: three heads behind a table */
    banca: {
      a: '<circle cx="18" cy="24" r="6" fill="$0"/><circle cx="32" cy="21" r="6" fill="$0"/><circle cx="46" cy="24" r="6" fill="$0"/>' +
        '<path d="M11,40 C11,32 25,32 25,40 M25,37 C25,29 39,29 39,37 M39,40 C39,32 53,32 53,40" fill="$2"/>',
      b: '<path d="M6,40 H58 V45 H6Z" fill="$0"/><path d="M10,45 V54 M54,45 V54" stroke="$0" stroke-width="2.6"/>' +
        '<path d="M28,20 h8 M42,23 h8 M14,23 h8" stroke="$0" stroke-width="1.6"/>'
    },
    /* a friend: two figures shoulder to shoulder */
    amigo: {
      a: '<circle cx="24" cy="22" r="7.5" fill="$0"/><path d="M11,52 C11,36 37,36 37,52Z" fill="$0"/>',
      b: '<circle cx="40" cy="22" r="7.5" fill="$0"/><path d="M27,52 C27,36 53,36 53,52Z" fill="$0"/>' +
        '<path d="M33,40 c4,2 6,2 8,0" stroke="#fff" class="cr-pp" stroke-width="1.6" fill="none"/>'
    }
  };
  var SEEDS = {};
  /* stamp(key, prefix, opt): markup of one stamp; opt.grey prints with grey ink only */
  function stamp(key, p, opt) {
    opt = opt || {};
    var art = ART[key]; if (!art) return '';
    var seed = SEEDS[key] = SEEDS[key] || (Object.keys(ART).indexOf(key) * 131 + 17);
    var R = rng(seed + (opt.seed || 0));
    var layers = '';
    INKS.forEach(function (ink, li) {
      var set = opt.grey ? (li ? 'g' : 'g') : ink.k;
      var col = opt.grey ? '#8f8f8f' : (li ? DN.COL.baixa : DN.COL.alta);
      var mx = f1((R() < 0.5 ? -1 : 1) * (0.6 + R() * (li ? 1.4 : 0.7)));
      var my = f1((R() < 0.5 ? -1 : 1) * (0.5 + R() * (li ? 1.2 : 0.6)));
      var body = art[ink.k].replace(/\$0/g, col).replace(/\$([123])/g, 'url(#' + p + set + 'h$1)');
      if (li === 1 && !opt.noFrame) body = '<path d="' + frame(R) + '" fill="none" stroke="' + col + '" stroke-width="2.6" stroke-linejoin="round"/>' + body;
      for (var s = 0; s < 3; s++) body += '<circle cx="' + f1(6 + R() * 52) + '" cy="' + f1(6 + R() * 52) + '" r="' + f1(0.35 + R() * 0.5) + '" fill="' + col + '"/>';
      layers += '<g class="cr-ink cr-ink-' + ink.k + '" transform="translate(' + mx + ' ' + my + ')" opacity="' + (opt.grey ? 0.9 : ink.op) + '" filter="url(#' + p + set + 'g)">' + body + '</g>';
    });
    return '<svg class="cr-stamp' + (opt.grey ? ' cr-grey' : '') + '" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' + layers + '</svg>';
  }
  DN.cortRiso = { defs: defs, stamp: stamp, rng: rng, keys: Object.keys(ART) };

  /* ================= the companion in the top bar ================= */
  var bar = document.querySelector('.topbar .right');
  if (!bar) return;
  var W = 96, H = 18, P = 2;
  var host = DN.el('span', { class: 'cmp-mini', 'aria-hidden': 'true' });
  var kick = bar.querySelector('[data-i18n="top.kicker"]');
  if (kick && kick.nextSibling) bar.insertBefore(host, kick.nextSibling); else bar.insertBefore(host, bar.firstChild);

  function x(h) { return P + ((wrap(h - 6)) / 24) * (W - 2 * P); }
  function y(v) { return H - 2 - (v / 16) * (H - 5); }
  var d = '';
  for (var i = 0; i <= 96; i++) { var h = 6 + i / 4; d += (i ? 'L' : 'M') + f1(P + i / 96 * (W - 2 * P)) + ',' + f1(y(base(h))); }
  var g = '';
  stops(base).forEach(function (s) { g += '<stop offset="' + s.o.toFixed(3) + '" stop-color="' + s.c + '"/>'; });
  host.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '">' +
    '<defs><linearGradient id="cmp-g" x1="' + P + '" x2="' + (W - P) + '" y1="0" y2="0" gradientUnits="userSpaceOnUse">' + g + '</linearGradient></defs>' +
    '<rect class="cmp-q" x="' + f1(x(19.717)) + '" y="1" width="' + f1(x(5.517) - x(19.717)) + '" height="' + (H - 2) + '"/>' +
    '<path class="cmp-base" d="M' + P + ',' + (H - 1.5) + 'H' + (W - P) + '"/>' +
    '<path class="cmp-line" d="' + d + '" stroke="url(#cmp-g)"/>' +
    '<line class="cmp-now-l" x1="0" x2="0" y1="1" y2="' + (H - 1.5) + '"/>' +
    '<circle class="cmp-ring" r="5"/><circle class="cmp-dot" r="2.6"/></svg>';
  var dot = host.querySelector('.cmp-dot'), ring = host.querySelector('.cmp-ring'), nl = host.querySelector('.cmp-now-l');

  function phase(h) {
    if (h >= 23 || h < 2.5) return DN.L('perto do vale do dia', 'near the low point of the day');
    if (h < 5.5) return DN.L('subindo, com a pessoa ainda dormindo', 'rising while the person is still asleep');
    if (h < 7.5) return DN.L('subindo depressa', 'rising fast');
    if (h < 10) return DN.L('perto do pico do dia', 'near the peak of the day');
    if (h < 16) return DN.L('descendo devagar desde o pico', 'falling slowly from the peak');
    if (h < 19.717) return DN.L('na metade da descida', 'halfway down');
    return DN.L('caindo para o período baixo da noite', 'falling into the low stretch of the night');
  }
  function update() {
    var now = new Date(), h = now.getHours() + now.getMinutes() / 60;
    var cx = x(h), cy = y(base(h));
    dot.setAttribute('cx', f1(cx)); dot.setAttribute('cy', f1(cy));
    ring.setAttribute('cx', f1(cx)); ring.setAttribute('cy', f1(cy));
    nl.setAttribute('x1', f1(cx)); nl.setAttribute('x2', f1(cx));
    dot.setAttribute('fill', inkFor(base(h)));
    var mm = now.getMinutes(), t = DN.L(
      'agora são ' + now.getHours() + 'h' + (mm < 10 ? '0' : '') + mm + '; neste horário o cortisol costuma estar ' + phase(h),
      'it is ' + hhmm(h) + ' now; at this hour cortisol is usually ' + phase(h));
    host.setAttribute('title', t);
  }
  update();
  setInterval(update, 30000);
  DN.onLang(update);
  /* a surprise elsewhere in the essay makes the dot pulse once */
  DN.on('burst', function () {
    if (DN.RM) return;
    host.classList.remove('cmp-burst'); void host.offsetWidth; host.classList.add('cmp-burst');
  });
})();
