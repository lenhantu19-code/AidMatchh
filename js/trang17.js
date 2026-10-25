/**
 * AidMatch - Trang 17: Theo dõi phân bổ Logic
 * Tự động kích hoạt Toast thông báo góc phải dưới giống hệt Trang 14 khi bấm nút.
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("AidMatch Trang 17 loaded successfully.");
  initButtonToastEvents();
});

/* 1. Điều khiển Sidebar Mobile */
function toggleMobileSidebar() {
  const sidebar = document.getElementById("appSidebar");
  const backdrop = document.getElementById("sidebarBackdrop");

  if (sidebar) {
    sidebar.classList.toggle("kich-hoat");
  }
  if (backdrop) {
    backdrop.style.display = sidebar.classList.contains("kich-hoat")
      ? "block"
      : "none";
  }
}

/* 2. Hệ thống Toast thông báo nổi góc phải dưới (Chuẩn Trang 14) */
function showToast(message, type = "thong-tin") {
  let container = document.getElementById("toastContainer");

  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "khung-thong-bao-noi";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `thong-bao-noi thong-bao-noi-${type}`;

  let iconClass = "fa-info-circle";
  if (type === "thanh-cong") iconClass = "fa-circle-check";
  if (type === "canh-bao") iconClass = "fa-triangle-exclamation";
  if (type === "nguy-hiem" || type === "loi") iconClass = "fa-circle-xmark";

  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Hiệu ứng tự động ẩn sau 3.5 giây
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* 3. Tự động gắn sự kiện Toast khi bấm vào các Button trên trang */
function initButtonToastEvents() {
  const allButtons = document.querySelectorAll("button, .nut, .nut-lien-ket");

  allButtons.forEach((btn) => {
    if (btn.hasAttribute("onclick")) return;

    btn.addEventListener("click", () => {
      const btnText = btn.textContent.trim();

      if (btn.type === "submit") {
        showToast(`Đã gửi: ${btnText}`, "thanh-cong");
      } else if (btn.classList.contains("nut-do-hong")) {
        showToast(`Đã thực hiện: ${btnText}`, "nguy-hiem");
      } else if (
        btn.classList.contains("nut-xam-den") ||
        btn.classList.contains("nut-xam-nhat")
      ) {
        showToast(`Đã xử lý: ${btnText}`, "canh-bao");
      } else {
        showToast(`Đã chọn: ${btnText}`, "thong-tin");
      }
    });
  });
}

/* 4. Bộ lọc tìm kiếm và trạng thái bảng phân bổ */
function filterTable() {
  const searchInput = document.getElementById("searchInput");
  const statusFilter = document.getElementById("statusFilter");
  const regionFilter = document.getElementById("regionFilter");

  if (!searchInput || !statusFilter || !regionFilter) return;

  const searchValue = searchInput.value.toLowerCase();
  const statusValue = statusFilter.value;
  const regionValue = regionFilter.value;

  const table = document.getElementById("allocationTable");
  if (!table) return;

  const rows = table
    .getElementsByTagName("tbody")[0]
    .getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const textContent = row.textContent.toLowerCase();
    const rowStatus = row.getAttribute("data-status");
    const rowRegion = row.getAttribute("data-region");

    const matchesSearch = textContent.includes(searchValue);
    const matchesStatus = statusValue === "all" || rowStatus === statusValue;
    const matchesRegion = regionValue === "all" || rowRegion === regionValue;

    if (matchesSearch && matchesStatus && matchesRegion) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
}

/* 5. Xử lý khi gửi biểu mẫu điều chỉnh phân công */
function handleAdjustment(event) {
  event.preventDefault();
  showToast(
    "Đã gửi cập nhật và thông báo điều chỉnh thành công!",
    "thanh-cong",
  );
}
