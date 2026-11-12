import React from 'react';
import {AbsoluteFill, Sequence, interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';
import data from './short.json';
import {Arrow, C, FONT, Pill, Tx, clamp, fmt, useTL} from './ui';

export const SHORT_FPS = 30;
export const SHORT_TOTAL = Math.ceil(data.total * SHORT_FPS);

const ShortBg: React.FC = () => {
  const f = useCurrentFrame(); const t = f / 30;
  const parts = Array.from({length: 22}, (_, i) => {
    const sx = random('sx' + i) * 1080, sp = 14 + random('ss' + i) * 30, sz = 3 + random('sz' + i) * 6;
    return <div key={i} style={{position: 'absolute', left: sx + Math.sin(t * 0.6 + i) * 20, top: 1920 - ((random('sy' + i) * 1920 + t * sp) % 2020), width: sz, height: sz, borderRadius: '50%',
      background: i % 3 === 0 ? C.gold : '#7fb2ff', opacity: 0.18 + 0.2 * random('so' + i)}} />;
  });
  const g = (t * 9) % 120;
  return (
    <AbsoluteFill style={{background: 'linear-gradient(170deg, #040d1b 0%, #08182f 50%, #0c2240 100%)'}}>
      <div style={{position: 'absolute', left: -300 + Math.sin(t * 0.3) * 160, top: -200 + Math.cos(t * 0.25) * 120, width: 1300, height: 1300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(214,173,82,.22), rgba(214,173,82,0) 66%)'}} />
      <div style={{position: 'absolute', left: 300 + Math.cos(t * 0.27) * 160, top: 900 + Math.sin(t * 0.22) * 160, width: 1400, height: 1400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,.22), rgba(59,130,246,0) 66%)'}} />
      <div style={{position: 'absolute', left: -200 + Math.sin(t * 0.18) * 200, top: 1300 + Math.cos(t * 0.3) * 120, width: 1100, height: 1100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,.14), rgba(139,92,246,0) 66%)'}} />
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.028) 1px, transparent 1px)', backgroundSize: '120px 120px', backgroundPosition: `${g}px ${g}px`}} />
      {parts}
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,.45) 100%)'}} />
    </AbsoluteFill>
  );
};

const Fade: React.FC<{children: React.ReactNode; out?: boolean}> = ({children, out = true}) => {
  const {f, durationInFrames} = useTL();
  const o = out ? interpolate(f, [durationInFrames - 7, durationInFrames], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;
  return <AbsoluteFill style={{opacity: o}}>{children}</AbsoluteFill>;
};

const Coin: React.FC<{x: number; y: number; size: number; o?: number}> = ({x, y, size, o = 1}) => (
  <div style={{position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: '50%', opacity: o,
    background: `radial-gradient(circle at 35% 30%, #fff1b8, ${C.gold} 55%, #8a6a22)`, boxShadow: `0 0 50px ${C.gold}99`, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: FONT, fontWeight: 900, fontSize: size * 0.55, color: '#6b4d10'}}>$</div>
);

const Card: React.FC<{x: number; y: number; w: number; h: number; t0: number; accent: string; children?: React.ReactNode}> = ({x, y, w, h, t0, accent, children}) => {
  const {pop, p} = useTL(); const s = pop(t0); const o = p(t0, 0.3);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 32, opacity: o, transform: `translateY(${(1 - s) * 80}px) scale(${0.92 + 0.08 * s})`, overflow: 'hidden',
      background: 'linear-gradient(155deg, rgba(30,62,104,.94) 0%, rgba(13,32,58,.94) 100%)', border: '1px solid rgba(255,255,255,.10)',
      boxShadow: `0 28px 70px rgba(0,0,0,.5), 0 0 60px ${accent}30, inset 0 1px 0 rgba(255,255,255,.10)`}}>
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 14, background: `linear-gradient(180deg, ${accent}, ${accent}55)`, boxShadow: `0 0 26px ${accent}`}} />
      {children}
    </div>
  );
};

const VBar: React.FC<{x: number; base: number; w: number; h: number; color: string}> = ({x, base, w, h, color}) => (
  <div style={{position: 'absolute', left: x, top: base - h, width: w, height: Math.max(0, h), borderRadius: '24px 24px 0 0',
    background: `linear-gradient(180deg, ${color}, ${color}99)`, boxShadow: `0 0 60px ${color}66, inset 0 2px 0 rgba(255,255,255,.35)`}} />
);

