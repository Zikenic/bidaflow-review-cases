# Ma trận bao phủ Use Case

Ứng dụng được triển khai theo 47 Use Case trong SRS, gom thành 12 phân hệ nhưng vẫn giữ ranh giới quyền và nghiệp vụ riêng.

| Nhóm | Use Case | Vị trí trong ứng dụng |
| --- | --- | --- |
| Hệ thống & tài khoản | UC01-UC06, UC47 | Đăng nhập, đăng ký bằng mã mời, Hồ sơ, Quản trị > Tài khoản/Phân quyền, Đăng xuất |
| Bàn & phòng | UC07-UC10 | Sơ đồ bàn; Quản trị > Bàn & giá |
| Phiên chơi | UC11-UC15 | Sơ đồ bàn > Mở/Tạm dừng/Tiếp tục/Chuyển/Kết thúc |
| Đặt bàn | UC16-UC18 | Đặt bàn > Tạo/Xác nhận/Cập nhật/Hủy/Nhận bàn |
| Bảng giá | UC19-UC20 | Quản trị > Bàn & giá > Loại bàn/Khung giá |
| Order & dịch vụ | UC21-UC24 | Order & phục vụ; Quản trị > Danh mục |
| Khách hàng & hội viên | UC25-UC27 | Khách hàng; ưu đãi tự áp dụng khi lập hóa đơn |
| Hóa đơn & thanh toán | UC28-UC33 | Hóa đơn > Tạm tính/Tạo/Điều chỉnh/Tách-Gộp/Thanh toán/Hủy |
| Kho & hàng hóa | UC34-UC38 | Kho hàng; Quản trị > Danh mục |
| Ca làm việc | UC39-UC41 | Ca làm việc > Mở/Chốt/Lịch sử |
| Báo cáo | UC42-UC45 | Báo cáo > Doanh thu/Bàn/Sản phẩm/Kho |
| Kiểm soát hệ thống | UC46-UC47 | Nhật ký; Hồ sơ > Đăng xuất |

## Ràng buộc đã ép bằng code và dữ liệu

- Một bàn chỉ có tối đa một phiên `ACTIVE` hoặc `PAUSED`.
- Lịch đặt cùng bàn không được chồng lấn khi còn hiệu lực.
- Chuyển bàn đóng đoạn giá cũ và mở đoạn giá mới để tính đúng theo loại bàn.
- Thời gian tạm dừng không tính vào tiền bàn.
- Order đã phục vụ mới trừ tồn kho; không cho tồn âm.
- Hóa đơn đã thanh toán không được điều chỉnh hoặc hủy.
- Ưu đãi hội viên được ghi thành dòng điều chỉnh có truy vết.
- Thanh toán tiền mặt yêu cầu ca thu ngân đang mở.
- Nhật ký nghiệp vụ chỉ cho đọc, không có API sửa/xóa.
