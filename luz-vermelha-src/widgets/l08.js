/* l08 · quantos-minutos : the reader's device irradiance turned into minutes for the doses of the studies
   minutes = dose / (irradiance x 0.06), dose in J/cm2, irradiance in mW/cm2.
   The device is stored as DN.store 'device' = {irr, name, key, dist, min, wl} and announced with
   DN.emit('lv-device') so l13 can reuse it. */
(function () {
  'use strict';
  var root = DN.body('l08'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, S = DN.svg, E = DN.el, C = DN.COL;

  /* ---------- data (script section 07, dossier 5.2 and 6.5) ---------- */
  /* measured: the number is already a measurement, so the "box exaggerates" switch does not apply */
  var REFS = [
    { k: 'mask10', irr: 10, wl: 'both', dist: '', measured: false,
      pt: 'máscara de ensaio controlado', en: 'mask from a controlled trial', v: '10' },
    { k: 'mask2', irr: 2, wl: 'na', dist: '', measured: true, approx: true,
      pt: 'máscara medida por um crítico', en: 'mask measured by a reviewer', v: '2' },
    { k: 'panel30', irr: 39, lo: 23, hi: 55, wl: 'na', dist: '30', measured: true, approx: true,
      pt: 'painel a 30 cm', en: 'panel at 30 cm', v: { pt: '23 a 55', en: '23 to 55' } },
    { k: 'panel15', irr: 70, lo: 52, hi: 90, wl: 'na', dist: '15', measured: true, approx: true,
      pt: 'painel a 15 cm', en: 'panel at 15 cm', v: { pt: '52 a 90', en: '52 to 90' } },
    { k: 'sun', irr: 40, wl: 'both', dist: '', measured: true, approx: true,
      pt: 'sol do meio-dia, 600 a 1.000 nm', en: 'midday sun, 600 to 1,000 nm', v: '40' }
  ];
  var WL = [
    { k: 'red', pt: '630 a 670 nm', en: '630 to 670 nm' },
    { k: 'nir', pt: '810 a 850 nm', en: '810 to 850 nm' },
    { k: 'both', pt: 'os dois', en: 'both' },
    { k: 'blue', pt: 'azul (415 nm)', en: 'blue (415 nm)' },
    { k: 'na', pt: 'não informado', en: 'not stated' }
  ];
  var DOSES = [
    { d: 4, lab: '4 J/cm²',
      pt: 'a dose por ponto do laser de mucosite do INCA; a WALT e outros grupos recomendam de 4 a 10 J/cm² no tecido-alvo',
      en: 'the dose per spot of the INCA mucositis laser; WALT and other groups recommend 4 to 10 J/cm² at the target tissue' },
    { d: 40.5, lab: { pt: '40,5 J/cm²', en: '40.5 J/cm²' },
      pt: 'a mediana dos 27 estudos de pele com LED (Grimes, 2025)',
      en: 'the median of 27 skin studies with LEDs (Grimes, 2025)' },
    { d: 50, lab: '50 J/cm²', over: true,
      pt: 'a partir daqui, os estudos em células e animais mostram efeito menor ou piora',
      en: 'beyond this point, studies in cells and animals show a smaller effect or harm' }
  ];
  var EXAG = [0.43, 0.67]; /* measured panels came in 33% to 57% below the box [S] */
  var TMIN = 10, TMAX = 36000; /* axis, seconds */

  /* ---------- state ---------- */
  var saved = DN.store.get('device', null);
  var st = { irr: '10', dist: '', min: '10', wl: 'both', key: 'mask10', exag: false };
  if (saved && saved.irr > 0) {
    st.irr = String(saved.irr); st.key = saved.key || 'custom';
    st.dist = saved.dist != null ? String(saved.dist) : '';
    st.min = saved.min != null ? String(saved.min) : '';
    st.wl = saved.wl || 'na';
  }
  function ref(k) { for (var i = 0; i < REFS.length; i++) if (REFS[i].k === k) return REFS[i]; return null; }
  function num(s) {
    if (s == null) return NaN;
    s = String(s).trim().replace(/\s/g, '');
    if (!s) return NaN;
    /* "1.000,5" (PT) or "1,000.5" (EN) or "10,5" or "10.5" */
    if (s.indexOf(',') >= 0 && s.indexOf('.') >= 0) {
      if (s.lastIndexOf(',') > s.lastIndexOf('.')) s = s.replace(/\./g, '').replace(',', '.');
      else s = s.replace(/,/g, '');
    } else s = s.replace(',', '.');
    if (!/^\d*\.?\d+$/.test(s)) return NaN;
    return parseFloat(s);
  }
  function trim1(n) { var r = Math.round(n * 10) / 10; return fmt(r % 1 ? r.toFixed(1) : r); }
  function fdose(n) { return n < 10 ? trim1(n) : fmt(Math.round(n)); }
  /* 57 s ; 6 min 40 s ; 33 min ; 67 min ; 5 h 37 min */
  function ftime(sec) {
    if (sec < 59.5) return Math.max(1, Math.round(sec)) + ' s';
    var m = sec / 60;
    if (m < 10) { var mm = Math.floor(m), ss = Math.round((m - mm) * 60); if (ss === 60) { mm++; ss = 0; } return mm + ' min' + (ss ? ' ' + ss + ' s' : ''); }
    if (m < 90) return Math.floor(m) + ' min';
    var h = Math.floor(m / 60), r = Math.floor(m - h * 60);
    return h + ' h' + (r ? ' ' + r + ' min' : '');
  }
  function frange(a, b) { var x = ftime(a), y = ftime(b); return x === y ? x : x + L(' a ', ' to ') + y; }

  /* the irradiance band in use: [lo, hi] and a representative value */
  function band() {
    var v = num(st.irr);
    if (!(v > 0) || v > 5000) return null;
    var r = ref(st.key);
    if (r && r.irr === v && r.measured) {
      if (r.lo) return { rep: v, lo: r.lo, hi: r.hi, range: false, refRange: true };
      return { rep: v, lo: v, hi: v, range: false };
    }
    if (st.exag) return { rep: v * 0.55, lo: v * EXAG[0], hi: v * EXAG[1], range: true };
    return { rep: v, lo: v, hi: v, range: false };
  }
  function measuredRef() { var r = ref(st.key); return !!(r && r.measured && num(st.irr) === r.irr); }

  /* ---------- DOM ---------- */
  var top = E('div', { class: 'l08-top' }, root);
  var lab = E('div', { class: 'l08-label', role: 'group', 'aria-labelledby': 'l08-lh' }, top);
  var lh = E('div', { class: 'l08-lh', id: 'l08-lh' }, lab);
  var lhT = E('span', { class: 'l08-lht' }, lh);
  var lhN = E('span', { class: 'l08-lhn' }, lh);
  var F = {};
  function field(k, type) {
    var row = E('div', { class: 'l08-row l08-row-' + k }, lab);
    var l = E('label', { for: 'l08-' + k, class: 'l08-fl' }, row);
    var inp;
    if (type === 'select') {
      inp = E('select', { id: 'l08-' + k, class: 'l08-in', 'aria-describedby': 'l08-desc' }, row);
    } else {
      inp = E('input', { id: 'l08-' + k, class: 'l08-in', type: 'text', inputmode: 'decimal', autocomplete: 'off', spellcheck: 'false', 'aria-describedby': 'l08-desc' }, row);
    }
    F[k] = { row: row, l: l, i: inp };
    return inp;
  }
  field('irr'); field('dist'); field('min'); field('wl', 'select');
  var art = E('div', { class: 'l08-art', 'aria-hidden': 'true' }, top);
  var artSv = S('svg', { viewBox: '0 0 220 170', width: 220, height: 170 }, art);

  var refBox = E('div', { class: 'l08-refs' }, root);
  var refT = E('p', { class: 'l08-sub' }, refBox);
  var refRow = E('div', { class: 'l08-refrow' }, refBox);
  var RB = REFS.map(function (r) {
    var b = E('button', { type: 'button', class: 'l08-ref', 'aria-pressed': 'false' }, refRow);
    b.addEventListener('click', function () { pick(r); });
    return b;
  });

  var modeBox = E('div', { class: 'l08-mode' }, root);
  var modeT = E('p', { class: 'l08-sub', id: 'l08-modet' }, modeBox);
  var modeRow = E('div', { class: 'l08-seg', role: 'group', 'aria-labelledby': 'l08-modet' }, modeBox);
  var MB = [false, true].map(function (v) {
    var b = E('button', { type: 'button', class: 'l08-segb', 'aria-pressed': 'false' }, modeRow);
    b.addEventListener('click', function () { if (b.disabled) return; st.exag = v; update(true); });
    return b;
  });
  var modeNote = E('p', { class: 'l08-modenote' }, modeBox);

  var axCap = E('p', { class: 'l08-sub l08-axcap' }, root);
  var chartW = E('div', { class: 'l08-chart' }, root);
  var sv = S('svg', { role: 'img', 'aria-labelledby': 'l08-ct' }, chartW);
  var svT = S('title', { id: 'l08-ct' }, sv);
  var formula = E('p', { class: 'l08-formula' }, root);
  var notes = E('div', { class: 'l08-notes' }, root);
  var live = E('p', { class: 'live l08-live', 'aria-live': 'polite' }, root);
  var take = E('p', { class: 'l08-take' }, root);
  var desc = E('p', { class: 'sr', id: 'l08-desc' }, root);

  F.irr.i.addEventListener('input', function () { st.irr = F.irr.i.value; st.key = 'custom'; update(true, true); });
  F.dist.i.addEventListener('input', function () { st.dist = F.dist.i.value; save(); setTexts(); });
  F.min.i.addEventListener('input', function () { st.min = F.min.i.value; update(true, true); });
  F.wl.i.addEventListener('change', function () { st.wl = F.wl.i.value; save(); setTexts(); });

  function pick(r) {
    st.key = r.k; st.irr = String(r.irr); st.dist = r.dist; st.wl = r.wl;
    if (!st.min) st.min = '10';
    F.irr.i.value = fmt(r.irr); F.dist.i.value = r.dist; F.wl.i.value = r.wl; F.min.i.value = st.min ? st.min : '';
    update(true, true);
  }
  var touched = false;
  function save() {
    var v = num(st.irr);
    if (!(v > 0)) return;
    touched = true;
    var r = ref(st.key), d = num(st.dist), m = num(st.min);
    var dev = { irr: v, name: r && r.irr === v ? L(r.pt, r.en) : L('seu aparelho', 'your device'), key: r && r.irr === v ? r.k : 'custom',
      dist: d > 0 ? d : null, min: m > 0 ? m : null, wl: st.wl };
    DN.store.set('device', dev);
    DN.emit('lv-device', { src: 'l08', dev: dev });
  }
  DN.on('lv-device', function (e) {
    if (!e || e.src === 'l08' || !e.dev) return;
    var d = e.dev;
    st.irr = String(d.irr); st.key = d.key || 'custom'; st.dist = d.dist ? String(d.dist) : ''; st.min = d.min ? String(d.min) : ''; st.wl = d.wl || 'na';
    syncInputs(); update(false);
  });
  function syncInputs() {
    var v = num(st.irr);
    F.irr.i.value = v > 0 ? fmt(v) : st.irr;
    var d = num(st.dist); F.dist.i.value = d > 0 ? fmt(d) : st.dist;
    var m = num(st.min); F.min.i.value = m > 0 ? fmt(m) : st.min;
    F.wl.i.value = st.wl;
  }

  /* ---------- risograph: the mask seen from inside and a kitchen timer ---------- */
  var INKS = [
    { k: 'a', col: C.rubi, ang: 15, op: 0.95, mx: 0.7, my: -0.6, seed: [311, 587] },
    { k: 'b', col: C.infra, ang: 75, op: 0.92, mx: -1.2, my: 0.9, seed: [833, 71] }
  ];
  function inkDefs(defs, p0) {
    INKS.forEach(function (ink) {
      var p = p0 + ink.k;
      [0.55, 0.85, 1.15].forEach(function (r, j) {
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
  function rng(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function drawArt() {
    var p = 'l08-art-';
    var defs = S('defs', null, artSv);
    inkDefs(defs, p);
    /* face shape, about 15 x 19 cm drawn at 7 px per cm; the timer sits to the right */
    var face = 'M60,14 C90,14 108,36 108,70 C108,104 96,132 86,146 C78,157 70,160 60,160 C50,160 42,157 34,146 C24,132 12,104 12,70 C12,36 30,14 60,14 Z';
    var eyeL = 'M26,68 C31,55 49,55 54,68 C48,78 32,78 26,68 Z';
    var eyeR = 'M66,68 C71,55 89,55 94,68 C88,78 72,78 66,68 Z';
    var cp = S('clipPath', { id: p + 'clip' }, defs);
    S('path', { d: face }, cp);
    var mk = S('mask', { id: p + 'holes' }, defs);
    S('rect', { x: 0, y: 0, width: 220, height: 170, fill: '#fff' }, mk);
    S('path', { d: eyeL, fill: '#000' }, mk); S('path', { d: eyeR, fill: '#000' }, mk);
    INKS.forEach(function (o) {
      var g = S('g', { class: 'l08-ink', transform: 'translate(' + o.mx + ' ' + o.my + ')', opacity: o.op, filter: 'url(#' + p + o.k + 'g)' }, artSv);
      if (o.k === 'b') {
        /* plum: the shell rim, inner shading toward the edge, the straps and the timer dial */
        S('path', { d: face, fill: 'none', stroke: o.col, 'stroke-width': 3.2 }, g);
        var sh = S('g', { 'clip-path': 'url(#' + p + 'clip)', mask: 'url(#' + p + 'holes)' }, g);
        S('path', { d: face, fill: 'none', stroke: 'url(#' + p + 'bh2)', 'stroke-width': 16 }, sh);
        S('path', { d: eyeL, fill: 'none', stroke: o.col, 'stroke-width': 1.8 }, g);
        S('path', { d: eyeR, fill: 'none', stroke: o.col, 'stroke-width': 1.8 }, g);
        S('path', { d: 'M12,60 L0,58 L0,86 L12,84 Z M108,60 L120,58 L120,86 L108,84 Z', fill: 'url(#' + p + 'bh3)' }, g);
        /* timer: body ring, ticks, pointer */
        S('circle', { cx: 170, cy: 108, r: 34, fill: 'none', stroke: o.col, 'stroke-width': 2.6 }, g);
        for (var i = 0; i < 12; i++) {
          var a = i / 12 * Math.PI * 2, r1 = i % 3 ? 24 : 21, r2 = 28;
          S('line', { x1: 170 + Math.sin(a) * r1, y1: 108 - Math.cos(a) * r1, x2: 170 + Math.sin(a) * r2, y2: 108 - Math.cos(a) * r2, stroke: o.col, 'stroke-width': i % 3 ? 1.2 : 2 }, g);
        }
        S('line', { x1: 170, y1: 108, x2: 170 + Math.sin(1.05) * 19, y2: 108 - Math.cos(1.05) * 19, stroke: o.col, 'stroke-width': 2.4, 'stroke-linecap': 'round' }, g);
        S('rect', { x: 164, y: 66, width: 12, height: 8, rx: 2, fill: o.col }, g);
      } else {
        /* ruby: the LED grid with paper between the dots, the lit wedge of the timer */
        var lg = S('g', { 'clip-path': 'url(#' + p + 'clip)', mask: 'url(#' + p + 'holes)' }, g);
        var rr = rng(17);
        for (var y = 24; y < 156; y += 9) {
          for (var x = 18 + ((y / 9) % 2) * 4.5; x < 104; x += 9) {
            S('circle', { cx: x + (rr() - 0.5) * 0.6, cy: y, r: 1.9 + rr() * 0.4, fill: o.col }, lg);
          }
        }
        S('path', { d: 'M170,108 L170,80 A28,28 0 0 1 ' + (170 + Math.sin(1.05) * 28) + ',' + (108 - Math.cos(1.05) * 28) + ' Z', fill: 'url(#' + p + 'ah3)' }, g);
        S('circle', { cx: 170, cy: 108, r: 34, fill: 'url(#' + p + 'ah1)' }, g);
        S('circle', { cx: 170, cy: 108, r: 3.4, fill: o.col }, g);
      }
    });
  }
  drawArt();

  /* ---------- chart geometry ---------- */
  var G = {}, R = {}, cur = null, anim = 0;
  function wrapText(s, size, maxW) {
    var cw = size * 0.62, n = Math.max(8, Math.floor(maxW / cw)), out = [], line = '';
    s.split(' ').forEach(function (w) {
      if (!line) line = w; else if ((line + ' ' + w).length <= n) line += ' ' + w; else { out.push(line); line = w; }
    });
    if (line) out.push(line);
    return out;
  }
  function X(sec) {
    var t = Math.max(TMIN, Math.min(TMAX, sec));
    return G.x0 + (Math.log(t) - Math.log(TMIN)) / (Math.log(TMAX) - Math.log(TMIN)) * (G.x1 - G.x0);
  }
  function layout() {
    var W = chartW.clientWidth || 600;
    G.W = W; G.mob = W < 520;
    G.x0 = 2; G.x1 = W - 2;
    while (sv.firstChild) sv.removeChild(sv.firstChild);
    svT = S('title', { id: 'l08-ct' }, sv);
    var defs = S('defs', null, sv);
    var hp = S('pattern', { id: 'l08-hatch', width: 6, height: 6, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    S('line', { x1: 0, y1: 0, x2: 0, y2: 6, stroke: C.ink, 'stroke-width': 1, opacity: 0.38 }, hp);
    var y = 4, lane = G.mob ? 18 : 16;
    R.rows = DOSES.map(function (d, i) {
      var g = S('g', { class: 'l08-rowg' }, sv);
      var labTxt = typeof d.lab === 'string' ? d.lab : L(d.lab.pt, d.lab.en);
      var t1 = S('text', { x: 0, y: y + 15, class: 'l08-dl' }, g); t1.textContent = labTxt;
      var tt = S('text', { x: W, y: y + 16, 'text-anchor': 'end', class: 'l08-tbig' }, g);
      var lines = wrapText(L(d.pt, d.en), 11.5, G.mob ? W : W - 190);
      var dy = y + 34;
      if (!G.mob) { dy = y + 15; }
      var dx = G.mob ? 0 : (labTxt.length * 13 * 0.62 + 12);
      var lw = G.mob ? W : W - 250 - dx;
      lines = wrapText(L(d.pt, d.en), 11.5, lw);
      lines.forEach(function (ln, j) {
        var tx = S('text', { x: dx, y: dy + j * 15, class: 'l08-dd' }, g); tx.textContent = ln;
      });
      var hdrBottom = Math.max(y + 18, dy + (lines.length - 1) * 15 + 4);
      var ly = hdrBottom + 9;
      S('rect', { x: G.x0, y: ly, width: G.x1 - G.x0, height: lane, class: 'l08-track' }, g);
      var hatch = S('rect', { x: G.x1, y: ly, width: 0, height: lane, fill: 'url(#l08-hatch)' }, g);
      var soft = S('rect', { x: G.x0, y: ly, width: 0, height: lane, class: 'l08-soft' }, g);
      var bar = S('rect', { x: G.x0, y: ly, width: 0, height: lane, class: 'l08-bar' }, g);
      var endT = S('line', { x1: 0, x2: 0, y1: ly - 3, y2: ly + lane + 3, class: 'l08-endt' }, g);
      var over = S('text', { x: G.x1, y: ly + lane / 2, 'text-anchor': 'end', 'dominant-baseline': 'central', class: 'l08-over' }, g);
      y = ly + lane + (i === DOSES.length - 1 ? 14 : 22);
      return { g: g, tt: tt, bar: bar, soft: soft, hatch: hatch, endT: endT, over: over, ly: ly, lane: lane };
    });
    G.top = R.rows[0].ly - 2;
    G.axY = y;
    var ax = S('g', { class: 'l08-axis' }, sv);
    S('line', { x1: G.x0, x2: G.x1, y1: G.axY, y2: G.axY, class: 'l08-axl' }, ax);
    var ticks = [[10, '10 s'], [60, '1 min'], [600, '10 min'], [3600, '1 h'], [36000, '10 h']];
    ticks.forEach(function (tk, i) {
      var x = X(tk[0]);
      S('line', { x1: x, x2: x, y1: G.axY, y2: G.axY + 5, class: 'l08-axl' }, ax);
      var t = S('text', { x: x, y: G.axY + 18, 'text-anchor': i === 0 ? 'start' : i === ticks.length - 1 ? 'end' : 'middle', class: 'l08-tick' }, ax);
      t.textContent = tk[1];
      /* faint gridline inside each lane */
      R.rows.forEach(function (r) { if (i && i < ticks.length - 1) S('line', { x1: x, x2: x, y1: r.ly, y2: r.ly + r.lane, class: 'l08-grid' }, r.g); });
    });
    /* the box minutes: one ink line through every lane, label under the axis */
    R.box = S('g', { class: 'l08-box' }, sv);
    R.boxSegs = R.rows.map(function (r) { return S('line', { x1: 0, x2: 0, y1: r.ly - 6, y2: r.ly + r.lane + 6, class: 'l08-boxl' }, R.box); });
    R.boxAx = S('path', { d: '', class: 'l08-boxm' }, R.box);
    R.boxT1 = S('text', { y: G.axY + 48, class: 'l08-boxt' }, R.box);
    R.boxT2 = S('text', { y: G.axY + 63, class: 'l08-boxt2' }, R.box);
    G.H = G.axY + 72;
    sv.setAttribute('viewBox', '0 0 ' + W + ' ' + G.H);
    sv.setAttribute('width', W); sv.setAttribute('height', G.H);
    draw(target(), true);
  }

  /* ---------- compute targets ---------- */
  function target() {
    var b = band(), m = num(st.min);
    var t = { ok: !!b, b: b, rows: [], box: m > 0 ? m * 60 : null };
    if (b) DOSES.forEach(function (d) { t.rows.push({ fast: d.d / b.hi / 0.06 * 60, slow: d.d / b.lo / 0.06 * 60, rep: d.d / b.rep / 0.06 * 60 }); });
    return t;
  }
  function px(t) {
    var p = { ok: t.ok, rows: [], box: t.box != null ? X(t.box) : null, hatch: t.ok ? X(t.rows[2].fast) : G.x1 };
    if (t.ok) t.rows.forEach(function (r) { p.rows.push({ f: X(r.fast), s: X(r.slow) }); });
    return p;
  }
  function draw(t, instant) {
    var to = px(t);
    var from = cur;
    cur = to;
    if (instant || DN.RM || !from || !from.ok || !to.ok) { paint(to, t); return; }
    cancelAnimationFrame(anim);
    var t0 = performance.now();
    function step(now) {
      var k = Math.min(1, (now - t0) / 450), e = 1 - Math.pow(1 - k, 3);
      var mid = { ok: true, box: to.box == null ? null : (from.box == null ? to.box : from.box + (to.box - from.box) * e), hatch: from.hatch + (to.hatch - from.hatch) * e, rows: to.rows.map(function (r, i) {
        var a = from.rows[i]; return { f: a.f + (r.f - a.f) * e, s: a.s + (r.s - a.s) * e };
      }) };
      paint(mid, t);
      if (k < 1) anim = requestAnimationFrame(step);
    }
    anim = requestAnimationFrame(step);
  }
  function paint(p, t) {
    R.rows.forEach(function (r, i) {
      if (!p.ok) {
        r.bar.setAttribute('width', 0); r.soft.setAttribute('width', 0); r.hatch.setAttribute('width', 0);
        r.endT.style.display = 'none'; r.over.textContent = ''; r.tt.textContent = L('não informado', 'not stated');
        r.tt.classList.add('l08-na');
        return;
      }
      r.tt.classList.remove('l08-na');
      var q = p.rows[i], tr = t.rows[i];
      r.bar.setAttribute('width', Math.max(0, q.f - G.x0));
      r.soft.setAttribute('x', q.f); r.soft.setAttribute('width', Math.max(0, q.s - q.f));
      r.hatch.setAttribute('x', p.hatch); r.hatch.setAttribute('width', Math.max(0, G.x1 - p.hatch));
      r.endT.style.display = q.s - q.f > 1 ? '' : 'none';
      r.endT.setAttribute('x1', q.s); r.endT.setAttribute('x2', q.s);
      var big = t.b.range ? frange(tr.fast, tr.slow) : ftime(tr.rep);
      if (tr.fast < TMIN) big = L('menos de 10 s', 'under 10 s');
      if (tr.slow > TMAX && (t.b.range ? tr.fast > TMAX : true)) big = L('mais de 10 h', 'over 10 h');
      r.tt.textContent = big;
      r.tt.classList.toggle('l08-tr', big.length > 12);
      r.over.textContent = tr.slow > TMAX ? L('passa de 10 h', 'past 10 h') + ' →' : '';
    });
    if (p.box == null || !p.ok) {
      R.box.style.display = p.ok ? 'none' : 'none';
    } else {
      R.box.style.display = '';
      R.boxSegs.forEach(function (l) { l.setAttribute('x1', p.box); l.setAttribute('x2', p.box); });
      R.boxAx.setAttribute('d', 'M' + p.box + ',' + (G.axY + 24) + ' l-5,9 h10 Z');
      var m = num(st.min), b = t.b;
      var d1 = fdose(b.lo * m * 0.06), d2 = fdose(b.hi * m * 0.06);
      var irrS = b.range || b.refRange ? trim1(b.lo) + L(' a ', ' to ') + trim1(b.hi) : trim1(b.rep);
      var doseS = d1 === d2 ? d1 : d1 + L(' a ', ' to ') + d2;
      if (b.refRange) doseS = d1 + L(' a ', ' to ') + d2;
      R.boxT1.textContent = L('a caixa: ', 'the box: ') + trim1(m) + ' min' + L(' a ', ' at ') + irrS + ' mW/cm²';
      R.boxT2.textContent = '= ' + doseS + ' J/cm²' + (b.lo * m * 0.06 > 50 ? L(', acima de 50', ', above 50') : '');
      [R.boxT1, R.boxT2].forEach(function (tx) {
        var w = tx.textContent.length * (tx === R.boxT1 ? 12 : 12) * 0.62;
        var x = p.box, anchor = 'middle';
        if (x - w / 2 < 0) { x = Math.max(0, p.box - 6); anchor = 'start'; }
        if (x + w / 2 > G.W && anchor === 'middle') { x = Math.min(G.W, p.box + 6); anchor = 'end'; }
        tx.setAttribute('x', x); tx.setAttribute('text-anchor', anchor);
      });
    }
  }

  /* ---------- texts ---------- */
  function setTexts() {
    lhT.textContent = L('Ficha do aparelho', 'Device label');
    var r = ref(st.key), v = num(st.irr);
    lhN.textContent = r && r.irr === v ? L(r.pt, r.en) + (r.approx ? L(', medida aproximada', ', approximate measurement') : '') : L('seu aparelho', 'your device');
    F.irr.l.innerHTML = L('irradiância', 'irradiance') + ' <span class="l08-u">mW/cm²</span>';
    F.dist.l.innerHTML = L('medida a', 'measured at') + ' <span class="l08-u">cm</span>';
    F.min.l.innerHTML = L('minutos por sessão', 'minutes per session');
    F.wl.l.textContent = L('comprimento de onda', 'wavelength');
    ['irr', 'dist', 'min'].forEach(function (k) { F[k].i.placeholder = L('não informado', 'not stated'); });
    var wv = F.wl.i.value || st.wl;
    F.wl.i.innerHTML = '';
    WL.forEach(function (w) { var o = E('option', { value: w.k }, F.wl.i); o.textContent = L(w.pt, w.en); });
    F.wl.i.value = wv;
    ['irr', 'dist', 'min'].forEach(function (k) { F[k].row.classList.toggle('l08-empty', !(num(F[k].i.value) > 0)); });
    F.wl.row.classList.toggle('l08-empty', st.wl === 'na');

    refT.textContent = L('Ou escolha uma referência, em mW/cm²:', 'Or pick a reference, in mW/cm²:');
    REFS.forEach(function (r, i) {
      var vv = typeof r.v === 'string' ? r.v : L(r.v.pt, r.v.en);
      RB[i].innerHTML = '<span class="l08-rn">' + L(r.pt, r.en) + '</span><span class="l08-rv">' + (r.approx ? L('cerca de ', 'about ') : '') + vv + '</span>';
      RB[i].setAttribute('aria-pressed', st.key === r.k && num(st.irr) === r.irr ? 'true' : 'false');
    });
    modeT.textContent = L('O número da caixa:', 'The number on the box:');
    MB[0].textContent = L('a caixa diz a verdade', 'the box tells the truth');
    MB[1].textContent = L('a caixa exagera como nos painéis medidos', 'the box exaggerates like the measured panels');
    var meas = measuredRef();
    MB.forEach(function (b, i) { b.disabled = meas; b.setAttribute('aria-pressed', (meas ? i === 0 : st.exag === (i === 1)) ? 'true' : 'false'); });
    modeNote.textContent = meas
      ? L('Esta referência já é uma medida, por isso o seletor vale só para o número de uma caixa.', 'This reference is already a measurement, so the switch only applies to a number printed on a box.')
      : st.exag ? L('Em cinco painéis medidos a 15 cm, a luz ficou de 33% a 57% abaixo da caixa, por isso a barra vira uma faixa.', 'In five panels measured at 15 cm, the light came in 33% to 57% below the box, so each bar becomes a range.') : '';

    axCap.textContent = L('Tempo para chegar a cada dose, em escala logarítmica', 'Time to reach each dose, on a log scale');
    formula.innerHTML = L('A conta: <b>minutos = dose / (irradiância × 0,06)</b>, com a dose em J/cm² e a irradiância em mW/cm².',
      'The arithmetic: <b>minutes = dose / (irradiance × 0.06)</b>, with the dose in J/cm² and the irradiance in mW/cm².');
    notes.innerHTML = '<p>' + L('A mesma dose dada devagar e depressa pode ter efeitos diferentes (seção 04).', 'The same dose given slowly or quickly can have different effects (section 04).') + '</p>' +
      '<p>' + L('Esta é a dose na superfície; a 1 cm de profundidade resta cerca de 2% da luz vermelha (seção 02).', 'This is the dose at the surface; at 1 cm deep about 2% of the red light is left (section 02).') + '</p>';
    take.textContent = L('Divida a dose do estudo pela irradiância da caixa e você tem os minutos. Com 10 mW/cm², a máscara precisa de cerca de 7 minutos para a dose do laser de hospital e de mais de uma hora para a dose mediana dos estudos de pele, e um painel forte a 15 cm passa da dose que piorou feridas em menos de 12 minutos.',
      'Divide the study dose by the irradiance on the box and you have the minutes. At 10 mW/cm², the mask needs about 7 minutes for the dose of the hospital laser and more than an hour for the median dose of the skin studies, and a strong panel at 15 cm passes the dose that made wounds worse in under 12 minutes.');
    desc.textContent = L('Calculadora: minutos = dose / (irradiância × 0,06). Exemplos: máscara de 10 mW/cm², 6 min 40 s para 4 J/cm² e 67 min para 40,5 J/cm²; máscara de 2 mW/cm², 33 min e 5 h 37 min; painel de 70 mW/cm² a 15 cm, 57 s e 9 min 39 s.',
      'Calculator: minutes = dose / (irradiance × 0.06). Examples: a 10 mW/cm² mask, 6 min 40 s for 4 J/cm² and 67 min for 40.5 J/cm²; a 2 mW/cm² mask, 33 min and 5 h 37 min; a 70 mW/cm² panel at 15 cm, 57 s and 9 min 39 s.');
    var t = target();
    svT.textContent = L('Três barras de tempo em escala logarítmica de 10 segundos a 10 horas, para 4, 40,5 e 50 J/cm².', 'Three time bars on a log scale from 10 seconds to 10 hours, for 4, 40.5 and 50 J/cm².');
    if (!t.ok) {
      live.innerHTML = num(st.irr) > 5000 ? L('Esse número passa de 5.000 mW/cm², fora de qualquer aparelho de luz vermelha. Confira a unidade da caixa.', 'That number is above 5,000 mW/cm², beyond any red light device. Check the unit on the box.')
        : L('Irradiância não informada: sem esse número, não dá para calcular os minutos nem a dose.', 'Irradiance not stated: without that number there is no way to work out the minutes or the dose.');
    } else {
      var b = t.b, rs = t.rows;
      var irrS = b.range ? trim1(b.lo) + L(' a ', ' to ') + trim1(b.hi) : trim1(b.rep);
      function tx(i) { return b.range ? frange(rs[i].fast, rs[i].slow) : ftime(rs[i].rep); }
      var s = L('Com ', 'At ') + irrS + ' mW/cm², <b>4 J/cm²</b> ' + L('levam ', 'take ') + '<b>' + tx(0) + '</b>, <b>' + L('40,5', '40.5') + ' J/cm²</b> ' + L('levam ', 'take ') + '<b>' + tx(1) + '</b>' + L(' e ', ' and ') + '<b>50 J/cm²</b> ' + L('chegam em ', 'arrive in ') + '<b>' + tx(2) + '</b>.';
      var m = num(st.min);
      if (m > 0) {
        var dl = b.lo * m * 0.06, dh = b.hi * m * 0.06;
        var ds = fdose(dl) === fdose(dh) ? fdose(dh) : fdose(dl) + L(' a ', ' to ') + fdose(dh);
        if (b.refRange) ds = fdose(dl) + L(' a ', ' to ') + fdose(dh);
        s += ' ' + L('Os ', 'The ') + trim1(m) + L(' minutos da caixa entregam ', ' minutes on the box deliver ') + '<b>' + ds + ' J/cm²</b>' +
          (dh > 50 ? L(', acima dos 50 J/cm² em que os estudos de células e animais mostram efeito menor.', ', above the 50 J/cm² at which cell and animal studies show a smaller effect.') :
           dh < 4 ? L(', abaixo da dose por ponto do laser de hospital.', ', below the dose per spot of the hospital laser.') : '.');
      } else s += ' ' + L('Minutos da caixa não informados.', 'Minutes on the box not stated.');
      live.innerHTML = s;
    }
  }
  function update(animate, user) {
    setTexts();
    draw(target(), !animate);
    if (user) save();
  }

  syncInputs();
  if (!(saved && saved.irr > 0)) { F.irr.i.value = '10'; F.min.i.value = '10'; F.wl.i.value = 'both'; }
  function render() { setTexts(); layout(); }
  render();
  DN.onLang(render);
  var rt = 0, lastW = 0;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { var w = chartW.clientWidth; if (w !== lastW) { lastW = w; layout(); } }, 120);
  });
  lastW = chartW.clientWidth;
})();
