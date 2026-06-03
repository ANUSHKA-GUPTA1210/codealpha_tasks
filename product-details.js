const selectedId =
localStorage.getItem(
"selectedProduct"
);

const details =
document.getElementById(
"productDetails"
);

loadProduct();

async function loadProduct(){

try{

const response =
await fetch(
`http://localhost:5000/products/${selectedId}`
);

const product =
await response.json();

if(!product){

details.innerHTML =
"<h2>Product Not Found</h2>";

return;
}

let quantity = 1;

details.innerHTML = `

<div class="product-details">

<div class="product-image">

<img
src="${product.image}"
alt="${product.name}"
>

</div>

<div class="product-info">

<h1>
${product.name}
</h1>

<p class="price">
₹${product.price}
</p>

<p>
${product.description}
</p>

<div class="quantity-box">

<button onclick="decreaseQty()">
-
</button>

<span id="qty">
1
</span>

<button onclick="increaseQty()">
+
</button>

</div>

<div class="action-buttons">

<button onclick="addToCart()">
Add To Cart
</button>

<button
class="buy-btn"
onclick="buyNow()">
Buy Now
</button>

</div>

</div>

</div>

`;

window.increaseQty = ()=>{

quantity++;

document
.getElementById("qty")
.innerText = quantity;

};

window.decreaseQty = ()=>{

if(quantity > 1){

quantity--;

document
.getElementById("qty")
.innerText = quantity;

}

};

window.addToCart = ()=>{

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

const existing =
cart.find(item=>
item.id===product.id
);

if(existing){

existing.quantity += quantity;

}else{

cart.push({
...product,
quantity
});

}

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

alert(
"Product Added To Cart"
);

};

window.buyNow = ()=>{

addToCart();

window.location.href =
"cart.html";

};

}catch(error){

console.log(error);

details.innerHTML =
"<h2>Failed To Load Product</h2>";

}

}