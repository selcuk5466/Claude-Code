import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import D from './gun2_sentences.json';
import {Arrow, Bg, C, Card, FONT, Label, Pill, Shell, Tx, clamp, fmt, useTL} from './ui';

const FPS = 30;
const fr = (s: number) => Math.round(s * FPS);
export const GUN2_TOTAL = Math.ceil(D.total * FPS);
type P = {start: number; end: number; sentences: number[]};
const paras = D.paras as P[];
// paragraf pi içinde cümle si'nin yerel başlangıcı (saniye)
const R = (pi: number, si: number) => paras[pi].sentences[si] - paras[pi].start;
// eski sahneler 4. paragraftan itibaren 2 paragraf kaydı (rezerv + tahvil bölümü)
const S = (pi: number, si: number) => R(pi >= 4 ? pi + 2 : pi, si);

// ------------------------------------------------------------------ ortak parçalar
const Src: React.FC<{t0?: number; children: string}> = ({t0 = 0.8, children}) => {
  const {p} = useTL();
  return (
    <div style={{position: 'absolute', left: 110, top: 960, width: 1700, opacity: p(t0, 0.4) * 0.92, fontFamily: FONT, fontSize: 24, fontWeight: 600, color: C.grey}}>
      <span style={{color: C.gold, fontWeight: 800, letterSpacing: 2, marginRight: 14}}>KAYNAK</span>{children}
    </div>
  );
};

const Stat: React.FC<{x: number; y: number; w: number; h: number; t0: number; col: string; label: string; value: string; sub?: string; vs?: number; o?: number}> = ({x, y, w, h, t0, col, label, value, sub, vs = 80, o = 1}) => {
  const {p} = useTL();
  return (
    <div style={{opacity: o}}>
      <Card x={x} y={y} w={w} h={h} t0={t0} accent={col}>
        <Label x={36} y={28} o={p(t0 + 0.1, 0.3)}>{label}</Label>
        <Tx x={36} y={sub ? 66 : 88} w={w - 60} s={vs} wt={900} glow={col} ls={-1} o={p(t0 + 0.1, 0.3)}>{value}</Tx>
        {sub && <Tx x={36} y={Math.min(h - 50, 66 + vs * 1.35 + 8)} w={w - 60} s={28} wt={600} c={C.grey} o={p(t0 + 0.2, 0.3)}>{sub}</Tx>}
      </Card>
    </div>
  );
};

const News: React.FC<{x: number; y: number; w: number; h: number; t0: number; col?: string; head: string; src: string; hs?: number; o?: number}> = ({x, y, w, h, t0, col = C.gold, head, src, hs = 40, o = 1}) => {
  const {p} = useTL();
  let sz = hs;
  const lines = (z: number) => Math.ceil((head.length * z * 0.55) / (w - 72));
  while (sz > 24 && 74 + lines(sz) * sz * 1.2 > h - 50) sz -= 2;
  return (
    <div style={{opacity: o}}>
      <Card x={x} y={y} w={w} h={h} t0={t0} accent={col}>
        <div style={{position: 'absolute', left: 36, top: 24, padding: '4px 16px', borderRadius: 8, background: col, color: '#07142a', fontFamily: FONT, fontWeight: 900, fontSize: 20, letterSpacing: 3, opacity: p(t0 + 0.1, 0.3)}}>HABER</div>
        <Tx x={36} y={70} w={w - 72} s={sz} wt={800} o={p(t0 + 0.15, 0.3)} lh={1.2}>{head}</Tx>
        <Tx x={36} y={h - 42} w={w - 72} s={22} wt={600} c={C.grey} o={p(t0 + 0.3, 0.3)}>{src}</Tx>
      </Card>
    </div>
  );
};

