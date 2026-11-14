/* l00 · as-buscas : Google Trends world and Brazil, monthly Jan 2018 to Nov 2026, plus FDA 510(k) OHS clearances per year */
(function () {
  'use strict';
  var root = DN.body('l00'); if (!root) return;
  var L = DN.L, C = DN.COL;

  /* ---------- data ----------
     world: luz-vermelha-pesquisa/dados/trends-world_misc.csv (one joint query, so "cold plunge" is on the
            same scale; "red light therapy" is identical in trends-world_en.csv)
     brazil: trends-br_en.csv (one joint query: laserterapia, LED facial and red light therapy share a scale)
     Nov 2026 partial in every series. */
  var WR = [3,3,3,3,3,3,3,2,2,3,3,3,4,4,4,4,4,3,4,3,3,4,4,4,6,5,4,3,3,4,4,4,4,4,4,4,5,5,6,6,6,5,5,5,5,5,6,7,8,7,8,10,7,7,7,8,7,8,10,10,14,13,13,12,12,11,12,12,12,13,19,22,27,27,26,24,23,21,20,20,21,23,31,39,44,42,39,35,35,34,34,48,44,49,66,82,80,66,74,100,90,71,51,47,56,41,44];
  var WC = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,1,1,1,2,2,2,2,3,3,3,6,8,7,8,9,8,9,10,10,9,9,13,16,19,14,11,10,11,12,12,13,11,11,12,14,17,13,15,13,13,15,15,20,17,16,16,17,17,16,17,22,24,22,17,16,16,10,10];
  var BL = [23,30,32,37,36,36,33,38,38,36,36,30,31,36,40,43,50,43,42,47,52,50,48,36,38,50,39,30,37,44,47,51,50,44,48,43,43,51,53,55,53,57,50,55,59,56,62,47,53,60,69,66,68,63,59,61,60,61,64,57,58,64,84,78,82,83,65,71,71,71,74,60,69,69,74,80,85,83,78,78,84,82,86,72,78,79,93,88,100,88,86,90,91,99,86,74,67,82,100,95,94,79,89,82,90,68,74];
  var BF = [3,5,6,4,4,4,5,3,5,3,6,4,3,4,7,5,7,8,9,6,9,9,6,5,6,6,6,5,8,8,6,7,7,6,7,6,6,6,6,6,9,9,10,7,6,4,6,4,6,8,7,6,7,5,6,7,6,5,6,5,5,6,6,7,8,9,8,8,7,8,10,10,11,11,14,10,12,16,18,13,14,21,20,13,13,18,20,22,20,21,25,23,23,24,30,31,31,31,36,43,46,47,50,38,41,31,36];
  var BE = [0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,0,0,3,2,3,2,0,1,0,0,2,1,0,3,0,2,0,0,0,2,3,3,3,3,3,4,3,4,4,3,4,6,3,7,6,4,5,3,5,7,14,9,11,18,22,22,10,4,4,4,47,63,45,38,46,36,37,56,21,13,23,7,5];
  /* fda-510k-OHS-por-ano.csv: 2008..2017 sum 33 (no clearance in 2009), total 166 */
  var FDA = { 2018: 7, 2019: 4, 2020: 2, 2021: 7, 2022: 16, 2023: 12, 2024: 16, 2025: 42, 2026: 27 };
  var FDA_PRE = 33, FDA_TOT = 166;

  var N = 107, LAST = N - 1;
  var YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
  function mi(y, m) { return (y - 2018) * 12 + m - 1; }
  function mean(arr, y) {
    var s = 0, n = 0;
    for (var i = 0; i < N; i++) if (2018 + Math.floor(i / 12) === y) { s += arr[i]; n++; }
    return s / n;
  }

  /* ---------- panels ---------- */
  var PANELS = [
    {
      k: 'w', H: [330, 250], max: 100,
      title: function () { return L('Mundo', 'Worldwide'); },
      sub: function () { return L('buscas no Google, 100 = o mês com mais buscas por “red light therapy”', 'Google searches, 100 = the month with the most searches for “red light therapy”'); },
      series: [
        { d: WC, col: C.mid, w: 1.3, cls: 'thin',
          lab: function (n) { return n ? ['cold', 'plunge'] : ['cold plunge']; },
          sub: function (n) { return n ? [L('pico 24', 'peak 24')] : [L('pico de 24, mai/2026', 'peak of 24, May 2026')]; } },
        { d: WR, col: C.rubi, txt: C.rubiTxt, w: 2.6, main: true,
          lab: function (n) { return n ? ['red light', 'therapy'] : ['red light therapy']; } }
      ],
      means: WR,
      notes: [
        { at: mi(2023, 12), d: WR,
          t: function () { return [L('dez/2023', 'Dec 2023'), L('Kardashian dá', 'Kardashian gives'), L('máscaras de Natal', 'masks for Christmas')]; },
          w: { i: 69.5, v: 62, a: 'end' } },
        { at: mi(2025, 12), d: WR,
          t: function () { return [L('dez/2025 = 82', 'Dec 2025 = 82'), L('pico das buscas', 'peak of searches'), L('por máscara', 'for masks')]; },
          w: { i: 93.2, v: 95, a: 'end' } },
        { at: mi(2026, 4), d: WR, peak: true,
          t: function () { return [L('abr/2026 = 100', 'Apr 2026 = 100'), L('gorro, cinto,', 'caps, belts,'), L('colchonete e cama', 'mats and beds')]; },
          w: { i: 100.7, v: 101.5, a: 'start' } },
        { at: mi(2026, 10), d: WR,
          t: function () { return [L('out/2026 = 41', 'Oct 2026 = 41')]; },
          w: { i: 104.3, v: 30, a: 'middle' } }
      ]
    },
    {
      k: 'b', H: [240, 220], max: 100,
      title: function () { return L('Brasil', 'Brazil'); },
      sub: function () { return L('buscas no Google no Brasil, 100 = o mês com mais buscas por “laserterapia”', 'Google searches in Brazil, 100 = the month with the most searches for “laserterapia”'); },
      series: [
        { d: BE, col: C.mid, w: 1.2, cls: 'thin',
          lab: function (n) { return n ? ['red light', 'therapy'] : ['red light therapy']; },
          sub: function (n) { return [L('em inglês', 'in English')]; } },
        { d: BF, col: C.rubi, txt: C.rubiTxt, w: 2.4,
          lab: function () { return ['LED facial']; } },
        { d: BL, col: C.ink, w: 2, main: true,
          lab: function (n) { return n ? ['laser-', 'terapia'] : ['laserterapia']; },
          sub: function (n) { return n ? [] : [L('(terapia a laser)', '(laser therapy)')]; } }
      ],
      means: null,
      boxNote: function () { return L('“terapia de luz vermelha”: perto de zero em todos os meses', '“terapia de luz vermelha” (Portuguese for red light therapy): near zero every month'); },
      notes: [
        { at: mi(2026, 7), d: BF,
          t: function () { return [L('jul/2026 = 50', 'Jul 2026 = 50'), L('LED facial no máximo', 'LED facial at its peak')]; },
          w: { i: 'end', v: 55, a: 'start' } }
      ]
    },
    { k: 'f', H: [200, 200], bars: true, max: 45,
      title: function () { return 'FDA'; },
      sub: function () { return L('aparelhos de luz para rugas liberados por ano, via 510(k), código OHS, venda livre', 'light devices for wrinkles cleared per year, via 510(k), product code OHS, over the counter'); }
    }
  ];

  /* ---------- risograph phone stamp (rubi + ameixa) ---------- */
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
  function stamp() {
    var R = rng(2611);
    var INKS = [{ k: 'a', col: C.rubi, ang: 15, op: 0.95 }, { k: 'b', col: C.infra, ang: 75, op: 0.92 }];
    var art = {
      /* rubi: the search bar and a rising line on screen */
      a: '<rect x="20" y="22" width="40" height="9" rx="4.5" fill="$1"/>' +
        '<path d="M22,84 L28,82 L33,83 L38,78 L43,72 L47,64 L51,52 L54,62 L58,68" stroke="$0" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>' +
        '<circle cx="51" cy="52" r="3.4" fill="$0"/>',
      /* ameixa: phone body, screen halftone, magnifier, home bar */
      b: '<rect x="12" y="6" width="56" height="104" rx="9" fill="$0"/>' +
        '<rect x="16" y="15" width="48" height="83" rx="3" fill="#fff" class="l00-pp"/>' +
        '<rect x="16" y="15" width="48" height="83" rx="3" fill="$1"/>' +
        '<circle cx="25" cy="26.5" r="2.4" fill="none" stroke="$0" stroke-width="1.4"/>' +
        '<path d="M26.8,28.3 l2,2" stroke="$0" stroke-width="1.4" stroke-linecap="round"/>' +
        '<rect x="32" y="102" width="16" height="2.6" rx="1.3" fill="#fff" class="l00-pp"/>' +
        '<path d="M20,90 h40" stroke="$0" stroke-width="1" fill="none"/>'
    };
    var defs = '', layers = '';
    INKS.forEach(function (ink, li) {
      var p = 'l00r-' + ink.k;
      [0.55, 0.85, 1.15].forEach(function (r, j) {
        defs += '<pattern id="' + p + 'h' + (j + 1) + '" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.3" cy="1.3" r="' + r + '" fill="' + ink.col + '"/></pattern>';
      });
      defs += '<filter id="' + p + 'g" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.5" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.6" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
      var mx = f1((R() < 0.5 ? -1 : 1) * (0.5 + R() * (li ? 1.3 : 0.6)));
      var my = f1((R() < 0.5 ? -1 : 1) * (0.4 + R() * (li ? 1.1 : 0.5)));
      var body = art[ink.k].replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#' + p + 'h$1)');
      for (var s = 0; s < 4; s++) body += '<circle cx="' + f1(6 + R() * 68) + '" cy="' + f1(6 + R() * 104) + '" r="' + f1(0.3 + R() * 0.5) + '" fill="' + ink.col + '"/>';
      layers += '<g class="l00-ink l00-ink-' + ink.k + '" transform="translate(' + mx + ' ' + my + ')" opacity="' + ink.op + '" filter="url(#' + p + 'g)">' + body + '</g>';
    });
    return '<svg viewBox="0 0 80 116" focusable="false" aria-hidden="true"><defs>' + defs + '</defs>' + layers + '</svg>';
  }

  /* ---------- skeleton ---------- */
  root.innerHTML = '';
  var head = DN.el('div', { class: 'l00-head' }, root);
  var take = DN.el('p', { class: 'l00-read' }, head);
  DN.el('div', { class: 'l00-stamp', 'aria-hidden': 'true' }, head, stamp());
  var charts = DN.el('div', { class: 'l00-charts' }, root);
  var more = DN.el('details', { class: 'more l00-more' }, root);
  var sum = DN.el('summary', null, more);
  var tables = DN.el('div', { class: 'l00-tables' }, more);

  var built = [];

  function txt(parent, x, y, s, cls, anchor) {
    var t = DN.svg('text', { x: x, y: y, class: cls, 'text-anchor': anchor || 'start' }, parent);
    t.textContent = s; return t;
  }
  function lines(parent, x, y, arr, cls, anchor, LH, firstCls) {
    var t = DN.svg('text', { x: x, y: y, class: cls, 'text-anchor': anchor || 'start' }, parent);
    arr.forEach(function (ln, j) {
      var ts = DN.svg('tspan', { x: x, dy: j ? LH : 0 }, t);
      ts.textContent = ln;
      if (!j && firstCls) ts.setAttribute('class', firstCls);
    });
    return t;
  }

  function leader(g, t, px, py, r0) {
    var bb = null; try { bb = t.getBBox(); } catch (e) {}
    if (!bb || !bb.width) return;
    var ex = DN.clamp(px, bb.x + 2, bb.x + bb.width - 2), ey;
    if (py > bb.y + bb.height) ey = bb.y + bb.height + 2;
    else if (py < bb.y) ey = bb.y - 2;
    else { ey = py; ex = px < bb.x ? bb.x - 3 : bb.x + bb.width + 3; }
    var dx = ex - px, dy = ey - py, d = Math.sqrt(dx * dx + dy * dy);
    if (d < 9) return;
    var ln = DN.svg('line', { x1: px + dx / d * (r0 + 1.5), y1: py + dy / d * (r0 + 1.5), x2: ex, y2: ey, class: 'l00-lead' });
    g.insertBefore(ln, g.firstChild);
  }

  function buildPanel(P, W, narrow, parent, pi) {
    var H = P.H[narrow ? 1 : 0];
    var fig = DN.el('figure', { class: 'l00-panel l00-p' + P.k }, parent);
    var cap = DN.el('figcaption', { class: 'l00-ph' }, fig);
    DN.el('span', { class: 'l00-pt' }, cap, P.title());
    DN.el('span', { class: 'l00-ps' }, cap, P.sub());
    var hasMeans = !!P.means;
    var m = { t: P.bars ? 22 : 26, r: narrow ? 80 : 150, b: hasMeans ? (narrow ? 48 : 46) : 26, l: narrow ? 24 : 30 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    var x = function (i) { return m.l + i / LAST * iw; };
    /* month index -> x of the month's left edge, used for the year bands */
    var xe = function (i) { return m.l + (i - 0.5) / LAST * iw; };
    var y = function (v) { return m.t + ih - v / P.max * ih; };
    var s = DN.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H, role: 'img', class: 'l00-svg' }, fig);
    var defs = DN.svg('defs', null, s);
    var items = [];

    /* grid */
    var g = DN.svg('g', { class: 'l00-grid' }, s);
    var ticks = P.bars ? [0, 20, 40] : [0, 25, 50, 75, 100];
    ticks.forEach(function (v) {
      DN.svg('line', { x1: m.l, x2: m.l + iw, y1: y(v), y2: y(v), class: v === 0 ? 'l00-base' : 'l00-gl' }, g);
      txt(g, m.l - 6, y(v) + 3.5, String(v), 'l00-tick', 'end');
    });
    YEARS.forEach(function (yy) {
      var x0 = Math.max(m.l, xe(mi(yy, 1)));
      var x1 = yy === 2026 ? x(LAST) : xe(mi(yy + 1, 1));
      DN.svg('line', { x1: x0, x2: x0, y1: y(0), y2: y(0) + 4, class: 'l00-base' }, g);
      var cx = (x0 + x1) / 2;
      txt(g, cx, y(0) + 15, narrow ? "'" + String(yy).slice(2) : String(yy), 'l00-tick l00-yr', 'middle');
      if (hasMeans) txt(g, cx, y(0) + (narrow ? 28 + (yy % 2 ? 11 : 0) : 32), DN.fmt(mean(P.means, yy), 1), 'l00-mean', 'middle');
    });
    if (hasMeans) {
      lines(g, x(LAST) + 8, y(0) + (narrow ? 29 : 32), narrow ? [L('média', 'mean')] : [L('média do ano', 'yearly mean')], 'l00-meanl', 'start', 11);
    }

    if (P.bars) return barsPanel(P, s, defs, g, m, iw, ih, x, xe, y, W, H, narrow, fig, items);

    /* lines: a clip rect grows for the draw-in */
    var cp = DN.svg('clipPath', { id: 'l00-cp-' + P.k }, defs);
    var cr = DN.svg('rect', { x: 0, y: 0, height: H, width: W }, cp);
    var gl = DN.svg('g', { 'clip-path': 'url(#l00-cp-' + P.k + ')' }, s);
    function path(arr, i0, i1) {
      var d = '';
      for (var i = i0; i <= i1; i++) d += (i === i0 ? 'M' : 'L') + x(i).toFixed(1) + ',' + y(arr[i]).toFixed(1);
      return d;
    }
    P.series.forEach(function (q) {
      DN.svg('path', { d: path(q.d, 0, LAST - 1), class: 'l00-line', stroke: q.col, 'stroke-width': q.w }, gl);
      DN.svg('path', { d: path(q.d, LAST - 1, LAST), class: 'l00-line l00-part', stroke: q.col, 'stroke-width': q.w }, gl);
    });

    /* end labels, de-collided from the bottom up */
    var ge = DN.svg('g', { class: 'l00-ends' }, gl);
    var LH = narrow ? 11 : 12.5;
    var ends = P.series.map(function (q) {
      var la = q.lab(narrow), sb = q.sub ? q.sub(narrow) : [];
      return { q: q, la: la, sb: sb, v: q.d[LAST], h: (la.length + sb.length) * LH };
    }).sort(function (a, b) { return a.v - b.v; });
    var floor = y(0) - 2;
    ends.forEach(function (e) {
      /* first baseline centred on the line end */
      var by = y(e.v) + 4;
      if (by + e.h - LH > floor) by = floor - e.h + LH;
      e.by = by;
    });
    for (var k = 1; k < ends.length; k++) {
      var below = ends[k - 1], cur = ends[k];
      var maxBy = below.by - cur.h - 2;
      if (cur.by > maxBy) cur.by = maxBy;
    }
    ends.forEach(function (e) {
      var t = lines(ge, x(LAST) + 7, e.by, e.la, 'l00-end' + (e.q.main ? ' l00-endm' : ''), 'start', LH);
      t.setAttribute('fill', e.q.txt || (e.q.col === C.mid ? C.dim : e.q.col));
      if (e.sb.length) lines(ge, x(LAST) + 7, e.by + e.la.length * LH, e.sb, 'l00-ends2', 'start', LH);
    });
    /* "Nov partial", once per panel, under the top label */
    var top = ends[ends.length - 1];
    if (pi === 0) txt(ge, x(LAST) + 7, top.by - LH - 1, L('nov parcial', 'Nov partial'), 'l00-partl');

    /* Brazil: note about the translated term */
    if (P.boxNote) {
      var bn = DN.svg('g', { class: 'l00-note' }, s);
      if (narrow) DN.el('p', { class: 'l00-fn' }, fig, P.boxNote());
      else { txt(bn, m.l + 6, y(90), P.boxNote(), 'l00-bnote'); items.push(bn); }
    }

    /* notes: text on wide screens, numbered dots plus a list on narrow ones */
    var gn = DN.svg('g', null, s);
    var list = null;
    if (narrow && P.notes.length) list = DN.el('ol', { class: 'l00-list' }, fig);
    P.notes.forEach(function (N0, j) {
      var ng = DN.svg('g', { class: 'l00-note' }, gn);
      var px = x(N0.at), py = y(N0.d[N0.at]);
      var r0 = N0.peak ? 4.2 : 3.4;
      var num = noteNum(pi, j);
      if (narrow) {
        var pos = narrowPos(pi, j, px, py);
        DN.svg('line', { x1: px, y1: py, x2: pos[0], y2: pos[1], class: 'l00-lead' }, ng);
        DN.svg('circle', { cx: px, cy: py, r: r0, class: 'l00-ring' }, ng);
        DN.svg('circle', { cx: pos[0], cy: pos[1], r: 7.5, class: 'l00-numc' }, ng);
        txt(ng, pos[0], pos[1] + 3.5, String(num), 'l00-num', 'middle');
        var li = DN.el('li', { class: 'l00-li' }, list);
        var tl = N0.t();
        li.innerHTML = '<span class="l00-lin">' + num + '</span><span><b>' + tl[0] + '</b> ' + tl.slice(1).join(' ') + '</span>';
        items.push({ g: ng, li: li });
        return;
      }
      DN.svg('circle', { cx: px, cy: py, r: r0, class: 'l00-ring' }, ng);
      var pl = N0.w;
      var t = lines(ng, pl.i === 'end' ? x(LAST) + 7 : x(pl.i), y(pl.v), N0.t(), 'l00-nt', pl.a, 13.5, 'l00-nb');
      leader(ng, t, px, py, r0);
      items.push(ng);
    });

    var h = { cr: cr, m: m, W: W, items: items, fig: fig, done: false };
    built.push(h);
    return h;
  }

  /* notes are numbered across the two line panels: 1..4 world, 5 Brazil */
  function noteNum(pi, j) { return pi === 0 ? j + 1 : PANELS[0].notes.length + j + 1; }
  /* narrow layout: the number badge sits up and to the left of its point */
  function narrowPos(pi, j, px, py) {
    var o = pi === 0 ? [[-12, -24], [-18, -10], [-16, 4], [-14, 20]][j] : [[-4, -24]][j];
    return [px + o[0], py + o[1]];
  }
  function wrapWords(s, n) {
    var out = [], cur = '';
    s.split(' ').forEach(function (w) {
      if (cur && (cur + ' ' + w).length > n) { out.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w;
    });
    if (cur) out.push(cur);
    return out;
  }

  function barsPanel(P, s, defs, g, m, iw, ih, x, xe, y, W, H, narrow, fig, items) {
    var hp = DN.svg('pattern', { id: 'l00-hatch', width: 4, height: 4, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    DN.svg('rect', { width: 4, height: 4, fill: 'var(--paper)' }, hp);
    DN.svg('line', { x1: 0, y1: 0, x2: 0, y2: 4, stroke: C.ink, 'stroke-width': 1.3 }, hp);
    var gb = DN.svg('g', null, s);
    var bars = [];
    YEARS.forEach(function (yy) {
      var x0 = Math.max(m.l, xe(mi(yy, 1)));
      var x1 = yy === 2026 ? x(LAST) : xe(mi(yy + 1, 1));
      var full = (xe(mi(2019, 1)) - xe(mi(2018, 1)));
      var bw = Math.min(full * (narrow ? 0.66 : 0.56), 64);
      var cx = (x0 + x1) / 2, v = FDA[yy];
      var bg = DN.svg('g', { class: 'l00-bar' }, gb);
      var r = DN.svg('rect', { x: cx - bw / 2, y: y(v), width: bw, height: y(0) - y(v), class: 'l00-col' + (yy === 2026 ? ' l00-colp' : '') }, bg);
      if (yy === 2026) r.style.fill = 'url(#l00-hatch)';
      var vt = txt(bg, cx, y(v) - 5, String(v), 'l00-bv' + (yy === 2025 ? ' l00-bvb' : ''), 'middle');
      if (yy === 2026 && !narrow) txt(bg, cx, y(v) - 19, L('até nov', 'to Nov'), 'l00-bvs', 'middle');
      bars.push(bg);
      void vt;
    });
    /* earlier years and the total */
    var gt = DN.svg('g', { class: 'l00-note' }, s);
    var pre = L('2008 a 2017: ' + FDA_PRE + ' liberações, de 0 a 8 por ano', '2008 to 2017: ' + FDA_PRE + ' clearances, 0 to 8 a year');
    if (narrow) {
      DN.el('p', { class: 'l00-fn' }, fig, L('São 166 liberações desde 2008, 33 delas de 2008 a 2017, de 0 a 8 por ano. A coluna hachurada de 2026 vai até novembro.',
        'That makes 166 clearances since 2008, 33 of them from 2008 to 2017, 0 to 8 a year. The hatched 2026 column runs to November.'));
    } else {
      txt(gt, m.l + 6, y(45) + 2, pre, 'l00-bnote');
      var tx = x(LAST) + 10;
      txt(gt, tx, y(40) + 10, String(FDA_TOT), 'l00-tot');
      lines(gt, tx, y(40) + 26, [L('liberações', 'clearances'), L('desde 2008', 'since 2008')], 'l00-ends2', 'start', 12.5);
      items.push(gt);
    }
    var h = { cr: null, m: m, W: W, items: items, bars: bars, fig: fig, done: false };
    built.push(h);
    return h;
  }

  function setItem(it, on) {
    var g = it.g || it;
    if (g.classList) g.classList.toggle('in', on);
    if (it.li) it.li.classList.toggle('in', on);
  }
  function finish(h) {
    if (h.cr) h.cr.setAttribute('width', h.W);
    h.items.forEach(function (it) { setItem(it, true); });
    if (h.bars) h.bars.forEach(function (b) { b.classList.add('in'); });
    h.done = true;
  }

  function play(h) {
    if (h.done) return;
    h.done = true;
    if (DN.RM || !window.requestAnimationFrame) { finish(h); return; }
    if (h.bars) {
      h.bars.forEach(function (b, k) { setTimeout(function () { b.classList.add('in'); }, 120 + k * 70); });
      setTimeout(function () { h.items.forEach(function (it) { setItem(it, true); }); }, 120 + h.bars.length * 70 + 300);
      return;
    }
    var t0 = null, dur = 900;
    function ease(t) { return 1 - Math.pow(1 - t, 3); }
    function step(ts) {
      if (t0 == null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      h.cr.setAttribute('width', h.m.l + ease(p) * (h.W - h.m.l));
      if (p < 1) requestAnimationFrame(step);
      else h.items.forEach(function (it, k) { setTimeout(function () { setItem(it, true); }, 80 + k * 220); });
    }
    requestAnimationFrame(step);
  }

  function build() {
    var wasDone = built.map(function (h) { return h.done; });
    built = [];
    charts.innerHTML = '';
    var W = Math.max(280, Math.floor(root.clientWidth || 600));
    var narrow = W < 640;
    root.classList.toggle('l00-narrow', narrow);
    PANELS.forEach(function (P, k) {
      var h = buildPanel(P, W, narrow, charts, k);
      if (DN.RM || wasDone[k]) finish(h);
      else {
        if (h.cr) h.cr.setAttribute('width', h.m.l);
        DN.onVisible(h.fig, function (v) { if (v) play(h); }, { once: true, threshold: 0.35 });
      }
    });
    built.forEach(function (h, k) {
      var P = PANELS[k];
      var sv = h.fig.querySelector('svg');
      sv.setAttribute('aria-label', aria(P));
    });
    labels();
  }

  function aria(P) {
    if (P.k === 'w') return L('Mundo. Médias anuais das buscas por red light therapy: ', 'Worldwide. Yearly means of searches for red light therapy: ') +
      YEARS.map(function (yy) { return yy + ' ' + DN.fmt(mean(WR, yy), 1); }).join(', ') +
      L('. Recorde de 100 em abril de 2026, 41 em outubro de 2026. Cold plunge chegou a 24 em maio de 2026.', '. Record of 100 in April 2026, 41 in October 2026. Cold plunge reached 24 in May 2026.');
    if (P.k === 'b') return L('Brasil. Laserterapia cresce sem saltos e chega a 100 em maio de 2025 e março de 2026; LED facial chega a 50 em julho de 2026; red light therapy em inglês sobe entre novembro de 2025 e junho de 2026 e cai para 5 em novembro de 2026.',
      'Brazil. Laserterapia grows without jumps and reaches 100 in May 2025 and March 2026; LED facial reaches 50 in July 2026; red light therapy in English rises between November 2025 and June 2026 and falls to 5 in November 2026.');
    return L('FDA, liberações 510(k) no código OHS por ano: ', 'FDA, 510(k) clearances under code OHS per year: ') +
      YEARS.map(function (yy) { return yy + ' ' + FDA[yy]; }).join(', ') + L('. 166 desde 2008.', '. 166 since 2008.');
  }

  function labels() {
    take.textContent = L('As buscas cresceram cerca de 23 vezes entre 2018 e 2026, com um salto a cada temporada de presentes, e caíram cerca de 60% depois do recorde de abril. No mesmo período, as liberações de máscaras e aparelhos para rugas na FDA passaram de poucas por ano para 42 em 2025.',
      'Searches grew about 23-fold between 2018 and 2026, with a jump every gift season, and fell about 60% after the April record. Over the same years, FDA clearances of masks and devices for wrinkles went from a few a year to 42 in 2025.');
    sum.textContent = L('ver as médias anuais e as liberações em tabela', 'see the yearly means and clearances as a table');
    var h = '<div class="l00-tw"><table class="t"><thead><tr><th>' + L('série', 'series') + '</th>' +
      YEARS.map(function (yy) { return '<th>' + yy + (yy === 2026 ? '*' : '') + '</th>'; }).join('') + '</tr></thead><tbody>';
    [[L('red light therapy, mundo', 'red light therapy, worldwide'), WR], [L('cold plunge, mundo', 'cold plunge, worldwide'), WC],
      [L('laserterapia, Brasil', 'laserterapia, Brazil'), BL], [L('LED facial, Brasil', 'LED facial, Brazil'), BF]].forEach(function (r) {
      h += '<tr><td>' + r[0] + '</td>' + YEARS.map(function (yy) { return '<td>' + DN.fmt(mean(r[1], yy), 1) + '</td>'; }).join('') + '</tr>';
    });
    h += '<tr><td>' + L('liberações 510(k), OHS', '510(k) clearances, OHS') + '</td>' + YEARS.map(function (yy) { return '<td>' + FDA[yy] + '</td>'; }).join('') + '</tr>';
    h += '</tbody></table></div><p class="l00-tnote">' + L('* 2026 vai até novembro, um mês parcial. As buscas do mundo e do Brasil vêm de consultas separadas e não se comparam entre si. De 2008 a 2017 houve 33 liberações no código OHS, 166 no total.',
      '* 2026 runs to November, a partial month. Worldwide and Brazil searches come from separate queries and do not compare with each other. From 2008 to 2017 there were 33 clearances under code OHS, 166 in total.') + '</p>';
    tables.innerHTML = h;
  }

  var rt, lastW = root.clientWidth;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { var w = root.clientWidth; if (w !== lastW) { lastW = w; build(); } }, 150);
  });
  DN.onLang(build);
  build();
})();
