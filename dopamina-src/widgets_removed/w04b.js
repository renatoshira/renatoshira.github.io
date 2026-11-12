/* w04b · a-regua-do-tempo
   Top: log time ruler (1 ms to 2 h) with the time window of each technique.
   Bottom: a simulated 20-minute dopamine signal with bursts and pauses, and
   what the chosen technique records of it (moving average over its window). */
(function () {
  'use strict';
  var root = DN.body('w04b'); if (!root) return;
  var C = DN.COL, L = DN.L, el = DN.el, RM = DN.RM, S = DN.svg;

  var BURST = 0.2; /* s */
  var TECH = [
    { k: 'ele', lo: 0.0008, hi: 0.0013, win: 0.001, short: ['elétrico', 'electrical'],
      name: ['registro elétrico de um neurônio', 'electrical recording of one neuron'],
      det: ['cerca de 1 ms · mede disparos', 'about 1 ms · records spikes'] },
    { k: 'sen', lo: 0.01, hi: 0.1, win: 0.05, short: ['sensores', 'sensors'],
      name: ['sensores GRAB-DA e dLight', 'GRAB-DA and dLight sensors'],
      det: ['10 a 100 ms · 2018, em camundongos', '10 to 100 ms · 2018, in mice'] },
    { k: 'fscv', lo: 0.08, hi: 0.125, win: 0.1, short: ['voltametria', 'voltammetry'],
      name: ['voltametria rápida', 'fast-scan voltammetry'],
      det: ['100 ms · em humanos desde 2011', '100 ms · in humans since 2011'] },
    { k: 'mic', lo: 600, hi: 1200, win: 600, short: ['microdiálise', 'microdialysis'],
      name: ['microdiálise', 'microdialysis'],
      det: ['10 a 20 min por amostra · 1984 a 1988', '10 to 20 min per sample · 1984 to 1988'] },
    { k: 'pet', lo: 3600, hi: 5400, win: 1200, short: ['PET', 'PET'],
      name: ['PET', 'PET'],
      det: ['60 a 90 min por número · em pessoas', '60 to 90 min per number · in people'] }
  ];
  var sel = 2;

  /* ---------- simulated signal (deterministic) ---------- */
  var DT = 0.01, DUR = 1200, N = DUR / DT;
  var raw = new Float32Array(N), bursts = [], EP0 = 600, EP1 = 1050;
  (function sim() {
    var s = 987654321;
    function r() { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }
    var spikes = new Uint8Array(N);
    var t = 0, silent = -1;
    /* bursts and pauses as events */
    var events = [];
    for (var tt = 3; tt < DUR - 1; ) {
      var inEp = tt > EP0 && tt < EP1;
      tt += -Math.log(1 - r()) * (inEp ? 4.5 : 28);
      if (tt < DUR - 1) events.push({ t: tt, k: 'b', n: 4 + Math.floor(r() * 5) });
    }
    for (tt = 5; tt < DUR - 1; ) { tt += -Math.log(1 - r()) * 40; if (tt < DUR - 1) events.push({ t: tt, k: 'p' }); }
    events.sort(function (a, b) { return a.t - b.t; });
    var ei = 0, next = 0.1;
    while (next < DUR) {
      while (ei < events.length && events[ei].t <= next) {
        var e = events[ei++];
        if (e.k === 'b') {
          for (var i = 0; i < e.n; i++) { var idx = Math.floor((e.t + i * 0.05) / DT); if (idx < N) spikes[idx] = Math.min(255, spikes[idx] + 1); }
          bursts.push({ t: e.t, n: e.n });
          next = e.t + (e.n - 1) * 0.05 + 0.2;
        } else { next = e.t + 0.25 + 0.05; }
      }
      if (next >= DUR) break;
      spikes[Math.floor(next / DT)]++;
      next += 0.25 * (1 + (r() - 0.5) * 0.16);
    }
    /* dopamine: tau 0.25 s, burst spikes release more (uptake saturates) */
    var TAU = 0.6, Q = 1 / (4 * TAU), c = 1, k = Math.exp(-DT / TAU);
    for (var j = 0; j < N; j++) {
      c *= k;
      if (spikes[j]) c += Q * spikes[j] * (isBurstIdx(j) ? 1.6 : 1);
      raw[j] = c * 100; /* % of basal; tonic 4 Hz x 0.25 s = 1 unit */
    }
    function isBurstIdx(j) {
      var tj = j * DT;
      for (var b = 0; b < bursts.length; b++) { if (bursts[b].t > tj + 0.01) return false; if (tj <= bursts[b].t + bursts[b].n * 0.05) return true; }
      return false;
    }
  })();
  var prefix = new Float64Array(N + 1);
  for (var pi = 0; pi < N; pi++) prefix[pi + 1] = prefix[pi] + raw[pi];
  function meanRange(a, b) { a = Math.max(0, Math.floor(a)); b = Math.min(N, Math.ceil(b)); return b > a ? (prefix[b] - prefix[a]) / (b - a) : 0; }
  var MEAN = meanRange(0, N);

  /* filtered value at sample i for technique t */
  function filtAt(t, i) {
    if (t.k === 'pet') return MEAN;
    if (t.k === 'mic') { var bin = Math.floor(i * DT / t.win); return meanRange(bin * t.win / DT, (bin + 1) * t.win / DT); }
    var h = Math.max(0, Math.round(t.win / DT / 2));
    if (h === 0) return raw[i];
    return meanRange(i - h, i + h + 1);
  }
  /* per-column envelope */
  function envelope(t, cols) {
    var lo = new Float32Array(cols), hi = new Float32Array(cols), per = N / cols;
    for (var c = 0; c < cols; c++) {
      var a = Math.floor(c * per), b = Math.floor((c + 1) * per), mn = 1e9, mx = -1e9;
      for (var i = a; i < b; i += (t && (t.k === 'mic' || t.k === 'pet')) ? 25 : 1) {
        var v = t ? filtAt(t, i) : raw[i];
        if (v < mn) mn = v; if (v > mx) mx = v;
      }
      lo[c] = mn; hi[c] = mx;
    }
    return { lo: lo, hi: hi };
  }
  function visibleBursts(t) {
    if (t.k === 'mic' || t.k === 'pet') return 0;
    var n = 0;
    bursts.forEach(function (b) {
      var i0 = Math.floor(b.t / DT), pk = 0;
      for (var i = i0; i < i0 + 40 && i < N; i++) pk = Math.max(pk, filtAt(t, i));
      var base = filtAt(t, Math.max(0, i0 - 60));
      if (pk - base > 80) n++;
    });
    return n;
  }

  /* ---------- DOM ---------- */
  root.innerHTML = '';
  var btnRow = el('div', { class: 'rowbtns w04b-btns', role: 'group' }, root);
  var btns = TECH.map(function (t, i) {
    var b = el('button', { class: 'btn', type: 'button', 'aria-pressed': 'false' }, btnRow);
    b.addEventListener('click', function () { choose(i); });
    return b;
  });
  var rulerWrap = el('div', { class: 'w04b-ruler' }, root);
  var counter = el('div', { class: 'w04b-count' }, root);
  var sigWrap = el('div', { class: 'w04b-sig' }, root);
  var live = el('div', { class: 'live', 'aria-live': 'polite' }, root);

  var Wd = 600, cols = 300, rawEnv = null, envs = {}, cur = null, anim = 0;
  var R = {}, G = {};

  function lg(v) { return Math.log10(v); }
  var LMIN = lg(0.0005), LMAX = lg(7200);

  function buildRuler() {
    rulerWrap.innerHTML = '';
    var mob = Wd < 560, w = Wd, padL = 4, padR = 4;
    var laneH = mob ? 40 : 38, top = mob ? 44 : 30, h = top + TECH.length * laneH + 30;
    function X(v) { return padL + (lg(v) - LMIN) / (LMAX - LMIN) * (w - padL - padR); }
    var svg = S('svg', { viewBox: '0 0 ' + w + ' ' + h, width: w, height: h, role: 'img' }, rulerWrap);
    svg.setAttribute('aria-label', L('Régua de tempo em escala logarítmica, de 1 milissegundo a 2 horas, com a janela de cada técnica: registro elétrico, cerca de 1 ms; sensores, 10 a 100 ms; voltametria rápida, cerca de 100 ms; microdiálise, 10 a 20 minutos; PET, 60 a 90 minutos.',
      'Log time ruler from 1 millisecond to 2 hours with the window of each technique: electrical recording, about 1 ms; sensors, 10 to 100 ms; fast-scan voltammetry, about 100 ms; microdialysis, 10 to 20 minutes; PET, 60 to 90 minutes.'));
    R.svg = svg; R.X = X;
    var ticks = [[0.001, '1 ms'], [0.01, '10 ms'], [0.1, '100 ms'], [1, '1 s'], [10, '10 s'], [60, '1 min'], [600, '10 min'], [3600, '1 h']];
    var yAx = top + TECH.length * laneH + 4;
    R.selCol = S('rect', { class: 'w04b-selcol', y: top - 6, height: yAx - top + 6 }, svg);
    ticks.forEach(function (t, i) {
      var x = X(t[0]);
      S('line', { x1: x, x2: x, y1: top - 6, y2: yAx, class: 'w04b-grid' }, svg);
      if (mob && (t[0] === 10 || t[0] === 0.01)) { S('line', { x1: x, x2: x, y1: yAx, y2: yAx + 4, class: 'w04b-axl' }, svg); return; }
      S('line', { x1: x, x2: x, y1: yAx, y2: yAx + 5, class: 'w04b-axl' }, svg);
      var tx = S('text', { x: x, y: yAx + 18, class: 'w04b-axt', 'text-anchor': 'middle' }, svg); tx.textContent = t[1];
    });
    S('line', { x1: padL, x2: w - padR, y1: yAx, y2: yAx, class: 'w04b-axl' }, svg);
    /* burst reference */
    var xb = X(BURST);
    S('line', { x1: xb, x2: xb, y1: 12, y2: yAx, class: 'w04b-burst' }, svg);
    var bt = S('text', { x: xb + 5, y: 16, class: 'w04b-burstt' }, svg);
    bt.textContent = L('uma rajada · ' + DN.fmt(0.2, 1) + ' s', 'one burst · 0.2 s');
    var xs = X(1200);
    S('line', { x1: xs, x2: xs, y1: mob ? 27 : 12, y2: yAx, class: 'w04b-burst w04b-sigref' }, svg);
    var st = S('text', { x: xs - 5, y: mob ? 31 : 16, class: 'w04b-burstt w04b-sigreft', 'text-anchor': 'end' }, svg);
    st.textContent = L('o sinal abaixo · 20 min', 'the signal below · 20 min');
    R.lanes = TECH.map(function (t, i) {
      var y = top + i * laneH, g = S('g', { class: 'w04b-lane' }, svg);
      S('rect', { x: 0, y: y, width: w, height: laneH, class: 'w04b-hit' }, g);
      var a = X(t.lo), b = Math.max(X(t.hi), a + 5), cy = y + laneH / 2 - 2;
      var band = S('rect', { x: a, y: cy - 5, width: b - a, height: 10, rx: 5, class: 'w04b-band' }, g);
      var right = (a + b) / 2 < w * 0.55;
      var tx = right ? b + 9 : a - 9, anc = right ? 'start' : 'end';
      var n1 = S('text', { x: tx, y: cy - 1, class: 'w04b-ln', 'text-anchor': anc }, g); n1.textContent = L(t.name[0], t.name[1]);
      var n2 = S('text', { x: tx, y: cy + 12, class: 'w04b-ld', 'text-anchor': anc }, g); n2.textContent = L(t.det[0], t.det[1]);
      g.addEventListener('click', function () { choose(i); });
      return { g: g, band: band };
    });
    paintRuler();
  }
  function paintRuler() {
    if (!R.lanes) return;
    R.lanes.forEach(function (l, i) { l.g.classList.toggle('on', i === sel); });
    var t = TECH[sel], a = R.X(t.lo), b = Math.max(R.X(t.hi), a + 5);
    R.selCol.setAttribute('x', a); R.selCol.setAttribute('width', b - a);
  }

  /* bottom panels */
  function buildSig() {
    sigWrap.innerHTML = '';
    var mob = Wd < 560, w = Wd, padL = 40, padR = mob ? 6 : 12;
    var h1 = mob ? 74 : 86, h2 = mob ? 132 : 150, gap = 34, top = 18;
    var h = top + h1 + gap + h2 + 30;
    cols = Math.max(120, Math.floor((w - padL - padR) / (mob ? 1 : 1.5)));
    var svg = S('svg', { viewBox: '0 0 ' + w + ' ' + h, width: w, height: h, role: 'img' }, sigWrap);
    G.svg = svg; G.w = w; G.padL = padL; G.padR = padR; G.top = top; G.h1 = h1; G.h2 = h2; G.gap = gap; G.h = h;
    var YMAX = 600;
    G.X = function (c) { return padL + c / cols * (w - padL - padR); };
    G.Xt = function (sec) { return padL + sec / DUR * (w - padL - padR); };
    G.Y1 = function (v) { return top + h1 - Math.min(v, YMAX) / YMAX * h1; };
    var y2t = top + h1 + gap;
    G.Y2 = function (v) { return y2t + h2 - Math.min(v, YMAX) / YMAX * h2; };
    /* episode shade */
    var e0 = G.Xt(EP0), e1 = G.Xt(EP1);
    S('rect', { x: e0, y: top - 4, width: e1 - e0, height: h1 + 4, class: 'w04b-ep' }, svg);
    var et = S('text', { x: mob ? e1 : (e0 + e1) / 2, y: top - 7, class: 'w04b-ept', 'text-anchor': mob ? 'end' : 'middle' }, svg);
    et.textContent = mob ? L('mais rajadas', 'more bursts') : L('um período com mais rajadas', 'a stretch with more bursts');
    /* labels */
    var l1 = S('text', { x: 0, y: top - 7, class: 'w04b-pl' }, svg); l1.textContent = L('O SINAL, EM % DO BASAL', 'THE SIGNAL, % OF BASELINE');
    G.l2 = S('text', { x: 0, y: y2t - 9, class: 'w04b-pl' }, svg);
    /* y axes */
    [[G.Y1, 100], [G.Y1, 500], [G.Y2, 100], [G.Y2, 500]].forEach(function (a) {
      var y = a[0](a[1]);
      S('line', { x1: padL, x2: w - padR, y1: y, y2: y, class: a[1] === 100 ? 'w04b-base' : 'w04b-grid' }, svg);
      var tx = S('text', { x: padL - 6, y: y + 3.5, class: 'w04b-axt', 'text-anchor': 'end' }, svg); tx.textContent = a[1] + '%';
    });
    /* raw envelope */
    rawEnv = envelope(null, cols);
    S('path', { d: envPath(rawEnv, G.Y1), class: 'w04b-raw' }, svg);
    /* x axis */
    var yb = y2t + h2;
    for (var m = 0; m <= 20; m += 5) {
      var x = G.Xt(m * 60);
      S('line', { x1: x, x2: x, y1: yb, y2: yb + 4, class: 'w04b-axl' }, svg);
      var tx = S('text', { x: x, y: yb + 17, class: 'w04b-axt', 'text-anchor': m === 0 ? 'start' : (m === 20 ? 'end' : 'middle') }, svg);
      tx.textContent = m + ' min';
    }
    S('line', { x1: padL, x2: w - padR, y1: yb, y2: yb, class: 'w04b-axl' }, svg);
    G.ann = S('g', { class: 'w04b-ann' }, svg);
    G.rec = S('path', { class: 'w04b-rec' }, svg);
    G.ann2 = S('g', { class: 'w04b-ann' }, svg);
    envs = {};
    cur = null;
    setTarget(false);
  }
  function envPath(e, Y) {
    var d = '', n = e.lo.length, c;
    for (c = 0; c < n; c++) { var yh = Y(e.hi[c]), yl = Y(e.lo[c]); if (yl - yh < 1.6) yh = yl - 1.6; d += (c ? 'L' : 'M') + G.X(c + 0.5).toFixed(1) + ' ' + yh.toFixed(1); }
    for (c = n - 1; c >= 0; c--) d += 'L' + G.X(c + 0.5).toFixed(1) + ' ' + Y(e.lo[c]).toFixed(1);
    return d + 'Z';
  }
  function getEnv(i) { if (!envs[i]) envs[i] = envelope(TECH[i], cols); return envs[i]; }

  function setTarget(animate) {
    var tgt = getEnv(sel);
    if (!cur || !animate || RM) {
      cur = { lo: Float32Array.from(tgt.lo), hi: Float32Array.from(tgt.hi) };
      G.rec.setAttribute('d', envPath(cur, G.Y2)); annotate(); return;
    }
    var from = { lo: Float32Array.from(cur.lo), hi: Float32Array.from(cur.hi) }, t0 = performance.now(), my = ++anim;
    G.ann.style.opacity = 0; G.ann2.style.opacity = 0;
    (function fr(now) {
      if (my !== anim) return;
      var k = Math.min(1, (now - t0) / 600), e = 1 - Math.pow(1 - k, 3);
      /* the cloth sweeps left to right: each column eases with a small lag */
      for (var c = 0; c < cols; c++) {
        var lag = c / cols * 0.25, kc = DN.clamp((k - lag) / 0.75, 0, 1), ec = 1 - Math.pow(1 - kc, 3);
        cur.lo[c] = DN.lerp(from.lo[c], tgt.lo[c], ec); cur.hi[c] = DN.lerp(from.hi[c], tgt.hi[c], ec);
      }
      G.rec.setAttribute('d', envPath(cur, G.Y2));
      if (k < 1) requestAnimationFrame(fr); else { annotate(); G.ann.style.opacity = 1; G.ann2.style.opacity = 1; }
      void e;
    })(t0);
  }

  function annotate() {
    G.ann.innerHTML = ''; G.ann2.innerHTML = '';
    var t = TECH[sel], y2t = G.top + G.h1 + G.gap;
    G.l2.textContent = L('O QUE A ' + (t.k === 'ele' ? 'TÉCNICA' : 'TÉCNICA') + ' REGISTRA', 'WHAT THE TECHNIQUE RECORDS');
    if (t.k === 'mic') {
      var xm = G.Xt(600);
      S('line', { x1: xm, x2: xm, y1: y2t, y2: y2t + G.h2, class: 'w04b-binl' }, G.ann);
      var m1 = meanRange(0, 60000), m2 = meanRange(60000, N);
      [[0, 600, m1], [600, 1200, m2]].forEach(function (b, i) {
        var x = (G.Xt(b[0]) + G.Xt(b[1])) / 2, y = G.Y2(b[2]);
        var tx = S('text', { x: x, y: y - 9, class: 'w04b-val', 'text-anchor': 'middle' }, G.ann2);
        tx.textContent = L('amostra ' + (i + 1) + ': ', 'sample ' + (i + 1) + ': ') + Math.round(b[2]) + '%';
      });
      /* faint hill: centered 10-min moving average */
      var d = '';
      for (var c = 0; c < cols; c += 2) {
        var i0 = Math.floor((c + 0.5) / cols * N), hw = 30000;
        d += (c ? 'L' : 'M') + G.X(c + 0.5).toFixed(1) + ' ' + G.Y2(meanRange(i0 - hw, i0 + hw)).toFixed(1);
      }
      S('path', { d: d, class: 'w04b-hill' }, G.ann);
    } else if (t.k === 'pet') {
      var y = G.Y2(MEAN), x = G.w - G.padR - 8, e = 0.08 * MEAN;
      S('line', { x1: x, x2: x, y1: G.Y2(MEAN + e), y2: G.Y2(MEAN - e), class: 'w04b-err' }, G.ann2);
      S('line', { x1: x - 4, x2: x + 4, y1: G.Y2(MEAN + e), y2: G.Y2(MEAN + e), class: 'w04b-err' }, G.ann2);
      S('line', { x1: x - 4, x2: x + 4, y1: G.Y2(MEAN - e), y2: G.Y2(MEAN - e), class: 'w04b-err' }, G.ann2);
      S('circle', { cx: x, cy: y, r: 4.5, class: 'w04b-dot' }, G.ann2);
      var tx = S('text', { x: x - 12, y: y - 12, class: 'w04b-val', 'text-anchor': 'end' }, G.ann2);
      tx.textContent = L('um número: ' + Math.round(MEAN) + '% ± incerteza', 'one number: ' + Math.round(MEAN) + '% ± uncertainty');
      var t2 = S('text', { x: x - 12, y: y + 22, class: 'w04b-note', 'text-anchor': 'end' }, G.ann2);
      t2.textContent = L('um exame real leva de 60 a 90 min', 'a real scan takes 60 to 90 min');
    }
  }

  function countText() {
    var t = TECH[sel], big, small;
    if (t.k === 'ele') { big = '200'; small = L('janelas de 1 ms cabem numa rajada. Cada disparo aparece.', 'windows of 1 ms fit in one burst. Every spike shows.'); }
    else if (t.k === 'sen') { big = L('2 a 20', '2 to 20'); small = L('janelas cabem numa rajada.', 'windows fit in one burst.'); }
    else if (t.k === 'fscv') { big = '2'; small = L('janelas de 0,1 s cabem numa rajada.', 'windows of 0.1 s fit in one burst.'); }
    else if (t.k === 'mic') { big = L('3 mil a 6 mil', '3,000 to 6,000'); small = L('rajadas cabem numa amostra.', 'bursts fit in one sample.'); }
    else { big = L('18 mil a 27 mil', '18,000 to 27,000'); small = L('rajadas cabem num número de PET.', 'bursts fit in one PET number.'); }
    var vis = visibleBursts(t);
    counter.innerHTML = '';
    var a = el('div', { class: 'w04b-c1' }, counter);
    el('b', { class: 'w04b-big' }, a).textContent = big;
    el('span', null, a).textContent = ' ' + small;
    var b = el('div', { class: 'w04b-c2' }, counter);
    b.textContent = L('Rajadas no sinal: ' + bursts.length + '. Visíveis no registro: ' + vis + '.', 'Bursts in the signal: ' + bursts.length + '. Visible in the record: ' + vis + '.');
    return vis;
  }

  function narrate() {
    var t = TECH[sel], vis = visibleBursts(t);
    var m = {
      ele: ['O registro elétrico vê cada disparo, mas mede o neurônio e não a dopamina liberada.', 'Electrical recording sees every spike, but it measures the neuron and not the dopamine released.'],
      sen: ['Os sensores acompanham cada rajada. Funcionam em camundongos, com o sensor inserido por engenharia genética.', 'The sensors follow every burst. They work in mice, with the sensor added by genetic engineering.'],
      fscv: ['A voltametria rápida registra quase o mesmo sinal: ' + vis + ' de ' + bursts.length + ' rajadas aparecem.', 'Fast-scan voltammetry records almost the same signal: ' + vis + ' of ' + bursts.length + ' bursts show.'],
      mic: ['Com microdiálise, as rajadas somem. Sobram duas amostras e um degrau entre elas.', 'With microdialysis the bursts disappear. Two samples remain, with one step between them.'],
      pet: ['Com PET, os 20 minutos viram um só número, medido de forma indireta.', 'With PET the 20 minutes become a single number, measured indirectly.']
    }[t.k];
    live.textContent = L(m[0], m[1]);
  }

  function choose(i) {
    if (i === sel && cur) return;
    sel = i;
    btns.forEach(function (b, j) { b.setAttribute('aria-pressed', j === sel ? 'true' : 'false'); });
    paintRuler(); setTarget(true); countText(); narrate();
  }

  function relabel() {
    TECH.forEach(function (t, i) { btns[i].textContent = L(t.short[0], t.short[1]); btns[i].setAttribute('aria-pressed', i === sel ? 'true' : 'false'); });
    build();
  }
  function build() {
    Wd = Math.max(280, Math.round(root.clientWidth || 600));
    buildRuler(); buildSig(); countText();
    G.svg.setAttribute('aria-label', L('Sinal simulado de dopamina ao longo de 20 minutos, com rajadas e pausas, e a versão registrada pela técnica escolhida.', 'Simulated dopamine signal over 20 minutes, with bursts and pauses, and the version recorded by the chosen technique.'));
  }
  var rT = 0, lastW = 0;
  window.addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(function () { if (Math.abs((root.clientWidth || 0) - lastW) > 2) { lastW = root.clientWidth; build(); } }, 150); });
  DN.onLang(function () { relabel(); narrate(); });
  relabel(); lastW = root.clientWidth;
  narrate();
})();
