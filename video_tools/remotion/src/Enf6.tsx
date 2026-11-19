import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {AnimatedText} from 'remotion-bits';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {fade} from '@remotion/transitions/fade';
import {wipe} from '@remotion/transitions/wipe';
import {
  ArrowDown, ArrowRight, Banknote, Bell, Building2, CalendarDays, ChartColumn, Clock, Coins, Fuel, Gavel, Globe, Home, Key, Landmark, Percent, Receipt, RefreshCw, ShieldAlert, Train, TrendingDown, TrendingUp, Users, Wallet, Zap, Handshake, FileText,
} from 'lucide-react';
import D from './enf6_sentences.json';
import {Bg4, DateCtx, EChart, F, Hdr, MONO, P, Panel, Source, T, useFonts} from './Pro';
import {useTL} from './ui';
import {Big, BLU, colBars, donutOpt, gaugeOpt, GLD, GRN, hbar, ico, PUR, RED, Row, Stamp} from './Enf4';
import {BrandTicker, Bug, Bumper, BUMPER_DUR, EndCard, Grain, INTRO_DUR, IntroSting, LowerThird, PushIn} from './Brand';
import {Stock} from './Stock';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
export const ENF6_TOTAL = Math.ceil(D.total * FPS);
type Pa = {start: number; end: number; sentences: number[]};
const paras = D.paras as Pa[];
const A = (pi: number, si = 0) => paras[pi].sentences[Math.min(si, paras[pi].sentences.length - 1)];
const mk = (pi0: number) => (pi: number, si = 0) => A(pi, si) - paras[pi0].start;
const OFF = D.off, END = D.end;
const SLV = '#c9d3e0';
const n = (v: number, d = 0) => v.toLocaleString('tr-TR', {minimumFractionDigits: d, maximumFractionDigits: d});

// sayan rakam
const useCnt = () => {
  const {p} = useTL();
  return (t0: number, v1: number, d = 0, v0 = 0, dur = 1.2) => n(v0 + (v1 - v0) * p(t0, dur), d);
};
// çizilen çizgi grafik
const lineChart = (cats: string[], vals: number[], q: number, min: number, max: number, color: string, fmt: (v: number) => string) => {
  const k = q * (vals.length - 1);
  const shown = vals.map((v, i) => (i <= Math.floor(k) ? v : i === Math.floor(k) + 1 ? vals[i - 1] + (v - vals[i - 1]) * (k - Math.floor(k)) : null));
  return {
    grid: {left: 70, right: 90, top: 70, bottom: 60},
    xAxis: {type: 'category', data: cats, boundaryGap: false, axisLine: {lineStyle: {color: '#3a5072'}}, axisTick: {show: false}, axisLabel: {color: '#9fb2cb', fontSize: 22, fontWeight: 600, fontFamily: F}},
    yAxis: {type: 'value', min, max, show: false},
    series: [{type: 'line', data: shown, smooth: 0.2, connectNulls: false, symbol: 'circle', symbolSize: 18, lineStyle: {width: 7, color, shadowBlur: 22, shadowColor: color}, itemStyle: {color, borderColor: '#fff', borderWidth: 3},
      areaStyle: {color: {type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{offset: 0, color: color + '55'}, {offset: 1, color: color + '00'}]}},
      label: {show: true, position: 'top', formatter: (pp: any) => (pp.dataIndex <= Math.floor(k) ? fmt(vals[pp.dataIndex]) : ''), color: '#fff', fontSize: 28, fontWeight: 800, fontFamily: MONO, distance: 14}}],
  };
};
// kinetik büyük başlık
const Kin: React.FC<{x: number; y: number; w: number; s: number; children: string; delay?: number; c?: string}> = ({x, y, w, s, children, delay = 2, c = '#fff'}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, fontFamily: F, fontWeight: 900, fontSize: s, lineHeight: 1.02, color: c, letterSpacing: -3}}>
    <AnimatedText transition={{split: 'word', splitStagger: 3, y: [40, 0], opacity: [0, 1], blur: [14, 0], duration: 22, delay}}>{children}</AnimatedText>
  </div>
);

