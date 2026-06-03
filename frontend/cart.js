let cart =
JSON.parse(localStorage.getItem("cart"))
|| [];

const cartContainer =
document.getElementById("cartContainer");

const totalPrice =
document.getElementById("totalPrice");

function renderCart(){

    cartContainer.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartContainer.innerHTML =
        "<h2>Your Cart Is Empty</h2>";

        totalPrice.innerText = 0;

        return;
    }

    cart.forEach(item => {

        total += item.price * item.quantity;

        cartContainer.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}">

            <div>

                <h3>${item.name}</h3>

                <p>₹${item.price}</p>

                <p>Quantity: ${item.quantity}</p>

            </div>

            <button onclick="removeItem(${item.id})">
                Remove
            </button>

        </div>

        `;
    });

    totalPrice.innerText = total;
}

function removeItem(id){

    cart = cart.filter(
        item => item.id !== id
    );

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    renderCart();
}

renderCart();

document
.getElementById("checkoutBtn")
.addEventListener("click", () => {

    // Cart empty check
    if(cart.length === 0){

        alert(
        "Your cart is empty!"
        );

        return;
    }

    // Login check
    const isLoggedIn =
    localStorage.getItem("isLoggedIn");

    if(isLoggedIn !== "true"){

        const loginNow = confirm(
        "You need to login before placing an order.\n\nDo you want to login now?"
        );

        if(loginNow){

            window.location.href =
            "login.html";
        }

        return;
    }

    // Get logged-in user
    const user =
    JSON.parse(
    localStorage.getItem("user")
    );

    // Calculate total
    let totalAmount = 0;

    cart.forEach(item => {

        totalAmount +=
        item.price * item.quantity;

    });

    // Order confirmation
    const confirmOrder = confirm(

`Confirm Order

Name: ${user.name}
Email: ${user.email}

Total Amount: ₹${totalAmount}

Proceed with this order?`

    );

    if(!confirmOrder){

        return;
    }

    // Create order
    const order = {

        customer:{
            name:user.name,
            email:user.email
        },

        items:cart,

        total:totalAmount,

        date:
        new Date().toLocaleString(),

        status:"Processing"
    };

    let orders =
    JSON.parse(
    localStorage.getItem("orders")
    ) || [];

    orders.push(order);

    localStorage.setItem(
    "orders",
    JSON.stringify(orders)
    );

    // Clear cart
    localStorage.removeItem("cart");

    cart = [];

    alert(
    "🎉 Order Placed Successfully!"
    );

    window.location.href =
    "index.html";
});