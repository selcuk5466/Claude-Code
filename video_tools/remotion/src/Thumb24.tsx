import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {K, SANS, SERIF, useFonts9} from './Palet';

const Row: React.FC<{n: string; a: string; b: string}> = ({n, a, b}) => (
  <div style={{display: 'flex', alignItems: 'baseline', gap: 14, whiteSpace: 'nowrap'}}>
    <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, color: K.tabaD, width: 170}}>{n}</div>
    <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 30, color: K.mute, textDecoration: 'line-through'}}>{a}</div>
    <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 44, color: K.sageD, letterSpacing: -1}}>{b}</div>
  </div>
);

export const Thumb24: React.FC = () => {
  useFonts9();
  return (
    <AbsoluteFill style={{width: 1280, height: 720, background: `linear-gradient(135deg, ${K.deep2}, ${K.sageD})`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', right: -180, top: -200, width: 640, height: 640, borderRadius: '50%', background: `${K.sari}1f`}} />
      <div style={{position: 'absolute', left: 60, top: 46, fontFamily: SANS, fontWeight: 900, fontSize: 30, letterSpacing: 4, color: K.sari}}>YENİ YIL ZAMLARI • 2027</div>
      <div style={{position: 'absolute', left: 56, top: 90, fontFamily: SERIF, fontWeight: 900, fontSize: 72, lineHeight: 1.02, color: K.bg, letterSpacing: -2}}>Harç ve cezalar<br />ne kadar oldu?</div>
      <div style={{position: 'absolute', left: 60, top: 320, padding: '10px 30px 18px', borderRadius: 26, background: K.coral, boxShadow: '0 20px 40px rgba(0,0,0,.3)'}}>
        <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 26, color: K.bg}}>YENİDEN DEĞERLEME</div>
        <div style={{fontFamily: SANS, fontWeight: 900, fontSize: 150, color: K.bg, letterSpacing: -5, lineHeight: 1.0}}>%27,83</div>
      </div>
      <div style={{position: 'absolute', left: 60, top: 600, padding: '14px 26px', borderRadius: 22, background: `${K.bg}14`, border: `3px solid ${K.taba}`, fontFamily: SANS, fontWeight: 800, fontSize: 32, color: K.bej}}>+ Kart faizi • Kira istisnası</div>
      <div style={{position: 'absolute', right: 50, top: 200, width: 540, borderRadius: 30, background: K.bg, transform: 'rotate(3deg)', boxShadow: '0 30px 60px rgba(0,0,0,.35)', padding: '30px 34px', display: 'flex', flexDirection: 'column', gap: 18}}>
        <Row n="Pasaport" a="13.410" b="17.142 ₺" />
        <Row n="Kırmızı ışık" a="5.000" b="6.391 ₺" />
        <Row n="Ehliyet (B)" a="6.755" b="8.634 ₺" />
        <Row n="IMEI" a="54.258" b="69.358 ₺" />
      </div>
      <div style={{position: 'absolute', right: 40, bottom: 34, width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', border: `5px solid ${K.sari}`}}><Img src={staticFile('brand/logo.png')} style={{width: '100%', height: '100%'}} /></div>
    </AbsoluteFill>
  );
};
