import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import fedData from './short_fed_tcmb.json';
import yarinData from './short_yarin.json';
import borsaData from './short_borsa.json';
import {Captions, Card, Fade, SEnd, ShortBg, VBar} from './Short';
import {Arrow, C, FONT, Pill, Tx, clamp, fmt, useTL} from './ui';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
type D = typeof fedData;
export const totalFrames = (d: {total: number}) => Math.ceil(d.total * FPS);
const st = (d: D, seg: number, i: number) => d.segments[seg].sentences[i].start;

const Title: React.FC<{children: string; s?: number}> = ({children, s = 92}) => {
  const {p} = useTL();
  return (
    <>
      <Tx x={60} y={170} w={960} s={s} wt={900} o={p(0, 0.4)} ls={-2}>{children}</Tx>
      <div style={{position: 'absolute', left: 60, top: 170 + s * 1.2, width: 330 * p(0.15, 0.6), height: 8, borderRadius: 4, background: `linear-gradient(90deg, ${C.gold2}, ${C.gold})`, boxShadow: `0 0 24px ${C.gold}`}} />
    </>
  );
};

const Chip: React.FC<{x: number; y: number; w: number; h?: number; t0: number; col: string; children: React.ReactNode; s?: number}> = ({x, y, w, h = 70, t0, col, children, s = 30}) => {
  const {p, pop} = useTL();
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: h / 2, opacity: p(t0, 0.3), transform: `scale(${0.9 + 0.1 * pop(t0)})`,
      background: col + '28', border: `2px solid ${col}88`, boxShadow: `0 0 40px ${col}33`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: FONT, fontWeight: 900, fontSize: s, color: C.white, letterSpacing: 1}}>{children}</div>
  );
};

const Shell: React.FC<{data: D; children: React.ReactNode}> = ({data, children}) => <>{children}<Captions caps={data.captions} /></>;

// =============================================================== FED + TCMB
const FedA: React.FC = () => {
  const {t, p} = useTL();
  const d = fedData as D;
  const t25 = st(d, 0, 1), t50 = st(d, 0, 3), tW = st(d, 0, 2), tL = st(d, 0, 4), tS = st(d, 0, 5);
  const base = 880, sc = 400;
  const bar = (x: number, v: number, col: string, t0: number, lab: string, fin: string) => {
    const q = p(t0, 0.9);
    return (
      <>
        <VBar x={x} base={base} w={330} h={sc * (v / 100) * q} color={col} />
        <Tx x={x} y={base - sc * (v / 100) * q - 96} w={330} s={78} wt={900} glow={col} o={clamp(q * 3)} style={{textAlign: 'center'}}>{q >= 1 ? fin : '%' + Math.round(v * q)}</Tx>
        <Tx x={x} y={base + 20} w={330} s={38} wt={700} c={C.grey} o={p(t0 - 0.2, 0.4)} style={{textAlign: 'center'}}>{lab}</Tx>
      </>
    );
  };
  return (
    <Fade>
      <Title s={74}>FED ARALIK TOPLANTISI</Title>
      <Tx x={60} y={282} s={40} wt={500} c={C.grey} o={p(0.4, 0.4)}>8–9 Aralık • faiz artışı fiyatlaması</Tx>
      <div style={{position: 'absolute', left: 80, top: base, width: 920 * p(0.5, 0.6), height: 5, background: C.line, borderRadius: 3}} />
      {bar(130, 100, C.gold, t25 + 0.6, '25 baz puan', '%100')}
      {bar(610, 13, C.red, t50 + 0.6, '50 baz puan', '≈%13')}
      <Chip x={60} y={955} w={960} h={150} t0={tW + 0.3} col={C.gold}>{''}</Chip>
      <div style={{opacity: p(tW + 0.3, 0.3) * (1 - p(tL - 0.2, 0.2))}}>
        <Tx x={100} y={972} s={30} wt={800} c={C.gold} ls={2}>WALLER</Tx>
        <Tx x={100} y={1016} w={880} s={40} wt={800}>Çekirdek %0,3 gelirse yarım puanı düşünür</Tx>
      </div>
      <div style={{opacity: p(tL, 0.3) * (1 - p(tS - 0.2, 0.2))}}>
        <Tx x={100} y={972} s={30} wt={800} c={C.gold} ls={2}>LOGAN</Tx>
        <Tx x={100} y={1016} w={880} s={40} wt={800}>En az iki çeyrek puanlık artış daha gerekli</Tx>
      </div>
      <div style={{opacity: p(tS, 0.3)}}>
        <Tx x={60} y={990} w={960} s={50} wt={900} glow={C.gold} c={C.gold2} style={{textAlign: 'center'}}>Tek artış değil, artış dizisi</Tx>
      </div>
    </Fade>
  );
};

