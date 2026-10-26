document.addEventListener('DOMContentLoaded', () => {
    // Lấy ô tìm kiếm và danh sách thẻ nhu cầu trên trang.
    const searchInput = document.getElementById('searchInput');
    const cards = document.querySelectorAll('.the-kham-pha');

    // Chuẩn hóa chữ để tìm kiếm không phân biệt chữ hoa, dấu tiếng Việt.
    function normalizeText(text) {
        return text
            .toLocaleLowerCase('vi')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd');
    }

    // Hiện các thẻ có nội dung khớp với từ khóa và ẩn các thẻ còn lại.
    function filterCards() {
        const query = normalizeText(searchInput.value.trim());

        cards.forEach(card => {
            const searchableText = normalizeText(card.textContent);
            card.style.display = searchableText.includes(query) ? '' : 'none';
        });
    }

    // Lọc danh sách ngay khi người dùng nhập từ khóa.
    searchInput.addEventListener('input', filterCards);

    // Hiển thị thông tin chi tiết của nhu cầu khi bấm nút tương ứng.
    cards.forEach(card => {
        const detailsButton = card.querySelector('.nut-vien-xanh-duong');

        detailsButton.addEventListener('click', () => {
            const code = card.querySelector('.ma-nhu-cau').textContent.trim();
            const title = card.querySelector('.tieu-de-nhu-cau').textContent.trim();
            const priority = card.querySelector('.nhan-trang-thai').textContent.trim();
            const details = Array.from(card.querySelectorAll('.thong-tin-the span'))
                .map(item => item.textContent.trim());
            const progress = card.querySelector('.thong-tin-tien-do .do-dam-600').textContent.trim();
            const organization = card.querySelector('.ten-don-vi').textContent.trim();

            window.alert([
                `Mã nhu cầu: ${code}`,
                `Tên nhu cầu: ${title}`,
                `Mức độ ưu tiên: ${priority}`,
                ...details,
                `Tiến độ tiếp nhận: ${progress}`,
                organization
            ].join('\n'));
        });
    });
});
