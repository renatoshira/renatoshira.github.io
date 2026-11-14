/* l02 · ate-onde-entra : the reader guesses how much red light crosses a 1 cm cheek
   (measured 2.1%), then sees the cheek and the hand at the same scale with light
   clouds and waffles, a model depth strip and the skull bars on a log scale. */
(function () {
  'use strict';
  var root = DN.body('l02'); if (!root) return;
  var host = document.getElementById('l02');
  var L = DN.L, fmt = DN.fmt, C = DN.COL;
  var MEAS = 2.1;

  /* ---------- helpers ---------- */
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
  function pct(v) {
    /* percent with the precision the source gives */
    if (v >= 10) return fmt(v, v % 1 ? 1 : 0) + '%';
    if (v >= 1) return fmt(v, 1) + '%';
    return fmt(Number(v.toPrecision(2))) + '%';
  }

  /* ---------- risograph: one layer per ink, halftone, grain, misregistration ---------- */
  var INKS = [{ k: 'a', col: C.rubi, ang: 15, op: 0.95 }, { k: 'b', col: C.infra, ang: 75, op: 0.92 }];
  function risoDefs(p, seed) {
    var R = rng(seed), s = '';
    INKS.forEach(function (ink) {
      var q = p + ink.k;
      [0.5, 0.82, 1.12].forEach(function (r, j) {
        s += '<pattern id="' + q + 'h' + (j + 1) + '" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.3" cy="1.3" r="' + r + '" fill="' + ink.col + '"/></pattern>';
      });
      s += '<filter id="' + q + 'g" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.5" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3 0 0 0 2.5" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
    });
    return s;
  }
  /* art = {a: markup, b: markup}; $0 solid ink, $1..$3 halftone light, mid, dark */
  function risoLayers(p, art, seed, box) {
    var R = rng(seed), out = '';
    INKS.forEach(function (ink, li) {
      var q = p + ink.k;
      var mx = f1((R() < 0.5 ? -1 : 1) * (0.6 + R() * (li ? 1.3 : 0.6)));
      var my = f1((R() < 0.5 ? -1 : 1) * (0.5 + R() * (li ? 1.0 : 0.5)));
      var body = (art[ink.k] || '').replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#' + q + 'h$1)');
      if (box) for (var s = 0; s < 4; s++) body += '<circle cx="' + f1(box[0] + R() * box[2]) + '" cy="' + f1(box[1] + R() * box[3]) + '" r="' + f1(0.3 + R() * 0.45) + '" fill="' + ink.col + '"/>';
      out += '<g class="l02-ink l02-ink-' + ink.k + '" transform="translate(' + mx + ' ' + my + ')" opacity="' + ink.op + '" filter="url(#' + q + 'g)">' + body + '</g>';
    });
    return out;
  }

  /* ---------- the opening: a hand held against a phone flashlight ---------- */
  function capsule(x, y0, y1, w) {
    var r = w / 2;
    return 'M' + x + ',' + y1 + ' V' + (y0 + r) + ' a' + r + ',' + r + ' 0 0 1 ' + w + ',0 V' + y1 + 'Z';
  }
  function handSvg() {
    var hand = 'M62,206 C60,188 54,174 48,164 C40,152 28,140 22,126 C18,116 21,106 29,107 C36,108 42,118 48,128 C51,132 53,132 53,126 ' +
      'L52,62 C52,48 56,40 61.5,40 C67,40 71,47 71,58 L72,94 L73,40 C73,30 77,24 83,24 C89,24 93,30 93,40 L94,94 ' +
      'L95,46 C95,37 99,32 104.5,32 C110,32 114,37 114,46 L114,98 L117,68 C118,60 122,56 126,57 C131,58 132,64 131,72 ' +
      'L128,118 C127,140 124,156 116,168 C112,176 110,190 110,206Z';
    var palm = 'M53,104 C70,98 100,98 128,110 L127,130 C125,150 120,162 112,170 L64,170 C58,160 54,146 53,128Z';
    var defs = risoDefs('l02h-', 77) + '<clipPath id="l02h-clip"><path d="' + hand + '"/></clipPath>';
    var art = {
      /* rubi: the flashlight behind the hand, leaking through the thin fingers and their edges */
      a: '<circle cx="86" cy="96" r="76" fill="none" stroke="$1" stroke-width="16" opacity=".6"/>' +
        '<g clip-path="url(#l02h-clip)">' +
        '<rect x="40" y="20" width="100" height="90" fill="$2"/>' +
        '<circle cx="86" cy="104" r="34" fill="$2"/><circle cx="86" cy="100" r="16" fill="$0"/>' +
        '<path d="' + hand + '" fill="none" stroke="$0" stroke-width="7"/></g>',
      /* ameixa: the skin, denser in the palm and wrist where the light does not cross */
      b: '<g clip-path="url(#l02h-clip)"><rect x="0" y="0" width="170" height="210" fill="$1"/>' +
        '<path d="' + palm + '" fill="$2"/><rect x="40" y="168" width="90" height="42" fill="$3"/>' +
        '<path d="M56,118 C72,112 98,112 126,120 M58,136 C74,128 96,130 118,140 M70,150 C78,140 80,126 76,110 ' +
        'M56,70 q6,2 12,0 M76,52 q6,2 13,0 M97,58 q6,2 12,0 M118,78 q5,2 10,0 M56,86 q6,2 12,0 M76,72 q6,2 13,0 M97,78 q6,2 12,0" ' +
        'stroke="$0" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".8"/></g>' +
        '<path d="' + hand + '" fill="none" stroke="$0" stroke-width="1.5" stroke-linejoin="round"/>'
    };
    return '<svg viewBox="0 0 170 210" role="img" aria-label="' + L('Mão contra a lanterna do celular, com os dedos brilhando em vermelho nas bordas.', 'A hand held against a phone flashlight, the fingers glowing red at the edges.') +
      '"><defs>' + defs + '</defs>' + risoLayers('l02h-', art, 91, [0, 0, 170, 210]) + '</svg>';
  }

  /* ---------- tissue sections (mm from the lit surface) ---------- */
  var CHEEK = {
    k: 'c', T: 10, ticks: [0, 2, 4, 6, 8, 10],
    layers: [
      { a: 0, b: 0.15, n: ['epiderme', 'epidermis'], s: 'epi' },
      { a: 0.15, b: 2, n: ['derme', 'dermis'], s: 'der' },
      { a: 2, b: 6, n: ['gordura', 'fat'], s: 'fat' },
      { a: 6, b: 9.3, n: ['músculo', 'muscle'], s: 'mus' },
      { a: 9.3, b: 10, n: ['mucosa da boca', 'mouth lining'], s: 'muc' }
    ],
    r: 2.1, n: 12, litR: 21, litN: 120
  };
  var HAND = {
    k: 'm', T: 25, ticks: [0, 5, 10, 15, 20, 25],
    layers: [
      { a: 0, b: 1.6, n: ['pele da palma', 'palm skin'], s: 'der' },
      { a: 1.6, b: 5, n: ['gordura', 'fat'], s: 'fat' },
      { a: 5, b: 11, n: ['músculo', 'muscle'], s: 'mus' },
      { a: 11, b: 19, n: ['ossos', 'bones'], s: 'bone' },
      { a: 19, b: 23.6, n: ['tendões', 'tendons'], s: 'ten' },
      { a: 23.6, b: 25, n: ['pele do dorso', 'back skin'], s: 'der' }
    ],
    r: 0.005, n: 0.096, litR: 0, litN: 1
  };
  function tissueArt(sec, x, y, w, s) {
    var a = '', b = '';
    sec.layers.forEach(function (ly) {
      var y0 = f1(y + ly.a * s), h = f1((ly.b - ly.a) * s);
      var r = '<rect x="' + x + '" y="' + y0 + '" width="' + w + '" height="' + h + '"';
      if (ly.s === 'epi') b += r + ' fill="$0"/>';
      else if (ly.s === 'der') { a += r + ' fill="$2"/>'; b += r + ' fill="$1" opacity=".55"/>'; }
      else if (ly.s === 'fat') {
        a += r + ' fill="$1" opacity=".7"/>';
        /* fat lobules */
        var R = rng(ly.a * 100 + 3), cy;
        for (cy = ly.a * s + y + 5; cy < ly.b * s + y - 4; cy += 7) for (var cx = x + 5; cx + 4.5 < x + w; cx += 8)
          b += '<circle cx="' + f1(cx + R()) + '" cy="' + f1(cy + R()) + '" r="' + f1(2.4 + R() * 0.8) + '" fill="none" stroke="$0" stroke-width=".7" opacity=".7"/>';
      } else if (ly.s === 'mus') {
        a += r + ' fill="$3"/>'; b += r + ' fill="$1"/>';
        for (var yy = ly.a * s + y + 3; yy < ly.b * s + y; yy += 4) b += '<path d="M' + x + ',' + f1(yy) + ' h' + w + '" stroke="$0" stroke-width=".6" opacity=".6"/>';
      } else if (ly.s === 'muc') { a += r + ' fill="$2"/>'; }
      else if (ly.s === 'ten') { b += r + ' fill="$2"/>'; a += r + ' fill="$1" opacity=".5"/>'; }
      else if (ly.s === 'bone') {
        a += r + ' fill="$2"/>'; b += r + ' fill="$1"/>';
        /* bone in the white of the paper with an ink outline: a metacarpal cut */
        var bh = (ly.b - ly.a) * s * 0.42, by = y + (ly.a + ly.b) / 2 * s;
        var bw = Math.min(w * 0.36, bh * 1.2);
        b += '<ellipse cx="' + f1(x + w / 2) + '" cy="' + f1(by) + '" rx="' + f1(bw) + '" ry="' + f1(bh) + '" fill="#fff" stroke="$0" stroke-width="1.6"/>';
        a += '<ellipse cx="' + f1(x + w / 2) + '" cy="' + f1(by) + '" rx="' + f1(bw * 0.35) + '" ry="' + f1(bh * 0.35) + '" fill="$1"/>';
      }
    });
    return { a: a, b: b };
  }

  /* ---------- skull data ---------- */
  var SKULL = [
    { n: ['camundongo, crânio', 'mouse, skull'], d: ['0,44 mm de osso · 800 nm', '0.44 mm of bone · 800 nm'], v: 40.1, ink: 'n' },
    { n: ['rato, crânio', 'rat, skull'], d: ['0,83 mm · 800 nm', '0.83 mm · 800 nm'], v: 21.2, ink: 'n' },
    { n: ['coelho, crânio', 'rabbit, skull'], d: ['2,11 mm · 800 nm', '2.11 mm · 800 nm'], v: 11.4, ink: 'n' },
    { n: ['pessoa, crânio seco', 'human, dry skull'], d: ['6 a 7 mm de osso · 800 nm', '6 to 7 mm of bone · 800 nm'], v: 4.2, ink: 'n' },
    { n: ['pessoa, têmpora com couro e tecido mole', 'human temple with scalp and soft tissue'], d: ['cadáver · 830 nm', 'cadaver · 830 nm'], v: 0.9, ink: 'n' },
    { n: ['a mesma têmpora no vermelho', 'the same temple in red'], d: ['cadáver · 633 nm', 'cadaver · 633 nm'], v: 0.0015, lt: true, ink: 'r' },
    { n: ['porco, couro e crânio', 'pig, scalp and skull'], d: ['808 nm', '808 nm'], v: 0.11, ink: 'n' }
  ];
  var DEPTH = [[630, 4.6], [660, 6.0], [810, 6.4], [850, 5.3], [940, 2.9]];

  /* ---------- skeleton ---------- */
  root.innerHTML = '';
  var q = DN.el('div', { class: 'l02-q' }, root);
  var handBox = DN.el('div', { class: 'l02-hand' }, q);
  var qr = DN.el('div', { class: 'l02-qr' }, q);
  var qText = DN.el('p', { class: 'l02-qt' }, qr);
  var btnRow = DN.el('div', { class: 'l02-btns', role: 'group' }, qr);
  var GUESS = [50, 25, 10, 2];
  var btns = GUESS.map(function (g) {
    var b = DN.el('button', { class: 'btn l02-g', type: 'button', 'aria-pressed': 'false' }, btnRow);
    b.addEventListener('click', function () { choose(g); });
    return b;
  });
  var skip = DN.el('button', { class: 'l02-skip', type: 'button' }, qr);
  skip.addEventListener('click', function () { choose(null); });
  var live = DN.el('p', { class: 'live l02-live', 'aria-live': 'polite', tabindex: '-1' }, qr);

  var read = DN.el('p', { class: 'l02-read' }, root);
  var panels = DN.el('div', { class: 'l02-panels' }, root);
  var pC = DN.el('div', { class: 'l02-panel' }, panels);
  var pH = DN.el('div', { class: 'l02-panel l02-after' }, panels);
  var depth = DN.el('div', { class: 'l02-depth l02-after' }, root);
  var skull = DN.el('div', { class: 'l02-skull l02-after' }, root);
  var table = DN.el('table', { class: 'sr' }, root);

  var guess = DN.store.get('bochecha', undefined);
  var revealed = guess !== undefined;
  var animT = revealed || DN.RM ? 1 : 0; /* cloud animation progress */

  /* ---------- a section panel: ruler, riso cut, two light clouds, waffles ---------- */
  var PANELS = [];
  function buildPanel(host, sec, pw, s) {
    host.innerHTML = '';
    host.style.width = pw + 'px';
    var mob = pw < 420;
    var head = DN.el('div', { class: 'l02-ph' }, host);
    head.innerHTML = '<b>' + (sec.k === 'c' ? L('Bochecha, cerca de 1 cm', 'Cheek, about 1 cm') : L('Palma da mão, 25 mm', 'Palm of the hand, 25 mm')) + '</b>' +
      '<span>' + (sec.k === 'c' ? L('voluntários vivos', 'living volunteers') : L('voluntários vivos, mesma escala', 'living volunteers, same scale')) + '</span>';
    var rx = 30, sx = 34, sw = mob ? 26 : 38, lw = mob ? 100 : 118;
    var cx0 = sx + sw + 6, cw = Math.floor((pw - cx0 - lw - 10) / 2);
    var y0 = 44, sh = sec.T * s, y1 = y0 + sh;
    var wfTop = y1 + 30;
    var cell = Math.min(4.6, Math.floor(((pw - sx - 12) / 2) / 40 * 10) / 10);
    var wfW = cell * 40, wfH = cell * 25;
    var H = wfTop + 44 + wfH + 6;
    var pfig = DN.el('div', { class: 'l02-pfig' }, host);
    var svg = DN.svg('svg', { viewBox: '0 0 ' + pw + ' ' + H, width: pw, height: H, class: 'l02-psvg', role: 'img' }, pfig);
    svg.setAttribute('aria-label', sec.k === 'c'
      ? L('Corte de uma bochecha de 10 mm com epiderme, derme, gordura e músculo. Da luz vermelha de 633 nm passam 2,1%, 21 de cada 1.000. Do infravermelho de 830 nm passam 12%, 120 de cada 1.000. Com pressão forte, 4,0% e 15%.',
        'Section of a 10 mm cheek with epidermis, dermis, fat and muscle. Of red light at 633 nm, 2.1% gets through, 21 in every 1,000. Of near infrared at 830 nm, 12% gets through, 120 in every 1,000. With firm pressure, 4.0% and 15%.')
      : L('Corte da palma da mão, 25 mm, na mesma escala. Do infravermelho passa cerca de 1 em cada 1.000 (0,096%); do vermelho, 1 em cada 20 mil (0,005%).',
        'Section of the palm, 25 mm, at the same scale. About 1 in every 1,000 of the near infrared gets through (0.096%); of red, 1 in every 20,000 (0.005%).'));
    var pid = 'l02' + sec.k + '-';
    var defs = DN.svg('defs', null, svg);
    defs.innerHTML = risoDefs(pid, sec.k === 'c' ? 11 : 23) +
      '<pattern id="' + pid + 'hat" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="4" fill="' + C.infra + '"/><line x1="0" y1="0" x2="0" y2="4" stroke="#fff" stroke-width="1" stroke-opacity=".45"/></pattern>';
    /* column heads and the light entering */
    var cols = [{ x: cx0, lab: L('vermelho', 'red'), nm: '633 nm', cls: 'r' }, { x: cx0 + cw + 10, lab: L('infravermelho', 'near infrared'), nm: '830 nm', cls: 'n' }];
    cols.forEach(function (c) {
      T(svg, c.x + cw / 2, 12, c.lab, 'l02-colh l02-' + c.cls, 'middle');
      T(svg, c.x + cw / 2, 25, c.nm, 'l02-coln', 'middle');
      DN.svg('rect', { x: c.x, y: y0 - 9, width: cw, height: 5, fill: c.cls === 'r' ? C.rubi : 'url(#' + pid + 'hat)' }, svg);
      DN.svg('path', { d: 'M' + f1(c.x + cw / 2) + ',' + (y0 - 2) + ' l-3,-5 h6Z', fill: c.cls === 'r' ? C.rubi : C.infra }, svg);
    });
    /* ruler */
    DN.svg('line', { x1: rx, y1: y0, x2: rx, y2: y1, class: 'l02-rule' }, svg);
    for (var mm = 0; mm <= sec.T; mm++) {
      var big = sec.ticks.indexOf(mm) >= 0;
      DN.svg('line', { x1: rx - (big ? 6 : 3), y1: y0 + mm * s, x2: rx, y2: y0 + mm * s, class: 'l02-rule' }, svg);
      if (big) T(svg, rx - 9, y0 + mm * s + 3.5, String(mm), 'l02-tick', 'end');
    }
    T(svg, rx - 9, y0 - 8, 'mm', 'l02-tick', 'end');
    /* the riso cut, also as faint layer bands behind the clouds */
    var art = tissueArt(sec, sx, y0, sw, s);
    var g = DN.svg('g', null, svg);
    g.innerHTML = risoLayers(pid, art, sec.k === 'c' ? 5 : 9, [sx, y0, sw, sh]);
    DN.svg('rect', { x: sx, y: y0, width: sw, height: sh, class: 'l02-cutb' }, svg);
    sec.layers.forEach(function (ly, i) {
      if (i) DN.svg('line', { x1: cx0, y1: y0 + ly.a * s, x2: cx0 + 2 * cw + 10, y2: y0 + ly.a * s, class: 'l02-lay' }, svg);
    });
    DN.svg('rect', { x: cx0, y: y0, width: cw, height: sh, class: 'l02-colb' }, svg);
    DN.svg('rect', { x: cx0 + cw + 10, y: y0, width: cw, height: sh, class: 'l02-colb' }, svg);
    /* layer labels with a simple vertical dodge */
    var lx = cx0 + 2 * cw + 18, prev = -1e9;
    sec.layers.forEach(function (ly) {
      var my = y0 + (ly.a + ly.b) / 2 * s + 3.5;
      var yy = Math.max(my, prev + 11);
      prev = yy;
      var nm = L(ly.n[0], ly.n[1]);
      T(svg, lx, yy, nm, 'l02-layt', 'start');
      DN.svg('line', { x1: lx - 6, y1: yy - 3.5, x2: lx - 2, y2: yy - 3.5, class: 'l02-rule' }, svg);
    });
    /* exit line */
    T(svg, cx0, y1 + 14, L('sai do outro lado ↓', 'comes out the other side ↓'), 'l02-exit', 'start');
    /* results: number and waffle per wavelength */
    var gRes = DN.svg('g', { class: 'l02-res' }, svg);
    [{ v: sec.r, lit: sec.litR, cls: 'r', col: C.rubi }, { v: sec.n, lit: sec.litN, cls: 'n', col: 'url(#' + pid + 'hat)' }].forEach(function (o, i) {
      var wx = sx + i * (wfW + 12);
      if (i === 1) wx = Math.max(wx, pw - wfW - 2);
      var big = sec.k === 'c' ? pct(o.v) : (o.cls === 'n' ? L('1 em 1.000', '1 in 1,000') : L('1 em 20 mil', '1 in 20,000'));
      T(gRes, wx, wfTop + 12, big, 'l02-big l02-hid l02-' + o.cls, 'start');
      T(gRes, wx, wfTop + 12, '?', 'l02-big l02-qm', 'start');
      var sub = sec.k === 'c' ? L(o.lit + ' de cada 1.000', o.lit + ' in every 1,000') : pct(o.v);
      T(gRes, wx, wfTop + 28, sub, 'l02-sub l02-hid', 'start');
      var dOff = '', dOn = '';
      for (var k = 0; k < 1000; k++) {
        var cxk = wx + (k % 40) * cell, cyk = wfTop + 38 + Math.floor(k / 40) * cell;
        var sq = 'M' + f1(cxk) + ',' + f1(cyk) + 'h' + f1(cell - 0.8) + 'v' + f1(cell - 0.8) + 'h-' + f1(cell - 0.8) + 'Z';
        if (k < o.lit) dOn += sq; else dOff += sq;
      }
      DN.svg('path', { d: dOff, class: 'l02-woff' }, gRes);
      if (dOn) DN.svg('path', { d: dOn, fill: o.col, class: 'l02-won l02-hid' }, gRes);
    });
    /* canvas for the clouds, over the two columns */
    var cv = DN.el('canvas', { class: 'l02-cv', 'aria-hidden': 'true' }, pfig);
    cv.style.left = cx0 + 'px'; cv.style.top = y0 + 'px'; cv.style.width = (2 * cw + 10) + 'px';
    var P = { sec: sec, cv: cv, cw: cw, w: 2 * cw + 10, sh: sh, s: s, dots: [] };
    /* clouds: dot density falls as e^(-x/d), d fitted to the measured exit fraction */
    var R = rng(sec.k === 'c' ? 101 : 202), n0 = mob ? 70 : 110;
    [{ f: sec.r / 100, col: C.rubi, x: 0 }, { f: sec.n / 100, col: C.infra, x: cw + 10 }].forEach(function (o) {
      var d = sec.T / Math.log(1 / o.f);
      var N = Math.round(n0 * (cw / 100) * d * (1 - Math.exp(-sec.T / d)));
      for (var i = 0; i < N; i++) {
        var u = R(), depthMM = -d * Math.log(1 - u * (1 - Math.exp(-sec.T / d)));
        P.dots.push({ x: o.x + 1.5 + R() * (cw - 3), y: depthMM * s, col: o.col, r: o.col === C.rubi ? 1.25 : 1.15 });
      }
    });
    PANELS.push(P);
    if (sec.k === 'c') {
      var nt = DN.el('p', { class: 'l02-pnote' }, host);
      nt.textContent = L('Com pressão forte na bochecha, passaram 4,0% do vermelho e 15% do infravermelho.', 'With firm pressure on the cheek, 4.0% of the red and 15% of the near infrared got through.');
    } else {
      var nt2 = DN.el('p', { class: 'l02-pnote' }, host);
      nt2.textContent = L('Para achar um quadrado aceso do vermelho, seria preciso olhar 20 grades destas.', 'To find one lit square of red, you would have to look through 20 of these grids.');
    }
  }
  function drawClouds() {
    PANELS.forEach(function (P) {
      var dpr = Math.min(window.devicePixelRatio || 1, 2), cv = P.cv;
      if (cv.width !== Math.round(P.w * dpr)) { cv.width = Math.round(P.w * dpr); cv.height = Math.round(P.sh * dpr); cv.style.height = P.sh + 'px'; }
      var ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, P.w, P.sh);
      if (!revealed) return;
      var t = animT;
      P.dots.forEach(function (d) {
        var frac = d.y / P.sh;
        var tt = Math.max(0, Math.min(1, (t - frac * 0.25) / 0.75));
        if (tt <= 0) return;
        var e = 1 - Math.pow(1 - tt, 3);
        ctx.fillStyle = d.col;
        ctx.beginPath(); ctx.arc(d.x, d.y * e, d.r, 0, 6.2832); ctx.fill();
      });
    });
  }

  /* ---------- depth strip ---------- */
  function buildDepth(W) {
    depth.innerHTML = '';
    var hd = DN.el('div', { class: 'l02-ph' }, depth);
    hd.innerHTML = '<b>' + L('Profundidade em que a luz cai a 37%, num modelo de derme', 'Depth at which light falls to 37%, in a model of the dermis') + '</b><span class="l02-tag">' +
      L('simulação; serve para a forma', 'simulation; it shows the shape') + '</span>';
    var lw = 64, rw = 60, bw = W - lw - rw, rh = 20, H = DEPTH.length * rh + 26;
    var svg = DN.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H, role: 'img' }, depth);
    svg.setAttribute('aria-label', DEPTH.map(function (d) { return d[0] + ' nm: ' + fmt(d[1], 1) + ' mm'; }).join('; '));
    var defs = DN.svg('defs', null, svg);
    defs.innerHTML = '<pattern id="l02d-hat" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="4" fill="' + C.infra + '"/><line x1="0" y1="0" x2="0" y2="4" stroke="#fff" stroke-width="1" stroke-opacity=".45"/></pattern>';
    function X(mm) { return lw + mm / 7 * bw; }
    for (var mm = 0; mm <= 7; mm++) {
      DN.svg('line', { x1: X(mm), y1: 0, x2: X(mm), y2: H - 18, class: 'l02-grid' }, svg);
      T(svg, X(mm), H - 5, mm + (mm === 7 ? ' mm' : ''), 'l02-tick', 'middle');
    }
    DEPTH.forEach(function (d, i) {
      var y = i * rh + 3, red = d[0] < 700;
      T(svg, lw - 8, y + 11, d[0] + ' nm', 'l02-dl', 'end');
      var r = DN.svg('rect', { x: X(0), y: y + 2, width: X(d[1]) - X(0), height: rh - 8, fill: red ? C.rubi : 'url(#l02d-hat)', class: 'l02-bar' }, svg);
      T(svg, X(d[1]) + 6, y + 11, fmt(d[1], 1) + ' mm', 'l02-dv', 'start');
    });
  }

  /* ---------- skull: riso cuts at the same scale and the log bars ---------- */
  function buildSkull(W) {
    skull.innerHTML = '';
    var mob = W < 640;
    var hd = DN.el('div', { class: 'l02-ph' }, skull);
    hd.innerHTML = '<b>' + L('Quanto da luz atravessa o crânio', 'How much of the light crosses the skull') + '</b><span>' + L('escala de 10 em 10', 'steps of 10') + '</span>';
    var wrap = DN.el('div', { class: 'l02-skw' }, skull);
    /* the cuts: mouse bone 0.44 mm against human scalp, 6.5 mm bone and meninges */
    var cut = DN.el('div', { class: 'l02-cut' }, wrap);
    var s = 7.2, cwid = 150, ch = 16 * s + 34;
    var art = { a: '', b: '' };
    var hx = cwid * 0.5 + 6, mx = 8, colW = cwid * 0.5 - 14;
    var y0 = 24;
    /* mouse: bone only, 0.44 mm */
    art.b += '<rect x="' + mx + '" y="' + y0 + '" width="' + colW + '" height="' + f1(0.44 * s) + '" fill="#fff" stroke="$0" stroke-width="1.3"/>';
    art.a += '<rect x="' + mx + '" y="' + f1(y0 + 0.44 * s + 1.5) + '" width="' + colW + '" height="' + f1(3 * s) + '" fill="$1" opacity=".55"/>';
    /* human: scalp ~5 mm, bone 6.5 mm (diploe inside), meninges ~1 mm, then brain */
    var sc0 = y0, b0 = y0 + 5 * s, b1 = b0 + 6.5 * s, m1 = b1 + 1.2 * s;
    art.a += '<rect x="' + hx + '" y="' + sc0 + '" width="' + colW + '" height="' + f1(5 * s) + '" fill="$2"/>';
    art.b += '<rect x="' + hx + '" y="' + sc0 + '" width="' + colW + '" height="' + f1(0.5 * s) + '" fill="$0"/>';
    art.b += '<rect x="' + hx + '" y="' + f1(sc0 + 0.5 * s) + '" width="' + colW + '" height="' + f1(4.5 * s) + '" fill="$1" opacity=".6"/>';
    art.b += '<rect x="' + hx + '" y="' + f1(b0) + '" width="' + colW + '" height="' + f1(6.5 * s) + '" fill="#fff" stroke="$0" stroke-width="1.4"/>';
    var R = rng(5);
    for (var i = 0; i < 26; i++) art.b += '<circle cx="' + f1(hx + 4 + R() * (colW - 8)) + '" cy="' + f1(b0 + 1.8 * s + R() * 2.9 * s) + '" r="' + f1(1 + R() * 1.6) + '" fill="none" stroke="$0" stroke-width=".8"/>';
    art.b += '<rect x="' + hx + '" y="' + f1(b1) + '" width="' + colW + '" height="' + f1(1.2 * s) + '" fill="$2"/>';
    art.a += '<rect x="' + hx + '" y="' + f1(m1) + '" width="' + colW + '" height="' + f1(3 * s) + '" fill="$1" opacity=".55"/>';
    var csvg = '<svg viewBox="0 0 ' + (cwid + 96) + ' ' + ch + '" width="' + (cwid + 96) + '" height="' + ch + '" role="img" aria-label="' +
      L('Corte do crânio na mesma escala: o osso do camundongo tem 0,44 mm; o de uma pessoa tem 6 a 7 mm, sob o couro cabeludo e sobre as meninges.', 'Skull sections at the same scale: the mouse bone is 0.44 mm; a human one is 6 to 7 mm, under the scalp and over the meninges.') +
      '"><defs>' + risoDefs('l02s-', 31) + '</defs>' + risoLayers('l02s-', art, 13, null) +
      '<text x="' + f1(mx + colW / 2) + '" y="14" text-anchor="middle" class="l02-cuth">' + L('camundongo', 'mouse') + '</text>' +
      '<text x="' + f1(hx + colW / 2) + '" y="14" text-anchor="middle" class="l02-cuth">' + L('pessoa', 'human') + '</text>' +
      '<text x="' + f1(mx) + '" y="' + f1(y0 + 0.44 * s + 3 * s + 14) + '" class="l02-cutl">' + L('osso de', 'bone') + '</text>' +
      '<text x="' + f1(mx) + '" y="' + f1(y0 + 0.44 * s + 3 * s + 26) + '" class="l02-cutl">0,44 mm</text>'.replace('0,44', fmt(0.44, 2)) +
      '<text x="' + f1(hx + colW + 6) + '" y="' + f1(sc0 + 2.5 * s + 3.5) + '" class="l02-cutl">' + L('couro', 'scalp') + '</text>' +
      '<text x="' + f1(hx + colW + 6) + '" y="' + f1(b0 + 3.25 * s - 2) + '" class="l02-cutl">' + L('osso,', 'bone,') + '</text>' +
      '<text x="' + f1(hx + colW + 6) + '" y="' + f1(b0 + 3.25 * s + 10) + '" class="l02-cutl">' + L('6 a 7 mm', '6 to 7 mm') + '</text>' +
      '<text x="' + f1(hx + colW + 6) + '" y="' + f1(b1 + 0.6 * s + 3.5) + '" class="l02-cutl">' + L('meninges', 'meninges') + '</text>' +
      '<text x="' + f1(hx + colW + 6) + '" y="' + f1(m1 + 1.6 * s + 3.5) + '" class="l02-cutl">' + L('cérebro', 'brain') + '</text>' +
      '</svg>';
    cut.innerHTML = csvg;
    /* bars */
    var bars = DN.el('div', { class: 'l02-bars' }, wrap);
    var BW = mob ? W : W - (cwid + 96) - 28;
    var lw = mob ? 0 : Math.min(250, BW * 0.36);
    var rh = mob ? 50 : 32, H = SKULL.length * rh + 30;
    var x0 = mob ? 22 : lw + 4, x1 = BW - 64;
    function X(v) { return x0 + (Math.log(v) / Math.LN10 + 3) / 5 * (x1 - x0); }
    var svg = DN.svg('svg', { viewBox: '0 0 ' + BW + ' ' + H, width: BW, height: H, role: 'img' }, bars);
    svg.setAttribute('aria-label', SKULL.map(function (r) { return L(r.n[0], r.n[1]) + ' (' + L(r.d[0], r.d[1]) + '): ' + (r.lt ? L('menos de ', 'less than ') : '') + pct(r.v); }).join('; '));
    var defs = DN.svg('defs', null, svg);
    defs.innerHTML = '<pattern id="l02k-hat" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="4" fill="' + C.infra + '"/><line x1="0" y1="0" x2="0" y2="4" stroke="#fff" stroke-width="1" stroke-opacity=".45"/></pattern>';
    [0.001, 0.01, 0.1, 1, 10, 100].forEach(function (v) {
      DN.svg('line', { x1: X(v), y1: 0, x2: X(v), y2: H - 20, class: 'l02-grid' }, svg);
      T(svg, X(v), H - 6, fmt(v) + '%', 'l02-tick', 'middle');
    });
    var gB = DN.svg('g', { class: 'l02-bgrow' }, svg);
    SKULL.forEach(function (r, i) {
      var y = i * rh + 2;
      var by = mob ? y + 26 : y + 6, bh = mob ? 14 : 16;
      if (mob) {
        T(svg, x0, y + 9, L(r.n[0], r.n[1]), 'l02-sn', 'start');
        T(svg, x0, y + 20, L(r.d[0], r.d[1]), 'l02-sd', 'start');
      } else {
        T(svg, lw - 6, y + 13, L(r.n[0], r.n[1]), 'l02-sn', 'end');
        T(svg, lw - 6, y + 25, L(r.d[0], r.d[1]), 'l02-sd', 'end');
      }
      var w = X(r.v) - X(0.001);
      var bar = DN.svg('rect', { x: X(0.001), y: by, width: Math.max(1, w), height: bh, fill: r.ink === 'r' ? C.rubi : 'url(#l02k-hat)', class: 'l02-bar' + (r.lt ? ' l02-lt' : '') }, gB);
      bar.style.transitionDelay = (DN.RM ? 0 : i * 0.08) + 's';
      var lab = (r.lt ? L('menos de ', 'under ') : '') + pct(r.v);
      T(svg, X(r.v) + 6, by + bh - 3.5, lab, 'l02-sv l02-' + r.ink, 'start');
    });
    if (mob) skull.appendChild(DN.el('p', { class: 'l02-pnote' }, null, L('Barras em escala de 10 em 10: cada risco vertical multiplica por 10.', 'Bars on a scale of tens: each vertical line multiplies by 10.')));
  }

  /* ---------- text and state ---------- */
  function labels() {
    qText.innerHTML = L('De cada 100 partes de luz vermelha (633 nm) que entram numa bochecha, quantas saem do outro lado?', 'Of every 100 parts of red light (633 nm) that enter a cheek, how many come out the other side?');
    btns.forEach(function (b, i) { b.textContent = L('cerca de ', 'about ') + GUESS[i]; });
    skip.textContent = L('ver sem palpitar', 'show without guessing');
    read.textContent = L('Da luz vermelha que entra numa bochecha, cerca de 2% chegam ao outro lado, e do infravermelho próximo chegam cerca de 12%. O crânio de uma pessoa deixa passar uma fração muito menor que o de um camundongo, e por isso o que funciona no cérebro do animal pode não receber luz suficiente no de uma pessoa.',
      'Of the red light that enters a cheek, about 2% reaches the other side, and of the near infrared about 12%. A human skull lets through a much smaller fraction than a mouse skull, so what works in the animal’s brain may not get enough light in a person’s.');
    table.innerHTML = '<caption>' + L('Quanto da luz passa', 'How much of the light gets through') + '</caption>' +
      '<tr><th>' + L('tecido', 'tissue') + '</th><th>830 nm</th><th>633 nm</th></tr>' +
      '<tr><td>' + L('bochecha, 10 mm', 'cheek, 10 mm') + '</td><td>12%</td><td>' + pct(2.1) + '</td></tr>' +
      '<tr><td>' + L('bochecha, pressão forte', 'cheek, firm pressure') + '</td><td>15%</td><td>' + pct(4.0) + '</td></tr>' +
      '<tr><td>' + L('palma, 25 mm', 'palm, 25 mm') + '</td><td>' + pct(0.096) + '</td><td>' + pct(0.005) + '</td></tr>' +
      SKULL.map(function (r) { return '<tr><td>' + L(r.n[0], r.n[1]) + ', ' + L(r.d[0], r.d[1]) + '</td><td colspan="2">' + (r.lt ? L('menos de ', 'under ') : '') + pct(r.v) + '</td></tr>'; }).join('') +
      DEPTH.map(function (d) { return '<tr><td>' + L('modelo de derme, ', 'dermis model, ') + d[0] + ' nm</td><td colspan="2">' + L('cai a 37% em ', 'falls to 37% at ') + fmt(d[1], 1) + ' mm</td></tr>'; }).join('');
    liveText();
  }
  function liveText() {
    if (!revealed) { live.textContent = ''; return; }
    if (guess == null) { live.innerHTML = L('O medido: <b>' + fmt(MEAS, 1) + '</b> de cada 100.', 'The measurement: <b>' + fmt(MEAS, 1) + '</b> in every 100.'); return; }
    var ratio = guess / MEAS, extra;
    if (ratio < 2) extra = L(' Você acertou a ordem de grandeza.', ' You got the order of magnitude right.');
    else extra = L(' O medido é cerca de ' + Math.round(ratio) + ' vezes menor que o seu palpite.', ' The measurement is about ' + Math.round(ratio) + ' times smaller than your guess.');
    live.innerHTML = L('Seu palpite: <b>' + guess + '</b>. O medido: <b>' + fmt(MEAS, 1) + '</b>.', 'Your guess: <b>' + guess + '</b>. The measurement: <b>' + fmt(MEAS, 1) + '</b>.') + extra;
  }
  function state() {
    host.classList.toggle('l02-rev', revealed);
    btns.forEach(function (b, i) {
      b.disabled = revealed;
      b.setAttribute('aria-pressed', revealed && guess === GUESS[i] ? 'true' : 'false');
    });
    skip.hidden = revealed;
  }

  var lastW = 0;
  function layout() {
    var W = Math.max(280, root.clientWidth || 600);
    lastW = W;
    handBox.innerHTML = handSvg();
    var mob = W < 640;
    host.classList.toggle('l02-mob', mob);
    var pw = mob ? W : Math.floor((W - 32) / 2);
    var s = mob ? 11 : 12;
    PANELS = [];
    buildPanel(pC, CHEEK, pw, s);
    buildPanel(pH, HAND, pw, s);
    buildDepth(W);
    buildSkull(W);
    drawClouds();
  }

  var raf = 0;
  function animate() {
    var t0 = performance.now();
    cancelAnimationFrame(raf);
    function step(now) {
      animT = Math.min(1, (now - t0) / 900);
      drawClouds();
      if (animT < 1) raf = requestAnimationFrame(step);
      else host.classList.add('l02-done');
    }
    raf = requestAnimationFrame(step);
  }

  function choose(g) {
    if (revealed) return;
    guess = g; revealed = true;
    DN.store.set('bochecha', g);
    if (g != null && g / MEAS > 10) DN.surprise('l02');
    state(); liveText();
    if (document.activeElement && document.activeElement.disabled || document.activeElement === skip) live.focus({ preventScroll: true });
    if (DN.RM) { animT = 1; host.classList.add('l02-done'); drawClouds(); }
    else { animT = 0; requestAnimationFrame(animate); }
  }

  labels(); state(); layout();
  if (revealed) host.classList.add('l02-done');
  DN.onLang(function () { labels(); layout(); });
  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { if (root.clientWidth !== lastW) layout(); }, 150);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (root.clientWidth) layout(); });
})();
