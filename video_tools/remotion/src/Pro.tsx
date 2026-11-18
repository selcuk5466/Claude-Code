import React, {useEffect, useMemo, useState} from 'react';
import {AbsoluteFill, continueRender, delayRender, useCurrentFrame} from 'remotion';
import * as echarts from 'echarts';
import {geoNaturalEarth1, geoPath, geoGraticule10} from 'd3-geo';
import {feature} from 'topojson-client';
import world from 'world-atlas/countries-110m.json';
import '@fontsource-variable/inter/index.css';
import '@fontsource-variable/jetbrains-mono/index.css';
import {C, useTL} from './ui';

export const F = "'Inter Variable', Inter, 'Helvetica Neue', Arial, sans-serif";
export const MONO = "'JetBrains Mono Variable', 'Courier New', monospace";
export const P = {
  panel: 'linear-gradient(160deg, rgba(20,40,70,.88) 0%, rgba(9,22,42,.9) 100%)',
  line: 'rgba(160,190,240,.16)',
  muted: '#8fa3bc',
};

// yazı tipleri yüklenene kadar kare üretme
export const useFonts = () => {
  const [h] = useState(() => delayRender('fonts'));
  useEffect(() => {
    Promise.all([document.fonts.load('800 40px "Inter Variable"'), document.fonts.load('500 40px "Inter Variable"'), document.fonts.load('700 40px "JetBrains Mono Variable"')])
      .catch(() => null).then(() => continueRender(h));
  }, [h]);
};

// ECharts: sunucu tarafı SVG, kare başına deterministik
export const EChart: React.FC<{option: any; w: number; h: number}> = ({option, w, h}) => {
  const key = JSON.stringify(option);
  const svg = useMemo(() => {
    const c = echarts.init(null as any, undefined, {renderer: 'svg', ssr: true, width: w, height: h});
    c.setOption({animation: false, backgroundColor: 'transparent', textStyle: {fontFamily: F, color: '#dbe6f5'}, ...option});
    const s = c.renderToSVGString();
    c.dispose();
    return s;
  }, [key, w, h]);
  return <div style={{width: w, height: h}} dangerouslySetInnerHTML={{__html: svg}} />;
};

export const Panel: React.FC<{x: number; y: number; w: number; h: number; t0: number; accent?: string; children?: React.ReactNode; style?: React.CSSProperties; glow?: boolean}> = ({x, y, w, h, t0, accent = C.gold, children, style, glow = true}) => {
  const {p, pop} = useTL();
  const sp = pop(t0), o = p(t0, 0.35);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 26, background: P.panel, border: `1px solid ${P.line}`, opacity: o,
      transform: `translateY(${(1 - sp) * 50}px) scale(${0.95 + 0.05 * sp})`, overflow: 'hidden',
      boxShadow: `0 30px 70px rgba(0,0,0,.45)${glow ? `, 0 0 50px ${accent}22` : ''}, inset 0 1px 0 rgba(255,255,255,.08)`, ...style}}>
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 6, background: `linear-gradient(180deg, ${accent}, ${accent}22)`}} />
      {children}
    </div>
  );
};

export const T: React.FC<{x: number; y: number; w?: number; s?: number; wt?: number; c?: string; o?: number; align?: 'left' | 'center' | 'right'; mono?: boolean; ls?: number; lh?: number; glow?: string; children: React.ReactNode}> = ({x, y, w, s = 30, wt = 600, c = '#f2f6fc', o = 1, align = 'left', mono, ls = 0, lh = 1.12, glow, children}) => (
  <div style={{position: 'absolute', left: align === 'center' && w ? x - w / 2 : align === 'right' && w ? x - w : x, top: y, width: w, fontFamily: mono ? MONO : F, fontSize: s, fontWeight: wt, color: c, opacity: o,
    textAlign: align, letterSpacing: ls, lineHeight: lh, whiteSpace: 'pre-wrap', fontVariantNumeric: 'tabular-nums', textShadow: glow ? `0 0 30px ${glow}77` : undefined}}>{children}</div>
);

export const DateCtx = React.createContext('17 KASIM 2026');
export const Hdr: React.FC<{title: string; sub?: string; icon: React.ReactNode; accent?: string}> = ({title, sub, icon, accent = C.gold}) => {
  const {p} = useTL();
  const date = React.useContext(DateCtx);
  const a = p(0, 0.5);
  return (
    <>
      <div style={{position: 'absolute', left: 110, top: 50, width: 92, height: 92, borderRadius: 24, background: `linear-gradient(145deg, ${accent}, ${accent}77)`, boxShadow: `0 0 40px ${accent}66`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: a, transform: `scale(${0.7 + 0.3 * a})`, color: '#06101e'}}>{icon}</div>
      <T x={230 - 60 * (1 - a)} y={52} s={62} wt={800} ls={-1.5} o={a}>{title}</T>
      {sub && <T x={232} y={124} s={28} wt={500} c={P.muted} o={p(0.25, 0.5)}>{sub}</T>}
      <div style={{position: 'absolute', right: 110, top: 62, padding: '8px 22px', borderRadius: 30, border: `1px solid ${accent}77`, background: `${accent}18`, fontFamily: MONO, fontSize: 22, fontWeight: 700, color: accent, letterSpacing: 2, opacity: a}}>{date}</div>
    </>
  );
};

