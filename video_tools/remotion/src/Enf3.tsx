import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {AnimatedText} from 'remotion-bits';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {fade} from '@remotion/transitions/fade';
import {wipe} from '@remotion/transitions/wipe';
import {scaleLinear} from 'd3-scale';
import {line as d3line} from 'd3-shape';
import D from './enf3_sentences.json';
import {GoldBars} from './Coins3D';
import {Chip, HBar, Src, Stamp, Stat} from './Enf';
import {Bg, C, Card, FONT, Label, Shell, Tx, useTL} from './ui';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
export const ENF3_TOTAL = Math.ceil(D.total * FPS);
type P = {start: number; end: number; sentences: number[]};
const paras = D.paras as P[];
const A = (pi: number, si = 0) => paras[pi].sentences[si];
const mk = (start: number) => (pi: number, si = 0) => A(pi, si) - start;
const M = (v: number, d = 2) => v.toLocaleString('tr-TR', {minimumFractionDigits: d, maximumFractionDigits: d});
const pct = (v: number, d = 2) => (v > 0 ? '+%' : v < 0 ? '−%' : '%') + M(Math.abs(v), d);
const col = (v: number) => (v > 0 ? C.green : v < 0 ? C.red : C.grey);

// ---------------------------------------------------------------- ortak
const Pill: React.FC<{x: number; y: number; w: number; t0: number; v: number; d?: number; label?: string}> = ({x, y, w, t0, v, d = 2, label}) => {
  const {p} = useTL();
  return <Tx x={x} y={y} w={w} align="right" s={40} wt={900} c={col(v)} glow={col(v)} o={p(t0, 0.3)}>{label ?? pct(v, d)}</Tx>;
};
const Card2: React.FC<{x: number; y: number; w: number; h: number; t0: number; c: string; label: string; value: string; sub?: string; vs?: number}> = ({x, y, w, h, t0, c, label, value, sub, vs = 66}) => {
  const {p} = useTL();
  return (
    <Card x={x} y={y} w={w} h={h} t0={t0} accent={c}>
      <Label x={28} y={22} s={22} o={p(t0 + 0.1, 0.3)}>{label}</Label>
      <Tx x={28} y={sub ? 52 : 76} w={w - 50} s={vs} wt={900} c={C.white} glow={c} ls={-1} o={p(t0 + 0.1, 0.3)}>{value}</Tx>
      {sub && <Tx x={28} y={Math.min(h - 44, 54 + vs * 1.15 + 8)} w={w - 50} s={26} wt={600} c={C.grey} o={p(t0 + 0.2, 0.3)}>{sub}</Tx>}
    </Card>
  );
};

// ---------------------------------------------------------------- S1 kanca
const S1: React.FC = () => {
  const T = mk(0); const {p, t} = useTL();
  const q = Math.min(1, t / 3.2);
  const W = 680, H = 330, X0 = 1100, Y0 = 400;
  const ys = scaleLinear().domain([95, 101]).range([Y0 + H, Y0]);
  const xs = scaleLinear().domain([0, 1]).range([X0, X0 + W]);
  const line = d3line<[number, number]>().x((d) => xs(d[0])).y((d) => ys(d[1]));
  const pts: [number, number][] = [[0, 100], [0.35, 99.6], [0.55, 99.9], [0.8, 97.9], [1, 96.4]];
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 110, top: 150, width: 1000, fontFamily: FONT, fontWeight: 900, fontSize: 104, lineHeight: 1.04, color: C.white, letterSpacing: -3}}>
        <AnimatedText transition={{split: 'word', splitStagger: 3, y: [40, 0], opacity: [0, 1], blur: [14, 0], duration: 20, delay: 2}}>GÜNEY KORE BORSASI</AnimatedText>
      </div>
      <Tx x={110} y={430} s={230} wt={900} c={C.red} glow={C.red} ls={-8} o={p(0.3, 0.4)}>{'−%' + M(3.6 * Math.min(1, t / 1.4), 1)}</Tx>
      <Tx x={110} y={700} s={44} wt={800} c={C.grey} o={p(1.4, 0.4)}>KOSPİ • 5.100 PUAN • HAFTAYA SERT BAŞLANGIÇ</Tx>
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        <path d={line(pts)!} fill="none" stroke={C.red} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - q} style={{filter: `drop-shadow(0 0 18px ${C.red})`}} />
      </svg>
      <Tx x={X0} y={Y0 - 60} s={26} wt={800} c={C.grey} ls={2} o={p(0.6, 0.3)}>GÜN İÇİ HAREKET</Tx>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S2 Nvidia liderlik
