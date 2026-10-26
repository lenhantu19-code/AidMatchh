document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.nut-tab');
    const needCards = document.querySelectorAll('.the-nhu-cau');
    const searchInput = document.getElementById('searchInput');

    function normalizeText(text) {
        return text
            .toLocaleLowerCase('vi')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd');
    }

    function filterNeeds() {
        const activeTab = document.querySelector('.nut-tab.dang-chon');
        const selectedTab = activeTab
            ? activeTab.textContent.trim().replace(/\s*\(\d+\)$/, '')
            : 'Tất cả';
        const query = normalizeText(searchInput.value.trim());

        needCards.forEach(card => {
            const status = card.querySelector('.nhan-trang-thai').textContent.trim();
            const title = normalizeText(card.querySelector('.tieu-de-nhu-cau').textContent);
            const code = normalizeText(card.querySelector('.ma-nhu-cau').textContent);
            const matchesTab = selectedTab === 'Tất cả'
                || (selectedTab === 'Đang hoạt động'
                    && ['Đáp ứng một phần', 'Đã duyệt', 'Chờ duyệt'].includes(status))
                || (selectedTab === 'Bản nháp' && status === 'Bản nháp')
                || (selectedTab === 'Hoàn thành & lưu trữ'
                    && ['Hoàn thành', 'Đã lưu trữ'].includes(status));
            const matchesSearch = !query || title.includes(query) || code.includes(query);

            card.style.display = matchesTab && matchesSearch ? '' : 'none';
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(tab => tab.classList.remove('dang-chon'));
            btn.classList.add('dang-chon');
            filterNeeds();
        });
    });

    searchInput.addEventListener('input', filterNeeds);

    needCards.forEach(card => {
        const detailsLink = Array.from(card.querySelectorAll('.lien-ket-hanh-dong'))
            .find(link => link.textContent.trim() === 'Xem chi tiết');

        if (detailsLink) {
            detailsLink.addEventListener('click', event => {
                event.preventDefault();
                const code = card.querySelector('.ma-nhu-cau').textContent.trim();
                const title = card.querySelector('.tieu-de-nhu-cau').textContent.trim();
                const status = card.querySelector('.nhan-trang-thai').textContent.trim();
                const reason = card.querySelector('.khung-canh-bao-ben-trong p');
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

    const createButtons = document.querySelectorAll('.nut-chinh');
    createButtons.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            window.location.href = '7-dvcht.html';
        });
    });
});