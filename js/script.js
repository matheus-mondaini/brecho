document.addEventListener('DOMContentLoaded', () => {
    const priceRange = document.getElementById('price');
    const priceValue = document.getElementById('price-value');

    if (priceRange && priceValue) {
        priceRange.addEventListener('input', () => {
            priceValue.textContent = `R$ 0 - R$ ${priceRange.value}`;
        });
    }

    const categoryFilter = document.getElementById('category');
    const sizeFilter = document.getElementById('size');
    const productCards = document.querySelectorAll('.product-card');

    if (categoryFilter && sizeFilter) {
        [categoryFilter, sizeFilter].forEach(filter => {
            filter.addEventListener('change', () => {
                filterProducts();
            });
        });
    }

    function filterProducts() {
        const selectedCategory = categoryFilter.value.toLowerCase();
        const selectedSize = sizeFilter.value.toLowerCase();

        productCards.forEach(card => {
            const matchesCategory = !selectedCategory || 
                card.querySelector('h3').textContent.toLowerCase().includes(selectedCategory);
            const matchesSize = !selectedSize || 
                card.querySelector('h3').textContent.toLowerCase().includes(selectedSize);

            card.style.display = matchesCategory && matchesSize ? 'block' : 'none';
        });
    }
});