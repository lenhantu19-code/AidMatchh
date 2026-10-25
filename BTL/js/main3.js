document.addEventListener("DOMContentLoaded", () => {
    // 1. Cấu hình Toast
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });

    // 2. Sửa chữ "68 / 100" thành "68/100" cho thẳng
    const cacDiemMuc = document.querySelectorAll('.diem-muc');
    cacDiemMuc.forEach(diem => {
        if (diem.innerText.includes('68 / 100')) {
            diem.innerText = diem.innerText.replace('68 / 100', '68/100');
        }
        if (diem.innerText.includes('82 / 100')) {
            diem.innerText = diem.innerText.replace('82 / 100', '82/100');
        }
    });

    // ==============================================================
    // TÍNH NĂNG MỚI: ẨN/HIỆN BƯỚC 3 (UX Chuyên nghiệp)
    // ==============================================================
    const cotPhaiGoiY = document.querySelector('.cot-phai-goi-y');
    const boCucGoiY = document.querySelector('.bo-cuc-goi-y');
    
    // Ẩn cột phải (Bước 3) lúc mới tải trang và mở rộng cột trái ra toàn màn
    if (cotPhaiGoiY && boCucGoiY) {
        cotPhaiGoiY.style.display = 'none';
        boCucGoiY.style.gridTemplateColumns = '1fr'; 
        boCucGoiY.style.transition = 'grid-template-columns 0.4s ease-in-out';
    }

    // Hàm mở khóa Bước 3 khi ấn Chấp nhận hoặc Chỉnh sửa
    function moKhoaBuoc3() {
        if (cotPhaiGoiY && boCucGoiY && cotPhaiGoiY.style.display === 'none') {
            cotPhaiGoiY.style.display = 'flex';
            boCucGoiY.style.gridTemplateColumns = ''; // Trả lại layout gốc của CSS
            
            // Hiệu ứng trượt ra mượt mà
            cotPhaiGoiY.animate([
                { opacity: 0, transform: 'translateX(30px)' },
                { opacity: 1, transform: 'translateX(0)' }
            ], { duration: 400, easing: 'ease-out' });
        }
    }

    // 3. Khởi tạo danh sách cho các ô có mũi tên (select)
    const selects = document.querySelectorAll('.hop-chon');
    let selectNguonLuc, selectDiaBan;
    
    selects.forEach(select => {
        if (select.tagName === 'SELECT') {
            if (select.innerHTML.includes('NL-011')) {
                selectNguonLuc = select;
                select.innerHTML = `
                    <option value="NL-011">NL-011 - Nhu yếu phẩm - 200 bộ sẵn có</option>
                    <option value="NL-012">NL-012 - Quần áo mùa đông - 100 bộ</option>
                `;
            } else if (select.innerHTML.includes('Quảng Trị')) {
                selectDiaBan = select;
                select.innerHTML = `
                    <option value="QuangTri">Quảng Trị</option>
                    <option value="DaNang">Đà Nẵng</option>
                    <option value="Hue">Thừa Thiên Huế</option>
                `;
            }
        }
    });

    // 4. Database mô phỏng AI
    const dbGoiY = {
        'NL-011': {
            'QuangTri': {
                id: 'NC-024', ten: 'NC-024 - Nhu yếu phẩm cho An Bình', diem: '96/100', mauDiem: 'mau-xanh-duong',
                tieuDe: 'Trạm An Bình - Hải Lăng, Quảng Trị - Hạn 15/10/2026',
                bangDoiChieu: ['Cùng bộ nhu yếu phẩm: gạo, dầu, muối, xà phòng', 'Còn thiếu 200; 100 đã giữ chỗ → chỉ đề xuất thêm 100 bộ', 'Kho Đông Hà → Hải Lăng, cùng tỉnh, khoảng 35 km', 'Có thể giao 14/10, trước hạn cần 15/10'],
                soLuong: '100 bộ', ngay: '2026-10-14', diaDiem: 'Giao tới Trạm An Bình', ghiChu: 'Giao cùng chuyến đợt PB-032B, tách biên bản cho cam kết mới.'
            },
            'DaNang': {
                id: 'NC-030', ten: 'NC-030 - Nhu yếu phẩm Đà Nẵng', diem: '82/100', mauDiem: 'mau-xanh-duong',
                tieuDe: 'Liên Chiểu - Đà Nẵng - Hạn 20/10',
                bangDoiChieu: ['Cùng bộ nhu yếu phẩm: gạo, dầu, xà phòng', 'Họ cần 150, bạn có 200 → đề xuất 150 bộ', 'Kho Đông Hà → Đà Nẵng, khoảng 120 km', 'Có thể giao trước ngày 20/10'],
                soLuong: '150 bộ', ngay: '2026-10-18', diaDiem: 'Điểm tập kết Liên Chiểu', ghiChu: 'Cần liên hệ ban chỉ đạo Đà Nẵng trước khi xe tới.'
            },
            'Hue': {
                id: 'NC-031', ten: 'NC-031 - Chăn ấm Huế (Sai loại)', diem: '68/100', mauDiem: 'mau-cam',
                tieuDe: 'Phú Lộc - Thừa Thiên Huế - Hạn 18/10',
                bangDoiChieu: ['Nhu yếu phẩm cơ bản, nhưng họ cần thêm áo ấm', 'Khó đề xuất do sai lệch loại hàng', 'Kho Đông Hà → Huế, khoảng 70 km', 'Thời gian phù hợp'],
                soLuong: '0 bộ', ngay: '2026-10-15', diaDiem: 'UBND Huyện Phú Lộc', ghiChu: 'Hãy cẩn thận, nhu cầu này không khớp với nguồn lực.'
            }
        },
        'NL-012': {
            'Hue': {
                id: 'NC-042', ten: 'NC-042 - Áo ấm cho Phú Lộc', diem: '98/100', mauDiem: 'mau-xanh-duong',
                tieuDe: 'Phú Lộc - Thừa Thiên Huế - Hạn 18/10/2026',
                bangDoiChieu: ['Cùng loại quần áo mùa đông, áo phao', 'Họ cần 100, bạn có 100 → Khớp hoàn toàn', 'Kho Đông Hà → Huế, khoảng 70 km (Chấp nhận được)', 'Giao trước 18/10'],
                soLuong: '100 bộ', ngay: '2026-10-16', diaDiem: 'UBND Huyện Phú Lộc', ghiChu: 'Giao thẳng vào kho trung tâm huyện.'
            },
            'QuangTri': {
                id: 'NC-040', ten: 'NC-040 - Nhu yếu phẩm An Bình (Sai loại)', diem: '55/100', mauDiem: 'mau-cam',
                tieuDe: 'Trạm An Bình - Hải Lăng, Quảng Trị - Hạn 15/10/2026',
                bangDoiChieu: ['Sai loại: Bạn có quần áo, họ cần gạo/dầu', 'Không khớp nhu cầu', 'Kho Đông Hà → Hải Lăng (Rất gần)', 'Thời gian phù hợp'],
                soLuong: '0 bộ', ngay: '2026-10-14', diaDiem: 'Giao tới Trạm An Bình', ghiChu: 'Cảnh báo: Không nên ghép quần áo cho nhu cầu lương thực.'
            },
            'DaNang': {
                id: 'NC-041', ten: 'NC-041 - Nhu yếu phẩm Đà Nẵng (Sai loại)', diem: '50/100', mauDiem: 'mau-cam',
                tieuDe: 'Liên Chiểu - Đà Nẵng - Hạn 20/10',
                bangDoiChieu: ['Sai loại: Bạn có quần áo, họ cần lương thực', 'Không khớp nhu cầu', 'Kho Đông Hà → Đà Nẵng (Khá xa)', 'Thời gian phù hợp'],
                soLuong: '0 bộ', ngay: '2026-10-18', diaDiem: 'Điểm tập kết Liên Chiểu', ghiChu: 'Cảnh báo: Sai cả loại hàng và ngoài vùng ưu tiên.'
            }
        }
    };

    function updateGiaoDienGoiY(data) {
        const h3 = document.querySelector('.thong-tin-nhu-cau-chinh h3');
        const p = document.querySelector('.thong-tin-nhu-cau-chinh p');
        if (h3) h3.innerText = data.ten;
        if (p) p.innerText = data.tieuDe;
        
        const trList = document.querySelectorAll('.bang-doi-chieu tbody tr');
        if (trList.length >= 4) {
            for (let i = 0; i < 4; i++) {
                const td = trList[i].querySelectorAll('td');
                if (td.length > 1) td[1].innerText = data.bangDoiChieu[i];
            }
        }
        
        const nhanDoPhuHop = document.querySelector('.nhan-do-phu-hop');
        if (nhanDoPhuHop) {
            if (parseInt(data.diem) >= 80) {
                let textPhuHop = parseInt(data.diem) >= 90 ? 'Phù hợp nhất' : 'Tiềm năng';
                let icon = parseInt(data.diem) >= 90 ? 'fa-check' : 'fa-star';
                nhanDoPhuHop.innerHTML = `<i class="fa-solid ${icon}"></i> ${textPhuHop} - ${data.diem} - Tin cậy cao`;
                nhanDoPhuHop.style.backgroundColor = '#e8f5e9';
                nhanDoPhuHop.style.color = '#2e7d32';
                nhanDoPhuHop.style.borderColor = '#c8e6c9';
            } else {
                nhanDoPhuHop.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Kém phù hợp - ${data.diem}`;
                nhanDoPhuHop.style.backgroundColor = '#fff3e0';
                nhanDoPhuHop.style.color = '#e65100';
                nhanDoPhuHop.style.borderColor = '#ffe0b2';
            }
        }

        const inputs = document.querySelectorAll('#formCamKet .input-xam');
        if (inputs.length >= 4) {
            inputs[0].value = data.soLuong;
            inputs[1].value = data.ngay;
            inputs[2].value = data.diaDiem;
            inputs[3].value = data.ghiChu;
        }
        
        const ghiChuCamKet = document.querySelector('.ghi-chu-cam-ket');
        if (ghiChuCamKet) ghiChuCamKet.innerText = `Đã chọn ${data.id} - Chưa gửi, chưa giữ chỗ nguồn lực.`;
    }

    function renderCacLuaChonKhac(nguonLucHienTai, idDangChon) {
        const container = document.querySelector('.danh-sach-lua-chon');
        if (!container) return;
        container.innerHTML = ''; 
        
        const danhSach = dbGoiY[nguonLucHienTai];
        for (let diaBan in danhSach) {
            const data = danhSach[diaBan];
            if (data.id !== idDangChon) {
                const div = document.createElement('div');
                div.className = 'muc-lua-chon';
                div.innerHTML = `
                    <div class="thong-tin-muc">
                        <h5>${data.ten}</h5>
                        <p>${data.tieuDe}</p>
                    </div>
                    <div class="diem-muc ${data.mauDiem}">${data.diem}</div>
                `;
                
                div.addEventListener('click', () => {
                    Toast.fire({ icon: 'info', title: `Đang tải dữ liệu cho ${data.ten.split('-')[0]}...` });
                    updateGiaoDienGoiY(data);
                    renderCacLuaChonKhac(nguonLucHienTai, data.id); 
                    
                    // Nếu click đổi lựa chọn, tự động ẩn Bước 3 đi để bắt xem lại thông tin
                    if (cotPhaiGoiY && boCucGoiY) {
                        cotPhaiGoiY.style.display = 'none';
                        boCucGoiY.style.gridTemplateColumns = '1fr';
                    }
                });
                
                container.appendChild(div);
            }
        }
    }

    // 5. Xử lý nút TÌM GỢI Ý PHÙ HỢP
    const btnTimGoiY = document.getElementById('btnTimGoiY');
    if (btnTimGoiY) {
        btnTimGoiY.addEventListener('click', () => {
            const nguonLucChon = selectNguonLuc ? selectNguonLuc.value : 'NL-011';
            const diaBanChon = selectDiaBan ? selectDiaBan.value : 'QuangTri';
            const originalHtml = btnTimGoiY.innerHTML;
            
            btnTimGoiY.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> AI đang phân tích...';
            btnTimGoiY.disabled = true;

            setTimeout(() => {
                btnTimGoiY.innerHTML = originalHtml;
                btnTimGoiY.disabled = false;
                
                let data = dbGoiY[nguonLucChon][diaBanChon];
                if (!data) data = dbGoiY[nguonLucChon]['QuangTri']; 
                
                updateGiaoDienGoiY(data);
                renderCacLuaChonKhac(nguonLucChon, data.id);
                
                Toast.fire({ icon: 'success', title: `Đã cập nhật gợi ý cho: ${selectNguonLuc.options[selectNguonLuc.selectedIndex].text.split(' - ')[1]}` });
                const trangThai = document.querySelector('.trang-thai-tim-kiem');
                if (trangThai) trangThai.innerHTML = '<span class="cham-xanh-la"></span> Đã áp dụng bộ lọc - Vừa xong';
                
                // Ẩn Bước 3 đi khi tìm kiếm mới
                if (cotPhaiGoiY && boCucGoiY) {
                    cotPhaiGoiY.style.display = 'none';
                    boCucGoiY.style.gridTemplateColumns = '1fr';
                }
            }, 800);
        });
    }

    renderCacLuaChonKhac('NL-011', 'NC-024');

    // 6. Xử lý các nút: Chấp nhận, Chỉnh sửa, Từ chối, Lưu
    const btnChapNhan = document.getElementById('btnChapNhan');
    if (btnChapNhan) {
        btnChapNhan.addEventListener('click', () => {
            moKhoaBuoc3(); // Hiện Bước 3
            Toast.fire({ icon: 'success', title: 'Đã chấp nhận! Vui lòng hoàn tất biểu mẫu Cam kết bên phải.' });
            setTimeout(() => { document.getElementById('formCamKet').scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 150);
        });
    }

    const btnChinhSua = document.querySelector('.nut-vien');
    if (btnChinhSua) {
        btnChinhSua.addEventListener('click', () => {
            moKhoaBuoc3(); // Hiện Bước 3
            Toast.fire({ icon: 'info', title: 'Đã mở khóa biểu mẫu. Bạn có thể tự do chỉnh sửa.' });
            setTimeout(() => { 
                document.getElementById('formCamKet').scrollIntoView({ behavior: 'smooth', block: 'center' });
                const inputs = document.querySelectorAll('#formCamKet .input-xam');
                if (inputs.length > 0) inputs[0].focus(); 
            }, 150);
        });
    }

    const btnTuChoi = document.querySelector('.nut-chu-do');
    if (btnTuChoi) btnTuChoi.addEventListener('click', () => {
        Toast.fire({ icon: 'warning', title: 'Đã bỏ qua gợi ý này.' });
        if (cotPhaiGoiY && boCucGoiY) {
            cotPhaiGoiY.style.display = 'none';
            boCucGoiY.style.gridTemplateColumns = '1fr';
        }
    });

    const btnLuu = document.querySelector('.lien-ket-luu');
    if (btnLuu) btnLuu.addEventListener('click', (e) => { e.preventDefault(); Toast.fire({ icon: 'success', title: 'Đã lưu bản nháp thành công!' }); });

    // 7. Xử lý form Gửi cam kết
    const btnGuiCamKet = document.getElementById('btnGuiCamKet');
    if (btnGuiCamKet) {
        btnGuiCamKet.addEventListener('click', (e) => {
            e.preventDefault();
            const checkXacNhan = document.getElementById('checkXacNhan');
            if (!checkXacNhan) return;
            if (!checkXacNhan.checked) {
                Toast.fire({ icon: 'error', title: 'Lỗi: Bạn phải tích vào ô "Tôi đã kiểm tra quy cách..."' });
                return;
            }
            Toast.fire({ icon: 'success', title: 'Cam kết thành công! Đang chuyển dữ liệu...' });
            setTimeout(() => { 
                checkXacNhan.checked = false; 
                // Có thể đóng Bước 3 sau khi gửi thành công
                if (cotPhaiGoiY && boCucGoiY) {
                    cotPhaiGoiY.style.display = 'none';
                    boCucGoiY.style.gridTemplateColumns = '1fr';
                }
            }, 1500);
        });
    }
});