const S2: React.FC = () => {
  const T = mk(4.0); const {p, count} = useTL();
  return (
    <Shell title="Nvidia'da Kurucu İstifası" sub="CEO ve yönetim kurulu üyeliğinden istifa • SEC bildirimi (8-K)">
      <Card2 x={110} y={260} w={860} h={140} t0={T(1, 1) - 0.4} c={C.red} label="GEÇEN HAFTA" value="JENSEN HUANG İSTİFA ETTİ" vs={50} />
      <Card2 x={110} y={420} w={860} h={175} t0={T(1, 2)} c={C.gold} label="11 KASIM" value="KURUL İSTİFAYI KABUL ETTİ" sub="ABD Menkul Kıymetler Komisyonu bildirimi" vs={44} />
      <Card2 x={110} y={615} w={860} h={175} t0={T(1, 3)} c={C.blue} label="YENİ DURUM" value="COLETTE KRESS: GEÇİCİ CEO" sub="Finans direktörlüğünü de sürdürüyor" vs={44} />
      <Card x={1010} y={260} w={800} h={330} t0={T(1, 4)} accent={C.red}>
        <Label x={36} y={26}>HİSSE • HAFTALIK</Label>
        <Tx x={36} y={72} s={150} wt={900} c={C.red} glow={C.red} ls={-4}>{'−%' + count(T(1, 4), 1.4, 0, 12.75, 2, '12,75')}</Tx>
        <Tx x={36} y={246} s={28} wt={600} c={C.grey} o={p(T(1, 4) + 1.2, 0.3)}>haftayı yaklaşık bu kayıpla kapattı</Tx>
      </Card>
      <Card x={1010} y={620} w={800} h={170} t0={T(1, 5)} accent={C.red}>
        <Label x={36} y={22}>CUMA • PHILADELPHIA YARI İLETKEN ENDEKSİ</Label>
        <Tx x={36} y={62} s={64} wt={900} c={C.red} glow={C.red}>−%3,43</Tx>
      </Card>
      <Chip x={110} y={830} w={1700} h={80} t0={T(1, 5) + 1} col={C.gold} s={30}>NVIDIA BİLANÇOSU YARIN • KRESS'İN GEÇİCİ CEO OLARAK İLK BİLANÇOSU</Chip>
      <Src>ABD Menkul Kıymetler Komisyonu (8-K), CNBC, AP • 9–13 Kasım 2026 haftası</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- S3 Asya satışı
const S3: React.FC = () => {
  const T = mk(A(1, 6)); const {p} = useTL();
  return (
    <Shell title="Asya Faturayı Ödedi" sub="Çip ve yapay zekâ hisseleri satış baskısında • 16 Kasım">
      <Tx x={110} y={250} s={24} wt={800} c={C.grey} ls={2} o={p(T(1, 7), 0.3)}>GÜNLÜK DEĞİŞİM</Tx>
      <HBar x={110} y={300} w={1050} t0={T(1, 7)} label="SK Hynix" val={7.9} max={8} txt="−%7,9" col={C.red} h={52} ls={240} />
      <HBar x={110} y={380} w={1050} t0={T(1, 7) + 0.8} label="Samsung" val={4.5} max={8} txt="−%4,5" col={C.red} h={52} ls={240} />
      <HBar x={110} y={460} w={1050} t0={T(1, 8)} label="Kospi (5.100)" val={3.6} max={8} txt="−%3,6" col={C.red} h={52} ls={240} />
      <HBar x={110} y={540} w={1050} t0={T(1, 9)} label="Nikkei (59.662)" val={2.4} max={8} txt="−%2,4" col={C.red} h={52} ls={240} />
      <Card x={1260} y={270} w={550} h={250} t0={T(1, 10)} accent={C.gold}>
        <Label x={32} y={24}>NVIDIA BİLANÇOSU</Label>
        <Tx x={32} y={70} s={72} wt={900} c={C.gold2} glow={C.gold}>SALI</Tx>
        <Tx x={32} y={160} s={28} wt={700} c={C.grey} w={490} o={p(T(1, 11), 0.3)}>Türkiye saatiyle gece yarısından sonra • Kress'in ilk bilançosu</Tx>
      </Card>
      <Card x={1260} y={560} w={550} h={200} t0={T(1, 12)} accent={C.purple}>
        <Label x={32} y={24}>ANTHROPIC FİYATLAMASI</Label>
        <Tx x={32} y={72} s={60} wt={900} c={C.white} glow={C.purple}>ÇARŞAMBA</Tx>
        <Tx x={32} y={148} s={24} wt={600} c={C.grey} w={490}>haberlere göre (teyit edilmedi)</Tx>
      </Card>
      <Stamp x={170} y={690} t0={T(1, 13)} col={C.red} s={56} rot={-3}>YAPAY ZEKÂ RALLİSİ: İKİ SINAV</Stamp>
      <Src>FXStreet, Investing.com, Reuters • Kospi ve Nikkei bugünkü kapanışa yakın seviyeler</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- S4 neden önemli
const S4: React.FC = () => {
  const T = mk(paras[2].start); const {p} = useTL();
  const zero = 720, scale = 24;
  return (
    <Shell title="Bu Neden Bu Kadar Önemli?" sub="Yapay zekâ yatırımları borsaları taşıyan temalardan biri">
      <div style={{position: 'absolute', left: zero - 2, top: 270, width: 4, height: 360, background: C.grey, opacity: p(T(2, 3), 0.3)}} />
      {[{n: 'NVIDIA (hisse)', v: -12.75, t0: T(2, 3), y: 300}, {n: 'NASDAQ (endeks)', v: 2.27, t0: T(2, 3) + 1.0, y: 450}].map((r) => {
        const q = p(r.t0, 0.9); const w = Math.abs(r.v) * scale * q;
        return (
          <React.Fragment key={r.n}>
            <Tx x={110} y={r.y + 18} w={380} s={34} wt={800} o={p(r.t0 - 0.1, 0.3)}>{r.n}</Tx>
            <div style={{position: 'absolute', left: r.v < 0 ? zero - w : zero + 4, top: r.y, width: w, height: 80, borderRadius: 16, background: `linear-gradient(${r.v < 0 ? 270 : 90}deg, ${col(r.v)}, ${col(r.v)}99)`, boxShadow: `0 0 40px ${col(r.v)}66`}} />
            <Tx x={r.v < 0 ? zero + 24 : zero + w + 30} y={r.y + 14} w={300} s={50} wt={900} c={col(r.v)} glow={col(r.v)} o={Math.min(1, q * 3)}>{pct(r.v)}</Tx>
          </React.Fragment>
        );
      })}
      <Tx x={110} y={650} s={26} wt={700} c={C.grey} o={p(T(2, 3) + 1.4, 0.3)}>geçen hafta</Tx>
      <Chip x={110} y={720} w={820} h={80} t0={T(2, 4)} col={C.green} s={28}>ENDEKSİN GERİ KALANI AYAKTA KALDI</Chip>
      <Chip x={960} y={720} w={850} h={80} t0={T(2, 5)} col={C.red} s={28}>BUGÜN NASDAQ VADELİLERİ YENİDEN DÜŞÜŞTE</Chip>
      <Card x={1010} y={270} w={800} h={380} t0={T(2, 6)} accent={C.gold}>
        <Label x={36} y={26}>YATIRIMCILARIN SORUSU</Label>
        <Tx x={36} y={76} s={54} wt={900} w={730}>Kurucu gittikten sonra büyüme hikâyesi aynı kalacak mı?</Tx>
        <Tx x={36} y={290} s={36} wt={900} c={C.gold2} glow={C.gold} o={p(T(2, 7), 0.4)}>CEVAP: YARIN GECE</Tx>
      </Card>
      <Src>CNBC, AP • Nvidia haftalık −%12,75 • Nasdaq haftalık +%2,27 (7 Kasım–13 Kasım)</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- S5 Çin
const PairBar: React.FC<{y: number; t0: number; label: string; act: number; exp: number; max: number}> = ({y, t0, label, act, exp, max}) => {
  const {p} = useTL(); const q = p(t0, 0.9);
  return (
    <div style={{opacity: p(t0 - 0.1, 0.3)}}>
      <Tx x={110} y={y} s={30} wt={800}>{label}</Tx>
      <div style={{position: 'absolute', left: 110, top: y + 44, width: 560 * (exp / max) * q, height: 28, borderRadius: 14, background: C.grey + 'aa'}} />
      <Tx x={110 + 560 * (exp / max) + 14} y={y + 40} w={260} s={26} wt={700} c={C.grey}>{'Beklenti %' + M(exp, 1)}</Tx>
      <div style={{position: 'absolute', left: 110, top: y + 82, width: 560 * (act / max) * q, height: 34, borderRadius: 17, background: `linear-gradient(90deg, ${C.red}aa, ${C.red})`, boxShadow: `0 0 26px ${C.red}66`}} />
      <Tx x={110 + 560 * (act / max) + 14} y={y + 80} w={260} s={30} wt={900} c={C.red}>{'Gerçek %' + M(act, 1)}</Tx>
    </div>
  );
};
const S5: React.FC = () => {
  const T = mk(paras[3].start); const {p} = useTL();
  return (
    <Shell title="Çin'den Kötü Haber" sub="Ekim verilerinin hepsi beklentinin altında kaldı">
      <PairBar y={250} t0={T(3, 2)} label="Sanayi üretimi (yıllık)" act={4.8} exp={5.3} max={6} />
      <PairBar y={410} t0={T(3, 3)} label="Perakende satışlar (yıllık)" act={0.4} exp={0.8} max={6} />
      <Tx x={110} y={565} s={26} wt={700} c={C.grey} o={p(T(3, 4), 0.3)}>Üstelik ekimde bir haftalık ulusal bayram tatili vardı</Tx>
      <Card2 x={110} y={620} w={520} h={200} t0={T(3, 5)} c={C.red} label="SABİT VARLIK YATIRIMI" value="−%8,1" sub="ocak–ekim" vs={72} />
      <Card2 x={660} y={620} w={520} h={200} t0={T(3, 6)} c={C.red} label="KONUT YATIRIMI" value="−%21,6" sub="ocak–ekim" vs={72} />
      <Card2 x={1210} y={260} w={600} h={190} t0={T(3, 7)} c={C.red} label="YENİ KONUT FİYATLARI (YILLIK)" value="−%2,4" sub="eylülde −%2,8 idi" vs={72} />
      <Card x={1210} y={480} w={600} h={330} t0={T(3, 9)} accent={C.gold}>
        <Label x={28} y={22}>PİYASALAR</Label>
        <Tx x={28} y={70} s={34} wt={800}>Şanghay (3.599)</Tx><Pill x={560} y={62} w={230} t0={T(3, 9)} v={-1} d={1} />
        <Tx x={28} y={150} s={34} wt={800}>Hang Seng (23.759)</Tx><Pill x={560} y={142} w={230} t0={T(3, 10)} v={0.5} d={1} />
        <Tx x={28} y={230} s={34} wt={800}>Japonya 3. çeyrek GDP</Tx><Pill x={560} y={222} w={230} t0={T(3, 11)} v={-0.1} d={1} />
      </Card>
      <Chip x={110} y={860} w={1700} h={64} t0={T(3, 8)} col={C.gold} s={26}>İHRACAT ANA DESTEK • PEKİN'DEN BU YIL EK TEŞVİK BEKLENMİYOR</Chip>
      <Src>Çin Ulusal İstatistik Bürosu verileri (FXStreet, InvestingLive) • 16 Kasım 2026</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- S6 ABD / Fed
const S6: React.FC = () => {
  const T = mk(paras[4].start); const {p} = useTL();
  return (
    <Shell title="Amerika: Gözler Warsh'ta" sub="Fed Başkanı Kevin Warsh bu akşam konuşuyor">
      <Card x={110} y={260} w={820} h={250} t0={T(4, 1)} accent={C.gold}>
        <Label x={32} y={24}>BU AKŞAM • FED BAŞKANI</Label>
        <Tx x={32} y={68} s={64} wt={900} c={C.white} glow={C.gold}>KEVIN WARSH</Tx>
        <Tx x={32} y={160} s={28} wt={700} c={C.grey} w={760} o={p(T(4, 2), 0.3)}>Konu: teknolojinin üretkenliğe ve istihdama etkisi • piyasa faiz ipucu arıyor</Tx>
      </Card>
      <Card2 x={110} y={540} w={330} h={210} t0={T(4, 3)} c={C.red} label="ARALIK • +25 BP" value="FİYATLANDI" vs={42} />
      <Card2 x={470} y={540} w={460} h={210} t0={T(4, 4)} c={C.red} label="ÜRETİCİ FİYATLARI" value="%6,5" sub="yıllık • Kasım 2022'den beri en yüksek" vs={62} />
      <Tx x={1010} y={250} s={24} wt={800} c={C.grey} ls={2} o={p(T(4, 5), 0.3)}>TAHVİL FAİZLERİ</Tx>
      <HBar x={1010} y={290} w={800} t0={T(4, 5)} label="10 yıl • cuma tepe" val={5.17} max={5.5} txt="%5,17" col={C.red} h={40} ls={330} />
      <HBar x={1010} y={350} w={800} t0={T(4, 5) + 0.6} label="10 yıl • bugün" val={5.13} max={5.5} txt="%5,13" col={C.gold} h={40} ls={330} />
      <HBar x={1010} y={410} w={800} t0={T(4, 6)} label="2 yıl • bugün" val={4.85} max={5.5} txt="%4,85" col={C.blue} h={40} ls={330} />
      <Card2 x={1010} y={490} w={800} h={140} t0={T(4, 7)} c={C.purple} label="ÇARŞAMBA" value="FOMC EKİM TUTANAKLARI" vs={38} />
      <Chip x={1010} y={660} w={800} h={90} t0={T(4, 8)} col={C.red} s={28}>S&P 500 VADELİ ≈ −%0,5 BUGÜN</Chip>
      <Chip x={110} y={800} w={1700} h={80} t0={T(4, 9)} col={C.green} s={28}>GEÇEN HAFTA: S&P'NİN 11 SEKTÖRÜ DE YÜKSELDİ • ENERJİ +%5,37 İLE BAŞTA</Chip>
      <Src>Reuters, CNBC, AP • ABD üretici fiyatları ekim • tahvil faizleri 16 Kasım sabahı</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- S7 petrol / jeopolitik
const S7: React.FC = () => {
  const T = mk(paras[5].start); const {p, count} = useTL();
  const dot = (x: number, y: number, l: string, t0: number, c: string) => (
    <div style={{position: 'absolute', left: x, top: y, width: 150, height: 150, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, ${c}, ${c}77)`, boxShadow: `0 0 40px ${c}88`, opacity: p(t0, 0.3),
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 30, color: '#fff', textAlign: 'center'}}>{l}</div>
  );
  return (
    <Shell title="Petrol ve Jeopolitik" sub="Brent düşüşte • perşembe üçlü zirve">
      <Card x={110} y={260} w={760} h={280} t0={T(5, 1)} accent={C.gold}>
        <Label x={32} y={24}>BRENT • CUMA KAPANIŞI</Label>
        <Tx x={32} y={68} s={110} wt={900} c={C.white} glow={C.gold} ls={-3}>{count(T(5, 1), 1.2, 90, 95.84, 2, '95,84') + ' $'}</Tx>
        <Tx x={32} y={214} s={32} wt={800} c={C.red} o={p(T(5, 1) + 1.2, 0.3)}>haftalık −%2,5</Tx>
      </Card>
      <Tx x={110} y={570} s={24} wt={800} c={C.grey} ls={2} o={p(T(5, 2), 0.3)}>BRENT HAFTALIK DEĞİŞİM</Tx>
      <HBar x={110} y={610} w={760} t0={T(5, 2)} label="Önceki hafta" val={16} max={17} txt="−%16" col={C.red} h={44} ls={200} />
      <HBar x={110} y={680} w={760} t0={T(5, 1) + 1.0} label="Geçen hafta" val={2.5} max={17} txt="−%2,5" col={C.gold} h={44} ls={200} />
      <Chip x={110} y={770} w={760} h={80} t0={T(5, 3)} col={C.blue} s={26}>IEA: KÜRESEL PETROL ARZINDA FAZLA</Chip>
      <Card x={920} y={260} w={890} h={250} t0={T(5, 4)} accent={C.green}>
        <Label x={32} y={24}>ABD–İRAN MÜZAKERELERİ SÜRÜYOR</Label>
        <Tx x={32} y={72} s={40} wt={800} w={820}>Trump: görüşmeler sürdükçe yeni saldırı ihtimali düşük</Tx>
      </Card>
      {dot(980, 560, 'TRUMP', T(5, 5), C.blue)}{dot(1190, 560, 'Şİ', T(5, 5) + 0.3, C.red)}{dot(1400, 560, 'PUTİN', T(5, 5) + 0.6, C.purple)}
      <Tx x={1580} y={590} w={230} s={34} wt={900} c={C.gold2} glow={C.gold} o={p(T(5, 5) + 0.9, 0.3)}>ŞİNCEN 19 KASIM</Tx>
      <Chip x={920} y={750} w={280} h={70} t0={T(5, 6)} col={C.green} s={24}>İRAN ✓</Chip>
      <Chip x={1220} y={750} w={310} h={70} t0={T(5, 6) + 0.3} col={C.green} s={24}>NÜKLEER SİLAH ✓</Chip>
      <Chip x={1550} y={750} w={260} h={70} t0={T(5, 6) + 0.6} col={C.red} s={24}>UKRAYNA ✗</Chip>
      <Src>EnergyNow, Reuters, Beyaz Saray açıklaması (CBS, JPost) • 13–16 Kasım 2026</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- S8 altın / bitcoin
const S8: React.FC = () => {
  const T = mk(paras[6].start); const {p, t} = useTL();
  const W = 640, H = 240, X0 = 1160, Y0 = 400;
  const xs = scaleLinear().domain([0, 2]).range([X0, X0 + W]);
  const ys = scaleLinear().domain([61000, 66000]).range([Y0 + H, Y0]);
  const pts: [number, number][] = [[0, 65500], [1, 62200], [2, 65000]];
  const line = d3line<[number, number]>().x((d) => xs(d[0])).y((d) => ys(d[1]));
  const q = p(T(6, 2) - 1.6, 2.4);
  return (
    <Shell title="Altın ve Bitcoin" sub="Altın 13 ayın dibinde • bitcoin hafta sonu sert satış yedi">
      <div style={{position: 'absolute', left: 60, top: 230, opacity: p(0.2, 0.6)}}><GoldBars width={880} height={620} /></div>
      <Card x={110} y={770} w={820} h={170} t0={T(6, 0)} accent={C.gold}>
        <Tx x={28} y={24} s={72} wt={900} c={C.gold2} glow={C.gold}>3.850–3.870 $</Tx>
        <Tx x={28} y={116} w={780} s={28} wt={800} c={C.red}>EKİM 2025'TEN BERİ EN DÜŞÜK • ONS ALTIN</Tx>
      </Card>
      <Tx x={X0} y={240} s={26} wt={800} c={C.grey} ls={2} o={p(T(6, 1), 0.3)}>BİTCOİN • HAFTA SONU</Tx>
      <Tx x={X0} y={290} s={74} wt={900} c={C.white} glow={C.red} o={p(T(6, 1), 0.3)}>{'≈ ' + M(Math.round(65000), 0)}</Tx>
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        <path d={line(pts)!} fill="none" stroke={C.red} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - q} style={{filter: `drop-shadow(0 0 14px ${C.red})`}} />
        {pts.map((pt, i) => <circle key={i} cx={xs(pt[0])} cy={ys(pt[1])} r={11} fill={i === 1 ? C.red : C.gold2} opacity={p(T(6, 2) - 1.6 + i * 1.0, 0.2)} />)}
      </svg>
      <Tx x={xs(1) - 120} y={ys(62200) + 20} w={240} align="center" s={30} wt={900} c={C.red} o={p(T(6, 2), 0.3)}>≈ 62.000 $</Tx>
      <Tx x={xs(2) - 130} y={ys(65000) - 56} w={260} align="center" s={30} wt={900} c={C.gold2} o={p(T(6, 2) + 0.6, 0.3)}>65.000 $ üzeri</Tx>
      <Chip x={X0 - 40} y={700} w={700} h={76} t0={T(6, 3)} col={C.red} s={26}>SPOT BTC FONLARINDAN ÇIKIŞ</Chip>
      <Chip x={X0 - 40} y={796} w={700} h={76} t0={T(6, 3) + 0.6} col={C.red} s={26}>KALDIRAÇLI POZİSYON TASFİYESİ</Chip>
      <Src>FinanceFeeds, Foreks, Cryptoticker • grafik yaklaşık değerleri gösterir</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- S9 Avrupa
const S9: React.FC = () => {
  const T = mk(paras[7].start); const {p} = useTL();
  return (
    <Shell title="Avrupa: Daha Sakin" sub="Öğle saatlerinde • rekor civarında">
      <Card2 x={110} y={260} w={560} h={250} t0={T(7, 1)} c={C.green} label="STOXX 600 (ÖĞLEYE DOĞRU)" value="≈ 665" sub="+%0,1 • cuma rekor kapanış" vs={92} />
      <Card2 x={700} y={260} w={500} h={250} t0={T(7, 2)} c={C.green} label="FTSE 100" value="+%0,4" sub="rekor kapanışa gidiyor" vs={92} />
      <Card x={1230} y={260} w={580} h={250} t0={T(7, 3)} accent={C.gold}>
        <Label x={28} y={22}>SEKTÖRLER</Label>
        <Tx x={28} y={66} s={34} wt={800}>Savunma</Tx><Tx x={548} y={62} w={240} align="right" s={40} wt={900} c={C.green}>ÖNDE ▲</Tx>
        <Tx x={28} y={140} s={34} wt={800}>Teknoloji</Tx><Tx x={548} y={136} w={240} align="right" s={40} wt={900} c={C.red}>−%0,6</Tx>
      </Card>
      <Card x={110} y={550} w={1700} h={230} t0={T(7, 4)} accent={C.red}>
        <Label x={36} y={26}>AVRUPA MERKEZ BANKASI</Label>
        <Tx x={36} y={76} s={52} wt={900} w={1620}>Yapay zekâ değerlemeleri konusunda yeni uyarı</Tx>
        <Tx x={36} y={156} s={28} wt={600} c={C.grey} w={1620} o={p(T(7, 4) + 0.6, 0.3)}>AI hisselerindeki yüksek değerleme riski piyasaların gündeminde</Tx>
      </Card>
      <Src>Reuters, Bloomberg, Investing.com • 16 Kasım 2026 öğle saatleri</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- S10 Türkiye piyasa
const S10: React.FC = () => {
  const T = mk(paras[8].start); const {p, count} = useTL();
  return (
    <Shell title="Türkiye: Piyasada Bugün" sub="Borsa yatay • dolar ve altın">
      <Card x={110} y={260} w={860} h={330} t0={T(8, 2)} accent={C.gold}>
        <Label x={36} y={26}>BIST 100 • BUGÜN KAPANIŞ</Label>
        <Tx x={36} y={72} s={120} wt={900} c={C.white} glow={C.gold} ls={-3}>{count(T(8, 2), 1.2, 11500, 11841.81, 2, '11.841,81')}</Tx>
        <Tx x={36} y={236} s={44} wt={900} c={C.grey} o={p(T(8, 2) + 1.2, 0.3)}>−%0,01 • neredeyse yatay</Tx>
      </Card>
      <Card2 x={1000} y={260} w={810} h={150} t0={T(8, 1)} c={C.green} label="GEÇEN HAFTA BIST 100" value="+%3,14" vs={62} />
      <Card2 x={1000} y={430} w={810} h={190} t0={T(8, 3)} c={C.red} label="DOLAR / TL" value="50,39 ₺" sub="günlük yaklaşık +%0,2" vs={60} />
      <Card x={110} y={660} w={1700} h={190} t0={T(8, 4)} accent={C.gold}>
        <Label x={36} y={24}>GRAM ALTIN</Label>
        <Tx x={36} y={66} s={80} wt={900} c={C.gold2} glow={C.gold}>≈ 6.270 ₺</Tx>
        <Tx x={620} y={80} s={46} wt={900} c={C.red}>−%0,26</Tx>
        <Tx x={900} y={90} s={28} wt={700} c={C.grey} w={760}>ons altın geriledi, gram altın da düştü</Tx>
      </Card>
      <Src>CNBC-e, Aposto, ForInvest • 16 Kasım 2026 kapanış</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- S11 TCMB anketi
const S11: React.FC = () => {
  const T = mk(paras[9].start); const {p} = useTL();
  const W = 560, H = 215;
  const grid = (i: number) => ({x: 110 + (i % 3) * 580, y: 245 + Math.floor(i / 3) * 235});
  const items: {c: string; label: string; value: string; sub: string; t: number}[] = [
    {c: C.red, label: 'YIL SONU ENFLASYON BEKLENTİSİ', value: '%30,04', sub: 'önceki anket %29,63', t: T(9, 0)},
    {c: C.gold, label: 'YIL SONU DOLAR / TL', value: '51,61', sub: 'anket beklentisi', t: T(9, 1)},
    {c: C.gold, label: '12 AY SONRASI DOLAR / TL', value: '60,77', sub: 'anket beklentisi', t: T(9, 2)},
    {c: C.blue, label: 'POLİTİKA FAİZİ', value: '%36 → %35?', sub: 'aralık beklentisi • karar 10 Aralık', t: T(9, 3)},
    {c: C.red, label: 'TCMB TOPLAM REZERV (HESAP)', value: '158,8 mlr $', sub: '−2,3 mlr $ • resmi veri perşembe', t: T(9, 5)},
    {c: C.green, label: 'YIL SONU CARİ AÇIK BEKLENTİSİ', value: '46,1 mlr $', sub: 'önceki ankette 48,5 mlr $', t: T(9, 6)},
    {c: C.green, label: 'SANAYİ ÜRETİMİ • EYLÜL', value: '+%2,6', sub: 'yıllık • aylık +%2,1', t: T(9, 7)},
    {c: C.red, label: 'EKİM ENFLASYONU (YILLIK)', value: '%29,77', sub: 'TÜİK', t: T(9, 8)},
    {c: C.blue, label: '22 EKİM FAİZ KARARI', value: '%37 → %36', sub: 'politika faizi indirildi', t: T(9, 8) + 1.2},
  ];
  return (
    <Shell title="Merkez Bankası Anketi ve Makro Veriler" sub="Piyasa Katılımcıları Anketi (13 Kasım) • diğer göstergeler">
      {items.map((it, i) => { const g = grid(i); return <Card2 key={i} x={g.x} y={g.y} w={W} h={H} t0={it.t} c={it.c} label={it.label} value={it.value} sub={it.sub} vs={it.value.length > 9 ? 46 : 70} />; })}
      <Src>TCMB Piyasa Katılımcıları Anketi, TÜİK, Matriks (rezerv hesabı) • Kasım 2026</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- S12 teknik seviyeler
const S12: React.FC = () => {
  const T = mk(paras[10].start); const {p} = useTL();
  const lv = (y: number, label: string, v: string, c: string, t0: number) => (
    <div key={v} style={{opacity: p(t0, 0.3)}}>
      <div style={{position: 'absolute', left: 110, top: y, width: 1100, height: 6, background: `linear-gradient(90deg, ${c}, ${c}00)`, boxShadow: `0 0 20px ${c}`}} />
      <Tx x={110} y={y - 54} s={34} wt={900} c={c}>{label}</Tx>
      <Tx x={1210} y={y - 56} w={400} align="right" s={56} wt={900} c={C.white}>{v}</Tx>
    </div>
  );
  return (
    <Shell title="Borsada Bakılan Seviyeler" sub="Aracı kurumların izlediği bölgeler • tavsiye değil">
      {lv(380, 'DİRENÇ', '12.000', C.red, T(10, 1))}
      {lv(500, 'DİRENÇ', '11.900', C.red, T(10, 1) + 0.5)}
      <div style={{position: 'absolute', left: 110, top: 610, width: 1100, height: 78, borderRadius: 39, background: C.gold + '33', border: `3px solid ${C.gold}`, opacity: p(T(10, 1) + 1.0, 0.3), display: 'flex', alignItems: 'center', paddingLeft: 36, fontFamily: FONT, fontWeight: 900, fontSize: 36, color: C.gold2}}>BUGÜNKÜ KAPANIŞ  •  11.841,81</div>
      {lv(780, 'DESTEK', '11.700', C.green, T(10, 1) + 1.5)}
      <Stamp x={1250} y={560} t0={T(10, 2)} col={C.gold} s={48} rot={-5}>TAVSİYE DEĞİL</Stamp>
      <Src>Şeker Yatırım, Tacirler, Borsatek, IKON Menkul haftalık değerlendirmeleri • seviyeler yaklaşıktır</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- S13 takvim
const S13: React.FC = () => {
  const T = mk(paras[11].start); const {p} = useTL();
  const days: {d: string; c: string; t: number; body: string[]}[] = [
    {d: 'PAZARTESİ', c: C.gold, t: T(11, 1), body: ['Warsh konuşması (bu akşam)']},
    {d: 'SALI', c: C.red, t: T(11, 2), body: ['Nvidia bilançosu', 'Türkiye saatiyle gece yarısından sonra']},
    {d: 'ÇARŞAMBA', c: C.purple, t: T(11, 3), body: ['Fed ekim toplantısı tutanakları', 'Anthropic halka arz fiyatlaması (haberlere göre)']},
    {d: 'PERŞEMBE', c: C.blue, t: T(11, 4), body: ['Trump–Şi–Putin zirvesi, Şincen', 'TCMB rezerv verisi (14.30)']},
  ];
  return (
    <Shell title="Bu Haftanın Takvimi" sub="Piyasaları hareketlendirebilecek gelişmeler">
      {days.map((dy, i) => (
        <Card key={dy.d} x={110 + i * 430} y={260} w={410} h={520} t0={dy.t} accent={dy.c}>
          <Tx x={28} y={30} w={360} s={34} wt={900} c={dy.c} ls={1}>{dy.d}</Tx>
          {dy.body.map((b, j) => <Tx key={j} x={28} y={110 + j * 170} w={360} s={j === 0 ? 40 : 28} wt={j === 0 ? 900 : 600} c={j === 0 ? C.white : C.grey} o={p(dy.t + 0.3 + j * 0.3, 0.3)}>{b}</Tx>)}
        </Card>
      ))}
    </Shell>
  );
};

// ---------------------------------------------------------------- S14 özet
const S14: React.FC = () => {
  const T = mk(paras[12].start); const {p} = useTL();
  const R = (i: number, y: number, t0: number, c: string, txt: string) => (
    <Card key={i} x={110} y={y} w={1700} h={150} t0={t0} accent={c}>
      <div style={{position: 'absolute', left: 36, top: 28, width: 90, height: 90, borderRadius: '50%', background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 54, color: '#fff'}}>{i}</div>
      <Tx x={170} y={42} s={42} wt={800} w={1480}>{txt}</Tx>
    </Card>
  );
  return (
    <Shell title="Günün Özeti" sub="Üç cümlede">
      {R(1, 250, T(12, 1), C.red, 'Yapay zekâ hisselerindeki satış Asya\'yı vurdu, gözler Nvidia bilançosunda')}
      {R(2, 430, T(12, 2), C.gold, 'Çin\'den gelen zayıf veriler küresel büyüme endişesini artırdı')}
      {R(3, 610, T(12, 3), C.blue, 'Fed faiz artışı beklentisi tahvil faizlerini yüksek tutuyor, altını baskılıyor')}
      <Chip x={110} y={810} w={1700} h={90} t0={T(12, 4)} col={C.green} s={32}>TÜRKİYE: BORSA DALGALI BİR DÜNYADA GÜNÜ YATAY KAPATTI</Chip>
    </Shell>
  );
};

// ---------------------------------------------------------------- S15 kapanış tablosu
type Row = {n: string; v: string; ch?: number; chTxt?: string; t: number};
const Table: React.FC<{x: number; y: number; w: number; title: string; rows: Row[]; c: string}> = ({x, y, w, title, rows, c}) => {
  const {p} = useTL();
  const first = Math.min(...rows.map((r) => r.t));
  return (
    <div style={{opacity: p(first - 0.2, 0.3)}}>
      <div style={{position: 'absolute', left: x, top: y, width: w, height: 8 + 62 * (rows.length) + 56, borderRadius: 24, background: 'linear-gradient(155deg, rgba(30,62,104,.93), rgba(13,32,58,.93))', border: `2px solid ${c}66`, boxShadow: `0 0 40px ${c}22`}} />
      <Tx x={x + 28} y={y + 14} s={24} wt={900} c={c} ls={3}>{title}</Tx>
      {rows.map((r, i) => (
        <div key={r.n} style={{opacity: p(r.t, 0.3), transform: `translateX(${(1 - p(r.t, 0.4)) * 50}px)`}}>
          <Tx x={x + 28} y={y + 62 + i * 62} s={30} wt={700}>{r.n}</Tx>
          <Tx x={x + w * 0.62} y={y + 62 + i * 62} w={w * 0.36} align="right" s={r.v.length > 10 ? 29 : 34} wt={900}>{r.v}</Tx>
          <Tx x={x + w - 24} y={y + 64 + i * 62} w={w * 0.30} align="right" s={27} wt={900} c={r.ch === undefined ? C.grey : col(r.ch)}>{r.chTxt ?? (r.ch === undefined ? '' : pct(r.ch, 2))}</Tx>
        </div>
      ))}
    </div>
  );
};
const S15: React.FC = () => {
  const T = mk(paras[13].start);
  return (
    <Shell title="Günün Kapanış Tablosu" sub="16 Kasım 2026 • rakamlar yaklaşıktır">
      <Table x={110} y={240} w={860} title="ABD (CUMA KAPANIŞI)" c={C.blue} rows={[
        {n: 'S&P 500', v: '7.561,67', ch: -0.4, t: T(13, 1)}, {n: 'Nasdaq', v: '25.136,27', ch: -0.9, t: T(13, 1) + 0.8}, {n: 'Dow Jones', v: '≈52.350', ch: 0.1, t: T(13, 1) + 1.6},
      ]} />
      <Table x={110} y={500} w={860} title="ASYA (BUGÜN)" c={C.purple} rows={[
        {n: 'Nikkei 225', v: '59.662', ch: -2.4, t: T(13, 3)}, {n: 'Kospi', v: '5.100', ch: -3.6, t: T(13, 3) + 1.4}, {n: 'Hang Seng', v: '23.759', ch: 0.5, t: T(13, 3) + 2.8}, {n: 'Şanghay', v: '≈3.600', ch: -1, t: T(13, 3) + 4.2},
      ]} />
      <Table x={110} y={820} w={860} title="AVRUPA (ÖĞLE)" c={C.green} rows={[{n: 'Stoxx 600', v: '≈665', ch: 0.1, t: T(13, 4)}]} />
      <Table x={1010} y={240} w={800} title="TÜRKİYE" c={C.gold} rows={[
        {n: 'BIST 100', v: '11.841,81', ch: -0.01, t: T(13, 5)}, {n: 'Dolar / TL', v: '50,39', chTxt: '+%0,2', t: T(13, 6)}, {n: 'Gram altın', v: '≈6.270', ch: -0.26, t: T(13, 7)},
      ]} />
      <Table x={1010} y={500} w={800} title="EMTİA • KRİPTO • TAHVİL" c={C.red} rows={[
        {n: 'Ons altın', v: '3.850–3.870 $', chTxt: '13 ay dibi', t: T(13, 8)}, {n: 'Brent (cuma)', v: '95,84 $', chTxt: 'haftalık −%2,5', t: T(13, 9)}, {n: 'Bitcoin', v: '≈65.000 $', chTxt: 'toparlandı', t: T(13, 10)}, {n: 'ABD 10 yıllık', v: '%5,13', chTxt: 'faiz', t: T(13, 11)},
      ]} />
      <Src>Kaynaklar: AP, Reuters, Bloomberg, Investing.com, TCMB, TÜİK, ForInvest, CNBC-e • yatırım tavsiyesi değildir</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- S16 final
const S16: React.FC = () => {
  const T = mk(paras[14].start); const {p} = useTL();
  return (
    <Shell title="Teşekkürler" sub="Yarın: Nvidia bilançosu ve piyasanın tepkisi">
      <Chip x={110} y={300} w={1700} h={100} t0={T(14, 0)} col={C.gold} s={34}>BİLGİLENDİRME AMAÇLIDIR • YATIRIM TAVSİYESİ DEĞİLDİR</Chip>
      <Card x={110} y={450} w={1700} h={190} t0={T(14, 1)} accent={C.red}>
        <Label x={40} y={28}>YARINKİ VİDEO</Label>
        <Tx x={40} y={80} s={64} wt={900} glow={C.red} w={1620}>Nvidia'nın bilançosu ve piyasanın tepkisi</Tx>
      </Card>
      <div style={{position: 'absolute', left: 560, top: 720, width: 800, height: 120, borderRadius: 60, background: `linear-gradient(135deg, ${C.red}, #b8323d)`, boxShadow: `0 0 50px ${C.red}77`, opacity: p(T(14, 2), 0.4),
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 50, color: '#fff', letterSpacing: 3}}>KANALA ABONE OL</div>
    </Shell>
  );
};

// ---------------------------------------------------------------- ticker
const TICK = ['S&P 500 7.561,67', 'NASDAQ 25.136', 'NİKKEİ −%2,4', 'KOSPİ −%3,6', 'BIST 100 11.841,81', 'USD/TL 50,39', 'GRAM ALTIN ≈6.270 ₺', 'ONS ALTIN ≈3.860 $', 'BRENT 95,84 $', 'ABD 10Y %5,13'];
const Ticker3: React.FC<{total: number}> = ({total}) => {
  const f = useCurrentFrame();
  const IW = 440, CW = IW * TICK.length;
  const x = -((f * 2.4) % CW);
  const row = (k: number) => TICK.map((s, i) => (
    <div key={k + '-' + i} style={{width: IW, flex: 'none', textAlign: 'center', fontFamily: FONT, fontSize: 26, fontWeight: 800, color: C.gold2, letterSpacing: 1}}>{s}<span style={{color: C.line, marginLeft: 24}}>|</span></div>
  ));
  return (
    <>
      <div style={{position: 'absolute', left: 0, bottom: 0, width: 1920, height: 66, background: 'linear-gradient(180deg, rgba(4,10,20,.94), rgba(3,8,16,.98))', borderTop: `2px solid ${C.gold}66`}}>
        <div style={{position: 'absolute', left: 430, right: 0, top: 0, bottom: 0, overflow: 'hidden'}}>
          <div style={{display: 'flex', alignItems: 'center', height: '100%', transform: `translateX(${x}px)`}}>{row(0)}{row(1)}</div>
        </div>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 430, background: 'linear-gradient(90deg, #04101f 80%, rgba(4,16,31,0))', display: 'flex', alignItems: 'center', paddingLeft: 40, fontFamily: FONT, fontWeight: 800, fontSize: 21, letterSpacing: 2, color: C.gold}}>YATIRIM TAVSİYESİ DEĞİLDİR</div>
      </div>
      <div style={{position: 'absolute', left: 0, bottom: 0, height: 5, width: (f / total) * 1920, background: `linear-gradient(90deg, ${C.gold}, ${C.gold2})`, boxShadow: `0 0 18px ${C.gold}`}} />
    </>
  );
};

// ---------------------------------------------------------------- birleşim
const SCENES: {C: React.FC; from: number}[] = [
  {C: S1, from: 0}, {C: S2, from: paras[1].start}, {C: S3, from: A(1, 6)}, {C: S4, from: paras[2].start}, {C: S5, from: paras[3].start}, {C: S6, from: paras[4].start}, {C: S7, from: paras[5].start},
  {C: S8, from: paras[6].start}, {C: S9, from: paras[7].start}, {C: S10, from: paras[8].start}, {C: S11, from: paras[9].start}, {C: S12, from: paras[10].start}, {C: S13, from: paras[11].start},
  {C: S14, from: paras[12].start}, {C: S15, from: paras[13].start}, {C: S16, from: paras[14].start},
];
const TT = 14;
const transitions: any[] = [
  slide({direction: 'from-right'}), fade(), slide({direction: 'from-bottom'}), wipe({direction: 'from-left'}), slide({direction: 'from-right'}), fade(), slide({direction: 'from-right'}),
  wipe({direction: 'from-bottom'}), fade(), slide({direction: 'from-left'}), fade(), slide({direction: 'from-right'}), wipe({direction: 'from-left'}), slide({direction: 'from-bottom'}), fade(),
];
export const EnfVideo3: React.FC = () => (
  <>
    <Bg total={ENF3_TOTAL} />
    <TransitionSeries>
      {SCENES.flatMap(({C: Sc, from}, i) => {
        const a = fr(from);
        const b = i + 1 < SCENES.length ? fr(SCENES[i + 1].from) : ENF3_TOTAL;
        const last = i === SCENES.length - 1;
        const out = [<TransitionSeries.Sequence key={'s' + i} durationInFrames={Math.max(TT + 1, b - a + (last ? 0 : TT))}><Sc /></TransitionSeries.Sequence>];
        if (!last) out.push(<TransitionSeries.Transition key={'t' + i} presentation={transitions[i % transitions.length]} timing={springTiming({config: {damping: 200}, durationInFrames: TT})} />);
        return out;
      })}
    </TransitionSeries>
    <Ticker3 total={ENF3_TOTAL} />
  </>
);
