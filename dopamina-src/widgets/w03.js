/* w03 · o-metronomo-e-a-rajada
   A dopamine neuron firing at a tonic rhythm, rolling right to left, with
   buttons for a burst (6 spikes at 20 Hz) and a pause (250 ms of silence).
   Below: extracellular dopamine and schematic D2 / D1 receptor occupancy. */
(function () {
  'use strict';
  var root = DN.body('w03'); if (!root) return;
  var C = DN.COL, L = DN.L, el = DN.el, RM = DN.RM;

  /* ---------- model (schematic) ---------- */
  var DT = 0.002, TAU = 0.25, Q = 1;          /* dopamine: one unit per spike, decays with tau */
  var K2 = 0.3, KOFF2 = 2, K1 = 8, KOFF1 = 10; /* D2 high affinity, D1 low affinity */
  var BURST_N = 6, BURST_ISI = 0.05, PAUSE = 0.25;

  var S = {
    t: 0, rate: 4, next: 0.1, c: 1, o2: 0.77, o1: 0.09,
    spikes: [], queue: [], pauses: [], bursts: [], hist: [], silentUntil: -1, rnd: 12345
  };
  function rnd() { S.rnd = (S.rnd * 1664525 + 1013904223) >>> 0; return S.rnd / 4294967296; }
  function period() { return (1 / S.rate) * (1 + (rnd() - 0.5) * 0.14); }

  function spike(t, kind, clicked) {
    S.spikes.push({ t: t, k: kind });
    S.c += kind === 'b' ? Q * 1.5 : Q;
    if (!clicked && running && DN.sound()) DN.click(undefined, 0.045);
  }
  function step(dtTotal) {
    var n = Math.max(1, Math.round(dtTotal / DT)), i;
    for (i = 0; i < n; i++) {
      var t1 = S.t + DT;
      while (S.queue.length && S.queue[0].t <= t1) { var q = S.queue.shift(); spike(q.t, 'b', q.clicked); }
      if (S.next <= t1) {
        if (S.next >= S.silentUntil) spike(S.next, 't', false);
        S.next = Math.max(S.next, S.silentUntil) + period();
      }
      S.c += -S.c / TAU * DT;
      var kon2 = KOFF2 / K2, kon1 = KOFF1 / K1;
      S.o2 += (kon2 * S.c * (1 - S.o2) - KOFF2 * S.o2) * DT;
      S.o1 += (kon1 * S.c * (1 - S.o1) - KOFF1 * S.o1) * DT;
      S.t = t1;
      if (S.hist.length === 0 || S.t - S.hist[S.hist.length - 1].t >= 0.008) S.hist.push({ t: S.t, c: S.c, o2: S.o2, o1: S.o1 });
    }
    var cut = S.t - WIN - 0.6;
    while (S.hist.length && S.hist[0].t < cut) S.hist.shift();
    while (S.spikes.length && S.spikes[0].t < cut) S.spikes.shift();
    while (S.pauses.length && S.pauses[0].t1 < cut) S.pauses.shift();
    while (S.bursts.length && S.bursts[0].t1 < cut) S.bursts.shift();
  }
  function doBurst() {
    var t = S.t + 0.01, a = DN.sound() ? DN.audio() : null;
    for (var i = 0; i < BURST_N; i++) {
      S.queue.push({ t: t + i * BURST_ISI, clicked: !!a });
      if (a) DN.click(a.currentTime + 0.01 + i * BURST_ISI, 0.07);
    }
    S.bursts.push({ t0: t - 0.02, t1: t + (BURST_N - 1) * BURST_ISI + 0.02 });
    S.silentUntil = Math.max(S.silentUntil, t + (BURST_N - 1) * BURST_ISI + 0.06);
    S.next = S.silentUntil + period() * 0.8;
  }
  function doPause() {
    var t = S.t;
    S.queue = S.queue.filter(function (q) { return q.t < t; });
    S.pauses.push({ t0: t, t1: t + PAUSE });
    S.silentUntil = t + PAUSE;
    S.next = t + PAUSE + 0.03;
  }

  /* ---------- DOM ---------- */
  root.innerHTML = '';
  var bar = el('div', { class: 'rowbtns w03-bar' }, root);
  var bListen = el('button', { class: 'btn w03-listen', type: 'button', 'aria-pressed': 'false' }, bar);
  var bSur = el('button', { class: 'btn w03-sur', type: 'button' }, bar);
  var bLet = el('button', { class: 'btn w03-let', type: 'button' }, bar);
  var wrap = el('div', { class: 'cvwrap w03-cv' }, root);
  var cv = el('canvas', { role: 'img' }, wrap);
  var row = el('div', { class: 'ctrlrow' }, root);
  var lab = el('label', { for: 'w03-rate' }, row);
  var rng = el('input', { type: 'range', id: 'w03-rate', min: 1, max: 8, step: 0.5, value: 4 }, row);
  var rv = el('span', { class: 'v' }, row);
  var take = el('p', { class: 'w03-take' }, root);
  var live = el('div', { class: 'live', 'aria-live': 'polite' }, root);

  var WIN = 4, Wd = 600, Hd = 300, ctx = null, running = false, visible = false, raf = 0, lastT = 0;

  /* ---------- drawing ---------- */
  function layout() {
    WIN = Wd < 520 ? 3 : 4;
    var mob = Wd < 520;
    return {
      l: 0, r: Wd - (mob ? 62 : 74),
      rasT: 22, rasB: 82,
      daT: 122, daB: 160,
      ocT: 220, ocB: Hd - 26,
      mob: mob
    };
  }
  function draw() {
    if (!ctx) return;
    var g = layout(), x0 = g.l, x1 = g.r, tN = S.t, tA = tN - WIN;
    function X(t) { return x0 + (t - tA) / WIN * (x1 - x0); }
    ctx.clearRect(0, 0, Wd, Hd);
    ctx.font = '10px "Space Mono", ui-monospace, monospace';
    ctx.textBaseline = 'alphabetic';


    /* pause / burst shading across all panels */
    S.pauses.forEach(function (p) {
      var a = Math.max(x0, X(p.t0)), b = Math.min(x1, X(p.t1)); if (b <= a) return;
      ctx.fillStyle = C.pausaSoft; ctx.fillRect(a, g.rasT - 4, b - a, g.ocB - g.rasT + 4);
      ctx.fillStyle = C.pausa; ctx.textAlign = 'center';
      if (b - a > 20) ctx.fillText(L('pausa', 'pause'), (a + b) / 2, g.rasB + 13);
      ctx.textAlign = 'left';
    });
    S.bursts.forEach(function (p) {
      var a = Math.max(x0, X(p.t0)), b = Math.min(x1, X(p.t1)); if (b <= a) return;
      ctx.fillStyle = 'rgba(232,149,47,.10)'; ctx.fillRect(a, g.rasT - 4, b - a, g.ocB - g.rasT + 4);
      ctx.fillStyle = '#a8620f'; ctx.textAlign = 'center';
      ctx.fillText(L('rajada', 'burst'), (a + b) / 2, g.rasB + 13);
      ctx.textAlign = 'left';
    });

    /* raster */
    ctx.strokeStyle = C.line; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x0, g.rasB + 0.5); ctx.lineTo(x1, g.rasB + 0.5); ctx.stroke();
    S.spikes.forEach(function (s) {
      if (s.t < tA || s.t > tN) return;
      var x = Math.round(X(s.t)) + 0.5, b = s.k === 'b';
      ctx.strokeStyle = b ? C.dopa : C.ink; ctx.lineWidth = b ? 2.5 : 1.5;
      ctx.beginPath(); ctx.moveTo(x, g.rasB); ctx.lineTo(x, b ? g.rasT - 2 : g.rasT + 14); ctx.stroke();
    });
    /* now marker */
    ctx.strokeStyle = C.mid; ctx.setLineDash([2, 3]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x1 + 0.5, g.rasT - 6); ctx.lineTo(x1 + 0.5, g.ocB); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = C.dim; ctx.fillText(L('agora', 'now'), x1 + 6, g.rasB);

    var H = S.hist;
    /* dopamine area */
    var cMax = 6.5;
    function Yc(c) { return g.daB - Math.min(1, c / cMax) * (g.daB - g.daT); }
    ctx.beginPath(); ctx.moveTo(X(Math.max(tA, H.length ? H[0].t : tA)), g.daB);
    for (var i = 0; i < H.length; i++) if (H[i].t >= tA - 0.02) ctx.lineTo(Math.max(x0, X(H[i].t)), Yc(H[i].c));
    ctx.lineTo(x1, g.daB); ctx.closePath();
    ctx.fillStyle = 'rgba(232,149,47,.30)'; ctx.fill();
    ctx.strokeStyle = C.line; ctx.beginPath(); ctx.moveTo(x0, g.daB + 0.5); ctx.lineTo(x1, g.daB + 0.5); ctx.stroke();

    /* occupancy grid */
    function Yo(o) { return g.ocB - o * (g.ocB - g.ocT); }
    ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.fillStyle = C.mid;
    [0, 0.5, 1].forEach(function (o) {
      var y = Math.round(Yo(o)) + 0.5; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    });
    ctx.textAlign = 'right';
    ctx.fillText('100%', x1 - 2, Yo(1) - 3); ctx.fillText('50%', x1 - 2, Yo(0.5) - 3);
    ctx.textAlign = 'left';
    function curve(key, col, w) {
      ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.beginPath();
      var first = true;
      for (var i = 0; i < H.length; i++) {
        if (H[i].t < tA - 0.02) continue;
        var x = Math.max(x0, X(H[i].t)), y = Yo(H[i][key]);
        if (first) { ctx.moveTo(x, y); first = false; } else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    curve('o2', C.ink, 2);
    curve('o1', C.dopa, 2);
    /* end labels */
    var last = H[H.length - 1] || S, y2 = Yo(last.o2), y1 = Yo(last.o1);
    if (Math.abs(y1 - y2) < 26) { if (y1 > y2) y1 = y2 + 26; else y2 = y1 + 26; }
    ctx.font = 'bold 11px "Space Mono", ui-monospace, monospace';
    ctx.fillStyle = C.ink; ctx.fillText('D2 ' + Math.round(last.o2 * 100) + '%', x1 + 6, y2 + 4);
    ctx.fillStyle = '#a8620f'; ctx.fillText('D1 ' + Math.round(last.o1 * 100) + '%', x1 + 6, y1 + 4);
    /* section labels on a paper backing, drawn last */
    ctx.font = '10px "Space Mono", ui-monospace, monospace';
    var lbl = [[L('DISPAROS DE UM NEURÔNIO', 'SPIKES OF ONE NEURON'), 12, C.dim],
      [L('DOPAMINA FORA DA CÉLULA', 'DOPAMINE OUTSIDE THE CELL'), g.daT - 8, C.dim],
      [L('RECEPTORES OCUPADOS', 'RECEPTORS OCCUPIED'), g.ocT - 36, C.dim]];
    lbl.forEach(function (a) {
      var w = ctx.measureText(a[0]).width;
      ctx.fillStyle = 'rgba(255,255,255,.88)'; ctx.fillRect(x0, a[1] - 10, w + 6, 13);
      ctx.fillStyle = a[2]; ctx.fillText(a[0], x0, a[1]);
    });
    /* legend under the panel title: a short line swatch per receptor */
    var lx = x0, ly = g.ocT - 19;
    [[L('D2 · alta afinidade', 'D2 · high affinity'), C.ink], [L('D1 · baixa afinidade', 'D1 · low affinity'), '#a8620f', C.dopa]].forEach(function (a) {
      ctx.strokeStyle = a[2] || a[1]; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(lx, ly - 3.5); ctx.lineTo(lx + 14, ly - 3.5); ctx.stroke();
      ctx.fillStyle = a[1]; ctx.fillText(a[0], lx + 19, ly);
      lx += 19 + ctx.measureText(a[0]).width + 16;
    });
    ctx.font = '10px "Space Mono", ui-monospace, monospace';
    /* 1 s scale bar */
    var sb = (x1 - x0) / WIN;
    ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(x1 - sb, Hd - 10); ctx.lineTo(x1, Hd - 10); ctx.stroke();
    ctx.fillStyle = C.ink; ctx.textAlign = 'right'; ctx.fillText('1 s', x1 - sb - 6, Hd - 7); ctx.textAlign = 'left';
  }

  function resize() {
    Wd = Math.max(260, root.clientWidth || 600);
    Hd = Wd < 520 ? 324 : 330;
    var f = DN.fitCanvas(cv, Hd); ctx = f.ctx; Wd = f.w;
    draw();
  }
  var rT = 0;
  window.addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(resize, 150); });

  /* ---------- loop ---------- */
  /* while the reader does nothing, the neuron keeps showing one burst and one
     pause in every window, so the trace never becomes plain tonic firing */
  var auto = { next: 0, kind: 'b', userT: -99 };
  function tick(now) {
    raf = 0; if (!running) return;
    var dt = Math.min(0.05, (now - (lastT || now)) / 1000); lastT = now;
    step(dt);
    if (S.t >= auto.next) {
      if (S.t - auto.userT > 5) { if (auto.kind === 'b') doBurst(); else doPause(); }
      auto.kind = auto.kind === 'b' ? 'p' : 'b';
      auto.next = S.t + (WIN < 4 ? 1.5 : 2);
    }
    draw();
    raf = requestAnimationFrame(tick);
  }
  function setRunning(v) {
    running = v && !RM;
    if (running && !raf) { lastT = 0; raf = requestAnimationFrame(tick); }
  }
  DN.onVisible(root, function (v) { visible = v; setRunning(v); });

  /* reduced motion: jump the simulation forward instantly */
  function advanceStatic(sec) { step(sec); draw(); }

  /* ---------- controls ---------- */
  function syncListen() {
    var on = DN.sound();
    bListen.setAttribute('aria-pressed', on ? 'true' : 'false');
    bListen.classList.toggle('w03-hl', !on);
    bListen.textContent = on ? L('♪ som ligado', '♪ sound on') : L('♪ ouvir', '♪ listen');
  }
  bListen.addEventListener('click', function () {
    var on = !DN.sound();
    DN.setSound(on);
    var t = document.getElementById('sndtoggle'); if (t) t.setAttribute('aria-pressed', on ? 'true' : 'false');
    syncListen();
    live.textContent = on ? L('Som ligado. Cada clique é um disparo.', 'Sound on. Each click is one spike.') : L('Som desligado.', 'Sound off.');
  });
  DN.on('sound', syncListen);

  bSur.addEventListener('click', function () {
    auto.userT = S.t; auto.next = S.t + 1.6;
    doBurst();
    if (navigator.vibrate) { try { navigator.vibrate([12, 38, 12, 38, 12, 38, 12, 38, 12, 38, 12]); } catch (e) {} }
    DN.surprise('w03');
    live.textContent = L('Rajada: seis disparos em três décimos de segundo. A dopamina sobe e o D1 salta.', 'Burst: six spikes in three tenths of a second. Dopamine rises and D1 jumps.');
    if (RM) advanceStatic(1.4);
  });
  bLet.addEventListener('click', function () {
    auto.userT = S.t; auto.next = S.t + 1.6;
    doPause();
    DN.letdown('w03');
    live.textContent = L('Pausa: 250 ms sem disparos. A dopamina cai e o D2 perde parte da ocupação.', 'Pause: 250 ms without spikes. Dopamine falls and D2 loses part of its occupancy.');
    if (RM) advanceStatic(1.4);
  });
  var rateMsgT = 0;
  rng.addEventListener('input', function () {
    S.rate = +rng.value; relabelRate();
    S.next = Math.min(S.next, S.t + 1 / S.rate);
    if (RM) { advanceStatic(WIN); }
    clearTimeout(rateMsgT);
    rateMsgT = setTimeout(function () {
      var c = S.rate * Q * TAU, o2 = c / (c + K2), o1 = c / (c + K1);
      live.textContent = L('Ritmo de fundo: ' + DN.fmt(S.rate, S.rate % 1 ? 1 : 0) + ' disparos por segundo. O D2 fica perto de ' + Math.round(o2 * 100) + '% ocupado; o D1, perto de ' + Math.round(o1 * 100) + '%.',
        'Background rhythm: ' + DN.fmt(S.rate, S.rate % 1 ? 1 : 0) + ' spikes per second. D2 settles near ' + Math.round(o2 * 100) + '% occupied; D1 near ' + Math.round(o1 * 100) + '%.');
    }, 600);
  });
  function relabelRate() {
    var s = DN.fmt(S.rate, S.rate % 1 ? 1 : 0) + ' Hz';
    rv.textContent = s;
    rng.setAttribute('aria-valuetext', L(DN.fmt(S.rate, S.rate % 1 ? 1 : 0) + ' disparos por segundo', DN.fmt(S.rate, S.rate % 1 ? 1 : 0) + ' spikes per second'));
  }
  function relabel() {
    syncListen();
    bSur.textContent = L('surpresa', 'surprise');
    bLet.textContent = L('decepção', 'letdown');
    lab.textContent = L('ritmo de fundo', 'background rhythm');
    take.textContent = L('O ritmo de fundo já mantém os receptores D2 ocupados. Os receptores D1 respondem sobretudo às rajadas.',
      'The background rhythm already keeps D2 receptors occupied. D1 receptors respond mostly to bursts.');
    relabelRate();
    cv.setAttribute('aria-label', L('Traçado de disparos de um neurônio de dopamina rolando da direita para a esquerda, a dopamina fora da célula e a ocupação dos receptores D2 (alta e estável) e D1 (baixa, salta nas rajadas).',
      'Spike trace of a dopamine neuron rolling right to left, the dopamine outside the cell, and occupancy of D2 receptors (high and steady) and D1 receptors (low, jumping on bursts).'));
    draw();
  }
  DN.onLang(relabel);

  /* ---------- start ---------- */
  WIN = 4;
  /* the opening picture already holds the three signals: tonic rhythm, one
     burst and one pause, all labelled */
  step(2.2); doBurst(); step(1.7); doPause(); step(1.25);
  auto.next = S.t + 0.75; auto.kind = 'b';
  resize();
  relabel();
  live.textContent = L('O neurônio dispara cerca de 4 vezes por segundo e, de tempos em tempos, solta uma rajada ou faz uma pausa. Toque em ouvir para escutar.', 'The neuron fires about 4 times per second and, every so often, bursts or pauses. Tap listen to hear it.');
  DN.onLang(function () { if (/^(O neurônio dispara|The neuron fires)/.test(live.textContent)) live.textContent = L('O neurônio dispara cerca de 4 vezes por segundo e, de tempos em tempos, solta uma rajada ou faz uma pausa. Toque em ouvir para escutar.', 'The neuron fires about 4 times per second and, every so often, bursts or pauses. Tap listen to hear it.'); });
})();
