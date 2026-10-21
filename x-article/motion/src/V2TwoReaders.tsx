import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C, Frame, FONT, Lang, LangProps, num, prog} from './lib';

const T = {
  en: {
    title: 'Same post. Two scores.',
    post: 'My 3-pour V60 recipe',
    bia: 'follows coffee',
    caio: 'only soccer',
    hi: 'biggest bar: reply',
    l: {reply: 'reply', link: 'copy link', like: 'like', others: 'others', negatives: 'negatives', positives: 'positives', ni: 'not interested', mute: 'mute', report: 'report'},
  },
  pt: {
    title: 'Mesmo post. Duas notas.',
    post: 'Minha receita de V60 em 3 despejos',
    bia: 'segue contas de café',
    caio: 'só vê futebol',
    hi: 'maior barra: reply',
    l: {reply: 'reply', link: 'copiar link', like: 'like', others: 'outros', negatives: 'negativos', positives: 'positivos', ni: 'não tenho\ninteresse', mute: 'silenciar', report: 'denunciar'},
  },
};

// Same numbers as the essay (W5, preset "useful"): contribution = P(action) × weight
const ACT = [
  {k: 'like', w: 0.66},
  {k: 'reply', w: 5},
  {k: 'link', w: 20},
  {k: 'rt', w: 1},
  {k: 'read', w: 0.4},
  {k: 'ni', w: -52.272},
  {k: 'mute', w: -58.8},
  {k: 'rep', w: -234},
];
const P = {
  bia: {like: 0.12, reply: 0.03, link: 0.005, rt: 0.02, read: 0.1, ni: 0.001, mute: 0.0005, rep: 0.00002},
  caio: {like: 0.01, reply: 0.001, link: 0.0002, rt: 0.001, read: 0.02, ni: 0.015, mute: 0.004, rep: 0.0001},
};
const c = (who: 'bia' | 'caio', k: string) => P[who][k] * ACT.find((a) => a.k === k)!.w;

type Seg = {v: number; label?: string; labelY?: number; hi?: boolean; label2?: string};

const S = 330; // px per score unit
const B = 604; // zero baseline

const fmt = (v: number, lang: Lang = 'en') => (v > 0.0005 ? '+' : v < -0.0005 ? '−' : '') + num(Math.abs(v), 2, lang);

const BIA: Seg[] = [
  {v: c('bia', 'reply'), label: 'reply', hi: true},
  {v: c('bia', 'link'), label: 'link'},
  {v: c('bia', 'like'), label: 'like'},
  {v: c('bia', 'read') + c('bia', 'rt'), label: 'others'},
  {v: c('bia', 'ni'), label: 'negatives', label2: 'neg'},
  {v: c('bia', 'mute')},
  {v: c('bia', 'rep')},
];
const CAIO: Seg[] = [
  {v: ['like', 'reply', 'link', 'rt', 'read'].reduce((s, k) => s + c('caio', k), 0), label: 'positives'},
  {v: c('caio', 'ni'), label: 'ni'},
  {v: c('caio', 'mute'), label: 'mute'},
  {v: c('caio', 'rep'), label: 'report'},
];