const Chip: React.FC<{x: number; y: number; w: number; h?: number; t0: number; col: string; children: React.ReactNode; s?: number; o?: number}> = ({x, y, w, h = 84, t0, col, children, s = 30, o = 1}) => {
  const {p, pop} = useTL();
  return (
    <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: h / 2, opacity: p(t0, 0.3) * o, transform: `scale(${0.92 + 0.08 * pop(t0)})`,
      background: col + '28', border: `2px solid ${col}88`, boxShadow: `0 0 40px ${col}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      fontFamily: FONT, fontWeight: 900, fontSize: s, color: C.white, letterSpacing: 1, padding: '0 28px'}}>{children}</div>
  );
};

const HProb: React.FC<{x: number; y: number; w: number; label: string; v: number; fin: string; col: string; t0: number}> = ({x, y, w, label, v, fin, col, t0}) => {
  const {p} = useTL(); const q = p(t0, 1.0);
  return (
    <>
      <Tx x={x} y={y} s={36} wt={800} o={p(t0 - 0.2, 0.3)}>{label}</Tx>
      <div style={{position: 'absolute', left: x, top: y + 54, width: w, height: 64, borderRadius: 32, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', opacity: p(t0 - 0.2, 0.3)}} />
      <div style={{position: 'absolute', left: x, top: y + 54, width: Math.max(0, w * (v / 100) * q), height: 64, borderRadius: 32, background: `linear-gradient(90deg, ${col}88, ${col})`, boxShadow: `0 0 50px ${col}77, inset 0 2px 0 rgba(255,255,255,.3)`}} />
      <Tx x={x + w - 20} y={y + 56} w={300} align="right" s={46} wt={900} o={clamp(q * 3)} glow={col}>{q >= 1 ? fin : '%' + Math.round(v * q)}</Tx>
    </>
  );
};

const VBar: React.FC<{x: number; base: number; w: number; h: number; color: string}> = ({x, base, w, h, color}) => (
  <div style={{position: 'absolute', left: x, top: base - h, width: w, height: Math.max(0, h), borderRadius: '20px 20px 0 0',
    background: `linear-gradient(180deg, ${color}, ${color}99)`, boxShadow: `0 0 55px ${color}66, inset 0 2px 0 rgba(255,255,255,.35)`}} />
);

const ph = (t: number, a: number, b: number) => clamp((t - a) / 0.3) * (1 - clamp((t - b) / 0.3));

// ------------------------------------------------------------------ sahneler
const Sc1: React.FC = () => {
  const {t, p, pop} = useTL();
  const heads = [
    {h: 'Altın 13 ayın en düşük seviyesinde', s: 'Trading Economics, Reuters • 13 Kasım', col: C.red, t0: 0.6},
    {h: "Nvidia'nın CEO'su Jensen Huang istifa etti", s: 'Reuters, Bloomberg • 12 Kasım', col: C.red, t0: S(0, 0) + 3.0},
    {h: 'Brent petrol yeniden 95 doların üzerinde', s: 'CNBC, Bloomberg • 12 Kasım', col: C.green, t0: S(0, 0) + 6.0},
    {h: "ABD ÜFE verisi bugün 16:30'da (TSİ)", s: 'BLS veri takvimi • 13 Kasım', col: C.gold, t0: S(0, 1) + 1.0},
  ];
  return (
    <Shell>
      <Pill x={110} y={220} w={420} h={72} bg={C.gold} c="#07142a" s={30} scale={pop(0.1)}>13 KASIM 2026</Pill>
      <Tx x={110 - 110 * (1 - p(0.3, 0.6))} y={320} s={118} wt={900} o={p(0.3, 0.5)} ls={-3}>GÜNLÜK</Tx>
      <Tx x={110 - 110 * (1 - p(0.6, 0.6))} y={440} s={118} wt={900} o={p(0.6, 0.5)} ls={-3} c={C.gold2} glow={C.gold}>PİYASA ÖZETİ</Tx>
      <div style={{position: 'absolute', left: 110, top: 590, width: 420 * p(1.0, 0.8), height: 9, borderRadius: 5, background: `linear-gradient(90deg, ${C.gold2}, ${C.gold})`, boxShadow: `0 0 26px ${C.gold}`}} />
      <Tx x={110} y={620} w={800} s={40} wt={600} c={C.grey} o={p(1.4, 0.5)}>Fed • Altın • Nvidia • Petrol • Türkiye • ÜFE</Tx>
      {heads.map((h, i) => <News key={i} x={1000} y={240 + i * 180} w={810} h={160} t0={h.t0} col={h.col} head={h.h} src={h.s} hs={34} />)}
    </Shell>
  );
};

const Sc2: React.FC = () => {
  const {t, p} = useTL();
  const sp = [
    {who: 'HAMMACK • CLEVELAND FED', txt: 'Enflasyondaki iyileşme durdu, daha sıkı politika gerek', t0: S(1, 2), y: 280},
    {who: 'GOOLSBEE • CHICAGO FED', txt: 'Faizler biraz daha artmalı', t0: S(1, 3), y: 490},
    {who: 'DALY • SAN FRANCISCO FED', txt: 'Faizler biraz daha artmalı', t0: S(1, 3) + 0.6, y: 700},
  ];
  const off = S(1, 4) - 0.1;
  return (
    <Shell title="Fed ve Dolar" sub="Fed yetkililerinden üst üste faiz artışı mesajı">
      {sp.map((s, i) => (
        <div key={i} style={{opacity: 1 - clamp((t - off) / 0.3)}}>
          <Card x={110} y={s.y} w={820} h={180} t0={s.t0} accent={C.gold}>
            <Tx x={36} y={26} s={22} wt={800} c={C.gold} ls={2}>{s.who}</Tx>
            <Tx x={36} y={72} w={740} s={36} wt={800}>{s.txt}</Tx>
          </Card>
        </div>
      ))}
      <div style={{opacity: clamp((t - S(1, 4)) / 0.3)}}>
        <HProb x={110} y={330} w={820} label="+25 baz puan artış (8–9 Aralık)" v={100} fin="%100" col={C.gold} t0={S(1, 4)} />
        <HProb x={110} y={560} w={820} label="+50 baz puan artış" v={15} fin="≈%15" col={C.red} t0={S(1, 5)} />
      </div>
      <Stat x={990} y={280} w={820} h={200} t0={S(1, 6)} col={C.red} label="ABD 10 YILLIK TAHVİL FAİZİ" value="%5,13" sub="3 haftanın zirvesi" />
      <Stat x={990} y={510} w={820} h={200} t0={S(1, 7)} col={C.green} label="DOLAR ENDEKSİ (DXY)" value="≈103" sub="yaklaşık 19 ayın zirvesi" />
      <Stat x={990} y={740} w={820} h={200} t0={S(1, 8)} col={C.gold} label="AMB • 17 ARALIK" value="%93" sub="faiz artışı ihtimali" />
      <Src>Barchart/Nasdaq, Bloomberg, Newsquawk, Trading Economics • 12–13 Kasım 2026</Src>
    </Shell>
  );
};

const Sc3: React.FC = () => (
  <Shell title="Yen ve Japonya" sub="Dolar/yen 160 seviyesine yaklaştı">
    <Stat x={110} y={290} w={820} h={290} t0={S(2, 1)} col={C.red} label="DOLAR / YEN" value="≈159,8" sub="160 psikolojik seviyesine yaklaştı" vs={130} />
    <News x={990} y={290} w={820} h={290} t0={S(2, 2)} col={C.gold} head="Japonya'nın para birimi yetkilisi Mimura müdahale uyarısı yaptı" src="Japan Times, Barchart/Nasdaq • 12 Kasım" hs={40} />
    <Stat x={110} y={620} w={820} h={290} t0={S(2, 3)} col={C.green} label="JAPONYA ÜFE (EKİM, YILLIK)" value="+%7,1" sub="beklentinin üzerinde" vs={120} />
    <Chip x={990} y={680} w={820} h={110} t0={S(2, 4)} col={C.gold} s={32}>BOJ'UN ARALIK ARTIRIMI BEKLENTİSİ CANLI</Chip>
    <Src>Japan Times, FXStreet, Saxo, Halk Yatırım • 12 Kasım 2026</Src>
  </Shell>
);

const Sc4: React.FC = () => {
  const {t, p} = useTL();
  return (
    <Shell title="Altın" sub="13 ayın en düşük seviyesi">
      <Tx x={110} y={260} s={250} wt={900} c={C.red} glow={C.red} ls={-7} o={p(S(3, 1) - 0.2, 0.4)}>{'-%' + fmt(3 * p(S(3, 1), 0.9), 0)}</Tx>
      <Arrow x={780} y={380} size={190} color={C.red} up={false} bounce={16} o={p(S(3, 1) + 0.4, 0.4)} />
      <Tx x={110} y={530} s={32} wt={700} c={C.grey} o={p(S(3, 1) + 0.6, 0.4)}>dün tek günde</Tx>
      <Stat x={110} y={600} w={820} h={170} t0={S(3, 2)} col={C.red} label="ONS ALTIN • BUGÜN SABAH" value="≈3.885–3.890 $" vs={72} />
      <Chip x={110} y={800} w={820} h={84} t0={S(3, 3)} col={C.red} s={28}>HAFTALIK BAZDA SERT KAYIP</Chip>
      <Stat x={990} y={280} w={820} h={200} t0={S(3, 4)} col={C.grey} label="GÜMÜŞ" value="≈50 $  (-%3'ten fazla)" vs={60} />
      <Chip x={990} y={530} w={260} h={130} t0={S(3, 5)} col={C.gold}>FAİZ ↑</Chip>
      <Chip x={1280} y={530} w={260} h={130} t0={S(3, 5) + 0.7} col={C.green}>DOLAR ↑</Chip>
      <Chip x={1570} y={530} w={240} h={130} t0={S(3, 5) + 1.4} col={C.red}>PETROL ↑</Chip>
      <News x={990} y={710} w={820} h={200} t0={S(3, 6)} col={C.red} head="3.850 $ altında haftalık kapanış düşüşü derinleştirebilir (analist notu)" src="FXEmpire • 13 Kasım" hs={34} />
      <Src>Trading Economics, Reuters, FXEmpire, Business Times • 12–13 Kasım 2026</Src>
    </Shell>
  );
};

const Sc5: React.FC = () => {
  const {t} = useTL();
  const a1 = S(4, 4) - 0.2, b0 = S(4, 4) - 0.1, b1 = S(4, 8) - 0.2, c0 = S(4, 8) - 0.1;
  return (
    <Shell title="Nvidia ve Borsalar" sub="Nvidia'da yönetim krizi ABD borsasını sarstı">
      <div style={{opacity: ph(t, -1, a1)}}>
        <Label x={110} y={250} c={C.gold}>NVIDIA</Label>
        <News x={110} y={300} w={560} h={330} t0={S(4, 1)} col={C.red} head="Nvidia'nın kurucusu ve CEO'su Jensen Huang istifa etti" src="Reuters, Bloomberg • 12 Kasım" hs={38} />
        <News x={700} y={300} w={560} h={330} t0={S(4, 2)} col={C.red} head="Hisse açılışta %14'e kadar düştü, piyasa değeri 4 trilyon doların altına indi" src="WSJ, Bloomberg • 12 Kasım" hs={36} />
        <Stat x={1290} y={300} w={520} h={330} t0={S(4, 3)} col={C.gold} label="GEÇİCİ CEO" value="Colette Kress" sub="Bilanço: 17 Kasım" vs={54} />
      </div>
      <div style={{opacity: ph(t, b0, b1)}}>
        <Label x={110} y={250} c={C.gold}>ABD BORSASI • DÜN</Label>
        <Stat x={110} y={300} w={560} h={250} t0={S(4, 5)} col={C.red} label="S&P 500" value="-%0,35" vs={100} />
        <Stat x={700} y={300} w={560} h={250} t0={S(4, 5) + 0.5} col={C.red} label="DOW JONES" value="-%0,36" vs={100} />
        <Chip x={1290} y={300} w={520} h={110} t0={S(4, 6)} col={C.gold} s={26}>TAHVİL FAİZİ ve PETROL BASKI YARATTI</Chip>
        <Chip x={1290} y={440} w={520} h={110} t0={S(4, 7)} col={C.gold} s={26}>İŞSİZLİK BAŞVURULARI 200 BİN</Chip>
      </div>
      <div style={{opacity: ph(t, c0, 9999)}}>
        <Label x={110} y={250} c={C.gold}>ASYA • BUGÜN</Label>
        <Stat x={110} y={300} w={560} h={250} t0={S(4, 9)} col={C.green} label="NIKKEI 225" value="+%1,48" vs={100} />
        <Stat x={700} y={300} w={560} h={250} t0={S(4, 9) + 0.6} col={C.green} label="KOSPI" value="+%1,97" vs={100} />
        <Chip x={1290} y={300} w={520} h={110} t0={S(4, 11)} col={C.green} s={28}>ABD VADELİLERİ POZİTİF</Chip>
      </div>
      <Src>Reuters, Bloomberg, WSJ, Barchart/Nasdaq, CNBC TV18 • 12–13 Kasım 2026</Src>
    </Shell>
  );
};

const Sc6: React.FC = () => (
  <Shell title="Avrupa ve AMB" sub="Aralık'ta faiz artışı bekleniyor">
    <Stat x={110} y={290} w={820} h={300} t0={S(5, 1)} col={C.green} label="AVRUPA BORSALARI • DÜN" value="Pozitif kapanış" sub="güçlü şirket bilançoları destekledi" vs={64} />
    <News x={990} y={290} w={820} h={300} t0={S(5, 2)} col={C.gold} head="AMB yetkilileri Aralık'ta bir artış, ardından duraklama bekliyor (haberlere göre)" src="Newsquawk • 12 Kasım" hs={38} />
    <News x={110} y={630} w={820} h={290} t0={S(5, 3)} col={C.red} head="Yeni tahmin: yüksek tahvil faizi 2027–28'de büyümeyi ≈1 puan, enflasyonu ≈0,9 puan azaltabilir" src="Newsquawk • 12 Kasım" hs={34} />
    <Stat x={990} y={630} w={820} h={290} t0={S(5, 4)} col={C.gold} label="BUGÜN 13:00 • EURO BÖLGESİ 3Ç GSYH" value="Beklenti: %0,4" sub="çeyreklik, ikinci okuma" vs={64} />
    <Src>Barchart/Nasdaq, Newsquawk, Halk Yatırım • 12–13 Kasım 2026</Src>
  </Shell>
);

const Sc7: React.FC = () => (
  <Shell title="Petrol" sub="Trump'tan İran açıklaması petrolü yükseltti">
    <News x={110} y={290} w={820} h={280} t0={S(6, 1)} col={C.gold} head={'“İran\'la anlaşmaya ihtiyacımız yok” — Başkan Trump'} src="CNBC • 12 Kasım" hs={46} />
    <Stat x={990} y={290} w={390} h={280} t0={S(6, 2)} col={C.green} label="BRENT" value="95,82 $" sub="+%3,3 • dün kapanış" vs={60} />
    <Stat x={1420} y={290} w={390} h={280} t0={S(6, 3)} col={C.green} label="WTI" value="88,74 $" sub="dün kapanış" vs={60} />
    <Chip x={110} y={620} w={820} h={96} t0={S(6, 4)} col={C.red} s={28}>HÜRMÜZ'DE 4 TANKER VURULDU (İRAN ORDUSU)</Chip>
    <Chip x={110} y={740} w={820} h={96} t0={S(6, 5)} col={C.gold} s={28}>MÜZAKERELERDE İLERLEME YOK</Chip>
    <Chip x={990} y={620} w={820} h={96} t0={S(6, 6)} col={C.green} s={28}>İKİNCİ HAFTALIK DÜŞÜŞ YOLUNDA</Chip>
    <Chip x={990} y={740} w={820} h={96} t0={S(6, 7)} col={C.red} s={26}>PETROL ↑ → ENFLASYON ↑ → FED'İN İŞİ ZOR</Chip>
    <Src>CNBC, Bloomberg, Business Times, Tradingeconomics • 12–13 Kasım 2026</Src>
  </Shell>
);

const Sc8: React.FC = () => (
  <Shell title="Jeopolitik Riskler" sub="Hürmüz, İran ve Ukrayna gündemde">
    <News x={110} y={290} w={820} h={290} t0={S(7, 1)} col={C.red} head="İran: saldırıya uğrarsa savaşı bölgenin dışına taşıyacağını söyledi" src="Al Jazeera • 12 Kasım" hs={38} />
    <News x={990} y={290} w={820} h={290} t0={S(7, 2)} col={C.gold} head="İsrail'in olası saldırılar için hazırlıklarını artırdığı bildirildi" src="Al Jazeera • 12 Kasım" hs={38} />
    <News x={110} y={620} w={820} h={290} t0={S(7, 3)} col={C.gold} head="ABD, İran'ın Qeshm Adası'na sınırlı saldırılar düzenledi" src="Barchart/Nasdaq • 12 Kasım" hs={38} />
    <News x={990} y={620} w={820} h={290} t0={S(7, 4)} col={C.green} head="Rusya–Ukrayna Abu Dabi görüşmeleri esir takasıyla sonuçlandı, sürecek" src="Bastille Post • 12 Kasım" hs={38} />
    <Src>Al Jazeera, Barchart/Nasdaq, Bastille Post • 12 Kasım 2026</Src>
  </Shell>
);

const Sc9: React.FC = () => {
  const {p} = useTL();
  return (
    <Shell title="Bitcoin" sub="19 Ağustos'tan beri en düşük seviye">
      <Tx x={110} y={270} s={170} wt={900} c={C.red} glow={C.red} ls={-5} o={p(S(8, 1) - 0.2, 0.4)}>&lt;69.000 $</Tx>
      <Arrow x={880} y={600} size={170} color={C.red} up={false} bounce={16} o={p(S(8, 1) + 0.3, 0.4)} />
      <Tx x={110} y={460} w={700} s={34} wt={700} c={C.grey} o={p(S(8, 1) + 0.5, 0.4)}>19 Ağustos'tan bu yana en düşük seviye</Tx>
      <Stat x={110} y={560} w={720} h={200} t0={S(8, 2)} col={C.red} label="TASFİYE EDİLEN POZİSYON" value="≈1,2 milyar $" vs={64} />
      <Chip x={110} y={800} w={720} h={96} t0={S(8, 3)} col={C.gold} s={26}>ETF ÇIKIŞLARI • GÜÇLÜ DOLAR • FED BEKLENTİSİ</Chip>
      <News x={990} y={290} w={820} h={330} t0={S(8, 4)} col={C.gold} head="MSCI, Strategy'yi 30 Kasım'da MSCI USA endeksinden çıkaracak" src="Altcoin Buzz • 13 Kasım" hs={42} />
      <Src>Altcoin Buzz, Schwab • 12–13 Kasım 2026</Src>
    </Shell>
  );
};

const Sc10: React.FC = () => {
  const {p} = useTL();
  const base = 860, k = 17;
  const groups = [{y: '2026', o: 28, n: 29.5, t0: S(9, 2)}, {y: '2027', o: 15, n: 21, t0: S(9, 3)}, {y: '2028', o: 9, n: 13.5, t0: S(9, 3) + 1.4}, {y: '2029', o: 0, n: 9, t0: S(9, 4)}];
  return (
    <Shell title="TCMB Enflasyon Raporu" sub="Yıl sonu enflasyon tahminleri yukarı çekildi">
      <Chip x={110} y={250} w={330} h={52} t0={0.4} col={C.grey} s={22}>ESKİ (AĞUSTOS)</Chip>
      <Chip x={470} y={250} w={330} h={52} t0={0.6} col={C.gold} s={22}>YENİ (KASIM)</Chip>
      <div style={{position: 'absolute', left: 110, top: base, width: 920 * p(0.5, 0.6), height: 4, background: C.line, borderRadius: 2}} />
      {groups.map((g, i) => {
        const x = 140 + i * 225; const q = p(g.t0, 0.8);
        return (
          <React.Fragment key={g.y}>
            {g.o > 0 && <VBar x={x} base={base} w={80} h={g.o * k * q} color={C.grey} />}
            <VBar x={x + 90} base={base} w={80} h={g.n * k * q} color={C.gold} />
            {g.o > 0 && <Tx x={x - 20} y={base - g.o * k * q - 46} w={120} s={26} wt={800} c={C.grey} o={clamp(q * 3)} style={{textAlign: 'center'}}>{'%' + fmt(g.o * q, 0)}</Tx>}
            <Tx x={x + 60} y={base - g.n * k * q - 50} w={140} s={32} wt={900} glow={C.gold} o={clamp(q * 3)} style={{textAlign: 'center'}}>{'%' + fmt(g.n * q, g.n % 1 ? 1 : 0)}</Tx>
            <Tx x={x - 10} y={base + 14} w={190} s={28} wt={700} c={C.grey} o={p(g.t0 - 0.1, 0.3)} style={{textAlign: 'center'}}>{g.y + (g.o === 0 ? ' (yeni)' : '')}</Tx>
          </React.Fragment>
        );
      })}
      <News x={1090} y={290} w={720} h={250} t0={S(9, 2)} col={C.gold} head="TCMB 2026 yıl sonu enflasyon tahminini %28'den %29,5'e yükseltti" src="TCMB, Dünya, DW Türkçe • 12 Kasım" hs={36} />
      <Chip x={1090} y={590} w={720} h={90} t0={S(9, 5)} col={C.red} s={24}>DÜŞÜŞ SÜRÜYOR AMA ENERJİ YAVAŞLATTI</Chip>
      <Chip x={1090} y={710} w={720} h={90} t0={S(9, 6)} col={C.red} s={24}>PETROL FİYATI VARSAYIMI YUKARI ÇEKİLDİ</Chip>
      <Src>TCMB Enflasyon Raporu 2026-IV, Integral Yatırım, Dünya • 12 Kasım 2026</Src>
    </Shell>
  );
};

const Sc11: React.FC = () => {
  const {p, count} = useTL();
  return (
    <Shell title="Borsa İstanbul ve Kurlar" sub="BIST 100 dün güçlü kapandı">
      <Label x={110} y={250} c={C.grey}>BIST 100 • DÜN KAPANIŞ</Label>
      <Tx x={110} y={290} s={190} wt={900} glow={C.green} ls={-5} o={p(S(10, 1) - 0.2, 0.3)}>{count(S(10, 1), 1.4, 11000, 11811, 0, '11.811')}</Tx>
      <Tx x={110} y={500} s={100} wt={900} c={C.green} glow={C.green} o={p(S(10, 1) + 0.6, 0.3)}>{'+%' + fmt(1.24 * p(S(10, 1) + 0.6, 1.0), 2)}</Tx>
      <Chip x={110} y={640} w={820} h={84} t0={S(10, 2)} col={C.gold} s={26}>15 EKİM'DEN BERİ EN YÜKSEK KAPANIŞ</Chip>
      <Chip x={110} y={750} w={820} h={84} t0={S(10, 3)} col={C.green} s={26}>GÜN İÇİ ZİRVE: 11.898</Chip>
      <Stat x={990} y={280} w={400} h={220} t0={S(10, 4)} col={C.red} label="DOLAR / TL" value="≈50,30" vs={60} />
      <Stat x={1410} y={280} w={400} h={220} t0={S(10, 4) + 0.6} col={C.gold} label="GRAM ALTIN" value="≈6.320 TL" vs={46} />
      <Card x={990} y={540} w={820} h={230} t0={S(10, 5)} accent={C.gold}>
        <Label x={36} y={30} o={1}>BUGÜN 10:00 • TÜRKİYE</Label>
        <Tx x={36} y={70} w={750} s={34} wt={800} lh={1.15}>Cari denge (Eylül) ve TCMB Piyasa Katılımcıları Anketi</Tx>
        <Tx x={36} y={158} w={750} s={26} wt={600} c={C.grey}>Cari denge beklentisi: ≈+2,5 milyar $ (önceki +4,05)</Tx>
      </Card>
      <Chip x={990} y={800} w={820} h={96} t0={S(10, 8)} col={C.gold} s={24}>ARALIK'TA TCMB'DEN İNDİRİM BEKLENİYOR • ENERJİ RİSKİ</Chip>
      <Src>Endeks24, Borsamatik, Halk Yatırım, Şeker Yatırım • 12–13 Kasım 2026</Src>
    </Shell>
  );
};


const Bar: React.FC<{y: number; t0: number; name: string; val: number; max: number; txt: string; note?: string; col: string}> = ({y, t0, name, val, max, txt, note, col}) => {
  const {p} = useTL();
  const w = 400 * (val / max) * p(t0, 0.9);
  return (
    <div style={{opacity: p(t0, 0.3)}}>
      <Tx x={36} y={y} w={210} s={28} wt={800}>{name}</Tx>
      <div style={{position: 'absolute', left: 250, top: y + 4, width: Math.max(6, w), height: 36, borderRadius: 10, background: `linear-gradient(90deg, ${col}aa, ${col})`, boxShadow: `0 0 24px ${col}66`}} />
      <Tx x={250 + Math.max(6, w) + 14} y={y + 2} w={300} s={30} wt={900} c={col}>{txt}</Tx>
      {note && <Tx x={250} y={y + 48} w={520} s={20} wt={600} c={C.grey}>{note}</Tx>}
    </div>
  );
};

const ScRez: React.FC = () => {
  const P = 4; const T = (si: number) => R(P, si);
  return (
    <Shell title="Altının Sessiz Alıcıları" sub="Merkez bankaları rezervlerini artırmaya devam ediyor">
      <Stat x={110} y={290} w={820} h={300} t0={T(1)} col={C.gold} label="MERKEZ BANKASI ALIMI • 3. ÇEYREK" value="321 ton" sub="geçen yıla göre +%42 • 2024 4Ç'den beri en yüksek" vs={130} />
      <Stat x={110} y={620} w={820} h={290} t0={T(3)} col={C.green} label="YILBAŞINDAN BERİ (İLK 9 AY)" value="675 ton" sub="2025'in alım hızının üzerinde" vs={120} />
      <Card x={990} y={290} w={820} h={430} t0={T(4)} accent={C.gold}>
        <Label x={36} y={26} o={1}>ALTIN REZERVİ (TON)</Label>
        <Bar y={76} t0={T(5)} name="ÇİN" val={2435} max={2435} txt="2.435" note="ekimde +26 ton • 24 aydır alıyor" col={C.gold} />
        <Bar y={168} t0={T(6)} name="POLONYA" val={700} max={2435} txt="700" note="700 ton hedefine ulaştı" col={C.green} />
        <Bar y={260} t0={T(7)} name="ÖZBEKİSTAN" val={453} max={2435} txt="453" col={C.green} />
        <Bar y={332} t0={T(7) + 0.6} name="ÇEKYA" val={90} max={2435} txt="90" col={C.green} />
      </Card>
      <Chip x={990} y={750} w={820} h={76} t0={T(8)} col={C.red} s={26}>RUSYA: 3. ÇEYREKTE -19 TON (SATIŞ)</Chip>
      <Chip x={990} y={840} w={820} h={76} t0={T(9)} col={C.red} s={26}>TÜRKİYE: OCAK–AĞUSTOS NET SATIŞ ≈ -82 TON</Chip>
      <Src>Dünya Altın Konseyi (WGC), Kitco, IMF • 3 Kasım – 10 Kasım 2026</Src>
    </Shell>
  );
};

const ScBond: React.FC = () => {
  const P = 5; const T = (si: number) => R(P, si);
  return (
    <Shell title="Tahvil Piyasası" sub="Faizler yükseldi, 30 yıllık ihalede talep zayıf kaldı">
      <Stat x={110} y={290} w={820} h={300} t0={T(1)} col={C.red} label="ABD 10 YILLIK • DÜN KAPANIŞ" value="≈%5,10" sub="yüzde 5'in üzerine çıktı" vs={130} />
      <Stat x={110} y={620} w={400} h={240} t0={T(2)} col={C.gold} label="2 YILLIK" value="%4,86" vs={84} />
      <Stat x={530} y={620} w={400} h={240} t0={T(2) + 0.6} col={C.gold} label="30 YILLIK" value="%5,43" vs={84} />
      <Chip x={110} y={875} w={820} h={66} t0={T(5)} col={C.red} s={22}>BU HAFTA 3–10–30 YILLIK İHALELER ZAYIF</Chip>
      <Stat x={990} y={290} w={820} h={300} t0={T(3)} col={C.red} label="30 YILLIK İHALE • 25 MİLYAR $" value="%5,441" sub="ihale faizi" vs={120} />
      <Stat x={990} y={620} w={820} h={220} t0={T(4)} col={C.red} label="TEKLİF KARŞILAMA ORANI" value="2,36" sub="Haziran'dan bu yana en zayıf talep" vs={72} />
      <Chip x={990} y={860} w={400} h={80} t0={T(6)} col={C.gold} s={22}>JAPONYA 10Y: %2,83</Chip>
      <Chip x={1410} y={860} w={400} h={80} t0={T(6) + 0.8} col={C.gold} s={22}>TÜRKİYE 10Y: ≈%33</Chip>
      <Src>TreasuryDirect, CNBC, Tradeweb, Investing.com • 12 Kasım 2026</Src>
    </Shell>
  );
};

const SCENES = [Sc1, Sc2, Sc3, Sc4, ScRez, ScBond, Sc5, Sc6, Sc7, Sc8, Sc9, Sc10, Sc11];

const TICK = [
  ['ALTIN', '≈3.890 $', '▼', C.red], ['S&P 500', '-%0,35', '▼', C.red], ['DOW JONES', '-%0,36', '▼', C.red], ['NIKKEI', '+%1,48', '▲', C.green], ['KOSPI', '+%1,97', '▲', C.green],
  ['BRENT', '≈95,8 $', '', C.gold], ['WTI', '≈88,7 $', '', C.gold], ['BITCOIN', '<69 BİN $', '▼', C.red], ['DXY', '≈103', '▲', C.green], ['ABD 10Y', '%5,13', '▲', C.red],
  ['BIST 100', '11.811', '▲', C.green], ['DOLAR/TL', '≈50,3', '', C.white],
];
const TickerX: React.FC<{total: number}> = ({total}) => {
  const f = useCurrentFrame();
  const IW = 440, CW = IW * TICK.length;
  const x = -((f * 2.4) % CW);
  const row = (k: number) => TICK.map(([n, v, a, col], i) => (
    <div key={k + '-' + i} style={{width: IW, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontFamily: FONT, fontSize: 26, fontWeight: 700, color: C.grey, letterSpacing: 1}}>
      <span style={{fontWeight: 800}}>{n}</span><span style={{color: col as string, fontWeight: 900}}>{v} {a}</span><span style={{color: C.line}}>|</span>
    </div>));
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

export const Gun2Video: React.FC = () => (
  <>
    <Bg total={GUN2_TOTAL} />
    {SCENES.map((Sc, i) => {
      const from = fr(paras[i].start); const to = i + 1 < paras.length && i + 1 < SCENES.length ? fr(paras[i + 1].start) : fr(paras[i].end);
      return <Sequence key={i} from={from} durationInFrames={Math.max(1, to - from)}><Sc /></Sequence>;
    })}
    <TickerX total={GUN2_TOTAL} />
  </>
);
