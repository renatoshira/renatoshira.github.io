import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, Frame, FONT, Lang, LangProps, lerp, loc, prog} from './lib';

const T = {
  en: {
    title: 'What each action is worth',
    sub: 'in likes · weight ÷ like weight (0.66)',
    rows: ['copy link', 'reply', 'quote', 'DM', 'follow', 'like', 'bookmark', 'not interested', 'mute', 'report'],
    card1: 'Bookmark',
    card2: 'Copy link',
  },
  pt: {
    title: 'Quanto vale cada ação',
    sub: 'em likes · peso ÷ peso do like (0,66)',
    rows: ['copiar link', 'reply', 'quote', 'DM', 'seguir', 'like', 'salvar', 'não tenho interesse', 'silenciar', 'denunciar'],
    card1: 'Salvar',
    card2: 'Copiar link',
  },
};

// weights from the home-mixer scorer; "×" = weight / like weight (0.66)
const ROWS = [
  {n: 'copy link', w: 20, t: '30×'},
  {n: 'reply', w: 5, t: '7.6×'},
  {n: 'quote', w: 5, t: '7.6×'},
  {n: 'DM', w: 5, t: '7.6×'},
  {n: 'follow', w: 4, t: '6×'},
  {n: 'like', w: 0.66, t: '1×'},
  {n: 'bookmark', w: 0, t: '0'},
  {n: 'not interested', w: -52.272, t: '−79×'},
  {n: 'mute', w: -58.8, t: '−89×'},
  {n: 'report', w: -234, t: '−355×'},
].map((r) => ({...r, x: r.w / 0.66}));

const Y0 = 256;
const RH = 70;
const BH = 40;
export const V1_FRAMES = 540;

export const V1Weights: React.FC<LangProps> = ({lang = 'en'}) => {
  const t = T[lang];
  const pt = lang === 'pt';
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const out = prog(f, 468, 42, true); // everything retracts
  const zoom = prog(f, 196, 36, true) * (1 - out);
  const axis = lerp(380, pt ? 560 : 580, zoom);
  const scale = lerp(16.5, 6.0, zoom);
  const card = prog(f, 372, 22) * (1 - prog(f, 450, 20, true));

  const starts = [24, 42, 56, 70, 86, 104, 124, 244, 274, 312];

  return (
    <Frame title={t.title} lang={lang}>
      <div style={{position: 'absolute', left: 72, top: 134, fontSize: 34, color: C.dim}}>
        {t.sub}
      </div>
      <svg width={1080} height={1080} style={{position: 'absolute', inset: 0}} fontFamily={FONT}>
        <line x1={axis} x2={axis} y1={Y0 - 34} y2={Y0 + 9 * RH + 34} stroke={C.ink} strokeWidth={3} />
        {ROWS.map((r, i) => {
          const y = Y0 + i * RH;
          const g = prog(f, starts[i], i === 9 ? 46 : 26) * (1 - out);
          const len = Math.abs(r.x) * scale * g;
          const pos = r.w > 0;
          const neg = r.w < 0;
          const x = neg ? axis - len : axis;
          const valOp = prog(f, starts[i] + 10, 14) * (1 - out);
          return (
            <g key={r.n}>
              {neg ? (
                <text x={axis + 22} y={y + 12} fontSize={pt ? 31 : 34} letterSpacing={pt ? -0.5 : undefined} fill={C.ink}>
                  {t.rows[i]}
                  <tspan dx={12} fontWeight={700} fontSize={pt ? 34 : 36} fill={C.neg} opacity={valOp}>
                    {loc(r.t, lang)}
                  </tspan>
                </text>
              ) : (
                <text x={axis - 22} y={y + 12} fontSize={34} fill={C.ink} textAnchor="end">
                  {t.rows[i]}
                </text>
              )}
              {r.w !== 0 && <rect x={x} y={y - BH / 2} width={len} height={BH} fill={pos ? C.pos : C.neg} />}
              {pos && (
                <text x={axis + len + 14} y={y + 13} fontSize={38} fontWeight={700} fill={C.pos} opacity={valOp}>
                  {loc(r.t, lang)}
                </text>
              )}
              {r.w === 0 && <rect x={axis} y={y - BH / 2} width={lerp(0, 120, prog(f, starts[i], 20)) * (1 - out)} height={BH} fill="none" stroke={C.gray} strokeWidth={2} strokeDasharray="6 6" />}
            </g>
          );
        })}
        {/* report runs off-frame */}
        {(() => {
          const y = Y0 + 9 * RH;
          const g = prog(f, starts[9], 46) * (1 - out);
          const left = axis - 354.5 * scale * g;
          const op = Math.min(1, Math.max(0, (20 - left) / 40));
          return (
            <g opacity={op}>
              <path d={`M ${30} ${y} l 22 -14 v 28 z`} fill={C.white} />
              <path d={`M ${62} ${y} l 22 -14 v 28 z`} fill={C.white} />
            </g>
          );
        })()}
        {/* bookmark stamp */}
        {(() => {
          const y = Y0 + 6 * RH;
          const s = spring({frame: f - 146, fps, config: {damping: 12, stiffness: 160}});
          const op = Math.min(1, Math.max(0, f - 146) / 4) * (1 - out);
          const sc = lerp(1.8, 1, Math.min(s, 1.2));
          return (
            <g transform={`translate(${axis + 64} ${y}) rotate(-8) scale(${sc})`} opacity={op}>
              <rect x={-38} y={-34} width={76} height={68} rx={6} fill="none" stroke={C.neg} strokeWidth={5} />
              <text x={0} y={18} fontSize={52} fontWeight={700} fill={C.neg} textAnchor="middle">
                0
              </text>
            </g>
          );
        })()}
      </svg>
      <div style={{position: 'absolute', inset: 0, background: C.paper, opacity: card * 0.75}} />
      {/* end card */}
      <div
        style={{
          position: 'absolute',
          left: 120,
          right: 120,
          top: 400,
          padding: '48px 40px',
          background: C.white,
          border: `4px solid ${C.ink}`,
          boxShadow: `10px 10px 0 ${C.ink}`,
          opacity: card,
          transform: `translateY(${lerp(30, 0, card)}px)`,
          fontSize: pt ? 52 : 58,
          fontWeight: 700,
          lineHeight: 1.35,
          textAlign: 'center',
        }}
      >
        <div>
          {t.card1}: <span style={{color: C.neg}}>0</span>.
        </div>
        <div>
          {t.card2}: <span style={{color: C.pos}}>30 likes</span>.
        </div>
      </div>
    </Frame>
  );
};
