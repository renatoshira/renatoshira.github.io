/* l13 · antes-de-comprar : the "before you buy" label for the reader's device
   Reads the device stored by l08 (DN.store 'device' = {irr, name, key, dist, min, wl}); without it,
   it starts from the controlled trial mask of 10 mW/cm2 as a marked example.
   The reader's answers are kept in DN.store 'etiqueta'. Exports a two ink PNG. */
(function () {
  'use strict';
  var root = DN.body('l13'); if (!root) return;
  var L = DN.L, fmt = DN.fmt, S = DN.svg, E = DN.el, C = DN.COL;

  /* ---------- the ladder from l05 ---------- */
  var RUNGS = [
    { pt: 'diretriz recomenda', en: 'a guideline recommends', dpt: 'uma sociedade médica recomenda com protocolo definido', den: 'a medical society recommends it with a set protocol' },
    { pt: 'efeito moderado', en: 'moderate effect', dpt: 'efeito consistente contra luz falsa, com estudos pequenos ou ligados a quem vende', den: 'a consistent effect against sham light, in small studies or studies tied to sellers' },
    { pt: 'sinal fraco', en: 'weak signal', dpt: 'poucos estudos pequenos, positivos e frágeis', den: 'a few small, positive and fragile studies' },
    { pt: 'estudos sem efeito', en: 'studies found no effect', dpt: 'ensaios ou meta-análises que não acharam diferença', den: 'trials or meta-analyses that found no difference' },
    { pt: 'nenhum estudo em pessoas', en: 'no studies in people', dpt: 'só células, animais ou anúncio', den: 'only cells, animals or advertising' }
  ];
  var USES = [
    { k: 'mucosite', r: 0, pt: 'feridas na boca no tratamento de câncer', en: 'mouth sores during cancer treatment',
      npt: 'risco de mucosite grave 0,37 vez o do controle, 18 ensaios, 1.144 pacientes (Oberoi 2014; MASCC/ISOO 2019), com laser de hospital', nen: 'risk of severe mucositis 0.37 times that of controls, 18 trials, 1,144 patients (Oberoi 2014; MASCC/ISOO 2019), with a hospital laser' },
    { k: 'calvicie', r: 1, pt: 'calvície', en: 'hair loss',
      npt: 'diferença padronizada de 1,27 na densidade de fios, 7 ensaios contra luz falsa (Lueangarun 2021)', nen: 'standardized difference of 1.27 in hair density, 7 trials against sham light (Lueangarun 2021)' },
    { k: 'pescoco', r: 1, pt: 'dor no pescoço', en: 'neck pain',
      npt: '19,9 mm a menos numa escala de 0 a 100, 16 ensaios (Chow 2009)', nen: '19.9 mm less on a 0 to 100 scale, 16 trials (Chow 2009)' },
    { k: 'joelho', r: 1, pt: 'dor no joelho', en: 'knee pain',
      npt: '14,2 mm a menos, 22 ensaios (Stausholm 2019); a diretriz britânica diz para não oferecer', nen: '14.2 mm less, 22 trials (Stausholm 2019); the British guideline says not to offer it' },
    { k: 'miopia', r: 1, face: true, pt: 'miopia em crianças', en: 'myopia in children',
      npt: 'olho cresceu 0,26 mm a menos em um ano, 264 crianças (Jiang 2022); segurança não resolvida', nen: 'the eye grew 0.26 mm less in a year, 264 children (Jiang 2022); safety unresolved' },
    { k: 'dmri', r: 1, face: true, pt: 'degeneração macular seca', en: 'dry macular degeneration',
      npt: '3,8 letras a mais que a luz falsa aos 21 meses, um ensaio (FDA, De Novo, 2024)', nen: '3.8 more letters than sham light at 21 months, one trial (FDA, De Novo, 2024)' },
    { k: 'tendao', r: 2, pt: 'tendão e fascite plantar', en: 'tendons and plantar fasciitis',
      npt: '13,2 mm a menos (Naterstad 2022)', nen: '13.2 mm less (Naterstad 2022)' },
    { k: 'rugas', r: 2, face: true, pt: 'rugas', en: 'wrinkles',
      npt: 'um ensaio de 136 pessoas sem luz falsa (Wunsch 2014)', nen: 'one trial of 136 people without sham light (Wunsch 2014)' },
    { k: 'acne', r: 2, face: true, pt: 'acne', en: 'acne',
      npt: '71 ensaios, mediana de 31 pessoas (Cochrane 2016)', nen: '71 trials, median of 31 people (Cochrane 2016)' },
    { k: 'pediab', r: 2, pt: 'úlcera de pé diabético', en: 'diabetic foot ulcer',
      npt: '7 ensaios, 194 pessoas (Li 2018)', nen: '7 trials, 194 people (Li 2018)' },
    { k: 'musculo', r: 2, pt: 'músculo e exercício', en: 'muscle and exercise',
      npt: 'diferença padronizada de 0,27 em resistência e zero em corrida e natação (Dutra 2022)', nen: 'standardized difference of 0.27 in endurance and zero in running and swimming (Dutra 2022)' },
    { k: 'gordura', r: 2, pt: 'gordura localizada', en: 'localized fat',
      npt: 'cerca de 1,8 cm por local, recuperados em parte em duas semanas (Jackson 2009)', nen: 'about 1.8 cm per site, partly regained within two weeks (Jackson 2009)' },
    { k: 'memoria', r: 2, pt: 'memória e demência', en: 'memory and dementia',
      npt: 'ensaio de 26 pessoas (Chun 2025)', nen: 'a trial of 26 people (Chun 2025)' },
    { k: 'depressao', r: 2, pt: 'depressão', en: 'depression',
      npt: '18 estudos pequenos (Seok 2026)', nen: '18 small studies (Seok 2026)' },
    { k: 'sono', r: 2, pt: 'sono', en: 'sleep',
      npt: '20 atletas sem luz falsa (Zhao 2012)', nen: '20 athletes without sham light (Zhao 2012)' },
    { k: 'tireoide', r: 2, pt: 'tireoide de Hashimoto', en: 'Hashimoto thyroiditis',
      npt: 'um ensaio de 43 pessoas na USP, sem repetição (Höfling 2013)', nen: 'one trial of 43 people at USP, never repeated (Höfling 2013)' },
    { k: 'venosa', r: 3, pt: 'úlcera venosa', en: 'venous ulcer',
      npt: 'sem diferença na área, 4 ensaios (Rasul 2026)', nen: 'no difference in area, 4 trials (Rasul 2026)' },
    { k: 'acup', r: 3, pt: 'artrose, com laser em pontos de acupuntura', en: 'osteoarthritis, with laser on acupuncture points',
      npt: 'sem efeito na dor, 13 ensaios (2026)', nen: 'no effect on pain, 13 trials (2026)' },
    { k: 'testo', r: 4, pt: 'testosterona', en: 'testosterone',
      npt: 'nenhum ensaio em pessoas apontou luz para os testículos', nen: 'no trial in people has aimed light at the testicles' },
    { k: 'longev', r: 4, pt: 'longevidade e saúde mitocondrial', en: 'longevity and mitochondrial health',
      npt: 'nenhum ensaio em pessoas com desfecho de envelhecimento', nen: 'no trial in people with an ageing outcome' },
    { k: 'celulite', r: 4, pt: 'celulite, sem massagem junto', en: 'cellulite, without massage',
      npt: 'nenhum estudo da luz sozinha', nen: 'no study of light on its own' }
  ];
  var WL = [
    { k: 'red', pt: '630 a 670 nm', en: '630 to 670 nm' },
    { k: 'nir', pt: '810 a 850 nm', en: '810 to 850 nm' },
    { k: 'both', pt: 'os dois', en: 'both' },
    { k: 'blue', pt: 'azul (415 nm)', en: 'blue (415 nm)' },
    { k: 'na', pt: 'não informado', en: 'not stated' }
  ];
  var SEALS = [
    { k: '510k', pt: '510(k)', en: '510(k)' },
    { k: 'denovo', pt: 'De Novo', en: 'De Novo' },
    { k: 'anvisa', pt: 'registro na Anvisa', en: 'Anvisa registration' },
    { k: 'aprovado', pt: '"aprovado pela FDA"', en: '"FDA approved"' },
    { k: 'nenhum', pt: 'nenhum', en: 'none' }
  ];
  var CASES = [
    { k: 'face', pt: 'uso no rosto, perto dos olhos', en: 'used on the face, near the eyes' },
    { k: 'ret', pt: 'pele tratada com ácido ou retinoide', en: 'skin treated with acids or retinoids' },
    { k: 'mel', pt: 'pele com melasma', en: 'skin with melasma' }
  ];
  function use(k) { for (var i = 0; i < USES.length; i++) if (USES[i].k === k) return USES[i]; return USES[7]; }

  /* ---------- state ---------- */
  var saved = DN.store.get('etiqueta', null) || {};
  var st = {
    use: saved.use || 'rugas', seal: saved.seal || null,
    face: saved.face != null ? saved.face : null, ret: !!saved.ret, mel: !!saved.mel,
    price: saved.price || '', sessions: saved.sessions || ''
  };
  var dev = { irr: '10', dist: '', min: '10', wl: 'both', name: null, key: 'mask10', example: true };
  function loadDevice(d) {
    if (!d || !(d.irr > 0)) return false;
    dev.irr = String(d.irr); dev.dist = d.dist ? String(d.dist) : ''; dev.min = d.min ? String(d.min) : '';
    dev.wl = d.wl || 'na'; dev.key = d.key || 'custom'; dev.name = d.name || null; dev.example = false;
    return true;
  }
  loadDevice(DN.store.get('device', null));
  if (saved.wl) dev.wl = saved.wl;
  var NAMES = { mask10: ['máscara de ensaio controlado', 'mask from a controlled trial'], mask2: ['máscara medida por um crítico', 'mask measured by a reviewer'],
    panel30: ['painel a 30 cm', 'panel at 30 cm'], panel15: ['painel a 15 cm', 'panel at 15 cm'], sun: ['sol do meio-dia', 'midday sun'] };

  function num(s) {
    if (s == null) return NaN;
    s = String(s).trim().replace(/\s/g, '');
    if (!s) return NaN;
    if (s.indexOf(',') >= 0 && s.indexOf('.') >= 0) {
      if (s.lastIndexOf(',') > s.lastIndexOf('.')) s = s.replace(/\./g, '').replace(',', '.');
      else s = s.replace(/,/g, '');
    } else if (/^\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
    else s = s.replace(',', '.');
    if (!/^\d*\.?\d+$/.test(s)) return NaN;
    return parseFloat(s);
  }
  function trim1(n) { var r = Math.round(n * 10) / 10; return fmt(r % 1 ? r.toFixed(1) : r); }
  function fdose(n) { return n < 10 ? trim1(n) : fmt(Math.round(n)); }
  function ftime(sec) {
    if (sec < 59.5) return Math.max(1, Math.round(sec)) + ' s';
    var m = sec / 60;
    if (m < 10) { var mm = Math.floor(m), ss = Math.round((m - mm) * 60); if (ss === 60) { mm++; ss = 0; } return mm + ' min' + (ss ? ' ' + ss + ' s' : ''); }
    if (m < 90) return Math.floor(m) + ' min';
    var h = Math.floor(m / 60), r = Math.floor(m - h * 60);
    return h + ' h' + (r ? ' ' + r + ' min' : '');
  }
  function money(n) { return L('R$ ', 'US$ ') + fmt(n.toFixed(n < 100 && n % 1 ? 2 : 0)); }

  /* ---------- form ---------- */
  var form = E('div', { class: 'l13-form' }, root);
  var Q = [];
  function qrow(n) {
    var row = E('div', { class: 'l13-q' }, form);
    var lab = E('div', { class: 'l13-ql', id: 'l13-q' + n }, row);
    var ctl = E('div', { class: 'l13-qc' }, row);
    Q[n] = { row: row, lab: lab, ctl: ctl };
    return ctl;
  }
  /* 1: use */
  var c1 = qrow(1);
  var selUse = E('select', { class: 'l13-sel', 'aria-labelledby': 'l13-q1' }, c1);
  selUse.addEventListener('change', function () { st.use = selUse.value; changed('rung'); });
  /* 2: wavelength chips */
  var c2 = qrow(2);
  var wlRow = E('div', { class: 'l13-chips', role: 'group', 'aria-labelledby': 'l13-q2' }, c2);
  var WB = WL.map(function (w) {
    var b = E('button', { type: 'button', class: 'l13-chip', 'aria-pressed': 'false' }, wlRow);
    b.addEventListener('click', function () { dev.wl = w.k; saveDev(); changed('spec'); });
    return b;
  });
  /* 3: irradiance and distance */
  var c3 = qrow(3);
  var irrW = E('div', { class: 'l13-pair' }, c3);
  function numIn(parent, id, unitPt, unitEn) {
    var w = E('label', { class: 'l13-num', for: id }, parent);
    var sp = E('span', { class: 'l13-nl' }, w);
    var i = E('input', { id: id, type: 'text', inputmode: 'decimal', autocomplete: 'off', spellcheck: 'false', class: 'l13-in' }, w);
    var u = E('span', { class: 'l13-u' }, w);
    return { i: i, sp: sp, u: u, upt: unitPt, uen: unitEn };
  }
  var NI = {
    irr: numIn(irrW, 'l13-irr', 'mW/cm²', 'mW/cm²'),
    dist: numIn(irrW, 'l13-dist', 'cm', 'cm')
  };
  var fromNote = E('p', { class: 'l13-from' }, c3);
  /* 4: minutes */
  var c4 = qrow(4);
  NI.min = numIn(c4, 'l13-min', 'min', 'min');
  /* 5: seal chips */
  var c5 = qrow(5);
  var sealRow = E('div', { class: 'l13-chips', role: 'group', 'aria-labelledby': 'l13-q5' }, c5);
  var SB = SEALS.map(function (s) {
    var b = E('button', { type: 'button', class: 'l13-chip', 'aria-pressed': 'false' }, sealRow);
    b.addEventListener('click', function () { st.seal = st.seal === s.k ? null : s.k; changed('warn'); });
    return b;
  });
  /* 6: the reader's case */
  var c6 = qrow(6);
  var caseRow = E('div', { class: 'l13-chips', role: 'group', 'aria-labelledby': 'l13-q6' }, c6);
  var CB = CASES.map(function (c) {
    var b = E('button', { type: 'button', class: 'l13-chip l13-tog', 'aria-pressed': 'false' }, caseRow);
    b.addEventListener('click', function () {
      if (c.k === 'face') st.face = !faceOn(); else st[c.k] = !st[c.k];
      changed('warn');
    });
    return b;
  });
  /* 7: price */
  var c7 = qrow(7);
  var prW = E('div', { class: 'l13-pair' }, c7);
  NI.price = numIn(prW, 'l13-price', '', '');
  NI.sessions = numIn(prW, 'l13-ses', '', '');

  function faceOn() { return st.face == null ? !!use(st.use).face : st.face; }

  NI.irr.i.addEventListener('input', function () { dev.irr = NI.irr.i.value; dev.key = 'custom'; dev.name = null; dev.example = false; saveDev(); changed('dose'); });
  NI.dist.i.addEventListener('input', function () { dev.dist = NI.dist.i.value; saveDev(); changed('spec'); });
  NI.min.i.addEventListener('input', function () { dev.min = NI.min.i.value; saveDev(); changed('dose'); });
  NI.price.i.addEventListener('input', function () { st.price = NI.price.i.value; changed('price'); });
  NI.sessions.i.addEventListener('input', function () { st.sessions = NI.sessions.i.value; changed('price'); });

  function saveDev() {
    var v = num(dev.irr);
    dev.example = false;
    if (!(v > 0)) return;
    var d = { irr: v, name: dev.name || L('seu aparelho', 'your device'), key: dev.key, dist: num(dev.dist) > 0 ? num(dev.dist) : null, min: num(dev.min) > 0 ? num(dev.min) : null, wl: dev.wl };
    DN.store.set('device', d);
    DN.emit('lv-device', { src: 'l13', dev: d });
  }
  DN.on('lv-device', function (e) {
    if (!e || e.src === 'l13') return;
    if (loadDevice(e.dev)) { syncInputs(); changed('dose', true); }
  });
  function syncInputs() {
    ['irr', 'dist', 'min'].forEach(function (k) { var v = num(dev[k]); if (document.activeElement !== NI[k].i) NI[k].i.value = v > 0 ? trim1(v) : (dev[k] || ''); });
    NI.price.i.value = st.price; NI.sessions.i.value = st.sessions;
  }

  /* ---------- the label ---------- */
  var labW = E('div', { class: 'l13-lab', role: 'region', 'aria-labelledby': 'l13-lt' }, root);
  var bg = S('svg', { class: 'l13-bg', 'aria-hidden': 'true' }, labW);
  var lin = E('div', { class: 'l13-lin' }, labW);
  var head = E('div', { class: 'l13-head' }, lin);
  var lt = E('p', { class: 'l13-lt', id: 'l13-lt' }, head);
  var ln = E('p', { class: 'l13-ln' }, head);
  var spec = E('div', { class: 'l13-spec' }, lin);
  var B = {};
  ['rung', 'dose', 'warn', 'price'].forEach(function (k) {
    var b = E('div', { class: 'l13-blk', 'data-b': k }, lin);
    B[k] = { el: b, h: E('p', { class: 'l13-bh' }, b), c: E('div', { class: 'l13-bc' }, b) };
  });
  var foot = E('p', { class: 'l13-foot' }, lin);
  var tools = E('div', { class: 'l13-tools' }, root);
  var png = E('button', { type: 'button', class: 'btn l13-png' }, tools);
  png.addEventListener('click', exportPng);
  var live = E('p', { class: 'sr', 'aria-live': 'polite' }, root);
  var take = E('p', { class: 'l13-take' }, root);

  function fieldHTML(lab, val) {
    var na = val == null || val === '';
    return '<div class="l13-f"><span class="l13-fl">' + lab + '</span><span class="l13-fv' + (na ? ' l13-na' : '') + '">' + (na ? L('não informado', 'not stated') : val) + '</span></div>';
  }
  function model() {
    var u = use(st.use), v = num(dev.irr), m = num(dev.min), d = num(dev.dist);
    var o = { u: u, irr: v > 0 && v <= 5000 ? v : null, min: m > 0 ? m : null, dist: d > 0 ? d : null };
    o.warns = [];
    if (u.r >= 2) o.warns.push(L('Uso nos degraus de baixo: nenhum aparelho resolve o que os estudos não mostraram.', 'A use on the lower rungs: no device fixes what the studies have not shown.'));
    if (!o.irr) o.warns.push(L('Irradiância não informada: não dá para saber a dose.', 'Irradiance not stated: there is no way to know the dose.'));
    if (st.seal === 'aprovado') o.warns.push(L('A caixa diz aprovado pela FDA: confira se é 510(k).', 'The box says FDA approved: check whether it is a 510(k).'));
    if (faceOn()) o.warns.push(L('Luz perto dos olhos: use os óculos da caixa, e procure o oftalmologista se tiver doença de retina ou tomar remédio que aumenta a sensibilidade à luz.', 'Light near the eyes: wear the goggles in the box, and see an eye doctor if you have retinal disease or take a medicine that raises sensitivity to light.'));
    if (u.k === 'miopia') o.warns.push(L('Uso em criança para miopia: só com oftalmologista, e o aparelho de laser pode passar do limite seguro em segundos.', 'Use in a child for myopia: only with an eye doctor, and the laser device can pass the safe limit in seconds.'));
    if (st.ret) o.warns.push(L('Pele tratada com ácido ou retinoide: os relatos de queimadura vêm dessa combinação.', 'Skin treated with acids or retinoids: the burn reports come from this combination.'));
    if (st.mel) o.warns.push(L('Pele com melasma: a luz visível pode escurecer manchas.', 'Skin with melasma: visible light can darken patches.'));
    var pr = num(st.price), se = num(st.sessions);
    o.per = pr > 0 && se >= 1 ? pr / se : null; o.pr = pr; o.se = se;
    return o;
  }
  function devName() {
    if (dev.example) return L('Exemplo: máscara de ensaio controlado, 10 mW/cm². Digite os números da sua caixa.', 'Example: mask from a controlled trial, 10 mW/cm². Type the numbers from your box.');
    var n = NAMES[dev.key];
    var nm = n ? L(n[0], n[1]) : (dev.key === 'custom' ? L('seu aparelho', 'your device') : (dev.name || L('seu aparelho', 'your device')));
    return nm + (n ? L(', escolhido na seção 07', ', picked in section 07') : '');
  }
  function paintLabel(o) {
    lt.textContent = L('Antes de comprar', 'Before you buy');
    ln.textContent = devName();
    var wl = null; WL.forEach(function (w) { if (w.k === dev.wl && w.k !== 'na') wl = L(w.pt, w.en); });
    spec.innerHTML = fieldHTML(L('comprimento de onda', 'wavelength'), wl) +
      fieldHTML(L('irradiância', 'irradiance'), o.irr ? trim1(o.irr) + ' mW/cm²' : null) +
      fieldHTML(L('medida a', 'measured at'), o.dist ? trim1(o.dist) + ' cm' : null) +
      fieldHTML(L('minutos por sessão', 'minutes per session'), o.min ? trim1(o.min) + ' min' : null);
    /* 1 · the rung */
    B.rung.h.textContent = L('1 · O degrau', '1 · The rung');
    var lad = '<ol class="l13-lad" aria-label="' + L('escada de evidência', 'evidence ladder') + '">';
    RUNGS.forEach(function (r, i) {
      lad += '<li class="' + (i === o.u.r ? 'l13-on' : '') + '"' + (i === o.u.r ? ' aria-current="true"' : '') + '><span class="l13-rk">' + (i === o.u.r ? '▶' : '') + '</span>' + L(r.pt, r.en) + '</li>';
    });
    lad += '</ol>';
    B.rung.c.innerHTML = lad + '<p class="l13-use"><b>' + L(o.u.pt, o.u.en) + '</b>: ' + L(RUNGS[o.u.r].dpt, RUNGS[o.u.r].den) + '.</p><p class="l13-num1">' + L(o.u.npt, o.u.nen) + '.</p>';
    /* 2 · the dose */
    B.dose.h.textContent = L('2 · A dose', '2 · The dose');
    var dh = '';
    if (!o.irr) dh = '<p class="l13-big l13-na">' + L('não informado', 'not stated') + '</p><p>' + L('Sem a irradiância, os minutos da caixa não viram dose.', 'Without the irradiance, the minutes on the box cannot be turned into a dose.') + '</p>';
    else {
      if (o.min) {
        var dz = o.irr * o.min * 0.06;
        dh += '<p class="l13-big">' + trim1(o.min) + ' min' + L(' a ', ' at ') + trim1(o.irr) + ' mW/cm² = <b>' + fdose(dz) + ' J/cm²</b></p>';
        if (dz > 50) dh += '<p>' + L('Passa dos 50 J/cm² a partir dos quais os estudos em células e animais mostram efeito menor ou piora.', 'Above the 50 J/cm² at which studies in cells and animals show a smaller effect or harm.') + '</p>';
      } else dh += '<p class="l13-big">' + L('minutos ', 'minutes ') + '<span class="l13-na">' + L('não informados', 'not stated') + '</span></p>';
      dh += '<div class="l13-times"><span>4 J/cm² <b>' + ftime(4 / o.irr / 0.06 * 60) + '</b></span><span>' + L('40,5', '40.5') + ' J/cm² <b>' + ftime(40.5 / o.irr / 0.06 * 60) + '</b></span></div>';
      dh += '<p class="l13-small">' + L('A mesma dose dada devagar e depressa pode ter efeitos diferentes (seção 04), e esta é a dose na superfície da pele.', 'The same dose given slowly or quickly can have different effects (section 04), and this is the dose at the skin surface.') + '</p>';
    }
    B.dose.c.innerHTML = dh;
    /* 3 · warnings */
    B.warn.h.textContent = L('3 · Os avisos', '3 · The warnings');
    B.warn.c.innerHTML = o.warns.length ? '<ul class="l13-wl">' + o.warns.map(function (w) { return '<li>' + w + '</li>'; }).join('') + '</ul>' : '<p>' + L('Nenhum aviso para as respostas acima.', 'No warnings for the answers above.') + '</p>';
    /* 4 · price */
    B.price.h.textContent = L('4 · O preço por sessão', '4 · The price per session');
    B.price.c.innerHTML = o.per != null
      ? '<p class="l13-big">' + money(o.pr) + ' / ' + fmt(Math.round(o.se)) + L(' sessões', ' sessions') + ' = <b>' + money(o.per) + '</b></p>'
      : '<p class="l13-big l13-na">' + L('não informado', 'not stated') + '</p><p class="l13-small">' + L('Digite o preço e quantas sessões você pretende fazer.', 'Type the price and how many sessions you plan to do.') + '</p>';
    foot.textContent = L('Resume os estudos citados neste ensaio e não substitui consulta médica.', 'Summarizes the studies cited in this essay and does not replace medical advice.');
    live.textContent = lt.textContent + '. ' + L(o.u.pt, o.u.en) + ': ' + L(RUNGS[o.u.r].pt, RUNGS[o.u.r].en) + '. ' + B.dose.c.textContent + ' ' + B.warn.c.textContent;
  }

  /* risograph frame: plum frame and section bars, ruby halftone band, grain and misregistration */
  var INKS = [
    { k: 'a', col: C.rubi, ang: 15, op: 0.95, mx: 1.2, my: -0.8, seed: [523, 191] },
    { k: 'b', col: C.infra, ang: 75, op: 0.92, mx: -0.8, my: 1.1, seed: [61, 977] }
  ];
  function drawBg() {
    var W = labW.clientWidth, H = labW.clientHeight;
    if (!W || !H) return;
    while (bg.firstChild) bg.removeChild(bg.firstChild);
    bg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); bg.setAttribute('width', W); bg.setAttribute('height', H);
    var R0 = labW.getBoundingClientRect();
    function top(el) { return el.getBoundingClientRect().top - R0.top; }
    function bot(el) { return el.getBoundingClientRect().bottom - R0.top; }
    var defs = S('defs', null, bg);
    INKS.forEach(function (ink) {
      var p = 'l13-' + ink.k;
      [0.5, 0.85].forEach(function (r, j) {
        var pt = S('pattern', { id: p + 'h' + (j + 1), width: 2.8, height: 2.8, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(' + ink.ang + ')' }, defs);
        S('circle', { cx: 1.4, cy: 1.4, r: r, fill: ink.col }, pt);
      });
      var f = S('filter', { id: p + 'g', x: '-2%', y: '-2%', width: '104%', height: '104%', 'color-interpolation-filters': 'sRGB' }, defs);
      S('feTurbulence', { type: 'fractalNoise', baseFrequency: 0.06, numOctaves: 2, seed: ink.seed[0], result: 'w' }, f);
      S('feDisplacementMap', { in: 'SourceGraphic', in2: 'w', scale: 1.8, xChannelSelector: 'R', yChannelSelector: 'G', result: 'd' }, f);
      S('feTurbulence', { type: 'fractalNoise', baseFrequency: 0.85, numOctaves: 2, seed: ink.seed[1], result: 'n' }, f);
      S('feColorMatrix', { in: 'n', type: 'matrix', values: '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -3.0 0 0 0 2.5', result: 'm' }, f);
      S('feComposite', { in: 'd', in2: 'm', operator: 'in' }, f);
    });
    var la = S('g', { class: 'l13-ink', transform: 'translate(' + INKS[0].mx + ' ' + INKS[0].my + ')', opacity: INKS[0].op, filter: 'url(#l13-ag)' }, bg);
    var lb = S('g', { class: 'l13-ink', transform: 'translate(' + INKS[1].mx + ' ' + INKS[1].my + ')', opacity: INKS[1].op, filter: 'url(#l13-bg)' }, bg);
    S('rect', { x: 2, y: 2, width: W - 4, height: H - 4, fill: 'none', stroke: C.infra, 'stroke-width': 3 }, lb);
    var hb = bot(head);
    S('rect', { x: 2, y: 2, width: W - 4, height: hb + 6, fill: 'url(#l13-ah1)' }, la);
    S('rect', { x: 2, y: hb + 8, width: W - 4, height: 7, fill: C.infra }, lb);
    var sb = bot(spec);
    S('rect', { x: 2, y: sb + 8, width: W - 4, height: 3, fill: C.rubi }, la);
    ['dose', 'warn', 'price'].forEach(function (k) {
      var y = top(B[k].el) + 6;
      S('rect', { x: 2, y: y, width: W - 4, height: 4, fill: C.infra }, lb);
    });
    var fy = top(foot) - 8;
    S('rect', { x: 2, y: fy, width: W - 4, height: 1.5, fill: C.infra }, lb);
    /* ruby ladder marker behind the current rung */
    var on = B.rung.c.querySelector('.l13-on');
    if (on) {
      var r = on.getBoundingClientRect(), rr = labW.getBoundingClientRect();
      S('rect', { x: r.left - rr.left - 4, y: r.top - rr.top - 1, width: Math.min(r.width + 8, W - (r.left - rr.left)), height: r.height + 2, fill: 'url(#l13-ah2)' }, la);
    }
  }

  /* ---------- update ---------- */
  function setForm() {
    Q[1].lab.innerHTML = '<span class="l13-qn">1</span>' + L('Para que você quer', 'What you want it for');
    Q[2].lab.innerHTML = '<span class="l13-qn">2</span>' + L('Comprimento de onda da caixa', 'Wavelength on the box');
    Q[3].lab.innerHTML = '<span class="l13-qn">3</span>' + L('Irradiância e distância da medida', 'Irradiance and the distance it was measured at');
    Q[4].lab.innerHTML = '<span class="l13-qn">4</span>' + L('Minutos por sessão que o fabricante manda', 'Minutes per session the maker recommends');
    Q[5].lab.innerHTML = '<span class="l13-qn">5</span>' + L('O selo da caixa', 'The seal on the box');
    Q[6].lab.innerHTML = '<span class="l13-qn">6</span>' + L('O seu caso', 'Your situation');
    Q[7].lab.innerHTML = '<span class="l13-qn">7</span>' + L('Preço e número de sessões', 'Price and number of sessions');
    var cur = st.use;
    selUse.innerHTML = '';
    RUNGS.forEach(function (r, ri) {
      var og = E('optgroup', { label: L(r.pt, r.en) }, selUse);
      USES.forEach(function (u) { if (u.r === ri) { var op = E('option', { value: u.k }, og); op.textContent = L(u.pt, u.en); } });
    });
    selUse.value = cur;
    WL.forEach(function (w, i) { WB[i].textContent = L(w.pt, w.en); WB[i].setAttribute('aria-pressed', dev.wl === w.k ? 'true' : 'false'); });
    SEALS.forEach(function (s, i) { SB[i].textContent = L(s.pt, s.en); SB[i].setAttribute('aria-pressed', st.seal === s.k ? 'true' : 'false'); });
    CASES.forEach(function (c, i) { CB[i].textContent = L(c.pt, c.en); CB[i].setAttribute('aria-pressed', (c.k === 'face' ? faceOn() : st[c.k]) ? 'true' : 'false'); });
    NI.irr.sp.textContent = L('irradiância', 'irradiance'); NI.irr.u.textContent = 'mW/cm²';
    NI.dist.sp.textContent = L('medida a', 'measured at'); NI.dist.u.textContent = 'cm';
    NI.min.sp.textContent = L('minutos', 'minutes'); NI.min.u.textContent = 'min';
    NI.price.sp.textContent = L('preço, R$', 'price, US$'); NI.price.u.textContent = '';
    NI.sessions.sp.textContent = L('sessões', 'sessions'); NI.sessions.u.textContent = '';
    ['irr', 'dist', 'min', 'price', 'sessions'].forEach(function (k) { NI[k].i.placeholder = L('não informado', 'not stated'); });
    fromNote.textContent = dev.example ? L('Sem número digitado na seção 07, a ficha começa com a máscara do ensaio controlado.', 'With no number typed in section 07, the label starts with the mask from the controlled trial.')
      : L('Os números vêm da seção 07 e mudam lá também.', 'The numbers come from section 07 and change there too.');
    png.textContent = L('baixar a etiqueta em PNG', 'download the label as PNG');
    take.textContent = L('Se o uso que você quer está nos degraus de baixo da escada, nenhum aparelho resolve. Se está nos de cima, procure a irradiância na caixa e os minutos que ela precisa para chegar à dose dos estudos, e trate a falta desse número como um sinal de que a dose é desconhecida.',
      'If the use you want sits on the lower rungs of the ladder, no device will fix it. If it sits on the upper ones, look for the irradiance on the box and the minutes it needs to reach the dose of the studies, and treat a missing number as a sign that the dose is unknown.');
  }
  function persist() {
    DN.store.set('etiqueta', { use: st.use, seal: st.seal, face: st.face, ret: st.ret, mel: st.mel, price: st.price, sessions: st.sessions, wl: dev.wl });
  }
  function changed(block, quiet) {
    setForm();
    paintLabel(model());
    drawBg();
    if (!quiet) persist();
    var blocks = block === 'spec' ? [spec] : block === 'dose' ? [spec, B.dose.el] : B[block] ? [B[block].el] : [];
    if (block === 'warn' || block === 'rung' || block === 'dose') blocks.push(B.warn.el);
    if (!DN.RM) blocks.forEach(function (el) {
      el.classList.remove('l13-print'); void el.offsetWidth; el.classList.add('l13-print');
    });
  }

  /* ---------- PNG export: two inks, portrait ---------- */
  function exportPng() {
    var o = model(), Wc = 1080, pad = 64, cw = Wc - pad * 2;
    var cv = document.createElement('canvas'), ctx = cv.getContext('2d');
    var font = '"Space Mono", ui-monospace, Menlo, monospace';
    var ops = [], y = pad;
    function wrapT(t, size, bold, maxW) {
      ctx.font = (bold ? '700 ' : '400 ') + size + 'px ' + font;
      var out = [], line = '';
      String(t).split(' ').forEach(function (w) { var tt = line ? line + ' ' + w : w; if (ctx.measureText(tt).width > maxW && line) { out.push(line); line = w; } else line = tt; });
      if (line) out.push(line); return out;
    }
    function text(t, size, col, bold, gap) {
      wrapT(t, size, bold, cw).forEach(function (ln) { y += size * 1.35; ops.push(['t', ln, pad, y, size, col, bold]); });
      y += gap || 0;
    }
    function bar(h, col) { ops.push(['r', pad - 24, y, cw + 48, h, col]); y += h + 22; }
    var P = C.infra, R = C.rubi;
    y += 10; text(lt.textContent.toUpperCase(), 46, P, true, 6); text(ln.textContent, 24, P, false, 16); bar(14, P);
    spec.querySelectorAll('.l13-f').forEach(function (f) {
      ops.push(['t', f.children[0].textContent, pad, y + 30, 24, P, false]);
      ops.push(['tr', f.children[1].textContent, pad + cw, y + 30, 26, P, true]);
      y += 46;
    });
    y += 8; bar(5, R);
    [['rung', o], ['dose'], ['warn'], ['price']].forEach(function (b, i) {
      if (i) bar(8, P);
      text(B[b[0]].h.textContent.toUpperCase(), 24, R, true, 6);
      if (b[0] === 'rung') {
        RUNGS.forEach(function (r, ri) { text((ri === o.u.r ? '▶ ' : '   ') + L(r.pt, r.en), 24, ri === o.u.r ? R : P, ri === o.u.r, 0); });
        y += 10;
        B.rung.c.querySelectorAll('p').forEach(function (p) { text(p.textContent, 24, P, false, 6); });
      } else {
        B[b[0]].c.querySelectorAll('p, li, .l13-times span').forEach(function (p) { text((p.tagName === 'LI' ? '• ' : '') + p.textContent, p.classList.contains('l13-big') ? 30 : 23, P, p.classList.contains('l13-big'), 8); });
      }
      y += 6;
    });
    bar(3, P);
    text(foot.textContent, 20, P, false, 0);
    y += pad;
    var dpr = 1;
    cv.width = Wc * dpr; cv.height = Math.ceil(y) * dpr;
    ctx.fillStyle = '#fffdf9'; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.globalCompositeOperation = 'multiply';
    ctx.strokeStyle = P; ctx.lineWidth = 6; ctx.strokeRect(pad - 34, pad - 30, cw + 68, y - 2 * pad + 50);
    ops.forEach(function (op) {
      if (op[0] === 'r') { ctx.fillStyle = op[5]; ctx.fillRect(op[1] + (op[5] === R ? 3 : 0), op[2] + (op[5] === R ? -2 : 0), op[3], op[4]); }
      else { ctx.font = (op[6] ? '700 ' : '400 ') + op[4] + 'px ' + font; ctx.fillStyle = op[5]; ctx.textAlign = op[0] === 'tr' ? 'right' : 'left'; ctx.fillText(op[1], op[2], op[3]); }
    });
    /* grain: tiny paper specks */
    ctx.globalCompositeOperation = 'source-over';
    var rs = 7; function rnd() { rs = (rs * 1664525 + 1013904223) >>> 0; return rs / 4294967296; }
    ctx.fillStyle = 'rgba(255,253,249,.55)';
    for (var i = 0; i < 9000; i++) ctx.fillRect(rnd() * cv.width, rnd() * cv.height, 1.4, 1.4);
    var a = document.createElement('a');
    a.download = L('etiqueta-luz-vermelha.png', 'red-light-label.png');
    try { a.href = cv.toDataURL('image/png'); } catch (e) { return; }
    document.body.appendChild(a); a.click(); a.remove();
    live.textContent = L('A etiqueta foi salva em PNG.', 'The label was saved as a PNG.');
  }

  function render() { setForm(); syncInputs(); paintLabel(model()); drawBg(); }
  render();
  DN.onLang(render);
  if (window.ResizeObserver) { var lw = 0, lh = 0; new ResizeObserver(function () { if (labW.clientWidth !== lw || labW.clientHeight !== lh) { lw = labW.clientWidth; lh = labW.clientHeight; drawBg(); } }).observe(labW); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(drawBg);
})();
