import React from 'react';
import {AbsoluteFill, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {AnimatedText} from 'remotion-bits';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {fade} from '@remotion/transitions/fade';
import {wipe} from '@remotion/transitions/wipe';
import {scaleLinear} from 'd3-scale';
import {line as d3line} from 'd3-shape';
import rough from 'roughjs';
import {CoinStack} from './Coins3D';
import D from './enf_sentences.json';
import {Bg, C, Card, FONT, Label, Shell, Tx, useTL} from './ui';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
export const ENF_TOTAL = Math.ceil(D.total * FPS);
type P = {start: number; end: number; sentences: number[]};
const paras = D.paras as P[];
// paragraf pi, cümle si'nin sahne başına göre zamanı (p0 = sahnenin ilk paragrafı)
const mk = (p0: number) => (pi: number, si = 0) => paras[pi].sentences[si] - paras[p0].start;

// ---------------------------------------------------------------- ortak parçalar
const Src: React.FC<{t0?: number; children: string}> = ({t0 = 0.8, children}) => {
  const {p} = useTL();
  return (
    <div style={{position: 'absolute', left: 110, top: 960, width: 1700, opacity: p(t0, 0.4) * 0.92, fontFamily: FONT, fontSize: 24, fontWeight: 600, color: C.grey}}>
      <span style={{color: C.gold, fontWeight: 800, letterSpacing: 2, marginRight: 14}}>KAYNAK</span>{children}
    </div>
  );
};

const Stat: React.FC<{x: number; y: number; w: number; h: number; t0: number; col: string; label: string; value: string; sub?: string; vs?: number}> = ({x, y, w, h, t0, col, label, value, sub, vs = 80}) => {
  const {p} = useTL();
  return (
    <Card x={x} y={y} w={w} h={h} t0={t0} accent={col}>
      <Label x={36} y={28} o={p(t0 + 0.1, 0.3)}>{label}</Label>
      <Tx x={36} y={sub ? 66 : 88} w={w - 60} s={vs} wt={900} glow={col} ls={-1} o={p(t0 + 0.1, 0.3)}>{value}</Tx>
      {sub && <Tx x={36} y={Math.min(h - 50, 66 + vs * 1.35 + 8)} w={w - 60} s={28} wt={600} c={C.grey} o={p(t0 + 0.2, 0.3)}>{sub}</Tx>}
    </Card>
  );
};

const Chip: React.FC<{x: number; y: number; w: number; h?: number; t0: number; col: string; children: React.ReactNode; s?: number}> = ({x, y, w, h = 84, t0, col, children, s = 28}) => {
  const {p, pop} = useTL();
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: h / 2, opacity: p(t0, 0.3), transform: `scale(${0.92 + 0.08 * pop(t0)})`,
      background: col + '28', border: `2px solid ${col}88`, boxShadow: `0 0 40px ${col}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      fontFamily: FONT, fontWeight: 900, fontSize: s, color: C.white, letterSpacing: 1, padding: '0 28px'}}>{children}</div>
  );
};

// yatay yüzde çubuğu: değer 'max'e göre ölçeklenir
const HBar: React.FC<{x: number; y: number; w: number; t0: number; label: string; val: number; max: number; txt: string; col: string; h?: number; ls?: number}> = ({x, y, w, t0, label, val, max, txt, col, h = 44, ls = 280}) => {
  const {p} = useTL();
  const bw = Math.max(6, (w - ls - 150) * (val / max) * p(t0, 0.9));
  return (
    <div style={{opacity: p(t0, 0.3)}}>
      <Tx x={x} y={y + 4} w={ls - 16} s={28} wt={800}>{label}</Tx>
      <div style={{position: 'absolute', left: x + ls, top: y, width: bw, height: h, borderRadius: 12, background: `linear-gradient(90deg, ${col}aa, ${col})`, boxShadow: `0 0 28px ${col}66`}} />
      <Tx x={x + ls + bw + 16} y={y + 2} w={200} s={34} wt={900} c={col}>{txt}</Tx>
    </div>
  );
};

const Stamp: React.FC<{x: number; y: number; t0: number; col: string; s?: number; rot?: number; children: React.ReactNode}> = ({x, y, t0, col, s = 64, rot = -6, children}) => {
  const {pop, p} = useTL();
  const sp = pop(t0);
  return (
    <div style={{position: 'absolute', left: x, top: y, padding: '10px 34px', border: `7px solid ${col}`, borderRadius: 16, color: col, fontFamily: FONT, fontWeight: 900, fontSize: s, letterSpacing: 4,
      opacity: p(t0, 0.12), transform: `rotate(${rot}deg) scale(${1.7 - 0.7 * sp})`, textShadow: `0 0 30px ${col}99`, boxShadow: `0 0 50px ${col}55`}}>{children}</div>
  );
};

// ---------------------------------------------------------------- sahne 1: kanca
const Sc1: React.FC = () => {
  const T = mk(0);
  const {p, t} = useTL();
  const q = Math.max(0, Math.min(1, (t - T(0, 2)) / 6));
  const power = 1000 - 229 * q * q; // 1000 -> 771
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 110, top: 150, width: 1100, fontFamily: FONT, fontWeight: 900, fontSize: 96, lineHeight: 1.05, color: C.white, letterSpacing: -2}}>
        <AnimatedText transition={{split: 'word', splitStagger: 3, y: [40, 0], opacity: [0, 1], blur: [14, 0], duration: 22, delay: Math.round(T(0, 0) * FPS)}}>CEBİMDEKİ PARA AYNI.</AnimatedText>
      </div>
      <div style={{position: 'absolute', left: 110, top: 360, width: 1100, fontFamily: FONT, fontWeight: 800, fontSize: 56, lineHeight: 1.1, color: C.grey}}>
        <AnimatedText transition={{split: 'word', splitStagger: 2, y: [30, 0], opacity: [0, 1], duration: 18, delay: Math.round(T(0, 1) * FPS)}}>Ama market, benzinlik, ekmek büfesi artık daha az şey veriyor.</AnimatedText>
      </div>
      <div style={{position: 'absolute', left: 110, top: 600, width: 1200, fontFamily: FONT, fontWeight: 900, fontSize: 104, lineHeight: 1.02, color: C.red, letterSpacing: -2, textShadow: `0 0 50px ${C.red}88`}}>
        <AnimatedText transition={{split: 'character', splitStagger: 1.2, scale: [1.5, 1], opacity: [0, 1], blur: [10, 0], duration: 16, delay: Math.round(T(0, 2) * FPS)}}>KİM ÇALDI?</AnimatedText>
      </div>
      {/* 3 boyutlu jeton yığını (three.js): değer aynı, alım gücü eriyor */}
      <div style={{position: 'absolute', left: 1000, top: 20, width: 800, height: 600, opacity: p(0.3, 0.6)}}>
        <CoinStack width={800} height={600} lostFrom={Math.round(T(0, 2) * FPS)} lostDur={150} />
      </div>
      <Tx x={1100} y={560} s={30} wt={900} c={C.gold2} w={700} o={p(0.8, 0.5)}>1.000 ₺ • NOMİNAL DEĞER AYNI</Tx>
      <div style={{position: 'absolute', left: 1100, top: 640, width: 700, opacity: p(T(0, 2) + 0.6, 0.5)}}>
        <Label x={0} y={0} c={C.grey}>ALIM GÜCÜ (GEÇEN YILIN FİYATLARIYLA)</Label>
        <div style={{position: 'absolute', left: 0, top: 44, width: 700, height: 26, borderRadius: 13, background: 'rgba(255,255,255,.1)'}} />
        <div style={{position: 'absolute', left: 0, top: 44, width: 700 * power / 1000, height: 26, borderRadius: 13, background: `linear-gradient(90deg, ${C.red}, ${C.gold})`, boxShadow: `0 0 26px ${C.red}88`}} />
        <Tx x={0} y={84} s={64} wt={900} c={C.red} glow={C.red}>{'≈ ' + Math.round(power).toLocaleString('tr-TR') + ' ₺'}</Tx>
      </div>
      <Stamp x={170} y={770} t0={T(1, 0)} col={C.red} s={72}>SÜPHELİ: ENFLASYON</Stamp>
      <Chip x={110} y={945} w={520} h={64} t0={T(1, 1)} col={C.gold} s={24}>HESAPTAN ÇIKAN: 0 TL</Chip>
      <Chip x={660} y={945} w={620} h={64} t0={T(1, 2)} col={C.green} s={24}>KANIT: ALIŞVERİŞ LİSTESİ</Chip>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- sepet verisi
type It = {n: string; a: number; b: number; col: string};
const ITEMS: It[] = [
  {n: '1 kg kıyma', a: 485, b: 600, col: C.red},
  {n: 'Netflix Standart', a: 289.99, b: 389.99, col: C.purple},
  {n: '1 litre benzin', a: 53.75, b: 71.2, col: C.gold},
  {n: '1 litre motorin', a: 57.61, b: 95.2, col: C.gold2},
  {n: '1 dolar', a: 42.25, b: 50.36, col: C.green},
  {n: 'İstanbul bileti', a: 35, b: 46.2, col: C.blue},
  {n: 'Halk Ekmek', a: 10, b: 12.5, col: C.grey},
];
const tl = (v: number) => v.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' ₺';

const Row: React.FC<{i: number; t0: number; mode: 'old' | 'new'}> = ({i, t0, mode}) => {
  const {p, pop} = useTL();
  const it = ITEMS[i];
  const y = 270 + i * 92;
  const o = p(t0, 0.3);
  const sp = pop(t0);
  return (
    <div style={{position: 'absolute', left: 110, top: y, width: 880, height: 78, borderRadius: 20, opacity: o, transform: `translateX(${(1 - sp) * -120}px)`,
      background: 'linear-gradient(155deg, rgba(30,62,104,.9), rgba(13,32,58,.9))', border: `2px solid ${it.col}66`, boxShadow: `0 0 30px ${it.col}22`}}>
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, borderRadius: '20px 0 0 20px', background: it.col}} />
      <Tx x={34} y={22} s={30} wt={800}>{it.n}</Tx>
      {mode === 'old'
        ? <Tx x={850} y={14} w={400} s={42} wt={900} align="right" c={C.white}>{tl(it.a)}</Tx>
        : <>
            <Tx x={560} y={24} w={200} s={26} wt={700} align="right" c={C.grey} style={{textDecoration: 'line-through'}}>{tl(it.a)}</Tx>
            <Tx x={850} y={14} w={260} s={42} wt={900} align="right" c={C.red} glow={C.red}>{tl(it.b)}</Tx>
          </>}
    </div>
  );
};

// bin liralık çubuk: toplam / 1000
const Budget: React.FC<{t0: number; total: number; col: string; over?: boolean}> = ({t0, total, col, over}) => {
  const {p} = useTL();
  const k = p(t0, 1.2);
  const scale = 640 / 1300; // 1300 TL = 640 px
  const w = total * scale * k;
  return (
    <div style={{position: 'absolute', left: 1080, top: 320, width: 740, opacity: p(t0 - 0.2, 0.4)}}>
      <Label x={0} y={0} c={C.grey}>CEBİNİZDEKİ 1.000 ₺</Label>
      <div style={{position: 'absolute', left: 0, top: 54, width: 700, height: 56, borderRadius: 14, background: 'rgba(255,255,255,.08)', border: '2px solid rgba(255,255,255,.15)'}} />
      <div style={{position: 'absolute', left: 0, top: 54, width: Math.min(1000 * scale, w), height: 56, borderRadius: 14, background: `linear-gradient(90deg, ${C.green}aa, ${C.green})`}} />
      {w > 1000 * scale && <div style={{position: 'absolute', left: 1000 * scale, top: 54, width: w - 1000 * scale, height: 56, borderRadius: '0 14px 14px 0', background: `linear-gradient(90deg, ${C.red}, ${C.red}cc)`, boxShadow: `0 0 30px ${C.red}99`}} />}
      <div style={{position: 'absolute', left: 1000 * scale - 2, top: 40, width: 4, height: 84, background: C.gold2, boxShadow: `0 0 16px ${C.gold2}`}} />
      <Tx x={1000 * scale} y={130} s={24} wt={800} c={C.gold2} w={160} align="center">1.000 ₺</Tx>
      <Tx x={0} y={190} s={72} wt={900} c={col} glow={col} ls={-1}>{tl(total * k)}</Tx>
      {!over
        ? <Tx x={0} y={290} s={36} wt={700} c={C.green}>{'Üstüne ' + tl(1000 - total) + ' kalıyor'}</Tx>
        : <Tx x={0} y={290} s={36} wt={700} c={C.red}>{tl(total - 1000) + ' açık veriyor'}</Tx>}
    </div>
  );
};

// ---------------------------------------------------------------- sahne 2: geçen yılın listesi
const Sc2: React.FC = () => {
  const T = mk(2);
  return (
    <Shell title="Geçen Yılın Alışveriş Listesi" sub="13 Kasım 2025 fiyatları">
      {ITEMS.map((_, i) => <Row key={i} i={i} t0={T(2, i + 2) > 0 ? T(2, i + 2) : T(2, 2)} mode="old" />)}
      <Budget t0={T(2, 9) - 0.2} total={973.6} col={C.white} />
      <Src>Ekonomim, Doğruhaber, Et ve Süt Kurumu, Sözcü, T24, BloombergHT • Kasım 2025</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 3: bugünün listesi
const Sc3: React.FC = () => {
  const T = mk(3);
  return (
    <Shell title="Bugünün Listesi" sub="14 Kasım 2026 fiyatları">
      {ITEMS.map((_, i) => <Row key={i} i={i} t0={T(3, i + 1)} mode="new" />)}
      <Budget t0={T(3, 8) - 0.2} total={1265.45} col={C.red} over />
      <Src>Politikam, Et ve Süt Kurumu, T24, Gzt, Aposto • 14 Kasım 2026</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 4: yedi üründen beşi
const Sc4: React.FC = () => {
  const T = mk(4);
  const {p, count, t} = useTL();
  const buy = [ITEMS[0], ITEMS[1]];
  const gone = ITEMS.slice(2);
  const scale = 760 / 1000;
  return (
    <Shell title="Bin Lira Artık Yetmiyor" sub="Aynı liste bir yılda pahalandı">
      <Stat x={110} y={270} w={560} h={300} t0={T(4, 0)} col={C.red} label="LİSTENİN FİYATI" value={count(T(4, 0) + 0.2, 1.2, 0, 30, 0, '+%30')} sub="bir yılda" vs={140} />
      <Card x={110} y={610} w={560} h={250} t0={T(4, 1)} accent={C.gold}>
        <Label x={36} y={28}>CEBİNİZDEKİ PARA</Label>
        <Tx x={36} y={80} s={110} wt={900} c={C.gold2} glow={C.gold}>1.000 ₺</Tx>
        <Tx x={36} y={200} s={26} wt={600} c={C.grey}>hâlâ aynı</Tx>
      </Card>
      {/* bütçe çubuğu: kıyma + Netflix doluyor */}
      <div style={{position: 'absolute', left: 740, top: 290, width: 1070, opacity: p(T(4, 2), 0.4)}}>
        <Label x={0} y={0}>BÜYÜK KALEMDEN BAŞLARSANIZ</Label>
        <div style={{position: 'absolute', left: 0, top: 50, width: 1000 * scale + 4, height: 70, borderRadius: 16, background: 'rgba(255,255,255,.08)', border: '2px solid rgba(255,255,255,.18)'}} />
        <div style={{position: 'absolute', left: 2, top: 52, width: 600 * scale * p(T(4, 2) + 0.4, 0.8), height: 66, borderRadius: '14px 0 0 14px', background: `linear-gradient(90deg, ${C.red}aa, ${C.red})`}} />
        <div style={{position: 'absolute', left: 2 + 600 * scale, top: 52, width: 389.99 * scale * p(T(4, 2) + 2.2, 0.8), height: 66, background: `linear-gradient(90deg, ${C.purple}aa, ${C.purple})`}} />
        <Tx x={14} y={66} s={30} wt={900} c="#fff" o={p(T(4, 2) + 0.8, 0.3)}>KIYMA 600 ₺</Tx>
        <Tx x={2 + 600 * scale + 10} y={66} s={28} wt={900} c="#fff" o={p(T(4, 2) + 2.6, 0.3)}>NETFLIX 390 ₺</Tx>
        <Tx x={0} y={140} s={34} wt={700} c={C.grey} o={p(T(4, 2) + 3.4, 0.4)}>Kalan: 10 ₺, başka hiçbir şeye yetmiyor</Tx>
      </div>
      {gone.map((it, i) => {
        const t0 = T(4, 3) + 0.6 + i * 0.7;
        return (
          <div key={i} style={{position: 'absolute', left: 740 + (i % 3) * 360, top: 560 + Math.floor(i / 3) * 150, width: 340, height: 120, borderRadius: 24,
            background: 'rgba(240,91,102,.14)', border: `3px solid ${C.red}99`, opacity: p(t0, 0.3), transform: `scale(${0.8 + 0.2 * p(t0, 0.35)})`, boxShadow: `0 0 36px ${C.red}33`}}>
            <Tx x={22} y={18} s={32} wt={900} w={300}>{it.n}</Tx>
            <Tx x={22} y={66} s={30} wt={900} c={C.red} w={300}>ALAMAZSIN ✗</Tx>
          </div>
        );
      })}
      <Tx x={740} y={880} s={34} wt={800} c={C.red} o={p(T(4, 3) + 4.6, 0.4)} w={1070}>7 üründen 5'ini artık alamıyorsunuz.</Tx>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 5: asgari ücret
const Sc5: React.FC = () => {
  const T = mk(5);
  const {p, count} = useTL();
  const base = 400 / 28075.5;
  return (
    <Shell title="Maaş Fark Kapatıyor mu?" sub="Net asgari ücret">
      <Card x={110} y={280} w={760} h={560} t0={T(5, 2)} accent={C.gold}>
        <Label x={36} y={30}>NET ASGARİ ÜCRET</Label>
        <div style={{position: 'absolute', left: 80, bottom: 70, width: 250, height: 22100 * base * p(T(5, 2) + 0.3, 0.9), background: `linear-gradient(0deg, ${C.grey}88, ${C.grey})`, borderRadius: '14px 14px 0 0'}} />
        <div style={{position: 'absolute', left: 420, bottom: 70, width: 250, height: 28075.5 * base * p(T(5, 2) + 1.4, 0.9), background: `linear-gradient(0deg, ${C.gold}88, ${C.gold2})`, borderRadius: '14px 14px 0 0', boxShadow: `0 0 40px ${C.gold}66`}} />
        <Tx x={205} y={490} s={30} wt={800} c={C.grey} w={250} align="center">2025</Tx>
        <Tx x={545} y={490} s={30} wt={800} c={C.gold2} w={250} align="center">2026</Tx>
      </Card>
      <Tx x={970} y={290} s={36} wt={800} c={C.grey} o={p(T(5, 2) + 0.2, 0.4)}>2025</Tx>
      <Tx x={970} y={338} s={80} wt={900} o={p(T(5, 2) + 0.4, 0.4)}>{count(T(5, 2) + 0.4, 1.0, 0, 22104.67, 2, '22.104,67') + ' ₺'}</Tx>
      <Tx x={970} y={470} s={36} wt={800} c={C.gold2} o={p(T(5, 2) + 1.5, 0.4)}>2026</Tx>
      <Tx x={970} y={518} s={80} wt={900} c={C.gold2} glow={C.gold} o={p(T(5, 2) + 1.6, 0.4)}>{count(T(5, 2) + 1.6, 1.0, 0, 28075.5, 2, '28.075,50') + ' ₺'}</Tx>
      <Chip x={970} y={680} w={840} h={110} t0={T(5, 3)} col={C.green} s={48}>ZAM: +%27,01</Chip>
      <Tx x={970} y={820} s={30} wt={600} c={C.grey} o={p(T(5, 4), 0.4)} w={840}>Ocakta iyi bir zam gibi görünüyordu.</Tx>
      <Src>Çalışma ve Sosyal Güvenlik Bakanlığı, Anadolu Ajansı, BloombergHT</Src>
    </Shell>
  );
};

// el çizimi daire (roughjs) — çizilerek belirir
const RoughCircle: React.FC<{cx: number; cy: number; r: number; col: string; t0: number}> = ({cx, cy, r, col, t0}) => {
  const {p} = useTL();
  const paths = React.useMemo(() => {
    const gen = rough.generator({options: {roughness: 1.6, strokeWidth: 5, seed: 7}});
    const d = gen.ellipse(cx, cy, r * 2, r * 2);
    return gen.toPaths(d).map((q) => q.d);
  }, [cx, cy, r]);
  const q = p(t0, 0.7);
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}>
      {paths.map((d, i) => <path key={i} d={d} fill="none" stroke={col} strokeWidth={5} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - q} style={{filter: `drop-shadow(0 0 10px ${col})`}} />)}
    </svg>
  );
};

// ---------------------------------------------------------------- sahne 6: zam eridi (d3 çizgi grafiği)
const Sc6: React.FC = () => {
  const T = mk(6);
  const {p} = useTL();
  const W = 1180, H = 520, X0 = 150, Y0 = 290;
  const xs = scaleLinear().domain([0, 10]).range([X0, X0 + W]);
  const ys = scaleLinear().domain([98, 130]).range([Y0 + H, Y0]);
  const price: [number, number][] = [[0, 100], [1, 104.84], [6, 117.76], [9, 124.32], [10, 127.53]];
  const wage: [number, number][] = [[0, 100], [0.001, 127.01], [10, 127.01]];
  const mkLine = d3line<[number, number]>().x((d) => xs(d[0])).y((d) => ys(d[1]));
  const dp = mkLine(price)!;
  const dw = mkLine(wage)!;
  const months = ['Ara', 'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki'];
  const q1 = p(T(6, 0) + 0.2, 1.4), q2 = p(T(6, 1) + 0.2, 2.2);
  const cross = {x: xs(9.9), y: ys(127.4)};
  return (
    <Shell title="Zam Nereye Gitti?" sub="Fiyatlar ücreti on ayda yakaladı (Aralık 2025 = 100)">
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        <defs>
          <linearGradient id="gw" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={C.green} stopOpacity=".35" /><stop offset="1" stopColor={C.green} stopOpacity="0" /></linearGradient>
          <linearGradient id="gp" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={C.red} stopOpacity=".35" /><stop offset="1" stopColor={C.red} stopOpacity="0" /></linearGradient>
        </defs>
        {[100, 110, 120, 130].map((v) => (
          <g key={v}><line x1={X0} x2={X0 + W} y1={ys(v)} y2={ys(v)} stroke="rgba(255,255,255,.12)" strokeWidth={2} strokeDasharray={v === 100 ? '0' : '8 10'} />
            <text x={X0 - 18} y={ys(v) + 9} fill={C.grey} fontSize={26} fontFamily={FONT} fontWeight={700} textAnchor="end">{v}</text></g>
        ))}
        {months.map((m, i) => <text key={m} x={xs(i)} y={Y0 + H + 44} fill={C.grey} fontSize={24} fontFamily={FONT} fontWeight={700} textAnchor="middle">{m}</text>)}
        <path d={dw} fill="none" stroke={C.green} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - q1} style={{filter: `drop-shadow(0 0 14px ${C.green})`}} />
        <path d={dp} fill="none" stroke={C.red} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - q2} style={{filter: `drop-shadow(0 0 14px ${C.red})`}} />
        {price.map((pt, i) => <circle key={i} cx={xs(pt[0])} cy={ys(pt[1])} r={9} fill={C.red} opacity={p(T(6, 1) + 0.2 + (i / 4) * 2.2, 0.2)} />)}
      </svg>
      <Tx x={X0 + 40} y={ys(127.01) - 78} s={34} wt={900} c={C.green} o={p(T(6, 0) + 1.2, 0.4)}>Asgari ücret +%27,01 (ocakta)</Tx>
      <Tx x={xs(2.2)} y={ys(105) + 24} s={32} wt={900} c={C.red} o={p(T(6, 1) + 0.8, 0.4)}>Fiyatlar (birikmiş)</Tx>
      <Tx x={xs(1) - 40} y={ys(104.84) + 22} s={24} wt={800} c={C.grey} o={p(T(6, 1) + 0.6, 0.3)}>+%4,84</Tx>
      <Tx x={xs(6) - 40} y={ys(117.76) + 22} s={24} wt={800} c={C.grey} o={p(T(6, 1) + 1.2, 0.3)}>+%17,76</Tx>
      <Tx x={xs(9) - 50} y={ys(124.32) + 24} s={24} wt={800} c={C.grey} o={p(T(6, 1) + 1.8, 0.3)}>+%24,32</Tx>
      <Tx x={xs(10) - 150} y={ys(127.53) - 100} s={34} wt={900} c={C.red} glow={C.red} o={p(T(6, 3) + 0.4, 0.3)}>≈ %27,5</Tx>
      <RoughCircle cx={cross.x} cy={cross.y} r={44} col={C.gold2} t0={T(6, 4)} />
      <Stamp x={420} y={440} t0={T(6, 5)} col={C.red} s={70}>ZAM ERİDİ</Stamp>
      <Card x={1400} y={520} w={410} h={290} t0={T(6, 2)} accent={C.gold}>
        <Label x={28} y={24} s={22}>EKİM İTİBARIYLA</Label>
        <Tx x={28} y={72} s={30} wt={700} c={C.grey} w={360}>Ücretin alım gücü</Tx>
        <Tx x={28} y={118} s={74} wt={900} c={C.red} glow={C.red} o={p(T(6, 5) + 0.6, 0.4)}>99,6</Tx>
        <Tx x={28} y={214} s={24} wt={600} c={C.grey} w={360}>Aralık 2025 = 100 • reel kazanç ≈ 0</Tx>
      </Card>
      <Src>Tüik (aylık TÜFE), Bisektor, Anadolu Ajansı • Ara aylar doğrusal gösterilmiştir • Hesap: kendi hesabımız</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 7: emekli ve memur
const Sc7: React.FC = () => {
  const T = mk(7);
  const {p} = useTL();
  const k = 30; // px per %
  return (
    <Shell title="Emekli ve Memur" sub="Temmuz 2026 zamları">
      <Label x={110} y={270} o={p(T(7, 1), 0.3)}>SSK VE BAĞ-KUR EMEKLİSİ</Label>
      <div style={{position: 'absolute', left: 110, top: 312, width: 17.76 * k * p(T(7, 1) + 0.2, 0.9), height: 76, borderRadius: 16, background: `linear-gradient(90deg, ${C.blue}aa, ${C.blue})`, boxShadow: `0 0 30px ${C.blue}66`}} />
      <Tx x={110 + 17.76 * k + 20} y={322} s={50} wt={900} c={C.blue} o={p(T(7, 1) + 0.8, 0.3)}>%17,76</Tx>
      <Chip x={1010} y={296} w={800} h={92} t0={T(7, 2)} col={C.blue} s={26}>= OCAK–HAZİRAN ENFLASYONU</Chip>
      <Label x={110} y={470} o={p(T(7, 3), 0.3)}>MEMUR VE MEMUR EMEKLİSİ</Label>
      <div style={{position: 'absolute', left: 110, top: 512, width: 7 * k * p(T(7, 4) + 0.1, 0.5), height: 76, borderRadius: '16px 0 0 16px', background: `linear-gradient(90deg, ${C.gold}aa, ${C.gold})`}} />
      <div style={{position: 'absolute', left: 110 + 7 * k, top: 512, width: 6.09 * k * p(T(7, 4) + 0.9, 0.5), height: 76, borderRadius: '0 16px 16px 0', background: `linear-gradient(90deg, ${C.green}aa, ${C.green})`}} />
      <Tx x={110 + 13.52 * k + 20} y={522} s={50} wt={900} c={C.gold2} o={p(T(7, 3) + 1.2, 0.3)}>%13,52</Tx>
      <Tx x={110} y={602} s={26} wt={700} c={C.gold2} o={p(T(7, 4) + 0.6, 0.3)}>%7 toplu sözleşme</Tx>
      <Tx x={110 + 7 * k + 60} y={602} s={26} wt={700} c={C.green} o={p(T(7, 4) + 1.2, 0.3)}>%6,09 enflasyon farkı</Tx>
      <Card x={110} y={700} w={1700} h={190} t0={T(7, 5)} accent={C.red}>
        <Label x={36} y={28} c={C.red}>ÖNEMLİ AYRINTI</Label>
        <Tx x={36} y={76} s={46} wt={900} w={1620}>Enflasyon farkı geçmişteki kaybı telafi eder.</Tx>
        <Tx x={36} y={134} s={34} wt={700} c={C.grey} w={1620} o={p(T(7, 6) - T(7, 5), 0.4)}>Zam geldiği gün fiyatlar yeniden yükselmeye başlar.</Tx>
      </Card>
      <Src>Bigpara, Kariyer.net • Temmuz 2026 zam oranları</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 8: kira
const Sc8: React.FC = () => {
  const T = mk(8);
  const {p, count} = useTL();
  return (
    <Shell title="Kira Zammı" sub="Maaşın önünde koşuyor">
      <HBar x={110} y={280} w={1100} t0={T(8, 2)} label="Asgari ücret zammı" val={27.01} max={36} txt="%27,01" col={C.green} />
      <HBar x={110} y={370} w={1100} t0={T(8, 1)} label="Kasım yasal kira tavanı" val={31.23} max={36} txt="%31,23" col={C.red} />
      <HBar x={110} y={460} w={1100} t0={T(8, 5)} label="Yeni kiralar, Türkiye (Eylül)" val={26.6} max={36} txt="%26,6" col={C.gold} />
      <HBar x={110} y={550} w={1100} t0={T(8, 5) + 1.0} label="Yeni kiralar, İstanbul" val={35.5} max={36} txt="%35,5" col={C.red} />
      <Chip x={110} y={650} w={1100} h={80} t0={T(8, 3)} col={C.red} s={28}>Aradaki yaklaşık 4 puan kiracının cebinden çıkıyor</Chip>
      <Card x={1250} y={270} w={560} h={470} t0={T(8, 4)} accent={C.red}>
        <Label x={36} y={28}>30.000 ₺'LİK KİRA</Label>
        <Tx x={36} y={84} s={64} wt={900} c={C.grey}>30.000 ₺</Tx>
        <Tx x={36} y={170} s={56} wt={900} c={C.red} glow={C.red} o={p(T(8, 4) + 0.9, 0.4)}>{'+' + count(T(8, 4) + 0.9, 1.0, 0, 9369, 0, '9.369') + ' ₺'}</Tx>
        <Tx x={36} y={260} s={30} wt={700} c={C.grey} o={p(T(8, 4) + 1.9, 0.4)}>Yeni kira</Tx>
        <Tx x={36} y={308} s={78} wt={900} c={C.white} glow={C.red} o={p(T(8, 4) + 2.0, 0.4)}>39.369 ₺</Tx>
      </Card>
      <Tx x={110} y={770} s={34} wt={700} c={C.grey} w={1700} o={p(T(8, 6), 0.4)}>Maaşını %27 artıran, İstanbul'da yeni ev tutarken yüzde 35'e yakın artışla karşılaşıyor.</Tx>
      <Src>Tüik, TCMB Yeni Kiracı Kira Endeksi (Eylül 2026), kira artış oranı hesaplama kaynakları</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 9: gıda ve ulaştırma
const Sc9: React.FC = () => {
  const T = mk(9);
  return (
    <Shell title="Gıda ve Ulaştırma" sub="Ekim 2026 enflasyonu">
      <Stat x={110} y={280} w={540} h={290} t0={T(9, 1)} col={C.red} label="YILLIK ENFLASYON" value="%29,77" sub="Tüik, ekim" vs={110} />
      <Stat x={690} y={280} w={540} h={290} t0={T(9, 2)} col={C.gold} label="AYLIK ENFLASYON" value="%2,58" sub="beklenti %2,20 • 6 ayın zirvesi" vs={110} />
      <Stat x={1270} y={280} w={540} h={290} t0={T(9, 4)} col={C.green} label="GIDA • YILLIK" value="%27,73" sub="ekimde tek ayda %3,50" vs={110} />
      <Stat x={110} y={610} w={540} h={290} t0={T(9, 5)} col={C.red} label="SEBZE • AYLIK" value="%12,66" sub="tek ayda" vs={110} />
      <Stat x={690} y={610} w={540} h={290} t0={T(9, 6)} col={C.red} label="ULAŞTIRMA • YILLIK" value="%36,39" sub="en sert artan gruplardan" vs={110} />
      <Chip x={1270} y={650} w={540} h={210} t0={T(9, 6) + 1.0} col={C.gold} s={32}>Fiyat artışı sepete göre değişir</Chip>
      <Src>Tüik Ekim 2026 TÜFE, Forbes Türkiye, Habertürk</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 10: ürün zamları
const Sc10: React.FC = () => {
  const T = mk(10);
  const {p} = useTL();
  const rows = [
    ['Motorin', 65, '%65', C.red], ['Netflix Standart', 34.5, '%34', C.purple], ['Benzin', 32.5, '%32', C.gold], ['İstanbul bileti', 32, '%32', C.blue], ['Halk Ekmek', 25, '%25', C.grey], ['Kıyma', 23.7, '%24', C.green],
  ] as const;
  return (
    <Shell title="Ürün Ürün Zamlar" sub="Bir yılda fiyat artışı">
      {rows.map((r, i) => <HBar key={i} x={110} y={270 + i * 82} w={1300} t0={T(10, 0) + i * 0.9} label={r[0]} val={r[1]} max={70} txt={r[2]} col={r[3]} h={52} ls={300} />)}
      <div style={{position: 'absolute', left: 110 + 300 + (1300 - 300 - 150) * (29.77 / 70), top: 255, width: 4, height: 520, background: C.white, opacity: 0.6 * p(T(10, 1), 0.4)}} />
      <Tx x={110 + 300 + (1300 - 300 - 150) * (29.77 / 70)} y={226} s={24} wt={800} c={C.white} w={250} align="center" o={p(T(10, 1), 0.4)}>ORTALAMA %29,77</Tx>
      <Card x={1470} y={280} w={340} h={440} t0={T(10, 4)} accent={C.gold}>
        <Label x={28} y={26} s={22}>İKİ HESAP</Label>
        <Tx x={28} y={76} s={26} wt={800} c={C.grey}>TÜİK</Tx>
        <Tx x={28} y={110} s={66} wt={900} c={C.gold2}>%29,77</Tx>
        <Tx x={28} y={230} s={26} wt={800} c={C.grey} o={p(T(10, 4) + 1.2, 0.3)}>ENAG</Tx>
        <Tx x={28} y={264} s={66} wt={900} c={C.red} glow={C.red} o={p(T(10, 4) + 1.2, 0.3)}>%45,12</Tx>
      </Card>
      <Chip x={110} y={800} w={1300} h={84} t0={T(10, 3)} col={C.gold} s={26}>Kirada oturan, arabası olan, gelirini yiyeceğe harcayan daha ağır enflasyon yaşıyor</Chip>
      <Src>Tüik, ENAG, Politikam, Et ve Süt Kurumu, Sözcü, T24 • 2025–2026 fiyatları</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 11: mekanizma
const Sc11: React.FC = () => {
  const T = mk(11);
  const {p, t} = useTL();
  const flow = (t * 0.6) % 1;
  return (
    <Shell title="Sessiz Servet Transferi" sub="Enflasyon gizli bir vergi gibi çalışıyor">
      <Card x={110} y={300} w={640} h={380} t0={T(11, 4)} accent={C.red}>
        <Label x={36} y={28} c={C.red}>KAYBEDEN</Label>
        <Tx x={36} y={84} s={52} wt={900} w={570}>Parası ya da geliri fiyatların gerisinde kalan</Tx>
        <Tx x={36} y={290} s={32} wt={700} c={C.red}>Nakit • sabit maaş</Tx>
      </Card>
      <Card x={1170} y={300} w={640} h={380} t0={T(11, 3)} accent={C.green}>
        <Label x={36} y={28} c={C.green}>KAZANAN</Label>
        <Tx x={36} y={84} s={52} wt={900} w={570}>Geliri ve malı fiyatlardan hızlı artan</Tx>
        <Tx x={36} y={290} s={32} wt={700} c={C.green}>Kira geliri • varlık</Tx>
      </Card>
      {/* akış oku */}
      <div style={{position: 'absolute', left: 780, top: 460, width: 360, height: 20, borderRadius: 10, background: `linear-gradient(90deg, ${C.red}44, ${C.gold}88, ${C.green}88)`, opacity: p(T(11, 1), 0.4)}} />
      {[0, 1, 2, 3].map((i) => {
        const q = (flow + i / 4) % 1;
        return <div key={i} style={{position: 'absolute', left: 780 + 330 * q, top: 452, width: 36, height: 36, borderRadius: '50%', background: C.gold2, boxShadow: `0 0 24px ${C.gold}`, opacity: p(T(11, 1), 0.4) * (1 - Math.abs(q - 0.5) * 1.2),
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 20, color: '#07142a'}}>₺</div>;
      })}
      <Tx x={960} y={400} w={440} s={30} wt={900} c={C.gold2} align="center" o={p(T(11, 1), 0.4)}>SESSİZ AKTARIM</Tx>
      <Chip x={110} y={740} w={1700} h={90} t0={T(11, 2)} col={C.gold} s={30}>Maaşlar, kiralar, borçlar ve mallar farklı hızlarda hareket ediyor</Chip>
      <Stamp x={640} y={850} t0={T(11, 5)} col={C.gold} s={44} rot={-3}>GİZLİ VERGİ</Stamp>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 12: tarih
const Sc12: React.FC = () => {
  const T = mk(12);
  const {p, count} = useTL();
  return (
    <Shell title="İlk Kez Olmuyor" sub="Enflasyonun iki hatırası">
      <Card x={110} y={280} w={820} h={540} t0={T(12, 1)} accent={C.red}>
        <Label x={36} y={28} c={C.red}>TÜRKİYE • EKİM 2022 • YILLIK</Label>
        <Tx x={36} y={86} s={170} wt={900} c={C.red} glow={C.red} ls={-4}>{count(T(12, 1) + 0.2, 1.4, 0, 85.51, 2, '%85,51', '%')}</Tx>
        <Tx x={36} y={310} s={44} wt={900} o={p(T(12, 2), 0.4)} w={740}>24 yılın en yüksek seviyesi</Tx>
        <Tx x={36} y={380} s={28} wt={600} c={C.grey} o={p(T(12, 2) + 0.4, 0.4)} w={740}>Bugünkü %29,77, o günlerin üçte biri.</Tx>
      </Card>
      <Card x={990} y={280} w={820} h={540} t0={T(12, 3)} accent={C.gold}>
        <Label x={36} y={28} c={C.gold}>BERLİN • BİR SOMUN EKMEK</Label>
        <Tx x={36} y={84} s={30} wt={700} c={C.grey}>1922 sonu</Tx>
        <Tx x={36} y={124} s={86} wt={900}>~160 mark</Tx>
        <Tx x={36} y={250} s={30} wt={700} c={C.gold2} o={p(T(12, 4) + 0.6, 0.4)}>1923 sonu</Tx>
        <Tx x={36} y={290} s={70} wt={900} c={C.gold2} glow={C.gold} o={p(T(12, 4) + 0.7, 0.4)} w={760}>~200 milyar mark</Tx>
        <Tx x={36} y={420} s={28} wt={600} c={C.grey} o={p(T(12, 5), 0.4)} w={740}>Maaşını alan, değeri erimeden harcamaya koşuyordu.</Tx>
      </Card>
      <Chip x={110} y={860} w={1700} h={76} t0={T(12, 6)} col={C.gold} s={26}>Bugün yaşadığımız bununla kıyaslanamaz, ama mekanizma aynı</Chip>
      <Src>Tüik (Ekim 2022), BloombergHT, Weimar hiperenflasyonu kaynakları</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 13: reel getiri
const Sc13: React.FC = () => {
  const T = mk(13);
  const {p} = useTL();
  const zero = 520, k = 18; // px per %
  const cols = [
    {n: 'Mevduat', v: 0.29, txt: '+%0,29', col: C.green, t0: T(14, 0)},
    {n: 'Dolar', v: -8.92, txt: '-%8,92', col: C.red, t0: T(15, 0)},
    {n: 'Külçe altın', v: -11.7, txt: '-%11,70', col: C.red, t0: T(15, 2)},
    {n: 'BIST 100', v: -15.09, txt: '-%15,09', col: C.red, t0: T(15, 5)},
    {n: 'Konut', v: -5.7, txt: '-%5,70', col: C.red, t0: T(15, 6)},
  ];
  return (
    <Shell title="Enflasyonu Kim Yendi?" sub="Reel getiri, son 12 ay (TÜFE'ye göre)">
      <div style={{position: 'absolute', left: 110, top: zero, width: 1000, height: 4, background: C.white, opacity: 0.6 * p(T(13, 1), 0.4)}} />
      <Tx x={1130} y={zero - 16} s={26} wt={800} c={C.grey} o={p(T(13, 1), 0.4)}>SIFIR</Tx>
      {cols.map((c, i) => {
        const x = 150 + i * 200;
        const h = Math.max(6, Math.abs(c.v) * k) * p(c.t0, 0.8);
        const up = c.v >= 0;
        return (
          <div key={i} style={{opacity: p(c.t0, 0.3)}}>
            <div style={{position: 'absolute', left: x, top: up ? zero - h : zero + 4, width: 150, height: h, borderRadius: up ? '14px 14px 0 0' : '0 0 14px 14px', background: `linear-gradient(${up ? 0 : 180}deg, ${c.col}88, ${c.col})`, boxShadow: `0 0 34px ${c.col}66`}} />
            <Tx x={x + 75} y={zero + 4 + Math.abs(c.v) * k * p(c.t0, 0.8) + 12} w={190} s={34} wt={900} c={c.col} align="center">{c.txt}</Tx>
            <Tx x={x + 75} y={up ? zero - h - 90 : 280} w={190} s={28} wt={800} align="center" c={C.white}>{c.n}</Tx>
          </div>
        );
      })}
      <Card x={1240} y={300} w={570} h={520} t0={T(16, 0)} accent={C.gold}>
        <Label x={36} y={28}>PARA YANILSAMASI</Label>
        <Tx x={36} y={84} s={50} wt={900} w={500} o={p(T(16, 1), 0.4)}>Kazandığını sanıyor, alım gücü kaybediyor</Tx>
        <Tx x={36} y={290} s={40} wt={800} c={C.gold2} w={500} o={p(T(16, 2), 0.4)}>Rakam büyüyor.</Tx>
        <Tx x={36} y={344} s={40} wt={800} c={C.red} w={500} o={p(T(16, 2) + 1.2, 0.4)}>Aldığınız şey küçülüyor.</Tx>
      </Card>
      <Src>Tüik Ekim 2026 reel getiri tablosu, TCMB Konut Fiyat Endeksi (Eylül 2026)</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 14: kim kazanır
const Sc14: React.FC = () => {
  const T = mk(17);
  const {p} = useTL();
  return (
    <Shell title="Enflasyon Kimi Zengin Ediyor?" sub="Üç grup öne çıkıyor">
      <Card x={110} y={270} w={540} h={470} t0={T(17, 2)} accent={C.green}>
        <Label x={32} y={26} c={C.green}>1 • GELİRİ ARTANLAR</Label>
        <Tx x={32} y={80} s={42} wt={900} w={480}>Geliri enflasyonla birlikte artanlar</Tx>
        <Tx x={32} y={300} s={30} wt={700} c={C.grey} w={480} o={p(T(17, 3), 0.4)}>Örnek: kira geliri, kasım tavanı %31,23</Tx>
      </Card>
      <Card x={690} y={270} w={540} h={470} t0={T(17, 4)} accent={C.gold}>
        <Label x={32} y={26} c={C.gold}>2 • SABİT FAİZLİ BORÇ</Label>
        <Tx x={32} y={80} s={42} wt={900} w={480}>Sabit faizli, uzun vadeli borcu olanlar</Tx>
        <Tx x={32} y={236} s={26} wt={700} c={C.grey} w={480} o={p(T(17, 5), 0.4)}>Şart: faiz enflasyonun altında kalmalı</Tx>
        <Tx x={32} y={310} s={25} wt={800} c={C.white} w={490} o={p(T(17, 6), 0.4)}>Politika faizi %36 − enflasyon %29,77</Tx>
        <Tx x={32} y={380} s={44} wt={900} c={C.red} glow={C.red} w={480} o={p(T(17, 6) + 1.0, 0.4)}>reel faiz ≈ +%5</Tx>
      </Card>
      <Card x={1270} y={270} w={540} h={470} t0={T(17, 8)} accent={C.purple}>
        <Label x={32} y={26} c={C.purple}>3 • ENFLASYON ÜSTÜ GETİRİ</Label>
        <Tx x={32} y={80} s={42} wt={900} w={480}>Enflasyonun üstünde getiri üretenler</Tx>
        <Tx x={32} y={300} s={30} wt={700} c={C.grey} w={480} o={p(T(17, 9), 0.4)}>Son bir yılda bu kolay olmadı</Tx>
      </Card>
      <Chip x={110} y={790} w={1700} h={90} t0={T(17, 7)} col={C.red} s={28}>Yüksek faizle borçlanan, borcun erimesinden kazanmıyor</Chip>
      <Chip x={110} y={900} w={1700} h={70} t0={T(18, 0)} col={C.red} s={24}>KAYBEDENLER: NAKİT TUTANLAR • SABİT MAAŞLILAR • GELİRİ GERİDE KALANLAR</Chip>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 15: dünya ve kapanış
const Sc15: React.FC = () => {
  const T = mk(19);
  const {p} = useTL();
  return (
    <Shell title="Sadece Türkiye'nin Meselesi Değil" sub="ABD üretici enflasyonu">
      <Stat x={110} y={270} w={820} h={300} t0={T(19, 1)} col={C.red} label="ABD ÜFE • EKİM • YILLIK" value="%6,5" sub="Kasım 2022'den beri en yüksek" vs={140} />
      <Chip x={110} y={610} w={820} h={90} t0={T(19, 2)} col={C.gold} s={28}>FED'İN FAİZ ARTIRIM BEKLENTİSİ YÜKSEK</Chip>
      <Card x={990} y={270} w={820} h={430} t0={T(20, 0)} accent={C.gold}>
        <Label x={36} y={28}>ÖZETLE</Label>
        <Tx x={36} y={84} s={50} wt={900} w={740}>Enflasyon kimseyi garanti zengin etmiyor.</Tx>
        <Tx x={36} y={230} s={36} wt={700} c={C.grey} w={740} o={p(T(20, 1), 0.4)}>Gelir, varlık ya da borç enflasyonun doğru tarafında olmalı.</Tx>
      </Card>
      <Chip x={110} y={750} w={820} h={76} t0={T(20, 2)} col={C.gold} s={24}>BİLGİLENDİRME AMAÇLIDIR • YATIRIM TAVSİYESİ DEĞİLDİR</Chip>
      <div style={{position: 'absolute', left: 990, top: 740, width: 820, height: 110, borderRadius: 28, background: `linear-gradient(135deg, ${C.red}, #b8323d)`, boxShadow: `0 0 50px ${C.red}77`, opacity: p(T(20, 3), 0.4),
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 44, color: '#fff', letterSpacing: 1, textAlign: 'center', padding: '0 24px'}}>YARIN: ENFLASYON KİMİ NASIL ZENGİN EDER?</div>
      <div style={{position: 'absolute', left: 990, top: 870, width: 820, height: 84, borderRadius: 42, background: `${C.gold}22`, border: `3px solid ${C.gold}`, opacity: p(T(20, 4), 0.4),
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 34, color: C.gold2, letterSpacing: 3}}>🔔 KANALA ABONE OL</div>
    </Shell>
  );
};

