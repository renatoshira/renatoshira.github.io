/* w12b · o-funil-das-apostas : 1,000 people (500 on mobile) flowing from a grid into a funnel */
(function () {
  'use strict';
  var root = DN.body('w12b'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, RM = DN.RM, C = DN.COL;
  var DARK = '#1c1e5c';

  root.innerHTML = '';
  var stage = DN.el('div', { 'class': 'w12b-stage' }, root);
  var cv = DN.el('canvas', { role: 'img' }, stage);
  var aside = DN.el('aside', { 'class': 'w12b-aside' }, stage);
  /* income bands side by side: share of bettors at risky or problem levels */
  var inc = DN.el('div', { 'class': 'w12b-inc' }, root);
  var live = DN.el('div', { 'class': 'sr' }, root);
  var take = DN.el('p', { 'class': 'w12b-take' }, root);

  /* ---------- model ---------- */
  var N, cols, rows, mob, mode = 'all', dots = [], G = {};
  function counts(m) {
    var k = N / 1000, bet = Math.round(174 * k);
    if (m === 'all') return { bet: bet, risk: Math.round(68 * k), dis: Math.round(8 * k) };
    return { bet: bet, risk: Math.round(bet * (m === 'low' ? 0.528 : 0.211)), dis: 0 };
  }
  /* seeded shuffle so the holes in the grid are stable */
  function rng(seed) { return function () { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }; }

  function build() {
    var W = Math.max(280, Math.round(root.clientWidth || 600));
    mob = W < 560;
    N = mob ? 500 : 1000; cols = mob ? 25 : 50; rows = N / cols;
    var s = Math.min(mob ? 13 : 14, Math.floor((W - 4) / cols));
    G = { W: W, s: s, r: s * 0.31, gx: Math.round((W - cols * s) / 2) + s / 2, gy: 30 };
    G.gh = rows * s;
    G.fy = G.gy + G.gh + 64;
    G.tc = mob ? [11, 6, 2] : [20, 11, 4];
    G.cx = G.gx - s / 2 + G.tc[0] * s / 2;
    G.H = G.fy + 13 * s + 16 + 24;
    var r = rng(17), idx = [];
    for (var i = 0; i < N; i++) idx.push(i);
    for (i = N - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
    var bet = counts('all').bet;
    dots = [];
    for (i = 0; i < N; i++) {
      var hx = G.gx + (i % cols) * s, hy = G.gy + Math.floor(i / cols) * s + s / 2;
      dots.push({ hx: hx, hy: hy, x: hx, y: hy, rank: -1, cat: 'non', col: C.mid });
    }
    for (i = 0; i < bet; i++) dots[idx[i]].rank = i;
  }
  function catFor(rank, m) {
    var c = counts(m);
    if (rank < 0) return 'non';
    if (rank < c.dis) return 'dis';
    if (rank < c.risk) return 'risk';
    return 'bet';
  }
  function colFor(cat) { return cat === 'non' ? C.mid : cat === 'bet' ? C.dopa : cat === 'risk' ? C.pausa : DARK; }

  /* funnel layout for a mode: tiers stacked, each centered at G.cx */
  function layout(m) {
    var c = counts(m), n = [c.bet - c.risk, c.risk - c.dis, c.dis], s = G.s, y = G.fy, tiers = [];
    for (var t = 0; t < 3; t++) {
      var tc = G.tc[t], rws = Math.ceil(n[t] / tc);
      tiers.push({ y0: y, y1: y + rws * s, w: tc * s, n: n[t] });
      if (n[t]) y += rws * s + 8;
    }
    var pos = {}, counters = [0, 0, 0];
    dots.forEach(function (d) {
      if (d.rank < 0) return;
      var cat = catFor(d.rank, m), t = cat === 'bet' ? 0 : cat === 'risk' ? 1 : 2, k = counters[t]++;
      var tc = G.tc[t];
      var inRow = Math.min(tc, tiers[t].n - Math.floor(k / tc) * tc);
      var x0 = G.cx - (inRow * s) / 2 + s / 2;
      pos[d.rank] = { x: x0 + (k % tc) * s, y: tiers[t].y0 + Math.floor(k / tc) * s + s / 2, cat: cat };
    });
    return { pos: pos, tiers: tiers, c: c };
  }

  /* ---------- drawing ---------- */
  var ctx, cur = null, flowed = false;
  function hexA(h, a) {
    var v = parseInt(h.slice(1), 16);
    return 'rgba(' + (v >> 16) + ',' + ((v >> 8) & 255) + ',' + (v & 255) + ',' + a + ')';
  }
  function draw() {
    var W = G.W, s = G.s;
    ctx.clearRect(0, 0, W, G.H);
    ctx.font = '10.5px "Space Mono", monospace';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = C.dim;
    ctx.fillText(mob ? L('500 pontos · cada um = 2 em 1.000 pessoas', '500 dots · each = 2 in 1,000 people') : L('1.000 pessoas com 14 anos ou mais · cada ponto = 1 pessoa', '1,000 people aged 14 or older · each dot = 1 person'), G.gx - s / 2, 16);
    /* holes left in the grid by the bettors */
    if (flowed) {
      ctx.strokeStyle = hexA(C.mid, 0.35); ctx.lineWidth = 1;
      dots.forEach(function (d) { if (d.rank >= 0) { ctx.beginPath(); ctx.arc(d.hx, d.hy, G.r, 0, 6.2832); ctx.stroke(); } });
    }
    dots.forEach(function (d) {
      ctx.fillStyle = d.rank < 0 ? hexA(C.mid, 0.5) : d.col;
      ctx.beginPath(); ctx.arc(d.x, d.y, d.rank < 0 ? G.r * 0.85 : G.r * 1.1, 0, 6.2832); ctx.fill();
    });
    if (flowed && cur) drawLabels(cur);
  }
  function drawLabels(lay) {
    var s = G.s, tiers = lay.tiers;
    ctx.font = '10.5px "Space Mono", monospace';
    var lx = G.cx + G.tc[0] * s / 2 + 14;
    ctx.fillStyle = C.dim;
    ctx.fillText(mode === 'all' ? L('quem aposta · cada camada inclui as de baixo', 'people who bet · each layer includes those below') : L('os mesmos apostadores, na proporção da renda', 'the same bettors, at that income band\'s share'), G.gx - s / 2, G.fy - 22);
    function lab(t, l1, l2, col) {
      if (!tiers[t].n) return;
      var y = (tiers[t].y0 + tiers[t].y1) / 2;
      ctx.strokeStyle = C.line; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(G.cx + tiers[t].w / 2 + 4, y); ctx.lineTo(lx - 4, y); ctx.stroke();
      ctx.fillStyle = col; ctx.font = 'bold 10.5px "Space Mono", monospace';
      ctx.fillText(l1, lx, y - 2);
      ctx.fillStyle = C.dim; ctx.font = '10.5px "Space Mono", monospace';
      ctx.fillText(l2, lx, y + 12);
    }
    /* labels always speak per 1,000 people, whatever the dot count */
    var per = { all: 68, low: Math.round(174 * 0.528), high: Math.round(174 * 0.211) };
    lab(0, L('apostam: ', 'bet: ') + fmt(174), fmt(17.4, 1) + L('% da população', '% of the population'), C.ink);
    if (mode === 'all') {
      lab(1, L('de forma arriscada: ', 'at risky levels: ') + fmt(68), fmt(6.8, 1) + L('% da população', '% of the population'), C.pausa);
      lab(2, L('transtorno do jogo: ', 'gambling disorder: ') + fmt(8), fmt(0.8, 1) + L('%, cerca de 1,4 milhão', '%, about 1.4 million'), DARK);
    } else {
      lab(1, L('arriscada ou problemática', 'risky or problem'), (mob ? '' : fmt(per[mode]) + ' · ') + fmt(mode === 'low' ? 52.8 : 21.1, 1) + L('% dos apostadores', '% of bettors'), C.pausa);
    }
  }

  /* ---------- animation ---------- */
  var raf = 0;
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function animateTo(targets, dur, stagger, done) {
    dots.forEach(function (d) { d.sx = d.x; d.sy = d.y; d.sc = d.col; });
    var t0 = performance.now(), total = dur + stagger;
    cancelAnimationFrame(raf);
    function step(now) {
      var el = now - t0, all = true;
      dots.forEach(function (d, i) {
        var tg = targets[i]; if (!tg) return;
        var delay = d.rank >= 0 ? (d.rank / (counts('all').bet || 1)) * stagger : 0;
        var p = DN.clamp((el - delay) / dur, 0, 1); if (p < 1) all = false;
        var e = ease(p);
        d.x = d.sx + (tg.x - d.sx) * e; d.y = d.sy + (tg.y - d.sy) * e;
        d.col = p > 0.5 ? tg.col : d.sc;
      });
      draw();
      if (!all && el < total + 100) raf = requestAnimationFrame(step);
      else { snap(targets); if (done) done(); }
    }
    raf = requestAnimationFrame(step);
  }
  function snap(targets) {
    dots.forEach(function (d, i) { var tg = targets[i]; if (tg) { d.x = tg.x; d.y = tg.y; d.col = tg.col; } });
    draw();
  }
  function targetsFor(m, inGrid) {
    var lay = layout(m);
    return {
      lay: lay, t: dots.map(function (d) {
        if (d.rank < 0) return { x: d.hx, y: d.hy, col: C.mid };
        var p = lay.pos[d.rank];
        return inGrid ? { x: d.hx, y: d.hy, col: colFor(p.cat) } : { x: p.x, y: p.y, col: colFor(p.cat) };
      })
    };
  }

  function setMode(m, user) {
    mode = m;
    var tg = targetsFor(m, !flowed);
    cur = tg.lay;
    if (RM || !user) snap(tg.t);
    else animateTo(tg.t, flowed ? 600 : 300, flowed ? 250 : 0);
    if (user) live.textContent = msg();
  }
  function msg() {
    if (mode === 'all') return L('Em cada 1.000 pessoas com 14 anos ou mais, 174 apostam, 68 apostam de forma arriscada e 8 têm padrão compatível com transtorno do jogo.', 'In every 1,000 people aged 14 or older, 174 bet, 68 bet at risky levels and 8 show a pattern consistent with gambling disorder.');
    if (mode === 'low') return L('Na renda de até 1 salário mínimo, 52,8% dos apostadores apostam de forma arriscada ou problemática.', 'With income up to 1 minimum wage, 52.8% of bettors bet at risky or problem levels.');
    return L('Na renda de 2 salários mínimos ou mais, 21,1% dos apostadores apostam de forma arriscada ou problemática.', 'With income of 2 minimum wages or more, 21.1% of bettors bet at risky or problem levels.');
  }

  function flow() {
    if (flowed) return;
    flowed = true;
    var tg = targetsFor(mode, false);
    cur = tg.lay;
    if (RM) { snap(tg.t); return; }
    animateTo(tg.t, 800, 700);
  }

  function render() {
    build();
    var f = DN.fitCanvas(cv, G.H);
    ctx = f.ctx;
    aside.style.top = mob ? '' : (G.fy - 4) + 'px';
    var tg = targetsFor(mode, !flowed);
    cur = tg.lay;
    snap(tg.t);
  }

  function relabel() {
    take.textContent = L('Quase um em cada cinco brasileiros aposta. Entre os apostadores mais pobres, mais da metade aposta de forma arriscada, contra um em cada cinco na renda mais alta.',
      'Almost one in five Brazilians bets. Among the poorest bettors, more than half bet at risky levels, against one in five in the higher income band.');
    var bands = [[52.8, L('até 1 salário mínimo', 'up to 1 minimum wage')], [21.1, L('2 salários mínimos ou mais', '2+ minimum wages')]];
    inc.innerHTML = '<div class="w12b-it">' + L('Entre os apostadores, a parte que aposta de forma arriscada ou problemática, por renda', 'Among bettors, the share who bet at risky or problem levels, by income') + '</div>' +
      bands.map(function (b) {
        return '<div class="w12b-row"><div class="w12b-rl">' + b[1] + '</div><div class="w12b-bar" role="img" aria-label="' + fmt(b[0], 1) + '%"><i style="width:' + b[0] + '%"></i></div><div class="w12b-rv">' + fmt(b[0], 1) + '%</div></div>';
      }).join('');
    cv.setAttribute('aria-label', L(
      'Grade de 1.000 pontos. 174 apostadores saem da grade para um funil: 106 só apostam, 60 apostam de forma arriscada e 8 têm transtorno do jogo. Na renda de até 1 salário mínimo, 52,8% dos apostadores apostam de forma arriscada; na de 2 salários ou mais, 21,1%.',
      'Grid of 1,000 dots. 174 bettors leave the grid for a funnel: 106 only bet, 60 bet at risky levels and 8 have gambling disorder. With income up to 1 minimum wage, 52.8% of bettors bet at risky levels; with 2 minimum wages or more, 21.1%.'));
    aside.innerHTML =
      '<div class="w12b-big">' + L('R$ 3 bilhões', 'R$ 3 billion') + '</div>' +
      '<p>' + L('enviados por Pix a sites de apostas por 5 milhões de beneficiários do Bolsa Família, só em agosto de 2024.', 'sent by Pix to betting sites by 5 million Bolsa Família recipients, in August 2024 alone.') + '</p>' +
      '<p class="w12b-src">' + L('Banco Central. Conta só Pix e não desconta prêmios.', 'Central Bank of Brazil. Counts Pix only and does not net out winnings.') + '</p>';
    render();
    live.textContent = msg();
  }
  relabel();
  DN.onLang(relabel);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { draw(); });
  DN.onVisible(cv, function (v) { if (v) setTimeout(flow, RM ? 0 : 500); }, { once: true, threshold: 0.35 });
  var rt = 0, lastW = root.clientWidth;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { if (Math.abs(root.clientWidth - lastW) > 2) { lastW = root.clientWidth; cancelAnimationFrame(raf); render(); } }, 150);
  });
})();
