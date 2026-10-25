document.addEventListener('DOMContentLoaded', () => {
    // Xử lý sự kiện lưu chỉnh sửa
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            alert('Đã lưu chỉnh sửa nhu cầu hỗ trợ NC-024 thành công!');
        });
    }

    // Xử lý sự kiện xác minh ngay
    const verifyBtn = document.getElementById('verifyBtn');
    if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
            alert('Hệ thống đang tiến hành kiểm tra và xác minh lại thông tin...');
        });
    }

    // Xử lý sự kiện hủy thay đổi
    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (confirm('Bạn có chắc chắn muốn hủy các thay đổi không?')) {
                location.reload();
            }
        });
    }
});