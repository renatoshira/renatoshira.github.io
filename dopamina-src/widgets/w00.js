(function () {
  'use strict';
  var root = DN.body('w00'); if (!root) return;

  var CARDS = [
    ['prazer', 'dar prazer', 'give pleasure'],
    ['querer', 'fazer querer', 'make you want'],
    ['ensinar', 'ensinar o que vale repetir', 'teach what is worth repeating'],
    ['mover', 'mover o corpo', 'move the body'],
    ['prolactina', 'controlar a prolactina', 'control prolactin'],
    ['nausea', 'provocar náusea', 'cause nausea']
  ];

  /* ---------- risograph illustrations ----------
     Two spot inks (amber, indigo) printed on the paper. Each ink is its own
     layer: halftone screens at classic riso angles, a grain filter that eats
     into the ink, a slight misregistration, multiply where the inks overlap.
     Shapes use tokens: $0 solid ink, $1 $2 $3 light/mid/dark halftone. */
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
  /* archimedean spiral as a polyline path */
  function spiral(cx, cy, r0, r1, turns, ph) {
    var d = '', N = Math.round(turns * 40);
    for (var i = 0; i <= N; i++) {
      var t = i / N, a = ph + t * turns * Math.PI * 2, r = r0 + (r1 - r0) * t;
      d += (i ? 'L' : 'M') + f1(cx + Math.cos(a) * r) + ',' + f1(cy + Math.sin(a) * r);
    }
    return d;
  }
  /* teardrop with tip up, centered on the round part */
  function drop(cx, cy, r) {
    return 'M' + cx + ',' + f1(cy - r * 2) +
      'C' + f1(cx + r * 0.5) + ',' + f1(cy - r * 1.1) + ' ' + f1(cx + r) + ',' + f1(cy - r * 0.6) + ' ' + f1(cx + r) + ',' + cy +
      'A' + r + ',' + r + ' 0 0 1 ' + f1(cx - r) + ',' + cy +
      'C' + f1(cx - r) + ',' + f1(cy - r * 0.6) + ' ' + f1(cx - r * 0.5) + ',' + f1(cy - r * 1.1) + ' ' + cx + ',' + f1(cy - r * 2) + 'Z';
  }
  function spark(x, y, s) {
    return 'M' + x + ',' + (y - s) + 'Q' + x + ',' + y + ' ' + (x + s) + ',' + y + 'Q' + x + ',' + y + ' ' + x + ',' + (y + s) +
      'Q' + x + ',' + y + ' ' + (x - s) + ',' + y + 'Q' + x + ',' + y + ' ' + x + ',' + (y - s) + 'Z';
  }

  /* a = amber layer, b = indigo layer; viewBox 160 x 100, same margins for all */
  var ART = {
    prazer: function () {
      return {
        a: '<circle cx="62" cy="44" r="27" fill="$0"/>' +
          '<path d="' + spark(122, 22, 6) + '" fill="$0"/><path d="' + spark(134, 40, 3.5) + '" fill="$0"/>' +
          '<rect x="106" y="70" width="4" height="4" fill="$0" transform="rotate(20 108 72)"/>' +
          '<rect x="118" y="78" width="3" height="3" fill="$0" transform="rotate(-15 119 79)"/>' +
          '<rect x="128" y="64" width="3.4" height="3.4" fill="$0" transform="rotate(35 129 65)"/>',
        b: '<circle cx="86" cy="58" r="30" fill="$1"/>' +
          '<path d="M80,62 L118,96" stroke="$0" stroke-width="6" stroke-linecap="round" fill="none"/>' +
          '<path d="' + spiral(62, 44, 1, 23, 3.1, 0.4) + '" stroke="$0" stroke-width="3.6" stroke-linecap="round" fill="none"/>' +
          '<path d="' + spark(30, 24, 4) + '" fill="$0"/>'
      };
    },
    querer: function () {
      var hand = '<rect x="-8.5" y="-2" width="17" height="70" rx="2"/>' +
        '<rect x="-12" y="-22" width="24" height="25" rx="8"/>' +
        '<rect x="-12.4" y="-37" width="5.4" height="21" rx="2.7" transform="rotate(-9 -9.7 -18)"/>' +
        '<rect x="-5.9" y="-42" width="5.4" height="26" rx="2.7" transform="rotate(-3 -3.2 -18)"/>' +
        '<rect x="0.2" y="-41" width="5.4" height="25" rx="2.7" transform="rotate(3 2.9 -18)"/>' +
        '<rect x="6.6" y="-34" width="5.4" height="18" rx="2.7" transform="rotate(10 9.3 -18)"/>' +
        '<rect x="-24" y="-15" width="15" height="6" rx="3" transform="rotate(-40 -11 -10)"/>';
      var T = 'translate(30 98) rotate(52) scale(1.4)';
      return {
        a: '<circle cx="126" cy="26" r="19" fill="$1"/><circle cx="126" cy="26" r="9" fill="$0"/>' +
          '<rect x="-10" y="4" width="20" height="9" fill="$2" transform="' + T + '"/>' +
          '<path d="M84,38 l2,-6 M91,44 l6,-3" stroke="$0" stroke-width="2.2" stroke-linecap="round" fill="none"/>',
        b: '<g fill="$0" transform="' + T + '">' + hand + '</g>' +
          '<path d="M90,50 L112,34" stroke="$0" stroke-width="1.9" stroke-dasharray="0.1 4.4" stroke-linecap="round" fill="none"/>'
      };
    },
    ensinar: function () {
      var rays = '';
      for (var i = 0; i < 7; i++) {
        var a = Math.PI * (0.95 + i * 0.183), c = Math.cos(a), s = Math.sin(a);
        rays += 'M' + f1(46 + c * 23) + ',' + f1(38 + s * 23) + 'L' + f1(46 + c * 30) + ',' + f1(38 + s * 30);
      }
      return {
        a: '<circle cx="46" cy="38" r="26" fill="$1"/>' +
          '<path d="M30,38 A16,16 0 1 1 62,38 C62,46 56,50 55,57 L37,57 C36,50 30,46 30,38Z" fill="$0"/>' +
          '<path d="' + rays + '" stroke="$0" stroke-width="2.6" stroke-linecap="round" fill="none"/>' +
          '<path d="' + drop(118, 62, 9) + '" fill="$2"/>',
        b: '<rect x="37" y="58" width="18" height="12" rx="1.5" fill="$0"/>' +
          '<path d="M38,62 h16 M38,66 h16" stroke="#fff" class="ps" stroke-width="1.2"/>' +
          '<path d="M44,72 h4" stroke="$0" stroke-width="3" stroke-linecap="round"/>' +
          '<path d="M40,45 l3,-7 l3,7 l3,-7 l3,7" stroke="$0" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" fill="none"/>' +
          '<path d="M160,14 L124,14 Q118,14 118,20 L118,26" stroke="$0" stroke-width="7" fill="none"/>' +
          '<path d="' + drop(118, 58, 9) + '" fill="$0"/>' +
          '<ellipse cx="118" cy="86" rx="22" ry="4.5" fill="$2"/>' +
          '<path d="M74,48 l6,6 l-6,6 M84,48 l6,6 l-6,6" stroke="$0" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>'
      };
    },
    mover: function () {
      return {
        a: '<circle cx="120" cy="30" r="20" fill="$1"/>' +
          '<path d="M14,86 Q50,10 92,30" stroke="$0" stroke-width="2.4" stroke-dasharray="0.1 5.2" stroke-linecap="round" fill="none"/>' +
          '<ellipse cx="86" cy="88" rx="22" ry="3.6" fill="$2"/>' +
          '<circle cx="54" cy="46" r="6.5" fill="$0"/>' +
          '<circle cx="16" cy="84" r="3" fill="$0"/><circle cx="22" cy="87" r="2" fill="$0"/>',
        b: '<g fill="$0">' +
          '<ellipse cx="76" cy="54" rx="22" ry="13" transform="rotate(-14 76 54)"/>' +
          '<circle cx="99" cy="41" r="10.5"/>' +
          '<ellipse cx="94" cy="22" rx="4.2" ry="14" transform="rotate(-28 94 22)"/>' +
          '<ellipse cx="101" cy="22" rx="4.2" ry="14" transform="rotate(-12 101 22)"/>' +
          '<ellipse cx="53" cy="66" rx="15" ry="5" transform="rotate(22 53 66)"/>' +
          '<ellipse cx="100" cy="62" rx="9" ry="2.6" transform="rotate(58 100 62)"/>' +
          '<ellipse cx="94" cy="64" rx="9" ry="2.6" transform="rotate(64 94 64)"/>' +
          '</g><circle cx="102.5" cy="38.5" r="1.9" fill="#fff" class="pp"/>'
      };
    },
    prolactina: function () {
      return {
        a: '<path d="M44,14 L44,26" stroke="$0" stroke-width="3.4" fill="none"/>' +
          '<path d="M44,24 C31,24 28,34 33,41 C38,48 50,48 55,41 C60,34 57,24 44,24Z" fill="$0"/>' +
          '<rect x="95" y="24" width="22" height="8" rx="1.5" fill="$0"/>' +
          '<circle cx="112" cy="46" r="26" fill="$1"/>',
        b: '<path d="M4,0 H84 C84,12 66,18 44,18 C22,18 4,12 4,0Z" fill="$1"/>' +
          '<path d="M30,4 q7,6 14,0 t14,0" stroke="$0" stroke-width="1.8" stroke-linecap="round" fill="none"/>' +
          '<path d="M99,32 h14 v8 c0,4 9,6 9,13 v32 c0,4 -2,6 -6,6 h-20 c-4,0 -6,-2 -6,-6 v-32 c0,-7 9,-9 9,-13Z" fill="$2"/>' +
          '<path d="M90,60 c6,-3 10,3 16,0 s10,-3 16,0 v25 c0,4 -2,6 -6,6 h-20 c-4,0 -6,-2 -6,-6Z" fill="#fff" class="pp"/>' +
          '<path d="M99,32 h14 v8 c0,4 9,6 9,13 v32 c0,4 -2,6 -6,6 h-20 c-4,0 -6,-2 -6,-6 v-32 c0,-7 9,-9 9,-13Z" stroke="$0" stroke-width="2.6" fill="none" stroke-linejoin="round"/>' +
          '<path d="' + drop(66, 62, 4.5) + '" fill="$0"/>' +
          '<path d="' + drop(76, 82, 3) + '" fill="$0"/>' +
          '<path d="M48,50 C50,56 54,58 60,54" stroke="$0" stroke-width="1.6" stroke-dasharray="0.1 3.4" stroke-linecap="round" fill="none"/>'
      };
    },
    nausea: function () {
      var st = 'M68,2 L80,2 L80,18 C82,36 92,50 106,48 C112,47 116,44 118,40 L130,43 C128,56 122,66 112,74 C100,86 76,92 58,82 C42,72 40,44 50,28 C54,22 60,18 68,18 Z';
      return {
        a: '<circle cx="96" cy="56" r="32" fill="$1"/><path d="' + st + '" fill="$0"/>',
        b: '<path d="' + spiral(76, 62, 1, 17, 2.6, 2) + '" stroke="$0" stroke-width="3.4" stroke-linecap="round" fill="none"/>' +
          '<path d="M24,40 q5,-5 10,0 t10,0 M20,56 q5,-5 10,0 t10,0 M126,28 q5,-5 10,0 t10,0 M130,80 q5,-5 10,0 t10,0" stroke="$0" stroke-width="2.2" stroke-linecap="round" fill="none"/>' +
          '<circle cx="132" cy="54" r="3" fill="$2"/><circle cx="140" cy="46" r="2" fill="$0"/>'
      };
    }
  };

  var INKS = [
    { k: 'a', col: DN.COL.dopa, ang: 15, op: 0.95 },
    { k: 'b', col: DN.COL.pausa, ang: 75, op: 0.93 }
  ];
  function riso(key, idx) {
    var R = rng(1957 + idx * 101);
    var art = ART[key]();
    var id = 'w00r-' + key;
    var defs = '', layers = '';
    INKS.forEach(function (ink, li) {
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
      var mx = f1((R() < 0.5 ? -1 : 1) * (0.5 + R() * (li ? 1.3 : 0.6)));
      var my = f1((R() < 0.5 ? -1 : 1) * (0.4 + R() * (li ? 1.1 : 0.5)));
      var body = art[ink.k].replace(/\$0/g, ink.col).replace(/\$([123])/g, 'url(#' + p + 'h$1)');
      /* stray toner specks */
      for (var s = 0; s < 5; s++) body += '<circle cx="' + f1(8 + R() * 144) + '" cy="' + f1(6 + R() * 88) + '" r="' + f1(0.3 + R() * 0.5) + '" fill="' + ink.col + '"/>';
      layers += '<g class="w00-ink w00-ink-' + ink.k + '" style="--mx:' + mx + 'px;--my:' + my + 'px" opacity="' + ink.op + '" filter="url(#' + p + 'g)">' + body + '</g>';
    });
    return '<svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet" focusable="false"><defs>' + defs + '</defs>' + layers + '</svg>';
  }

  var saved = DN.store.get('quiz', null);
  var sel = {};
  if (Array.isArray(saved)) saved.forEach(function (k) { sel[k] = true; });
  var isSaved = Array.isArray(saved);

  root.innerHTML =
    '<div class="w00-stage">' +
    '<canvas class="w00-field" aria-hidden="true"></canvas>' +
    '<span class="w00-amber" aria-hidden="true"></span>' +
    '<div class="w00-q"></div>' +
    '<div class="w00-grid" role="group"></div>' +
    '<div class="w00-act"><button type="button" class="btn solid w00-save"></button><button type="button" class="btn w00-edit" hidden></button><span class="w00-count"></span></div>' +
    '</div>' +
    '<div class="live" aria-live="polite"></div>';

  var stage = root.querySelector('.w00-stage');
  var cv = root.querySelector('.w00-field');
  var amber = root.querySelector('.w00-amber');
  var q = root.querySelector('.w00-q');
  var grid = root.querySelector('.w00-grid');
  var saveB = root.querySelector('.w00-save');
  var editB = root.querySelector('.w00-edit');
  var count = root.querySelector('.w00-count');
  var live = root.querySelector('.live');

  var btns = CARDS.map(function (c, i) {
    var b = DN.el('button', { type: 'button', class: 'w00-card', 'data-k': c[0], 'aria-pressed': sel[c[0]] ? 'true' : 'false' }, grid);
    b.innerHTML = '<span class="w00-art" aria-hidden="true">' + riso(c[0], i) + '</span>' +
      '<span class="w00-meta"><span class="w00-n">0' + (i + 1) + '</span><span class="w00-box" aria-hidden="true"></span></span>' +
      '<span class="w00-t"></span>';
    b.addEventListener('click', function () {
      if (isSaved) return;
      sel[c[0]] = !sel[c[0]];
      b.setAttribute('aria-pressed', sel[c[0]] ? 'true' : 'false');
      relabel();
    });
    return b;
  });

  function nSel() { return CARDS.filter(function (c) { return sel[c[0]]; }).length; }

  function relabel() {
    q.textContent = DN.L('A dopamina serve para', 'Dopamine is for');
    grid.setAttribute('aria-label', DN.L('Funções da dopamina', 'Functions of dopamine'));
    btns.forEach(function (b, i) { b.querySelector('.w00-t').textContent = DN.L(CARDS[i][1], CARDS[i][2]); });
    saveB.textContent = DN.L('guardar', 'save');
    editB.textContent = DN.L('mudar a resposta', 'change the answer');
    var n = nSel();
    count.textContent = isSaved
      ? DN.L(n + ' de 6 guardados', n + ' of 6 saved')
      : DN.L(n + ' de 6 marcados', n + ' of 6 marked');
    saveB.hidden = isSaved;
    editB.hidden = !isSaved;
    stage.classList.toggle('saved', isSaved);
    btns.forEach(function (b) { b.disabled = isSaved; });
  }

  saveB.addEventListener('click', function () {
    var keys = CARDS.filter(function (c) { return sel[c[0]]; }).map(function (c) { return c[0]; });
    DN.store.set('quiz', keys);
    isSaved = true;
    relabel();
    live.textContent = DN.L(
      'Guardado. A correção de cada cartão aparece na seção 13.',
      'Saved. The correction for each card appears in section 13.');
    fly();
    editB.focus();
  });
  editB.addEventListener('click', function () {
    isSaved = false;
    relabel();
    live.textContent = DN.L('Marque de novo e toque em guardar.', 'Mark again and tap save.');
    btns[0].focus();
  });

  /* the amber dot flies to the margin and becomes the companion */
  function fly() {
    if (DN.RM || !amber.animate) return;
    var target = document.querySelector('#companion.on:not(.muted) .cn-dot');
    if (!target) return;
    var a = amber.getBoundingClientRect(), b = target.getBoundingClientRect();
    var ax = a.left + a.width / 2, ay = a.top + a.height / 2;
    var bx = b.left + b.width / 2, by = b.top + b.height / 2;
    var f = DN.el('span', { class: 'w00-flyer', 'aria-hidden': 'true' }, document.body);
    f.style.left = (ax - 4) + 'px'; f.style.top = (ay - 4) + 'px';
    var dx = bx - ax, dy = by - ay;
    var mx = dx * 0.5 + (dx > 0 ? -1 : 1) * Math.min(120, Math.abs(dy) * 0.2), my = dy * 0.5 - Math.min(140, Math.abs(dx) * 0.25 + 40);
    amber.style.opacity = '0';
    var an = f.animate([
      { transform: 'translate(0,0) scale(1)', opacity: 1 },
      { transform: 'translate(' + mx + 'px,' + my + 'px) scale(1.6)', opacity: 1, offset: 0.45 },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(.7)', opacity: 0.9 }
    ], { duration: 1000, easing: 'cubic-bezier(.2,.7,.2,1)' });
    an.onfinish = function () {
      f.remove();
      DN.emit('arrive');
      setTimeout(function () { amber.style.opacity = ''; }, 900);
    };
  }

  /* ---------- the dot field: a paper texture of 170,000 dots ---------- */
  function drawField() {
    var w = stage.clientWidth, h = stage.clientHeight;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    cv.style.width = w + 'px'; cv.style.height = h + 'px';
    var ctx = cv.getContext('2d');
    var W = cv.width, H = cv.height;
    var img = ctx.createImageData(W, H);
    var u = new Uint32Array(img.data.buffer);
    var N = w < 560 ? 40000 : 170000;
    var R = rng(170);
    for (var i = 0; i < N; i++) {
      var x = (R() * W) | 0, y = (R() * H) | 0;
      var a = (34 + R() * 46) | 0;
      /* #8a8a8a with alpha a, little endian ABGR */
      u[y * W + x] = (a << 24) | (0x8a << 16) | (0x8a << 8) | 0x8a;
    }
    ctx.putImageData(img, 0, 0);
    stage.setAttribute('data-n', N);
  }
  var rt;
  function onResize() { clearTimeout(rt); rt = setTimeout(drawField, 160); }
  if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(stage);
  else window.addEventListener('resize', onResize);

  DN.onVisible(stage, function (v) { stage.classList.toggle('vis', v); });

  relabel();
  if (isSaved) live.textContent = DN.L('Sua resposta está guardada. A correção aparece na seção 13.', 'Your answer is saved. The correction appears in section 13.');
  DN.onLang(function () {
    relabel();
    if (live.textContent) live.textContent = isSaved
      ? DN.L('Sua resposta está guardada. A correção aparece na seção 13.', 'Your answer is saved. The correction appears in section 13.')
      : DN.L('Marque de novo e toque em guardar.', 'Mark again and tap save.');
  });
  requestAnimationFrame(drawField);
})();
