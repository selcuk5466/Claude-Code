import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {AnimatedText} from 'remotion-bits';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {fade} from '@remotion/transitions/fade';
import {wipe} from '@remotion/transitions/wipe';
import {scaleLinear} from 'd3-scale';
import {line as d3line} from 'd3-shape';
import D from './enf2_sentences.json';
import {Chip, HBar, RoughCircle, Src, Stamp, Stat} from './Enf';
import {Bg, C, Card, FONT, Label, Shell, Tx, useTL} from './ui';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
export const ENF2_TOTAL = Math.ceil(D.total * FPS);
type P = {start: number; end: number; sentences: number[]};
const paras = D.paras as P[];
const mk = (p0: number) => (pi: number, si = 0) => paras[pi].sentences[si] - paras[p0].start;
const M = (v: number, d = 2) => v.toLocaleString('tr-TR', {minimumFractionDigits: d, maximumFractionDigits: d});

// ---------------------------------------------------------------- ev çizimi
const House: React.FC<{x: number; y: number; s?: number; col?: string; o?: number}> = ({x, y, s = 1, col = C.gold, o = 1}) => (
  <svg width={520 * s} height={440 * s} viewBox="0 0 520 440" style={{position: 'absolute', left: x, top: y, opacity: o, filter: `drop-shadow(0 0 30px ${col}77)`}}>
    <path d="M40 200 L260 30 L480 200 Z" fill={col + '33'} stroke={col} strokeWidth={10} strokeLinejoin="round" />
    <rect x={90} y={200} width={340} height={200} rx={10} fill={C.card} stroke={col} strokeWidth={10} />
    <rect x={225} y={270} width={70} height={130} rx={8} fill={col + '55'} stroke={col} strokeWidth={6} />
    <rect x={120} y={235} width={70} height={70} rx={8} fill={C.blue + '55'} stroke={C.blue} strokeWidth={6} />
    <rect x={330} y={235} width={70} height={70} rx={8} fill={C.blue + '55'} stroke={C.blue} strokeWidth={6} />
    <rect x={340} y={60} width={40} height={80} fill={col + '66'} stroke={col} strokeWidth={6} />
  </svg>
);

// dikey çubuk (milyon ₺)
const VBar: React.FC<{x: number; base: number; w: number; v: number; max: number; hmax: number; col: string; t0: number; label: string; top?: string; dim?: boolean}> = ({x, base, w, v, max, hmax, col, t0, label, top, dim}) => {
  const {p} = useTL();
  const q = p(t0, 0.9);
  const h = Math.max(4, (v / max) * hmax * q);
  return (
    <>
      <div style={{position: 'absolute', left: x, top: base - h, width: w, height: h, borderRadius: '14px 14px 0 0', background: `linear-gradient(180deg, ${col}, ${col}77)`, boxShadow: `0 0 34px ${col}66`, opacity: dim ? 0.55 : 1}} />
      <Tx x={x - 30} y={base - h - 50} w={w + 60} align="center" s={32} wt={900} c={C.white} o={Math.min(1, q * 2.5)}>{top ?? M(v) + ' M'}</Tx>
      <Tx x={x - 30} y={base + 12} w={w + 60} align="center" s={26} wt={700} c={C.grey} o={p(t0 - 0.2, 0.3)}>{label}</Tx>
    </>
  );
};

// ---------------------------------------------------------------- sahne 1: kanca
const S1: React.FC = () => {
  const T = mk(0); const {p, pop} = useTL();
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 110, top: 120, width: 1100, fontFamily: FONT, fontWeight: 900, fontSize: 112, lineHeight: 1.04, color: C.white, letterSpacing: -3}}>
        <AnimatedText transition={{split: 'word', splitStagger: 3, y: [40, 0], opacity: [0, 1], blur: [14, 0], duration: 22, delay: Math.round(T(0, 0) * FPS)}}>BİR EV ALIYORSUNUZ.</AnimatedText>
      </div>
      <House x={1230} y={110} s={1.15} o={p(0.2, 0.6)} />
      <Tx x={1530} y={640} w={560} align="center" s={64} wt={900} c={C.gold2} glow={C.gold} o={p(T(0, 0) + 0.6, 0.4)}>3.000.000 ₺</Tx>
      <Chip x={110} y={400} w={1000} h={92} t0={T(0, 1)} col={C.blue} s={32}>PARANIN BÜYÜK KISMINI BANKA VERİYOR</Chip>
      <Chip x={110} y={516} w={1000} h={92} t0={T(0, 2)} col={C.green} s={32}>EV DEĞERİ ↑   MAAŞ ↑   TAKSİT = SABİT</Chip>
      <Chip x={110} y={632} w={1000} h={92} t0={T(0, 3)} col={C.gold} s={32}>ÜSTÜNE KİRA GELİRİ</Chip>
      <Stamp x={150} y={770} t0={T(0, 4)} col={C.green} s={64} rot={-4}>KULAĞA HARİKA GELİYOR?</Stamp>
      <Chip x={110} y={900} w={760} h={64} t0={T(0, 6)} col={C.grey} s={24}>BUGÜN RAKAMLARLA HESAPLIYORUZ</Chip>
      <Chip x={900} y={900} w={880} h={64} t0={T(0, 7)} col={C.red} s={24}>HANGİ ŞARTTA İŞE YARIYOR, HANGİSİNDE TERS TEPİYOR?</Chip>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- sahne 2: 2021-2023 konut fiyatları