const FedB: React.FC = () => {
  const {t, p, pop} = useTL();
  const d = fedData as D;
  const tT = st(d, 1, 1) + 5.6;
  return (
    <Fade>
      <Title s={88}>İKİ MERKEZ BANKASI</Title>
      <Tx x={60} y={300} s={42} wt={500} c={C.grey} o={p(0.4, 0.4)}>Ters yönler</Tx>
      <Card x={60} y={380} w={960} h={330} t0={0.4} accent={C.red}>
        <Tx x={60} y={34} s={44} wt={900} c={C.red} ls={2}>FED</Tx>
        <Tx x={60} y={110} s={130} wt={900} glow={C.red} ls={-3}>+25 bp</Tx>
        <Arrow x={800} y={175} size={190} color={C.red} up bounce={18} o={p(0.7, 0.4)} />
        <Tx x={60} y={260} w={700} s={32} wt={600} c={C.grey}>Aralık'ta artış fiyatlandı</Tx>
      </Card>
      <Card x={60} y={750} w={960} h={350} t0={tT} accent={C.green}>
        <Tx x={60} y={34} s={44} wt={900} c={C.green} ls={2}>TCMB</Tx>
        <Tx x={60} y={110} s={130} wt={900} glow={C.green} ls={-3}>-150 bp</Tx>
        <Arrow x={800} y={175} size={190} color={C.green} up={false} bounce={18} o={p(tT + 0.3, 0.4)} />
        <Tx x={60} y={265} w={720} s={32} wt={600} c={C.grey}>10 Aralık'ta indirim bekleniyor • politika faizi %35,5</Tx>
      </Card>
    </Fade>
  );
};

// =============================================================== YARIN
const YarA: React.FC = () => {
  const {t, p} = useTL();
  const d = yarinData as D;
  const s1 = st(d, 0, 1), s3 = st(d, 0, 3), s4 = st(d, 0, 4), s5 = st(d, 0, 5);
  const pulse = 0.5 + 0.5 * Math.sin(Math.max(0, t - s3) * 5);
  return (
    <Fade>
      <Title>YARIN NE OLACAK?</Title>
      <Card x={60} y={310} w={960} h={190} t0={s1} accent={C.gold}>
        <Tx x={50} y={28} s={30} wt={800} c={C.gold} ls={2}>BUGÜN</Tx>
        <Tx x={50} y={76} w={870} s={44} wt={800}>İşsizlik başvuruları • konut satışları</Tx>
        <Tx x={50} y={134} w={870} s={28} wt={500} c={C.grey} o={p(st(d, 0, 2), 0.3)}>Konut satışı beklentisi: 3,85 milyon</Tx>
      </Card>
      <div style={{position: 'absolute', left: 60, top: 540, width: 960, height: 230, opacity: p(s3, 0.3), transform: `scale(${0.94 + 0.06 * p(s3, 0.4)})`, borderRadius: 32,
        background: 'linear-gradient(155deg, rgba(60,40,48,.95), rgba(30,20,38,.95))', border: `3px solid ${C.gold}${Math.round(110 + 120 * pulse).toString(16)}`, boxShadow: `0 0 ${50 + 50 * pulse}px ${C.gold}55`}}>
        <Tx x={50} y={30} s={32} wt={900} c={C.red} ls={2}>YARIN • ASIL VERİ</Tx>
        <Tx x={50} y={84} w={860} s={62} wt={900} glow={C.gold}>ABD Üretici Fiyat Endeksi (ÜFE)</Tx>
      </div>
      <Card x={60} y={810} w={960} h={160} t0={s4} accent={C.red}>
        <Tx x={50} y={26} s={28} wt={800} c={C.grey} ls={2}>EYLÜL ÜFE VERİSİ</Tx>
        <Tx x={50} y={74} w={870} s={44} wt={900}>Aralık 2022'den beri en sert artış</Tx>
      </Card>
      <Chip x={60} y={1010} w={960} h={84} t0={s5} col={C.gold} s={30}>ÜFE → FED'İN DÜŞÜNCESİNİ ERKEN GÖSTERİR</Chip>
    </Fade>
  );
};

