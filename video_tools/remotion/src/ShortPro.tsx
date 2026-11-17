import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import cipD from './short_q_cip.json';
import bilD from './short_q_bilanco.json';
import antD from './short_q_anthropic.json';
import butD from './short_q_butce.json';
import {Captions, ShortBg} from './Short';
import {Check, Clock, Coins, Cpu, Globe, Lock, Receipt, Rocket, TrendingDown, TrendingUp} from 'lucide-react';
import {EChart, F, MONO, P, Panel, T, WorldMap, useFonts} from './Pro';
import {BLU, GLD, GRN, PUR, RED, colBars, gaugeOpt, ico, num} from './Enf4';
import {useTL} from './ui';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
type D = typeof cipD;
const frames = (d: {total: number}) => Math.ceil(d.total * FPS);
const at = (d: D, j: number) => d.segments[0].start + d.segments[0].sentences[j].start;

const Title: React.FC<{lines: string; c?: string}> = ({lines, c = GLD}) => {
  const {p} = useTL();
  return (
    <>
      <T x={60} y={130 + 40 * (1 - p(0, 0.5))} w={960} s={86} wt={900} ls={-3} lh={1.04} o={p(0, 0.4)}>{lines}</T>
      <div style={{position: 'absolute', left: 60, top: 130 + 86 * 1.04 * lines.split('\n').length + 16, width: 340 * p(0.15, 0.6), height: 8, borderRadius: 4, background: `linear-gradient(90deg, ${c}, ${c}66)`, boxShadow: `0 0 24px ${c}`}} />
    </>
  );
};
const Tag: React.FC<{y: number; t0: number; c: string; icon: React.ReactNode; head: string; text: string; h?: number; ts?: number}> = ({y, t0, c, icon, head, text, h = 112, ts = 34}) => {
  const {p, pop} = useTL(); const sp = pop(t0);
  return (
    <div style={{position: 'absolute', left: 60, top: y, width: 960, height: h, borderRadius: 26, background: P.panel, border: `1px solid ${P.line}`, opacity: p(t0, 0.3), transform: `translateX(${(1 - sp) * 90}px)`, boxShadow: `0 0 36px ${c}25`}}>
      <div style={{position: 'absolute', left: 18, top: (h - 74) / 2, width: 74, height: 74, borderRadius: 20, background: `${c}26`, border: `1px solid ${c}88`, color: c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{icon}</div>
      <T x={116} y={14} s={20} wt={700} c={P.muted} ls={1.5}>{head}</T>
      <T x={116} y={44} w={820} s={ts} wt={800}>{text}</T>
    </div>
  );
};
const Stat: React.FC<{x: number; y: number; w: number; h?: number; t0: number; c: string; label: string; value: string; sub?: string; vs?: number}> = ({x, y, w, h = 200, t0, c, label, value, sub, vs = 74}) => {
  const {p} = useTL();
  return (
    <Panel x={x} y={y} w={w} h={h} t0={t0} accent={c}>
      <T x={30} y={20} s={20} wt={700} c={P.muted} ls={2}>{label}</T>
      <T x={30} y={sub ? 54 : 74} w={w - 50} s={vs} wt={800} mono c="#fff" glow={c} ls={-2} o={p(t0 + 0.1, 0.3)}>{value}</T>
      {sub && <T x={30} y={h - 50} w={w - 50} s={24} wt={500} c={P.muted} o={p(t0 + 0.2, 0.3)}>{sub}</T>}
    </Panel>
  );
};
const Src: React.FC<{children: string}> = ({children}) => {
  const {p} = useTL();
  return <div style={{position: 'absolute', left: 60, top: 1135, width: 960, fontFamily: F, fontSize: 22, fontWeight: 500, color: P.muted, opacity: p(0.8, 0.4)}}><span style={{color: GLD, fontWeight: 800, letterSpacing: 2, marginRight: 10}}>KAYNAK</span>{children}</div>;
};

// 1) çip kuralı
const CipA: React.FC = () => {
  const d = cipD as D; const j = (i: number) => at(d, i); const BJ: [number, number] = [116.4, 39.9];
  return (
    <>
      <Title lines={'ABD\'DEN YENİ\nÇİP KURALI'} />
      <WorldMap w={990} h={560} x={45} y={400}
        hi={[{id: '840', color: BLU, t0: 0.3}, {id: '156', color: RED, t0: j(1)}, {id: '360', color: GLD, t0: j(2)}, {id: '458', color: GLD, t0: j(2) + 0.5}, {id: '764', color: GLD, t0: j(2) + 1.0}, {id: '076', color: GLD, t0: j(2) + 1.5}]}
        markers={[{lon: -77, lat: 38.9, label: 'ABD', color: BLU, t0: 0.3, dx: 14, dy: -14}, {lon: 116.4, lat: 39.9, label: 'Çin', color: RED, t0: j(1), dx: -60, dy: -18}, {lon: 106.8, lat: -6.2, label: 'Endonezya', color: GLD, t0: j(2), dx: 12, dy: 40},
          {lon: 101.7, lat: 3.1, label: 'Malezya', color: GLD, t0: j(2) + 0.5, dx: -150, dy: 8}, {lon: 103.8, lat: 1.3, label: 'Singapur', color: GLD, t0: j(2) + 1.0, dx: 16, dy: 4}, {lon: 100.5, lat: 13.8, label: 'Tayland', color: GLD, t0: j(2) + 1.5, dx: -130, dy: -6}, {lon: -46.6, lat: -23.5, label: 'Brezilya', color: GLD, t0: j(2) + 2.0, dx: 14, dy: -14}]}
        arcs={[{from: [-77, 38.9], to: BJ, color: BLU, t0: 0.4}, {from: BJ, to: [106.8, -6.2], color: RED, t0: j(1)}, {from: BJ, to: [101.7, 3.1], color: RED, t0: j(1) + 0.4}, {from: BJ, to: [100.5, 13.8], color: RED, t0: j(1) + 0.8}, {from: BJ, to: [-46.6, -23.5], color: RED, t0: j(1) + 1.2}]} />
      <Tag y={985} t0={0.6} c={GLD} icon={ico(Lock, 38)} head="YENİ KURAL" text="Uzaktan erişim artık lisansa bağlı" />
      <Src>ABD Ticaret Bakanlığı (BIS) • TechCrunch, Bloomberg • 16 Kasım 2026</Src>
    </>
  );
};
// 2) bilanço beklentileri
const BilA: React.FC = () => {
  const {p} = useTL(); const d = bilD as D; const j = (i: number) => at(d, i);
  const q1 = p(j(0), 1.0), q2 = p(j(1), 1.0);
  return (
    <>
      <Title lines={'NVIDIA BİLANÇOSU\nBU AKŞAM'} c={GRN} />
      <Panel x={60} y={400} w={960} h={440} t0={0.3} accent={GRN}>
        <T x={30} y={20} s={20} wt={700} c={P.muted} ls={2}>GELİR (MİLYAR $)</T>
        <div style={{position: 'absolute', left: 20, top: 56}}>
          <EChart w={920} h={366} option={{...colBars(['Şirket rehberliği', 'Analist beklentisi'], [{n: 'Gelir', vals: [108, 109.1], c: GRN}], 1, 118, (v) => num(v, 1)), yAxis: {type: 'value', min: 90, max: 114, show: false}, series: [{type: 'bar', barWidth: 140, data: [{value: 108 * q2, itemStyle: {color: {type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{offset: 0, color: '#6b8bb5'}, {offset: 1, color: '#6b8bb555'}]}, borderRadius: [12, 12, 2, 2]}}, {value: 109.1 * q1, itemStyle: {color: {type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{offset: 0, color: GRN}, {offset: 1, color: GRN + '55'}]}, borderRadius: [12, 12, 2, 2], shadowBlur: 30, shadowColor: GRN + '66'}}], label: {show: true, position: 'top', formatter: (pp: any) => (pp.dataIndex === 0 ? '≈108' : '≈109,1'), color: '#fff', fontSize: 38, fontWeight: 800, fontFamily: MONO}}]}} />
        </div>
      </Panel>
      <Stat x={60} y={870} w={470} h={190} t0={j(0) + 1.8} c={GRN} label="HİSSE BAŞI KÂR (BEKLENTİ)" value={'$' + num(2.48 * p(j(0) + 1.8, 0.8), 2)} vs={64} />
      <Stat x={550} y={870} w={470} h={190} t0={j(2)} c={GLD} label="BRÜT MARJ REHBERLİĞİ" value="%74" sub="önceki çeyrek %75" vs={70} />
      <Tag y={1080} t0={j(3)} c={BLU} icon={ico(Check, 38)} head="SON DÖRT ÇEYREK" text="Dördünde de beklentiyi aştı" h={92} ts={32} />
    </>
  );
};
// 3) Anthropic
const AntA: React.FC = () => {
  const {p} = useTL(); const d = antD as D; const j = (i: number) => at(d, i);
  const rq = p(j(0), 1.0);
  return (
    <>
      <Title lines={'ANTHROPIC\nHALKA ARZI'} c={PUR} />
      <Panel x={60} y={400} w={960} h={290} t0={0.3} accent={PUR}>
        <T x={30} y={20} s={20} wt={700} c={P.muted} ls={2}>FİYAT ARALIĞI • 825 MİLYON HİSSE</T>
        <T x={30} y={58} s={104} wt={800} mono c="#fff" glow={PUR} ls={-3}>$70 – $78</T>
        <div style={{position: 'absolute', left: 34, top: 215, width: 890, height: 16, borderRadius: 8, background: 'rgba(255,255,255,.08)'}} />
        <div style={{position: 'absolute', left: 34 + 890 * 0.15, top: 215, width: 890 * 0.7 * rq, height: 16, borderRadius: 8, background: `linear-gradient(90deg, ${PUR}, #c4b0ff)`, boxShadow: `0 0 26px ${PUR}`}} />
      </Panel>
      <Stat x={60} y={720} w={470} h={210} t0={j(1)} c={GLD} label="TEMEL ARZ" value="$64 mlr" sub="üst banda göre • + $26 mlr plasman" vs={66} />
      <Stat x={550} y={720} w={470} h={210} t0={j(2)} c={BLU} label="DEĞERLEME" value="≈$1–1,4 tr" sub="yönteme göre değişiyor" vs={58} />
      <Tag y={960} t0={j(3)} c={GRN} icon={ico(Rocket, 40)} head="PERŞEMBE" text="Nasdaq'ta işlem başlıyor: ANT" h={120} />
      <Src>CNBC, TechCrunch • fiyatlama 18 Kasım akşamı</Src>
    </>
  );
};
// 4) bütçe
const ButA: React.FC = () => {
  const {p} = useTL(); const d = butD as D; const j = (i: number) => at(d, i);
  return (
    <>
      <Title lines={'EKİM BÜTÇESİ\nAÇIK VERDİ'} c={RED} />
      <Panel x={60} y={400} w={960} h={400} t0={0.3} accent={RED}>
        <T x={30} y={20} s={20} wt={700} c={P.muted} ls={2}>EKİM AYI BÜTÇE AÇIĞI (MİLYAR TL)</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={920} h={330} option={colBars(['Ekim 2025', 'Ekim 2026'], [{n: 'Açık', vals: [223.2, 481.1], c: RED}], p(j(0) + 0.6, 1.0), 560, (v) => num(v, 1))} /></div>
      </Panel>
      <Panel x={60} y={830} w={960} h={300} t0={j(1)} accent={BLU}>
        <T x={30} y={18} s={20} wt={700} c={P.muted} ls={2}>EKİM 2026 • GELİR VE GİDER (MİLYAR TL)</T>
        <div style={{position: 'absolute', left: 20, top: 44}}><EChart w={920} h={250} option={colBars(['Gelir (+%13,2)', 'Gider (+%29,9)'], [{n: 'Tutar', vals: [1298, 1779], c: BLU}], p(j(1) + 0.4, 1.0), 2300, (v) => v.toLocaleString('tr-TR'))} /></div>
      </Panel>
    </>
  );
};

