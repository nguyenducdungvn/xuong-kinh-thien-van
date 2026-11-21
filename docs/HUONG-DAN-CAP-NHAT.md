# Hướng dẫn đưa lên và cập nhật – Xưởng kính thiên văn và trang chủ hlvsuckhoe.com

Cập nhật: 21/11/2026 · Áp dụng cho Xưởng kính 1.9.0

Hệ thống gồm ba repo GitHub công khai, mỗi repo một trang:

| Repo | Địa chỉ chạy | Nội dung |
|---|---|---|
| `hlvsuckhoe-web` | https://hlvsuckhoe.com | Trang chủ |
| `hlv-suc-khoe` | https://app.hlvsuckhoe.com | Ứng dụng HLV Sức Khỏe (không đổi trong lần này) |
| `xuong-kinh-thien-van` (mới) | https://thienvan.hlvsuckhoe.com | Ứng dụng Xưởng kính thiên văn |

Bạn cần làm 3 việc, theo thứ tự: **A** tạo repo Xưởng kính, **B** gắn tên miền `thienvan.hlvsuckhoe.com`, **C** cập nhật trang chủ.

---

## A. Tạo repo Xưởng kính thiên văn (lần đầu, khoảng 10 phút)

1. Giải nén tệp `xuong-kinh-thien-van-repo.zip` ra một thư mục trên máy.
2. Đăng nhập https://github.com bằng tài khoản `nddzungx`.
3. Góc trên phải bấm **+** → **New repository**.
   - Repository name: `xuong-kinh-thien-van`
   - Chọn **Public** (GitHub Pages miễn phí cần repo công khai).
   - Không tích "Add a README" (vì đã có sẵn) → **Create repository**.
4. Trong trang repo trống, bấm dòng **uploading an existing file**.
5. Mở thư mục đã giải nén, chọn **tất cả** bên trong (Ctrl+A), kéo thả vào trang GitHub. Phải có:
   `index.html`, `sw.js`, `manifest.webmanifest`, `README.md`, `LICENSE`, `.nojekyll` và các thư mục `js`, `img`, `icons`, `docs`, `tools`, `dist`.
   - `.nojekyll` là tệp ẩn. Nếu Windows không hiện: sau khi tải xong, bấm **Add file → Create new file**, gõ tên `.nojekyll`, để trống, **Commit changes**.
6. Ô "Commit changes" ghi: `Phiên bản 1.9.0` → bấm **Commit changes**. Đợi tải xong.
7. Vào **Settings** (tab trên cùng của repo) → menu trái **Pages**:
   - Source: **Deploy from a branch**
   - Branch: **main** · thư mục **/ (root)** → **Save**.
8. Đợi 1–2 phút, tải lại trang Settings → Pages. Khi thấy dòng "Your site is live at https://nddzungx.github.io/xuong-kinh-thien-van/" là xong. Mở thử link đó.

## B. Gắn tên miền thienvan.hlvsuckhoe.com (khoảng 10 phút, chờ DNS 5 phút đến vài giờ)

Bạn đã làm việc này với `app.hlvsuckhoe.com`, cách làm giống hệt.

1. Đăng nhập trang quản lý tên miền nơi bạn mua `hlvsuckhoe.com` → phần **Quản lý DNS / DNS records**.
2. Thêm bản ghi mới:
   - Loại (Type): **CNAME**
   - Tên (Host/Name): **thienvan**
   - Giá trị (Value/Target): **nddzungx.github.io** (một số nơi yêu cầu có dấu chấm cuối: `nddzungx.github.io.`)
   - TTL: mặc định → **Lưu**.
   - Đối chiếu: bản ghi `app` của ứng dụng sức khoẻ cũng đang trỏ về `nddzungx.github.io`.
3. Quay lại GitHub → repo `xuong-kinh-thien-van` → **Settings → Pages** → ô **Custom domain** nhập `thienvan.hlvsuckhoe.com` → **Save**.
   - GitHub tự tạo tệp `CNAME` trong repo. **Không xóa tệp này** về sau.
4. Đợi dòng "DNS check successful" (có thể vài phút đến vài giờ) → tích **Enforce HTTPS**.
5. Mở https://thienvan.hlvsuckhoe.com để kiểm tra.

Muốn dùng tên khác (ví dụ `kinh.hlvsuckhoe.com`): đổi ở bước 2 và 3, đồng thời sửa các link `thienvan.hlvsuckhoe.com` trong: `js/app.js` (dòng `const VERSION=…APP_URL=…`), `index.html` (thẻ `og:url`, `og:image`), `README.md`, và trang chủ (mục C).

## C. Cập nhật trang chủ hlvsuckhoe.com (5 phút)

Thay đổi trong lần này:
- Thẻ chuyên mục **Thiên văn**: mô tả mới, nhắc tới ứng dụng riêng.
- Mục **Bầu trời** (dưới "Trăng đêm nay"): thêm khối giới thiệu **Xưởng kính thiên văn** với 4 điểm nổi bật và 3 nút (Mở Xưởng kính, Bầu trời đêm nay, Tự chế kính).
- Mục ứng dụng cuối trang: thêm thẻ thứ hai cho Xưởng kính, cạnh HLV Sức Khỏe.
- Chân trang **Ủng hộ**: nhắc cả hai ứng dụng.
- Tệp mới `img/logo-thienvan.svg`; `README.md` thêm dòng về Xưởng kính.

