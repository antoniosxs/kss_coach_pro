const CACHE_NAME = 'kss-coach-v7.7';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './kss_coach_192.png',
  './kss_coach_512.png',
  './surfboard.png',
  './bodyboard.png',
  './longboard.png',
  './kneeboard.png',
  './paddle_surf.png',
  './paddle_race.png',
  './stickers_0000s_0000_Screenshot-2026-02-16-143059.png',
  './stickers_0000s_0001_Screenshot-2026-02-16-143050.png',
  './stickers_0000s_0002_Screenshot-2026-02-16-142954.png',
  './stickers_0000s_0003_Screenshot-2026-02-16-142945.png',
  './stickers_0000s_0004_Screenshot-2026-02-16-142928.png',
  './stickers_0000s_0005_Screenshot-2026-02-16-142920.png',
  './stickers_0000s_0006_Screenshot-2026-02-16-142911.png',
  './stickers_0000s_0007_bs-ooff-the-top.png',
  './stickers_0000s_0008_bs-carving.png',
  './stickers_0000s_0009_finishing-off-the-top.png',
  './stickers_0000s_0010_off-the-top.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
