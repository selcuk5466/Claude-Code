#!/usr/bin/env python3
"""Uzun seslendirmeden Shorts sesi keser ve altyazı zamanlarını (short.json) üretir.
Kullanım: python3 build_short_audio.py <ses.wav> <cikti_klasoru>
"""
import json, re, subprocess, sys
wav, out = sys.argv[1], sys.argv[2]
GAP, END_CARD, TAIL = 0.35, 4.0, 0.12
# (wav_baslangic, wav_bitis, [(konusulan, ekranda_gorunen), ...])
SEGMENTS = [
  (0.0, 10.82, [
    ("Altın dört bin doların altına indi.", "Altın 4.000 doların altına indi."),
    ("Üç işlem günüdür üst üste düşüyor", "3 işlem günüdür üst üste düşüyor"),
    ("ve Salı gününden beri bütün tartışma", "ve Salı'dan beri bütün tartışma"),
    ("tek bir veri etrafında dönüyor:", "tek bir veri etrafında dönüyor:"),
    ("ABD'de Ekim ayı enflasyonu.", "ABD'de Ekim enflasyonu."),
  ]),
  (20.42, 41.64, [
    ("Önce enflasyona bakalım.", "Önce enflasyona bakalım."),
    ("Rakam aylık yüzde sıfır virgül dört çıktı.", "Rakam aylık %0,4 çıktı."),
    ("Ekonomistler yüzde sıfır virgül üç bekliyordu.", "Ekonomistler %0,3 bekliyordu."),
    ("Çekirdek enflasyon da yüzde sıfır virgül üçle", "Çekirdek enflasyon da %0,3"),
    ("beklentinin biraz üstünde kaldı.", "beklentinin biraz üstünde kaldı."),
    ("Asıl dikkat çeken kısım şu:", "Asıl dikkat çeken kısım şu:"),
    ("aylık enflasyon üst üste üçüncü kez", "aylık enflasyon üst üste 3. kez"),
    ("yüzde sıfır virgül dört ya da daha yüksek geldi.", "%0,4 ya da daha yüksek geldi."),
    ("Bu, tek seferlik bir sapma gibi görünmüyor.", "Bu, tek seferlik bir sapma gibi görünmüyor."),
  ]),
  (98.99, 118.99, [
    ("Şimdi altına gelelim,", "Şimdi altına gelelim,"),
    ("çünkü altının tepkisi", "çünkü altının tepkisi"),
    ("bu haftanın en sert hareketi oldu.", "bu haftanın en sert hareketi oldu."),
    ("Mantık basit. Altın faiz getirmiyor.", "Mantık basit. Altın faiz getirmiyor."),
    ("Faizler yükselince onu elde tutmanın", "Faizler yükselince onu elde tutmanın"),
    ("maliyeti artıyor.", "maliyeti artıyor."),
    ("Üstüne dolar da güçlendi.", "Üstüne dolar da güçlendi."),
    ("Dolarla fiyatlanan altın, başka para biriminden", "Dolarla fiyatlanan altın, başka para biriminden"),
    ("alan yatırımcıya daha pahalı geliyor.", "alan yatırımcıya daha pahalı geliyor."),
    ("İkisi birleşince satış gelmiş.", "İkisi birleşince satış gelmiş."),
  ]),
]

import difflib, os
ASR = json.load(open(sys.argv[3])) if len(sys.argv) > 3 else None
def norm(w):
    return re.sub(r"[^a-zçğıöşü0-9]", "", w.lower().replace('İ', 'i').replace('I', 'ı'))
def sim(a, b):
    if a == b: return 1.0
    return difflib.SequenceMatcher(None, a, b).ratio()
