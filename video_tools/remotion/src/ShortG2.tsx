import React from 'react';
import {Sequence} from 'remotion';
import fedD from './short_g2_fed.json';
import altinD from './short_g2_altin.json';
import nvidiaD from './short_g2_nvidia.json';
import petrolD from './short_g2_petrol.json';
import turkiyeD from './short_g2_turkiye.json';
import {Captions, Card, Fade, SEnd, ShortBg, VBar} from './Short';
import {Arrow, C, FONT, Tx, clamp, fmt, useTL} from './ui';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
type D = typeof fedD;
const frames = (d: {total: number}) => Math.ceil(d.total * FPS);
const st = (d: D, seg: number, i: number) => d.segments[seg].sentences[i].start;

const Title: React.FC<{children: string; s?: number}> = ({children, s = 88}) => {
  const {p} = useTL();
  const lines = children.split('\n').length;
  return (
    <>
      <Tx x={60} y={150} w={960} s={s} wt={900} o={p(0, 0.4)} ls={-2} lh={1.08}>{children}</Tx>
      <div style={{position: 'absolute', left: 60, top: 150 + s * 1.08 * lines + 14, width: 330 * p(0.15, 0.6), height: 8, borderRadius: 4, background: `linear-gradient(90deg, ${C.gold2}, ${C.gold})`, boxShadow: `0 0 24px ${C.gold}`}} />
    </>
  );
};