Cách tải lên:
1. Giải nén `hlvsuckhoe-web-capnhat.zip`.
2. Vào repo `hlvsuckhoe-web` → **Add file → Upload files**.
3. Kéo vào: `index.html`, `README.md` và thư mục `img` (chứa `logo-thienvan.svg`; `logo.svg` cũ giữ nguyên). GitHub sẽ ghi đè tệp cùng tên.
   - **Không** xóa `CNAME` và `.nojekyll` đang có trong repo.
4. Commit message: `Thêm Xưởng kính thiên văn` → **Commit changes**. Sau 1–2 phút trang chủ cập nhật.

Lưu ý: nên làm mục C **sau khi** mục B đã chạy, để các nút trên trang chủ không trỏ vào địa chỉ chưa hoạt động. Nếu cần đưa trang chủ lên trước, tạm dùng link dự phòng `https://nddzungx.github.io/xuong-kinh-thien-van/`.

---

## D. Cập nhật phiên bản mới của Xưởng kính (mỗi lần sửa)

### Cách 1 – Nhờ Claude sửa (khuyên dùng)
1. Mở cuộc trò chuyện mới với Claude, gửi:
   > Repo của tôi: https://github.com/nddzungx/xuong-kinh-thien-van. Hãy đọc docs/BAN-GIAO.md rồi làm tiếp: [điều bạn muốn].
2. Claude đọc repo công khai, sửa, kiểm thử và gửi lại tệp zip (hoặc tự đẩy lên nếu bạn đã kết nối GitHub trong phần cài đặt của claude.ai).
3. Tải đè các tệp lên repo như mục A bước 4–6 (Upload files → kéo cả thư mục → Commit).

### Cách 2 – Tự sửa
1. Sửa `index.html` (giao diện, chữ, CSS) hoặc `js/app.js` (logic, dữ liệu, bài học).
2. **Tăng số phiên bản** ở 3 chỗ:
   - `js/app.js`: `const VERSION='1.9.0'` → ví dụ `'1.9.1'`
   - `index.html`: chân trang `Phiên bản <span class="ver">1.9.0</span> (ngày)` và thêm một dòng vào "Lịch sử phiên bản"
   - `README.md`: mục **Phiên bản**
3. Mở cửa sổ dòng lệnh trong thư mục repo, chạy:
   ```
   python tools/build.py
   ```
   Lệnh này tạo lại `sw.js` (để điện thoại biết có bản mới) và `dist/xuong-kinh-thien-van-offline.html`. **Bắt buộc chạy**, nếu quên thì người đã cài app sẽ không nhận bản mới.
4. Kiểm tra trên máy: chạy `python -m http.server 8000` trong thư mục repo, mở `http://127.0.0.1:8000`, bấm qua cả 7 tab và trang Giới thiệu.
5. Tải đè lên GitHub: Upload files → kéo `index.html`, `sw.js`, `js/`, `dist/` (và tệp khác đã sửa) → Commit.
6. Người dùng: mở app khi có mạng, đóng hẳn rồi mở lại là có bản mới.

### Những chỗ hay cần sửa (tìm bằng Ctrl+F trong `js/app.js`)
| Muốn sửa | Tìm |
|---|---|
| Thông tin chuyển khoản, PayPal | trong `index.html`: `3210256468`, `ndd.phateco@gmail.com` |
| Ảnh QR | thay tệp `img/qr_ung_ho.png` (giữ tên), rồi chạy build |
| Bài học, câu hỏi trắc nghiệm | `const LS=` |
| Giá linh kiện | `const T=` (quang học), `const MT=` (giá đỡ), `const EP=` (thị kính), `const EX=` (phụ kiện) |
| Địa điểm có sẵn | `const LP=` |
| Mưa sao băng | `const MSH=` |
| Thử thách quan sát | `const OB=` |
| Hướng dẫn chế tạo | `function GD(` |
| Ghi chú giá tham khảo | `pnote` |

## E. Bản một tệp và bản trên Claude
- `dist/xuong-kinh-thien-van-offline.html`: một tệp duy nhất, gửi qua Zalo/USB, mở bằng trình duyệt là chạy (không cần mạng, không cài được như app).
- Bản trên Claude (artifact) dùng cùng mã; nhật ký ở bản Claude lưu theo tài khoản Claude. Khi nhờ Claude cập nhật, nhắc Claude đăng lại artifact cùng link nếu bạn vẫn dùng bản đó.

## F. Gỡ rối nhanh
| Hiện tượng | Cách xử lý |
|---|---|
| Trang 404 sau khi bật Pages | Đợi thêm 2–5 phút; kiểm tra `index.html` nằm ở **gốc** repo, không nằm trong thư mục con. |
| Tên miền báo "DNS check unsuccessful" | Bản ghi CNAME chưa lan truyền hoặc sai giá trị; kiểm tra lại `thienvan` → `nddzungx.github.io`, đợi thêm. |
| Không bật được "Enforce HTTPS" | Đợi GitHub cấp chứng chỉ (tới 24 giờ) sau khi DNS đúng. |
| Điện thoại vẫn hiện bản cũ | Quên chạy `tools/build.py` hoặc quên tải `sw.js` mới; hoặc đóng hẳn app rồi mở lại khi có mạng. |
| Ảnh QR hoặc logo không hiện | Kiểm tra thư mục `img/` đã được tải lên đúng chỗ. |
| Nút "Dùng vị trí của tôi" báo lỗi | Trình duyệt chưa cho phép định vị; cho phép trong cài đặt trang web, hoặc chọn địa điểm có sẵn. |
