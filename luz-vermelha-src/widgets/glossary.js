/* glossary.js : dashed terms in the prose (<span class="gl" data-gl="KEY">)
   open a small definition popup on hover (350 ms), click, tap or Enter.
   One popup for the page, appended to body so it follows the page colors.
   Same mechanism as the glossary of the two earlier essays; red light dictionary. */
(function () {
  'use strict';
  function T(ptn, ptd, enn, end) { return { pt: { n: ptn, d: ptd }, en: { n: enn, d: end } }; }
  var G = {
    /* luz e física */
    led: T('LED', 'Componente eletrônico que emite luz numa faixa estreita de cores. É a fonte de luz das máscaras e dos painéis.',
      'LED', 'An electronic component that emits light in a narrow band of colors. It is the light source in masks and panels.'),
    lllt: T('Laserterapia de baixa potência', 'O nome antigo da fotobiomodulação, de quando quase todos os aparelhos eram laser. No Brasil, “laserterapia” ainda é o nome usado na fisioterapia, na odontologia e na estética.',
      'Low-level laser therapy', 'The old name for photobiomodulation, from the time when almost every device was a laser. In Brazil, “laserterapia” is still the name used in physiotherapy, dentistry and aesthetics.'),
    pbm: T('Fotobiomodulação', 'O nome técnico do uso de luz vermelha ou infravermelha de baixa potência para mudar o funcionamento das células sem aquecer o tecido. “Terapia de luz vermelha” é o nome popular da mesma coisa.',
      'Photobiomodulation', 'The technical name for using low-power red or infrared light to change how cells work without heating the tissue. “Red light therapy” is the popular name for the same thing.'),
    comprimento: T('Comprimento de onda', 'A medida que define a cor da luz, dada em nanômetros, que são milionésimos de milímetro. O olho enxerga de cerca de 400 nm, o violeta, a cerca de 700 nm, o vermelho.',
      'Wavelength', 'The measure that sets the color of light, given in nanometers, which are millionths of a millimeter. The eye sees from about 400 nm, violet, to about 700 nm, red.'),
    nir: T('Infravermelho próximo', 'Luz logo acima do vermelho, de 700 a cerca de 1.100 nm. O olho não a enxerga, e ela entra no tecido um pouco mais fundo que o vermelho.',
      'Near infrared', 'Light just beyond red, from 700 to about 1,100 nm. The eye cannot see it, and it gets a little deeper into tissue than red light.'),
    fir: T('Infravermelho distante', 'Luz de comprimento de onda bem mais longo, acima de 3.000 nm, que a pele sente como calor. É a luz das saunas de infravermelho.',
      'Far infrared', 'Light of much longer wavelength, above 3,000 nm, which the skin feels as heat. It is the light of infrared saunas.'),
    uv: T('Ultravioleta', 'Luz abaixo do violeta, que o olho não enxerga. Ela bronzeia, queima e pode causar câncer de pele, e os LEDs vermelhos não a emitem.',
      'Ultraviolet', 'Light below violet, which the eye cannot see. It tans, burns and can cause skin cancer, and red LEDs do not emit it.'),
    janela: T('Janela óptica', 'A faixa de cerca de 650 a 950 nm em que o sangue e a água absorvem pouca luz. Nela a luz se espalha pelo tecido e chega mais fundo.',
      'Optical window', 'The band from about 650 to 950 nm in which blood and water absorb little light. In it, light scatters through tissue and gets deeper.'),
    irradiancia: T('Irradiância', 'Quanta luz chega a cada centímetro quadrado de pele a cada segundo, em miliwatts por centímetro quadrado (mW/cm²). É o número que a caixa do aparelho deveria trazer, com a distância em que foi medido.',
      'Irradiance', 'How much light reaches each square centimeter of skin each second, in milliwatts per square centimeter (mW/cm²). It is the number the device’s box should print, with the distance at which it was measured.'),
    dose: T('Dose (fluência)', 'A luz acumulada em cada centímetro quadrado, em joules por centímetro quadrado (J/cm²). É a irradiância multiplicada pelo tempo: 30 mW/cm² por 10 minutos dão 18 J/cm².',
      'Dose (fluence)', 'The light accumulated on each square centimeter, in joules per square centimeter (J/cm²). It is irradiance multiplied by time: 30 mW/cm² for 10 minutes gives 18 J/cm².'),
    inverso: T('Inverso do quadrado', 'A regra em que dobrar a distância de uma fonte pequena divide a luz por quatro. Um painel grande visto de perto perde luz bem mais devagar que isso.',
      'Inverse square law', 'The rule by which doubling the distance from a small source divides the light by four. A large panel seen up close loses light much more slowly than that.'),
    espectrometro: T('Espectrômetro', 'Aparelho que mede quanta luz uma fonte emite em cada comprimento de onda. É o jeito correto de medir a irradiância de um LED.',
      'Spectrometer', 'An instrument that measures how much light a source emits at each wavelength. It is the correct way to measure an LED’s irradiance.'),
    astm: T('ASTM G173', 'Espectro de referência do sol ao meio-dia com céu limpo, numa latitude média, usado em engenharia solar para comparar painéis.',
      'ASTM G173', 'A reference spectrum of the midday sun under a clear sky at a mid latitude, used in solar engineering to compare panels.'),
    /* corpo e célula */
    hemoglobina: T('Hemoglobina', 'A proteína do sangue que carrega oxigênio. Ela absorve muito o azul e o verde e pouco o vermelho, e por isso a mão brilha vermelha diante de uma lanterna.',
      'Hemoglobin', 'The blood protein that carries oxygen. It absorbs a lot of blue and green and little red, which is why a hand glows red in front of a flashlight.'),
    melanina: T('Melanina', 'O pigmento que dá cor à pele e ao cabelo. Absorve luz, sobretudo as cores curtas, e por isso a pele escura deixa passar menos luz vermelha para baixo.',
      'Melanin', 'The pigment that gives color to skin and hair. It absorbs light, mostly the short colors, so dark skin lets less red light through to the layers below.'),
    epiderme: T('Epiderme', 'A camada de fora da pele, com cerca de um décimo de milímetro. É onde fica a melanina.',
      'Epidermis', 'The outer layer of the skin, about a tenth of a millimeter thick. It is where the melanin sits.'),
    derme: T('Derme', 'A camada da pele abaixo da epiderme, com um a alguns milímetros, onde ficam o colágeno, os vasos e a raiz dos pelos.',
      'Dermis', 'The layer of skin below the epidermis, one to a few millimeters thick, which holds the collagen, the blood vessels and the hair roots.'),
    colageno: T('Colágeno', 'A proteína que dá firmeza à pele. É fabricada por células da derme chamadas fibroblastos.',
      'Collagen', 'The protein that keeps skin firm. It is made by cells in the dermis called fibroblasts.'),
    mitocondria: T('Mitocôndria', 'A estrutura dentro da célula que usa oxigênio para produzir ATP, a molécula de energia. Músculo, nervo e cérebro têm muitas.',
      'Mitochondrion', 'The structure inside the cell that uses oxygen to make ATP, the energy molecule. Muscle, nerve and brain have many of them.'),
    atp: T('ATP', 'Trifosfato de adenosina, a molécula em que a célula guarda a energia que vai usar. A mitocôndria fabrica a maior parte dele.',
      'ATP', 'Adenosine triphosphate, the molecule in which the cell stores the energy it is about to use. The mitochondria make most of it.'),
    cco: T('Citocromo c oxidase', 'A última enzima da cadeia de respiração da mitocôndria. Tem cobre e ferro, absorve vermelho e infravermelho e é apontada como a principal molécula que capta a luz dos aparelhos.',
      'Cytochrome c oxidase', 'The last enzyme in the mitochondria’s respiratory chain. It contains copper and iron, absorbs red and infrared light and is named as the main molecule that captures the light from these devices.'),
    no: T('Óxido nítrico', 'Gás que o próprio corpo produz. Dilata os vasos e, preso à citocromo c oxidase, pode frear a respiração da mitocôndria.',
      'Nitric oxide', 'A gas the body makes itself. It widens blood vessels and, when bound to cytochrome c oxidase, can slow the mitochondria’s respiration.'),
    ros: T('Espécies reativas de oxigênio', 'Moléculas instáveis de oxigênio. Em pequena quantidade ativam as defesas da célula, e em grande quantidade causam dano.',
      'Reactive oxygen species', 'Unstable oxygen molecules. In small amounts they switch on the cell’s defenses, and in large amounts they cause damage.'),
    hormese: T('Hormese', 'O nome geral do padrão em que um estímulo fraco ativa um organismo e um estímulo forte o inibe. Foi descrito primeiro com venenos e leveduras, no fim do século 19.',
      'Hormesis', 'The general name for the pattern in which a weak stimulus activates an organism and a strong one inhibits it. It was first described with poisons and yeast, in the late 19th century.'),
    bifasica: T('Resposta bifásica', 'O padrão da luz em que pouca luz não faz efeito, uma dose intermediária ajuda e luz demais anula o efeito ou piora o tecido.',
      'Biphasic response', 'The pattern with light in which too little does nothing, an intermediate dose helps and too much cancels the effect or harms the tissue.'),
    retina: T('Retina', 'A camada do fundo do olho que transforma luz em sinal nervoso. A lente do olho foca a luz sobre ela, e por isso ela recebe muito mais luz por área que a pele.',
      'Retina', 'The layer at the back of the eye that turns light into nerve signals. The eye’s lens focuses light onto it, so it receives far more light per area than the skin.'),
    fotorreceptores: T('Fotorreceptores', 'As células da retina que captam a luz, os cones e os bastonetes. Quando morrem, a visão daquela área se perde.',
      'Photoreceptors', 'The retinal cells that capture light, the cones and rods. When they die, the vision of that area is lost.'),
    /* doenças e usos */
    mucosite: T('Mucosite oral', 'Inflamação com feridas na boca e na garganta causada pela quimioterapia e pela radioterapia. Nos casos graves, a dor impede o paciente de comer.',
      'Oral mucositis', 'Inflammation with sores in the mouth and throat caused by chemotherapy and radiotherapy. In severe cases, the pain stops the patient from eating.'),
    tcth: T('Transplante de células-tronco hematopoéticas', 'O nome técnico do transplante de medula óssea, feito em alguns cânceres do sangue. Antes dele, o paciente recebe quimioterapia em dose alta.',
      'Hematopoietic stem cell transplant', 'The technical name for a bone marrow transplant, done in some blood cancers. Before it, the patient receives high-dose chemotherapy.'),
    alopecia: T('Alopecia androgenética', 'A calvície de padrão masculino e feminino, ligada a hormônios e à herança genética. É a causa mais comum de queda de cabelo.',
      'Androgenetic alopecia', 'Male and female pattern baldness, linked to hormones and genetic inheritance. It is the most common cause of hair loss.'),
    minoxidil: T('Minoxidil', 'Remédio aplicado no couro cabeludo, ou tomado em comprimido, contra a calvície. É o tratamento de referência com que os outros se comparam.',
      'Minoxidil', 'A drug applied to the scalp, or taken as a pill, against baldness. It is the reference treatment against which others are compared.'),
    neuropatia: T('Neuropatia periférica', 'Lesão dos nervos dos pés e das mãos, com dor, formigamento e dormência. É comum no diabetes e depois de certas quimioterapias.',
      'Peripheral neuropathy', 'Damage to the nerves of the feet and hands, with pain, tingling and numbness. It is common in diabetes and after some chemotherapies.'),
    artrose: T('Artrose', 'Desgaste da cartilagem das articulações, com dor e rigidez. É mais comum no joelho, no quadril e nas mãos.',
      'Osteoarthritis', 'Wear of the cartilage in the joints, with pain and stiffness. It is most common in the knee, the hip and the hands.'),
    dmri: T('Degeneração macular relacionada à idade', 'Perda da visão central comum depois dos 60 anos. Na forma seca, o centro da retina se desgasta devagar, e na fase avançada surgem áreas de retina morta.',
      'Age-related macular degeneration', 'Loss of central vision, common after age 60. In the dry form, the centre of the retina wears out slowly, and in the advanced stage patches of retina die.'),
    miopia: T('Miopia', 'Dificuldade de ver de longe. Na criança, ela piora quando o olho cresce demais no comprimento, e por isso os ensaios medem esse crescimento em milímetros.',
      'Myopia', 'Difficulty seeing far away. In children it gets worse when the eye grows too long, which is why trials measure that growth in millimeters.'),
    atropina: T('Atropina', 'Colírio que, em dose baixa, freia o crescimento do olho de crianças míopes. É um dos tratamentos de referência para a miopia infantil.',
      'Atropine', 'Eye drops that, at low doses, slow the growth of the eye in short-sighted children. It is one of the reference treatments for childhood myopia.'),
    pdt: T('Terapia fotodinâmica', 'Tratamento que junta luz e um remédio aplicado na pele que reage à luz. Por causa do remédio, conta como outro tratamento, diferente da luz sozinha.',
      'Photodynamic therapy', 'A treatment that combines light with a drug applied to the skin that reacts to light. Because of the drug, it counts as a different treatment from light alone.'),
    tretinoina: T('Tretinoína e isotretinoína', 'Remédios derivados da vitamina A, usados contra acne e rugas. Deixam a pele mais sensível à luz e à irritação.',
      'Tretinoin and isotretinoin', 'Drugs derived from vitamin A, used against acne and wrinkles. They make the skin more sensitive to light and irritation.'),
    melasma: T('Melasma', 'Manchas escuras no rosto, mais comuns em mulheres e em peles negras e pardas. Luz visível e calor podem piorá-las.',
      'Melasma', 'Dark patches on the face, more common in women and in Black and brown skin. Visible light and heat can make them worse.'),
    /* estudos e estatística */
    sham: T('Luz falsa (sham)', 'Aparelho igual ao verdadeiro que acende sem entregar a luz ativa, usado como placebo. É difícil de fazer bem, porque a luz vermelha se vê e alguns aparelhos esquentam.',
      'Sham light', 'A device identical to the real one that lights up without delivering the active light, used as a placebo. It is hard to do well, because red light is visible and some devices get warm.'),
    duplocego: T('Duplo-cego', 'Estudo em que nem os participantes nem os avaliadores sabem quem recebeu o tratamento e quem recebeu o placebo.',
      'Double-blind', 'A study in which neither the participants nor the assessors know who received the treatment and who received the placebo.'),
    meta: T('Meta-análise', 'Estudo que junta os resultados de vários ensaios para estimar um efeito médio. Se os ensaios forem pequenos ou mal feitos, a média herda os defeitos.',
      'Meta-analysis', 'A study that pools the results of several trials to estimate an average effect. If the trials are small or poorly run, the average inherits their flaws.'),
    umbrella: T('Revisão guarda-chuva', 'Revisão que junta várias meta-análises sobre um mesmo tratamento e dá uma nota de certeza a cada resultado.',
      'Umbrella review', 'A review that brings together several meta-analyses of the same treatment and grades the certainty of each result.'),
    cochrane: T('Revisão Cochrane', 'Revisão sistemática feita com o método da Colaboração Cochrane, uma rede internacional de pesquisadores. É uma referência em medicina por seguir regras fixas e públicas.',
      'Cochrane review', 'A systematic review done with the method of the Cochrane Collaboration, an international network of researchers. It is a reference in medicine because it follows fixed, public rules.'),
    smd: T('Diferença padronizada', 'A distância entre dois grupos medida em desvios padrão, para comparar estudos que usaram escalas diferentes. 0,2 é pequena, 0,5 é média e 0,8 é grande.',
      'Standardized mean difference', 'The distance between two groups measured in standard deviations, so studies that used different scales can be compared. 0.2 is small, 0.5 is medium and 0.8 is large.'),
    grade: T('Certeza da evidência', 'O grau de confiança num resultado, pelo método GRADE, que vai de muito baixa a alta. Certeza moderada quer dizer que o efeito verdadeiro deve estar perto do estimado.',
      'Certainty of evidence', 'The degree of confidence in a result, under the GRADE method, which runs from very low to high. Moderate certainty means the true effect is probably close to the estimate.'),
    /* regulação e segurança */
    k510: T('510(k)', 'A liberação da FDA para um aparelho parecido com outro já vendido legalmente. Pode sair só com testes de bancada, sem ensaio de eficácia, e o anúncio diz “cleared”.',
      '510(k)', 'The FDA clearance for a device similar to one already sold legally. It can be granted on bench tests alone, without an efficacy trial, and the ad says “cleared”.'),
    denovo: T('De Novo', 'A autorização da FDA para um aparelho novo de risco baixo a moderado, sem similar no mercado. Exige estudo clínico, e o anúncio diz “granted”.',
      'De Novo', 'The FDA authorization for a new low to moderate risk device with no equivalent on the market. It requires a clinical study, and the ad says “granted”.'),
    pma: T('PMA', 'A aprovação mais exigente da FDA, com prova de segurança e eficácia. Só ela permite dizer “approved”, e a busca feita para este ensaio não achou nenhum aparelho de luz vermelha com ela.',
      'PMA', 'The FDA’s most demanding approval, with proof of safety and efficacy. Only it allows the word “approved”, and the search done for this essay found no red light device that has it.'),
    limite: T('Limite de exposição', 'A quantidade máxima de luz que uma norma de segurança, como a ANSI americana ou a IEC 62471 internacional, considera segura para o olho ou a pele num dado tempo.',
      'Exposure limit', 'The maximum amount of light that a safety standard, such as the American ANSI or the international IEC 62471, considers safe for the eye or the skin over a given time.')
  };

  var pop = document.createElement('div');
  pop.className = 'glpop';
  pop.id = 'glpop';
  pop.setAttribute('role', 'tooltip');
  document.body.appendChild(pop);

  var cur = null, timer = null, y0 = 0, pinned = false;
  var canHover = !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);

  function entry(el) {
    var g = G[el.getAttribute('data-gl')];
    return g ? (DN.lang() === 'en' ? g.en : g.pt) : null;
  }
  function place(el) {
    var r = el.getClientRects()[0] || el.getBoundingClientRect();
    var vw = document.documentElement.clientWidth || window.innerWidth;
    var vh = window.innerHeight;
    var pw = pop.offsetWidth, ph = pop.offsetHeight, m = 12;
    var x = DN.clamp(r.left + r.width / 2 - pw / 2, m, Math.max(m, vw - pw - m));
    var y = r.top - ph - 9;
    if (y < 60) y = r.bottom + 9; /* below when the topbar would cover it */
    if (y + ph > vh - m) y = Math.max(m, vh - ph - m);
    pop.style.left = Math.round(x) + 'px';
    pop.style.top = Math.round(y) + 'px';
  }
  function show(el, pin) {
    var e = entry(el);
    if (!e) return;
    pinned = !!pin;
    if (cur && cur !== el) unmark(cur);
    pop.innerHTML = '<div class="gh">' + e.n + '</div><div class="gd">' + e.d + '</div>';
    pop.classList.add('show');
    place(el);
    cur = el;
    y0 = el.getBoundingClientRect().top;
    el.classList.add('on');
    el.setAttribute('aria-expanded', 'true');
    el.setAttribute('aria-describedby', 'glpop');
  }
  function unmark(el) {
    el.classList.remove('on');
    el.setAttribute('aria-expanded', 'false');
    el.removeAttribute('aria-describedby');
  }
  function hide() {
    clearTimeout(timer);
    pop.classList.remove('show');
    if (cur) { unmark(cur); cur = null; }
    pinned = false;
  }
  /* a click on a term already opened by hover pins it instead of closing it */
  function toggle(el) {
    clearTimeout(timer);
    if (cur === el && pinned) hide();
    else if (cur === el) pinned = true;
    else show(el, true);
  }

  function wire() {
    DN.$all('.gl').forEach(function (el) {
      if (el._gl) return;
      el._gl = 1;
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-expanded', 'false');
      if (canHover) {
        el.addEventListener('mouseenter', function () {
          clearTimeout(timer);
          if (cur === el) return;
          timer = setTimeout(function () { show(el, false); }, 350);
        });
        el.addEventListener('mouseleave', function () {
          clearTimeout(timer);
          if (cur === el && !pinned) hide();
        });
      }
      el.addEventListener('click', function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        toggle(el);
      });
      el.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); toggle(el); }
        else if (ev.key === 'Escape' && cur === el) { hide(); }
      });
    });
  }

  document.addEventListener('click', function (ev) { if (cur && !pop.contains(ev.target)) hide(); });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && cur) hide(); });
  /* close when the term itself moves on screen; small nudges (focus, a resting
     finger, layout shifts above that scroll anchoring absorbs) keep it open */
  window.addEventListener('scroll', function () {
    if (!cur) return;
    if (Math.abs(cur.getBoundingClientRect().top - y0) > 40) hide(); else place(cur);
  }, { passive: true });
  window.addEventListener('resize', function () { if (cur) hide(); });

  wire();
  DN.onLang(function () { hide(); wire(); });
})();
