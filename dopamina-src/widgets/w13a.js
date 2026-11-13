/* w13a · as-palavras : Google Trends yearly means, lines drawn by scroll */
(function () {
  'use strict';
  var root = DN.body('w13a'); if (!root) return;
  var L = DN.L, C = DN.COL;
  var Y0 = 2018, Y1 = 2026, VMAX = 80;
  var YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

  function row(a) { var o = {}; a.forEach(function (v, i) { if (v != null) o[YEARS[i]] = v; }); return o; }
  var _ = null;

  /* ---------- data: dopamina-cotidiano-e-mitos.md 3.2 ---------- */
  var D = {
    mA: {
      title: function () { return L('o protocolo', 'the protocol'); },
      sub: function () { return L('buscas por “dopamine …”, mundo', 'searches for “dopamine …”, worldwide'); },
      series: [
        { k: 'detox', lab: function () { return 'detox'; }, col: C.dopa, w: 2.6, origin: 2020,
          v: row([0.5, 1.0, 21.8, 18.8, 42.0, 58.0, 73.3, 57.0, 45.4]) },
        { k: 'menu', lab: function () { return 'menu'; }, col: C.pausa, w: 2, origin: 2023,
          v: row([0.4, 0.4, 0.8, 0.9, 1.0, 2.8, 6.3, 11.8, 20.6]) },
        { k: 'fasting', lab: function () { return 'fasting'; }, col: C.ink, w: 1.5, origin: 2019,
          v: row([0.6, 3.8, 6.4, 3.5, 5.0, 4.7, 4.8, 5.5, 11.9]) },
        { k: 'dressing', lab: function () { return 'dressing'; }, col: C.mid, w: 1.4, origin: 2022,
          v: row([0.0, 0.0, 0.0, 0.5, 5.4, 4.0, 3.3, 7.0, 8.0]) }
      ],
      notes: [
        { y: 2019, s: 'fasting', tx: 2018.12, tv: 77, a: 'start',
          t: function () { return L(['2019 · Sepah e o NYT:', '“dopamine fasting”'], ['2019 · Sepah and the NYT:', '“dopamine fasting”']); } },
        { y: 2020, s: 'detox', tx: 2020.95, tv: 70, a: 'start',
          t: function () { return L(['2020 · quarentena:', 'o jejum vira detox'], ['2020 · lockdown:', 'fasting turns detox']); } },
        { y: 2023, s: 'menu', tx: 2023, tv: 18, a: 'middle',
          t: function () { return L(['2023 · TikTok:', '“dopamine menu”'], ['2023 · TikTok:', '“dopamine menu”']); } },
        { y: 2024, s: 'detox', tx: 2024.2, tv: 75, a: 'start', peak: true,
          t: function () { return L(['pico mensal', 'nov/2024'], ['monthly peak', 'Nov 2024']); } }
      ]
    },
    mB: {
      title: function () { return L('a molécula e as rivais', 'the molecule and its rivals'); },
      sub: function () { return L('mundo, mesma consulta', 'worldwide, one query'); },
      series: [
        { k: 'dopamine', lab: function () { return 'dopamine'; }, col: C.dopa, w: 2.6, origin: 2018,
          v: row([9.5, _, 10.6, _, 16.1, 18.0, 19.4, 23.8, 32.4]) },
        { k: 'cortisol', lab: function () { return 'cortisol'; }, col: C.dim, w: 1.6, origin: 2018, cort: true,
          v: row([10.8, _, 11.9, _, 16.3, 21.2, 36.8, 44.2, 67.1]) },
        { k: 'serotonin', lab: function () { return 'serotonin'; }, col: C.mid, w: 1.4, origin: 2018,
          v: row([10.4, _, 12.6, _, 14.0, 12.8, 12.5, 14.3, 19.9]) },
        { k: 'oxytocin', lab: function () { return 'oxytocin'; }, col: '#b9b9b9', w: 1.4, origin: 2018,
          v: row([4.2, _, 5.0, _, 6.3, 6.9, 6.7, 7.5, 10.1]) }
      ],
      notes: [
        { y: 2023, s: 'cortisol', tx: 2022.8, tv: 33, a: 'end', cross: true,
          t: function () { return L(['2023 · o cortisol', 'lidera todo mês'], ['2023 · cortisol', 'leads every month']); } }
      ]
    },
    bA: {
      title: function () { return L('o protocolo', 'the protocol'); },
      sub: function () { return L('Brasil, mesma consulta do painel “a molécula e as rivais”', 'Brazil, same query as the “molecule and its rivals” panel'); },
      series: [
        { k: 'ref', lab: function () { return L('dopamina', 'dopamina'); }, col: '#c9c9c9', w: 1.2, origin: 2018, dash: '3 4', ref: true,
          v: row([13.1, 15.5, 15.8, 16.5, 29.7, 43.0, 38.2, 33.5, 26.3]) },
        { k: 'detoxbr', lab: function () { return L('detox de\ndopamina', 'detox de\ndopamina'); }, col: C.dopa, w: 2.6, origin: 2018,
          v: row([0, 0, 0, 0, 0, 0, 0.1, 0.1, 0]) }
      ],
      notes: [
        { y: 2024, s: 'detoxbr', tx: 2023.7, tv: 12, a: 'middle',
          t: function () { return L(['“detox de dopamina”:', 'de 0 a 0,1 por ano'], ['“detox de dopamina”:', '0 to 0.1 a year']); } }
      ]
    },
    bB: {
      title: function () { return L('a molécula e as rivais', 'the molecule and its rivals'); },
      sub: function () { return L('Brasil, mesma consulta', 'Brazil, one query'); },
      series: [
        { k: 'dopamina', lab: function () { return 'dopamina'; }, col: C.dopa, w: 2.6, origin: 2018,
          v: row([13.1, 15.5, 15.8, 16.5, 29.7, 43.0, 38.2, 33.5, 26.3]) },
        { k: 'cortisolbr', lab: function () { return 'cortisol'; }, col: C.dim, w: 1.6, origin: 2018, cort: true,
          v: row([17.3, 18.6, 18.4, 20.2, 25.8, 28.3, 38.3, 52.5, 72.9]) },
        { k: 'serotonina', lab: function () { return 'serotonina'; }, col: C.mid, w: 1.4, origin: 2018,
          v: row([17.2, 24.0, 24.4, 24.1, 30.6, 28.2, 22.0, 19.1, 14.2]) }
      ],
      notes: [
        { y: 2022, s: 'dopamina', tx: 2021.8, tv: 44, a: 'end',
          t: function () { return L(['2022 · sai', '“Nação Dopamina”'], ['2022 · “Dopamine Nation”', 'out in Portuguese']); } },
        { y: 2023, s: 'dopamina', tx: 2022.75, tv: 53, a: 'end', peak: true,
          t: function () { return L(['pico: jun/2023'], ['peak: Jun 2023']); } },
        { y: 2024, s: 'cortisolbr', tx: 2023.85, tv: 66, a: 'end', cross: true,
          t: function () { return L(['2024 · o cortisol', 'passa a dopamina'], ['2024 · cortisol', 'overtakes dopamine']); } }
      ]
    }
  };

  /* ---------- state ---------- */
  var built = [];           // per panel render handles
  var twoUp = true;

  /* ---------- skeleton ---------- */
  root.innerHTML = '';
  var charts = DN.el('div', { class: 'w13a-charts' }, root);
  var live = DN.el('div', { class: 'live', 'aria-live': 'polite' }, root);
  var take = DN.el('p', { class: 'w13a-take' }, root);
  var more = DN.el('details', { class: 'more' }, root);
  var sum = DN.el('summary', null, more);
  var tables = DN.el('div', { class: 'w13a-tables' }, more);

  function say() {
    live.innerHTML = L('<b>Mundo:</b> “dopamine detox” chega a ' + DN.fmt(73.3, 1) + ' em 2024 e cai para ' + DN.fmt(45.4, 1) + '; o cortisol lidera todo mês desde fevereiro de 2023. <b>Brasil:</b> “dopamina” tem o pico em 2023, e “detox de dopamina” fica no zero.',
      '<b>Worldwide:</b> “dopamine detox” reaches 73.3 in 2024 and falls to 45.4; cortisol has led every month since February 2023. <b>Brazil:</b> “dopamina” peaks in 2023, and “detox de dopamina” stays at zero.');
  }

  /* ---------- build one panel ---------- */
  function buildPanel(key, PW, H, parent) {
    var P = D[key];
    var wrap = DN.el('figure', { class: 'w13a-panel' }, parent);
    var cap = DN.el('figcaption', null, wrap);
    DN.el('div', { class: 'w13a-ptitle' }, cap, P.title());
    DN.el('div', { class: 'w13a-psub' }, cap, P.sub());
    var narrow = PW < 420;
    var m = { t: 16, r: narrow ? 74 : 86, b: 26, l: 28 };
    var iw = PW - m.l - m.r, ih = H - m.t - m.b;
    var x = function (yr) { return m.l + (yr - Y0) / (Y1 - Y0) * iw; };
    var y = function (v) { return m.t + ih - (v / VMAX) * ih; };
    var s = DN.svg('svg', { viewBox: '0 0 ' + PW + ' ' + H, width: PW, height: H, role: 'img' }, wrap);
    s.setAttribute('aria-label', ariaFor(P));
    var defs = DN.svg('defs', null, s);
    /* grid */
    var g = DN.svg('g', { class: 'w13a-grid' }, s);
    [0, 20, 40, 60, 80].forEach(function (v) {
      DN.svg('line', { x1: m.l, x2: m.l + iw, y1: y(v), y2: y(v), stroke: v === 0 ? C.ink : C.line, 'stroke-width': 1 }, g);
      var t = DN.svg('text', { x: m.l - 6, y: y(v) + 3.5, 'text-anchor': 'end', class: 'w13a-tick' }, g);
      t.textContent = v;
    });
    YEARS.forEach(function (yr) {
      DN.svg('line', { x1: x(yr), x2: x(yr), y1: y(0), y2: y(0) + 4, stroke: C.ink }, g);
      if (narrow && yr % 2) return;
      var t = DN.svg('text', { x: x(yr), y: y(0) + 17, 'text-anchor': 'middle', class: 'w13a-tick' }, g);
      t.textContent = narrow ? "'" + String(yr).slice(2) : String(yr);
      if (yr === 2026) t.textContent += '*';
    });
    /* cursor */
    var cur = DN.svg('g', { class: 'w13a-cur' }, s);
    var curL = DN.svg('line', { y1: m.t - 6, y2: y(0), stroke: C.ink, 'stroke-width': 1, 'stroke-dasharray': '2 3' }, cur);
    var curT = DN.svg('text', { y: m.t - 9, 'text-anchor': 'middle', class: 'w13a-curt' }, cur);

    /* lines */
    var lines = [];
    var gl = DN.svg('g', null, s);
    P.series.forEach(function (S, i) {
      var pts = YEARS.filter(function (yr) { return S.v[yr] != null; }).map(function (yr) { return [x(yr), y(S.v[yr]), yr]; });
      var d = pts.map(function (p, j) { return (j ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join('');
      var id = 'w13a-' + key + i;
      var cpPre = DN.svg('clipPath', { id: id + 'p' }, defs);
      var rPre = DN.svg('rect', { x: m.l - 4, y: 0, height: H, width: 0 }, cpPre);
      var cpOn = DN.svg('clipPath', { id: id + 'o' }, defs);
      var rOn = DN.svg('rect', { x: x(S.origin), y: 0, height: H, width: 0 }, cpOn);
      var gg = DN.svg('g', { class: 'w13a-s' + (S.cort ? ' w13a-iscort' : '') + (S.ref ? ' w13a-isref' : '') }, gl);
      var pre = null;
      if (S.origin > Y0) pre = DN.svg('path', { d: d, fill: 'none', stroke: '#d4d4d4', 'stroke-width': 1.2, 'clip-path': 'url(#' + id + 'p)' }, gg);
      var on = DN.svg('path', { d: d, fill: 'none', stroke: S.col, 'stroke-width': S.w, 'stroke-linejoin': 'round', 'stroke-linecap': 'round',
        'stroke-dasharray': S.dash || null, 'clip-path': 'url(#' + id + 'o)', class: 'w13a-line' }, gg);
      var dot = DN.svg('circle', { r: S.ref ? 2 : 3, fill: S.col, class: 'w13a-dot' }, gg);
      var lab = DN.svg('text', { class: 'w13a-lab', fill: S.ref ? '#a8a8a8' : (S.col === C.mid || S.col === '#b9b9b9' ? C.dim : S.col) }, gg);
      var parts = S.lab().split('\n');
      parts.forEach(function (p, j) { var ts = DN.svg('tspan', { x: 0, dy: j ? '1.15em' : 0 }, lab); ts.textContent = p; });
      lab.setAttribute('data-n', parts.length);
      lines.push({ S: S, pts: pts, rPre: rPre, rOn: rOn, dot: dot, lab: lab, gg: gg, n: parts.length });
    });

    /* annotations: in-plot text on wide panels, numbered markers + list on narrow */
    var gn = DN.svg('g', null, s);
    var numbered = PW < 480;
    var list = numbered ? DN.el('ol', { class: 'w13a-nlist' }, wrap) : null;
    var notes = P.notes.map(function (N, k) {
      var S = P.series.filter(function (q) { return q.k === N.s; })[0];
      var px = x(N.y), py = y(S.v[N.y]);
      var ng = DN.svg('g', { class: 'w13a-note' + (N.cross ? ' w13a-cross' : '') }, gn);
      var li = null;
      if (numbered) {
        var my = py - 15 < m.t ? py + 15 : py - 15;
        DN.svg('line', { x1: px, y1: py + (my < py ? -3.5 : 3.5), x2: px, y2: my + (my < py ? 7 : -7), stroke: C.ink, 'stroke-width': 0.8 }, ng);
        DN.svg('circle', { cx: px, cy: py, r: 3, fill: 'none', stroke: C.ink, 'stroke-width': 1 }, ng);
        DN.svg('circle', { cx: px, cy: my, r: 7, fill: '#fff', stroke: C.ink, 'stroke-width': 1 }, ng);
        var nt = DN.svg('text', { x: px, y: my + 3.3, 'text-anchor': 'middle', class: 'w13a-num' }, ng);
        nt.textContent = k + 1;
        li = DN.el('li', { class: 'w13a-note' + (N.cross ? ' w13a-cross' : '') }, list);
        li.innerHTML = '<span class="w13a-n">' + (k + 1) + '</span><span><b>' + N.t()[0] + '</b> ' + N.t().slice(1).join(' ') + '</span>';
        return { N: N, g: ng, li: li };
      }
      var lines2 = N.t(), LH = 13;
      DN.svg('circle', { cx: px, cy: py, r: N.peak ? 4.5 : 3.5, fill: 'none', stroke: C.ink, 'stroke-width': 1 }, ng);
      var t = DN.svg('text', { x: x(N.tx), y: y(N.tv), 'text-anchor': N.a, class: 'w13a-ntext', 'paint-order': 'stroke' }, ng);
      lines2.forEach(function (ln, j) { var ts = DN.svg('tspan', { x: x(N.tx), dy: j ? LH : 0 }, t); ts.textContent = ln; if (!j) ts.setAttribute('class', 'w13a-nb'); });
      /* leader: from the point to the nearest edge of the text box */
      var bb = null; try { bb = t.getBBox(); } catch (e) {}
      if (bb && bb.width) {
        var ex = DN.clamp(px, bb.x + 2, bb.x + bb.width - 2), ey = DN.clamp(py, bb.y - 2, bb.y + bb.height + 1);
        if (py > bb.y + bb.height) ey = bb.y + bb.height + 1; else if (py < bb.y) ey = bb.y - 3;
        var dx = ex - px, dy = ey - py, d = Math.sqrt(dx * dx + dy * dy);
        if (d > 12) {
          var r0 = (N.peak ? 4.5 : 3.5) + 1.5;
          var ln = DN.svg('line', { x1: px + dx / d * r0, y1: py + dy / d * r0, x2: ex, y2: ey, stroke: C.ink, 'stroke-width': 0.8 });
          ng.insertBefore(ln, ng.firstChild);
        }
      }
      return { N: N, g: ng };
    });

    var h = { prog: DN.RM ? 1 : 0, key: key, P: P, x: x, y: y, m: m, iw: iw, H: H, lines: lines, notes: notes, curL: curL, curT: curT, cur: cur, svg: s };
    built.push(h);
    return h;
  }

  function ariaFor(P) {
    return P.title() + '. ' + P.sub() + '. ' + P.series.filter(function (S) { return !S.ref; }).map(function (S) {
      return S.lab().replace('\n', ' ') + ': ' + YEARS.filter(function (yr) { return S.v[yr] != null; }).map(function (yr) { return yr + ' ' + DN.fmt(S.v[yr], 1); }).join(', ');
    }).join('. ');
  }

  function valAt(S, yr) {
    var ks = YEARS.filter(function (q) { return S.v[q] != null; });
    if (yr <= ks[0]) return S.v[ks[0]];
    for (var i = 1; i < ks.length; i++) {
      if (yr <= ks[i]) { var a = ks[i - 1], b = ks[i]; return S.v[a] + (S.v[b] - S.v[a]) * (yr - a) / (b - a); }
    }
    return S.v[ks[ks.length - 1]];
  }

  /* ---------- draw at progress ---------- */
  function draw() {
    built.forEach(function (h) {
      var prog = h.prog, yr = Y0 + prog * (Y1 - Y0);
      var cx = h.x(yr);
      h.cur.style.opacity = prog > 0.002 && prog < 0.999 ? 1 : 0;
      h.curL.setAttribute('x1', cx); h.curL.setAttribute('x2', cx);
      h.curT.setAttribute('x', cx); h.curT.textContent = Math.floor(yr + 0.0001);
      var labs = [];
      h.lines.forEach(function (o) {
        var S = o.S;
        o.rPre.setAttribute('width', Math.max(0, cx - (h.m.l - 4) + 2));
        var ox = h.x(S.origin);
        o.rOn.setAttribute('width', Math.max(0, cx - ox + 3));
        var born = yr >= S.origin - 0.001 && prog > 0.002;
        var v = valAt(S, yr), py = h.y(v);
        o.dot.setAttribute('cx', cx); o.dot.setAttribute('cy', py);
        o.dot.style.opacity = born && prog < 0.999 ? 1 : 0;
        o.lab.style.opacity = born ? 1 : 0;
        labs.push({ o: o, y: py, n: o.n });
      });
      /* de-collide labels (min gap) */
      labs.sort(function (a, b) { return a.y - b.y; });
      var gap = 12.5;
      for (var i = 1; i < labs.length; i++) {
        var need = labs[i - 1].y + gap * labs[i - 1].n;
        if (labs[i].y < need) labs[i].y = need;
      }
      /* the lowest label keeps its last baseline above the zero axis */
      for (var j = labs.length - 1; j >= 0; j--) {
        var lim = j === labs.length - 1 ? h.y(0) - 7 - 6.65 * (labs[j].n - 1) : labs[j + 1].y - gap * labs[j].n;
        if (labs[j].y > lim) labs[j].y = lim;
      }
      labs.forEach(function (l) {
        var lx = cx + 8;
        l.o.lab.setAttribute('transform', 'translate(' + lx.toFixed(1) + ',' + (l.y + 4 - (l.n - 1) * 6).toFixed(1) + ')');
      });
      h.notes.forEach(function (n) { var on = yr >= n.N.y - 0.02 && prog > 0.002; n.g.classList.toggle('in', on); if (n.li) n.li.classList.toggle('in', on); });
    });
  }

  /* ---------- layout ---------- */
  function build() {
    built = [];
    charts.innerHTML = '';
    var W = root.clientWidth || 600;
    twoUp = W >= 700;
    root.classList.toggle('w13a-one', !twoUp);
    var PW = twoUp ? Math.floor((W - 32) / 2) : W;
    var H = twoUp ? 280 : 230;
    [['mundo', ['mA', 'mB']], ['brasil', ['bA', 'bB']]].forEach(function (rg) {
      var sec = DN.el('div', { class: 'w13a-region' }, charts);
      DN.el('div', { class: 'w13a-rh' }, sec, rg[0] === 'mundo' ? L('Mundo', 'Worldwide') : L('Brasil', 'Brazil'));
      var rowEl = DN.el('div', { class: 'w13a-row' }, sec);
      rg[1].forEach(function (k) { buildPanel(k, PW, H, rowEl); });
    });
    labels();
    onScroll(true);
    draw();
  }

  function labels() {
    take.textContent = L('A busca por “dopamine detox” decolou em 2020, teve o pico em 2024 e já caiu 38%. No Brasil, o termo quase não aparece. Nos dois lugares, o cortisol já passou a dopamina.',
      'Searches for “dopamine detox” took off in 2020, peaked in 2024 and have since fallen 38%. In Brazil the term barely registers, and cortisol has overtaken dopamine in both places.');
    sum.textContent = L('ver as médias anuais em tabela', 'see the yearly means as a table');
    tables.innerHTML = tableHTML();
  }

  function tableHTML() {
    function tb(title, keys, series) {
      var yrs = YEARS.filter(function (yr) { return series.some(function (S) { return S.v[yr] != null; }); });
      var h = '<div class="glabel">' + title + '</div><div class="w13a-tw"><table class="t"><thead><tr><th>' + L('termo', 'term') + '</th>' +
        yrs.map(function (yr) { return '<th>' + yr + (yr === 2026 ? '*' : '') + '</th>'; }).join('') + '</tr></thead><tbody>';
      series.forEach(function (S, i) {
        h += '<tr><td>' + keys[i] + '</td>' + yrs.map(function (yr) {
          var v = S.v[yr]; return '<td>' + (v == null ? '' : DN.fmt(v, v === 0 ? 0 : 1)) + '</td>';
        }).join('') + '</tr>';
      });
      return h + '</tbody></table></div>';
    }
    var mA = D.mA.series, mB = D.mB.series, bB = D.bB.series;
    return tb(L('Mundo, consulta 1', 'Worldwide, query 1'),
        ['dopamine detox', 'dopamine menu', 'dopamine fasting', 'dopamine dressing'], mA) +
      tb(L('Mundo, consulta 2 (sem 2019 e 2021)', 'Worldwide, query 2 (no 2019 or 2021)'),
        ['dopamine', 'cortisol', 'serotonin', 'oxytocin'], mB) +
      tb(L('Brasil, consulta 3', 'Brazil, query 3'),
        ['dopamina', 'cortisol', 'serotonina', 'detox de dopamina'], bB.concat([D.bA.series[1]])) +
      '<p class="w13a-tnote">' + L('* 2026 vai até 10 de novembro. Valores comparáveis só dentro da mesma consulta. Pico mensal de “dopamine detox”: novembro de 2024 = 100. Em outubro e novembro de 2026, 25 e 23.',
        '* 2026 runs to 10 November. Values compare only within the same query. Monthly peak of “dopamine detox”: November 2024 = 100. In October and November 2026, 25 and 23.') + '</p>';
  }

  /* ---------- scroll-linked time ---------- */
  var ticking = false;
  function onScroll(now) {
    if (DN.RM) return;
    function run() {
      ticking = false;
      var vh = window.innerHeight || 800, ch = false;
      built.forEach(function (h) {
        var r = h.svg.getBoundingClientRect();
        var p = DN.clamp((vh * 0.92 - r.top) / (vh * 0.5), 0, 1);
        if (Math.abs(p - h.prog) > 0.0005) { h.prog = p; ch = true; }
      });
      if (ch) draw();
    }
    if (now === true) { run(); return; }
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(run);
  }
  if (!DN.RM) {
    var listening = false;
    DN.onVisible(root, function (v) {
      if (v && !listening) { window.addEventListener('scroll', onScroll, { passive: true }); listening = true; onScroll(); }
      else if (!v && listening) { window.removeEventListener('scroll', onScroll); listening = false; onScroll(); }
    }, { margin: '200px 0px' });
  }

  var rt;
  var lastW = 0;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { var w = root.clientWidth; if (w !== lastW) { lastW = w; build(); onScroll(); } }, 150);
  });
  DN.onLang(function () { build(); say(); });
  lastW = root.clientWidth;
  build();
  say();
})();
