(function () {
  'use strict';
  var root = DN.body('w02a'); if (!root) return;

  root.innerHTML =
    '<div class="cvwrap w02a-wrap">' +
    '<canvas class="w02a-cv" role="img"></canvas>' +
    '<div class="w02a-hud" aria-hidden="true"><span class="w02a-n"></span><span class="w02a-k"></span></div>' +
    '<div class="w02a-zoom"><button type="button" class="w02a-zin">+</button><button type="button" class="w02a-zout">−</button></div>' +
    '<div class="w02a-toast" aria-hidden="true"></div>' +
    '</div>' +
    '<div class="rowbtns mt"><button type="button" class="btn solid w02a-show"></button><button type="button" class="btn w02a-reset"></button></div>' +
    '<p class="w02a-take"></p>' +
    '<div class="live" aria-live="polite"></div>';

  var wrap = root.querySelector('.w02a-wrap');
  var cv = root.querySelector('.w02a-cv');
  var hudN = root.querySelector('.w02a-n');
  var hudK = root.querySelector('.w02a-k');
  var zin = root.querySelector('.w02a-zin');
  var zout = root.querySelector('.w02a-zout');
  var toast = root.querySelector('.w02a-toast');
  var showB = root.querySelector('.w02a-show');
  var resetB = root.querySelector('.w02a-reset');
  var live = root.querySelector('.live');
  var take = root.querySelector('.w02a-take');
  var ctx = cv.getContext('2d');
  var layer = document.createElement('canvas');
  var lctx = layer.getContext('2d');

  var AMBER_U = 0.235, AMBER_V = 0.69, C_DOPA = '#e8952f';
  var W = 0, H = 0, dpr = 1, N = 0, mobile = false;
  var xs, ys, rowStart, rows, cols, ch, spacing, rDot, amberIdx = -1, ax = 0, ay = 0, hx = 0, hy = 0;
  var k = 1, ox = 0, oy = 0, kMax = 40;
  var dirty = true, visible = false, raf = 0;
  var img = null, out = null, abuf = null;
  var tree = null, fired = false, fireT0 = 0, found = false, saidInView = false;
  var camAnim = null, visCount = 0, lastHud = '';
  var state = 'idle'; /* idle | shown | fired */

  /* ---------- world: exactly N dots on a jittered grid ---------- */
  function build() {
    var w = wrap.clientWidth || 600;
    mobile = w < 640;
    var h = mobile ? Math.round(Math.min(460, Math.max(360, w * 1.2))) : Math.round(Math.min(600, Math.max(420, w * 0.52)));
    W = w; H = h;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    cv.style.height = H + 'px';
    layer.width = cv.width; layer.height = cv.height;
    img = lctx.createImageData(cv.width, cv.height);
    out = new Uint32Array(img.data.buffer);
    abuf = new Uint8Array(cv.width * cv.height);

    N = mobile ? 40000 : 170000;
    cols = Math.round(Math.sqrt(N * W / H));
    rows = Math.ceil(N / cols * 1.04);
    var cells = rows * cols;
    var cw = W / cols; ch = H / rows;
    spacing = Math.sqrt(W * H / N);
    rDot = spacing * 0.27;
    xs = new Float32Array(N); ys = new Float32Array(N); rowStart = new Int32Array(rows + 1);
    var R = DN.rng(20091);
    var need = N, left = cells, n = 0;
    var aCol = Math.floor(AMBER_U * cols), aRow = Math.floor(AMBER_V * rows);
    for (var r = 0; r < rows; r++) {
      rowStart[r] = n;
      for (var c = 0; c < cols; c++) {
        var isA = (r === aRow && c === aCol);
        /* selection sampling: keep exactly N cells; the amber cell is always kept */
        if (isA || R() * left < need) {
          if (n < N) {
            xs[n] = (c + 0.18 + R() * 0.64) * cw;
            ys[n] = (r + 0.18 + R() * 0.64) * ch;
            if (isA) amberIdx = n;
            n++; need--;
          }
        } else R();
        left--;
      }
    }
    rowStart[rows] = n;
    N = n;
    ax = xs[amberIdx]; ay = ys[amberIdx];
    hx = ax + W * 0.018; hy = ay - H * 0.03;
    kMax = Math.max(24, 64 / spacing);
    tree = DN.axonTree({
      seed: 46, x: ax, y: ay, tx: W * (mobile ? 0.56 : 0.6), ty: H * (mobile ? 0.36 : 0.42),
      bend: -0.55, len: Math.min(W, H) * (mobile ? 0.095 : 0.11), depth: mobile ? 8 : 9,
      width: 1.9, arms: 5, spread: 0.6
    });
    /* bucket segments by depth for batched strokes */
    tree.byD = [];
    tree.segs.forEach(function (s) { (tree.byD[s.d] = tree.byD[s.d] || []).push(s); });
    k = 1; ox = 0; oy = 0; dirty = true;
  }

  function clampView() {
    k = DN.clamp(k, 1, kMax);
    ox = DN.clamp(ox, W * (1 - k), 0);
    oy = DN.clamp(oy, H * (1 - k), 0);
  }
  function zoomAt(sx, sy, f) {
    var nk = DN.clamp(k * f, 1, kMax);
    ox = sx - (sx - ox) * (nk / k);
    oy = sy - (sy - oy) * (nk / k);
    k = nk; clampView(); dirty = true;
    afterMove();
  }
  function setCam(nk, cx, cy) {
    k = nk; ox = W / 2 - cx * k; oy = H / 2 - cy * k; clampView(); dirty = true;
  }
  function camCenter() { return { k: k, x: (W / 2 - ox) / k, y: (H / 2 - oy) / k }; }
  function animateCam(nk, cx, cy, dur, done) {
    var a = camCenter();
    if (DN.RM || !dur) { setCam(nk, cx, cy); afterMove(); if (done) done(); return; }
    camAnim = { a: a, b: { k: nk, x: cx, y: cy }, t0: performance.now(), dur: dur, done: done, out: nk < a.k * 0.7 };
    kickLoop();
  }
  function stepCam(t) {
    if (!camAnim) return;
    var p = DN.clamp((t - camAnim.t0) / camAnim.dur, 0, 1);
    var e = camAnim.out ? 1 - Math.pow(1 - p, 3) : (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
    var la = Math.log(camAnim.a.k), lb = Math.log(camAnim.b.k);
    var kk = Math.exp(DN.lerp(la, lb, e));
    /* keep the target's screen position moving in a straight line */
    var A = camAnim.a, B = camAnim.b;
    var s0x = W / 2 + (B.x - A.x) * A.k, s0y = H / 2 + (B.y - A.y) * A.k;
    var sx = DN.lerp(s0x, W / 2, e), sy = DN.lerp(s0y, H / 2, e);
    setCam(kk, B.x - (sx - W / 2) / kk, B.y - (sy - H / 2) / kk);
    if (p >= 1) { var d = camAnim.done; camAnim = null; afterMove(); if (d) d(); }
  }

  /* ---------- dots layer ---------- */
  var kernels = {};
  function kernel(rd) {
    var key = Math.round(rd * 8);
    if (kernels[key]) return kernels[key];
    var R = Math.ceil(rd + 0.5), sz = 2 * R + 1, kk = new Uint8Array(sz * sz);
    for (var j = 0; j < sz; j++) for (var i = 0; i < sz; i++) {
      var d = Math.hypot(i - R, j - R);
      kk[j * sz + i] = Math.round(255 * DN.clamp(rd + 0.5 - d, 0, 1));
    }
    return (kernels[key] = { R: R, sz: sz, k: kk });
  }

  function drawDots() {
    var Wd = cv.width, Hd = cv.height;
    var rd = rDot * k * dpr;
    var wy0 = -oy / k, wy1 = (H - oy) / k, wx0 = -ox / k, wx1 = (W - ox) / k;
    var r0 = Math.max(0, Math.floor(wy0 / ch) - 1), r1 = Math.min(rows - 1, Math.ceil(wy1 / ch) + 1);
    var pad = rDot * 2;
    var cnt = 0, i, x, y, r, a1, a2;
    var kd = k * dpr, oxd = ox * dpr, oyd = oy * dpr;
    if (rd < 4.2) {
      abuf.fill(0);
      if (rd < 0.75) {
        var a = Math.round(255 * DN.clamp(Math.PI * rd * rd * 0.62, 0.2, 1));
        for (r = r0; r <= r1; r++) {
          for (i = rowStart[r], a2 = rowStart[r + 1]; i < a2; i++) {
            x = xs[i]; if (x < wx0 - pad || x > wx1 + pad) continue;
            if (i === amberIdx) continue;
            var px = (x * kd + oxd) | 0, py = (ys[i] * kd + oyd) | 0;
            if (px < 0 || py < 0 || px >= Wd || py >= Hd) continue;
            cnt++;
            var o = py * Wd + px, v = abuf[o] + a; abuf[o] = v > 255 ? 255 : v;
          }
        }
      } else {
        var K = kernel(rd), KR = K.R, KS = K.sz, KK = K.k;
        for (r = r0; r <= r1; r++) {
          for (i = rowStart[r], a2 = rowStart[r + 1]; i < a2; i++) {
            x = xs[i]; if (x < wx0 - pad || x > wx1 + pad) continue;
            if (i === amberIdx) continue;
            var cx = Math.round(x * kd + oxd), cy = Math.round(ys[i] * kd + oyd);
            if (cx < -KR || cy < -KR || cx >= Wd + KR || cy >= Hd + KR) continue;
            if (cx >= 0 && cy >= 0 && cx < Wd && cy < Hd) cnt++;
            for (var jj = 0; jj < KS; jj++) {
              var yy = cy - KR + jj; if (yy < 0 || yy >= Hd) continue;
              var row = yy * Wd, kr = jj * KS;
              for (var ii = 0; ii < KS; ii++) {
                var xx = cx - KR + ii; if (xx < 0 || xx >= Wd) continue;
                var kv = KK[kr + ii]; if (kv > abuf[row + xx]) abuf[row + xx] = kv;
              }
            }
          }
        }
      }
      /* alpha buffer to RGBA (#8f8f8f) */
      for (i = 0, a1 = abuf.length; i < a1; i++) {
        var av = abuf[i];
        out[i] = av ? ((av << 24) | 0x8f8f8f) : 0;
      }
      lctx.putImageData(img, 0, 0);
    } else {
      lctx.setTransform(1, 0, 0, 1, 0, 0);
      lctx.clearRect(0, 0, Wd, Hd);
      lctx.fillStyle = '#a2a2a2';
      lctx.beginPath();
      for (r = r0; r <= r1; r++) {
        for (i = rowStart[r], a2 = rowStart[r + 1]; i < a2; i++) {
          x = xs[i]; if (x < wx0 - pad || x > wx1 + pad) continue;
          if (i === amberIdx) continue;
          y = ys[i]; if (y < wy0 - pad || y > wy1 + pad) continue;
          var sx = x * kd + oxd, sy = y * kd + oyd;
          if (sx >= 0 && sy >= 0 && sx < Wd && sy < Hd) cnt++;
          lctx.moveTo(sx + rd, sy);
          lctx.arc(sx, sy, rd, 0, 6.2832);
        }
      }
      lctx.fill();
    }
    visCount = cnt + (amberInView() ? 1 : 0);
  }

  function amberScreen() { return { x: ax * k + ox, y: ay * k + oy }; }
  function amberInView() { var p = amberScreen(); return p.x >= 0 && p.y >= 0 && p.x <= W && p.y <= H; }
  function amberR() { return Math.max(2.3, rDot * k * 1.25); }

  /* ---------- tree ---------- */
  var TREE_MS = 2200;
  function treeProgress(t) {
    if (!fired) return 0;
    if (DN.RM) return 1;
    return DN.clamp((t - fireT0 - 260) / TREE_MS, 0, 1);
  }
  function drawTree(tp) {
    if (!fired || !tree) return;
    var ease = 1 - Math.pow(1 - tp, 1.6);
    var tt = ease;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    var zoomW = Math.pow(k, 0.55);
    for (var d = 0; d < tree.byD.length; d++) {
      var list = tree.byD[d]; if (!list) continue;
      var w0 = list[0].w * zoomW;
      ctx.lineWidth = Math.max(0.55, w0);
      ctx.strokeStyle = d === 0 ? '#c9781d' : 'rgba(232,149,47,' + DN.clamp(0.5 + w0 * 0.45, 0.5, 1).toFixed(2) + ')';
      ctx.beginPath();
      for (var s = 0; s < list.length; s++) {
        var g = list[s];
        if (tt <= g.t0) continue;
        var f = DN.clamp((tt - g.t0) / (g.t1 - g.t0), 0, 1);
        var p = g.pts, np = p.length / 2, upto = f * (np - 1);
        ctx.moveTo(p[0] * k + ox, p[1] * k + oy);
        for (var q = 1; q < np; q++) {
          if (q <= upto) ctx.lineTo(p[2 * q] * k + ox, p[2 * q + 1] * k + oy);
          else {
            var fr = upto - (q - 1);
            if (fr > 0) ctx.lineTo(DN.lerp(p[2 * q - 2], p[2 * q], fr) * k + ox, DN.lerp(p[2 * q - 1], p[2 * q + 1], fr) * k + oy);
            break;
          }
        }
      }
      ctx.stroke();
    }
    /* varicosities at the terminals */
    ctx.fillStyle = '#e8952f';
    ctx.beginPath();
    var br = Math.max(0.9, 0.9 * zoomW);
    for (var i = 0; i < tree.terms.length; i++) {
      var tm = tree.terms[i]; if (tt < tm.t) continue;
      var sx = tm.x * k + ox, sy = tm.y * k + oy;
      if (sx < -4 || sy < -4 || sx > W + 4 || sy > H + 4) continue;
      ctx.moveTo(sx + br, sy); ctx.arc(sx, sy, br, 0, 6.2832);
    }
    ctx.fill();
  }

  /* ---------- frame ---------- */
  function frame(t) {
    raf = 0;
    stepCam(t);
    if (dirty) { drawDots(); dirty = false; }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.drawImage(layer, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var tp = treeProgress(t);
    drawTree(tp);
    /* hint circle */
    if (state === 'idle' && k < 3.5) {
      var hr = 46 * k, puls = DN.RM ? 0 : (Math.sin(t / 420) + 1) / 2;
      var hsx = hx * k + ox, hsy = hy * k + oy;
      ctx.strokeStyle = 'rgba(232,149,47,' + (0.85 - 0.45 * puls).toFixed(3) + ')';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([3, 4]);
      ctx.beginPath(); ctx.arc(hsx, hsy, hr * (1 + 0.1 * puls), 0, 6.2832); ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = 'rgba(232,149,47,' + (0.35 * (1 - puls)).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(hsx, hsy, hr * (1.18 + 0.25 * puls), 0, 6.2832); ctx.stroke();
      /* direct label, so the picture reads without any interaction */
      if (k < 1.6) {
        var l1 = DN.L('1 neurônio de dopamina', '1 dopamine neuron');
        var l2 = DN.L('cada ponto cinza: outro neurônio', 'each grey dot: another neuron');
        var lx = hsx + hr * 1.3 + 16, ly = hsy - 4;
        ctx.font = 'bold 12px "Space Mono", ui-monospace, monospace';
        var w1 = ctx.measureText(l1).width;
        ctx.font = '11px "Space Mono", ui-monospace, monospace';
        var w2 = ctx.measureText(l2).width, bw = Math.max(w1, w2) + 14;
        ctx.strokeStyle = C_DOPA; ctx.lineWidth = 1;
        if (lx + bw > W - 4) {
          /* no room on the right: hang the label under the circle */
          lx = DN.clamp(hsx - 20, 4, W - 4 - bw); ly = hsy + hr * 1.35 + 30;
          ctx.beginPath(); ctx.moveTo(hsx, hsy + hr * 1.06); ctx.lineTo(hsx, ly - 18); ctx.stroke();
        } else {
          ctx.beginPath(); ctx.moveTo(hsx + hr * 1.06, hsy - 4); ctx.lineTo(lx, ly - 4); ctx.stroke();
        }
        ctx.fillStyle = 'rgba(255,255,255,.94)'; ctx.fillRect(lx, ly - 18, bw, 38);
        ctx.strokeStyle = C_DOPA; ctx.strokeRect(lx + .5, ly - 17.5, bw - 1, 37);
        ctx.fillStyle = '#141414'; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
        ctx.font = 'bold 12px "Space Mono", ui-monospace, monospace'; ctx.fillText(l1, lx + 7, ly - 2);
        ctx.fillStyle = '#6b6b6b'; ctx.font = '11px "Space Mono", ui-monospace, monospace'; ctx.fillText(l2, lx + 7, ly + 13);
      }
    }
    /* the amber dot: tonic blink, then a burst when fired */
    var p = amberScreen(), ar = amberR();
    var blink = 0;
    if (!DN.RM) {
      if (fired && t - fireT0 < 320) {
        blink = Math.exp(-((t - fireT0) % 53) / 18);
      } else {
        blink = Math.exp(-(t % 250) / 45);
      }
    }
    var halo = fired ? Math.max(0, 1 - (t - fireT0) / 900) : 0;
    if (halo > 0 && !DN.RM) {
      ctx.fillStyle = 'rgba(232,149,47,' + (0.25 * halo).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(p.x, p.y, ar + 30 * (1 - halo) + 4, 0, 6.2832); ctx.fill();
    }
    ctx.fillStyle = 'rgba(232,149,47,' + (0.16 + 0.22 * blink).toFixed(3) + ')';
    ctx.beginPath(); ctx.arc(p.x, p.y, ar * 2.4, 0, 6.2832); ctx.fill();
    ctx.fillStyle = '#e8952f';
    ctx.globalAlpha = 0.72 + 0.28 * blink;
    ctx.beginPath(); ctx.arc(p.x, p.y, ar * (1 + 0.12 * blink), 0, 6.2832); ctx.fill();
    ctx.globalAlpha = 1;
    hud();
    if (visible && (!DN.RM || camAnim)) raf = requestAnimationFrame(frame);
  }
  function kickLoop() { if (!raf) raf = requestAnimationFrame(frame); }

  function hud() {
    var s = DN.L('pontos na tela: ', 'dots on screen: ') + DN.fmt(visCount) + '|' + DN.L('aproximação ', 'zoom ') + DN.fmt(k, k < 10 ? 1 : 0) + '×';
    if (s === lastHud) return;
    lastHud = s;
    var parts = s.split('|');
    hudN.textContent = parts[0]; hudK.textContent = parts[1];
  }

  function afterMove() {
    wrap.classList.toggle('zoomed', k > 1.02);
    zout.disabled = k <= 1.001; zin.disabled = k >= kMax - 0.001;
    if (state !== 'fired' && !saidInView && k > 6 && amberInView()) {
      saidInView = true;
      say(DN.L('O ponto âmbar está na tela. Toque nele.', 'The amber dot is on screen. Tap it.'));
    }
    if (!DN.RM) kickLoop(); else requestAnimationFrame(frame);
  }

  /* ---------- text ---------- */
  var lastMsg = null;
  function say(m) { lastMsg = m; live.textContent = m; }
  function baseMsg() {
    if (mobile) return DN.L(
      'Este campo tem 40.000 pontos, e um deles é âmbar. No cérebro humano, a proporção é de 1 neurônio de dopamina para cada 170 mil. Seriam precisos mais de quatro campos como este para conter um único ponto âmbar.',
      'This field has 40,000 dots, and one of them is amber. In the human brain the ratio is 1 dopamine neuron for every 170,000. It would take more than four fields like this one to hold a single amber dot.');
    return DN.L(
      'Este campo tem 170.000 pontos, e um deles é âmbar. É a proporção do cérebro humano: 1 neurônio de dopamina para cada 170 mil, ou cerca de meio milhão em 86 bilhões.',
      'This field has 170,000 dots, and one of them is amber. That is the ratio in the human brain: 1 dopamine neuron for every 170,000, or about half a million in 86 billion.');
  }
  function firedMsg() {
    return DN.L(
      'Um único neurônio espalha o axônio por uma fatia grande do campo e termina em milhares de pontos de liberação. O desenho é ilustrativo. O tamanho medido vem a seguir.',
      'A single neuron spreads its axon over a large slice of the field and ends in thousands of release sites. The drawing is illustrative. The measured size comes next.');
  }

  function relabel() {
    cv.setAttribute('aria-label', mobile
      ? DN.L('Campo de 40.000 pontos cinza com um único ponto âmbar.', 'Field of 40,000 grey dots with a single amber dot.')
      : DN.L('Campo de 170.000 pontos cinza com um único ponto âmbar.', 'Field of 170,000 grey dots with a single amber dot.'));
    zin.setAttribute('aria-label', DN.L('aproximar', 'zoom in'));
    zout.setAttribute('aria-label', DN.L('afastar', 'zoom out'));
    showB.textContent = state === 'idle' ? DN.L('mostrar o ponto', 'show the dot')
      : state === 'shown' ? DN.L('tocar no ponto', 'tap the dot') : DN.L('ver de novo', 'watch again');
    resetB.textContent = DN.L('recomeçar', 'start over');
    take.textContent = state === 'fired'
      ? DN.L('Os neurônios de dopamina são raros, e cada um alcança uma parte enorme do cérebro.',
        'Dopamine neurons are rare, and each one reaches a huge part of the brain.')
      : DN.L('Os neurônios de dopamina são raros: 1 em cada 170 mil neurônios do cérebro humano.',
        'Dopamine neurons are rare: 1 in every 170,000 neurons of the human brain.');
    toast.textContent = DN.L('Use Ctrl + roda, ou clique no campo, para aproximar', 'Use Ctrl + wheel, or click the field, to zoom');
    lastHud = '';
    hud();
    if (state === 'fired') say(firedMsg()); else say(baseMsg());
  }

  /* ---------- actions ---------- */
  function fire() {
    if (state === 'fired' && !DN.RM && performance.now() - fireT0 < TREE_MS) return;
    found = true; fired = true; state = 'fired';
    fireT0 = performance.now();
    relabel();
    resetB.hidden = false;
    if (DN.sound()) {
      var a = DN.audio();
      if (a) for (var i = 0; i < 6; i++) DN.click(a.currentTime + i * 0.05, 0.04);
    }
    /* pull back so the whole tree is in view */
    var c = { x: W * 0.5, y: H * 0.5 };
    if (DN.RM) { setCam(1, c.x, c.y); afterMove(); }
    else setTimeout(function () { animateCam(1, c.x, c.y, k > 2 ? 1200 : 400); }, 120);
    kickLoop();
  }
  showB.addEventListener('click', function () {
    if (state === 'idle') {
      state = 'shown'; relabel();
      animateCam(Math.min(kMax, mobile ? 14 : 18), ax, ay, 1700, function () {
        say(DN.L('Este é o ponto âmbar, um neurônio entre ' + (mobile ? '40 mil' : '170 mil') + '. Toque nele.',
          'This is the amber dot, one neuron among ' + (mobile ? '40,000' : '170,000') + '. Tap it.'));
      });
      resetB.hidden = false;
    } else fire();
  });
  resetB.addEventListener('click', function () {
    fired = false; found = false; saidInView = false; state = 'idle';
    camAnim = null;
    animateCam(1, W / 2, H / 2, k > 1.05 ? 700 : 0);
    resetB.hidden = true;
    relabel();
  });
  zin.addEventListener('click', function () { var c = camCenter(); animateCam(Math.min(kMax, k * 2.2), c.x, c.y, 380); });
  zout.addEventListener('click', function () { var c = camCenter(); animateCam(Math.max(1, k / 2.2), c.x, c.y, 380); });

  /* ---------- pointer: drag, pinch, tap ---------- */
  var ptrs = new Map(), gesture = null, active = false, tapStart = null, lastTap = 0;
  function local(e) { var r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  cv.addEventListener('pointerdown', function (e) {
    active = true;
    camAnim = null;
    var p = local(e);
    ptrs.set(e.pointerId, p);
    try { cv.setPointerCapture(e.pointerId); } catch (er) {}
    if (ptrs.size === 1) tapStart = { x: p.x, y: p.y, t: performance.now() };
    else tapStart = null;
    gesture = null;
  });
  cv.addEventListener('pointermove', function (e) {
    if (!ptrs.has(e.pointerId)) {
      var hp = local(e), as = amberScreen();
      cv.style.cursor = Math.hypot(hp.x - as.x, hp.y - as.y) < amberR() + 12 ? 'pointer' : (k > 1.02 ? 'grab' : 'zoom-in');
      return;
    }
    var prev = ptrs.get(e.pointerId), p = local(e);
    if (ptrs.size === 1) {
      if (tapStart && Math.hypot(p.x - tapStart.x, p.y - tapStart.y) < 5) return;
      tapStart = null;
      ox += p.x - prev.x; oy += p.y - prev.y; clampView(); dirty = true; afterMove();
      cv.style.cursor = 'grabbing';
    } else if (ptrs.size === 2) {
      var ids = Array.from(ptrs.keys()), other = ptrs.get(ids[0] === e.pointerId ? ids[1] : ids[0]);
      var d0 = Math.hypot(prev.x - other.x, prev.y - other.y), d1 = Math.hypot(p.x - other.x, p.y - other.y);
      var m0 = { x: (prev.x + other.x) / 2, y: (prev.y + other.y) / 2 }, m1 = { x: (p.x + other.x) / 2, y: (p.y + other.y) / 2 };
      ox += m1.x - m0.x; oy += m1.y - m0.y;
      if (d0 > 4) zoomAt(m1.x, m1.y, d1 / d0); else { clampView(); dirty = true; afterMove(); }
    }
    ptrs.set(e.pointerId, p);
    e.preventDefault();
  });
  function up(e) {
    if (!ptrs.has(e.pointerId)) return;
    var p = local(e);
    ptrs.delete(e.pointerId);
    if (tapStart && e.type === 'pointerup' && performance.now() - tapStart.t < 450) {
      var as = amberScreen();
      if (Math.hypot(p.x - as.x, p.y - as.y) < amberR() + (e.pointerType === 'touch' ? 18 : 12)) fire();
      else {
        var nowT = performance.now();
        if (nowT - lastTap < 320) { var c = camCenter(); var wx = (p.x - ox) / k, wy = (p.y - oy) / k; animateCam(Math.min(kMax, k * 2.5), DN.lerp(c.x, wx, 0.6), DN.lerp(c.y, wy, 0.6), 420); lastTap = 0; }
        else lastTap = nowT;
      }
    }
    tapStart = null;
    if (!ptrs.size) cv.style.cursor = '';
    updTouch();
  }
  cv.addEventListener('pointerup', up);
  cv.addEventListener('pointercancel', up);
  cv.addEventListener('mouseleave', function () { active = false; });
  function updTouch() { cv.style.touchAction = k > 1.02 ? 'none' : 'pan-y'; }

  var toastT;
  cv.addEventListener('wheel', function (e) {
    if (!(active || e.ctrlKey || e.metaKey)) {
      toast.classList.add('on'); clearTimeout(toastT);
      toastT = setTimeout(function () { toast.classList.remove('on'); }, 1400);
      return;
    }
    e.preventDefault();
    camAnim = null;
    var p = local(e);
    var dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    zoomAt(p.x, p.y, Math.exp(-dy * (e.ctrlKey ? 0.012 : 0.0022)));
    updTouch();
  }, { passive: false });

  /* ---------- lifecycle ---------- */
  DN.onVisible(wrap, function (v) {
    visible = v;
    if (v) kickLoop();
    else { cancelAnimationFrame(raf); raf = 0; }
  });
  var lastW = 0, rt;
  function onResize() {
    var w = wrap.clientWidth;
    if (Math.abs(w - lastW) < 2) return;
    lastW = w;
    var wasFired = fired;
    build();
    if (wasFired) { fired = true; state = 'fired'; fireT0 = -1e9; }
    else if (state === 'shown') state = 'idle';
    camAnim = null;
    relabel(); afterMove(); updTouch();
    requestAnimationFrame(frame);
  }
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(onResize, 180); });

  resetB.hidden = true;
  DN.onLang(relabel);
  onResize();
})();
