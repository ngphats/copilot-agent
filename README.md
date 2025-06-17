# 📝 Todo App

Một ứng dụng quản lý công việc hiện đại và đơn giản được xây dựng bằng React và Tailwind CSS. Ứng dụng sử dụng localStorage để lưu trữ dữ liệu, đảm bảo công việc của bạn được bảo tồn ngay cả khi tải lại trang.

## ✨ Tính năng chính

### 🔧 Chức năng cơ bản
- ➕ **Thêm công việc mới** - Dễ dàng thêm task mới vào danh sách
- ❌ **Xóa công việc** - Loại bỏ các task không cần thiết
- ✏️ **Chỉnh sửa công việc** - Cập nhật nội dung task trực tiếp
- ✅ **Đánh dấu hoàn thành** - Toggle trạng thái hoàn thành/chưa hoàn thành
- 🔍 **Lọc theo trạng thái** - Xem tất cả, đang làm, hoặc đã hoàn thành
- 💾 **Lưu trữ tự động** - Dữ liệu được lưu vào localStorage

### 🎁 Tính năng nâng cao
- 🔍 **Tìm kiếm thông minh** - Tìm kiếm task theo từ khóa
- ✏️ **Chỉnh sửa trực tiếp** - Double-click để edit nhanh
- 🌙 **Dark Mode** - Chuyển đổi giữa chế độ sáng/tối
- 🧹 **Xóa hàng loạt** - Xóa tất cả task đã hoàn thành
- 📊 **Thống kê tiến độ** - Hiển thị số lượng task hoàn thành

## 🛠️ Công nghệ sử dụng

- **React 18** - Framework frontend hiện đại với hooks
- **Tailwind CSS 3** - Utility-first CSS framework
- **React Context & Custom Hooks** - Quản lý state hiệu quả
- **localStorage API** - Lưu trữ dữ liệu cục bộ
- **React Scripts** - Build tools và development server

## 🚀 Cài đặt và chạy ứng dụng

### Yêu cầu hệ thống
- Node.js 14+ 
- npm hoặc yarn

### Hướng dẫn cài đặt

1. **Clone repository**
   ```bash
   git clone https://github.com/ngphats/copilot-agent.git
   cd copilot-agent
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   ```

3. **Chạy ứng dụng trong chế độ development**
   ```bash
   npm start
   ```
   
   Ứng dụng sẽ chạy tại `http://localhost:3000`

4. **Build cho production**
   ```bash
   npm run build
   ```

5. **Chạy bản build production**
   ```bash
   npm install -g serve
   serve -s build
   ```

## 🎯 Cách sử dụng

### Thêm công việc mới
1. Nhập nội dung công việc vào ô input
2. Nhấn "Thêm" hoặc Enter để tạo task mới

### Quản lý công việc
- **Đánh dấu hoàn thành**: Click vào checkbox
- **Chỉnh sửa**: Double-click vào text hoặc nhấn nút ✏️
- **Xóa**: Nhấn nút 🗑️

### Lọc và tìm kiếm
- **Lọc**: Sử dụng các nút "Tất cả", "Đang làm", "Hoàn thành"
- **Tìm kiếm**: Nhập từ khóa vào ô tìm kiếm
- **Xóa hàng loạt**: Nhấn "Xóa đã hoàn thành"

### Dark Mode
- Nhấn nút 🌙/☀️ ở góc trên phải để chuyển đổi

## 📁 Cấu trúc dự án

```
src/
├── components/          # React components
│   ├── Header.js       # Header với dark mode toggle
│   ├── TodoForm.js     # Form thêm todo mới
│   ├── TodoList.js     # Danh sách todos
│   ├── TodoItem.js     # Item todo với inline editing
│   ├── TodoFilter.js   # Bộ lọc trạng thái
│   └── SearchBar.js    # Thanh tìm kiếm
├── hooks/              # Custom React hooks
│   ├── useTodos.js     # Hook quản lý todos và localStorage
│   └── useDarkMode.js  # Hook quản lý dark mode
├── App.js              # Component chính
├── index.js            # Entry point
└── index.css           # Tailwind CSS và custom styles
```

## 🎨 Thiết kế

- **Responsive Design**: Tương thích với mọi kích thước màn hình
- **Màu chủ đạo**: Đỏ (#dc2626) theo yêu cầu
- **Dark Mode**: Hỗ trợ chế độ tối/sáng
- **Animations**: Smooth transitions và hover effects
- **Accessibility**: Tối ưu cho người dùng khuyết tật

## 🔧 Tối ưu hóa

- **Performance**: Sử dụng `useMemo` để tránh re-render không cần thiết
- **Code Splitting**: Tách components hợp lý
- **Clean Code**: Code rõ ràng, có comment tiếng Việt
- **TypeScript Ready**: Dễ dàng migrate sang TypeScript

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

---

💻 **Phát triển bởi**: AI Assistant với ❤️ cho cộng đồng

🌟 **Nếu bạn thấy hữu ích, hãy star repo này!**
