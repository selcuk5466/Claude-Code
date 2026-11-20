import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {fade} from '@remotion/transitions/fade';
import {wipe} from '@remotion/transitions/wipe';
import {
  ArrowRight, Banknote, Bell, Building2, CalendarDays, ChartColumn, Clock, Coins, Cpu, FileText, Fuel, Gavel, Globe, Handshake, Hospital, Landmark, Percent, Plane, Rocket, ShieldAlert, ShieldCheck, ShoppingCart, Truck, TrendingDown, TrendingUp, Users, Wallet, Wheat, Ban, Gift, Ship, PiggyBank,
} from 'lucide-react';
import D from './enf7_sentences.json';
import {Bg4, DateCtx, EChart, F, Hdr, MONO, P, Panel, Source, T, useFonts} from './Pro';
import {useTL} from './ui';
import {Big, BLU, colBars, donutOpt, gaugeOpt, GLD, GRN, hbar, ico, PUR, RED, Row, Stamp} from './Enf4';
import {BrandTicker, Bug, Bumper, BUMPER_DUR, EndCard, Grain, INTRO_DUR, IntroSting, LowerThird, PushIn} from './Brand';
import {Stock} from './Stock';
import {Kap, Kin, lineChart, n, Pump, SLV, useCnt} from './Enf6';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
export const ENF7_TOTAL = Math.ceil(D.total * FPS);
type Pa = {start: number; end: number; sentences: number[]};
const paras = D.paras as Pa[];
const A = (pi: number, si = 0) => paras[pi].sentences[Math.min(si, paras[pi].sentences.length - 1)];
const mk = (pi0: number) => (pi: number, si = 0) => A(pi, si) - paras[pi0].start;
const OFF = D.off, END = D.end;

