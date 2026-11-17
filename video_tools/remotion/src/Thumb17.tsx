import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Cpu} from 'lucide-react';
import {Bg4, EChart, F, MONO, T, useFonts} from './Pro';
import {GLD, RED, gaugeOpt} from './Enf4';

export const Thumb17: React.FC = () => {
  useFonts();
  return (
    <AbsoluteFill style={{width: 1280, height: 720}}>
      <Bg4 total={300} />
      <div style={{position: 'absolute', left: 60, top: 54, width: 96, height: 96, borderRadius: 26, background: 'linear-gradient(145deg, #35c987, #35c98777)', boxShadow: '0 0 50px #35c98799', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06101e'}}><Cpu size={56} strokeWidth={2.4} /></div>
      <T x={180} y={60} s={88} wt={900} ls={-3} lh={1}>NVIDIA</T>
      <T x={60} y={180} w={760} s={112} wt={900} ls={-4} lh={0.98} glow={GLD}>BU AKŞAM{'\n'}BİLANÇO</T>
      <div style={{position: 'absolute', left: 60, top: 440, width: 640, height: 210, borderRadius: 30, background: 'linear-gradient(160deg, rgba(60,20,30,.92), rgba(30,10,20,.92))', border: `3px solid ${RED}`, boxShadow: `0 0 60px ${RED}77`}}>
        <T x={34} y={20} s={26} wt={700} c="#ffb3b9" ls={3}>NASDAQ • TEK GÜNDE</T>
        <T x={34} y={56} s={150} wt={900} mono c={RED} glow={RED} ls={-8}>−%2,5</T>
      </div>
      <div style={{position: 'absolute', left: 740, top: 150, width: 500, height: 440}}>
        <EChart w={500} h={440} option={gaugeOpt(10.3, 20, GLD, '±%10,3', 76)} />
      </div>
      <T x={990} y={560} w={420} align="center" s={26} wt={800} c="#cfdbec" ls={2}>BEKLENEN HAREKET</T>
      <div style={{position: 'absolute', left: 740, top: 625, width: 500, height: 64, borderRadius: 32, background: '#d6ad5222', border: `2px solid ${GLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F, fontWeight: 900, fontSize: 30, color: '#ffe08a', letterSpacing: 2}}>00.20 • TÜRKİYE SAATİYLE</div>
    </AbsoluteFill>
  );
};
