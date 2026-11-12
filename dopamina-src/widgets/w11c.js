/* w11c · os-tres-relogios : mood, habit and receptors on one plain timeline of months.
   A static, fully labeled chart. The 30 days of the video are the amber sliver at the left. */
(function () {
  'use strict';
  var root = DN.body('w11c'); if (!root) return;
  var L = DN.L, fmt = DN.fmt;
  var DMAX = 548; /* 18 months */

  root.innerHTML = '';
  var svgWrap = DN.el('div', { 'class': 'w11c-svgw' }, root);
  var take = DN.el('p', { 'class': 'w11c-take' }, root);

  var svg, G = {};
  function render() {
    var W = Math.max(280, Math.round(root.clientWidth || 700)), mob = W < 620;
    G = { W: W, mob: mob, x0: 2, x1: W - 6, t: 24 };
    var X = function (d) { return G.x0 + d / DMAX * (G.x1 - G.x0); };
    var rowH = mob ? 116 : 92, y = G.t + 26;
    var rows = [y, y + rowH, y + rowH * 2];
    G.yb = rows[2] + rowH - (mob ? 4 : 22);
    G.H = G.yb + 30;

    svgWrap.innerHTML = '';
    svg = DN.svg('svg', { viewBox: '0 0 ' + W + ' ' + G.H, width: W, height: G.H, role: 'img', 'class': 'w11c-svg' }, svgWrap);
    svg.setAttribute('aria-label', L(
      'Linha do tempo de 0 a 18 meses. Os 30 dias do vídeo são uma faixa estreita no começo. Humor: a depressão cai de 42% para 6% em cerca de 4 semanas. Hábito: fica automático com mediana de 59 a 66 dias, numa faixa de 18 a 254 dias. Receptores: na cocaína, D2 ainda baixo aos 3 a 4 meses; na metanfetamina, transportadores 19% mais altos só depois de 12 a 17 meses.',
      'Timeline from 0 to 18 months. The video\'s 30 days are a narrow band at the start. Mood: depression falls from 42% to 6% in about 4 weeks. Habit: becomes automatic at a median of 59 to 66 days, in a range of 18 to 254 days. Receptors: in cocaine, D2 still low at 3 to 4 months; in methamphetamine, transporters 19% higher only after 12 to 17 months.'));

    /* the 30 days, full height */
    DN.svg('rect', { x: X(0), y: G.t, width: X(30) - X(0), height: G.yb - G.t, 'class': 'w11c-30' }, svg);
    var t30 = DN.svg('text', { x: X(30) + 5, y: G.t + 10, 'class': 'w11c-30t' }, svg);
    t30.textContent = L('← os 30 dias do vídeo', '← the video\'s 30 days');

    /* month grid and axis */
    for (var m = 3; m <= 18; m += 3) {
      var d = m * 30.44;
      DN.svg('line', { x1: X(d), x2: X(d), y1: G.yb, y2: G.yb + 4, 'class': 'w11c-axis' }, svg);
    }
    DN.svg('line', { x1: G.x0, x2: G.x1, y1: G.yb, y2: G.yb, 'class': 'w11c-axis' }, svg);
    for (m = 0; m <= 18; m += 3) {
      if (mob && (m === 3 || m === 9 || m === 15)) continue;
      var tk = DN.svg('text', { x: X(m * 30.44), y: G.yb + 17, 'class': 'w11c-tk', 'text-anchor': m === 0 ? 'start' : m === 18 ? 'end' : 'middle' }, svg);
      tk.textContent = m === 0 ? '0' : m === 18 ? L('18 meses', '18 months') : (m === 12 ? L('1 ano', '1 year') : String(m));
    }

    function wrapText(str, max) { /* split a long detail line in two on narrow screens */
      if (str.length <= max) return [str];
      var cut = str.lastIndexOf(' ', max);
      return [str.slice(0, cut), str.slice(cut + 1)];
    }
    function titled(i, name, detail) {
      var parts = mob ? wrapText(detail, Math.floor((G.x1 - G.x0) / 6.9)) : [detail];
      var tx = DN.svg('text', { x: G.x0, y: rows[i], 'class': 'w11c-lt' }, svg);
      tx.textContent = name;
      parts.forEach(function (p, j) {
        var ds = DN.svg('text', { x: G.x0, y: rows[i] + 16 + j * 14, 'class': 'w11c-ls' }, svg);
        ds.textContent = p;
      });
      return rows[i] + 16 + (parts.length - 1) * 14 + 16;
    }

    /* 1. mood */
    var by = titled(0, L('Humor', 'Mood'), L('melhora em cerca de 4 semanas: de 42% para 6% com depressão clínica', 'improves in about 4 weeks: from 42% to 6% with clinical depression'));
    DN.svg('rect', { x: X(0), y: by, width: X(28) - X(0), height: 10, 'class': 'w11c-bmood' }, svg);

    /* 2. habit */
    by = titled(1, L('Hábito', 'Habit'), L('fica automático em cerca de 2 meses, com muita variação', 'becomes automatic in about 2 months, with wide variation'));
    DN.svg('rect', { x: X(18), y: by + 2, width: X(254) - X(18), height: 6, 'class': 'w11c-brange' }, svg);
    DN.svg('rect', { x: X(59), y: by - 1, width: Math.max(4, X(66) - X(59)), height: 12, 'class': 'w11c-bhab' }, svg);
    var hl = DN.svg('text', { x: X(254) + 6, y: by + 9, 'class': 'w11c-n' }, svg);
    hl.textContent = mob ? L('mediana 59 a 66 dias', 'median 59 to 66 days') : L('mediana de 59 a 66 dias; faixa de 18 a 254', 'median 59 to 66 days; range 18 to 254');

    /* 3. receptors */
    by = titled(2, L('Receptores', 'Receptors'), L('levam de meses a mais de um ano, e às vezes não voltam', 'take months to more than a year, and sometimes do not recover'));
    var gid = 'w11c-gr';
    var defs = DN.svg('defs', null, svg);
    var lg = DN.svg('linearGradient', { id: gid, x1: 0, x2: 1, y1: 0, y2: 0 }, defs);
    DN.svg('stop', { offset: 0, 'class': 'w11c-gs', 'stop-opacity': 0.85 }, lg);
    DN.svg('stop', { offset: 1, 'class': 'w11c-gs', 'stop-opacity': 0.2 }, lg);
    DN.svg('rect', { x: X(0), y: by, width: X(517) - X(0), height: 10, fill: 'url(#' + gid + ')' }, svg);
    var marks = [
      { d: 105, t: L('cocaína: ainda baixos aos 3 a 4 meses', 'cocaine: still low at 3 to 4 months'), sh: L('cocaína: baixos aos 3 a 4 meses', 'cocaine: low at 3 to 4 months') },
      { d: 441, t: L('metanfetamina: +19% aos 12 a 17 meses', 'methamphetamine: +19% at 12 to 17 months'), sh: L('metanfetamina: +19% aos 12 a 17 meses', 'meth: +19% at 12 to 17 months') }
    ];
    marks.forEach(function (mk, i) {
      var x = X(mk.d);
      DN.svg('circle', { cx: x, cy: by + 5, r: 4.5, 'class': 'w11c-md' }, svg);
      var ty = by + 26 + (mob ? i * 14 : 0);
      var str = mob ? mk.sh : mk.t;
      var anchor = i === 1 ? 'end' : 'start';
      var ax = i === 1 ? Math.min(G.x1, x + 40) : Math.max(G.x0, x - 8);
      if (mob) { anchor = 'start'; ax = G.x0 + 14; }
      DN.svg('line', { x1: x, x2: x, y1: by + 10, y2: ty - 10, 'class': 'w11c-lead' }, svg);
      var tx = DN.svg('text', { x: ax, y: ty, 'class': 'w11c-n', 'text-anchor': anchor }, svg);
      tx.textContent = str;
    });
  }

  function relabel() {
    take.textContent = L('O humor melhora dentro dos 30 dias. Um hábito leva cerca de dois meses, e os receptores medidos ainda estavam baixos aos três ou quatro meses.',
      'Mood improves within the 30 days. A habit takes about two months, and the receptors measured were still low at three to four months.');
    render();
  }
  relabel();
  DN.onLang(relabel);

  /* past this chart, the night words fade before the page dawns */
  function pre() {
    if (!window.DN_night) return;
    var r = svgWrap.getBoundingClientRect();
    window.DN_night.setPreDawn(r.top < (window.innerHeight || 800) * 0.35);
  }
  window.addEventListener('scroll', function () { requestAnimationFrame(pre); }, { passive: true });

  var rt = 0, lastW = root.clientWidth;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { if (Math.abs(root.clientWidth - lastW) > 2) { lastW = root.clientWidth; render(); } }, 150);
  });
})();
