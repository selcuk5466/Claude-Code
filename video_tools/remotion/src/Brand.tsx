import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, random} from 'remotion';
import {Bell} from 'lucide-react';
import {Bg4, F, MONO, T, WorldMap, useFonts} from './Pro';
import {S12, S2} from './Enf4';
import {useTL} from './ui';
import {Stock} from './Stock';

export const GOLD = '#f2c14e', GOLD2 = '#ffd978', NAVY = '#06101f', BLUE = '#3b82f6';
export const LOGO = staticFile('brand/logo.png');
export const CHANNEL = 'DÜNYADAN FISILTILAR';
export const TAGLINE = 'Dünyanın gündemi, ekonominin ritmi.';

// ---------------------------------------------------------------- film grenı
export const Grain: React.FC<{o?: number}> = ({o = 0.07}) => {
  const f = useCurrentFrame();
  const seed = f % 12;
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, opacity: o, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
      <filter id={`g${seed}`}><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={seed} stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
      <rect width="100%" height="100%" filter={`url(#g${seed})`} />
    </svg>
  );
};

// ---------------------------------------------------------------- ritim çubukları (marka motifi)
export const Wave: React.FC<{x: number; y: number; w: number; h: number; n?: number; c?: string; o?: number; amp?: number}> = ({x, y, w, h, n = 48, c = GOLD, o = 1, amp = 1}) => {
  const f = useCurrentFrame();
  const bw = w / n;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, opacity: o}}>
      {Array.from({length: n}).map((_, i) => {
        const mid = 1 - Math.abs(i - n / 2) / (n / 2);
        const v = (0.25 + 0.75 * Math.abs(Math.sin(f * 0.21 + i * 0.7) * Math.cos(f * 0.13 + i * 0.31))) * (0.35 + 0.65 * mid) * amp;
        const hh = Math.max(4, h * v);
        return <div key={i} style={{position: 'absolute', left: i * bw + bw * 0.2, top: (h - hh) / 2, width: bw * 0.6, height: hh, borderRadius: bw, background: `linear-gradient(180deg, ${GOLD2}, ${c})`, boxShadow: `0 0 12px ${c}aa`}} />;
      })}
    </div>
  );
};

