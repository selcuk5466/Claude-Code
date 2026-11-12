import React from 'react';
import {AbsoluteFill, Easing, interpolate, random, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const C = {
  bg: '#071426', card: '#10243d', gold: '#d6ad52', gold2: '#ffd36b', red: '#f05b66', green: '#35c987',
  white: '#f7f4ed', grey: '#aebbc9', line: '#29415d', blue: '#3b82f6', purple: '#8b5cf6',
};
export const FONT = "Inter, 'Helvetica Neue', Arial, sans-serif";

export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const prog = (t: number, a: number, d: number) => clamp((t - a) / d);
export const ease = (p: number) => Easing.out(Easing.cubic)(clamp(p));

export const fmt = (v: number, dec = 0, pre = '', suf = '') => {
  const s = v.toLocaleString('en-US', {minimumFractionDigits: dec, maximumFractionDigits: dec});
  return pre + s.replace(/,/g, 'X').replace(/\./g, ',').replace(/X/g, '.') + suf;
};

export const useTL = () => {
  const f = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const t = f / fps;
  return {
    t, f, fps, durationInFrames,
    p: (t0: number, d: number) => ease(prog(t, t0, d)),
    raw: (t0: number, d: number) => prog(t, t0, d),
    pop: (t0: number) => spring({frame: Math.max(0, f - Math.round(t0 * fps)), fps, config: {damping: 13, stiffness: 140, mass: 0.8}}),
    count: (t0: number, d: number, v0: number, v1: number, dec: number, final: string, pre = '', suf = '') => {
      const q = ease(prog(t, t0, d));
      return q >= 1 ? final : fmt(v0 + (v1 - v0) * q, dec, pre, suf);
    },
  };
};

type TxProps = {
  x: number; y: number; s?: number; c?: string; wt?: number; o?: number; w?: number; align?: 'left' | 'center' | 'right';
  glow?: string; style?: React.CSSProperties; children: React.ReactNode; lh?: number; ls?: number;
};
export const Tx: React.FC<TxProps> = ({x, y, s = 32, c = C.white, wt = 700, o = 1, w, align = 'left', glow, style, children, lh = 1.15, ls = 0}) => (
  <div style={{
    position: 'absolute', left: align === 'center' && w ? x - w / 2 : align === 'right' && w ? x - w : x, top: y, width: w,
    fontFamily: FONT, fontSize: s, fontWeight: wt, color: c, opacity: o, textAlign: align, lineHeight: lh, letterSpacing: ls,
    whiteSpace: 'pre-wrap', fontVariantNumeric: 'tabular-nums',
    textShadow: glow ? `0 0 28px ${glow}88, 0 0 60px ${glow}44` : undefined, ...style,
  }}>{children}</div>
);

export const Label: React.FC<{x: number; y: number; o?: number; children: React.ReactNode; c?: string; s?: number}> = ({x, y, o = 1, children, c = C.grey, s = 24}) => (
  <Tx x={x} y={y} s={s} c={c} wt={800} o={o} ls={2.5}>{children}</Tx>
);

export const Card: React.FC<{x: number; y: number; w: number; h: number; t0: number; accent?: string; children?: React.ReactNode; style?: React.CSSProperties}> =
  ({x, y, w, h, t0, accent, children, style}) => {
    const {pop, p} = useTL();
    const sp = pop(t0); const o = p(t0, 0.35);
    return (
      <div style={{
        position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 30,
        background: 'linear-gradient(155deg, rgba(30,62,104,.93) 0%, rgba(13,32,58,.93) 100%)',
        border: '1px solid rgba(255,255,255,.10)',
        boxShadow: `0 28px 70px rgba(0,0,0,.5), 0 0 ${accent ? 60 : 0}px ${accent ? accent + '30' : 'transparent'}, inset 0 1px 0 rgba(255,255,255,.10)`,
        opacity: o, transform: `translateY(${(1 - sp) * 70}px) scale(${0.93 + 0.07 * sp})`, overflow: 'hidden', ...style,
      }}>
        {accent && <div style={{position: 'absolute', left: 0, top: 0, right: 0, height: 9, background: `linear-gradient(90deg, ${accent}, ${accent}00)`}} />}
        {children}
      </div>
    );
  };

export const Arrow: React.FC<{x: number; y: number; size: number; color: string; up?: boolean; o?: number; bounce?: number}> = ({x, y, size, color, up = true, o = 1, bounce = 0}) => {
  const {t} = useTL();
  const off = Math.sin(t * 4) * bounce * (up ? -1 : 1);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{position: 'absolute', left: x - size / 2, top: y - size / 2 + off, opacity: o, filter: `drop-shadow(0 0 18px ${color}99)`}}>
      <g transform={up ? '' : 'rotate(180 50 50)'}>
        <path d="M50 8 L92 52 L66 52 L66 92 L34 92 L34 52 L8 52 Z" fill={color} />
      </g>
    </svg>
  );
};

export const Pill: React.FC<{x: number; y: number; w: number; h: number; bg: string; c: string; s?: number; o?: number; scale?: number; children: React.ReactNode}> = ({x, y, w, h, bg, c, s = 30, o = 1, scale = 1, children}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: h / 2, background: bg, color: c, opacity: o, transform: `scale(${scale})`,
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: s, letterSpacing: 2, boxShadow: `0 0 40px ${bg}66`}}>{children}</div>
);

