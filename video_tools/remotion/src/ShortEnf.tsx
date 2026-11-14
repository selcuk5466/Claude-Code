import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import hookD from './short_enf_hook.json';
import fiveD from './short_enf_5of7.json';
import asgD from './short_enf_asgari.json';
import berD from './short_enf_berlin.json';
import yanD from './short_enf_yanilsama.json';
import {Captions, Card, Fade, ShortBg} from './Short';
import {Chip, Src, Title, Stat, win} from './ShortG2';
import {C, FONT, Tx, clamp, fmt, useTL} from './ui';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
type D = typeof hookD;
const frames = (d: {total: number}) => Math.ceil(d.total * FPS);
const st = (d: D, seg: number, i: number) => d.segments[seg].sentences[i].start;

const EndEnf: React.FC = () => {
  const {t, p} = useTL();
  const s = 1 + 0.05 * Math.sin(t * 5) * p(1.2, 0.4);
  return (
    <AbsoluteFill>
      <Tx x={60} y={330} w={960} s={112} wt={900} o={p(0.1, 0.5)} glow={C.gold} ls={-3} lh={1.1}>{'TAM VİDEO\nKANALDA'}</Tx>
      <div style={{position: 'absolute', left: 60, top: 600, width: 400 * p(0.5, 0.6), height: 9, borderRadius: 5, background: `linear-gradient(90deg, ${C.gold2}, ${C.gold})`, boxShadow: `0 0 26px ${C.gold}`}} />
      <Tx x={60} y={640} w={960} s={44} wt={600} c={C.grey} o={p(0.9, 0.5)}>{'Cebimdekini kim çaldı?\nMaaş • Kira • Gıda • Enflasyon'}</Tx>
      <div style={{position: 'absolute', left: 540 - 300 * s, top: 800, width: 600 * s, height: 150 * s, borderRadius: 34, background: `linear-gradient(145deg, ${C.red}, #c13a48)`, opacity: p(1.2, 0.4), boxShadow: `0 0 80px ${C.red}99`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 78 * s, color: C.white, letterSpacing: 2}}>ABONE OL</div>
      <Tx x={540} y={1010} w={960} align="center" s={38} wt={800} c={C.gold2} o={p(1.8, 0.5)}>Yarın: Enflasyon kimi zengin ediyor?</Tx>
      <Tx x={540} y={1080} w={960} align="center" s={34} wt={600} c={C.grey} o={p(2.2, 0.5)}>Yatırım tavsiyesi değildir</Tx>
    </AbsoluteFill>
  );
};

