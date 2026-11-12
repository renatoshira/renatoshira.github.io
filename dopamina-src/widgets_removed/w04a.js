/* w04a · a-barra-que-nao-cabe : guess four bars, then the meth bar breaks the column */
(function () {
  'use strict';
  var root = DN.body('w04a'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, S = DN.svg, E = DN.el, C = DN.COL;

  var IT = [
    { pt: 'chocolate', en: 'chocolate', mob: [['chocolate'], ['chocolate']], v: 55, c: C.sub.comida },
    { pt: 'sexo', en: 'sex', mob: [['sexo'], ['sex']], v: 100, c: C.sub.sexo },
    { pt: 'nicotina', en: 'nicotine', mob: [['nicotina'], ['nicotine']], v: 150, c: C.sub.nicotina },
    { pt: 'metanfetamina', en: 'methamphetamine', mob: [['metanfe-', 'tamina'], ['metham-', 'phetamine']], v: 1000, c: C.sub.anfetamina }
  ];
  var GMAX = 1200, COLV = 150, LOGMAX = 2000;

  var st = {
    g: [100, 100, 100, 100],
    phase: 'guess',          /* guess | shown */
    grow: [0, 0, 0, 0],
    sMax: GMAX,              /* value at the right edge of the plot */
    logT: 0,
    view: 'coluna',          /* coluna | inteira | log */
    padT: 0, extraR: 0, focus: -1, drag: -1
  };
  var G = {};                /* geometry */
  var els = {};
  var anims = [], seqTimer = 0, scrollWatch = null, surprised = false;

  /* ---------- DOM ---------- */
  var hint = E('div', { class: 'glabel w4-hint' }, root);
  var stage = E('div', { class: 'w4-stage' }, root);
  var bleed = E('div', { class: 'w4-bleed', 'aria-hidden': 'true' }, stage);
  var sv = S('svg', { class: 'w4-svg' }, bleed);
  var desc = E('p', { class: 'sr', id: 'w04a-desc' }, root);
  stage.setAttribute('role', 'img');
  stage.setAttribute('aria-describedby', 'w04a-desc');

  var srBox = E('div', { class: 'w4-sliders' }, root);
  var inputs = IT.map(function (it, i) {
    var lab = E('label', { class: 'w4-sl' }, srBox);
    var sp = E('span', null, lab);
    var inp = E('input', { type: 'range', min: '0', max: String(GMAX), step: '5', value: String(st.g[i]) }, lab);
    inp.addEventListener('input', function () { setGuess(i, +inp.value, true); });
    inp.addEventListener('focus', function () { st.focus = i; draw(); });
    inp.addEventListener('blur', function () { st.focus = -1; draw(); });
    return { lab: lab, sp: sp, inp: inp };
  });

  var ctr = E('div', { class: 'rowbtns mt' }, root);
  var bRev = E('button', { class: 'btn solid', type: 'button' }, ctr);
  var seg = E('div', { class: 'w4-seg', role: 'group' }, ctr);
  var bCol = E('button', { class: 'btn', type: 'button', 'aria-pressed': 'false' }, seg);
  var bAll = E('button', { class: 'btn', type: 'button', 'aria-pressed': 'false' }, seg);
  var bLog = E('button', { class: 'btn', type: 'button', 'aria-pressed': 'false' }, seg);
  var bAgain = E('button', { class: 'btn w4-again', type: 'button' }, ctr);
  var live = E('div', { class: 'live', 'aria-live': 'polite' }, root);
  var det = E('details', { class: 'more' }, root);
  var sum = E('summary', null, det);
  var tbl = E('table', { class: 't' }, det);

  if (!DN.RM && window.CSS && CSS.supports && CSS.supports('animation-timeline: view()')) root.classList.add('w4-sd');
  else if (!DN.RM) {
    root.classList.add('w4-io');
    DN.onVisible(stage, function (v) { if (v) root.classList.add('w4-in'); }, { once: true, threshold: 0.3 });
  }

  /* ---------- scales ---------- */
  function pos(v) {
    var lin = v / st.sMax;
    var lg = v <= 10 ? 0 : (Math.log10(v) - 1) / (Math.log10(LOGMAX) - 1);
    return DN.lerp(lin, lg, st.logT);
  }
  function px(v) { return G.vert ? G.yB - pos(v) * (G.yB - G.yT) : G.x0 + pos(v) * (G.x1 - G.x0); }
  function inv(p) {      /* pixel along value axis -> guess value, in the guess-phase linear scale */
    var t = G.vert ? (G.yB - p) / (G.yB - G.yT) : (p - G.x0) / (G.x1 - G.x0);
    return DN.clamp(Math.round(t * GMAX / 5) * 5, 0, GMAX);
  }

  /* ---------- layout (rebuilds the svg) ---------- */
  function layout() {
    var W = stage.clientWidth || 600;
    G.W = W; G.vert = W < 520;
    var cw = document.documentElement.clientWidth;
    var r = stage.getBoundingClientRect();
    root.classList.toggle('w4-vert', G.vert);
    if (G.vert) {
      G.H = 400; G.x0 = 42; G.colW = (W - G.x0) / 4; G.yB = G.H - 58; G.yT = 18;
      G.bw = Math.min(40, G.colW * 0.52);
      st.extraR = 0;
      bleed.style.left = '0px'; bleed.style.width = W + 'px';
    } else {
      G.lw = W < 760 ? 132 : 168;
      G.x0 = G.lw; G.x1 = W - 10; G.rowH = 60; G.top = 34; G.H = G.top + 4 * G.rowH + 48;
      G.bh = 20;
      st.extraR = Math.max(0, Math.floor(cw - r.right));
      st.padT = 0;
      bleed.style.left = '0px'; bleed.style.width = (W + st.extraR) + 'px';
    }
    stage.style.height = G.H + 'px';
    setBleedTop();
    build();
    draw();
  }
  function setBleedTop() {
    bleed.style.top = (-st.padT) + 'px';
    bleed.style.height = (G.H + st.padT + 4) + 'px';
    sv.setAttribute('width', bleed.style.width.replace('px', ''));
    sv.setAttribute('height', G.H + st.padT + 4);
    if (els.g) els.g.setAttribute('transform', 'translate(0,' + st.padT + ')');
  }
  function measurePadTop() {
    if (!G.vert) { st.padT = 0; return; }
    var r = stage.getBoundingClientRect();
    st.padT = DN.clamp(Math.round(r.top), 0, 1600);
  }

  function rowC(i) { return G.vert ? G.x0 + G.colW * (i + 0.5) : G.top + G.rowH * (i + 0.5); }

  function build() {
    while (sv.firstChild) sv.removeChild(sv.firstChild);
    var defs = S('defs', null, sv);
    var g = els.g = S('g', { transform: 'translate(0,' + st.padT + ')' }, sv);
    els.grid = S('g', { class: 'w4-grid' }, g);
    els.base = S('line', { class: 'w4-base' }, g);
    els.rows = IT.map(function (it, i) {
      var R = {};
      var gg = S('g', { class: 'w4-row' }, g);
      R.track = S('line', { class: 'w4-track' }, gg);
      R.gfill = S('rect', { class: 'w4-gfill', fill: it.c, stroke: it.c }, gg);
      R.bar = S('rect', { class: 'w4-bar', fill: it.c }, gg);
      R.gout = S('rect', { class: 'w4-gout' }, gg);
      R.val = S('text', { class: 'w4-val' }, gg);
      R.name = S('text', { class: 'w4-name' }, gg);
      R.sub = S('text', { class: 'w4-sub' }, gg);
      R.hg = S('g', { class: 'w4-handle' }, gg);
      R.hring = S('circle', { r: 13, class: 'w4-hring' }, R.hg);
      R.hline = S('line', { class: 'w4-hline' }, R.hg);
      R.hdot = S('circle', { r: 7, class: 'w4-hdot' }, R.hg);
      R.hit = S('circle', { r: 24, class: 'w4-hit' }, R.hg);
      R.gtxt = S('text', { class: 'w4-gtxt' }, gg);
      R.hit.addEventListener('pointerdown', function (e) { startDrag(i, e); });
      return R;
    });
    /* break mark and label for the last bar */
    els.brk = S('g', { class: 'w4-brk' }, g);
    S('path', { class: 'w4-brk-gap' }, els.brk);
    S('path', { class: 'w4-brk-ln' }, els.brk);
    els.big = S('g', { class: 'w4-big' }, g);
    els.bigBg = S('rect', { class: 'w4-bigbg' }, els.big);
    els.big1 = S('text', { class: 'w4-big1' }, els.big);
    els.big2 = S('text', { class: 'w4-big2' }, els.big);
    els.big3 = S('text', { class: 'w4-big2' }, els.big);
    els.axl = S('text', { class: 'w4-axl' }, g);
  }

  /* ---------- draw ---------- */
  function ticks() {
    if (st.logT > 0.5) return [10, 30, 100, 300, 1000];
    var s = st.sMax, step = s <= 220 ? 25 : s <= 500 ? 100 : 200;
    if (G.vert && s <= 220) step = 50;
    var out = [];
    for (var v = 0; v <= s + 0.01; v += step) out.push(v);
    return out;
  }
  function draw() {
    if (!els.rows) return;
    var vert = G.vert, shown = st.phase === 'shown';
    root.classList.toggle('w4-shown', shown);
    /* grid */
    while (els.grid.firstChild) els.grid.removeChild(els.grid.firstChild);
    ticks().forEach(function (v) {
      var p = px(v);
      if (vert) {
        if (p < G.yT - 1) return;
        S('line', { x1: G.x0 - 4, x2: G.W, y1: p, y2: p, class: v === 0 ? 'w4-zero' : '' }, els.grid);
        S('text', { x: G.x0 - 6, y: p + 3.5, 'text-anchor': 'end' }, els.grid).textContent = fmt(v);
      } else {
        if (p > G.x1 + 1) return;
        S('line', { x1: p, x2: p, y1: G.top - 6, y2: G.top + 4 * G.rowH, class: v === 0 ? 'w4-zero' : '' }, els.grid);
        S('text', { x: p, y: G.top - 12, 'text-anchor': 'middle' }, els.grid).textContent = fmt(v) + '%';
      }
    });
    if (vert) {
      els.base.setAttribute('x1', G.x0); els.base.setAttribute('x2', G.W);
      els.base.setAttribute('y1', G.yB); els.base.setAttribute('y2', G.yB);
    } else {
      els.base.setAttribute('x1', G.x0); els.base.setAttribute('x2', G.x0);
      els.base.setAttribute('y1', G.top - 6); els.base.setAttribute('y2', G.top + 4 * G.rowH);
    }
    var lgi = DN.lang() === 'en' ? 1 : 0;
    var edge = vert ? -st.padT : G.W + st.extraR;      /* where the screen ends */

    IT.forEach(function (it, i) {
      var R = els.rows[i], c = rowC(i), gv = st.g[i], gp = px(gv);
      var rv = it.v * st.grow[i], rp = px(rv);
      var b0 = vert ? G.yB : G.x0;
      /* names */
      if (vert) {
        R.name.setAttribute('x', c); R.name.setAttribute('y', G.yB + 16); R.name.setAttribute('text-anchor', 'middle');
        R.name.textContent = '';
        it.mob[lgi].forEach(function (ln, k) { S('tspan', { x: c, dy: k ? 12 : 0 }, R.name).textContent = ln; });
        R.sub.setAttribute('x', c); R.sub.setAttribute('y', G.yB + (it.mob[lgi].length > 1 ? 42 : 30)); R.sub.setAttribute('text-anchor', 'middle');
      } else {
        R.name.setAttribute('x', 0); R.name.setAttribute('y', c - 2); R.name.setAttribute('text-anchor', 'start');
        R.name.textContent = L(it.pt, it.en);
        R.sub.setAttribute('x', 0); R.sub.setAttribute('y', c + 13); R.sub.setAttribute('text-anchor', 'start');
      }
      R.sub.textContent = shown ? (vert ? '' : L('palpite ', 'guess ')) + fmt(gv) + '%' : '';
      /* track */
      if (vert) setL(R.track, c, G.yB, c, G.yT); else setL(R.track, G.x0, c, G.x1, c);
      R.track.style.opacity = shown ? 0 : 1;
      /* guess fill (guess phase) / outline (shown) */
      var gw = vert ? G.bw : G.bh, ow = gw + 10;
      if (vert) {
        setR(R.gfill, c - gw / 2, gp, gw, b0 - gp);
        setR(R.gout, c - ow / 2, Math.min(gp, b0), ow, Math.abs(b0 - gp));
        R.gfill.style.transformOrigin = c + 'px ' + b0 + 'px';
      } else {
        setR(R.gfill, b0, c - gw / 2, gp - b0, gw);
        setR(R.gout, b0, c - ow / 2, Math.max(0, gp - b0), ow);
        R.gfill.style.transformOrigin = b0 + 'px ' + c + 'px';
      }
      R.gfill.style.display = shown ? 'none' : '';
      R.gout.style.display = shown ? '' : 'none';
      /* real bar: clip drawing at the screen edge */
      if (vert) {
        var top = Math.max(rp, edge - 2);
        setR(R.bar, c - gw / 2, top, gw, Math.max(0, b0 - top));
      } else {
        var right = Math.min(rp, edge + 2);
        setR(R.bar, b0, c - gw / 2, Math.max(0, right - b0), gw);
      }
      R.bar.style.display = shown ? '' : 'none';
      /* value label */
      var over = vert ? rp < G.yT - 2 : rp > G.x1 + 2;
      if (shown && st.grow[i] > 0.02 && !over) {
        R.val.style.display = '';
        R.val.textContent = fmt(Math.round(rv)) + '%';
        if (vert) { R.val.setAttribute('x', c); R.val.setAttribute('y', Math.min(rp, gp) - 7); R.val.setAttribute('text-anchor', 'middle'); }
        else { R.val.setAttribute('x', Math.max(rp, gp) + 8); R.val.setAttribute('y', c + 4); R.val.setAttribute('text-anchor', 'start'); }
        if (!vert && Math.max(rp, gp) + 60 > G.x1 + st.extraR) { R.val.setAttribute('x', Math.min(rp, gp) - 8); R.val.setAttribute('text-anchor', 'end'); R.val.classList.add('w4-val-in'); }
        else R.val.classList.remove('w4-val-in');
      } else R.val.style.display = 'none';
      /* handle */
      R.hg.style.display = shown ? 'none' : '';
      if (vert) {
        R.hg.setAttribute('transform', 'translate(' + c + ',' + gp + ')');
        setL(R.hline, -gw / 2 - 7, 0, gw / 2 + 7, 0);
        R.gtxt.setAttribute('x', c); R.gtxt.setAttribute('y', gp - 18); R.gtxt.setAttribute('text-anchor', 'middle');
      } else {
        R.hg.setAttribute('transform', 'translate(' + gp + ',' + c + ')');
        setL(R.hline, 0, -gw / 2 - 7, 0, gw / 2 + 7);
        R.gtxt.setAttribute('x', gp + 16); R.gtxt.setAttribute('y', c + 4); R.gtxt.setAttribute('text-anchor', 'start');
        if (gp + 70 > G.x1) { R.gtxt.setAttribute('x', gp - 16); R.gtxt.setAttribute('text-anchor', 'end'); }
      }
      R.gtxt.textContent = shown ? '' : fmt(gv) + '%';
      R.hg.classList.toggle('w4-focus', st.focus === i || st.drag === i);
    });

    /* the bar that does not fit */
    var mi = 3, mv = IT[mi].v * st.grow[mi], mp = px(mv), mc = rowC(mi);
    var broke = st.phase === 'shown' && (G.vert ? mp < edge + 30 : mp > edge - 30);
    els.brk.style.display = broke ? '' : 'none';
    els.big.style.display = (st.phase === 'shown' && (G.vert ? mp < G.yT - 4 : mp > G.x1 + 4)) ? '' : 'none';
    var gw2 = (G.vert ? G.bw : G.bh) + 8;
    if (G.vert) {
      var by = edge + 44;
      els.brk.firstChild.setAttribute('d', 'M' + (mc - gw2 / 2) + ' ' + (by + 5) + 'L' + (mc + gw2 / 2) + ' ' + (by - 5) + 'M' + (mc - gw2 / 2) + ' ' + (by + 13) + 'L' + (mc + gw2 / 2) + ' ' + (by + 3));
      els.brk.lastChild.setAttribute('d', els.brk.firstChild.getAttribute('d'));
      bigLabel(mc, G.yB - 10, 'start', true);
    } else {
      var bx = edge - 60;
      els.brk.firstChild.setAttribute('d', 'M' + (bx - 6) + ' ' + (mc + gw2 / 2) + 'L' + (bx + 4) + ' ' + (mc - gw2 / 2) + 'M' + (bx + 4) + ' ' + (mc + gw2 / 2) + 'L' + (bx + 14) + ' ' + (mc - gw2 / 2));
      els.brk.lastChild.setAttribute('d', els.brk.firstChild.getAttribute('d'));
      bigLabel(Math.min(bx + 14, G.W - 4), mc + G.bh / 2 + 22, 'end', false);
    }

    /* axis title */
    els.axl.textContent = st.logT > 0.5 ? L('% acima do basal · escala logarítmica', '% above baseline · log scale') : L('% acima do basal', '% above baseline');
    if (G.vert) { els.axl.setAttribute('x', 0); els.axl.setAttribute('y', G.H - 2); els.axl.setAttribute('text-anchor', 'start'); }
    else { els.axl.setAttribute('x', 0); els.axl.setAttribute('y', G.top - 12); els.axl.setAttribute('text-anchor', 'start'); }
    if (shown) hint.textContent = (st.logT > 0.5 ? L('% acima do basal em escala logarítmica', '% above baseline on a log scale') : L('% acima do nível basal', '% above baseline')) + (G.vert ? L(' · tracejado: palpite', ' · dashed: guess') : L(' · tracejado: seu palpite', ' · dashed: your guess'));
    syncSliders();
  }
  function bigLabel(x, y, anchor, vert) {
    var cols = fmt(IT[3].v / COLV, 1);
    var t1 = L('1.000% · 11 vezes o basal', '1,000% · 11 times baseline');
    var t2 = vert ? L(cols + ' colunas de altura na escala das outras', cols + ' columns tall at the others’ scale') : L('na escala das outras barras, esta teria ' + cols + ' colunas de largura', 'at the scale of the other bars, this one would be ' + cols + ' columns wide');
    els.big.classList.toggle('w4-inbar', vert);
    [els.big1, els.big2].forEach(function (t) { t.setAttribute('text-anchor', anchor); });
    els.big1.textContent = t1; els.big2.textContent = t2; els.big3.textContent = '';
    if (vert) {
      els.big1.setAttribute('x', 0); els.big1.setAttribute('y', 0);
      els.big2.setAttribute('x', 0); els.big2.setAttribute('y', 13);
      els.big.setAttribute('transform', 'translate(' + (x - 4) + ',' + y + ') rotate(-90)');
      els.bigBg.setAttribute('width', 0);
      return;
    }
    els.big.removeAttribute('transform');
    els.big1.setAttribute('x', x); els.big1.setAttribute('y', y);
    els.big2.setAttribute('x', x); els.big2.setAttribute('y', y + 16);
    try {
      var b1 = els.big1.getBBox(), b2 = els.big2.getBBox();
      var x0 = Math.min(b1.x, b2.x) - 6, x1 = Math.max(b1.x + b1.width, b2.x + b2.width) + 6;
      setR(els.bigBg, x0, b1.y - 4, x1 - x0, b2.y + b2.height - b1.y + 8);
    } catch (e) {}
  }
  function setL(n, x1, y1, x2, y2) { n.setAttribute('x1', x1); n.setAttribute('y1', y1); n.setAttribute('x2', x2); n.setAttribute('y2', y2); }
  function setR(n, x, y, w, h) { n.setAttribute('x', x); n.setAttribute('y', y); n.setAttribute('width', Math.max(0, w)); n.setAttribute('height', Math.max(0, h)); }

  /* ---------- guessing ---------- */
  function setGuess(i, v, fromInput) {
    if (st.phase !== 'guess') return;
    st.g[i] = DN.clamp(v, 0, GMAX);
    draw();
    if (fromInput) live.textContent = L(IT[i].pt, IT[i].en) + ': ' + fmt(st.g[i]) + L('% acima do basal', '% above baseline');
  }
  function syncSliders() {
    inputs.forEach(function (o, i) {
      o.inp.value = st.g[i];
      o.inp.disabled = st.phase !== 'guess';
      o.inp.setAttribute('aria-valuetext', fmt(st.g[i]) + L('% acima do basal', '% above baseline'));
    });
  }
  function local(e) {
    var r = stage.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }
  function startDrag(i, e) {
    if (st.phase !== 'guess') return;
    e.preventDefault();
    st.drag = i;
    try { e.target.setPointerCapture(e.pointerId); } catch (er) {}
    var move = function (ev) { var p = local(ev); setGuess(i, inv(G.vert ? p.y : p.x)); };
    var up = function () {
      st.drag = -1; draw();
      e.target.removeEventListener('pointermove', move);
      e.target.removeEventListener('pointerup', up);
      e.target.removeEventListener('pointercancel', up);
      live.textContent = L(IT[i].pt, IT[i].en) + ': ' + fmt(st.g[i]) + L('% acima do basal', '% above baseline');
    };
    e.target.addEventListener('pointermove', move);
    e.target.addEventListener('pointerup', up);
    e.target.addEventListener('pointercancel', up);
    move(e);
  }
  /* tap anywhere on a row to set the guess (click does not fire after a scroll gesture) */
  stage.addEventListener('click', function (e) {
    if (st.phase !== 'guess' || st.drag >= 0) return;
    var p = local(e), i;
    if (G.vert) { i = Math.floor((p.x - G.x0) / G.colW); if (p.x < G.x0 - 6) return; }
    else { i = Math.floor((p.y - G.top) / G.rowH); if (p.x < G.x0 - 12) return; }
    if (i < 0 || i > 3) return;
    setGuess(i, inv(G.vert ? p.y : p.x));
    live.textContent = L(IT[i].pt, IT[i].en) + ': ' + fmt(st.g[i]) + L('% acima do basal', '% above baseline');
  });

  /* ---------- animation helpers ---------- */
  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function easeIO(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function stopAll() {
    anims.forEach(function (a) { a.dead = true; }); anims = [];
    clearTimeout(seqTimer); seqTimer = 0;
    if (scrollWatch) { window.removeEventListener('scroll', scrollWatch); scrollWatch = null; }
  }
  function tween(dur, fn, done, ez) {
    var a = { dead: false }, t0 = performance.now();
    anims.push(a);
    (function step(now) {
      if (a.dead) return;
      var t = DN.clamp((now - t0) / dur, 0, 1);
      fn((ez || ease)(t)); draw();
      if (t < 1) requestAnimationFrame(step); else if (done) done();
    })(t0);
    return a;
  }

  /* ---------- views ---------- */
  function setView(v, animate) {
    st.view = v;
    var target = { sMax: v === 'coluna' ? COLV : GMAX, logT: v === 'log' ? 1 : 0 };
    if (v === 'coluna') measurePadTop(); else if (st.padT && !animate) st.padT = 0;
    setBleedTop();
    [bCol, bAll, bLog].forEach(function (b, k) { b.setAttribute('aria-pressed', ['coluna', 'inteira', 'log'][k] === v ? 'true' : 'false'); });
    if (!animate || DN.RM) {
      st.sMax = target.sMax; st.logT = target.logT; if (v !== 'coluna') { st.padT = 0; setBleedTop(); }
      draw(); narrate(); return;
    }
    var s0 = st.sMax, l0 = st.logT;
    /* interpolate the scale in log space so the zoom feels like a camera pulling back */
    tween(450, function (t) {
      st.sMax = Math.exp(DN.lerp(Math.log(s0), Math.log(target.sMax), t));
      st.logT = DN.lerp(l0, target.logT, t);
    }, function () { if (v !== 'coluna') { st.padT = 0; setBleedTop(); draw(); } narrate(); }, function (t) { return cub(t); });
  }
  /* cubic-bezier(.2,.7,.2,1) */
  function cub(x) {
    var a = 0, b = 1;
    for (var k = 0; k < 24; k++) { var m = (a + b) / 2; if (bz(m, 0.2, 0.2) < x) a = m; else b = m; }
    return bz((a + b) / 2, 0.7, 1);
  }
  function bz(t, p1, p2) { var u = 1 - t; return 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t; }

  function reveal() {
    stopAll();
    st.phase = 'shown';
    var low = IT.some(function (it, i) { return st.g[i] < it.v / 2; });
    if (low && !surprised) { surprised = true; DN.surprise('w04a'); }
    buildTable();
    det.hidden = false;
    setCtrls();
    if (DN.RM) {
      st.grow = [1, 1, 1, 1];
      setView('inteira', false);
      return;
    }
    st.grow = [0, 0, 0, 0];
    setView('coluna', false);
    live.textContent = L('As barras crescem na escala da coluna.', 'The bars grow at the column’s scale.');
    /* the three that fit, then the one that does not */
    IT.forEach(function (it, i) {
      var delay = i * 140, dur = i === 3 ? 1500 : 650;
      setTimeout(function () {
        if (st.phase !== 'shown') return;
        tween(dur, function (t) { st.grow[i] = t; }, i === 3 ? afterGrow : null, i === 3 ? easeIO : ease);
      }, delay);
    });
  }
  function afterGrow() {
    narrate();
    /* scrolling pulls the camera back at once; otherwise it pulls back by itself */
    var y0 = window.scrollY;
    scrollWatch = function () { if (Math.abs(window.scrollY - y0) > 50) go(); };
    window.addEventListener('scroll', scrollWatch, { passive: true });
    seqTimer = setTimeout(go, 1500);
    function go() {
      if (scrollWatch) { window.removeEventListener('scroll', scrollWatch); scrollWatch = null; }
      clearTimeout(seqTimer);
      if (st.view === 'coluna' && st.phase === 'shown') setView('inteira', true);
    }
  }
  function again() {
    stopAll();
    st.phase = 'guess'; st.grow = [0, 0, 0, 0]; st.sMax = GMAX; st.logT = 0; st.padT = 0;
    setBleedTop(); setCtrls(); draw();
    det.hidden = true;
    live.textContent = L('Arraste as alças de novo.', 'Drag the handles again.');
  }

  function narrate() {
    var g = st.g;
    if (st.view === 'coluna') {
      live.textContent = L('Na escala da coluna, a nicotina encosta na margem e a metanfetamina sai da tela: 1.000% acima do basal, 11 vezes o nível de repouso.',
        'At the column’s scale, nicotine touches the margin and methamphetamine runs off the screen: 1,000% above baseline, 11 times the resting level.');
    } else if (st.view === 'inteira') {
      live.textContent = L('Com a metanfetamina na tela, chocolate, sexo e nicotina viram tocos. Seus palpites: ', 'With methamphetamine on screen, chocolate, sex and nicotine shrink to stubs. Your guesses: ') +
        IT.map(function (it, i) { return L(it.pt, it.en) + ' ' + fmt(g[i]) + '%'; }).join(', ') + '.';
    } else {
      live.textContent = L('Na escala logarítmica, cada marca do eixo multiplica o valor por cerca de três. As quatro barras cabem e a ordem fica visível.',
        'On the log scale, each axis mark multiplies the value by about three. All four bars fit and the order is visible.');
    }
  }

  function setCtrls() {
    var shown = st.phase === 'shown';
    bRev.hidden = shown; seg.hidden = !shown; bAgain.hidden = !shown;
    hint.textContent = shown ? L('% acima do nível basal · tracejado: seu palpite', '% above baseline · dashed: your guess') : L('arraste as alças · % acima do nível basal', 'drag the handles · % above baseline');
    srBox.hidden = shown;
  }

  function buildTable() {
    tbl.innerHTML = '';
    var h = E('tr', null, E('thead', null, tbl));
    [L('item', 'item'), L('número de Lembke', 'Lembke’s number'), L('seu palpite', 'your guess'), L('vezes o basal', 'times baseline')].forEach(function (t) { E('th', null, h, t); });
    var tb = E('tbody', null, tbl);
    IT.forEach(function (it, i) {
      var tr = E('tr', null, tb);
      E('td', null, tr, L(it.pt, it.en));
      E('td', null, tr, fmt(it.v) + '%');
      E('td', null, tr, fmt(st.g[i]) + '%');
      E('td', null, tr, fmt(1 + it.v / 100, 2).replace(/[.,]?0+$/, ''));
    });
  }

  function relabel() {
    bRev.textContent = L('revelar', 'reveal');
    bCol.textContent = L('escala da coluna', 'column scale');
    bAll.textContent = L('escala inteira', 'full scale');
    bLog.textContent = L('escala logarítmica', 'log scale');
    bAgain.textContent = L('apostar de novo', 'guess again');
    seg.setAttribute('aria-label', L('escala do gráfico', 'chart scale'));
    sum.textContent = L('tabela', 'table');
    stage.setAttribute('aria-label', L('Barras de dopamina acima do basal: chocolate, sexo, nicotina e metanfetamina.', 'Bars of dopamine above baseline: chocolate, sex, nicotine and methamphetamine.'));
    desc.textContent = L('Segundo Lembke: chocolate 55%, sexo 100%, nicotina 150% e metanfetamina 1.000% acima do basal. Na escala das três primeiras, a barra da metanfetamina sai da tela.',
      'According to Lembke: chocolate 55%, sex 100%, nicotine 150% and methamphetamine 1,000% above baseline. At the scale of the first three, the methamphetamine bar runs off the screen.');
    inputs.forEach(function (o, i) { o.sp.textContent = L('palpite para ', 'guess for ') + L(IT[i].pt, IT[i].en); });
    if (st.phase === 'shown') buildTable();
    setCtrls();
    layout();
  }

  bRev.addEventListener('click', reveal);
  bAgain.addEventListener('click', again);
  bCol.addEventListener('click', function () { stopAll(); setView('coluna', true); });
  bAll.addEventListener('click', function () { stopAll(); setView('inteira', true); });
  bLog.addEventListener('click', function () { stopAll(); setView('log', true); });

  det.hidden = true;
  setCtrls();
  relabel();
  DN.onLang(relabel);
  var rt = 0;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { if (st.view === 'coluna' && st.phase === 'shown') measurePadTop(); layout(); }, 150); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { draw(); });
})();
