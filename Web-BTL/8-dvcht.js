document.addEventListener('DOMContentLoaded', () => {
    // Lấy các tab lọc, thẻ nhu cầu và ô tìm kiếm trên trang.
    const tabBtns = document.querySelectorAll('.nut-tab');
    const needCards = document.querySelectorAll('.the-nhu-cau');
    const searchInput = document.getElementById('searchInput');

    // Chuẩn hóa văn bản để tìm kiếm không phân biệt chữ hoa và dấu tiếng Việt.
    function normalizeText(text) {
        return text
            .toLocaleLowerCase('vi')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Xóa các dấu đã được tách khỏi chữ cái.
            .replace(/đ/g, 'd'); // Chuyển riêng chữ đ thành d.
    }

    // Hiện các thẻ khớp với cả tab đang chọn và từ khóa tìm kiếm.
    function filterNeeds() {
        const activeTab = document.querySelector('.nut-tab.dang-chon');
        const selectedTab = activeTab
            ? activeTab.textContent.trim().replace(/\s*\(\d+\)$/, '')
            : 'Tất cả';
        const query = normalizeText(searchInput.value.trim());

        needCards.forEach(card => {
            // Lấy dữ liệu cần dùng để so khớp cho thẻ hiện tại.
            const status = card.querySelector('.nhan-trang-thai').textContent.trim();
            const title = normalizeText(card.querySelector('.tieu-de-nhu-cau').textContent);
            const code = normalizeText(card.querySelector('.ma-nhu-cau').textContent);

            // Phân loại thẻ theo trạng thái và tab được chọn.
            const matchesTab = selectedTab === 'Tất cả'
                || (selectedTab === 'Đang hoạt động'
                    && ['Đáp ứng một phần', 'Đã duyệt', 'Chờ duyệt'].includes(status))
                || (selectedTab === 'Bản nháp' && status === 'Bản nháp')
                || (selectedTab === 'Hoàn thành & lưu trữ'
                    && ['Hoàn thành', 'Đã lưu trữ'].includes(status));

            // Tìm từ khóa trong tiêu đề hoặc mã nhu cầu; để trống thì khớp tất cả.
            const matchesSearch = !query || title.includes(query) || code.includes(query);

            card.style.display = matchesTab && matchesSearch ? '' : 'none';
        });
    }

    // Cập nhật tab đang chọn và lọc lại danh sách khi người dùng bấm tab.
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(tab => tab.classList.remove('dang-chon'));
            btn.classList.add('dang-chon');
            filterNeeds();
        });
    });

    // Lọc lại danh sách mỗi khi nội dung ô tìm kiếm thay đổi.
    searchInput.addEventListener('input', filterNeeds);

    // Gắn chức năng xem chi tiết cho liên kết tương ứng trong từng thẻ.
    needCards.forEach(card => {
        const detailsLink = Array.from(card.querySelectorAll('.lien-ket-hanh-dong'))
            .find(link => link.textContent.trim() === 'Xem chi tiết');

        if (detailsLink) {
            detailsLink.addEventListener('click', event => {
                event.preventDefault(); // Không chuyển trang theo href của liên kết.
                const code = card.querySelector('.ma-nhu-cau').textContent.trim();
                const title = card.querySelector('.tieu-de-nhu-cau').textContent.trim();
                const status = card.querySelector('.nhan-trang-thai').textContent.trim();
                const reason = card.querySelector('.khung-canh-bao-ben-trong p');

                // Ghép thông tin thành nội dung hộp thoại; bỏ lý do nếu thẻ không có.
                const message = [
                    `Mã nhu cầu: ${code}`,
                    `Tên nhu cầu: ${title}`,
                    `Trạng thái: ${status}`,
                    reason ? `Lý do: ${reason.textContent.trim()}` : ''
                ].filter(Boolean).join('\n');

                window.alert(message);
            });
        }
    });

    // Chuyển đến trang tạo nhu cầu khi người dùng bấm nút chính.
    const createButtons = document.querySelectorAll('.nut-chinh');
    createButtons.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            window.location.href = '7-dvcht.html';
        });
    });
});