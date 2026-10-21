/* Utilitários compartilhados da seção /health.
   Cada página define window.EN (dicionário de tradução) antes de carregar este arquivo
   e registra seus widgets com Health.onLang(fn) para redesenhar ao trocar de idioma. */
(function(){
  var H = window.Health = {};
  H.LANG = 'pt';
  var HOOKS = [];
  H.RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  H.$ = function(s,c){return (c||document).querySelector(s)};
  H.$all = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  H.clamp = function(v,a,b){return Math.max(a,Math.min(b,v))};
  /* t({pt:'…',en:'…'}) ou t('texto', 'text') */
  H.t = function(o,en){ if(typeof o==='string') return H.LANG==='en'?en:o; return o[H.LANG]!=null?o[H.LANG]:o.pt; };
  H.onLang = function(fn){HOOKS.push(fn);};
  H.esc = function(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});};

  /* ---------- canvas com DPR ---------- */
  H.canvas = function(cv,h){
    var dpr = Math.min(window.devicePixelRatio||1, 2);
    var w = cv.clientWidth || cv.parentNode.clientWidth;
    cv.width = Math.round(w*dpr); cv.height = Math.round(h*dpr); cv.style.height = h+'px';
    var ctx = cv.getContext('2d'); ctx.setTransform(dpr,0,0,dpr,0,0);
    return {ctx:ctx,w:w,h:h};
  };
  H.COL = {ink:'#141414',dim:'#6b6b6b',mid:'#9a9a9a',line:'#e2e2e2',soft:'#f4f4f2',
           A:'#0b7d5c',B:'#2f6fd0',C:'#c07b00',D:'#8a8a8a',up:'#0b7d5c',down:'#b23b3b'};
  H.FONT = function(px,b){return (b?'700 ':'')+px+"px 'Space Mono', ui-monospace, Menlo, monospace"};

  /* ---------- matriz de evidência ----------
     rows: [{id, cat, o:{pt,en}, sub:{pt,en}, g:'A'..'D', dir:'up'|'flat'|'down'|'mixed'|'rise'|'unk',
             mag:0..3, n:{pt,en}, eff:{pt,en}, why:{pt,en}, refs:[n], isNew:bool}]
     cats: [{id, pt, en}] */
  H.matrix = function(root, rows, cats){
    var state = {cat:'all', sort:'grade'};
    var GR = {A:4,B:3,C:2,D:1};
    var DIR = {up:{s:'↑',pt:'benefício',en:'benefit'},flat:{s:'=',pt:'sem efeito',en:'no effect'},
               down:{s:'↓',pt:'piora',en:'worse'},mixed:{s:'↕',pt:'misto',en:'mixed'},
               rise:{s:'↑',pt:'aumenta',en:'increases'},unk:{s:'?',pt:'sem dados',en:'no data'}};
    function refs(arr){
      if(!arr||!arr.length) return '';
      return arr.map(function(n){return '<a href="#ref-'+n+'">['+n+']</a>'}).join(' ');
    }
    function render(){
      var L = H.LANG;
      var list = rows.filter(function(r){return state.cat==='all'||r.cat===state.cat;});
      list.sort(function(a,b){
        if(state.sort==='grade') return (GR[b.g]-GR[a.g]) || (b.mag-a.mag);
        if(state.sort==='mag') return (b.mag-a.mag) || (GR[b.g]-GR[a.g]);
        return a.o[L].localeCompare(b.o[L]);
      });
      var open = {}; H.$all('.mrow.open',root).forEach(function(e){open[e.dataset.id]=1;});
      var h = '<div class="mfilters">';
      h += '<button class="chip'+(state.cat==='all'?' on':'')+'" data-cat="all">'+(L==='en'?'All':'Todos')+' · '+rows.length+'</button>';
      cats.forEach(function(c){
        var k = rows.filter(function(r){return r.cat===c.id}).length;
        h += '<button class="chip'+(state.cat===c.id?' on':'')+'" data-cat="'+c.id+'">'+c[L]+' · '+k+'</button>';
      });
      h += '</div><div class="msort">'+(L==='en'?'Sort by':'Ordenar por')+':';
      [['grade',L==='en'?'evidence':'evidência'],['mag',L==='en'?'effect size':'tamanho do efeito'],['az','A–Z']].forEach(function(s){
        h += '<button class="chip mini'+(state.sort===s[0]?' on':'')+'" data-sort="'+s[0]+'">'+s[1]+'</button>';
      });
      h += '</div>';
      h += '<div class="mhead"><span>'+(L==='en'?'Grade':'Grau')+'</span><span>'+(L==='en'?'Outcome':'Desfecho')+'</span><span>'+(L==='en'?'Direction':'Direção')+'</span><span class="hmag">'+(L==='en'?'Size':'Tamanho')+'</span><span></span></div>';
      list.forEach(function(r){
        var d = DIR[r.dir];
        var mag = '<span class="mag" aria-label="'+r.mag+'/3">'+[1,2,3].map(function(i){return '<i'+(i<=r.mag?' class="on"':'')+'></i>'}).join('')+'</span>';
        h += '<div class="mrow'+(open[r.id]?' open':'')+'" data-id="'+r.id+'">'+
             '<button class="mline" aria-expanded="'+(open[r.id]?'true':'false')+'"><span class="grade '+r.g+'">'+r.g+'</span>'+
             '<span class="mo">'+r.o[L]+(r.sub?'<small>'+r.sub[L]+'</small>':'')+'</span>'+
             '<span class="dir '+(r.dir==='up'||r.dir==='down'?r.dir:'flat')+'">'+d.s+' '+d[L]+'</span>'+mag+
             '<span class="chev">›</span></button>'+
             '<div class="mdetail">'+
               '<div class="eff">'+(r.isNew?'<span class="new">'+(L==='en'?'new':'novo')+'</span>':'')+r.eff[L]+'</div>'+
               '<div class="why">'+r.why[L]+'</div>'+
               '<div class="src">'+(r.n?r.n[L]+' · ':'')+refs(r.refs)+'</div>'+
             '</div></div>';
      });
      root.innerHTML = h;
    }
    root.addEventListener('click',function(e){
      var c = e.target.closest('[data-cat]'); if(c){state.cat=c.dataset.cat;render();return;}
      var s = e.target.closest('[data-sort]'); if(s){state.sort=s.dataset.sort;render();return;}
      var m = e.target.closest('.mline');
      if(m){var row=m.parentNode;row.classList.toggle('open');m.setAttribute('aria-expanded',row.classList.contains('open'));}
    });
    render(); H.onLang(render);
  };

  /* ---------- forest plot (HTML) ----------
     items: [{l:{pt,en}, s:{pt,en}, v, lo, hi, fmt}] ; axis: {min,max,ticks:[..], zero} */
  H.forest = function(root, items, axis){
    function x(v){return ((v-axis.min)/(axis.max-axis.min)*100).toFixed(2)+'%';}
    function render(){
      var L=H.LANG, h='';
      items.forEach(function(it){
        h += '<div class="frow"><div class="fl"><b>'+it.l[L]+'</b><span>'+it.s[L]+'</span></div>'+
             '<div class="ftrack"><div class="fzero" style="left:'+x(axis.zero)+'"></div>'+
             '<div class="fci" style="left:'+x(it.lo)+';width:calc('+x(it.hi)+' - '+x(it.lo)+')"></div>'+
             '<div class="fpt" style="left:'+x(it.v)+'"></div></div></div>';
      });
      h += '<div class="faxis"><span>'+axis.label[L]+'</span><div class="ticks">'+
           axis.ticks.map(function(t){return '<span style="left:'+x(t)+'">'+t+'</span>'}).join('')+'</div></div>';
      root.innerHTML = h;
    }
    render(); H.onLang(render);
  };

  /* ---------- cartões de mito ----------
     items: [{q:{pt,en}, a:'myth'|'true'|'partly', why:{pt,en}}] */
  H.myths = function(root, items){
    var i=0, ans=null, score=0;
    var LAB = {myth:{pt:'Mito',en:'Myth',c:'#b23b3b'},true:{pt:'Verdade',en:'True',c:'#0b7d5c'},partly:{pt:'Em parte',en:'Partly',c:'#c07b00'}};
    function render(){
      var L=H.LANG, it=items[i];
      if(!it){
        root.innerHTML = '<div class="mcard"><div class="mq">'+(L==='en'?'You got ':'Você acertou ')+'<b>'+score+'/'+items.length+'</b>.</div>'+
          '<button class="btn" data-restart>'+(L==='en'?'Start over':'Recomeçar')+'</button></div>';
        return;
      }
      var h = '<div class="mcard"><div class="mq">“'+it.q[L]+'”</div><div class="mchoices">';
      ['myth','partly','true'].forEach(function(k){
        h += '<button class="btn'+(ans===k?' on':'')+'" data-c="'+k+'">'+LAB[k][L]+'</button>';
      });
      h += '</div><div class="mreveal'+(ans?' show':'')+'">';
      if(ans){
        var a = LAB[it.a];
        h += '<span class="tag" style="background:'+a.c+'">'+a[L]+'</span>'+it.why[L]+
             '<div style="margin-top:12px"><button class="btn" data-next>'+(i<items.length-1?(L==='en'?'Next →':'Próximo →'):(L==='en'?'See score':'Ver placar'))+'</button></div>';
      }
      h += '</div><div class="mprog"><span>'+(i+1)+' / '+items.length+'</span><span>'+(L==='en'?'score ':'acertos ')+score+'</span></div></div>';
      root.innerHTML = h;
    }
    root.addEventListener('click',function(e){
      var c=e.target.closest('[data-c]');
      if(c&&!ans){ans=c.dataset.c; if(ans===items[i].a)score++; render(); return;}
      if(e.target.closest('[data-next]')){i++;ans=null;render();return;}
      if(e.target.closest('[data-restart]')){i=0;ans=null;score=0;render();}
    });
    render(); H.onLang(render);
  };

  /* ---------- reveal + barra de progresso ---------- */
  function setupScroll(){
    var els = H.$all('.reveal');
    if(H.RM || !('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});}
    else{
      var io = new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}})},{rootMargin:'0px 0px -8% 0px'});
      els.forEach(function(e){io.observe(e)});
    }
    var bar = H.$('#progress');
    if(bar) window.addEventListener('scroll',function(){
      var d=document.documentElement, m=d.scrollHeight-d.clientHeight;
      bar.style.width = (m>0? (d.scrollTop/m*100):0)+'%';
    },{passive:true});
  }

  /* ---------- idioma (mesma chave rs_lang do resto do site) ---------- */
  var PT = {};
  function applyLang(lang){
    H.LANG=lang; document.documentElement.lang=lang;
    try{localStorage.setItem('rs_lang',lang);}catch(e){}
    var EN = window.EN||{};
    H.$all('[data-i18n]').forEach(function(el){
      var k=el.getAttribute('data-i18n'), v=(lang==='en')?EN[k]:PT[k];
      if(v!=null) el.innerHTML=v;
    });
    var tt = document.querySelector('title[data-i18n]');
    if(tt){var k=tt.getAttribute('data-i18n'); document.title = lang==='en'&&EN[k]?EN[k]:PT[k];}
    H.$all('.langtoggle button').forEach(function(b){b.classList.toggle('active',b.dataset.lang===lang);});
    HOOKS.forEach(function(fn){try{fn();}catch(e){console.error(e)}});
  }
  function detectLang(){
    try{var st=localStorage.getItem('rs_lang');if(st==='pt'||st==='en')return st;}catch(e){}
    var navs=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||'pt'];
    for(var i=0;i<navs.length;i++){var l=(navs[i]||'').toLowerCase();if(l.indexOf('pt')===0)return 'pt';if(l.indexOf('en')===0)return 'en';}
    return 'pt';
  }
  /* chamado por cada página no fim do script, depois de registrar os widgets */
  H.start = function(){
    H.$all('[data-i18n]').forEach(function(el){PT[el.getAttribute('data-i18n')]=el.innerHTML;});
    var tt=document.querySelector('title[data-i18n]'); if(tt) PT[tt.getAttribute('data-i18n')]=tt.textContent;
    H.$all('.langtoggle button').forEach(function(b){b.addEventListener('click',function(){applyLang(this.dataset.lang);});});
    var rt; window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){HOOKS.forEach(function(fn){try{fn()}catch(e){}})},150);});
    setupScroll();
    applyLang(detectLang());
  };
})();