// ---------------------------------------------------------------- S0 kanca
const S0: React.FC = () => {
  const T0 = mk(0); const {p} = useTL(); const c = useCnt();
  return (
    <AbsoluteFill>
      <Stock src="stock/altin-1.mp4" dur={paras[1].start - paras[0].start + 0.5} dim={0.45} from={6} />
      <Kin x={110} y={140} w={1400} s={116}>GRAM ALTIN BİR HAFTADA %8 ERİDİ</Kin>
      <Panel x={110} y={500} w={560} h={290} t0={2.0} accent={RED}>
        <T x={34} y={22} s={22} wt={700} c={P.muted} ls={2}>GRAM ALTIN</T>
        <T x={34} y={64} s={110} wt={800} mono c="#fff" glow={RED} ls={-5}>{c(2.2, 5777, 0, 6270, 2)}</T>
        <T x={36} y={210} s={26} wt={600} c={RED}>pazartesi 6.270 ₺</T>
      </Panel>
      <Panel x={690} y={500} w={540} h={290} t0={T0(0, 1)} accent={SLV}>
        <T x={34} y={22} s={22} wt={700} c={P.muted} ls={2}>GÜMÜŞ • HAFTALIK</T>
        <T x={34} y={64} s={110} wt={800} mono c={SLV} glow={SLV} ls={-5}>{'−%' + c(T0(0, 1) + 0.2, 14.7, 1)}</T>
      </Panel>
      <Panel x={1250} y={500} w={560} h={290} t0={T0(0, 2)} accent={GRN}>
        <T x={34} y={22} s={22} wt={700} c={P.muted} ls={2}>MEVDUAT • HAFTALIK</T>
        <T x={34} y={64} s={110} wt={800} mono c={GRN} glow={GRN} ls={-5}>{'+%' + c(T0(0, 2) + 0.2, 0.8, 1)}</T>
      </Panel>
      <div style={{position: 'absolute', left: 110, top: 840, opacity: p(T0(0, 3), 0.4), fontFamily: MONO, fontSize: 26, color: '#cfdbec'}}>Altın • Haftanın bilançosu • Dolar ve rezerv • Dünya • Borsa • KAP • Motorin</div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S1 ons neden düştü
const S1: React.FC = () => {
  const T0 = mk(1); const c = useCnt();
  return (
    <AbsoluteFill>
      <Hdr title="Altın Neden Bu Kadar Düştü?" sub="Ons altın • Fed beklentisi ve güçlü dolar" icon={ico(TrendingDown)} accent={GLD} />
      <Big x={110} y={200} w={900} h={300} label="ONS ALTIN • BUGÜN" value={c(T0(1, 0) + 0.3, 3551, 0, 3620, 1.5) + ' $'} sub="−%1,9 günlük" c={GLD} t0={T0(1, 0)} vs={140} icon={ico(Coins, 44)} />
      <Stamp x={1100} y={280} t0={T0(1, 1)} c={RED} s={60}>HAFTADA ≈ −%9</Stamp>
      <Row x={110} y={540} w={1700} t0={T0(1, 3)} icon={ico(Landmark, 34)} c={BLU} head="1 • FED" text="Aralıkta faiz artışı büyük ölçüde bekleniyor" ts={32} />
      <Row x={110} y={650} w={1700} t0={T0(1, 3) + 2.5} icon={ico(TrendingUp, 34)} c={GRN} head="2 • DOLAR" text="Dolar endeksi Nisan 2025'ten beri en yüksek seviyelerde" ts={32} />
      <Row x={110} y={760} w={1700} t0={T0(1, 4)} icon={ico(Percent, 34)} c={GLD} head="NEDEN ÖNEMLİ" text="Faiz yükselince getirisi olmayan altını tutmak pahalılaşıyor" ts={32} />
      <Row x={110} y={870} w={1700} t0={T0(1, 5)} icon={ico(Wallet, 34)} c={PUR} head="3 • KÂR SATIŞI" text="Yılın başındaki güçlü yükselişten sonra kâr realizasyonu" ts={32} h={84} />
      <Source>Reuters, CNN Türk, Bigpara • 20 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S2 kuyumcu + formül + gümüş
const S2: React.FC = () => {
  const T0 = mk(2); const {p} = useTL(); const c = useCnt();
  const fq = (i: number) => p(T0(2, 6) + i * 1.4, 0.5);
  return (
    <AbsoluteFill>
      <Hdr title="Kuyumcuda Bu Hafta" sub="Gram, çeyrek ve yarım altın • gümüş" icon={ico(Coins)} accent={GLD} />
      <Panel x={110} y={200} w={1080} h={400} t0={T0(2, 1)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>GRAM ALTIN (₺) • BU HAFTA</T>
        <div style={{position: 'absolute', left: 10, top: 40}}><EChart w={1060} h={350} option={lineChart(['Pzt', 'Sal', 'Çar', 'Per', 'Cum sabah'], [6270, 6269, 6099, 6006, 5777], p(T0(2, 2), 4.5), 5600, 6450, GLD, (v) => n(v))} /></div>
      </Panel>
      <Big x={1220} y={200} w={590} h={125} label="GRAM" value="5.777 ₺" c={GLD} t0={T0(2, 1)} vs={50} />
      <Big x={1220} y={337} w={590} h={125} label="ÇEYREK" value="9.709 ₺" c={GLD} t0={T0(2, 1) + 1.2} vs={50} />
      <Big x={1220} y={475} w={590} h={125} label="YARIM" value="19.383 ₺" c={GLD} t0={T0(2, 1) + 2.4} vs={50} />
      <Panel x={110} y={630} w={1080} h={300} t0={T0(2, 5)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>FORMÜL • ONS × DOLAR ÷ 31,1</T>
        <div style={{position: 'absolute', left: 34, top: 66, display: 'flex', gap: 18, fontFamily: MONO, fontWeight: 800, fontSize: 50, color: '#fff'}}>
          <span style={{opacity: fq(0), color: GLD}}>3.551 $</span><span style={{opacity: fq(1)}}>× </span><span style={{opacity: fq(1), color: GRN}}>50,58 ₺</span><span style={{opacity: fq(2)}}>÷ 31,1</span>
        </div>
        <div style={{position: 'absolute', left: 34, top: 140, fontFamily: MONO, fontWeight: 800, fontSize: 76, color: GLD, opacity: fq(3), textShadow: `0 0 30px ${GLD}77`}}>{'= ' + c(T0(2, 6) + 4.4, 5775, 0, 0, 1.2) + ' ₺'}</div>
        <div style={{position: 'absolute', left: 760, top: 140, width: 300, opacity: p(T0(2, 9), 0.4)}}>
          <T x={0} y={0} w={300} s={24} wt={700} c={P.muted}>BU HAFTA</T>
          <T x={0} y={34} w={300} s={34} wt={800} mono c={RED}>ons ≈ −%9</T>
          <T x={0} y={80} w={300} s={34} wt={800} mono c={GRN}>dolar +%0,4</T>
        </div>
      </Panel>
      <Panel x={1220} y={630} w={590} h={300} t0={T0(2, 11)} accent={SLV}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>GRAM GÜMÜŞ</T>
        <T x={34} y={60} s={88} wt={800} mono c={SLV} glow={SLV}>{c(T0(2, 12), 67.5, 2, 71.3, 1.2) + ' ₺'}</T>
        <T x={34} y={176} s={32} wt={800} mono c={RED}>bugün −%5,3</T>
        <T x={34} y={222} s={32} wt={800} mono c={RED} o={p(T0(2, 13), 0.3)}>hafta −%14,7</T>
      </Panel>
      <Source>Timeturk, Ekonomim, CNN Türk, Aposto • 20 Kasım sabah • yaklaşık</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S3 haftanın bilançosu
const S3: React.FC = () => {
  const T0 = mk(3); const {p} = useTL(); const c = useCnt();
  const items: [string, number, string, number, any][] = [
    ['Gram altın', 92137, GLD, T0(3, 2), Coins], ['Gümüş', 85260, SLV, T0(3, 3), Coins], ['Borsa İstanbul', 96276, BLU, T0(3, 4), ChartColumn], ['Dolar', 100377, GRN, T0(3, 5), Banknote], ['Mevduat (%42)', 100808, PUR, T0(3, 6), PiggyBank],
  ];
  return (
    <AbsoluteFill>
      <Hdr title="Haftanın Bilançosu" sub="Pazartesi 100.000 ₺ yatırsaydınız bugün ne olurdu?" icon={ico(Wallet)} accent={PUR} />
      <div style={{position: 'absolute', left: 110, top: 205, width: 1700, height: 2, background: P.line}} />
      {items.map(([name, v, col, t0, I], i) => {
        const q = p(t0, 1.2); const w = 1000 * ((80000 + (v - 80000) * q) - 80000) / 22000;
        return (
          <div key={name} style={{position: 'absolute', left: 110, top: 230 + i * 142, width: 1700, height: 120, opacity: p(t0 - 0.2, 0.3)}}>
            <div style={{position: 'absolute', left: 0, top: 22, width: 76, height: 76, borderRadius: 20, background: `${col}26`, border: `1px solid ${col}88`, color: col, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ico(I, 40)}</div>
            <T x={96} y={38} s={34} wt={800}>{name}</T>
            <div style={{position: 'absolute', left: 430, top: 30, width: Math.max(0, w), height: 60, borderRadius: 14, background: `linear-gradient(90deg, ${col}66, ${col})`, boxShadow: `0 0 24px ${col}55`}} />
            <T x={430 + Math.max(0, w) + 20} y={32} s={50} wt={800} mono c={v >= 100000 ? GRN : RED}>{c(t0, v, 0, 100000, 1.2) + ' ₺'}</T>
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 110 + 430 + 1000 * 20000 / 22000, top: 210, width: 3, height: 720, background: '#ffffff55', opacity: p(T0(3, 1), 0.4)}} />
      <T x={110 + 430 + 1000 * 20000 / 22000 - 80} y={935} s={22} wt={700} c={P.muted} o={p(T0(3, 1), 0.4)}>100.000 ₺</T>
      <Stamp x={1460} y={236} t0={T0(3, 7)} c={PUR} s={40}>MEVDUAT KAZANDIRDI</Stamp>
      <Source>Pazartesi–bugün fiyatlarıyla basit hesap • mevduat stopaj öncesi • yatırım tavsiyesi değildir</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S4 dolar + rezerv
const S4: React.FC = () => {
  const T0 = mk(4); const {p} = useTL(); const c = useCnt();
  return (
    <AbsoluteFill>
      <Hdr title="Dolar ve Merkez Bankası Rezervleri" sub="13 Kasım haftası • TCMB 19 Kasım'da açıkladı" icon={ico(Landmark)} accent={GRN} />
      <Big x={110} y={200} w={560} h={200} label="DOLAR / TL" value={c(T0(4, 0), 50.58, 2, 50, 1)} sub="haftalık +%0,4" c={GRN} t0={T0(4, 0)} vs={84} />
      <Big x={110} y={420} w={560} h={180} label="EURO / TL" value={c(T0(4, 0) + 1, 55.56, 2, 55, 1)} c={BLU} t0={T0(4, 0) + 1} vs={76} />
      <Panel x={700} y={200} w={1110} h={400} t0={T0(4, 3)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>REZERVLER (MİLYAR $)</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={1070} h={330} option={hbar([
          {n: 'Brüt rezerv', v: 158.95, txt: '158,95 (−2,11)', c: GLD, q: p(T0(4, 3), 0.9)},
          {n: 'Altın', v: 99.7, txt: '99,7 (−4,3)', c: RED, q: p(T0(4, 5), 0.9)},
          {n: 'Döviz', v: 59.25, txt: '59,25 ↑', c: GRN, q: p(T0(4, 5) + 1.5, 0.9)},
          {n: 'Net rezerv', v: 41.26, txt: '41,26 (+0,08)', c: BLU, q: p(T0(4, 8), 0.9)},
        ], 0, 200, {left: 200, right: 260, bw: 46})} /></div>
      </Panel>
      <Panel x={110} y={630} w={1060} h={300} t0={T0(4, 6)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>DÜŞÜŞÜN KAYNAĞI</T>
        <T x={34} y={64} s={44} wt={800} w={1000}>Satıştan değil, altın fiyatından</T>
        <T x={34} y={140} s={30} wt={600} c="#cfdbec" w={1000} o={p(T0(4, 7), 0.3)}>Gedik Yatırım: altın fiyatı brüt rezervi</T>
        <T x={34} y={186} s={64} wt={800} mono c={RED} o={p(T0(4, 7), 0.3)}>{'−' + c(T0(4, 7), 4.4, 1) + ' milyar $'}</T>
      </Panel>
      <Big x={1200} y={630} w={610} h={300} label="SWAP HARİÇ NET REZERV" value="≈28,5 mr $" sub="kura müdahale gücünün göstergesi" c={BLU} t0={T0(4, 9)} vs={72} icon={ico(ShieldCheck, 40)} />
      <Source>TCMB haftalık para ve banka istatistikleri • AA, Endeks24, Gedik Yatırım</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S5 Wall Street
const S5: React.FC = () => {
  const T0 = mk(5); const {p} = useTL();
  return (
    <AbsoluteFill>
      <Hdr title="Wall Street'te Sert Satış" sub="19 Kasım kapanışı • yapay zekâ hisseleri" icon={ico(TrendingDown)} accent={RED} />
      <Panel x={110} y={200} w={1100} h={430} t0={T0(5, 1)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>GÜNLÜK DEĞİŞİM</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={1060} h={350} option={hbar([{n: 'Nasdaq', v: -2.25, txt: '−%2,25', q: p(T0(5, 1) + 2, 0.9)}, {n: 'Dow Jones', v: -2.19, txt: '−%2,19', q: p(T0(5, 1) + 1, 0.9)}, {n: 'S&P 500', v: -2.02, txt: '−%2,02', q: p(T0(5, 1), 0.9)}], -2.8, 0.2, {left: 200, right: 160, bw: 60})} /></div>
      </Panel>
      <Big x={1240} y={200} w={570} h={430} label="DOW JONES" value="−1.100" sub="puan • 30 hisseden 1'i yükseldi" c={RED} t0={T0(5, 2)} vs={120} icon={ico(TrendingDown, 44)} />
      <Row x={110} y={660} w={1700} t0={T0(5, 3)} icon={ico(Cpu, 34)} c={PUR} head="NEDEN" text="Yapay zekâ hisselerinde yüksek değerleme ve faiz artışı endişesi" ts={32} />
      <Row x={110} y={770} w={1700} t0={T0(5, 4)} icon={ico(ArrowRight, 34)} c={GLD} head="BİZE ETKİSİ" text="Satış bu sabah Borsa İstanbul'a da yansıdı" ts={32} />
      <Source>CNBC, Yahoo Finance, StockTitan • 19 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S6 dünyadan
const S6: React.FC = () => {
  const T0 = mk(6); const {p, pop} = useTL(); const c = useCnt();
  const card = (x: number, t0: number, col: string, I: any, head: string, title: string, children: React.ReactNode) => (
    <div style={{position: 'absolute', left: x, top: 200, width: 830, height: 730, borderRadius: 30, background: 'linear-gradient(160deg, rgba(14,30,58,.96), rgba(8,18,36,.96))', border: `2px solid ${col}`, boxShadow: `0 0 60px ${col}33`, opacity: p(t0, 0.3), transform: `translateY(${(1 - pop(t0)) * 50}px)`}}>
      <div style={{position: 'absolute', left: 36, top: 34, width: 96, height: 96, borderRadius: 26, background: `${col}26`, border: `1px solid ${col}`, color: col, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ico(I, 54)}</div>
      <T x={156} y={40} s={22} wt={700} c={P.muted} ls={2}>{head}</T>
      <T x={156} y={74} w={640} s={46} wt={900}>{title}</T>
      {children}
    </div>
  );
  return (
    <AbsoluteFill>
      <Hdr title="Dünyadan İki Gelişme" sub="Türkiye'ye etkisiyle" icon={ico(Globe)} accent={BLU} />
      {card(110, T0(6, 1), PUR, Rocket, '1 • NASDAQ', 'Anthropic halka arzı', <>
        <T x={36} y={180} s={26} wt={700} c={P.muted}>Halka arz fiyatı</T>
        <T x={36} y={214} s={96} wt={800} mono c="#fff" glow={PUR}>83 $</T>
        <T x={36} y={340} s={26} wt={700} c={P.muted}>İlk gün</T>
        <T x={36} y={374} s={96} wt={800} mono c={GRN} glow={GRN}>{'+%' + c(T0(6, 2) + 1, 17, 0)}</T>
        <T x={36} y={500} w={760} s={32} wt={700} c={GLD} o={p(T0(6, 2) + 2, 0.3)}>Kayıtlardaki en büyük halka arz</T>
        <T x={36} y={570} w={760} s={28} wt={600} c="#cfdbec" o={p(T0(6, 3), 0.3)}>Ama borsalardaki genel düşüşü durdurmadı</T>
      </>)}
      {card(980, T0(6, 4), GLD, Wheat, '2 • UKRAYNA', 'Trump: Putin anlaşma istiyor', <>
        <T x={36} y={200} s={26} wt={700} c={P.muted} o={p(T0(6, 5), 0.3)}>Kalıcı bir anlaşma neyi etkiler?</T>
        {([[Ship, 'Karadeniz ticareti'], [Fuel, 'Enerji fiyatları'], [Wheat, 'Buğday ve tahıl fiyatları']] as [any, string][]).map(([I, t], i) => (
          <div key={t} style={{position: 'absolute', left: 36, top: 250 + i * 100, display: 'flex', alignItems: 'center', gap: 20, opacity: p(T0(6, 5) + 0.6 * i, 0.3)}}>
            <div style={{width: 70, height: 70, borderRadius: 18, background: `${GLD}26`, color: GLD, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ico(I, 38)}</div>
            <div style={{fontFamily: F, fontWeight: 800, fontSize: 38, color: '#fff'}}>{t}</div>
          </div>
        ))}
        <T x={36} y={590} w={760} s={28} wt={700} c={RED} o={p(T0(6, 7), 0.3)}>Şimdilik somut adım yok, sadece açıklama</T>
      </>)}
      <Source>CNBC, Yahoo Finance, Fox News • 19 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S7 Borsa İstanbul
const S7: React.FC = () => {
  const T0 = mk(7); const {p} = useTL(); const c = useCnt();
  return (
    <AbsoluteFill>
      <Hdr title="Borsa İstanbul" sub="19 Kasım kapanışı • 20 Kasım açılışı" icon={ico(ChartColumn)} accent={RED} />
      <Big x={110} y={200} w={560} h={240} label="BIST 100 • DÜN" value={c(T0(7, 0), 11400, 0, 11477, 1.2)} sub="−%0,67" c={RED} t0={T0(7, 0)} vs={100} />
      <Panel x={700} y={200} w={420} h={240} t0={T0(7, 1)} accent={BLU}>
        <T x={30} y={18} s={20} wt={700} c={P.muted} ls={2}>YÜKSELEN / DÜŞEN</T>
        <div style={{position: 'absolute', left: 10, top: 40}}><EChart w={200} h={190} option={donutOpt([{n: 'up', v: 38 * p(T0(7, 1), 0.8) + 0.01, c: GRN}, {n: 'down', v: 57 * p(T0(7, 1), 0.8) + 0.01, c: RED}], '')} /></div>
        <T x={220} y={80} s={40} wt={800} mono c={GRN}>38 ↑</T><T x={220} y={140} s={40} wt={800} mono c={RED}>57 ↓</T>
      </Panel>
      <Panel x={1150} y={200} w={660} h={240} t0={T0(7, 2)} accent={GLD}>
        <T x={30} y={18} s={20} wt={700} c={P.muted} ls={2}>SEKTÖRLER</T>
        <div style={{position: 'absolute', left: 10, top: 46}}><EChart w={640} h={180} option={hbar([{n: 'Banka', v: 0.39, txt: '+%0,39', q: p(T0(7, 2), 0.8)}, {n: 'Teknoloji', v: -1.83, txt: '−%1,83', q: p(T0(7, 2) + 1.2, 0.8)}], -2.4, 1, {left: 150, right: 120, bw: 44})} /></div>
      </Panel>
      <Panel x={110} y={470} w={1200} h={460} t0={T0(7, 4)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>BIST 100 • BU HAFTA</T>
        <div style={{position: 'absolute', left: 10, top: 40}}><EChart w={1180} h={410} option={lineChart(['Pzt', 'Sal', 'Çar', 'Per', 'Cum açılış'], [11841, 11661, 11477, 11400, 11261], p(T0(7, 4), 4), 10900, 12100, GLD, (v) => n(v))} /></div>
      </Panel>
      <Big x={1340} y={470} w={470} h={200} label="BU HAFTA" value="≈ −%4" c={RED} t0={T0(7, 5)} vs={72} />
      <Panel x={1340} y={700} w={470} h={230} t0={T0(7, 6)} accent={BLU}>
        <T x={30} y={18} s={20} wt={700} c={P.muted} ls={2}>İZLENEN SEVİYELER</T>
        <T x={30} y={60} s={30} wt={800} mono c={RED}>Direnç 11.500 • 11.600</T>
        <T x={30} y={110} s={30} wt={800} mono c={GRN}>Destek 11.300 • 11.200</T>
        <T x={30} y={170} s={22} wt={600} c={P.muted}>tavsiye değildir</T>
      </Panel>
      <Source>Borsa İstanbul, Bloomberg HT, Endeks24 • hacim ≈82 milyar ₺</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S8 KAP kartları
const KAPS: Kap[] = [
  {code: 'PKART', title: 'Plastikkart', type: 'BEDELSİZ • SPK ONAYI', icon: Gift, c: GRN, value: '%1.219 • 22,75 → 300 milyon ₺', mean: 'Ortaklara para ödemeden yeni hisse verilir; fiyat aynı oranda bölünür, şirketin değeri tek başına değişmez.', s: 1},
  {code: 'FLAP', title: 'Flap Kongre', type: 'BEDELSİZ HAK KULLANIMI', icon: Gift, c: GRN, value: '306,25 milyon ₺ artırım', mean: 'Bedelsiz paylar ortakların hesabına geçmeye başlıyor.', s: 6},
  {code: 'MIATK', title: 'MİA Teknoloji', type: 'SÖZLEŞME', icon: Cpu, c: BLU, value: '2,39 milyon $ ≈ 120 milyon ₺', mean: 'TSK Bulut Bilişim Veri Merkezi Projesi, ikinci aşama.', s: 7},
  {code: 'ONRYT', title: 'Onur Yüksek Teknoloji', type: 'SİPARİŞ', icon: Plane, c: BLU, value: '1,52 milyon $ • 2 sipariş', mean: 'Hava trafik kontrolünde kullanılan haberleşme ve kayıt sistemleri.', s: 8},
  {code: 'ONCSM', title: 'Oncosem', type: 'İHALE SONUCU', icon: Hospital, c: GRN, value: '21,2 milyon ₺ • 294 hastane', mean: 'DMO ihalesinde 2,17 milyon ürünün tamamı; %95 yerli, bir ayda teslim.', s: 9},
  {code: 'ARDYZ', title: 'ARD Grup', type: 'SÖZLEŞME', icon: ShieldCheck, c: PUR, value: '69,1 milyon ₺', mean: 'Bir kamu kurumuyla bireysel siber güvenlik hizmeti.', s: 11},
  {code: 'MEKAG', title: 'Meka Global', type: 'DİSTRİBÜTÖRLÜK', icon: Handshake, c: GLD, value: 'Libya', mean: 'İştirak, ürünlerin Libya\'da satışı için anlaşma yaptı.', s: 12},
  {code: 'KAYSE', title: 'Kayseri Şeker', type: 'SERMAYE ARTIRIMI', icon: Building2, c: GLD, value: 'iştirak 30 → 80 milyon ₺', mean: 'Lisanslı depoculuk şirketinin artırımına SPK onayı.', s: 13},
  {code: 'AVOD • CANTE', title: 'A.V.O.D. ve Çan2 Termik', type: 'KÂR PAYI YOK', icon: Ban, c: RED, value: 'temettü dağıtılmayacak', mean: 'Zarar ya da dağıtılabilir kâr olmaması nedeniyle.', s: 14},
  {code: 'VBTS', title: 'Borsa İstanbul tedbiri', type: 'AÇIĞA SATIŞ YASAĞI', icon: Gavel, c: RED, value: 'KLSYN • BIGEN • DSTKF', mean: '18 Aralık\'a kadar açığa satış ve kredili işlem yok; fiyatı çok hızlı oynayan hisselerde uygulanır.', s: 16},
];
const S8: React.FC = () => {
  const T0 = mk(8); const {p, pop, t} = useTL();
  let cur = 0; KAPS.forEach((k, i) => { if (t >= T0(8, k.s) - 0.2) cur = i; });
  const k = KAPS[cur]; const kt = T0(8, k.s) - 0.2;
  return (
    <AbsoluteFill>
      <Hdr title="Günün KAP Bildirimleri" sub="Kamuyu Aydınlatma Platformu • 19–20 Kasım" icon={ico(FileText)} accent={GLD} />
      {KAPS.map((kk, i) => {
        const on = i === cur, seen = t >= T0(8, kk.s) - 0.2;
        return (
          <div key={kk.code} style={{position: 'absolute', left: 110, top: 196 + i * 74, width: 560, height: 64, borderRadius: 16, background: on ? `${kk.c}30` : P.panel, border: `1px solid ${on ? kk.c : P.line}`, opacity: seen ? 1 : 0.35, display: 'flex', alignItems: 'center', gap: 14, paddingLeft: 16, transform: `translateX(${on ? 14 : 0}px)`}}>
            <div style={{width: 40, height: 40, borderRadius: 10, background: `${kk.c}26`, color: kk.c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ico(kk.icon, 24)}</div>
            <div style={{fontFamily: MONO, fontWeight: 800, fontSize: 22, color: on ? '#fff' : '#cfdbec', width: 190}}>{kk.code}</div>
            <div style={{fontFamily: F, fontWeight: 700, fontSize: 16, color: P.muted, letterSpacing: 1}}>{kk.type}</div>
          </div>
        );
      })}
      <div key={cur} style={{position: 'absolute', left: 720, top: 196, width: 1090, height: 650, borderRadius: 30, background: 'linear-gradient(160deg, rgba(14,30,58,.96), rgba(8,18,36,.96))', border: `2px solid ${k.c}`, boxShadow: `0 0 70px ${k.c}44`, opacity: p(kt, 0.25), transform: `scale(${0.94 + 0.06 * pop(kt)})`}}>
        <div style={{position: 'absolute', left: 40, top: 36, padding: '10px 24px', borderRadius: 14, background: k.c, color: '#06101e', fontFamily: MONO, fontWeight: 900, fontSize: 40}}>{k.code}</div>
        <T x={40} y={120} s={28} wt={700} c={P.muted} ls={2}>{k.type}</T>
        <T x={40} y={164} w={1010} s={60} wt={900}>{k.title}</T>
        <div style={{position: 'absolute', right: 40, top: 36, color: k.c, opacity: 0.9}}>{ico(k.icon, 90)}</div>
        {k.value && <T x={40} y={262} w={1010} s={50} wt={800} mono c={k.c} glow={k.c} o={p(kt + 0.4, 0.3)}>{k.value}</T>}
        <div style={{position: 'absolute', left: 40, top: 380, width: 1010, height: 2, background: P.line}} />
        <T x={40} y={404} s={24} wt={800} c={GLD} ls={2} o={p(kt + 1.0, 0.3)}>BU NE DEMEK?</T>
        <T x={40} y={446} w={1010} s={36} wt={600} c="#e6eef9" o={p(kt + 1.2, 0.3)}>{k.mean}</T>
      </div>
      <Row x={720} y={866} w={1090} t0={T0(8, 18)} icon={ico(ShieldAlert, 34)} c={GLD} head="NOT" text="Bilgi amaçlıdır, al ya da sat önerisi değildir" h={80} ts={28} />
      <Source>KAP (kap.org.tr) bildirimleri • 19–20 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S9 akaryakıt
const S9: React.FC = () => {
  const T0 = mk(9); const {p} = useTL(); const c = useCnt();
  return (
    <AbsoluteFill>
      <Hdr title="Motorine 6,5 Lira İndirim" sub="20 Kasım 00.00 itibarıyla • İstanbul Avrupa Yakası" icon={ico(Fuel)} accent={GRN} />
      <Pump x={110} label="MOTORİN" v={c(T0(9, 2), 88.8, 2, 95.3, 1.6)} c={GRN} t0={T0(9, 1)} />
      <Pump x={690} label="BENZİN" v="71,30" c={GLD} t0={T0(9, 4)} />
      <Pump x={1270} label="OTOGAZ" v="50,70" c={BLU} t0={T0(9, 4) + 1} />
      <Panel x={110} y={610} w={1100} h={320} t0={T0(9, 6)} accent={GRN}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>50 LİTRELİK DEPO</T>
        <T x={34} y={70} s={44} wt={800} mono c="#cfdbec">50 L × 6,5 ₺</T>
        <div style={{position: 'absolute', left: 400, top: 74, color: GRN}}>{ico(ArrowRight, 40)}</div>
        <T x={470} y={56} s={90} wt={800} mono c={GRN} glow={GRN}>{c(T0(9, 6) + 0.6, 325, 0, 0, 1.4) + ' ₺'}</T>
        <T x={34} y={200} s={30} wt={700} c="#cfdbec" w={1000} o={p(T0(9, 7), 0.3)}>Kamyon, otobüs ve servis maliyetleri de hafifleyebilir</T>
      </Panel>
      <Row x={1240} y={610} w={570} t0={T0(9, 8)} icon={ico(Globe, 34)} c={GLD} head="ŞİNCEN ZİRVESİ" text="Yakıt arzını artırma sözü, ama rakam yok" h={150} ts={30} />
      <Big x={1240} y={780} w={570} h={150} label="BRENT" value="≈91 $" c={BLU} t0={T0(9, 10)} vs={60} />
      <Source>Dağıtım şirketi fiyatları, Habertürk, Son Mühür • Bloomberg • 20 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S10 tüketici güveni
const S10: React.FC = () => {
  const T0 = mk(10); const {p} = useTL();
  const q = p(T0(10, 1), 1.4);
  return (
    <AbsoluteFill>
      <Hdr title="Tüketici Güveni Toparlandı" sub="TÜİK • Kasım 2026 • 100'ün altı kötümser" icon={ico(ShoppingCart)} accent={BLU} />
      <Panel x={110} y={200} w={700} h={460} t0={T0(10, 1)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>TÜKETİCİ GÜVEN ENDEKSİ</T>
        <div style={{position: 'absolute', left: 50, top: 50}}><EChart w={600} h={380} option={gaugeOpt(86.8 * q, 120, BLU, n(86.8 * q, 1), 80)} /></div>
        <T x={34} y={404} w={640} s={26} wt={700} c={GRN}>ekim 84,8 → kasım 86,8 (+%2,4)</T>
      </Panel>
      <Panel x={840} y={200} w={970} h={460} t0={T0(10, 4)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>SON DÖNEM</T>
        <div style={{position: 'absolute', left: 10, top: 40}}><EChart w={950} h={410} option={lineChart(['Kas 2025', 'Eyl 2026', 'Eki 2026', 'Kas 2026'], [85.0, 91.9, 84.8, 86.8], p(T0(10, 4), 3), 78, 96, GLD, (v) => n(v, 1))} /></div>
      </Panel>
      <Panel x={110} y={690} w={1700} h={240} t0={T0(10, 6)} accent={PUR}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>ALT ENDEKSLER</T>
        <div style={{position: 'absolute', left: 20, top: 50}}><EChart w={1660} h={180} option={hbar([{n: 'Mevcut maddi durum', v: 68.4, txt: '68,3 → 68,4', c: SLV, q: p(T0(10, 6), 0.9)}, {n: 'Dayanıklı mal harcama düşüncesi', v: 105.3, txt: '102,7 → 105,3', c: GRN, q: p(T0(10, 7), 0.9)}], 0, 130, {left: 420, right: 230, bw: 44})} /></div>
      </Panel>
      <Source>TÜİK–TCMB Tüketici Eğilim Anketi • 20 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S11 takvim
const S11: React.FC = () => {
  const T0 = mk(11); const {p} = useTL();
  const items: [string, any, string, string, number][] = [['Bugün', Users, 'ABD Michigan tüketici güveni', BLU, T0(11, 1)], ['27 Kasım', ChartColumn, 'Ekonomik güven endeksi', GLD, T0(11, 2)], ['1 Aralık', TrendingUp, '3. çeyrek büyüme', GRN, T0(11, 2) + 1.5], ['3 Aralık', Percent, 'Kasım enflasyonu', RED, T0(11, 2) + 3], ['10 Aralık', Landmark, 'TCMB faiz kararı • asgari ücret süreci', PUR, T0(11, 3)]];
  return (
    <AbsoluteFill>
      <Hdr title="Önümüzdeki Günler" sub="Cebimizi etkileyebilecek takvim" icon={ico(CalendarDays)} accent={BLU} />
      <div style={{position: 'absolute', left: 300, top: 220, width: 6, height: 700 * p(T0(11, 0), 3), background: `linear-gradient(180deg, ${BLU}, ${PUR})`, borderRadius: 3}} />
      {items.map(([h, I, tx, col, t0], i) => (
        <div key={tx} style={{position: 'absolute', left: 110, top: 220 + i * 140, width: 1700, height: 120, opacity: p(t0, 0.3), transform: `translateX(${(1 - p(t0, 0.5)) * 60}px)`}}>
          <T x={0} y={36} w={160} align="right" s={30} wt={800} mono c={col}>{h}</T>
          <div style={{position: 'absolute', left: 172, top: 30, width: 54, height: 54, borderRadius: '50%', background: col, boxShadow: `0 0 24px ${col}`, color: '#06101e', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ico(I, 30)}</div>
          <div style={{position: 'absolute', left: 260, top: 8, width: 1300, height: 104, borderRadius: 22, background: P.panel, border: `1px solid ${col}55`, display: 'flex', alignItems: 'center', paddingLeft: 30, fontFamily: F, fontWeight: 800, fontSize: 40, color: '#fff'}}>{tx}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S12 kapanış tablosu
type Tile = {n: string; v: string; sub: string; c: string; t: number};
const S12: React.FC = () => {
  const T0 = mk(12); const {p, pop} = useTL();
  const tiles: Tile[] = [
    {n: 'BIST 100', v: '11.400', sub: 'dün • açılış 11.261', c: RED, t: T0(12, 1)}, {n: 'Dolar / TL', v: '50,58', sub: 'haftalık +%0,4', c: GRN, t: T0(12, 2)},
    {n: 'Euro / TL', v: '55,56', sub: 'sabah', c: BLU, t: T0(12, 3)}, {n: 'Gram altın', v: '5.777 ₺', sub: 'haftalık ≈ −%8', c: GLD, t: T0(12, 4)},
    {n: 'Çeyrek altın', v: '9.709 ₺', sub: 'sabah', c: GLD, t: T0(12, 5)}, {n: 'Ons altın', v: '3.551 $', sub: 'haftalık ≈ −%9', c: GLD, t: T0(12, 6)},
    {n: 'Gram gümüş', v: '67,50 ₺', sub: 'haftalık −%14,7', c: SLV, t: T0(12, 7)}, {n: 'Brent', v: '≈91 $', sub: 'zirveye tepki sınırlı', c: BLU, t: T0(12, 8)},
    {n: 'Benzin', v: '71,30 ₺', sub: 'sabit', c: GLD, t: T0(12, 9)}, {n: 'Motorin', v: '88,80 ₺', sub: '−6,5 ₺ indirim', c: GRN, t: T0(12, 9) + 1},
  ];
  const W = 412, H = 210, G = 18;
  return (
    <AbsoluteFill>
      <Hdr title="Günün ve Haftanın Kapanış Tablosu" sub="BIST dün kapanış • kurlar ve altın 20 Kasım sabah" icon={ico(ChartColumn)} accent={GLD} />
      {tiles.map((tl, i) => {
        const x = 110 + (i % 4) * (W + G), y = 200 + Math.floor(i / 4) * (H + G);
        const sp = pop(tl.t), a = Math.min(1, Math.max(0, p(tl.t, 0.3)));
        return (
          <div key={tl.n} style={{position: 'absolute', left: i >= 8 ? x + (W + G) : x, top: y, width: W, height: H, borderRadius: 24, background: `linear-gradient(155deg, ${tl.c}38, rgba(9,22,42,.94))`, border: `1px solid ${tl.c}77`, opacity: a, transform: `scale(${0.9 + 0.1 * sp})`, boxShadow: `0 0 34px ${tl.c}30`}}>
            <T x={26} y={20} s={26} wt={700} c="#cfdbec" w={370}>{tl.n}</T>
            <T x={26} y={66} s={60} wt={800} mono c="#fff" w={380} ls={-1}>{tl.v}</T>
            <T x={26} y={150} s={24} wt={700} c={tl.c} w={370}>{tl.sub}</T>
          </div>
        );
      })}
      <Source>Borsa İstanbul, Kapalıçarşı/banka fiyatları, dağıtım şirketleri • rakamlar yaklaşıktır • yatırım tavsiyesi değildir</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S13 final
const S13: React.FC = () => {
  const T0 = mk(13); const {p} = useTL();
  return (
    <AbsoluteFill>
      <Hdr title="Yarın: Altının Bu Yılki Yolculuğu" sub="Hafta sonu videosu • altın biriktirenler için ne anlama geliyor?" icon={ico(Bell)} accent={RED} />
      <Row x={110} y={260} w={1700} t0={T0(13, 0)} icon={ico(Coins, 38)} c={GLD} head="KISACA" text="Fed beklentisi altını ve gümüşü düşürdü, motorinde indirim pompaya yansıdı" h={110} ts={32} />
      <Row x={110} y={400} w={1700} t0={T0(13, 1)} icon={ico(ShieldAlert, 38)} c={GLD} head="BİLGİLENDİRME" text="Anlattıklarım bilgilendirme amaçlıdır, yatırım tavsiyesi değildir" h={110} ts={34} />
      <Panel x={110} y={540} w={1700} h={170} t0={T0(13, 2)} accent={RED}>
        <T x={40} y={22} s={22} wt={700} c={P.muted} ls={2}>YARINKİ VİDEO</T>
        <T x={40} y={64} s={52} wt={800} w={1620} glow={RED}>Altının bu yılki yolculuğu ve biriktirenler</T>
      </Panel>
      <div style={{position: 'absolute', left: 560, top: 760, width: 800, height: 120, borderRadius: 60, background: `linear-gradient(135deg, ${RED}, #b8323d)`, boxShadow: `0 0 60px ${RED}88`, opacity: p(T0(13, 3), 0.4), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, fontFamily: F, fontWeight: 900, fontSize: 50, color: '#fff', letterSpacing: 3}}>{ico(Bell, 48)}KANALA ABONE OL</div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- gerçek görüntüler
type BR = [number, number, string, string | undefined, string | undefined, 'in' | 'out' | 'left' | 'right', number?];
const BROLL: BR[] = [
  [A(1, 2) - 0.1, A(1, 3) + 2.5, 'stock/foto-fed-6534073.jpg', 'Fed', 'Aralıkta faiz artışı bekleniyor', 'in'],
  [A(2, 0) - 0.2, A(2, 1) - 0.1, 'stock/foto-kapalicarsi-5096971.jpg', 'Kuyumcu fiyatları', 'Gram altın 5.777 ₺', 'out'],
  [A(2, 11) - 0.1, A(2, 12) - 0.1, 'stock/madeni-1.mp4', 'Gümüş', 'Haftada −%14,7', 'right'],
  [A(3, 0) - 0.2, A(3, 1) + 1.0, 'stock/para-tl.mp4', 'Haftanın bilançosu', '100.000 ₺ ne oldu?', 'in'],
  [A(4, 2) - 0.1, A(4, 3) - 0.1, 'stock/para-dolar.mp4', 'Merkez Bankası rezervleri', '13 Kasım haftası', 'in'],
  [A(5, 0) - 0.2, A(5, 1) - 0.1, 'stock/ulke-abd-1.mp4', 'Wall Street', 'Sert satış', 'in'],
  [A(6, 1) - 0.1, A(6, 2) - 0.1, 'stock/sunucu-1.mp4', 'Anthropic', 'Yapay zekâ şirketi Nasdaq\'ta', 'in'],
  [A(6, 5) - 0.1, A(6, 6) - 0.1, 'stock/bugday-1.mp4', 'Ukrayna ve tahıl', 'Karadeniz ticareti, enerji, buğday', 'in'],
  [A(7, 0) - 0.2, A(7, 1) - 0.1, 'stock/istanbul-1.mp4', 'Borsa İstanbul', 'Dün −%0,67', 'out'],
  [A(8, 7) - 0.1, A(8, 7) + 2.6, 'stock/sunucu-1.mp4', 'MİA Teknoloji', 'TSK Bulut Bilişim Veri Merkezi', 'right', 8],
  [A(8, 8) - 0.1, A(8, 8) + 2.6, 'stock/foto-hava-14999417.jpg', 'Onur Yüksek Teknoloji', 'Hava trafik kontrolü', 'in'],
  [A(8, 9) - 0.1, A(8, 9) + 2.8, 'stock/foto-hastane-9574413.jpg', 'Oncosem', '294 hastane', 'left'],
  [A(8, 11) - 0.1, A(8, 11) + 2.6, 'stock/siber-1.mp4', 'ARD Grup', 'Siber güvenlik', 'in'],
  [A(9, 0) - 0.2, A(9, 1) + 1.5, 'stock/foto-akaryakit-12377482.jpg', 'Motorine indirim', '−6,5 ₺', 'right'],
  [A(9, 7) - 0.1, A(9, 8) - 0.1, 'stock/otoyol-1.mp4', 'Taşıma maliyetleri', 'Kamyon, otobüs, servis', 'in'],
  [A(10, 0) - 0.2, A(10, 1) - 0.1, 'stock/avm-2.mp4', 'Tüketici güveni', 'Kasımda 86,8', 'in'],
];
const LT: [number, string][] = [
  [OFF + 0.6, 'Piyasa özeti • 20 Kasım 2026'],
  [A(1, 4) + 0.3, 'Altın • Fed ve dolar etkisi'],
  [A(3, 2) + 0.3, 'Haftanın bilançosu • 100.000 ₺'],
  [A(4, 4) + 0.3, 'TCMB rezervleri • 13 Kasım haftası'],
  [A(7, 2) + 0.3, 'Borsa İstanbul • 19 Kasım kapanışı'],
  [A(9, 2) + 0.3, 'Akaryakıt • motorin indirimi'],
];
const TICK = ['GRAM ALTIN 5.777 ₺', 'ÇEYREK 9.709 ₺', 'ONS 3.551 $', 'GÜMÜŞ 67,50 ₺', 'USD/TL 50,58', 'EUR/TL 55,56', 'BIST 100 11.400 (−%0,67)', 'MOTORİN 88,80 ₺ (−6,5)', 'BENZİN 71,30 ₺', 'TÜKETİCİ GÜVENİ 86,8', 'YATIRIM TAVSİYESİ DEĞİLDİR'];

const SCENES: React.FC[] = [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13];
const TT = 14;
const transitions: any[] = [fade(), slide({direction: 'from-right'}), wipe({direction: 'from-left'}), slide({direction: 'from-bottom'}), fade(), slide({direction: 'from-right'}), wipe({direction: 'from-bottom'}), fade(), slide({direction: 'from-left'})];
export const EnfVideo7: React.FC = () => {
  useFonts();
  const total = ENF7_TOTAL;
  return (
    <DateCtx.Provider value="20 KASIM 2026">
      <AbsoluteFill style={{background: '#06101f'}}>
        <Sequence from={fr(OFF)} durationInFrames={fr(END - OFF)}><Bg4 total={total} /></Sequence>
        <Sequence from={fr(OFF)} durationInFrames={fr(END - OFF)}>
          <TransitionSeries>
            {SCENES.flatMap((Sc, i) => {
              const a = fr(paras[i].start - OFF);
              const b = i + 1 < SCENES.length ? fr(paras[i + 1].start - OFF) : fr(END - OFF);
              const last = i === SCENES.length - 1;
              const out = [<TransitionSeries.Sequence key={'s' + i} durationInFrames={Math.max(TT + 1, b - a + (last ? 0 : TT))}><PushIn dur={(b - a) / FPS} k={0.018}><Sc /></PushIn></TransitionSeries.Sequence>];
              if (!last) out.push(<TransitionSeries.Transition key={'t' + i} presentation={transitions[i % transitions.length]} timing={springTiming({config: {damping: 200}, durationInFrames: TT})} />);
              return out;
            })}
          </TransitionSeries>
        </Sequence>
        {BROLL.map(([a, b, src, title, sub, pan, from], i) => (
          <Sequence key={'b' + i} from={fr(a)} durationInFrames={fr(b - a)}><Stock src={src} dur={b - a} title={title} sub={sub} pan={pan} from={from ?? 0} /></Sequence>
        ))}
        <Sequence from={fr(OFF)} durationInFrames={fr(END - OFF)}><Bug /></Sequence>
        {LT.map(([t0, topic], i) => <Sequence key={'l' + i} from={fr(t0)} durationInFrames={fr(5.2)}><LowerThird topic={topic} t0={0} /></Sequence>)}
        <Sequence from={fr(OFF)} durationInFrames={fr(END - OFF)}><BrandTicker items={TICK} total={total} /></Sequence>
        <Sequence from={fr(D.bumpers[0])} durationInFrames={fr(BUMPER_DUR)}><Bumper label="DÜNYA" sub="WALL STREET • ANTHROPIC • UKRAYNA" c="#3b82f6" /></Sequence>
        <Sequence from={fr(D.bumpers[1])} durationInFrames={fr(BUMPER_DUR)}><Bumper label="BORSA İSTANBUL" sub="BIST 100 • KAP BİLDİRİMLERİ" c="#e8485a" /></Sequence>
        <Sequence from={fr(D.bumpers[2])} durationInFrames={fr(BUMPER_DUR)}><Bumper label="CEBİMİZ" sub="AKARYAKIT • TÜKETİCİ GÜVENİ" /></Sequence>
        <Sequence from={0} durationInFrames={fr(INTRO_DUR)}><IntroSting /></Sequence>
        <Sequence from={fr(END)} durationInFrames={total - fr(END)}><EndCard next="Altının bu yılki yolculuğu" /></Sequence>
        <Grain o={0.05} />
      </AbsoluteFill>
    </DateCtx.Provider>
  );
};
