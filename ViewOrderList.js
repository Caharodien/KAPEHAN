document.addEventListener('DOMContentLoaded', function() {
    displayOrders();
});

function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('coffeeShopOrders') || '[]');
    const tableBody = document.getElementById('ordersTableBody');
    
    tableBody.innerHTML = ''; // Clear existing rows
    
    if (orders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5">No orders found</td></tr>';
        return;
    }
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        
        // Add class based on order type for styling
        row.classList.add(order.orderType === 'Takeout' ? 'takeout-order' : 'dinein-order');
        
        // Format items list
        const itemsList = order.items.map(item => 
            `${item.name} (${item.quantity})`).join(', ');
        
        // Format time
        const orderTime = new Date(order.timestamp);
        const timeString = orderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        // Create type indicator with icon
        const typeIndicator = order.orderType === 'Takeout' ? 
            '🛍️ Takeout' : '🍽️ Dine-in';
        
        row.innerHTML = `
            <td>${order.id || 'N/A'}</td>
            <td class="order-type-cell">${typeIndicator}</td>
            <td>${itemsList}</td>
            <td>₱${order.total.toFixed(2)}</td>
            <td>${timeString}</td>
        `;
        
        tableBody.appendChild(row);
    });
};