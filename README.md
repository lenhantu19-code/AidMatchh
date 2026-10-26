[readme_md.md](https://github.com/user-attachments/files/33953745/readme_md.md)
# 🤝 AidMatch – Điều phối nhu cầu hỗ trợ và nguồn lực (BTL-25)

**Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
**Loại sản phẩm:** Sản phẩm Web Frontend (Nguyên mẫu)  
**Nhóm thực hiện:** 3 sinh viên (Ngân, Huế, Tú)

---

## 1. Giới thiệu dự án

**AidMatch** là một nền tảng ứng dụng web frontend được thiết kế để giải quyết bài toán thực tế trong lĩnh vực **Từ thiện / Humanitarian Aid**. Dự án đóng vai trò như một cầu nối minh bạch và hiệu quả, giúp điều phối, đối chiếu giữa "Nhu cầu hỗ trợ" (từ các địa phương, cá nhân) và "Nguồn lực" (từ các nhà tài trợ, tổ chức).

### Vấn đề giải quyết
* Nhu cầu chưa được chuẩn hóa, phân tán ở nhiều nơi.
* Nguồn lực khó đối chiếu với nhu cầu thực tế.
* Quá trình phân bổ thực hiện thủ công, phân bổ chậm.
* Báo cáo tác động thiếu nhất quán và thiếu minh bạch.

---

## 2. Tính năng chính theo Vai trò (Roles) & Phân công

Hệ thống được thiết kế với 4 vai trò chính. Nhóm đã thống nhất phân công như sau:

### 🏢 1. Đơn vị cần hỗ trợ (Requester) - **Phụ trách: Ngân**
* **Tạo nhu cầu (Need Create):** Khai báo nhu cầu cần hỗ trợ với biểu mẫu chuẩn hóa.
* **Quản lý nhu cầu (My Needs):** Theo dõi trạng thái (chờ duyệt, đã duyệt, đang nhận, hoàn thành).
* **Chi tiết nhu cầu (Need Detail):** Xem tiến độ phân bổ và cập nhật tình hình.
* *Trách nhiệm chéo:* Chịu trách nhiệm Hệ thống thiết kế, Responsive và kiểm tra UI/UX toàn dự án.

### 🎁 2. Nhà tài trợ / Đơn vị cung cấp (Donor) - **Phụ trách: Huế**
* **Quản lý nguồn lực (Resource Management):** Khai báo vật tư, tài chính, nhân lực sẵn có.
* **Gợi ý ghép nối (Match Suggestions):** Xem các nhu cầu phù hợp với nguồn lực đang có (Có sự hỗ trợ của AI).
* **Cam kết tài trợ (Commitments):** Quản lý các cam kết hỗ trợ đang diễn ra và lịch sử.
* *Trách nhiệm chéo:* Phụ trách tương tác JavaScript, xử lý dữ liệu giả lập (mock data), logic biểu mẫu (validation).

### ⚖️ 3. Điều phối viên & Quản trị viên (Coordinator & Admin) - **Phụ trách: Tú**
* **Duyệt nhu cầu (Need Review):** Đánh giá tính xác thực và duyệt các nhu cầu mới.
* **Bảng điều phối (Matching Board):** Giao diện ghép nối nhu cầu với nguồn lực.
* **Theo dõi phân bổ (Allocation Tracker):** Giám sát quá trình luân chuyển và bàn giao.
* **Quản lý danh mục & Người dùng (Admin):** Quản lý user, category và xem Impact Dashboard.
* *Trách nhiệm chéo:* Phụ trách kiến trúc thư mục, tích hợp Layout, đánh giá PR (Pull Request), phát hành (Deploy).

---

## 3. Trải nghiệm AI (AI Features)

Dự án tích hợp mô phỏng 3 tính năng AI để hỗ trợ ra quyết định (Bắt buộc theo yêu cầu môn học):
1. **Need-Resource Matcher:** Tự động đề xuất ghép nối nhu cầu và nguồn lực dựa trên từ khóa, số lượng và danh mục.
2. **Duplicate Need Detector:** Cảnh báo khi người dùng tạo một nhu cầu có khả năng trùng lặp với nhu cầu đã tồn tại trên hệ thống.
3. **Impact Story Draft:** Tự động sinh báo cáo/tóm tắt câu chuyện tác động từ các số liệu thống kê đóng góp.

> *Quy trình AI:* Nhập liệu → Đang xử lý (Loading) → Kết quả → Giải thích → Quyền kiểm soát của người dùng (Chấp nhận/Sửa/Từ chối).

---

## 4. Công nghệ sử dụng
* **Giao diện:** HTML5 Semantic, CSS3 (Custom, Responsive), Flexbox/Grid.
* **Tương tác:** JavaScript (ES6+), DOM Manipulation, Event Handling.
* **Dữ liệu:** JSON giả lập, LocalStorage.
* **Công cụ thiết kế & Quản lý:** Figma / Canva, Git & GitHub, Trello / Notion.
* **Minh chứng:** OBS Studio (Quay video cho mọi commit/giao diện).

---

## 5. Cấu trúc thư mục (Chuẩn hóa)

```text
cse122-aidmatch/
├── README.md
├── docs/                      # Tài liệu: Bảng kiểm kê, Phân công, Khai báo AI...
├── pages/                     # Các file HTML giao diện (index, login, requester, donor...)
├── assets/
│   ├── images/
│   ├── icons/
│   └── mock-data/             # JSON dữ liệu giả lập
├── css/
│   ├── style.css              # CSS chung (reset, variables)
│   ├── layout.css             # Header, Sidebar
│   └── responsive.css
└── js/
    ├── main.js                # Logic chung
    └── modules/               # Logic riêng cho từng role
```

---

## 6. Quy trình làm việc (Git & Workflow)

1. **Quản lý Task:** Mọi công việc được tạo trên Trello.
2. **Git Flow:**
   * Nhánh chính: `main` (Production), `dev` (Gom code từ các thành viên).
   * Nhánh tính năng: `feature/<tên-tính-năng>` (VD: `feature/donor-resource-management`).
3. **Commit Convention (Bắt buộc):** 
   * Dùng tiền tố: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`. 
   * *Không dùng commit chung chung như "update", "fix file".*
4. **Pull Request (PR):** Bắt buộc phải tạo PR và Review chéo trước khi merge vào `dev`.
5. **Minh chứng OBS:** **Mỗi giao diện hoàn thành = 1 Video OBS** (Có mặt sinh viên, show Figma, code, test tương tác, thao tác git commit).
