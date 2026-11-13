/* c00 · as-buscas : Google Trends, cortisol vs dopamine, world and Brazil, monthly 2018 to Nov 2026 */
(function () {
  'use strict';
  var root = DN.body('c00'); if (!root) return;
  var L = DN.L, C = DN.COL;
  var DOPA = '#4d4d4d';

  /* ---------- data: cortisol-pesquisa/dados/trends-world_cd.csv and trends-br_cd.csv
     (pytrends, joint queries of 12/11/2026), Jan 2018 .. Nov 2026, Nov 2026 partial ---------- */
  var WORLD = {
    c: [10, 11, 12, 12, 12, 11, 10, 10, 10, 12, 11, 10, 11, 12, 12, 12, 12, 11, 11, 11, 12, 12, 12, 10, 12, 13, 11, 11, 12, 13, 13, 12, 12, 12, 11, 11, 12, 13, 13, 13, 13, 13, 13, 12, 13, 12, 12, 11, 14, 16, 17, 16, 17, 16, 15, 16, 17, 18, 19, 18, 19, 23, 22, 22, 22, 22, 20, 20, 21, 21, 22, 21, 24, 32, 31, 41, 39, 41, 41, 40, 41, 42, 40, 40, 45, 41, 44, 44, 43, 44, 42, 47, 45, 47, 45, 44, 56, 79, 100, 82, 86, 76, 64, 53, 60, 41, 35],
    d: [10, 10, 10, 11, 10, 8, 8, 8, 10, 10, 10, 9, 11, 11, 10, 10, 9, 9, 8, 9, 10, 11, 11, 10, 11, 12, 10, 11, 12, 10, 11, 10, 13, 11, 11, 10, 10, 11, 12, 11, 12, 12, 11, 11, 12, 13, 13, 12, 14, 16, 16, 17, 16, 16, 15, 15, 16, 18, 18, 17, 19, 20, 19, 19, 19, 19, 17, 17, 18, 19, 18, 17, 18, 20, 19, 20, 19, 18, 19, 18, 21, 22, 22, 19, 22, 22, 21, 21, 21, 21, 21, 28, 29, 28, 31, 28, 29, 37, 35, 41, 44, 41, 34, 25, 30, 22, 20]
  };
  var BR = {
    c: [16, 15, 17, 20, 18, 18, 16, 17, 17, 18, 19, 14, 15, 16, 17, 19, 20, 19, 18, 19, 19, 21, 20, 18, 17, 18, 17, 15, 17, 20, 18, 19, 21, 19, 19, 18, 19, 19, 23, 21, 20, 19, 21, 21, 22, 22, 21, 18, 22, 26, 29, 25, 25, 25, 25, 27, 28, 28, 26, 23, 23, 25, 32, 30, 31, 30, 24, 27, 30, 28, 28, 25, 29, 30, 28, 36, 35, 36, 29, 34, 35, 42, 54, 74, 71, 47, 46, 42, 45, 43, 57, 56, 57, 57, 62, 51, 60, 67, 96, 100, 82, 85, 67, 64, 65, 53, 44],
    d: [9, 11, 13, 15, 14, 14, 12, 13, 15, 13, 15, 11, 11, 11, 14, 16, 16, 15, 14, 18, 18, 17, 18, 14, 13, 15, 16, 16, 17, 15, 15, 15, 19, 17, 16, 14, 14, 15, 17, 16, 17, 17, 15, 16, 19, 18, 17, 18, 21, 23, 28, 25, 35, 30, 29, 31, 36, 34, 33, 30, 36, 38, 41, 45, 55, 53, 43, 43, 43, 40, 39, 37, 39, 37, 34, 39, 34, 35, 34, 38, 43, 36, 35, 38, 44, 37, 35, 32, 34, 28, 30, 38, 30, 32, 30, 26, 26, 27, 31, 29, 26, 25, 24, 25, 28, 24, 26]
  };
  var N = 107, LAST = N - 1;
  function mi(y, m) { return (y - 2018) * 12 + m - 1; }
  function mon(i) {
    var y = 2018 + Math.floor(i / 12), m = i % 12;
    var pt = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    var en = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return L(pt[m] + '/' + y, en[m] + ' ' + y);
  }
  function pct(n) { return '+' + DN.fmt(n) + '%'; }

  /* placement: i,v = text anchor in data coords (month index, index value) per layout (w = wide, n = narrow) */
  var PANELS = [
    {
      k: 'w', data: WORLD,
      title: function () { return L('Mundo', 'Worldwide'); },
      dlab: function () { return 'dopamine'; },
      notes: [
        { s: 'd', at: mi(2023, 1),
          t: function (n) {
            return n ? [L('jan/2023 · última vez', 'Jan 2023 · last time'), L('que a dopamina', 'dopamine tied'), L('empatou ou venceu', 'or came out ahead')]
              : [L('jan/2023 · última vez que a', 'Jan 2023 · the last time dopamine'), L('dopamina empatou ou venceu', 'tied or came out ahead')];
          },
          w: { i: 58.5, v: 40, a: 'end' }, n: { i: 56.5, v: 58, a: 'end' } },
        { s: 'c', at: mi(2026, 3), peak: true,
          t: function () { return [L('mar/2026 = 100', 'Mar 2026 = 100'), L('o meme', 'the meme')]; },
          w: { i: 99.4, v: 101.5, a: 'start' }, n: { i: 95.2, v: 101.5, a: 'end' } }
      ],
      boxes: [
        { num: 1, s: 'c', at: mi(2024, 4),
          head: function () { return L('abr/2024 · a bebida', 'Apr 2024 · the drink'); },
          rows: function () { return [['“cortisol detox diet”', pct(9250)], ['“viral cortisol cocktail”', pct(2900)]]; },
          foot: function () { return L('consultas em alta no mundo, fev a ago/2024', 'rising worldwide queries, Feb to Aug 2024'); },
          w: { ri: 53, tv: 97 }, n: { i: 75, v: 58 } },
        { num: 3, s: 'c', at: mi(2026, 3),
          head: function () { return L('mar/2026 · o meme', 'Mar 2026 · the meme'); },
          rows: function () { return [['“low cortisol meme”', ''], [L('no mundo', 'worldwide'), pct(11100)], [L('no Brasil', 'in Brazil'), pct(86650)]]; },
          foot: function () { return L('em alta: jan a mai/2026 (mundo), fev a mai (Brasil)', 'rising: Jan to May 2026 (world), Feb to May (Brazil)'); },
          w: { ri: 94.6, tv: 97 }, n: { i: 90, v: 76 } }
      ]
    },
    {
      k: 'b', data: BR,
      title: function () { return L('Brasil', 'Brazil'); },
      dlab: function () { return 'dopamina'; },
      notes: [
        { s: 'c', at: mi(2024, 10),
          t: function (n) {
            return n ? [L('out/2024 · a virada', 'Oct 2024 · the crossover'), L('cortisol 42,', 'cortisol 42,'), L('dopamina 36', 'dopamina 36')]
              : [L('out/2024 · cortisol 42,', 'Oct 2024 · cortisol 42,'), L('dopamina 36, a virada', 'dopamina 36, the crossover')];
          },
          w: { i: 82, v: 15.5, a: 'start' }, n: { i: 64, v: 88, a: 'end' } },
        { s: 'c', at: mi(2026, 4), peak: true,
          t: function () { return [L('abr/2026 = 100', 'Apr 2026 = 100')]; },
          w: { i: 100.2, v: 101.5, a: 'start' }, n: { i: 97.4, v: 101.5, a: 'end' } }
      ],
      boxes: [
        { num: 2, s: 'c', at: mi(2024, 12),
          head: function () { return L('dez/2024 · o detox', 'Dec 2024 · the detox'); },
          rows: function () {
            var r = [['“o que é detox de cortisol”', pct(104400)]];
            if (DN.lang() === 'en') r.push(['(what is cortisol detox)', '']);
            return r;
          },
          foot: function () { return L('consultas em alta no Brasil, out/2024 a jan/2025', 'rising queries in Brazil, Oct 2024 to Jan 2025'); },
          w: { ri: 78, tv: 99 }, n: { i: 87.5, v: 88 } }
      ]
    }
  ];

  var YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
  function mean(arr, y) {
    var s = 0, n = 0;
    for (var i = 0; i < N; i++) if (2018 + Math.floor(i / 12) === y) { s += arr[i]; n++; }
    return s / n;
  }

  /* ---------- risograph phone stamp (vermilion + teal) ---------- */
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
    var R = rng(2026);
    var INKS = [{ k: 'a', col: C.alta, ang: 15, op: 0.95 }, { k: 'b', col: C.baixa, ang: 75, op: 0.92 }];
    var art = {
      /* vermilion: the search bar and a rising spark line on screen */
      a: '<rect x="20" y="22" width="40" height="9" rx="4.5" fill="$1"/>' +
        '<path d="M22,82 L30,78 L36,80 L42,70 L48,52 L54,64 L58,60" stroke="$0" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>' +
        '<circle cx="48" cy="52" r="3.4" fill="$0"/>',
      /* teal: the phone body, screen halftone, home bar */
      b: '<rect x="12" y="6" width="56" height="104" rx="9" fill="$0"/>' +
        '<rect x="16" y="15" width="48" height="83" rx="3" fill="#fff" class="pp"/>' +
        '<rect x="16" y="15" width="48" height="83" rx="3" fill="$1"/>' +
        '<circle cx="25" cy="26.5" r="2.4" fill="none" stroke="$0" stroke-width="1.4"/>' +
        '<path d="M26.8,28.3 l2,2" stroke="$0" stroke-width="1.4" stroke-linecap="round"/>' +
        '<rect x="32" y="102" width="16" height="2.6" rx="1.3" fill="#fff" class="pp"/>' +
        '<path d="M20,90 h40" stroke="$0" stroke-width="1" fill="none"/>'
    };
    var defs = '', layers = '';
    INKS.forEach(function (ink, li) {
      var p = 'c00r-' + ink.k;
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
      layers += '<g class="c00-ink c00-ink-' + ink.k + '" transform="translate(' + mx + ' ' + my + ')" opacity="' + ink.op + '" filter="url(#' + p + 'g)">' + body + '</g>';
    });
    return '<svg viewBox="0 0 80 116" focusable="false" aria-hidden="true"><defs>' + defs + '</defs>' + layers + '</svg>';
  }

  /* ---------- skeleton ---------- */
  root.innerHTML = '';
  var take = DN.el('p', { class: 'c00-read' }, root);
  var stampEl = DN.el('div', { class: 'c00-stamp', 'aria-hidden': 'true' }, root, stamp());
  var charts = DN.el('div', { class: 'c00-charts' }, root);
  var more = DN.el('details', { class: 'more c00-more' }, root);
  var sum = DN.el('summary', null, more);
  var tables = DN.el('div', { class: 'c00-tables' }, more);

  var built = [];

  function txt(parent, x, y, s, cls, anchor) {
    var t = DN.svg('text', { x: x, y: y, class: cls, 'text-anchor': anchor || 'start' }, parent);
    t.textContent = s; return t;
  }

  function buildPanel(P, W, narrow, parent) {
    var H = narrow ? 260 : 300;
    var fig = DN.el('figure', { class: 'c00-panel' }, parent);
    var cap = DN.el('figcaption', { class: 'c00-ph' }, fig);
    DN.el('span', { class: 'c00-pt' }, cap, P.title());
    DN.el('span', { class: 'c00-ps' }, cap, L('índice de buscas no Google, 100 = o mês com mais buscas neste painel', 'Google search index, 100 = the month with the most searches in this panel'));
    var m = { t: 22, r: narrow ? 70 : 92, b: 26, l: narrow ? 26 : 30 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    var x = function (i) { return m.l + i / LAST * iw; };
    var y = function (v) { return m.t + ih - v / 100 * ih; };
    var s = DN.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, width: W, height: H, role: 'img', class: 'c00-svg' }, fig);
    var D = P.data;
    s.setAttribute('aria-label', P.title() + '. ' + L('Médias anuais. Cortisol: ', 'Yearly means. Cortisol: ') +
      YEARS.map(function (yy) { return yy + ' ' + DN.fmt(mean(D.c, yy), 1); }).join(', ') + '. ' + P.dlab() + ': ' +
      YEARS.map(function (yy) { return yy + ' ' + DN.fmt(mean(D.d, yy), 1); }).join(', ') + '.');
    var defs = DN.svg('defs', null, s);
    /* grid */
    var g = DN.svg('g', { class: 'c00-grid' }, s);
    [0, 25, 50, 75, 100].forEach(function (v) {
      DN.svg('line', { x1: m.l, x2: m.l + iw, y1: y(v), y2: y(v), class: v === 0 ? 'c00-base' : 'c00-gl' }, g);
      txt(g, m.l - 6, y(v) + 3.5, String(v), 'c00-tick', 'end');
    });
    YEARS.forEach(function (yy) {
      var xi = x(mi(yy, 1));
      DN.svg('line', { x1: xi, x2: xi, y1: y(0), y2: y(0) + 4, class: 'c00-base' }, g);
      if (narrow && yy % 2) return;
      txt(g, xi, y(0) + 17, narrow ? "'" + String(yy).slice(2) : String(yy), 'c00-tick', narrow ? 'middle' : 'start');
    });
    /* lines: clip rect grows for the draw-in */
    var cp = DN.svg('clipPath', { id: 'c00-cp-' + P.k }, defs);
    var cr = DN.svg('rect', { x: 0, y: 0, height: H, width: W }, cp);
    var gl = DN.svg('g', { 'clip-path': 'url(#c00-cp-' + P.k + ')' }, s);
    function path(arr, i0, i1) {
      var d = '';
      for (var i = i0; i <= i1; i++) d += (i === i0 ? 'M' : 'L') + x(i).toFixed(1) + ',' + y(arr[i]).toFixed(1);
      return d;
    }
    [['d', DOPA, 1.6], ['c', C.alta, 2.6]].forEach(function (q) {
      DN.svg('path', { d: path(D[q[0]], 0, LAST - 1), class: 'c00-line c00-l' + q[0], stroke: q[1], 'stroke-width': q[2] }, gl);
      DN.svg('path', { d: path(D[q[0]], LAST - 1, LAST), class: 'c00-line c00-part', stroke: q[1], 'stroke-width': q[2] }, gl);
    });
    /* end labels (de-collided) */
    var ends = [
      { s: 'c', lab: 'cortisol', col: C.altaTxt, v: D.c[LAST] },
      { s: 'd', lab: P.dlab(), col: DOPA, v: D.d[LAST] }
    ];
    var ya = y(ends[0].v), yb = y(ends[1].v);
    if (yb - ya < 14) { var mid = (ya + yb) / 2; ya = mid - 7; yb = mid + 7; }
    var ge = DN.svg('g', { class: 'c00-ends' }, s);
    [ya, yb].forEach(function (yy, k) {
      var t = txt(ge, x(LAST) + 7, yy + 4, ends[k].lab, 'c00-end');
      t.setAttribute('fill', ends[k].col);
    });
    var gp = DN.svg('g', { class: 'c00-ends' }, s);
    txt(gp, x(LAST) + 7, Math.max(ya, yb) + 17, L('nov parcial', 'Nov partial'), 'c00-partl');

    /* notes */
    var items = [];
    var gn = DN.svg('g', null, s);
    P.notes.forEach(function (N0) {
      var pl = narrow ? N0.n : N0.w;
      var ng = DN.svg('g', { class: 'c00-note' }, gn);
      var px = x(N0.at), py = y(D[N0.s][N0.at]);
      var r0 = N0.peak ? 4.2 : 3.4;
      DN.svg('circle', { cx: px, cy: py, r: r0, class: 'c00-ring' }, ng);
      var lines = N0.t(narrow), LH = narrow ? 12.5 : 13.5;
      var t = DN.svg('text', { x: x(pl.i), y: y(pl.v), 'text-anchor': pl.a, class: 'c00-nt' }, ng);
      lines.forEach(function (ln, j) {
        var ts = DN.svg('tspan', { x: x(pl.i), dy: j ? LH : 0 }, t);
        ts.textContent = ln; if (!j) ts.setAttribute('class', 'c00-nb');
      });
      leader(ng, t, px, py, r0);
      items.push(ng);
    });

    /* search boxes */
    var list = narrow ? DN.el('ol', { class: 'c00-list' }, fig) : null;
    P.boxes.forEach(function (B) {
      var px = x(B.at), py = y(D[B.s][B.at]);
      var bg = DN.svg('g', { class: 'c00-box' }, gn);
      if (narrow) {
        var pl = B.n;
        var cx = x(pl.i), cy = y(pl.v);
        var dx = cx - px, dy = cy - py, dd = Math.sqrt(dx * dx + dy * dy);
        DN.svg('line', { x1: px + dx / dd * 4.5, y1: py + dy / dd * 4.5, x2: cx - dx / dd * 8, y2: cy - dy / dd * 8, class: 'c00-lead' }, bg);
        DN.svg('circle', { cx: px, cy: py, r: 3.4, class: 'c00-ring' }, bg);
        DN.svg('circle', { cx: cx, cy: cy, r: 8, class: 'c00-numc' }, bg);
        txt(bg, cx, cy + 3.6, String(B.num), 'c00-num', 'middle');
        var li = DN.el('li', { class: 'c00-li' }, list);
        li.innerHTML = '<span class="c00-lin">' + B.num + '</span><span class="c00-lib"><b>' + B.head() + '</b>' +
          B.rows().map(function (r) { return '<span class="c00-row"><span>' + r[0] + '</span><span class="c00-pct">' + r[1] + '</span></span>'; }).join('') +
          '<span class="c00-foot">' + B.foot() + '</span></span>';
        items.push({ g: bg, li: li });
        return;
      }
      var pw = B.w;
      var padX = 10, padT = 9, LH = 15;
      var tg = DN.svg('g', null, bg);
      var rect = DN.svg('rect', { class: 'c00-brect' }, tg);
      var hx = 0, rowsY = [];
      var head = txt(tg, 0, 0, B.head(), 'c00-bh');
      var rws = B.rows().map(function (r) {
        return [txt(tg, 0, 0, r[0], 'c00-bt'), txt(tg, 0, 0, r[1], 'c00-bt c00-pct', 'end')];
      });
      var foot = txt(tg, 0, 0, B.foot(), 'c00-bf');
      function wd(e) { try { return e.getBBox().width; } catch (err) { return e.textContent.length * 6.6; } }
      var inner = Math.max(wd(head), wd(foot), Math.max.apply(null, rws.map(function (r) { return wd(r[0]) + (r[1].textContent ? wd(r[1]) + 18 : 0); })));
      var bw = inner + padX * 2;
      var bh = padT + 11 + 8 + rws.length * LH + 4 + 12 + 6;
      var bx = x(pw.ri) - bw, by = y(pw.tv);
      rect.setAttribute('x', bx); rect.setAttribute('y', by); rect.setAttribute('width', bw); rect.setAttribute('height', bh);
      head.setAttribute('x', bx + padX); head.setAttribute('y', by + padT + 9);
      rws.forEach(function (r, j) {
        var ry = by + padT + 11 + 8 + j * LH + 10;
        r[0].setAttribute('x', bx + padX); r[0].setAttribute('y', ry);
        r[1].setAttribute('x', bx + bw - padX); r[1].setAttribute('y', ry);
      });
      foot.setAttribute('x', bx + padX); foot.setAttribute('y', by + bh - 8);
      /* leader from the point to the box bottom edge */
      var ex = DN.clamp(px, bx, bx + bw), ey = DN.clamp(py, by, by + bh);
      if (ex > bx && ex < bx + bw) ey = py > by + bh ? by + bh : by;
      var dx2 = ex - px, dy2 = ey - py, d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      var ln = DN.svg('line', { x1: px + dx2 / d2 * 5, y1: py + dy2 / d2 * 5, x2: ex, y2: ey, class: 'c00-lead' });
      bg.insertBefore(ln, bg.firstChild);
      DN.svg('circle', { cx: px, cy: py, r: 3.4, class: 'c00-ring' }, bg);
      items.push(bg);
    });

    var h = { cr: cr, m: m, iw: iw, W: W, items: items, fig: fig, done: false };
    built.push(h);
    return h;
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
    var ln = DN.svg('line', { x1: px + dx / d * (r0 + 1.5), y1: py + dy / d * (r0 + 1.5), x2: ex, y2: ey, class: 'c00-lead' });
    g.insertBefore(ln, g.firstChild);
  }

  function setItem(it, on) {
    var g = it.g || it;
    if (g.classList) g.classList.toggle('in', on);
    if (it.li) it.li.classList.toggle('in', on);
  }

  function play(h) {
    if (h.done) return;
    h.done = true;
    var full = h.W;
    if (DN.RM || !window.requestAnimationFrame) { h.cr.setAttribute('width', full); h.items.forEach(function (it) { setItem(it, true); }); return; }
    var t0 = null, dur = 900;
    function ease(t) { return 1 - Math.pow(1 - t, 3); }
    function step(ts) {
      if (t0 == null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      h.cr.setAttribute('width', h.m.l + ease(p) * (full - h.m.l));
      if (p < 1) requestAnimationFrame(step);
      else h.items.forEach(function (it, k) { setTimeout(function () { setItem(it, true); }, 80 + k * 200); });
    }
    requestAnimationFrame(step);
  }

  function build() {
    var wasDone = built.map(function (h) { return h.done; });
    built = [];
    charts.innerHTML = '';
    var W = Math.max(280, Math.floor(root.clientWidth || 600));
    var narrow = W < 640;
    root.classList.toggle('c00-narrow', narrow);
    PANELS.forEach(function (P, k) {
      var h = buildPanel(P, W, narrow, charts);
      if (DN.RM || wasDone[k]) { h.done = false; h.cr.setAttribute('width', W); h.items.forEach(function (it) { setItem(it, true); }); h.done = true; }
      else {
        h.cr.setAttribute('width', h.m.l);
        DN.onVisible(h.fig, function (v) { if (v) play(h); }, { once: true, threshold: 0.35 });
      }
    });
    labels();
  }

  function labels() {
    take.textContent = L('Desde fevereiro de 2023, o cortisol não ficou atrás da dopamina em nenhum mês no mundo, e os picos dessas buscas vieram de uma bebida, de um detox e de um meme.',
      'Since February 2023, cortisol has not trailed dopamine in a single month worldwide, and the peaks in those searches came from a drink, a detox and a meme.');
    sum.textContent = L('ver as médias anuais em tabela', 'see the yearly means as a table');
    function tb(title, P) {
      var h = '<div class="glabel">' + title + '</div><div class="c00-tw"><table class="t"><thead><tr><th>' + L('termo', 'term') + '</th>' +
        YEARS.map(function (yy) { return '<th>' + yy + (yy === 2026 ? '*' : '') + '</th>'; }).join('') + '</tr></thead><tbody>';
      [['cortisol', P.data.c], [P.dlab(), P.data.d]].forEach(function (r) {
        h += '<tr><td>' + r[0] + '</td>' + YEARS.map(function (yy) { return '<td>' + DN.fmt(mean(r[1], yy), 1) + '</td>'; }).join('') + '</tr>';
      });
      return h + '</tbody></table></div>';
    }
    tables.innerHTML = tb(L('Mundo', 'Worldwide'), PANELS[0]) + tb(L('Brasil', 'Brazil'), PANELS[1]) +
      '<p class="c00-tnote">' + L('* O ano de 2026 vai até novembro, um mês parcial, e os valores só se comparam dentro do mesmo painel.',
        '* The year 2026 runs to November, a partial month, and values compare only within the same panel.') + '</p>';
  }

  var rt, lastW = root.clientWidth;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { var w = root.clientWidth; if (w !== lastW) { lastW = w; build(); } }, 150);
  });
  DN.onLang(build);
  build();
})();
