
async function loadOrders() {

    try {

        const response = await fetch("/orders");

        const orders = await response.json();

        const container =
            document.getElementById("ordersContainer");

        container.innerHTML = "";

        orders.forEach(order => {

            const div = document.createElement("div");

            div.classList.add("book");

            div.innerHTML = `
                <p><b>Name:</b> ${order.customerName}</p>
                <p><b>Address:</b> ${order.address}</p>
            `;

            container.appendChild(div);

        });

    } catch (error) {

        console.error(error);

    }
}

loadOrders();