const Reader: React.FC<{
  x: number;
  name: string;
  emoji: string;
  bg: string;
  sub: string;
  segs: Seg[];
  start: number;
  out: number;
  hiStart?: number;
  labelYs: number[];
  labelTexts: string[];
  lang: Lang;
  hiText: string;
}> = ({x, name, emoji, bg, sub, segs, start, out, hiStart, labelYs, labelTexts, lang, hiText}) => {
  const f = useCurrentFrame();
  const BW = 74;
  let up = 0,
    down = 0,
    total = 0;
  const hi = hiStart != null ? prog(f, hiStart, 16) * (1 - out) : 0;
  const rects: React.ReactNode[] = [];
  const grown = segs.map((s, i) => prog(f, start + i * 12, 22) * (1 - out));
  segs.forEach((s, i) => {
    const g = grown[i];
    const h = Math.abs(s.v) * S * g;
    total += s.v * g;
    let y: number;
    if (s.v >= 0) {
      y = B - up - h;
      up += h;
    } else {
      y = B + down;
      down += h;
    }
    rects.push(
      <rect key={i} x={x} y={y} width={BW} height={h} fill={s.v >= 0 ? C.pos : C.neg} stroke={C.paper} strokeWidth={h > 4 ? 2 : 0} />,
    );
    if (s.hi && hi > 0) {
      rects.push(<rect key={'h' + i} x={x - 6} y={y - 4} width={BW + 12} height={h + 8} fill="none" stroke={C.ana} strokeWidth={6} opacity={hi} />);
    }
  });
  // segment centers for leader lines
  let u2 = 0,
    d2 = 0;
  const centers = segs.map((s) => {
    const h = Math.abs(s.v) * S;
    if (s.v >= 0) {
      u2 += h;
      return B - u2 + h / 2;
    }
    d2 += h;
    return B + d2 - h / 2;
  });
  const shownTotal = Math.abs(total) < 0.005 ? num(0, 2, lang) : fmt(total, lang);
  const totCol = Math.abs(total) < 0.005 ? C.dim : total > 0 ? C.pos : C.neg;
  const labelled = segs.map((s, i) => ({s, i})).filter((o) => o.s.label);
  return (
    <g>
      {/* header */}
      <circle cx={x + 36} cy={330} r={38} fill={bg} />
      <text x={x + 36} y={344} fontSize={38} textAnchor="middle">
        {emoji}
      </text>
      <text x={x + 92} y={345} fontSize={44} fontWeight={700} fill={C.ink}>
        {name}
      </text>
      <text x={x + 430} y={352} fontSize={64} fontWeight={700} fill={totCol} textAnchor="end">
        {shownTotal}
      </text>
      <text x={x} y={410} fontSize={34} fill={C.dim} opacity={1 - hi}>
        {sub}
      </text>
      <text x={x} y={410} fontSize={34} fontWeight={700} fill={C.ana} opacity={hi}>
        {hiText}
      </text>
      {/* baseline */}
      <line x1={x - 18} x2={x + BW + 18} y1={B} y2={B} stroke={C.ink} strokeWidth={3} />
      {rects}
      {labelled.map(({s, i}, j) => {
        const op = prog(f, start + i * 12 + 10, 14) * (1 - out);
        const ly = labelYs[j];
        const strong = s.hi && hi > 0.5;
        return (
          <g key={i} opacity={op}>
            <polyline
              points={`${x + BW + 6},${centers[i]} ${x + BW + 22},${centers[i]} ${x + BW + 34},${ly - 11}`}
              fill="none"
              stroke={C.dim}
              strokeWidth={1.5}
            />
            <text x={x + BW + 40} y={ly} fontSize={lang === 'pt' ? 32 : 34} letterSpacing={lang === 'pt' ? -0.6 : undefined} fill={strong ? C.ana : C.ink} fontWeight={strong ? 700 : 400}>
              {labelTexts[j].split('\n').map((ln, q) => (
                <tspan key={q} x={x + BW + 40} dy={q === 0 ? 0 : 40}>
                  {ln}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export const V2_FRAMES = 540;

export const V2TwoReaders: React.FC<LangProps> = ({lang = 'en'}) => {
  const f = useCurrentFrame();
  const t = T[lang];
  const L = t.l as Record<string, string>;
  const out = prog(f, 470, 40, true);
  const biaLabels = BIA.filter((s) => s.label).map((s) => `${L[s.label!]} ${fmt(s.v, lang)}`);
  biaLabels[4] = `${L.negatives} ${fmt(c('bia', 'ni') + c('bia', 'mute') + c('bia', 'rep'), lang)}`;
  const caioLabels = CAIO.map((s) => (s.label === 'ni' ? L.ni : `${L[s.label!]} ${fmt(s.v, lang)}`));
  // pt: "não tenho interesse" wraps to two lines, so its value moves down one line
  const niValueY = lang === 'pt' ? 820 : 780;
  return (
    <Frame title={t.title} lang={lang}>
      {/* post card */}
      <div
        style={{
          position: 'absolute',
          left: 72,
          right: 72,
          top: 146,
          height: 104,
          border: `3px solid ${C.ink}`,
          background: C.white,
          display: 'flex',
          alignItems: 'center',
          padding: '0 28px',
          gap: 22,
          fontSize: lang === 'pt' ? 31 : 34,
        }}
      >
        <div style={{width: 58, height: 58, borderRadius: 29, background: C.ana, flexShrink: 0}} />
        <div>
          <b style={{color: C.ana}}>@ana</b> <span style={{color: C.dim}}>·</span> {t.post}
        </div>
      </div>
      <svg width={1080} height={1080} style={{position: 'absolute', inset: 0}} fontFamily={FONT}>
        <line x1={540} x2={540} y1={300} y2={980} stroke={C.line} strokeWidth={2} />
        <Reader x={92} name="Bia" emoji="☕" bg="#e9dccb" sub={t.bia} segs={BIA} start={24} out={out} hiStart={150} labelYs={[592, 552, 512, 472, 664]} labelTexts={biaLabels} lang={lang} hiText={t.hi} />
        <Reader
          x={582}
          name="Caio"
          emoji="⚽"
          bg="#d6e8dc"
          sub={t.caio}
          segs={CAIO}
          start={210}
          out={out}
          labelYs={[584, 736, 912, 962]}
          labelTexts={caioLabels}
          lang={lang}
          hiText={t.hi}
        />
        {/* value line under "not interested" */}
        <text x={582 + 74 + 40} y={niValueY} fontSize={lang === 'pt' ? 32 : 34} fill={C.ink} opacity={prog(f, 210 + 12 + 10, 14) * (1 - out)}>
          {fmt(c('caio', 'ni'), lang)}
        </text>
      </svg>
    </Frame>
  );
};