// ------------------------------------------------------------ 1) HOOK
const HookA: React.FC = () => {
  const {t, p, pop} = useTL(); const d = hookD as D;
  const jAma = st(d, 0, 1), jKim = st(d, 0, 2), jSup = st(d, 1, 0), jKimse = st(d, 1, 1), jKanit = st(d, 1, 2);
  const lost = p(jAma + 1.2, 1.4);
  const shown = 1000 - 229 * lost;
  return (
    <Fade>
      <Tx x={540} y={190} w={960} align="center" s={40} wt={800} c={C.grey} ls={3} o={p(0.1, 0.4)}>CEBİMDEKİ PARA</Tx>
      <Tx x={540} y={250} w={960} align="center" s={220} wt={900} c={C.gold2} glow={C.gold} ls={-6} o={p(0.1, 0.4)}>{'1.000 ₺'}</Tx>
      <Tx x={540} y={500} w={960} align="center" s={44} wt={800} c={C.green} o={p(0.5, 0.4) * (1 - p(jAma + 1.0, 0.3))}>AYNI</Tx>
      <div style={{opacity: p(jAma + 0.6, 0.4)}}>
        <Tx x={540} y={470} w={960} align="center" s={34} wt={700} c={C.grey}>ama alabildiğin şey:</Tx>
        <Tx x={540} y={520} w={960} align="center" s={130} wt={900} c={C.red} glow={C.red} ls={-3}>{fmt(shown, 0, '≈ ', ' ₺')}</Tx>
      </div>
      <Chip y={700} h={72} t0={jAma + 0.2} col={C.red} s={30}>MARKET  •  BENZİN  •  EKMEK</Chip>
      <div style={{opacity: win(p, jKim, jSup)}}>
        <Tx x={540} y={820} w={960} align="center" s={96} wt={900} c={C.white} glow={C.red} ls={-2}>CEBİMDEKİNİ{'\n'}KİM ÇALDI?</Tx>
      </div>
      <div style={{opacity: win(p, jSup)}}>
        <div style={{position: 'absolute', left: 90, top: 790, width: 900, height: 150, border: `8px solid ${C.red}`, borderRadius: 18, transform: `rotate(-3deg) scale(${0.8 + 0.2 * pop(jSup)})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 68, color: C.red, letterSpacing: 3, textShadow: `0 0 30px ${C.red}88`}}>SÜPHELİ: ENFLASYON</div>
      </div>
      <Chip y={975} h={64} t0={jKimse} col={C.grey} s={26}>KAPI KIRILMADI • HESAPTAN PARA ÇIKMADI</Chip>
      <Chip y={1055} h={64} t0={jKanit} col={C.gold} s={26}>KANIT: 7 ÜRÜNLÜK ALIŞVERİŞ LİSTESİ</Chip>
    </Fade>
  );
};

// ------------------------------------------------------------ 2) 7 ÜRÜNDEN 5'İ
const ITEMS = [
  {n: 'Kıyma (1 kg)', a: 485, b: 600, ok: true}, {n: 'Netflix Standart', a: 289.99, b: 389.99, ok: true},
  {n: 'Benzin (1 lt)', a: 53.75, b: 71.2, ok: false}, {n: 'Motorin (1 lt)', a: 57.61, b: 95.2, ok: false},
  {n: 'Dolar', a: 42.25, b: 50.36, ok: false}, {n: 'İstanbul bileti', a: 35, b: 46.2, ok: false}, {n: 'Halk Ekmek', a: 10, b: 12.5, ok: false},
];
const FiveA: React.FC = () => {
  const {t, p, pop} = useTL(); const d = fiveD as D;
  const j0 = st(d, 0, 0), j1 = st(d, 0, 1), j2 = st(d, 0, 2), j3 = st(d, 0, 3);
  const times = [j2 + 0.3, j2 + 2.4, j3 + 0.2, j3 + 0.9, j3 + 1.6, j3 + 2.3, j3 + 2.9];
  const left = 1000 - (t > times[0] ? 600 : 0) - (t > times[1] ? 390 : 0);
  return (
    <Fade>
      <Title>{'1.000 ₺ İLE\nBU YIL NE ALIRSIN?'}</Title>
      <Tx x={60} y={400} s={30} wt={800} c={C.grey} ls={2} o={p(j0, 0.3)}>BUGÜNÜN FİYATLARI</Tx>
      <Tx x={1020} y={392} w={500} align="right" s={44} wt={900} c={left < 100 ? C.red : C.gold2} o={p(j0, 0.3)}>{'KALAN: ' + fmt(left, 0) + ' ₺'}</Tx>
      {ITEMS.map((it, i) => {
        const y = 460 + i * 88; const t0 = j0 + 0.3 + i * 0.25;
        const m = p(times[i], 0.3);
        const col = it.ok ? C.green : C.red;
        return (
          <div key={i} style={{opacity: p(t0, 0.3)}}>
            <div style={{position: 'absolute', left: 60, top: y, width: 960, height: 76, borderRadius: 20, background: 'rgba(255,255,255,.06)', border: `2px solid ${m > 0 ? col + 'aa' : 'rgba(255,255,255,.1)'}`, boxShadow: m > 0 ? `0 0 34px ${col}44` : undefined}} />
            <Tx x={86} y={y + 16} s={34} wt={800} c={m > 0 && !it.ok ? C.grey : C.white}>{it.n}</Tx>
            <Tx x={560} y={y + 20} w={180} align="right" s={28} wt={600} c={C.grey} style={{textDecoration: 'line-through'}}>{fmt(it.a, it.a % 1 ? 2 : 0) + ' ₺'}</Tx>
            <Tx x={770} y={y + 14} w={190} align="right" s={38} wt={900} c={C.white}>{fmt(it.b, it.b % 1 ? 2 : 0) + ' ₺'}</Tx>
            <div style={{position: 'absolute', left: 840, top: y + 12, width: 170, height: 52, borderRadius: 26, background: col, opacity: m, transform: `scale(${0.7 + 0.3 * pop(times[i])})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 22, color: C.white}}>{it.ok ? 'ALINDI' : 'ALINAMADI'}</div>
          </div>
        );
      })}
      <Src t0={1.0}>Ekonomim, Doğruhaber, Sözcü, T24 • 13 Kasım 2025 → 2026 (liste aynı)</Src>
    </Fade>
  );
};

