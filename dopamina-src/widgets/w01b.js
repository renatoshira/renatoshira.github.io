/* w01b · o gargalo + do comprimido ao cérebro (static infographic)
   Panel A: tyrosine hydroxylase (TH) as a saturable, feedback-inhibited step.
   Schematic steady state: P = TH(S, P) + B, where TH = c * S/(Km+S) / (1 + k P).
   Normal diet (S = 1, B = 0) gives P = 1 (index 100). Three cases are shown at
   once: normal diet, four times the tyrosine, and L-DOPA given after TH.
   Panel B: fate of 100 levodopa molecules from an oral dose, without and with
   carbidopa, side by side. Counts are schematic; only the ratio (about 4 to 5
   times) is sourced. */
(function () {
  'use strict';
  var root = DN.body('w01b'); if (!root) return;
  var C = DN.COL, L = DN.L, S = DN.svg, LV = C.sub.levodopa;

  /* ---------------- model A ---------------- */
  var KM = 0.15, K = 1, B_DOSE = 2.5;
  var CC = 2 / (1 / (KM + 1));            /* calibrates P(1, 0) = 1 */
  function v0(s) { return s / (KM + s); }
  function model(s, b) {
    var cv = CC * v0(s);
    var bb = 1 - K * b;
    var P = (-bb + Math.sqrt(bb * bb + 4 * K * (b + cv))) / (2 * K);
    return { P: P, th: P - b, brake: K * P / (1 + K * P) };
  }
  var V_N = 100, V_4 = Math.round(model(4, 0).P * 100), V_L = Math.round(model(1, B_DOSE).P * 100);

  /* ---------------- DOM ---------------- */
  root.innerHTML = '';
  var pa = DN.el('div', { class: 'w01b-panel w01b-pa' }, root);
  var paHead = DN.el('div', { class: 'glabel w01b-h' }, pa);
  var paGrid = DN.el('div', { class: 'w01b-grid' }, pa);
  var chart = S('svg', { viewBox: '0 0 330 300', class: 'w01b-chart', role: 'img' }, paGrid);
  var pipe = S('svg', { viewBox: '0 0 320 300', class: 'w01b-pipe', role: 'img' }, paGrid);
  var barsHead = DN.el('div', { class: 'w01b-bh' }, pa);
  var bars = DN.el('div', { class: 'w01b-bars', role: 'img' }, pa);
  var takeA = DN.el('p', { class: 'w01b-take' }, pa);

  var pb = DN.el('div', { class: 'w01b-panel w01b-pb' }, root);
  var pbHead = DN.el('div', { class: 'glabel w01b-h' }, pb);
  var tripGrid = DN.el('div', { class: 'w01b-tgrid' }, pb);
  var note = DN.el('div', { class: 'w01b-tally' }, pb);
  var ctrlB = DN.el('div', { class: 'rowbtns w01b-ctrlb' }, pb);
  var bDose = DN.el('button', { class: 'btn w01b-dose', type: 'button' }, ctrlB);
  var takeB = DN.el('p', { class: 'w01b-take' }, pb);

  function T(p, x, y, s, a) {
    var t = S('text', Object.assign({ x: x, y: y }, a || {}), p); t.textContent = s; return t;
  }

  /* ================= PANEL A: chart ================= */
  var CX0 = 50, CX1 = 316, CY0 = 46, CY1 = 246, XMAX = 4, YMAX = 150;
  function cx(s) { return CX0 + (CX1 - CX0) * s / XMAX; }
  function cy(v) { return CY1 - (CY1 - CY0) * v / YMAX; }
  function curvePath(b) {
    var d = '';
    for (var s = 0.02; s <= XMAX + 1e-6; s += 0.04) {
      var v = model(s, b).th * 100;
      d += (d ? 'L' : 'M') + cx(s).toFixed(1) + ' ' + cy(v).toFixed(1);
    }
    return d;
  }
  function buildChart() {
    chart.innerHTML = '';
    T(chart, CX0 - 6, 13, L('L-DOPA feita pela TH', 'L-DOPA made by TH'), { class: 'w01b-ax', 'text-anchor': 'start' });
    T(chart, CX0 - 6, 26, L('índice, dieta normal = 100', 'index, normal diet = 100'), { class: 'w01b-sm' });
    [0, 50, 100, 150].forEach(function (v) {
      S('line', { x1: CX0, x2: CX1, y1: cy(v), y2: cy(v), class: v === 0 ? 'w01b-axis' : 'w01b-gridl' }, chart);
      T(chart, CX0 - 8, cy(v) + 4, String(v), { class: 'w01b-tk', 'text-anchor': 'end' });
    });
    [0, 1, 2, 3, 4].forEach(function (s) {
      S('line', { x1: cx(s), x2: cx(s), y1: CY1, y2: CY1 + 4, class: 'w01b-axis' }, chart);
      T(chart, cx(s), CY1 + 17, s === 0 ? '0' : DN.fmt(s, 0) + '×', { class: 'w01b-tk', 'text-anchor': 'middle' });
    });
    T(chart, (CX0 + CX1) / 2, CY1 + 36, L('tirosina disponível (× normal)', 'tyrosine available (× normal)'), { class: 'w01b-ax', 'text-anchor': 'middle' });
    S('path', { d: curvePath(0), class: 'w01b-curve' }, chart);
    /* the two diets, joined by a flat bracket */
    var y1 = cy(V_N), y4 = cy(V_4);
    S('line', { x1: cx(1), x2: cx(1), y1: y1 + 7, y2: CY1, class: 'w01b-drop' }, chart);
    S('line', { x1: cx(4), x2: cx(4), y1: y4 + 7, y2: CY1, class: 'w01b-drop' }, chart);
    S('path', { d: 'M' + cx(1) + ' ' + (y1 - 26) + ' V' + (y1 - 32) + ' H' + cx(4) + ' V' + (y4 - 20), class: 'w01b-brk' }, chart);
    T(chart, (cx(1) + cx(4)) / 2, y1 - 38, L('4 vezes a tirosina: +' + (V_4 - V_N) + '%', '4 times the tyrosine: +' + (V_4 - V_N) + '%'), { class: 'w01b-lab w01b-bold', 'text-anchor': 'middle' });
    [[1, V_N, L('dieta normal', 'normal diet')], [4, V_4, L('4× tirosina', '4× tyrosine')]].forEach(function (q, i) {
      var x = cx(q[0]), y = cy(q[1]);
      S('circle', { cx: x, cy: y, r: 5.5, class: 'w01b-pt' }, chart);
      T(chart, i ? x - 2 : x + 8, y + 22, q[2], { class: 'w01b-sm', 'text-anchor': i ? 'end' : 'start' });
      T(chart, i ? x - 2 : x + 8, y - 9, String(q[1]), { class: 'w01b-val', 'text-anchor': i ? 'end' : 'start' });
    });
    T(chart, cx(2.5), cy(42), L('a enzima já trabalha', 'the enzyme already works'), { class: 'w01b-sm', 'text-anchor': 'middle' });
    T(chart, cx(2.5), cy(42) + 12, L('perto do máximo', 'close to its maximum'), { class: 'w01b-sm', 'text-anchor': 'middle' });
    chart.setAttribute('aria-label', L('Curva de saturação da tirosina hidroxilase. Com a dieta normal, a produção vale 100. Com quatro vezes mais tirosina, vale ' + V_4 + '.',
      'Saturation curve of tyrosine hydroxylase. With the normal diet, output is 100. With four times the tyrosine, it is ' + V_4 + '.'));
  }

  /* ================= PANEL A: pipeline ================= */
  var X = 150, P = {};
  var FB = 'M 96 252 C 52 252 38 244 38 214 L 38 118 C 38 96 60 89 128 89';
  function buildPipe() {
    pipe.innerHTML = '';
    S('rect', { x: 64, y: 8, width: 172, height: 50, rx: 7, class: 'w01b-tray' }, pipe);
    T(pipe, 72, 22, L('tirosina', 'tyrosine'), { class: 'w01b-sm' });
    var g = S('g', {}, pipe);
    for (var i = 0; i < 8; i++) S('circle', { cx: 79 + i * 9.4, cy: 38, r: 3, class: 'w01b-mtyr' }, g);
    S('path', { d: 'M 120 58 L 144 80 M 180 58 L 156 80', class: 'w01b-fun' }, pipe);
    var br = model(1, 0).brake;
    var fb = S('path', { d: FB, class: 'w01b-fb' }, pipe);
    fb.style.strokeWidth = (0.6 + 6 * br * br).toFixed(2); fb.style.opacity = (0.35 + 0.65 * br).toFixed(2);
    S('path', { d: FB, class: 'w01b-fbflow' }, pipe);
    var bar = S('line', { x1: 131, x2: 131, y1: 79, y2: 99, class: 'w01b-bar' }, pipe);
    bar.style.strokeWidth = (1.5 + 6 * br * br).toFixed(2);
    T(pipe, 26, 168, L('freio da dopamina', 'dopamine brake'), { class: 'w01b-sm w01b-ind', 'text-anchor': 'middle', transform: 'rotate(-90 26 168)' });
    S('line', { x1: X, x2: X, y1: 100, y2: 157, class: 'w01b-stl' }, pipe);
    S('line', { x1: X, x2: X, y1: 172, y2: 197, class: 'w01b-std' }, pipe);
    S('rect', { x: 138, y: 79, width: 24, height: 21, rx: 4, class: 'w01b-enzN' }, pipe);
    T(pipe, 172, 88, L('tirosina hidroxilase', 'tyrosine hydroxylase'), { class: 'w01b-lab' });
    T(pipe, 172, 101, L('o gargalo, lenta', 'the bottleneck, slow'), { class: 'w01b-sm' });
    T(pipe, 140, 133, 'L-DOPA', { class: 'w01b-lab w01b-lv', 'text-anchor': 'end' });
    S('rect', { x: 114, y: 157, width: 72, height: 15, rx: 4, class: 'w01b-enzW' }, pipe);
    T(pipe, 196, 163, L('descarboxilase', 'decarboxylase'), { class: 'w01b-lab' });
    T(pipe, 196, 176, L('rápida', 'fast'), { class: 'w01b-sm' });
    /* bypass: the drug enters after the bottleneck */
    S('path', { d: 'M 312 128 C 250 128 200 128 160 128', class: 'w01b-byl' }, pipe);
    S('path', { d: 'M 166 123 L 158 128 L 166 133', class: 'w01b-byh' }, pipe);
    T(pipe, 312, 119, L('L-DOPA do remédio', 'L-DOPA from the drug'), { class: 'w01b-sm w01b-lv w01b-bold', 'text-anchor': 'end' });
    T(pipe, 312, 145, L('entra depois do gargalo', 'enters after the bottleneck'), { class: 'w01b-sm', 'text-anchor': 'end' });
    var lvl = DN.clamp(model(1, B_DOSE).P / 3.4, 0, 1) * 80;
    S('rect', { x: 96, width: 108, y: 279 - lvl, height: lvl, class: 'w01b-tankf' }, pipe);
    S('rect', { x: 96, y: 197, width: 108, height: 84, rx: 4, class: 'w01b-tank' }, pipe);
    T(pipe, 214, 236, L('dopamina', 'dopamine'), { class: 'w01b-lab w01b-da' });
    T(pipe, 214, 249, L('na reserva', 'in store'), { class: 'w01b-sm' });
    P.dots = S('g', {}, pipe);
    pipe.setAttribute('aria-label', L('Linha de produção: tirosina, tirosina hidroxilase, L-DOPA, descarboxilase, dopamina. Uma seta de freio volta da dopamina para a tirosina hidroxilase. A L-DOPA do remédio entra depois da tirosina hidroxilase.',
      'Production line: tyrosine, tyrosine hydroxylase, L-DOPA, decarboxylase, dopamine. A brake arrow runs from dopamine back to tyrosine hydroxylase. L-DOPA from the drug enters after tyrosine hydroxylase.'));
  }

  /* ================= PANEL A: three cases as bars ================= */
  function buildBars() {
    barsHead.textContent = L('dopamina produzida, índice', 'dopamine produced, index');
    bars.innerHTML = '';
    var MAX = 320;
    [[L('dieta normal', 'normal diet'), V_N, 'th', V_N], [L('4 vezes a tirosina', '4 times the tyrosine'), V_4, 'th', V_4], [L('dieta normal + L-DOPA', 'normal diet + L-DOPA'), V_L, 'mix', model(1, B_DOSE).th * 100]].forEach(function (r) {
      var row = DN.el('div', { class: 'w01b-br' }, bars);
      DN.el('span', { class: 'w01b-bl' }, row).textContent = r[0];
      var tr = DN.el('span', { class: 'w01b-btr' }, row);
      var a = DN.el('i', { class: 'w01b-fill th' }, tr);
      a.style.width = (100 * r[3] / MAX).toFixed(2) + '%';
      if (r[2] === 'mix') { var b = DN.el('i', { class: 'w01b-fill by' }, tr); b.style.width = (100 * (r[1] - r[3]) / MAX).toFixed(2) + '%'; }
      var tk = DN.el('i', { class: 'w01b-tick' }, tr); tk.style.left = (100 * 100 / MAX).toFixed(2) + '%';
      DN.el('b', { class: 'w01b-bv' }, row).textContent = r[1];
    });
    var lg = DN.el('div', { class: 'w01b-gleg' }, bars);
    lg.innerHTML = '<span><i class="th"></i>' + L('via tirosina hidroxilase', 'via tyrosine hydroxylase') + '</span>' +
      '<span><i class="by"></i>' + L('via L-DOPA do remédio', 'via L-DOPA from the drug') + '</span>' +
      '<span><i class="nm"></i>' + L('normal = 100', 'normal = 100') + '</span>' +
      '<span class="w01b-schem">' + L('modelo esquemático', 'schematic model') + '</span>';
    bars.setAttribute('aria-label', L('Dopamina produzida: dieta normal, 100; quatro vezes a tirosina, ' + V_4 + '; dieta normal com L-DOPA, ' + V_L + '.',
      'Dopamine produced: normal diet, 100; four times the tyrosine, ' + V_4 + '; normal diet with L-DOPA, ' + V_L + '.'));
  }

  /* pipeline molecules (subtle, both routes) */
  var mols = [], spawnTy = 0, spawnBy = 0, lastA = 0, rafA = 0, visA = false;
  function tickA(now) {
    rafA = 0;
    if (!visA || DN.RM) return;
    var dt = Math.min(0.05, (now - (lastA || now)) / 1000); lastA = now;
    spawnTy += dt * 1.3 * model(1, B_DOSE).th; spawnBy += dt * 1.3 * B_DOSE * 0.8;
    while (spawnTy >= 1) { spawnTy -= 1; mols.push({ x: X, y: 58, by: false, el: S('circle', { r: 3, cx: X, cy: 58 }, P.dots) }); }
    while (spawnBy >= 1) { spawnBy -= 1; mols.push({ x: 312, y: 128, by: true, el: S('circle', { r: 3, cx: 312, cy: 128 }, P.dots) }); }
    var V = 62;
    mols = mols.filter(function (o) {
      if (o.by && o.x > X + 0.5) { o.x -= V * 1.6 * dt; if (o.x <= X) o.x = X; }
      else { o.x = X; o.y += V * dt; }
      if (o.y > 236) { o.el.remove(); return false; }
      var c = o.y < 100 && !o.by ? C.mid : (o.y < 172 ? LV : C.dopa);
      o.el.setAttribute('cx', o.x.toFixed(1)); o.el.setAttribute('cy', o.y.toFixed(1));
      o.el.setAttribute('fill', c);
      o.el.setAttribute('opacity', o.y > 205 ? Math.max(0, 1 - (o.y - 205) / 30).toFixed(2) : 1);
      return true;
    });
    rafA = requestAnimationFrame(tickA);
  }
  function wakeA() { if (!rafA && visA && !DN.RM) { lastA = 0; rafA = requestAnimationFrame(tickA); } }

  /* ================= PANEL B: two pill journeys ================= */
  var FATE = { sem: { brain: 5, blood: 80, gone: 15 }, com: { brain: 22, blood: 6, gone: 72 } };
  var LY = {
    W: 320, H: 372, pill: { x: 40, y: 22 }, pillLab: [70, 26],
    blood: { x: 4, y: 40, w: 312, h: 174 }, brain: { x: 4, y: 252, w: 312, h: 116 },
    bar: 236, b0: 4, b1: 316, doors: [112, 196], ap: { x: 292, y: 236 },
    gGone: { x: 30, y: 176, cols: 10, sp: 10.5 }, gBlood: { x: 186, y: 176, cols: 10, sp: 10.5 },
    gBrain: { x: 22, y: 322, cols: 10, sp: 11 },
    carbBar: [150, 232, 262], carbIn: [[150, 76], [176, 88], [226, 72], [252, 90]],
    mix: { x0: 40, x1: 280, y0: 66, y1: 96 },
    tBlood: [14, 58], tBrain: [14, 270], cnt: [306, 302], cntL: [306, 278],
    lGone: [77, 194], lBlood: [233, 194], lBrain: [14, 350], lAadc: [306, 58],
    lAp: [306, 262], lBar: [8, 229]
  };
  function slot(g, i) { return { x: g.x + (i % g.cols) * g.sp, y: g.y - Math.floor(i / g.cols) * g.sp }; }
  function prng(seed) { return function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }

  function Trip(parent, carb) {
    var o = { carb: carb, B: {}, dots: [], cs: [] };
    o.wrap = DN.el('div', { class: 'w01b-trip-w' }, parent);
    o.head = DN.el('div', { class: 'w01b-th' + (carb ? ' com' : '') }, o.wrap);
    o.svg = S('svg', { class: 'w01b-trip', role: 'img', viewBox: '0 0 ' + LY.W + ' ' + LY.H }, o.wrap);
    return o;
  }
  function plan(o) {
    var F = FATE[o.carb ? 'com' : 'sem'], r = prng(o.carb ? 7 : 3), fates = [], i;
    for (i = 0; i < F.brain; i++) fates.push('brain');
    for (i = 0; i < F.blood; i++) fates.push('blood');
    for (i = 0; i < F.gone; i++) fates.push('gone');
    for (i = fates.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), tmp = fates[i]; fates[i] = fates[j]; fates[j] = tmp; }
    var cnt = { brain: 0, blood: 0, gone: 0 }, out = [];
    function atBar(along) { return { x: along, y: LY.bar - 7 }; }
    fates.forEach(function (f, k) {
      var start = k * 0.024, w = [];
      var p0 = { x: LY.pill.x + (r() - 0.5) * 8, y: LY.pill.y + (r() - 0.5) * 6 };
      var mx = { x: LY.mix.x0 + r() * (LY.mix.x1 - LY.mix.x0), y: LY.mix.y0 + r() * (LY.mix.y1 - LY.mix.y0) };
      w.push({ p: p0, t: start, s: 'L' });
      w.push({ p: mx, t: start + 0.9 + r() * 0.3, s: 'L' });
      var tt = w[1].t;
      if (f === 'blood') {
        w[1].s = 'D';
        w.push({ p: atBar(LY.b0 + 20 + r() * (LY.b1 - LY.b0 - 60)), t: tt + 0.6, s: 'D' });
        w.push({ p: slot(LY.gBlood, cnt.blood++), t: tt + 1.3, s: 'D' });
      } else if (f === 'brain') {
        var door = LY.doors[k % 2];
        w.push({ p: atBar(door), t: tt + 0.55, s: 'L' });
        w.push({ p: { x: door, y: LY.bar + 16 }, t: tt + 0.8, s: 'L' });
        w.push({ p: slot(LY.gBrain, cnt.brain++), t: tt + 1.45, s: 'B' });
      } else {
        w.push({ p: slot(LY.gGone, cnt.gone++), t: tt + 0.8, s: 'X' });
      }
      out.push({ f: f, w: w });
    });
    return out;
  }
  function planCarbs(o) {
    if (!o.carb) return [];
    var ends = LY.carbBar.map(function (a) { return { x: a, y: LY.bar - 8 }; })
      .concat(LY.carbIn.map(function (q) { return { x: q[0], y: q[1] }; }));
    return ends.map(function (end, i) { return { w: [{ p: { x: LY.pill.x, y: LY.pill.y }, t: i * 0.06 }, { p: end, t: 0.9 + i * 0.12 }] }; });
  }
  function buildTrip(o) {
    var svg = o.svg, B = o.B;
    svg.innerHTML = '';
    o.head.textContent = o.carb ? L('com carbidopa', 'with carbidopa') : L('sem carbidopa', 'without carbidopa');
    S('rect', { x: LY.blood.x, y: LY.blood.y, width: LY.blood.w, height: LY.blood.h, rx: 8, class: 'w01b-blood' }, svg);
    S('rect', { x: LY.brain.x, y: LY.brain.y, width: LY.brain.w, height: LY.brain.h, rx: 8, class: 'w01b-brain' }, svg);
    T(svg, LY.tBlood[0], LY.tBlood[1], L('intestino e sangue', 'gut and blood'), { class: 'w01b-lab' });
    T(svg, LY.tBrain[0], LY.tBrain[1], L('cérebro', 'brain'), { class: 'w01b-lab' });
    var bg = S('g', { class: 'w01b-bbb' }, svg);
    for (var a = LY.b0; a < LY.b1; a += 8) {
      var mid = a + 4;
      if (Math.abs(mid - LY.ap.x) < 16 || LY.doors.some(function (d) { return Math.abs(mid - d) < 7; })) continue;
      S('rect', { x: a + 0.8, y: LY.bar - 3, width: 6.4, height: 6, rx: 1.6 }, bg);
    }
    LY.doors.forEach(function (d) { S('path', { d: 'M ' + (d - 7) + ' ' + (LY.bar - 4) + ' v 8 M ' + (d + 7) + ' ' + (LY.bar - 4) + ' v 8', class: 'w01b-door' }, svg); });
    T(svg, LY.lBar[0], LY.lBar[1], L('barreira hematoencefálica', 'blood-brain barrier'), { class: 'w01b-sm w01b-halo' });
    B.apGlow = S('circle', { cx: LY.ap.x, cy: LY.ap.y, r: 15, class: 'w01b-apg' }, svg);
    B.ap = S('circle', { cx: LY.ap.x, cy: LY.ap.y, r: 6.5, class: 'w01b-ap' }, svg);
    B.apLab = T(svg, LY.lAp[0], LY.lAp[1], o.carb ? L('área postrema quieta', 'area postrema quiet') : L('área postrema: náusea', 'area postrema: nausea'), { class: 'w01b-sm w01b-halo', 'text-anchor': 'end' });
    var px = LY.pill.x, py = LY.pill.y;
    S('path', { d: 'M ' + (px - 20) + ' ' + py + ' a 9 9 0 0 1 9 -9 h 11 v 18 h -11 a 9 9 0 0 1 -9 -9 z', fill: LV }, svg);
    S('path', { d: 'M ' + px + ' ' + (py - 9) + ' h 11 a 9 9 0 0 1 0 18 h -11 z', class: 'w01b-pillw' }, svg);
    T(svg, LY.pillLab[0], LY.pillLab[1], L('comprimido, 100 moléculas', 'pill, 100 molecules'), { class: 'w01b-sm' });
    T(svg, LY.lAadc[0], LY.lAadc[1], o.carb ? L('descarboxilase bloqueada', 'decarboxylase blocked') : L('descarboxilase ativa', 'decarboxylase active'), { class: 'w01b-sm' + (o.carb ? ' w01b-ind' : ''), 'text-anchor': 'end' });
    var F = FATE[o.carb ? 'com' : 'sem'];
    T(svg, LY.lGone[0], LY.lGone[1], L('levodopa eliminada', 'levodopa cleared'), { class: 'w01b-sm', 'text-anchor': 'middle' });
    B.nGone = T(svg, LY.lGone[0], LY.lGone[1] + 15, String(F.gone), { class: 'w01b-n w01b-lv', 'text-anchor': 'middle' });
    T(svg, LY.lBlood[0], LY.lBlood[1], L('dopamina no sangue', 'dopamine in blood'), { class: 'w01b-sm', 'text-anchor': 'middle' });
    B.nBlood = T(svg, LY.lBlood[0], LY.lBlood[1] + 15, String(F.blood), { class: 'w01b-n w01b-da', 'text-anchor': 'middle' });
    T(svg, LY.lBrain[0], LY.lBrain[1], L('viram dopamina no cérebro', 'become dopamine in the brain'), { class: 'w01b-sm' });
    T(svg, LY.cntL[0], LY.cntL[1], L('chegam ao cérebro', 'reach the brain'), { class: 'w01b-sm', 'text-anchor': 'end' });
    B.cnt = T(svg, LY.cnt[0], LY.cnt[1], '', { class: 'w01b-big', 'text-anchor': 'end' });
    B.g = S('g', {}, svg); B.gc = S('g', {}, svg);
    svg.setAttribute('aria-label', o.carb
      ? L('Com carbidopa: de 100 moléculas de levodopa, 22 chegam ao cérebro, 6 viram dopamina no sangue e 72 são eliminadas.', 'With carbidopa: of 100 levodopa molecules, 22 reach the brain, 6 become dopamine in the blood and 72 are cleared.')
      : L('Sem carbidopa: de 100 moléculas de levodopa, 5 chegam ao cérebro, 80 viram dopamina no sangue e 15 são eliminadas.', 'Without carbidopa: of 100 levodopa molecules, 5 reach the brain, 80 become dopamine in the blood and 15 are cleared.'));
    resetDots(o, true);
  }
  function styleDot(el, s) {
    if (s === 'X') { el.setAttribute('fill', '#fff'); el.setAttribute('stroke', LV); el.setAttribute('stroke-width', '1.2'); el.setAttribute('opacity', '.75'); }
    else { el.setAttribute('stroke', 'none'); el.setAttribute('opacity', 1); el.setAttribute('fill', s === 'L' ? LV : C.dopa); }
  }
  function posAt(w, t) {
    if (t <= w[0].t) return { p: w[0].p, s: w[0].s, pre: true };
    for (var i = 1; i < w.length; i++) {
      if (t < w[i].t) {
        var k = (t - w[i - 1].t) / (w[i].t - w[i - 1].t), e = k * k * (3 - 2 * k);
        return { p: { x: w[i - 1].p.x + (w[i].p.x - w[i - 1].p.x) * e, y: w[i - 1].p.y + (w[i].p.y - w[i - 1].p.y) * e }, s: k > 0.55 ? w[i].s : w[i - 1].s };
      }
    }
    var l = w[w.length - 1]; return { p: l.p, s: l.s, done: true };
  }
  function resetDots(o, finalState) {
    o.B.g.innerHTML = ''; o.B.gc.innerHTML = '';
    o.dots = plan(o).map(function (d) { d.el = S('circle', { r: 3.4 }, o.B.g); return d; });
    o.cs = planCarbs(o).map(function (d) { d.el = S('rect', { width: 6, height: 6, class: 'w01b-carb' }, o.B.gc); return d; });
    renderB(o, finalState ? 1e9 : 0);
  }
  function renderB(o, t) {
    var n = { brain: 0, blood: 0, gone: 0 };
    o.dots.forEach(function (d) {
      var q = posAt(d.w, t);
      d.el.setAttribute('cx', q.p.x.toFixed(1)); d.el.setAttribute('cy', q.p.y.toFixed(1));
      d.el.style.visibility = q.pre ? 'hidden' : 'visible';
      styleDot(d.el, q.s);
      if (q.done) n[d.f]++;
    });
    o.cs.forEach(function (d) {
      var q = posAt(d.w, t);
      d.el.setAttribute('x', (q.p.x - 3).toFixed(1)); d.el.setAttribute('y', (q.p.y - 3).toFixed(1));
      d.el.setAttribute('transform', 'rotate(45 ' + q.p.x.toFixed(1) + ' ' + q.p.y.toFixed(1) + ')');
      d.el.style.visibility = q.pre ? 'hidden' : 'visible';
    });
    o.B.cnt.textContent = L(n.brain + ' de 100', n.brain + ' of 100');
    o.B.nGone.textContent = n.gone; o.B.nBlood.textContent = n.blood;
    var ap = Math.min(1, n.blood / 40);
    o.B.apGlow.style.opacity = (ap * 0.9).toFixed(2);
    o.B.ap.style.fill = ap > 0.5 ? C.dopa : '#fff';
    o.B.apLab.style.fill = ap > 0.5 ? C.ink : C.mid;
    return n;
  }
  var trips = [Trip(tripGrid, false), Trip(tripGrid, true)], rafB = 0, t0B = 0;
  function tickB(now) {
    rafB = 0;
    var t = (now - t0B) / 1000, done = true;
    trips.forEach(function (o) { var n = renderB(o, t); if (n.brain + n.blood + n.gone < 100) done = false; });
    if (done && t > 3.2) return;
    rafB = requestAnimationFrame(tickB);
  }
  function play() {
    cancelAnimationFrame(rafB); rafB = 0;
    trips.forEach(function (o) { resetDots(o, DN.RM); });
    if (DN.RM) return;
    t0B = performance.now(); rafB = requestAnimationFrame(tickB);
  }
  bDose.addEventListener('click', play);

  /* ---------------- text ---------------- */
  function relabel() {
    paHead.textContent = L('A · o gargalo', 'A · the bottleneck');
    pbHead.textContent = L('B · do comprimido ao cérebro, 100 moléculas de levodopa', 'B · from the pill to the brain, 100 levodopa molecules');
    takeA.textContent = L('Quatro vezes mais tirosina sobe a produção só de 100 para ' + V_4 + ', porque a tirosina hidroxilase já trabalha perto do máximo. A L-DOPA entra depois desse gargalo e a produção vai a ' + V_L + '.',
      'Four times the tyrosine raises production only from 100 to ' + V_4 + ', because tyrosine hydroxylase already works near its maximum. L-DOPA enters after this bottleneck and production goes to ' + V_L + '.');
    takeB.textContent = L('Sem carbidopa, a maior parte da levodopa vira dopamina antes de chegar ao cérebro, e só 5 de 100 moléculas chegam. Com carbidopa, chegam 22, cerca de quatro vezes mais, e a dose pode ser menor.',
      'Without carbidopa, most of the levodopa turns into dopamine before it reaches the brain, and only 5 of 100 molecules arrive. With carbidopa, 22 arrive, about four times more, so the dose can be smaller.');
    note.innerHTML = '<span><i class="br"></i>' + L('no cérebro', 'in the brain') + '</span>' +
      '<span><i class="bl"></i>' + L('dopamina fora do cérebro', 'dopamine outside the brain') + '</span>' +
      '<span><i class="go"></i>' + L('levodopa eliminada', 'levodopa cleared') + '</span>' +
      '<span><i class="cb"></i>carbidopa</span>' +
      '<span class="w01b-schem">' + L('contagem esquemática', 'schematic count') + '</span>';
    bDose.textContent = L('ver a dose de novo', 'replay the dose');
  }
  function renderAll() {
    relabel();
    buildChart(); buildPipe(); buildBars();
    mols.forEach(function (o) { o.el.remove(); }); mols = [];
    trips.forEach(buildTrip);
  }
  renderAll();
  DN.onLang(function () { cancelAnimationFrame(rafB); rafB = 0; renderAll(); });
  DN.onVisible(pa, function (v) { visA = v; if (v) wakeA(); });
  var playedOnce = false;
  DN.onVisible(pb, function (v) { if (v && !playedOnce && !DN.RM) { playedOnce = true; play(); } }, { threshold: 0.3 });
})();
