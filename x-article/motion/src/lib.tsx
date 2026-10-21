import React from 'react';
import {AbsoluteFill, Easing, interpolate} from 'remotion';
import {loadFont} from '@remotion/google-fonts/SpaceMono';

export const {fontFamily: FONT} = loadFont('normal', {weights: ['400', '700'], subsets: ['latin', 'latin-ext']});

export const C = {
  paper: '#f2efe7',
  ink: '#141414',
  ana: '#ef7d32',
  pos: '#1f8a5f',
  neg: '#d2483a',
  blue: '#3e4ea6',
  dim: '#8a857b',
  line: '#d9d4c8',
  gray: '#c9c4b8',
  white: '#fbfaf6',
};

export const W = 1080;
export const M = 72; // margin

const ease = Easing.bezier(0.22, 1, 0.36, 1);
const easeIO = Easing.bezier(0.65, 0, 0.35, 1);

/** 0→1 eased progress between frame `start` and `start+dur`. */
export const prog = (frame: number, start: number, dur: number, inout = false) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: inout ? easeIO : ease,
  });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* same helpers as the essay */
export function rng(s: number) {
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function gauss(r: () => number) {
  return Math.sqrt(-2 * Math.log(r() + 1e-12)) * Math.cos(6.2831853 * r());
}
export function gammaS(a: number, r: () => number): number {
  if (a < 1) return gammaS(a + 1, r) * Math.pow(r(), 1 / a);
  const d = a - 1 / 3,
    c = 1 / Math.sqrt(9 * d);
  for (;;) {
    let x: number, v: number;
    do {
      x = gauss(r);
      v = 1 + c * x;
    } while (v <= 0);
    v = v * v * v;
    const u = r();
    if (u < 1 - 0.0331 * x * x * x * x) return d * v;
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return d * v;
  }
}
export function betaS(a: number, b: number, r: () => number) {
  const x = gammaS(a, r),
    y = gammaS(b, r);
  return x / (x + y);
}
function lgamma(z: number): number {
  const g = 7,
    c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lgamma(1 - z);
  z -= 1;
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z + i);
  const t = z + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}
export function betaPdf(x: number, a: number, b: number) {
  if (x <= 0 || x >= 1) return 0;
  return Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) + lgamma(a + b) - lgamma(a) - lgamma(b));
}

export type Lang = 'en' | 'pt';
export type LangProps = {lang?: Lang};

/** Number formatting per language. en: plain toFixed (unchanged); pt: comma decimals, dot thousands. */
export const num = (v: number, digits: number, lang: Lang = 'en') => {
  const s = v.toFixed(digits);
  if (lang === 'en') return s;
  const neg = s.startsWith('-');
  const [i, d] = (neg ? s.slice(1) : s).split('.');
  const ig = i.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return (neg ? '-' : '') + ig + (d != null ? ',' + d : '');
};
/** Localize a literal number string written in en format ("7.6×" → "7,6×"). */
export const loc = (s: string, lang: Lang = 'en') => (lang === 'pt' ? s.replace(/(\d)\.(\d)/g, '$1,$2') : s);

const FOOTER: Record<Lang, string> = {en: 'source: xai-org/x-algorithm', pt: 'fonte: xai-org/x-algorithm'};

export const Frame: React.FC<{title: string; children: React.ReactNode; footer?: boolean; titleSize?: number; lang?: Lang}> = ({title, children, footer = true, titleSize = 52, lang = 'en'}) => (
  <AbsoluteFill style={{backgroundColor: C.paper, fontFamily: FONT, color: C.ink}}>
    {children}
    <div style={{position: 'absolute', left: M, right: M, top: 58, fontSize: titleSize, fontWeight: 700, lineHeight: 1.15, letterSpacing: titleSize < 52 ? -1.5 : -1, whiteSpace: 'nowrap'}}>{title}</div>
    {footer && (
      <div style={{position: 'absolute', left: M, right: M, bottom: 34, fontSize: 24, color: C.dim, display: 'flex', justifyContent: 'space-between'}}>
        <span>{FOOTER[lang]}</span>
      </div>
    )}
  </AbsoluteFill>
);