// ----------------------------------------------------------------------------- sahne A: kanca
const SA: React.FC = () => {
  const {t, p, pop} = useTL();
  const shake = t > 1.0 && t < 2.2 ? Math.sin(t * 90) * 9 * (1 - (t - 1.0) / 1.2) : 0;
  const coin = Math.min(1.06, pop(1.6));
  return (
    <Fade>
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 40%, rgba(240,91,102,${0.42 * (1 - p(0, 1.1))}), rgba(240,91,102,0) 60%)`}} />
      <Pill x={60} y={150} w={400} h={72} bg={C.gold} c="#07142a" s={32} scale={pop(0.1)}>12 KASIM 2026</Pill>
      <Tx x={60 - 100 * (1 - p(0.2, 0.5))} y={270} s={250} wt={900} o={p(0.2, 0.4)} ls={-6}>ALTIN</Tx>
      <Tx x={60 + shake} y={520} s={214} wt={900} o={p(0.7, 0.4)} ls={-6} glow={C.red}>4.000 $</Tx>
      <Tx x={60 - 100 * (1 - p(1.2, 0.5))} y={745} s={196} wt={900} c={C.red} glow={C.red} o={p(1.2, 0.4)} ls={-4}>ALTINDA</Tx>
      <Coin x={780} y={290 + (1 - coin) * -520} size={170} o={p(1.6, 0.2)} />
      {[0, 1, 2].map((i) => <Arrow key={i} x={110 + i * 120} y={1030} size={92} color={C.red} up={false} bounce={7} o={p(3.0 + i * 0.7, 0.35)} />)}
      <Tx x={460} y={1000} w={560} s={44} wt={800} c={C.gold} o={p(5.0, 0.5)}>3 işlem günü üst üste düşüş</Tx>
    </Fade>
  );
};

// ----------------------------------------------------------------------------- sahne B: enflasyon
const SB: React.FC = () => {
  const {t, p} = useTL();
  const base = 1000, sc = 820;
  const bars = [{lab: 'Beklenti', v: 0.3, col: C.gold, t0: 5.0, x: 130}, {lab: 'Gerçekleşen', v: 0.4, col: C.red, t0: 2.0, x: 610}];
  const sub = 1 - p(13.0, 0.4);
  return (
    <Fade>
      <Tx x={60} y={170} w={960} s={104} wt={900} o={p(0, 0.4)} ls={-2}>ABD ENFLASYONU</Tx>
      <div style={{position: 'absolute', left: 60, top: 292, width: 330 * p(0.15, 0.6), height: 8, borderRadius: 4, background: `linear-gradient(90deg, ${C.gold2}, ${C.gold})`, boxShadow: `0 0 24px ${C.gold}`}} />
      <Tx x={60} y={320} s={44} wt={500} c={C.grey} o={p(0.3, 0.4) * sub}>Aylık TÜFE beklentiyi aştı</Tx>
      <Pill x={60} y={316} w={760} h={64} bg="rgba(214,173,82,.2)" c={C.gold2} s={28} o={p(13.2, 0.4)}>ÜST ÜSTE 3. AY • TÜFE ≥ %0,4</Pill>
      <Tx x={60} y={385} s={132} wt={900} c={C.red} glow={C.red} ls={-3} o={p(8.6, 0.3)}>{'+' + fmt(0.1 * p(8.7, 0.6), 1) + ' puan'}</Tx>
      <div style={{position: 'absolute', left: 80, top: base, width: 920 * p(0.5, 0.6), height: 5, background: C.line, borderRadius: 3}} />
      {bars.map((b, i) => {
        const q = p(b.t0, 0.9); const h = b.v * sc * q;
        return (
          <React.Fragment key={i}>
            <VBar x={b.x} base={base} w={340} h={h} color={b.col} />
            <Tx x={b.x} y={base - h - 92} w={340} align="left" s={72} wt={900} glow={b.col} o={clamp(q * 3)} style={{textAlign: 'center'}}>{fmt(b.v * q, 1, '%')}</Tx>
            <Tx x={b.x} y={base + 18} w={340} s={36} wt={600} c={C.grey} o={p(b.t0 - 0.2, 0.4)} style={{textAlign: 'center'}}>{b.lab}</Tx>
          </React.Fragment>
        );
      })}
      <Pill x={90} y={1080} w={900} h={66} bg="rgba(240,91,102,.18)" c={C.white} s={30} o={p(8.0, 0.4) * (1 - p(13.0, 0.4))}>ÇEKİRDEK: %0,3 (beklenti %0,2)</Pill>
    </Fade>
  );
};

// ----------------------------------------------------------------------------- sahne C: altın neden düştü
const SC: React.FC = () => {
  const {t, p, pop} = useTL();
  const intro = 1 - p(7.3, 0.3);
  const items = [
    {lab: 'Faiz artışı beklentisi', col: C.gold, up: true, t0: 7.6, y: 300},
    {lab: 'Güçlü dolar', col: C.green, up: true, t0: 10.9, y: 540},
    {lab: 'Altında satış', col: C.red, up: false, t0: 18.0, y: 780},
  ];
  return (
    <Fade>
      <Tx x={60} y={170} w={960} s={86} wt={900} o={p(0, 0.4)} ls={-2}>ALTIN NEDEN DÜŞTÜ?</Tx>
      <div style={{position: 'absolute', left: 60, top: 280, width: 330 * p(0.15, 0.6), height: 8, borderRadius: 4, background: `linear-gradient(90deg, ${C.gold2}, ${C.gold})`, boxShadow: `0 0 24px ${C.gold}`}} />
      <div style={{opacity: intro}}>
        <Arrow x={540} y={640} size={330} color={C.red} up={false} bounce={22} o={p(0.6, 0.5)} />
        <Tx x={540} y={850} w={960} align="center" s={64} wt={900} o={p(1.4, 0.5)} glow={C.red}>Bu haftanın en sert hareketi</Tx>
      </div>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <Card x={70} y={it.y} w={940} h={210} t0={it.t0} accent={it.col}>
            <Arrow x={150} y={105} size={110} color={it.col} up={it.up} bounce={8} o={p(it.t0 + 0.2, 0.3)} />
            <Tx x={250} y={62} w={660} s={60} wt={900} o={p(it.t0 + 0.2, 0.3)}>{it.lab}</Tx>
          </Card>
          {i < 2 && <Arrow x={540} y={it.y + 228} size={30} color={C.grey} up={false} o={p(items[i + 1].t0 - 0.3, 0.3)} />}
        </React.Fragment>
      ))}
      <Coin x={800} y={780 - 70 + (1 - Math.min(1.05, pop(18.4))) * -300} size={74} o={p(18.4, 0.2)} />
    </Fade>
  );
};

// ----------------------------------------------------------------------------- bitiş kartı
const SEnd: React.FC = () => {
  const {t, p, pop} = useTL();
  const s = 1 + 0.05 * Math.sin(t * 5) * p(1.2, 0.4);
  return (
    <AbsoluteFill>
      <Tx x={60} y={360} w={960} align="left" s={118} wt={900} o={p(0.1, 0.5)} glow={C.gold} ls={-3} lh={1.1}>{"TAM ANALİZ\nKANALDA"}</Tx>
      <div style={{position: 'absolute', left: 60, top: 640, width: 400 * p(0.5, 0.6), height: 9, borderRadius: 5, background: `linear-gradient(90deg, ${C.gold2}, ${C.gold})`, boxShadow: `0 0 26px ${C.gold}`}} />
      <Tx x={60} y={680} w={960} s={46} wt={600} c={C.grey} o={p(0.9, 0.5)}>Fed • Tahvil • Borsa • Petrol • BIST • TCMB</Tx>
      <div style={{position: 'absolute', left: 540 - 300 * s, top: 800, width: 600 * s, height: 150 * s, borderRadius: 34, background: `linear-gradient(145deg, ${C.red}, #c13a48)`, opacity: p(1.2, 0.4), boxShadow: `0 0 80px ${C.red}99`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 78 * s, color: C.white, letterSpacing: 2}}>ABONE OL</div>
      <Tx x={540} y={1030} w={960} align="center" s={36} wt={600} c={C.grey} o={p(2.0, 0.5)}>Yatırım tavsiyesi değildir</Tx>
    </AbsoluteFill>
  );
};

