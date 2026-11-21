import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {slide} from '@remotion/transitions/slide';
import {fade} from '@remotion/transitions/fade';
import {wipe} from '@remotion/transitions/wipe';
import {
  ArrowRight, Banknote, Bell, CalendarDays, ChartColumn, Coins, Cpu, Fuel, Gem, Globe, History, Home, Landmark, Percent, Scale, ShieldAlert, ShoppingCart, TrendingDown, TrendingUp, Wallet, Repeat, Hourglass, Flag,
} from 'lucide-react';
import D from './enf8_sentences.json';
import {Bg4, DateCtx, EChart, F, Hdr, MONO, P, Panel, Source, T, useFonts} from './Pro';
import {useTL} from './ui';
import {Big, BLU, GLD, GRN, hbar, ico, PUR, RED, Row, Stamp} from './Enf4';
import {BrandTicker, Bug, Bumper, BUMPER_DUR, EndCard, Grain, INTRO_DUR, IntroSting, LowerThird, PushIn} from './Brand';
import {Stock} from './Stock';
import {Kin, n, SLV, useCnt} from './Enf6';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
export const ENF8_TOTAL = Math.ceil(D.total * FPS);
type Pa = {start: number; end: number; sentences: number[]};
const paras = D.paras as Pa[];
const A = (pi: number, si = 0) => paras[pi].sentences[Math.min(si, paras[pi].sentences.length - 1)];
const mk = (pi0: number) => (pi: number, si = 0) => A(pi, si) - paras[pi0].start;
const OFF = D.off, END = D.end;
const clamp = (v: number) => Math.max(0, Math.min(1, v));

// ---------------------------------------------------------------- ons altın yolculuğu (zaman çizelgesi)
// gün: 1 Ocak = 0. Bilinen noktalar arası düz çizgi (yaklaşık).
const PTS: [number, number][] = [[0, 4320], [28, 5590], [29, 5030], [105, 4000], [230, 4634], [259, 4400], [319, 3920], [323, 3573]];
const MONTHS = ['OCA', 'ŞUB', 'MAR', 'NİS', 'MAY', 'HAZ', 'TEM', 'AĞU', 'EYL', 'EKİ', 'KAS'];
const MDAY = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304];
const CX = 170, CW = 1600, CY = 200, CH = 470, DMAX = 334, VMIN = 3000, VMAX = 5900;
const X = (d: number) => CX + (d / DMAX) * CW;
const Y = (v: number) => CY + 20 + ((VMAX - v) / (VMAX - VMIN)) * (CH - 60);
const vAt = (d: number) => {
  for (let i = 1; i < PTS.length; i++) if (d <= PTS[i][0]) { const [d0, v0] = PTS[i - 1], [d1, v1] = PTS[i]; return v0 + ((v1 - v0) * (d - d0)) / Math.max(1e-6, d1 - d0); }
  return PTS[PTS.length - 1][1];
};
type Ev = {d: number; v?: number; head: string; val: string; c: string; dx: number; dy: number; t: number};
const EVS = {
  start: {d: 0, head: '1 OCAK', val: '4.320 $', c: SLV, dx: 24, dy: 40},
  peak: {d: 28, head: '28–29 OCAK • REKOR', val: '5.590 $', c: GLD, dx: 40, dy: -30},
  warsh: {d: 29, head: 'WARSH ADAYLIĞI', val: 'zirveden −%10+', c: RED, dx: 40, dy: 50},
  spring: {d: 105, head: 'İLKBAHAR', val: '≈ 4.000 $', c: RED, dx: -120, dy: 50},
  aug: {d: 230, head: 'AĞUSTOS', val: '4.634 $', c: GRN, dx: -360, dy: -110},
  sep: {d: 259, head: 'EYLÜL • FED ARTIRDI', val: '%3,75–4,00', c: BLU, dx: -150, dy: 60},
  nov: {d: 316, head: 'KASIM • TUTANAK, WILLIAMS', val: 'aralıkta artış?', c: PUR, dx: -380, dy: -140},
  now: {d: 323, head: '20 KASIM • 14 AYIN DİBİ', val: '3.573 $', c: RED, dx: -370, dy: 40},
};
type EvKey = keyof typeof EVS;

