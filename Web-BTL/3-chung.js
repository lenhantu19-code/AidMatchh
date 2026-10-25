document.addEventListener('DOMContentLoaded', () => {
    // Xử lý chuyển đổi qua lại giữa các thẻ chọn vai trò (Đơn vị cần hỗ trợ / Nhà tài trợ)
    const roleCards = document.querySelectorAll('.the-vai-tro');
    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            roleCards.forEach(c => c.classList.remove('dang-chon'));
            card.classList.add('dang-chon');
            const radio = card.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    // Xử lý submit form đăng ký
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Đã gửi thông tin đăng ký tổ chức xác thực thành công!');
        });
    }
});