// ------------------------------------------------------------ 3) ASGARİ ÜCRET
const AsgA: React.FC = () => {
  const {t, p, pop} = useTL(); const d = asgD as D;
  const j = (i: number) => st(d, 0, i);
  const k = 28;
  return (
    <Fade>
      <Title>{'ASGARİ ÜCRET\nZAMMI ERİDİ'}</Title>
      <Tx x={60} y={420} s={28} wt={800} c={C.grey} ls={2} o={p(0.2, 0.3)}>ARALIK 2025 → EKİM 2026 FİYAT ARTIŞI</Tx>
      <Chip x={60} y={470} w={460} h={86} t0={0.3} col={C.red} s={34}>%24,32 (Ara–Eyl)</Chip>
      <Tx x={540} y={480} w={60} align="center" s={64} wt={900} o={p(0.6, 0.3)}>+</Tx>
      <Chip x={560} y={470} w={460} h={86} t0={0.6} col={C.red} s={34}>%2,58 (Ekim)</Chip>
      <Tx x={540} y={580} w={960} align="center" s={140} wt={900} c={C.red} glow={C.red} ls={-4} o={p(j(1) + 1.4, 0.4) * (1 - p(j(3) + 0.9, 0.3))}>{'%' + fmt(27.5 * p(j(1) + 1.4, 0.9), 1)}</Tx>
      <Tx x={540} y={725} w={960} align="center" s={32} wt={700} c={C.grey} o={p(j(1) + 2.0, 0.4) * (1 - p(j(3) + 0.9, 0.3))}>fiyatlar ocaktan bu yana</Tx>
      <div style={{opacity: p(j(2), 0.4)}}>
        <Tx x={60} y={810} s={34} wt={800}>Asgari ücret zammı</Tx>
        <div style={{position: 'absolute', left: 60, top: 860, width: 900 * 27.01 / 30 * p(j(2), 0.9), height: 64, borderRadius: 32, background: `linear-gradient(90deg, ${C.green}88, ${C.green})`, boxShadow: `0 0 40px ${C.green}66`}} />
        <Tx x={1000} y={866} w={300} align="right" s={44} wt={900} glow={C.green}>%27,01</Tx>
        <Tx x={60} y={945} s={34} wt={800}>Fiyat artışı</Tx>
        <div style={{position: 'absolute', left: 60, top: 995, width: 900 * 27.5 / 30 * p(j(2) + 0.3, 0.9), height: 64, borderRadius: 32, background: `linear-gradient(90deg, ${C.red}88, ${C.red})`, boxShadow: `0 0 40px ${C.red}66`}} />
        <Tx x={1000} y={1001} w={300} align="right" s={44} wt={900} glow={C.red}>%27,5</Tx>
      </div>
      <div style={{position: 'absolute', left: 120, top: 640, width: 840, height: 130, border: `8px solid ${C.red}`, borderRadius: 18, opacity: p(j(3) + 1.0, 0.3), transform: `rotate(-3deg) scale(${0.8 + 0.2 * pop(j(3) + 1.0)})`, background: C.bg + 'ee',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 46, color: C.red, letterSpacing: 1, whiteSpace: "nowrap"}}>ALIM GÜCÜ ≈ 99,6 → ZAM ERİDİ</div>
      <Src t0={1}>TÜİK, Çalışma Bakanlığı • hesap: 1,2432 × 1,0258 • Ocak = 100</Src>
    </Fade>
  );
};

// ------------------------------------------------------------ 4) BERLİN 1923
const BerA: React.FC = () => {
  const {t, p, pop} = useTL(); const d = berD as D;
  const j = (i: number) => st(d, 0, i);
  const q = p(j(1) + 4.5, 2.0);
  const val = 160 * Math.pow(200e9 / 160, q);
  const label = q >= 1 ? '200.000.000.000' : fmt(Math.round(val), 0);
  return (
    <Fade>
      <Title>{'1923 ALMANYASI:\nBİR SOMUN EKMEK'}</Title>
      <Card x={60} y={440} w={960} h={190} t0={j(1)} accent={C.green}>
        <Tx x={44} y={28} s={26} wt={800} c={C.green} ls={3}>BERLİN • 1922 SONU</Tx>
        <Tx x={44} y={72} s={92} wt={900} glow={C.green}>≈ 160 mark</Tx>
      </Card>
      <Tx x={540} y={655} w={960} align="center" s={90} wt={900} c={C.gold2} o={p(j(1) + 4.5, 0.3)}>↓</Tx>
      <Card x={60} y={770} w={960} h={240} t0={j(1) + 4.5} accent={C.red}>
        <Tx x={44} y={28} s={26} wt={800} c={C.red} ls={3}>BERLİN • 1923 SONU</Tx>
        <Tx x={44} y={76} w={880} s={q >= 1 ? 78 : 92} wt={900} c={C.red} glow={C.red} ls={-2}>{label + ' mark'}</Tx>
      </Card>
      <Chip y={1040} h={70} t0={j(2) + 0.2} col={C.gold} s={28}>MAAŞ ALINCA HEMEN HARCAMAK İÇİN KOŞTULAR</Chip>
      <Src t0={1.2}>Tarihsel aktarımlar (yaklaşık değerler) • Weimar hiperenflasyonu</Src>
    </Fade>
  );
};

