document.addEventListener("DOMContentLoaded", () => {
  let orgsData = [
    {
      id: "TC-001",
      name: "Tạm An Bình",
      type: "Đơn vị cần hỗ trợ",
      province: "Quảng Trị",
      status: "verified",
      verifiedDate: "07/10",
      usersCount: 2,
      needsCount: 8,
      repName: "Nguyễn Lan",
      repPhone: "0901234567",
      email: "lanhoang@anbinh.example",
      address: "Điểm tiếp nhận An Bình, Hải Lăng, Quảng Trị",
      docName: "xac-nhan-an-binh.pdf",
    },
    {
      id: "TC-002",
      name: "Quỹ Đồng Hành",
      type: "Nhà tài trợ",
      province: "Quảng Trị",
      status: "verified",
      verifiedDate: "01/10",
      usersCount: 1,
      needsCount: 5,
      repName: "Trần Minh",
      repPhone: "0909888777",
      email: "donghanh@quy.example",
      address: "Quỹ Đồng Hành Chi nhánh Quảng Trị",
      docName: "quy-dong-hanh.pdf",
    },
    {
      id: "TC-003",
      name: "Điểm Đỉnh Minh",
      type: "Đơn vị cần hỗ trợ",
      province: "Quảng Trị",
      status: "verified",
      verifiedDate: "28/09",
      usersCount: 1,
      needsCount: 2,
      repName: "Lê Đỉnh",
      repPhone: "0912345678",
      email: "dinhminh@quangtri.example",
      address: "Xã Đỉnh Minh, Huyện Hướng Hóa",
      docName: "giay-xac-nhan-dinhminh.pdf",
    },
    {
      id: "TC-004",
      name: "Điểm Hải Sơn",
      type: "Đơn vị cần hỗ trợ",
      province: "Quảng Trị",
      status: "verified",
      verifiedDate: "25/09",
      usersCount: 2,
      needsCount: 11,
      repName: "Nguyễn Thu",
      repPhone: "0987654321",
      email: "haison@quangtri.example",
      address: "Thôn Hải Sơn, Xã Hải Lăng",
      docName: "xac-nhan-haison.pdf",
    },
    {
      id: "TC-008",
      name: "Nhóm Tiếp Sức",
      type: "Nhà tài trợ",
      province: "Đà Nẵng",
      status: "pending",
      verifiedDate: "Chờ duyệt",
      usersCount: 1,
      needsCount: 0,
      repName: "Đỗ Linh",
      repPhone: "0933445566",
      email: "linhed@tiepsuc.example",
      address: "Quận Hải Châu, Đà Nẵng",
      docName: "giay-dang-ky.pdf",
    },
    {
      id: "TC-009",
      name: "Nhóm Cứu Rỗi",
      type: "Nhà tài trợ",
      province: "Thừa Thiên Huế",
      status: "locked",
      verifiedDate: "15/08",
      usersCount: 0,
      needsCount: 0,
      repName: "Hoàng Minh",
      repPhone: "0977889900",
      email: "cuuroi@hue.example",
      address: "TP Huế",
      docName: "ho-so-cuuroi.pdf",
    },
  ];

  // App State
  let activeTab = "all";
  let currentSelectedId = "TC-001";
  let searchQuery = "";
  let typeFilterValue = "all";
  let statusFilterValue = "all";
  let provinceFilterValue = "all";

  // DOM Elements
  const orgTableBody = document.getElementById("orgTableBody");
  const searchInput = document.getElementById("searchInput");
  const typeFilter = document.getElementById("typeFilter");
  const statusFilter = document.getElementById("statusFilter");
  const provinceFilter = document.getElementById("provinceFilter");
  const tableFooterText = document.getElementById("tableFooterText");

  // Edit Form Inputs
  const formOrgTitle = document.getElementById("formOrgTitle");
  const editOrgName = document.getElementById("editOrgName");
  const editOrgRepresentative = document.getElementById(
    "editOrgRepresentative",
  );
  const editOrgPhone = document.getElementById("editOrgPhone");
  const editOrgEmail = document.getElementById("editOrgEmail");
  const editOrgAddress = document.getElementById("editOrgAddress");
  const linkedSectionTitle = document.getElementById("linkedSectionTitle");

  // Right Panels
  const verifyPanelTitle = document.getElementById("verifyPanelTitle");
  const verifyOrgName = document.getElementById("verifyOrgName");
  const verifyOrgType = document.getElementById("verifyOrgType");
  const verifyOrgRep = document.getElementById("verifyOrgRep");
  const verifyOrgEmail = document.getElementById("verifyOrgEmail");
  const verifyNoteInput = document.getElementById("verifyNoteInput");

  const btnApproveVerify = document.getElementById("btnApproveVerify");
  const btnRequestEditVerify = document.getElementById("btnRequestEditVerify");
  const btnExecuteLock = document.getElementById("btnExecuteLock");

  function renderTable() {
    const filtered = orgsData.filter((org) => {
      let matchesTab = true;
      if (activeTab === "need") matchesTab = org.type === "Đơn vị cần hỗ trợ";
      if (activeTab === "donor") matchesTab = org.type === "Nhà tài trợ";
      if (activeTab === "pending") matchesTab = org.status === "pending";

      const matchesSearch =
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.repName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        typeFilterValue === "all" || org.type === typeFilterValue;

      let statusName = "Đã xác minh";
      if (org.status === "pending") statusName = "Chờ xác minh";
      if (org.status === "locked") statusName = "Đã khóa";

      const matchesStatus =
        statusFilterValue === "all" || statusName === statusFilterValue;

      const matchesProvince =
        provinceFilterValue === "all" || org.province === provinceFilterValue;

      return (
        matchesTab &&
        matchesSearch &&
        matchesType &&
        matchesStatus &&
        matchesProvince
      );
    });

    orgTableBody.innerHTML = "";

    if (filtered.length === 0) {
      orgTableBody.innerHTML = `
        <tr>
          <td colspan="5" style="padding: 2rem; text-align: center; color: var(--slate-400);">
            Không tìm thấy tổ chức nào phù hợp.
          </td>
        </tr>
      `;
      tableFooterText.innerHTML = `<span>Hiển thị 0 bản ghi</span><span class="so-trang in-dam">Trang 1 / 1</span>`;
      return;
    }

    tableFooterText.innerHTML = `<span>Hiển thị ${filtered.length} bản ghi · Dữ liệu minh họa</span><span class="so-trang in-dam">Trang 1 / 1</span>`;

    filtered.forEach((org) => {
      const tr = document.createElement("tr");
      if (org.id === currentSelectedId) {
        tr.className = "hang-duoc-chon";
      }

      let badgeClass = "nhan-xanh-la";
      let statusLabel = "Đã xác minh";
      if (org.status === "pending") {
        badgeClass = "nhan-vang-cam";
        statusLabel = "Chờ xác minh";
      } else if (org.status === "locked") {
        badgeClass = "nhan-do-hong";
        statusLabel = "Đã khóa";
      }

      let actionHtml = "";
      if (org.status === "pending") {
        actionHtml = `<a href="#" class="nut-lien-ket" onclick="event.preventDefault(); selectOrg('${org.id}')">Xem & xác minh &rarr;</a>`;
      } else if (org.status === "locked") {
        actionHtml = `<a href="#" class="nut-lien-ket" onclick="event.preventDefault(); selectOrg('${org.id}')">Xem lịch sử &rarr;</a>`;
      } else {
        actionHtml = `<a href="#" class="nut-lien-ket" onclick="event.preventDefault(); selectOrg('${org.id}')">Xem · Sửa &rarr;</a>`;
      }

      let linkText =
        org.type === "Nhà tài trợ"
          ? `${org.usersCount} người dùng · ${org.needsCount} nguồn lực`
          : `${org.usersCount} người dùng · ${org.needsCount} nhu cầu`;

      tr.innerHTML = `
        <td>
          <span class="in-dam hien-thi-khoi">${org.name}</span>
          <span style="font-size: 0.7rem; color: var(--slate-400);">${org.id}</span>
        </td>
        <td>
          <span class="in-dam hien-thi-khoi">${org.type}</span>
          <span style="font-size: 0.7rem; color: var(--slate-500);">${org.province}</span>
        </td>
        <td>
          <span class="the-nhan-trang-thai ${badgeClass}">${statusLabel}</span>
        </td>
        <td style="font-size: 0.75rem; color: var(--slate-600);">
          ${linkText}
        </td>
        <td class="can-phai">${actionHtml}</td>
      `;

      tr.addEventListener("click", () => selectOrg(org.id));
      orgTableBody.appendChild(tr);
    });
  }

  function selectOrg(id) {
    currentSelectedId = id;
    renderTable();

    const org = orgsData.find((o) => o.id === id);
    if (!org) return;

    formOrgTitle.textContent = `Hồ sơ tổ chức · ${org.id}`;
    editOrgName.value = org.name;
    editOrgRepresentative.value = org.repName;
    editOrgPhone.value = org.repPhone;
    editOrgEmail.value = org.email;
    editOrgAddress.value = org.address;
    linkedSectionTitle.textContent = `Người dùng & dữ liệu liên quan (${org.id})`;

    verifyPanelTitle.textContent = `Xác minh tổ chức · ${org.id}`;
    verifyOrgName.textContent = org.name;
    verifyOrgType.textContent = `${org.type} · ${org.province}`;
    verifyOrgRep.textContent = `Đại diện: ${org.repName}`;
    verifyOrgEmail.textContent = `Email: ${org.email}`;
  }

  /* ==========================================================================
     Event Listeners
     ========================================================================== */

  document.querySelectorAll(".muc-tab").forEach((tab) => {
    tab.addEventListener("click", (e) => {
      document
        .querySelectorAll(".muc-tab")
        .forEach((t) => t.classList.remove("kich-hoat"));
      e.target.classList.add("kich-hoat");
      activeTab = e.target.getAttribute("data-tab");
      renderTable();
    });
  });

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderTable();
  });

  typeFilter.addEventListener("change", (e) => {
    typeFilterValue = e.target.value;
    renderTable();
  });

  statusFilter.addEventListener("change", (e) => {
    statusFilterValue = e.target.value;
    renderTable();
  });

  provinceFilter.addEventListener("change", (e) => {
    provinceFilterValue = e.target.value;
    renderTable();
  });

  document.getElementById("orgEditForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const org = orgsData.find((o) => o.id === currentSelectedId);
    if (org) {
      org.name = editOrgName.value;
      org.repName = editOrgRepresentative.value;
      org.repPhone = editOrgPhone.value;
      org.email = editOrgEmail.value;
      org.address = editOrgAddress.value;
      renderTable();
      showToast(`Đã lưu cập nhật thông tin cho ${org.id}`, "thanh-cong");
    }
  });

  document.getElementById("btnCancelEdit").addEventListener("click", () => {
    selectOrg(currentSelectedId);
    showToast("Đã hủy thay đổi chưa lưu.", "thong-tin");
  });

  btnApproveVerify.addEventListener("click", () => {
    const org = orgsData.find((o) => o.id === currentSelectedId);
    if (org) {
      org.status = "verified";
      renderTable();
      selectOrg(org.id);
      showToast(`Đã hoàn tất xác minh tổ chức ${org.id}`, "thanh-cong");
    }
  });

  btnRequestEditVerify.addEventListener("click", () => {
    const note = verifyNoteInput.value.trim();
    if (!note) {
      showToast("Vui lòng nhập yêu cầu kiểm tra.", "canh-bao");
      return;
    }
    showToast(
      `Đã gửi yêu cầu bổ sung thông tin tới đại diện tổ chức.`,
      "thong-tin",
    );
  });

  btnExecuteLock.addEventListener("click", () => {
    const org = orgsData.find((o) => o.id === currentSelectedId);
    if (org) {
      org.status = "locked";
      renderTable();
      selectOrg(org.id);
      showToast(`Đã lưu trữ an toàn tổ chức ${org.id}`, "nguy-hiem");
    }
  });

  document.getElementById("btnCreateOrg").addEventListener("click", () => {
    showToast("Đang mở biểu mẫu tạo tổ chức mới...", "thong-tin");
  });

  document.getElementById("btnNotifications").addEventListener("click", () => {
    showToast("Bạn có 1 thông báo xác minh tổ chức mới.", "thong-tin");
  });

  /* ==========================================================================
     Toast System
     ========================================================================== */

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
  renderTable();
  selectOrg(currentSelectedId);
});
