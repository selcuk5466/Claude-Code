import React from 'react';
import {Arrow, C, Card, FONT, Label, Pill, Shell, Tx, clamp, fmt, useTL} from './ui';

const VBar: React.FC<{x: number; base: number; w: number; h: number; color: string; o?: number}> = ({x, base, w, h, color, o = 1}) => (
  <div style={{position: 'absolute', left: x, top: base - h, width: w, height: Math.max(0, h), borderRadius: '20px 20px 0 0', opacity: o,
    background: `linear-gradient(180deg, ${color}, ${color}99)`, boxShadow: `0 0 55px ${color}66, inset 0 2px 0 rgba(255,255,255,.35)`}} />
);
const HBar: React.FC<{x: number; y: number; w: number; h: number; color: string; left?: boolean}> = ({x, y, w, h, color, left}) => (
  <div style={{position: 'absolute', left: left ? x - w : x, top: y, width: Math.max(0, w), height: h, borderRadius: left ? '18px 0 0 18px' : '0 18px 18px 0',
    background: `linear-gradient(${left ? 270 : 90}deg, ${color}99, ${color})`, boxShadow: `0 0 45px ${color}66, inset 0 2px 0 rgba(255,255,255,.3)`}} />
);
const Track: React.FC<{x: number; y: number; w: number; h: number; o?: number}> = ({x, y, w, h, o = 1}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: h / 2, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.08)', opacity: o}} />
);
const Stat: React.FC<{x: number; y: number; w: number; h: number; t0: number; accent: string; label: string; value: string; vs?: number; sub?: string; arrow?: 'up' | 'down'; ac?: string}> =
  ({x, y, w, h, t0, accent, label, value, vs = 100, sub, arrow, ac}) => {
    const {p} = useTL(); const a = p(t0 + 0.1, 0.4);
    return (
      <Card x={x} y={y} w={w} h={h} t0={t0} accent={accent}>
        <Label x={36} y={44} o={a}>{label}</Label>
        <Tx x={36} y={104} s={vs} wt={900} o={a} glow={accent} ls={-2}>{value}</Tx>
        {sub && <Tx x={36} y={h - 130} w={w - 72} s={30} c={C.grey} wt={500} o={a}>{sub}</Tx>}
        {arrow && <Arrow x={w - 100} y={h - 230} size={120} color={ac || accent} up={arrow === 'up'} o={a} bounce={14} />}
      </Card>
    );
  };

// ---------------------------------------------------------------- 1
export const S1: React.FC = () => {
  const {t, p, pop} = useTL();
  const shake = t > 1.5 && t < 2.6 ? Math.sin(t * 90) * 8 * (1 - (t - 1.5) / 1.1) : 0;
  const coinY = 330 + 190 * Math.min(1, pop(2.4)) + (t > 2.4 ? 0 : -500);
  return (
    <Shell>
      <div style={{position: 'absolute', inset: 0, background: `radial-gradient(circle at 70% 45%, rgba(240,91,102,${0.38 * (1 - p(0, 1.2))}), rgba(240,91,102,0) 60%)`}} />
      <Pill x={110} y={215} w={380} h={68} bg={C.gold} c="#07142a" s={30} scale={pop(0.1)}>12 KASIM 2026</Pill>
      <Tx x={110 - 120 * (1 - p(0.4, 0.6))} y={330} s={116} wt={900} o={p(0.4, 0.5)} ls={-3}>PİYASALARDA</Tx>
      <Tx x={110 - 120 * (1 - p(0.75, 0.6))} y={440} s={175} wt={900} o={p(0.75, 0.5)} ls={-4} c={C.gold2} glow={C.gold}>BUGÜN</Tx>
      <div style={{position: 'absolute', left: 110, top: 655, width: 440 * p(1.2, 0.8), height: 9, borderRadius: 5, background: `linear-gradient(90deg, ${C.gold2}, ${C.gold})`, boxShadow: `0 0 26px ${C.gold}`}} />
      <Tx x={110} y={695} s={46} wt={600} c={C.grey} o={p(1.6, 0.6)}>Altın 4.000 doların altına indi.</Tx>
      <Card x={1040} y={240} w={770} h={700} t0={0.7} accent={C.red}>
        <Label x={44} y={46} o={p(1.0, 0.4)}>ALTIN (ONS)</Label>
        <Tx x={44 + shake} y={100} s={190} wt={900} o={p(1.2, 0.4)} ls={-6} glow={C.red}>4.000 $</Tx>
        <Tx x={44} y={300} s={96} wt={900} c={C.red} o={p(1.9, 0.4)} glow={C.red}>altında</Tx>
        <div style={{position: 'absolute', left: 560, top: coinY - 240, width: 110, height: 110, borderRadius: '50%', opacity: p(2.4, 0.2),
          background: `radial-gradient(circle at 35% 30%, #fff1b8, ${C.gold} 55%, #8a6a22)`, boxShadow: `0 0 40px ${C.gold}99`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 60, color: '#6b4d10'}}>$</div>
        {[0, 1, 2].map((i) => <Arrow key={i} x={90 + i * 120} y={560} size={86} color={C.red} up={false} o={p(3.0 + i * 0.7, 0.35)} bounce={6} />)}
        <Tx x={44} y={620} s={34} wt={800} c={C.gold} o={p(5.0, 0.5)}>3 işlem günü üst üste düşüş</Tx>
      </Card>
    </Shell>
  );
};

