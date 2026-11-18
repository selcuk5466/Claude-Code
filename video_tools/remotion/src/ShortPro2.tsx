import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import nvD from './short_n_nvidia.json';
import koD from './short_n_kospi.json';
import alD from './short_n_altin.json';
import isD from './short_n_issizlik.json';
import {Captions, ShortBg} from './Short';
import {Coins, Cpu, Globe, Landmark, TrendingDown, TrendingUp, Users} from 'lucide-react';
import {EChart, F, MONO, P, Panel, T, useFonts} from './Pro';
import {BLU, GLD, GRN, PUR, RED, colBars, gaugeOpt, hbar, ico, num} from './Enf4';
import {useTL} from './ui';
import {Stock} from './Stock';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
type Seg = {start: number; dur: number; sentences: {start: number; end: number}[]};
type D = {total: number; endCardStart: number; segments: Seg[]; captions: {start: number; end: number; text: string}[]};
const frames = (d: {total: number}) => Math.ceil(d.total * FPS);
const at = (d: D, s: number, j: number) => d.segments[s].start + d.segments[s].sentences[j].start;
const HOOK = 2.6;

const Title: React.FC<{lines: string; c?: string; y?: number}> = ({lines, c = GLD, y = 130}) => {
  const {p} = useTL();
  return (
    <>
      <T x={60} y={y + 40 * (1 - p(0, 0.5))} w={960} s={86} wt={900} ls={-3} lh={1.04} o={p(0, 0.4)}>{lines}</T>
      <div style={{position: 'absolute', left: 60, top: y + 86 * 1.04 * lines.split('\n').length + 16, width: 340 * p(0.15, 0.6), height: 8, borderRadius: 4, background: `linear-gradient(90deg, ${c}, ${c}66)`, boxShadow: `0 0 24px ${c}`}} />
    </>
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
// açılış: gerçek görüntü + büyük başlık
const Hook: React.FC<{src: string; lines: string; c: string}> = ({src, lines, c}) => (
  <AbsoluteFill>
    <Stock src={src} dur={HOOK + 0.4} dim={0.25} />
    <Title lines={lines} c={c} y={620} />
  </AbsoluteFill>
);

// 1) Nvidia
const NvA: React.FC = () => {
  const {p} = useTL(); const d = nvD as D; const j = (s: number, i: number) => at(d, s, i);
  return (
    <>
      <Title lines={'NVIDIA\nBEKLENTİYİ AŞTI'} c={GRN} />
      <Stat x={60} y={400} w={960} h={240} t0={j(0, 0) + 0.8} c={GRN} label="ÜÇÜNCÜ ÇEYREK GELİRİ" value={'$' + num(115.8 * p(j(0, 0) + 0.8, 1.2), 1) + ' milyar'} sub="geçen yılın iki katından fazla" vs={92} />
      <Stat x={60} y={670} w={960} h={200} t0={j(0, 1) + 1.5} c={GRN} label="HİSSE • KAPANIŞ SONRASI" value={'+%' + num(4.8 * p(j(0, 1) + 1.5, 1), 1)} vs={96} />
      <Panel x={60} y={900} w={960} h={230} t0={j(1, 0)} accent={GLD}>
        <T x={30} y={18} s={20} wt={700} c={P.muted} ls={2}>GELECEK ÇEYREK GELİRİ (MİLYAR $)</T>
        <div style={{position: 'absolute', left: 20, top: 46}}><EChart w={920} h={170} option={hbar([{n: 'Nvidia', v: 130, txt: '130 ±%3', c: GLD, q: p(j(1, 0) + 0.5, 0.9)}, {n: 'Beklenti', v: 125, txt: '≈125', c: '#6b8bb5', q: p(j(1, 1), 0.9)}], 0, 160, {left: 150, right: 160, bw: 46})} /></div>
      </Panel>
      <Src>Nvidia basın bülteni • 17 Kasım 2026</Src>
    </>
  );
};
// 2) Kospi
const KoA: React.FC = () => {
  const d = koD as D; const j = (i: number) => at(d, 0, i);
  return (
    <>
      <Title lines={'ASYA NVIDIA\'YA\nTEPKİ VERDİ'} c={GRN} />
      <Stat x={60} y={400} w={960} h={260} t0={0.4} c={GRN} label="KOSPI • GÜNEY KORE" value="5.067" sub="+%1,99 • yeniden 5.000 puanın üzerinde" vs={130} />
      <Panel x={60} y={690} w={960} h={170} t0={j(1)} accent={BLU}>
        <div style={{position: 'absolute', left: 24, top: 44, width: 84, height: 84, borderRadius: 22, background: `${BLU}26`, border: `1px solid ${BLU}88`, color: BLU, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ico(Cpu, 46)}</div>
        <T x={130} y={22} s={20} wt={700} c={P.muted} ls={2}>YÜKSELİŞİ TAŞIYAN</T>
        <T x={130} y={56} w={800} s={46} wt={800}>Samsung ve SK Hynix</T>
        <T x={130} y={112} w={800} s={24} wt={500} c={P.muted}>Nvidia'ya bellek çipi satıyorlar</T>
      </Panel>
      <Stat x={60} y={890} w={960} h={230} t0={j(2)} c={GRN} label="NIKKEI 225 • JAPONYA" value="59.024" sub="+%0,28 • gün içi kazancın bir kısmı silindi" vs={100} />
      <Src>CNBC, AP • 18 Kasım 2026</Src>
    </>
  );
};
// 3) Altın
const AlA: React.FC = () => {
  const {p} = useTL(); const d = alD as D; const j = (s: number, i: number) => at(d, s, i);
  return (
    <>
      <Title lines={'ALTINDA\nDÜŞÜŞ SÜRÜYOR'} c={RED} />
      <Stat x={60} y={400} w={960} h={240} t0={j(0, 1)} c={GLD} label="ONS ALTIN" value="≈3.820 $" sub="Eylül 2025'ten beri en düşük" vs={110} />
      <Stat x={60} y={670} w={470} h={220} t0={j(0, 2)} c={RED} label="BİR HAFTADA" value={'−%' + num(6 * p(j(0, 2), 1), 0) + '+'} vs={90} />
      <Panel x={550} y={670} w={470} h={220} t0={j(0, 3)} accent={BLU}>
        <T x={30} y={20} s={20} wt={700} c={P.muted} ls={2}>BASKI</T>
        <T x={30} y={60} w={420} s={36} wt={800}>Faiz artışı beklentisi</T>
        <T x={30} y={130} w={420} s={36} wt={800} c={GRN}>Güçlü dolar</T>
      </Panel>
      <Stat x={60} y={920} w={960} h={200} t0={j(1, 0)} c={GLD} label="GRAM ALTIN" value="≈6.140 ₺" sub="dört ayın en düşüğü" vs={90} />
      <Src>FXStreet, piyasa verileri • 18 Kasım 2026</Src>
    </>
  );
};
// 4) İşsizlik
const IsA: React.FC = () => {
  const {p} = useTL(); const d = isD as D; const j = (i: number) => at(d, 0, i);
  const q = p(0.6, 1.2);
  return (
    <>
      <Title lines={'İŞSİZLİK\nYÜKSELDİ'} c={RED} />
      <Panel x={60} y={400} w={960} h={330} t0={0.3} accent={RED}>
        <T x={30} y={20} s={20} wt={700} c={P.muted} ls={2}>İŞSİZLİK ORANI • 3. ÇEYREK 2026</T>
        <div style={{position: 'absolute', left: 210, top: 30}}><EChart w={540} h={280} option={gaugeOpt(8.1 * q, 15, RED, '%' + num(8.1 * q, 1), 80)} /></div>
        <T x={30} y={286} w={900} s={24} wt={600} c={P.muted}>bir önceki çeyreğe göre +0,1 puan</T>
      </Panel>
      <Stat x={60} y={750} w={470} h={180} t0={j(1)} c={RED} label="İŞSİZ" value="+46 bin" sub="toplam 2,87 milyon" vs={64} />
      <Stat x={550} y={750} w={470} h={180} t0={j(1) + 3.5} c={RED} label="ÇALIŞAN" value="−62 bin" sub="bir önceki çeyreğe göre" vs={64} />
      <Stat x={60} y={950} w={960} h={170} t0={j(2)} c={GLD} label="ATIL İŞGÜCÜ ORANI" value="%30,9 (+1 puan)" vs={64} />
    </>
  );
};

const make = (data: D, S: React.FC, hook: [string, string, string], next: string): React.FC => () => {
  useFonts();
  const total = frames(data);
  return (
    <>
      <ShortBg />
      <T x={540} y={60} w={1080} align="center" s={26} wt={600} c="#8fa3bc">Yatırım tavsiyesi değildir</T>
      <Sequence from={fr(HOOK)} durationInFrames={fr(data.endCardStart - HOOK)}><S /></Sequence>
      <Sequence from={0} durationInFrames={fr(HOOK + 0.4)}><Hook src={hook[0]} lines={hook[1]} c={hook[2]} /></Sequence>
      <Sequence from={fr(data.endCardStart)} durationInFrames={total - fr(data.endCardStart)}><End next={next} /></Sequence>
      <Captions caps={data.captions} />
    </>
  );
};
const End: React.FC<{next: string}> = ({next}) => {
  const {t, p} = useTL();
  const s = 1 + 0.05 * Math.sin(t * 5) * p(1.2, 0.4);
  return (
    <AbsoluteFill>
      <T x={60} y={330} w={960} s={112} wt={900} o={p(0.1, 0.5)} glow={GLD} ls={-3} lh={1.1}>{'TAM ÖZET\nKANALDA'}</T>
      <div style={{position: 'absolute', left: 60, top: 600, width: 400 * p(0.5, 0.6), height: 9, borderRadius: 5, background: `linear-gradient(90deg, #ffd36b, ${GLD})`, boxShadow: `0 0 26px ${GLD}`}} />
      <T x={60} y={640} w={960} s={44} wt={500} c="#8fa3bc" o={p(0.9, 0.5)}>{'Nvidia • Fed • Anthropic • Türkiye\nKapanış tablosu'}</T>
      <div style={{position: 'absolute', left: 540 - 300 * s, top: 800, width: 600 * s, height: 150 * s, borderRadius: 34, background: `linear-gradient(145deg, ${RED}, #c13a48)`, opacity: p(1.2, 0.4), boxShadow: `0 0 80px ${RED}99`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F, fontWeight: 900, fontSize: 78 * s, color: '#fff', letterSpacing: 2}}>ABONE OL</div>
      <T x={540} y={1010} w={960} align="center" s={38} wt={700} c="#ffe08a" o={p(1.8, 0.5)}>{next}</T>
    </AbsoluteFill>
  );
};
const NEXT = 'Yarın: Fed tutanakları ve Anthropic';
export const NNv = make(nvD as D, NvA, ['stock/borsa-4.mp4', 'NVIDIA\nSONUÇLARI', GRN], NEXT);
export const NKo = make(koD as D, KoA, ['stock/ulke-gkore-1.jpg', 'KOSPI\n5.000 ÜSTÜ', GRN], NEXT);
export const NAl = make(alD as D, AlA, ['stock/altin-1.mp4', 'ALTIN\nDİBE VURDU', RED], NEXT);
export const NIs = make(isD as D, IsA, ['stock/istanbul-2.mp4', 'TÜİK\nİŞSİZLİK', RED], NEXT);
export const N_FRAMES = {nv: frames(nvD), ko: frames(koD), al: frames(alD), is: frames(isD)};
