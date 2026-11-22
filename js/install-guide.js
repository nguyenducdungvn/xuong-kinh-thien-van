/* HLV Sức Khỏe – Hướng dẫn cài ứng dụng lên điện thoại / máy tính (dùng chung cho các ứng dụng của hlvsuckhoe.com).
   Cách dùng trong một ứng dụng:
     <script src="js/install-guide.js"></script>
     <script>HLVInstall.init({ name: 'BreathSync', url: 'tho.hlvsuckhoe.com', icon: 'icons/icon-192.png', color: '#0f6a4b', data: true });</script>
   Rồi gọi HLVInstall.open() từ một nút bất kỳ, hoặc gắn data-install-guide vào nút/đường link.
   Mở thẳng bằng địa chỉ  …/#cai-dat .  Ngôn ngữ lấy theo <html lang> (en → tiếng Anh), hoặc HLVInstall.open({lang:'en'}).
   Không gửi dữ liệu đi đâu; chỉ dùng sự kiện cài đặt của trình duyệt. */
(function (w, d) {
  'use strict';
  var cfg = { name: 'Ứng dụng', url: location.host, icon: 'icons/icon-192.png', color: '#0f6a4b', data: true }, deferred = null, box = null;
  function standalone() { return (w.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true; }
  function ios() { return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); }
  function inApp() { return /FBAN|FBAV|FB_IAB|Instagram|Zalo|Line\//i.test(navigator.userAgent); }
  function android() { return /Android/i.test(navigator.userAgent); }
  function lang(o) { var l = (o && o.lang) || cfg.lang || d.documentElement.lang || 'vi'; return /^en/i.test(l) ? 1 : 0; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var T = {
    title: ['Cài lên điện thoại', 'Install on your phone'],
    lead: ['Cài thẳng từ trang web: không cần kho ứng dụng, không cần tài khoản, miễn phí. Sau khi cài sẽ có biểu tượng riêng trên màn hình, mở toàn màn hình và dùng được cả khi không có mạng.', 'Install straight from the web page: no app store, no account, free. You get an icon on your home screen, a full-screen app, and it works offline.'],
    now: ['Cài ứng dụng ngay', 'Install the app now'], done: ['Đã cài trên máy này ✓ – mở từ biểu tượng trên màn hình.', 'Installed on this device ✓ – open it from the icon on your home screen.'],
    you: ['Máy của bạn', 'Your device'],
    inapp: ['Bạn đang mở trang trong Zalo / Facebook / Messenger. Trình duyệt bên trong các ứng dụng này không cài được: bấm <b>⋯</b> (hoặc ⋮) ở góc trên → <b>Mở bằng trình duyệt</b> / <b>Mở trong Safari</b> / <b>Mở trong Chrome</b>, rồi làm theo hướng dẫn bên dưới.', 'You are inside Zalo / Facebook / Messenger, whose built-in browser cannot install apps. Tap <b>⋯</b> (or ⋮) at the top → <b>Open in browser</b> / <b>Open in Safari</b> / <b>Open in Chrome</b>, then follow the steps below.'],
    iosH: ['iPhone / iPad (Safari)', 'iPhone / iPad (Safari)'],
    ios: [['Mở <b>{url}</b> bằng <b>Safari</b>.', 'Bấm nút <b>Chia sẻ</b> (hình vuông có mũi tên đi lên) – ở cạnh dưới màn hình iPhone, cạnh trên iPad.', 'Kéo xuống, chọn <b>Thêm vào MH chính</b>. Không thấy thì kéo xuống cuối, bấm <b>Sửa tác vụ</b> để thêm vào.', 'Giữ tên gợi ý, bấm <b>Thêm</b>. Biểu tượng hiện trên màn hình chính.'],
      ['Open <b>{url}</b> in <b>Safari</b>.', 'Tap the <b>Share</b> button (square with an up arrow) – at the bottom on iPhone, at the top on iPad.', 'Scroll down and tap <b>Add to Home Screen</b>. Not there? Scroll to the end, tap <b>Edit Actions</b> and add it.', 'Keep the suggested name and tap <b>Add</b>. The icon appears on your home screen.']],
    iosChrome: ['iOS 16.4 trở lên cũng cài được từ Chrome, Edge: nút Chia sẻ ở thanh địa chỉ → Thêm vào MH chính.', 'On iOS 16.4+ you can also install from Chrome or Edge: Share button in the address bar → Add to Home Screen.'],
    iosData: ['<b>Lưu ý iPhone/iPad:</b> ứng dụng đã cài có bộ nhớ <b>riêng</b>, tách khỏi Safari. Nên cài trước rồi mới nhập dữ liệu. Nếu đã nhập trong Safari: dùng chức năng <b>Sao lưu</b> trong Safari rồi <b>Khôi phục</b> trong ứng dụng đã cài.', '<b>iPhone/iPad note:</b> the installed app has its <b>own</b> storage, separate from Safari. Install first, then enter your data. Already started in Safari? Use <b>Backup</b> there, then <b>Restore</b> in the installed app.'],
    andH: ['Android (Chrome)', 'Android (Chrome)'],
    and: [['Mở <b>{url}</b> bằng <b>Chrome</b>.', 'Bấm nút <b>Cài ứng dụng ngay</b> ở trên (nếu có), hoặc menu <b>⋮</b> góc trên phải → <b>Cài đặt ứng dụng</b> / <b>Thêm vào màn hình chính</b>.', 'Bấm <b>Cài đặt</b> để xác nhận. Biểu tượng hiện trên màn hình chính và trong danh sách ứng dụng.'],
      ['Open <b>{url}</b> in <b>Chrome</b>.', 'Tap <b>Install the app now</b> above (if shown), or the <b>⋮</b> menu (top right) → <b>Install app</b> / <b>Add to Home screen</b>.', 'Tap <b>Install</b> to confirm. The icon appears on the home screen and in the app drawer.']],
    samsung: ['<b>Samsung Internet:</b> menu <b>≡</b> → <b>Thêm trang vào</b> → <b>Màn hình chờ</b>. <b>Cốc Cốc / Edge / Firefox:</b> menu → <b>Thêm vào màn hình chính</b>.', '<b>Samsung Internet:</b> menu <b>≡</b> → <b>Add page to</b> → <b>Home screen</b>. <b>Edge / Firefox:</b> menu → <b>Add to Home screen</b>.'],
    pcH: ['Máy tính (Chrome, Edge, Cốc Cốc)', 'Computer (Chrome, Edge)'],
    pc: [['Bấm biểu tượng <b>Cài đặt</b> ở cuối thanh địa chỉ (hình màn hình có mũi tên xuống).', 'Hoặc menu <b>⋮</b> → <b>Truyền, lưu và chia sẻ</b> → <b>Cài đặt trang dưới dạng ứng dụng</b>. Edge: <b>⋯</b> → <b>Ứng dụng</b> → <b>Cài đặt trang web này dưới dạng ứng dụng</b>.', 'Ứng dụng có cửa sổ riêng và lối tắt trên màn hình nền / menu Start. Safari trên Mac: <b>Tệp → Thêm vào Dock</b>.'],
      ['Click the <b>Install</b> icon at the right end of the address bar (a monitor with a down arrow).', 'Or menu <b>⋮</b> → <b>Cast, save and share</b> → <b>Install page as app</b>. Edge: <b>⋯</b> → <b>Apps</b> → <b>Install this site as an app</b>.', 'The app gets its own window and a shortcut on the desktop / Start menu. Safari on Mac: <b>File → Add to Dock</b>.']],
    updH: ['Cập nhật, gỡ bỏ, sự cố', 'Updates, removing, troubleshooting'],
    upd: [['<b>Cập nhật:</b> tự động. Mở ứng dụng khi có mạng, lần mở sau sẽ là bản mới.', '<b>Gỡ:</b> nhấn giữ biểu tượng → <b>Xoá ứng dụng / Gỡ cài đặt</b>.{data}', '<b>Không thấy nút cài:</b> kiểm tra đang mở bằng Safari (iPhone) hoặc Chrome (Android), không phải trong Zalo/Facebook; tắt chế độ ẩn danh; tải lại trang.', '<b>Đã cài nhưng mở ra trang trắng khi mất mạng:</b> mở ứng dụng một lần khi có mạng để máy lưu đủ tệp.'],
      ['<b>Updates:</b> automatic. Open the app while online; the next launch runs the new version.', '<b>Remove:</b> press and hold the icon → <b>Remove / Uninstall</b>.{data}', '<b>No install option?</b> Make sure you are in Safari (iPhone) or Chrome (Android), not inside Zalo/Facebook; leave private mode; reload the page.', '<b>Blank screen offline?</b> Open the app once while online so it can store all its files.']],
    dataWarn: [' <b>Hãy sao lưu trước</b>: gỡ ứng dụng có thể xoá dữ liệu đã lưu bên trong.', ' <b>Back up first</b>: removing the app can delete the data stored in it.'],
    close: ['Đóng', 'Close']
  };
  function ol(a, l) { return '<ol>' + a[l].map(function (x) { return '<li>' + x.replace('{url}', esc(cfg.url)) + '</li>'; }).join('') + '</ol>'; }
  function ul(a, l) { return '<ul>' + a[l].map(function (x) { return '<li>' + x.replace('{data}', cfg.data ? T.dataWarn[l] : '') + '</li>'; }).join('') + '</ul>'; }

  function actionHtml(l) {
    if (standalone()) return '<p class="hlvi-ok">' + T.done[l] + '</p>';
    var h = '';
    if (inApp()) h += '<p class="hlvi-warn">' + T.inapp[l] + '</p>';
    if (deferred) h += '<p><button type="button" class="hlvi-btn" data-hlvi-install>⤓ ' + T.now[l] + '</button></p>';
    return h;
  }
  /** Nội dung hướng dẫn (HTML) – dùng được để nhúng vào trang Hướng dẫn của ứng dụng. */
  function html(o) {
    var l = lang(o), first = ios() ? 'ios' : (android() ? 'and' : 'pc');
    function sec(id, head, body) { return '<details class="hlvi-sec"' + (id === first ? ' open' : '') + '><summary>' + head + (id === first ? ' <span class="hlvi-you">' + T.you[l] + '</span>' : '') + '</summary>' + body + '</details>'; }
    return '<div class="hlvi"><div class="hlvi-head"><img src="' + esc(cfg.icon) + '" alt="" width="48" height="48"><div><b>' + esc(cfg.name) + '</b><span>' + esc(cfg.url) + '</span></div></div>' +
      '<p>' + T.lead[l] + '</p><div class="hlvi-act">' + actionHtml(l) + '</div>' +
      sec('ios', T.iosH[l], ol(T.ios, l) + '<p class="hlvi-fine">' + T.iosChrome[l] + '</p>' + (cfg.data ? '<p class="hlvi-warn">' + T.iosData[l] + '</p>' : '')) +
      sec('and', T.andH[l], ol(T.and, l) + '<p class="hlvi-fine">' + T.samsung[l] + '</p>') +
      sec('pc', T.pcH[l], ol(T.pc, l)) +
      sec('upd', T.updH[l], ul(T.upd, l)) + '</div>';
  }
  function refresh() { var a = d.querySelectorAll('.hlvi-act'); for (var i = 0; i < a.length; i++) a[i].innerHTML = actionHtml(lang({ lang: a[i].closest('.hlvi').getAttribute('data-l') })); }

  function css() {
    if (d.getElementById('hlvi-css')) return;
    var s = d.createElement('style'); s.id = 'hlvi-css';
    s.textContent = '.hlvi-ov{position:fixed;inset:0;z-index:2147483600;background:rgba(0,0,0,.55);display:flex;align-items:flex-end;justify-content:center}' +
      '@media(min-width:700px){.hlvi-ov{align-items:center}}' +
      '.hlvi-dlg{background:#fff;color:#1d2420;width:min(640px,100%);max-height:92vh;overflow:auto;border-radius:18px 18px 0 0;padding:18px 18px calc(18px + env(safe-area-inset-bottom));font:16px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;box-shadow:0 10px 40px rgba(0,0,0,.35)}' +
      '@media(min-width:700px){.hlvi-dlg{border-radius:18px}}' +
      '.hlvi-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:6px}.hlvi-top h2{margin:0;font-size:1.25rem;color:inherit}' +
      '.hlvi-x{border:0;background:#eef0ee;color:#1d2420;border-radius:999px;min-width:44px;min-height:44px;font-size:1.3rem;cursor:pointer}' +
      '.hlvi{color:inherit}.hlvi p{margin:.4em 0 .7em}.hlvi-head{display:flex;gap:12px;align-items:center;margin:4px 0 8px}.hlvi-head img{border-radius:12px}.hlvi-head b{display:block;font-size:1.05rem}.hlvi-head span{font-size:.88rem;opacity:.7}' +
      '.hlvi-sec{border:1px solid rgba(128,128,128,.35);border-radius:12px;padding:6px 12px;margin:8px 0}.hlvi-sec summary{cursor:pointer;font-weight:700;padding:6px 0;min-height:32px}' +
      '.hlvi-sec ol,.hlvi-sec ul{padding-left:1.3em;margin:.3em 0}.hlvi-sec li{margin:.3em 0}.hlvi-you{font-size:.72rem;font-weight:600;border-radius:999px;padding:2px 8px;margin-left:6px;background:' + cfg.color + ';color:#fff;vertical-align:middle}' +
      '.hlvi-btn{border:0;border-radius:999px;padding:12px 20px;font:700 1rem system-ui,sans-serif;background:' + cfg.color + ';color:#fff;cursor:pointer;min-height:46px}' +
      '.hlvi-warn{background:rgba(242,165,22,.14);border-left:4px solid #f2a516;border-radius:8px;padding:8px 12px}.hlvi-ok{font-weight:700;color:#1f7a4d}.hlvi-fine{font-size:.9rem;opacity:.8}';
    d.head.appendChild(s);
  }
  /** Mở hướng dẫn dạng hộp thoại. */
  function open(o) {
    css(); close(); var l = lang(o);
    box = d.createElement('div'); box.className = 'hlvi-ov'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true'); box.setAttribute('aria-label', T.title[l]);
    box.innerHTML = '<div class="hlvi-dlg"><div class="hlvi-top"><h2>📲 ' + T.title[l] + '</h2><button type="button" class="hlvi-x" data-hlvi-close aria-label="' + T.close[l] + '">×</button></div>' + html(o).replace('<div class="hlvi">', '<div class="hlvi" data-l="' + (l ? 'en' : 'vi') + '">') + '</div>';
    box.addEventListener('click', function (e) { if (e.target === box || e.target.closest('[data-hlvi-close]')) close(); });
    d.body.appendChild(box); var x = box.querySelector('.hlvi-x'); if (x) x.focus();
  }
  function close() { if (box && box.parentNode) box.parentNode.removeChild(box); box = null; }
  function install() { if (!deferred) return; deferred.prompt(); deferred.userChoice.then(function () { deferred = null; refresh(); }, function () { }); }

  w.addEventListener('beforeinstallprompt', function (e) { deferred = e; refresh(); }); // không chặn banner của trình duyệt; chỉ giữ lại để nút "Cài ngay" dùng
  w.addEventListener('appinstalled', function () { deferred = null; refresh(); });
  d.addEventListener('click', function (e) {
    var t = e.target.closest && e.target.closest('[data-hlvi-install],[data-install-guide]'); if (!t) return;
    e.preventDefault(); if (t.hasAttribute('data-hlvi-install')) install(); else open();
  });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box) close(); });
  var first = location.hash; // giữ lại trước khi ứng dụng tự đổi địa chỉ
  function want(h) { return h === '#cai-dat' || h === '#install'; }
  function hash(h) { if (want(typeof h === 'string' ? h : location.hash)) setTimeout(function () { open(); }, 400); }
  w.addEventListener('hashchange', function () { hash(); });

  w.HLVInstall = {
    init: function (o) { for (var k in o) cfg[k] = o[k]; if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', function () { hash(first); }); else hash(first); return this; },
    open: open, close: close, html: function (o) { css(); return html(o); }, refresh: refresh,
    canPrompt: function () { return !!deferred; }, installed: standalone
  };
})(window, document);
