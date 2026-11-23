import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {
  Banknote, Bell, Building2, CalendarDays, Car, ChartColumn, Coins, CreditCard, FileText, Fuel, Gavel, Globe, Home, Landmark, Percent, Plane, ShieldAlert, Sun, TrendingDown, TrendingUp, Users, Wallet, Scale,
} from 'lucide-react';
import D from './enf10_sentences.json';
import {
  Bars, Bug9, BUMP9, Bumper9, Card9, Count, DateChip, Drop, DropWords, End9, Frame9, Head9, HBar, Ico9, K, Line9, LT9, Paper, Push9, SANS, SERIF, Src9, Stock9, Ticker9, tr, Tx9, useFonts9,
} from './Palet';
import {Arrow, Badge, Box, Item} from './Enf9';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
export const ENF10_TOTAL = Math.ceil(D.total * FPS);
type Pa = {start: number; end: number; sentences: number[]};
const paras = D.paras as Pa[];
const A = (pi: number, si = 0) => paras[pi].sentences[Math.min(si, paras[pi].sentences.length - 1)];
const mk = (pi0: number) => (pi: number, si = 0) => A(pi, si) - paras[pi0].start;
const END = D.end;
const pct = (d = 0) => (v: number) => '%' + tr(v, d);
const tl = (v: number) => tr(v) + ' ₺';

// KAP kartı
const KapCard: React.FC<{t0: number; x: number; y: number; w: number; h?: number; code: string; title: string; text: string; tone?: 'sage' | 'taba'; I: any}> = ({t0, x, y, w, h = 150, code, title, text, tone = 'sage', I}) => (
  <Card9 t0={t0} x={x} y={y} w={w} h={h}>
    <div style={{position: 'absolute', left: 22, top: 22}}><Ico9 I={I} c={tone === 'sage' ? K.sage : K.tabaD} s={32} /></div>
    <div style={{position: 'absolute', left: 110, top: 18, display: 'flex', alignItems: 'center', gap: 14}}>
      <div style={{padding: '4px 12px', borderRadius: 10, background: tone === 'sage' ? K.sageD : K.coral, color: K.bg, fontFamily: SANS, fontWeight: 900, fontSize: 20, letterSpacing: 1}}>{code}</div>
      <div style={{fontFamily: SANS, fontWeight: 800, fontSize: 22, color: K.ink2}}>{title}</div>
    </div>
    <div style={{position: 'absolute', left: 110, top: 60, width: w - 140, fontFamily: SANS, fontWeight: 700, fontSize: 28, color: K.ink, lineHeight: 1.2}}>{text}</div>
  </Card9>
);

