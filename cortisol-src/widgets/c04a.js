/* c04a · a-banca : one minute of serial subtraction in front of a drawn panel, then the delayed cortisol curve */
(function () {
  'use strict';
  var root = DN.body('c04a'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, S = DN.svg, E = DN.el, C = DN.COL;

  var START = 1022, STEP = 13, SECS = 60;
  /* mode: rest (curve shown, never played), task, done (curve shown with score) */
  var st = { mode: 'rest', cur: START, best: START, ok: 0, resets: 0, t0: 0, left: SECS, speaker: 1, drawn: false };
  var timer = null, blinkT = null, bubbleT = null;

  /* ---------- risograph helpers (technique from dopamina-src/widgets/w00.js) ---------- */
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
  var INKS = [
    { k: 'a', col: C.alta, ang: 15, op: 0.94, mx: 1.2, my: -0.8 },
    { k: 'b', col: C.baixa, ang: 75, op: 0.92, mx: -1.4, my: 1.1 }
  ];
  function riso(id, vb, art, seed) {
    var R = rng(seed), defs = '', layers = '';
    INKS.forEach(function (ink) {
      var p = id + '-' + ink.k;
      [0.62, 0.92, 1.2].forEach(function (r, j) {
        defs += '<pattern id="' + p + 'h' + (j + 1) + '" width="2.8" height="2.8" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.4" cy="1.4" r="' + r + '" fill="' + ink.col + '"/></pattern>';
      });
      defs += '<filter id="' + p + 'g" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.07" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.6" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
      var body = art[ink.k].replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#' + p + 'h$1)');
      for (var s = 0; s < 9; s++) body += '<circle cx="' + f1(vb[0] + 8 + R() * (vb[2] - 16)) + '" cy="' + f1(vb[1] + 6 + R() * (vb[3] - 12)) + '" r="' + f1(0.3 + R() * 0.5) + '" fill="' + ink.col + '"/>';
      layers += '<g class="c04a-ink c04a-ink-' + ink.k + '" transform="translate(' + ink.mx + ' ' + ink.my + ')" opacity="' + ink.op + '" filter="url(#' + p + 'g)">' + body + '</g>';
    });
    return '<svg viewBox="' + vb.join(' ') + '" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false"><defs>' + defs + '</defs>' + layers + '</svg>';
  }

  /* ---------- the panel: three seated evaluators in lab coats, a table, a camera ----------
     viewBox 640 x 204. Head about 34 x 42, shoulders about 92 wide: 2.7 head widths, as in an adult. */
  function judge(cx, o) {
    var a = '', b = '';
    var hy = 62;
    /* skin: ears, neck, face (vermilion light screen) */
    a += '<ellipse cx="' + (cx - 17) + '" cy="' + (hy + 2) + '" rx="3.6" ry="6" fill="$1"/><ellipse cx="' + (cx + 17) + '" cy="' + (hy + 2) + '" rx="3.6" ry="6" fill="$1"/>';
    a += '<rect x="' + (cx - 6.5) + '" y="' + (hy + 14) + '" width="13" height="18" fill="$2"/>';
    a += '<ellipse cx="' + cx + '" cy="' + hy + '" rx="16.5" ry="21" fill="$1"/>';
    /* mouth: flat, no smile */
    a += '<path d="M' + (cx - 5.5) + ',' + (hy + 11) + ' h11" stroke="$0" stroke-width="1.6" stroke-linecap="round"/>';
    /* coat: paper white knocks out, teal outline, teal shading at the sides */
    b += '<path d="M' + (cx - 47) + ',158 L' + (cx - 45) + ',106 Q' + (cx - 43) + ',95 ' + (cx - 28) + ',92 L' + (cx + 28) + ',92 Q' + (cx + 43) + ',95 ' + (cx + 45) + ',106 L' + (cx + 47) + ',158Z" fill="#fff" class="c04a-pp"/>';
    a += '<path d="M' + (cx - 47) + ',158 L' + (cx - 45) + ',106 Q' + (cx - 43) + ',95 ' + (cx - 28) + ',92 L' + (cx + 28) + ',92 Q' + (cx + 43) + ',95 ' + (cx + 45) + ',106 L' + (cx + 47) + ',158Z" fill="#fff" class="c04a-pp"/>';
    /* shirt in the V of the coat */
    a += '<path d="M' + (cx - 11) + ',92 L' + cx + ',124 L' + (cx + 11) + ',92Z" fill="' + (o.tie ? '$2' : '$1') + '"/>';
    if (o.tie) b += '<path d="M' + (cx - 2.6) + ',96 L' + (cx + 2.6) + ',96 L' + (cx + 3.4) + ',116 L' + cx + ',121 L' + (cx - 3.4) + ',116Z" fill="$0"/>';
    b += '<path d="M' + (cx - 45) + ',112 Q' + (cx - 44) + ',132 ' + (cx - 47) + ',158 L' + (cx - 34) + ',158 Q' + (cx - 36) + ',130 ' + (cx - 38) + ',104Z" fill="$1"/>';
    b += '<path d="M' + (cx + 45) + ',112 Q' + (cx + 44) + ',132 ' + (cx + 47) + ',158 L' + (cx + 34) + ',158 Q' + (cx + 36) + ',130 ' + (cx + 38) + ',104Z" fill="$1"/>';
    b += '<path d="M' + (cx - 47) + ',158 L' + (cx - 45) + ',106 Q' + (cx - 43) + ',95 ' + (cx - 28) + ',92 L' + (cx + 28) + ',92 Q' + (cx + 43) + ',95 ' + (cx + 45) + ',106 L' + (cx + 47) + ',158" fill="none" stroke="$0" stroke-width="2" stroke-linejoin="round"/>';
    /* lapels */
    b += '<path d="M' + (cx - 14) + ',92 L' + (cx - 1) + ',128 M' + (cx + 14) + ',92 L' + (cx + 1) + ',128" stroke="$0" stroke-width="1.8" stroke-linecap="round"/>';
    b += '<path d="M' + (cx - 14) + ',92 L' + (cx - 22) + ',104 L' + (cx - 12) + ',108 M' + (cx + 14) + ',92 L' + (cx + 22) + ',104 L' + (cx + 12) + ',108" stroke="$0" stroke-width="1.5" fill="none" stroke-linejoin="round"/>';
    /* breast pocket with a pen */
    b += '<rect x="' + (cx + 20) + '" y="118" width="14" height="10" fill="none" stroke="$0" stroke-width="1.3"/>';
    a += '<rect x="' + (cx + 25) + '" y="111" width="2.6" height="11" fill="$0"/>';
    /* hair */
    b += o.hair(cx, hy);
    /* eyes and brows, in a group that blinks */
    b += '<g class="c04a-eyes c04a-e' + o.n + '"><circle cx="' + (cx - 6.5) + '" cy="' + (hy - 1) + '" r="1.9" fill="$0"/><circle cx="' + (cx + 6.5) + '" cy="' + (hy - 1) + '" r="1.9" fill="$0"/></g>';
    b += '<path d="M' + (cx - 10.5) + ',' + (hy - 7.5) + ' l7.5,0.6 M' + (cx + 10.5) + ',' + (hy - 7.5) + ' l-7.5,0.6" stroke="$0" stroke-width="1.8" stroke-linecap="round"/>';
    if (o.glasses) b += '<g fill="none" stroke="$0" stroke-width="1.3"><rect x="' + (cx - 12) + '" y="' + (hy - 5) + '" width="10" height="8" rx="2.5"/><rect x="' + (cx + 2) + '" y="' + (hy - 5) + '" width="10" height="8" rx="2.5"/><path d="M' + (cx - 2) + ',' + (hy - 2) + ' h4"/></g>';
    a += '<path d="M' + cx + ',' + (hy + 1) + ' l-1.6,5 h3" stroke="$0" stroke-width="1.1" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/>';
    return { a: a, b: b };
  }
  function hands(cx, kind) {
    var a = '', b = '';
    if (kind === 'clasp') {
      /* forearms on the table, hands folded */
      b += '<path d="M' + (cx - 42) + ',150 Q' + (cx - 30) + ',160 ' + (cx - 10) + ',158 L' + (cx - 8) + ',166 Q' + (cx - 34) + ',170 ' + (cx - 46) + ',160Z" fill="#fff" class="c04a-pp" stroke="$0" stroke-width="1.6"/>';
      b += '<path d="M' + (cx + 42) + ',150 Q' + (cx + 30) + ',160 ' + (cx + 10) + ',158 L' + (cx + 8) + ',166 Q' + (cx + 34) + ',170 ' + (cx + 46) + ',160Z" fill="#fff" class="c04a-pp" stroke="$0" stroke-width="1.6"/>';
      a += '<path d="M' + (cx - 10) + ',157 Q' + cx + ',152 ' + (cx + 10) + ',157 L' + (cx + 9) + ',167 Q' + cx + ',171 ' + (cx - 9) + ',167Z" fill="$1"/>';
    } else if (kind === 'write') {
      /* left hand holds a clipboard tilted on the table, right hand writes with a pen */
      a += '<g class="c04a-clip"><rect x="' + (cx - 34) + '" y="130" width="40" height="34" rx="2" transform="rotate(-8 ' + (cx - 14) + ' 147)" fill="$0"/>' +
        '<rect x="' + (cx - 30) + '" y="135" width="32" height="26" transform="rotate(-8 ' + (cx - 14) + ' 147)" fill="#fff" class="c04a-pp"/></g>';
      b += '<g transform="rotate(-8 ' + (cx - 14) + ' 147)"><rect x="' + (cx - 21) + '" y="128" width="14" height="5" rx="1" fill="$0"/>' +
        '<path d="M' + (cx - 27) + ',141 h20 M' + (cx - 27) + ',146 h22 M' + (cx - 27) + ',151 h16" stroke="$0" stroke-width="1" opacity=".75"/></g>';
      a += '<ellipse cx="' + (cx - 34) + '" cy="152" rx="6" ry="8" fill="$1"/>';
      b += '<path d="M' + (cx - 46) + ',140 Q' + (cx - 44) + ',152 ' + (cx - 38) + ',158 L' + (cx - 30) + ',150 Q' + (cx - 36) + ',140 ' + (cx - 38) + ',128Z" fill="#fff" class="c04a-pp" stroke="$0" stroke-width="1.6"/>';
      b += '<g class="c04a-pen"><path d="M' + (cx + 44) + ',140 Q' + (cx + 30) + ',156 ' + (cx + 12) + ',156 L' + (cx + 10) + ',164 Q' + (cx + 36) + ',166 ' + (cx + 47) + ',154Z" fill="#fff" class="c04a-pp" stroke="$0" stroke-width="1.6"/>' +
        '<path d="M' + (cx + 2) + ',149 L' + (cx + 12) + ',161" stroke="$0" stroke-width="2.4" stroke-linecap="round"/></g>';
      a += '<g class="c04a-pen"><ellipse cx="' + (cx + 9) + '" cy="159" rx="6" ry="5" fill="$1"/></g>';
    } else {
      /* arms crossed on the table */
      b += '<path d="M' + (cx - 44) + ',148 Q' + (cx - 20) + ',160 ' + (cx + 22) + ',156 L' + (cx + 24) + ',165 Q' + (cx - 22) + ',170 ' + (cx - 46) + ',160Z" fill="#fff" class="c04a-pp" stroke="$0" stroke-width="1.6"/>';
      b += '<path d="M' + (cx + 44) + ',148 Q' + (cx + 20) + ',156 ' + (cx - 22) + ',158 L' + (cx - 24) + ',166 Q' + (cx + 22) + ',168 ' + (cx + 46) + ',160Z" fill="#fff" class="c04a-pp" stroke="$0" stroke-width="1.6"/>';
      a += '<ellipse cx="' + (cx + 27) + '" cy="160" rx="5.5" ry="5" fill="$1"/><ellipse cx="' + (cx - 27) + '" cy="161" rx="5.5" ry="5" fill="$1"/>';
    }
    return { a: a, b: b };
  }
  function bancaArt() {
    var J = [
      { n: 0, x: 116, kind: 'write', glasses: false, tie: false,
        hair: function (cx, hy) { /* short hair, side part */
          return '<path d="M' + (cx - 17) + ',' + (hy - 2) + ' C' + (cx - 19) + ',' + (hy - 26) + ' ' + (cx + 16) + ',' + (hy - 30) + ' ' + (cx + 17.5) + ',' + (hy - 4) + ' C' + (cx + 10) + ',' + (hy - 14) + ' ' + (cx - 4) + ',' + (hy - 16) + ' ' + (cx - 12) + ',' + (hy - 10) + ' L' + (cx - 14) + ',' + (hy + 2) + 'Z" fill="$0"/>'; } },
      { n: 1, x: 300, kind: 'clasp', glasses: true, tie: true,
        hair: function (cx, hy) { /* receding, cropped */
          return '<path d="M' + (cx - 17) + ',' + (hy + 2) + ' C' + (cx - 19) + ',' + (hy - 20) + ' ' + (cx - 10) + ',' + (hy - 25) + ' ' + (cx - 3) + ',' + (hy - 22) + ' C' + (cx - 10) + ',' + (hy - 16) + ' ' + (cx - 14) + ',' + (hy - 10) + ' ' + (cx - 15) + ',' + (hy + 1) + 'Z" fill="$0"/>' +
            '<path d="M' + (cx + 17) + ',' + (hy + 2) + ' C' + (cx + 19) + ',' + (hy - 20) + ' ' + (cx + 10) + ',' + (hy - 25) + ' ' + (cx + 3) + ',' + (hy - 22) + ' C' + (cx + 10) + ',' + (hy - 16) + ' ' + (cx + 14) + ',' + (hy - 10) + ' ' + (cx + 15) + ',' + (hy + 1) + 'Z" fill="$0"/>'; } },
      { n: 2, x: 484, kind: 'cross', glasses: false, tie: false,
        hair: function (cx, hy) { /* hair tied back in a bun */
          return '<circle cx="' + (cx + 1) + '" cy="' + (hy - 25) + '" r="8" fill="$0"/>' +
            '<path d="M' + (cx - 17.5) + ',' + (hy + 4) + ' C' + (cx - 21) + ',' + (hy - 28) + ' ' + (cx + 21) + ',' + (hy - 28) + ' ' + (cx + 17.5) + ',' + (hy + 4) + ' C' + (cx + 14) + ',' + (hy - 12) + ' ' + (cx + 4) + ',' + (hy - 16) + ' ' + cx + ',' + (hy - 15) + ' C' + (cx - 4) + ',' + (hy - 16) + ' ' + (cx - 14) + ',' + (hy - 12) + ' ' + (cx - 17.5) + ',' + (hy + 4) + 'Z" fill="$0"/>'; } }
    ];
    var a = '', b = '';
    /* back wall line and floor */
    b += '<path d="M0,196 H640" stroke="$0" stroke-width="1.2" opacity=".6"/>';
    J.forEach(function (j) { var p = judge(j.x, j); a += p.a; b += p.b; });
    /* table: top edge, front panel in vermilion screen, a water glass and name plates */
    a += '<rect x="24" y="158" width="532" height="38" fill="$2"/>';
    b += '<path d="M18,158 H562" stroke="$0" stroke-width="3"/>';
    b += '<rect x="20" y="158" width="540" height="38" fill="none" stroke="$0" stroke-width="1.4"/>';
    J.forEach(function (j) {
      b += '<rect x="' + (j.x - 18) + '" y="170" width="36" height="13" fill="#fff" class="c04a-pp"/><rect x="' + (j.x - 18) + '" y="170" width="36" height="13" fill="none" stroke="$0" stroke-width="1.1"/><path d="M' + (j.x - 11) + ',176.5 h22" stroke="$0" stroke-width="1.4"/>';
    });
    J.forEach(function (j) { var h = hands(j.x, j.kind); a += h.a; b += h.b; });
    /* glass of water */
    b += '<path d="M392,134 L395,158 H405 L408,134Z" fill="none" stroke="$0" stroke-width="1.3"/><path d="M393.5,144 L395,158 H405 L406.5,144Z" fill="$1"/>';
    /* camera on a tripod, lens toward the reader, red recording light */
    b += '<path d="M600,118 L580,196 M600,118 L600,196 M600,118 L620,196" stroke="$0" stroke-width="2.2" stroke-linecap="round"/>';
    b += '<rect x="574" y="80" width="52" height="34" rx="3" fill="$0"/><rect x="584" y="72" width="20" height="9" rx="2" fill="$0"/>';
    b += '<circle cx="600" cy="97" r="12.5" fill="#fff" class="c04a-pp"/><circle cx="600" cy="97" r="12.5" fill="none" stroke="$0" stroke-width="2"/><circle cx="600" cy="97" r="6.5" fill="$3"/>';
    a += '<circle cx="600" cy="97" r="4" fill="$2"/>';
    a += '<circle class="c04a-rec" cx="618" cy="86" r="3.2" fill="$0"/>';
    return { a: a, b: b };
  }

  /* ---------- DOM ---------- */
  var stage = E('div', { class: 'c04a-stage' }, root);
  var bancaBox = E('div', { class: 'c04a-banca' }, stage);
  bancaBox.innerHTML = riso('c04a', [0, 24, 640, 176], bancaArt(), 1993);
  var bubble = E('div', { class: 'c04a-bubble', 'aria-hidden': 'true' }, stage);

  /* task area */
  var task = E('div', { class: 'c04a-task', hidden: '' }, root);
  var tRow = E('div', { class: 'c04a-trow' }, task);
  var lastBox = E('div', { class: 'c04a-last' }, tRow);
  var lastLab = E('div', { class: 'c04a-k' }, lastBox);
  var lastNum = E('div', { class: 'c04a-num' }, lastBox);
  var form = E('form', { class: 'c04a-form', autocomplete: 'off' }, tRow);
  var inpLab = E('label', { class: 'c04a-k', for: 'c04a-in' }, form);
  var inpRow = E('div', { class: 'c04a-inrow' }, form);
  var inp = E('input', { id: 'c04a-in', class: 'c04a-in', type: 'text', inputmode: 'numeric', pattern: '[0-9]*', maxlength: '4', autocomplete: 'off', enterkeyhint: 'done' }, inpRow);
  var okB = E('button', { class: 'btn solid c04a-ok', type: 'submit' }, inpRow);
  var clock = E('div', { class: 'c04a-clock' }, tRow);
  var clockLab = E('div', { class: 'c04a-k' }, clock);
  var clockNum = E('div', { class: 'c04a-num c04a-secs' }, clock);
  var bar = E('div', { class: 'c04a-bar' }, clock);
  var barIn = E('i', null, bar);
  var skipB = E('button', { class: 'btn c04a-skip', type: 'button' }, task);

  /* result area: chart plus side card */
  var res = E('div', { class: 'c04a-res' }, root);
  var chartBox = E('div', { class: 'c04a-chart' }, res);
  var side = E('div', { class: 'c04a-side' }, res);
  var score = E('div', { class: 'c04a-score' }, side);
  var keys = E('ul', { class: 'c04a-keys' }, side);
  var startB = E('button', { class: 'btn solid c04a-start', type: 'button' }, side);

  var take = E('p', { class: 'c04a-take' }, root);
  var live = E('p', { class: 'live sr', 'aria-live': 'polite' }, root);

  /* ---------- the curve ---------- */
  /* gamma-shaped pulses on a relative axis (1 = rest). Published anchors: brain signal (ACTH) peak 11 to 20 min,
     cortisol peak 21 to 40 min after the start, back to rest 41 to 60 min after the end (Dickerson & Kemeny 2004),
     peak inside 2 to 4 times rest (Kirschbaum 1993). The shape between anchors is illustrative. */
  function pulse(t, t0, tp, k, A) {
    if (t <= t0) return 1;
    var x = (t - t0) / tp;
    return 1 + A * Math.pow(x, k) * Math.exp(k * (1 - x));
  }
  function cort(t) { return pulse(t, 3, 27, 4, 2); }
  function acth(t) { return pulse(t, 1, 14, 4, 1.6); }

  var X0 = -10, X1 = 80, Y0 = 0.55, Y1 = 4.9;
  var G = {}, R = {};
  function drawChart(animate) {
    while (chartBox.firstChild) chartBox.removeChild(chartBox.firstChild);
    var W = chartBox.clientWidth || 460, mob = W < 420;
    var m = { l: mob ? 30 : 34, r: 8, t: 52, b: 42 }, ph = mob ? 178 : 196;
    var H = m.t + ph + m.b;
    var sv = S('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-labelledby': 'c04a-ct c04a-cd' }, chartBox);
    S('title', { id: 'c04a-ct' }, sv).textContent = L('Curva do cortisol durante e depois do teste com banca', 'Cortisol curve during and after the panel test');
    S('desc', { id: 'c04a-cd' }, sv).textContent = L(
      'Eixo do tempo de 10 minutos antes a 80 minutos depois do começo do teste; eixo vertical em múltiplos do repouso, de 1 a 4 vezes. O teste tem 10 minutos de preparação e 10 de discurso e contas, e acaba aos 20 minutos. O sinal do cérebro para as adrenais tem pico entre 11 e 20 minutos, e o cortisol vem depois, com pico entre 21 e 40 minutos, perto de 3 vezes o repouso, e volta ao repouso entre 61 e 80 minutos, ou 41 a 60 minutos depois do fim.',
      'Time axis from 10 minutes before to 80 minutes after the start of the test; vertical axis in multiples of rest, from 1 to 4 times. The test has 10 minutes of preparation and 10 of speech and arithmetic, and ends at 20 minutes. The brain signal to the adrenals peaks between 11 and 20 minutes, and cortisol follows, peaking between 21 and 40 minutes, near 3 times rest, and returns to rest between 61 and 80 minutes, or 41 to 60 minutes after the end.');
    var pw = W - m.l - m.r;
    function x(t) { return m.l + (t - X0) / (X1 - X0) * pw; }
    function y(v) { return m.t + ph - (v - Y0) / (Y1 - Y0) * ph; }
    G = { x: x, y: y, W: W, H: H, m: m, ph: ph };

    /* band 2x to 4x */
    S('rect', { x: m.l, y: y(4), width: pw, height: y(2) - y(4), class: 'c04a-band' }, sv);
    /* grid */
    [1, 2, 3, 4].forEach(function (v) {
      S('line', { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v), class: v === 1 ? 'c04a-base' : 'c04a-grid' }, sv);
      var tx = S('text', { x: m.l - 6, y: y(v), 'text-anchor': 'end', 'dominant-baseline': 'central', class: 'c04a-tick' }, sv);
      tx.textContent = v + '×';
    });
    S('text', { x: x(-9.5), y: y(1) - 8, class: 'c04a-tick c04a-tsm' }, sv).textContent = L('repouso', 'rest');
    /* x axis */
    var ay = m.t + ph;
    S('line', { x1: m.l, x2: W - m.r, y1: ay, y2: ay, class: 'c04a-axis' }, sv);
    for (var t = -10; t <= 80; t += 10) {
      S('line', { x1: x(t), x2: x(t), y1: ay, y2: ay + 4, class: 'c04a-axis' }, sv);
      if (mob && (t === -10 || t === 70)) continue;
      S('text', { x: x(t), y: ay + 15, 'text-anchor': 'middle', class: 'c04a-tick' }, sv).textContent = (t > 0 ? '+' : t < 0 ? '\u2212' : '') + Math.abs(t);
    }
    S('text', { x: W - m.r, y: ay + 33, 'text-anchor': 'end', class: 'c04a-tick' }, sv).textContent = L('minutos desde o começo do teste', 'minutes since the test began');
    /* windows on the axis */
    [[11, 20, 'c04a-win-s'], [21, 40, 'c04a-win-c'], [61, 80, 'c04a-win-r']].forEach(function (w) {
      S('line', { x1: x(w[0]), x2: x(w[1]), y1: ay - 0.5, y2: ay - 0.5, class: 'c04a-win ' + w[2] }, sv);
    });

    /* test blocks on top */
    var by = 36;
    S('rect', { x: x(0), y: by, width: x(10) - x(0), height: 9, class: 'c04a-blk1' }, sv);
    S('rect', { x: x(10), y: by, width: x(20) - x(10), height: 9, class: 'c04a-blk2' }, sv);
    S('line', { x1: x(0), x2: x(0), y1: 6, y2: by, class: 'c04a-lead' }, sv);
    S('line', { x1: x(10), x2: x(10), y1: 22, y2: by, class: 'c04a-lead' }, sv);
    S('text', { x: x(0) + 4, y: 13, class: 'c04a-lab' }, sv).textContent = L('preparação, 10 min', 'preparation, 10 min');
    S('text', { x: x(10) + 4, y: 29, class: 'c04a-lab' }, sv).textContent = L('discurso e contas, 10 min', 'speech and arithmetic, 10 min');
    /* end of test marker */
    S('line', { x1: x(20), x2: x(20), y1: by, y2: ay, class: 'c04a-end' }, sv);
    S('text', { x: x(20) + 5, y: y(0.73), 'dominant-baseline': 'central', class: 'c04a-lab c04a-endt' }, sv).textContent = L('o teste acabou aqui', 'the test ended here');

    /* curves */
    function path(fn) {
      var d = '';
      for (var t = X0; t <= X1 + 1e-9; t += 0.5) d += (d ? 'L' : 'M') + f1(x(t)) + ',' + f1(y(fn(t)));
      return d;
    }
    R.acth = S('path', { d: path(acth), class: 'c04a-acth' }, sv);
    R.cort = S('path', { d: path(cort), class: 'c04a-cort' }, sv);
    /* peak dot */
    R.pk = S('circle', { cx: x(30), cy: y(cort(30)), r: 3.5, class: 'c04a-pk' }, sv);

    /* direct labels with short leaders, above the band */
    var ly1 = y(4.62), ly2 = y(4.25);
    R.labs = S('g', { class: 'c04a-labs' }, sv);
    var tA = L(['sinal do cérebro', 'para as adrenais'], ['brain signal', 'to the adrenals']);
    var t1 = S('text', { x: x(-10) + 3, y: mob ? y(4.78) : ly1, class: 'c04a-lab c04a-labA c04a-halo' }, R.labs);
    if (mob) {
      S('tspan', { x: x(-10) + 3, dy: 0 }, t1).textContent = tA[0];
      S('tspan', { x: x(-10) + 3, dy: 13 }, t1).textContent = tA[1];
    } else {
      t1.setAttribute('dominant-baseline', 'central');
      t1.textContent = tA[0] + ' ' + tA[1];
    }
    var la = mob ? y(4.78) + 18 : ly1 + 7;
    S('line', { x1: x(15), x2: x(15), y1: la, y2: y(acth(15)) - 5, class: 'c04a-lead' }, R.labs);
    var t2 = S('text', { x: x(31.5), y: ly2, 'dominant-baseline': 'central', class: 'c04a-lab c04a-labC c04a-halo' }, R.labs);
    t2.textContent = L('cortisol na saliva', 'cortisol in saliva');
    S('line', { x1: x(30), x2: x(30), y1: ly2 + 7, y2: y(cort(30)) - 6, class: 'c04a-lead' }, R.labs);
    try {
      var b2 = t2.getBBox();
      if (b2.x + b2.width > W - m.r) t2.setAttribute('x', W - m.r - b2.width);
    } catch (e) {}

    if (animate && !DN.RM) reveal();
  }
  function reveal() {
    [R.acth, R.cort].forEach(function (p, i) {
      var len = p.getTotalLength();
      p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
      p.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 900, delay: i * 600, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' })
        .onfinish = function () { p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; };
    });
    R.pk.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 1350, fill: 'backwards' });
    R.labs.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, delay: 600, fill: 'backwards' });
  }

  /* ---------- side card ---------- */
  function renderSide() {
    if (st.mode === 'done') {
      var n = st.best;
      score.innerHTML = '<div class="c04a-k">' + L('seu minuto', 'your minute') + '</div>' +
        '<div class="c04a-sc">' + (n < START ? L('Você chegou a ', 'You reached ') + '<b>' + fmt(n) + '</b>.' : L('Você ficou no ', 'You stayed at ') + '<b>' + fmt(START) + '</b>.') + '</div>' +
        '<div class="c04a-sub">' + L(st.ok + (st.ok === 1 ? ' conta certa' : ' contas certas') + ', ' + st.resets + (st.resets === 1 ? ' recomeço' : ' recomeços') + '. No teste completo, o pico do cortisol viria de 1 a 20 minutos depois do fim.',
          st.ok + (st.ok === 1 ? ' correct step' : ' correct steps') + ', ' + st.resets + (st.resets === 1 ? ' restart' : ' restarts') + '. In the full test, the cortisol peak would come 1 to 20 minutes after the end.') + '</div>';
      score.hidden = false;
    } else {
      score.innerHTML = '';
      score.hidden = true;
    }
    keys.innerHTML =
      '<li><i class="c04a-sw c04a-sw-band"></i><span>' + L('2× a 4× o repouso: o pico no teste completo', '2× to 4× rest: the peak in the full test') + '</span></li>' +
      '<li><i class="c04a-sw c04a-sw-s"></i><span>' + L('pico do sinal: de 11 a 20 min', 'signal peak: 11 to 20 min') + '</span></li>' +
      '<li><i class="c04a-sw c04a-sw-c"></i><span>' + L('pico do cortisol: de 21 a 40 min', 'cortisol peak: 21 to 40 min') + '</span></li>' +
      '<li><i class="c04a-sw c04a-sw-r"></i><span>' + L('volta ao repouso: de 41 a 60 min depois do fim', 'back to rest: 41 to 60 min after the end') + '</span></li>';
    startB.textContent = st.mode === 'done' ? L('Fazer o minuto de novo', 'Do the minute again') : L('Começar o minuto diante da banca', 'Start the minute in front of the panel');
  }

  /* ---------- task ---------- */
  var SAY = [
    ['Errado. Comece de novo do 1.022.', 'Wrong. Start again from 1,022.']
  ];
  function setTexts() {
    lastLab.textContent = L('último número certo', 'last correct number');
    inpLab.textContent = L('menos 13 é', 'minus 13 is');
    okB.textContent = L('ok', 'ok');
    clockLab.textContent = L('tempo', 'time');
    skipB.textContent = L('Pular a tarefa e ver a curva', 'Skip the task and see the curve');
    inp.setAttribute('aria-label', L('Digite o último número certo menos 13', 'Type the last correct number minus 13'));
    take.textContent = L('O cortisol chega atrasado, com o pico de 21 a 40 minutos depois do começo do teste, quando a parte difícil está acabando ou já acabou, e some em cerca de uma hora.',
      'Cortisol arrives late, peaking 21 to 40 minutes after the test begins, when the hard part is ending or already over, and it fades in about an hour.');
    lastNum.textContent = fmt(st.cur);
    clockNum.textContent = '0:' + String(Math.ceil(st.left)).padStart(2, '0');
  }
  function say(msg) {
    var j = [0, 1, 2][st.speaker % 3]; st.speaker++;
    bubble.textContent = msg;
    bubble.className = 'c04a-bubble c04a-by' + j + ' on';
    clearTimeout(bubbleT);
    bubbleT = setTimeout(function () { bubble.classList.remove('on'); }, 2400);
  }
  function startTask() {
    st.mode = 'task'; st.cur = START; st.best = START; st.ok = 0; st.resets = 0; st.left = SECS;
    stage.classList.add('c04a-big');
    res.hidden = true; task.hidden = false; take.hidden = true;
    inp.value = ''; setTexts();
    barIn.style.transform = 'scaleX(1)';
    st.t0 = performance.now();
    clearInterval(timer);
    timer = setInterval(tick, 100);
    scheduleBlink();
    try { inp.focus({ preventScroll: true }); } catch (e) { inp.focus(); }
    live.textContent = L('O minuto começou; subtraia 13 de 1.022.', 'The minute has started; subtract 13 from 1,022.');
  }
  function tick() {
    var el = (performance.now() - st.t0) / 1000;
    st.left = Math.max(0, SECS - el);
    clockNum.textContent = '0:' + String(Math.ceil(st.left)).padStart(2, '0');
    barIn.style.transform = 'scaleX(' + (st.left / SECS).toFixed(4) + ')';
    if (st.left <= 0) endTask(false);
  }
  function check() {
    var v = parseInt(inp.value.replace(/\D/g, ''), 10);
    if (isNaN(v)) return;
    var want = st.cur - STEP;
    inp.value = '';
    if (v === want) {
      st.cur = want; st.ok++;
      if (want < st.best) st.best = want;
      lastNum.textContent = fmt(st.cur);
      lastNum.classList.remove('c04a-flash'); void lastNum.offsetWidth; lastNum.classList.add('c04a-flash');
      live.textContent = L('Certo: ', 'Right: ') + fmt(st.cur);
      if (st.cur - STEP < 0) endTask(false);
    } else {
      st.cur = START; st.resets++;
      lastNum.textContent = fmt(st.cur);
      var msg = L(SAY[0][0], SAY[0][1]);
      say(msg);
      live.textContent = msg;
      inp.classList.remove('c04a-bad'); void inp.offsetWidth; inp.classList.add('c04a-bad');
    }
  }
  form.addEventListener('submit', function (e) { e.preventDefault(); check(); try { inp.focus({ preventScroll: true }); } catch (er) {} });
  inp.addEventListener('input', function () {
    inp.value = inp.value.replace(/\D/g, '').slice(0, 4);
    var want = String(st.cur - STEP);
    if (inp.value.length >= want.length) check();
  });
  function endTask(skipped) {
    if (st.mode !== 'task') return;
    clearInterval(timer); clearTimeout(blinkT); clearTimeout(bubbleT);
    bubble.classList.remove('on');
    root.querySelectorAll('.c04a-blink,.c04a-writing').forEach(function (n) { n.classList.remove('c04a-blink', 'c04a-writing'); });
    st.mode = 'done';
    try { inp.blur(); } catch (e) {}
    stage.classList.remove('c04a-big');
    task.hidden = true; res.hidden = false; take.hidden = false;
    renderSide();
    drawChart(true);
    live.textContent = (skipped ? L('Tarefa pulada. ', 'Task skipped. ') : L('Tempo esgotado. ', 'Time is up. ')) +
      (st.best < START ? L('Você chegou a ', 'You reached ') + fmt(st.best) + '. ' : '') +
      L('A curva mostra o pico do cortisol entre 21 e 40 minutos depois do começo do teste.', 'The curve shows the cortisol peak between 21 and 40 minutes after the test began.');
  }
  skipB.addEventListener('click', function () { endTask(true); });
  startB.addEventListener('click', startTask);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && st.mode === 'task') endTask(true); });

  /* evaluators blink and write, one at a time, every 8 to 12 s */
  var who = 0;
  function scheduleBlink() {
    clearTimeout(blinkT);
    if (DN.RM) return;
    blinkT = setTimeout(function () {
      if (st.mode !== 'task') return;
      var j = who % 3; who++;
      var eyes = root.querySelectorAll('.c04a-e' + j);
      eyes.forEach(function (n) { n.classList.remove('c04a-blink'); void n.getBoundingClientRect(); n.classList.add('c04a-blink'); });
      if (j === 0) root.querySelectorAll('.c04a-pen').forEach(function (n) { n.classList.add('c04a-writing'); setTimeout(function () { n.classList.remove('c04a-writing'); }, 2600); });
      scheduleBlink();
    }, who === 0 ? 2200 : 8000 + Math.random() * 4000);
  }

  /* ---------- lang, resize ---------- */
  function render() {
    setTexts();
    renderSide();
    if (!res.hidden) drawChart(false);
  }
  DN.onLang(render);
  var rw = 0, rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { var w = chartBox.clientWidth; if (w && w !== rw && !res.hidden) { rw = w; drawChart(false); } }, 150);
  });
  setTexts(); renderSide(); drawChart(false); rw = chartBox.clientWidth;
  if (!DN.RM) DN.onVisible(chartBox, function (v) { if (v && !st.drawn) { st.drawn = true; drawChart(true); } }, { once: true, threshold: 0.4 });
})();
