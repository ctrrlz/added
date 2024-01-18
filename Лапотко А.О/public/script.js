document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('category-electro').addEventListener('click', function () {
        loadProducts(['Электротехника']);
    });

  
    document.getElementById('category-electronic').addEventListener('click', function () {
        loadProducts(['Электроника']);
    });
document.getElementById('all-products').addEventListener('click', function () {
        loadProducts([]);
    });

   
    document.getElementById('cart').addEventListener('click', function () {
        window.location.href = '/cart';
    });

   
    loadProducts();

  
    function loadProducts(categories = []) {
        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = ''; 

        
        const url = categories.length > 0
            ? `/api/products?categories=${encodeURIComponent(categories.join(','))}`
            : '/api/products';

       
        fetch(url)
            .then(response => response.json())
            .then(products => {
                
                products.forEach(product => {
                    const productCard = createProductCard(product);
                    productsContainer.appendChild(productCard);
                });
            });
    }

  
    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';

        const title = document.createElement('h2');
        title.textContent = product.name;

        const price = document.createElement('p');
        price.textContent = `Цена: $${product.price}`;

        const description = document.createElement('p');
        description.textContent = product.description;

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Добавить в корзину';
        addToCartButton.addEventListener('click', () => addToCart(product));

        const detailsButton = document.createElement('button');
                detailsButton.textContent = 'Подробнее';
                detailsButton.addEventListener('click', () => showProductDetails(product));
        
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(description);
        card.appendChild(addToCartButton);
        card.appendChild(detailsButton);

        return card;
    }

 
    function addToCart(product) {
        fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
        .then(response => response.json())
        .then(updatedCart => {
            console.log('Товар добавлен в корзину:', product);
        })
    }  
        
        function showProductDetails(product) {

            const detailsPageURL = `/product-details?id=${product.id}&name=${encodeURIComponent(product.name)}&price=${product.price}&description=${encodeURIComponent(product.description)}&year=${product.year}&color=${encodeURIComponent(product.color)}`;
            window.location.href = detailsPageURL;
        }   
        //добавлено
        function applyFilters(){
            const selectedCategories=getSelectedCategories();
            const price=priceInput.value.trim();
            const color=document.getElementById('color').value.trim().toLowerCase();
            const year=document.getElementById('year').value.trim();
            loadProducts(selectedCategories,price,color,year);
        }

        });
        
   

    


