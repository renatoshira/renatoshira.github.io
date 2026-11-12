/* w02b · desenrole-o-axonio
   One dopamine axon arbor tangled inside a translucent striatum (Three.js,
   loaded on demand) that unrolls into a 4.5 m line next to familiar objects,
   plus a log-scale bar chart of synapses per neuron. Canvas 2D fallback. */
(function () {
  'use strict';
  var root = DN.body('w02b'); if (!root) return;
  var C = DN.COL, L = DN.L, el = DN.el;
  var RM = DN.RM;
  var WEAK = (navigator.hardwareConcurrency || 8) <= 4 || !!window.__w02bForce2D;
  var THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.186.1/build/three.module.min.js';

  /* world: 2 units = 1 m once the axon is straight */
  var UPM = 2, LEN_M = 4.5, X0 = -4.5, Y0 = -1.55, SIG = 0.16;
  var FOV = 35;

  /* ---------------- DOM ---------------- */
  root.innerHTML = '';
  var stage = el('div', { class: 'w02b-stage' }, root);
  var ov = DN.svg('svg', { class: 'w02b-ov', 'aria-hidden': 'true' }, null);
  var hint = el('div', { class: 'w02b-hint' }, stage);
  var loadMsg = el('div', { class: 'w02b-load' }, stage);
  stage.appendChild(ov);
  var chart = el('div', { class: 'w02b-chart', hidden: '' }, root);

  var ctr = el('div', { class: 'w02b-ctrl' }, root);
  var sliderRow = el('div', { class: 'ctrlrow w02b-row' }, ctr);
  var sLab = el('label', { for: 'w02b-u' }, sliderRow);
  var slider = el('input', { type: 'range', id: 'w02b-u', min: 0, max: 100, step: 0.5, value: 0 }, sliderRow);
  var sVal = el('span', { class: 'v w02b-v' }, sliderRow);
  var stepRow = el('div', { class: 'rowbtns w02b-steps' }, ctr);
  var stepBtns = [0, 0.5, 1].map(function (u) {
    var b = el('button', { class: 'btn', type: 'button' }, stepRow);
    b.addEventListener('click', function () { setU(u, true); });
    return b;
  });
  var actRow = el('div', { class: 'rowbtns mt' }, ctr);
  var bSyn = el('button', { class: 'btn w02b-syn', type: 'button', 'aria-pressed': 'false' }, actRow);
  var take = el('p', { class: 'w02b-take' }, root);
  var live = el('div', { class: 'live', 'aria-live': 'polite' }, root);
  var sr = el('p', { class: 'sr' }, root);
  if (RM) sliderRow.hidden = true; else stepRow.hidden = true;

  /* ---------------- data: procedural arbor ---------------- */
  function mulberry(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  /* striatum: caudate (curved tapering tube) + putamen (lumpy ellipsoid) */
  var CAUD = [[-1.25, 0.25, 0.05], [-1.0, 0.72, 0.05], [-0.3, 1.02, -0.05], [0.55, 0.92, -0.25], [1.25, 0.45, -0.35], [1.42, -0.15, -0.2], [1.15, -0.62, 0.05]];
  function caudR(t) {
    var base = 0.5 * Math.pow(1 - t, 1.25) + 0.035;
    if (t < 0.1) base *= Math.sqrt(Math.max(0, 1 - Math.pow((0.1 - t) / 0.1, 2)));
    return base;
  }
  var PUT = { c: [0.12, -0.28, 0.42], r: [0.98, 0.62, 0.42] };
  function putDeform(x, y, z) { return 1 + 0.05 * Math.sin(3.1 * x + 0.4) * Math.sin(2.3 * y + 1.1) + 0.035 * Math.sin(4.7 * z + 2 * x); }
  var SOMA = [-0.55, -1.75, -0.35];
  var TER = { c: [0.18, -0.24, 0.42], r: [0.84, 0.54, 0.38] };

  function genTree() {
    var R = mulberry(110807);
    var P = [], Dg = [], CAP = WEAK ? 5200 : 8200, STEP = 0.026;
    function norm(v) { var l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
    function add(p, q, d0, d1) { P.push(p[0], p[1], p[2], q[0], q[1], q[2]); Dg.push(d0, d1); }
    var p = SOMA.slice(), dir = norm([0.35, 1, 0.45]), dist = 0, g = 0;
    while (g++ < 500) {
      var to = [TER.c[0] - 0.35 - p[0], TER.c[1] - p[1], TER.c[2] - p[2]];
      var ln = Math.hypot(to[0], to[1], to[2]); if (ln < 0.32) break;
      to = norm(to);
      dir = norm([dir[0] * 0.92 + to[0] * 0.08 + (R() - 0.5) * 0.12, dir[1] * 0.92 + to[1] * 0.08 + (R() - 0.5) * 0.12, dir[2] * 0.92 + to[2] * 0.08 + (R() - 0.5) * 0.12]);
      var q = [p[0] + dir[0] * STEP * 1.6, p[1] + dir[1] * STEP * 1.6, p[2] + dir[2] * STEP * 1.6];
      add(p, q, dist, dist + STEP * 1.6); dist += STEP * 1.6; p = q;
    }
    var D = 8;
    function grow(p, dir, dist, depth, st) {
      var c = depth < D ? 1 + (R() < 0.65) + (R() < 0.35) : 0, at = [];
      for (var k = 0; k < c; k++) at.push(Math.floor(R() * st));
      var wig = 0.34 + depth * 0.025;
      for (var i = 0; i < st && Dg.length / 2 < CAP; i++) {
        var ex = (p[0] - TER.c[0]) / TER.r[0], ey = (p[1] - TER.c[1]) / TER.r[1], ez = (p[2] - TER.c[2]) / TER.r[2];
        var e = Math.hypot(ex, ey, ez) || 1, pull = e > 0.78 ? (e - 0.78) * 1.1 : 0;
        dir = norm([dir[0] + (R() * 2 - 1) * wig - ex / e * pull, dir[1] + (R() * 2 - 1) * wig - ey / e * pull, dir[2] + (R() * 2 - 1) * wig - ez / e * pull]);
        var q = [p[0] + dir[0] * STEP, p[1] + dir[1] * STEP, p[2] + dir[2] * STEP];
        add(p, q, dist, dist + STEP); dist += STEP; p = q;
        for (var k2 = 0; k2 < c; k2++) if (at[k2] === i) {
          var nd = norm([dir[0] + (R() * 2 - 1) * 1.3, dir[1] + (R() * 2 - 1) * 1.3, dir[2] + (R() * 2 - 1) * 1.3]);
          grow(p.slice(), nd, dist, depth + 1, Math.max(8, Math.floor(st * (0.6 + R() * 0.35))));
        }
      }
    }
    grow(p, dir, dist, 0, 110);
    var nV = P.length / 3, nS = nV / 2;
    var tang = new Float32Array(P), str = new Float32Array(nV * 3), a = new Float32Array(nV), d = new Float32Array(nV);
    var cum = 0, segLen = new Float32Array(nS), dmax = 0, i;
    for (i = 0; i < nS; i++) {
      var j = i * 6; segLen[i] = Math.hypot(P[j + 3] - P[j], P[j + 4] - P[j + 1], P[j + 5] - P[j + 2]); cum += segLen[i];
    }
    for (i = 0; i < Dg.length; i++) if (Dg[i] > dmax) dmax = Dg[i];
    var s = 0;
    for (i = 0; i < nS; i++) {
      var a0 = s / cum, a1 = (s + segLen[i]) / cum; s += segLen[i];
      a[2 * i] = a0; a[2 * i + 1] = a1;
      str[6 * i] = X0 + a0 * LEN_M * UPM; str[6 * i + 1] = Y0; str[6 * i + 2] = 0;
      str[6 * i + 3] = X0 + a1 * LEN_M * UPM; str[6 * i + 4] = Y0; str[6 * i + 5] = 0;
      d[2 * i] = Dg[2 * i] / dmax; d[2 * i + 1] = Dg[2 * i + 1] / dmax;
    }
    /* boutons (varicosities): amber points at some segment ends */
    var bt = [], bs = [], ba = [], bd = [];
    for (i = 8; i < nS; i++) if (R() < 0.085) {
      var v = 2 * i + 1;
      bt.push(tang[3 * v], tang[3 * v + 1], tang[3 * v + 2]); bs.push(str[3 * v], Y0, 0); ba.push(a[v]); bd.push(d[v]);
    }
    return { tang: tang, str: str, a: a, d: d, nV: nV,
      bt: new Float32Array(bt), bs: new Float32Array(bs), ba: new Float32Array(ba), bd: new Float32Array(bd), nB: ba.length };
  }

  /* ---------------- shared state ---------------- */
  var data = null, mode = null, started = false, visible = false, showChart = false;
  var U = 0, Ushown = 0, ang = 0.6, uTheta = 0, uPhi = 0.2, vTh = 0, vPh = 0, dragging = false, everDragged = false;
  var W = 0, H = 0, raf = 0, lastT = 0, needsDraw = true, t0 = performance.now();
  var lastMilestone = -1;

  function smooth(x) { x = DN.clamp(x, 0, 1); return x * x * (3 - 2 * x); }
  function camK(u) { return smooth(u / 0.26); }
  function wOf(a, u) { return smooth((u * (1 + SIG) - a) / SIG); }

  /* camera framing for the two states */
  function frames() {
    var asp = W / Math.max(1, H), tn = Math.tan(FOV * Math.PI / 360);
    var D0 = 1.78 / tn / Math.min(1, asp * 0.95);
    var halfW = 5.55, top = Y0 + 3.8, cx = -0.45, bot = Y0 - 0.5;
    var D1 = 1, ppu = 1, mb = 0.6;
    for (var it = 0; it < 3; it++) {
      bot = Y0 - mb;
      var halfH = (top - bot) / 2;
      D1 = Math.max(halfH / tn, halfW / (tn * asp));
      ppu = (H / 2) / (D1 * tn);
      mb = 84 / ppu;
    }
    return { D0: D0, t0: [0.1, -0.35, 0.1], D1: D1, t1: [cx, (top + bot) / 2, 0] };
  }
  function camState(u) {
    var f = frames(), k = camK(u);
    var D = Math.exp(DN.lerp(Math.log(f.D0), Math.log(f.D1), k));
    var tx = DN.lerp(f.t0[0], f.t1[0], k), ty = DN.lerp(f.t0[1], f.t1[1], k), tz = DN.lerp(f.t0[2], f.t1[2], k);
    var th = uTheta * (1 - k), ph = uPhi * (1 - k);
    return { D: D, tx: tx, ty: ty, tz: tz, th: th, ph: ph,
      ex: tx + D * Math.sin(th) * Math.cos(ph), ey: ty + D * Math.sin(ph), ez: tz + D * Math.cos(th) * Math.cos(ph) };
  }

  /* ---------------- overlay (labels, scale objects) ---------------- */
  function f3(v) { return (+v).toFixed(3); }
  /* Catmull-Rom through points [x, y, corner?]; corners get zero tangents */
  function smoothPath(pts, closed) {
    var n = pts.length, d = 'M' + f3(pts[0][0]) + ' ' + f3(pts[0][1]);
    function at(i) { return closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]; }
    function tan(i) {
      var p = at(i); if (p[2]) return [0, 0];
      var a = at(i - 1), b = at(i + 1); return [(b[0] - a[0]) / 6, (b[1] - a[1]) / 6];
    }
    var last = closed ? n : n - 1;
    for (var i = 0; i < last; i++) {
      var p0 = at(i), p1 = at(i + 1), t0 = tan(i), t1 = tan(i + 1);
      d += ' C' + f3(p0[0] + t0[0]) + ' ' + f3(p0[1] + t0[1]) + ' ' + f3(p1[0] - t1[0]) + ' ' + f3(p1[1] - t1[1]) + ' ' + f3(p1[0]) + ' ' + f3(p1[1]);
    }
    return d + (closed ? ' Z' : '');
  }
  var OV = {};
  function buildOverlay() {
    ov.innerHTML = '';
    var S = DN.svg;
    OV.tg = S('g', { class: 'w02b-tl' }, ov);
    OV.lStri = S('text', { class: 'w02b-lab' }, OV.tg);
    OV.lSoma = S('text', { class: 'w02b-lab w02b-amb' }, OV.tg);
    OV.lSomaLn = S('line', { class: 'w02b-lead' }, OV.tg);
    OV.lAx = S('text', { class: 'w02b-lab' }, OV.tg);
    OV.lAxLn = S('line', { class: 'w02b-lead' }, OV.tg);

    /* risograph inks (technique from w00): the scale objects are printed in
       two spot inks, amber (a) and indigo (b). Each ink is one group with a grain
       filter in screen space and a slight misregistration; the shapes inside sit
       in metres, so the halftone patterns are rescaled when the zoom changes. */
    var INKS = { a: { col: C.dopa, ang: 15 }, b: { col: C.pausa, ang: 75 } }, defsH = '';
    OV.pats = [];
    ['a', 'b'].forEach(function (k, li) {
      [0.62, 0.92, 1.2].forEach(function (r, j) {
        defsH += '<pattern id="w02b-' + k + 'h' + (j + 1) + '" width="2.8" height="2.8" patternUnits="userSpaceOnUse" patternTransform="rotate(' + INKS[k].ang + ')">' +
          '<circle cx="1.4" cy="1.4" r="' + r + '" fill="' + INKS[k].col + '"/></pattern>';
      });
      defsH += '<filter id="w02b-' + k + 'g" x="-3%" y="-3%" width="106%" height="106%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="' + (li ? 211 : 47) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="' + (li ? 563 : 389) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.6" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
    });
    S('defs', null, ov).innerHTML = defsH;
    OV.pats = Array.prototype.slice.call(ov.querySelectorAll('pattern'));
    OV.patK = 0;
    OV.ink = {}; OV.objsL = [];
    ['a', 'b'].forEach(function (k, li) {
      var g = S('g', { class: 'w02b-ink w02b-ink-' + k, filter: 'url(#w02b-' + k + 'g)', transform: li ? 'translate(-0.9 0.8)' : 'translate(0.6 -0.5)' }, ov);
      OV.ink[k] = S('g', { class: 'w02b-objs' }, g);
      OV.objsL.push(OV.ink[k]);
    });
    function tk(v, k) { return v.replace(/\$0/g, INKS[k].col).replace(/\$p/g, '#fff').replace(/\$([123])/g, 'url(#w02b-' + k + 'h$1)'); }
    /* style per role: [ink, fill, stroke, stroke width] */
    var ROLE = {
      'w02b-cb': ['b', '$1', '$0', 1.4], 'w02b-cw': ['b', '$3', null, 0], 'w02b-cd': ['b', 'none', '$0', 1.1],
      'w02b-cl': ['b', 'none', '$0', 0.8], 'w02b-ct': ['b', '$0', null, 0], rim: ['b', '$p', null, 0], hub: ['b', '$0', null, 0],
      lt: ['a', '$0', null, 0], 'w02b-tt': ['a', '$0', null, 0], chair: ['a', '$2', null, 0], bar: ['a', 'none', '$0', 1.6],
      per: ['b', '$2', '$0', 1.3]
    };
    function pair(cls) { return { a: S('g', { class: cls }, OV.ink.a), b: S('g', { class: cls }, OV.ink.b) }; }
    function styled(tag, attrs, role, parent) {
      var R = ROLE[role], k = R[0];
      attrs.fill = tk(R[1], k);
      if (R[2]) { attrs.stroke = tk(R[2], k); attrs['stroke-width'] = R[3]; attrs['vector-effect'] = 'non-scaling-stroke'; attrs['stroke-linejoin'] = 'round'; attrs['stroke-linecap'] = 'round'; }
      return S(tag, attrs, parent[k]);
    }
    function pa(d, cls, parent) { return styled('path', { d: d }, cls, parent); }
    function ci(cx, cy, r, cls, parent) { return styled('circle', { cx: cx, cy: cy, r: r }, cls, parent); }
    function arcTo(cx, cy, r, a0, a1, n) {
      var s = '';
      for (var j = 1; j <= n; j++) { var a = a0 + (a1 - a0) * j / n; s += ' L' + f3(cx + r * Math.cos(a)) + ' ' + f3(cy + r * Math.sin(a)); }
      return s;
    }

    /* car, 4.5 m mid-size sedan in side profile, nose to the right (metres, y up).
       Wheelbase 2.65 m, front overhang 0.90 m, rear 0.95 m, roof 1.45 m, tyres 0.62 m. */
    var car = pair('w02b-car');
    var WR = 0.95, WF = 3.6, WY = 0.31, AR = 0.385, AY = 0.25;
    var aOff = Math.asin((AY - WY) / AR);
    var body = smoothPath([
      [0.12, AY, 1], [0.04, 0.33], [0.015, 0.52], [0.025, 0.78], [0.07, 0.93], [0.3, 0.99], [0.82, 1.02, 1],
      [1.2, 1.23], [1.62, 1.41], [2.1, 1.455], [2.62, 1.44], [2.98, 1.35], [3.3, 1.15], [3.52, 1.01, 1],
      [3.95, 0.95], [4.32, 0.87], [4.47, 0.75], [4.5, 0.55], [4.48, 0.34], [4.4, AY, 1]
    ]);
    body += ' L' + f3(WF + AR * Math.cos(aOff)) + ' ' + AY + arcTo(WF, WY, AR, aOff, Math.PI - aOff, 24);
    body += ' L' + f3(WR + AR * Math.cos(aOff)) + ' ' + AY + arcTo(WR, WY, AR, aOff, Math.PI - aOff, 24) + ' Z';
    pa(body, 'w02b-cb', car);
    /* glasshouse: rear and front side windows split by the B pillar */
    pa(smoothPath([[1.3, 1.065, 1], [1.45, 1.22], [1.66, 1.36], [2.0, 1.395], [2.27, 1.398, 1], [2.27, 1.065, 1]], true), 'w02b-cw', car);
    pa(smoothPath([[2.39, 1.065, 1], [2.39, 1.398, 1], [2.62, 1.388], [2.88, 1.32], [3.12, 1.19], [3.34, 1.065, 1]], true), 'w02b-cw', car);
    /* doors, handles, mirror, sill, shoulder line */
    pa('M2.33 1.03 L2.33 0.31', 'w02b-cd', car);
    pa(smoothPath([[3.4, 1.03, 1], [3.42, 0.84], [3.37, 0.68], [3.27, 0.58, 1]]), 'w02b-cd', car);
    pa(smoothPath([[1.27, 1.03, 1], [1.33, 0.84], [1.34, 0.66], [1.31, 0.53, 1]]), 'w02b-cd', car);
    pa('M1.32 0.31 L3.23 0.31', 'w02b-cd', car);
    pa('M2.04 0.88 L2.2 0.88 M3.06 0.88 L3.22 0.88', 'w02b-cd', car);
    pa(smoothPath([[3.37, 1.075, 1], [3.5, 1.095, 1], [3.49, 1.155, 1], [3.38, 1.165], [3.35, 1.12]], true), 'w02b-cd', car);
    pa(smoothPath([[0.04, 0.8, 1], [1.5, 0.83], [3, 0.835], [4.44, 0.81, 1]]), 'w02b-cl', car);
    /* lights and bumper seams */
    pa(smoothPath([[4.22, 0.86, 1], [4.4, 0.83], [4.475, 0.77, 1], [4.3, 0.765, 1]], true), 'lt', car);
    pa(smoothPath([[0.045, 0.925, 1], [0.24, 0.965, 1], [0.24, 0.9, 1], [0.03, 0.865, 1]], true), 'lt', car);
    pa('M4.495 0.5 L3.98 0.5 M0.02 0.5 L0.57 0.5', 'w02b-cl', car);
    /* wheels: tyre, rim, hub */
    [WR, WF].forEach(function (cx) { ci(cx, WY, 0.31, 'w02b-ct', car); ci(cx, WY, 0.2, 'rim', car); ci(cx, WY, 0.07, 'hub', car); });

    /* dining table, 2 m long and 0.75 m tall, with two chairs pushed in at the ends */
    var tab = pair('w02b-tab');
    function chair(sx) {
      var X = function (x) { return f3(sx > 0 ? x : 2 - x); };
      var g = tab;
      pa('M' + X(0.16) + ' 0 L' + X(0.195) + ' 0 L' + X(0.2) + ' 0.44 L' + X(0.165) + ' 0.92 L' + X(0.13) + ' 0.92 L' + X(0.165) + ' 0.44 Z', 'chair', g);
      pa('M' + X(0.18) + ' 0.43 L' + X(0.6) + ' 0.43 L' + X(0.6) + ' 0.465 L' + X(0.18) + ' 0.465 Z', 'chair', g);
      pa('M' + X(0.555) + ' 0 L' + X(0.585) + ' 0 L' + X(0.585) + ' 0.43 L' + X(0.555) + ' 0.43 Z', 'chair', g);
      pa('M' + X(0.19) + ' 0.16 L' + X(0.555) + ' 0.16', 'bar', g);
    }
    chair(1); chair(-1);
    pa('M0 0.715 L2 0.715 L2 0.755 L0 0.755 Z', 'w02b-tt', tab);
    pa('M0.07 0.715 L1.93 0.715 L1.93 0.625 L0.07 0.625 Z', 'w02b-tt', tab);
    pa('M0.07 0.625 L0.13 0.625 L0.12 0 L0.08 0 Z M1.87 0.625 L1.93 0.625 L1.92 0 L1.88 0 Z', 'w02b-tt', tab);

    /* person, 1.70 m, standing left of the start, weight on one leg, arms relaxed */
    var per = pair('w02b-per');
    var PX = -0.36;
    var R = [ /* right half, from the neck down to the crotch, x from the midline */
      [0.035, 1.52, 1], [0.045, 1.44], [0.09, 1.41], [0.17, 1.39], [0.212, 1.35], [0.226, 1.25], [0.234, 1.06],
      [0.244, 0.9], [0.25, 0.8], [0.252, 0.74], [0.238, 0.7], [0.218, 0.695], [0.202, 0.72], [0.2, 0.86], [0.192, 1.06],
      [0.172, 1.22, 1], [0.152, 1.12], [0.142, 1.02], [0.158, 0.9], [0.163, 0.78], [0.14, 0.6], [0.118, 0.47],
      [0.12, 0.36], [0.098, 0.2], [0.084, 0.09], [0.096, 0.045], [0.104, 0.012], [0.095, 0, 1], [0.042, 0, 1],
      [0.044, 0.085], [0.05, 0.22], [0.055, 0.36], [0.05, 0.48], [0.035, 0.62], [0.012, 0.78, 1]
    ];
    var Lh = R.slice().reverse().map(function (p) {
      var lean = p[1] < 0.8 ? (0.8 - p[1]) * 0.055 : 0; /* relaxed leg, slightly out */
      return [-p[0] - lean, p[1] + (p[1] < 0.5 ? 0 : 0), p[2]];
    });
    var outline = R.map(function (p) { return [PX + p[0], p[1], p[2]]; })
      .concat([[PX, 0.8, 1]])
      .concat(Lh.map(function (p) { return [PX + p[0], p[1], p[2]]; }));
    pa(smoothPath(outline, true), 'per', per);
    var HD = [[0, 1.7], [0.055, 1.688], [0.079, 1.638], [0.079, 1.585], [0.068, 1.53], [0.04, 1.488], [0, 1.476]];
    pa(smoothPath(HD.concat(HD.slice(1, -1).reverse().map(function (p) { return [-p[0], p[1]]; }))
      .map(function (p) { return [PX + p[0], p[1]]; }), true), 'per', per);
    var arc = 'M' + PX + ' 1.7 L0 1.7';
    for (var i = 1; i <= 40; i++) { var t = i / 40 * Math.PI / 2; arc += ' L' + (1.7 * Math.sin(t)).toFixed(4) + ' ' + (1.7 * Math.cos(t)).toFixed(4); }
    OV.arcG = S('g', { class: 'w02b-objs w02b-arcg' }, ov);
    OV.objsL.push(OV.arcG);
    OV.arc = S('path', { d: arc, class: 'w02b-arc', 'vector-effect': 'non-scaling-stroke' }, OV.arcG);
    OV.car = car; OV.tab = tab; OV.per = per;

    OV.tk = S('g', { class: 'w02b-ticks' }, ov);
    OV.ticks = [];
    for (var m = 0; m <= 4; m++) OV.ticks.push(S('line', { class: 'w02b-tick' }, OV.tk));
    OV.marks = [
      { m: 0.467, row: 2, key: 'rat' }, { m: 1.7, row: 1, key: 'per' }, { m: 2.0, row: 0, key: 'tab' }, { m: 4.5, row: 3, key: 'car', end: true }
    ].map(function (o) {
      o.ln = S('line', { class: 'w02b-mk' }, OV.tk);
      o.tx = S('text', { class: 'w02b-mkt' + (o.end ? ' end' : '') }, OV.tk);
      return o;
    });
    OV.tip = S('text', { class: 'w02b-tip' }, ov);
    OV.tipDot = S('circle', { r: 3, class: 'w02b-tipdot' }, ov);
    relabelOverlay();
  }
  function relabelOverlay() {
    if (!OV.lStri) return;
    OV.lStri.textContent = L('estriado', 'striatum');
    OV.lSoma.textContent = L('corpo celular', 'cell body');
    OV.lAx.textContent = L('um só axônio', 'one single axon');
    var txt = {
      rat: L('axônio de rato · ', 'rat axon · ') + DN.fmt(46.7, 1) + ' cm',
      per: L('uma pessoa · ', 'a person · ') + DN.fmt(1.7, 2) + ' m',
      tab: L('mesa de jantar · 2 m', 'dining table · 2 m'),
      car: L('carro médio · ', 'midsize car · ') + DN.fmt(4.5, 1) + ' m'
    };
    OV.marks.forEach(function (o) { o.tx.textContent = txt[o.key]; });
  }

  /* project helper set per mode: P(x,y,z) -> [sx, sy] */
  var P = null;
  function rotY(x, z, a) { var c = Math.cos(a), s = Math.sin(a); return [c * x + s * z, -s * x + c * z]; }
  function tangledWorld(v) { var r = rotY(v[0], v[2], ang); return [r[0], v[1], r[1]]; }

  function updOverlay() {
    if (!P || !OV.tg) return;
    var u = Ushown, k = camK(u);
    /* labels in the tangle state */
    var tOp = 1 - smooth(u / 0.12);
    OV.tg.style.opacity = tOp;
    if (tOp > 0.01) {
      var sp = P.apply(null, tangledWorld([-0.3, 1.38, -0.05]));
      OV.lStri.setAttribute('x', sp[0]); OV.lStri.setAttribute('y', sp[1]);
      var w0 = wOf(0, u), sw = tangledWorld(SOMA);
      var so = P(DN.lerp(sw[0], X0, w0), DN.lerp(sw[1], Y0, w0), DN.lerp(sw[2], 0, w0));
      var sRight = so[0] < 120, lx = sRight ? so[0] + 18 : so[0] - 18, ly = so[1] + 22;
      OV.lSoma.setAttribute('x', lx); OV.lSoma.setAttribute('y', ly + 4); OV.lSoma.setAttribute('text-anchor', sRight ? 'start' : 'end');
      OV.lSomaLn.setAttribute('x1', sRight ? lx - 3 : lx + 3); OV.lSomaLn.setAttribute('y1', ly); OV.lSomaLn.setAttribute('x2', so[0] + (sRight ? 5 : -5)); OV.lSomaLn.setAttribute('y2', so[1] + 4);
      var tc = tangledWorld(TER.c), ap = P(tc[0], tc[1], tc[2]);
      var ed = P(tc[0], tc[1] + TER.r[1], tc[2]), rpx = Math.abs(ap[1] - ed[1]) * 1.25;
      var ax = ap[0] + rpx + 22, ay = ap[1] - rpx * 0.35, anc = 'start';
      if (ax > W - 110) { ax = ap[0] - rpx - 22; anc = 'end'; }
      OV.lAx.setAttribute('x', ax); OV.lAx.setAttribute('y', ay + 4); OV.lAx.setAttribute('text-anchor', anc);
      OV.lAxLn.setAttribute('x1', anc === 'start' ? ax - 4 : ax + 4); OV.lAxLn.setAttribute('y1', ay); OV.lAxLn.setAttribute('x2', ap[0] + (anc === 'start' ? rpx * 0.55 : -rpx * 0.55)); OV.lAxLn.setAttribute('y2', ap[1] - rpx * 0.15);
    }
    /* scale objects in the straight state */
    var sOp = smooth((u - 0.06) / 0.08);
    var o = P(X0, Y0, 0), ex = P(X0 + UPM, Y0, 0), ey = P(X0, Y0 + UPM, 0);
    var m = [ex[0] - o[0], ex[1] - o[1], ey[0] - o[0], ey[1] - o[1], o[0], o[1]].map(function (v) { return v.toFixed(2); });
    var mt = 'matrix(' + m.join(',') + ')';
    if (OV.lastM !== mt) {
      OV.lastM = mt;
      OV.objsL.forEach(function (g) { g.setAttribute('transform', mt); });
      /* keep the halftone screen at 2.8 px whatever the zoom */
      var pk = 1 / Math.max(1e-3, Math.hypot(ex[0] - o[0], ex[1] - o[1]));
      if (Math.abs(pk - OV.patK) / pk > 0.01) {
        OV.patK = pk;
        OV.pats.forEach(function (pt, i) { pt.setAttribute('patternTransform', 'scale(' + pk.toFixed(5) + ') rotate(' + (i < 3 ? 15 : 75) + ')'); });
      }
    }
    var len = u * LEN_M;
    function op(th) { return smooth((len - th + 0.12) / 0.3) * sOp; }
    var oP = op(1.7).toFixed(3), oT = op(2.0).toFixed(3), oC = op(4.32).toFixed(3);
    [[OV.per, oP], [OV.tab, oT], [OV.car, oC]].forEach(function (q) {
      if (q[0].last !== q[1]) { q[0].last = q[1]; q[0].a.style.opacity = q[1]; q[0].b.style.opacity = q[1]; }
    });
    OV.arcG.style.opacity = oP;
    var anyOn = (+oP + +oT + +oC) > 0;
    OV.ink.a.parentNode.style.display = OV.ink.b.parentNode.style.display = anyOn ? '' : 'none';
    OV.tk.style.opacity = sOp;
    var pxm = ex[0] - o[0], pym = ex[1] - o[1];
    OV.ticks.forEach(function (t, i) {
      var x = o[0] + pxm * i, y = o[1] + pym * i;
      t.setAttribute('x1', x); t.setAttribute('x2', x); t.setAttribute('y1', y - 4); t.setAttribute('y2', y + 4);
      t.style.opacity = len >= i - 0.01 ? 1 : 0.25;
    });
    var fs = W < 520 ? 10 : 11, rowH = fs + 5;
    OV.marks.forEach(function (mk) {
      var x = o[0] + pxm * mk.m, y = o[1] + pym * mk.m;
      var yy = y + 18 + mk.row * rowH;
      mk.ln.setAttribute('x1', x); mk.ln.setAttribute('x2', x); mk.ln.setAttribute('y1', y + 2); mk.ln.setAttribute('y2', yy - fs + 2);
      mk.tx.setAttribute('x', mk.end ? x : x - 2); mk.tx.setAttribute('y', yy);
      var on = smooth((len - mk.m + (mk.end ? 0.2 : 0.06)) / 0.2);
      mk.ln.style.opacity = on; mk.tx.style.opacity = on;
    });
    var tp = P(X0 + u * LEN_M * UPM, Y0, 0);
    var tOn = smooth((u - 0.02) / 0.05);
    OV.tip.setAttribute('x', tp[0]); OV.tip.setAttribute('y', tp[1] - 12);
    OV.tip.setAttribute('text-anchor', tp[0] > W - 40 ? 'end' : 'middle');
    OV.tip.textContent = DN.fmt(len, 2) + ' m';
    OV.tip.style.opacity = tOn * (u > 0.995 ? 0 : 1);
    OV.tipDot.setAttribute('cx', tp[0]); OV.tipDot.setAttribute('cy', tp[1]); OV.tipDot.style.opacity = tOn;
    hint.style.opacity = (everDragged || u > 0.02) ? 0 : 1;
  }

  /* ---------------- 3D (Three.js) ---------------- */
  var G = {};
  var VS_L = [
    'uniform float uU; uniform float uAng; uniform float uSig; uniform float uNear; uniform float uFar; uniform float uWave;',
    'attribute vec3 aStr; attribute float aA; attribute float aD;',
    'varying float vAl; varying float vHot;',
    'void main(){',
    ' float w = clamp((uU*(1.0+uSig) - aA)/uSig, 0.0, 1.0); w = w*w*(3.0-2.0*w);',
    ' float c = cos(uAng), s = sin(uAng);',
    ' vec3 tp = vec3(c*position.x + s*position.z, position.y, -s*position.x + c*position.z);',
    ' vec4 mv = modelViewMatrix * vec4(mix(tp, aStr, w), 1.0);',
    ' gl_Position = projectionMatrix * mv;',
    ' float dz = clamp((-mv.z - uNear)/(uFar - uNear), 0.0, 1.0);',
    ' vAl = mix(mix(0.78, 0.16, dz), 0.92, w);',
    ' float dw = aD - uWave; vHot = exp(-dw*dw/0.0009);',
    '}'].join('\n');
  var FS_L = [
    'uniform vec3 uInk; uniform vec3 uDopa;',
    'varying float vAl; varying float vHot;',
    'void main(){ gl_FragColor = vec4(mix(uInk, uDopa, vHot), max(vAl, vHot*0.95)); }'].join('\n');
  var VS_P = [
    'uniform float uU; uniform float uAng; uniform float uSig; uniform float uWave; uniform float uPx;',
    'attribute vec3 aStr; attribute float aA; attribute float aD;',
    'varying float vHot;',
    'void main(){',
    ' float w = clamp((uU*(1.0+uSig) - aA)/uSig, 0.0, 1.0); w = w*w*(3.0-2.0*w);',
    ' float c = cos(uAng), s = sin(uAng);',
    ' vec3 tp = vec3(c*position.x + s*position.z, position.y, -s*position.x + c*position.z);',
    ' vec4 mv = modelViewMatrix * vec4(mix(tp, aStr, w), 1.0);',
    ' gl_Position = projectionMatrix * mv;',
    ' float dw = aD - uWave; vHot = exp(-dw*dw/0.0012);',
    ' gl_PointSize = uPx * (2.0 + 2.6*vHot);',
    '}'].join('\n');
  var FS_P = [
    'uniform vec3 uDopa;',
    'varying float vHot;',
    'void main(){ vec2 q = gl_PointCoord - 0.5; float r = length(q); if (r > 0.5) discard;',
    ' gl_FragColor = vec4(uDopa, (0.8 + 0.2*vHot) * smoothstep(0.5, 0.3, r)); }'].join('\n');
  var VS_S = [
    'varying vec3 vN; varying vec3 vV;',
    'void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }'].join('\n');
  var FS_S = [
    'uniform vec3 uCol; uniform float uOp;',
    'varying vec3 vN; varying vec3 vV;',
    'void main(){ float f = 1.0 - abs(dot(normalize(vN), normalize(vV)));',
    ' float a = (smoothstep(0.45, 1.0, f) * 0.34 + 0.012) * uOp; gl_FragColor = vec4(uCol, a); }'].join('\n');

  function v3(THREE, hex) { var n = parseInt(hex.slice(1), 16); return new THREE.Vector3((n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255); }

  function init3D(THREE) {
    var cv = el('canvas', { class: 'w02b-cv' }, null);
    stage.insertBefore(cv, stage.firstChild);
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: false, powerPreference: 'default' });
    } catch (e) { cv.remove(); throw e; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0xffffff, 1);
    var scene = new THREE.Scene();
    var cam = new THREE.PerspectiveCamera(FOV, 1, 0.05, 200);
    var ink = v3(THREE, C.ink), dopa = v3(THREE, C.dopa);

    var uni = {
      uU: { value: 0 }, uAng: { value: ang }, uSig: { value: SIG }, uNear: { value: 4 }, uFar: { value: 9 },
      uWave: { value: -1 }, uInk: { value: ink }, uDopa: { value: dopa }, uPx: { value: renderer.getPixelRatio() }
    };
    var g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(data.tang, 3));
    g.setAttribute('aStr', new THREE.BufferAttribute(data.str, 3));
    g.setAttribute('aA', new THREE.BufferAttribute(data.a, 1));
    g.setAttribute('aD', new THREE.BufferAttribute(data.d, 1));
    var lines = new THREE.LineSegments(g, new THREE.ShaderMaterial({ uniforms: uni, vertexShader: VS_L, fragmentShader: FS_L, transparent: true, depthWrite: false }));
    lines.frustumCulled = false; lines.renderOrder = 2; scene.add(lines);

    var gp = new THREE.BufferGeometry();
    gp.setAttribute('position', new THREE.BufferAttribute(data.bt, 3));
    gp.setAttribute('aStr', new THREE.BufferAttribute(data.bs, 3));
    gp.setAttribute('aA', new THREE.BufferAttribute(data.ba, 1));
    gp.setAttribute('aD', new THREE.BufferAttribute(data.bd, 1));
    var pts = new THREE.Points(gp, new THREE.ShaderMaterial({ uniforms: uni, vertexShader: VS_P, fragmentShader: FS_P, transparent: true, depthWrite: false }));
    pts.frustumCulled = false; pts.renderOrder = 3; scene.add(pts);

    /* striatum */
    var sUni = { uCol: { value: v3(THREE, '#5d5a52') }, uOp: { value: 1 } };
    var sMat = new THREE.ShaderMaterial({ uniforms: sUni, vertexShader: VS_S, fragmentShader: FS_S, transparent: true, depthWrite: false, side: THREE.FrontSide });
    var stri = new THREE.Group(); stri.renderOrder = 1;
    var curve = new THREE.CatmullRomCurve3(CAUD.map(function (p) { return new THREE.Vector3(p[0], p[1], p[2]); }), false, 'centripetal');
    var TS = 90, RS = 28;
    var tube = new THREE.TubeGeometry(curve, TS, 1, RS, false);
    var pos = tube.attributes.position;
    for (var i = 0; i <= TS; i++) {
      var t = i / TS, c = curve.getPointAt(t), r = caudR(t);
      for (var j = 0; j <= RS; j++) {
        var idx = i * (RS + 1) + j;
        pos.setXYZ(idx, c.x + (pos.getX(idx) - c.x) * r, c.y + (pos.getY(idx) - c.y) * r, c.z + (pos.getZ(idx) - c.z) * r);
      }
    }
    tube.computeVertexNormals();
    var m1 = new THREE.Mesh(tube, sMat); m1.renderOrder = 1; stri.add(m1);
    var sph = new THREE.SphereGeometry(1, 56, 36), sp = sph.attributes.position;
    for (i = 0; i < sp.count; i++) {
      var x = sp.getX(i), y = sp.getY(i), z = sp.getZ(i), dfm = putDeform(x, y, z);
      sp.setXYZ(i, PUT.c[0] + x * PUT.r[0] * dfm, PUT.c[1] + y * PUT.r[1] * dfm, PUT.c[2] + z * PUT.r[2] * dfm);
    }
    sph.computeVertexNormals();
    var m2 = new THREE.Mesh(sph, sMat); m2.renderOrder = 1; stri.add(m2);
    scene.add(stri);

    var soma = new THREE.Mesh(new THREE.SphereGeometry(0.065, 20, 14), new THREE.MeshBasicMaterial({ color: C.dopa }));
    soma.renderOrder = 4; scene.add(soma);

    G = { THREE: THREE, renderer: renderer, scene: scene, cam: cam, uni: uni, sUni: sUni, stri: stri, soma: soma, cv: cv };
    var tmp = new THREE.Vector3();
    P = function (x, y, z) { tmp.set(x, y, z).project(cam); return [(tmp.x + 1) / 2 * W, (1 - tmp.y) / 2 * H]; };
    renderer.domElement.addEventListener('webglcontextlost', function (e) { e.preventDefault(); fallback2D(); });
    mode = '3d';
    resize();
  }

  function render3D(now) {
    var cs = camState(Ushown);
    G.cam.position.set(cs.ex, cs.ey, cs.ez); G.cam.lookAt(cs.tx, cs.ty, cs.tz); G.cam.updateMatrixWorld();
    G.uni.uU.value = Ushown; G.uni.uAng.value = ang;
    G.uni.uNear.value = cs.D - 2.2; G.uni.uFar.value = cs.D + 2.2;
    G.uni.uWave.value = waveAt(now);
    G.stri.rotation.y = ang;
    G.sUni.uOp.value = 1 - smooth((Ushown - 0.05) / 0.5);
    G.stri.visible = G.sUni.uOp.value > 0.003;
    var w0 = wOf(0, Ushown), sw = tangledWorld(SOMA);
    G.soma.position.set(DN.lerp(sw[0], X0, w0), DN.lerp(sw[1], Y0, w0), DN.lerp(sw[2], 0, w0));
    G.renderer.render(G.scene, G.cam);
  }

  function waveAt(now) {
    if (RM) return -1;
    var ph = ((now - t0) / 1000) % 4.2;
    return ph < 2.4 ? ph / 2.2 - 0.04 : -1;
  }

  /* ---------------- 2D fallback ---------------- */
  var C2 = null;
  function init2D() {
    var cv = el('canvas', { class: 'w02b-cv' }, null);
    stage.insertBefore(cv, stage.firstChild);
    C2 = { cv: cv, ctx: null, buf: new Float32Array(data.nV * 3), bbuf: new Float32Array(data.nB * 2) };
    /* striatum spine samples for the soft 2D body */
    var sp = [], N = 40;
    function cr(p0, p1, p2, p3, t) {
      var t2 = t * t, t3 = t2 * t;
      return [0, 1, 2].map(function (k) { return 0.5 * ((2 * p1[k]) + (-p0[k] + p2[k]) * t + (2 * p0[k] - 5 * p1[k] + 4 * p2[k] - p3[k]) * t2 + (-p0[k] + 3 * p1[k] - 3 * p2[k] + p3[k]) * t3); });
    }
    for (var i = 0; i <= N; i++) {
      var tt = i / N * (CAUD.length - 1), s = Math.min(CAUD.length - 2, Math.floor(tt)), f = tt - s;
      var p = cr(CAUD[Math.max(0, s - 1)], CAUD[s], CAUD[s + 1], CAUD[Math.min(CAUD.length - 1, s + 2)], f);
      sp.push({ p: p, r: caudR(i / N) });
    }
    C2.spine = sp;
    P = proj2;
    mode = '2d';
    resize();
  }
  var V2 = { s: 1, cx: 0, cy: 0, th: 0, ph: 0, tx: 0, ty: 0, tz: 0 };
  function setView2() {
    var u = Ushown, k = camK(u), f = frames();
    var tn = Math.tan(FOV * Math.PI / 360);
    var s0 = (H / 2) / (f.D0 * tn), s1 = (H / 2) / (f.D1 * tn);
    V2.s = Math.exp(DN.lerp(Math.log(s0), Math.log(s1), k));
    V2.tx = DN.lerp(f.t0[0], f.t1[0], k); V2.ty = DN.lerp(f.t0[1], f.t1[1], k); V2.tz = DN.lerp(f.t0[2], f.t1[2], k);
    V2.th = uTheta * (1 - k); V2.ph = uPhi * (1 - k);
  }
  function proj2(x, y, z) {
    x -= V2.tx; y -= V2.ty; z -= V2.tz;
    var c = Math.cos(-V2.th), s = Math.sin(-V2.th);
    var x1 = c * x + s * z, z1 = -s * x + c * z;
    var cp = Math.cos(V2.ph), spn = Math.sin(V2.ph);
    var y2 = cp * y - spn * z1;
    return [W / 2 + x1 * V2.s, H / 2 - y2 * V2.s];
  }
  function depth2(x, y, z) {
    x -= V2.tx; z -= V2.tz; y -= V2.ty;
    var c = Math.cos(-V2.th), s = Math.sin(-V2.th);
    var z1 = -s * x + c * z;
    return Math.sin(V2.ph) * y + Math.cos(V2.ph) * z1;
  }
  function render2D(now) {
    setView2();
    var ctx = C2.ctx; if (!ctx) return;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
    var u = Ushown, sOp = 1 - smooth((u - 0.05) / 0.5);
    if (sOp > 0.01) {
      ctx.save(); ctx.globalAlpha = 0.07 * sOp; ctx.fillStyle = '#5d5a52';
      ctx.beginPath();
      C2.spine.forEach(function (q) {
        var w = tangledWorld(q.p), pp = proj2(w[0], w[1], w[2]);
        ctx.moveTo(pp[0] + q.r * V2.s, pp[1]); ctx.arc(pp[0], pp[1], q.r * V2.s, 0, Math.PI * 2);
      });
      ctx.fill();
      ctx.beginPath();
      var pc = tangledWorld(PUT.c), pp2 = proj2(pc[0], pc[1], pc[2]);
      var rx = Math.hypot(PUT.r[0] * Math.cos(ang), PUT.r[2] * Math.sin(ang));
      ctx.ellipse(pp2[0], pp2[1], rx * V2.s, PUT.r[1] * V2.s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 0.28 * sOp; ctx.strokeStyle = '#5d5a52'; ctx.lineWidth = 0.8; ctx.stroke();
      ctx.restore();
    }
    var T = data.tang, S = data.str, A = data.a, buf = C2.buf, n = data.nV, i, wv = waveAt(now);
    var zmin = 1e9, zmax = -1e9, Z = C2.z || (C2.z = new Float32Array(n));
    for (i = 0; i < n; i++) {
      var w = wOf(A[i], u), t3 = 3 * i;
      var r = rotY(T[t3], T[t3 + 2], ang);
      var x = DN.lerp(r[0], S[t3], w), y = DN.lerp(T[t3 + 1], S[t3 + 1], w), z = DN.lerp(r[1], S[t3 + 2], w);
      var pp = proj2(x, y, z); buf[t3] = pp[0]; buf[t3 + 1] = pp[1];
      var dz = depth2(x, y, z); Z[i] = dz; if (dz < zmin) zmin = dz; if (dz > zmax) zmax = dz;
    }
    var bands = 3, straightA = 0.85;
    ctx.lineWidth = W < 520 ? 0.6 : 0.7;
    for (var b = 0; b < bands; b++) {
      ctx.beginPath();
      var lo = zmin + (zmax - zmin) * b / bands, hi = zmin + (zmax - zmin) * (b + 1) / bands + (b === bands - 1 ? 1 : 0);
      for (i = 0; i < n; i += 2) {
        var zz = Z[i]; if (zz < lo || zz >= hi) continue;
        ctx.moveTo(buf[3 * i], buf[3 * i + 1]); ctx.lineTo(buf[3 * i + 3], buf[3 * i + 4]);
      }
      var al = DN.lerp(0.2 + 0.55 * (b / (bands - 1)), straightA, smooth(u / 0.6));
      ctx.strokeStyle = 'rgba(20,20,20,' + al.toFixed(3) + ')'; ctx.stroke();
    }
    /* boutons */
    ctx.fillStyle = C.dopa;
    var BT = data.bt, BS = data.bs, BA = data.ba, BD = data.bd, rr = W < 520 ? 1.6 : 1.9;
    for (i = 0; i < data.nB; i++) {
      var w2 = wOf(BA[i], u), q3 = 3 * i, r2 = rotY(BT[q3], BT[q3 + 2], ang);
      var p2 = proj2(DN.lerp(r2[0], BS[q3], w2), DN.lerp(BT[q3 + 1], BS[q3 + 1], w2), DN.lerp(r2[1], BS[q3 + 2], w2));
      var hot = wv < 0 ? 0 : Math.exp(-Math.pow(BD[i] - wv, 2) / 0.0012), sz = rr * (1 + hot * 1.2);
      ctx.globalAlpha = 0.8 + 0.2 * hot;
      ctx.fillRect(p2[0] - sz / 2, p2[1] - sz / 2, sz, sz);
    }
    ctx.globalAlpha = 1;
    var w0 = wOf(0, u), sw = tangledWorld(SOMA);
    var so = proj2(DN.lerp(sw[0], X0, w0), DN.lerp(sw[1], Y0, w0), DN.lerp(sw[2], 0, w0));
    ctx.beginPath(); ctx.arc(so[0], so[1], Math.max(3.5, 0.065 * V2.s), 0, Math.PI * 2); ctx.fill();
  }

  function fallback2D() {
    if (mode === '2d') return;
    if (G.cv) { try { G.renderer.dispose(); } catch (e) {} G.cv.remove(); }
    G = {}; init2D(); needsDraw = true; kick();
  }

  /* ---------------- sizing, loop ---------------- */
  function resize() {
    if (stage.hidden) return;
    var r = stage.getBoundingClientRect();
    W = Math.max(200, Math.round(r.width)); H = Math.max(200, Math.round(r.height));
    ov.setAttribute('viewBox', '0 0 ' + W + ' ' + H); ov.setAttribute('width', W); ov.setAttribute('height', H);
    if (mode === '3d') {
      G.renderer.setSize(W, H, false); G.cam.aspect = W / H; G.cam.updateProjectionMatrix();
      G.cv.style.width = '100%'; G.cv.style.height = '100%';
    } else if (mode === '2d') {
      var f = DN.fitCanvas(C2.cv, H); C2.ctx = f.ctx;
    }
    needsDraw = true; kick();
  }
  var rT = 0;
  if ('ResizeObserver' in window) new ResizeObserver(function () { clearTimeout(rT); rT = setTimeout(resize, 120); }).observe(stage);
  else window.addEventListener('resize', function () { clearTimeout(rT); rT = setTimeout(resize, 120); });

  function animating() { return !RM && !showChart; }
  function tick(now) {
    raf = 0;
    if (!mode || !visible || showChart) return;
    var dt = Math.min(0.05, (now - (lastT || now)) / 1000); lastT = now;
    var moving = false;
    if (Math.abs(U - Ushown) > 0.0005) { Ushown += (U - Ushown) * Math.min(1, dt * 12); moving = true; } else Ushown = U;
    if (!dragging && (Math.abs(vTh) > 1e-4 || Math.abs(vPh) > 1e-4)) {
      uTheta += vTh; uPhi = DN.clamp(uPhi + vPh, -1.1, 1.1); vTh *= 0.92; vPh *= 0.92; moving = true;
    }
    if (animating()) { ang += dt * 0.14 * (1 - camK(Ushown)); moving = true; }
    if (moving || needsDraw || dragging) {
      if (mode === '3d') render3D(now); else render2D(now);
      updOverlay();
      needsDraw = false;
    }
    if (animating() || moving || dragging) raf = requestAnimationFrame(tick);
  }
  function kick() { if (!raf && visible && mode) { lastT = 0; raf = requestAnimationFrame(tick); } }

  /* drag to orbit */
  var px = 0, py = 0, lastMove = 0;
  stage.addEventListener('pointerdown', function (e) {
    if (!mode) return;
    dragging = true; px = e.clientX; py = e.clientY; vTh = vPh = 0;
    try { stage.setPointerCapture(e.pointerId); } catch (er) {}
    kick();
  });
  stage.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    var dx = e.clientX - px, dy = e.clientY - py; px = e.clientX; py = e.clientY;
    vTh = -dx * 0.008; vPh = dy * 0.006;
    uTheta += vTh; uPhi = DN.clamp(uPhi + vPh, -1.1, 1.1);
    if (Math.abs(dx) + Math.abs(dy) > 2) { everDragged = true; }
    lastMove = performance.now(); needsDraw = true; kick();
  });
  function endDrag() { if (!dragging) return; dragging = false; if (performance.now() - lastMove > 80) vTh = vPh = 0; kick(); }
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);

  /* ---------------- controls ---------------- */
  function setU(u, fromStep) {
    U = DN.clamp(u, 0, 1);
    if (RM || fromStep) Ushown = U;
    slider.value = (U * 100).toFixed(1);
    stepBtns.forEach(function (b, i) { b.setAttribute('aria-pressed', Math.abs([0, 0.5, 1][i] - U) < 0.01 ? 'true' : 'false'); });
    relabelSlider(); milestones(); needsDraw = true; kick();
  }
  slider.addEventListener('input', function () { setU(+slider.value / 100); });
  function relabelSlider() {
    var len = U * LEN_M;
    sVal.textContent = DN.fmt(len, 2) + ' m';
    slider.setAttribute('aria-valuetext', L(DN.fmt(len, 2) + ' m de ' + DN.fmt(4.5, 1) + ' m', DN.fmt(len, 2) + ' m of ' + DN.fmt(4.5, 1) + ' m'));
  }
  var MS = [
    { m: 0.467, pt: 'O fio já passou do comprimento do axônio de um rato, 46,7 cm.', en: 'The thread has passed the length of a rat axon, 46.7 cm.' },
    { m: 1.7, pt: 'O fio já é mais comprido que a altura de uma pessoa de 1,70 m.', en: 'The thread is now longer than a 1.70 m person is tall.' },
    { m: 2.0, pt: 'Passou do comprimento de uma mesa de jantar.', en: 'It has passed the length of a dining table.' },
    { m: 4.49, pt: 'Desenrolado: cerca de 4,5 metros saem de um único neurônio humano, o comprimento de um carro médio.', en: 'Unrolled: about 4.5 metres come out of a single human neuron, the length of a midsize car.' }
  ];
  function milestones() {
    var len = U * LEN_M, idx = -1;
    for (var i = 0; i < MS.length; i++) if (len >= MS[i].m) idx = i;
    if (idx !== lastMilestone) {
      if (idx > lastMilestone && idx >= 0) live.textContent = L(MS[idx].pt, MS[idx].en);
      else if (idx < 0 && lastMilestone >= 0) live.textContent = L('O axônio voltou a ser um novelo dentro do estriado.', 'The axon is a tangle inside the striatum again.');
      lastMilestone = idx;
    }
  }

  /* ---------------- synapse chart ---------------- */
  var BARS = [
    { k: 'msn', v: 400, lo: 300, hi: 500, col: C.ink },
    { k: 'fsi', v: 5000, col: C.dim },
    { k: 'rat', v: 245000, col: C.dopa, pre: true },
    { k: 'hum', v: 2400000, lo: 1000000, col: C.dopa, est: true, pre: true }
  ];
  function barText(k) {
    return {
      msn: [L('neurônio espinhoso médio do estriado', 'striatal medium spiny neuron'), L('cerca de 400', 'about 400')],
      fsi: [L('interneurônio de disparo rápido', 'fast-spiking interneuron'), L('cerca de 5 mil', 'about 5,000')],
      rat: [L('neurônio de dopamina de rato', 'rat dopamine neuron'), L('até 245 mil', 'up to 245,000')],
      hum: [L('neurônio de dopamina humano (estimativa)', 'human dopamine neuron (estimate)'), L('1 a 2,4 milhões', '1 to 2.4 million')]
    }[k];
  }
  var stageH = 0;
  function buildChart(animate) {
    chart.innerHTML = '';
    var w = Math.max(280, Math.round(chart.clientWidth || root.clientWidth || 600));
    var mob = w < 560, padT = 10, axisH = 40;
    var avail = (stageH || (mob ? 440 : 540)) - (mob ? 120 : 80);
    var rowH = DN.clamp(Math.floor((avail - padT - axisH) / BARS.length), mob ? 54 : 50, mob ? 76 : 96);
    var labW = mob ? 0 : Math.min(330, Math.round(w * 0.34));
    var x0 = labW + (mob ? 2 : 14), x1 = w - (mob ? 8 : 16);
    var h = padT + BARS.length * rowH + axisH;
    var lmin = 2, lmax = 7;
    function X(v) { return x0 + (Math.log10(v) - lmin) / (lmax - lmin) * (x1 - x0); }
    var S = DN.svg;
    var svgE = S('svg', { viewBox: '0 0 ' + w + ' ' + h, width: w, height: h, role: 'img', class: 'w02b-bars' }, chart);
    svgE.setAttribute('aria-label', L('Sinapses por neurônio, em escala logarítmica: neurônio espinhoso médio, cerca de 400; interneurônio de disparo rápido, cerca de 5 mil; neurônio de dopamina de rato, até 245 mil; neurônio de dopamina humano, estimativa de 1 a 2,4 milhões.',
      'Synapses per neuron, log scale: medium spiny neuron, about 400; fast-spiking interneuron, about 5,000; rat dopamine neuron, up to 245,000; human dopamine neuron, estimated 1 to 2.4 million.'));
    var ticks = [[100, '100'], [1000, L('1 mil', '1,000')], [10000, L('10 mil', '10,000')], [100000, L('100 mil', '100,000')], [1000000, L('1 milhão', '1 million')], [10000000, L('10 milhões', '10 million')]];
    var yb = padT + BARS.length * rowH;
    ticks.forEach(function (t, i) {
      var x = X(t[0]);
      S('line', { x1: x, x2: x, y1: padT, y2: yb + 4, class: 'w02b-grid' }, svgE);
      if (mob && (i % 2 === 1)) return;
      var tx = S('text', { x: x, y: yb + 18, class: 'w02b-axt', 'text-anchor': i === 0 ? 'start' : (i === ticks.length - 1 ? 'end' : 'middle') }, svgE);
      tx.textContent = t[1];
    });
    var at = S('text', { x: x1, y: yb + 32, class: 'w02b-axt dim', 'text-anchor': 'end' }, svgE);
    at.textContent = L('sinapses por neurônio, escala logarítmica', 'synapses per neuron, log scale');
    BARS.forEach(function (b, i) {
      var tx = barText(b.k), y = padT + i * rowH;
      var bh = mob ? 18 : 28, by = mob ? y + rowH - bh - 8 : y + (rowH - bh) / 2;
      var lab = S('text', { x: mob ? x0 : labW, y: mob ? by - 7 : by + bh / 2 + 4, class: 'w02b-bl', 'text-anchor': mob ? 'start' : 'end' }, svgE);
      lab.textContent = tx[0];
      var g = S('g', { class: 'w02b-bar' }, svgE);
      var xv = X(b.v);
      if (b.est) {
        S('rect', { x: x0, y: by, width: Math.max(1, X(b.lo) - x0), height: bh, fill: 'rgba(232,149,47,.05)', stroke: 'none' }, g);
        S('rect', { x: x0 + 0.75, y: by + 0.75, width: xv - x0 - 1.5, height: bh - 1.5, fill: 'none', stroke: C.dopa, 'stroke-width': 1.5, 'stroke-dasharray': '5 4' }, g);
        S('rect', { x: X(b.lo), y: by + 0.75, width: xv - X(b.lo) - 0.75, height: bh - 1.5, fill: C.dopaSoft, stroke: 'none' }, g);
      } else {
        S('rect', { x: x0, y: by, width: xv - x0, height: bh, fill: b.col }, g);
      }
      if (b.lo && !b.est) {
        S('line', { x1: X(b.lo), x2: X(b.hi), y1: by + bh / 2, y2: by + bh / 2, stroke: C.ink, 'stroke-width': 1 }, svgE);
        S('line', { x1: X(b.hi), x2: X(b.hi), y1: by + 4, y2: by + bh - 4, stroke: C.ink, 'stroke-width': 1 }, svgE);
      }
      var vx = (b.hi && !b.est ? X(b.hi) : xv) + 8, anchor = 'start';
      var vt = S('text', { x: vx, y: by + bh / 2 + 4, class: 'w02b-bv', 'text-anchor': anchor }, svgE);
      vt.textContent = tx[1];
      if (vx + tx[1].length * 7 > w) { vt.setAttribute('x', xv - 8); vt.setAttribute('text-anchor', 'end'); vt.classList.add('inv'); }
      if (animate && !RM && g.animate) {
        g.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 900, delay: 120 + i * 140, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' });
        vt.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 700 + i * 140, fill: 'backwards' });
      }
    });
    var note = el('p', { class: 'w02b-note' }, chart);
    note.textContent = L('Pelo número estimado, um neurônio de dopamina humano faria até 6 mil vezes mais sinapses que um neurônio espinhoso médio. O tracejado marca a estimativa, que nunca foi medida.',
      'By the estimate, one human dopamine neuron would make up to 6,000 times more synapses than a medium spiny neuron. The dashed bar marks the estimate, which has never been measured.');
  }
  function toggleChart() {
    var go = function () {
      showChart = !showChart;
      if (showChart) stageH = stage.offsetHeight || stageH;
      chart.style.minHeight = stageH ? stageH + 'px' : '';
      chart.hidden = !showChart; stage.hidden = showChart;
      sliderRow.hidden = showChart || RM; stepRow.hidden = showChart || !RM;
      relabel();
      if (showChart) {
        buildChart(true);
        live.textContent = L('Sinapses por neurônio: cerca de 400 num neurônio espinhoso médio, cerca de 5 mil num interneurônio rápido, até 245 mil num neurônio de dopamina de rato e, pela estimativa, até 2,4 milhões num humano.',
          'Synapses per neuron: about 400 in a medium spiny neuron, about 5,000 in a fast-spiking interneuron, up to 245,000 in a rat dopamine neuron and, by the estimate, up to 2.4 million in a human one.');
      } else { needsDraw = true; kick(); live.textContent = L('De volta ao axônio.', 'Back to the axon.'); }
    };
    if (document.startViewTransition && !RM) document.startViewTransition(go); else go();
  }
  bSyn.addEventListener('click', toggleChart);

  /* ---------------- language ---------------- */
  function relabel() {
    sLab.textContent = L('desenrolar', 'unroll');
    take.textContent = L('Pela estimativa, um único neurônio de dopamina humano tem cerca de 4,5 metros de axônio e de 1 a 2,4 milhões de sinapses.',
      'By the estimate, a single human dopamine neuron has about 4.5 metres of axon and 1 to 2.4 million synapses.');
    if (lastMilestone < 0 && !showChart) live.textContent = L('O axônio de um único neurônio forma um novelo denso dentro do estriado. Desenrole para medir.',
      'The axon of a single neuron forms a dense tangle inside the striatum. Unroll it to measure.');
    else if (lastMilestone >= 0 && !showChart && typeof MS !== 'undefined') live.textContent = L(MS[lastMilestone].pt, MS[lastMilestone].en);
    ['novelo', 'pela metade', 'esticado'].forEach(function (t, i) { stepBtns[i].textContent = L(t, ['tangled', 'halfway', 'straight'][i]); });
    bSyn.textContent = showChart ? L('voltar ao axônio', 'back to the axon') : L('ver as sinapses', 'see the synapses');
    bSyn.setAttribute('aria-pressed', showChart ? 'true' : 'false');
    hint.textContent = L('arraste para girar', 'drag to rotate');
    loadMsg.textContent = L('carregando o axônio', 'loading the axon');
    stage.setAttribute('role', 'img');
    stage.setAttribute('aria-label', L('Um único axônio de neurônio de dopamina, ramificado num novelo denso dentro do estriado. Desenrolado, ele mede cerca de 4,5 metros, mais que a altura de uma pessoa, mais que uma mesa de jantar e quase o comprimento de um carro.',
      'A single dopamine neuron axon, branched into a dense tangle inside the striatum. Unrolled, it measures about 4.5 metres, longer than a person is tall, longer than a dining table and about the length of a car.'));
    sr.textContent = L('Em números: axônio de um neurônio de dopamina de rato, 46,7 cm em média; estimativa humana, cerca de 4,5 m. Sinapses por neurônio: neurônio espinhoso médio, cerca de 400; interneurônio rápido, cerca de 5 mil; neurônio de dopamina de rato, até 245 mil; neurônio de dopamina humano, de 1 a 2,4 milhões (estimativa).',
      'In numbers: rat dopamine neuron axon, 46.7 cm on average; human estimate, about 4.5 m. Synapses per neuron: medium spiny neuron, about 400; fast-spiking interneuron, about 5,000; rat dopamine neuron, up to 245,000; human dopamine neuron, 1 to 2.4 million (estimate).');
    relabelSlider(); relabelOverlay();
    if (showChart) buildChart(false);
    needsDraw = true; kick();
  }
  DN.onLang(relabel);
  relabel();
  setU(0, true);
  buildOverlay();

  /* ---------------- lazy start ---------------- */
  function start() {
    data = genTree();
    if (WEAK || RM) { init2D(); loadMsg.hidden = true; kick(); return; }
    import(THREE_URL).then(function (THREE) {
      try { init3D(THREE); } catch (e) { init2D(); }
      loadMsg.hidden = true; kick();
    }).catch(function () { init2D(); loadMsg.hidden = true; kick(); });
  }
  DN.onVisible(root, function (v) { if (v && !started) { started = true; start(); } }, { margin: '150% 0px', once: true });
  DN.onVisible(stage, function (v) { visible = v; if (v) { needsDraw = true; kick(); } });
})();
