import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {K, SANS, SERIF, useFonts9} from './Palet';

export const Thumb23: React.FC = () => {
  useFonts9();
  return (
    <AbsoluteFill style={{width: 1280, height: 720, background: `linear-gradient(135deg, ${K.deep2}, ${K.sageD})`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', right: -180, top: -200, width: 640, height: 640, borderRadius: '50%', background: `${K.sari}1f`}} />
      <div style={{position: 'absolute', left: 60, top: 46, fontFamily: SANS, fontWeight: 900, fontSize: 30, letterSpacing: 4, color: K.sari}}>YENİ HAFTA</div>
      <div style={{position: 'absolute', left: 56, top: 86, fontFamily: SERIF, fontWeight: 900, fontSize: 96, lineHeight: 1.0, color: K.bg, letterSpacing: -2}}>Kalıcı mı,<br />tepki mi?</div>
      <div style={{position: 'absolute', left: 60, top: 330, display: 'flex', gap: 22}}>
        <div style={{padding: '14px 26px', borderRadius: 24, background: K.coral}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, color: K.bg}}>BORSA • GEÇEN HAFTA</div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, color: K.bg, letterSpacing: -3, lineHeight: 1.05}}>−%6</div>
        </div>
        <div style={{padding: '14px 26px', borderRadius: 24, background: K.sari}}>
          <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, color: K.sageD}}>BUGÜN AÇILIŞ</div>
          <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 92, color: K.sageD, letterSpacing: -3, lineHeight: 1.05}}>+%0,55</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 60, top: 560, padding: '16px 28px', borderRadius: 22, background: `${K.bg}14`, border: `3px solid ${K.taba}`, display: 'flex', alignItems: 'baseline', gap: 18}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: K.bej}}>Vatandaşın dolar beklentisi</div>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 58, color: K.taba}}>58,18 ₺</div>
      </div>
      <div style={{position: 'absolute', right: 70, top: 150, width: 360, height: 300, borderRadius: 30, background: K.bg, transform: 'rotate(4deg)', boxShadow: '0 30px 60px rgba(0,0,0,.35)', padding: 28}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 24, color: K.tabaD}}>ONS ALTIN</div>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 74, color: K.sageD, letterSpacing: -3, whiteSpace: 'nowrap'}}>3.620 $</div>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 28, color: K.sage, marginTop: 8}}>dipten +%2,5</div>
      </div>
      <div style={{position: 'absolute', right: 40, bottom: 34, width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', border: `5px solid ${K.sari}`}}><Img src={staticFile('brand/logo.png')} style={{width: '100%', height: '100%'}} /></div>
    </AbsoluteFill>
  );
};
