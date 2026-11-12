(function () {
  'use strict';

  /* ---------- shared helper: recursive axon tree (used by w02a and w14b) ----------
     Returns {segs, terms}. Each seg: {pts:[x0,y0,x1,y1,...], w, d, t0, t1}.
     Times are normalized to [0,1]. Coordinates are in the caller's units. */
  function mulberry(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  DN.rng = DN.rng || mulberry;
  DN.axonTree = DN.axonTree || function (o) {
    var R = mulberry(o.seed || 7);
    var segs = [], terms = [];
    var maxD = o.depth || 10;
    var trunkSteps = 14;
    /* trunk: a long thin axon heading to the target, gently curving */
    var x = o.x, y = o.y, tx = o.tx, ty = o.ty;
    var dx = tx - x, dy = ty - y, dist = Math.hypot(dx, dy);
    var ang = Math.atan2(dy, dx) + (o.bend || 0.5);
    var pts = [x, y];
    var step = dist / trunkSteps * 1.08;
    for (var i = 0; i < trunkSteps; i++) {
      var want = Math.atan2(ty - y, tx - x);
      var diff = Math.atan2(Math.sin(want - ang), Math.cos(want - ang));
      ang += diff * 0.28 + (R() - 0.5) * 0.12;
      x += Math.cos(ang) * step; y += Math.sin(ang) * step;
      pts.push(x, y);
    }
    var trunkLen = step * trunkSteps;
    segs.push({ pts: pts, w: o.width || 1.6, d: 0, t0: 0, t1: trunkLen });
    var L0 = o.len || dist * 0.32;
    function grow(x, y, a, len, w, d, t0) {
      var n = 5, p = [x, y], s = len / n;
      for (var k = 0; k < n; k++) {
        a += (R() - 0.5) * 0.32;
        x += Math.cos(a) * s; y += Math.sin(a) * s;
        p.push(x, y);
      }
      var t1 = t0 + len;
      segs.push({ pts: p, w: w, d: d, t0: t0, t1: t1 });
      if (d >= maxD || len < (o.minLen || 0)) { terms.push({ x: x, y: y, t: t1 }); return; }
      var kids = R() < (d < 3 ? 0.18 : 0.32) ? 3 : 2;
      var spread = (o.spread || 0.62) * (d < 2 ? 1.25 : 1);
      for (var c = 0; c < kids; c++) {
        var side = kids === 2 ? (c ? 1 : -1) : (c - 1);
        var na = a + side * spread * (0.55 + R() * 0.6) + (R() - 0.5) * 0.25;
        grow(x, y, na, len * (0.7 + R() * 0.16), w * 0.74, d + 1, t1);
      }
    }
    /* the arbor fans out in several directions from the trunk end */
    var arms = o.arms || 4;
    for (var j = 0; j < arms; j++) {
      var a0 = ang + (j - (arms - 1) / 2) * (Math.PI * 2 / arms) * 0.9 + (R() - 0.5) * 0.3;
      grow(x, y, a0, L0 * (0.8 + R() * 0.3), (o.width || 1.6) * 0.8, 1, trunkLen);
    }
    var T = 0;
    segs.forEach(function (s) { if (s.t1 > T) T = s.t1; });
    segs.forEach(function (s) { s.t0 /= T; s.t1 /= T; });
    terms.forEach(function (t) { t.t /= T; });
    return { segs: segs, terms: terms };
  };

  /* ---------- the companion neuron ---------- */
  var box = document.getElementById('companion');
  if (!box || DN.RM) return;

  var NEURON =
    '<svg viewBox="0 0 64 64" width="64" height="64" aria-hidden="true" focusable="false">' +
    '<g class="cn-ink" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M23.5 26.5C20 21 17 17 12 13M17 18.5C13 18 10 19.5 6 21M12 13L9.5 7.5M12 13L6.5 12"/>' +
    '<path d="M27.5 24C28.5 19 30 14 33 8.5M30.2 15C33 13.2 36 12.8 40 11M33 8.5L32.2 3.5M33 8.5L37 5"/>' +
    '<path d="M21.5 31C16 32 11 35 6 39M11 35C9 31.5 6.5 30.3 3 30.3M6 39L2.5 43"/>' +
    '<path d="M24 35.2C22 40 20 44 16 49M19 45L12.5 46.8M16 49L15.5 54"/>' +
    '</g>' +
    '<g class="cn-axon" fill="none" stroke-linecap="round">' +
    '<path d="M30.5 32.5C34 38 38.5 42 44 45.5C49 48.8 53 53 57.5 58.5M51.5 51.5C54.5 50 57.5 49.2 61 48.5M57.5 58.5L62 57.8M57.5 58.5L58.8 62.5"/>' +
    '</g>' +
    '<circle class="cn-ring" cx="26.3" cy="29.3" r="6" fill="none"/>' +
    '<path class="cn-soma" d="M21 28C21 24.5 24 22.5 27.5 23.5C31 24.5 32 28.5 30.5 32C29 35 25 36 22.8 34C21.5 32.8 21 30.5 21 28Z"/>' +
    '<circle class="cn-dot" cx="26.3" cy="29.3" r="2.5"/>' +
    '</svg>';

  box.innerHTML =
    '<button type="button" class="cn-neuron">' + NEURON + '</button>' +
    '<button type="button" class="cn-mute"><span aria-hidden="true">×</span></button>' +
    '<div class="cn-label" aria-hidden="true"></div>' +
    '<div class="sr cn-live" aria-live="polite"></div>';

  var btn = box.querySelector('.cn-neuron');
  var mute = box.querySelector('.cn-mute');
  var label = box.querySelector('.cn-label');
  var live = box.querySelector('.cn-live');
  var dot = box.querySelector('.cn-dot');
  var ring = box.querySelector('.cn-ring');
  var axon = box.querySelector('.cn-axon');
  var soma = box.querySelector('.cn-soma');

  var muted = !!DN.store.get('companionOff', false);
  var pastHero = false, narrow = window.innerWidth < 360, labelDone = false;

  function relabel() {
    btn.setAttribute('aria-label', DN.L('Neurônio de dopamina. Toque para ouvir o estado dele.', 'Dopamine neuron. Tap to hear its state.'));
    mute.setAttribute('aria-label', muted ? DN.L('mostrar o neurônio', 'show the neuron') : DN.L('esconder o neurônio', 'hide the neuron'));
    mute.title = mute.getAttribute('aria-label');
    label.textContent = DN.L('este neurônio reage às suas surpresas', 'this neuron reacts to your surprises');
  }
  relabel();
  DN.onLang(relabel);

  btn.addEventListener('click', function () {
    var b = DN.counts.bursts, p = DN.counts.pauses;
    live.textContent = '';
    setTimeout(function () {
      live.textContent = DN.L(
        'Ritmo de fundo, cerca de quatro disparos por segundo. Rajadas até agora: ' + b + '. Pausas: ' + p + '.',
        'Background rhythm, about four spikes per second. Bursts so far: ' + b + '. Pauses: ' + p + '.');
    }, 60);
    kick(false, true);
  });
  mute.addEventListener('click', function () {
    muted = !muted;
    DN.store.set('companionOff', muted);
    relabel();
    update();
  });

  function shown() { return pastHero && !muted && !narrow; }
  function update() {
    box.classList.toggle('on', pastHero && !narrow);
    box.classList.toggle('muted', muted);
    if (shown() && !document.hidden) start(); else stop();
  }

  var hero = document.querySelector('header.hero');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { pastHero = !e.isIntersecting; update(); });
    }, { rootMargin: '0px 0px -35% 0px' }).observe(hero);
  } else { pastHero = true; }

  var rT;
  window.addEventListener('resize', function () {
    clearTimeout(rT);
    rT = setTimeout(function () { narrow = window.innerWidth < 360; update(); }, 150);
  });
  document.addEventListener('visibilitychange', update);

  /* the label, once, when the reader reaches section 05 */
  var s05 = document.getElementById('s05');
  if (s05) DN.onVisible(s05, function (v) {
    if (!v || labelDone || !shown()) return;
    labelDone = true;
    box.classList.add('labeled');
    setTimeout(function () { box.classList.remove('labeled'); }, 6000);
  }, { threshold: 0.15 });

  /* ---------- spike engine ---------- */
  var raf = 0, running = false;
  var nextTonic = 0, queue = [], pauseUntil = 0, pauseStart = -1e9;
  var lastSpike = -1e9, lastBurstSpike = -1e9, burstAt = -1e9, burstBig = true, arriveAt = -1e9;
  var TONIC = 250;

  function now() { return performance.now(); }
  function start() {
    if (running) return;
    running = true;
    nextTonic = now() + 120;
    raf = requestAnimationFrame(tick);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  function spike(t, burst) {
    lastSpike = t;
    if (burst) lastBurstSpike = t;
    if (DN.sound()) { try { DN.click(undefined, burst ? 0.045 : 0.009); } catch (e) {} }
  }

  function kick(small, quiet) {
    var t = now();
    queue = [];
    var n = 6, gap = 50;
    for (var i = 0; i < n; i++) queue.push(t + i * gap);
    burstAt = t; burstBig = !small && !quiet;
    pauseUntil = 0;
    nextTonic = t + n * gap + TONIC;
  }

  DN.on('burst', function (d) {
    if (!shown()) return;
    kick(d && d.small);
    if (!running) update();
  });
  DN.on('pause', function () {
    if (!shown()) return;
    var t = now();
    queue = [];
    pauseStart = t; pauseUntil = t + 250;
    nextTonic = pauseUntil + 80;
  });
  DN.on('arrive', function () { arriveAt = now(); });

  function tick() {
    if (!running) return;
    var t = now();
    while (queue.length && queue[0] <= t) { spike(queue.shift(), true); }
    if (!queue.length && t >= nextTonic && t >= pauseUntil) {
      spike(t, false);
      nextTonic = t + TONIC + (Math.random() - 0.5) * 28;
    }
    var inPause = t < pauseUntil;
    var pk = Math.max(0, 1 - (t - pauseStart) / 520); /* indigo fades back */
    var b = Math.exp(-(t - lastSpike) / 38);
    var bb = Math.exp(-(t - lastBurstSpike) / 55);
    var op = inPause ? 0.9 : 0.22 + 0.5 * b + 0.28 * bb;
    dot.style.opacity = op.toFixed(3);
    dot.style.fill = (inPause || pk > 0.6) ? 'var(--pausa)' : 'var(--dopa)';
    dot.setAttribute('r', (2.5 + 1.1 * bb).toFixed(2));
    soma.style.fill = inPause ? 'var(--pausa-soft)' : (bb > 0.05 ? 'rgba(232,149,47,' + (0.28 * bb).toFixed(3) + ')' : 'transparent');
    box.classList.toggle('paused', inPause || pk > 0.4);
    /* burst: ring expands, axon glows */
    var p = (t - burstAt) / (burstBig ? 760 : 520);
    var q = (t - arriveAt) / 700;
    if (p >= 0 && p < 1) {
      var e = 1 - Math.pow(1 - p, 3);
      ring.setAttribute('r', (6 + (burstBig ? 24 : 14) * e).toFixed(2));
      ring.style.opacity = ((1 - p) * 0.9).toFixed(3);
      ring.style.stroke = 'var(--dopa)';
      axon.style.stroke = 'var(--dopa)';
      axon.style.opacity = (0.35 + 0.65 * (1 - p)).toFixed(3);
    } else if (q >= 0 && q < 1) {
      ring.setAttribute('r', (6 + 16 * (1 - Math.pow(1 - q, 3))).toFixed(2));
      ring.style.opacity = ((1 - q) * 0.7).toFixed(3);
      ring.style.stroke = 'var(--dopa)';
    } else {
      ring.style.opacity = '0';
      axon.style.stroke = '';
      axon.style.opacity = '';
    }
    raf = requestAnimationFrame(tick);
  }

  update();
})();

/* phones: reveal the companion briefly on each burst or pause */
(function () {
  'use strict';
  var box = document.getElementById('companion'); if (!box || DN.RM) return;
  var t = null;
  function flash() {
    box.classList.add('flash');
    clearTimeout(t);
    t = setTimeout(function () { box.classList.remove('flash'); }, 2200);
  }
  DN.on('burst', flash);
  DN.on('pause', flash);
})();
