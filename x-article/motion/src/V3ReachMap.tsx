import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, Frame, FONT, LangProps, prog, rng} from './lib';

const T = {
  en: {
    title: 'Who can see your post',
    cap: ['only followers see it', 'enters 1fav → the coffee cluster', 'enters 32fav → spreads to tech'],
    clusters: {cafe: 'COFFEE', tec: 'TECH', fut: 'SOCCER', pol: 'POLITICS'} as Record<string, string>,
    followers: 'followers',
    i1: '1fav index',
    i32: '32fav index',
  },
  pt: {
    title: 'Quem pode ver o seu post',
    cap: ['só os seguidores veem', 'entra no 1fav → grupo de café', 'entra no 32fav → chega à tecnologia'],
    clusters: {cafe: 'CAFÉ', tec: 'TECNOLOGIA', fut: 'FUTEBOL', pol: 'POLÍTICA'} as Record<string, string>,
    followers: 'seguidores',
    i1: 'índice 1fav',
    i32: 'índice 32fav',
  },
};

// Same generator as the essay's reach map (W3), adapted to a square frame.
const MX = 72,
  MY = 360,
  MW = 936,
  MH = 630;
const AR = MW / MH;
const G: Record<string, {n: string; c: string; cx: number; cy: number; aff: number}> = {
  cafe: {n: 'COFFEE', c: '#b5733a', cx: 0.17, cy: 0.24, aff: 1},
  tec: {n: 'TECH', c: '#3e6fd0', cx: 0.83, cy: 0.24, aff: 0.45},
  fut: {n: 'SOCCER', c: '#2f8f5b', cx: 0.17, cy: 0.8, aff: 0.12},
  pol: {n: 'POLITICS', c: '#9a4fb0', cx: 0.83, cy: 0.8, aff: 0.08},
};
type Dot = {x: number; y: number; g: string; aff: number; d: number};
const r = rng(31);
const DOTS: Dot[] = [];
for (let i = 0; i < 90; i++) {
  const t = (i / 90) * 6.283 + r() * 0.05,
    rr = 0.15 + r() * 0.05;
  DOTS.push({x: 0.5 + (Math.cos(t) * rr) / AR * 1.15, y: 0.5 + Math.sin(t) * rr, g: 'fol', aff: 2, d: 0});
}
Object.keys(G).forEach((k) => {
  for (let j = 0; j < 70; j++) {
    const a2 = r() * 6.283,
      d = Math.sqrt(r()) * 0.13;
    DOTS.push({x: G[k].cx + (Math.cos(a2) * d) / AR * 1.15, y: G[k].cy + Math.sin(a2) * d, g: k, aff: G[k].aff * (1 - (0.6 * d) / 0.13) + r() * 0.25, d});
  }
});
// reveal delay: closer to the cluster core lights first
const dr = rng(5);
const DELAY = DOTS.map((d) => Math.round((d.d / 0.13) * 22 + dr() * 10));

function reached(likes: number): boolean[] {
  const lit = DOTS.map(() => false);
  const out = DOTS.map((d, i) => ({d, i})).filter((o) => o.d.g !== 'fol');
  const kP = likes === 0 ? 0 : likes === 1 ? 30 : 85,
    kS = likes === 0 ? 0 : likes === 1 ? 12 : 70;
  out
    .slice()
    .sort((a, b) => b.d.aff - a.d.aff)
    .slice(0, kP)
    .forEach((o) => (lit[o.i] = true));
  // SimClusters, "likes from your niche"
  out
    .filter((o) => o.d.g === 'cafe' || o.d.g === 'tec')
    .map((o, i) => ({o, k: (o.d.g === 'cafe' ? 1 : 0.35) + rng(91 + i)() * 0.5}))
    .sort((a, b) => b.k - a.k)
    .slice(0, kS)
    .forEach((x) => (lit[x.o.i] = true));
  return lit;
}
const S0 = reached(0),
  S1 = reached(1),
  S2 = reached(32);

const T1 = 100,
  T2 = 262,
  TE = 412;
export const V3_FRAMES = 480;

const X = (x: number) => MX + x * MW;
const Y = (y: number) => MY + y * MH;

