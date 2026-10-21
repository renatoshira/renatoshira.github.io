import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {C, Frame, FONT, Lang, LangProps, betaPdf, betaS, lerp, num, prog, rng} from './lib';

const T = {
  en: {
    title: '3 likes in 20 views = 5.4%',
    naive: '3 ÷ 20 = 15%',
    few: 'too few views',
    prior: 'prior 1.5% · worth 50 views',
    est: 'estimate',
    beta: 'Beta(0.75 + likes, 49.25 + views − likes)',
    draw: 'one random draw per post, per feed load',
    won: ['won slot #16: ', ' of '],
    post: 'post',
  },
  pt: {
    title: '3 likes em 20 views = 5,4%',
    naive: '3 ÷ 20 = 15%',
    few: 'poucas views',
    prior: 'prior 1,5% · vale 50 views',
    est: 'estimativa',
    beta: 'Beta(0,75 + likes; 49,25 + views − likes)',
    draw: 'um sorteio por post a cada feed',
    won: ['venceu a posição 16: ', ' de '],
    post: 'post',
  },
};

export const V4_FRAMES = 600;

/* prior: 1.5% weighted as 50 views → Beta(0.75 + likes, 49.25 + views − likes) */
const A = (l: number) => 0.75 + l;
const B = (l: number, v: number) => 49.25 + v - l;

const LIKES = [4, 11, 16];

const PartA: React.FC<{f: number; lang: Lang}> = ({f, lang}) => {
  const t = T[lang];
  const XM = 0.2,
    L = 100,
    R = 1000,
    BOT = 850,
    TOP = 470;
  const X = (x: number) => L + ((R - L) * x) / XM;
  const a = A(3),
    b = B(3, 20);
  const mean = a / (a + b);
  const ys: number[] = [];
  let mx = 0;
  for (let i = 0; i <= 300; i++) {
    const y = betaPdf((XM * i) / 300, a, b);
    ys.push(y);
    mx = Math.max(mx, y);
  }
  const k = prog(f, 165, 50);
  const sc = ((BOT - TOP - 150) / mx) * k;
  let d = `M ${X(0)} ${BOT}`;
  ys.forEach((y, i) => (d += ` L ${X((XM * i) / 300)} ${BOT - y * sc}`));
  d += ` L ${X(XM)} ${BOT} Z`;
  const views = Math.min(20, Math.max(0, Math.floor((f - 12) / 4) + 1));
  const likes = LIKES.filter((i) => i < views).length;
  const naive = prog(f, 100, 16);
  const strike = prog(f, 138, 14);
  const prior = prog(f, 150, 16);
  const est = prog(f, 210, 16);
  return (
    <g>
      {Array.from({length: 20}).map((_, i) => {
        const p = prog(f, 12 + i * 4, 10);
        const like = LIKES.includes(i);
        return (
          <g key={i}>
            <rect x={74 + i * 47} y={156} width={38} height={38} fill="none" stroke={C.gray} strokeWidth={2} />
            <rect
              x={74 + i * 47 + 19 * (1 - p)}
              y={156 + 19 * (1 - p)}
              width={38 * p}
              height={38 * p}
              fill={like ? C.ana : '#bdb7aa'}
            />
          </g>
        );
      })}
      <text x={74} y={252} fontSize={38} fill={C.ink}>
        <tspan fontWeight={700}>{views}</tspan> {lang === 'pt' && views === 1 ? 'view' : 'views'} ·{' '}
        <tspan fontWeight={700} fill={C.ana}>
          {likes}
        </tspan>{' '}
        {likes === 1 ? 'like' : 'likes'}
      </text>
      <g opacity={naive * lerp(1, 0.55, strike)}>
        <text x={74} y={346} fontSize={64} fontWeight={700} fill={C.ink}>
          {t.naive}
        </text>
        <line x1={64} x2={64 + 470 * strike} y1={324} y2={324} stroke={C.neg} strokeWidth={8} />
      </g>
      <text x={590} y={340} fontSize={34} fill={C.neg} opacity={strike}>
        {t.few}
      </text>
      {/* axis */}
      <line x1={L} x2={R} y1={BOT} y2={BOT} stroke={C.ink} strokeWidth={3} opacity={prog(f, 140, 14)} />
      {[0, 5, 10, 15, 20].map((p) => (
        <text key={p} x={X(p / 100)} y={BOT + 46} fontSize={34} fill={C.dim} textAnchor="middle" opacity={prog(f, 140, 14)}>
          {p}%
        </text>
      ))}
      <path d={d} fill="rgba(239,125,50,.22)" stroke={C.ana} strokeWidth={4} opacity={k > 0.001 ? 1 : 0} />
      {/* prior */}
      <g opacity={prior}>
        <line x1={X(0.015)} x2={X(0.015)} y1={TOP - 40} y2={BOT} stroke={C.blue} strokeWidth={3} strokeDasharray="8 8" />
        <text x={X(0.015) + 14} y={TOP - 14} fontSize={34} fill={C.blue}>
          {t.prior}
        </text>
      </g>
      {/* estimate */}
      <g opacity={est}>
        <line x1={X(mean)} x2={X(mean)} y1={TOP + 40} y2={BOT} stroke={C.ana} strokeWidth={4} />
        <text x={X(mean) + 16} y={TOP + 74} fontSize={52} fontWeight={700} fill={C.ana}>
          {t.est} {num(mean * 100, 1, lang)}%
        </text>
      </g>
      <text x={74} y={972} fontSize={34} fill={C.ink} opacity={prog(f, 228, 16)}>
        {t.beta}
      </text>
    </g>
  );
};

