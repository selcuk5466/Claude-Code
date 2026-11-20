import React from 'react';
import {AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame, interpolate} from 'remotion';
import {ShortBg} from './Short';
import {Landmark, TrendingDown, TrendingUp, Coins, Banknote, PiggyBank, Fuel, ArrowDown} from 'lucide-react';
import {EChart, F, MONO, P, Panel, T, useFonts} from './Pro';
import {GLD, GRN, RED, BLU, PUR, hbar, ico} from './Enf4';
import {useTL} from './ui';
import {Stock} from './Stock';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
const SLV = '#c9d3e0';
const n = (v: number, d = 0) => v.toLocaleString('tr-TR', {minimumFractionDigits: d, maximumFractionDigits: d});
const LOGO = staticFile('brand/logo.png');
type Cap = [number, number, string];

// seri rozeti: her Shorts'ta aynı kimlik
const Badge: React.FC<{no: number}> = ({no}) => (
  <div style={{position: 'absolute', left: 60, top: 70, display: 'flex', alignItems: 'center', gap: 16}}>
    <div style={{width: 74, height: 74, borderRadius: '50%', overflow: 'hidden', boxShadow: `0 0 24px ${GLD}88`}}><Img src={LOGO} style={{width: '100%', height: '100%'}} /></div>
    <div style={{padding: '10px 22px', borderRadius: 16, background: GLD, fontFamily: F, fontWeight: 900, fontSize: 30, color: '#06101e', letterSpacing: 1}}>BUGÜN CEBİNİZDEN NE ÇIKTI</div>
    <div style={{padding: '10px 18px', borderRadius: 16, background: '#e8485a', fontFamily: MONO, fontWeight: 900, fontSize: 32, color: '#fff'}}>{'#' + no}</div>
  </div>
);
// kelime kelime altyazı
const Captions: React.FC<{caps: Cap[]}> = ({caps}) => {
  const f = useCurrentFrame(); const t = f / FPS;
  const c = caps.find(([a, b]) => t >= a && t < b);
  if (!c) return null;
  const words = c[2].split(' ');
  const per = (c[1] - c[0]) / Math.max(1, words.length);
  return (
    <div style={{position: 'absolute', left: 60, top: 1460, width: 960, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '6px 18px'}}>
      {words.map((w, i) => {
        const wt = c[0] + i * per * 0.85;
        const a = interpolate(t, [wt, wt + 0.12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        const hi = /\d|%/.test(w);
        return <span key={i} style={{fontFamily: F, fontWeight: 900, fontSize: 64, color: hi ? '#ffd36b' : '#fff', opacity: a, transform: `translateY(${(1 - a) * 18}px) scale(${0.9 + 0.1 * a})`, display: 'inline-block', textShadow: '0 4px 24px #000, 0 0 2px #000'}}>{w}</span>;
      })}
    </div>
  );
};
// ilk kare: tek iddia (0. saniyeden itibaren tam okunur)
const Claim: React.FC<{src: string; lines: string; c: string; dur: number}> = ({src, lines, c, dur}) => {
  const {p} = useTL();
  const out = 1 - p(dur - 0.35, 0.35);
  return (
    <AbsoluteFill style={{opacity: out, background: '#06101f'}}>
      <Stock src={src} dur={dur + 0.5} dim={0.35} fin={false} />
      <div style={{position: 'absolute', left: 60, top: 640, width: 960, fontFamily: F, fontWeight: 900, fontSize: 118, lineHeight: 1.02, color: '#fff', letterSpacing: -3, whiteSpace: 'pre-wrap', textShadow: '0 6px 40px #000c'}}>{lines}</div>
      <div style={{position: 'absolute', left: 60, top: 640 + 118 * 1.02 * lines.split('\n').length + 20, width: 380, height: 10, borderRadius: 5, background: c, boxShadow: `0 0 26px ${c}`}} />
    </AbsoluteFill>
  );
};
const End: React.FC = () => {
  const {t, p} = useTL();
  const s = 1 + 0.05 * Math.sin(t * 5) * p(0.6, 0.4);
  return (
    <AbsoluteFill>
      <T x={60} y={420} w={960} s={104} wt={900} o={p(0.05, 0.4)} glow={GLD} ls={-3} lh={1.08}>{'TAM ÖZET\nKANALDA'}</T>
      <T x={60} y={680} w={960} s={40} wt={600} c="#8fa3bc" o={p(0.4, 0.4)}>Altın • Dolar • Borsa • KAP • Konut</T>
      <div style={{position: 'absolute', left: 540 - 300 * s, top: 820, width: 600 * s, height: 150 * s, borderRadius: 34, background: 'linear-gradient(145deg, #f05b66, #c13a48)', opacity: p(0.5, 0.3), boxShadow: '0 0 80px #f05b6699', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F, fontWeight: 900, fontSize: 78 * s, color: '#fff', letterSpacing: 2}}>ABONE OL</div>
    </AbsoluteFill>
  );
};
const Shell: React.FC<{no: number; total: number; voiceEnd: number; claim: React.ReactNode; caps: Cap[]; children: React.ReactNode}> = ({no, total, voiceEnd, claim, caps, children}) => {
  useFonts();
  return (
    <>
      <ShortBg />
      <Sequence from={0} durationInFrames={fr(voiceEnd)}>{children}</Sequence>
      <Sequence from={0} durationInFrames={fr(2.9)}>{claim}</Sequence>
      <Sequence from={fr(voiceEnd)} durationInFrames={fr(total - voiceEnd)}><End /></Sequence>
      <Badge no={no} />
      <Captions caps={caps} />
      <T x={540} y={1840} w={1080} align="center" s={26} wt={600} c="#8fa3bc">Yatırım tavsiyesi değildir</T>
    </>
  );
};

// ---------------------------------------------------------------- #1 gram altın
const C1: Cap[] = [[0.15, 2.1, 'Bugün cebinizden ne çıktı?'], [2.1, 3.4, 'Bir numara'], [3.6, 5.1, 'Gram altın dört ay sonra'], [5.2, 7.3, 'ilk kez 6.000 liranın altını gördü'], [7.4, 8.7, 'Sebebi Amerika'], [8.8, 10.1, 'Fed tutanakları'], [10.1, 12.6, 'faizin yükselmeye devam edebileceğini gösterdi'], [12.7, 15.5, 'ons altın 3.800 doların altına indi'], [15.6, 18.8, 'Gümüş bir haftada %11 kaybetti'], [19.0, 20.6, 'Yatırım tavsiyesi değildir']];
const G1: React.FC = () => {
  const {p, pop} = useTL();
  const k = p(5.2, 2.2) * 2;
  const vals = [6269, 6099, 5990];
  const shown = vals.map((v, i) => (i <= Math.floor(k) ? v : i === Math.floor(k) + 1 ? vals[i - 1] + (v - vals[i - 1]) * (k - Math.floor(k)) : null));
  return (
    <>
      <T x={60} y={200} w={960} s={80} wt={900} ls={-3} lh={1.04}>{'GRAM ALTIN\n6.000 ₺ ALTINDA'}</T>
      <Panel x={60} y={420} w={960} h={300} t0={3.0} accent={RED}>
        <T x={34} y={22} s={22} wt={700} c={P.muted} ls={2}>GRAM ALTIN (₺)</T>
        <div style={{position: 'absolute', right: 30, top: 20, color: RED}}>{ico(TrendingDown, 48)}</div>
        <T x={34} y={64} s={170} wt={800} mono c="#fff" glow={RED} ls={-6}>{n(6269 + (5990 - 6269) * p(3.6, 3.4))}</T>
      </Panel>
      <Panel x={60} y={740} w={960} h={330} t0={5.0} accent={GLD}>
        <div style={{position: 'absolute', left: 10, top: 10}}><EChart w={940} h={310} option={{
          grid: {left: 60, right: 80, top: 60, bottom: 50},
          xAxis: {type: 'category', data: ['17 Kas', '18 Kas', '19 Kas'], boundaryGap: false, axisLine: {lineStyle: {color: '#3a5072'}}, axisTick: {show: false}, axisLabel: {color: '#9fb2cb', fontSize: 26, fontWeight: 700, fontFamily: F}},
          yAxis: {type: 'value', min: 5850, max: 6350, show: false},
          series: [{type: 'line', data: shown, smooth: 0.2, symbol: 'circle', symbolSize: 20, lineStyle: {width: 8, color: GLD, shadowBlur: 22, shadowColor: GLD}, itemStyle: {color: GLD, borderColor: '#fff', borderWidth: 3},
            areaStyle: {color: {type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{offset: 0, color: GLD + '55'}, {offset: 1, color: GLD + '00'}]}},
            label: {show: true, position: 'top', formatter: (pp: any) => (pp.dataIndex <= Math.floor(k) ? n(vals[pp.dataIndex]) : ''), color: '#fff', fontSize: 32, fontWeight: 800, fontFamily: MONO, distance: 14}}],
        }} /></div>
      </Panel>
      <Panel x={60} y={1090} w={470} h={330} t0={8.8} accent={BLU}>
        <T x={30} y={22} s={22} wt={700} c={P.muted} ls={2}>SEBEP</T>
        <div style={{position: 'absolute', left: 30, top: 70, color: BLU}}>{ico(Landmark, 64)}</div>
        <T x={30} y={150} w={420} s={44} wt={900}>Fed: faiz artışı devam edebilir</T>
      </Panel>
      <Panel x={550} y={1090} w={470} h={330} t0={12.7} accent={GLD}>
        <T x={30} y={22} s={22} wt={700} c={P.muted} ls={2}>ONS ALTIN ($)</T>
        <T x={30} y={80} s={96} wt={800} mono c={GLD} glow={GLD} ls={-4}>{n(3870 + (3740 - 3870) * p(12.9, 2.2))}</T>
        <T x={30} y={200} w={420} s={30} wt={700} c={RED} o={p(14.4, 0.3)}>3.800'ün altında</T>
      </Panel>
      <div style={{position: 'absolute', left: 60, top: 1090, width: 960, height: 330, borderRadius: 28, background: 'linear-gradient(160deg, rgba(30,36,48,.97), rgba(12,16,24,.97))', border: `2px solid ${SLV}`, opacity: p(15.6, 0.3), transform: `scale(${0.92 + 0.08 * pop(15.6)})`, boxShadow: `0 0 50px ${SLV}44`}}>
        <T x={34} y={24} s={24} wt={700} c={P.muted} ls={2}>GÜMÜŞ • BİR HAFTADA</T>
        <T x={34} y={70} s={190} wt={800} mono c={SLV} glow={SLV} ls={-8}>{'−%' + n(11 * p(16.2, 1.6))}</T>
      </div>
    </>
  );
};
export const Seri1: React.FC = () => <Shell no={1} total={23.4} voiceEnd={20.68} caps={C1} claim={<Claim src="stock/altin-1.mp4" lines={'GRAM ALTIN\n6.000 LİRANIN\nALTINDA'} c={RED} dur={2.9} />}><G1 /></Shell>;

// ---------------------------------------------------------------- #2 kira
const C2: Cap[] = [[0.15, 1.7, 'Bugün cebinizden ne çıktı?'], [1.75, 2.9, 'İki numara'], [3.0, 5.6, 'Kiralar ev fiyatlarını geride bıraktı'], [5.8, 7.2, "Merkez Bankası'na göre ekimde"], [7.3, 10.4, 'konut fiyatları bir yılda %21 arttı'], [10.5, 13.3, 'yeni kiracı kiraları %24,5'], [13.4, 16.0, "İstanbul'da kira artışı %31"], [16.1, 19.0, 'Enflasyon %29,77'], [19.1, 21.9, 'yani ev fiyatları enflasyonun gerisinde kaldı']];
const G2: React.FC = () => {
  const {p} = useTL();
  const bars = [
    {n: 'Konut fiyatı', v: 21.1, txt: '%' + n(21.1 * p(7.6, 1.4), 1), c: GLD, t: 7.6},
    {n: 'Yeni kira', v: 24.5, txt: '%' + n(24.5 * p(10.8, 1.4), 1), c: GRN, t: 10.8},
    {n: 'İstanbul kira', v: 31, txt: '%' + n(31 * p(13.8, 1.4), 0), c: RED, t: 13.8},
    {n: 'Enflasyon', v: 29.77, txt: '%' + n(29.77 * p(16.6, 1.4), 2), c: BLU, t: 16.6},
  ];
  return (
    <>
      <T x={60} y={200} w={960} s={80} wt={900} ls={-3} lh={1.04}>{'KİRALAR EV\nFİYATLARINI GEÇTİ'}</T>
      <Panel x={60} y={430} w={960} h={760} t0={3.0} accent={GLD}>
        <T x={34} y={24} s={24} wt={700} c={P.muted} ls={2}>BİR YILDA ARTIŞ • EKİM 2026</T>
        <div style={{position: 'absolute', left: 20, top: 70}}><EChart w={920} h={660} option={hbar(bars.map((b) => ({n: b.n, v: b.v, txt: b.txt, c: b.c, q: p(b.t, 1.4)})), 0, 40, {left: 230, right: 190, bw: 90, fs: 32})} /></div>
      </Panel>
      <div style={{position: 'absolute', left: 60, top: 1220, width: 960, height: 200, borderRadius: 28, background: `${RED}22`, border: `3px solid ${RED}`, opacity: p(19.1, 0.3), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, boxShadow: `0 0 50px ${RED}55`}}>
        <div style={{color: RED}}>{ico(TrendingDown, 70)}</div>
        <div style={{fontFamily: F, fontWeight: 900, fontSize: 52, color: '#fff', lineHeight: 1.1}}>{'Ev fiyatları\nenflasyonun gerisinde'.split('\n').map((l, i) => <div key={i}>{l}</div>)}</div>
      </div>
      <div style={{position: 'absolute', left: 60, top: 1220, opacity: p(7.3, 0.3) * (1 - p(19.0, 0.2)), display: 'flex', alignItems: 'center', gap: 16, color: GRN, fontFamily: F, fontWeight: 800, fontSize: 36}}>{ico(TrendingUp, 44)}<span style={{color: '#cfdbec'}}>Kaynak: TCMB konut ve kira endeksleri</span></div>
    </>
  );
};
export const Seri2: React.FC = () => <Shell no={2} total={24.6} voiceEnd={21.92} caps={C2} claim={<Claim src="stock/anahtar-3.mp4" lines={'KİRALAR EV\nFİYATLARINI\nGEÇTİ'} c={GLD} dur={2.9} />}><G2 /></Shell>;

// ---------------------------------------------------------------- #3 haftanın bilançosu
const C3: Cap[] = [[0.15, 1.8, 'Bugün cebinizden ne çıktı?'], [1.85, 3.7, 'Üç numara'], [3.9, 6.4, 'Bu hafta altın eridi, mevduat kazandı'], [6.6, 10.9, 'Pazartesi 100.000 lirayla gram altın alan bugün 92.000 liraya sahip'], [11.5, 13.2, 'Gümüş alan 85.000'], [13.3, 15.5, 'dolar alan 100.400 lira'], [15.7, 19.2, 'Mevduatta tutan 100.800 lira'], [19.4, 20.85, 'Yatırım tavsiyesi değildir']];
const G3: React.FC = () => {
  const {p} = useTL();
  const rows: [string, number, string, number, any][] = [['Gram altın', 92137, GLD, 8.1, Coins], ['Gümüş', 85260, SLV, 11.5, Coins], ['Dolar', 100377, GRN, 13.3, Banknote], ['Mevduat', 100808, PUR, 15.7, PiggyBank]];
  return (
    <>
      <T x={60} y={200} w={960} s={80} wt={900} ls={-3} lh={1.04}>{'100.000 ₺\nBU HAFTA NE OLDU?'}</T>
      {rows.map(([name, v, col, t0, I], i) => {
        const q = p(t0, 1.4); const val = 100000 + (v - 100000) * q; const w = 760 * (val - 80000) / 22000;
        return (
          <div key={name} style={{position: 'absolute', left: 60, top: 440 + i * 240, width: 960, height: 210, borderRadius: 28, background: P.panel, border: `1px solid ${col}66`, opacity: p(t0 - 0.3, 0.3), boxShadow: `0 0 40px ${col}22`}}>
            <div style={{position: 'absolute', left: 26, top: 24, color: col}}>{ico(I, 48)}</div>
            <T x={96} y={26} s={40} wt={800}>{name}</T>
            <T x={930} y={20} w={500} align="right" s={64} wt={800} mono c={v >= 100000 ? GRN : RED} glow={v >= 100000 ? GRN : RED}>{n(val) + ' ₺'}</T>
            <div style={{position: 'absolute', left: 30, top: 130, width: 900, height: 44, borderRadius: 12, background: 'rgba(255,255,255,.06)'}} />
            <div style={{position: 'absolute', left: 30, top: 130, width: Math.max(0, w), height: 44, borderRadius: 12, background: `linear-gradient(90deg, ${col}66, ${col})`}} />
            <div style={{position: 'absolute', left: 30 + 760 * 20000 / 22000, top: 120, width: 3, height: 64, background: '#ffffffaa'}} />
          </div>
        );
      })}
    </>
  );
};
export const Seri3: React.FC = () => <Shell no={3} total={23.5} voiceEnd={20.88} caps={C3} claim={<Claim src="stock/para-tl.mp4" lines={'ALTIN ERİDİ\nMEVDUAT\nKAZANDI'} c={PUR} dur={2.9} />}><G3 /></Shell>;

// ---------------------------------------------------------------- #4 motorin
const C4: Cap[] = [[0.1, 1.9, 'Bugün cebinizden ne çıktı?'], [1.95, 3.0, 'Dört numara'], [3.1, 5.3, 'Motorine 6,5 lira indirim geldi'], [5.4, 10.7, "İstanbul'da litresi 95,30'dan 88,80'e indi"], [10.9, 16.2, '50 litrelik depoyu dolduran 325 lira daha az ödeyecek'], [16.3, 19.1, 'Benzin ise 71,30 liradan sabit']];
const PumpV: React.FC<{y: number; label: string; v: string; c: string; t0: number}> = ({y, label, v, c, t0}) => {
  const {p, pop} = useTL();
  return (
    <div style={{position: 'absolute', left: 60, top: y, width: 960, height: 330, borderRadius: 30, background: 'linear-gradient(180deg, #0d1a2e, #060d18)', border: `3px solid ${c}`, boxShadow: `0 0 50px ${c}33`, opacity: p(t0, 0.3), transform: `scale(${0.92 + 0.08 * pop(t0)})`}}>
      <div style={{position: 'absolute', left: 30, top: 26, color: c}}>{ico(Fuel, 52)}</div>
      <T x={100} y={30} s={40} wt={800} c={c} ls={3}>{label}</T>
      <div style={{position: 'absolute', left: 30, top: 110, width: 900, height: 190, borderRadius: 18, background: '#020611', border: '1px solid #1f3352', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 800, fontSize: 150, color: '#ffe08a', textShadow: '0 0 24px #ffd36b88'}}>{v}</div>
    </div>
  );
};
const G4: React.FC = () => {
  const {p} = useTL();
  return (
    <>
      <T x={60} y={200} w={960} s={80} wt={900} ls={-3} lh={1.04}>{'MOTORİNE\n6,5 ₺ İNDİRİM'}</T>
      <PumpV y={430} label="MOTORİN • İSTANBUL" v={n(95.3 + (88.8 - 95.3) * p(6.0, 3.5), 2)} c={GRN} t0={3.2} />
      <div style={{position: 'absolute', left: 60, top: 790, width: 960, height: 300, borderRadius: 30, background: `${GRN}18`, border: `3px solid ${GRN}`, opacity: p(10.9, 0.3), boxShadow: `0 0 50px ${GRN}44`}}>
        <T x={34} y={26} s={30} wt={700} c={P.muted} ls={2}>50 LİTRELİK DEPO</T>
        <T x={34} y={80} s={60} wt={800} mono c="#cfdbec">50 L × 6,5 ₺</T>
        <T x={34} y={160} s={110} wt={900} mono c={GRN} glow={GRN}>{'= ' + n(325 * p(12.0, 1.8)) + ' ₺'}</T>
      </div>
      <div style={{position: 'absolute', left: 60, top: 1110, width: 960, height: 160, borderRadius: 26, background: P.panel, border: `2px solid ${GLD}`, opacity: p(16.3, 0.3), display: 'flex', alignItems: 'center', gap: 26, paddingLeft: 30}}>
        <div style={{color: GLD}}>{ico(Fuel, 56)}</div>
        <div style={{fontFamily: F, fontWeight: 800, fontSize: 44, color: '#fff'}}>Benzin <span style={{fontFamily: MONO, color: GLD}}>71,30 ₺</span> sabit</div>
      </div>
    </>
  );
};
export const Seri4: React.FC = () => <Shell no={4} total={21.8} voiceEnd={19.16} caps={C4} claim={<Claim src="stock/foto-akaryakit-12377482.jpg" lines={'MOTORİNE\n6,5 LİRA\nİNDİRİM'} c={GRN} dur={2.9} />}><G4 /></Shell>;
export const SERI_FRAMES = {s1: fr(23.4), s2: fr(24.6), s3: fr(23.5), s4: fr(21.8)};
