/* w05a · treine-o-neuronio : a TD(lambda) model of a dopamine neuron, drawn
   as a Schultz-style raster (one row per trial) under a firing-rate histogram. */
(function () {
  'use strict';
  var root = DN.body('w05a'); if (!root) return;
  var L = DN.L, C = DN.COL;

  /* ---------- model ---------- */
  var DT = 0.1, K = 10;               /* light at t=0, juice at t=K*DT = 1 s */
  var T0 = -0.5, T1 = 1.75;           /* plotted window, seconds */
  var ALPHA = 0.12, LAMBDA = 0.95, GAMMA = 1;
  var BASE = 5, BURST = 52, SIG = 0.032, LAT = 0.075, RAMP = 7;

  var seed = 7;
  function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }

  var V, trials, nTrial, pJuice, forceOmit;
  function reset() {
    V = new Float64Array(K + 1);      /* V[K] stays 0 (end of trial) */
    trials = []; nTrial = 0; pJuice = 1; forceOmit = false; seed = 7;
  }

  /* run one trial: returns {n, juice, d:[{t,v}], p, spikes:[t]} */
  function runTrial(omit) {
    var juice = !omit && (pJuice >= 1 || rnd() < pJuice);
    var d = [{ t: 0, v: GAMMA * V[0] }];           /* light is unpredicted */
    var e = new Float64Array(K + 1);
    for (var k = 0; k < K; k++) {
      var r = (k === K - 1 && juice) ? 1 : 0;
      var del = r + GAMMA * V[k + 1] - V[k];
      d.push({ t: (k + 1) * DT, v: del });
      for (var j = 0; j < K; j++) e[j] *= GAMMA * LAMBDA;
      e[k] += 1;
      for (j = 0; j < K; j++) V[j] += ALPHA * del * e[j];
    }
    nTrial++;
    var tr = { n: nTrial, juice: juice, d: d, p: pJuice };
    tr.spikes = spikes(tr);
    return tr;
  }

  function rate(tr, t) {
    var r = BASE, pause = 0, i, x;
    for (i = 0; i < tr.d.length; i++) {
      var dv = tr.d[i].v, dt = t - tr.d[i].t - LAT;
      if (dv > 0) r += BURST * dv * Math.exp(-dt * dt / (2 * SIG * SIG));
      else if (dv < -0.04 && dt > -0.01 && dt < 0.32) {
        x = Math.min(1, -dv * 1.7);
        var w = dt < 0.03 ? (dt + 0.01) / 0.04 : (dt > 0.26 ? (0.32 - dt) / 0.06 : 1);
        pause = Math.max(pause, x * w);
      }
    }
    /* sustained ramp under uncertainty (Fiorillo, Tobler & Schultz 2003) */
    var u = 4 * tr.p * (1 - tr.p);
    if (u > 0 && t > 0.15 && t < 1.04) r += RAMP * u * Math.min(1, (t - 0.15) / 0.85);
    return Math.max(0, r * (1 - pause));
  }

  function spikes(tr) {
    var out = [], h = 0.002;
    for (var t = T0; t < T1; t += h) if (rnd() < rate(tr, t) * h) out.push(t);
    return out;
  }

  /* ---------- layout ---------- */
  var mob = false, W = 600, ROWS = 40, RH = 6, ML = 40, MR = 40, HTOP = 40, HP = 96, GAP = 14, H;
  var BW = 0.04, NB = Math.round((T1 - T0) / BW), YMAX = 60;
  function x(t) { return ML + (t - T0) / (T1 - T0) * (W - ML - MR); }

  var wrap = DN.el('div', { class: 'cvwrap' }, root);
  var svg = DN.svg('svg', { role: 'img' }, wrap);
  var ctr = DN.el('div', { class: 'rowbtns mt' }, root);
  var bNext = DN.el('button', { class: 'btn solid', type: 'button' }, ctr);
  var b20 = DN.el('button', { class: 'btn', type: 'button' }, ctr);
  var bOmit = DN.el('button', { class: 'btn', type: 'button' }, ctr);
  var bReset = DN.el('button', { class: 'btn', type: 'button' }, ctr);
  var crow = DN.el('div', { class: 'ctrlrow' }, root);
  var slab = DN.el('label', { for: 'w05a-p' }, crow);
  var slider = DN.el('input', { type: 'range', id: 'w05a-p', min: 0, max: 100, step: 5, value: 100 }, crow);
  var sval = DN.el('span', { class: 'v' }, crow);
  var live = DN.el('div', { class: 'live', 'aria-live': 'polite' }, root);
  var key = DN.el('ol', { class: 'w05a-key' }); root.insertBefore(key, ctr);
  var take = DN.el('p', { class: 'w05a-take' }, root);
  var annotated = true;   /* the resting state: a trained neuron, annotated */
  var gAnn = null;

  var gRows, gHist, gMarks, histCur = new Float64Array(NB), histTo = new Float64Array(NB), histFrom = new Float64Array(NB);
  var histLabel, legOmit, hint;
  var anim = null;

  function build() {
    W = Math.max(300, wrap.clientWidth || 600);
    mob = W < 520;
    ROWS = 42; RH = mob ? 4.4 : 5.4;
    ML = mob ? 30 : 40; MR = mob ? 46 : 190; HP = mob ? 84 : 100;
    var rasterTop = HTOP + HP + GAP;
    H = rasterTop + ROWS * RH + 40;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    var g0 = DN.svg('g', null, svg);
    /* histogram frame */
    var yb = HTOP + HP;
    function hy(v) { return yb - v / YMAX * HP; }
    DN.svg('line', { x1: ML, x2: W - MR, y1: yb, y2: yb, stroke: C.ink, 'stroke-width': 1 }, g0);
    DN.svg('line', { x1: ML - 4, x2: ML - 4, y1: hy(YMAX), y2: yb, stroke: C.ink, 'stroke-width': 1 }, g0);
    [0, 30, 60].forEach(function (v) {
      DN.svg('line', { x1: ML - 7, x2: ML - 4, y1: hy(v), y2: hy(v), stroke: C.ink }, g0);
      DN.svg('text', { x: ML - 10, y: hy(v) + 3.5, 'text-anchor': 'end', 'font-size': 10, fill: C.dim }, g0).textContent = v;
    });
    DN.svg('line', { x1: ML, x2: W - MR, y1: hy(BASE), y2: hy(BASE), stroke: C.mid, 'stroke-dasharray': '2 3' }, g0);
    var yl = DN.svg('text', { x: 0, y: HTOP - 8, 'text-anchor': 'start', 'font-size': 10, fill: C.dim }, g0);
    yl.textContent = L('impulsos/s', 'spikes/s');
    histLabel = DN.svg('text', { x: 0, y: 10, 'text-anchor': 'start', 'font-size': 10, fill: C.dim }, g0);
    hint = DN.svg('text', { x: x(0.5), y: HTOP + HP + GAP + ROWS * RH * 0.55, 'text-anchor': 'middle', 'font-size': 11, fill: C.mid, class: 'w05a-halo' }, g0);

    gHist = DN.svg('g', null, svg);

    /* raster frame */
    DN.svg('rect', { x: ML, y: rasterTop - 2, width: W - ML - MR, height: ROWS * RH + 4, fill: 'none', stroke: C.line }, g0);
    var cp = DN.svg('clipPath', { id: 'w05a-clip' }, svg);
    DN.svg('rect', { x: 0, y: rasterTop, width: W, height: ROWS * RH }, cp);
    var clip = DN.svg('g', { 'clip-path': 'url(#w05a-clip)' }, svg);
    gRows = DN.svg('g', { transform: 'translate(0,' + rasterTop + ')' }, clip);
    var tl = DN.svg('text', { x: ML - 10, y: rasterTop + 8, 'text-anchor': 'end', 'font-size': 10, fill: C.dim }, g0);
    tl.textContent = L('novo', 'new');
    var tl2 = DN.svg('text', { 'font-size': 10, fill: C.dim, 'text-anchor': 'middle', transform: 'translate(' + (ML - 14) + ',' + (rasterTop + ROWS * RH / 2) + ') rotate(-90)' }, g0);
    tl2.textContent = L('ensaios', 'trials');
    legOmit = DN.svg('g', null, g0);
    gAnn = DN.svg('g', null, svg);

    /* time axis */
    var ya = rasterTop + ROWS * RH + 4;
    DN.svg('line', { x1: x(T0), x2: x(T1), y1: ya, y2: ya, stroke: C.ink }, g0);
    for (var s = -0.5; s <= 1.51; s += 0.5) {
      DN.svg('line', { x1: x(s), x2: x(s), y1: ya, y2: ya + 4, stroke: C.ink }, g0);
      DN.svg('text', { x: x(s), y: ya + 16, 'text-anchor': 'middle', 'font-size': 10, fill: C.dim }, g0).textContent = DN.fmt(s, 1);
    }
    DN.svg('text', { x: W - MR, y: ya + 32, 'text-anchor': 'end', 'font-size': 10, fill: C.dim }, g0).textContent = L('tempo (s)', 'time (s)');

    /* event markers */
    gMarks = DN.svg('g', null, svg);
    [[0, L('luz', 'light')], [1, L('suco', 'juice')]].forEach(function (m) {
      DN.svg('line', { x1: x(m[0]), x2: x(m[0]), y1: HTOP - 2, y2: ya, stroke: C.ink, 'stroke-width': 1, 'stroke-dasharray': '1 3', opacity: 0.55 }, gMarks);
      DN.svg('rect', { x: x(m[0]) - 3, y: HTOP - 17, width: 6, height: 6, fill: m[0] === 0 ? C.paper : C.ink, stroke: C.ink }, gMarks);
      DN.svg('text', { x: x(m[0]) + 6, y: HTOP - 10, 'font-size': 11, fill: C.ink, 'font-weight': 700 }, gMarks).textContent = m[1];
    });

    // rows
    trials.slice(-ROWS).forEach(function (tr, i, a) { addRowEl(tr, a.length - 1 - i, false); });
    computeHist(); histCur.set(histTo); drawHist();
    relabel();
  }

  function rowPath(tr) {
    var d = '';
    for (var i = 0; i < tr.spikes.length; i++) {
      var t = tr.spikes[i];
      d += 'M' + x(t).toFixed(1) + ' 0.8v' + (RH - 1.6);
    }
    return d;
  }
  function addRowEl(tr, idx, animate) {
    var g = DN.svg('g', { class: 'w05a-row' }, gRows);
    g._tr = tr;
    DN.svg('path', { d: rowPath(tr), stroke: C.ink, 'stroke-width': mob ? 1.1 : 1.2 }, g);
    if (!tr.juice) {
      DN.svg('rect', { x: W - MR + 5, y: 1, width: RH - 2, height: RH - 2, fill: C.pausa }, g);
      DN.svg('line', { x1: x(1), x2: x(1.32), y1: RH / 2, y2: RH / 2, stroke: C.pausa, 'stroke-width': RH - 3, opacity: 0.16 }, g);
    }
    if (tr.n % 10 === 0 || tr.n === 1) {
      DN.svg('text', { x: W - MR + 13, y: RH - 0.5, 'font-size': 8.5, fill: C.dim, class: 'w05a-num' }, g).textContent = tr.n;
    }
    if (animate && !DN.RM) {
      g.style.transform = 'translateY(' + (-RH) + 'px)'; g.style.opacity = '0';
      g.getBoundingClientRect();
      requestAnimationFrame(function () { place(g, idx); g.style.opacity = '1'; });
    } else place(g, idx);
    return g;
  }
  function place(g, idx) { g.style.transform = 'translateY(' + (idx * RH) + 'px)'; }

  function computeHist() {
    var last = trials[trials.length - 1];
    var pool = [];
    for (var i = trials.length - 1; i >= 0 && pool.length < 8; i--) if (trials[i].juice === last.juice) pool.push(trials[i]);
    histTo.fill(0);
    for (var b = 0; b < NB; b++) {
      var s = 0;
      for (var q = 0; q < pool.length; q++) for (var k = 0; k < 4; k++) s += rate(pool[q], T0 + (b + (k + 0.5) / 4) * BW);
      histTo[b] = s / (pool.length * 4);
    }
    histPool = pool.length; histJuice = last.juice;
  }
  var histPool = 0, histJuice = true;

  function drawHist() {
    while (gHist.firstChild) gHist.removeChild(gHist.firstChild);
    var yb = HTOP + HP, bw = (W - ML - MR) / NB;
    function hy(v) { return yb - Math.min(v, YMAX) / YMAX * HP; }
    var by = hy(BASE), up = '', dn = '', out = '';
    for (var b = 0; b < NB; b++) {
      var v = histCur[b], x0 = ML + b * bw, y = hy(v);
      out += (b ? 'L' : 'M') + x0.toFixed(1) + ' ' + y.toFixed(1) + 'L' + (x0 + bw).toFixed(1) + ' ' + y.toFixed(1);
      if (v > BASE + 0.3) up += 'M' + x0.toFixed(1) + ' ' + by.toFixed(1) + 'V' + y.toFixed(1) + 'H' + (x0 + bw).toFixed(1) + 'V' + by.toFixed(1) + 'Z';
      else if (v < BASE - 0.3) dn += 'M' + x0.toFixed(1) + ' ' + by.toFixed(1) + 'V' + y.toFixed(1) + 'H' + (x0 + bw).toFixed(1) + 'V' + by.toFixed(1) + 'Z';
    }
    DN.svg('path', { d: out + 'L' + (W - MR) + ' ' + yb + 'L' + ML + ' ' + yb + 'Z', fill: '#f3f3f3', stroke: 'none' }, gHist);
    if (up) DN.svg('path', { d: up, fill: C.dopa }, gHist);
    if (dn) DN.svg('path', { d: dn, fill: C.pausa }, gHist);
    DN.svg('path', { d: out, fill: 'none', stroke: C.ink, 'stroke-width': 1 }, gHist);
  }
  function tweenHist() {
    histFrom.set(histCur);
    if (DN.RM) { histCur.set(histTo); drawHist(); return; }
    var t0 = performance.now(), dur = 380;
    if (anim) cancelAnimationFrame(anim);
    (function step(now) {
      var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      for (var b = 0; b < NB; b++) histCur[b] = histFrom[b] + (histTo[b] - histFrom[b]) * e;
      drawHist();
      anim = k < 1 ? requestAnimationFrame(step) : null;
    })(t0);
  }

  /* ---------- state changes ---------- */
  function push(omit) {
    var tr = runTrial(omit);
    trials.push(tr);
    if (trials.length > 60) trials.shift();
    var rows = Array.prototype.slice.call(gRows.querySelectorAll('.w05a-row'));
    rows.forEach(function (g) {
      var idx = trials.length - 1 - trials.indexOf(g._tr);
      if (idx >= ROWS || trials.indexOf(g._tr) < 0) { g.remove(); return; }
      place(g, idx);
    });
    addRowEl(tr, 0, true);
    computeHist(); tweenHist(); relabel();
    return tr;
  }

  var busy = false, timer = null;
  function batch(n, gap, after) {
    busy = true; setDisabled(true);
    if (DN.RM) { for (var i = 0; i < n; i++) push(false); done(); return; }
    var c = 0;
    (function tick() {
      push(false); c++;
      if (c < n) timer = setTimeout(tick, gap); else done();
    })();
    function done() { busy = false; setDisabled(false); narrate(); if (after) after(); }
  }
  function setDisabled(v) { [bNext, b20, bOmit, bReset].forEach(function (b) { b.disabled = v && b !== bReset; }); }

  function phase(v) { return v > 0.32 ? 'burst' : (v < -0.3 ? 'pause' : 'base'); }
  function narrate() {
    var tr = trials[trials.length - 1];
    var dl = tr.d[0].v, dj = tr.d[K].v;
    var a = phase(dl), b = phase(dj);
    var wl = { burst: L('Rajada na luz.', 'Burst at the light.'), base: L('Ritmo de fundo na luz.', 'Background rate at the light.'), pause: '' }[a];
    var wj;
    if (!tr.juice) wj = b === 'pause' ? L('Sem suco: pausa onde o suco era esperado.', 'No juice: a pause where the juice was expected.') : L('Sem suco, e o neurônio ainda não o esperava. Nada muda.', 'No juice, and the neuron did not expect it yet. Nothing changes.');
    else wj = b === 'burst' ? L('Rajada no suco.', 'Burst at the juice.') : L('Ritmo de fundo no suco.', 'Background rate at the juice.');
    var ramp = (tr.p > 0.15 && tr.p < 0.85) ? ' ' + L('Rampa de disparo entre a luz e o suco.', 'A ramp of firing between light and juice.') : '';
    live.innerHTML = '<b>' + L('Ensaio ', 'Trial ') + tr.n + '.</b> ' + wl + ' ' + wj + ramp;
  }

  /* brackets in the right gutter: early rows, learned rows, the omitted trial */
  var ANN = [
    { a: 2, b: 2, pt: ['suco retirado:', 'pausa'], en: ['juice removed:', 'a pause'], col: C.pausa },
    { a: 3, b: 14, pt: ['depois de aprender:', 'rajada na luz'], en: ['after learning:', 'burst at the light'], col: C.dopa },
    { a: 31, b: 40, pt: ['primeiros ensaios:', 'rajada no suco'], en: ['first trials:', 'burst at the juice'], col: C.dopa }
  ];
  function drawAnn() {
    if (!gAnn) return;
    while (gAnn.firstChild) gAnn.removeChild(gAnn.firstChild);
    key.innerHTML = '';
    key.hidden = !annotated || !mob;
    if (!annotated) return;
    var top = HTOP + HP + GAP, bx = W - MR + (mob ? 26 : 30);
    ANN.forEach(function (a, i) {
      var y0 = top + a.a * RH + 1, y1 = top + (a.b + 1) * RH - 1, ym = (y0 + y1) / 2;
      DN.svg('path', { d: a.a === a.b ? 'M' + (bx - 4) + ' ' + ym + 'H' + (bx + 3) : 'M' + bx + ' ' + y0 + 'h3V' + y1 + 'h-3M' + (bx + 3) + ' ' + ym + 'h4', fill: 'none', stroke: a.col, 'stroke-width': 1.6 }, gAnn);
      var tx = L(a.pt, a.en);
      if (mob) {
        DN.svg('text', { x: bx + 9, y: ym + 3.5, 'font-size': 10, 'font-weight': 700, fill: C.ink }, gAnn).textContent = 'ABC'[i];
        DN.el('li', null, key).innerHTML = '<b>' + 'ABC'[i] + '</b> ' + tx[0] + ' ' + tx[1];
      } else {
        var t = DN.svg('text', { x: bx + 12, y: ym - 2, 'font-size': 10.5, fill: C.dim }, gAnn);
        t.textContent = tx[0];
        DN.svg('text', { x: bx + 12, y: ym + 11, 'font-size': 10.5, 'font-weight': 700, fill: C.ink }, gAnn).textContent = tx[1];
      }
    });
  }
  function leaveRest() { if (annotated) { annotated = false; drawAnn(); } }

  function relabel() {
    drawAnn();
    bNext.textContent = L('próximo ensaio', 'next trial');
    b20.textContent = L('20 ensaios', '20 trials');
    bOmit.textContent = L('tirar o suco', 'remove the juice');
    bReset.textContent = L('recomeçar', 'start over');
    take.textContent = L('O neurônio dispara para o que não previu. Quando o suco fica previsível, a rajada passa para a luz, e o suco que falta vira uma pausa.',
      'The neuron fires for what it did not predict. Once the juice is predictable, the burst moves to the light, and missing juice becomes a pause.');
    slab.textContent = L('chance de suco', 'chance of juice');
    var pv = Math.round(pJuice * 100) + '%';
    sval.textContent = pv; slider.setAttribute('aria-valuetext', pv);
    if (histLabel) {
      var one = histPool === 1, wj = histJuice;
      histLabel.textContent = mob
        ? L('taxa: ' + (one ? 'último ensaio' : histPool + ' últimos ensaios') + (wj ? ' com suco' : ' sem suco'),
            'rate: ' + (one ? 'last trial' : 'last ' + histPool + ' trials') + (wj ? ' with juice' : ' without juice'))
        : L('taxa de disparo: média ' + (one ? 'do último ensaio' : 'dos últimos ' + histPool + ' ensaios') + (wj ? ' com suco' : ' sem suco'),
            'firing rate: mean of ' + (one ? 'the last trial' : 'the last ' + histPool + ' trials') + (wj ? ' with juice' : ' without juice'));
    }
    if (hint) {
      while (hint.firstChild) hint.removeChild(hint.firstChild);
      if (trials.length < ROWS * 0.4) {
        /* two short lines that fit between the light and juice markers */
        var hl = mob ? L(['uma fileira', 'por ensaio'], ['one row', 'per trial']) : L(['cada ensaio entra', 'como uma fileira', 'no topo'], ['each trial adds', 'a row at the top']);
        hl.forEach(function (t, i) { DN.svg('tspan', { x: x(0.5), dy: i ? 14 : 0 }, hint).textContent = t; });
      }
    }
    if (legOmit) {
      while (legOmit.firstChild) legOmit.removeChild(legOmit.firstChild);
      if (trials.some(function (t) { return !t.juice; })) {
        var yy = H - 8;
        DN.svg('rect', { x: ML, y: yy - 6, width: 5, height: 5, fill: C.pausa }, legOmit);
        DN.svg('text', { x: ML + 9, y: yy, 'font-size': 10, fill: C.dim }, legOmit).textContent = L('ensaio sem suco', 'trial without juice');
      }
    }
    var tr = trials[trials.length - 1];
    svg.setAttribute('aria-label', L('Raster de disparos de um neurônio de dopamina modelado. Ensaio ', 'Spike raster of a modeled dopamine neuron. Trial ') + (tr ? tr.n : 0) + '.');
  }

  bNext.addEventListener('click', function () { if (busy) return; leaveRest(); push(false); narrate(); });
  b20.addEventListener('click', function () { if (busy) return; leaveRest(); batch(20, 140); });
  bOmit.addEventListener('click', function () {
    leaveRest();
    if (busy) return;
    var tr = push(true); narrate();
    if (tr.d[K].v < -0.3) DN.letdown('w05a');
  });
  bReset.addEventListener('click', function () {
    clearTimeout(timer); busy = false; setDisabled(false);
    annotated = false; reset(); slider.value = 100; init5(); build(); narrate();
  });
  slider.addEventListener('input', function () { pJuice = slider.value / 100; relabel(); });
  slider.addEventListener('change', function () {
    leaveRest();
    pJuice = slider.value / 100; relabel();
    if (!busy) batch(12, 110);
  });

  function init5() { for (var i = 0; i < 5; i++) trials.push(runTrial(false)); }

  /* resting state: a neuron already trained for 38 trials, one trial without juice, two more with juice */
  function pretrain() {
    for (var i = 0; i < 38; i++) trials.push(runTrial(false));
    trials.push(runTrial(true));
    for (i = 0; i < 2; i++) trials.push(runTrial(false));
  }
  function restNarrate() {
    live.innerHTML = L('<b>41 ensaios.</b> Embaixo, os primeiros: rajada no suco. Em cima, depois de aprender: rajada na luz, e uma pausa no ensaio sem suco.',
      '<b>41 trials.</b> At the bottom, the first ones: a burst at the juice. At the top, after learning: a burst at the light, and a pause in the trial without juice.');
  }
  reset(); pretrain(); build(); restNarrate();
  DN.onLang(function () { build(); if (annotated) restNarrate(); else narrate(); });
  var rt; window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(function () { if (Math.abs((wrap.clientWidth || 0) - W) > 4) build(); }, 160);
  });
})();
