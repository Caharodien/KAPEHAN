document.addEventListener('DOMContentLoaded', async () => {
    const orderList = document.getElementById('orderList');

    try {
        // Fetch orders from backend API
        const response = await fetch('/api/orders'); // Update the URL accordingly
        const orders = await response.json();

        // Loop through orders and display them
        orders.forEach(order => {
            const listItem = document.createElement('li');
            listItem.className = 'order-item';

            const orderDetails = document.createElement('div');
            orderDetails.className = 'order-details';
            orderDetails.innerHTML = `
                <strong>Order #${order.id}</strong><br>
                <strong>Item:</strong> ${order.item}<br>
                <strong>Quantity:</strong> ${order.quantity}<br>
                <strong>Status:</strong> ${order.status}<br>
                <strong>Price:</strong> ${order.price}<br>
                <strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}
            `;

            const orderActions = document.createElement('div');
            orderActions.className = 'order-actions';

            // Cancel Button
            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.className = 'cancel-btn';

            // Complete Button
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Complete';
            completeBtn.className = 'complete-btn';

            // Cancel Button Event Listener
            cancelBtn.addEventListener('click', async () => {
                const response = await fetch(`/api/orders/${order.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: 'Canceled' })
                });

                if (response.ok) {
                    order.status = 'Canceled';
                    orderDetails.innerHTML = `
                        <strong>Order #${order.id}</strong><br>
                        <strong>Item:</strong> ${order.item}<br>
                        <strong>Quantity:</strong> ${order.quantity}<br>
                        <strong>Status:</strong> <span style="color: red;">${order.status}</span><br>
                        <strong>Price:</strong> ${order.price}<br>
                        <strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}
                    `;

                    cancelBtn.disabled = true;
                    completeBtn.disabled = true;
                }
            });

            // Complete Button Event Listener
            completeBtn.addEventListener('click', async () => {
                const response = await fetch(`/api/orders/${order.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: 'Completed' })
                });

                if (response.ok) {
                    order.status = 'Completed';
                    orderDetails.innerHTML = `
                        <strong>Order #${order.id}</strong><br>
                        <strong>Item:</strong> ${order.item}<br>
                        <strong>Quantity:</strong> ${order.quantity}<br>
                        <strong>Status:</strong> <span style="color: green;">${order.status}</span><br>
                        <strong>Price:</strong> ${order.price}<br>
                        <strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}
                    `;

                    cancelBtn.disabled = true;
                    completeBtn.disabled = true;
                }
            });

            // Append buttons to orderActions
            orderActions.appendChild(cancelBtn);
            orderActions.appendChild(completeBtn);

            // Append order details and actions to list item
            listItem.appendChild(orderDetails);
            listItem.appendChild(orderActions);
            
            // Append list item to order list
            orderList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        orderList.innerHTML = '<p>Failed to load orders. Please try again later.</p>';
    }
});
