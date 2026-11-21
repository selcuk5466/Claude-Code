import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Coins} from 'lucide-react';
import {Bg4, F, T, useFonts} from './Pro';
import {GLD, GRN, RED} from './Enf4';

// ons yolculuğu: 1 Oca, zirve, 30 Oca, ilkbahar, ağustos, eylül, kasım ortası, 20 Kasım (yaklaşık)
const PTS: [number, number][] = [[0, 4320], [28, 5590], [29, 5030], [105, 4000], [230, 4634], [259, 4400], [319, 3920], [323, 3573]];
export const Thumb21: React.FC = () => {
  useFonts();
  const X = (d: number) => 60 + (d / 323) * 700, Y = (v: number) => 360 + ((5700 - v) / 2300) * 300;
  const path = PTS.map(([d, v], i) => `${i ? 'L' : 'M'}${X(d)},${Y(v)}`).join(' ');
  return (
    <AbsoluteFill style={{width: 1280, height: 720}}>
      <Bg4 total={300} />
      <div style={{position: 'absolute', left: 60, top: 50, width: 96, height: 96, borderRadius: 26, background: `linear-gradient(145deg, ${GLD}, ${GLD}77)`, boxShadow: `0 0 50px ${GLD}99`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06101e'}}><Coins size={56} strokeWidth={2.4} /></div>
      <T x={180} y={52} s={84} wt={900} ls={-3} lh={1}>ALTININ 2026</T>
      <T x={60} y={160} w={900} s={96} wt={900} ls={-4} lh={0.98} glow={GLD} c={GLD}>YOLCULUĞU</T>
      <svg width={1280} height={720} style={{position: 'absolute', left: 0, top: 0}}>
        <defs><linearGradient id="ta" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={GLD} stopOpacity={0.45} /><stop offset="1" stopColor={GLD} stopOpacity={0} /></linearGradient></defs>
        <path d={path + ` L${X(323)},680 L${X(0)},680 Z`} fill="url(#ta)" />
        <path d={path} fill="none" stroke={GLD} strokeWidth={10} strokeLinejoin="round" strokeLinecap="round" style={{filter: `drop-shadow(0 0 12px ${GLD})`}} />
        <circle cx={X(28)} cy={Y(5590)} r={14} fill={GLD} stroke="#fff" strokeWidth={4} />
        <circle cx={X(323)} cy={Y(3573)} r={16} fill={RED} stroke="#fff" strokeWidth={4} />
      </svg>
      <div style={{position: 'absolute', left: X(28) + 24, top: Y(5590) - 34, padding: '6px 16px', borderRadius: 12, background: '#06101fdd', border: `2px solid ${GLD}`, fontFamily: F, fontWeight: 900, fontSize: 34, color: GLD}}>OCAK REKORU</div>
      <div style={{position: 'absolute', left: 250, top: 640, padding: '6px 20px', borderRadius: 14, background: RED, fontFamily: F, fontWeight: 900, fontSize: 46, color: '#fff', boxShadow: `0 0 40px ${RED}aa`}}>ZİRVEDEN −%36</div>
      <div style={{position: 'absolute', left: 840, top: 170, width: 390, height: 330, borderRadius: 30, background: 'linear-gradient(160deg, rgba(12,48,36,.94), rgba(6,22,18,.94))', border: `3px solid ${GRN}`, boxShadow: `0 0 60px ${GRN}66`}}>
        <T x={30} y={24} s={28} wt={800} c="#b6f2d4" ls={2}>GRAM ALTIN</T>
        <T x={30} y={64} w={350} s={29} wt={700} c="#cfdbec">yılbaşına göre sadece</T>
        <T x={24} y={112} w={360} s={118} wt={900} mono c="#fff" glow={GRN} ls={-8}>−%2,6</T>
        <T x={30} y={262} s={44} wt={900} c={GRN}>NEDEN?</T>
      </div>
      <div style={{position: 'absolute', left: 840, top: 530, width: 390, height: 110, borderRadius: 55, background: '#f2c14e22', border: `2px solid ${GLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F, fontWeight: 900, fontSize: 34, color: '#ffe08a', whiteSpace: 'nowrap'}}>BİRİKTİRENLER İÇİN</div>
      <div style={{position: 'absolute', left: 1172, top: 22, width: 86, height: 86, borderRadius: '50%', overflow: 'hidden', boxShadow: `0 0 30px ${GLD}88`}}><Img src={staticFile('brand/logo.png')} style={{width: '100%', height: '100%'}} /></div>
    </AbsoluteFill>
  );
};