def asr_bounds(phrases, ws, we):
    """Her ifadenin baslangic zamani (wav saniyesi) -> liste (len=len(phrases))."""
    toks = []   # (token, ifade_no)
    for k, (sp, _) in enumerate(phrases):
        for t in sp.split():
            n = norm(t)
            if n: toks.append((n, k))
    A = [(norm(w['word']), w['start']) for w in ASR if ws - 0.4 <= w['start'] <= we + 0.2 and norm(w['word'])]
    n, m = len(toks), len(A)
    NEG = -10**9
    D = [[0.0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1): D[i][0] = -1.0 * i
    for j in range(1, m + 1): D[0][j] = -0.6 * j
    bt = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            sc = sim(toks[i - 1][0], A[j - 1][0]); s_ = (2 * sc if sc >= 0.6 else -1.0)
            opts = [(D[i - 1][j - 1] + s_, 0), (D[i - 1][j] - 1.0, 1), (D[i][j - 1] - 0.6, 2)]
            D[i][j], bt[i][j] = max(opts)
    i, j = n, m; tt = [None] * n
    while i > 0 and j > 0:
        mv = bt[i][j]
        if mv == 0:
            if sim(toks[i - 1][0], A[j - 1][0]) >= 0.6: tt[i - 1] = A[j - 1][1]
            i -= 1; j -= 1
        elif mv == 1: i -= 1
        else: j -= 1
    # bosluklari dogrusal doldur
    known = [(k, t) for k, t in enumerate(tt) if t is not None]
    if not known: return None
    full = []
    for k in range(n):
        if tt[k] is not None: full.append(tt[k]); continue
        prev = max([x for x in known if x[0] < k], default=(None, None), key=lambda x: x[0])
        nxt = min([x for x in known if x[0] > k], default=(None, None), key=lambda x: x[0])
        if prev[0] is None: full.append(nxt[1] - 0.25 * (nxt[0] - k))
        elif nxt[0] is None: full.append(prev[1] + 0.25 * (k - prev[0]))
        else: full.append(prev[1] + (nxt[1] - prev[1]) * (k - prev[0]) / (nxt[0] - prev[0]))
    starts = []
    for k in range(len(phrases)):
        idx = [x for x, (_, kk) in enumerate(toks) if kk == k]
        starts.append(full[idx[0]])
    return starts

syl = lambda s: max(1, len(re.findall(r'[aeıioöuüAEIİOÖUÜ]', s)))
ff = subprocess.run(['ffmpeg', '-hide_banner', '-i', wav, '-af', 'silencedetect=noise=-38dB:d=0.12', '-f', 'null', '-'], capture_output=True, text=True).stderr
ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', ff)]
se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', ff)]
sil = list(zip(ss, se))

timeline, caps, filt, labels, t = [], [], [], [], 0.0
for i, (ws, we, phrases) in enumerate(SEGMENTS):
    dur = we - ws + TAIL
    # segment icindeki sessizlikler (segment koordinatinda)
    local = [(max(a, ws) - ws, min(b, we) - ws) for a, b in sil if b > ws and a < we]
    local = [(a, b) for a, b in local if b - a >= 0.22]
    L = we - ws
    sp = sum(b - a for a, b in local)
    act = L - sp
    def a2w(a):
        acc, prev = 0.0, 0.0
        for s, e in local + [(L, L)]:
            seg = s - prev
            if acc + seg >= a: return prev + (a - acc)
            acc += seg; prev = e
        return L
    bounds = asr_bounds(phrases, ws, we) if ASR else None
    if bounds is None:
        raise SystemExit('ASR kelime dosyası gerekli (words.json)')
    bounds = [b - ws for b in bounds] + [L + TAIL]
    bounds[0] = 0.0
    for (sp_txt, disp), b0, b1 in zip(phrases, bounds, bounds[1:]):
        caps.append({'start': round(t + b0, 3), 'end': round(t + b1, 3), 'text': disp})
    timeline.append({'start': round(t, 3), 'dur': round(dur, 3)})
    filt.append(f"[0:a]atrim={ws:.3f}:{we + TAIL:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.03,afade=t=out:st={dur - 0.12:.3f}:d=0.12[a{i}]")
    labels.append(f"[a{i}]")
    t += dur
    if i < len(SEGMENTS) - 1:
        filt.append(f"anullsrc=r=24000:cl=mono,atrim=0:{GAP}[g{i}]"); labels.append(f"[g{i}]"); t += GAP
total = t + END_CARD
filt.append(f"anullsrc=r=24000:cl=mono,atrim=0:{END_CARD}[g_end]"); labels.append("[g_end]")
filt.append(''.join(labels) + f"concat=n={len(labels)}:v=0:a=1[out]")
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-filter_complex', ';'.join(filt), '-map', '[out]',
                '-ar', '48000', '-ac', '2', f'{out}/short_audio.wav'], check=True)
json.dump({'total': round(total, 3), 'segments': timeline, 'captions': caps, 'endCardStart': round(t, 3)}, open(f'{out}/short.json', 'w'), ensure_ascii=False, indent=1)
print('total', total, timeline)
