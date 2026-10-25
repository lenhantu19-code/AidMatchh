document.addEventListener('DOMContentLoaded', () => {
    // Xử lý nút lọc tab trong phần nhu cầu đang chờ đợi
    const tabBtns = document.querySelectorAll('.nut-tab');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('dang-chon'));
            btn.classList.add('dang-chon');
        });
    });

    // Thông báo tương tác khi bấm nút gửi nhu cầu cứu trợ / khai báo nguồn lực
    const ctaButtons = document.querySelectorAll('.nut-chinh, .nut-vien, .nut-chinh-dau-trang');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (!button.classList.contains('nut-chinh-dau-trang')) {
                // Không chặn sự kiện đăng nhập nếu click vào nút đăng nhập header
                console.log('Action triggered.');
            }
        });
    });
});