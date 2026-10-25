document.addEventListener('DOMContentLoaded', () => {
    const ThongBaoNho = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });

    // Ngăn chặn sự kiện submit mặc định và thẻ a trống
    document.body.addEventListener('submit', e => e.preventDefault());
    document.body.addEventListener('click', e => {
        if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });

    // --- 1. CHỨC NĂNG TÌM KIẾM, LỌC TAB & DROPDOWN ---
    const searchInput = document.querySelector('.o-tim-kiem input');
    const tabBtns = document.querySelectorAll('.tab-btn-text');
    const locDanhMuc = document.getElementById('locDanhMuc');
    const locKhuVuc = document.getElementById('locKhuVuc');
    const locTinhTrang = document.getElementById('locTinhTrang');

    function thucHienLocNguonLuc() {
        const tuKhoa = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const tabDangChon = document.querySelector('.tab-btn-text.dang-hoat-dong').innerText.trim();
        const tinhTrangValue = locTinhTrang ? locTinhTrang.value : 'all';

        const danhSachHang = document.querySelectorAll('.hang-du-lieu-bang');

        danhSachHang.forEach(hang => {
            const textHang = hang.innerText.toLowerCase();
            const khopTuKhoa = tuKhoa === '' || textHang.includes(tuKhoa);

            const laLuuTru = textHang.includes('đã lưu trữ');
            const laSapHetHan = textHang.includes('30/11/2026') || textHang.includes('31/12/2026') || textHang.includes('dưới ngưỡng');

            // Khớp Tab
            let khopTab = false;
            if (tabDangChon.includes('Đang hoạt động')) {
                khopTab = !laLuuTru;
            } else if (tabDangChon.includes('Đã lưu trữ')) {
                khopTab = laLuuTru;
            } else if (tabDangChon.includes('Sắp hết hạn')) {
                khopTab = laSapHetHan && !laLuuTru;
            }

            // Khớp Dropdown tình trạng
            let khopDropdown = true;
            if (tinhTrangValue === 'hoat_dong') khopDropdown = !laLuuTru;
            if (tinhTrangValue === 'sap_het_han') khopDropdown = laSapHetHan;
            if (tinhTrangValue === 'luu_tru') khopDropdown = laLuuTru;

            if (khopTuKhoa && khopTab && khopDropdown) {
                hang.style.display = 'block';
            } else {
                hang.style.display = 'none';
            }
        });
    }

    if (searchInput) searchInput.addEventListener('input', thucHienLocNguonLuc);
    if (locDanhMuc) locDanhMuc.addEventListener('change', thucHienLocNguonLuc);
    if (locKhuVuc) locKhuVuc.addEventListener('change', thucHienLocNguonLuc);
    if (locTinhTrang) locTinhTrang.addEventListener('change', thucHienLocNguonLuc);

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('dang-hoat-dong'));
            this.classList.add('dang-hoat-dong');
            thucHienLocNguonLuc();
        });
    });

    // --- 2. QUẢN LÝ SỰ KIỆN CLICK (EVENT DELEGATION) ---
    document.body.addEventListener('click', (e) => {

        // A. Bật/Tắt Form Thêm Nguồn Lực
        const btnThemNL = e.target.closest('#btnThemNguonLuc');
        const formNL = document.getElementById('formThemNguonLuc');
        if (btnThemNL && formNL) {
            formNL.style.display = 'block';
            document.getElementById('nhapTenNL').focus();
        }

        const btnHuyThem = e.target.closest('#btnHuyThemNL');
        if (btnHuyThem && formNL) {
            formNL.style.display = 'none';
        }

        // B. Lưu Nguồn Lực Mới
        const btnLuuNL = e.target.closest('#btnLuuNLThucTe');
        if (btnLuuNL) {
            const ten = document.getElementById('nhapTenNL').value.trim();
            const sl = document.getElementById('nhapSoLuongNL').value.trim();
            const khuVuc = document.getElementById('nhapKhuVucNL').value.trim();
            const hanDung = document.getElementById('nhapHanDungNL').value;

            if (!ten || !sl) {
                ThongBaoNho.fire({ icon: 'error', title: 'Vui lòng điền đủ Tên và Số lượng!' });
                return;
            }

            let textHan = 'Không áp dụng';
            if (hanDung) {
                const d = new Date(hanDung);
                textHan = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()}`;
            }

            const maNgauNhien = 'NL-0' + Math.floor(Math.random() * 50 + 20);

            const template = document.getElementById('template-hang-nguon-luc');
            const clone = template.content.cloneNode(true);

            clone.querySelector('.tmpl-tieu-de').innerText = `${maNgauNhien} • ${ten}`;
            clone.querySelector('.tmpl-lo').innerText = `Lô ban đầu: ${sl}`;
            clone.querySelector('.tmpl-mota').innerText = `Sẵn có / giữ / giao: ${sl} / 0 / 0 • Khu vực • hạn dùng: ${khuVuc || 'Miền Trung'} • ${textHan}`;

            const tieuDeBang = document.querySelector('.hang-tieu-de-bang');
            tieuDeBang.insertAdjacentElement('afterend', clone);

            formNL.style.display = 'none';
            document.getElementById('nhapTenNL').value = '';
            document.getElementById('nhapSoLuongNL').value = '';
            document.getElementById('nhapKhuVucNL').value = '';
            document.getElementById('nhapHanDungNL').value = '';

            ThongBaoNho.fire({ icon: 'success', title: `Đã thêm ${maNgauNhien} thành công!` });
            thucHienLocNguonLuc();
        }

        // C. Lưu trữ nguồn lực
        if (e.target.closest('.link-luu-tru')) {
            e.preventDefault();
            const hang = e.target.closest('.hang-du-lieu-bang');
            const tieuDe = hang.querySelector('strong');
            tieuDe.classList.add('text-muted');
            hang.querySelector('.text-sm').innerText += ' • Đã lưu trữ';
            hang.querySelector('.cac-link-thao-tac').innerHTML = '<a href="#" class="link-xem-lich-su"><i class="fa-solid fa-arrow-right"></i> Xem lịch sử</a>';
            ThongBaoNho.fire({ icon: 'success', title: 'Đã chuyển vào kho lưu trữ!' });
            thucHienLocNguonLuc();
        }

        // --- D. XEM PHÂN BỔ TRỰC TIẾP TRÊN DÒNG (INLINE EXPAND) ---
        const linkXemPhanBo = e.target.closest('.link-xem-phan-bo');
        if (linkXemPhanBo) {
            e.preventDefault();
            const hang = linkXemPhanBo.closest('.hang-du-lieu-bang');
            let phanBoBox = hang.querySelector('.chi-tiet-phan-bo-inline');

            if (phanBoBox) {
                if (phanBoBox.style.display === 'none') {
                    phanBoBox.style.display = 'block';
                    linkXemPhanBo.innerText = 'Thu gọn phân bổ';
                } else {
                    phanBoBox.style.display = 'none';
                    linkXemPhanBo.innerText = 'Xem phân bổ';
                }
            } else {
                phanBoBox = document.createElement('div');
                phanBoBox.className = 'chi-tiet-phan-bo-inline';
                phanBoBox.style.cssText = 'margin-top: 12px; padding: 12px; background: #f8f9fa; border: 1px solid var(--border-color); border-radius: 6px; font-size: 13px;';
                phanBoBox.innerHTML = `
                    <div style="font-weight: 600; margin-bottom: 5px; color: var(--primary-color);"><i class="fa-solid fa-list-check"></i> Chi tiết phân bổ nguồn lực:</div>
                    <div style="color: var(--text-muted); line-height: 1.5;">
                        <div>• <strong>PB-032</strong>: 100 bộ (Đang giao)</div>
                        <div>• <strong>PB-033</strong>: 200 bộ (Đã hoàn tất)</div>
                    </div>
                `;
                hang.querySelector('.noi-dung-chinh').appendChild(phanBoBox);
                linkXemPhanBo.innerText = 'Thu gọn phân bổ';
            }
        }

        // --- E. XEM CAM KẾT TRỰC TIẾP TRÊN DÒNG (INLINE EXPAND) ---
        const linkXemCamKet = e.target.closest('.link-xem-cam-ket');
        if (linkXemCamKet) {
            e.preventDefault();
            const hang = linkXemCamKet.closest('.hang-du-lieu-bang');
            let camKetBox = hang.querySelector('.chi-tiet-camket-inline');

            if (camKetBox) {
                if (camKetBox.style.display === 'none') {
                    camKetBox.style.display = 'block';
                    linkXemCamKet.innerText = 'Thu gọn cam kết';
                } else {
                    camKetBox.style.display = 'none';
                    linkXemCamKet.innerText = 'Xem cam kết';
                }
            } else {
                camKetBox = document.createElement('div');
                camKetBox.className = 'chi-tiet-camket-inline';
                camKetBox.style.cssText = 'margin-top: 12px; padding: 12px; background: #f8f9fa; border: 1px solid var(--border-color); border-radius: 6px; font-size: 13px;';
                camKetBox.innerHTML = `
                    <div style="font-weight: 600; margin-bottom: 5px; color: var(--primary-color);"><i class="fa-solid fa-handshake"></i> Danh sách cam kết liên quan:</div>
                    <div style="color: var(--text-muted); line-height: 1.5;">
                        <div>• <strong>CK-020</strong>: 50 chiếc chăn ấm tới trạm. (Trạng thái: Đã xác nhận lịch giao)</div>
                    </div>
                `;
                hang.querySelector('.noi-dung-chinh').appendChild(camKetBox);
                linkXemCamKet.innerText = 'Thu gọn cam kết';
            }
        }

        // --- F. BỔ SUNG TỒN TRỰC TIẾP TRÊN DÒNG (INLINE FORM) ---
        const linkBoSungTon = e.target.closest('.link-bo-sung-ton');
        if (linkBoSungTon) {
            e.preventDefault();
            const hang = linkBoSungTon.closest('.hang-du-lieu-bang');
            let bosungBox = hang.querySelector('.form-bosung-inline');

            if (bosungBox) {
                if (bosungBox.style.display === 'none') {
                    bosungBox.style.display = 'block';
                    linkBoSungTon.innerText = 'Hủy bổ sung';
                } else {
                    bosungBox.style.display = 'none';
                    linkBoSungTon.innerText = 'Bổ sung tồn';
                }
            } else {
                bosungBox = document.createElement('div');
                bosungBox.className = 'form-bosung-inline';
                bosungBox.style.cssText = 'margin-top: 12px; padding: 12px; background: #f8f9fa; border: 1px solid var(--border-color); border-radius: 6px; font-size: 13px;';
                bosungBox.innerHTML = `
                    <div style="font-weight: 600; margin-bottom: 8px; color: var(--success);"><i class="fa-solid fa-plus-circle"></i> Bổ sung tồn kho nguồn lực:</div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <input type="number" class="input-nhap-them" placeholder="Nhập số lượng cần thêm..." style="padding: 4px 8px; border: 1px solid var(--border-color); border-radius: 4px; font-size: 13px; outline: none; width: 200px; background: white;">
                        <button class="nut nut-chinh btn-xacnhan-bosung" style="padding: 4px 12px; font-size: 12px;">Xác nhận</button>
                    </div>
                `;
                hang.querySelector('.noi-dung-chinh').appendChild(bosungBox);
                linkBoSungTon.innerText = 'Hủy bổ sung';
            }
        }

        // Xác nhận bổ sung tồn kho
        if (e.target.closest('.btn-xacnhan-bosung')) {
            e.preventDefault(); e.stopPropagation();
            const btn = e.target.closest('.btn-xacnhan-bosung');
            const hang = btn.closest('.hang-du-lieu-bang');
            const inputVal = hang.querySelector('.input-nhap-them').value.trim();

            if (inputVal && !isNaN(inputVal) && Number(inputVal) > 0) {
                ThongBaoNho.fire({ icon: 'success', title: `Đã bổ sung thành công ${inputVal} đơn vị vào kho!` });
                hang.querySelector('.form-bosung-inline').style.display = 'none';
                hang.querySelector('.link-bo-sung-ton').innerText = 'Bổ sung tồn';
            } else {
                ThongBaoNho.fire({ icon: 'error', title: 'Vui lòng nhập số lượng hợp lệ!' });
            }
        }

        // --- G. SỬA TRỰC TIẾP TRÊN DÒNG (INLINE EDIT) ---
        const linkSua = e.target.closest('.link-sua');
        if (linkSua) {
            e.preventDefault();
            const hang = linkSua.closest('.hang-du-lieu-bang');
            const strongTag = hang.querySelector('strong');
            if (strongTag.classList.contains('dang-sua')) return;

            strongTag.classList.add('dang-sua');
            const textHienTai = strongTag.innerText;
            strongTag.dataset.oldText = textHienTai;

            strongTag.innerHTML = `
                <div style="display: flex; gap: 8px; align-items: center; margin-top: 4px;">
                    <input type="text" class="input-sua-nhanh" value="${textHienTai}" style="padding: 4px 8px; border: 1px solid var(--primary-color); border-radius: 4px; font-size: 14px; outline: none; width: 260px; background: white;">
                    <i class="fa-solid fa-check text-success btn-luu-nhanh" style="cursor: pointer; padding: 4px;" title="Lưu"></i>
                    <i class="fa-solid fa-xmark text-danger btn-huy-nhanh" style="cursor: pointer; padding: 4px;" title="Hủy"></i>
                </div>
            `;
            linkSua.style.display = 'none';
        }

        // Lưu trực tiếp (Bấm dấu tick xanh)
        if (e.target.closest('.btn-luu-nhanh')) {
            e.preventDefault(); e.stopPropagation();
            const btnLuu = e.target.closest('.btn-luu-nhanh');
            const hang = btnLuu.closest('.hang-du-lieu-bang');
            const strongTag = hang.querySelector('strong');
            const inputVal = hang.querySelector('.input-sua-nhanh').value.trim();

            if (inputVal) {
                strongTag.classList.remove('dang-sua');
                strongTag.innerText = inputVal;
                hang.querySelector('.link-sua').style.display = 'inline-block';
                ThongBaoNho.fire({ icon: 'success', title: 'Cập nhật trực tiếp thành công!' });
            } else {
                ThongBaoNho.fire({ icon: 'error', title: 'Không được để trống tên!' });
            }
        }

        // Hủy sửa trực tiếp (Bấm dấu x đỏ)
        if (e.target.closest('.btn-huy-nhanh')) {
            e.preventDefault(); e.stopPropagation();
            const btnHuy = e.target.closest('.btn-huy-nhanh');
            const hang = btnHuy.closest('.hang-du-lieu-bang');
            const strongTag = hang.querySelector('strong');
            const oldText = strongTag.dataset.oldText;

            strongTag.classList.remove('dang-sua');
            strongTag.innerText = oldText;
            hang.querySelector('.link-sua').style.display = 'inline-block';
        }
    });
});