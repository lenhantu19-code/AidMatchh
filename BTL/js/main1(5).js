document.addEventListener('DOMContentLoaded', () => {
    // 1. TOAST NOTIFICATION MƯỢT MÀ
    const hopThongBao = document.getElementById('thongBaoChinh');
    const tieuDeThongBao = hopThongBao.querySelector('strong');
    const moTaThongBao = document.getElementById('noiDungThongBaoChinh');
    let timeoutId;

    const hienThiThongBao = (tieuDe, moTa, laLoi = false) => {
        clearTimeout(timeoutId);
        hopThongBao.className = laLoi ? 'hop-thong-bao loi' : 'hop-thong-bao thanh-cong';
        hopThongBao.querySelector('.bieu-tuong-lon').className = laLoi ? 'fas fa-exclamation-circle bieu-tuong-lon' : 'fas fa-check-circle bieu-tuong-lon';
        tieuDeThongBao.textContent = tieuDe;
        moTaThongBao.textContent = moTa;
        
        hopThongBao.style.display = 'flex';
        setTimeout(() => { hopThongBao.style.opacity = '1'; hopThongBao.style.transform = 'translateY(0)'; }, 10);
        timeoutId = setTimeout(() => {
            hopThongBao.style.opacity = '0';
            hopThongBao.style.transform = 'translateY(-10px)';
            setTimeout(() => { hopThongBao.style.display = 'none'; }, 300);
        }, 3000);
    };

    // 2. HIỆU ỨNG TẢI NÚT BẤM (LOADING)
    const datTrangThaiTai = (nut, dangTai) => {
        if (dangTai) {
            if (!nut.dataset.htmlGoc) nut.dataset.htmlGoc = nut.innerHTML;
            nut.disabled = true;
            nut.style.opacity = '0.7';
            nut.style.cursor = 'not-allowed';
            nut.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>Đang xử lý...</span>`;
        } else {
            nut.disabled = false;
            nut.style.opacity = '1';
            nut.style.cursor = 'pointer';
            nut.innerHTML = nut.dataset.htmlGoc;
        }
    };

    // 3. TÌM KIẾM THỜI GIAN THỰC & LỌC TAB
    const oTimKiem = document.querySelector('.o-tim-kiem input');
    const cacThongBao = document.querySelectorAll('.the-thong-bao');
    const cacTab = document.querySelectorAll('.tab-btn');
    const textHienThiKetQua = document.querySelector('.hien-thi-ket-qua');

    const apDungBoLoc = () => {
        const tuKhoa = oTimKiem.value.toLowerCase().trim();
        const tabDangChon = document.querySelector('.tab-btn.dang-hoat-dong').getAttribute('data-tab');
        let dem = 0;

        cacThongBao.forEach(tb => {
            const textLienQuan = tb.querySelector('.noi-dung-tb').textContent.toLowerCase();
            const laChuaDoc = tb.classList.contains('chua-doc');
            
            const khopKhoa = textLienQuan.includes(tuKhoa);
            const khopTab = (tabDangChon === 'all') || (tabDangChon === 'unread' && laChuaDoc) || (tabDangChon === 'read' && !laChuaDoc);

            if (khopKhoa && khopTab) {
                tb.style.display = 'flex';
                dem++;
            } else {
                tb.style.display = 'none';
            }
        });
        textHienThiKetQua.textContent = tuKhoa ? `Tìm thấy ${dem} kết quả` : `Hiển thị ${dem} thông báo`;
    };

    oTimKiem.addEventListener('input', apDungBoLoc);
    cacTab.forEach(tab => {
        tab.addEventListener('click', (e) => {
            cacTab.forEach(t => t.classList.remove('dang-hoat-dong'));
            e.currentTarget.classList.add('dang-hoat-dong');
            apDungBoLoc();
        });
    });

    const capNhatSoLuongChuaDoc = () => {
        const chuaDoc = document.querySelectorAll('.the-thong-bao.chua-doc').length;
        const tongSo = cacThongBao.length;
        
        cacTab.forEach(tab => {
            const loai = tab.getAttribute('data-tab');
            if (loai === 'all') tab.textContent = `Tất cả (${tongSo})`;
            if (loai === 'unread') tab.textContent = `Chưa đọc (${chuaDoc})`;
            if (loai === 'read') tab.textContent = `Đã đọc (${tongSo - chuaDoc})`;
        });

        const nhanMoi = document.getElementById('demThongBaoMoi');
        if (nhanMoi) {
            nhanMoi.style.display = chuaDoc > 0 ? 'inline-block' : 'none';
            nhanMoi.textContent = `${chuaDoc} mới`;
        }
    };

    // 4. SỰ KIỆN TƯƠNG TÁC: ĐÁNH DẤU, MỞ CHI TIẾT (INLINE), GỬI FORM
    const containerThongBao = document.querySelector('.danh-sach-thong-bao');

    // Hàm phụ: Biến thành đã đọc
    const thanhDaDoc = (theTB) => {
        if (!theTB.classList.contains('chua-doc')) return;
        theTB.classList.remove('chua-doc');
        theTB.classList.add('da-doc');
        theTB.setAttribute('data-status', 'read');
        theTB.querySelector('.trang-thai-tb').innerHTML = `<span class="nhan-da-doc">Đã đọc</span>`;
        theTB.querySelector('h3').style.fontWeight = '500';
        const nutCheck = theTB.querySelector('.btn-danh-dau-doc');
        if (nutCheck) nutCheck.style.display = 'none';
    };

    containerThongBao.addEventListener('click', async (e) => {
        const nutAn = e.target.closest('button');
        if (!nutAn) return;

        const theThongBao = nutAn.closest('.the-thong-bao');

        // NÚT: ĐÁNH DẤU ĐÃ ĐỌC
        if (nutAn.classList.contains('btn-danh-dau-doc')) {
            datTrangThaiTai(nutAn, true);
            await new Promise(r => setTimeout(r, 400));
            thanhDaDoc(theThongBao);
            capNhatSoLuongChuaDoc();
            apDungBoLoc();
            return;
        }

        // NÚT: MỞ CHI TIẾT INLINE
        if (nutAn.classList.contains('btn-mo-chi-tiet')) {
            const vungChiTiet = theThongBao.querySelector('.vung-chi-tiet-mo-rong');
            const chuSpan = nutAn.querySelector('span');
            const iconNut = nutAn.querySelector('i');
            const dangMo = nutAn.getAttribute('data-mo') === 'true';

            datTrangThaiTai(nutAn, true);
            await new Promise(r => setTimeout(r, 300)); // Load mượt
            
            if (dangMo) {
                // ĐÓNG
                vungChiTiet.style.display = 'none';
                nutAn.setAttribute('data-mo', 'false');
                chuSpan.textContent = nutAn.dataset.textGoc;
                iconNut.className = nutAn.dataset.iconGoc;
                theThongBao.classList.remove('dang-mo');
                datTrangThaiTai(nutAn, false);
            } else {
                // MỞ
                if (!nutAn.dataset.textGoc) {
                    nutAn.dataset.textGoc = chuSpan.textContent;
                    nutAn.dataset.iconGoc = iconNut.className;
                }
                vungChiTiet.style.display = 'block';
                nutAn.setAttribute('data-mo', 'true');
                
                // Khôi phục nút về trạng thái thường nhưng text/icon mới
                datTrangThaiTai(nutAn, false);
                nutAn.querySelector('span').textContent = 'Đóng lại';
                nutAn.querySelector('i').className = 'fas fa-chevron-up';
                theThongBao.classList.add('dang-mo');
                
                // Tiện thể đánh dấu đã đọc
                thanhDaDoc(theThongBao);
                capNhatSoLuongChuaDoc();
            }
            return;
        }

        // NÚT: XÁC NHẬN FORM (bên trong thẻ mở rộng)
        if (nutAn.classList.contains('btn-xac-nhan-form')) {
            datTrangThaiTai(nutAn, true);
            await new Promise(r => setTimeout(r, 1000));
            datTrangThaiTai(nutAn, false);
            
            hienThiThongBao('Đã cập nhật', 'Thông tin của bạn đã được ghi nhận vào hệ thống.');
            
            // Tự đóng thẻ
            theThongBao.querySelector('.btn-mo-chi-tiet').click();
            return;
        }
    });

    // 5. NÚT ĐÁNH DẤU TẤT CẢ (TRÊN HEADER)
    const btnDanhDauTatCa = document.getElementById('btnDanhDauTatCa');
    if (btnDanhDauTatCa) {
        btnDanhDauTatCa.addEventListener('click', async () => {
            const chuaDocs = document.querySelectorAll('.the-thong-bao.chua-doc');
            if (chuaDocs.length === 0) return hienThiThongBao('Thông báo', 'Bạn không có thông báo mới.');

            datTrangThaiTai(btnDanhDauTatCa, true);
            await new Promise(r => setTimeout(r, 600));
            datTrangThaiTai(btnDanhDauTatCa, false);

            chuaDocs.forEach(tb => thanhDaDoc(tb));
            capNhatSoLuongChuaDoc();
            apDungBoLoc();
            hienThiThongBao('Hoàn tất', 'Tất cả thông báo đã được đánh dấu đọc.');
        });
    }

    // Khởi tạo ban đầu
    capNhatSoLuongChuaDoc();
    apDungBoLoc();
});