export const Header: React.FC<{title: string; sub?: string}> = ({title, sub}) => {
  const {p} = useTL();
  const a = p(0, 0.5);
  return (
    <>
      <Tx x={110 - 80 * (1 - a)} y={52} s={72} wt={900} o={a} ls={-1}>{title}</Tx>
      <div style={{position: 'absolute', left: 110, top: 148, width: 300 * p(0.15, 0.7), height: 7, borderRadius: 4, background: `linear-gradient(90deg, ${C.gold2}, ${C.gold})`, boxShadow: `0 0 24px ${C.gold}99`}} />
      {sub && <Tx x={110} y={172} s={32} wt={500} c={C.grey} o={p(0.3, 0.5)}>{sub}</Tx>}
    </>
  );
};

export const Shell: React.FC<{title?: string; sub?: string; children: React.ReactNode}> = ({title, sub, children}) => {
  const {f, durationInFrames} = useTL();
  const out = interpolate(f, [durationInFrames - 9, durationInFrames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: out}}>
      {title && <Header title={title} sub={sub} />}
      {children}
    </AbsoluteFill>
  );
};

export const Bg: React.FC<{total: number}> = ({total}) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const parts = Array.from({length: 26}, (_, i) => {
    const sx = random('x' + i) * 1920, sp = 12 + random('s' + i) * 26, sz = 3 + random('z' + i) * 6;
    const y = 1080 - ((random('y' + i) * 1080 + t * sp) % 1180);
    return <div key={i} style={{position: 'absolute', left: sx + Math.sin(t * 0.6 + i) * 24, top: y, width: sz, height: sz, borderRadius: '50%',
      background: i % 3 === 0 ? C.gold : '#7fb2ff', opacity: 0.18 + 0.2 * random('o' + i)}} />;
  });
  const g = (t * 9) % 120;
  return (
    <AbsoluteFill style={{background: 'linear-gradient(160deg, #040d1b 0%, #08182f 50%, #0c2240 100%)'}}>
      <div style={{position: 'absolute', left: -250 + Math.sin(t * 0.30) * 180, top: -300 + Math.cos(t * 0.25) * 130, width: 1200, height: 1200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(214,173,82,.20), rgba(214,173,82,0) 66%)'}} />
      <div style={{position: 'absolute', left: 1000 + Math.cos(t * 0.27) * 180, top: 380 + Math.sin(t * 0.22) * 140, width: 1200, height: 1200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,.20), rgba(59,130,246,0) 66%)'}} />
      <div style={{position: 'absolute', left: 500 + Math.sin(t * 0.18) * 220, top: 600 + Math.cos(t * 0.3) * 100, width: 900, height: 900, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,.13), rgba(139,92,246,0) 66%)'}} />
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.028) 1px, transparent 1px)', backgroundSize: '120px 120px', backgroundPosition: `${g}px ${g}px`}} />
      {parts}
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,.45) 100%)'}} />
    </AbsoluteFill>
  );
};

const TICK = [
  ['ALTIN (ONS)', '≈3.950 $', '▼', C.red], ['S&P 500', '7.619  +%1,31', '▲', C.green], ['NASDAQ', '25.466  +%1,60', '▲', C.green],
  ['DOW JONES', '52.486  +%0,49', '▲', C.green], ['BRENT', '≈92-93 $', '', C.gold], ['WTI', '≈85-86 $', '', C.gold],
  ['BIST 100', '11.666', '', C.white], ['DOLAR/TL', '50,23', '', C.white], ['EURO/TL', '55,80', '', C.white], ['BITCOIN', '≈75 BİN $', '', C.white],
];
export const Ticker: React.FC<{total: number}> = ({total}) => {
  const f = useCurrentFrame();
  const IW = 470, CW = IW * TICK.length;
  const x = -((f * 2.4) % CW);
  const row = (k: number) => TICK.map(([n, v, a, col], i) => (
    <div key={k + '-' + i} style={{width: IW, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: FONT, fontSize: 26, fontWeight: 700, color: C.grey, letterSpacing: 1}}>
      <span style={{color: C.grey, fontWeight: 800}}>{n}</span><span style={{color: col as string, fontWeight: 900}}>{v} {a}</span><span style={{color: C.line}}>|</span>
    </div>));
  return (
    <>
      <div style={{position: 'absolute', left: 0, bottom: 0, width: 1920, height: 66, background: 'linear-gradient(180deg, rgba(4,10,20,.94), rgba(3,8,16,.98))', borderTop: `2px solid ${C.gold}66`}}>
        <div style={{position: 'absolute', left: 430, right: 0, top: 0, bottom: 0, overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', height: '100%', transform: `translateX(${x}px)`}}>{row(0)}{row(1)}</div>
        </div>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 430, background: 'linear-gradient(90deg, #04101f 80%, rgba(4,16,31,0))', display: 'flex', alignItems: 'center', paddingLeft: 40, fontFamily: FONT, fontWeight: 800, fontSize: 21, letterSpacing: 2, color: C.gold}}>
          YATIRIM TAVSİYESİ DEĞİLDİR
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, bottom: 0, height: 5, width: (f / total) * 1920, background: `linear-gradient(90deg, ${C.gold}, ${C.gold2})`, boxShadow: `0 0 18px ${C.gold}`}} />
    </>
  );
};
