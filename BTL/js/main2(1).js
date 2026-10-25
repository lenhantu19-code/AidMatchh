document.addEventListener('DOMContentLoaded', () => {
    // Tích hợp SweetAlert chống giật trang
    const ThongBao = Swal.mixin({ heightAuto: false });

    // --- 1. CHỐNG LỖI TẢI LẠI & GIẬT TRANG ---
    document.querySelectorAll('form').forEach(f => f.addEventListener('submit', e => e.preventDefault()));
    document.querySelectorAll('button').forEach(b => b.setAttribute('type', 'button'));
    document.querySelectorAll('a[href="#"], a[href=""]').forEach(a => {
        a.addEventListener('click', e => e.preventDefault());
    });

    // --- 2. MENU SIDEBAR (Chuyển trang) ---
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
    document.addEventListener('DOMContentLoaded', () => {
    // ===============================================
    // 1. LOGIC MENU CHUẨN (MỞ LÀ SÁNG, BẤM LÀ ĐỔI MÀU)
    // ===============================================
    const tatCaMenu = document.querySelectorAll('.danh-sach-menu li');

    // Xóa sạch màu xanh cũ
    tatCaMenu.forEach(li => li.classList.remove('dang-chon'));

    tatCaMenu.forEach(li => {
        // Quét toàn bộ nội dung của thẻ li (Bao gồm cả link href và chữ)
        const noiDung = li.innerHTML.toLowerCase();
        
        // TỰ ĐỘNG SÁNG: Cứ thấy có chữ 'khai-bao' hoặc 'khai báo' là bật màu xanh
        if (noiDung.includes('khai-bao') || noiDung.includes('khai báo') || noiDung.includes('khai bao')) {
            li.classList.add('dang-chon');
        }

        // KHI BẤM CHUỘT: Bấm vào icon, chữ, hay rìa menu đều nhận
        li.addEventListener('click', function(e) {
            const theA = this.querySelector('a');
            const href = theA ? theA.getAttribute('href') : '#';

            if (!href || href === '#') {
                e.preventDefault(); // Chặn giật trang
                tatCaMenu.forEach(item => item.classList.remove('dang-chon'));
                this.classList.add('dang-chon'); // Bôi màu menu vừa bấm
            } else {
                e.preventDefault();
                window.location.href = href; // Có link thì chuyển trang mượt mà
            }
        });
    });

    // ===============================================
    // 2. CÁC NÚT CHỨC NĂNG & CHỐNG LOAD TRANG
    // ===============================================
    document.querySelectorAll('form').forEach(f => f.addEventListener('submit', e => e.preventDefault()));
    document.querySelectorAll('button').forEach(b => b.setAttribute('type', 'button'));

    const ThongBao = Swal.mixin({ heightAuto: false }); // Chống vỡ web

    document.querySelectorAll('.nut-phu').forEach(b => {
        if(b.innerText.includes('Quay lại')) b.addEventListener('click', () => window.history.back());
    });

    document.querySelectorAll('.nut-chinh').forEach(b => {
        if(b.innerText.includes('Lưu thay đổi')) {
            b.addEventListener('click', () => {
                ThongBao.fire({ title: 'Lưu thay đổi?', showCancelButton: true, confirmButtonText: 'Lưu' })
                .then(r => { if(r.isConfirmed) ThongBao.fire('Thành công', 'Đã lưu', 'success'); });
            });
        }
    });

    document.querySelectorAll('.nut-trang').forEach(b => {
        if(b.innerText.includes('Liên hệ')) b.addEventListener('click', () => ThongBao.fire('Đang gọi...', 'Kết nối tổng đài 24/7', 'info'));
    });
});

    // --- 3. CÁC NÚT CHỨC NĂNG ---
    // Nút Quay lại
    document.querySelectorAll('.nut-phu').forEach(btn => {
        if (btn.innerText.includes('Quay lại')) {
            btn.addEventListener('click', () => window.history.back());
        }
    });

    // Nút Lưu thay đổi
    document.querySelectorAll('.nut-chinh').forEach(btn => {
        if (btn.innerText.includes('Lưu thay đổi')) {
            btn.addEventListener('click', () => {
                ThongBao.fire({
                    title: 'Lưu thay đổi?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Lưu',
                    cancelButtonText: 'Hủy'
                }).then(res => {
                    if (res.isConfirmed) ThongBao.fire('Thành công!', 'Đã lưu.', 'success');
                });
            });
        }
    });

    // Nút Liên hệ
    document.querySelectorAll('.nut-trang').forEach(btn => {
        if (btn.innerText.includes('Liên hệ')) {
            btn.addEventListener('click', () => {
                ThongBao.fire('Đang gọi...', 'Đang kết nối tổng đài 24/7.', 'info');
            });
        }
    });
});