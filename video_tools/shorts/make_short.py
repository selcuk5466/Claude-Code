#!/usr/bin/env python3
"""Seslendirme + senaryo + ASR kelime zamanlarından Shorts sesi, altyazı ve cümle zamanları üretir.

Kullanım:
  python3 make_short.py <ses.wav> <senaryo.txt> <words.json> <kisa_ad> <cikti_klasoru> <remotion_src>
kisa_ad: CONFIGS içindeki anahtar (ör. fed_tcmb). Çıktılar:
  <cikti>/<ad>_audio.wav ,  <remotion_src>/short_<ad>.json
Paragraf/cümle numaraları 0'dan başlar; sentences=(ilk, son) dahil.
"""
import difflib, json, re, subprocess, sys

CONFIGS = {
    'fed_tcmb': [(2, 0, 5), (14, 0, 1)],
    'yarin': [(17, 0, 5), (18, 0, 4)],
    # 14 Kasım enflasyon videosu
    'enf_hook': [(0, 0, 2), (1, 0, 2)],
    'enf_5of7': [(4, 0, 3)],
    'enf_asgari': [(6, 2, 5)],
    'enf_berlin': [(12, 3, 5)],
    'enf_yanilsama': [(16, 0, 3)],
    'borsa': [(8, 0, 5), (9, 0, 3)],
    # 13 Kasım (senaryo-kayitli.txt paragraf numaraları)
    'g2_fed': [(1, 1, 8)],
    'g2_altin': [(3, 1, 6)],
    'g2_nvidia': [(4, 1, 11)],
    'g2_petrol': [(6, 1, 7), (7, 0, 3)],
    'g2_turkiye': [(9, 1, 6), (10, 0, 3)],
}
GAP, END_CARD, TAIL = 0.35, 4.0, 0.12

# ------------------------------------------------------------------ Türkçe sayı sözcükleri -> rakam
NUM = {'sıfır': 0, 'bir': 1, 'iki': 2, 'üç': 3, 'dört': 4, 'beş': 5, 'altı': 6, 'yedi': 7, 'sekiz': 8, 'dokuz': 9, 'on': 10,
       'yirmi': 20, 'otuz': 30, 'kırk': 40, 'elli': 50, 'altmış': 60, 'yetmiş': 70, 'seksen': 80, 'doksan': 90, 'yüz': 100, 'bin': 1000, 'milyon': 10 ** 6}
SUF = {'ten': "'ten", 'tan': "'tan", 'la': "'la", 'le': "'le", 'den': "'den", 'dan': "'dan", 'a': "'a", 'e': "'e", 'ya': "'ya", 'ye': "'ye", 'li': "'li", 'lık': "'lık", 'lik': "'lik"}
MONTHS = ('ocak', 'şubat', 'mart', 'nisan', 'mayıs', 'haziran', 'temmuz', 'ağustos', 'eylül', 'ekim', 'kasım', 'aralık')
def lower(w): return w.replace('İ', 'i').replace('I', 'ı').lower()

def num_word(tok):
    """'dokuzla' -> (9, "'la") ; 'dokuz' -> (9, '') ; değilse None"""
    t = lower(re.sub(r"[.,:;]+$", '', tok))
    if t in NUM: return NUM[t], ''
    if t.startswith('dörd') and t[4:] in SUF: return 4, SUF[t[4:]]
    for k in sorted(NUM, key=len, reverse=True):
        if t.startswith(k) and t[len(k):] in SUF: return NUM[k], SUF[t[len(k):]]
    return None

def parse_run(vals):
    total = cur = 0
    for v in vals:
        if v == 100: cur = (cur or 1) * 100
        elif v in (1000, 10 ** 6): total += (cur or 1) * v; cur = 0
        else: cur += v
    return total + cur

def fmt_int(n): return str(n) if 1990 <= n <= 2100 or n < 1000 else f"{n:,}".replace(',', '.')

