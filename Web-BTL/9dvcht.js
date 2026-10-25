document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const regionFilter = document.getElementById('regionFilter');
    const priorityFilter = document.getElementById('priorityFilter');
    const cards = document.querySelectorAll('.the-kham-pha');

    function filterCards() {
        const query = searchInput.value.toLowerCase();
        const selectedRegion = regionFilter.value;
        const selectedPriority = priorityFilter.value;

        cards.forEach(card => {
            const title = card.querySelector('.tieu-de-nhu-cau').textContent.toLowerCase();
            const code = card.querySelector('.ma-nhu-cau').textContent.toLowerCase();
            const region = card.getAttribute('data-region');
            const priority = card.getAttribute('data-priority');

            const matchesSearch = title.includes(query) || code.includes(query);
            const matchesRegion = !selectedRegion || region === selectedRegion;
            const matchesPriority = !selectedPriority || priority === selectedPriority;

            if (matchesSearch && matchesRegion && matchesPriority) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) searchInput.addEventListener('input', filterCards);
    if (regionFilter) regionFilter.addEventListener('change', filterCards);
    if (priorityFilter) priorityFilter.addEventListener('change', filterCards);
});