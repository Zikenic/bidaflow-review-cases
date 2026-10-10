# BidaFlow

Web app/PWA quản lý quán bida theo SRS gồm 47 Use Case: bàn và phòng, phiên chơi, đặt bàn, bảng giá, order, khách hàng/hội viên, hóa đơn, kho, ca, báo cáo, tài khoản và audit log.

## Công nghệ

- Next.js 16 + TypeScript + Vinext/Cloudflare Workers
- Tailwind CSS 4 + Shadcn UI + Lucide
- Cloudflare D1 (SQLite) + Drizzle ORM/migration
- Web Crypto PBKDF2-SHA-256 cho mật khẩu; session token được băm trước khi lưu
- Cookie `HttpOnly`, `Secure`, `SameSite=Lax`; RBAC kiểm tra ở backend

Ứng dụng không dùng tài khoản ChatGPT để đăng nhập nghiệp vụ. Tài khoản đầu tiên cần `SETUP_CODE`; nhân viên tiếp theo đăng ký bằng mã mời 72 giờ do quản lý tạo.

## Chạy cục bộ

Yêu cầu Node.js 22.13+.

```bash
npm ci
npm run db:generate
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_natural_silvermane.sql
SETUP_CODE='your-long-random-secret' npm run dev
```

Sau khi mở ứng dụng, chọn **Thiết lập hệ thống**, nhập mã `SETUP_CODE` và tạo tài khoản quản trị đầu tiên. Không commit mã thật vào source.

## Luồng cấu hình ban đầu

1. Quản trị > Bàn & giá: tạo khu vực, loại bàn, bàn và khung giá.
2. Quản trị > Danh mục: tạo nhóm, sản phẩm/dịch vụ và hạng hội viên.
3. Kho hàng: nhập tồn đầu kỳ bằng giao dịch nhập kho.
4. Quản trị > Tài khoản: tạo mã mời cho quản lý, thu ngân, phục vụ và nhân viên kho.
5. Thu ngân mở ca trước khi nhận thanh toán tiền mặt.

## Kiểm thử đã thực hiện

- Build production thành công.
- Đăng ký quản trị và đăng nhập bằng session thật.
- Tạo khu vực, loại bàn, bàn, sản phẩm, khách hàng và hội viên.
- Nhập kho, mở ca, mở/tạm dừng/tiếp tục/kết thúc phiên, phục vụ order, lập và thanh toán hóa đơn, đặt bàn, chốt ca.
- Kiểm tra từ chối lịch đặt trùng, xuất kho âm và sửa hóa đơn đã thanh toán.

Xem [ma trận bao phủ Use Case](docs/USE_CASE_COVERAGE.md).