// ---------------------------------------------------------------- ticker
const TICK = ['TÜFE YILLIK %29,77', 'AYLIK %2,58', 'ASGARİ ÜCRET ZAMMI %27,01', 'KİRA TAVANI %31,23', 'POLİTİKA FAİZİ %36', 'GIDA YILLIK %27,73', 'ULAŞTIRMA YILLIK %36,39'];
const TickerE: React.FC<{total: number}> = ({total}) => {
  const f = useCurrentFrame();
  const IW = 520, CW = IW * TICK.length;
  const x = -((f * 2.4) % CW);
  const row = (k: number) => TICK.map((s, i) => (
    <div key={k + '-' + i} style={{width: IW, flex: 'none', textAlign: 'center', fontFamily: FONT, fontSize: 26, fontWeight: 800, color: C.gold2, letterSpacing: 1}}>{s}<span style={{color: C.line, marginLeft: 28}}>|</span></div>
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
const SCENES: {C: React.FC; from: number; to: number; first?: boolean}[] = [
  {C: Sc1, from: 0, to: 2}, {C: Sc2, from: 2, to: 3}, {C: Sc3, from: 3, to: 4}, {C: Sc4, from: 4, to: 5}, {C: Sc5, from: 5, to: 6}, {C: Sc6, from: 6, to: 7},
  {C: Sc7, from: 7, to: 8}, {C: Sc8, from: 8, to: 9}, {C: Sc9, from: 9, to: 10}, {C: Sc10, from: 10, to: 11}, {C: Sc11, from: 11, to: 12}, {C: Sc12, from: 12, to: 13},
  {C: Sc13, from: 13, to: 17}, {C: Sc14, from: 17, to: 19}, {C: Sc15, from: 19, to: 21},
];

const TT = 14;
const transitions: any[] = [
  slide({direction: 'from-right'}), fade(), slide({direction: 'from-bottom'}), wipe({direction: 'from-left'}), slide({direction: 'from-right'}), fade(),
  slide({direction: 'from-right'}), wipe({direction: 'from-bottom'}), fade(), slide({direction: 'from-left'}), fade(), slide({direction: 'from-right'}), wipe({direction: 'from-left'}), slide({direction: 'from-bottom'}),
];

export const EnfVideo: React.FC = () => (
  <>
    <Bg total={ENF_TOTAL} />
    <TransitionSeries>
      {SCENES.flatMap(({C: Sc, from, to}, i) => {
        const a = fr(paras[from].start);
        const b = to >= paras.length ? ENF_TOTAL : fr(paras[to].start);
        const last = i === SCENES.length - 1;
        const out = [
          <TransitionSeries.Sequence key={'s' + i} durationInFrames={Math.max(TT + 1, b - a + (last ? 0 : TT))}><Sc /></TransitionSeries.Sequence>,
        ];
        if (!last) out.push(<TransitionSeries.Transition key={'t' + i} presentation={transitions[i % transitions.length]} timing={springTiming({config: {damping: 200}, durationInFrames: TT})} />);
        return out;
      })}
    </TransitionSeries>
    <TickerE total={ENF_TOTAL} />
  </>
);
