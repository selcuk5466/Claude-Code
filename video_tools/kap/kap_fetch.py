#!/usr/bin/env python3
"""KAP'tan günün önemli bildirimlerini çeker (üyelik gerekmez).
Kullanım: python3 kap_fetch.py [gün.ay.yıl başlangıç] [gün.ay.yıl bitiş] [--detay]
Varsayılan: dün → bugün. Çıktı: önemli bildirimler listesi (markdown) + kap_<tarih>.json
Not: Kişisel analiz/al-sat önerisi değildir; videoda yalnızca bildirimin ne olduğu anlatılır."""
import datetime as dt, html, json, re, sys, urllib.request

UA = {'User-Agent': 'Mozilla/5.0', 'Content-Type': 'application/json', 'Accept': 'application/json'}
args = [a for a in sys.argv[1:] if not a.startswith('--')]
today = dt.date.today()
f = args[0] if args else (today - dt.timedelta(days=1)).strftime('%d.%m.%Y')
t = args[1] if len(args) > 1 else today.strftime('%d.%m.%Y')
body = json.dumps({'fromDate': f, 'toDate': t, 'disclosureTypes': None, 'memberTypes': ['IGS'], 'mkkMemberOid': None}).encode()
req = urllib.request.Request('https://www.kap.org.tr/tr/api/disclosure/list/main', data=body, headers=UA, method='POST')
items = json.load(urllib.request.urlopen(req, timeout=60))

# önem sırası: düşük sayı = daha önemli
ONEM = [
    (1, r'Kar Payı|Kâr Payı|Temettü'), (1, r'Sermaye Artırımı|Bedelsiz|Bedelli|Kayıtlı Sermaye'), (1, r'Birleşme|Bölünme|Pay Satın Alma|Devralma|Ortaklık'),
    (1, r'İhale|Yeni İş İlişkisi|Sözleşme'), (1, r'Halka Arz'), (1, r'SPK İşlem Yasağı|Tedbir|İşlem Sırası'), (1, r'Finansal Rapor'),
    (2, r'Payların Geri Alınmasına'), (2, r'Özel Durum Açıklaması'), (2, r'Haber ve Söylentilere'), (2, r'Kredi Derecelendirmesi'), (2, r'Yatırım|Tesis|Kapasite'),
]
ATLA = r'Devre Kesici|Pay Alım Satım Bildirimi|Sermaye Piyasası Aracı İşlemlerine|Genel Bilgi Formu|Piyasa Yapıcılığı|Takasbank|Portföy Dağılım|Yatırımcı Raporu|Sorumluluk Beyanı|Faaliyet Raporu|Sürdürülebilirlik|Komiteleri|Varant|Bilgi Formu|Hak Kullanım Süreç İptal|SPK İşlem Yasağı Nedeniyle Pay Duyurusu|Esas Alınan Varsayımlara|Fonun Kullanımına|Kurumsal Yönetim'

def onem(b):
    s = (b.get('title') or '') + ' ' + (b.get('summary') or '')
    if re.search(ATLA, b.get('title') or ''): return None
    for o, pat in ONEM:
        if re.search(pat, s): return o
    return 3

def detay(idx):
    try:
        h = urllib.request.urlopen(urllib.request.Request(f'https://www.kap.org.tr/tr/Bildirim/{idx}', headers={'User-Agent': 'Mozilla/5.0'}), timeout=40).read().decode('utf-8', 'ignore')
    except Exception as e:
        return f'(detay alınamadı: {e})'
    h = re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', h, flags=re.S)
    txt = html.unescape(re.sub(r'<[^>]+>', ' ', h)); txt = re.sub(r'\s+', ' ', txt)
    i = txt.find('oda_ExplanationTextBlock|')
    if i >= 0:
        seg = txt[i + len('oda_ExplanationTextBlock|'):]
        seg = re.split(r'İşbu açıklamamızın|Bu Özel Durum Açıklaması Türkçe|Yukarıdaki açıklamalarımızın|oda_', seg)[0]
        return seg.strip()[:1200]
    m = re.search(r'Ek Açıklamalar\s*(.{20,1200})', txt)
    return (m.group(1) if m else '(metin ekte, KAP bağlantısına bakın)').strip()[:1200]

sec = []
for it in items:
    b = it['disclosureBasic']; o = onem(b)
    if o is None or o > 2: continue
    sec.append((o, b))
sec.sort(key=lambda x: (x[0], x[1].get('publishDate', '')))
out = []
print(f'# KAP önemli bildirimler {f} → {t}  (toplam {len(items)}, seçilen {len(sec)})\n')
for o, b in sec:
    code = b.get('stockCode') or b.get('relatedStocks') or '-'
    link = f"https://www.kap.org.tr/tr/Bildirim/{b['disclosureIndex']}"
    rec = {'onem': o, 'kod': code, 'sirket': b.get('companyTitle'), 'tur': b.get('title'), 'ozet': b.get('summary'), 'saat': b.get('publishDate'), 'link': link}
    if '--detay' in sys.argv and o == 1: rec['detay'] = detay(b['disclosureIndex'])
    out.append(rec)
    print(f"- [{'★' if o == 1 else '·'}] **{code}** ({b.get('companyTitle')}) • {b.get('title')} • {b.get('summary') or ''} • {b.get('publishDate')} • {link}")
    if rec.get('detay'): print(f"    > {rec['detay'][:500]}")
json.dump(out, open(f"kap_{t.replace('.', '-')}.json", 'w'), ensure_ascii=False, indent=1)
