document.addEventListener('DOMContentLoaded', () => {
    /* ================================================================
       1. HỆ THỐNG THÔNG BÁO INLINE (NON-DISRUPTIVE)
       Sử dụng chính thẻ .hop-thong-bao có sẵn để tạo hiệu ứng mượt mà
       ================================================================ */
    const hopThongBao = document.querySelector('.hop-thong-bao');
    const bieuTuongThongBao = hopThongBao.querySelector('.bieu-tuong-lon');
    const tieuDeThongBao = hopThongBao.querySelector('strong');
    const moTaThongBao = hopThongBao.querySelector('p');

    // Khởi tạo trạng thái ẩn ban đầu cho thông báo
    hopThongBao.style.display = 'none';
    hopThongBao.style.opacity = '0';
    hopThongBao.style.transform = 'translateY(-10px)';
    hopThongBao.style.transition = 'all 0.3s ease';

    let thongBaoTimeout;

    const hienThiThongBao = (tieuDe, moTa, laLoi = false) => {
        clearTimeout(thongBaoTimeout);
        
        // Thay đổi giao diện tùy theo trạng thái (Lỗi / Thành công)
        if (laLoi) {
            hopThongBao.className = 'hop-thong-bao';
            hopThongBao.style.backgroundColor = 'var(--mau-loi-nhat, #fef2f2)';
            hopThongBao.style.borderLeft = '4px solid var(--mau-loi, #ef4444)';
            bieuTuongThongBao.className = 'fas fa-exclamation-circle bieu-tuong-lon';
            bieuTuongThongBao.style.color = 'var(--mau-loi, #ef4444)';
            tieuDeThongBao.style.color = '#991b1b';
            moTaThongBao.style.color = '#b91c1c';
        } else {
            hopThongBao.className = 'hop-thong-bao thanh-cong';
            hopThongBao.style.backgroundColor = 'var(--mau-thanh-cong-nhat, #d1e7dd)';
            hopThongBao.style.borderLeft = '4px solid var(--mau-thanh-cong, #198754)';
            bieuTuongThongBao.className = 'fas fa-check-circle bieu-tuong-lon';
            bieuTuongThongBao.style.color = 'var(--mau-thanh-cong, #198754)';
            tieuDeThongBao.style.color = '#146c43';
            moTaThongBao.style.color = '#198754';
        }

        tieuDeThongBao.textContent = tieuDe;
        moTaThongBao.textContent = moTa;

        // Hiệu ứng trượt xuống và rõ dần
        hopThongBao.style.display = 'flex';
        setTimeout(() => {
            hopThongBao.style.opacity = '1';
            hopThongBao.style.transform = 'translateY(0)';
        }, 10);

        // Tự động ẩn sau 4 giây
        thongBaoTimeout = setTimeout(() => {
            hopThongBao.style.opacity = '0';
            hopThongBao.style.transform = 'translateY(-10px)';
            setTimeout(() => hopThongBao.style.display = 'none', 300);
        }, 4000);
    };

    /* ================================================================
       2. HÀM HỖ TRỢ HIỆU ỨNG NÚT BẤM (LOADING STATE)
       ================================================================ */
    const datTrangThaiTai = (nut, dangTai, chuGoc, iconClass) => {
        if (dangTai) {
            nut.disabled = true;
            nut.style.opacity = '0.7';
            nut.style.cursor = 'not-allowed';
            nut.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Đang xử lý...`;
        } else {
            nut.disabled = false;
            nut.style.opacity = '1';
            nut.style.cursor = 'pointer';
            nut.innerHTML = `<i class="${iconClass}"></i> ${chuGoc}`;
        }
    };

    /* ================================================================
       3. XỬ LÝ THANH ĐIỀU HƯỚNG BÊN TRÁI (SIDEBAR)
       ================================================================ */
    const cacMucMenu = document.querySelectorAll('.danh-sach-menu li');
    cacMucMenu.forEach(muc => {
        muc.addEventListener('click', function() {
            // Xóa class active ở tất cả các mục
            cacMucMenu.forEach(m => m.classList.remove('muc-dang-chon'));
            // Thêm class active vào mục được click
            this.classList.add('muc-dang-chon');
        });
    });

    /* ================================================================
       4. XỬ LÝ LƯU TÙY CHỌN THÔNG BÁO
       ================================================================ */
    const nutLuuThongBao = document.getElementById('nut-luu-thong-bao');
    const nutLuuTong = document.getElementById('nut-luu-tong');

    const xuLyLuuThongBao = async (nut) => {
        datTrangThaiTai(nut, true, nut.textContent.trim(), nut.querySelector('i').className);
        
        // Giả lập độ trễ mạng (1.5 giây)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        datTrangThaiTai(nut, false, nut === nutLuuTong ? 'Lưu thay đổi' : 'Lưu tùy chọn', nut === nutLuuTong ? 'fas fa-save' : 'fas fa-check');
        
        const gioHienTai = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        const ngayHienTai = new Date().toLocaleDateString('vi-VN');
        hienThiThongBao('Đã lưu tùy chọn thành công!', `Cập nhật lúc ${gioHienTai} - ${ngayHienTai}. Hệ thống đã ghi nhận các thiết lập của bạn.`);
    };

    if (nutLuuThongBao) nutLuuThongBao.addEventListener('click', () => xuLyLuuThongBao(nutLuuThongBao));
    if (nutLuuTong) nutLuuTong.addEventListener('click', () => xuLyLuuThongBao(nutLuuTong));

    /* ================================================================
       5. XÁC THỰC MẬT KHẨU THỜI GIAN THỰC (REAL-TIME VALIDATION)
       ================================================================ */
    const formBaoMat = document.querySelector('.form-bao-mat');
    const cacONhap = formBaoMat.querySelectorAll('.o-nhap');
    
    // Lấy các ô nhập dựa theo thứ tự trong HTML
    const oMatKhauHienTai = cacONhap[0];
    const oMatKhauMoi = cacONhap[1];
    const oXacNhanMatKhau = cacONhap[2];
    
    const khungNhapMkMoi = oMatKhauMoi.closest('.khung-nhap');
    const khungNhapXacNhan = oXacNhanMatKhau.closest('.khung-nhap');
    
    const thongBaoLoiMKMoi = khungNhapMkMoi.nextElementSibling; // Thẻ span báo lỗi
    const iconLoiMKMoi = khungNhapMkMoi.querySelector('.icon-loi');

    // Dọn dẹp trạng thái lỗi tĩnh được code cứng trong HTML ban đầu
    oMatKhauMoi.value = '';
    oMatKhauHienTai.value = '';
    khungNhapMkMoi.classList.remove('trang-thai-loi');
    if(iconLoiMKMoi) iconLoiMKMoi.style.display = 'none';
    thongBaoLoiMKMoi.style.display = 'none';

    // Hàm kiểm tra độ mạnh mật khẩu (Ít nhất 8 ký tự, có hoa, thường, số)
    const kiemTraMatKhauManh = (mk) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\W]{8,}$/;
        return regex.test(mk);
    };

    // Hàm cập nhật giao diện lỗi inline
    const capNhatLoiInline = (khungNhap, theThongBao, coLoi, cauThongBao = '') => {
        const iconLoi = khungNhap.querySelector('.icon-loi');
        if (coLoi) {
            khungNhap.classList.add('trang-thai-loi');
            khungNhap.style.borderColor = 'var(--mau-loi, #ef4444)';
            theThongBao.style.display = 'block';
            theThongBao.style.color = 'var(--mau-loi, #ef4444)';
            theThongBao.innerHTML = `<i class="fas fa-times-circle"></i> ${cauThongBao}`;
            if(iconLoi) iconLoi.style.display = 'block';
        } else {
            khungNhap.classList.remove('trang-thai-loi');
            khungNhap.style.borderColor = 'var(--border-color, #e9ecef)';
            theThongBao.style.display = 'none';
            if(iconLoi) iconLoi.style.display = 'none';
        }
    };

    // Kiểm tra trực tiếp khi người dùng đang gõ
    oMatKhauMoi.addEventListener('input', (e) => {
        const mk = e.target.value;
        if (mk.length > 0 && !kiemTraMatKhauManh(mk)) {
            capNhatLoiInline(khungNhapMkMoi, thongBaoLoiMKMoi, true, 'Có ít nhất 8 ký tự và có chữ hoa, chữ thường, số');
        } else {
            capNhatLoiInline(khungNhapMkMoi, thongBaoLoiMKMoi, false);
        }
    });

    /* ================================================================
       6. XỬ LÝ ĐỔI MẬT KHẨU
       ================================================================ */
    const nutDoiMatKhau = document.getElementById('nut-doi-mat-khau');
    
    // Tạo sẵn một the span báo lỗi cho ô Xác nhận mật khẩu nếu chưa có
    let thongBaoLoiXacNhan = khungNhapXacNhan.nextElementSibling;
    if (!thongBaoLoiXacNhan || !thongBaoLoiXacNhan.classList.contains('dong-thong-bao-loi')) {
        thongBaoLoiXacNhan = document.createElement('span');
        thongBaoLoiXacNhan.className = 'dong-thong-bao-loi';
        thongBaoLoiXacNhan.style.display = 'none';
        khungNhapXacNhan.parentNode.insertBefore(thongBaoLoiXacNhan, khungNhapXacNhan.nextSibling);
    }

    nutDoiMatKhau.addEventListener('click', async () => {
        const mkHienTai = oMatKhauHienTai.value;
        const mkMoi = oMatKhauMoi.value;
        const mkXacNhan = oXacNhanMatKhau.value;
        let coLoi = false;

        // Reset lỗi
        capNhatLoiInline(khungNhapXacNhan, thongBaoLoiXacNhan, false);

        if (!mkHienTai || !mkMoi || !mkXacNhan) {
            hienThiThongBao('Thiếu thông tin', 'Vui lòng điền đầy đủ các trường mật khẩu.', true);
            return;
        }

        if (!kiemTraMatKhauManh(mkMoi)) {
            capNhatLoiInline(khungNhapMkMoi, thongBaoLoiMKMoi, true, 'Mật khẩu mới chưa đạt yêu cầu bảo mật.');
            return;
        }

        if (mkMoi !== mkXacNhan) {
            capNhatLoiInline(khungNhapXacNhan, thongBaoLoiXacNhan, true, 'Xác nhận mật khẩu không khớp.');
            return;
        }

        // Xử lý đổi mật khẩu mượt mà
        datTrangThaiTai(nutDoiMatKhau, true, 'Đổi mật khẩu', 'fas fa-sync-alt');
        await new Promise(resolve => setTimeout(resolve, 1500)); // Giả lập API
        datTrangThaiTai(nutDoiMatKhau, false, 'Đổi mật khẩu', 'fas fa-sync-alt');

        // Thành công: Xóa trắng form và hiện thông báo
        oMatKhauHienTai.value = '';
        oMatKhauMoi.value = '';
        oXacNhanMatKhau.value = '';
        hienThiThongBao('Đổi mật khẩu thành công', 'Tài khoản của bạn đã được cập nhật mật khẩu mới an toàn.');
    });

    /* ================================================================
       7. XỬ LÝ ĐĂNG XUẤT THIẾT BỊ KHÁC
       ================================================================ */
    const nutDangXuat = document.getElementById('nut-dang-xuat');
    if (nutDangXuat) {
        nutDangXuat.addEventListener('click', async () => {
            datTrangThaiTai(nutDangXuat, true, 'Đăng xuất thiết bị khác', 'fas fa-sign-out-alt');
            
            await new Promise(resolve => setTimeout(resolve, 1200));
            
            datTrangThaiTai(nutDangXuat, false, 'Đăng xuất thiết bị khác', 'fas fa-sign-out-alt');
            hienThiThongBao('Đã đăng xuất', 'Tất cả các phiên làm việc trên thiết bị khác đã bị hủy.', false);
        });
    }
});