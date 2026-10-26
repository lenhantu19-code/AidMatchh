document.addEventListener('DOMContentLoaded', () => {
    // Lấy các nút lọc và thẻ nhu cầu sau khi HTML đã tải xong.
    const tabButtons = document.querySelectorAll('.nut-tab');
    const needCards = document.querySelectorAll('.the-nhu-cau');
    let toastTimer;
    let activeFilter = 'Tất cả';
    let activeQuery = '';

    // Tạo vùng thông báo dùng chung cho các thao tác trên trang.
    const toast = document.createElement('div');
    toast.className = 'thong-bao-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);

    // Hiển thị thông báo tạm thời trong 3 giây.
    function showNotification(message) {
        toast.textContent = message;
        toast.classList.add('dang-hien');
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => {
            toast.classList.remove('dang-hien');
        }, 3000);
    }

    // Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu.
    function normalizeText(text) {
        return text
            .toLocaleLowerCase('vi')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd');
    }

    // Chỉ hiển thị thẻ khớp với cả từ khóa tìm kiếm và bộ lọc đang chọn.
    function filterNeeds() {
        const normalizedQuery = normalizeText(activeQuery.trim());
        let visibleCount = 0;

        needCards.forEach(card => {
            const cardText = normalizeText(card.textContent);
            const matchesQuery = !normalizedQuery || cardText.includes(normalizedQuery);
            const matchesFilter = activeFilter === 'Tất cả'
                || (activeFilter === 'Khẩn cấp'
                    && card.querySelector('.nhan-dau-the').matches('.khan-cap, .canh-bao'))
                || (activeFilter === 'Nhu yếu phẩm' && cardText.includes('nhu yeu pham'))
                || (activeFilter === 'Nước sạch'
                    && (cardText.includes('nuoc sach') || cardText.includes('nuoc uong')));

            card.hidden = !(matchesQuery && matchesFilter);
            if (!card.hidden) visibleCount += 1;
        });

        return visibleCount;
    }

    // Cập nhật bộ lọc khi người dùng chọn một nút danh mục.
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(tab => tab.classList.remove('dang-chon'));
            button.classList.add('dang-chon');
            activeFilter = button.textContent.trim().replace(/\s*\(\d+\)$/, '');
            const count = filterNeeds();
            showNotification(`Đang hiển thị ${count} nhu cầu: ${activeFilter}.`);
        });
    });

    // Tìm nhu cầu theo từ khóa nhập từ hộp tìm kiếm trên đầu trang.
    const searchBox = document.querySelector('.hop-tim-kiem-dau-trang');
    if (searchBox) {
        searchBox.addEventListener('click', () => {
            const query = window.prompt('Nhập mã, địa điểm hoặc tên nhu cầu cần tìm:');
            if (query === null) return;

            activeQuery = query;
            const count = filterNeeds();
            document.querySelector('.khung-muc-noi-dung')?.scrollIntoView({ behavior: 'smooth' });
            showNotification(count
                ? `Tìm thấy ${count} nhu cầu phù hợp.`
                : 'Không tìm thấy nhu cầu phù hợp.');
        });
    }

    // Thông báo khi người dùng bấm nút trong phần mô phỏng AI.
    document.querySelectorAll('.nut-mo-phong')
        .forEach(button => {
            button.addEventListener('click', () => {
                showNotification('Đã ghi nhận yêu cầu của bạn.');
            });
        });

    // Thông báo lựa chọn khi bấm các liên kết chưa có trang đích.
    document.querySelectorAll('a[href="#"]')
        .forEach(link => {
            link.addEventListener('click', () => {
                const label = link.textContent.trim().replace(/[→←]/g, '').trim();
                showNotification(`Bạn đã chọn: ${label}.`);
            });
        });
});
