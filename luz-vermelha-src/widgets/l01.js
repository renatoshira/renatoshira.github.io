/* l01 · a-janela : absorption of blood, melanin and water from 400 to 1000 nm,
   the optical window between them and the wavelengths printed on the boxes.
   Sits on the dark band of section 01. Static infographic; the curves draw once. */
(function () {
  'use strict';
  var root = DN.body('l01'); if (!root) return;
  var L = DN.L, fmt = DN.fmt;
  var NS = 'http://www.w3.org/2000/svg';
  var INK = '#f2f2f2', DIM = '#b9b9c8', LINE = '#2c2e48', RUBI = DN.COL.rubiNight, NIGHT = '#0f1020', INFRA = DN.COL.infra;

  /* ---------- data ---------- */
  /* oxygenated haemoglobin, cm-1/M (Prahl, OMLC) */
  var HB = [[550, 43016], [600, 3200], [650, 368], [700, 290], [750, 518], [800, 816], [850, 1058], [900, 1198], [950, 1204]];
  /* water, cm-1 (Hale and Querry 1973) */
  var WA = [[550, 0.00045], [600, 0.0023], [650, 0.0032], [700, 0.006], [750, 0.026], [800, 0.020], [850, 0.043], [900, 0.068], [950, 0.39], [980, 0.43]];
  /* melanin: shape only, lambda^-3.5 [S] */
  var ME = []; for (var l = 400; l <= 1000; l += 10) ME.push([l, Math.pow(l / 400, -3.5)]);
  function norm(arr) {
    var mx = 0; arr.forEach(function (p) { mx = Math.max(mx, p[1]); });
    return arr.map(function (p) { return [p[0], Math.log(p[1] / mx) / Math.LN10]; });
  }
  var CURVES = [
    { k: 'hb', pts: norm(HB), col: INK, w: 2.2, dash: null },
    { k: 'wa', pts: norm(WA), col: DIM, w: 2.2, dash: null },
    { k: 'me', pts: norm(ME), col: DIM, w: 1.6, dash: '5 4' }
  ];
  var BOXES = [415, 630, 660, 810, 830, 850];
  var KARU = [[614, 624], [668, 684], [751, 772], [813, 846]];
  var VMIN = -3.25;
  var SPEC = [[400, '#6a00b0'], [430, '#3b2cff'], [465, '#0070ff'], [490, '#00b8e0'], [510, '#00d870'], [540, '#56e800'],
    [570, '#d8f000'], [585, '#ffd800'], [605, '#ff9000'], [630, '#ff4a00'], [660, '#e8001c'], [700, '#6a0010']];

  /* monotone cubic (Fritsch-Carlson) in log space, sampled every 2 nm */
  function sample(pts) {
    var n = pts.length, d = [], m = [], i, out = [];
    for (i = 0; i < n - 1; i++) d[i] = (pts[i + 1][1] - pts[i][1]) / (pts[i + 1][0] - pts[i][0]);
    m[0] = d[0]; m[n - 1] = d[n - 2];
    for (i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
    for (i = 0; i < n - 1; i++) {
      if (d[i] === 0) { m[i] = m[i + 1] = 0; continue; }
      var a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b;
      if (s > 9) { var t = 3 / Math.sqrt(s); m[i] = t * a * d[i]; m[i + 1] = t * b * d[i]; }
    }
    for (i = 0; i < n - 1; i++) {
      var x0 = pts[i][0], x1 = pts[i + 1][0], h = x1 - x0;
      for (var x = x0; x < x1 || (i === n - 2 && x <= x1); x += 2) {
        var t2 = (x - x0) / h, t3, h00, h10, h01, h11;
        t3 = t2 * t2 * t2;
        h00 = 2 * t3 - 3 * t2 * t2 + 1; h10 = t3 - 2 * t2 * t2 + t2; h01 = -2 * t3 + 3 * t2 * t2; h11 = t3 - t2 * t2;
        out.push([x, h00 * pts[i][1] + h10 * h * m[i] + h01 * pts[i + 1][1] + h11 * h * m[i + 1]]);
        if (x + 2 > x1 && i === n - 2) break;
      }
    }
    return out;
  }
  function valAt(c, lam) {
    var p = c.pts; for (var i = 0; i < p.length - 1; i++) if (lam >= p[i][0] && lam <= p[i + 1][0]) {
      var t = (lam - p[i][0]) / (p[i + 1][0] - p[i][0]); return p[i][1] + t * (p[i + 1][1] - p[i][1]);
    }
    return p[p.length - 1][1];
  }
  CURVES.forEach(function (c) { c.s = sample(c.pts); });

  /* ---------- risograph prism (light inks on the night paper) ---------- */
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
  function prism() {
    var R = rng(615), p = 'l01r-';
    var inks = [{ k: 'a', col: RUBI, ang: 15, op: 0.95 }, { k: 'b', col: '#e9e6f2', ang: 75, op: 0.9 }];
    var art = {
      /* rubi: the fanned beam leaving the prism, reddest at the bottom */
      a: '<path d="M60,30 L104,22 L104,30Z" fill="$1"/>' +
        '<path d="M60,31 L104,31 L104,40Z" fill="$2"/>' +
        '<path d="M60,32 L104,41 L104,48Z" fill="$0"/>',
      /* light ink: the white beam coming in, the glass, the outline */
      b: '<path d="M2,36 L41,31" stroke="$0" stroke-width="3.2" stroke-linecap="round"/>' +
        '<path d="M44,8 L66,46 L22,46Z" fill="$1"/>' +
        '<path d="M44,8 L66,46 L22,46Z" fill="none" stroke="$0" stroke-width="1.8" stroke-linejoin="round"/>' +
        '<path d="M60,30 L104,22" stroke="$0" stroke-width=".8" opacity=".6"/>' +
        '<path d="M60,33 L104,50 L104,56Z" fill="$3" opacity=".55"/>'
    };
    var defs = '', layers = '';
    inks.forEach(function (ink, li) {
      var q = p + ink.k;
      [0.5, 0.82, 1.12].forEach(function (r, j) {
        defs += '<pattern id="' + q + 'h' + (j + 1) + '" width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.2" cy="1.2" r="' + r + '" fill="' + ink.col + '"/></pattern>';
      });
      defs += '<filter id="' + q + 'g" x="-6%" y="-10%" width="112%" height="120%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.3" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3 0 0 0 2.5" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
      var mx = f1((R() < 0.5 ? -1 : 1) * (0.5 + R() * (li ? 1.0 : 0.5)));
      var my = f1((R() < 0.5 ? -1 : 1) * (0.4 + R() * (li ? 0.8 : 0.4)));
      var body = art[ink.k].replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#' + q + 'h$1)');
      for (var s = 0; s < 4; s++) body += '<circle cx="' + f1(4 + R() * 100) + '" cy="' + f1(4 + R() * 50) + '" r="' + f1(0.3 + R() * 0.4) + '" fill="' + ink.col + '"/>';
      layers += '<g class="l01-ink l01-ink-' + ink.k + '" transform="translate(' + mx + ' ' + my + ')" opacity="' + ink.op + '" filter="url(#' + q + 'g)">' + body + '</g>';
    });
    return '<svg viewBox="0 0 108 58" aria-hidden="true" focusable="false"><defs>' + defs + '</defs>' + layers + '</svg>';
  }

  /* ---------- skeleton ---------- */
  root.innerHTML = '';
  var head = DN.el('div', { class: 'l01-head' }, root);
  DN.el('div', { class: 'l01-prism' }, head, prism());
  var read = DN.el('p', { class: 'l01-read' }, head);
  var fig = DN.el('div', { class: 'l01-fig' }, root);
  var notes = DN.el('ol', { class: 'l01-notes' }, root);
  var unit = DN.el('p', { class: 'l01-unit' }, root);
  var table = DN.el('table', { class: 'sr' }, root);

  var shown = DN.RM, drawn = DN.RM, raf = 0;

  function T(parent, x, y, txt, cls, anchor) {
    var t = DN.svg('text', { x: f1(x), y: f1(y), class: cls || '', 'text-anchor': anchor || 'start' }, parent);
    t.textContent = txt; return t;
  }
  function lines(parent, x, y, arr, cls, anchor, lh) {
    arr.forEach(function (s, i) { T(parent, x, y + i * (lh || 13), s, cls, anchor); });
  }

  function render() {
    var W = Math.max(280, root.clientWidth || 600);
    var horiz = W >= 600;
    root.classList.toggle('l01-v', !horiz);
    read.textContent = L('O sangue absorve o azul e o verde, e a água absorve o infravermelho mais longo. Sobra uma faixa do vermelho ao infravermelho próximo em que a luz entra mais fundo, e os aparelhos foram feitos para emitir dentro dela.',
      'Blood absorbs blue and green, and water absorbs the longer infrared. What is left is a band from red to near infrared in which light goes deeper, and the devices were built to emit inside it.');
    unit.textContent = L('Cada curva está na própria unidade e foi encaixada no próprio eixo, com o máximo no topo. Compare a forma de cada curva, porque a altura de uma não se compara com a de outra.',
      'Each curve keeps its own unit and is fitted to its own axis, with its maximum at the top. Compare the shape of each curve, because the height of one does not compare with the height of another.');

    var pl, pr, pt, pb, H, P, xl, yl;
    if (horiz) {
      H = Math.round(Math.max(380, Math.min(480, W * 0.44)));
      pl = 70; pr = W - 196; pt = 58; pb = H - 92;
      xl = function (lam) { return pl + (lam - 400) / 600 * (pr - pl); };
      yl = function (v) { return pt + (v / VMIN) * (pb - pt); };
      P = function (lam, v) { return [xl(lam), yl(v)]; };
    } else {
      pl = 64; pr = W - 58; pt = 58; pb = pt + Math.round(Math.max(520, Math.min(620, W * 1.7)));
      H = pb + 22;
      xl = function (v) { return pr - (v / VMIN) * (pr - pl); };
      yl = function (lam) { return pt + (lam - 400) / 600 * (pb - pt); };
      P = function (lam, v) { return [xl(v), yl(lam)]; };
    }
    fig.innerHTML = '';
    var svg = DN.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H, role: 'img', class: 'l01-svg' }, fig);
    svg.setAttribute('aria-label', L('Gráfico de absorção de 400 a 1.000 nm. A curva do sangue cai 117 vezes de 550 para 650 nm; a da água sobe cerca de 20 vezes de 800 para 980 nm; a da melanina cai devagar. Entre 650 e 950 nm fica a janela óptica, onde estão os comprimentos de onda dos aparelhos: 630, 660, 810, 830 e 850 nm. O azul de 415 nm das máscaras de acne fica fora dela. Picos de resposta em células: 614 a 624, 668 a 684, 751 a 772 e 813 a 846 nm.',
      'Absorption chart from 400 to 1,000 nm. The blood curve falls 117 times from 550 to 650 nm; the water curve rises about 20 times from 800 to 980 nm; the melanin curve falls slowly. Between 650 and 950 nm lies the optical window, where the device wavelengths sit: 630, 660, 810, 830 and 850 nm. The 415 nm blue of acne masks sits outside it. Peaks of response in cells: 614 to 624, 668 to 684, 751 to 772 and 813 to 846 nm.'));
    var defs = DN.svg('defs', null, svg);
    /* visible spectrum gradient along the wavelength axis */
    var gr = DN.svg('linearGradient', { id: 'l01-spec', gradientUnits: 'userSpaceOnUse',
      x1: horiz ? xl(400) : 0, x2: horiz ? xl(700) : 0, y1: horiz ? 0 : yl(400), y2: horiz ? 0 : yl(700) }, defs);
    SPEC.forEach(function (s) { DN.svg('stop', { offset: ((s[0] - 400) / 300).toFixed(3), 'stop-color': s[1] }, gr); });
    var hp = DN.svg('pattern', { id: 'l01-hatch', width: 5, height: 5, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    DN.svg('rect', { width: 5, height: 5, fill: INFRA }, hp);
    DN.svg('line', { x1: 0, y1: 0, x2: 0, y2: 5, stroke: RUBI, 'stroke-width': 1.2, 'stroke-opacity': 0.45 }, hp);
    var clips = CURVES.map(function (c) {
      var cp = DN.svg('clipPath', { id: 'l01-cl-' + c.k }, defs);
      return DN.svg('rect', horiz ? { x: pl - 4, y: 0, width: drawn ? W : 0, height: H } : { x: 0, y: pt - 4, width: W, height: drawn ? H : 0 }, cp);
    });

    var gWin = DN.svg('g', { class: 'l01-late' + (shown ? ' l01-on' : '') }, svg);
    var gGrid = DN.svg('g', null, svg);
    var gCur = DN.svg('g', null, svg);
    var gTxt = DN.svg('g', null, svg);
    var gLate = DN.svg('g', { class: 'l01-late' + (shown ? ' l01-on' : '') }, svg);

    /* window band */
    var a = P(650, 0), b = P(950, VMIN);
    DN.svg('rect', { x: Math.min(a[0], b[0]), y: Math.min(a[1], b[1]), width: Math.abs(b[0] - a[0]), height: Math.abs(b[1] - a[1]), class: 'l01-win' }, gWin);
    if (horiz) {
      T(gWin, xl(800), pt + 16, L('janela óptica', 'optical window'), 'l01-wint', 'middle');
      T(gWin, xl(800), pt + 30, L('650 a 950 nm', '650 to 950 nm'), 'l01-winn', 'middle');
    } else {
      T(gWin, pl + 6, yl(872), L('janela', 'optical'), 'l01-wint', 'start');
      T(gWin, pl + 6, yl(872) + 14, L('óptica', 'window'), 'l01-wint', 'start');
      T(gWin, pl + 6, yl(872) + 28, L('650 a 950', '650 to 950'), 'l01-winn', 'start');
    }

    /* absorption grid: one line per factor of ten */
    var tickLab = [L('máx', 'max'), '1/10', '1/100', '1/' + fmt(1000)];
    for (var d = 0; d >= -3; d--) {
      var g0 = P(400, d), g1 = P(1000, d);
      DN.svg('line', { x1: g0[0], y1: g0[1], x2: g1[0], y2: g1[1], class: 'l01-grid' }, gGrid);
      if (horiz) T(gTxt, pl - 8, g0[1] + 3.5, tickLab[-d], 'l01-tick', 'end');
      else T(gTxt, g0[0], pt - 8, tickLab[-d], 'l01-tick', d === 0 ? 'end' : (d === -3 ? 'start' : 'middle'));
    }
    if (horiz) {
      var yt = DN.svg('text', { class: 'l01-axt', transform: 'translate(14 ' + f1((pt + pb) / 2) + ') rotate(-90)', 'text-anchor': 'middle' }, gTxt);
      yt.textContent = L('quanto absorve (escala de 10 em 10)', 'how much it absorbs (steps of 10)');
    } else {
      T(gTxt, pr, pt - 24, L('quanto absorve, de 10 em 10 →', 'how much it absorbs, steps of 10 →'), 'l01-axt', 'end');
    }

    /* wavelength ticks and the spectrum ruler */
    var strip0, strip1;
    if (horiz) { strip0 = pb + 22; strip1 = pb + 38; }
    else { strip0 = 6; strip1 = 22; }
    [400, 500, 600, 700, 800, 900, 1000].forEach(function (lam) {
      if (horiz) {
        DN.svg('line', { x1: xl(lam), y1: pb, x2: xl(lam), y2: pb + 4, class: 'l01-axl' }, gGrid);
        T(gTxt, xl(lam), pb + 16, fmt(lam), 'l01-tick', 'middle');
      } else {
        DN.svg('line', { x1: pl - 4, y1: yl(lam), x2: pl, y2: yl(lam), class: 'l01-axl' }, gGrid);
        T(gTxt, pl - 7, yl(lam) + 3.5, fmt(lam), 'l01-tick', 'end');
      }
    });
    if (horiz) {
      DN.svg('line', { x1: pl, y1: pb, x2: pr, y2: pb, class: 'l01-axl' }, gGrid);
      DN.svg('rect', { x: xl(400), y: strip0, width: xl(700) - xl(400), height: strip1 - strip0, fill: 'url(#l01-spec)' }, gGrid);
      DN.svg('rect', { x: xl(700), y: strip0, width: xl(1000) - xl(700), height: strip1 - strip0, fill: 'url(#l01-hatch)' }, gGrid);
      T(gTxt, xl(555), strip0 + 11.5, L('visível', 'visible'), 'l01-stv', 'middle');
      T(gTxt, xl(850), strip0 + 11.5, L('infravermelho próximo · invisível', 'near infrared · invisible'), 'l01-sti', 'middle');
      T(gTxt, pr + 26, pb + 16, 'nm', 'l01-tick', 'start');
    } else {
      DN.svg('line', { x1: pl, y1: pt, x2: pl, y2: pb, class: 'l01-axl' }, gGrid);
      DN.svg('rect', { x: strip0, y: yl(400), width: strip1 - strip0, height: yl(700) - yl(400), fill: 'url(#l01-spec)' }, gGrid);
      DN.svg('rect', { x: strip0, y: yl(700), width: strip1 - strip0, height: yl(1000) - yl(700), fill: 'url(#l01-hatch)' }, gGrid);
      var sv = DN.svg('text', { class: 'l01-stv', transform: 'translate(' + (strip0 + 11.5) + ' ' + f1(yl(555)) + ') rotate(-90)', 'text-anchor': 'middle' }, gTxt);
      sv.textContent = L('visível', 'visible');
      var si = DN.svg('text', { class: 'l01-sti', transform: 'translate(' + (strip0 + 11.5) + ' ' + f1(yl(850)) + ') rotate(-90)', 'text-anchor': 'middle' }, gTxt);
      si.textContent = L('infravermelho · invisível', 'near infrared · invisible');
      T(gTxt, pl - 7, pt - 8, 'nm', 'l01-tick', 'end');
    }

    /* the curves */
    CURVES.forEach(function (c, i) {
      var dd = c.s.map(function (q, j) { var p = P(q[0], q[1]); return (j ? 'L' : 'M') + f1(p[0]) + ',' + f1(p[1]); }).join('');
      DN.svg('path', { d: dd, fill: 'none', stroke: c.col, 'stroke-width': c.w, 'stroke-dasharray': c.dash, 'stroke-linejoin': 'round', 'stroke-linecap': 'round', 'clip-path': 'url(#l01-cl-' + c.k + ')' }, gCur);
    });

    /* direct labels */
    var LAB = {
      hb: [L('sangue', 'blood'), L('hemoglobina oxigenada', 'oxygenated haemoglobin')],
      wa: [L('água', 'water'), null],
      me: [L('melanina', 'melanin'), L('forma aproximada', 'approximate shape')]
    };
    var gLab = DN.svg('g', { class: 'l01-labs' }, gTxt);
    if (horiz) {
      var ends = [
        { k: 'wa', lam: 980, v: 0 }, { k: 'me', lam: 1000, v: valAt(CURVES[2], 1000) }, { k: 'hb', lam: 950, v: valAt(CURVES[0], 950) }
      ];
      ends.forEach(function (e) { e.y = yl(e.v); e.h = LAB[e.k][1] ? 26 : 13; });
      ends.sort(function (p, q) { return p.y - q.y; });
      /* push apart: the water label owns the top, the callout sits under it */
      var yy = -1e9;
      ends.forEach(function (e) { e.ly = Math.max(e.y - (e.h > 13 ? 8 : 0), yy); yy = e.ly + e.h + 8; });
      ends.forEach(function (e) {
        var lx = pr + 18;
        var ex = xl(e.lam);
        DN.svg('path', { d: 'M' + f1(ex + 3) + ',' + f1(e.y) + ' L' + f1(lx - 4) + ',' + f1(e.ly + 4 - (e.h > 13 ? 4 : 0)), class: 'l01-lead' }, gLab);
        T(gLab, lx, e.ly + 8 - (e.h > 13 ? 4 : 0) + 0, LAB[e.k][0], 'l01-lab', 'start');
        if (LAB[e.k][1]) T(gLab, lx, e.ly + 8 + 9, LAB[e.k][1], 'l01-lab2', 'start');
      });
      /* water callout under the water label */
      var wl = ends.filter(function (e) { return e.k === 'wa'; })[0];
      var hb = ends.filter(function (e) { return e.k === 'hb'; })[0];
      var me = ends.filter(function (e) { return e.k === 'me'; })[0];
      var cY = wl.ly + 30;
      var cLines = L('800 → 980 nm:|a água absorve|cerca de 20 vezes mais', '800 → 980 nm:|water absorbs|about 20 times more').split('|');
      /* if the callout would hit the next label, move the lower labels down */
      var cEnd = cY + cLines.length * 13;
      if (cEnd + 10 > Math.min(hb.ly, me.ly)) {
        /* place it in the empty lower right corner of the plot instead */
        cY = pb - 12 - (cLines.length - 1) * 13;
        lines(gLate, xl(990), cY, cLines, 'l01-call', 'end');
      } else lines(gLate, pr + 18, cY, cLines, 'l01-call', 'start');
      var w8 = P(800, valAt(CURVES[1], 800)), w98 = P(980, 0);
      DN.svg('circle', { cx: w8[0], cy: w8[1], r: 3.2, class: 'l01-pt' }, gLate);
      DN.svg('circle', { cx: w98[0], cy: w98[1], r: 3.2, class: 'l01-pt' }, gLate);
      /* blood callout in the empty lower left of the plot */
      var b55 = P(550, 0), b65 = P(650, valAt(CURVES[0], 650));
      DN.svg('circle', { cx: b55[0], cy: b55[1], r: 3.2, class: 'l01-pt' }, gLate);
      DN.svg('circle', { cx: b65[0], cy: b65[1], r: 3.2, class: 'l01-pt' }, gLate);
      var bl = L('550 → 650 nm:|o sangue absorve|117 vezes menos', '550 → 650 nm:|blood absorbs|117 times less').split('|');
      var bx = xl(408), by = yl(-1.95);
      lines(gLate, bx, by, bl, 'l01-call', 'start');
      DN.svg('path', { d: 'M' + f1(bx + 128) + ',' + f1(by + 30) + ' Q' + f1(b65[0] - 30) + ',' + f1(b65[1] + 10) + ' ' + f1(b65[0] - 5) + ',' + f1(b65[1] + 2), class: 'l01-lead' }, gLate);
    } else {
      /* vertical: labels at the start of each curve, where they are far apart */
      var hb0 = P(550, 0), me0 = P(400, 0), wa0 = P(550, valAt(CURVES[1], 550));
      T(gLab, me0[0] - 6, me0[1] + 14, LAB.me[0], 'l01-lab', 'end');
      T(gLab, me0[0] - 6, me0[1] + 25, LAB.me[1], 'l01-lab2', 'end');
      T(gLab, hb0[0] - 6, hb0[1] - 4, LAB.hb[0], 'l01-lab', 'end');
      T(gLab, wa0[0] + 6, wa0[1] + 4, LAB.wa[0], 'l01-lab', 'start');
      var w8v = P(800, valAt(CURVES[1], 800)), w98v = P(980, 0), b55v = P(550, 0), b65v = P(650, valAt(CURVES[0], 650));
      [[b65v, 1], [w98v, 2]].forEach(function (m) {
        DN.svg('circle', { cx: m[0][0], cy: m[0][1], r: 7.5, class: 'l01-num' }, gLate);
        T(gLate, m[0][0], m[0][1] + 3.6, String(m[1]), 'l01-numt', 'middle');
      });
      [b55v, w8v].forEach(function (q) { DN.svg('circle', { cx: q[0], cy: q[1], r: 3.2, class: 'l01-pt' }, gLate); });
    }

    /* Karu peaks */
    KARU.forEach(function (k) {
      if (horiz) DN.svg('rect', { x: xl(k[0]), y: pt - 16, width: Math.max(2, xl(k[1]) - xl(k[0])), height: 6, class: 'l01-karu' }, gLate);
      else DN.svg('rect', { x: pr + 5, y: yl(k[0]), width: 5, height: Math.max(2, yl(k[1]) - yl(k[0])), class: 'l01-karu' }, gLate);
    });
    if (horiz) T(gLate, xl(612), pt - 24, L('onde células responderam mais', 'where cells responded most'), 'l01-karut', 'start');

    /* box wavelengths */
    BOXES.forEach(function (lam) {
      var out = lam < 650;
      var cls = lam === 415 ? ' l01-boxg' : '';
      if (horiz) {
        var x = xl(lam);
        DN.svg('path', { d: 'M' + f1(x) + ',' + (strip1 + 2) + ' l-3.5,6 h7Z', class: 'l01-boxm' + cls }, gLate);
        T(gLate, x, strip1 + 20, String(lam), 'l01-box' + cls, 'middle');
      } else {
        var y = yl(lam);
        DN.svg('path', { d: 'M' + (pr + 14) + ',' + f1(y) + ' l6,-3.5 v7Z', class: 'l01-boxm' + cls }, gLate);
        T(gLate, pr + 23, y + 3.8, String(lam), 'l01-box' + cls, 'start');
      }
    });
    if (horiz) {
      T(gLate, xl(415) + 14, strip1 + 20, L('azul de acne', 'acne blue'), 'l01-boxn', 'start');
      T(gLate, pr + 14, strip1 + 20, L('← nas caixas dos aparelhos', '← on device boxes'), 'l01-boxn', 'start');
    } else {
      T(gLate, pr + 23, yl(415) + 16, L('acne', 'acne'), 'l01-boxn', 'start');
      T(gLate, pr + 14, pt - 8, L('caixas', 'boxes'), 'l01-boxn', 'start');
    }

    /* mobile: callouts as a numbered list; desktop: Karu note in the list too */
    notes.innerHTML = '';
    if (!horiz) {
      DN.el('li', null, notes, '<b>550 → 650 nm:</b> ' + L('o sangue absorve 117 vezes menos.', 'blood absorbs 117 times less.'));
      DN.el('li', null, notes, '<b>800 → 980 nm:</b> ' + L('a água absorve cerca de 20 vezes mais.', 'water absorbs about 20 times more.'));
      DN.el('li', { class: 'l01-nk' }, notes, '<span class="l01-sw"></span>' + L('As marcas finas à direita da régua são as faixas onde células responderam mais (Karu e Kolyakov, 2005).', 'The thin marks to the right of the plot are the bands where cells responded most (Karu and Kolyakov, 2005).'));
    }
    notes.hidden = horiz;

    /* screen reader table */
    var rows = [550, 600, 650, 700, 750, 800, 850, 900, 950, 980];
    table.innerHTML = '<caption>' + L('Absorção por comprimento de onda', 'Absorption by wavelength') + '</caption><tr><th>nm</th><th>' +
      L('hemoglobina oxigenada (cm⁻¹/M)', 'oxygenated haemoglobin (cm⁻¹/M)') + '</th><th>' + L('água (cm⁻¹)', 'water (cm⁻¹)') + '</th></tr>' +
      rows.map(function (lam) {
        var h = HB.filter(function (p) { return p[0] === lam; })[0], w = WA.filter(function (p) { return p[0] === lam; })[0];
        return '<tr><td>' + lam + '</td><td>' + (h ? fmt(h[1]) : L('sem dado', 'no data')) + '</td><td>' + (w ? fmt(w[1]) : '') + '</td></tr>';
      }).join('');

    /* animation state */
    if (drawn) clips.forEach(function (r) { if (horiz) r.setAttribute('width', W); else r.setAttribute('height', H); });
    render.clips = clips; render.horiz = horiz; render.W = W; render.H = H; render.pl = pl; render.pr = pr; render.pt = pt; render.pb = pb;
    render.late = [gWin, gLate];
  }

  function play() {
    if (drawn) return;
    drawn = true;
    var t0 = performance.now(), D = 900;
    function step(now) {
      var c = render.clips, horiz = render.horiz;
      var all = true;
      c.forEach(function (r, i) {
        var t = Math.max(0, Math.min(1, (now - t0 - i * D) / D));
        if (t < 1) all = false;
        var e = 1 - Math.pow(1 - t, 3);
        if (horiz) r.setAttribute('width', f1((render.pr - render.pl + 12) * e));
        else r.setAttribute('height', f1((render.pb - render.pt + 12) * e));
      });
      if (!all) raf = requestAnimationFrame(step);
      else {
        c.forEach(function (r) { if (horiz) r.setAttribute('width', render.W); else r.setAttribute('height', render.H); });
        shown = true; render.late.forEach(function (g) { g.classList.add('l01-on'); });
      }
    }
    raf = requestAnimationFrame(step);
  }

  render();
  if (!DN.RM) DN.onVisible(fig, function (v) { if (v) play(); }, { threshold: 0.3, once: true });
  var lastW = root.clientWidth, rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { if (root.clientWidth !== lastW) { lastW = root.clientWidth; cancelAnimationFrame(raf); if (!shown) { drawn = true; shown = true; } render(); } }, 150);
  });
  DN.onLang(render);
})();
