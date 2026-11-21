# Bàn giao kỹ thuật và kinh nghiệm – Xưởng kính thiên văn

Cập nhật: 21/11/2026 · Phiên bản 1.9.0 · Chủ dự án: Nguyễn Đức Dũng (nddzungx@gmail.com)

Tài liệu này để chính bạn, hoặc Claude ở một cuộc trò chuyện mới, phát triển tiếp mà không phải hỏi lại từ đầu. Khi nhờ Claude, chỉ cần gửi link repo và câu: "Hãy đọc docs/BAN-GIAO.md rồi làm tiếp…".

## 1. Tóm tắt dự án
- **Người dùng chính:** chủ dự án ở Hà Nội, bắt đầu từ chỗ "chưa có kiến thức gì về kính thiên văn"; có đồ mộc cơ bản và gia công kim loại, in 3D phải đi thuê; dùng cả điện thoại và máy tính. Ứng dụng cũng dành cho người khác qua hlvsuckhoe.com.
- **Mục tiêu:** (1) tự chế kính để thấy Sao Thổ như ảnh mẫu; (2) ứng dụng học tập giả lập thiết kế, chế tạo, quan sát, có nhà xưởng chọn linh kiện và ước tính chi phí; (3) chương trình học thiên văn có lịch sử, câu chuyện, trắc nghiệm.
- **Quyết định đã chốt:**
  - ngân sách trong ứng dụng không giới hạn, người dùng đổi cấu hình tự do;
  - so sánh tự chế với mua sẵn; hướng dẫn kỹ cho cả 3 loại kính;
  - giá chỉ để tham khảo, có ghi chú rõ;
  - tiếng Việt, xưng "mình – bạn"; vị trí mặc định Hà Nội nhưng đổi được;
  - bản quyền © Nguyễn Đức Dũng, nddzungx@gmail.com;
  - phần Giới thiệu và mời cà phê giống HLV Sức Khỏe (VietQR BIDV 3210256468 NGUYEN DUC DUNG; PayPal ndd.phateco@gmail.com).
- **Ảnh Sao Thổ** người dùng gửi lúc đầu là ảnh mẫu, không phải tự chụp.
- **Loại kính sẽ chế thật:** chưa chọn.

## 2. Địa chỉ và kho mã
| Thành phần | Địa chỉ |
|---|---|
| Ứng dụng (GitHub Pages) | https://thienvan.hlvsuckhoe.com · dự phòng https://nddzungx.github.io/xuong-kinh-thien-van/ |
| Repo | https://github.com/nddzungx/xuong-kinh-thien-van |
| Bản trên Claude (artifact riêng tư của chủ dự án) | https://claude.ai/artifact/RRtJiyEsEuR8Wd8EWHWi3g |
| Trang chủ | https://hlvsuckhoe.com (repo `hlvsuckhoe-web`, một tệp `index.html`) |
| Ứng dụng anh em | https://app.hlvsuckhoe.com (repo `hlv-suc-khoe`) |

