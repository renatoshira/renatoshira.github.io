/* l06 · cem-pacientes : the INCA trial as 100 people per arm, about 40 against 6 with severe mucositis */
(function () {
  'use strict';
  var root = DN.body('l06'); if (!root) return;
  var L = DN.L, E = DN.el, C = DN.COL;
  var P = 'l06-';

  /* Antunes et al. 2013: grade 3 or 4 mucositis in 40.5% (sham) and 6.4% (laser), rounded to 40 and 6 of 100 */
  var ARMS = [
    { k: 'off', n: 40, pct: '40,5', pctEn: '40.5', pt: 'aparelho desligado', en: 'device switched off' },
    { k: 'on', n: 6, pct: '6,4', pctEn: '6.4', pt: 'laser de 660 nm', en: '660 nm laser' }
  ];
  var shown = DN.RM;

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
  /* grain filters for the two inks (technique from dopamina w00) */
  function defs() {
    var s = '';
    [['a', 0.09, 0.8, 37], ['b', 0.1, 0.9, 211]].forEach(function (d, i) {
      s += '<filter id="' + P + d[0] + 'g" x="-2%" y="-2%" width="104%" height="104%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="' + d[1] + '" numOctaves="2" seed="' + d[3] + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.4" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="' + d[2] + '" numOctaves="2" seed="' + (d[3] + 59) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.4 0 0 0 2.3" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
    });
    s += '<pattern id="' + P + 'gh" width="2.4" height="2.4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="1.2" cy="1.2" r=".62" fill="#9a9a9a"/></pattern>';
    return '<svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden"><defs>' + s + '</defs></svg>';
  }
  /* one person in a cell of size c at (x,y): head and shoulders, slightly uneven like a stamp */
  function person(x, y, c, R) {
    var j = function () { return (R() - 0.5) * c * 0.03; };
    var hx = x + c * 0.5 + j(), hy = y + c * 0.27 + j(), hr = c * 0.15;
    var bx0 = x + c * 0.2 + j(), bx1 = x + c * 0.8 + j(), by0 = y + c * 0.5, by1 = y + c * 0.92;
    var r = c * 0.2;
    var head = 'M' + (hx - hr).toFixed(1) + ',' + hy.toFixed(1) + 'a' + hr.toFixed(1) + ',' + hr.toFixed(1) + ' 0 1 0 ' + (2 * hr).toFixed(1) + ',0a' + hr.toFixed(1) + ',' + hr.toFixed(1) + ' 0 1 0 ' + (-2 * hr).toFixed(1) + ',0Z';
    var body = 'M' + bx0.toFixed(1) + ',' + by1.toFixed(1) + 'V' + (by0 + r).toFixed(1) +
      'Q' + bx0.toFixed(1) + ',' + by0.toFixed(1) + ' ' + (bx0 + r).toFixed(1) + ',' + by0.toFixed(1) +
      'H' + (bx1 - r).toFixed(1) + 'Q' + bx1.toFixed(1) + ',' + by0.toFixed(1) + ' ' + bx1.toFixed(1) + ',' + (by0 + r).toFixed(1) +
      'V' + by1.toFixed(1) + 'Z';
    return head + body;
  }

  function grid(arm, ai, W) {
    var c = Math.min(32, Math.floor(W / 10)), S = c * 10;
    var R = rng(ai * 97 + 5);
    var pg = '', pa = [], pb = '';
    for (var i = 0; i < 100; i++) {
      var x = (i % 10) * c, y = Math.floor(i / 10) * c;
      var d = person(x, y, c, R);
      if (i < arm.n) pa.push('<path class="l06-hit" style="transition-delay:' + (Math.floor(i / 10) * 110) + 'ms" d="' + d + '"/>');
      else pg += d;
      pb += d;
    }
    var lab = L('Grade de 100 pacientes com ', 'Grid of 100 patients with the ') + L(arm.pt, arm.en) + ': ' + arm.n + L(' tiveram mucosite grave.', ' had severe mucositis.');
    return '<svg class="l06-grid" viewBox="-2 -2 ' + (S + 4) + ' ' + (S + 4) + '" style="max-width:' + (S + 4) + 'px" role="img" aria-label="' + lab + '">' +
      '<path d="' + pg + '" fill="url(#' + P + 'gh)" opacity=".55"/>' +
      '<g class="l06-a" fill="' + C.rubi + '" filter="url(#' + P + 'ag)" transform="translate(.8 -.6)">' + pa.join('') + '</g>' +
      '<g class="l06-b" fill="none" stroke="' + C.infra + '" stroke-width="1.1" opacity=".9" filter="url(#' + P + 'bg)" transform="translate(-.6 .7)"><path d="' + pb + '"/></g>' +
      '</svg>';
  }

  function bars(rows, max) {
    var h = '<div class="l06-bars">';
    rows.forEach(function (r) {
      h += '<div class="l06-br"><span class="l06-bl">' + r[0] + '</span><span class="l06-bt"><span class="l06-bf' + (r[3] ? ' l06-bf-ink' : '') + '" style="width:' + (r[1] / max * 100).toFixed(1) + '%"></span></span><span class="l06-bv">' + r[2] + '</span></div>';
    });
    return h + '</div>';
  }

  function render() {
    var W = root.clientWidth || 700;
    var mob = W < 560;
    var colW = mob ? W : (W - 28) / 2;
    root.innerHTML = '';
    E('div', null, root, defs());
    E('p', { class: 'l06-read' }, root, L(
      'Sem o laser, cerca de 40 em cada 100 pacientes tiveram feridas graves na boca, e com o laser foram cerca de 6. É o efeito mais forte da luz vermelha em pessoas, num uso de hospital com protocolo exato.',
      'Without the laser, about 40 in every 100 patients had severe mouth sores, and with the laser about 6 did. It is the strongest effect of red light in people, in a hospital use with an exact protocol.'));
    var gs = E('div', { class: 'l06-grids' + (shown ? ' l06-shown' : '') }, root);
    ARMS.forEach(function (arm, ai) {
      var col = E('div', { class: 'l06-col' }, gs);
      E('div', { class: 'l06-arm' }, col, L(arm.pt, arm.en));
      E('div', { class: 'l06-big' }, col, '<b>' + arm.n + '</b> ' + L('de 100 com feridas graves', 'of 100 with severe sores'));
      E('div', { class: 'l06-pct' }, col, L(arm.pct + '% no ensaio, mucosite grau 3 ou 4', arm.pctEn + '% in the trial, grade 3 or 4 mucositis'));
      E('div', { class: 'l06-gw' }, col, grid(arm, ai, Math.min(colW, 330)));
    });
    E('p', { class: 'l06-key' }, root,
      '<span><svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" fill="' + C.rubi + '"/></svg>' +
      L('mucosite grave: feridas que doem a ponto de atrapalhar comer', 'severe mucositis: sores painful enough to get in the way of eating') + '</span>' +
      '<span><svg viewBox="0 0 14 14" aria-hidden="true"><rect x="1" y="1" width="12" height="12" fill="url(#' + P + 'gh)" stroke="' + C.infra + '" stroke-width="1"/></svg>' +
      L('sem mucosite grave', 'no severe mucositis') + '</span>');

    var cards = E('div', { class: 'l06-cards' }, root);
    E('div', { class: 'l06-card' }, cards,
      '<p class="l06-ct">' + L('A meta-análise de 18 ensaios, 1.144 pacientes', 'The meta-analysis of 18 trials, 1,144 patients') + '</p>' +
      '<p class="l06-cv">' + L('risco de mucosite grave <b>0,37 vez</b> o do controle', 'risk of severe mucositis <b>0.37 times</b> that of controls') + '</p>' +
      bars([[L('controle', 'control'), 1, '1'], [L('luz', 'light'), 0.37, DN.fmt(0.37)]], 1) +
      '<p class="l06-cs">Oberoi 2014</p>');
    E('div', { class: 'l06-card' }, cards,
      '<p class="l06-ct">' + L('Um ensaio americano de 2026 com LED dentro da boca, 85 pacientes', 'A US trial from 2026 with an LED inside the mouth, 85 patients') + '</p>' +
      '<p class="l06-cv">' + L('mucosite grave em <b>36,8%</b> contra 57,1%', 'severe mucositis in <b>36.8%</b> against 57.1%') + '</p>' +
      bars([[L('falso', 'sham'), 57.1, DN.fmt(57.1, 1) + '%'], ['LED', 36.8, DN.fmt(36.8, 1) + '%']], 100) +
      '<p class="l06-cs">Hu 2026</p>');
    E('div', { class: 'l06-card l06-caut' }, cards,
      '<span class="l06-seal">' + L('cautela', 'caution') + '</span>' +
      '<p class="l06-ct">' + L('O seguimento do mesmo ensaio, com 94 pacientes', 'The follow-up of the same trial, with 94 patients') + '</p>' +
      '<p class="l06-cv">' + L('o grupo do laser não teve mais câncer de volta e teve mais resposta completa ao tratamento do tumor, <b>89,1%</b> contra 67,4%, num desfecho secundário',
        'the laser group did not have more cancer come back and had more complete responses to tumour treatment, <b>89.1%</b> against 67.4%, in a secondary outcome') + '</p>' +
      bars([[L('falso', 'sham'), 67.4, DN.fmt(67.4, 1) + '%', 1], ['laser', 89.1, DN.fmt(89.1, 1) + '%', 1]], 100) +
      '<p class="l06-cs">Antunes 2017</p>');

    E('p', { class: 'sr' }, root, L(
      'Resumo dos números: no ensaio do INCA, 40,5% dos pacientes com aparelho desligado e 6,4% dos pacientes com laser tiveram mucosite grave. Na meta-análise de 18 ensaios, o risco ficou em 0,37 vez o do controle. No ensaio americano de 2026, 36,8% contra 57,1%. No seguimento do INCA, resposta completa em 89,1% contra 67,4%.',
      'The numbers: in the INCA trial, 40.5% of patients with the device switched off and 6.4% of patients with the laser had severe mucositis. In the meta-analysis of 18 trials, the risk was 0.37 times that of controls. In the 2026 US trial, 36.8% against 57.1%. In the INCA follow-up, complete response in 89.1% against 67.4%.'));
    R.gs = gs;
  }
  var R = {};
  render();
  DN.onLang(render);
  var lastW = root.clientWidth;
  window.addEventListener('resize', function () { if (Math.abs(root.clientWidth - lastW) > 20) { lastW = root.clientWidth; render(); } });
  if (!shown) DN.onVisible(root, function (v) {
    if (v && !shown) { shown = true; requestAnimationFrame(function () { R.gs.classList.add('l06-shown'); }); }
  }, { once: true, threshold: 0.2 });
})();
