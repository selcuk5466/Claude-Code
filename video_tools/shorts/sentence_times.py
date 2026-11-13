#!/usr/bin/env python3
"""Kayıtlı seslendirmeden paragraf ve cümle zamanlarını çıkarır (ana video sahneleri için).
Kullanım: python3 sentence_times.py <ses.wav> <senaryo.txt> <words.json> <cikti.json>
"""
import importlib.util, json, os, re, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('ms', os.path.join(here, 'make_short.py'))
ms = importlib.util.module_from_spec(spec); sys.argv, _a = ['x'], sys.argv; spec.loader.exec_module(ms); sys.argv = _a
wav, script, wjson, out = sys.argv[1:5]
paras = open(script, encoding='utf-8').read().strip().split('\n\n')
words = json.load(open(wjson))
toks, pidx, full, te = ms.align_tokens(paras, words)
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', wav], capture_output=True, text=True).stdout)
ff = subprocess.run(['ffmpeg', '-hide_banner', '-i', wav, '-af', 'silencedetect=noise=-38dB:d=0.2', '-f', 'null', '-'], capture_output=True, text=True).stderr
ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', ff)]; se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', ff)]
sil = list(zip(ss, se))
def snap_start(t):
    c = [e for a, e in sil if t - 0.8 <= e <= t + 0.15]
    return max(0.0, (min(c, key=lambda e: abs(e - t)) - 0.08) if c else t - 0.2)
offs, o = {}, 0
for k, p in enumerate(paras):
    offs[k] = o; o += len([t for t in p.split() if ms.norm(t)])
res = []
for k, p in enumerate(paras):
    sents = [s for s in re.split(r'(?<=[.?!])\s+', p.strip()) if s]
    st, cur = [], offs[k]
    for s in sents:
        n = len([t for t in s.split() if ms.norm(t)]); st.append(full[cur]); cur += n
    res.append({'start': snap_start(full[offs[k]]) if k else 0.0, 'sentences': [round(x, 3) for x in st]})
for i, r in enumerate(res):
    r['end'] = res[i + 1]['start'] if i + 1 < len(res) else dur
    r['start'] = round(r['start'], 3); r['end'] = round(r['end'], 3)
json.dump({'total': round(dur, 3), 'paras': res}, open(out, 'w'), ensure_ascii=False, indent=1)
print(dur); [print(i, r['start'], r['end'], len(r['sentences'])) for i, r in enumerate(res)]