const make = (data: D, S: React.FC): React.FC => () => {
  useFonts();
  const total = frames(data);
  return (
    <>
      <ShortBg />
      <T x={540} y={60} w={1080} align="center" s={26} wt={600} c="#8fa3bc">Yatırım tavsiyesi değildir</T>
      <Sequence from={0} durationInFrames={fr(data.endCardStart)}><S /></Sequence>
      <Sequence from={fr(data.endCardStart)} durationInFrames={total - fr(data.endCardStart)}><End /></Sequence>
      <Captions caps={data.captions} />
    </>
  );
};
const End: React.FC = () => {
  const {t, p} = useTL();
  const s = 1 + 0.05 * Math.sin(t * 5) * p(1.2, 0.4);
  return (
    <AbsoluteFill>
      <T x={60} y={330} w={960} s={112} wt={900} o={p(0.1, 0.5)} glow={GLD} ls={-3} lh={1.1}>{'TAM ÖZET\nKANALDA'}</T>
      <div style={{position: 'absolute', left: 60, top: 600, width: 400 * p(0.5, 0.6), height: 9, borderRadius: 5, background: `linear-gradient(90deg, #ffd36b, ${GLD})`, boxShadow: `0 0 26px ${GLD}`}} />
      <T x={60} y={640} w={960} s={44} wt={500} c="#8fa3bc" o={p(0.9, 0.5)}>{'Nvidia • ABD • Asya • Türkiye\nKapanış tablosu'}</T>
      <div style={{position: 'absolute', left: 540 - 300 * s, top: 800, width: 600 * s, height: 150 * s, borderRadius: 34, background: `linear-gradient(145deg, ${RED}, #c13a48)`, opacity: p(1.2, 0.4), boxShadow: `0 0 80px ${RED}99`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F, fontWeight: 900, fontSize: 78 * s, color: '#fff', letterSpacing: 2}}>ABONE OL</div>
      <T x={540} y={1010} w={960} align="center" s={38} wt={700} c="#ffe08a" o={p(1.8, 0.5)}>Yarın: Nvidia bilançosu ve tepki</T>
    </AbsoluteFill>
  );
};
export const QCip = make(cipD as D, CipA);
export const QBil = make(bilD as D, BilA);
export const QAnt = make(antD as D, AntA);
export const QBut = make(butD as D, ButA);
export const Q_FRAMES = {cip: frames(cipD), bil: frames(bilD), ant: frames(antD), but: frames(butD)};
