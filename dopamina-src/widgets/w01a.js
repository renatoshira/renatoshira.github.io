/* w01a · o-coelho-de-carlsson
   Three risograph frames side by side: the rabbit at rest, 16 hours after
   reserpine, and about 15 minutes after L-DOPA, each with a striatal dopamine
   meter. The syringes between frames act as the arrows. On first view the
   frames print one after the other; "ver de novo" replays it.
   Meter levels are schematic. Times come from the 1957 paper (about 16 h after
   reserpine) and historical accounts (about 15 min after L-DOPA). */
(function () {
  'use strict';
  var root = DN.body('w01a'); if (!root) return;
  var C = DN.COL, L = DN.L, S = DN.svg;
  var RES = C.pausa, LEVO = C.sub.levodopa;
  var EASE = function (t) { return 1 - Math.pow(1 - t, 3); };
  var EASEIO = function (t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };

  /* ---------------- risograph kit (technique from w00) ----------------
     Two spot inks, amber (a) and indigo (b). Each ink is one layer group with a
     grain filter and a small misregistration; the inks multiply where they meet.
     Parts exist in both layers and get the same transform, so animation moves
     plain groups and only two filter passes run per object.
     Markup tokens: $0 solid ink, $1 $2 $3 light/mid/dark halftone, $p paper. */
  var INK = { fill: 'none', stroke: C.ink, 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
  function ink(extra) { var o = {}; for (var k in INK) o[k] = INK[k]; for (k in extra) o[k] = extra[k]; return o; }
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
  var INKS = { a: { col: C.dopa, ang: 15, op: .95 }, b: { col: C.pausa, ang: 75, op: .93 } };
  function risoDefs(parent) {
    var R = rng(1957), h = '';
    ['a', 'b'].forEach(function (k) {
      var ik = INKS[k], p = 'w01a-' + k;
      [0.62, 0.92, 1.2].forEach(function (r, j) {
        h += '<pattern id="' + p + 'h' + (j + 1) + '" width="2.8" height="2.8" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ik.ang + ')">' +
          '<circle cx="1.4" cy="1.4" r="' + r + '" fill="' + ik.col + '"/></pattern>';
      });
      h += '<filter id="' + p + 'g" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.6" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
    });
    S('defs', null, parent).innerHTML = h;
  }
  function tok(s, k) {
    return s.replace(/\$0/g, INKS[k].col).replace(/\$p/g, C.paper).replace(/\$([123])/g, 'url(#w01a-' + k + 'h$1)');
  }
  function Riso(parent, seed, cls) {
    var R = rng(seed);
    var g = S('g', { class: 'w01a-riso ' + (cls || '') }, parent);
    var o = { g: g, parts: {}, L: {} };
    ['a', 'b'].forEach(function (k, li) {
      var mx = f1((R() < .5 ? -1 : 1) * (.5 + R() * (li ? 1.1 : .5)));
      var my = f1((R() < .5 ? -1 : 1) * (.4 + R() * (li ? .9 : .4)));
      o.L[k] = S('g', { class: 'w01a-ink-' + k, filter: 'url(#w01a-' + k + 'g)', transform: 'translate(' + mx + ' ' + my + ')', opacity: INKS[k].op }, g);
    });
    o.part = function (name, parentName, a, b) {
      var pr = parentName ? o.parts[parentName] : null, pair = {};
      ['a', 'b'].forEach(function (k) {
        var pg = S('g', null, pr ? pr[k] : o.L[k]);
        var m = k === 'a' ? a : b;
        if (m) pg.innerHTML = tok(m, k);
        pair[k] = pg;
      });
      o.parts[name] = pair;
      return pair;
    };
    o.set = function (name, v) {
      var p = o.parts[name]; if (p.last === v) return;
      p.last = v; p.a.setAttribute('transform', v); p.b.setAttribute('transform', v);
    };
    return o;
  }

  /* ---------------- rabbit (local coords, ground at y 200) ---------------- */
  var EAR = 'M-7 2 C-15 -26 -15 -66 -2 -90 C4 -101 15 -100 17 -88 C21 -62 15 -26 9 2 Z';
  var EARIN = 'M-2 -10 C-7 -34 -7 -62 1 -81 C5 -89 11 -88 12 -80 C14 -58 10 -34 5 -10 Z';
  var BODY = 'M150 92 C122 76 76 76 48 104 C24 128 22 170 46 190 C54 197 70 199 92 199 L150 199 C164 198 172 186 176 168 C182 144 178 114 162 100 Z';
  var HAUNCH = 'M60 196 C54 154 84 128 114 138 C138 148 138 182 120 197 Z';
  var FOOT = 'M54 196 C54 189 64 186 84 187 L132 189 C142 190 146 199 136 200 L58 200 C55 200 54 199 54 196 Z';
  var PAW = 'M158 146 C165 164 171 181 173 192 C174 198 181 200 187 199 C192 198 193 193 188 190 C183 176 179 160 176 142 Z';
  var PAWF = 'M174 146 C180 164 186 180 189 191 C190 197 197 200 202 199 C207 198 207 193 203 190 C197 176 192 160 188 144 Z';
  var HEAD = 'M156 64 C170 46 202 44 218 60 C228 70 234 82 230 92 C226 102 212 108 196 108 C176 108 156 98 152 82 C150 74 152 68 156 64 Z';
  function drawRabbit(parent) {
    var sh = Riso(parent, 31, 'w01a-shadow');
    sh.part('s', null, '<ellipse cx="132" cy="200" rx="98" ry="5.5" fill="$2"/>', '');
    var rb = Riso(parent, 57, 'w01a-rabbit');
    rb.part('earFar', null, '<path d="' + EARIN + '" fill="$2"/>', '<path d="' + EAR + '" fill="$1"/>');
    rb.part('pawFar', null, '', '<path d="' + PAWF + '" fill="$1"/>');
    rb.part('body', null,
      '<circle cx="31" cy="138" r="14" fill="$0"/><circle cx="22" cy="131" r="6.5" fill="$0"/><circle cx="24" cy="147" r="6" fill="$0"/>' +
      '<ellipse cx="160" cy="152" rx="13" ry="28" fill="$1"/>',
      '<path d="' + BODY + '" fill="$2"/>' +
      '<path d="' + HAUNCH + '" fill="$3" stroke="$p" stroke-width="2.2"/>' +
      '<path d="M86 93 C96 89 108 88 118 89 M64 102 C70 98 76 96 82 95 M150 132 l6 6 M154 122 l6 5" stroke="$p" stroke-width="1.6" stroke-linecap="round" fill="none"/>');
    rb.part('foot', null, '', '<path d="' + FOOT + '" fill="$3" stroke="$p" stroke-width="2"/>');
    rb.part('paw', null, '', '<path d="' + PAW + '" fill="$3" stroke="$p" stroke-width="2"/>');
    rb.part('head', null, '<circle cx="201" cy="93" r="11" fill="$1"/>',
      '<path d="' + HEAD + '" fill="$2" stroke="$p" stroke-width="2.4"/>');
    rb.part('eye', 'head', '', '<ellipse cx="0" cy="0" rx="6.4" ry="7.4" fill="$0"/><circle cx="1.9" cy="-2.7" r="1.8" fill="$p"/>');
    rb.part('nose', 'head', '<path d="M-5 -2.5 C-2 -5 3 -5 3 -1 C3 2.5 -1 3.5 -4 2.5 Z" fill="$0"/>',
      '<path d="M-1 2 C-1 6 -3 8 -7 9 M-1 6 C1 8 3 9 4 8" stroke="$0" stroke-width="1.4" stroke-linecap="round" fill="none"/>' +
      '<path d="M-4 4 C6 2 18 0 30 -4 M-4 6 C8 6 20 7 31 9 M-5 8 C4 11 14 15 24 20" stroke="$0" stroke-width="1.1" stroke-linecap="round" fill="none"/>');
    rb.part('earNear', null, '<path d="' + EARIN + '" fill="$0"/>', '<path d="' + EAR + '" fill="$2" stroke="$p" stroke-width="2.4"/>');
    return { rb: rb, sh: sh };
  }

  function drawSyringe(parent, kind) {
    var o = Riso(parent, kind === 'res' ? 11 : 23);
    o.part('body', null,
      (kind === 'levo' ? '<rect x="35" y="-8" width="20" height="16" fill="$0"/>' : '') + '<rect x="0" y="-16" width="170" height="32" fill="none"/>',
      (kind === 'res' ? '<rect x="35" y="-8" width="20" height="16" fill="$3"/>' : '') +
      '<path d="M0 0 H26" stroke="$0" stroke-width="2.2" stroke-linecap="round"/>' +
      '<path d="M26 -3.5 L34 -5.5 L34 5.5 L26 3.5 Z" fill="$0"/>' +
      '<rect x="34" y="-9" width="72" height="18" rx="2" fill="none" stroke="$0" stroke-width="2.6"/>' +
      '<path d="M44 -9 v5 M54 -9 v7 M64 -9 v5 M74 -9 v7 M84 -9 v5 M94 -9 v7" stroke="$0" stroke-width="1.6" fill="none"/>' +
      '<path d="M106 -16 V16" stroke="$0" stroke-width="3.4" stroke-linecap="round"/>' +
      '<rect x="55" y="-8" width="5" height="16" fill="$0"/><path d="M60 0 H123" stroke="$0" stroke-width="3.4"/>' +
      '<path d="M124 -12 V12" stroke="$0" stroke-width="4.4" stroke-linecap="round"/>');
    return o;
  }

  /* ---------------- states ---------------- */
  /* pose: ear 0..1, lid 0..1, sag 0..1, dopa (meter) 0..1 */
  var POSE = {
    normal: { ear: 1, lid: 0, sag: 0, dopa: 1 },
    res: { ear: 0, lid: .78, sag: 1, dopa: .04 },
    levo: { ear: 1, lid: 0, sag: 0, dopa: .82 }
  };
  var FR = [
    { k: 'normal', from: 'normal' },
    { k: 'res', from: 'normal' },
    { k: 'levo', from: 'res' }
  ];
  function frameText(i) {
    return [
      [L('1 · antes', '1 · before'), L('O coelho anda e mexe as orelhas.', 'The rabbit walks and twitches its ears.'), L('normal', 'normal')],
      [L('2 · 16 horas depois', '2 · 16 hours later'), L('Imóvel, de pálpebras caídas.', 'Motionless, eyelids drooping.'), L('quase zero', 'near zero')],
      [L('3 · cerca de 15 min depois', '3 · about 15 min later'), L('Mexe as orelhas, depois as patas, e volta a andar.', 'Moves its ears, then its paws, and walks again.'), L('de volta', 'back')]
    ][i];
  }

  /* ---------------- DOM ---------------- */
  root.innerHTML = '';
  var svg = S('svg', { role: 'img', class: 'w01a-svg' }, root);
  var take = DN.el('p', { class: 'w01a-take' }, root);
  var btns = DN.el('div', { class: 'rowbtns mt w01a-btns' }, root);
  var bAgain = DN.el('button', { class: 'btn', type: 'button' }, btns);
  var narrow = false, F = [], t0 = performance.now(), raf = 0, visible = false, played = false, playT = -99;
  function now() { return (performance.now() - t0) / 1000; }

  function layout() {
    if (narrow) return {
      W: 340, H: 668, cw: 336, gw: 186,
      panel: function (i) { return { x: 0, y: i * 232 }; },
      lab: [0, 14], cap: [0, 31], rab: { x: -4, y: 184, s: .56 },
      meter: { x: 200, y: 122, w: 136, h: 12 }, mlab: [200, 112], mval: [200, 156],
      syr: function (i) { return { x: 100, y: (i + 1) * 232 - 4, r: -90, s: .24, lx: 116, ly: (i + 1) * 232 - 20, an: 'start' }; }
    };
    return {
      W: 680, H: 296, cw: 186, gw: 186,
      panel: function (i) { return { x: i * 247, y: 0 }; },
      lab: [0, 14], cap: [0, 31], rab: { x: 0, y: 222, s: .68 },
      meter: { x: 0, y: 252, w: 186, h: 12 }, mlab: [0, 243], mval: [0, 286],
      syr: function (i) { return { x: 242 + i * 247, y: 150, r: 180, s: .3, lx: 216 + i * 247, ly: 176, an: 'middle' }; }
    };
  }
  function build() {
    narrow = root.clientWidth < 560;
    var LY = layout();
    svg.innerHTML = '';
    svg.setAttribute('viewBox', '0 0 ' + LY.W + ' ' + LY.H);
    risoDefs(svg);
    F = FR.map(function (fr, i) {
      var P = LY.panel(i);
      var g = S('g', { class: 'w01a-fr', transform: 'translate(' + P.x + ' ' + P.y + ')' }, svg);
      var o = { g: g, k: fr.k, P: {}, from: POSE[fr.from], to: POSE[fr.k], idle: { earT: -9, nextEar: 1 + i, hopT: -9, nextHop: 2 + i * 1.3, side: 1 } };
      for (var key in POSE[fr.k]) o.P[key] = POSE[fr.k][key];
      o.lab = S('text', { x: LY.lab[0], y: LY.lab[1], 'font-size': 11.5, 'font-weight': 700, fill: i === 1 ? RES : i === 2 ? LEVO : C.ink, class: 'w01a-t' }, g);
      o.cap = S('text', { x: LY.cap[0], y: LY.cap[1], 'font-size': 10.5, fill: C.dim, class: 'w01a-t' }, g);
      /* ground */
      var gw = LY.gw, gy = LY.rab.y;
      var gr = Riso(g, 5 + i, 'w01a-ground');
      gr.part('g', null, '', '<rect x="0" y="' + (gy - 10) + '" width="' + gw + '" height="14" fill="none"/>' +
        '<path d="M2 ' + (gy + 0.5) + ' H' + gw + '" stroke="$0" stroke-width="1.6" stroke-linecap="round"/>' +
        '<path d="M14 ' + gy + ' l-2 -5 M17 ' + gy + ' l1 -7 M' + (gw - 30) + ' ' + gy + ' l-2 -5 M' + (gw - 27) + ' ' + gy + ' l1 -7 M' + (gw - 24) + ' ' + gy + ' l3 -4" stroke="$0" stroke-width="1.2" stroke-linecap="round" fill="none"/>');
      var rw = S('g', { transform: 'translate(' + LY.rab.x + ' ' + (LY.rab.y - 200 * LY.rab.s) + ') scale(' + LY.rab.s + ')' }, g);
      o.rab = drawRabbit(rw);
      /* meter: horizontal amber bar in an indigo frame */
      var M = LY.meter;
      var mr = Riso(g, 77 + i, 'w01a-meter');
      var ticks = '';
      for (var j = 0; j <= 10; j++) { var xx = f1(M.x + M.w * j / 10); ticks += 'M' + xx + ' ' + (M.y + M.h + 1) + ' v' + (j % 5 ? 3 : 6) + ' '; }
      mr.part('fill', null,
        '<rect x="' + M.x + '" y="' + M.y + '" width="' + M.w + '" height="' + M.h + '" fill="$1"/>' +
        '<rect class="w01a-mf" x="' + M.x + '" y="' + M.y + '" width="' + M.w + '" height="' + M.h + '" fill="$0"/>', '');
      mr.part('frame', null, '', '<rect x="' + M.x + '" y="' + M.y + '" width="' + M.w + '" height="' + M.h + '" fill="none" stroke="$0" stroke-width="1.8"/>' +
        '<path d="' + ticks + '" stroke="$0" stroke-width="1.2" fill="none"/>');
      o.mf = mr.parts.fill.a.querySelector('.w01a-mf');
      o.M = M;
      o.mlab = S('text', { x: LY.mlab[0], y: LY.mlab[1], 'font-size': 10.5, fill: C.dim, class: 'w01a-t' }, g);
      o.mval = S('text', { x: LY.mval[0], y: LY.mval[1], 'font-size': 11.5, 'font-weight': 700, fill: i === 1 ? RES : C.ink, class: 'w01a-t' }, g);
      return o;
    });
    /* syringes as the arrows between frames */
    G.syr = ['res', 'levo'].map(function (k, i) {
      var sp = LY.syr(i);
      var sg = S('g', { class: 'w01a-arrow', transform: 'translate(' + sp.x + ' ' + sp.y + ') rotate(' + sp.r + ') scale(' + sp.s + ')' }, svg);
      drawSyringe(sg, k);
      var t = S('text', { x: sp.lx, y: sp.ly, 'font-size': 11, 'font-weight': 700, fill: k === 'res' ? RES : LEVO, 'text-anchor': sp.an, class: 'w01a-t' }, svg);
      return { g: sg, t: t };
    });
    relabel();
    if (!played || DN.RM) F.forEach(function (o) { setPose(o, POSE[o.k]); });
    paint(now());
  }
  var G = {};

  function setPose(o, p) { for (var k in p) o.P[k] = p[k]; }

  function relabel() {
    take.textContent = L('Sem dopamina no estriado, o coelho para. A L-DOPA repõe a dopamina, e o movimento volta.',
      'Without dopamine in the striatum, the rabbit stops. L-DOPA puts the dopamine back, and the movement returns.');
    bAgain.textContent = L('ver de novo', 'watch again');
    F.forEach(function (o, i) {
      var tx = frameText(i);
      o.lab.textContent = tx[0]; o.cap.textContent = tx[1];
      o.mlab.textContent = L('dopamina no estriado', 'striatal dopamine');
      o.mval.textContent = tx[2];
      fitText(o.cap, layout().cw);
    });
    if (G.syr) { G.syr[0].t.textContent = L('reserpina', 'reserpine'); G.syr[1].t.textContent = 'L-DOPA'; }
    svg.setAttribute('aria-label', L(
      'Três quadros. Sem remédio, o coelho anda e o medidor de dopamina no estriado está cheio. Dezesseis horas depois da reserpina, o coelho está imóvel, de pálpebras caídas, e o medidor está quase em zero. Cerca de quinze minutos depois da L-DOPA, o coelho volta a andar e o medidor sobe de novo.',
      'Three frames. With no drug, the rabbit walks and the striatal dopamine meter is full. Sixteen hours after reserpine, the rabbit is motionless with drooping eyelids and the meter is near zero. About fifteen minutes after L-DOPA, the rabbit walks again and the meter rises.'));
  }
  /* long frame captions wrap onto a second line in the narrow column */
  function fitText(t, maxW) {
    var full = t.textContent;
    t.textContent = full;
    try { if (t.getComputedTextLength() <= maxW) return; } catch (e) { return; }
    var words = full.split(' '), a = '', x = t.getAttribute('x');
    for (var i = 0; i < words.length; i++) {
      var test = a ? a + ' ' + words[i] : words[i];
      t.textContent = test;
      if (t.getComputedTextLength() > maxW && a) break;
      a = test;
    }
    var rest = words.slice(a.split(' ').length).join(' ');
    t.textContent = '';
    S('tspan', { x: x }, t).textContent = a;
    S('tspan', { x: x, dy: '1.25em' }, t).textContent = rest;
  }

  /* ---------------- motion ---------------- */
  /* timeline after playT: frame i prints at 0.5 i s; frame 2 slumps over 1.2 s;
     frame 3 recovers ears first, then paws */
  function timeline(o, i, t) {
    var a = t - playT;
    if (!played || DN.RM) return;
    var u;
    if (i === 1) {
      u = DN.clamp((a - 1.1) / 1.2, 0, 1);
      var e = EASE(u);
      o.P.ear = DN.lerp(1, 0, e); o.P.sag = DN.lerp(0, 1, EASEIO(u)); o.P.dopa = DN.lerp(1, .04, EASEIO(u));
      o.P.lid = DN.lerp(0, .78, EASEIO(DN.clamp((a - 1.6) / 1, 0, 1)));
    } else if (i === 2) {
      var b = a - 2.6;
      o.P.dopa = DN.lerp(.04, .82, EASEIO(DN.clamp(b / 1.6, 0, 1)));
      o.P.ear = DN.lerp(0, 1, EASE(DN.clamp((b - .3) / .6, 0, 1)));
      o.P.lid = DN.lerp(.78, 0, EASE(DN.clamp((b - .5) / .6, 0, 1)));
      o.P.sag = DN.lerp(1, 0, EASEIO(DN.clamp((b - .9) / .8, 0, 1)));
    }
  }
  function paint(t) {
    F.forEach(function (o, i) {
      timeline(o, i, t);
      var P = o.P, rb = o.rab.rb, id = o.idle;
      var lively = P.ear > .6 && P.sag < .2 && !DN.RM;
      var et = 0, stretch = 0, hy = 0, dx = 0;
      if (lively) {
        if (t > id.nextEar) { id.earT = t; id.side = Math.random() < .5 ? 1 : -1; id.nextEar = t + 1.4 + Math.random() * 2.6; }
        if (t > id.nextHop) { id.hopT = t; id.nextHop = t + 2.8 + Math.random() * 3.5; }
        var ep = (t - id.earT) / .28; if (ep >= 0 && ep <= 1) et = Math.sin(Math.PI * ep) * 9 * id.side;
        var hp = (t - id.hopT) / .5; if (hp >= 0 && hp <= 1) { stretch = Math.sin(Math.PI * hp); hy = -12 * stretch; dx = 4 * Math.sin(2 * Math.PI * hp); }
      }
      var sag = P.sag;
      rb.set('earNear', 'translate(' + f1(172 - 4 * sag) + ' ' + f1(58 + 10 * sag) + ') rotate(' + f1(-14 - 52 * sag + et - 10 * stretch) + ')');
      rb.set('earFar', 'translate(' + f1(162 - 4 * sag) + ' ' + f1(60 + 10 * sag) + ') rotate(' + f1(-26 - 46 * sag + et * .6 - 8 * stretch) + ')');
      rb.set('head', 'rotate(' + f1(12 * sag) + ' 170 92) translate(0 ' + f1(8 * sag) + ')');
      rb.set('eye', 'translate(198 72) scale(1 ' + (Math.round((1 - .86 * P.lid) * 100) / 100) + ')');
      rb.set('nose', 'translate(229 84)');
      rb.set('paw', 'rotate(' + f1(-14 * stretch) + ' 172 146)');
      rb.set('pawFar', 'rotate(' + f1(-10 * stretch) + ' 190 146)');
      rb.set('foot', 'rotate(' + f1(8 * stretch) + ' 60 196)');
      var bt = 'translate(' + f1(dx) + ' ' + f1(hy + 4 * sag) + ') rotate(' + f1(-5 * stretch) + ' 110 196)';
      if (rb.lastT !== bt) { rb.lastT = bt; rb.g.setAttribute('transform', bt); }
      var k = Math.round((1 - .14 * stretch) * 100) / 100, sh = o.rab.sh;
      var st = 'translate(' + f1(dx + 132 * (1 - k)) + ' 0) scale(' + k + ' 1)';
      if (sh.lastT !== st) { sh.lastT = st; sh.g.setAttribute('transform', st); }
      var w = f1(o.M.w * P.dopa);
      if (o.lastW !== w) { o.lastW = w; o.mf.setAttribute('width', w); }
    });
  }
  function loop() {
    raf = 0;
    if (!visible) return;
    paint(now());
    raf = requestAnimationFrame(loop);
  }
  function kick() { if (DN.RM) { paint(now()); return; } if (visible && !raf) raf = requestAnimationFrame(loop); }
  function play() {
    if (DN.RM) return;
    played = true; playT = now();
    F.forEach(function (o) { setPose(o, o.from); });
    kick();
  }
  bAgain.addEventListener('click', play);

  build();
  DN.onVisible(root, function (v) {
    visible = v;
    if (v && !played && !DN.RM) play();
    kick();
  }, { threshold: .35 });
  DN.onLang(function () { relabel(); paint(now()); });
  var rz = 0, lastN = narrow;
  window.addEventListener('resize', function () {
    clearTimeout(rz);
    rz = setTimeout(function () { var n = root.clientWidth < 560; if (n !== lastN) { lastN = n; build(); } }, 150);
  });
})();
