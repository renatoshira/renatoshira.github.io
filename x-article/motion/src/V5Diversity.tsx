import React from 'react';
import {interpolateColors, useCurrentFrame} from 'remotion';
import {C, Frame, FONT, LangProps, gauss, lerp, prog, rng} from './lib';

const T = {
  en: {
    title: 'Similar posts get a score of zero',
    picked: ['picked ', ' of 150'],
    st: ['greedy DPP picks 50 of the top 150', 'the other 100 get a score of 0', '10 similar posts land next to @ana', '@ana is too similar: score 0', 'own angle: picked again'],
  },
  pt: {
    title: 'Posts parecidos ganham nota zero',
    picked: ['escolhidos ', ' de 150'],
    st: ['o DPP escolhe 50 das 150 maiores notas', 'as outras 100 ficam com nota 0', '10 posts parecidos caem perto da @ana', '@ana parecida demais: nota 0', 'ângulo próprio: escolhida de novo'],
  },
};

// Same deterministic seed and greedy DPP as the essay (W7).
const TC = ['#b5733a', '#2f8f5b', '#3e6fd0', '#9a4fb0', '#c49a1a'];
const CEN = [
  [0.22, 0.3],
  [0.75, 0.28],
  [0.28, 0.75],
  [0.74, 0.72],
  [0.5, 0.5],
];
const SIG = 0.08,
  K = 50;
type P = {id: number; x: number; y: number; q: number; t: number; ana?: boolean};

function base(): P[] {
  const r = rng(4);
  const p: P[] = [];
  for (let i = 0; i < 149; i++) {
    const c = i % 5;
    p.push({id: i, x: CEN[c][0] + gauss(r) * 0.09, y: CEN[c][1] + gauss(r) * 0.09, q: 0.25 + r() * 0.75, t: c});
  }
  p.push({id: 149, x: 0.3, y: 0.36, q: 0.8, t: 0, ana: true});
  return p;
}
function dpp(p: P[]): number[] {
  const n = p.length;
  const L = (i: number, j: number) => {
    const dx = p[i].x - p[j].x,
      dy = p[i].y - p[j].y;
    return p[i].q * p[j].q * Math.exp(-(dx * dx + dy * dy) / (2 * SIG * SIG));
  };
  const d2 = p.map((_, i) => L(i, i)),
    cis: number[][] = p.map(() => []),
    s: number[] = [],
    used: Record<number, 1> = {};
  for (let k = 0; k < K; k++) {
    let best = -1,
      bv = 1e-12;
    for (let i = 0; i < n; i++) if (!used[i] && d2[i] > bv) {
      bv = d2[i];
      best = i;
    }
    if (best < 0) break;
    s.push(best);
    used[best] = 1;
    const dj = Math.sqrt(d2[best]);
    for (let i2 = 0; i2 < n; i2++) {
      if (used[i2]) continue;
      let dot = 0;
      for (let m = 0; m < cis[best].length; m++) dot += cis[best][m] * cis[i2][m];
      const e = (L(best, i2) - dot) / dj;
      cis[i2].push(e);
      d2[i2] -= e * e;
    }
    cis[best].push(dj);
  }
  return s.map((i) => p[i].id);
}

const BASE = base();
const SEL0 = dpp(BASE);
// flood: 10 similar, slightly better posts next to @ana; the 10 weakest leave (still 150)
const NEW: P[] = [];
{
  const r = rng(4 + 99);
  for (let i = 0; i < 10; i++) NEW.push({id: 150 + i, x: 0.3 + gauss(r) * 0.025, y: 0.36 + gauss(r) * 0.025, q: 0.82 + r() * 0.15, t: 0});
}
const REMOVED = BASE.filter((p) => !p.ana)
  .sort((a, b) => a.q - b.q)
  .slice(0, 10)
  .map((p) => p.id);
const FLOOD = [...BASE, ...NEW].filter((p) => !REMOVED.includes(p.id));
const SEL1 = dpp(FLOOD);
const ANGLE = FLOOD.map((p) => (p.ana ? {...p, x: 0.52, y: 0.12} : p));
const SEL2 = dpp(ANGLE);
const ALL = [...BASE, ...NEW];

export const V5_FRAMES = 600;
const X = (x: number) => 40 + x * 1000;
const Y = (y: number) => 168 + y * 800;

