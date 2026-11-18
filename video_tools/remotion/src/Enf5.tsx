import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {AnimatedText} from 'remotion-bits';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {fade} from '@remotion/transitions/fade';
import {wipe} from '@remotion/transitions/wipe';
import {
  Bell, Bitcoin, Building2, CalendarDays, ChartColumn, Clock, Coins, Cpu, Fuel, Gauge, Globe, Landmark, Percent, Rocket, ShieldAlert, TrendingDown, TrendingUp, Users, Briefcase, Crown, Server,
} from 'lucide-react';
import D from './enf5_sentences.json';
import {Bg4, DateCtx, EChart, F, Hdr, MONO, P, Panel, Source, T, WorldMap, useFonts} from './Pro';
import {useTL} from './ui';
import {Big, BLU, colBars, donutOpt, gaugeOpt, GLD, GRN, hbar, ico, num, PUR, RED, Row, Stamp} from './Enf4';
import {BrandTicker, Bug, Bumper, BUMPER_DUR, EndCard, Grain, INTRO_DUR, IntroSting, LowerThird, PushIn} from './Brand';
import {Stock} from './Stock';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
export const ENF5_TOTAL = Math.ceil(D.total * FPS);
type Pa = {start: number; end: number; sentences: number[]};
const paras = D.paras as Pa[];
const A = (pi: number, si = 0) => paras[pi].sentences[Math.min(si, paras[pi].sentences.length - 1)];
const mk = (pi0: number) => (pi: number, si = 0) => A(pi, si) - paras[pi0].start;
const OFF = D.off, END = D.end;
const DATE = '18 KASIM 2026';

// ---------------------------------------------------------------- S0 kanca
const S0: React.FC = () => {
  const T0 = mk(0); const {p, t} = useTL();
  const q = p(0.6, 1.8);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 110, top: 100, width: 1150, fontFamily: F, fontWeight: 900, fontSize: 96, lineHeight: 1.02, color: '#fff', letterSpacing: -3}}>
        <AnimatedText transition={{split: 'word', splitStagger: 3, y: [40, 0], opacity: [0, 1], blur: [14, 0], duration: 22, delay: 2}}>NVIDIA BEKLENTİLERİ AŞTI</AnimatedText>
      </div>
      <Panel x={110} y={330} w={860} h={330} t0={0.4} accent={GRN}>
        <T x={36} y={26} s={22} wt={700} c={P.muted} ls={2}>ÜÇÜNCÜ ÇEYREK GELİRİ</T>
        <div style={{position: 'absolute', right: 30, top: 22, color: GRN}}>{ico(Cpu, 44)}</div>
        <T x={36} y={76} s={150} wt={800} mono c="#fff" glow={GRN} ls={-6}>{'$' + num(115.8 * q, 1)}</T>
        <T x={40} y={250} s={30} wt={600} c={GRN}>milyar dolar • geçen yılın iki katından fazla</T>
      </Panel>
      <Panel x={1000} y={330} w={810} h={330} t0={T0(0, 0) + 2.2} accent={GRN}>
        <T x={36} y={26} s={22} wt={700} c={P.muted} ls={2}>HİSSE • KAPANIŞ SONRASI</T>
        <div style={{position: 'absolute', right: 30, top: 22, color: GRN}}>{ico(TrendingUp, 44)}</div>
        <T x={36} y={86} s={150} wt={800} mono c={GRN} glow={GRN} ls={-6}>{'+%' + num(4.8 * p(T0(0, 0) + 2.4, 1.2), 1)}</T>
      </Panel>
      <Row x={110} y={700} w={860} t0={T0(0, 2)} icon={ico(Globe, 34)} c={GRN} head="ASYA" text="Kospi yeniden 5.000 puanın üzerinde" />
      <Row x={1000} y={700} w={810} t0={T0(0, 3)} icon={ico(ChartColumn, 34)} c={GLD} head="BU VİDEODA" text="Dünya, Türkiye ve kapanış tablosu" />
      <div style={{position: 'absolute', left: 110, top: 830, opacity: p(T0(0, 3) + 1, 0.4), fontFamily: MONO, fontSize: 24, color: P.muted}}>{t > 0 ? 'Rakamlar yaklaşıktır • yatırım tavsiyesi değildir' : ''}</div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S1 Nvidia rakamları
