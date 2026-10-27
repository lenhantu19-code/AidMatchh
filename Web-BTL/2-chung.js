document.addEventListener("DOMContentLoaded", () => {
  // Xử lý ẩn/hiện mật khẩu
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("passwordInput");

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener("click", () => {
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      togglePassword.textContent = type === "password" ? "Hiện" : "Ẩn";
    });
  }

  // Xử lý sự kiện submit form đăng nhập và điều hướng theo vai trò
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("emailInput");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Ngăn chặn form tải lại trang

      // Lấy giá trị email người dùng nhập vào
      const email = emailInput.value.trim().toLowerCase();

      // Định nghĩa 4 email tương ứng với 4 vai trò và điều hướng
      switch (email) {
        // 1. Vai trò Quản trị viên (Admin)
        case "phaman19@gmail.com":
          window.location.href = "../BTL/index1(6).html";
          break;

        // 2. Vai trò điều phối viên - Sử dụng email mặc định trong HTML
        case "leha28@gmail.com":
          window.location.href = "../acces/trang14.html";
          break;

        // 3. Vai trò Nhà tài trợ (Donor)
        case "tranminh14@gmail.com":
          window.location.href = "../BTL/index1.html";
          break;

        // 4. Vai trò Người cần hỗ trợ (Receiver/User)
        case "nguyenlan01@gmail.com":
          window.location.href = "6-dvcht.html";
          break;

        // Email không thuộc các tài khoản được phân quyền trong trang này
        default:
          alert("Email không tồn tại trong hệ thống phân quyền.");
          break;
      }
    });
  }
});
