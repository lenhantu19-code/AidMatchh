document.addEventListener('DOMContentLoaded', () => {
    // Xử lý chuyển tab lọc
    const tabBtns = document.querySelectorAll('.nut-tab');
    const needCards = document.querySelectorAll('.the-nhu-cau');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('dang-chon'));
            btn.classList.add('dang-chon');

            const selectedTab = btn.textContent.trim().replace(/\s*\(\d+\)$/, '');

            needCards.forEach(card => {
                const status = card.querySelector('.nhan-trang-thai').textContent.trim();
                const isVisible = selectedTab === 'Tất cả'
                    || (selectedTab === 'Đang hoạt động'
                        && ['Đáp ứng một phần', 'Đã duyệt', 'Chờ duyệt'].includes(status))
                    || (selectedTab === 'Bản nháp' && status === 'Bản nháp')
                    || (selectedTab === 'Hoàn thành & lưu trữ'
                        && ['Hoàn thành', 'Đã lưu trữ'].includes(status));

                card.style.display = isVisible ? '' : 'none';
            });
        });
    });

    // Thông báo khi bấm nút tạo nhu cầu mới

 const createButtons = document.querySelectorAll('.nut-chinh');
    createButtons.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            window.location.href = '7-dvcht.html';
        });
    });
});