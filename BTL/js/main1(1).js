document.addEventListener('DOMContentLoaded', () => {
    // Tích hợp SweetAlert chống giật trang
    const ThongBao = Swal.mixin({ heightAuto: false });

    // --- 1. CHỐNG LỖI TẢI LẠI & GIẬT TRANG ---
    document.querySelectorAll('form').forEach(f => f.addEventListener('submit', e => e.preventDefault()));
    document.querySelectorAll('button').forEach(b => b.setAttribute('type', 'button'));
    document.querySelectorAll('a[href="#"], a[href=""]').forEach(a => {
        a.addEventListener('click', e => e.preventDefault());
    });

  // --- 2. MENU SIDEBAR (Tự động nhận diện trang & Chống giật tuyệt đối) ---
    const tenTrangHienTai = window.location.pathname.split('/').pop();

    // Bước 1: Xóa toàn bộ màu xanh bị set cứng trong file HTML
    document.querySelectorAll('.danh-sach-menu li').forEach(li => {
        li.classList.remove('dang-chon');
    });

    document.querySelectorAll('.danh-sach-menu a').forEach(link => {
        const href = link.getAttribute('href');

        // Bước 2: Bôi xanh mục menu trùng với tên file đang mở
        if (href === tenTrangHienTai && tenTrangHienTai !== "") {
            link.parentElement.classList.add('dang-chon');
        }

        // Bước 3: Xử lý khi click bằng chuột
        link.addEventListener('click', function(e) {
            const linkBiClick = this.getAttribute('href');
            
            // BẮT BỆNH GIẬT TRANG: Nếu link là "#", rỗng, hoặc trỏ đúng vào trang hiện tại -> Cấm load trang
            if (!linkBiClick || linkBiClick === '#' || linkBiClick === tenTrangHienTai) {
                e.preventDefault(); // Lệnh này khóa chặt hành vi giật lên trên cùng
                
                // Tẩy màu cũ và tô xanh nút vừa bấm
                document.querySelectorAll('.danh-sach-menu li').forEach(li => li.classList.remove('dang-chon'));
                this.parentElement.classList.add('dang-chon');
            }
        });
    });

    // --- 3. CÁC NÚT CHỨC NĂNG ---
    // Nút Đề nghị sửa (Nhập ngày mới)
    document.querySelectorAll('.nut-vien').forEach(btn => {
        if (btn.innerText.includes('Đề nghị sửa')) {
            btn.addEventListener('click', () => {
                ThongBao.fire({
                    title: 'Nhập hạn nhận mới:',
                    input: 'text',
                    inputValue: '24/10/2026',
                    showCancelButton: true,
                    confirmButtonText: 'Lưu'
                }).then(res => {
                    if (res.isConfirmed && res.value) {
                        // Tìm thẻ ngày ngoài màn hình để sửa chữ
                        const theNgay = document.getElementById('hien-thi-ngay');
                        if (theNgay) theNgay.innerText = res.value;
                        ThongBao.fire('Đã lưu!', 'Giao diện đã cập nhật.', 'success');
                    }
                });
            });
        }
    });

    // Nút Yêu cầu hủy
    document.querySelectorAll('.nut-vien.chu-do').forEach(btn => {
        if (btn.innerText.includes('Yêu cầu hủy')) {
            btn.addEventListener('click', () => {
                ThongBao.fire({
                    title: 'Xóa nhu cầu này?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Đồng ý',
                    confirmButtonColor: '#dc3545'
                }).then(res => {
                    if (res.isConfirmed) ThongBao.fire('Đã hủy', '', 'success');
                });
            });
        }
    });

    // Nút Yêu cầu sửa bản ghi (Form dưới)
    const btnSuaBanGhi = document.getElementById('nutSuaBanGhi');
    if (btnSuaBanGhi) {
        btnSuaBanGhi.addEventListener('click', () => {
            ThongBao.fire({
                title: 'Lý do sửa bản ghi:',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Gửi'
            }).then(res => {
                if (res.isConfirmed && res.value) ThongBao.fire('Đã gửi', '', 'success');
            });
        });
    }

    // Nút Gửi yêu cầu thay đổi (Lấy chữ từ thẻ textarea)
    const btnGuiYeuCau = document.getElementById('nutGuiYeuCau');
    if (btnGuiYeuCau) {
        btnGuiYeuCau.addEventListener('click', () => {
            const oNhap = document.querySelector('textarea');
            if (!oNhap || oNhap.value.trim() === '') {
                ThongBao.fire('Lỗi', 'Bạn chưa nhập lý do!', 'error');
            } else {
                ThongBao.fire('Thành công', 'Đã gửi yêu cầu.', 'success');
                oNhap.value = ''; // Xóa chữ đi
            }
        });
    }

    // Nút Xem tài liệu
    document.querySelectorAll('.tep-dinh-kem a, .hop-tai-tep a').forEach(link => {
        link.addEventListener('click', () => {
            ThongBao.fire({
                title: 'Xem tài liệu',
                imageUrl: 'https://images.unsplash.com/photo-1616628188506-4bf98f44d184?q=80&w=600&auto=format&fit=crop',
                imageWidth: 600,
                confirmButtonText: 'Đóng'
            });
        });
    });
});