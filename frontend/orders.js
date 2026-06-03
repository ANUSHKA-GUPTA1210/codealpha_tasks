const orders =
JSON.parse(
localStorage.getItem("orders")
) || [];

const container =
document.getElementById(
"ordersContainer"
);

if(orders.length === 0){

    container.innerHTML =
    "<h2>No Orders Yet</h2>";

}
else{

    orders.forEach((order,index)=>{

        container.innerHTML += `

        <div class="order-card">

            <h3>${order.customer.name}</h3>

            <p>${order.customer.email}</p>

            <p>${order.customer.phone}</p>

            <p>${order.customer.address}</p>

            <p>${order.date}</p>

            <h4>Products:</h4>

            <ul>
                ${order.items.map(item => `
                <li>
                    ${item.name}
                    (Qty: ${item.quantity})
                </li>
                `).join("")}
            </ul>

            <button onclick="cancelOrder(${index})">
                Cancel Order
            </button>

        </div>

        `;
    });

}

function cancelOrder(index){

    const confirmCancel =
    confirm(
    "Are you sure you want to cancel this order?"
    );

    if(!confirmCancel){
        return;
    }

    let orders =
    JSON.parse(
    localStorage.getItem("orders")
    ) || [];

    orders.splice(index,1);

    localStorage.setItem(
    "orders",
    JSON.stringify(orders)
    );

    alert(
    "Order Cancelled Successfully!"
    );

    location.reload();
}