/* l07 · quem-testou : trial size, type of control and ties to sellers, one row per use, in ladder order */
(function () {
  'use strict';
  var root = DN.body('l07'); if (!root) return;
  var L = DN.L, E = DN.el, fmt = DN.fmt;
  var IC = DN.lvIcons; /* defined in l05.js, the same risograph icons as the ladder */
  var P = 'l07i-';
  var RMAX = 36, NMAX = 1144;
  function rad(n) { return RMAX * Math.sqrt(n / NMAX); }

  var RUNG = [['diretriz recomenda', 'a guideline recommends'], ['efeito moderado', 'moderate effect'], ['sinal fraco', 'weak signal'], null, ['nenhum estudo em pessoas', 'no studies in people']];
  var COMP = {
    sham: ['luz falsa ou aparelho desligado', 'sham light or a switched-off device'],
    none: ['sem tratamento', 'no treatment'],
    dark: ['sem luz nenhuma', 'no light at all'],
    glasses: ['óculos comuns', 'ordinary glasses'],
    mixed: ['varia de ensaio para ensaio', 'varies from trial to trial'],
    zero: ['nenhum ensaio', 'no trial']
  };
  /* link: [pt, en, flag] flag 's' secondary source or unverified detail (dashed), 'u' not verified at all (dim) */
  var ROWS = [
    { r: 0, ic: 'boca', u: ['Feridas na boca no câncer', 'Mouth sores in cancer'], n: 1144, n2: 94,
      c: ['1.144 pacientes em 18 ensaios, e 94 no ensaio do INCA', '1,144 patients in 18 trials, and 94 in the INCA trial'],
      cmp: 'sham', ln: ['ensaio central num hospital público, o INCA', 'key trial at a public hospital, INCA'] },
    { r: 1, ic: 'pescoco', u: ['Dor no pescoço', 'Neck pain'], n: 820,
      c: ['820 em 16 ensaios', '820 in 16 trials'],
      cmp: 'sham', ln: ['autores da associação que promove a técnica, a WALT', 'authors from the association that promotes the technique, WALT', 's'] },
    { r: 1, ic: 'olho', u: ['Miopia em crianças', 'Myopia in children'], n: 264,
      c: ['264 crianças', '264 children'],
      cmp: 'glasses', ln: ['autor sócio da fabricante, a Eyerising, declarado em outro ensaio do mesmo autor', 'author is a shareholder of the maker, Eyerising, as declared in another trial by the same author', 's'] },
    { r: 1, ic: 'olho', u: ['Degeneração macular seca', 'Dry macular degeneration'], n: 100,
      c: ['100 pacientes, 148 olhos', '100 patients, 148 eyes'],
      cmp: 'sham', ln: ['autores da fabricante, a LumiThera', 'authors work for the maker, LumiThera'] },
    { r: 2, ic: 'gota', u: ['Rugas', 'Wrinkles'], n: 136,
      c: ['136 pessoas, 113 tratadas e 23 sem tratamento', '136 people, 113 treated and 23 untreated'],
      cmp: 'none', ln: ['não verificado', 'not verified', 'u'] },
    { r: 2, ic: 'fita', u: ['Gordura localizada', 'Localized fat'], n: 67,
      c: ['67 pessoas', '67 people'],
      cmp: 'sham', ln: ['fabricante pagou, a Erchonia', 'the maker paid, Erchonia', 's'] },
    { r: 2, ic: 'pescoco', u: ['Tireoide de Hashimoto', 'Hashimoto thyroiditis'], n: 43,
      c: ['43 pessoas', '43 people'],
      cmp: 'sham', ln: ['um único grupo, sem repetição', 'a single group, never repeated'] },
    { r: 2, ic: 'gota', u: ['Acne', 'Acne'], n: 31,
      c: ['mediana de 31 por ensaio, em 71 ensaios', 'a median of 31 per trial, across 71 trials'],
      cmp: 'mixed', ln: ['71 ensaios de grupos diferentes', '71 trials from different groups'] },
    { r: 2, ic: 'cerebro', u: ['Memória e demência', 'Memory and dementia'], n: 26,
      c: ['26 pessoas', '26 people'],
      cmp: 'sham', ln: ['não verificado', 'not verified', 'u'] },
    { r: 2, ic: 'lua', u: ['Sono', 'Sleep'], n: 20,
      c: ['20 atletas', '20 athletes'],
      cmp: 'dark', ln: ['não verificado', 'not verified', 'u'] },
    { r: 4, ic: 'frasco', u: ['Testosterona', 'Testosterone'], n: 0,
      c: ['nenhuma pessoa', 'nobody'],
      cmp: 'zero', ln: ['só estudos em ratos', 'only studies in rats', 's'] }
  ];

  /* crisp glyphs for the type of comparison */
  function compIcon(k) {
    var s = '<svg class="l07-ci" viewBox="0 0 20 20" aria-hidden="true">';
    if (k === 'sham') s += '<path d="M10,3 V10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M6,5.6 A6,6 0 1 0 14,5.6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>';
    else if (k === 'none') s += '<circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="2.2 2"/>';
    else if (k === 'dark') s += '<circle cx="10" cy="10" r="3.4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M10,2.5v2M10,15.5v2M2.5,10h2M15.5,10h2M4.7,4.7l1.4,1.4M13.9,13.9l1.4,1.4M4.7,15.3l1.4,-1.4M13.9,6.1l1.4,-1.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M3,17 L17,3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>';
    else if (k === 'glasses') s += '<circle cx="5.5" cy="11" r="3.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="14.5" cy="11" r="3.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9,10.4 Q10,9.4 11,10.4 M1.9,10 L1,7 M18.1,10 L19,7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>';
    else if (k === 'mixed') s += '<circle cx="4.5" cy="10" r="1.8" fill="currentColor"/><circle cx="10" cy="10" r="1.8" fill="currentColor"/><circle cx="15.5" cy="10" r="1.8" fill="currentColor"/>';
    else s += '<path d="M5,10 H15" stroke="currentColor" stroke-width="1.6" stroke-dasharray="2 2"/>';
    return s + '</svg>';
  }

  function circle(row) {
    var W = 2 * RMAX + 4, r = rad(row.n), h = Math.max(2 * r + 4, 22);
    if (row.n === 0) h = 22;
    var cy = h / 2, s = '<svg class="l07-cs" viewBox="0 0 ' + W + ' ' + h.toFixed(1) + '" width="' + W + '" height="' + h.toFixed(1) + '" aria-hidden="true">';
    if (row.n === 0) {
      s += '<circle class="l07-c l07-c0" cx="' + W / 2 + '" cy="' + cy + '" r="8"/><text x="' + W / 2 + '" y="' + (cy + 3.5) + '" text-anchor="middle" class="l07-z">0</text>';
    } else {
      s += '<circle class="l07-c" cx="' + W / 2 + '" cy="' + cy.toFixed(1) + '" r="' + r.toFixed(2) + '"/>';
      if (row.n2) {
        var r2 = rad(row.n2);
        s += '<circle class="l07-c l07-c2" cx="' + W / 2 + '" cy="' + (cy + r - r2 - 0.8).toFixed(1) + '" r="' + r2.toFixed(2) + '"/>';
      }
    }
    return s + '</svg>';
  }

  var shown = DN.RM;
  var R = {};
  function render() {
    root.innerHTML = '';
    if (IC) E('div', { class: 'l07-defs' }, root, IC.defs(P));
    E('p', { class: 'l07-read' }, root, L(
      'Os usos que os anúncios mais prometem foram testados em grupos pequenos, muitas vezes sem luz falsa no grupo de comparação e por pesquisadores ligados a quem vende. O uso com diretriz reúne mais de mil pacientes em ensaios com placebo.',
      'The uses that ads promise most were tested in small groups, often without sham light in the comparison group and by researchers tied to sellers. The use with a guideline gathers more than a thousand patients in placebo-controlled trials.'));
    var tb = E('div', { class: 'l07-tb' + (shown ? ' l07-shown' : ''), role: 'img', 'aria-label': L(
      'Tabela gráfica: um círculo por uso, com área proporcional ao número de pessoas testadas. Os números estão na tabela equivalente abaixo.',
      'Graphic table: one circle per use, with area proportional to the number of people tested. The numbers are in the equivalent table below.') }, root);
    var hd = E('div', { class: 'l07-row l07-hd', 'aria-hidden': 'true' }, tb);
    E('span', { class: 'l07-h1' }, hd, L('uso', 'use'));
    E('span', { class: 'l07-h2' }, hd, L('pessoas testadas', 'people tested'));
    E('span', { class: 'l07-h3' }, hd, L('comparado com', 'compared with'));
    E('span', { class: 'l07-h4' }, hd, L('ligação com quem vende ou promove', 'ties to sellers or promoters'));
    var lastR = -1, k = 0;
    ROWS.forEach(function (row) {
      if (row.r !== lastR) {
        lastR = row.r;
        E('div', { class: 'l07-rung', 'aria-hidden': 'true' }, tb, L(RUNG[row.r][0], RUNG[row.r][1]));
      }
      var el = E('div', { class: 'l07-row', 'aria-hidden': 'true', style: '--d:' + (k++ * 70) + 'ms' }, tb);
      E('div', { class: 'l07-use' }, el, (IC ? IC.stamp(row.ic, P, 'lvi l07-ic') : '') + '<b>' + L(row.u[0], row.u[1]) + '</b>');
      E('div', { class: 'l07-circ' }, el, circle(row));
      E('div', { class: 'l07-n' }, el, L(row.c[0], row.c[1]));
      E('div', { class: 'l07-cmp l07-cmp-' + row.cmp }, el, compIcon(row.cmp) + '<span>' + L(COMP[row.cmp][0], COMP[row.cmp][1]) + '</span>');
      var f = row.ln[2];
      E('div', { class: 'l07-ln' + (f === 's' ? ' l07-s' : '') + (f === 'u' ? ' l07-u' : '') }, el, '<span>' + L(row.ln[0], row.ln[1]) + '</span>');
    });
    E('p', { class: 'l07-key' }, root,
      '<span><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" class="l07-kc"/></svg>' + L('área proporcional ao número de pessoas', 'area proportional to the number of people') + '</span>' +
      '<span class="l07-k2"><span class="l07-ks">' + L('sublinhado tracejado', 'dashed underline') + '</span>' + L(': vínculo de fonte secundária ou declarado em outro artigo', ': tie from a secondary source or declared in another paper') + '</span>');
    E('p', { class: 'l07-foot' }, root, L(
      'A síntese mais ampla: <b>15 meta-análises, 204 ensaios, mais de 9.000 pessoas</b>, e certeza moderada só em 5 desfechos (Son 2025).',
      'The broadest synthesis: <b>15 meta-analyses, 204 trials, more than 9,000 people</b>, and moderate certainty in only 5 outcomes (Son 2025).'));
    var det = E('details', { class: 'more l07-tab' }, root);
    E('summary', null, det, L('Ver como tabela', 'See as a table'));
    var t = '<table class="t"><thead><tr><th>' + L('uso', 'use') + '</th><th>' + L('pessoas', 'people') + '</th><th>' + L('comparado com', 'compared with') + '</th><th>' + L('ligação', 'ties') + '</th></tr></thead><tbody>';
    ROWS.forEach(function (row) {
      t += '<tr><td>' + L(row.u[0], row.u[1]) + '</td><td>' + L(row.c[0], row.c[1]) + '</td><td>' + L(COMP[row.cmp][0], COMP[row.cmp][1]) + '</td><td>' + L(row.ln[0], row.ln[1]) + '</td></tr>';
    });
    det.innerHTML += t + '</tbody></table>';
    R.tb = tb;
  }
  render();
  DN.onLang(render);
  if (!shown) DN.onVisible(root, function (v) {
    if (v && !shown) { shown = true; requestAnimationFrame(function () { R.tb.classList.add('l07-shown'); }); }
  }, { once: true, threshold: 0.15 });
})();