const YarB: React.FC = () => {
  const {t, p} = useTL();
  const d = yarinData as D;
  const s1 = st(d, 1, 1), s3 = st(d, 1, 3), s4 = st(d, 1, 4);
  const rows = (items: [string, boolean, string, number][], y0: number) => items.map(([lab, up, col, t0], i) => (
    <React.Fragment key={i}>
      <Arrow x={130} y={y0 + i * 100 + 36} size={74} color={col} up={up} bounce={6} o={p(t0, 0.3)} />
      <Tx x={210} y={y0 + i * 100 + 6} w={780} s={40} wt={800} o={p(t0, 0.3)}>{lab}</Tx>
    </React.Fragment>
  ));
  return (
    <Fade>
      <Title>İKİ SENARYO</Title>
      <Card x={60} y={310} w={960} h={370} t0={s1 - 0.3} accent={C.red}>
        <Tx x={50} y={30} s={48} wt={900} c={C.red} glow={C.red}>ÜFE yüksek gelirse</Tx>
      </Card>
      {rows([['Yarım puan artış ihtimali güçlenir', true, C.red, s1 + 0.4], ['Dolar yükselir', true, C.green, st(d, 1, 2) + 0.2], ['Altın ve teknoloji hisseleri baskı görür', false, C.red, st(d, 1, 2) + 1.8]], 410)}
      <Card x={60} y={720} w={960} h={290} t0={s3 - 0.3} accent={C.green}>
        <Tx x={50} y={30} s={48} wt={900} c={C.green} glow={C.green}>ÜFE düşük gelirse</Tx>
      </Card>
      {rows([['Fed daha ölçülü gider', false, C.green, s3 + 0.5], ['Altın ve borsa nefes alabilir', true, C.green, s3 + 2.4]], 820)}
      <Chip x={60} y={1045} w={960} h={84} t0={s4} col={C.gold} s={32}>YARIN AKŞAM NET CEVAP OLACAK</Chip>
    </Fade>
  );
};

// =============================================================== BORSA
const BorA: React.FC = () => {
  const {p} = useTL();
  const d = borsaData as D;
  const s1 = st(d, 0, 1), s2 = st(d, 0, 2), s3 = st(d, 0, 3), s4 = st(d, 0, 4), s5 = st(d, 0, 5);
  const base = 740, k = 140;
  const groups = [
    {n: 'Dow', x: 120, a: -0.30, b: 0.49, ta: s1 + 0.8, tb: s5 + 0.2},
    {n: 'S&P 500', x: 420, a: -0.38, b: 1.31, ta: s1 + 2.0, tb: s3 + 0.2},
    {n: 'Nasdaq', x: 720, a: -0.74, b: 1.60, ta: s1 + 1.4, tb: s4 + 0.2},
  ];
  return (
    <Fade>
      <Title>ABD BORSASI</Title>
      <Chip x={60} y={300} w={300} h={64} t0={s1} col={C.red} s={28}>SALI ▼</Chip>
      <Chip x={380} y={300} w={380} h={64} t0={s2} col={C.green} s={28}>ÇARŞAMBA ▲</Chip>
      <div style={{position: 'absolute', left: 70, top: base - 2, width: 940 * p(0.5, 0.6), height: 4, background: C.line, borderRadius: 2}} />
      {groups.map((g) => [[g.a, g.ta, g.x], [g.b, g.tb, g.x + 130]].map(([v, t0, x], bi) => {
        const q = p(t0 as number, 0.8); const h = Math.abs(v as number) * k * q; const col = (v as number) > 0 ? C.green : C.red;
        return (
          <React.Fragment key={g.n + bi}>
            {(v as number) > 0 ? <VBar x={x as number} base={base} w={120} h={h} color={col} /> :
              <div style={{position: 'absolute', left: x as number, top: base, width: 120, height: h, borderRadius: '0 0 24px 24px', background: `linear-gradient(0deg, ${col}, ${col}99)`, boxShadow: `0 0 50px ${col}66`}} />}
            <Tx x={(x as number) - 20} y={(v as number) > 0 ? base - h - 56 : base + h + 10} w={160} s={34} wt={900} o={clamp(q * 3)} style={{textAlign: 'center'}}>{((v as number) > 0 ? '+' : '-') + fmt(Math.abs(v as number) * q, 2, '%')}</Tx>
          </React.Fragment>
        );
      }))}
      {groups.map((g) => <Tx key={g.n} x={g.x - 20} y={950} w={300} s={38} wt={800} o={p(g.ta - 0.2, 0.4)} style={{textAlign: 'center'}}>{g.n}</Tx>)}
      <Tx x={60} y={1030} w={960} s={36} wt={700} c={C.gold} o={p(s3, 0.4)} style={{textAlign: 'center'}}>S&P 500: 7.619 • Nasdaq: 25.466 • Dow: 52.486</Tx>
    </Fade>
  );
};

