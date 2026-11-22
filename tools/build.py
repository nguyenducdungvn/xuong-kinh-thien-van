#!/usr/bin/env python3
"""Xưởng kính thiên văn – công cụ đóng gói.

Chạy sau mỗi lần sửa index.html, js/app.js hoặc ảnh:
    python tools/build.py
Việc nó làm:
  1. Tạo lại sw.js với mã phiên bản mới (băm nội dung) để điện thoại tự nhận bản mới.
  2. Tạo dist/xuong-kinh-thien-van-offline.html: một tệp duy nhất, mở được khi không có mạng
     (chép qua Zalo, USB…), và là nguồn để đăng lên Claude dưới dạng artifact.
Không cần cài thêm thư viện nào (chỉ dùng Python 3 chuẩn).
"""
import base64, hashlib, json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
FILES = ["./", "./index.html", "./js/app.js", "./js/install-guide.js", "./manifest.webmanifest", "./img/logo.svg", "./img/qr_ung_ho.png",
         "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-512-maskable.png",
         "./icons/apple-touch-icon.png", "./icons/favicon-32.png"]

def version():
    m = re.search(r"const VERSION='([^']+)'", (ROOT / "js/app.js").read_text(encoding="utf-8"))
    return m.group(1) if m else "0"

def make_sw():
    h = hashlib.sha256()
    for f in FILES[1:]:
        h.update((ROOT / f[2:]).read_bytes())
    cache = f"xuong-kinh-v{version()}-{h.hexdigest()[:8]}"
    sw = f"""/* Xưởng kính thiên văn – service worker (tạo bởi tools/build.py, đừng sửa tay): lưu app để chạy offline */
const CACHE = '{cache}';
const FILES = {json.dumps(FILES)};
self.addEventListener('install', e => {{ e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); }});
self.addEventListener('activate', e => {{ e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); }});
self.addEventListener('fetch', e => {{
  const req = e.request; if (req.method !== 'GET' || !/^https?:/.test(req.url)) return;
  e.respondWith(caches.match(req, {{ ignoreSearch: new URL(req.url).origin === location.origin }}).then(hit => hit || fetch(req).then(res => {{
    if (res && (res.ok || res.type === 'opaque')) {{ const cp = res.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }}
    return res;
  }}).catch(() => req.mode === 'navigate' ? caches.match('./index.html') : Response.error())));
}});
"""
    (ROOT / "sw.js").write_text(sw, encoding="utf-8")
    return cache

def data_uri(rel, mime):
    return f"data:{mime};base64," + base64.b64encode((ROOT / rel).read_bytes()).decode()

def make_single():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    js = (ROOT / "js/app.js").read_text(encoding="utf-8")
    # bỏ manifest, biểu tượng ngoài và service worker (không dùng được trong một tệp lẻ)
    html = re.sub(r'<link rel="(manifest|apple-touch-icon)"[^>]*>\n?', "", html)
    html = re.sub(r'<link rel="icon" href="icons/[^>]*>\n?', "", html)
    html = re.sub(r"<script>if\('serviceWorker'.*?</script>\n?", "", html, flags=re.S)
    ig = (ROOT / "js/install-guide.js").read_text(encoding="utf-8")
    html = html.replace('<script src="js/install-guide.js"></script>', "<script>\n" + ig.replace("</script", "<\\/script") + "\n</script>")
    html = html.replace('<script src="js/app.js"></script>', "<script>\n" + js.replace("</script", "<\\/script") + "\n</script>")
    html = html.replace('src="img/logo.svg"', 'src="' + data_uri("img/logo.svg", "image/svg+xml") + '"')
    html = html.replace('href="img/logo.svg"', 'href="' + data_uri("img/logo.svg", "image/svg+xml") + '"')
    html = html.replace('src="img/qr_ung_ho.png"', 'src="' + data_uri("img/qr_ung_ho.png", "image/png") + '"')
    out = ROOT / "dist" / "xuong-kinh-thien-van-offline.html"
    out.parent.mkdir(exist_ok=True)
    out.write_text(html, encoding="utf-8")
    return out

if __name__ == "__main__":
    c = make_sw()
    o = make_single()
    print("Phiên bản:", version())
    print("sw.js    :", c)
    print("Một tệp  :", o.relative_to(ROOT), f"({o.stat().st_size // 1024} KB)")
