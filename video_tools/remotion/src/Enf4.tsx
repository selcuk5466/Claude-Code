import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {AnimatedText} from 'remotion-bits';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {fade} from '@remotion/transitions/fade';
import {wipe} from '@remotion/transitions/wipe';
import {flip} from '@remotion/transitions/flip';
import {
  Banknote, Bell, Bitcoin, Building2, CalendarDays, Check, ChartColumn, Clock, Coins, Cpu, Fuel, Gauge, Globe, Home, Landmark, Lock, Receipt, Rocket, ShieldAlert, ShoppingCart, TriangleAlert, TrendingDown, Users, Wallet, Crown, Percent, Flame,
} from 'lucide-react';
import D from './enf4_sentences.json';
import {GoldScene} from './Pro3D';
import {Bg4, EChart, F, Hdr, MONO, P, Panel, Source, T, WorldMap, useFonts} from './Pro';
import {C, useTL} from './ui';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
export const ENF4_TOTAL = Math.ceil(D.total * FPS);
type Pa = {start: number; end: number; sentences: number[]};
const paras = D.paras as Pa[];
const A = (pi: number, si = 0) => paras[pi].sentences[si];
const mk = (start: number) => (pi: number, si = 0) => A(pi, si) - start;
const num = (v: number, d = 1) => v.toLocaleString('tr-TR', {minimumFractionDigits: d, maximumFractionDigits: d});
const RED = '#f05b66', GRN = '#35c987', GLD = '#d6ad52', BLU = '#3b82f6', PUR = '#8b5cf6', TXT = '#f2f6fc';
const ico = (I: any, size = 52) => <I size={size} strokeWidth={2.4} />;

// ---------------------------------------------------------------- grafik kurucuları
type It = {n: string; v: number; txt: string; c?: string; q: number};
const hbar = (items: It[], min: number, max: number, o: {left?: number; right?: number; fs?: number; bw?: number} = {}) => ({
  grid: {left: o.left ?? 170, right: o.right ?? 150, top: 6, bottom: 6},
  xAxis: {type: 'value', show: false, min, max},
  yAxis: {type: 'category', inverse: true, data: items.map((i) => i.n), axisLine: {show: false, onZero: false}, axisTick: {show: false}, axisLabel: {color: '#dbe6f5', fontSize: o.fs ?? 26, fontWeight: 700, fontFamily: F}},
  series: [{
    type: 'bar', barWidth: o.bw ?? 46,
    data: items.map((i) => {
      const c = i.c ?? (i.v < 0 ? RED : GRN);
      return {
        value: i.v * i.q,
        itemStyle: {color: {type: 'linear', x: 0, y: 0, x2: 1, y2: 0, colorStops: i.v < 0 ? [{offset: 0, color: c}, {offset: 1, color: c + '88'}] : [{offset: 0, color: c + '88'}, {offset: 1, color: c}]}, borderRadius: i.v < 0 ? [10, 4, 4, 10] : [4, 10, 10, 4], shadowBlur: 24, shadowColor: c + '66'},
        label: {show: i.q > 0.55, position: 'right', formatter: i.txt, color: i.c ?? (i.v < 0 ? RED : GRN), fontSize: (o.fs ?? 26) + 4, fontWeight: 800, fontFamily: MONO},
      };
    }),
  }],
});
const gaugeOpt = (value: number, max: number, color: string, label: string, size = 62) => ({
  series: [{type: 'gauge', min: 0, max, startAngle: 210, endAngle: -30, radius: '92%', center: ['50%', '58%'],
    progress: {show: true, width: 28, roundCap: true, itemStyle: {color, shadowBlur: 30, shadowColor: color}},
    axisLine: {roundCap: true, lineStyle: {width: 28, color: [[1, 'rgba(255,255,255,.08)']]}},
    pointer: {show: false}, axisTick: {show: false}, splitLine: {show: false}, axisLabel: {show: false}, anchor: {show: false},
    detail: {formatter: label, fontSize: size, fontWeight: 800, color: '#ffffff', offsetCenter: [0, '2%'], fontFamily: MONO}, data: [{value}]}],
});
const donutOpt = (data: {n: string; v: number; c: string}[], centerTxt: string) => ({
  series: [{type: 'pie', radius: ['60%', '84%'], center: ['50%', '50%'], startAngle: 90, silent: true, label: {show: false}, itemStyle: {borderColor: '#0a1730', borderWidth: 4},
    data: data.map((d) => ({name: d.n, value: d.v, itemStyle: {color: d.c, shadowBlur: 24, shadowColor: d.c + '66'}}))}],
  graphic: [{type: 'text', left: 'center', top: 'center', style: {text: centerTxt, fill: '#fff', fontSize: 52, fontWeight: 800, fontFamily: MONO, textAlign: 'center'}}],
});
const lineOpt = (cats: string[], vals: number[], q: number, min: number, max: number, color: string, fmt: (v: number) => string, extra: any = {}) => {
  const n = Math.max(1, Math.round(q * (vals.length - 1)) + 1);
  const shown = vals.slice(0, n);
  return {
    grid: {left: 90, right: 120, top: 60, bottom: 60},
    xAxis: {type: 'category', data: cats, boundaryGap: false, axisLine: {lineStyle: {color: '#3a5072'}}, axisTick: {show: false}, axisLabel: {color: '#9fb2cb', fontSize: 22, fontWeight: 600, fontFamily: F}},
    yAxis: {type: 'value', min, max, show: false},
    series: [{type: 'line', data: shown, smooth: 0.25, symbol: 'circle', symbolSize: 18, lineStyle: {width: 7, color, shadowBlur: 22, shadowColor: color}, itemStyle: {color, borderColor: '#fff', borderWidth: 3},
      areaStyle: {color: {type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{offset: 0, color: color + '55'}, {offset: 1, color: color + '00'}]}},
      label: {show: true, position: 'top', formatter: (p: any) => fmt(p.value), color: '#fff', fontSize: 26, fontWeight: 800, fontFamily: MONO, distance: 14}, ...extra}],
  };
};
const colBars = (cats: string[], series: {n: string; vals: number[]; c: string}[], q: number, max: number, fmt: (v: number) => string) => ({
  grid: {left: 30, right: 30, top: 50, bottom: 56},
  legend: {show: series.length > 1, top: 0, textStyle: {color: '#cfdbec', fontSize: 22, fontFamily: F}, itemWidth: 22, itemHeight: 14},
  xAxis: {type: 'category', data: cats, axisLine: {lineStyle: {color: '#3a5072'}}, axisTick: {show: false}, axisLabel: {color: '#dbe6f5', fontSize: 24, fontWeight: 700, fontFamily: F}},
  yAxis: {type: 'value', min: 0, max, show: false},
  series: series.map((s) => ({name: s.n, type: 'bar', barWidth: series.length > 1 ? 70 : 90, data: s.vals.map((v) => ({value: v * q, itemStyle: {color: {type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{offset: 0, color: s.c}, {offset: 1, color: s.c + '66'}]}, borderRadius: [10, 10, 2, 2], shadowBlur: 24, shadowColor: s.c + '55'}})),
    label: {show: q > 0.6, position: 'top', formatter: (p: any) => fmt(s.vals[p.dataIndex]), color: '#fff', fontSize: 26, fontWeight: 800, fontFamily: MONO}})),
});

// ---------------------------------------------------------------- küçük bileşenler
const Row: React.FC<{x: number; y: number; w: number; t0: number; icon: React.ReactNode; c: string; head?: string; text: string; h?: number; ts?: number}> = ({x, y, w, t0, icon, c, head, text, h = 92, ts = 28}) => {
  const {p, pop} = useTL(); const sp = pop(t0);
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 22, background: P.panel, border: `1px solid ${P.line}`, opacity: p(t0, 0.3), transform: `translateX(${(1 - sp) * 80}px)`, boxShadow: `0 0 30px ${c}22`}}>
      <div style={{position: 'absolute', left: 14, top: (h - 60) / 2, width: 60, height: 60, borderRadius: 16, background: `${c}26`, border: `1px solid ${c}77`, color: c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{icon}</div>
      {head && <T x={96} y={10} s={19} wt={700} c={P.muted} ls={1.5}>{head}</T>}
      <T x={96} y={head ? 36 : (h - ts * 1.12) / 2} w={w - 120} s={ts} wt={700}>{text}</T>
    </div>
  );
};
const Big: React.FC<{x: number; y: number; w: number; label: string; value: string; sub?: string; c: string; t0: number; vs?: number; h?: number; icon?: React.ReactNode}> = ({x, y, w, label, value, sub, c, t0, vs = 76, h = 210, icon}) => {
  const {p} = useTL();
  return (
    <Panel x={x} y={y} w={w} h={h} t0={t0} accent={c}>
      <T x={34} y={22} s={20} wt={700} c={P.muted} ls={2}>{label}</T>
      {icon && <div style={{position: 'absolute', right: 26, top: 22, color: c, opacity: 0.9}}>{icon}</div>}
      <T x={34} y={sub ? 54 : 70} w={w - 60} s={vs} wt={800} mono c="#fff" glow={c} ls={-2} o={p(t0 + 0.1, 0.3)}>{value}</T>
      {sub && <T x={34} y={h - 54} w={w - 60} s={24} wt={500} c={P.muted} o={p(t0 + 0.2, 0.3)}>{sub}</T>}
    </Panel>
  );
};
const Stamp: React.FC<{x: number; y: number; t0: number; c: string; s?: number; rot?: number; children: string}> = ({x, y, t0, c, s = 46, rot = -4, children}) => {
  const {p, pop} = useTL(); const sp = pop(t0);
  return <div style={{position: 'absolute', left: x, top: y, padding: '8px 28px', border: `6px solid ${c}`, borderRadius: 14, color: c, fontFamily: F, fontWeight: 900, fontSize: s, letterSpacing: 3, opacity: p(t0, 0.12), transform: `rotate(${rot}deg) scale(${1.6 - 0.6 * sp})`, textShadow: `0 0 26px ${c}88`, background: '#06101ecc', boxShadow: `0 0 40px ${c}44`}}>{children}</div>;
};