export const V5Diversity: React.FC<LangProps> = ({lang = 'en'}) => {
  const f = useCurrentFrame();
  const t = T[lang];
  const gray = prog(f, 182, 22) * (1 - prog(f, 534, 30));
  const flood = prog(f, 232, 20); // removed fade
  const unflood = prog(f, 540, 26, true);
  const sw1 = prog(f, 312, 22);
  const sw2 = prog(f, 446, 22);
  const end = prog(f, 528, 30, true);
  const slide = prog(f, 392, 40, true) * (1 - prog(f, 540, 36, true));
  const shown = Math.max(0, Math.min(K, Math.floor((f - 20) / 3) + 1));

  const picked = (id: number) => {
    const r0 = SEL0.indexOf(id);
    const p0 = r0 >= 0 ? prog(f, 20 + r0 * 3, 6) : 0;
    const p1 = SEL1.includes(id) ? 1 : 0;
    const p2 = SEL2.includes(id) ? 1 : 0;
    return lerp(lerp(lerp(p0, p1, sw1), p2, sw2), 0, end);
  };
  const ana = ALL.find((p) => p.ana)!;
  const ax = lerp(0.3, 0.52, slide),
    ay = lerp(0.36, 0.12, slide);
  const anaPicked = picked(149);

  const status = [
    {t: t.st[0], c: C.ink, op: 1 - prog(f, 180, 12) + prog(f, 560, 16)},
    {t: t.st[1], c: C.neg, op: prog(f, 186, 14) - prog(f, 236, 12)},
    {t: t.st[2], c: C.ink, op: prog(f, 240, 14) - prog(f, 318, 12)},
    {t: t.st[3], c: C.neg, op: prog(f, 322, 14) - prog(f, 392, 12)},
    {t: t.st[4], c: C.pos, op: prog(f, 400, 14) - prog(f, 536, 14)},
  ];
  const count = f < 300 ? shown : f < 528 ? 50 : Math.round(50 * (1 - end));

  return (
    <Frame title={t.title} titleSize={48} lang={lang}>
      <svg width={1080} height={1080} style={{position: 'absolute', inset: 0}} fontFamily={FONT}>
        <text x={72} y={166} fontSize={40} fill={C.ink}>
          {t.picked[0]}
          <tspan fontWeight={700}>{count}</tspan>
          {t.picked[1]}
        </text>
        {ALL.map((p) => {
          if (p.ana) return null;
          let op = 1,
            dy = 0;
          if (REMOVED.includes(p.id)) op = 1 - flood + unflood;
          if (p.id >= 150) {
            const k = p.id - 150;
            const drop = prog(f, 244 + k * 4, 22);
            op = drop * (1 - unflood);
            dy = (1 - drop) * -260;
          }
          if (op <= 0.001) return null;
          const v = picked(p.id);
          const rad = (2 + p.q * 5) * 1.9;
          const strokeCol = interpolateColors(gray * (1 - v), [0, 1], [TC[p.t], '#bdb7aa']);
          return (
            <g key={p.id} opacity={op}>
              <circle cx={X(p.x)} cy={Y(p.y) + dy} r={rad} fill={TC[p.t]} fillOpacity={v} stroke={strokeCol} strokeOpacity={lerp(0.55, 1, Math.max(v, gray))} strokeWidth={2} />
            </g>
          );
        })}
        {/* @ana */}
        {(() => {
          const rad = (2 + ana.q * 5) * 1.9;
          return (
            <g>
              <circle cx={X(ax)} cy={Y(ay)} r={rad + 9} fill="none" stroke={C.ana} strokeWidth={5} />
              <circle cx={X(ax)} cy={Y(ay)} r={rad} fill={C.ana} fillOpacity={anaPicked} stroke={interpolateColors(gray * (1 - anaPicked), [0, 1], [C.ana, '#bdb7aa'])} strokeWidth={2} />
              <text x={X(ax) + rad + 20} y={Y(ay) - 18} fontSize={36} fontWeight={700} fill={C.ana}>
                @ana
                <tspan fill={C.neg} opacity={prog(f, 324, 12) * (1 - prog(f, 396, 10))}>
                  {' '}
                  0
                </tspan>
              </text>
            </g>
          );
        })()}
        {status.map((s) => (
          <text key={s.t} x={72} y={998} fontSize={36} fontWeight={700} fill={s.c} opacity={Math.max(0, Math.min(1, s.op))}>
            {s.t}
          </text>
        ))}
      </svg>
    </Frame>
  );
};
