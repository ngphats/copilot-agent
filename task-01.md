# 📌 Tính năng: Reminder (Nhắc nhở công việc) cho Todo App

## Mục tiêu

Thêm chức năng nhắc nhở (reminder) vào từng công việc trong Todo App. Ứng dụng sẽ gửi thông báo cho người dùng khi đến thời gian đã thiết lập.

---

## Chức năng chính

- Cho phép người dùng thiết lập thời gian nhắc nhở cho mỗi task.
- Khi đến thời điểm reminder, hiển thị notification trên trình duyệt.
- Lưu thông tin reminder cùng với task vào localStorage.

---

## UI/UX

- Khi tạo hoặc chỉnh sửa task, hiển thị thêm trường nhập:
  - **Reminder Time:** cho phép chọn ngày & giờ (sử dụng datetime picker).
- Task có reminder sẽ hiển thị biểu tượng 🔔 bên cạnh.
- Có thể chỉnh sửa hoặc huỷ reminder bất cứ lúc nào.

---

## Logic hoạt động

- Khi người dùng khởi chạy ứng dụng:
  - Đọc toàn bộ task từ localStorage.
  - Kiểm tra các task có reminder.
  - Tính toán thời gian còn lại cho mỗi reminder.
  - Thiết lập `setTimeout()` hoặc `setInterval()` cho mỗi reminder sắp tới.
- Khi đến đúng thời điểm reminder:
  - Hiển thị notification bằng Web Notification API.
  - Ví dụ: `"🔔 Reminder: Bạn cần hoàn thành task: 'Học ReactJS'"`.
- Nếu người dùng huỷ reminder hoặc chỉnh sửa, cập nhật lại timeout tương ứng.

---

## Yêu cầu kỹ thuật

- **Lưu trữ reminder:**
  - Thêm trường `reminderTime` (ISO string format) vào object task trong localStorage.
- **Notification:**
  - Sử dụng `Notification API` của browser.
  - Khi người dùng mở app lần đầu, xin quyền `NotificationPermission`.
  - Kiểm tra và chỉ hiển thị notification nếu đã được cấp quyền.
- **Time Handling:**
  - Xử lý thời gian bằng `Date` object hoặc thư viện hỗ trợ (ví dụ: `date-fns` hoặc `dayjs`).
  - Kiểm tra múi giờ chính xác theo máy người dùng.

---

## Trường hợp đặc biệt cần xử lý

- Người dùng từ chối cấp quyền notification.
- Người dùng tắt trình duyệt trước thời điểm reminder.
- Người dùng chỉnh sửa reminder sau khi đã thiết lập.
- Đảm bảo không tạo duplicate timer khi người dùng reload app.

---

## Bonus (tính năng nâng cao nếu có thể)

- Cho phép lặp lại reminder (daily, weekly, v.v.).
- Đồng bộ notification khi mở trên nhiều thiết bị (cần backend hoặc service worker).
- Hỗ trợ push notification khi cài app dưới dạng PWA.

---

## Tham khảo API

```javascript
if ("Notification" in window) {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      new Notification("🔔 Reminder: Bạn cần hoàn thành task!");
    }
  });
}
```
