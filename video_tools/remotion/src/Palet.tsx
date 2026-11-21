// Kanal görsel kimliği: #FF8364 (mercan) • #FFB677 (şeftali) • #FFD98E (açık sarı) • #616F39 (zeytin)
// Kurallar: yazılar sert düşerek gelir, solarak kaybolur; sayılar sayarak büyür; grafikler ekranda yükselir/düşer.
import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Img, OffthreadVideo, continueRender, delayRender, interpolate, random, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import '@fontsource-variable/fraunces/index.css';
import '@fontsource-variable/inter/index.css';

export const K = {
  bg: '#FFF7E6', bej: '#FFE9B8', taba: '#FFB677', sage: '#616F39',
  ink: '#3B4422', ink2: '#5A6340', mute: '#8A8466', sageD: '#3B4422', sageL: '#A3AD78', tabaD: '#E8603F', paper: '#FFFBF2', deep2: '#4E5A2D', coral: '#FF8364', sari: '#FFD98E',
};
export const SERIF = "'Fraunces Variable', Georgia, serif";
export const SANS = "'Inter Variable', Inter, Arial, sans-serif";
export const LOGO9 = staticFile('brand/logo.png');
const cl = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const tr = (v: number, d = 0) => v.toLocaleString('tr-TR', {minimumFractionDigits: d, maximumFractionDigits: d});

export const useFonts9 = () => {
  const [h] = useState(() => delayRender('fonts9'));
  useEffect(() => {
    Promise.all([
      document.fonts.load('800 60px "Fraunces Variable"'), document.fonts.load('600 60px "Fraunces Variable"'),
      document.fonts.load('900 60px "Inter Variable"'), document.fonts.load('600 40px "Inter Variable"'),
    ]).catch(() => null).then(() => continueRender(h));
  }, [h]);
};

// sahnenin süresi (saniye): her öğe sahne bitmeden solar
export const SceneDur = React.createContext(9999);

export const useT = () => {
  const f = useCurrentFrame(); const {fps} = useVideoConfig();
  return {f, fps, t: f / fps};
};
const easeOut = (x: number) => 1 - Math.pow(1 - cl(x), 3);
export const useP = () => {
  const {t} = useT();
  return (t0: number, d: number) => easeOut((t - t0) / d);
};

// sert düşüş: hızlı iniş + küçük sekme, düşerken hareket bulanıklığı; sahne sonunda solar
export const useDrop = (t0: number, out?: number, dist = 150) => {
  const {f, fps, t} = useT(); const sd = React.useContext(SceneDur);
  const o2 = out ?? sd - 0.55;
  const s = spring({frame: Math.max(0, f - Math.round(t0 * fps)), fps, config: {damping: 11, stiffness: 340, mass: 0.7}});
  const vin = cl((t - t0) / 0.08);
  const vout = 1 - cl((t - o2) / 0.45);
  const y = -dist * (1 - s);
  const blur = t >= t0 ? Math.abs(1 - s) * 10 : 0;
  return {o: t < t0 ? 0 : vin * vout, y, blur, s};
};
export const Drop: React.FC<{t0: number; out?: number; dist?: number; x?: number; y?: number; w?: number; h?: number; style?: React.CSSProperties; children?: React.ReactNode}> = ({t0, out, dist, x, y, w, h, style, children}) => {
  const d = useDrop(t0, out, dist);
  return <div style={{position: 'absolute', left: x, top: y, width: w, height: h, opacity: d.o, transform: `translateY(${d.y}px)`, filter: d.blur > 0.3 ? `blur(${d.blur}px)` : undefined, ...style}}>{children}</div>;
};

