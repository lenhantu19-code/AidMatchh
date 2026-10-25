document.addEventListener('DOMContentLoaded', () => {
    /* ================================================================
       1. HỆ THỐNG THÔNG BÁO INLINE (TOAST NOTIFICATION)
       ================================================================ */
    const hopThongBao = document.getElementById('thongBaoChinh');
    const tieuDeThongBao = hopThongBao.querySelector('strong');
    const moTaThongBao = document.getElementById('noiDungThongBaoChinh');
    let timeoutId;

    const hienThiThongBao = (tieuDe, moTa, laLoi = false) => {
        clearTimeout(timeoutId);
        
        if (laLoi) {
            hopThongBao.className = 'hop-thong-bao loi';
            hopThongBao.querySelector('.bieu-tuong-lon').className = 'fas fa-exclamation-circle bieu-tuong-lon';
        } else {
            hopThongBao.className = 'hop-thong-bao thanh-cong';
            hopThongBao.querySelector('.bieu-tuong-lon').className = 'fas fa-check-circle bieu-tuong-lon';
        }

        tieuDeThongBao.textContent = tieuDe;
        moTaThongBao.textContent = moTa;
        
        hopThongBao.style.display = 'flex';
        setTimeout(() => {
            hopThongBao.style.opacity = '1';
            hopThongBao.style.transform = 'translateY(0)';
        }, 10);

        timeoutId = setTimeout(() => {
            hopThongBao.style.opacity = '0';
            hopThongBao.style.transform = 'translateY(-10px)';
            setTimeout(() => { hopThongBao.style.display = 'none'; }, 300);
        }, 4000);
    };

    /* ================================================================
       2. QUẢN LÝ TRẠNG THÁI LOADING
       ================================================================ */
    const datTrangThaiTai = (nut, dangTai) => {
        if (dangTai) {
            if (!nut.dataset.htmlGoc) nut.dataset.htmlGoc = nut.innerHTML;
            nut.disabled = true;
            nut.style.opacity = '0.7';
            nut.style.cursor = 'not-allowed';
            nut.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Đang xử lý...`;
        } else {
            nut.disabled = false;
            nut.style.opacity = '1';
            nut.style.cursor = 'pointer';
            nut.innerHTML = nut.dataset.htmlGoc;
        }
    };

    /* ================================================================
       3. XỬ LÝ CLICK BẢNG DỮ LIỆU
       ================================================================ */
    const vungBang = document.querySelector('.bang-danh-muc');
    const formChinhSua = document.getElementById('khuVucChinhSua');
    const formLuuTru = document.getElementById('khuVucLuuTru');

    vungBang.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-sua')) {
            const hang = e.target.closest('tr');
            const maDM = hang.querySelector('.ma-dm').textContent;
            
            hienThiThongBao('Đang tải dữ liệu', `Mở form chỉnh sửa cho ${maDM}...`);
            formChinhSua.style.boxShadow = '0 0 0 2px var(--primary-color)';
            setTimeout(() => formChinhSua.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.03)', 1500);
            formChinhSua.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        if (e.target.classList.contains('btn-luu-tru')) {
            const hang = e.target.closest('tr');
            const maDM = hang.querySelector('.ma-dm').textContent;
            
            hienThiThongBao('Chuẩn bị lưu trữ', `Mở form xác nhận lưu trữ cho ${maDM}...`);
            formLuuTru.style.boxShadow = '0 0 0 2px var(--danger)';
            setTimeout(() => formLuuTru.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.03)', 1500);
            formLuuTru.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    /* ================================================================
       4. GỬI FORM CHỈNH SỬA VÀ LƯU TRỮ
       ================================================================ */
    const btnLuuDanhMuc = document.getElementById('btnLuuDanhMuc');
    const btnHuyThayDoi = document.getElementById('btnHuyThayDoi');
    const btnXacNhanLuuTru = document.getElementById('btnXacNhanLuuTru');

    if (btnLuuDanhMuc) {
        btnLuuDanhMuc.addEventListener('click', async () => {
            datTrangThaiTai(btnLuuDanhMuc, true);
            await new Promise(r => setTimeout(r, 1200));
            datTrangThaiTai(btnLuuDanhMuc, false);
            
            const hopLoi = document.querySelector('.hop-loi-mau-hong');
            if(hopLoi) hopLoi.style.display = 'none';

            hienThiThongBao('Lưu thành công', 'Danh mục DM-01 đã được cập nhật.');
        });
    }

    if (btnHuyThayDoi) {
        btnHuyThayDoi.addEventListener('click', () => {
            hienThiThongBao('Đã hủy', 'Các thay đổi chưa lưu đã được hoàn tác.');
        });
    }

    if (btnXacNhanLuuTru) {
        btnXacNhanLuuTru.addEventListener('click', async () => {
            const checkboxLuuTru = formLuuTru.querySelector('input[type="checkbox"]');
            
            if (!checkboxLuuTru.checked) {
                hienThiThongBao('Lỗi xác nhận', 'Vui lòng đánh dấu xác nhận đã kiểm tra dữ liệu.', true);
                return;
            }

            datTrangThaiTai(btnXacNhanLuuTru, true);
            await new Promise(r => setTimeout(r, 1200));
            datTrangThaiTai(btnXacNhanLuuTru, false);

            hienThiThongBao('Lưu trữ thành công', 'Danh mục DM-05 đã được chuyển vào kho lưu trữ.');
        });
    }

    /* ================================================================
       5. CHUYỂN TABS DẠNG NÚT (PILL-SHAPE)
       ================================================================ */
    const cacTab = document.querySelectorAll('.tab-btn');
    cacTab.forEach(tab => {
        tab.addEventListener('click', (e) => {
            cacTab.forEach(t => t.classList.remove('dang-hoat-dong'));
            e.currentTarget.classList.add('dang-hoat-dong');
        });
    });
});