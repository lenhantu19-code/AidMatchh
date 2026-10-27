document.addEventListener("DOMContentLoaded", () => {
  // Utility for Async Action with Loading State on Buttons
  async function handleButtonAction(button, asyncFn) {
    if (!button || button.classList.contains("nut-dang-tai")) return;

    const originalContent = button.innerHTML;
    button.classList.add("nut-dang-tai");
    button.disabled = true;
    button.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Xử lý...`;

    try {
      await asyncFn();
    } catch (error) {
      showToast("Có lỗi xảy ra. Vui lòng thử lại sau.", "nguy-hiem");
    } finally {
      button.classList.remove("nut-dang-tai");
      button.disabled = false;
      button.innerHTML = originalContent;
    }
  }

  // Bind Buttons
  const btnExportReport = document.getElementById("btnExportReport");
  const btnApplyFilter = document.getElementById("btnApplyFilter");
  const btnGenerateDraft = document.getElementById("btnGenerateDraft");
  const btnApproveDraft = document.getElementById("btnApproveDraft");
  const btnSaveDraft = document.getElementById("btnSaveDraft");
  const btnConfirmExport = document.getElementById("btnConfirmExport");
  const btnNotifications = document.getElementById("btnNotifications");

  if (btnExportReport) {
    btnExportReport.addEventListener("click", () => {
      handleButtonAction(btnExportReport, () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            showToast("Đã chuẩn bị file xuất báo cáo tác động!", "thanh-cong");
            resolve();
          }, 800);
        });
      });
    });
  }

  if (btnApplyFilter) {
    btnApplyFilter.addEventListener("click", () => {
      handleButtonAction(btnApplyFilter, () => {
        return new Promise((resolve) => {
          const scope = document.getElementById("provinceScope").value;
          const category = document.getElementById("categoryScope").value;
          setTimeout(() => {
            showToast(
              `Đã áp dụng bộ lọc: ${scope} - ${category}`,
              "thanh-cong",
            );
            resolve();
          }, 600);
        });
      });
    });
  }

  if (btnGenerateDraft) {
    btnGenerateDraft.addEventListener("click", () => {
      handleButtonAction(btnGenerateDraft, () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            showToast("AI đã hoàn thành tạo bản nháp mới!", "thanh-cong");
            resolve();
          }, 1200);
        });
      });
    });
  }

  if (btnApproveDraft) {
    btnApproveDraft.addEventListener("click", () => {
      handleButtonAction(btnApproveDraft, () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            showToast("Đã chấp nhận bản nháp thành công.", "thanh-cong");
            resolve();
          }, 500);
        });
      });
    });
  }

  if (btnSaveDraft) {
    btnSaveDraft.addEventListener("click", () => {
      handleButtonAction(btnSaveDraft, () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            showToast("Đã lưu bản thảo báo cáo vào hệ thống.", "thong-tin");
            resolve();
          }, 500);
        });
      });
    });
  }

  if (btnConfirmExport) {
    btnConfirmExport.addEventListener("click", () => {
      handleButtonAction(btnConfirmExport, () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            showToast("Báo cáo đã xuất bản thành công!", "thanh-cong");
            resolve();
          }, 800);
        });
      });
    });
  }

  if (btnNotifications) {
    btnNotifications.addEventListener("click", () => {
      showToast("Bạn có 1 thông báo mới về đối chiếu báo cáo.", "thong-tin");
    });
  }

  function showToast(message, type = "thong-tin") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `thong-bao-noi thong-bao-noi-${type}`;

    let iconClass = "fa-info-circle";
    if (type === "thanh-cong") iconClass = "fa-circle-check";
    if (type === "nguy-hiem") iconClass = "fa-circle-xmark";

    toast.innerHTML = `
      <i class="fa-solid ${iconClass}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(20px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
});