export const V3ReachMap: React.FC<LangProps> = ({lang = 'en'}) => {
  const f = useCurrentFrame();
  const t = T[lang];
  const b1 = prog(f, T1, 12),
    b2 = prog(f, T2, 12),
    be = prog(f, TE, 12);
  const likes =
    f < T1 ? 0 : f < T2 - 40 ? 1 : f < TE ? Math.round(interpolate(f, [T2 - 40, T2], [1, 32], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'})) : 0;
  const cap = [
    {t: t.cap[0], op: 1 - prog(f, T1 - 8, 8) + prog(f, TE + 8, 8)},
    {t: t.cap[1], op: prog(f, T1, 8) - prog(f, T2 - 8, 8)},
    {t: t.cap[2], op: prog(f, T2, 8) - prog(f, TE - 2, 8)},
  ];
  const chip = (on: number, label: string, y: number) => (
    <g>
      <rect x={652} y={y - 30} width={34} height={34} fill={on > 0.5 ? C.ana : 'none'} stroke={on > 0.5 ? C.ana : C.dim} strokeWidth={3} />
      <text x={704} y={y} fontSize={36} fontWeight={on > 0.5 ? 700 : 400} fill={on > 0.5 ? C.ink : C.dim}>
        {label}
      </text>
    </g>
  );
  const bump = (t: number) => 1 + 0.12 * Math.sin(Math.PI * prog(f, t, 14));
  return (
    <Frame title={t.title} lang={lang}>
      <svg width={1080} height={1080} style={{position: 'absolute', inset: 0}} fontFamily={FONT}>
        {/* counter */}
        <g transform={`translate(72 236) scale(${f >= T2 - 6 ? bump(T2 - 6) : bump(T1)})`}>
          <text x={0} y={0} fontSize={104} fontWeight={700} fill={likes > 0 ? C.ana : C.ink}>
            {likes}
            <tspan fontSize={52} dx={18} fill={C.ink}>
              {likes === 1 ? 'like' : 'likes'}
            </tspan>
          </text>
        </g>
        {chip(b1 - be, t.i1, 196)}
        {chip(b2 - be, t.i32, 252)}
        {cap.map((c) => (
          <text key={c.t} x={72} y={316} fontSize={38} fill={C.ink} opacity={Math.max(0, Math.min(1, c.op))}>
            {c.t}
          </text>
        ))}
        <line x1={72} x2={1008} y1={346} y2={346} stroke={C.line} strokeWidth={2} />
        {/* cluster labels */}
        {Object.keys(G).map((k) => (
          <text key={k} x={X(G[k].cx)} y={Y(G[k].cy - 0.17) + 4} fontSize={34} fontWeight={700} fill={G[k].c} textAnchor="middle">
            {t.clusters[k]}
          </text>
        ))}
        {DOTS.map((d, i) => {
          if (d.g === 'fol') return <circle key={i} cx={X(d.x)} cy={Y(d.y)} r={7} fill={C.ink} />;
          const t1 = prog(f, T1 + DELAY[i], 16),
            t2 = prog(f, T2 + DELAY[i], 16),
            te = prog(f, TE + (32 - DELAY[i]) / 2, 14);
          const v = +S0[i] + (+S1[i] - +S0[i]) * t1 + (+S2[i] - +S1[i]) * t2 + (+S0[i] - +S2[i]) * te;
          return <circle key={i} cx={X(d.x)} cy={Y(d.y)} r={5 + 3 * v} fill={v > 0.02 ? C.ana : '#cdc7ba'} opacity={0.45 + 0.55 * v} />;
        })}
        <circle cx={X(0.5)} cy={Y(0.5)} r={18} fill={C.ana} stroke={C.ink} strokeWidth={3} />
        <text x={X(0.5)} y={Y(0.5) + 56} fontSize={34} fontWeight={700} textAnchor="middle" fill={C.ink}>
          @ana
        </text>
        <text x={X(0.5)} y={Y(0.5) + 172} fontSize={34} textAnchor="middle" fill={C.ink}>
          {t.followers}
        </text>
      </svg>
    </Frame>
  );
};