const Yol: React.FC<{d0: number; d1: number; t0: number; dur: number; evs: [EvKey, number][]; hi?: EvKey[]}> = ({d0, d1, t0, dur, evs, hi = []}) => {
  const {t, p, pop} = useTL();
  const q = clamp((t - t0) / Math.max(0.01, dur));
  const e = q < 0.5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2;
  const dc = d0 + (d1 - d0) * e;
  const pts: [number, number][] = [];
  for (const [d, v] of PTS) if (d < dc) pts.push([d, v]);
  pts.push([dc, vAt(dc)]);
  const line = pts.map(([d, v], i) => `${i ? 'L' : 'M'}${X(d).toFixed(1)},${Y(v).toFixed(1)}`).join(' ');
  const area = line + ` L${X(dc).toFixed(1)},${CY + CH - 40} L${X(0)},${CY + CH - 40} Z`;
  const hx = X(dc), hy = Y(vAt(dc));
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080}}>
      <div style={{position: 'absolute', left: 110, top: CY - 10, width: 1700, height: CH + 20, borderRadius: 28, background: P.panel, border: `1px solid ${P.line}`}} />
      <T x={140} y={CY + 6} s={20} wt={700} c={P.muted} ls={2}>ONS ALTIN ($) • 2026 YOLCULUĞU</T>
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        <defs>
          <linearGradient id="yolA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={GLD} stopOpacity={0.42} /><stop offset="1" stopColor={GLD} stopOpacity={0} /></linearGradient>
          <filter id="yolG"><feGaussianBlur stdDeviation="6" /></filter>
        </defs>
        {[3500, 4000, 4500, 5000, 5500].map((v) => (
          <g key={v}>
            <line x1={CX} x2={CX + CW} y1={Y(v)} y2={Y(v)} stroke="#ffffff14" strokeDasharray="6 8" />
            <text x={CX + CW + 10} y={Y(v) + 7} fill="#7f93b0" fontSize={20} fontFamily={MONO} fontWeight={700}>{n(v)}</text>
          </g>
        ))}
        {MONTHS.map((m, i) => <text key={m} x={X(MDAY[i]) + 4} y={CY + CH - 12} fill="#9fb2cb" fontSize={20} fontFamily={F} fontWeight={700}>{m}</text>)}
        <line x1={CX} x2={CX + CW} y1={CY + CH - 40} y2={CY + CH - 40} stroke="#3a5072" strokeWidth={2} />
        <path d={area} fill="url(#yolA)" />
        <path d={line} fill="none" stroke={GLD} strokeWidth={10} opacity={0.5} filter="url(#yolG)" />
        <path d={line} fill="none" stroke={GLD} strokeWidth={6} strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={hx} cy={hy} r={12 + 4 * Math.sin(t * 6)} fill={GLD} opacity={0.35} />
        <circle cx={hx} cy={hy} r={9} fill="#fff" stroke={GLD} strokeWidth={4} />
      </svg>
      {evs.map(([k, et]) => {
        const ev = EVS[k]; const ex = X(ev.d), ey = Y(vAt(ev.d));
        const on = hi.includes(k); const a = p(et, 0.35) * (hi.length && !on ? 0.55 : 1); const s = pop(et);
        const bx = ex + ev.dx, by = ey + ev.dy;
        return (
          <React.Fragment key={k}>
            <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0, opacity: a}}>
              <line x1={ex} y1={ey} x2={ev.dx < 0 ? bx + 320 : bx} y2={by + 30} stroke={ev.c} strokeWidth={2} strokeDasharray="4 5" />
              <circle cx={ex} cy={ey} r={8 + 6 * s} fill={ev.c} stroke="#fff" strokeWidth={3} />
            </svg>
            <div style={{position: 'absolute', left: bx, top: by, width: 320, padding: '8px 16px', borderRadius: 14, background: 'rgba(8,18,36,.94)', border: `2px solid ${ev.c}`, boxShadow: on ? `0 0 30px ${ev.c}66` : 'none', opacity: a, transform: `scale(${0.85 + 0.15 * s})`, transformOrigin: ev.dx < 0 ? 'right center' : 'left center'}}>
              <div style={{fontFamily: F, fontWeight: 800, fontSize: 17, color: ev.c, letterSpacing: 1}}>{ev.head}</div>
              <div style={{fontFamily: MONO, fontWeight: 800, fontSize: 30, color: '#fff'}}>{ev.val}</div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

// alt sıradaki dört kart
const Tile: React.FC<{i: number; t0: number; c: string; label: string; value: string; sub?: string; icon?: any; vs?: number}> = ({i, t0, c, label, value, sub, icon, vs = 54}) => {
  const {p, pop} = useTL(); const x = 110 + i * 430;
  return (
    <div style={{position: 'absolute', left: x, top: 700, width: 410, height: 230, borderRadius: 24, background: `linear-gradient(155deg, ${c}30, rgba(9,22,42,.95))`, border: `1px solid ${c}88`, opacity: p(t0, 0.3), transform: `translateY(${(1 - pop(t0)) * 40}px)`, boxShadow: `0 0 30px ${c}25`}}>
      {icon && <div style={{position: 'absolute', right: 22, top: 20, color: c, opacity: 0.9}}>{ico(icon, 40)}</div>}
      <T x={26} y={22} s={20} wt={700} c={P.muted} ls={2} w={300}>{label}</T>
      <T x={26} y={62} s={vs} wt={800} mono c="#fff" w={370} ls={-1}>{value}</T>
      {sub && <T x={26} y={150} s={23} wt={700} c={c} w={370}>{sub}</T>}
    </div>
  );
};

// ---------------------------------------------------------------- S0 kanca
const S0: React.FC = () => {
  const T0 = mk(0); const {p} = useTL(); const c = useCnt();
  return (
    <AbsoluteFill>
      <Stock src="stock/taki-1.mp4" dur={paras[1].start - paras[0].start + 0.5} dim={0.5} />
      <Kin x={110} y={140} w={1500} s={116}>ONS ALTIN ZİRVEDEN %36 AŞAĞIDA</Kin>
      <Panel x={110} y={500} w={560} h={290} t0={1.6} accent={GLD}>
        <T x={34} y={22} s={22} wt={700} c={P.muted} ls={2}>OCAK ZİRVESİ</T>
        <T x={34} y={64} s={104} wt={800} mono c={GLD} glow={GLD} ls={-5}>{c(1.8, 5590, 0, 4320, 1.4) + ' $'}</T>
        <T x={36} y={210} s={26} wt={600} c="#cfdbec">28–29 Ocak 2026</T>
      </Panel>
      <Panel x={690} y={500} w={540} h={290} t0={T0(0, 1)} accent={RED}>
        <T x={34} y={22} s={22} wt={700} c={P.muted} ls={2}>DÜN KAPANIŞ</T>
        <T x={34} y={64} s={104} wt={800} mono c="#fff" glow={RED} ls={-5}>{c(T0(0, 1) + 0.2, 3573, 0, 5590, 1.6) + ' $'}</T>
        <T x={36} y={210} s={26} wt={700} c={RED}>zirveden −%36</T>
      </Panel>
      <Panel x={1250} y={500} w={560} h={290} t0={T0(0, 2)} accent={GLD}>
        <T x={34} y={22} s={22} wt={700} c={P.muted} ls={2}>GRAM ALTIN</T>
        <T x={34} y={64} s={104} wt={800} mono c="#fff" glow={GLD} ls={-5}>{c(T0(0, 2) + 0.2, 5810, 0, 7810, 1.6) + ' ₺'}</T>
        <T x={36} y={210} s={26} wt={700} c={RED}>rekor 7.810 ₺</T>
      </Panel>
      <div style={{position: 'absolute', left: 110, top: 840, opacity: p(T0(0, 3), 0.4), fontFamily: MONO, fontSize: 26, color: '#cfdbec'}}>Yılın yolculuğu • Türkiye'de gram altın • Enflasyon • Ne zaman aldınız? • Tarih • Kapanış tablosu</div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S1 başlangıç
const S1: React.FC = () => {
  const T0 = mk(1);
  return (
    <AbsoluteFill>
      <Hdr title="Hikâyenin Başı: 1 Ocak 2026" sub="Ons altın, dolar ve gram altın yılbaşında" icon={ico(Flag)} accent={GLD} />
      <Yol d0={0} d1={0} t0={0} dur={0.1} evs={[['start', T0(1, 1)]]} />
      <Tile i={0} t0={T0(1, 1)} c={GLD} label="ONS ALTIN" value="4.320 $" sub="yılbaşı" icon={Coins} />
      <Tile i={1} t0={T0(1, 2)} c={GRN} label="DOLAR / TL" value="42,96" sub="1 Ocak" icon={Banknote} />
      <Tile i={2} t0={T0(1, 2) + 1.6} c={GLD} label="GRAM ALTIN" value="5.966 ₺" sub="1 Ocak" icon={Coins} />
      <Tile i={3} t0={T0(1, 3)} c={BLU} label="BEKLENTİ" value="Faiz ↓" sub="Fed bu yıl indirecek" icon={Landmark} />
      <Source>Kitco, Bloomberg HT, Mynet • yaklaşık</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S2 ocak rallisi
const S2: React.FC = () => {
  const T0 = mk(2); const c = useCnt();
  return (
    <AbsoluteFill>
      <Hdr title="Ocak: Çılgın Bir Ay" sub="Birkaç haftada tarihî zirve" icon={ico(TrendingUp)} accent={GRN} />
      <Yol d0={0} d1={28} t0={T0(2, 1)} dur={3.5} evs={[['start', -1], ['peak', T0(2, 1) + 3.2]]} hi={['peak']} />
      <Tile i={0} t0={T0(2, 1)} c={GRN} label="ONS • BİRKAÇ HAFTADA" value={'+%' + c(T0(2, 1) + 0.3, 29, 0, 0, 3)} sub="yüzde otuza yakın" icon={TrendingUp} />
      <Tile i={1} t0={T0(2, 2)} c={GLD} label="GRAM ALTIN REKORU" value={c(T0(2, 2) + 0.2, 7810, 0, 5966, 1.4) + ' ₺'} sub="tüm zamanların zirvesi" icon={Coins} />
      <Tile i={2} t0={T0(2, 3)} c={GRN} label="GRAM • 1 AYDA" value={'+%' + c(T0(2, 3) + 0.2, 31, 0, 0, 1.2)} sub="1.800 ₺'den fazla" icon={TrendingUp} />
      <Tile i={3} t0={T0(2, 5)} c={RED} label="UYARI İŞARETİ" value="Kalabalık" sub="satmayı bekleyen çok kişi" icon={ShieldAlert} vs={48} />
      <Source>Kitco 5.589,38 $ (gün içi) • Bloomberg HT • yaklaşık</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S3 sert dönüş
const S3: React.FC = () => {
  const T0 = mk(3);
  return (
    <AbsoluteFill>
      <Hdr title="Zirveden Hemen Sonra Sert Dönüş" sub="Ocak sonu • dolar güçlendi, kaldıraç çözüldü" icon={ico(TrendingDown)} accent={RED} />
      <Yol d0={28} d1={29} t0={T0(3, 2)} dur={1.5} evs={[['start', -1], ['peak', -1], ['warsh', T0(3, 3)]]} hi={['warsh']} />
      <Tile i={0} t0={T0(3, 1)} c={BLU} label="FED BAŞKAN ADAYI" value="Warsh" sub="dolar güçlendi" icon={Landmark} />
      <Tile i={1} t0={T0(3, 2)} c={PUR} label="VADELİ İŞLEMLER" value="Teminat ↑" sub="kaldıraçlı pozisyonlar kapandı" icon={Scale} vs={50} />
      <Tile i={2} t0={T0(3, 3)} c={RED} label="30 OCAK" value="−%10+" sub="zirveden aşağıda" icon={TrendingDown} />
      <Tile i={3} t0={T0(3, 7)} c={SLV} label="GÜMÜŞ • BU HAFTA" value="−%15+" sub="altından daha oynak" icon={Coins} />
      <Source>Reuters, Kitco • gümüş haftalık: Sabah −%14,7, HDFC −%17 • yaklaşık</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S4 ilkbahar ve yaz
const S4: React.FC = () => {
  const T0 = mk(4); const {t} = useTL();
  const sec = t < T0(4, 4) - 0.1;
  return (
    <AbsoluteFill>
      <Hdr title="İlkbahar ve Yaz: Belirleyici Petrol" sub="Enflasyon yükseldi, faiz beklentisi tersine döndü" icon={ico(Fuel)} accent={GLD} />
      {sec
        ? <Yol d0={29} d1={105} t0={T0(4, 3)} dur={2.2} evs={[['start', -1], ['peak', -1], ['warsh', -1], ['spring', T0(4, 3) + 1.8]]} hi={['spring']} />
        : <Yol d0={105} d1={230} t0={T0(4, 4)} dur={3} evs={[['start', -1], ['peak', -1], ['warsh', -1], ['spring', -1], ['aug', T0(4, 4) + 2.8]]} hi={['aug']} />}
      <Tile i={0} t0={T0(4, 0)} c={GLD} label="PETROL" value="Sıçrama" sub="fiyatlar yükseldi" icon={Fuel} />
      <Tile i={1} t0={T0(4, 1)} c={RED} label="ABD ENFLASYONU" value="Yukarı" sub="petrol etkisi" icon={TrendingUp} />
      <Tile i={2} t0={T0(4, 2)} c={BLU} label="FAİZ BEKLENTİSİ" value="↓ → ↑" sub="indirimden artışa" icon={Percent} />
      <Tile i={3} t0={T0(4, 4)} c={GRN} label="AĞUSTOS" value="4.634 $" sub="merkez bankası alımları" icon={Landmark} />
      <Source>İkincil kaynaklar • ara noktalar yaklaşık, çizgi temsilîdir</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S5 eylül artışı
const S5: React.FC = () => {
  const T0 = mk(5); const c = useCnt();
  return (
    <AbsoluteFill>
      <Hdr title="Eylül: Fed Faiz Artırdı" sub="2023'ten beri ilk artış" icon={ico(Landmark)} accent={BLU} />
      <Yol d0={230} d1={259} t0={T0(5, 0)} dur={2} evs={[['start', -1], ['peak', -1], ['warsh', -1], ['spring', -1], ['aug', -1], ['sep', T0(5, 1) + 0.6]]} hi={['sep']} />
      <Tile i={0} t0={T0(5, 1)} c={BLU} label="POLİTİKA FAİZİ" value={'%' + c(T0(5, 1) + 0.3, 3.75, 2, 3.5, 1.2) + '–4'} sub="2023'ten beri ilk artış" icon={Percent} vs={50} />
      <Tile i={1} t0={T0(5, 2)} c={RED} label="KARAR GÜNÜ" value="30 dakika" sub="sabahki kazanç geri verildi" icon={Hourglass} vs={50} />
      <Tile i={2} t0={T0(5, 3)} c={GLD} label="ALTINI TUTMAK" value="Pahalı" sub="altın faiz getirmez" icon={Coins} />
      <Tile i={3} t0={T0(5, 3) + 1.8} c={GRN} label="PARA NEREYE?" value="Dolar" sub="faiz getiren varlıklar" icon={Banknote} />
      <Source>Fed • ikincil kaynaklar • yaklaşık</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S6 kasım
const S6: React.FC = () => {
  const T0 = mk(6); const c = useCnt();
  return (
    <AbsoluteFill>
      <Hdr title="Kasım: Yılın En Sert Dönemi" sub="Bu hafta mart ayından beri en kötü hafta" icon={ico(TrendingDown)} accent={RED} />
      <Yol d0={259} d1={323} t0={T0(6, 1)} dur={T0(6, 6) - T0(6, 1)} evs={[['start', -1], ['peak', -1], ['warsh', -1], ['spring', -1], ['aug', -1], ['sep', -1], ['nov', T0(6, 2)], ['now', T0(6, 6)]]} hi={['nov', 'now']} />
      <Tile i={0} t0={T0(6, 3)} c={PUR} label="ARALIK FED" value="Artış?" sub="piyasa yüksek ihtimal veriyor" icon={Landmark} />
      <Tile i={1} t0={T0(6, 4)} c={GRN} label="DOLAR ENDEKSİ" value="Zirve" sub="Nisan 2025'ten beri en yüksek" icon={TrendingUp} />
      <Tile i={2} t0={T0(6, 5)} c={RED} label="ONS • BU HAFTA" value={'−%' + c(T0(6, 5) + 0.2, 8.9, 1, 0, 1.2)} sub="mart ayından beri en kötü" icon={TrendingDown} />
      <Tile i={3} t0={T0(6, 7)} c={GLD} label="GRAM • BU HAFTA" value={c(T0(6, 7) + 0.2, 5810, 0, 6270, 1.6) + ' ₺'} sub="pazartesi 6.270 → −460 ₺" icon={Coins} />
      <Source>Reuters, Aposto, Bigpara • 20 Kasım kapanış • gün içi dip 3.525 $</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S7 türkiye: dolar dengesi
const S7: React.FC = () => {
  const T0 = mk(7); const {p} = useTL(); const c = useCnt();
  const fq = (i: number) => p(T0(7, 2) + i * 0.9, 0.4);
  return (
    <AbsoluteFill>
      <Hdr title="Türkiye'de Durum Neden Farklı?" sub="Gram altın = ons × dolar ÷ 31,1" icon={ico(Scale)} accent={GLD} />
      <Panel x={110} y={200} w={1000} h={440} t0={T0(7, 3)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>YILBAŞINDAN BU YANA</T>
        <div style={{position: 'absolute', left: 10, top: 56}}><EChart w={980} h={370} option={hbar([
          {n: 'Ons altın', v: -17.3, txt: '−%17', c: RED, q: p(T0(7, 3), 0.9)},
          {n: 'Dolar / TL', v: 17.7, txt: '+%17,7', c: GRN, q: p(T0(7, 4), 0.9)},
          {n: 'Gram altın', v: -2.6, txt: '−%2,6', c: GLD, q: p(T0(7, 6), 0.9)},
        ], -26, 26, {left: 200, right: 150, bw: 58})} /></div>
      </Panel>
      <Panel x={1140} y={200} w={670} h={440} t0={T0(7, 9)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>OCAK ZİRVESİNDEN</T>
        <div style={{position: 'absolute', left: 10, top: 56}}><EChart w={650} h={370} option={hbar([
          {n: 'Ons', v: -36, txt: '−%36', c: RED, q: p(T0(7, 10), 0.9)},
          {n: 'Gram', v: -25.6, txt: '−%26', c: GLD, q: p(T0(7, 10) + 1.4, 0.9)},
        ], -45, 14, {left: 110, right: 30, bw: 64})} /></div>
      </Panel>
      <Panel x={110} y={670} w={1000} h={260} t0={T0(7, 2)} accent={BLU}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>FORMÜL • DÜN KAPANIŞ</T>
        <div style={{position: 'absolute', left: 34, top: 66, display: 'flex', gap: 18, fontFamily: MONO, fontWeight: 800, fontSize: 52, color: '#fff'}}>
          <span style={{opacity: fq(0), color: GLD}}>3.573 $</span><span style={{opacity: fq(1)}}>×</span><span style={{opacity: fq(1), color: GRN}}>50,57 ₺</span><span style={{opacity: fq(2)}}>÷ 31,1</span>
        </div>
        <div style={{position: 'absolute', left: 34, top: 146, fontFamily: MONO, fontWeight: 800, fontSize: 76, color: GLD, opacity: fq(3), textShadow: `0 0 30px ${GLD}77`}}>{'= ' + c(T0(7, 2) + 2.8, 5810, 0, 0, 1.2) + ' ₺'}</div>
      </Panel>
      <Big x={1140} y={670} w={670} h={260} label="GRAM ALTIN • YILBAŞI → DÜN" value={c(T0(7, 7), 5810, 0, 5966, 1.4) + ' ₺'} sub="1 Ocak 5.966 ₺" c={GLD} t0={T0(7, 7)} vs={90} icon={ico(Coins, 40)} />
      <Stamp x={790} y={545} t0={T0(7, 8)} c={GRN} s={34}>DOLAR DENGELEDİ</Stamp>
      <Source>Hesap: ons × USD/TRY ÷ 31,1035 • 20 Kasım kapanış • yaklaşık</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S8 çeyrek altın
const S8: React.FC = () => {
  const T0 = mk(8); const {p, pop} = useTL(); const c = useCnt();
  const step = (i: number, t0: number, txt: string, val: string, col: string) => (
    <div style={{position: 'absolute', left: 620, top: 210 + i * 104, width: 1190, height: 90, borderRadius: 20, background: P.panel, border: `1px solid ${col}66`, opacity: p(t0, 0.3), transform: `translateX(${(1 - p(t0, 0.5)) * 50}px)`, display: 'flex', alignItems: 'center', padding: '0 30px', justifyContent: 'space-between'}}>
      <div style={{fontFamily: F, fontWeight: 700, fontSize: 32, color: '#e6eef9'}}>{txt}</div>
      <div style={{fontFamily: MONO, fontWeight: 800, fontSize: 44, color: col}}>{val}</div>
    </div>
  );
  const sp = pop(T0(8, 0));
  return (
    <AbsoluteFill>
      <Hdr title="Çeyrek Altının Fiyatı Nasıl Oluşur?" sub="Ağırlık × ayar × gram fiyatı + işçilik" icon={ico(Coins)} accent={GLD} />
      <div style={{position: 'absolute', left: 130, top: 230, width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, #fff3c4, ${GLD} 45%, #9a6b12 100%)`, boxShadow: `0 0 80px ${GLD}66, inset 0 0 0 14px #c9962d`, transform: `scale(${0.6 + 0.4 * sp}) rotate(${(1 - sp) * -40}deg)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontFamily: F, fontWeight: 900, fontSize: 56, color: '#5a3d06', letterSpacing: 4}}>ÇEYREK</div>
        <div style={{fontFamily: MONO, fontWeight: 800, fontSize: 34, color: '#5a3d06'}}>22 AYAR</div>
      </div>
      {step(0, T0(8, 1), 'Ağırlık', '≈ 1,75 g', SLV)}
      {step(1, T0(8, 1) + 1.5, 'Ayar', '22 / 24', SLV)}
      {step(2, T0(8, 2), 'Saf altın', '≈ 1,6 g', GLD)}
      {step(3, T0(8, 4), '1,6 g × 5.810 ₺', c(T0(8, 4) + 0.3, 9300, 0, 0, 1.2) + ' ₺', GLD)}
      {step(4, T0(8, 4) + 3, '+ işçilik → kuyumcuda', '≈ 9.700 ₺', GRN)}
      <Panel x={110} y={740} w={1700} h={190} t0={T0(8, 5)} accent={RED}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>ALIŞ–SATIŞ FARKI</T>
        <div style={{position: 'absolute', left: 34, top: 64, display: 'flex', alignItems: 'center', gap: 24}}>
          <div style={{padding: '12px 26px', borderRadius: 14, background: `${GRN}26`, border: `1px solid ${GRN}`, fontFamily: F, fontWeight: 800, fontSize: 32, color: '#fff'}}>Kuyumcunun satışı</div>
          <div style={{color: P.muted}}>{ico(ArrowRight, 34)}</div>
          <div style={{padding: '12px 26px', borderRadius: 14, background: `${RED}26`, border: `1px solid ${RED}`, fontFamily: F, fontWeight: 800, fontSize: 32, color: '#fff', opacity: p(T0(8, 6), 0.3)}}>Kuyumcunun alışı daha düşük</div>
        </div>
        <T x={1080} y={70} w={600} s={30} wt={700} c={GLD} o={p(T0(8, 7), 0.3)}>Kısa sürede al-sat yapanın kazancını yiyebilir</T>
      </Panel>
      <Source>Hesap: 1,75 g × 22/24 ≈ 1,6 g • 20 Kasım fiyatları • yaklaşık</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S9 enflasyon
const S9: React.FC = () => {
  const T0 = mk(9); const {p} = useTL(); const c = useCnt();
  const bar = (i: number, t0: number, label: string, v: number, col: string) => {
    const q = p(t0, 1.2); const h = (v / 140000) * 520 * q;
    return (
      <div key={label} style={{position: 'absolute', left: 900 + i * 300, top: 200, width: 240, height: 700, opacity: p(t0 - 0.1, 0.3)}}>
        <div style={{position: 'absolute', bottom: 80, left: 20, width: 200, height: h, borderRadius: '18px 18px 0 0', background: `linear-gradient(180deg, ${col}, ${col}55)`, boxShadow: `0 0 30px ${col}55`}} />
        <div style={{position: 'absolute', bottom: 90 + h, left: 0, width: 240, textAlign: 'center', fontFamily: MONO, fontWeight: 800, fontSize: 38, color: '#fff'}}>{n(Math.round((v * q) / 100) * 100)}</div>
        <div style={{position: 'absolute', bottom: 0, left: 0, width: 240, textAlign: 'center', fontFamily: F, fontWeight: 700, fontSize: 24, color: P.muted, lineHeight: 1.15}}>{label}</div>
      </div>
    );
  };
  return (
    <AbsoluteFill>
      <Hdr title="İşin Enflasyon Tarafı" sub="Yılbaşında 100.000 ₺ gram altın alsaydınız" icon={ico(ShoppingCart)} accent={RED} />
      <Big x={110} y={200} w={740} h={300} label="OCAK–EKİM BİRİKİMLİ ENFLASYON" value={'%' + c(T0(9, 1) + 0.2, 27.5, 1, 0, 1.4)} sub="TÜİK verisiyle hesap" c={RED} t0={T0(9, 1)} vs={130} icon={ico(Percent, 44)} />
      <Big x={110} y={530} w={740} h={400} label="REEL SONUÇ" value={'≈ −%' + c(T0(9, 4) + 0.2, 24, 0, 0, 1.2)} sub="enflasyondan arındırılmış" c={RED} t0={T0(9, 4)} vs={150} icon={ico(TrendingDown, 44)} />
      <Panel x={880} y={200} w={930} h={730} t0={T0(9, 2)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>100.000 ₺ • BUGÜN</T>
      </Panel>
      <div style={{position: 'absolute', left: 900, top: 200 + 700 - 80 - (100000 / 140000) * 520, width: 890, height: 0, borderTop: '3px dashed #ffffff66', opacity: p(T0(9, 2), 0.4)}} />
      <T x={1640} y={200 + 700 - 80 - (100000 / 140000) * 520 - 36} s={22} wt={700} c="#cfdbec" o={p(T0(9, 2), 0.4)}>100.000 ₺</T>
      {bar(0, T0(9, 2), 'Gram altın bugün', 97400, GLD)}
      {bar(1, T0(9, 3), 'Alım gücünü korumak için gereken', 127500, RED)}
      <Source>TÜİK TÜFE (Ocak–Ekim 2026) • gram 5.966 → 5.810 ₺ • yaklaşık</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S10 ne zaman aldınız
const S10: React.FC = () => {
  const T0 = mk(10); const {p, pop} = useTL(); const c = useCnt();
  const card = (i: number, t0: number, col: string, head: string, sub: string, val: string, note: string) => {
    const x = 110 + (i % 2) * 860, y = 200 + Math.floor(i / 2) * 330;
    return (
      <div key={head} style={{position: 'absolute', left: x, top: y, width: 840, height: 310, borderRadius: 28, background: `linear-gradient(155deg, ${col}2e, rgba(9,22,42,.95))`, border: `2px solid ${col}99`, opacity: p(t0, 0.3), transform: `scale(${0.92 + 0.08 * pop(t0)})`}}>
        <T x={36} y={28} s={24} wt={800} c={col} ls={2}>{head}</T>
        <T x={36} y={66} s={26} wt={600} c="#cfdbec" w={760}>{sub}</T>
        <T x={36} y={120} s={96} wt={800} mono c="#fff" glow={col} ls={-3}>{val}</T>
        <T x={36} y={244} s={28} wt={800} c={col}>{note}</T>
      </div>
    );
  };
  return (
    <AbsoluteFill>
      <Hdr title="En Önemli Soru: Ne Zaman Aldınız?" sub="100.000 ₺'lik gram altın bugün ne ediyor?" icon={ico(Wallet)} accent={PUR} />
      {card(0, T0(10, 1), RED, 'OCAK ZİRVESİNDE ALAN', '100.000 ₺ →', c(T0(10, 1) + 0.3, 74400, 0, 100000, 1.4) + ' ₺', '−%26 zararda')}
      {card(1, T0(10, 2), GLD, 'YILBAŞINDA ALAN', '100.000 ₺ →', c(T0(10, 2) + 0.2, 97400, 0, 100000, 1) + ' ₺', 'küçük bir kayıp, −%2,6')}
      {card(2, T0(10, 4), GRN, '3 YIL ÖNCE ALAN • 20 KASIM 2023', 'gram 1.829 ₺ → 5.810 ₺', '×' + c(T0(10, 5), 3.2, 1, 1, 1.2), 'yaklaşık 3,2 katı')}
      {card(3, T0(10, 6), GRN, '5 YIL ÖNCE ALAN • KASIM 2021', 'gram ≈ 666 ₺ → 5.810 ₺', '×' + c(T0(10, 7), 8.7, 1, 1, 1.4), 'yaklaşık 8,7 katı')}
      <Row x={110} y={870} w={1700} t0={T0(10, 8)} icon={ico(ShieldAlert, 30)} c={GLD} head="UNUTMAYIN" text="Bu dönemde Türkiye'de enflasyon da çok yüksekti" h={70} ts={28} />
      <Source>Sözcü, Borsa İstanbul KMKTP • basit hesap, yaklaşık • yatırım tavsiyesi değildir</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S11 düzenli biriktirme
const S11: React.FC = () => {
  const T0 = mk(11); const {p} = useTL();
  const months: [string, number, number][] = [['1. ay', 6000, 1.0], ['2. ay', 7500, 0.8], ['3. ay', 5000, 1.2]];
  return (
    <AbsoluteFill>
      <Hdr title="Düzenli Biriktirene Ne Oluyor?" sub="Ortalama maliyet etkisi • örnek hesap" icon={ico(Repeat)} accent={GRN} />
      <Panel x={110} y={200} w={1100} h={600} t0={T0(11, 1)} accent={GRN}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>HER AY 6.000 ₺ • TEMSİLÎ FİYATLARLA</T>
        {months.map(([m, pr, g], i) => {
          const t0 = T0(11, 1) + 0.4 + i * 1.3; const q = p(t0, 0.8);
          return (
            <div key={m} style={{position: 'absolute', left: 40 + i * 350, top: 80, width: 320, height: 500, opacity: p(t0, 0.3)}}>
              <T x={160} y={0} w={320} align="center" s={30} wt={800} c="#cfdbec">{m}</T>
              <T x={160} y={44} w={320} align="center" s={26} wt={700} c={P.muted}>{'gram ' + n(pr) + ' ₺'}</T>
              <div style={{position: 'absolute', left: 80, bottom: 70, width: 160, height: 240 * g * q, borderRadius: '16px 16px 0 0', background: `linear-gradient(180deg, ${GLD}, ${GLD}55)`, boxShadow: `0 0 26px ${GLD}55`}} />
              <T x={160} y={440} w={320} align="center" s={44} wt={800} mono c={g >= 1 ? GRN : RED}>{n(g, 1) + ' g'}</T>
            </div>
          );
        })}
      </Panel>
      <Big x={1240} y={200} w={570} h={290} label="DÜZENLİ ALANIN ORT. MALİYETİ" value="6.000 ₺" sub="18.000 ₺ ÷ 3 gram" c={GRN} t0={T0(11, 3)} vs={84} />
      <Big x={1240} y={510} w={570} h={290} label="ZİRVEDE TEK SEFERDE ALAN" value="7.500 ₺" sub="gram başına" c={RED} t0={T0(11, 3) + 1.5} vs={84} />
      <Row x={110} y={830} w={1700} t0={T0(11, 4)} icon={ico(ShieldAlert, 34)} c={GLD} head="NOT" text="Bu bir tavsiye değil, sadece hesabın nasıl işlediğinin açıklaması" h={100} ts={32} />
      <Source>Örnek rakamlar temsilîdir</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S12 merkez bankası ve aileler
const S12: React.FC = () => {
  const T0 = mk(12); const {p, pop} = useTL(); const c = useCnt();
  const items: [any, string][] = [[Home, 'Yastık altı'], [Gem, 'Düğün takıları'], [Landmark, 'Banka hesapları']];
  return (
    <AbsoluteFill>
      <Hdr title="Düşüş Merkez Bankası'nı da Etkiliyor" sub="TCMB rezervleri • 13 Kasım haftası" icon={ico(Landmark)} accent={GLD} />
      <Big x={110} y={200} w={830} h={330} label="TCMB ALTIN REZERVİ" value={c(T0(12, 1) + 0.2, 99.7, 1, 0, 1.4) + ' mr $'} sub="yaklaşık" c={GLD} t0={T0(12, 1)} vs={120} icon={ico(Coins, 44)} />
      <Big x={980} y={200} w={830} h={330} label="ALTIN FİYATI ETKİSİ • TEK HAFTA" value={'−' + c(T0(12, 2) + 0.2, 4.4, 1, 0, 1.2) + ' mr $'} sub="brüt rezervde" c={RED} t0={T0(12, 2)} vs={120} icon={ico(TrendingDown, 44)} />
      <Panel x={110} y={570} w={1700} h={360} t0={T0(12, 3)} accent={GLD}>
        <T x={34} y={20} s={20} wt={700} c={P.muted} ls={2}>MİLYONLARCA AİLENİN BİRİKİMİ</T>
        {items.map(([I, tx], i) => (
          <div key={tx} style={{position: 'absolute', left: 60 + i * 550, top: 80, width: 480, height: 230, borderRadius: 24, background: `${GLD}18`, border: `1px solid ${GLD}66`, opacity: p(T0(12, 3) + i * 0.8, 0.3), transform: `scale(${0.9 + 0.1 * pop(T0(12, 3) + i * 0.8)})`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18}}>
            <div style={{color: GLD}}>{ico(I, 70)}</div>
            <div style={{fontFamily: F, fontWeight: 800, fontSize: 40, color: '#fff'}}>{tx}</div>
          </div>
        ))}
      </Panel>
      <Source>TCMB haftalık para ve banka istatistikleri • Gedik Yatırım</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S13 tarih
const S13: React.FC = () => {
  const T0 = mk(13); const {p} = useTL();
  const spark = (pts: number[], q: number, col: string) => {
    const w = 480, h = 150, mx = Math.max(...pts), mn = Math.min(...pts);
    const xy = pts.map((v, i) => [(i / (pts.length - 1)) * w, h - ((v - mn) / (mx - mn)) * h] as [number, number]);
    const k = q * (xy.length - 1); const shown: [number, number][] = [];
    xy.forEach((pt, i) => { if (i <= k) shown.push(pt); });
    const i0 = Math.floor(k); if (i0 < xy.length - 1) { const f = k - i0; shown.push([xy[i0][0] + (xy[i0 + 1][0] - xy[i0][0]) * f, xy[i0][1] + (xy[i0 + 1][1] - xy[i0][1]) * f]); }
    return <svg width={w + 20} height={h + 20} style={{position: 'absolute', left: 36, top: 250}}><path d={shown.map(([x, y], i) => `${i ? 'L' : 'M'}${x + 10},${y + 10}`).join(' ')} fill="none" stroke={col} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" style={{filter: `drop-shadow(0 0 8px ${col})`}} /></svg>;
  };
  const card = (i: number, t0: number, col: string, yr: string, head: string, pts: number[], l1: string, l2: string, t2: number) => (
    <div key={yr} style={{position: 'absolute', left: 110 + i * 575, top: 200, width: 550, height: 560, borderRadius: 28, background: 'linear-gradient(160deg, rgba(14,30,58,.96), rgba(8,18,36,.96))', border: `2px solid ${col}`, boxShadow: `0 0 50px ${col}33`, opacity: p(t0, 0.3)}}>
      <T x={36} y={30} s={64} wt={900} mono c={col}>{yr}</T>
      <T x={36} y={120} s={30} wt={800} w={480}>{head}</T>
      {spark(pts, p(t0 + 0.3, 2.5), col)}
      <T x={36} y={440} s={36} wt={800} mono c="#fff" o={p(t2, 0.3)}>{l1}</T>
      <T x={36} y={490} s={26} wt={700} c={col} o={p(t2, 0.3)}>{l2}</T>
    </div>
  );
  return (
    <AbsoluteFill>
      <Hdr title="Tarihe Bakınca" sub="Altının uzun düşüş dönemleri • şematik çizim" icon={ico(History)} accent={PUR} />
      {card(0, T0(13, 1), GLD, '2011', 'Zirve ≈ 1.920 $', [1000, 1500, 1920, 1650, 1300, 1060, 1250, 1300, 1500, 2000], '4 yılda ≈ −%45', 'kalıcı aşım ≈ 9 yıl', T0(13, 2))}
      {card(1, T0(13, 3), PUR, '1980', 'Zirve ≈ 850 $', [300, 850, 450, 350, 400, 380, 280, 300, 650, 900], 'aşılması: 2008', 'yaklaşık 27 yıl', T0(13, 4))}
      {card(2, T0(13, 6), BLU, '2022', 'Fed hızla faiz artırırken', [1900, 2050, 1850, 1750, 1680, 1620, 1800], '2.050 → 1.620 $', 'mart → kasım, ≈ −%20', T0(13, 6) + 1.5)}
      <Row x={110} y={790} w={1700} t0={T0(13, 7)} icon={ico(ShieldAlert, 32)} c={GLD} head="AMA" text="Geçmiş, bugün de aynısının olacağı anlamına gelmiyor" h={64} ts={28} />
      <Row x={110} y={866} w={1700} t0={T0(13, 9)} icon={ico(Banknote, 32)} c={GRN} head="TÜRKİYE" text="Kur yükselince ons düşerken gram altın kısmen korunabiliyor" h={64} ts={28} />
      <Source>Genel piyasa verileri • çizgiler şematiktir, rakamlar yaklaşık</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S14 dünyadan
const S14: React.FC = () => {
  const T0 = mk(14); const {p, pop} = useTL();
  const card = (x: number, t0: number, col: string, I: any, head: string, title: string, fx: string, t2: number) => (
    <div style={{position: 'absolute', left: x, top: 200, width: 830, height: 700, borderRadius: 30, background: 'linear-gradient(160deg, rgba(14,30,58,.96), rgba(8,18,36,.96))', border: `2px solid ${col}`, boxShadow: `0 0 60px ${col}33`, opacity: p(t0, 0.3), transform: `translateY(${(1 - pop(t0)) * 50}px)`}}>
      <div style={{position: 'absolute', left: 36, top: 34, width: 96, height: 96, borderRadius: 26, background: `${col}26`, border: `1px solid ${col}`, color: col, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ico(I, 54)}</div>
      <T x={156} y={40} s={22} wt={700} c={P.muted} ls={2}>{head}</T>
      <T x={156} y={74} w={640} s={44} wt={900}>{title}</T>
      <div style={{position: 'absolute', left: 36, top: 400, width: 758, height: 2, background: P.line}} />
      <T x={36} y={430} s={24} wt={800} c={GLD} ls={2} o={p(t2, 0.3)}>BİZE ETKİSİ</T>
      <T x={36} y={474} w={758} s={40} wt={800} o={p(t2, 0.3)}>{fx}</T>
    </div>
  );
  return (
    <AbsoluteFill>
      <Hdr title="Dünyadan İki Gelişme" sub="Cebimize etkisiyle" icon={ico(Globe)} accent={BLU} />
      {card(110, T0(14, 1), PUR, Cpu, '1 • ABD', 'Yapay zekâ hisselerinde satış', 'Dalga Borsa İstanbul\'a da yansıdı', T0(14, 1) + 2.5)}
      {card(980, T0(14, 2), GLD, Fuel, '2 • ŞİNCEN', 'Trump, Şi ve Putin: yakıt arzı artacak', 'Sakin petrol, motorinde 6,5 ₺ indirimin arka planında', T0(14, 3))}
      <Source>Reuters, CNBC, Bloomberg • rakam henüz açıklanmadı</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S15 takvim
const S15: React.FC = () => {
  const T0 = mk(15); const {p} = useTL();
  const items: [string, any, string, string, number][] = [
    ['Aralık ortası', Landmark, 'Fed toplantısı • faiz ne kadar artacak?', BLU, T0(15, 1)],
    ['Sürekli', TrendingUp, 'ABD enflasyonu ve dolar endeksi', PUR, T0(15, 2)],
    ['3 Aralık', Percent, 'Türkiye kasım enflasyonu', RED, T0(15, 3)],
    ['10 Aralık', Landmark, 'TCMB faiz kararı', GLD, T0(15, 3) + 2.2],
    ['Her gün', Banknote, 'Dolar / TL kuru', GRN, T0(15, 3) + 4.2],
  ];
  return (
    <AbsoluteFill>
      <Hdr title="Altın İçin İzlenecek Başlıklar" sub="Önümüzdeki haftalar" icon={ico(CalendarDays)} accent={BLU} />
      <div style={{position: 'absolute', left: 340, top: 220, width: 6, height: 700 * p(T0(15, 0), 3), background: `linear-gradient(180deg, ${BLU}, ${GLD})`, borderRadius: 3}} />
      {items.map(([h, I, tx, col, t0], i) => (
        <div key={tx} style={{position: 'absolute', left: 110, top: 220 + i * 140, width: 1700, height: 120, opacity: p(t0, 0.3), transform: `translateX(${(1 - p(t0, 0.5)) * 60}px)`}}>
          <T x={200} y={36} w={200} align="right" s={30} wt={800} mono c={col}>{h}</T>
          <div style={{position: 'absolute', left: 212, top: 30, width: 54, height: 54, borderRadius: '50%', background: col, boxShadow: `0 0 24px ${col}`, color: '#06101e', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{ico(I, 30)}</div>
          <div style={{position: 'absolute', left: 300, top: 8, width: 1300, height: 104, borderRadius: 22, background: P.panel, border: `1px solid ${col}55`, display: 'flex', alignItems: 'center', paddingLeft: 30, fontFamily: F, fontWeight: 800, fontSize: 40, color: '#fff'}}>{tx}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S16 kapanış tablosu
type TileD = {n: string; v: string; sub: string; c: string; t: number};
const S16: React.FC = () => {
  const T0 = mk(16); const {p, pop} = useTL();
  const tiles: TileD[] = [
    {n: 'Ons altın', v: '3.573 $', sub: 'haftalık −%8,9', c: GLD, t: T0(16, 1)}, {n: 'Gram altın', v: '5.810 ₺', sub: 'cuma kapanış', c: GLD, t: T0(16, 2)},
    {n: 'Çeyrek altın', v: '≈ 9.700 ₺', sub: 'kuyumcu', c: GLD, t: T0(16, 2) + 1}, {n: 'Gümüş', v: '−%15+', sub: 'haftalık kayıp', c: SLV, t: T0(16, 3)},
    {n: 'Dolar / TL', v: '50,57', sub: 'cuma kapanış', c: GRN, t: T0(16, 4)}, {n: 'BIST 100', v: '≈ 11.120', sub: 'cuma −%2,44 • hafta ≈ −%6', c: RED, t: T0(16, 5)},
    {n: 'Brent', v: '≈ 91 $', sub: 'varil', c: BLU, t: T0(16, 6)}, {n: 'Motorin', v: '88,80 ₺', sub: 'İstanbul', c: GRN, t: T0(16, 7)},
  ];
  const W = 412, H = 330, G = 18;
  return (
    <AbsoluteFill>
      <Hdr title="Haftanın Kapanış Tablosu" sub="20 Kasım 2026 cuma kapanışı" icon={ico(ChartColumn)} accent={GLD} />
      {tiles.map((tl, i) => {
        const x = 110 + (i % 4) * (W + G), y = 200 + Math.floor(i / 4) * (H + G);
        const sp = pop(tl.t), a = p(tl.t, 0.3);
        return (
          <div key={tl.n} style={{position: 'absolute', left: x, top: y, width: W, height: H, borderRadius: 24, background: `linear-gradient(155deg, ${tl.c}38, rgba(9,22,42,.94))`, border: `1px solid ${tl.c}77`, opacity: a, transform: `scale(${0.9 + 0.1 * sp})`, boxShadow: `0 0 34px ${tl.c}30`}}>
            <T x={28} y={30} s={30} wt={700} c="#cfdbec" w={370}>{tl.n}</T>
            <T x={28} y={110} s={66} wt={800} mono c="#fff" w={380} ls={-1}>{tl.v}</T>
            <T x={28} y={250} s={26} wt={700} c={tl.c} w={370}>{tl.sub}</T>
          </div>
        );
      })}
      <Source>Borsa İstanbul, Aposto, kuyumcu ve dağıtım şirketi fiyatları • rakamlar yaklaşıktır • yatırım tavsiyesi değildir</Source>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S17 final
const S17: React.FC = () => {
  const T0 = mk(17); const {p} = useTL();
  return (
    <AbsoluteFill>
      <Hdr title="Pazartesi: Yeni Haftanın Açılışı" sub="Piyasa açılışı ve önemli veriler" icon={ico(Bell)} accent={RED} />
      <Row x={110} y={260} w={1700} t0={T0(17, 0)} icon={ico(Coins, 38)} c={GLD} head="KISACA" text="Fed'in faiz artırma yolu altını düşürdü, Türkiye'de dolar kuru düşüşün büyük kısmını dengeledi" h={110} ts={30} />
      <Row x={110} y={400} w={1700} t0={T0(17, 1)} icon={ico(ShieldAlert, 38)} c={GLD} head="BİLGİLENDİRME" text="Anlattıklarım bilgilendirme amaçlıdır, yatırım tavsiyesi değildir" h={110} ts={34} />
      <Panel x={110} y={540} w={1700} h={170} t0={T0(17, 2)} accent={RED}>
        <T x={40} y={22} s={22} wt={700} c={P.muted} ls={2}>PAZARTESİ</T>
        <T x={40} y={64} s={52} wt={800} w={1620} glow={RED}>Yeni haftanın piyasa açılışı ve önemli veriler</T>
      </Panel>
      <div style={{position: 'absolute', left: 560, top: 760, width: 800, height: 120, borderRadius: 60, background: `linear-gradient(135deg, ${RED}, #b8323d)`, boxShadow: `0 0 60px ${RED}88`, opacity: p(T0(17, 3), 0.4), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, fontFamily: F, fontWeight: 900, fontSize: 50, color: '#fff', letterSpacing: 3}}>{ico(Bell, 48)}KANALA ABONE OL</div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- gerçek görüntüler
type BR = [number, number, string, string | undefined, string | undefined, 'in' | 'out' | 'left' | 'right', number?];
const BROLL: BR[] = [
  [A(2, 4) - 0.1, A(2, 5) - 0.1, 'stock/foto-kapalicarsi-20279698.jpg', 'Kuyumcularda kuyruk', 'Ocak 2026', 'in'],
  [A(3, 1) - 0.1, A(3, 2) - 0.1, 'stock/foto-fed-6534073.jpg', 'Fed başkan adaylığı', 'Dolar güçlendi', 'in'],
  [A(3, 5) - 0.1, A(3, 7) - 0.1, 'stock/madeni-1.mp4', 'Gümüş', 'Altından daha oynak', 'right'],
  [A(4, 0) - 0.2, A(4, 1) - 0.1, 'stock/petrol-1.mp4', 'Petrol', 'İlkbahar ve yaz', 'in'],
  [A(6, 2) - 0.1, A(6, 3) - 0.1, 'stock/ulke-abd-1.mp4', 'New York Fed', 'John Williams', 'in'],
  [A(7, 0) - 0.2, A(7, 1) - 0.1, 'stock/istanbul-2.mp4', 'Türkiye\'de gram altın', 'Yılbaşına göre −%2,6', 'out'],
  [A(8, 0) - 0.2, A(8, 1) - 0.1, 'stock/foto-kapalicarsi-5096971.jpg', 'Çeyrek altın', 'Kuyumcuda ≈ 9.700 ₺', 'right'],
  [A(8, 5) - 0.1, A(8, 6) - 0.1, 'stock/taki-1.mp4', 'Alış ve satış', 'Kuyumcu makası', 'in'],
  [A(9, 0) - 0.2, A(9, 1) - 0.1, 'stock/avm-2.mp4', 'Enflasyon', 'Ocak–ekim ≈ %27,5', 'in'],
  [A(10, 0) - 0.2, A(10, 1) - 0.1, 'stock/para-tl.mp4', 'Ne zaman aldınız?', '100.000 ₺ örneği', 'in'],
  [A(11, 0) - 0.2, A(11, 1) - 0.1, 'stock/altin-1.mp4', 'Düzenli birikim', 'Her ay aynı tutar', 'out', 4],
  [A(12, 3) - 0.1, A(12, 4) - 0.1, 'stock/taki-3.mp4', 'Düğün takıları', 'Milyonlarca ailenin birikimi', 'in'],
  [A(13, 0) - 0.2, A(13, 1) - 0.1, 'stock/borsa-1.mp4', 'Tarihten örnekler', '1980 • 2011 • 2022', 'in'],
  [A(14, 1) - 0.1, A(14, 1) + 3.0, 'stock/sunucu-1.mp4', 'Yapay zekâ hisseleri', 'ABD borsalarında satış', 'in'],
  [A(14, 3) - 0.1, A(14, 3) + 3.0, 'stock/foto-akaryakit-12377482.jpg', 'Motorin', '6,5 ₺ indirim', 'right'],
  [A(16, 0) - 0.2, A(16, 1) - 0.1, 'stock/istanbul-3.mp4', 'Haftanın kapanışı', '20 Kasım 2026', 'in'],
];
const LT: [number, string][] = [
  [OFF + 0.6, 'Hafta sonu • Altının 2026 yolculuğu'],
  [A(7, 2) + 0.3, 'Türkiye • gram altın formülü'],
  [A(10, 3) + 0.3, 'Altın biriktirenler • alış zamanı'],
  [A(13, 2) + 0.3, 'Tarih • altının düşüş dönemleri'],
];
const TICK = ['ONS 3.573 $ (hafta −%8,9)', 'GRAM ALTIN 5.810 ₺', 'ÇEYREK ≈ 9.700 ₺', 'USD/TL 50,57', 'BIST 100 ≈ 11.120 (−%2,44)', 'GÜMÜŞ hafta −%15+', 'BRENT ≈ 91 $', 'MOTORİN 88,80 ₺', 'YATIRIM TAVSİYESİ DEĞİLDİR'];

const SCENES: React.FC[] = [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17];
const TT = 14;
const transitions: any[] = [fade(), slide({direction: 'from-right'}), wipe({direction: 'from-left'}), slide({direction: 'from-bottom'}), fade(), slide({direction: 'from-right'}), wipe({direction: 'from-bottom'}), fade(), slide({direction: 'from-left'})];
// yolculuk sahneleri (S1–S6) aynı grafiği sürdürür: aralarında yumuşak geçiş
const isJourney = (i: number) => i >= 1 && i <= 5;
export const EnfVideo8: React.FC = () => {
  useFonts();
  const total = ENF8_TOTAL;
  return (
    <DateCtx.Provider value="21 KASIM 2026">
      <AbsoluteFill style={{background: '#06101f'}}>
        <Sequence from={fr(OFF)} durationInFrames={fr(END - OFF)}><Bg4 total={total} /></Sequence>
        <Sequence from={fr(OFF)} durationInFrames={fr(END - OFF)}>
          <TransitionSeries>
            {SCENES.flatMap((Sc, i) => {
              const a = fr(paras[i].start - OFF);
              const b = i + 1 < SCENES.length ? fr(paras[i + 1].start - OFF) : fr(END - OFF);
              const last = i === SCENES.length - 1;
              const out = [<TransitionSeries.Sequence key={'s' + i} durationInFrames={Math.max(TT + 1, b - a + (last ? 0 : TT))}><PushIn dur={(b - a) / FPS} k={isJourney(i) || i === 6 ? 0.006 : 0.018}><Sc /></PushIn></TransitionSeries.Sequence>];
              if (!last) out.push(<TransitionSeries.Transition key={'t' + i} presentation={isJourney(i) ? fade() : transitions[i % transitions.length]} timing={springTiming({config: {damping: 200}, durationInFrames: TT})} />);
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
        <Sequence from={fr(D.bumpers[0])} durationInFrames={fr(BUMPER_DUR)}><Bumper label="TÜRKİYE'DE ALTIN" sub="FORMÜL • ÇEYREK • ENFLASYON • BİRİKİM" /></Sequence>
        <Sequence from={fr(D.bumpers[1])} durationInFrames={fr(BUMPER_DUR)}><Bumper label="BÜYÜK RESİM" sub="TCMB • TARİH • DÜNYA" c="#8b5cf6" /></Sequence>
        <Sequence from={fr(D.bumpers[2])} durationInFrames={fr(BUMPER_DUR)}><Bumper label="ÖNÜMÜZDEKİ GÜNLER" sub="TAKVİM • KAPANIŞ TABLOSU" c="#3b82f6" /></Sequence>
        <Sequence from={0} durationInFrames={fr(INTRO_DUR)}><IntroSting /></Sequence>
        <Sequence from={fr(END)} durationInFrames={total - fr(END)}><EndCard next="Yeni haftanın piyasa açılışı" /></Sequence>
        <Grain o={0.05} />
      </AbsoluteFill>
    </DateCtx.Provider>
  );
};
