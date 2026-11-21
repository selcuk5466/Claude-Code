import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Home} from 'lucide-react';
import {K, SANS, SERIF, useFonts9} from './Palet';

export const Thumb22: React.FC = () => {
  useFonts9();
  return (
    <AbsoluteFill style={{width: 1280, height: 720, background: `linear-gradient(135deg, ${K.deep2}, ${K.sageD})`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', right: -160, top: -160, width: 620, height: 620, borderRadius: '50%', background: `${K.sari}22`}} />
      <div style={{position: 'absolute', left: 60, top: 46, fontFamily: SANS, fontWeight: 900, fontSize: 30, letterSpacing: 4, color: K.sari}}>KREDİ KARTI</div>
      <div style={{position: 'absolute', left: 56, top: 84, fontFamily: SERIF, fontWeight: 900, fontSize: 104, lineHeight: 0.98, color: K.bg, letterSpacing: -2}}>Asgari ödeme<br />düştü</div>
      <div style={{position: 'absolute', left: 60, top: 330, display: 'flex', alignItems: 'center', gap: 24}}>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 130, color: K.taba, letterSpacing: -4, textDecoration: 'line-through', textDecorationThickness: 10, textDecorationColor: K.coral, opacity: 0.85}}>%40</div>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 90, color: K.sari}}>→</div>
        <div style={{padding: '0 28px', borderRadius: 30, background: K.coral, fontFamily: SANS, fontWeight: 900, fontSize: 170, color: K.bg, letterSpacing: -5, lineHeight: 1.08, boxShadow: '0 20px 50px rgba(0,0,0,.3)'}}>%30</div>
      </div>
      <div style={{position: 'absolute', left: 60, top: 580, display: 'flex', alignItems: 'center', gap: 18, padding: '18px 30px', borderRadius: 24, background: K.sari}}>
        <Home size={52} color={K.sageD} strokeWidth={2.6} />
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 44, color: K.sageD}}>İkinci eve tam kredi</div>
      </div>
      <div style={{position: 'absolute', right: 70, top: 120, width: 400, height: 250, borderRadius: 26, background: `linear-gradient(135deg, ${K.taba}, ${K.coral})`, transform: 'rotate(8deg)', boxShadow: '0 30px 60px rgba(0,0,0,.35)'}}>
        <div style={{position: 'absolute', left: 34, top: 40, width: 70, height: 52, borderRadius: 10, background: K.sari}} />
        <div style={{position: 'absolute', left: 34, top: 130, fontFamily: SANS, fontWeight: 800, fontSize: 30, color: K.sageD, letterSpacing: 5}}>•••• •••• 2026</div>
        <div style={{position: 'absolute', left: 34, top: 180, fontFamily: SANS, fontWeight: 900, fontSize: 28, color: K.sageD}}>LİMİT 150.000 ₺</div>
      </div>
      <div style={{position: 'absolute', right: 40, bottom: 34, width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', border: `5px solid ${K.sari}`}}><Img src={staticFile('brand/logo.png')} style={{width: '100%', height: '100%'}} /></div>
    </AbsoluteFill>
  );
};
