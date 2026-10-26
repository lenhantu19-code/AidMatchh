document.addEventListener('DOMContentLoaded', () => {
    /* ================================================================
       1. HỆ THỐNG THÔNG BÁO INLINE 
       ================================================================ */
    const hopThongBao = document.getElementById('thongBaoChinh');
    const bieuTuongThongBao = hopThongBao.querySelector('.bieu-tuong-lon');
    const tieuDeThongBao = hopThongBao.querySelector('strong');
    const moTaThongBao = hopThongBao.querySelector('p');

    hopThongBao.style.display = 'none';
    hopThongBao.style.opacity = '0';
    hopThongBao.style.transform = 'translateY(-10px)';
    hopThongBao.style.transition = 'all 0.3s ease';

    let timeoutId;

    const hienThiThongBao = (tieuDe, moTa, laLoi = false) => {
        clearTimeout(timeoutId);
        
        if (laLoi) {
            hopThongBao.className = 'hop-thong-bao loi';
            bieuTuongThongBao.className = 'fas fa-exclamation-circle bieu-tuong-lon';
        } else {
            hopThongBao.className = 'hop-thong-bao thanh-cong';
            bieuTuongThongBao.className = 'fas fa-check-circle bieu-tuong-lon';
        }

        tieuDeThongBao.textContent = tieuDe;
        moTaThongBao.textContent = moTa;
        
        hopThongBao.style.display = 'flex';
        
        // Timeout nhỏ để đảm bảo CSS transition chạy mượt
        setTimeout(() => {
            hopThongBao.style.opacity = '1';
            hopThongBao.style.transform = 'translateY(0)';
        }, 10);

        // Tự động tắt sau 4 giây
        timeoutId = setTimeout(() => {
            hopThongBao.style.opacity = '0';
            hopThongBao.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                hopThongBao.style.display = 'none';
            }, 300);
        }, 4000);
    };

    /* ================================================================
       2. QUẢN LÝ TRẠNG THÁI LOADING CỦA NÚT BẤM
       ================================================================ */
    const datTrangThaiTai = (nut, dangTai, chuGoc, iconGoc) => {
        if (dangTai) {
            nut.disabled = true;
            nut.style.opacity = '0.7';
            nut.style.cursor = 'not-allowed';
            nut.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Đang xử lý...`;
        } else {
            nut.disabled = false;
            nut.style.opacity = '1';
            nut.style.cursor = 'pointer';
            nut.innerHTML = `<i class="${iconGoc}"></i> ${chuGoc}`;
        }
    };

    /* ================================================================
       3. XỬ LÝ LƯU HỒ SƠ TÀI KHOẢN (THẺ 1)
       ================================================================ */
    const btnLuuHoSo = document.getElementById('btnLuuHoSo');
    const nhapTen = document.getElementById('nhapTen');
    const nhapEmail = document.getElementById('nhapEmail');
    const thongTinTenHeader = document.querySelector('.thong-tin-ten strong');

    if (btnLuuHoSo) {
        btnLuuHoSo.addEventListener('click', async () => {
            const ten = nhapTen.value.trim();
            const email = nhapEmail.value.trim();

            if (!ten || !email) {
                if(!ten) nhapTen.style.borderColor = 'var(--danger)';
                if(!email) nhapEmail.style.borderColor = 'var(--danger)';
                hienThiThongBao('Thông tin không hợp lệ', 'Vui lòng điền đầy đủ Họ tên và Email.', true);
                return;
            }

            // Giao diện Loading mô phỏng gọi API
            datTrangThaiTai(btnLuuHoSo, true, 'Lưu hồ sơ', 'fas fa-save');
            await new Promise(resolve => setTimeout(resolve, 1500));
            datTrangThaiTai(btnLuuHoSo, false, 'Lưu hồ sơ', 'fas fa-save');

            // Cập nhật tên mới lên Header ngay lập tức
            if (thongTinTenHeader) {
                thongTinTenHeader.textContent = ten;
            }
            
            const gioHienTai = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            const ngayHienTai = new Date().toLocaleDateString('vi-VN');
            hienThiThongBao('Đã lưu thay đổi hồ sơ!', `Cập nhật lúc ${gioHienTai} - ${ngayHienTai}. Thông tin thay đổi sẽ xét duyệt tự động.`);
        });
    }

    /* ================================================================
       4. XỬ LÝ LƯU TỔ CHỨC LIÊN KẾT (THẺ 2)
       ================================================================ */
    const btnLuuToChuc = document.getElementById('btnLuuToChuc');
    const nhapSDT = document.getElementById('nhapSDT');
    const nhapDiaChi = document.getElementById('nhapDiaChi');

    if (btnLuuToChuc) {
        btnLuuToChuc.addEventListener('click', async () => {
            const sdt = nhapSDT.value.trim();
            const diaChi = nhapDiaChi.value.trim();

            if (!sdt || !diaChi) {
                if(!sdt) nhapSDT.style.borderColor = 'var(--danger)';
                if(!diaChi) nhapDiaChi.style.borderColor = 'var(--danger)';
                hienThiThongBao('Thông tin không hợp lệ', 'Vui lòng kiểm tra lại Số điện thoại và Địa chỉ.', true);
                return;
            }

            datTrangThaiTai(btnLuuToChuc, true, 'Lưu tất cả thay đổi', 'fas fa-check');
            await new Promise(resolve => setTimeout(resolve, 1500));
            datTrangThaiTai(btnLuuToChuc, false, 'Lưu tất cả thay đổi', 'fas fa-check');
            
            const gioHienTai = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
            const ngayHienTai = new Date().toLocaleDateString('vi-VN');
            hienThiThongBao('Đã cập nhật tổ chức!', `Thông tin liên lạc và địa chỉ đã được lưu vào lúc ${gioHienTai} - ${ngayHienTai}.`);
        });
    }

    /* ================================================================
       5. CLEAR LỖI KHI ĐANG NHẬP (REAL-TIME)
       ================================================================ */
    const inputs = document.querySelectorAll('.o-nhap');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Khi gõ lại, trả lại viền bình thường
            if (this.id === 'nhapEmail') {
                this.style.borderColor = '#c8e6c9'; 
            } else {
                this.style.borderColor = 'var(--border-color)';
            }
        });
    });
});