// kelime kelime düşen başlık (serif)
export const DropWords: React.FC<{t0: number; x: number; y: number; w: number; s?: number; c?: string; wt?: number; stagger?: number; out?: number; font?: string; lh?: number; align?: 'left' | 'center'; children: React.ReactNode}> = ({t0, x, y, w, s = 84, c = K.ink, wt = 800, stagger = 0.07, out, font = SERIF, lh = 1.05, children, align = 'left'}) => {
  const words = String(children).split(' ');
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start', gap: `0 ${s * 0.26}px`, lineHeight: lh}}>
      {words.map((wd, i) => <Word key={i} t0={t0 + i * stagger} out={out} s={s} c={c} wt={wt} font={font}>{wd}</Word>)}
    </div>
  );
};
const Word: React.FC<{t0: number; out?: number; s: number; c: string; wt: number; font: string; children: string}> = ({t0, out, s, c, wt, font, children}) => {
  const d = useDrop(t0, out, s * 1.4);
  return <span style={{display: 'inline-block', fontFamily: font, fontWeight: wt, fontSize: s, color: c, letterSpacing: font === SERIF ? -1 : -0.5, opacity: d.o, transform: `translateY(${d.y}px)`, filter: d.blur > 0.3 ? `blur(${d.blur * 0.6}px)` : undefined}}>{children}</span>;
};

// sayarak büyüyen sayı
export const Count: React.FC<{t0: number; v: number; v0?: number; d?: number; dec?: number; pre?: string; suf?: string; s?: number; c?: string; x?: number; y?: number; w?: number; align?: 'left' | 'center' | 'right'; out?: number; font?: string; wt?: number}> = ({t0, v, v0 = 0, d = 1.5, dec = 0, pre = '', suf = '', s = 120, c = K.ink, x, y, w, align = 'left', out, font = SANS, wt = 900}) => {
  const dr = useDrop(t0, out, 110); const {t} = useT();
  const q = easeOut((t - t0 - 0.05) / d);
  const val = v0 + (v - v0) * q;
  const grow = 0.82 + 0.18 * q;
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, textAlign: align, opacity: dr.o, transform: `translateY(${dr.y}px) scale(${grow})`, transformOrigin: align === 'center' ? 'center bottom' : align === 'right' ? 'right bottom' : 'left bottom', filter: dr.blur > 0.3 ? `blur(${dr.blur * 0.6}px)` : undefined,
      fontFamily: font, fontWeight: wt, fontSize: s, color: c, letterSpacing: -2, lineHeight: 1, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap'}}>
      {pre}{tr(val, dec)}{suf}
    </div>
  );
};

// düz yazı (düşerek)
export const Tx9: React.FC<{t0: number; x: number; y: number; w?: number; s?: number; c?: string; wt?: number; font?: string; out?: number; align?: 'left' | 'center' | 'right'; ls?: number; lh?: number; children: React.ReactNode}> = ({t0, x, y, w, s = 32, c = K.ink, wt = 600, font = SANS, out, align = 'left', ls = 0, lh = 1.2, children}) => (
  <Drop t0={t0} out={out} dist={s * 2.2} x={x} y={y} w={w} style={{fontFamily: font, fontWeight: wt, fontSize: s, color: c, textAlign: align, letterSpacing: ls, lineHeight: lh}}>{children}</Drop>
);

// kart
export const Card9: React.FC<{t0: number; x: number; y: number; w: number; h: number; tone?: 'bej' | 'sage' | 'paper' | 'taba'; out?: number; children?: React.ReactNode; label?: string}> = ({t0, x, y, w, h, tone = 'paper', out, children, label}) => {
  const bg = tone === 'sage' ? `linear-gradient(150deg, ${K.deep2}, ${K.sageD})` : tone === 'bej' ? `linear-gradient(150deg, ${K.bej}, ${K.sari})` : tone === 'taba' ? `linear-gradient(150deg, ${K.coral}, ${K.tabaD})` : `linear-gradient(150deg, ${K.paper}, #FFF1D6)`;
  const lc = tone === 'sage' || tone === 'taba' ? K.bej : K.tabaD;
  return (
    <Drop t0={t0} out={out} dist={120} x={x} y={y} w={w} h={h} style={{borderRadius: 28, background: bg, border: `2px solid ${tone === 'paper' ? K.bej : 'transparent'}`, boxShadow: '0 18px 40px rgba(59,68,34,.12), 0 2px 0 rgba(255,255,255,.6) inset'}}>
      {label && <div style={{position: 'absolute', left: 32, top: 24, fontFamily: SANS, fontWeight: 800, fontSize: 20, letterSpacing: 3, color: lc}}>{label}</div>}
      {children}
    </Drop>
  );
};

