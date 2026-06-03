fetch('data/products.json')
.then(response => response.json())
.then(products => {

    const container =
    document.getElementById('featuredProducts');

    products.forEach(product => {

        container.innerHTML += `
            <div class="product-card">

                <img src="${product.image}">

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

            </div>
        `;
    });
});