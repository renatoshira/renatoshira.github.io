/* l12 · os-selos : what 510(k), De Novo, PMA and Anvisa each guarantee about a red light device */
(function () {
  'use strict';
  var root = DN.body('l12'); if (!root) return;
  var L = DN.L, C = DN.COL;

  /* openFDA 510(k) totals per product code, query of 14/11/2026 (lv-mercado-hype-seguranca.md) */
  var CODES = [
    { c: 'OHS', n: 166, t: function () { return L('máscaras para rugas', 'wrinkle masks'); } },
    { c: 'OLP', n: 51, t: function () { return L('máscaras para acne', 'acne masks'); } },
    { c: 'OAP', n: 116, t: function () { return L('pentes e capacetes para cabelo', 'hair combs and helmets'); } },
    { c: 'ILY', n: 229, t: function () { return L('lâmpadas de calor para dor', 'heat lamps for pain'); } },
    { c: 'NHN', n: 54, t: function () { return L('lasers para dor', 'lasers for pain'); } }
  ];
  var MAXN = 229;

  /* ---------- risograph rubber stamp, rubi with misregistration ---------- */
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
  function stamp(word, k) {
    var R = rng(4400 + k * 37);
    var w = 30 + word.length * 15.5, h = 50;
    var p = 'l12r' + k;
    var defs = '<filter id="' + p + 'g" x="-5%" y="-10%" width="110%" height="120%" color-interpolation-filters="sRGB">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="w"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="' + ((R() * 900) | 0) + '" result="n"/>' +
      '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.6 0 0 0 2.75" result="m"/>' +
      '<feComposite in="d" in2="m" operator="in"/></filter>' +
      '<pattern id="' + p + 'h" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(15)"><circle cx="1.3" cy="1.3" r=".6" fill="' + C.rubi + '"/></pattern>';
    var body = '<rect x="3" y="3" width="' + (w - 6) + '" height="' + (h - 6) + '" rx="5" fill="url(#' + p + 'h)" opacity=".5"/>' +
      '<rect x="3" y="3" width="' + (w - 6) + '" height="' + (h - 6) + '" rx="5" fill="none" stroke="' + C.rubi + '" stroke-width="3.2"/>' +
      '<rect x="8" y="8" width="' + (w - 16) + '" height="' + (h - 16) + '" rx="2.5" fill="none" stroke="' + C.rubi + '" stroke-width="1.1"/>' +
      '<text x="' + (w / 2) + '" y="' + (h / 2 + 8) + '" text-anchor="middle" class="l12-sw" fill="' + C.rubi + '">' + word + '</text>';
    var gx = f1((R() < 0.5 ? -1 : 1) * (1 + R() * 1.4)), gy = f1((R() < 0.5 ? -1 : 1) * (0.6 + R()));
    var rot = f1((R() - 0.5) * 7);
    var dots = '';
    for (var s = 0; s < 6; s++) dots += '<circle cx="' + f1(R() * w) + '" cy="' + f1(R() * h) + '" r="' + f1(0.3 + R() * 0.6) + '" fill="' + C.rubi + '"/>';
    return '<svg viewBox="-4 -6 ' + (w + 8) + ' ' + (h + 12) + '" width="' + (w + 8) + '" height="' + (h + 12) + '" aria-hidden="true" focusable="false">' +
      '<defs>' + defs + '</defs><g transform="rotate(' + rot + ' ' + w / 2 + ' ' + h / 2 + ')">' +
      '<g class="l12-ghost" transform="translate(' + gx + ' ' + gy + ')" opacity=".3" filter="url(#' + p + 'g)">' + body + '</g>' +
      '<g filter="url(#' + p + 'g)" opacity=".95">' + body + dots + '</g></g></svg>';
  }

  /* ---------- content ---------- */
  function cards() {
    return [
      {
        word: 'CLEARED',
        name: L('510(k) · liberado', '510(k) · cleared'),
        show: L('Semelhança com um aparelho já vendido. Bastam testes de bancada, às vezes sem nenhum ensaio clínico.',
          'Similarity to a device already on the market. Bench tests are enough, sometimes with no clinical trial at all.'),
        ex: 'codes',
        say: L('“liberado pela FDA para venda como semelhante a outro aparelho”', '“cleared by the FDA for sale as similar to another device”')
      },
      {
        word: 'DE NOVO',
        name: L('De Novo · autorizado', 'De Novo · authorized'),
        show: L('Um aparelho novo, de risco baixo a moderado, sem outro parecido no mercado, com estudo clínico.',
          'A new device of low to moderate risk, with nothing similar on the market, backed by a clinical study.'),
        ex: L('Valeda, para a degeneração macular seca, autorizado em 4/11/2024.', 'Valeda, for dry macular degeneration, authorized on 4 Nov 2024.'),
        say: L('“autorizado pela FDA com um ensaio clínico”', '“authorized by the FDA on the basis of a clinical trial”')
      },
      {
        word: 'APPROVED',
        name: L('PMA · aprovado', 'PMA · approved'),
        show: L('Prova de segurança e de eficácia em ensaios clínicos, a via mais exigente da FDA.',
          'Proof of safety and effectiveness in clinical trials, the FDA’s most demanding route.'),
        ex: L('A pesquisa deste ensaio não encontrou nenhum aparelho de fotobiomodulação aprovado por essa via.',
          'The research for this essay found no photobiomodulation device approved through this route.'),
        say: null,
        empty: L('a frase fica vazia, porque não há aparelho', 'the line stays empty, because there is no device')
      },
      {
        word: 'ANVISA',
        name: L('Anvisa · notificado ou registrado', 'Anvisa · notified or registered'),
        show: L('Aparelhos de luz com fim terapêutico ou estético são produtos para saúde, classificados por risco de I a IV, e a classe define se basta notificar ou se é preciso registrar.',
          'Light devices with a therapeutic or cosmetic purpose are health products, classed by risk from I to IV, and the class decides whether a notification is enough or a registration is required.'),
        ex: L('Máscaras de LED e lasers de uso estético ou terapêutico. A Anvisa não publicou alerta específico sobre máscaras de LED sem registro.',
          'LED masks and lasers for cosmetic or therapeutic use. Anvisa has not issued a specific alert about unregistered LED masks.'),
        say: L('“notificado ou registrado na Anvisa sob o número…”', '“notified or registered with Anvisa under number…”'),
        after: L('Consulte o número no site da Anvisa antes de comprar.', 'Look up the number on Anvisa’s website before buying.')
      }
    ];
  }

  var take = null, grid = null, foot = null, more = null, played = false;

  function render() {
    root.innerHTML = '';
    take = DN.el('p', { class: 'l12-read' }, root);
    take.textContent = L('Quase toda máscara anunciada como aprovada pela FDA foi só liberada, o que quer dizer que ela é parecida com outra já vendida. A liberação diz pouco sobre se o aparelho entrega a dose de algum estudo.',
      'Almost every mask advertised as FDA approved was only cleared, which means it is similar to another one already on sale. Clearance says little about whether the device delivers the dose of any study.');
    grid = DN.el('div', { class: 'l12-grid' }, root);
    var RL = [L('o que o fabricante precisou mostrar', 'what the maker had to show'),
      L('exemplos com luz vermelha', 'red light examples'),
      L('a frase honesta para o anúncio', 'the honest line for the ad')];
    cards().forEach(function (c, k) {
      var card = DN.el('article', { class: 'l12-card' }, grid);
      DN.el('div', { class: 'l12-stamp' }, card, stamp(c.word, k));
      DN.el('h4', { class: 'l12-name' }, card, c.name);
      var dl = DN.el('dl', { class: 'l12-dl' }, card);
      DN.el('dt', null, dl, RL[0]);
      DN.el('dd', null, dl, c.show);
      DN.el('dt', null, dl, RL[1]);
      var dd = DN.el('dd', null, dl);
      if (c.ex === 'codes') {
        var tb = '<table class="l12-codes"><caption class="l12-sr">' + L('liberações 510(k) por código de produto', '510(k) clearances per product code') + '</caption><tbody>' +
          CODES.map(function (q) {
            return '<tr><th scope="row">' + q.t().replace(/ (\S+)$/, '\u00a0$1') + '\u00a0<span class="l12-code">' + q.c + '</span></th>' +
              '<td class="l12-bc"><span class="l12-bar" style="width:' + (q.n / MAXN * 100).toFixed(1) + '%"></span></td>' +
              '<td class="l12-n">' + q.n + '</td></tr>';
          }).join('') + '</tbody></table><p class="l12-note">' + L('liberações em cada código, desde o primeiro registro', 'clearances under each code, since the first one') + '</p>';
        dd.innerHTML = tb;
      } else dd.textContent = c.ex;
      DN.el('dt', null, dl, RL[2]);
      var sd = DN.el('dd', null, dl);
      if (c.say) DN.el('p', { class: 'l12-say' }, sd, c.say);
      else DN.el('p', { class: 'l12-say l12-empty' }, sd, c.empty);
      if (c.after) DN.el('p', { class: 'l12-after' }, sd, c.after);
    });

    foot = DN.el('div', { class: 'l12-foot' }, root);
    DN.el('div', { class: 'l12-fh' }, foot, L('três anúncios corrigidos', 'three ads that were corrected'));
    var cases = [
      [L('Reino Unido · ASA · 5/11/2025', 'UK · ASA · 5 Nov 2025'), L('Proibiu anúncios de máscaras que prometiam tratar acne e rosácea.', 'Banned ads for masks that promised to treat acne and rosacea.')],
      [L('EUA · NAD · 2019', 'US · NAD · 2019'), L('A Zero Gravity não comprovou que “91% viram melhora em uma semana”.', 'Zero Gravity could not back up “91% saw improvement in one week”.')],
      [L('EUA · FTC · 2020', 'US · FTC · 2020'), L('Acordo de 22 milhões de dólares com a Willow Curve, que se dizia aprovada pelo governo.', 'A 22 million dollar settlement with Willow Curve, which claimed to be government approved.')]
    ];
    var fl = DN.el('div', { class: 'l12-cases' }, foot);
    cases.forEach(function (c) {
      var d = DN.el('div', { class: 'l12-case' }, fl);
      DN.el('b', null, d, c[0]);
      DN.el('p', null, d, c[1]);
    });
    if (played || DN.RM) drop(true);
  }

  function drop(instant) {
    var st = root.querySelectorAll('.l12-stamp');
    Array.prototype.forEach.call(st, function (s, k) {
      if (instant) s.classList.add('in');
      else setTimeout(function () { s.classList.add('in'); }, 150 + k * 380);
    });
  }

  DN.onLang(render);
  render();
  DN.onVisible(root, function (v) {
    if (v && !played) { played = true; drop(DN.RM); }
  }, { once: true, threshold: 0.25 });
})();
