import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import nvD from './short_p_nvidia.json';
import nqD from './short_p_nasdaq.json';
import auD from './short_p_altin.json';
import cnD from './short_p_cin.json';
import {Captions, Card, Fade, ShortBg} from './Short';
import {Chip, Src, Title, Stat} from './ShortG2';
import {C, FONT, Tx, clamp, fmt, useTL} from './ui';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
type D = typeof nvD;
const frames = (d: {total: number}) => Math.ceil(d.total * FPS);
const at = (d: D, i: number, j: number) => d.segments[i].start + d.segments[i].sentences[j].start;

const EndP: React.FC = () => {
  const {t, p} = useTL();
  const s = 1 + 0.05 * Math.sin(t * 5) * p(1.2, 0.4);
  return (
    <AbsoluteFill>
      <Tx x={60} y={330} w={960} s={112} wt={900} o={p(0.1, 0.5)} glow={C.gold} ls={-3} lh={1.1}>{'TAM ÖZET\nKANALDA'}</Tx>
      <div style={{position: 'absolute', left: 60, top: 600, width: 400 * p(0.5, 0.6), height: 9, borderRadius: 5, background: `linear-gradient(90deg, ${C.gold2}, ${C.gold})`, boxShadow: `0 0 26px ${C.gold}`}} />
      <Tx x={60} y={640} w={960} s={44} wt={600} c={C.grey} o={p(0.9, 0.5)}>{'Nvidia • Çin • Fed • Altın\nBIST • Haftanın takvimi'}</Tx>
      <div style={{position: 'absolute', left: 540 - 300 * s, top: 800, width: 600 * s, height: 150 * s, borderRadius: 34, background: `linear-gradient(145deg, ${C.red}, #c13a48)`, opacity: p(1.2, 0.4), boxShadow: `0 0 80px ${C.red}99`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 78 * s, color: C.white, letterSpacing: 2}}>ABONE OL</div>
      <Tx x={540} y={1010} w={960} align="center" s={38} wt={800} c={C.gold2} o={p(1.8, 0.5)}>Yarın: Nvidia bilançosu ve tepki</Tx>
      <Tx x={540} y={1080} w={960} align="center" s={34} wt={600} c={C.grey} o={p(2.2, 0.5)}>Yatırım tavsiyesi değildir</Tx>
    </AbsoluteFill>
  );
};

const Bar: React.FC<{y: number; t0: number; label: string; v: number; max: number; txt: string; col: string; h?: number}> = ({y, t0, label, v, max, txt, col, h = 70}) => {
  const {p} = useTL(); const q = p(t0, 0.9);
  return (
    <>
      <Tx x={60} y={y - 46} s={32} wt={800} o={p(t0 - 0.1, 0.3)}>{label}</Tx>
      <div style={{position: 'absolute', left: 60, top: y, width: 960, height: h, borderRadius: h / 2, background: 'rgba(255,255,255,.07)', opacity: p(t0 - 0.1, 0.3)}} />
      <div style={{position: 'absolute', left: 60, top: y, width: Math.max(0, 960 * (v / max) * q), height: h, borderRadius: h / 2, background: `linear-gradient(90deg, ${col}88, ${col})`, boxShadow: `0 0 44px ${col}77`}} />
      <Tx x={1000} y={y + 8} w={420} align="right" s={46} wt={900} c={C.white} glow={col} o={clamp(q * 3)}>{txt}</Tx>
    </>
  );
};
const Stamp2: React.FC<{y: number; t0: number; col: string; s?: number; h?: number; children: string}> = ({y, t0, col, s = 64, h = 130, children}) => {
  const {p, pop} = useTL();
  return (
    <div style={{position: 'absolute', left: 90, top: y, width: 900, height: h, border: `8px solid ${col}`, borderRadius: 18, opacity: p(t0, 0.3), transform: `rotate(-3deg) scale(${0.8 + 0.2 * pop(t0)})`, background: C.bg + 'ee',
      display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: FONT, fontWeight: 900, fontSize: s, color: col, letterSpacing: 2, textShadow: `0 0 30px ${col}88`}}>{children}</div>
  );
};

