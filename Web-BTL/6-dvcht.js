document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('div').forEach(div => {
        div.style.transition = 'transform 0.2s ease';
        div.addEventListener('mouseenter', () => {
            div.style.transform = 'translateY(-3px)';
        });
        div.addEventListener('mouseleave', () => {
            div.style.transform = '';
        });
    });

    // Xử lý tương tác gạch ngang khi click checkbox trong danh sách việc cần làm
    const taskItems = document.querySelectorAll('.muc-cong-viec input[type="checkbox"]');
    
    taskItems.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const parentLabel = e.target.closest('.muc-cong-viec');
            if (e.target.checked) {
                parentLabel.classList.add('da-danh-dau');
            } else {
                parentLabel.classList.remove('da-danh-dau');
            }
        });
    });

    // Chuyển đến trang tạo nhu cầu khi bấm nút
    const createButtons = document.querySelectorAll('.nut');
    createButtons.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            window.location.href = '7-dvcht.html';
        });
    });
});