export const Source: React.FC<{children: string; t0?: number}> = ({children, t0 = 0.8}) => {
  const {p} = useTL();
  return <div style={{position: 'absolute', left: 110, top: 962, width: 1700, fontFamily: F, fontSize: 22, fontWeight: 500, color: P.muted, opacity: p(t0, 0.4) * 0.95}}><span style={{color: C.gold, fontWeight: 800, letterSpacing: 2, marginRight: 12}}>KAYNAK</span>{children}</div>;
};

// ---------------------------------------------------------------- dünya haritası
const land: any = feature(world as any, (world as any).objects.countries);
export type Mk = {lon: number; lat: number; label?: string; value?: string; color: string; t0: number; dx?: number; dy?: number; r?: number};
export type Arc = {from: [number, number]; to: [number, number]; color: string; t0: number};
export const WorldMap: React.FC<{w: number; h: number; hi?: {id: string; color: string; t0: number}[]; markers?: Mk[]; arcs?: Arc[]; x?: number; y?: number; focus?: {c: [number, number]; k: number}}> = ({w, h, hi = [], markers = [], arcs = [], x = 0, y = 0, focus}) => {
  const {p, t} = useTL();
  const proj = useMemo(() => {
    const pr = geoNaturalEarth1().fitExtent([[10, 10], [w - 10, h - 10]], {type: 'Sphere'} as any);
    if (focus) { pr.center(focus.c).scale(pr.scale() * focus.k).translate([w / 2, h / 2]); }
    return pr;
  }, [w, h, focus?.k]);
  const path = useMemo(() => geoPath(proj), [proj]);
  const countries = useMemo(() => (land.features as any[]).map((f) => ({id: String(f.id), d: path(f) || ''})), [path]);
  const grat = useMemo(() => path(geoGraticule10() as any) || '', [path]);
  return (
    <svg width={w} height={h} style={{position: 'absolute', left: x, top: y, overflow: 'visible'}}>
      <path d={grat} fill="none" stroke="rgba(150,180,230,.07)" strokeWidth={1} />
      {countries.map((c) => {
        const hh = hi.find((q) => q.id === c.id);
        const a = hh ? p(hh.t0, 0.6) : 0;
        return <path key={c.id} d={c.d} fill={hh ? hh.color : 'rgba(110,150,210,.13)'} fillOpacity={hh ? 0.14 + 0.5 * a : 1} stroke={hh ? hh.color : 'rgba(160,190,240,.22)'} strokeOpacity={hh ? 0.35 + 0.65 * a : 1} strokeWidth={hh ? 1.4 : 0.6} style={hh ? {filter: `drop-shadow(0 0 ${8 * a}px ${hh.color})`} : undefined} />;
      })}
      {arcs.map((a, i) => {
        const d = path({type: 'LineString', coordinates: [a.from, a.to]} as any) || '';
        const q = p(a.t0, 1.2);
        return <path key={i} d={d} fill="none" stroke={a.color} strokeWidth={3.5} strokeLinecap="round" pathLength={1} strokeDasharray="0.012 0.018" strokeDashoffset={-t * 0.25} opacity={q} style={{filter: `drop-shadow(0 0 8px ${a.color})`}} />;
      })}
      {markers.map((m, i) => {
        const pt = proj([m.lon, m.lat]);
        if (!pt) return null;
        const a = p(m.t0, 0.4);
        const pulse = (t * 1.1 + i * 0.3) % 1.6;
        const r = m.r ?? 9;
        return (
          <g key={i} opacity={a}>
            <circle cx={pt[0]} cy={pt[1]} r={r + pulse * 26} fill="none" stroke={m.color} strokeWidth={3} opacity={Math.max(0, 1 - pulse / 1.6) * 0.8} />
            <circle cx={pt[0]} cy={pt[1]} r={r} fill={m.color} style={{filter: `drop-shadow(0 0 10px ${m.color})`}} />
            {m.label && <text x={pt[0] + (m.dx ?? 16)} y={pt[1] + (m.dy ?? -14)} fill="#f2f6fc" fontFamily={F} fontWeight={800} fontSize={26} style={{paintOrder: 'stroke', stroke: '#06101e', strokeWidth: 6}}>{m.label}</text>}
            {m.value && <text x={pt[0] + (m.dx ?? 16)} y={pt[1] + (m.dy ?? -14) + 32} fill={m.color} fontFamily={MONO} fontWeight={800} fontSize={30} style={{paintOrder: 'stroke', stroke: '#06101e', strokeWidth: 6}}>{m.value}</text>}
          </g>
        );
      })}
    </svg>
  );
};

// ---------------------------------------------------------------- arka plan
export const Bg4: React.FC<{total: number}> = ({total}) => {
  const f = useCurrentFrame(); const t = f / 30;
  const g = (t * 7) % 90;
  return (
    <AbsoluteFill style={{background: 'radial-gradient(1200px 800px at 15% 10%, #11284a 0%, #071326 55%, #040a16 100%)'}}>
      <div style={{position: 'absolute', left: -200 + Math.sin(t * 0.22) * 160, top: -250 + Math.cos(t * 0.19) * 110, width: 1100, height: 1100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(214,173,82,.16), rgba(214,173,82,0) 65%)'}} />
      <div style={{position: 'absolute', left: 1050 + Math.cos(t * 0.2) * 160, top: 420 + Math.sin(t * 0.16) * 120, width: 1100, height: 1100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,.16), rgba(59,130,246,0) 65%)'}} />
      <div style={{position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px)', backgroundSize: '90px 90px', backgroundPosition: `${g}px ${g}px`}} />
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,.5) 100%)'}} />
    </AbsoluteFill>
  );
};
