import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import borcD from './short_ev_borc.json';
import karD from './short_ev_kar.json';
import bugunD from './short_ev_bugun.json';
import {Captions, Card, Fade, ShortBg} from './Short';
import {Chip, Src, Title, Stat} from './ShortG2';
import {C, FONT, Tx, clamp, fmt, useTL} from './ui';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
type D = typeof borcD;
const frames = (d: {total: number}) => Math.ceil(d.total * FPS);
const st = (d: D, i: number) => d.segments[0].sentences[i].start;

const EndEv: React.FC = () => {
  const {t, p} = useTL();
  const s = 1 + 0.05 * Math.sin(t * 5) * p(1.2, 0.4);
  return (
    <AbsoluteFill>
      <Tx x={60} y={330} w={960} s={112} wt={900} o={p(0.1, 0.5)} glow={C.gold} ls={-3} lh={1.1}>{'TAM VİDEO\nKANALDA'}</Tx>
      <div style={{position: 'absolute', left: 60, top: 600, width: 400 * p(0.5, 0.6), height: 9, borderRadius: 5, background: `linear-gradient(90deg, ${C.gold2}, ${C.gold})`, boxShadow: `0 0 26px ${C.gold}`}} />
      <Tx x={60} y={640} w={960} s={44} wt={600} c={C.grey} o={p(0.9, 0.5)}>{'Kredili ev, enflasyon ve\nkâr hesabı: tam hikâye'}</Tx>
      <div style={{position: 'absolute', left: 540 - 300 * s, top: 800, width: 600 * s, height: 150 * s, borderRadius: 34, background: `linear-gradient(145deg, ${C.red}, #c13a48)`, opacity: p(1.2, 0.4), boxShadow: `0 0 80px ${C.red}99`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 78 * s, color: C.white, letterSpacing: 2}}>ABONE OL</div>
      <Tx x={540} y={1010} w={960} align="center" s={36} wt={600} c={C.grey} o={p(1.8, 0.5)}>Yatırım tavsiyesi değildir</Tx>
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

const Stamp2: React.FC<{y: number; t0: number; col: string; s?: number; h?: number; children: string}> = ({y, t0, col, s = 64, h = 150, children}) => {
  const {p, pop} = useTL();
  return (
    <div style={{position: 'absolute', left: 90, top: y, width: 900, height: h, border: `8px solid ${col}`, borderRadius: 18, opacity: p(t0, 0.3), transform: `rotate(-3deg) scale(${0.8 + 0.2 * pop(t0)})`, background: C.bg + 'ee',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: s, color: col, letterSpacing: 3, textShadow: `0 0 30px ${col}88`}}>{children}</div>
  );
};

// ------------------------------------------------------------ 1) BORÇ ERİDİ
const BorcA: React.FC = () => {
  const d = borcD as D; const j = (i: number) => st(d, i);
  return (
    <Fade>
      <Title>{'ENFLASYON BORCU\nNASIL ERİTİR?'}</Title>
      <Tx x={60} y={420} s={28} wt={800} c={C.grey} ls={2}>%20 ENFLASYON • 4 YIL • 2,4 M ₺ SABİT KREDİ</Tx>
      <Bar y={520} t0={0.2} label="Ev değeri: 3,00 → 6,22 M ₺" v={6.22} max={6.3} txt="≈ 2×" col={C.gold} />
      <Bar y={680} t0={j(1)} label="Kalan borç (rakam olarak)" v={1.9} max={2.4} txt="1,90 M ₺" col={C.blue} />
      <Bar y={840} t0={j(2)} label="Borç, bugünün parasıyla" v={0.91} max={2.4} txt="0,91 M ₺" col={C.green} />
      <Chip y={965} h={80} t0={j(3)} col={C.green} s={32}>BORCUN GERÇEK DEĞERİ YARIDAN FAZLA ERİDİ</Chip>
      <Src t0={1}>Hesap: kendi hesabımız • Varsayımsal örnek (3 M ₺ ev, faiz ayda %1,5) • Bugünün parası = rakam ÷ 2,07</Src>
    </Fade>
  );
};

// ------------------------------------------------------------ 2) KÂĞIT ÜSTÜ KÂR
const KarA: React.FC = () => {
  const d = karD as D; const j = (i: number) => st(d, i);
  return (
    <Fade>
      <Title>{'EV KÂRI GERÇEK\nMİ?'}</Title>
      <Stat x={60} y={420} w={960} h={190} t0={0.3} col={C.green} label="KÂĞIT ÜSTÜ (4 YIL, %20 ENFLASYON)" value="+1,65 milyon ₺" vs={72} />
      <div style={{opacity: 1}}>
        <Bar y={700} t0={j(1)} label="Ev serveti (ev − borç)" v={4.33} max={4.4} txt="4,33 M ₺" col={C.green} />
        <Bar y={850} t0={j(1) + 1.2} label="Aynı parayı enflasyon kadar değerlendirseydiniz" v={4.28} max={4.4} txt="4,28 M ₺" col={C.purple} />
      </div>
      <Stamp2 y={940} t0={j(2)} col={C.gold2} s={50}>GERÇEK KAZANÇ: 48 BİN ₺</Stamp2>
      <Src t0={1}>Hesap: kendi hesabımız • Peşinat ve taksitler yılda %20 büyütülmüş • Kira, vergi, aidat hariç</Src>
    </Fade>
  );
};

// ------------------------------------------------------------ 3) BUGÜN TERSİNE DÖNÜYOR
const BugunA: React.FC = () => {
  const {p} = useTL(); const d = bugunD as D; const j = (i: number) => st(d, i);
  return (
    <Fade>
      <Title>{'BUGÜN AYNI\nHESAP?'}</Title>
      <Bar y={450} t0={0.3} label="Kredi maliyeti (yıllık, ayda %2,87)" v={40.4} max={45} txt="%40,4" col={C.red} h={56} />
      <Bar y={580} t0={0.8} label="Enflasyon (yıllık)" v={29.77} max={45} txt="%29,77" col={C.gold} h={56} />
      <Bar y={710} t0={1.3} label="Konut fiyatı artışı (eylül, yıllık)" v={22.3} max={45} txt="%22,3" col={C.green} h={56} />
      <Stat x={60} y={810} w={470} h={170} t0={j(0) + 5.0} col={C.red} label="ENFLASYONA YETİŞENE GÖRE" value="−3,1 M ₺" vs={60} />
      <Stat x={550} y={810} w={470} h={170} t0={j(1) + 0.4} col={C.red} label="KİRA DAHİL" value="−1,2 M ₺" vs={60} />
      <Stamp2 y={990} h={110} t0={j(2) + 0.5} col={C.red} s={44}>HİKÂYE TERSİNE DÖNÜYOR</Stamp2>
      <Src t0={1}>Hesabın dışında: tapu, aidat, bakım, kira vergisi • TCMB, TÜİK, kendi hesabımız</Src>
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
      <Sequence from={fr(data.endCardStart)} durationInFrames={total - fr(data.endCardStart)}><EndEv /></Sequence>
      <Captions caps={data.captions} />
    </>
  );
};
export const EvBorc = make(borcD as D, BorcA);
export const EvKar = make(karD as D, KarA);
export const EvBugun = make(bugunD as D, BugunA);
export const EV_FRAMES = {borc: frames(borcD), kar: frames(karD), bugun: frames(bugunD)};
