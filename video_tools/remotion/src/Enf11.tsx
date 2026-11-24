import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {
  Banknote, Bell, Building2, CalendarDays, Car, ChartColumn, CreditCard, FileText, Fuel, Gavel, Globe, Home, Landmark, Percent, Plane, ShieldAlert, Smartphone, Sun, TrendingDown, TrendingUp, Users, Wallet, Scale, Utensils, Bus, HardHat, Factory,
} from 'lucide-react';
import D from './enf11_sentences.json';
import {
  Bars, Bug9, BUMP9, Bumper9, Card9, Count, Drop, DropWords, End9, Frame9, Head9, HBar, Ico9, K, Line9, LT9, Paper, Push9, SANS, SERIF, Src9, Stock9, Ticker9, tr, Tx9, useFonts9,
} from './Palet';
import {Arrow, Badge, Box, Item} from './Enf9';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
export const ENF11_TOTAL = Math.ceil(D.total * FPS);
type Pa = {start: number; end: number; sentences: number[]};
const paras = D.paras as Pa[];
const A = (pi: number, si = 0) => paras[pi].sentences[Math.min(si, paras[pi].sentences.length - 1)];
const mk = (pi0: number) => (pi: number, si = 0) => A(pi, si) - paras[pi0].start;
const END = D.end;
const pct = (d = 0) => (v: number) => '%' + tr(v, d);

// eski → yeni karşılaştırma satırı
const Cmp: React.FC<{t0: number; x: number; y: number; w: number; h?: number; I: any; label: string; v0: number; v: number; dec?: number; tone?: 'paper' | 'bej'}> = ({t0, x, y, w, h = 150, I, label, v0, v, dec = 0, tone = 'paper'}) => (
  <Card9 t0={t0} x={x} y={y} w={w} h={h} tone={tone}>
    <div style={{position: 'absolute', left: 24, top: h / 2 - 32}}><Ico9 I={I} c={K.sage} s={36} /></div>
    <div style={{position: 'absolute', left: 120, top: 22, fontFamily: SANS, fontWeight: 800, fontSize: 22, letterSpacing: 2, color: K.ink2}}>{label}</div>
    <div style={{position: 'absolute', left: 120, top: h - 72, fontFamily: SANS, fontWeight: 800, fontSize: 40, color: K.mute, textDecoration: 'line-through', textDecorationColor: K.coral}}>{tr(v0, dec)} ₺</div>
    <Arrow t0={t0 + 0.3} x={w * 0.47} y={h - 84} c={K.coral} />
    <Count t0={t0 + 0.45} v={v} v0={v0} d={1.4} dec={dec} suf=" ₺" s={64} c={K.tabaD} x={w * 0.47 + 80} y={h - 90} />
  </Card9>
);

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
      <Frame9 src="stock/havalimani-1.mp4" t0={0} x={1140} y={120} w={680} h={420} />
      <Tx9 t0={0} x={110} y={120} s={24} c={K.tabaD} wt={800} ls={4}>YENİ YIL ZAMLARI • 24 KASIM</Tx9>
      <DropWords t0={0.05} x={106} y={160} w={1000} s={92} stagger={0.07}>Devlete ödediklerimiz yüzde 27,83 artıyor</DropWords>
      <Card9 t0={T0(0, 1)} x={110} y={580} w={560} h={300} tone="taba" label="YENİDEN DEĞERLEME ORANI">
        <Count t0={T0(0, 1) + 0.3} v={27.83} d={1.8} dec={2} pre="%" s={130} c={K.bg} x={28} y={90} />
        <Tx9 t0={T0(0, 1) + 1.4} x={30} y={234} s={28} c={K.bg} wt={800}>1 Ocak 2027'den itibaren</Tx9>
      </Card9>
      {['Pasaport', 'Ehliyet', 'Trafik cezası', 'MTV', 'Kira istisnası', 'Yemek kartı'].map((s, i) => (
        <Drop key={s} t0={T0(0, 2) + i * 0.22} x={710 + (i % 3) * 250} y={600 + Math.floor(i / 3) * 80} style={{padding: '12px 22px', borderRadius: 30, background: K.paper, border: `2px solid ${K.taba}`, fontFamily: SANS, fontWeight: 800, fontSize: 26, color: K.ink2, whiteSpace: 'nowrap'}}>{s}</Drop>
      ))}
      <Card9 t0={T0(0, 3)} x={1480} y={580} w={330} h={140} tone="sage" label="BUGÜN">
        <div style={{position: 'absolute', left: 26, top: 62, display: 'flex', alignItems: 'center', gap: 12, color: K.sari}}><CreditCard size={40} /><span style={{fontFamily: SANS, fontWeight: 900, fontSize: 32, color: K.bg}}>Kart faizi</span></div>
      </Card9>
      {['Güven endeksleri', 'Döviz talebi', 'KAP'].map((s, i) => (
        <Drop key={s} t0={T0(0, 5) + i * 0.3} x={710 + i * 290} y={790} style={{padding: '12px 22px', borderRadius: 30, background: K.bej, fontFamily: SANS, fontWeight: 800, fontSize: 26, color: K.ink, whiteSpace: 'nowrap'}}>{s}</Drop>
      ))}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S1 yeniden değerleme
