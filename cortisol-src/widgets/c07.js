/* c07 · colha-de-novo : one simulated healthy person, one saliva sample per morning, against the CIRCORT range */
(function () {
  'use strict';
  var root = DN.body('c07'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, S = DN.svg, E = DN.el, C = DN.COL;

  /* CIRCORT, women 21 to 30, 1 h after waking (Miller 2016): P5 2.1, median 7.5, P95 26.7 nmol/L.
     Lognormal fit: sigma_total = ln(26.7/2.1) / 3.29 = 0.773. Variance shares from Table 2: 54% within person, 23% between.
     Within-person sigma = sqrt(0.54) * 0.773 = 0.568, about 2.3 times the between-person variance. */
  var P5 = 2.1, P50 = 7.5, P95 = 26.7, SIG = Math.log(P95 / P5) / (2 * 1.645);
  var SW = Math.sqrt(0.54) * SIG;
  var MU = 6.4;               /* this person's own median, a little below the population median */
  var FIRST = 20.2;           /* fixed first morning, near the 90th percentile of the range */
  var DECAY = 0.004;          /* per minute of late sampling, from the CIRCORT medians at 1 h and 3.5 h */
  var MAXN = 60, EXAMPLE = 14, WIN = 6;
  var Y0 = 1, Y1 = 40;

  var st = { pts: [], avg: true, example: true };

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
  var R = rng(2016);
  function gauss(r) { var u = 1 - r(), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function morning(r) {
    var delay = r() * 15;
    var v = MU * Math.exp(SW * gauss(r) - DECAY * delay);
    return { v: Math.max(0.6, Math.min(60, v)), delay: delay };
  }
  function first() { return { v: FIRST, delay: 0 }; }
  function phi(z) { /* standard normal cdf */
    var t = 1 / (1 + 0.2316419 * Math.abs(z)), d = 0.3989423 * Math.exp(-z * z / 2);
    var p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return z > 0 ? 1 - p : p;
  }
  function pct(v) { return Math.round(100 * phi((Math.log(v) - Math.log(P50)) / SIG)); }
  function ord(n) { var t = n % 100, u = n % 10; return n + ((t > 10 && t < 14) ? 'th' : u === 1 ? 'st' : u === 2 ? 'nd' : u === 3 ? 'rd' : 'th'); }
  function gmean(a) { return Math.exp(a.reduce(function (s, p) { return s + Math.log(p.v); }, 0) / a.length); }

  /* ---------- risograph saliva tube (technique from dopamina-src/widgets/w00.js) ---------- */
  var INKS = [
    { k: 'a', col: C.alta, ang: 15, op: 0.95, mx: 0.7, my: -0.6 },
    { k: 'b', col: C.baixa, ang: 75, op: 0.93, mx: -0.8, my: 0.7 }
  ];
  function riso(id, vb, art, seed) {
    var r = rng(seed), defs = '', layers = '';
    INKS.forEach(function (ink) {
      var p = id + '-' + ink.k;
      [0.55, 0.85, 1.1].forEach(function (rr, j) {
        defs += '<pattern id="' + p + 'h' + (j + 1) + '" width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.2" cy="1.2" r="' + rr + '" fill="' + ink.col + '"/></pattern>';
      });
      defs += '<filter id="' + p + 'g" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="2" seed="' + ((r() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="2" seed="' + ((r() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.8 0 0 0 2.4" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
      var body = art[ink.k].replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#' + p + 'h$1)');
      layers += '<g class="c07-ink c07-ink-' + ink.k + '" transform="translate(' + ink.mx + ' ' + ink.my + ')" opacity="' + ink.op + '" filter="url(#' + p + 'g)">' + body + '</g>';
    });
    return '<svg class="c07-tube" viewBox="' + vb.join(' ') + '" aria-hidden="true" focusable="false"><defs>' + defs + '</defs>' + layers + '</svg>';
  }
  /* a saliva collection tube: cap, clear tube, cotton swab inside, a little sample at the bottom */
  var TUBE = {
    a: '<rect x="7" y="2" width="18" height="11" rx="2" fill="$0"/><path d="M9,4 v7 M13,4 v7 M17,4 v7 M21,4 v7" stroke="#fff" stroke-width="1" class="c07-ps"/>' +
      '<path d="M10.5,48 h11 v5 a5.5,5 0 0 1 -11,0Z" fill="$2"/>',
    b: '<path d="M9,13 h14 v40 a7,6.5 0 0 1 -14,0Z" fill="none" stroke="$0" stroke-width="1.8"/><rect x="8" y="12" width="16" height="3" fill="$0"/>' +
      '<rect x="11.5" y="16" width="9" height="22" rx="3" fill="$1"/><path d="M12,22 h8 M12,28 h8" stroke="$0" stroke-width=".8" opacity=".6"/>' +
      '<path d="M11,40 h10" stroke="$0" stroke-width="1"/>'
  };

  /* ---------- DOM ---------- */
  var head = E('p', { class: 'c07-head' }, root);
  var box = E('div', { class: 'c07-chart' }, root);
  var key = E('div', { class: 'c07-key' }, root);
  var ctr = E('div', { class: 'c07-ctr' }, root);
  var tube = E('div', { class: 'c07-tubew' }, ctr);
  tube.innerHTML = riso('c07-t', [0, 0, 32, 62], TUBE, 77);
  var addB = E('button', { class: 'btn solid c07-add', type: 'button' }, ctr);
  var avgB = E('button', { class: 'btn c07-avg', type: 'button', 'aria-pressed': 'true' }, ctr);
  var rstB = E('button', { class: 'btn c07-rst', type: 'button' }, ctr);
  var count = E('div', { class: 'c07-count' }, ctr);
  var live = E('p', { class: 'live c07-live', 'aria-live': 'polite' }, root);
  var take = E('p', { class: 'c07-take' }, root);

  var G = {}, sv, gPts, gHist, gAvg, gMed, aria;

  function layout() {
    while (box.firstChild) box.removeChild(box.firstChild);
    var W = box.clientWidth || 600, mob = W < 480;
    var m = { l: mob ? 40 : 46, t: 22, b: 30 };
    var hw = mob ? 44 : 78, cw = mob ? 46 : 70, gap = mob ? 8 : 14;
    var ph = mob ? 280 : 320;
    var H = m.t + ph + m.b;
    var px1 = W - hw - cw - gap * 2;
    G = { W: W, mob: mob, m: m, ph: ph, H: H, px0: m.l, px1: px1, cx0: px1 + gap, cx1: px1 + gap + cw, hx0: W - hw, hx1: W };
    sv = S('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, role: 'img' }, box);
    aria = sv;
    var y = G.y = function (v) { return m.t + ph - (Math.log(v) - Math.log(Y0)) / (Math.log(Y1) - Math.log(Y0)) * ph; };
    /* band 5th to 95th percentile and median */
    S('rect', { x: m.l, y: y(P95), width: px1 - m.l, height: y(P5) - y(P95), class: 'c07-band' }, sv);
    S('line', { x1: m.l, x2: px1, y1: y(P95), y2: y(P95), class: 'c07-bandl' }, sv);
    S('line', { x1: m.l, x2: px1, y1: y(P5), y2: y(P5), class: 'c07-bandl' }, sv);
    S('line', { x1: m.l, x2: px1, y1: y(P50), y2: y(P50), class: 'c07-pmed' }, sv);
    S('line', { x1: m.l, x2: m.l, y1: m.t, y2: m.t + ph, class: 'c07-axis' }, sv);
    [[1, '1'], [P5, fmt(P5, 1)], [P50, fmt(P50, 1)], [P95, fmt(P95, 1)], [40, '40']].forEach(function (q) {
      S('line', { x1: m.l - 4, x2: m.l, y1: y(q[0]), y2: y(q[0]), class: 'c07-axis' }, sv);
      var t = S('text', { x: m.l - 7, y: y(q[0]), 'text-anchor': 'end', 'dominant-baseline': 'central', class: 'c07-tick' + (q[0] === P50 || q[0] === P5 || q[0] === P95 ? ' c07-tb' : '') }, sv);
      t.textContent = q[1];
    });
    S('text', { x: 0, y: 10, class: 'c07-tick' }, sv).textContent = 'nmol/L';
    var bl = S('text', { x: m.l + 6, y: y(P95) - 6, class: 'c07-bandt' }, sv);
    bl.textContent = L('95º percentil', '95th percentile');
    S('text', { x: m.l + 6, y: y(P5) + 13, class: 'c07-bandt' }, sv).textContent = L('5º percentil', '5th percentile');
    S('text', { x: px1, y: m.t + ph + 18, 'text-anchor': 'end', class: 'c07-tick' }, sv).textContent = L('manhãs, uma amostra por dia →', 'mornings, one sample a day →');
    S('line', { x1: m.l, x2: px1, y1: m.t + ph, y2: m.t + ph, class: 'c07-axis' }, sv);

    /* comparison column: device error against day to day variation, to scale, centered on the person's median */
    var cx = (G.cx0 + G.cx1) / 2;
    S('text', { x: cx, y: m.t - 8, 'text-anchor': 'middle', class: 'c07-tick c07-tb' }, sv).textContent = L('tamanhos', 'sizes');
    var dLo = MU * Math.exp(-1.645 * SW), dHi = MU * Math.exp(1.645 * SW);
    S('rect', { x: cx - 13, y: y(dHi), width: 12, height: y(dLo) - y(dHi), class: 'c07-dayb' }, sv);
    S('rect', { x: cx + 5, y: y(MU * 1.03), width: 6, height: Math.max(1.5, y(MU / 1.03) - y(MU * 1.03)), class: 'c07-devb' }, sv);
    S('text', { x: cx - 7, y: y(dLo) + 12, 'text-anchor': 'middle', class: 'c07-tick c07-sm' }, sv).textContent = L('dia', 'day');
    S('text', { x: cx + 8, y: y(MU) - 10, 'text-anchor': 'middle', class: 'c07-tick c07-sm c07-tv' }, sv).textContent = '3%';

    /* histogram column */
    S('line', { x1: G.hx0, x2: G.hx0, y1: m.t, y2: m.t + ph, class: 'c07-axis' }, sv);
    S('text', { x: G.hx0, y: m.t - 8, class: 'c07-tick c07-tb' }, sv).textContent = L('contagem', 'count');
    gHist = S('g', null, sv);
    gMed = S('g', { class: 'c07-med' }, sv);
    gAvg = S('g', { class: 'c07-avgg' }, sv);
    gPts = S('g', null, sv);
  }

  var NB = 16;
  function bin(v) { var f = (Math.log(v) - Math.log(Y0)) / (Math.log(Y1) - Math.log(Y0)); return Math.max(0, Math.min(NB - 1, Math.floor(f * NB))); }
  function slots() { return Math.max(EXAMPLE + 1, st.pts.length); }
  function px(i) { var n = slots(); return G.px0 + 10 + (i + 0.5) / n * (G.px1 - G.px0 - 14); }

  function drawAll(animateIdx, drawAvg) {
    while (gPts.firstChild) gPts.removeChild(gPts.firstChild);
    while (gHist.firstChild) gHist.removeChild(gHist.firstChild);
    while (gMed.firstChild) gMed.removeChild(gMed.firstChild);
    while (gAvg.firstChild) gAvg.removeChild(gAvg.firstChild);
    var y = G.y, n = st.pts.length, r = G.mob ? 3.6 : 4.2;
    gPts.setAttribute('class', st.avg && n >= WIN ? 'c07-dim' : '');
    /* person's own median, hidden until the 10th sample */
    if (n >= 10) {
      S('line', { x1: G.px0, x2: G.px1, y1: y(MU), y2: y(MU), class: 'c07-mu' }, gMed);
      var t = S('text', { x: G.px0 + 8, y: y(MU) + 14, class: 'c07-mut c07-halo' }, gMed);
      t.textContent = L('mediana desta pessoa: ', 'this person’s median: ') + fmt(MU, 1);
    }
    st.pts.forEach(function (p, i) {
      var g = S('g', { class: 'c07-pt' + (i === n - 1 ? ' c07-last' : '') }, gPts);
      g.style.transform = 'translate(' + px(i).toFixed(1) + 'px,' + y(p.v).toFixed(1) + 'px)';
      var e = y(p.v / 1.03) - y(p.v * 1.03);
      S('rect', { x: -1, y: -e / 2, width: 2, height: Math.max(1, e), class: 'c07-err' }, g);
      S('circle', { r: r, class: 'c07-dot' }, g);
      if (i === animateIdx && !DN.RM) {
        g.animate([{ transform: 'translate(' + px(i).toFixed(1) + 'px,' + G.m.t + 'px)', opacity: 0 }, { transform: g.style.transform, opacity: 1 }],
          { duration: 450, easing: 'cubic-bezier(.5,0,.7,1)' });
      }
    });
    /* histogram blocks */
    var cnt = [], bh = G.ph / NB, maxW = G.hx1 - G.hx0 - 2;
    var maxc = 1; st.pts.forEach(function (p) { var b = bin(p.v); cnt[b] = (cnt[b] || 0) + 1; maxc = Math.max(maxc, cnt[b]); });
    var bw = Math.min(G.mob ? 5 : 6, (maxW - maxc) / maxc), seenB = [];
    st.pts.forEach(function (p, i) {
      var b = bin(p.v), k = seenB[b] = (seenB[b] || 0) + 1;
      var top = G.m.t + G.ph - (b + 1) * bh;
      var rc = S('rect', { x: G.hx0 + 2 + (k - 1) * (bw + 1), y: top + 1, width: bw, height: bh - 2, class: 'c07-blk' + (i === animateIdx ? ' c07-new' : '') }, gHist);
      if (i === animateIdx && !DN.RM) rc.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, delay: 420, fill: 'backwards' });
    });
    /* 6 day rolling geometric mean */
    if (st.avg && n >= WIN) {
      var d = '';
      for (var i = WIN - 1; i < n; i++) d += (d ? 'L' : 'M') + px(i).toFixed(1) + ',' + y(gmean(st.pts.slice(i - WIN + 1, i + 1))).toFixed(1);
      var pa = S('path', { d: d, class: 'c07-avgl' }, gAvg);
      st.lastAvg = gmean(st.pts.slice(n - WIN));
      if (drawAvg && !DN.RM) {
        var len = pa.getTotalLength();
        pa.style.strokeDasharray = len;
        pa.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 900, easing: 'cubic-bezier(.2,.7,.2,1)' }).onfinish = function () { pa.style.strokeDasharray = ''; };
      }
    }
    var vals = st.pts.map(function (p) { return p.v; });
    aria.setAttribute('aria-label', L('Gráfico em escala logarítmica de 1 a 40 nmol/L com a faixa normal de 2,1 a 26,7 e a mediana 7,5. ', 'Log scale chart from 1 to 40 nmol/L with the normal range from 2.1 to 26.7 and the median 7.5. ') +
      (n ? L(n + ' manhãs colhidas, de ', n + ' mornings sampled, from ') + fmt(Math.min.apply(null, vals), 1) + L(' a ', ' to ') + fmt(Math.max.apply(null, vals), 1) + ' nmol/L.' : L('Nenhuma manhã colhida.', 'No mornings sampled.')) +
      (n >= 10 ? L(' Mediana desta pessoa: 6,4.', ' This person’s median: 6.4.') : ''));
    var ka = key.querySelector('.c07-kavg');
    if (ka) ka.innerHTML = L('média de 6 manhãs', 'average of 6 mornings') + (st.avg && n >= WIN ? ': <b>' + fmt(st.lastAvg, 1) + ' nmol/L</b>' + L(' agora', ' now') : '');
    controls();
  }
  function controls() {
    var n = st.pts.length;
    addB.textContent = L('Colher hoje', 'Collect today');
    addB.disabled = n >= MAXN;
    avgB.textContent = L('Média de 6 dias', '6-day average');
    avgB.disabled = n < 10;
    avgB.setAttribute('aria-pressed', st.avg && n >= 10 ? 'true' : 'false');
    avgB.title = n < 10 ? L('Liga depois de 10 manhãs', 'Turns on after 10 mornings') : '';
    rstB.textContent = st.example ? L('Recomeçar do zero', 'Start from zero') : L('Recomeçar', 'Start over');
    count.innerHTML = L('manhãs colhidas: ', 'mornings sampled: ') + '<b>' + n + '</b>' + (st.example ? '<span>' + L(' (exemplo)', ' (example)') + '</span>' : '') +
      (n > 0 && n < 10 ? '<span>' + L(' · média a partir de 10', ' · average from 10') + '</span>' : '');
  }
  function texts() {
    head.innerHTML = L('Faixa normal do CIRCORT, mulheres de 21 a 30 anos, 1 hora depois de acordar: <b>2,1 a 26,7 nmol/L</b>, mediana 7,5.',
      'CIRCORT normal range, women aged 21 to 30, 1 hour after waking: <b>2.1 to 26.7 nmol/L</b>, median 7.5.');
    key.innerHTML = '<span><i class="c07-k c07-k-day"></i>' + L('variação do dia: 90% das manhãs desta pessoa', 'day to day variation: 90% of this person’s mornings') + '</span>' +
      '<span><i class="c07-k c07-k-dev"></i>' + L('erro do aparelho, se for de 3%', 'device error, if it is 3%') + '</span>' +
      '<span><i class="c07-k c07-k-avg"></i><span class="c07-kavg">' + L('média de 6 manhãs', 'average of 6 mornings') + '</span></span>';
    take.textContent = L('Num mesmo horário, a faixa normal vai de 2 a 27 nmol/L, e uma amostra sozinha pode cair em quase qualquer ponto dela. Por isso são precisos de 2 a 6 dias para enxergar a pessoa.',
      'At the same hour, the normal range runs from 2 to 27 nmol/L, and a single sample can land almost anywhere in it. That is why it takes 2 to 6 days to see the person.');
  }

  function example() {
    var r = rng(3017); /* chosen so the example's 6 day average ends near the person's median, as it does on average */
    st.pts = [first()];
    for (var i = 1; i < EXAMPLE; i++) st.pts.push(morning(r));
    st.avg = true; st.example = true;
  }
  addB.addEventListener('click', function () {
    if (st.pts.length >= MAXN) return;
    var p = st.pts.length === 0 ? first() : morning(Math.random);
    st.pts.push(p);
    var n = st.pts.length;
    drawAll(n - 1, false);
    var pc = pct(p.v);
    var msg = L('Manhã ' + n + ': ' + fmt(p.v, 1) + ' nmol/L, perto do percentil ' + pc + ' da faixa normal.', 'Morning ' + n + ': ' + fmt(p.v, 1) + ' nmol/L, near the ' + ord(pc) + ' percentile of the normal range.');
    if (n === 1) msg += L(' Parece alto, então colha de novo.', ' It looks high, so sample again.');
    if (n === 10) msg += L(' Apareceu a mediana desta pessoa, 6,4, e a média de 6 dias já pode ser ligada.', ' This person’s median has appeared, 6.4, and the 6-day average can now be turned on.');
    live.textContent = msg;
  });
  avgB.addEventListener('click', function () {
    st.avg = !st.avg;
    drawAll(-1, st.avg);
    live.textContent = st.avg ? L('Com a média de 6 dias ligada, a média fica perto da mediana da pessoa.', 'With the 6-day average on, the average stays near the person’s median.') : L('Média de 6 dias desligada.', '6-day average off.');
  });
  rstB.addEventListener('click', function () {
    st.pts = []; st.avg = false; st.example = false;
    drawAll(-1, false);
    live.textContent = L('A coleta recomeçou; toque em colher hoje para a primeira manhã.', 'The sampling started over; tap collect today for the first morning.');
    try { addB.focus(); } catch (e) {}
  });

  function render() { texts(); layout(); drawAll(-1, false); }
  example();
  render();
  DN.onLang(render);
  var rw = box.clientWidth, rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { if (box.clientWidth !== rw) { rw = box.clientWidth; layout(); drawAll(-1, false); } }, 150); });
  if (!DN.RM) DN.onVisible(box, function (v) { if (v && st.example && st.avg) drawAll(-1, true); }, { once: true, threshold: 0.5 });
})();
