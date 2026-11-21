import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {TransitionSeries, springTiming} from '@remotion/transitions';
import {fade} from '@remotion/transitions/fade';
import {slide} from '@remotion/transitions/slide';
import {
  ArrowRight, Baby, Banknote, Bell, CalendarDays, Car, Coins, CreditCard, FileText, Globe, Heart, Home, Landmark, Percent, PiggyBank, Scale, ShieldAlert, TrendingDown, TrendingUp, User, Users, Wallet, Building2,
} from 'lucide-react';
import D from './enf9_sentences.json';
import {
  Bars, Bug9, BUMP9, Bumper9, Card9, Count, DateChip, Drop, DropWords, End9, Frame9, Head9, HBar, Ico9, K, Line9, LT9, Paper, Push9, SANS, SERIF, Src9, Stock9, Ticker9, tr, Tx9, useFonts9, useP,
} from './Palet';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
export const ENF9_TOTAL = Math.ceil(D.total * FPS);
type Pa = {start: number; end: number; sentences: number[]};
const paras = D.paras as Pa[];
const A = (pi: number, si = 0) => paras[pi].sentences[Math.min(si, paras[pi].sentences.length - 1)];
const mk = (pi0: number) => (pi: number, si = 0) => A(pi, si) - paras[pi0].start;
const END = D.end;
const DATE = '22 KASIM 2026';
const pct = (d = 0) => (v: number) => '%' + tr(v, d);
const tl = (v: number) => tr(v) + ' ₺';

// küçük ok
const Arrow: React.FC<{t0: number; x: number; y: number; c?: string}> = ({t0, x, y, c = K.taba}) => <Drop t0={t0} x={x} y={y} style={{color: c}}><ArrowRight size={56} strokeWidth={2.6} /></Drop>;
// akış kutusu
const Box: React.FC<{t0: number; x: number; y: number; w: number; label: string; v: number; pre?: string; suf?: string; tone?: 'paper' | 'sage' | 'taba' | 'bej'; d?: number; dec?: number}> = ({t0, x, y, w, label, v, pre = '', suf = ' ₺', tone = 'paper', d = 1.2, dec = 0}) => {
  const dark = tone === 'sage' || tone === 'taba';
  return (
    <Card9 t0={t0} x={x} y={y} w={w} h={190} tone={tone}>
      <div style={{position: 'absolute', left: 28, top: 24, fontFamily: SANS, fontWeight: 800, fontSize: 20, letterSpacing: 2, color: dark ? K.bej : K.tabaD}}>{label}</div>
      <Count t0={t0 + 0.15} v={v} d={d} dec={dec} pre={pre} suf={suf} s={62} c={dark ? K.bg : K.ink} x={28} y={86} />
    </Card9>
  );
};
// rozet
const Badge: React.FC<{t0: number; x: number; y: number; children: string; tone?: 'sage' | 'taba'; s?: number; rot?: number}> = ({t0, x, y, children, tone = 'sage', s = 40, rot = -3}) => (
  <Drop t0={t0} x={x} y={y} style={{padding: `${s * 0.3}px ${s * 0.7}px`, borderRadius: s, background: tone === 'sage' ? K.sageD : K.taba, color: tone === 'sage' ? K.bg : K.sageD, fontFamily: SANS, fontWeight: 900, fontSize: s, letterSpacing: 1, transform: `rotate(${rot}deg)`, boxShadow: `0 14px 30px ${tone === 'sage' ? K.sage : K.tabaD}55`, whiteSpace: 'nowrap'}}>{children}</Drop>
);
// madde satırı
const Item: React.FC<{t0: number; x: number; y: number; w: number; I: any; head: string; text: string; tone?: 'sage' | 'taba'}> = ({t0, x, y, w, I, head, text, tone = 'sage'}) => (
  <Card9 t0={t0} x={x} y={y} w={w} h={116}>
    <div style={{position: 'absolute', left: 22, top: 20}}><Ico9 I={I} c={tone === 'sage' ? K.sage : K.tabaD} s={36} /></div>
    <div style={{position: 'absolute', left: 120, top: 18, fontFamily: SANS, fontWeight: 800, fontSize: 19, letterSpacing: 3, color: tone === 'sage' ? K.ink2 : K.tabaD}}>{head}</div>
    <div style={{position: 'absolute', left: 120, top: 48, width: w - 150, fontFamily: SANS, fontWeight: 700, fontSize: 32, color: K.ink}}>{text}</div>
  </Card9>
);

