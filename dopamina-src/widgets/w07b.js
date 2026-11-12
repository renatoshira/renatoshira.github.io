/* w07b · o-grafico-de-seeman : daily dose vs receptor affinity, log-log */
(function () {
  'use strict';
  var root = DN.body('w07b'); if (!root) return;
  var L = DN.L, C = DN.COL;

  /* dose range (mg/day), D2 Ki (nM, Seeman 2002, approx.), 5-HT2A Ki (nM, approximate) */
  var DATA = [
    { n: 'espiperona', e: 'spiperone', lo: 1, hi: 3, d2: 0.07, ht: 1 },
    { n: 'haloperidol', e: 'haloperidol', lo: 2, hi: 10, d2: 1, ht: 50 },
    { n: 'flufenazina', e: 'fluphenazine', lo: 2, hi: 10, d2: 0.7, ht: 20 },
    { n: 'risperidona', e: 'risperidone', lo: 2, hi: 6, d2: 3, ht: 0.2 },
    { n: 'olanzapina', e: 'olanzapine', lo: 10, hi: 20, d2: 30, ht: 4 },
    { n: 'clorpromazina', e: 'chlorpromazine', lo: 300, hi: 600, d2: 5, ht: 3 },
    { n: 'clozapina', e: 'clozapine', lo: 300, hi: 500, d2: 150, ht: 10 },
    { n: 'quetiapina', e: 'quetiapine', lo: 300, hi: 750, d2: 300, ht: 100 }
  ];
  DATA.forEach(function (p) { p.dose = (p.lo + p.hi) / 2; });
  /* label placement per mode: [dx, dy, anchor] in px */
  var LAB = {
    d2: {
      espiperona: [9, 15, 'start'], haloperidol: [7, -11, 'start'], flufenazina: [-10, -6, 'end'],
      risperidona: [10, 14, 'start'], olanzapina: [10, 4, 'start'], clorpromazina: [-10, 4, 'end'],
      clozapina: [-10, -8, 'end'], quetiapina: [-10, -16, 'end']
    },
    ht: {
      espiperona: [10, 4, 'start'], haloperidol: [10, 12, 'start'], flufenazina: [-10, -6, 'end'],
      risperidona: [10, 4, 'start'], olanzapina: [10, 4, 'start'], clorpromazina: [-10, -8, 'end'],
      clozapina: [10, 12, 'start'], quetiapina: [-10, -16, 'end']
    },
    /* narrow screens: the 5-HT2A cloud packs clozapine and quetiapine close together */
    htMob: { clozapina: [0, 22, 'middle'], quetiapina: [0, -17, 'middle'] }
  };
  var XD = [0.03, 1000], YD = [0.5, 1500];
  var lg = Math.log10;

  function fit(key) {
    var xs = DATA.map(function (p) { return lg(p[key]); }), ys = DATA.map(function (p) { return lg(p.dose); });
    var n = xs.length, mx = 0, my = 0;
    for (var i = 0; i < n; i++) { mx += xs[i] / n; my += ys[i] / n; }
    var sxy = 0, sxx = 0, syy = 0;
    for (i = 0; i < n; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) * (xs[i] - mx); syy += (ys[i] - my) * (ys[i] - my); }
    var b = sxy / sxx; return { b: b, a: my - b * mx, r: sxy / Math.sqrt(sxx * syy) };
  }
  var FIT = { d2: fit('d2'), ht: fit('ht') };

  /* ---------- static small multiples: the same eight drugs against two receptors ---------- */
  var grid = DN.el('div', { class: 'w07b-grid' }, root);
  var panels = ['d2', 'ht'].map(function (key) {
    var box = DN.el('div', { class: 'w07b-panel' }, grid);
    var head = DN.el('div', { class: 'w07b-ph' }, box);
    var holder = DN.el('div', { class: 'w07b-svg' }, box);
    var tip = DN.el('div', { class: 'w07b-tip', 'aria-hidden': 'true' }, holder);
    return { key: key, box: box, head: head, holder: holder, tip: tip, hover: -1 };
  });
  var live = DN.el('div', { class: 'live sr', 'aria-live': 'polite' }, root);
  var take = DN.el('p', { class: 'w07b-take' }, root);
  var det = DN.el('details', { class: 'more' }, root);
  var sum = DN.el('summary', null, det);
  var tbl = DN.el('table', { class: 't' }, det);

  function nm(p) { return L(p.n, p.e); }
  function rng(p) { return p.lo + L(' a ', ' to ') + p.hi; }
  function num(v) { return v < 1 ? DN.fmt(v, v < 0.1 ? 2 : 1) : DN.fmt(Math.round(v)); }

  function relabel() {
    panels.forEach(function (P) {
      var f = FIT[P.key];
      P.head.innerHTML = P.key === 'd2'
        ? L('<b>receptor D2</b><span>os pontos seguem uma reta · r = ' + DN.fmt(f.r, 2) + '</span>', '<b>D2 receptor</b><span>the points follow a line · r = ' + DN.fmt(f.r, 2) + '</span>')
        : L('<b>receptor de serotonina 5-HT2A</b><span>os pontos viram uma nuvem · r = ' + DN.fmt(f.r, 2) + '</span>', '<b>5-HT2A serotonin receptor</b><span>the points become a cloud · r = ' + DN.fmt(f.r, 2) + '</span>');
    });
    take.textContent = L('A dose que funciona acompanha a força com que cada remédio se prende ao receptor D2, numa faixa de mil vezes. No receptor de serotonina, essa relação some. O alvo comum dos antipsicóticos é o D2.',
      'The dose that works tracks how tightly each drug binds the D2 receptor, across a thousandfold range. At the serotonin receptor, that relation disappears. The common target of antipsychotics is D2.');
    live.textContent = L('Dois gráficos lado a lado. Com o receptor D2, os pontos formam uma diagonal. Com o receptor de serotonina, viram uma nuvem.', 'Two charts side by side. With the D2 receptor, the points form a diagonal. With the serotonin receptor, they become a cloud.');
    sum.textContent = L('tabela com os valores', 'table of values');
    tbl.innerHTML = '<tr><th>' + L('remédio', 'drug') + '</th><th>' + L('dose diária (mg)', 'daily dose (mg)') + '</th><th>Ki D2 (nM)</th><th>Ki 5-HT2A (nM)*</th></tr>' +
      DATA.map(function (p) { return '<tr><td>' + nm(p) + '</td><td>' + rng(p) + '</td><td>' + num(p.d2) + '</td><td>' + num(p.ht) + '</td></tr>'; }).join('') +
      '<tr><td colspan="4" style="color:var(--dim)">* ' + L('aproximado', 'approximate') + '</td></tr>';
    panels.forEach(function (P) { if (P.g) { axisText(P); draw(P); } });
  }

  function build(P) {
    P.holder.querySelectorAll('svg').forEach(function (n) { n.remove(); });
    var W = Math.max(260, P.holder.clientWidth || 320);
    var H = Math.round(Math.min(330, Math.max(290, W * 0.9)));
    var m = { l: 42, r: 10, t: 22, b: 52 };
    var s = DN.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img' });
    P.holder.insertBefore(s, P.tip);
    var g = P.g = { s: s, W: W, H: H, m: m };
    g.sx = function (v) { return m.l + (lg(v) - lg(XD[0])) / (lg(XD[1]) - lg(XD[0])) * (W - m.l - m.r); };
    g.sy = function (v) { return H - m.b - (lg(v) - lg(YD[0])) / (lg(YD[1]) - lg(YD[0])) * (H - m.t - m.b); };
    var gr = DN.svg('g', null, s);
    [0.1, 1, 10, 100, 1000].forEach(function (v) {
      var x = g.sx(v);
      DN.svg('line', { x1: x, x2: x, y1: m.t, y2: H - m.b, stroke: C.line }, gr);
      DN.svg('text', { x: x, y: H - m.b + 14, 'text-anchor': v === 1000 ? 'end' : 'middle', 'font-size': 9.5, fill: C.dim, 'data-v': v, class: 'w07b-xt' }, gr);
    });
    [1, 10, 100, 1000].forEach(function (v) {
      var y = g.sy(v);
      DN.svg('line', { x1: m.l, x2: W - m.r, y1: y, y2: y, stroke: C.line }, gr);
      DN.svg('text', { x: m.l - 5, y: y + 3.5, 'text-anchor': 'end', 'font-size': 9.5, fill: C.dim, 'data-v': v, class: 'w07b-yt' }, gr);
    });
    DN.svg('line', { x1: m.l, x2: W - m.r, y1: H - m.b, y2: H - m.b, stroke: C.ink }, s);
    DN.svg('line', { x1: m.l, x2: m.l, y1: m.t, y2: H - m.b, stroke: C.ink }, s);
    g.xt = DN.svg('text', { x: m.l, y: H - m.b + 30, 'font-size': 10.5, fill: C.ink, 'font-weight': 700 }, s);
    g.xa = DN.svg('text', { x: m.l, y: H - m.b + 44, 'font-size': 9.5, fill: C.dim }, s);
    g.xb = DN.svg('text', { x: W - m.r, y: H - m.b + 44, 'font-size': 9.5, fill: C.dim, 'text-anchor': 'end' }, s);
    g.yt = DN.svg('text', { x: m.l - 34, y: m.t - 9, 'font-size': 10.5, fill: C.ink, 'font-weight': 700 }, s);
    if (P.key === 'd2') {
      var f = FIT.d2, xa = 0.04, xb = 600;
      DN.svg('line', { x1: g.sx(xa), y1: g.sy(Math.pow(10, f.a + f.b * lg(xa))), x2: g.sx(xb), y2: g.sy(Math.pow(10, f.a + f.b * lg(xb))), stroke: C.dopa, 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }, s);
      g.out = DN.svg('text', { 'font-size': 9.5, fill: C.dim, 'font-style': 'italic', class: 'w07b-halo', 'text-anchor': 'end' }, s);
    }
    g.pts = DATA.map(function (p, i) {
      var o = { gr: DN.svg('g', { tabindex: 0, role: 'button', class: 'w07b-pt' }, s) };
      var x = g.sx(p[P.key]), y = g.sy(p.dose), y1 = g.sy(p.lo), y2 = g.sy(p.hi);
      DN.svg('line', { x1: x, x2: x, y1: y1, y2: y2, stroke: C.ink, opacity: 0.45 }, o.gr);
      DN.svg('line', { x1: x - 3, x2: x + 3, y1: y1, y2: y1, stroke: C.ink, opacity: 0.45 }, o.gr);
      DN.svg('line', { x1: x - 3, x2: x + 3, y1: y2, y2: y2, stroke: C.ink, opacity: 0.45 }, o.gr);
      DN.svg('circle', { cx: x, cy: y, r: 14, fill: 'transparent' }, o.gr);
      o.dot = DN.svg('circle', { cx: x, cy: y, r: 5.5, stroke: C.ink, 'stroke-width': 1.5 }, o.gr);
      var la = P.key === 'd2' ? LAB.d2[p.n] : LAB.htMob[p.n] || LAB.ht[p.n];
      o.lab = DN.svg('text', { x: x + la[0], y: y + la[1], 'text-anchor': la[2], 'font-size': 9.5, fill: C.ink, class: 'w07b-lab' }, o.gr);
      o.x = x; o.y = y;
      function show() { P.hover = i; draw(P); }
      function hide() { if (P.hover === i) { P.hover = -1; draw(P); } }
      o.gr.addEventListener('mouseenter', show); o.gr.addEventListener('mouseleave', hide);
      o.gr.addEventListener('focus', show); o.gr.addEventListener('blur', hide);
      o.gr.addEventListener('click', function (e) { e.stopPropagation(); P.hover = P.hover === i ? -1 : i; draw(P); });
      return o;
    });
    s.addEventListener('click', function () { if (P.hover >= 0) { P.hover = -1; draw(P); } });
    axisText(P);
  }

  function axisText(P) {
    var g = P.g;
    g.s.querySelectorAll('.w07b-xt').forEach(function (t) { var v = +t.getAttribute('data-v'); t.textContent = v < 1 ? DN.fmt(v, 1) : DN.fmt(v); });
    g.s.querySelectorAll('.w07b-yt').forEach(function (t) { t.textContent = DN.fmt(+t.getAttribute('data-v')); });
    g.xt.textContent = P.key === 'd2' ? L('afinidade pelo D2, Ki (nM)', 'D2 affinity, Ki (nM)') : L('afinidade pelo 5-HT2A, Ki (nM)', '5-HT2A affinity, Ki (nM)');
    g.xa.textContent = L('← prende mais forte', '← binds tighter');
    g.xb.textContent = L('mais fraco →', 'weaker →');
    g.yt.textContent = L('dose diária (mg)', 'daily dose (mg)');
    if (g.out) {
      var cp = DATA[5];
      g.out.textContent = L('fora da reta', 'off the line');
      g.out.setAttribute('x', g.sx(cp.d2) - 10); g.out.setAttribute('y', g.sy(cp.dose) + 12);
    }
    g.s.setAttribute('aria-label', (P.key === 'd2'
      ? L('Dose diária de oito antipsicóticos contra a afinidade pelo receptor D2, em escala log-log. Os pontos seguem uma diagonal.', 'Daily dose of eight antipsychotics against D2 receptor affinity, log-log. The points follow a diagonal.')
      : L('Dose diária dos mesmos oito remédios contra a afinidade pelo receptor de serotonina 5-HT2A. Os pontos formam uma nuvem.', 'Daily dose of the same eight drugs against 5-HT2A serotonin receptor affinity. The points form a cloud.')));
  }

  function draw(P) {
    var g = P.g;
    DATA.forEach(function (p, i) {
      var o = g.pts[i], hv = P.hover === i;
      o.lab.textContent = nm(p);
      o.dot.setAttribute('fill', hv ? C.dopa : (p.n === 'clorpromazina' ? C.paper : C.ink));
      o.dot.setAttribute('stroke', hv ? C.dopa : C.ink);
      o.lab.setAttribute('font-weight', hv ? 700 : 400);
      o.gr.setAttribute('aria-label', nm(p) + ': ' + p.lo + L(' a ', ' to ') + p.hi + L(' mg por dia; Ki D2 ', ' mg per day; D2 Ki ') + num(p.d2) + ' nM; Ki 5-HT2A ' + num(p.ht) + ' nM');
    });
    var tip = P.tip;
    if (P.hover >= 0) {
      var p = DATA[P.hover], o = g.pts[P.hover];
      var kiKey = P.key === 'd2' ? 'D2' : '5-HT2A', ki = P.key === 'd2' ? p.d2 : p.ht;
      tip.innerHTML = '<b>' + nm(p) + '</b><br>' + L('dose: ', 'dose: ') + rng(p) + ' mg/' + L('dia', 'day') + '<br>Ki ' + kiKey + ': ' + num(ki) + ' nM' + (P.key === 'ht' ? ' (' + L('aprox.', 'approx.') + ')' : '');
      tip.style.display = 'block';
      var sc = P.holder.clientWidth / g.W, th = tip.offsetHeight, tw = tip.offsetWidth;
      var left = o.x * sc + 12, top = o.y * sc - th - 12;
      if (top < 0) top = o.y * sc + 14;
      if (left + tw > P.holder.clientWidth - 4) left = o.x * sc - tw - 12;
      tip.style.left = Math.max(0, left) + 'px'; tip.style.top = Math.max(0, top) + 'px';
    } else tip.style.display = 'none';
  }

  function buildAll() { panels.forEach(function (P) { build(P); draw(P); }); }
  buildAll(); relabel();
  DN.onLang(relabel);
  var rt, lw = grid.clientWidth;
  window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(function () { if (grid.clientWidth !== lw) { lw = grid.clientWidth; buildAll(); relabel(); } }, 150);
  });
})();