const Chip: React.FC<{x?: number; y: number; w?: number; h?: number; t0: number; t1?: number; col: string; children: React.ReactNode; s?: number}> = ({x = 60, y, w = 960, h = 78, t0, t1, col, children, s = 32}) => {
  const {p, pop} = useTL();
  const o = p(t0, 0.3) * (t1 === undefined ? 1 : 1 - p(t1, 0.3));
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: h / 2, opacity: o, transform: `scale(${0.92 + 0.08 * pop(t0)})`,
      background: col + '28', border: `2px solid ${col}88`, boxShadow: `0 0 40px ${col}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      fontFamily: FONT, fontWeight: 900, fontSize: s, color: C.white, letterSpacing: 1, padding: '0 24px'}}>{children}</div>
  );
};

const win = (p: (a: number, d: number) => number, a: number, b?: number) => p(a, 0.3) * (b === undefined ? 1 : 1 - p(b, 0.3));

const HProb: React.FC<{y: number; label: string; v: number; fin: string; col: string; t0: number}> = ({y, label, v, fin, col, t0}) => {
  const {p} = useTL(); const q = p(t0, 1.0);
  return (
    <>
      <Tx x={60} y={y} s={40} wt={800} o={p(t0 - 0.2, 0.3)}>{label}</Tx>
      <div style={{position: 'absolute', left: 60, top: y + 58, width: 960, height: 70, borderRadius: 35, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', opacity: p(t0 - 0.2, 0.3)}} />
      <div style={{position: 'absolute', left: 60, top: y + 58, width: Math.max(0, 960 * (v / 100) * q), height: 70, borderRadius: 35, background: `linear-gradient(90deg, ${col}88, ${col})`, boxShadow: `0 0 50px ${col}77, inset 0 2px 0 rgba(255,255,255,.3)`}} />
      <Tx x={1000} y={y + 62} w={400} align="right" s={56} wt={900} o={clamp(q * 3)} glow={col} c={C.white}>{q >= 1 ? fin : '%' + Math.round(v * q)}</Tx>
    </>
  );
};

const Stat: React.FC<{x: number; y: number; w: number; h: number; t0: number; col: string; label: string; value: string; sub?: string; vs?: number}> = ({x, y, w, h, t0, col, label, value, sub, vs = 64}) => {
  const {p} = useTL();
  return (
    <Card x={x} y={y} w={w} h={h} t0={t0} accent={col}>
      <Tx x={34} y={26} w={w - 50} s={22} wt={800} c={C.grey} ls={2} o={p(t0 + 0.1, 0.3)}>{label}</Tx>
      <Tx x={34} y={66} w={w - 50} s={vs} wt={900} glow={col} o={p(t0 + 0.1, 0.3)} ls={-1}>{value}</Tx>
      {sub && <Tx x={34} y={h - 54} w={w - 50} s={24} wt={600} c={C.grey} o={p(t0 + 0.2, 0.3)}>{sub}</Tx>}
    </Card>
  );
};

// ================================================================ FED
const FedA: React.FC = () => {
  const {t, p} = useTL(); const d = fedD as D;
  const j1 = st(d, 0, 1), j2 = st(d, 0, 2), j3 = st(d, 0, 3), j4 = st(d, 0, 4), j5 = st(d, 0, 5), j6 = st(d, 0, 6), j7 = st(d, 0, 7);
  const speakers = [
    {who: 'HAMMACK • CLEVELAND FED', txt: 'Enflasyondaki iyileşme durdu, daha sıkı politika gerek', t0: j1, y: 380},
    {who: 'GOOLSBEE • CHICAGO FED', txt: 'Faiz biraz daha artmalı', t0: j2, y: 580},
    {who: 'DALY • SAN FRANCISCO FED', txt: 'Faiz biraz daha artmalı', t0: j2 + 0.5, y: 780},
  ];
  return (
    <Fade>
      <Title>{'FED\'DEN ÜST ÜSTE\nSERT MESAJLAR'}</Title>
      {speakers.map((sp, i) => (
        <div key={i} style={{opacity: 1 - p(j3 - 0.1, 0.3)}}>
          <Card x={60} y={sp.y} w={960} h={170} t0={sp.t0} accent={C.gold}>
            <Tx x={44} y={26} s={24} wt={800} c={C.gold} ls={2}>{sp.who}</Tx>
            <Tx x={44} y={70} w={880} s={40} wt={800}>{sp.txt}</Tx>
          </Card>
        </div>
      ))}
      <div style={{opacity: win(p, j3)}}>
        <HProb y={420} label="+25 baz puan artış (Aralık)" v={100} fin="%100" col={C.gold} t0={j3} />
        <HProb y={600} label="+50 baz puan artış" v={15} fin="≈%15" col={C.red} t0={j4} />
      </div>
      <Stat x={60} y={850} w={300} h={250} t0={j5} col={C.red} label="ABD 10 YILLIK" value="%5,13" sub="3 haftanın zirvesi" />
      <Stat x={390} y={850} w={300} h={250} t0={j6} col={C.green} label="DOLAR ENDEKSİ" value="≈103" sub="19 ayın zirvesi" />
      <Stat x={720} y={850} w={300} h={250} t0={j7} col={C.gold} label="AMB 17 ARALIK" value="%93" sub="artış ihtimali" />
    </Fade>
  );
};

// ================================================================ ALTIN
const AltinA: React.FC = () => {
  const {t, p, pop} = useTL(); const d = altinD as D;
  const j1 = st(d, 0, 1), j2 = st(d, 0, 2), j3 = st(d, 0, 3), j4 = st(d, 0, 4), j5 = st(d, 0, 5);
  const drop = 1 - p(j4, 0.3);
  return (
    <Fade>
      <Title>{'ALTIN 13 AYIN\nDİBİNDE'}</Title>
      <div style={{opacity: drop}}>
        <Tx x={60} y={400} s={190} wt={900} c={C.red} glow={C.red} ls={-5} o={p(0.2, 0.4)}>{'-%' + fmt(3 * p(0.3, 0.8), 0)}</Tx>
        <Arrow x={880} y={500} size={170} color={C.red} up={false} bounce={16} o={p(0.8, 0.4)} />
        <Tx x={60} y={625} s={32} wt={700} c={C.grey} o={p(0.8, 0.4)}>dün tek günde • 13 ayın en düşük seviyesi</Tx>
      </div>
      <div style={{opacity: win(p, j4, j5)}}>
        <Chip x={60} y={420} w={300} h={150} t0={j4 + 0.2} col={C.gold} s={34}>FAİZ ↑</Chip>
        <Chip x={390} y={420} w={300} h={150} t0={j4 + 1.0} col={C.green} s={34}>DOLAR ↑</Chip>
        <Chip x={720} y={420} w={300} h={150} t0={j4 + 1.8} col={C.red} s={34}>PETROL ↑</Chip>
        <Tx x={540} y={600} w={960} align="center" s={34} wt={700} c={C.grey} o={p(j4 + 2.2, 0.4)}>Enflasyon endişesi canlı kalıyor</Tx>
      </div>
      <div style={{opacity: win(p, j5)}}>
        <Chip x={60} y={430} w={960} h={190} t0={j5} col={C.red} s={38}>{'3.850 $ ALTINDA HAFTALIK KAPANIŞ\n= DAHA FAZLA DÜŞÜŞ RİSKİ'}</Chip>
      </div>
      <Stat x={60} y={700} w={960} h={170} t0={j1} col={C.red} label="ONS ALTIN • BUGÜN SABAH" value="≈3.885–3.890 $" vs={78} />
      <Chip y={900} t0={j2} col={C.red} s={30}>HAFTALIK BAZDA SERT KAYIP</Chip>
      <Stat x={60} y={1000} w={960} h={150} t0={j3} col={C.grey} label="GÜMÜŞ" value="≈50 $  (-%3'ten fazla)" vs={54} />
    </Fade>
  );
};

// ================================================================ NVIDIA
const NvA: React.FC = () => {
  const {t, p} = useTL(); const d = nvidiaD as D;
  const j = (i: number) => st(d, 0, i);
  const A = [0, j(4) - 0.2], B = [j(4) - 0.1, j(8) - 0.2], Cc = [j(8) - 0.1, 9999];
  const ph = (a: number, b: number) => clamp((t - a) / 0.3) * (1 - clamp((t - b) / 0.3));
  return (
    <Fade>
      <div style={{opacity: ph(-1, A[1])}}>
        <Title>{'NVIDIA\'DA\nCEO İSTİFASI'}</Title>
        <Stat x={60} y={440} w={960} h={190} t0={0.3} col={C.red} label="JENSEN HUANG" value="CEO görevinden istifa etti" vs={50} />
        <Stat x={60} y={660} w={960} h={190} t0={j(1)} col={C.red} label="HİSSE AÇILIŞTA" value="-%14'e kadar düştü" sub="Piyasa değeri 4 trilyon $ altına indi" vs={60} />
        <Stat x={60} y={880} w={960} h={190} t0={j(2)} col={C.gold} label="GEÇİCİ CEO" value="Colette Kress" sub="Bilanço: 17 Kasım" vs={60} />
      </div>
      <div style={{opacity: ph(B[0], B[1])}}>
        <Title>{'ABD BORSASI\nDÜŞÜŞLE KAPANDI'}</Title>
        <Stat x={60} y={440} w={470} h={210} t0={j(5)} col={C.red} label="S&P 500" value="-%0,35" vs={78} />
        <Stat x={550} y={440} w={470} h={210} t0={j(5) + 0.5} col={C.red} label="DOW JONES" value="-%0,36" vs={78} />
        <Chip y={690} t0={j(6)} col={C.gold} s={30}>TAHVİL FAİZİ ve PETROL BASKIYI ARTIRDI</Chip>
        <Chip y={790} t0={j(7)} col={C.gold} s={30}>İŞSİZLİK BAŞVURULARI: 200.000 (beklenti üstü)</Chip>
      </div>
      <div style={{opacity: ph(Cc[0], Cc[1])}}>
        <Title>{'BUGÜN ASYA\nTOPARLANDI'}</Title>
        <Stat x={60} y={440} w={470} h={210} t0={j(9)} col={C.green} label="NIKKEI" value="+%1,48" vs={78} />
        <Stat x={550} y={440} w={470} h={210} t0={j(9) + 0.6} col={C.green} label="KOSPI" value="+%1,97" vs={78} />
        <Chip y={690} t0={j(10)} col={C.green} s={32}>ABD VADELİ İŞLEMLERİ POZİTİF</Chip>
      </div>
    </Fade>
  );
};

// ================================================================ PETROL
const PetA: React.FC = () => {
  const {t, p, pop} = useTL(); const d = petrolD as D;
  const j = (i: number) => st(d, 0, i);
  return (
    <Fade>
      <Title>{'PETROL: TRUMP\'TAN\nSERT SÖZ'}</Title>
      <div style={{opacity: 1 - p(j(4) - 0.1, 0.3)}}>
        <Card x={60} y={420} w={960} h={240} t0={0.3} accent={C.gold}>
          <Tx x={44} y={26} s={24} wt={800} c={C.gold} ls={2}>BAŞKAN TRUMP • DÜN</Tx>
          <Tx x={44} y={72} w={880} s={52} wt={900} glow={C.gold}>“İran'la anlaşmaya ihtiyacımız yok”</Tx>
        </Card>
      </div>
      <Stat x={60} y={700} w={470} h={230} t0={j(1)} col={C.green} label="BRENT" value="95,82 $" sub="+%3,3 • dün kapanış" vs={66} />
      <Stat x={550} y={700} w={470} h={230} t0={j(2)} col={C.green} label="WTI" value="88,74 $" sub="dün kapanış" vs={66} />
      <Chip y={970} t0={j(3)} col={C.red} s={30}>HÜRMÜZ'DE 4 TANKER VURULDU</Chip>
      <div style={{opacity: win(p, j(4))}}>
        <Chip y={400} h={72} t0={j(4)} col={C.gold} s={30}>MÜZAKERELERDE İLERLEME YOK</Chip>
        <Chip y={490} h={72} t0={j(5)} col={C.green} s={28}>İKİNCİ HAFTALIK DÜŞÜŞ YOLUNDA</Chip>
        <Chip y={580} h={72} t0={j(6)} col={C.red} s={26}>PETROL ↑ → ENFLASYON ↑ → FED'İN İŞİ ZOR</Chip>
      </div>
    </Fade>
  );
};
const PetB: React.FC = () => {
  const {p} = useTL(); const d = petrolD as D;
  const j = (i: number) => st(d, 1, i);
  const items = [
    {who: 'İRAN', txt: 'Saldırıya uğrarsa savaşı bölge dışına taşıyacağını söyledi', t0: j(1), y: 400, col: C.red},
    {who: 'İSRAİL', txt: 'Olası saldırılar için hazırlıkları artırdığı bildirildi', t0: j(2), y: 620, col: C.gold},
    {who: 'ABD', txt: "İran'ın Qeshm Adası'na sınırlı saldırılar düzenledi", t0: j(3), y: 840, col: C.gold},
  ];
  return (
    <Fade>
      <Title>{'JEOPOLİTİK\nRİSKLER SÜRÜYOR'}</Title>
      {items.map((it, i) => (
        <Card key={i} x={60} y={it.y} w={960} h={190} t0={it.t0} accent={it.col}>
          <Tx x={44} y={24} s={26} wt={900} c={it.col} ls={3}>{it.who}</Tx>
          <Tx x={44} y={70} w={880} s={38} wt={800}>{it.txt}</Tx>
        </Card>
      ))}
    </Fade>
  );
};

// ================================================================ TÜRKİYE
const TrA: React.FC = () => {
  const {t, p} = useTL(); const d = turkiyeD as D;
  const j = (i: number) => st(d, 0, i);
  const base = 1000, k = 13;
  const groups = [
    {y: '2026', o: 28, n: 29.5, t0: j(1)}, {y: '2027', o: 15, n: 21, t0: j(2)}, {y: '2028', o: 9, n: 13.5, t0: j(2) + 1.2}, {y: '2029', o: 0, n: 9, t0: j(3)},
  ];
  return (
    <Fade>
      <Title>{'TCMB TAHMİNİ\nYÜKSELTTİ'}</Title>
      <Chip x={60} y={410} w={440} h={56} t0={0.4} col={C.grey} s={24}>ESKİ (AĞUSTOS)</Chip>
      <Chip x={540} y={410} w={480} h={56} t0={0.6} col={C.gold} s={24}>YENİ (KASIM)</Chip>
      <div style={{position: 'absolute', left: 60, top: base, width: 960 * p(0.5, 0.6), height: 4, background: C.line, borderRadius: 2}} />
      {groups.map((g, i) => {
        const x = 90 + i * 240; const q = p(g.t0, 0.8);
        return (
          <React.Fragment key={g.y}>
            {g.o > 0 && <VBar x={x} base={base} w={100} h={g.o * k * q} color={C.grey} />}
            <VBar x={x + 110} base={base} w={100} h={g.n * k * q} color={C.gold} />
            {g.o > 0 && <Tx x={x - 20} y={base - g.o * k * q - 52} w={140} s={28} wt={800} c={C.grey} o={clamp(q * 3)} style={{textAlign: 'center'}}>{'%' + fmt(g.o * q, g.o % 1 ? 1 : 0)}</Tx>}
            <Tx x={x + 90} y={base - g.n * k * q - 56} w={140} s={34} wt={900} glow={C.gold} o={clamp(q * 3)} style={{textAlign: 'center'}}>{'%' + fmt(g.n * q, g.n % 1 ? 1 : 0)}</Tx>
            <Tx x={x} y={base + 16} w={210} s={32} wt={700} c={C.grey} o={p(g.t0 - 0.1, 0.3)} style={{textAlign: 'center'}}>{g.y + (g.o === 0 ? ' (yeni)' : '')}</Tx>
          </React.Fragment>
        );
      })}
      <div style={{opacity: win(p, j(4), j(5))}}><Chip y={1075} t0={j(4)} col={C.red} s={26}>DÜŞÜŞ SÜRÜYOR AMA ENERJİ YAVAŞLATTI</Chip></div>
      <div style={{opacity: win(p, j(5))}}><Chip y={1075} t0={j(5)} col={C.red} s={26}>PETROL FİYATI VARSAYIMI YUKARI ÇEKİLDİ</Chip></div>
    </Fade>
  );
};
const TrB: React.FC = () => {
  const {t, p, count} = useTL(); const d = turkiyeD as D;
  const j = (i: number) => st(d, 1, i);
  return (
    <Fade>
      <Title>{'BORSA İSTANBUL\nGÜÇLÜ KAPANDI'}</Title>
      <Tx x={60} y={430} s={34} wt={800} c={C.grey} ls={3} o={p(j(1) - 0.2, 0.3)}>BIST 100 • DÜN KAPANIŞ</Tx>
      <Tx x={60} y={480} s={210} wt={900} glow={C.green} ls={-6} o={p(j(1) - 0.2, 0.3)}>{count(j(1), 1.4, 11000, 11811, 0, '11.811')}</Tx>
      <Tx x={60} y={720} s={120} wt={900} c={C.green} glow={C.green} o={p(j(1) + 0.6, 0.3)}>{'+%' + fmt(1.24 * p(j(1) + 0.6, 1.0), 2)}</Tx>
      <Chip y={900} t0={j(2)} col={C.gold} s={30}>15 EKİM'DEN BERİ EN YÜKSEK KAPANIŞ</Chip>
      <Chip y={1000} t0={j(3)} col={C.green} s={30}>GÜN İÇİ ZİRVE: 11.898</Chip>
    </Fade>
  );
};

// ================================================================ kompozisyonlar
const make = (data: D, scenes: React.FC[]): React.FC => () => {
  const seg = data.segments; const total = frames(data);
  return (
    <>
      <ShortBg />
      <Tx x={540} y={60} w={1080} align="center" s={26} wt={600} c={C.grey}>Yatırım tavsiyesi değildir</Tx>
      {scenes.map((S, i) => {
        const from = fr(seg[i].start); const to = i + 1 < seg.length ? fr(seg[i + 1].start) : fr(data.endCardStart);
        return <Sequence key={i} from={from} durationInFrames={to - from}><S /></Sequence>;
      })}
      <Sequence from={fr(data.endCardStart)} durationInFrames={total - fr(data.endCardStart)}><SEnd /></Sequence>
      <Captions caps={data.captions} />
    </>
  );
};
export const G2Fed = make(fedD as D, [FedA]);
export const G2Altin = make(altinD as D, [AltinA]);
export const G2Nvidia = make(nvidiaD as D, [NvA]);
export const G2Petrol = make(petrolD as D, [PetA, PetB]);
export const G2Turkiye = make(turkiyeD as D, [TrA, TrB]);
export const G2_FRAMES = {fed: frames(fedD), altin: frames(altinD), nvidia: frames(nvidiaD), petrol: frames(petrolD), turkiye: frames(turkiyeD)};
