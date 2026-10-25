document.addEventListener('DOMContentLoaded', () => {
    const overviewLink = document.querySelector('.thanh-ben .muc-danh-muc');
    if (overviewLink) {
        overviewLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = '6-dvcht.html';
        });
    }

    // Xử lý sự kiện khi submit form tạo nhu cầu
    const form = document.getElementById('createNeedForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Đã gửi yêu cầu tạo nhu cầu hỗ trợ thành công! Hệ thống đang chờ điều phối viên phê duyệt.');
            // Có thể chuyển hướng về trang "Nhu cầu của tôi"
            // window.location.href = 'nhu-cau-cua-toi.html';
        });
    }

    // Xử lý nút lưu bản nháp
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => {
            alert('Đã lưu bản nháp nhu cầu thành công!');
        });
    }
});