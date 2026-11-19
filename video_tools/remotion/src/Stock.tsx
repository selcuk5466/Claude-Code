import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {GOLD, Grain, NAVY} from './Brand';

// Gerçek stok görüntü (Pexels): marka renk derecelendirmesi, yavaş yakınlaşma, vinyet, isteğe bağlı başlık.
export const Stock: React.FC<{src: string; dur: number; title?: string; sub?: string; dim?: number; from?: number; pan?: 'in' | 'out' | 'left' | 'right'; fin?: boolean}> =
  ({src, dur, title, sub, dim = 0.35, from = 0, pan = 'in', fin = true}) => {
  const f = useCurrentFrame(), {fps} = useVideoConfig();
  const p = Math.min(1, f / (dur * fps));
  const s = pan === 'out' ? 1.12 - 0.1 * p : 1.02 + 0.1 * p;
  const x = pan === 'left' ? 30 - 60 * p : pan === 'right' ? -30 + 60 * p : 0;
  const fade = interpolate(f, [0, fin ? 10 : 0.01, dur * fps - 10, dur * fps], [fin ? 0 : 1, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const isVid = /\.(mp4|mov|webm)$/i.test(src);
  const st: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${s}) translateX(${x}px)`, filter: 'saturate(0.82) contrast(1.08) brightness(0.92)'};
  const ti = interpolate(f, [8, 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: NAVY, opacity: fade, overflow: 'hidden'}}>
    {isVid ? <OffthreadVideo src={staticFile(src)} startFrom={Math.round(from * fps)} muted style={st} /> : <Img src={staticFile(src)} style={st} />}
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${NAVY}00 40%, ${NAVY}e6 100%)`, mixBlendMode: 'multiply'}} />
    <AbsoluteFill style={{background: '#0b2a55', opacity: 0.22, mixBlendMode: 'color'}} />
    <AbsoluteFill style={{background: `rgba(6,16,31,${dim})`}} />
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)'}} />
    <Grain o={0.06} />
    {title && <div style={{position: 'absolute', left: 120, bottom: 170, opacity: ti, transform: `translateY(${(1 - ti) * 24}px)`}}>
      <div style={{width: 90, height: 5, background: GOLD, marginBottom: 22}} />
      <div style={{fontFamily: 'Inter Variable', fontWeight: 800, fontSize: 84, color: '#fff', textShadow: '0 4px 30px #000a'}}>{title}</div>
      {sub && <div style={{fontFamily: 'Inter Variable', fontWeight: 500, fontSize: 40, color: GOLD, marginTop: 10}}>{sub}</div>}
    </div>}
  </AbsoluteFill>;
};