// arka plan: kırık beyaz kâğıt, süzülen bej/adaçayı lekeleri, ince taba ızgara
export const Paper: React.FC = () => {
  const {t} = useT();
  return (
    <AbsoluteFill style={{background: K.bg, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 1250 + 60 * Math.sin(t * 0.13), top: -260 + 40 * Math.cos(t * 0.11), width: 900, height: 900, borderRadius: '50%', background: `radial-gradient(circle, ${K.bej}cc 0%, ${K.bej}00 70%)`}} />
      <div style={{position: 'absolute', left: -300 + 50 * Math.cos(t * 0.09), top: 620 + 40 * Math.sin(t * 0.12), width: 900, height: 900, borderRadius: '50%', background: `radial-gradient(circle, ${K.sageL}55 0%, ${K.sageL}00 70%)`}} />
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity: 0.35}}>
        {Array.from({length: 13}).map((_, i) => <line key={'v' + i} x1={i * 160} x2={i * 160} y1={0} y2={1080} stroke={K.bej} strokeWidth={1} />)}
        {Array.from({length: 8}).map((_, i) => <line key={'h' + i} x1={0} x2={1920} y1={i * 160} y2={i * 160} stroke={K.bej} strokeWidth={1} />)}
      </svg>
      <Noise o={0.05} />
    </AbsoluteFill>
  );
};
export const Noise: React.FC<{o?: number}> = ({o = 0.05}) => {
  const {f} = useT();
  return <AbsoluteFill style={{opacity: o, mixBlendMode: 'multiply', backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='${f % 7}'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`}} />;
};

// sahne başlığı
export const Head9: React.FC<{eyebrow: string; title: string; t0?: number}> = ({eyebrow, title, t0 = 0.15}) => (
  <>
    <Drop t0={t0} x={110} y={70} style={{display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{width: 46, height: 6, borderRadius: 3, background: K.taba}} />
      <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 4, color: K.ink2}}>{eyebrow}</div>
    </Drop>
    <DropWords t0={t0 + 0.12} x={108} y={104} w={1560} s={66} c={K.ink} stagger={0.05}>{title}</DropWords>
  </>
);
export const Src9: React.FC<{children: string}> = ({children}) => <Tx9 t0={0.9} x={110} y={1000} w={1500} s={18} c={K.mute} wt={600}>{'KAYNAK  ' + children}</Tx9>;
export const DateChip: React.FC<{date: string}> = ({date}) => (
  <div style={{position: 'absolute', right: 140, top: 74, padding: '8px 18px', borderRadius: 30, border: `2px solid ${K.taba}`, fontFamily: SANS, fontWeight: 800, fontSize: 18, letterSpacing: 2, color: K.tabaD}}>{date}</div>
);
export const Bug9: React.FC = () => <div style={{position: 'absolute', right: 52, top: 56, width: 70, height: 70, borderRadius: '50%', overflow: 'hidden', boxShadow: `0 6px 20px rgba(59,68,34,.25)`, border: `3px solid ${K.bg}`}}><Img src={LOGO9} style={{width: '100%', height: '100%'}} /></div>;

// ---------------------------------------------------------------- grafikler
// dikey çubuklar: yaylı yükselme, değer sayaçla; v1 verilirse tc anında v1'e iner/çıkar
export type BarD = {label: string; v: number; v1?: number; tc?: number; c?: string; t0: number; fmt?: (v: number) => string; sub?: string};
export const Bars: React.FC<{x: number; y: number; w: number; h: number; items: BarD[]; max: number; bw?: number; vs?: number; ls?: number}> = ({x, y, w, h, items, max, bw = 150, vs = 54, ls = 26}) => {
  const {f, fps, t} = useT(); const sd = React.useContext(SceneDur);
  const gap = (w - items.length * bw) / (items.length + 1);
  const fadeOut = 1 - cl((t - (sd - 0.55)) / 0.45);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, opacity: fadeOut}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 70, height: 3, background: K.taba, borderRadius: 2}} />
      {items.map((b, i) => {
        const s = spring({frame: Math.max(0, f - Math.round(b.t0 * fps)), fps, config: {damping: 12, stiffness: 120, mass: 0.9}});
        const s2 = b.tc !== undefined ? spring({frame: Math.max(0, f - Math.round(b.tc * fps)), fps, config: {damping: 12, stiffness: 120, mass: 0.9}}) : 0;
        const val = b.v * s + (b.v1 !== undefined ? (b.v1 - b.v) * s2 : 0);
        const hh = Math.max(0, (val / max) * (h - 150));
        const shown = Math.max(0, val);
        const col = b.c ?? K.sage;
        const lx = gap + i * (bw + gap);
        const vis = t >= b.t0 ? cl((t - b.t0) / 0.1) : 0;
        return (
          <div key={b.label} style={{position: 'absolute', left: lx, bottom: 0, width: bw, height: h, opacity: vis}}>
            <div style={{position: 'absolute', left: 0, bottom: 73, width: bw, height: hh, borderRadius: '18px 18px 4px 4px', background: `linear-gradient(180deg, ${col}, ${col}cc)`, boxShadow: `0 10px 30px ${col}44`}} />
            <div style={{position: 'absolute', left: -40, width: bw + 80, bottom: 90 + hh, textAlign: 'center', fontFamily: SANS, fontWeight: 900, fontSize: vs, color: K.ink, letterSpacing: -1, fontVariantNumeric: 'tabular-nums'}}>{b.fmt ? b.fmt(shown) : tr(shown)}</div>
            <div style={{position: 'absolute', left: -50, width: bw + 100, bottom: 0, height: 62, textAlign: 'center', fontFamily: SANS, fontWeight: 700, fontSize: ls, color: K.ink2, lineHeight: 1.1}}>{b.label}</div>
            {b.sub && <div style={{position: 'absolute', left: -50, width: bw + 100, bottom: 90 + hh + vs + 8, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 22, color: col, letterSpacing: 1}}>{b.sub}</div>}
          </div>
        );
      })}
    </div>
  );
};

// yatay çubuk (ilerleme): genişlik yaylı büyür/küçülür
export const HBar: React.FC<{x: number; y: number; w: number; h?: number; v: number; v1?: number; tc?: number; max: number; t0: number; c?: string; label: string; fmt: (v: number) => string; ls?: number}> = ({x, y, w, h = 70, v, v1, tc, max, t0, c = K.sage, label, fmt, ls = 30}) => {
  const {f, fps, t} = useT(); const sd = React.useContext(SceneDur);
  const s = spring({frame: Math.max(0, f - Math.round(t0 * fps)), fps, config: {damping: 13, stiffness: 110, mass: 0.9}});
  const s2 = tc !== undefined ? spring({frame: Math.max(0, f - Math.round(tc * fps)), fps, config: {damping: 13, stiffness: 110, mass: 0.9}}) : 0;
  const val = v * s + (v1 !== undefined ? (v1 - v) * s2 : 0);
  const bw = (val / max) * w;
  const o = (t >= t0 ? cl((t - t0) / 0.1) : 0) * (1 - cl((t - (sd - 0.55)) / 0.45));
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w + 400, height: h + 50, opacity: o}}>
      <div style={{fontFamily: SANS, fontWeight: 700, fontSize: ls, color: K.ink2, marginBottom: 8}}>{label}</div>
      <div style={{position: 'absolute', left: 0, top: ls + 16, width: w, height: h, borderRadius: h / 2, background: `${K.bej}aa`}} />
      <div style={{position: 'absolute', left: 0, top: ls + 16, width: Math.max(h, bw), height: h, borderRadius: h / 2, background: `linear-gradient(90deg, ${c}cc, ${c})`, boxShadow: `0 8px 24px ${c}44`}} />
      <div style={{position: 'absolute', left: Math.max(h, bw) + 22, top: ls + 16 + h / 2 - 30, fontFamily: SANS, fontWeight: 900, fontSize: 52, color: K.ink, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap'}}>{fmt(val)}</div>
    </div>
  );
};

// çizilen çizgi grafik
export const Line9: React.FC<{x: number; y: number; w: number; h: number; pts: number[]; labels: string[]; t0: number; dur: number; min: number; max: number; c?: string; fmt: (v: number) => string; vs?: number}> = ({x, y, w, h, pts, labels, t0, dur, min, max, c = K.sage, fmt, vs = 34}) => {
  const {t} = useT(); const sd = React.useContext(SceneDur);
  const q = cl((t - t0) / dur); const e = q < 0.5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2;
  const pad = Math.min(130, w * 0.12);
  const X = (i: number) => pad + (i / (pts.length - 1)) * (w - 2 * pad);
  const Y = (v: number) => 40 + ((max - v) / (max - min)) * (h - 120);
  const k = e * (pts.length - 1); const i0 = Math.floor(k);
  const sh: [number, number][] = pts.slice(0, i0 + 1).map((v, i) => [X(i), Y(v)]);
  if (i0 < pts.length - 1) sh.push([X(i0) + (X(i0 + 1) - X(i0)) * (k - i0), Y(pts[i0] + (pts[i0 + 1] - pts[i0]) * (k - i0))]);
  const d = sh.map(([a, b], i) => `${i ? 'L' : 'M'}${a},${b}`).join(' ');
  const o = (t >= t0 ? cl((t - t0) / 0.15) : 0) * (1 - cl((t - (sd - 0.55)) / 0.45));
  const [hx, hy] = sh[sh.length - 1];
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, opacity: o}}>
      <svg width={w} height={h}>
        <defs><linearGradient id={'la' + x + y} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={c} stopOpacity={0.35} /><stop offset="1" stopColor={c} stopOpacity={0} /></linearGradient></defs>
        <line x1={20} x2={w - 20} y1={h - 80} y2={h - 80} stroke={K.taba} strokeWidth={3} />
        <path d={d + ` L${hx},${h - 80} L${X(0)},${h - 80} Z`} fill={`url(#la${x}${y})`} />
        <path d={d} fill="none" stroke={c} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((v, i) => i <= k + 0.001 && <circle key={i} cx={X(i)} cy={Y(v)} r={10} fill={K.bg} stroke={c} strokeWidth={5} />)}
        <circle cx={hx} cy={hy} r={13} fill={c} />
        {labels.map((l, i) => <text key={l} x={X(i)} y={h - 40} textAnchor="middle" fill={K.ink2} fontFamily={SANS} fontWeight={700} fontSize={24}>{l}</text>)}
      </svg>
      {pts.map((v, i) => i <= k + 0.001 && <div key={'v' + i} style={{position: 'absolute', left: X(i) - 120, width: 240, top: Y(v) - vs - 26, textAlign: 'center', fontFamily: SANS, fontWeight: 900, fontSize: vs, color: K.ink}}>{fmt(v)}</div>)}
    </div>
  );
};

// ---------------------------------------------------------------- gerçek görüntü (sıcak derecelendirme)
export const Stock9: React.FC<{src: string; dur: number; title?: string; sub?: string; from?: number; pan?: 'in' | 'out' | 'left' | 'right'}> = ({src, dur, title, sub, from = 0, pan = 'in'}) => {
  const f = useCurrentFrame(), {fps} = useVideoConfig();
  const p = Math.min(1, f / (dur * fps));
  const s = pan === 'out' ? 1.12 - 0.1 * p : 1.02 + 0.1 * p;
  const x = pan === 'left' ? 30 - 60 * p : pan === 'right' ? -30 + 60 * p : 0;
  const wipe = interpolate(f, [0, 9], [0, 100], {extrapolateRight: 'clamp'});
  const fade = interpolate(f, [dur * fps - 9, dur * fps], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const isVid = /\.(mp4|mov|webm)$/i.test(src);
  const st: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${s}) translateX(${x}px)`, filter: 'saturate(0.78) contrast(1.04) brightness(1.02) sepia(0.12)'};
  return (
    <AbsoluteFill style={{opacity: fade, overflow: 'hidden', clipPath: `inset(0 ${100 - wipe}% 0 0)`, background: K.ink}}>
      {isVid ? <OffthreadVideo src={staticFile(src)} startFrom={Math.round(from * fps)} muted style={st} /> : <Img src={staticFile(src)} style={st} />}
      <AbsoluteFill style={{background: K.taba, opacity: 0.16, mixBlendMode: 'color'}} />
      <AbsoluteFill style={{background: `linear-gradient(180deg, rgba(59,68,34,0) 45%, rgba(59,68,34,.85) 100%)`}} />
      <Noise o={0.06} />
      {title && <StockTitle title={title} sub={sub} />}
    </AbsoluteFill>
  );
};
const StockTitle: React.FC<{title: string; sub?: string}> = ({title, sub}) => {
  const d = useDrop(0.25, 999, 120); const d2 = useDrop(0.45, 999, 80);
  return (
    <>
      <div style={{position: 'absolute', left: 120, bottom: 250, opacity: d.o, transform: `translateY(${d.y}px)`}}>
        <div style={{width: 90, height: 7, borderRadius: 4, background: K.sageL, marginBottom: 22}} />
        <div style={{fontFamily: SERIF, fontWeight: 800, fontSize: 92, color: K.bg, letterSpacing: -1, textShadow: '0 4px 30px rgba(0,0,0,.35)'}}>{title}</div>
      </div>
      {sub && <div style={{position: 'absolute', left: 124, bottom: 190, opacity: d2.o, transform: `translateY(${d2.y}px)`, fontFamily: SANS, fontWeight: 700, fontSize: 40, color: K.bej}}>{sub}</div>}
    </>
  );
};

// ---------------------------------------------------------------- marka paketi (palet)
export const INTRO9 = 4.5;
export const Intro9: React.FC<{date: string}> = ({date}) => {
  const {f, fps, t} = useT();
  const sp = spring({frame: Math.max(0, f - Math.round(0.9 * fps)), fps, config: {damping: 10, stiffness: 200, mass: 0.8}});
  const wipe = interpolate(t, [0, 0.7], [0, 1], {extrapolateRight: 'clamp', easing: (x) => 1 - Math.pow(1 - x, 3)});
  const out = interpolate(t, [INTRO9 - 0.45, INTRO9], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: K.bg, opacity: out, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1920 * wipe, height: 1080, background: `linear-gradient(120deg, ${K.deep2}, ${K.sageD})`}} />
      <div style={{position: 'absolute', right: 0, bottom: 0, width: 760 * wipe, height: 22, background: K.taba}} />
      <div style={{position: 'absolute', left: 0, top: 0, width: 520 * wipe, height: 22, background: K.bej}} />
      {Array.from({length: 26}).map((_, i) => {
        const sx = random('ix' + i) * 1920, sy = 1080 - ((random('iy' + i) * 1080 + t * (30 + random('is' + i) * 70)) % 1150);
        return <div key={i} style={{position: 'absolute', left: sx, top: sy, width: 6, height: 6, borderRadius: '50%', background: K.bej, opacity: 0.35 * wipe}} />;
      })}
      <div style={{position: 'absolute', left: 960 - 170, top: 210, width: 340, height: 340, borderRadius: '50%', overflow: 'hidden', border: `8px solid ${K.bej}`, boxShadow: '0 30px 80px rgba(0,0,0,.25)', opacity: Math.min(1, sp * 1.5), transform: `translateY(${(1 - sp) * -260}px) scale(${0.8 + 0.2 * sp})`}}>
        <Img src={LOGO9} style={{width: '100%', height: '100%'}} />
      </div>
      <DropWords t0={1.5} x={260} y={600} w={1400} s={96} c={K.bg} align="center" stagger={0.08} out={9}>DÜNYADAN FISILTILAR</DropWords>
      <Tx9 t0={2.2} x={260} y={730} w={1400} s={34} c={K.bej} wt={600} align="center" out={9}>Dünyanın gündemi, ekonominin ritmi.</Tx9>
      <Tx9 t0={2.5} x={260} y={792} w={1400} s={22} c={K.bej} wt={800} align="center" ls={5} out={9}>{'EKONOMİ RİTMİ • ' + date}</Tx9>
    </AbsoluteFill>
  );
};
export const BUMP9 = 1.5;
export const Bumper9: React.FC<{label: string; sub?: string}> = ({label, sub}) => {
  const {t} = useT();
  const inX = interpolate(t, [0, 0.3], [-1920, 0], {extrapolateRight: 'clamp', easing: (x) => 1 - Math.pow(1 - x, 3)});
  const outX = interpolate(t, [BUMP9 - 0.3, BUMP9], [0, 1920], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: (x) => x * x * x});
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: inX + outX - 120, top: 0, width: 120, height: 1080, background: K.taba}} />
      <div style={{position: 'absolute', left: inX + outX, top: 0, width: 1920, height: 1080, background: `linear-gradient(120deg, ${K.deep2}, ${K.sageD})`}}>
        <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080}}>
          <BumpLogo />
          <DropWords t0={0.22} x={300} y={390} w={1400} s={112} c={K.bg} stagger={0.06} out={1.2}>{label}</DropWords>
          {sub && <Tx9 t0={0.4} x={306} y={540} w={1400} s={30} c={K.bej} wt={800} ls={5} out={1.2}>{sub}</Tx9>}
          <div style={{position: 'absolute', left: 306, top: 600, width: interpolate(t, [0.4, 0.8], [0, 460], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), height: 8, borderRadius: 4, background: K.bej}} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
const BumpLogo: React.FC = () => {
  const {f, fps, t} = useT();
  const sp = spring({frame: Math.max(0, f - Math.round(0.12 * fps)), fps, config: {damping: 10, stiffness: 220, mass: 0.7}});
  const o = 1 - Math.max(0, Math.min(1, (t - 1.15) / 0.2));
  return <div style={{position: 'absolute', left: 110, top: 380, width: 160, height: 160, borderRadius: '50%', overflow: 'hidden', border: `6px solid ${K.bej}`, boxShadow: '0 16px 40px rgba(0,0,0,.25)', opacity: Math.min(1, sp * 1.4) * o, transform: `translateY(${(1 - sp) * -200}px) rotate(${(1 - sp) * -90}deg)`}}><Img src={LOGO9} style={{width: '100%', height: '100%'}} /></div>;
};
export const LT9: React.FC<{topic: string}> = ({topic}) => {
  const {t} = useT();
  const w = interpolate(t, [0, 0.4, 4.6, 5.0], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: 110, top: 930, height: 54, display: 'flex', alignItems: 'stretch', opacity: Math.min(1, w * 2), clipPath: `inset(0 ${100 - w * 100}% 0 0)`}}>
      <div style={{background: K.sageD, color: K.bg, fontFamily: SANS, fontWeight: 900, fontSize: 20, letterSpacing: 3, padding: '0 20px', display: 'flex', alignItems: 'center'}}>DÜNYADAN FISILTILAR</div>
      <div style={{background: K.bej, color: K.ink, fontFamily: SANS, fontWeight: 700, fontSize: 24, padding: '0 26px', display: 'flex', alignItems: 'center'}}>{topic}</div>
    </div>
  );
};
export const Ticker9: React.FC<{items: string[]}> = ({items}) => {
  const {t} = useT();
  const txt = items.join('     •     ');
  const x = -((t * 90) % (txt.length * 14 + 200));
  return (
    <div style={{position: 'absolute', left: 0, top: 1040, width: 1920, height: 40, background: K.sageD, overflow: 'hidden', display: 'flex', alignItems: 'center'}}>
      <div style={{position: 'absolute', left: 0, top: 0, height: 40, padding: '0 18px', background: K.taba, color: K.sageD, fontFamily: SANS, fontWeight: 900, fontSize: 17, letterSpacing: 3, display: 'flex', alignItems: 'center', zIndex: 2}}>EKONOMİ RİTMİ</div>
      <div style={{position: 'absolute', left: 230 + x, whiteSpace: 'nowrap', color: K.bg, fontFamily: SANS, fontWeight: 700, fontSize: 19, letterSpacing: 1}}>{txt + '     •     ' + txt + '     •     ' + txt}</div>
    </div>
  );
};
export const End9: React.FC<{next: string}> = ({next}) => {
  const {t} = useT();
  const pulse = 1 + 0.04 * Math.sin(t * 5);
  return (
    <AbsoluteFill style={{background: K.bg}}>
      <Paper />
      <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 300, background: `linear-gradient(120deg, ${K.deep2}, ${K.sageD})`}} />
      <Drop t0={0.1} out={99} x={110} y={90} style={{width: 150, height: 150, borderRadius: '50%', overflow: 'hidden', border: `6px solid ${K.bej}`}}><Img src={LOGO9} style={{width: '100%', height: '100%'}} /></Drop>
      <DropWords t0={0.2} out={99} x={300} y={110} w={1400} s={80} c={K.bg}>DÜNYADAN FISILTILAR</DropWords>
      <Tx9 t0={0.6} out={99} x={110} y={380} s={26} c={K.sage} wt={800} ls={4}>SIRADAKİ VİDEO</Tx9>
      <DropWords t0={0.7} out={99} x={108} y={420} w={1700} s={74} c={K.ink}>{next}</DropWords>
      <Drop t0={1.0} out={99} x={110} y={640} style={{padding: '28px 70px', borderRadius: 60, background: K.sageD, color: K.bg, fontFamily: SANS, fontWeight: 900, fontSize: 56, letterSpacing: 3, transform: `scale(${pulse})`, boxShadow: `0 20px 50px ${K.sage}66`}}>ABONE OL</Drop>
      <Tx9 t0={1.3} out={99} x={110} y={820} s={30} c={K.ink2} wt={600}>Yatırım tavsiyesi değildir • Bilgilendirme amaçlıdır</Tx9>
    </AbsoluteFill>
  );
};
// sahne sarmalayıcı: yavaş kamera itişi
export const Push9: React.FC<{dur: number; children: React.ReactNode}> = ({dur, children}) => {
  const {t} = useT();
  return <SceneDur.Provider value={dur}><AbsoluteFill style={{transform: `scale(${1 + 0.012 * Math.min(1, t / Math.max(1, dur))})`}}>{children}</AbsoluteFill></SceneDur.Provider>;
};

// çerçeveli gerçek görüntü (sahne içinde)
export const Frame9: React.FC<{src: string; t0: number; x: number; y: number; w: number; h: number; from?: number; out?: number}> = ({src, t0, x, y, w, h, from = 0, out}) => {
  const {t, fps} = useT();
  const isVid = /\.(mp4|mov|webm)$/i.test(src);
  const z = 1.04 + 0.05 * Math.min(1, Math.max(0, t - t0) / 12);
  const st: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${z})`, filter: 'saturate(0.8) sepia(0.12) contrast(1.03)'};
  return (
    <Drop t0={t0} out={out} dist={140} x={x} y={y} w={w} h={h} style={{borderRadius: 30, overflow: 'hidden', border: `8px solid ${K.paper}`, boxShadow: '0 24px 60px rgba(59,68,34,.2)'}}>
      {isVid ? <OffthreadVideo src={staticFile(src)} startFrom={Math.round(from * fps)} muted style={st} /> : <Img src={staticFile(src)} style={st} />}
      <AbsoluteFill style={{background: K.taba, opacity: 0.12, mixBlendMode: 'color'}} />
    </Drop>
  );
};
// ikon kutusu
export const Ico9: React.FC<{I: any; c?: string; s?: number; bg?: string}> = ({I, c = K.sage, s = 40, bg}) => (
  <div style={{width: s * 1.8, height: s * 1.8, borderRadius: s * 0.5, background: bg ?? `${c}22`, color: c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><I size={s} strokeWidth={2.2} /></div>
);
