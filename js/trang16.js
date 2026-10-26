/**
 * AidMatch - Trang 16: Allocation Board Logic
 * Synchronized with Trang 14 Core Dashboard Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  // Lắng nghe nút thông báo
  const btnNotifications = document.getElementById("btnNotifications");
  if (btnNotifications) {
    btnNotifications.addEventListener("click", () => {
      showToast("Bạn có 3 thông báo phân bổ mới từ hệ thống.", "thong-tin");
    });
  }

  // Khởi tạo kiểm tra số lượng ban đầu
  validateAllocationQty();
});

/* 1. Chọn nhà tài trợ */
function acceptDonor(donorName) {
  const selectedInput = document.getElementById("selectedDonorInput");
  if (selectedInput) {
    selectedInput.value = donorName;
  }
  showToast(`Đã chọn ${donorName} vào form Phê duyệt!`, "thanh-cong");
}

/* 2. Kiểm tra số lượng phân bổ */
function validateAllocationQty() {
  const qtyInput = document.getElementById("allocationQtyInput");
  const warningText = document.getElementById("qtyWarningText");
  const alertBox = document.getElementById("approvalAlertBox");
  const alertDesc = document.getElementById("approvalAlertDesc");
  const alertTitle = document.getElementById("approvalAlertTitle");

  if (!qtyInput) return;

  const val = parseInt(qtyInput.value) || 0;

  if (val > 100) {
    qtyInput.style.borderColor = "var(--rose-600)";
    qtyInput.style.backgroundColor = "var(--rose-50)";
    qtyInput.style.color = "var(--rose-700)";

    if (warningText) {
      warningText.style.display = "flex";
      warningText.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Vượt ${val - 100} bộ. Chỉ còn 100 bộ chưa phân bổ (500 - 400).`;
    }

    if (alertBox) {
      alertBox.className = "khung-canh-bao-trang-thai chu-de-do-hong";
    }
    if (alertTitle) {
      alertTitle.innerText = "Chưa đủ điều kiện phê duyệt";
    }
    if (alertDesc) {
      alertDesc.innerText =
        "Giảm số lượng xuống ≤ 100 bộ và chờ cam kết CK-019 xác nhận. Không giữ chỗ thêm khi còn lỗi.";
    }
  } else {
    qtyInput.style.borderColor = "var(--slate-200)";
    qtyInput.style.backgroundColor = "var(--slate-50)";
    qtyInput.style.color = "var(--slate-800)";

    if (warningText) {
      warningText.style.display = "none";
    }

    if (alertBox) {
      alertBox.className = "khung-canh-bao-trang-thai chu-de-xanh-ngoc";
    }
    if (alertTitle) {
      alertTitle.innerText = "Đủ điều kiện phê duyệt";
    }
    if (alertDesc) {
      alertDesc.innerText =
        "Số lượng hợp lệ (≤ 100 bộ). Sẵn sàng phê duyệt phân bổ.";
    }
  }
}

/* 3. Loading xếp hạng AI */
function triggerAIRanking() {
  const statusText = document.getElementById("matchingStatusText");
  if (statusText) {
    statusText.innerHTML = `<i class="fa-solid fa-spinner bieu-tuong-xoay"></i> AI đang tính toán ma trận xếp hạng...`;
  }
  showToast("AI đang phân tích & xếp hạng nguồn lực tối ưu...", "thong-tin");

  setTimeout(() => {
    if (statusText) {
      statusText.innerHTML = `<span class="cham-xung-nhung"></span> Xếp hạng hoàn tất!`;
    }
    showToast("Hoàn tất xếp hạng nguồn lực cho nhu cầu đã chọn!", "thanh-cong");
  }, 1200);
}

/* 4. Lưu ghi chú đề xuất ghép */
function saveDecisionNote() {
  const noteInput = document.getElementById("decisionNote");
  if (noteInput && !noteInput.value.trim()) {
    showToast("Vui lòng nhập nội dung ghi chú đề xuất!", "canh-bao");
    return;
  }
  showToast("Đã lưu đề xuất ghép kèm ghi chú thành công!", "thanh-cong");
}

/* 5. Phê duyệt phân bổ (Form Submit) */
function handleAllocationSubmit(event) {
  event.preventDefault();
  const qtyInput = document.getElementById("allocationQtyInput");
  const qty = parseInt(qtyInput ? qtyInput.value : 0) || 0;

  if (qty > 100) {
    showToast(
      "Chưa thể phê duyệt: Số lượng vượt quá 100 bộ cho phép!",
      "nguy-hiem",
    );
    return;
  }
  showToast("Đã tạo phê duyệt phân bổ mới thành công!", "thanh-cong");
}

/* 6. Cập nhật khi chọn nhu cầu */
function updateMatchingInput() {
  const requestSelect = document.getElementById("requestSelect");
  const selectedReq = requestSelect ? requestSelect.value : "";
  showToast(`Đã tải dữ liệu nguồn lực cho nhu cầu ${selectedReq}`, "thong-tin");
}

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
  if (type === "nguy-hiem") iconClass = "fa-circle-xmark";

  toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
