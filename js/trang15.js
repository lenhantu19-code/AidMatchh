document.addEventListener("DOMContentLoaded", () => {
  initFormInteractions();
  initActionButtons();
});

// Khởi tạo các tương tác Form quyết định xét duyệt
function initFormInteractions() {
  const selectAction = document.getElementById("selectAction");
  const approvedQtyGroup = document.getElementById("approvedQtyGroup");
  const btnSubmitText = document.getElementById("btnSubmitText");
  const decisionForm = document.getElementById("decisionForm");

  if (!selectAction) return;

  // Thay đổi UI linh hoạt khi chọn hành động
  selectAction.addEventListener("change", (e) => {
    const val = e.target.value;
    if (val === "approve") {
      approvedQtyGroup.style.display = "block";
      btnSubmitText.innerText = "Xác nhận phê duyệt nhu cầu";
      showToast("Chế độ: Phê duyệt nhu cầu cứu trợ", "thong-tin");
    } else if (val === "request_info") {
      approvedQtyGroup.style.display = "block";
      btnSubmitText.innerText = "Xác nhận yêu cầu bổ sung";
      showToast("Chế độ: Yêu cầu bổ sung thông tin", "thong-tin");
    } else if (val === "reject") {
      approvedQtyGroup.style.display = "none";
      btnSubmitText.innerText = "Xác nhận từ chối nhu cầu";
      showToast("Chế độ: Từ chối nhu cầu cứu trợ", "thong-tin");
    }
  });

  // Xử lý submit form xét duyệt
  decisionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const action = selectAction.value;
    const reason = document.getElementById("textReason").value.trim();
    const confirmRead = document.getElementById("checkConfirmRead").checked;

    if (!confirmRead) {
      showToast(
        "Vui lòng tích xác nhận đã đọc hồ sơ trước khi gửi!",
        "nguy-hiem",
      );
      return;
    }

    if (!reason) {
      showToast("Vui lòng nhập lý do / yêu cầu bắt buộc!", "nguy-hiem");
      return;
    }

    if (action === "approve") {
      showToast("Đã phê duyệt nhu cầu NC-033 thành công!", "thanh-cong");
    } else if (action === "request_info") {
      showToast("Đã gửi yêu cầu bổ sung tới tổ chức thành công!", "thong-tin");
    } else if (action === "reject") {
      showToast("Đã từ chối nhu cầu NC-033", "nguy-hiem");
    }
  });
}

// Khởi tạo các nút thao tác nhanh
function initActionButtons() {
  document.getElementById("notifBtn")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const badge = button.querySelector(".cham-hieu-so");
    if (badge) badge.style.display = "none";
    button.setAttribute("aria-label", "Không có thông báo mới");
    showToast("Bạn có 3 thông báo mới từ hệ thống.", "thong-tin");
  });

  document.getElementById("btnMarkNotDup")?.addEventListener("click", () => {
    showToast("Đã đánh dấu hồ sơ NC-033 không trùng lặp", "thanh-cong");
  });

  document.getElementById("btnLinkRef")?.addEventListener("click", () => {
    showToast("Đã mở cửa sổ liên kết tham chiếu", "thong-tin");
  });

  document.getElementById("btnRejectSuggest")?.addEventListener("click", () => {
    showToast("Đã từ chối gợi ý của AI Assistant", "thong-tin");
  });

  document.getElementById("btnRecompare")?.addEventListener("click", () => {
    showToast("Đang chạy lại tiến trình đối chiếu AI...", "thong-tin");
  });

  document.getElementById("btnSaveCompare")?.addEventListener("click", () => {
    showToast("Đã lưu kết luận đối chiếu vào hồ sơ", "thanh-cong");
  });

  document.getElementById("btnSaveNote")?.addEventListener("click", () => {
    showToast("Đã lưu ghi chú nội bộ", "thanh-cong");
  });

  document
    .getElementById("btnCancelDecision")
    ?.addEventListener("click", () => {
      document.getElementById("textReason").value = "";
      showToast("Đã hủy các nhập liệu quyết định", "thong-tin");
    });

  document.getElementById("btnBackQueue")?.addEventListener("click", () => {
    showToast("Đang quay lại hàng đợi xét duyệt...", "thong-tin");
    setTimeout(() => {
      window.location.href = "../acces/trang14.html";
    }, 300);
  });
}

function showToast(message, type = "thong-tin") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `thong-bao-noi thong-bao-noi-${type}`;

  let iconClass = "fa-info-circle";
  if (type === "thanh-cong") iconClass = "fa-circle-check";
  if (type === "canh-bao") iconClass = "fa-triangle-exclamation";
  if (type === "nguy-hiem") iconClass = "fa-circle-xmark";

  toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