const S1: React.FC = () => {
  const T0 = mk(1); const {p} = useTL();
  const q0 = p(T0(1, 1), 1.0), q1 = p(T0(1, 0) + 0.3, 1.0);
  return (
    <AbsoluteFill>
      <Hdr title="Nvidia: Üçüncü Çeyrek" sub="Mali 2027 • 25 Ekim'de biten çeyrek • 17 Kasım akşamı açıklandı" icon={ico(Cpu)} accent={GRN} />
      <Panel x={110} y={200} w={760} h={460} t0={T0(1, 0)} accent={GRN}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>GELİR (MİLYAR $)</T>
        <div style={{position: 'absolute', left: 20, top: 60}}>
          <EChart w={720} h={380} option={{...colBars(['Beklenti', 'Gerçekleşen'], [{n: 'Gelir', vals: [109, 115.8], c: GRN}], 1, 120, (v) => num(v, 1)),
            series: [{type: 'bar', barWidth: 130, data: [{value: 109 * q0, itemStyle: {color: '#6b8bb5', borderRadius: [12, 12, 2, 2]}}, {value: 115.8 * q1, itemStyle: {color: {type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{offset: 0, color: GRN}, {offset: 1, color: GRN + '55'}]}, borderRadius: [12, 12, 2, 2], shadowBlur: 30, shadowColor: GRN + '66'}}],
              label: {show: true, position: 'top', formatter: (pp: any) => (pp.dataIndex === 0 ? '≈109' : '115,8'), color: '#fff', fontSize: 36, fontWeight: 800, fontFamily: MONO}}], yAxis: {type: 'value', min: 80, max: 122, show: false}}} />
        </div>
      </Panel>
      <Big x={900} y={200} w={440} h={215} label="YILLIK ARTIŞ" value={'+%' + Math.round(103 * p(T0(1, 0) + 1, 1))} c={GRN} t0={T0(1, 0) + 1} vs={84} icon={ico(TrendingUp, 40)} />
      <Big x={1370} y={200} w={440} h={215} label="VERİ MERKEZİ GELİRİ" value={'$' + num(107.6 * p(T0(1, 2), 1), 1) + ' mr'} sub="yıllık +%110 • çeyreklik +%21" c={BLU} t0={T0(1, 2)} vs={64} icon={ico(Server, 40)} />
      <Panel x={900} y={445} w={910} h={215} t0={T0(1, 4)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>HİSSE BAŞI DÜZELTİLMİŞ KÂR ($)</T>
        <div style={{position: 'absolute', left: 20, top: 52}}><EChart w={870} h={150} option={hbar([{n: 'Beklenti', v: 2.47, txt: '2,47', c: '#6b8bb5', q: p(T0(1, 4), 0.8)}, {n: 'Gerçekleşen', v: 2.68, txt: '2,68', c: GLD, q: p(T0(1, 4) + 0.8, 0.8)}], 0, 3.2, {left: 190, right: 140, bw: 40})} /></div>
      </Panel>
      <Row x={110} y={700} w={1700} t0={T0(1, 5)} icon={ico(Rocket, 34)} c={PUR} head="VERA RUBIN" text="Sevkiyat başladı: şirket tarihindeki en hızlı üretim artışı" ts={32} />
      <Row x={110} y={810} w={1700} t0={T0(1, 6)} icon={ico(Building2, 34)} c={BLU} head="KULLANANLAR" text="Microsoft ve Google gibi bulut şirketlerinin veri merkezleri" ts={32} />
      <Source>Nvidia basın bülteni (GlobeNewswire) • LSEG beklentisi • 17 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S2 rehberlik
const S2: React.FC = () => {
  const T0 = mk(2); const {p} = useTL();
  const q0 = p(T0(2, 2), 0.9), q1 = p(T0(2, 1), 1.0);
  const qm = p(T0(2, 6), 1.2);
  return (
    <AbsoluteFill>
      <Hdr title="Gelecek Çeyrek Tahmini" sub="Ocak ayında biten çeyrek • rehberlik artı eksi %3" icon={ico(TrendingUp)} accent={GLD} />
      <Panel x={110} y={200} w={760} h={460} t0={T0(2, 0)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>4. ÇEYREK GELİRİ (MİLYAR $)</T>
        <div style={{position: 'absolute', left: 20, top: 60}}>
          <EChart w={720} h={380} option={{xAxis: {type: 'category', data: ['Analist beklentisi', 'Nvidia rehberliği'], axisLine: {lineStyle: {color: '#3a5072'}}, axisTick: {show: false}, axisLabel: {color: '#dbe6f5', fontSize: 24, fontWeight: 700, fontFamily: F}}, grid: {left: 30, right: 30, top: 50, bottom: 56}, yAxis: {type: 'value', min: 100, max: 140, show: false},
            series: [{type: 'bar', barWidth: 130, data: [{value: 100 + 25 * q0, itemStyle: {color: '#6b8bb5', borderRadius: [12, 12, 2, 2]}}, {value: 100 + 30 * q1, itemStyle: {color: {type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{offset: 0, color: GLD}, {offset: 1, color: GLD + '55'}]}, borderRadius: [12, 12, 2, 2], shadowBlur: 30, shadowColor: GLD + '66'}}],
              label: {show: true, position: 'top', formatter: (pp: any) => (pp.dataIndex === 0 ? '≈125' : '130 ±%3'), color: '#fff', fontSize: 36, fontWeight: 800, fontFamily: MONO}}]}} />
        </div>
      </Panel>
      <Row x={900} y={200} w={910} t0={T0(2, 3)} icon={ico(CalendarDays, 34)} c={BLU} head="DİKKAT" text="Çeyrek 14 hafta sürüyor, normalden bir hafta uzun" />
      <Row x={900} y={310} w={910} t0={T0(2, 4)} icon={ico(Globe, 34)} c={RED} head="ÇİN" text="Tahminde Çin'den veri merkezi geliri yok" />
      <Row x={900} y={420} w={910} t0={T0(2, 5)} icon={ico(Cpu, 34)} c={GLD} head="GEÇEN ÇEYREK ÇİN SEVKİYATI" text="2,4 milyar $ eski nesil Hopper çipi" />
      <Panel x={900} y={530} w={910} h={300} t0={T0(2, 6)} accent={PUR}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>BRÜT KÂR MARJI</T>
        <div style={{position: 'absolute', left: 20, top: 40}}><EChart w={430} h={250} option={gaugeOpt(74.9 * qm, 100, GRN, '%' + num(74.9 * qm, 1), 46)} /></div>
        <div style={{position: 'absolute', left: 460, top: 40}}><EChart w={430} h={250} option={gaugeOpt(71.5 * p(T0(2, 6) + 2, 1.2), 100, GLD, '%71–72', 46)} /></div>
        <T x={140} y={250} s={22} wt={700} c={P.muted}>bu çeyrek</T><T x={560} y={250} s={22} wt={700} c={P.muted}>gelecek çeyrek</T>
      </Panel>
      <Row x={110} y={700} w={760} t0={T0(2, 7)} icon={ico(Percent, 34)} c={GLD} head="ANLAMI" text="Satış artıyor, kâr payı biraz azalacak" />
      <Row x={110} y={860} w={1700} t0={T0(2, 8)} icon={ico(Crown, 34)} c={PUR} head="LİDERLİK" text="Colette Kress'in geçici CEO olarak açıkladığı ilk bilanço" h={80} ts={28} />
      <Source>Nvidia basın bülteni ve CFO yorumu • 17 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S3 neden önemli
const S3: React.FC = () => {
  const T0 = mk(3); const {p, pop} = useTL();
  const steps: [any, string, string, number][] = [[Building2, 'Bulut şirketleri', 'Microsoft, Google, Oracle', T0(3, 2)], [Server, 'Veri merkezi harcaması', 'çip siparişleri', T0(3, 2) + 1.2], [Cpu, 'Nvidia geliri', 'yapay zekâ göstergesi', T0(3, 2) + 2.4]];
  return (
    <AbsoluteFill>
      <Hdr title="Neden Bu Kadar Önemli?" sub="Yapay zekâ yatırımlarının en net göstergesi" icon={ico(Gauge)} accent={BLU} />
      {steps.map(([I, h, s, t0], i) => {
        const sp = pop(t0);
        return (
          <React.Fragment key={h}>
            <div style={{position: 'absolute', left: 110 + i * 590, top: 230, width: 520, height: 300, borderRadius: 28, background: P.panel, border: `1px solid ${P.line}`, opacity: p(t0, 0.3), transform: `scale(${0.85 + 0.15 * sp})`, boxShadow: `0 0 40px ${BLU}22`}}>
              <div style={{position: 'absolute', left: 190, top: 36, width: 140, height: 140, borderRadius: 36, background: `${BLU}26`, border: `1px solid ${BLU}88`, color: BLU, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ico(I, 76)}</div>
              <T x={260} y={196} w={480} align="center" s={38} wt={800}>{h}</T>
              <T x={260} y={248} w={480} align="center" s={24} wt={500} c={P.muted}>{s}</T>
            </div>
            {i < 2 && <div style={{position: 'absolute', left: 640 + i * 590, top: 350, fontFamily: F, fontSize: 70, fontWeight: 900, color: GLD, opacity: p(t0 + 0.6, 0.3)}}>→</div>}
          </React.Fragment>
        );
      })}
      <Big x={110} y={580} w={820} h={230} label="GEÇEN HAFTA • KURUCU AYRILINCA" value={'−%' + num(12.5 * p(T0(3, 3), 1), 1)} sub="hisse değer kaybı" c={RED} t0={T0(3, 3)} vs={92} icon={ico(TrendingDown, 40)} />
      <Panel x={960} y={580} w={850} h={230} t0={T0(3, 3) + 2} accent={GLD}>
        <T x={34} y={22} s={20} wt={700} c={P.muted} ls={2}>SORU</T>
        <T x={34} y={64} s={38} wt={800} w={780}>Büyüme hikâyesi sürecek mi?</T>
      </Panel>
      <Stamp x={1110} y={720} t0={T0(3, 4) + 1.2} c={GRN} s={44}>TALEP YAVAŞLAMADI</Stamp>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S4 analistler ve vadeliler
const S4: React.FC = () => {
  const T0 = mk(4); const {p} = useTL();
  return (
    <AbsoluteFill>
      <Hdr title="Analistler ve Vadeli İşlemler" sub="Bilanço sonrası hedef fiyatlar • çarşamba sabahı" icon={ico(Briefcase)} accent={PUR} />
      <Row x={110} y={200} w={1700} t0={T0(4, 0)} icon={ico(TrendingDown, 34)} c={GLD} head="BİLANÇO ÖNCESİ" text="Birçok aracı kurum hedef fiyatını düşürmüştü" ts={32} />
      <Panel x={110} y={320} w={1000} h={420} t0={T0(4, 1)} accent={PUR}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>HEDEF FİYAT ($)</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={960} h={340} option={hbar([
          {n: 'Jefferies (önce)', v: 300, txt: '300', c: '#6b8bb5', q: p(T0(4, 1), 0.8)},
          {n: 'Jefferies (şimdi)', v: 250, txt: '250 • Al', c: PUR, q: p(T0(4, 1) + 2.2, 0.8)},
          {n: 'Cantor Fitzgerald', v: 250, txt: '250 • korudu', c: BLU, q: p(T0(4, 3), 0.8)},
        ], 0, 380, {left: 270, right: 200, bw: 52})} /></div>
      </Panel>
      <Row x={1140} y={320} w={670} t0={T0(4, 2)} icon={ico(ShieldAlert, 34)} c={GLD} head="GEREKÇE" text="Yönetim değişikliğinin belirsizliği" h={200} ts={34} />
      <Panel x={1140} y={540} w={670} h={200} t0={T0(4, 4)} accent={GRN}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>ABD VADELİLERİ • BU SABAH</T>
        <T x={34} y={66} s={40} wt={800} c={GRN}>S&P 500 ▲</T>
        <T x={34} y={120} s={40} wt={800} c={GRN}>Nasdaq ▲▲ daha güçlü</T>
      </Panel>
      <Source>Jefferies, Cantor Fitzgerald notları (Investing.com, TipRanks) • 18 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S5 Wall Street
const S5: React.FC = () => {
  const T0 = mk(5); const {p} = useTL();
  const idx = [{n: 'Dow Jones', v: -1.64, txt: '−%1,64', t: T0(5, 4)}, {n: 'S&P 500', v: -1.03, txt: '−%1,03', t: T0(5, 2)}, {n: 'Nasdaq', v: -0.74, txt: '−%0,74', t: T0(5, 5)}];
  return (
    <AbsoluteFill>
      <Hdr title="Wall Street: Sert Düşüş" sub="Salı kapanışı • Nvidia bilançosundan önce" icon={ico(TrendingDown)} accent={RED} />
      <Panel x={110} y={200} w={800} h={390} t0={T0(5, 1)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>GÜNLÜK DEĞİŞİM</T>
        <div style={{position: 'absolute', left: 20, top: 58}}><EChart w={760} h={310} option={hbar(idx.map((i) => ({n: i.n, v: i.v, txt: i.txt, q: p(i.t, 0.9)})), -2.2, 0.2, {left: 190, right: 160, bw: 52})} /></div>
      </Panel>
      <Panel x={940} y={200} w={870} h={390} t0={T0(5, 2)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>KAPANIŞ SEVİYELERİ</T>
        {[['S&P 500', '7.340,53', T0(5, 2)], ['Dow Jones', '50.759,42', T0(5, 4)], ['Nasdaq', '24.328,38', T0(5, 5)]].map(([n, v, t0], i) => (
          <React.Fragment key={n as string}>
            <T x={38} y={86 + i * 100} s={32} wt={700} c="#cfdbec" o={p(t0 as number, 0.3)}>{n as string}</T>
            <T x={830} y={80 + i * 100} w={500} align="right" s={56} wt={800} mono o={p(t0 as number, 0.3)}>{v as string}</T>
            <div style={{position: 'absolute', left: 36, top: 148 + i * 100, width: 800, height: 2, background: P.line}} />
          </React.Fragment>
        ))}
      </Panel>
      <Panel x={110} y={620} w={460} h={310} t0={T0(5, 6)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>DÜŞEN SEKTÖR</T>
        <div style={{position: 'absolute', left: 40, top: 56}}><EChart w={250} h={240} option={donutOpt([{n: 'düşen', v: 11 * p(T0(5, 6), 0.8) + 0.001, c: RED}], '11/11')} /></div>
        <T x={300} y={110} w={150} s={22} wt={600} c={P.muted}>başta yazılım hisseleri</T>
      </Panel>
      <Row x={600} y={620} w={1210} t0={T0(5, 3)} icon={ico(CalendarDays, 34)} c={GLD} head="S&P 500" text="Temmuzdan beri en düşük kapanış" />
      <Row x={600} y={730} w={1210} t0={T0(5, 4) + 2.5} icon={ico(TrendingDown, 34)} c={RED} head="DOW JONES" text="Gün içinde kayıp 1.000 puanı geçti" />
      <Row x={600} y={840} w={1210} t0={T0(5, 5) + 2} icon={ico(ChartColumn, 34)} c={PUR} head="NASDAQ" text="Üst üste dördüncü düşüş günü" h={90} />
      <Source>CNBC, AP • 17 Kasım 2026 kapanışı</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S6 Asya
const S6: React.FC = () => {
  const T0 = mk(6);
  return (
    <AbsoluteFill>
      <Hdr title="Asya Nvidia'ya Olumlu Tepki Verdi" sub="Çarşamba kapanışı" icon={ico(Globe)} accent={GRN} />
      <WorldMap w={1100} h={680} x={80} y={200} focus={{c: [132, 34], k: 4.2}}
        hi={[{id: '410', color: GRN, t0: T0(6, 1)}, {id: '392', color: GRN, t0: T0(6, 3)}]}
        markers={[{lon: 127, lat: 37.5, label: 'Seul', value: '+%1,99', color: GRN, t0: T0(6, 1), dx: -170, dy: -30}, {lon: 139.7, lat: 35.7, label: 'Tokyo', value: '+%0,28', color: GRN, t0: T0(6, 3), dx: 20, dy: 20}]} />
      <Big x={1220} y={200} w={590} h={230} label="KOSPI • GÜNEY KORE" value="5.067" sub="+%1,99 • yeniden 5.000 üstü" c={GRN} t0={T0(6, 1)} vs={96} icon={ico(TrendingUp, 40)} />
      <Row x={1220} y={460} w={590} t0={T0(6, 2)} icon={ico(Cpu, 34)} c={BLU} head="YÜKSELİŞİ TAŞIYAN" text="Samsung ve SK Hynix (bellek)" h={110} ts={30} />
      <Big x={1220} y={600} w={590} h={230} label="NIKKEI 225 • JAPONYA" value="59.024" sub="+%0,28 • gün içi kazancın bir kısmı silindi" c={GRN} t0={T0(6, 3)} vs={96} icon={ico(TrendingUp, 40)} />
      <Source>CNBC, AP • 18 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S7 Avrupa
const S7: React.FC = () => {
  const T0 = mk(7); const {p} = useTL();
  return (
    <AbsoluteFill>
      <Hdr title="Avrupa: Sert Düşüşten Sonra Yatay" sub="Dün mart ayından beri en kötü gün • bugün sabah saatleri" icon={ico(Landmark)} accent={BLU} />
      <Panel x={110} y={200} w={860} h={330} t0={T0(7, 0)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>DÜN (17 KASIM)</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={820} h={250} option={hbar([{n: 'Stoxx 600', v: -1.75, txt: '−%1,75', q: p(T0(7, 0) + 0.5, 0.8)}, {n: 'DAX', v: -2.08, txt: '−%2,08', q: p(T0(7, 3), 0.8)}], -2.6, 0.2, {left: 170, right: 160, bw: 56})} /></div>
      </Panel>
      <Row x={1000} y={200} w={810} t0={T0(7, 1)} icon={ico(ShieldAlert, 34)} c={GLD} head="NEDEN" text="ABD, Çin'e çip satış kısıtlarını sıkılaştırdı" h={150} ts={32} />
      <Panel x={1000} y={380} w={810} h={150} t0={T0(7, 2)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>BUGÜN • SABAH</T>
        <T x={34} y={60} s={40} wt={800} mono>Stoxx 600 ≈650</T>
        <T x={460} y={60} s={40} wt={800} mono c={GRN} o={p(T0(7, 3), 0.3)}>DAX ≈26.090</T>
      </Panel>
      <Panel x={110} y={560} w={1700} h={370} t0={T0(7, 4)} accent={GRN}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>SEKTÖRLER • BUGÜN</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={1660} h={290} option={hbar([
          {n: 'ASML', v: 1.8, txt: '+%1,8', q: p(T0(7, 4) + 2.5, 0.8)}, {n: 'Teknoloji', v: 1.2, txt: '+%1,2', q: p(T0(7, 4), 0.8)}, {n: 'DAX', v: 0.2, txt: '+%0,2', q: p(T0(7, 3), 0.8)}, {n: 'Madencilik', v: -3, txt: '−%3 • 9 ayın dibine yakın', q: p(T0(7, 5), 0.8)},
        ], -3.6, 3.6, {left: 220, right: 420, bw: 46})} /></div>
      </Panel>
      <Source>Reuters, dpa-AFX (MarketScreener) • 17–18 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S8 Fed
const S8: React.FC = () => {
  const T0 = mk(8); const {p} = useTL();
  const q = p(T0(8, 3), 1.4);
  return (
    <AbsoluteFill>
      <Hdr title="Bu Akşam: Fed Tutanakları" sub="Ekim toplantısı • faiz sabit kalmıştı" icon={ico(Landmark)} accent={BLU} />
      <Panel x={110} y={200} w={760} h={330} t0={T0(8, 0)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>AÇIKLANMA SAATİ • TÜRKİYE</T>
        <div style={{position: 'absolute', right: 30, top: 22, color: BLU}}>{ico(Clock, 44)}</div>
        <T x={34} y={70} s={170} wt={800} mono glow={BLU} ls={-4}>22.00</T>
      </Panel>
      <Panel x={900} y={200} w={910} h={500} t0={T0(8, 3) - 0.3} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>ARALIKTA +25 BP ARTIŞ İHTİMALİ</T>
        <div style={{position: 'absolute', left: 150, top: 70}}><EChart w={600} h={400} option={gaugeOpt(94 * q, 100, RED, '%' + Math.round(94 * q), 88)} /></div>
      </Panel>
      <Row x={110} y={560} w={760} t0={T0(8, 4)} icon={ico(ShieldAlert, 34)} c={GLD} head="YATIRIMCI NE ARAYACAK" text="Artışın ne kadar kesin olduğu" h={140} ts={32} />
      <Row x={110} y={730} w={840} t0={T0(8, 5)} icon={ico(Coins, 34)} c={GRN} head="DOLAR ENDEKSİ" text="19 ayın zirvesine yakın" />
      <Row x={970} y={730} w={840} t0={T0(8, 5) + 1.5} icon={ico(Percent, 34)} c={GLD} head="ABD 10 YILLIK" text="Faiz yüzde 5'in üzerinde" />
      <Row x={110} y={840} w={840} t0={T0(8, 6)} icon={ico(Building2, 34)} c={PUR} head="16.30" text="ABD konut başlangıçları" h={90} />
      <Row x={970} y={840} w={840} t0={T0(8, 6) + 1.5} icon={ico(Building2, 34)} c={PUR} head="18.00" text="Bekleyen konut satışları" h={90} />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S9 Anthropic
const S9: React.FC = () => {
  const T0 = mk(9); const {p} = useTL();
  const qd = p(T0(9, 2), 1.2);
  return (
    <AbsoluteFill>
      <Hdr title="Anthropic Halka Arzı" sub="Fiyatlama bu akşam • işlem yarın Nasdaq'ta (ANT)" icon={ico(Rocket)} accent={PUR} />
      <Panel x={110} y={200} w={860} h={300} t0={T0(9, 1)} accent={PUR}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>FİYAT ARALIĞI ($)</T>
        <div style={{position: 'absolute', left: 60, top: 140, width: 740, height: 20, borderRadius: 10, background: 'rgba(255,255,255,.08)'}} />
        <div style={{position: 'absolute', left: 60, top: 140, width: 740 * p(T0(9, 1) + 0.4, 1), height: 20, borderRadius: 10, background: `linear-gradient(90deg, ${PUR}, ${GLD})`, boxShadow: `0 0 30px ${PUR}`}} />
        <T x={60} y={180} s={60} wt={800} mono>70</T><T x={800} y={180} w={200} align="right" s={60} wt={800} mono c={GLD}>78</T>
        <T x={34} y={60} s={34} wt={700} c="#cfdbec">825 milyon hisse</T>
      </Panel>
      <Panel x={1000} y={200} w={810} h={300} t0={T0(9, 2)} accent={GRN}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>TALEP / ARZ</T>
        <div style={{position: 'absolute', left: 20, top: 50}}><EChart w={770} h={240} option={hbar([{n: 'Arz', v: 1, txt: '1x', c: '#6b8bb5', q: qd}, {n: 'Talep', v: 6.5, txt: '6–7x', c: GRN, q: qd}], 0, 8.5, {left: 120, right: 140, bw: 56})} /></div>
      </Panel>
      <Row x={110} y={530} w={1700} t0={T0(9, 3)} icon={ico(TrendingUp, 34)} c={GLD} head="KONUŞULAN" text="Bankalar fiyatı aralığın tepesinde ya da üzerinde belirlemeyi değerlendiriyor" ts={30} />
      <Big x={110} y={650} w={830} h={230} label="ÖZEL PLASMAN • 7 BİLGİ İŞLEM TEDARİKÇİSİ" value="$26 mr" sub="oy hakkı olmayan hisse, halka arz fiyatından" c={BLU} t0={T0(9, 4)} vs={84} />
      <Panel x={970} y={650} w={840} h={230} t0={T0(9, 5)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>BİREYSEL YATIRIMCI PAYI</T>
        <div style={{position: 'absolute', left: 20, top: 40}}><EChart w={200} h={180} option={donutOpt([{n: 'bireysel', v: 20 * p(T0(9, 5), 0.8) + 0.001, c: GLD}, {n: 'diğer', v: 80, c: '#24395a'}], '%20')} /></div>
        <T x={260} y={80} s={34} wt={800} w={540}>Yarın Nasdaq'ta • ANT</T>
      </Panel>
      <Source>CNBC, TechCrunch, Yahoo Finance • fiyatlama öncesi bilgiler</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S10 emtia
const S10: React.FC = () => {
  const T0 = mk(10); const {p} = useTL();
  return (
    <AbsoluteFill>
      <Hdr title="Altın, Petrol, Bitcoin" sub="Faiz artışı beklentisi ve güçlü dolar" icon={ico(Coins)} accent={GLD} />
      <Big x={110} y={200} w={860} h={300} label="ONS ALTIN" value="≈3.820 $" sub="Eylül 2025'ten beri en düşük" c={GLD} t0={T0(10, 1)} vs={110} icon={ico(Coins, 44)} />
      <Big x={1000} y={200} w={810} h={300} label="ALTIN • BİR HAFTADA" value={'−%' + num(6 * p(T0(10, 2), 1), 0) + '+'} sub="faiz beklentisi ve güçlü dolar" c={RED} t0={T0(10, 2)} vs={110} icon={ico(TrendingDown, 44)} />
      <Big x={110} y={530} w={560} h={240} label="BRENT" value="≈91 $" sub="+%0,4" c={GRN} t0={T0(10, 4)} vs={84} icon={ico(Fuel, 40)} />
      <Big x={690} y={530} w={540} h={240} label="WTI" value="≈84,5 $" sub="ABD petrolü" c={BLU} t0={T0(10, 4) + 2} vs={84} icon={ico(Fuel, 40)} />
      <Big x={1250} y={530} w={560} h={240} label="BITCOIN" value="≈64.500 $" sub="yatay" c={PUR} t0={T0(10, 5)} vs={74} icon={ico(Bitcoin, 40)} />
      <Source>FXStreet, Fortune, Mitrade • 18 Kasım 2026 sabah</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S11 Borsa İstanbul
const S11: React.FC = () => {
  const T0 = mk(11); const {p} = useTL();
  const q = p(T0(11, 2), 2.4);
  const cats = ['Eylül', 'Kasım başı', 'Dün', 'Bugün açılış'];
  const vals = [14670, 10626, 11661, 11657];
  const n = Math.max(1, Math.round(q * 3) + 1);
  return (
    <AbsoluteFill>
      <Hdr title="Borsa İstanbul" sub="BIST 100 • çarşamba açılışı" icon={ico(ChartColumn)} accent={RED} />
      <Panel x={110} y={200} w={1060} h={480} t0={T0(11, 0)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>BIST 100 (PUAN)</T>
        <div style={{position: 'absolute', left: 10, top: 40}}><EChart w={1040} h={430} option={{
          grid: {left: 60, right: 80, top: 60, bottom: 60},
          xAxis: {type: 'category', data: cats, boundaryGap: true, axisLine: {lineStyle: {color: '#3a5072'}}, axisTick: {show: false}, axisLabel: {color: '#9fb2cb', fontSize: 22, fontWeight: 600, fontFamily: F}},
          yAxis: {type: 'value', min: 9500, max: 15500, show: false},
          series: [{type: 'line', data: vals.slice(0, n), symbol: 'circle', symbolSize: 18, lineStyle: {width: 7, color: GLD, shadowBlur: 22, shadowColor: GLD}, itemStyle: {color: GLD, borderColor: '#fff', borderWidth: 3},
            label: {show: true, position: 'top', formatter: (pp: any) => pp.value.toLocaleString('tr-TR'), color: '#fff', fontSize: 28, fontWeight: 800, fontFamily: MONO, distance: 14},
            markLine: {silent: true, symbol: 'none', label: {color: '#cfdbec', fontSize: 18, fontFamily: MONO, formatter: (pp: any) => pp.name}, data: p(T0(11, 3), 0.4) > 0.5 ? [{yAxis: 11500, name: 'destek 11.500', lineStyle: {color: GRN, type: 'dashed', width: 2}}, {yAxis: 11800, name: 'direnç 11.800', lineStyle: {color: RED, type: 'dashed', width: 2}}] : []}}],
        }} /></div>
      </Panel>
      <Big x={1200} y={200} w={610} h={230} label="DÜN" value="−%1,53" sub="11.661 puan kapanış" c={RED} t0={T0(11, 0)} vs={90} icon={ico(TrendingDown, 40)} />
      <Big x={1200} y={450} w={610} h={230} label="SON İKİ HAFTA" value="≈+%10" sub="kasım başındaki dipten toparlanma" c={GRN} t0={T0(11, 2) + 3} vs={90} icon={ico(TrendingUp, 40)} />
      <Row x={110} y={710} w={1060} t0={T0(11, 3)} icon={ico(Gauge, 34)} c={GLD} head="ARACI KURUMLARIN İZLEDİĞİ SEVİYELER" text="Destek 11.500 ve 11.400 • Direnç 11.700 ve 11.800" ts={28} />
      <Row x={110} y={820} w={1060} t0={T0(11, 4)} icon={ico(ShieldAlert, 34)} c={P.muted} head="NOT" text="Tavsiye değildir, piyasanın baktığı seviyelerdir" ts={28} h={90} />
      <Big x={1200} y={710} w={300} h={200} label="DOLAR/TL" value="50,44" c={BLU} t0={T0(11, 5)} vs={60} />
      <Big x={1520} y={710} w={290} h={200} label="GRAM ALTIN" value="≈6.140" sub="4 ayın dibi" c={GLD} t0={T0(11, 6)} vs={60} />
      <Source>Borsa İstanbul, Diken, Endeks24, Manşet Haber, Son Mühür • 18 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S12 TÜİK işgücü
const S12: React.FC = () => {
  const T0 = mk(12); const {p} = useTL();
  const q = p(T0(12, 1), 1.2);
  return (
    <AbsoluteFill>
      <Hdr title="TÜİK: Üçüncü Çeyrek İşgücü" sub="Mevsim etkisinden arındırılmış • temmuz–eylül 2026" icon={ico(Users)} accent={GLD} />
      <Panel x={110} y={200} w={640} h={420} t0={T0(12, 1)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>İŞSİZLİK ORANI</T>
        <div style={{position: 'absolute', left: 30, top: 50}}><EChart w={580} h={330} option={gaugeOpt(8.1 * q, 15, RED, '%' + num(8.1 * q, 1), 74)} /></div>
        <T x={34} y={366} s={26} wt={600} c={P.muted}>bir önceki çeyreğe göre +0,1 puan</T>
      </Panel>
      <Big x={780} y={200} w={500} h={200} label="İŞSİZ SAYISI" value="2,87 milyon" sub="+46 bin kişi" c={RED} t0={T0(12, 2)} vs={60} />
      <Big x={1310} y={200} w={500} h={200} label="ÇALIŞAN SAYISI" value="−62 bin" sub="bir önceki çeyreğe göre" c={RED} t0={T0(12, 2) + 3} vs={60} />
      <Big x={780} y={420} w={1030} h={200} label="ATIL İŞGÜCÜ ORANI (GENİŞ ÖLÇÜ)" value="%30,9" sub="+1,0 puan • daha fazla çalışmak isteyenler ve iş aramayı bırakanlar dahil" c={GLD} t0={T0(12, 3)} vs={70} />
      <Panel x={110} y={650} w={1100} h={280} t0={T0(12, 5)} accent={PUR}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>İŞSİZLİK ORANI (%)</T>
        <div style={{position: 'absolute', left: 20, top: 40}}><EChart w={1060} h={230} option={colBars(['Genç (15–24)', 'Kadın', 'Erkek', 'Genel'], [{n: 'Oran', vals: [14.1, 10.7, 6.8, 8.1], c: PUR}], p(T0(12, 5), 1), 17, (v) => num(v, 1))} /></div>
      </Panel>
      <Big x={1240} y={650} w={570} h={280} label="TCMB POLİTİKA FAİZİ" value="%36" sub="sonraki karar 10 Aralık" c={BLU} t0={T0(12, 6)} vs={96} icon={ico(Landmark, 40)} />
      <Source>TÜİK İşgücü İstatistikleri, III. Çeyrek 2026 • 18 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S13 takvim
const S13: React.FC = () => {
  const T0 = mk(13); const {p} = useTL();
  const cols: {d: string; c: string; t: number; items: [any, string, string][]}[] = [
    {d: 'BU AKŞAM', c: BLU, t: T0(13, 1), items: [[Landmark, 'Fed ekim tutanakları', '22.00'], [Rocket, 'Anthropic fiyatlaması', 'ABD kapanışı sonrası']]},
    {d: 'YARIN • PERŞEMBE', c: GLD, t: T0(13, 2), items: [[Rocket, "Anthropic Nasdaq'ta", 'ANT'], [Coins, 'TCMB rezerv verisi', '14.30'], [Users, 'ABD işsizlik başvuruları', ''], [Globe, 'Trump, Şi ve Putin Şincen\'de', '']]},
  ];
  return (
    <AbsoluteFill>
      <Hdr title="Önümüzdeki Saatlerin Takvimi" sub="Piyasaları hareketlendirebilecek gelişmeler" icon={ico(CalendarDays)} accent={BLU} />
      {cols.map((c, i) => (
        <Panel key={c.d} x={110 + i * 870} y={200} w={830} h={730} t0={c.t} accent={c.c}>
          <T x={34} y={28} s={32} wt={800} c={c.c} ls={2}>{c.d}</T>
          <div style={{position: 'absolute', left: 34, top: 84, width: 760, height: 2, background: P.line}} />
          {c.items.map(([I, tx, sub], j) => (
            <div key={j} style={{position: 'absolute', left: 34, top: 116 + j * 150, width: 760, opacity: p(c.t + 0.4 + j * 0.9, 0.3)}}>
              <div style={{position: 'absolute', left: 0, top: 0, width: 72, height: 72, borderRadius: 18, background: `${c.c}26`, border: `1px solid ${c.c}88`, color: c.c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ico(I, 38)}</div>
              <T x={96} y={2} w={660} s={34} wt={700}>{tx}</T>
              {sub && <T x={96} y={48} s={26} wt={700} mono c={c.c}>{sub}</T>}
            </div>
          ))}
        </Panel>
      ))}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S14 kapanış tablosu
type Tile = {n: string; v: string; ch?: number; chTxt?: string; t: number};
const S14: React.FC = () => {
  const T0 = mk(14); const {p, pop} = useTL();
  const tiles: Tile[] = [
    {n: 'S&P 500', v: '7.340,53', ch: -1.03, t: T0(14, 1)}, {n: 'Nasdaq', v: '24.328', ch: -0.74, t: T0(14, 1) + 2.4}, {n: 'Dow Jones', v: '50.759', ch: -1.64, t: T0(14, 1) + 4.2},
    {n: 'Nikkei 225', v: '59.024', ch: 0.28, t: T0(14, 2)}, {n: 'Kospi', v: '5.067', ch: 1.99, t: T0(14, 2) + 2},
    {n: 'Stoxx 600 (sabah)', v: '≈650', chTxt: 'yatay', t: T0(14, 3)}, {n: 'DAX (sabah)', v: '≈26.090', ch: 0.2, t: T0(14, 3) + 2.5},
    {n: 'BIST 100 (açılış)', v: '11.656', chTxt: 'yatay', t: T0(14, 4)}, {n: 'Dolar / TL', v: '50,44', chTxt: 'kur', t: T0(14, 5)}, {n: 'Gram altın ₺', v: '≈6.140', chTxt: '4 ayın dibi', t: T0(14, 6)},
    {n: 'Ons altın $', v: '≈3.820', chTxt: 'yılın dibi', t: T0(14, 7)}, {n: 'Brent $', v: '≈91', ch: 0.4, t: T0(14, 8)}, {n: 'Bitcoin $', v: '≈64.500', chTxt: 'yatay', t: T0(14, 9)},
    {n: 'Nvidia (kapanış sonrası)', v: 'NVDA', ch: 4.8, t: T0(14, 10)},
  ];
  const W = 330, H = 168, G = 15;
  return (
    <AbsoluteFill>
      <Hdr title="Günün Kapanış Tablosu" sub="ABD salı kapanışı • Asya kapanış • Avrupa sabah • BIST açılış" icon={ico(ChartColumn)} accent={GLD} />
      {tiles.map((tl, i) => {
        const x = 110 + (i % 5) * (W + G), y = 200 + Math.floor(i / 5) * (H + G);
        const c = tl.ch === undefined ? BLU : tl.ch < 0 ? RED : GRN;
        const sp = pop(tl.t), a = Math.min(1, Math.max(0, p(tl.t, 0.3)));
        return (
          <div key={tl.n} style={{position: 'absolute', left: x, top: y, width: W, height: H, borderRadius: 22, background: `linear-gradient(155deg, ${c}${tl.ch === undefined ? '22' : Math.abs(tl.ch) > 2 ? '66' : Math.abs(tl.ch) > 1 ? '48' : '30'}, rgba(9,22,42,.92))`, border: `1px solid ${c}66`, opacity: a, transform: `scale(${0.9 + 0.1 * sp})`, boxShadow: `0 0 34px ${c}30`}}>
            <T x={22} y={16} s={22} wt={700} c="#cfdbec" w={290}>{tl.n}</T>
            <T x={22} y={52} s={46} wt={800} mono c="#fff" w={300} ls={-1}>{tl.v}</T>
            <T x={22} y={118} s={tl.ch !== undefined ? 30 : 24} wt={800} mono c={c} w={300}>{tl.ch !== undefined ? (tl.ch < 0 ? '−%' : '+%') + num(Math.abs(tl.ch), Math.abs(tl.ch) < 1 || (Math.abs(tl.ch) * 100) % 10 !== 0 ? 2 : 1) : tl.chTxt}</T>
          </div>
        );
      })}
      <Source>CNBC, AP, Reuters, dpa-AFX, Borsa İstanbul, FXStreet • rakamlar yaklaşıktır • yatırım tavsiyesi değildir</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S15 final
const S15: React.FC = () => {
  const T0 = mk(15); const {p} = useTL();
  return (
    <AbsoluteFill>
      <Hdr title="Yarın: Fed Tutanakları ve Anthropic" sub="Nasdaq'taki ilk gün" icon={ico(Bell)} accent={RED} />
      <Row x={110} y={300} w={1700} t0={T0(15, 0)} icon={ico(ShieldAlert, 38)} c={GLD} head="BİLGİLENDİRME" text="Anlattıklarım bilgilendirme amaçlıdır, yatırım tavsiyesi değildir" h={110} ts={34} />
      <Panel x={110} y={450} w={1700} h={200} t0={T0(15, 1)} accent={RED}>
        <T x={40} y={24} s={22} wt={700} c={P.muted} ls={2}>YARINKİ VİDEO</T>
        <T x={40} y={70} s={58} wt={800} w={1620} glow={RED}>Fed tutanakları ve Anthropic'in ilk günü</T>
      </Panel>
      <div style={{position: 'absolute', left: 560, top: 720, width: 800, height: 120, borderRadius: 60, background: `linear-gradient(135deg, ${RED}, #b8323d)`, boxShadow: `0 0 60px ${RED}88`, opacity: p(T0(15, 2), 0.4), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, fontFamily: F, fontWeight: 900, fontSize: 50, color: '#fff', letterSpacing: 3}}>{ico(Bell, 48)}KANALA ABONE OL</div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- gerçek görüntü araları (cümle zamanlarına bağlı)
type BR = [number, number, string, string | undefined, string | undefined, 'in' | 'out' | 'left' | 'right', number?];
const BROLL: BR[] = [
  [A(3, 0) - 0.2, A(3, 2) - 0.1, 'stock/borsa-1.mp4', 'Yapay zekânın nabzı', 'Nvidia geliri ne söylüyor?', 'in'],
  [A(5, 0) - 0.3, A(5, 2) - 0.1, 'stock/ulke-abd-1.mp4', 'Wall Street', 'Salı kapanışı', 'in'],
  [A(6, 1) - 0.1, A(6, 1) + 4.6, 'stock/ulke-gkore-1.jpg', 'Güney Kore • Kospi', '+%1,99 • 5.067 puan', 'right'],
  [A(6, 3) - 0.1, A(6, 3) + 4.4, 'stock/ulke-japonya-1.jpg', 'Japonya • Nikkei', '+%0,28 • 59.024 puan', 'left'],
  [A(7, 0) - 0.2, A(7, 1) - 0.1, 'stock/ulke-almanya-1.mp4', 'Avrupa', 'Mart ayından beri en sert günlük düşüş', 'in'],
  [A(9, 0) - 0.2, A(9, 1) - 0.1, 'stock/borsa-4.mp4', 'Anthropic halka arzı', 'Fiyatlama bu akşam', 'in'],
  [A(10, 0) - 0.2, A(10, 2) - 0.1, 'stock/altin-1.mp4', 'Ons altın ≈ 3.820 $', "Eylül 2025'ten beri en düşük", 'left'],
  [A(10, 4) - 0.1, A(10, 5) - 0.1, 'stock/petrol-1.mp4', 'Petrol', 'Brent ≈ 91 $ • WTI ≈ 84,5 $', 'in'],
  [A(11, 0) - 0.3, A(11, 1) + 1.5, 'stock/istanbul-3.mp4', 'Borsa İstanbul', 'BIST 100 • 11.656 açılış', 'out'],
  [A(11, 5) - 0.1, A(11, 6) - 0.1, 'stock/para-tl.mp4', 'Dolar/TL ≈ 50,44', 'Sabah saatleri', 'in'],
  [A(11, 6) - 0.1, A(11, 6) + 4.2, 'stock/altin-1.mp4', 'Gram altın ≈ 6.140 ₺', 'Dört ayın en düşüğü', 'right', 9],
  [A(12, 0) - 0.2, A(12, 1) - 0.1, 'stock/istanbul-2.mp4', 'TÜİK işgücü verisi', 'Üçüncü çeyrek 2026', 'in'],
];
const LT: [number, string][] = [
  [OFF + 0.8, 'Piyasa özeti • 18 Kasım 2026'],
  [A(1, 0) + 0.5, 'Nvidia bilançosu • üçüncü çeyrek'],
  [A(5, 2) + 0.3, 'Wall Street • salı kapanışı'],
  [A(8, 0) + 0.4, 'Fed tutanakları • bu akşam 22.00'],
  [A(11, 2) + 0.3, 'Borsa İstanbul • çarşamba'],
  [A(12, 1) + 0.3, 'TÜİK • üçüncü çeyrek işgücü'],
];

const TICK = ['NVIDIA 115,8 MR $ GELİR', 'NVDA KAPANIŞ SONRASI +%4,8', 'S&P 500 7.340,53 (−%1,03)', 'NASDAQ 24.328 (−%0,74)', 'KOSPİ 5.067 (+%1,99)', 'NİKKEİ 59.024 (+%0,28)', 'BIST 100 11.656 (açılış)', 'USD/TL 50,44', 'GRAM ALTIN ≈6.140 ₺', 'ONS ALTIN ≈3.820 $', 'BRENT ≈91 $', 'FED TUTANAKLARI 22.00', 'YATIRIM TAVSİYESİ DEĞİLDİR'];

// ---------------------------------------------------------------- birleşim
const SCENES: React.FC[] = [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15];
const TT = 14;
const transitions: any[] = [slide({direction: 'from-right'}), fade(), wipe({direction: 'from-left'}), slide({direction: 'from-bottom'}), fade(), slide({direction: 'from-right'}), wipe({direction: 'from-bottom'}), fade(), slide({direction: 'from-left'})];
export const EnfVideo5: React.FC = () => {
  useFonts();
  const total = ENF5_TOTAL;
  return (
    <DateCtx.Provider value={DATE}>
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
        <Sequence from={fr(D.bumpers[0])} durationInFrames={fr(BUMPER_DUR)}><Bumper label="KÜRESEL PİYASALAR" sub="WALL STREET • ASYA • AVRUPA" /></Sequence>
        <Sequence from={fr(D.bumpers[1])} durationInFrames={fr(BUMPER_DUR)}><Bumper label="TÜRKİYE" sub="BORSA İSTANBUL • TÜİK" c="#e8485a" /></Sequence>
        <Sequence from={0} durationInFrames={fr(INTRO_DUR)}><IntroSting /></Sequence>
        <Sequence from={fr(END)} durationInFrames={total - fr(END)}><EndCard next="Fed tutanakları ve Anthropic'in ilk günü" /></Sequence>
        <Grain o={0.05} />
      </AbsoluteFill>
    </DateCtx.Provider>
  );
};
