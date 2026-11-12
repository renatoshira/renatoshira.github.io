/* w06a · o-rato-de-salamone : the reader is the rat. Five presses of a sprung, weighted
   lever release a sweet pellet; free chow sits on the floor. Lowering dopamine makes the
   lever heavier (stiffer spring, longer hold). Idle 3 s and the rat walks to the chow.
   'labirinto' switches to Cousins & Salamone's T-maze (4 pellets behind a 30 cm barrier
   or 2 pellets with no barrier). Lever: damped torsional spring; pellets and chow: Matter.js. */
(function () {
  'use strict';
  var root = DN.body('w06a'); if (!root) return;
  var L = DN.L, C = DN.COL, fmt = DN.fmt;
  var HAS_M = !!window.Matter && !DN.RM;
  var PEL = C.sub.comida, CHOW = '#b59f7e';

  /* ---------- DOM ---------- */
  var top = DN.el('div', { class: 'w06a-top' }, root);
  var cnts = DN.el('div', { class: 'w06a-cnts' }, top);
  var cP = DN.el('div', { class: 'w06a-c' }, cnts);
  var cR = DN.el('div', { class: 'w06a-c' }, cnts);
  var cT = DN.el('div', { class: 'w06a-c w06a-tot' }, cnts);
  var bMode = DN.el('button', { class: 'btn', type: 'button', 'aria-pressed': 'false' }, top);
  var stage = DN.el('div', { class: 'w06a-stage cvwrap' }, root);
  var cv = DN.el('canvas', { role: 'img' }, stage);
  var bLever = DN.el('button', { class: 'w06a-lever', type: 'button' }, stage);
  var hint = DN.el('div', { class: 'w06a-hint', 'aria-hidden': 'true' }, stage);
  var rowD = DN.el('div', { class: 'ctrlrow' }, root);
  var dLab = DN.el('label', { for: 'w06a-d' }, rowD);
  var dIn = DN.el('input', { type: 'range', id: 'w06a-d', min: 20, max: 100, step: 5, value: 100 }, rowD);
  var dV = DN.el('span', { class: 'v' }, rowD);
  var mazeRow = DN.el('div', { class: 'rowbtns mt' }, root);
  /* the result at a glance, without playing: two static outcome panels (schematic) */
  var outH = DN.el('div', { class: 'glabel w06a-outh' }, root);
  var outG = DN.el('div', { class: 'w06a-out' }, root);
  var OUT = [{ d: 100, pel: 0.8 }, { d: 20, pel: 0.2 }].map(function (o) {
    var c = DN.el('div', { class: 'w06a-oc' }, outG);
    o.h = DN.el('div', { class: 'w06a-oh' }, c);
    var bar = DN.el('div', { class: 'w06a-ob', 'aria-hidden': 'true' }, c);
    var a = DN.el('span', { class: 'w06a-op' }, bar), b = DN.el('span', { class: 'w06a-or' }, bar);
    a.style.width = (o.pel * 100) + '%'; b.style.width = ((1 - o.pel) * 100) + '%';
    o.k = DN.el('div', { class: 'w06a-ok' }, c);
    o.t = DN.el('div', { class: 'w06a-ot' }, c);
    return o;
  });
  var outN = DN.el('div', { class: 'w06a-on' }, root);
  var bTrial = DN.el('button', { class: 'btn solid', type: 'button' }, mazeRow);
  var bTen = DN.el('button', { class: 'btn', type: 'button' }, mazeRow);
  var bClear = DN.el('button', { class: 'btn', type: 'button' }, mazeRow);
  var live = DN.el('div', { class: 'live', 'aria-live': 'polite' }, root);
  var take = DN.el('p', { class: 'w06a-take' }, root);
  mazeRow.hidden = true;

  /* ---------- state ---------- */
  var S = {
    mode: 'lever', d: 1, pel: 0, chow: 0, presses: 0, everTouched: false, idle: 0,
    held: false, heldT: 0, impulse: 0, armed: true,
    phi: 0, om: 0,
    rat: { x: 0, st: 'lever', face: -1, frame: 0, fT: 0, glance: 0, glanceT: 3, eatT: 0, rear: 0, chew: 0 },
    pellets: [], firstPellet: true,
    maze: { hi: 0, lo: 0, run: null, queue: 0, food: 0 }
  };
  function holdNeeded(d) { return 0.07 * Math.pow(1 / d, 1.75); }      /* s: 0.07 at 100%, ~1.15 at 20% */
  function plates(d) { return 1 + Math.round((1 - d) / 0.8 * 5); }

  /* ---------- geometry ---------- */
  var W = 600, H = 300, ctx, G = {};
  function layout() {
    var f = DN.fitCanvas(cv, (cv.clientWidth || root.clientWidth) < 520 ? 205 : 240);
    ctx = f.ctx; W = f.w; H = f.h;
    var s = G.s = DN.clamp(W / 640, 0.58, 1);
    G.x0 = 10; G.x1 = W - 10; G.top = 30; G.fy = H - 22;
    G.rs = 1.25 * s;
    G.px = G.x0 + 64 * s; G.py = G.fy - 54 * G.rs + 2;
    G.inner = 44 * s; G.outer = 64 * s;
    G.cupX = G.px + 18 * s;
    G.dishX = G.x1 - 66 * s; G.dishW = 96 * s;
    G.ratLever = G.px + G.outer + 11.5 * G.rs + 2;
    G.ratChow = G.dishX - G.dishW / 2 - 44 * G.rs;
    if (S.rat.x === 0 || S.rat.st === 'lever') S.rat.x = G.ratLever;
    else if (S.rat.st === 'chow') S.rat.x = G.ratChow;
    /* lever button hit area */
    var bw = 150 * s + 40, bh = 150 * s;
    bLever.style.left = (G.px - G.inner - 10) + 'px';
    bLever.style.top = (G.py - bh * 0.55) + 'px';
    bLever.style.width = bw + 'px'; bLever.style.height = bh + 'px';
    hint.style.left = (G.ratLever - 20 * s) + 'px'; hint.style.top = (G.top + 48) + 'px';
    rzSetup();
  }
  function tip(phi) { return { x: G.px + Math.cos(phi) * G.outer, y: G.py + Math.sin(phi) * G.outer }; }

  /* ---------- physics: pellets and chow ---------- */
  var engine = null, world = null, kibbles = [];
  function build() {
    kibbles = [];
    S.pellets = [];
    if (!HAS_M) return;
    if (engine) { Matter.Composite.clear(engine.world, false); Matter.Engine.clear(engine); }
    engine = Matter.Engine.create({ gravity: { x: 0, y: 1, scale: 0.0011 } });
    world = engine.world;
    var s = G.s, st = { isStatic: true, friction: 0.9 };
    var floor = Matter.Bodies.rectangle(W / 2, G.fy + 10, W * 2, 20, st);
    /* cup */
    var cw = 30 * s;
    var cup = [Matter.Bodies.rectangle(G.cupX, G.fy - 2, cw, 4, st),
      Matter.Bodies.rectangle(G.cupX - cw / 2, G.fy - 8, 3, 14, st), Matter.Bodies.rectangle(G.cupX + cw / 2, G.fy - 8, 3, 14, st)];
    /* dish */
    var dw = G.dishW;
    var dish = [Matter.Bodies.rectangle(G.dishX, G.fy - 3, dw, 6, st),
      Matter.Bodies.rectangle(G.dishX - dw / 2 - 3, G.fy - 12, 4, 22, Object.assign({ angle: -0.5 }, st)),
      Matter.Bodies.rectangle(G.dishX + dw / 2 + 3, G.fy - 12, 4, 22, Object.assign({ angle: 0.5 }, st))];
    Matter.Composite.add(world, [floor].concat(cup, dish));
    for (var i = 0; i < 26; i++) addKibble(true, i);
    for (var k = 0; k < 120; k++) Matter.Engine.update(engine, 1000 / 60);
  }
  var kseed = 7;
  function kr() { kseed = (kseed * 16807) % 2147483647; return kseed / 2147483647; }
  function addKibble(init, i) {
    var r = (3.6 + kr() * 1.6) * G.s + 0.6;
    var b = Matter.Bodies.polygon(G.dishX + (kr() - 0.5) * G.dishW * 0.7, init ? G.fy - 14 - (i % 6) * 9 : G.top + 6, 5, r, { friction: 0.8, restitution: 0.1, density: 0.002 });
    Matter.Body.setAngle(b, kr() * 6);
    b._r = r;
    kibbles.push(b); Matter.Composite.add(world, b);
  }
  function dropPellet() {
    if (HAS_M) {
      var b = Matter.Bodies.circle(G.cupX, G.top + 18, 4.6 * G.s + 0.8, { restitution: 0.45, friction: 0.5, density: 0.002 });
      b._r = 4.6 * G.s + 0.8; S.pellets.push(b); Matter.Composite.add(world, b);
    } else {
      S.pellets.push({ position: { x: G.cupX, y: G.fy - 8 }, _r: 4.6 * G.s + 0.8, angle: 0 });
    }
  }

  /* ---------- risograph compositor (technique from w00, on canvas) ----------
     Each spot ink (amber, indigo) is its own stack of offscreen canvases: one for
     solid ink and three for light, mid and dark halftone. Shapes are drawn into
     those canvases with the main context's transform; at the end of a frame each
     halftone canvas is masked by a rotated dot screen, the stack is merged, a
     grain texture eats into it, and the two inks are printed on the paper with a
     slight misregistration, indigo multiplied over amber. Text and the small UI
     marks (press dots, tallies) are drawn crisp on top. */
  function rng(sd) {
    var a = sd >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var RZ = null;
  function rzSetup() {
    var cw = cv.width, ch = cv.height, dpr = cw / W;
    RZ = { cw: cw, ch: ch, dpr: dpr, inks: {} };
    [['a', C.dopa, 15, 0.95, 31, 0.6, -0.5], ['b', C.pausa, 75, 0.92, 77, -0.9, 0.8]].forEach(function (d) {
      var ink = { col: d[1], op: d[3], mx: d[5], my: d[6], t: [] };
      for (var k = 0; k < 4; k++) {
        var c = document.createElement('canvas'); c.width = cw; c.height = ch;
        ink.t.push({ cv: c, ctx: c.getContext('2d') });
      }
      var P = Math.max(3, Math.round(3 * dpr));
      ink.pat = [null].concat([0.24, 0.34, 0.44].map(function (r) {
        var tile = document.createElement('canvas'); tile.width = tile.height = P;
        var t = tile.getContext('2d'); t.fillStyle = d[1];
        t.beginPath(); t.arc(P / 2, P / 2, r * P, 0, 7); t.fill();
        var pat = ctx.createPattern(tile, 'repeat');
        if (pat.setTransform && window.DOMMatrix) pat.setTransform(new DOMMatrix().rotateSelf(d[2]));
        return pat;
      }));
      /* grain: speckles where the ink did not take */
      var g = document.createElement('canvas'); g.width = cw; g.height = ch;
      var gc = g.getContext('2d'), img = gc.createImageData(cw, ch), u = new Uint32Array(img.data.buffer), R = rng(d[4]);
      for (var i = 0; i < u.length; i++) { var v = R(); if (v < 0.06) u[i] = 0xff000000; else if (v < 0.12) u[i] = 0x70000000; }
      gc.putImageData(img, 0, 0);
      ink.grain = g;
      RZ.inks[d[0]] = ink;
    });
  }
  function rzBegin() {
    ['a', 'b'].forEach(function (k) {
      RZ.inks[k].t.forEach(function (l) { l.ctx.setTransform(1, 0, 0, 1, 0, 0); l.ctx.clearRect(0, 0, RZ.cw, RZ.ch); l.used = false; });
    });
  }
  /* layer context for ink k ('a' amber, 'b' indigo) and tone t (0 solid, 1..3 halftone) */
  function lay(k, t) {
    var ink = RZ.inks[k], l = ink.t[t], c = l.ctx;
    l.used = true;
    c.setTransform(ctx.getTransform());
    c.fillStyle = c.strokeStyle = ink.col;
    c.lineCap = 'round'; c.lineJoin = 'round';
    return c;
  }
  /* knock out a shape from every layer so the object in front hides what is behind */
  function knock(pathFn) {
    ['a', 'b'].forEach(function (k) {
      RZ.inks[k].t.forEach(function (l) {
        var c = l.ctx;
        c.setTransform(ctx.getTransform());
        c.globalCompositeOperation = 'destination-out';
        c.beginPath(); pathFn(c); c.fill();
        c.globalCompositeOperation = 'source-over';
      });
    });
  }
  function rzEnd() {
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
    ['a', 'b'].forEach(function (k) {
      var ink = RZ.inks[k], base = ink.t[0].ctx;
      base.setTransform(1, 0, 0, 1, 0, 0);
      for (var t = 1; t < 4; t++) {
        if (!ink.t[t].used) continue;
        var c = ink.t[t].ctx;
        c.setTransform(1, 0, 0, 1, 0, 0);
        c.globalCompositeOperation = 'source-in'; c.fillStyle = ink.pat[t]; c.fillRect(0, 0, RZ.cw, RZ.ch);
        c.globalCompositeOperation = 'source-over';
        base.drawImage(ink.t[t].cv, 0, 0);
      }
      base.globalCompositeOperation = 'destination-out'; base.drawImage(ink.grain, 0, 0);
      base.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = ink.op;
      ctx.globalCompositeOperation = k === 'b' ? 'multiply' : 'source-over';
      ctx.drawImage(ink.t[0].cv, Math.round(ink.mx * RZ.dpr), Math.round(ink.my * RZ.dpr));
    });
    ctx.restore();
  }

  /* ---------- drawing helpers ---------- */
  function ln(c, x1, y1, x2, y2) { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); }
  function line(x1, y1, x2, y2) { ln(ctx, x1, y1, x2, y2); }
  function font(px, bold) { ctx.font = (bold ? '700 ' : '') + px + 'px "Space Mono", monospace'; }
  /* crisp label on a paper chip, so it never sits on top of bars or lines */
  function chip(text, x, y, align, col) {
    ctx.textAlign = align;
    var w = ctx.measureText(text).width, x0 = align === 'right' ? x - w : align === 'center' ? x - w / 2 : x;
    ctx.fillStyle = C.paper; ctx.fillRect(x0 - 4, y - 10, w + 8, 14);
    ctx.fillStyle = col || C.dim; ctx.fillText(text, x, y);
  }

  /* side-view rat. (x, y) = point on the floor under the body center; face +1 right, -1 left */
  function ratBody(c) {
    c.moveTo(-36, -13);
    c.bezierCurveTo(-38, -40, 6, -48, 24, -32);
    c.bezierCurveTo(32, -24, 30, -9, 18, -6);
    c.lineTo(-26, -6);
    c.bezierCurveTo(-34, -6, -36, -9, -36, -13);
    c.closePath();
  }
  function ratHead(c) {
    c.moveTo(-6, -6);
    c.bezierCurveTo(8, -14, 22, -4, 32, 7);
    c.bezierCurveTo(24, 13, 10, 15, -2, 14);
    c.closePath();
  }
  function drawRat(x, y, s, face, o) {
    o = o || {};
    var fr = o.frame || 0, c;
    ctx.save();
    ctx.translate(x, y); ctx.scale(face * s, s);
    /* tail, in the floor frame so it never dips below the floor when rearing */
    var wv = Math.sin((o.t || 0) * 3 + fr) * 3, rr = o.rear || 0;
    c = lay('b', 0); c.lineWidth = 2;
    c.beginPath(); c.moveTo(-34 + rr * 10, -12 + rr * 8);
    c.bezierCurveTo(-56, -4 + wv * (1 - rr), -74, 1 - wv * (1 - rr), -98, -4 + wv * 0.6 * (1 - rr)); c.stroke();
    if (o.rear) { ctx.translate(-26, 0); ctx.rotate(-o.rear); ctx.translate(26, 0); }
    var LEG = [[[5, -4], [-5, 4]], [[2, -1], [-2, 1]], [[-5, 4], [5, -4]], [[-2, 1], [2, -1]]][fr % 4];
    if (!o.walk) LEG = [[0, 0], [0, 0]];
    /* far legs, light */
    c = lay('b', 2); c.lineWidth = 3.4;
    ln(c, -18, -8, -18 + LEG[1][0], 0); if (!o.rear) ln(c, 14, -8, 14 + LEG[0][0], 0);
    /* body: amber screen, indigo belly shade, indigo outline */
    knock(ratBody);
    c = lay('a', 2); c.beginPath(); ratBody(c); c.fill();
    c = lay('b', 1); c.save(); c.beginPath(); ratBody(c); c.clip();
    c.beginPath(); c.ellipse(-6, -4, 32, 10, 0, 0, 7); c.fill(); c.restore();
    c = lay('b', 0); c.lineWidth = 1.6; c.beginPath(); ratBody(c); c.stroke();
    /* near legs */
    c = lay('b', 0); c.lineWidth = 2.6;
    ln(c, -24, -8, -24 + LEG[0][0], 0);
    c.beginPath(); c.ellipse(-24 + LEG[0][0] + 2, 0, 3.6, 1.6, 0, 0, 7); c.fill();
    if (o.rear) { ln(c, 16, -14, 34, -26); ln(c, 20, -14, 38, -22); }
    else { ln(c, 10, -8, 10 + LEG[1][0], 0); c.beginPath(); c.ellipse(10 + LEG[1][0] + 2, 0, 3.2, 1.5, 0, 0, 7); c.fill(); }
    /* head */
    ctx.save();
    ctx.translate(22, -28);
    if (o.glance) { ctx.scale(-1, 1); ctx.rotate(-0.15 * o.glance); }
    if (o.eat) ctx.rotate(0.55 + Math.sin(o.chew || 0) * 0.06);
    knock(ratHead);
    c = lay('a', 2); c.beginPath(); ratHead(c); c.fill();
    c = lay('b', 0); c.lineWidth = 1.6; c.beginPath(); ratHead(c); c.stroke();
    /* ear: solid amber over a light indigo screen */
    var ear = function (k) { k.ellipse(3, -10, 6.5, 7.5, -0.3, 0, 7); };
    knock(ear);
    c = lay('a', 0); c.beginPath(); ear(c); c.fill();
    c = lay('b', 0); c.lineWidth = 1.4; c.beginPath(); ear(c); c.stroke();
    /* eye, nose, whiskers */
    c = lay('b', 0); c.beginPath(); c.arc(14, 0, 2.3, 0, 7); c.fill();
    c.lineWidth = 0.9; ln(c, 28, 8, 42, 2); ln(c, 28, 9, 44, 9); ln(c, 28, 10, 41, 15);
    c = lay('a', 0); c.beginPath(); c.arc(32, 7, 2.6, 0, 7); c.fill();
    ctx.restore();
    ctx.restore();
  }
  /* top-view rat for the T-maze. ang: heading in radians */
  function drawRatTop(x, y, ang, s, t, moving) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
    var f = moving ? Math.sin(t * 22) : 0, c;
    c = lay('b', 0); c.lineWidth = 1.8;
    c.beginPath(); c.moveTo(-16, 0);
    c.bezierCurveTo(-28, 6 * Math.sin(t * 6), -36, -6 * Math.sin(t * 6), -48, 3 * Math.sin(t * 6 + 1)); c.stroke();
    c.lineWidth = 2.4;
    ln(c, 8, -7, 11 + f * 3, -12); ln(c, 8, 7, 11 - f * 3, 12); ln(c, -9, -8, -12 - f * 3, -12); ln(c, -9, 8, -12 + f * 3, 12);
    var body = function (k) { k.ellipse(-2, 0, 17, 9.5, 0, 0, 7); };
    var head = function (k) { k.moveTo(10, -6); k.quadraticCurveTo(26, -2, 27, 0); k.quadraticCurveTo(26, 2, 10, 6); k.closePath(); };
    knock(body); knock(head);
    c = lay('a', 2); c.beginPath(); body(c); c.fill(); c.beginPath(); head(c); c.fill();
    c = lay('b', 0); c.lineWidth = 1.6; c.beginPath(); body(c); c.stroke(); c.beginPath(); head(c); c.stroke();
    c = lay('a', 0); [-1, 1].forEach(function (k) { c.beginPath(); c.ellipse(11, k * 7, 3.6, 4.2, 0, 0, 7); c.fill(); });
    c = lay('b', 0); c.beginPath(); c.arc(18, -3, 1.5, 0, 7); c.arc(18, 3, 1.5, 0, 7); c.fill();
    c = lay('a', 0); c.beginPath(); c.arc(27, 0, 1.9, 0, 7); c.fill();
    ctx.restore();
  }

  function drawCage() {
    var c;
    /* bars on the back wall: a light indigo screen */
    c = lay('b', 1); c.lineWidth = 2.6;
    for (var x = G.x0 + 28; x < G.x1 - 8; x += 28) ln(c, x, G.top + 3, x, G.fy - 2);
    /* frame and floor */
    c = lay('b', 0); c.lineWidth = 1.6;
    c.strokeRect(G.x0 + 0.5, G.top + 0.5, G.x1 - G.x0, G.fy - G.top);
    c.lineWidth = 2; ln(c, G.x0, G.fy + 0.5, G.x1, G.fy + 0.5);
    /* bedding: amber flecks */
    c = lay('a', 0); c.lineWidth = 1.4;
    var R = rng(9);
    for (var i = 0; i < (G.x1 - G.x0 - 12) / 11; i++) { var bx = G.x0 + 6 + i * 11 + R() * 4, by = G.fy + 4 + R() * 3; ln(c, bx, by, bx + 3 + R() * 3, by - 1 + R() * 2); }
  }
  function drawLever() {
    var s = G.s, d = S.d, phi = S.phi, c;
    /* wall plate */
    c = lay('a', 2); c.fillRect(G.x0 + 1, G.py - 40 * s, 14 * s, 80 * s);
    c = lay('b', 0); c.lineWidth = 1.6; c.strokeRect(G.x0 + 1, G.py - 40 * s, 14 * s, 80 * s);
    /* post */
    c.lineWidth = 2.4; ln(c, G.px, G.py, G.px, G.fy); ln(c, G.px - 12 * s, G.fy, G.px + 12 * s, G.fy);
    /* spring: from inner arm down to the floor bracket. Stiffer = thicker wire, more coils */
    var ia = { x: G.px - Math.cos(phi) * G.inner * 0.62, y: G.py - Math.sin(phi) * G.inner * 0.62 };
    var base = { x: G.px - G.inner * 0.62, y: G.fy - 2 };
    var coils = 5 + Math.round((1 - d) * 5), wire = 1.3 + (1 - d) * 1.6, amp = 5 * s + (1 - d) * 3;
    c.lineWidth = wire;
    c.beginPath(); c.moveTo(ia.x, ia.y);
    var len = base.y - ia.y, a0 = 8 * s;
    c.lineTo(ia.x + (base.x - ia.x) * (a0 / len), ia.y + a0);
    for (var k = 0; k <= coils * 2; k++) {
      var u = k / (coils * 2), yy = ia.y + a0 + (len - 2 * a0) * u, xx = ia.x + (base.x - ia.x) * ((yy - ia.y) / len);
      c.lineTo(xx + (k % 2 ? amp : -amp) * (k === 0 || k === coils * 2 ? 0 : 1), yy);
    }
    c.lineTo(base.x, base.y); c.stroke();
    c.lineWidth = 2.4; ln(c, base.x - 7 * s, base.y + 1, base.x + 7 * s, base.y + 1);
    /* lever arm, amber knob at the tip, indigo weight plates on the inner arm */
    ctx.save(); ctx.translate(G.px, G.py); ctx.rotate(phi);
    c = lay('b', 0); c.lineWidth = 5 * s + 1; ln(c, -G.inner, 0, G.outer, 0);
    var n = plates(d), pw = 10 * s, ph = 5 * s + 1;
    for (var i = 0; i < n; i++) c.fillRect(-G.inner + 2 * s, -4 * s - (i + 1) * (ph + 1), pw * 2.2, ph);
    c = lay('a', 0); c.beginPath(); c.arc(G.outer, 0, 4.6 * s + 1.4, 0, 7); c.fill();
    if (n > 1) { c = lay('a', 3); c.fillRect(-G.inner + 2 * s, -4 * s - n * (ph + 1), pw * 2.2, ph * n + n - 1); }
    ctx.restore();
    /* pivot */
    knock(function (k) { k.arc(G.px, G.py, 4.4, 0, 7); });
    c = lay('a', 0); c.beginPath(); c.arc(G.px, G.py, 4.4, 0, 7); c.fill();
    c = lay('b', 0); c.lineWidth = 1.6; c.beginPath(); c.arc(G.px, G.py, 4.4, 0, 7); c.stroke();
    /* dispenser tube */
    var tx = G.cupX, tw = 9 * s + 2;
    c = lay('a', 1); c.fillRect(tx - tw / 2, G.top, tw, G.py - 70 * s - G.top);
    c = lay('b', 0); c.lineWidth = 1.6;
    ln(c, tx - tw / 2, G.top, tx - tw / 2, G.py - 70 * s); ln(c, tx + tw / 2, G.top, tx + tw / 2, G.py - 70 * s);
    /* cup */
    var cw = 30 * G.s;
    c.lineWidth = 2; c.beginPath(); c.moveTo(G.cupX - cw / 2, G.fy - 15); c.lineTo(G.cupX - cw / 2 + 2, G.fy - 1); c.lineTo(G.cupX + cw / 2 - 2, G.fy - 1); c.lineTo(G.cupX + cw / 2, G.fy - 15); c.stroke();
  }
  function pressDots() {
    var tx = G.cupX + (9 * G.s + 2) / 2;
    for (var k = 0; k < 5; k++) {
      ctx.beginPath(); ctx.arc(tx + 11 + k * 10, G.top + 13, 3.2, 0, 7);
      ctx.fillStyle = k < S.presses ? C.dopa : C.paper; ctx.fill();
      ctx.strokeStyle = C.ink; ctx.lineWidth = 1; ctx.stroke();
    }
  }
  function drawFood() {
    var c;
    /* sweet pellets: solid amber with an indigo rim */
    S.pellets.forEach(function (b) {
      knock(function (k) { k.arc(b.position.x, b.position.y, b._r, 0, 7); });
      c = lay('a', 0); c.beginPath(); c.arc(b.position.x, b.position.y, b._r, 0, 7); c.fill();
      c = lay('b', 0); c.lineWidth = 1.1; c.beginPath(); c.arc(b.position.x, b.position.y, b._r - 0.4, 0, 7); c.stroke();
    });
    /* chow: dull indigo screen with a light amber tint */
    var shapes = [];
    if (HAS_M) {
      kibbles.forEach(function (b) { shapes.push(function (k) { b.vertices.forEach(function (v, i) { if (i) k.lineTo(v.x, v.y); else k.moveTo(v.x, v.y); }); k.closePath(); }); });
    } else {
      for (var i = 0; i < 18; i++) (function (i) {
        var row = Math.floor(i / 6), x = G.dishX + ((i % 6) - 2.5 + row * 0.5) * 9 * G.s, y = G.fy - 8 - row * 7 * G.s;
        shapes.push(function (k) { k.moveTo(x + 4.2 * G.s + 0.6, y); k.arc(x, y, 4.2 * G.s + 0.6, 0, 7); });
      })(i);
    }
    var cb = lay('b', 2), ca = lay('a', 1);
    shapes.forEach(function (sh) { cb.beginPath(); sh(cb); cb.fill(); ca.beginPath(); sh(ca); ca.fill(); });
    /* dish */
    var dw = G.dishW;
    c = lay('b', 0); c.lineWidth = 2.2;
    c.beginPath(); c.moveTo(G.dishX - dw / 2 - 9, G.fy - 20); c.lineTo(G.dishX - dw / 2 + 2, G.fy - 1); c.lineTo(G.dishX + dw / 2 - 2, G.fy - 1); c.lineTo(G.dishX + dw / 2 + 9, G.fy - 20); c.stroke();
  }
  function foodLabels() {
    font(G.s < 0.8 ? 9 : 10);
    chip(L('ração de graça', 'free chow'), G.dishX, G.top + 18, 'center');
    chip(L('5 apertos, 1 pelota doce', '5 presses, 1 sweet pellet'), G.cupX + (9 * G.s + 2) / 2 + 8, G.top + 34, 'left');
  }
  function drawLeverScene(t) {
    ctx.clearRect(0, 0, W, H);
    rzBegin();
    drawCage();
    drawFood();
    drawLever();
    var r = S.rat, s = G.rs;
    var walking = r.st === 'toChow' || r.st === 'toLever';
    var face = r.st === 'chow' || r.st === 'toChow' ? 1 : -1;
    drawRat(r.x, G.fy, s, face, { frame: r.frame, walk: walking, rear: r.rear, glance: r.glance, eat: r.st === 'chow' || r.st === 'eatPellet', chew: r.chew, t: t });
    rzEnd();
    foodLabels();
    pressDots();
    /* hold progress fills the next press dot */
    if (S.held && S.armed && r.st === 'lever' && holdNeeded(S.d) > 0.15) {
      var p = DN.clamp(S.heldT / (holdNeeded(S.d) * 0.8), 0, 1);
      var dx = G.cupX + (9 * G.s + 2) / 2 + 11 + S.presses * 10, dy = G.top + 13;
      ctx.fillStyle = C.dopa;
      ctx.beginPath(); ctx.moveTo(dx, dy); ctx.arc(dx, dy, 3.2, -Math.PI / 2, -Math.PI / 2 + p * Math.PI * 2); ctx.closePath(); ctx.fill();
    }
  }

  /* ---------- T-maze ---------- */
  var MZ = {};
  function mazeGeom() {
    var s = G.s;
    MZ.cx = W / 2; MZ.cy = G.top + 46 * s + 10; MZ.half = 22 * s + 4;
    MZ.arm = Math.min(W * 0.42, 250);
    MZ.bottom = H - 16;
    MZ.barX = MZ.cx - MZ.arm * 0.52;
  }
  function drawMaze(t) {
    ctx.clearRect(0, 0, W, H);
    rzBegin();
    var m = MZ, h = m.half, s = G.s, c;
    var corr = function (k) {
      k.moveTo(m.cx - h, m.bottom); k.lineTo(m.cx - h, m.cy + h); k.lineTo(m.cx - m.arm, m.cy + h); k.lineTo(m.cx - m.arm, m.cy - h);
      k.lineTo(m.cx + m.arm, m.cy - h); k.lineTo(m.cx + m.arm, m.cy + h); k.lineTo(m.cx + h, m.cy + h); k.lineTo(m.cx + h, m.bottom);
    };
    /* floor of the corridors: light indigo screen */
    c = lay('b', 1); c.beginPath(); corr(c); c.closePath(); c.fill();
    c = lay('b', 0); c.lineWidth = 2.4; c.beginPath(); corr(c); c.stroke();
    c.lineWidth = 1.2; c.setLineDash([3, 4]); ln(c, m.cx - h, m.bottom, m.cx + h, m.bottom); c.setLineDash([]);
    /* barrier: dark indigo screen */
    var bw = 10 * s + 3;
    knock(function (k) { k.rect(m.barX - bw / 2, m.cy - h, bw, 2 * h); });
    c = lay('b', 3); c.fillRect(m.barX - bw / 2, m.cy - h, bw, 2 * h);
    c = lay('b', 0); c.lineWidth = 1.6; c.strokeRect(m.barX - bw / 2, m.cy - h, bw, 2 * h);
    /* pellets */
    var run = S.maze.run;
    function pile(x, n, eaten) {
      for (var i = 0; i < n; i++) {
        if (i < eaten) continue;
        var px = x + (i % 2) * 9 * s - 4 * s, py = m.cy + (Math.floor(i / 2) - (n > 2 ? 0.5 : 0)) * 9 * s, pr = 3.6 * s + 0.8;
        knock(function (k) { k.arc(px, py, pr, 0, 7); });
        c = lay('a', 0); c.beginPath(); c.arc(px, py, pr, 0, 7); c.fill();
        c = lay('b', 0); c.lineWidth = 1; c.beginPath(); c.arc(px, py, pr - 0.4, 0, 7); c.stroke();
      }
    }
    var hx = m.cx - m.arm + 16 * s, lx = m.cx + m.arm - 16 * s;
    pile(hx, 4, run && run.arm === 'hi' ? run.eaten : 0);
    pile(lx, 2, run && run.arm === 'lo' ? run.eaten : 0);
    /* rat */
    if (run) drawRatTop(run.x, run.y, run.ang, G.s * 0.8, t, run.moving);
    else drawRatTop(m.cx, m.bottom - 26 * s, -Math.PI / 2, G.s * 0.8, t, false);
    rzEnd();
    /* labels, crisp */
    font(G.s < 0.8 ? 9 : 10);
    var ly = m.cy + h + 15;
    chip(L('4 pelotas', '4 pellets'), m.cx - m.arm * 0.78, ly, 'center', C.ink);
    chip(L('2 pelotas', '2 pellets'), m.cx + m.arm * 0.7, ly, 'center', C.ink);
    chip(L('barreira de 30 cm', '30 cm barrier'), m.barX, m.cy - h - 8, 'center');
    chip(L('sem barreira', 'no barrier'), m.cx + m.arm * 0.55, m.cy - h - 8, 'center');
    /* tally bars */
    var tot = S.maze.hi + S.maze.lo;
    ctx.textAlign = 'left';
    var tx = G.x0 + 4, ty = m.bottom - 34;
    if (tot) {
      var bwid = Math.max(24, Math.min(90, m.cx - h - tx - 84));
      font(10); ctx.fillStyle = C.ink;
      ctx.fillText(L('escolhas', 'choices'), tx, ty);
      ctx.fillStyle = C.dim;
      ctx.fillText(L('barreira', 'barrier'), tx, ty + 15);
      ctx.fillText(L('livre', 'free'), tx, ty + 29);
      ctx.textAlign = 'right'; ctx.fillStyle = C.ink;
      ctx.fillText(S.maze.hi, tx + 76, ty + 15); ctx.fillText(S.maze.lo, tx + 76, ty + 29);
      ctx.fillStyle = C.dopa; ctx.fillRect(tx + 82, ty + 8, bwid * S.maze.hi / tot, 6);
      ctx.fillStyle = C.pausa; ctx.fillRect(tx + 82, ty + 22, bwid * S.maze.lo / tot, 6);
    }
  }
  function pHigh(d) { return 0.12 + 0.8 * Math.pow((d - 0.2) / 0.8, 1.3); }
  function startTrial() {
    if (S.maze.run) return;
    var m = MZ, hi = Math.random() < pHigh(S.d);
    var s = G.s, ex = hi ? m.cx - m.arm + 30 * s : m.cx + m.arm - 30 * s;
    var path = [[m.cx, m.bottom - 26 * s], [m.cx, m.cy], [hi ? m.barX + 16 * s : m.cx + 30 * s, m.cy], [ex, m.cy]];
    S.maze.run = { arm: hi ? 'hi' : 'lo', path: path, seg: 0, u: 0, x: path[0][0], y: path[0][1], ang: -Math.PI / 2, moving: true, eaten: 0, pause: 0, phase: 'go' };
    if (DN.RM) finishTrial(true);
  }
  function finishTrial(instant) {
    var r = S.maze.run; if (!r) return;
    if (instant) { var e = r.path[r.path.length - 1]; r.x = e[0]; r.y = e[1]; r.eaten = r.arm === 'hi' ? 4 : 2; r.ang = r.arm === 'hi' ? Math.PI : 0; r.moving = false; }
    if (r.arm === 'hi') S.maze.hi++; else S.maze.lo++;
    S.maze.food += r.arm === 'hi' ? 4 : 2;
    live.textContent = (r.arm === 'hi' ? L('O rato pulou a barreira e comeu 4 pelotas.', 'The rat climbed the barrier and ate 4 pellets.') : L('O rato foi pelo braço livre e comeu 2 pelotas.', 'The rat took the free arm and ate 2 pellets.')) +
      ' ' + L('Barreira: ', 'Barrier: ') + S.maze.hi + L('. Livre: ', '. Free: ') + S.maze.lo + '.';
    if (instant) { draw(0); setTimeout(function () { S.maze.run = null; if (S.maze.queue > 0) { S.maze.queue--; startTrial(); } draw(0); }, 0); }
  }
  function stepMaze(dt) {
    var r = S.maze.run; if (!r) return;
    var speed = 190 * G.s * (S.maze.queue > 0 ? 1.8 : 1);
    if (r.phase === 'go') {
      var a = r.path[r.seg], b = r.path[r.seg + 1];
      var len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      r.u += speed * dt / len;
      r.ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
      if (r.u >= 1) {
        r.seg++; r.u = 0;
        if (r.arm === 'hi' && r.seg === 2) { r.phase = 'climb'; r.pause = 0; }
        if (r.seg >= r.path.length - 1) { r.phase = 'eat'; r.pause = 0; r.moving = false; }
      }
      var A = r.path[Math.min(r.seg, r.path.length - 1)], B = r.path[Math.min(r.seg + 1, r.path.length - 1)];
      r.x = DN.lerp(A[0], B[0], r.u); r.y = DN.lerp(A[1], B[1], r.u);
    } else if (r.phase === 'climb') {
      /* hop over the barrier */
      r.pause += dt / (S.maze.queue > 0 ? 0.45 : 0.8);
      var x0 = r.path[2][0], x1 = MZ.barX - 22 * G.s;
      r.x = DN.lerp(x0, x1, Math.min(1, r.pause));
      r.y = MZ.cy - Math.sin(Math.min(1, r.pause) * Math.PI) * 6;
      r.ang = Math.PI;
      if (r.pause >= 1) { r.path[2] = [x1, MZ.cy]; r.phase = 'go'; }
    } else if (r.phase === 'eat') {
      r.pause += dt;
      var tot = r.arm === 'hi' ? 4 : 2, per = S.maze.queue > 0 ? 0.12 : 0.25;
      r.eaten = Math.min(tot, Math.floor(r.pause / per));
      if (r.pause > tot * per + 0.5) { finishTrial(false); S.maze.run = null; if (S.maze.queue > 0) { S.maze.queue--; startTrial(); } }
    }
  }

  /* ---------- lever-mode simulation ---------- */
  function setRat(st) { S.rat.st = st; }
  function stepLever(dt, t) {
    var r = S.rat, d = S.d;
    /* idle -> chow */
    if (S.everTouched && !S.held && r.st === 'lever') {
      S.idle += dt;
      if (S.idle > 3) { setRat('toChow'); announce(L('O rato foi para a ração.', 'The rat went to the chow.')); }
    }
    /* walk */
    var spd = 120 * G.s;
    if (r.st === 'toChow' || r.st === 'toLever') {
      var target = r.st === 'toChow' ? G.ratChow : G.ratLever;
      var dir = Math.sign(target - r.x);
      r.x += dir * spd * dt;
      r.fT += dt; if (r.fT > 0.09) { r.fT = 0; r.frame = (r.frame + 1) % 4; }
      if ((dir > 0 && r.x >= target) || (dir < 0 && r.x <= target) || dir === 0) {
        r.x = target; r.st = r.st === 'toChow' ? 'chow' : 'lever'; r.eatT = 0; S.idle = 0;
      }
      if (DN.RM) { r.x = target; r.st = r.st === 'toChow' ? 'chow' : 'lever'; }
    }
    if (r.st === 'chow') {
      r.eatT += dt; r.chew += dt * 18;
      if (r.eatT > 0.9) { r.eatT = 0; S.chow++; eatKibble(); counters(); if (S.chow % 5 === 0) announceCounts(); }
    }
    if (r.st === 'eatPellet') {
      r.eatT += dt; r.chew += dt * 18;
      if (r.eatT > 0.9) {
        var p = S.pellets.shift(); if (p && HAS_M) Matter.Composite.remove(world, p);
        S.pel++; counters(); announceCounts();
        if (S.firstPellet) { S.firstPellet = false; DN.reward('w06a'); }
        r.st = 'lever'; S.idle = 0;
      }
    }
    /* pellet landed in the cup: go eat it */
    if (r.st === 'lever' && !S.held && S.pellets.length) {
      var pb = S.pellets[0];
      if (pb.position.y > G.fy - 16) { r.st = 'eatPellet'; r.eatT = 0; }
    }
    /* glances at the chow: more often with less dopamine */
    if (r.st === 'lever') {
      r.glanceT -= dt;
      if (r.glanceT <= 0) {
        r.glanceT = (0.9 + Math.random() * 2.2) / (0.1 + 1.1 * (1 - d) + (d > 0.95 ? 0 : 0.2));
        if (Math.random() < 0.15 + 0.85 * (1 - d) && !S.held) r.glanceUntil = t + 0.55;
      }
    }
    var gTarget = r.glanceUntil && t < r.glanceUntil ? 1 : 0;
    r.glance += (gTarget - r.glance) * Math.min(1, dt * 14);
    if (r.glance < 0.5 && gTarget === 0) r.glance = r.glance < 0.05 ? 0 : r.glance;
    /* lever torque: holding builds torque linearly; spring stiffness grows as dopamine falls */
    var need = holdNeeded(d), K = 200, I = 1 + (plates(d) - 1) * 0.35, Cd = 7 * Math.sqrt(I);
    var thr = 0.3, active = (S.held || S.impulse > 0) && r.st === 'lever';
    if (S.impulse > 0) S.impulse -= dt;
    if (active) S.heldT += dt; else S.heldT = Math.max(0, S.heldT - dt * 4);
    var torque = active ? K * thr * 1.25 * Math.min(1.6, S.heldT / need) : 0;
    var acc = (torque - K * S.phi - Cd * S.om) / I;
    S.om += acc * dt; S.phi += S.om * dt;
    if (S.phi > 0.42) { S.phi = 0.42; S.om = -Math.abs(S.om) * 0.3; }
    if (S.phi < -0.08) { S.phi = -0.08; S.om = Math.abs(S.om) * 0.3; }
    if (DN.RM) { S.phi = active ? DN.clamp(S.heldT / need, 0, 1) * thr * 1.1 : 0; S.om = 0; }
    if (S.armed && S.phi >= thr) {
      S.armed = false; S.presses++;
      if (DN.sound()) DN.click(null, 0.06);
      if (S.presses >= 5) { S.presses = 0; dropPellet(); }
    }
    if (!S.armed && S.phi < thr * 0.45) S.armed = true;
    /* rearing pose follows holding */
    var rt = r.st === 'lever' && (S.held || S.impulse > 0) ? 0.55 - S.phi * 0.5 : 0;
    r.rear += (rt - r.rear) * Math.min(1, dt * (DN.RM ? 100 : 12));
  }
  function eatKibble() {
    if (!HAS_M) return;
    if (kibbles.length) {
      var top = kibbles.reduce(function (a, b) { return b.position.y < a.position.y ? b : a; });
      Matter.Composite.remove(world, top); kibbles.splice(kibbles.indexOf(top), 1);
    }
    if (kibbles.length < 8) for (var i = 0; i < 10; i++) addKibble(false, i);
  }

  /* ---------- input ---------- */
  function press(on) {
    if (S.mode !== 'lever') return;
    S.everTouched = true; S.idle = 0;
    if (on) {
      if (S.rat.st === 'chow' || S.rat.st === 'toChow') { S.rat.st = 'toLever'; }
      if (!S.held) { S.held = true; S.impulse = 0.18; }
      hint.classList.add('gone');
    } else {
      S.held = false;
    }
    kick();
  }
  bLever.addEventListener('pointerdown', function (e) { e.preventDefault(); try { bLever.setPointerCapture(e.pointerId); } catch (x) {} press(true); });
  bLever.addEventListener('pointerup', function () { press(false); });
  bLever.addEventListener('pointercancel', function () { press(false); });
  bLever.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  bLever.addEventListener('keydown', function (e) { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); press(true); } else if (e.key === ' ' || e.key === 'Enter') e.preventDefault(); });
  bLever.addEventListener('keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); press(false); } });
  bLever.addEventListener('blur', function () { if (S.held) press(false); });
  bLever.addEventListener('click', function (e) { e.preventDefault(); });

  dIn.addEventListener('input', function () {
    S.d = +dIn.value / 100; S.everTouched = true; S.idle = 0; relabel(); kick();
  });
  dIn.addEventListener('change', function () {
    announce(L('Dopamina em ', 'Dopamine at ') + dIn.value + '%. ' + L('A alavanca pede ', 'The lever needs ') + fmt(holdNeeded(S.d), 1) + L(' segundo de toque.', holdNeeded(S.d) >= 1.05 || holdNeeded(S.d) < 0.95 ? ' seconds of pressure.' : ' second of pressure.'));
  });
  bMode.addEventListener('click', function () {
    S.mode = S.mode === 'lever' ? 'maze' : 'lever';
    S.held = false; S.maze.run = null; S.maze.queue = 0;
    if (S.mode === 'maze') mazeGeom();
    bLever.hidden = S.mode !== 'lever'; hint.hidden = S.mode !== 'lever';
    mazeRow.hidden = S.mode !== 'maze'; cnts.hidden = S.mode !== 'lever';
    relabel(); draw(0); kick();
    announce(S.mode === 'maze' ? L('Labirinto em T. Quatro pelotas atrás de uma barreira de 30 cm, ou duas sem barreira.', 'T-maze. Four pellets behind a 30 cm barrier, or two with no barrier.') : L('De volta à alavanca.', 'Back to the lever.'));
  });
  bTrial.addEventListener('click', function () { startTrial(); kick(); });
  bTen.addEventListener('click', function () {
    if (S.maze.run) { S.maze.queue += 10; return; }
    S.maze.queue = 9; startTrial(); kick();
  });
  bClear.addEventListener('click', function () { S.maze.hi = 0; S.maze.lo = 0; S.maze.food = 0; S.maze.queue = 0; S.maze.run = null; draw(0); live.textContent = ''; });

  /* ---------- text ---------- */
  function counters() {
    cP.innerHTML = '<span>' + L('pelotas', 'pellets') + '</span><b>' + S.pel + '</b>';
    cR.innerHTML = '<span>' + L('ração', 'chow') + '</span><b>' + S.chow + '</b>';
    cT.innerHTML = '<span>' + L('comida total', 'total food') + '</span><b>' + (S.pel + S.chow) + '</b>';
  }
  var lastAnn = '';
  function announce(t) { live.textContent = t; lastAnn = t; }
  function announceCounts() {
    announce(L('Pelotas: ', 'Pellets: ') + S.pel + L('. Ração: ', '. Chow: ') + S.chow + '.');
  }
  function relabel() {
    counters();
    bMode.textContent = S.mode === 'lever' ? L('labirinto', 'maze') : L('alavanca', 'lever');
    bMode.setAttribute('aria-pressed', S.mode === 'maze' ? 'true' : 'false');
    dLab.textContent = L('dopamina', 'dopamine');
    dV.textContent = dIn.value + '%';
    dIn.setAttribute('aria-valuetext', dIn.value + '%');
    bLever.setAttribute('aria-label', L('Alavanca. Segure para apertar. Agora pede ', 'Lever. Hold to press. It now needs ') + fmt(holdNeeded(S.d), 1) + L(' segundo.', ' seconds.'));
    hint.textContent = L('segure a alavanca', 'hold the lever');
    bTrial.textContent = L('soltar o rato', 'release the rat');
    bTen.textContent = L('10 tentativas', '10 trials');
    bClear.textContent = L('zerar', 'reset');
    outH.textContent = L('o que Salamone viu', 'what Salamone saw');
    OUT.forEach(function (o, i) {
      o.h.innerHTML = L('dopamina ', 'dopamine ') + '<b>' + o.d + '%</b>';
      o.k.innerHTML = '<span><i class="w06a-sw a"></i>' + L('pelota doce, com esforço', 'sweet pellet, with effort') + '</span><span><i class="w06a-sw b"></i>' + L('ração de graça', 'free chow') + '</span>';
      o.t.textContent = i ? L('Come a ração de graça.', 'Eats the free chow.') : L('Trabalha pela pelota doce.', 'Works for the sweet pellet.');
    });
    outN.textContent = L('Esquema sem os números do estudo. A comida total foi a mesma nos dois casos.', 'Schematic, without the study’s numbers. Total food eaten was the same in both cases.');
    take.textContent = L('Com menos dopamina, o rato continua com fome e gostando do doce. Ele perde a disposição de trabalhar pelo doce e passa a comer a ração de graça.',
      'With less dopamine, the rat is still hungry and still likes the sweet pellet. It loses the will to work for it and eats the free chow instead.');
    cv.setAttribute('aria-label', S.mode === 'lever'
      ? L('Gaiola vista de lado. À esquerda, uma alavanca com mola e peso solta uma pelota doce a cada cinco apertos. À direita, ração de graça no chão. Dopamina em ', 'Side view of a cage. On the left, a lever with a spring and a weight releases a sweet pellet every five presses. On the right, free chow on the floor. Dopamine at ') + dIn.value + '%.'
      : L('Labirinto em T visto de cima. Braço esquerdo: quatro pelotas atrás de uma barreira de 30 cm. Braço direito: duas pelotas sem barreira.', 'T-maze seen from above. Left arm: four pellets behind a 30 cm barrier. Right arm: two pellets with no barrier.'));
    if (!raf) draw(0);
  }

  /* ---------- loop ---------- */
  var raf = 0, last = 0, visible = false, T = 0;
  function draw(t) { if (S.mode === 'lever') drawLeverScene(t); else drawMaze(t); }
  function kick() { if (!raf && visible) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function frame(now) {
    raf = 0;
    var dt = Math.min(0.05, (now - last) / 1000); last = now; T += dt;
    if (S.mode === 'lever') {
      stepLever(dt, T);
      if (HAS_M) { var sd = Math.min(16.6, dt * 500); Matter.Engine.update(engine, sd); Matter.Engine.update(engine, sd); }
    } else stepMaze(dt);
    draw(T);
    if (visible) raf = requestAnimationFrame(frame);
  }

  layout(); build(); relabel(); draw(0);
  DN.onLang(relabel);
  DN.onVisible(root, function (v) { visible = v; if (v) kick(); });
  var rz = 0, lastW = root.clientWidth;
  window.addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () {
      if (root.clientWidth === lastW) return; lastW = root.clientWidth;
      S.rat.x = 0; layout(); build(); mazeGeom(); draw(T);
    }, 150);
  });
})();