// ------------------------------------------------------------ 5) PARA YANILSAMASI
const YanA: React.FC = () => {
  const {t, p} = useTL(); const d = yanD as D;
  const j = (i: number) => st(d, 0, i);
  const rows = [
    {n: 'Dolar', v: -8.92, t0: 1.0}, {n: 'Külçe altın', v: -11.7, t0: 1.7}, {n: 'BIST 100', v: -15.09, t0: 2.3}, {n: 'Konut', v: -5.7, t0: 2.9}, {n: 'Mevduat', v: 0.29, t0: j(0) + 5.9},
  ];
  const zero = 580;
  return (
    <Fade>
      <Title>{'ENFLASYONU KİM\nYENDİ? (REEL GETİRİ)'}</Title>
      <div style={{position: 'absolute', left: zero, top: 430, width: 4, height: 560, background: C.grey, opacity: p(0.3, 0.4)}} />
      <Tx x={zero} y={395} w={300} align="center" s={26} wt={800} c={C.grey} o={p(0.3, 0.4)}>ENFLASYON = 0</Tx>
      {rows.map((r, i) => {
        const y = 450 + i * 108; const q = p(r.t0, 0.8); const w = Math.abs(r.v) * 19 * q;
        const col = r.v < 0 ? C.red : C.green;
        return (
          <React.Fragment key={i}>
            <Tx x={60} y={y + 14} w={300} s={34} wt={800} o={p(r.t0 - 0.1, 0.3)}>{r.n}</Tx>
            <div style={{position: 'absolute', left: r.v < 0 ? zero - w : zero + 4, top: y, width: w, height: 76, borderRadius: 16, background: `linear-gradient(${r.v < 0 ? '270deg' : '90deg'}, ${col}, ${col}99)`, boxShadow: `0 0 36px ${col}66`}} />
            <Tx x={r.v < 0 ? zero + 20 : zero + w + 30} y={y + 12} w={300} s={42} wt={900} c={col} glow={col} o={clamp(q * 3)}>{(r.v > 0 ? '+%' : '-%') + fmt(Math.abs(r.v) * q, 2)}</Tx>
          </React.Fragment>
        );
      })}
      <div style={{opacity: win(p, j(0) + 15.2)}}>
        <Chip y={1010} h={90} t0={j(0) + 15.2} col={C.gold} s={28}>PARA YANILSAMASI: RAKAM BÜYÜR, ALIM GÜCÜ KÜÇÜLÜR</Chip>
      </div>
      <Src t0={1}>TÜİK, TCMB • Ekim 2026, son 12 ay, enflasyondan arındırılmış</Src>
    </Fade>
  );
};

const make = (data: D, scenes: React.FC[]): React.FC => () => {
  const seg = data.segments; const total = frames(data);
  return (
    <>
      <ShortBg />
      <Tx x={540} y={60} w={1080} align="center" s={26} wt={600} c={C.grey}>Yatırım tavsiyesi değildir</Tx>
      {scenes.map((S, i) => {
        const from = fr(seg[Math.min(i, seg.length - 1)].start); const to = fr(data.endCardStart);
        return <Sequence key={i} from={from} durationInFrames={to - from}><S /></Sequence>;
      })}
      <Sequence from={fr(data.endCardStart)} durationInFrames={total - fr(data.endCardStart)}><EndEnf /></Sequence>
      <Captions caps={data.captions} />
    </>
  );
};
export const EnfHook = make(hookD as D, [HookA]);
export const EnfFive = make(fiveD as D, [FiveA]);
export const EnfAsg = make(asgD as D, [AsgA]);
export const EnfBer = make(berD as D, [BerA]);
export const EnfYan = make(yanD as D, [YanA]);
export const ENF_SHORT_FRAMES = {hook: frames(hookD), five: frames(fiveD), asg: frames(asgD), ber: frames(berD), yan: frames(yanD)};