// ---------------------------------------------------------------- S1 kanca
const S1: React.FC = () => {
  const T0 = mk(0); const {p, t, count} = useTL();
  const q = p(T0(0, 0) + 0.5, 1.6);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 110, top: 110, width: 1000, fontFamily: F, fontWeight: 900, fontSize: 92, lineHeight: 1.02, color: '#fff', letterSpacing: -3}}>
        <AnimatedText transition={{split: 'word', splitStagger: 3, y: [40, 0], opacity: [0, 1], blur: [14, 0], duration: 22, delay: 2}}>NVIDIA BU AKŞAM BİLANÇO AÇIKLIYOR</AnimatedText>
      </div>
      <Panel x={110} y={400} w={820} h={290} t0={0.4} accent={RED}>
        <T x={36} y={26} s={22} wt={700} c={P.muted} ls={2}>NASDAQ • DÜN</T>
        <div style={{position: 'absolute', right: 30, top: 22, color: RED}}>{ico(TrendingDown, 44)}</div>
        <T x={36} y={74} s={170} wt={800} mono c={RED} glow={RED} ls={-6}>{'−%' + num(2.5 * Math.min(1, t / 1.5), 1)}</T>
        <T x={36} y={246} s={26} wt={500} c={P.muted}>bir günde, pazartesi kapanışı</T>
      </Panel>
      <Panel x={960} y={400} w={850} h={290} t0={1.0} accent={GLD}>
        <T x={36} y={26} s={22} wt={700} c={P.muted} ls={2}>OPSİYON PİYASASI • BEKLENEN HAREKET</T>
        <div style={{position: 'absolute', left: 140, top: 40}}><EChart w={570} h={260} option={gaugeOpt(10.3 * q, 20, GLD, '±%' + num(10.3 * q, 1), 56)} /></div>
      </Panel>
      <Row x={110} y={760} w={820} t0={T0(0, 1)} icon={ico(Clock, 34)} c={GLD} head="NVIDIA SONUÇLARI" text="Bu akşam, Türkiye saatiyle 00.20" />
      <Row x={960} y={760} w={850} t0={T0(0, 1) + 0.8} icon={ico(Globe, 34)} c={BLU} head="BU VİDEODA" text="ABD, Asya, Avrupa, Türkiye, kapanış tablosu" />
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S2 ABD
const S2: React.FC = () => {
  const T0 = mk(paras[1].start); const {p} = useTL();
  const idx = [{n: 'Nasdaq', v: -2.5, txt: '−%2,5', t: T0(1, 1) + 5.5}, {n: 'S&P 500', v: -1.9, txt: '−%1,9', t: T0(1, 1)}, {n: 'Dow Jones', v: -1.4, txt: '−%1,4', t: T0(1, 2)}];
  return (
    <AbsoluteFill>
      <Hdr title="Wall Street: Sert Düşüş" sub="Pazartesi kapanışı • üst üste üçüncü kayıp" icon={ico(TrendingDown)} accent={RED} />
      <Panel x={110} y={200} w={800} h={390} t0={T0(1, 0)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>GÜNLÜK DEĞİŞİM</T>
        <div style={{position: 'absolute', left: 20, top: 58}}><EChart w={760} h={310} option={hbar(idx.map((i) => ({n: i.n, v: i.v, txt: i.txt, q: p(i.t, 0.9)})), -3.2, 0.3, {left: 190, right: 160, bw: 52})} /></div>
      </Panel>
      <Panel x={940} y={200} w={870} h={390} t0={T0(1, 1)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>KAPANIŞ SEVİYELERİ</T>
        {[['S&P 500', '7.416,59', T0(1, 1)], ['Dow Jones', '51.608,17', T0(1, 2)], ['Nasdaq', '24.509,76', T0(1, 2) + 1.0]].map(([n, v, t0], i) => (
          <React.Fragment key={n as string}>
            <T x={38} y={86 + i * 100} s={32} wt={700} c="#cfdbec" o={p(t0 as number, 0.3)}>{n as string}</T>
            <T x={830} y={80 + i * 100} w={500} align="right" s={56} wt={800} mono o={p(t0 as number, 0.3)}>{v as string}</T>
            <div style={{position: 'absolute', left: 36, top: 148 + i * 100, width: 800, height: 2, background: P.line}} />
          </React.Fragment>
        ))}
      </Panel>
      <Panel x={110} y={620} w={460} h={310} t0={T0(1, 3)} accent={GRN}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>YÜKSELEN SEKTÖR</T>
        <div style={{position: 'absolute', left: 40, top: 56}}><EChart w={250} h={240} option={donutOpt([{n: 'yükselen', v: 2 * p(T0(1, 3), 0.8), c: GRN}, {n: 'düşen', v: 9 * p(T0(1, 3), 0.8) + 0.001, c: RED}], '2/11')} /></div>
        <T x={300} y={110} w={150} s={22} wt={600} c={P.muted}>temel tüketim ve kamu hizmetleri</T>
      </Panel>
      <Row x={600} y={620} w={600} t0={T0(1, 4)} icon={ico(Cpu, 34)} c={RED} head="SATIŞIN BAŞINDA" text="Nvidia, çip, bellek, veri merkezi" />
      <Row x={600} y={730} w={600} t0={T0(1, 1) + 2.5} icon={ico(Percent, 34)} c={GLD} head="S&P 500" text="Üst üste üçüncü kayıp" />
      <Row x={1230} y={620} w={580} t0={T0(1, 5)} icon={ico(Users, 34)} c={PUR} head="HABERLERE GÖRE" text="Yönetim kurulu Huang'ı geri getirmeyi düşünmüyor" h={202} ts={30} />
      <Source>AP, Reuters • 16 Kasım 2026 kapanışı</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S3 çip kuralı
const S3: React.FC = () => {
  const T0 = mk(paras[2].start); const {p} = useTL();
  const BJ: [number, number] = [116.4, 39.9];
  return (
    <AbsoluteFill>
      <Hdr title="ABD'den Yeni Çip Kuralı" sub="Uzaktan erişim lisansa bağlandı • Ticaret Bakanlığı, 16 Kasım" icon={ico(ShieldAlert)} accent={GLD} />
      <WorldMap w={1130} h={640} x={90} y={215}
        hi={[{id: '156', color: RED, t0: T0(2, 2)}, {id: '360', color: GLD, t0: T0(2, 3)}, {id: '458', color: GLD, t0: T0(2, 3) + 0.3}, {id: '764', color: GLD, t0: T0(2, 3) + 0.6}, {id: '076', color: GLD, t0: T0(2, 3) + 0.9}, {id: '840', color: BLU, t0: T0(2, 1)}]}
        markers={[{lon: -77, lat: 38.9, label: 'Washington', color: BLU, t0: T0(2, 1), dx: 18, dy: -16}, {lon: 116.4, lat: 39.9, label: 'Çin', color: RED, t0: T0(2, 2), dx: -60, dy: -22},
          {lon: 106.8, lat: -6.2, label: 'Endonezya', color: GLD, t0: T0(2, 3), dx: 14, dy: 40}, {lon: 101.7, lat: 3.1, label: 'Malezya', color: GLD, t0: T0(2, 3) + 0.3, dx: -150, dy: 10},
          {lon: 103.8, lat: 1.3, label: 'Singapur', color: GLD, t0: T0(2, 3) + 0.6, dx: 18, dy: 8}, {lon: 100.5, lat: 13.8, label: 'Tayland', color: GLD, t0: T0(2, 3) + 0.9, dx: -130, dy: -6},
          {lon: -46.6, lat: -23.5, label: 'Brezilya', color: GLD, t0: T0(2, 3) + 1.2, dx: 14, dy: -14}]}
        arcs={[{from: [-77, 38.9], to: BJ, color: BLU, t0: T0(2, 1)}, {from: BJ, to: [106.8, -6.2], color: RED, t0: T0(2, 2)}, {from: BJ, to: [101.7, 3.1], color: RED, t0: T0(2, 2) + 0.3}, {from: BJ, to: [100.5, 13.8], color: RED, t0: T0(2, 2) + 0.6}, {from: BJ, to: [-46.6, -23.5], color: RED, t0: T0(2, 2) + 0.9}]} />
      <Row x={1250} y={215} w={560} t0={T0(2, 1)} icon={ico(Lock, 34)} c={GLD} head="YENİ KURAL" text="Uzaktan erişim lisansa bağlandı" />
      <Row x={1250} y={325} w={560} t0={T0(2, 2)} icon={ico(Globe, 34)} c={RED} head="ÇİN MERKEZLİ ŞİRKETLER" text="Yurtdışı veri merkezleriyle izinsiz erişemeyecek" h={108} ts={26} />
      <Row x={1250} y={453} w={560} t0={T0(2, 3)} icon={ico(Building2, 34)} c={GLD} head="LİSANS ŞARTI GELEN 5 ÜLKE" text="Endonezya • Malezya • Singapur • Tayland • Brezilya" h={108} ts={24} />
      <Row x={1250} y={581} w={560} t0={T0(2, 4)} icon={ico(Check, 34)} c={BLU} head="KALDIRILAN" text="Biden dönemi yapay zekâ yayılım kuralı" />
      <Row x={1250} y={691} w={560} t0={T0(2, 5)} icon={ico(CalendarDays, 34)} c={PUR} head="YÜRÜRLÜK" text="Bazı kaynaklara göre 19 Kasım" />
      {[['NVIDIA', '−%4', T0(2, 6)], ['AMD', '−%5', T0(2, 6) + 0.5], ['ASML', '≈ −%2', T0(2, 6) + 1.0]].map(([n, v, t0], i) => (
        <Panel key={n as string} x={110 + i * 400} y={855} w={380} h={92} t0={t0 as number} accent={RED}>
          <T x={34} y={26} s={26} wt={700} c="#cfdbec">{n as string}</T><T x={350} y={20} w={200} align="right" s={44} wt={800} mono c={RED}>{v as string}</T>
        </Panel>
      ))}
      <Source t0={1}>Ticaret Bakanlığı Sanayi ve Güvenlik Bürosu (BIS) • TechCrunch, Bloomberg, TradingKey</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S4 Nvidia beklentileri
const S4: React.FC = () => {
  const T0 = mk(paras[3].start); const {p, count} = useTL();
  const q1 = p(T0(3, 1), 1.0), q2 = p(T0(3, 2), 1.0);
  return (
    <AbsoluteFill>
      <Hdr title="Nvidia Bilançosu: Beklentiler" sub="ABD kapanışından sonra • Kress'in geçici CEO olarak ilk bilançosu" icon={ico(Cpu)} accent={GRN} />
      <Panel x={110} y={200} w={860} h={450} t0={T0(3, 0)} accent={GRN}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>GELİR (MİLYAR $)</T>
        <div style={{position: 'absolute', left: 30, top: 60}}>
          <EChart w={800} h={370} option={{...colBars(['Şirket rehberliği', 'Analist beklentisi'], [{n: 'Gelir', vals: [108, 109.1], c: GRN}], 1, 118, (v) => num(v, 1)), series: [{type: 'bar', barWidth: 120, data: [{value: 108 * q2, itemStyle: {color: {type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{offset: 0, color: '#6b8bb5'}, {offset: 1, color: '#6b8bb555'}]}, borderRadius: [12, 12, 2, 2]}}, {value: 109.1 * q1, itemStyle: {color: {type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{offset: 0, color: GRN}, {offset: 1, color: GRN + '55'}]}, borderRadius: [12, 12, 2, 2], shadowBlur: 30, shadowColor: GRN + '66'}}], label: {show: true, position: 'top', formatter: (pp: any) => (pp.dataIndex === 0 ? '≈108' : '≈109,1'), color: '#fff', fontSize: 34, fontWeight: 800, fontFamily: MONO}}], yAxis: {type: 'value', min: 90, max: 114, show: false}}} />
        </div>
      </Panel>
      <Big x={1000} y={200} w={380} h={215} label="HİSSE BAŞI KÂR (BEKLENTİ)" value={'$' + num(2.48 * p(T0(3, 1) + 1.5, 0.8), 2)} c={GRN} t0={T0(3, 1) + 1.5} vs={70} />
      <Big x={1410} y={200} w={400} h={215} label="BRÜT MARJ REHBERLİĞİ" value="%74" sub="önceki çeyrek %75" c={GLD} t0={T0(3, 3)} vs={78} />
      <Panel x={1000} y={440} w={810} h={210} t0={T0(3, 4)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>SON DÖRT ÇEYREK</T>
        <T x={34} y={56} s={36} wt={700} w={500}>Beklentiyi dört kez aştı</T>
        {[0, 1, 2, 3].map((i) => <div key={i} style={{position: 'absolute', left: 540 + i * 62, top: 62, width: 50, height: 50, borderRadius: 14, background: `${GRN}30`, border: `1px solid ${GRN}`, color: GRN, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: p(T0(3, 4) + 0.3 + i * 0.35, 0.2)}}>{ico(Check, 30)}</div>)}
        <T x={34} y={130} s={24} wt={500} c={P.muted} w={760}>Rehberlik 108 milyar $ (artı eksi %2), beklenti bu bandın tepesinde</T>
      </Panel>
      <Row x={110} y={690} w={860} t0={T0(3, 5)} icon={ico(TrendingDown, 34)} c={RED} head="HİSSE" text="Son bir haftada yaklaşık %12,5 değer kaybı" />
      <Row x={1000} y={690} w={810} t0={T0(3, 5) + 1.0} icon={ico(Crown, 34)} c={PUR} head="LİDERLİK" text="Colette Kress'in geçici CEO olarak ilk bilançosu" />
      <Row x={110} y={800} w={1700} t0={T0(3, 0)} icon={ico(Clock, 34)} c={GLD} head="SONUÇLAR" text="ABD kapanışından sonra, Türkiye saatiyle gece yarısından hemen sonra (00.20)" ts={30} />
      <Source>LSEG, Zacks, SpotGamma ve şirket rehberliği • Nvidia 8-K bildirimleri</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S5 Fed
const S5: React.FC = () => {
  const T0 = mk(paras[4].start); const {p} = useTL();
  const q = p(T0(4, 3), 1.4);
  return (
    <AbsoluteFill>
      <Hdr title="Fed: Warsh Konuşması" sub="San Francisco • Üretkenlik ve İstihdam Görev Gücü konferansı" icon={ico(Landmark)} accent={BLU} />
      <Panel x={110} y={200} w={760} h={500} t0={T0(4, 3) - 0.3} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>ARALIKTA +25 BP ARTIŞ İHTİMALİ (CME)</T>
        <div style={{position: 'absolute', left: 80, top: 70}}><EChart w={600} h={400} option={gaugeOpt(95 * q, 100, RED, '%' + Math.round(95 * q), 88)} /></div>
        <T x={34} y={420} s={24} wt={500} c={P.muted} w={690} o={p(T0(4, 4), 0.3)}>Son artış eylülde yapılmıştı</T>
      </Panel>
      <Panel x={900} y={200} w={910} h={230} t0={T0(4, 0)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>KEVIN WARSH • DÜN</T>
        <T x={34} y={58} s={40} wt={800} w={840}>Faiz konusunda tek söz etmedi</T>
        <T x={34} y={118} s={30} wt={500} c="#cfdbec" w={840} o={p(T0(4, 1), 0.3)}>Yapay zekânın ekonomiyi nasıl değiştirebileceğini anlattı, Fed'in bununla ilgili senaryolar çalıştığını söyledi.</T>
      </Panel>
      <Panel x={900} y={460} w={910} h={240} t0={T0(4, 2)} accent={GRN}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>TAHVİL FAİZLERİ (KONUŞMA SONRASI GERİLEDİ)</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={870} h={170} option={hbar([{n: '2 yıllık', v: 4.82, txt: '%4,82', c: GRN, q: p(T0(4, 2), 0.9)}, {n: '10 yıllık', v: 5.13, txt: '%5,13', c: GLD, q: p(T0(4, 2) + 0.6, 0.9)}], 0, 6.2, {left: 170, right: 140, bw: 40})} /></div>
      </Panel>
      <Row x={110} y={740} w={860} t0={T0(4, 5)} icon={ico(Gauge, 34)} c={GLD} head="EKİM TOPLANTISI" text="Faiz 10'a 2 oyla sabit bırakıldı" />
      <Row x={1000} y={740} w={810} t0={T0(4, 5) + 1.2} icon={ico(CalendarDays, 34)} c={PUR} head="TUTANAKLAR" text="Yarın akşam 22.00 (Türkiye saatiyle)" />
      <Source>AP, CME FedWatch, Newsquawk • 16–17 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S6 ABD verisi + Home Depot
const S6: React.FC = () => {
  const T0 = mk(paras[5].start); const {p} = useTL();
  const items = [{n: 'Toplam', v: 0.2, txt: '+%0,2', t: T0(5, 1)}, {n: 'Çekirdek', v: 0.6, txt: '+%0,6', t: T0(5, 2)}, {n: 'Otomobil', v: -1.6, txt: '−%1,6', t: T0(5, 3)}, {n: 'Mobilya', v: -2.3, txt: '−%2,3', t: T0(5, 3) + 1.2}, {n: 'İnternet', v: 1.2, txt: '+%1,2', t: T0(5, 3) + 2.4}];
  return (
    <AbsoluteFill>
      <Hdr title="ABD Tüketicisi ve Home Depot" sub="Ekim perakende satışları • üçüncü çeyrek sonuçları" icon={ico(ShoppingCart)} accent={GRN} />
      <Panel x={110} y={200} w={920} h={500} t0={T0(5, 0)} accent={GRN}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>PERAKENDE SATIŞLAR • AYLIK DEĞİŞİM</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={880} h={420} option={hbar(items.map((i) => ({n: i.n, v: i.v, txt: i.txt, q: p(i.t, 0.9)})), -3, 1.8, {left: 180, right: 160, bw: 50})} /></div>
      </Panel>
      <Big x={1060} y={200} w={360} h={215} label="YILLIK SATIŞ" value="+%6,8" c={GRN} t0={T0(5, 4)} vs={70} />
      <Panel x={1450} y={200} w={360} h={215} t0={T0(5, 1)} accent={BLU}>
        <T x={34} y={22} s={20} wt={700} c={P.muted} ls={2}>BEKLENTİ</T>
        <T x={34} y={56} s={26} wt={600} c="#cfdbec" w={300}>Toplam ≈%0,2</T><T x={34} y={96} s={26} wt={600} c="#cfdbec" w={300}>Çekirdek %0,4</T>
        <T x={34} y={146} s={24} wt={700} c={GRN} w={300}>çekirdek beklentinin üstünde</T>
      </Panel>
      <Panel x={1060} y={440} w={750} h={260} t0={T0(5, 5)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>HOME DEPOT • 3. ÇEYREK</T>
        {[['Hisse başı kâr', '$3,86', T0(5, 6)], ['Gelir', '$43,4 mlr', T0(5, 6) + 0.9]].map(([n, v, t0], i) => (
          <React.Fragment key={n as string}><T x={36} y={66 + i * 70} s={28} wt={600} c="#cfdbec" o={p(t0 as number, 0.3)}>{n as string}</T><T x={720} y={58 + i * 70} w={400} align="right" s={44} wt={800} mono c="#fff" o={p(t0 as number, 0.3)}>{v as string}</T></React.Fragment>
        ))}
        <T x={36} y={210} s={26} wt={700} c={GRN} o={p(T0(5, 6) + 1.8, 0.3)}>ikisi de beklentinin üstünde</T>
      </Panel>
      <Row x={110} y={730} w={920} t0={T0(5, 7)} icon={ico(TrendingDown, 34)} c={RED} head="YILLIK KÂR BÜYÜMESİ TAHMİNİ" text="≈%2'ye çekildi • hisse %2–3 düştü" />
      <Row x={1060} y={730} w={750} t0={T0(5, 8)} icon={ico(Crown, 34)} c={PUR} head="YENİ CEO" text="Richard McPhail (mali işlerden sorumlu)" />
      <Source>Census Bureau (Reuters), CNBC, Benzinga • 17 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S7 Asya
const S7: React.FC = () => {
  const T0 = mk(paras[6].start); const {p} = useTL();
  const rows = [{n: 'Nikkei', v: -1.34, txt: '−%1,34', t: T0(6, 1)}, {n: 'Topix', v: -1.57, txt: '−%1,57', t: T0(6, 2)}, {n: 'Kospi', v: -2.59, txt: '−%2,59', t: T0(6, 3)}, {n: 'Hang Seng', v: -1.0, txt: '−%1,0', t: T0(6, 4)}, {n: 'Şanghay', v: -0.5, txt: '−%0,5', t: T0(6, 4) + 1.0}];
  return (
    <AbsoluteFill>
      <Hdr title="Asya: Çip Satışı" sub="Çip kuralı ve Nvidia belirsizliği birlikte fiyatlandı" icon={ico(Globe)} accent={RED} />
      <WorldMap w={1150} h={720} x={80} y={200} focus={{c: [124, 34], k: 3.4}}
        hi={[{id: '392', color: RED, t0: T0(6, 1)}, {id: '410', color: RED, t0: T0(6, 3)}, {id: '156', color: GLD, t0: T0(6, 4)}]}
        markers={[{lon: 139.7, lat: 35.7, label: 'Tokyo', value: '−%1,34', color: RED, t0: T0(6, 1), dx: 22, dy: -6}, {lon: 126.9, lat: 37.5, label: 'Seul', value: '−%2,59', color: RED, t0: T0(6, 3), dx: -190, dy: -10},
          {lon: 114.2, lat: 22.3, label: 'Hong Kong', value: '−%1,0', color: GLD, t0: T0(6, 4), dx: -40, dy: 60}, {lon: 121.5, lat: 31.2, label: 'Şanghay', value: '−%0,5', color: GLD, t0: T0(6, 4) + 1.0, dx: 22, dy: 40}]} />
      <Panel x={1260} y={200} w={550} h={430} t0={T0(6, 1)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>GÜNLÜK DEĞİŞİM</T>
        <div style={{position: 'absolute', left: 14, top: 56}}><EChart w={520} h={350} option={hbar(rows.map((r) => ({n: r.n, v: r.v, txt: r.txt, q: p(r.t, 0.9)})), -3.2, 0.2, {left: 150, right: 140, fs: 22, bw: 38})} /></div>
      </Panel>
      <Panel x={1260} y={660} w={550} h={260} t0={T0(6, 3)} accent={BLU}>
        <T x={34} y={18} s={20} wt={700} c={P.muted} ls={2}>KAPANIŞ SEVİYELERİ</T>
        {[['Nikkei', '58.860'], ['Kospi', '4.968'], ['Hang Seng', '23.508'], ['Şanghay', '3.584']].map(([n, v], i) => (
          <React.Fragment key={n}><T x={36} y={56 + i * 48} s={24} wt={600} c="#cfdbec" o={p(T0(6, 1) + i * 1.5, 0.3)}>{n}</T><T x={510} y={52 + i * 48} w={300} align="right" s={30} wt={800} mono o={p(T0(6, 1) + i * 1.5, 0.3)}>{v}</T></React.Fragment>
        ))}
      </Panel>
      <Source>FXStreet, Yahoo Finance • 17 Kasım 2026 kapanış</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S8 Avrupa + Deutsche Bank
const S8: React.FC = () => {
  const T0 = mk(paras[7].start); const {p} = useTL();
  const rows = [{n: 'Stoxx 600', v: -0.7, txt: '−%0,7', t: T0(7, 1)}, {n: 'DAX', v: -0.9, txt: '−%0,9', t: T0(7, 2)}, {n: 'CAC 40', v: -0.5, txt: '−%0,5', t: T0(7, 2) + 1.0}];
  return (
    <AbsoluteFill>
      <Hdr title="Avrupa ve Deutsche Bank" sub="Öğle saatleri • rekorların altında" icon={ico(Building2)} accent={RED} />
      <Panel x={110} y={200} w={700} h={360} t0={T0(7, 0)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>GÜN İÇİ DEĞİŞİM</T>
        <div style={{position: 'absolute', left: 14, top: 56}}><EChart w={670} h={290} option={hbar(rows.map((r) => ({n: r.n, v: r.v, txt: r.txt, q: p(r.t, 0.9)})), -1.2, 0.1, {left: 170, right: 150, bw: 48})} /></div>
      </Panel>
      <Panel x={110} y={590} w={700} h={340} t0={T0(7, 1)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>SEVİYELER</T>
        {[['Stoxx 600', '657', T0(7, 1)], ['DAX', '26.378', T0(7, 2)], ['CAC 40', '8.312', T0(7, 2) + 1.0]].map(([n, v, t0], i) => (
          <React.Fragment key={n as string}><T x={38} y={78 + i * 80} s={30} wt={600} c="#cfdbec" o={p(t0 as number, 0.3)}>{n as string}</T><T x={670} y={70 + i * 80} w={400} align="right" s={50} wt={800} mono o={p(t0 as number, 0.3)}>{v as string}</T></React.Fragment>
        ))}
      </Panel>
      <Panel x={840} y={200} w={970} h={160} t0={T0(7, 3)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>DEUTSCHE BANK • GÜN İÇİ</T>
        <T x={34} y={52} s={86} wt={800} mono c={RED} glow={RED} ls={-3}>−%4 / −%6</T>
        <T x={700} y={96} w={240} s={24} wt={600} c={P.muted}>hisse düşüşü</T>
      </Panel>
      <Row x={840} y={385} w={970} t0={T0(7, 4)} icon={ico(Receipt, 34)} c={BLU} head="HABERLER" text="NYT ve FT: sızdırılan ≈15 milyon belgeye dayanıyor" ts={27} />
      <Row x={840} y={490} w={970} t0={T0(7, 5)} icon={ico(Users, 34)} c={GLD} head="KONULAR" text="Epstein bağlantılı ödemeler • Rusya • Trump'ın vergi belgeleri" ts={26} />
      <Row x={840} y={595} w={970} t0={T0(7, 6)} icon={ico(Clock, 34)} c={PUR} head="BANKANIN YANITI" text="Olaylar eski, bazıları 20 yıl öncesine dayanıyor" ts={27} />
      <Row x={840} y={700} w={970} t0={T0(7, 7)} icon={ico(Banknote, 34)} c={GRN} head="FİNANS DİREKTÖRÜ" text="Mali etki az olacak ya da hiç olmayacak" ts={27} />
      <Row x={840} y={805} w={970} t0={T0(7, 8)} icon={ico(TriangleAlert, 34)} c={RED} head="DOĞRULAMA" text="Reuters bağımsız olarak doğrulayamadı • FT yeni haber duyurdu" ts={26} />
      <Source>Reuters, Investing.com, Business Standard • 17 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S9 Anthropic
const S9: React.FC = () => {
  const T0 = mk(paras[8].start); const {p} = useTL();
  const rq = p(T0(8, 1), 1.0);
  return (
    <AbsoluteFill>
      <Hdr title="Anthropic Halka Arzı" sub="Fiyatlama yarın akşam • işlem perşembe, Nasdaq: ANT" icon={ico(Rocket)} accent={PUR} />
      <Panel x={110} y={200} w={900} h={300} t0={T0(8, 1)} accent={PUR}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>FİYAT ARALIĞI (HİSSE BAŞI)</T>
        <T x={34} y={56} s={92} wt={800} mono c="#fff" glow={PUR} ls={-3}>$70 – $78</T>
        <div style={{position: 'absolute', left: 38, top: 190, width: 820, height: 16, borderRadius: 8, background: 'rgba(255,255,255,.08)'}} />
        <div style={{position: 'absolute', left: 38 + 820 * 0.15, top: 190, width: 820 * 0.7 * rq, height: 16, borderRadius: 8, background: `linear-gradient(90deg, ${PUR}, #c4b0ff)`, boxShadow: `0 0 26px ${PUR}`}} />
        <T x={38} y={222} s={24} wt={700} mono c={P.muted}>$70</T><T x={858} y={222} w={200} align="right" s={24} wt={700} mono c={P.muted}>$78</T>
        <T x={300} y={236} s={24} wt={600} c="#cfdbec" w={500} o={p(T0(8, 1) + 1, 0.3)}>825 milyon hisse arz ediliyor</T>
      </Panel>
      <Big x={1040} y={200} w={380} h={300} label="TEMEL ARZ" value="$64 mlr" sub="üst banda göre • + $26 mlr özel plasman" c={GLD} t0={T0(8, 2)} vs={66} icon={ico(Coins, 36)} />
      <Big x={1450} y={200} w={360} h={300} label="DEĞERLEME" value="$1,02–1,4 trilyon" sub="yönteme göre değişiyor" c={BLU} t0={T0(8, 3)} vs={40} icon={ico(ChartColumn, 36)} />
      <Panel x={110} y={530} w={1000} h={400} t0={T0(8, 0)} accent={GRN}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>TAKVİM</T>
        {[{d: 'ÇARŞAMBA', t: 'Yarın akşam: fiyatlama', c: GLD, t0: T0(8, 0)}, {d: 'PERŞEMBE', t: 'Nasdaq\'ta işlem başlıyor: ANT', c: GRN, t0: T0(8, 4)}].map((e, i) => (
          <React.Fragment key={e.d}>
            <div style={{position: 'absolute', left: 60, top: 110 + i * 130, width: 30, height: 30, borderRadius: '50%', background: e.c, boxShadow: `0 0 24px ${e.c}`, opacity: p(e.t0, 0.3)}} />
            {i === 0 && <div style={{position: 'absolute', left: 73, top: 140, width: 4, height: 100 * p(T0(8, 4) - 0.5, 0.6), background: `linear-gradient(180deg, ${GLD}, ${GRN})`}} />}
            <T x={120} y={92 + i * 130} s={26} wt={800} c={e.c} ls={2} o={p(e.t0, 0.3)}>{e.d}</T>
            <T x={120} y={130 + i * 130} s={36} wt={700} o={p(e.t0 + 0.1, 0.3)}>{e.t}</T>
          </React.Fragment>
        ))}
      </Panel>
      <Panel x={1140} y={530} w={670} h={400} t0={T0(8, 5)} accent={PUR}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>BİREYSEL YATIRIMCI PAYI</T>
        <div style={{position: 'absolute', left: 40, top: 70}}><EChart w={300} h={300} option={donutOpt([{n: 'bireysel', v: 20 * p(T0(8, 5), 0.9), c: PUR}, {n: 'diğer', v: 80 * p(T0(8, 5), 0.9) + 0.001, c: '#1d3558'}], '%20')} /></div>
        <T x={360} y={130} w={280} s={30} wt={700}>yüzdeye kadar bireysel tahsis</T>
      </Panel>
      <Source>CNBC, TechCrunch • S-1/A bilgileri • değerleme farkı: tam seyreltilmiş ve mevcut hisse sayısı yöntemleri</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S10 petrol / jeopolitik
const S10: React.FC = () => {
  const T0 = mk(paras[9].start); const {p} = useTL();
  const q = p(T0(9, 0), 1.6);
  return (
    <AbsoluteFill>
      <Hdr title="Petrol ve Jeopolitik" sub="Brent düşüşte • İran'ın Bahreyn saldırısı • perşembe üçlü zirve" icon={ico(Flame)} accent={GLD} />
      <Panel x={110} y={200} w={760} h={400} t0={T0(9, 0)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>BRENT ($)</T>
        <div style={{position: 'absolute', left: 14, top: 40}}>
          <EChart w={730} h={340} option={lineOpt(['13 Kasım', '16 Kasım'], [95.84, 92.44], q, 84, 100, GLD, (v) => num(v, 2))} />
        </div>
      </Panel>
      <Row x={110} y={625} w={760} t0={T0(9, 0) + 0.8} icon={ico(TrendingDown, 34)} c={RED} head="PAZARTESİ" text="Brent yüzde 3,5 düşüp ≈92 $ civarına geldi" />
      <Row x={110} y={730} w={760} t0={T0(9, 1)} icon={ico(Landmark, 34)} c={BLU} head="GOLDMAN SACHS" text="Arz fazlası uyarısı • 2027 ortalaması 88 $" />
      <Row x={110} y={835} w={760} t0={T0(9, 4)} icon={ico(Users, 34)} c={GRN} head="MÜZAKERE" text="İran, Oman ve Katar arabuluculuğunda sürüyor" />
      <WorldMap w={960} h={640} x={900} y={200} focus={{c: [82, 32], k: 2.6}}
        hi={[{id: '364', color: RED, t0: T0(9, 2)}, {id: '048', color: BLU, t0: T0(9, 2) + 0.6}, {id: '156', color: GLD, t0: T0(9, 5)}]}
        markers={[{lon: 50.5, lat: 26.0, label: 'Bahreyn', value: 'saldırı önlendi', color: RED, t0: T0(9, 2), dx: -250, dy: -70}, {lon: 58.4, lat: 23.6, label: 'Umman', color: BLU, t0: T0(9, 4), dx: 14, dy: 42}, {lon: 51.5, lat: 25.3, label: 'Katar', color: BLU, t0: T0(9, 4) + 0.5, dx: -90, dy: 56},
          {lon: 114.1, lat: 22.6, label: 'Şincen', value: '19 Kasım', color: GLD, t0: T0(9, 5), dx: -150, dy: 54}]}
        arcs={[{from: [50.5, 26.0], to: [114.1, 22.6], color: GLD, t0: T0(9, 5)}]} />
      <Panel x={1330} y={810} w={480} h={110} t0={T0(9, 3)} accent={BLU}>
        <T x={32} y={20} s={19} wt={700} c={P.muted} ls={1.5}>ABD MERKEZ KUVVETLER KOMUTANLIĞI</T><T x={32} y={52} s={28} wt={700} w={430}>Tüm dronlar durduruldu</T>
      </Panel>
      <Source>Reuters, Fox News, Military.com • Brent: EnergyNow, Goldman Sachs</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S11 altın / dolar / bitcoin
const S11: React.FC = () => {
  const T0 = mk(paras[10].start); const {p} = useTL();
  return (
    <AbsoluteFill>
      <Hdr title="Altın, Dolar ve Bitcoin" sub="Altın bir yılın dibinde • dolar 19 ayın zirvesinde" icon={ico(Coins)} accent={GLD} />
      <div style={{position: 'absolute', left: 70, top: 200, opacity: p(0.2, 0.6)}}><GoldScene width={860} height={560} /></div>
      <Panel x={110} y={760} w={820} h={170} t0={T0(10, 0)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>ONS ALTIN</T>
        <T x={34} y={52} s={68} wt={800} mono c={GLD} glow={GLD} ls={-2}>3.855–3.885 $</T>
        <T x={34} y={128} s={24} wt={700} c={RED}>bir yılın en düşük seviyesi</T>
      </Panel>
      <Panel x={960} y={200} w={850} h={290} t0={T0(10, 1)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>DOLAR ENDEKSİ • 10 YILLIK TAHVİL</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={400} h={220} option={gaugeOpt(103.5 * p(T0(10, 1), 1.2), 110, BLU, num(103.5 * p(T0(10, 1), 1.2), 1), 44)} /></div>
        <T x={440} y={80} s={26} wt={700} c="#cfdbec" w={380}>19 ayın zirvesi</T>
        <T x={440} y={130} s={56} wt={800} mono c="#fff" o={p(T0(10, 1) + 1, 0.3)}>%5,13</T><T x={440} y={200} s={24} wt={500} c={P.muted} w={380} o={p(T0(10, 1) + 1, 0.3)}>10 yıllık tahvil faizi</T>
      </Panel>
      <Panel x={960} y={520} w={850} h={410} t0={T0(10, 2)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>BİTCOİN: 64–65 BİN $ • ABD SPOT FONLARI (MİLYAR $)</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={810} h={340} option={colBars(['2–6 Kasım', '9–13 Kasım', 'Kasım toplam'], [{n: 'Net çıkış', vals: [1.28, 1.065, 2.1], c: RED}], p(T0(10, 3), 1.0), 2.8, (v) => '−' + num(v, 2))} /></div>
      </Panel>
      <Source>FinanceFeeds, Foreks • SoSoValue, Farside, Decrypt • 17 Kasım 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S12 BIST
const S12: React.FC = () => {
  const T0 = mk(paras[11].start); const {p, count} = useTL();
  const q = p(T0(11, 0), 2.6);
  return (
    <AbsoluteFill>
      <Hdr title="Borsa İstanbul ve Piyasalar" sub="BIST 100 öğle saatlerinde düşüşte • dolar, gram altın, akaryakıt" icon={ico(ChartColumn)} accent={GLD} />
      <Panel x={110} y={200} w={980} h={410} t0={T0(11, 0)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>BIST 100</T>
        <div style={{position: 'absolute', left: 14, top: 40}}>
          <EChart w={950} h={350} option={lineOpt(['Dün kapanış', 'Bugün açılış', 'Öğle'], [11841.81, 11827.83, 11741.06], q, 11690, 11880, GLD, (v) => v.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}))} />
        </div>
      </Panel>
      <Panel x={1120} y={200} w={690} h={410} t0={T0(11, 2)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>ÖĞLE • ENDEKSTEKİ 100 HİSSE</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={300} h={300} option={donutOpt([{n: 'düşen', v: 73 * p(T0(11, 2), 0.9), c: RED}, {n: 'diğer', v: 27 * p(T0(11, 2), 0.9) + 0.001, c: GRN}], '73')} /></div>
        <T x={350} y={110} w={310} s={30} wt={700}>yüz hissenin yetmiş üçü düşüyordu</T>
        <T x={350} y={220} w={310} s={26} wt={600} c={RED}>öğle: −%0,85</T>
      </Panel>
      <Big x={110} y={640} w={400} h={180} label="DOLAR / TL" value="50,42" c={BLU} t0={T0(11, 3)} vs={70} />
      <Big x={540} y={640} w={400} h={180} label="GRAM ALTIN" value="≈6.269 ₺" c={GLD} t0={T0(11, 3) + 0.9} vs={54} />
      <Panel x={970} y={640} w={840} h={290} t0={T0(11, 4)} accent={GRN}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>AKARYAKIT • İSTANBUL AVRUPA YAKASI</T>
        <T x={34} y={56} s={26} wt={600} c="#cfdbec">Benzin</T><T x={400} y={46} w={300} align="right" s={52} wt={800} mono o={p(T0(11, 5), 0.3)}>71,20 ₺</T>
        <T x={34} y={130} s={26} wt={600} c="#cfdbec">Motorin</T><T x={400} y={120} w={300} align="right" s={52} wt={800} mono o={p(T0(11, 5) + 0.8, 0.3)}>95,20 ₺</T>
        <T x={34} y={214} s={24} wt={600} c={GRN} w={780} o={p(T0(11, 6), 0.3)}>Benzine 6 Kasım'da ≈6 ₺, 12 Kasım'da 3,40 ₺ indirim gelmişti</T>
      </Panel>
      <Row x={110} y={850} w={830} t0={T0(11, 4)} icon={ico(Fuel, 34)} c={GRN} head="AKARYAKIT" text="Bugün yeni zam ya da indirim yok" h={80} ts={26} />
      <Source>AA, Capital, Diken, Yeniçağ, Habertürk • 17 Kasım 2026 öğle saatleri</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S13 bütçe
const S13: React.FC = () => {
  const T0 = mk(paras[12].start); const {p} = useTL();
  return (
    <AbsoluteFill>
      <Hdr title="Merkezi Yönetim Bütçesi" sub="Ekim ayı • Hazine ve Maliye Bakanlığı" icon={ico(Receipt)} accent={RED} />
      <Panel x={110} y={200} w={820} h={470} t0={T0(12, 1)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>EKİM AYI BÜTÇE AÇIĞI (MİLYAR TL)</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={780} h={400} option={colBars(['Ekim 2025', 'Ekim 2026'], [{n: 'Açık', vals: [223.2, 481.1], c: RED}], p(T0(12, 1), 1.0), 560, (v) => num(v, 1))} /></div>
      </Panel>
      <Panel x={960} y={200} w={850} h={470} t0={T0(12, 2)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>EKİM 2026 • GELİR VE GİDER (MİLYAR TL)</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={810} h={400} option={colBars(['Gelir (+%13,2)', 'Gider (+%29,9)'], [{n: 'Tutar', vals: [1298, 1779], c: BLU}], p(T0(12, 2), 1.0), 2100, (v) => v.toLocaleString('tr-TR'))} /></div>
      </Panel>
      <Big x={110} y={700} w={560} h={230} label="OCAK–EKİM BÜTÇE AÇIĞI" value="2,321 trilyon ₺" c={RED} t0={T0(12, 4)} vs={50} />
      <Big x={700} y={700} w={560} h={230} label="OCAK–EKİM FAİZ DIŞI" value="+231 milyar ₺" sub="faiz dışı fazla" c={GRN} t0={T0(12, 4) + 1.0} vs={52} />
      <Row x={1290} y={700} w={520} t0={T0(12, 1) + 2.0} icon={ico(Wallet, 34)} c={GLD} head="GEÇEN YILA GÖRE" text="Ekim açığı iki katına yakın" h={110} ts={28} />
      <Source>Hazine ve Maliye Bakanlığı, Akbank değerlendirmesi • Ekim 2026 verileri</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S14 konut
const S14: React.FC = () => {
  const T0 = mk(paras[13].start); const {p} = useTL();
  const rows = [{n: 'Konut (nominal)', v: 21.1, txt: '+%21,1', t: T0(13, 1)}, {n: 'Konut (reel)', v: -6.6, txt: '−%6,6', t: T0(13, 2)}, {n: 'Kira (nominal)', v: 24.5, txt: '+%24,5', t: T0(13, 4)}, {n: 'Kira (reel)', v: -4.1, txt: '−%4,1', t: T0(13, 4) + 1.2}];
  const city = [{n: 'İstanbul', v: 1.1, txt: '+%1,1', t: T0(13, 3)}, {n: 'Ankara', v: 1.6, txt: '+%1,6', t: T0(13, 3) + 0.8}, {n: 'İzmir', v: -0.6, txt: '−%0,6', t: T0(13, 3) + 1.6}];
  return (
    <AbsoluteFill>
      <Hdr title="Konut Fiyatları ve Kira" sub="TCMB Konut Fiyat Endeksi • ekim 2026" icon={ico(Home)} accent={GRN} />
      <Panel x={110} y={200} w={980} h={430} t0={T0(13, 1)} accent={GRN}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>YILLIK DEĞİŞİM</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={940} h={350} option={hbar(rows.map((r) => ({n: r.n, v: r.v, txt: r.txt, q: p(r.t, 0.9)})), -9, 29, {left: 260, right: 130, bw: 50})} /></div>
      </Panel>
      <Panel x={1120} y={200} w={690} h={430} t0={T0(13, 3)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>AYLIK DEĞİŞİM • ŞEHİRLER</T>
        <div style={{position: 'absolute', left: 14, top: 56}}><EChart w={660} h={350} option={hbar(city.map((r) => ({n: r.n, v: r.v, txt: r.txt, q: p(r.t, 0.9)})), -1.2, 2.2, {left: 170, right: 110, bw: 50})} /></div>
      </Panel>
      <Big x={110} y={660} w={500} h={250} label="KONUT FİYAT ENDEKSİ • AYLIK" value="+%0,7" sub="endeks 240,9 (2023 = 100)" c={GLD} t0={T0(13, 1)} vs={80} />
      <Panel x={640} y={660} w={1170} h={250} t0={T0(13, 2) + 0.4} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>ENFLASYONDAN ARINDIRILMIŞ</T>
        <T x={34} y={56} s={44} wt={800} w={1100}>Konut yıllık %6,6 geriledi, yeni kiracı kirası %4,1 geriledi</T>
        <T x={34} y={130} s={28} wt={500} c="#cfdbec" w={1100} o={p(T0(13, 4) + 1.6, 0.3)}>Nominal artışlar enflasyonun altında kaldı</T>
      </Panel>
      <Source>TCMB Konut Fiyat Endeksi, Yeni Kiracı Kira Endeksi • Ekim 2026</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S15 enflasyon / rezerv / asgari ücret
const S15: React.FC = () => {
  const T0 = mk(paras[14].start); const {p} = useTL();
  return (
    <AbsoluteFill>
      <Hdr title="Enflasyon, Rezerv ve Asgari Ücret" sub="Merkez Bankası Enflasyon Raporu • 2027 asgari ücret takvimi" icon={ico(Gauge)} accent={GLD} />
      <Panel x={110} y={200} w={600} h={420} t0={T0(14, 0)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>TCMB YIL SONU ENFLASYON TAHMİNİ (%)</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={560} h={340} option={colBars(['2026', '2027'], [{n: 'Tahmin', vals: [29.5, 21], c: GLD}], p(T0(14, 0), 1.0), 36, (v) => '%' + num(v, 1))} /></div>
      </Panel>
      <Panel x={740} y={200} w={600} h={420} t0={T0(14, 1)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>BRÜT REZERV KAYBI (MİLYAR $)</T>
        <div style={{position: 'absolute', left: 20, top: 56}}><EChart w={560} h={340} option={colBars(['Toplam kayıp', 'Altın fiyatı etkisi'], [{n: 'Kayıp', vals: [49, 28], c: RED}], p(T0(14, 1), 1.0), 58, (v) => num(v, 0))} /></div>
      </Panel>
      <Panel x={1370} y={200} w={440} h={420} t0={T0(14, 2)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>KASIM ENFLASYONU</T>
        <div style={{position: 'absolute', left: 34, top: 90, width: 90, height: 90, borderRadius: 24, background: `${BLU}26`, border: `1px solid ${BLU}`, color: BLU, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ico(CalendarDays, 50)}</div>
        <T x={34} y={210} s={64} wt={800} mono c="#fff" glow={BLU}>3 Aralık</T>
        <T x={34} y={300} s={26} wt={500} c={P.muted} w={380}>açıklanacak; asgari ücret komisyonu aralıkta toplanacak</T>
      </Panel>
      <Panel x={110} y={650} w={1700} h={280} t0={T0(14, 3)} accent={PUR}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>2027 ASGARİ ÜCRET • GAZETELERDEKİ ZAM SENARYOLARI (NET, ₺)</T>
        {[{l: 'Şu anki net', v: 28075.5, w: 0.72, c: '#6b8bb5', t0: T0(14, 5), lab: '28.075,50'}, {l: '%25 zam', v: 35094, w: 0.9, c: PUR, t0: T0(14, 3), lab: '35.094'}, {l: '%35 zam', v: 37902, w: 0.97, c: '#b794ff', t0: T0(14, 3) + 0.8, lab: '37.902'}].map((r, i) => (
          <React.Fragment key={r.l}>
            <T x={34} y={68 + i * 62} s={26} wt={700} c="#cfdbec" o={p(r.t0, 0.3)}>{r.l}</T>
            <div style={{position: 'absolute', left: 250, top: 70 + i * 62, width: 1100 * r.w * p(r.t0, 0.9), height: 40, borderRadius: 20, background: `linear-gradient(90deg, ${r.c}88, ${r.c})`, boxShadow: `0 0 28px ${r.c}66`}} />
            <T x={1380} y={64 + i * 62} s={34} wt={800} mono c="#fff" o={p(r.t0 + 0.6, 0.3)}>{r.lab}</T>
          </React.Fragment>
        ))}
      </Panel>
      <Stamp x={1250} y={640} t0={T0(14, 4)} c={RED} s={34} rot={-4}>RESMÎ DEĞİL</Stamp>
      <Source>TCMB Enflasyon Raporu (12 Kasım), Çalışma Bakanlığı, gazete senaryoları • hesap: 28.075,50 × 1,25 ve × 1,35</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S16 takvim
const S16: React.FC = () => {
  const T0 = mk(paras[15].start); const {p} = useTL();
  const cols = [
    {d: 'SALI • BU AKŞAM', c: RED, t: T0(15, 1), items: [[Cpu, 'Nvidia bilançosu', '00.20 (Türkiye saati)']]},
    {d: 'ÇARŞAMBA', c: PUR, t: T0(15, 2), items: [[Landmark, 'Fed ekim tutanakları', '22.00'], [Rocket, 'Anthropic halka arz fiyatlaması', 'akşam']]},
    {d: 'PERŞEMBE', c: BLU, t: T0(15, 3), items: [[Users, 'ABD işsizlik başvuruları ve Philadelphia Fed', ''], [Rocket, 'Anthropic: Nasdaq\'ta işlem (ANT)', ''], [Globe, 'Trump–Şi–Putin zirvesi, Şincen', ''], [Landmark, 'TCMB rezerv verileri', '14.30']]},
  ];
  return (
    <AbsoluteFill>
      <Hdr title="Bu Haftanın Takvimi" sub="Piyasaları hareketlendirebilecek gelişmeler" icon={ico(CalendarDays)} accent={BLU} />
      {cols.map((c, i) => (
        <Panel key={c.d} x={110 + i * 580} y={200} w={560} h={730} t0={c.t} accent={c.c}>
          <T x={34} y={28} s={30} wt={800} c={c.c} ls={2}>{c.d}</T>
          <div style={{position: 'absolute', left: 34, top: 80, width: 490, height: 2, background: P.line}} />
          {c.items.map(([I, tx, sub], j) => (
            <div key={j} style={{position: 'absolute', left: 34, top: 108 + j * 150, width: 500, opacity: p(c.t + 0.3 + j * 0.45, 0.3)}}>
              <div style={{position: 'absolute', left: 0, top: 0, width: 64, height: 64, borderRadius: 18, background: `${c.c}26`, border: `1px solid ${c.c}88`, color: c.c, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ico(I as any, 34)}</div>
              <T x={88} y={0} w={410} s={28} wt={700}>{tx as string}</T>
              {sub && <T x={88} y={(tx as string).length > 24 ? 70 : 40} s={24} wt={600} mono c={c.c}>{sub as string}</T>}
            </div>
          ))}
        </Panel>
      ))}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S17 kapanış tablosu (ısı haritası)
type Tile = {n: string; v: string; ch?: number; chTxt?: string; t: number};
const S17: React.FC = () => {
  const T0 = mk(paras[16].start); const {p, pop} = useTL();
  const tiles: Tile[] = [
    {n: 'S&P 500', v: '7.416,59', ch: -1.9, t: T0(16, 1)}, {n: 'Nasdaq', v: '24.509,76', ch: -2.5, t: T0(16, 1) + 1.6}, {n: 'Dow Jones', v: '51.608', ch: -1.4, t: T0(16, 1) + 3.2},
    {n: 'Nikkei 225', v: '58.860', ch: -1.34, t: T0(16, 2)}, {n: 'Kospi', v: '4.968', ch: -2.59, t: T0(16, 2) + 1.6}, {n: 'Hang Seng', v: '23.508', ch: -1.0, t: T0(16, 2) + 3.2}, {n: 'Şanghay', v: '3.584', ch: -0.5, t: T0(16, 2) + 4.8},
    {n: 'Stoxx 600 (öğle)', v: '657', ch: -0.7, t: T0(16, 3)}, {n: 'DAX (öğle)', v: '26.378', ch: -0.9, t: T0(16, 3) + 1.4}, {n: 'CAC 40 (öğle)', v: '8.312', ch: -0.5, t: T0(16, 3) + 2.8},
    {n: 'BIST 100 (öğle)', v: '11.741', ch: -0.85, t: T0(16, 4)}, {n: 'Dolar / TL', v: '50,42', chTxt: 'kur', t: T0(16, 5)}, {n: 'Gram altın ₺', v: '6.269', chTxt: 'bankalararası', t: T0(16, 6)},
    {n: 'Ons altın $', v: '≈3.870', chTxt: '1 yılın dibi', t: T0(16, 7)}, {n: 'Brent $', v: '≈92', chTxt: 'pazartesi −%3,5', t: T0(16, 8)}, {n: 'Bitcoin $', v: '≈65.000', chTxt: 'toparlandı', t: T0(16, 9)}, {n: 'ABD 10 yıllık', v: '%5,13', chTxt: 'faiz', t: T0(16, 10)},
  ];
  const W = 330, H = 168, G = 15;
  return (
    <AbsoluteFill>
      <Hdr title="Günün Kapanış Tablosu" sub="ABD pazartesi kapanışı • Asya kapanış • Avrupa, BIST ve kurlar öğle saatleri" icon={ico(ChartColumn)} accent={GLD} />
      {tiles.map((tl, i) => {
        const x = 110 + (i % 5) * (W + G), y = 200 + Math.floor(i / 5) * (H + G);
        const c = tl.ch === undefined ? BLU : tl.ch < 0 ? RED : GRN;
        const sp = pop(tl.t), a = Math.min(1, Math.max(0, p(tl.t, 0.3)));
        return (
          <div key={tl.n} style={{position: 'absolute', left: x, top: y, width: W, height: H, borderRadius: 22, background: `linear-gradient(155deg, ${c}${tl.ch === undefined ? '22' : Math.abs(tl.ch) > 2 ? '66' : Math.abs(tl.ch) > 1 ? '48' : '30'}, rgba(9,22,42,.92))`, border: `1px solid ${c}66`, opacity: a, transform: `scale(${0.9 + 0.1 * sp})`, boxShadow: `0 0 34px ${c}30`}}>
            <T x={22} y={16} s={22} wt={700} c="#cfdbec" w={290}>{tl.n}</T>
            <T x={22} y={52} s={46} wt={800} mono c="#fff" w={300} ls={-1}>{tl.v}</T>
            <T x={22} y={118} s={30} wt={800} mono c={c} w={300}>{tl.ch !== undefined ? (tl.ch < 0 ? '−%' : '+%') + num(Math.abs(tl.ch), Math.abs(tl.ch) < 1 || (Math.abs(tl.ch) * 100) % 10 !== 0 ? 2 : 1) : tl.chTxt}</T>
          </div>
        );
      })}
      <Source>AP, Reuters, FXStreet, Investing.com, TCMB, ForInvest • rakamlar yaklaşıktır • yatırım tavsiyesi değildir</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S18 final
const S18: React.FC = () => {
  const T0 = mk(paras[17].start); const {p} = useTL();
  return (
    <AbsoluteFill>
      <Hdr title="Yarın: Nvidia Bilançosu" sub="Piyasanın tepkisini anlatacağım" icon={ico(Bell)} accent={RED} />
      <Row x={110} y={300} w={1700} t0={T0(17, 0)} icon={ico(ShieldAlert, 38)} c={GLD} head="BİLGİLENDİRME" text="Anlattıklarım bilgilendirme amaçlıdır, yatırım tavsiyesi değildir" h={110} ts={34} />
      <Panel x={110} y={450} w={1700} h={200} t0={T0(17, 1)} accent={RED}>
        <T x={40} y={24} s={22} wt={700} c={P.muted} ls={2}>YARINKİ VİDEO</T>
        <T x={40} y={70} s={60} wt={800} w={1620} glow={RED}>Nvidia'nın bilançosu ve piyasanın tepkisi</T>
      </Panel>
      <div style={{position: 'absolute', left: 560, top: 720, width: 800, height: 120, borderRadius: 60, background: `linear-gradient(135deg, ${RED}, #b8323d)`, boxShadow: `0 0 60px ${RED}88`, opacity: p(T0(17, 2), 0.4), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, fontFamily: F, fontWeight: 900, fontSize: 50, color: '#fff', letterSpacing: 3}}>{ico(Bell, 48)}KANALA ABONE OL</div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- ticker
const TICK = ['S&P 500 7.416,59 (−%1,9)', 'NASDAQ 24.509,76 (−%2,5)', 'NİKKEİ −%1,34', 'KOSPİ −%2,59', 'BIST 100 11.741 (öğle)', 'USD/TL 50,42', 'GRAM ALTIN ≈6.269 ₺', 'ONS ALTIN ≈3.870 $', 'BRENT ≈92 $', 'ABD 10Y %5,13', 'NVIDIA BİLANÇO 00.20'];
const Ticker4: React.FC<{total: number}> = ({total}) => {
  const f = useCurrentFrame();
  const IW = 470, CW = IW * TICK.length;
  const x = -((f * 2.6) % CW);
  const row = (k: number) => TICK.map((s, i) => <div key={k + '-' + i} style={{width: IW, flex: 'none', textAlign: 'center', fontFamily: MONO, fontSize: 24, fontWeight: 700, color: s.includes('−') ? '#ff8d96' : '#ffe08a'}}>{s}<span style={{color: '#2a4266', marginLeft: 22}}>│</span></div>);
  return (
    <>
      <div style={{position: 'absolute', left: 0, bottom: 0, width: 1920, height: 64, background: 'linear-gradient(180deg, rgba(4,10,20,.95), rgba(3,8,16,.99))', borderTop: `1px solid ${GLD}77`}}>
        <div style={{position: 'absolute', left: 440, right: 0, top: 0, bottom: 0, overflow: 'hidden'}}><div style={{display: 'flex', alignItems: 'center', height: '100%', transform: `translateX(${x}px)`}}>{row(0)}{row(1)}</div></div>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 440, background: 'linear-gradient(90deg, #04101f 85%, rgba(4,16,31,0))', display: 'flex', alignItems: 'center', paddingLeft: 40, fontFamily: F, fontWeight: 800, fontSize: 21, letterSpacing: 2, color: GLD}}>YATIRIM TAVSİYESİ DEĞİLDİR</div>
      </div>
      <div style={{position: 'absolute', left: 0, bottom: 0, height: 4, width: (f / total) * 1920, background: `linear-gradient(90deg, ${GLD}, #ffd36b)`, boxShadow: `0 0 16px ${GLD}`}} />
    </>
  );
};

// ---------------------------------------------------------------- birleşim
export const SCENES4: {C: React.FC; from: number}[] = [
  {C: S1, from: 0}, {C: S2, from: paras[1].start}, {C: S3, from: paras[2].start}, {C: S4, from: paras[3].start}, {C: S5, from: paras[4].start}, {C: S6, from: paras[5].start}, {C: S7, from: paras[6].start},
  {C: S8, from: paras[7].start}, {C: S9, from: paras[8].start}, {C: S10, from: paras[9].start}, {C: S11, from: paras[10].start}, {C: S12, from: paras[11].start}, {C: S13, from: paras[12].start},
  {C: S14, from: paras[13].start}, {C: S15, from: paras[14].start}, {C: S16, from: paras[15].start}, {C: S17, from: paras[16].start}, {C: S18, from: paras[17].start},
];
const TT = 14;
const transitions: any[] = [
  slide({direction: 'from-right'}), fade(), wipe({direction: 'from-left'}), slide({direction: 'from-bottom'}), fade(), slide({direction: 'from-right'}), wipe({direction: 'from-bottom'}), fade(), flip(),
  slide({direction: 'from-left'}), fade(), slide({direction: 'from-right'}), wipe({direction: 'from-left'}), fade(), slide({direction: 'from-bottom'}), fade(), slide({direction: 'from-right'}),
];
export const EnfVideo4: React.FC = () => {
  useFonts();
  return (
    <>
      <Bg4 total={ENF4_TOTAL} />
      <TransitionSeries>
        {SCENES4.flatMap(({C: Sc, from}, i) => {
          const a = fr(from);
          const b = i + 1 < SCENES4.length ? fr(SCENES4[i + 1].from) : ENF4_TOTAL;
          const last = i === SCENES4.length - 1;
          const out = [<TransitionSeries.Sequence key={'s' + i} durationInFrames={Math.max(TT + 1, b - a + (last ? 0 : TT))}><Sc /></TransitionSeries.Sequence>];
          if (!last) out.push(<TransitionSeries.Transition key={'t' + i} presentation={transitions[i % transitions.length]} timing={springTiming({config: {damping: 200}, durationInFrames: TT})} />);
          return out;
        })}
      </TransitionSeries>
      <Ticker4 total={ENF4_TOTAL} />
    </>
  );
};