// ---------------------------------------------------------------- S0 kanca: tek iddia, sonra rakamlar
const S0: React.FC = () => {
  const T0 = mk(0); const {p} = useTL(); const c = useCnt();
  return (
    <AbsoluteFill>
      <Stock src="stock/altin-1.mp4" dur={paras[1].start - paras[0].start + 0.5} dim={0.45} />
      <Kin x={110} y={150} w={1300} s={118}>GRAM ALTIN 6.000 LİRANIN ALTINDA</Kin>
      <Panel x={110} y={500} w={800} h={300} t0={2.2} accent={RED}>
        <T x={36} y={24} s={22} wt={700} c={P.muted} ls={2}>GRAM ALTIN • SABAH EN DÜŞÜK</T>
        <div style={{position: 'absolute', right: 30, top: 22, color: RED}}>{ico(TrendingDown, 44)}</div>
        <T x={36} y={70} s={140} wt={800} mono c="#fff" glow={RED} ls={-6}>{c(2.4, 5990, 0, 6269, 1.8)}</T>
        <T x={40} y={236} s={28} wt={600} c={RED}>iki gün önce 6.269 ₺ • dört ayın dibi</T>
      </Panel>
      <Panel x={940} y={500} w={870} h={300} t0={T0(0, 1)} accent={SLV}>
        <T x={36} y={24} s={22} wt={700} c={P.muted} ls={2}>GÜMÜŞ • BİR HAFTADA</T>
        <T x={36} y={70} s={140} wt={800} mono c={SLV} glow={SLV} ls={-6}>{'−%' + c(T0(0, 1) + 0.2, 11, 0)}</T>
        <T x={40} y={236} s={28} wt={600} c={P.muted}>gram gümüş 73,77 ₺</T>
      </Panel>
      <Row x={110} y={840} w={1700} t0={T0(0, 2)} icon={ico(Landmark, 34)} c={BLU} head="SEBEP" text="Dün akşam Amerika'dan geldi: Fed tutanakları" ts={32} />
      <div style={{position: 'absolute', left: 110, top: 960, opacity: p(T0(0, 3), 0.4), fontFamily: MONO, fontSize: 24, color: '#cfdbec'}}>Altın • Dolar • Borsa İstanbul • KAP • Konut • Kapanış tablosu</div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S1 Fed tutanakları
const S1: React.FC = () => {
  const T0 = mk(1); const {p} = useTL(); const c = useCnt();
  const q = p(T0(1, 5), 1.2);
  return (
    <AbsoluteFill>
      <Hdr title="Fed Tutanakları: Faiz Artışı Masada" sub="Ekim toplantısı • 18 Kasım akşamı açıklandı" icon={ico(Landmark)} accent={BLU} />
      <Row x={110} y={200} w={1000} t0={T0(1, 1)} icon={ico(ShieldAlert, 34)} c={GLD} head="TUTANAKLAR" text="Ekimdeki sabit karar gevşeme sayılmamalı" />
      <Row x={110} y={310} w={1000} t0={T0(1, 3)} icon={ico(TrendingUp, 34)} c={RED} head="BAZI YÖNETİCİLER" text="Enflasyon yüksek gelirse çeyrek puandan büyük artış" />
      <Row x={110} y={420} w={1000} t0={T0(1, 4)} icon={ico(Users, 34)} c={RED} head="CHRISTOPHER WALLER" text="Aralıkta yarım puanlık artış masada" />
      <Panel x={1140} y={200} w={670} h={460} t0={T0(1, 5)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>ARALIK İHTİMALLERİ</T>
        <div style={{position: 'absolute', left: 20, top: 50}}><EChart w={380} h={380} option={donutOpt([{n: '25', v: 90 * q + 0.01, c: GLD}, {n: '50', v: 10 * q + 0.01, c: RED}], '%' + Math.round(90 * q))} /></div>
        <div style={{position: 'absolute', left: 420, top: 150, width: 16, height: 16, borderRadius: 4, background: GLD}} /><T x={446} y={140} s={26} wt={700}>+0,25 puan</T>
        <div style={{position: 'absolute', left: 420, top: 210, width: 16, height: 16, borderRadius: 4, background: RED}} /><T x={446} y={200} s={26} wt={700} c={RED}>+0,50 puan</T>
        <T x={446} y={236} s={24} wt={600} c={P.muted} mono>{'%' + Math.round(10 * q)}</T>
      </Panel>
      <Big x={110} y={540} w={1000} h={250} label="DOLAR ENDEKSİ" value={'≈' + c(T0(1, 6), 104, 0, 100, 1)} sub="Nisan 2025'ten beri en yüksek" c={GRN} t0={T0(1, 6)} vs={110} icon={ico(TrendingUp, 44)} />
      <Big x={1140} y={690} w={670} h={100} label="KAYNAK" value="CME FedWatch" c={BLU} t0={T0(1, 5) + 1} vs={34} />
      <Source>Fed ekim tutanakları, CME FedWatch • 18–19 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S2 neden altın düşüyor
const S2: React.FC = () => {
  const T0 = mk(2); const {p, pop} = useTL(); const c = useCnt();
  const steps: [any, string, string, string, number][] = [[Percent, 'Faiz yükseliyor', 'Fed aralıkta artış sinyali', RED, T0(2, 1)], [Banknote, 'Mevduat kazandırıyor', 'ABD mevduatı ve tahvili cazip', GRN, T0(2, 1) + 1.5], [Coins, 'Altın faiz getirmiyor', 'yatırımcı altından çıkıyor', GLD, T0(2, 2)]];
  return (
    <AbsoluteFill>
      <Hdr title="Bunun Cebimizle İlgisi Ne?" sub="Faiz, dolar ve altın arasındaki bağ" icon={ico(Wallet)} accent={GLD} />
      {steps.map(([I, h, s, col, t0], i) => (
        <React.Fragment key={h}>
          <div style={{position: 'absolute', left: 110 + i * 590, top: 220, width: 520, height: 280, borderRadius: 28, background: P.panel, border: `1px solid ${col}55`, opacity: p(t0, 0.3), transform: `translateY(${(1 - pop(t0)) * 40}px)`, boxShadow: `0 0 40px ${col}22`}}>
            <div style={{position: 'absolute', left: 190, top: 30, width: 140, height: 140, borderRadius: 36, background: `${col}26`, border: `1px solid ${col}88`, color: col, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ico(I, 76)}</div>
            <T x={260} y={186} w={480} align="center" s={34} wt={800}>{h}</T>
            <T x={260} y={232} w={480} align="center" s={24} wt={500} c={P.muted}>{s}</T>
          </div>
          {i < 2 && <div style={{position: 'absolute', left: 640 + i * 590, top: 330, color: GLD, opacity: p(t0 + 0.6, 0.3)}}>{ico(ArrowRight, 60)}</div>}
        </React.Fragment>
      ))}
      <Big x={110} y={540} w={1050} h={300} label="ONS ALTIN • SABAH" value={'≈' + c(T0(2, 4), 3740, 0, 3870, 1.6) + ' $'} sub="3.800 doların altında • Eylül 2025'ten beri en düşük" c={GLD} t0={T0(2, 4)} vs={130} icon={ico(TrendingDown, 44)} />
      <Stamp x={1250} y={640} t0={T0(2, 5)} c={RED} s={48}>14 AYIN DİBİ</Stamp>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S3 kuyumcu fiyatları + formül
const S3: React.FC = () => {
  const T0 = mk(3); const {p} = useTL(); const c = useCnt();
  const fq = (i: number) => p(T0(3, 10) + i * 1.6, 0.5);
  return (
    <AbsoluteFill>
      <Hdr title="Kuyumcu Fiyatları" sub="Ons düşüşü doğrudan gram altına yansıdı" icon={ico(Coins)} accent={GLD} />
      <Panel x={110} y={200} w={1000} h={400} t0={T0(3, 1)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>GRAM ALTIN (₺)</T>
        <div style={{position: 'absolute', left: 10, top: 40}}><EChart w={980} h={350} option={lineChart(['17 Kas', '18 Kas kapanış', '19 Kas dip', '19 Kas sabah'], [6269, 6099, 5990, 6030], p(T0(3, 1), 4.5), 5800, 6400, GLD, (v) => n(v))} /></div>
      </Panel>
      <Big x={1140} y={200} w={670} h={190} label="ÇEYREK ALTIN" value={'≈' + c(T0(3, 3), 10000, 0, 0, 1) + ' ₺'} c={GLD} t0={T0(3, 3)} vs={70} />
      <Big x={1140} y={410} w={670} h={190} label="CUMHURİYET ALTINI" value={'≈' + c(T0(3, 3) + 1.5, 39900, 0, 0, 1) + ' ₺'} c={GLD} t0={T0(3, 3) + 1.5} vs={70} />
      <Panel x={110} y={630} w={800} h={300} t0={T0(3, 4)} accent={SLV}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>GÜMÜŞ • DEĞİŞİM</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={760} h={180} option={hbar([{n: '1 hafta', v: -11.3, txt: '−%11,3', c: SLV, q: p(T0(3, 7), 0.9)}, {n: '1 ay', v: -18.7, txt: '−%18,7', c: RED, q: p(T0(3, 7) + 1, 0.9)}], -22, 0.5, {left: 140, right: 140, bw: 46})} /></div>
        <T x={34} y={244} s={26} wt={700} mono c={SLV}>gram 73,77 ₺ • ons ≈45 $</T>
      </Panel>
      <Panel x={940} y={630} w={870} h={300} t0={T0(3, 9)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>GRAM ALTIN NASIL HESAPLANIR?</T>
        <div style={{position: 'absolute', left: 34, top: 70, display: 'flex', alignItems: 'center', gap: 18, fontFamily: MONO, fontWeight: 800, fontSize: 46, color: '#fff'}}>
          <span style={{opacity: fq(0), color: GLD}}>3.740 $</span><span style={{opacity: fq(1)}}>×</span><span style={{opacity: fq(1), color: GRN}}>50,47 ₺</span><span style={{opacity: fq(2)}}>÷ 31,1</span>
        </div>
        <div style={{position: 'absolute', left: 34, top: 150, fontFamily: MONO, fontWeight: 800, fontSize: 70, color: GLD, opacity: fq(3), textShadow: `0 0 30px ${GLD}77`}}>{'= ' + c(T0(3, 10) + 4.8, 6060, 0, 0, 1.2) + ' ₺'}</div>
        <T x={34} y={250} w={800} s={22} wt={500} c={P.muted} o={fq(3)}>ons fiyatı × dolar kuru ÷ bir onstaki gram</T>
      </Panel>
      <Source>Kapalıçarşı ve banka fiyatları (Ekonomim, Bigpara, Sabah) • yaklaşık • kuyumcu makası farklı olabilir</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S4 dolar
const S4: React.FC = () => {
  const T0 = mk(4); const {p} = useTL(); const c = useCnt();
  return (
    <AbsoluteFill>
      <Hdr title="Dolar ve Euro" sub="Kur sakin • lira kontrollü değer kaybediyor" icon={ico(Banknote)} accent={GRN} />
      <Big x={110} y={200} w={840} h={260} label="DOLAR / TL • SABAH" value={c(T0(4, 1), 50.47, 2, 49, 1.2)} c={GRN} t0={T0(4, 1)} vs={130} icon={ico(Banknote, 44)} />
      <Big x={980} y={200} w={830} h={260} label="EURO / TL • SABAH" value={c(T0(4, 1) + 1.2, 55.47, 2, 54, 1.2)} c={BLU} t0={T0(4, 1) + 1.2} vs={130} icon={ico(Banknote, 44)} />
      <Panel x={110} y={490} w={1150} h={440} t0={T0(4, 3)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>DOLAR/TL BEKLENTİSİ • TCMB PİYASA KATILIMCILARI ANKETİ</T>
        <div style={{position: 'absolute', left: 20, top: 50}}><EChart w={1110} h={370} option={{...colBars(['Bugün', 'Yıl sonu', '12 ay sonra'], [{n: 'Kur', vals: [50.47, 51.61, 60.77], c: GLD}], p(T0(4, 3), 1.2), 70, (v) => n(v, 2)), yAxis: {type: 'value', min: 40, max: 64, show: false}}} /></div>
      </Panel>
      <Stamp x={1320} y={560} t0={T0(4, 5)} c={GLD} s={56}>≈ +%20</Stamp>
      <Row x={1290} y={720} w={520} t0={T0(4, 6)} icon={ico(Clock, 34)} c={BLU} head="BUGÜN 14.30" text="TCMB rezerv verisi" h={110} ts={32} />
      <Source>TCMB Piyasa Katılımcıları Anketi (Kasım) • serbest piyasa kurları</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S5 faizler + kredi hesaplayıcı
const S5: React.FC = () => {
  const T0 = mk(5); const {p} = useTL(); const c = useCnt();
  const rates = [
    {n: 'Politika faizi', v: 36, txt: '%36 → %35 bekleniyor', c: BLU, t: T0(5, 0)},
    {n: 'Mevduat (ort.)', v: 42.04, txt: '%42', c: GRN, t: T0(5, 2)},
    {n: 'Konut kredisi', v: 41.33, txt: '%41,33', c: GLD, t: T0(5, 4)},
    {n: 'İhtiyaç kredisi', v: 59.2, txt: '%59,20 ↑', c: RED, t: T0(5, 5)},
  ];
  return (
    <AbsoluteFill>
      <Hdr title="Faizler: Mevduat ve Kredi" sub="Yıllık ortalama oranlar • TCMB haftalık verileri" icon={ico(Percent)} accent={BLU} />
      <Panel x={110} y={200} w={1060} h={480} t0={T0(5, 0)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>YILLIK FAİZ (%)</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={1020} h={400} option={hbar(rates.map((r) => ({n: r.n, v: r.v, txt: r.txt, c: r.c, q: p(r.t, 0.9)})), 0, 80, {left: 230, right: 330, bw: 52})} /></div>
      </Panel>
      <Row x={1200} y={200} w={610} t0={T0(5, 3)} icon={ico(Wallet, 34)} c={GRN} head="32 GÜNLÜK MEVDUAT" text="En yüksek teklifler %38–43" h={110} ts={30} />
      <Row x={1200} y={330} w={610} t0={T0(5, 4)} icon={ico(Home, 34)} c={GLD} head="KONUT KREDİSİ • AYLIK İLAN" text="%2,87 ile %3,83 arası" h={110} ts={30} />
      <Row x={1200} y={460} w={610} t0={T0(5, 6)} icon={ico(TrendingUp, 34)} c={RED} head="YÖN" text="Konut kredisi ucuzluyor, ihtiyaç kredisi pahalanıyor" h={220} ts={32} />
      <Panel x={110} y={710} w={1700} h={220} t0={T0(5, 7)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>ÖRNEK HESAP • KONUT KREDİSİ</T>
        {[['Tutar', '1.000.000 ₺'], ['Vade', '120 ay'], ['Aylık faiz', '%2,87']].map(([a, b], i) => (
          <React.Fragment key={a}>
            <T x={34 + i * 330} y={70} s={22} wt={700} c={P.muted} o={p(T0(5, 7) + 0.4 * i, 0.3)}>{a}</T>
            <T x={34 + i * 330} y={104} s={44} wt={800} mono o={p(T0(5, 7) + 0.4 * i, 0.3)}>{b}</T>
          </React.Fragment>
        ))}
        <div style={{position: 'absolute', left: 1030, top: 40, width: 640, height: 150, borderRadius: 24, background: `${GLD}1f`, border: `2px solid ${GLD}`, opacity: p(T0(5, 7) + 1.6, 0.4)}}>
          <T x={30} y={18} s={22} wt={700} c={GLD} ls={2}>AYLIK TAKSİT</T>
          <T x={30} y={52} s={76} wt={800} mono glow={GLD}>{'≈' + c(T0(5, 7) + 1.8, 29700, 0, 0, 1.6) + ' ₺'}</T>
        </div>
      </Panel>
      <Source>TCMB haftalık faiz istatistikleri (6 Kasım haftası) • banka ilan oranları • örnek hesap yaklaşıktır</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S6 Borsa İstanbul
const S6: React.FC = () => {
  const T0 = mk(6); const {p} = useTL(); const c = useCnt();
  return (
    <AbsoluteFill>
      <Hdr title="Borsa İstanbul Sert Düştü" sub="18 Kasım kapanışı • banka ve holding satışı" icon={ico(ChartColumn)} accent={RED} />
      <Big x={110} y={200} w={600} h={260} label="BIST 100 • DÜN" value={'−%' + c(T0(6, 1), 1.57, 2)} sub="11.477 puan kapanış" c={RED} t0={T0(6, 1)} vs={110} icon={ico(TrendingDown, 44)} />
      <Panel x={740} y={200} w={1070} h={260} t0={T0(6, 3)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>SEKTÖRLER</T>
        <div style={{position: 'absolute', left: 20, top: 50}}><EChart w={1030} h={190} option={hbar([{n: 'Banka', v: -2.1, txt: '−%2+', q: p(T0(6, 3), 0.9)}, {n: 'Holding', v: -2.1, txt: '−%2+', q: p(T0(6, 3) + 0.6, 0.9)}], -3, 0.3, {left: 160, right: 140, bw: 46})} /></div>
      </Panel>
      <Panel x={110} y={490} w={1150} h={440} t0={T0(6, 7)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>BIST 100 (PUAN) • SON İKİ AY</T>
        <div style={{position: 'absolute', left: 10, top: 40}}><EChart w={1130} h={390} option={lineChart(['Eylül zirve', 'Kasım başı', '17 Kasım', '18 Kasım'], [14670, 10626, 11661, 11477], p(T0(6, 7), 5), 9500, 15800, GLD, (v) => n(v))} /></div>
      </Panel>
      <Row x={1290} y={490} w={520} t0={T0(6, 4)} icon={ico(ChartColumn, 34)} c={RED} head="SEKTÖR ENDEKSLERİ" text="Yükselen yok" h={110} ts={32} />
      <Big x={1290} y={620} w={520} h={150} label="BIST 30" value="14.412" c={BLU} t0={T0(6, 5)} vs={60} />
      <Row x={1290} y={800} w={520} t0={T0(6, 6)} icon={ico(Clock, 34)} c={GLD} head="BUGÜN" text="Hafif eksi açılış bekleniyor" h={130} ts={28} />
      <Source>Borsa İstanbul, Endeks24, CNBC-e • 18 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S7 KAP bildirimleri (kart akışı)
type Kap = {code: string; title: string; type: string; icon: any; c: string; value?: string; mean: string; s: number};
const KAPS: Kap[] = [
  {code: 'AYGAZ', title: 'Aygaz', type: 'KÂR PAYI ÖNERİSİ', icon: Coins, c: GRN, value: 'brüt 4,65 ₺ • net 3,95 ₺', mean: 'Ödeme 25 Aralık. Hak kullanım gününden önce hisseyi tutan ortaklar alır.', s: 1},
  {code: 'GLRMK', title: 'Gülermak', type: 'İHALE SONUCU', icon: Train, c: BLU, value: '707 milyon zloti', mean: 'Polonya Lodz demiryolu tüneli ihalesinde birinci. Sözleşmeye davet bekleniyor.', s: 4},
  {code: 'KRPLS', title: 'Koroplast', type: 'YENİ İŞ İLİŞKİSİ', icon: Handshake, c: GLD, value: '85 ülke', mean: 'Aksan Kozmetik ile yurt dışı satış ve dağıtım iş birliği.', s: 6},
  {code: 'ONRYT', title: 'Onur Yüksek Teknoloji', type: 'KAYITLI SERMAYE TAVANI', icon: TrendingUp, c: PUR, value: '375 milyon → 10 milyar ₺', mean: 'Yönetim kurulu ileride sermaye artırımını daha hızlı yapabilir.', s: 7},
  {code: 'ATATP', title: 'ATP Yazılım', type: 'ÖZEL DURUM', icon: Zap, c: GRN, value: 'nükleer ve temiz enerji', mean: 'İştirak, yatırım sözleşmeleri imzaladı.', s: 9},
  {code: 'KFILO', title: 'Kayatur Filo', type: 'KONKORDATO', icon: Gavel, c: RED, value: '3 ay geçici mühlet', mean: 'Şirket borçlarını yeniden yapılandırmaya çalışıyor.', s: 10},
  {code: 'PASİFİK', title: 'Pasifik Grubu', type: 'HABER VE SÖYLENTİ', icon: FileText, c: SLV, value: 'iddialara yanıt', mean: 'Bir milletvekilinin iddialarının gerçeği yansıtmadığını açıkladı.', s: 12},
  {code: '42 BİLDİRİM', title: 'Pay geri alımları', type: 'GERİ ALIM', icon: RefreshCw, c: GLD, value: 'EFOR, SANKO, MNDRS, MEYSU, YYLGD', mean: 'Şirket kendi hissesini borsadan satın alıyor.', s: 13},
];
const S7: React.FC = () => {
  const T0 = mk(7); const {p, pop, t} = useTL();
  let cur = 0; KAPS.forEach((k, i) => { if (t >= T0(7, k.s) - 0.2) cur = i; });
  const k = KAPS[cur]; const kt = T0(7, k.s) - 0.2;
  return (
    <AbsoluteFill>
      <Hdr title="Günün KAP Bildirimleri" sub="Kamuyu Aydınlatma Platformu • 18 Kasım akşamı" icon={ico(FileText)} accent={GLD} />
      {/* sol: liste */}
      {KAPS.map((kk, i) => {
        const on = i === cur, seen = t >= T0(7, kk.s) - 0.2;
        return (
          <div key={kk.code} style={{position: 'absolute', left: 110, top: 200 + i * 92, width: 560, height: 78, borderRadius: 18, background: on ? `${kk.c}30` : P.panel, border: `1px solid ${on ? kk.c : P.line}`, opacity: seen ? 1 : 0.35, display: 'flex', alignItems: 'center', gap: 16, paddingLeft: 18, transform: `translateX(${on ? 14 : 0}px)`}}>
            <div style={{width: 46, height: 46, borderRadius: 12, background: `${kk.c}26`, color: kk.c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ico(kk.icon, 28)}</div>
            <div style={{fontFamily: MONO, fontWeight: 800, fontSize: 26, color: on ? '#fff' : '#cfdbec', width: 200}}>{kk.code}</div>
            <div style={{fontFamily: F, fontWeight: 700, fontSize: 18, color: P.muted, letterSpacing: 1}}>{kk.type}</div>
          </div>
        );
      })}
      {/* sağ: aktif kart */}
      <div key={cur} style={{position: 'absolute', left: 720, top: 200, width: 1090, height: 640, borderRadius: 30, background: 'linear-gradient(160deg, rgba(14,30,58,.96), rgba(8,18,36,.96))', border: `2px solid ${k.c}`, boxShadow: `0 0 70px ${k.c}44`, opacity: Math.min(1, p(kt, 0.25) + (cur === 0 ? 0 : 0.0)), transform: `scale(${0.94 + 0.06 * pop(kt)})`}}>
        <div style={{position: 'absolute', left: 40, top: 36, padding: '10px 24px', borderRadius: 14, background: k.c, color: '#06101e', fontFamily: MONO, fontWeight: 900, fontSize: 40}}>{k.code}</div>
        <T x={40} y={120} s={30} wt={700} c={P.muted} ls={2}>{k.type}</T>
        <T x={40} y={168} w={1010} s={64} wt={900}>{k.title}</T>
        <div style={{position: 'absolute', right: 40, top: 36, color: k.c, opacity: 0.9}}>{ico(k.icon, 90)}</div>
        {k.value && <T x={40} y={270} w={1010} s={56} wt={800} mono c={k.c} glow={k.c} o={p(kt + 0.4, 0.3)}>{k.value}</T>}
        <div style={{position: 'absolute', left: 40, top: 390, width: 1010, height: 2, background: P.line}} />
        <T x={40} y={414} s={24} wt={800} c={GLD} ls={2} o={p(kt + 1.0, 0.3)}>BU NE DEMEK?</T>
        <T x={40} y={456} w={1010} s={38} wt={600} c="#e6eef9" o={p(kt + 1.2, 0.3)}>{k.mean}</T>
      </div>
      <Row x={720} y={866} w={1090} t0={T0(7, 17)} icon={ico(ShieldAlert, 34)} c={GLD} head="NOT" text="Bilgi amaçlıdır, al ya da sat önerisi değildir" h={80} ts={28} />
      <Source>KAP (kap.org.tr) bildirimleri • 18–19 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S8 konut ve kira
const S8: React.FC = () => {
  const T0 = mk(8); const {p} = useTL(); const c = useCnt();
  return (
    <AbsoluteFill>
      <Hdr title="Kiralar Ev Fiyatlarını Geçti" sub="TCMB ekim verileri • yıllık değişim" icon={ico(Home)} accent={GLD} />
      <Panel x={110} y={200} w={1060} h={430} t0={T0(8, 1)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>YILLIK ARTIŞ (%)</T>
        <div style={{position: 'absolute', left: 20, top: 46}}><EChart w={1020} h={370} option={colBars(['Konut', 'Yeni kira', 'İst. kira', 'Enflasyon'], [{n: 'Artış', vals: [21.1, 24.5, 31, 29.77], c: GLD}], p(T0(8, 1), 2.5), 36, (v) => (v === 29.77 ? '29,77' : n(v, v % 1 ? 1 : 0)))} /></div>
      </Panel>
      <Big x={1200} y={200} w={610} h={250} label="ENFLASYONDAN ARINDIRILMIŞ KONUT" value={'−%' + c(T0(8, 5), 6.7, 1)} sub="ev rakamda artıyor, alım gücünde düşüyor" c={RED} t0={T0(8, 5)} vs={96} icon={ico(TrendingDown, 40)} />
      <Big x={1200} y={470} w={610} h={160} label="KONUT SATIŞI • EYLÜL" value="−%9,3" c={RED} t0={T0(8, 8)} vs={64} />
      <Panel x={110} y={660} w={820} h={270} t0={T0(8, 7)} accent={GRN}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>KİRA ARTIŞ HIZI (AYLIK ORTALAMA)</T>
        <div style={{position: 'absolute', left: 20, top: 50}}><EChart w={780} h={200} option={hbar([{n: 'Temmuz', v: 2.7, txt: '%2,7', c: '#6b8bb5', q: p(T0(8, 7), 0.8)}, {n: 'Ekim', v: 2.2, txt: '%2,2', c: GRN, q: p(T0(8, 7) + 1.2, 0.8)}], 0, 3.4, {left: 140, right: 120, bw: 44})} /></div>
      </Panel>
      <Panel x={960} y={660} w={850} h={270} t0={T0(8, 9)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>KASIM YASAL KİRA TAVANI • %31,23</T>
        <T x={34} y={66} s={30} wt={600} c="#cfdbec">30.000 ₺ kira</T>
        <div style={{position: 'absolute', left: 300, top: 66, color: BLU}}>{ico(ArrowRight, 36)}</div>
        <T x={360} y={58} s={64} wt={800} mono glow={BLU}>{c(T0(8, 10), 39369, 0, 30000, 1.6) + ' ₺'}</T>
        <T x={34} y={170} s={30} wt={700} c={BLU} o={p(T0(8, 10) + 1.6, 0.3)}>en fazla +9.369 ₺</T>
      </Panel>
      <Source>TCMB Konut Fiyat Endeksi ve Kira Endeksi (Ekim) • TÜİK • TCMB Enflasyon Raporu</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S9 asgari ücret
const S9: React.FC = () => {
  const T0 = mk(9); const {p} = useTL(); const c = useCnt();
  return (
    <AbsoluteFill>
      <Hdr title="Asgari Ücret: Gözler Aralıkta" sub="Tespit Komisyonu aralıkta toplanıyor • tarih henüz belli değil" icon={ico(Users)} accent={PUR} />
      <Big x={110} y={200} w={800} h={260} label="BUGÜNKÜ NET ASGARİ ÜCRET" value={c(T0(9, 3), 28075.5, 2, 0, 1.4) + ' ₺'} c={PUR} t0={T0(9, 3)} vs={100} icon={ico(Wallet, 44)} />
      <Row x={940} y={200} w={870} t0={T0(9, 1)} icon={ico(CalendarDays, 34)} c={BLU} head="KOMİSYON" text="Aralıkta toplanacak, ilk gün belli değil" h={120} ts={32} />
      <Row x={940} y={340} w={870} t0={T0(9, 2)} icon={ico(Clock, 34)} c={GLD} head="KARAR" text="20–25 Aralık arası bekleniyor" h={120} ts={32} />
      <Panel x={110} y={490} w={1100} h={440} t0={T0(9, 4)} accent={PUR}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>SENARYOLAR • NET ASGARİ ÜCRET (₺) • RESMİ DEĞİL</T>
        <div style={{position: 'absolute', left: 20, top: 50}}><EChart w={1060} h={370} option={{...colBars(['Bugün', '%25 zam', '%30 zam', '%35 zam'], [{n: 'Net', vals: [28075, 35094, 36498, 37902], c: PUR}], p(T0(9, 4), 2.2), 42000, (v) => n(v)), yAxis: {type: 'value', min: 20000, max: 41000, show: false}}} /></div>
      </Panel>
      <Panel x={1240} y={490} w={570} h={440} t0={T0(9, 7)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>2026 ZAMMI NE OLDU?</T>
        <T x={34} y={70} s={28} wt={600} c="#cfdbec">Ocak 2026 zammı</T>
        <T x={34} y={106} s={80} wt={800} mono c={GRN}>+%27</T>
        <T x={34} y={220} s={28} wt={600} c="#cfdbec" o={p(T0(9, 8), 0.3)}>Ekim sonuna kadar enflasyon</T>
        <T x={34} y={256} s={80} wt={800} mono c={RED} o={p(T0(9, 8), 0.3)}>≈%27,5</T>
        <Stamp x={60} y={360} t0={T0(9, 8) + 1} c={RED} s={38}>ZAM ERİDİ</Stamp>
      </Panel>
      <Source>Çalışma ve Sosyal Güvenlik Bakanlığı açıklaması • senaryolar gazete hesaplamasıdır (Yeni Şafak) • TÜİK</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S10 akaryakıt (pompa ekranı)
const Pump: React.FC<{x: number; label: string; v: string; c: string; t0: number}> = ({x, label, v, c, t0}) => {
  const {p, pop} = useTL();
  return (
    <div style={{position: 'absolute', left: x, top: 210, width: 540, height: 360, borderRadius: 28, background: 'linear-gradient(180deg, #0d1a2e, #060d18)', border: `2px solid ${c}`, boxShadow: `0 0 50px ${c}33`, opacity: p(t0, 0.3), transform: `translateY(${(1 - pop(t0)) * 40}px)`}}>
      <div style={{position: 'absolute', left: 30, top: 26, color: c}}>{ico(Fuel, 44)}</div>
      <T x={90} y={30} s={32} wt={800} c={c} ls={3}>{label}</T>
      <div style={{position: 'absolute', left: 30, top: 110, width: 480, height: 150, borderRadius: 16, background: '#020611', border: '1px solid #1f3352', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: MONO, fontWeight: 800, fontSize: 104, color: '#ffe08a', textShadow: '0 0 24px #ffd36b88', letterSpacing: 2}}>{v}</div>
      <T x={30} y={284} s={26} wt={600} c={P.muted}>TL / litre • İstanbul Avrupa</T>
    </div>
  );
};
const S10: React.FC = () => {
  const T0 = mk(10); const {p} = useTL(); const c = useCnt();
  return (
    <AbsoluteFill>
      <Hdr title="Akaryakıt: Bugün Değişiklik Yok" sub="Motorine indirim bekleniyor" icon={ico(Fuel)} accent={GLD} />
      <Pump x={110} label="BENZİN" v={c(T0(10, 1), 71.3, 2, 60, 1.2)} c={GRN} t0={T0(10, 1)} />
      <Pump x={690} label="MOTORİN" v={c(T0(10, 1) + 1.5, 95.3, 2, 80, 1.2)} c={GLD} t0={T0(10, 1) + 1.5} />
      <Pump x={1270} label="OTOGAZ" v={c(T0(10, 1) + 3, 50.7, 2, 40, 1.2)} c={BLU} t0={T0(10, 1) + 3} />
      <Panel x={110} y={610} w={1100} h={320} t0={T0(10, 2)} accent={GRN}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>MOTORİN İNDİRİMİ • KONUŞULAN ARALIK</T>
        <div style={{position: 'absolute', left: 60, top: 150, width: 980, height: 22, borderRadius: 11, background: 'rgba(255,255,255,.08)'}} />
        <div style={{position: 'absolute', left: 60 + 980 * 0.3, top: 150, width: 980 * 0.4 * p(T0(10, 3), 1), height: 22, borderRadius: 11, background: `linear-gradient(90deg, ${GRN}, ${GLD})`, boxShadow: `0 0 26px ${GRN}`}} />
        <T x={60 + 980 * 0.3 - 40} y={194} s={46} wt={800} mono c={GRN}>3 ₺</T><T x={60 + 980 * 0.7 - 40} y={194} s={46} wt={800} mono c={GLD}>6,5 ₺</T>
        <T x={34} y={66} s={30} wt={600} c="#cfdbec">Tutar henüz kesinleşmedi</T>
      </Panel>
      <Row x={1240} y={610} w={570} t0={T0(10, 4)} icon={ico(TrendingDown, 34)} c={GRN} head="BENZİN • 12 KASIM" text="≈3,5 ₺ indirim gelmişti" h={150} ts={32} />
      <Source>Dağıtım şirketi fiyatları, haberler (Ekoturk, Kamudanhaber) • 19 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S11 takvim (zaman çizelgesi)
const S11: React.FC = () => {
  const T0 = mk(11); const {p} = useTL();
  const items: [string, any, string, string, number][] = [['14.30', Landmark, 'TCMB rezerv verisi', BLU, T0(11, 1)], ['Gün içi', Fuel, 'Motorin indirimi kararı', GRN, T0(11, 2)], ['16.30', Users, 'ABD işsizlik başvuruları', GLD, T0(11, 3)], ['Bugün', Globe, 'Trump, Şi ve Putin Şincen\'de', RED, T0(11, 4)], ['10 Aralık', Percent, 'TCMB faiz kararı', PUR, T0(11, 5)]];
  return (
    <AbsoluteFill>
      <Hdr title="Bugünün Takvimi" sub="Cebimizi etkileyebilecek gelişmeler" icon={ico(CalendarDays)} accent={BLU} />
      <div style={{position: 'absolute', left: 300, top: 220, width: 6, height: 700 * p(T0(11, 0), 3), background: `linear-gradient(180deg, ${BLU}, ${PUR})`, borderRadius: 3}} />
      {items.map(([h, I, tx, col, t0], i) => (
        <div key={tx} style={{position: 'absolute', left: 110, top: 220 + i * 140, width: 1700, height: 120, opacity: p(t0, 0.3), transform: `translateX(${(1 - p(t0, 0.5)) * 60}px)`}}>
          <T x={0} y={36} w={160} align="right" s={34} wt={800} mono c={col}>{h}</T>
          <div style={{position: 'absolute', left: 172, top: 30, width: 54, height: 54, borderRadius: '50%', background: col, boxShadow: `0 0 24px ${col}`, color: '#06101e', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ico(I, 30)}</div>
          <div style={{position: 'absolute', left: 260, top: 8, width: 1300, height: 104, borderRadius: 22, background: P.panel, border: `1px solid ${col}55`, display: 'flex', alignItems: 'center', paddingLeft: 30, fontFamily: F, fontWeight: 800, fontSize: 40, color: '#fff'}}>{tx}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S12 kapanış tablosu (Türkiye ağırlıklı)
type Tile = {n: string; v: string; sub: string; c: string; t: number};
const S12: React.FC = () => {
  const T0 = mk(12); const {p, pop} = useTL();
  const tiles: Tile[] = [
    {n: 'BIST 100', v: '11.477', sub: '−%1,57 • dün', c: RED, t: T0(12, 1)}, {n: 'BIST 30', v: '14.412', sub: 'dün kapanış', c: RED, t: T0(12, 1) + 2.5},
    {n: 'Dolar / TL', v: '50,47', sub: 'sabah', c: GRN, t: T0(12, 2)}, {n: 'Euro / TL', v: '55,47', sub: 'sabah', c: BLU, t: T0(12, 3)},
    {n: 'Gram altın', v: '≈6.030 ₺', sub: 'dört ayın dibi', c: GLD, t: T0(12, 4)}, {n: 'Çeyrek altın', v: '≈10.000 ₺', sub: 'satış', c: GLD, t: T0(12, 5)},
    {n: 'Ons altın', v: '≈3.740 $', sub: '14 ayın dibi', c: GLD, t: T0(12, 6)}, {n: 'Gram gümüş', v: '73,77 ₺', sub: 'haftada −%11', c: SLV, t: T0(12, 7)},
    {n: 'Brent', v: '≈91 $', sub: 'dün', c: BLU, t: T0(12, 8)}, {n: 'Benzin / Motorin', v: '71,30 / 95,30', sub: 'İstanbul Avrupa', c: GRN, t: T0(12, 9)},
  ];
  const W = 412, H = 210, G = 18;
  return (
    <AbsoluteFill>
      <Hdr title="Günün Kapanış Tablosu" sub="BIST dün kapanış • kurlar ve altın 19 Kasım sabah" icon={ico(ChartColumn)} accent={GLD} />
      {tiles.map((tl, i) => {
        const x = 110 + (i % 4) * (W + G), y = 200 + Math.floor(i / 4) * (H + G);
        const sp = pop(tl.t), a = Math.min(1, Math.max(0, p(tl.t, 0.3)));
        return (
          <div key={tl.n} style={{position: 'absolute', left: i >= 8 ? x + (W + G) : x, top: y, width: W, height: H, borderRadius: 24, background: `linear-gradient(155deg, ${tl.c}38, rgba(9,22,42,.94))`, border: `1px solid ${tl.c}77`, opacity: a, transform: `scale(${0.9 + 0.1 * sp})`, boxShadow: `0 0 34px ${tl.c}30`}}>
            <T x={26} y={20} s={26} wt={700} c="#cfdbec" w={370}>{tl.n}</T>
            <T x={26} y={66} s={tl.v.length > 9 ? 44 : 60} wt={800} mono c="#fff" w={380} ls={-1}>{tl.v}</T>
            <T x={26} y={150} s={26} wt={700} c={tl.c} w={370}>{tl.sub}</T>
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
      <Hdr title="Yarın: Rezervler ve Motorin İndirimi" sub="Pompaya yansıyan tutar" icon={ico(Bell)} accent={RED} />
      <Row x={110} y={260} w={1700} t0={T0(13, 0)} icon={ico(Coins, 38)} c={GLD} head="KISACA" text="Fed'in faiz mesajı altını ve gümüşü aşağı çekti, borsada satış sürüyor" h={110} ts={34} />
      <Row x={110} y={400} w={1700} t0={T0(13, 1)} icon={ico(ShieldAlert, 38)} c={GLD} head="BİLGİLENDİRME" text="Anlattıklarım bilgilendirme amaçlıdır, yatırım tavsiyesi değildir" h={110} ts={34} />
      <Panel x={110} y={540} w={1700} h={170} t0={T0(13, 2)} accent={RED}>
        <T x={40} y={22} s={22} wt={700} c={P.muted} ls={2}>YARINKİ VİDEO</T>
        <T x={40} y={64} s={54} wt={800} w={1620} glow={RED}>TCMB rezervleri ve motorin indirimi</T>
      </Panel>
      <div style={{position: 'absolute', left: 560, top: 760, width: 800, height: 120, borderRadius: 60, background: `linear-gradient(135deg, ${RED}, #b8323d)`, boxShadow: `0 0 60px ${RED}88`, opacity: p(T0(13, 3), 0.4), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, fontFamily: F, fontWeight: 900, fontSize: 50, color: '#fff', letterSpacing: 3}}>{ico(Bell, 48)}KANALA ABONE OL</div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- gerçek görüntü araları
type BR = [number, number, string, string | undefined, string | undefined, 'in' | 'out' | 'left' | 'right', number?];
const BROLL: BR[] = [
  [A(1, 0) - 0.2, A(1, 1) + 1.2, 'stock/foto-fed-6534073.jpg', 'Fed tutanakları', 'Ekim toplantısı • dün akşam', 'in'],
  [A(3, 0) - 0.2, A(3, 1) - 0.1, 'stock/foto-kapalicarsi-5096971.jpg', 'Kuyumcu fiyatları', 'Gram altın iki günde 6.269 → 6.099 ₺', 'out'],
  [A(3, 4) - 0.1, A(3, 5) + 2.5, 'stock/madeni-1.mp4', 'Gümüş', 'Bir haftada −%11', 'right'],
  [A(4, 0) - 0.2, A(4, 1) - 0.1, 'stock/para-dolar.mp4', 'Dolar ve euro', 'Kur sakin', 'in'],
  [A(5, 4) - 0.1, A(5, 4) + 4.2, 'stock/anahtar-1.mp4', 'Konut kredisi', 'Yıllık ortalama %41,33', 'in'],
  [A(6, 0) - 0.2, A(6, 1) - 0.1, 'stock/istanbul-1.mp4', 'Borsa İstanbul', 'Dün −%1,57 • 11.477 puan', 'out'],
  [A(7, 0) - 0.2, A(7, 1) - 0.1, 'stock/borsa-4.mp4', 'KAP bildirimleri', 'Dün akşamın önemli haberleri', 'in'],
  [A(8, 0) - 0.2, A(8, 1) - 0.1, 'stock/konut-insaat-3.mp4', 'Konut ve kira', 'Kiralar ev fiyatlarını geçti', 'in'],
  [A(8, 9) - 0.1, A(8, 10) - 0.1, 'stock/anahtar-3.mp4', 'Kira artış tavanı', 'Kasım: %31,23', 'in'],
  [A(9, 0) - 0.2, A(9, 1) - 0.1, 'stock/istanbul-2.mp4', 'Asgari ücret', 'Karar aralıkta', 'out'],
  [A(10, 0) - 0.2, A(10, 1) - 0.1, 'stock/foto-akaryakit-29370543.jpg', 'Akaryakıt', 'Bugün değişiklik yok', 'left'],
  [A(10, 2) - 0.1, A(10, 3) + 1.5, 'stock/foto-akaryakit-12377482.jpg', 'Motorine indirim', 'Tutar henüz kesinleşmedi', 'right'],
  [A(11, 4) - 0.1, A(11, 4) + 4.4, 'stock/ulke-cin-1.jpg', 'Şincen zirvesi', 'Petrol ve altını etkileyebilir', 'in'],
];
const LT: [number, string][] = [
  [OFF + 0.6, 'Piyasa özeti • 19 Kasım 2026'],
  [A(1, 2) + 0.3, 'Fed tutanakları • ekim toplantısı'],
  [A(3, 1) + 0.3, 'Altın ve gümüş • kuyumcu fiyatları'],
  [A(5, 0) + 0.3, 'Faizler • mevduat ve kredi'],
  [A(6, 1) + 0.3, 'Borsa İstanbul • 18 Kasım kapanışı'],
  [A(8, 1) + 0.3, 'Konut ve kira • TCMB ekim verileri'],
  [A(9, 1) + 0.3, 'Asgari ücret • 2027 süreci'],
];
const TICK = ['GRAM ALTIN ≈6.030 ₺', 'ÇEYREK ≈10.000 ₺', 'ONS ≈3.740 $', 'GÜMÜŞ 73,77 ₺', 'USD/TL 50,47', 'EUR/TL 55,47', 'BIST 100 11.477 (−%1,57)', 'BENZİN 71,30 ₺', 'MOTORİN 95,30 ₺', 'TCMB REZERV 14.30', 'YATIRIM TAVSİYESİ DEĞİLDİR'];

const SCENES: React.FC[] = [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13];
const TT = 14;
const transitions: any[] = [fade(), slide({direction: 'from-right'}), wipe({direction: 'from-left'}), slide({direction: 'from-bottom'}), fade(), slide({direction: 'from-right'}), wipe({direction: 'from-bottom'}), fade(), slide({direction: 'from-left'})];
export const EnfVideo6: React.FC = () => {
  useFonts();
  const total = ENF6_TOTAL;
  return (
    <DateCtx.Provider value="19 KASIM 2026">
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
        <Sequence from={fr(D.bumpers[0])} durationInFrames={fr(BUMPER_DUR)}><Bumper label="BORSA İSTANBUL" sub="BIST 100 • KAP BİLDİRİMLERİ" c="#e8485a" /></Sequence>
        <Sequence from={fr(D.bumpers[1])} durationInFrames={fr(BUMPER_DUR)}><Bumper label="CEBİMİZ" sub="KONUT • MAAŞ • AKARYAKIT" /></Sequence>
        <Sequence from={0} durationInFrames={fr(INTRO_DUR)}><IntroSting /></Sequence>
        <Sequence from={fr(END)} durationInFrames={total - fr(END)}><EndCard next="TCMB rezervleri ve motorin indirimi" /></Sequence>
        <Grain o={0.05} />
      </AbsoluteFill>
    </DateCtx.Provider>
  );
};
