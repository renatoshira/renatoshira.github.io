(function () {
  'use strict';
  var root = DN.body('w14b'); if (!root) return;

  var CW = 1080, CH = 1350, M = 84;
  var ROWS = [
    ['prazer', 'dar prazer', 'give pleasure', 'ratos sem dopamina ainda gostam do açúcar (06)', 'rats without dopamine still like sugar (06)', true],
    ['querer', 'fazer querer', 'make you want', 'sem dopamina, o rato para de ir atrás (06)', 'without dopamine, rats stop going after food (06)'],
    ['ensinar', 'ensinar o que vale repetir', 'teach what is worth repeating', 'o sinal de surpresa (05)', 'the surprise signal (05)'],
    ['mover', 'mover o corpo', 'move the body', 'Parkinson e L-DOPA (01)', 'Parkinson’s and L-DOPA (01)'],
    ['prolactina', 'controlar a prolactina', 'control prolactin', 'o freio do hipotálamo sobre o hormônio (07)', 'the hypothalamus’s brake on the hormone (07)'],
    ['nausea', 'provocar náusea', 'cause nausea', 'a domperidona trata a náusea (07)', 'domperidone treats nausea (07)']
  ];

  root.innerHTML =
    '<div class="w14b-grid">' +
    '<div class="w14b-prev"><canvas class="w14b-cv" width="' + CW + '" height="' + CH + '" role="img"></canvas></div>' +
    '<div class="w14b-side">' +
    '<div class="w14b-sum"></div>' +
    '<div class="rowbtns mt"><button type="button" class="btn solid w14b-dl"></button><button type="button" class="btn w14b-sh" hidden></button></div>' +
    '<div class="live" aria-live="polite"></div>' +
    '<details class="more w14b-txt"><summary></summary><div class="w14b-eq"></div></details>' +
    '</div></div>';

  var cv = root.querySelector('.w14b-cv');
  var ctx = cv.getContext('2d');
  var base = document.createElement('canvas'); base.width = CW; base.height = CH;
  var bctx = base.getContext('2d');
  var sum = root.querySelector('.w14b-sum');
  var dl = root.querySelector('.w14b-dl');
  var sh = root.querySelector('.w14b-sh');
  var live = root.querySelector('.live');
  var txtSum = root.querySelector('.w14b-txt summary');
  var eq = root.querySelector('.w14b-eq');

  var FONT = "'Space Mono', ui-monospace, Menlo, monospace";
  var soma = { x: 0, y: 0 };

  /* ---------- data ---------- */
  function data() {
    var quiz = DN.store.get('quiz', null);
    var has = Array.isArray(quiz);
    var marked = {};
    if (has) quiz.forEach(function (k) { marked[k] = true; });
    var real = ROWS.filter(function (r) { return !r[5]; });
    var hit = real.filter(function (r) { return marked[r[0]]; }).length;
    var ms = DN.store.get('mythScore', null);
    if (!ms || typeof ms.right !== 'number' || typeof ms.total !== 'number' || !ms.total) ms = null;
    return { has: has, marked: marked, hit: hit, myth: ms, bursts: DN.counts.bursts || 0, pleasure: !!marked.prazer };
  }
  function headline(d) {
    if (!d.has) return DN.L('Sem respostas guardadas. Estas são as seis funções corrigidas.', 'No saved answers. These are the six functions, corrected.');
    return DN.L('Você marcou ' + d.hit + ' das 5 funções que a dopamina tem.', 'You marked ' + d.hit + ' of the 5 functions dopamine has.');
  }
  function pleasureLine(d) {
    if (!d.has) return '';
    return d.pleasure
      ? DN.L('Você também marcou dar prazer, que é parcial.', 'You also marked give pleasure, which is partial.')
      : DN.L('Você deixou de fora dar prazer, que é parcial.', 'You left out give pleasure, which is partial.');
  }

  /* ---------- drawing helpers ---------- */
  function spaced(c, s) { if ('letterSpacing' in c) c.letterSpacing = s + 'px'; }
  function text(c, s, x, y, font, color, align, ls) {
    c.font = font; c.fillStyle = color; c.textAlign = align || 'left'; c.textBaseline = 'alphabetic';
    spaced(c, ls || 0);
    c.fillText(s, x, y);
    spaced(c, 0);
  }
  function fitFont(c, s, weight, size, maxW) {
    c.font = weight + ' ' + size + 'px ' + FONT;
    while (c.measureText(s).width > maxW && size > 14) { size -= 1; c.font = weight + ' ' + size + 'px ' + FONT; }
    return c.font;
  }

  /* the neuron with its axon tree, printed in risograph like the w00 cards:
     two spot inks (amber, indigo), each its own layer with halftone screens
     at riso angles, grain that eats the ink, a slight misregistration and
     multiply where the inks overlap. Drawn natively on canvas so the PNG
     export stays clean. */
  var TREE = null;
  function dotPattern(c, col, cell, r, ang) {
    var t = document.createElement('canvas'); t.width = t.height = cell;
    var x = t.getContext('2d'); x.fillStyle = col;
    x.beginPath(); x.arc(cell / 2, cell / 2, r, 0, 6.2832); x.fill();
    var p = c.createPattern(t, 'repeat');
    if (p.setTransform && window.DOMMatrix) p.setTransform(new DOMMatrix().rotateSelf(ang));
    return p;
  }
  function grain(lc, w, h, seed) {
    var R = DN.rng(seed), img = lc.createImageData(w, h), u = img.data;
    for (var i = 0; i < u.length; i += 4) {
      var n = R();
      u[i + 3] = Math.max(0, Math.min(255, (2.6 - 3.2 * (0.18 + n * 0.62)) * 255)) | 0;
    }
    var g = document.createElement('canvas'); g.width = w; g.height = h;
    g.getContext('2d').putImageData(img, 0, 0);
    lc.globalCompositeOperation = 'destination-in';
    lc.drawImage(g, 0, 0);
    lc.globalCompositeOperation = 'source-over';
  }
  function neuron(c, bx, by, bw, bh) {
    if (!TREE) TREE = DN.axonTree({ seed: 1350, x: 0, y: 0, tx: 260, ty: -40, bend: 0.5, len: 42, depth: 7, width: 2.2, arms: 3, spread: 0.55 });
    var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    TREE.segs.forEach(function (s) {
      for (var i = 0; i < s.pts.length; i += 2) {
        x0 = Math.min(x0, s.pts[i]); x1 = Math.max(x1, s.pts[i]);
        y0 = Math.min(y0, s.pts[i + 1]); y1 = Math.max(y1, s.pts[i + 1]);
      }
    });
    x0 = Math.min(x0, -70); y0 = Math.min(y0, -70); y1 = Math.max(y1, 75);
    var sc = Math.min(bw / (x1 - x0), bh / (y1 - y0));
    var offx = (bw - (x1 - x0) * sc) / 2 - x0 * sc, offy = (bh - (y1 - y0) * sc) / 2 - y0 * sc;
    function X(v) { return v * sc + offx; } function Y(v) { return v * sc + offy; }
    soma.x = bx + X(0); soma.y = by + Y(0);
    var sx = X(0), sy = Y(0);
    var W = Math.ceil(bw), H = Math.ceil(bh);
    var INK = [{ col: '#e8952f', ang: 15, op: 0.95, mx: -1.6, my: 1.2 }, { col: '#3b3f9e', ang: 75, op: 0.93, mx: 2.4, my: -1.8 }];
    var layers = INK.map(function (ink, li) {
      var cv2 = document.createElement('canvas'); cv2.width = W; cv2.height = H;
      var lc = cv2.getContext('2d');
      var F = { s: ink.col, h1: dotPattern(lc, ink.col, 7, 1.6, ink.ang), h2: dotPattern(lc, ink.col, 7, 2.35, ink.ang), h3: dotPattern(lc, ink.col, 7, 3.05, ink.ang) };
      lc.lineCap = 'round'; lc.lineJoin = 'round';
      if (li === 0) {
        /* amber: a halftone disc behind the arbor, the axon tree, its terminals, the nucleus */
        var cx = X((x0 + x1) / 2 + 40), cy = Y((y0 + y1) / 2);
        lc.fillStyle = F.h1; lc.beginPath(); lc.arc(cx, cy, Math.min(W, H) * 0.36, 0, 6.2832); lc.fill();
        var byD = [];
        TREE.segs.forEach(function (sg) { (byD[sg.d] = byD[sg.d] || []).push(sg); });
        for (var d = byD.length - 1; d >= 0; d--) {
          if (!byD[d]) continue;
          lc.lineWidth = Math.max(2.2, byD[d][0].w * sc * 1.5);
          lc.strokeStyle = F.s;
          lc.beginPath();
          byD[d].forEach(function (sg) {
            lc.moveTo(X(sg.pts[0]), Y(sg.pts[1]));
            for (var i = 2; i < sg.pts.length; i += 2) lc.lineTo(X(sg.pts[i]), Y(sg.pts[i + 1]));
          });
          lc.stroke();
        }
        lc.fillStyle = F.s; lc.beginPath();
        TREE.terms.forEach(function (t) { lc.moveTo(X(t.x) + 3.2, Y(t.y)); lc.arc(X(t.x), Y(t.y), 3.2, 0, 6.2832); });
        lc.fill();
        lc.beginPath(); lc.arc(sx + 2, sy - 1, 11, 0, 6.2832); lc.fill();
      } else {
        /* indigo: dendrites, the soma in a mid screen, a solid rim, a few terminal dots */
        var R = DN.rng(77);
        lc.strokeStyle = F.s;
        function den(x, y, a, len, w, depth) {
          var ex = x + Math.cos(a) * len, ey = y + Math.sin(a) * len;
          var mx = (x + ex) / 2 + Math.cos(a + 1.57) * len * 0.12, my = (y + ey) / 2 + Math.sin(a + 1.57) * len * 0.12;
          lc.lineWidth = w; lc.beginPath(); lc.moveTo(x, y); lc.quadraticCurveTo(mx, my, ex, ey); lc.stroke();
          if (depth > 0) {
            den(ex, ey, a - 0.45 - R() * 0.3, len * 0.66, w * 0.72, depth - 1);
            den(ex, ey, a + 0.4 + R() * 0.3, len * 0.6, w * 0.72, depth - 1);
          }
        }
        var dl0 = 26 * sc;
        [Math.PI * 0.78, Math.PI * 1.05, Math.PI * 1.3, Math.PI * 1.58, Math.PI * 0.5].forEach(function (a, i) {
          den(sx, sy, a + (R() - 0.5) * 0.2, dl0 * (0.8 + R() * 0.5), 6, i === 4 ? 1 : 2);
        });
        lc.fillStyle = F.h1; lc.beginPath(); lc.arc(sx + 14, sy + 10, 62, 0, 6.2832); lc.fill();
        var r = 27;
        lc.beginPath();
        lc.moveTo(sx - r, sy);
        lc.bezierCurveTo(sx - r, sy - r * 1.3, sx + r * 1.1, sy - r * 1.2, sx + r * 1.15, sy - r * 0.1);
        lc.bezierCurveTo(sx + r * 1.2, sy + r, sx - r * 0.2, sy + r * 1.25, sx - r, sy);
        lc.closePath();
        lc.fillStyle = F.h3; lc.fill();
        lc.lineWidth = 4.5; lc.stroke();
      }
      /* stray toner specks */
      var RS = DN.rng(1957 + li * 101);
      lc.fillStyle = ink.col;
      for (var k = 0; k < 6; k++) { lc.beginPath(); lc.arc(8 + RS() * (W - 16), 8 + RS() * (H - 16), 0.8 + RS() * 1.2, 0, 6.2832); lc.fill(); }
      grain(lc, W, H, 900 + li * 37);
      return cv2;
    });
    c.save();
    layers.forEach(function (lcv, li) {
      var ink = INK[li];
      c.globalAlpha = ink.op;
      c.globalCompositeOperation = li ? 'multiply' : 'source-over';
      c.drawImage(lcv, bx + ink.mx, by + ink.my);
    });
    c.restore();
  }

  /* ---------- card ---------- */
  function drawCard(c, d) {
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.fillStyle = '#ffffff'; c.fillRect(0, 0, CW, CH);
    c.strokeStyle = '#141414'; c.lineWidth = 2; c.strokeRect(36, 36, CW - 72, CH - 72);

    text(c, DN.L('COMO RESETAR SEU SISTEMA DE DOPAMINA', 'HOW TO RESET YOUR DOPAMINE SYSTEM'), M, 120, '400 19px ' + FONT, '#6b6b6b', 'left', 3);
    c.fillStyle = '#e8952f'; c.beginPath(); c.arc(CW - M - 6, 113, 7, 0, 6.2832); c.fill();

    /* title as an ink mark, like the house headlines */
    var title = DN.L('O que a dopamina faz', 'What dopamine does');
    c.font = '700 58px ' + FONT;
    var tw = c.measureText(title).width;
    c.fillStyle = '#141414'; c.fillRect(M - 12, 158, tw + 24, 80);
    text(c, title, M, 218, '700 58px ' + FONT, '#ffffff');

    text(c, headline(d), M, 300, fitFont(c, headline(d), '700', 25, CW - 2 * M), '#141414');
    var pl = pleasureLine(d);
    if (pl) text(c, pl, M, 336, '400 21px ' + FONT, '#6b6b6b');

    /* table */
    var ty = 384;
    text(c, d.has ? DN.L('SUA MARCA', 'YOUR MARK') : '', M, ty, '400 15px ' + FONT, '#6b6b6b', 'left', 2.5);
    text(c, DN.L('A EVIDÊNCIA', 'THE EVIDENCE'), CW - M, ty, '400 15px ' + FONT, '#6b6b6b', 'right', 2.5);
    c.fillStyle = '#141414'; c.fillRect(M, ty + 14, CW - 2 * M, 2);
    var rh = 84, y0 = ty + 16;
    ROWS.forEach(function (r, i) {
      var y = y0 + i * rh;
      var partial = !!r[5], mk = !!d.marked[r[0]];
      /* checkbox */
      var bx = M, by = y + 26, bs = 30;
      if (d.has) {
        c.lineWidth = 2; c.strokeStyle = '#141414';
        if (mk) {
          c.fillStyle = '#141414'; c.fillRect(bx, by, bs, bs);
          c.strokeStyle = '#ffffff'; c.lineWidth = 3.2; c.beginPath();
          c.moveTo(bx + 7, by + 16); c.lineTo(bx + 13, by + 22); c.lineTo(bx + 24, by + 9); c.stroke();
        } else { c.strokeRect(bx + 1, by + 1, bs - 2, bs - 2); }
      } else {
        text(c, '0' + (i + 1), bx, by + 23, '400 19px ' + FONT, '#9a9a9a');
      }
      /* tag */
      var tag = partial ? DN.L('parcial', 'partial') : DN.L('função real', 'real function');
      c.font = '700 19px ' + FONT;
      var tgw = c.measureText(tag).width + 30, tgx = CW - M - tgw, tgy = y + 22, tgh = 38;
      if (partial) {
        c.fillStyle = 'rgba(232,149,47,.22)'; c.fillRect(tgx, tgy, tgw, tgh);
        c.fillStyle = '#e8952f'; c.fillRect(tgx, tgy, tgw / 2, tgh);
        c.strokeStyle = '#e8952f'; c.lineWidth = 2; c.strokeRect(tgx + 1, tgy + 1, tgw - 2, tgh - 2);
      } else {
        c.fillStyle = '#e8952f'; c.fillRect(tgx, tgy, tgw, tgh);
      }
      text(c, tag, tgx + tgw / 2, tgy + 26, '700 19px ' + FONT, '#141414', 'center');
      /* label and note */
      var lx = M + 54, maxW = tgx - lx - 20;
      var lab = DN.L(r[1], r[2]);
      text(c, lab, lx, y + 42, fitFont(c, lab, '700', 28, maxW), '#141414');
      var note = DN.L(r[3], r[4]);
      text(c, note, lx, y + 70, fitFont(c, note, '400', 18, maxW), '#6b6b6b');
      c.fillStyle = '#e2e2e2'; c.fillRect(M, y + rh - 1, CW - 2 * M, 1.5);
    });

    /* stats */
    var sy = y0 + ROWS.length * rh + 56;
    var colW = 400;
    text(c, DN.L('VERDADE OU EXAGERO', 'TRUE OR OVERSTATED'), M, sy, '400 15px ' + FONT, '#6b6b6b', 'left', 2.5);
    if (d.myth) {
      text(c, DN.fmt(d.myth.right) + '/' + DN.fmt(d.myth.total), M, sy + 70, '700 64px ' + FONT, '#141414');
      text(c, DN.L('frases julgadas certo na seção 12', 'claims judged right in section 12'), M, sy + 102, fitFont(c, DN.L('frases julgadas certo na seção 12', 'claims judged right in section 12'), '400', 18, colW), '#6b6b6b');
    } else {
      text(c, '·', M, sy + 70, '700 64px ' + FONT, '#9a9a9a');
      text(c, DN.L('você não jogou a seção 12', 'you did not play section 12'), M, sy + 102, '400 18px ' + FONT, '#6b6b6b');
    }
    var sy2 = sy + 140;
    text(c, DN.L('RAJADAS', 'BURSTS'), M, sy2, '400 15px ' + FONT, '#6b6b6b', 'left', 2.5);
    text(c, DN.fmt(d.bursts), M, sy2 + 70, '700 64px ' + FONT, '#e8952f');
    var bl = DN.L('do neurônio da margem nesta leitura', 'from the margin neuron in this reading');
    text(c, bl, M, sy2 + 102, fitFont(c, bl, '400', 18, colW), '#6b6b6b');

    /* neuron */
    neuron(c, M + colW + 30, sy - 26, CW - 2 * M - colW - 30, (CH - 140) - (sy - 26));

    /* footer */
    c.fillStyle = '#141414'; c.fillRect(M, CH - 104, CW - 2 * M, 2);
    text(c, 'renatoshira.github.io/como-resetar-a-dopamina', M, CH - 68, '400 18px ' + FONT, '#141414');
    text(c, 'Renato Shirakashi · 2026', CW - M, CH - 68, '400 18px ' + FONT, '#6b6b6b', 'right');
  }

  /* ---------- text equivalent ---------- */
  function equivalent(d) {
    var lines = [headline(d)];
    var pl = pleasureLine(d); if (pl) lines.push(pl);
    ROWS.forEach(function (r) {
      var mark = d.has ? (d.marked[r[0]] ? DN.L('marcou', 'marked') : DN.L('não marcou', 'not marked')) + '. ' : '';
      lines.push(DN.L(r[1], r[2]) + ': ' + mark + (r[5] ? DN.L('Parcial', 'Partial') : DN.L('Função real', 'Real function')) + ', ' + DN.L(r[3], r[4]) + '.');
    });
    lines.push(d.myth
      ? DN.L('Verdade ou exagero: ' + d.myth.right + ' de ' + d.myth.total + ' frases julgadas certo.', 'True or overstated: ' + d.myth.right + ' of ' + d.myth.total + ' claims judged right.')
      : DN.L('Verdade ou exagero: seção 12 não jogada.', 'True or overstated: section 12 not played.'));
    lines.push(DN.L('Rajadas do neurônio da margem nesta leitura: ', 'Bursts from the margin neuron in this reading: ') + d.bursts + '.');
    return lines;
  }

  /* ---------- render + the card's own burst ---------- */
  var anim = 0, lastKey = '';
  function render(force) {
    var d = data();
    var key = JSON.stringify([DN.lang(), d.has, d.marked, d.myth, d.bursts]);
    if (!force && key === lastKey) return;
    lastKey = key;
    drawCard(bctx, d);
    var lines = equivalent(d);
    cv.setAttribute('aria-label', DN.L('Cartão final. ', 'Final card. ') + lines.join(' '));
    eq.innerHTML = '';
    var ul = DN.el('ul', { class: 'tight' }, eq);
    lines.forEach(function (l) { DN.el('li', null, ul).textContent = l; });
    sum.innerHTML = '';
    DN.el('p', { class: 'w14b-h' }, sum).textContent = headline(d);
    var meta = DN.el('p', { class: 'w14b-m' }, sum);
    meta.textContent = (d.myth ? DN.L('Seção 12: ' + d.myth.right + ' de ' + d.myth.total + '. ', 'Section 12: ' + d.myth.right + ' of ' + d.myth.total + '. ') : '') +
      DN.L('Rajadas nesta leitura: ' + d.bursts + '.', 'Bursts in this reading: ' + d.bursts + '.');
    play();
  }
  function play() {
    cancelAnimationFrame(anim);
    ctx.drawImage(base, 0, 0);
    if (DN.RM) return;
    var t0 = performance.now();
    function f(t) {
      var e = t - t0;
      ctx.drawImage(base, 0, 0);
      if (e < 620) {
        var b = e < 300 ? Math.exp(-(e % 50) / 16) : 0;
        var ring = DN.clamp(e / 620, 0, 1);
        ctx.fillStyle = 'rgba(232,149,47,' + (0.55 * b).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(soma.x, soma.y, 16 + 10 * b, 0, 6.2832); ctx.fill();
        ctx.strokeStyle = 'rgba(232,149,47,' + (0.8 * (1 - ring)).toFixed(3) + ')';
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(soma.x, soma.y, 18 + 70 * (1 - Math.pow(1 - ring, 3)), 0, 6.2832); ctx.stroke();
        anim = requestAnimationFrame(f);
      }
    }
    anim = requestAnimationFrame(f);
  }

  /* ---------- export ---------- */
  function blob(cb) { base.toBlob(function (b) { cb(b); }, 'image/png'); }
  var FNAME = 'dopamina-cartao.png';
  dl.addEventListener('click', function () {
    render(true);
    blob(function (b) {
      if (!b) return;
      var u = URL.createObjectURL(b);
      var a = DN.el('a', { href: u, download: FNAME }, document.body);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(u); a.remove(); }, 1500);
      live.textContent = DN.L('Imagem baixada.', 'Image downloaded.');
    });
  });
  var canShareFiles = false;
  try {
    canShareFiles = !!(navigator.share && navigator.canShare && window.File &&
      navigator.canShare({ files: [new File([new Blob(['x'], { type: 'image/png' })], 'x.png', { type: 'image/png' })] }));
  } catch (e) { canShareFiles = false; }
  sh.hidden = !canShareFiles;
  sh.addEventListener('click', function () {
    render(true);
    blob(function (b) {
      if (!b) return;
      var file = new File([b], FNAME, { type: 'image/png' });
      navigator.share({
        files: [file],
        title: DN.L('Como resetar seu sistema de dopamina', 'How to reset your dopamine system'),
        text: headline(data()),
        url: 'https://renatoshira.github.io/como-resetar-a-dopamina.html'
      }).then(function () {
        live.textContent = DN.L('Cartão compartilhado.', 'Card shared.');
      }).catch(function () {});
    });
  });

  function relabel() {
    dl.textContent = DN.L('baixar como imagem', 'download as image');
    sh.textContent = DN.L('compartilhar', 'share');
    txtSum.textContent = DN.L('texto do cartão', 'card text');
    render(true);
  }
  DN.onLang(relabel);
  DN.on('burst', function () { if (vis) render(); });
  var vis = false;
  DN.onVisible(root, function (v) { vis = v; if (v) render(true); });
  relabel();
  if (document.fonts && document.fonts.load) {
    Promise.all([
      document.fonts.load('700 40px "Space Mono"'),
      document.fonts.load('400 20px "Space Mono"')
    ]).then(function () { render(true); }).catch(function () {});
  }
})();