## 3. Cấu trúc mã
- `index.html` (~40 KB): `<head>` có PWA meta và CSS; thân trang gồm thanh đầu (7 tab, nút Giới thiệu, Đèn đỏ) và 8 `<section id="p…">`: `plearn`, `pdesign`, `pbuild`, `pobserve`, `psky`, `psolar`, `plog`, `pabout`. Chân trang có phiên bản và lịch sử.
- `js/app.js` (~120 KB, script thường, không module). Thứ tự trong tệp:
  1. Tiện ích `$`, trạng thái `S` (cấu hình), điều hướng `show(t)` theo `location.hash` (`#learn #design #build #observe #sky #solar #log #about`).
  2. Dữ liệu: `T` (loại kính, hệ số giá), `MT` (giá đỡ), `EP` (thị kính), `EX` (phụ kiện), `TG` (mục tiêu quan sát), `SS` (thẻ thiên thể), `MD`/`PI` (mô tả linh kiện).
  3. Nhà xưởng: `build()`, `upd()` (gọi mọi bộ vẽ), `cost(d)` (d=1 tự chế, 0 mua sẵn), `dims()`, `dgm()`, `scl()`, `rays()`, `cut()`, `mirror()`, `ccd()`.
  4. Quan sát thử: `sim()`, `real(k)` (kích thước, pha, vành Sao Thổ, vệ tinh Mộc tinh theo ngày), `simx()`.
  5. Học: `LS` (14 bài: `[tiêu đề, cấp, câu chuyện, ý chính[], công cụ, câu hỏi[[hỏi, đáp án[], chỉ số đúng, giải thích]]]`), `cur()` (xáo đáp án qua `QP`, giá trị radio là chỉ số gốc), `tool()`; thử thách `OB`, `obsr()`.
  6. Thiên văn: `EL` (yếu tố quỹ đạo JPL), `hel(i,T)`, `moonv(jd)`, `galx(jd)`, `geo(jd)`, `posAt(jd,lat,lon)`, `sky()`, `dome()` (sao `ST`, nối `CL`, tên `CN`), `orb()`, `mon()`, `lun()`, `seas()`.
  7. Dự báo: `scanEv(j0,j1)`, `lunEcl`, `solEcl`, `phaseT`, `MSH` (mưa sao băng), `evInit/evCalc/evRender`.
  8. Hướng dẫn chế tạo `GD(t)`/`guideR()`; vật tư `bom()`/`bomR()`; so sánh `SL`/`cmpR()`; tải/chép `saveFile()`, `copyText()`.
  9. Nhật ký: `JT`, `jInitUI()`, `jPut/jRemove`, phác họa `skInit()`.
  10. Giới thiệu: hằng `VERSION`, `APP_URL`, `REPO_URL`, `EMAIL`; nút chia sẻ, chép, định vị `#lg`.
  11. Dòng khởi động cuối tệp: `evInit();jInitUI();build();upd();sky();lun();ccd();cur();evs();obsr();show(...)`.
- **Lưu trữ trên máy (localStorage):** `cur` (tiến độ học), `obs` (thử thách), `log` (nhật ký), `slots` (3 cấu hình so sánh), `red` (đèn đỏ). Mọi đọc ghi đều bọc try/catch.
- **Hai môi trường cùng một mã:**
  - GitHub Pages: có service worker, cài như app, định vị chạy được, tải tệp bằng liên kết thường.
  - Claude artifact: không có service worker và định vị. Nhật ký lưu vào kho `data/users/<id>/log/entries` khi `window.claude` có mặt; tải tệp qua quyền `downloads`.
  - Mã tự nhận biết bằng `window.claude`, không cần bản riêng.

## 4. Quy trình phát triển
1. Sửa `index.html` / `js/app.js`.
2. Tăng `VERSION` (js), số phiên bản ở chân trang và lịch sử (html), mục Phiên bản (README).
3. `python tools/build.py` → tạo lại `sw.js` (mã cache = phiên bản + băm) và `dist/xuong-kinh-thien-van-offline.html`.
4. Kiểm thử: `python -m http.server 8000` → bấm qua 7 tab + Giới thiệu, cả khổ điện thoại (khoảng 390 px), sáng và tối. Mở bảng Console xem lỗi.
5. Tải lên GitHub (chi tiết: `docs/HUONG-DAN-CAP-NHAT.md`).
6. Nếu còn dùng bản Claude: đăng lại artifact cùng link. Bản này là thân trang, không có `<!doctype>`/`<head>`; ảnh nhúng data URI; không có manifest và service worker.

## 5. Độ chính xác đã kiểm chứng (cách làm để lặp lại khi sửa công thức)
- So với thư viện Python `astronomy-engine` (cài: `pip install astronomy-engine`) tại Hà Nội, 6 thời điểm 1990–2049:
  - hành tinh lệch dưới 0,12°, Mặt Trăng 0,18° (đã tính thị sai);
  - 53 sao khớp danh mục PyEphem (dưới 0,1°).
- Dự báo 11/2026–11/2029 so với `SearchLunarEclipse`, `SearchGlobalSolarEclipse`, `SearchLocalSolarEclipse`, `SearchRelativeLongitude`, `SearchMaxElongation`:
  - đủ mọi sự kiện, đúng ngày;
  - giờ nguyệt thực lệch khoảng 20–30 phút; giờ xung đối lệch 1–4 giờ;
  - nguyệt thực 12/01/2028 sát ranh giới (ứng dụng ghi nửa tối, thư viện ghi một phần rất nhỏ).
