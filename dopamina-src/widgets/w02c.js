/* w02c · as-quatro-linhas
   Schematic sagittal brain with the four dopamine pathways drawn as metro lines
   (45/90 degree segments), plus a "regador" view of volume transmission
   around one terminal (radius of about 7 µm, Cragg and Rice). */
(function () {
  'use strict';
  var root = DN.body('w02c'); if (!root) return;
  var C = DN.COL, L = DN.L, S = DN.svg;

  /* ---------------- data ---------------- */
  var LINES = [
    {
      id: 'nigro', col: '#141414', icon: 'move',
      pts: [[414, 300], [414, 232], [392, 210], [300, 210]],
      from: 'sn', to: 'str',
      name: function () { return L('Nigroestriatal', 'Nigrostriatal'); },
      route: function () { return L('Da substância negra ao estriado dorsal.', 'From the substantia nigra to the dorsal striatum.'); },
      func: function () { return L('Movimento e hábitos.', 'Movement and habits.'); },
      fail: function () { return L('Doença de Parkinson. Os neurônios desta linha morrem e os movimentos ficam lentos.', 'Parkinson’s disease. The neurons of this line die and movement slows down.'); },
      drug: function () { return L('A levodopa repõe a dopamina que falta. Os antipsicóticos também bloqueiam esta linha e podem causar rigidez e tremor.', 'Levodopa replaces the missing dopamine. Antipsychotics also block this line and can cause stiffness and tremor.'); },
      drugShort: function () { return 'levodopa'; }
    },
    {
      id: 'meso', col: '#c8372d', icon: 'target',
      pts: [[384, 300], [356, 272], [252, 272]],
      from: 'vta', to: 'nac',
      name: function () { return L('Mesolímbica', 'Mesolimbic'); },
      route: function () { return L('Da área tegmental ventral ao núcleo accumbens.', 'From the ventral tegmental area to the nucleus accumbens.'); },
      func: function () { return L('Motivação e aprendizado por recompensa.', 'Motivation and reward learning.'); },
      fail: function () { return L('Excesso de dopamina nesta linha está ligado aos delírios e às alucinações da psicose. As drogas de abuso agem aqui.', 'Excess dopamine in this line is linked to the delusions and hallucinations of psychosis. Drugs of abuse act here.'); },
      drug: function () { return L('Os antipsicóticos bloqueiam os receptores D2 desta linha.', 'Antipsychotics block the D2 receptors of this line.'); },
      drugShort: function () { return L('antipsicótico', 'antipsychotic'); }
    },
    {
      id: 'cort', col: '#1f7f86', icon: 'grid',
      pts: [[384, 300], [384, 228], [234, 228], [162, 156]],
      from: 'vta', to: 'pfc',
      name: function () { return L('Mesocortical', 'Mesocortical'); },
      route: function () { return L('Da área tegmental ventral ao córtex pré-frontal.', 'From the ventral tegmental area to the prefrontal cortex.'); },
      func: function () { return L('Memória de trabalho e atenção.', 'Working memory and attention.'); },
      fail: function () { return L('Pouca dopamina aqui prejudica a atenção e a memória de trabalho, como no TDAH.', 'Too little dopamine here impairs attention and working memory, as in ADHD.'); },
      drug: function () { return L('O metilfenidato bloqueia a recaptação e aumenta a dopamina e a noradrenalina no córtex pré-frontal.', 'Methylphenidate blocks reuptake and raises dopamine and noradrenaline in the prefrontal cortex.'); },
      drugShort: function () { return L('metilfenidato', 'methylphenidate'); }
    },
    {
      id: 'tubero', col: '#7a4fa3', icon: 'drop',
      pts: [[334, 292], [334, 306], [322, 318], [322, 334]],
      from: 'hyp', to: 'pit',
      name: function () { return L('Tuberoinfundibular', 'Tuberoinfundibular'); },
      route: function () { return L('Do hipotálamo à hipófise.', 'From the hypothalamus to the pituitary.'); },
      func: function () { return L('Freio da prolactina.', 'A brake on prolactin.'); },
      fail: function () { return L('Sem o freio, a prolactina sobe. Isso pode produzir leite fora da amamentação e alterar o ciclo menstrual.', 'Without the brake, prolactin rises. That can cause milk production outside breastfeeding and disrupt the menstrual cycle.'); },
      drug: function () { return L('A metoclopramida, um remédio contra náusea, e vários antipsicóticos bloqueiam o freio e elevam a prolactina.', 'Metoclopramide, an anti-nausea drug, and several antipsychotics block the brake and raise prolactin.'); },
      drugShort: function () { return L('metoclopramida', 'metoclopramide'); }
    }
  ];
  var NODES = {
    sn: { p: [414, 300], lab: function () { return L('substância negra', 'substantia nigra'); }, at: [452, 324], an: 'start', lead: [[414, 300], [432, 318], [448, 318]] },
    vta: { p: [384, 300], lab: function () { return L('área tegmental ventral', 'ventral tegmental area'); }, at: [452, 346], an: 'start', lead: [[384, 300], [384, 330], [400, 340], [448, 340]] },
    str: { p: [300, 210], lab: function () { return L('estriado dorsal', 'dorsal striatum'); }, at: [300, 196], an: 'middle', end: 'nigro' },
    nac: { p: [252, 272], lab: function () { return L('núcleo accumbens', 'nucleus accumbens'); }, at: [244, 256], an: 'middle', end: 'meso' },
    pfc: { p: [162, 156], lab: function () { return L('córtex pré-frontal', 'prefrontal cortex'); }, at: [162, 138], an: 'middle', end: 'cort' },
    hyp: { p: [334, 292], lab: function () { return L('hipotálamo', 'hypothalamus'); }, at: [324, 298], an: 'end' },
    pit: { p: [322, 334], lab: function () { return L('hipófise', 'pituitary'); }, at: [308, 346], an: 'end', end: 'tubero' }
  };

  var sel = null, mode = 'map', narrow = false;
  var G = {}, visible = false, raf = 0;

  /* ---------------- DOM ---------------- */
  root.innerHTML = '';
  var stage = DN.el('div', { class: 'w02c-stage' }, root);
  var svg = S('svg', { role: 'img', class: 'w02c-svg' }, stage);
  var list = DN.el('div', { class: 'w02c-list', role: 'list' }, root);
  var take = DN.el('p', { class: 'w02c-take' }, root);
  var regBox = DN.el('div', { class: 'w02c-regbox' }, root);
  var regHead = DN.el('div', { class: 'glabel' }, regBox);
  var svgR = S('svg', { role: 'img', class: 'w02c-svg w02c-rsvg' }, regBox);
  var regTake = DN.el('p', { class: 'w02c-rtake' }, regBox);
  var chips = {};
  LINES.forEach(function (ln) {
    var b = DN.el('div', { class: 'w02c-chip', role: 'listitem' }, list);
    b.style.setProperty('--lc', ln.col);
    var mini = S('svg', { class: 'w02c-mini', viewBox: '0 0 64 40', 'aria-hidden': 'true' }, b);
    drawMini(mini, ln);
    var tx = DN.el('div', { class: 'w02c-chiptx' }, b);
    b.addEventListener('mouseenter', function () { select(ln.id); });
    b.addEventListener('mouseleave', function () { select(null); });
    chips[ln.id] = { b: b, tx: tx };
  });

  function drawMini(mini, ln) {
    /* fit the line's points into 64x40 */
    var xs = ln.pts.map(function (p) { return p[0]; }), ys = ln.pts.map(function (p) { return p[1]; });
    var x0 = Math.min.apply(0, xs), x1 = Math.max.apply(0, xs), y0 = Math.min.apply(0, ys), y1 = Math.max.apply(0, ys);
    var sc = Math.min(52 / Math.max(1, x1 - x0), 28 / Math.max(1, y1 - y0));
    var ox = 32 - (x0 + x1) / 2 * sc, oy = 20 - (y0 + y1) / 2 * sc;
    var pts = ln.pts.map(function (p) { return [p[0] * sc + ox, p[1] * sc + oy]; });
    S('path', { d: 'M' + pts.join(' L'), fill: 'none', stroke: ln.col, 'stroke-width': 3.2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, mini);
    [pts[0], pts[pts.length - 1]].forEach(function (p) { S('circle', { cx: p[0], cy: p[1], r: 3.4, fill: C.paper, stroke: C.ink, 'stroke-width': 1.4 }, mini); });
  }

  /* rounded metro path through 45/90 points */
  function metroPath(pts, r) {
    var d = 'M' + pts[0][0] + ' ' + pts[0][1];
    for (var i = 1; i < pts.length - 1; i++) {
      var p0 = pts[i - 1], p1 = pts[i], p2 = pts[i + 1];
      var a = norm(p0, p1), b = norm(p1, p2);
      var la = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]), lb = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
      var rr = Math.min(r, la / 2, lb / 2);
      d += ' L' + (p1[0] - a[0] * rr).toFixed(1) + ' ' + (p1[1] - a[1] * rr).toFixed(1);
      d += ' Q' + p1[0] + ' ' + p1[1] + ' ' + (p1[0] + b[0] * rr).toFixed(1) + ' ' + (p1[1] + b[1] * rr).toFixed(1);
    }
    var e = pts[pts.length - 1];
    return d + ' L' + e[0] + ' ' + e[1];
  }
  function norm(a, b) { var dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; }

  /* ---------------- icons (what fails) ---------------- */
  function icon(kind, x, y, col, parent, s) {
    var g = S('g', { transform: 'translate(' + x + ' ' + y + ') scale(' + (s || 1) + ')' }, parent);
    var st = { fill: 'none', stroke: col, 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
    function P(d) { var o = { d: d }; for (var k in st) o[k] = st[k]; return S('path', o, g); }
    if (kind === 'move') { P('M-7 4 L-3 -2 L1 4 L5 -2 L8 2'); P('M-8 7 L8 7'); }          /* tremor over a baseline */
    if (kind === 'target') { S('circle', { r: 6.5, fill: 'none', stroke: col, 'stroke-width': 1.5 }, g); S('circle', { r: 2.2, fill: col }, g); }
    if (kind === 'grid') { for (var i = 0; i < 3; i++) for (var j = 0; j < 2; j++) S('rect', { x: -7 + i * 5.2, y: -5 + j * 5.6, width: 3.6, height: 3.6, fill: i + j * 3 < 4 ? col : 'none', stroke: col, 'stroke-width': 1 }, g); }
    if (kind === 'drop') { P('M0 -7 C4 -2 6 1 6 3.5 C6 7 3.4 8.5 0 8.5 C-3.4 8.5 -6 7 -6 3.5 C-6 1 -4 -2 0 -7 Z'); }
    return g;
  }

  /* ---------------- risograph kit (technique from w00) ----------------
     The brain and the close-up are illustrations, printed in two spot inks:
     amber (a) and indigo (b), halftone screens, a grain filter and a slight
     misregistration. The metro lines, stations and labels stay crisp on top,
     because they are the chart. Tokens: $0 solid, $1 $2 $3 halftones, $p paper. */
  var INKS = { a: { col: C.dopa, ang: 15, op: .95 }, b: { col: C.pausa, ang: 75, op: .9 } };
  function risoDefs(parent) {
    var h = '', seeds = { a: [113, 547], b: [281, 769] };
    ['a', 'b'].forEach(function (k) {
      [0.62, 0.92, 1.2].forEach(function (r, j) {
        h += '<pattern id="w02c-' + k + 'h' + (j + 1) + '" width="2.8" height="2.8" patternUnits="userSpaceOnUse" patternTransform="rotate(' + INKS[k].ang + ')">' +
          '<circle cx="1.4" cy="1.4" r="' + r + '" fill="' + INKS[k].col + '"/></pattern>';
      });
      h += '<filter id="w02c-' + k + 'g" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="' + seeds[k][0] + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="' + seeds[k][1] + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.6" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
    });
    S('defs', null, parent).innerHTML = h;
  }
  function tok(m, k) { return m.replace(/\$0/g, INKS[k].col).replace(/\$p/g, C.paper).replace(/\$([123])/g, 'url(#w02c-' + k + 'h$1)'); }
  function riso(parent, a, b, mis) {
    var g = S('g', { class: 'w02c-riso' }, parent);
    mis = mis || [[0.7, -0.5], [-1.1, 0.9]];
    ['a', 'b'].forEach(function (k, i) {
      var m = k === 'a' ? a : b; if (!m) return;
      var l = S('g', { class: 'w02c-ink', filter: 'url(#w02c-' + k + 'g)', opacity: INKS[k].op, transform: 'translate(' + mis[i][0] + ' ' + mis[i][1] + ')' }, g);
      l.innerHTML = tok(m, k);
    });
    return g;
  }

  /* ---------------- icons (what fails) ---------------- */
  function icon(kind, x, y, col, parent, s) {
    var g = S('g', { transform: 'translate(' + x + ' ' + y + ') scale(' + (s || 1) + ')' }, parent);
    var st = { fill: 'none', stroke: col, 'stroke-width': 1.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
    function P(d) { var o = { d: d }; for (var k in st) o[k] = st[k]; return S('path', o, g); }
    if (kind === 'move') { P('M-7 4 L-3 -2 L1 4 L5 -2 L8 2'); P('M-8 7 L8 7'); }          /* tremor over a baseline */
    if (kind === 'target') { S('circle', { r: 6.5, fill: 'none', stroke: col, 'stroke-width': 1.5 }, g); S('circle', { r: 2.2, fill: col }, g); }
    if (kind === 'grid') { for (var i = 0; i < 3; i++) for (var j = 0; j < 2; j++) S('rect', { x: -7 + i * 5.2, y: -5 + j * 5.6, width: 3.6, height: 3.6, fill: i + j * 3 < 4 ? col : 'none', stroke: col, 'stroke-width': 1 }, g); }
    if (kind === 'drop') { P('M0 -7 C4 -2 6 1 6 3.5 C6 7 3.4 8.5 0 8.5 C-3.4 8.5 -6 7 -6 3.5 C-6 1 -4 -2 0 -7 Z'); }
    return g;
  }

  /* ---------------- brain (risograph) ---------------- */
  var CEREBRUM = 'M120 294 C84 266 70 206 96 156 C126 98 196 62 282 54 C366 46 454 62 514 102 C568 138 600 194 592 248 C588 276 572 294 550 302 C522 308 490 302 464 296 C446 292 434 292 424 296 L372 296 C356 304 344 308 330 306 C300 302 250 306 206 304 C164 302 138 302 120 294 Z';
  var CEREBELLUM = 'M436 322 C446 300 488 294 524 302 C560 312 574 338 560 362 C544 388 498 396 466 384 C446 376 436 356 436 336 Z';
  var STEM = 'M372 296 C362 316 350 334 354 354 C358 374 374 386 390 394 L398 432 L426 432 C426 402 428 380 430 358 C432 342 434 322 432 298 Z';
  var CALLOSUM = 'M216 198 C228 150 300 126 378 130 C442 134 486 158 492 196 C484 204 472 196 464 186 C444 162 404 152 362 152 C306 152 260 168 242 200 C236 210 220 210 216 198 Z';
  function brain(parent) {
    var g = S('g', { class: 'w02c-brain' }, parent);
    var kn = ' fill="none" stroke="$p" stroke-linecap="round" stroke-linejoin="round"';
    riso(g,
      /* amber: cerebellum, thalamus, pituitary */
      '<path d="' + CEREBELLUM + '" fill="$1"/>' +
      '<path d="M450 330 C470 320 504 318 540 330 M446 346 C470 338 506 338 548 350 M452 362 C474 356 504 358 536 370 M466 378 C484 374 504 376 520 382" stroke="$0" stroke-width="1.8" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="372" cy="248" rx="34" ry="22" fill="$2"/>' +
      '<path d="M330 304 C328 314 326 320 324 326" stroke="$0" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="322" cy="335" rx="14" ry="10" fill="$0"/>',
      /* indigo: cerebrum, callosum, brainstem, sulci as paper knockouts */
      '<path d="' + STEM + '" fill="$2"/>' +
      '<path d="' + CEREBRUM + '" fill="$1" stroke="$0" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<path d="' + CALLOSUM + '" fill="$3" stroke="$p" stroke-width="2"/>' +
      '<path d="M188 214 C192 132 286 92 392 98 C462 102 516 130 540 176 M532 132 C540 160 546 190 552 222 M596 238 C566 236 534 240 508 250 M140 160 C160 140 180 128 200 122 M118 222 C132 214 146 210 164 210 M300 72 C304 84 306 92 304 100 M420 74 C416 86 414 94 416 102"' + kn + ' stroke-width="2.6"/>' +
      '<path d="M462 192 C440 210 410 214 388 226" stroke="$0" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
      '<path d="M362 330 C374 334 388 334 400 330 M356 354 C372 360 392 360 412 356"' + kn + ' stroke-width="2"/>');
    /* front / back hints */
    G.fr = S('text', { x: 70, y: 420, 'font-size': 10.5, fill: C.dim, 'letter-spacing': '.1em' }, g);
    G.bk = S('text', { x: 600, y: 420, 'font-size': 10.5, fill: C.dim, 'letter-spacing': '.1em', 'text-anchor': 'end' }, g);
    return g;
  }

  /* ---------------- build ---------------- */
  function build() {
    narrow = root.clientWidth < 560;
    cancelAnimationFrame(raf); raf = 0;
    svg.innerHTML = '';
    risoDefs(svg);
    buildMap();
    svgR.innerHTML = '';
    buildReg();
    relabel();
    kick();
  }

  function buildMap() {
    svg.setAttribute('viewBox', narrow ? '70 46 534 392' : '40 40 600 400');
    brain(svg);
    G.ln = {};
    var casing = S('g', null, svg), lines = S('g', null, svg), hits = S('g', null, svg), stations = S('g', null, svg), labels = S('g', null, svg);
    G.train = S('g', null, svg);
    var W = narrow ? 8.5 : 6.5;
    LINES.forEach(function (ln) {
      var d = metroPath(ln.pts, 12);
      var cs = S('path', { d: d, fill: 'none', stroke: C.paper, 'stroke-width': W + 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, casing);
      var p = S('path', { d: d, fill: 'none', stroke: ln.col, 'stroke-width': W, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: 'w02c-line' }, lines);
      var h = S('path', { d: d, fill: 'none', stroke: 'transparent', 'stroke-width': 24, 'stroke-linecap': 'round', class: 'w02c-hit' }, hits);
      h.addEventListener('mouseenter', function () { select(ln.id); });
      h.addEventListener('mouseleave', function () { select(null); });
      G.ln[ln.id] = { p: p, cs: cs, len: 0 };
    });
    /* interchange at VTA: pill, terminals: circles */
    var R = narrow ? 7.5 : 6;
    ['sn', 'vta', 'hyp', 'str', 'nac', 'pfc', 'pit'].forEach(function (k) {
      var n = NODES[k];
      S('circle', { cx: n.p[0], cy: n.p[1], r: R, fill: C.paper, stroke: C.ink, 'stroke-width': 2.2 }, stations);
    });
    G.lab = {};
    G.icons = {};
    G.leads = [];
    if (!narrow) {
      Object.keys(NODES).forEach(function (k) {
        var n = NODES[k];
        if (n.lead) G.leads.push(S('path', { d: 'M' + n.lead.join(' L'), fill: 'none', stroke: C.dim, 'stroke-width': .9, 'stroke-dasharray': '2 2' }, labels));
        var t = S('text', { x: n.at[0], y: n.at[1], 'font-size': 12, fill: C.ink, 'text-anchor': n.an, class: 'w02c-lab' }, labels);
        G.lab[k] = t;
      });
      /* failure icons next to terminal labels */
      LINES.forEach(function (ln) {
        var n = NODES[ln.to];
        G.icons[ln.id] = { n: n, col: ln.col, kind: ln.icon };
      });
      G.iconLayer = S('g', null, labels);
    } else {
      /* on narrow screens: numbered terminals only; names live in the list */
    }
  }

  function placeIcons() {
    if (!G.iconLayer) return;
    G.iconLayer.innerHTML = '';
    Object.keys(G.icons).forEach(function (id) {
      var ic = G.icons[id], n = ic.n, t = G.lab[Object.keys(NODES).filter(function (k) { return NODES[k] === n; })[0]];
      var w = 0; try { w = t.getComputedTextLength(); } catch (e) { w = 100; }
      var x = n.an === 'middle' ? n.at[0] + w / 2 + 14 : n.an === 'end' ? n.at[0] - w - 14 : n.at[0] + w + 14;
      icon(ic.kind, x, n.at[1] - 4, ic.col, G.iconLayer, 1);
    });
  }

  /* ---------------- selection ---------------- */
  function hover(id) { paintSel(id); }
  function paintSel(id) {
    if (!G.ln) return;
    LINES.forEach(function (ln) {
      var o = G.ln[ln.id]; if (!o) return;
      var dim = id && id !== ln.id;
      o.p.style.opacity = dim ? .16 : 1;
      o.p.style.strokeWidth = id === ln.id ? (narrow ? 11 : 9) : '';
      o.cs.style.strokeWidth = id === ln.id ? (narrow ? 15 : 13) : '';
      var c = chips[ln.id];
      c.b.classList.toggle('dim', !!(sel && sel !== ln.id));
    });
    if (G.lab) Object.keys(G.lab).forEach(function (k) {
      var n = NODES[k], ln = id && LINES.filter(function (l) { return l.id === id; })[0];
      var on = !id || (ln && (ln.from === k || ln.to === k));
      G.lab[k].style.opacity = on ? 1 : .3;
      G.lab[k].setAttribute('font-weight', id && on ? 700 : 400);
    });
    if (G.iconLayer) Array.prototype.forEach.call(G.iconLayer.children, function (c, i) { c.style.opacity = (!id || Object.keys(G.icons)[i] === id) ? 1 : .2; });
  }
  function select(id) {
    sel = id;
    paintSel(id);
    trainT0 = performance.now();
    kick();
  }

  /* ---------------- train ---------------- */
  var trainT0 = 0;
  function paintTrain(now) {
    if (!G.train) return;
    G.train.innerHTML = '';
    if (!sel) return;
    var o = G.ln[sel]; if (!o) return;
    var len = o.p.getTotalLength();
    var N = 6, gap = narrow ? 14 : 11;
    var cycle = 2.6, run = 1.5;
    var t = DN.RM ? run * 0.6 : ((now - trainT0) / 1000) % cycle;
    if (t > run + 0.25) return;
    var head = Math.min(1, t / run);
    head = 1 - Math.pow(1 - head, 2) * (1 - head * 0.0);
    for (var i = 0; i < N; i++) {
      var s = head * (len + N * gap) - i * gap;
      if (s < 0 || s > len) continue;
      var p = o.p.getPointAtLength(s);
      S('circle', { cx: p.x, cy: p.y, r: narrow ? 3.6 : 2.9, fill: C.dopa, stroke: C.paper, 'stroke-width': 1 }, G.train);
    }
  }

  /* ---------------- regador (volume transmission) ---------------- */
  var parts = [], receptors = [], puffT = 0, lastT = 0;
  var RC = 140;                   /* 7 µm in svg units: 20 units per µm */
  function buildReg() {
    var W = narrow ? 420 : 640, H = narrow ? 420 : 400;
    svgR.setAttribute('viewBox', (-W / 2) + ' ' + (-H / 2) + ' ' + W + ' ' + H);
    var g = S('g', null, svgR);
    /* neighbouring dendrites with spines; receptors are the spine heads */
    receptors = [];
    var dends = narrow
      ? ['M-210 -150 C-100 -120 20 -170 210 -110', 'M-210 60 C-90 40 10 110 210 90', 'M-170 210 C-120 120 -60 60 -40 -210', 'M120 210 C130 100 170 0 210 -40']
      : ['M-320 -140 C-160 -110 40 -170 320 -100', 'M-320 70 C-150 40 20 120 320 90', 'M-210 200 C-150 110 -80 40 -60 -200', 'M150 200 C160 100 210 0 320 -40', 'M-320 -40 C-260 -30 -230 0 -200 40'];
    var inkB = '', inkA = '', rec = [];
    dends.forEach(function (d, k) {
      var p = S('path', { d: d, fill: 'none', stroke: 'none' }, g);
      inkB += '<path d="' + d + '" stroke="$2" stroke-width="9" fill="none" stroke-linecap="round"/>';
      var len = p.getTotalLength();
      for (var s = 26 + k * 7; s < len - 10; s += 34) {
        var a = p.getPointAtLength(s), b = p.getPointAtLength(s + 1);
        var nx = -(b.y - a.y), ny = b.x - a.x, l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
        var side = (Math.floor(s / 34) % 2) ? 1 : -1;
        var hx = a.x + nx * side * 14, hy = a.y + ny * side * 14;
        inkB += '<path d="M' + (a.x + nx * side * 3).toFixed(1) + ' ' + (a.y + ny * side * 3).toFixed(1) + ' L' + hx.toFixed(1) + ' ' + hy.toFixed(1) + '" stroke="$0" stroke-width="2" stroke-linecap="round"/>';
        rec.push([hx, hy]);
      }
      p.remove();
    });
    /* the axon with varicosities, the middle one releasing */
    var ax = narrow ? 'M-210 -10 C-120 -30 -60 10 0 0 C60 -10 120 30 210 10' : 'M-320 -20 C-200 -40 -90 12 0 0 C90 -12 200 30 320 10';
    inkB += '<path d="' + ax + '" stroke="$0" stroke-width="3" fill="none" stroke-linecap="round"/>';
    var axp = S('path', { d: ax, fill: 'none', stroke: 'none' }, g);
    var al = axp.getTotalLength();
    for (var f = 0.12; f < 0.95; f += 0.19) {
      if (Math.abs(f - 0.5) < 0.08) continue;
      var q = axp.getPointAtLength(al * f);
      inkA += '<ellipse cx="' + q.x.toFixed(1) + '" cy="' + q.y.toFixed(1) + '" rx="8" ry="6" fill="$0"/>';
      inkB += '<ellipse cx="' + q.x.toFixed(1) + '" cy="' + q.y.toFixed(1) + '" rx="8" ry="6" fill="none" stroke="$0" stroke-width="1.6"/>';
    }
    axp.remove();
    riso(g, inkA, inkB);
    rec.forEach(function (r) {
      var c = S('circle', { cx: r[0], cy: r[1], r: 4, fill: C.paper, stroke: C.pausa, 'stroke-width': 1.5 }, g);
      receptors.push({ x: r[0], y: r[1], el: c, a: 0 });
    });
    G.term = S('ellipse', { cx: 0, cy: 0, rx: 15, ry: 10.5, fill: C.dopaSoft, stroke: C.ink, 'stroke-width': 2 }, g);
    /* radius ring */
    S('circle', { cx: 0, cy: 0, r: RC, fill: 'none', stroke: C.dopa, 'stroke-width': 1.4, 'stroke-dasharray': '4 5' }, g);
    var ang = -Math.PI / 4;
    S('line', { x1: 0, y1: 0, x2: Math.cos(ang) * RC, y2: Math.sin(ang) * RC, stroke: C.dopa, 'stroke-width': 1.2 }, g);
    G.rLab = S('text', { x: Math.cos(ang) * RC - 12, y: Math.sin(ang) * RC - 10, 'text-anchor': 'end', 'font-size': narrow ? 15 : 13, fill: C.ink, 'font-weight': 700, class: 'w02c-lab' }, g);
    /* scale bar */
    var sbx = narrow ? -100 : 220, sby = H / 2 - 22;
    S('line', { x1: sbx, y1: sby, x2: sbx + 40, y2: sby, stroke: C.ink, 'stroke-width': 2 }, g);
    S('line', { x1: sbx, y1: sby - 4, x2: sbx, y2: sby + 4, stroke: C.ink, 'stroke-width': 1.4 }, g);
    S('line', { x1: sbx + 40, y1: sby - 4, x2: sbx + 40, y2: sby + 4, stroke: C.ink, 'stroke-width': 1.4 }, g);
    G.sbLab = S('text', { x: sbx + 48, y: sby + 4, 'font-size': narrow ? 13 : 11, fill: C.dim, class: 'w02c-lab' }, g);
    G.tLab = S('text', { x: 0, y: 30, 'font-size': narrow ? 14 : 12, fill: C.ink, 'text-anchor': 'middle', class: 'w02c-lab' }, g);
    G.dLab = S('text', { x: narrow ? -200 : -310, y: narrow ? -H / 2 + 14 : -H / 2 + 12, class: 'w02c-lab', 'font-size': narrow ? 13.5 : 11.5, fill: C.dim }, g);
    G.pLayer = S('g', null, svgR);
    parts = [];
    if (DN.RM) staticCloud();
  }
  function gauss() { var u = 1 - Math.random(), v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function staticCloud() {
    G.pLayer.innerHTML = '';
    for (var i = 0; i < 220; i++) {
      var r = Math.abs(gauss()) * 62, a = Math.random() * 6.283;
      if (r > RC * 1.05) continue;
      S('circle', { cx: Math.cos(a) * r, cy: Math.sin(a) * r, r: 1.9, fill: C.dopa, opacity: .85 * (1 - r / (RC * 1.3)) }, G.pLayer);
    }
    receptors.forEach(function (rc) {
      var on = Math.hypot(rc.x, rc.y) < RC;
      rc.el.setAttribute('fill', on ? C.dopa : C.paper); rc.el.setAttribute('stroke', on ? C.dopa : C.pausa);
    });
  }
  var D = 4600;                   /* units^2 per s, chosen so the cloud reaches ~7 µm in about a second */
  function stepReg(now) {
    var dt = Math.min(0.05, (now - lastT) / 1000 || 0.016); lastT = now;
    puffT -= dt;
    if (puffT <= 0) {
      puffT = 1.9;
      for (var i = 0; i < 90; i++) parts.push({ x: gauss() * 4, y: gauss() * 3, age: 0, el: null });
      G.term.setAttribute('fill', 'rgba(232,149,47,.55)');
      setTimeout(function () { if (G.term) G.term.setAttribute('fill', C.dopaSoft); }, 180);
    }
    var sd = Math.sqrt(2 * D * dt);
    for (var k = parts.length - 1; k >= 0; k--) {
      var p = parts[k];
      p.x += gauss() * sd; p.y += gauss() * sd; p.age += dt;
      var r = Math.hypot(p.x, p.y);
      /* reuptake: survival falls with time and distance */
      var alive = p.age < 1.7 && !(r > RC * 1.15 && Math.random() < 0.2);
      if (!alive) { if (p.el) p.el.remove(); parts.splice(k, 1); continue; }
      if (!p.el) p.el = S('circle', { r: 1.9, fill: C.dopa }, G.pLayer);
      p.el.setAttribute('cx', p.x.toFixed(1)); p.el.setAttribute('cy', p.y.toFixed(1));
      p.el.setAttribute('opacity', (0.95 * (1 - p.age / 1.7)).toFixed(2));
    }
    receptors.forEach(function (rc) {
      rc.a *= Math.exp(-dt * 2.2);
      for (var j = 0; j < parts.length; j += 2) {
        var q = parts[j];
        if (Math.abs(q.x - rc.x) < 7 && Math.abs(q.y - rc.y) < 7) { rc.a = 1; break; }
      }
      var on = rc.a > .15;
      rc.el.setAttribute('fill', on ? 'rgba(232,149,47,' + rc.a.toFixed(2) + ')' : C.paper);
      rc.el.setAttribute('stroke', on ? C.dopa : C.pausa);
    });
  }

  /* ---------------- loop ---------------- */
  function frame(now) {
    raf = 0;
    if (!visible) return;
    stepReg(now);
    paintTrain(now);
    if (!DN.RM) raf = requestAnimationFrame(frame);
  }
  function kick() {
    if (DN.RM) { paintTrain(performance.now()); return; }
    if (visible && !raf) { lastT = performance.now(); raf = requestAnimationFrame(frame); }
    if (!sel && G.train) G.train.innerHTML = '';
  }

  /* ---------------- labels ---------------- */
  function relabel() {
    take.textContent = L('A dopamina viaja por quatro vias com funções diferentes: movimento, motivação, atenção e o freio da prolactina. Por isso um mesmo remédio pode ajudar numa via e causar efeito colateral em outra.',
      'Dopamine travels along four pathways with different jobs: movement, motivation, attention and the brake on prolactin. That is why one drug can help in one pathway and cause side effects in another.');
    list.setAttribute('aria-label', L('As quatro vias da dopamina', 'The four dopamine pathways'));
    LINES.forEach(function (ln) {
      var c = chips[ln.id];
      c.tx.innerHTML = '';
      var h = DN.el('div', { class: 'w02c-ch' }, c.tx);
      DN.el('b', null, h).textContent = ln.name();
      DN.el('span', { class: 'w02c-route' }, h).textContent = ln.route();
      var dl = DN.el('dl', null, c.tx);
      [[L('função', 'job'), ln.func()], [L('quando falha', 'when it fails'), ln.fail()], [L('remédio', 'drug'), ln.drug()]].forEach(function (r, i) {
        var row = DN.el('div', { class: 'w02c-row' }, dl);
        var dt = DN.el('dt', null, row);
        if (i === 1) { var ic = S('svg', { viewBox: '-10 -10 20 20', class: 'w02c-ic', 'aria-hidden': 'true' }, dt); icon(ln.icon, 0, 0, ln.col, ic, 1); }
        dt.appendChild(document.createTextNode(r[0]));
        DN.el('dd', null, row).textContent = r[1];
      });
    });
    if (G.fr) { G.fr.textContent = L('FRENTE', 'FRONT'); G.bk.textContent = L('NUCA', 'BACK'); }
    Object.keys(G.lab || {}).forEach(function (k) { G.lab[k].textContent = NODES[k].lab(); });
    placeIcons();
    svg.setAttribute('aria-label', L(
      'Corte do cérebro visto de lado com quatro linhas de metrô: nigroestriatal, da substância negra ao estriado dorsal; mesolímbica, da área tegmental ventral ao núcleo accumbens; mesocortical, da área tegmental ventral ao córtex pré-frontal; tuberoinfundibular, do hipotálamo à hipófise.',
      'Side view of the brain with four metro lines: nigrostriatal, from the substantia nigra to the dorsal striatum; mesolimbic, from the ventral tegmental area to the nucleus accumbens; mesocortical, from the ventral tegmental area to the prefrontal cortex; tuberoinfundibular, from the hypothalamus to the pituitary.'));
    paintSel(sel);
    regHead.textContent = L('De perto: um terminal de dopamina', 'Close up: one dopamine terminal');
    regTake.textContent = L('Na maioria dos terminais, a dopamina não vai a um alvo só. Ela se espalha por cerca de 7 micrômetros e alcança receptores de vários neurônios ao redor.',
      'At most terminals, dopamine does not go to a single target. It spreads over about 7 micrometres and reaches receptors on several neurons around it.');
    G.rLab.textContent = L('cerca de 7 µm', 'about 7 µm');
    G.sbLab.textContent = '2 µm';
    G.tLab.textContent = L('terminal de dopamina', 'dopamine terminal');
    G.tLab.setAttribute('y', 30);
    G.dLab.textContent = L('círculos: receptores em neurônios vizinhos', 'circles: receptors on neighbouring neurons');
    svgR.setAttribute('aria-label', L(
      'Ampliação de um terminal de dopamina. Pontos âmbar saem do terminal e se espalham num raio de cerca de 7 micrômetros, acendendo receptores em vários neurônios vizinhos.',
      'Close-up of one dopamine terminal. Amber dots leave the terminal and spread over a radius of about 7 micrometres, lighting receptors on several neighbouring neurons.'));
  }

  build();
  DN.onVisible(root, function (v) { visible = v; if (v) kick(); });
  DN.onLang(relabel);
  var rz = 0;
  window.addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () { if ((root.clientWidth < 560) !== narrow) build(); }, 150);
  });
})();
