/* c05 · ingreme-e-plana : steep vs flat day curve, Whitehall II hazard ratios, Adam 2017 associations. Static. */
(function () {
  'use strict';
  var root = DN.body('c05'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, S = DN.svg, E = DN.el, C = DN.COL;

  /* Whitehall II sample times for someone who wakes at 07:00: waking, +30 min, +2.5 h, +8 h, +12 h, bedtime */
  var TS = [7, 7.5, 9.5, 15, 19, 23];
  var TLAB = ['07:00', '07:30', '09:30', '15:00', '19:00', '23:00'];
  /* illustrative shapes on a relative axis: the same morning, two different nights */
  var STEEP = [1.0, 1.55, 0.85, 0.42, 0.25, 0.12];
  var FLAT = [1.0, 1.55, 0.85, 0.70, 0.62, 0.55];
  var LOWAM = [0.58, 0.74, 0.56, 0.33, 0.2, 0.12];

  var HR = [
    { name: ['morte por qualquer causa', 'death from any cause'], v: 1.30, ci: [1.09, 1.55] },
    { name: ['morte cardiovascular', 'cardiovascular death'], v: 1.87, ci: [1.32, 2.64] },
    { name: ['cortisol na hora de dormir, morte cardiovascular', 'bedtime cortisol, cardiovascular death'], v: 1.98, ci: null, sec: true }
  ];
  var ADAM = [
    [['imunidade e inflamação', 'immunity and inflammation'], 0.288],
    [['comportamento externalizante', 'externalizing behavior'], 0.254],
    [['câncer', 'cancer'], 0.231],
    [['outros mentais', 'other mental'], 0.176],
    [['fadiga', 'fatigue'], 0.167],
    [['internalizante', 'internalizing'], 0.129],
    [['outros físicos', 'other physical'], 0.125],
    [['depressão', 'depression'], 0.106],
    [['cardiovascular', 'cardiovascular'], 0.098, true],
    [['obesidade', 'obesity'], 0.093],
    [['ansiedade', 'anxiety'], -0.084, true]
  ];
  var MEAN = 0.147;

  /* ---------- risograph seal (technique from dopamina-src/widgets/w00.js) ---------- */
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
  var INKS = [
    { k: 'a', col: C.alta, ang: 15, op: 0.95, mx: 0.9, my: -0.6 },
    { k: 'b', col: C.baixa, ang: 75, op: 0.93, mx: -0.9, my: 0.8 }
  ];
  function riso(id, vb, art, seed) {
    var R = rng(seed), defs = '', layers = '';
    INKS.forEach(function (ink) {
      var p = id + '-' + ink.k;
      [0.6, 0.9, 1.15].forEach(function (r, j) {
        defs += '<pattern id="' + p + 'h' + (j + 1) + '" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.3" cy="1.3" r="' + r + '" fill="' + ink.col + '"/></pattern>';
      });
      defs += '<filter id="' + p + 'g" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.2" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3 0 0 0 2.5" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
      var body = art[ink.k].replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#' + p + 'h$1)');
      layers += '<g class="c05-ink c05-ink-' + ink.k + '" transform="translate(' + ink.mx + ' ' + ink.my + ')" opacity="' + ink.op + '" filter="url(#' + p + 'g)">' + body + '</g>';
    });
    return '<svg class="c05-seal-art" viewBox="' + vb.join(' ') + '" aria-hidden="true" focusable="false"><defs>' + defs + '</defs>' + layers + '</svg>';
  }
  function office() {
    var cols = '', win = '';
    for (var i = 0; i < 6; i++) cols += '<rect x="' + (13 + i * 11) + '" y="30" width="5" height="30" fill="$0"/>';
    for (var r = 0; r < 2; r++) for (var c = 0; c < 6; c++) win += '<rect x="' + (12.5 + c * 11) + '" y="' + (34 + r * 13) + '" width="6" height="8" fill="$2"/>';
    return {
      a: '<rect x="8" y="28" width="72" height="34" fill="$1"/>' + win + '<rect x="40" y="48" width="8" height="14" fill="$0"/>' +
        '<circle cx="44" cy="19" r="3" fill="$0"/>',
      b: '<path d="M4,28 L44,8 L84,28Z" fill="none" stroke="$0" stroke-width="2.2" stroke-linejoin="round"/><path d="M14,25 L44,12 L74,25Z" fill="$1"/>' +
        '<rect x="4" y="27" width="80" height="3.5" fill="$0"/>' + cols +
        '<rect x="2" y="61" width="84" height="3" fill="$0"/><rect x="-2" y="65" width="92" height="3" fill="$0"/>' +
        '<path d="M44,0 V9" stroke="$0" stroke-width="1.4"/><path d="M44,0.5 h8 l-2,2.5 l2,2.5 h-8Z" fill="$0"/>'
    };
  }

  /* ---------- helpers ---------- */
  /* monotone cubic (Fritsch-Carlson) through the samples, evaluated at hour h */
  function mono(xs, ys) {
    var n = xs.length, d = [], m = [];
    for (var i = 0; i < n - 1; i++) d[i] = (ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]);
    m[0] = d[0]; m[n - 1] = d[n - 2];
    for (i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
    for (i = 0; i < n - 1; i++) {
      if (d[i] === 0) { m[i] = m[i + 1] = 0; continue; }
      var a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b;
      if (s > 9) { var t = 3 / Math.sqrt(s); m[i] = t * a * d[i]; m[i + 1] = t * b * d[i]; }
    }
    return function (h) {
      var k = 0; while (k < n - 2 && h > xs[k + 1]) k++;
      var hh = xs[k + 1] - xs[k], t = (h - xs[k]) / hh, t2 = t * t, t3 = t2 * t;
      return (2 * t3 - 3 * t2 + 1) * ys[k] + (t3 - 2 * t2 + t) * hh * m[k] + (-2 * t3 + 3 * t2) * ys[k + 1] + (t3 - t2) * hh * m[k + 1];
    };
  }
  function pathOf(f, x, y, h0, h1) {
    var d = '';
    for (var h = h0; h <= h1 + 1e-9; h += 0.1) d += (d ? 'L' : 'M') + x(h).toFixed(1) + ',' + y(f(h)).toFixed(1);
    return d;
  }
  function mix(a, b, t) { return a.map(function (v, i) { return v + (b[i] - v) * t; }); }
  function txt(parent, x, y, s, cls, anchor, extra) {
    var a = { x: x, y: y, class: cls || '' };
    if (anchor) a['text-anchor'] = anchor;
    if (extra) for (var k in extra) a[k] = extra[k];
    var t = S('text', a, parent); t.textContent = s; return t;
  }

  /* ---------- DOM ---------- */
  var grid = E('div', { class: 'c05-wrap' }, root);
  var p1 = E('div', { class: 'c05-p c05-p1' }, grid);
  var p2 = E('div', { class: 'c05-p c05-p2' }, grid);
  var p3 = E('div', { class: 'c05-p c05-p3' }, grid);
  var take = E('p', { class: 'c05-take' }, root);
  var more = E('details', { class: 'more c05-more' }, root);
  var seen = DN.RM, anim = [];

  function head(p, n, t) { E('div', { class: 'c05-h' }, p, '<span>' + n + '</span>' + t); }

  /* panel 1: two curves, the same morning */
  var R1 = {};
  function panel1() {
    p1.innerHTML = '';
    head(p1, '1', L('A mesma manhã, duas noites', 'The same morning, two evenings'));
    var wrap = E('div', { class: 'c05-p1w' }, p1);
    var box = E('div', { class: 'c05-main' }, wrap);
    var minis = E('div', { class: 'c05-minis' }, wrap);
    var W = box.clientWidth || 600, mob = W < 440;
    var m = { l: 40, r: 12, t: 30, b: mob ? 58 : 44 }, ph = mob ? 200 : 230, H = m.t + ph + m.b;
    var sv = S('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': L(
      'Duas curvas de cortisol na saliva para quem acorda às 7h, nos seis horários de coleta do Whitehall II. As duas têm o mesmo valor às 7h, 7h30 e 9h30, então um exame das 8h lê o mesmo número. Depois a curva íngreme desce até quase zero às 23h, e a curva plana fica alta, perto de metade do valor do despertar.',
      'Two salivary cortisol curves for someone who wakes at 7:00, at the six Whitehall II sampling times. Both have the same value at 7:00, 7:30 and 9:30, so an 8:00 test reads the same number. After that the steep curve falls almost to zero by 23:00, and the flat curve stays high, near half the waking value.') }, box);
    var pw = W - m.l - m.r;
    var x = function (h) { return m.l + (h - 7) / 16 * pw; };
    var y = function (v) { return m.t + ph - (v + 0.05) / 1.8 * ph; };
    var defs = S('defs', null, sv);
    var lg = S('linearGradient', { id: 'c05-grad', gradientUnits: 'userSpaceOnUse', x1: x(7.5), x2: x(21), y1: 0, y2: 0 }, defs);
    S('stop', { offset: 0, 'stop-color': C.alta }, lg);
    S('stop', { offset: 1, 'stop-color': C.baixa }, lg);
    txt(sv, m.l - 8, 12, L('cortisol na saliva, forma ilustrativa', 'cortisol in saliva, illustrative shape'), 'c05-axt');
    txt(sv, m.l - 8, y(1.62), L('alto', 'high'), 'c05-tick', 'end', { 'dominant-baseline': 'central' });
    txt(sv, m.l - 8, y(0), L('baixo', 'low'), 'c05-tick', 'end', { 'dominant-baseline': 'central' });
    var ay = m.t + ph;
    S('line', { x1: m.l, x2: W - m.r, y1: ay, y2: ay, class: 'c05-axis' }, sv);
    TS.forEach(function (h, i) {
      S('line', { x1: x(h), x2: x(h), y1: m.t, y2: ay, class: 'c05-grid' }, sv);
      S('line', { x1: x(h), x2: x(h), y1: ay, y2: ay + 4, class: 'c05-axis' }, sv);
      var row2 = mob && i === 1;
      var anchor = i === 0 ? 'end' : (i === 1 ? 'start' : (i === 5 ? 'end' : 'middle'));
      var xx = i === 0 ? x(h) + 3 : i === 1 ? x(h) - 3 : i === 5 ? x(h) + 2 : x(h);
      txt(sv, xx, ay + (row2 ? 28 : 15), TLAB[i], 'c05-tick c05-tn', anchor);
    });
    txt(sv, mob ? 0 : W - m.r, ay + (mob ? 46 : 34), L('seis coletas do Whitehall II, para quem acorda às 7h', 'six Whitehall II samples, for someone who wakes at 7:00'), 'c05-tick', mob ? 'start' : 'end');
    /* the 8:00 test */
    S('line', { x1: x(8), x2: x(8), y1: y(1.72), y2: ay, class: 'c05-exam' }, sv);
    var fS = mono(TS, STEEP);
    /* curves */
    R1.flat = S('path', { d: pathOf(fS, x, y, 7, 23), class: 'c05-flat' }, sv);
    R1.steep = S('path', { d: pathOf(fS, x, y, 7, 23), class: 'c05-steep' }, sv);
    R1.dotsF = TS.map(function (h, i) { return S('circle', { cx: x(h), cy: y(FLAT[i]), r: 3.2, class: 'c05-dF' }, sv); });
    R1.dotsS = TS.map(function (h, i) { return S('circle', { cx: x(h), cy: y(STEEP[i]), r: 3.2, class: 'c05-dS' }, sv); });
    /* the 8:00 test: a dot where both curves pass, a leader to a small thermometer above the 09:30 to 15:00 gap */
    var g = S('g', { class: 'c05-therm' }, sv);
    var tx = x(9.5) + (mob ? 10 : 18), ty = y(1.7);
    S('path', { d: 'M' + x(8) + ',' + y(fS(8)) + ' L' + (tx - 6) + ',' + (ty + 29), class: 'c05-lead' }, sv);
    S('rect', { x: tx, y: ty, width: 6, height: 26, rx: 3, class: 'c05-th-o' }, g);
    S('circle', { cx: tx + 3, cy: ty + 29, r: 5, class: 'c05-th-b' }, g);
    S('rect', { x: tx + 1.6, y: ty + 9, width: 2.8, height: 20, class: 'c05-th-f' }, g);
    txt(sv, tx + 14, ty + 10, L('exame das 8h:', '8:00 test:'), 'c05-lab c05-halo');
    txt(sv, tx + 14, ty + 25, L('igual nas duas', 'same for both'), 'c05-lab c05-b c05-halo');
    S('circle', { cx: x(8), cy: y(fS(8)), r: 4.5, class: 'c05-exdot' }, sv);
    /* direct labels near 17:00 */
    var fF = mono(TS, FLAT);
    R1.lF = txt(sv, x(17), y(fF(17)) - 12, L('plana: fica alta à noite', 'flat: stays high at night'), 'c05-lab c05-lF c05-halo', 'middle');
    R1.lS = txt(sv, x(17), y(fS(17)) + 20, L('íngreme: desce até a noite', 'steep: falls by night'), 'c05-lab c05-lS c05-halo', 'middle');
    R1.x = x; R1.y = y;
    /* keep labels inside */
    [R1.lF, R1.lS].forEach(function (t) {
      try { var bb = t.getBBox(); if (bb.x + bb.width > W - m.r) t.setAttribute('x', W - m.r - bb.width / 2); } catch (e) {}
    });
    setCurves(seen ? 1 : 0);

    /* minis: two ways to be flat */
    [[LOWAM, L('manhã baixa', 'low morning'), L('a manhã sobe pouco', 'the morning barely rises')],
     [FLAT, L('noite alta', 'high night'), L('a noite não desce', 'the evening does not fall')]].forEach(function (q, k) {
      var mb = E('div', { class: 'c05-mini' }, minis);
      E('div', { class: 'c05-mt' }, mb, '<b>' + q[1] + '</b><span>' + q[2] + '</span>');
      var w = mb.clientWidth || 220, h = 74;
      var s2 = S('svg', { width: w, height: h, viewBox: '0 0 ' + w + ' ' + h, 'aria-hidden': 'true' }, mb);
      var xx = function (hh) { return 4 + (hh - 7) / 16 * (w - 8); };
      var yy = function (v) { return h - 6 - v / 1.6 * (h - 12); };
      S('line', { x1: 4, x2: w - 4, y1: h - 6, y2: h - 6, class: 'c05-axis' }, s2);
      S('path', { d: pathOf(fS, xx, yy, 7, 23), class: 'c05-ref' }, s2);
      S('path', { d: pathOf(mono(TS, q[0]), xx, yy, 7, 23), class: 'c05-flat c05-mflat' }, s2);
      var hi = k === 0 ? 7.5 : 23, f2 = mono(TS, q[0]);
      S('line', { x1: xx(hi), x2: xx(hi), y1: yy(fS(hi)), y2: yy(f2(hi)), class: 'c05-gap' }, s2);
    });
    E('div', { class: 'c05-mkey' }, minis, '<i class="c05-kr"></i>' + L('curva íngreme, para comparar', 'steep curve, for comparison'));
  }
  function setCurves(t) {
    var vals = mix(STEEP, FLAT, t);
    R1.flat.setAttribute('d', pathOf(mono(TS, vals), R1.x, R1.y, 7, 23));
    R1.dotsF.forEach(function (c, i) { c.setAttribute('cy', R1.y(vals[i])); });
    R1.lF.style.opacity = t; R1.lS.style.opacity = t;
  }

  /* panel 2: Whitehall II hazard ratios */
  function panel2() {
    p2.innerHTML = '';
    head(p2, '2', L('Whitehall II: risco por curva mais plana', 'Whitehall II: risk per flatter curve'));
    var seal = E('div', { class: 'c05-seal' }, p2);
    seal.innerHTML = riso('c05-o', [-4, -2, 96, 72], office(), 2011) +
      '<div><b>Whitehall II · ' + fmt(4047) + L(' servidores', ' civil servants') + '</b><span>' +
      L('6,1 anos de seguimento; 139 mortes, 32 cardiovasculares', '6.1 years of follow-up; 139 deaths, 32 cardiovascular') + '</span></div>';
    var box = E('div', { class: 'c05-fbox' }, p2);
    var W = box.clientWidth || 400;
    var m = { l: 4, r: 14 }, rowH = 46, top = 22;
    var rows = HR.length + 2, H = top + rows * rowH + 30;
    var sv = S('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': L(
      'Razão de risco para cada desvio padrão de curva mais plana: morte por qualquer causa 1,30, intervalo de 1,09 a 1,55; morte cardiovascular 1,87, de 1,32 a 2,64. Cortisol na hora de dormir e morte cardiovascular: cerca de 1,98, de fonte secundária, sem intervalo. Cortisol da manhã e salto do despertar: sem associação.',
      'Hazard ratio per standard deviation of flatter curve: death from any cause 1.30, interval 1.09 to 1.55; cardiovascular death 1.87, 1.32 to 2.64. Bedtime cortisol and cardiovascular death: about 1.98, from a secondary source, no interval. Morning cortisol and the waking rise: no association.') }, box);
    var lo = Math.log(0.8), hi = Math.log(3);
    var x = function (v) { return m.l + (Math.log(v) - lo) / (hi - lo) * (W - m.l - m.r); };
    var bot = top + rows * rowH;
    [1.5, 2, 3].forEach(function (v) { S('line', { x1: x(v), x2: x(v), y1: top - 4, y2: bot, class: 'c05-grid' }, sv); });
    [0.8, 1, 1.5, 2, 3].forEach(function (v) { txt(sv, x(v), bot + 14, fmt(v, v % 1 ? 1 : 0), 'c05-tick', v === 3 ? 'end' : v === 0.8 ? 'start' : 'middle'); });
    txt(sv, W - m.r, bot + 28, L('razão de risco, escala log', 'hazard ratio, log scale'), 'c05-tick', 'end');
    S('line', { x1: x(1), x2: x(1), y1: top - 10, y2: bot, class: 'c05-ref1' }, sv);
    txt(sv, x(1) + 5, top - 8, L('1 = risco igual', '1 = equal risk'), 'c05-tick c05-b');
    HR.forEach(function (r, i) {
      var y0 = top + i * rowH + 14, yb = y0 + 16;
      var nm = L(r.name[0], r.name[1]);
      if (W < 420 && nm.indexOf(', ') > 0) {
        yb += 9;
        var tt = txt(sv, x(1) + 5, y0 - 3, '', 'c05-lab');
        nm.split(', ').forEach(function (part, k) { S('tspan', { x: x(1) + 5, dy: k ? 13 : 0 }, tt).textContent = part + (k ? '' : ','); });
      } else txt(sv, x(1) + 5, y0, nm, 'c05-lab');
      if (!r.sec) {
        var b = S('rect', { x: x(1), y: yb - 6, width: x(r.v) - x(1), height: 12, class: 'c05-hrb' }, sv);
        b.style.transformOrigin = x(1) + 'px 0px'; anim.push(b);
        S('line', { x1: x(r.ci[0]), x2: x(r.ci[1]), y1: yb, y2: yb, class: 'c05-ci' }, sv);
        S('line', { x1: x(r.ci[0]), x2: x(r.ci[0]), y1: yb - 5, y2: yb + 5, class: 'c05-ci' }, sv);
        S('line', { x1: x(r.ci[1]), x2: x(r.ci[1]), y1: yb - 5, y2: yb + 5, class: 'c05-ci' }, sv);
        S('circle', { cx: x(r.v), cy: yb, r: 4.5, class: 'c05-hrp' }, sv);
        var vt = txt(sv, x(r.ci[1]) + 6, yb, fmt(r.v, 2), 'c05-val', 'start', { 'dominant-baseline': 'central' });
        if (x(r.ci[1]) + 40 > W) { vt.setAttribute('x', x(r.ci[0]) - 6); vt.setAttribute('text-anchor', 'end'); }
      } else {
        S('circle', { cx: x(r.v), cy: yb, r: 4.5, class: 'c05-hro' }, sv);
        txt(sv, x(r.v) + 9, yb, '≈ ' + fmt(r.v, 2), 'c05-val', 'start', { 'dominant-baseline': 'central' });
        txt(sv, x(1) + 5, yb + 17, L('fonte secundária, sem intervalo', 'secondary source, no interval'), 'c05-tick', 'start', { 'dominant-baseline': 'central' });
      }
    });
    [L('cortisol da manhã: sem associação', 'morning cortisol: no association'), L('salto do despertar: sem associação', 'waking rise: no association')].forEach(function (s, k) {
      var y0 = top + (HR.length + k) * rowH + 30;
      txt(sv, x(1) + 5, y0, s, 'c05-lab c05-dim');
    });
  }

  /* panel 3: Adam 2017 associations */
  function panel3() {
    p3.innerHTML = '';
    head(p3, '3', L('Adam 2017: curva plana e saúde, por desfecho', 'Adam 2017: flat curve and health, by outcome'));
    E('p', { class: 'c05-sub' }, p3, L('Correlação r entre curva mais plana e pior saúde em 80 estudos, com 179 associações e cerca de 26 mil pessoas.',
      'Correlation r between a flatter curve and worse health in 80 studies, with 179 associations and about 26,000 people.'));
    var box = E('div', { class: 'c05-abox' }, p3);
    var W = box.clientWidth || 400, mob = W < 420;
    var lw = mob ? 0 : 182, top = 26, rh = mob ? 32 : 22, H = top + ADAM.length * rh + 34;
    var sv = S('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': L(
      'Correlação entre curva mais plana e pior saúde, por tipo de desfecho: ', 'Correlation between a flatter curve and worse health, by outcome: ') +
      ADAM.map(function (a) { return L(a[0][0], a[0][1]) + ' ' + fmt(a[1], 3) + (a[2] ? L(' (sem significância)', ' (not significant)') : ''); }).join('; ') + L('. Média 0,147.', '. Mean 0.147.') }, box);
    var x0 = mob ? 34 : lw + 8, x1 = W - 52;
    var x = function (v) { return x0 + (v + 0.1) / 0.4 * (x1 - x0); };
    var bot = top + ADAM.length * rh;
    [0.1, 0.2, 0.3].forEach(function (v) { S('line', { x1: x(v), x2: x(v), y1: top - 4, y2: bot, class: 'c05-grid' }, sv); });
    [-0.1, 0, 0.1, 0.2, 0.3].forEach(function (v) { txt(sv, x(v), bot + 14, (v < 0 ? '−' : '') + (v === 0 ? '0' : fmt(Math.abs(v), 1)), 'c05-tick', 'middle'); });
    S('line', { x1: x(0), x2: x(0), y1: top - 4, y2: bot, class: 'c05-ref1' }, sv);
    S('line', { x1: x(MEAN), x2: x(MEAN), y1: top - 10, y2: bot, class: 'c05-mean' }, sv);
    ADAM.forEach(function (a, i) {
      var yc = top + i * rh + rh / 2 + (mob ? 6 : 0);
      if (mob) txt(sv, x(0) + 4, yc - 12, L(a[0][0], a[0][1]), 'c05-lab c05-halo', 'start');
      else txt(sv, lw, yc, L(a[0][0], a[0][1]), 'c05-lab', 'end', { 'dominant-baseline': 'central' });
      var xa = x(Math.min(0, a[1])), xb = x(Math.max(0, a[1]));
      var b = S('rect', { x: xa, y: yc - 6, width: xb - xa, height: 12, class: a[2] ? 'c05-ab-ns' : 'c05-ab' }, sv);
      b.style.transformOrigin = x(0) + 'px 0px'; anim.push(b);
      var v = (a[1] < 0 ? '−' : '') + fmt(Math.abs(a[1]), 3) + (a[2] ? '*' : '');
      txt(sv, a[1] < 0 ? x(0) + 5 : xb + 5, yc, v, 'c05-val c05-vsm c05-halo', 'start', { 'dominant-baseline': 'central' });
    });
    txt(sv, x(MEAN), top - 13, L('média 0,147', 'mean 0.147'), 'c05-tick c05-b', 'middle');
    txt(sv, W, bot + 30, L('* sem significância estatística', '* not statistically significant'), 'c05-tick', 'end');
  }

  function render() {
    anim = [];
    panel1(); panel2(); panel3();
    take.textContent = L('Um exame da manhã não distingue as duas curvas, mas nos estudos a curva que desce pouco até a noite acompanha mais doença e mais morte, num efeito pequeno e observacional.',
      'A morning test cannot tell the two curves apart, but in the studies the curve that falls little by night goes with more disease and more death, in a small and observational effect.');
    var open = more.open;
    more.innerHTML = '<summary>' + L('Ver os números em tabela', 'See the numbers as a table') + '</summary>' +
      '<table class="t"><thead><tr><th>Whitehall II</th><th>HR</th><th>' + L('intervalo', 'interval') + '</th></tr></thead><tbody>' +
      HR.map(function (r) { return '<tr><td>' + L(r.name[0], r.name[1]) + '</td><td>' + (r.sec ? '≈ ' : '') + fmt(r.v, 2) + '</td><td>' + (r.ci ? fmt(r.ci[0], 2) + L(' a ', ' to ') + fmt(r.ci[1], 2) : L('fonte secundária', 'secondary source')) + '</td></tr>'; }).join('') +
      '<tr><td>' + L('cortisol da manhã', 'morning cortisol') + '</td><td colspan="2">' + L('sem associação', 'no association') + '</td></tr>' +
      '<tr><td>' + L('salto do despertar', 'waking rise') + '</td><td colspan="2">' + L('sem associação', 'no association') + '</td></tr></tbody></table>' +
      '<table class="t"><thead><tr><th>Adam 2017</th><th>r</th></tr></thead><tbody>' +
      ADAM.map(function (a) { return '<tr><td>' + L(a[0][0], a[0][1]) + '</td><td>' + (a[1] < 0 ? '−' : '') + fmt(Math.abs(a[1]), 3) + (a[2] ? L(' (sem significância)', ' (not significant)') : '') + '</td></tr>'; }).join('') +
      '<tr><td><b>' + L('média', 'mean') + '</b></td><td><b>' + fmt(MEAN, 3) + '</b></td></tr></tbody></table>';
    more.open = open;
    if (!seen) anim.forEach(function (b) { b.style.transform = 'scaleX(0)'; });
  }
  function play() {
    var t0 = performance.now();
    (function step(now) {
      var t = Math.min(1, (now - t0) / 900), e = 1 - Math.pow(1 - t, 3);
      setCurves(e);
      if (t < 1) requestAnimationFrame(step);
    })(t0);
    anim.forEach(function (b, i) {
      b.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 450, delay: 300 + i * 50, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' })
        .onfinish = function () { b.style.transform = ''; };
    });
  }
  render();
  DN.onLang(render);
  var rw = root.clientWidth, rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { if (root.clientWidth !== rw) { rw = root.clientWidth; render(); } }, 150); });
  if (!seen) DN.onVisible(p1, function (v) { if (v && !seen) { seen = true; play(); } }, { once: true, threshold: 0.4 });
})();