const S2: React.FC = () => {
  const T = mk(1); const {p, count} = useTL();
  const base = 800;
  return (
    <Shell title="Gerçekten Oldu mu?" sub="TCMB konut fiyat endeksi • Aralık 2021 = 100">
      <div style={{position: 'absolute', left: 110, top: base, width: 1000, height: 4, background: C.line}} />
      <VBar x={150} base={base} w={220} v={100} max={470} hmax={480} col={C.grey} t0={T(1, 0) + 0.2} label="Aralık 2021" top="100" />
      <VBar x={450} base={base} w={220} v={267.8} max={470} hmax={480} col={C.gold} t0={T(1, 1) + 0.3} label="Aralık 2022" top="267,8" />
      <VBar x={750} base={base} w={220} v={470} max={470} hmax={480} col={C.red} t0={T(1, 2) + 0.2} label="Aralık 2023" top="470" />
      <Tx x={470} y={290} s={34} wt={900} c={C.gold2} o={p(T(1, 1) + 0.9, 0.4)}>+%167,8</Tx>
      <Tx x={985} y={340} s={34} wt={900} c={C.red} o={p(T(1, 2) + 0.9, 0.4)}>+%75,5</Tx>
      <Card x={1180} y={270} w={630} h={260} t0={T(1, 2)} accent={C.red}>
        <Label x={36} y={26}>İKİ YILDA</Label>
        <Tx x={36} y={64} s={120} wt={900} c={C.red} glow={C.red} ls={-4}>{count(T(1, 2), 1.6, 1, 4.7, 1, '4,7×')}</Tx>
        <Tx x={36} y={208} s={26} wt={600} c={C.grey} w={560} o={p(T(1, 2) + 1.6, 0.3)}>nominal fiyat artışı (kendi hesabımız)</Tx>
      </Card>
      <Chip x={1180} y={570} w={630} h={80} t0={T(1, 3)} col={C.gold} s={22}>ENFLASYON ÇOK YÜKSEK • KREDİ FAİZİ GERİDE</Chip>
      <Chip x={1180} y={670} w={630} h={80} t0={T(1, 4)} col={C.green} s={22}>EKONOMİSTLER: KAZANANLAR KREDİYLE EV ALANLAR</Chip>
      <Stamp x={1190} y={790} t0={T(1, 5)} col={C.red} s={36} rot={-3}>BUGÜN DE YÜRÜR MÜ?</Stamp>
      <Src>TCMB Konut Fiyat Endeksi (Aralık yıllık değişimler: 2022 %167,8, 2023 %75,5) • 4,7 kat = 2,678 × 1,755</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 3: hikâye kurulumu
const S3: React.FC = () => {
  const T = mk(2); const {p, pop} = useTL();
  const circ = (cx: number, l: string, t0: number, col: string) => (
    <div style={{position: 'absolute', left: cx, top: 260, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, ${col}, ${col}88)`, boxShadow: `0 0 40px ${col}88`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 64, color: '#fff', opacity: p(t0, 0.3), transform: `scale(${0.6 + 0.4 * pop(t0)})`}}>{l}</div>
  );
  return (
    <Shell title="Hikâyemiz: Ayşe ile Mehmet" sub="Varsayımsal çift • toplam gelir 100.000 ₺ / ay">
      {circ(110, 'A', T(2, 0), C.purple)}{circ(250, 'M', T(2, 0) + 0.4, C.blue)}
      <Tx x={410} y={282} s={46} wt={900} o={p(T(2, 2), 0.4)}>100.000 ₺ / ay</Tx>
      <Tx x={410} y={338} s={28} wt={600} c={C.grey} o={p(T(2, 2) + 0.2, 0.4)}>iki maaş toplamı</Tx>
      <House x={90} y={430} s={0.62} o={p(T(2, 3), 0.5)} />
      <Tx x={450} y={470} s={64} wt={900} c={C.gold2} glow={C.gold} o={p(T(2, 3), 0.4)}>Ev: 3.000.000 ₺</Tx>
      {/* peşinat / kredi dağılımı */}
      <div style={{position: 'absolute', left: 450, top: 570, width: 520 * p(T(2, 4), 0.8), height: 56, borderRadius: 14, overflow: 'hidden', display: 'flex', opacity: p(T(2, 4), 0.2)}}>
        <div style={{width: '20%', height: '100%', background: C.gold}} />
        <div style={{width: '80%', height: '100%', background: `linear-gradient(90deg, ${C.blue}, ${C.blue}aa)`}} />
      </div>
      <Tx x={450} y={640} s={28} wt={800} c={C.gold2} o={p(T(2, 4) + 0.5, 0.3)}>Peşinat 600.000 ₺</Tx>
      <Tx x={790} y={640} s={28} wt={800} c={'#7fb2ff'} o={p(T(2, 4) + 0.9, 0.3)}>Banka kredisi 2.400.000 ₺ • 10 yıl</Tx>
      <Stat x={1060} y={250} w={750} h={170} t0={T(2, 5)} col={C.blue} label="KONUT KREDİSİ" value="Sabit faiz → taksit hiç değişmez" vs={44} />
      <Stat x={1060} y={445} w={360} h={190} t0={T(2, 6)} col={C.gold} label="FAİZ (VARSAYIM)" value="Ayda %1,5" sub="yıllık ≈ %20" vs={56} />
      <Stat x={1450} y={445} w={360} h={190} t0={T(2, 7)} col={C.red} label="AYLIK TAKSİT" value="43.244 ₺" vs={52} />
      <Card x={1060} y={660} w={750} h={170} t0={T(2, 8)} accent={C.red}>
        <Label x={36} y={24}>GELİRİN NE KADARI TAKSİTE GİDİYOR?</Label>
        <div style={{position: 'absolute', left: 36, top: 76, width: 560, height: 36, borderRadius: 18, background: 'rgba(255,255,255,.1)'}} />
        <div style={{position: 'absolute', left: 36, top: 76, width: 560 * 0.432 * p(T(2, 8) + 0.2, 0.8), height: 36, borderRadius: 18, background: `linear-gradient(90deg, ${C.gold}, ${C.red})`}} />
        <Tx x={620} y={64} w={110} s={54} wt={900} c={C.red} glow={C.red}>%43</Tx>
      </Card>
      <Src t0={1}>Hepsi varsayımdır: faiz, gelir ve ev fiyatı örnek amaçlıdır • Taksit = anapara × r / (1 − (1+r)^−120)</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 4: %20 enflasyon
const S4: React.FC = () => {
  const T = mk(3); const {p} = useTL();
  const X0 = 150, Y0 = 290, W = 640, H = 270;
  const xs = scaleLinear().domain([1, 4]).range([X0, X0 + W]);
  const ys = scaleLinear().domain([0, 180000]).range([Y0 + H, Y0]);
  const inc: [number, number][] = [[1, 100000], [2, 120000], [3, 144000], [4, 172800]];
  const tak: [number, number][] = [[1, 43244], [4, 43244]];
  const mkLine = d3line<[number, number]>().x((d) => xs(d[0])).y((d) => ys(d[1]));
  const q1 = p(T(3, 2), 1.4), q2 = p(T(3, 3), 0.8);
  const hv = [3.0, 3.6, 4.32, 5.184, 6.2208];
  return (
    <Shell title="Birinci Senaryo: Enflasyon %20" sub="Gelir ve ev fiyatı yılda %20 artıyor • taksit sabit">
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        {[0, 50000, 100000, 150000].map((v) => (
          <g key={v}><line x1={X0} x2={X0 + W} y1={ys(v)} y2={ys(v)} stroke="rgba(255,255,255,.12)" strokeWidth={2} strokeDasharray="8 10" />
            <text x={X0 - 14} y={ys(v) + 8} fill={C.grey} fontSize={22} fontFamily={FONT} fontWeight={700} textAnchor="end">{v / 1000}K</text></g>
        ))}
        {[1, 2, 3, 4].map((y) => <text key={y} x={xs(y)} y={Y0 + H + 36} fill={C.grey} fontSize={24} fontFamily={FONT} fontWeight={700} textAnchor="middle">{y}. yıl</text>)}
        <path d={mkLine(inc)!} fill="none" stroke={C.green} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - q1} style={{filter: `drop-shadow(0 0 14px ${C.green})`}} />
        <path d={mkLine(tak)!} fill="none" stroke={C.red} strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - q2} style={{filter: `drop-shadow(0 0 14px ${C.red})`}} />
      </svg>
      <Tx x={X0} y={Y0 - 44} s={28} wt={900} c={C.green} o={p(T(3, 2), 0.3)}>Gelir: 100.000 → 172.800 ₺</Tx>
      <Tx x={X0 + 300} y={ys(43244) - 46} s={28} wt={900} c={C.red} o={p(T(3, 3), 0.3)}>Taksit: 43.244 ₺ (sabit)</Tx>
      <Chip x={X0} y={625} w={W} h={74} t0={T(3, 5)} col={C.gold} s={30}>TAKSİT YÜKÜ: %43 → %25</Chip>
      {/* ev değeri */}
      <Tx x={1000} y={Y0 - 44} s={28} wt={900} c={C.gold2} o={p(T(3, 6) - 0.4, 0.3)}>Ev değeri (milyon ₺)</Tx>
      {hv.map((v, i) => <VBar key={i} x={1000 + i * 160} base={Y0 + H} w={110} v={v} max={6.3} hmax={H - 10} col={i === 4 ? C.gold2 : C.gold} t0={T(3, 6) + i * 0.35} label={i === 0 ? 'Bugün' : i + '. yıl'} top={M(v)} dim={i < 4} />)}
      <Tx x={1000} y={Y0 + H + 60} w={800} s={34} wt={900} c={C.gold2} o={p(T(3, 6) + 1.8, 0.4)}>6.220.800 ₺ • neredeyse iki katı</Tx>
      {/* borç */}
      <Tx x={X0} y={738} s={26} wt={800} c={C.grey} ls={2} o={p(T(3, 7), 0.3)}>BANKAYA KALAN BORÇ (başlangıç 2,40 M ₺)</Tx>
      <HBar x={X0} y={780} w={1500} t0={T(3, 7)} label="Rakam olarak" val={1.896} max={2.4} txt="≈ 1,90 M ₺" col={C.blue} h={40} ls={260} />
      <HBar x={X0} y={840} w={1500} t0={T(3, 8)} label="Bugünün parasıyla" val={0.914} max={2.4} txt="≈ 0,91 M ₺" col={C.green} h={40} ls={260} />
      <Stamp x={1180} y={745} t0={T(3, 9)} col={C.green} s={56} rot={-4}>BORÇ ERİDİ</Stamp>
      <Src t0={1}>Hesap: kendi hesabımız • Bugünün parası = rakam ÷ 1,2⁴ (2,0736) • Varsayımsal örnek</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 5: kâr gerçek mi
const S5: React.FC = () => {
  const T = mk(4); const {p, pop} = useTL();
  const mx = 6.5, bw = 1050;
  const Row: React.FC<{y: number; t0: number; label: string; v: number; col: string; txt: string}> = ({y, t0, label, v, col, txt}) => (
    <HBar x={110} y={y} w={bw + 440} t0={t0} label={label} val={v} max={mx} txt={txt} col={col} h={46} ls={430} />
  );
  return (
    <Shell title="Kâr Gerçek mi?" sub="4 yıl sonunda hesap • %20 enflasyon">
      <Row y={260} t0={T(4, 1)} label="Ev değeri" v={6.2208} col={C.gold} txt="6,22 M ₺" />
      <Row y={330} t0={T(4, 1) + 0.6} label="− Banka borcu" v={1.896} col={C.blue} txt="1,90 M ₺" />
      <Row y={400} t0={T(4, 1) + 1.2} label="= Ev serveti" v={4.3248} col={C.green} txt="≈ 4,33 M ₺" />
      <Row y={490} t0={T(4, 2)} label="Ödenen (peşinat + taksit)" v={2.6757} col={C.red} txt="≈ 2,68 M ₺" />
      <Chip x={110} y={580} w={820} h={80} t0={T(4, 3)} col={C.green} s={34}>KÂĞIT ÜSTÜ KÂR ≈ +1,65 M ₺</Chip>
      <Stamp x={1010} y={575} t0={T(4, 4)} col={C.red} s={56} rot={-5}>AMA!</Stamp>
      <Row y={684} t0={T(4, 5)} label="Parayı enflasyon kadar değerlendirseydiniz" v={4.2767} col={C.purple} txt="4,28 M ₺" />
      <Card x={110} y={800} w={600} h={140} t0={T(4, 6)} accent={C.gold}>
        <Label x={30} y={22}>GERÇEK KAZANÇ</Label>
        <Tx x={30} y={62} s={64} wt={900} c={C.gold2} glow={C.gold}>yalnızca 48 bin ₺</Tx>
      </Card>
      <Card x={740} y={800} w={530} h={140} t0={T(4, 8)} accent={C.green}>
        <Label x={30} y={22}>KİRA GELİRİ (BRÜT %7)</Label>
        <Tx x={30} y={62} s={64} wt={900} c={C.green} glow={C.green}>≈ +1,58 M ₺</Tx>
      </Card>
      <Card x={1300} y={800} w={510} h={140} t0={T(4, 9)} accent={C.green}>
        <Label x={30} y={22}>TOPLAM</Label>
        <Tx x={30} y={62} s={64} wt={900} c={C.white} glow={C.green}>≈ +1,63 M ₺</Tx>
      </Card>
      <Src t0={1}>Hesap: kendi hesabımız • Değerlendirme: tüm ödemeler yılda %20 büyütülür • Kira vergi ve boş kalma hariç</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 6: %40 enflasyon
const S6: React.FC = () => {
  const T = mk(5); const {p} = useTL();
  const hv = [3.0, 4.2, 5.88, 8.232, 11.5248];
  const base = 720;
  return (
    <Shell title="İkinci Senaryo: Enflasyon %40" sub="Ev iki yılda neredeyse iki katı • taksit aynı">
      <div style={{position: 'absolute', left: 110, top: base, width: 1000, height: 4, background: C.line}} />
      {hv.map((v, i) => {
        const t0 = i <= 2 ? T(5, 2) + i * 0.5 : T(5, 9) + (i - 3) * 0.6;
        return <VBar key={i} x={140 + i * 200} base={base} w={150} v={v} max={11.6} hmax={430} col={i === 2 ? C.gold2 : i === 4 ? C.red : C.gold} t0={t0} label={i === 0 ? 'Bugün' : i + '. yıl'} top={M(v)} dim={i === 1 || i === 3} />;
      })}
      <Tx x={110} y={235} s={26} wt={800} c={C.grey} ls={2} o={p(T(5, 2), 0.3)}>EV DEĞERİ (milyon ₺)</Tx>
      <Chip x={110} y={800} w={480} h={70} t0={T(5, 3)} col={C.green} s={24}>GELİR 140.000 ₺ • YÜK %31</Chip>
      <Chip x={620} y={800} w={490} h={70} t0={T(5, 4)} col={C.blue} s={24}>BANKA BORCU ≈ 2,19 M ₺</Chip>
      <Card x={1170} y={235} w={640} h={330} t0={T(5, 5)} accent={C.gold}>
        <Label x={32} y={24}>2. YIL SONU</Label>
        <Tx x={32} y={68} s={32} wt={700} c={C.grey} w={580} o={p(T(5, 6), 0.3)}>Kâğıt üstü kâr</Tx>
        <Tx x={600} y={64} w={190} align="right" s={42} wt={900} c={C.green} o={p(T(5, 6), 0.3)}>+2,05 M</Tx>
        <Tx x={32} y={136} s={32} wt={700} c={C.grey} w={580} o={p(T(5, 7), 0.3)}>Gerçek kazanç</Tx>
        <Tx x={600} y={132} w={190} align="right" s={42} wt={900} c={C.gold2} glow={C.gold} o={p(T(5, 7), 0.3)}>+1,05 M</Tx>
        <Tx x={32} y={204} s={32} wt={700} c={C.grey} w={580} o={p(T(5, 8), 0.3)}>Kira dahil</Tx>
        <Tx x={600} y={200} w={190} align="right" s={42} wt={900} c={C.white} glow={C.green} o={p(T(5, 8), 0.3)}>+1,74 M</Tx>
      </Card>
      <Card x={1170} y={595} w={640} h={280} t0={T(5, 10)} accent={C.red}>
        <Label x={32} y={24}>4 YIL SÜRSEYDİ</Label>
        <Tx x={32} y={68} s={32} wt={700} c={C.grey} w={580}>Ev değeri</Tx>
        <Tx x={600} y={64} w={190} align="right" s={42} wt={900} c={C.red} glow={C.red}>11,52 M</Tx>
        <Tx x={32} y={134} s={32} wt={700} c={C.grey} w={580}>Gerçek kazanç</Tx>
        <Tx x={600} y={130} w={190} align="right" s={42} wt={900} c={C.gold2}>≈ +3,0 M</Tx>
        <Tx x={32} y={200} s={32} wt={700} c={C.grey} w={580}>Kira dahil</Tx>
        <Tx x={600} y={196} w={190} align="right" s={42} wt={900} c={C.white} glow={C.green}>≈ +5,7 M</Tx>
      </Card>
      <Src t0={1}>Hesap: kendi hesabımız • Faiz aylık %1,5 sabit • Gerçek kazanç = ev serveti − (ödemeler yılda %40 büyütülmüş)</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 7: 72 kuralı
const Ring: React.FC<{cx: number; cy: number; r: number; col: string; q: number}> = ({cx, cy, r, col, q}) => (
  <svg width={2 * r + 40} height={2 * r + 40} style={{position: 'absolute', left: cx - r - 20, top: cy - r - 20}}>
    <circle cx={r + 20} cy={r + 20} r={r} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth={22} />
    <circle cx={r + 20} cy={r + 20} r={r} fill="none" stroke={col} strokeWidth={22} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - q} transform={`rotate(-90 ${r + 20} ${r + 20})`} style={{filter: `drop-shadow(0 0 16px ${col})`}} />
  </svg>
);
const S7: React.FC = () => {
  const T = mk(6); const {p} = useTL();
  return (
    <Shell title="72 Kuralı" sub="Bir değer ne kadar sürede iki katına çıkar?">
      <Tx x={960} y={250} w={1400} align="center" s={90} wt={900} c={C.gold2} glow={C.gold} o={p(T(6, 1) - 0.3, 0.4)}>72 ÷ yıllık artış %</Tx>
      <Card x={160} y={410} w={720} h={430} t0={T(6, 1) + 0.2} accent={C.gold}>
        <Label x={40} y={26}>YILLIK %20</Label>
        <Ring cx={190} cy={250} r={105} col={C.gold} q={p(T(6, 1) + 0.6, 1.4)} />
        <Tx x={380} y={150} s={78} wt={900} c={C.white}>72 ÷ 20</Tx>
        <Tx x={380} y={250} s={64} wt={900} c={C.gold2} glow={C.gold} o={p(T(6, 1) + 1.4, 0.4)}>≈ 3,6 yıl</Tx>
      </Card>
      <Card x={1040} y={410} w={720} h={430} t0={T(6, 2)} accent={C.red}>
        <Label x={40} y={26}>YILLIK %40</Label>
        <Ring cx={190} cy={250} r={105} col={C.red} q={p(T(6, 2) + 0.4, 0.9)} />
        <Tx x={380} y={150} s={78} wt={900} c={C.white}>72 ÷ 40</Tx>
        <Tx x={380} y={250} s={64} wt={900} c={C.red} glow={C.red} o={p(T(6, 2) + 1.0, 0.4)}>≈ 1,8 yıl</Tx>
      </Card>
      <Chip x={160} y={880} w={1600} h={70} t0={T(6, 3)} col={C.green} s={30}>ENFLASYON NE KADAR YÜKSEKSE EV O KADAR ÇABUK İKİ KATINA ÇIKAR</Chip>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 8: kural
const S8: React.FC = () => {
  const T = mk(7); const {p} = useTL();
  const row = (y: number, t0: number, col: number | string, infl: number, label: string, res: string, rc: string) => (
    <div key={y}>
      <Card x={110} y={y} w={1700} h={170} t0={t0} accent={rc}>
        <Tx x={36} y={22} s={26} wt={800} c={rc} ls={2}>{label}</Tx>
        <div style={{position: 'absolute', left: 36, top: 80, width: 760 * (20 / 45), height: 30, borderRadius: 15, background: C.grey + 'aa'}} />
        <Tx x={36 + 760 * (20 / 45) + 16} y={74} s={26} wt={800} c={C.grey}>Faiz %20 (sabit)</Tx>
        <div style={{position: 'absolute', left: 36, top: 122, width: 760 * (infl / 45) * p(t0 + 0.3, 0.8), height: 30, borderRadius: 15, background: rc, boxShadow: `0 0 24px ${rc}88`}} />
        <Tx x={36 + 760 * (infl / 45) + 16} y={116} s={26} wt={800} c={rc}>{'Enflasyon %' + infl}</Tx>
        <Tx x={1000} y={44} w={660} s={46} wt={900} c={rc} glow={rc} o={p(t0 + 0.5, 0.4)}>{res}</Tx>
      </Card>
    </div>
  );
  return (
    <Shell title="Tek Kural" sub="Kredinin sabit faizi ile enflasyonu karşılaştır">
      {row(260, T(7, 2), 0, 20, 'ENFLASYON ≈ FAİZ', 'Kazanç = sadece kira', C.gold as string)}
      {row(460, T(7, 3), 0, 40, 'ENFLASYON > FAİZ', 'Borç erir, kazanç büyür', C.green as string)}
      {row(700, T(7, 5), 0, 10, 'ENFLASYON < FAİZ', 'Kredi ağırlaşır', C.red as string)}
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 9: bugün
const S9: React.FC = () => {
  const T = mk(8); const {p} = useTL();
  return (
    <Shell title="Peki Bugün?" sub="Aynı üç milyonluk ev, aynı kredi • bugünün rakamları">
      <Stat x={110} y={250} w={540} h={210} t0={T(8, 1)} col={C.red} label="KONUT KREDİSİ FAİZİ" value="Ayda %2,87" sub="en düşük tekliflerde" vs={64} />
      <Stat x={680} y={250} w={540} h={210} t0={T(8, 2)} col={C.red} label="YILLIK KARŞILIĞI" value="≈ %40" sub="bileşik" vs={80} />
      <Stat x={1250} y={250} w={560} h={210} t0={T(8, 3)} col={C.gold} label="KONUT FİYATI • ENFLASYON" value="%22,3 • %29,77" sub="eylül yıllık • ekim yıllık" vs={52} />
      <Tx x={110} y={490} s={26} wt={800} c={C.grey} ls={2} o={p(T(8, 4), 0.3)}>YILLIK ORAN (%)</Tx>
      <HBar x={110} y={525} w={1000} t0={T(8, 4)} label="Kredi maliyeti" val={40.4} max={45} txt="%40,4" col={C.red} h={40} ls={260} />
      <HBar x={110} y={578} w={1000} t0={T(8, 4) + 0.5} label="Enflasyon" val={29.77} max={45} txt="%29,77" col={C.gold} h={40} ls={260} />
      <HBar x={110} y={631} w={1000} t0={T(8, 4) + 1.0} label="Konut fiyatı artışı" val={22.3} max={45} txt="%22,3" col={C.green} h={40} ls={260} />
      <Card x={1340} y={500} w={470} h={210} t0={T(8, 6)} accent={C.red}>
        <Label x={28} y={22}>TAKSİT (3 MİLYONLUK EV)</Label>
        <Tx x={28} y={76} s={62} wt={900} c={C.red} glow={C.red}>71.269 ₺</Tx>
        <Tx x={28} y={154} s={26} wt={600} c={C.grey} w={420}>gelirin ≈ %47'si (150.000 ₺)</Tx>
      </Card>
      <Card x={110} y={785} w={800} h={170} t0={T(8, 7)} accent={C.red}>
        <Label x={32} y={22}>ENFLASYON KADAR DEĞERLENDİRENE GÖRE (4 YIL)</Label>
        <Tx x={32} y={68} s={84} wt={900} c={C.red} glow={C.red} ls={-2}>−3,11 M ₺</Tx>
      </Card>
      <Card x={940} y={785} w={870} h={170} t0={T(8, 8)} accent={C.red}>
        <Label x={32} y={22}>KİRA DA EKLENİRSE (BRÜT %7)</Label>
        <Tx x={32} y={68} s={84} wt={900} c={C.red} glow={C.red} ls={-2}>−1,21 M ₺</Tx>
      </Card>
      <Stamp x={560} y={688} t0={T(8, 9)} col={C.red} s={40} rot={-3}>TERSİNE DÖNÜYOR</Stamp>
      <div style={{position: 'absolute', left: 110, top: 972, opacity: p(T(8, 10), 0.4), fontFamily: FONT, fontSize: 24, fontWeight: 700, color: C.grey}}>Tapu harcı, aidat, bakım ve kira vergisi dahil değil • sonucu daha da kötüleştirir</div>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 10: kiracı
const S10: React.FC = () => {
  const T = mk(9); const {p, count} = useTL();
  return (
    <Shell title="Evi Olmayan Ne Oluyor?" sub="Kiracı için aynı enflasyon ters çalışıyor">
      <Stat x={110} y={250} w={560} h={230} t0={T(9, 2)} col={C.red} label="KASIM KİRA ARTIŞ TAVANI" value="%31,23" sub="yasal azami oran" vs={96} />
      <Card x={700} y={250} w={1110} h={230} t0={T(9, 3)} accent={C.red}>
        <Label x={36} y={26}>30.000 ₺ KİRA, BİR YIL SONRA</Label>
        <Tx x={36} y={84} s={70} wt={900} c={C.grey} style={{textDecoration: 'line-through'}}>30.000 ₺</Tx>
        <Tx x={360} y={84} s={70} wt={900} c={C.white}>→</Tx>
        <Tx x={460} y={80} s={86} wt={900} c={C.red} glow={C.red}>{count(T(9, 3) + 0.2, 1.2, 30000, 39369, 0, '39.369 ₺')}</Tx>
        <Tx x={36} y={178} s={34} wt={800} c={C.red} o={p(T(9, 3) + 1.4, 0.4)}>+9.369 ₺ / ay</Tx>
      </Card>
      <Chip x={110} y={530} w={900} h={86} t0={T(9, 4)} col={C.gold} s={32}>EV SAHİBİNİN KAZANCI = KİRACININ KAYBI</Chip>
      <Card x={110} y={660} w={820} h={260} t0={T(9, 5)} accent={C.gold}>
        <Label x={36} y={26}>ORTALAMA BRÜT KİRA GETİRİSİ</Label>
        <Tx x={36} y={76} s={120} wt={900} c={C.gold2} glow={C.gold} ls={-3}>≈ %7</Tx>
        <Tx x={36} y={212} s={26} wt={600} c={C.grey}>yıllık, evin değerine oranla</Tx>
      </Card>
      <Card x={960} y={660} w={850} h={260} t0={T(9, 6)} accent={C.red}>
        <Label x={36} y={26}>EVİN KİRAYLA KENDİNİ ÖDEMESİ</Label>
        <Tx x={36} y={76} s={120} wt={900} c={C.red} glow={C.red} ls={-3}>≈ 14 yıl</Tx>
        <Tx x={36} y={212} s={26} wt={600} c={C.grey}>amortisman süresi, ülke ortalaması</Tx>
      </Card>
      <Src>TÜİK/Bakanlık yasal tavan • Reidin Emlak Endeksi (Şubat 2026: %7,29, 14,2 yıl) • Türkiye Gazetesi (Mart 2026: %7,5)</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 11: maaş zammı
const S11: React.FC = () => {
  const T = mk(10); const {p} = useTL();
  return (
    <Shell title="Maaş Zammı Ne Kadar Yardım Eder?" sub="Taksit sabit • yük, gelirin artışına bağlı">
      <Tx x={110} y={250} s={26} wt={800} c={C.grey} ls={2} o={p(T(10, 1), 0.3)}>TAKSİT / GELİR (%)</Tx>
      <HBar x={110} y={300} w={1700} t0={T(10, 1)} label="1. yıl" val={43.2} max={50} txt="%43" col={C.red} h={54} ls={540} />
      <HBar x={110} y={380} w={1700} t0={T(10, 1) + 0.8} label="4. yıl • gelir yılda %20 artarsa" val={25} max={50} txt="%25" col={C.green} h={54} ls={540} />
      <HBar x={110} y={460} w={1700} t0={T(10, 4) - 0.6} label="4. yıl • gelir yılda %10 artarsa" val={32.5} max={50} txt="%32,5" col={C.gold} h={54} ls={540} />
      <Card x={110} y={600} w={820} h={290} t0={T(10, 3)} accent={C.red}>
        <Label x={36} y={26}>DÜNKÜ VİDEO • ASGARİ ÜCRET</Label>
        <Tx x={36} y={76} s={46} wt={900} c={C.green}>Zam %27,01</Tx>
        <Tx x={36} y={140} s={46} wt={900} c={C.red}>Fiyatlar ≈ %27,5</Tx>
        <Tx x={36} y={216} s={30} wt={700} c={C.grey}>on ayda zam eridi</Tx>
      </Card>
      <Chip x={960} y={640} w={850} h={96} t0={T(10, 2)} col={C.gold} s={30}>YÜK, GELİRİN ENFLASYON KADAR ARTMASINA BAĞLI</Chip>
      <Chip x={960} y={770} w={850} h={96} t0={T(10, 4)} col={C.red} s={28}>GELİR GERİDE KALIRSA YÜK HAFİFLEMEZ</Chip>
      <Src>Gelir artışı örnekleri varsayımdır • Asgari ücret: dünkü video (TÜİK, Çalışma Bakanlığı; hesap kendi hesabımız)</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 12: riskler
const S12: React.FC = () => {
  const T = mk(11); const {p} = useTL();
  const R = (x: number, y: number, t0: number, col: string, head: string, body: string, sub: string) => (
    <Card key={head} x={x} y={y} w={820} h={290} t0={t0} accent={col}>
      <Label x={36} y={26} c={col}>{head}</Label>
      <Tx x={36} y={82} s={48} wt={900} w={750}>{body}</Tx>
      <Tx x={36} y={170} s={30} wt={600} c={C.grey} w={750}>{sub}</Tx>
    </Card>
  );
  return (
    <Shell title="Riskler" sub="Hikâyenin anlatılmayan tarafı">
      {R(110, 250, T(11, 1), C.red, 'İŞİNİ KAYBEDERSEN', 'Taksit durmaz', 'Gelir kesilse de borç ve taksit devam eder')}
      {R(990, 250, T(11, 2), C.gold, 'FAİZ DEĞİŞKENSE', 'Taksit artabilir', 'Faiz yükselirse aylık ödeme büyür')}
      {R(110, 570, T(11, 3), C.blue, 'EVİN FİYATI HER ZAMAN ARTMAZ', 'Eylülde reel −%5,7', 'Nominal %22,3 arttı, enflasyondan arındırılınca düştü')}
      {R(990, 570, T(11, 5), C.purple, 'HAYATTA KALANLARIN HİKÂYESİ', 'Zorlananlar anlatılmaz', 'Borçla ev alıp faiz yüzünden zorlananlar hikâyelerde yer almaz')}
      <Src>TCMB Konut Fiyat Endeksi (eylül: nominal %22,3, reel −%5,7)</Src>
    </Shell>
  );
};

// ---------------------------------------------------------------- sahne 13: özet
const S13: React.FC = () => {
  const T = mk(12); const {p} = useTL();
  return (
    <Shell title="Özetle" sub="Kredi ile ev, enflasyonda zenginleştirebilir mi?">
      <Card x={110} y={250} w={1700} h={200} t0={T(12, 0)} accent={C.gold}>
        <Label x={40} y={26}>TEK ŞART</Label>
        <Tx x={40} y={76} s={64} wt={900} w={1620} c={C.white} glow={C.gold}>Ev fiyatlarının artışı, kredinin faizini geçmeli</Tx>
      </Card>
      <Chip x={110} y={490} w={830} h={90} t0={T(12, 1)} col={C.green} s={28}>2022: FAİZ, ENFLASYONUN ÇOK ALTINDAYDI</Chip>
      <Chip x={980} y={490} w={830} h={90} t0={T(12, 2)} col={C.red} s={28}>BUGÜN: FAİZ YÜKSEK • GARANTİ YOK</Chip>
      <Chip x={110} y={620} w={1700} h={80} t0={T(12, 3)} col={C.gold} s={26}>BİLGİLENDİRME AMAÇLIDIR • YATIRIM TAVSİYESİ DEĞİLDİR</Chip>
      <Chip x={110} y={730} w={1700} h={80} t0={T(12, 4)} col={C.blue} s={26}>KARAR ÖNCESİ KENDİ GELİRİNİ, BORCUNU VE RİSKİNİ HESAPLA</Chip>
      <div style={{position: 'absolute', left: 560, top: 850, width: 800, height: 100, borderRadius: 50, background: `linear-gradient(135deg, ${C.red}, #b8323d)`, boxShadow: `0 0 50px ${C.red}77`, opacity: p(T(12, 5), 0.4),
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 44, color: '#fff', letterSpacing: 3}}>KANALA ABONE OL</div>
    </Shell>
  );
};

// ---------------------------------------------------------------- ticker
const TICK = ['KİRA TAVANI %31,23', 'KONUT KREDİSİ AYLIK ≈%2,87', 'TÜFE YILLIK %29,77', 'KONUT FİYATI +%22,3 (EYLÜL)', 'POLİTİKA FAİZİ %36', 'BRÜT KİRA GETİRİSİ ≈%7', 'ASGARİ ÜCRET ZAMMI %27,01'];
const Ticker2: React.FC<{total: number}> = ({total}) => {
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
const SCENES: {C: React.FC; from: number; to: number}[] = [
  {C: S1, from: 0, to: 1}, {C: S2, from: 1, to: 2}, {C: S3, from: 2, to: 3}, {C: S4, from: 3, to: 4}, {C: S5, from: 4, to: 5}, {C: S6, from: 5, to: 6}, {C: S7, from: 6, to: 7},
  {C: S8, from: 7, to: 8}, {C: S9, from: 8, to: 9}, {C: S10, from: 9, to: 10}, {C: S11, from: 10, to: 11}, {C: S12, from: 11, to: 12}, {C: S13, from: 12, to: 13},
];
const TT = 14;
const transitions: any[] = [
  slide({direction: 'from-right'}), fade(), slide({direction: 'from-bottom'}), wipe({direction: 'from-left'}), slide({direction: 'from-right'}), fade(),
  slide({direction: 'from-right'}), wipe({direction: 'from-bottom'}), fade(), slide({direction: 'from-left'}), fade(), slide({direction: 'from-right'}),
];
export const EnfVideo2: React.FC = () => (
  <>
    <Bg total={ENF2_TOTAL} />
    <TransitionSeries>
      {SCENES.flatMap(({C: Sc, from, to}, i) => {
        const a = fr(paras[from].start);
        const b = to >= paras.length ? ENF2_TOTAL : fr(paras[to].start);
        const last = i === SCENES.length - 1;
        const out = [<TransitionSeries.Sequence key={'s' + i} durationInFrames={Math.max(TT + 1, b - a + (last ? 0 : TT))}><Sc /></TransitionSeries.Sequence>];
        if (!last) out.push(<TransitionSeries.Transition key={'t' + i} presentation={transitions[i % transitions.length]} timing={springTiming({config: {damping: 200}, durationInFrames: TT})} />);
        return out;
      })}
    </TransitionSeries>
    <Ticker2 total={ENF2_TOTAL} />
  </>
);