- Vệ tinh Mộc tinh lệch khoảng 1 bán kính Mộc tinh. Titan chỉ là minh họa.
- Giá: mô hình tự đặt, đối chiếu Dobson 200 mm (khoảng 725 USD) và Celestron 8SE (khoảng 1.500–1.700 USD), tỷ giá giả định 26.300 đ/USD.
- Các mốc lịch sử trong bài học đã rà và sửa ở v1.7 (Galileo 1610, Kepler là trợ lý của Tycho, Carrington khoảng 17,5 giờ, Messier 103→110, mùa trời trong ở Hà Nội).

## 6. Kinh nghiệm rút ra
1. **Luôn chạy thử trong trình duyệt thật.** Bảng chi phí trống suốt 6 phiên bản chỉ vì hai phần tử trùng `id` (`c1`, `c2`); đọc mã không thấy, chạy thử là thấy ngay. Đặt `id` có tiền tố theo khu vực.
2. **Kiểm chứng công thức bằng thư viện chuẩn**, không tin trí nhớ. Mặt Trăng từng lệch 2° vì thiếu số hạng và thị sai.
3. **Trắc nghiệm phải xáo đáp án** và lưu chỉ số gốc. Nếu viết tay, đáp án đúng hay dồn về lựa chọn đầu.
4. **Đường dẫn kho dữ liệu Claude**: số đoạn lẻ là bộ sưu tập, chẵn là tài liệu. `data/users/<id>/log` (4 đoạn) sai, phải là `data/users/<id>/log/entries`.
5. **Artifact Claude bị khóa nhiều thứ:** không tải tài nguyên ngoài (trừ Google Fonts và vài CDN), không service worker, không định vị, không `alert/confirm`, liên kết `mailto:` không chắc chạy. Hãy hiện địa chỉ email kèm nút chép, và xác nhận xóa ngay trên trang (bấm hai lần).
6. **PWA:** mỗi lần cập nhật phải đổi tên cache trong `sw.js`; `tools/build.py` tự làm bằng băm nội dung. Nếu quên, người đã cài sẽ kẹt ở bản cũ.
7. **GitHub Pages:**
   - cần `.nojekyll` (tệp ẩn, dễ sót khi kéo thả);
   - không xóa `CNAME`;
   - tạo bản ghi DNS trước rồi mới nhập Custom domain, tránh trang bị chuyển hướng tới tên miền chưa chạy.
8. **`datetime-local` theo múi giờ của máy:** mọi giờ hiển thị là giờ máy người dùng. Ghi rõ điều này cạnh dự báo.
9. **Giá luôn ghi "tham khảo"** và cho thanh hệ số giá để người dùng tự khớp báo giá thật.
10. **Phong cách làm việc chủ dự án thích:**
    - trả lời tiếng Việt, đánh số câu hỏi để trả lời theo "mục 1, mục 2";
    - nói rõ phần đã làm và chưa làm, phần chưa tự kiểm thử;
    - **luôn gợi ý tính năng mới sau mỗi phiên bản** và lưu gợi ý vào `docs/TINH-NANG-CHO.md`.
11. **Giữ một mã nguồn cho mọi nơi chạy** (GitHub, một tệp offline, Claude): nhánh khác nhau bằng kiểm tra tính năng (`window.claude`, `navigator.serviceWorker`), không tách bản.

## 7. Việc tồn đọng và rủi ro
- `js/app.js` lớn và viết dày (tên hàm ngắn). Khi thêm tính năng lớn, nên tách dần thành `js/astro.js`, `js/workshop.js`, `js/learn.js`, `js/log.js`; nhớ thêm vào danh sách `FILES` trong `tools/build.py` và cập nhật bước ghép một tệp.
- Bản vẽ cắt gỗ khúc xạ/SCT mới là vòng ôm và ván đế; chưa được duyệt với gỗ thật.
- Nhật ký ở bản GitHub chỉ lưu trong trình duyệt; đổi máy phải xuất/nhập JSON.
- Chưa có song ngữ; chưa có giờ Trạm Vũ trụ Quốc tế bay qua (cần dữ liệu quỹ đạo cập nhật từ mạng).
- Tên miền `thienvan.hlvsuckhoe.com` mới chạy được sau khi chủ dự án tạo bản ghi DNS.

## 8. Câu hỏi mở cho chủ dự án
1. Sẽ chế loại kính nào trước (khúc xạ, Newton/Dobson hay SCT)?
2. Ngân sách thật khi bắt đầu mua linh kiện?
3. Ưu tiên tính năng nào trong `docs/TINH-NANG-CHO.md`?
4. Có muốn song ngữ Việt – Anh như HLV Sức Khỏe?
