document.addEventListener("DOMContentLoaded", () => {
  /*khỏi tạo dữ liệu*/
  let requestsData = [
    {
      id: "NC-033",
      org: "Điểm Hải Sơn",
      title: "200 bộ nhu yếu phẩm cho điểm Hải Sơn",
      description:
        "Đợt lũ quét vừa qua gây thiệt hại nặng nề tại khu vực Hải Sơn. Cần hỗ trợ khẩn cấp 200 bộ nhu yếu phẩm gồm gạo, lương khô, đồ hộp và đèn pin cho người dân.",
      location: "Quảng Trị",
      quantity: "200 bộ",
      category: "Nhu yếu phẩm",
      priority: "urgent", // urgent | high | normal
      status: "pending", // pending | info_needed | approved | rejected
      isDuplicate: false,
      aiNote: "Không phát hiện trùng lặp. Độ ưu tiên cao do bão số 4.",
    },
    {
      id: "NC-034",
      org: "Trường Tiểu học Hương Vinh",
      title: "50 thùng nước sạch & 20 bộ sơ cứu",
      description:
        "Nguồn nước giếng tại trường bị ô nhiễm nặng sau ngập lũ. Cần gấp nước sạch sinh hoạt và vật tư y tế sơ cứu cho học sinh.",
      location: "Thừa Thiên Huế",
      quantity: "50 thùng",
      category: "Nước sạch",
      priority: "urgent",
      status: "pending",
      isDuplicate: true,
      aiNote:
        "Cảnh báo: Có hồ sơ tương tự NC-019 yêu cầu nước sạch tại cùng xã Hương Vinh. Vui lòng xác minh trước khi duyệt.",
    },
    {
      id: "NC-035",
      org: "UBND Xã Hòa Khương",
      title: "100 áo phao & 30 đèn pin công suất lớn",
      description:
        "Trang bị cho đội cứu hộ xung kích ứng phó đợt mưa lớn dự báo tiếp diễn trong 3 ngày tới.",
      location: "Đà Nẵng",
      quantity: "100 cái",
      category: "Đồ sinh hoạt",
      priority: "high",
      status: "pending",
      isDuplicate: false,
      aiNote: "Hồ sơ hợp lệ, đúng mẫu chuẩn.",
    },
    {
      id: "NC-036",
      org: "Trạm Y tế Xã Phước Sơn",
      title: "30 hộp thuốc y tế sơ cứu & băng gạc",
      description:
        "Dự trữ thuốc thiết yếu chữa bệnh ngoài da và tiêu hóa cho nhân dân vùng ngập lũ.",
      location: "Quảng Nam",
      quantity: "30 hộp",
      category: "Y tế & Sơ cứu",
      priority: "normal",
      status: "pending",
      isDuplicate: false,
      aiNote: "Dữ liệu minh bạch, địa bàn tiếp cận thuận lợi.",
    },
    {
      id: "NC-031",
      org: "Đội Thanh niên Tình nguyện Bình Sơn",
      title: "150 áo phao cứu hộ cá nhân",
      description:
        "Cần bổ sung danh sách hộ gia đình thụ hưởng chính xác trước khi tiến hành phê duyệt phân bổ.",
      location: "Quảng Trị",
      quantity: "150 chiếc",
      category: "Đồ sinh hoạt",
      priority: "high",
      status: "info_needed",
      isDuplicate: false,
      aiNote: "Yêu cầu cập nhật minh chứng danh sách chi tiết.",
    },
    {
      id: "NC-030",
      org: "Mặt trận Tổ quốc Huyện Lộc Thủy",
      title: "80 thùng lương khô khẩn cấp",
      description:
        "Đã gửi yêu cầu giải trình lý do chênh lệch số lượng hộ đăng ký.",
      location: "Thừa Thiên Huế",
      quantity: "80 thùng",
      category: "Nhu yếu phẩm",
      priority: "normal",
      status: "info_needed",
      isDuplicate: false,
      aiNote: "Đang đợi bản quét bổ sung dấu đỏ.",
    },
    {
      id: "NC-028",
      org: "Cộng đồng Thôn 4 Phong Điền",
      title: "100 thùng nước lọc tinh khiết",
      description: "Đã phê duyệt và chuyển sang hàng chờ phân bổ cứu trợ.",
      location: "Thừa Thiên Huế",
      quantity: "100 thùng",
      category: "Nước sạch",
      priority: "high",
      status: "approved",
      isDuplicate: false,
      aiNote: "Đã hoàn tất kiểm tra tính chính xác.",
    },
    {
      id: "NC-027",
      org: "Nhóm Thiện nguyện Hương Thủy",
      title: "40 bộ bạt nhựa chống nước",
      description: "Đã xác nhận đủ điều kiện phân bổ trong ngày.",
      location: "Thừa Thiên Huế",
      quantity: "40 bộ",
      category: "Đồ sinh hoạt",
      priority: "normal",
      status: "approved",
      isDuplicate: false,
      aiNote: "Xác minh thành công.",
    },
    {
      id: "NC-025",
      org: "Hội Chữ Thập Đỏ Huyện A Lưới",
      title: "500 suất quà không rõ nội dung",
      description:
        "Hồ sơ thiếu thông tin cụ thể về danh mục cứu trợ và không có xác nhận của địa phương.",
      location: "Thừa Thiên Huế",
      quantity: "500 suất",
      category: "Nhu yếu phẩm",
      priority: "normal",
      status: "rejected",
      isDuplicate: false,
      aiNote: "Từ chối do vi phạm quy định minh bạch thông tin.",
    },
  ];

  /*lưu trạng thái*/
  let activeTab = "pending";
  let currentSelectedId = "NC-033";
  let searchQuery = "";
  let priorityFilterValue = "all";
  let regionFilterValue = "all";
  let categoryFilterValue = "all";

  /*dom để lưu thẻ*/
  const requestListEl = document.getElementById("requestList");
  const searchInput = document.getElementById("searchInput");
  const priorityFilter = document.getElementById("priorityFilter");
  const regionFilter = document.getElementById("regionFilter");
  const categoryFilter = document.getElementById("categoryFilter");
  const recordCountText = document.getElementById("recordCountText");

  const detailPanelCode = document.getElementById("detailPanelCode");
  const detailOrg = document.getElementById("detailOrg");
  const detailTitle = document.getElementById("detailTitle");
  const detailDesc = document.getElementById("detailDesc");
  const detailLocation = document.getElementById("detailLocation");
  const detailQuantity = document.getElementById("detailQuantity");
  const detailCategory = document.getElementById("detailCategory");
  const detailPriority = document.getElementById("detailPriority");
  const detailBadges = document.getElementById("detailBadges");
  const detailAIText = document.getElementById("detailAIText");

  const btnApprove = document.getElementById("btnApprove");
  const btnRequestEdit = document.getElementById("btnRequestEdit");
  const btnReject = document.getElementById("btnReject");

  const cntPending = document.getElementById("cnt-pending");
  const cntInfo = document.getElementById("cnt-info");
  const cntDup = document.getElementById("cnt-dup");
  const cntDone = document.getElementById("cnt-done");

  const badgeTabPending = document.getElementById("badgeTabPending");
  const badgeTabInfo = document.getElementById("badgeTabInfo");
  const badgeTabApproved = document.getElementById("badgeTabApproved");
  const badgeTabRejected = document.getElementById("badgeTabRejected");
  const sidebarBadgePending = document.getElementById("sidebarBadgePending");

  /*lọc danh sách*/
  function renderList() {
    const filtered = requestsData.filter((item) => {
      const matchesTab = item.status === activeTab;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.org.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority =
        priorityFilterValue === "all" || item.priority === priorityFilterValue;
      const matchesRegion =
        regionFilterValue === "all" || item.location === regionFilterValue;
      const matchesCategory =
        categoryFilterValue === "all" || item.category === categoryFilterValue;

      return (
        matchesTab &&
        matchesSearch &&
        matchesPriority &&
        matchesRegion &&
        matchesCategory
      );
    });

    requestListEl.innerHTML = "";

    if (filtered.length === 0) {
      requestListEl.innerHTML = `
                <div style="padding: 2.5rem; text-align: center; color: var(--slate-400); font-size: 0.875rem;">
                    <i class="fa-solid fa-folder-open" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
                    Không tìm thấy hồ sơ nào phù hợp.
                </div>
            `;
      recordCountText.textContent = "Hiển thị 0 bản ghi";
      return;
    }

    recordCountText.textContent = `Hiển thị ${filtered.length} bản ghi`;

    filtered.forEach((item) => {
      const itemEl = document.createElement("div");
      itemEl.className = `muc-yeu-cau ${item.id === currentSelectedId ? "duoc-chon" : ""}`;
      itemEl.setAttribute("data-id", item.id);

      let priorityBadgeClass = "nhan-binh-thuong";
      let priorityText = "Bình thường";

      if (item.priority === "urgent") {
        priorityBadgeClass = "nhan-khan-cap";
        priorityText = "Khẩn cấp";
      } else if (item.priority === "high") {
        priorityBadgeClass = "nhan-uu-tien-cao";
        priorityText = "Ưu tiên cao";
      }

      itemEl.innerHTML = `
                <div class="dau-muc">
                    <span class="ma-muc">${item.id}</span>
                    <span class="the-nhan ${priorityBadgeClass}">${priorityText}</span>
                </div>
                <div class="to-chuc-muc">${item.org}</div>
                <div class="tieu-de-muc">${item.title}</div>
                <div class="thong-tin-phu-muc">
                    <span><i class="fa-solid fa-location-dot bieu-tuong-thong-tin-phu"></i>${item.location}</span>
                    <span><i class="fa-solid fa-box bieu-tuong-thong-tin-phu"></i>${item.quantity}</span>
                    ${item.isDuplicate ? '<span class="the-nhan nhan-trung-lap"><i class="fa-solid fa-clone"></i>Trùng lặp?</span>' : ""}
                </div>
            `;

      itemEl.addEventListener("click", () => selectRequest(item.id));
      requestListEl.appendChild(itemEl);
    });
    if (
      !filtered.some((i) => i.id === currentSelectedId) &&
      filtered.length > 0
    ) {
      selectRequest(filtered[0].id);
    }
  }
  /*liên kết link a*/
  function selectRequest(id) {
    currentSelectedId = id;
    const target = requestsData.find((i) => i.id === id);

    if (!target) return;

    // Highlight selection in list
    document.querySelectorAll(".muc-yeu-cau").forEach((el) => {
      if (el.getAttribute("data-id") === id) {
        el.classList.add("duoc-chon");
      } else {
        el.classList.remove("duoc-chon");
      }
    });

    // Update Detail Panel Content
    detailPanelCode.textContent = target.id;
    detailOrg.textContent = target.org;
    detailTitle.textContent = target.title;
    detailDesc.textContent = target.description;
    detailLocation.textContent = target.location;
    detailQuantity.textContent = target.quantity;
    detailCategory.textContent = target.category;

    let priorityText = "Bình thường";
    if (target.priority === "urgent") priorityText = "Khẩn cấp";
    if (target.priority === "high") priorityText = "Ưu tiên cao";
    detailPriority.textContent = priorityText;

    // Render Status & Duplicate Badges
    detailBadges.innerHTML = "";
    if (target.isDuplicate) {
      detailBadges.innerHTML += `<span class="the-nhan nhan-trung-lap"><i class="fa-solid fa-clone"></i> AI Cảnh báo trùng</span>`;
    }

    if (target.status === "pending") {
      detailBadges.innerHTML += `<span class="the-nhan nhan-uu-tien-cao">Chờ xét duyệt</span>`;
    } else if (target.status === "info_needed") {
      detailBadges.innerHTML += `<span class="the-nhan nhan-thong-tin-bo-sung">Cần bổ sung</span>`;
    } else if (target.status === "approved") {
      detailBadges.innerHTML += `<span class="the-nhan nhan-da-duyet">Đã duyệt</span>`;
    } else if (target.status === "rejected") {
      detailBadges.innerHTML += `<span class="the-nhan nhan-da-tu-choi">Đã từ chối</span>`;
    }

    detailAIText.textContent = target.aiNote || "Không có cảnh báo đặc biệt.";

    // Enable / Disable Action Buttons based on status
    if (target.status === "approved" || target.status === "rejected") {
      btnApprove.disabled = true;
      btnRequestEdit.disabled = true;
      btnReject.disabled = true;
    } else {
      btnApprove.disabled = false;
      btnRequestEdit.disabled = false;
      btnReject.disabled = false;
    }
  }
  /*cập nhật thống kê*/
  function updateKPIs() {
    const pendingCount = requestsData.filter(
      (i) => i.status === "pending",
    ).length;
    const infoCount = requestsData.filter(
      (i) => i.status === "info_needed",
    ).length;
    const dupCount = requestsData.filter(
      (i) => i.isDuplicate && i.status === "pending",
    ).length;
    const approvedCount = requestsData.filter(
      (i) => i.status === "approved",
    ).length;
    const rejectedCount = requestsData.filter(
      (i) => i.status === "rejected",
    ).length;

    cntPending.textContent = pendingCount;
    cntInfo.textContent = infoCount;
    cntDup.textContent = dupCount;
    cntDone.textContent = approvedCount + rejectedCount;

    badgeTabPending.textContent = pendingCount;
    badgeTabInfo.textContent = infoCount;
    badgeTabApproved.textContent = approvedCount;
    badgeTabRejected.textContent = rejectedCount;
    sidebarBadgePending.textContent = pendingCount;
  }

  // Tabs Switch Listener
  document.querySelectorAll(".nut-the-chuyen").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document
        .querySelectorAll(".nut-the-chuyen")
        .forEach((t) => t.classList.remove("kich-hoat"));
      const clickedBtn = e.currentTarget;
      clickedBtn.classList.add("kich-hoat");

      activeTab = clickedBtn.getAttribute("data-tab");
      renderList();
    });
  });

  document.querySelectorAll(".the-kpi").forEach((card) => {
    card.addEventListener("click", () => {
      const kpiType = card.getAttribute("data-kpi");
      if (kpiType === "pending") {
        switchTab("pending");
      } else if (kpiType === "info_needed") {
        switchTab("info_needed");
      } else if (kpiType === "processed") {
        switchTab("approved");
      } else if (kpiType === "duplicate") {
        switchTab("pending");
        showToast(
          "Cảnh báo AI: Hiển thị các hồ sơ trùng lặp cần xem xét.",
          "canh-bao",
        );
      }
    });
  });

  function switchTab(tabKey) {
    activeTab = tabKey;
    document.querySelectorAll(".nut-the-chuyen").forEach((t) => {
      if (t.getAttribute("data-tab") === tabKey) {
        t.classList.add("kich-hoat");
      } else {
        t.classList.remove("kich-hoat");
      }
    });
    renderList();
  }

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderList();
  });

  priorityFilter.addEventListener("change", (e) => {
    priorityFilterValue = e.target.value;
    renderList();
  });

  regionFilter.addEventListener("change", (e) => {
    regionFilterValue = e.target.value;
    renderList();
  });

  categoryFilter.addEventListener("change", (e) => {
    categoryFilterValue = e.target.value;
    renderList();
  });

  // Request Action Button Events
  btnApprove.addEventListener("click", () => {
    const item = requestsData.find((i) => i.id === currentSelectedId);
    if (item) {
      item.status = "approved";
      updateKPIs();
      renderList();
      showToast(`Đã duyệt thành công hồ sơ ${item.id}!`, "thanh-cong");
    }
  });

  btnRequestEdit.addEventListener("click", () => {
    const item = requestsData.find((i) => i.id === currentSelectedId);
    if (item) {
      item.status = "info_needed";
      updateKPIs();
      renderList();
      showToast(`Đã gửi yêu cầu bổ sung thông tin cho ${item.id}`, "thong-tin");
    }
  });

  btnReject.addEventListener("click", () => {
    const item = requestsData.find((i) => i.id === currentSelectedId);
    if (item) {
      item.status = "rejected";
      updateKPIs();
      renderList();
      showToast(`Đã từ chối hồ sơ ${item.id}`, "nguy-hiem");
    }
  });
  document.querySelectorAll(".muc-dieu-huong").forEach((nav) => {
    nav.addEventListener("click", (e) => {
      const href = nav.getAttribute("href");
      const label = nav.querySelector("span:not(.huy-hieu-dem)")
        ? nav.querySelector("span:not(.huy-hieu-dem)").textContent.trim()
        : "Mục";

      document
        .querySelectorAll(".muc-dieu-huong")
        .forEach((n) => n.classList.remove("kich-hoat"));
      nav.classList.add("kich-hoat");

      if (!href || href === "#") {
        e.preventDefault();
        showToast(`Chuyển hướng sang: ${label}`, "thong-tin");
        return;
      }

      showToast(`Đang chuyển sang: ${label}`, "thong-tin");
      setTimeout(() => {
        window.location.href = href;
      }, 250);
    });
  });

  document.getElementById("btnNotifications").addEventListener("click", () => {
    showToast("Bạn có 3 thông báo mới từ hệ thống điều phối.", "thong-tin");
  });

  /*thông báo nổi*/
  function showToast(message, type = "thong-tin") {
    const container = document.getElementById("toastContainer");
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

  // Initial Execution
  updateKPIs();
  renderList();
  selectRequest(currentSelectedId);
});