const S1: React.FC = () => {
  const T0 = mk(1);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="RESMÎ GAZETE • 24 KASIM" title="Yeniden değerleme oranı belli oldu" />
      <Card9 t0={T0(1, 1) - 0.3} x={110} y={240} w={900} h={660} label="YURT İÇİ ÜFE • 12 AYLIK ORTALAMA" />
      <Bars x={110} y={290} w={900} h={610} max={32} bw={220} vs={64} items={[
        {label: '2026 için', v: 25.49, t0: T0(1, 1) + 0.6, fmt: pct(2), c: K.taba},
        {label: '2027 için', v: 27.83, t0: T0(1, 1) + 2.4, fmt: pct(2), c: K.coral},
      ]} />
      <Item t0={T0(1, 2)} x={1050} y={240} w={760} I={Landmark} head="CUMHURBAŞKANI" text="Bazı vergi ve harçlarda oranı artırıp azaltabilir" />
      <Item t0={T0(1, 3)} x={1050} y={380} w={760} I={CalendarDays} head="KESİN TUTARLAR" text="Bazı kalemlerde aralık sonunda netleşecek" />
      <Card9 t0={T0(1, 4)} x={1050} y={540} w={760} h={360} tone="taba" label="TRAFİK CEZALARI">
        <div style={{position: 'absolute', left: 30, top: 80, color: K.bg}}><Car size={64} strokeWidth={2.2} /></div>
        <Tx9 t0={T0(1, 4) + 0.3} x={30} y={170} w={700} s={50} c={K.bg} wt={800} font={SERIF} lh={1.1}>Değişiklik yetkisi yok</Tx9>
        <Tx9 t0={T0(1, 5)} x={30} y={280} w={700} s={30} c={K.bg} wt={800}>Doğrudan %27,83 artıyor</Tx9>
      </Card9>
      <Src9>Vergi Usul Kanunu Genel Tebliği (Sıra No: 599) • Resmî Gazete, 24 Kasım 2026</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S2 pasaport ve harçlar
const S2: React.FC = () => {
  const T0 = mk(2);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="YURT DIŞINA ÇIKACAKLAR" title="Pasaport ve çıkış harcı" />
      <Cmp t0={T0(2, 0) + 1.2} x={110} y={240} w={840} h={170} I={Plane} label="10 YILLIK PASAPORT HARCI" v0={13410} v={17142} tone="bej" />
      <Cmp t0={T0(2, 0) + 5.0} x={970} y={240} w={840} h={170} I={Plane} label="6 AYLIK PASAPORT HARCI" v0={2806} v={3587} />
      <Card9 t0={T0(2, 1)} x={110} y={430} w={1700} h={90} tone="sage">
        <Tx9 t0={T0(2, 1) + 0.1} x={30} y={24} w={1640} s={34} c={K.bg} wt={800}>+ defter bedeli ayrıca ödeniyor</Tx9>
      </Card9>
      <Cmp t0={T0(2, 2)} x={110} y={540} w={840} h={170} I={Globe} label="YURT DIŞI ÇIKIŞ HARCI" v0={1250} v={1598} />
      <Card9 t0={T0(2, 3)} x={970} y={540} w={840} h={170} tone="taba" label="4 KİŞİLİK AİLE • ÇIKIŞ HARCI FARKI">
        <Count t0={T0(2, 3) + 0.3} v={1392} d={1.2} pre="+" suf=" ₺" s={80} c={K.bg} x={28} y={64} />
      </Card9>
      <Cmp t0={T0(2, 4)} x={110} y={730} w={1700} h={170} I={Smartphone} label="IMEI KAYIT ÜCRETİ (YURT DIŞINDAN TELEFON)" v0={54258} v={69358} tone="bej" />
      <Src9>Hesaplama %27,83 üzerinden • NTV, Sözcü, AA • kesin tutarlar düzenlemeyle netleşir</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S3 ehliyet, trafik, MTV
const S3: React.FC = () => {
  const T0 = mk(3);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="EHLİYET • TRAFİK CEZASI • MTV" title="Sürücülerin yeni yıl hesabı" />
      <Cmp t0={T0(3, 0)} x={110} y={240} w={840} h={150} I={FileText} label="B SINIFI EHLİYET HARCI" v0={6755} v={8634} tone="bej" />
      <Cmp t0={T0(3, 2)} x={970} y={240} w={840} h={150} I={Smartphone} label="KIRMIZI IŞIK • DİREKSİYONDA TELEFON" v0={5000} v={6391} />
      <Cmp t0={T0(3, 3)} x={110} y={410} w={840} h={150} I={ShieldAlert} label="ALKOLLÜ ARAÇ (İLK CEZA)" v0={25000} v={31958} />
      <Cmp t0={T0(3, 3) + 3.2} x={970} y={410} w={840} h={150} I={Gavel} label="EHLİYETSİZ ARAÇ KULLANMA" v0={40000} v={51132} />
      <Card9 t0={T0(3, 4)} x={110} y={590} w={1700} h={310} tone="sage" label="MTV • 1.300–1.600 CC SIFIR OTOMOBİL • YILLIK">
        <div style={{position: 'absolute', left: 30, top: 80, color: K.sari}}><Car size={60} strokeWidth={2.2} /></div>
        <div style={{position: 'absolute', left: 130, top: 90, fontFamily: SANS, fontWeight: 800, fontSize: 48, color: K.sageL, textDecoration: 'line-through'}}>12.028 ₺</div>
        <Arrow t0={T0(3, 5) + 0.3} x={480} y={90} c={K.sari} />
        <Count t0={T0(3, 5) + 0.4} v={15375} v0={12028} d={1.6} suf=" ₺" s={100} c={K.bg} x={570} y={66} />
        <Tx9 t0={T0(3, 6)} x={30} y={220} w={1600} s={32} c={K.sari} wt={800}>Cumhurbaşkanı indirim yapabilir • kesin tutar aralıkta</Tx9>
      </Card9>
      <Src9>%27,83 artışla hesaplanan tutarlar • NTV, Sözcü, Timeturk</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S4 vatandaşın lehine
const S4: React.FC = () => {
  const T0 = mk(4);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="VATANDAŞIN LEHİNE" title="İstisna ve sınırlar da yükseliyor" />
      <Card9 t0={T0(4, 1)} x={110} y={240} w={900} h={400} tone="sage" label="KONUT KİRA GELİRİ İSTİSNASI • YILLIK">
        <div style={{position: 'absolute', left: 30, top: 80, color: K.sari}}><Home size={56} strokeWidth={2.2} /></div>
        <Count t0={T0(4, 1) + 0.4} v={74141} v0={58000} d={1.8} suf=" ₺" s={120} c={K.bg} x={28} y={150} />
        <Tx9 t0={T0(4, 2)} x={30} y={300} w={840} s={30} c={K.sari} wt={800}>Altında kalan ev sahibi beyanname vermiyor</Tx9>
      </Card9>
      <Card9 t0={T0(4, 3)} x={1040} y={240} w={770} h={400} tone="bej" label="AYLIK KARŞILIĞI">
        <Count t0={T0(4, 3) + 0.3} v={6180} d={1.4} pre="≈ " suf=" ₺" s={110} c={K.ink} x={28} y={130} />
        <Tx9 t0={T0(4, 3) + 1.1} x={30} y={290} s={32} c={K.ink2} wt={800}>kira / ay</Tx9>
      </Card9>
      <Box t0={T0(4, 4)} x={110} y={670} w={410} label="YEMEK KARTI • GÜNLÜK" v={421.8} dec={2} />
      <Box t0={T0(4, 4) + 1.6} x={540} y={670} w={410} label="ULAŞIM • GÜNLÜK" v={202} />
      <Box t0={T0(4, 5)} x={970} y={670} w={410} label="5 YIL DOLMADAN KONUT" v={191745} tone="bej" />
      <Box t0={T0(4, 5) + 2.2} x={1400} y={670} w={410} label="BEYAN SINIRI (TEMETTÜ)" v={511320} tone="bej" />
      <Src9>2027 tutarları • Gelir İdaresi tebliği ve basın hesaplamaları</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S5 kredi kartı
const S5: React.FC = () => {
  const T0 = mk(5);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="KREDİ KARTI • AYLIK AZAMİ FAİZ" title="Aralık oranları bugün açıklanıyor" />
      <Card9 t0={T0(5, 2) - 0.3} x={110} y={240} w={1040} h={660} label="DÖNEM BORCUNA GÖRE (KASIM)" />
      <Bars x={110} y={290} w={1040} h={610} max={5.8} bw={220} vs={60} items={[
        {label: '30 bin ₺ altı', v: 3.25, t0: T0(5, 2), fmt: pct(2), c: K.sageL},
        {label: '30–180 bin ₺', v: 3.75, t0: T0(5, 3), fmt: pct(2), c: K.taba},
        {label: '180 bin ₺ üstü • nakit', v: 4.25, t0: T0(5, 3) + 2.6, fmt: pct(2), c: K.coral},
      ]} />
      <Card9 t0={T0(5, 4)} x={1180} y={240} w={630} h={250} tone="sage" label="REFERANS ORAN">
        <Count t0={T0(5, 5)} v={3.11} d={1.2} dec={2} pre="%" s={100} c={K.bg} x={28} y={70} />
        <Tx9 t0={T0(5, 4) + 0.3} x={30} y={190} s={28} c={K.sari} wt={800}>Ocaktan beri değişmedi</Tx9>
      </Card9>
      <Card9 t0={T0(5, 6)} x={1180} y={520} w={630} h={230} tone="bej" label="ASGARİ ÖDEME • 100–200 BİN ₺ LİMİT">
        <div style={{position: 'absolute', left: 28, top: 80, fontFamily: SANS, fontWeight: 800, fontSize: 60, color: K.mute, textDecoration: 'line-through'}}>%40</div>
        <Arrow t0={T0(5, 6) + 0.3} x={200} y={86} c={K.coral} />
        <Count t0={T0(5, 6) + 0.4} v={30} v0={40} d={1.2} pre="%" s={96} c={K.sageD} x={290} y={66} />
      </Card9>
      <Card9 t0={T0(5, 7)} x={1180} y={780} w={630} h={120} tone="taba">
        <Tx9 t0={T0(5, 7) + 0.1} x={28} y={26} w={580} s={30} c={K.bg} wt={800} lh={1.15}>Kalan borca faiz işlemeye devam eder</Tx9>
      </Card9>
      <Badge t0={T0(5, 8)} x={560} y={330} tone="taba" s={34} rot={-2}>Aralık oranları bugün</Badge>
      <Src9>TCMB azami faiz tablosu (1 Kasım 2026) • BDDK kararı 19.11.2026</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S6 güven endeksleri
const Gv: React.FC<{t0: number; x: number; label: string; v: number; v0: number; ch: string; up: boolean; I: any}> = ({t0, x, label, v, v0, ch, up, I}) => (
  <Card9 t0={t0} x={x} y={240} w={550} h={380} tone={up ? 'paper' : 'taba'} label={label}>
    <div style={{position: 'absolute', left: 28, top: 76, color: up ? K.sage : K.bg}}><I size={52} strokeWidth={2.2} /></div>
    <Count t0={t0 + 0.4} v={v} v0={v0} d={1.6} dec={1} s={120} c={up ? K.ink : K.bg} x={28} y={150} />
    <div style={{position: 'absolute', left: 30, top: 300, display: 'flex', alignItems: 'center', gap: 10, fontFamily: SANS, fontWeight: 900, fontSize: 40, color: up ? K.sage : K.bg}}>
      {up ? <TrendingUp size={40} /> : <TrendingDown size={40} />}{ch}
    </div>
  </Card9>
);
const S6: React.FC = () => {
  const T0 = mk(6);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="TÜİK • KASIM GÜVEN ENDEKSLERİ" title="İnşaatta güven sert düştü" />
      <Gv t0={T0(6, 1)} x={110} label="HİZMET" v={109.9} v0={109.2} ch="+%0,6" up I={Users} />
      <Gv t0={T0(6, 1) + 3.0} x={685} label="PERAKENDE TİCARET" v={113.6} v0={112.5} ch="+%0,9" up I={Wallet} />
      <Gv t0={T0(6, 3)} x={1260} label="İNŞAAT" v={80.2} v0={83.3} ch="−%3,8" up={false} I={HardHat} />
      <Item t0={T0(6, 2)} x={110} y={650} w={1125} I={TrendingUp} head="PERAKENDE" text="3 aylık satış beklentisi +%3,5" />
      <Item t0={T0(6, 4)} x={110} y={786} w={1125} I={HardHat} head="İNŞAAT" text="Sipariş −%3 • çalışan beklentisi −%4,5" tone="taba" />
      <Card9 t0={T0(6, 5)} x={1260} y={650} w={550} h={252} tone="sage" label="NE ANLAMA GELİYOR?">
        <Tx9 t0={T0(6, 5) + 0.2} x={28} y={74} w={500} s={36} c={K.bg} wt={800} font={SERIF} lh={1.12}>Yeni konut arzı yavaşlayabilir</Tx9>
        <Tx9 t0={T0(6, 6)} x={28} y={196} w={500} s={24} c={K.sari} wt={800}>Ekonomik güven: cuma</Tx9>
      </Card9>
      <Src9>TÜİK • 24 Kasım 2026 • mevsimsellikten arındırılmış • 100 altı kötümserlik</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S7 Karahan
const S7: React.FC = () => {
  const T0 = mk(7);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="TCMB BAŞKANI KARAHAN" title="Enflasyon ve Türk lirası mesajı" />
      <Card9 t0={T0(7, 1) - 0.3} x={110} y={240} w={820} h={660} label="EKİM 2026" />
      <Bars x={110} y={290} w={820} h={610} max={34} bw={200} vs={60} items={[
        {label: 'Yıllık enflasyon', v: 29.8, t0: T0(7, 1), fmt: pct(1), c: K.coral},
        {label: 'Ana eğilim', v: 24, t0: T0(7, 1) + 1.6, fmt: (v) => '≈%' + tr(v), c: K.sage},
      ]} />
      <Item t0={T0(7, 2)} x={960} y={240} w={850} I={TrendingUp} head="KASIM UYARISI" text="Gıdada baz etkisiyle yıllık enflasyon yükselebilir" tone="taba" />
      <Item t0={T0(7, 3)} x={960} y={376} w={850} I={Percent} head="TL'Yİ DESTEK" text="Politika faizi, diğer araçlar ve stopaj düzenlemesi" />
      <Card9 t0={T0(7, 4)} x={960} y={520} w={850} h={380} tone="sage" label="STOPAJ NEDİR?">
        <Tx9 t0={T0(7, 4) + 0.2} x={30} y={80} w={790} s={44} c={K.bg} wt={800} font={SERIF} lh={1.1}>Mevduat faizinden kesilen vergi</Tx9>
        <Tx9 t0={T0(7, 5)} x={30} y={200} w={790} s={32} c={K.sari} wt={800}>Düşerse mevduatın net getirisi artar</Tx9>
        <Tx9 t0={T0(7, 6)} x={30} y={290} w={790} s={28} c={K.bej} wt={700}>Henüz kesin bir karar yok</Tx9>
      </Card9>
      <Src9>AA röportajı, 23 Kasım 2026 • CNBC-e, Sözcü</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S8 Goldman
const S8: React.FC = () => {
  const T0 = mk(8);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="GOLDMAN SACHS RAPORU" title="Dövize yöneliş hızlandı" />
      <Card9 t0={T0(8, 1)} x={110} y={240} w={820} h={330} tone="taba" label="DÖVİZ MEVDUATI • 13 KASIM HAFTASI">
        <Count t0={T0(8, 1) + 0.3} v={5} d={1.2} pre="+" suf=" milyar $" s={100} c={K.bg} x={28} y={90} />
        <Tx9 t0={T0(8, 2)} x={30} y={234} w={760} s={28} c={K.bg} wt={800}>Mart 2025'ten beri en büyük haftalık artış</Tx9>
      </Card9>
      <Card9 t0={T0(8, 3)} x={110} y={600} w={820} h={300} tone="bej" label="ARTIŞI KİM YAPTI?">
        <Count t0={T0(8, 3) + 0.3} v={90} d={1.4} pre="≈%" s={120} c={K.tabaD} x={28} y={90} />
        <Tx9 t0={T0(8, 3) + 1.0} x={420} y={130} s={44} c={K.ink} wt={800}>şirketler</Tx9>
      </Card9>
      <Card9 t0={T0(8, 4) - 0.3} x={960} y={240} w={850} h={500} label="TCMB BRÜT REZERV (MİLYAR $)">
        <Line9 x={20} y={60} w={810} h={430} pts={[165, 148]} labels={['13 Kasım', '20 Kasım']} t0={T0(8, 4)} dur={2.4} min={135} max={175} c={K.coral} fmt={(v) => tr(v)} vs={44} />
      </Card9>
      <Badge t0={T0(8, 5)} x={1440} y={300} tone="taba" s={36} rot={-2}>1 haftada −17</Badge>
      <Tx9 t0={T0(8, 6)} x={990} y={690} w={800} s={24} c={K.ink2} wt={800}>8 milyar $'ı altın fiyatındaki düşüşten</Tx9>
      <Card9 t0={T0(8, 7)} x={960} y={770} w={850} h={130} tone="sage">
        <div style={{position: 'absolute', left: 26, top: 36}}><Ico9 I={Landmark} c={K.taba} s={36} bg={`${K.bg}18`} /></div>
        <Tx9 t0={T0(8, 7) + 0.2} x={130} y={40} w={700} s={34} c={K.bg} wt={800}>Beklenti: aralıkta faiz sabit</Tx9>
      </Card9>
      <Src9>Goldman Sachs raporu (CNBC-e, 24 Kasım 2026) • altın ve kur etkisi hariç</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S9 borsa ve fon soruşturması
const S9: React.FC = () => {
  const T0 = mk(9);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="BORSA İSTANBUL" title="Yatay başlangıç" />
      <Card9 t0={T0(9, 0) - 0.3} x={110} y={240} w={1100} h={460} label="BIST 100">
        <Line9 x={20} y={60} w={1060} h={390} pts={[11131, 11104, 11111]} labels={['Cuma', 'Dün kapanış', 'Bugün açılış']} t0={T0(9, 0)} dur={3.4} min={11000} max={11250} c={K.sage} fmt={(v) => tr(v)} vs={40} />
      </Card9>
      <Card9 t0={T0(9, 1)} x={1240} y={240} w={570} h={200} tone="sage" label="AÇILIŞ">
        <Count t0={T0(9, 1) + 0.3} v={0.06} d={1.0} dec={2} pre="+%" s={96} c={K.bg} x={28} y={74} />
      </Card9>
      <Card9 t0={T0(9, 2)} x={1240} y={470} w={570} h={230} tone="bej" label="DİRENÇ / DESTEK">
        <Tx9 t0={T0(9, 2) + 0.2} x={28} y={70} s={40} c={K.ink} wt={900}>11.200 • 11.300</Tx9>
        <Tx9 t0={T0(9, 2) + 0.8} x={28} y={130} s={40} c={K.tabaD} wt={900}>11.000 • 10.900</Tx9>
        <Tx9 t0={T0(9, 2) + 1.0} x={28} y={190} s={20} c={K.mute} wt={700}>analist görüşü • tavsiye değildir</Tx9>
      </Card9>
      <Card9 t0={T0(9, 3)} x={110} y={730} w={540} h={170} tone="taba" label="FON SORUŞTURMASI • TUTUKLU">
        <Count t0={T0(9, 3) + 0.3} v={140} v0={136} d={1.2} s={80} c={K.bg} x={28} y={64} />
      </Card9>
      <Card9 t0={T0(9, 4)} x={680} y={730} w={540} h={170} label="ŞÜPHELİ">
        <Count t0={T0(9, 4) + 0.3} v={632} d={1.2} s={80} c={K.ink} x={28} y={64} />
      </Card9>
      <Card9 t0={T0(9, 4) + 1.6} x={1250} y={730} w={560} h={170} tone="sage" label="GÖNÜLLÜ İADE • 85 KİŞİ">
        <Count t0={T0(9, 4) + 1.9} v={44.58} d={1.4} dec={2} suf=" milyar ₺" s={64} c={K.bg} x={28} y={74} />
      </Card9>
      <Src9>Borsa İstanbul, AA • Adalet Bakanlığı açıklaması • 24 Kasım sabah</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S10 altın ve döviz
const S10: React.FC = () => {
  const T0 = mk(10);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="ALTIN VE DÖVİZ" title="Altında toparlanma sürüyor" />
      <Card9 t0={T0(10, 1)} x={110} y={240} w={830} h={330} tone="sage" label="ONS ALTIN • BU SABAH">
        <Count t0={T0(10, 1) + 0.3} v={3630} v0={3525} d={1.8} suf=" $" s={130} c={K.bg} x={28} y={90} />
        <Tx9 t0={T0(10, 1) + 1.4} x={30} y={250} s={30} c={K.sari} wt={800}>dün ≈ +%4,5 • 9 günlük düşüş bitti</Tx9>
      </Card9>
      <Card9 t0={T0(10, 2)} x={980} y={240} w={400} h={330} tone="bej" label="GRAM ALTIN">
        <Count t0={T0(10, 2) + 0.3} v={5900} d={1.4} suf=" ₺" s={80} c={K.ink} x={28} y={120} />
      </Card9>
      <Card9 t0={T0(10, 2) + 1.4} x={1410} y={240} w={400} h={330} tone="bej" label="ÇEYREK ALTIN">
        <Count t0={T0(10, 2) + 1.7} v={10180} d={1.4} suf=" ₺" s={76} c={K.ink} x={28} y={120} />
      </Card9>
      <Card9 t0={T0(10, 3)} x={110} y={610} w={830} h={290} label="DOLAR / TL">
        <Count t0={T0(10, 3) + 0.3} v={50.63} v0={50.4} d={1.4} dec={2} s={130} c={K.ink} x={28} y={90} />
      </Card9>
      <Card9 t0={T0(10, 3) + 1.2} x={980} y={610} w={830} h={290} label="EURO / TL">
        <Count t0={T0(10, 3) + 1.5} v={55.34} v0={55.1} d={1.4} dec={2} s={130} c={K.ink} x={28} y={90} />
      </Card9>
      <Src9>Bloomberg HT, Ekonomim, Sözcü • 24 Kasım sabah • serbest piyasa</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S11 dünya
const S11: React.FC = () => {
  const T0 = mk(11);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="DÜNYADAN" title="Teknoloji hisselerinde tepki, petrolde düşüş" />
      <Card9 t0={T0(11, 1) - 0.3} x={110} y={240} w={1000} h={380} label="ABD • 23 KASIM">
        <HBar x={40} y={70} w={760} v={4.99} max={8} t0={T0(11, 1)} label="S&P 500" fmt={(v) => '+%' + tr(v, 2)} c={K.sageL} />
        <HBar x={40} y={220} w={760} v={6.92} max={8} t0={T0(11, 1) + 1.8} label="Nasdaq" fmt={(v) => '+%' + tr(v, 2)} c={K.sage} />
      </Card9>
      <Card9 t0={T0(11, 2)} x={1140} y={240} w={670} h={380} tone="sage" label="TÜRKİYE'YE ETKİSİ">
        <div style={{position: 'absolute', left: 30, top: 80, color: K.sari}}><Globe size={56} strokeWidth={2.2} /></div>
        <Tx9 t0={T0(11, 2) + 0.2} x={30} y={170} w={610} s={44} c={K.bg} wt={800} font={SERIF} lh={1.1}>Gelişen piyasalara destek olabilir</Tx9>
      </Card9>
      <Card9 t0={T0(11, 4)} x={110} y={650} w={680} h={250} tone="taba" label="BRENT PETROL • VARİL">
        <Count t0={T0(11, 4) + 0.3} v={86.75} v0={92.6} d={1.6} dec={2} suf=" $" s={96} c={K.bg} x={28} y={70} />
        <Tx9 t0={T0(11, 4) + 1.2} x={30} y={190} s={28} c={K.bg} wt={800}>−%6,3 • tansiyon düşüş beklentisi</Tx9>
      </Card9>
      <Card9 t0={T0(11, 5)} x={820} y={650} w={490} h={250} tone="bej" label="BENZİN • İST. AVRUPA">
        <div style={{position: 'absolute', left: 28, top: 80, color: K.tabaD}}><Fuel size={44} /></div>
        <Count t0={T0(11, 5) + 0.3} v={68.4} d={1.2} dec={2} suf=" ₺" s={76} c={K.ink} x={28} y={140} />
      </Card9>
      <Card9 t0={T0(11, 5) + 1.4} x={1340} y={650} w={470} h={250} tone="bej" label="MOTORİN • İST. AVRUPA">
        <div style={{position: 'absolute', left: 28, top: 80, color: K.tabaD}}><Fuel size={44} /></div>
        <Count t0={T0(11, 5) + 1.7} v={88.9} d={1.2} dec={2} suf=" ₺" s={76} c={K.ink} x={28} y={140} />
      </Card9>
      <Src9>Aposto, AA, Ekonomim • 23–24 Kasım 2026</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S12 KAP olumlu
const S12: React.FC = () => {
  const T0 = mk(12);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="KAP • 23–24 KASIM" title="Kredi, sözleşme ve sipariş haberleri" />
      <KapCard t0={T0(12, 1)} x={110} y={240} w={1700} h={150} code="ISCTR" title="İş Bankası • EBRD" text="Toplam 151,5 milyon € kredi: 51,5 milyon € genç girişimciler, 100 milyon € yeşil dönüşüm" I={Landmark} />
      <KapCard t0={T0(12, 3)} x={110} y={410} w={1700} h={150} code="CWENE" title="CW Enerji • ABD" text="1,68 milyon $ (≈84,8 milyon ₺) güneş paneli satışı • teslimat 2027 ilk çeyrek" I={Sun} />
      <KapCard t0={T0(12, 5)} x={110} y={580} w={1700} h={150} code="GESAN" title="Girişim Elektrik • TEİAŞ" text="284,7 milyon ₺ baz bedelli iletim hattı ihalesi: sözleşmeye davet" I={Factory} />
      <KapCard t0={T0(12, 6)} x={110} y={750} w={1700} h={150} code="ARDYZ" title="ARD Grup Bilişim" text="Toplu taşımada yapay zekâ destekli güvenlik sistemi: ≈89,2 milyon ₺ sipariş" I={Bus} />
      <Src9>KAP (kap.org.tr) • 23–24 Kasım 2026 • al-sat önerisi değildir</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S13 KAP dikkat
const S13: React.FC = () => {
  const T0 = mk(13);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="KAP • DİKKAT EDİLMESİ GEREKENLER" title="Not görünümü, kayyım, ödenemeyen bono" />
      <KapCard t0={T0(13, 0)} x={110} y={240} w={840} h={210} code="ULKER" title="Ülker • S&P" text="Not BB'de teyit edildi, görünüm negatife çevrildi" tone="taba" I={TrendingDown} />
      <KapCard t0={T0(13, 1)} x={970} y={240} w={840} h={210} code="CRDFA" title="Creditwest Faktoring" text="%29 hissedar Altınbaş Holding'e TMSF kayyım" tone="taba" I={Gavel} />
      <KapCard t0={T0(13, 2)} x={110} y={470} w={840} h={210} code="KFILO" title="Kayatur Filo Kiralama" text="134 milyon ₺ bononun anapara ve faizi vadesinde ödenemedi" tone="taba" I={Banknote} />
      <KapCard t0={T0(13, 3)} x={970} y={470} w={840} h={210} code="EUKYO" title="SPK tedbiri" text="Yapay fiyat şüphesiyle bir kişiye 6 ay işlem yasağı" tone="taba" I={Scale} />
      <Card9 t0={T0(13, 3) + 1.5} x={110} y={710} w={1700} h={130} tone="sage">
        <div style={{position: 'absolute', left: 26, top: 36}}><Ico9 I={ShieldAlert} c={K.taba} s={36} bg={`${K.bg}18`} /></div>
        <Tx9 t0={T0(13, 3) + 1.7} x={130} y={42} w={1500} s={36} c={K.bg} wt={800}>Bildirim özetidir • yatırım tavsiyesi değildir</Tx9>
      </Card9>
      <Src9>KAP (kap.org.tr) • 23 Kasım 2026</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S14 takvim
const S14: React.FC = () => {
  const T0 = mk(14);
  const items: [string, any, string, number, boolean][] = [
    ['Yarın', Globe, 'ABD enflasyon verisi (PCE)', T0(14, 1), true],
    ['Perşembe', Landmark, 'TCMB haftalık rezervler', T0(14, 2), false],
    ['Cuma', ChartColumn, 'TÜİK ekonomik güven endeksi', T0(14, 3), false],
    ['Cuma', Building2, 'TCMB Finansal İstikrar Raporu', T0(14, 3) + 2.0, false],
  ];
  return (
    <AbsoluteFill>
      <Head9 eyebrow="HAFTANIN KALANI" title="Takvim yoğun" />
      <Drop t0={T0(14, 0)} x={404} y={250} w={8} h={640} style={{borderRadius: 4, background: K.bej}} />
      {items.map(([d, I, tx, t0, hi]) => {
        const i = items.findIndex((z) => z[2] === tx);
        return (
          <React.Fragment key={tx}>
            <Tx9 t0={t0} x={80} y={282 + i * 160} w={270} s={36} c={K.sageD} wt={900} align="right">{d}</Tx9>
            <Drop t0={t0} x={372} y={262 + i * 160} style={{width: 72, height: 72, borderRadius: '50%', background: hi ? K.coral : K.sage, color: K.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><I size={36} strokeWidth={2.4} /></Drop>
            <Card9 t0={t0 + 0.1} x={480} y={244 + i * 160} w={1330} h={124} tone={hi ? 'sage' : 'paper'}>
              <div style={{position: 'absolute', left: 34, top: 34, fontFamily: SERIF, fontWeight: 800, fontSize: 44, color: hi ? K.bg : K.ink}}>{tx}</div>
            </Card9>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S15 günün tablosu
const S15: React.FC = () => {
  const T0 = mk(15);
  const tiles: {n: string; v: number; dec: number; suf?: string; t: number; tone: 'sage' | 'bej' | 'paper' | 'taba'}[] = [
    {n: 'BIST 100 açılış', v: 11111, dec: 0, t: T0(15, 1), tone: 'sage'},
    {n: 'Dolar / TL', v: 50.63, dec: 2, t: T0(15, 2), tone: 'paper'},
    {n: 'Euro / TL', v: 55.34, dec: 2, t: T0(15, 2) + 0.8, tone: 'paper'},
    {n: 'Gram altın', v: 5900, dec: 0, suf: ' ₺', t: T0(15, 3), tone: 'bej'},
    {n: 'Çeyrek altın', v: 10180, dec: 0, suf: ' ₺', t: T0(15, 3) + 0.8, tone: 'bej'},
    {n: 'Ons altın', v: 3630, dec: 0, suf: ' $', t: T0(15, 3) + 1.6, tone: 'bej'},
    {n: 'Brent petrol', v: 86.75, dec: 2, suf: ' $', t: T0(15, 4), tone: 'taba'},
    {n: 'Benzin (İst.)', v: 68.4, dec: 2, suf: ' ₺', t: T0(15, 5), tone: 'paper'},
    {n: 'Motorin (İst.)', v: 88.9, dec: 2, suf: ' ₺', t: T0(15, 5) + 0.8, tone: 'paper'},
  ];
  const W = 556, H = 200, G = 16;
  return (
    <AbsoluteFill>
      <Head9 eyebrow="GÜNÜN TABLOSU" title="Piyasalarda son durum" />
      {tiles.map((t2, i) => {
        const x = 110 + (i % 3) * (W + G), y = 240 + Math.floor(i / 3) * (H + G);
        const dark = t2.tone === 'sage' || t2.tone === 'taba';
        return (
          <Card9 key={t2.n} t0={t2.t} x={x} y={y} w={W} h={H} tone={t2.tone}>
            <div style={{position: 'absolute', left: 28, top: 22, fontFamily: SANS, fontWeight: 800, fontSize: 26, color: dark ? K.bej : K.ink2}}>{t2.n}</div>
            <Count t0={t2.t + 0.15} v={t2.v} dec={t2.dec} suf={t2.suf} d={1.2} s={72} c={dark ? K.bg : K.ink} x={28} y={84} />
          </Card9>
        );
      })}
      <Src9>24 Kasım sabah verileri • rakamlar yaklaşıktır • yatırım tavsiyesi değildir</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S16 final (abone yalnızca abone cümlesinde)
const S16: React.FC = () => {
  const T0 = mk(16);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="ÖZETLE" title="Harç ve cezalarda yeni yıl: %27,83" />
      <Item t0={T0(16, 0)} x={110} y={250} w={1700} I={FileText} head="YENİ YIL" text="Vergi, harç ve trafik cezalarının büyük bölümü %27,83 artacak" />
      <Item t0={T0(16, 1)} x={110} y={386} w={1700} I={CreditCard} head="BUGÜN" text="Gözler Merkez Bankası'nın açıklayacağı kart faizi oranlarında" />
      <Drop t0={T0(16, 2)} x={110} y={530} style={{padding: '14px 28px', borderRadius: 30, background: K.bej, fontFamily: SANS, fontWeight: 800, fontSize: 30, color: K.ink}}>Yarın: ABD enflasyon verisi ve piyasalara etkisi</Drop>
      <Drop t0={T0(16, 3)} x={560} y={640} w={800} h={120} style={{borderRadius: 60, background: K.sageD, boxShadow: `0 20px 50px ${K.sageD}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, fontFamily: SANS, fontWeight: 900, fontSize: 52, color: K.bg, letterSpacing: 3}}><Bell size={48} strokeWidth={2.4} />ABONE OL</Drop>
      <Tx9 t0={T0(16, 4)} x={110} y={810} w={1700} s={30} c={K.ink2} wt={800} align="center">Anlattıklarım bilgilendirme amaçlıdır, yatırım tavsiyesi değildir</Tx9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- gerçek görüntüler
type BR = [number, number, string, string, string, 'in' | 'out' | 'left' | 'right'];
const BROLL: BR[] = [
  [A(2, 0) - 0.2, A(2, 0) + 1.1, 'stock/havalimani-1.mp4', 'Yurt dışına çıkacaklar', 'Pasaport ve çıkış harcı', 'in'],
  [A(3, 1) - 0.1, A(3, 2) - 0.1, 'stock/otoyol-1.mp4', 'Trafik cezaları', '1 Ocak 2027 itibarıyla', 'left'],
  [A(4, 0) - 0.2, A(4, 1) - 0.1, 'stock/ev-2.mp4', 'Vatandaşın lehine', 'İstisnalar da yükseliyor', 'in'],
  [A(5, 0) - 0.2, A(5, 2) - 0.1, 'stock/kart-1.mp4', 'Kredi kartı', 'Aralık azami faiz oranları', 'out'],
  [A(6, 5) - 0.1, A(6, 6) - 0.1, 'stock/konut-insaat-3.mp4', 'İnşaat', 'Güven 80,2', 'in'],
  [A(8, 0) - 0.2, A(8, 1) - 0.1, 'stock/para-dolar.mp4', 'Döviz talebi', 'Goldman Sachs raporu', 'in'],
  [A(10, 0) - 0.2, A(10, 1) - 0.1, 'stock/altin-1.mp4', 'Altın', 'Toparlanma sürüyor', 'out'],
  [A(11, 0) - 0.2, A(11, 1) - 0.1, 'stock/ulke-abd-1.mp4', 'Wall Street', 'Teknolojide tepki yükselişi', 'in'],
  [A(11, 3) - 0.2, A(11, 4) - 0.1, 'stock/petrol-1.mp4', 'Petrol', 'Brent geriledi', 'right'],
  [A(15, 0) - 0.2, A(15, 1) - 0.1, 'stock/istanbul-3.mp4', 'Günün tablosu', '24 Kasım 2026', 'in'],
];
const LT: [number, string][] = [
  [A(1, 1) + 0.3, 'Resmî Gazete • yeniden değerleme oranı'],
  [A(6, 1) + 0.3, 'TÜİK • kasım güven endeksleri'],
  [A(9, 1) + 0.3, 'Borsa İstanbul • günün açılışı'],
];
const TICK = ['YENİDEN DEĞERLEME %27,83', 'BIST 100 AÇILIŞ 11.111 (+%0,06)', 'USD/TL 50,63', 'EUR/TL 55,34', 'GRAM ALTIN ≈ 5.900 ₺', 'ONS ≈ 3.630 $', 'BRENT 86,75 $', 'İNŞAAT GÜVENİ 80,2', 'BENZİN 68,40 ₺', 'MOTORİN 88,90 ₺', 'YATIRIM TAVSİYESİ DEĞİLDİR'];

const SCENES: React.FC[] = [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16];
const TT = 12;
export const EnfVideo11: React.FC = () => {
  useFonts9();
  const total = ENF11_TOTAL;
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
      <Sequence from={fr(D.bumpers[0])} durationInFrames={fr(BUMP9)}><Bumper9 label="KART FAİZİ VE GÜVEN" sub="TCMB • TÜİK • DÖVİZ" /></Sequence>
      <Sequence from={fr(D.bumpers[1])} durationInFrames={fr(BUMP9)}><Bumper9 label="PİYASALAR" sub="BORSA • ALTIN • DÜNYA" /></Sequence>
      <Sequence from={fr(D.bumpers[2])} durationInFrames={fr(BUMP9)}><Bumper9 label="KAP BİLDİRİMLERİ" sub="ŞİRKETLER • TAKVİM • TABLO" /></Sequence>
      <Sequence from={fr(END)} durationInFrames={total - fr(END)}><End9 next="ABD enflasyon verisi: dolar ve altına etkisi" /></Sequence>
    </AbsoluteFill>
  );
};
