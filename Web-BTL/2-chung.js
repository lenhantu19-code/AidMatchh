document.addEventListener('DOMContentLoaded', () => {
    // Xử lý ẩn/hiện mật khẩu
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('passwordInput');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.textContent = type === 'password' ? 'Hiện' : 'Ẩn';
        });
    }

    // Xử lý sự kiện submit form đăng nhập
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Đang xác thực thông tin đăng nhập...');
        });
    }
});