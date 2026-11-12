/* w12a · o-pombo : peck a button under a fixed and a variable ratio schedule,
   watch a Skinner-style cumulative record, then see how long you kept pecking
   after the food stopped. */
(function () {
  'use strict';
  var root = DN.body('w12a'); if (!root) return;
  var L = DN.L, C = DN.COL;

  var PRIZES = 6, RATIO = 5, DUR = 40;        /* prizes before the food stops; seconds of paper */

  /* ---------- state ---------- */
  var phase, recs, cur;
  function newRec(kind) {
    var ratios = [];
    if (kind === 'fr') for (var i = 0; i < PRIZES; i++) ratios.push(RATIO);
    else ratios = varRatios();
    return { kind: kind, ratios: ratios, pecks: [], prizes: [], t: 0, started: false, stop: null, ended: false, sinceLast: 0 };
  }
  function varRatios() {   /* PRIZES values in 1..9 with mean exactly RATIO */
    var a, s;
    do {
      a = []; s = 0;
      for (var i = 0; i < PRIZES - 1; i++) { var v = 1 + Math.floor(Math.random() * 9); a.push(v); s += v; }
      var last = PRIZES * RATIO - s; a.push(last);
    } while (last < 1 || last > 9);
    return a;
  }
  /* illustrative records for the resting state: the fixed schedule pauses
     after each prize and quits soon after the food stops; the variable one
     runs steadily and keeps going */
  var GHOST = (function () {
    var fr = { pecks: [], prizes: [], t: DUR, stop: null }, vr = { pecks: [], prizes: [], t: DUR, stop: null };
    var t = 0.6;
    for (var p = 0; p < PRIZES; p++) {
      for (var i = 0; i < RATIO; i++) { fr.pecks.push(t); t += 0.3; }
      fr.prizes.push(fr.pecks.length - 1); t += 2.4;
    }
    fr.stop = fr.pecks[fr.pecks.length - 1];
    for (i = 0; i < 5; i++) { fr.pecks.push(t); t += 0.5; }
    t += 3; for (i = 0; i < 2; i++) { fr.pecks.push(t); t += 0.9; }
    var vrr = [3, 8, 2, 7, 4, 6], c = 0; t = 0.6;
    for (p = 0; p < PRIZES; p++) { for (i = 0; i < vrr[p]; i++) { vr.pecks.push(t); t += 0.34; c++; } vr.prizes.push(c - 1); }
    vr.stop = vr.pecks[vr.pecks.length - 1];
    var gap = 0.36; while (t < DUR - 0.5) { vr.pecks.push(t); t += gap; gap *= 1.012; }
    return [fr, vr];
  })();
  function reset() { phase = 0; recs = [newRec('fr'), newRec('vr')]; cur = recs[0]; }

  /* ---------- risograph pigeon (technique from w00) ----------
     Two spot inks, halftone screens, a grain filter that eats the edges,
     1 to 3 px misregistration, multiply where inks overlap. The head is a
     separate print stacked on the body, so the peck animates one HTML
     element and never re-renders the filtered layers. */
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
  var INKS = [{ k: 'a', col: C.dopa, ang: 15, op: 0.95 }, { k: 'b', col: C.pausa, ang: 75, op: 0.93 }];
  function riso(id, art, seed, specks) {
    var R = rng(seed), defs = '', layers = '';
    INKS.forEach(function (ink, li) {
      var p = id + '-' + ink.k;
      [0.62, 0.92, 1.2].forEach(function (r, j) {
        defs += '<pattern id="' + p + 'h' + (j + 1) + '" width="2.8" height="2.8" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.4" cy="1.4" r="' + r + '" fill="' + ink.col + '"/></pattern>';
      });
      defs += '<filter id="' + p + 'g" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.6" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
      var mx = f1((R() < 0.5 ? -1 : 1) * (0.5 + R() * (li ? 1.3 : 0.6)));
      var my = f1((R() < 0.5 ? -1 : 1) * (0.4 + R() * (li ? 1.1 : 0.5)));
      var body = art[ink.k].replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#' + p + 'h$1)');
      for (var k = 0; k < specks; k++) body += '<circle cx="' + f1(6 + R() * 128) + '" cy="' + f1(6 + R() * 108) + '" r="' + f1(0.3 + R() * 0.5) + '" fill="' + ink.col + '"/>';
      layers += '<g class="w12a-ink w12a-ink-' + ink.k + '" transform="translate(' + mx + ' ' + my + ')" opacity="' + ink.op + '" filter="url(#' + p + 'g)">' + body + '</g>';
    });
    return '<svg viewBox="0 0 140 120" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true"><defs>' + defs + '</defs>' + layers + '</svg>';
  }
  /* a pigeon facing right, toward the key. viewBox 140 x 120 */
  var PIG_BODY = {
    a: '<ellipse cx="84" cy="66" rx="15" ry="17" fill="$1"/>' +
      '<path d="M60,88 L57,108 M73,88 L75,108" stroke="$0" stroke-width="3" stroke-linecap="round" fill="none"/>' +
      '<path d="M50,109 h12 M70,109 h12" stroke="$0" stroke-width="2.6" stroke-linecap="round" fill="none"/>' +
      '<ellipse cx="62" cy="111" rx="30" ry="3" fill="$2"/>',
    b: '<ellipse cx="62" cy="72" rx="35" ry="22" transform="rotate(-16 62 72)" fill="$2"/>' +
      '<path d="M34,78 L4,94 L8,103 L42,90 Z" fill="$0"/>' +
      '<ellipse cx="56" cy="72" rx="25" ry="13" transform="rotate(-12 56 72)" fill="$3"/>' +
      '<path d="M44,70 l14,-4 M47,77 l14,-4" stroke="$0" stroke-width="2.6" stroke-linecap="round" fill="none"/>'
  };
  var PIG_HEAD = {
    a: '<ellipse cx="91" cy="46" rx="9" ry="15" transform="rotate(22 91 46)" fill="$2"/>' +
      '<path d="M109,28 L120,32 L109,35 Z" fill="$0"/>' +
      '<circle cx="104" cy="26" r="1.4" fill="$0"/>',
    b: '<ellipse cx="91" cy="47" rx="8" ry="14" transform="rotate(22 91 47)" fill="$1"/>' +
      '<circle cx="100" cy="29" r="11" fill="$0"/>' +
      '<circle cx="104" cy="26" r="3" fill="#fff" class="w12a-pp"/>'
  };

  /* ---------- DOM ---------- */
  var steps = DN.el('ol', { class: 'w12a-steps' }, root);
  var stepEls = [0, 1, 2].map(function () { return DN.el('li', null, steps); });
  var wrap = DN.el('div', { class: 'cvwrap w12a-paper' }, root);
  var svg = DN.svg('svg', { role: 'img' }, wrap);
  var stage = DN.el('div', { class: 'w12a-stage' }, root);
  var box = DN.el('div', { class: 'w12a-box' }, stage);
  var pig = DN.el('div', { class: 'w12a-pig', 'aria-hidden': 'true' }, box);
  pig.innerHTML = '<div class="w12a-pb">' + riso('w12ap-b', PIG_BODY, 1957, 4) + '</div><div class="w12a-ph">' + riso('w12ap-h', PIG_HEAD, 1958, 0) + '</div>';
  var head = pig.querySelector('.w12a-ph');
  var peck = DN.el('button', { class: 'w12a-peck', type: 'button' }, box);
  var count = DN.el('div', { class: 'w12a-count' }, stage);
  var ctr = DN.el('div', { class: 'rowbtns mt w12a-ctr' }, root);
  var bNext = DN.el('button', { class: 'btn solid', type: 'button' }, ctr);
  var bQuit = DN.el('button', { class: 'btn', type: 'button' }, ctr);
  var live = DN.el('div', { class: 'live', 'aria-live': 'polite' }, root);
  var take = DN.el('p', { class: 'w12a-take' }, root);

  var W = 600, H = 170, ML = 44, MR = 14, MT = 24, MB = 26, STEP = 3, CAP;
  var gGrid, pRec, pPrize, pPen, gStops, gRes;
  function x(t) { return ML + t / DUR * (W - ML - MR); }

  function build() {
    W = Math.max(300, wrap.clientWidth || 600);
    var mob = W < 520;
    H = mob ? 160 : 190; ML = mob ? 34 : 44;
    STEP = mob ? 2.5 : 3;
    CAP = Math.floor((H - MT - MB) / STEP);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    gGrid = DN.svg('g', null, svg);
    var yb = H - MB, yt = MT;
    DN.svg('rect', { x: ML, y: yt, width: W - ML - MR, height: yb - yt, fill: '#fbfaf6', stroke: C.line }, gGrid);
    for (var s = 0; s <= DUR; s += 5) {
      DN.svg('line', { x1: x(s), x2: x(s), y1: yt, y2: yb, stroke: s % 10 ? '#efede6' : '#e4e1d8' }, gGrid);
      if (s % 10 === 0) DN.svg('text', { x: x(s), y: yb + 14, 'text-anchor': 'middle', 'font-size': 10, fill: C.dim }, gGrid).textContent = s + (s === DUR ? ' s' : '');
    }
    for (var c = 10; c < CAP; c += 10) DN.svg('line', { x1: ML, x2: W - MR, y1: yb - c * STEP, y2: yb - c * STEP, stroke: '#efede6' }, gGrid);
    /* scale bar: 20 pecks */
    var sb = 20 * STEP, gs = DN.svg('g', { class: 'w12a-sbar' }, gGrid);
    DN.svg('line', { x1: ML - 8, x2: ML - 8, y1: yb, y2: yb - sb, stroke: C.ink }, gs);
    DN.svg('line', { x1: ML - 11, x2: ML - 5, y1: yb - sb, y2: yb - sb, stroke: C.ink }, gs);
    DN.svg('text', { 'font-size': 10, fill: C.dim, 'text-anchor': 'middle', class: 'w12a-sb', transform: 'translate(' + (ML - 15) + ',' + (yb - sb / 2) + ') rotate(-90)' }, gs);
    gStops = DN.svg('g', null, svg);
    pRec = DN.svg('path', { fill: 'none', stroke: C.ink, 'stroke-width': 1.3, 'stroke-linejoin': 'round' }, svg);
    pPrize = DN.svg('path', { fill: 'none', stroke: C.dopa, 'stroke-width': 2, 'stroke-linecap': 'round' }, svg);
    pPen = DN.svg('circle', { r: 3.2, fill: C.ink }, svg);
    gRes = DN.svg('g', null, svg);
    relabel(); draw();
  }

  /* ---------- record drawing ---------- */
  function recordPath(rec, tEnd) {
    var yb = H - MB, c = 0, d = 'M' + x(0).toFixed(1) + ' ' + yb, pr = '', pi = 0;
    for (var i = 0; i < rec.pecks.length; i++) {
      var t = rec.pecks[i], X = x(t).toFixed(1);
      d += 'H' + X;
      c++;
      var lvl = c % CAP;
      if (lvl === 0) d += 'V' + (yb - CAP * STEP) + 'V' + yb;   /* pen resets, as on the real recorder */
      else d += 'V' + (yb - lvl * STEP).toFixed(1);
      while (pi < rec.prizes.length && rec.prizes[pi] === i) {
        pr += 'M' + X + ' ' + (yb - lvl * STEP).toFixed(1) + 'l5 5';
        pi++;
      }
    }
    var xe = x(Math.min(tEnd, DUR));
    d += 'H' + xe.toFixed(1);
    return { d: d, pr: pr, pen: [xe, yb - (c % CAP) * STEP] };
  }
  function draw() {
    if (!pRec) return;
    while (gStops.firstChild) gStops.removeChild(gStops.firstChild);
    while (gRes.firstChild) gRes.removeChild(gRes.firstChild);
    if (phase === 0 && !cur.started) {
      pRec.style.display = pPrize.style.display = 'none'; pPen.style.display = '';
      pPen.setAttribute('cx', x(0)); pPen.setAttribute('cy', H - MB);
      overlay(GHOST, true);
      return;
    }
    if (phase < 2) {
      pRec.style.display = pPrize.style.display = pPen.style.display = '';
      var r = recordPath(cur, cur.t);
      pRec.setAttribute('d', r.d); pPrize.setAttribute('d', r.pr);
      pPen.setAttribute('cx', r.pen[0]); pPen.setAttribute('cy', r.pen[1]);
      if (cur.ended && cur.stop != null) stopLine(cur.stop, C.ink, true);
      svg.setAttribute('aria-label', L('Registro cumulativo: ', 'Cumulative record: ') + cur.pecks.length + L(' bicadas, ', ' pecks, ') + cur.prizes.length + L(' prêmios.', ' prizes.'));
    } else {
      pRec.style.display = pPrize.style.display = pPen.style.display = 'none';
      overlay(recs, false);
    }
  }
  function stopLine(t, col, label) {
    var X = x(t);
    DN.svg('line', { x1: X, x2: X, y1: MT, y2: H - MB, stroke: col, 'stroke-dasharray': '3 3', opacity: 0.75 }, gStops);
    if (!label) return;
    DN.svg('text', { x: X + 4, y: H - MB - 5, 'font-size': 10, fill: C.dim }, gStops)
      .textContent = L('a comida parou', 'food stopped');
  }
  function overlay(recs, ghost) {
    var yb = H - MB, max = Math.max(10, recs[0].pecks.length, recs[1].pecks.length);
    var k = (yb - MT - 6) / max;
    var cols = [C.ink, C.dopa];
    var ends = [];
    recs.forEach(function (rec, j) {
      var d = 'M' + x(0) + ' ' + yb, c = 0, pr = '';
      rec.pecks.forEach(function (t, i) {
        d += 'H' + x(t).toFixed(1); c++; d += 'V' + (yb - c * k).toFixed(1);
        if (rec.prizes.indexOf(i) >= 0) pr += 'M' + x(t).toFixed(1) + ' ' + (yb - c * k).toFixed(1) + 'l5 5';
      });
      d += 'H' + x(Math.min(rec.t, DUR)).toFixed(1);
      DN.svg('path', { d: d, fill: 'none', stroke: cols[j], 'stroke-width': j ? 2 : 1.4 }, gRes);
      if (pr) DN.svg('path', { d: pr, fill: 'none', stroke: cols[j], 'stroke-width': 1.6, 'stroke-linecap': 'round' }, gRes);
      ends.push([x(Math.min(rec.t, DUR)), yb - c * k]);
    });
    DN.svg('text', { x: ML, y: MT - 8, 'font-size': 10, fill: C.dim }, gRes).textContent = ghost
      ? L('exemplo ilustrativo: bicadas acumuladas', 'illustrative example: cumulative pecks')
      : L('bicadas acumuladas', 'cumulative pecks');
    gRes.setAttribute('class', ghost ? 'w12a-ghost' : '');
    var sA = recs[0].stop, sB = recs[1].stop;
    if (ghost) {
      /* resting state: a hollow mark where the food stopped on each record */
      var stops = [];
      recs.forEach(function (rec, j) {
        var n = rec.pecks.filter(function (t) { return t <= rec.stop + 1e-9; }).length;
        var sx = x(rec.stop), sy = yb - n * k;
        DN.svg('circle', { cx: sx, cy: sy, r: 4, fill: '#fbfaf6', stroke: cols[j], 'stroke-width': 1.6 }, gRes);
        stops.push([sx, sy]);
      });
      var st = stops[0];
      DN.svg('text', { x: st[0] + 6, y: st[1] + 15, 'font-size': 10, fill: C.dim, class: 'w12a-halo' }, gRes)
        .textContent = '○ ' + L('a comida parou', 'food stopped');
    } else {
      if (sA != null) stopLine(sA, C.ink, sB == null || sA <= sB || Math.abs(x(sA) - x(sB)) < 90);
      if (sB != null) stopLine(sB, C.dopa, sA == null || (sB < sA && Math.abs(x(sA) - x(sB)) >= 90));
    }
    /* end labels sit above and left of each record's end, nudged apart when they collide */
    var rgt = ends.map(function (e) { return e[0] > W - 90; });
    var ly = ends.map(function (e, j) { return rgt[j] ? e[1] - 7 : e[1] + 3.5; });
    if (Math.abs(ly[0] - ly[1]) < 13 && Math.abs(ends[0][0] - ends[1][0]) < 90) {
      if (ly[0] >= ly[1]) ly[0] = Math.min(yb - 4, ly[1] + 14); else ly[1] = Math.min(yb - 4, ly[0] + 14);
    }
    [0, 1].forEach(function (j) {
      var lx = ends[j][0], right = rgt[j];
      DN.svg('text', { x: right ? lx - 6 : lx + 7, y: Math.max(MT + 10, ly[j]), 'font-size': 10.5, fill: j ? '#b86a10' : C.ink, 'font-weight': 700, 'text-anchor': right ? 'end' : 'start', class: 'w12a-halo' }, gRes)
        .textContent = j ? L('variável', 'variable') : L('fixa', 'fixed');
    });
    svg.setAttribute('aria-label', L('Os dois registros sobrepostos.', 'Both records overlaid.'));
  }

  /* ---------- clock ---------- */
  var raf = null, last = 0, visible = true;
  function tick(now) {
    raf = null;
    if (!cur.started || cur.ended || phase > 1) return;
    if (visible) {
      cur.t += Math.min(0.1, (now - last) / 1000);
      cur.sinceLast += Math.min(0.1, (now - last) / 1000);
    }
    last = now;
    if (cur.t >= DUR) { cur.t = DUR; endPhase(true); draw(); return; }
    if (cur.stop != null && cur.sinceLast > 8 && !cur.nudged) {
      cur.nudged = true;
      live.textContent = L('O papel continua correndo. Toque em próxima fase quando quiser.', 'The paper keeps running. Tap next phase whenever you like.');
    }
    draw();
    raf = requestAnimationFrame(tick);
  }
  function start() { last = performance.now(); if (!raf) raf = requestAnimationFrame(tick); }

  /* ---------- pecking ---------- */
  function doPeck() {
    if (phase > 1 || cur.ended) return;
    if (!cur.started) { cur.started = true; start(); }
    cur.pecks.push(cur.t); cur.sinceLast = 0;
    bob();
    if (DN.sound()) DN.click(null, 0.03);
    var given = cur.prizes.length;
    if (given < PRIZES) {
      var need = 0; for (var i = 0; i <= given; i++) need += cur.ratios[i];
      if (cur.pecks.length === need) {
        cur.prizes.push(cur.pecks.length - 1);
        prize();
        if (cur.prizes.length === PRIZES) cur.stop = cur.t;    /* extinction starts silently */
      }
    }
    if (DN.RM) draw();
    updCount();
  }
  var bobA = null;
  function bob() {
    if (DN.RM || !head.animate) return;
    if (bobA) bobA.cancel();
    bobA = head.animate([
      { transform: 'rotate(0deg) translate(0,0)' },
      { transform: 'rotate(34deg) translate(5px,1px)', offset: 0.4 },
      { transform: 'rotate(0deg) translate(0,0)' }
    ], { duration: 190, easing: 'cubic-bezier(.3,.6,.3,1)' });
  }
  function prize() {
    peck.classList.remove('glow'); void peck.offsetWidth; peck.classList.add('glow');
    if (navigator.vibrate) { try { navigator.vibrate(25); } catch (e) {} }
    if (phase === 1) DN.reward('w12a');
  }
  function after(rec) { return rec.stop == null ? null : rec.pecks.filter(function (t) { return t > rec.stop + 1e-9; }).length; }

  function endPhase(auto) {
    cur.ended = true;
    if (phase === 0) live.textContent = auto ? L('O papel acabou. Toque em próxima fase.', 'The paper ran out. Tap next phase.') : '';
    if (phase === 1) live.textContent = auto ? L('O papel acabou. Toque em próxima fase para comparar.', 'The paper ran out. Tap next phase to compare.') : '';
    peck.disabled = true;
    relabel();
  }
  function next() {
    if (phase === 2) return;
    if (!cur.ended) endPhase(false);
    phase++;
    if (phase === 1) { cur = recs[1]; peck.disabled = false; }
    if (phase === 2) peck.disabled = true;
    relabel(); draw(); narrate();
  }
  function quit() {
    if (raf) cancelAnimationFrame(raf); raf = null;
    reset(); peck.disabled = false; relabel(); draw(); narrate();
  }

  function updCount() {
    if (phase > 1) { count.textContent = ''; return; }
    count.innerHTML = L('bicadas ', 'pecks ') + '<b>' + cur.pecks.length + '</b> · ' + L('prêmios ', 'prizes ') + '<b>' + cur.prizes.length + '</b>';
  }
  function relabel() {
    var names = [L('razão fixa', 'fixed ratio'), L('razão variável', 'variable ratio'), L('extinção', 'extinction')];
    stepEls.forEach(function (li, i) {
      li.textContent = (i + 1) + ' ' + names[i];
      li.className = i === phase ? 'on' : (i < phase ? 'done' : '');
      if (i === phase) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
    steps.setAttribute('aria-label', L('fases', 'phases'));
    peck.textContent = L('bicar', 'peck');
    bNext.textContent = phase === 2 ? L('fim', 'done') : L('próxima fase', 'next phase');
    bNext.disabled = phase === 2;
    bQuit.textContent = phase === 2 ? L('recomeçar', 'start over') : L('sair', 'quit');
    bQuit.setAttribute('aria-label', L('sair e recomeçar', 'quit and start over'));
    take.textContent = L('Com prêmio imprevisível, o pombo bica sem pausa e continua bicando muito depois que a comida acaba.',
      'With an unpredictable prize, the pigeon pecks without pausing and keeps pecking long after the food runs out.');
    var sb = svg.querySelector('.w12a-sb'); if (sb) sb.textContent = L('20 bicadas', '20 pecks');
    var sbar = svg.querySelector('.w12a-sbar'); if (sbar) sbar.style.display = phase === 2 ? 'none' : '';
    bNext.hidden = phase === 2;
    stage.classList.toggle('w12a-done', phase === 2);
    updCount();
  }
  function narrate() {
    if (phase === 0) live.textContent = L('Fase 1, razão fixa: um prêmio a cada 5 bicadas. O papel começa a correr na primeira bicada. Em algum momento a comida para. Continue enquanto quiser.',
      'Phase 1, fixed ratio: a prize every 5 pecks. The paper starts on your first peck. At some point the food stops. Keep going as long as you like.');
    else if (phase === 1) live.textContent = L('Fase 2, razão variável: um prêmio a cada 5 bicadas em média, sem aviso. Em algum momento a comida para de novo.',
      'Phase 2, variable ratio: a prize every 5 pecks on average, without warning. At some point the food stops again.');
    else {
      var a = after(recs[0]), b = after(recs[1]);
      function part(n, pt, en) {
        return n == null ? L('você saiu da ' + pt + ' antes de a comida parar', 'you left the ' + en + ' before the food stopped')
          : L(n + (n === 1 ? ' bicada' : ' bicadas') + ' depois da ' + pt, n + (n === 1 ? ' peck' : ' pecks') + ' after the ' + en);
      }
      var s = L('Na extinção: ', 'In extinction: ') + part(a, 'razão fixa', 'fixed ratio') + '; ' + part(b, 'razão variável', 'variable ratio') + '.';
      if (a != null && b != null) {
        if (b > a) s += ' ' + L('Você insistiu mais depois do esquema imprevisível, como os pombos de Ferster e Skinner.', 'You kept going longer after the unpredictable schedule, like the pigeons of Ferster and Skinner.');
        else s += ' ' + L('Desta vez você insistiu mais depois do esquema fixo. Nos pombos, o esquema variável resistiu muito mais.', 'This time you kept going longer after the fixed schedule. In the pigeons, the variable schedule lasted much longer.');
      }
      live.innerHTML = s;
    }
  }

  peck.addEventListener('click', doPeck);
  bNext.addEventListener('click', next);
  bQuit.addEventListener('click', quit);
  DN.onVisible(wrap, function (v) { visible = v; });

  reset(); build(); narrate();
  DN.onLang(function () { relabel(); draw(); narrate(); });
  var rt; window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(function () { if (Math.abs((wrap.clientWidth || 0) - W) > 4) build(); }, 160);
  });
})();