def to_pairs(text):
    raw_toks = text.split()
    toks, trails = [], []
    for t in raw_toks:
        m = re.match(r"^(.*?)([.,:;?!]*)$", t)
        toks.append(m.group(1)); trails.append(m.group(2))
    out = []; i = 0
    while i < len(toks):
        raw = toks[i]; pre = ''
        if lower(raw) == 'yüzde' and i + 1 < len(toks) and num_word(toks[i + 1]) is not None and not trails[i]:
            pre = '%'; i += 1; raw = toks[i]
        nw = num_word(raw) if raw else None
        if nw is None or nw[0] in (1000, 10 ** 6) and not pre or (nw[0] == 1 and not pre and nw[1] == '' and not (i + 1 < len(toks) and (num_word(toks[i + 1]) is not None or lower(toks[i + 1]) == 'virgül'))):
            out.append((('yüzde ' if pre else '') + raw + trails[i], 2 if pre else 1)); i += 1 if not pre else 1; continue
        i0 = i - (1 if pre else 0)
        run, suf, j, last_unit = [], '', i, False
        while j < len(toks):
            n = num_word(toks[j])
            if n is None: break
            v, sf = n
            is_unit = v < 10
            if run and is_unit and last_unit and run[-1] < 10: break
            run.append(v); last_unit = is_unit; suf = sf; j += 1
            if sf or trails[j - 1]: break
        value = parse_run(run); text_ = fmt_int(value); end = j
        if end < len(toks) and lower(toks[end]) == 'virgül' and not trails[end - 1]:
            k = end + 1; dec = []; dsuf = ''
            while k < len(toks):
                n = num_word(toks[k])
                if n is None or n[0] >= 100: break
                dec.append(n[0]); dsuf = n[1]; k += 1
                if n[1] or trails[k - 1]: break
            if dec:
                ds = ''.join(str(d) for d in dec) if all(d < 10 for d in dec) else str(parse_run(dec))
                text_ = f"{value},{ds}"; suf = dsuf; end = k
        elif end < len(toks) and lower(toks[end]) in ('buçuk', 'buçuğa') and not trails[end - 1]:
            tb = lower(toks[end]); text_ = f"{value},5"; suf = "'e" if tb == 'buçuğa' else ''; end += 1
        out.append((pre + text_ + suf + trails[end - 1], end - i0))
        i = end
    # 'N N Ay' -> 'N–N Ay' ; '%N ile M' -> '%N–M'
    k = 0; res = []
    while k < len(out):
        w, c = out[k]
        if k + 2 < len(out) and re.fullmatch(r"\d{1,2}", w) and re.fullmatch(r"\d{1,2}", out[k + 1][0]) and lower(out[k + 2][0].split("'")[0]) in MONTHS:
            res.append((f"{w}–{out[k + 1][0]}", c + out[k + 1][1])); k += 2; continue
        if k + 2 < len(out) and re.fullmatch(r"%\d+", w) and out[k + 1][0] == 'ile' and re.fullmatch(r"\d+[.,:;]?", out[k + 2][0]):
            res.append((f"{w}–{out[k + 2][0]}", c + 1 + out[k + 2][1])); k += 3; continue
        res.append((w, c)); k += 1
    return res

def to_digits(text): return ' '.join(w for w, _ in to_pairs(text))

# ------------------------------------------------------------------ hizalama
def norm(w): return re.sub(r"[^a-zçğıöşü0-9]", "", lower(w))

def align_tokens(paras, words, band=140):
    toks, pidx = [], []
    for k, p in enumerate(paras):
        for t in p.split():
            n = norm(t)
            if n: toks.append(n); pidx.append(k)
    A = [(norm(w['word']), w['start'], w.get('end', w['start'] + 0.3)) for w in words if norm(w['word'])]
    n, m = len(toks), len(A); NEG = -1e9
    D = [[NEG] * (m + 1) for _ in range(n + 1)]; B = [[0] * (m + 1) for _ in range(n + 1)]; D[0][0] = 0
    for i in range(n + 1):
        jc = int(i * m / max(1, n))
        for j in range(max(0, jc - band), min(m, jc + band) + 1):
            if i == 0 and j == 0: continue
            best, bm = NEG, 0
            if i > 0 and j > 0 and D[i - 1][j - 1] > NEG:
                r = 1.0 if toks[i - 1] == A[j - 1][0] else difflib.SequenceMatcher(None, toks[i - 1], A[j - 1][0]).ratio()
                v = D[i - 1][j - 1] + (2 * r if r >= 0.6 else -1.0)
                if v > best: best, bm = v, 0
            if i > 0 and D[i - 1][j] > NEG and D[i - 1][j] - 1.0 > best: best, bm = D[i - 1][j] - 1.0, 1
            if j > 0 and D[i][j - 1] > NEG and D[i][j - 1] - 0.6 > best: best, bm = D[i][j - 1] - 0.6, 2
            D[i][j], B[i][j] = best, bm
    i, j = n, m; tt = [None] * n; te = [None] * n
    while i > 0 and j > 0:
        mv = B[i][j]
        if mv == 0:
            if toks[i - 1] == A[j - 1][0] or difflib.SequenceMatcher(None, toks[i - 1], A[j - 1][0]).ratio() >= 0.6:
                tt[i - 1] = A[j - 1][1]; te[i - 1] = A[j - 1][2]
            i -= 1; j -= 1
        elif mv == 1: i -= 1
        else: j -= 1
    known = [(k, t) for k, t in enumerate(tt) if t is not None]
    full = []
    for k in range(n):
        if tt[k] is not None: full.append(tt[k]); continue
        pv = [x for x in known if x[0] < k]; nx = [x for x in known if x[0] > k]
        if not pv: full.append(nx[0][1] - 0.25 * (nx[0][0] - k))
        elif not nx: full.append(pv[-1][1] + 0.25 * (k - pv[-1][0]))
        else: a, b = pv[-1], nx[0]; full.append(a[1] + (b[1] - a[1]) * (k - a[0]) / (b[0] - a[0]))
    return toks, pidx, full, te

