document.addEventListener("DOMContentLoaded", () => {
  // Initial Dataset - Exactly matches image content
  let usersData = [
    {
      id: "ND-006",
      name: "Nguyễn Thu",
      email: "thu@haison.example",
      org: "Hải Sơn",
      orgCode: "TC-006",
      role: "Đơn vị cần hỗ trợ",
      status: "pending", // pending | active | suspended
      verifiedDate: "11/10",
      docName: "Giấy ủy quyền đại diện.pdf",
      reason: "Đã kiểm tra giấy ủy quyền và email liên hệ.",
    },
    {
      id: "ND-002",
      name: "Nguyễn Lan",
      email: "lan@anbinh.example",
      org: "An Bình",
      orgCode: "TC-003",
      role: "Đơn vị cần hỗ trợ",
      status: "active",
      verifiedDate: "05/10",
      docName: "Giấy xác nhận đơn vị.pdf",
      reason: "Hồ sơ tổ chức hợp lệ.",
    },
    {
      id: "ND-003",
      name: "Trần Minh",
      email: "minh@donghanh.example",
      org: "Đồng Hành",
      orgCode: "TC-002",
      role: "Nhà tài trợ",
      status: "active",
      verifiedDate: "01/10",
      docName: "Hồ sơ tài trợ.pdf",
      reason: "Đã xác minh nguồn lực quỹ.",
    },
    {
      id: "ND-004",
      name: "Lê Hà",
      email: "ha@aidmatch.example",
      org: "Ban điều phối",
      orgCode: "TC-001",
      role: "Điều phối viên",
      status: "active",
      verifiedDate: "20/09",
      docName: "Quyết định nhân sự.pdf",
      reason: "Nhân sự điều phối miền Trung.",
    },
    {
      id: "ND-001",
      name: "Phạm An",
      email: "an@aidmatch.example",
      org: "AidMatch",
      orgCode: "TC-001",
      role: "Quản trị viên",
      status: "active",
      verifiedDate: "15/09",
      docName: "Hồ sơ Admin hệ thống.pdf",
      reason: "Quản trị cấp cao hệ thống.",
    },
    {
      id: "ND-005",
      name: "Vũ Nam",
      email: "nam@quy.example",
      org: "Nhóm Sẻ Chia",
      orgCode: "TC-005",
      role: "Nhà tài trợ",
      status: "suspended",
      verifiedDate: "12/08",
      docName: "Yêu cầu rà soát.pdf",
      reason: "Đã hoàn tất xác minh lại đầu mối tổ chức.",
    },
  ];

  // App State
  let currentSelectedId = "ND-006";
  let searchQuery = "";
  let roleFilterValue = "all";
  let statusFilterValue = "all";

  // DOM Elements
  const userTableBody = document.getElementById("userTableBody");
  const searchInput = document.getElementById("searchInput");
  const roleFilter = document.getElementById("roleFilter");
  const statusFilter = document.getElementById("statusFilter");
  const tableFooterText = document.getElementById("tableFooterText");
  const sidebarBadgeUsers = document.getElementById("sidebarBadgeUsers");

  const detailPanel = document.getElementById("detailPanel");

  const inviteForm = document.getElementById("inviteForm");
  const btnScrollToInvite = document.getElementById("btnScrollToInvite");
  const btnCreateDirect = document.getElementById("btnCreateDirect");

  const suspendTargetInput = document.getElementById("suspendTargetInput");
  const suspendReasonInput = document.getElementById("suspendReasonInput");
  const btnExecuteSuspend = document.getElementById("btnExecuteSuspend");

  /* ==========================================================================
     Core Rendering Functions
     ========================================================================== */

  function renderTable() {
    const filtered = usersData.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.org.toLowerCase().includes(searchQuery.toLowerCase());

      const matchRole =
        roleFilterValue === "all" || user.role === roleFilterValue;

      let userStatusName = "Hoạt động";
      if (user.status === "pending") userStatusName = "Chờ phê duyệt";
      if (user.status === "suspended") userStatusName = "Đã đình chỉ";

      const matchStatus =
        statusFilterValue === "all" || userStatusName === statusFilterValue;

      return matchSearch && matchRole && matchStatus;
    });

    userTableBody.innerHTML = "";

    if (filtered.length === 0) {
      userTableBody.innerHTML = `
        <tr>
          <td colspan="4" style="padding: 2rem; text-align: center; color: var(--slate-400);">
            Không tìm thấy người dùng phù hợp.
          </td>
        </tr>
      `;
      tableFooterText.innerHTML = `<span>Hiển thị 0 bản ghi</span><span class="so-trang in-dam">Trang 1 / 1</span>`;
      return;
    }

    tableFooterText.innerHTML = `<span>Hiển thị ${filtered.length} bản ghi · Dữ liệu minh họa</span><span class="so-trang in-dam">Trang 1 / 1</span>`;

    filtered.forEach((user) => {
      const tr = document.createElement("tr");
      if (user.id === currentSelectedId) {
        tr.className = "hang-duoc-chon";
      }

      let badgeClass = "nhan-xanh-la";
      let statusLabel = "Hoạt động";
      if (user.status === "pending") {
        badgeClass = "nhan-vang-cam";
        statusLabel = "Chờ phê duyệt";
      } else if (user.status === "suspended") {
        badgeClass = "nhan-do-hong";
        statusLabel = "Đã đình chỉ";
      }

      let actionHtml = "";
      if (user.status === "pending") {
        actionHtml = `<a href="#" class="in-dam" style="color: var(--blue-600);" onclick="event.preventDefault(); selectUser('${user.id}')">Xem & duyệt</a>`;
      } else if (user.status === "suspended") {
        actionHtml = `
          <a href="#" class="in-dam" style="color: var(--blue-600);" onclick="event.preventDefault(); selectUser('${user.id}')">Xem</a>
          <span style="color: var(--slate-300);">·</span>
          <a href="#" class="in-dam" style="color: var(--emerald-600);" onclick="event.preventDefault(); selectUser('${user.id}')">Khôi phục</a>
        `;
      } else {
        actionHtml = `
          <a href="#" class="in-dam" style="color: var(--blue-600);" onclick="event.preventDefault(); selectUser('${user.id}')">Xem</a>
          <span style="color: var(--slate-300);">·</span>
          <a href="#" class="in-dam" style="color: var(--slate-600);" onclick="event.preventDefault(); selectUser('${user.id}')">Đổi quyền</a>
        `;
      }

      tr.innerHTML = `
        <td>
          <span class="in-dam hien-thi-khoi">${user.name}</span>
          <span style="font-size: 0.7rem; color: var(--slate-400);">${user.email}</span>
        </td>
        <td>
          <span class="in-dam hien-thi-khoi">${user.org}</span>
          <span style="font-size: 0.7rem; color: var(--slate-500);">${user.role}</span>
        </td>
        <td>
          <span class="the-nhan-trang-thai ${badgeClass}">${statusLabel}</span>
        </td>
        <td class="can-phai">${actionHtml}</td>
      `;

      tr.addEventListener("click", () => selectUser(user.id));
      userTableBody.appendChild(tr);
    });

    sidebarBadgeUsers.textContent = usersData.length;
  }

  function selectUser(id) {
    currentSelectedId = id;
    renderTable();
    renderDetailPanel(id);
  }

  function renderDetailPanel(id) {
    const user = usersData.find((u) => u.id === id);
    if (!user) return;

    let badgeClass = "nhan-xanh-la";
    let statusLabel = "Hoạt động";
    if (user.status === "pending") {
      badgeClass = "nhan-vang-cam";
      statusLabel = "Chờ phê duyệt";
    } else if (user.status === "suspended") {
      badgeClass = "nhan-do-hong";
      statusLabel = "Đã đình chỉ";
    }

    // Update Action Target Input
    suspendTargetInput.value = `${user.name} · ${statusLabel}`;
    btnExecuteSuspend.textContent =
      user.status === "suspended" ? "Xác nhận khôi phục" : "Xác nhận đình chỉ";
    btnExecuteSuspend.className =
      user.status === "suspended"
        ? "nut nut-chinh chieu-rong-toan-bo"
        : "nut nut-vien-ngoai chieu-rong-toan-bo";

    detailPanel.innerHTML = `
      <div class="dau-khung">
        <h3 class="tieu-de-khung">Chi tiết người dùng · ${user.name}</h3>
        <p class="mo-ta-khung">Bảng chi tiết đang mở từ hàng đợi tài khoản.</p>
      </div>

      <div style="padding: 0.75rem 1.25rem 0 1.25rem;">
        <span class="the-nhan-trang-thai ${badgeClass}">● ${statusLabel}</span>
      </div>

      <div style="padding: 0.875rem 1.25rem; display: flex; flex-direction: column; gap: 0.875rem;">
        <div class="the-thong-tin-chi-tiet">
          <span class="ten-chinh-chi-tiet">${user.name} - ${user.id}</span>
          <span>Email đã xác minh ${user.verifiedDate}</span>
          <span>Tổ chức: ${user.org} · ${user.orgCode}</span>
          <span>Vai trò đề nghị: ${user.role}</span>
          <div style="margin-top: 0.25rem;">
            <a href="#" onclick="event.preventDefault(); showToast('Đang mở file tài liệu...', 'thong-tin');" style="color: var(--blue-600); font-weight: 700; text-decoration: none;">
              ${user.docName} · Xem →
            </a>
          </div>
        </div>

        <div class="nhom-bieu-mau">
          <label class="nhan-bieu-mau">Vai trò truy cập *</label>
          <select id="detailRoleSelect" class="luat-chon-bieu-mau">
            <option value="Đơn vị cần hỗ trợ" ${user.role === "Đơn vị cần hỗ trợ" ? "selected" : ""}>Đơn vị cần hỗ trợ</option>
            <option value="Nhà tài trợ" ${user.role === "Nhà tài trợ" ? "selected" : ""}>Nhà tài trợ</option>
            <option value="Điều phối viên" ${user.role === "Điều phối viên" ? "selected" : ""}>Điều phối viên</option>
            <option value="Quản trị viên" ${user.role === "Quản trị viên" ? "selected" : ""}>Quản trị viên</option>
          </select>
        </div>

        <div class="nhom-bieu-mau">
          <label class="nhan-bieu-mau">Lý do duyệt / đổi vai trò *</label>
          <input type="text" id="detailReasonInput" class="dieu-khien-bieu-mau" value="${user.reason}">
        </div>

        ${
          user.status === "pending"
            ? `
          <div class="o-thong-tin-vang-cam">
            <div class="tieu-de-o-thong-tin">Xác nhận cấp quyền</div>
            <div class="mo-ta-o-thong-tin">Cho phép tạo và theo dõi nhu cầu của ${user.orgCode}, không cấp quyền duyệt hoặc quản trị.</div>
          </div>
          <div class="nhom-thao-tac-chi-tiet">
            <button type="button" class="nut nut-thanh-cong chieu-rong-toan-bo" id="btnApproveUser">Phê duyệt tài khoản</button>
            <button type="button" class="nut nut-vien-ngoai chieu-rong-toan-bo" id="btnSaveRoleChanges">Lưu thay đổi vai trò</button>
          </div>
        `
            : `
          <div class="nhom-thao-tac-chi-tiet">
            <button type="button" class="nut nut-chinh chieu-rong-toan-bo" id="btnSaveRoleChanges">Lưu thay đổi vai trò</button>
          </div>
        `
        }

        <p class="mo-ta-khung" style="font-size: 0.7rem;">
          TS: Cho đến khi được mở, tất cả các tác vụ không liên quan đến duyệt.
        </p>
      </div>
    `;

    // Inner Button Event Listeners
    const btnApproveUser = document.getElementById("btnApproveUser");
    if (btnApproveUser) {
      btnApproveUser.addEventListener("click", () => {
        user.status = "active";
        user.role = document.getElementById("detailRoleSelect").value;
        user.reason = document.getElementById("detailReasonInput").value;
        renderTable();
        renderDetailPanel(user.id);
        showToast(
          `Đã phê duyệt tài khoản thành công cho ${user.name}!`,
          "thanh-cong",
        );
      });
    }

    const btnSaveRoleChanges = document.getElementById("btnSaveRoleChanges");
    if (btnSaveRoleChanges) {
      btnSaveRoleChanges.addEventListener("click", () => {
        user.role = document.getElementById("detailRoleSelect").value;
        user.reason = document.getElementById("detailReasonInput").value;
        renderTable();
        renderDetailPanel(user.id);
        showToast(`Đã lưu thay đổi vai trò cho ${user.name}!`, "thanh-cong");
      });
    }
  }

  /* ==========================================================================
     Event Listeners Setup
     ========================================================================== */

  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderTable();
  });

  roleFilter.addEventListener("change", (e) => {
    roleFilterValue = e.target.value;
    renderTable();
  });

  statusFilter.addEventListener("change", (e) => {
    statusFilterValue = e.target.value;
    renderTable();
  });

  btnScrollToInvite.addEventListener("click", () => {
    document
      .getElementById("inviteSection")
      .scrollIntoView({ behavior: "smooth" });
  });

  inviteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("inviteEmail").value;
    const role = document.getElementById("inviteRole").value;
    const orgSelect = document.getElementById("inviteOrg").value;
    const orgName = orgSelect.split(" - ")[0];

    const newId = `ND-00${usersData.length + 1}`;
    usersData.unshift({
      id: newId,
      name: email.split("@")[0],
      email: email,
      org: orgName,
      orgCode: "TC-NEW",
      role: role,
      status: "pending",
      verifiedDate: "Vừa xong",
      docName: "Lời mời tham gia hệ thống.pdf",
      reason:
        document.getElementById("inviteNote").value ||
        "Gửi lời mời trực tuyến.",
    });

    inviteForm.reset();
    renderTable();
    selectUser(newId);
    showToast(`Đã gửi lời mời thành công đến ${email}!`, "thanh-cong");
  });

  btnCreateDirect.addEventListener("click", () => {
    const email =
      document.getElementById("inviteEmail").value || "user@aidmatch.example";
    const role = document.getElementById("inviteRole").value;
    const orgSelect = document.getElementById("inviteOrg").value;
    const orgName = orgSelect.split(" - ")[0];

    const newId = `ND-00${usersData.length + 1}`;
    usersData.unshift({
      id: newId,
      name: email.split("@")[0],
      email: email,
      org: orgName,
      orgCode: "TC-DIRECT",
      role: role,
      status: "active",
      verifiedDate: "Vừa tạo",
      docName: "Hồ sơ khởi tạo.pdf",
      reason: "Khởi tạo trực tiếp bởi Quản trị viên.",
    });

    inviteForm.reset();
    renderTable();
    selectUser(newId);
    showToast("Đã tạo hồ sơ tài khoản trực tiếp thành công!", "thanh-cong");
  });

  btnExecuteSuspend.addEventListener("click", () => {
    const user = usersData.find((u) => u.id === currentSelectedId);
    if (!user) return;

    const reason = suspendReasonInput.value.trim();
    if (!reason) {
      showToast("Vui lòng nhập lý do bắt buộc thực hiện.", "canh-bao");
      return;
    }

    if (user.status === "suspended") {
      user.status = "active";
      showToast(`Đã khôi phục thành công tài khoản ${user.name}`, "thanh-cong");
    } else {
      user.status = "suspended";
      showToast(`Đã đình chỉ tài khoản ${user.name}`, "nguy-hiem");
    }

    user.reason = reason;
    renderTable();
    renderDetailPanel(user.id);
  });

  document.getElementById("btnNotifications").addEventListener("click", () => {
    showToast(
      "Hệ thống có 2 yêu cầu cấp quyền mới đang chờ xử lý.",
      "thong-tin",
    );
  });

  /* ==========================================================================
     Toast Notification System
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
  renderDetailPanel(currentSelectedId);
});
