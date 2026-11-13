/* c03 · um-dia-de-habitos : each habit drawn at its hour, as a change on the cortisol curve */
(function () {
  'use strict';
  var root = DN.body('c03'); if (!root) return;
  var host = root.parentNode;
  var L = DN.L, fmt = DN.fmt, C = DN.COL, CC = DN.cortCurve, RS = DN.cortRiso;
  var P = 'c03r-';

  function f1(n) { return Math.round(n * 10) / 10; }
  function pc(n, d) { return (n > 0 ? '+' : '') + fmt(n, d) + '%'; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  var LN2 = Math.LN2, HL = CC.HALF_LIFE;
  function decay(v, dt) { return v * Math.exp(-LN2 * dt / HL); }

  /* ---------- the habits, in hours since 06:00 (t = 0 is 06:00, t = 24 is 06:00 next day) ---------- */
  var TR = [
    { k: 'acordar', st: 'despertador', at: 0.5,
      name: function () { return L('acordar', 'waking up'); },
      when: function () { return '06:30'; } },
    { k: 'luz', st: 'sol', at: 0,
      name: function () { return L('luz forte de manhã', 'bright morning light'); },
      when: function () { return L('05:00 a 08:00', '05:00 to 08:00'); } },
    { k: 'cafe', st: 'xicara', at: 3,
      name: function () { return L('café da manhã', 'morning coffee'); },
      when: function () { return '09:00'; } },
    { k: 'cafe2', st: 'xicara', at: 7, seed: 3,
      name: function () { return L('café da tarde', 'afternoon coffee'); },
      when: function () { return L('13:00 a 19:00', '13:00 to 19:00'); } },
    { k: 'almoco', st: 'prato', at: 7,
      name: function () { return L('almoço', 'lunch'); },
      when: function () { return '13:00'; } },
    { k: 'treino', st: 'tenis', at: 12,
      name: function () { return L('treino de 30 min', '30 min workout'); },
      when: function () { return '18:00'; }, tall: true },
    { k: 'noite', st: 'travesseiro', at: 12,
      name: function () { return L('depois de uma noite curta', 'after a short night'); },
      when: function () { return L('18:00 a 23:00', '18:00 to 23:00'); }, below: true }
  ];
  var SIDE = [
    { st: 'pratoVazio', h: function () { return L('jejum', 'fasting'); },
      t: function () { return L('O jejum sobe o cortisol de forma forte, e uma restrição moderada de calorias não sobe; o efeito volta ao normal em semanas.', 'Fasting raises cortisol strongly, and a moderate calorie cut does not; the effect returns to normal within weeks.'); },
      src: function () { return 'Nakamura et al. 2016'; } },
    { st: 'pao', h: function () { return L('dieta pobre em carboidratos', 'low carbohydrate diet'); },
      t: function () { return L('Sobe o cortisol de repouso nas 3 primeiras semanas (SMD 0,41) e depois deixa de subir.', 'It raises resting cortisol in the first 3 weeks (SMD 0.41) and then stops raising it.'); },
      src: function () { return L('Whittaker e Harris 2022', 'Whittaker and Harris 2022'); }, strip: { n: 6, on: [1, 2, 3], unit: function () { return L('semana', 'week'); }, col: 'alta' } },
    { st: 'copo', h: function () { return L('álcool', 'alcohol'); },
      t: function () { return L('O uso pesado e a abstinência sobem o cortisol, e o uso crônico faz o cortisol subir menos num estresse.', 'Heavy drinking and withdrawal raise cortisol, and chronic use makes cortisol rise less under stress.'); },
      src: function () { return L('meta-análise de 2023', '2023 meta-analysis'); } },
    { st: 'cigarro', h: function () { return L('cigarro', 'smoking'); },
      t: function () { return L('Fumantes têm cortisol mais alto ao longo do dia e no despertar.', 'Smokers have higher cortisol through the day and on waking.'); },
      src: function () { return L('Steptoe e Ussher', 'Steptoe and Ussher'); } },
    { st: 'aviao', h: function () { return L('voo para o leste, 7 h de fuso', 'flight east, 7 h time shift'); },
      t: function () { return L('O cortisol ao acordar fica abaixo do normal do 2º ao 9º dia.', 'Cortisol on waking stays below normal from day 2 to day 9.'); },
      src: function () { return L('Piérard et al. 2001, 27 militares', 'Piérard et al. 2001, 27 soldiers'); }, strip: { n: 10, on: [2, 3, 4, 5, 6, 7, 8, 9], unit: function () { return L('dia', 'day'); }, col: 'baixa' } }
  ];

  /* ---------- DOM ---------- */
  root.innerHTML = RS.defs(P) +
    '<p class="c03-read"></p>' +
    '<div class="c03-grid">' +
    '  <div class="c03-main">' +
    '    <div class="c03-A"></div>' +
    '    <div class="c03-legend" aria-hidden="true"></div>' +
    '    <div class="c03-tracks"></div>' +
    '    <div class="c03-cursor" aria-hidden="true"><span class="c03-cur-t"></span></div>' +
    '  </div>' +
    '  <aside class="c03-side"><div class="c03-side-h"></div><div class="c03-side-l"></div></aside>' +
    '</div>' +
    '<ol class="sr c03-sr"></ol>';
  var read = root.querySelector('.c03-read');
  var main = root.querySelector('.c03-main');
  var boxA = root.querySelector('.c03-A');
  var legend = root.querySelector('.c03-legend');
  var tracksEl = root.querySelector('.c03-tracks');
  var cursor = root.querySelector('.c03-cursor');
  var curT = root.querySelector('.c03-cur-t');
  var sideH = root.querySelector('.c03-side-h');
  var sideL = root.querySelector('.c03-side-l');
  var srList = root.querySelector('.c03-sr');

  var G = {};
  var trEls = [];

  function stampAt(key, x, y, s, opt) {
    return RS.stamp(key, P, opt).replace('<svg ', '<svg x="' + f1(x) + '" y="' + f1(y) + '" width="' + s + '" height="' + s + '" ');
  }
  function txt(x, y, s, cls, anchor) {
    return '<text x="' + f1(x) + '" y="' + f1(y) + '" class="' + cls + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + '>' + esc(s) + '</text>';
  }
  function poly(pts) { return pts.map(function (p, i) { return (i ? 'L' : 'M') + f1(p[0]) + ',' + f1(p[1]); }).join(''); }

  /* ---------- panel A: the baseline day ---------- */
  function drawA() {
    var W = G.W, mob = G.mob;
    var x0 = G.x0, pw = G.pw;
    var top = mob ? 30 : 34, AH = mob ? 150 : 178, bot = 30;
    var H = top + AH + bot;
    G.aTop = top; G.aH = AH;
    function X(t) { return x0 + t / 24 * pw; }
    function Y(v) { return top + AH - v / 19 * AH; }
    G.AX = X; G.AY = Y;
    var s = '';
    var gst = '';
    CC.stops(CC.base).forEach(function (o) { gst += '<stop offset="' + o.o.toFixed(3) + '" stop-color="' + o.c + '"/>'; });
    s += '<defs><linearGradient id="c03-grad" gradientUnits="userSpaceOnUse" x1="' + x0 + '" x2="' + (x0 + pw) + '" y1="0" y2="0">' + gst + '</linearGradient></defs>';
    /* low stretch of the night */
    var q0 = CC.QUIET[0] - 6, q1 = CC.QUIET[1] + 24 - 6;
    s += '<rect class="c03-q" x="' + f1(X(q0)) + '" y="' + (top - 6) + '" width="' + f1(X(q1) - X(q0)) + '" height="' + (AH + 6) + '"/>';
    /* grid */
    [0, 5, 10, 15].forEach(function (v) {
      s += '<line class="c03-gy' + (v ? '' : ' c03-g0') + '" x1="' + x0 + '" x2="' + (x0 + pw) + '" y1="' + f1(Y(v)) + '" y2="' + f1(Y(v)) + '"/>';
      s += txt(x0 - (mob ? 4 : 8), Y(v) + 3.5, fmt(v), 'c03-tk', 'end');
    });
    for (var h = 0; h <= 24; h += 3) {
      s += '<line class="c03-gx" x1="' + f1(X(h)) + '" x2="' + f1(X(h)) + '" y1="' + top + '" y2="' + (top + AH) + '"/>';
      if (!mob || h % 6 === 0) s += txt(X(h), top + AH + 17, CC.hhmm(h + 6), 'c03-hr', h === 0 ? 'start' : h === 24 ? 'end' : 'middle');
    }
    /* curve and soft area */
    var d = '', i, N = 192;
    for (i = 0; i <= N; i++) { var t = i / N * 24; d += (i ? 'L' : 'M') + f1(X(t)) + ',' + f1(Y(CC.base(t + 6))); }
    s += '<path class="c03-area" d="' + d + 'L' + f1(X(24)) + ',' + f1(Y(0)) + 'L' + f1(X(0)) + ',' + f1(Y(0)) + 'Z" fill="url(#c03-grad)"/>';
    s += '<path class="c03-curve" d="' + d + '" stroke="url(#c03-grad)"/>';
    /* peak */
    var px = X(CC.PEAK.h - 6), py = Y(CC.PEAK.v);
    s += '<circle class="c03-pk" cx="' + f1(px) + '" cy="' + f1(py) + '" r="3.6" fill="' + C.alta + '"/>';
    s += '<text x="' + f1(px - 4) + '" y="' + f1(py - 11) + '" class="c03-lb c03-lb-a">' + esc(mob ? L('15,5 µg/dL', '15.5 µg/dL') : L('pico 15,5 µg/dL', 'peak 15.5 µg/dL')) +
      '<tspan class="c03-lb2t" dx="7">' + esc(L('às 08:32', 'at 08:32')) + '</tspan></text>';
    /* trough with the moon */
    var tx = X(CC.TROUGH.h + 24 - 6), ty = Y(CC.TROUGH.v);
    s += '<circle cx="' + f1(tx) + '" cy="' + f1(ty) + '" r="3.6" fill="' + C.baixa + '"/>';
    var ms = mob ? 24 : 30;
    s += '<g class="c03-moon">' + stampAt('lua', tx - ms / 2, ty - ms - 14, ms) + '</g>';
    if (mob) {
      s += txt(tx, ty - ms - 22, L('00:18 · vale', '00:18 · low'), 'c03-lb c03-lb-b', 'middle');
    } else {
      s += txt(tx, ty - ms - 36, L('00:18 · o vale', '00:18 · the low point'), 'c03-lb c03-lb-b', 'middle');
      s += txt(tx, ty - ms - 22, L('o ponto mais baixo do dia', 'the lowest point of the day'), 'c03-lb2', 'middle');
    }
    /* labels: axis and band */
    s += txt(0, top - 14, L('cortisol no sangue, µg/dL', 'blood cortisol, µg/dL'), 'c03-ax', 'start');
    s += txt(X(q0) + 6, top + 9, mob ? L('noite baixa', 'low night') : L('cortisol baixo, 19:43 a 05:31', 'low cortisol, 19:43 to 05:31'), 'c03-qt');
    s += txt(mob ? X(24) : X(24), top - 14, L('Debono et al. 2009', 'Debono et al. 2009'), 'c03-src', 'end');
    /* moving dot of the scroll cursor */
    s += '<circle class="c03-cdot" r="4.5" cx="-20" cy="-20"/>';
    boxA.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="' + esc(L(
      'Curva de base do cortisol no sangue das 06:00 às 06:00: pico de 15,5 µg/dL às 08:32, queda ao longo do dia, período baixo das 19:43 às 05:31 e vale abaixo de 2 µg/dL às 00:18.',
      'Baseline blood cortisol curve from 06:00 to 06:00: peak of 15.5 µg/dL at 08:32, a fall through the day, a low stretch from 19:43 to 05:31 and a low point under 2 µg/dL at 00:18.')) + '">' + s + '</svg>';
    G.cdot = boxA.querySelector('.c03-cdot');
  }

  /* ---------- one habit track ---------- */
  var PH = 52, K = PH / 165;
  function drawTrack(tr, el) {
    var mob = G.mob, pw = G.pw;
    function X(t) { return t / 24 * pw; }
    var top = tr.tall && !mob ? 14 : 4;
    var z = top + PH;                     /* y of the 0% line */
    var H = z + (tr.below ? (mob ? 22 : 24) : 8);
    function Y(p) { return z - p * K; }
    var s = '', notes = [];
    for (var h = 0; h <= 24; h += 3) s += '<line class="c03-gx" x1="' + f1(X(h)) + '" x2="' + f1(X(h)) + '" y1="' + (top - 4) + '" y2="' + z + '"/>';
    [50, 100, 150].forEach(function (p) { s += '<line class="c03-gp" x1="0" x2="' + f1(pw) + '" y1="' + f1(Y(p)) + '" y2="' + f1(Y(p)) + '"/>'; });
    if (tr.k === 'acordar') [50, 100, 150].forEach(function (p) { s += txt(pw - 1, Y(p) + 3.5, '+' + p + '%', 'c03-gpt', 'end'); });
    function band(fnLo, fnHi, t0, t1, cls) {
      var up = [], lo = [], n = Math.max(8, Math.round((t1 - t0) * 12));
      for (var i = 0; i <= n; i++) { var t = t0 + (t1 - t0) * i / n; up.push([X(t), Y(fnHi(t))]); lo.unshift([X(t), Y(fnLo(t))]); }
      return '<path class="' + cls + '" d="' + poly(up.concat(lo)) + 'Z"/>';
    }
    function line(fn, t0, t1, cls) {
      var pts = [], n = Math.max(8, Math.round((t1 - t0) * 12));
      for (var i = 0; i <= n; i++) { var t = t0 + (t1 - t0) * i / n; pts.push([X(t), Y(fn(t))]); }
      return '<path class="' + cls + '" d="' + poly(pts) + '"/>';
    }
    function zero() { return 0; }
    function lab(x, y, str, cls, anchor) { s += txt(x, y, str, cls, anchor); notes.push({ s: str, c: cls }); }
    var lx;

    if (tr.k === 'acordar') {
      /* +50% to +160% in the first half hour (Clow 2004); the fall after it is drawn with the 66 min half-life */
      var car = function (a) {
        return function (t) {
          if (t <= 0.5) return 0;
          if (t <= 1) return a * (t - 0.5) / 0.5;
          if (t <= 1.25) return a;
          return decay(a, t - 1.25);
        };
      };
      s += '<rect class="c03-win" x="' + f1(X(0.5)) + '" y="' + (top - 4) + '" width="' + f1(X(1) - X(0.5)) + '" height="' + (z - top + 4) + '"/>';
      s += band(car(50), car(160), 0.5, 1.25, 'c03-f');
      s += band(car(50), car(160), 1.25, 4.5, 'c03-fi');
      s += line(car(160), 0.5, 1.25, 'c03-l');
      s += line(car(50), 0.5, 1.25, 'c03-l');
      s += line(car(160), 1.25, 4.5, 'c03-ld');
      s += line(car(50), 1.25, 4.5, 'c03-ld');
      lx = X(2.55);
      lab(lx, top + 9, L('+50% a +160% na primeira meia hora', '+50% to +160% in the first half hour'), 'c03-n1');
      lab(lx, top + 22, L('Clow et al. 2004, saliva', 'Clow et al. 2004, saliva'), 'c03-ns');
    }
    if (tr.k === 'luz') {
      /* +50% with 5,000 lux and +35% with 800 lux from 05:00 to 08:00 (Leproult 2001); nothing in the afternoon */
      var lt = function (a) { return function (t) { return t <= 2 ? a : decay(a, t - 2); }; };
      s += '<rect class="c03-win" x="0" y="' + (top - 4) + '" width="' + f1(X(2)) + '" height="' + (z - top + 4) + '"/>';
      s += band(zero, lt(50), 0, 2, 'c03-f');
      s += band(zero, lt(50), 2, 5, 'c03-fi');
      s += line(lt(50), 0, 2, 'c03-l');
      s += line(lt(35), 0, 2, 'c03-l2');
      s += line(lt(50), 2, 5, 'c03-ld');
      lx = X(2.55);
      lab(lx, top + 9, L('+50% com 5.000 lux', '+50% with 5,000 lux'), 'c03-n1');
      lab(lx, top + 22, L('+35% com 800 lux', '+35% with 800 lux'), 'c03-n2');
      lab(lx, top + 35, L('Leproult et al. 2001', 'Leproult et al. 2001'), 'c03-ns');
      var gx = X(9), gs = mob ? 20 : 24;
      s += '<line class="c03-zero" x1="' + f1(X(7.5)) + '" x2="' + f1(X(10.5)) + '" y1="' + z + '" y2="' + z + '"/>';
      s += '<g class="c03-gstamp">' + stampAt('solTarde', gx - gs / 2, z - gs - 6, gs, { grey: true }) + '</g>';
      if (!mob) {
        s += txt(gx + gs / 2 + 6, z - 18, L('a mesma luz à tarde:', 'the same light in the afternoon:'), 'c03-ng');
        s += txt(gx + gs / 2 + 6, z - 5, L('nada', 'nothing'), 'c03-ng c03-ngb');
      }
      notes.push({ s: L('15:00 · a mesma luz à tarde: nada', '15:00 · the same light in the afternoon: nothing'), c: 'c03-ng' });
    }
    if (tr.k === 'cafe') {
      /* Lovallo 2005: in people who skip coffee, a dose raises it (size not in the abstract);
         in daily drinkers the 09:00 dose does nothing, and the 13:00 dose still raises it from 13:00 to 19:00 */
      var bump = function (c, a, w) { return function (t) { var u = (t - c) / w; return a * Math.exp(-u * u); }; };
      s += band(zero, bump(4.0, 26, 0.8), 3, 6, 'c03-fd');
      s += line(bump(4.0, 26, 0.8), 3, 6, 'c03-ld');
      s += '<line class="c03-zero c03-zero-k" x1="' + f1(X(3)) + '" x2="' + f1(X(5.2)) + '" y1="' + z + '" y2="' + z + '"/>';
      lx = X(5.6);
      lab(lx, top + 22, L('quem não toma café: sobe', 'people who skip coffee: rises'), 'c03-n1 c03-n1d');
      lab(lx, top + 35, L('quem toma todo dia: nada', 'daily drinkers: nothing'), 'c03-n2');
      lab(lx, top + 48, L('Lovallo et al. 2005, tamanho não publicado', 'Lovallo et al. 2005, size not published'), 'c03-ns');
    }
    if (tr.k === 'cafe2') {
      var pl = function (t) { var a = 22; if (t < 7.4) return a * (t - 7) / 0.4; if (t > 13) return decay(a, t - 13); return a; };
      s += band(zero, pl, 7, 15, 'c03-fd');
      s += line(pl, 7, 15, 'c03-ld');
      var ax = X(7);
      lab(ax, top + 9, L('ainda sobe em quem toma todo dia', 'still rises in daily drinkers'), 'c03-n1 c03-n1d');
      lab(ax, top + 22, L('Lovallo et al. 2005, tamanho não publicado', 'Lovallo et al. 2005, size not published'), 'c03-ns');
    }
    if (tr.k === 'almoco') {
      var lb = function (t) { var u = (t - 7.6) / 0.6; return 24 * Math.exp(-u * u); };
      s += band(zero, lb, 6.6, 9.4, 'c03-fd');
      s += line(lb, 6.6, 9.4, 'c03-ld');
      lx = X(8.9);
      lab(lx, top + 22, L('um pico pequeno, de tamanho não publicado', 'a small peak, size not published'), 'c03-n1 c03-n1d');
      lab(lx, top + 35, L('Lovallo et al. 2006; Bhake et al. 2020', 'Lovallo et al. 2006; Bhake et al. 2020'), 'c03-ns');
    }
    if (tr.k === 'treino') {
      /* Hill 2008: 30 min at 40%, 60% and 80% of maximal oxygen uptake */
      s += '<rect class="c03-win" x="' + f1(X(12)) + '" y="' + (top - 4) + '" width="' + f1(X(12.5) - X(12)) + '" height="' + (z - top + 4) + '"/>';
      var bw = mob ? 4 : 5, gap = mob ? 1.5 : 2.5, cx = X(12.5) + bw * 0.5 + 3;
      var tail = function (t) { return decay(83.1, t - 12.5); };
      s += line(tail, 12.5, 16.5, 'c03-ld');
      [[5.7, 'c03-bar-g'], [39.9, 'c03-bar'], [83.1, 'c03-bar']].forEach(function (b, i) {
        var bx = cx + (i - 1) * (bw + gap) - bw / 2;
        s += '<rect class="' + b[1] + '" x="' + f1(bx) + '" y="' + f1(Y(b[0])) + '" width="' + bw + '" height="' + f1(Math.max(1, b[0] * K)) + '"/>';
      });
      lx = X(14.15);
      lab(lx, top - 2, L('a 80% do máximo: +83,1%', 'at 80% of max: +83.1%'), 'c03-n1');
      lab(lx, top + 11, L('a 60%: +39,9%', 'at 60%: +39.9%'), 'c03-n2');
      lab(lx, top + 24, L('a 40%: +5,7%, igual a zero', 'at 40%: +5.7%, same as zero'), 'c03-ng');
      lab(lx, top + 37, L('Hill et al. 2008, 12 homens', 'Hill et al. 2008, 12 men'), 'c03-ns');
    }
    if (tr.k === 'noite') {
      /* Leproult 1997: 18:00 to 23:00 the next day, +37% after 04:00 to 08:00 in bed, +45% after no sleep;
         the low stretch of the night starts at least 1 h later */
      var pt = function (a) { return function (t) { if (t < 12) return a * Math.max(0, (t - 11.85) / 0.15); if (t > 17) return a * Math.max(0, 1 - (t - 17) / 0.15); return a; }; };
      s += band(zero, pt(37), 11.85, 17.15, 'c03-f c03-f-night');
      s += line(pt(37), 11.85, 17.15, 'c03-l');
      s += line(pt(45), 11.85, 17.15, 'c03-l3');
      var rx = X(11.7);
      lab(rx, top + 22, L('+37% depois de dormir das 4h às 8h', '+37% after sleeping 4 am to 8 am'), 'c03-n1', 'end');
      lab(rx, top + 35, L('+45% depois de uma noite em claro', '+45% after a night with no sleep'), 'c03-n2', 'end');
      lab(rx, top + 48, L('Leproult et al. 1997', 'Leproult et al. 1997'), 'c03-ns', 'end');
      var a0 = X(CC.QUIET[0] - 6), a1 = X(CC.QUIET[0] + 1 - 6), ay = z + 12;
      s += '<path class="c03-arw" d="M' + f1(a0) + ',' + (ay - 5) + 'V' + (ay + 5) + 'M' + f1(a0) + ',' + ay + 'H' + f1(a1 - 1) + '"/>';
      s += '<path class="c03-arwh" d="M' + f1(a1) + ',' + ay + 'l-5,-3.5v7Z"/>';
      if (!mob) s += txt(a0 - 6, ay + 4, L('o período de cortisol baixo começa 1 h mais tarde', 'the low cortisol stretch starts 1 h later'), 'c03-nb', 'end');
      notes.push({ s: L('o período de cortisol baixo começa 1 h mais tarde', 'the low cortisol stretch starts 1 h later'), c: 'c03-nb' });
    }
    s += '<line class="c03-z" x1="0" x2="' + f1(pw) + '" y1="' + z + '" y2="' + z + '"/>';
    el.plot.innerHTML = '<svg viewBox="0 0 ' + f1(pw) + ' ' + H + '" width="' + f1(pw) + '" height="' + H + '" aria-hidden="true">' + s + '</svg>';
    el.notes.innerHTML = mob ? notes.map(function (n) { return '<span class="' + n.c.replace(/c03-/g, 'c03-h') + '">' + esc(n.s) + '</span>'; }).join('') : '';
  }

  function buildTracks() {
    tracksEl.innerHTML = '';
    trEls = TR.map(function (tr, i) {
      var row = DN.el('div', { class: 'c03-tr c03-tr-' + tr.k + ' pre' }, tracksEl);
      var gut = DN.el('div', { class: 'c03-gut' }, row);
      var sw = DN.el('span', { class: 'c03-stamp' }, gut, RS.stamp(tr.st, P, { seed: tr.seed || 0 }));
      var tx = DN.el('span', { class: 'c03-gt' }, gut);
      var when = DN.el('span', { class: 'c03-when' }, tx);
      var name = DN.el('span', { class: 'c03-name' }, tx);
      var plot = DN.el('div', { class: 'c03-plot' }, row);
      var notes = DN.el('div', { class: 'c03-notes' }, row);
      return { row: row, stamp: sw, when: when, name: name, plot: plot, notes: notes, on: false };
    });
  }

  function drawSide() {
    sideH.textContent = L('sem hora fixa', 'no fixed hour');
    sideL.innerHTML = SIDE.map(function (it, i) {
      var strip = '';
      if (it.strip) {
        var cells = '';
        for (var d = 1; d <= it.strip.n; d++) cells += '<span class="c03-cell' + (it.strip.on.indexOf(d) >= 0 ? ' on c03-' + it.strip.col : '') + '"></span>';
        strip = '<span class="c03-strip" aria-hidden="true"><span class="c03-cells">' + cells + '</span><span class="c03-strip-l"><span>' + it.strip.unit() + ' 1</span><span>' + it.strip.n + '</span></span></span>';
      }
      return '<div class="c03-sc"><span class="c03-sst">' + RS.stamp(it.st, P, { seed: i }) + '</span>' +
        '<span class="c03-sb"><b>' + esc(it.h()) + '</b><span class="c03-st">' + esc(it.t()) + '</span>' + strip +
        '<span class="c03-ssrc">' + esc(it.src()) + '</span></span></div>';
    }).join('');
  }

  function drawLegend() {
    legend.innerHTML =
      '<span class="c03-lg-h">' + esc(L('quanto cada hábito sobe o cortisol daquela hora', 'how much each habit raises cortisol at that hour')) + '</span>' +
      '<span class="c03-lg"><i class="c03-sw c03-sw-s"></i>' + esc(L('número publicado', 'published number')) + '</span>' +
      '<span class="c03-lg"><i class="c03-sw c03-sw-d"></i>' + esc(L('forma ilustrativa, sem número publicado', 'illustrative shape, no published number')) + '</span>';
  }

  function drawSR() {
    var items = [
      L('06:30, acordar: o cortisol sobe de 50% a 160% na primeira meia hora (Clow 2004).', '06:30, waking up: cortisol rises 50% to 160% in the first half hour (Clow 2004).'),
      L('05:00 a 08:00, luz forte: o pico fica 50% mais alto com 5.000 lux e 35% com 800 lux (Leproult 2001). A mesma luz à tarde não muda nada.', '05:00 to 08:00, bright light: the peak is 50% higher with 5,000 lux and 35% with 800 lux (Leproult 2001). The same light in the afternoon changes nothing.'),
      L('09:00, café: sobe em quem não toma café; não muda nada em quem toma todo dia (Lovallo 2005).', '09:00, coffee: raises it in people who skip coffee; changes nothing in daily drinkers (Lovallo 2005).'),
      L('13:00, almoço: um pico pequeno, de tamanho não publicado (Lovallo 2006; Bhake 2020).', '13:00, lunch: a small peak, size not published (Lovallo 2006; Bhake 2020).'),
      L('13:00 a 19:00, café da tarde: ainda sobe em quem toma todo dia (Lovallo 2005).', '13:00 to 19:00, afternoon coffee: still raises it in daily drinkers (Lovallo 2005).'),
      L('18:00, treino de 30 minutos: +5,7% a 40% do máximo, +39,9% a 60% e +83,1% a 80% (Hill 2008).', '18:00, 30 minute workout: +5.7% at 40% of max, +39.9% at 60% and +83.1% at 80% (Hill 2008).'),
      L('18:00 a 23:00, depois de uma noite curta: +37% depois de dormir das 4h às 8h, +45% depois de uma noite em claro, e o período de cortisol baixo começa 1 hora mais tarde (Leproult 1997).', '18:00 to 23:00, after a short night: +37% after sleeping 4 am to 8 am, +45% after no sleep, and the low cortisol stretch starts 1 hour later (Leproult 1997).'),
      L('00:18, o vale: o ponto mais baixo do dia, abaixo de 2 µg/dL.', '00:18, the low point of the day, under 2 µg/dL.'),
      L('Sem hora fixa: jejum sobe de forma forte; dieta pobre em carboidratos sobe nas 3 primeiras semanas; álcool pesado e abstinência sobem; fumantes têm o dia todo mais alto; voo para o leste de 7 horas deixa o despertar abaixo do normal do 2º ao 9º dia.', 'No fixed hour: fasting raises it strongly; a low carbohydrate diet raises it in the first 3 weeks; heavy drinking and withdrawal raise it; smokers are higher all day; a 7 hour flight east leaves waking cortisol below normal from day 2 to day 9.')
    ];
    srList.innerHTML = items.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');
  }

  function render() {
    var W = main.clientWidth || 700;
    G.W = W; G.mob = W < 600;
    G.x0 = G.mob ? 20 : 150;
    G.pw = W - G.x0 - (G.mob ? 2 : 6);
    host.classList.toggle('c03-mob', G.mob);
    read.textContent = L(
      'Quase todo hábito do dia faz um calombo que se desfaz em uma ou duas horas, enquanto a noite curta sobe o cortisol nas horas em que ele deveria estar caindo.',
      'Almost every habit of the day makes a bump that fades within an hour or two, while a short night raises cortisol in the hours when it should be falling.');
    drawA();
    drawLegend();
    trEls.forEach(function (e, i) {
      e.when.textContent = TR[i].when();
      e.name.textContent = TR[i].name();
      drawTrack(TR[i], e);
    });
    drawSide();
    drawSR();
    G.dirty = true;
    tick(true);
  }

  /* ---------- the scroll moves the day ---------- */
  var vis = false, raf = 0, lastP = -1;
  function progress() {
    var r = main.getBoundingClientRect(), vh = window.innerHeight || 800;
    var start = vh * 0.82, end = vh * 0.3;
    return DN.clamp((start - r.top) / (r.height + start - end), 0, 1);
  }
  function tick(force) {
    raf = 0;
    var p = DN.RM ? 1 : progress();
    if (!force && Math.abs(p - lastP) < 0.0005) return;
    lastP = p;
    var t = p * 24;
    var done = p >= 0.999;
    trEls.forEach(function (e, i) {
      var on = done || t >= TR[i].at;
      if (on !== e.on || G.dirty) { e.on = on; e.row.classList.toggle('pre', !on); }
    });
    host.classList.toggle('c03-moonon', done || t >= CC.TROUGH.h + 24 - 6);
    G.dirty = false;
    if (done || DN.RM) { cursor.style.opacity = '0'; if (G.cdot) G.cdot.style.opacity = '0'; return; }
    cursor.style.opacity = p <= 0.001 ? '0' : '1';
    var x = G.x0 + t / 24 * G.pw;
    var trTop = tracksEl.offsetTop + tracksEl.offsetHeight;
    cursor.style.transform = 'translateX(' + f1(x) + 'px)';
    cursor.style.top = (G.aTop - 8) + 'px';
    cursor.style.height = (trTop - G.aTop + 8) + 'px';
    curT.textContent = CC.hhmm(t + 6);
    if (G.cdot) {
      var v = CC.base(t + 6);
      G.cdot.setAttribute('cx', f1(x)); G.cdot.setAttribute('cy', f1(G.AY(v)));
      G.cdot.setAttribute('fill', CC.inkFor(v));
      G.cdot.style.opacity = cursor.style.opacity;
    }
  }
  function onScroll() { if (vis && !raf) raf = requestAnimationFrame(function () { tick(false); }); }
  window.addEventListener('scroll', onScroll, { passive: true });
  DN.onVisible(root, function (v) { vis = v; if (v) onScroll(); }, { margin: '100px' });

  buildTracks();
  render();
  DN.onLang(render);
  var rt, lw = main.clientWidth;
  function onResize() {
    clearTimeout(rt);
    rt = setTimeout(function () { var w = main.clientWidth; if (w !== lw) { lw = w; render(); } }, 120);
  }
  if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(main);
  else window.addEventListener('resize', onResize);
})();
