/* w10a · a-balanca : Lembke's balance on top of Solomon & Corbit's opponent process.
   Model (illustrative): a(t) = A during the stimulus, fast decay (tauA);
   db/dt = (k·a − b)/tauB, tauB >> tauA; felt = a − b. Each dose raises k and tauB,
   both relax slowly with abstinence. Resting set point s follows −b over ~1.5 days.
   Gremlins on the pain pan = round(b / unit). Physics: Matter.js (beam driven by the
   model through a damped spring, pans kinematic, gremlins and dose weights as bodies). */
(function () {
  'use strict';
  var root = DN.body('w10a'); if (!root) return;
  var L = DN.L, C = DN.COL, fmt = DN.fmt;
  var HAS_M = !!window.Matter && !DN.RM;

  /* ---------------- model ---------------- */
  var P = { A: 1, dur: 1, tauA: 0.08, k0: 0.6, kMax: 2.0, dk: 0.07, tb0: 2, tbMax: 30, dtb: 0.9,
            tauK: 120, tauS: 36, unit: 0.055, dt: 0.02, H: 720, REC: 0.1, DOSE_ADV: 0.25 };
  var M;
  function newModel() {
    return { t: 0, a: 0, b: 0, k: P.k0, tb: P.tb0, s: 0, stimEnd: -1, doses: [], hist: [[0, 0, 0, 0]], nextRec: P.REC, peakDose: 0 };
  }
  function ex(dt, tau) { return 1 - Math.exp(-dt / tau); }
  function step(m, dt) {
    var tgt = m.t < m.stimEnd ? P.A : 0;
    m.a += (tgt - m.a) * ex(dt, P.tauA);
    m.b += (m.k * m.a - m.b) * ex(dt, m.tb);
    m.s += (-m.b - m.s) * ex(dt, P.tauS);
    m.k += (P.k0 - m.k) * ex(dt, P.tauK);
    m.tb += (P.tb0 - m.tb) * ex(dt, P.tauK);
    m.t += dt;
    if (m.t >= m.nextRec - 1e-9) { m.hist.push([m.t, m.a, m.b, m.s]); m.nextRec += P.REC; }
  }
  function advance(m, hours) {
    var end = Math.min(P.H, m.t + hours);
    while (m.t < end - 1e-9) step(m, Math.min(P.dt, end - m.t));
  }
  function dose(m) {
    if (m.t >= P.H) return false;
    m.stimEnd = Math.max(m.stimEnd, m.t) + (m.t < m.stimEnd ? 0.5 : P.dur);
    m.k = Math.min(P.kMax, m.k + P.dk);
    m.tb = Math.min(P.tbMax, m.tb + P.dtb);
    m.doses.push(m.t);
    return true;
  }
  function felt(m) { return m.a - m.b; }
  function day(t) { return Math.floor(t / 24) + 1; }

  /* interval slider: 0..100 log from 168 h to 2 h */
  function ivH(v) { return 168 * Math.pow(2 / 168, v / 100); }
  function ivFmt(h) {
    if (h >= 23.5) { var d = h / 24; return d >= 1.95 || Math.abs(d - 1) > 0.05 ? fmt(d, d < 10 && Math.abs(d - Math.round(d)) > 0.05 ? 1 : 0) + L(' dias', ' days') : L('1 dia', '1 day'); }
    return fmt(h, h < 10 && Math.abs(h - Math.round(h)) > 0.05 ? 1 : 0) + ' h';
  }

  /* ---------------- DOM ---------------- */
  var read = DN.el('p', { class: 'w10a-read' }, root);
  var stage = DN.el('div', { class: 'w10a-stage cvwrap' }, root);
  var cv = DN.el('canvas', { role: 'img' }, stage);
  var hud = DN.el('div', { class: 'w10a-hud', 'aria-hidden': 'true' }, stage);
  var hudClock = DN.el('div', { class: 'w10a-clock' }, hud);
  var hudCount = DN.el('div', { class: 'w10a-count' }, hud);

  var ctr = DN.el('div', { class: 'w10a-ctr' }, root);
  var rowA = DN.el('div', { class: 'rowbtns w10a-btns' }, ctr);
  var bDose = DN.el('button', { class: 'btn solid w10a-dose', type: 'button' }, rowA);
  var bHour = DN.el('button', { class: 'btn', type: 'button' }, rowA);
  var bResist = DN.el('button', { class: 'btn', type: 'button', 'aria-pressed': 'false' }, rowA);
  var bRun = DN.el('button', { class: 'btn', type: 'button', 'aria-pressed': 'false' }, rowA);
  var bReset = DN.el('button', { class: 'btn', type: 'button' }, rowA);
  var rowS = DN.el('div', { class: 'ctrlrow w10a-iv' }, ctr);
  var ivLab = DN.el('label', { for: 'w10a-iv' }, rowS);
  var ivIn = DN.el('input', { type: 'range', id: 'w10a-iv', min: 0, max: 100, step: 1, value: 44 }, rowS);
  var ivV = DN.el('span', { class: 'v' }, rowS);

  var rmRow = DN.el('div', { class: 'rowbtns w10a-rm' }, ctr);
  var bPrev = DN.el('button', { class: 'btn', type: 'button' }, rmRow);
  var bNext = DN.el('button', { class: 'btn solid', type: 'button' }, rmRow);
  var rmLab = DN.el('span', { class: 'w10a-rmlab' }, rmRow);

  var charts = DN.el('div', { class: 'w10a-charts' }, root);
  var c1 = DN.el('div', { class: 'w10a-chart' }, charts);
  var g1 = DN.el('div', { class: 'glabel' }, c1);
  var k1 = DN.el('div', { class: 'w10a-key' }, c1);
  var s1 = DN.svg('svg', { role: 'img' }, c1);
  var c2 = DN.el('div', { class: 'w10a-chart' }, charts);
  var g2 = DN.el('div', { class: 'glabel' }, c2);
  var k2 = DN.el('div', { class: 'w10a-key' }, c2);
  var s2 = DN.svg('svg', { role: 'img' }, c2);
  var live = DN.el('div', { class: 'live', 'aria-live': 'polite' }, root);

  if (DN.RM) { rowA.hidden = true; rowS.hidden = true; } else { rmRow.hidden = true; }

  /* ---------------- state ---------------- */
  var mode = 'idle';           /* idle | hour | run | resist */
  var modeEnd = 0, runNextDose = 0, abstain = false;
  var tgtCount = 0;
  var letdownDone = false, lastAnnDay = 0;
  var rmStep = 0;

  /* ---------------- geometry ---------------- */
  var W = 600, H = 320, ctx, G = {};
  function layout() {
    var f = DN.fitCanvas(cv, (cv.clientWidth || root.clientWidth) < 600 ? 300 : 360);
    ctx = f.ctx; W = f.w; H = f.h;
    var small = W < 600;
    G.floor = H - 18;
    G.px = W * 0.5;
    G.py = small ? 118 : 138;
    G.Lb = small ? W * 0.335 : Math.min(W * 0.31, 250);
    G.hang = small ? 76 : 96;
    G.panW = small ? W * 0.3 : Math.min(200, W * 0.2);
    G.panD = small ? 16 : 20;
    G.thMax = 0.3;
    G.r0 = small ? 5.2 : 9.5;
    G.speedWalk = small ? 70 : 95;
  }

  /* beam spring state */
  var th = 0, om = 0;
  function targetTheta(m) { return -DN.clamp(felt(m) / 1.3, -1, 1) * G.thMax; }
  function endPt(side, ang) { var s = side < 0 ? -1 : 1; return { x: G.px + s * G.Lb * Math.cos(ang), y: G.py + s * G.Lb * Math.sin(ang) }; }
  function panPos(side, ang) { var e = endPt(side, ang); return { x: e.x, y: e.y + G.hang }; }

  /* ---------------- physics ---------------- */
  var engine = null, world = null, panL = null, panR = null;
  var gBodies = [];            /* gremlin bodies on the pain pan */
  var walkers = [];            /* scripted gremlins: in | hopIn | hopOff | out */
  var weights = [];            /* dose weights on the pleasure pan */
  var spawnClock = 0, actClock = 0, seed = 1;
  function rnd() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }

  function gr() { return G.r0 * (0.85 + 0.6 * (M.k - P.k0) / (P.kMax - P.k0)); }
  function strong() { return M.k > 1.15; }

  function makePan() {
    var w = G.panW, d = G.panD, t = 5, wallH = 34, tilt = 0.12, off = Math.sin(tilt) * wallH / 2;
    var parts = [
      Matter.Bodies.rectangle(0, d - t / 2, w, t),
      Matter.Bodies.rectangle(-w / 2 - 2 - off, d - wallH / 2, 4, wallH, { angle: -tilt }),
      Matter.Bodies.rectangle(w / 2 + 2 + off, d - wallH / 2, 4, wallH, { angle: tilt })
    ];
    var b = Matter.Body.create({ parts: parts, isStatic: true, friction: 0.9 });
    return b;
  }
  function panOffset(b) { return { x: b.position.x - b._px, y: b.position.y - b._py }; }

  function buildWorld() {
    if (!HAS_M) return;
    if (engine) { Matter.Engine.clear(engine); Matter.Composite.clear(engine.world, false); }
    engine = Matter.Engine.create({ gravity: { x: 0, y: 1, scale: 0.0012 } });
    engine.positionIterations = 10; engine.velocityIterations = 8;
    world = engine.world;
    panL = makePan(); panR = makePan();
    placePans();
    Matter.Composite.add(world, [panL, panR]);
    gBodies = []; walkers = []; weights = [];
    var n = Math.min(60, tgtCount), r = gr();
    var pts = pileLayout(n, r);
    var pp = panPos(1, th);
    pts.forEach(function (p) { addGremlinBody(pp.x + p.x, pp.y + G.panD - 6 + p.y, r, newLook()); });
    if (M.a > 0.05 || M.t < M.stimEnd) addWeight(true);
  }
  /* pan bodies are positioned so their local origin is the pan rim center */
  function placePans() {
    var a = panPos(-1, th), b = panPos(1, th);
    setPan(panL, a); setPan(panR, b);
  }
  function setPan(body, p) {
    /* compound centroid differs from origin: keep an offset */
    if (body._ox == null) { body._ox = body.position.x; body._oy = body.position.y; }
    Matter.Body.setPosition(body, { x: p.x + body._ox, y: p.y + body._oy }, true);
  }
  function newLook() {
    return { seed: rnd() * 100, blinkT: 1 + rnd() * 4, blink: 0, sq: 0, sqv: 0, disp: 0.2, dispV: 0, ph: rnd() * 6 };
  }
  function addGremlinBody(x, y, r, look) {
    var b = Matter.Bodies.circle(x, y, r, { friction: 0.8, frictionStatic: 1, restitution: 0.15, density: 0.002 });
    Matter.Body.setInertia(b, Infinity);
    b._r = r; b._look = look;
    gBodies.push(b);
    Matter.Composite.add(world, b);
    return b;
  }
  function addWeight(quiet) {
    if (!HAS_M) return;
    var pp = panPos(-1, th);
    var w = G.panW * 0.32, h = G.r0 * 2.1;
    var x = pp.x + (rnd() - 0.5) * G.panW * 0.2;
    var b = Matter.Bodies.rectangle(x, quiet ? pp.y : pp.y - G.hang * 0.55, w, h, { chamfer: { radius: 4 }, friction: 0.9, restitution: 0.2, density: 0.004 });
    b._w = w; b._h = h; b._alpha = 1; b._age = 0; b._kill = false;
    Matter.Body.setAngle(b, (rnd() - 0.5) * 0.4);
    weights.push(b);
    Matter.Composite.add(world, b);
  }

  /* static pile for reduced motion and for > 60 gremlins (relative to the pan floor) */
  function pileLayout(n, r) {
    var pts = [], row = 0, per = Math.max(2, Math.floor((G.panW - 6) / (2 * r))), i = 0;
    while (i < n) {
      var cnt = Math.max(Math.ceil(per / 2), per - row), y = -r - row * r * 1.72;
      var x0 = -(cnt - 1) * r;
      for (var j = 0; j < cnt && i < n; j++, i++) pts.push({ x: x0 + j * 2 * r + (row % 2 ? 0 : 0), y: y });
      row++;
    }
    return pts;
  }

  /* gremlin traffic, called each frame */
  function present() {
    var n = gBodies.length;
    walkers.forEach(function (w) { if (w.st === 'in' || w.st === 'hopIn') n++; });
    return n;
  }
  function traffic(dts) {
    var want = Math.min(60, tgtCount);
    spawnClock -= dts; actClock -= dts;
    var have = present();
    if (have < want && spawnClock <= 0) {
      spawnClock = 0.16 + rnd() * 0.12;
      var r = gr();
      walkers.push({ st: 'in', x: W + r + 4, y: G.floor - r, r: r, look: newLook(), hopX: G.px + G.Lb + G.panW / 2 + 26 + rnd() * 30, t: 0 });
    } else if (have > want && actClock <= 0) {
      actClock = 0.12;
      /* first cancel incoming walkers */
      var inc = null;
      for (var i = walkers.length - 1; i >= 0; i--) if (walkers[i].st === 'in') { inc = walkers[i]; break; }
      if (inc) { inc.st = 'out'; }
      else if (gBodies.length) {
        var top = gBodies.reduce(function (a, b) { return b.position.y < a.position.y ? b : a; });
        removeBody(top);
        walkers.push({ st: 'hopOff', x0: top.position.x, y0: top.position.y, x: top.position.x, y: top.position.y,
          x1: G.px + G.Lb + G.panW / 2 + 30 + rnd() * 40, y1: G.floor - top._r, r: top._r, look: top._look, t: 0, dur: 0.5 });
      }
    }
    var pr = panPos(1, th);
    for (var k = walkers.length - 1; k >= 0; k--) {
      var w = walkers[k];
      w.look.ph += dts * 12;
      if (w.st === 'in') {
        w.x -= G.speedWalk * dts;
        if (w.x <= w.hopX) { w.st = 'hopIn'; w.t = 0; w.x0 = w.x; w.y0 = w.y; w.dur = 0.55; w.tx = (rnd() - 0.5) * G.panW * 0.5; w.look.sqv = -6; }
      } else if (w.st === 'hopIn') {
        w.t += dts / w.dur;
        var ty = pr.y - 26 - w.r;
        gBodies.forEach(function (gb) { ty = Math.min(ty, gb.position.y - gb._r - w.r * 1.4); });
        var tx = pr.x + w.tx;
        var u = Math.min(1, w.t);
        var apex = Math.min(w.y0, ty) - 46;
        w.x = DN.lerp(w.x0, tx, u);
        w.y = (1 - u) * (1 - u) * w.y0 + 2 * (1 - u) * u * (apex - 20) + u * u * ty;
        if (u >= 1) {
          walkers.splice(k, 1);
          var b = addGremlinBody(w.x, w.y, w.r, w.look);
          Matter.Body.setVelocity(b, { x: 0, y: 2 });
          w.look.sqv = 7;
          om += 0.012;
          if (DN.sound() && !DN.RM) blip(520 + rnd() * 160, 0.025);
        }
      } else if (w.st === 'hopOff') {
        w.t += dts / w.dur;
        var u2 = Math.min(1, w.t), ap = Math.min(w.y0, w.y1) - 30;
        w.x = DN.lerp(w.x0, w.x1, u2);
        w.y = (1 - u2) * (1 - u2) * w.y0 + 2 * (1 - u2) * u2 * ap + u2 * u2 * w.y1;
        if (u2 >= 1) { w.st = 'out'; w.look.sqv = 6; }
      } else if (w.st === 'out') {
        w.y = G.floor - w.r; w.x += G.speedWalk * 1.15 * dts;
        if (w.x > W + w.r * 3) walkers.splice(k, 1);
      }
    }
    /* bodies that fell off the pan climb back in */
    for (var j = gBodies.length - 1; j >= 0; j--) {
      var gb = gBodies[j];
      if (gb.position.y > G.floor - gb._r * 0.5 || gb.position.y > pr.y + G.panD + 40 || gb.position.x < -40 || gb.position.x > W + 40) {
        removeBody(gb);
        walkers.push({ st: 'in', x: Math.min(W, Math.max(gb.position.x, G.px + 40)), y: G.floor - gb._r, r: gb._r, look: gb._look, hopX: G.px + G.Lb + G.panW / 2 + 26, t: 0 });
      }
    }
  }
  function removeBody(b) {
    Matter.Composite.remove(world, b);
    var i = gBodies.indexOf(b); if (i >= 0) gBodies.splice(i, 1);
  }
  function rescaleGremlins() {
    var r = gr();
    gBodies.forEach(function (b) {
      if (Math.abs(b._r - r) > 0.05) {
        var f = r / b._r; Matter.Body.scale(b, f, f); Matter.Body.setInertia(b, Infinity); b._r = r; b._look.sqv += 5;
      }
    });
    walkers.forEach(function (w) { w.r = r; });
  }

  /* ---------------- risograph sprites ----------------
     The technique of w00 moved to canvas: two spot inks (amber, indigo), each printed on
     its own offscreen layer with halftone screens at riso angles and a toner grain that eats
     the ink; the indigo layer is laid over the amber one with multiply and 1 to 2 px of
     misregistration. Sprites are pre-rendered per gremlin size and pose and cached, so the
     physics loop only blits images (squash and walk are transforms of the blit). */
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var INK = { a: { col: C.dopa, ang: 15 }, b: { col: C.pausa, ang: 75 } };
  var RISO = { noise: null, pats: {}, cache: {}, n: 0 };
  function srng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function mkCanvas(w, h) { var c = document.createElement('canvas'); c.width = Math.max(1, Math.ceil(w)); c.height = Math.max(1, Math.ceil(h)); return c; }
  function noiseTex() {
    if (RISO.noise) return RISO.noise;
    var N = 192, c = mkCanvas(N, N), x = c.getContext('2d'), im = x.createImageData(N, N), R = srng(1974);
    for (var i = 0; i < N * N; i++) {
      var v = R();
      /* sparse specks of missing toner, a few bigger blotches */
      im.data[i * 4 + 3] = v < 0.16 ? 255 : v < 0.3 ? 120 : 0;
    }
    x.putImageData(im, 0, 0);
    RISO.noise = c;
    return c;
  }
  /* halftone fill for ink k at tone t (1 light, 2 mid, 3 dark) in css px space of a DPR-scaled ctx */
  function tone(x, k, t) {
    var key = k + t, pat = RISO.pats[key];
    if (!pat) {
      var T = 14, c = mkCanvas(T, T), q = c.getContext('2d'), r = [0, 0.62, 0.92, 1.2][t] / 2.8 * T;
      q.fillStyle = INK[k].col; q.beginPath(); q.arc(T / 2, T / 2, r, 0, 7); q.fill();
      pat = RISO.pats[key] = { c: c };
    }
    var p = x.createPattern(pat.c, 'repeat');
    if (p.setTransform && window.DOMMatrix) p.setTransform(new DOMMatrix().rotateSelf(INK[k].ang).scaleSelf(2.8 / 14));
    return p;
  }
  /* one printed sprite: art(x, ink) draws ink 'a' or 'b' into a ctx whose origin is the anchor */
  function print(key, w, h, ox, oy, art, seed) {
    var hit = RISO.cache[key];
    if (hit) return hit;
    var R = srng(seed || 7), pad = 4, W2 = (w + pad * 2) * DPR, H2 = (h + pad * 2) * DPR;
    var out = mkCanvas(W2, H2), o = out.getContext('2d');
    ['a', 'b'].forEach(function (k, li) {
      var lc = mkCanvas(W2, H2), x = lc.getContext('2d');
      x.setTransform(DPR, 0, 0, DPR, (ox + pad) * DPR, (oy + pad) * DPR);
      var drew = art(x, k);
      if (drew === false) return;
      /* toner grain */
      x.setTransform(1, 0, 0, 1, 0, 0);
      x.globalCompositeOperation = 'destination-out';
      x.globalAlpha = 0.55;
      var nz = noiseTex(), sx = -Math.floor(R() * nz.width), sy = -Math.floor(R() * nz.height);
      for (var yy = sy; yy < H2; yy += nz.height) for (var xx = sx; xx < W2; xx += nz.width) x.drawImage(nz, xx, yy);
      /* misregistration, multiply for the second ink */
      var mx = (li ? -1 : 1) * (0.5 + R() * 0.7) * DPR, my = (R() < 0.5 ? -1 : 1) * (0.4 + R() * 0.6) * DPR;
      o.globalCompositeOperation = li ? 'multiply' : 'source-over';
      o.globalAlpha = li ? 0.93 : 0.95;
      o.drawImage(lc, Math.round(mx), Math.round(my));
    });
    hit = { c: out, w: w + pad * 2, h: h + pad * 2, ox: ox + pad, oy: oy + pad };
    if (++RISO.n > 400) { RISO.cache = {}; RISO.n = 0; }
    RISO.cache[key] = hit;
    return hit;
  }
  function blit(sp, x, y) { ctx.drawImage(sp.c, x - sp.ox, y - sp.oy, sp.w, sp.h); }

  function wobble(x, r, sd) {
    x.beginPath();
    var n = 10, pts = [];
    for (var i = 0; i < n; i++) {
      var an = i / n * Math.PI * 2, rr = r * (1 + 0.05 * Math.sin(sd + i * 2.3) + 0.035 * Math.cos(sd * 1.7 + i * 1.3));
      pts.push([Math.cos(an) * rr, Math.sin(an) * rr]);
    }
    for (var j = 0; j <= n; j++) {
      var p0 = pts[j % n], p1 = pts[(j + 1) % n], mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2;
      if (j === 0) x.moveTo(mx, my); else x.quadraticCurveTo(p0[0], p0[1], mx, my);
    }
    x.closePath();
  }
  function rrect(x, X, Y, w, h, rad) {
    x.beginPath();
    x.moveTo(X + rad, Y); x.arcTo(X + w, Y, X + w, Y + h, rad); x.arcTo(X + w, Y + h, X, Y + h, rad);
    x.arcTo(X, Y + h, X, Y, rad); x.arcTo(X, Y, X + w, Y, rad); x.closePath();
  }
  /* gremlin sprite. walk in -2..2 (foot phase), blink 0/1, strong 0/1 */
  function gremlinSprite(r, walk, blink, strong) {
    var rq = Math.round(r * 2) / 2;
    var key = 'g' + rq + '|' + walk + '|' + blink + '|' + strong;
    var top = strong ? rq * 2.0 : rq * 1.5, side = strong ? rq * 1.3 : rq * 1.1;
    return print(key, side * 2, top + rq * 1.12, side, top, function (x, k) {
      var r = rq, wk = walk / 2;
      if (k === 'a') {
        /* amber: an offset halftone blob behind the body, warm cheeks, dumbbell plates */
        x.fillStyle = tone(x, 'a', 2);
        x.beginPath(); x.ellipse(r * 0.16, r * 0.14, r * 0.92, r * 0.88, 0, 0, 7); x.fill();
        x.fillStyle = INK.a.col;
        x.beginPath(); x.ellipse(-r * 0.58, r * 0.28, r * 0.17, r * 0.11, 0, 0, 7); x.ellipse(r * 0.58, r * 0.28, r * 0.17, r * 0.11, 0, 0, 7); x.fill();
        if (strong) {
          var by = -r * 1.55;
          [-1, 1].forEach(function (s2) { rrect(x, s2 * r * 1.05 - r * 0.19, by - r * 0.4, r * 0.38, r * 0.8, r * 0.1); x.fill(); });
        }
        /* paper eyes knock out the amber too */
        x.fillStyle = '#fff';
        if (!blink) { x.beginPath(); x.ellipse(-r * 0.36, -r * 0.12, r * 0.3, r * 0.32, 0, 0, 7); x.ellipse(r * 0.36, -r * 0.12, r * 0.3, r * 0.32, 0, 0, 7); x.fill(); }
        return;
      }
      /* indigo: feet, tufts, body in dark halftone with a solid rim, paper eyes and mouth */
      x.fillStyle = INK.b.col;
      x.beginPath(); x.ellipse(-r * 0.42 + wk * r * 0.2, r * 0.93, r * 0.26, r * 0.14, 0, 0, 7); x.fill();
      x.beginPath(); x.ellipse(r * 0.42 - wk * r * 0.2, r * 0.93, r * 0.26, r * 0.14, 0, 0, 7); x.fill();
      x.strokeStyle = INK.b.col; x.lineCap = 'round'; x.lineWidth = Math.max(1.2, r * 0.15);
      x.beginPath();
      x.moveTo(-r * 0.22, -r * 0.9); x.quadraticCurveTo(-r * 0.34, -r * 1.36, -r * 0.06, -r * 1.42);
      x.moveTo(r * 0.18, -r * 0.92); x.quadraticCurveTo(r * 0.38, -r * 1.3, r * 0.52, -r * 1.2);
      x.stroke();
      wobble(x, r, rq * 3.1);
      x.fillStyle = tone(x, 'b', 3); x.fill();
      x.lineWidth = Math.max(1.2, r * 0.14); x.strokeStyle = INK.b.col; x.stroke();
      if (strong) {
        var by2 = -r * 1.55;
        x.lineWidth = Math.max(1, r * 0.13);
        x.beginPath(); x.moveTo(-r * 0.75, -r * 0.35); x.lineTo(-r * 0.66, by2); x.moveTo(r * 0.75, -r * 0.35); x.lineTo(r * 0.66, by2); x.stroke();
        x.lineWidth = Math.max(1.3, r * 0.17);
        x.beginPath(); x.moveTo(-r * 1.08, by2); x.lineTo(r * 1.08, by2); x.stroke();
      }
      x.fillStyle = '#fff'; x.strokeStyle = '#fff';
      if (!blink) { x.beginPath(); x.ellipse(-r * 0.36, -r * 0.12, r * 0.3, r * 0.32, 0, 0, 7); x.ellipse(r * 0.36, -r * 0.12, r * 0.3, r * 0.32, 0, 0, 7); x.fill(); }
      else {
        x.strokeStyle = '#fff'; x.lineWidth = Math.max(1, r * 0.1);
        x.beginPath(); x.moveTo(-r * 0.6, -r * 0.1); x.lineTo(-r * 0.14, -r * 0.1); x.moveTo(r * 0.14, -r * 0.1); x.lineTo(r * 0.6, -r * 0.1); x.stroke();
      }
      x.lineWidth = Math.max(0.9, r * 0.1); x.strokeStyle = '#fff';
      x.beginPath(); x.arc(0, r * 0.32, r * 0.17, 0.15 * Math.PI, 0.85 * Math.PI); x.stroke();
    }, 300 + Math.round(rq * 10) + walk * 3 + blink * 7);
  }
  function drawGremlin(x, y, r, lk, opt) {
    opt = opt || {};
    var sq = DN.clamp(lk.sq, -0.25, 0.25);
    var walk = opt.walk ? Math.round(Math.sin(lk.ph) * 2) : 0;
    var blink = lk.blink > 0.4 ? 1 : 0;
    var sp = gremlinSprite(r, walk, blink, opt.strong ? 1 : 0), k = r / (Math.round(r * 2) / 2);
    ctx.save();
    ctx.translate(x, y + r * sq * 0.6);
    ctx.scale((1 + sq) * k, (1 - sq) * k);
    ctx.globalAlpha = opt.alpha == null ? 1 : opt.alpha;
    blit(sp, 0, 0);
    if (!blink) {
      /* pupils follow the pleasure pan; solid indigo ink */
      var lookX = opt.lookX == null ? -0.5 : opt.lookX, lookY = opt.lookY == null ? 0 : opt.lookY, rr = Math.round(r * 2) / 2, es = rr * 0.3;
      ctx.fillStyle = C.pausa; ctx.globalAlpha *= 0.95;
      ctx.beginPath();
      ctx.moveTo(-rr * 0.36 + lookX * es * 0.45 + es * 0.44, -rr * 0.12 + lookY * es * 0.4);
      ctx.arc(-rr * 0.36 + lookX * es * 0.45, -rr * 0.12 + lookY * es * 0.4, es * 0.44, 0, 7);
      ctx.moveTo(rr * 0.36 + lookX * es * 0.45 + es * 0.44, -rr * 0.12 + lookY * es * 0.4);
      ctx.arc(rr * 0.36 + lookX * es * 0.45, -rr * 0.12 + lookY * es * 0.4, es * 0.44, 0, 7);
      ctx.fill();
    }
    ctx.restore();
  }
  function roundRect(x, y, w, h, rad) { rrect(ctx, x, y, w, h, rad); }
  function panSprite(side) {
    var w = G.panW, d = G.panD, k = side < 0 ? 'a' : 'b';
    return print('pan' + side + '|' + w.toFixed(1) + '|' + d, w + 12, d * 1.1 + 6, w / 2 + 6, 3, function (x, ink) {
      if (ink !== k) return false;
      x.beginPath();
      x.moveTo(-w / 2 - 4, 0); x.lineTo(w / 2 + 4, 0);
      x.bezierCurveTo(w / 2, d * 1.05, w * 0.3, d * 1.05, 0, d * 1.05);
      x.bezierCurveTo(-w * 0.3, d * 1.05, -w / 2, d * 1.05, -w / 2 - 4, 0);
      x.closePath();
      x.fillStyle = tone(x, k, 1); x.fill();
      x.lineWidth = 2.6; x.lineJoin = 'round'; x.strokeStyle = INK[k].col; x.stroke();
    }, side < 0 ? 41 : 43);
  }
  function weightSprite(w, h) {
    var lab = L('dose', 'dose');
    return print('wt' + w.toFixed(1) + '|' + h.toFixed(1) + '|' + lab, w + 4, h + h * 0.4 + 4, w / 2 + 2, h / 2 + h * 0.4 + 2, function (x, k) {
      if (k === 'a') { rrect(x, -w / 2, -h / 2, w, h, 4); x.fillStyle = INK.a.col; x.fill(); return; }
      x.strokeStyle = INK.b.col; x.lineWidth = 1.8;
      x.beginPath(); x.arc(0, -h / 2, h * 0.36, Math.PI, 0); x.stroke();
      rrect(x, -w / 2, -h / 2, w, h, 4); x.lineWidth = 1.6; x.stroke();
      x.fillStyle = tone(x, 'b', 1); rrect(x, -w / 2 + 3, h * 0.1, w - 6, h * 0.3, 2); x.fill();
      x.fillStyle = INK.b.col; x.font = '700 ' + Math.round(h * 0.5) + 'px "Space Mono", monospace';
      x.textAlign = 'center'; x.textBaseline = 'middle';
      x.fillText(lab, 0, -h * 0.06);
    }, 97);
  }
  function drawPan(side, p, col, soft, label, glow) {
    var w = G.panW, d = G.panD;
    var e = endPt(side, th);
    /* strings */
    ctx.strokeStyle = C.ink; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(e.x, e.y); ctx.lineTo(p.x - w / 2, p.y); ctx.moveTo(e.x, e.y); ctx.lineTo(p.x + w / 2, p.y); ctx.stroke();
    if (glow > 0.01) {
      var gg = ctx.createRadialGradient(p.x, p.y + d * 0.4, 4, p.x, p.y + d * 0.4, w * 0.9);
      gg.addColorStop(0, 'rgba(232,149,47,' + (0.3 * glow) + ')'); gg.addColorStop(1, 'rgba(232,149,47,0)');
      ctx.fillStyle = gg; ctx.fillRect(p.x - w, p.y - w * 0.7, w * 2, w * 1.5);
    }
    blit(panSprite(side), p.x, p.y);
    ctx.font = '700 ' + (W < 600 ? 9 : 10) + 'px "Space Mono", monospace';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    /* the pan's name hangs below the bowl, clear of the weights and gremlins */
    ctx.fillStyle = col;
    ctx.fillText(label.toUpperCase(), p.x, p.y + d * 1.05 + 12);
  }
  function drawBack(m) {
    ctx.clearRect(0, 0, W, H);
    /* floor */
    ctx.strokeStyle = C.ink; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(0, G.floor + 0.5); ctx.lineTo(W, G.floor + 0.5); ctx.stroke();
    /* stand */
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(G.px - 30, G.floor); ctx.lineTo(G.px, G.py); ctx.lineTo(G.px + 30, G.floor);
    ctx.moveTo(G.px - 44, G.floor); ctx.lineTo(G.px + 44, G.floor);
    ctx.stroke();
    /* dial above pivot */
    var R = W < 600 ? 34 : 44, cy = G.py;
    ctx.lineWidth = 1; ctx.strokeStyle = C.mid;
    ctx.beginPath(); ctx.arc(G.px, cy, R, Math.PI + 0.55, 2 * Math.PI - 0.55); ctx.stroke();
    for (var i = -3; i <= 3; i++) {
      var an = -Math.PI / 2 + i / 3 * (Math.PI / 2 - 0.55);
      var r1 = R - (i === 0 ? 7 : 4);
      ctx.strokeStyle = i === 0 ? C.ink : C.mid; ctx.lineWidth = i === 0 ? 1.5 : 1;
      ctx.beginPath(); ctx.moveTo(G.px + Math.cos(an) * r1, cy + Math.sin(an) * r1); ctx.lineTo(G.px + Math.cos(an) * R, cy + Math.sin(an) * R); ctx.stroke();
    }
    /* set point tick on the dial (dashed) */
    var spAng = -Math.PI / 2 + DN.clamp(-m.s / 1.3, -1, 1) * (Math.PI / 2 - 0.55) * (G.thMax / 0.3);
    if (Math.abs(m.s) > 0.01) {
      ctx.save(); ctx.setLineDash([3, 3]); ctx.strokeStyle = C.ink; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.moveTo(G.px + Math.cos(spAng) * 6, cy + Math.sin(spAng) * 6); ctx.lineTo(G.px + Math.cos(spAng) * (R + 6), cy + Math.sin(spAng) * (R + 6)); ctx.stroke();
      ctx.restore();
    }
    ctx.font = (W < 600 ? 9 : 10) + 'px "Space Mono", monospace'; ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = C.dopa; ctx.textAlign = 'right';
    ctx.fillText(L('prazer', 'pleasure'), G.px - R * 0.62, cy - R * 0.92);
    ctx.fillStyle = C.pausa; ctx.textAlign = 'left';
    ctx.fillText(L('dor', 'pain'), G.px + R * 0.62, cy - R * 0.92);
  }
  function drawBeam() {
    var a = endPt(-1, th), b = endPt(1, th);
    ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    ctx.fillStyle = C.paper; ctx.lineWidth = 1.6;
    [a, b].forEach(function (p) { ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, 7); ctx.fill(); ctx.stroke(); });
    /* needle (perpendicular to beam) */
    var R = W < 600 ? 34 : 44;
    var na = th - Math.PI / 2;
    ctx.strokeStyle = C.ink; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(G.px, G.py); ctx.lineTo(G.px + Math.cos(na) * (R - 3), G.py + Math.sin(na) * (R - 3)); ctx.stroke();
    ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(G.px, G.py, 5, 0, 7); ctx.fill();
    ctx.fillStyle = C.paper; ctx.beginPath(); ctx.arc(G.px, G.py, 1.8, 0, 7); ctx.fill();
  }
  function drawWeight(x, y, ang, w, h, alpha) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.globalAlpha = alpha;
    blit(weightSprite(w, h), 0, 0);
    ctx.restore();
  }

  function lookDir(x, y) {
    /* gremlins watch the pleasure pan: the higher the pleasure, the wider they stare */
    var pl = panPos(-1, th), dx = pl.x - x, dy = pl.y - y, d = Math.hypot(dx, dy) || 1;
    return { x: dx / d, y: dy / d * 0.6 };
  }

  function drawScene(dts) {
    drawBack(M);
    var pl = panPos(-1, th), pr = panPos(1, th);
    var f = felt(M);
    drawBeam();
    /* weights: physics or static */
    var aAlpha = DN.clamp(M.a / 0.4, 0, 1);
    if (HAS_M) {
      weights.forEach(function (b) { drawWeight(b.position.x, b.position.y, b.angle, b._w, b._h, Math.max(0, b._alpha)); });
    } else if (M.a > 0.05) {
      var wh = G.r0 * 2.3; drawWeight(pl.x, pl.y + G.panD - 6 - wh / 2, 0, G.panW * 0.36, wh, aAlpha);
    }
    drawPan(-1, pl, C.dopa, 'rgba(232,149,47,.14)', L('prazer', 'pleasure'), Math.max(0, f));
    /* gremlins */
    var st = strong();
    if (HAS_M) {
      gBodies.forEach(function (b) {
        var ld = lookDir(b.position.x, b.position.y);
        drawGremlin(b.position.x, b.position.y, b._r * gscale(b._look), b._look, { strong: st, lookX: ld.x, lookY: ld.y });
      });
      walkers.forEach(function (w) {
        var out = w.st === 'out' || w.st === 'hopOff';
        drawGremlin(w.x, w.y, w.r * gscale(w.look), w.look, { walk: w.st === 'in' || w.st === 'out', strong: st, lookX: out ? 0.9 : -0.9, lookY: 0 });
      });
      var extra = Math.max(0, tgtCount - 60);
      if (extra) staticPile(extra, pr, -60);
    } else {
      staticPile(tgtCount, pr, 0);
    }
    drawPan(1, pr, C.pausa, 'rgba(59,63,158,.12)', L('dor', 'pain'), 0);
  }
  function gscale() { return 1; }
  var staticLooks = [];
  function staticPile(n, pr, yoff) {
    var r = gr(), pts = pileLayout(n, r), st = strong();
    for (var i = 0; i < pts.length; i++) {
      if (!staticLooks[i]) staticLooks[i] = newLook();
      var x = pr.x + pts[i].x, y = pr.y + G.panD - 5 + pts[i].y + yoff;
      var ld = lookDir(x, y);
      drawGremlin(x, y, r, staticLooks[i], { strong: st, lookX: ld.x, lookY: ld.y });
    }
  }
  function animLooks(dts) {
    function an(lk) {
      lk.blinkT -= dts;
      if (lk.blinkT <= 0) { lk.blink = 1; lk.blinkT = 2 + rnd() * 5; }
      lk.blink = Math.max(0, lk.blink - dts * 7);
      /* squash spring */
      lk.sqv += (-lk.sq * 260 - lk.sqv * 14) * dts;
      lk.sq += lk.sqv * dts * 0.06;
    }
    gBodies.forEach(function (b) { an(b._look); });
    walkers.forEach(function (w) { an(w.look); });
    staticLooks.forEach(an);
  }

  /* ---------------- charts ---------------- */
  var CH = {};
  var YD = [-1.45, 1.2];
  function buildCharts() {
    [s1, s2].forEach(function (s) { while (s.firstChild) s.removeChild(s.firstChild); });
    var w1 = c1.clientWidth || 300, w2 = c2.clientWidth || 300, h = W < 600 ? 150 : 170;
    CH.h1 = mkChart(s1, w1, h, 'h');
    CH.h2 = mkChart(s2, w2, h, 'd');
  }
  function mkChart(s, w, h, kind) {
    var m = { l: 60, r: 8, t: 10, b: 22 };
    s.setAttribute('viewBox', '0 0 ' + w + ' ' + h); s.setAttribute('width', w); s.setAttribute('height', h);
    var o = { s: s, w: w, h: h, m: m, kind: kind };
    o.y = function (v) { return m.t + (YD[1] - v) / (YD[1] - YD[0]) * (h - m.t - m.b); };
    var y0 = o.y(0);
    var id = 'w10a' + kind;
    var defs = DN.svg('defs', null, s);
    var cpA = DN.svg('clipPath', { id: id + 'up' }, defs); DN.svg('rect', { x: 0, y: 0, width: w, height: y0 }, cpA);
    var cpB = DN.svg('clipPath', { id: id + 'dn' }, defs); DN.svg('rect', { x: 0, y: y0, width: w, height: h }, cpB);
    o.gx = DN.svg('g', { class: 'ax' }, s);
    [1, 0.5, 0, -0.5, -1].forEach(function (v) {
      DN.svg('line', { x1: m.l, x2: w - m.r, y1: o.y(v), y2: o.y(v), stroke: v === 0 ? C.ink : C.line, 'stroke-width': v === 0 ? 1 : 1 }, s);
    });
    /* axis words sit between grid lines, vertically centred, never on a line */
    o.yl1 = DN.svg('text', { x: m.l - 6, y: o.y(0.75), 'text-anchor': 'end', 'dominant-baseline': 'central', 'font-size': 9.5, fill: C.dopa }, s);
    o.yl2 = DN.svg('text', { x: m.l - 6, y: o.y(-0.75), 'text-anchor': 'end', 'dominant-baseline': 'central', 'font-size': 9.5, fill: C.pausa }, s);
    o.yl0 = DN.svg('text', { x: m.l - 6, y: y0, 'text-anchor': 'end', 'dominant-baseline': 'central', 'font-size': 9.5, fill: C.ink }, s);
    o.areaUp = DN.svg('path', { fill: C.dopaSoft, 'clip-path': 'url(#' + id + 'up)', stroke: 'none' }, s);
    o.areaDn = DN.svg('path', { fill: C.pausaSoft, 'clip-path': 'url(#' + id + 'dn)', stroke: 'none' }, s);
    if (kind === 'h') {
      o.pa = DN.svg('path', { fill: 'none', stroke: C.dopa, 'stroke-width': 1.6 }, s);
      o.pb = DN.svg('path', { fill: 'none', stroke: C.pausa, 'stroke-width': 1.6 }, s);
    }
    o.pf = DN.svg('path', { fill: 'none', stroke: C.ink, 'stroke-width': kind === 'h' ? 2.6 : 1.2, 'stroke-linejoin': 'round' }, s);
    if (kind === 'd') o.ps = DN.svg('path', { fill: 'none', stroke: C.ink, 'stroke-width': 1.8, 'stroke-dasharray': '5 4' }, s);
    o.rug = DN.svg('path', { stroke: C.dopa, 'stroke-width': 1.5, fill: 'none' }, s);
    o.cur = DN.svg('line', { y1: m.t, y2: h - m.b, stroke: C.ink, 'stroke-width': 1, 'stroke-dasharray': '1 3' }, s);
    o.ticks = DN.svg('g', null, s);
    if (kind === 'h') o.hint = DN.svg('text', { x: m.l + (w - m.l - m.r) / 2, y: o.y(0.25), 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': 11, fill: C.dim }, s);
    return o;
  }
  function chartLabels() {
    [CH.h1, CH.h2].forEach(function (o) {
      if (!o) return;
      o.yl1.textContent = L('prazer', 'pleasure'); o.yl2.textContent = L('dor', 'pain'); o.yl0.textContent = '0';
      o.s.setAttribute('aria-label', o.kind === 'h'
        ? L('Gráfico das últimas 24 horas: processo rápido em âmbar, processo lento em índigo e o que se sente em preto.', 'Chart of the last 24 hours: fast process in amber, slow process in indigo and what is felt in black.')
        : L('Gráfico de 30 dias: o que se sente e o ponto de equilíbrio em repouso, tracejado.', 'Thirty day chart: what is felt and the resting set point, dashed.'));
    });
    g1.textContent = L('as últimas 24 horas', 'the last 24 hours');
    g2.textContent = L('30 dias', '30 days');
    k1.innerHTML = '<span><i style="background:' + C.dopa + '"></i>' + L('processo rápido (a)', 'fast process (a)') + '</span>' +
      '<span><i style="background:' + C.pausa + '"></i>' + L('processo lento (b), para baixo', 'slow process (b), pulling down') + '</span>' +
      '<span><i class="thick"></i>' + L('o que se sente (a − b)', 'what is felt (a − b)') + '</span>';
    k2.innerHTML = '<span><i class="thick thin"></i>' + L('o que se sente', 'what is felt') + '</span>' +
      '<span><i class="dash"></i>' + L('ponto de equilíbrio em repouso', 'resting set point') + '</span>' +
      '<span><i style="background:' + C.dopa + ';width:3px"></i>' + L('doses', 'doses') + '</span>';
  }
  function drawCharts(m) {
    if (!CH.h1) return;
    var o = CH.h1, hist = m.hist, m1 = o.m;
    var end = Math.max(24, m.t), start = end - 24;
    var X = function (t) { return m1.l + (t - start) / 24 * (o.w - m1.l - m1.r); };
    var i0 = Math.max(0, Math.floor(start / P.REC) - 1);
    var da = '', db = '', df = '', ar = '';
    for (var i = i0; i < hist.length; i++) {
      var hh = hist[i]; if (hh[0] < start - 1e-6) continue;
      var x = X(hh[0]).toFixed(1);
      var c = (da ? 'L' : 'M');
      da += c + x + ',' + o.y(hh[1]).toFixed(1);
      db += c + x + ',' + o.y(-hh[2]).toFixed(1);
      df += c + x + ',' + o.y(hh[1] - hh[2]).toFixed(1);
    }
    var cx = X(m.t);
    df += hist.length ? 'L' + cx.toFixed(1) + ',' + o.y(felt(m)).toFixed(1) : '';
    o.pa.setAttribute('d', da); o.pb.setAttribute('d', db); o.pf.setAttribute('d', df);
    var firstX = X(Math.max(start, hist[i0] ? hist[i0][0] : 0));
    ar = df ? df + 'L' + cx.toFixed(1) + ',' + o.y(0) + 'L' + firstX.toFixed(1) + ',' + o.y(0) + 'Z' : '';
    o.areaUp.setAttribute('d', ar); o.areaDn.setAttribute('d', ar);
    o.cur.setAttribute('x1', cx); o.cur.setAttribute('x2', cx);
    o.hint.textContent = m.doses.length ? '' : L('ponha uma dose para começar', 'give a dose to begin');
    var rug = '';
    m.doses.forEach(function (t) { if (t >= start) { var xx = X(t).toFixed(1); rug += 'M' + xx + ',' + m1.t + 'v7'; } });
    o.rug.setAttribute('d', rug);
    /* hour ticks */
    var tk = '';
    while (o.ticks.firstChild) o.ticks.removeChild(o.ticks.firstChild);
    var step6 = 6;
    for (var t = Math.ceil(start / step6) * step6; t <= end + 1e-6; t += step6) {
      var tx = DN.svg('text', { x: X(t), y: o.h - 6, 'text-anchor': 'middle', 'font-size': 9.5, fill: C.dim }, o.ticks);
      tx.textContent = (t === 0 ? '0' : fmt(t, 0)) + ' h';
    }
    /* ---- 30 days ---- */
    var q = CH.h2, m2 = q.m, pw = q.w - m2.l - m2.r;
    var X2 = function (t) { return m2.l + t / P.H * pw; };
    var buckets = Math.max(10, Math.floor(pw / 1.5)), mins = [], maxs = [], ss = [];
    for (var j = 0; j < hist.length; j++) {
      var hj = hist[j], bi = Math.min(buckets - 1, Math.floor(hj[0] / P.H * buckets)), fv = hj[1] - hj[2];
      if (mins[bi] == null || fv < mins[bi]) mins[bi] = fv;
      if (maxs[bi] == null || fv > maxs[bi]) maxs[bi] = fv;
      ss[bi] = hj[3];
    }
    var top = '', bot = '', sp = '', last = -1;
    for (var k = 0; k < buckets; k++) {
      if (mins[k] == null) continue;
      var bx = (m2.l + (k + 0.5) / buckets * pw).toFixed(1);
      top += (top ? 'L' : 'M') + bx + ',' + q.y(maxs[k]).toFixed(1);
      bot = 'L' + bx + ',' + q.y(mins[k]).toFixed(1) + bot;
      sp += (sp ? 'L' : 'M') + bx + ',' + q.y(ss[k]).toFixed(1);
      last = k;
    }
    var band = top ? top + bot + 'Z' : '';
    q.pf.setAttribute('d', band); q.pf.setAttribute('fill', 'rgba(20,20,20,.07)');
    q.areaUp.setAttribute('d', band); q.areaDn.setAttribute('d', band);
    q.ps.setAttribute('d', sp);
    var cx2 = X2(m.t); q.cur.setAttribute('x1', cx2); q.cur.setAttribute('x2', cx2);
    var rug2 = '';
    m.doses.forEach(function (t) { rug2 += 'M' + X2(t).toFixed(1) + ',' + m2.t + 'v6'; });
    q.rug.setAttribute('d', rug2);
    if (!q.ticked) {
      q.ticked = true;
      [0, 7, 14, 21, 30].forEach(function (d) {
        var tx2 = DN.svg('text', { x: X2(d * 24), y: q.h - 6, 'text-anchor': d === 0 ? 'start' : d === 30 ? 'end' : 'middle', 'font-size': 9.5, fill: C.dim }, q.ticks);
        tx2.setAttribute('data-d', d);
      });
    }
    Array.prototype.forEach.call(q.ticks.childNodes, function (n) {
      var d = +n.getAttribute('data-d'); n.textContent = d === 0 ? L('dia 0', 'day 0') : fmt(d, 0);
    });
  }

  /* ---------------- HUD, narration ---------------- */
  function clockStr(t) {
    var h = t % 24, hh = Math.floor(h), mm = Math.floor((h - hh) * 60 / 15) * 15;
    return L('dia ', 'day ') + day(Math.min(t, P.H - 1e-6)) + ' · ' + (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm;
  }
  function hudUpdate() {
    hudClock.textContent = clockStr(M.t);
    var n = tgtCount;
    hudCount.innerHTML = '<b>' + n + '</b> ' + (n === 1 ? 'gremlin' : 'gremlins');
  }
  function narrText() {
    var pct = Math.round(-M.s * 100 / 1.3);
    var sp = pct >= 2 ? L('Ponto de equilíbrio ' + pct + '% abaixo do centro.', 'Set point ' + pct + '% below center.')
                      : L('Ponto de equilíbrio no centro.', 'Set point at center.');
    var g = tgtCount === 0 ? L('Nenhum gremlin.', 'No gremlins.') : tgtCount === 1 ? L('Um gremlin.', 'One gremlin.') : L(tgtCount + ' gremlins.', tgtCount + ' gremlins.');
    var f = felt(M), mood = f > 0.15 ? L(' O prato do prazer desce.', ' The pleasure pan goes down.') : f < -0.15 ? L(' A balança pende para a dor.', ' The balance tips toward pain.') : '';
    return L('Dia ', 'Day ') + day(Math.min(M.t, P.H - 1e-6)) + '. ' + sp + ' ' + g + mood;
  }
  function announce(extra) { live.textContent = (extra ? extra + ' ' : '') + narrText(); }
  function ariaCanvas() {
    cv.setAttribute('aria-label', L('Balança em traço preto, prato do prazer em âmbar à esquerda e prato da dor em índigo à direita. ', 'Balance in black line, amber pleasure pan on the left and indigo pain pan on the right. ') + narrText());
  }

  /* ---------------- controls ---------------- */
  function relabel() {
    read.textContent = L('Cada dose pesa no prato do prazer e chama gremlins para o prato da dor. Eles chegam devagar e saem mais devagar ainda. Com doses frequentes, o ponto de equilíbrio desce e fica lá enquanto as doses continuam.',
      'Each dose weighs on the pleasure pan and calls gremlins to the pain pan. They arrive slowly and leave even more slowly. With frequent doses, the set point sinks and stays down while the doses continue.');
    bDose.textContent = L('uma dose', 'one dose');
    bHour.textContent = L('avançar uma hora', 'advance one hour');
    bResist.textContent = mode === 'resist' ? L('resistindo…', 'resisting…') : L('resistir', 'resist');
    bRun.textContent = mode === 'run' ? L('pausar', 'pause') : L('repetir por 30 dias', 'repeat for 30 days');
    bReset.textContent = L('de novo', 'start over');
    ivLab.textContent = L('intervalo entre doses', 'time between doses');
    var h = ivH(+ivIn.value);
    ivV.textContent = ivFmt(h);
    ivIn.setAttribute('aria-valuetext', ivFmt(h));
    bPrev.textContent = L('anterior', 'previous'); bNext.textContent = L('próximo', 'next');
    rmLab.textContent = RMS[rmStep] ? (rmStep + 1) + '/4 · ' + RMS[rmStep].lab() : '';
    chartLabels(); hudUpdate(); ariaCanvas();
    if (CH.h1) drawCharts(M);
    if (DN.RM) { renderStatic(); }
  }
  function syncBtns() {
    var done = M.t >= P.H - 1e-6;
    bDose.disabled = done; bHour.disabled = done; bRun.disabled = done && mode !== 'run'; bResist.disabled = done;
    bResist.setAttribute('aria-pressed', mode === 'resist' ? 'true' : 'false');
    bRun.setAttribute('aria-pressed', mode === 'run' ? 'true' : 'false');
    bResist.classList.toggle('on', mode === 'resist');
    relabel();
  }
  function doDose(byUser) {
    if (!dose(M)) return;
    if (HAS_M) { addWeight(false); }
    if (byUser) {
      if (mode === 'resist') mode = 'idle';
      if (mode !== 'run') { mode = 'hour'; modeEnd = Math.min(P.H, M.t + P.DOSE_ADV); }
      announce(L('Uma dose.', 'One dose.'));
    }
    ensureSound();
    kick();
  }
  bDose.addEventListener('click', function () { doDose(true); syncBtns(); });
  bHour.addEventListener('click', function () {
    if (mode === 'run' || mode === 'resist') mode = 'idle';
    modeEnd = Math.min(P.H, (mode === 'hour' ? modeEnd : M.t) + 1); mode = 'hour';
    ensureSound(); syncBtns(); kick();
  });
  bResist.addEventListener('click', function () {
    if (mode === 'resist') { mode = 'idle'; announce(); syncBtns(); return; }
    mode = 'resist'; ensureSound(); syncBtns(); kick();
    announce(L('Sem doses.', 'No doses.'));
  });
  bRun.addEventListener('click', function () {
    if (mode === 'run') { mode = 'idle'; announce(); syncBtns(); return; }
    mode = 'run';
    if (!M.doses.length || M.t - M.doses[M.doses.length - 1] >= ivH(+ivIn.value)) runNextDose = M.t;
    else runNextDose = M.doses[M.doses.length - 1] + ivH(+ivIn.value);
    ensureSound(); syncBtns(); kick();
    announce(L('Uma dose a cada ' + ivFmt(ivH(+ivIn.value)) + '.', 'One dose every ' + ivFmt(ivH(+ivIn.value)) + '.'));
  });
  bReset.addEventListener('click', function () { resetAll(); announce(L('De novo.', 'Starting over.')); });
  ivIn.addEventListener('input', function () {
    relabel();
    if (mode === 'run' && M.doses.length) runNextDose = M.doses[M.doses.length - 1] + ivH(+ivIn.value);
  });
  ivIn.addEventListener('change', function () { announce(L('Intervalo de ' + ivFmt(ivH(+ivIn.value)) + '.', 'Interval of ' + ivFmt(ivH(+ivIn.value)) + '.')); });

  function resetAll() {
    M = newModel(); mode = 'idle'; tgtCount = 0; th = 0; om = 0; letdownDone = false; lastAnnDay = 0; staticLooks = [];
    buildWorld(); syncBtns(); drawCharts(M); kick();
  }

  /* ---------------- sound ---------------- */
  var snd = null;
  function ensureSound() {
    if (!DN.sound() || snd || DN.RM) return;
    var a = DN.audio(); if (!a) return;
    var o = a.createOscillator(), g = a.createGain();
    o.type = 'triangle'; o.frequency.value = 330; g.gain.value = 0;
    o.connect(g); g.connect(a.destination); o.start();
    var buf = a.createBuffer(1, a.sampleRate * 2, a.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    var n = a.createBufferSource(); n.buffer = buf; n.loop = true;
    var lp = a.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 160;
    var ng = a.createGain(); ng.gain.value = 0;
    n.connect(lp); lp.connect(ng); ng.connect(a.destination); n.start();
    snd = { a: a, o: o, g: g, ng: ng };
  }
  function soundUpdate(active) {
    if (!snd) return;
    var t = snd.a.currentTime, f = felt(M), on = active && DN.sound() && visible;
    snd.o.frequency.setTargetAtTime(260 * Math.pow(2, Math.max(0, f) * 1.4), t, 0.05);
    snd.g.gain.setTargetAtTime(on && f > 0.02 ? 0.05 * Math.min(1, f) : 0, t, 0.08);
    snd.ng.gain.setTargetAtTime(on && f < -0.02 ? 0.09 * Math.min(1, -f) : 0, t, 0.12);
  }
  function blip(freq, gain) {
    var a = DN.audio(); if (!a) return;
    var t = a.currentTime, o = a.createOscillator(), g = a.createGain();
    o.type = 'sine'; o.frequency.setValueAtTime(freq, t); o.frequency.exponentialRampToValueAtTime(freq * 1.6, t + 0.08);
    g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + 0.14);
  }

  /* ---------------- main loop ---------------- */
  var raf = 0, last = 0, visible = false, chartClock = 0;
  function kick() { if (!raf && visible) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function updateCount() {
    var bc = M.b / P.unit;
    if (bc > tgtCount + 0.6 || bc < tgtCount - 0.6) {
      tgtCount = Math.max(0, Math.round(bc));
    }
  }
  function frame(now) {
    raf = 0;
    var dts = Math.min(0.05, (now - last) / 1000); last = now;
    var running = mode !== 'idle';
    /* ---- advance model time ---- */
    if (mode === 'hour') {
      var rate = 1.6; /* hours per second */
      var target = Math.min(modeEnd, M.t + rate * dts);
      advance(M, target - M.t);
      if (M.t >= modeEnd - 1e-6) { mode = 'idle'; announce(); syncBtns(); }
    } else if (mode === 'run' || mode === 'resist') {
      var r2 = 14 * dts, endT = Math.min(P.H, M.t + r2);
      while (M.t < endT - 1e-9) {
        if (mode === 'run' && M.t >= runNextDose - 1e-9) { doDose(false); runNextDose = M.t + ivH(+ivIn.value); }
        var nxt = mode === 'run' ? Math.min(endT, Math.max(runNextDose, M.t + P.dt)) : endT;
        advance(M, nxt - M.t);
      }
      var dnow = day(M.t);
      if (dnow !== lastAnnDay && dnow % 7 === 0) { lastAnnDay = dnow; announce(); }
      if (mode === 'resist' && M.b < P.unit * 0.45 && M.s > -0.015 && M.t > (M.doses.length ? M.doses[M.doses.length - 1] + 2 : 0)) {
        mode = 'idle'; announce(L('Os gremlins foram embora.', 'The gremlins have left.')); syncBtns();
      }
      if (M.t >= P.H - 1e-6) { mode = 'idle'; announce(L('Fim dos 30 dias.', 'End of the 30 days.')); syncBtns(); }
    }
    /* tolerance letdown, once: a dose that no longer tips the pan */
    if (!letdownDone && M.doses.length > 6 && M.t < M.stimEnd && M.t - M.doses[M.doses.length - 1] > 0.3 && felt(M) < 0.05) {
      letdownDone = true; DN.letdown('w10a');
    }
    updateCount();
    if (running) rescaleIfNeeded();

    /* ---- beam spring toward model angle ---- */
    var tt = targetTheta(M);
    om += (-(th - tt) * 38 - om * 6.5) * dts;
    th += om * dts;
    if (HAS_M) {
      placePans();
      traffic(dts);
      var sub = 3;
      for (var s = 0; s < sub; s++) Matter.Engine.update(engine, (dts * 1000) / sub);
      /* weights fade after the stimulus */
      for (var i = weights.length - 1; i >= 0; i--) {
        var w = weights[i];
        w._age += dts;
        if (w._kill || (w._age > 0.75 && M.t >= M.stimEnd && M.a < 0.04)) { w._alpha -= dts * (w._kill ? 6 : 3); if (w._alpha <= 0) { Matter.Composite.remove(world, w); weights.splice(i, 1); continue; } }
        if (w.position.y > G.floor + 40) { Matter.Composite.remove(world, w); weights.splice(i, 1); }
      }
      /* only keep the weights of the doses still acting (rapid doses stack, but not forever) */
      for (var q = 0; q < weights.length - 2; q++) weights[q]._kill = true;
    }
    animLooks(dts);
    drawScene(dts);
    chartClock -= dts;
    if (chartClock <= 0 || mode === 'hour') { drawCharts(M); hudUpdate(); chartClock = 0.08; }
    soundUpdate(running);
    if (visible) raf = requestAnimationFrame(frame);
  }
  var lastK = P.k0;
  function rescaleIfNeeded() { if (Math.abs(M.k - lastK) > 0.08) { lastK = M.k; rescaleGremlins(); } }

  /* poke a gremlin */
  cv.addEventListener('pointerdown', function (e) {
    if (!HAS_M) return;
    var rc = cv.getBoundingClientRect(), x = e.clientX - rc.left, y = e.clientY - rc.top;
    gBodies.forEach(function (b) {
      if (Math.hypot(b.position.x - x, b.position.y - y) < b._r * 1.8) { Matter.Body.setVelocity(b, { x: (rnd() - 0.5) * 2, y: -7 }); b._look.sqv = -8; b._look.blink = 1; }
    });
  });

  /* ---------------- reduced motion: four fixed states ---------------- */
  var RMS = [
    { lab: function () { return L('relógio em zero, balança nivelada', 'clock at zero, balance level'); }, make: function () { return newModel(); } },
    { lab: function () { return L('15 minutos depois de uma dose', '15 minutes after one dose'); }, make: function () { var m = newModel(); dose(m); advance(m, 0.25); return m; } },
    { lab: function () { return L('três horas depois: a ressaca', 'three hours later: the hangover'); }, make: function () { var m = newModel(); dose(m); advance(m, 3); return m; } },
    { lab: function () { return L('dia 21, uma dose a cada 2 horas', 'day 21, one dose every 2 hours'); }, make: function () { var m = newModel(); while (m.t < 20 * 24 + 1.9) { dose(m); advance(m, 2); } return m; } }
  ];
  function renderStatic() {
    th = targetTheta(M);
    tgtCount = Math.round(M.b / P.unit);
    drawScene(0); drawCharts(M); hudUpdate(); ariaCanvas();
  }
  function rmGo(i) {
    rmStep = DN.clamp(i, 0, 3);
    M = RMS[rmStep].make();
    bPrev.disabled = rmStep === 0; bNext.disabled = rmStep === 3;
    relabel();
    announce();
  }
  bPrev.addEventListener('click', function () { rmGo(rmStep - 1); });
  bNext.addEventListener('click', function () { rmGo(rmStep + 1); });

  /* ---------------- init ---------------- */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { RISO.cache = {}; RISO.n = 0; if (!raf) drawScene(0); });
  M = newModel();
  layout(); buildCharts(); buildWorld();
  if (DN.RM) { rmGo(0); } else { syncBtns(); drawScene(0); drawCharts(M); }
  DN.onLang(function () { relabel(); if (!raf) drawScene(0); });
  DN.onVisible(root, function (v) { visible = v; if (v) kick(); else soundUpdate(false); });
  var rz = 0, lastW = root.clientWidth;
  window.addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () {
      if (root.clientWidth === lastW) return; lastW = root.clientWidth;
      layout(); buildCharts(); chartLabels(); buildWorld(); drawScene(0); drawCharts(M);
      if (DN.RM) renderStatic();
    }, 150);
  });
})();
