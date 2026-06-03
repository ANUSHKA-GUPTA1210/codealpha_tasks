const productContainer =
document.getElementById("productContainer");

const featuredContainer =
document.getElementById("featuredProducts");

let products = [];


// ---------------------
// Fetch Products
// ---------------------

async function loadProducts(){

    try{

        const response =
        await fetch(
        "http://localhost:5000/products"
        );

        products =
        await response.json();

        if(productContainer){
            displayProducts(products);
        }

        if(featuredContainer){
            displayFeatured(products);
        }

    }catch(error){

        console.log(error);

        alert(
        "Failed To Load Products"
        );
    }
}


// ---------------------
// Products Page
// ---------------------

function displayProducts(data){

    if(!productContainer) return;

    productContainer.innerHTML = "";

    data.forEach(product=>{

        productContainer.innerHTML += `

        <div class="product-card">

            <img
            src="${product.image}"
            alt="${product.name}"
            >

            <h3>
                ${product.name}
            </h3>

            <p>
                ₹${product.price}
            </p>

            <p>
                ${product.category}
            </p>

            <button
            onclick="viewProduct(${product.id})">
                View Details
            </button>

        </div>

        `;
    });
}


// ---------------------
// Home Slider
// ---------------------

function displayFeatured(data){

    if(!featuredContainer) return;

    featuredContainer.innerHTML = "";

    const loopProducts =
    [...data,...data];

    loopProducts.forEach(product=>{

        featuredContainer.innerHTML += `

        <div class="product-card">

            <img
            src="${product.image}"
            alt="${product.name}"
            >

            <h3>
                ${product.name}
            </h3>

            <p>
                ₹${product.price}
            </p>

            <button
            onclick="viewProduct(${product.id})">
                View Details
            </button>

        </div>

        `;
    });
}


// ---------------------
// Filters
// ---------------------

const searchInput =
document.getElementById("searchInput");

const categoryFilter =
document.getElementById("categoryFilter");

const sortPrice =
document.getElementById("sortPrice");


if(
searchInput &&
categoryFilter &&
sortPrice
){

function filterProducts(){

    let filtered =
    [...products];

    const search =
    searchInput.value.toLowerCase();

    const category =
    categoryFilter.value;

    const sort =
    sortPrice.value;

    filtered =
    filtered.filter(product=>

        product.name
        .toLowerCase()
        .includes(search)

    );

    if(category !== "all"){

        filtered =
        filtered.filter(product=>

            product.category
            === category

        );
    }

    if(sort === "low-high"){

        filtered.sort(
        (a,b)=>
        a.price-b.price
        );
    }

    if(sort === "high-low"){

        filtered.sort(
        (a,b)=>
        b.price-a.price
        );
    }

    displayProducts(filtered);
}

searchInput.addEventListener(
"input",
filterProducts
);

categoryFilter.addEventListener(
"change",
filterProducts
);

sortPrice.addEventListener(
"change",
filterProducts
);

}


// ---------------------
// View Product
// ---------------------

function viewProduct(id){

    localStorage.setItem(
    "selectedProduct",
    id
    );

    window.location.href =
    "product-details.html";
}


// Start
loadProducts();