// ------------------------------------------------------------ 1) NVIDIA İSTİFA
const NvidiaA: React.FC = () => {
  const {p, t} = useTL(); const d = nvD as D;
  const j1 = at(d, 1, 0), j2 = at(d, 1, 1), j3 = at(d, 1, 2);
  const hook = 1 - p(j1 - 0.5, 0.3);
  return (
    <Fade>
      <div style={{opacity: hook}}>
        <Tx x={60} y={150} s={64} wt={900} o={p(0.1, 0.3)}>GÜNEY KORE BORSASI</Tx>
        <Tx x={60} y={240} s={260} wt={900} c={C.red} glow={C.red} ls={-8} o={p(0.2, 0.3)}>{'−%' + fmt(3.6 * Math.min(1, t / 1.4), 1)}</Tx>
        <Tx x={60} y={540} s={40} wt={800} c={C.grey} o={p(1.2, 0.3)}>KOSPİ • 5.100 PUAN</Tx>
      </div>
      <div style={{opacity: p(j1 - 0.3, 0.3)}}>
        <Title>{'NVIDIA\'DA KURUCU\nİSTİFASI'}</Title>
      </div>
      <Stat x={60} y={440} w={960} h={190} t0={j1} col={C.red} label="GEÇEN HAFTA" value="Jensen Huang istifa etti" vs={58} />
      <Stat x={60} y={660} w={960} h={190} t0={j2} col={C.gold} label="11 KASIM • SEC BİLDİRİMİ" value="Kurul istifayı kabul etti" vs={56} />
      <Stat x={60} y={880} w={960} h={190} t0={j3} col={C.blue} label="YENİ DURUM" value="Geçici CEO: Colette Kress" vs={56} />
      <Src t0={1}>ABD Menkul Kıymetler Komisyonu (8-K), CNBC, AP • 16 Kasım 2026</Src>
    </Fade>
  );
};

// ------------------------------------------------------------ 2) NASDAQ vs NVIDIA
const NasdaqA: React.FC = () => {
  const {p} = useTL(); const d = nqD as D; const j = (i: number) => at(d, 0, i);
  const zero = 600, sc = 28;
  return (
    <Fade>
      <Title>{'NVIDIA −%12,75\nNASDAQ +%2,27'}</Title>
      <div style={{position: 'absolute', left: zero - 2, top: 440, width: 4, height: 330, background: C.grey, opacity: p(0.3, 0.3)}} />
      {[{n: 'NVIDIA', v: -12.75, y: 470}, {n: 'NASDAQ', v: 2.27, y: 640}].map((r, i) => {
        const q = p(0.3 + i * 1.0, 0.9); const w = Math.abs(r.v) * sc * q; const c = r.v < 0 ? C.red : C.green;
        return (
          <React.Fragment key={r.n}>
            <div style={{position: 'absolute', left: r.v < 0 ? zero - w : zero + 4, top: r.y, width: w, height: 100, borderRadius: 20, background: `linear-gradient(${r.v < 0 ? 270 : 90}deg, ${c}, ${c}99)`, boxShadow: `0 0 50px ${c}77`}} />
            <Tx x={60} y={r.y + 26} w={300} s={40} wt={900} o={p(0.2 + i, 0.3)}>{r.n}</Tx>
            <Tx x={r.v < 0 ? zero + 20 : zero + w + 24} y={r.y + 22} w={360} s={52} wt={900} c={c} glow={c} o={clamp(q * 3)}>{(r.v > 0 ? '+%' : '−%') + fmt(Math.abs(r.v), 2)}</Tx>
          </React.Fragment>
        );
      })}
      <Tx x={60} y={790} s={26} wt={700} c={C.grey} o={p(1.5, 0.3)}>GEÇEN HAFTA</Tx>
      <Chip y={835} h={76} t0={j(1)} col={C.green} s={30}>ENDEKSİN GERİ KALANI AYAKTA KALDI</Chip>
      <Chip y={925} h={76} t0={j(2)} col={C.red} s={30}>BUGÜN NASDAQ VADELİLERİ DÜŞÜŞTE</Chip>
      <Stamp2 y={1018} h={86} t0={j(4)} col={C.gold2} s={40}>CEVAP: YARIN GECE</Stamp2>
      <Src t0={1}>CNBC, AP • 7–13 Kasım haftalık değişim</Src>
    </Fade>
  );
};

