/* c06b · tres-retratos : the same person three times, Cushing, a stressful semester, the TikTok "cortisol face" */
(function () {
  'use strict';
  var root = DN.body('c06b'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, S = DN.svg, E = DN.el, C = DN.COL;

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

  /* ---------- the figure, head to hips, about 3.6 heads tall ----------
     viewBox 200 x 250. Layer a = vermilion (skin at a 15% screen, flush, marks),
     layer b = teal (hair, features, shadows, the top). $0 solid, $1 $2 $3 screens. */
  function figure(v) {
    var cu = v === 0, st = v === 1, pf = v === 2;
    var a = '', b = '';
    /* torso skin: shoulders and upper chest; Cushing has a wider trunk and belly */
    var sh = cu ? 'M56,104 C58,94 74,90 86,89 L114,89 C126,90 142,94 144,104 L140,134 L60,134Z'
      : 'M54,104 C56,94 72,90 86,89 L114,89 C128,90 144,94 146,104 L140,134 L60,134Z';
    a += '<path d="' + sh + '" fill="$1"/>';
    /* the hump behind the neck and the pads above the collarbones */
    if (cu) {
      a += '<path d="M76,96 C78,76 122,76 124,96Z" fill="$1"/>';
      b += '<path d="M78,92 C82,80 118,80 122,92" stroke="$2" stroke-width="5" fill="none"/>';
      a += '<ellipse cx="84" cy="96" rx="9" ry="4.6" fill="$2"/><ellipse cx="116" cy="96" rx="9" ry="4.6" fill="$2"/>';
    }
    /* neck */
    a += cu ? '<rect x="86" y="70" width="28" height="24" fill="$1"/>' : '<rect x="90" y="70" width="20" height="24" fill="$1"/>';
    b += cu ? '<path d="M87,80 Q100,86 113,80 L113,84 Q100,90 87,84Z" fill="$1"/>' : '<path d="M91,78 Q100,84 109,78 L109,82 Q100,88 91,82Z" fill="$1"/>';
    /* collarbones */
    b += '<path d="M78,101 Q90,98 97,101 M103,101 Q110,98 122,101" stroke="$0" stroke-width="1" fill="none" opacity=".7"/>';
    /* the top: a sleeveless vest in teal */
    var top = cu ? 'M76,96 L84,96 C88,108 112,108 116,96 L124,96 C126,110 132,122 138,130 C144,170 146,206 142,250 L58,250 C54,206 56,170 62,130 C68,122 74,110 76,96Z'
      : 'M78,96 L86,96 C90,108 110,108 114,96 L122,96 C124,110 130,122 136,130 C138,170 136,212 134,250 L66,250 C64,212 62,170 64,130 C70,122 76,110 78,96Z';
    b += '<path d="' + top + '" fill="$2"/>';
    a += '<path d="' + top + '" fill="#fff" class="c06b-pp"/>';
    b += '<path d="' + (cu ? 'M84,96 C88,108 112,108 116,96' : 'M86,96 C90,108 110,108 114,96') + '" stroke="$0" stroke-width="1.6" fill="none"/>';
    /* side shadow of the trunk */
    b += cu ? '<path d="M62,140 C58,176 56,210 58,250 L66,250 C64,214 64,178 66,142Z" fill="$2"/>' : '<path d="M65,140 C63,176 64,212 66,250 L72,250 C70,214 69,178 70,142Z" fill="$2"/>';
    /* arms: thinner in Cushing, hands at the hips */
    function arm(s) {
      var X = function (x) { return f1(100 + (x - 100) * s); };
      var p = cu
        ? 'M' + X(57) + ',100 C' + X(48) + ',104 ' + X(47) + ',116 ' + X(48) + ',128 C' + X(49) + ',160 ' + X(47) + ',190 ' + X(45) + ',226 L' + X(53) + ',226 C' + X(54) + ',190 ' + X(57) + ',160 ' + X(58) + ',132 C' + X(60) + ',118 ' + X(60) + ',108 ' + X(57) + ',100Z'
        : 'M' + X(55) + ',100 C' + X(43) + ',104 ' + X(41) + ',118 ' + X(42) + ',130 C' + X(43) + ',160 ' + X(42) + ',190 ' + X(42) + ',226 L' + X(54) + ',226 C' + X(55) + ',190 ' + X(60) + ',160 ' + X(60) + ',134 C' + X(62) + ',118 ' + X(61) + ',106 ' + X(55) + ',100Z';
      var hand = '<ellipse cx="' + X(cu ? 49 : 48) + '" cy="236" rx="' + (cu ? 5.6 : 6.4) + '" ry="10.5" fill="$1"/>';
      return '<path d="' + p + '" fill="$1"/>' + hand;
    }
    a += arm(1) + arm(-1);
    b += arm(1).replace(/\$1/g, '#fff').replace(/<path /g, '<path class="c06b-pp" ').replace(/<ellipse /g, '<ellipse class="c06b-pp" ');
    /* volume: a darker screen on the far side of the face and arms */
    a += cu ? '<path d="M112,32 C122,38 125,48 125,54 C125,68 117,78 106,80 C116,72 120,60 112,32Z" fill="$2"/>' : '<path d="M110,32 C117,38 ' + (pf ? 121 : 119) + ',46 ' + (pf ? 121 : 119) + ',52 C' + (pf ? 121 : 119) + ',66 112,76 104,78 C112,70 116,58 110,32Z" fill="$2"/>';
    /* elbow and inner-arm shading */
    b += arm(-1).replace(/\$1/g, '#fff').replace(/<path /g, '<path class="c06b-pp" ').replace(/<ellipse /g, '<ellipse class="c06b-pp" ');
    b += cu ? '<path d="M56,132 C57,160 54,190 53,226 L51,226 C52,190 55,160 54,132Z M144,132 C143,160 146,190 147,226 L149,226 C148,190 145,160 146,132Z" fill="$2"/>'
      : '<path d="M58,134 C58,160 55,190 54,226 L51,226 C52,190 55,160 55,134Z M142,134 C142,160 145,190 146,226 L149,226 C148,190 145,160 145,134Z" fill="$2"/>';
    /* head: rounder and wider in Cushing; slightly fuller in the morning puff */
    var face = cu ? '<path d="M75,52 C75,32 87,26 100,26 C113,26 125,32 125,52 C125,70 115,80 100,80 C85,80 75,70 75,52Z" fill="$1"/>'
      : pf ? '<path d="M79,50 C79,32 89,26 100,26 C111,26 121,32 121,50 C121,68 112,79 100,79 C88,79 79,68 79,50Z" fill="$1"/>'
        : '<path d="M81,50 C81,32 90,26 100,26 C110,26 119,32 119,50 C119,66 111,78 100,78 C89,78 81,66 81,50Z" fill="$1"/>';
    a += face;
    var ew = cu ? 25 : pf ? 21 : 19;
    a += '<ellipse cx="' + (100 - ew - 1) + '" cy="52" rx="3" ry="5.5" fill="$1"/><ellipse cx="' + (100 + ew + 1) + '" cy="52" rx="3" ry="5.5" fill="$1"/>';
    /* flushed round cheeks in Cushing */
    if (cu) a += '<ellipse cx="86" cy="62" rx="8" ry="6" fill="$3"/><ellipse cx="114" cy="62" rx="8" ry="6" fill="$3"/>';
    if (pf) a += '<ellipse cx="91.5" cy="53.6" rx="4.6" ry="2.4" fill="$2"/><ellipse cx="108.5" cy="53.6" rx="4.6" ry="2.4" fill="$2"/><ellipse cx="88" cy="63" rx="6" ry="4.4" fill="$1"/><ellipse cx="112" cy="63" rx="6" ry="4.4" fill="$1"/>';
    /* mouth */
    a += '<path d="M95,' + (cu ? 70 : 68.5) + ' Q100,' + (cu ? 72.5 : 71) + ' 105,' + (cu ? 70 : 68.5) + '" stroke="$0" stroke-width="2.2" stroke-linecap="round" fill="none"/>';
    /* hair: short, the same cut in all three */
    var hw = cu ? 26 : pf ? 22 : 20;
    b += '<path d="M' + (100 - hw) + ',48 C' + (100 - hw - 1) + ',28 ' + (100 - hw / 2) + ',20 100,20 C' + (100 + hw / 2) + ',20 ' + (100 + hw + 1) + ',28 ' + (100 + hw) + ',48 C' + (100 + hw - 3) + ',38 ' + (100 + hw / 2) + ',33 100,34 C' + (100 - hw / 2) + ',33 ' + (100 - hw + 3) + ',38 ' + (100 - hw) + ',48Z" fill="$0"/>';
    /* brows, eyes, nose */
    var ey = cu ? 50.5 : 49;
    b += '<path d="M88,' + (ey - 5) + ' q3.5,-2 7,0 M105,' + (ey - 5) + ' q3.5,-2 7,0" stroke="$0" stroke-width="1.6" stroke-linecap="round" fill="none"/>';
    b += '<ellipse cx="91.5" cy="' + ey + '" rx="' + (cu || pf ? 1.9 : 2.2) + '" ry="' + (cu || pf ? 1.1 : 1.4) + '" fill="$0"/><ellipse cx="108.5" cy="' + ey + '" rx="' + (cu || pf ? 1.9 : 2.2) + '" ry="' + (cu || pf ? 1.1 : 1.4) + '" fill="$0"/>';
    b += '<path d="M100,' + (ey + 3) + ' L97.6,' + (ey + 12) + ' Q100,' + (ey + 14) + ' 102,' + (ey + 12.5) + '" stroke="$2" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    /* shadow under the jaw */
    b += cu ? '<path d="M80,66 C86,78 114,78 120,66 C116,80 84,80 80,66Z" fill="$1"/>' : '<path d="M85,66 C90,76 110,76 115,66 C112,78 88,78 85,66Z" fill="$1"/>';
    /* dark circles under the eyes after a semester of stress */
    if (st) b += '<path d="M87,52.5 Q91.5,57 96,52.5 Q91.5,55 87,52.5Z M104,52.5 Q108.5,57 113,52.5 Q108.5,55 104,52.5Z" fill="$3"/><path d="M87.5,53 Q91.5,58.4 95.5,53 M104.5,53 Q108.5,58.4 112.5,53" stroke="$2" stroke-width="1.6" fill="none"/>';
    /* puffy lids in the morning */
    if (pf) b += '<path d="M87,52 Q91.5,56.5 96,52 M104,52 Q108.5,56.5 113,52" stroke="$1" stroke-width="2.4" fill="none"/>';
    /* Cushing: wide purple stretch marks on the inner upper arms and the sides, bruises on the forearm */
    if (cu) {
      var sm = 'M62,118 q4,6 3,14 M66,116 q5,7 4,16 M138,118 q-4,6 -3,14 M134,116 q-5,7 -4,16 M140,150 q-4,8 -3,18 M136,152 q-4,8 -3,17';
      a += '<path d="' + sm + '" stroke="$0" stroke-width="2.6" stroke-linecap="round" fill="none"/>';
      b += '<path d="' + sm + '" stroke="$2" stroke-width="3" stroke-linecap="round" fill="none"/>';
      a += '<ellipse cx="149" cy="196" rx="3.6" ry="6" fill="$2"/><ellipse cx="51" cy="176" rx="3" ry="4.6" fill="$2"/>';
      b += '<ellipse cx="149.6" cy="197" rx="3.2" ry="5.4" fill="$3"/><ellipse cx="51.5" cy="176.5" rx="2.6" ry="4" fill="$3"/>';
    }
    return { a: a, b: b };
  }

  var INKS = [{ k: 'a', col: C.alta, ang: 15, op: 0.95 }, { k: 'b', col: C.baixa, ang: 75, op: 0.92 }];
  function riso(v) {
    var R = rng(1906 + v * 77), art = figure(v), id = 'c06b-r' + v, defs = '', layers = '';
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
      for (var s = 0; s < 6; s++) body += '<circle cx="' + f1(8 + R() * 184) + '" cy="' + f1(6 + R() * 238) + '" r="' + f1(0.3 + R() * 0.5) + '" fill="' + ink.col + '"/>';
      layers += '<g class="c06b-ink c06b-ink-' + ink.k + '" transform="translate(' + mx + ' ' + my + ')" opacity="' + ink.op + '" filter="url(#' + p + 'g)">' + body + '</g>';
    });
    return '<defs>' + defs + '</defs>' + layers;
  }

  /* callouts: point on the figure -> numbered tag in the margin */
  var CALL = [
    [{ p: [79, 58], t: [25, 58] }, { p: [119, 90], t: [175, 82] }, { p: [48, 150], t: [25, 150] }, { p: [137, 128], t: [175, 128] }, { p: [150, 198], t: [175, 198] }],
    [{ p: [88, 55], t: [25, 55] }, { p: [139, 150], t: [175, 150] }],
    [{ p: [86, 62], t: [25, 62] }]
  ];
  var TXT = [
    { h: ['Síndrome de Cushing', 'Cushing’s syndrome'], k: ['meses de excesso', 'months of excess'],
      items: [
        ['rosto redondo e corado, a face de lua', 'a round, flushed face, the moon face'],
        ['gordura na nuca e acima das clavículas', 'fat on the back of the neck and above the collarbones'],
        ['tronco mais largo, braços e pernas finos, fraqueza nas coxas', 'a wider trunk, thin arms and legs, weak thighs'],
        ['estrias largas e arroxeadas, na barriga, nos flancos e nos braços', 'wide purple stretch marks on the belly, sides and arms'],
        ['pele fina, que fica roxa com facilidade', 'thin skin that bruises easily']
      ] },
    { h: ['Um semestre de estresse comum', 'A semester of ordinary stress'], k: ['o mesmo corpo', 'the same body'],
      items: [
        ['olheiras', 'dark circles under the eyes'],
        ['rosto, pescoço e corpo iguais aos de antes', 'face, neck and body the same as before']
      ] },
    { h: ['“Cortisol face” do TikTok', 'TikTok’s “cortisol face”'], k: ['inchaço da manhã', 'morning puffiness'],
      items: [
        ['rosto e pálpebras inchados ao acordar, que desincham até o almoço', 'a face and eyelids puffy on waking, gone by lunch']
      ],
      causes: ['Causas comuns: sal, álcool, choro e dormir de bruços.', 'Common causes: salt, alcohol, crying and sleeping face down.'] }
  ];

  /* ---------- DOM ---------- */
  var strip = E('div', { class: 'c06b-strip' }, root);
  var panels = [0, 1, 2].map(function (v) {
    var fig = E('figure', { class: 'c06b-p c06b-p' + v }, strip);
    var hd = E('figcaption', { class: 'c06b-hd' }, fig);
    var no = E('span', { class: 'c06b-no' }, hd, String(v + 1));
    var ht = E('span', { class: 'c06b-ht' }, hd);
    var h = E('b', null, ht), k = E('span', null, ht);
    var sv = S('svg', { viewBox: '16 10 168 214', role: 'img', class: 'c06b-sv' }, fig);
    var art = S('g', { class: 'c06b-art' }, sv);
    art.innerHTML = riso(v);
    var calls = S('g', { class: 'c06b-calls' }, sv);
    CALL[v].forEach(function (c, i) {
      var g = S('g', { class: 'c06b-c', style: '--i:' + i }, calls);
      var tx = c.t[0], left = tx < 100, ex = left ? tx + 7 : tx - 7;
      var mid = left ? Math.min(c.p[0] - 6, ex + 14) : Math.max(c.p[0] + 6, ex - 14);
      S('path', { d: 'M' + c.p[0] + ',' + c.p[1] + ' L' + mid + ',' + c.t[1] + ' L' + ex + ',' + c.t[1], class: 'c06b-cl', pathLength: 1 }, g);
      S('circle', { cx: c.p[0], cy: c.p[1], r: 1.8, class: 'c06b-cd' }, g);
      S('circle', { cx: tx, cy: c.t[1], r: 7, class: 'c06b-tc' }, g);
      var t = S('text', { x: tx, y: c.t[1] + 3.4, 'text-anchor': 'middle', class: 'c06b-tt' }, g);
      t.textContent = String(i + 1);
    });
    if (v === 0) {
      /* the night test: a small clock at 23:30 */
      var ck = S('g', { class: 'c06b-ck', transform: 'translate(164 30)' }, sv);
      S('circle', { r: 12, class: 'c06b-ckf' }, ck);
      for (var i = 0; i < 12; i++) {
        var an = i / 12 * Math.PI * 2;
        S('line', { x1: f1(Math.sin(an) * 9.6), y1: f1(-Math.cos(an) * 9.6), x2: f1(Math.sin(an) * 11), y2: f1(-Math.cos(an) * 11), class: 'c06b-ckt' }, ck);
      }
      var hA = (11.5 / 12) * Math.PI * 2, mA = Math.PI;
      S('line', { x1: 0, y1: 0, x2: f1(Math.sin(hA) * 5.6), y2: f1(-Math.cos(hA) * 5.6), class: 'c06b-ckh' }, ck);
      S('line', { x1: 0, y1: 0, x2: f1(Math.sin(mA) * 8.4), y2: f1(-Math.cos(mA) * 8.4), class: 'c06b-ckm' }, ck);
      S('circle', { r: 1.4, class: 'c06b-ckc' }, ck);
    }
    if (v === 2) {
      /* morning to lunch: 7:00 puffy, 12:00 gone */
      var g2 = S('g', { class: 'c06b-ck', transform: 'translate(164 30)' }, sv);
      S('circle', { r: 12, class: 'c06b-ckf' }, g2);
      var a7 = (7 / 12) * Math.PI * 2;
      S('line', { x1: 0, y1: 0, x2: f1(Math.sin(a7) * 5.6), y2: f1(-Math.cos(a7) * 5.6), class: 'c06b-ckh' }, g2);
      S('line', { x1: 0, y1: 0, x2: 0, y2: -8.4, class: 'c06b-ckm' }, g2);
      S('circle', { r: 1.4, class: 'c06b-ckc' }, g2);
    }
    var ol = E('ol', { class: 'c06b-ol' }, fig);
    var lis = TXT[v].items.map(function () { return E('li', null, ol); });
    var extra = E('p', { class: 'c06b-x' }, fig);
    return { fig: fig, h: h, k: k, sv: sv, lis: lis, extra: extra };
  });
  var dots = E('div', { class: 'c06b-dots', role: 'group' }, root);
  var dotB = [0, 1, 2].map(function (i) {
    var b = E('button', { type: 'button', class: 'c06b-dot', 'aria-pressed': i === 0 ? 'true' : 'false' }, dots);
    b.addEventListener('click', function () {
      var p = panels[i].fig;
      strip.scrollTo({ left: p.offsetLeft - strip.offsetLeft - (strip.clientWidth - p.clientWidth) / 2, behavior: DN.RM ? 'auto' : 'smooth' });
    });
    return b;
  });
  strip.addEventListener('scroll', function () {
    var c = strip.scrollLeft + strip.clientWidth / 2, best = 0, bd = 1e9;
    panels.forEach(function (p, i) { var d = Math.abs(p.fig.offsetLeft - strip.offsetLeft + p.fig.clientWidth / 2 - c); if (d < bd) { bd = d; best = i; } });
    dotB.forEach(function (b, i) { b.setAttribute('aria-pressed', i === best ? 'true' : 'false'); });
  }, { passive: true });

  var rul = E('div', { class: 'c06b-rul' }, root);
  var rulH = E('div', { class: 'c06b-rh' }, rul);
  var rulSv = S('svg', { role: 'img', class: 'c06b-rsv' }, rul);
  var take = E('p', { class: 'c06b-take' }, root);

  /* ---------- the ruler: multiples of normal, log scale ---------- */
  function drawRuler() {
    var W = rul.clientWidth || 640, mob = W < 480;
    var lo = 0.8, hi = 12, l = 10, r = 14;
    function X(m) { return l + Math.log(m / lo) / Math.log(hi / lo) * (W - l - r); }
    var rows = 4, rh = 18, top = 6, ay = top + rows * rh + 14, H = ay + 22;
    rulSv.innerHTML = '';
    rulSv.setAttribute('viewBox', '0 0 ' + W + ' ' + H); rulSv.setAttribute('width', W); rulSv.setAttribute('height', H);
    S('line', { x1: l, x2: W - r, y1: ay, y2: ay, class: 'c06b-ax' }, rulSv);
    [1, 2, 4, 8].forEach(function (m) {
      S('line', { x1: f1(X(m)), x2: f1(X(m)), y1: ay, y2: ay + 4, class: 'c06b-ax' }, rulSv);
      var t = S('text', { x: f1(X(m)), y: ay + 15, 'text-anchor': 'middle', class: 'c06b-tk' }, rulSv);
      t.textContent = fmt(m) + '×';
    });
    /* Cushing: several times the upper limit, drawn as an approximate dashed range */
    var cx0 = X(2), cx1 = X(6);
    S('rect', { x: f1(cx0), y: ay - 6, width: f1(cx1 - cx0), height: 12, class: 'c06b-cus' }, rulSv);
    /* labels, one per row; end-anchored rows on top so no leader crosses a label */
    var M = [
      { m: 8, cls: 'c06b-pr', end: true, pt: mob ? 'prednisona 20 mg: cerca de 8×' : 'prednisona 20 mg: cerca de 8× a produção do dia', en: mob ? 'prednisone 20 mg: about 8×' : 'prednisone 20 mg: about 8× the daily output' },
      { m: 1, cls: 'c06b-nm', pt: '1× o normal', en: '1× normal' },
      { m: 1.43, cls: 'c06b-st', pt: mob ? 'estresse, cabelo: 1,43×' : 'estresse em curso, no cabelo: 1,43×', en: mob ? 'stress, hair: 1.43×' : 'ongoing stress, in hair: 1.43×' },
      { m: 2, cls: 'c06b-cu', pt: mob ? 'Cushing: várias vezes' : 'Cushing, urina de 24 h: várias vezes o limite', en: mob ? 'Cushing’s: several times' : 'Cushing’s, 24-h urine: several times the limit' }
    ];
    M.forEach(function (o, i) {
      var x = X(o.m), y = top + i * rh + 10;
      if (o.m !== 2) S('line', { x1: f1(x), x2: f1(x), y1: y + 4, y2: ay, class: 'c06b-ld' }, rulSv);
      else S('line', { x1: f1(x), x2: f1(x), y1: y + 4, y2: ay - 6, class: 'c06b-ld' }, rulSv);
      if (o.m === 2) { /* hollow point: value to be checked */ S('circle', { cx: f1(x), cy: ay, r: 4.2, class: 'c06b-hol' }, rulSv); }
      else S('circle', { cx: f1(x), cy: ay, r: 4.2, class: 'c06b-pt ' + o.cls }, rulSv);
      var t = S('text', { x: f1(o.end ? x + 4 : x - 4), y: y + 3, 'text-anchor': o.end ? 'end' : 'start', class: 'c06b-rl ' + o.cls }, rulSv);
      t.textContent = L(o.pt, o.en);
      if (!o.end) t.setAttribute('x', f1(x - 3));
    });
    rulSv.setAttribute('aria-label', L(
      'Régua em múltiplos do cortisol normal, em escala logarítmica. Estresse em curso, no cabelo: 1,43 vez. Prednisona 20 mg: cerca de 8 vezes a produção do dia. Cushing, urina de 24 horas: várias vezes o limite superior.',
      'Ruler in multiples of normal cortisol, on a log scale. Ongoing stress, in hair: 1.43 times. Prednisone 20 mg: about 8 times the daily output. Cushing’s, 24-hour urine: several times the upper limit.'));
  }

  function text() {
    panels.forEach(function (p, v) {
      var T = TXT[v];
      p.h.textContent = L(T.h[0], T.h[1]); p.k.textContent = L(T.k[0], T.k[1]);
      T.items.forEach(function (it, i) { p.lis[i].textContent = L(it[0], it[1]); });
      p.extra.textContent = v === 0 ? L('O relógio marca 23h30, a hora em que o exame de saliva procura o vale da noite, que some no Cushing.', 'The clock reads 11:30 p.m., the hour when the saliva test looks for the night-time low, which disappears in Cushing’s.')
        : v === 2 ? L(T.causes[0], T.causes[1]) + ' ' + L('O relógio marca 7h.', 'The clock reads 7 a.m.')
          : L('O cortisol do cabelo sobe 43% com estresse em curso.', 'Hair cortisol is 43% higher with ongoing stress.');
      p.sv.setAttribute('aria-label', L(T.h[0], T.h[1]) + ', ' + L(T.k[0], T.k[1]) + ': ' + T.items.map(function (it) { return L(it[0], it[1]); }).join('; ') + '.');
    });
    dots.setAttribute('aria-label', L('Escolher o retrato', 'Choose the portrait'));
    dotB.forEach(function (b, i) { b.setAttribute('aria-label', L('Retrato ', 'Portrait ') + (i + 1) + ': ' + L(TXT[i].h[0], TXT[i].h[1])); });
    rulH.textContent = L('Quanto cortisol, em múltiplos do normal', 'How much cortisol, in multiples of normal');
    take.textContent = L('O rosto de lua do Cushing vem de meses de excesso e aparece com outros sinais, enquanto o estresse do dia a dia muda o cortisol em dezenas de por cento, e o inchaço da manhã tem outras causas.',
      'The moon face of Cushing’s comes from months of excess and appears with other signs, while everyday stress changes cortisol by tens of percent, and morning puffiness has other causes.');
    drawRuler();
  }

  if (!DN.RM) {
    root.classList.add('c06b-anim');
    DN.onVisible(strip, function (v) { if (v) root.classList.add('c06b-in'); }, { once: true, threshold: 0.45 });
  }
  var rt, lw = 0;
  function onResize() { clearTimeout(rt); rt = setTimeout(function () { if (rul.clientWidth !== lw) { lw = rul.clientWidth; drawRuler(); } }, 120); }
  if ('ResizeObserver' in window) new ResizeObserver(onResize).observe(rul); else window.addEventListener('resize', onResize);
  DN.onLang(text);
  text();
})();
