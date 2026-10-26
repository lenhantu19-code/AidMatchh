document.addEventListener('DOMContentLoaded', () => {
    const ThongBaoNho = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
    });

    // 1. Ngăn chặn hành vi mặc định của form và thẻ a trống
    document.body.addEventListener('submit', e => e.preventDefault());
    document.body.addEventListener('click', e => {
        if (e.target.tagName === 'A' && e.target.getAttribute('href') === '#') {
            e.preventDefault();
        }
    });

    // 2. Tự động active menu sidebar theo trang hiện tại
    const currentFile = window.location.pathname.split('/').pop() || 'index2.html';
    document.querySelectorAll('.danh-sach-menu li').forEach(li => {
        const link = li.querySelector('a');
        if (link && link.getAttribute('href') === currentFile) {
            document.querySelectorAll('.danh-sach-menu li').forEach(el => el.classList.remove('dang-chon'));
            li.classList.add('dang-chon');
        }
    });

    // --- 3. DỮ LIỆU GỐC (DÙNG ĐỂ KHÔI PHỤC KHI BẤM HỦY) ---
    const duLieuGoc = {
        tenNguonLuc: "Bộ nhu yếu phẩm Đồng Hành",
        soLuongBoSung: "0",
        moTaNguonLuc: "Mỗi bộ: 5 kg gạo, 1 lít dầu ăn, 1 kg muối, 2 bánh xà phòng. Đóng gói theo từng hộ, hàng mới còn nguyên bao bì.",
        tuNgay: "09/10/2026",
        denNgay: "20/10/2026",
        hanDung: "31/12/2026",
        diaChiKho: "Kho Đồng Hành, Đông Hà, Quảng Trị",
        dieuKienGiao: "Xe tải giao tối đa 400 bộ mỗi chuyến. Cần xác nhận điểm giao và người nhận trước 24 giờ.",
        dauMoiLienHe: "Trần Minh",
        dienThoai: "0902 345 678",
        ghiChuNoiBo: "Ưu tiên hỗ trợ trong Quảng Trị trước 15/10."
    };

    // Tải dữ liệu đã lưu trước đó
    const savedData = JSON.parse(localStorage.getItem('kho_du_lieu_nl011'));
    if (savedData) {
        for (let key in savedData) {
            const el = document.getElementById(key);
            if (el) el.value = savedData[key];
        }
    }

    // --- 4. VALIDATION SỐ LƯỢNG BỔ SUNG ---
    const inputBoSung = document.getElementById('soLuongBoSung');
    const btnLuuCongKhai = document.getElementById('btnLuuCongKhai');
    const danhSachKiemTra = document.querySelector('.danh-sach-kiem-tra');
    const hopCanhBaoKhoa = document.querySelector('.hop-canh-bao-nho');

    function kiemTraHopLe() {
        if (!inputBoSung) return true;
        const val = parseFloat(inputBoSung.value);
        const parentBox = inputBoSung.closest('.form-box');
        let errorDiv = parentBox.querySelector('.ghi-chu-loi');

        if (isNaN(val) || val < 0) {
            parentBox.classList.add('box-loi');
            if (!errorDiv) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'ghi-chu-loi';
                errorDiv.innerText = 'Số lượng bổ sung không được âm.';
                parentBox.appendChild(errorDiv);
            }

            if (btnLuuCongKhai) {
                btnLuuCongKhai.disabled = true;
                btnLuuCongKhai.className = 'nut nut-xam';
            }

            if (danhSachKiemTra) {
                const items = danhSachKiemTra.querySelectorAll('li');
                if (items[3]) {
                    items[3].className = 'loi';
                    items[3].innerHTML = '<span class="dau-than">!</span> Số lượng bổ sung phải ≥ 0';
                }
            }

            if (hopCanhBaoKhoa) hopCanhBaoKhoa.style.display = 'block';
            return false;
        } else {
            parentBox.classList.remove('box-loi');
            if (errorDiv) errorDiv.remove();

            if (btnLuuCongKhai) {
                btnLuuCongKhai.disabled = false;
                btnLuuCongKhai.className = 'nut nut-chinh';
            }

            if (danhSachKiemTra) {
                const items = danhSachKiemTra.querySelectorAll('li');
                if (items[3]) {
                    items[3].className = 'hop-le';
                    items[3].innerHTML = '<i class="fa-solid fa-check"></i> Số lượng bổ sung hợp lệ';
                }
            }

            if (hopCanhBaoKhoa) hopCanhBaoKhoa.style.display = 'none';
            return true;
        }
    }

    kiemTraHopLe();
    if (inputBoSung) inputBoSung.addEventListener('input', kiemTraHopLe);

    // --- 5. SỰ KIỆN TƯƠNG TÁC NÚT BẤM ---
    document.body.addEventListener('click', (e) => {

        // A. LƯU BẢN NHÁP (Thay đổi trực tiếp nội dung khung thông báo phía trên nút)
        const btnNhaps = e.target.closest('#btnLuuNhaps');
        if (btnNhaps) {
            e.preventDefault();
            const now = new Date();
            const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            
            // Thu thập dữ liệu hiện tại để ghi vào nháp tạm thời
            const duLieuTam = {
                tenNguonLuc: document.getElementById('tenNguonLuc')?.value || '',
                soLuongBoSung: document.getElementById('soLuongBoSung')?.value || 0,
                moTaNguonLuc: document.getElementById('moTaNguonLuc')?.value || ''
            };
            sessionStorage.setItem('nhap_tam_thoi', JSON.stringify(duLieuTam));

            // Thay đổi giao diện khung thông báo nháp
            const trangThaiBox = document.getElementById('trangThaiNhapBox');
            const tieuDeNhap = document.getElementById('tieuDeNhap');
            const noiDungNhap = document.getElementById('noiDungNhap');
            
            if (trangThaiBox && tieuDeNhap && noiDungNhap) {
                trangThaiBox.style.backgroundColor = '#e3f2fd'; // Đổi sang màu xanh dương nhạt báo hiệu bản nháp
                trangThaiBox.style.borderLeft = '4px solid #0d6efd';
                tieuDeNhap.style.color = '#0d6efd';
                tieuDeNhap.innerText = `Bản nháp đã được lưu thành công lúc ${timeString}`;
                noiDungNhap.innerText = `Dữ liệu chỉnh sửa đang nằm trong bộ nhớ nháp. Bạn có thể tiếp tục thay đổi hoặc bấm công khai.`;
            }

            ThongBaoNho.fire({ icon: 'success', title: 'Đã lưu bản nháp thành công!' });
        }

        // B. LƯU & CÔNG KHAI CẬP NHẬT (Lưu chính thức vào localStorage)
        const btnCongKhai = e.target.closest('#btnLuuCongKhai');
        if (btnCongKhai && !btnCongKhai.disabled) {
            if (!kiemTraHopLe()) return;

            const duLieuMoi = {
                tenNguonLuc: document.getElementById('tenNguonLuc')?.value || '',
                soLuongBoSung: document.getElementById('soLuongBoSung')?.value || 0,
                moTaNguonLuc: document.getElementById('moTaNguonLuc')?.value || '',
                tuNgay: document.getElementById('tuNgay')?.value || '',
                denNgay: document.getElementById('denNgay')?.value || '',
                hanDung: document.getElementById('hanDung')?.value || '',
                diaChiKho: document.getElementById('diaChiKho')?.value || '',
                dieuKienGiao: document.getElementById('dieuKienGiao')?.value || '',
                dauMoiLienHe: document.getElementById('dauMoiLienHe')?.value || '',
                dienThoai: document.getElementById('dienThoai')?.value || '',
                ghiChuNoiBo: document.getElementById('ghiChuNoiBo')?.value || ''
            };

            localStorage.setItem('kho_du_lieu_nl011', JSON.stringify(duLieuMoi));
            sessionStorage.removeItem('nhap_tam_thoi');

            // Cập nhật khung thông báo thành công
            const trangThaiBox = document.getElementById('trangThaiNhapBox');
            const tieuDeNhap = document.getElementById('tieuDeNhap');
            const noiDungNhap = document.getElementById('noiDungNhap');
            
            if (trangThaiBox && tieuDeNhap && noiDungNhap) {
                trangThaiBox.style.backgroundColor = '#e8f5e9';
                trangThaiBox.style.borderLeft = '4px solid #198754';
                tieuDeNhap.style.color = '#1b5e20';
                tieuDeNhap.innerText = 'Đã công khai cập nhật thành công!';
                noiDungNhap.innerText = 'Dữ liệu mới nhất đã được lưu chính thức vào hệ thống quản lý nguồn lực.';
            }

            ThongBaoNho.fire({ 
                icon: 'success', 
                title: 'Đã lưu & công khai cập nhật thành công!' 
            });
        }

        // C. HỦY CHỈNH SỬA (Đưa toàn bộ biểu mẫu và khung thông báo về trạng thái ban đầu)
        const btnHuy = e.target.closest('#btnHuySua');
        if (btnHuy) {
            e.preventDefault();
            
            // Xóa dữ liệu lưu tạm
            localStorage.removeItem('kho_du_lieu_nl011');
            sessionStorage.removeItem('nhap_tam_thoi');

            // Khôi phục giá trị gốc cho tất cả các ô input/textarea
            for (let key in duLieuGoc) {
                const el = document.getElementById(key);
                if (el) el.value = duLieuGoc[key];
            }

            kiemTraHopLe();

            // Khôi phục trạng thái khung thông báo về ban đầu
            const trangThaiBox = document.getElementById('trangThaiNhapBox');
            const tieuDeNhap = document.getElementById('tieuDeNhap');
            const noiDungNhap = document.getElementById('noiDungNhap');
            
            if (trangThaiBox && tieuDeNhap && noiDungNhap) {
                trangThaiBox.style.backgroundColor = '#e8f5e9';
                trangThaiBox.style.borderLeft = 'none';
                tieuDeNhap.style.color = '#1b5e20';
                tieuDeNhap.innerText = 'Bản nháp chỉnh sửa chưa được lưu';
                noiDungNhap.innerText = 'Dữ liệu khai báo được giữ lúc 09:40. Biểu mẫu vừa được khôi phục về trạng thái ban đầu.';
            }

            ThongBaoNho.fire({ 
                icon: 'info', 
                title: 'Đã hủy thay đổi và khôi phục dữ liệu gốc.' 
            });
        }

        // D. Xem cam kết inline
        const linkXemCamKet = e.target.closest('.link-xem-cam-ket');
        if (linkXemCamKet) {
            e.preventDefault();
            const card = linkXemCamKet.closest('.hop-the');
            let inlineBox = card.querySelector('.chi-tiet-camket-inline');

            if (inlineBox) {
                if (inlineBox.style.display === 'none') {
                    inlineBox.style.display = 'block';
                    linkXemCamKet.innerText = 'Thu gọn cam kết';
                } else {
                    inlineBox.style.display = 'none';
                    linkXemCamKet.innerText = 'Xem cam kết CK-018';
                }
            } else {
                inlineBox = document.createElement('div');
                inlineBox.className = 'chi-tiet-camket-inline';
                inlineBox.style.cssText = 'margin-top: 15px; padding: 12px; background: #f8f9fa; border: 1px solid var(--border-color); border-radius: 6px; font-size: 13px;';
                inlineBox.innerHTML = `
                    <div style="font-weight: 600; margin-bottom: 5px; color: var(--primary-color);"><i class="fa-solid fa-handshake"></i> Chi tiết cam kết CK-018:</div>
                    <div style="color: var(--text-muted); line-height: 1.5;">
                        <div>• Phân bổ: <strong>PB-032</strong></div>
                        <div>• Khối lượng giữ: <strong>100 bộ</strong></div>
                        <div>• Trạng thái: Đang giao hàng</div>
                    </div>
                `;
                card.appendChild(inlineBox);
                linkXemCamKet.innerText = 'Thu gọn cam kết';
            }
        }
    });
});