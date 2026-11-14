/* l05 · a-escada : the reader places six uses of red light on a five-rung evidence ladder,
   then every card slides to its real rung and the other uses fill in.
   Also defines DN.lvIcons, the two-ink risograph icons reused by l07. */
(function () {
  'use strict';

  /* ================= risograph icons (technique from dopamina w00 and DN.cortRiso) =================
     One SVG layer per ink (rubi light, ameixa dark), halftone screens at riso angles,
     a grain filter that eats the ink, 1 to 2 px of misregistration, multiply overlap.
     Art in a 64 x 64 box. Tokens: $0 solid ink, $1 $2 $3 light, mid, dark halftone. */
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
  var IC = DN.COL;
  function iconDefs(p) {
    var s = '';
    [['a', IC.rubi, 15], ['b', IC.infra, 75]].forEach(function (st, si) {
      [0.62, 0.92, 1.2].forEach(function (r, j) {
        s += '<pattern id="' + p + st[0] + 'h' + (j + 1) + '" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(' + st[2] + ')">' +
          '<circle cx="1.3" cy="1.3" r="' + r + '" fill="' + st[1] + '"/></pattern>';
      });
      s += '<filter id="' + p + st[0] + 'g" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="' + (41 + si * 211) + '" result="w"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="w" scale="1.6" xChannelSelector="R" yChannelSelector="G" result="d"/>' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="' + (97 + si * 157) + '" result="n"/>' +
        '<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2.6 0 0 0 2.4" result="m"/>' +
        '<feComposite in="d" in2="m" operator="in"/></filter>';
    });
    return '<svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;overflow:hidden"><defs>' + s + '</defs></svg>';
  }
  var ART = {
    /* lips seen from the front */
    boca: {
      a: '<path d="M8,32 C16,20 26,20 32,26 C38,20 48,20 56,32 C46,34 18,34 8,32Z" fill="$0"/>' +
        '<path d="M8,32 C16,47 48,47 56,32 C46,37 18,37 8,32Z" fill="$0"/>',
      b: '<path d="M8,32 C20,37 44,37 56,32" stroke="$0" stroke-width="2.8" fill="none" stroke-linecap="round"/>' +
        '<path d="M16,46 C26,53 38,53 48,46" stroke="$2" stroke-width="5" fill="none" stroke-linecap="round"/>' +
        '<circle cx="40" cy="40" r="2.6" fill="$0"/><circle cx="24" cy="28" r="2" fill="$0"/>'
    },
    /* hairs growing out of the scalp, with the follicle under the skin */
    cabelo: {
      a: '<path d="M32,44 C29,32 37,22 30,8" stroke="$0" stroke-width="3.4" fill="none" stroke-linecap="round"/>' +
        '<path d="M20,44 C18,34 23,26 16,15" stroke="$0" stroke-width="2.8" fill="none" stroke-linecap="round"/>' +
        '<path d="M44,44 C46,34 41,27 48,17" stroke="$0" stroke-width="2.8" fill="none" stroke-linecap="round"/>',
      b: '<path d="M6,44 H58 V58 H6Z" fill="$2"/><path d="M6,44 H58" stroke="$0" stroke-width="3"/>' +
        '<ellipse cx="32" cy="52" rx="4" ry="5" fill="$0"/><ellipse cx="20" cy="51" rx="3" ry="4" fill="$0"/><ellipse cx="44" cy="51" rx="3" ry="4" fill="$0"/>'
    },
    /* a bent leg in profile with the kneecap */
    joelho: {
      a: '<circle cx="37" cy="30" r="12" fill="$1"/><ellipse cx="39" cy="29" rx="5" ry="6" fill="$0"/>',
      b: '<path d="M8,12 L35,30 L27,58" stroke="$0" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    },
    /* an eye */
    olho: {
      a: '<circle cx="32" cy="32" r="11" fill="$0"/>',
      b: '<path d="M5,32 C17,15 47,15 59,32 C47,49 17,49 5,32Z" fill="none" stroke="$0" stroke-width="3"/>' +
        '<circle cx="32" cy="32" r="4.5" fill="$0"/><circle cx="32" cy="32" r="11" fill="$1"/>'
    },
    /* a tape measure */
    fita: {
      a: '<path d="M30,29 H59 V41 H30Z" fill="$0"/>',
      b: '<rect x="5" y="14" width="28" height="28" rx="7" fill="$2"/><rect x="5" y="14" width="28" height="28" rx="7" fill="none" stroke="$0" stroke-width="3"/>' +
        '<circle cx="19" cy="28" r="5" fill="$0"/>' +
        '<path d="M37,29 v5 M43,29 v8 M49,29 v5 M55,29 v8" stroke="$0" stroke-width="2"/>'
    },
    /* a head in profile and its neck */
    pescoco: {
      a: '<path d="M23,38 H39 V58 H22Z" fill="$0"/>',
      b: '<path d="M27,7 C41,5 49,15 47,25 L52,32 L46,34 C47,40 43,42 39,41 L39,58 H22 L23,40 C15,36 13,27 15,19 C17,11 21,8 27,7Z" fill="$1"/>' +
        '<path d="M27,7 C41,5 49,15 47,25 L52,32 L46,34 C47,40 43,42 39,41 L39,58 M22,58 L23,40 C15,36 13,27 15,19 C17,11 21,8 27,7Z" fill="none" stroke="$0" stroke-width="2.6" stroke-linejoin="round"/>'
    },
    /* a drop of skin oil, for skin uses */
    gota: {
      a: '<path d="M32,7 C41,22 49,30 49,40 A17,17 0 0 1 15,40 C15,30 23,22 32,7Z" fill="$0"/>',
      b: '<path d="M24,40 A8,8 0 0 0 32,48" stroke="$0" stroke-width="3" fill="none" stroke-linecap="round"/>' +
        '<path d="M6,58 H58" stroke="$0" stroke-width="2.6" stroke-linecap="round"/><path d="M10,61 H54" stroke="$2" stroke-width="3"/>'
    },
    /* a dumbbell */
    haltere: {
      a: '<rect x="7" y="18" width="9" height="28" rx="2" fill="$0"/><rect x="48" y="18" width="9" height="28" rx="2" fill="$0"/>',
      b: '<path d="M14,32 H50" stroke="$0" stroke-width="4.5" stroke-linecap="round"/>' +
        '<rect x="16" y="23" width="6" height="18" rx="1.5" fill="$0"/><rect x="42" y="23" width="6" height="18" rx="1.5" fill="$0"/>'
    },
    /* a brain seen from the side */
    cerebro: {
      a: '<path d="M20,47 C10,47 7,37 11,31 C7,22 15,14 23,16 C25,9 39,9 41,15 C49,12 57,20 53,28 C59,35 55,47 45,47Z" fill="$1"/>' +
        '<path d="M40,47 C42,52 46,55 50,56" stroke="$0" stroke-width="4" fill="none" stroke-linecap="round"/>',
      b: '<path d="M20,47 C10,47 7,37 11,31 C7,22 15,14 23,16 C25,9 39,9 41,15 C49,12 57,20 53,28 C59,35 55,47 45,47Z" fill="none" stroke="$0" stroke-width="2.8" stroke-linejoin="round"/>' +
        '<path d="M32,13 C29,22 35,28 31,36 M20,24 c5,2 7,7 4,12 M44,22 c-4,3 -5,8 -2,12 M24,42 c4,-3 10,-3 14,0" stroke="$0" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
    },
    /* crescent moon and two stars */
    lua: {
      a: '<path d="M46,14 l1.3,3.2 3.2,1.3 -3.2,1.3 -1.3,3.2 -1.3,-3.2 -3.2,-1.3 3.2,-1.3Z M52,38 l1,2.2 2.2,1 -2.2,1 -1,2.2 -1,-2.2 -2.2,-1 2.2,-1Z" fill="$0"/>',
      b: '<path d="M34,10 A22,22 0 1 0 50,48 A17,17 0 1 1 34,10Z" fill="$0"/>'
    },
    /* an hourglass */
    ampulheta: {
      a: '<path d="M24,15 H40 C38,23 34,27 32,29 C30,27 26,23 24,15Z" fill="$0"/><path d="M22,53 C25,45 30,42 32,40 C34,42 39,45 42,53Z" fill="$0"/>',
      b: '<path d="M16,8 H48 M16,56 H48" stroke="$0" stroke-width="3.6" stroke-linecap="round"/>' +
        '<path d="M20,10 C20,24 30,28 30,32 C30,36 20,40 20,54 H44 C44,40 34,36 34,32 C34,28 44,24 44,10Z" fill="none" stroke="$0" stroke-width="2.4" stroke-linejoin="round"/>'
    },
    /* a laboratory flask */
    frasco: {
      a: '<path d="M19,42 H45 L51,53 C53,57 51,59 47,59 H17 C13,59 11,57 13,53Z" fill="$0"/>',
      b: '<path d="M25,7 H39" stroke="$0" stroke-width="3" stroke-linecap="round"/>' +
        '<path d="M28,8 V24 L13,53 C11,57 13,59 17,59 H47 C51,59 53,57 51,53 L36,24 V8" fill="none" stroke="$0" stroke-width="2.8" stroke-linejoin="round"/>' +
        '<circle cx="30" cy="49" r="2.4" fill="$0"/><circle cx="38" cy="53" r="1.8" fill="$0"/><circle cx="32" cy="34" r="1.6" fill="$0"/>'
    },
    /* a footprint */
    pe: {
      a: '<circle cx="40" cy="9" r="4.4" fill="$0"/><circle cx="48" cy="14" r="3.3" fill="$0"/><circle cx="52" cy="21" r="2.7" fill="$0"/><circle cx="53" cy="28" r="2.3" fill="$0"/>',
      b: '<path d="M26,59 C16,59 16,47 18,38 C20,28 20,19 28,15 C36,11 46,17 47,27 C48,35 42,40 42,48 C42,56 36,59 26,59Z" fill="$2"/>' +
        '<path d="M26,59 C16,59 16,47 18,38 C20,28 20,19 28,15 C36,11 46,17 47,27 C48,35 42,40 42,48 C42,56 36,59 26,59Z" fill="none" stroke="$0" stroke-width="2.6"/>'
    }
  };
  var KEYS = Object.keys(ART);
  /* stamp(key, prefix): markup of one icon; the prefix names the defs rendered by iconDefs */
  function stamp(key, p, cls) {
    var art = ART[key]; if (!art) return '';
    var R = rng(KEYS.indexOf(key) * 131 + 23);
    var layers = '';
    [['a', IC.rubi, 0.95], ['b', IC.infra, 0.92]].forEach(function (ink, li) {
      var mx = f1((R() < 0.5 ? -1 : 1) * (0.6 + R() * (li ? 1.3 : 0.6)));
      var my = f1((R() < 0.5 ? -1 : 1) * (0.5 + R() * (li ? 1.1 : 0.5)));
      var body = art[ink[0]].replace(/\$0/g, ink[1]).replace(/\$([123])/g, 'url(#' + p + ink[0] + 'h$1)');
      layers += '<g class="lvi-ink lvi-' + ink[0] + '" transform="translate(' + mx + ' ' + my + ')" opacity="' + ink[2] + '" filter="url(#' + p + ink[0] + 'g)">' + body + '</g>';
    });
    return '<svg class="' + (cls || 'lvi') + '" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' + layers + '</svg>';
  }
  DN.lvIcons = { defs: iconDefs, stamp: stamp, keys: KEYS };

  /* ================= the ladder ================= */
  var root = DN.body('l05'); if (!root) return;
  var L = DN.L, E = DN.el;
  var P = 'l05i-';

  var RUNGS = [
    { pt: 'diretriz recomenda', en: 'a guideline recommends',
      dpt: 'uma sociedade médica recomenda com protocolo definido', den: 'a medical society recommends it with a set protocol' },
    { pt: 'efeito moderado', en: 'moderate effect',
      dpt: 'efeito consistente contra luz falsa, com estudos pequenos ou ligados a quem vende', den: 'a consistent effect against sham light, in small studies or studies tied to sellers' },
    { pt: 'sinal fraco', en: 'weak signal',
      dpt: 'poucos estudos pequenos, positivos e frágeis', den: 'a few small studies, positive and fragile' },
    { pt: 'estudos sem efeito', en: 'studies found no effect',
      dpt: 'ensaios ou meta-análises que não acharam diferença', den: 'trials or meta-analyses that found no difference' },
    { pt: 'nenhum estudo em pessoas', en: 'no studies in people',
      dpt: 'só células, animais ou anúncio', den: 'only cells, animals or advertising' }
  ];
  var SET = {
    hosp: ['testado em hospital ou consultório', 'tested in a hospital or clinic'],
    casa: ['testado com aparelho de casa', 'tested with a home device']
  };
  /* g: one of the six guess cards. set: only where the dossier says where the light was given.
     sec: the rung rests on a secondary source ([S] in the dossier), drawn with a dashed edge. */
  var ITEMS = [
    { id: 'muc', r: 0, g: 1, ic: 'boca', set: 'hosp',
      n: ['Feridas na boca no tratamento de câncer', 'Mouth sores during cancer treatment'],
      s: ['prevenção da mucosite oral no transplante de medula e na radioterapia de cabeça e pescoço', 'preventing oral mucositis in bone marrow transplant and head and neck radiotherapy'],
      v: ['risco de mucosite grave 0,37 vez o do controle, 18 ensaios, 1.144 pacientes', 'risk of severe mucositis 0.37 times that of controls, 18 trials, 1,144 patients'],
      src: 'Oberoi 2014; MASCC/ISOO 2019' },
    { id: 'cal', r: 1, g: 1, ic: 'cabelo', set: 'casa',
      n: ['Calvície', 'Hair loss'],
      s: ['calvície de padrão masculino e feminino', 'male and female pattern hair loss'],
      v: ['diferença padronizada de 1,27 na densidade de fios, 7 ensaios contra luz falsa', 'standardized difference of 1.27 in hair density, 7 trials against sham light'],
      src: 'Lueangarun 2021' },
    { id: 'pes', r: 1, ic: 'pescoco',
      n: ['Dor no pescoço', 'Neck pain'],
      v: ['19,9 mm a menos numa escala de 0 a 100, 16 ensaios', '19.9 mm less on a 0 to 100 scale, 16 trials'],
      src: 'Chow 2009' },
    { id: 'joe', r: 1, g: 1, ic: 'joelho',
      n: ['Dor no joelho', 'Knee pain'],
      s: ['artrose de joelho', 'knee osteoarthritis'],
      v: ['14,2 mm a menos numa escala de 0 a 100, 22 ensaios', '14.2 mm less on a 0 to 100 scale, 22 trials'],
      flag: ['diretriz britânica diz para não oferecer', 'British guideline says do not offer it'], flagSec: 1,
      src: 'Stausholm 2019; NICE 2022' },
    { id: 'mio', r: 1, ic: 'olho',
      n: ['Miopia em crianças', 'Myopia in children'],
      v: ['o olho cresceu 0,26 mm a menos em um ano, 264 crianças', 'the eye grew 0.26 mm less in a year, 264 children'],
      flag: ['segurança não resolvida, ver seção 09', 'safety unresolved, see section 09'],
      src: 'Jiang 2022' },
    { id: 'dmr', r: 1, ic: 'olho',
      n: ['Degeneração macular seca', 'Dry macular degeneration'],
      v: ['3,8 letras a mais que a luz falsa aos 21 meses, um ensaio', '3.8 more letters than sham light at 21 months, one trial'],
      src: 'FDA, De Novo, 2024' },
    { id: 'ten', r: 2, ic: 'pe',
      n: ['Tendão e fascite plantar', 'Tendons and plantar fasciitis'],
      v: ['13,2 mm a menos numa escala de 0 a 100', '13.2 mm less on a 0 to 100 scale'],
      src: 'Naterstad 2022' },
    { id: 'rug', r: 2, g: 1, ic: 'gota',
      n: ['Rugas', 'Wrinkles'],
      v: ['um ensaio de 136 pessoas, sem luz falsa', 'one trial of 136 people, without sham light'],
      src: 'Wunsch 2014' },
    { id: 'acn', r: 2, ic: 'gota',
      n: ['Acne', 'Acne'],
      v: ['71 ensaios, mediana de 31 pessoas por ensaio', '71 trials, a median of 31 people per trial'],
      src: 'Cochrane 2016' },
    { id: 'pdi', r: 2, ic: 'pe',
      n: ['Úlcera de pé diabético', 'Diabetic foot ulcer'],
      v: ['7 ensaios, 194 pessoas', '7 trials, 194 people'],
      src: 'Li 2018' },
    { id: 'mus', r: 2, ic: 'haltere',
      n: ['Músculo e exercício', 'Muscle and exercise'],
      v: ['diferença padronizada de 0,27 em resistência e zero em corrida e natação', 'standardized difference of 0.27 in endurance and zero in running and swimming'],
      src: 'Dutra 2022' },
    { id: 'ema', r: 2, g: 1, ic: 'fita',
      n: ['Emagrecer', 'Weight loss'],
      s: ['gordura localizada', 'localized fat'],
      v: ['cerca de 1,8 cm a menos por local, recuperados em parte em duas semanas', 'about 1.8 cm less per site, partly regained within two weeks'],
      src: 'Jackson 2009' },
    { id: 'mem', r: 2, ic: 'cerebro', set: 'casa',
      n: ['Memória e demência', 'Memory and dementia'],
      v: ['um ensaio de 26 pessoas', 'one trial of 26 people'],
      src: 'Chun 2025' },
    { id: 'dep', r: 2, ic: 'cerebro',
      n: ['Depressão', 'Depression'],
      v: ['18 estudos pequenos', '18 small studies'],
      src: 'Seok 2026' },
    { id: 'son', r: 2, ic: 'lua',
      n: ['Sono', 'Sleep'],
      v: ['20 atletas, sem luz falsa', '20 athletes, without sham light'],
      src: 'Zhao 2012' },
    { id: 'tir', r: 2, ic: 'pescoco',
      n: ['Tireoide de Hashimoto', 'Hashimoto thyroiditis'],
      v: ['um ensaio de 43 pessoas na USP, sem repetição', 'one trial of 43 people at USP, never repeated'],
      src: 'Höfling 2013' },
    { id: 'ulv', r: 3, ic: 'pe',
      n: ['Úlcera venosa', 'Venous leg ulcer'],
      v: ['sem diferença na área da ferida, 4 ensaios', 'no difference in wound area, 4 trials'],
      src: 'Rasul 2026' },
    { id: 'acu', r: 3, ic: 'joelho',
      n: ['Laser em pontos de acupuntura para artrose', 'Laser on acupuncture points for osteoarthritis'],
      v: ['sem efeito na dor, 13 ensaios', 'no effect on pain, 13 trials'],
      src: '2026' },
    { id: 'tes', r: 4, g: 1, ic: 'frasco', sec: 1,
      n: ['Testosterona', 'Testosterone'],
      s: ['luz vermelha nos testículos', 'red light on the testicles'],
      v: ['nenhum ensaio em pessoas; o que se cita são estudos em ratos', 'no trial in people; what gets cited are studies in rats'],
      src: '' },
    { id: 'lon', r: 4, ic: 'ampulheta', sec: 1,
      n: ['Longevidade e saúde mitocondrial', 'Longevity and mitochondrial health'],
      v: ['nenhum ensaio com desfecho de envelhecimento', 'no trial with an ageing outcome'],
      src: '' },
    { id: 'cel', r: 4, ic: 'fita', sec: 1,
      n: ['Celulite, sem massagem junto', 'Cellulite, without massage'],
      v: ['os estudos juntam a luz com massagem ou sucção, e a luz sozinha não foi testada', 'the studies combine light with massage or suction, and light alone was not tested'],
      src: '' }
  ];
  ITEMS.forEach(function (it) { if (it.sec) it.src = ''; });
  var BY = {}; ITEMS.forEach(function (it) { BY[it.id] = it; });
  var GUESS = ITEMS.filter(function (it) { return it.g; }).map(function (it) { return it.id; });

  var st = { place: {}, revealed: false, sel: null, order: [] };
  GUESS.forEach(function (id) { st.place[id] = null; });
  var timers = [], busy = false;
  var R = {};

  function nm(it) { return L(it.n[0], it.n[1]); }
  function rl(r) { return L(RUNGS[r].pt, RUNGS[r].en); }
  function placedCount() { return GUESS.filter(function (id) { return st.place[id] != null; }).length; }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; busy = false; }

  /* ---------- markup ---------- */
  function chipHTML(it) {
    return stamp(it.ic, P, 'lvi l05-ic') + '<span class="l05-cn">' + nm(it) + '</span>';
  }
  function detailHTML(it) {
    var h = '';
    if (it.s) h += '<span class="l05-sub">' + L(it.s[0], it.s[1]) + '</span>';
    h += '<span class="l05-num">' + L(it.v[0], it.v[1]) + '</span>';
    var badges = '';
    if (it.set) badges += '<span class="l05-b">' + L(SET[it.set][0], SET[it.set][1]) + '</span>';
    if (it.flag) badges += '<span class="l05-b l05-flag' + (it.flagSec ? ' l05-dash' : '') + '">' + L(it.flag[0], it.flag[1]) + '</span>';
    if (badges) h += '<span class="l05-bs">' + badges + '</span>';
    if (it.src) h += '<span class="l05-src">' + it.src + '</span>';
    else if (it.sec) h += '<span class="l05-src">' + L('fonte secundária no dossiê', 'secondary source in the dossier') + '</span>';
    return h;
  }
  function resultHTML(id) {
    var it = BY[id], g = st.place[id];
    if (g == null && !placedCount()) return '';
    if (g == null) return '<span class="l05-res l05-res-none">' + L('você não colocou esta ficha', 'you did not place this card') + '</span>';
    if (g === it.r) return '<span class="l05-res l05-res-ok"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2,6.5 L5,9.2 L10,3" fill="none" stroke="currentColor" stroke-width="2"/></svg>' + L('você acertou o degrau', 'you got the rung right') + '</span>';
    var d = Math.abs(g - it.r), up = g < it.r;
    var off = L(d + (d > 1 ? ' degraus ' : ' degrau ') + (up ? 'acima' : 'abaixo') + ' do real', d + (d > 1 ? ' rungs ' : ' rung ') + (up ? 'too high' : 'too low'));
    return '<span class="l05-res">' + L('você pôs em: ', 'you put it on: ') + '<b>' + rl(g) + '</b><span class="l05-off">' + off + '</span></span>';
  }

  function makeCard(it, full) {
    var guess = !!it.g;
    var c = E(guess && !full ? 'button' : 'div', { class: 'l05-card' + (guess ? ' l05-g' : '') + (it.sec ? ' l05-dash' : '') + (full ? ' l05-full' : ''), 'data-id': it.id });
    if (c.tagName === 'BUTTON') {
      c.type = 'button';
      c.setAttribute('aria-pressed', 'false');
    }
    c.innerHTML = '<span class="l05-top">' + chipHTML(it) + '</span>' +
      (full ? '<span class="l05-det">' + detailHTML(it) + (guess ? resultHTML(it.id) : '') + '</span>' : '');
    return c;
  }
  function chipLabel(id) {
    var g = st.place[id];
    return nm(BY[id]) + '. ' + (g == null ? L('Na bandeja. Toque para escolher um degrau.', 'In the tray. Press to choose a rung.') :
      L('No degrau ', 'On the rung ') + rl(g) + L('. Toque para mudar.', '. Press to change it.'));
  }

  /* ---------- render from state (no animation) ---------- */
  function render() {
    clearTimers();
    root.innerHTML = '';
    var wrap = E('div', { class: 'l05-wrap' + (st.revealed ? ' l05-done' : '') }, root);
    E('div', { class: 'l05-defs' }, wrap, iconDefs(P));
    R.read = E('p', { class: 'l05-read' }, wrap, L(
      'O único uso com diretriz é de hospital, com laser e protocolo exato. As promessas mais comuns dos anúncios, como rugas, emagrecimento e testosterona, ficam nos degraus de baixo.',
      'The only use with a guideline is a hospital one, with a laser and an exact protocol. The most common promises in ads, such as wrinkles, weight loss and testosterone, sit on the bottom rungs.'));
    R.read.hidden = !st.revealed;

    /* the tray: guess cards still to place, the rung chooser, the buttons */
    R.tray = E('div', { class: 'l05-tray' }, wrap);
    R.score = E('p', { class: 'l05-score' }, R.tray);
    R.trayHint = E('p', { class: 'l05-hint' }, R.tray);
    R.chips = E('div', { class: 'l05-chips', role: 'group', 'aria-label': L('Fichas para colocar', 'Cards to place') }, R.tray);
    R.chooser = E('div', { class: 'l05-chooser', role: 'group' }, R.tray);
    R.chooser.hidden = true;
    var act = E('div', { class: 'l05-act' }, R.tray);
    R.check = E('button', { class: 'btn solid l05-check', type: 'button' }, act, L('conferir', 'check'));
    R.all = E('button', { class: 'btn l05-allb', type: 'button' }, act, L('ver a escada pronta', 'see the finished ladder'));
    R.again = E('button', { class: 'btn l05-again', type: 'button' }, act, L('recomeçar', 'start over'));
    R.check.addEventListener('click', function () { reveal(false); });
    R.all.addEventListener('click', function () { reveal(true); });
    R.again.addEventListener('click', reset);

    /* the ladder */
    R.ladder = E('ol', { class: 'l05-ladder', 'aria-label': L('Escada da evidência, do degrau mais firme ao mais fraco', 'Evidence ladder, from the firmest rung to the weakest') }, wrap);
    R.rungs = []; R.guessBox = []; R.items = [];
    RUNGS.forEach(function (rg, r) {
      var li = E('li', { class: 'l05-rung', 'data-r': r }, R.ladder);
      E('div', { class: 'l05-rail', 'aria-hidden': 'true' }, li);
      var head = E('div', { class: 'l05-rhead' }, li);
      E('b', { class: 'l05-rl' }, head, L(rg.pt, rg.en));
      E('span', { class: 'l05-rd' }, head, L(rg.dpt, rg.den));
      var zone = E('div', { class: 'l05-zone' }, li);
      var gb = E('div', { class: 'l05-gbox' }, zone);
      E('span', { class: 'l05-drop', 'aria-hidden': 'true' }, gb, L('solte uma ficha aqui', 'drop a card here'));
      var items = E('div', { class: 'l05-items' }, zone);
      ITEMS.filter(function (it) { return it.r === r; }).forEach(function (it) {
        if (it.g) { E('span', { class: 'l05-slot', 'data-slot': it.id }, items); return; }
        var c = makeCard(it, true);
        c.classList.add('l05-extra');
        c.hidden = !st.revealed;
        items.appendChild(c);
      });
      li.addEventListener('click', function (e) {
        if (st.revealed || !st.sel) return;
        if (e.target.closest('.l05-card')) return;
        place(st.sel, r, true);
      });
      R.rungs.push(li); R.guessBox.push(gb); R.items.push(items);
    });

    E('p', { class: 'l05-legend' }, wrap, L(
      'Contorno tracejado: o degrau ou o selo vem de fonte secundária no dossiê.',
      'Dashed edge: the rung or the badge comes from a secondary source in the dossier.'));

    /* equivalent table */
    var det = E('details', { class: 'more l05-tab' }, wrap);
    E('summary', null, det, L('Ver a escada como tabela', 'See the ladder as a table'));
    var tb = '<table class="t"><thead><tr><th>' + L('uso', 'use') + '</th><th>' + L('degrau', 'rung') + '</th><th>' + L('melhor número', 'best number') + '</th><th>' + L('fonte', 'source') + '</th></tr></thead><tbody>';
    ITEMS.forEach(function (it) {
      tb += '<tr><td>' + nm(it) + '</td><td>' + rl(it.r) + '</td><td>' + L(it.v[0], it.v[1]) +
        (it.flag ? ' (' + L(it.flag[0], it.flag[1]) + ')' : '') + '</td><td>' + (it.src || L('fonte secundária', 'secondary source')) + '</td></tr>';
    });
    det.innerHTML += tb + '</tbody></table>';

    R.live = E('p', { class: 'live sr', 'aria-live': 'polite' }, wrap);

    /* guess cards */
    R.card = {};
    GUESS.forEach(function (id) {
      var it = BY[id];
      if (st.revealed) {
        var c = makeCard(it, true);
        var slot = R.items[it.r].querySelector('[data-slot="' + id + '"]');
        slot.parentNode.replaceChild(c, slot);
        R.card[id] = c;
        return;
      }
      var b = makeCard(it, false);
      b.setAttribute('aria-label', chipLabel(id));
      bindChip(b, id);
      R.card[id] = b;
      var g = st.place[id];
      if (g == null) R.chips.appendChild(b); else R.guessBox[g].appendChild(b);
    });
    refresh();
  }

  function refresh() {
    var n = placedCount();
    R.check.disabled = st.revealed || n < GUESS.length;
    R.check.hidden = st.revealed;
    R.all.hidden = st.revealed;
    R.again.hidden = !st.revealed;
    R.chips.hidden = st.revealed;
    R.trayHint.hidden = st.revealed;
    R.trayHint.textContent = n < GUESS.length ?
      L('Arraste cada ficha até um degrau, ou toque na ficha e depois no degrau. Faltam ' + (GUESS.length - n) + '.',
        'Drag each card onto a rung, or tap the card and then the rung. ' + (GUESS.length - n) + ' to go.') :
      L('As seis fichas estão na escada. Toque em conferir.', 'All six cards are on the ladder. Press check.');
    R.check.textContent = L('conferir', 'check');
    R.score.hidden = !st.revealed;
    if (st.revealed) R.score.innerHTML = scoreText();
    R.rungs.forEach(function (li, r) {
      var has = GUESS.some(function (id) { return st.place[id] === r; });
      li.classList.toggle('l05-has', has);
    });
    R.ladder.classList.toggle('l05-picking', !!st.sel && !st.revealed);
    R.tray.classList.toggle('l05-sel', !!st.sel && !st.revealed);
    GUESS.forEach(function (id) {
      var c = R.card[id]; if (!c || c.tagName !== 'BUTTON') return;
      c.setAttribute('aria-pressed', st.sel === id ? 'true' : 'false');
      c.setAttribute('aria-label', chipLabel(id));
    });
  }
  function scoreText() {
    var placed = GUESS.filter(function (id) { return st.place[id] != null; });
    var ok = placed.filter(function (id) { return st.place[id] === BY[id].r; }).length;
    if (!placed.length) return L('Esta é a escada pronta. Toque em recomeçar para tentar o palpite.', 'This is the finished ladder. Press start over to make your guess.');
    if (placed.length === GUESS.length) return L('Você acertou <b>' + ok + ' de 6</b> degraus.', 'You got <b>' + ok + ' of 6</b> rungs right.');
    return L('Você acertou <b>' + ok + ' das ' + placed.length + '</b> fichas que colocou.', 'You got <b>' + ok + ' of the ' + placed.length + '</b> cards you placed right.');
  }
  function say(t) { R.live.textContent = ''; setTimeout(function () { R.live.textContent = t; }, 30); }

  /* ---------- selection and the rung chooser ---------- */
  function select(id, viaKey) {
    if (st.revealed) return;
    if (st.sel === id) { deselect(); return; }
    st.sel = id;
    buildChooser(id);
    refresh();
    if (viaKey) {
      var bs = R.chooser.querySelectorAll('button');
      var g = st.place[id];
      (bs[g != null ? g : 0] || bs[0]).focus();
    }
  }
  function deselect(focusBack) {
    var id = st.sel;
    st.sel = null;
    R.chooser.hidden = true;
    refresh();
    if (focusBack && id && R.card[id]) R.card[id].focus();
  }
  function buildChooser(id) {
    var ch = R.chooser;
    ch.innerHTML = '';
    ch.hidden = false;
    ch.setAttribute('aria-label', L('Degraus para ', 'Rungs for ') + nm(BY[id]));
    E('p', { class: 'l05-chq' }, ch, L('Em que degrau fica <b>', 'Which rung does <b>') + nm(BY[id]) + L('</b>?', '</b> go on?'));
    var list = E('div', { class: 'l05-chl' }, ch);
    RUNGS.forEach(function (rg, r) {
      var b = E('button', { type: 'button', class: 'btn l05-opt' + (st.place[id] === r ? ' on' : '') }, list, L(rg.pt, rg.en));
      b.addEventListener('click', function () { place(id, r, true); });
    });
    var tail = E('div', { class: 'l05-chl l05-tail' }, ch);
    if (st.place[id] != null) {
      var back = E('button', { type: 'button', class: 'btn l05-opt l05-back' }, tail, L('devolver à bandeja', 'back to the tray'));
      back.addEventListener('click', function () { place(id, null, true); });
    }
    var cancel = E('button', { type: 'button', class: 'btn l05-opt l05-cancel' }, tail, L('cancelar', 'cancel'));
    cancel.addEventListener('click', function () { deselect(true); });
    /* arrow keys move between options */
    ch.onkeydown = function (e) {
      var bs = Array.prototype.slice.call(ch.querySelectorAll('button'));
      var i = bs.indexOf(document.activeElement);
      if (e.key === 'Escape') { e.preventDefault(); deselect(true); }
      else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); bs[(i + 1) % bs.length].focus(); }
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); bs[(i - 1 + bs.length) % bs.length].focus(); }
    };
  }

  /* put card id on rung r (null sends it back to the tray) */
  function place(id, r, fromChooser) {
    if (st.revealed) return;
    var c = R.card[id];
    var first = c.getBoundingClientRect();
    st.place[id] = r;
    if (r == null) R.chips.appendChild(c); else R.guessBox[r].appendChild(c);
    var wasSel = st.sel === id;
    st.sel = null;
    R.chooser.hidden = true;
    refresh();
    flip(c, first, 180);
    var left = GUESS.length - placedCount();
    say(nm(BY[id]) + (r == null ? L(' voltou para a bandeja.', ' went back to the tray.') : L(' no degrau ', ' on the rung ') + rl(r) + '.') +
      (left ? L(' Faltam ' + left + ' fichas.', ' ' + left + ' cards to go.') : L(' Todas no lugar. Toque em conferir.', ' All placed. Press check.')));
    if (fromChooser && wasSel) {
      /* keep the keyboard moving: next card in the tray, else the check button */
      var next = GUESS.filter(function (g) { return st.place[g] == null; })[0];
      if (next) R.card[next].focus(); else if (!R.check.disabled) R.check.focus(); else c.focus();
    }
  }
  function flip(el, first, dur) {
    if (DN.RM || !el.animate) return;
    var last = el.getBoundingClientRect();
    var dx = first.left - last.left, dy = first.top - last.top;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
    el.animate([{ transform: 'translate(' + dx + 'px,' + dy + 'px)' }, { transform: 'none' }],
      { duration: dur, easing: 'cubic-bezier(.2,.7,.2,1)' });
  }

  /* ---------- drag with Pointer Events ---------- */
  var drag = null, suppressClick = false;
  function bindChip(b, id) {
    b.addEventListener('click', function (e) {
      if (suppressClick) { suppressClick = false; e.preventDefault(); return; }
      select(id, e.detail === 0);
    });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && st.sel) { e.preventDefault(); deselect(true); }
    });
    b.addEventListener('pointerdown', function (e) {
      if (st.revealed || busy) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      drag = { id: id, el: b, x0: e.clientX, y0: e.clientY, pid: e.pointerId, on: false, over: null };
      try { b.setPointerCapture(e.pointerId); } catch (er) {}
    });
    b.addEventListener('pointermove', function (e) {
      if (!drag || drag.pid !== e.pointerId) return;
      var dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
      if (!drag.on) {
        if (dx * dx + dy * dy < 36) return;
        startDrag(e);
      }
      moveDrag(e);
    });
    b.addEventListener('pointerup', function (e) { endDrag(e, false); });
    b.addEventListener('pointercancel', function (e) { endDrag(e, true); });
    b.addEventListener('lostpointercapture', function (e) { if (drag && drag.on) endDrag(e, true); });
  }
  function startDrag(e) {
    drag.on = true;
    if (st.sel) { st.sel = null; R.chooser.hidden = true; }
    var r = drag.el.getBoundingClientRect();
    drag.ox = e.clientX - r.left; drag.oy = e.clientY - r.top;
    var gh = drag.el.cloneNode(true);
    gh.className += ' l05-ghost';
    gh.removeAttribute('aria-label');
    gh.setAttribute('aria-hidden', 'true');
    gh.style.width = r.width + 'px';
    document.body.appendChild(gh);
    drag.ghost = gh;
    drag.el.classList.add('l05-lifted');
    R.ladder.classList.add('l05-dragging');
    autoScroll();
  }
  function rungAt(x, y) {
    var t = document.elementFromPoint(x, y);
    if (!t) return null;
    var li = t.closest && t.closest('#l05 .l05-rung');
    if (li) return +li.getAttribute('data-r');
    if (t.closest && t.closest('#l05 .l05-tray')) return 'tray';
    return null;
  }
  function moveDrag(e) {
    drag.cx = e.clientX; drag.cy = e.clientY;
    drag.ghost.style.transform = 'translate(' + (e.clientX - drag.ox) + 'px,' + (e.clientY - drag.oy) + 'px) rotate(-2deg)';
    var o = rungAt(e.clientX, e.clientY);
    if (o !== drag.over) {
      R.rungs.forEach(function (li, r) { li.classList.toggle('l05-over', o === r); });
      drag.over = o;
    }
  }
  function autoScroll() {
    if (!drag || !drag.on) return;
    var y = drag.cy, h = window.innerHeight, edge = 70, v = 0;
    if (y != null) {
      if (y < edge + 50) v = -Math.ceil((edge + 50 - y) / 6);
      else if (y > h - edge) v = Math.ceil((y - (h - edge)) / 6);
    }
    if (v) {
      window.scrollBy(0, v);
      var o = rungAt(drag.cx, drag.cy);
      if (o !== drag.over) { R.rungs.forEach(function (li, r) { li.classList.toggle('l05-over', o === r); }); drag.over = o; }
    }
    drag.raf = requestAnimationFrame(autoScroll);
  }
  function endDrag(e, cancel) {
    if (!drag || (e.pointerId != null && drag.pid !== e.pointerId)) return;
    var d = drag; drag = null;
    if (!d.on) return;
    cancelAnimationFrame(d.raf);
    suppressClick = true;
    setTimeout(function () { suppressClick = false; }, 0);
    var target = cancel ? null : rungAt(e.clientX, e.clientY);
    var gr = d.ghost.getBoundingClientRect();
    d.ghost.remove();
    d.el.classList.remove('l05-lifted');
    R.ladder.classList.remove('l05-dragging');
    R.rungs.forEach(function (li) { li.classList.remove('l05-over'); });
    if (typeof target === 'number') place(d.id, target, false);
    else if (target === 'tray' && st.place[d.id] != null) place(d.id, null, false);
    else { refresh(); return; }
    /* the card lands from where the ghost was dropped */
    flip(d.el, gr, 220);
  }

  /* ---------- the reveal ---------- */
  function reveal(force) {
    if (st.revealed || busy) return;
    if (!force && placedCount() < GUESS.length) return;
    st.sel = null; R.chooser.hidden = true;
    var placed = GUESS.filter(function (id) { return st.place[id] != null; });
    var far = placed.filter(function (id) { return Math.abs(st.place[id] - BY[id].r) >= 2; }).length;
    if (far >= 3) DN.surprise('l05');
    st.revealed = true;
    if (DN.RM || !Element.prototype.animate) {
      render();
      say(R.score.textContent + ' ' + R.read.textContent);
      return;
    }
    busy = true;
    R.check.disabled = true; R.all.disabled = true;
    var step = 520, t = 0;
    /* one card at a time, in ladder order */
    var seq = GUESS.slice().sort(function (a, b) { return BY[a].r - BY[b].r; });
    seq.forEach(function (id) {
      timers.push(setTimeout(function () {
        var it = BY[id], old = R.card[id];
        var first = old.getBoundingClientRect();
        var c = makeCard(it, true);
        var slot = R.items[it.r].querySelector('[data-slot="' + id + '"]');
        slot.parentNode.replaceChild(c, slot);
        old.remove();
        R.card[id] = c;
        c.classList.add('l05-arrive');
        var last = c.getBoundingClientRect();
        c.animate([{ transform: 'translate(' + (first.left - last.left) + 'px,' + (first.top - last.top) + 'px)', width: first.width + 'px', height: first.height + 'px', overflow: 'hidden' },
          { transform: 'none', width: last.width + 'px', height: last.height + 'px', overflow: 'hidden' }],
          { duration: 450, easing: 'cubic-bezier(.2,.7,.2,1)' });
        var g = st.place[id];
        say(nm(it) + ': ' + rl(it.r) + '. ' + (g == null ? '' : g === it.r ? L('Você acertou.', 'You got it right.') : L('Você tinha posto em ', 'You had put it on ') + rl(g) + '.'));
      }, t));
      t += step;
    });
    /* then the other uses appear, rung by rung, top to bottom */
    t += 120;
    RUNGS.forEach(function (rg, r) {
      timers.push(setTimeout(function () {
        R.items[r].querySelectorAll('.l05-extra').forEach(function (c, k) {
          c.hidden = false;
          c.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }],
            { duration: 450, delay: k * 40, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' });
        });
      }, t));
      t += 260;
    });
    timers.push(setTimeout(function () {
      busy = false;
      render();
      R.read.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450 });
      say(R.score.textContent + ' ' + R.read.textContent);
      R.again.focus({ preventScroll: true });
    }, t + 200));
  }
  function reset() {
    clearTimers();
    st.revealed = false; st.sel = null;
    GUESS.forEach(function (id) { st.place[id] = null; });
    render();
    R.trayHint.scrollIntoView && R.tray.getBoundingClientRect().top < 0 && R.tray.scrollIntoView({ block: 'start' });
    var f = R.card[GUESS[0]]; if (f) f.focus({ preventScroll: true });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drag && drag.on) {
      endDrag({ pointerId: drag.pid, clientX: 0, clientY: 0 }, true);
    }
  });

  render();
  DN.onLang(function () {
    if (busy) { busy = false; }
    render();
  });
})();
