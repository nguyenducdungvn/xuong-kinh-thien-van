/* Xưởng kính thiên văn – service worker (tạo bởi tools/build.py, đừng sửa tay): lưu app để chạy offline */
const CACHE = 'xuong-kinh-v1.9.1-1abb4af2';
const FILES = ["./", "./index.html", "./js/app.js", "./js/install-guide.js", "./manifest.webmanifest", "./img/logo.svg", "./img/qr_ung_ho.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-512-maskable.png", "./icons/apple-touch-icon.png", "./icons/favicon-32.png"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET' || !/^https?:/.test(req.url)) return;
  e.respondWith(caches.match(req, { ignoreSearch: new URL(req.url).origin === location.origin }).then(hit => hit || fetch(req).then(res => {
    if (res && (res.ok || res.type === 'opaque')) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
    return res;
  }).catch(() => req.mode === 'navigate' ? caches.match('./index.html') : Response.error())));
});