// ---------------------------------------------------------------- 2
export const S2: React.FC = () => {
  const {t, p, pop, count} = useTL();
  const base = 880, sc = 1000;
  const bars = [{lab: 'Beklenti', v: 0.3, col: C.gold, t0: 0.9}, {lab: 'Gerçekleşen', v: 0.4, col: C.red, t0: 1.9}];
  return (
    <Shell title="ABD Ekim Enflasyonu" sub="Aylık TÜFE beklentiyi aştı">
      <div style={{position: 'absolute', left: 130, top: base, width: 960 * p(0.4, 0.7), height: 4, background: C.line, borderRadius: 2}} />
      {bars.map((b, i) => {
        const q = p(b.t0, 0.9); const h = b.v * sc * q; const x = 260 + i * 400;
        return (
          <React.Fragment key={i}>
            <VBar x={x} base={base} w={260} h={h} color={b.col} />
            <Tx x={x + 130} y={base - h - 76} w={260} align="center" s={60} wt={900} o={clamp(q * 3)} glow={b.col}>{fmt(b.v * q, 1, '%')}</Tx>
            <Tx x={x + 130} y={base + 22} w={300} align="center" s={34} wt={600} c={C.grey} o={p(b.t0 - 0.2, 0.4)}>{b.lab}</Tx>
          </React.Fragment>
        );
      })}
      <Pill x={130} y={238} w={600} h={64} bg="rgba(214,173,82,.18)" c={C.gold2} s={26} scale={1 + 0.03 * Math.sin(t * 5)} o={p(5.0, 0.5)}>ÜST ÜSTE 3. AY • TÜFE ≥ %0,4</Pill>
      <Card x={1180} y={270} w={640} h={280} t0={2.9} accent={C.gold}>
        <Label x={40} y={40}>ENFLASYON SÜRPRİZİ</Label>
        <Tx x={40} y={96} s={120} wt={900} c={C.red} glow={C.red} ls={-3}>{'+' + fmt(0.1 * p(3.2, 0.8), 1) + ' puan'}</Tx>
      </Card>
      <Card x={1180} y={590} w={640} h={290} t0={3.7} accent={C.gold}>
        <Label x={40} y={40}>ÇEKİRDEK ENFLASYON</Label>
        <Tx x={40} y={90} s={120} wt={900} c={C.red} glow={C.red} ls={-3}>%0,3</Tx>
        <Tx x={40} y={220} s={34} wt={600} c={C.grey}>beklenti %0,2</Tx>
      </Card>
    </Shell>
  );
};

// ---------------------------------------------------------------- 3
export const S3: React.FC = () => {
  const {p, raw} = useTL();
  const rows = [{lab: '25 baz puan artış', v: 100, col: C.gold, t0: 0.9, fin: '%100'}, {lab: '50 baz puan artış', v: 13, col: C.red, t0: 2.0, fin: '≈%13'}];
  return (
    <Shell title="Fed Aralık Toplantısı" sub="8–9 Aralık toplantısında faiz artışı fiyatlandı">
      {rows.map((r, i) => {
        const y = 270 + i * 190; const q = p(r.t0, 1.2);
        return (
          <React.Fragment key={i}>
            <Tx x={110} y={y} s={40} wt={800} o={p(r.t0 - 0.3, 0.4)}>{r.lab}</Tx>
            <Track x={110} y={y + 64} w={1200} h={72} />
            <div style={{position: 'absolute', left: 110, top: y + 64, width: 1200 * (r.v / 100) * q, height: 72, borderRadius: 36, background: `linear-gradient(90deg, ${r.col}88, ${r.col})`, boxShadow: `0 0 50px ${r.col}77, inset 0 2px 0 rgba(255,255,255,.35)`}} />
            <Tx x={1350} y={y + 56} s={78} wt={900} c={r.col} glow={r.col} o={clamp(q * 4)}>{q >= 1 ? r.fin : '%' + Math.round(r.v * q)}</Tx>
          </React.Fragment>
        );
      })}
      {[{who: 'WALLER', txt: 'Çekirdek enflasyon %0,3 gelirse yarım puanlık artışı düşüneceğini söylemişti', t0: 4.0}, {who: 'LOGAN', txt: 'En az iki çeyrek puanlık artış daha gerektiğini söyledi', t0: 5.2}].map((q, i) => (
        <Card key={i} x={110 + i * 880} y={680} w={830} h={270} t0={q.t0} accent={C.gold}>
          <Tx x={40} y={34} s={110} wt={900} c={C.gold + '55'} lh={0.9}>“</Tx>
          <Label x={140} y={48} c={C.gold}>{q.who}</Label>
          <Tx x={40} y={120} w={750} s={36} wt={600}>{q.txt}</Tx>
        </Card>
      ))}
    </Shell>
  );
};

