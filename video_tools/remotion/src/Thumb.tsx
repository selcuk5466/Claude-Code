import React from 'react';
import {AbsoluteFill} from 'remotion';
import {C, FONT} from './ui';

export const Thumb: React.FC = () => (
  <AbsoluteFill style={{background: `radial-gradient(900px 600px at 20% 30%, #14315c 0%, ${C.bg} 70%)`, fontFamily: FONT, color: C.white}}>
    <div style={{position: 'absolute', left: 60, top: 54, padding: '8px 26px', borderRadius: 14, background: C.gold, color: '#07142a', fontWeight: 900, fontSize: 38, letterSpacing: 3}}>13 KASIM 2026</div>
    <div style={{position: 'absolute', left: 56, top: 130, fontWeight: 900, fontSize: 150, lineHeight: 0.98, letterSpacing: -4, textShadow: `0 0 50px ${C.gold}55`}}>
      ALTIN<br /><span style={{color: C.gold2}}>13 AYIN</span><br /><span style={{color: C.red}}>DİBİNDE</span>
    </div>
    <div style={{position: 'absolute', right: 60, top: 70, width: 470, padding: '26px 32px', borderRadius: 24, background: 'rgba(14,34,66,.92)', border: `2px solid ${C.red}99`, boxShadow: `0 0 60px ${C.red}44`}}>
      <div style={{fontWeight: 800, fontSize: 26, letterSpacing: 3, color: C.grey}}>ONS ALTIN</div>
      <div style={{fontWeight: 900, fontSize: 104, color: C.red, lineHeight: 1.05}}>-%3 ▼</div>
      <div style={{fontWeight: 700, fontSize: 28, color: C.grey}}>dün tek günde</div>
    </div>
    <div style={{position: 'absolute', right: 60, top: 370, width: 470, padding: '18px 32px', borderRadius: 24, background: 'rgba(14,34,66,.92)', border: `2px solid ${C.gold}88`}}>
      <div style={{fontWeight: 900, fontSize: 40, lineHeight: 1.15}}>NVIDIA CEO <span style={{color: C.red}}>İSTİFA</span></div>
    </div>
    <div style={{position: 'absolute', right: 60, top: 470, width: 470, padding: '18px 32px', borderRadius: 24, background: 'rgba(14,34,66,.92)', border: `2px solid ${C.green}88`}}>
      <div style={{fontWeight: 900, fontSize: 40, lineHeight: 1.15}}>ABD <span style={{color: C.green}}>ÜFE</span> AÇIKLANDI</div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 74, background: 'rgba(3,8,16,.95)', borderTop: `3px solid ${C.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 36, letterSpacing: 4, color: C.gold2}}>GÜNLÜK PİYASA ÖZETİ</div>
  </AbsoluteFill>
);
