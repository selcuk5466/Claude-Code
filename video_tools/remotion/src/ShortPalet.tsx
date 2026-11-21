// Shorts (yeni kanal paleti): ilk kare tek iddia, sert düşen yazılar, sayan sayılar, hareketli grafikler
import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Home, ShieldAlert, Bell} from 'lucide-react';
import {Bars, Card9, Count, DropWords, HBar, Ico9, K, LOGO9, Paper, SANS, SERIF, SceneDur, Stock9, Tx9, tr, useFonts9} from './Palet';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
type Cap = [number, number, string];

const Badge: React.FC<{no: number}> = ({no}) => (
  <div style={{position: 'absolute', left: 60, top: 70, display: 'flex', alignItems: 'center', gap: 16, zIndex: 5}}>
    <div style={{width: 76, height: 76, borderRadius: '50%', overflow: 'hidden', border: `4px solid ${K.taba}`}}><Img src={LOGO9} style={{width: '100%', height: '100%'}} /></div>
    <div style={{padding: '10px 22px', borderRadius: 16, background: K.taba, fontFamily: SANS, fontWeight: 900, fontSize: 28, color: K.sageD, letterSpacing: 1}}>BUGÜN CEBİNİZDEN NE ÇIKTI</div>
    <div style={{padding: '10px 18px', borderRadius: 16, background: K.sageD, fontFamily: SANS, fontWeight: 900, fontSize: 30, color: K.bg}}>{'#' + no}</div>
  </div>
);
const Captions: React.FC<{caps: Cap[]; dark?: boolean}> = ({caps}) => {
  const f = useCurrentFrame(); const t = f / FPS;
  const c = caps.find(([a, b]) => t >= a && t < b);
  if (!c) return null;
  const words = c[2].split(' ');
  const per = (c[1] - c[0]) / Math.max(1, words.length);
  return (
    <div style={{position: 'absolute', left: 50, top: 1500, width: 980, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 18px', padding: '22px 10px', borderRadius: 28, background: `${K.sageD}e8`}}>
      {words.map((w, i) => {
        const wt = c[0] + i * per * 0.85;
        const a = interpolate(t, [wt, wt + 0.1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const y = interpolate(t, [wt, wt + 0.12, wt + 0.18], [-40, 6, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const hi = /\d|%/.test(w);
        return <span key={i} style={{fontFamily: SANS, fontWeight: 900, fontSize: 60, color: hi ? K.taba : K.bg, opacity: a, transform: `translateY(${y}px)`, display: 'inline-block'}}>{w}</span>;
      })}
    </div>
  );
};
// ilk kare: iddia 0. karede tam okunur (düşüş yok), 2,6 sn'de solar
const Claim: React.FC<{lines: string; src: string; dur: number}> = ({lines, src, dur}) => {
  const f = useCurrentFrame(); const t = f / FPS;
  const out = interpolate(t, [dur - 0.35, dur], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: out, background: K.sageD}}>
      <div style={{position: 'absolute', inset: 0, opacity: 0.35}}><Stock9 src={src} dur={dur + 1} /></div>
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${K.sageD}55, ${K.sageD}ee 60%)`}} />
      <div style={{position: 'absolute', left: 60, top: 620, width: 960, fontFamily: SERIF, fontWeight: 800, fontSize: 124, lineHeight: 1.0, color: K.bg, letterSpacing: -2, whiteSpace: 'pre-wrap'}}>{lines}</div>
      <div style={{position: 'absolute', left: 60, top: 620 + 124 * lines.split('\n').length + 40, width: 360, height: 12, borderRadius: 6, background: K.taba}} />
    </AbsoluteFill>
  );
};
const End: React.FC = () => {
  const f = useCurrentFrame(); const t = f / FPS;
  const s = 1 + 0.05 * Math.sin(t * 5);
  return (
    <AbsoluteFill style={{background: K.sageD}}>
      <SceneDur.Provider value={99}>
        <DropWords t0={0.05} x={60} y={520} w={960} s={120} c={K.bg}>TAM ÖZET KANALDA</DropWords>
        <Tx9 t0={0.4} x={60} y={810} w={960} s={40} c={K.taba} wt={700}>Kredi • Mevduat • Altın • Dolar • Konut</Tx9>
        <div style={{position: 'absolute', left: 540 - 300 * s, top: 960, width: 600 * s, height: 150 * s, borderRadius: 75, background: K.taba, opacity: interpolate(t, [0.5, 0.7], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, fontFamily: SANS, fontWeight: 900, fontSize: 70 * s, color: K.sageD, letterSpacing: 2}}><Bell size={60 * s} strokeWidth={2.6} />ABONE OL</div>
      </SceneDur.Provider>
    </AbsoluteFill>
  );
};
const Shell: React.FC<{no: number; total: number; voiceEnd: number; claim: React.ReactNode; caps: Cap[]; children: React.ReactNode}> = ({no, total, voiceEnd, claim, caps, children}) => {
  useFonts9();
  return (
    <AbsoluteFill style={{background: K.bg}}>
      <Paper />
      <Sequence from={0} durationInFrames={fr(voiceEnd)}><SceneDur.Provider value={voiceEnd + 0.4}>{children}</SceneDur.Provider></Sequence>
      <Sequence from={0} durationInFrames={fr(2.6)}>{claim}</Sequence>
      <Sequence from={fr(voiceEnd)} durationInFrames={fr(total - voiceEnd)}><End /></Sequence>
      <Badge no={no} />
      <Sequence from={0} durationInFrames={fr(voiceEnd)}><Captions caps={caps} /></Sequence>
      <div style={{position: 'absolute', left: 0, width: 1080, top: 1850, textAlign: 'center', fontFamily: SANS, fontWeight: 700, fontSize: 26, color: K.mute}}>Yatırım tavsiyesi değildir</div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- #7 kredi kartı asgari ödeme
const C7: Cap[] = [[0.2, 2.2, 'Kredi kartına bu ay kaç para ödedin?'], [2.3, 4.4, 'Önümüzdeki ay ne kadar ödeyeceksin?'], [4.6, 9.3, 'Asgari ödeme bazı kartlarda %40’tan %30’a indirildi'], [9.5, 13.4, 'Limiti 100 bin ile 200 bin lira arasındaki kartlarda'], [13.6, 17.6, '%40 olan asgari ödeme %30’a düşürüldü'], [17.8, 23.1, '25 bin liralık ekstrede asgari ödeme 10 binden 7.500 liraya düştü'], [23.3, 26.6, 'Ama ödemediğiniz kısım faiziyle sonraki aya devrediyor'], [26.8, 28.2, 'Yatırım tavsiyesi değildir']];
const G7: React.FC = () => (
  <>
    <DropWords t0={2.6} x={60} y={200} w={960} s={84} stagger={0.06}>Kredi kartında asgari ödeme değişti</DropWords>
    <Card9 t0={4.6} x={60} y={430} w={960} h={330} tone="sage" label="ASGARİ ÖDEME ORANI">
      <Count t0={5.0} v={30} v0={40} d={3.4} pre="%" s={200} c={K.bg} x={40} y={90} />
      <Tx9 t0={8.6} x={520} y={150} w={420} s={44} c={K.taba} wt={800}>%40’tan indi</Tx9>
    </Card9>
    <Card9 t0={9.5} x={60} y={790} w={960} h={150} tone="bej">
      <Tx9 t0={9.8} x={34} y={44} w={900} s={46} c={K.ink} wt={800} font={SERIF}>Limit: 100 – 200 bin ₺</Tx9>
    </Card9>
    <Card9 t0={17.4} x={60} y={970} w={960} h={500} label="25.000 ₺ EKSTREDE ASGARİ ÖDEME" />
    <Bars x={60} y={1000} w={960} h={470} max={11500} bw={250} vs={60} ls={28} items={[
      {label: 'Eski (%40)', v: 10000, t0: 20.6, fmt: (v) => tr(v) + ' ₺', c: K.taba},
      {label: 'Yeni (%30)', v: 7500, t0: 21.6, fmt: (v) => tr(v) + ' ₺', c: K.sage},
    ]} />
    <Card9 t0={23.3} x={60} y={970} w={960} h={500} tone="sage">
      <div style={{position: 'absolute', left: 40, top: 50}}><Ico9 I={ShieldAlert} c={K.taba} s={60} bg={`${K.bg}18`} /></div>
      <Tx9 t0={23.5} x={40} y={200} w={880} s={64} c={K.bg} wt={800} font={SERIF} lh={1.08}>Kalan borç faiziyle sonraki aya devreder</Tx9>
    </Card9>
  </>
);
export const Seri7: React.FC = () => <Shell no={7} total={30.8} voiceEnd={28.1} caps={C7} claim={<Claim src="stock/kart-1.mp4" lines={'Kredi kartı\nasgari ödemesi\ndeğişti'} dur={2.6} />}><G7 /></Shell>;

// ---------------------------------------------------------------- #8 konut kredisi ikinci ev
const C8: Cap[] = [[0.2, 1.7, 'Konut kredisi almak mı istiyorsun?'], [1.8, 4.1, 'Peki banka ne kadar kredi veriyor?'], [4.3, 10.1, 'Tek evi olan ve ikinci ev almak isteyen biri ne kadar kredi çekebilecek?'], [10.3, 14.3, 'Önceki uygulamada evi olanın kredisi dörtte bire düşürülüyordu'], [14.5, 18.4, 'Bankanın 2 milyon lira vereceği yerde 500 bin lira alabiliyordunuz'], [18.6, 23.2, 'Yeni kuralla kısıtlama sadece 2 ya da daha fazla evi olanlara uygulanacak'], [23.4, 24.5, 'Yatırım tavsiyesi değildir']];
const G8: React.FC = () => (
  <>
    <DropWords t0={2.6} x={60} y={200} w={960} s={84} stagger={0.06}>İkinci ev için konut kredisi</DropWords>
    <Card9 t0={4.3} x={60} y={430} w={960} h={250} tone="bej">
      <div style={{position: 'absolute', left: 36, top: 60}}><Ico9 I={Home} c={K.sageD} s={60} bg={`${K.bg}aa`} /></div>
      <Tx9 t0={4.6} x={200} y={60} w={720} s={54} c={K.ink} wt={800} font={SERIF} lh={1.08}>Tek evi var, ikinci evi almak istiyor</Tx9>
    </Card9>
    <Card9 t0={10.3} x={60} y={710} w={960} h={260} label="ÖNCEKİ UYGULAMA • BANKANIN VERECEĞİ KREDİ">
      <HBar x={34} y={70} w={640} v={100} v1={25} tc={12.6} max={100} t0={10.5} label="" fmt={(v) => '%' + tr(v)} c={K.taba} ls={1} />
    </Card9>
    <Card9 t0={14.3} x={60} y={1000} w={960} h={470} label="ÖRNEK • BANKANIN VEREBİLECEĞİ 2 MİLYON ₺" />
    <Bars x={60} y={1030} w={960} h={440} max={2300} bw={260} vs={56} ls={28} items={[
      {label: 'Eskiden', v: 500, t0: 16.6, fmt: (v) => tr(v) + ' bin ₺', c: K.taba},
      {label: 'Yeni kural', v: 2000, t0: 18.8, fmt: (v) => (v >= 1000 ? tr(v / 1000, v % 1000 ? 1 : 0) + ' milyon ₺' : tr(v) + ' bin ₺'), c: K.sage},
    ]} />
    <Card9 t0={19.6} x={60} y={710} w={960} h={260} tone="sage" label="YENİ KURAL • KISITLAMA KİME?">
      <Count t0={19.8} v={2} v0={1} d={1.2} s={150} c={K.bg} x={40} y={80} />
      <Tx9 t0={20.8} x={190} y={110} w={720} s={46} c={K.taba} wt={800}>ve daha fazla evi olana</Tx9>
    </Card9>
  </>
);
export const Seri8: React.FC = () => <Shell no={8} total={27.2} voiceEnd={24.5} caps={C8} claim={<Claim src="stock/ev-2.mp4" lines={'Tek evi olana\ntam konut\nkredisi'} dur={2.6} />}><G8 /></Shell>;
export const SERIP_FRAMES = {s7: fr(30.8), s8: fr(27.2)};
