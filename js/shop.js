document.addEventListener('DOMContentLoaded', () => {
    const priceRange = document.getElementById('price');
    const priceValue = document.getElementById('price-value');
    
    // Atualiza o valor do preço exibido quando o range é alterado
    if (priceValue) {
        priceRange.addEventListener('input', () => {
            priceValue.textContent = `R$ 0 - R$ ${priceRange.value}`;
        });
    }

    const categoryFilter = document.getElementById('category');
    const sizeFilter = document.getElementById('size');
    const productCards = document.querySelectorAll('.product-card');

    // Filtra os produtos com base na categoria e no tamanho selecionados
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
                card.querySelector('.size').textContent.toLowerCase().includes(selectedSize);

            // Verifica o intervalo de preço também se necessário
            const price = parseFloat(card.querySelector('.price').textContent.replace('R$', '').replace(',', '.').trim());
            const maxPrice = parseFloat(priceRange.value);
            const matchesPrice = price <= maxPrice;

            // Aplica as condições para exibir ou ocultar o produto
            if (matchesCategory && matchesSize && matchesPrice) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
});