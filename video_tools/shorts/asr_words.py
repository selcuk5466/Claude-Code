#!/usr/bin/env python3
"""Seslendirmeden kelime zamanları çıkarır (Vosk, küçük Türkçe model).
Kurulum: pip install --no-deps vosk cffi requests tqdm websockets ; 'srt' yerine boş bir srt.py taslağı (PYTHONPATH).
Model: https://alphacephei.com/vosk/models/vosk-model-small-tr-0.3.zip
Kullanım: PYTHONPATH=/tmp/asr/stub python3 asr_words.py <ses.wav> <model_klasoru> <words.json>
"""
import json, subprocess, sys, vosk
wav, model, out = sys.argv[1:4]
vosk.SetLogLevel(-1)
raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', wav, '-ar', '16000', '-ac', '1', '-f', 's16le', '-'], capture_output=True).stdout
r = vosk.KaldiRecognizer(vosk.Model(model), 16000); r.SetWords(True)
words = []
for i in range(0, len(raw), 8000):
    if r.AcceptWaveform(raw[i:i + 8000]): words += json.loads(r.Result()).get('result', [])
words += json.loads(r.FinalResult()).get('result', [])
json.dump(words, open(out, 'w'), ensure_ascii=False)
print(len(words), 'kelime')
