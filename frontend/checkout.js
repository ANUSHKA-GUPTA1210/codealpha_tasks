const form =
document.getElementById("checkoutForm");

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const order = {

        customer:{
            name:
            document.getElementById("name").value,

            email:
            document.getElementById("email").value,

            phone:
            document.getElementById("phone").value,

            address:
            document.getElementById("address").value
        },

        items:
        JSON.parse(
        localStorage.getItem("cart")
        ) || [],

        date:
        new Date().toLocaleString()
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

    localStorage.removeItem("cart");

   alert(
"🎉 Order Placed Successfully!"
);

window.location.href =
"index.html";
});