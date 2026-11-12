/* w09b · o-relogio-do-sistema : four parts of the system at 20, 40, 60 and 80 years,
   each losing its own compound rate per decade (Karrer et al. 2017). Static small multiples. */
(function () {
  'use strict';
  var root = DN.body('w09b'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, S = DN.svg, E = DN.el, C = DN.COL;
  var MINUS = '−';

  /* loss per decade, Karrer et al. 2017 */
  var B = [
    { k: 'd1', pt: ['receptores', 'D1'], en: ['D1', 'receptors'], sp: ['D1', 'receptores'], se: ['D1', 'receptors'], r: 0.14 },
    { k: 'dat', pt: ['transportador', '(DAT)'], en: ['transporter', '(DAT)'], sp: ['DAT', 'transport.'], se: ['DAT', 'transporter'], r: 0.089 },
    { k: 'd2', pt: ['receptores', 'D2'], en: ['D2', 'receptors'], sp: ['D2', 'receptores'], se: ['D2', 'receptors'], r: 0.082 },
    { k: 'syn', pt: ['capacidade', 'de síntese'], en: ['synthesis', 'capacity'], sp: ['síntese', ''], se: ['synthesis', ''], r: 0.037, ns: true }
  ];
  var AGES = [20, 40, 60, 80];
  var grown = DN.RM;

  var read = E('p', { class: 'w9b-read' }, root);
  var holder = E('div', { class: 'w9b-svg' }, root);
  var sv = S('svg', { role: 'img' }, holder);
  var key = E('div', { class: 'w9b-key', 'aria-hidden': 'true' }, root);
  var note = E('p', { class: 'w9b-note' }, root);

  function val(b, age) { return 100 * Math.pow(1 - b.r, (age - 20) / 10); }

  function draw() {
    while (sv.firstChild) sv.removeChild(sv.firstChild);
    var W = holder.clientWidth || 600, mob = W < 520;
    var H = mob ? 300 : 320, x0 = mob ? 30 : 40, top = 34, yB = H - (mob ? 74 : 66);
    var colW = (W - x0) / 4, gap = mob ? 3 : 6, inner = colW * (mob ? 0.86 : 0.74), bw = (inner - gap * 3) / 4;
    sv.setAttribute('viewBox', '0 0 ' + W + ' ' + H); sv.setAttribute('width', W); sv.setAttribute('height', H);
    var y = function (v) { return yB - v / 100 * (yB - top); };
    var defs = S('defs', null, sv);
    var p = S('pattern', { id: 'w9b-lost', width: 5, height: 5, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(45)' }, defs);
    S('rect', { width: 5, height: 5, fill: C.pausaSoft }, p);
    S('line', { x1: 0, y1: 0, x2: 0, y2: 5, stroke: C.pausa, 'stroke-opacity': 0.35, 'stroke-width': 1.1 }, p);
    var g = S('g', { class: 'w9b-grid' }, sv);
    [0, 25, 50, 75, 100].forEach(function (v) {
      S('line', { x1: x0, x2: W, y1: y(v), y2: y(v), class: v === 100 ? 'w9b-full' : v === 0 ? 'w9b-base' : '' }, g);
      S('text', { x: x0 - 6, y: y(v), 'text-anchor': 'end', 'dominant-baseline': 'central' }, g).textContent = v + (mob && v !== 100 ? '' : '%');
    });
    var bars = S('g', { class: 'w9b-bars' + (grown ? ' on' : '') }, sv);
    B.forEach(function (b, i) {
      var gx = x0 + colW * i + (colW - inner) / 2;
      AGES.forEach(function (a, j) {
        var v = val(b, a), bx = gx + j * (bw + gap), yt = y(v), last = j === 3;
        var col = b.ns ? C.dopa : C.ink, op = [0.28, 0.5, 0.74, 1][j];
        if (v < 99.5) S('rect', { x: bx, y: y(100), width: bw, height: yt - y(100), fill: 'url(#w9b-lost)' }, bars);
        var r = S('rect', { x: bx, y: yt, width: bw, height: yB - yt, fill: col, 'fill-opacity': op, class: 'w9b-bar' }, bars);
        r.style.transitionDelay = (i * 90 + j * 70) + 'ms';
        var t = S('text', { x: bx + bw / 2, y: yt - 5, 'text-anchor': 'middle', class: 'w9b-val' + (last ? ' w9b-last' : '') }, sv);
        t.textContent = fmt(Math.round(v)) + (last && !mob ? '%' : '');
        S('text', { x: bx + bw / 2, y: yB + 12, 'text-anchor': 'middle', class: 'w9b-age' + (last ? ' w9b-last' : '') }, sv).textContent = a;
      });
      var cx = gx + inner / 2;
      var nm = S('text', { x: cx, y: yB + 30, 'text-anchor': 'middle', class: 'w9b-name' }, sv);
      (mob ? (DN.lang() === 'en' ? b.se : b.sp) : (DN.lang() === 'en' ? b.en : b.pt)).forEach(function (ln, k) {
        if (ln) S('tspan', { x: cx, dy: k ? 13 : 0, class: k && mob ? 'w9b-n2' : '' }, nm).textContent = ln;
      });
      var rt = MINUS + fmt(b.r * 100, 1).replace(/[,.]0$/, '') + '%';
      S('text', { x: cx, y: yB + (mob ? 56 : 58), 'text-anchor': 'middle', class: 'w9b-rate' }, sv).textContent = mob ? rt + (b.ns ? ' n.s.' : '') : rt + L(' por década', ' per decade') + (b.ns ? ' (n.s.)' : '');
    });
    S('text', { x: x0, y: 12, class: 'w9b-axt' }, sv).textContent = L('% do valor aos 20 anos', '% of the value at age 20');
    sv.setAttribute('aria-label', L('Quatro grupos de barras, cada um com o valor aos 20, 40, 60 e 80 anos. ', 'Four groups of bars, each with the value at 20, 40, 60 and 80 years. ') +
      B.map(function (b) { return (DN.lang() === 'en' ? b.en.join(' ') : b.pt.join(' ')) + L(' aos 80: ', ' at 80: ') + Math.round(val(b, 80)) + '%'; }).join(', ') + '.');
  }

  function relabel() {
    read.textContent = L('Os receptores envelhecem bem mais depressa que a fábrica. Aos 80 anos, restam cerca de 40% dos receptores D1 e 80% da capacidade de síntese.',
      'Receptors age much faster than the factory. At 80, about 40% of D1 receptors remain, and 80% of synthesis capacity.');
    key.innerHTML = '<span><i class="k-age"><b style="opacity:.28"></b><b style="opacity:.5"></b><b style="opacity:.74"></b><b></b></i>' + L('20, 40, 60 e 80 anos', '20, 40, 60 and 80 years') + '</span>' +
      '<span><i class="k-lost"></i>' + L('o que se perdeu desde os 20', 'what was lost since 20') + '</span>' +
      '<span>n.s. ' + L('sem significância estatística', 'not statistically significant') + '</span>';
    note.textContent = L('Uma noite sem dormir também reduz a disponibilidade de receptores D2 no estriado ventral (Volkow et al., 2012), e ela volta depois do sono.',
      'One sleepless night also lowers D2 receptor availability in the ventral striatum (Volkow et al., 2012), and it comes back after sleep.');
    draw();
  }
  relabel();
  DN.onLang(relabel);
  if (!grown) DN.onVisible(holder, function (v) { if (v) { grown = true; var g = sv.querySelector('.w9b-bars'); if (g) g.classList.add('on'); } }, { once: true, threshold: 0.35 });
  var rt = 0, lastW = holder.clientWidth;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { if (holder.clientWidth !== lastW) { lastW = holder.clientWidth; draw(); } }, 150); });
})();
