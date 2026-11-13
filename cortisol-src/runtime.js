/* ================= DN runtime: shared by every widget =================
   Loaded before all widget scripts. Widgets must only use this API plus
   the DOM inside their own #wXX .wbody. */
window.DN = (function () {
  'use strict';
  var RM = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var HOOKS = [];
  var BUS = {};
  var LANG = 'pt';

  function $(s, c) { return (c || document).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  /* ---------- i18n ---------- */
  function lang() { return LANG; }
  function L(pt, en) { return LANG === 'en' ? en : pt; }
  function onLang(fn) { HOOKS.push(fn); }
  function _setLang(l) {
    LANG = l;
    HOOKS.forEach(function (fn) { try { fn(l); } catch (e) { console.error(e); } });
  }
  /* number with locale decimal separator: fmt(1.5,1) -> "1,5" in PT */
  function fmt(n, d) {
    var s = (d == null ? String(n) : Number(n).toFixed(d));
    if (LANG === 'pt') {
      var parts = s.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return parts.join(',');
    }
    var p = s.split('.');
    p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return p.join('.');
  }

  /* ---------- storage (never throws) ---------- */
  var store = {
    get: function (k, def) {
      try { var v = localStorage.getItem('rs_cort_' + k); return v == null ? def : JSON.parse(v); } catch (e) { return def; }
    },
    set: function (k, v) {
      try { localStorage.setItem('rs_cort_' + k, JSON.stringify(v)); } catch (e) {}
    }
  };

  /* ---------- colors (hex, usable in canvas) ---------- */
  var COL = {
    paper: '#ffffff', ink: '#141414', dim: '#6b6b6b', mid: '#9a9a9a', line: '#e2e2e2',
    alta: '#e8553e', altaTxt: '#b63b28', altaSoft: 'rgba(232,85,62,.15)',
    baixa: '#0e7a7c', baixaSoft: 'rgba(14,122,124,.15)',
    plana: '#9a9a9a',
    /* aliases used by helpers copied from the dopamine essay */
    dopa: '#e8553e', dopaSoft: 'rgba(232,85,62,.15)',
    pausa: '#0e7a7c', pausaSoft: 'rgba(14,122,124,.15)',
    night: '#0f1020', nightInk: '#e9e6dc',
    /* fixed color per reward/substance across the whole essay */
    sub: {
      comida: '#6f8f2e', sexo: '#c9507a', musica: '#2a8a76', cafe: '#7a5230',
      nicotina: '#9a7b4f', cocaina: '#3f9bb0', anfetamina: '#c23b2e', morfina: '#8564b0',
      metilfenidato: '#4a74b8', levodopa: '#a8901c', apostas: '#2d6b45', video: '#d06a2b',
      meditacao: '#5f8aa6', dinheiro: '#3d7d3d', placebo: '#8a8a8a', cigarro: '#9a7b4f'
    }
  };

  /* ---------- DOM helpers ---------- */
  var NS = 'http://www.w3.org/2000/svg';
  function svg(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    if (attrs) for (var k in attrs) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }
  function el(tag, attrs, parent, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) if (attrs[k] != null) {
      if (k === 'class') e.className = attrs[k]; else e.setAttribute(k, attrs[k]);
    }
    if (html != null) e.innerHTML = html;
    if (parent) parent.appendChild(e);
    return e;
  }
  /* the mount point of widget id, e.g. DN.body('w04a') */
  function body(id) { return $('#' + id + ' .wbody'); }
  function onVisible(target, cb, opts) {
    opts = opts || {};
    if (!('IntersectionObserver' in window)) { cb(true); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        cb(e.isIntersecting, e);
        if (e.isIntersecting && opts.once) io.disconnect();
      });
    }, { rootMargin: opts.margin || '0px', threshold: opts.threshold || 0 });
    io.observe(target);
    return io;
  }
  /* HiDPI canvas: returns {ctx,w,h} sized to css width and given css height */
  function fitCanvas(cv, h) {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = cv.clientWidth || cv.parentNode.clientWidth || 600;
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    cv.style.height = h + 'px';
    var ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx: ctx, w: w, h: h };
  }

  /* ---------- event bus ---------- */
  function on(name, fn) { (BUS[name] = BUS[name] || []).push(fn); }
  function emit(name, data) { (BUS[name] || []).forEach(function (fn) { try { fn(data); } catch (e) { console.error(e); } }); }

  /* ---------- companion neuron API ----------
     Any widget calls DN.surprise() when the reader's guess was clearly wrong
     (a positive prediction error), DN.letdown() when an expected result did
     not come, DN.reward() for a plain reward (e.g. pigeon prize).
     companion.js listens and animates; counts are kept here. */
  var counts = { bursts: 0, pauses: 0 };
  function surprise(src) { counts.bursts++; emit('burst', { src: src }); }
  function letdown(src) { counts.pauses++; emit('pause', { src: src }); }
  function reward(src) { counts.bursts++; emit('burst', { src: src, small: true }); }

  /* ---------- sound (opt-in, global toggle in topbar) ---------- */
  var actx = null, soundOn = false;
  function audio() {
    if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { actx = null; } }
    if (actx && actx.state === 'suspended') actx.resume();
    return actx;
  }
  function setSound(v) { soundOn = !!v; if (v) audio(); emit('sound', soundOn); }
  function sound() { return soundOn; }
  /* short click, used by companion and widget 03 */
  function click(when, gain) {
    var a = audio(); if (!a) return;
    var t = when || a.currentTime;
    var o = a.createOscillator(), g = a.createGain();
    o.type = 'square'; o.frequency.value = 1800;
    g.gain.setValueAtTime(gain || 0.05, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.012);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + 0.02);
  }

  return {
    RM: RM, $: $, $all: $all, clamp: clamp, lerp: lerp,
    lang: lang, L: L, onLang: onLang, _setLang: _setLang, fmt: fmt,
    store: store, COL: COL, svg: svg, el: el, body: body, onVisible: onVisible, fitCanvas: fitCanvas,
    on: on, emit: emit, surprise: surprise, letdown: letdown, reward: reward, counts: counts,
    audio: audio, setSound: setSound, sound: sound, click: click
  };
})();