// ---------------------------------------------------------------- S0 kanca
const S0: React.FC = () => {
  const T0 = mk(0);
  return (
    <AbsoluteFill>
      <Frame9 src="stock/borsa-1.mp4" t0={0} x={1100} y={120} w={720} h={440} />
      <Tx9 t0={0} x={110} y={120} s={24} c={K.tabaD} wt={800} ls={4}>YENİ HAFTA • 23 KASIM</Tx9>
      <DropWords t0={0.05} x={106} y={160} w={960} s={100} stagger={0.08}>Kalıcı yükseliş mi, kısa bir tepki mi?</DropWords>
      <Card9 t0={T0(0, 2)} x={110} y={560} w={420} h={320} tone="sage" label="BIST 100 • HAFTALIK">
        <Count t0={T0(0, 2) + 0.3} v={6.01} d={1.4} dec={2} pre="−%" s={100} c={K.bg} x={28} y={90} />
        <Tx9 t0={T0(0, 2) + 1.4} x={30} y={220} w={360} s={30} c={K.sari} wt={800}>Bugün açılış +%0,55</Tx9>
      </Card9>
      <Card9 t0={T0(0, 3)} x={560} y={560} w={420} h={320} tone="bej" label="ONS ALTIN">
        <Count t0={T0(0, 3) + 0.3} v={3620} v0={3525} d={1.6} suf=" $" s={90} c={K.ink} x={28} y={90} />
        <Tx9 t0={T0(0, 3) + 1.2} x={30} y={220} w={360} s={28} c={K.tabaD} wt={800}>14 ayın dibinden toparlanma</Tx9>
      </Card9>
      <Card9 t0={T0(0, 4)} x={1010} y={600} w={400} h={280} label="HANEHALKI BEKLENTİSİ">
        <div style={{position: 'absolute', left: 30, top: 80, fontFamily: SANS, fontWeight: 900, fontSize: 40, color: K.sage}}>Enflasyon ↓</div>
        <div style={{position: 'absolute', left: 30, top: 150, fontFamily: SANS, fontWeight: 900, fontSize: 40, color: K.tabaD}}>Dolar ↑</div>
      </Card9>
      {['Borsa', 'Altın', 'Anket', 'Fon soruşturması', 'KAP', 'Takvim'].map((s, i) => (
        <Drop key={s} t0={T0(0, 5) + i * 0.25} x={1440 + (i % 2) * 190} y={600 + Math.floor(i / 2) * 76} style={{padding: '10px 18px', borderRadius: 30, background: K.paper, border: `2px solid ${K.taba}`, fontFamily: SANS, fontWeight: 800, fontSize: 22, color: K.ink2, whiteSpace: 'nowrap'}}>{s}</Drop>
      ))}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S1 geçen hafta
const S1: React.FC = () => {
  const T0 = mk(1);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="GEÇEN HAFTANIN KAPANIŞI" title="Borsa haftada yüzde 6 düştü" />
      <Card9 t0={T0(1, 1)} x={110} y={240} w={540} h={260} tone="sage" label="BIST 100 • 20 KASIM">
        <Count t0={T0(1, 1) + 0.3} v={11131} v0={11400} d={1.6} s={110} c={K.bg} x={28} y={80} />
        <Tx9 t0={T0(1, 1) + 1.2} x={30} y={200} s={28} c={K.sari} wt={800}>cuma −%2,36</Tx9>
      </Card9>
      <Card9 t0={T0(1, 2)} x={110} y={530} w={540} h={180} tone="taba" label="HAFTALIK KAYIP">
        <Count t0={T0(1, 2) + 0.2} v={6.01} d={1.2} dec={2} pre="−%" s={90} c={K.bg} x={28} y={64} />
      </Card9>
      <Card9 t0={T0(1, 4) - 0.2} x={110} y={740} w={540} h={160} />
      <Tx9 t0={T0(1, 4)} x={140} y={760} w={480} s={26} c={K.ink2} wt={800}>CUMA • 100 HİSSEDEN</Tx9>
      <Count t0={T0(1, 4) + 0.2} v={95} d={1.2} suf=" düştü" s={44} c={K.tabaD} x={140} y={814} />
      <Count t0={T0(1, 4) + 0.6} v={4} d={0.8} suf=" yükseldi" s={44} c={K.sage} x={390} y={814} />
      <Card9 t0={T0(1, 5)} x={690} y={240} w={1120} h={460} label="ABD • 20 KASIM CUMA">
        <HBar x={40} y={70} w={760} v={5.28} max={6} t0={T0(1, 6)} label="Nasdaq" fmt={(v) => '−%' + tr(v, 2)} c={K.coral} />
        <HBar x={40} y={240} w={760} v={3.7} max={6} t0={T0(1, 6) + 1.6} label="S&P 500" fmt={(v) => '−%' + tr(v, 2)} c={K.taba} />
      </Card9>
      <Card9 t0={T0(1, 7)} x={690} y={730} w={1120} h={170} tone="bej">
        <div style={{position: 'absolute', left: 26, top: 44}}><Ico9 I={TrendingDown} c={K.tabaD} s={40} bg={`${K.bg}aa`} /></div>
        <Tx9 t0={T0(1, 7) + 0.2} x={140} y={50} w={950} s={44} c={K.ink} wt={800} font={SERIF}>Nasdaq yılın bütün kazancını sildi</Tx9>
      </Card9>
      <Src9>Borsa İstanbul, Endeks24, CNBC • 20 Kasım 2026</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S2 açılış
const S2: React.FC = () => {
  const T0 = mk(2);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="YENİ HAFTA" title="Borsa güne yükselişle başladı" />
      <Card9 t0={T0(2, 1) - 0.3} x={110} y={240} w={1100} h={660} label="BIST 100">
        <Line9 x={20} y={60} w={1060} h={580} pts={[11842, 11131, 11192]} labels={['13 Kasım', '20 Kasım', 'Bugün açılış']} t0={T0(2, 1)} dur={3} min={10900} max={12000} c={K.sage} fmt={(v) => tr(v)} vs={40} />
      </Card9>
      <Card9 t0={T0(2, 1) + 0.5} x={1240} y={240} w={570} h={200} tone="sage" label="AÇILIŞ">
        <Count t0={T0(2, 1) + 0.8} v={0.55} d={1.2} dec={2} pre="+%" s={96} c={K.bg} x={28} y={74} />
      </Card9>
      <Card9 t0={T0(2, 3)} x={1240} y={470} w={570} h={220} tone="bej" label="İZLENEN DİRENÇLER">
        <Tx9 t0={T0(2, 3) + 0.2} x={28} y={74} s={52} c={K.ink} wt={900}>11.300</Tx9>
        <Tx9 t0={T0(2, 3) + 0.6} x={300} y={74} s={52} c={K.ink} wt={900}>11.400</Tx9>
        <Tx9 t0={T0(2, 3) + 0.9} x={28} y={150} s={22} c={K.mute} wt={700}>tavsiye değildir</Tx9>
      </Card9>
      <Card9 t0={T0(2, 4)} x={1240} y={720} w={570} h={180} label="DOLAR ENDEKSİ">
        <Count t0={T0(2, 4) + 0.2} v={103.72} v0={104.2} d={1.2} dec={2} s={80} c={K.ink} x={28} y={70} />
        <Tx9 t0={T0(2, 4) + 0.8} x={330} y={86} w={220} s={22} c={K.sage} wt={800}>19 ayın zirvesinden geri</Tx9>
      </Card9>
      <Src9>Borsa İstanbul, Manşet Haber, Borsatek, Memurlar.net • 23 Kasım sabah</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S3 altın
const S3: React.FC = () => {
  const T0 = mk(3);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="ALTIN" title="Dipten toparlanma çabası" />
      <Card9 t0={T0(3, 1)} x={110} y={240} w={560} h={280} tone="sage" label="ONS ALTIN • BU SABAH">
        <Count t0={T0(3, 2)} v={3620} v0={3525} d={1.8} suf=" $" s={110} c={K.bg} x={28} y={80} />
        <Tx9 t0={T0(3, 2) + 1.2} x={30} y={210} s={30} c={K.sari} wt={800}>≈ +%2,5 • cuma 3.525 $</Tx9>
      </Card9>
      <Card9 t0={T0(3, 3)} x={110} y={550} w={560} h={220} tone="bej" label="GRAM ALTIN">
        <Count t0={T0(3, 3) + 0.2} v={5880} v0={5732} d={1.4} suf=" ₺" s={96} c={K.ink} x={28} y={80} />
      </Card9>
      <Card9 t0={T0(3, 4)} x={700} y={240} w={1110} h={530} label="GRAM ALTIN (₺)">
        <Line9 x={20} y={60} w={1070} h={460} pts={[6261, 5732, 5880]} labels={['Geçen hafta', 'Cuma', 'Bu sabah']} t0={T0(3, 5) - 0.3} dur={2.6} min={5550} max={6400} c={K.coral} fmt={(v) => tr(v)} vs={40} />
      </Card9>
      <Card9 t0={T0(3, 6)} x={110} y={800} w={1700} h={110} tone="sage">
        <div style={{position: 'absolute', left: 24, top: 22}}><Ico9 I={ShieldAlert} c={K.taba} s={36} bg={`${K.bg}18`} /></div>
        <Tx9 t0={T0(3, 6) + 0.2} x={120} y={30} w={1540} s={38} c={K.bg} wt={800}>Bugünkü yükseliş kaybın yalnızca küçük bir bölümünü telafi etti</Tx9>
      </Card9>
      <Src9>Bloomberg HT, Türkgün, Mynet • 23 Kasım sabah • serbest piyasa</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S4 haftanın bilançosu
const S4: React.FC = () => {
  const T0 = mk(4); const base = 85000; const f = (v: number) => tl(Math.round((v + base) / 10) * 10);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="GEÇEN HAFTANIN BİLANÇOSU" title="100 bin lira nerede ne oldu?" />
      <Card9 t0={T0(4, 0) - 0.3} x={110} y={240} w={1700} h={660} />
      <Bars x={110} y={260} w={1700} h={640} max={17500} bw={250} vs={50} items={[
        {label: 'Gram altın', v: 91550 - base, t0: T0(4, 0), fmt: f, c: K.coral},
        {label: 'BIST 100', v: 93990 - base, t0: T0(4, 1), fmt: f, c: K.taba},
        {label: 'Dolar', v: 100360 - base, t0: T0(4, 2), fmt: f, c: K.sageL},
        {label: 'Mevduat', v: 100800 - base, t0: T0(4, 2) + 2.2, fmt: f, c: K.sage},
      ]} />
      <Src9>Pazartesi–cuma fiyatlarıyla basit hesap • mevduat stopaj öncesi • yatırım tavsiyesi değildir</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S5 dolar ve Fed
const S5: React.FC = () => {
  const T0 = mk(5);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="DÖVİZ" title="Gözler Fed'in aralık toplantısında" />
      <Card9 t0={T0(5, 0)} x={110} y={240} w={830} h={300} tone="sage" label="DOLAR / TL">
        <Count t0={T0(5, 0) + 0.3} v={50.6} v0={50.3} d={1.4} dec={2} s={140} c={K.bg} x={30} y={90} />
      </Card9>
      <Card9 t0={T0(5, 0) + 1.2} x={980} y={240} w={830} h={300} tone="bej" label="EURO / TL">
        <Count t0={T0(5, 0) + 1.5} v={55.6} v0={55.2} d={1.4} dec={2} s={140} c={K.ink} x={30} y={90} />
      </Card9>
      <Card9 t0={T0(5, 1)} x={110} y={580} w={1700} h={320} label="FED • 8–9 ARALIK • FAİZ ARTIŞI İHTİMALİ">
        <HBar x={40} y={70} w={1300} v={95} max={100} t0={T0(5, 2)} label="Piyasa fiyatlaması" fmt={(v) => '%' + tr(v)} c={K.coral} />
        <Tx9 t0={T0(5, 3)} x={40} y={230} w={1600} s={30} c={K.ink2} wt={700}>Doların gücü ve altının yönü açısından önemli</Tx9>
      </Card9>
      <Src9>Diken, Canlı Gaste, Paratic • 23 Kasım sabah</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S6 hanehalkı anketi
const S6: React.FC = () => {
  const T0 = mk(6);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="TCMB • HANEHALKI BEKLENTİ ANKETİ" title="Vatandaş ne bekliyor?" />
      <DateChip date="KASIM 2026 • 3.195 HANEHALKI" />
      <Card9 t0={T0(6, 1)} x={110} y={240} w={830} h={320} tone="sage" label="12 AY SONRASI ENFLASYON BEKLENTİSİ">
        <Count t0={T0(6, 1) + 0.3} v={43.24} v0={43.75} d={1.8} dec={2} pre="%" s={150} c={K.bg} x={30} y={90} />
        <Tx9 t0={T0(6, 1) + 1.6} x={30} y={250} s={30} c={K.sari} wt={800}>ekimde %43,75 • −0,51 puan</Tx9>
      </Card9>
      <Card9 t0={T0(6, 2)} x={980} y={240} w={830} h={320} tone="taba" label="12 AY SONRASI DOLAR BEKLENTİSİ">
        <Count t0={T0(6, 3)} v={58.18} v0={56.86} d={1.8} dec={2} suf=" ₺" s={140} c={K.bg} x={30} y={90} />
        <Tx9 t0={T0(6, 3) + 1.4} x={30} y={250} s={30} c={K.bg} wt={800}>ekimde 56,86 ₺</Tx9>
      </Card9>
      <Box t0={T0(6, 4)} x={110} y={600} w={830} label="KONUT FİYATI ARTIŞ BEKLENTİSİ" v={30.1} pre="%" suf="" dec={2} tone="bej" />
      <Box t0={T0(6, 5)} x={980} y={600} w={830} label="ASGARİ ÜCRETLİNİN ENFLASYON BEKLENTİSİ" v={46.8} pre="%" suf="" dec={1} tone="taba" />
      <Src9>TCMB Hanehalkı Beklenti Anketi (Kasım 2026) • AA, Dünya</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S7 beklenti farkı
const S7: React.FC = () => {
  const T0 = mk(7);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="12 AY SONRASI ENFLASYON BEKLENTİSİ" title="Vatandaş ile ekonomist arasındaki fark" />
      <Card9 t0={T0(7, 1) - 0.3} x={110} y={240} w={1040} h={660} />
      <Bars x={110} y={260} w={1040} h={640} max={50} bw={220} vs={60} items={[
        {label: 'Piyasa katılımcıları', v: 24.04, t0: T0(7, 1), fmt: pct(2), c: K.sageL},
        {label: 'Reel sektör', v: 31.7, t0: T0(7, 2), fmt: pct(2), c: K.taba},
        {label: 'Hanehalkı', v: 43.24, t0: T0(7, 3), fmt: pct(2), c: K.coral},
      ]} />
      <Item t0={T0(7, 4)} x={1180} y={240} w={630} I={Wallet} head="1" text="Harcamalar öne çekilebiliyor" />
      <Item t0={T0(7, 5)} x={1180} y={380} w={630} I={Building2} head="2" text="Şirketler fiyatlamada dikkate alıyor" />
      <Item t0={T0(7, 6)} x={1180} y={520} w={630} I={TrendingUp} head="SONUÇ" text="Fiyatlar üzerindeki baskı artabiliyor" tone="taba" />
      <Badge t0={T0(7, 3) + 1.2} x={1200} y={720} tone="taba" s={32} rot={0}>neredeyse 2 kat</Badge>
      <Src9>TCMB sektörel enflasyon beklentileri (Kasım 2026)</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S8 akaryakıt
const Pump: React.FC<{t0: number; x: number; label: string; v: number; v0: number; c: string}> = ({t0, x, label, v, v0, c}) => (
  <Card9 t0={t0} x={x} y={240} w={830} h={400} tone="sage" label={label}>
    <div style={{position: 'absolute', left: 30, top: 70, color: c}}><Fuel size={56} strokeWidth={2.2} /></div>
    <div style={{position: 'absolute', left: 30, top: 150, width: 770, height: 210, borderRadius: 20, background: '#1F2610', border: `3px solid ${c}`}} />
    <Count t0={t0 + 0.5} v={v} v0={v0} d={2.2} dec={2} s={150} c={K.sari} x={30} y={180} w={770} align="center" />
  </Card9>
);
const S8: React.FC = () => {
  const T0 = mk(8);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="AKARYAKIT" title="Motorinden sonra benzine de indirim" />
      <Pump t0={T0(8, 1)} x={110} label="MOTORİN • İSTANBUL AVRUPA" v={88.9} v0={95.3} c={K.taba} />
      <Pump t0={T0(8, 1) + 2.5} x={980} label="BENZİN • İSTANBUL AVRUPA" v={68.4} v0={71.3} c={K.sari} />
      <Card9 t0={T0(8, 3)} x={110} y={680} w={1700} h={220} tone="bej" label="50 LİTRELİK BENZİN DEPOSU">
        <Tx9 t0={T0(8, 3) + 0.2} x={30} y={90} s={56} c={K.ink2} wt={800}>50 L × 2,90 ₺ =</Tx9>
        <Count t0={T0(8, 3) + 0.6} v={145} d={1.4} pre="−" suf=" ₺" s={110} c={K.sage} x={520} y={60} />
      </Card9>
      <Src9>Dağıtım şirketi fiyatları, Habertürk • 21–23 Kasım 2026</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S9 fon soruşturması
const S9: React.FC = () => {
  const T0 = mk(9);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="BORSA GÜNDEMİ" title="Fon üzerinden manipülasyon soruşturması" />
      <Card9 t0={T0(9, 1)} x={110} y={240} w={540} h={300} tone="sage" label="MALVARLIĞI TEDBİRİ İSTENEN">
        <Count t0={T0(9, 1) + 0.3} v={108} d={1.6} s={150} c={K.bg} x={30} y={80} />
        <Tx9 t0={T0(9, 1) + 1.2} x={350} y={160} s={44} c={K.sari} wt={800}>kişi</Tx9>
      </Card9>
      <Card9 t0={T0(9, 2)} x={680} y={240} w={560} h={300} tone="bej" label="ŞÜPHELİ DÖNEM KAZANCI">
        <Count t0={T0(9, 2) + 0.3} v={100} d={1.4} pre="> " s={130} c={K.ink} x={30} y={80} />
        <Tx9 t0={T0(9, 2) + 1.0} x={30} y={220} s={34} c={K.ink2} wt={800}>milyon ₺ üzeri</Tx9>
      </Card9>
      <Card9 t0={T0(9, 3)} x={1270} y={240} w={540} h={300} tone="taba" label="İDDİA • HİSSE ARTIŞI">
        <Count t0={T0(9, 3) + 0.3} v={100} d={1.6} pre="×" s={150} c={K.bg} x={30} y={80} />
        <Tx9 t0={T0(9, 3) + 1.0} x={30} y={230} s={28} c={K.bg} wt={800}>kata kadar</Tx9>
      </Card9>
      {['Nitelikli dolandırıcılık', 'SPK Kanunu’na muhalefet', 'Suç gelirlerini aklama'].map((s, i) => (
        <Drop key={s} t0={T0(9, 4) + i * 0.6} x={110 + i * 575} y={580} w={550} style={{padding: '22px 0', borderRadius: 22, background: K.paper, border: `2px solid ${K.taba}`, textAlign: 'center', fontFamily: SANS, fontWeight: 800, fontSize: 30, color: K.ink}}>{s}</Drop>
      ))}
      <Card9 t0={T0(9, 5)} x={110} y={710} w={1700} h={190} tone="sage">
        <div style={{position: 'absolute', left: 30, top: 50}}><Ico9 I={Scale} c={K.taba} s={44} bg={`${K.bg}18`} /></div>
        <Tx9 t0={T0(9, 5) + 0.2} x={150} y={40} w={1500} s={46} c={K.bg} wt={800} font={SERIF}>Tedbir talebi, suçlu bulunduğu anlamına gelmiyor</Tx9>
        <Tx9 t0={T0(9, 6)} x={150} y={110} w={1500} s={28} c={K.sari} wt={700}>Soruşturma süreci devam ediyor</Tx9>
      </Card9>
      <Src9>İstanbul Cumhuriyet Başsavcılığı yazısı (18 Kasım) • Para Ajansı, 10haber</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S10 KAP yansımaları
const S10: React.FC = () => {
  const T0 = mk(10);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="KAP • 23 KASIM" title="Soruşturmanın yansımaları" />
      <KapCard t0={T0(10, 1)} x={110} y={240} w={1700} h={140} code="HUNER • KGYO" title="Hun Yenilenebilir • Koray GYO" text="Hâkim ortakların şahsi malvarlığına kısıtlama tebligatı" I={FileText} />
      <KapCard t0={T0(10, 2)} x={110} y={400} w={1700} h={140} code="NOT" title="Şirket açıklaması" text="Tedbir şirket varlıklarını ve banka hesaplarını kapsamıyor" I={ShieldAlert} />
      <KapCard t0={T0(10, 3)} x={110} y={560} w={1700} h={140} code="YYLGD" title="Yayla Agro Gıda" text="Listede adı geçen kişi şirketin yönetim kurulu başkanı değil" I={Users} />
      <KapCard t0={T0(10, 4)} x={110} y={720} w={1700} h={180} code="VBTS" title="Borsa İstanbul tedbiri" text="ALKLC, TEHOL, IEYHO, OZATD, SEGYO: 22 Aralık'a kadar açığa satış ve kredili işlem yasağı" tone="taba" I={Gavel} />
      <Src9>KAP (kap.org.tr) • 22–23 Kasım 2026 • al-sat önerisi değildir</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S11 diğer KAP
const S11: React.FC = () => {
  const T0 = mk(11);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="KAP • DİĞER ŞİRKET HABERLERİ" title="Kayyım, not görünümü, batık kredi" />
      <KapCard t0={T0(11, 0)} x={110} y={240} w={840} h={200} code="DSTKF" title="Destek Faktoring" text="Hâkim ortak Destek Holding'e TMSF kayyım" tone="taba" I={Gavel} />
      <KapCard t0={T0(11, 1)} x={970} y={240} w={840} h={200} code="PGSUS" title="Pegasus • Moody's" text="Not Ba3 korundu, görünüm durağandan negatife" tone="taba" I={Plane} />
      <KapCard t0={T0(11, 2)} x={110} y={460} w={840} h={200} code="GLCVY • GSDHO" title="Garanti batık kredi satışı" text="3,01 milyar ₺ ve 1,5 milyar ₺ anaparalı portföyler" I={Banknote} />
      <KapCard t0={T0(11, 3)} x={970} y={460} w={840} h={200} code="BRISA" title="Rekabet cezası" text="1,02 milyar ₺ ceza, peşin indirimle 764 milyon ₺" tone="taba" I={Scale} />
      <KapCard t0={T0(11, 4)} x={110} y={680} w={1700} h={200} code="GESAN" title="Girişim Elektrik" text="Konya Selçuklu Belediyesi ile 1,6 milyon $ güneş enerjisi santrali sözleşmesi" I={Sun} />
      <Src9>KAP (kap.org.tr) • 20–23 Kasım 2026 • al-sat önerisi değildir</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S12 Türkiye takvimi
const S12: React.FC = () => {
  const T0 = mk(12);
  const items: [string, any, string, number, boolean][] = [
    ['Yarın', ChartColumn, 'Sektörel güven endeksleri', T0(12, 1), false],
    ['Yarın', CreditCard, 'Aralık kredi kartı azami faiz oranları', T0(12, 2), true],
    ['Cuma', TrendingDown, 'TÜİK ekonomik güven • ekimde 97,3', T0(12, 3), false],
    ['Cuma', Landmark, 'TCMB Finansal İstikrar Raporu', T0(12, 5), false],
  ];
  return (
    <AbsoluteFill>
      <Head9 eyebrow="BU HAFTA • TÜRKİYE" title="Hangi veriler bekleniyor?" />
      <Drop t0={T0(12, 0)} x={404} y={250} w={8} h={640} style={{borderRadius: 4, background: K.bej}} />
      {items.map(([d, I, tx, t0, hi], i) => (
        <React.Fragment key={tx}>
          <Tx9 t0={t0} x={110} y={282 + i * 160} w={240} s={36} c={K.sageD} wt={900} align="right">{d}</Tx9>
          <Drop t0={t0} x={372} y={262 + i * 160} style={{width: 72, height: 72, borderRadius: '50%', background: hi ? K.coral : K.sage, color: K.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><I size={36} strokeWidth={2.4} /></Drop>
          <Card9 t0={t0 + 0.1} x={480} y={244 + i * 160} w={1330} h={124} tone={hi ? 'sage' : 'paper'}>
            <div style={{position: 'absolute', left: 34, top: 34, fontFamily: SERIF, fontWeight: 800, fontSize: 44, color: hi ? K.bg : K.ink}}>{tx}</div>
          </Card9>
        </React.Fragment>
      ))}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S13 dünya takvimi
const S13: React.FC = () => {
  const T0 = mk(13);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="BU HAFTA • DÜNYA" title="Çarşamba: ABD PCE enflasyonu" />
      <Card9 t0={T0(13, 0)} x={110} y={240} w={560} h={300} tone="sage" label="PCE • AYLIK BEKLENTİ">
        <Count t0={T0(13, 1)} v={0.3} d={1.2} dec={1} pre="%" s={150} c={K.bg} x={30} y={90} />
      </Card9>
      <Item t0={T0(13, 2)} x={700} y={240} w={1110} I={ChartColumn} head="AYNI GÜN" text="3. çeyrek büyüme 2. tahmini • dayanıklı mal siparişleri" />
      <Item t0={T0(13, 3)} x={700} y={380} w={1110} I={CalendarDays} head="PERŞEMBE • CUMA" text="Şükran Günü: borsalar kapalı • cuma yarım gün" tone="taba" />
      <Card9 t0={T0(13, 4)} x={110} y={580} w={840} h={320} tone="taba" label="BEKLENTİDEN YÜKSEK GELİRSE">
        <Tx9 t0={T0(13, 4) + 0.3} x={30} y={80} w={780} s={48} c={K.bg} wt={800} font={SERIF} lh={1.1}>Dolar güçlenir, altın baskıda kalır</Tx9>
      </Card9>
      <Card9 t0={T0(13, 5)} x={970} y={580} w={840} h={320} tone="sage" label="BEKLENTİDEN DÜŞÜK GELİRSE">
        <Tx9 t0={T0(13, 5) + 0.3} x={30} y={80} w={780} s={48} c={K.bg} wt={800} font={SERIF} lh={1.1}>Piyasalara rahatlama gelebilir</Tx9>
      </Card9>
      <Src9>Trading Economics, FXEmpire • ABD veri takvimi</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S14 asgari ücret
const S14: React.FC = () => {
  const T0 = mk(14);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="ASGARİ ÜCRET 2027" title="Komisyon aralıkta toplanacak" />
      <Card9 t0={T0(14, 0)} x={110} y={240} w={830} h={320} tone="sage" label="MEVCUT NET ASGARİ ÜCRET">
        <Count t0={T0(14, 4)} v={28075.5} v0={20000} d={1.8} dec={2} suf=" ₺" s={110} c={K.bg} x={30} y={100} />
      </Card9>
      <Item t0={T0(14, 1)} x={980} y={240} w={830} I={Users} head="BAKAN IŞIKHAN" text="Görüşmeler aralık ayında" />
      <Item t0={T0(14, 2)} x={980} y={380} w={830} I={CalendarDays} head="İLK TOPLANTI" text="Tarih henüz belli değil" tone="taba" />
      <Item t0={T0(14, 3)} x={980} y={520} w={830} I={Bell} head="BEKLENTİ" text="Aralığın ikinci yarısı • 1 Ocak'ta yürürlük" />
      <Card9 t0={T0(14, 5)} x={110} y={690} w={1700} h={210} tone="bej" label="ASGARİ ÜCRETLİNİN ENFLASYON BEKLENTİSİ">
        <Count t0={T0(14, 5) + 0.2} v={46.8} d={1.4} dec={1} pre="%" s={100} c={K.tabaD} x={30} y={74} />
      </Card9>
      <Src9>Çalışma Bakanlığı açıklamaları • TCMB Hanehalkı Beklenti Anketi</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S15 günün tablosu
const S15: React.FC = () => {
  const T0 = mk(15);
  const tiles: {n: string; v: number; dec: number; pre?: string; suf?: string; t: number; tone: 'sage' | 'bej' | 'paper' | 'taba'}[] = [
    {n: 'BIST 100 açılış', v: 11192, dec: 0, t: T0(15, 1), tone: 'sage'},
    {n: 'Dolar / TL', v: 50.6, dec: 2, t: T0(15, 2), tone: 'paper'},
    {n: 'Euro / TL', v: 55.6, dec: 2, t: T0(15, 2) + 0.8, tone: 'paper'},
    {n: 'Gram altın', v: 5880, dec: 0, suf: ' ₺', t: T0(15, 3), tone: 'bej'},
    {n: 'Çeyrek altın', v: 10200, dec: 0, suf: ' ₺', t: T0(15, 3) + 0.8, tone: 'bej'},
    {n: 'Ons altın', v: 3620, dec: 0, suf: ' $', t: T0(15, 3) + 1.6, tone: 'bej'},
    {n: 'Benzin (İst.)', v: 68.4, dec: 2, suf: ' ₺', t: T0(15, 4), tone: 'paper'},
    {n: 'Motorin (İst.)', v: 88.9, dec: 2, suf: ' ₺', t: T0(15, 4) + 0.8, tone: 'taba'},
  ];
  const W = 412, H = 320, G = 18;
  return (
    <AbsoluteFill>
      <Head9 eyebrow="GÜNÜN TABLOSU" title="Piyasalarda son durum" />
      {tiles.map((t2, i) => {
        const x = 110 + (i % 4) * (W + G), y = 240 + Math.floor(i / 4) * (H + G);
        const dark = t2.tone === 'sage' || t2.tone === 'taba';
        return (
          <Card9 key={t2.n} t0={t2.t} x={x} y={y} w={W} h={H} tone={t2.tone}>
            <div style={{position: 'absolute', left: 28, top: 28, fontFamily: SANS, fontWeight: 800, fontSize: 26, color: dark ? K.bej : K.ink2}}>{t2.n}</div>
            <Count t0={t2.t + 0.15} v={t2.v} dec={t2.dec} pre={t2.pre} suf={t2.suf} d={1.2} s={76} c={dark ? K.bg : K.ink} x={28} y={170} />
          </Card9>
        );
      })}
      <Src9>23 Kasım sabah verileri • rakamlar yaklaşıktır • yatırım tavsiyesi değildir</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S16 final (abone yalnızca abone cümlesinde)
const S16: React.FC = () => {
  const T0 = mk(16);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="ÖZETLE" title="Tepki alımı geldi, kalıcılığı belirsiz" />
      <Item t0={T0(16, 0)} x={110} y={250} w={1700} I={TrendingUp} head="YENİ HAFTA" text="Piyasalar tepki alımlarıyla başladı, yükselişin kalıcılığı belirsiz" />
      {['ABD PCE', 'Ekonomik güven', 'Kart faiz oranları'].map((s, i) => (
        <Drop key={s} t0={T0(16, 1) + i * 0.4} x={110 + i * 420} y={400} style={{padding: '14px 28px', borderRadius: 30, background: K.bej, fontFamily: SANS, fontWeight: 800, fontSize: 30, color: K.ink}}>{s}</Drop>
      ))}
      <Item t0={T0(16, 2)} x={110} y={500} w={1700} I={ShieldAlert} head="BİLGİLENDİRME" text="Anlattıklarım bilgilendirme amaçlıdır, yatırım tavsiyesi değildir" tone="taba" />
      <Drop t0={T0(16, 3)} x={560} y={700} w={800} h={120} style={{borderRadius: 60, background: K.sageD, boxShadow: `0 20px 50px ${K.sageD}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, fontFamily: SANS, fontWeight: 900, fontSize: 52, color: K.bg, letterSpacing: 3}}><Bell size={48} strokeWidth={2.4} />ABONE OL</Drop>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- gerçek görüntüler
type BR = [number, number, string, string, string, 'in' | 'out' | 'left' | 'right'];
const BROLL: BR[] = [
  [A(1, 5) - 0.1, A(1, 6) - 0.1, 'stock/ulke-abd-1.mp4', 'Wall Street', 'Cuma günü sert satış', 'in'],
  [A(3, 0) - 0.2, A(3, 1) - 0.1, 'stock/altin-1.mp4', 'Altın', 'Toparlanma çabası', 'out'],
  [A(6, 0) - 0.2, A(6, 1) - 0.1, 'stock/hesap-1.mp4', 'Hanehalkı beklentileri', 'TCMB kasım anketi', 'in'],
  [A(8, 0) - 0.2, A(8, 1) - 0.1, 'stock/foto-akaryakit-29370543.jpg', 'Akaryakıt', 'Benzine 2,90 ₺ indirim', 'right'],
  [A(9, 0) - 0.2, A(9, 1) - 0.1, 'stock/borsa-4.mp4', 'Fon soruşturması', '108 kişi için tedbir talebi', 'in'],
  [A(12, 0) - 0.2, A(12, 1) - 0.1, 'stock/istanbul-1.mp4', 'Bu hafta', 'Türkiye veri takvimi', 'in'],
  [A(14, 0) - 0.2, A(14, 1) - 0.1, 'stock/para-sayma-1.mp4', 'Asgari ücret', '2027 görüşmeleri', 'in'],
  [A(15, 0) - 0.2, A(15, 1) - 0.1, 'stock/istanbul-3.mp4', 'Günün tablosu', '23 Kasım 2026', 'in'],
];
const LT: [number, string][] = [
  [A(1, 1) + 0.3, 'Borsa İstanbul • haftalık kapanış'],
  [A(6, 1) + 0.3, 'TCMB • hanehalkı beklenti anketi'],
  [A(9, 1) + 0.3, 'Borsa • fon soruşturması'],
];
const TICK = ['BIST 100 AÇILIŞ 11.192 (+%0,55)', 'USD/TL 50,60', 'EUR/TL 55,60', 'GRAM ALTIN ≈ 5.880 ₺', 'ONS ≈ 3.620 $', 'HANEHALKI ENF. BEKLENTİSİ %43,24', 'DOLAR BEKLENTİSİ 58,18 ₺', 'BENZİN 68,40 ₺', 'MOTORİN 88,90 ₺', 'YATIRIM TAVSİYESİ DEĞİLDİR'];

const SCENES: React.FC[] = [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16];
const TT = 12;
export const EnfVideo10: React.FC = () => {
  useFonts9();
  const total = ENF10_TOTAL;
  return (
    <AbsoluteFill style={{background: K.bg}}>
      <Sequence from={0} durationInFrames={fr(END)}><Paper /></Sequence>
      <Sequence from={0} durationInFrames={fr(END)}>
        <TransitionSeries>
          {SCENES.flatMap((Sc, i) => {
            const a = fr(paras[i].start);
            const b = i + 1 < SCENES.length ? fr(paras[i + 1].start) : fr(END);
            const last = i === SCENES.length - 1;
            const out = [<TransitionSeries.Sequence key={'s' + i} durationInFrames={Math.max(TT + 1, b - a + (last ? 0 : TT))}><Push9 dur={(b - a) / FPS}><Sc /></Push9></TransitionSeries.Sequence>];
            if (!last) out.push(<TransitionSeries.Transition key={'t' + i} presentation={i % 3 === 2 ? slide({direction: 'from-bottom'}) : fade()} timing={springTiming({config: {damping: 200}, durationInFrames: TT})} />);
            return out;
          })}
        </TransitionSeries>
      </Sequence>
      {BROLL.map(([a, b, src, title, sub, pan], i) => (
        <Sequence key={'b' + i} from={fr(a)} durationInFrames={fr(b - a)}><Stock9 src={src} dur={b - a} title={title} sub={sub} pan={pan} /></Sequence>
      ))}
      <Sequence from={0} durationInFrames={fr(END)}><Bug9 /></Sequence>
      {LT.map(([t0, topic], i) => <Sequence key={'l' + i} from={fr(t0)} durationInFrames={fr(5.0)}><LT9 topic={topic} /></Sequence>)}
      <Sequence from={0} durationInFrames={fr(END)}><Ticker9 items={TICK} /></Sequence>
      <Sequence from={fr(D.bumpers[0])} durationInFrames={fr(BUMP9)}><Bumper9 label="BEKLENTİLER" sub="HANEHALKI ANKETİ • AKARYAKIT" /></Sequence>
      <Sequence from={fr(D.bumpers[1])} durationInFrames={fr(BUMP9)}><Bumper9 label="BORSA GÜNDEMİ" sub="FON SORUŞTURMASI • KAP" /></Sequence>
      <Sequence from={fr(D.bumpers[2])} durationInFrames={fr(BUMP9)}><Bumper9 label="BU HAFTA" sub="TAKVİM • ASGARİ ÜCRET • TABLO" /></Sequence>
      <Sequence from={fr(END)} durationInFrames={total - fr(END)}><End9 next="Aralık kart faizleri ve güven endeksleri" /></Sequence>
    </AbsoluteFill>
  );
};