// ---------------------------------------------------------------- açılış jeneriği (4,5 sn)
export const INTRO_DUR = 4.5;
export const IntroSting: React.FC = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const t = f / fps;
  const HIT = 1.9;
  const ring = interpolate(t, [0.1, HIT], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sp = spring({frame: Math.max(0, f - Math.round(HIT * fps)), fps, config: {damping: 14, stiffness: 120, mass: 0.9}});
  const flash = interpolate(t, [HIT, HIT + 0.08, HIT + 0.5], [0, 0.85, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const out = interpolate(t, [INTRO_DUR - 0.45, INTRO_DUR], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sweep = interpolate(t, [0.2, 1.8], [-600, 2400], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const tag = interpolate(t, [2.5, 3.0], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const R = 300, cx = 960, cy = 450;
  return (
    <AbsoluteFill style={{background: `radial-gradient(900px 700px at 50% 42%, #10264a 0%, ${NAVY} 70%)`, opacity: out}}>
      <div style={{position: 'absolute', inset: 0, opacity: 0.35, transform: `translateX(${-t * 30}px)`}}><WorldMap w={2100} h={1100} x={-90} y={-10} /></div>
      {Array.from({length: 60}).map((_, i) => {
        const sx = random('px' + i) * 1920, sy = 1080 - ((random('py' + i) * 1080 + t * (40 + random('ps' + i) * 90)) % 1150);
        return <div key={i} style={{position: 'absolute', left: sx, top: sy, width: 3 + random('pz' + i) * 4, height: 3 + random('pz' + i) * 4, borderRadius: '50%', background: GOLD2, opacity: 0.25 + 0.5 * random('po' + i), boxShadow: `0 0 10px ${GOLD}`}} />;
      })}
      <div style={{position: 'absolute', left: sweep, top: -200, width: 220, height: 1500, transform: 'rotate(18deg)', background: 'linear-gradient(90deg, rgba(255,217,120,0), rgba(255,217,120,.28), rgba(255,217,120,0))'}} />
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        <circle cx={cx} cy={cy} r={R + 18} fill="none" stroke={GOLD} strokeWidth={6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ring} transform={`rotate(-90 ${cx} ${cy})`} style={{filter: `drop-shadow(0 0 18px ${GOLD})`}} />
        <circle cx={cx} cy={cy} r={R + 44} fill="none" stroke={GOLD2} strokeOpacity={0.35} strokeWidth={2} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ring} transform={`rotate(90 ${cx} ${cy})`} />
      </svg>
      <Wave x={cx - 420} y={cy + R + 70} w={840} h={70} o={interpolate(t, [0.3, 1.0], [0, 0.9], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} amp={0.4 + 0.6 * ring} />
      <div style={{position: 'absolute', left: cx - R, top: cy - R, width: 2 * R, height: 2 * R, borderRadius: '50%', overflow: 'hidden', opacity: Math.min(1, sp * 1.4), transform: `scale(${0.55 + 0.45 * sp})`, filter: `blur(${(1 - Math.min(1, sp)) * 14}px)`, boxShadow: `0 0 90px ${GOLD}66`}}>
        <Img src={LOGO} style={{width: '100%', height: '100%'}} />
      </div>
      <div style={{position: 'absolute', inset: 0, background: '#fff6d8', opacity: flash, mixBlendMode: 'screen'}} />
      <T x={960} y={cy + R + 150} w={1400} align="center" s={40} wt={600} c="#e8eef8" o={tag} ls={1}>{TAGLINE}</T>
      <T x={960} y={cy + R + 206} w={1400} align="center" s={24} wt={700} mono c={GOLD} o={tag} ls={4}>PİYASA ÖZETİ • 17 KASIM 2026</T>
      <Grain o={0.06} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- bölüm ara jeneriği (1,5 sn)
export const BUMPER_DUR = 1.5;
export const Bumper: React.FC<{label: string; sub?: string; c?: string}> = ({label, sub, c = GOLD}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const t = f / fps;
  const inX = interpolate(t, [0, 0.35], [-1920, 0], {extrapolateRight: 'clamp', easing: (x) => 1 - Math.pow(1 - x, 3)});
  const outX = interpolate(t, [BUMPER_DUR - 0.35, BUMPER_DUR], [0, 1920], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (x) => x * x * x});
  const txt = interpolate(t, [0.25, 0.5], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: inX + outX - 260, top: 0, width: 260, height: 1080, background: `linear-gradient(90deg, ${c}00, ${c})`}} />
      <div style={{position: 'absolute', left: inX + outX, top: 0, width: 1920, height: 1080, background: `linear-gradient(120deg, #0a1a33 0%, ${NAVY} 70%)`}}>
        <Wave x={360} y={620} w={1200} h={90} c={c} o={0.8} />
        <div style={{position: 'absolute', left: 860 - 340, top: 380, width: 110, height: 110, borderRadius: '50%', overflow: 'hidden', boxShadow: `0 0 40px ${c}88`, opacity: txt}}><Img src={LOGO} style={{width: '100%', height: '100%'}} /></div>
        <T x={660} y={378} s={104} wt={900} ls={-2} o={txt} glow={c}>{label}</T>
        {sub && <T x={664} y={500} s={30} wt={600} mono c={c} ls={4} o={txt}>{sub}</T>}
        <div style={{position: 'absolute', left: 664, top: 552, width: 420 * txt, height: 6, borderRadius: 3, background: c, boxShadow: `0 0 18px ${c}`}} />
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- alt bant (sahne başında 4,5 sn)
export const LowerThird: React.FC<{topic: string; t0?: number; dur?: number}> = ({topic, t0 = 0.6, dur = 4.4}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig(); const t = f / fps;
  const a = interpolate(t, [t0, t0 + 0.35, t0 + dur - 0.35, t0 + dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const w1 = interpolate(t, [t0, t0 + 0.4], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const w2 = interpolate(t, [t0 + 0.2, t0 + 0.6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (a <= 0) return null;
  return (
    <div style={{position: 'absolute', left: 110, top: 868, height: 84, opacity: a, display: 'flex', alignItems: 'center'}}>
      <div style={{width: 84, height: 84, borderRadius: '50%', overflow: 'hidden', boxShadow: `0 0 26px ${GOLD}88`, zIndex: 2}}><Img src={LOGO} style={{width: '100%', height: '100%'}} /></div>
      <div style={{marginLeft: -20, height: 60, width: 420 * w1, overflow: 'hidden', background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})`, display: 'flex', alignItems: 'center', paddingLeft: 38, fontFamily: F, fontWeight: 900, fontSize: 26, letterSpacing: 2, color: NAVY, whiteSpace: 'nowrap'}}>{CHANNEL}</div>
      <div style={{height: 60, width: 760 * w2, overflow: 'hidden', background: 'rgba(8,20,40,.94)', borderTop: `2px solid ${GOLD}66`, borderBottom: `2px solid ${GOLD}66`, display: 'flex', alignItems: 'center', paddingLeft: 26, fontFamily: F, fontWeight: 700, fontSize: 28, color: '#f2f6fc', whiteSpace: 'nowrap'}}>{topic}</div>
    </div>
  );
};

// köşe logosu (her sahnede)
export const Bug: React.FC = () => <div style={{position: 'absolute', left: 1828, top: 52, width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', opacity: 0.92, boxShadow: `0 0 24px ${GOLD}55`}}><Img src={LOGO} style={{width: '100%', height: '100%'}} /></div>;

// kamera itmesi
export const PushIn: React.FC<{dur: number; children: React.ReactNode; k?: number}> = ({dur, children, k = 0.028}) => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  const s = 1 + k * Math.min(1, f / (dur * fps));
  return <AbsoluteFill style={{transform: `scale(${s})`, transformOrigin: '50% 45%'}}>{children}</AbsoluteFill>;
};

// ---------------------------------------------------------------- kapanış kartı
export const EndCard: React.FC<{next?: string}> = ({next}) => {
  const {p, t} = useTL();
  const pulse = 1 + 0.04 * Math.sin(t * 5) * p(1.0, 0.4);
  return (
    <AbsoluteFill style={{background: `radial-gradient(900px 700px at 30% 45%, #10264a 0%, ${NAVY} 70%)`}}>
      <div style={{position: 'absolute', left: 160, top: 200, width: 600, height: 600, borderRadius: '50%', overflow: 'hidden', opacity: p(0, 0.5), transform: `scale(${0.85 + 0.15 * p(0, 0.6)})`, boxShadow: `0 0 100px ${GOLD}55`}}><Img src={LOGO} style={{width: '100%', height: '100%'}} /></div>
      <T x={880} y={230} w={900} s={34} wt={700} mono c={GOLD} ls={4} o={p(0.3, 0.4)}>{CHANNEL}</T>
      <T x={880} y={290} w={900} s={60} wt={800} ls={-1} o={p(0.4, 0.4)}>{TAGLINE}</T>
      {next && <T x={880} y={470} w={900} s={34} wt={600} c="#cfdbec" o={p(0.8, 0.4)}>{'Yarın: ' + next}</T>}
      <div style={{position: 'absolute', left: 880, top: 580, width: 560 * pulse, height: 120 * pulse, borderRadius: 60, background: 'linear-gradient(135deg, #f05b66, #b8323d)', boxShadow: '0 0 60px #f05b6688', opacity: p(1.0, 0.4), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, fontFamily: F, fontWeight: 900, fontSize: 48 * pulse, color: '#fff', letterSpacing: 3}}><Bell size={46} />ABONE OL</div>
      <T x={880} y={760} w={900} s={26} wt={600} c="#8fa3bc" o={p(1.4, 0.4)}>Yatırım tavsiyesi değildir. Bilgilendirme amaçlıdır.</T>
      <Wave x={160} y={860} w={1600} h={80} o={0.5} amp={0.7} />
      <Grain o={0.06} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- marka bandı (alt şerit)
export const BrandTicker: React.FC<{items: string[]; total: number}> = ({items, total}) => {
  const f = useCurrentFrame();
  const IW = 470, CW = IW * items.length;
  const x = -((f * 2.6) % CW);
  const row = (k: number) => items.map((s, i) => <div key={k + '-' + i} style={{width: IW, flex: 'none', textAlign: 'center', fontFamily: MONO, fontSize: 24, fontWeight: 700, color: s.includes('−') ? '#ff8d96' : '#ffe08a'}}>{s}<span style={{color: '#2a4266', marginLeft: 22}}>│</span></div>);
  return (
    <>
      <div style={{position: 'absolute', left: 0, bottom: 0, width: 1920, height: 64, background: 'linear-gradient(180deg, rgba(4,10,20,.96), rgba(3,8,16,.99))', borderTop: `1px solid ${GOLD}77`}}>
        <div style={{position: 'absolute', left: 470, right: 0, top: 0, bottom: 0, overflow: 'hidden'}}><div style={{display: 'flex', alignItems: 'center', height: '100%', transform: `translateX(${x}px)`}}>{row(0)}{row(1)}</div></div>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 470, background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD2} 82%, rgba(242,193,78,0) 100%)`, display: 'flex', alignItems: 'center', paddingLeft: 16, gap: 12}}>
          <div style={{width: 44, height: 44, borderRadius: '50%', overflow: 'hidden'}}><Img src={LOGO} style={{width: '100%', height: '100%'}} /></div>
          <div style={{fontFamily: F, fontWeight: 900, fontSize: 22, letterSpacing: 1.5, color: NAVY}}>{CHANNEL}</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, bottom: 0, height: 4, width: (f / total) * 1920, background: `linear-gradient(90deg, ${GOLD}, ${GOLD2})`}} />
    </>
  );
};

// ---------------------------------------------------------------- test videosu
const fr = (s: number) => Math.round(s * 30);
export const BT = {intro: 0, b1: 4.5, s1: 6.0, s1dur: 32.1, b2: 38.1, s2: 39.6, s2dur: 38.5, end: 78.1, total: 84.0};
const TICK = ['S&P 500 7.416,59 (−%1,9)', 'NASDAQ 24.509,76 (−%2,5)', 'BIST 100 11.741 (öğle)', 'USD/TL 50,42', 'GRAM ALTIN ≈6.269 ₺', 'ONS ALTIN ≈3.870 $', 'YATIRIM TAVSİYESİ DEĞİLDİR'];
// gerçek stok görüntü araları [baş, son (sn), dosya, başlık, alt başlık, hareket]: cümle sınırlarına oturtuldu
type BR = [number, number, string, string | undefined, string | undefined, 'in' | 'out' | 'left' | 'right'];
const BROLL: BR[] = [
  [6.0, 9.1, 'stock/borsa-2.mp4', undefined, undefined, 'in'],
  [28.4, 33.0, 'stock/borsa-3.mp4', 'Çip ve veri merkezi', 'Satışın merkezinde', 'right'],
  [39.6, 45.6, 'stock/istanbul-3.mp4', undefined, undefined, 'out'],
  [58.3, 61.8, 'stock/para-tl.mp4', 'Dolar/TL ≈ 50,42', 'Öğle saatleri', 'in'],
  [61.8, 65.2, 'stock/altin-1.mp4', 'Gram altın ≈ 6.269 ₺', 'Bankalararası piyasa', 'left'],
  [65.2, 72.6, 'stock/petrol-1.mp4', 'Akaryakıt', 'Benzin 71,20 ₺ • Motorin 95,20 ₺', 'in'],
];
export const BrandTest: React.FC = () => {
  useFonts();
  const total = fr(BT.total);
  return (
    <AbsoluteFill style={{background: NAVY}}>
      <Sequence from={fr(BT.b1)} durationInFrames={fr(BT.end - BT.b1)}>
        <Bg4 total={total} />
      </Sequence>
      <Sequence from={fr(BT.s1)} durationInFrames={fr(BT.s1dur)}><PushIn dur={BT.s1dur}><S2 /></PushIn></Sequence>
      <Sequence from={fr(BT.s2)} durationInFrames={fr(BT.s2dur)}><PushIn dur={BT.s2dur}><S12 /></PushIn></Sequence>
      {BROLL.map(([a, b, src, title, sub, pan], i) => (
        <Sequence key={i} from={fr(a)} durationInFrames={fr(b - a)}><Stock src={src} dur={b - a} title={title} sub={sub} pan={pan} /></Sequence>
      ))}
      <Sequence from={fr(BT.s1)} durationInFrames={fr(BT.end - BT.s1)}><Bug /></Sequence>
      <Sequence from={fr(BT.s1)} durationInFrames={fr(6)}><LowerThird topic="Wall Street • pazartesi kapanışı" /></Sequence>
      <Sequence from={fr(BT.s2)} durationInFrames={fr(6)}><LowerThird topic="Borsa İstanbul • öğle saatleri" /></Sequence>
      <Sequence from={fr(BT.b1)} durationInFrames={fr(BT.end - BT.b1)}><BrandTicker items={TICK} total={total} /></Sequence>
      <Sequence from={fr(BT.b1)} durationInFrames={fr(BUMPER_DUR)}><Bumper label="ABD PİYASALARI" sub="WALL STREET" /></Sequence>
      <Sequence from={fr(BT.b2)} durationInFrames={fr(BUMPER_DUR)}><Bumper label="TÜRKİYE" sub="BORSA İSTANBUL" c="#e8485a" /></Sequence>
      <Sequence from={0} durationInFrames={fr(INTRO_DUR)}><IntroSting /></Sequence>
      <Sequence from={fr(BT.end)} durationInFrames={total - fr(BT.end)}><EndCard next="Nvidia bilançosu ve piyasanın tepkisi" /></Sequence>
      <Grain o={0.05} />
    </AbsoluteFill>
  );
};
export const BRAND_TEST_FRAMES = fr(BT.total);