// ------------------------------------------------------------ 3) ALTIN + BİTCOİN
const AltinA: React.FC = () => {
  const {p} = useTL(); const d = auD as D; const j = (i: number) => at(d, 0, i);
  return (
    <Fade>
      <Title>{'ALTIN 13 AYIN\nDİBİNDE'}</Title>
      <Tx x={60} y={430} s={36} wt={800} c={C.grey} ls={2} o={p(0.3, 0.3)}>ONS ALTIN • BUGÜN</Tx>
      <Tx x={60} y={485} s={118} wt={900} c={C.gold2} glow={C.gold} ls={-4} o={p(0.4, 0.4)}>3.850–3.870 $</Tx>
      <Chip y={650} h={78} t0={1.2} col={C.red} s={30}>EKİM 2025'TEN BERİ EN DÜŞÜK</Chip>
      <div style={{opacity: p(j(1) - 0.2, 0.4)}}>
        <Tx x={60} y={780} s={36} wt={800} c={C.grey} ls={2}>BİTCOİN • HAFTA SONU</Tx>
      </div>
      <Bar y={880} t0={j(2)} label="Bitcoin hafta sonu dibi" v={62} max={66} txt="≈ 62.000 $" col={C.red} h={56} />
      <Bar y={1000} t0={j(2) + 2.0} label="Sonra toparlandı" v={65} max={66} txt="65.000 $+" col={C.green} h={56} />
      <Src t0={1}>FinanceFeeds, Foreks, Cryptoticker • 14–16 Kasım 2026</Src>
    </Fade>
  );
};

// ------------------------------------------------------------ 4) ÇİN VERİSİ
const PairBar: React.FC<{y: number; t0: number; label: string; act: number; exp: number; max: number}> = ({y, t0, label, act, exp, max}) => {
  const {p} = useTL(); const q = p(t0, 0.9);
  return (
    <div style={{opacity: p(t0 - 0.1, 0.3)}}>
      <Tx x={60} y={y} s={36} wt={900}>{label}</Tx>
      <div style={{position: 'absolute', left: 60, top: y + 56, width: 760 * (exp / max) * q, height: 38, borderRadius: 19, background: C.grey + 'aa'}} />
      <Tx x={60 + 760 * (exp / max) + 18} y={y + 52} w={300} s={30} wt={700} c={C.grey}>{'Beklenti %' + fmt(exp, 1)}</Tx>
      <div style={{position: 'absolute', left: 60, top: y + 108, width: 760 * (act / max) * q, height: 46, borderRadius: 23, background: `linear-gradient(90deg, ${C.red}aa, ${C.red})`, boxShadow: `0 0 34px ${C.red}77`}} />
      <Tx x={60 + 760 * (act / max) + 18} y={y + 106} w={300} s={36} wt={900} c={C.red}>{'Gerçek %' + fmt(act, 1)}</Tx>
    </div>
  );
};
const CinA: React.FC = () => {
  const {p} = useTL(); const d = cnD as D; const j = (i: number) => at(d, 0, i);
  return (
    <Fade>
      <Title>{'ÇİN\'DEN BEKLENTİ\nALTI VERİ'}</Title>
      <PairBar y={440} t0={j(0)} label="SANAYİ ÜRETİMİ (YILLIK)" act={4.8} exp={5.3} max={6} />
      <PairBar y={680} t0={j(1)} label="PERAKENDE SATIŞLAR (YILLIK)" act={0.4} exp={0.8} max={6} />
      <Chip y={920} h={72} t0={j(2)} col={C.gold} s={28}>ÜSTELİK EKİMDE 1 HAFTALIK BAYRAM TATİLİ VARDI</Chip>
      <Stamp2 y={1010} h={100} t0={j(3)} col={C.red} s={42}>SABİT YATIRIM −%8,1</Stamp2>
      <Src t0={1}>Çin Ulusal İstatistik Bürosu (FXStreet, InvestingLive) • ekim verileri</Src>
    </Fade>
  );
};

const make = (data: D, S: React.FC): React.FC => () => {
  const total = frames(data);
  return (
    <>
      <ShortBg />
      <Tx x={540} y={60} w={1080} align="center" s={26} wt={600} c={C.grey}>Yatırım tavsiyesi değildir</Tx>
      <Sequence from={0} durationInFrames={fr(data.endCardStart)}><S /></Sequence>
      <Sequence from={fr(data.endCardStart)} durationInFrames={total - fr(data.endCardStart)}><EndP /></Sequence>
      <Captions caps={data.captions} />
    </>
  );
};
export const PNvidia = make(nvD as D, NvidiaA);
export const PNasdaq = make(nqD as D, NasdaqA);
export const PAltin = make(auD as D, AltinA);
export const PCin = make(cnD as D, CinA);
export const P_FRAMES = {nv: frames(nvD), nq: frames(nqD), au: frames(auD), cn: frames(cnD)};
