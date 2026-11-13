/* c01 · o-que-ele-faz : risograph body plate with callouts, and the too little / too much strip */
(function () {
  'use strict';
  var root = DN.body('c01'); if (!root) return;
  var L = DN.L, C = DN.COL;
  var VW = 200, VH = 482;

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
  /* closed Catmull-Rom spline through points -> cubic path */
  function smooth(pts, closed) {
    var n = pts.length, d = 'M' + f1(pts[0][0]) + ',' + f1(pts[0][1]);
    var last = closed ? n : n - 1;
    for (var i = 0; i < last; i++) {
      var p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
      if (!closed) { if (i === 0) p0 = p1; if (i + 2 >= n) p3 = p2; }
      var k = 1 / 6;
      d += 'C' + f1(p1[0] + (p2[0] - p0[0]) * k) + ',' + f1(p1[1] + (p2[1] - p0[1]) * k) + ' ' +
        f1(p2[0] - (p3[0] - p1[0]) * k) + ',' + f1(p2[1] - (p3[1] - p1[1]) * k) + ' ' + f1(p2[0]) + ',' + f1(p2[1]);
    }
    return d + (closed ? 'Z' : '');
  }
  function mir(pts) { return pts.map(function (p) { return [VW - p[0], p[1]]; }); }

  /* ---------- the body: right half (viewer's right), mirrored. ~7.8 heads tall ---------- */
  var HALF = [
    [100, 11], [112, 14], [119, 23], [121, 34], [123.5, 38], [124, 45], [121.5, 51], [118, 56], [113, 64],
    [111.5, 70], [112, 80], [118, 87], [132, 91], [146, 94], [155, 100], [159.5, 112], [161, 130],
    [162.5, 152], [165.5, 176], [169.5, 200], [173.5, 226], [176, 242], [180.5, 254], [181.5, 270],
    [178, 286], [172, 290], [168.5, 280], [167.5, 268], [164.5, 254], [162, 242], [157, 216], [151.5, 190],
    [147, 168], [144, 146], [141.5, 128], [139.5, 124], [138, 138], [136.5, 160], [133, 186], [133.5, 206],
    [139.5, 228], [144.5, 248], [145.5, 268], [143, 300], [138.5, 330], [135, 356], [134.5, 372], [137.5, 395],
    [134, 422], [128.5, 450], [128.5, 460], [139, 469], [139, 476], [124, 477], [115.5, 474], [115, 462],
    [114, 448], [112.5, 420], [110.5, 394], [112, 372], [108.5, 352], [106, 320], [104, 288], [101.5, 266], [100, 262]
  ];
  var OUT = HALF.slice(0, HALF.length - 1).concat(mir(HALF).reverse().slice(1, HALF.length - 1));
  var BODY = smooth(OUT, true);

  /* organs */
  var BRAIN = smooth([[100, 15], [110, 16.5], [116.5, 23], [118, 31], [115, 38.5], [107, 41], [100, 39], [93, 41], [85, 38.5], [82, 31], [83.5, 23], [90, 16.5]], true);
  var GYRI = 'M100,16 L100,39 M92,20 q-4,3 -2,7 t-3,7 M108,20 q4,3 2,7 t3,7 M86,29 q4,-1 6,2 M114,29 q-4,-1 -6,2 M95,24 q-2,4 1,7 M105,24 q2,4 -1,7 M89,36 q3,-3 7,-1 M111,36 q-3,-3 -7,-1';
  var LIVER = smooth([[66, 152], [86, 147], [108, 149], [121, 154], [117, 160], [104, 167], [90, 176], [76, 183], [69, 176], [66, 164]], true);
  var HEART = 'M104,118 C110,112 120,116 117,126 C115,133 108,138 104,140 C100,136 95,130 96,124 C97,117 102,116 104,118Z';
  function kidney(cx, cy, flip) {
    var s = flip ? -1 : 1;
    return 'M' + cx + ',' + (cy - 12) + ' C' + (cx + 9 * s) + ',' + (cy - 12) + ' ' + (cx + 10 * s) + ',' + (cy + 12) + ' ' + cx + ',' + (cy + 12) +
      ' C' + (cx - 5 * s) + ',' + (cy + 12) + ' ' + (cx - 6 * s) + ',' + (cy + 4) + ' ' + (cx - 3 * s) + ',' + cy +
      ' C' + (cx - 6 * s) + ',' + (cy - 4) + ' ' + (cx - 5 * s) + ',' + (cy - 12) + ' ' + cx + ',' + (cy - 12) + 'Z';
  }
  var KID_R = kidney(84, 203, true), KID_L = kidney(116, 197, false);
  /* adrenals: small caps on top of each kidney */
  var ADR_R = 'M77,192 C78,186 83,182 87,181 C90,184 92,188 91,192 C87,190 81,190 77,192Z';
  var ADR_L = 'M109,186 C110,182 113,178 117,176 C121,178 124,182 123,186 C119,184 113,184 109,186Z';
  var ADR = [[84, 186], [116, 181]];
  /* quadriceps on both thighs */
  function quad(cx) {
    return smooth([[cx - 1, 268], [cx + 8, 282], [cx + 10, 306], [cx + 6, 334], [cx, 346], [cx - 6, 334], [cx - 10, 306], [cx - 8, 282]], true);
  }
  var QUAD_R = quad(75), QUAD_L = quad(125);
  /* subcutaneous fat at the hips (vermilion screen, hugging the outline) */
  var FAT_R = smooth([[66.5, 206], [60.5, 228], [55.5, 248], [54.5, 266], [62, 268], [64, 248], [69, 228], [71, 208]], true);
  var FAT_L = smooth(mir([[66.5, 206], [60.5, 228], [55.5, 248], [54.5, 266], [62, 268], [64, 248], [69, 228], [71, 208]]), true);
  /* arteries: aorta, iliac and femoral, carotids, subclavian and brachial */
  var ART = [
    'M101,122 C101,112 108,108 112,112 M101,118 L101,226 C99,234 92,244 88,262 C86,290 84,320 85,352 M101,226 C103,234 108,244 112,262 C114,290 116,320 115,352',
    'M97,112 L95,74 M105,112 L106,74 M106,112 C120,104 136,104 144,116 C148,140 151,168 155,190 C158,210 162,228 166,246 M95,112 C80,104 64,104 56,116 C52,140 49,168 45,190 C42,210 38,228 34,246'
  ];
  var NODES = [[89, 80], [111, 80], [61, 122], [139, 122], [84, 250], [116, 250], [80, 255], [120, 255]];
  var CLOCKS = [[93, 160], [125, 306], [139, 128]];

  /* ---------- risograph assembly ---------- */
  var INKS = [{ k: 'a', col: C.alta, ang: 15, op: 0.95 }, { k: 'b', col: C.baixa, ang: 75, op: 0.93 }];
  function riso() {
    var R = rng(1950);
    var art = {
      a: '<path d="' + FAT_R + '" fill="$2"/><path d="' + FAT_L + '" fill="$2"/>' +
        '<path d="' + HEART + '" fill="$2"/>' +
        ART.map(function (d) { return '<path d="' + d + '" stroke="$0" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; }).join('') +
        '<path d="' + ADR_R + '" fill="$0"/><path d="' + ADR_L + '" fill="$0"/>' +
        '<circle cx="100" cy="45.5" r="2.2" fill="$0"/>',
      b: '<path d="' + BODY + '" fill="$1"/>' +
        '<path d="' + BODY + '" fill="none" stroke="$0" stroke-width="1.4" stroke-linejoin="round"/>' +
        '<path d="' + BRAIN + '" fill="$3"/>' +
        '<path d="' + GYRI + '" stroke="#fff" class="ps" stroke-width="1.1" fill="none" stroke-linecap="round"/>' +
        '<path d="' + LIVER + '" fill="$3"/>' +
        '<path d="' + LIVER + '" fill="none" stroke="$0" stroke-width="1"/>' +
        '<path d="' + KID_R + '" fill="$2"/><path d="' + KID_L + '" fill="$2"/>' +
        '<path d="' + KID_R + '" fill="none" stroke="$0" stroke-width="1"/><path d="' + KID_L + '" fill="none" stroke="$0" stroke-width="1"/>' +
        '<path d="' + QUAD_R + '" fill="$2"/><path d="' + QUAD_L + '" fill="$2"/>' +
        '<path d="M75,272 L75,340 M125,272 L125,340" stroke="#fff" class="ps" stroke-width="0.9" fill="none"/>' +
        '<path d="M65,98 C78,96 90,102 98,112 M135,98 C122,96 110,102 102,112" stroke="$0" stroke-width="0.8" fill="none" opacity=".7"/>' +
        NODES.map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.6" fill="$0"/>'; }).join('') +
        '<path d="M100,47.5 L100,52" stroke="$0" stroke-width="1"/>'
    };
    var defs = '', layers = '';
    INKS.forEach(function (ink, li) {
      var p = 'c01r-' + ink.k;
      [0.5, 0.82, 1.12].forEach(function (r, j) {
        defs += '<pattern id="' + p + 'h' + (j + 1) + '" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.3" cy="1.3" r="' + r + '" fill="' + ink.col + '"/></pattern>';
      });
      defs += '<filter id="' + p + 'g" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.4" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3 0 0 0 2.5" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
      var mx = f1((R() < 0.5 ? -1 : 1) * (0.4 + R() * (li ? 0.9 : 0.5)));
      var my = f1((R() < 0.5 ? -1 : 1) * (0.4 + R() * (li ? 0.8 : 0.4)));
      var body = art[ink.k].replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#' + p + 'h$1)');
      for (var s = 0; s < 9; s++) body += '<circle cx="' + f1(10 + R() * 180) + '" cy="' + f1(10 + R() * 460) + '" r="' + f1(0.3 + R() * 0.5) + '" fill="' + ink.col + '"/>';
      layers += '<g class="c01-ink c01-ink-' + ink.k + '" transform="translate(' + mx + ' ' + my + ')" opacity="' + ink.op + '" filter="url(#' + p + 'g)">' + body + '</g>';
    });
    /* clocks: tiny printed dials in the overlap ink */
    var clocks = CLOCKS.map(function (c) {
      return '<g class="c01-clock"><circle cx="' + c[0] + '" cy="' + c[1] + '" r="5" fill="#fff" class="pp" stroke="#1f2a2a" stroke-width="1.1"/>' +
        '<path d="M' + c[0] + ',' + (c[1] - 3.2) + ' L' + c[0] + ',' + c[1] + ' L' + (c[0] + 2.4) + ',' + (c[1] + 1) + '" stroke="#1f2a2a" stroke-width="1" fill="none" stroke-linecap="round"/></g>';
    }).join('');
    return '<defs>' + defs + '</defs>' + layers + clocks;
  }

  /* ---------- callouts ---------- */
  var BOX = [
    { k: 'brain', side: 'l', a: [87, 22],
      h: function () { return L('cérebro', 'brain'); },
      t: function () { return L('Ajuda a acordar e a gravar a memória de um momento emocional, mas cortisol demais ou de menos atrapalha a lembrança.', 'It helps you wake up and store the memory of an emotional moment, but too much or too little cortisol impairs recall.'); },
      s: 'Lupien 2007' },
    { k: 'immune', side: 'l', a: [61, 122],
      h: function () { return L('células de defesa', 'immune cells'); },
      t: function () { return L('Freia a inflamação, e por isso versões do cortisol viraram remédio.', 'It damps inflammation, which is why versions of cortisol became drugs.'); },
      s: function () { return L('livro-texto', 'textbook'); } },
    { k: 'liver', side: 'l', a: [74, 166],
      h: function () { return L('fígado', 'liver'); },
      t: function () { return L('Fabrica glicose a partir de outras moléculas.', 'It makes glucose out of other molecules.'); },
      s: function () { return L('livro-texto', 'textbook'); } },
    { k: 'fat', side: 'l', a: [72, 300],
      h: function () { return L('gordura e músculo', 'fat and muscle'); },
      t: function () { return L('Liberam matéria-prima para essa glicose, e a insulina perde força.', 'They release raw material for that glucose, and insulin loses strength.'); },
      s: function () { return L('livro-texto', 'textbook'); } },
    { k: 'vessels', side: 'r', a: [149, 140],
      h: function () { return L('vasos', 'blood vessels'); },
      t: function () { return L('Mantêm a pressão, que sem cortisol cai quando a pessoa se levanta.', 'They hold blood pressure up, and without cortisol it drops when a person stands.'); },
      s: 'Husebye 2021' },
    { k: 'adrenal', side: 'r', a: [117, 181], adr: true,
      h: function () { return L('adrenais', 'adrenal glands'); },
      t: function () { return L('São duas glândulas em cima dos rins, que fabricam cerca de 10\u00a0mg de cortisol por dia.', 'These two glands on top of the kidneys make about 10\u00a0mg of cortisol a day.'); },
      s: 'Esteban 1991' },
    { k: 'clocks', side: 'r', a: [125, 306],
      h: function () { return L('relógios dos órgãos', 'organ clocks'); },
      t: function () { return L('O pico da manhã acerta os relógios do fígado, dos músculos e das defesas.', 'The morning peak sets the clocks of the liver, the muscles and the immune system.'); },
      s: 'Adam 2017' }
  ];
  function src(b) { return typeof b.s === 'function' ? b.s() : b.s; }

  /* ---------- skeleton ---------- */
  root.innerHTML = '';
  var take = DN.el('p', { class: 'c01-read' }, root);
  var plate = DN.el('div', { class: 'c01-plate' }, root);
  var colL = DN.el('div', { class: 'c01-col c01-colL' }, plate);
  var fig = DN.el('div', { class: 'c01-fig' }, plate);
  var colR = DN.el('div', { class: 'c01-col c01-colR' }, plate);
  var over = DN.svg('svg', { class: 'c01-over', 'aria-hidden': 'true' }, plate);
  var listEl = DN.el('ol', { class: 'c01-list' }, root);
  var strip = DN.el('div', { class: 'c01-strip' }, root);

  var svg = DN.svg('svg', { viewBox: '0 0 ' + VW + ' ' + VH, role: 'img', class: 'c01-body' }, fig);
  svg.innerHTML = riso();
  /* crisp overlay inside the body: the request and the brake, and numbered markers */
  var axis = DN.svg('g', { class: 'c01-axis' }, svg);
  DN.svg('path', { d: 'M97.5,50 C93,80 92,120 92,150 C92,165 89,176 85.5,183', class: 'c01-req' }, axis);
  DN.svg('path', { d: 'M88.6,177.5 L85.5,183.5 L84.6,176.6', class: 'c01-reqh' }, axis);
  DN.svg('path', { d: 'M116,176 C112,166 108.5,152 108.5,136 C108.5,110 107,80 102.5,50', class: 'c01-brk' }, axis);
  DN.svg('path', { d: 'M100.8,56 L102.4,49.5 L105.5,55.4', class: 'c01-brkh' }, axis);
  var reqT = DN.svg('text', { class: 'c01-axt c01-axr', transform: 'translate(88.5 62) rotate(90)' }, axis);
  var brkT = DN.svg('text', { class: 'c01-axt c01-axb', transform: 'translate(112.5 128) rotate(-90)' }, axis);
  var gm = DN.svg('g', { class: 'c01-marks' }, svg);
  var marks = BOX.map(function (b, i) {
    var g = DN.svg('g', { class: 'c01-mk' + (b.adr ? ' c01-mkadr' : '') }, gm);
    DN.svg('circle', { cx: b.a[0], cy: b.a[1], r: 6.2 }, g);
    var t = DN.svg('text', { x: b.a[0], y: b.a[1] + 2.7, 'text-anchor': 'middle' }, g);
    t.textContent = i + 1;
    return g;
  });

  var boxes = BOX.map(function (b, i) {
    var el = DN.el('div', { class: 'c01-box' + (b.adr ? ' c01-adr' : '') });
    return el;
  });

  function fillBox(el, b, i) {
    el.innerHTML = '<div class="c01-bh"><span class="c01-n">' + (i + 1) + '</span><b>' + b.h() + '</b></div>' +
      '<div class="c01-bt">' + b.t() + '</div><div class="c01-bs">' + src(b) + '</div>';
  }

  var wide = null, shown = false;
  var leaders = [];

  function labels() {
    take.textContent = L('O cortisol é o hormônio que mobiliza o corpo, porque dá energia, sustenta a pressão e segura a inflamação, e o corpo adoece tanto com pouco cortisol quanto com muito.',
      'Cortisol is the hormone that mobilizes the body, because it supplies energy, holds blood pressure up and restrains inflammation, and the body falls ill with too little cortisol as much as with too much.');
    reqT.textContent = L('o estímulo', 'the stimulus');
    brkT.textContent = L('o freio', 'the brake');
    svg.setAttribute('aria-label', L('Corpo humano de frente. ', 'Front view of a human body. ') + BOX.map(function (b, i) { return (i + 1) + '. ' + b.h() + ': ' + b.t(); }).join(' ') +
      L(' Uma seta vai do cérebro às adrenais e mostra o estímulo; outra volta e mostra o cortisol freando o cérebro.', ' One arrow runs from the brain to the adrenals and shows the stimulus; another runs back and shows cortisol inhibiting the brain.'));
    BOX.forEach(function (b, i) { fillBox(boxes[i], b, i); });
    strip.innerHTML =
      '<div class="c01-card c01-low"><div class="c01-ch"><span class="c01-sw"></span><b>' + L('Pouco demais', 'Too little') + '</b></div>' +
      '<div class="c01-cs">' + L('doença de Addison, ou parar um corticoide de repente', 'Addison’s disease, or stopping a steroid drug abruptly') + '</div>' +
      '<div class="c01-ct">' + L('A pressão cai, e uma infecção vira emergência.', 'Blood pressure falls, and an infection becomes an emergency.') + '</div></div>' +
      '<div class="c01-card c01-high"><div class="c01-ch"><span class="c01-sw"></span><b>' + L('Demais, por meses', 'Too much, for months') + '</b></div>' +
      '<div class="c01-cs">' + L('síndrome de Cushing, quase sempre causada por remédio', 'Cushing’s syndrome, almost always caused by a drug') + '</div>' +
      '<div class="c01-ct">' + L('O rosto arredonda, surgem estrias, e ossos e músculos enfraquecem.', 'The face rounds out, stretch marks appear, and bones and muscles weaken.') + '</div></div>' +
      '<a class="c01-more" href="#s06">' + L('ver seção 06', 'see section 06') + ' &darr;</a>';
  }

  function layout() {
    var W = root.clientWidth || 600;
    var isWide = W >= 600;
    root.classList.toggle('c01-wide', isWide);
    /* place boxes */
    BOX.forEach(function (b, i) {
      var target = isWide ? (b.side === 'l' ? colL : colR) : listEl;
      if (isWide) target.appendChild(boxes[i]);
      else { var li = listEl.children[i] || DN.el('li', null, listEl); li.appendChild(boxes[i]); }
    });
    if (isWide) listEl.innerHTML = '';
    over.innerHTML = '';
    leaders = [];
    if (!isWide) { fig.style.height = ''; fig.style.width = ''; plate.style.minHeight = ''; colL.style.height = colR.style.height = ''; return; }
    var figH = Math.min(600, Math.max(480, W * 0.8));
    fig.style.height = figH + 'px';
    var sc = figH / VH, fw = VW * sc;
    fig.style.width = fw + 'px';
    var pr = plate.getBoundingClientRect(), fr = svg.getBoundingClientRect();
    over.setAttribute('width', pr.width); over.setAttribute('height', pr.height);
    over.setAttribute('viewBox', '0 0 ' + pr.width + ' ' + pr.height);
    var ox = fr.left - pr.left, oy = fr.top - pr.top;
    function A(b) { return [ox + b.a[0] * sc, oy + b.a[1] * sc]; }
    /* vertical placement per column: aim the header at the anchor, then resolve overlaps */
    var maxH = 0;
    ['l', 'r'].forEach(function (side) {
      var col = side === 'l' ? colL : colR;
      var items = BOX.map(function (b, i) { return { b: b, i: i }; }).filter(function (o) { return o.b.side === side; });
      var GAP = 14, y = 0;
      items.forEach(function (o) {
        var el = boxes[o.i];
        o.h = el.offsetHeight;
        o.y = Math.max(y, A(o.b)[1] - 12);
        y = o.y + o.h + GAP;
      });
      var limit = Math.max(figH, y - GAP);
      /* pull up from the bottom if needed */
      var bottom = limit;
      for (var j = items.length - 1; j >= 0; j--) {
        if (items[j].y + items[j].h > bottom) items[j].y = bottom - items[j].h;
        bottom = items[j].y - GAP;
      }
      items.forEach(function (o) {
        boxes[o.i].style.top = Math.max(0, o.y) + 'px';
        maxH = Math.max(maxH, o.y + o.h);
      });
      col.style.height = Math.max(figH, maxH) + 'px';
      /* leaders: from the box edge at the header line, elbow, into the marker */
      items.forEach(function (o, k) {
        var el = boxes[o.i];
        var cr = col.getBoundingClientRect();
        var bx = side === 'l' ? cr.right - pr.left + 2 : cr.left - pr.left - 2;
        var by = o.y + 11 + (cr.top - pr.top);
        var an = A(o.b);
        var r = 6.2 * sc + 1;
        var ex = side === 'l' ? an[0] - r : an[0] + r;
        var kx = side === 'l' ? Math.min(ex - 6, ox + 22) : Math.max(ex + 6, ox + fw - 22);
        if (side === 'l' && kx < bx + 6) kx = bx + 6;
        if (side === 'r' && kx > bx - 6) kx = bx - 6;
        var d = 'M' + f1(bx) + ',' + f1(by) + ' L' + f1(kx) + ',' + f1(by) + ' L' + f1(ex) + ',' + f1(an[1]);
        var p = DN.svg('path', { d: d, class: 'c01-lead' + (o.b.adr ? ' c01-leadadr' : ''), pathLength: 1 }, over);
        DN.svg('circle', { cx: bx, cy: by, r: 2, class: 'c01-ld' + (o.b.adr ? ' c01-leadadr' : '') }, over);
        leaders.push({ p: p, y: an[1], i: o.i });
      });
    });
    plate.style.minHeight = Math.max(figH, maxH) + 'px';
    leaders.sort(function (a, b) { return a.y - b.y; });
    leaders.forEach(function (l, k) { l.p.style.transitionDelay = (DN.RM ? 0 : k * 0.3) + 's'; });
    if (shown || DN.RM) plate.classList.add('c01-in');
  }

  DN.onVisible(plate, function (v) {
    if (v && !shown) { shown = true; requestAnimationFrame(function () { plate.classList.add('c01-in'); }); }
  }, { threshold: 0.25 });
  if (DN.RM) { shown = true; plate.classList.add('c01-in'); }

  var rt, lastW = 0;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { var w = root.clientWidth; if (w !== lastW) { lastW = w; layout(); } }, 150);
  });
  DN.onLang(function () { labels(); layout(); });
  labels();
  lastW = root.clientWidth;
  layout();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
})();
