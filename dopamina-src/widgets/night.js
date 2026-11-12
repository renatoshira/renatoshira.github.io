/* night.js : section 11 "Trinta dias". Darkens the page while the reader is
   inside #s11, floats the five withdrawal words behind the text, and dawns
   back to white at the last paragraph. API: window.DN_night.setDay(d). */
(function () {
  'use strict';
  var sec = document.getElementById('s11');
  var nw = document.getElementById('nightwords');
  if (!sec || !nw) return;
  var body = document.body;
  var RM = DN.RM;

  var WORDS = [
    ['ansiedade', 'anxiety'],
    ['irritabilidade', 'irritability'],
    ['insônia', 'insomnia'],
    ['depressão', 'depression'],
    ['fissura', 'craving']
  ];
  /* base position in the sticky stage: left %, top %, size factor, phase */
  var POS = [
    [3, 11, 1.0, 0.0],
    [24, 29, 0.82, 1.7],
    [9, 49, 0.95, 3.1],
    [46, 66, 1.0, 4.4],
    [16, 84, 0.9, 5.6]
  ];

  /* ---------- DOM ---------- */
  nw.innerHTML = '';
  var tex = DN.el('div', { 'class': 'nw-tex' }, nw);
  var stage = DN.el('div', { 'class': 'nw-stage' }, nw);
  var spans = WORDS.map(function (w, i) {
    var s = DN.el('span', { 'class': 'nw-word' }, stage);
    s.style.left = POS[i][0] + '%';
    s.style.top = POS[i][1] + '%';
    s.style.fontSize = 'calc(' + POS[i][2] + ' * clamp(44px, 8.6vw, 124px))';
    return s;
  });
  function relabel() { spans.forEach(function (s, i) { s.textContent = DN.L(WORDS[i][0], WORDS[i][1]); }); }
  relabel();
  DN.onLang(relabel);

  /* the layer spans the viewport width; measured so a classic scrollbar
     never causes horizontal overflow */
  function sizeVW() { nw.style.setProperty('--nw-vw', document.documentElement.clientWidth + 'px'); }
  sizeVW();

  /* ---------- 1-bit ordered-dither texture (tileable) ---------- */
  (function makeTexture() {
    var N = 128, cv = document.createElement('canvas');
    cv.width = cv.height = N;
    var ctx = cv.getContext('2d');
    if (!ctx) return;
    var img = ctx.createImageData(N, N), d = img.data;
    var B = [0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22,
      3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29, 53, 21];
    var T = Math.PI * 2;
    for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) {
      var v = 0.5 + 0.22 * Math.sin(T * x * 2 / N) * Math.cos(T * y * 3 / N) + 0.18 * Math.sin(T * (x + 2 * y) / N) + 0.1 * Math.cos(T * (3 * x - y) / N);
      v = 0.08 + v * 0.34; /* mostly dark, sparse dots */
      var on = v > (B[(y % 8) * 8 + (x % 8)] + 0.5) / 64;
      var k = (y * N + x) * 4;
      d[k] = 233; d[k + 1] = 230; d[k + 2] = 220; d[k + 3] = on ? 255 : 0;
    }
    ctx.putImageData(img, 0, 0);
    try { tex.style.backgroundImage = 'url(' + cv.toDataURL('image/png') + ')'; } catch (e) {}
  })();

  /* ---------- day state ---------- */
  var day = 1, settle = 1, settleTarget = 1, preDawn = false;
  function axesFor(i, t, s) {
    var ph = POS[i][3];
    var casl = s * (0.5 + 0.5 * Math.sin(t * 0.42 + ph));
    var slnt = -15 * s * (0.5 + 0.5 * Math.sin(t * 0.31 + ph * 1.3));
    var wght = 380 + 420 * s * (0.5 + 0.5 * Math.sin(t * 0.23 + ph * 0.7));
    return "'CASL' " + casl.toFixed(3) + ", 'slnt' " + slnt.toFixed(2) + ", 'wght' " + wght.toFixed(0) + ", 'MONO' 0";
  }
  function paintStatic() {
    spans.forEach(function (s, i) {
      s.style.fontVariationSettings = axesFor(i, POS[i][3] * 3, settle);
      s.style.transform = 'none';
    });
  }

  /* ---------- motion loop (paused off-screen and in day mode) ---------- */
  var raf = 0, onScreen = false, isNight = false, jit = [], lastJit = 0;
  for (var i = 0; i < 5; i++) jit.push([0, 0]);
  function frame(now) {
    raf = 0;
    var t = now / 1000;
    settle += (settleTarget - settle) * 0.04;
    if (now - lastJit > 90) { /* tremor updated ~11 times a second, 1 px max, no luminance change */
      lastJit = now;
      for (var j = 0; j < 5; j++) jit[j] = [(Math.random() * 2 - 1) * settle, (Math.random() * 2 - 1) * settle];
    }
    for (var k = 0; k < spans.length; k++) {
      var ph = POS[k][3];
      var dx = 10 * settle * Math.cos(t * 0.27 + ph) + jit[k][0];
      var dy = 16 * settle * Math.sin(t * 0.35 + ph) + jit[k][1];
      spans[k].style.transform = 'translate3d(' + dx.toFixed(2) + 'px,' + dy.toFixed(2) + 'px,0)';
      spans[k].style.fontVariationSettings = axesFor(k, t, settle);
    }
    loop();
  }
  function loop() {
    if (RM || !onScreen || !isNight) return;
    if (!raf) raf = requestAnimationFrame(frame);
  }

  /* ---------- night on/off from scroll ---------- */
  var ps = sec.querySelectorAll(':scope > p');
  var lastP = ps[ps.length - 1] || null;
  body.classList.add(RM ? 'dn-nt-cut' : 'dn-nt');
  var runT = 0;
  function setNight(v) {
    if (v === isNight) return;
    isNight = v;
    if (!RM) {
      /* while the tokens interpolate, shell transitions would chase every frame */
      body.classList.add('dn-nt-run');
      clearTimeout(runT);
      runT = setTimeout(function () { body.classList.remove('dn-nt-run'); }, 1000);
    }
    body.classList.toggle('is-night', v);
    DN.emit('night', v);
    if (v) loop();
  }
  function check() {
    var vh = window.innerHeight || 800;
    var r = sec.getBoundingClientRect();
    var endTop = lastP ? lastP.getBoundingClientRect().top : r.bottom;
    setNight(r.top < vh * 0.5 && endTop > vh * 0.55 && r.bottom > 0);
    /* the words settle as the reader moves through the thirty days */
    var span = Math.max(1, (endTop - r.top) - vh * 0.1);
    var f = DN.clamp((vh * 0.5 - r.top) / span, 0, 1);
    api.setDay(1 + Math.round(f * 29));
  }
  var pend = false;
  function onScroll() {
    if (pend) return;
    pend = true;
    requestAnimationFrame(function () { pend = false; check(); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  var rt = 0;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { sizeVW(); check(); }, 120); });
  DN.onVisible(sec, function (v) { onScreen = v; if (v) loop(); });
  var api = window.DN_night = {
    /* d in 1..30; the words settle as the day cursor in w11a advances */
    setDay: function (d) {
      d = DN.clamp(+d || 1, 1, 30);
      if (d === day) return;
      day = d;
      settleTarget = 1 - (day - 1) / 29;
      if (RM) { settle = settleTarget; paintStatic(); }
      else loop();
    },
    /* w11c: past day 30 the words fade before the page dawns */
    setPreDawn: function (v) {
      v = !!v;
      if (v === preDawn) return;
      preDawn = v;
      body.classList.toggle('is-predawn', v);
    },
    isNight: function () { return isNight; },
    day: function () { return day; }
  };
  check();
  paintStatic();
})();
