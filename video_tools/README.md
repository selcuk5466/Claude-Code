# Animasyonlu günlük ekonomi videosu (Remotion)

Slaytlar `remotion/src/scenes.tsx` içinde React bileşenleri olarak yazılıdır; arka plan, alt şerit ve ortak bileşenler `ui.tsx` dosyasındadır.
Sahne başlangıç zamanları `src/bounds.json` içindedir ({"starts": [saniye...], "total": saniye}).

Kurulum: `cd remotion && npm install`

Önizleme (tek kare):
`npx remotion still src/index.ts Video out.png --frame=1500 --browser-executable=/opt/pw-browsers/chromium/... --chrome-mode=chrome-for-testing`

Tam render (sessiz video, sonra ses eklenir):
`npx remotion render src/index.ts Video /tmp/anim_video.mp4 --browser-executable=<chrome> --chrome-mode=chrome-for-testing --concurrency=4 --image-format=jpeg --jpeg-quality=92 --crf=19`
`ffmpeg -i /tmp/anim_video.mp4 -i ses.wav -c:v copy -c:a aac -b:a 160k -ar 48000 -ac 2 -shortest video.mp4`

Her gün güncellenecekler: scenes.tsx içindeki rakamlar, Ticker (ui.tsx) metinleri ve bounds.json.