// ----------------------------------------------------------------------------- altyazılar
const Captions: React.FC = () => {
  const f = useCurrentFrame(); const t = f / SHORT_FPS;
  const cap = data.captions.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;
  const age = (t - cap.start) * SHORT_FPS;
  const sc = interpolate(age, [0, 5], [0.88, 1], {extrapolateRight: 'clamp'});
  const o = interpolate(age, [0, 3], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: 50, width: 980, top: 1200, textAlign: 'center', opacity: o, transform: `scale(${sc})`, fontFamily: FONT, fontWeight: 900, fontSize: 78, lineHeight: 1.18}}>
      {cap.text.split(' ').map((w, i) => {
        const hot = /[0-9%]/.test(w);
        return <span key={i} style={{color: hot ? C.gold2 : C.white, WebkitTextStroke: '12px #05101f', paintOrder: 'stroke fill', textShadow: '0 6px 18px rgba(0,0,0,.55)', marginRight: 16, display: 'inline-block'}}>{w}</span>;
      })}
    </div>
  );
};

export const ShortVideo: React.FC = () => {
  const seg = data.segments;
  const fr = (s: number) => Math.round(s * SHORT_FPS);
  return (
    <>
      <ShortBg />
      <Tx x={540} y={60} w={1080} align="center" s={26} wt={600} c={C.grey}>Yatırım tavsiyesi değildir</Tx>
      <Sequence from={fr(seg[0].start)} durationInFrames={fr(seg[1].start) - fr(seg[0].start)}><SA /></Sequence>
      <Sequence from={fr(seg[1].start)} durationInFrames={fr(seg[2].start) - fr(seg[1].start)}><SB /></Sequence>
      <Sequence from={fr(seg[2].start)} durationInFrames={fr(data.endCardStart) - fr(seg[2].start)}><SC /></Sequence>
      <Sequence from={fr(data.endCardStart)} durationInFrames={SHORT_TOTAL - fr(data.endCardStart)}><SEnd /></Sequence>
      <Captions />
    </>
  );
};
