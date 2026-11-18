import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Cpu, TrendingUp} from 'lucide-react';
import {Bg4, F, MONO, T, useFonts} from './Pro';
import {GLD, GRN} from './Enf4';

export const Thumb18: React.FC = () => {
  useFonts();
  return (
    <AbsoluteFill style={{width: 1280, height: 720}}>
      <Bg4 total={300} />
      <div style={{position: 'absolute', left: 60, top: 50, width: 96, height: 96, borderRadius: 26, background: `linear-gradient(145deg, ${GRN}, ${GRN}77)`, boxShadow: `0 0 50px ${GRN}99`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06101e'}}><Cpu size={56} strokeWidth={2.4} /></div>
      <T x={180} y={56} s={90} wt={900} ls={-3} lh={1}>NVIDIA</T>
      <T x={60} y={172} w={800} s={104} wt={900} ls={-4} lh={0.98} glow={GLD}>{'BEKLENTİYİ\nAŞTI'}</T>
      <div style={{position: 'absolute', left: 60, top: 420, width: 700, height: 240, borderRadius: 30, background: 'linear-gradient(160deg, rgba(14,52,40,.94), rgba(8,26,22,.94))', border: `3px solid ${GRN}`, boxShadow: `0 0 60px ${GRN}77`}}>
        <T x={34} y={20} s={26} wt={700} c="#a8f0cc" ls={3}>ÇEYREKLİK GELİR</T>
        <T x={30} y={52} w={640} s={128} wt={900} mono c="#fff" glow={GRN} ls={-8}>$115,8</T>
        <T x={36} y={198} w={640} s={28} wt={800} c={GRN} ls={2}>MİLYAR • YILLIK +%103</T>
      </div>
      <div style={{position: 'absolute', left: 820, top: 110, width: 400, height: 250, borderRadius: 30, background: 'rgba(8,22,42,.92)', border: `3px solid ${GRN}`, boxShadow: `0 0 50px ${GRN}55`}}>
        <div style={{position: 'absolute', right: 26, top: 22, color: GRN}}><TrendingUp size={46} strokeWidth={2.6} /></div>
        <T x={30} y={22} s={24} wt={700} c="#cfdbec" ls={2}>HİSSE</T>
        <T x={26} y={70} w={360} s={110} wt={900} mono c={GRN} glow={GRN} ls={-6}>+%4,8</T>
      </div>
      <div style={{position: 'absolute', left: 820, top: 390, width: 400, height: 140, borderRadius: 26, background: 'rgba(8,22,42,.92)', border: `2px solid ${GLD}`}}>
        <T x={30} y={18} s={22} wt={700} c="#cfdbec" ls={2}>KOSPI</T>
        <T x={30} y={54} w={360} s={58} wt={900} mono c="#ffe08a" ls={-3}>5.000 ÜSTÜ</T>
      </div>
      <div style={{position: 'absolute', left: 820, top: 560, width: 400, height: 100, borderRadius: 50, background: '#f05b6622', border: '2px solid #f05b66', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F, fontWeight: 900, fontSize: 32, color: '#ff9aa2', letterSpacing: 1, whiteSpace: 'nowrap'}}>BU AKŞAM: FED 22.00</div>
      <div style={{position: 'absolute', left: 1172, top: 22, width: 86, height: 86, borderRadius: '50%', overflow: 'hidden', boxShadow: `0 0 30px ${GLD}88`}}><Img src={staticFile('brand/logo.png')} style={{width: '100%', height: '100%'}} /></div>
    </AbsoluteFill>
  );
};
