/* c09 · monte-um-dia : drag habit stamps onto the day and watch the slope of the cortisol curve */
(function () {
  'use strict';
  var root = DN.body('c09'); if (!root) return;
  var host = root.parentNode;
  var L = DN.L, fmt = DN.fmt, C = DN.COL, CC = DN.cortCurve, RS = DN.cortRiso;
  var P = 'c09r-';
  function f1(n) { return Math.round(n * 10) / 10; }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function sm(x) { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); }

  /* ---------- the stamps ---------- */
  var KINDS = {
    acordar: { st: 'despertador', max: 1, def: [7],
      n: function () { return L('acordar', 'wake up'); },
      info: function () { return L('Acordar: +50% na primeira meia hora, em média, e o começo da subida acompanha a hora de acordar (Wüst et al. 2000).', 'Waking up: +50% in the first half hour on average, and the start of the rise follows the wake-up time (Wüst et al. 2000).'); } },
    luz: { st: 'sol', max: 1, def: [7],
      n: function () { return L('luz forte cedo', 'bright early light'); },
      info: function () { return L('Luz forte cedo: +50% no pico quando começa até as 8h, e à tarde não muda nada (Leproult et al. 2001).', 'Bright early light: +50% at the peak when it starts by 08:00, and nothing in the afternoon (Leproult et al. 2001).'); } },
    cafe: { st: 'xicara', max: 3, def: [9, 14, 16.5],
      n: function () { return L('café', 'coffee'); },
      info: function () { return L('Café, em quem toma todo dia: de manhã não muda nada, e à tarde faz um calombo. O estudo não publica o tamanho, e o calombo do modelo é ilustrativo (Lovallo et al. 2005).', 'Coffee, in daily drinkers: nothing in the morning, and a bump in the afternoon. The study does not publish its size, and the bump in the model is illustrative (Lovallo et al. 2005).'); } },
    banca: { st: 'banca', max: 2, def: [11, 16],
      n: function () { return L('banca', 'evaluation panel'); },
      info: function () { return L('Banca que avalia você: 2 a 4 vezes o valor da hora, com o pico 30 min depois. O modelo usa 3 vezes (Kirschbaum et al. 1993; Dickerson e Kemeny 2004).', 'A panel judging you: 2 to 4 times the value for that hour, peaking 30 min later. The model uses 3 times (Kirschbaum et al. 1993; Dickerson and Kemeny 2004).'); } },
    amigo: { st: 'amigo', max: 2, def: [11, 16],
      n: function () { return L('amigo na banca', 'friend at the panel'); },
      info: function () { return L('Amigo por perto: encolhe uma banca que esteja a até 1,5 h. O estudo não dá um número para isso, e o modelo corta o calombo pela metade (Heinrichs et al. 2003).', 'A friend nearby: shrinks a panel within 1.5 h. The study gives no number for this, and the model halves the bump (Heinrichs et al. 2003).'); } },
    forte: { st: 'tenis', max: 1, def: [18],
      n: function () { return L('treino forte', 'hard workout'); },
      info: function () { return L('Treino forte, 30 min a 80% do máximo: +83% ao fim do treino (Hill et al. 2008).', 'Hard workout, 30 min at 80% of max: +83% at the end (Hill et al. 2008).'); } },
    leve: { st: 'tenisLeve', max: 1, def: [18],
      n: function () { return L('treino leve', 'easy workout'); },
      info: function () { return L('Treino leve, 30 min a 40% do máximo: +5,7%, um valor igual a zero (Hill et al. 2008).', 'Easy workout, 30 min at 40% of max: +5.7%, the same as zero (Hill et al. 2008).'); } },
    noite: { st: 'travesseiro', max: 1, slot: true,
      n: function () { return L('noite curta', 'short night'); },
      info: function () { return L('Noite curta antes deste dia: +37% entre 18h e 23h, e o período de cortisol baixo começa 1 h mais tarde (Leproult et al. 1997).', 'A short night before this day: +37% from 18:00 to 23:00, and the low cortisol stretch starts 1 h later (Leproult et al. 1997).'); } },
    voo: { st: 'aviao', max: 1, slot: true,
      n: function () { return L('voo para o leste, 7 h', 'flight east, 7 h'); },
      info: function () { return L('Voo para o leste com 7 h de fuso: o modelo atrasa a curva inteira em 7 h em relação ao relógio, e o despertar fica baixo (Piérard et al. 2001).', 'Flight east across 7 time zones: the model delays the whole curve by 7 h against the clock, and waking cortisol is low (Piérard et al. 2001).'); } }
  };
  var ORDER = ['acordar', 'luz', 'cafe', 'banca', 'amigo', 'forte', 'leve', 'noite', 'voo'];
  var TYPICAL = [['acordar', 7], ['cafe', 9], ['cafe', 14], ['forte', 18]];
  var BED = 23;

  /* placed stamps: {id, k, t} with t in axis hours, 6 to 30 */
  var S = [], uid = 0;
  function add(k, t) { var s = { id: ++uid, k: k, t: t }; S.push(s); return s; }
  function count(k) { return S.filter(function (s) { return s.k === k; }).length; }
  TYPICAL.forEach(function (p) { add(p[0], p[1]); });

  /* ---------- the model ---------- */
  function bump(h, t0, amp, rise, hold) {
    if (h < t0) return 0;
    var dt = h - t0; if (dt < rise) return amp * dt / rise;
    dt -= rise; if (dt < hold) return amp;
    return amp * Math.exp(-Math.LN2 * (dt - hold) / CC.HALF_LIFE);
  }
  function wakeOf(st) { var w = 7; st.forEach(function (s) { if (s.k === 'acordar') w = s.t; }); return w; }
  function model(st) {
    var W = wakeOf(st), night = false, voo = false;
    st.forEach(function (s) { if (s.k === 'noite') night = true; if (s.k === 'voo') voo = true; });
    var d = Math.max(-2, Math.min(2.5, W - 7));
    function warp(h) {
      var w = h < 4 ? 0 : h < 6 ? sm((h - 4) / 2) : h < 10 ? 1 : h < 13 ? 1 - sm((h - 10) / 3) : 0;
      return h - d * w;
    }
    return function (h) {
      var v = CC.base(warp(h) - (voo ? 7 : 0)), f = 1;
      st.forEach(function (s) {
        var t = s.t, c = CC.wrap(t);
        if (s.k === 'acordar') f += bump(h, t, 0.5, 0.5, 0.25);
        else if (s.k === 'luz') { if (c >= 4 && c <= 8) f += bump(h, t, 0.5, 0.75, 1.25); }
        else if (s.k === 'cafe') { if (t >= 12) f += bump(h, t, 0.25, 1, 3); }
        else if (s.k === 'banca') {
          var amp = 2;
          if (st.some(function (o) { return o.k === 'amigo' && Math.abs(o.t - t) <= 1.5; })) amp = 1;
          f += bump(h, t, amp, 0.5, 0.33);
        }
        else if (s.k === 'forte') f += bump(h, t, 0.83, 0.5, 0);
      });
      if (night) {
        var n = h < 17.5 ? 0 : h < 18 ? sm((h - 17.5) / 0.5) : h < 23 ? 1 : h < 24.5 ? 1 - sm((h - 23) / 1.5) : 0;
        f *= 1 + 0.37 * n;
      }
      return v * f;
    };
  }
  /* slope from waking to bedtime, as in Whitehall II: log of the first 3 h after waking
     against log of the last hour before bed, per hour; reported as % of the measured curve */
  function rawSlope(st) {
    var Cf = model(st), W = wakeOf(st);
    function mean(a, b) { var s = 0, n = 48; for (var i = 0; i < n; i++) s += Cf(a + (b - a) * (i + 0.5) / n); return s / n; }
    return { s: (Math.log(mean(W, W + 3)) - Math.log(mean(BED - 1, BED))) / (BED - W), m: mean(W, W + 3), e: mean(BED - 1, BED), W: W };
  }
  var REF = rawSlope([{ k: 'acordar', t: 7 }]).s;
  function verdict(p) {
    if (p < 0) return { k: 'inv', c: L('invertida: a noite fica mais alta que a manhã', 'inverted: the night is higher than the morning') };
    if (p < 60) return { k: 'flat', c: L('plana: é o padrão que acompanhou mais doença no Whitehall II', 'flat: the pattern that went with more disease in Whitehall II') };
    if (p < 85) return { k: 'mid', c: L('menos íngreme', 'less steep') };
    return { k: 'steep', c: L('íngreme, como a curva medida', 'steep, like the measured curve') };
  }

  /* ---------- the reader's drawing from c02a ---------- */
  function readerCurve() {
    var raw = DN.store.get('draw', null);
    if (raw && !Array.isArray(raw)) raw = raw.pts || raw.points || raw.p || raw.d || null;
    if (!Array.isArray(raw) || raw.length < 2) return null;
    var pts = raw.map(function (p, i) {
      if (typeof p === 'number') return [6 + 24 * i / (raw.length - 1), p];
      if (Array.isArray(p)) return [p[0], p[1]];
      return [p.h != null ? p.h : p.t != null ? p.t : p.x, p.v != null ? p.v : p.y];
    }).filter(function (p) { return isFinite(p[0]) && isFinite(p[1]); });
    if (pts.length < 2) return null;
    var xs = pts.map(function (p) { return p[0]; }), ys = pts.map(function (p) { return p[1]; });
    var xmax = Math.max.apply(null, xs), ymax = Math.max.apply(null, ys);
    /* hours since 06:00 (0 to 24) or clock hours 6 to 30, values in ug/dL or as a 0 to 1 fraction of 22 */
    if (xmax <= 24.01 && Math.min.apply(null, xs) < 5.5) pts.forEach(function (p) { p[0] += 6; });
    if (ymax <= 1.01) pts.forEach(function (p) { p[1] *= 22; });
    pts.sort(function (a, b) { return a[0] - b[0]; });
    return pts;
  }

  /* ---------- DOM ---------- */
  root.innerHTML = RS.defs(P) +
    '<p class="c09-read"></p>' +
    '<div class="c09-top"><div class="c09-slot" aria-label=""><span class="c09-slot-l"></span><span class="c09-slot-in"></span></div>' +
    '<div class="rowbtns c09-act"><button type="button" class="btn c09-typ"></button><button type="button" class="btn c09-clr"></button></div></div>' +
    '<div class="c09-row">' +
    '  <div class="c09-chart"><div class="c09-legend" aria-hidden="true"></div><div class="c09-pw"><div class="c09-svgw"></div><div class="c09-lane"></div><div class="c09-guide" aria-hidden="true"><span></span></div></div></div>' +
    '  <div class="c09-meter"></div>' +
    '</div>' +
    '<div class="c09-trayh"></div>' +
    '<div class="c09-tray" role="group"></div>' +
    '<p class="c09-info" aria-live="off"></p>' +
    '<div class="live c09-live" aria-live="polite"></div>';
  var read = root.querySelector('.c09-read');
  var slotEl = root.querySelector('.c09-slot'), slotL = root.querySelector('.c09-slot-l'), slotIn = root.querySelector('.c09-slot-in');
  var typB = root.querySelector('.c09-typ'), clrB = root.querySelector('.c09-clr');
  var chart = root.querySelector('.c09-chart'), legend = root.querySelector('.c09-legend');
  var svgw = root.querySelector('.c09-svgw'), lane = root.querySelector('.c09-lane');
  var guide = root.querySelector('.c09-guide'), guideT = guide.querySelector('span');
  var meterEl = root.querySelector('.c09-meter');
  var trayH = root.querySelector('.c09-trayh'), tray = root.querySelector('.c09-tray');
  var info = root.querySelector('.c09-info'), live = root.querySelector('.c09-live');

  var G = {}, cur = null, shown = null, anim = 0;
  var drawn = readerCurve();

  /* ---------- geometry ---------- */
  function layout() {
    var W = chart.clientWidth || 700;
    G.W = W; G.mob = W < 560;
    G.x0 = G.mob ? 26 : 34; G.x1 = W - (G.mob ? 4 : 10);
    G.st = G.mob ? 30 : 36;           /* stamp size in the lane */
    G.rowH = G.st + 4;
    G.ph = G.mob ? 176 : 236;         /* plot height */
  }
  function X(t) { return G.x0 + (t - 6) / 24 * (G.x1 - G.x0); }
  function T(x) { return 6 + (x - G.x0) / (G.x1 - G.x0) * 24; }
  function snap(t) { return Math.max(6, Math.min(29.75, Math.round(t * 4) / 4)); }

  function rows() {
    var placed = S.filter(function (s) { return !KINDS[s.k].slot; }).slice().sort(function (a, b) { return a.t - b.t; });
    var ends = [];
    placed.forEach(function (s) {
      var x = X(s.t), r = 0;
      while (ends[r] != null && x - ends[r] < G.st + 2) r++;
      ends[r] = x; s.row = r;
    });
    return Math.max(1, ends.length);
  }

  function compute() {
    var Cf = model(S), N = 192, ys = [];
    for (var i = 0; i <= N; i++) ys.push(Cf(6 + 24 * i / N) / CC.TROUGH.v);
    var sl = rawSlope(S);
    return { ys: ys, pct: sl.s / REF * 100, m: sl.m / CC.TROUGH.v, e: sl.e / CC.TROUGH.v, W: sl.W };
  }
  var refYs = (function () { var Cf = model([{ k: 'acordar', t: 7 }]), a = []; for (var i = 0; i <= 192; i++) a.push(Cf(6 + 24 * i / 192) / CC.TROUGH.v); return a; })();

  /* ---------- drawing ---------- */
  function ymaxFor(ys) { var m = Math.max.apply(null, ys.concat(refYs)); return Math.max(10, Math.ceil(m * 1.08 / 2) * 2); }
  function draw(st) {
    var nr = G.nr, laneH = nr * G.rowH + 8, top = laneH + 6, ph = G.ph, H = top + ph + 40;
    G.top = top; G.H = H; G.laneH = laneH;
    var ymax = st.ymax;
    function Y(v) { return top + ph - v / ymax * ph; }
    var flat = Math.max(0, Math.min(1, (85 - st.pct) / 45)) * 0.9;
    var s = '', i;
    var gst = '';
    for (i = 0; i <= 48; i++) gst += '<stop offset="' + (i / 48).toFixed(3) + '" stop-color="' + CC.inkFor(st.ys[i * 4] * CC.TROUGH.v, flat) + '"/>';
    s += '<defs><linearGradient id="c09-grad" gradientUnits="userSpaceOnUse" x1="' + G.x0 + '" x2="' + G.x1 + '" y1="0" y2="0">' + gst + '</linearGradient></defs>';
    /* low stretch of the night */
    var q0 = X(CC.QUIET[0]), q1 = X(CC.QUIET[1] + 24);
    s += '<rect class="c09-q" x="' + f1(q0) + '" y="' + top + '" width="' + f1(q1 - q0) + '" height="' + ph + '"/>';
    /* windows used by the meter */
    s += '<rect class="c09-win" x="' + f1(X(st.W)) + '" y="' + top + '" width="' + f1(X(st.W + 3) - X(st.W)) + '" height="' + ph + '"/>';
    s += '<rect class="c09-win" x="' + f1(X(BED - 1)) + '" y="' + top + '" width="' + f1(X(BED) - X(BED - 1)) + '" height="' + ph + '"/>';
    var step = ymax > 24 ? 5 : 2;
    for (var v = 0; v <= ymax; v += step) {
      s += '<line class="' + (v ? 'c09-gy' : 'c09-g0') + '" x1="' + G.x0 + '" x2="' + G.x1 + '" y1="' + f1(Y(v)) + '" y2="' + f1(Y(v)) + '"/>';
      if (v) s += '<text class="c09-tk" x="' + (G.x0 - 5) + '" y="' + f1(Y(v) + 3.5) + '" text-anchor="end">' + v + '×</text>';
    }
    for (var h = 6; h <= 30; h += 3) {
      s += '<line class="c09-gx" x1="' + f1(X(h)) + '" x2="' + f1(X(h)) + '" y1="' + (top - 4) + '" y2="' + (top + ph) + '"/>';
      if (!G.mob || (h - 6) % 6 === 0) s += '<text class="c09-hr" x="' + f1(X(h)) + '" y="' + (top + ph + 15) + '" text-anchor="' + (h === 6 ? 'start' : h === 30 ? 'end' : 'middle') + '">' + CC.hhmm(h) + '</text>';
    }
    S.forEach(function (o) {
      if (KINDS[o.k].slot || o.row == null) return;
      var sx = X(o.t);
      s += '<line class="c09-hair" x1="' + f1(sx) + '" x2="' + f1(sx) + '" y1="' + (4 + o.row * G.rowH + G.st + 1) + '" y2="' + (top + ph) + '"/>';
    });
    /* wake and bed markers + their windows */
    var by = top + ph + 30;
    s += '<text class="c09-wl" x="' + f1(X(st.W)) + '" y="' + by + '">' + esc(L('manhã', 'morning')) + '</text>';
    s += '<text class="c09-wl" x="' + f1(X(BED)) + '" y="' + by + '" text-anchor="end">' + esc(L('antes de dormir', 'before bed')) + '</text>';
    function path(ys) { var d = ''; for (var i = 0; i < ys.length; i++) d += (i ? 'L' : 'M') + f1(G.x0 + i / (ys.length - 1) * (G.x1 - G.x0)) + ',' + f1(Y(Math.min(ys[i], ymax * 1.02))); return d; }
    var dCur = path(st.ys);
    s += '<path class="c09-area" d="' + dCur + 'L' + f1(G.x1) + ',' + f1(Y(0)) + 'L' + f1(G.x0) + ',' + f1(Y(0)) + 'Z" fill="url(#c09-grad)"/>';
    s += '<path class="c09-ref" d="' + path(refYs) + '"/>';
    if (drawn) {
      var dd = '';
      drawn.forEach(function (p, i) { if (p[0] < 6 || p[0] > 30) return; dd += (dd ? 'L' : 'M') + f1(X(p[0])) + ',' + f1(Y(Math.max(0, Math.min(p[1] / CC.TROUGH.v, ymax * 1.02)))); });
      s += '<path class="c09-drawn" d="' + dd + '"/>';
    }
    s += '<path class="c09-curve" d="' + dCur + '" stroke="url(#c09-grad)"/>';
    /* the slope itself: morning mean to bedtime mean */
    var mx = X(st.W + 1.5), my = Y(st.m), ex = X(BED - 0.5), ey = Y(st.e);
    s += '<line class="c09-sl" x1="' + f1(mx) + '" y1="' + f1(my) + '" x2="' + f1(ex) + '" y2="' + f1(ey) + '"/>';
    s += '<circle class="c09-sd" cx="' + f1(mx) + '" cy="' + f1(my) + '" r="3.5"/><circle class="c09-sd" cx="' + f1(ex) + '" cy="' + f1(ey) + '" r="3.5"/>';
    svgw.innerHTML = '<svg viewBox="0 0 ' + G.W + ' ' + H + '" width="' + G.W + '" height="' + H + '" role="img" aria-label="' + esc(desc(st)) + '">' + s + '</svg>';
    lane.style.height = laneH + 'px';
  }
  function desc(st) {
    return L('Curva do cortisol de um dia montado, das 06:00 às 06:00. Inclinação de ', 'Cortisol curve of an assembled day, 06:00 to 06:00. Slope at ') +
      Math.round(st.pct) + L('% da curva medida. ', '% of the measured curve. ') + stampList();
  }
  function stampList() {
    if (!S.length) return L('Nenhum carimbo.', 'No stamps.');
    return S.slice().sort(function (a, b) { return a.t - b.t; }).map(function (s) {
      return KINDS[s.k].n() + (KINDS[s.k].slot ? L(' (noite anterior)', ' (night before)') : ' ' + CC.hhmm(s.t));
    }).join(', ') + '.';
  }

  /* ---------- meter ---------- */
  var needle = { a: 0, v: 0, target: 0 }, nraf = 0;
  function pctToA(p) { var c = Math.max(-30, Math.min(130, p)); return (130 - c) / 160 * 180; } /* 0 = steep (left), 180 = flat (right) */
  function buildMeter() {
    var w = 170, r = 66, cx = 85, cy = 78;
    var segs = '';
    for (var i = 0; i < 40; i++) {
      var a0 = i / 40 * 180, a1 = (i + 1) / 40 * 180 + 0.6;
      var p = 130 - (a0 + a1) / 2 / 180 * 160;
      var col = p >= 85 ? CC.inkFor(15.5 - (130 - p) / 45 * 6) : p >= 60 ? CC.mix(C.baixa, C.plana, (85 - p) / 25) : C.plana;
      function pt(a, rr) { var rad = Math.PI - a / 180 * Math.PI; return f1(cx + Math.cos(rad) * rr) + ',' + f1(cy - Math.sin(rad) * rr); }
      segs += '<path d="M' + pt(a0, r) + 'A' + r + ',' + r + ' 0 0 1 ' + pt(a1, r) + 'L' + pt(a1, r - 11) + 'A' + (r - 11) + ',' + (r - 11) + ' 0 0 0 ' + pt(a0, r - 11) + 'Z" fill="' + col + '"/>';
    }
    function tick(p) { var a = pctToA(p), rad = Math.PI - a / 180 * Math.PI; return '<line class="c09-mt" x1="' + f1(cx + Math.cos(rad) * (r + 2)) + '" y1="' + f1(cy - Math.sin(rad) * (r + 2)) + '" x2="' + f1(cx + Math.cos(rad) * (r + 7)) + '" y2="' + f1(cy - Math.sin(rad) * (r + 7)) + '"/>'; }
    meterEl.innerHTML = '<div class="c09-mh"></div>' +
      '<svg class="c09-dial" viewBox="0 0 ' + w + ' 96" aria-hidden="true">' + segs + tick(100) + tick(85) + tick(60) + tick(0) +
      '<text class="c09-me" x="6" y="93">' + esc(L('íngreme', 'steep')) + '</text><text class="c09-me" x="164" y="93" text-anchor="end">' + esc(L('plana', 'flat')) + '</text>' +
      '<g class="c09-needle"><line x1="' + cx + '" y1="' + cy + '" x2="' + (cx - r + 4) + '" y2="' + cy + '"/><circle cx="' + cx + '" cy="' + cy + '" r="4.5"/></g></svg>' +
      '<div class="c09-mtxt"><div class="c09-mv"></div><div class="c09-mvl"></div><div class="c09-mc"></div></div>';
    G.needle = meterEl.querySelector('.c09-needle');
  }
  function setNeedle(a) { if (G.needle) G.needle.setAttribute('transform', 'rotate(' + f1(a) + ' 85 78)'); }
  function springTo(a) {
    needle.target = a;
    if (DN.RM) { needle.a = a; needle.v = 0; setNeedle(a); return; }
    if (nraf) return;
    var last = performance.now();
    (function step(now) {
      var dt = Math.min(0.033, (now - last) / 1000); last = now;
      var k = 170, c = 15;
      needle.v += (-(needle.a - needle.target) * k - needle.v * c) * dt;
      needle.a += needle.v * dt;
      setNeedle(needle.a);
      if (Math.abs(needle.a - needle.target) < 0.05 && Math.abs(needle.v) < 0.05) { needle.a = needle.target; setNeedle(needle.a); nraf = 0; return; }
      nraf = requestAnimationFrame(step);
    })(last);
  }
  function meterText(st) {
    var v = verdict(st.pct);
    meterEl.querySelector('.c09-mh').textContent = L('inclinação do dia', 'slope of the day');
    meterEl.querySelector('.c09-mv').textContent = Math.round(st.pct) + '%';
    meterEl.querySelector('.c09-mvl').textContent = L('da inclinação da curva medida', 'of the slope of the measured curve');
    var mc = meterEl.querySelector('.c09-mc');
    mc.textContent = v.c; mc.className = 'c09-mc c09-v-' + v.k;
    meterEl.className = 'c09-meter c09-m-' + v.k;
    host.classList.toggle('c09-isflat', v.k === 'flat' || v.k === 'inv');
  }

  /* ---------- lane of placed stamps ---------- */
  function placeButtons() {
    lane.innerHTML = '';
    slotIn.innerHTML = '';
    S.forEach(function (s) {
      var K = KINDS[s.k];
      var b = DN.el('button', { type: 'button', class: 'c09-ps c09-ps-' + s.k, 'data-id': s.id }, K.slot ? slotIn : lane, RS.stamp(K.st, P, { seed: s.id % 3 }));
      b.setAttribute('aria-label', K.n() + (K.slot ? L(', noite anterior', ', night before') : ', ' + CC.hhmm(s.t)) + L('. Setas mudam a hora; Delete remove.', '. Arrows change the time; Delete removes.'));
      if (!K.slot) { b.style.width = b.style.height = G.st + 'px'; b.style.left = f1(X(s.t) - G.st / 2) + 'px'; b.style.top = (4 + s.row * G.rowH) + 'px'; }
      s.el = b;
      wirePlaced(b, s);
      if (s.fresh && !DN.RM) { b.classList.add('c09-drop'); setTimeout(function () { b.classList.remove('c09-drop'); }, 200); }
      s.fresh = false;
    });
    slotEl.classList.toggle('c09-slot-has', S.some(function (s) { return KINDS[s.k].slot; }));
  }
  function positionButtons() {
    S.forEach(function (s) {
      if (!s.el || KINDS[s.k].slot) return;
      s.el.style.left = f1(X(s.t) - G.st / 2) + 'px'; s.el.style.top = (4 + s.row * G.rowH) + 'px';
    });
  }

  /* ---------- update cycle ---------- */
  function update(opts) {
    opts = opts || {};
    var nr = rows();
    var target = compute();
    target.ymax = ymaxFor(target.ys);
    var structural = (opts.structural || G.nr !== nr) && !G.dragging;
    G.nr = nr;
    if (structural) placeButtons(); else positionButtons();
    var from = shown;
    cur = target;
    cancelAnimationFrame(anim);
    if (!from || DN.RM || opts.instant) { shown = target; draw(target); }
    else {
      var t0 = performance.now(), dur = 450;
      (function step(now) {
        var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        var st = { ys: target.ys.map(function (y, i) { return from.ys[i] + (y - from.ys[i]) * e; }),
          pct: from.pct + (target.pct - from.pct) * e, m: from.m + (target.m - from.m) * e, e: from.e + (target.e - from.e) * e,
          W: from.W + (target.W - from.W) * e, ymax: from.ymax + (target.ymax - from.ymax) * e };
        shown = st; draw(st);
        if (k < 1) anim = requestAnimationFrame(step);
      })(t0);
    }
    meterText(target);
    springTo(pctToA(target.pct));
    trayState();
    if (opts.say) live.textContent = L('Inclinação: ', 'Slope: ') + Math.round(target.pct) + L('% da curva medida, ', '% of the measured curve, ') + verdict(target.pct).c + '.';
  }

  /* ---------- tray ---------- */
  var trayBtns = {};
  function buildTray() {
    tray.innerHTML = '';
    ORDER.forEach(function (k) {
      var K = KINDS[k];
      var b = DN.el('button', { type: 'button', class: 'c09-tb', 'data-k': k }, tray,
        '<span class="c09-tbs">' + RS.stamp(K.st, P) + '</span><span class="c09-tbn"></span><span class="c09-tbc"></span>');
      trayBtns[k] = b;
      wireTray(b, k);
    });
  }
  function trayState() {
    ORDER.forEach(function (k) {
      var b = trayBtns[k], K = KINDS[k], n = count(k);
      b.querySelector('.c09-tbn').textContent = K.n();
      b.querySelector('.c09-tbc').textContent = K.max > 1 ? n + '/' + K.max : (n ? L('no dia', 'placed') : '');
      var full = n >= K.max;
      b.setAttribute('aria-disabled', full ? 'true' : 'false');
      b.classList.toggle('c09-full', full);
      b.setAttribute('aria-label', K.n() + (full ? L(', já está no dia', ', already in the day') : L(', pôr no dia', ', add to the day')));
    });
  }
  function defaultHour(k) {
    var K = KINDS[k], used = S.filter(function (s) { return s.k === k; }).map(function (s) { return s.t; });
    if (k === 'amigo') { var bc = S.filter(function (s) { return s.k === 'banca'; }).map(function (s) { return s.t; }).filter(function (t) { return !S.some(function (o) { return o.k === 'amigo' && Math.abs(o.t - t) < 0.3; }); }); if (bc.length) return bc[0]; }
    for (var i = 0; i < K.def.length; i++) if (used.indexOf(K.def[i]) < 0) return K.def[i];
    return K.def[0];
  }
  function place(k, t) {
    var K = KINDS[k];
    if (count(k) >= K.max) {
      if (K.max === 1 && t != null && !K.slot) { var ex = S.filter(function (s) { return s.k === k; })[0]; ex.t = t; showInfo(k); update({ structural: true, say: true }); }
      return;
    }
    var s = add(k, K.slot ? 6 : (t != null ? t : defaultHour(k)));
    s.fresh = true;
    showInfo(k);
    update({ structural: true, say: true });
    return s;
  }
  function showInfo(k) { info.textContent = KINDS[k].info(); info.setAttribute('data-k', k); }

  /* ghost while dragging from the tray (mouse and pen) */
  var ghost = null;
  function overChart(cx, cy) {
    var r = chart.getBoundingClientRect();
    return cx >= r.left && cx <= r.right && cy >= r.top - 20 && cy <= r.bottom;
  }
  function overSlot(cx, cy) { var r = slotEl.getBoundingClientRect(); return cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom; }
  function showGuide(t) {
    if (t == null) { guide.style.opacity = '0'; return; }
    guide.style.opacity = '1';
    guide.style.transform = 'translateX(' + f1(X(t)) + 'px)';
    guide.style.top = '0px';
    guide.style.height = (G.top + G.ph) + 'px';
    guideT.textContent = CC.hhmm(t);
  }
  function wireTray(b, k) {
    var st = null;
    b.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      st = { x: e.clientX, y: e.clientY, drag: false, touch: e.pointerType === 'touch', id: e.pointerId };
    });
    b.addEventListener('pointermove', function (e) {
      if (!st || st.touch) return;
      if (!st.drag && Math.hypot(e.clientX - st.x, e.clientY - st.y) > 6) {
        if (count(k) >= KINDS[k].max && (KINDS[k].max > 1 || KINDS[k].slot)) { st = null; return; }
        st.drag = true;
        try { b.setPointerCapture(st.id); } catch (er) {}
        ghost = DN.el('div', { class: 'c09-ghost', 'aria-hidden': 'true' }, document.body, RS.stamp(KINDS[k].st, P));
        showInfo(k);
      }
      if (st.drag) {
        ghost.style.transform = 'translate(' + (e.clientX - 24) + 'px,' + (e.clientY - 24) + 'px)';
        var cr = chart.getBoundingClientRect();
        var inC = overChart(e.clientX, e.clientY);
        showGuide(inC && !KINDS[k].slot ? snap(T(e.clientX - cr.left)) : null);
        slotEl.classList.toggle('c09-slot-hot', KINDS[k].slot && (inC || overSlot(e.clientX, e.clientY)));
      }
    });
    function end(e, cancel) {
      if (!st) return;
      var was = st; st = null;
      if (was.drag) {
        if (ghost) { ghost.remove(); ghost = null; }
        showGuide(null); slotEl.classList.remove('c09-slot-hot');
        if (!cancel) {
          var cr = chart.getBoundingClientRect();
          if (KINDS[k].slot ? (overChart(e.clientX, e.clientY) || overSlot(e.clientX, e.clientY)) : overChart(e.clientX, e.clientY)) {
            place(k, KINDS[k].slot ? null : snap(T(e.clientX - cr.left)));
          }
        }
        b._skipClick = true;
      }
    }
    b.addEventListener('pointerup', function (e) { end(e, false); });
    b.addEventListener('pointercancel', function (e) { end(e, true); });
    b.addEventListener('click', function () {
      if (b._skipClick) { b._skipClick = false; return; }
      if (count(k) >= KINDS[k].max) {
        var ex = S.filter(function (s) { return s.k === k; })[0];
        showInfo(k);
        if (ex && ex.el) ex.el.focus();
        return;
      }
      var s = place(k);
      if (s && s.el && document.activeElement === b && false) s.el.focus();
    });
    b.addEventListener('mouseenter', function () { showInfo(k); });
    b.addEventListener('focus', function () { showInfo(k); });
  }

  /* placed stamps: drag along the day to change the hour, tap to remove, long press for the source */
  function remove(s) {
    S = S.filter(function (o) { return o !== s; });
    live.textContent = '';
    update({ structural: true, say: true });
  }
  function wirePlaced(b, s) {
    var st = null;
    b.addEventListener('pointerdown', function (e) {
      if (e.button) return;
      e.preventDefault();
      st = { x: e.clientX, t: s.t, drag: false, long: false, id: e.pointerId };
      try { b.setPointerCapture(e.pointerId); } catch (er) {}
      st.timer = setTimeout(function () { if (st && !st.drag) { st.long = true; showInfo(s.k); b.classList.add('c09-held'); } }, 450);
      showInfo(s.k);
    });
    b.addEventListener('pointermove', function (e) {
      if (!st || KINDS[s.k].slot) return;
      var dx = e.clientX - st.x;
      if (!st.drag && Math.abs(dx) > 5) { st.drag = true; G.dragging = true; clearTimeout(st.timer); b.classList.add('c09-dragging'); }
      if (st.drag) {
        var nt = snap(st.t + dx / (G.x1 - G.x0) * 24);
        showGuide(nt);
        if (nt !== s.t) { s.t = nt; update({}); }
      }
    });
    function end(cancel) {
      if (!st) return;
      clearTimeout(st.timer);
      var was = st; st = null; G.dragging = false;
      b.classList.remove('c09-dragging'); b.classList.remove('c09-held');
      showGuide(null);
      if (was.drag) { update({ structural: true, say: true }); var el = S.filter(function (o) { return o.id === s.id; })[0]; if (el && el.el) el.el.focus({ preventScroll: true }); return; }
      if (!cancel && !was.long) remove(s);
    }
    b.addEventListener('pointerup', function () { end(false); });
    b.addEventListener('pointercancel', function () { end(true); });
    b.addEventListener('click', function (e) { if (e.detail === 0) remove(s); });
    b.addEventListener('keydown', function (e) {
      var step = e.shiftKey ? 1 : 0.25;
      if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !KINDS[s.k].slot) {
        e.preventDefault();
        s.t = snap(s.t + (e.key === 'ArrowLeft' ? -step : step));
        update({ structural: true, say: true });
        var el = S.filter(function (o) { return o.id === s.id; })[0]; if (el && el.el) el.el.focus();
      } else if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); remove(s); }
    });
    b.addEventListener('mouseenter', function () { showInfo(s.k); });
    b.addEventListener('focus', function () { showInfo(s.k); });
  }

  typB.addEventListener('click', function () {
    S = []; TYPICAL.forEach(function (p) { add(p[0], p[1]).fresh = true; });
    update({ structural: true, say: true });
  });
  clrB.addEventListener('click', function () { S = []; update({ structural: true, say: true }); });

  /* ---------- text ---------- */
  function texts() {
    read.textContent = L(
      'Quase tudo que acontece de dia faz um calombo que se desfaz em uma ou duas horas, e por isso a curva só fica plana com o que acontece à noite e com a manhã sem luz.',
      'Almost everything that happens during the day makes a bump that fades within an hour or two, so the curve only goes flat with what happens at night and with a morning without light.');
    slotL.textContent = L('a noite anterior', 'the night before');
    slotEl.setAttribute('aria-label', L('a noite anterior', 'the night before'));
    typB.textContent = L('dia típico', 'typical day');
    clrB.textContent = L('limpar', 'clear');
    trayH.textContent = L('carimbos: arraste para a hora ou toque para pôr no dia', 'stamps: drag to an hour or tap to add to the day');
    tray.setAttribute('aria-label', L('carimbos do dia', 'stamps of the day'));
    legend.innerHTML = '<span class="c09-axl">' + esc(L('eixo: múltiplos do vale da noite', 'axis: multiples of the night low')) + '</span><span><i class="c09-k c09-k-cur"></i>' + esc(L('o dia que você montou', 'the day you built')) + '</span>' +
      '<span><i class="c09-k c09-k-ref"></i>' + esc(L('curva medida, sem carimbos', 'measured curve, no stamps')) + '</span>' +
      (drawn ? '<span><i class="c09-k c09-k-drawn"></i>' + esc(L('o seu desenho do começo', 'your drawing from the start')) + '</span>' : '') +
      '<span><i class="c09-k c09-k-sl"></i>' + esc(L('inclinação: manhã contra antes de dormir', 'slope: morning against before bed')) + '</span>';
    if (!info.textContent || !info.getAttribute('data-k')) info.textContent = L('Toque num carimbo do dia para tirá-lo ou segure-o para ver a fonte; com o teclado, as setas mudam a hora.', 'Tap a stamp in the day to remove it, or hold it to see the source; with a keyboard, the arrows change the time.');
    else showInfo(info.getAttribute('data-k'));
  }

  function full() {
    layout();
    texts();
    buildMeter();
    G.nr = null;
    shown = null;
    update({ structural: true, instant: true });
    needle.a = needle.target; setNeedle(needle.a);
  }
  buildTray();
  full();
  DN.onLang(full);
  var rt, lw = chart.clientWidth;
  function onResize() { clearTimeout(rt); rt = setTimeout(function () { var w = chart.clientWidth; if (w !== lw) { lw = w; full(); } }, 120); }
  if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(chart); else window.addEventListener('resize', onResize);
  /* the drawing may be saved after this widget loaded (c02a sits earlier on the page) */
  DN.onVisible(root, function (v) {
    if (!v) return;
    var d = readerCurve();
    if (JSON.stringify(d) !== JSON.stringify(drawn)) { drawn = d; texts(); update({ instant: true }); }
  });
})();
