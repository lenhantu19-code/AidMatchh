document.addEventListener('DOMContentLoaded', () => {
    const ThongBaoNho = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });

    // 1. NGĂN CHẶN HÀNH VI REFRESH TRANG
    document.body.addEventListener('submit', e => {
        if (e.target.tagName === 'FORM') e.preventDefault();
    });
    document.body.addEventListener('click', e => {
        if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });

    // 2. KHỞI TẠO ẨN CHI TIẾT
    const allItems = Array.from(document.querySelectorAll('.the-cam-ket'));
    allItems.forEach(item => {
        let chiTiet = item.nextElementSibling;
        if (chiTiet && chiTiet.classList.contains('vung-chi-tiet-cam-ket')) {
            if (!item.classList.contains('dang-mo')) {
                chiTiet.style.display = 'none';
            }
        }
    });

    // 3. CHỨC NĂNG TÌM KIẾM & LỌC ĐA ĐIỀU KIỆN
    const searchInput = document.querySelector('.o-tim-kiem input');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const locTrangThai = document.getElementById('locTrangThai');
    const locThoiGian = document.getElementById('locThoiGian');

    function thucHienLoc() {
        const tuKhoa = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const tabHienTai = document.querySelector('.tab-btn.dang-hoat-dong').innerText.trim();
        const trangThaiDropdown = locTrangThai ? locTrangThai.value : 'all';
        const danhSachHienTai = Array.from(document.querySelectorAll('.the-cam-ket'));

        danhSachHienTai.forEach(item => {
            const noiDungItem = item.innerText.toLowerCase();
            const nhanTrangThai = item.querySelector('.nhan-trang-thai')?.innerText.trim() || '';
            const khopTuKhoa = tuKhoa === '' || noiDungItem.includes(tuKhoa);
            
            // Lọc Tab
            let khopTab = false;
            if (tabHienTai.includes('Tất cả')) khopTab = true;
            else if (tabHienTai === 'Đang giao' && nhanTrangThai.includes('Đang giao')) khopTab = true;
            else if (tabHienTai === 'Hoàn thành' && nhanTrangThai.includes('Hoàn thành')) khopTab = true;
            else if (tabHienTai === 'Đã hủy' && nhanTrangThai.includes('hủy')) khopTab = true;
            else if (tabHienTai === 'Chờ xác nhận' && (nhanTrangThai.includes('Chờ') || nhanTrangThai.includes('Đã xác nhận') || nhanTrangThai.includes('Vừa tạo'))) khopTab = true;

            // Lọc Dropdown
            let khopDropdown = false;
            if (trangThaiDropdown === 'all') khopDropdown = true;
            else if (trangThaiDropdown === 'dang' && nhanTrangThai.includes('Đang giao')) khopDropdown = true;
            else if (trangThaiDropdown === 'hoan_thanh' && nhanTrangThai.includes('Hoàn thành')) khopDropdown = true;
            else if (trangThaiDropdown === 'huy' && nhanTrangThai.includes('hủy')) khopDropdown = true;
            else if (trangThaiDropdown === 'cho' && (nhanTrangThai.includes('Chờ') || nhanTrangThai.includes('Đã xác nhận') || nhanTrangThai.includes('Vừa tạo'))) khopDropdown = true;

            let chiTiet = item.nextElementSibling;
            const laVungChiTiet = chiTiet && chiTiet.classList.contains('vung-chi-tiet-cam-ket');

            if (khopTuKhoa && khopTab && khopDropdown) {
                item.style.display = 'block';
                if (laVungChiTiet && item.classList.contains('dang-mo')) chiTiet.style.display = 'block';
            } else {
                item.style.display = 'none';
                if (laVungChiTiet) chiTiet.style.display = 'none';
            }
        });
    }

    if (searchInput) searchInput.addEventListener('input', thucHienLoc);
    if (locTrangThai) locTrangThai.addEventListener('change', thucHienLoc);
    if (locThoiGian) locThoiGian.addEventListener('change', () => ThongBaoNho.fire({ icon: 'info', title: 'Đã sắp xếp danh sách' }));

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('dang-hoat-dong'));
            this.classList.add('dang-hoat-dong');
            thucHienLoc();
        });
    });

    // 4. EVENT DELEGATION
    document.body.addEventListener('click', (e) => {
        
        // --- A. BẤM VÀO XEM CHI TIẾT ---
        const nutMoRong = e.target.closest('.nut-mo-rong');
        if (nutMoRong) {
            e.preventDefault();
            const theCamKet = nutMoRong.closest('.the-cam-ket');
            let chiTiet = theCamKet.nextElementSibling;

            // Nếu chưa có chi tiết -> Gọi template "Đơn trắng" từ HTML ra
            if (!chiTiet || !chiTiet.classList.contains('vung-chi-tiet-cam-ket')) {
                const maCK = theCamKet.querySelector('strong')?.innerText || 'CK-MỚI';
                const moTa = theCamKet.querySelector('.chi-tiet-item')?.innerText || 'Đang cập nhật...';
                
                const template = document.getElementById('template-don-trang');
                const clone = template.content.cloneNode(true);
                
                clone.querySelector('.tmpl-tieude').innerText = `${maCK}: Đang chờ xác nhận`;
                clone.querySelector('.tmpl-mota').innerText = moTa;
                
                theCamKet.insertAdjacentElement('afterend', clone.firstElementChild);
                chiTiet = theCamKet.nextElementSibling; // Gán lại biến
                chiTiet.style.display = 'none';
            }

            const dangMo = theCamKet.classList.contains('dang-mo');
            if (dangMo) {
                theCamKet.classList.remove('dang-mo');
                chiTiet.style.display = 'none';
                nutMoRong.innerHTML = 'Xem chi tiết <i class="fa-solid fa-chevron-down"></i>';
            } else {
                theCamKet.classList.add('dang-mo');
                chiTiet.style.display = 'block';
                nutMoRong.innerHTML = 'Thu gọn <i class="fa-solid fa-chevron-up"></i>';
            }
        }

        // --- B. TẠO CAM KẾT MỚI (Bật form đã tạo sẵn trong HTML) ---
        if (e.target.closest('#btnTaoCamKet')) {
            document.getElementById('formTaoCamKetMoi').style.display = 'block';
            document.getElementById('nhapMaNC').focus();
        }

        if (e.target.closest('#btnHuyTaoCamKet')) {
            document.getElementById('formTaoCamKetMoi').style.display = 'none';
        }

        if (e.target.closest('#btnLuuCamKetThucTe')) {
            const maNC = document.getElementById('nhapMaNC').value.trim();
            const soLuong = document.getElementById('nhapSoLuong').value.trim();
            const ngayGiao = document.getElementById('nhapNgayGiao').value;

            if (!maNC || !soLuong) {
                ThongBaoNho.fire({ icon: 'error', title: 'Vui lòng nhập đủ thông tin!' });
                return;
            }

            let textNgay = 'Chưa xác định';
            if (ngayGiao) {
                const d = new Date(ngayGiao);
                textNgay = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()}`;
            }

            const maMoi = Math.floor(Math.random() * 1000) + 100;
            
            // Gọi Template Item Cam Kết từ HTML
            const template = document.getElementById('template-item-cam-ket');
            const clone = template.content.cloneNode(true);
            
            clone.querySelector('.tmpl-mack').innerText = `CK-${maMoi}`;
            clone.querySelector('.tmpl-manc').innerText = maNC.toUpperCase();
            clone.querySelector('.tmpl-soluong').innerText = soLuong;
            clone.querySelector('.tmpl-hangiao').innerText = textNgay;

            document.querySelector('.danh-sach-cam-ket').prepend(clone);
            
            // Reset và ẩn form
            document.getElementById('formTaoCamKetMoi').style.display = 'none';
            document.getElementById('nhapMaNC').value = '';
            document.getElementById('nhapSoLuong').value = '';
            document.getElementById('nhapNgayGiao').value = '';
            
            ThongBaoNho.fire({ icon: 'success', title: 'Cam kết mới đã được tạo!' });
            thucHienLoc();
        }

        // --- C. SỬA LỊCH INLINE (Nhỏ gọn, chỉ là Text Box) ---
        const nutSuaLich = e.target.closest('.btn-sua-lich');
        if (nutSuaLich) {
            e.preventDefault();
            if (nutSuaLich.classList.contains('dang-sua')) return;
            
            nutSuaLich.classList.add('dang-sua');
            nutSuaLich.innerHTML = `
                <div style="display: flex; gap: 5px; align-items: center; background: #fff; padding: 2px 4px; border: 1px solid var(--border-color); border-radius: 4px;">
                    <input type="date" class="input-chon-ngay-nhanh" style="border:none; outline:none; font-size: 12px; background: transparent;">
                    <i class="fa-solid fa-check text-success btn-luu-lich-nhanh" style="cursor: pointer; padding: 4px;" title="Lưu"></i>
                    <i class="fa-solid fa-xmark text-danger btn-huy-lich-nhanh" style="cursor: pointer; padding: 4px;" title="Hủy"></i>
                </div>
            `;
        }

        if (e.target.closest('.btn-luu-lich-nhanh')) {
            e.preventDefault(); e.stopPropagation();
            const linkNode = e.target.closest('.btn-sua-lich');
            const newDate = linkNode.querySelector('.input-chon-ngay-nhanh').value;
            const theCamKet = linkNode.closest('.the-cam-ket');
            const chiTietItem = theCamKet.querySelector('.chi-tiet-item');

            if (newDate) {
                const d = new Date(newDate);
                const textNgayMoi = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()}`;
                chiTietItem.innerHTML = chiTietItem.innerHTML.replace(/(Hạn giao:\s*)([\d\/]+|Chưa xác định)/, `$1${textNgayMoi}`);
                ThongBaoNho.fire({ icon: 'success', title: 'Đã cập nhật lịch' });
            }
            linkNode.classList.remove('dang-sua');
            linkNode.innerHTML = 'Sửa lịch';
        }

        if (e.target.closest('.btn-huy-lich-nhanh')) {
            e.preventDefault(); e.stopPropagation();
            const linkNode = e.target.closest('.btn-sua-lich');
            linkNode.classList.remove('dang-sua');
            linkNode.innerHTML = 'Sửa lịch';
        }

        // --- D. CÁC NÚT TƯƠNG TÁC CHUNG BÊN TRONG CHI TIẾT ĐƠN ---
        if (e.target.closest('.btnGuiCapNhat')) ThongBaoNho.fire({ icon: 'success', title: 'Bằng chứng bàn giao đã gửi đi.' });
        if (e.target.closest('.vungTaiTep')) ThongBaoNho.fire({ icon: 'info', title: 'Đang mở cửa sổ chọn tệp...' });
        if (e.target.closest('.btnDeNghiSua')) ThongBaoNho.fire({ icon: 'success', title: 'Đã gửi đề xuất chỉnh sửa.' });
        
        if (e.target.closest('.btnYeuCauHuy')) {
            const formHuy = e.target.closest('.form-huy');
            const lyDo = formHuy.querySelector('textarea').value.trim();
            if (lyDo === '') {
                ThongBaoNho.fire({ icon: 'warning', title: 'Vui lòng nhập lý do hủy!' });
                return;
            }
            ThongBaoNho.fire({ icon: 'success', title: 'Đã tiếp nhận yêu cầu hủy.' });
            formHuy.querySelector('textarea').value = '';
        }
        
        if (e.target.closest('.btnCapNhatDotGiao')) {
            ThongBaoNho.fire({ icon: 'success', title: 'Đã cập nhật trạng thái đợt giao.' });
        }
    });
});