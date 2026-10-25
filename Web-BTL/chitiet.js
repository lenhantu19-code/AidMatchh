document.addEventListener('DOMContentLoaded', () => {
    // Xử lý nút xác nhận đợt mới
    const confirmBtn = document.getElementById('confirmBatchBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            alert('Đã xác nhận tiếp nhận đợt mới thành công!');
        });
    }

    // Xử lý nút gửi yêu cầu thay đổi
    const requestChangeBtn = document.getElementById('requestChangeBtn');
    if (requestChangeBtn) {
        requestChangeBtn.addEventListener('click', () => {
            alert('Yêu cầu thay đổi đã được gửi đến điều phối viên!');
        });
    }
});