/* ---------- part B: Thompson sampling for slot #16 ---------- */
const POSTS = [
  {n: '@ana', l: 3, v: 20, s: 0.5, ana: true},
  {n: 'post A', l: 2, v: 150, s: 0.6},
  {n: 'post B', l: 6, v: 180, s: 0.45},
  {n: 'post C', l: 1, v: 12, s: 0.55},
  {n: 'post D', l: 3, v: 70, s: 0.5},
];
const ROUNDS: {sm: number[]; fin: number[]; win: number}[] = [];
{
  const r = rng(7);
  for (let k = 0; k < 18; k++) {
    const sm = POSTS.map((p) => betaS(A(p.l), B(p.l, p.v), r));
    const srt = sm.map((x, i) => ({x, i})).sort((a, b) => b.x - a.x);
    const t = [srt[0].i, srt[1].i];
    const win = POSTS[t[0]].s >= POSTS[t[1]].s ? t[0] : t[1];
    ROUNDS.push({sm, fin: t, win});
  }
}
const RB0 = 352,
  RSTEP = 12;

const PartB: React.FC<{f: number; lang: Lang}> = ({f, lang}) => {
  const t = T[lang];
  const XM = 0.16,
    L = 300,
    R = 1000,
    TOP = 196,
    RH = 140;
  const X = (x: number) => L + ((R - L) * Math.min(x, XM)) / XM;
  const k = Math.floor((f - RB0) / RSTEP);
  const cur = k >= 0 ? ROUNDS[Math.min(k, ROUNDS.length - 1)] : null;
  const prev = k >= 1 ? ROUNDS[Math.min(k - 1, ROUNDS.length - 1)] : null;
  const local = k >= 0 ? f - RB0 - k * RSTEP : 0;
  const pos = (rd: (typeof ROUNDS)[0]) => {
    const i = rd.win;
    return {x: X(rd.sm[i]), y: TOP + (i + 1) * RH - 22};
  };
  let badge: {x: number; y: number} | null = null;
  if (cur) {
    const p1 = pos(cur);
    if (prev) {
      const p0 = pos(prev);
      const t = interpolate(local, [0, 7], [0, 1], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
      const e = 1 - Math.pow(1 - t, 3);
      badge = {x: lerp(p0.x, p1.x, e), y: lerp(p0.y, p1.y, e) - Math.sin(Math.PI * t) * 40};
    } else badge = p1;
  }
  const wins = ROUNDS.slice(0, Math.max(0, Math.min(k + 1, ROUNDS.length))).filter((r) => r.win === 0).length;
  const n = Math.max(0, Math.min(k + 1, ROUNDS.length));
  return (
    <g>
      <text x={72} y={166} fontSize={34} fill={C.dim}>
        {t.draw}
      </text>
      {POSTS.map((p, i) => {
        const a = A(p.l),
          b = B(p.l, p.v);
        const y0 = TOP + (i + 1) * RH - 22;
        let mx = 0;
        const ys: number[] = [];
        for (let j = 0; j <= 200; j++) {
          const y = betaPdf((XM * j) / 200, a, b);
          ys.push(y);
          mx = Math.max(mx, y);
        }
        const s = (RH - 36) / mx;
        let d = `M ${X(0)} ${y0}`;
        ys.forEach((y, j) => (d += ` L ${X((XM * j) / 200)} ${y0 - y * s}`));
        d += ` L ${X(XM)} ${y0} Z`;
        const fin = cur ? cur.fin.includes(i) : false;
        const win = cur ? cur.win === i : false;
        return (
          <g key={p.n}>
            <path d={d} fill={p.ana ? 'rgba(239,125,50,.25)' : 'rgba(20,20,20,.07)'} stroke={p.ana ? C.ana : '#777'} strokeWidth={2.5} />
            <line x1={L} x2={R} y1={y0} y2={y0} stroke={C.line} strokeWidth={2} />
            <text x={72} y={y0 - 50} fontSize={38} fontWeight={700} fill={p.ana ? C.ana : C.ink}>
              {p.n}
            </text>
            <text x={72} y={y0 - 8} fontSize={34} fill={C.dim}>
              {p.l}/{p.v}
            </text>
            {cur && (
              <circle
                cx={X(cur.sm[i])}
                cy={y0 - 8}
                r={win ? 14 : 10}
                fill={win ? (p.ana ? C.ana : C.ink) : C.white}
                stroke={C.ink}
                strokeWidth={fin ? 4 : 2}
                opacity={interpolate(local, [0, 3], [0.3, 1], {extrapolateRight: 'clamp'})}
              />
            )}
          </g>
        );
      })}
      {[0, 5, 10, 15].map((q) => (
        <text key={q} x={X(q / 100)} y={TOP + 5 * RH + 30} fontSize={34} fill={C.dim} textAnchor="middle">
          {q}%
        </text>
      ))}
      {badge && (
        <g transform={`translate(${Math.min(badge.x + 26, R - 96)} ${badge.y - 70})`}>
          <rect x={0} y={0} width={104} height={50} rx={25} fill={cur!.win === 0 ? C.ana : C.ink} />
          <text x={52} y={36} fontSize={34} fontWeight={700} fill={C.white} textAnchor="middle">
            #16
          </text>
        </g>
      )}
      <text x={1008} y={990} fontSize={38} fill={C.ink} textAnchor="end" opacity={n > 0 ? 1 : 0}>
        <tspan fill={C.ana} fontWeight={700}>
          @ana
        </tspan>{' '}
        {t.won[0]}
        {wins}
        {t.won[1]}
        {n}
      </text>
    </g>
  );
};

export const V4ColdStart: React.FC<LangProps> = ({lang = 'en'}) => {
  const f = useCurrentFrame();
  const aOut = prog(f, 300, 24, true);
  const bIn = prog(f, 318, 24, true);
  const bOut = prog(f, 572, 20, true);
  const aBack = prog(f, 580, 18, true); // empty squares return for the loop
  return (
    <Frame title={T[lang].title} lang={lang}>
      <svg width={1080} height={1080} style={{position: 'absolute', inset: 0}} fontFamily={FONT}>
        <g opacity={f < 560 ? 1 - aOut : aBack}>
          <PartA f={f < 560 ? f : 0} lang={lang} />
        </g>
        <g opacity={bIn * (1 - bOut)}>
          <PartB f={f} lang={lang} />
        </g>
      </svg>
    </Frame>
  );
};