// ---------------------------------------------------------------- S0 kanca (logo yok, ilk saniyeden konu)
const S0: React.FC = () => {
  const T0 = mk(0);
  return (
    <AbsoluteFill>
      <Frame9 src="stock/kart-3.mp4" t0={0} x={1060} y={120} w={760} h={500} />
      <Tx9 t0={0} x={110} y={120} s={24} c={K.tabaD} wt={800} ls={4}>BU HAFTA CEBİNİZDE NE DEĞİŞTİ?</Tx9>
      <DropWords t0={0.05} x={106} y={160} w={900} s={104} stagger={0.08}>Kredi kartı borcun mu var?</DropWords>
      <DropWords t0={T0(0, 1)} x={106} y={410} w={900} s={56} c={K.sageD} wt={700} stagger={0.05}>Asgari ödeme oranı değişti</DropWords>
      <Card9 t0={T0(0, 3)} x={110} y={560} w={730} h={330} tone="sage" label="ASGARİ ÖDEME • 100–200 BİN ₺ LİMİT">
        <Count t0={T0(0, 3) + 0.4} v={30} v0={40} d={2} pre="%" s={170} c={K.bg} x={30} y={110} />
        <Tx9 t0={T0(0, 3) + 1.2} x={490} y={200} s={36} c={K.bej} wt={800}>%40’tan indi</Tx9>
      </Card9>
      <Card9 t0={T0(0, 4)} x={870} y={660} w={450} h={230} tone="bej" label="KONUT KREDİSİ">
        <div style={{position: 'absolute', left: 30, top: 70}}><Ico9 I={Home} c={K.sageD} s={44} bg={`${K.bg}aa`} /></div>
        <Tx9 t0={T0(0, 4) + 0.3} x={140} y={74} w={290} s={40} c={K.ink} wt={800} font={SERIF}>Kısıtlama esnetildi</Tx9>
      </Card9>
      {['Kredi kartı', 'Konut kredisi', 'Mevduat', 'Kredi faizleri', 'Kapanış'].map((s, i) => (
        <Drop key={s} t0={T0(0, 5) + i * 0.25} x={1340 + (i % 2) * 240} y={660 + Math.floor(i / 2) * 76} style={{padding: '10px 22px', borderRadius: 30, background: K.paper, border: `2px solid ${K.taba}`, fontFamily: SANS, fontWeight: 800, fontSize: 24, color: K.ink2}}>{s}</Drop>
      ))}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S1 üç kademe
const S1: React.FC = () => {
  const T0 = mk(1);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="KREDİ KARTI • BDDK KARARI" title="Asgari ödeme artık üç kademeli" />
      <DateChip date="19 KASIM KARARI • 20 KASIM DUYURU" />
      <Card9 t0={T0(1, 1)} x={110} y={240} w={560} h={300} tone="bej" label="ASGARİ ÖDEME NEDİR?">
        <Tx9 t0={T0(1, 1) + 0.3} x={30} y={70} w={500} s={36} c={K.ink} wt={700} font={SERIF} lh={1.15}>Ekstredeki dönem borcunun en az ödenmesi gereken kısmı</Tx9>
      </Card9>
      <Card9 t0={T0(1, 2)} x={110} y={570} w={560} h={330} tone="sage" label="YENİ SİSTEM">
        <Count t0={T0(1, 2) + 0.3} v={3} v0={2} d={1} s={170} c={K.bg} x={30} y={80} />
        <Tx9 t0={T0(1, 2) + 0.8} x={160} y={140} w={380} s={44} c={K.bej} wt={800}>kademe</Tx9>
      </Card9>
      <Card9 t0={T0(1, 3) - 0.3} x={700} y={240} w={1110} h={660} />
      <Bars x={700} y={250} w={1110} h={640} max={48} bw={210} vs={70} items={[
        {label: '100 bin ₺ ve altı', v: 20, t0: T0(1, 3), fmt: pct(), c: K.sageL},
        {label: '100–200 bin ₺', v: 40, v1: 30, tc: T0(1, 4) + 2.2, t0: T0(1, 4), fmt: pct(), c: K.sage, sub: 'YENİ'},
        {label: '200 bin ₺ üstü', v: 40, t0: T0(1, 5), fmt: pct(), c: K.taba},
      ]} />
      <Badge t0={T0(1, 4) + 2.6} x={760} y={280} s={34}>%40 → %30</Badge>
      <Src9>BDDK kurul kararı 11605 (19 Kasım 2026)</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S2 öncesi
const S2: React.FC = () => {
  const T0 = mk(2);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="KREDİ KARTI • ÖNCESİ" title="İki ayda iki değişiklik" />
      <div style={{position: 'absolute', left: 110, top: 470, width: 1700, height: 6, borderRadius: 3, background: K.bej}} />
      <Card9 t0={T0(2, 1)} x={110} y={240} w={800} h={420} label="1 EKİM 2026">
        <Tx9 t0={T0(2, 1) + 0.2} x={30} y={70} w={740} s={32} c={K.ink2} wt={700}>%20 oranının uygulandığı limit sınırı</Tx9>
        <Count t0={T0(2, 1) + 0.6} v={100000} v0={50000} d={2} suf=" ₺" s={110} c={K.sageD} x={30} y={130} />
        <Tx9 t0={T0(2, 2)} x={30} y={290} w={740} s={34} c={K.ink} wt={800}>İki kademe: %20 ve %40</Tx9>
        <Tx9 t0={T0(2, 2) + 0.4} x={30} y={340} w={740} s={26} c={K.mute} wt={600}>100 bin ₺ üstü bütün kartlarda %40</Tx9>
      </Card9>
      <Arrow t0={T0(2, 3)} x={935} y={420} />
      <Card9 t0={T0(2, 3)} x={1010} y={240} w={800} h={420} tone="sage" label="19 KASIM 2026">
        <Tx9 t0={T0(2, 3) + 0.2} x={30} y={70} w={740} s={32} c={K.bej} wt={700}>Araya yeni kademe eklendi</Tx9>
        <Count t0={T0(2, 3) + 0.5} v={30} v0={40} d={1.6} pre="%" s={150} c={K.bg} x={30} y={130} />
        <Tx9 t0={T0(2, 3) + 1.0} x={30} y={300} w={740} s={34} c={K.bg} wt={800}>Üç kademe: %20 • %30 • %40</Tx9>
      </Card9>
      <Card9 t0={T0(2, 4)} x={110} y={700} w={1700} h={190} tone="bej" label="GEREKÇE">
        <Tx9 t0={T0(2, 4) + 0.3} x={30} y={66} w={1640} s={48} c={K.ink} wt={700} font={SERIF}>“Tüketicinin elini rahatlatmak, iç talebi desteklemek”</Tx9>
      </Card9>
      <Src9>BDDK kararları (1 Ekim ve 19 Kasım 2026) • haberler</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S3 örnek
const CardArt: React.FC<{t0: number}> = ({t0}) => (
  <Drop t0={t0} x={110} y={250} w={640} h={400} style={{borderRadius: 34, background: `linear-gradient(135deg, ${K.sage}, ${K.sageD} 70%)`, boxShadow: '0 30px 70px rgba(59,68,34,.3)', overflow: 'hidden'}}>
    <div style={{position: 'absolute', right: -80, top: -80, width: 320, height: 320, borderRadius: '50%', background: `${K.bej}22`}} />
    <div style={{position: 'absolute', left: 50, top: 60, width: 90, height: 66, borderRadius: 12, background: `linear-gradient(135deg, ${K.bej}, ${K.taba})`}} />
    <div style={{position: 'absolute', left: 50, top: 190, fontFamily: SANS, fontWeight: 700, fontSize: 40, color: K.bej, letterSpacing: 6}}>•••• •••• •••• 2026</div>
    <div style={{position: 'absolute', left: 50, top: 280, fontFamily: SANS, fontWeight: 800, fontSize: 22, color: K.bej, letterSpacing: 3}}>KART LİMİTİ</div>
    <div style={{position: 'absolute', left: 50, top: 310, fontFamily: SANS, fontWeight: 900, fontSize: 52, color: K.bg}}>150.000 ₺</div>
  </Drop>
);
const S3: React.FC = () => {
  const T0 = mk(3);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="ÖRNEK HESAP" title="Limit 150 bin, ekstre 25 bin lira" />
      <CardArt t0={T0(3, 1)} />
      <Card9 t0={T0(3, 1) + 0.8} x={110} y={690} w={640} h={200} tone="bej" label="BU AYKİ EKSTRE">
        <Count t0={T0(3, 1) + 1.0} v={25000} d={1.4} suf=" ₺" s={96} c={K.ink} x={30} y={70} />
      </Card9>
      <Card9 t0={T0(3, 2) - 0.2} x={790} y={250} w={700} h={640} />
      <Bars x={790} y={260} w={700} h={620} max={11500} bw={210} vs={60} items={[
        {label: 'Eski kural (%40)', v: 10000, t0: T0(3, 2), fmt: tl, c: K.taba},
        {label: 'Yeni kural (%30)', v: 7500, t0: T0(3, 3), fmt: tl, c: K.sage},
      ]} />
      <Card9 t0={T0(3, 4)} x={1520} y={250} w={290} h={300} tone="sage" label="BU AY DAHA AZ">
        <Count t0={T0(3, 4) + 0.2} v={2500} d={1.2} pre="−" s={70} c={K.bg} x={26} y={90} />
        <Tx9 t0={T0(3, 4) + 0.5} x={28} y={190} s={40} c={K.bej} wt={800}>lira</Tx9>
      </Card9>
      <Card9 t0={T0(3, 5)} x={1520} y={580} w={290} h={310} tone="taba">
        <Tx9 t0={T0(3, 5) + 0.2} x={26} y={40} w={240} s={42} c={K.bg} wt={800} font={SERIF} lh={1.1}>Ay sonu için nefes alanı</Tx9>
      </Card9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S4 borç azalmıyor
const S4: React.FC = () => {
  const T0 = mk(4);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="DİKKAT" title="Asgari ödeme düştü, borç düşmedi" />
      <Card9 t0={T0(4, 1)} x={110} y={240} w={830} h={190} tone="bej">
        <div style={{position: 'absolute', left: 26, top: 40}}><Ico9 I={ShieldAlert} c={K.tabaD} s={44} bg={`${K.bg}aa`} /></div>
        <Tx9 t0={T0(4, 1) + 0.2} x={140} y={34} w={660} s={36} c={K.ink} wt={800} font={SERIF} lh={1.15}>Ödemediğin kısım faiziyle sonraki aya devreder</Tx9>
      </Card9>
      <Card9 t0={T0(4, 3)} x={980} y={240} w={400} h={190} tone="sage" label="AYLIK AZAMİ AKDİ FAİZ">
        <Count t0={T0(4, 3) + 0.2} v={3.25} d={1.4} dec={2} pre="%" s={88} c={K.bg} x={28} y={74} />
      </Card9>
      <Tx9 t0={T0(4, 3) + 0.6} x={984} y={440} w={400} s={22} c={K.mute} wt={700}>dönem borcu 30 bin ₺ altı</Tx9>
      <Card9 t0={T0(4, 4)} x={1410} y={240} w={400} h={190} tone="taba" label="NAKİT ÇEKİM • KMH">
        <Count t0={T0(4, 4) + 0.2} v={4.25} d={1.4} dec={2} pre="%" s={88} c={K.bg} x={28} y={74} />
      </Card9>
      <Box t0={T0(4, 5)} x={110} y={520} w={380} label="EKSTRE" v={25000} />
      <Arrow t0={T0(4, 5) + 0.6} x={505} y={585} />
      <Box t0={T0(4, 5) + 0.8} x={580} y={520} w={380} label="ÖDENEN" v={7500} tone="bej" />
      <Arrow t0={T0(4, 5) + 1.4} x={975} y={585} />
      <Box t0={T0(4, 5) + 1.6} x={1050} y={520} w={380} label="DEVREDEN" v={17500} />
      <Arrow t0={T0(4, 5) + 2.2} x={1445} y={585} c={K.tabaD} />
      <Box t0={T0(4, 5) + 2.4} x={1520} y={520} w={290} label="1 AYLIK FAİZ" v={569} pre="+" tone="taba" />
      <Card9 t0={T0(4, 6)} x={110} y={760} w={1700} h={130} tone="paper">
        <div style={{position: 'absolute', left: 24, top: 20}}><Ico9 I={TrendingUp} c={K.tabaD} s={40} /></div>
        <Tx9 t0={T0(4, 6) + 0.2} x={130} y={36} w={1540} s={38} c={K.ink} wt={800}>Her ay tekrarlanırsa borç giderek büyüyebilir</Tx9>
      </Card9>
      <Src9>TCMB kredi kartı azami faiz oranları (Kasım 2026) • hesap vergiler hariç</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S5 üç ay
const S5: React.FC = () => {
  const T0 = mk(5);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="ÜÇ AY SADECE ASGARİ ÖDEME" title="Borç ne kadar eriyor?" />
      <Card9 t0={T0(5, 1) - 0.2} x={110} y={240} w={1040} h={660} label="AY SONU KALAN BORÇ" />
      <Bars x={110} y={270} w={1040} h={620} max={27000} bw={190} vs={52} items={[
        {label: 'Başlangıç', v: 25000, t0: T0(5, 1), fmt: tl, c: K.taba},
        {label: '1. ay', v: 18069, t0: T0(5, 1) + 1.0, fmt: tl, c: K.sageL},
        {label: '2. ay', v: 13059, t0: T0(5, 1) + 2.0, fmt: tl, c: K.sage},
        {label: '3. ay', v: 9439, t0: T0(5, 1) + 3.0, fmt: tl, c: K.sageD},
      ]} />
      <Box t0={T0(5, 2)} x={1190} y={240} w={620} label="3 AYDA TOPLAM ÖDENEN" v={16840} />
      <Box t0={T0(5, 3)} x={1190} y={460} w={620} label="HÂLÂ KALAN BORÇ" v={9440} tone="bej" />
      <Box t0={T0(5, 4)} x={1190} y={680} w={620} label="SADECE FAİZE GİDEN" v={1277} tone="taba" />
      <Badge t0={T0(5, 6)} x={620} y={300} s={26}>Borcun tamamını ödediğin ay faiz yok</Badge>
      <Src9>Basit hesap: %30 asgari ödeme, aylık %3,25 faiz, yeni harcama yok • vergiler hariç</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S6 konut kısıtlaması
const S6: React.FC = () => {
  const T0 = mk(6);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="KONUT KREDİSİ • BDDK KARARI" title="Evi olana kredi dörtte bire iniyordu" />
      <Card9 t0={T0(6, 1)} x={110} y={240} w={1700} h={380} label="AĞUSTOS 2023'TEN BERİ • EN AZ 1 KONUTU OLAN">
        <HBar x={40} y={80} w={1200} v={100} v1={25} tc={T0(6, 2)} max={100} t0={T0(6, 1) + 0.4} label="Bankanın verebileceği kredi" fmt={(v) => '%' + tr(v)} c={K.sage} />
        <Tx9 t0={T0(6, 2) + 0.6} x={40} y={250} w={1600} s={40} c={K.tabaD} wt={800} font={SERIF}>%75 azaltma: kredinin sadece dörtte biri</Tx9>
      </Card9>
      <Tx9 t0={T0(6, 3)} x={110} y={660} s={24} c={K.tabaD} wt={800} ls={4}>KONUT SAYISINA KİMLER DAHİL?</Tx9>
      {([[User, 'Sen'], [Heart, 'Eşin'], [Baby, '18 yaş altı çocukların']] as [any, string][]).map(([I, s], i) => (
        <Card9 key={s} t0={T0(6, 3) + 0.4 + i * 0.5} x={110 + i * 575} y={710} w={550} h={180} tone={i === 0 ? 'sage' : 'bej'}>
          <div style={{position: 'absolute', left: 30, top: 40}}><Ico9 I={I} c={i === 0 ? K.bg : K.sageD} s={44} bg={i === 0 ? `${K.bg}22` : `${K.bg}aa`} /></div>
          <div style={{position: 'absolute', left: 150, top: 58, fontFamily: SERIF, fontWeight: 800, fontSize: 44, color: i === 0 ? K.bg : K.ink}}>{s}</div>
        </Card9>
      ))}
      <Src9>BDDK kararı (24 Ağustos 2023) ve 19 Kasım 2026 kararı 11604</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S7 yeni kural
const S7: React.FC = () => {
  const T0 = mk(7);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="KONUT KREDİSİ • YENİ KURAL" title="Sınır birden ikiye çıktı" />
      <Card9 t0={T0(7, 0)} x={110} y={240} w={560} h={300} tone="sage" label="KISITLAMA KİME?">
        <Count t0={T0(7, 0) + 0.4} v={2} v0={1} d={1} s={170} c={K.bg} x={30} y={80} />
        <Tx9 t0={T0(7, 1)} x={150} y={110} w={380} s={36} c={K.bej} wt={800} lh={1.1}>ve daha fazla konutu olana</Tx9>
      </Card9>
      <Card9 t0={T0(7, 2)} x={110} y={570} w={560} h={150} tone="bej">
        <div style={{position: 'absolute', left: 26, top: 30}}><Ico9 I={Home} c={K.sageD} s={40} bg={`${K.bg}aa`} /></div>
        <Tx9 t0={T0(7, 2) + 0.2} x={130} y={30} w={410} s={32} c={K.ink} wt={800} lh={1.15}>Tek evi olan ikinci ev için takılmıyor</Tx9>
      </Card9>
      <Card9 t0={T0(7, 3) - 0.2} x={700} y={240} w={1110} h={480} label="ÖRNEK • BANKANIN VEREBİLECEĞİ 2 MİLYON ₺" />
      <Bars x={700} y={260} w={1110} h={460} max={2300} bw={250} vs={58} items={[
        {label: 'Eskiden (tek evi olan)', v: 500, t0: T0(7, 3) + 1.5, fmt: (v) => tr(v) + ' bin ₺', c: K.taba},
        {label: 'Yeni kural', v: 2000, t0: T0(7, 4), fmt: (v) => (v >= 1000 ? tr(Math.round(v / 100) / 10, Math.abs(v - 2000) < 50 ? 0 : 1) + ' milyon ₺' : tr(Math.round(v)) + ' bin ₺'), c: K.sage},
      ]} />
      <Item t0={T0(7, 5)} x={110} y={760} w={840} I={Car} head="KAPSAM" text="Taşıt hariç konut teminatlı krediler de" />
      <Item t0={T0(7, 6)} x={970} y={760} w={840} I={FileText} head="HİSSELİ TAPU" text="%50 ve altı hisse genelde sayılmıyor" tone="taba" />
      <Src9>BDDK kararı 11604 • AA, Takvim, Ekonomi Gazetesi • örnek temsilîdir</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S8 kimin işine yarar
const S8: React.FC = () => {
  const T0 = mk(8);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="KONUT KREDİSİ" title="Bu karar kimin işine yarar?" />
      <Card9 t0={T0(8, 1)} x={110} y={240} w={830} h={300} tone="sage">
        <div style={{position: 'absolute', left: 30, top: 34}}><Ico9 I={Building2} c={K.bg} s={48} bg={`${K.bg}22`} /></div>
        <Tx9 t0={T0(8, 1) + 0.2} x={30} y={150} w={770} s={46} c={K.bg} wt={800} font={SERIF} lh={1.1}>Evini büyütmek isteyen</Tx9>
      </Card9>
      <Card9 t0={T0(8, 1) + 1.6} x={980} y={240} w={830} h={300} tone="bej">
        <div style={{position: 'absolute', left: 30, top: 34}}><Ico9 I={Users} c={K.sageD} s={48} bg={`${K.bg}aa`} /></div>
        <Tx9 t0={T0(8, 1) + 1.8} x={30} y={150} w={770} s={46} c={K.ink} wt={800} font={SERIF} lh={1.1}>Çocuğu için ikinci ev alan aile</Tx9>
      </Card9>
      <Card9 t0={T0(8, 2)} x={110} y={580} w={830} h={310} tone="taba" label="AMA">
        <Tx9 t0={T0(8, 2) + 0.2} x={30} y={70} w={770} s={52} c={K.bg} wt={800} font={SERIF} lh={1.08}>Kredi tutarı arttı, faiz aynı</Tx9>
        <Tx9 t0={T0(8, 3)} x={30} y={210} w={770} s={30} c={K.bej} wt={700}>Kararda doğrudan faiz indirimi yok</Tx9>
      </Card9>
      <Card9 t0={T0(8, 4)} x={980} y={580} w={830} h={310} label="KONUT PİYASASI">
        <Line9 x={20} y={50} w={500} h={250} pts={[40, 46, 58, 70]} labels={['', '', '', '']} t0={T0(8, 4) + 0.3} dur={2} min={30} max={80} fmt={() => ''} />
        <Tx9 t0={T0(8, 4) + 1.2} x={520} y={110} w={290} s={36} c={K.ink} wt={800} lh={1.15}>Orta segmentte talep artabilir</Tx9>
      </Card9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S9 konut kredisi maliyeti
const S9: React.FC = () => {
  const T0 = mk(9);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="KONUT KREDİSİ MALİYETİ" title="1 milyon lira, 10 yıl vade" />
      <Card9 t0={T0(9, 1)} x={110} y={240} w={560} h={250} tone="sage" label="EN DÜŞÜK İLAN FAİZİ • AYLIK">
        <Count t0={T0(9, 1) + 0.3} v={2.87} d={1.4} dec={2} pre="%" s={130} c={K.bg} x={30} y={80} />
      </Card9>
      <Card9 t0={T0(9, 3)} x={110} y={520} w={560} h={250} tone="bej" label="AYLIK TAKSİT">
        <Count t0={T0(9, 3) + 0.2} v={29700} d={1.4} suf=" ₺" s={104} c={K.ink} x={30} y={86} />
      </Card9>
      <Card9 t0={T0(9, 6)} x={110} y={800} w={560} h={100} tone="paper">
        <Tx9 t0={T0(9, 6) + 0.2} x={26} y={28} w={520} s={30} c={K.ink} wt={800}>TCMB ortalama yıllık: %41,35</Tx9>
      </Card9>
      <Card9 t0={T0(9, 2)} x={700} y={240} w={1110} h={660} />
      <Bars x={700} y={250} w={1110} h={640} max={4000000} bw={260} vs={56} items={[
        {label: 'Çekilen kredi', v: 1000000, t0: T0(9, 2), fmt: tl, c: K.taba},
        {label: '10 yılda geri ödenen', v: 3560000, t0: T0(9, 4), fmt: tl, c: K.sage},
      ]} />
      <Badge t0={T0(9, 5)} x={880} y={400} tone="taba" s={34}>3,5 katından fazla</Badge>
      <Src9>Hesapkurdu (20 Kasım) • TCMB 13 Kasım haftası • basit hesap</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S10 ihtiyaç kredisi
const S10: React.FC = () => {
  const T0 = mk(10);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="İHTİYAÇ KREDİSİ" title="Tablo daha pahalı" />
      <Card9 t0={T0(10, 1)} x={110} y={240} w={560} h={260} tone="taba" label="TCMB ORTALAMA • YILLIK">
        <Count t0={T0(10, 1) + 0.3} v={60.01} d={1.6} dec={2} pre="%" s={124} c={K.bg} x={30} y={86} />
      </Card9>
      <Card9 t0={T0(10, 2)} x={110} y={530} w={560} h={200} tone="bej" label="KAMPANYASIZ İLAN • AYLIK">
        <Tx9 t0={T0(10, 2) + 0.2} x={30} y={70} w={520} s={66} c={K.ink} wt={900}>%2,84 – %2,89</Tx9>
      </Card9>
      <Tx9 t0={T0(10, 3)} x={114} y={750} w={560} s={26} c={K.mute} wt={700}>Yeni müşteri kampanyalarında daha düşük oranlar var</Tx9>
      <Card9 t0={T0(10, 4)} x={700} y={240} w={1110} h={500} label="100.000 ₺ • 12 AY • %2,89 • TOPLAM ÖDEME">
        <Line9 x={20} y={60} w={1070} h={430} pts={[0, 29941, 59882, 89823, 119764]} labels={['0', '3. ay', '6. ay', '9. ay', '12. ay']} t0={T0(10, 4) + 0.4} dur={3.2} min={0} max={135000} fmt={(v) => (v ? tr(Math.round(v / 10) * 10) : '')} vs={30} />
      </Card9>
      <Box t0={T0(10, 4) + 1.2} x={700} y={770} w={360} label="AYLIK TAKSİT" v={9980} tone="sage" />
      <Box t0={T0(10, 5)} x={1080} y={770} w={400} label="BİR YILDA TOPLAM" v={119760} />
      <Badge t0={T0(10, 6)} x={1500} y={810} tone="taba" s={26} rot={0}>+ vergi + masraf</Badge>
      <Src9>TCMB 13 Kasım haftası • Hesapkurdu, Hangikredi (21 Kasım) • vergiler hariç</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S11 mevduat-kredi farkı
const S11: React.FC = () => {
  const T0 = mk(11);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="BANKANIN MAKASI" title="Mevduata %41,68, krediye %60" />
      <Card9 t0={T0(11, 1) - 0.2} x={110} y={240} w={1700} h={400} />
      <HBar x={150} y={270} w={1150} v={41.68} max={66} t0={T0(11, 1)} label="Mevduata ödenen ortalama faiz" fmt={(v) => '%' + tr(v, 2)} c={K.sage} />
      <HBar x={150} y={440} w={1150} v={60.01} max={66} t0={T0(11, 1) + 2.2} label="İhtiyaç kredisinde alınan ortalama faiz" fmt={(v) => '%' + tr(v, 2)} c={K.taba} />
      <Card9 t0={T0(11, 2)} x={1500} y={280} w={270} h={300} tone="bej" label="FARK">
        <Count t0={T0(11, 2) + 0.2} v={18} d={1.2} pre="≈" s={100} c={K.ink} x={24} y={80} />
        <Tx9 t0={T0(11, 2) + 0.6} x={28} y={200} s={30} c={K.ink2} wt={800}>puan</Tx9>
      </Card9>
      <Item t0={T0(11, 4)} x={110} y={680} w={840} I={PiggyBank} head="BİRİKİMİ OLAN" text="Yüksek faizden kazanıyor" />
      <Item t0={T0(11, 4) + 1.2} x={970} y={680} w={840} I={Wallet} head="BORÇLU OLAN" text="Yüksek faiz + vergi ödüyor" tone="taba" />
      <Src9>TCMB haftalık faiz istatistikleri, 13 Kasım haftası</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S12 mevduat
const S12: React.FC = () => {
  const T0 = mk(12);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="MEVDUAT" title="100 bin lira, 32 gün" />
      <Card9 t0={T0(12, 1)} x={110} y={240} w={560} h={250} tone="sage" label="TCMB ORTALAMA • YILLIK">
        <Count t0={T0(12, 1) + 0.3} v={41.68} d={1.5} dec={2} pre="%" s={120} c={K.bg} x={30} y={86} />
      </Card9>
      <Card9 t0={T0(12, 2)} x={110} y={520} w={560} h={210} tone="bej" label="32 GÜN • EN YÜKSEK (KAMPANYALI)">
        <Tx9 t0={T0(12, 2) + 0.2} x={30} y={74} w={520} s={72} c={K.ink} wt={900}>%40 – %44</Tx9>
      </Card9>
      <Card9 t0={T0(12, 3) - 0.2} x={700} y={240} w={1110} h={660} label="YILLIK %40 BRÜT • 100.000 ₺ • 32 GÜN" />
      <Bars x={700} y={270} w={1110} h={620} max={4000} bw={230} vs={58} items={[
        {label: 'Brüt getiri', v: 3507, t0: T0(12, 4), fmt: tl, c: K.sageL},
        {label: 'Stopaj (%17,5)', v: 614, t0: T0(12, 5), fmt: (v) => '−' + tl(v), c: K.taba},
        {label: 'Elinize geçen', v: 2893, t0: T0(12, 5) + 1.8, fmt: tl, c: K.sage},
      ]} />
      <Src9>TCMB 13 Kasım haftası • karşılaştırma siteleri • basit hesap</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S13 reel getiri
const S13: React.FC = () => {
  const T0 = mk(13);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="MEVDUAT VE ENFLASYON" title="Getiri enflasyonu yeniyor mu?" />
      <Card9 t0={T0(13, 1) - 0.2} x={110} y={240} w={1000} h={660} />
      <Bars x={110} y={260} w={1000} h={640} max={38} bw={240} vs={64} items={[
        {label: 'Yıllık enflasyon (ekim)', v: 29.77, t0: T0(13, 1), fmt: pct(2), c: K.taba},
        {label: 'Net mevduat faizi', v: 33, t0: T0(13, 2), fmt: (v) => '≈ %' + tr(v), c: K.sage},
      ]} />
      <Card9 t0={T0(13, 3)} x={1150} y={240} w={660} h={330} tone="sage" label="REEL GETİRİ (KABACA)">
        <Count t0={T0(13, 3) + 0.3} v={2.5} d={1.4} dec={1} pre="+%" s={160} c={K.bg} x={30} y={90} />
      </Card9>
      <Item t0={T0(13, 5)} x={1150} y={610} w={660} I={TrendingUp} head="GEÇEN HAFTA" text="Tek kazandıran kalem mevduattı" />
      <Item t0={T0(13, 6)} x={1150} y={760} w={660} I={TrendingDown} head="AMA" text="Faiz düşerse avantaj daralır" tone="taba" />
      <Src9>TÜİK ekim 2026 TÜFE • net faiz %40 × (1 − 0,175) • kabaca hesap</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S14 politika faizi
const S14: React.FC = () => {
  const T0 = mk(14);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="MERKEZ BANKASI" title="Faizlerin yönünü politika faizi belirliyor" />
      <Card9 t0={T0(14, 1)} x={110} y={240} w={520} h={300} tone="sage" label="POLİTİKA FAİZİ">
        <Count t0={T0(14, 1) + 0.3} v={36} v0={37} d={1.2} pre="%" s={170} c={K.bg} x={30} y={90} />
      </Card9>
      <Card9 t0={T0(14, 2)} x={660} y={240} w={1150} h={460} label="POLİTİKA FAİZİ YOLU">
        <Line9 x={20} y={50} w={1110} h={400} pts={[37, 36, 35]} labels={['Ekim öncesi', '22 Ekim', '10 Aralık (beklenti)']} t0={T0(14, 2) + 0.3} dur={T0(14, 3) - T0(14, 2) + 1.2} min={33} max={38.5} fmt={(v) => '%' + tr(v)} vs={40} />
      </Card9>
      <Box t0={T0(14, 4)} x={110} y={740} w={480} label="POLİTİKA FAİZİ ↓" v={36} pre="%" suf="" tone="sage" />
      <Arrow t0={T0(14, 4) + 0.5} x={605} y={800} />
      <Box t0={T0(14, 4) + 0.8} x={680} y={740} w={480} label="ÖNCE MEVDUAT FAİZİ ↓" v={41.68} pre="%" suf="" d={1} dec={2} />
      <Arrow t0={T0(14, 4) + 1.4} x={1175} y={800} />
      <Card9 t0={T0(14, 4) + 1.7} x={1250} y={740} w={560} h={190} tone="bej" label="SONRA KREDİ FAİZİ ↓">
        <Tx9 t0={T0(14, 4) + 1.9} x={28} y={78} w={500} s={44} c={K.ink} wt={800} font={SERIF}>daha yavaş</Tx9>
      </Card9>
      <Src9>TCMB • Piyasa Katılımcıları Anketi (Kasım 2026)</Src9>
      <Tx9 t0={T0(14, 5)} x={110} y={570} w={520} s={26} c={K.ink2} wt={700} lh={1.25}>Kredi kartı faizi referans orana bağlı, kasımda değişmedi</Tx9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S15 büyük resim
const S15: React.FC = () => {
  const T0 = mk(15); const p = useP();
  const tilt = -6 + 10 * p(T0(15, 3), 1.6);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="BÜYÜK RESİM" title="İki amaç arasında denge" />
      <Drop t0={T0(15, 1) - 0.3} x={560} y={300} w={800} h={60}>
        <div style={{position: 'absolute', left: 0, top: 20, width: 800, height: 10, borderRadius: 5, background: K.taba, transform: `rotate(${tilt}deg)`}} />
        <div style={{position: 'absolute', left: 380, top: 20, width: 40, height: 140, background: K.tabaD, borderRadius: 6}} />
      </Drop>
      <Card9 t0={T0(15, 1)} x={110} y={420} w={830} h={300} tone="bej" label="1 • ENFLASYONLA MÜCADELE">
        <div style={{position: 'absolute', left: 30, top: 80}}><Ico9 I={Scale} c={K.tabaD} s={44} bg={`${K.bg}aa`} /></div>
        <Tx9 t0={T0(15, 1) + 0.3} x={150} y={84} w={640} s={44} c={K.ink} wt={800} font={SERIF} lh={1.1}>Kredi büyümesi sınırlı tutuluyor</Tx9>
      </Card9>
      <Card9 t0={T0(15, 2)} x={980} y={420} w={830} h={300} tone="sage" label="2 • HANELERE NEFES">
        <div style={{position: 'absolute', left: 30, top: 80}}><Ico9 I={Home} c={K.bg} s={44} bg={`${K.bg}22`} /></div>
        <Tx9 t0={T0(15, 2) + 0.3} x={150} y={84} w={640} s={44} c={K.bg} wt={800} font={SERIF} lh={1.1}>Borçlu aileler ve konut piyasası</Tx9>
        <Tx9 t0={T0(15, 3)} x={150} y={220} w={640} s={26} c={K.bej} wt={700}>Asgari ödeme indirimi • konut kredisi gevşemesi</Tx9>
      </Card9>
      <Card9 t0={T0(15, 5)} x={110} y={760} w={1700} h={130} tone="paper">
        <div style={{position: 'absolute', left: 24, top: 20}}><Ico9 I={TrendingDown} c={K.sage} s={40} /></div>
        <Tx9 t0={T0(15, 5) + 0.2} x={130} y={36} w={1540} s={38} c={K.ink} wt={800}>Kalıcı rahatlama: enflasyon ve faizlerin birlikte düşmesi</Tx9>
      </Card9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S16 dünyadan
const S16: React.FC = () => {
  const T0 = mk(16);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="DÜNYADAN" title="Fed ve güçlü dolar faizlerimizi etkiliyor" />
      <Card9 t0={T0(16, 1)} x={110} y={240} w={830} h={400} label="ABD • FED">
        <div style={{position: 'absolute', left: 30, top: 70}}><Ico9 I={Globe} c={K.sage} s={44} /></div>
        <Tx9 t0={T0(16, 1) + 0.2} x={150} y={70} w={640} s={40} c={K.ink} wt={800} font={SERIF} lh={1.1}>Aralıkta yeni faiz artışı bekleniyor</Tx9>
        <Line9 x={20} y={190} w={790} h={200} pts={[96, 98, 101, 104]} labels={['', '', '', '']} t0={T0(16, 1) + 0.8} dur={2} min={92} max={106} fmt={() => ''} c={K.taba} />
        <Tx9 t0={T0(16, 1) + 2.4} x={560} y={200} w={250} s={24} c={K.tabaD} wt={800}>Dolar endeksi ↑</Tx9>
      </Card9>
      <Card9 t0={T0(16, 2)} x={980} y={240} w={830} h={400} tone="bej" label="TÜRKİYE'YE ETKİSİ">
        <div style={{position: 'absolute', left: 30, top: 70}}><Ico9 I={Landmark} c={K.sageD} s={44} bg={`${K.bg}aa`} /></div>
        <Tx9 t0={T0(16, 2) + 0.2} x={150} y={70} w={640} s={40} c={K.ink} wt={800} font={SERIF} lh={1.1}>Merkez Bankası indirimlerde temkinli olabilir</Tx9>
        <Tx9 t0={T0(16, 3)} x={150} y={240} w={640} s={30} c={K.ink2} wt={700} lh={1.2}>Faiz farkı daralırsa liraya talep azalabilir</Tx9>
      </Card9>
      <Card9 t0={T0(16, 4)} x={110} y={680} w={1700} h={210} tone="sage" label="DOLAR / TL • HAFTALIK KAPANIŞ">
        <Count t0={T0(16, 4) + 0.2} v={50.57} v0={50} d={1.4} dec={2} s={120} c={K.bg} x={30} y={70} />
      </Card9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S17 takvim
const S17: React.FC = () => {
  const T0 = mk(17);
  const items: [string, any, string, number][] = [
    ['Ay sonu', CreditCard, 'Aralık kredi kartı azami faiz oranları', T0(17, 1)],
    ['1 Aralık', TrendingUp, 'Üçüncü çeyrek büyüme verisi', T0(17, 2)],
    ['3 Aralık', Percent, 'Kasım enflasyonu', T0(17, 3)],
    ['10 Aralık', Landmark, 'Merkez Bankası faiz kararı', T0(17, 4)],
  ];
  return (
    <AbsoluteFill>
      <Head9 eyebrow="TAKVİM" title="Önümüzdeki günlerde izlenecekler" />
      <Drop t0={T0(17, 0)} x={404} y={250} w={8} h={640} style={{borderRadius: 4, background: K.bej}} />
      {items.map(([d, I, tx, t0], i) => (
        <React.Fragment key={tx}>
          <Tx9 t0={t0} x={110} y={282 + i * 160} w={260} s={36} c={K.sageD} wt={900} align="right">{d}</Tx9>
          <Drop t0={t0} x={372} y={262 + i * 160} style={{width: 72, height: 72, borderRadius: '50%', background: i === 3 ? K.sage : K.taba, color: K.bg, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><I size={36} strokeWidth={2.4} /></Drop>
          <Card9 t0={t0 + 0.1} x={480} y={244 + i * 160} w={1330} h={124} tone={i === 3 ? 'sage' : 'paper'}>
            <div style={{position: 'absolute', left: 34, top: 34, fontFamily: SERIF, fontWeight: 800, fontSize: 46, color: i === 3 ? K.bg : K.ink}}>{tx}</div>
          </Card9>
        </React.Fragment>
      ))}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S18 kapanış tablosu
const S18: React.FC = () => {
  const T0 = mk(18);
  const tiles: {n: string; v: number; dec: number; pre?: string; suf?: string; t: number; tone: 'sage' | 'bej' | 'paper' | 'taba'}[] = [
    {n: 'Politika faizi', v: 36, dec: 0, pre: '%', t: T0(18, 1), tone: 'sage'},
    {n: 'Mevduat ortalaması', v: 41.68, dec: 2, pre: '%', t: T0(18, 2), tone: 'paper'},
    {n: 'İhtiyaç kredisi', v: 60.01, dec: 2, pre: '%', t: T0(18, 3), tone: 'taba'},
    {n: 'Konut kredisi', v: 41.35, dec: 2, pre: '%', t: T0(18, 4), tone: 'paper'},
    {n: 'Kart azami faiz (aylık)', v: 3.25, dec: 2, pre: '%', t: T0(18, 5), tone: 'bej'},
    {n: 'Dolar / TL', v: 50.57, dec: 2, t: T0(18, 6), tone: 'paper'},
    {n: 'Gram altın', v: 5810, dec: 0, suf: ' ₺', t: T0(18, 7), tone: 'bej'},
    {n: 'BIST 100', v: 11120, dec: 0, pre: '≈ ', t: T0(18, 8), tone: 'paper'},
  ];
  const W = 412, H = 320, G = 18;
  return (
    <AbsoluteFill>
      <Head9 eyebrow="HAFTANIN KAPANIŞI" title="Faiz ve kur tablosu" />
      {tiles.map((tl2, i) => {
        const x = 110 + (i % 4) * (W + G), y = 240 + Math.floor(i / 4) * (H + G);
        const dark = tl2.tone === 'sage' || tl2.tone === 'taba';
        return (
          <Card9 key={tl2.n} t0={tl2.t} x={x} y={y} w={W} h={H} tone={tl2.tone}>
            <div style={{position: 'absolute', left: 28, top: 28, fontFamily: SANS, fontWeight: 800, fontSize: 26, color: dark ? K.bej : K.ink2}}>{tl2.n}</div>
            <Count t0={tl2.t + 0.15} v={tl2.v} dec={tl2.dec} pre={tl2.pre} suf={tl2.suf} d={1.2} s={76} c={dark ? K.bg : K.ink} x={28} y={170} />
          </Card9>
        );
      })}
      <Src9>TCMB (13 Kasım haftası, Kasım kart faizleri) • 20 Kasım kapanışları • yatırım tavsiyesi değildir</Src9>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- S19 final (abone yalnızca son cümlede)
const S19: React.FC = () => {
  const T0 = mk(19);
  return (
    <AbsoluteFill>
      <Head9 eyebrow="KISACA" title="Ödeme düştü, borç ve faiz yerinde" />
      <Item t0={T0(19, 0)} x={110} y={250} w={1700} I={CreditCard} head="BU HAFTA" text="Bazı kartlarda asgari ödeme düştü, tek evi olana konut kredisi kolaylaştı" />
      <Item t0={T0(19, 1)} x={110} y={390} w={1700} I={ShieldAlert} head="BİLGİLENDİRME" text="Anlattıklarım bilgilendirme amaçlıdır, yatırım tavsiyesi değildir" tone="taba" />
      <Card9 t0={T0(19, 2)} x={110} y={540} w={1700} h={170} tone="bej" label="PAZARTESİ">
        <Tx9 t0={T0(19, 2) + 0.2} x={30} y={66} w={1640} s={50} c={K.ink} wt={800} font={SERIF}>Yeni haftanın piyasa açılışı ve önemli veriler</Tx9>
      </Card9>
      <Drop t0={T0(19, 3)} x={560} y={760} w={800} h={120} style={{borderRadius: 60, background: K.sageD, boxShadow: `0 20px 50px ${K.sageD}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22, fontFamily: SANS, fontWeight: 900, fontSize: 52, color: K.bg, letterSpacing: 3}}><Bell size={48} strokeWidth={2.4} />ABONE OL</Drop>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- gerçek görüntüler
type BR = [number, number, string, string, string, 'in' | 'out' | 'left' | 'right'];
const BROLL: BR[] = [
  [A(3, 0) - 0.1, A(3, 1) - 0.1, 'stock/kart-1.mp4', 'Bir örnek', 'Limit 150 bin, ekstre 25 bin ₺', 'in'],
  [A(5, 0) - 0.1, A(5, 1) - 0.1, 'stock/hesap-1.mp4', 'Üç aylık hesap', 'Sadece asgari ödeme', 'in'],
  [A(6, 0) - 0.2, A(6, 1) - 0.1, 'stock/ev-3.mp4', 'Konut kredisi', 'BDDK’dan ikinci karar', 'in'],
  [A(8, 1) - 0.1, A(8, 1) + 2.6, 'stock/ev-1.mp4', 'İkinci ev', 'Kimin işine yarar?', 'right'],
  [A(9, 0) - 0.2, A(9, 1) - 0.1, 'stock/ev-2.mp4', 'Konut kredisinin maliyeti', 'Aylık %2,87’den', 'in'],
  [A(10, 0) - 0.2, A(10, 1) - 0.1, 'stock/hesap-2.mp4', 'İhtiyaç kredisi', 'Ortalama yıllık %60', 'in'],
  [A(12, 0) - 0.2, A(12, 1) - 0.1, 'stock/para-sayma-1.mp4', 'Mevduat', '32 gün vadede getiri', 'in'],
  [A(14, 0) - 0.2, A(14, 1) - 0.1, 'stock/istanbul-2.mp4', 'Politika faizi', 'Merkez Bankası %36', 'out'],
  [A(16, 1) - 0.1, A(16, 1) + 3.0, 'stock/ulke-abd-1.mp4', 'Fed ve dolar', 'Aralıkta artış bekleniyor', 'in'],
  [A(18, 0) - 0.2, A(18, 1) - 0.1, 'stock/istanbul-3.mp4', 'Haftanın kapanışı', '20 Kasım 2026', 'in'],
];
const LT: [number, string][] = [
  [A(1, 1) + 0.3, 'Kredi kartı • asgari ödeme'],
  [A(6, 1) + 0.3, 'Konut kredisi • ikinci ev'],
  [A(12, 2) + 0.3, 'Mevduat • 32 gün'],
];
const TICK = ['POLİTİKA FAİZİ %36', 'MEVDUAT ORT. %41,68', 'İHTİYAÇ KREDİSİ %60,01', 'KONUT KREDİSİ %41,35', 'KART AZAMİ AYLIK %3,25', 'USD/TL 50,57', 'GRAM ALTIN 5.810 ₺', 'BIST 100 ≈ 11.120', 'YATIRIM TAVSİYESİ DEĞİLDİR'];

const SCENES: React.FC[] = [S0, S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19];
const TT = 12;
export const EnfVideo9: React.FC = () => {
  useFonts9();
  const total = ENF9_TOTAL;
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
      <Sequence from={fr(D.bumpers[0])} durationInFrames={fr(BUMP9)}><Bumper9 label="KONUT KREDİSİ" sub="İKİNCİ EV KISITLAMASI" /></Sequence>
      <Sequence from={fr(D.bumpers[1])} durationInFrames={fr(BUMP9)}><Bumper9 label="KREDİ VE MEVDUAT" sub="GÜNCEL FAİZLER" /></Sequence>
      <Sequence from={fr(D.bumpers[2])} durationInFrames={fr(BUMP9)}><Bumper9 label="BÜYÜK RESİM" sub="POLİTİKA FAİZİ • TAKVİM • KAPANIŞ" /></Sequence>
      <Sequence from={fr(END)} durationInFrames={total - fr(END)}><End9 next="Yeni haftanın piyasa açılışı" /></Sequence>
    </AbsoluteFill>
  );
};
export {DATE};