// ---------------------------------------------------------------- 4
export const S4: React.FC = () => {
  const {count} = useTL();
  const specs = [
    {lab: 'ABD 10 YILLIK TAHVİL FAİZİ', v0: 4.0, v1: 4.99, dec: 2, fin: '%4,99', pre: '%', col: C.red, up: true, sub: 'Yeniden %5’e yaklaştı'},
    {lab: 'DOLAR ENDEKSİ (DXY)', v0: 100, v1: 102.8, dec: 1, fin: '102,8', pre: '', col: C.green, up: true, sub: '4 haftanın zirvesine yakın'},
    {lab: 'EUR/USD', v0: 1.118, v1: 1.1117, dec: 4, fin: '≈1,11', pre: '', col: C.red, up: false, sub: 'USD/JPY ≈158'},
  ];
  return (
    <Shell title="Tahvil ve Dolar" sub="Enflasyon verisi sonrası faiz ve dolar yükseldi">
      {specs.map((s, i) => {
        const t0 = 0.8 + i * 0.7;
        return <Stat key={i} x={110 + i * 580} y={270} w={530} h={620} t0={t0} accent={s.col} label={s.lab} vs={108} arrow={s.up ? 'up' : 'down'}
          value={count(t0 + 0.2, 1.4, s.v0, s.v1, s.dec, s.fin, s.pre)} sub={s.sub} />;
      })}
    </Shell>
  );
};

// ---------------------------------------------------------------- 5
export const S5: React.FC = () => {
  const {t, p, pop} = useTL();
  const items = [{lab: 'Faiz artışı\nbeklentisi', col: C.gold, up: true, t0: 0.9}, {lab: 'Güçlü dolar', col: C.green, up: true, t0: 2.6}, {lab: 'Altında satış', col: C.red, up: false, t0: 4.3}];
  const coin = pop(4.8);
  return (
    <Shell title="Altın Neden Düştü?" sub="Faiz artışı beklentisi ve güçlü dolar altını aşağı çekti">
      {items.map((it, i) => {
        const x = 110 + i * 610;
        return (
          <React.Fragment key={i}>
            <Card x={x} y={290} w={510} h={330} t0={it.t0} accent={it.col}>
              <Arrow x={255} y={120} size={110} color={it.col} up={it.up} bounce={10} o={p(it.t0 + 0.2, 0.4)} />
              <Tx x={255} y={215} w={470} align="center" s={46} wt={800} o={p(it.t0 + 0.2, 0.4)}>{it.lab}</Tx>
            </Card>
            {i < 2 && (
              <svg width={100} height={60} style={{position: 'absolute', left: x + 515, top: 425}}>
                <line x1={0} y1={30} x2={72 * p(it.t0 + 0.9, 0.5)} y2={30} stroke={C.grey} strokeWidth={8} strokeLinecap="round" strokeDasharray="14 10" strokeDashoffset={-t * 40} />
                <polygon points="68,8 98,30 68,52" fill={C.grey} opacity={p(it.t0 + 1.3, 0.2)} />
              </svg>
            )}
          </React.Fragment>
        );
      })}
      <div style={{position: 'absolute', left: 1745, top: 330 + (1 - Math.min(1.08, coin)) * -520, width: 90, height: 90, borderRadius: '50%', opacity: p(4.8, 0.2),
        background: `radial-gradient(circle at 35% 30%, #fff1b8, ${C.gold} 55%, #8a6a22)`, boxShadow: `0 0 36px ${C.gold}99`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 46, color: '#6b4d10'}}>$</div>
      <Tx x={960} y={700} w={1500} align="center" s={56} wt={900} o={p(5.6, 0.7)} glow={C.gold}>Yüksek faiz + güçlü dolar = altın için baskı</Tx>
    </Shell>
  );
};

