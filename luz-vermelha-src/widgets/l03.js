/* l03 · o-que-foi-medido : the proposed chain from light to cell, and where each step was measured */
(function () {
  'use strict';
  var root = DN.body('l03'); if (!root) return;
  var L = DN.L, C = DN.COL;

  /* ---------- risograph helpers (copied from c02a, prefixed l03) ---------- */
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
  var INK = { a: C.rubi, b: C.infra };
  function risoDefs(R) {
    var defs = '';
    [{ k: 'a', ang: 15 }, { k: 'b', ang: 75 }].forEach(function (ink) {
      var p = 'l03r-' + ink.k;
      [0.45, 0.78, 1.08].forEach(function (r, j) {
        defs += '<pattern id="' + p + 'h' + (j + 1) + '" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(' + ink.ang + ')">' +
          '<circle cx="1.3" cy="1.3" r="' + r + '" fill="' + INK[ink.k] + '"/></pattern>';
      });
      defs += '<filter id="' + p + 'g" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.2" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.2 0 0 0 2.65" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
    });
    defs += '<marker id="l03-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
      '<path d="M0,0 L10,5 L0,10 z" class="l03-arrhead"/></marker>';
    return defs;
  }
  function inkLayer(k, body, R) {
    var p = 'l03r-' + k;
    var mx = f1((R() < 0.5 ? -1 : 1) * (0.5 + R() * 1.0)), my = f1((R() < 0.5 ? -1 : 1) * (0.4 + R() * 0.8));
    body = body.replace(/\$0/g, INK[k]).replace(/\$([123])/g, 'url(#' + p + 'h$1)');
    return '<g class="l03-ink l03-ink-' + k + '" transform="translate(' + mx + ' ' + my + ')" opacity=".94" filter="url(#' + p + 'g)">' + body + '</g>';
  }

  /* ---------- the membrane crop, local box 200 x 130 ----------
     Real proportions, roughly: the inner membrane is about 5 nm thick, a crista
     is about 20 to 30 nm across, and cytochrome c oxidase is about 9 x 13 nm,
     so the protein sits about twice as wide as the membrane band. */
  var MEM = 'M-2,30 L36,30 L36,100 Q36,114 46,114 Q56,114 56,100 L56,30 L120,30 L120,100 Q120,114 130,114 Q140,114 140,100 L140,30 L202,30';
  function membrane() {
    return {
      a: '',
      b: '<path d="M-2,13 H202" stroke="$0" stroke-width="1.6" fill="none"/><path d="M-2,18 H202" stroke="$0" stroke-width="1.6" fill="none"/>' +
        '<path d="' + MEM + '" stroke="$2" stroke-width="6" fill="none" stroke-linejoin="round"/>' +
        '<path d="' + MEM + '" stroke="$0" stroke-width="1" fill="none" stroke-linejoin="round" transform="translate(0 -3)" opacity=".75"/>'
    };
  }
  function cco(cx, cy) {
    /* lumpy protein straddling the crista wall */
    return '<path d="M' + (cx - 6) + ',' + (cy - 7) + ' q2,-4 6,-3.5 q5,0.5 6,4 q1.5,5 -0.5,10 q-2,4.5 -6,4 q-4.5,-0.5 -5.5,-5 q-1.5,-5 0,-9.5Z" fill="$0"/>';
  }
  function wave(x0, y0, x1, y1, n) {
    var dx = x1 - x0, dy = y1 - y0, len = Math.sqrt(dx * dx + dy * dy), ux = dx / len, uy = dy / len, px = -uy, py = ux;
    var d = 'M' + f1(x0) + ',' + f1(y0), steps = n * 6;
    for (var i = 1; i <= steps; i++) {
      var t = i / steps, a = Math.sin(t * n * Math.PI * 2) * 2.4 * (t < 0.85 ? 1 : (1 - t) / 0.15);
      d += 'L' + f1(x0 + dx * t + px * a) + ',' + f1(y0 + dy * t + py * a);
    }
    return d;
  }
  function art(k) {
    var m = membrane(), a = '', b = m.b, crisp = '';
    var cx = 56, cy = 62;
    if (k === 0) {
      a += cco(cx, cy);
      [-7, 0, 7].forEach(function (o) {
        a += '<path d="' + wave(cx - 52 + o, cy - 60 - o, cx - 9 + o * 0.4, cy - 4 + o * 0.6, 4) + '" stroke="$0" stroke-width="1.5" fill="none" stroke-linecap="round"/>';
      });
      a += '<path d="M' + (cx + 8) + ',' + (cy - 14) + ' a14,14 0 1 1 0,28" stroke="$1" stroke-width="5" fill="none" opacity=".7"/>';
      crisp += lab(62, 127, L('citocromo c oxidase', 'cytochrome c oxidase'), 'start') + '<path d="M66,117 L' + (cx + 5) + ',' + (cy + 9) + '" class="l03-lead"/>';
    } else if (k === 1) {
      a += cco(cx, cy);
      var dots = [[66, 54], [74, 48], [80, 58], [88, 50], [95, 61], [102, 54]];
      dots.forEach(function (d, i) { b += '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="' + (2.6 - i * 0.18) + '" fill="$0"/>'; });
      b += '<circle cx="64" cy="66" r="2.6" fill="$0"/>';
      /* ATP: small molecules in the matrix */
      [[74, 86], [88, 94], [100, 82], [160, 70], [170, 86], [182, 74], [164, 100]].forEach(function (d) {
        a += '<circle cx="' + d[0] + '" cy="' + d[1] + '" r="3.2" fill="$2"/><circle cx="' + d[0] + '" cy="' + d[1] + '" r="3.2" stroke="$0" stroke-width=".9" fill="none"/>';
      });
      crisp += lab(104, 46, 'NO', 'start') + lab(178, 112, 'ATP', 'end');
    } else {
      a += cco(cx, cy);
      for (var i = 0; i < 9; i++) {
        var ang = -1.2 + i * 0.32, r0 = 11, r1 = 17 + (i % 2) * 4;
        a += '<path d="M' + f1(cx + 6 + Math.cos(ang) * r0) + ',' + f1(cy + Math.sin(ang) * r0) + 'L' + f1(cx + 6 + Math.cos(ang) * r1) + ',' + f1(cy + Math.sin(ang) * r1) + '" stroke="$0" stroke-width="1.4" stroke-linecap="round"/>';
      }
      /* a stretch of DNA in the nucleus, lower right */
      var hx = 150, hy = 84, s1 = '', s2 = '', rungs = '';
      for (var j = 0; j <= 40; j++) {
        var t = j / 40, xx = hx - 6 + t * 54, ya = hy + Math.sin(t * Math.PI * 3) * 7, yb = hy - Math.sin(t * Math.PI * 3) * 7;
        s1 += (j ? 'L' : 'M') + f1(xx) + ',' + f1(ya); s2 += (j ? 'L' : 'M') + f1(xx) + ',' + f1(yb);
        if (j % 3 === 1) rungs += 'M' + f1(xx) + ',' + f1(ya) + 'L' + f1(xx) + ',' + f1(yb);
      }
      b += '<path d="' + s1 + '" stroke="$0" stroke-width="1.6" fill="none"/><path d="' + s2 + '" stroke="$0" stroke-width="1.6" fill="none"/>' +
        '<path d="' + rungs + '" stroke="$0" stroke-width=".9"/>';
      a += '<path d="M' + (hx + 12) + ',' + (hy - 9) + ' h20 v18 h-20Z" fill="$1"/>';
      crisp += '<path d="M' + (cx + 30) + ',' + (cy + 4) + ' Q' + (hx - 20) + ',' + (cy + 2) + ' ' + (hx - 10) + ',' + (hy - 6) + '" class="l03-lead" marker-end="url(#l03-arr)"/>' +
        lab(cx + 30, cy - 20, L('ERO', 'ROS'), 'start') + lab(hx + 22, hy + 26, 'DNA', 'middle');
    }
    return { a: a, b: b, crisp: crisp };
  }
  function lab(x, y, t, anc) {
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + anc + '" class="l03-mini">' + t + '</text>';
  }

  /* ---------- data ---------- */
  function steps() {
    return [
      { n: '1', t: L('a citocromo c oxidase absorve a luz', 'cytochrome c oxidase absorbs the light'), time: L('segundos', 'seconds') },
      { n: '2', t: L('o óxido nítrico se solta e a produção de ATP sobe', 'nitric oxide comes loose and ATP production rises'), time: L('minutos', 'minutes') },
      { n: '3', t: L('um pulso curto de espécies reativas de oxigênio ativa genes de defesa', 'a short pulse of reactive oxygen species switches on defence genes'), time: L('horas', 'hours') }
    ];
  }
  function cols() {
    return [L('mitocôndria isolada', 'isolated mitochondria'), L('célula em cultura', 'cultured cells'), L('animal', 'animal'), L('pessoa', 'person')];
  }
  function NM() { return { s: 'n', t: L('não medido', 'not measured') }; }
  function NA() { return { s: 'x', t: L('não se aplica', 'does not apply') }; }
  function M(t) { return { s: 'm', t: L('medido', 'measured'), d: t }; }
  function rows() {
    return [
      { h: L('a enzima absorve essa luz', 'the enzyme absorbs this light'),
        c: [M(L('na enzima purificada (Mason 2014)', 'in the purified enzyme (Mason 2014)')),
          M('(Karu ' + L('e', 'and') + ' Kolyakov 2005)'), NM(),
          { s: 'i', t: L('medida indireta', 'indirect measure'), d: L('a forma oxidada sobe com laser de 1.064 nm na testa, 11 voluntários (Wang 2017)', 'the oxidised form rises with a 1,064 nm laser on the forehead, 11 volunteers (Wang 2017)') }],
        note: L('Células sem a enzima também responderam à luz de 660 nm (Lima 2019).', 'Cells without the enzyme also responded to 660 nm light (Lima 2019).') },
      { h: L('o óxido nítrico se solta', 'nitric oxide comes loose'),
        c: [NM(), M(L('o óxido nítrico muda o espectro de resposta (Karu 2005)', 'nitric oxide shifts the response spectrum (Karu 2005)')), NM(), NM()] },
      { h: L('o ATP sobe', 'ATP rises'),
        c: [M('(Passarella 1984)'), M('(Chen 2011; Sharma 2011)'), NM(), NM()] },
      { h: L('pulso de espécies reativas de oxigênio', 'pulse of reactive oxygen species'),
        c: [NM(), M('(Chen 2011; Huang 2011)'), NM(), NM()] },
      { h: L('efeito em feridas, dor ou pele', 'effect on wounds, pain or skin'),
        c: [NA(), NA(), M(L('em feridas e no cérebro de camundongos (seção 04)', 'in mouse wounds and brains (section 04)')),
          M(L('com resultado que muda conforme o uso (seções 05 e 06)', 'with a result that depends on the use (sections 05 and 06)'))] }
    ];
  }

  /* ---------- skeleton ---------- */
  var wrap = DN.el('div', { class: 'l03-top' }, root);
  var svg = DN.svg('svg', { class: 'l03-svg', role: 'img' }, wrap);
  var legend = DN.el('div', { class: 'l03-legend', 'aria-hidden': 'true' }, root);
  var tblWrap = DN.el('div', { class: 'l03-tw' }, root);
  var take = DN.el('p', { class: 'l03-read' }, root);

  function wrapText(s, max) {
    var words = s.split(' '), lines = [], cur = '';
    words.forEach(function (w) {
      if (!cur) cur = w;
      else if ((cur + ' ' + w).length <= max) cur += ' ' + w;
      else { lines.push(cur); cur = w; }
    });
    if (cur) lines.push(cur);
    return lines;
  }
  function svgText(parent, x, y, lines, cls, lh) {
    var t = DN.svg('text', { x: x, y: y, class: cls }, parent);
    lines.forEach(function (ln, j) { var ts = DN.svg('tspan', { x: x, dy: j ? lh : 0 }, t); ts.textContent = ln; });
    return t;
  }

  var W, narrow;
  function drawTop() {
    W = Math.max(280, Math.floor(wrap.clientWidth || 640));
    narrow = W < 520;
    svg.innerHTML = '';
    var R = rng(1903);
    var defs = DN.svg('defs', null, svg); defs.innerHTML = risoDefs(R);
    var S = steps(), FS = 11.5, CW = FS * 0.6, LH = 15;
    var boxes = [], H;
    if (!narrow) {
      var gap = 34, pw = (W - gap * 2) / 3, sc = pw / 200, ph = 130 * sc, top = 30;
      var maxL = 0;
      S.forEach(function (s, i) {
        var lines = wrapText(s.t, Math.floor((pw - 22) / CW));
        maxL = Math.max(maxL, lines.length);
        boxes.push({ x: i * (pw + gap), y: top, w: pw, h: ph, sc: sc, lines: lines, lx: i * (pw + gap) + 22, ly: top + ph + 22 });
      });
      var tl = top + ph + 22 + (maxL - 1) * LH + 22;
      H = tl + 34;
      /* hypothesis seal around steps 1 and 2 */
      var sg = DN.svg('g', { class: 'l03-seal l03-step', style: '--i:0' }, svg);
      DN.svg('rect', { x: boxes[0].x - 8, y: 12, width: boxes[1].x + pw - boxes[0].x + 16, height: tl - 22, class: 'l03-sealbox' }, sg);
      seal(sg, boxes[0].x + 6, 12);
      /* time bar */
      var tg = DN.svg('g', { class: 'l03-time' }, svg);
      DN.svg('line', { x1: 0, x2: W - 2, y1: tl, y2: tl, class: 'l03-tline', 'marker-end': 'url(#l03-arr)' }, tg);
      boxes.forEach(function (b, i) {
        var cx = b.x + b.w / 2;
        DN.svg('line', { x1: cx, x2: cx, y1: tl - 4, y2: tl + 4, class: 'l03-tline' }, tg);
        var t = DN.svg('text', { x: cx, y: tl + 20, 'text-anchor': 'middle', class: 'l03-tt' }, tg); t.textContent = S[i].time;
      });
      /* arrows between panels */
      for (var k = 0; k < 2; k++) {
        var ax = boxes[k].x + pw + 6, ay = top + ph * 0.48;
        DN.svg('line', { x1: ax, x2: ax + gap - 14, y1: ay, y2: ay, class: 'l03-flow', 'marker-end': 'url(#l03-arr)' }, svg);
      }
    } else {
      var tx = 74, iw = Math.min(W - tx, 230), sc2 = iw / 200, ih = 130 * sc2, y = 30, gapv = 30;
      S.forEach(function (s, i) {
        var lines = wrapText(s.t, Math.floor((W - tx - 22) / CW));
        boxes.push({ x: tx, y: y, w: iw, h: ih, sc: sc2, lines: lines, lx: tx + 22, ly: y + ih + 20 });
        y += ih + 20 + (lines.length - 1) * LH + 14 + gapv;
      });
      H = y - gapv + 4;
      var sg2 = DN.svg('g', { class: 'l03-seal l03-step', style: '--i:0' }, svg);
      var b1 = boxes[1], yb = b1.ly + (b1.lines.length - 1) * LH + 10;
      DN.svg('rect', { x: tx - 8, y: 12, width: W - tx + 6, height: yb - 12, class: 'l03-sealbox' }, sg2);
      seal(sg2, tx + 4, 12);
      var tg2 = DN.svg('g', { class: 'l03-time' }, svg);
      var tx0 = 6;
      DN.svg('line', { x1: tx0, x2: tx0, y1: boxes[0].y, y2: H - 2, class: 'l03-tline', 'marker-end': 'url(#l03-arr)' }, tg2);
      boxes.forEach(function (b, i) {
        var cy = b.y + b.h / 2;
        DN.svg('line', { x1: tx0 - 4, x2: tx0 + 4, y1: cy, y2: cy, class: 'l03-tline' }, tg2);
        var t = DN.svg('text', { x: tx0 + 9, y: cy + 4, class: 'l03-tt' }, tg2); t.textContent = S[i].time;
        if (i < 2) {
          var ax2 = b.x + b.w / 2, ay0 = b.ly + (b.lines.length - 1) * LH + 10;
          DN.svg('line', { x1: ax2, x2: ax2, y1: ay0 + 2, y2: boxes[i + 1].y - 4, class: 'l03-flow', 'marker-end': 'url(#l03-arr)' }, svg);
        }
      });
    }
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('width', W); svg.setAttribute('height', H);
    boxes.forEach(function (b, i) {
      var g = DN.svg('g', { class: 'l03-step', style: '--i:' + i }, svg);
      var ill = DN.svg('g', { transform: 'translate(' + f1(b.x) + ' ' + f1(b.y) + ') scale(' + b.sc.toFixed(4) + ')', 'aria-hidden': 'true' }, g);
      DN.svg('rect', { x: 0, y: 0, width: 200, height: 130, class: 'l03-clipbg' }, ill);
      var a = art(i);
      ill.innerHTML += '<clipPath id="l03-cp' + i + '"><rect x="0" y="0" width="200" height="130"/></clipPath>' +
        '<g clip-path="url(#l03-cp' + i + ')">' + inkLayer('a', a.a, R) + inkLayer('b', a.b, R) + '</g>' + a.crisp;
      var num = DN.svg('text', { x: b.x, y: b.ly, class: 'l03-num' }, g); num.textContent = b.lines && S[i].n;
      svgText(g, b.lx, b.ly, b.lines, 'l03-st', LH);
    });
    svg.setAttribute('aria-label', L('Diagrama em três tempos na membrana interna da mitocôndria. ', 'Three-step diagram on the inner membrane of the mitochondrion. ') +
      S.map(function (s) { return s.n + ', ' + s.t + ' (' + s.time + ')'; }).join('; ') + '. ' +
      L('Os passos 1 e 2 formam a hipótese principal.', 'Steps 1 and 2 form the main hypothesis.'));
  }
  function seal(g, x, y) {
    var txt = L('hipótese principal', 'main hypothesis');
    var w = txt.length * 6.8 + 18;
    DN.svg('rect', { x: x, y: y - 9, width: w, height: 18, class: 'l03-sealtag' }, g);
    var t = DN.svg('text', { x: x + w / 2, y: y + 3.6, 'text-anchor': 'middle', class: 'l03-sealt' }, g); t.textContent = txt.toUpperCase();
  }

  function drawTable() {
    var cs = cols(), rs = rows();
    legend.innerHTML = '<span><i class="l03-k l03-k-m"></i>' + L('medido', 'measured') + '</span>' +
      '<span><i class="l03-k l03-k-i"></i>' + L('medida indireta', 'indirect measure') + '</span>' +
      '<span><i class="l03-k l03-k-n"></i>' + L('não medido nos estudos reunidos', 'not measured in the studies gathered') + '</span>';
    var h = '<table class="l03-t" role="table" aria-label="' + L('Em que nível cada passo foi medido', 'At which level each step was measured') + '">' +
      '<thead role="rowgroup"><tr role="row"><th role="columnheader" class="l03-rh0"><span class="sr">' + L('passo', 'step') + '</span></th>';
    cs.forEach(function (c, j) { h += '<th role="columnheader" scope="col" class="l03-c l03-col' + j + '" style="--c:' + j + '">' + c + '</th>'; });
    h += '</tr></thead><tbody role="rowgroup">';
    rs.forEach(function (r) {
      h += '<tr role="row" class="l03-row"><th role="rowheader" scope="row" class="l03-rh">' + r.h + '</th>';
      r.c.forEach(function (c, j) {
        h += '<td role="cell" class="l03-c l03-s-' + c.s + ' l03-col' + j + '" style="--c:' + j + '" data-col="' + cs[j] + '">' +
          '<i class="l03-k l03-k-' + c.s + '" aria-hidden="true"></i><b>' + c.t + '</b>' + (c.d ? ' <span>' + c.d + '</span>' : '') + '</td>';
      });
      h += '</tr>';
      if (r.note) h += '<tr role="row" class="l03-noterow"><td role="cell" colspan="5" class="l03-note l03-note-lima">' + r.note + '</td></tr>';
    });
    h += '</tbody><tfoot role="rowgroup"><tr role="row" class="l03-footrow"><td role="cell" colspan="4" class="l03-footgap"></td>' +
      '<td role="cell" class="l03-note l03-note-quirk l03-c l03-col3" style="--c:3">' +
      L('Nenhuma demonstração confiável do efeito da luz na enzima (Quirk e Whelan, 2020).', 'No reliable demonstration of an effect of light on the enzyme (Quirk and Whelan, 2020).') + '</td></tr></tfoot></table>';
    tblWrap.innerHTML = h;
    take.textContent = L('A cadeia que vai da luz ao ATP foi medida em mitocôndrias e em células, onde a luz chega sem pele e sangue no caminho. Na coluna das pessoas, a maior parte dos passos ainda não foi medida, e células sem a enzima também responderam à luz.',
      'The chain from light to ATP was measured in mitochondria and in cells, where the light arrives with no skin or blood in the way. In the person column most steps have not been measured yet, and cells without the enzyme also responded to the light.');
  }

  function render() { drawTop(); drawTable(); }

  /* motion: steps left to right, then the matrix fills column by column */
  if (!DN.RM && 'IntersectionObserver' in window) {
    root.classList.add('l03-pre');
    DN.onVisible(root, function (vis) {
      if (vis) { root.classList.add('l03-play'); root.classList.remove('l03-pre'); }
    }, { once: true, margin: '0px 0px -20% 0px' });
  }

  var rt, lastW = 0;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { var w = wrap.clientWidth; if (w !== lastW) { lastW = w; drawTop(); } }, 150);
  });
  DN.onLang(render);
  lastW = wrap.clientWidth;
  render();
})();
