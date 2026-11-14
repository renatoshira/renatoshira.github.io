/* l11 · segundos-ate-o-limite : seconds until four myopia devices pass the ANSI retinal limit, log time axis, against a 180 s session */
(function () {
  'use strict';
  var root = DN.body('l11'); if (!root) return;
  var L = DN.L, C = DN.COL;

  /* Ostrin & Schill, JAMA Ophthalmol 2026: time to exceed the ANSI group 1 limit, 7 mm pupil.
     Future Vision 253 s comes from Healio coverage [S], so it is drawn as approximate. */
  var SESSION = 180, TMIN = 1, TMAX = 36000;
  var DEV = [
    { n: 'Eyerising', t: 1.4, hot: true },
    { n: 'Sky-n1201a', t: 2.8, hot: true },
    { n: 'Future Vision', t: 253, approx: true },
    { n: 'AirDoc', t: 22761, sub: function () { return L('LED difuso', 'diffuse LED'); } }
  ];
  function timeTxt(d) {
    if (d.t === 1.4 || d.t === 2.8) return DN.fmt(d.t, 1) + ' s';
    if (d.approx) return L('cerca de 253 s, ou 4 min', 'about 253 s, or 4 min');
    return L('22.761 s, cerca de 6 h e 19 min', '22,761 s, about 6 h 19 min');
  }
  function ratioTxt(d) {
    return d.t === 1.4 ? [L('a sessão dura cerca de 130 vezes', 'the session lasts about 130 times'), L('o tempo até o limite', 'the time to the limit')]
      : [L('cerca de 64 vezes', 'about 64 times')];
  }

  /* ---------- risograph eye and goggles (rubi + ameixa) ---------- */
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
  /* eye: 24 mm globe at 3.6 px per mm, light enters from the left.
     centre (84,64), r 43; cornea r 7.8 mm; pupil 7 mm; lens 9 x 4 mm. */
  function riso() {
    var R = rng(1104);
    var cx = 84, cy = 64, r = 43, mm = 3.6;
    var pr = 3.5 * mm;           /* pupil radius */
    var ix = cx - r + 3.2 * mm;  /* iris plane */
    var fx = cx + r - 2;         /* fovea, on the back wall */
    var corneaC = cx - r + 7.8 * mm - 2.6 * mm;
    var art = {
      /* ameixa: sclera halftone ring, cornea, iris, lens, optic nerve, goggles lenses */
      b: '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="$1"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r - 3.2) + '" fill="#fff" class="l11-pp"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r - 3.2) + '" fill="$3" opacity=".35"/>' +
        '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="$0" stroke-width="1.6"/>' +
        '<path d="M' + f1(cx - r + 2) + ',' + f1(cy - 21) + ' A' + f1(7.8 * mm) + ',' + f1(7.8 * mm) + ' 0 0 0 ' + f1(cx - r + 2) + ',' + f1(cy + 21) + '" fill="#fff" class="l11-pp" stroke="$0" stroke-width="1.4"/>' +
        '<path d="M' + f1(ix) + ',' + f1(cy - 21) + ' L' + f1(ix) + ',' + f1(cy - pr) + ' M' + f1(ix) + ',' + f1(cy + pr) + ' L' + f1(ix) + ',' + f1(cy + 21) + '" stroke="$0" stroke-width="3.2" stroke-linecap="round"/>' +
        '<ellipse cx="' + f1(ix + 2.6 * mm) + '" cy="' + cy + '" rx="' + f1(2 * mm) + '" ry="' + f1(4.5 * mm) + '" fill="$2" stroke="$0" stroke-width="1.2"/>' +
        '<path d="M' + f1(cx + r - 4) + ',' + f1(cy + 10) + ' l16,4 l0,10 l-17,-4 z" fill="$2"/>' +
        /* goggles */
        '<path d="M6,150 C24,142 56,142 70,150 M98,150 C112,142 144,142 162,150" stroke="$0" stroke-width="2" fill="none"/>' +
        '<rect x="22" y="146" width="44" height="28" rx="10" fill="$3"/>' +
        '<rect x="102" y="146" width="44" height="28" rx="10" fill="$3"/>',
      /* rubi: the beam through the pupil, focused on the retina, and the goggles frame */
      a: '<path d="M0,' + f1(cy - pr) + ' L' + f1(cx - r + 1) + ',' + f1(cy - pr) + ' L' + fx + ',' + cy + ' L' + f1(cx - r + 1) + ',' + f1(cy + pr) + ' L0,' + f1(cy + pr) + ' Z" fill="$2"/>' +
        '<path d="M0,' + f1(cy - pr) + ' L' + f1(cx - r + 1) + ',' + f1(cy - pr) + ' L' + fx + ',' + cy + ' M0,' + f1(cy + pr) + ' L' + f1(cx - r + 1) + ',' + f1(cy + pr) + ' L' + fx + ',' + cy + '" stroke="$0" stroke-width="1.3" fill="none"/>' +
        '<path d="M' + f1(cx + (r - 2.5) * 0.707) + ',' + f1(cy - (r - 2.5) * 0.707) + ' A' + (r - 2.5) + ',' + (r - 2.5) + ' 0 0 1 ' + f1(cx + (r - 2.5) * 0.707) + ',' + f1(cy + (r - 2.5) * 0.707) + '" stroke="$0" stroke-width="2.6" fill="none"/>' +
        '<circle cx="' + fx + '" cy="' + cy + '" r="3.6" fill="$0"/>' +
        '<rect x="19" y="143" width="50" height="34" rx="12" fill="none" stroke="$0" stroke-width="3"/>' +
        '<rect x="99" y="143" width="50" height="34" rx="12" fill="none" stroke="$0" stroke-width="3"/>' +
        '<path d="M69,156 C76,150 92,150 99,156" stroke="$0" stroke-width="3" fill="none"/>'
    };
    var INKS = [{ k: 'b', col: C.infra, ang: 75, op: 0.92 }, { k: 'a', col: C.rubi, ang: 15, op: 0.95 }];
    var defs = '', layers = '';
    INKS.forEach(function (ink, li) {
      var p = 'l11r-' + ink.k;
      [0.5, 0.85, 1.15].forEach(function (rr, j) {
        defs += '<pattern id="' + p + 'h' + (j + 1) + '" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.3" cy="1.3" r="' + rr + '" fill="' + ink.col + '"/></pattern>';
      });
      defs += '<filter id="' + p + 'g" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.6" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
      var mx = f1((R() < 0.5 ? -1 : 1) * (0.6 + R() * (li ? 1.2 : 0.6)));
      var my = f1((R() < 0.5 ? -1 : 1) * (0.5 + R() * (li ? 1.0 : 0.5)));
      var body = art[ink.k].replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#' + p + 'h$1)');
      for (var s = 0; s < 5; s++) body += '<circle cx="' + f1(6 + R() * 156) + '" cy="' + f1(6 + R() * 176) + '" r="' + f1(0.3 + R() * 0.5) + '" fill="' + ink.col + '"/>';
      layers += '<g class="l11-ink l11-ink-' + ink.k + '" transform="translate(' + mx + ' ' + my + ')" opacity="' + ink.op + '" filter="url(#' + p + 'g)">' + body + '</g>';
    });
    /* crisp ink labels on top */
    var lab = '<g class="l11-ilab">' +
      '<path d="M' + (cx - r) + ',122 h' + (2 * r) + ' M' + (cx - r) + ',118 v8 M' + (cx + r) + ',118 v8" class="l11-dim"/>' +
      '<text x="' + cx + '" y="135" text-anchor="middle">' + L('24 mm', '24 mm') + '</text>' +
      '<text x="' + (fx + 6) + '" y="' + (cy - 34) + '" text-anchor="middle">' + 'retina' + '</text>' +
      '<text x="' + 84 + '" y="196" text-anchor="middle">' + L('óculos de proteção', 'safety goggles') + '</text>' +
      '</g>';
    return '<svg viewBox="0 0 168 200" role="img" aria-label="' +
      L('Corte de um olho de 24 milímetros: o feixe vermelho entra pela pupila e a lente o foca num ponto da retina. Embaixo, um par de óculos de proteção.',
        'Cross-section of a 24 millimetre eye: the red beam enters through the pupil and the lens focuses it on one spot of the retina. Below, a pair of safety goggles.') +
      '"><defs>' + defs + '</defs>' + layers + lab + '</svg>';
  }

  /* ---------- skeleton ---------- */
  root.innerHTML = '';
  var take = DN.el('p', { class: 'l11-read' }, root);
  var row = DN.el('div', { class: 'l11-row' }, root);
  var art = DN.el('div', { class: 'l11-art' }, row);
  var chart = DN.el('div', { class: 'l11-chart' }, row);
  var cards = DN.el('div', { class: 'l11-cards' }, root);
  var more = DN.el('details', { class: 'more l11-more' }, root);
  var sum = DN.el('summary', null, more);
  var tbl = DN.el('div', { class: 'l11-tw' }, more);
  var played = false, svgEl = null;

  function txt(parent, x, y, s, cls, anchor) {
    var t = DN.svg('text', { x: x, y: y, class: cls, 'text-anchor': anchor || 'start' }, parent);
    t.textContent = s; return t;
  }

  function draw() {
    chart.innerHTML = '';
    var W = Math.max(260, Math.floor(chart.clientWidth || 480));
    var narrow = W < 420;
    var m = { l: 2, r: 12, t: 40 };
    var iw = W - m.l - m.r;
    var lx = function (t) { return m.l + (Math.log(t) - Math.log(TMIN)) / (Math.log(TMAX) - Math.log(TMIN)) * iw; };
    var BH = 14;
    /* rows: name line, bar, then the written ratio for the two hot devices */
    var rows = [], yy = m.t;
    DEV.forEach(function (d) {
      var two = narrow && !d.hot;
      var r = { d: d, ny: yy + 12, by: yy + (two ? 33 : 20), two: two };
      var extra = d.hot ? ratioTxt(d).length * 13 + 6 : 0;
      r.ry = r.by + BH + 14;
      yy = r.by + BH + extra + 18;
      rows.push(r);
    });
    var axY = yy + 4;
    var H = axY + 30;
    var s = DN.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H, role: 'img', class: 'l11-svg' }, chart);
    s.setAttribute('aria-label', L('Tempo até passar do limite seguro para a retina, em escala logarítmica de 1 segundo a 10 horas, com a sessão de 180 segundos marcada. ', 'Time until the safe retinal limit is passed, on a log scale from 1 second to 10 hours, with the 180 second session marked. ') +
      DEV.map(function (d) { return d.n + ': ' + timeTxt(d); }).join('; ') + '.');

    /* grid and axis */
    var g = DN.svg('g', null, s);
    var TK = [[1, '1 s', 1], [10, '10 s', 0], [60, '1 min', 1], [600, '10 min', 0], [3600, '1 h', 1], [36000, '10 h', 0]];
    TK.forEach(function (k) {
      var x = lx(k[0]);
      DN.svg('line', { x1: x, x2: x, y1: m.t - 4, y2: axY, class: 'l11-gl' }, g);
      DN.svg('line', { x1: x, x2: x, y1: axY, y2: axY + 4, class: 'l11-base' }, g);
      txt(g, x, axY + 17, k[1], 'l11-tick' + (k[2] ? ' l11-tickm' : ''), k[0] === 1 ? 'start' : (k[0] === TMAX ? 'end' : 'middle'));
    });
    DN.svg('line', { x1: m.l, x2: m.l + iw, y1: axY, y2: axY, class: 'l11-base' }, g);

    /* the session line, drawn before the bars */
    var sx = lx(SESSION);
    var gs = DN.svg('g', { class: 'l11-sess' }, s);
    DN.svg('line', { x1: sx, x2: sx, y1: 22, y2: axY, class: 'l11-sline' }, gs);
    var sl = narrow ? [L('sessão recomendada:', 'recommended session:'), L('3 minutos', '3 minutes')] : [L('a sessão recomendada: 3 minutos', 'the recommended session: 3 minutes')];
    var st = DN.svg('text', { x: sx, y: narrow ? 6 : 16, class: 'l11-slab', 'text-anchor': 'middle' }, gs);
    sl.forEach(function (ln, j) { var ts = DN.svg('tspan', { x: sx, dy: j ? 12 : 0 }, st); ts.textContent = ln; });
    if (narrow) { st.setAttribute('y', 8); }

    /* bars */
    var gb = DN.svg('g', null, s);
    var bars = [];
    rows.forEach(function (r) {
      var d = r.d, x1 = lx(d.t);
      var bg = DN.svg('g', { class: 'l11-bar' + (d.hot ? ' l11-hot' : '') }, gb);
      var name = DN.svg('text', { x: m.l, y: r.ny, class: 'l11-name' }, bg);
      var ts = DN.svg('tspan', null, name); ts.textContent = d.n;
      if (d.sub) { var t2 = DN.svg('tspan', { class: 'l11-nsub' }, name); t2.textContent = ' (' + d.sub() + ')'; }
      var t3 = DN.svg('tspan', r.two ? { class: 'l11-val', x: m.l, dy: 13 } : { class: 'l11-val' + (d.hot ? ' l11-valh' : '') }, name);
      t3.textContent = (r.two ? '' : '  ') + timeTxt(d);
      var rect = DN.svg('rect', { x: m.l, y: r.by, width: Math.max(2, x1 - m.l - (d.approx ? 8 : 0)), height: BH, class: 'l11-rect' }, bg);
      if (d.approx) {
        DN.svg('rect', { x: x1 - 8, y: r.by + 0.5, width: 8, height: BH - 1, class: 'l11-apx' }, bg);
      }
      DN.svg('line', { x1: x1, x2: x1, y1: r.by - 3, y2: r.by + BH + 3, class: 'l11-endtick' + (d.hot ? ' l11-endh' : '') }, bg);
      if (d.hot) {
        var rt = DN.svg('text', { x: m.l, y: r.ry, class: 'l11-ratio' }, bg);
        ratioTxt(d).forEach(function (ln, j) { var tt = DN.svg('tspan', { x: m.l, dy: j ? 13 : 0 }, rt); tt.textContent = ln; });
        try { var rb = rt.getBBox(); bg.insertBefore(DN.svg('rect', { x: rb.x - 3, y: rb.y - 1, width: rb.width + 6, height: rb.height + 2, class: 'l11-knock l11-knr' }), rt); } catch (e) {}
      }
      bars.push(bg);
      /* paper behind the label, so the session line breaks around it */
      try {
        var bb = name.getBBox();
        var bk = DN.svg('rect', { x: bb.x - 3, y: bb.y - 1, width: bb.width + 6, height: bb.height + 2, class: 'l11-knock' });
        bg.insertBefore(bk, name);
      } catch (e) {}
    });
    svgEl = { s: s, sess: gs, bars: bars };
    if (played || DN.RM) show(true);
  }

  function show(instant) {
    if (!svgEl) return;
    var e = svgEl;
    if (instant) { root.classList.add('l11-in'); e.sess.classList.add('in'); e.bars.forEach(function (b) { b.classList.add('in'); }); return; }
    e.sess.classList.add('in');
    setTimeout(function () { root.classList.add('l11-in'); e.bars.forEach(function (b) { b.classList.add('in'); }); }, 450);
  }

  function texts() {
    take.textContent = L('Dois dos quatro aparelhos de miopia passaram do limite de segurança da retina em menos de 3 segundos, numa sessão de 3 minutos. O aparelho de LED difuso levou mais de 6 horas, e a diferença entre eles é o tipo de luz que chega ao olho.',
      'Two of the four myopia devices passed the retinal safety limit in under 3 seconds, in a 3-minute session. The diffuse LED device took more than 6 hours, and the difference between them is the kind of light that reaches the eye.');
    art.innerHTML = riso();
    var C3 = [
      ['2023', L('Uma menina de 12 anos perdeu visão nos dois olhos depois de 5 meses de uso, com lesão nos fotorreceptores, e recuperou parte dela em 3 meses (Liu e colegas, JAMA Ophthalmology).',
        'A 12-year-old girl lost vision in both eyes after 5 months of use, with damage to the photoreceptors, and recovered part of it within 3 months (Liu and colleagues, JAMA Ophthalmology).')],
      [L('2024 · China', '2024 · China'), L('A China passou os aparelhos à classe de risco mais alta, liberou o uso só para crianças de 8 anos ou mais e proibiu o uso preventivo.',
        'China moved the devices to its highest risk class, allowed them only for children aged 8 or older and banned preventive use.')],
      [L('EUA', 'United States'), L('A luz vermelha para miopia não é aprovada no país, segundo a Academia Americana de Oftalmologia.',
        'Red light for myopia is not approved in the country, according to the American Academy of Ophthalmology.')]
    ];
    cards.innerHTML = C3.map(function (c) { return '<div class="l11-card"><b>' + c[0] + '</b><p>' + c[1] + '</p></div>'; }).join('');
    sum.textContent = L('ver os tempos em tabela', 'see the times as a table');
    var RT = [['Eyerising', DN.fmt(1.4, 1) + ' s', L('cerca de 130 vezes', 'about 130 times')],
      ['Sky-n1201a', DN.fmt(2.8, 1) + ' s', L('cerca de 64 vezes', 'about 64 times')],
      ['Future Vision', L('cerca de 253 s', 'about 253 s'), L('a sessão acaba antes do limite', 'the session ends before the limit')],
      [L('AirDoc (LED difuso)', 'AirDoc (diffuse LED)'), DN.fmt(22761) + ' s', L('a sessão acaba antes do limite', 'the session ends before the limit')]];
    tbl.innerHTML = '<table class="t"><thead><tr><th>' + L('aparelho', 'device') + '</th><th>' + L('tempo até o limite', 'time to the limit') + '</th><th>' +
      L('sessão de 180 s dividida por esse tempo', '180 s session divided by that time') + '</th></tr></thead><tbody>' +
      RT.map(function (r) { return '<tr><td>' + r.join('</td><td>') + '</td></tr>'; }).join('') + '</tbody></table>';
    draw();
  }

  var rt, lastW = chart.clientWidth;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { var w = chart.clientWidth; if (w !== lastW) { lastW = w; draw(); } }, 150);
  });
  DN.onLang(texts);
  texts();
  DN.onVisible(chart, function (v) {
    if (v && !played) { played = true; show(DN.RM); }
  }, { once: true, threshold: 0.4 });
})();
