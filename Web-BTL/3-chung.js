document.addEventListener('DOMContentLoaded', () => {
    // Chỉ chạy sau khi HTML đã tải xong để các phần tử có thể được tìm thấy.

    // Đồng bộ giao diện thẻ vai trò với ô radio được chọn.
    const roleCards = document.querySelectorAll('.the-vai-tro');
    roleCards.forEach(card => {
        card.addEventListener('click', () => {
            roleCards.forEach(c => c.classList.remove('dang-chon'));
            card.classList.add('dang-chon');
            const radio = card.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
        });
    });

    // Lấy biểu mẫu, các trường dữ liệu và vùng hiển thị lỗi.
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const fields = registerForm.querySelectorAll('input:not([type="radio"]), select');
        const roleInputs = registerForm.querySelectorAll('input[name="role"]');
        const roleGrid = registerForm.querySelector('.luoi-the-vai-tro');
        const summary = document.getElementById('validationSummary');
        const summaryMessage = document.getElementById('validationMessage');
        const roleError = document.createElement('small');
        roleError.className = 'thong-bao-loi';
        roleError.dataset.validationError = 'true';
        roleError.textContent = 'Vui lòng chọn vai trò đăng ký.';
        roleError.hidden = true;
        roleGrid.insertAdjacentElement('afterend', roleError);

        // Trả về thông báo lỗi đầu tiên của một trường; chuỗi rỗng nghĩa là hợp lệ.
        function getErrorMessage(field) {
            const value = field.value.trim();

            if (field.required && (field.type === 'checkbox' ? !field.checked : !value)) {
                return field.type === 'checkbox'
                    ? 'Bạn cần đồng ý với điều khoản để tiếp tục.'
                    : 'Vui lòng nhập thông tin này.';
            }

            switch (field.name) {
                case 'email':
                    if (field.validity.typeMismatch) return 'Vui lòng nhập địa chỉ email hợp lệ.';
                    break;
                case 'phone':
                    if (!/^0\d{9}$/.test(value)) return 'Số điện thoại phải gồm đúng 10 chữ số và bắt đầu bằng 0.';
                    break;
                case 'password':
                    if (!/^(?=.*\p{L})(?=.*\d).{8,}$/u.test(field.value)) {
                        return 'Mật khẩu cần ít nhất 8 ký tự, gồm cả chữ và số.';
                    }
                    break;
                case 'confirmPassword':
                    if (field.value !== registerForm.querySelector('[name="password"]').value) {
                        return 'Mật khẩu nhập lại chưa khớp.';
                    }
                    break;
            }

            return '';
        }

        // Đánh dấu lỗi cạnh trường hoặc xóa lỗi sau khi người dùng sửa đúng.
        function validateField(field) {
            const container = field.type === 'checkbox'
                ? field.closest('.nhom-dieu-khoan')
                : field.closest('.nhom-truong-bieu-mau');
            let error = container.querySelector('[data-validation-error]');
            const message = getErrorMessage(field);

            if (message) {
                if (!error) {
                    error = document.createElement('small');
                    error.className = 'thong-bao-loi';
                    error.dataset.validationError = 'true';
                    container.appendChild(error);
                }
                error.textContent = message;
                container.classList.add('loi');
                field.setAttribute('aria-invalid', 'true');
                return false;
            }

            if (error) error.remove();
            container.classList.remove('loi');
            field.removeAttribute('aria-invalid');
            return true;
        }

        // Kiểm tra tất cả trường và vai trò, đồng thời ghi nhận trường sai đầu tiên.
        function validateForm() {
            let valid = true;
            let invalidCount = 0;
            let firstInvalidField = null;

            fields.forEach(field => {
                if (!validateField(field)) {
                    valid = false;
                    invalidCount += 1;
                    firstInvalidField = firstInvalidField || field;
                }
            });

            const hasRole = [...roleInputs].some(input => input.checked);
            roleError.hidden = hasRole;
            roleGrid.classList.toggle('loi', !hasRole);
            roleInputs.forEach(input => input.setAttribute('aria-invalid', String(!hasRole)));
            if (!hasRole) {
                valid = false;
                invalidCount += 1;
                firstInvalidField = firstInvalidField || roleInputs[0];
            }

            return { valid, firstInvalidField, invalidCount };
        }

        // Kiểm tra lại khi nhập hoặc thay đổi lựa chọn.
        fields.forEach(field => {
            field.addEventListener('input', () => {
                validateField(field);
                if (field.name === 'password') {
                    validateField(registerForm.querySelector('[name="confirmPassword"]'));
                }
                if (!summary.hidden) updateSummary();
            });
            field.addEventListener('change', () => {
                validateField(field);
                if (!summary.hidden) updateSummary();
            });
        });

        // Cập nhật trạng thái chọn vai trò nếu bảng tổng hợp lỗi đang mở.
        roleInputs.forEach(input => {
            input.addEventListener('change', () => {
                if (!summary.hidden) updateSummary();
            });
        });

        // Hiện số mục cần sửa; ẩn thông báo khi toàn bộ dữ liệu hợp lệ.
        function updateSummary() {
            const result = validateForm();
            summary.hidden = result.valid;
            if (!result.valid) {
                summaryMessage.textContent = `Còn ${result.invalidCount} mục cần kiểm tra. Các trường chưa hợp lệ được đánh dấu bên dưới.`;
            }
            return result;
        }

        // Chặn gửi biểu mẫu nếu còn lỗi; nếu hợp lệ thì thông báo chưa kết nối máy chủ.
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const result = updateSummary();
            if (!result.valid) {
                result.firstInvalidField.focus();
                return;
            }

            alert('Thông tin hợp lệ. Chức năng đăng ký hiện chưa kết nối máy chủ.');
        });
    }
});