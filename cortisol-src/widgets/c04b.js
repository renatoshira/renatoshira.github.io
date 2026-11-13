/* c04b · plateia-e-controle : audience x control, Dickerson & Kemeny 2004 effect sizes, static */
(function () {
  'use strict';
  var root = DN.body('c04b'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, S = DN.svg, E = DN.el, C = DN.COL;

  var D0 = -0.2, D1 = 1.2;
  /* cells: ev = someone evaluates, ctl = controllable. pct = share of the control group below the stressed group's mean, Phi(d) */
  var CELLS = [
    { k: 'none', ev: 0, ctl: 1, d: null, name: ['nenhum dos dois', 'neither'] },
    { k: 'unc', ev: 0, ctl: 0, d: 0.32, pct: ['cerca de 63%', 'about 63%'], name: ['só falta de controle', 'uncontrollable only'] },
    { k: 'eval', ev: 1, ctl: 1, d: 0.35, pct: ['cerca de 63%', 'about 63%'], name: ['só avaliação', 'evaluation only'] },
    { k: 'both', ev: 1, ctl: 0, d: 0.92, ci: [0.70, 1.14], pct: ['82%', '82%'], name: ['os dois juntos', 'both together'] }
  ];
  var STRIP = [
    { d: -0.13, name: ['filme triste ou assustador', 'sad or frightening film'], cls: 'z' },
    { d: -0.06, name: ['barulho', 'noise'], cls: 'z' },
    { d: 0.39, name: ['falar em público', 'public speaking'], cls: 'i' },
    { d: 0.87, name: ['falar e fazer contas', 'speaking plus arithmetic'], cls: 'a' }
  ];

  /* ---------- risograph icons (technique from dopamina-src/widgets/w00.js) ---------- */
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
    { k: 'a', col: C.alta, ang: 15, op: 0.95, mx: 0.6, my: -0.5 },
    { k: 'b', col: C.baixa, ang: 75, op: 0.93, mx: -0.8, my: 0.6 }
  ];
  function riso(id, vb, art, seed) {
    var R = rng(seed), defs = '', layers = '';
    INKS.forEach(function (ink) {
      var p = id + '-' + ink.k;
      [0.55, 0.85, 1.1].forEach(function (r, j) {
        defs += '<pattern id="' + p + 'h' + (j + 1) + '" width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.2" cy="1.2" r="' + r + '" fill="' + ink.col + '"/></pattern>';
      });
      defs += '<filter id="' + p + 'g" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="0.9" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.6 0 0 0 2.3" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
      var body = art[ink.k].replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#' + p + 'h$1)');
      layers += '<g class="c04b-ink c04b-ink-' + ink.k + '" transform="translate(' + ink.mx + ' ' + ink.my + ')" opacity="' + ink.op + '" filter="url(#' + p + 'g)">' + body + '</g>';
    });
    return '<svg class="c04b-ico" viewBox="' + vb.join(' ') + '" aria-hidden="true" focusable="false"><defs>' + defs + '</defs>' + layers + '</svg>';
  }
  var EYE = {
    a: '<circle cx="20" cy="14" r="7.5" fill="$2"/><circle cx="20" cy="14" r="3.2" fill="$0"/>',
    b: '<path d="M2,14 Q20,-2 38,14 Q20,30 2,14Z" fill="none" stroke="$0" stroke-width="2.4" stroke-linejoin="round"/><circle cx="20" cy="14" r="3.2" fill="$0"/><circle cx="22.4" cy="11.6" r="1.2" fill="#fff"/>'
  };
  var LOCK = {
    a: '<rect x="9" y="13" width="22" height="15" rx="2" fill="$2"/><circle cx="20" cy="19.5" r="2.4" fill="$0"/><rect x="19" y="20" width="2" height="4.5" fill="$0"/>',
    b: '<path d="M13,13 V8.5 A7,7 0 0 1 27,8.5 V9" fill="none" stroke="$0" stroke-width="2.6" stroke-linecap="round" transform="translate(6 -3) rotate(18 27 9)"/>' +
      '<rect x="9" y="13" width="22" height="15" rx="2" fill="none" stroke="$0" stroke-width="2.2"/>'
  };

  /* ---------- DOM ---------- */
  var mat = E('div', { class: 'c04b-mat' }, root);
  var key = E('p', { class: 'c04b-key' }, root);
  var note = E('p', { class: 'c04b-note' }, root);
  var stripT = E('div', { class: 'c04b-glab' }, root);
  var strip = E('div', { class: 'c04b-strip' }, root);
  var take = E('p', { class: 'c04b-take' }, root);
  var more = E('details', { class: 'more c04b-more' }, root);
  var bars = [], seen = DN.RM, built = false;

  function yesno(v) { return v ? L('sim', 'yes') : L('não', 'no'); }
  function barSvg(w, d, cls, ci, noTicks) {
    var h = noTicks ? 26 : 40, sv = S('svg', { width: w, height: h, viewBox: '0 0 ' + w + ' ' + h, 'aria-hidden': 'true' });
    var x = function (v) { return 2 + (v - D0) / (D1 - D0) * (w - 8); };
    [0.2, 0.5, 0.8].forEach(function (v) { S('line', { x1: x(v), x2: x(v), y1: 2, y2: 24, class: 'c04b-grid' }, sv); });
    if (!noTicks) [[0, '0'], [0.2, fmt(0.2, 1)], [0.5, fmt(0.5, 1)], [0.8, fmt(0.8, 1)], [1.2, fmt(1.2, 1)]].forEach(function (q) {
      S('text', { x: x(q[0]), y: 36, 'text-anchor': q[0] === 1.2 ? 'end' : 'middle', class: 'c04b-tick' }, sv).textContent = q[1];
    });
    if (d != null) {
      var x0 = x(Math.min(0, d)), x1 = x(Math.max(0, d));
      var r = S('rect', { x: x0, y: 6, width: Math.max(1, x1 - x0), height: 14, class: 'c04b-bar c04b-' + cls }, sv);
      r.style.transformOrigin = x(0) + 'px 0px';
      bars.push({ el: r, last: cls === 'a' });
      if (ci) {
        var g = S('g', { class: 'c04b-ci' }, sv);
        S('line', { x1: x(ci[0]), x2: x(ci[1]), y1: 13, y2: 13 }, g);
        S('line', { x1: x(ci[0]), x2: x(ci[0]), y1: 8, y2: 18 }, g);
        S('line', { x1: x(ci[1]), x2: x(ci[1]), y1: 8, y2: 18 }, g);
        bars.push({ el: g, last: true, fade: true });
      }
    }
    S('line', { x1: x(0), x2: x(0), y1: 0, y2: 26, class: 'c04b-zero' }, sv);
    return sv;
  }

  function build() {
    bars = [];
    mat.innerHTML = '';
    var mob = root.clientWidth < 560;
    mat.classList.toggle('c04b-mob', mob);
    var cellsEl = {};
    if (!mob) {
      E('div', { class: 'c04b-corner' }, mat);
      [1, 0].forEach(function (ctl) {
        var h = E('div', { class: 'c04b-colh' }, mat);
        h.innerHTML = riso('c04b-l' + ctl, [0, 0, 40, 30], LOCK, 37 + ctl) +
          '<span>' + L('dá para controlar', 'can be controlled') + ': <b>' + yesno(ctl) + '</b></span>';
      });
    }
    [0, 1].forEach(function (ev) {
      if (!mob) {
        var rh = E('div', { class: 'c04b-rowh' }, mat);
        rh.innerHTML = riso('c04b-e' + ev, [0, 0, 40, 28], EYE, 11 + ev) +
          '<span>' + L('alguém avalia', 'someone evaluates') + ': <b>' + yesno(ev) + '</b></span>';
      }
      [1, 0].forEach(function (ctl) {
        var c = CELLS.filter(function (q) { return q.ev === ev && q.ctl === ctl; })[0];
        var cell = E('div', { class: 'c04b-cell c04b-c-' + c.k }, mat);
        cellsEl[c.k] = cell;
        if (mob) E('div', { class: 'c04b-attr' }, cell, '<span>' + L('alguém avalia', 'someone evaluates') + ': <b>' + yesno(ev) + '</b></span><span>' + L('dá para controlar', 'can be controlled') + ': <b>' + yesno(ctl) + '</b></span>');
        E('div', { class: 'c04b-name' }, cell, L(c.name[0], c.name[1]));
        if (c.d != null) {
          E('div', { class: 'c04b-pct' }, cell, L(c.pct[0], c.pct[1]));
          E('div', { class: 'c04b-d' }, cell, 'd = ' + fmt(c.d, 2) + (c.ci ? ' <span>(' + L('IC ', 'CI ') + fmt(c.ci[0], 2) + L(' a ', ' to ') + fmt(c.ci[1], 2) + ')</span>' : ''));
        } else {
          E('div', { class: 'c04b-pct c04b-none' }, cell, L('tarefas sem esses ingredientes', 'tasks without these ingredients'));
          E('div', { class: 'c04b-d' }, cell, L('sem número separado neste gráfico', 'no separate number in this chart'));
        }
      });
    });
    /* mobile order: none, evaluation, control, both */
    if (mob) ['none', 'eval', 'unc', 'both'].forEach(function (k) { mat.appendChild(cellsEl[k]); });
    var bw = Math.floor(cellsEl.both.clientWidth - (mob ? 24 : 28));
    CELLS.forEach(function (c) {
      var b = E('div', { class: 'c04b-bw' }, cellsEl[c.k]);
      b.appendChild(barSvg(bw, c.d, c.k === 'both' ? 'a' : (c.d == null ? 'g' : 'i'), c.ci));
    });

    key.innerHTML = L('<b>%</b> = parte do grupo de controle que ficou abaixo da média do grupo estressado. <b>d</b> = distância entre os grupos em desvios padrão.',
      '<b>%</b> = share of the control group that stayed below the stressed group’s average. <b>d</b> = distance between the groups in standard deviations.');
    note.innerHTML = '<i aria-hidden="true">=</i><span>' + L('A sensação de estresse relatada foi igual com e sem os dois ingredientes.', 'The reported feeling of stress was the same with and without the two ingredients.') + '</span>';
    stripT.textContent = L('Por tipo de tarefa, na mesma escala', 'By type of task, on the same scale');

    strip.innerHTML = '';
    STRIP.forEach(function (s, si) {
      var row = E('div', { class: 'c04b-srow' }, strip);
      var lab = E('div', { class: 'c04b-slab' }, row);
      lab.innerHTML = '<span>' + L(s.name[0], s.name[1]) + '</span><b class="c04b-sd c04b-sd-' + s.cls + '">d = ' + (s.d < 0 ? '−' : '') + fmt(Math.abs(s.d), 2) + '</b>' +
        (s.cls === 'z' ? '<em>' + L('sem diferença do zero', 'no different from zero') + '</em>' : '');
      var b = E('div', { class: 'c04b-bw' }, row);
      b.appendChild(barSvg(bw, s.d, s.cls, null, si < STRIP.length - 1));
    });

    take.textContent = L('Com plateia e sem controle, o efeito é quase três vezes o de cada ingrediente sozinho, enquanto filme triste e barulho ficaram no zero.',
      'With an audience and no control, the effect is almost three times that of either ingredient alone, while sad films and noise stayed at zero.');

    var rows = CELLS.filter(function (c) { return c.d != null; }).map(function (c) {
      return '<tr><td>' + L(c.name[0], c.name[1]) + '</td><td>' + fmt(c.d, 2) + (c.ci ? ' (' + fmt(c.ci[0], 2) + L(' a ', ' to ') + fmt(c.ci[1], 2) + ')' : '') + '</td><td>' + L(c.pct[0], c.pct[1]) + '</td></tr>';
    }).concat(STRIP.map(function (s) {
      return '<tr><td>' + L(s.name[0], s.name[1]) + '</td><td>' + (s.d < 0 ? '−' : '') + fmt(Math.abs(s.d), 2) + '</td><td>' + (s.cls === 'z' ? L('sem diferença do zero', 'no different from zero') : '') + '</td></tr>';
    })).join('');
    var open = more.open;
    more.innerHTML = '<summary>' + L('Ver os números em tabela', 'See the numbers as a table') + '</summary><table class="t"><thead><tr><th>' +
      L('situação', 'condition') + '</th><th>d</th><th>%</th></tr></thead><tbody>' + rows + '</tbody></table>';
    more.open = open;

    if (!seen) bars.forEach(function (b) { if (b.fade) b.el.style.opacity = 0; else b.el.style.transform = 'scaleX(0)'; });
    built = true;
  }
  function grow() {
    var i = 0;
    bars.forEach(function (b) {
      var delay = b.last ? 4 * 120 + 300 : (i++ % 4) * 120;
      if (b.fade) {
        b.el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: delay + 450, fill: 'forwards' }).onfinish = function () { b.el.style.opacity = ''; };
      } else {
        b.el.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 450, delay: delay, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' }).onfinish = function () { b.el.style.transform = ''; };
      }
    });
  }
  build();
  DN.onLang(build);
  var rw = root.clientWidth, rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { if (root.clientWidth !== rw) { rw = root.clientWidth; build(); } }, 150); });
  if (!seen) DN.onVisible(mat, function (v) { if (v && !seen) { seen = true; grow(); } }, { once: true, threshold: 0.35 });
})();
