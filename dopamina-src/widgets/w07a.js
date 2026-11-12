/* w07a · o-u-invertido : the same dose moves three people along an inverted U */
(function () {
  'use strict';
  var root = DN.body('w07a'); if (!root) return;
  var L = DN.L, C = DN.COL;

  /* schematic curve: flat-topped bell, f in 0..1 */
  var MU = 0.5, SIG = 0.26, P = 3;
  function f(x) { return Math.exp(-Math.pow(Math.abs((x - MU) / SIG), P)); }
  var X0 = [0.20, 0.50, 0.66], D = 0.14;          /* left, top, right; dose shift */

  /* static infographic: the three people are shown before (ghost) and after (solid) the same dose */
  var LAB3 = [['abaixo do pico', 'below the peak'], ['no pico', 'at the peak'], ['além do pico', 'past the peak']];
  var st = { drug: 'bromo', dosed: true, t: 1 };   /* t: 0 = before, 1 = after (spring may overshoot) */
  var raf = 0;

  /* ---------- DOM ---------- */
  var holder = DN.el('div', { class: 'w07a-svg' }, root);
  var note = DN.el('div', { class: 'w07a-note' }, root);
  var live = DN.el('div', { class: 'live', 'aria-live': 'polite' }, root);
  var take = DN.el('p', { class: 'w07a-take' }, root);


  function go(on) {
    st.dosed = on;
    var from = st.t, to = on ? 1 : 0;
    cancelAnimationFrame(raf);
    if (DN.RM) { st.t = to; draw(); narrate(); return; }
    /* damped spring */
    var x = from, v = 0, k = 120, c = 14, last = performance.now();
    function step(now) {
      var dt = Math.min(0.032, (now - last) / 1000); last = now;
      var a = -k * (x - to) - c * v; v += a * dt; x += v * dt;
      st.t = x; draw();
      if (Math.abs(x - to) < 0.0008 && Math.abs(v) < 0.002) { st.t = to; draw(); narrate(); return; }
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
  }

  function pos(i, t) { return X0[i] + D * t; }
  function mean(t) { return (f(pos(0, t)) + f(pos(1, t)) + f(pos(2, t))) / 3; }
  function pct(v) { return Math.round(v * 100); }
  function f2(v) { return v.toFixed(1); }

  function narrate() {
    var parts = [0, 1, 2].map(function (i) {
      return '<b>' + L(LAB3[i][0], LAB3[i][1]) + '</b> ' + pct(f(pos(i, 0))) + ' → ' + pct(f(pos(i, 1)));
    });
    live.innerHTML = L('Mesma dose: ', 'Same dose: ') + parts.join(' · ') +
      L('. A média do grupo vai de ' + pct(mean(0)) + ' para ' + pct(mean(1)) + '.', '. The group mean goes from ' + pct(mean(0)) + ' to ' + pct(mean(1)) + '.');
  }

  function relabel() {
    note.innerHTML = L('O padrão aparece com a <b>bromocriptina</b>, que imita a dopamina (Cools e D’Esposito, 2011), com 2 g de <b>tirosina</b> em 45 jovens (Jongkees, 2020) e com a <b>tolcapona</b>, que ajuda quem tem o genótipo COMT Val/Val e atrapalha quem tem Met/Met (Farrell, 2012).',
      'The pattern shows up with <b>bromocriptine</b>, which mimics dopamine (Cools and D’Esposito, 2011), with 2 g of <b>tyrosine</b> in 45 young adults (Jongkees, 2020) and with <b>tolcapone</b>, which helps people with the COMT Val/Val genotype and hurts those with Met/Met (Farrell, 2012).');
    take.textContent = L('O mesmo remédio ajuda quem estava abaixo do pico e atrapalha quem já estava no pico ou além dele. Por isso a média do grupo muda pouco enquanto cada pessoa muda muito.',
      'The same drug helps people below the peak and hurts people at or past it. That is why the group mean moves little while each person moves a lot.');
    narrate();
  }

  /* ---------- drawing ---------- */
  var g = {};
  function build() {
    holder.innerHTML = '';
    var W = Math.max(280, holder.clientWidth || root.clientWidth || 600);
    var mob = W < 480;
    var H = mob ? 320 : 360;
    var m = { l: mob ? 14 : 40, r: mob ? 8 : 24, t: mob ? 60 : 50, b: 44 };
    var s = DN.svg('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img' }, holder);
    g = { s: s, W: W, H: H, m: m, mob: mob };
    g.sx = function (x) { return m.l + x * (W - m.l - m.r); };
    g.sy = function (y) { return H - m.b - y * (H - m.t - m.b - 10); };
    /* axes */
    DN.svg('line', { x1: m.l, y1: H - m.b, x2: W - m.r, y2: H - m.b, stroke: C.ink, 'stroke-width': 1 }, s);
    DN.svg('line', { x1: m.l, y1: H - m.b, x2: m.l, y2: m.t - 6, stroke: C.ink, 'stroke-width': 1 }, s);
    g.xl = DN.svg('text', { x: (m.l + W - m.r) / 2, y: H - 12, 'text-anchor': 'middle', 'font-size': mob ? 10.5 : 11.5, fill: C.ink }, s);
    g.xlo = DN.svg('text', { x: m.l, y: H - m.b + 16, 'font-size': 10, fill: C.dim }, s);
    g.xhi = DN.svg('text', { x: W - m.r, y: H - m.b + 16, 'text-anchor': 'end', 'font-size': 10, fill: C.dim }, s);
    g.yl = DN.svg('text', { x: m.l - 4, y: 14, 'font-size': mob ? 10.5 : 11.5, fill: C.ink }, s);
    /* legend: before (ghost) and after (solid) */
    var lgx = W - m.r, lgy = mob ? 34 : 14;
    g.lg2 = DN.svg('text', { x: lgx, y: lgy, 'text-anchor': 'end', 'font-size': 10, fill: C.dim }, s);
    g.lgd = DN.svg('circle', { r: 4.5, fill: C.ink, cy: lgy - 3.5 }, s);
    g.lg1 = DN.svg('text', { y: lgy, 'text-anchor': 'end', 'font-size': 10, fill: C.dim }, s);
    g.lgg = DN.svg('circle', { r: 4, fill: C.paper, stroke: C.mid, 'stroke-dasharray': '2 2', cy: lgy - 3.5 }, s);
    /* curve */
    var d = '';
    for (var i = 0; i <= 160; i++) { var x = i / 160; d += (i ? 'L' : 'M') + g.sx(x).toFixed(1) + ',' + g.sy(f(x)).toFixed(1); }
    DN.svg('path', { d: d + 'L' + g.sx(1) + ',' + g.sy(0) + 'L' + g.sx(0) + ',' + g.sy(0) + 'Z', fill: C.dopaSoft, opacity: 0.55 }, s);
    DN.svg('path', { d: d, fill: 'none', stroke: C.ink, 'stroke-width': 1.6 }, s);
    /* mean lines */
    g.mean0 = DN.svg('line', { stroke: C.mid, 'stroke-width': 1, 'stroke-dasharray': '2 3' }, s);
    g.mean = DN.svg('line', { stroke: C.ink, 'stroke-width': 1.2, 'stroke-dasharray': '6 4' }, s);
    g.meanT = DN.svg('text', { 'font-size': 10, fill: C.ink, 'text-anchor': 'end', class: 'w07a-halo' }, s);
    /* per person: ghost, trail, arrow, dot, labels */
    g.p = [0, 1, 2].map(function () {
      var o = {};
      o.trail = DN.svg('path', { fill: 'none', 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0.9 }, s);
      o.arrow = DN.svg('path', { stroke: 'none' }, s);
      o.ghost = DN.svg('circle', { r: mob ? 6 : 7, fill: C.paper, stroke: C.mid, 'stroke-width': 1, 'stroke-dasharray': '2 2' }, s);
      o.dot = DN.svg('circle', { r: mob ? 8 : 9, fill: C.ink, stroke: C.paper, 'stroke-width': 2 }, s);
      o.lab = DN.svg('text', { 'font-size': mob ? 10 : 11, fill: C.ink, 'font-weight': 700, class: 'w07a-halo' }, s);
      o.val = DN.svg('text', { 'font-size': mob ? 10.5 : 11, class: 'w07a-halo' }, s);
      return o;
    });
  }

  function draw() {
    if (!g.s) return;
    var t = st.t, mob = g.mob;
    g.s.setAttribute('aria-label', L('Curva em U invertido. ', 'Inverted U curve. ') + live.textContent);
    g.xl.textContent = L('dopamina no córtex pré-frontal →', 'dopamine in the prefrontal cortex →');
    g.xlo.textContent = L('pouca', 'little');
    g.xhi.textContent = L('muita', 'a lot');
    g.yl.textContent = L('↑ memória de trabalho', '↑ working memory');
    g.lg2.textContent = L('depois da mesma dose', 'after the same dose');
    var w2 = g.lg2.getComputedTextLength ? g.lg2.getComputedTextLength() : 110, x2l = g.W - g.m.r - w2;
    g.lgd.setAttribute('cx', x2l - 9);
    g.lg1.textContent = L('antes', 'before'); g.lg1.setAttribute('x', x2l - 22);
    var w1 = g.lg1.getComputedTextLength ? g.lg1.getComputedTextLength() : 36;
    g.lgg.setAttribute('cx', x2l - 22 - w1 - 9);
    var m0 = mean(0), mt = mean(t);
    var x1 = g.sx(0), x2 = g.sx(1);
    g.mean0.setAttribute('x1', x1); g.mean0.setAttribute('x2', x2);
    g.mean0.setAttribute('y1', g.sy(m0)); g.mean0.setAttribute('y2', g.sy(m0));
    g.mean0.style.display = st.dosed || t > 0.01 ? '' : 'none';
    g.mean.setAttribute('x1', x1); g.mean.setAttribute('x2', x2);
    g.mean.setAttribute('y1', g.sy(mt)); g.mean.setAttribute('y2', g.sy(mt));
    g.meanT.setAttribute('x', x2); g.meanT.setAttribute('y', g.sy(mt) - 6);
    g.meanT.textContent = mob ? L('média ' + pct(mt), 'mean ' + pct(mt)) : L('média do grupo ' + pct(mt), 'group mean ' + pct(mt));
    var tc = DN.clamp(t, 0, 1.2);
    for (var i = 0; i < 3; i++) {
      var o = g.p[i];
      var xa = pos(i, 0), xb = pos(i, tc);
      var cx = g.sx(xb), cy = g.sy(f(xb));
      o.dot.setAttribute('cx', cx); o.dot.setAttribute('cy', cy);
      o.ghost.setAttribute('cx', g.sx(xa)); o.ghost.setAttribute('cy', g.sy(f(xa)));
      o.ghost.style.display = tc > 0.04 ? '' : 'none';
      /* trail along the curve, amber if up, indigo if down */
      var up = f(pos(i, 1)) > f(xa);
      var pd = '', n = 24;
      for (var k = 0; k <= n; k++) { var xx = xa + (xb - xa) * k / n; pd += (k ? 'L' : 'M') + g.sx(xx).toFixed(1) + ',' + g.sy(f(xx)).toFixed(1); }
      o.trail.setAttribute('d', tc > 0.02 ? pd : '');
      o.trail.setAttribute('stroke', up ? C.dopa : C.pausa);
      /* arrowhead halfway along the move, pointing along the curve */
      if (tc > 0.3) {
        var xm = xa + (xb - xa) * 0.55, x0 = g.sx(xm - 0.004), y0 = g.sy(f(xm - 0.004)), x1 = g.sx(xm + 0.004), y1 = g.sy(f(xm + 0.004));
        var an = Math.atan2(y1 - y0, x1 - x0), mx = g.sx(xm), my = g.sy(f(xm)), L1 = 9, W1 = 5.5;
        var p1 = [mx + Math.cos(an) * L1 / 2, my + Math.sin(an) * L1 / 2], p2 = [mx - Math.cos(an) * L1 / 2 - Math.sin(an) * W1, my - Math.sin(an) * L1 / 2 + Math.cos(an) * W1],
          p3 = [mx - Math.cos(an) * L1 / 2 + Math.sin(an) * W1, my - Math.sin(an) * L1 / 2 - Math.cos(an) * W1];
        o.arrow.setAttribute('d', 'M' + p1.map(f2).join(',') + 'L' + p2.map(f2).join(',') + 'L' + p3.map(f2).join(',') + 'Z');
        o.arrow.setAttribute('fill', up ? C.dopa : C.pausa);
      } else o.arrow.setAttribute('d', '');
      /* labels: a small block above the dot, leaning away from the curve */
      var name = L(LAB3[i][0], LAB3[i][1]);
      var words = mob && name.length > 9 && name.indexOf(' ') > 0 ? name.split(' ') : [name];
      if (words.length > 2) words = [words[0], words.slice(1).join(' ')];
      /* place the label block on the open side of the curve: upper left on the
         rising side, upper right on the falling side, centered above near the peak */
      var slope = (f(xb + 0.01) - f(xb - 0.01)) / 0.02;
      var side = Math.abs(slope) < 0.6 ? 0 : slope > 0 ? -1 : 1;
      var anchor = side < 0 ? 'end' : side > 0 ? 'start' : 'middle';
      var ax = cx + side * 13;
      var lh = mob ? 12 : 13;
      var a = pct(f(xa)), b = pct(f(pos(i, 1)));
      var delta = b - a;
      var vy = side ? cy - 9 : cy - 15, ly0 = vy - lh * words.length;
      o.lab.textContent = '';
      words.forEach(function (w, j) { var ts = DN.svg('tspan', { x: ax, y: ly0 + lh * j + (j ? 0 : 0) }, o.lab); ts.textContent = w; });
      o.lab.setAttribute('text-anchor', anchor);
      o.val.setAttribute('text-anchor', anchor);
      if (st.dosed && t > 0.6) {
        o.val.textContent = a + ' → ' + b;
        o.val.setAttribute('fill', delta > 0 ? C.dopa : C.pausa);
        o.val.setAttribute('font-weight', 700);
      } else {
        o.val.textContent = String(a);
        o.val.setAttribute('fill', C.dim);
        o.val.setAttribute('font-weight', 400);
      }
      o.val.setAttribute('x', ax); o.val.setAttribute('y', vy + 2);
      /* keep inside the plot */
      try {
        var bb = o.lab.getBBox(), vb = o.val.getBBox();
        var minx = Math.min(bb.x, vb.x), maxx = Math.max(bb.x + bb.width, vb.x + vb.width), sh = 0;
        if (maxx > g.W - 2) sh = g.W - 2 - maxx; else if (minx < 2) sh = 2 - minx;
        if (sh) {
          Array.prototype.forEach.call(o.lab.childNodes, function (ts) { ts.setAttribute('x', ax + sh); });
          o.val.setAttribute('x', ax + sh);
        }
      } catch (e) {}
    }
  }

  function render() { build(); relabel(); draw(); }
  render();
  DN.onLang(function () { relabel(); draw(); });
  /* entrance: the three people slide along the curve once, the first time the chart is seen */
  if (!DN.RM) DN.onVisible(holder, function (v) { if (v) { st.t = 0; draw(); setTimeout(function () { go(true); }, 250); } }, { once: true, threshold: 0.5 });
  var rt; window.addEventListener('resize', function () {
    clearTimeout(rt); rt = setTimeout(function () { var w = holder.clientWidth; if (w && g.W !== Math.max(280, w)) { build(); draw(); } }, 150);
  });
})();