const BorB: React.FC = () => {
  const {t, p} = useTL();
  const d = borsaData as D;
  const s1 = st(d, 1, 1), s2 = st(d, 1, 2), s3 = st(d, 1, 3);
  const frac = 7619 / 7818; const q = p(s3 + 0.3, 1.4);
  return (
    <Fade>
      <Tx x={60} y={170} s={44} wt={900} c={C.gold} ls={3} o={p(0, 0.3)}>COREWEAVE</Tx>
      <Tx x={60 - 90 * (1 - p(0.2, 0.5))} y={235} s={152} wt={900} c={C.green} glow={C.green} ls={-4} o={p(0.2, 0.4)}>BEKLENTİ</Tx>
      <Tx x={60 - 90 * (1 - p(0.5, 0.5))} y={385} s={152} wt={900} c={C.green} glow={C.green} ls={-4} o={p(0.5, 0.4)}>AŞILDI</Tx>
      <Arrow x={880} y={520} size={170} color={C.green} up bounce={16} o={p(0.8, 0.4)} />
      <Chip x={60} y={640} w={960} h={96} t0={s2} col={C.red} s={34}>FAİZ ARTIŞI BEKLENTİSİ ↑</Chip>
      <Chip x={60} y={760} w={960} h={96} t0={s2 + 1.6} col={C.green} s={34}>YAPAY ZEKÂ HABERLERİ DAHA BASKIN</Chip>
      <div style={{opacity: p(s3, 0.4)}}>
        <div style={{position: 'absolute', left: 60, top: 940, width: 960, height: 64, borderRadius: 32, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)'}} />
        <div style={{position: 'absolute', left: 60, top: 940, width: 960 * frac * q, height: 64, borderRadius: 32, background: `linear-gradient(90deg, ${C.green}88, ${C.green})`, boxShadow: `0 0 55px ${C.green}77, inset 0 2px 0 rgba(255,255,255,.3)`}} />
        <Tx x={60} y={1020} s={32} wt={800} c={C.green}>Bugün 7.619</Tx>
        <Tx x={1020} y={1020} w={500} align="right" s={32} wt={800} c={C.gold}>Rekor (Ekim) 7.818</Tx>
        <Tx x={60} y={1075} w={960} s={44} wt={900} style={{textAlign: 'center'}}>Rekora yaklaşık %2,5 uzaklık</Tx>
      </div>
    </Fade>
  );
};

// =============================================================== kompozisyonlar
const make = (data: D, A: React.FC, B: React.FC): React.FC => () => {
  const seg = data.segments; const total = totalFrames(data);
  return (
    <>
      <ShortBg />
      <Tx x={540} y={60} w={1080} align="center" s={26} wt={600} c={C.grey}>Yatırım tavsiyesi değildir</Tx>
      <Sequence from={fr(seg[0].start)} durationInFrames={fr(seg[1].start) - fr(seg[0].start)}><A /></Sequence>
      <Sequence from={fr(seg[1].start)} durationInFrames={fr(data.endCardStart) - fr(seg[1].start)}><B /></Sequence>
      <Sequence from={fr(data.endCardStart)} durationInFrames={total - fr(data.endCardStart)}><SEnd /></Sequence>
      <Captions caps={data.captions} />
    </>
  );
};
export const ShortFed = make(fedData as D, FedA, FedB);
export const ShortYarin = make(yarinData as D, YarA, YarB);
export const ShortBorsa = make(borsaData as D, BorA, BorB);
export const FED_FRAMES = totalFrames(fedData), YARIN_FRAMES = totalFrames(yarinData), BORSA_FRAMES = totalFrames(borsaData);