// ---------------------------------------------------------------- 6
export const S6: React.FC = () => {
  const {t, p, pop, count} = useTL();
  const specs = [
    {lab: 'ONS ALTIN', v0: 3600, v1: 3950, fin: '≈3.950 $', pre: '≈', suf: ' $', col: C.red},
    {lab: 'GRAM ALTIN', v0: 5800, v1: 6427, fin: '6.427 TL', pre: '', suf: ' TL', col: C.gold},
    {lab: 'ÇEYREK ALTIN', v0: 9500, v1: 10500, fin: '10.500 TL', pre: '', suf: ' TL', col: C.gold},
  ];
  return (
    <Shell title="Altın Fiyatları" sub="12 Kasım 2026 sabahı • yaklaşık seviyeler">
      {specs.map((s, i) => {
        const t0 = 0.8 + i * 0.5;
        return <Stat key={i} x={110 + i * 580} y={250} w={530} h={240} t0={t0} accent={s.col} label={s.lab} vs={80} value={count(t0 + 0.2, 1.3, s.v0, s.v1, 0, s.fin, s.pre, s.suf)} />;
      })}
      <Tx x={110} y={535} s={36} wt={700} c={C.grey} o={p(2.6, 0.5)}>Rekordan bugüne</Tx>
      {[{lab: 'Rekor (Ocak 2026): 5.608 $', v: 5608, col: C.gold, t0: 2.8}, {lab: 'Bugün: ≈3.950 $', v: 3950, col: C.red, t0: 3.6}].map((r, i) => {
        const y = 595 + i * 150;
        return (
          <React.Fragment key={i}>
            <Tx x={110} y={y} s={38} wt={800} o={p(r.t0 - 0.2, 0.4)}>{r.lab}</Tx>
            <Track x={110} y={y + 56} w={1380} h={64} />
            <div style={{position: 'absolute', left: 110, top: y + 56, width: 1380 * (r.v / 5608) * p(r.t0, 1.2), height: 64, borderRadius: 32, background: `linear-gradient(90deg, ${r.col}88, ${r.col})`, boxShadow: `0 0 50px ${r.col}77, inset 0 2px 0 rgba(255,255,255,.3)`}} />
          </React.Fragment>
        );
      })}
      <div style={{position: 'absolute', left: 1540, top: 650, width: 280, height: 170, borderRadius: 28, background: `linear-gradient(145deg, ${C.red}, #b73a49)`, boxShadow: `0 0 60px ${C.red}88`, opacity: p(5.2, 0.4), transform: `scale(${0.7 + 0.3 * pop(5.2)})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 60, whiteSpace: 'nowrap', color: C.white}}>≈ -%30</div>
    </Shell>
  );
};

// ---------------------------------------------------------------- 7
export const S7: React.FC = () => {
  const {p, pop} = useTL();
  const ax0 = 200, ax1 = 1720, ay = 620;
  const X = (v: number) => ax0 + ((v - 3800) / 1000) * (ax1 - ax0);
  const dot = (v: number, col: string, o: number) => <div style={{position: 'absolute', left: X(v) - 24, top: ay - 24, width: 48, height: 48, borderRadius: '50%', background: col, boxShadow: `0 0 36px ${col}`, opacity: o, transform: `scale(${0.4 + 0.6 * o})`}} />;
  return (
    <Shell title="Analistler Ne Diyor?" sub="İki zıt görüş yan yana">
      <div style={{position: 'absolute', left: ax0, top: ay - 4, width: (ax1 - ax0) * p(0.6, 0.8), height: 8, borderRadius: 4, background: C.line}} />
      {[3800, 4000, 4200, 4400, 4600, 4800].map((v) => <Tx key={v} x={X(v)} y={ay + 30} w={120} align="center" s={26} wt={600} c={C.grey} o={p(0.8, 0.5)}>{fmt(v)}</Tx>)}
      {dot(3950, C.white, p(1.4, 0.4))}
      <Tx x={X(3950)} y={ay + 78} w={400} align="center" s={34} wt={800} o={p(1.6, 0.4)}>Bugün ≈3.950 $</Tx>
      {dot(3900, C.red, p(2.6, 0.4))}
      <Card x={110} y={290} w={720} h={210} t0={2.6} accent={C.red}>
        <Tx x={360} y={34} w={720} align="center" s={24} wt={800} c={C.red} ls={2.5}>TD SECURITIES</Tx>
        <Tx x={360} y={74} w={720} align="center" s={82} wt={900} glow={C.red}>3.900 $</Tx>
        <Tx x={360} y={168} w={720} align="center" s={28} wt={500} c={C.grey}>destek bölgesine inebilir</Tx>
      </Card>
      <div style={{position: 'absolute', left: X(3950), top: ay - 3, width: (X(4650) - X(3950)) * p(4.4, 0.9), height: 6, borderRadius: 3, background: `linear-gradient(90deg, ${C.white}, ${C.green})`, boxShadow: `0 0 18px ${C.green}`}} />
      {dot(4650, C.green, p(5.2, 0.4))}
      <Card x={X(4650) - 520} y={700} w={720} h={230} t0={4.6} accent={C.green}>
        <Label x={40} y={34} c={C.green}>STANDARD CHARTERED</Label>
        <Tx x={40} y={80} s={86} wt={900} glow={C.green}>4.650 $</Tx>
        <Tx x={40} y={176} s={30} wt={500} c={C.grey}>yıl sonu hedefi</Tx>
      </Card>
    </Shell>
  );
};

// ---------------------------------------------------------------- 8
export const S8: React.FC = () => {
  const {count} = useTL();
  return (
    <Shell title="Gümüş ve Paladyum" sub="Değerli madenlerde dolar baskısı belirleyici">
      <Stat x={110} y={270} w={860} h={640} t0={0.8} accent={C.red} label="GÜMÜŞ" vs={150} arrow="down" value={count(1.0, 1.3, 55, 51, 0, '≈51 $', '≈', ' $')} sub="bugün yaklaşık -%2" />
      <Stat x={1010} y={270} w={800} h={640} t0={1.6} accent={C.green} label="PALADYUM" vs={150} arrow="up" value={count(1.8, 1.3, 0, 5.2, 1, '+%5,2', '+%')} sub="Çarşamba günü • ≈1.078 $" />
    </Shell>
  );
};

// ---------------------------------------------------------------- 9
export const S9: React.FC = () => {
  const {p, count} = useTL();
  const base = 640, k = 150;
  const groups = [{n: 'Dow Jones', v: [-0.30, 0.49]}, {n: 'S&P 500', v: [-0.38, 1.31]}, {n: 'Nasdaq', v: [-0.74, 1.60]}];
  const lv = [['S&P 500', 7400, 7619, '7.619'], ['Nasdaq', 25000, 25466, '25.466'], ['Dow Jones', 52000, 52486, '52.486']] as const;
  return (
    <Shell title="ABD Borsası" sub="10 ve 11 Kasım kapanışları • günlük değişim">
      <div style={{position: 'absolute', left: 120, top: base - 2, width: 1060 * p(0.4, 0.6), height: 4, background: C.line, borderRadius: 2}} />
      {groups.map((g, gi) => (
        <React.Fragment key={gi}>
          <Tx x={190 + gi * 340 + 100} y={845} w={300} align="center" s={34} wt={800} o={p(0.6 + gi * 0.3, 0.4)}>{g.n}</Tx>
          {g.v.map((v, bi) => {
            const t0 = 1.0 + gi * 0.5 + bi * 0.25; const q = p(t0, 0.8); const h = Math.abs(v) * k * q;
            const x = 190 + gi * 340 + bi * 120; const col = v > 0 ? C.green : C.red;
            return (
              <React.Fragment key={bi}>
                {v > 0 ? <VBar x={x} base={base} w={100} h={h} color={col} /> :
                  <div style={{position: 'absolute', left: x, top: base, width: 100, height: h, borderRadius: '0 0 20px 20px', background: `linear-gradient(0deg, ${col}, ${col}99)`, boxShadow: `0 0 50px ${col}66`}} />}
                <Tx x={x - 20} y={v > 0 ? base - h - 50 : base + h + 10} w={140} align="center" s={30} wt={900} o={clamp(q * 3)}>{(v > 0 ? '+' : '-') + fmt(Math.abs(v) * q, 2, '%')}</Tx>
                <Tx x={x} y={805} w={100} align="center" s={22} wt={700} c={C.grey} o={p(t0, 0.4)}>{bi === 0 ? 'Salı' : 'Çar.'}</Tx>
              </React.Fragment>
            );
          })}
        </React.Fragment>
      ))}
      <Card x={1230} y={270} w={590} h={640} t0={3.8} accent={C.gold}>
        <Label x={36} y={40}>11 KASIM KAPANIŞ</Label>
        {lv.map(([n, v0, v1, fin], i) => (
          <React.Fragment key={i}>
            <Tx x={36} y={110 + i * 170} s={28} wt={600} c={C.grey}>{n}</Tx>
            <Tx x={36} y={148 + i * 170} s={74} wt={900} glow={C.green}>{count(4.0 + i * 0.3, 1.2, v0, v1, 0, fin)}</Tx>
          </React.Fragment>
        ))}
      </Card>
    </Shell>
  );
};

// ---------------------------------------------------------------- 10
export const S10: React.FC = () => {
  const {t, p} = useTL();
  const frac = 7619 / 7818; const q = p(3.3, 1.6);
  return (
    <Shell title="Yapay Zeka Rallisi" sub="CoreWeave geliri beklentiyi aştı">
      <Tx x={110 - 100 * (1 - p(0.6, 0.6))} y={250} s={140} wt={900} c={C.green} glow={C.green} o={p(0.6, 0.5)} ls={-4}>BEKLENTİ</Tx>
      <Tx x={110 - 100 * (1 - p(1.0, 0.6))} y={395} s={140} wt={900} c={C.green} glow={C.green} o={p(1.0, 0.5)} ls={-4}>AŞILDI</Tx>
      <Arrow x={1560} y={400} size={260} color={C.green} up bounce={18} o={p(1.4, 0.5)} />
      <Tx x={110} y={650} s={40} wt={800} o={p(3.0, 0.5)}>S&P 500 rekorun ne kadar altında?</Tx>
      <Track x={110} y={715} w={1700} h={64} o={p(3.0, 0.5)} />
      <div style={{position: 'absolute', left: 110, top: 715, width: 1700 * frac * q, height: 64, borderRadius: 32, background: `linear-gradient(90deg, ${C.green}88, ${C.green})`, boxShadow: `0 0 55px ${C.green}77, inset 0 2px 0 rgba(255,255,255,.3)`}} />
      <Tx x={110} y={800} s={36} wt={800} c={C.green} o={p(3.8, 0.4)}>Bugün 7.619</Tx>
      <Tx x={1810} y={800} w={700} align="right" s={36} wt={800} c={C.gold} o={p(3.8, 0.4)}>Rekor (Ekim) 7.818</Tx>
      <Tx x={960} y={885} w={1500} align="center" s={50} wt={900} o={p(5.2, 0.6)}>Rekora yaklaşık %2,5 uzaklık</Tx>
    </Shell>
  );
};

// ---------------------------------------------------------------- 11
export const S11: React.FC = () => {
  const {p} = useTL();
  const zx = 1250, k = 330;
  const rows = [['DAX (Çar.)', 1.20, '+%1,20'], ['FTSE 100 (Çar.)', 0.78, '+%0,78'], ['CAC 40 (Çar.)', 0.66, '+%0,66'], ['Nikkei (bugün)', -0.70, '-%0,70'], ['Hang Seng (Çar.)', -1.0, '≈ -%1']] as const;
  return (
    <Shell title="Avrupa ve Asya" sub="Avrupa yükseldi, Asya karışık">
      <div style={{position: 'absolute', left: zx - 2, top: 260, width: 4, height: 700 * p(0.4, 0.6), background: C.line, borderRadius: 2}} />
      {rows.map(([lab, v, fin], i) => {
        const y = 270 + i * 134, t0 = 0.9 + i * 0.5, q = p(t0, 0.9), w = Math.abs(v) * k * q; const pos = v > 0; const col = pos ? C.green : C.red;
        return (
          <React.Fragment key={i}>
            <Tx x={110} y={y + 14} s={40} wt={800} o={p(t0 - 0.2, 0.4)}>{lab}</Tx>
            <HBar x={zx} y={y} w={w} h={84} color={col} left={!pos} />
            <Tx x={pos ? zx + w + 20 : zx - w - 20} y={y + 8} w={300} align={pos ? 'left' : 'right'} s={52} wt={900} o={clamp(q * 3)} glow={col}>{q >= 1 ? fin : (pos ? '+%' : '-%') + fmt(Math.abs(v) * q, 2)}</Tx>
          </React.Fragment>
        );
      })}
    </Shell>
  );
};

// ---------------------------------------------------------------- 12
export const S12: React.FC = () => {
  const {count} = useTL();
  const specs = [
    {lab: 'BRENT PETROL', v0: 70, v1: 93, fin: '≈92-93 $', pre: '', suf: ' $', col: C.gold, sub: 'İki aylık dipten toparlandı', up: 'up' as const},
    {lab: 'WTI PETROL', v0: 70, v1: 86, fin: '≈85-86 $', pre: '', suf: ' $', col: C.gold, sub: 'ABD–İran görüşmeleri fiyatı oynatıyor', up: 'up' as const},
    {lab: 'BITCOIN', v0: 60000, v1: 75000, fin: '≈75 bin $', pre: '', suf: ' $', col: C.green, sub: '80 bin $ üzerinde tutunamadı', up: undefined},
  ];
  return (
    <Shell title="Petrol ve Bitcoin" sub="Brent iki aylık dipten toparlandı">
      {specs.map((s, i) => {
        const t0 = 0.8 + i * 0.7;
        return <Stat key={i} x={110 + i * 580} y={270} w={530} h={620} t0={t0} accent={s.col} label={s.lab} vs={i === 2 ? 88 : 100} arrow={s.up}
          value={count(t0 + 0.2, 1.4, s.v0, s.v1, 0, s.fin, s.pre, s.suf)} sub={s.sub} />;
      })}
    </Shell>
  );
};

// ---------------------------------------------------------------- 13
export const S13: React.FC = () => {
  const {p, count} = useTL();
  const specs = [
    {lab: 'BIST 100', v0: 10626, v1: 11666, dec: 0, fin: '11.666', col: C.green, sub: 'Kasım zirvesi 11.820 (gün içi)'},
    {lab: 'DOLAR / TL', v0: 49.85, v1: 50.23, dec: 2, fin: '50,23', col: C.red, sub: 'TCMB bugün enflasyon raporu açıklıyor'},
    {lab: 'EURO / TL', v0: 55.4, v1: 55.8, dec: 2, fin: '55,80', col: C.red, sub: 'Euro/TL ≈55,80'},
  ];
  return (
    <Shell title="BIST 100 ve Kurlar" sub="11 Kasım kapanışı ve güncel kurlar">
      {specs.map((s, i) => {
        const t0 = 0.8 + i * 0.7;
        return <Stat key={i} x={110 + i * 580} y={270} w={530} h={560} t0={t0} accent={s.col} label={s.lab} vs={108} value={count(t0 + 0.2, 1.5, s.v0, s.v1, s.dec, s.fin)} sub={s.sub} />;
      })}
      <Tx x={110} y={880} s={34} wt={700} c={C.gold} o={p(4.0, 0.6)}>BIST 100 • 2 Kasım dip: 10.626</Tx>
    </Shell>
  );
};

// ---------------------------------------------------------------- 14
export const S14: React.FC = () => {
  const {t, p, count} = useTL();
  const base = 880, k = 14;
  const bars = [['2026', 28, C.gold], ['2027', 15, C.green], ['2028', 9, C.green]] as const;
  return (
    <Shell title="TCMB Enflasyon Raporu" sub="Yıl sonu enflasyon tahminleri">
      <div style={{position: 'absolute', left: 130, top: base, width: 1020 * p(0.4, 0.6), height: 4, background: C.line, borderRadius: 2}} />
      {bars.map(([lab, v, col], i) => {
        const t0 = 0.9 + i * 0.6, q = p(t0, 0.9), h = v * k * q, x = 200 + i * 330;
        return (
          <React.Fragment key={i}>
            <VBar x={x} base={base} w={230} h={h} color={col} />
            <Tx x={x} y={base - h - 76} w={230} align="center" s={64} wt={900} o={clamp(q * 3)} glow={col}>{fmt(v * q, 0, '%')}</Tx>
            <Tx x={x} y={base + 22} w={230} align="center" s={34} wt={600} c={C.grey} o={p(t0 - 0.2, 0.4)}>{lab}</Tx>
          </React.Fragment>
        );
      })}
      <Card x={1240} y={260} w={580} h={210} t0={3.0} accent={C.gold}>
        <Label x={36} y={34} c={C.gold} o={0.6 + 0.4 * Math.sin(t * 5)}>BUGÜN 10.30</Label>
        <Tx x={36} y={84} s={76} wt={900}>Yeni tahmin</Tx>
      </Card>
      <Card x={1240} y={500} w={580} h={190} t0={3.8} accent={C.red}>
        <Label x={36} y={30}>EKİM AYLIK ENFLASYON</Label>
        <Tx x={36} y={72} s={92} wt={900} glow={C.red}>{count(4.0, 1.0, 0, 2.58, 2, '%2,58', '%')}</Tx>
      </Card>
      <Card x={1240} y={720} w={580} h={190} t0={4.6} accent={C.red}>
        <Label x={36} y={30}>YILBAŞINDAN BU YANA</Label>
        <Tx x={36} y={72} s={92} wt={900} glow={C.red}>{count(4.8, 1.2, 0, 27.52, 2, '%27,52', '%')}</Tx>
      </Card>
    </Shell>
  );
};

// ---------------------------------------------------------------- 15
export const S15: React.FC = () => {
  const {p} = useTL();
  const panels = [
    {lab: 'FED', col: C.red, up: true, big: '+25 bp', sub: 'Aralık’ta faiz artışı tamamen fiyatlandı', t0: 0.8},
    {lab: 'TCMB', col: C.green, up: false, big: '-150 bp', sub: '10 Aralık’ta indirim bekleniyor • politika faizi %35,5', t0: 1.8},
  ];
  return (
    <Shell title="İki Merkez Bankası, Ters Yönler" sub="Fed artırıyor, TCMB indirim bekleniyor">
      {panels.map((pn, i) => (
        <Card key={i} x={110 + i * 890} y={270} w={830} h={650} t0={pn.t0} accent={pn.col}>
          <Tx x={44} y={44} s={46} wt={900} c={pn.col} ls={2}>{pn.lab}</Tx>
          <Tx x={44} y={130} s={140} wt={900} glow={pn.col} ls={-4} o={p(pn.t0 + 0.3, 0.5)}>{pn.big}</Tx>
          <Arrow x={650} y={360} size={230} color={pn.col} up={pn.up} bounce={22} o={p(pn.t0 + 0.4, 0.5)} />
          <Tx x={44} y={480} w={740} s={38} wt={600} c={C.grey} o={p(pn.t0 + 0.6, 0.5)}>{pn.sub}</Tx>
        </Card>
      ))}
    </Shell>
  );
};

// ---------------------------------------------------------------- 16
export const S16: React.FC = () => {
  const {t, p, pop} = useTL();
  const items = [['MSCI kararı', C.gold, 0.9], ['Fon akımları', C.white, 2.4], ['BIST ve TL', C.green, 3.9]] as const;
  return (
    <Shell title="MSCI ve Türkiye’ye Etki" sub="Küresel faiz yükselişi gelişen piyasalar üzerinde baskı yaratabilir">
      {items.map(([lab, col, t0], i) => {
        const x = 110 + i * 610;
        return (
          <React.Fragment key={i}>
            <Card x={x} y={270} w={510} h={210} t0={t0} accent={col as string}>
              <Tx x={255} y={74} w={510} align="center" s={54} wt={900} c={col as string} glow={col as string}>{lab}</Tx>
            </Card>
            {i < 2 && (
              <svg width={100} height={60} style={{position: 'absolute', left: x + 515, top: 345}}>
                <line x1={0} y1={30} x2={72 * p(t0 + 0.9, 0.5)} y2={30} stroke={C.grey} strokeWidth={8} strokeLinecap="round" strokeDasharray="14 10" strokeDashoffset={-t * 40} />
                <polygon points="68,8 98,30 68,52" fill={C.grey} opacity={p(t0 + 1.3, 0.2)} />
              </svg>
            )}
          </React.Fragment>
        );
      })}
      <Card x={110} y={540} w={1700} h={400} t0={5.4} accent={C.red}>
        <Tx x={44} y={44} s={38} wt={800} c={C.grey}>MSCI standart endeksten çıkardı (1 Aralık’tan itibaren)</Tx>
        {['Sabancı Holding', 'Astor Enerji'].map((n, i) => {
          const t0 = 6.2 + i * 0.7; const s = pop(t0);
          return (
            <div key={i} style={{position: 'absolute', left: 44 + i * 830, top: 150, width: 780, height: 190, borderRadius: 26, background: 'rgba(240,91,102,.12)', border: `2px solid ${C.red}66`, opacity: p(t0, 0.3), transform: `scale(${0.9 + 0.1 * s})`}}>
              <Tx x={40} y={60} s={62} wt={900}>{n}</Tx>
              <Tx x={640} y={46} w={100} align="center" s={96} wt={900} c={C.red} glow={C.red}>✕</Tx>
            </div>
          );
        })}
      </Card>
    </Shell>
  );
};

// ---------------------------------------------------------------- 17
export const S17: React.FC = () => {
  const {t, p} = useTL();
  const rows = [['BUGÜN', 'ABD konut satışları', 0.8, C.gold], ['YARIN', 'ABD üretici fiyat endeksi (ÜFE)', 2.2, C.red], ['29 KASIM', 'OPEC+ toplantısı', 3.6, C.gold]] as const;
  return (
    <Shell title="Yarın Takip Edilecekler" sub="Takvim">
      {rows.map(([when, what, t0, col], i) => {
        const q = p(t0, 0.6); const y = 270 + i * 230; const pulse = i === 1 && q >= 1 ? 0.5 + 0.5 * Math.sin((t - t0) * 5) : 0;
        return (
          <div key={i} style={{position: 'absolute', left: 110 + 320 * (1 - q), top: y, width: 1700, height: 190, borderRadius: 30, opacity: q,
            background: 'linear-gradient(155deg, rgba(30,62,104,.93), rgba(13,32,58,.93))', border: `2px solid ${i === 1 ? C.gold + Math.round(60 + 140 * pulse).toString(16).padStart(2, '0') : 'rgba(255,255,255,.10)'}`,
            boxShadow: `0 24px 60px rgba(0,0,0,.45), 0 0 ${i === 1 ? 50 + 40 * pulse : 0}px ${C.gold}55`}}>
            <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 16, borderRadius: '30px 0 0 30px', background: col as string, boxShadow: `0 0 30px ${col}`}} />
            <Tx x={64} y={56} s={62} wt={900} c={col as string} glow={col as string}>{when}</Tx>
            <Tx x={500} y={58} s={58} wt={800}>{what}</Tx>
          </div>
        );
      })}
    </Shell>
  );
};

// ---------------------------------------------------------------- 18
export const S18: React.FC = () => {
  const {t, p} = useTL();
  const cols = [
    {title: 'ÜFE yüksek gelirse', col: C.red, t0: 0.8, b: [['Dolar ve tahvil faizi yükselir', true, C.green, 1.8], ['Altın ve riskli varlıklar baskı görür', false, C.red, 3.4]] as const},
    {title: 'ÜFE düşük gelirse', col: C.green, t0: 4.2, b: [['Fed baskısı hafifler', false, C.green, 5.0], ['Altın ve hisseler nefes alabilir', true, C.green, 6.6]] as const},
  ];
  return (
    <Shell title="İki Senaryo" sub="ABD ÜFE verisi yarının fiyatlamasında belirleyici olabilir">
      {cols.map((c, i) => (
        <Card key={i} x={110 + i * 890} y={270} w={830} h={660} t0={c.t0} accent={c.col}>
          <Tx x={44} y={50} s={54} wt={900} c={c.col} glow={c.col}>{c.title}</Tx>
          {c.b.map(([line, up, acol, tb], j) => {
            const q = p(tb as number, 0.5);
            return (
              <React.Fragment key={j}>
                <Arrow x={110} y={300 + j * 200 + 40} size={100} color={acol as string} up={up as boolean} o={q} bounce={8} />
                <Tx x={200} y={290 + j * 200} w={590} s={44} wt={800} o={q}>{line as string}</Tx>
              </React.Fragment>
            );
          })}
        </Card>
      ))}
    </Shell>
  );
};

// ---------------------------------------------------------------- 19
export const S19: React.FC = () => {
  const {t, p, pop} = useTL();
  const s = 1 + 0.05 * Math.sin(t * 5) * p(1.6, 0.4);
  const bell = Math.sin(t * 14) * 16 * Math.max(0, 1 - ((t - 2.6) % 3) / 0.8) * p(2.4, 0.3);
  return (
    <Shell>
      <Tx x={960} y={170 - 40 * (1 - p(0.1, 0.7))} w={1700} align="center" s={140} wt={900} o={p(0.1, 0.6)} ls={-3} glow={C.gold}>TEŞEKKÜRLER</Tx>
      <div style={{position: 'absolute', left: 780, top: 345, width: 360 * p(0.6, 0.7), height: 9, borderRadius: 5, background: `linear-gradient(90deg, ${C.gold2}, ${C.gold})`, boxShadow: `0 0 26px ${C.gold}`}} />
      <Tx x={960} y={400} w={1500} align="center" s={50} wt={600} c={C.grey} o={p(1.0, 0.5)}>Günlük ekonomi gündemi için</Tx>
      <div style={{position: 'absolute', left: 960 - 290 * s, top: 520, width: 580 * s, height: 140 * s, borderRadius: 30, background: `linear-gradient(145deg, ${C.red}, #c13a48)`, opacity: p(1.6, 0.4),
        boxShadow: `0 0 70px ${C.red}99`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 74 * s, color: C.white, letterSpacing: 2}}>ABONE OL</div>
      <svg width={120} height={120} viewBox="0 0 24 24" style={{position: 'absolute', left: 1330, top: 520, opacity: p(2.4, 0.3), transform: `rotate(${bell}deg)`, transformOrigin: '50% 10%', filter: `drop-shadow(0 0 20px ${C.gold})`}}>
        <path d="M12 2a1.6 1.6 0 0 0-1.6 1.6v.7A6.5 6.5 0 0 0 5.5 10.6v3.3L3.7 16.8a1 1 0 0 0 .85 1.5h14.9a1 1 0 0 0 .85-1.5l-1.8-2.9v-3.3a6.5 6.5 0 0 0-4.9-6.3v-.7A1.6 1.6 0 0 0 12 2zm0 20a2.4 2.4 0 0 0 2.3-1.7H9.7A2.4 2.4 0 0 0 12 22z" fill={C.gold2} />
      </svg>
      <Tx x={960} y={740} w={1500} align="center" s={44} wt={800} c={C.gold} o={p(2.4, 0.5)}>Yarın görüşmek üzere</Tx>
      <Tx x={960} y={860} w={1500} align="center" s={28} wt={500} c={C.grey} o={p(3.0, 0.6)}>Bu içerik genel bilgilendirme amaçlıdır; yatırım danışmanlığı kapsamında değildir.</Tx>
    </Shell>
  );
};

export const SCENES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19];
