/* c06a · um-milhao : a million people as a 1,000 x 1,000 field of dots, three loupes */
(function () {
  'use strict';
  var root = DN.body('c06a'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, S = DN.svg, E = DN.el, C = DN.COL;

  /* Groups on a 1,000 x 1,000 grid (one cell = one person).
     Oral corticosteroid now: 8,500 (UK, 0.85%, Fardet 2011) solid, extending to
     12,000 (US, 1.2%, Overman 2013) as a soft border. Autoimmune Addison: 144 (Norway,
     Erichsen 2009). New endogenous Cushing per year: 3 (3.2 per million, Wengander 2019). */
  var N = 1000;
  var CORT = { x: 590, y: 70, w: 100, core: 85, rows: 120 };   /* 100 x 85 = 8,500; 100 x 120 = 12,000 */
  var ADD = { x: 250, y: 470, s: 12 };                          /* 12 x 12 = 144 */
  var CUSH = [[706, 806], [711, 812], [702, 815]];               /* 3 people */
  /* loupe windows, in cells: [x0, y0, size] */
  var WIN = [
    [CORT.x - 5, CORT.y + CORT.core - 8, 16],
    [ADD.x - 2, ADD.y - 2, 16],
    [698, 802, 16]
  ];
  /* where the marker ring sits on the field (cells) and its radius (cells) */
  var MARK = [
    { x: CORT.x + CORT.w / 2, y: CORT.y + CORT.rows / 2, r: 86 },
    { x: ADD.x + ADD.s / 2, y: ADD.y + ADD.s / 2, r: 26 },
    { x: 706, y: 811, r: 22 }
  ];
  var INKS = { a: C.alta, b: C.baixa };

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

  /* the grey population: per-person alpha jitter, built once at 1,000 x 1,000 */
  var base = document.createElement('canvas');
  base.width = N; base.height = N;
  (function () {
    var bx = base.getContext('2d');
    var img = bx.createImageData(N, N), u = new Uint32Array(img.data.buffer), R = rng(1000000);
    for (var i = 0; i < N * N; i++) {
      var a = (40 + R() * 60) | 0;
      u[i] = (a << 24) | (0x8a << 16) | (0x8a << 8) | 0x8a;
    }
    bx.putImageData(img, 0, 0);
  })();
  /* who is in which group, for the loupes */
  function who(x, y) {
    if (x >= CORT.x && x < CORT.x + CORT.w && y >= CORT.y && y < CORT.y + CORT.rows) return y < CORT.y + CORT.core ? 'cort' : 'cort2';
    if (x >= ADD.x && x < ADD.x + ADD.s && y >= ADD.y && y < ADD.y + ADD.s) return 'add';
    for (var i = 0; i < CUSH.length; i++) if (CUSH[i][0] === x && CUSH[i][1] === y) return 'cush';
    return '';
  }

  /* ---------- DOM ---------- */
  var stage = E('div', { class: 'c06a-stage' }, root);
  var fw = E('div', { class: 'c06a-fw' }, stage);
  var cv = E('canvas', { class: 'c06a-field', role: 'img' }, fw);
  var mk = S('svg', { class: 'c06a-mk', 'aria-hidden': 'true' }, fw);
  var scale = E('div', { class: 'c06a-scale' }, fw);
  var list = E('ol', { class: 'c06a-list' }, stage);
  var leads = S('svg', { class: 'c06a-leads', 'aria-hidden': 'true' }, stage);
  var take = E('p', { class: 'c06a-take' }, root);

  var ITEMS = [
    { k: 'cort', col: C.altaTxt,
      num: function () { return L('cerca de 10.000', 'about 10,000'); },
      t: function () { return L('tomam corticoide oral agora', 'are taking an oral corticosteroid now'); },
      s: function () { return L('0,85% no Reino Unido (8.500), 1,2% nos EUA (12.000)', '0.85% in the UK (8,500), 1.2% in the US (12,000)'); },
      kind: function () { return L('quantos têm agora', 'how many have it now'); } },
    { k: 'add', col: C.baixa,
      num: function () { return '144'; },
      t: function () { return L('têm doença de Addison autoimune', 'have autoimmune Addison’s disease'); },
      s: function () { return L('Noruega', 'Norway'); },
      kind: function () { return L('quantos têm agora', 'how many have it now'); } },
    { k: 'cush', col: C.ink,
      num: function () { return '3'; },
      t: function () { return L('ganham Cushing produzido pelo próprio corpo a cada ano', 'develop Cushing’s made by their own body each year'); },
      s: function () { return L('3,2 por milhão, Suécia', '3.2 per million, Sweden'); },
      kind: function () { return L('quantos surgem por ano', 'how many new cases per year'); } }
  ];
  var lis = ITEMS.map(function (it, i) {
    var li = E('li', { class: 'c06a-it c06a-it' + i }, list);
    var lp = E('div', { class: 'c06a-lupe' }, li);
    var lc = E('canvas', { class: 'c06a-lc', 'aria-hidden': 'true' }, lp);
    var ring = S('svg', { class: 'c06a-ring', viewBox: '0 0 100 100', 'aria-hidden': 'true' }, lp);
    S('circle', { cx: 50.8, cy: 49.4, r: 48.4, class: 'c06a-ra' }, ring);
    S('circle', { cx: 49.2, cy: 50.6, r: 48.4, class: 'c06a-rb' }, ring);
    E('span', { class: 'c06a-no', 'aria-hidden': 'true' }, lp, String(i + 1));
    var tx = E('div', { class: 'c06a-tx' }, li);
    var num = E('b', { class: 'c06a-num' }, tx);
    var t = E('span', { class: 'c06a-t' }, tx);
    var s = E('span', { class: 'c06a-s' }, tx);
    var kind = E('span', { class: 'c06a-kind' }, tx);
    num.style.color = it.col;
    return { li: li, lc: lc, num: num, t: t, s: s, kind: kind };
  });

  var G = { stage: DN.RM ? 3 : -1 };

  /* ---------- drawing ---------- */
  function drawField() {
    var side = G.side, dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(side * dpr); cv.height = Math.round(side * dpr);
    cv.style.width = side + 'px'; cv.style.height = side + 'px';
    var ctx = cv.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(base, 0, 0, cv.width, cv.height);
    var k = cv.width / N;
    ctx.setTransform(k, 0, 0, k, 0, 0);
    if (G.stage >= 0) {
      ctx.fillStyle = 'rgba(232,85,62,.42)';
      ctx.fillRect(CORT.x, CORT.y + CORT.core, CORT.w, CORT.rows - CORT.core);
      ctx.fillStyle = C.alta;
      ctx.fillRect(CORT.x, CORT.y, CORT.w, CORT.core);
    }
    if (G.stage >= 1) { ctx.fillStyle = C.baixa; ctx.fillRect(ADD.x, ADD.y, ADD.s, ADD.s); }
    if (G.stage >= 2) { ctx.fillStyle = C.ink; CUSH.forEach(function (p) { ctx.fillRect(p[0], p[1], 1, 1); }); }
  }
  function drawLupe(i) {
    var lc = lis[i].lc, d = G.lupe, dpr = Math.min(window.devicePixelRatio || 1, 2);
    lc.width = Math.round(d * dpr); lc.height = Math.round(d * dpr);
    lc.style.width = d + 'px'; lc.style.height = d + 'px';
    var ctx = lc.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, d, d);
    var w = WIN[i], n = w[2], cell = d / n, R = rng(77 + i);
    for (var yy = 0; yy < n; yy++) for (var xx = 0; xx < n; xx++) {
      var g = who(w[0] + xx, w[1] + yy), r = cell * 0.36;
      ctx.beginPath();
      ctx.arc((xx + 0.5) * cell, (yy + 0.5) * cell, r, 0, Math.PI * 2);
      if (g === 'cort') ctx.fillStyle = C.alta;
      else if (g === 'cort2') ctx.fillStyle = 'rgba(232,85,62,.42)';
      else if (g === 'add') ctx.fillStyle = C.baixa;
      else if (g === 'cush') ctx.fillStyle = C.ink;
      else ctx.fillStyle = 'rgba(138,138,138,' + (0.28 + R() * 0.16).toFixed(2) + ')';
      ctx.fill();
    }
  }
  function drawMarks() {
    var side = G.side, k = side / N;
    mk.setAttribute('viewBox', '0 0 ' + side + ' ' + side);
    mk.setAttribute('width', side); mk.setAttribute('height', side);
    mk.innerHTML = '';
    MARK.forEach(function (m, i) {
      var g = S('g', { class: 'c06a-m c06a-m' + i }, mk);
      var x = m.x * k, y = m.y * k, r = Math.max(i === 0 ? 0 : 8, m.r * k);
      if (i === 0) {
        S('rect', { x: (CORT.x * k - 3).toFixed(1), y: (CORT.y * k - 3).toFixed(1), width: (CORT.w * k + 6).toFixed(1), height: (CORT.rows * k + 6).toFixed(1), class: 'c06a-mr' }, g);
      } else {
        S('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: r.toFixed(1), class: 'c06a-mr' }, g);
      }
      /* the number tag sits up and to the left of the ring */
      var tx = i === 0 ? CORT.x * k - 12 : x - r - 8, ty = i === 0 ? CORT.y * k + 6 : y - r + 2;
      S('circle', { cx: tx.toFixed(1), cy: ty.toFixed(1), r: 7, class: 'c06a-tagc' }, g);
      var t = S('text', { x: tx.toFixed(1), y: (ty + 3.4).toFixed(1), class: 'c06a-tagt', 'text-anchor': 'middle' }, g);
      t.textContent = String(i + 1);
    });
  }
  function drawLeads() {
    leads.innerHTML = '';
    if (G.mob) return;
    var sr = stage.getBoundingClientRect(), fr = cv.getBoundingClientRect(), k = G.side / N;
    leads.setAttribute('width', sr.width); leads.setAttribute('height', sr.height);
    leads.setAttribute('viewBox', '0 0 ' + sr.width + ' ' + sr.height);
    MARK.forEach(function (m, i) {
      var lr = lis[i].lc.getBoundingClientRect();
      var x0, y0;
      if (i === 0) { x0 = fr.left - sr.left + (CORT.x + CORT.w) * k + 3; y0 = fr.top - sr.top + (CORT.y + CORT.rows * 0.75) * k; }
      else { x0 = fr.left - sr.left + m.x * k + Math.max(8, m.r * k); y0 = fr.top - sr.top + m.y * k; }
      var x1 = lr.left - sr.left - 3, y1 = lr.top - sr.top + lr.height / 2;
      var mx = Math.max(x0 + 10, fr.right - sr.left + 10);
      S('path', { d: 'M' + x0.toFixed(1) + ',' + y0.toFixed(1) + ' L' + mx.toFixed(1) + ',' + y0.toFixed(1) + ' L' + x1.toFixed(1) + ',' + y1.toFixed(1), class: 'c06a-ln c06a-ln' + i }, leads);
      S('circle', { cx: x0.toFixed(1), cy: y0.toFixed(1), r: 1.8, class: 'c06a-lnd c06a-ln' + i }, leads);
    });
  }

  function text() {
    take.textContent = L('Num milhão de pessoas, cerca de 10 mil tomam corticoide hoje, enquanto cerca de 3 desenvolvem Cushing por conta própria a cada ano.',
      'In a million people, about 10,000 are taking a corticosteroid today, while about 3 develop Cushing’s on their own each year.');
    scale.innerHTML = G.mob
      ? L('<b>250.000 pontos</b>, cada ponto, 4 pessoas', '<b>250,000 dots</b>, each dot, 4 people')
      : L('<b>1.000 × 1.000 pontos</b>, cada ponto é uma pessoa', '<b>1,000 × 1,000 dots</b>, each dot is one person');
    ITEMS.forEach(function (it, i) {
      var o = lis[i];
      o.num.textContent = it.num(); o.t.textContent = it.t(); o.s.textContent = it.s(); o.kind.textContent = it.kind();
    });
    list.setAttribute('aria-label', L('As três lupas, cada uma com os pontos ampliados', 'The three loupes, each with its dots enlarged'));
    cv.setAttribute('aria-label', L(
      'Um quadrado de um milhão de pontos cinza, um por pessoa. Um bloco vermelho de 8.500 a 12.000 pontos são as pessoas que tomam corticoide oral agora. Um bloco verde de 144 pontos são as pessoas com doença de Addison autoimune. Três pontos pretos são os casos novos de Cushing produzido pelo próprio corpo em um ano.',
      'A square of one million grey dots, one per person. A red block of 8,500 to 12,000 dots is the people taking an oral corticosteroid now. A green block of 144 dots is the people with autoimmune Addison’s disease. Three black dots are the new cases of Cushing’s made by the body itself in one year.'));
  }

  function layout() {
    var W = stage.clientWidth || 640;
    G.mob = W < 540;
    stage.classList.toggle('c06a-mob', G.mob);
    G.side = G.mob ? Math.floor(W) : Math.min(380, Math.floor(W * 0.56));
    G.lupe = G.mob ? 92 : 108;
    fw.style.width = G.side + 'px';
    text();
    drawField(); drawMarks();
    lis.forEach(function (o, i) { drawLupe(i); });
    for (var i = 0; i < 3; i++) stage.classList.toggle('c06a-on' + i, G.stage >= i);
    requestAnimationFrame(drawLeads);
  }

  /* lights the groups one after another, each loupe opening right after its group */
  function play() {
    if (G.stage >= 0) return;
    var t = 0;
    [0, 1, 2].forEach(function (i) {
      setTimeout(function () { G.stage = i; drawField(); stage.classList.add('c06a-on' + i); }, t);
      t += 900;
    });
  }
  if (!DN.RM) stage.classList.add('c06a-anim');

  var rt;
  function onResize() { clearTimeout(rt); rt = setTimeout(layout, 140); }
  if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(stage); else window.addEventListener('resize', onResize);
  DN.onLang(function () { text(); requestAnimationFrame(drawLeads); });
  layout();
  if (DN.RM) { G.stage = 3; layout(); }
  else DN.onVisible(stage, function (v) { if (v) play(); }, { once: true, threshold: 0.35 });
})();