def main():
    wav, script, wjson, name, outdir, rsrc = sys.argv[1:7]
    paras = open(script, encoding='utf-8').read().strip().split('\n\n')
    words = json.load(open(wjson))
    toks, pidx, full, te = align_tokens(paras, words)
    ff = subprocess.run(['ffmpeg', '-hide_banner', '-i', wav, '-af', 'silencedetect=noise=-38dB:d=0.2', '-f', 'null', '-'], capture_output=True, text=True).stderr
    ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', ff)]; se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', ff)]
    sil = list(zip(ss, se))
    def snap_start(t):
        c = [e for a, e in sil if t - 0.8 <= e <= t + 0.15]
        return (max(c, key=lambda e: -abs(e - t)) - 0.08) if c else max(0, t - 0.2)
    def snap_end(t):   # t: sonraki cümlenin ilk kelimesi
        c = [a for a, e in sil if t - 1.2 <= a <= t - 0.02]
        return max(c) if c else t - 0.25
    # token indeksleri: paragraf -> cümle -> token aralığı
    offs, o = {}, 0
    for k, p in enumerate(paras):
        offs[k] = o; o += len([t for t in p.split() if norm(t)])
    def sentences(k): return [s for s in re.split(r'(?<=[.?!])\s+', paras[k].strip()) if s]
    def sent_tok_range(k, si):
        ss_ = sentences(k); a = offs[k] + sum(len([t for t in s.split() if norm(t)]) for s in ss_[:si])
        return a, a + len([t for t in ss_[si].split() if norm(t)])
    segs = []
    for (k, s0, s1) in CONFIGS[name]:
        a, _ = sent_tok_range(k, s0); _, b = sent_tok_range(k, s1)
        ws = snap_start(full[a]) if a > 0 else 0.0
        if b < len(full) and pidx[b] == k or (b < len(full) and True):
            nxt = full[b] if b < len(full) else te[-1] + 1
            we = snap_end(nxt)
        # son cümlenin son kelimesinden önce kesme
        we = max(we, full[b - 1] + 0.35)
        sents = []
        for si in range(s0, s1 + 1):
            x, y = sent_tok_range(k, si); sents.append({'start': full[x], 'end': full[y] if y < len(full) else we, 'text': sentences(k)[si]})
        phrases = []
        for si in range(s0, s1 + 1):
            sent = sentences(k)[si]; x, _ = sent_tok_range(k, si)
            pairs = to_pairs(sent)
            groups = []; cur = []
            for pr in pairs:
                cur.append(pr)
                if pr[0][-1] in ',:;': groups.append(cur); cur = []
            if cur: groups.append(cur)
            chunks = []
            for g in groups:
                if len(g) > 6:
                    n_ = -(-len(g) // 4); size = -(-len(g) // n_)
                    chunks += [g[i:i + size] for i in range(0, len(g), size)]
                else: chunks.append(g)
            cursor = x
            for ch in chunks:
                phrases.append({'t': full[cursor], 'text': ' '.join(w for w, _ in ch)})
                cursor += sum(c for _, c in ch)
        segs.append({'ws': ws, 'we': we, 'sents': sents, 'phrases': phrases})
    # ses
    filt, labels, tl, caps, t = [], [], [], [], 0.0
    for i, sg in enumerate(segs):
        ws, we = sg['ws'], sg['we']; dur = we - ws + TAIL
        for j, ph in enumerate(sg['phrases']):
            st = t + max(0.0, ph['t'] - ws)
            en = (t + max(0.0, sg['phrases'][j + 1]['t'] - ws)) if j + 1 < len(sg['phrases']) else t + dur
            caps.append({'start': round(st, 3), 'end': round(en, 3), 'text': ph['text']})
        tl.append({'start': round(t, 3), 'dur': round(dur, 3),
                   'sentences': [{'start': round(max(0.0, s['start'] - ws), 3), 'end': round(min(dur, s['end'] - ws), 3)} for s in sg['sents']]})
        filt.append(f"[0:a]atrim={ws:.3f}:{we + TAIL:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.03,afade=t=out:st={dur - 0.12:.3f}:d=0.12[a{i}]")
        labels.append(f"[a{i}]"); t += dur
        if i < len(segs) - 1:
            filt.append(f"anullsrc=r=24000:cl=mono,atrim=0:{GAP}[g{i}]"); labels.append(f"[g{i}]"); t += GAP
    filt.append(f"anullsrc=r=24000:cl=mono,atrim=0:{END_CARD}[ge]"); labels.append('[ge]')
    filt.append(''.join(labels) + f"concat=n={len(labels)}:v=0:a=1[out]")
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-filter_complex', ';'.join(filt), '-map', '[out]', '-ar', '48000', '-ac', '2', f'{outdir}/{name}_audio.wav'], check=True)
    json.dump({'total': round(t + END_CARD, 3), 'segments': tl, 'captions': caps, 'endCardStart': round(t, 3)}, open(f'{rsrc}/short_{name}.json', 'w'), ensure_ascii=False, indent=1)
    print(name, 'toplam', round(t + END_CARD, 1), 's;', [(round(s['ws'], 1), round(s['we'], 1)) for s in segs])
    for c in caps: print(f"{c['start']:6.2f}-{c['end']:6.2f} {c['text']}")

if __name__ == '__main__':
    main()
